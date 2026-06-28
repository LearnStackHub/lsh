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

    const token = (req.headers.authorization || '').startsWith('Bearer ')
      ? req.headers.authorization.slice('Bearer '.length)
      : null;

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { getConfigStatus, getFirebaseAdminApp, userFromDecodedToken, apiErrorPayload } =
      await import('./_lib/firebaseAdmin.js');
    const { upsertUserProfile } = await import('./_lib/userProfiles.js');

    const app = getFirebaseAdminApp();
    if (!app) {
      const status = getConfigStatus();
      res.status(503).json({
        error: 'Not configured',
        code: status.hasCredentialEnv ? 'INVALID_FIREBASE_CREDENTIAL' : 'MISSING_FIREBASE_CREDENTIAL',
      });
      return;
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);
    const db = getFirestore(app);

    await upsertUserProfile(db, userFromDecodedToken(decoded));

    res.status(200).json({ ok: true, uid: decoded.uid });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('sync-user failed:', error?.message || error);
    res.status(503).json(apiErrorPayload(error));
  }
}
