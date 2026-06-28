import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import logoImage from '../assets/LSH.png';

function AuthGateLayout({
  eyebrow,
  title,
  description,
  icon: Icon,
  iconVariant = 'default',
  features = [],
  children,
}) {
  return (
    <div className="auth-gate-page">
      <div className="auth-gate-card">
        <div className="auth-gate-brand">
          <img src={logoImage} alt="" className="auth-gate-logo" />
          <div className="auth-gate-brand-copy">
            {eyebrow && (
              <span className="auth-gate-eyebrow">
                <GraduationCap size={14} aria-hidden />
                {eyebrow}
              </span>
            )}
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {Icon && (
          <div className={`auth-gate-badge auth-gate-badge--${iconVariant}`}>
            <Icon size={22} aria-hidden />
          </div>
        )}

        {features.length > 0 && (
          <ul className="auth-gate-features">
            {features.map(({ icon: FeatureIcon, label }) => (
              <li key={label}>
                <FeatureIcon size={16} aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="auth-gate-actions">{children}</div>

        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default AuthGateLayout;
