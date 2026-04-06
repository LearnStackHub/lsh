import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import {
  INTERVIEW_TRACKS,
  nextInterviewQuestion,
  coachAfterAnswer,
  getInterviewPoolSize,
} from '../../services/localAiEngine';
import './ai-lab.css';

function pickMimeType() {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  for (const t of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return '';
}

function speakQuestion(text) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1;
  window.speechSynthesis.speak(u);
}

function AiInterview() {
  const [track, setTrack] = useState('java');
  const [usedQuestionIds, setUsedQuestionIds] = useState(() => new Set());
  const [current, setCurrent] = useState(null);
  const [notes, setNotes] = useState('');
  const [coachLine, setCoachLine] = useState('');
  const [coachTipsUsed, setCoachTipsUsed] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionDurationMs, setSessionDurationMs] = useState(null);
  const [streamOn, setStreamOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [lastBlobUrl, setLastBlobUrl] = useState(null);
  const [recordingFilename, setRecordingFilename] = useState('lsh-practice.webm');

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const sessionStartRef = useRef(null);

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

  useEffect(() => {
    if (lastBlobUrl) {
      return () => URL.revokeObjectURL(lastBlobUrl);
    }
    return undefined;
  }, [lastBlobUrl]);

  const poolSize = getInterviewPoolSize(track);

  const resetRound = useCallback(() => {
    setUsedQuestionIds(new Set());
    setCurrent(null);
    setSessionComplete(false);
    setSessionDurationMs(null);
    setCoachLine('');
    setNotes('');
    setCoachTipsUsed(0);
    sessionStartRef.current = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const handleNextQuestion = useCallback(() => {
    setCoachLine('');
    setNotes('');
    setUsedQuestionIds((prev) => {
      const next = nextInterviewQuestion({ track, usedIds: prev });
      if (!next) {
        setSessionComplete(true);
        if (sessionStartRef.current != null) {
          setSessionDurationMs(Date.now() - sessionStartRef.current);
        } else {
          setSessionDurationMs(null);
        }
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        return prev;
      }
      if (prev.size === 0) {
        sessionStartRef.current = Date.now();
      }
      const copy = new Set(prev);
      copy.add(next.id);
      setCurrent(next);
      queueMicrotask(() => speakQuestion(next.text));
      return copy;
    });
  }, [track]);

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

  function stopRecordingInternal() {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    setRecording(false);
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream || typeof MediaRecorder === 'undefined') return;
    if (lastBlobUrl) {
      URL.revokeObjectURL(lastBlobUrl);
      setLastBlobUrl(null);
    }
    chunksRef.current = [];
    const mime = pickMimeType();
    const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
    rec.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'video/webm' });
      const url = URL.createObjectURL(blob);
      setLastBlobUrl(url);
      setRecordingFilename(`lsh-practice-${Date.now()}.webm`);
      chunksRef.current = [];
    };
    rec.start(200);
    recorderRef.current = rec;
    setRecording(true);
  }

  function stopRecording() {
    stopRecordingInternal();
  }

  function handleCoach() {
    if (!current) return;
    setCoachLine(coachAfterAnswer(current.text, notes));
    setCoachTipsUsed((n) => n + 1);
  }

  const answeredCount = usedQuestionIds.size;

  function formatDuration(ms) {
    if (ms == null) return '';
    if (ms >= 60000) return `${Math.max(1, Math.round(ms / 60000))} min`;
    return `${Math.round(ms / 1000)} sec`;
  }

  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Audio & Video Interview Practice | LearnStackHub"
        description="Practice interviews with camera, microphone, local questions, and optional recording—no third-party AI APIs."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>
      <div className="ai-lab-hero" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <h1>Audio &amp; video interview</h1>
        <p style={{ margin: 0 }}>
          Questions and coaching use the same local engine as chat. Voice uses your browser&apos;s built-in
          speech synthesis (not a cloud AI).
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
            <button type="button" className="ai-btn secondary" onClick={stopStream} disabled={!streamOn}>
              Stop camera
            </button>
            <button
              type="button"
              className="ai-btn"
              onClick={recording ? stopRecording : startRecording}
              disabled={!streamOn}
            >
              {recording ? (
                <>
                  <span className="ai-recording-dot" aria-hidden />
                  Stop recording
                </>
              ) : (
                'Start recording'
              )}
            </button>
          </div>
          {lastBlobUrl && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>
              <a href={lastBlobUrl} download={recordingFilename}>
                Download last take
              </a>
            </p>
          )}
        </div>

        <div className="ai-panel">
          <label htmlFor="ai-track" className="sr-only">
            Interview track
          </label>
          <select
            id="ai-track"
            className="ai-select"
            value={track}
            onChange={(e) => {
              const next = e.target.value;
              setTrack(next);
              resetRound();
            }}
          >
            {INTERVIEW_TRACKS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
          {sessionComplete ? (
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
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Round complete</h3>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                You finished every question in this track for this round. This practice mode does not score answers—it
                helps you rehearse. Use coach tips and your notes to reflect on clarity and structure.
              </p>
              <ul style={{ margin: '0 0 1rem', paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <li>
                  <strong>Questions completed:</strong> {answeredCount} / {poolSize}
                </li>
                <li>
                  <strong>Coach tips used:</strong> {coachTipsUsed}
                </li>
                {sessionDurationMs != null && (
                  <li>
                    <strong>Approx. session time:</strong> {formatDuration(sessionDurationMs)}
                  </li>
                )}
              </ul>
              <button type="button" className="ai-btn" onClick={resetRound}>
                Start new round
              </button>
            </div>
          ) : (
            <>
              {answeredCount > 0 && (
                <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Question {answeredCount} of {poolSize} in this track (no repeats until you start a new round).
                </p>
              )}
              <div className="ai-question-box" style={{ marginTop: '1rem' }}>
                {current
                  ? current.text
                  : 'Click “Next question” to begin. Answer out loud as if in a real interview.'}
              </div>
            </>
          )}
          {sessionComplete && current && (
            <div className="ai-question-box" style={{ marginTop: '0.75rem', opacity: 0.95 }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last question</strong>
              <div style={{ marginTop: '0.35rem' }}>{current.text}</div>
            </div>
          )}
          <div className="ai-toolbar">
            <button
              type="button"
              className="ai-btn"
              onClick={handleNextQuestion}
              disabled={sessionComplete}
            >
              {sessionComplete ? 'Round finished' : 'Next question'}
            </button>
            <button
              type="button"
              className="ai-btn secondary"
              onClick={() => current && speakQuestion(current.text)}
              disabled={!current}
            >
              Read question aloud
            </button>
          </div>
          <label htmlFor="ai-notes" style={{ display: 'block', marginTop: '1rem', fontSize: '0.875rem' }}>
            Optional: jot what you said (for local coaching)
          </label>
          <textarea
            id="ai-notes"
            className="ai-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Short summary of your answer..."
            disabled={sessionComplete}
          />
          <button
            type="button"
            className="ai-btn secondary"
            onClick={handleCoach}
            disabled={!current || sessionComplete}
          >
            Get coach tip
          </button>
          {coachLine ? <p className="ai-coach">{coachLine}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default AiInterview;
