import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  isAuthConfigured,
  isLocalAuthHost,
  waitForAuthPersistence,
  getOAuthRedirectUri,
} from '../config/firebase';

import { persistUserProfile, getUserProfile, hasActiveSubscription } from '../services/userService';

import {
  SIGN_IN_UNAVAILABLE,
  devOnlyMessage,
} from '../utils/userFacingErrors';



const AuthContext = createContext();



function mapFirebaseUser(firebaseUser, profile) {

  if (!firebaseUser) {

    return null;

  }



  return {

    uid: firebaseUser.uid,

    email: firebaseUser.email || profile?.email || '',

    name:

      firebaseUser.displayName ||

      profile?.displayName ||

      firebaseUser.email?.split('@')[0] ||

      'User',

    photoURL: firebaseUser.photoURL || profile?.photoURL || '',

    subscription: profile?.subscription || { status: 'none' },

    isSubscribed: hasActiveSubscription(profile),

  };

}



function isUserCancelledAuth(error) {

  const code = error?.code || '';

  return (

    code === 'auth/popup-closed-by-user' ||

    code === 'auth/cancelled-popup-request' ||

    code === 'auth/user-cancelled'

  );

}



function getAuthErrorMessage(error) {

  if (!error || isUserCancelledAuth(error)) {

    return '';

  }



  const code = error?.code || '';



  switch (code) {

    case 'auth/user-disabled':

      return 'This account has been disabled.';

    case 'auth/popup-blocked':

      return 'Sign-in popup was blocked. Allow popups for this site and try again.';

    case 'auth/too-many-requests':

      return 'Too many attempts. Please wait a moment and try again.';

    case 'auth/network-request-failed':

      return 'Network error. Check your connection and try again.';

    case 'auth/operation-not-allowed':

      return devOnlyMessage(
        'Email/password sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method → Email/Password.',
        SIGN_IN_UNAVAILABLE
      );

    case 'auth/email-already-in-use':

      return 'An account with this email already exists. Sign in instead.';

    case 'auth/invalid-email':

      return 'Please enter a valid email address.';

    case 'auth/weak-password':

      return 'Password must be at least 6 characters.';

    case 'auth/wrong-password':

    case 'auth/invalid-credential':

      return 'Incorrect email or password.';

    case 'auth/user-not-found':

      return 'No account found with this email. Create an account first.';

    case 'auth/missing-password':

      return 'Please enter your password.';

    case 'auth/unavailable':

      return 'Sign-in is unavailable right now. Please try again later.';

    default:

      if (
        String(error?.message || '').includes('redirect_uri_mismatch') ||
        String(error?.customData?.message || '').includes('redirect_uri_mismatch')
      ) {
        return devOnlyMessage(
          (() => {
            const redirectUri = getOAuthRedirectUri();
            const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
            return `Google OAuth redirect mismatch. In Google Cloud Console → Credentials → Web client (Firebase), add JavaScript origin ${origin} and redirect URI ${redirectUri}. Save, wait 1–2 minutes, then try again.`;
          })(),
          'Google sign-in is temporarily unavailable. Please try again later or use email sign-in.'
        );
      }
      if (String(error?.message || '').includes('ERR_SSL') || code === 'auth/internal-error') {
        return devOnlyMessage(
          'Use http://localhost:5173 (not https) for local development.',
          SIGN_IN_UNAVAILABLE
        );
      }

      return 'Unable to sign in. Please try again.';

  }

}



function throwAuthError(code) {

  const error = new Error(code);

  error.code = code;

  throw error;

}



async function syncUserProfile(firebaseUser) {

  try {

    await persistUserProfile(firebaseUser);

  } catch (error) {

    console.warn('User profile sync skipped:', error?.code || error?.message);

  }

}



async function hydrateUser(firebaseUser, setUser) {

  setUser(mapFirebaseUser(firebaseUser, null));



  const profile = await getUserProfile(firebaseUser.uid);

  setUser(mapFirebaseUser(firebaseUser, profile));

  await syncUserProfile(firebaseUser);



  const refreshed = await getUserProfile(firebaseUser.uid);

  if (refreshed) {

    setUser(mapFirebaseUser(firebaseUser, refreshed));

  }

}



