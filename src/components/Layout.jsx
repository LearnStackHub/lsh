import { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Menu, X, BookOpen,
  FileCode, Palette, Code, Database, Server, FileText, Layers, 
  Box, Rocket, Globe, GitBranch, Package, ClipboardList, Cloud,
  Sparkles, MessageSquare,
} from 'lucide-react';
import { useContributions } from '../context/ContributionContext';
import ConsentBanner from './ConsentBanner';
import SocialOfficialLinks from './SocialOfficialLinks';
import AuthButton from './AuthButton';
import AdSense from './AdSense';
import { ADSENSE_CONFIG } from '../config/adsense';
import { GENAIXIS, LEARNSTACKHUB } from '../config/company';
import { sortCourseEntries } from '../config/navCourseOrder';
import { trackSearch } from '../config/analytics';
import { getTopicPath, isKafkaTopicId, kafkaTopicIdToSlug, isDockerTopicId, dockerTopicIdToSlug, isMicroservicesTopicId, microservicesTopicIdToSlug, isSpringAiTopicId, springAiTopicIdToSlug } from '../utils/topicRoutes';
import logoImage from '../assets/LSH.png';
import Java8Icon from './icons/Java8Icon';
import MicroservicesIcon from './icons/MicroservicesIcon';
import SpringAiIcon from './icons/SpringAiIcon';

