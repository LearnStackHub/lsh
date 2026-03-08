// Google Analytics Configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

export const GA_CONFIG = {
  // Your Google Analytics Measurement ID (GA4)
  // Format: G-XXXXXXXXXX
  // Get it from: https://analytics.google.com/
  measurementId: 'G-JDCPS7ENJ6',
  
  // Enable/disable analytics
  enabled: true,
  
  // Enable debug mode (for development)
  debug: true  // Temporarily enabled to debug exam events
};

// Initialize Google Analytics
// Note: The Google tag is already loaded in index.html, so we just need to ensure gtag is available
export const initGA = () => {
  if (!GA_CONFIG.enabled || !GA_CONFIG.measurementId || GA_CONFIG.measurementId === 'G-XXXXXXXXXX') {
    if (GA_CONFIG.debug) {
      console.log('Google Analytics: Not initialized - Measurement ID not configured');
    }
    return;
  }

  // Wait for gtag to be available (it's loaded in index.html)
  const checkGtag = () => {
    if (window.gtag) {
      // gtag is already loaded from index.html, just verify it's configured
      if (GA_CONFIG.debug) {
        console.log('Google Analytics: Already initialized from index.html with ID', GA_CONFIG.measurementId);
      }
      return;
    }
    
    // If gtag is not available after a delay, try loading it (fallback)
    setTimeout(() => {
      if (!window.gtag) {
        // Load gtag.js script as fallback
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.measurementId}`;
        document.head.appendChild(script1);

        // Initialize dataLayer and gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', GA_CONFIG.measurementId, {
          page_path: window.location.pathname,
          send_page_view: true
        });

        if (GA_CONFIG.debug) {
          console.log('Google Analytics: Initialized via fallback with ID', GA_CONFIG.measurementId);
        }
      }
    }, 100);
  };

  // Check immediately and after a short delay
  checkGtag();
  setTimeout(checkGtag, 50);
};

// Track page view
export const trackPageView = (path) => {
  if (!GA_CONFIG.enabled || !window.gtag) return;
  
  window.gtag('config', GA_CONFIG.measurementId, {
    page_path: path,
    page_title: document.title
  });

  if (GA_CONFIG.debug) {
    console.log('Google Analytics: Page view tracked', path);
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (!GA_CONFIG.enabled) {
    if (GA_CONFIG.debug) {
      console.warn('Google Analytics: Tracking disabled', eventName);
    }
    return;
  }

  // Wait for gtag to be available (with timeout)
  if (!window.gtag) {
    if (GA_CONFIG.debug) {
      console.warn('Google Analytics: gtag not available yet, retrying...', eventName);
    }
    
    // Retry after a short delay
    setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
        if (GA_CONFIG.debug) {
          console.log('Google Analytics: Event tracked (retry)', eventName, eventParams);
        }
      } else {
        console.error('Google Analytics: gtag still not available after retry', eventName);
      }
    }, 500);
    return;
  }
  
  try {
    window.gtag('event', eventName, eventParams);
    
    if (GA_CONFIG.debug) {
      console.log('✅ Google Analytics: Event tracked', eventName, eventParams);
    }
  } catch (error) {
    console.error('❌ Google Analytics: Error tracking event', eventName, error);
  }
};

// Track tutorial views
export const trackTutorialView = (tutorialId, tutorialTitle) => {
  trackEvent('tutorial_view', {
    tutorial_id: tutorialId,
    tutorial_title: tutorialTitle
  });
};

// Track search queries
export const trackSearch = (query) => {
  trackEvent('search', {
    search_term: query
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location
  });
};

// Track course selection
export const trackCourseSelect = (courseName) => {
  trackEvent('course_select', {
    course_name: courseName
  });
};


