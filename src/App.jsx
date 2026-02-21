import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
import Layout from './components/Layout';
import './App.css';

// Lazy load route components for better performance
const Home = lazy(() => import('./pages/Home'));
const Tutorial = lazy(() => import('./pages/Tutorial'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Sitemap = lazy(() => import('./pages/Sitemap'));

// Load analytics after initial render
let analyticsLoaded = false;
const loadAnalytics = () => {
  if (!analyticsLoaded && typeof window !== 'undefined') {
    import('./config/analytics').then(({ initGA }) => {
      initGA();
      analyticsLoaded = true;
    });
    import('./hooks/usePageTracking').then(({ usePageTracking }) => {
      // This will be handled by the component
    });
  }
};

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '18px',
    color: 'var(--text-secondary)'
  }}>
    Loading...
  </div>
);

// URL redirects mapping for old incorrect URLs to correct ones
const urlRedirects = {
  'servlet-architecture': 'servlet-introduction',
  'servlet-filter': 'filters-listeners',
  'servlet-listener': 'filters-listeners',
  'jdbc-architecture': 'jdbc-introduction'
};

// Component to initialize GA and track routes
function AppWithTracking() {
  // Load analytics after initial render to improve performance
  useEffect(() => {
    // Delay analytics loading to not block initial render
    const timer = setTimeout(() => {
      loadAnalytics();
    }, 2000); // Increased delay for better performance
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
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
          <Route path="sitemap.xml" element={<Sitemap />} />
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
