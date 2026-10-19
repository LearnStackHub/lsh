export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { verifyAdminRequest } = await import('../_lib/adminAuth.js');
    const verified = await verifyAdminRequest(req);
    if (verified.error) {
      res.status(verified.error.status).json(verified.error.body);
      return;
    }

    const { getPaymentSettings, setPaymentSettings, getPublicPaymentSettings, PAYMENT_GATEWAYS } =
      await import('../_lib/paymentSettings.js');
    const { parseJsonBody } = await import('../_lib/razorpay.js');

    if (req.method === 'GET') {
      const settings = await getPaymentSettings(verified.db);
      const pub = await getPublicPaymentSettings(verified.db);
      res.status(200).json({ settings, ...pub, gateways: PAYMENT_GATEWAYS });
      return;
    }

    if (req.method === 'PUT') {
      const body = parseJsonBody(req);
      const activeGateway = String(body?.activeGateway || '').trim();
      if (!PAYMENT_GATEWAYS.includes(activeGateway)) {
        res.status(400).json({ error: 'activeGateway must be razorpay or cashfree' });
        return;
      }

      const settings = await setPaymentSettings(verified.db, activeGateway, verified.email);
      const pub = await getPublicPaymentSettings(verified.db);
      res.status(200).json({ ok: true, settings, ...pub, gateways: PAYMENT_GATEWAYS });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    console.error('admin-payment-settings failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
