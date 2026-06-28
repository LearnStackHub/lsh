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

  const { getConfigStatus, getFirebaseAdminApp } = await import('./_lib/firebaseAdmin.js');
  const { isRazorpayConfigured } = await import('./_lib/razorpay.js');

  const firebaseStatus = getConfigStatus();
  const firebaseReady = Boolean(getFirebaseAdminApp());

  res.status(200).json({
    ok: firebaseReady && isRazorpayConfigured(),
    firebase: {
      ready: firebaseReady,
      hasCredentialEnv: firebaseStatus.hasCredentialEnv,
      credentialParses: firebaseStatus.credentialParses,
      sources: firebaseStatus.sources,
      fixHint: firebaseReady ? undefined : firebaseStatus.fixHint,
    },
    razorpay: {
      ready: isRazorpayConfigured(),
      hasKeyId: Boolean(
        process.env.RAZORPAY_KEY_ID?.trim() || process.env.VITE_RAZORPAY_KEY_ID?.trim()
      ),
      hasKeySecret: Boolean(process.env.RAZORPAY_KEY_SECRET?.trim()),
    },
  });
}
