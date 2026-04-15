import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, User, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

const chatMarkdownComponents = {
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
};

const WELCOME =
  'Ask Java and backend interview questions—JVM, OOP, Spring, SQL, concurrency, and more. ' +
  'Replies are AI-generated for learning; double-check anything you rely on for interviews or work.';
const PROMPT_SUGGESTIONS = [
  'Explain Spring Boot auto-configuration in simple words',
  'Top 10 Java interview questions for 2 years experience',
  'Difference between synchronized block and ReentrantLock',
  'How to optimize a slow MySQL query in production?',
];

function toApiMessages(rows) {
  return rows
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.text }));
}

async function fetchChatReply(messages) {
  const res = await fetch('/api/ollama-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: toApiMessages(messages) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        'Chat is not available here. Open this page from the main site, or try again later.',
      );
    }
    if (res.status === 503) {
      const err = typeof data.error === 'string' ? data.error : 'Service unavailable';
      throw new Error(err);
    }
    const err =
      typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.';
    throw new Error(err);
  }
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new Error('No answer came back. Please try again.');
  }
  return data.reply.trim();
}

function ChatRow({ role, text, pending }) {
  const isUser = role === 'user';
  return (
    <div className={`ai-chat-row ${isUser ? 'ai-chat-row--user' : 'ai-chat-row--assistant'}`}>
      <div className="ai-chat-avatar" aria-hidden="true">
        {isUser ? <User size={18} strokeWidth={2} /> : <Bot size={18} strokeWidth={2} />}
      </div>
      <div className="ai-chat-row-main">
        <span className="ai-chat-row-label">{isUser ? 'You' : 'Tutor'}</span>
        <div className={`ai-chat-row-bubble ${pending ? 'ai-chat-row-bubble--pending' : ''}`}>
          {pending ? (
            <span className="ai-chat-thinking">
              <Loader2 className="ai-chat-spin" size={18} aria-hidden />
              Thinking…
            </span>
          ) : isUser ? (
            <div className="ai-chat-row-text ai-chat-row-text--user">{text}</div>
          ) : (
            <div className="ai-chat-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await fetchChatReply(next);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            `Could not get a reply: ${msg}\n\nPlease try again in a moment. If it keeps failing, check your connection or try later.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-lab-page ai-chat-page">
      <SEOHead
        title="Chat Practice | LearnStackHub"
        description="Java and backend interview chat with an AI tutor on LearnStackHub."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>

      <section className="ai-chat-shell" aria-labelledby="ai-chat-title">
        <header className="ai-chat-topbar">
          <div className="ai-chat-topbar-text">
            <h1 id="ai-chat-title">Chat practice</h1>
            <p className="ai-chat-tagline">Java &amp; backend interview prep with an AI tutor</p>
            <div className="ai-chat-suggestions" aria-label="Suggested prompts">
              {PROMPT_SUGGESTIONS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="ai-chat-suggestion-chip"
                  onClick={() => setInput(prompt)}
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          <span className="ai-chat-status">Live AI tutor</span>
        </header>

        <div className="ai-chat-scroll" ref={logRef} role="log" aria-live="polite">
          <ChatRow role="assistant" text={WELCOME} />
          {messages.map((m, i) => (
            <ChatRow key={i} role={m.role} text={m.text} />
          ))}
          {loading && <ChatRow role="assistant" pending />}
        </div>

        <form className="ai-chat-footer" onSubmit={handleSubmit}>
          <div className="ai-chat-input-wrap">
            <input
              type="text"
              className="ai-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a Java or backend interview question…"
              aria-label="Your message"
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
      </section>
    </div>
  );
}

export default AiChat;
