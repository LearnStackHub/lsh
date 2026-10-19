export const config = {
  maxDuration: 30,
};

const LIST_LIMIT = 500;

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { verifyAdminRequest } = await import('../_lib/adminAuth.js');
    const verified = await verifyAdminRequest(req);
    if (verified.error) {
      res.status(verified.error.status).json(verified.error.body);
      return;
    }

    const { paymentDocToInvoice, sortInvoicesNewestFirst } = await import('../_lib/invoices.js');
    const { db } = verified;
    const orderId = String(req.query?.orderId || '').trim();

    if (orderId) {
      const snapshot = await db.collection('payments').doc(orderId).get();
      if (!snapshot.exists) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      const invoice = paymentDocToInvoice(snapshot.data());
      if (!invoice) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      res.status(200).json({
        invoice: { ...invoice, uid: snapshot.data()?.uid || '' },
      });
      return;
    }

    let snapshot;
    try {
      snapshot = await db.collection('payments').orderBy('issuedAt', 'desc').limit(LIST_LIMIT).get();
    } catch {
      snapshot = await db.collection('payments').limit(LIST_LIMIT).get();
    }

    const invoices = sortInvoicesNewestFirst(
      snapshot.docs
        .map((doc) => {
          const invoice = paymentDocToInvoice(doc.data());
          if (!invoice) return null;
          return { ...invoice, uid: doc.data()?.uid || '' };
        })
        .filter(Boolean)
    );

    res.status(200).json({
      invoices,
      limit: LIST_LIMIT,
      truncated: snapshot.size >= LIST_LIMIT,
    });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    console.error('admin-payments failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
