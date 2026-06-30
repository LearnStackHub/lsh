import { CalendarX, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecruitmentLogo from './RecruitmentLogo';

export default function AssessmentClosedScreen({ message }) {
  return (
    <div className="recruitment-shell">
      <div className="recruitment-register">
        <header className="recruitment-hero">
          <div className="recruitment-hero-head">
            <RecruitmentLogo size="lg" />
            <div className="recruitment-hero-copy">
              <h1>Assessment L1</h1>
            </div>
          </div>
        </header>

        <div className="recruitment-register-body">
          <div className="recruitment-complete recruitment-closed">
            <CalendarX
              size={48}
              className="recruitment-complete-icon recruitment-closed-icon"
              aria-hidden
            />
            <h2>Registrations closed</h2>
            <p>{message}</p>
            <Link to="/" className="recruitment-btn recruitment-btn-primary">
              <Home size={18} aria-hidden />
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
