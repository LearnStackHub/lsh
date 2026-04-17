import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen, Code, Play, ArrowRight, Clock, FileText, Rocket, Target,
  FileCode, Palette, Database, Server, Layers, Box, Globe, GitBranch, Package, CheckCircle,
  ClipboardList, Cloud, MessageSquare, Video
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Home() {
  const [courseStructure, setCourseStructure] = useState(null);
  const [totalTopics, setTotalTopics] = useState(0);
  const [trackCount, setTrackCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      import('../data').then((module) => {
        setCourseStructure(module.courseStructure);
        setTotalTopics(module.getAllTopics().length);
        setTrackCount(Object.keys(module.courseStructure).length);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 600 });
    } else {
      setTimeout(loadData, 250);
    }
  }, []);

  const courseDescriptions = {
    sdlc: 'Software development lifecycle models, phases, and how teams ship quality software.',
    html: 'Semantic structure, forms, media, accessibility, and modern HTML5 patterns.',
    css: 'Selectors, layout with Flexbox and Grid, responsive design, and animations.',
    corejava: 'Variables through multithreading: OOP, collections, exceptions, and interview depth.',
    mysql: 'Relational modeling, SQL, joins, indexes, transactions, and database design.',
    jdbc: 'Java database connectivity, prepared statements, and transaction control.',
    servlets: 'Request lifecycle, sessions, filters, listeners, and servlet architecture.',
    jsp: 'Dynamic pages with JSP, EL, JSTL, and MVC-style web patterns.',
    hibernate: 'ORM mapping, relationships, HQL, caching, and persistence best practices.',
    git: 'Version control, branching, pull requests, and team workflows with GitHub.',
    maven: 'Build lifecycle, dependencies, plugins, and multi-module Java projects.',
    spring: 'IoC, beans, AOP, JDBC templates, and the Spring Framework ecosystem.',
    springboot: 'Auto-configuration, starters, REST APIs, data access, and production-ready apps.',
    springcloud: 'Microservices patterns, discovery, config, resilience, and distributed systems.',
    http: 'Methods, status codes, headers, REST principles, and how the web really works.'
  };

  const courseIcons = {
    sdlc: ClipboardList,
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
    springcloud: Cloud,
    http: Globe,
    git: GitBranch,
    maven: Package
  };

  const starterGuides = [
    { id: 'java-introduction', title: 'Java Introduction', time: '2h', level: 'Beginner' },
    { id: 'jdbc-introduction', title: 'JDBC Introduction', time: '3h', level: 'Beginner' },
    { id: 'mysql-introduction', title: 'MySQL Introduction', time: '3h', level: 'Beginner' },
    { id: 'spring-introduction', title: 'Spring Introduction', time: '3h', level: 'Intermediate' },
    { id: 'spring-boot-introduction', title: 'Spring Boot Introduction', time: '3h', level: 'Intermediate' },
    { id: 'http-introduction', title: 'HTTP Introduction', time: '2h', level: 'Beginner' }
  ];

  return (
    <div className="home-page landing-page">
      <SEOHead />
      <StructuredData type="WebSite" />

      <section className="landing-hero">
        <span className="landing-chip">Free learning platform</span>
        <h1>Learn Java Full Stack Development with Clarity and Depth</h1>
        <p>
          <strong>LearnStackHub is free to use</strong>—study with structured tutorials, a browser code runner, topic-wise
          MCQs, and a Practice Lab for AI chat and interview-style practice. Built for real interviews and project-ready
          skills, with no paywall.
        </p>
        <div className="landing-actions">
          <Link to="/tutorial/java-introduction" className="btn btn-primary">
            <Play size={18} />
            Start with Java
          </Link>
          <a href="#courses" className="btn btn-secondary">
            <BookOpen size={18} />
            Explore All Tracks
          </a>
        </div>
        <div className="landing-stats">
          <div><strong>{totalTopics}+</strong><span>Tutorials</span></div>
          <div><strong>{trackCount || '—'}</strong><span>Tracks</span></div>
          <div><strong>150+</strong><span>Examples</span></div>
          <div><strong>100% free</strong><span>Platform</span></div>
        </div>
      </section>

      <section className="landing-quality">
        <article><CheckCircle size={16} /> Structured beginner-to-advanced progression</article>
        <article><CheckCircle size={16} /> Concept + runnable code + practical context</article>
        <article><CheckCircle size={16} /> Topic-wise MCQs and interview-style revision</article>
        <article><CheckCircle size={16} /> Practice Lab: AI tutor chat &amp; audio/video interview coach</article>
      </section>

      <section className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">What is LearnStackHub?</h2>
        </div>
        <p className="home-section-subtitle" style={{ marginTop: '-0.35rem' }}>
          LearnStackHub is a 100% free learning platform for Java and backend preparation.
          You get structured tutorials, AI chat interview practice, and mock interview rehearsal in one place.
          No subscription, no paywall, and no hidden course fee.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <article className="landing-guide-card" style={{ cursor: 'default' }}>
            <h3>What you will learn</h3>
            <p>From basics to advanced</p>
            <span>Core Java, SQL, JDBC, Spring, HTTP, Git, and more interview-ready backend topics.</span>
          </article>
          <article className="landing-guide-card" style={{ cursor: 'default' }}>
            <h3>Why this site is useful</h3>
            <p>Learn + practice together</p>
            <span>Read tutorials, run code, take MCQs, then sharpen answers with AI chat and mock interviews.</span>
          </article>
          <article className="landing-guide-card" style={{ cursor: 'default' }}>
            <h3>What we offer</h3>
            <p>100% free platform</p>
            <span>Free tutorials, free AI chat, and free mock interview practice with audio/video rehearsal.</span>
          </article>
        </div>
      </section>

      <section className="courses-section landing-practice-lab">
        <div className="section-header">
          <h2 className="section-title-main">Practice Lab</h2>
          <p className="home-section-subtitle">
            Go beyond reading: ask interview-style questions in chat and rehearse answers with camera, mic, and optional
            recording—all in your browser.
          </p>
        </div>
        <div className="landing-guides landing-practice-lab-cards">
          <Link to="/ai-lab/chat" className="landing-guide-card">
            <h3><MessageSquare size={20} style={{ verticalAlign: 'middle', marginRight: '0.35rem' }} /> Chat practice</h3>
            <p>AI tutor</p>
            <span>Java &amp; backend Q&amp;A</span>
            <em>Open chat <ArrowRight size={14} /></em>
          </Link>
          <Link to="/ai-lab/interview" className="landing-guide-card">
            <h3><Video size={20} style={{ verticalAlign: 'middle', marginRight: '0.35rem' }} /> Interview practice</h3>
            <p>Audio &amp; video</p>
            <span>Questions &amp; guided coaching</span>
            <em>Start session <ArrowRight size={14} /></em>
          </Link>
        </div>
      </section>

      <section className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">Start Here</h2>
          <p className="home-section-subtitle">Recommended tutorials to build a strong base quickly.</p>
        </div>
        <div className="landing-guides">
          {starterGuides.map((guide) => (
            <Link key={guide.id} to={`/tutorial/${guide.id}`} className="landing-guide-card">
              <h3>{guide.title}</h3>
              <p>{guide.level}</p>
              <span><Clock size={14} /> {guide.time}</span>
              <em>Open guide <ArrowRight size={14} /></em>
            </Link>
          ))}
        </div>
      </section>

      <section id="courses" className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">Learning Tracks</h2>
          <p className="home-section-subtitle">Choose a track and follow the complete sequence topic by topic.</p>
        </div>
        <div className="courses-grid">
          {courseStructure ? Object.entries(courseStructure).map(([courseKey, course]) => {
            const topicCount = Object.values(course.sections).reduce((acc, section) => acc + section.topics.length, 0);
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            const IconComponent = courseIcons[courseKey] || Code;
            return (
              <Link
                key={courseKey}
                to={firstTopic ? `/tutorial/${firstTopic.id}` : '/'}
                className="course-card"
                data-course={courseKey}
                style={{ '--card-accent': course.color }}
              >
                <div className="course-icon"><IconComponent size={30} /></div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{courseDescriptions[courseKey] || 'Comprehensive structured tutorials for this track.'}</p>
                <div className="course-meta">
                  <span><FileText size={16} /> {topicCount} Topics</span>
                  <span><Target size={16} /> Guided Path</span>
                </div>
              </Link>
            );
          }) : null}
        </div>
      </section>

      <section className="landing-editorial">
        <h2>What you get on LearnStackHub</h2>
        <p>
          Deep-dive tutorials from SDLC, HTML/CSS, and Core Java through JDBC, web stacks, Hibernate, Spring, Spring Boot,
          HTTP, Maven, Git, and cloud-style microservices topics—each with examples you can relate to interviews and real
          projects. <strong>Everything here is free</strong>—no sign-up fee or paywall for the core experience.
        </p>
        <ul>
          <li>Clear scope per topic, with diagrams and showcases where they help</li>
          <li>Runnable Java in the browser (where the lesson supports it) and copy-paste-friendly snippets</li>
          <li>MCQ pages on major tracks for quick self-checks</li>
          <li>Practice Lab for conversational prep and spoken interview practice</li>
        </ul>
      </section>

      <section className="landing-cta">
        <h2>Build Consistent Progress Every Week</h2>
        <p>
          Start with fundamentals and move step by step to Spring Boot and production-grade backend development—on a{' '}
          <strong>free platform</strong> built for learners.
        </p>
        <Link to="/tutorial/java-introduction" className="btn btn-primary">
          <Play size={20} />
          Begin Learning
        </Link>
      </section>
    </div>
  );
}

export default Home;
