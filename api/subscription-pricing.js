export const config = {
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=60');

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { getFirebaseAdminApp } = await import('./_lib/firebaseAdmin.js');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { buildPricingSnapshot, getPaidSubscriberCount } = await import('./_lib/pricing.js');

    const app = getFirebaseAdminApp();
    let subscriberCount = 0;

    if (app) {
      const db = getFirestore(app);
      subscriberCount = await getPaidSubscriberCount(db);
    }

    res.status(200).json(buildPricingSnapshot(subscriberCount));
  } catch (error) {
    console.error('subscription-pricing failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
