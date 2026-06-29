import { CheckCircle, Home, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompletionScreen({ submitting, error }) {
  if (submitting) {
    return (
      <div className="recruitment-card recruitment-complete">
        <Loader2 size={40} className="spin-icon recruitment-complete-icon" aria-hidden />
        <h2>Submitting your exam…</h2>
        <p>Please wait while we save your responses securely.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recruitment-card recruitment-complete">
        <h2>Submission issue</h2>
        <p className="recruitment-error">{error}</p>
        <Link to="/" className="recruitment-btn recruitment-btn-primary">
          <Home size={18} aria-hidden />
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="recruitment-card recruitment-complete">
      <CheckCircle size={48} className="recruitment-complete-icon recruitment-complete-icon--success" aria-hidden />
      <h2>Exam submitted successfully</h2>
      <p>
        Thank you for completing the recruitment exam. We have received your details and answers. Our team will
        review your submission and get back to you.
      </p>
      <Link to="/" className="recruitment-btn recruitment-btn-primary">
        <Home size={18} aria-hidden />
        Return to home
      </Link>
    </div>
  );
}
