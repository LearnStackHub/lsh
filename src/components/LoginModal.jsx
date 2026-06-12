import { useState } from 'react';
import { X, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function LoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    signInWithGoogle,
    isAuthReady,
    getAuthErrorMessage,
  } = useAuth();

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSignIn = async () => {
    setError('');
    setSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      const message = getAuthErrorMessage(err);
      if (message) {
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLoginModal} aria-label="Close sign in dialog">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <LogIn size={24} />
          </div>
          <h2>Sign In</h2>
          <p>Sign in to access LearnStackHub</p>
        </div>

        {!isAuthReady ? (
          <div className="login-form">
            <div className="form-error">
              Sign-in is unavailable right now. Please try again later.
            </div>
          </div>
        ) : (
          <div className="login-form">
            {error && <div className="form-error">{error}</div>}

            <button
              type="button"
              className="btn btn-signin login-btn"
              onClick={handleSignIn}
              disabled={submitting}
            >
              {submitting ? <Loader2 size={18} className="spin-icon" /> : null}
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
