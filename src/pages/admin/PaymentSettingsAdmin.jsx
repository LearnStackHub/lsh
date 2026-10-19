import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Loader2, RefreshCw, Shield } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { useAuth } from '../../context/AuthContext';
import {
  fetchAdminPaymentSettings,
  updateAdminPaymentGateway,
} from '../../services/paymentSettingsService';
import { invalidateCheckoutSettingsCache } from '../../services/checkoutService';
import './PaymentSettingsAdmin.css';

const GATEWAY_META = {
  razorpay: {
    title: 'Razorpay',
    detail: 'Uses RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server.',
  },
  cashfree: {
    title: 'Cashfree',
    detail: 'Uses CASHFREE_APP_ID and CASHFREE_SECRET_KEY on the server.',
  },
};

export default function PaymentSettingsAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeGateway, setActiveGateway] = useState('razorpay');
  const [gateways, setGateways] = useState(['razorpay', 'cashfree']);
  const [razorpayConfigured, setRazorpayConfigured] = useState(false);
  const [cashfreeConfigured, setCashfreeConfigured] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await fetchAdminPaymentSettings();
      setActiveGateway(data.activeGateway || data.settings?.activeGateway || 'razorpay');
      setGateways(Array.isArray(data.gateways) ? data.gateways : ['razorpay', 'cashfree']);
      setRazorpayConfigured(Boolean(data.razorpayConfigured));
      setCashfreeConfigured(Boolean(data.cashfreeConfigured));
      setUpdatedAt(data.updatedAt || data.settings?.updatedAt || null);
    } catch (err) {
      setError(err.message || 'Could not load payment settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user?.uid]);

  const save = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const data = await updateAdminPaymentGateway(activeGateway);
      invalidateCheckoutSettingsCache();
      setActiveGateway(data.activeGateway || activeGateway);
      setRazorpayConfigured(Boolean(data.razorpayConfigured));
      setCashfreeConfigured(Boolean(data.cashfreeConfigured));
      setUpdatedAt(data.updatedAt || data.settings?.updatedAt || null);
      setSuccess('Payment gateway updated. New checkouts will use this provider.');
    } catch (err) {
      setError(err.message || 'Could not save payment settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEOHead title="Payment gateway | Admin" description="Configure checkout gateway" noindex />

      <div className="admin-dashboard payment-settings-admin">
        <div className="admin-dashboard-header">
          <div>
            <Link to="/admin" className="admin-back-link">
              <ArrowLeft size={16} aria-hidden />
              Back to admin
            </Link>
            <h1>
              <CreditCard size={28} aria-hidden />
              Payment gateway
            </h1>
            <p>Signed in as {user?.email}</p>
          </div>
          <button type="button" className="btn btn-primary admin-refresh-btn" onClick={load} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin-icon' : ''} aria-hidden />
            Refresh
          </button>
        </div>

        <p className="payment-settings-lead">
          Choose which provider powers <strong>/subscribe</strong> checkout. API keys stay in Vercel environment
          variables — this screen only switches the active gateway.
        </p>

        {error && <div className="form-error admin-error">{error}</div>}
        {success && <div className="payment-settings-success">{success}</div>}

        {loading ? (
          <p className="payment-settings-loading">
            <Loader2 size={18} className="spin-icon" aria-hidden /> Loading…
          </p>
        ) : (
          <div className="payment-settings-grid">
            {gateways.map((id) => {
              const meta = GATEWAY_META[id] || { title: id, detail: '' };
              const configured = id === 'cashfree' ? cashfreeConfigured : razorpayConfigured;
              const selected = activeGateway === id;

              return (
                <label
                  key={id}
                  className={`payment-settings-card${selected ? ' payment-settings-card--on' : ''}${
                    !configured ? ' payment-settings-card--disabled' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-gateway"
                    value={id}
                    checked={selected}
                    disabled={!configured}
                    onChange={() => setActiveGateway(id)}
                  />
                  <div className="payment-settings-card-body">
                    <div className="payment-settings-card-head">
                      <strong>{meta.title}</strong>
                      <span
                        className={`payment-settings-badge${
                          configured ? ' payment-settings-badge--ok' : ' payment-settings-badge--warn'
                        }`}
                      >
                        {configured ? 'Configured' : 'Missing env keys'}
                      </span>
                    </div>
                    <p>{meta.detail}</p>
                    {selected && (
                      <p className="payment-settings-active">
                        <Shield size={14} aria-hidden /> Active for new payments
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {updatedAt && (
          <p className="payment-settings-meta">Last updated: {new Date(updatedAt).toLocaleString()}</p>
        )}

        <div className="payment-settings-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={save}
            disabled={loading || saving || !activeGateway}
          >
            {saving ? 'Saving…' : 'Save gateway'}
          </button>
        </div>
      </div>
    </>
  );
}
