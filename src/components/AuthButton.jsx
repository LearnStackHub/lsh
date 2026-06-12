import { LogIn, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../config/admin';
import UserAvatar from './UserAvatar';
function AuthButton({ compact = false }) {
  const { user, loading, openLoginModal, logout } = useAuth();

  if (loading) {
    return (
      <span className="auth-button auth-button-loading" aria-hidden="true">
        ...
      </span>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        className="auth-button auth-button-signin"
        onClick={openLoginModal}
      >
        <LogIn size={16} aria-hidden />
        {!compact && <span>Sign In</span>}
      </button>
    );
  }

  return (
    <div className="auth-user-menu">
      {isAdminEmail(user.email) && (
        <Link to="/admin" className="auth-button auth-button-admin" title="Admin dashboard">
          <Shield size={16} aria-hidden />
          {!compact && <span>Admin</span>}
        </Link>
      )}
      <div className="auth-user-info" title={user.email}>
        <UserAvatar photoURL={user.photoURL} name={user.name} />
        {!compact && <span className="auth-user-name">{user.name}</span>}
      </div>
      <button
        type="button"
        className="auth-button auth-button-signout"
        onClick={logout}
        title="Sign out"
      >
        <LogOut size={16} aria-hidden />
        {!compact && <span>Sign Out</span>}
      </button>
    </div>
  );
}

export default AuthButton;
