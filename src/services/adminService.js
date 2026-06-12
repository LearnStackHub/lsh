import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { isAdminEmail } from '../config/admin';

export async function ensureAdminAccess(user) {
  if (!user?.uid || !isAdminEmail(user.email) || !db) {
    return false;
  }

  const adminRef = doc(db, 'admins', user.uid);

  try {
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(adminRef);
      if (snapshot.exists()) {
        return;
      }

      transaction.set(adminRef, {
        email: user.email,
        active: true,
        createdAt: serverTimestamp(),
      });
    });
  } catch (error) {
    if (error?.code === 'permission-denied') {
      const snapshot = await getDoc(adminRef);
      if (snapshot.exists()) {
        return true;
      }
    }

    throw error;
  }

  return true;
}

export async function fetchFirestoreUsers() {
  if (!db) {
    return [];
  }

  const snapshot = await getDocs(query(collection(db, 'users')));
  return snapshot.docs.map((entry) => {
    const data = entry.data();
    const createdAt = data.createdAt?.toDate?.() || null;
    const subscription = data.subscription || { status: 'none' };

    return {
      uid: entry.id,
      email: data.email || '',
      displayName: data.displayName || '',
      photoURL: data.photoURL || '',
      createdAt: createdAt ? createdAt.toISOString() : null,
      subscriptionStatus: subscription.status || 'none',
      subscriptionExpiresAt: subscription.expiresAt?.toDate?.()?.toISOString?.() || null,
      source: 'firestore',
    };
  });
}

export async function fetchAuthUsersFromApi() {
  if (!auth?.currentUser) {
    return null;
  }

  const token = await auth.currentUser.getIdToken();
  const response = await fetch('/api/admin-users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 503) {
    return null;
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Failed to load users from admin API');
  }

  const payload = await response.json();
  return payload.users || [];
}

export function mergeUserRecords(authUsers, firestoreUsers) {
  const byUid = new Map();

  firestoreUsers.forEach((user) => {
    byUid.set(user.uid, { ...user });
  });

  (authUsers || []).forEach((user) => {
    const existing = byUid.get(user.uid) || {};
    byUid.set(user.uid, {
      uid: user.uid,
      email: user.email || existing.email || '',
      displayName: user.displayName || existing.displayName || '',
      photoURL: user.photoURL || existing.photoURL || '',
      createdAt: user.createdAt || existing.createdAt || null,
      lastSignIn: user.lastSignIn || null,
      provider: user.provider || 'google.com',
      subscriptionStatus: existing.subscriptionStatus || 'none',
      subscriptionExpiresAt: existing.subscriptionExpiresAt || null,
      source: existing.uid ? 'auth+firestore' : 'auth',
    });
  });

  return Array.from(byUid.values()).sort((a, b) => {
    const aTime = new Date(a.lastSignIn || a.createdAt || 0).getTime();
    const bTime = new Date(b.lastSignIn || b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}
