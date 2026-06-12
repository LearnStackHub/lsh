import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, isAuthConfigured } from '../config/firebase';

const SYNC_MAX_ATTEMPTS = 4;
const SYNC_RETRY_MS = 1200;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
    lastSignInAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function buildProfileUpdate(firebaseUser, existing) {
  return {
    email: firebaseUser.email || existing?.email || '',
    displayName:
      firebaseUser.displayName ||
      existing?.displayName ||
      firebaseUser.email?.split('@')[0] ||
      'User',
    photoURL: firebaseUser.photoURL || existing?.photoURL || '',
    lastSignInAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

async function syncUserProfileViaApi(firebaseUser) {
  if (!auth?.currentUser || auth.currentUser.uid !== firebaseUser.uid) {
    return false;
  }

  try {
    const token = await auth.currentUser.getIdToken(true);
    const response = await fetch('/api/sync-user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 503 || response.status === 500 || response.status === 401) {
      return false;
    }

    return response.ok;
  } catch {
    return false;
  }
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
      await setDoc(userRef, buildProfileUpdate(firebaseUser, existing), { merge: true });
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

/** Persist profile via server API first, then client Firestore, with retries. */
export async function persistUserProfile(firebaseUser, displayNameOverride) {
  if (!firebaseUser?.uid) {
    return null;
  }

  let lastProfile = null;

  for (let attempt = 0; attempt < SYNC_MAX_ATTEMPTS; attempt += 1) {
    const serverSaved = await syncUserProfileViaApi(firebaseUser);
    const clientProfile = await ensureUserProfile(firebaseUser, displayNameOverride);

    if (clientProfile) {
      lastProfile = clientProfile;
    }

    if (serverSaved || clientProfile) {
      const profile = await getUserProfile(firebaseUser.uid);
      return profile || lastProfile || clientProfile;
    }

    if (attempt < SYNC_MAX_ATTEMPTS - 1) {
      await wait(SYNC_RETRY_MS * (attempt + 1));
    }
  }

  return lastProfile;
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
