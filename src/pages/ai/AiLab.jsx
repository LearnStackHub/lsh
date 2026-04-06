import { Link } from 'react-router-dom';
import { MessageSquare, Video } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

function AiLab() {
  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Local AI Practice Lab | LearnStackHub"
        description="Chat via Ollama Cloud; interview mode uses local question banks—no LearnStackHub server."
      />
      <div className="ai-lab-hero">
        <h1>Practice Lab</h1>
        <p>
          Chat answers and interview prompts are generated entirely inside this app using rules and curated
          content. Your camera and microphone stay in the browser unless you start a local recording.
        </p>
      </div>
      <p className="ai-lab-disclaimer">
        Chat uses Ollama Cloud from the browser when <code>VITE_OLLAMA_API_KEY</code> is set at build time (e.g.
        Vercel). Interview mode uses question lists in the app—no LearnStackHub backend.
      </p>
      <div className="ai-lab-cards">
        <Link to="/ai-lab/chat" className="ai-lab-card">
          <span className="ai-lab-card-icon" aria-hidden>
            <MessageSquare size={22} />
          </span>
          <h2>Chat practice</h2>
          <p>Ollama Cloud only—set <code>VITE_OLLAMA_API_KEY</code> when you build/deploy.</p>
          <span className="ai-lab-card-cta">Open chat →</span>
        </Link>
        <Link to="/ai-lab/interview" className="ai-lab-card">
          <span className="ai-lab-card-icon" aria-hidden>
            <Video size={22} />
          </span>
          <h2>Audio &amp; video interview</h2>
          <p>
            See yourself on camera, hear the next question with your browser voice, optionally record practice
            takes, and get short local coaching hints.
          </p>
          <span className="ai-lab-card-cta">Start interview →</span>
        </Link>
      </div>
    </div>
  );
}

export default AiLab;
