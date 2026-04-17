import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { fetchChatReply } from '../utils/chatApi';
import { ChatMessageRow } from './ai/ChatMessageRow';
import '../pages/ai/ai-lab.css';

function buildWelcome(topicTitle, courseTitle) {
  return (
    `You're on **${topicTitle}** (${courseTitle}). Ask anything you did not understand from this lesson — ` +
    'definitions, code, or interview angles. Replies are AI-generated for learning; verify critical details.'
  );
}

/** Adds hidden tutorial context only to the first user turn for the API — not shown in the UI. */
function applyTutorialContextForApi(rows, topicTitle, courseTitle, topicId) {
  let firstUserSeen = false;
  return rows.map((m) => {
    if (m.role !== 'user') return m;
    if (!firstUserSeen) {
      firstUserSeen = true;
      return {
        role: 'user',
        text:
          `[Learner is reading LearnStackHub tutorial "${topicTitle}" (${courseTitle}), topic id: ${topicId}. Answer in that context when it helps.]\n\n${m.text}`,
      };
    }
    return m;
  });
}

/**
 * Floating doubt-clarification chat on tutorial pages (same backend as Practice Lab chat).
 */
function TutorialFloatingChat({ topicId, topicTitle, courseTitle }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);
  const fabRef = useRef(null);

  const welcome = buildWelcome(topicTitle || 'this tutorial', courseTitle || 'LearnStackHub');

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  const close = useCallback(() => {
    setOpen(false);
    fabRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  async function handleSubmit(e) {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', text: raw }];
    setMessages(next);
    setLoading(true);
    try {
      const forApi = applyTutorialContextForApi(next, topicTitle, courseTitle, topicId);
      const reply = await fetchChatReply(forApi);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            `Could not get a reply: ${msg}\n\nTry again in a moment, or open full **Chat practice** from Practice Lab.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        ref={fabRef}
        className="tutorial-float-chat-fab"
        aria-expanded={open}
        aria-controls="tutorial-float-chat-panel"
        onClick={() => setOpen((v) => !v)}
        title={open ? 'Close doubt chat' : 'Ask a doubt about this lesson'}
      >
        {open ? <X size={22} strokeWidth={2.25} aria-hidden /> : <MessageCircle size={24} strokeWidth={2} aria-hidden />}
        <span className="tutorial-float-chat-fab-label">{open ? 'Close' : 'Doubt?'}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="tutorial-float-chat-backdrop"
            aria-label="Close chat overlay"
            onClick={close}
          />
          <div
            id="tutorial-float-chat-panel"
            className="tutorial-float-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tutorial-float-chat-title"
          >
            <header className="tutorial-float-chat-header">
              <div>
                <h2 id="tutorial-float-chat-title">Ask a doubt</h2>
                <p className="tutorial-float-chat-sub">
                  Stay on this page — same AI tutor as{' '}
                  <Link to="/ai-lab/chat" onClick={(e) => e.stopPropagation()}>
                    Practice Lab chat
                  </Link>
                  .
                </p>
              </div>
              <button
                type="button"
                className="tutorial-float-chat-close"
                onClick={close}
                aria-label="Close doubt chat"
              >
                <X size={20} aria-hidden />
              </button>
            </header>

            <div className="tutorial-float-chat-scroll" ref={logRef} role="log" aria-live="polite">
              <ChatMessageRow role="assistant" text={welcome} />
              {messages.map((m, i) => (
                <ChatMessageRow key={i} role={m.role} text={m.text} />
              ))}
              {loading && <ChatMessageRow role="assistant" pending />}
            </div>

            <form className="tutorial-float-chat-form" onSubmit={handleSubmit}>
              <div className="ai-chat-input-wrap">
                <input
                  type="text"
                  className="ai-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What part of this lesson is unclear?"
                  aria-label="Your question about this tutorial"
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="ai-chat-send"
                  disabled={loading}
                  aria-label={loading ? 'Sending' : 'Send message'}
                >
                  {loading ? <Loader2 className="ai-chat-spin" size={20} aria-hidden /> : <Send size={20} aria-hidden />}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default TutorialFloatingChat;
