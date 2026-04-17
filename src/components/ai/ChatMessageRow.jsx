import { Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const chatMarkdownComponents = {
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
};

export function ChatMessageRow({ role, text, pending }) {
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
