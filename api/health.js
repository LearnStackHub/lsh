export const config = {
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { getConfigStatus, getFirebaseAdminApp, probeFirebaseAdmin } = await import(
    './_lib/firebaseAdmin.js'
  );
  const { isRazorpayConfigured } = await import('./_lib/razorpay.js');

  const firebaseStatus = getConfigStatus();
  const firebaseReady = Boolean(getFirebaseAdminApp());
  const deep =
    req.query?.deep === '1' ||
    req.url?.includes('deep=1') ||
    new URL(req.url || '', 'http://localhost').searchParams.get('deep') === '1';

  let firestore = { ready: false };
  if (deep && firebaseReady) {
    firestore = await probeFirebaseAdmin();
  }

  const razorpayReady = isRazorpayConfigured();
  const allReady = firebaseReady && razorpayReady && (!deep || firestore.firestoreReady !== false);

  res.status(200).json({
    ok: deep ? allReady : firebaseReady && razorpayReady,
    firebase: {
      ready: firebaseReady,
      hasCredentialEnv: firebaseStatus.hasCredentialEnv,
      credentialParses: firebaseStatus.credentialParses,
      sources: firebaseStatus.sources,
      fixHint: firebaseReady ? undefined : firebaseStatus.fixHint,
      ...(deep ? { firestore } : {}),
    },
    razorpay: {
      ready: razorpayReady,
      hasKeyId: Boolean(
        process.env.RAZORPAY_KEY_ID?.trim() || process.env.VITE_RAZORPAY_KEY_ID?.trim()
      ),
      hasKeySecret: Boolean(process.env.RAZORPAY_KEY_SECRET?.trim()),
    },
    hint: deep
      ? undefined
      : 'Add ?deep=1 to test Firestore connectivity (same check sync-user and checkout use).',
  });
}
