import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
const INTERVIEW_DURATION_MS = 30 * 60 * 1000;
const MIN_API_GAP_MS = 2000;
let lastApiCallAt = 0;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function speakQuestion(text) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1;
  window.speechSynthesis.speak(u);
}

function summarizeResume(raw) {
  const text = String(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, ' ')
    .trim();
  if (!text) return '';
  const compact = text.slice(0, 350);
  const skillsMatch = text.match(
    /\b(java|spring boot|spring|microservices|aws|docker|mysql|oracle|hibernate|rest)\b/gi,
  );
  const uniqSkills = [...new Set((skillsMatch || []).map((s) => s.toLowerCase()))].slice(0, 8);
  const yearsMatch = text.match(/(\d+)\+?\s*years?/i);
  const years = yearsMatch ? yearsMatch[0] : '';
  const roleMatch = text.match(/(senior java developer|java developer|software engineer|backend developer)/i);
  const role = roleMatch ? roleMatch[0] : 'Software developer';
  const skillPart = uniqSkills.length ? `Skills: ${uniqSkills.join(', ')}` : '';
  return `${role}${years ? `, ${years} experience` : ''}. ${skillPart}. ${compact}`.slice(0, 520).trim();
}

async function callInterviewApi(payload) {
  const now = Date.now();
  const elapsed = now - lastApiCallAt;
  if (elapsed < MIN_API_GAP_MS) {
    await sleep(MIN_API_GAP_MS - elapsed);
  }

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    lastApiCallAt = Date.now();
    const res = await fetch('/api/gemini-interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;

    if (res.status === 429 && attempt < maxAttempts) {
      await sleep(1000 * attempt);
      continue;
    }

    const message = typeof data.error === 'string' ? data.error : 'Interview request failed.';
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  throw new Error('Interview request failed.');
}

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const parts = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (pageText) parts.push(pageText);
  }
  return parts.join('\n\n').trim();
}

async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return String(result.value || '').replace(/\s+\n/g, '\n').trim();
}

async function extractResumeTextFromFile(file) {
  const lower = (file?.name || '').toLowerCase();
  if (!file) return '';
  if (/\.(txt|md|rtf|json)$/i.test(lower)) {
    return (await file.text()).trim();
  }
  if (/\.pdf$/i.test(lower)) {
    return extractPdfText(file);
  }
  if (/\.docx$/i.test(lower)) {
    return extractDocxText(file);
  }
  throw new Error('Unsupported file. Upload PDF, DOCX, TXT, MD, or RTF.');
}

async function requestFullscreenForInterview(container) {
  if (!container) return false;
  if (!document.fullscreenEnabled) return false;
  if (document.fullscreenElement) return true;
  try {
    await container.requestFullscreen();
    return true;
  } catch {
    return false;
  }
}

