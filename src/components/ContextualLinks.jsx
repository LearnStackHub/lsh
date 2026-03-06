// Contextual Internal Links Component
// Shows related topics based on keywords in current section

import { Link } from 'react-router-dom';
import { getAllTopics, getTopicById } from '../data';
import { findRelatedTopicsByKeywords } from '../utils/contentEnhancer';
import { BookOpen, ExternalLink } from 'lucide-react';

function ContextualLinks({ currentTopicId, sectionContent, maxLinks = 5 }) {
  const allTopics = getAllTopics();
  const currentTopic = getTopicById(currentTopicId);
  
  if (!currentTopic || !sectionContent) return null;
  
  // Find related topics based on keywords in this section
  const relatedTopics = findRelatedTopicsByKeywords(
    sectionContent, 
    currentTopicId, 
    maxLinks
  );
  
  if (relatedTopics.length === 0) return null;
  
  return (
    <div className="contextual-links" style={{
      margin: '2rem 0',
      padding: '1.5rem',
      background: 'var(--bg-secondary)',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      borderLeft: '4px solid var(--accent-primary)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: '600'
      }}>
        <BookOpen size={16} />
        <span>Related Topics You Might Like:</span>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {relatedTopics.map(topic => (
          <Link
            key={topic.id}
            to={`/tutorial/${topic.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.75rem',
              background: 'var(--bg-card)',
              color: 'var(--accent-primary)',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              border: '1px solid var(--border-color)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-card)';
              e.currentTarget.style.color = 'var(--accent-primary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {topic.title}
            <ExternalLink size={12} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ContextualLinks;






