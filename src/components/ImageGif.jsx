import { useState } from 'react';
import { Maximize2, Minimize2, Download, ExternalLink } from 'lucide-react';

export function ImageGif({ src, alt, caption, type = 'image', width, height }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = alt || 'image';
    link.click();
  };

  const isGif = src?.toLowerCase().endsWith('.gif') || type === 'gif';

  return (
    <div className={`image-gif-container ${isExpanded ? 'expanded' : ''}`}>
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
              src={src}
              alt={alt || 'Animated GIF'}
              className="gif-image"
              onLoad={handleImageLoad}
              style={{ width, height }}
            />
          ) : (
            <img
              src={src}
              alt={alt || 'Image'}
              className="static-image"
              onLoad={handleImageLoad}
              style={{ width, height }}
            />
          )}
          {isGif && (
            <div className="gif-badge">
              <span className="gif-indicator">GIF</span>
            </div>
          )}
        </div>
        
        <div className="image-gif-controls">
          <button
            className="control-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            className="control-btn"
            onClick={handleDownload}
            title="Download"
          >
            <Download size={16} />
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="control-btn"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
      
      {caption && (
        <div className="image-gif-caption">{caption}</div>
      )}
    </div>
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

