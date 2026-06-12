import admin from 'firebase-admin';

export const config = {
  maxDuration: 30,
};

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    return null;
  }

  const serviceAccount = JSON.parse(raw);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return admin;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const firebaseAdmin = getFirebaseAdmin();
  if (!firebaseAdmin) {
    res.status(503).json({ error: 'Admin API not configured' });
    return;
  }

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.slice('Bearer '.length);
  const allowedEmails = getAdminEmails();

  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    const email = decoded.email?.toLowerCase() || '';

    if (!allowedEmails.includes(email)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const authUsers = [];
    let pageToken;

    do {
      const batch = await firebaseAdmin.auth().listUsers(1000, pageToken);
      batch.users.forEach((user) => {
        authUsers.push({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: user.metadata.creationTime || null,
          lastSignIn: user.metadata.lastSignInTime || null,
          provider: user.providerData[0]?.providerId || 'google.com',
        });
      });
      pageToken = batch.pageToken;
    } while (pageToken);

    res.status(200).json({ users: authUsers });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