function AiInterview() {
  const [resumeText, setResumeText] = useState('');
  const [resumeSummary, setResumeSummary] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answerDraft, setAnswerDraft] = useState('');
  const [lastFeedback, setLastFeedback] = useState('');
  const [lastScore, setLastScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [finalReport, setFinalReport] = useState(null);
  const [busy, setBusy] = useState(false);
  const [parsingResume, setParsingResume] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [error, setError] = useState('');
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [fullscreenLocked, setFullscreenLocked] = useState(false);
  const [violationMessage, setViolationMessage] = useState('');
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionDurationMs, setSessionDurationMs] = useState(null);
  const [remainingMs, setRemainingMs] = useState(INTERVIEW_DURATION_MS);
  const [streamOn, setStreamOn] = useState(false);

  const videoRef = useRef(null);
  const rootRef = useRef(null);
  const streamRef = useRef(null);
  const sessionStartRef = useRef(null);
  const sessionDeadlineRef = useRef(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamOn(false);
  }, []);

  useEffect(() => () => stopStream(), [stopStream]);

  const resetRound = useCallback(() => {
    setQuestionNumber(0);
    setCurrentQuestion('');
    setResumeSummary('');
    setAnswerDraft('');
    setLastFeedback('');
    setLastScore(null);
    setHistory([]);
    setFinalReport(null);
    setError('');
    setViolationMessage('');
    setTabSwitchCount(0);
    setFullscreenLocked(false);
    setSessionComplete(false);
    setSessionDurationMs(null);
    setRemainingMs(INTERVIEW_DURATION_MS);
    sessionStartRef.current = null;
    sessionDeadlineRef.current = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const interviewStarted = questionNumber > 0 && Boolean(currentQuestion);
  const strictModeActive = interviewStarted && !sessionComplete;
  const inCooldown = Date.now() < cooldownUntil;

  useEffect(() => {
    if (!strictModeActive) return undefined;

    function endForViolation(message) {
      setViolationMessage(message);
      setSessionComplete(true);
      setCurrentQuestion('');
      if (sessionStartRef.current != null) {
        setSessionDurationMs(Date.now() - sessionStartRef.current);
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        setTabSwitchCount((n) => n + 1);
        endForViolation('Interview ended: tab/app switch detected.');
      }
    }

    function onWindowBlur() {
      setTabSwitchCount((n) => n + 1);
      endForViolation('Interview ended: focus left the interview window.');
    }

    function onFullscreenChange() {
      const hasFs = Boolean(document.fullscreenElement);
      setFullscreenLocked(hasFs);
      if (!hasFs) {
        endForViolation('Interview ended: full screen exited.');
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [strictModeActive]);

  useEffect(() => {
    if (!strictModeActive) return undefined;
    const id = window.setInterval(() => {
      if (!sessionDeadlineRef.current) return;
      const left = Math.max(0, sessionDeadlineRef.current - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        setViolationMessage('Interview ended: 30-minute time limit reached.');
        setSessionComplete(true);
        setCurrentQuestion('');
        if (sessionStartRef.current != null) {
          setSessionDurationMs(Date.now() - sessionStartRef.current);
        }
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [strictModeActive]);

  async function startInterview() {
    if (busy || inCooldown) return;
    const cleanResume = resumeText.trim();
    if (cleanResume.length < 100) {
      setError('Please paste your resume text (at least 100 characters).');
      return;
    }
    const compactResume = summarizeResume(cleanResume);
    if (!compactResume || compactResume.length < 80) {
      setError('Resume summary is too short. Please add clearer experience and skills details.');
      return;
    }
    if (!streamOn || !streamRef.current) {
      setError('Camera and microphone are mandatory. Enable camera & mic before starting.');
      return;
    }
    const hasLiveAudio = streamRef.current
      .getAudioTracks()
      .some((trackItem) => trackItem.readyState === 'live' && trackItem.enabled);
    const hasLiveVideo = streamRef.current
      .getVideoTracks()
      .some((trackItem) => trackItem.readyState === 'live' && trackItem.enabled);
    if (!hasLiveAudio || !hasLiveVideo) {
      setError('Both camera and microphone must stay enabled to start.');
      return;
    }

    setBusy(true);
    setError('');
    try {
      const enteredFullscreen = await requestFullscreenForInterview(rootRef.current);
      if (!enteredFullscreen) {
        throw new Error('Fullscreen permission is required to start this interview.');
      }
      setFullscreenLocked(true);
      const data = await callInterviewApi({
        action: 'start',
        role: 'resume-based',
        resumeText: compactResume,
        maxQuestions: 1,
      });
      const q = String(data.question || '').trim();
      if (!q) throw new Error('AI did not return a starting question.');
      resetRound();
      sessionStartRef.current = Date.now();
      sessionDeadlineRef.current = Date.now() + INTERVIEW_DURATION_MS;
      setRemainingMs(INTERVIEW_DURATION_MS);
      setResumeSummary(compactResume);
      setCurrentQuestion(q);
      setQuestionNumber(1);
      queueMicrotask(() => speakQuestion(q));
    } catch (err) {
      if (err instanceof Error && err.status === 429) {
        const waitMs = 30000;
        setCooldownUntil(Date.now() + waitMs);
      }
      setError(err instanceof Error ? err.message : 'Could not start AI interview.');
    } finally {
      setBusy(false);
    }
  }

  async function submitAnswer() {
    if (busy || !currentQuestion || sessionComplete) return;
    const answer = answerDraft.trim();
    if (!answer) {
      setError('Please enter your answer before continuing.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const data = await callInterviewApi({
        action: 'answer',
        role: 'resume-based',
        resumeText: resumeSummary || summarizeResume(resumeText),
        maxQuestions: 1,
        currentQuestion,
        answer,
        history,
      });
      const score = Number.isFinite(data.score) ? Number(data.score) : null;
      const feedback = String(data.feedback || '').trim();
      const nextQuestion = String(data.nextQuestion || '').trim();
      const timeOver = sessionDeadlineRef.current != null && Date.now() >= sessionDeadlineRef.current;
      const doneFlag = Boolean(data.done) || !nextQuestion || timeOver;

      const nextHistory = [
        ...history,
        {
          question: currentQuestion,
          answer,
          score,
          feedback,
        },
      ];
      setHistory(nextHistory);
      setLastScore(score);
      setLastFeedback(feedback || 'No feedback returned.');
      setAnswerDraft('');

      if (doneFlag) {
        setSessionComplete(true);
        setCurrentQuestion('');
        if (timeOver) {
          setViolationMessage('Interview ended: 30-minute time limit reached.');
        }
        if (sessionStartRef.current != null) {
          setSessionDurationMs(Date.now() - sessionStartRef.current);
        }
        return;
      }

      setCurrentQuestion(nextQuestion);
      setQuestionNumber((n) => n + 1);
      queueMicrotask(() => speakQuestion(nextQuestion));
    } catch (err) {
      if (err instanceof Error && err.status === 429) {
        const waitMs = 20000;
        setCooldownUntil(Date.now() + waitMs);
      }
      setError(err instanceof Error ? err.message : 'Could not evaluate answer.');
    } finally {
      setBusy(false);
    }
  }

  async function generateFinalReport() {
    if (busy || !sessionComplete || finalReport) return;
    setBusy(true);
    setError('');
    try {
      const data = await callInterviewApi({
        action: 'finalize',
        role: 'resume-based',
        resumeText: resumeSummary || summarizeResume(resumeText),
        history,
        maxQuestions: 1,
      });
      setFinalReport({
        status: String(data.status || 'Needs Improvement'),
        overallScore: Number.isFinite(data.overallScore) ? Number(data.overallScore) : null,
        strengths: Array.isArray(data.strengths) ? data.strengths.slice(0, 4) : [],
        improvements: Array.isArray(data.improvements) ? data.improvements.slice(0, 4) : [],
        summary: String(data.summary || ''),
      });
    } catch (err) {
      if (err instanceof Error && err.status === 429) {
        const waitMs = 20000;
        setCooldownUntil(Date.now() + waitMs);
      }
      setError(err instanceof Error ? err.message : 'Could not generate final report.');
    } finally {
      setBusy(false);
    }
  }

  async function startCamera() {
    if (streamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStreamOn(true);
    } catch {
      setStreamOn(false);
    }
  }

  async function loadResumeFile(file) {
    if (!file) return;
    setParsingResume(true);
    setError('');
    try {
      const text = await extractResumeTextFromFile(file);
      if (!text || text.length < 80) {
        throw new Error('Could not extract enough text from this file. Try another resume file.');
      }
      setResumeText((prev) => (prev ? `${prev}\n\n${text}` : text));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not parse resume file.');
    } finally {
      setParsingResume(false);
    }
  }

  function formatDuration(ms) {
    if (ms == null) return '';
    if (ms >= 60000) return `${Math.max(1, Math.round(ms / 60000))} min`;
    return `${Math.round(ms / 1000)} sec`;
  }

  function formatCountdown(ms) {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const ss = String(totalSec % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  return (
    <div className="ai-lab-page ai-interview-page" ref={rootRef}>
      <SEOHead
        title="AI Resume Interview | LearnStackHub"
        description="Resume-based AI interview with Gemini on Vercel, with camera practice and final hiring status."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>
      <div className="ai-lab-hero" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <h1>Audio &amp; video interview</h1>
        <p style={{ margin: 0 }}>
          Resume-based interview questions are generated by Ollama through your Vercel API route. Your browser still
          handles camera preview and optional recording. This is a fixed 30-minute interview with mandatory camera/mic.
        </p>
      </div>

      <div className="ai-interview-layout">
        <div className="ai-panel">
          <div className="ai-video-wrap">
            <video ref={videoRef} playsInline muted />
            {!streamOn && (
              <div className="ai-video-placeholder">
                Camera preview appears after you allow access.
              </div>
            )}
          </div>
          <div className="ai-toolbar">
            <button type="button" className="ai-btn secondary" onClick={startCamera} disabled={streamOn}>
              Enable camera &amp; mic
            </button>
          </div>
          <p className="ai-interview-rule-note">
            Rules: fixed 30-minute interview, camera + mic mandatory, fullscreen mandatory, tab/app switching ends
            interview.
          </p>
        </div>

        <div className="ai-panel">
          {!interviewStarted && !sessionComplete && (
            <>
              <label htmlFor="ai-resume" style={{ display: 'block', marginTop: '1rem', fontSize: '0.875rem' }}>
                Add resume (paste text or upload PDF/DOCX)
              </label>
              <textarea
                id="ai-resume"
                className="ai-notes"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume content here..."
                disabled={busy || parsingResume}
                style={{ minHeight: '130px' }}
              />
              <div className="ai-toolbar" style={{ marginTop: 0 }}>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md,.rtf,.json"
                  onChange={(e) => loadResumeFile(e.target.files?.[0])}
                  disabled={busy || parsingResume}
                />
              </div>
              <button
                type="button"
                className="ai-btn"
                onClick={startInterview}
                disabled={busy || parsingResume || !streamOn || inCooldown}
              >
                {parsingResume ? 'Parsing resume...' : busy ? 'Starting...' : 'Start AI interview'}
              </button>
              <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                To avoid rate limits, only a compact resume summary is sent to AI.
              </p>
              {inCooldown ? (
                <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-danger)' }}>
                  Rate limited. Please wait about 30 seconds and try again.
                </p>
              ) : null}
            </>
          )}

          {(interviewStarted || sessionComplete) && (
            <>
              {!sessionComplete && (
                <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Question {questionNumber} | Time left: {formatCountdown(remainingMs)}
                </p>
              )}

              {!sessionComplete && (
                <div className="ai-question-box" style={{ marginTop: '1rem' }}>
                  {currentQuestion}
                </div>
              )}

              <div className="ai-toolbar">
                <button
                  type="button"
                  className="ai-btn secondary"
                  onClick={() => currentQuestion && speakQuestion(currentQuestion)}
                  disabled={!currentQuestion || sessionComplete}
                >
                  Read question aloud
                </button>
              </div>

              {!sessionComplete && (
                <>
                  <label htmlFor="ai-answer" style={{ display: 'block', marginTop: '1rem', fontSize: '0.875rem' }}>
                    Your answer
                  </label>
                  <textarea
                    id="ai-answer"
                    className="ai-notes"
                    value={answerDraft}
                    onChange={(e) => setAnswerDraft(e.target.value)}
                    placeholder="Type your answer summary..."
                    disabled={busy}
                  />
                  <button type="button" className="ai-btn" onClick={submitAnswer} disabled={busy}>
                    {busy ? 'Evaluating...' : 'Submit answer'}
                  </button>
                </>
              )}
            </>
          )}

          {lastFeedback ? (
            <div className="ai-coach" style={{ marginTop: '0.75rem' }}>
              <strong>AI feedback{lastScore != null ? ` (score: ${lastScore}/10)` : ''}:</strong> {lastFeedback}
            </div>
          ) : null}

          {sessionComplete && (
            <div
              className="ai-coach"
              style={{
                marginTop: '1rem',
                padding: '1rem 1.1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Interview complete</h3>
              {violationMessage ? (
                <p style={{ margin: '0 0 0.75rem', color: 'var(--accent-danger)', fontSize: '0.9rem' }}>
                  {violationMessage}
                </p>
              ) : null}
              <ul style={{ margin: '0 0 1rem', paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <li>
                  <strong>Questions completed:</strong> {history.length}
                </li>
                <li>
                  <strong>Tab switch events:</strong> {tabSwitchCount}
                </li>
                <li>
                  <strong>Fullscreen lock:</strong> {fullscreenLocked ? 'Active' : 'Exited'}
                </li>
                {sessionDurationMs != null && (
                  <li>
                    <strong>Approx. session time:</strong> {formatDuration(sessionDurationMs)}
                  </li>
                )}
              </ul>
              {!finalReport ? (
                <button type="button" className="ai-btn" onClick={generateFinalReport} disabled={busy}>
                  {busy ? 'Generating report...' : 'Generate final status'}
                </button>
              ) : (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.55 }}>
                  <p style={{ margin: '0 0 0.4rem' }}>
                    <strong>Status:</strong> {finalReport.status}
                  </p>
                  <p style={{ margin: '0 0 0.7rem' }}>
                    <strong>Overall score:</strong>{' '}
                    {finalReport.overallScore != null ? `${finalReport.overallScore}/10` : 'N/A'}
                  </p>
                  {finalReport.summary ? <p style={{ margin: '0 0 0.6rem' }}>{finalReport.summary}</p> : null}
                  {finalReport.strengths.length > 0 && (
                    <p style={{ margin: '0 0 0.45rem' }}>
                      <strong>Strengths:</strong> {finalReport.strengths.join('; ')}
                    </p>
                  )}
                  {finalReport.improvements.length > 0 && (
                    <p style={{ margin: 0 }}>
                      <strong>Improvements:</strong> {finalReport.improvements.join('; ')}
                    </p>
                  )}
                </div>
              )}

              <div className="ai-toolbar">
                <button
                  type="button"
                  className="ai-btn secondary"
                  onClick={async () => {
                    if (document.fullscreenElement) {
                      await document.exitFullscreen().catch(() => {});
                    }
                    resetRound();
                  }}
                  disabled={busy}
                >
                  Start new interview
                </button>
              </div>
            </div>
          )}

          {error ? (
            <p className="ai-coach" style={{ marginTop: '0.75rem', color: 'var(--accent-danger)' }}>
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AiInterview;
