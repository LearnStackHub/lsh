import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, FileText, LogOut, Shield, User } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import MentorConnectPanel from '../components/MentorConnectPanel';
import UserAvatar from '../components/UserAvatar';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../config/admin';
import { hasLiveTrainingAccess } from '../config/mentorConnect';
import { getPlanById } from '../config/subscriptionPlans';
import { fetchInvoices, formatInvoiceAmount, formatInvoiceDate } from '../services/invoiceService';

function formatExpiryDate(expiresAt) {
  if (!expiresAt) {
    return '—';
  }

  const date = expiresAt.toDate ? expiresAt.toDate() : new Date(expiresAt);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getSubscriptionLabel(user) {
  if (isAdminEmail(user.email)) {
    return { status: 'Admin access', detail: 'Full platform access as an administrator.', tone: 'admin' };
  }

  if (user.isSubscribed) {
    const plan = getPlanById(user.subscription?.plan);
    return {
      status: 'Active',
      detail: plan ? `${plan.name} — valid until ${formatExpiryDate(user.subscription?.expiresAt)}` : 'Full access enabled',
      tone: 'active',
    };
  }

  return {
    status: 'Not subscribed',
    detail: 'Subscribe to unlock tutorials, MCQs, and the Practice Lab.',
    tone: 'inactive',
  };
}

function Account() {
  const { user, loading, refreshUserProfile, logout, openLoginModal } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [invoicesError, setInvoicesError] = useState('');
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) {
      return undefined;
    }

    refreshUserProfile();
    return undefined;
  }, [userId, refreshUserProfile]);

  useEffect(() => {
    if (!userId) {
      setInvoices([]);
      setInvoicesError('');
      return undefined;
    }

    let mounted = true;
    setInvoicesLoading(true);
    setInvoicesError('');

    fetchInvoices()
      .then((data) => {
        if (mounted) {
          setInvoices(data);
        }
      })
      .catch((error) => {
        if (mounted) {
          setInvoicesError(error?.message || 'Could not load invoices');
        }
      })
      .finally(() => {
        if (mounted) {
          setInvoicesLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="account-page">
        <p className="account-loading">Loading your account…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="account-page">
        <SEOHead title="Account" description="Your LearnStackHub account." />
        <div className="account-card account-card--prompt">
          <User size={40} aria-hidden />
          <h1>Sign in to view your account</h1>
          <p>Your profile and subscription details appear here after you sign in.</p>
          <button type="button" className="btn btn-primary" onClick={openLoginModal}>
            Sign in
          </button>
        </div>
      </div>
    );
  }

  const subscription = getSubscriptionLabel(user);
  const latestOrderId = user.subscription?.razorpayOrderId;
  const showMentorConnect = hasLiveTrainingAccess(user, isAdminEmail(user.email));

  return (
    <div className="account-page">
      <SEOHead title="My Account" description="View your LearnStackHub profile and subscription." />

      <div className="account-hero">
        <User size={28} aria-hidden />
        <h1>My account</h1>
        <p>Your profile, subscription, and invoices</p>
      </div>

      {showMentorConnect && <MentorConnectPanel user={user} />}

      <div className="account-grid">
        <section className="account-card account-card--profile">
          <h2>Profile</h2>
          <div className="account-profile">
            <UserAvatar photoURL={user.photoURL} name={user.name} className="account-avatar" iconSize={28} />
            <div className="account-profile-details">
              <p className="account-profile-name">{user.name}</p>
              <p className="account-profile-email">{user.email}</p>
            </div>
          </div>
          <dl className="account-details">
            <div className="account-detail-row">
              <dt>Display name</dt>
              <dd>{user.name}</dd>
            </div>
            <div className="account-detail-row">
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </section>

        <section className="account-card">
          <h2>Subscription</h2>
          <div className={`account-status account-status--${subscription.tone}`}>
            <Crown size={18} aria-hidden />
            <span>{subscription.status}</span>
          </div>
          <p className="account-status-detail">{subscription.detail}</p>
          {!user.isSubscribed && !isAdminEmail(user.email) && (
            <Link to="/subscribe" className="btn btn-primary account-action-btn">
              View plans
            </Link>
          )}
          {latestOrderId && (
            <Link to={`/account/invoice/${latestOrderId}`} className="account-invoice-link">
              <FileText size={16} aria-hidden />
              View latest invoice
            </Link>
          )}
        </section>

        <section className="account-card account-card--actions">
          <h2>Quick actions</h2>
          <div className="account-actions">
            {isAdminEmail(user.email) && (
              <Link to="/admin" className="account-action-link">
                <Shield size={18} aria-hidden />
                Admin dashboard
              </Link>
            )}
            {!user.isSubscribed && !isAdminEmail(user.email) && (
              <Link to="/subscribe" className="account-action-link">
                <Crown size={18} aria-hidden />
                Subscribe
              </Link>
            )}
            <Link to="/tutorial/java-introduction" className="account-action-link">
              Start learning
            </Link>
            <button type="button" className="account-action-link account-action-link--button" onClick={logout}>
              <LogOut size={18} aria-hidden />
              Sign out
            </button>
          </div>
        </section>
      </div>

      <section className="account-card account-card--invoices">
        <h2>Invoices</h2>
        {invoicesLoading && <p className="account-invoices-empty">Loading invoices…</p>}
        {invoicesError && (
          <div className="subscribe-alert subscribe-alert--error" role="alert">
            {invoicesError}
          </div>
        )}
        {!invoicesLoading && !invoicesError && invoices.length === 0 && (
          <p className="account-invoices-empty">No invoices yet. Invoices appear here after you subscribe.</p>
        )}
        {!invoicesLoading && invoices.length > 0 && (
          <div className="account-invoices-table-wrap">
            <table className="account-invoices-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Plan</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.orderId}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.planLabel}</td>
                    <td>{formatInvoiceDate(invoice.issuedAt)}</td>
                    <td>{formatInvoiceAmount(invoice)}</td>
                    <td>
                      <Link to={`/account/invoice/${invoice.orderId}`} className="account-invoice-view-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Account;
