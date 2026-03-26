import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

function NotFound() {
  return (
    <div className="tutorial-page">
      <SEOHead title="Page Not Found - LearnStackHub" noindex />
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default NotFound;
