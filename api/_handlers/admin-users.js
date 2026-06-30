export const config = {
  maxDuration: 30,
};

function mapAuthUser(user) {
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    createdAt: user.metadata.creationTime || null,
    lastSignIn: user.metadata.lastSignInTime || null,
  };
}

function mapProfileDoc(id, data) {
  const subscription = data.subscription || { status: 'none' };
  const createdAt = data.createdAt?.toDate?.()?.toISOString?.() || null;
  const lastSignInAt =
    data.lastSignInAt?.toDate?.()?.toISOString?.() ||
    data.updatedAt?.toDate?.()?.toISOString?.() ||
    null;

  return {
    uid: id,
    email: data.email || '',
    displayName: data.displayName || '',
    photoURL: data.photoURL || '',
    createdAt,
    lastSignIn: lastSignInAt,
    subscriptionStatus: subscription.status || 'none',
    subscriptionExpiresAt: subscription.expiresAt?.toDate?.()?.toISOString?.() || null,
  };
}

function mergeUsers(authUsers, profileUsers) {
  const byUid = new Map();

  profileUsers.forEach((user) => {
    byUid.set(user.uid, user);
  });

  authUsers.forEach((user) => {
    const existing = byUid.get(user.uid) || {};
    byUid.set(user.uid, {
      uid: user.uid,
      email: user.email || existing.email || '',
      displayName: user.displayName || existing.displayName || '',
      photoURL: user.photoURL || existing.photoURL || '',
      createdAt: user.createdAt || existing.createdAt || null,
      lastSignIn: user.lastSignIn || existing.lastSignIn || null,
      subscriptionStatus: existing.subscriptionStatus || 'none',
      subscriptionExpiresAt: existing.subscriptionExpiresAt || null,
    });
  });

  return Array.from(byUid.values()).sort((a, b) => {
    const aTime = new Date(a.lastSignIn || a.createdAt || 0).getTime();
    const bTime = new Date(b.lastSignIn || b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

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

    const { getAdminEmails, getConfigStatus, getFirebaseAdminApp } = await import(
      '../_lib/firebaseAdmin.js'
    );
    const token = authHeader.slice('Bearer '.length);

    const allowedEmails = getAdminEmails();
    if (allowedEmails.length === 0) {
      res.status(503).json({ error: 'Not configured', code: 'MISSING_ADMIN_EMAILS' });
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

    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { backfillUserProfiles } = await import('../_lib/userProfiles.js');

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);
    const email = decoded.email?.toLowerCase() || '';

    if (!allowedEmails.includes(email)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const authUsers = [];
    const authUserRecords = [];
    let pageToken;

    do {
      const batch = await auth.listUsers(1000, pageToken);
      batch.users.forEach((user) => {
        authUserRecords.push(user);
        authUsers.push(mapAuthUser(user));
      });
      pageToken = batch.pageToken;
    } while (pageToken);

    const db = getFirestore(app);

    try {
      await backfillUserProfiles(db, authUserRecords);
    } catch (backfillError) {
      console.warn('admin-users backfill skipped:', backfillError?.message || backfillError);
    }

    let profileUsers = [];
    try {
      const profileSnap = await db.collection('users').get();
      profileUsers = profileSnap.docs.map((entry) => mapProfileDoc(entry.id, entry.data()));
    } catch (profileError) {
      console.warn('admin-users profile read skipped:', profileError?.message || profileError);
    }

    res.status(200).json({ users: mergeUsers(authUsers, profileUsers) });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('admin-users failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
