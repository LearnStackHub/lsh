import { Outlet } from 'react-router-dom';
import { BookOpen, BrainCircuit, Code2, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthGateLayout from './AuthGateLayout';
import AuthGateLoading from './AuthGateLoading';

const GATE_FEATURES = [
  { icon: BookOpen, label: 'Structured tutorials' },
  { icon: BrainCircuit, label: 'Topic-wise MCQs' },
  { icon: Code2, label: 'Practice Lab' },
];

function ProtectedRoute() {
  const { user, loading, authInitialized, openLoginModal, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <Outlet />;
  }

  if (!authInitialized || loading) {
    return <AuthGateLoading />;
  }

  if (!user) {
    return (
      <AuthGateLayout
        eyebrow="Member access"
        title="Sign in to continue learning"
        description="Create a free account to unlock tutorials, MCQs, and hands-on coding practice on LearnStackHub."
        icon={LogIn}
        iconVariant="signin"
        features={GATE_FEATURES}
      >
        <button type="button" className="btn btn-primary auth-gate-cta" onClick={openLoginModal}>
          Sign in or create account
        </button>
      </AuthGateLayout>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
