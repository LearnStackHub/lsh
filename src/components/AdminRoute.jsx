import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../config/admin';

function AdminRoute({ children }) {
  const { user, loading, authInitialized, openLoginModal } = useAuth();

  useEffect(() => {
    if (authInitialized && !loading && !user) {
      openLoginModal();
    }
  }, [authInitialized, loading, user, openLoginModal]);

  if (!authInitialized || loading) {
    return (
      <div className="admin-page-loading">
        <p>Loading admin dashboard…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page-loading">
        <p>Please sign in with Google to open the admin dashboard.</p>
        <Link to="/" className="admin-back-link">
          <ArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
      </div>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <div className="admin-access-denied">
        <Shield size={40} aria-hidden />
        <h1>Access restricted</h1>
        <p>Your account does not have permission to view this page.</p>
        <p className="admin-access-hint">
          Sign in with a different Google account, or contact the site owner if you need access.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
