import crypto from 'node:crypto';

const RAZORPAY_API = 'https://api.razorpay.com/v1';

export function getRazorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID?.trim() || process.env.VITE_RAZORPAY_KEY_ID?.trim() || '';
}

export function getRazorpayKeySecret() {
  return process.env.RAZORPAY_KEY_SECRET?.trim() || '';
}

export function isRazorpayConfigured() {
  return Boolean(getRazorpayKeyId() && getRazorpayKeySecret());
}

export function formatPlanAccessLabel(plan) {
  if (!plan) return 'Subscription access';
  if (plan.durationMonths === 1) return `${plan.label} — 1 month platform access`;
  if (plan.durationMonths) return `${plan.label} — ${plan.durationMonths} months platform access`;
  return `${plan.label} — ${plan.durationDays} days platform access`;
}

export function getPlanConfig(planId) {
  const plans = {
    six_months: {
      id: 'six_months',
      durationDays: 180,
      durationMonths: 6,
      amountPaise: Number(process.env.RAZORPAY_PLAN_6MONTHS_PAISE || 99900),
      label: '6 Months Access',
    },
    twelve_months: {
      id: 'twelve_months',
      durationDays: 365,
      durationMonths: 12,
      amountPaise: Number(
        process.env.RAZORPAY_PLAN_12MONTHS_PAISE ||
          process.env.RAZORPAY_PLAN_YEARLY_PAISE ||
          1499900
      ),
      label: '12 Months + Live Training',
    },
    // Legacy plans — existing subscriptions & invoices
    monthly: {
      id: 'monthly',
      durationDays: 30,
      durationMonths: 1,
      amountPaise: Number(process.env.RAZORPAY_PLAN_MONTHLY_PAISE || 49900),
      label: 'Monthly Access',
    },
    yearly: {
      id: 'yearly',
      durationDays: 365,
      durationMonths: 12,
      amountPaise: Number(process.env.RAZORPAY_PLAN_YEARLY_PAISE || 399900),
      label: 'Yearly Access',
    },
  };

  return plans[planId] || null;
}

function getAuthHeader() {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();
  const token = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  return `Basic ${token}`;
}

function resolveOrderAmountMinor({ amountMinor, amountPaise, amount }) {
  const raw = amountMinor ?? amountPaise ?? amount;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error('Payment amount is not configured for this plan');
  }
  return Math.round(parsed);
}

export async function createRazorpayOrder({ amountMinor, amountPaise, amount, currency = 'INR', receipt, notes }) {
  const resolvedCurrency = String(currency || 'INR').toUpperCase();
  const resolvedAmount = resolveOrderAmountMinor({ amountMinor, amountPaise, amount });

  const response = await fetch(`${RAZORPAY_API}/orders`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: resolvedAmount,
      currency: resolvedCurrency,
      receipt,
      notes,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.description || payload?.error?.reason || 'Order creation failed';
    throw new Error(message);
  }

  return payload;
}

export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const secret = getRazorpayKeySecret();
  if (!secret || !orderId || !paymentId || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret || !rawBody || !signature) {
    return false;
  }

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export function parseJsonBody(req) {
  const raw = req.body;
  if (raw == null) {
    return {};
  }
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') {
    return raw;
  }
  return null;
}
