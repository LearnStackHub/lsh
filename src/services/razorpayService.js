import { auth } from '../config/firebase';
import { getCheckoutBranding } from '../config/brand';

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

let scriptPromise = null;

function loadRazorpayScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay is only available in the browser'));
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

export async function createSubscriptionOrder(planId) {
  const token = await getAuthToken();
  const response = await fetch('/api/razorpay-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'Payment API is not running. Stop the dev server and run npm run dev again (starts UI + API).'
      );
    }
    if (response.status >= 500) {
      throw new Error(
        'Payment API error. Check the terminal for [local-api] logs — ensure firebase admin: ready is shown.'
      );
    }
    if (response.status === 503 && payload.code === 'MISSING_RAZORPAY_CREDENTIALS') {
      throw new Error('Payment is not configured. Add Razorpay keys to .env.');
    }
    if (response.status === 503 && payload.error === 'Not configured') {
      throw new Error(
        'Server is missing Firebase Admin credentials. Add FIREBASE_SERVICE_ACCOUNT to .env for local checkout.'
      );
    }
    throw new Error(payload.error || payload.code || 'Could not start checkout');
  }

  return payload;
}

export async function verifySubscriptionPayment({ planId, orderId, paymentId, signature }) {
  const token = await getAuthToken();
  const response = await fetch('/api/razorpay-verify', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'Payment API is not running. Stop the dev server and run npm run dev again (starts UI + API).'
      );
    }
    if (response.status === 503 && payload.code === 'MISSING_RAZORPAY_CREDENTIALS') {
      throw new Error('Payment is not configured. Add Razorpay keys to .env.');
    }
    if (response.status === 503 && payload.code === 'MISSING_FIREBASE_ADMIN') {
      throw new Error(
        'Server is missing Firebase Admin credentials. Add FIREBASE_SERVICE_ACCOUNT_PATH to .env and restart npm run dev.'
      );
    }
    if (response.status === 503 && payload.code === 'FIRESTORE_PERMISSION_DENIED') {
      throw new Error('Could not activate subscription in Firestore. Check service account permissions.');
    }
    if (response.status === 503) {
      throw new Error(
        payload.error ||
          'Payment verification failed. Restart npm run dev so the local API reloads, then try again.'
      );
    }
    if (response.status === 401) {
      throw new Error('Your session expired. Sign in again and retry checkout.');
    }
    if (response.status === 400 && payload.code === 'INVALID_SIGNATURE') {
      throw new Error('Payment signature mismatch. Contact support with your order ID.');
    }
    throw new Error(payload.error || 'Payment verification failed');
  }

  return payload;
}

export async function openRazorpayCheckout({ planId, user, onSuccess, onDismiss }) {
  const order = await createSubscriptionOrder(planId);
  const Razorpay = await loadRazorpayScript();

  if (!order.keyId) {
    throw new Error('Payment is not configured on the server');
  }

  return new Promise((resolve, reject) => {
    const branding = getCheckoutBranding(order.planLabel);

    const checkout = new Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency || 'INR',
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
      },
      handler: async (response) => {
        try {
          const verified = await verifySubscriptionPayment({
            planId,
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
