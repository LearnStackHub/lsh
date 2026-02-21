import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CONFIG, isAdSenseConfigured, isValidAdSlot } from '../config/adsense';

function AdSense({ 
  adSlot = '1234567890', 
  adFormat = 'auto',
  adLayout = '',
  fullWidthResponsive = true,
  style = {},
  className = '',
  adClient = ADSENSE_CONFIG.publisherId
}) {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adFailed, setAdFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if container has width and is visible before loading ad
  // Use requestAnimationFrame to batch layout reads and avoid forced reflow
  const checkContainerReady = () => {
    if (!containerRef.current || !adRef.current) return false;
    
    // Batch all layout reads together to avoid forced reflow
    const rect = containerRef.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(containerRef.current);
    const hasWidth = rect.width > 0;
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    const isNotHidden = computedStyle.display !== 'none';
    
    return hasWidth && isInViewport && isNotHidden;
  };

  // Use IntersectionObserver to only load ads when visible
  // Delay on mobile to reduce initial load
  useEffect(() => {
    if (!containerRef.current || !isAdSenseConfigured() || !isValidAdSlot(adSlot)) return;

    // Delay ad loading on mobile devices to improve initial performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const delay = isMobile ? 1000 : 0;

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              const rect = entry.boundingClientRect;
              if (rect.width > 0) {
                setIsVisible(true);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: isMobile ? '100px' : '50px' // Larger margin on mobile for earlier loading
        }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    };

    if (delay > 0) {
      const timeout = setTimeout(setupObserver, delay);
      return () => clearTimeout(timeout);
    } else {
      return setupObserver();
    }
  }, []);

  // Load ad only when container is ready and visible
  useEffect(() => {
    if (!isVisible || !adRef.current || !window.adsbygoogle || !isValidAdSlot(adSlot)) return;
    
    // Double-check container has width
    if (!checkContainerReady()) {
      // Retry after a short delay
      const timeout = setTimeout(() => {
        if (checkContainerReady() && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.error('AdSense error:', err);
            setAdFailed(true);
          }
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Only push if ad hasn't been initialized
    if (!adRef.current.hasAttribute('data-adsbygoogle-status')) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
        setAdFailed(true);
      }
    }
  }, [isVisible]);

  // Monitor ad loading status
  useEffect(() => {
    if (!adRef.current || !isAdSenseConfigured() || !isValidAdSlot(adSlot)) return;

    const checkAdStatus = () => {
      const status = adRef.current?.getAttribute('data-adsbygoogle-status');
      if (status === 'done') {
        setAdLoaded(true);
        // Check if ad actually rendered content (has height) - use requestAnimationFrame to avoid forced reflow
        requestAnimationFrame(() => {
          setTimeout(() => {
            requestAnimationFrame(() => {
              const iframe = adRef.current?.querySelector('iframe');
              if (iframe) {
                // Batch layout read
                const height = iframe.offsetHeight;
                if (height > 0) {
                  setAdLoaded(true);
                } else {
                  // Ad slot filled but no content - likely no ads available
                  setAdFailed(true);
                }
              }
            });
          }, 500);
        });
      } else if (status === 'error' || status === 'unfilled') {
        setAdFailed(true);
      }
    };

    // Check immediately
    checkAdStatus();

    // Set up observer to watch for status changes
    const observer = new MutationObserver(checkAdStatus);
    if (adRef.current) {
      observer.observe(adRef.current, {
        attributes: true,
        attributeFilter: ['data-adsbygoogle-status']
      });
    }

    // Timeout fallback - if ad doesn't load in 5 seconds, consider it failed
    const timeout = setTimeout(() => {
      if (!adLoaded && !adFailed) {
        setAdFailed(true);
      }
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [adLoaded, adFailed]);

  // Don't render if AdSense is not configured
  if (!isAdSenseConfigured()) {
    return null; // Don't show placeholder in production
  }

  // Don't render if ad slot is invalid (placeholder)
  if (!isValidAdSlot(adSlot)) {
    return null; // Don't show ads with placeholder slots
  }

  // Hide container if ad failed to load (no empty space)
  if (adFailed) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`adsense-container ${className} ${adLoaded ? 'ad-loaded' : 'ad-loading'}`} 
      style={{
        ...style,
        minHeight: adLoaded ? 'auto' : '0',
        display: adFailed ? 'none' : 'block',
        minWidth: '1px', // Ensure container has minimum width
        width: '100%' // Ensure full width available
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minHeight: adLoaded ? 'auto' : '0',
          minWidth: '1px',
          width: '100%'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdSense;

