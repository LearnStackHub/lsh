import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTopics, getTopicById } from '../data';
import { generateSEOTitle, generateSEODescription, generateSEOKeywords } from '../utils/seoHelpers';

function SEOHead({ title, description, keywords, topicId }) {
  const location = useLocation();
  const baseUrl = 'https://learnstackhub.com';
  
  useEffect(() => {
    // Get topic data if topicId is provided
    let pageTitle = title || 'Learn Java Full Stack Development - Free Java Tutorials | LearnStackHub';
    let pageDescription = description || 'Learn Java Full Stack Development for free. Complete Java tutorials covering Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, React, AWS. Step-by-step guides with code examples and live code execution. Perfect for beginners and advanced developers.';
    let pageKeywords = keywords || 'learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial, java online, java training, java certification, java web development, spring boot tutorial, java backend, java frontend, java database, java mysql, java servlet, java jsp, java jdbc, java hibernate, java react, java aws, java cloud, java microservices';
    let pageUrl = baseUrl + location.pathname;
    let pageImage = baseUrl + '/LSH.png';

    if (topicId) {
      const topic = getTopicById(topicId);
      if (topic) {
        // Use SEO helper functions for better titles and descriptions
        pageTitle = generateSEOTitle(topic);
        pageDescription = description || generateSEODescription(topic);
        pageKeywords = keywords || generateSEOKeywords(topic);
      }
    }

    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', pageKeywords);
    
    // Open Graph tags
    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:url', pageUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', pageImage, true);
    updateMetaTag('og:site_name', 'LearnStackHub', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', pageImage);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

  }, [location.pathname, title, description, keywords, topicId]);

  return null; // This component doesn't render anything
}

export default SEOHead;