const getCourseKeyFromPath = (pathname = '') => {
  if (pathname.startsWith('/java8/')) return 'java8';
  if (pathname.startsWith('/microservices/')) return 'microservices';
  if (pathname.startsWith('/springai/')) return 'springai';
  if (pathname.startsWith('/corejava/')) return 'corejava';
  if (pathname.startsWith('/mysql/')) return 'mysql';
  if (pathname.startsWith('/springboot/')) return 'springboot';
  if (pathname.startsWith('/spring/')) return 'spring';
  if (pathname.startsWith('/hibernate/')) return 'hibernate';
  if (pathname.startsWith('/kafka/')) return 'kafka';
  if (pathname.startsWith('/docker/')) return 'docker';
  return null;
};

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(() => getCourseKeyFromPath(window.location.pathname) || 'corejava');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { getAllContributions } = useContributions();
  const [courseStructure, setCourseStructure] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const loadPromiseRef = useRef(null);

  const loadCourseData = useCallback(() => {
    if (loadPromiseRef.current) {
      return loadPromiseRef.current;
    }

    window.__lshDataLoadTriggered = true;
    loadPromiseRef.current = import('../data')
      .then((module) => {
        setCourseStructure(module.courseStructure);
        window.__getAllTopics = module.getAllTopics;
        setDataLoaded(true);
        return module;
      })
      .catch((error) => {
        console.error('Error loading course data:', error);
        setDataLoaded(true);
        return null;
      });

    return loadPromiseRef.current;
  }, []);

  // Lazy load data after initial render - delay to reduce TBT
  useEffect(() => {
    const triggerLoad = () => {
      if (window.__lshDataLoadTriggered) return;
      loadCourseData();
    };

    // Detect mobile and use longer delay to reduce TBT
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isHomeRoute = window.location.pathname === '/' || window.location.pathname === '/index.html';
    const idleTimeout = isHomeRoute ? (isMobile ? 7000 : 6000) : (isMobile ? 800 : 500);
    const fallbackDelay = isHomeRoute ? (isMobile ? 8000 : 7000) : (isMobile ? 400 : 200);

    if (isHomeRoute) {
      // Home page under slow-4G audits: defer heavy data graph until user intent or long-idle fallback.
      const interactionEvents = ['scroll', 'click', 'touchstart', 'keydown'];
      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, triggerLoad, { once: true, passive: true });
      });

      if ('requestIdleCallback' in window) {
        requestIdleCallback(triggerLoad, { timeout: idleTimeout });
      } else {
        setTimeout(triggerLoad, fallbackDelay);
      }

      return () => {
        interactionEvents.forEach((eventName) => {
          window.removeEventListener(eventName, triggerLoad);
        });
      };
    }

    // Non-home routes should keep navigation data responsive.
    if ('requestIdleCallback' in window) {
      requestIdleCallback(triggerLoad, { timeout: idleTimeout });
    } else {
      setTimeout(triggerLoad, fallbackDelay);
    }
  }, [loadCourseData]);

  // Auto-detect active course based on current topic
  useEffect(() => {
    if (!dataLoaded) return;
    const currentPath = location.pathname;
    const courseKeyFromPath = getCourseKeyFromPath(currentPath);
    if (courseKeyFromPath) {
      setActiveCourse(courseKeyFromPath);
      return;
    }
    const allTopics = window.__getAllTopics();
    const currentTopic = allTopics.find(t => currentPath === getTopicPath(t.id) || currentPath.includes(t.id));
    
    if (currentTopic) {
      setActiveCourse(currentTopic.courseKey);
    }
  }, [location.pathname, dataLoaded]);

  // Filter topics based on search
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setFilteredTopics([]);
      return;
    }

    loadCourseData();

    if (!dataLoaded || typeof window.__getAllTopics !== 'function') {
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const allTopics = window.__getAllTopics();
    const filtered = allTopics.filter((topic) =>
      topic.title?.toLowerCase().includes(normalizedQuery) ||
      topic.description?.toLowerCase().includes(normalizedQuery) ||
      topic.courseTitle?.toLowerCase().includes(normalizedQuery) ||
      topic.id?.toLowerCase().includes(normalizedQuery.replace(/\s+/g, '-'))
    );
    setFilteredTopics(filtered);

    const timeoutId = setTimeout(() => {
      if (normalizedQuery.length >= 3) {
        trackSearch(query);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dataLoaded, loadCourseData]);

  const isTopicActive = (topicId) => {
    if (location.pathname === getTopicPath(topicId)) {
      return true;
    }

    // For MCQ topics, check exact path match
    if (topicId?.includes('mcq') || topicId?.includes('exam')) {
      return location.pathname === `/${topicId}` || location.pathname === `/tutorial/${topicId}`;
    }
    if (isKafkaTopicId(topicId)) {
      return location.pathname === `/kafka/${kafkaTopicIdToSlug(topicId)}`;
    }
    if (isDockerTopicId(topicId)) {
      return location.pathname === `/docker/${dockerTopicIdToSlug(topicId)}`;
    }
    if (isMicroservicesTopicId(topicId)) {
      return location.pathname === `/microservices/${microservicesTopicIdToSlug(topicId)}`;
    }
    if (isSpringAiTopicId(topicId)) {
      return location.pathname === `/springai/${springAiTopicIdToSlug(topicId)}`;
    }
    return location.pathname.includes(topicId);
  };

  const handleCourseSelect = (courseKey) => {
    setActiveCourse(courseKey);
    setSearchQuery('');
    
    // Navigate to the first topic of the selected course
    const course = courseStructure[courseKey];
    if (course) {
      const firstSection = Object.values(course.sections)[0];
      if (firstSection && firstSection.topics.length > 0) {
        const firstTopic = firstSection.topics[0];
        navigate(getTopicPath(firstTopic.id));
      }
    }
  };

  // Get user contributions
  const userContributions = getAllContributions();

  // Get the active course data
  const currentCourse = courseStructure?.[activeCourse];

  // Get all topics for current course (flat list like W3Schools)
  const getCurrentCourseTopics = () => {
    if (!currentCourse) return [];
    const topics = [];
    Object.entries(currentCourse.sections).forEach(([sectionKey, section]) => {
      // Add section header
      topics.push({ type: 'section', title: section.title, key: sectionKey });
      // Add topics
      section.topics.forEach(topic => {
        topics.push({ type: 'topic', ...topic });
      });
    });
    return topics;
  };

  const courseTopics = getCurrentCourseTopics();

  // Disable ads on utility/tool and exam-runner pages to satisfy AdSense inventory-value policy.
  const adBlockedPaths = new Set([
    '/ai-lab/chat',
    '/ai-lab/code-editor',
    '/ai-lab/interview',
  ]);
  const isExamRunnerRoute = /(?:^|\/)[a-z0-9-]+-(mcq|exam)$/.test(location.pathname);
  const shouldHideAds = ADSENSE_CONFIG.reviewMode || adBlockedPaths.has(location.pathname) || isExamRunnerRoute;

  // Map course keys to lucide-react icons
  const courseIcons = {
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
    maven: Package
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';

  return (
    <div className={`app-layout${isHomePage ? ' app-layout--home' : ''}`}>
      {/* Header */}
      <header className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <div className="header-left">
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
          </button>
          
          <Link to="/" className="logo" aria-label="LearnStackHub home">
            <img 
              src={logoImage} 
              alt="LearnStackHub Logo" 
              className="logo-image"
              loading="eager"
              fetchPriority="high"
              width="40"
              height="40"
              decoding="async"
            />
            <span>LearnStackHub</span>
          </Link>
        </div>

        <div className="header-right">
          <Link
            to="/ai-lab/code-editor"
            className="header-action-link"
            title="Open live code editor"
          >
            <Code size={16} aria-hidden />
            <span className="header-action-text">Run Live Code</span>
          </Link>
          <Link
            to="/ai-lab"
            className="header-action-link"
            title="Practice Lab — AI chat and interview prep"
          >
            <Sparkles size={16} aria-hidden />
            <span className="header-action-text">Practice Lab</span>
          </Link>
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onFocus={() => loadCourseData()}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  loadCourseData();
                }
              }}
            />
            {searchQuery.trim() && (
              <div className="search-results">
                {!dataLoaded || typeof window.__getAllTopics !== 'function' ? (
                  <div className="search-result-status">Loading topics…</div>
                ) : filteredTopics.length === 0 ? (
                  <div className="search-result-status">No results found</div>
                ) : (
                  filteredTopics.slice(0, 8).map((topic) => (
                    <Link
                      key={topic.id}
                      to={getTopicPath(topic.id)}
                      className="search-result-item"
                      onClick={() => setSearchQuery('')}
                    >
                      <BookOpen size={14} />
                      <div>
                        <span className="search-result-title">{topic.title}</span>
                        <span className="search-result-course">{topic.courseTitle}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <AuthButton />
        </div>
      </header>

      {/* Main Topics Navigation Bar - Shows main courses */}
      <nav className="main-topics-nav-bar">
        <div className="main-topics-container">
          {courseStructure ? sortCourseEntries(courseStructure).map(([courseKey, course]) => {
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            const IconComponent = courseIcons[courseKey] || Code; // Default to Code icon if not found
            return (
              <Link
                key={courseKey}
                to={firstTopic ? getTopicPath(firstTopic.id) : '/'}
                className={`main-topic-link ${activeCourse === courseKey ? 'active' : ''}`}
                onClick={() => {
                  setActiveCourse(courseKey);
                  setSidebarOpen(false);
                }}
              >
                <span className="main-topic-icon">
                  <IconComponent size={18} />
                </span>
                <span className="main-topic-name">{course.title}</span>
              </Link>
            );
          }) : (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
              Loading courses...
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar - Toggleable on mobile */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="app-sidebar">
        {/* Course Title Header */}
        <div className="sidebar-header" style={{ '--course-color': currentCourse?.color }}>
          <span className="sidebar-header-icon">
            {currentCourse && (() => {
              const IconComponent = courseIcons[activeCourse] || Code;
              return <IconComponent size={20} />;
            })()}
          </span>
          <span className="sidebar-header-title">{currentCourse?.title} Tutorial</span>
        </div>

        {/* Topics List - Flat like W3Schools */}
        <nav className="sidebar-nav">
          {courseTopics.length > 0 ? courseTopics.map((item, index) => (
            item.type === 'section' ? (
              <div key={item.key} className="sidebar-section-title">
                {item.title}
              </div>
            ) : (
              <Link
                key={item.id}
                to={getTopicPath(item.id)}
                className={`sidebar-link ${isTopicActive(item.id) ? 'active' : ''} ${item.id?.includes('mcq') || item.id?.includes('exam') ? 'exam-link' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>{item.title}</span>
                {(item.id?.includes('mcq') || item.id?.includes('exam')) && (
                  <span className="exam-badge">Exam</span>
                )}
              </Link>
            )
          )) : (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
              {dataLoaded ? 'No topics available' : 'Loading topics...'}
            </div>
          )}
        </nav>

        {/* User Contributions */}
        {userContributions.length > 0 && (
          <div className="sidebar-contributions">
            <div className="sidebar-section-title">My Contributions</div>
            {userContributions.map(contrib => (
              <Link
                key={contrib.id}
                to={getTopicPath(contrib.id)}
                className={`sidebar-link ${isTopicActive(contrib.id) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {contrib.title}
                <span className="contrib-badge">
                  {contrib.type === 'added' ? 'New' : 'Edit'}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Sidebar Ad */}
        {!shouldHideAds && (
          <div className="sidebar-ad">
            <AdSense 
              adSlot={ADSENSE_CONFIG.adSlots.sidebar}
              adFormat="rectangle"
              className="sidebar-ad-unit"
              style={{ margin: '1rem' }}
            />
          </div>
        )}
      </aside>

      {/* Top Banner Ad */}
      {!shouldHideAds && (
        <div className="top-banner-ad">
          <AdSense 
            adSlot={ADSENSE_CONFIG.adSlots.topBanner}
            adFormat="horizontal"
            className="banner-ad-unit"
            style={{ margin: '1rem auto', maxWidth: '728px' }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Bottom Banner Ad */}
      {!shouldHideAds && (
        <div className="bottom-banner-ad">
          <AdSense 
            adSlot={ADSENSE_CONFIG.adSlots.bottomBanner}
            adFormat="horizontal"
            className="banner-ad-unit"
            style={{ margin: '1rem auto', maxWidth: '728px' }}
          />
        </div>
      )}


      {/* Click outside to close search */}
      {searchQuery.trim() && (
        <div 
          className="search-overlay"
          onClick={() => setSearchQuery('')}
        />
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>LearnStackHub</h3>
            <p>Your complete journey from Core Java to Cloud-Ready Full-Stack Development</p>
          </div>
          
          <div className="footer-section footer-learn">
            <h4>Learn</h4>
            <div className="footer-topics-grid">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ai-lab">Practice Lab</Link></li>
                <li><Link to="/tutorial/html-introduction">HTML</Link></li>
                <li><Link to="/tutorial/css-introduction">CSS</Link></li>
                <li><Link to="/corejava/java-introduction">Core Java</Link></li>
                <li><Link to="/java8/introduction">Java 8</Link></li>
                <li><Link to="/mysql/mysql-introduction">MySQL</Link></li>
                <li><Link to="/tutorial/jdbc-introduction">JDBC</Link></li>
              </ul>
              <ul>
                <li><Link to="/tutorial/servlet-introduction">Servlets</Link></li>
                <li><Link to="/tutorial/jsp-introduction">JSP</Link></li>
                <li><Link to="/hibernate/hibernate-introduction">Hibernate</Link></li>
                <li><Link to="/spring/spring-introduction">Spring Framework</Link></li>
                <li><Link to="/springboot/spring-boot-introduction">Spring Boot</Link></li>
                <li><Link to="/tutorial/http-status-codes">HTTP & APIs</Link></li>
                <li><Link to="/tutorial/spring-cloud-microservices-project">Spring Cloud</Link></li>
                <li><Link to="/microservices/introduction">Microservices</Link></li>
                <li><Link to="/springai/introduction">Spring AI</Link></li>
                <li><Link to="/kafka/introduction">Kafka</Link></li>
                <li><Link to="/docker/introduction">Docker</Link></li>
              </ul>
              <ul>
                <li><Link to="/tutorial/git-introduction">Git & GitHub</Link></li>
                <li><Link to="/tutorial/maven-introduction">Maven</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/career-guidance">Career Guidance</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:careers@learnstackhub.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  careers@learnstackhub.com
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-social-heading">Follow us</p>
          <SocialOfficialLinks showLabels />
          <p className="footer-powered-by">
            Powered by{' '}
            <a
              href={GENAIXIS.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {GENAIXIS.legalName}
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} {LEARNSTACKHUB.brand}. All rights reserved.</p>
          <p className="footer-operated-by">
            Owned and operated by{' '}
            <a
              href={GENAIXIS.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {GENAIXIS.legalName}
            </a>
            . CIN: {GENAIXIS.cin}
          </p>
        </div>
      </footer>

      {/* Consent Banner */}
      <ConsentBanner />
    </div>
  );
}

export default Layout;
