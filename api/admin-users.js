import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export const config = {
  maxDuration: 30,
};

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function normalizePrivateKey(key) {
  if (!key) {
    return '';
  }

  return String(key).replace(/\\n/g, '\n');
}

function parseServiceAccount(raw) {
  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();
  const candidates = [trimmed, trimmed.replace(/\r?\n/g, '')];

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed?.client_email && parsed?.private_key && parsed?.project_id) {
        return {
          ...parsed,
          private_key: normalizePrivateKey(parsed.private_key),
        };
      }
    } catch {
      // try next candidate
    }
  }

  return null;
}

function buildCredential() {
  const serviceAccount = parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT);
  if (serviceAccount) {
    return cert(serviceAccount);
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  const projectId =
    process.env.FIREBASE_PROJECT_ID?.trim() ||
    process.env.VITE_FIREBASE_PROJECT_ID?.trim() ||
    'learnstackhub';

  if (clientEmail && privateKey) {
    return cert({
      projectId,
      clientEmail,
      privateKey,
    });
  }

  return null;
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const credential = buildCredential();
  if (!credential) {
    return null;
  }

  try {
    return initializeApp({ credential });
  } catch (error) {
    console.error('admin-users init failed:', error?.message || error);
    return null;
  }
}

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

  return {
    uid: id,
    email: data.email || '',
    displayName: data.displayName || '',
    photoURL: data.photoURL || '',
    createdAt,
    lastSignIn: null,
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

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.slice('Bearer '.length);
    const allowedEmails = getAdminEmails();

    if (allowedEmails.length === 0) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);
    const email = decoded.email?.toLowerCase() || '';

    if (!allowedEmails.includes(email)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const authUsers = [];
    let pageToken;

    do {
      const batch = await auth.listUsers(1000, pageToken);
      batch.users.forEach((user) => {
        authUsers.push(mapAuthUser(user));
      });
      pageToken = batch.pageToken;
    } while (pageToken);

    let profileUsers = [];
    try {
      const profileSnap = await getFirestore(app).collection('users').get();
      profileUsers = profileSnap.docs.map((entry) => mapProfileDoc(entry.id, entry.data()));
    } catch (profileError) {
      console.warn('admin-users profile merge skipped:', profileError?.message || profileError);
    }

    res.status(200).json({ users: mergeUsers(authUsers, profileUsers) });
  } catch (error) {
    const code = error?.code || '';
    if (
      code.startsWith('auth/') ||
      code === 'auth/id-token-expired' ||
      code === 'auth/argument-error'
    ) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('admin-users failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
