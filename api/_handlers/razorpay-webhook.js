export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { getFirestore } = await import('firebase-admin/firestore');
    const { getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
    const { isRazorpayConfigured, verifyWebhookSignature } = await import('../_lib/razorpay.js');
    const { getPaidSubscriberCount, resolvePlanPricing } = await import('../_lib/pricing.js');
    const { fulfillSubscription } = await import('../_lib/subscriptions.js');

    if (!isRazorpayConfigured()) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const signature = req.headers['x-razorpay-signature'] || '';

    if (!verifyWebhookSignature(rawBody, signature)) {
      res.status(400).json({ error: 'Invalid webhook signature' });
      return;
    }

    const event = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(rawBody);
    const eventType = event?.event || '';

    if (eventType !== 'payment.captured') {
      res.status(200).json({ ok: true, ignored: true });
      return;
    }

    const payment = event?.payload?.payment?.entity;
    const orderId = payment?.order_id;
    const paymentId = payment?.id;
    const notes = payment?.notes || {};
    const uid = notes.uid;
    const planId = notes.planId;

    if (!orderId || !paymentId || !uid || !planId) {
      res.status(400).json({ error: 'Missing payment metadata' });
      return;
    }

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const db = getFirestore(app);
    const subscriberCount = await getPaidSubscriberCount(db);
    const plan = resolvePlanPricing(planId, subscriberCount);
    if (!plan) {
      res.status(400).json({ error: 'Invalid plan in webhook' });
      return;
    }

    if (payment?.amount) {
      plan.amountPaise = Number(payment.amount);
    }

    await fulfillSubscription(db, {
      uid,
      planId: plan.id,
      durationDays: plan.durationDays,
      orderId,
      paymentId,
      customerEmail: notes.email || payment?.email || '',
      customerName: notes.name || payment?.email?.split('@')[0] || 'Customer',
      plan,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('razorpay-webhook failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
