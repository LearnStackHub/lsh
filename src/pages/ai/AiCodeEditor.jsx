import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Maximize2, Minimize2, Play } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { MySQL, sql } from '@codemirror/lang-sql';
import SEOHead from '../../components/SEOHead';
import { executeWithPiston } from '../../services/codeExecutor';
import './ai-lab.css';

const STARTER = {
  java: `public class Main {
  public static void main(String[] args) {
    String name = "LearnStackHub";
    System.out.println("Hello, " + name + "!");
  }
}`,
  html: `<!doctype html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; padding: 16px; }
      h1 { color: #2563eb; }
    </style>
  </head>
  <body>
    <h1>Hello LearnStackHub</h1>
    <p>Edit HTML/CSS and click Run code for live preview.</p>
  </body>
</html>`,
  mysql: `-- MySQL practice (in-browser SQL sandbox)
CREATE TABLE students (id INT, name STRING, score INT);
INSERT INTO students VALUES (1, 'Asha', 91), (2, 'Rahul', 84), (3, 'Mina', 95);
SELECT * FROM students ORDER BY score DESC;`,
};

function getOutputText(result) {
  if (!result) return '';
  const out = (result.output || '').trim();
  const err = (result.error || '').trim();
  if (out && err) return `${out}\n\n[stderr]\n${err}`;
  if (out) return out;
  if (err) return err;
  return 'Program finished with no output.';
}

function AiCodeEditor() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(STARTER.java);
  const [customInput, setCustomInput] = useState('');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [runError, setRunError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState(STARTER.html);
  const shellRef = useRef(null);

  const output = useMemo(() => getOutputText(result), [result]);
  const editorExtensions = useMemo(() => {
    const langExt = {
      java: java(),
      html: html(),
      mysql: sql({ dialect: MySQL }),
    }[language];
    return [langExt, autocompletion()];
  }, [language]);

  useEffect(() => {
    setCode(STARTER[language]);
    setResult(null);
    setRunError('');
    if (language === 'html') {
      setHtmlPreview(STARTER.html);
    }
  }, [language]);

  async function runCode(nextCode = code, nextInput = customInput) {
    const trimmed = nextCode.trim();
    if (!trimmed || running) return;
    if (language === 'html') {
      setRunError('');
      setResult({ success: true, output: 'Rendered HTML preview.', error: '' });
      setHtmlPreview(nextCode);
      return;
    }
    if (language === 'mysql') {
      setRunError('');
      try {
        const alasql = (await import('alasql')).default;
        const value = alasql(nextCode);
        const formatted = Array.isArray(value) ? JSON.stringify(value, null, 2) : String(value);
        setResult({ success: true, output: formatted || 'Query executed.', error: '' });
      } catch (err) {
        setResult({
          success: false,
          output: '',
          error: err instanceof Error ? err.message : 'MySQL query failed',
        });
      }
      return;
    }
    setRunning(true);
    setRunError('');
    try {
      const response = await executeWithPiston(trimmed, language, nextInput);
      setResult(response);
      if (!response.success && !response.error) {
        setRunError('Code execution failed. Please review your code and try again.');
      }
    } catch (err) {
      setResult(null);
      setRunError(err instanceof Error ? err.message : 'Execution failed');
    } finally {
      setRunning(false);
    }
  }

  useEffect(() => {
    if (!autoRun) return undefined;
    const id = window.setTimeout(() => {
      runCode(code, customInput);
    }, 700);
    return () => window.clearTimeout(id);
  }, [autoRun, code, customInput]);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isFullscreen]);

  async function toggleFullscreen() {
    if (!document.fullscreenElement && shellRef.current?.requestFullscreen) {
      await shellRef.current.requestFullscreen();
      return;
    }
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  }

  return (
    <div className="ai-lab-page ai-code-page">
      <SEOHead
        title="Live Code Editor | LearnStackHub"
        description="Write and run Java, HTML, and MySQL in a live browser editor."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>

      <section ref={shellRef} className={`ai-panel ai-code-shell ${isFullscreen ? 'ai-code-shell--fullscreen' : ''}`}>
        <div className="ai-code-topbar">
          <div>
            <h1 className="ai-code-title">Live code editor</h1>
            <p className="ai-code-subtitle">Write code, run instantly, and inspect output in one place.</p>
          </div>
          <div className="ai-code-controls">
            <select
              className="ai-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Programming language"
            >
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="mysql">MySQL</option>
            </select>
            <label className="ai-code-toggle">
              <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} />
              Auto run
            </label>
            <button type="button" className="ai-btn" onClick={() => runCode()} disabled={running}>
              {running ? (
                <>
                  <Loader2 className="ai-chat-spin" size={16} aria-hidden />
                  Running
                </>
              ) : (
                <>
                  <Play size={16} aria-hidden />
                  Run code
                </>
              )}
            </button>
            <button type="button" className="ai-btn secondary" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 size={16} aria-hidden /> : <Maximize2 size={16} aria-hidden />}
              {isFullscreen ? 'Exit full screen' : 'Full screen'}
            </button>
          </div>
        </div>

        <div className="ai-code-grid">
          <div>
            <label htmlFor="ai-code-editor" className="ai-code-label">
              Source code
            </label>
            <CodeMirror
              value={code}
              height={isFullscreen ? 'calc(100vh - 260px)' : '560px'}
              theme="dark"
              extensions={editorExtensions}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                autocompletion: true,
                bracketMatching: true,
                closeBrackets: true,
                highlightSelectionMatches: true,
              }}
              className="ai-code-editor-cm"
            />
            <label htmlFor="ai-code-input" className="ai-code-label">
              {language === 'java' ? 'Optional stdin input' : 'Mode details'}
            </label>
            {language === 'java' ? (
              <textarea
                id="ai-code-input"
                className="ai-code-input"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                spellCheck={false}
                placeholder="Input passed to your program..."
              />
            ) : (
              <div className="ai-code-note">
                {language === 'html'
                  ? 'HTML mode renders output in live preview.'
                  : 'MySQL mode runs queries directly in browser sandbox.'}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="ai-code-output" className="ai-code-label">
              {language === 'html' ? 'Live preview' : 'Output'}
            </label>
            {language === 'html' ? (
              <iframe
                title="HTML live preview"
                className="ai-code-output ai-code-preview"
                sandbox="allow-scripts"
                srcDoc={htmlPreview}
              />
            ) : (
              <pre id="ai-code-output" className="ai-code-output">
                {runError || output || 'Run code to see output here.'}
              </pre>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AiCodeEditor;
