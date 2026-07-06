import { auth } from '../config/firebase';
import { getCheckoutBranding } from '../config/brand';
import {
  CHECKOUT_UNAVAILABLE,
  PAYMENT_VERIFY_FAILED,
  devOnlyMessage,
  sanitizeUserMessage,
} from '../utils/userFacingErrors';

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

let scriptPromise = null;

function loadRazorpayScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Payment checkout is only available in the browser'));
  }

  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve(window.Razorpay));
        existing.addEventListener('error', () => reject(new Error('Failed to load payment checkout')));
        return;
      }

      const script = document.createElement('script');
      script.src = CHECKOUT_SCRIPT;
      script.async = true;
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => reject(new Error('Failed to load payment checkout'));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

async function getAuthToken() {
  if (!auth?.currentUser) {
    throw new Error('Sign in required');
  }

  return auth.currentUser.getIdToken(true);
}

function mapOrderError(response, payload) {
  if (response.status === 404) {
    return devOnlyMessage(
      'Payment API is not running. Stop the dev server and run npm run dev again (starts UI + API).',
      CHECKOUT_UNAVAILABLE
    );
  }
  if (response.status === 401) {
    return 'Your session expired. Sign in again and retry checkout.';
  }
  if (response.status === 503 || response.status >= 500) {
    return devOnlyMessage(
      payload.message || payload.code || `Payment API error (${response.status})`,
      CHECKOUT_UNAVAILABLE
    );
  }
  return sanitizeUserMessage(payload.error || payload.message, CHECKOUT_UNAVAILABLE);
}

function mapVerifyError(response, payload) {
  if (response.status === 404) {
    return devOnlyMessage(
      'Payment API is not running. Stop the dev server and run npm run dev again (starts UI + API).',
      PAYMENT_VERIFY_FAILED
    );
  }
  if (response.status === 401) {
    return 'Your session expired. Sign in again and retry checkout.';
  }
  if (response.status === 400 && payload.code === 'INVALID_SIGNATURE') {
    return 'Payment could not be verified. Contact careers@learnstackhub.com with your order ID.';
  }
  if (response.status === 503 || response.status >= 500) {
    return devOnlyMessage(payload.message || payload.code || 'Verification failed', PAYMENT_VERIFY_FAILED);
  }
  return sanitizeUserMessage(payload.error, PAYMENT_VERIFY_FAILED);
}

export async function createSubscriptionOrder(planId, currency = 'INR') {
  const token = await getAuthToken();
  const response = await fetch('/api/razorpay-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId, currency }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(mapOrderError(response, payload));
  }

  return payload;
}

export async function verifySubscriptionPayment({ planId, currency = 'INR', orderId, paymentId, signature }) {
  const token = await getAuthToken();
  const response = await fetch('/api/razorpay-verify', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId,
      currency,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(mapVerifyError(response, payload));
  }

  return payload;
}

export async function openRazorpayCheckout({ planId, currency = 'INR', user, onSuccess, onDismiss }) {
  const order = await createSubscriptionOrder(planId, currency);
  const Razorpay = await loadRazorpayScript();

  if (!order.keyId) {
    throw new Error(CHECKOUT_UNAVAILABLE);
  }

  const checkoutCurrency = order.currency || currency || 'INR';

  return new Promise((resolve, reject) => {
    const branding = getCheckoutBranding(order.planLabel);

    const checkout = new Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: checkoutCurrency,
      name: branding.name,
      description: branding.description,
      image: branding.image,
      order_id: order.orderId,
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
      },
      theme: {
        color: branding.themeColor,
        backdrop_color: '#eef2ff',
      },
      notes: {
        platform: 'LearnStackHub',
        product: 'EdTech Subscription',
        plan: order.planLabel || planId,
        currency: checkoutCurrency,
      },
      ...(checkoutCurrency === 'INR'
        ? {}
        : {
            config: {
              display: {
                blocks: {
                  card: {
                    name: 'Pay with card',
                    instruments: [{ method: 'card' }],
                  },
                },
                sequence: ['block.card'],
                preferences: { show_default_blocks: false },
              },
            },
          }),
      handler: async (response) => {
        try {
          const verified = await verifySubscriptionPayment({
            planId,
            currency: checkoutCurrency,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          onSuccess?.(verified);
          resolve(verified);
        } catch (error) {
          reject(error);
        }
      },
      modal: {
        ondismiss: () => {
          onDismiss?.();
          reject(new Error('Payment cancelled'));
        },
      },
    });

    checkout.on('payment.failed', () => {
      reject(new Error('Payment failed. Please try again.'));
    });

    checkout.open();
  });
}

export function isRazorpayEnabled() {
  return Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID?.trim());
}
