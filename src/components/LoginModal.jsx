import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Loader2, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/LSH.png';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function LoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    isAuthReady,
    getAuthErrorMessage,
  } = useAuth();

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoginModalOpen) {
      setMode('signin');
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setSubmitting(false);
      setGoogleSubmitting(false);
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const isSignUp = mode === 'signup';
  const busy = submitting || googleSubmitting;

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setError('');
    setPassword('');
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isSignUp) {
        await signUpWithEmailPassword({ email, password, name });
      } else {
        await signInWithEmailPassword({ email, password });
      }
    } catch (err) {
      const message = getAuthErrorMessage(err);
      if (message) {
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      const message = getAuthErrorMessage(err);
      if (message) {
        setError(message);
      }
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal-content login-modal login-modal--edutech" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLoginModal} aria-label="Close sign in dialog">
          <X size={20} />
        </button>

        <div className="login-modal-hero login-modal-hero--compact">
          <img src={logoImage} alt="" className="login-modal-logo" />
          <div className="login-modal-hero-copy">
            <span className="login-modal-eyebrow">
              <GraduationCap size={14} aria-hidden />
              LearnStackHub
            </span>
            <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
            <p>
              {isSignUp
                ? 'Free access to tutorials, MCQs, and the Practice Lab.'
                : 'Continue your learning journey.'}
            </p>
          </div>
        </div>

        {!isAuthReady ? (
          <div className="login-form">
            <div className="form-error">Sign-in is unavailable right now. Please try again later.</div>
          </div>
        ) : (
          <div className="login-form">
            <div className="login-mode-tabs" role="tablist" aria-label="Sign in or sign up">
              <button
                type="button"
                role="tab"
                aria-selected={!isSignUp}
                className={`login-mode-tab${!isSignUp ? ' active' : ''}`}
                onClick={() => handleModeChange('signin')}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isSignUp}
                className={`login-mode-tab${isSignUp ? ' active' : ''}`}
                onClick={() => handleModeChange('signup')}
              >
                Create account
              </button>
            </div>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleEmailSubmit} className="login-email-form">
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="login-name">Full name</label>
                  <input
                    id="login-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={busy}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete={isSignUp ? 'email' : 'username'}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={busy}
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  placeholder={isSignUp ? 'At least 6 characters' : 'Your password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={isSignUp ? 6 : undefined}
                  disabled={busy}
                />
              </div>

              <button type="submit" className="btn btn-primary login-btn" disabled={busy}>
                {submitting ? <Loader2 size={18} className="spin-icon" /> : null}
                {submitting
                  ? isSignUp
                    ? 'Creating account…'
                    : 'Signing in…'
                  : isSignUp
                    ? 'Create account'
                    : 'Sign in with email'}
              </button>
            </form>

            <div className="login-divider">or</div>

            <button
              type="button"
              className="btn btn-google login-btn"
              onClick={handleGoogleSignIn}
              disabled={busy}
            >
              {googleSubmitting ? <Loader2 size={18} className="spin-icon" /> : <GoogleIcon />}
              {googleSubmitting ? 'Signing in…' : 'Continue with Google'}
            </button>

            <p className="login-note">
              By continuing, you agree to our <Link to="/terms">Terms</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
