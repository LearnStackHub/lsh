const API_VERSION = '2023-08-01';

function stripEnvValue(value) {
  return String(value || '')
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

export function getCashfreeAppId() {
  return stripEnvValue(process.env.CASHFREE_APP_ID) || stripEnvValue(process.env.CASHFREE_CLIENT_ID);
}

export function getCashfreeSecret() {
  return stripEnvValue(process.env.CASHFREE_SECRET_KEY) || stripEnvValue(process.env.CASHFREE_CLIENT_SECRET);
}

export function getCashfreeMode() {
  const raw = String(process.env.CASHFREE_ENV || process.env.CASHFREE_MODE || 'sandbox')
    .trim()
    .toLowerCase();
  return raw === 'production' || raw === 'prod' ? 'production' : 'sandbox';
}

export function getCashfreeBaseUrl() {
  return getCashfreeMode() === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';
}

export function isCashfreeConfigured() {
  return Boolean(getCashfreeAppId() && getCashfreeSecret());
}

/** Detect common Vercel misconfiguration before calling Cashfree. */
export function getCashfreeCredentialHint() {
  const appId = getCashfreeAppId();
  const mode = getCashfreeMode();
  if (!appId) {
    return 'CASHFREE_APP_ID (Client ID) is missing in Vercel.';
  }
  if (!getCashfreeSecret()) {
    return 'CASHFREE_SECRET_KEY (Client Secret) is missing in Vercel.';
  }

  const upper = appId.toUpperCase();

  if (mode === 'sandbox' && upper.startsWith('PROD_')) {
    return 'Client ID starts with PROD_ (live key) but CASHFREE_ENV is sandbox. In Vercel set CASHFREE_ENV=production, OR in Cashfree click Switch to Test and paste TEST_ keys.';
  }
  if (mode === 'production' && upper.startsWith('TEST_')) {
    return 'Client ID starts with TEST_ but CASHFREE_ENV is production. Set CASHFREE_ENV=sandbox for test keys, or use live PROD_ keys after account activation.';
  }

  return null;
}

/** Cashfree customer_id: alphanumeric, `_` and `-` only. */
export function sanitizeCashfreeCustomerId(rawId) {
  const cleaned = String(rawId || 'guest')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 50);
  return cleaned.length >= 3 ? cleaned : `uid_${Date.now()}`;
}

/** Normalize to 10-digit Indian mobile (Cashfree PG requirement). */
export function normalizeIndianPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  if (digits.length === 10) {
    return digits;
  }
  return '';
}

function cashfreeHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-version': API_VERSION,
    'x-client-id': getCashfreeAppId(),
    'x-client-secret': getCashfreeSecret(),
  };
}

function formatCashfreeApiError(responseStatus, payload) {
  const parts = [
    payload?.message,
    payload?.error?.message,
    payload?.error?.description,
    payload?.code,
    Array.isArray(payload?.details)
      ? payload.details.map((d) => d?.message || d?.field).filter(Boolean).join('; ')
      : '',
  ].filter(Boolean);

  if (responseStatus === 401 || payload?.type === 'authentication_error') {
    return `Cashfree authentication failed. Use Payment Gateway Client ID + Secret from the Cashfree dashboard, and set CASHFREE_ENV to "${getCashfreeMode()}" (sandbox keys need sandbox, live keys need production).`;
  }

  if (parts.length) {
    return `Cashfree: ${parts.join(' — ')}`;
  }

  return `Cashfree order creation failed (HTTP ${responseStatus})`;
}

/** Cashfree order_amount is in major currency units (INR rupees, USD dollars). */
export function minorToCashfreeAmount(amountMinor, currency = 'INR') {
  const minor = Math.round(Number(amountMinor));
  if (!Number.isFinite(minor) || minor < 1) {
    throw new Error('Payment amount is not configured for this plan');
  }
  if (String(currency).toUpperCase() === 'INR') {
    return Number((minor / 100).toFixed(2));
  }
  return Number((minor / 100).toFixed(2));
}

