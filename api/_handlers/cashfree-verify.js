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

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { isCashfreeConfigured, fetchCashfreeOrder, isCashfreeOrderPaid, extractCashfreePaymentId } =
      await import('../_lib/cashfree.js');
    const { parseJsonBody } = await import('../_lib/razorpay.js');
    const { getPaidSubscriberCount, normalizePaymentCurrency, resolvePlanPricing } = await import(
      '../_lib/pricing.js'
    );
    const { assertActiveGateway } = await import('../_lib/paymentSettings.js');

    if (!isCashfreeConfigured()) {
      res.status(503).json({ error: 'Not configured', code: 'MISSING_CASHFREE_CREDENTIALS' });
      return;
    }

    const body = parseJsonBody(req);
    if (!body) {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const orderId = String(body.orderId || body.cashfree_order_id || '').trim();
    const planId = String(body.planId || '').trim();
    const currency = normalizePaymentCurrency(body.currency);

    if (!orderId || !planId) {
      res.status(400).json({ error: 'Missing payment fields' });
      return;
    }

    const orderPayload = await fetchCashfreeOrder(orderId);
    if (!isCashfreeOrderPaid(orderPayload)) {
      res.status(400).json({ error: 'Payment not completed yet', code: 'PAYMENT_PENDING' });
      return;
    }

    const paymentId = extractCashfreePaymentId(orderPayload) || orderId;

    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
    const { fulfillSubscription } = await import('../_lib/subscriptions.js');

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Not configured', code: 'MISSING_FIREBASE_ADMIN' });
      return;
    }

    const db = getFirestore(app);
    await assertActiveGateway(db, 'cashfree');

    const token = authHeader.slice('Bearer '.length);
    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);

    const subscriberCount = await getPaidSubscriberCount(db);
    const plan = resolvePlanPricing(planId, subscriberCount, currency);
    if (!plan) {
      res.status(400).json({ error: 'Invalid plan' });
      return;
    }

    const result = await fulfillSubscription(db, {
      uid: decoded.uid,
      planId: plan.id,
      durationDays: plan.durationDays,
      orderId,
      paymentId,
      customerEmail: decoded.email || '',
      customerName: decoded.name || decoded.email?.split('@')[0] || 'Customer',
      plan,
      provider: 'cashfree',
    });

    res.status(200).json({
      ok: true,
      duplicate: result.duplicate,
      planId: plan.id,
      expiresInDays: plan.durationDays,
      orderId: result.orderId,
      invoiceNumber: result.invoiceNumber,
    });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid or expired sign-in. Please sign in again.', code });
      return;
    }
    console.error('cashfree-verify failed:', error?.message || error, code || '');
    res.status(503).json({
      error: 'Payment verification failed',
      code: code || 'VERIFY_FAILED',
    });
  }
}
