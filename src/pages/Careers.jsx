import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  GraduationCap, Briefcase, Users, Target, CheckCircle, Mail, ArrowRight, Code, Rocket, Award,
  Star, Clock, DollarSign, BookOpen, TrendingUp, Zap, Gift, Shield, Calendar, Phone
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    }, 5000);
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
        title="Register for Training - Java Full Stack Course with Placements | LearnStackHub" 
        description="Register now for professional Java Full Stack training with guaranteed placements. Join our comprehensive course with live projects, internships, and 100% placement assistance."
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
              Limited Seats Available - Register Now!
            </div>
            <h1 style={{ 
              color: 'white', 
              marginBottom: '1rem', 
              fontSize: '3rem',
              fontWeight: '800',
              lineHeight: '1.2'
            }}>
              Start Your Tech Career Today
            </h1>
            <p style={{ 
              fontSize: '1.4rem', 
              lineHeight: '1.8', 
              margin: '0 auto 2rem',
              maxWidth: '700px',
              fontWeight: '500',
              opacity: 0.95
            }}>
              Join our comprehensive Java Full Stack training program with <strong>100% placement assistance</strong>, 
              real-world projects, and internship opportunities. Transform from student to professional developer.
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
                Register Now - Free Consultation
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
                <span>100% Placement Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Live Projects</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Industry Mentors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tutorial-content">
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
            Why Students Choose Our Training Program
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
                GUARANTEED
              </div>
              <Briefcase size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#92400e' }}>100% Placement Assistance</h3>
              <p style={{ color: '#78350f', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                We don't just train you - we place you! Our dedicated placement team works with top companies to ensure 
                you get your dream job. <strong>Placement guarantee for eligible students.</strong>
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
                REAL PROJECTS
              </div>
              <Code size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#1e40af' }}>Live Industry Projects</h3>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Work on real client projects during training. Build a portfolio that impresses employers. 
                <strong> 5+ portfolio projects included in the course.</strong>
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
                INTERNSHIP
              </div>
              <Users size={48} style={{ color: '#ec4899', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem', color: '#9f1239' }}>Paid Internship Opportunities</h3>
              <p style={{ color: '#831843', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Get placed in paid internships with our partner companies. Gain real-world experience while earning. 
                <strong> 80% of interns get full-time offers.</strong>
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What You'll Master in Our Training</h2>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  color: 'var(--accent-primary)'
                }}>
                  <Code size={24} />
                  Core Java & Advanced
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                  <li>Object-Oriented Programming</li>
                  <li>Collections & Generics</li>
                  <li>Multithreading & Concurrency</li>
                  <li>Exception Handling</li>
                  <li>Java 8+ Features</li>
                </ul>
              </div>
              <div>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  color: 'var(--accent-primary)'
                }}>
                  <Rocket size={24} />
                  Web Development
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                  <li>Servlets & JSP</li>
                  <li>Spring Framework</li>
                  <li>Spring Boot & REST APIs</li>
                  <li>Microservices Architecture</li>
                  <li>Cloud Deployment</li>
                </ul>
              </div>
              <div>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  color: 'var(--accent-primary)'
                }}>
                  <Award size={24} />
                  Database & Tools
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                  <li>MySQL Database</li>
                  <li>JDBC & Hibernate ORM</li>
                  <li>Git & GitHub</li>
                  <li>Maven Build Tool</li>
                  <li>Docker & CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '2rem' }}>
              Join Our Success Stories
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem',
              marginTop: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>500+</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Students Trained</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>85%</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Placement Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>200+</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Companies Connected</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>4.8★</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Student Rating</div>
              </div>
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
                Register for Training Program
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
                  Registration Successful!
                </h3>
                <p style={{ color: '#166534', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  Thank you for registering! Our team will contact you within 24 hours to discuss your training program.
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
                      <strong>Course Interest *</strong>
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="">Select a course</option>
                      <option value="java-fullstack">Java Full Stack Development</option>
                      <option value="core-java">Core Java</option>
                      <option value="spring-boot">Spring Boot</option>
                      <option value="internship">Internship Program</option>
                      <option value="placement">Placement Assistance Only</option>
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
                  style={{ 
                    width: '100%',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Rocket size={24} />
                  Register Now - Get Free Consultation
                </button>

                <p style={{ 
                  textAlign: 'center', 
                  marginTop: '1rem', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  By registering, you agree to receive communication from LearnStackHub about training programs and opportunities.
                </p>
              </form>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Complete Training Program Details</h2>
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={24} style={{ color: 'var(--accent-primary)' }} />
                Program Duration & Schedule
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                    Duration
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    3-6 months intensive training program
                  </p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                    Schedule
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    Flexible: Weekday/Weekend batches available
                  </p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                    Mode
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    Online, Offline, or Hybrid options
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
                <Gift size={24} style={{ color: 'var(--accent-primary)' }} />
                What's Included in the Program
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Live Training Sessions</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Interactive live classes with industry experts
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>5+ Real Projects</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Build portfolio with industry-standard projects
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Placement Support</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Resume building, mock interviews, job referrals
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Certification</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Industry-recognized certificate upon completion
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Lifetime Access</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Access to all course materials and updates
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--accent-success)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Mentorship</strong>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      1-on-1 mentorship sessions with industry experts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Placement Process</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            We guide you through every step of your job search journey:
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <div style={{
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Resume & Portfolio Building</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Our experts help you create a standout resume and portfolio that highlights your skills and projects effectively.
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <div style={{
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Interview Preparation</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Mock interviews, technical round preparation, coding practice, and HR interview guidance. We prepare you for every stage.
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <div style={{
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Job Referrals & Connections</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Direct referrals to our partner companies. We connect you with hiring managers and help you navigate the application process.
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <div style={{
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 'bold'
              }}>
                4
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Ongoing Support</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Even after placement, we continue to support your career growth with mentorship and skill updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What Our Students Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic', lineHeight: '1.8' }}>
                "The training program was comprehensive and practical. I got placed in a top MNC within 2 months of completing 
                the course. The placement team was incredibly supportive throughout the process."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  R
                </div>
                <div>
                  <strong style={{ display: 'block' }}>Rajesh Kumar</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Software Developer at TCS</span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic', lineHeight: '1.8' }}>
                "The live projects helped me build a strong portfolio. The instructors were patient and always available for 
                doubts. I'm now working as a Full Stack Developer at a startup."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  P
                </div>
                <div>
                  <strong style={{ display: 'block' }}>Priya Sharma</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Stack Developer</span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic', lineHeight: '1.8' }}>
                "The internship opportunity I got through LearnStackHub was a game-changer. I learned so much and got a 
                full-time offer from the same company. Highly recommended!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  A
                </div>
                <div>
                  <strong style={{ display: 'block' }}>Amit Patel</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Backend Developer at Infosys</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '2px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2.5rem', fontWeight: '800' }}>
                Don't Wait - Start Your Career Today!
              </h2>
              <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.95, maxWidth: '700px', margin: '0 auto 2rem' }}>
                Limited seats available for the next batch. Register now and get a <strong>free career consultation</strong> 
                worth ₹2,000. Our placement team is ready to help you land your dream job.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
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
                    padding: '1.25rem 3rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Rocket size={24} />
                  Register Now - Free Consultation
                </a>
                <a 
                  href="mailto:careers@learnstackhub.com" 
                  className="btn"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '1.25rem 2.5rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    border: '2px solid white'
                  }}
                >
                  <Mail size={22} />
                  Email Us
                </a>
              </div>
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '1rem',
                opacity: 0.9
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={20} />
                  <span>100% Placement Support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={20} />
                  <span>24/7 Support Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} />
                  <span>Career Growth Guaranteed</span>
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
                <h4 style={{ marginBottom: '0.5rem' }}>Email Us</h4>
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
