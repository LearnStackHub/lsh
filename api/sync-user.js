import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getBearerToken, getFirebaseAdminApp } from './lib/firebaseAdmin.js';
import { upsertUserProfile } from './lib/userProfiles.js';

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

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Not configured' });
      return;
    }

    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(token);
    const userRecord = await auth.getUser(decoded.uid);
    const db = getFirestore(app);

    await upsertUserProfile(db, userRecord);

    res.status(200).json({ ok: true, uid: userRecord.uid });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('sync-user failed:', error?.message || error);
    res.status(503).json({ error: 'Unavailable' });
  }
}
