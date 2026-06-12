import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, RefreshCw, ArrowLeft, Crown } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import UserAvatar from '../../components/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import {
  ensureAdminAccess,
  fetchAuthUsersFromApi,
  fetchFirestoreUsers,
  mergeUserRecords,
} from '../../services/adminService';

function formatDate(value) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleString();
}

function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiAvailable, setApiAvailable] = useState(false);

  const loadUsers = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      try {
        await ensureAdminAccess(user);
      } catch (bootstrapError) {
        console.warn('Admin bootstrap skipped:', bootstrapError?.message);
      }

      const firestoreUsers = await fetchFirestoreUsers();
      let authUsers = null;

      try {
        authUsers = await fetchAuthUsersFromApi();
        setApiAvailable(Array.isArray(authUsers));
      } catch (apiError) {
        console.warn('Admin API unavailable:', apiError.message);
        setApiAvailable(false);
      }

      setUsers(mergeUserRecords(authUsers, firestoreUsers));
    } catch (err) {
      setError(err.message || 'Could not load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [user?.uid]);

  const activeSubscriptions = users.filter((entry) => entry.subscriptionStatus === 'active').length;

  return (
    <>
      <SEOHead
        title="Admin Dashboard | LearnStackHub"
        description="LearnStackHub admin user dashboard"
        noindex
      />

      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <div>
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={16} aria-hidden />
              Back to site
            </Link>
            <h1>
              <Shield size={28} aria-hidden />
              Admin Dashboard
            </h1>
            <p>Signed in as {user?.email}</p>
          </div>
          <button type="button" className="btn btn-primary admin-refresh-btn" onClick={loadUsers} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin-icon' : ''} aria-hidden />
            Refresh
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <Users size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">{users.length}</span>
              <span className="admin-stat-label">Total users</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <Crown size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">{activeSubscriptions}</span>
              <span className="admin-stat-label">Active subscriptions</span>
            </div>
          </div>
        </div>

        {!apiAvailable && (
          <p className="admin-note">
            Showing Firestore profiles. Add <code>FIREBASE_SERVICE_ACCOUNT</code> on Vercel to also list all
            Firebase Auth users via <code>/api/admin-users</code>.
          </p>
        )}

        {error && <div className="form-error admin-error">{error}</div>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Subscription</th>
                <th>Joined</th>
                <th>Last sign-in</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Loading users…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    No users yet. Users appear here after they sign in with Google.
                  </td>
                </tr>
              ) : (
                users.map((entry) => (
                  <tr key={entry.uid}>
                    <td>
                      <div className="admin-user-cell">
                        <UserAvatar
                          photoURL={entry.photoURL}
                          name={entry.displayName || entry.email}
                        />
                        <span>{entry.displayName || 'User'}</span>
                      </div>
                    </td>
                    <td>{entry.email || '—'}</td>
                    <td>{entry.provider || 'google.com'}</td>
                    <td>
                      <span className={`admin-badge admin-badge-${entry.subscriptionStatus || 'none'}`}>
                        {entry.subscriptionStatus || 'none'}
                      </span>
                    </td>
                    <td>{formatDate(entry.createdAt)}</td>
                    <td>{formatDate(entry.lastSignIn)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
