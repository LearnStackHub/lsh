export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
    const { getPublicPaymentSettings } = await import('../_lib/paymentSettings.js');

    const app = getFirebaseAdminApp();
    let db = null;
    if (app) {
      const { getFirestore } = await import('firebase-admin/firestore');
      db = getFirestore(app);
    }

    const settings = await getPublicPaymentSettings(db);
    res.status(200).json(settings);
  } catch (error) {
    console.error('payment-settings failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
