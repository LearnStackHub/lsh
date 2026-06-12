import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function readViteEnv(name) {
  const value = import.meta.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

/** Recover when PROJECT_ID and STORAGE_BUCKET were pasted on one line in env settings. */
export function resolveFirebaseEnv() {
  let projectId = readViteEnv('VITE_FIREBASE_PROJECT_ID');
  let storageBucket = readViteEnv('VITE_FIREBASE_STORAGE_BUCKET');

  if (projectId.includes('VITE_FIREBASE_STORAGE_BUCKET=')) {
    const [idPart, bucketPart] = projectId.split('VITE_FIREBASE_STORAGE_BUCKET=');
    projectId = idPart.trim();
    if (!storageBucket && bucketPart) {
      storageBucket = bucketPart.trim();
    }
  }

  if (projectId.includes('VITE_')) {
    projectId = projectId.split('VITE_')[0].trim();
  }

  projectId = projectId || 'learnstackhub';
  storageBucket = storageBucket || `${projectId}.firebasestorage.app`;

  return {
    apiKey: readViteEnv('VITE_FIREBASE_API_KEY'),
    projectId,
    storageBucket,
    messagingSenderId: readViteEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readViteEnv('VITE_FIREBASE_APP_ID'),
  };
}

function getAuthDomain() {
  if (import.meta.env.DEV) {
    return 'learnstackhub.firebaseapp.com';
  }

  return 'www.learnstackhub.com';
}

const env = resolveFirebaseEnv();

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: getAuthDomain(),
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
};

export const isAuthConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isAuthConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

export { auth, db, googleProvider };
