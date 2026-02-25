// Content Enhancement Utility
// Automatically adds internal links and improves content quality

import { getAllTopics, getTopicById } from '../data';
import { Link } from 'react-router-dom';

/**
 * Find related topics by keywords in content
 */
export const findRelatedTopicsByKeywords = (content, currentTopicId, limit = 10) => {
  const allTopics = getAllTopics();
  const currentTopic = getTopicById(currentTopicId);
  
  if (!currentTopic || !content) return [];
  
  // Extract keywords from content (simple approach)
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4); // Only words longer than 4 characters
  
  // Find topics that match keywords
  const relatedTopics = allTopics
    .filter(topic => {
      if (topic.id === currentTopicId) return false;
      if (topic.courseKey !== currentTopic.courseKey) return false;
      
      const topicText = `${topic.title} ${topic.description || ''}`.toLowerCase();
      const matchCount = words.filter(word => topicText.includes(word)).length;
      
      return matchCount > 0;
    })
    .sort((a, b) => {
      const aText = `${a.title} ${a.description || ''}`.toLowerCase();
      const bText = `${b.title} ${b.description || ''}`.toLowerCase();
      const aMatches = words.filter(word => aText.includes(word)).length;
      const bMatches = words.filter(word => bText.includes(word)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);
  
  return relatedTopics;
};

/**
 * Create a topic mention map for automatic linking
 */
export const createTopicMentionMap = (currentTopicId) => {
  const allTopics = getAllTopics();
  const currentTopic = getTopicById(currentTopicId);
  
  if (!currentTopic) return new Map();
  
  const mentionMap = new Map();
  
  // Get all topics from same course
  const sameCourseTopics = allTopics.filter(
    topic => topic.courseKey === currentTopic.courseKey && topic.id !== currentTopicId
  );
  
  // Create map of topic titles/terms to topic IDs
  sameCourseTopics.forEach(topic => {
    // Add full title
    mentionMap.set(topic.title.toLowerCase(), topic.id);
    
    // Add key terms from title (e.g., "Spring Boot" from "Spring Boot Introduction")
    const words = topic.title.split(/\s+/).filter(w => w.length > 3);
    words.forEach(word => {
      if (!mentionMap.has(word.toLowerCase())) {
        mentionMap.set(word.toLowerCase(), topic.id);
      }
    });
  });
  
  return mentionMap;
};

/**
 * Enhance text with internal links
 * Finds topic mentions and converts them to links
 */
export const enhanceTextWithLinks = (text, currentTopicId) => {
  if (!text) return text;
  
  const mentionMap = createTopicMentionMap(currentTopicId);
  const allTopics = getAllTopics();
  
  // Create a sorted list of mentions (longest first to avoid partial matches)
  const mentions = Array.from(mentionMap.keys()).sort((a, b) => b.length - a.length);
  
  let enhancedText = text;
  const usedLinks = new Set();
  
  mentions.forEach(mention => {
    const topicId = mentionMap.get(mention);
    const topic = allTopics.find(t => t.id === topicId);
    
    if (!topic) return;
    
    // Create regex to find mentions (case-insensitive, whole word)
    const regex = new RegExp(`\\b${mention.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    
    // Only link if not already linked and not in code blocks
    if (!usedLinks.has(topicId) && regex.test(enhancedText)) {
      // Check if it's not inside code blocks
      const beforeMatch = enhancedText.substring(0, enhancedText.search(regex));
      const backticksBefore = (beforeMatch.match(/```/g) || []).length;
      
      if (backticksBefore % 2 === 0) { // Not inside code block
        enhancedText = enhancedText.replace(regex, (match) => {
          usedLinks.add(topicId);
          return `[${match}](/tutorial/${topicId})`;
        });
      }
    }
  });
  
  return enhancedText;
};

/**
 * Calculate content quality metrics
 */
export const analyzeContentQuality = (content) => {
  if (!content) {
    return {
      wordCount: 0,
      headingCount: 0,
      codeBlockCount: 0,
      quality: 'poor',
      suggestions: ['Add more content']
    };
  }
  
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  const headingCount = (content.match(/^#+\s/gm) || []).length;
  const codeBlockCount = (content.match(/```/g) || []).length / 2;
  const paragraphCount = content.split(/\n\n/).filter(p => p.trim().length > 0).length;
  
  let quality = 'good';
  const suggestions = [];
  
  if (wordCount < 500) {
    quality = 'poor';
    suggestions.push('Add more detailed explanations (aim for 1000+ words)');
  } else if (wordCount < 1000) {
    quality = 'fair';
    suggestions.push('Consider adding more examples and detailed explanations');
  }
  
  if (headingCount < 3) {
    suggestions.push('Add more headings (H2, H3) to structure content');
  }
  
  if (codeBlockCount < 2) {
    suggestions.push('Add more code examples');
  }
  
  if (paragraphCount < 5) {
    suggestions.push('Break content into more paragraphs for readability');
  }
  
  return {
    wordCount,
    headingCount,
    codeBlockCount,
    paragraphCount,
    quality,
    suggestions
  };
};

