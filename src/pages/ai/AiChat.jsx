import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { getChatReply } from '../../services/localAiEngine';
import './ai-lab.css';

const WELCOME =
  'Local chat practice: answers come from rules in this app only—no backend, no external APIs. ' +
  'Ask about Java, JDBC, Spring, SQL, concurrency, and more.';

function AiChat() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: WELCOME }]);
  const [input, setInput] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    const reply = getChatReply(text);
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }]);
  }

  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Chat Practice | LearnStackHub"
        description="Java interview chat using local rules only—no server or third-party AI."
      />
      <Link to="/ai-lab" className="ai-lab-back">
        <ArrowLeft size={16} aria-hidden />
        Back to Practice Lab
      </Link>
      <div className="ai-lab-hero" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <h1>Chat practice</h1>
        <p style={{ margin: 0 }}>
          Extend topics in <code>src/services/localAiEngine.js</code> (<code>RULES</code>).
        </p>
      </div>
      <div className="ai-panel">
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
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default AiChat;
