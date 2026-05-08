import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import { github as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Play, 
  Terminal, 
  Clock, 
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Code,
  RotateCcw,
  Loader2,
  Calendar
} from 'lucide-react';
import { getTopicById, getNavigation, getAllTopics } from '../data';
import { executeWithPiston } from '../services/codeExecutor';
import { useContributions } from '../context/ContributionContext';
import ContributorBadge from '../components/ContributorBadge';
import AdSense from '../components/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense';
import { HierarchyDiagram, ConceptCube, ProcessCards, CodeFlowAnimation } from '../components/Diagram';
import { ImageGif, ImageCard3D } from '../components/ImageGif';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import FAQSection from '../components/FAQSection';
import TutorialFloatingChat from '../components/TutorialFloatingChat';
import InternalLinks from '../components/InternalLinks';
import JavaDataTypesShowcase from '../components/JavaDataTypesShowcase';
import JavaEnvironmentSetupShowcase from '../components/JavaEnvironmentSetupShowcase';
import JavaIntroductionShowcase from '../components/JavaIntroductionShowcase';
import JavaFeaturesShowcase from '../components/JavaFeaturesShowcase';
import JavaSyntaxShowcase from '../components/JavaSyntaxShowcase';
import JavaVariablesShowcase from '../components/JavaVariablesShowcase';
import JavaOperatorsShowcase from '../components/JavaOperatorsShowcase';
import JavaMethodsShowcase from '../components/JavaMethodsShowcase';
import JavaKeywordsShowcase from '../components/JavaKeywordsShowcase';
import IfElseShowcase from '../components/IfElseShowcase';
import SwitchStatementShowcase from '../components/SwitchStatementShowcase';
import ForLoopShowcase from '../components/ForLoopShowcase';
import WhileLoopShowcase from '../components/WhileLoopShowcase';
import DoWhileLoopShowcase from '../components/DoWhileLoopShowcase';
import BreakContinueShowcase from '../components/BreakContinueShowcase';
import OopsIntroductionShowcase from '../components/OopsIntroductionShowcase';
import ClassesObjectsShowcase from '../components/ClassesObjectsShowcase';
import ConstructorsShowcase from '../components/ConstructorsShowcase';
import InheritanceShowcase from '../components/InheritanceShowcase';
import PolymorphismShowcase from '../components/PolymorphismShowcase';
import AbstractionShowcase from '../components/AbstractionShowcase';
import EncapsulationShowcase from '../components/EncapsulationShowcase';
import InterfacesShowcase from '../components/InterfacesShowcase';
import StringIntroductionShowcase from '../components/StringIntroductionShowcase';
import StringMethodsShowcase from '../components/StringMethodsShowcase';
import StringBufferShowcase from '../components/StringBufferShowcase';
import StringBuilderShowcase from '../components/StringBuilderShowcase';
import ArrayIntroductionShowcase from '../components/ArrayIntroductionShowcase';
import SingleDimensionalArrayShowcase from '../components/SingleDimensionalArrayShowcase';
import MultiDimensionalArrayShowcase from '../components/MultiDimensionalArrayShowcase';
import ArrayMethodsShowcase from '../components/ArrayMethodsShowcase';
import {
  ExceptionIntroductionShowcase,
  TryCatchFinallyShowcase,
  ThrowThrowsShowcase,
  CustomExceptionsShowcase,
  GlobalExceptionHandlingShowcase
} from '../components/exceptions/showcases';
import {
  CollectionIntroductionShowcase,
  ListInterfaceShowcase,
  SetInterfaceShowcase,
  MapInterfaceShowcase,
  QueueInterfaceShowcase
} from '../components/collections/showcases';
import { SynchronizationShowcase } from '../components/sync/showcases';
import { SerializationShowcase } from '../components/serialization/showcases';
import {
  ThreadIntroductionShowcase,
  ThreadCreationShowcase,
  ThreadLifecycleShowcase,
  ThreadMethodsShowcase
} from '../components/multithreading/showcases';
import {
  SpringBootIntroductionShowcase,
  SpringBootProjectSetupShowcase,
  SpringBootConfigurationShowcase,
  SpringBootRestAPIShowcase,
  SpringBootJPAShowcase,
  SpringBootExceptionHandlingShowcase,
  SpringBootValidationShowcase,
  SpringBootSecurityShowcase,
  SpringBootSMTPShowcase,
  SpringBootPostmanSwaggerShowcase,
  SpringBootTestingShowcase,
  SpringBootDeploymentShowcase,
  SpringBootActuatorShowcase,
  SpringBootInterviewQuestionsShowcase
} from '../components/springboot/showcases';
import {
  SpringFrameworkIntroductionShowcase,
  SpringFrameworkIOCShowcase,
  SpringFrameworkDIShowcase,
  SpringFrameworkBeanShowcase,
  SpringFrameworkApplicationContextShowcase,
  SpringFrameworkConfigurationXmlShowcase,
  SpringFrameworkConfigurationAnnotationShowcase,
  SpringFrameworkDispatcherServletShowcase,
  SpringFrameworkMVCControllerShowcase,
  SpringFrameworkMVCViewResolverShowcase,
  SpringFrameworkMVCModelAndViewShowcase,
  SpringFrameworkProjectCrudShowcase,
  SpringFrameworkDataIntroductionShowcase,
  SpringFrameworkDataRepositoryArchitectureShowcase,
  SpringFrameworkJdbcTemplateShowcase,
  SpringFrameworkDataCustomQueriesShowcase,
  SpringFrameworkAOPIntroductionShowcase,
  SpringFrameworkAOPAdvancedPointcutsShowcase,
  SpringFrameworkAOPCustomAnnotationsShowcase,
  SpringFrameworkAOPAspectOrderingShowcase,
  SpringFrameworkAOPWithSpringBootShowcase,
  SpringFrameworkInterviewQuestionsShowcase
} from '../components/springframework/showcases';
import { JDBC_SHOWCASE_TOPIC_IDS, JdbcShowcaseRouter } from '../components/jdbc/showcases';
import { SERVLET_SHOWCASE_TOPIC_IDS, ServletShowcaseRouter } from '../components/servlets/showcases';
import { JSP_SHOWCASE_TOPIC_IDS, JspShowcaseRouter } from '../components/jsp/showcases';
import { HIBERNATE_SHOWCASE_TOPIC_IDS, HibernateShowcaseRouter } from '../components/hibernate/showcases';
import { SPRING_CLOUD_SHOWCASE_TOPIC_IDS, SpringCloudShowcaseRouter } from '../components/springcloud/showcases';
import { HTTP_SHOWCASE_TOPIC_IDS, HttpShowcaseRouter } from '../components/http/showcases';
import { MYSQL_SHOWCASE_TOPIC_IDS, MySQLShowcaseRouter } from '../components/mysql/showcases';
import { generateSEOTitle } from '../utils/seoHelpers';
import { trackTutorialView, trackButtonClick } from '../config/analytics';
import { getTopicPath, kafkaSlugToTopicId, dockerSlugToTopicId } from '../utils/topicRoutes';

