import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, RefreshCw, ArrowLeft, Crown, Briefcase, CreditCard, Receipt } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import UserAvatar from '../../components/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import {
  ensureAdminAccess,
  fetchAuthUsersFromApi,
  fetchAdminPayments,
  fetchFirestoreUsers,
  mergeUserRecords,
  buildUserFromSession,
} from '../../services/adminService';
import { formatInvoiceAmount, formatInvoiceDate } from '../../services/invoiceService';
import { auth } from '../../config/firebase';
import { persistUserProfile } from '../../services/userService';

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
  const [invoices, setInvoices] = useState([]);
  const [paymentsTruncated, setPaymentsTruncated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      const savedProfile = await persistUserProfile(auth.currentUser);

      let profileUsers = [];
      let accountUsers = null;

      try {
        accountUsers = await fetchAuthUsersFromApi();
      } catch (apiError) {
        console.warn('Full user list unavailable:', apiError?.message);
      }

      try {
        profileUsers = await fetchFirestoreUsers();
      } catch (profileError) {
        if (!accountUsers?.length) {
          throw profileError;
        }
        console.warn('Profile list unavailable:', profileError?.message);
      }

      let merged = mergeUserRecords(accountUsers, profileUsers);

      if (merged.length === 0 && auth?.currentUser) {
        const fallback = buildUserFromSession(auth.currentUser, savedProfile);
        if (fallback) {
          merged = [fallback];
        }
      }

      setUsers(merged);

      try {
        const paymentsPayload = await fetchAdminPayments();
        setInvoices(Array.isArray(paymentsPayload.invoices) ? paymentsPayload.invoices : []);
        setPaymentsTruncated(Boolean(paymentsPayload.truncated));
      } catch (paymentsError) {
        console.warn('Admin payments list unavailable:', paymentsError?.message);
        setInvoices([]);
        setPaymentsTruncated(false);
      }
    } catch (err) {
      setError(err.message || 'Unable to load users right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [user?.uid]);

  const activeSubscriptions = users.filter((entry) => entry.subscriptionStatus === 'active').length;

  const invoicesByUid = useMemo(() => {
    const map = new Map();
    invoices.forEach((invoice) => {
      const uid = invoice.uid || '';
      if (!uid) return;
      const list = map.get(uid) || [];
      list.push(invoice);
      map.set(uid, list);
    });
    return map;
  }, [invoices]);

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
          <div className="admin-dashboard-actions">
            <Link to="/admin/recruitment" className="btn btn-secondary admin-refresh-btn">
              <Briefcase size={16} aria-hidden />
              Assessment L1
            </Link>
            <Link to="/admin/payments" className="btn btn-secondary admin-refresh-btn">
              <CreditCard size={16} aria-hidden />
              Payment gateway
            </Link>
            <button type="button" className="btn btn-primary admin-refresh-btn" onClick={loadUsers} disabled={loading}>
              <RefreshCw size={16} className={loading ? 'spin-icon' : ''} aria-hidden />
              Refresh
            </button>
          </div>
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
          <div className="admin-stat-card">
            <Receipt size={22} aria-hidden />
            <div>
              <span className="admin-stat-value">{invoices.length}</span>
              <span className="admin-stat-label">Invoices on file</span>
            </div>
          </div>
        </div>

        {paymentsTruncated && (
          <p className="admin-table-notice" role="status">
            Showing the latest 500 payment records. Older invoices may not appear here.
          </p>
        )}

        {error && <div className="form-error admin-error">{error}</div>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Invoices</th>
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
                    No users yet. New members appear here after they sign in.
                  </td>
                </tr>
              ) : (
                users.map((entry) => {
                  const userInvoices = invoicesByUid.get(entry.uid) || [];

                  return (
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
                      <td>
                        <span className={`admin-badge admin-badge-${entry.subscriptionStatus || 'none'}`}>
                          {entry.subscriptionStatus || 'none'}
                        </span>
                      </td>
                      <td className="admin-invoices-cell">
                        {userInvoices.length === 0 ? (
                          '—'
                        ) : (
                          <ul className="admin-invoice-list">
                            {userInvoices.map((invoice) => (
                              <li key={invoice.orderId}>
                                <Link to={`/admin/invoice/${invoice.orderId}`} className="admin-invoice-link">
                                  {invoice.invoiceNumber}
                                </Link>
                                <span className="admin-table-sub">
                                  {invoice.planLabel} · {formatInvoiceAmount(invoice)} ·{' '}
                                  {formatInvoiceDate(invoice.issuedAt)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>{formatDate(entry.createdAt)}</td>
                      <td>{formatDate(entry.lastSignIn)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
