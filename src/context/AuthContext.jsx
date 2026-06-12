import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, isAuthConfigured } from '../config/firebase';
import { ensureUserProfile, getUserProfile, hasActiveSubscription } from '../services/userService';

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
      return 'Sign-in is not enabled yet. Please try again later.';
    case 'auth/unavailable':
      return 'Sign-in is unavailable right now. Please try again later.';
    default:
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
    await ensureUserProfile(firebaseUser);
  } catch (error) {
    console.warn('User profile sync skipped:', error?.code || error?.message);
  }
}

async function applySignedInUser(firebaseUser, setUser) {
  setUser(mapFirebaseUser(firebaseUser, null));
  await syncUserProfile(firebaseUser);
  const profile = await getUserProfile(firebaseUser.uid);
  if (profile) {
    setUser(mapFirebaseUser(firebaseUser, profile));
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isAuthConfigured);
  const [authInitialized, setAuthInitialized] = useState(!isAuthConfigured);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const completeRedirectSignIn = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!cancelled && result?.user) {
          await applySignedInUser(result.user, setUser);
          setIsLoginModalOpen(false);
        }
      } catch (error) {
        if (!isUserCancelledAuth(error)) {
          console.warn('Redirect sign-in failed:', error?.code || error?.message);
        }
      }
    };

    completeRedirectSignIn();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        setAuthInitialized(true);
        return;
      }

      setUser(mapFirebaseUser(firebaseUser, null));
      setLoading(false);
      setAuthInitialized(true);
      setIsLoginModalOpen(false);

      const profile = await getUserProfile(firebaseUser.uid);
      if (profile) {
        setUser(mapFirebaseUser(firebaseUser, profile));
      }

      await syncUserProfile(firebaseUser);
    });

    return () => {
      cancelled = true;
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

    // Popup is blocked by COOP on production hosting; redirect works reliably on live site.
    if (import.meta.env.PROD) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }

    const result = await signInWithPopup(auth, googleProvider);
    await applySignedInUser(result.user, setUser);
    setIsLoginModalOpen(false);
    return mapFirebaseUser(result.user, null);
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
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