export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(isAuthConfigured);

  const [authInitialized, setAuthInitialized] = useState(!isAuthConfigured);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const hydratingUidRef = useRef(null);



  useEffect(() => {

    if (user) {

      setIsLoginModalOpen(false);

    }

  }, [user]);



  useEffect(() => {

    if (!isAuthConfigured || !auth) {

      setLoading(false);

      setAuthInitialized(true);

      return undefined;

    }



    let unsubscribe = () => {};

    let mounted = true;



    const applyAuthUser = (firebaseUser) => {

      if (!mounted || !firebaseUser) {

        return;

      }



      setIsLoginModalOpen(false);

      setUser(mapFirebaseUser(firebaseUser, null));



      if (hydratingUidRef.current === firebaseUser.uid) {

        return;

      }



      hydratingUidRef.current = firebaseUser.uid;

      hydrateUser(firebaseUser, setUser)

        .catch((error) => {

          console.warn('Profile hydrate skipped:', error?.code || error?.message);

        })

        .finally(() => {

          if (hydratingUidRef.current === firebaseUser.uid) {

            hydratingUidRef.current = null;

          }

        });

    };



    const initAuth = async () => {

      setLoading(true);



      try {

        await waitForAuthPersistence();



        if (!isLocalAuthHost()) {
          try {
            const result = await consumeRedirectResult(auth);
            if (mounted && result?.user) {
              applyAuthUser(result.user);
            }
          } catch (error) {
            if (mounted && !isUserCancelledAuth(error)) {
              console.warn('Redirect sign-in failed:', error?.code || error?.message);
            }
          }
        }



        if (typeof auth.authStateReady === 'function') {

          await auth.authStateReady();

        }



        if (mounted && auth.currentUser) {

          applyAuthUser(auth.currentUser);

        }

      } catch (error) {

        console.warn('Auth init failed:', error?.code || error?.message);

      }



      if (!mounted) {

        return;

      }



      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

        if (!mounted) {

          return;

        }



        const resolvedUser = firebaseUser ?? auth.currentUser ?? null;



        if (resolvedUser) {

          applyAuthUser(resolvedUser);

        } else {

          hydratingUidRef.current = null;

          setUser(null);

        }



        setLoading(false);

        setAuthInitialized(true);

      });

    };



    initAuth();



    return () => {

      mounted = false;

      unsubscribe();

    };

  }, []);



  const refreshUserProfile = useCallback(async () => {

    if (!auth?.currentUser) {

      return null;

    }



    const profile = await getUserProfile(auth.currentUser.uid);

    const mappedUser = mapFirebaseUser(auth.currentUser, profile);

    setUser(mappedUser);

    return mappedUser;

  }, []);



  const signInWithGoogle = async () => {
    if (!isAuthConfigured || !auth || !googleProvider) {
      throwAuthError('auth/unavailable');
    }

    if (isLocalAuthHost()) {
      const result = await signInWithPopup(auth, googleProvider);
      await hydrateUser(result.user, setUser);
      setIsLoginModalOpen(false);
      return mapFirebaseUser(result.user, null);
    }

    await signInWithRedirect(auth, googleProvider);
    return null;
  };

  const signInWithEmailPassword = async ({ email, password }) => {
    if (!isAuthConfigured || !auth) {
      throwAuthError('auth/unavailable');
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (!normalizedEmail) {
      throwAuthError('auth/invalid-email');
    }

    if (!normalizedPassword) {
      throwAuthError('auth/missing-password');
    }

    const result = await signInWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
    await hydrateUser(result.user, setUser);
    setIsLoginModalOpen(false);
    return mapFirebaseUser(result.user, null);
  };

  const signUpWithEmailPassword = async ({ email, password, name }) => {
    if (!isAuthConfigured || !auth) {
      throwAuthError('auth/unavailable');
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');
    const displayName = String(name || '').trim();

    if (!normalizedEmail) {
      throwAuthError('auth/invalid-email');
    }

    if (normalizedPassword.length < 6) {
      throwAuthError('auth/weak-password');
    }

    const result = await createUserWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);

    if (displayName) {
      await updateProfile(result.user, { displayName });
      result.user.displayName = displayName;
    }

    await hydrateUser(result.user, setUser);
    setIsLoginModalOpen(false);
    return mapFirebaseUser(result.user, null);
  };



  const logout = async () => {

    if (auth) {

      await signOut(auth);

    }

    hydratingUidRef.current = null;

    setUser(null);

  };



  const isLoggedIn = () => user !== null;



  const openLoginModal = () => {

    setIsLoginModalOpen(true);

  };



  const closeLoginModal = () => {

    setIsLoginModalOpen(false);

  };



  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        authInitialized,

        isAuthReady: isAuthConfigured,

        signInWithGoogle,

        signInWithEmailPassword,

        signUpWithEmailPassword,

        logout,

        refreshUserProfile,

        isLoggedIn,

        isLoginModalOpen,

        openLoginModal,

        closeLoginModal,

        getAuthErrorMessage,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error('useAuth must be used within AuthProvider');

  }

  return context;

}



export default AuthContext;

