const DEFAULT_SITE_URL = 'https://www.learnstackhub.com';

export const BRAND = {
  name: 'LearnStackHub',
  shortName: 'LSH',
  tagline: 'Java Full Stack EdTech',
  description: 'Structured tutorials, MCQs, and Practice Lab for developers',
  themeColor: '#1d4ed8',
  accentColor: '#2563eb',
};

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return DEFAULT_SITE_URL;
}

/** Public HTTPS logo URL for Razorpay checkout (must be reachable by Razorpay servers). */
export function getRazorpayLogoUrl() {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocal = host === 'localhost' || host === '127.0.0.1';

  if (isLocal) {
    return `${DEFAULT_SITE_URL}/LSH.png`;
  }

  return `${getSiteUrl()}/LSH.png`;
}

export function getCheckoutBranding(planLabel) {
  return {
    name: BRAND.name,
    description: planLabel ? `${planLabel} · ${BRAND.tagline}` : BRAND.tagline,
    image: getRazorpayLogoUrl(),
    themeColor: BRAND.themeColor,
  };
}
