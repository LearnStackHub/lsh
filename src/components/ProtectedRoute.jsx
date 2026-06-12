import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { user, loading, authInitialized, openLoginModal, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && authInitialized && !loading && !user) {
      openLoginModal();
    }
  }, [isAuthReady, authInitialized, loading, user, openLoginModal]);

  if (!isAuthReady) {
    return <Outlet />;
  }

  if (!authInitialized || loading) {
    return (
      <div className="auth-gate-loading">
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-gate-prompt">
        <LogIn size={40} aria-hidden />
        <h1>Sign in required</h1>
        <p>Sign in with Google to access tutorials, MCQs, and the Practice Lab.</p>
        <div className="auth-gate-actions">
          <button type="button" className="btn btn-primary" onClick={openLoginModal}>
            Sign in with Google
          </button>
          <Link to="/" className="auth-back-link">
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
