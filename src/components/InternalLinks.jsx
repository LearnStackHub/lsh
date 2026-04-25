import { Link } from 'react-router-dom';
import { getAllTopics, getTopicById } from '../data';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getTopicPath } from '../utils/topicRoutes';

function InternalLinks({ currentTopicId, courseTitle }) {
  // Get all topics in the same course
  const allTopics = getAllTopics();
  const currentTopic = getTopicById(currentTopicId);
  
  if (!currentTopic) return null;
  
  // Get related topics from the same course
  const relatedTopics = allTopics
    .filter(topic => 
      topic.courseKey === currentTopic.courseKey && 
      topic.id !== currentTopicId
    )
    .slice(0, 8); // Show 8 related topics for better internal linking
  
  // Get next topic in sequence
  const allCourseTopics = allTopics
    .filter(topic => topic.courseKey === currentTopic.courseKey)
    .sort((a, b) => {
      // Simple sorting - you can improve this based on your topic order
      return a.title.localeCompare(b.title);
    });
  
  const currentIndex = allCourseTopics.findIndex(t => t.id === currentTopicId);
  const nextTopic = currentIndex >= 0 && currentIndex < allCourseTopics.length - 1 
    ? allCourseTopics[currentIndex + 1] 
    : null;
  
  if (relatedTopics.length === 0 && !nextTopic) {
    return null;
  }

  return (
    <div className="internal-links-section" style={{ 
      marginTop: '3rem', 
      marginBottom: '2rem',
      padding: '2rem',
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)'
    }}>
      <h2 style={{ 
        fontSize: '1.75rem', 
        marginBottom: '1.5rem', 
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <BookOpen size={24} />
        Related Tutorials
      </h2>
      
      {nextTopic && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: '1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600'
          }}>
            Continue Learning:
          </h3>
          <Link 
            to={getTopicPath(nextTopic.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--accent-primary)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(5px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Next: {nextTopic.title}
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
      
      {relatedTopics.length > 0 && (
        <div>
          <h3 style={{ 
            fontSize: '1.1rem', 
            marginBottom: '1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600'
          }}>
            More {courseTitle || 'Java'} Tutorials:
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '0.75rem'
          }}>
            {relatedTopics.map(topic => (
              <li key={topic.id}>
                <Link
                  to={getTopicPath(topic.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowRight size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span>{topic.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InternalLinks;


