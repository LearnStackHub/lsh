import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTopics, getTopicById } from '../data';
import { generateSEOTitle, generateSEODescription, generateSEOKeywords } from '../utils/seoHelpers';

function SEOHead({ title, description, keywords, topicId }) {
  const location = useLocation();
  const baseUrl = 'https://learnstackhub.com';
  
  useEffect(() => {
    // Route-based title mapping for static pages
    const routeTitles = {
      '/': 'Learn Java Full Stack Development - Free Java Tutorials | LearnStackHub',
      '/about': 'About Us - LearnStackHub | Free Java Full Stack Learning Platform',
      '/contact': 'Contact Us - LearnStackHub | Get in Touch',
      '/privacy': 'Privacy Policy - LearnStackHub | Data Protection & Privacy',
      '/terms': 'Terms of Service - LearnStackHub | Terms & Conditions',
      '/sitemap': 'Sitemap - LearnStackHub | All Tutorials & Pages'
    };

    const routeDescriptions = {
      '/': 'Learn Java Full Stack Development for free. Complete Java tutorials covering Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, React, AWS. Step-by-step guides with code examples and live code execution. Perfect for beginners and advanced developers.',
      '/about': 'Learn about LearnStackHub - a free platform for learning Java Full Stack Development with interactive tutorials and live code execution. Our mission, features, and commitment to free education.',
      '/contact': 'Get in touch with LearnStackHub. Have questions, suggestions, or feedback? Contact us for support, contributions, or general inquiries about our Java tutorials.',
      '/privacy': 'LearnStackHub Privacy Policy - Learn how we collect, use, and protect your personal information. Our commitment to data protection and user privacy.',
      '/terms': 'LearnStackHub Terms of Service - Read our terms and conditions, disclaimer, and usage guidelines for using our free Java learning platform.',
      '/sitemap': 'Complete sitemap of LearnStackHub - Browse all Java tutorials, courses, and pages. Find Core Java, JDBC, Servlets, JSP, Hibernate, and MySQL tutorials.'
    };

    // Get topic data if topicId is provided
    let pageTitle = title;
    let pageDescription = description;
    let pageKeywords = keywords;
    let pageUrl = baseUrl + location.pathname;
    let pageImage = baseUrl + '/LSH.png';

    if (topicId) {
      const topic = getTopicById(topicId);
      if (topic) {
        // Use SEO helper functions for better titles and descriptions
        pageTitle = generateSEOTitle(topic);
        pageDescription = description || generateSEODescription(topic);
        pageKeywords = keywords || generateSEOKeywords(topic);
      } else {
        // Topic not found - generate title from URL
        const topicName = topicId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        pageTitle = `${topicName} Tutorial - LearnStackHub`;
        pageDescription = description || `Learn ${topicName} with step-by-step tutorials and code examples. Complete guide for beginners and advanced developers.`;
      }
    } else if (!title) {
      // Use route-based title if no title provided
      pageTitle = routeTitles[location.pathname] || 'LearnStackHub - Master Java Full Stack Development';
      pageDescription = routeDescriptions[location.pathname] || 'Learn Java Full Stack Development for free. Complete Java tutorials covering Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, React, AWS. Step-by-step guides with code examples and live code execution. Perfect for beginners and advanced developers.';
      pageKeywords = 'learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial, java online, java training, java certification, java web development, spring boot tutorial, java backend, java frontend, java database, java mysql, java servlet, java jsp, java jdbc, java hibernate, java react, java aws, java cloud, java microservices';
    }

    // Ensure pageTitle is never undefined or empty
    if (!pageTitle || pageTitle.trim() === '') {
      pageTitle = 'LearnStackHub - Master Java Full Stack Development';
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

