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

  return {
    invoiceNumber,
    orderId,
    paymentId,
    uid,
    planId: plan.id,
    planLabel: plan.label,
    durationDays: plan.durationDays,
    amountPaise: plan.amountPaise,
    currency: 'INR',
    customerEmail: customerEmail || '',
    customerName: customerName || 'Customer',
    sellerName: 'LearnStackHub',
    sellerEmail: process.env.INVOICE_SELLER_EMAIL?.trim() || 'careers@learnstackhub.com',
    description: formatPlanAccessLabel(plan),
  };
}

export function enrichPaymentData(data) {
  if (!data) {
    return data;
  }

  const plan = data.planId ? getPlanConfig(data.planId) : null;
  let amountPaise = Number(data.amountPaise ?? data.amount ?? 0);

  if ((!amountPaise || amountPaise <= 0) && plan?.amountPaise) {
    amountPaise = plan.amountPaise;
  }

  const planLabelLooksLikeId =
    !data.planLabel || data.planLabel === data.planId || data.planLabel === data.planId?.toLowerCase();

  return {
    ...data,
    planLabel: planLabelLooksLikeId ? plan?.label || data.planId || 'Subscription' : data.planLabel,
    durationDays: data.durationDays || plan?.durationDays || null,
    amountPaise,
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
  const amountPaise = Number(enriched.amountPaise || 0);

  return {
    invoiceNumber: enriched.invoiceNumber || buildInvoiceNumber(enriched.orderId),
    orderId: enriched.orderId,
    paymentId: enriched.paymentId || '',
    planId: enriched.planId || '',
    planLabel: enriched.planLabel || enriched.planId || 'Subscription',
    durationDays: enriched.durationDays || null,
    amountPaise,
    amountInr: amountPaise / 100,
    currency: enriched.currency || 'INR',
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
