import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  Code,
  Code2,
  Play,
  ArrowRight,
  Clock,
  FileText,
  Rocket,
  Target,
  FileCode,
  Palette,
  Database,
  Server,
  Layers,
  Box,
  Globe,
  GitBranch,
  Package,
  CheckCircle,
  ClipboardList,
  Cloud,
  MessageSquare,
  Video,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Crown,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { GENAIXIS, LEARNSTACKHUB, FOUNDER } from '../config/company';
import { BRAND } from '../config/brand';
import { getOrderedHomeTracks, HOME_DEFAULT_STATS } from '../config/homeTrackCatalog';
import { getTopicPath } from '../utils/topicRoutes';
import Java8Icon from '../components/icons/Java8Icon';
import MicroservicesIcon from '../components/icons/MicroservicesIcon';
import SpringAiIcon from '../components/icons/SpringAiIcon';
import logoImage from '../assets/LSH.png';

const VALUE_PROPS = [
  { icon: BookOpen, label: 'Structured tutorials', detail: 'Step-by-step Java full-stack paths' },
  { icon: BrainCircuit, label: 'Topic-wise MCQs', detail: 'Self-check after every major track' },
  { icon: Code2, label: 'Runnable examples', detail: 'Concepts with practical code context' },
  { icon: Sparkles, label: 'Practice Lab', detail: 'AI chat & interview rehearsal' },
];

const STARTER_GUIDES = [
  { id: 'java-introduction', title: 'Java Introduction', time: '2h', level: 'Beginner' },
  { id: 'jdbc-introduction', title: 'JDBC Introduction', time: '3h', level: 'Beginner' },
  { id: 'mysql-introduction', title: 'MySQL Introduction', time: '3h', level: 'Beginner' },
  { id: 'spring-introduction', title: 'Spring Introduction', time: '3h', level: 'Intermediate' },
  { id: 'spring-boot-introduction', title: 'Spring Boot Introduction', time: '3h', level: 'Intermediate' },
  { id: 'http-introduction', title: 'HTTP Introduction', time: '2h', level: 'Beginner' },
];

const COURSE_ICONS = {
  sdlc: ClipboardList,
  html: FileCode,
  css: Palette,
  corejava: Code,
  java8: Java8Icon,
  microservices: MicroservicesIcon,
  springai: SpringAiIcon,
  mysql: Database,
  jdbc: Server,
  servlets: Server,
  jsp: FileText,
  hibernate: Layers,
  spring: Box,
  springboot: Rocket,
  springcloud: Cloud,
  http: Globe,
  kafka: MessageSquare,
  docker: Layers,
  git: GitBranch,
  maven: Package,
};

const HOME_TRACKS = getOrderedHomeTracks();

