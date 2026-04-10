import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
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

// Minimal loading fallback
const LoadingFallback = () => null;

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* Redirect index.html to home */}
        <Route 
          path="index.html" 
          element={<Navigate to="/" replace />} 
        />
        <Route path="tutorial/:topicId" element={<Tutorial />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="career-guidance" element={<CareerGuidance />} />
        <Route path="disclaimer" element={<Disclaimer />} />
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
      </Route>
    </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContributionProvider>
        <Router basename="/">
          <AppWithTracking />
        </Router>
      </ContributionProvider>
    </AuthProvider>
  );
}

export default App;
