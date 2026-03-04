import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GraduationCap, Briefcase, Users, Target, CheckCircle, Mail, ArrowRight, Code, Rocket, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="Careers - Training, Placements & Internships | LearnStackHub" 
        description="Join LearnStackHub for professional training, job placements, and internships. Build your career in Java Full Stack Development with industry experts."
      />
      <StructuredData type="Organization" />
      <h1 className="tutorial-title">Careers at LearnStackHub</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Training, Placements & Internships - Your Gateway to a Successful Tech Career
      </p>

      <div className="tutorial-content">
        {/* Hero Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>Build Your Tech Career with Us</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.9', margin: 0, fontWeight: '500' }}>
              At LearnStackHub, we don't just teach - we transform careers. Our comprehensive training programs, 
              placement assistance, and internship opportunities are designed to launch you into the tech industry 
              with confidence and real-world skills.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>What We Offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <GraduationCap size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem' }}>Professional Training</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Comprehensive Java Full Stack training with hands-on projects, live sessions, and industry-relevant curriculum 
                designed by experienced professionals.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <Briefcase size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem' }}>Job Placements</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Direct placement assistance with top companies. We connect you with hiring managers and help you land 
                your dream job in the tech industry.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <Users size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.75rem' }}>Internships</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                Real-world internship opportunities with industry partners. Gain practical experience, build your portfolio, 
                and kickstart your professional journey.
              </p>
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Training Programs</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Our training programs are designed to take you from beginner to job-ready professional. We cover everything 
            you need to succeed in the Java Full Stack development industry.
          </p>
          
          <div style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent-primary)',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>What You'll Learn</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code size={18} />
                  Core Java & Advanced Concepts
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                  <li>Object-Oriented Programming</li>
                  <li>Collections Framework</li>
                  <li>Multithreading & Concurrency</li>
                  <li>Exception Handling</li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Rocket size={18} />
                  Web Development
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                  <li>Servlets & JSP</li>
                  <li>Spring Framework</li>
                  <li>Spring Boot</li>
                  <li>RESTful APIs</li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} />
                  Database & Tools
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                  <li>MySQL Database</li>
                  <li>JDBC & Hibernate</li>
                  <li>Git & GitHub</li>
                  <li>Maven Build Tool</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Assistance */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Placement Assistance</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Our placement team works tirelessly to connect you with the right opportunities. We provide end-to-end 
            support throughout your job search journey.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} />
                Resume Building & Optimization
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Get expert help crafting a professional resume that stands out to recruiters. We'll help you highlight 
                your skills and projects effectively.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={20} />
                Interview Preparation
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Mock interviews, technical round preparation, and HR interview guidance. We prepare you for every stage 
                of the hiring process.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={20} />
                Company Connections
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Direct access to our network of partner companies. We connect you with hiring managers and help you 
                navigate the application process.
              </p>
            </div>
          </div>
        </section>

        {/* Internship Program */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Internship Opportunities</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Our internship program provides real-world experience working on live projects. Gain practical skills, 
            build your portfolio, and make industry connections.
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderLeft: '5px solid var(--accent-primary)',
            padding: '2rem',
            borderRadius: '12px',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Internship Benefits</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Real Projects</strong>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Work on actual client projects and build your portfolio
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Mentorship</strong>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Learn from experienced developers and industry experts
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Certification</strong>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Receive industry-recognized certificates upon completion
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Job Opportunities</strong>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  High chance of full-time placement after successful internship
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Why Choose LearnStackHub for Your Career?</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Industry-Experienced Instructors</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Learn from professionals who have worked in top tech companies and understand what employers are looking for.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Hands-On Project Experience</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Build real-world projects that you can showcase to employers. Our curriculum includes multiple portfolio-worthy projects.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>100% Placement Support</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                We don't stop at training. Our placement team works with you until you land your dream job.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Flexible Learning Options</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Choose from online, offline, or hybrid learning modes that fit your schedule and learning style.
              </p>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>How to Apply</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Ready to start your tech career journey? Here's how you can get started:
          </p>
          
          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
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
                <h3 style={{ marginBottom: '0.5rem' }}>Send Your Inquiry</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Email us at <a href="mailto:careers@learnstackhub.com" style={{ color: 'var(--accent-primary)' }}>careers@learnstackhub.com</a> with your interest 
                  in training, placement, or internship programs.
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
                <h3 style={{ marginBottom: '0.5rem' }}>Schedule a Consultation</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Our team will reach out to understand your goals, background, and help you choose the right program 
                  for your career path.
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
                <h3 style={{ marginBottom: '0.5rem' }}>Begin Your Journey</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  Once enrolled, you'll start your training with access to all resources, live sessions, and ongoing 
                  support from our team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '2px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: 'white'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Transform Your Career?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95 }}>
              Join hundreds of successful developers who started their journey with LearnStackHub
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="mailto:careers@learnstackhub.com" 
                className="btn btn-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'white',
                  color: '#667eea',
                  textDecoration: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                <Mail size={20} />
                Email Us Now
              </a>
              <Link 
                to="/contact" 
                className="btn"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  border: '2px solid white'
                }}
              >
                <ArrowRight size={20} />
                Contact Form
              </Link>
            </div>
            <p style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.9 }}>
              <strong>Email:</strong>{' '}
              <a href="mailto:careers@learnstackhub.com" style={{ color: 'white', textDecoration: 'underline' }}>
                careers@learnstackhub.com
              </a>
            </p>
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

