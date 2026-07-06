import { getPlanConfig, formatPlanAccessLabel } from './razorpay.js';

export function buildInvoiceNumber(orderId) {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = String(orderId || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(-8)
    .toUpperCase();

  return `LSH-${ymd}-${suffix || 'PAYMENT'}`;
}

export function buildInvoiceFields({ orderId, paymentId, uid, plan, customerEmail, customerName }) {
  const invoiceNumber = buildInvoiceNumber(orderId);
  const currency = plan.currency || 'INR';
  const amountMinor = Number(plan.amountMinor ?? plan.amountPaise ?? 0);

  const fields = {
    invoiceNumber,
    orderId,
    paymentId,
    uid,
    planId: plan.id,
    planLabel: plan.label,
    durationDays: plan.durationDays,
    amountMinor,
    currency,
    customerEmail: customerEmail || '',
    customerName: customerName || 'Customer',
    sellerName: 'LearnStackHub',
    sellerEmail: process.env.INVOICE_SELLER_EMAIL?.trim() || 'careers@learnstackhub.com',
    description: formatPlanAccessLabel(plan),
  };

  if (currency === 'USD') {
    return {
      ...fields,
      amountUsd: plan.amountUsd ?? Math.round(amountMinor / 100),
    };
  }

  return {
    ...fields,
    amountPaise: amountMinor,
    amountInr: plan.amountInr ?? Math.round(amountMinor / 100),
  };
}

export function enrichPaymentData(data) {
  if (!data) {
    return data;
  }

  const plan = data.planId ? getPlanConfig(data.planId) : null;
  const currency = data.currency || 'INR';
  let amountMinor = Number(data.amountMinor ?? data.amountPaise ?? data.amount ?? 0);

  if ((!amountMinor || amountMinor <= 0) && plan?.amountPaise && currency === 'INR') {
    amountMinor = plan.amountPaise;
  }

  const amountInr =
    currency === 'INR'
      ? Number(data.amountInr || (amountMinor ? Math.round(amountMinor / 100) : 0))
      : Number(data.amountInr || 0);
  const amountUsd =
    currency === 'USD'
      ? Number(data.amountUsd || (amountMinor ? Math.round(amountMinor / 100) : 0))
      : Number(data.amountUsd || 0);

  const planLabelLooksLikeId =
    !data.planLabel || data.planLabel === data.planId || data.planLabel === data.planId?.toLowerCase();

  return {
    ...data,
    planLabel: planLabelLooksLikeId ? plan?.label || data.planId || 'Subscription' : data.planLabel,
    durationDays: data.durationDays || plan?.durationDays || null,
    amountMinor,
    amountPaise: currency === 'INR' ? amountMinor : data.amountPaise,
    amountInr,
    amountUsd,
    currency,
    description:
      data.description ||
      (plan ? formatPlanAccessLabel(plan) : `${data.planId || 'Subscription'} access`),
    sellerName: data.sellerName || 'LearnStackHub',
    sellerEmail: data.sellerEmail || process.env.INVOICE_SELLER_EMAIL?.trim() || 'careers@learnstackhub.com',
    customerName:
      data.customerName && data.customerName !== 'Customer'
        ? data.customerName
        : data.customerName || 'Customer',
  };
}

function timestampToIso(value) {
  if (!value) {
    return null;
  }

  if (typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export function paymentDocToInvoice(data) {
  if (!data?.orderId) {
    return null;
  }

  const enriched = enrichPaymentData(data);
  const currency = enriched.currency || 'INR';
  const amountMinor = Number(enriched.amountMinor || enriched.amountPaise || 0);
  const amountDisplay =
    currency === 'USD'
      ? Number(enriched.amountUsd || (amountMinor ? amountMinor / 100 : 0))
      : Number(enriched.amountInr || (amountMinor ? amountMinor / 100 : 0));

  return {
    invoiceNumber: enriched.invoiceNumber || buildInvoiceNumber(enriched.orderId),
    orderId: enriched.orderId,
    paymentId: enriched.paymentId || '',
    planId: enriched.planId || '',
    planLabel: enriched.planLabel || enriched.planId || 'Subscription',
    durationDays: enriched.durationDays || null,
    amountMinor,
    amountPaise: currency === 'INR' ? amountMinor : enriched.amountPaise,
    amountInr: currency === 'INR' ? amountDisplay : enriched.amountInr,
    amountUsd: currency === 'USD' ? amountDisplay : enriched.amountUsd,
    currency,
    customerEmail: enriched.customerEmail || '',
    customerName: enriched.customerName || 'Customer',
    sellerName: enriched.sellerName || 'LearnStackHub',
    sellerEmail: enriched.sellerEmail || 'careers@learnstackhub.com',
    description: enriched.description,
    status: enriched.status || 'captured',
    issuedAt: timestampToIso(enriched.issuedAt || enriched.capturedAt),
  };
}

export function sortInvoicesNewestFirst(invoices) {
  return [...invoices].sort((a, b) => {
    const aTime = a.issuedAt ? new Date(a.issuedAt).getTime() : 0;
    const bTime = b.issuedAt ? new Date(b.issuedAt).getTime() : 0;
    return bTime - aTime;
  });
}
