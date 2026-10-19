import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Loader2, XCircle } from 'lucide-react';
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
  const isCashfreeReturn = Boolean(orderId.startsWith('cf_') && planId);

  /** idle | verifying | confirmed | incomplete */
  const [verifyPhase, setVerifyPhase] = useState(() => (isCashfreeReturn ? 'idle' : 'confirmed'));

  useEffect(() => {
    refreshUserProfile();
  }, [refreshUserProfile]);

  useEffect(() => {
    if (!user || !isCashfreeReturn || user.isSubscribed) {
      if (user?.isSubscribed) {
        setVerifyPhase('confirmed');
      }
      return;
    }

    let cancelled = false;
    setVerifyPhase('verifying');

    verifyCashfreeSubscriptionPayment({ orderId, planId, currency })
      .then(async () => {
        if (cancelled) return;
        await refreshUserProfile();
        setVerifyPhase('confirmed');
      })
      .catch(() => {
        if (cancelled) return;
        setVerifyPhase('incomplete');
      });

    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.isSubscribed, orderId, planId, currency, isCashfreeReturn, refreshUserProfile]);

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

  const showSuccess = user.isSubscribed || verifyPhase === 'confirmed';
  const showIncomplete = isCashfreeReturn && verifyPhase === 'incomplete' && !user.isSubscribed;
  const showVerifying = isCashfreeReturn && verifyPhase === 'verifying' && !user.isSubscribed;

  if (showVerifying) {
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

  if (showIncomplete) {
    return (
      <div className="subscribe-page subscribe-page--premium">
        <SEOHead title="Payment not completed" description="Subscription payment was not completed." noindex />
        <div className="subscribe-success">
          <div className="subscribe-success-glow" aria-hidden />
          <div className="subscribe-success-card subscribe-success-card--incomplete">
            <div className="subscribe-success-icon subscribe-success-icon--warn">
              <XCircle size={32} strokeWidth={2.5} aria-hidden />
            </div>
            <img src={logoImage} alt="" className="subscribe-success-logo" />
            <h1>Payment not completed</h1>
            <p>
              You returned from checkout without a successful payment. Your account was not charged and your
              subscription is not active yet.
            </p>
            {orderId && (
              <p className="subscribe-success-order">
                Reference: <strong>{orderId}</strong>
              </p>
            )}
            <div className="subscribe-success-actions">
              <Link to="/subscribe" className="home-btn home-btn-premium">
                Back to plans
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link to="/account" className="subscribe-success-secondary">
                My account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showSuccess) {
    return null;
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
