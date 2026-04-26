// Google AdSense Configuration
// ⚠️ IMPORTANT: Replace placeholder ad slot IDs with real ones from AdSense dashboard
// See ADSENSE_SETUP_GUIDE.md for step-by-step instructions

export const ADSENSE_CONFIG = {
  // Temporary review mode: reduce ad density while fixing policy feedback.
  reviewMode: true,

  // Your AdSense Publisher ID (from AdSense dashboard)
  // Format: ca-pub-XXXXXXXXXX
  publisherId: 'ca-pub-2176490979231754', // ✅ Already configured
  
  // Ad Slot IDs (create these in your AdSense dashboard)
  // ⚠️ These are PLACEHOLDERS - replace with real ad unit IDs to prevent errors
  // Get real IDs from: AdSense Dashboard → Ads → By ad unit → Create new ad unit
  adSlots: {
    // Top banner ad (after header)
    topBanner: '2222222222', // ⚠️ REPLACE with real ad unit ID
    
    // Sidebar ad (in sidebar)
    sidebar: '1111111111', // ⚠️ REPLACE with real ad unit ID
    
    // Bottom banner ad (before footer)
    bottomBanner: '3333333333', // ⚠️ REPLACE with real ad unit ID
    
    // In-content ad (top of tutorial content)
    inContentTop: '4444444444', // ⚠️ REPLACE with real ad unit ID
    
    // In-content ad (bottom of tutorial content)
    inContentBottom: '5555555555', // ⚠️ REPLACE with real ad unit ID
    
    // Home page ad
    homePage: '6666666666' // ⚠️ REPLACE with real ad unit ID (optional)
  }
};

// Check if AdSense is configured
export const isAdSenseConfigured = () => {
  return ADSENSE_CONFIG.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX';
};

// Check if an ad slot is a valid (non-placeholder) slot ID
export const isValidAdSlot = (adSlot) => {
  if (!adSlot) return false;
  
  // Placeholder slot IDs that should not be used
  const placeholderSlots = [
    '1111111111',
    '2222222222',
    '3333333333',
    '4444444444',
    '5555555555',
    '6666666666',
    '1234567890',
    '0000000000'
  ];
  
  // Check if it's a placeholder
  if (placeholderSlots.includes(adSlot.toString())) {
    return false;
  }
  
  // Check if it's a valid numeric string (AdSense slots are numeric)
  const slotStr = adSlot.toString();
  if (!/^\d+$/.test(slotStr)) {
    return false;
  }
  
  // Valid slot IDs are typically 10 digits
  return slotStr.length >= 8 && slotStr.length <= 12;
};