SyntaxHighlighter.registerLanguage('java', java);

/** Markdown body must be a string; user contributions may store other shapes by mistake */
function topicContentToString(content) {
  if (content == null) return '';
  if (typeof content === 'string') return content;
  return '';
}

const LEGACY_CORE_JAVA_TOPIC_IDS = new Set([
  'if-else', 'for-loop', 'while-loop', 'do-while-loop', 'switch-statement', 'break-continue',
  'array-introduction', 'single-dimensional-array', 'multi-dimensional-array', 'array-methods',
  'oops-introduction', 'classes-objects', 'constructors', 'encapsulation', 'inheritance',
  'polymorphism', 'abstraction', 'interfaces',
  'string-introduction', 'string-methods', 'string-builder', 'string-buffer',
  'exception-introduction', 'try-catch-finally', 'throw-throws', 'custom-exceptions', 'global-exception-handling',
  'thread-introduction', 'thread-creation', 'thread-methods', 'thread-lifecycle',
  'collection-introduction', 'list-interface', 'set-interface', 'queue-interface', 'map-interface',
  'serialization', 'synchronization'
]);

function normalizeInternalTutorialLink(path = '') {
  if (typeof path !== 'string') return path;
  if (path.startsWith('/tutorial/hibernate-')) return path.replace('/tutorial/hibernate-', '/hibernate/hibernate-');
  if (path.startsWith('/tutorial/spring-boot-')) return path.replace('/tutorial/spring-boot-', '/springboot/spring-boot-');
  if (path.startsWith('/tutorial/spring-')) return path.replace('/tutorial/spring-', '/spring/spring-');
  if (path.startsWith('/tutorial/mysql-')) return path.replace('/tutorial/mysql-', '/mysql/mysql-');
  if (path.startsWith('/tutorial/java-')) return path.replace('/tutorial/java-', '/corejava/java-');
  if (path.startsWith('/tutorial/')) {
    const topicId = path.replace('/tutorial/', '');
    if (LEGACY_CORE_JAVA_TOPIC_IDS.has(topicId)) return `/corejava/${topicId}`;
  }
  return path;
}

