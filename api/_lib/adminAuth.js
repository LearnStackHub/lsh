export async function verifyAdminRequest(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { error: { status: 401, body: { error: 'Unauthorized' } } };
  }

  const { getAdminEmails, getConfigStatus, getFirebaseAdminApp } = await import('./firebaseAdmin.js');
  const allowedEmails = getAdminEmails();
  if (allowedEmails.length === 0) {
    return { error: { status: 503, body: { error: 'Not configured', code: 'MISSING_ADMIN_EMAILS' } } };
  }

  const app = getFirebaseAdminApp();
  if (!app) {
    const status = getConfigStatus();
    return {
      error: {
        status: 503,
        body: {
          error: 'Not configured',
          code: status.hasCredentialEnv ? 'INVALID_FIREBASE_CREDENTIAL' : 'MISSING_FIREBASE_CREDENTIAL',
        },
      },
    };
  }

  const { getAuth } = await import('firebase-admin/auth');
  const token = authHeader.slice('Bearer '.length);
  const auth = getAuth(app);
  const decoded = await auth.verifyIdToken(token);
  const email = decoded.email?.toLowerCase() || '';

  if (!allowedEmails.includes(email)) {
    return { error: { status: 403, body: { error: 'Forbidden' } } };
  }

  const { getFirestore } = await import('firebase-admin/firestore');
  return { app, db: getFirestore(app), email, decoded };
}
