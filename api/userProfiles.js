import { FieldValue } from 'firebase-admin/firestore';

const DEFAULT_SUBSCRIPTION = {
  status: 'none',
  plan: null,
  expiresAt: null,
};

function resolveDisplayName(user) {
  return user.displayName || user.display_name || user.email?.split('@')[0] || 'User';
}

function resolveLastSignIn(user) {
  const raw =
    user.metadata?.lastSignInTime ||
    user.lastSignInTime ||
    user.last_sign_in_time ||
    null;

  if (!raw) {
    return FieldValue.serverTimestamp();
  }

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? FieldValue.serverTimestamp() : date;
}

export function buildProfilePatch(user) {
  return {
    email: user.email || '',
    displayName: resolveDisplayName(user),
    photoURL: user.photoURL || user.photo_url || '',
    lastSignInAt: resolveLastSignIn(user),
    updatedAt: FieldValue.serverTimestamp(),
  };
}

export async function upsertUserProfile(db, user) {
  if (!db || !user?.uid) {
    return false;
  }

  const ref = db.collection('users').doc(user.uid);
  const snapshot = await ref.get();
  const patch = buildProfilePatch(user);

  if (snapshot.exists()) {
    await ref.set(patch, { merge: true });
    return true;
  }

  await ref.set({
    ...patch,
    subscription: DEFAULT_SUBSCRIPTION,
    createdAt: FieldValue.serverTimestamp(),
  });

  return true;
}

export async function backfillUserProfiles(db, authUsers, chunkSize = 40) {
  if (!db || !authUsers?.length) {
    return 0;
  }

  let saved = 0;

  for (let index = 0; index < authUsers.length; index += chunkSize) {
    const chunk = authUsers.slice(index, index + chunkSize);
    const results = await Promise.allSettled(
      chunk.map((user) => upsertUserProfile(db, user))
    );
    saved += results.filter((result) => result.status === 'fulfilled' && result.value).length;
  }

  return saved;
}
