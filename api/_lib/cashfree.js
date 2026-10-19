const API_VERSION = '2023-08-01';

export function getCashfreeAppId() {
  return process.env.CASHFREE_APP_ID?.trim() || process.env.CASHFREE_CLIENT_ID?.trim() || '';
}

export function getCashfreeSecret() {
  return process.env.CASHFREE_SECRET_KEY?.trim() || process.env.CASHFREE_CLIENT_SECRET?.trim() || '';
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

/** Cashfree customer_id: alphanumeric, `_` and `-` only. */
export function sanitizeCashfreeCustomerId(rawId) {
  const cleaned = String(rawId || 'guest')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 50);
  return cleaned.length >= 3 ? cleaned : `uid_${Date.now()}`;
}

export function defaultCashfreeCustomerPhone() {
  const fromEnv = String(
    process.env.CASHFREE_DEFAULT_CUSTOMER_PHONE ||
      process.env.VITE_MENTOR_PHONE_TEL ||
      process.env.VITE_MENTOR_WHATSAPP ||
      ''
  ).replace(/\D/g, '');
  const digits = fromEnv.slice(-10);
  return digits.length === 10 ? digits : '9999999999';
}

function cashfreeHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-version': API_VERSION,
    'x-client-id': getCashfreeAppId(),
    'x-client-secret': getCashfreeSecret(),
  };
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

export async function createCashfreeOrder({
  orderId,
  amountMinor,
  currency = 'INR',
  customerId,
  customerEmail,
  customerPhone,
  returnUrl,
  notifyUrl,
  notes = {},
}) {
  const orderCurrency = String(currency || 'INR').toUpperCase();
  const orderAmount = minorToCashfreeAmount(amountMinor, orderCurrency);

  const response = await fetch(`${getCashfreeBaseUrl()}/orders`, {
    method: 'POST',
    headers: cashfreeHeaders(),
    body: JSON.stringify({
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail || 'customer@learnstackhub.com',
        customer_phone: String(customerPhone || '').replace(/\D/g, '').slice(-10) || defaultCashfreeCustomerPhone(),
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl,
      },
      order_note: Object.entries(notes)
        .map(([k, v]) => `${k}=${v}`)
        .join('; ')
        .slice(0, 256),
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail =
      payload?.message ||
      payload?.error?.message ||
      (Array.isArray(payload?.details) ? payload.details.map((d) => d?.message).filter(Boolean).join('; ') : '') ||
      '';
    const message = detail ? `Cashfree: ${detail}` : 'Cashfree order creation failed';
    console.error('Cashfree create order failed:', response.status, JSON.stringify(payload).slice(0, 500));
    throw new Error(message);
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
