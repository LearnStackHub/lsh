import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Target, Users, BookOpen, Code, Heart, Award, MessageSquare, Video, ClipboardCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="About Us - LearnStackHub" 
        description="LearnStackHub is a free platform: Java full-stack tutorials, browser code practice, MCQs, Practice Lab (AI chat & interview prep), and tracks from SDLC to Spring Boot—no paywall."
      />
      <StructuredData type="Organization" />
      <h1 className="tutorial-title">About LearnStackHub</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        <strong style={{ color: 'var(--text-primary)' }}>A free platform</strong> — tutorials, hands-on code, MCQs, and a
        Practice Lab, from SDLC and web basics through Spring Boot and modern backend skills. No subscription required.
      </p>

      <div className="tutorial-content">
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.9', margin: 0, fontWeight: '500' }}>
              To democratize Java full-stack education by providing comprehensive, high-quality, and completely free learning 
              resources that empower individuals from all backgrounds to master enterprise-grade software development. We are 
              committed to making professional-level Java education accessible to everyone, regardless of their financial 
              situation or prior experience.
            </p>
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>Our Core Values</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Accessibility</strong>
                  <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>Free education for everyone, forever</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Quality</strong>
                  <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>Enterprise-grade content and examples</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Practicality</strong>
                  <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>Real-world, hands-on learning</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Community</strong>
                  <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>Built by developers, for developers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What is LearnStackHub?</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            LearnStackHub is a <strong>free</strong>, interactive learning platform for Java and backend careers. You get
            structured tutorials across multiple tracks, a browser-based code runner for Java where lessons support it,
            topic-wise MCQs for revision, and a <strong>Practice Lab</strong> with an AI tutor chat (interview topics)
            plus an audio and video interview mode with guided coaching hints—so you can read, run, and rehearse in one
            place at no cost.
          </p>
          <div style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent-primary)',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Our Story</h3>
            <p style={{ marginBottom: '1rem' }}>
              LearnStackHub was founded with a simple yet powerful vision: to break down barriers in technology education. 
              We recognized that quality Java full-stack education was often locked behind expensive courses or scattered 
              across multiple sources, making it difficult for aspiring developers to build comprehensive skills.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Our platform was built by developers who understand the challenges of learning enterprise Java development. 
              We've experienced the frustration of incomplete tutorials, outdated examples, and courses that don't prepare 
              you for real-world projects. LearnStackHub is our solution to these problems.
            </p>
            <p style={{ margin: 0 }}>
              Today, LearnStackHub continues to grow its curriculum with new topics and clearer paths—always with the
              goal of keeping professional-grade Java and backend education free and accessible.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What We Offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <BookOpen size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Structured learning tracks</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Organized paths from SDLC, HTML/CSS, and Core Java through JDBC, web stacks, Hibernate, Spring, Spring Boot,
                HTTP, Maven, Git, and microservices-style topics
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Code size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Runnable Java &amp; examples</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                In-browser code execution where the lesson supports it, plus copy-paste-friendly snippets and diagrams on
                many topics
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <ClipboardCheck size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>MCQs &amp; interview depth</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Topic-wise multiple-choice quizzes on major tracks and interview-oriented explanations alongside core
                lessons
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <MessageSquare size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Practice Lab — chat</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Ask Java and backend interview-style questions and get AI-generated answers formatted for learning
                (verify important details for your own interviews)
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Video size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Practice Lab — interview</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Audio and video practice with your camera and microphone, optional recording, and guided coaching hints—no
                substitute for real interviews, but a safe place to rehearse
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Heart size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Free platform—always</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Tutorials, MCQs, code practice, and Practice Lab tools are free to use: no paywall, no subscription, no
                course fee—our mission is open access to quality learning
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem 1.1rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
            }}
          >
            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem' }}>Practice Lab highlights</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6 }}>
              <li>
                <strong>AI chat interview practice:</strong> ask backend and Java interview questions, get structured
                answers, and revise quickly before interviews.
              </li>
              <li>
                <strong>Audio/video interview practice:</strong> answer questions using camera + mic, rehearse delivery,
                and review your speaking flow.
              </li>
            </ul>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem' }}>
              Open directly: <Link to="/ai-lab/chat">AI chat practice</Link> and{' '}
              <Link to="/ai-lab/interview">Audio/video interview practice</Link>.
            </p>
          </div>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link to="/ai-lab" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Go to Practice Lab
            </Link>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Learning Path</h2>
          <p>
            LearnStackHub offers a comprehensive and ever-expanding curriculum designed to build your skills progressively. 
            Our learning path covers everything from the fundamentals to advanced topics, with new tutorials being added regularly 
            to keep up with industry trends and technologies.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Tracks and topics currently include:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>SDLC:</strong> Software development lifecycle concepts and how teams deliver software
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>HTML &amp; CSS:</strong> Structure, layout, responsive design, and modern front-end foundations
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Core Java:</strong> Syntax through collections, exceptions, multithreading, and interview-focused material
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>MySQL:</strong> SQL, modeling, joins, indexes, transactions, and database skills for backends
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>JDBC:</strong> Connecting Java applications to databases with solid patterns
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Servlets &amp; JSP:</strong> Java web foundations—requests, sessions, and server-rendered pages
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Hibernate:</strong> ORM, mappings, and persistence for enterprise-style apps
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Git &amp; Maven:</strong> Version control and builds the way teams use them day to day
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Spring &amp; Spring Boot:</strong> Core framework concepts through production-style REST and data access
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>HTTP:</strong> How APIs and the web stack behave—methods, status codes, and REST thinking
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Spring Cloud / microservices:</strong> Distributed-system topics aligned with modern backend interviews
            </li>
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            We keep expanding and refining topics—follow the tracks on the home page for the latest sequence.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Why Choose LearnStackHub?</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} />
                Clear Learning Path
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Structured curriculum that takes you from beginner to advanced, with each concept building on the previous one.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={20} />
                Hands-On Practice
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Tutorials include runnable examples where supported, plus the Practice Lab for chat and spoken interview
                rehearsal when you want to go beyond reading.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                Community Driven
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Contribute tutorials, suggest improvements, and help others learn. We're building this together!
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} />
                Industry-Relevant
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Learn skills that are in demand. Our tutorials focus on real-world applications and best practices.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Commitment</h2>
          <p>
            At LearnStackHub, we're committed to:
          </p>
          <ul>
            <li>Providing high-quality, accurate, and up-to-date content</li>
            <li>Keeping education free and accessible to everyone</li>
            <li>Continuously improving based on user feedback</li>
            <li>Maintaining a supportive learning community</li>
            <li>Respecting user privacy and data security</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Get Involved</h2>
          <p>
            LearnStackHub is a community-driven platform. You can contribute by:
          </p>
          <ul>
            <li>Adding new tutorials or improving existing ones</li>
            <li>Reporting errors or suggesting improvements</li>
            <li>Sharing LearnStackHub with others who want to learn</li>
            <li>Providing feedback to help us improve</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Get in Touch
            </Link>
          </p>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            For career opportunities, email us at:{' '}
            <a href="mailto:careers@learnstackhub.com" style={{ color: 'var(--accent-primary)' }}>
              careers@learnstackhub.com
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Thank You</h2>
          <p>
            Thank you for choosing LearnStackHub for your Java learning journey. We're excited to be part of your 
            development as a programmer. Whether you're building your first "Hello World" or deploying to the cloud, 
            we're here to help you succeed.
          </p>
          <p style={{ marginTop: '1rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
            Happy Learning! ☁️
          </p>
        </section>

        <section style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '2px solid var(--border-color)'
        }}>
          <h2>About the Author</h2>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '600', 
                color: 'var(--accent-primary)',
                marginBottom: '0.5rem'
              }}>
                Dattakumar Pandi
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.1rem',
                margin: 0
              }}>
                Software Developer & Founder of LearnStackHub
              </p>
            </div>
            
            <div style={{ 
              lineHeight: '1.8',
              fontSize: '1.05rem',
              color: 'var(--text-primary)'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Dattakumar Pandi is a software developer and the founder of LearnStackHub, an online learning platform 
                focused on modern backend development and real-world programming skills.
              </p>
              
              <p style={{ marginBottom: '1.5rem' }}>
                With hands-on experience in technologies such as Java, Spring Boot, REST APIs, Microservices, and System 
                Design, he is passionate about simplifying complex technical concepts and helping students transition from 
                theoretical learning to practical software development.
              </p>
              
              <p style={{ marginBottom: '1.5rem' }}>
                Through LearnStackHub, Dattakumar creates in-depth tutorials, technical guides, and structured learning 
                resources covering topics like HTTP, APIs, backend architecture, database design, and scalable system 
                development.
              </p>
              
              <p style={{ 
                margin: 0,
                padding: '1.5rem',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                borderLeft: '4px solid var(--accent-primary)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)'
              }}>
                His mission is to help aspiring developers, students, and early-career engineers build strong technical 
                foundations and gain the practical knowledge needed to succeed in the software industry.
              </p>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Created with ❤️ by
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              Dattakumar Pandi
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

export default About;

