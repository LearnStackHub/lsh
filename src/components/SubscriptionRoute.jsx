import { Link, Outlet } from 'react-router-dom';
import { BookOpen, BrainCircuit, Code2, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../config/admin';
import { REQUIRE_SUBSCRIPTION } from '../config/subscriptionPlans';
import AuthGateLayout from './AuthGateLayout';
import AuthGateLoading from './AuthGateLoading';

const GATE_FEATURES = [
  { icon: BookOpen, label: 'Full tutorial library' },
  { icon: BrainCircuit, label: 'Unlimited MCQs' },
  { icon: Code2, label: 'Practice Lab access' },
];

function SubscriptionRoute() {
  const { user, loading, authInitialized } = useAuth();

  if (!REQUIRE_SUBSCRIPTION) {
    return <Outlet />;
  }

  if (!authInitialized || loading) {
    return <AuthGateLoading message="Loading your access…" />;
  }

  if (!user) {
    return <Outlet />;
  }

  if (user.isSubscribed || isAdminEmail(user.email)) {
    return <Outlet />;
  }

  return (
    <AuthGateLayout
      eyebrow="Premium learning"
      title="Unlock full access"
      description="Subscribe to explore every tutorial, MCQ set, and Practice Lab exercise on LearnStackHub."
      icon={Crown}
      iconVariant="premium"
      features={GATE_FEATURES}
    >
      <Link to="/subscribe" className="home-btn home-btn-premium auth-gate-cta">
        See plans &amp; pricing
      </Link>
    </AuthGateLayout>
  );
}

export default SubscriptionRoute;
