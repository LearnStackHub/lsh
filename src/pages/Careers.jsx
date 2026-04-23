import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Briefcase, CheckCircle, Mail, Rocket, Clock, Zap, Phone
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { sendRegistrationEmail } from '../config/emailjs';

function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await sendRegistrationEmail(formData);

    if (result.success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      setError(result.error || 'Failed to send registration. Please try again or email us directly.');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="tutorial-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="Apply for Internship | LearnStackHub" 
        description="Apply for internship opportunities at LearnStackHub. Final-year students and recent graduates can submit their application."
      />
      <StructuredData type="Organization" />
      
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
          borderRadius: '24px',
          padding: '4rem 3rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <Zap size={16} />
              Internship Applications Open
            </div>
            <h1 style={{ 
              color: 'white', 
              marginBottom: '1rem', 
              fontSize: '3rem',
              fontWeight: '800',
              lineHeight: '1.2'
            }}>
              Apply for Internship
            </h1>
            <p style={{ 
              fontSize: '1.4rem', 
              lineHeight: '1.8', 
              margin: '0 auto 2rem',
              maxWidth: '700px',
              fontWeight: '500',
              opacity: 0.95
            }}>
              This page is only for internship applications. <strong>Final-year students and recent graduates</strong> can apply.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <a 
                href="#register-form" 
                className="btn btn-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  background: 'white',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Rocket size={24} />
                Apply Now
              </a>
              <a 
                href="tel:8466932302" 
                className="btn"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  border: '2px solid white'
                }}
              >
                <Phone size={20} />
                Call Us: 8466932302
              </a>
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: '0.95rem',
              opacity: 0.9
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Internship Role</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Final-Year Students</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Recent Graduates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tutorial-content">
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
            Internship Eligibility
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                background: '#f59e0b',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                ELIGIBLE
              </div>
              <Briefcase size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#92400e' }}>Final-Year Students</h3>
              <p style={{ color: '#78350f', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Students currently in the final year of graduation can apply for internship opportunities.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              border: '2px solid #3b82f6',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                background: '#3b82f6',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                ELIGIBLE
              </div>
              <Briefcase size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#1e40af' }}>Recent Graduates</h3>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Candidates who recently completed graduation can apply for internship opportunities.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              border: '2px solid #ec4899',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                background: '#ec4899',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                NOTE
              </div>
              <Briefcase size={48} style={{ color: '#ec4899', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#9f1239' }}>Internship Applications Only</h3>
              <p style={{ color: '#831843', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Internship applications are open for final-year students and recent graduates.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem' }}>
            Quick Career Info
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            A short overview of what happens after you apply.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Application Review</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Our team checks your details and profile after form submission.
              </p>
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Shortlisting</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Eligible final-year students and recent graduates are shortlisted.
              </p>
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Contact Update</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Shortlisted candidates are contacted with next-step details.
              </p>
            </div>
          </div>
        </section>

        <section id="register-form" style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                Apply for Internship
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </div>

            {submitted ? (
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                border: '2px solid #22c55e',
                borderRadius: '16px',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <CheckCircle size={64} style={{ color: '#22c55e', marginBottom: '1rem' }} />
                <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  Application Submitted!
                </h3>
                <p style={{ color: '#166534', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  Thank you for applying. Our team will review your application and contact you within 24 hours.
                </p>
                <p style={{ color: '#166534', fontSize: '0.95rem' }}>
                  Check your email for confirmation. You can also reach us at{' '}
                  <a href="mailto:careers@learnstackhub.com" style={{ color: '#166534', fontWeight: '600' }}>
                    careers@learnstackhub.com
                  </a>
                  {' '}or call us at{' '}
                  <a href="tel:8466932302" style={{ color: '#166534', fontWeight: '600' }}>
                    8466932302
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <div style={{
                    background: '#fee2e2',
                    border: '2px solid #ef4444',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    color: '#991b1b'
                  }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label htmlFor="name">
                      <strong>Full Name *</strong>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      style={{ padding: '0.75rem', fontSize: '1rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <strong>Email Address *</strong>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      style={{ padding: '0.75rem', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <strong>Phone Number *</strong>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 9876543210"
                      style={{ padding: '0.75rem', fontSize: '1rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="course">
                      <strong>Applicant Type *</strong>
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Select applicant type</option>
                      <option value="final-year">Final-Year Student</option>
                      <option value="recent-graduate">Recent Graduate</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="message">
                    <strong>Tell Us About Yourself (Optional)</strong>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your background, goals, or any questions..."
                    style={{ padding: '0.75rem', fontSize: '1rem', resize: 'vertical' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ 
                    width: '100%',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <>
                      <Clock size={24} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Rocket size={24} />
                      Submit Internship Application
                    </>
                  )}
                </button>

                <p style={{ 
                  textAlign: 'center', 
                  marginTop: '1rem', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  By submitting, you agree to receive communication from LearnStackHub about your internship application.
                </p>
              </form>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Internship Information</h2>
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={24} style={{ color: 'var(--accent-primary)' }} />
                Who Can Apply
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                    Final-Year Students
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    Students currently in their final year can apply.
                  </p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                    Recent Graduates
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    Students who passed out recently can apply.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={24} style={{ color: 'var(--accent-primary)' }} />
                Important Note
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Internship Applications Only</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Internship applications are open for final-year students and recent graduates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Have Questions? We're Here to Help!</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              <div>
                <Mail size={32} style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>Email</h4>
                <a href="mailto:careers@learnstackhub.com" style={{ 
                  color: 'var(--accent-primary)', 
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  careers@learnstackhub.com
                </a>
              </div>
              <div>
                <Phone size={32} style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>Call Us</h4>
                <a href="tel:8466932302" style={{ 
                  color: 'var(--accent-primary)', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  8466932302
                </a>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                  Available Mon-Sat, 9 AM - 6 PM
                </p>
              </div>
              <div>
                <Clock size={32} style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>Response Time</h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--border-color)' }}>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Careers;
