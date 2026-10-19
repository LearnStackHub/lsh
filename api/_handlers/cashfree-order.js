export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const {
    isCashfreeConfigured,
    createCashfreeOrder,
    getCashfreeMode,
    sanitizeCashfreeCustomerId,
    getCashfreeCredentialHint,
    getCashfreeAppId,
    normalizeIndianPhone,
  } = await import('../_lib/cashfree.js');
  const { parseJsonBody } = await import('../_lib/razorpay.js');
  const { getPaidSubscriberCount, normalizePaymentCurrency, resolvePlanPricing } = await import(
    '../_lib/pricing.js'
  );
  const { assertActiveGateway } = await import('../_lib/paymentSettings.js');
  const { getConfigStatus, getFirebaseAdminApp, apiErrorPayload } = await import(
    '../_lib/firebaseAdmin.js'
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

    if (!isCashfreeConfigured()) {
      res.status(503).json({ error: 'Not configured', code: 'MISSING_CASHFREE_CREDENTIALS' });
      return;
    }

    const credentialHint = getCashfreeCredentialHint();
    if (credentialHint) {
      res.status(502).json({
        error: credentialHint,
        code: 'CASHFREE_CREDENTIAL_MISMATCH',
        cashfreeEnv: getCashfreeMode(),
        clientIdPrefix: getCashfreeAppId().slice(0, 8),
      });
      return;
    }

    const body = parseJsonBody(req);
    if (!body) {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const planId = String(body.planId || '').trim();
    let currency = normalizePaymentCurrency(body.currency);
    if (currency !== 'INR') {
      res.status(400).json({
        error: 'Cashfree checkout supports INR only. Switch payment currency to INR on the subscribe page.',
        code: 'CASHFREE_INR_ONLY',
      });
      return;
    }

    const app = getFirebaseAdminApp();
    if (!app) {
      const status = getConfigStatus();
      res.status(503).json({
        error: 'Not configured',
        code: status.hasCredentialEnv ? 'INVALID_FIREBASE_CREDENTIAL' : 'MISSING_FIREBASE_CREDENTIAL',
      });
      return;
    }

    const { getFirestore } = await import('firebase-admin/firestore');
    const { getAuth } = await import('firebase-admin/auth');
    const db = getFirestore(app);
    await assertActiveGateway(db, 'cashfree');

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

    const siteUrl = String(process.env.VITE_SITE_URL || 'https://www.learnstackhub.com').replace(
      /\/$/,
      ''
    );
    const customerPhone = normalizeIndianPhone(body.customerPhone);
    if (!customerPhone) {
      res.status(400).json({
        error: 'Enter a valid 10-digit mobile number before checkout.',
        code: 'MISSING_CUSTOMER_PHONE',
      });
      return;
    }

    const orderId = `cf_lsh_${decoded.uid.slice(0, 8)}_${Date.now()}`.slice(0, 40);

    const order = await createCashfreeOrder({
      orderId,
      amountMinor: plan.amountMinor,
      currency: plan.currency,
      customerId: sanitizeCashfreeCustomerId(decoded.uid),
      customerEmail: decoded.email || '',
      customerPhone,
      returnUrl: `${siteUrl}/subscription-success?order=${encodeURIComponent(orderId)}`,
      notifyUrl: `${siteUrl}/api/cashfree-webhook`,
      notes: {
        uid: decoded.uid,
        planId: plan.id,
        email: decoded.email || '',
      },
    });

    res.status(200).json({
      orderId: order.order_id || orderId,
      paymentSessionId: order.payment_session_id,
      cashfreeMode: getCashfreeMode(),
      amount: plan.amountMinor,
      currency: plan.currency,
      planId: plan.id,
      planLabel: plan.label,
    });
  } catch (error) {
    if (error?.code === 'WRONG_PAYMENT_GATEWAY') {
      res.status(409).json({ error: error.message, code: error.code });
      return;
    }
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    const message = String(error?.message || error || 'Request failed');
    console.error('cashfree-order failed:', message);
    if (/cashfree|order creation|payment amount|configured for this plan|mobile number/i.test(message)) {
      res.status(502).json({
        error: message.slice(0, 400),
        code: 'CASHFREE_ORDER_FAILED',
        cashfreeEnv: getCashfreeMode(),
      });
      return;
    }
    res.status(503).json(apiErrorPayload(error));
  }
}
