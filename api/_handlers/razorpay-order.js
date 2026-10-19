export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { getConfigStatus, getFirebaseAdminApp, apiErrorPayload } = await import(
    '../_lib/firebaseAdmin.js'
  );
  const { createRazorpayOrder, isRazorpayConfigured, parseJsonBody } = await import(
    '../_lib/razorpay.js'
  );
  const { getPaidSubscriberCount, normalizePaymentCurrency, resolvePlanPricing } = await import(
    '../_lib/pricing.js'
  );

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

    const { getAuth } = await import('firebase-admin/auth');

    if (!isRazorpayConfigured()) {
      res.status(503).json({ error: 'Not configured', code: 'MISSING_RAZORPAY_CREDENTIALS' });
      return;
    }

    const body = parseJsonBody(req);
    if (!body) {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const planId = String(body.planId || '').trim();
    const currency = normalizePaymentCurrency(body.currency);
    const { getFirestore } = await import('firebase-admin/firestore');

    const app = getFirebaseAdminApp();
    if (!app) {
      const status = getConfigStatus();
      res.status(503).json({
        error: 'Not configured',
        code: status.hasCredentialEnv ? 'INVALID_FIREBASE_CREDENTIAL' : 'MISSING_FIREBASE_CREDENTIAL',
      });
      return;
    }

    const db = getFirestore(app);
    const { assertActiveGateway } = await import('../_lib/paymentSettings.js');
    await assertActiveGateway(db, 'razorpay');

    const subscriberCount = await getPaidSubscriberCount(db);
    const plan = resolvePlanPricing(planId, subscriberCount, currency);

    const minMinor = currency === 'USD' ? 50 : 100;
    if (!plan || !plan.amountMinor || plan.amountMinor < minMinor) {
      res.status(400).json({ error: 'Invalid plan' });
      return;
    }

    const token = authHeader.slice('Bearer '.length);
    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);

    const receipt = `lsh_${decoded.uid.slice(0, 8)}_${Date.now()}`.slice(0, 40);
    const order = await createRazorpayOrder({
      amountMinor: plan.amountMinor,
      amountPaise: plan.amountPaise ?? plan.amountUsdCents ?? plan.amountMinor,
      currency: plan.currency,
      receipt,
      notes: {
        uid: decoded.uid,
        planId: plan.id,
        email: decoded.email || '',
        currency: plan.currency,
      },
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID?.trim() || process.env.VITE_RAZORPAY_KEY_ID?.trim(),
      planId: plan.id,
      planLabel: plan.label,
    });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('razorpay-order failed:', error?.message || error);
    res.status(503).json(apiErrorPayload(error));
  }
}
