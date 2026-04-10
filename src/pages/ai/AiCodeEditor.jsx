import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Maximize2, Minimize2, Play } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
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
  javascript: `const name = "LearnStackHub";
console.log(\`Hello, \${name}!\`);`,
  python: `name = "LearnStackHub"
print(f"Hello, {name}!")`,
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
  const shellRef = useRef(null);

  const output = useMemo(() => getOutputText(result), [result]);
  const editorExtensions = useMemo(() => {
    const langExt = {
      java: java(),
      javascript: javascript(),
      python: python(),
    }[language];
    return [langExt, autocompletion()];
  }, [language]);

  useEffect(() => {
    setCode(STARTER[language]);
    setResult(null);
    setRunError('');
  }, [language]);

  async function runCode(nextCode = code, nextInput = customInput) {
    const trimmed = nextCode.trim();
    if (!trimmed || running) return;
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
        description="Write and run Java, JavaScript, and Python code in a live browser editor."
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
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
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
              Optional stdin input
            </label>
            <textarea
              id="ai-code-input"
              className="ai-code-input"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              spellCheck={false}
              placeholder="Input passed to your program..."
            />
          </div>

          <div>
            <label htmlFor="ai-code-output" className="ai-code-label">
              Output
            </label>
            <pre id="ai-code-output" className="ai-code-output">
              {runError || output || 'Run code to see output here.'}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AiCodeEditor;
