import { fetchPublicPaymentSettings } from './paymentSettingsService';
import { openCashfreeCheckout } from './cashfreeService';
import { openRazorpayCheckout, isRazorpayEnabled } from './razorpayService';

let cachedSettings = null;
let cacheTime = 0;
const CACHE_MS = 60_000;

export async function getCheckoutSettings(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedSettings && now - cacheTime < CACHE_MS) {
    return cachedSettings;
  }
  cachedSettings = await fetchPublicPaymentSettings();
  cacheTime = now;
  return cachedSettings;
}

export function isCheckoutReady(settings) {
  if (!settings) return false;
  if (settings.checkoutReady) return true;
  if (settings.activeGateway === 'cashfree') return Boolean(settings.cashfreeConfigured);
  return Boolean(settings.razorpayConfigured) || isRazorpayEnabled();
}

export function checkoutGatewayLabel(settings) {
  if (!settings) return 'Payment';
  return settings.activeGateway === 'cashfree' ? 'Cashfree' : 'Razorpay';
}

export async function openSubscriptionCheckout(options) {
  const settings = await getCheckoutSettings(true);

  if (!isCheckoutReady(settings)) {
    throw new Error('Checkout is temporarily unavailable. Please try again later.');
  }

  if (settings.activeGateway === 'cashfree') {
    return openCashfreeCheckout(options);
  }

  return openRazorpayCheckout(options);
}

export function invalidateCheckoutSettingsCache() {
  cachedSettings = null;
  cacheTime = 0;
}
