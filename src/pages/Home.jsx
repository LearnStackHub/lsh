import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen, Code, Play, ArrowRight, Clock, FileText, Rocket, Target,
  FileCode, Palette, Database, Server, Layers, Box, Globe, GitBranch, Package, CheckCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Home() {
  const [courseStructure, setCourseStructure] = useState(null);
  const [totalTopics, setTotalTopics] = useState(0);

  useEffect(() => {
    const loadData = () => {
      import('../data').then((module) => {
        setCourseStructure(module.courseStructure);
        setTotalTopics(module.getAllTopics().length);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 600 });
    } else {
      setTimeout(loadData, 250);
    }
  }, []);

  const courseDescriptions = {
    corejava: 'Master variables, OOP, collections, exception handling, and multithreading.',
    mysql: 'Learn relational data modeling, SQL querying, joins, optimization, and transactions.',
    jdbc: 'Build robust Java-to-database connectivity with prepared statements and transaction control.',
    servlets: 'Understand request lifecycle, session management, filters, and web integration.',
    jsp: 'Create dynamic server-rendered pages with JSP tags, EL, and JSTL.',
    hibernate: 'Learn ORM mapping, relationships, HQL, caching, and enterprise persistence patterns.',
    git: 'Use Git and GitHub workflows for professional team collaboration.',
    maven: 'Automate Java builds, dependencies, plugins, and multi-module project structure.'
  };

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
        <span className="landing-chip">LearnStackHub Professional Learning Path</span>
        <h1>Learn Java Full Stack Development with Clarity and Depth</h1>
        <p>
          Study with structured tutorials, practical code examples, and topic-wise learning tracks designed for real interview and project outcomes.
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
          <div><strong>13</strong><span>Tracks</span></div>
          <div><strong>150+</strong><span>Examples</span></div>
          <div><strong>Free</strong><span>Learning</span></div>
        </div>
      </section>

      <section className="landing-quality">
        <article><CheckCircle size={16} /> Structured beginner-to-advanced progression</article>
        <article><CheckCircle size={16} /> Concept + code + practical context</article>
        <article><CheckCircle size={16} /> Interview-oriented revision and MCQs</article>
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
        <h2>Editorial Standards and Content Quality</h2>
        <p>
          Every tutorial is written for clarity, checked for technical correctness, and organized to reduce confusion for learners.
          We focus on practical implementation, not just definitions.
        </p>
        <ul>
          <li>Clear objective and topic scope</li>
          <li>Code examples with explanation</li>
          <li>Concept-first and real-world context</li>
          <li>Internal linking for continuous learning</li>
        </ul>
      </section>

      <section className="landing-cta">
        <h2>Build Consistent Progress Every Week</h2>
        <p>Start with fundamentals and move step by step to Spring Boot and production-grade backend development.</p>
        <Link to="/tutorial/java-introduction" className="btn btn-primary">
          <Play size={20} />
          Begin Learning
        </Link>
      </section>
    </div>
  );
}

export default Home;
