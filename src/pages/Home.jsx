import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  BookOpen, Code, Play, Zap, ArrowRight, Clock, FileText, Users, Award, Rocket, Target, CheckCircle,
  FileCode, Palette, Database, Server, Layers, Box, Globe, GitBranch, Package,
  MessageSquare, Building2, Gamepad2, BarChart3, HelpCircle, Gift
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Home() {
  const [courseStructure, setCourseStructure] = useState(null);
  const [totalTopics, setTotalTopics] = useState(0);

  // Lazy load data after initial render - delay to reduce TBT
  useEffect(() => {
    const loadData = () => {
      import('../data').then((module) => {
        setCourseStructure(module.courseStructure);
        const allTopics = module.getAllTopics();
        setTotalTopics(allTopics.length);
      });
    };
    
    // Detect mobile and use longer delay to reduce TBT
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const delay = isMobile ? 800 : 500;
    
    // Delay data loading to reduce TBT - load after critical render
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: delay });
    } else {
      setTimeout(loadData, isMobile ? 400 : 200);
    }
  }, []);
  const features = [
    {
      icon: <BookOpen size={28} />,
      title: 'Step-by-Step Tutorials',
      description: 'Clear, beginner-friendly explanations that make complex concepts easy to understand'
    },
    {
      icon: <Code size={28} />,
      title: 'Real-World Examples',
      description: 'Learn with practical code examples from actual industry projects'
    },
    {
      icon: <Play size={28} />,
      title: 'Try It Yourself',
      description: 'Write and run Java code directly in your browser - no setup needed!'
    },
    {
      icon: <Rocket size={28} />,
      title: 'Full Stack Path',
      description: 'Complete journey from Core Java to Spring Boot and beyond'
    }
  ];


  const courseDescriptions = {
    corejava: 'Master the fundamentals - variables, OOP, collections, multithreading & more',
    mysql: 'Learn MySQL database - DDL, DML, DQL, joins, stored procedures, triggers & more',
    jdbc: 'Connect Java applications to databases with JDBC and MySQL',
    servlets: 'Build dynamic web applications with Java Servlets',
    jsp: 'Create powerful server-side web pages with JSP',
    hibernate: 'Master Hibernate ORM - mapping, relationships, caching, batch processing & more',
    git: 'Learn Git version control and GitHub collaboration - branches, commits, pull requests & workflows',
    maven: 'Master Maven build automation - dependencies, plugins, multi-module projects, Spring Boot integration & more'
  };

  // Map course keys to lucide-react icons (same as Layout.jsx)
  const courseIcons = {
    html: FileCode,
    css: Palette,
    corejava: Code,
    mysql: Database,
    jdbc: Server,
    servlets: Server,
    jsp: FileText,
    hibernate: Layers,
    spring: Box,
    springboot: Rocket,
    http: Globe,
    git: GitBranch,
    maven: Package
  };

  return (
    <div className="home-page">
      <SEOHead />
      <StructuredData type="WebSite" />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Zap size={16} />
          <span>Free Java Full Stack Course</span>
        </div>
        
        <h1 className="hero-title">
          Learn <span className="highlight">Java</span> Full Stack Development
          <br />Free Java Tutorials & Courses
        </h1>
        
        <p className="hero-subtitle">
          Master Java Full Stack Development with free interactive tutorials. Learn Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, React, and AWS step-by-step. Perfect for beginners and advanced developers. Start learning Java programming today!
        </p>
        
        <div className="hero-buttons">
          <Link to="/tutorial/java-introduction" className="btn btn-primary">
            <Play size={20} />
            Start Learning Free
          </Link>
          <a href="#courses" className="btn btn-secondary">
            <BookOpen size={20} />
            Explore Courses
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { value: `${totalTopics}+`, label: 'Tutorials', icon: BookOpen },
            { value: '150+', label: 'Code Examples', icon: Code },
            { value: '13', label: 'Courses', icon: Target },
            { value: '100%', label: 'Free', icon: Gift }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '2.25rem',
                  fontWeight: '800',
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  <IconComponent size={32} />
                  <span>{stat.value}</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontWeight: '600' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Guides Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'var(--bg-primary)',
        marginBottom: '3rem'
      }}>
        <div className="section-header">
          <h2 className="section-title-main" style={{ marginBottom: '0.5rem' }}>Start Here - Featured Guides</h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            New to Java? Start with these comprehensive guides designed for beginners. Each guide includes real-world examples, 
            code explanations, and hands-on practice.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              id: 'java-introduction',
              title: 'Java Introduction',
              description: 'Master the fundamentals of Java programming. Learn variables, data types, OOP concepts, and build your first Java application.',
              icon: Code,
              level: 'Beginner',
              time: '2 hours',
              topics: 'Variables, OOP, Collections'
            },
            {
              id: 'spring-boot-introduction',
              title: 'Spring Boot Introduction',
              description: 'Build production-ready Java applications with Spring Boot. Learn auto-configuration, REST APIs, and enterprise patterns.',
              icon: Rocket,
              level: 'Intermediate',
              time: '3 hours',
              topics: 'REST APIs, JPA, Security'
            },
            {
              id: 'mysql-introduction',
              title: 'MySQL Database Guide',
              description: 'Complete MySQL tutorial covering database design, SQL queries, joins, stored procedures, and optimization techniques.',
              icon: Database,
              level: 'Beginner',
              time: '4 hours',
              topics: 'SQL, Joins, Stored Procedures'
            },
            {
              id: 'jdbc-introduction',
              title: 'JDBC Complete Guide',
              description: 'Connect Java applications to databases using JDBC. Learn connection management, prepared statements, and transactions.',
              icon: Server,
              level: 'Intermediate',
              time: '3 hours',
              topics: 'Connections, Transactions, CRUD'
            },
            {
              id: 'sdlc-introduction',
              title: 'SDLC Complete Guide',
              description: 'Master Software Development Life Cycle. Learn requirement gathering, design, development, testing, and deployment phases.',
              icon: FileText,
              level: 'Beginner',
              time: '2 hours',
              topics: 'Requirements, Design, Testing'
            }
          ].map((guide, index) => {
            const IconComponent = guide.icon;
            return (
              <Link
                key={guide.id}
                to={`/tutorial/${guide.id}`}
                style={{
                  background: 'var(--bg-card)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: index === 0 ? '0 8px 24px rgba(102, 126, 234, 0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = index === 0 ? '0 8px 24px rgba(102, 126, 234, 0.15)' : '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                {index === 0 && (
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginBottom: '1rem',
                    width: 'fit-content'
                  }}>
                    ⭐ Recommended First
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    color: 'white'
                  }}>
                    <IconComponent size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: 0, 
                      marginBottom: '0.25rem',
                      fontSize: '1.3rem',
                      color: 'var(--text-primary)'
                    }}>
                      {guide.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <span style={{
                        background: 'var(--bg-tertiary)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px'
                      }}>
                        {guide.level}
                      </span>
                      <span>⏱️ {guide.time}</span>
                    </div>
                  </div>
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  marginBottom: '1rem',
                  flex: 1
                }}>
                  {guide.description}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-primary)',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  marginTop: 'auto'
                }}>
                  Start Learning
                  <ArrowRight size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start Cards */}
      <section id="courses" className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">Choose Your Learning Path</h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)', 
            fontSize: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explore our comprehensive curriculum organized by technology and skill level
          </p>
        </div>

        <div className="courses-grid">
          {courseStructure ? Object.entries(courseStructure).map(([courseKey, course]) => {
            const topicCount = Object.values(course.sections).reduce(
              (acc, section) => acc + section.topics.length, 0
            );
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            
            return (
              <Link 
                key={courseKey}
                to={firstTopic ? `/tutorial/${firstTopic.id}` : '/'}
                className="course-card"
                data-course={courseKey}
                style={{ '--card-accent': course.color }}
              >
                <div className="course-icon">
                  {(() => {
                    const IconComponent = courseIcons[courseKey] || Code;
                    return <IconComponent size={32} />;
                  })()}
                </div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">
                  {courseDescriptions[courseKey]}
                </p>
                <div className="course-meta">
                  <span>
                    <FileText size={16} />
                    {topicCount} Topics
                  </span>
                  <span>
                    <Clock size={16} />
                    {Math.ceil(topicCount * 15 / 60)} Hours
                  </span>
                </div>
              </Link>
              );
          }) : null}
        </div>
      </section>

      {/* Detailed Course Content */}
      <section className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">What You'll Learn</h2>
        </div>

        {courseStructure ? Object.entries(courseStructure).map(([courseKey, course]) => (
          <div key={courseKey} className="course-module">
            <div className="course-module-header">
              <span className="module-icon">
                {(() => {
                  const IconComponent = courseIcons[courseKey] || Code;
                  return <IconComponent size={24} />;
                })()}
              </span>
              <h3>{course.title}</h3>
            </div>
            
            <div className="sections-grid">
              {Object.entries(course.sections).map(([sectionKey, section]) => (
                <Link 
                  key={sectionKey}
                  to={`/tutorial/${section.topics[0].id}`}
                  className="section-card"
                >
                  <h4>{section.title}</h4>
                  <p>{section.topics.length} Topics</p>
                  <ul>
                    {section.topics.slice(0, 4).map(topic => (
                      <li key={topic.id}>{topic.title}</li>
                    ))}
                    {section.topics.length > 4 && (
                      <li className="more">+{section.topics.length - 4} more</li>
                    )}
                  </ul>
                </Link>
              ))}
            </div>
            </div>
          )) : null}
        </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title-main">Why Students Love Us</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card fade-in stagger-${index + 1}`}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '24px',
        marginBottom: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>
          What Makes Our Tutorials Different?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { icon: MessageSquare, title: 'Human-Friendly Writing', desc: 'No boring textbook language. We explain like a friend would!' },
            { icon: Building2, title: 'Real Project Examples', desc: 'See how concepts are used in actual E-Commerce & Banking apps' },
            { icon: Gamepad2, title: 'Interactive Code Editor', desc: 'Write, edit, and run Java code right in your browser' },
            { icon: BarChart3, title: 'Visual Diagrams', desc: 'Complex concepts explained with clear visual representations' },
            { icon: HelpCircle, title: 'Practice Questions', desc: 'Test your understanding with hands-on coding challenges' },
            { icon: Gift, title: 'Always Free', desc: 'Quality education should be accessible to everyone' }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ marginBottom: '0.75rem', color: 'var(--accent-primary)' }}>
                  <IconComponent size={32} />
                </div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'white', fontSize: '2rem' }}>
          Ready to Master Java Full Stack?
        </h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          marginBottom: '2rem', 
          maxWidth: '550px', 
          margin: '0 auto 2rem',
          fontSize: '1.1rem'
        }}>
          Join thousands of developers mastering Java from fundamentals to cloud deployment. 
          Start your LearnStackHub journey today - it's completely free!
        </p>
        <Link to="/tutorial/java-introduction" className="btn btn-primary" style={{
          background: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          fontSize: '1.1rem'
        }}>
          <Play size={22} />
          Start Learning Now
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Quick Links Section */}
      <section style={{
        padding: '2rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Quick Links</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Link to="/about" style={{
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            textAlign: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-primary)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            About Us
          </Link>
          <Link to="/contact" style={{
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            textAlign: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-primary)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            Contact
          </Link>
          <Link to="/privacy" style={{
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            textAlign: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-primary)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            Privacy Policy
          </Link>
          <Link to="/terms" style={{
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            textAlign: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-primary)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            Terms of Service
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
