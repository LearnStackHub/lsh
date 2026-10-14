import { CheckCircle, Home, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSESSMENT_SUBMIT_FALLBACK, sanitizeAssessmentError } from '../assessmentUserMessages';
import RecruitmentLogo from './RecruitmentLogo';

export default function CompletionScreen({ submitting, error }) {
  if (submitting) {
    return (
      <div className="recruitment-complete">
        <RecruitmentLogo size="md" className="recruitment-complete-logo" />
        <Loader2 size={40} className="spin-icon recruitment-complete-icon" aria-hidden />
        <h2>Submitting your exam…</h2>
        <p>Please wait while we save your responses securely.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recruitment-complete">
        <RecruitmentLogo size="md" className="recruitment-complete-logo" />
        <h2>Submission issue</h2>
        <p className="recruitment-error">
          {sanitizeAssessmentError(error, ASSESSMENT_SUBMIT_FALLBACK)}
        </p>
        <Link to="/" className="recruitment-btn recruitment-btn-primary">
          <Home size={18} aria-hidden />
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="recruitment-complete">
      <RecruitmentLogo size="md" className="recruitment-complete-logo" />
      <CheckCircle size={48} className="recruitment-complete-icon recruitment-complete-icon--success" aria-hidden />
      <h2>Exam submitted successfully</h2>
      <p>
        Thank you for completing Assessment L1. We have received your details and answers. Genaixis will
        review your submission and get back to you.
      </p>
      <Link to="/" className="recruitment-btn recruitment-btn-primary">
        <Home size={18} aria-hidden />
        Return to home
      </Link>
    </div>
  );
}
