import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
import LoginModal from './components/LoginModal';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import SubscriptionRoute from './components/SubscriptionRoute';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import { initGA } from './config/analytics';
import { usePageTracking } from './hooks/usePageTracking';
import './App.css';

// Lazy load all routes except Home (critical above-the-fold)
const Tutorial = lazy(() => import('./pages/Tutorial'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Careers = lazy(() => import('./pages/Careers'));
const CareerGuidance = lazy(() => import('./pages/CareerGuidance'));
const CoreJavaMCQ = lazy(() => import('./pages/CoreJavaMCQ'));
const JDBCMCQ = lazy(() => import('./pages/JDBCMCQ'));
const MySQLMCQ = lazy(() => import('./pages/MySQLMCQ'));
const SpringMCQ = lazy(() => import('./pages/SpringMCQ'));
const SpringBootMCQ = lazy(() => import('./pages/SpringBootMCQ'));
const HibernateMCQ = lazy(() => import('./pages/HibernateMCQ'));
const MicroservicesMCQ = lazy(() => import('./pages/MicroservicesMCQ'));
const AiLab = lazy(() => import('./pages/ai/AiLab'));
const AiChat = lazy(() => import('./pages/ai/AiChat'));
const AiInterview = lazy(() => import('./pages/ai/AiInterview'));
const AiCodeEditor = lazy(() => import('./pages/ai/AiCodeEditor'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const SubscriptionSuccess = lazy(() => import('./pages/SubscriptionSuccess'));
const Account = lazy(() => import('./pages/Account'));
const Invoice = lazy(() => import('./pages/Invoice'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const RecruitmentAdmin = lazy(() => import('./pages/admin/RecruitmentAdmin'));
const RecruitmentExam = lazy(() => import('./pages/recruitment/RecruitmentExam'));

// Minimal loading fallback
const LoadingFallback = () => null;

function LegacyKafkaRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/kafka/${topicSlug}`} replace />;
}

function LegacyDockerRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/docker/${topicSlug}`} replace />;
}

function LegacyHibernateRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/hibernate/hibernate-${topicSlug}`} replace />;
}

function LegacySpringRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/spring/spring-${topicSlug}`} replace />;
}

function LegacySpringBootRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/springboot/spring-boot-${topicSlug}`} replace />;
}

function LegacyMySQLRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/mysql/mysql-${topicSlug}`} replace />;
}

function LegacyCoreJavaRouteRedirect() {
  const { topicSlug } = useParams();
  return <Navigate to={`/corejava/java-${topicSlug}`} replace />;
}

// URL redirects mapping for old incorrect URLs to correct ones
const urlRedirects = {
  'servlet-architecture': 'servlet-introduction',
  'servlet-filter': 'filters-listeners',
  'servlet-listener': 'filters-listeners',
  'jdbc-architecture': 'jdbc-introduction'
};

// Component to initialize GA and track routes
function AppWithTracking() {
  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  usePageTracking();

  return (
    <Suspense fallback={<LoadingFallback />}>
    <ScrollToTop />
    <Routes>
      {/* Redirect old incorrect URLs to correct ones - must be before Layout route */}
      <Route 
        path="/tutorial/servlet-architecture" 
        element={<Navigate to="/tutorial/servlet-introduction" replace />} 
      />
      <Route 
        path="/tutorial/servlet-filter" 
        element={<Navigate to="/tutorial/filters-listeners" replace />} 
      />
      <Route 
        path="/tutorial/servlet-listener" 
        element={<Navigate to="/tutorial/filters-listeners" replace />} 
      />
      <Route 
        path="/tutorial/jdbc-architecture" 
        element={<Navigate to="/tutorial/jdbc-introduction" replace />} 
      />
      <Route
        path="/tutorial/kafka-:topicSlug"
        element={<LegacyKafkaRouteRedirect />}
      />
      <Route
        path="/tutorial/docker-:topicSlug"
        element={<LegacyDockerRouteRedirect />}
      />
      <Route
        path="/tutorial/hibernate-:topicSlug"
        element={<LegacyHibernateRouteRedirect />}
      />
      <Route
        path="/tutorial/spring-:topicSlug"
        element={<LegacySpringRouteRedirect />}
      />
      <Route
        path="/tutorial/spring-boot-:topicSlug"
        element={<LegacySpringBootRouteRedirect />}
      />
      <Route
        path="/tutorial/mysql-:topicSlug"
        element={<LegacyMySQLRouteRedirect />}
      />
      <Route
        path="/tutorial/java-:topicSlug"
        element={<LegacyCoreJavaRouteRedirect />}
      />
      <Route path="/assessment" element={<RecruitmentExam />} />
      <Route path="/recruitment-exam" element={<Navigate to="/assessment" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="index.html"
          element={<Navigate to="/" replace />}
        />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="subscription-success" element={<SubscriptionSuccess />} />
          <Route path="account" element={<Account />} />
          <Route path="account/invoice/:orderId" element={<Invoice />} />
          <Route element={<SubscriptionRoute />}>
            <Route path="tutorial/:topicId" element={<Tutorial />} />
            <Route path="corejava/:topicId" element={<Tutorial />} />
            <Route path="mysql/:topicId" element={<Tutorial />} />
            <Route path="spring/:topicId" element={<Tutorial />} />
            <Route path="springboot/:topicId" element={<Tutorial />} />
            <Route path="hibernate/:topicId" element={<Tutorial />} />
            <Route path="java8/:topicSlug" element={<Tutorial />} />
            <Route path="microservices/:topicSlug" element={<Tutorial />} />
            <Route path="springai/:topicSlug" element={<Tutorial />} />
            <Route path="kafka/:topicSlug" element={<Tutorial />} />
            <Route path="docker/:topicSlug" element={<Tutorial />} />
            <Route path="careers" element={<Careers />} />
            <Route path="career-guidance" element={<CareerGuidance />} />
            <Route path="core-java-mcq" element={<CoreJavaMCQ />} />
            <Route path="jdbc-mcq" element={<JDBCMCQ />} />
            <Route path="mysql-mcq" element={<MySQLMCQ />} />
            <Route path="spring-mcq" element={<SpringMCQ />} />
            <Route path="spring-boot-mcq" element={<SpringBootMCQ />} />
            <Route path="hibernate-mcq" element={<HibernateMCQ />} />
            <Route path="microservices-mcq" element={<MicroservicesMCQ />} />
            <Route path="ai-lab" element={<AiLab />} />
            <Route path="ai-lab/chat" element={<AiChat />} />
            <Route path="ai-lab/interview" element={<AiInterview />} />
            <Route path="ai-lab/code-editor" element={<AiCodeEditor />} />
            <Route
              path="admin/recruitment"
              element={
                <AdminRoute>
                  <RecruitmentAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Route>
        </Route>
      </Route>    </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContributionProvider>
        <Router basename="/">
          <AppWithTracking />
          <LoginModal />
        </Router>
      </ContributionProvider>
    </AuthProvider>
  );
}

export default App;
