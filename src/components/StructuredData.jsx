import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTopicById, getAllTopics } from '../data';

function StructuredData({ topicId, type = 'WebSite' }) {
  const location = useLocation();
  const baseUrl = 'https://learnstackhub.com';

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    let structuredData = {};

    if (type === 'WebSite' || location.pathname === '/') {
      // Homepage - WebSite schema
      const allTopics = getAllTopics();
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LearnStackHub',
        alternateName: 'Learn Java Full Stack Development',
        description: 'Free Java Full Stack Development tutorials covering Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, Spring Framework, Spring Boot, HTTP & APIs, React, and AWS. Learn Java programming step-by-step with interactive tutorials and live code execution.',
        url: baseUrl,
        keywords: 'learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial',
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: 'LearnStackHub',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/LSH.png`
          }
        },
        mainEntity: {
          '@type': 'EducationalOrganization',
          name: 'LearnStackHub',
          description: 'Free online Java Full Stack Development tutorials and courses',
          teaches: ['Java Programming', 'Java Web Development', 'JDBC', 'Servlets', 'JSP', 'Hibernate', 'MySQL', 'Spring Framework', 'Spring Boot', 'HTTP & APIs', 'React', 'AWS'],
          educationalCredentialAwarded: 'Certificate of Completion'
        }
      };
    } else if (type === 'Article' && topicId) {
      // Tutorial page - Article schema
      const topic = getTopicById(topicId);
      if (topic) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: topic.title,
          description: topic.description || `Learn ${topic.title} with step-by-step tutorials, code examples, and real-world scenarios. Complete ${topic.courseTitle || 'Java'} tutorial for beginners and advanced developers.`,
          url: `${baseUrl}/tutorial/${topic.id}`,
          author: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl
          },
          publisher: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/LSH.png`
            }
          },
          datePublished: '2024-01-01',
          dateModified: new Date().toISOString().split('T')[0],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/tutorial/${topic.id}`
          },
          articleSection: topic.courseTitle || 'Java Tutorial',
          keywords: `${topic.title}, ${topic.title} tutorial, learn ${topic.title}, ${topic.title} for beginners, ${topic.title} example, ${topic.courseTitle || 'Java'} tutorial, ${topic.courseTitle || 'Java'} programming, free ${topic.title} tutorial, ${topic.title} step by step, ${topic.title} complete guide`,
          about: {
            '@type': 'Thing',
            name: topic.courseTitle || 'Java Programming'
          },
          educationalLevel: 'Beginner to Advanced',
          learningResourceType: 'Tutorial',
          teaches: topic.title
        };
        
        // Add BreadcrumbList structured data for tutorial pages
        const breadcrumbData = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: baseUrl
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: topic.courseTitle || 'Core Java',
              item: `${baseUrl}/tutorial/${topic.id}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: topic.sectionTitle || 'Tutorial',
              item: `${baseUrl}/tutorial/${topic.id}`
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: topic.title,
              item: `${baseUrl}/tutorial/${topic.id}`
            }
          ]
        };
        
        // Add breadcrumb structured data
        const breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'breadcrumb-structured-data';
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.textContent = JSON.stringify(breadcrumbData, null, 2);
        document.head.appendChild(breadcrumbScript);
      }
    } else if (type === 'Course' || location.pathname.includes('/tutorial/')) {
      // Course schema for tutorial pages
      const topic = topicId ? getTopicById(topicId) : null;
      if (topic) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: topic.title,
          description: topic.description || `Learn ${topic.title}`,
          provider: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl
          },
          courseCode: topic.id,
          educationalLevel: 'Beginner to Advanced',
          teaches: topic.title
        };
      }
    } else if (type === 'Organization' || location.pathname === '/about') {
      // About page - Organization schema
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LearnStackHub',
        url: baseUrl,
        description: 'Free Java Full Stack Development Tutorials',
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://github.com/Dattakumar369/learnstackhub'
        ]
      };
    }

    // Add structured data to page
    if (Object.keys(structuredData).length > 0) {
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('structured-data');
      if (script) {
        script.remove();
      }
      const breadcrumbScript = document.getElementById('breadcrumb-structured-data');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    };
  }, [location.pathname, topicId, type]);

  return null;
}

export default StructuredData;

