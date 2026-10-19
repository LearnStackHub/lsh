import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { buildInvoiceFields, buildInvoiceNumber, enrichPaymentData } from './invoices.js';
import { getPlanConfig, formatPlanAccessLabel } from './razorpay.js';

async function backfillPaymentDoc(db, orderId, { plan, customerEmail, customerName, paymentId }) {
  if (!db || !orderId || !plan) {
    return;
  }

  const ref = db.collection('payments').doc(orderId);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    return;
  }

  const data = snapshot.data();
  const patch = {};

  if (!data.amountMinor && !data.amountPaise && plan?.amountPaise && (data.currency || 'INR') === 'INR') {
    patch.amountMinor = plan.amountPaise;
    patch.amountPaise = plan.amountPaise;
  }
  if (!data.currency && plan.currency) {
    patch.currency = plan.currency;
  }
  if (!data.planLabel || data.planLabel === data.planId) {
    patch.planLabel = plan.label;
  }
  if (!data.durationDays && plan.durationDays) {
    patch.durationDays = plan.durationDays;
  }
  if (!data.invoiceNumber) {
    patch.invoiceNumber = buildInvoiceNumber(orderId);
  }
  if (!data.description) {
    patch.description = formatPlanAccessLabel(plan);
  }
  if (!data.customerEmail && customerEmail) {
    patch.customerEmail = customerEmail;
  }
  if ((!data.customerName || data.customerName === 'Customer') && customerName) {
    patch.customerName = customerName;
  }
  if (!data.paymentId && paymentId) {
    patch.paymentId = paymentId;
  }
  if (!data.sellerName) {
    patch.sellerName = 'LearnStackHub';
  }
  if (!data.sellerEmail) {
    patch.sellerEmail = process.env.INVOICE_SELLER_EMAIL?.trim() || 'careers@learnstackhub.com';
  }

  if (Object.keys(patch).length === 0) {
    return;
  }

  await ref.set(
    {
      ...patch,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

export async function backfillPaymentDocFromPlan(db, orderId, planId, { customerEmail, customerName, paymentId } = {}) {
  const plan = getPlanConfig(planId);
  if (!plan) {
    return;
  }

  await backfillPaymentDoc(db, orderId, { plan, customerEmail, customerName, paymentId });
}

export function buildExpiryDate(durationDays) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + durationDays);
  return Timestamp.fromDate(expiresAt);
}

export async function recordPayment(db, paymentDoc) {
  if (!db || !paymentDoc?.orderId) {
    return false;
  }

  await db.collection('payments').doc(paymentDoc.orderId).set(
    {
      ...paymentDoc,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return true;
}

export async function isPaymentProcessed(db, orderId) {
  if (!db || !orderId) {
    return false;
  }

  const snapshot = await db.collection('payments').doc(orderId).get();
  return snapshot.exists && snapshot.data()?.status === 'captured';
}

export async function activateUserSubscription(
  db,
  uid,
  { planId, durationDays, orderId, paymentId, provider = 'razorpay' }
) {
  if (!db || !uid || !planId || !durationDays) {
    return false;
  }

  const expiresAt = buildExpiryDate(durationDays);
  const paymentProvider = provider === 'cashfree' ? 'cashfree' : 'razorpay';

  const subscription = {
    status: 'active',
    plan: planId,
    expiresAt,
    paymentProvider,
    activatedAt: FieldValue.serverTimestamp(),
    razorpayOrderId: paymentProvider === 'razorpay' ? orderId || null : null,
    razorpayPaymentId: paymentProvider === 'razorpay' ? paymentId || null : null,
    cashfreeOrderId: paymentProvider === 'cashfree' ? orderId || null : null,
    cashfreePaymentId: paymentProvider === 'cashfree' ? paymentId || null : null,
  };

  await db.collection('users').doc(uid).set(
    {
      subscription,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return true;
}

export async function fulfillSubscription(
  db,
  {
    uid,
    planId,
    durationDays,
    orderId,
    paymentId,
    customerEmail,
    customerName,
    plan: planOverride,
    provider = 'razorpay',
  }
) {
  const plan = planOverride || getPlanConfig(planId);

  if (await isPaymentProcessed(db, orderId)) {
    await backfillPaymentDoc(db, orderId, { plan, customerEmail, customerName, paymentId });
    const existing = await db.collection('payments').doc(orderId).get();
    const enriched = enrichPaymentData(existing.data());
    return {
      ok: true,
      duplicate: true,
      invoiceNumber: enriched?.invoiceNumber || buildInvoiceNumber(orderId),
      orderId,
    };
  }

  await activateUserSubscription(db, uid, { planId, durationDays, orderId, paymentId, provider });

  const invoiceFields = plan
    ? buildInvoiceFields({
        orderId,
        paymentId,
        uid,
        plan,
        customerEmail,
        customerName,
      })
    : {};

  await recordPayment(db, {
    orderId,
    paymentId,
    uid,
    planId,
    status: 'captured',
    provider: provider === 'cashfree' ? 'cashfree' : 'razorpay',
    capturedAt: FieldValue.serverTimestamp(),
    issuedAt: FieldValue.serverTimestamp(),
    durationDays,
    ...invoiceFields,
  });

  return {
    ok: true,
    duplicate: false,
    invoiceNumber: invoiceFields.invoiceNumber || null,
    orderId,
  };
}
