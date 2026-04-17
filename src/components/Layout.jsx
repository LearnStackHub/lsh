import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Menu, X, BookOpen,
  FileCode, Palette, Code, Database, Server, FileText, Layers, 
  Box, Rocket, Globe, GitBranch, Package, Wrench, ClipboardList, Cloud,
  Sparkles,
} from 'lucide-react';
import { useContributions } from '../context/ContributionContext';
import ConsentBanner from './ConsentBanner';
import AdSense from './AdSense';
import { ADSENSE_CONFIG } from '../config/adsense';
import { trackSearch } from '../config/analytics';
import logoImage from '../assets/LSH.png';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState('corejava');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { getAllContributions } = useContributions();
  const [courseStructure, setCourseStructure] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Lazy load data after initial render - delay to reduce TBT
  useEffect(() => {
    const loadData = () => {
      import('../data').then((module) => {
        setCourseStructure(module.courseStructure);
        window.__getAllTopics = module.getAllTopics;
        setDataLoaded(true);
      }).catch((error) => {
        console.error('Error loading course data:', error);
        // Still set dataLoaded to true to prevent infinite loading
        setDataLoaded(true);
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

  // Auto-detect active course based on current topic
  useEffect(() => {
    if (!dataLoaded) return;
    const currentPath = location.pathname;
    const allTopics = window.__getAllTopics();
    const currentTopic = allTopics.find(t => currentPath.includes(t.id));
    
    if (currentTopic) {
      setActiveCourse(currentTopic.courseKey);
    }
  }, [location.pathname, dataLoaded]);

  // Filter topics based on search
  useEffect(() => {
    if (!dataLoaded) return;
    if (searchQuery.trim()) {
      const allTopics = window.__getAllTopics();
      const filtered = allTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
      
      // Track search in Google Analytics (debounced)
      const timeoutId = setTimeout(() => {
        if (searchQuery.trim().length >= 3) {
          trackSearch(searchQuery.trim());
        }
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredTopics([]);
    }
  }, [searchQuery, dataLoaded]);

  const isTopicActive = (topicId) => {
    // For MCQ topics, check exact path match
    if (topicId?.includes('mcq') || topicId?.includes('exam')) {
      return location.pathname === `/${topicId}` || location.pathname === `/tutorial/${topicId}`;
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
        navigate(`/tutorial/${firstTopic.id}`);
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
  const shouldHideAds = adBlockedPaths.has(location.pathname) || isExamRunnerRoute;

  // Map course keys to lucide-react icons
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

  return (
    <div className="app-layout">
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
            className="header-ai-lab-link"
            title="Open live code editor"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginRight: '0.5rem',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              background: 'var(--gradient-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            <Code size={16} aria-hidden />
            <span className="header-ai-lab-text">Run Live Code</span>
          </Link>
          <Link
            to="/ai-lab"
            className="header-ai-lab-link"
            title="Local practice: chat and interview"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginRight: '0.75rem',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              border: '1px solid var(--border-color)',
              whiteSpace: 'nowrap',
            }}
          >
            <Sparkles size={16} aria-hidden />
            <span className="header-ai-lab-text">Practice Lab</span>
          </Link>
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Results Dropdown */}
            {filteredTopics.length > 0 && (
              <div className="search-results">
                {filteredTopics.slice(0, 8).map(topic => (
                  <Link
                    key={topic.id}
                    to={`/tutorial/${topic.id}`}
                    className="search-result-item"
                    onClick={() => setSearchQuery('')}
                  >
                    <BookOpen size={14} />
                    <div>
                      <span className="search-result-title">{topic.title}</span>
                      <span className="search-result-course">{topic.courseTitle}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          
        </div>
      </header>

      {/* Main Topics Navigation Bar - Shows main courses */}
      <nav className="main-topics-nav-bar">
        <div className="main-topics-container">
          {courseStructure ? Object.entries(courseStructure).map(([courseKey, course]) => {
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            const IconComponent = courseIcons[courseKey] || Code; // Default to Code icon if not found
            return (
              <Link
                key={courseKey}
                to={firstTopic ? `/tutorial/${firstTopic.id}` : '/'}
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
                to={item.id?.includes('mcq') || item.id?.includes('exam') ? `/${item.id}` : `/tutorial/${item.id}`}
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
                to={`/tutorial/${contrib.id}`}
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
      {filteredTopics.length > 0 && (
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
                <li><Link to="/ai-lab">Practice Lab (local AI)</Link></li>
                <li><Link to="/tutorial/html-introduction">HTML</Link></li>
                <li><Link to="/tutorial/css-introduction">CSS</Link></li>
                <li><Link to="/tutorial/java-introduction">Core Java</Link></li>
                <li><Link to="/tutorial/mysql-introduction">MySQL</Link></li>
                <li><Link to="/tutorial/jdbc-introduction">JDBC</Link></li>
              </ul>
              <ul>
                <li><Link to="/tutorial/servlet-introduction">Servlets</Link></li>
                <li><Link to="/tutorial/jsp-introduction">JSP</Link></li>
                <li><Link to="/tutorial/hibernate-introduction">Hibernate</Link></li>
                <li><Link to="/tutorial/spring-introduction">Spring Framework</Link></li>
                <li><Link to="/tutorial/spring-boot-introduction">Spring Boot</Link></li>
                <li><Link to="/tutorial/http-status-codes">HTTP & APIs</Link></li>
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
          <p>&copy; {new Date().getFullYear()} LearnStackHub. All rights reserved.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Made with ☁️ for developers worldwide
          </p>
        </div>
      </footer>

      {/* Consent Banner */}
      <ConsentBanner />
    </div>
  );
}

export default Layout;
