import { auth } from '../config/firebase';
import { getPlanById, formatPlanDuration, formatPlanAccessDescription } from '../config/subscriptionPlans';

export function enrichInvoiceClient(invoice) {
  if (!invoice) {
    return invoice;
  }

  const plan = invoice.planId ? getPlanById(invoice.planId) : null;
  const currency = invoice.currency || 'INR';
  let amountInr = Number(invoice.amountInr || 0);
  let amountUsd = Number(invoice.amountUsd || 0);

  if (currency === 'USD') {
    if ((!amountUsd || amountUsd <= 0) && invoice.amountMinor) {
      amountUsd = Math.round(Number(invoice.amountMinor) / 100);
    }
    if ((!amountUsd || amountUsd <= 0) && plan?.earlyAmountUsd) {
      amountUsd = plan.earlyAmountUsd;
    }
  } else {
    if ((!amountInr || amountInr <= 0) && invoice.amountMinor) {
      amountInr = Math.round(Number(invoice.amountMinor) / 100);
    }
    if ((!amountInr || amountInr <= 0) && plan?.amountInr) {
      amountInr = plan.amountInr;
    }
  }

  const planLabelLooksLikeId =
    !invoice.planLabel || invoice.planLabel === invoice.planId || invoice.planLabel === invoice.planId?.toLowerCase();

  return {
    ...invoice,
    amountInr,
    amountUsd,
    currency,
    planLabel: planLabelLooksLikeId ? plan?.name || invoice.planLabel : invoice.planLabel,
    durationDays: invoice.durationDays || plan?.durationDays || null,
    durationLabel: formatPlanDuration(plan),
    description: invoice.description || (plan ? formatPlanAccessDescription(plan) : 'Subscription access'),
  };
}

async function getAuthToken() {
  if (!auth?.currentUser) {
    throw new Error('Sign in required');
  }

  return auth.currentUser.getIdToken(true);
}

export async function fetchInvoices() {
  const token = await getAuthToken();
  const response = await fetch('/api/invoices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'Invoice API is not running. Stop the dev server and run npm run dev again (starts UI + API).'
      );
    }
    throw new Error(payload.error || 'Could not load invoices');
  }

  return (payload.invoices || []).map(enrichInvoiceClient);
}

export async function fetchInvoice(orderId) {
  const token = await getAuthToken();
  const response = await fetch(`/api/invoices?orderId=${encodeURIComponent(orderId)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Could not load invoice');
  }

  return enrichInvoiceClient(payload.invoice);
}

export function formatInvoiceAmount(invoice) {
  const currency = invoice?.currency || 'INR';
  const amount =
    currency === 'USD'
      ? Number(invoice?.amountUsd || 0)
      : Number(invoice?.amountInr || 0);
  const locale = currency === 'USD' ? 'en-US' : 'en-IN';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export function formatInvoiceDate(isoDate) {
  if (!isoDate) {
    return '—';
  }

  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
