import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, isAuthConfigured } from '../config/firebase';

function buildUserProfile(firebaseUser, displayNameOverride) {
  const displayName =
    displayNameOverride?.trim() ||
    firebaseUser.displayName ||
    firebaseUser.email?.split('@')[0] ||
    'User';

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName,
    photoURL: firebaseUser.photoURL || '',
    subscription: {
      status: 'none',
      plan: null,
      expiresAt: null,
    },
    updatedAt: serverTimestamp(),
  };
}

export async function ensureUserProfile(firebaseUser, displayNameOverride) {
  if (!isAuthConfigured || !db || !firebaseUser?.uid) {
    return null;
  }

  try {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const existing = snapshot.data();
      await setDoc(
        userRef,
        {
          email: firebaseUser.email || existing.email || '',
          displayName:
            firebaseUser.displayName ||
            existing.displayName ||
            firebaseUser.email?.split('@')[0] ||
            'User',
          photoURL: firebaseUser.photoURL || existing.photoURL || '',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return { id: snapshot.id, ...existing };
    }

    const profile = buildUserProfile(firebaseUser, displayNameOverride);
    await setDoc(userRef, {
      ...profile,
      createdAt: serverTimestamp(),
    });
    return profile;
  } catch (error) {
    console.warn('Could not save user profile:', error?.code || error?.message);
    return null;
  }
}

export async function getUserProfile(uid) {
  if (!isAuthConfigured || !db || !uid) {
    return null;
  }

  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    if (!snapshot.exists()) {
      return null;
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.warn('Could not load user profile:', error?.code || error?.message);
    return null;
  }
}

export function hasActiveSubscription(profile) {
  if (!profile?.subscription) {
    return false;
  }

  const { status, expiresAt } = profile.subscription;
  if (status !== 'active' || !expiresAt) {
    return false;
  }

  const expiry = expiresAt.toDate ? expiresAt.toDate() : new Date(expiresAt);
  return expiry.getTime() > Date.now();
}
