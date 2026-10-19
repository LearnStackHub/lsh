import { auth } from '../config/firebase';
import {
  CHECKOUT_UNAVAILABLE,
  PAYMENT_VERIFY_FAILED,
  devOnlyMessage,
  sanitizeUserMessage,
} from '../utils/userFacingErrors';

const CASHFREE_SDK = 'https://sdk.cashfree.com/js/v3/cashfree.js';

let scriptPromise = null;

function loadCashfreeSdk() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Payment checkout is only available in the browser'));
  }

  if (window.Cashfree) {
    return Promise.resolve(window.Cashfree);
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${CASHFREE_SDK}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve(window.Cashfree));
        existing.addEventListener('error', () => reject(new Error('Failed to load payment checkout')));
        return;
      }
      const script = document.createElement('script');
      script.src = CASHFREE_SDK;
      script.async = true;
      script.onload = () => resolve(window.Cashfree);
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

export async function createCashfreeSubscriptionOrder(planId, currency = 'INR', customerPhone = '') {
  const token = await getAuthToken();
  const response = await fetch('/api/cashfree-order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId, currency, customerPhone }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        devOnlyMessage(
          'Payment API is not running. Stop the dev server and run npm run dev again.',
          CHECKOUT_UNAVAILABLE
        )
      );
    }
    throw new Error(sanitizeUserMessage(payload.error || payload.message, CHECKOUT_UNAVAILABLE));
  }

  return payload;
}

export async function verifyCashfreeSubscriptionPayment({ planId, currency = 'INR', orderId }) {
  const token = await getAuthToken();
  const response = await fetch('/api/cashfree-verify', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId, currency, orderId }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(sanitizeUserMessage(payload.error, PAYMENT_VERIFY_FAILED));
  }

  return payload;
}

export async function openCashfreeCheckout({ planId, currency = 'INR', customerPhone, onSuccess, onDismiss }) {
  const order = await createCashfreeSubscriptionOrder(planId, currency, customerPhone);
  const Cashfree = await loadCashfreeSdk();

  if (!order.paymentSessionId) {
    throw new Error(CHECKOUT_UNAVAILABLE);
  }

  const mode = order.cashfreeMode === 'production' ? 'production' : 'sandbox';
  const cashfree = Cashfree({ mode });

  const result = await cashfree.checkout({
    paymentSessionId: order.paymentSessionId,
    redirectTarget: '_modal',
  });

  if (result?.error) {
    const message = result.error.message || 'Payment failed';
    if (/closed|cancel/i.test(message)) {
      onDismiss?.();
      throw new Error('Payment cancelled');
    }
    throw new Error(message);
  }

  const verified = await verifyCashfreeSubscriptionPayment({
    planId,
    currency: order.currency || currency,
    orderId: order.orderId,
  });

  onSuccess?.(verified);
  return verified;
}
