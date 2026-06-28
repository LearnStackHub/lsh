export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { getFirebaseAdminApp } = await import('./_lib/firebaseAdmin.js');
    const { paymentDocToInvoice, sortInvoicesNewestFirst, enrichPaymentData } = await import('./_lib/invoices.js');
    const { backfillPaymentDocFromPlan } = await import('./_lib/subscriptions.js');

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const token = authHeader.slice('Bearer '.length);
    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);
    const db = getFirestore(app);
    const orderId = String(req.query?.orderId || '').trim();

    if (orderId) {
      const snapshot = await db.collection('payments').doc(orderId).get();
      if (!snapshot.exists || snapshot.data()?.uid !== decoded.uid) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      const raw = snapshot.data();
      const enriched = enrichPaymentData(raw);
      const needsBackfill =
        !raw.amountPaise ||
        !raw.planLabel ||
        raw.planLabel === raw.planId ||
        !raw.durationDays;

      if (needsBackfill && enriched.planId) {
        await backfillPaymentDocFromPlan(db, orderId, enriched.planId, {
          customerEmail: enriched.customerEmail,
          customerName: enriched.customerName,
          paymentId: enriched.paymentId,
        });
      }

      res.status(200).json({ invoice: paymentDocToInvoice(enriched) });
      return;
    }

    const snapshot = await db.collection('payments').where('uid', '==', decoded.uid).get();
    const invoices = sortInvoicesNewestFirst(
      snapshot.docs
        .map((doc) => paymentDocToInvoice(doc.data()))
        .filter(Boolean)
    );

    res.status(200).json({ invoices });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('invoices failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