function buildCustomerDetails({ customerId, customerEmail, customerName, customerPhone }) {
  const details = {
    customer_id: customerId,
    customer_name: String(customerName || 'Customer').slice(0, 100),
  };
  const email = String(customerEmail || '').trim();
  if (email) {
    details.customer_email = email;
  }
  const phone = normalizeIndianPhone(customerPhone);
  if (phone) {
    details.customer_phone = phone;
  }
  return details;
}

/** Cashfree Create Order API requires a phone field; use only when the API rejects requests without it. */
function cashfreeApiPlaceholderPhone() {
  const fromEnv = normalizeIndianPhone(process.env.CASHFREE_ORDER_API_PHONE);
  return fromEnv || '9999999999';
}

async function postCashfreeOrderRequest(orderBody) {
  const response = await fetch(`${getCashfreeBaseUrl()}/orders`, {
    method: 'POST',
    headers: cashfreeHeaders(),
    body: JSON.stringify(orderBody),
  });
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

function orderNeedsPhoneRetry(payload) {
  const text = JSON.stringify(payload || {}).toLowerCase();
  return /customer_phone|customer phone|phone.*required|invalid.*phone/.test(text);
}

export async function createCashfreeOrder({
  orderId,
  amountMinor,
  currency = 'INR',
  customerId,
  customerEmail,
  customerName,
  customerPhone,
  returnUrl,
  notifyUrl,
  notes = {},
}) {
  const orderCurrency = String(currency || 'INR').toUpperCase();
  const orderAmount = minorToCashfreeAmount(amountMinor, orderCurrency);
  if (orderAmount < 1) {
    throw new Error(
      'Payment amount is not configured for this plan (Cashfree requires at least ₹1). Check RAZORPAY_PLAN_*_PAISE env vars use paise, e.g. 99900 for ₹999.'
    );
  }

  const orderMeta = { return_url: returnUrl };
  if (notifyUrl) {
    orderMeta.notify_url = notifyUrl;
  }

  const orderNote = Object.entries(notes)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')
    .slice(0, 256);

  const baseOrder = {
    order_id: orderId,
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_meta: orderMeta,
    order_note: orderNote,
  };

  let { response, payload } = await postCashfreeOrderRequest({
    ...baseOrder,
    customer_details: buildCustomerDetails({ customerId, customerEmail, customerName, customerPhone }),
  });

  if (!response.ok && !normalizeIndianPhone(customerPhone) && orderNeedsPhoneRetry(payload)) {
    ({ response, payload } = await postCashfreeOrderRequest({
      ...baseOrder,
      customer_details: buildCustomerDetails({
        customerId,
        customerEmail,
        customerName,
        customerPhone: cashfreeApiPlaceholderPhone(),
      }),
    }));
  }

  if (!response.ok) {
    const message = formatCashfreeApiError(response.status, payload);
    console.error('Cashfree create order failed:', response.status, JSON.stringify(payload).slice(0, 500));
    throw new Error(message);
  }

  if (!payload?.payment_session_id) {
    console.error('Cashfree create order missing payment_session_id:', JSON.stringify(payload).slice(0, 500));
    throw new Error('Cashfree: order created but payment session was missing. Check PG API keys and account status.');
  }

  return payload;
}

export async function fetchCashfreeOrder(orderId) {
  const response = await fetch(`${getCashfreeBaseUrl()}/orders/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: cashfreeHeaders(),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || payload?.error?.message || 'Could not fetch Cashfree order';
    throw new Error(message);
  }

  return payload;
}

export function isCashfreeOrderPaid(orderPayload) {
  const status = String(orderPayload?.order_status || orderPayload?.orderStatus || '').toUpperCase();
  return status === 'PAID' || status === 'SUCCESS';
}

export function extractCashfreePaymentId(orderPayload) {
  const payments = orderPayload?.payments || orderPayload?.order_payments;
  if (Array.isArray(payments) && payments.length > 0) {
    const latest = payments[payments.length - 1];
    return String(latest.cf_payment_id || latest.payment_id || latest.id || '').trim();
  }
  return String(orderPayload?.cf_order_id || orderPayload?.order_id || '').trim();
}