function Home() {
  const [totalTopics, setTotalTopics] = useState(HOME_DEFAULT_STATS.topicCount);
  const [trackCount, setTrackCount] = useState(HOME_DEFAULT_STATS.trackCount);

  useEffect(() => {
    import('../data').then((module) => {
      const sections = Object.values(module.courseStructure);
      const computedTrackCount = sections.length;
      const computedTopicCount = sections.reduce((courseAcc, course) => {
        const sectionValues = Object.values(course.sections || {});
        return courseAcc + sectionValues.reduce((sectionAcc, section) => sectionAcc + (section.topics?.length || 0), 0);
      }, 0);
      if (computedTopicCount > 0) setTotalTopics(computedTopicCount);
      if (computedTrackCount > 0) setTrackCount(computedTrackCount);
    });
  }, []);

  return (
    <div className="home-page landing-page home-page--premium">
      <SEOHead />
      <StructuredData type="WebSite" />

      <section className="home-hero home-hero--premium">
        <div className="home-hero-glow home-hero-glow--1" aria-hidden />
        <div className="home-hero-glow home-hero-glow--2" aria-hidden />
        <div className="home-hero-grid-pattern" aria-hidden />

        <div className="home-hero-inner">
          <div className="home-hero-brand">
            <div className="home-hero-logo-wrap">
              <img src={logoImage} alt="LearnStackHub" className="home-hero-logo" />
            </div>
            <div className="home-hero-copy">
              <span className="home-hero-badge">Premium EdTech platform</span>
              <p className="home-hero-eyebrow">
                <GraduationCap size={15} aria-hidden />
                {BRAND.tagline}
              </p>
              <h1>
                Master Java full stack with{' '}
                <span className="home-hero-gradient-text">clarity &amp; depth</span>
              </h1>
              <p className="home-hero-lead">
                Structured paths from Core Java to Spring Boot, microservices, and cloud — with MCQs,
                runnable examples, and an AI Practice Lab built for interviews.
              </p>
              <p className="home-hero-meta">
                <strong>{trackCount}</strong> tracks · <strong>{totalTopics}+</strong> tutorials · Practice Lab included
              </p>
              <div className="home-hero-actions">
                <Link to="/tutorial/java-introduction" className="btn home-btn-premium">
                  <Play size={18} aria-hidden />
                  Start learning free
                </Link>
                <a href="#courses" className="btn home-btn-ghost">
                  <BookOpen size={18} aria-hidden />
                  Browse tracks
                </a>
                <Link to="/subscribe" className="btn home-btn-outline">
                  <Crown size={17} aria-hidden />
                  Get full access
                </Link>
              </div>
            </div>
          </div>

          <ul className="home-value-grid">
            {VALUE_PROPS.map(({ icon: Icon, label, detail }) => (
              <li key={label}>
                <span className="home-value-icon">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="courses" className="home-section home-section--tracks">
        <div className="home-section-head">
          <span className="home-section-label">Curriculum</span>
          <h2>Learning tracks</h2>
          <p>
            {trackCount} sequenced paths from fundamentals to production-ready backend skills — pick a track and
            start with the first lesson.
          </p>
        </div>
        <div className="home-tracks-grid">
          {HOME_TRACKS.map((track) => {
            const IconComponent = COURSE_ICONS[track.id] || Code;
            return (
              <Link
                key={track.id}
                to={getTopicPath(track.firstTopicId)}
                className="home-track-card"
                data-course={track.id}
                style={{ '--track-accent': track.color }}
              >
                <span className="home-track-accent" aria-hidden />
                <span className="home-track-icon">
                  <IconComponent size={22} aria-hidden />
                </span>
                <span className="home-track-body">
                  <span className="home-track-title">{track.title}</span>
                  <span className="home-track-desc">{track.description}</span>
                </span>
                <span className="home-track-arrow" aria-hidden>
                  <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section home-section--surface">
        <div className="home-section-head">
          <span className="home-section-label">Quick start</span>
          <h2>Start here</h2>
          <p>Recommended entry points to build a strong foundation in days, not months.</p>
        </div>
        <div className="home-starter-grid">
          {STARTER_GUIDES.map((guide) => (
            <Link key={guide.id} to={getTopicPath(guide.id)} className="home-starter-card">
              <h3>{guide.title}</h3>
              <p>{guide.level}</p>
              <span>
                <Clock size={14} aria-hidden /> {guide.time}
              </span>
              <em>
                Open guide <ArrowRight size={14} aria-hidden />
              </em>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-section--lab">
        <div className="home-section-head">
          <span className="home-section-label">Practice Lab</span>
          <h2>Interview-ready practice</h2>
          <p>AI tutor chat and spoken interview rehearsal — right in your browser.</p>
        </div>
        <div className="home-lab-grid">
          <Link to="/ai-lab/chat" className="home-lab-card">
            <MessageSquare size={22} aria-hidden />
            <h3>Chat practice</h3>
            <p>Java &amp; backend Q&amp;A with an AI tutor</p>
            <span>
              Open chat <ArrowRight size={14} aria-hidden />
            </span>
          </Link>
          <Link to="/ai-lab/interview" className="home-lab-card">
            <Video size={22} aria-hidden />
            <h3>Interview practice</h3>
            <p>Camera, mic, and guided coaching feedback</p>
            <span>
              Start session <ArrowRight size={14} aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      <section className="home-trust-panel home-trust-panel--premium">
        <div className="home-trust-panel-inner">
          <div>
            <h2>Built for learners, operated with transparency</h2>
            <p>
              {LEARNSTACKHUB.brand} is owned and operated by{' '}
              <a href={GENAIXIS.website} target="_blank" rel="noopener noreferrer">
                {GENAIXIS.legalName}
              </a>
              . Founded by {FOUNDER.name}. Tutorials are reviewed and updated for clarity and interview relevance.
            </p>
            <ul className="home-trust-list">
              <li>
                <CheckCircle size={16} aria-hidden /> Structured beginner-to-advanced progression
              </li>
              <li>
                <CheckCircle size={16} aria-hidden /> Concept + runnable code + practical context
              </li>
              <li>
                <CheckCircle size={16} aria-hidden /> MCQs and Practice Lab for revision
              </li>
            </ul>
          </div>
          <div className="home-trust-meta">
            <p>
              <strong>Contact:</strong>{' '}
              <a href={`mailto:${LEARNSTACKHUB.contactEmail}`}>{LEARNSTACKHUB.contactEmail}</a>
            </p>
            <p>
              <strong>Launch:</strong> {LEARNSTACKHUB.launchDate}
            </p>
            <Link to="/about" className="home-trust-link">
              About us <ArrowRight size={14} aria-hidden />
            </Link>
            <Link to="/contact" className="home-trust-link">
              Contact <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-cta-band home-cta-band--premium">
        <div className="home-cta-glow" aria-hidden />
        <h2>Your next role starts with consistent practice</h2>
        <p>Join learners building interview-ready Java full-stack skills on a platform designed for depth, not noise.</p>
        <div className="home-cta-actions">
          <Link to="/tutorial/java-introduction" className="btn home-btn-premium home-btn-premium--light">
            <Play size={20} aria-hidden />
            Begin learning
          </Link>
          <Link to="/subscribe" className="btn home-btn-outline home-btn-outline--light">
            <Crown size={18} aria-hidden />
            View plans
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
