import { Link } from 'react-router-dom';
import { MessageSquare, Video } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import './ai-lab.css';

function AiLab() {
  return (
    <div className="ai-lab-page">
      <SEOHead
        title="Practice Lab | LearnStackHub"
        description="Practice Lab: AI chat via Ollama Cloud (server route) and local interview practice in the browser."
      />
      <div className="ai-lab-hero">
        <h1>Practice Lab</h1>
        <p>
          Chat uses a real model through a secure serverless route on Vercel (Ollama Cloud). Interview mode still
          uses in-app questions and local coaching. Your camera and microphone stay in the browser unless you
          record practice takes.
        </p>
      </div>
      <p className="ai-lab-disclaimer">
        Chat requires <code>OLLAMA_API_KEY</code> on the server (see <code>.env.example</code>). Interview mode
        does not call external AI APIs.
      </p>
      <div className="ai-lab-cards">
        <Link to="/ai-lab/chat" className="ai-lab-card">
          <span className="ai-lab-card-icon" aria-hidden>
            <MessageSquare size={22} />
          </span>
          <h2>Chat practice</h2>
          <p>Natural-language answers from an AI model (Ollama Cloud) via <code>/api/ollama-chat</code>.</p>
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
