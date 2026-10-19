import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../config/brand';
import { verifyCashfreeSubscriptionPayment } from '../services/cashfreeService';
import logoImage from '../assets/LSH.png';

function SubscriptionSuccess() {
  const { user, isAuthReady, authInitialized, loading, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order')?.trim() || '';
  const planId = searchParams.get('plan')?.trim() || '';
  const currency = searchParams.get('currency')?.trim() || 'INR';
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    refreshUserProfile();
  }, [refreshUserProfile]);

  useEffect(() => {
    if (!user || !orderId || !planId || user.isSubscribed || !orderId.startsWith('cf_')) {
      return;
    }

    let cancelled = false;
    setConfirmingPayment(true);
    setConfirmError('');

    verifyCashfreeSubscriptionPayment({ orderId, planId, currency })
      .then(async () => {
        if (cancelled) return;
        await refreshUserProfile();
      })
      .catch((err) => {
        if (cancelled) return;
        setConfirmError(err?.message || 'We could not confirm your payment yet. Check My Account in a minute.');
      })
      .finally(() => {
        if (!cancelled) {
          setConfirmingPayment(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.isSubscribed, orderId, planId, currency, refreshUserProfile]);

  useEffect(() => {
    if (!isAuthReady || !authInitialized || loading) {
      return;
    }

    if (!user) {
      navigate('/subscribe', { replace: true });
      return;
    }

    if (!user.isSubscribed && !orderId) {
      navigate('/subscribe', { replace: true });
    }
  }, [user, isAuthReady, authInitialized, loading, orderId, navigate]);

  if (!isAuthReady || !authInitialized || loading || !user) {
    return null;
  }

  if (!user.isSubscribed && !orderId) {
    return null;
  }

  if (confirmingPayment) {
    return (
      <div className="subscribe-page subscribe-page--premium">
        <SEOHead title="Confirming payment" description="Confirming your subscription payment." noindex />
        <div className="subscribe-success">
          <p className="subscribe-success-loading">
            <Loader2 size={22} className="spin-icon" aria-hidden /> Confirming your payment…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscribe-page subscribe-page--premium">
      <SEOHead
        title="Payment Successful"
        description="Your LearnStackHub subscription payment was successful."
        noindex
      />
      <div className="subscribe-success">
        <div className="subscribe-success-glow" aria-hidden />
        <div className="subscribe-success-card">
          <div className="subscribe-success-icon">
            <Check size={32} strokeWidth={2.5} aria-hidden />
          </div>
          <img src={logoImage} alt="" className="subscribe-success-logo" />
          <h1>Payment successful</h1>
          {confirmError && (
            <p className="subscribe-alert subscribe-alert--warn" role="status">
              {confirmError}
            </p>
          )}
          <p>Your {BRAND.name} subscription is active. Tutorials, MCQs, and Practice Lab are unlocked.</p>
          {orderId && (
            <p className="subscribe-success-order">
              Order reference: <strong>{orderId}</strong>
            </p>
          )}
          <div className="subscribe-success-actions">
            <Link to="/tutorial/java-introduction" className="home-btn home-btn-premium">
              Start learning
              <ArrowRight size={18} aria-hidden />
            </Link>
            {orderId && (
              <Link to={`/account/invoice/${orderId}`} className="subscribe-success-secondary">
                View invoice
              </Link>
            )}
            <Link to="/account" className="subscribe-success-secondary">
              My account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionSuccess;