function Tutorial() {
  const { topicId, topicSlug } = useParams();
  const location = useLocation();
  const resolvedTopicId = topicId || (
    location.pathname.startsWith('/docker/')
      ? dockerSlugToTopicId(topicSlug)
      : kafkaSlugToTopicId(topicSlug)
  );
  const [copiedBlockId, setCopiedBlockId] = useState(null);
  const [editorCode, setEditorCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to execute your code');
  const [isRunning, setIsRunning] = useState(false);
  const { getContribution } = useContributions();

  // Get current topic data - check user contributions first
  const contribution = getContribution(resolvedTopicId);
  const originalTopic = getTopicById(resolvedTopicId);
  
  // Use contribution data if available, otherwise use original topic
  const currentTopic = contribution
    ? {
        ...originalTopic,
        ...contribution,
        title: contribution.title || originalTopic?.title,
        content:
          typeof contribution.content === 'string'
            ? contribution.content
            : typeof originalTopic?.content === 'string'
              ? originalTopic.content
              : topicContentToString(originalTopic?.content),
        code: contribution.code || originalTopic?.code
      }
    : originalTopic;

  const isMysqlTopic = resolvedTopicId?.startsWith('mysql-');
  const isServletTopic = resolvedTopicId?.startsWith('servlet-') || resolvedTopicId === 'http-request-response' || resolvedTopicId === 'session-management' || resolvedTopicId === 'filters-listeners' || resolvedTopicId === 'tomcat-server';
  const isJdbcTopic = resolvedTopicId?.startsWith('jdbc-') || resolvedTopicId === 'transaction-management' || resolvedTopicId === 'crud-operations' || resolvedTopicId === 'statement-interface' || resolvedTopicId === 'preparedstatement-interface' || resolvedTopicId === 'resultset-interface';
  const isHibernateTopic = resolvedTopicId?.startsWith('hibernate-');
  const CORE_JAVA_TOPIC_IDS = new Set([
    'java-introduction', 'java-features', 'java-environment-setup', 'java-syntax', 'java-variables',
    'java-data-types', 'java-keywords', 'java-operators', 'java-methods',
    'if-else', 'for-loop', 'while-loop', 'do-while-loop', 'switch-statement', 'break-continue',
    'array-introduction', 'single-dimensional-array', 'multi-dimensional-array', 'array-methods',
    'oops-introduction', 'classes-objects', 'constructors', 'encapsulation', 'inheritance',
    'polymorphism', 'abstraction', 'interfaces',
    'string-introduction', 'string-methods', 'string-builder', 'string-buffer',
    'exception-introduction', 'try-catch-finally', 'throw-throws', 'custom-exceptions', 'global-exception-handling',
    'thread-introduction', 'thread-creation', 'thread-methods', 'thread-lifecycle',
    'collection-introduction', 'list-interface', 'set-interface', 'queue-interface', 'map-interface',
    'serialization', 'synchronization'
  ]);
  const isCoreJavaTopic = CORE_JAVA_TOPIC_IDS.has(resolvedTopicId);
  const isHtmlCssTopic =
    resolvedTopicId?.startsWith('html-') || resolvedTopicId?.startsWith('css-');
  const shouldShowInContentAds = !ADSENSE_CONFIG.reviewMode;

  const navigation = getNavigation(resolvedTopicId);
  const fallbackLastUpdated = '2026-03-27';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return fallbackLastUpdated;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEstimatedReadTime = (content) => {
    if (typeof content !== 'string' || !content) return 5;
    const plainText = content
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/[#>*`|_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = plainText.split(' ').filter(Boolean).length;
    return Math.max(3, Math.ceil(words / 220));
  };

  const estimatedReadTime = getEstimatedReadTime(currentTopic?.content);
  const lastUpdatedRaw = contribution?.editedBy?.date
    || contribution?.contributedBy?.date
    || currentTopic?.lastUpdated
    || fallbackLastUpdated;
  const lastUpdatedDisplay = formatDate(lastUpdatedRaw);

  useEffect(() => {
    if (currentTopic?.code && !isMysqlTopic && !isServletTopic && !isJdbcTopic && !isHibernateTopic && !isCoreJavaTopic && !isHtmlCssTopic) {
      setEditorCode(currentTopic.code);
      setOutput('Click "Run Code" to execute your code');
    }
  }, [currentTopic, isMysqlTopic, isServletTopic, isJdbcTopic, isHibernateTopic, isCoreJavaTopic, isHtmlCssTopic]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedTopicId]);

  useEffect(() => {
    // Track tutorial view in Google Analytics
    if (currentTopic) {
      trackTutorialView(resolvedTopicId, currentTopic.title);
    }
  }, [resolvedTopicId, currentTopic?.title]);

  const copyToClipboard = async (text, blockId, eventLabel = 'copy_code') => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedBlockId(blockId);
    setTimeout(() => {
      setCopiedBlockId((currentId) => (currentId === blockId ? null : currentId));
    }, 2000);
    trackButtonClick(eventLabel, 'tutorial');
  };

  const copyCode = async () => {
    if (currentTopic?.code) {
      await copyToClipboard(currentTopic.code, 'topic-main-code');
    }
  };

  const runCode = async () => {
    // Track code execution
    trackButtonClick('run_code', 'tutorial');
    
    setIsRunning(true);
    setOutput('Compiling and executing...');
    
    try {
      const result = await executeWithPiston(editorCode, 'java');
      
      if (result.success) {
        setOutput(result.output || 'Program executed successfully (no output)');
      } else {
        setOutput(`Error:\n${result.error || 'Compilation/Runtime error'}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    if (currentTopic?.code) {
      setEditorCode(currentTopic.code);
      setOutput('Click "Run Code" to execute your code');
      
      // Track reset code action
      trackButtonClick('reset_code', 'tutorial');
    }
  };

  const [CodeMirrorComponent, setCodeMirrorComponent] = useState(null);
  const [javaLang, setJavaLang] = useState(null);

  // Lazy load CodeMirror only when code editor is needed (saves 100KB initial load)
  useEffect(() => {
    if (currentTopic?.code && !isMysqlTopic && !isServletTopic && !isJdbcTopic && !isHibernateTopic && !isCoreJavaTopic && !isHtmlCssTopic && !CodeMirrorComponent) {
      Promise.all([
        import('@uiw/react-codemirror'),
        import('@codemirror/lang-java')
      ]).then(([codemirrorModule, javaModule]) => {
        setCodeMirrorComponent(() => codemirrorModule.default);
        setJavaLang(() => javaModule.java);
      });
    }
  }, [currentTopic?.code, isMysqlTopic, isServletTopic, isJdbcTopic, isHibernateTopic, isCoreJavaTopic, isHtmlCssTopic, CodeMirrorComponent]);

  const onChange = useCallback((value) => {
    setEditorCode(value);
  }, []);

  const authorProfile = {
    name: 'Dattakumar Pandi',
    role: 'Founder of LearnStackHub',
    expertise: 'Backend Developer (Java)',
  };

  if (!currentTopic) {
    return (
      <div className="tutorial-page">
        <SEOHead title="Topic Not Found - LearnStackHub" noindex />
        <h1>Topic not found</h1>
        <p>The requested tutorial topic could not be found.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  // Parse markdown-like content
  const renderContent = (content) => {
    const lines = topicContentToString(content).split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows = [];
    let inDiagramBlock = false;
    let diagramContent = '';
    let diagramType = '';

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(2);
        elements.push(
          <table key={`table-${elements.length}`}>
            <thead>
              <tr>
                {headerRow.map((cell, i) => (
                  <th key={i}>{formatInlineCode(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{formatInlineCode(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Check for diagram block
      if (line.trim().startsWith('```diagram')) {
        inDiagramBlock = true;
        diagramType = line.replace('```diagram', '').trim() || 'tree';
        diagramContent = '';
        return;
      }
      
      if (inDiagramBlock && line.trim().startsWith('```')) {
        try {
          const diagramData = JSON.parse(diagramContent.trim());
          elements.push(
            <HierarchyDiagram 
              key={`diagram-${index}`}
              data={diagramData}
              type={diagramType}
            />
          );
        } catch (e) {
          console.error('Error parsing diagram:', e);
        }
        diagramContent = '';
        inDiagramBlock = false;
        diagramType = '';
        return;
      }
      
      if (inDiagramBlock) {
        diagramContent += line + '\n';
        return;
      }

      // Check for image/GIF syntax: ![alt](url) or !gif[alt](url)
      const imageMatchEarly = line.match(/!gif\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatchEarly) {
        const [, alt, src] = imageMatchEarly;
        elements.push(
          <ImageGif 
            key={`gif-${index}`}
            src={src}
            alt={alt}
            type="gif"
          />
        );
        return;
      }
      
      const staticImageMatchEarly = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (staticImageMatchEarly) {
        const [, alt, src] = staticImageMatchEarly;
        elements.push(
          <ImageGif 
            key={`img-${index}`}
            src={src}
            alt={alt}
            type="image"
          />
        );
        return;
      }
      
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          const blockId = `content-code-${index}`;
          const trimmedCode = codeContent.trim();
          elements.push(
            <div key={`code-wrapper-${index}`} style={{ position: 'relative', margin: '1rem 0' }}>
              <button
                className="code-btn"
                style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 1 }}
                onClick={() => copyToClipboard(trimmedCode, blockId, 'copy_content_code')}
                aria-label={copiedBlockId === blockId ? 'Code copied' : 'Copy code block'}
              >
                {copiedBlockId === blockId ? <Check size={14} /> : <Copy size={14} />}
                {copiedBlockId === blockId ? 'Copied!' : 'Copy'}
              </button>
              <SyntaxHighlighter
                language="java"
                style={codeTheme}
                showLineNumbers={false}
                customStyle={{
                  borderRadius: '8px',
                  padding: '1rem',
                  paddingTop: '2.8rem',
                  fontSize: '0.9rem',
                  margin: 0
                }}
              >
                {trimmedCode}
              </SyntaxHighlighter>
            </div>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          flushTable();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Markdown tables must run before generic [text](url) lines — otherwise "| Col | [Link](/path) |" breaks the table
      if (line.includes('|') && line.trim().startsWith('|')) {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cells.length > 0 && !cells[0].match(/^[-:]+$/)) {
          tableRows.push(cells);
          inTable = true;
        } else if (cells[0]?.match(/^[-:]+$/)) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }
      
      // Check for markdown links: [text](url) - but not images
      if (!line.trim().startsWith('!')) {
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          // Check if it's an internal route
          if (url.startsWith('/')) {
            const normalizedUrl = normalizeInternalTutorialLink(url);
            // Special handling for exam start link
            if (normalizedUrl === '/core-java-mcq' || normalizedUrl.includes('mcq')) {
              elements.push(
                <div key={`link-container-${index}`} style={{ margin: '2rem 0', textAlign: 'center' }}>
                  <Link
                    to={normalizedUrl}
                    style={{
                      display: 'inline-block',
                      padding: '1rem 2.5rem',
                      background: 'var(--gradient-primary)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.35)';
                    }}
                  >
                    🚀 {text}
                  </Link>
                </div>
              );
            } else {
              elements.push(
                <Link
                  key={`link-${index}`}
                  to={normalizedUrl}
                  style={{
                    color: '#3b82f6',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                >
                  {text}
                </Link>
              );
            }
            // Remove the link from the line and continue processing remaining text
            const beforeLink = line.substring(0, line.indexOf('['));
            const afterLink = line.substring(line.indexOf(')') + 1);
            if (beforeLink.trim()) {
              elements.push(<span key={`text-before-${index}`}>{formatInlineCode(beforeLink)}</span>);
            }
            if (afterLink.trim()) {
              elements.push(<span key={`text-after-${index}`}>{formatInlineCode(afterLink)}</span>);
            }
            return;
          } else {
            // External link
            const beforeLink = line.substring(0, line.indexOf('['));
            const afterLink = line.substring(line.indexOf(')') + 1);
            if (beforeLink.trim()) {
              elements.push(<span key={`text-before-${index}`}>{beforeLink}</span>);
            }
            elements.push(
              <a
                key={`link-${index}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'underline'
                }}
              >
                {text}
              </a>
            );
            if (afterLink.trim()) {
              elements.push(<span key={`text-after-${index}`}>{afterLink}</span>);
            }
            return;
          }
        }
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={index}>{line.slice(2)}</h1>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index}>{line.slice(4)}</h3>);
        return;
      }

      if (line.startsWith('> ')) {
        const quoteBody = line.slice(2);
        const isGithubRepoCta =
          quoteBody.includes('github.com/LearnStackHub/Jdbc') ||
          quoteBody.includes('github.com/learnstackhub/jdbc');
        elements.push(
          <blockquote
            key={index}
            className={isGithubRepoCta ? 'tutorial-github-repo-cta' : undefined}
          >
            <p>{formatInlineCode(quoteBody)}</p>
          </blockquote>
        );
        return;
      }

      if (line.match(/^[-*]\s/)) {
        elements.push(<li key={index}>{formatInlineCode(line.slice(2))}</li>);
        return;
      }

      if (line.trim()) {
        elements.push(<p key={index}>{formatInlineCode(line)}</p>);
      }
    });

    flushTable();
    return elements;
  };

  const formatInlineCode = (text) => {
    // First, handle markdown links [text](/path) - supports both /tutorial/ and other routes
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        parts.push(...parseInlineFormatting(beforeText));
      }
      
      // Add link
      const linkText = match[1];
      const linkPath = normalizeInternalTutorialLink(match[2]);
      
      // Special styling for exam start link
      if (linkPath === '/core-java-mcq' || linkPath.includes('mcq')) {
        parts.push(
          <div key={`link-container-${match.index}`} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <Link
              to={linkPath}
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'var(--gradient-primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.35)';
              }}
            >
              🚀 {linkText}
            </Link>
          </div>
        );
      } else if (linkPath.startsWith('/')) {
        // Internal route
        parts.push(
          <Link 
            key={`link-${match.index}`}
            to={linkPath}
            style={{
              color: 'var(--accent-primary)',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            {linkText}
          </Link>
        );
      } else {
        // External link
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkPath}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent-primary)',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            {linkText}
          </a>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...parseInlineFormatting(remainingText));
    }
    
    return parts.length > 0 ? parts : [text];
  };
  
  const parseInlineFormatting = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const isJspTopic = resolvedTopicId?.startsWith('jsp-');

  const tutorialInteractiveShowcases = (
    <>
      {resolvedTopicId === 'java-introduction' && <JavaIntroductionShowcase />}
      {resolvedTopicId === 'java-features' && <JavaFeaturesShowcase />}
      {resolvedTopicId === 'java-syntax' && <JavaSyntaxShowcase />}
      {resolvedTopicId === 'java-variables' && <JavaVariablesShowcase />}
      {resolvedTopicId === 'java-operators' && <JavaOperatorsShowcase />}
      {resolvedTopicId === 'java-methods' && <JavaMethodsShowcase />}
      {resolvedTopicId === 'java-keywords' && <JavaKeywordsShowcase />}
      {resolvedTopicId === 'if-else' && <IfElseShowcase />}
      {resolvedTopicId === 'switch-statement' && <SwitchStatementShowcase />}
      {resolvedTopicId === 'for-loop' && <ForLoopShowcase />}
      {resolvedTopicId === 'while-loop' && <WhileLoopShowcase />}
      {resolvedTopicId === 'do-while-loop' && <DoWhileLoopShowcase />}
      {resolvedTopicId === 'break-continue' && <BreakContinueShowcase />}
      {resolvedTopicId === 'oops-introduction' && <OopsIntroductionShowcase />}
      {resolvedTopicId === 'classes-objects' && <ClassesObjectsShowcase />}
      {resolvedTopicId === 'constructors' && <ConstructorsShowcase />}
      {resolvedTopicId === 'inheritance' && <InheritanceShowcase />}
      {resolvedTopicId === 'polymorphism' && <PolymorphismShowcase />}
      {resolvedTopicId === 'abstraction' && <AbstractionShowcase />}
      {resolvedTopicId === 'encapsulation' && <EncapsulationShowcase />}
      {resolvedTopicId === 'interfaces' && <InterfacesShowcase />}
      {resolvedTopicId === 'string-introduction' && <StringIntroductionShowcase />}
      {resolvedTopicId === 'string-methods' && <StringMethodsShowcase />}
      {resolvedTopicId === 'string-buffer' && <StringBufferShowcase />}
      {resolvedTopicId === 'string-builder' && <StringBuilderShowcase />}
      {resolvedTopicId === 'array-introduction' && <ArrayIntroductionShowcase />}
      {resolvedTopicId === 'single-dimensional-array' && <SingleDimensionalArrayShowcase />}
      {resolvedTopicId === 'multi-dimensional-array' && <MultiDimensionalArrayShowcase />}
      {resolvedTopicId === 'array-methods' && <ArrayMethodsShowcase />}
      {resolvedTopicId === 'java-data-types' && <JavaDataTypesShowcase />}
      {resolvedTopicId === 'java-environment-setup' && <JavaEnvironmentSetupShowcase />}
      {resolvedTopicId === 'exception-introduction' && <ExceptionIntroductionShowcase />}
      {resolvedTopicId === 'try-catch-finally' && <TryCatchFinallyShowcase />}
      {resolvedTopicId === 'throw-throws' && <ThrowThrowsShowcase />}
      {resolvedTopicId === 'custom-exceptions' && <CustomExceptionsShowcase />}
      {resolvedTopicId === 'global-exception-handling' && <GlobalExceptionHandlingShowcase />}
      {resolvedTopicId === 'collection-introduction' && <CollectionIntroductionShowcase />}
      {resolvedTopicId === 'list-interface' && <ListInterfaceShowcase />}
      {resolvedTopicId === 'set-interface' && <SetInterfaceShowcase />}
      {resolvedTopicId === 'map-interface' && <MapInterfaceShowcase />}
      {resolvedTopicId === 'queue-interface' && <QueueInterfaceShowcase />}
      {resolvedTopicId === 'synchronization' && <SynchronizationShowcase />}
      {resolvedTopicId === 'serialization' && <SerializationShowcase />}
      {resolvedTopicId === 'thread-introduction' && <ThreadIntroductionShowcase />}
      {resolvedTopicId === 'thread-creation' && <ThreadCreationShowcase />}
      {resolvedTopicId === 'thread-lifecycle' && <ThreadLifecycleShowcase />}
      {resolvedTopicId === 'thread-methods' && <ThreadMethodsShowcase />}
      {resolvedTopicId === 'spring-boot-introduction' && <SpringBootIntroductionShowcase />}
      {resolvedTopicId === 'spring-boot-project-setup' && <SpringBootProjectSetupShowcase />}
      {resolvedTopicId === 'spring-boot-configuration' && <SpringBootConfigurationShowcase />}
      {resolvedTopicId === 'spring-boot-rest-api' && <SpringBootRestAPIShowcase />}
      {resolvedTopicId === 'spring-boot-jpa' && <SpringBootJPAShowcase />}
      {resolvedTopicId === 'spring-boot-exception-handling' && <SpringBootExceptionHandlingShowcase />}
      {resolvedTopicId === 'spring-boot-validation' && <SpringBootValidationShowcase />}
      {resolvedTopicId === 'spring-boot-security' && <SpringBootSecurityShowcase />}
      {resolvedTopicId === 'spring-boot-smtp' && <SpringBootSMTPShowcase />}
      {resolvedTopicId === 'spring-boot-postman-swagger' && <SpringBootPostmanSwaggerShowcase />}
      {resolvedTopicId === 'spring-boot-testing' && <SpringBootTestingShowcase />}
      {resolvedTopicId === 'spring-boot-deployment' && <SpringBootDeploymentShowcase />}
      {resolvedTopicId === 'spring-boot-actuator' && <SpringBootActuatorShowcase />}
      {resolvedTopicId === 'spring-boot-interview-questions' && <SpringBootInterviewQuestionsShowcase />}
      {resolvedTopicId === 'spring-introduction' && <SpringFrameworkIntroductionShowcase />}
      {resolvedTopicId === 'spring-ioc' && <SpringFrameworkIOCShowcase />}
      {resolvedTopicId === 'spring-di' && <SpringFrameworkDIShowcase />}
      {resolvedTopicId === 'spring-bean' && <SpringFrameworkBeanShowcase />}
      {resolvedTopicId === 'spring-applicationcontext' && <SpringFrameworkApplicationContextShowcase />}
      {resolvedTopicId === 'spring-configuration-xml' && <SpringFrameworkConfigurationXmlShowcase />}
      {resolvedTopicId === 'spring-configuration-annotation' && <SpringFrameworkConfigurationAnnotationShowcase />}
      {resolvedTopicId === 'spring-mvc-dispatcherservlet' && <SpringFrameworkDispatcherServletShowcase />}
      {resolvedTopicId === 'spring-mvc-controller' && <SpringFrameworkMVCControllerShowcase />}
      {resolvedTopicId === 'spring-mvc-viewresolver' && <SpringFrameworkMVCViewResolverShowcase />}
      {resolvedTopicId === 'spring-mvc-modelandview' && <SpringFrameworkMVCModelAndViewShowcase />}
      {resolvedTopicId === 'spring-project-login-student-crud' && <SpringFrameworkProjectCrudShowcase />}
      {resolvedTopicId === 'spring-data-introduction' && <SpringFrameworkDataIntroductionShowcase />}
      {resolvedTopicId === 'spring-data-repository-architecture' && <SpringFrameworkDataRepositoryArchitectureShowcase />}
      {resolvedTopicId === 'spring-jdbc-template' && <SpringFrameworkJdbcTemplateShowcase />}
      {resolvedTopicId === 'spring-data-custom-queries' && <SpringFrameworkDataCustomQueriesShowcase />}
      {resolvedTopicId === 'spring-aop-introduction' && <SpringFrameworkAOPIntroductionShowcase />}
      {resolvedTopicId === 'spring-aop-advanced-pointcuts' && <SpringFrameworkAOPAdvancedPointcutsShowcase />}
      {resolvedTopicId === 'spring-aop-custom-annotations' && <SpringFrameworkAOPCustomAnnotationsShowcase />}
      {resolvedTopicId === 'spring-aop-aspect-ordering' && <SpringFrameworkAOPAspectOrderingShowcase />}
      {resolvedTopicId === 'spring-aop-spring-boot' && <SpringFrameworkAOPWithSpringBootShowcase />}
      {resolvedTopicId === 'spring-interview-questions' && <SpringFrameworkInterviewQuestionsShowcase />}
      {JDBC_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <JdbcShowcaseRouter topicId={resolvedTopicId} />}
      {SERVLET_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <ServletShowcaseRouter topicId={resolvedTopicId} />}
      {JSP_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <JspShowcaseRouter topicId={resolvedTopicId} />}
      {HIBERNATE_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <HibernateShowcaseRouter topicId={resolvedTopicId} />}
      {SPRING_CLOUD_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <SpringCloudShowcaseRouter topicId={resolvedTopicId} />}
      {HTTP_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <HttpShowcaseRouter topicId={resolvedTopicId} />}
      {MYSQL_SHOWCASE_TOPIC_IDS.has(resolvedTopicId) && <MySQLShowcaseRouter topicId={resolvedTopicId} />}
    </>
  );

  return (
    <div className={`tutorial-page fade-in${isMysqlTopic ? ' tutorial-page--mysql' : ''}${isJspTopic ? ' tutorial-page--jsp' : ''}${isJdbcTopic ? ' tutorial-page--jdbc' : ''}`}>
      <SEOHead topicId={resolvedTopicId} topic={currentTopic} />
      <StructuredData topicId={resolvedTopicId} topic={currentTopic} type="Article" />
      {/* Breadcrumb */}
      <div className="tutorial-breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>{currentTopic.courseTitle || 'Core Java'}</span>
        <ChevronRight size={14} />
        <span>{currentTopic.sectionTitle || 'Tutorial'}</span>
        <ChevronRight size={14} />
        <span>{currentTopic.title}</span>
      </div>

      {/* Header */}
      <div className={`tutorial-header${isMysqlTopic ? ' tutorial-header--mysql' : ''}${isJspTopic ? ' tutorial-header--jsp' : ''}${isJdbcTopic ? ' tutorial-header--jdbc' : ''}`}>
        <div className="tutorial-header-top">
          <h1 className="tutorial-title">{generateSEOTitle(currentTopic)}</h1>
        </div>
        <div className="tutorial-meta">
          <span>
            <BookOpen size={16} />
            {currentTopic.sectionTitle || 'Tutorial'}
          </span>
          <span>
            <Clock size={16} />
            ~{estimatedReadTime} min read
          </span>
          <span>
            <Calendar size={16} />
            Updated {lastUpdatedDisplay}
          </span>
        </div>
      </div>

      {/* Contributor Badge - Show who added/edited */}
      {contribution && (
        <ContributorBadge contribution={contribution} />
      )}

      {/* In-Content Ad - Top */}
      {shouldShowInContentAds && (
        <div className="in-content-ad-top">
          <AdSense 
            adSlot={ADSENSE_CONFIG.adSlots.inContentTop}
            adFormat="horizontal"
            className="in-content-ad-unit"
            style={{ margin: '2rem auto', maxWidth: '728px' }}
          />
        </div>
      )}

      {/* Content */}
      <div className={`tutorial-content${isMysqlTopic ? ' tutorial-content--mysql' : ''}${isJspTopic ? ' tutorial-content--jsp' : ''}${isJdbcTopic ? ' tutorial-content--jdbc' : ''}`}>
        {isMysqlTopic && resolvedTopicId !== 'mysql-mcq' && resolvedTopicId !== 'mysql-interview-questions' && (
          <div className="mysql-interview-notice" role="note">
            <strong>Interview questions on this page:</strong> each MySQL lesson includes{' '}
            <strong>10 important interview questions with full answers</strong> and a <strong>related tutorials</strong> table. Scroll past the main article (before “Test Your Knowledge”) or use your browser find for <strong>Interview Questions</strong>.
          </div>
        )}
        {isJspTopic && (
          <div className="jsp-interview-notice" role="note">
            <strong>Interview prep on this page:</strong> each JSP lesson ends with{' '}
            <strong>10 fresher-level interview Q&amp;As</strong> and a <strong>related tutorials</strong> table (with links). Use your browser find for <strong>Interview Questions</strong> to jump there quickly.
          </div>
        )}
        {isJdbcTopic && (
          <div className="jdbc-interview-notice" role="note">
            <strong>Interview prep on this page:</strong> each JDBC lesson includes{' '}
            <strong>10 topic-specific interview questions with full explanatory answers</strong>. Scroll near the end of the lesson or search for <strong>Interview Questions</strong> to jump directly.
          </div>
        )}
        {isCoreJavaTopic && (
          <div className="jdbc-interview-notice" role="note">
            <strong>Interview prep on this page:</strong> each Core Java lesson includes{' '}
            <strong>10 important interview questions with full answers</strong> in the article below. Interactive code showcases appear first; the full lesson text (including Q&amp;A) follows. Use your browser find for <strong>Interview Questions</strong> to jump there quickly.
          </div>
        )}
        {isCoreJavaTopic ? (
          <>
            {tutorialInteractiveShowcases}
            {renderContent(currentTopic.content)}
          </>
        ) : (
          <>
            {tutorialInteractiveShowcases}
            {renderContent(currentTopic.content)}
          </>
        )}
        
        {/* Internal Links Section */}
        <InternalLinks 
          currentTopicId={resolvedTopicId} 
          courseTitle={currentTopic.courseTitle}
        />
        
        {/* FAQ Section */}
        <FAQSection 
          topicId={resolvedTopicId}
          courseTitle={currentTopic.courseTitle}
        />

        <section
          aria-label="Article author"
          style={{
            marginTop: '2rem',
            padding: '1rem 1.25rem',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            background: 'var(--bg-secondary)',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Written by:</p>
          <p style={{ margin: '0.45rem 0 0', fontWeight: 700, fontSize: '1.05rem' }}>{authorProfile.name}</p>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>{authorProfile.role}</p>
          <p style={{ margin: '0.15rem 0 0', color: 'var(--text-secondary)' }}>{authorProfile.expertise}</p>
        </section>
      </div>

      {/* Code Example (Java tutorials only; MySQL/Servlet tracks use article body examples) */}
      {currentTopic.code && !isMysqlTopic && !isServletTopic && !isJdbcTopic && !isHibernateTopic && !isCoreJavaTopic && !isHtmlCssTopic && (
        <div className="code-block">
          <div className="code-header">
            <div className="code-language">
              <Code size={16} />
              <span>Java</span>
            </div>
            <div className="code-actions">
              <button className="code-btn" onClick={copyCode}>
                {copiedBlockId === 'topic-main-code' ? <Check size={14} /> : <Copy size={14} />}
                {copiedBlockId === 'topic-main-code' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="code-content">
            <SyntaxHighlighter 
              language="java" 
              style={codeTheme}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                fontSize: '0.9rem'
              }}
            >
              {currentTopic.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Try It Yourself Editor (Java-only; MySQL/Servlet lessons use static in-article examples) */}
      {currentTopic.code && !isMysqlTopic && !isServletTopic && !isJdbcTopic && !isHibernateTopic && !isCoreJavaTopic && !isHtmlCssTopic && (
        <div className="try-it-section">
          <div className="try-it-header">
            <div className="try-it-title">
              <Play size={18} />
              <span>Try It Yourself - Live Code Editor</span>
            </div>
            <div className="try-it-actions">
              <button className="run-btn" onClick={resetCode} style={{ background: 'var(--bg-secondary)' }}>
                <RotateCcw size={14} />
                Reset
              </button>
              <button className="run-btn" onClick={runCode} disabled={isRunning}>
                {isRunning ? <Loader2 size={14} className="spinning" /> : <Play size={14} />}
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          
          <div className="try-it-editor">
            {CodeMirrorComponent && javaLang ? (
              <CodeMirrorComponent
                value={editorCode}
                height="350px"
                extensions={[javaLang()]}
                onChange={onChange}
                theme="dark"
                style={{
                  fontSize: '0.9rem'
                }}
              />
            ) : (
              <div style={{ 
                padding: '1rem', 
                background: '#1e293b', 
                color: '#fff', 
                minHeight: '350px', 
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                overflow: 'auto'
              }}>
                {editorCode || 'Loading code editor...'}
              </div>
            )}
          </div>
          
          <div className="try-it-output">
            <div className="try-it-output-header">
              <Terminal size={14} />
              <span>Output</span>
            </div>
            <div className="try-it-output-content">
              {output}
            </div>
          </div>
        </div>
      )}

      {/* Practice Questions */}
      {currentTopic.practiceQuestions && currentTopic.practiceQuestions.length > 0 && (
        <div className="practice-section">
          <h2>Practice Questions</h2>
          {currentTopic.practiceQuestions.map((q, index) => (
            <div key={index} className="practice-question">
              <h4>Question {index + 1}: {q.question}</h4>
              <p className="hint"><strong>Hint:</strong> {q.hint}</p>
              {q.starterCode && (
                <div className="starter-code">
                  <button
                    className="code-btn"
                    style={{ marginBottom: '0.5rem' }}
                    onClick={() => copyToClipboard(q.starterCode, `starter-code-${index}`, 'copy_starter_code')}
                    aria-label={copiedBlockId === `starter-code-${index}` ? 'Code copied' : 'Copy starter code'}
                  >
                    {copiedBlockId === `starter-code-${index}` ? <Check size={14} /> : <Copy size={14} />}
                    {copiedBlockId === `starter-code-${index}` ? 'Copied!' : 'Copy'}
                  </button>
                  <SyntaxHighlighter 
                    language="java" 
                    style={codeTheme}
                    showLineNumbers={false}
                    customStyle={{
                      borderRadius: '8px',
                      padding: '1rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    {q.starterCode}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* In-Content Ad - Bottom */}
      {shouldShowInContentAds && (
        <div className="in-content-ad-bottom">
          <AdSense 
            adSlot={ADSENSE_CONFIG.adSlots.inContentBottom}
            adFormat="horizontal"
            className="in-content-ad-unit"
            style={{ margin: '2rem auto', maxWidth: '728px' }}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="tutorial-navigation">
        {navigation.prev ? (
          <Link 
            to={getTopicPath(navigation.prev.id)}
            className="nav-btn prev"
          >
            <ArrowLeft size={20} />
            <div className="nav-btn-content">
              <span className="nav-btn-label">Previous</span>
              <span className="nav-btn-title">{navigation.prev.title}</span>
            </div>
          </Link>
        ) : <div />}
        
        {navigation.next ? (
          <Link 
            to={getTopicPath(navigation.next.id)}
            className="nav-btn next"
          >
            <div className="nav-btn-content" style={{ textAlign: 'right' }}>
              <span className="nav-btn-label">Next</span>
              <span className="nav-btn-title">{navigation.next.title}</span>
            </div>
            <ArrowRight size={20} />
          </Link>
        ) : <div />}
      </div>

      <TutorialFloatingChat
        topicId={resolvedTopicId}
        topicTitle={currentTopic.title}
        courseTitle={currentTopic.courseTitle || 'Tutorial'}
      />
    </div>
  );
}

export default Tutorial;
