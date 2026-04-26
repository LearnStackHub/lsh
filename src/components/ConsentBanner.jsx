import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('learnstackhub_consent');
    if (!consentStatus) {
      // Keep initial render light on homepage audits; show after a longer delay.
      const isHomeRoute = window.location.pathname === '/' || window.location.pathname === '/index.html';
      const delayMs = isHomeRoute ? 6000 : 1000;
      setTimeout(() => setShowBanner(true), delayMs);
    } else {
      setConsentGiven(consentStatus === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('learnstackhub_consent', 'accepted');
    localStorage.setItem('learnstackhub_consent_date', new Date().toISOString());
    setConsentGiven(true);
    setShowBanner(false);
    setShowSettings(false);
    
    // Enable Google AdSense and Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('learnstackhub_consent', 'rejected');
    localStorage.setItem('learnstackhub_consent_date', new Date().toISOString());
    setConsentGiven(false);
    setShowBanner(false);
    setShowSettings(false);
    
    // Disable Google AdSense and Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      });
    }
  };

  const handleManageOptions = () => {
    setShowSettings(true);
  };

  const handleSavePreferences = () => {
    // Get user preferences from checkboxes
    const analyticsChecked = document.getElementById('analytics-consent')?.checked ?? true;
    const advertisingChecked = document.getElementById('advertising-consent')?.checked ?? true;
    
    // Save preferences
    localStorage.setItem('learnstackhub_consent', 'accepted');
    localStorage.setItem('learnstackhub_consent_date', new Date().toISOString());
    localStorage.setItem('learnstackhub_analytics_consent', analyticsChecked.toString());
    localStorage.setItem('learnstackhub_advertising_consent', advertisingChecked.toString());
    
    setConsentGiven(true);
    setShowBanner(false);
    setShowSettings(false);
    
    // Update Google consent based on preferences
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': advertisingChecked ? 'granted' : 'denied',
        'analytics_storage': analyticsChecked ? 'granted' : 'denied'
      });
    }
  };

  if (!showBanner && !showSettings) {
    return null;
  }

  if (showSettings) {
    return (
      <div className="consent-overlay">
        <div className="consent-modal">
          <div className="consent-modal-header">
            <h2>Cookie Preferences</h2>
            <button 
              className="consent-close-btn"
              onClick={() => setShowSettings(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="consent-modal-content">
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              We use cookies and similar technologies to provide, protect, and improve our services. 
              You can choose which cookies you want to accept.
            </p>

            <div className="consent-option">
              <div className="consent-option-header">
                <h3>Essential Cookies</h3>
                <span className="consent-required">Required</span>
              </div>
              <p className="consent-option-desc">
                These cookies are necessary for the website to function and cannot be switched off. 
                They are usually only set in response to actions made by you.
              </p>
            </div>

            <div className="consent-option">
              <div className="consent-option-header">
                <h3>Analytics Cookies</h3>
                <label className="consent-toggle">
                  <input 
                    type="checkbox" 
                    defaultChecked={true}
                    id="analytics-consent"
                  />
                  <span className="consent-toggle-slider"></span>
                </label>
              </div>
              <p className="consent-option-desc">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously.
              </p>
            </div>

            <div className="consent-option">
              <div className="consent-option-header">
                <h3>Advertising Cookies</h3>
                <label className="consent-toggle">
                  <input 
                    type="checkbox" 
                    defaultChecked={true}
                    id="advertising-consent"
                  />
                  <span className="consent-toggle-slider"></span>
                </label>
              </div>
              <p className="consent-option-desc">
                These cookies are used to make advertising messages more relevant to you and your interests. 
                They also perform functions like preventing the same ad from appearing repeatedly.
              </p>
            </div>

            <div className="consent-links">
              <Link to="/privacy" target="_blank">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" target="_blank">Terms of Service</Link>
            </div>
          </div>

          <div className="consent-modal-footer">
            <button 
              className="consent-btn consent-btn-secondary"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </button>
            <button 
              className="consent-btn consent-btn-primary"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="consent-banner">
      <div className="consent-banner-content">
        <div className="consent-banner-icon">
          <Cookie size={24} />
        </div>
        <div className="consent-banner-text">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, 
            and analyze our traffic. By clicking "Consent", you consent to our use of cookies.{' '}
            <Link to="/privacy" target="_blank" style={{ color: 'var(--accent-primary)' }}>
              View privacy policy details
            </Link>
          </p>
        </div>
        <div className="consent-banner-actions">
          <button 
            className="consent-btn consent-btn-manage"
            onClick={handleManageOptions}
          >
            <Settings size={16} />
            Manage options
          </button>
          <button 
            className="consent-btn consent-btn-accept"
            onClick={handleAccept}
          >
            <Check size={16} />
            Consent
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;

