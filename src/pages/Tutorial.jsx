import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import InternalLinks from '../components/InternalLinks';
import { generateSEOTitle } from '../utils/seoHelpers';
import { trackTutorialView, trackButtonClick } from '../config/analytics';

SyntaxHighlighter.registerLanguage('java', java);

function Tutorial() {
  const { topicId } = useParams();
  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to execute your code');
  const [isRunning, setIsRunning] = useState(false);
  const { getContribution } = useContributions();

  // Get current topic data - check user contributions first
  const contribution = getContribution(topicId);
  const originalTopic = getTopicById(topicId);
  
  // Use contribution data if available, otherwise use original topic
  const currentTopic = contribution ? {
    ...originalTopic,
    ...contribution,
    title: contribution.title || originalTopic?.title,
    content: contribution.content || originalTopic?.content,
    code: contribution.code || originalTopic?.code
  } : originalTopic;

  const navigation = getNavigation(topicId);
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
    if (!content) return 5;
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
    if (currentTopic?.code) {
      setEditorCode(currentTopic.code);
      setOutput('Click "Run Code" to execute your code');
    }
  }, [currentTopic]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track tutorial view in Google Analytics
    if (currentTopic) {
      trackTutorialView(topicId, currentTopic.title);
    }
  }, [topicId, currentTopic]);

  const copyCode = async () => {
    if (currentTopic?.code) {
      await navigator.clipboard.writeText(currentTopic.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track copy code action
      trackButtonClick('copy_code', 'tutorial');
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
    if (currentTopic?.code && !CodeMirrorComponent) {
      Promise.all([
        import('@uiw/react-codemirror'),
        import('@codemirror/lang-java')
      ]).then(([codemirrorModule, javaModule]) => {
        setCodeMirrorComponent(() => codemirrorModule.default);
        setJavaLang(() => javaModule.java);
      });
    }
  }, [currentTopic?.code, CodeMirrorComponent]);

  const onChange = useCallback((value) => {
    setEditorCode(value);
  }, []);

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
    const lines = content.split('\n');
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
                {headerRow.map((cell, i) => <th key={i}>{cell}</th>)}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
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
      
      // Check for markdown links: [text](url) - but not images
      if (!line.trim().startsWith('!')) {
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          // Check if it's an internal route
          if (url.startsWith('/')) {
            // Special handling for exam start link
            if (url === '/core-java-mcq' || url.includes('mcq')) {
              elements.push(
                <div key={`link-container-${index}`} style={{ margin: '2rem 0', textAlign: 'center' }}>
                  <Link
                    to={url}
                    style={{
                      display: 'inline-block',
                      padding: '1rem 2.5rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
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
                  to={url}
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
      
      // Check for image/GIF syntax: ![alt](url) or !gif[alt](url)
      const imageMatch = line.match(/!gif\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
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
      
      const staticImageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (staticImageMatch) {
        const [, alt, src] = staticImageMatch;
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
          elements.push(
            <SyntaxHighlighter 
              key={`code-${index}`}
              language="java" 
              style={codeTheme}
              showLineNumbers={false}
              customStyle={{
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.9rem',
                margin: '1rem 0'
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
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
        elements.push(
          <blockquote key={index}>
            <p>{line.slice(2)}</p>
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
      const linkPath = match[2];
      
      // Special styling for exam start link
      if (linkPath === '/core-java-mcq' || linkPath.includes('mcq')) {
        parts.push(
          <div key={`link-container-${match.index}`} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <Link
              to={linkPath}
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
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

  // Handle case when topic is not found
  if (!currentTopic) {
    return (
      <div className="tutorial-page fade-in">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <SEOHead title="Topic Not Found - LearnStackHub" noindex />
          <h1>Topic Not Found</h1>
          <p>The tutorial topic "{topicId}" could not be found.</p>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tutorial-page fade-in">
      <SEOHead topicId={topicId} />
      <StructuredData topicId={topicId} type="Article" />
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
      <div className="tutorial-header">
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
      <div className="in-content-ad-top">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.inContentTop}
          adFormat="horizontal"
          className="in-content-ad-unit"
          style={{ margin: '2rem auto', maxWidth: '728px' }}
        />
      </div>

      {/* Content */}
      <div className="tutorial-content">
        {renderContent(currentTopic.content)}
        
        {/* Internal Links Section */}
        <InternalLinks 
          currentTopicId={topicId} 
          courseTitle={currentTopic.courseTitle}
        />
        
        {/* FAQ Section */}
        <FAQSection 
          topicId={topicId}
          courseTitle={currentTopic.courseTitle}
        />
      </div>

      {/* Code Example */}
      {currentTopic.code && (
        <div className="code-block">
          <div className="code-header">
            <div className="code-language">
              <Code size={16} />
              <span>Java</span>
            </div>
            <div className="code-actions">
              <button className="code-btn" onClick={copyCode}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
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

      {/* Try It Yourself Editor */}
      {currentTopic.code && (
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
      <div className="in-content-ad-bottom">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.inContentBottom}
          adFormat="horizontal"
          className="in-content-ad-unit"
          style={{ margin: '2rem auto', maxWidth: '728px' }}
        />
      </div>

      {/* Navigation */}
      <div className="tutorial-navigation">
        {navigation.prev ? (
          <Link 
            to={`/tutorial/${navigation.prev.id}`}
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
            to={`/tutorial/${navigation.next.id}`}
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

    </div>
  );
}

export default Tutorial;
