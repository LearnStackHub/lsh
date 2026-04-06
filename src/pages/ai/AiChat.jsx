import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

const WELCOME =
  'Ask Java and backend interview questions. Replies come from an AI model via a secure server route (Ollama Cloud). ' +
  'Plain `npm run dev` cannot call `/api`—use the deployed site or run `vercel dev` with `OLLAMA_API_KEY` set.';

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
        'Chat API missing (404). This host is probably static-only (e.g. GitHub Pages uploads only dist/). ' +
          'Deploy on Vercel from this repo so `api/ollama-chat.js` runs, and point your domain there—or use a second Vercel project for the same repo.',
      );
    }
    if (res.status === 503) {
      const err = typeof data.error === 'string' ? data.error : 'Service unavailable';
      throw new Error(err);
    }
    const err = typeof data.error === 'string' ? data.error : res.statusText || 'Request failed';
    throw new Error(err);
  }
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new Error('Empty reply from server');
  }
  return data.reply.trim();
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
            `Could not get an AI reply: ${msg}\n\n` +
            'If you are on localhost, run `vercel dev` with `OLLAMA_API_KEY`, or test on your Vercel deployment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Chat Practice | LearnStackHub"
        description="Java and backend interview chat powered by Ollama Cloud through a serverless API route."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>
      <div className="ai-lab-hero" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <h1>Chat practice</h1>
        <p style={{ margin: 0 }}>
          Model and prompts are configured on the server (<code>OLLAMA_API_KEY</code>, optional{' '}
          <code>OLLAMA_MODEL</code>). See <code>api/ollama-chat.js</code>.
        </p>
      </div>
      <div className="ai-panel">
        <div className="ai-chat-log" ref={logRef} role="log" aria-live="polite">
          <div className="ai-chat-bubble assistant">{WELCOME}</div>
          {messages.map((m, i) => (
            <div key={i} className={`ai-chat-bubble ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="ai-chat-bubble assistant ai-chat-pending" aria-busy="true">
              Thinking…
            </div>
          )}
        </div>
        <form className="ai-chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a Java or backend interview question..."
            aria-label="Your message"
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Wait…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AiChat;
