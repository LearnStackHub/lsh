import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

const CLOUD_HOST = 'https://ollama.com';
const API_KEY = (import.meta.env.VITE_OLLAMA_API_KEY || '').trim();
const MODEL = (import.meta.env.VITE_OLLAMA_MODEL || 'gpt-oss:120b').trim();

const SYSTEM_PROMPT =
  'You are a concise Java and backend interview coach for LearnStackHub users. ' +
  'Answer clearly. Prefer bullet points for lists. Stay under ~250 words unless the user asks for depth. ' +
  'If unsure, say what you know and what to verify in docs. Do not claim to browse the web.';

function cloudConfigured() {
  return Boolean(API_KEY);
}

async function sendCloudChat(messages, signal) {
  const res = await fetch(`${CLOUD_HOST}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    signal,
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const content = data?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('Empty response from Ollama');
  }
  return content.trim();
}

function AiChat() {
  const configured = cloudConfigured();
  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      text: configured
        ? `Ollama Cloud (${MODEL}). Ask Java, JDBC, Spring, databases, or interview-style questions.`
        : 'Chat needs VITE_OLLAMA_API_KEY at build time (Vercel → Environment Variables → Redeploy).',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const logRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!configured) return;
      const text = input.trim();
      if (!text || sending) return;

      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      const { signal } = ac;

      setInput('');
      const prior = messages;
      setMessages((p) => [...p, { role: 'user', text }]);
      setSending(true);

      try {
        const history = prior
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.text)
          .map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.text,
          }));
        const payload = [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: text }];
        const reply = await sendCloudChat(payload, signal);
        if (signal.aborted) return;
        setMessages((p) => [...p, { role: 'assistant', text: reply }]);
      } catch (err) {
        if (err?.name === 'AbortError') return;
        const msg = err?.message || String(err);
        setMessages((p) => [...p, { role: 'assistant', text: `Could not reach Ollama Cloud: ${msg}` }]);
      } finally {
        if (!signal.aborted) setSending(false);
      }
    },
    [configured, input, sending, messages]
  );

  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Chat Practice | LearnStackHub"
        description="Java interview chat via Ollama Cloud from the browser—set VITE_OLLAMA_API_KEY when building."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>
      <div className="ai-lab-hero" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <h1>Chat practice</h1>
        <p style={{ margin: 0 }}>
          Powered by Ollama Cloud only. Configure <code>VITE_OLLAMA_API_KEY</code> on Vercel, then redeploy.
        </p>
      </div>
      <div className="ai-panel">
        {configured && sending ? (
          <p className="ai-chat-hint" style={{ marginTop: 0 }}>
            Thinking…
          </p>
        ) : null}
        <div className="ai-chat-log" ref={logRef} role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`ai-chat-bubble ${m.role}`}>
              {m.text}
            </div>
          ))}
        </div>
        <form className="ai-chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a Java or backend interview question..."
            aria-label="Your message"
            autoComplete="off"
            disabled={!configured || sending}
          />
          <button type="submit" disabled={!configured || sending}>
            {sending ? 'Wait…' : 'Send'}
          </button>
        </form>
        {!configured && (
          <p className="ai-chat-hint">
            Add <code>VITE_OLLAMA_API_KEY</code> in Vercel → Environment Variables (key from{' '}
            <a href="https://ollama.com/settings/keys" target="_blank" rel="noopener noreferrer">
              ollama.com/settings/keys
            </a>
            ), optional <code>VITE_OLLAMA_MODEL</code>, then redeploy.
          </p>
        )}
      </div>
    </div>
  );
}

export default AiChat;
