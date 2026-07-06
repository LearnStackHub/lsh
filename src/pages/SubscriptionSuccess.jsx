import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../config/brand';
import logoImage from '../assets/LSH.png';

function SubscriptionSuccess() {
  const { user, isAuthReady, authInitialized, loading, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order')?.trim() || '';

  useEffect(() => {
    refreshUserProfile();
  }, [refreshUserProfile]);

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
