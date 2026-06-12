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

  try {
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
      };
    });
  } catch (error) {
    if (error?.code === 'permission-denied') {
      throw new Error('Unable to load users. Please try again later.');
    }

    throw new Error('Unable to load users right now.');
  }
}

export async function fetchAuthUsersFromApi() {
  if (!auth?.currentUser) {
    return null;
  }

  const token = await auth.currentUser.getIdToken(true);
  const response = await fetch('/api/admin-users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 503 || response.status === 403 || response.status === 500) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Unable to load full user list.');
  }

  const payload = await response.json();
  return payload.users || [];
}

export function formatProviderLabel() {
  return 'Member';
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
      lastSignIn: user.lastSignIn || existing.lastSignIn || null,
      subscriptionStatus: existing.subscriptionStatus || user.subscriptionStatus || 'none',
      subscriptionExpiresAt: existing.subscriptionExpiresAt || user.subscriptionExpiresAt || null,
    });
  });

  return Array.from(byUid.values()).sort((a, b) => {
    const aTime = new Date(a.lastSignIn || a.createdAt || 0).getTime();
    const bTime = new Date(b.lastSignIn || b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

export function buildUserFromSession(authUser, profile) {
  if (!authUser?.uid) {
    return null;
  }

  const subscription = profile?.subscription || { status: 'none' };

  return {
    uid: authUser.uid,
    email: authUser.email || profile?.email || '',
    displayName: authUser.displayName || profile?.displayName || '',
    photoURL: authUser.photoURL || profile?.photoURL || '',
    createdAt: profile?.createdAt?.toDate?.()?.toISOString?.() || authUser.metadata?.creationTime || null,
    lastSignIn: authUser.metadata?.lastSignInTime || null,
    subscriptionStatus: subscription.status || 'none',
    subscriptionExpiresAt: subscription.expiresAt?.toDate?.()?.toISOString?.() || null,
  };
}
