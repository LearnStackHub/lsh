import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTopicPath } from '../utils/topicRoutes';

function StructuredData({ topicId, topic, type = 'WebSite' }) {
  const location = useLocation();
  // Keep a single canonical host across all SEO signals.
  const baseUrl = 'https://www.learnstackhub.com';

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    let structuredData = {};

    if (type === 'WebSite' || location.pathname === '/') {
      // Homepage - WebSite schema
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'LearnStackHub',
        alternateName: ['LSH', 'Learn Stack Hub' ,  'LearnStack', 'Learn Hub', 'Stack Hub', 'Learn Java Full Stack Development'],
        description: 'LearnStackHub (LSH) provides free Java full stack tutorials covering Core Java, Servlets, JSP, JDBC, Hibernate, MySQL, Spring Framework, Spring Boot, HTTP APIs, React, and AWS with practical examples.',
        url: baseUrl,
        keywords: 'LSH, lsh, Learn Stack Hub, learn stack hub, LearnStack, learnstack, Learn Hub, learn hub, Stack Hub, stack hub, learn, stack, hub, learnstackhub, learnstack hub, learnstack hub tutorial, learnstack hub java, learnstack hub spring, learn hub java, learn hub tutorial, learn stack hub java, learn stack hub tutorial, learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial, java tutorial hyderabad, java training hyderabad, spring tutorial hyderabad, top tutorial company hyderabad, best tutorial hyderabad',
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
          '@id': `${baseUrl}/#organization`,
          name: 'LearnStackHub',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/LSH.png`
          }
        },
        mainEntity: {
          '@type': ['EducationalOrganization', 'LocalBusiness'],
          '@id': `${baseUrl}/#organization`,
          name: 'LearnStackHub',
          alternateName: ['LSH', 'Learn Stack Hub' ,  'LearnStack', 'Learn Hub', 'Stack Hub'],
          description: 'LearnStackHub (LSH) is a free online Java full stack learning platform with practical tutorials and interview-focused content.',
          teaches: ['Java Programming', 'Java Web Development', 'JDBC', 'Servlets', 'JSP', 'Hibernate', 'MySQL', 'Spring Framework', 'Spring Boot', 'HTTP & APIs', 'React', 'AWS'],
          educationalCredentialAwarded: 'Certificate of Completion',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN'
          },
          areaServed: {
            '@type': 'City',
            name: 'Hyderabad'
          }
        }
      };
    } else if (type === 'Article' && topicId) {
      // Tutorial page - Article schema
      const resolvedTopic = topic;
      if (resolvedTopic) {
        const topicPath = getTopicPath(resolvedTopic.id);
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${baseUrl}${topicPath}#article`,
          headline: resolvedTopic.title,
          description: resolvedTopic.description || `Learn ${resolvedTopic.title} with step-by-step tutorials, code examples, and real-world scenarios. Complete ${resolvedTopic.courseTitle || 'Java'} tutorial for beginners and advanced developers.`,
          url: `${baseUrl}${topicPath}`,
          author: {
            '@type': 'Person',
            name: 'Dattakumar Pandi',
            description: 'Backend developer and founder of LearnStackHub, specializing in Java, Spring Boot, APIs, system design, and backend architecture.',
            url: `${baseUrl}/about`,
            jobTitle: 'Software Developer & Founder',
            worksFor: {
              '@type': 'Organization',
              name: 'LearnStackHub',
              url: baseUrl
            }
          },
          publisher: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
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
            '@id': `${baseUrl}${topicPath}`
          },
          articleSection: resolvedTopic.courseTitle || 'Java Tutorial',
          keywords: `${resolvedTopic.title}, ${resolvedTopic.title} tutorial, learn ${resolvedTopic.title}, ${resolvedTopic.title} for beginners, ${resolvedTopic.title} example, ${resolvedTopic.courseTitle || 'Java'} tutorial, ${resolvedTopic.courseTitle || 'Java'} programming, free ${resolvedTopic.title} tutorial, ${resolvedTopic.title} step by step, ${resolvedTopic.title} complete guide`,
          about: {
            '@type': 'Thing',
            name: resolvedTopic.courseTitle || 'Java Programming'
          },
          educationalLevel: 'Beginner to Advanced',
          learningResourceType: 'Tutorial',
          teaches: resolvedTopic.title
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
              name: resolvedTopic.courseTitle || 'Core Java',
              item: `${baseUrl}${topicPath}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: resolvedTopic.sectionTitle || 'Tutorial',
              item: `${baseUrl}${topicPath}`
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: resolvedTopic.title,
              item: `${baseUrl}${topicPath}`
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
    } else if (type === 'Course' || location.pathname.includes('/tutorial/') || location.pathname.includes('/kafka/') || location.pathname.includes('/docker/')) {
      // Course schema for tutorial pages
      const resolvedTopic = topic;
      if (resolvedTopic) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: resolvedTopic.title,
          description: resolvedTopic.description || `Learn ${resolvedTopic.title}`,
          provider: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl
          },
          courseCode: resolvedTopic.id,
          educationalLevel: 'Beginner to Advanced',
          teaches: resolvedTopic.title
        };
      }
    } else if (type === 'Organization' || location.pathname === '/about') {
      // About page - Organization schema with LocalBusiness
      structuredData = {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness', 'EducationalOrganization'],
        '@id': `${baseUrl}/#organization`,
        name: 'LearnStackHub',
        alternateName: ['LSH', 'Learn Stack Hub' ,  'LearnStack', 'Learn Hub', 'Stack Hub'],
        url: baseUrl,
        description: 'LearnStackHub (LSH) is a free Java full stack tutorial platform with comprehensive Java, Spring Boot, and backend learning resources.',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/LSH.png`
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          addressCountry: 'IN',
          addressArea: 'Hyderabad'
        },
        areaServed: {
          '@type': 'City',
          name: 'Hyderabad'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '17.3850',
          longitude: '78.4867'
        },
        telephone: '+91-8466932302',
        email: 'careers@learnstackhub.com',
        priceRange: 'Free',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '1000'
        },
        sameAs: [
          'https://github.com/Dattakumar369/learnstackhub'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          description: 'Free Java Full Stack Development Tutorials'
        }
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
  }, [location.pathname, topicId, topic, type]);

  return null;
}

export default StructuredData;

