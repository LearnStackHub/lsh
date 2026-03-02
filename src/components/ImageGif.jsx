import { useState, useRef } from 'react';

export function ImageGif({ src, alt, caption, type = 'image', width, height }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Load the original image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });

      // Load the logo
      const logo = new Image();
      // Try different logo paths
      const logoPaths = ['/LSH.png', '/LSH2.png', '/src/assets/LSH.png'];
      let logoLoaded = false;
      
      for (const logoPath of logoPaths) {
        try {
          await new Promise((resolve, reject) => {
            logo.onload = () => {
              logoLoaded = true;
              resolve();
            };
            logo.onerror = reject;
            logo.src = logoPath;
            // Timeout after 3 seconds
            setTimeout(() => {
              if (!logoLoaded) reject(new Error('Logo load timeout'));
            }, 3000);
          });
          break; // Success, exit loop
        } catch (e) {
          console.warn(`Failed to load logo from ${logoPath}, trying next...`);
          continue;
        }
      }
      
      if (!logoLoaded) {
        throw new Error('Could not load logo from any path');
      }

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to image size
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Calculate logo size (10% of image width, maintain aspect ratio)
      const logoWidth = img.width * 0.1;
      const logoHeight = (logo.width / logo.height) * logoWidth;
      
      // Position logo at bottom right with padding
      const padding = 20;
      const logoX = canvas.width - logoWidth - padding;
      const logoY = canvas.height - logoHeight - padding;
      
      // Draw logo with transparency
      ctx.globalAlpha = 0.8;
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = (alt || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error adding watermark:', error);
      // Fallback to direct download if watermark fails
      const link = document.createElement('a');
      link.href = src;
      link.download = alt || 'image';
      link.click();
    }
  };

  const isGif = src?.toLowerCase().endsWith('.gif') || type === 'gif';

  return (
    <>
      <div className="image-gif-container">
        <div className="image-gif-wrapper">
          {isLoading && (
            <div className="image-loading">
              <div className="loading-spinner"></div>
              <span>Loading {isGif ? 'GIF' : 'image'}...</span>
            </div>
          )}
          <div className={`image-gif-content ${isLoading ? 'loading' : ''}`}>
            {isGif ? (
              <img
                ref={imageRef}
                src={src}
                alt={alt || 'Animated GIF'}
                className="gif-image clickable-image"
                onLoad={handleImageLoad}
                onClick={handleImageClick}
                style={{ width, height }}
              />
            ) : (
              <img
                ref={imageRef}
                src={src}
                alt={alt || 'Image'}
                className="static-image clickable-image"
                onLoad={handleImageLoad}
                onClick={handleImageClick}
                onError={(e) => {
                  console.error('Image failed to load:', src);
                  setIsLoading(false);
                  e.target.style.display = 'none';
                }}
                style={{ width, height }}
              />
            )}
            {isGif && (
              <div className="gif-badge">
                <span className="gif-indicator">GIF</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-size Modal */}
      {showModal && (
        <div className="image-modal-overlay" onClick={handleCloseModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="image-modal-close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ×
            </button>
            <img 
              src={src} 
              alt={alt || 'Image'} 
              className="image-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}

// 3D Animated Image Card
export function ImageCard3D({ src, alt, title, description, rotation = 0 }) {
  return (
    <div className="image-card-3d" style={{ '--rotation': `${rotation}deg` }}>
      <div className="card-3d-inner">
        <div className="card-3d-front">
          <img src={src} alt={alt} />
          {title && <div className="card-3d-title">{title}</div>}
        </div>
        <div className="card-3d-back">
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageGif;

