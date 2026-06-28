import { initializeApp, getApps } from 'firebase/app';

import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

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



export function isLocalAuthHost() {

  if (typeof window === 'undefined') {

    return import.meta.env.DEV;

  }



  const host = window.location.hostname;

  return host === 'localhost' || host === '127.0.0.1' || import.meta.env.DEV;

}



export function getAuthDomain() {
  // Local dev: use Firebase's hosted auth domain + popup sign-in (see AuthContext).
  // Redirect to localhost:5173/__/auth/handler requires HTTPS, which Vite dev does not provide.
  if (isLocalAuthHost()) {
    return `${resolveFirebaseEnv().projectId}.firebaseapp.com`;
  }

  const override = readViteEnv('VITE_FIREBASE_AUTH_DOMAIN');
  if (override && !override.includes('firebaseapp.com')) {
    return override;
  }

  return override || 'www.learnstackhub.com';
}

export function getOAuthRedirectUri(authDomain = getAuthDomain()) {
  return `https://${authDomain}/__/auth/handler`;
}



const env = resolveFirebaseEnv();



export const isAuthConfigured = Boolean(

  env.apiKey && env.projectId && env.appId

);



let app = null;

let auth = null;

let db = null;

let googleProvider = null;

let persistencePromise = null;



function initFirebase() {

  if (!isAuthConfigured || app) {

    return;

  }



  const authDomain = getAuthDomain();

  const firebaseConfig = {

    apiKey: env.apiKey,

    authDomain,

    projectId: env.projectId,

    storageBucket: env.storageBucket,

    messagingSenderId: env.messagingSenderId,

    appId: env.appId,

  };



  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

  auth = getAuth(app);

  persistencePromise = setPersistence(auth, browserLocalPersistence);

  db = getFirestore(app);

  googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({ prompt: 'select_account' });



  if (import.meta.env.DEV && typeof window !== 'undefined') {

    console.info('[LearnStackHub auth]', {

      authDomain,

      redirectUri: getOAuthRedirectUri(authDomain),

      origin: window.location.origin,

    });

  }

}



export function waitForAuthPersistence() {

  if (!persistencePromise) {

    return Promise.resolve();

  }



  return persistencePromise.catch((error) => {

    console.warn('Auth persistence setup skipped:', error?.code || error?.message);

  });

}



if (isAuthConfigured && typeof window !== 'undefined') {

  initFirebase();

}



export { auth, db, googleProvider, initFirebase };

