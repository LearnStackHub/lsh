// SEO Helper Functions for generating SEO-friendly titles and descriptions

/**
 * Generate SEO-friendly title with long-tail keywords
 */
export const generateSEOTitle = (topic) => {
  if (!topic) return 'LSH - LearnStackHub | Master Java Full Stack Development';
  
  const { title, courseTitle } = topic;
  const sourceTitle = typeof title === 'string' ? title.trim() : '';
  const sourceCourse = typeof courseTitle === 'string' ? courseTitle.trim() : '';
  
  const normalize = (value = '') =>
    value
      .toLowerCase()
      .replace(/[|()[\]{}]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  
  const toTitleCase = (value = '') =>
    value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
  
  const buildBrandTitle = (value) => `${value} | LearnStackHub`;
  
  // Map of topic titles to SEO-friendly long-tail keyword titles
  const seoTitles = {
    // HTML Topics
    'HTML Introduction - What is HTML?':
'HTML Introduction Tutorial for Beginners | Learn HTML Basics',

'HTML Document Structure & Basic Tags':
'HTML Document Structure Tutorial | DOCTYPE, html, head, body Tags',

'HTML Links & Anchors':
'HTML Links and Anchor Tags Tutorial | href, target, Navigation',

'HTML Images':
'HTML Images Tutorial | img Tag, src, alt, width, height Attributes',

'HTML Lists - Ordered, Unordered & Description Lists':
'HTML Lists Tutorial | Ordered, Unordered, and Description Lists',

'HTML Tables - Creating Data Tables':
'HTML Tables Tutorial | table, tr, td, th Tags with Examples',

'HTML Forms - Input Elements & Form Handling':
'HTML Forms Tutorial | input, select, textarea, button Elements',

'HTML5 Semantic Elements':
'HTML5 Semantic Tags Tutorial | header, nav, section, article, footer',

'HTML Media - Audio & Video':
'HTML Audio and Video Tutorial | HTML5 Media Elements',

'HTML iframe - Embedding Content':
'HTML iframe Tutorial | Embed Websites, Videos, and External Pages',

'HTML Marquee - Scrolling Text (Deprecated)':
'HTML Marquee Tag Tutorial | Scrolling Text Animation in HTML',

'HTML DOM - Document Object Model':
'HTML DOM Tutorial | JavaScript DOM Manipulation for Beginners',

'HTML Best Practices':
'HTML Best Practices Tutorial | Semantic HTML, Accessibility, SEO',
    
    // CSS Topics
   'CSS Introduction - What is CSS?':
'CSS Introduction Tutorial for Beginners | Learn CSS Styling Basics',

'CSS Selectors':
'CSS Selectors Tutorial | Class, ID, Element, and Attribute Selectors',

'CSS Colors & Backgrounds':
'CSS Colors and Backgrounds Tutorial | color, background, Gradient Styling',

'CSS Box Model':
'CSS Box Model Tutorial | margin, padding, border, width, height',

'CSS Text & Fonts':
'CSS Text and Fonts Tutorial | font-family, font-size, text-align',

'CSS Display & Positioning':
'CSS Display and Positioning Tutorial | display, position, z-index, float',

'CSS Flexbox':
'CSS Flexbox Tutorial | Flexible Layout Design with Flex Container',

'CSS Grid':
'CSS Grid Tutorial | Build Two-Dimensional Layouts with CSS Grid',

'CSS Responsive Design':
'CSS Responsive Design Tutorial | Media Queries and Mobile-First Design',

'CSS Animations':
'CSS Animations Tutorial | keyframes, transition, transform, animation',


    // Core Java Topics
   'Java Introduction':
'Learn Java Programming from Scratch | Beginner Guide',

'Introduction to Java':
'What is Java? Complete Introduction for Beginners',

'Java Features':
'Top Features of Java Explained with Real Examples',

'Java Environment Setup':
'How to Install Java JDK and Configure Environment Variables',

'Java Syntax':
'Understanding Java Syntax and Basic Program Structure',

'Variables in Java':
'How Variables Work in Java with Examples',

'Java Data Types':
'Primitive and Non-Primitive Data Types in Java',

'Data Types in Java':
'Java Data Types Explained in Simple Way',

'Operators in Java':
'Java Operators Explained with Practical Examples',

'Methods in Java':
'How Methods Work in Java with Parameters and Return Types',

'Java Keywords':
'All Important Java Keywords Every Beginner Should Know',

'If-Else Statement':
'How if-else Conditions Work in Java',

'If-Else Statements':
'Java Conditional Logic Explained with if else Examples',

'Switch Statement':
'Using switch-case Statements in Java Programs',

'For Loop':
'Java for Loop Explained with Real Examples',

'While Loop':
'Understanding while and do-while Loops in Java',

'Do-While Loop':
'How do-while Loop Works in Java',

'Break and Continue':
'Using break and continue Statements in Java Loops',

'OOPs Introduction':
'Object-Oriented Programming Concepts in Java Explained',

'Introduction to OOPs':
'Complete Beginner Guide to OOP in Java',

'Classes and Objects':
'How Classes and Objects Work in Java',

'Constructors':
'Understanding Constructors in Java with Examples',

'Inheritance':
'Java Inheritance Explained with extends and super',

'Polymorphism':
'Understanding Polymorphism in Java Applications',

'Abstraction':
'How Abstraction Works in Java OOP',

'Encapsulation':
'Encapsulation in Java Explained in Simple Terms',

'Interfaces':
'Java Interfaces Explained with Practical Examples',

'String Introduction':
'Introduction to Java Strings and String Pool',

'Introduction to Strings':
'Complete Guide to String Handling in Java',

'String Methods':
'Most Important Java String Methods Explained',

'StringBuffer':
'Why StringBuffer is Used in Java',

'StringBuilder':
'StringBuilder in Java for Faster String Operations',

'Array Introduction':
'Introduction to Arrays in Java with Examples',

'Introduction to Arrays':
'Understanding Java Arrays Step by Step',

'Single Dimensional Array':
'Working with One Dimensional Arrays in Java',

'Multi Dimensional Array':
'How Multi-Dimensional Arrays Work in Java',

'Array Methods':
'Useful Java Arrays Class Methods Explained',

'Exception Handling Introduction':
'Introduction to Exception Handling in Java',

'Introduction to Exception Handling':
'How Java Exception Handling Works Internally',

'Try-Catch-Finally':
'Using try catch finally Blocks in Java',

'Throw and Throws':
'Difference Between throw and throws in Java',

'Custom Exceptions':
'Creating Custom Exceptions in Java',

'Global Exception Handling':
'Global Exception Handling in Spring Boot Applications',

'Collection Framework Introduction':
'Java Collections Framework Explained for Beginners',

'List Interface':
'Understanding List Interface in Java Collections',

'Set Interface':
'How Set Interface Works in Java Collections',

'Map Interface':
'Complete Guide to Map Interface in Java',

'Queue Interface':
'Queue Interface in Java with Real Examples',

'Synchronization':
'Thread Synchronization in Java Explained',

'Serialization':
'How Serialization Works in Java',

'Thread Introduction':
'Introduction to Multithreading in Java',

'Thread Creation':
'Different Ways to Create Threads in Java',

'Thread Lifecycle':
'Java Thread Lifecycle Explained Step by Step',

'Thread Methods':
'Important Java Thread Methods You Should Know',

'Top 30 Java Interview Questions ':
'Top 30 Core Java Interview Questions with Answers',

    // JDBC Topics
   'Introduction to JDBC':
'Learn JDBC Step by Step | Connect Java Applications with Databases',

'JDBC Drivers':
'Understanding JDBC Driver Types in Java Applications',

'JDBC Connection Steps':
'How to Connect Java with MySQL Database Using JDBC',

'Statement Interface':
'Executing SQL Queries Using Statement Interface in JDBC',

'PreparedStatement Interface':
'How PreparedStatement Prevents SQL Injection in JDBC',

'ResultSet Interface':
'Reading Database Records Using ResultSet in JDBC',

'CRUD Operations':
'Perform CRUD Operations in Java Using JDBC and MySQL',

'Transaction Management':
'JDBC Transaction Management Explained with Commit and Rollback',

'JDBC Project Setup - MySQL Connection':
'JDBC MySQL Project Setup Guide | Add MySQL Connector and Configure Connection',


    // Servlet Topics
    'Introduction to Servlets': 'Java Servlet Tutorial for Beginners - Web Application Development',
    'Servlet Lifecycle': 'Servlet Lifecycle Explained with Example - init(), service(), destroy()',
    'Servlet API': 'Java Servlet API Tutorial - HttpServletRequest and HttpServletResponse',
    'ServletConfig & ServletContext': 'Servlet Config and Context Tutorial - Configuration Parameters',
    'HttpServletRequest & Response': 'Servlet Request Response Tutorial - Get Parameters, Set Headers',
    'Session Management': 'Servlet Session Management Tutorial - HttpSession with Examples',
    'Filters & Listeners': 'Servlet Filters and Listeners Tutorial - Request Filtering Examples',
    'Servlet Annotations': 'Servlet Annotations Tutorial - @WebServlet, @WebFilter Examples',
    'Servlet Security': 'Servlet Security Tutorial - Authentication and Authorization',
    'Servlet Project Setup - Create & Run': 'Servlet Project Setup Tutorial - Create Servlet in Eclipse with Tomcat',
    'Apache Tomcat Server - Installation & Configuration': 'Apache Tomcat Server Tutorial - Installation, Configuration, Deployment',
    'HTML/CSS Frontend with Servlets - Complete Project': 'HTML CSS with Servlet Tutorial - Complete Project Example',
    
    // JSP Topics
    'Introduction to JSP': 'JSP Tutorial for Beginners - JavaServer Pages with Examples',
    'JSP Architecture & Lifecycle': 'JSP Architecture Explained - How JSP Works Internally',
    'JSP Scripting Elements': 'JSP Scripting Elements Tutorial - Scriptlets, Expressions, Declarations',
    'JSP Directives': 'JSP Directives Tutorial - page, include, taglib Directives',
    'JSP Implicit Objects': 'JSP Implicit Objects Tutorial - request, response, session, out Examples',
    'JSP Action Tags': 'JSP Action Tags Tutorial - jsp:include, jsp:forward, jsp:useBean',
    'JSP Expression Language (EL)': 'JSP EL Tutorial - Expression Language with Examples',
    'JSTL (JSP Standard Tag Library)': 'JSP JSTL Tutorial - JSP Standard Tag Library with Examples',
    'JSP Custom Tags': 'JSP Custom Tags Tutorial - Create Custom Tags in JSP',
    'JSP Project Setup - Create & Run': 'JSP Project Setup Tutorial - Create JSP Project in Eclipse with Tomcat',
    
    // Hibernate Topics
    'Hibernate Introduction': 'Hibernate ORM Tutorial for Beginners - Java Persistence Framework',
    'Hibernate Architecture': 'Hibernate Architecture Explained - Core Components and Flow',
    'Hibernate Configuration': 'Hibernate Configuration Tutorial - hibernate.cfg.xml Step by Step',
    'Hibernate Session': 'Hibernate Session Tutorial - Session API and Lifecycle',
    'Hibernate Mapping': 'Hibernate Mapping Tutorial - JPA Annotations and Relationships',
    'Hibernate HQL': 'Hibernate HQL Tutorial - Hibernate Query Language with Examples',
    'Hibernate Locking': 'Hibernate Locking Tutorial - Optimistic vs Pessimistic Locking',
    'Hibernate Caching': 'Hibernate Caching Tutorial - First Level and Second Level Cache',
    'Hibernate Relationships': 'Hibernate Relationships Tutorial - One-to-One, One-to-Many, Many-to-Many',
    'Hibernate Batch Processing': 'Hibernate Batch Processing Tutorial - Insert, Update, Delete in Batch',
    'Hibernate Project Setup': 'Hibernate Project Setup Tutorial - Maven Project with MySQL',
    
    // MySQL Topics
    'Introduction to MySQL': 'MySQL Database Tutorial for Beginners - Relational Database Management',
    'MySQL Installation and Setup': 'MySQL Installation Tutorial - Step by Step Guide for Windows',
    'MySQL Data Types': 'MySQL Data Types Tutorial - INT, VARCHAR, DATE, TEXT Examples',
    'Creating Databases and Tables': 'MySQL Create Database Tutorial - CREATE DATABASE and TABLE',
    'SELECT Query - Retrieving Data': 'MySQL SELECT Query Tutorial - Retrieve Data from Tables',
    'INSERT, UPDATE, DELETE - Modifying Data': 'MySQL DML Tutorial - INSERT, UPDATE, DELETE Statements',
    'MySQL Joins - Combining Data from Multiple Tables': 'MySQL Joins Tutorial - INNER, LEFT, RIGHT, FULL OUTER JOIN',
    'MySQL Constraints and Keys': 'MySQL Constraints Tutorial - PRIMARY KEY, FOREIGN KEY, UNIQUE',
    'MySQL Aggregate Functions': 'MySQL Aggregate Functions - COUNT, SUM, AVG, MIN, MAX',
    'MySQL Scalar Functions - String, Date, Math': 'MySQL Scalar Functions - UCASE, LCASE, MID, LENGTH, ROUND',
    'MySQL Views - Virtual Tables': 'MySQL Views Tutorial - CREATE, ALTER, DROP Views',
    'MySQL Stored Procedures': 'MySQL Stored Procedures Tutorial - CREATE and CALL Procedures',
    'MySQL Triggers - Automated Actions': 'MySQL Triggers Tutorial - BEFORE and AFTER Triggers',
    'MySQL Transactions - ACID Properties': 'MySQL Transactions Tutorial - COMMIT, ROLLBACK, SAVEPOINT',
    'MySQL Subqueries - Nested Queries': 'MySQL Subqueries Tutorial - Nested Queries in SELECT, WHERE',
    'MySQL DDL - ALTER, DROP, TRUNCATE': 'MySQL DDL Tutorial - ALTER, DROP, TRUNCATE Statements',
    'MySQL DQL - Data Query Language (SELECT)': 'MySQL DQL Tutorial - SELECT Statement with Examples',
    'MySQL Clauses - WHERE, GROUP BY, HAVING, ORDER BY, LIMIT': 'MySQL Clauses Tutorial - WHERE, GROUP BY, HAVING, ORDER BY',
    'MySQL Privileges & Security - GRANT, REVOKE, DCL': 'MySQL Privileges Tutorial - GRANT and REVOKE User Permissions',
    'MySQL Indexes - Performance Optimization': 'MySQL Indexes Tutorial - CREATE INDEX for Performance',
    
    // Spring Framework Topics
    'Why Spring? Problems in Traditional Java': 'Spring Framework Tutorial - Why Spring? Problems Solved by Spring',
    'Spring IOC - Inversion of Control': 'Spring IOC Tutorial - Inversion of Control Container Explained',
    'Spring DI - Dependency Injection': 'Spring Dependency Injection Tutorial - Constructor and Setter Injection',
    'Spring Bean - Understanding Spring-Managed Objects': 'Spring Bean Tutorial - Bean Lifecycle, Scope, Configuration',
    'Spring ApplicationContext - The Container': 'Spring ApplicationContext Tutorial - Bean Container and Context',
    'Spring XML Configuration': 'Spring XML Configuration Tutorial - Configure Beans with XML',
    'Spring Annotation Configuration': 'Spring Annotation Configuration Tutorial - @Component, @Autowired, @Service',
    'Spring MVC DispatcherServlet': 'Spring MVC DispatcherServlet Tutorial - Front Controller Pattern',
    'Spring MVC Controller': 'Spring MVC Controller Tutorial - @Controller, @RequestMapping, @GetMapping',
    'Spring MVC ViewResolver': 'Spring MVC ViewResolver Tutorial - Configure View Resolution',
    'Spring MVC ModelAndView': 'Spring MVC ModelAndView Tutorial - Pass Data from Controller to View',
    'Spring Project - Login + Student CRUD': 'Spring MVC Project Tutorial - Complete Login and CRUD Application',
    'Spring Data - Introduction': 'Spring Data Tutorial - Spring Data JPA Introduction and Overview',
    'Spring Data Repository Architecture': 'Spring Data Repository Tutorial - CrudRepository, JpaRepository',
    'Spring JDBC Template': 'Spring JDBC Template Tutorial - Database Operations without JPA',
    'Spring Data Custom Queries': 'Spring Data Custom Queries Tutorial - @Query, Native Queries, JPQL',
    'Spring AOP - Introduction': 'Spring AOP Tutorial - Aspect-Oriented Programming Introduction',
    'Spring AOP - Advanced Pointcut Expressions': 'Spring AOP Pointcut Tutorial - Advanced Pointcut Expressions',
    'Spring AOP - Custom Annotations': 'Spring AOP Custom Annotations Tutorial - Create Custom Aspect Annotations',
    'Spring AOP - Aspect Ordering': 'Spring AOP Aspect Ordering Tutorial - Control Aspect Execution Order',
    'Spring AOP with Spring Boot': 'Spring AOP Spring Boot Tutorial - AOP Configuration in Spring Boot',
    
    // Spring Boot Topics
    'Spring Boot - Your First Step into Enterprise Java': 'Spring Boot Tutorial for Beginners - Build Enterprise Java Applications',
    'Spring Boot Project Setup - Step by Step Guide': 'Spring Boot Project Setup Tutorial - Create Spring Boot Application',
    'Spring Boot Configuration - application.properties and YAML': 'Spring Boot Configuration Tutorial - application.properties and YAML Files',
    'Spring Boot REST API - Building RESTful Web Services': 'Spring Boot REST API Tutorial - Build RESTful Web Services',
    'Spring Boot with JPA - Database Integration': 'Spring Boot JPA Tutorial - Database Integration with Spring Data JPA',
    'Spring Boot Exception Handling - Global Exception Handler': 'Spring Boot Exception Handling Tutorial - @ControllerAdvice, @ExceptionHandler',
    'Spring Boot Validation - Input Validation and Error Handling': 'Spring Boot Validation Tutorial - Bean Validation, @Valid, @NotNull',
    'Spring Boot Security - Authentication and Authorization': 'Spring Boot Security Tutorial - Spring Security Configuration',
    'Spring Boot Testing - Unit and Integration Tests': 'Spring Boot Testing Tutorial - JUnit, Mockito, Integration Tests',
    'Spring Boot Deployment - Deploy to Production': 'Spring Boot Deployment Tutorial - Deploy to Production Server',
    'Spring Boot Actuator - Monitoring and Management': 'Spring Boot Actuator Tutorial - Application Monitoring and Health Checks',
    'Spring Boot SMTP Integration - Email Sending': 'Spring Boot SMTP Tutorial - Send Emails with Gmail, Outlook, Custom SMTP Servers',
    'Postman and Swagger Integration - API Testing and Documentation': 'Postman and Swagger Tutorial - Test and Document REST APIs in Spring Boot',
    'Spring Cloud & Microservices Architecture': 'Spring Cloud Microservices Tutorial - Complete Guide to Building Microservices with Spring Cloud',
    'Spring Cloud Microservices Project Setup': 'Spring Cloud Microservices Project Tutorial - Complete Setup Guide with Eureka, API Gateway, User and Product Services',
    'Microservices Architecture Fundamentals': 'Microservices Architecture Tutorial - Monolith vs Microservices, DDD, Architecture Principles',
    'Spring Cloud Config Server - Centralized Configuration': 'Spring Cloud Config Server Tutorial - Centralized Configuration Management for Microservices',
    'Service Discovery with Eureka': 'Spring Cloud Eureka Tutorial - Service Discovery and Registration in Microservices',
    'API Gateway with Spring Cloud Gateway': 'Spring Cloud Gateway Tutorial - API Gateway Routing, Filters, Authentication',
    'Load Balancing in Spring Cloud': 'Spring Cloud Load Balancing Tutorial - Client-Side Load Balancing with LoadBalancer',
    'Inter-Service Communication with OpenFeign': 'Spring Cloud OpenFeign Tutorial - Declarative REST Clients for Microservices',
    'Fault Tolerance with Resilience4j': 'Spring Cloud Resilience4j Tutorial - Circuit Breaker, Retry, Rate Limiter, Bulkhead',
    'Distributed Tracing with Sleuth and Zipkin': 'Spring Cloud Distributed Tracing Tutorial - Sleuth and Zipkin for Request Tracking',
    'Security in Microservices - JWT and OAuth2': 'Spring Cloud Security Tutorial - JWT Authentication and OAuth2 in Microservices',
    'Centralized Logging with ELK Stack': 'Spring Cloud ELK Stack Tutorial - Elasticsearch, Logstash, Kibana for Centralized Logging',
    'Top 30 Spring Boot Interview Questions': 'Top 30 Spring Boot Interview Questions - Most Asked Spring Boot Interview Questions with Answers',
    
    // SDLC Topics
    'Software Development Life Cycle (SDLC) - Complete Guide': 'SDLC Tutorial - Software Development Life Cycle Complete Guide 2026 - Phases, Models, Best Practices',
    
    // HTTP & APIs Topics
    'HTTP Introduction - What is HTTP?': 'HTTP Tutorial - What is HTTP Protocol? Learn HTTP Basics with Examples',
    'HTTP Request Structure - Request Line, Methods, Headers, Body': 'HTTP Request Structure Tutorial - Request Line, Methods, Headers, Body',
    'HTTP Methods - GET, POST, PUT, PATCH, DELETE': 'HTTP Methods Tutorial - GET, POST, PUT, PATCH, DELETE Explained',
    'HTTP Response Structure - Status Line, Headers, Body': 'HTTP Response Structure Tutorial - Status Line, Headers, Body',
    'HTTP Status Codes - Complete Guide': 'HTTP Status Codes Tutorial - 200, 404, 500 Status Codes Explained',
    'HTTP Headers - Complete Guide': 'HTTP Headers Tutorial - Request Headers and Response Headers',
    'HTTPS & Security - SSL/TLS, Encryption, Certificates': 'HTTPS Tutorial - SSL/TLS, Encryption, and Security',
    'Cookies & Sessions - State Management in HTTP': 'HTTP Cookies and Sessions Tutorial - State Management',
    'HTTP Caching - Browser Caching, Cache-Control, ETag': 'HTTP Caching Tutorial - Cache-Control, ETag, Browser Caching',
    'CORS - Cross-Origin Resource Sharing': 'CORS Tutorial - API Works in Postman but Not Browser,Fix 403 Forbidden Error,Fix 404 Error in Spring Boot.Fix CORS Error in Spring Boot,JWT Authentication Explained',
    'API Introduction - What is an API?': 'API Tutorial - What is an API? Learn API Basics',
    'REST API Fundamentals - Architecture and Principles': 'REST API Tutorial - REST Architecture and Principles',
    'RESTful API Design - Best Practices and Patterns': 'RESTful API Design Tutorial - Best Practices and Examples',
    'Request & Response Formats - JSON, XML, Form Data': 'API Request Response Formats - JSON, XML, Form Data',
    'Authentication & Authorization - API Security': 'API Authentication Tutorial - Basic Auth, JWT, OAuth 2.0',
    'API Testing Tools - Postman, cURL, Swagger': 'API Testing Tools - Postman, cURL, Swagger Tutorial',
    'API Documentation - OpenAPI, Swagger, Best Practices': 'API Documentation Tutorial - OpenAPI and Swagger',
    'Rate Limiting - Throttling and Quotas': 'API Rate Limiting Tutorial - Throttling and Quotas',
    'API Security Best Practices - Input Validation, SQL Injection, XSS': 'API Security Tutorial - Input Validation, SQL Injection, XSS Prevention',
    'Microservices & APIs - API Gateway, Service Communication': 'Microservices and APIs Tutorial - API Gateway, Service Communication',
    'Advanced API Concepts - HATEOAS, GraphQL, WebSockets, gRPC': 'Advanced API Concepts - HATEOAS, GraphQL, WebSockets, gRPC',
    'Global Exception Handling': 'Global Exception Handling Tutorial - @ControllerAdvice, @ExceptionHandler',
    
    // Maven Topics
    'What is Maven?': 'Maven Tutorial for Beginners - Build Automation Tool Explained',
    'Why Maven?': 'Why Use Maven? - Benefits of Maven Build Tool',
    'Install Maven': 'Maven Installation Tutorial - Install Maven on Windows, Linux, Mac',
    'Maven Project Structure': 'Maven Project Structure Tutorial - Standard Directory Layout',
    'What is pom.xml?': 'Maven pom.xml Tutorial - Project Object Model Configuration',
    'Create Maven Project': 'Maven Create Project Tutorial - Create Maven Project in Eclipse, IntelliJ',
    'Maven Build Lifecycle': 'Maven Build Lifecycle Tutorial - validate, compile, test, package, install',
    'Maven Repositories': 'Maven Repositories Tutorial - Local, Central, Remote Repositories',
    'Dependency Management': 'Maven Dependency Management Tutorial - Add Dependencies, Version Management',
    'Maven Plugins': 'Maven Plugins Tutorial - Compiler, Surefire, War, Tomcat Plugins',
    'Multi-Module Project': 'Maven Multi-Module Project Tutorial - Parent and Child Modules',
    'Maven with Spring Boot': 'Maven Spring Boot Tutorial - Spring Boot Maven Plugin Configuration',
    'Useful Maven Commands': 'Maven Commands Tutorial - mvn clean, install, test, package Commands',
    'Common Errors & Fixes': 'Maven Common Errors Tutorial - Troubleshoot Maven Build Errors',
    'Maven vs Gradle': 'Maven vs Gradle Comparison - Which Build Tool to Choose?',
    'Best Practices': 'Maven Best Practices Tutorial - Maven Project Best Practices and Guidelines',
    
    // Git Topics
    'Introduction to Git': 'Git Tutorial for Beginners - Version Control System Explained',
    'Git Installation & Setup': 'Git Installation Tutorial - Install Git on Windows, Linux, Mac',
    'Git Basics - First Repository': 'Git Basics Tutorial - Initialize Repository, Add, Commit Files',
    'Git Branches - Working with Branches': 'Git Branches Tutorial - Create, Switch, Merge Branches',
    'Git Merge Configuration & Strategies': 'Git Merge Tutorial - Merge Strategies and Configuration',
    'Git Revert & Undo Changes': 'Git Revert Tutorial - Undo Changes, Reset, Revert Commits',
    'Git Workflow - Best Practices': 'Git Workflow Tutorial - Git Best Practices and Workflow Patterns',
    'GitHub Basics - Remote Repositories': 'GitHub Tutorial - Remote Repositories, Push, Pull, Clone',
    'GitHub Pull Requests - Collaboration': 'GitHub Pull Requests Tutorial - Create and Merge Pull Requests',
    'GitHub Security - 2FA, Tokens & Settings': 'GitHub Security Tutorial - Two-Factor Authentication, Personal Access Tokens',
    'GitHub Teams & Collaboration': 'GitHub Teams Tutorial - Team Collaboration and Organization',
    'Branch Protection & Private/Public Branches': 'Git Branch Protection Tutorial - Protect Branches, Private vs Public',
    'Git Deployment & CI/CD': 'Git Deployment Tutorial - CI/CD Pipeline with Git',
  };
  
  // Return SEO title if exact match exists (case-insensitive)
  const normalizedTitle = normalize(sourceTitle);
  const titleKey = Object.keys(seoTitles).find((key) => normalize(key) === normalizedTitle);
  if (titleKey) {
    return buildBrandTitle(seoTitles[titleKey].replace(/\s*\|\s*LSH\s*-\s*LearnStackHub\s*$/i, '').trim());
  }
  
  // Fuzzy title match for near-identical headings
  const fuzzyKey = Object.keys(seoTitles)
    .filter((key) => {
      const nk = normalize(key);
      return normalizedTitle.includes(nk) || nk.includes(normalizedTitle);
    })
    .sort((a, b) => normalize(b).length - normalize(a).length)[0];
  if (fuzzyKey) {
    return buildBrandTitle(seoTitles[fuzzyKey].replace(/\s*\|\s*LSH\s*-\s*LearnStackHub\s*$/i, '').trim());
  }
  
  // Intent-based title generation for stronger search alignment
  const courseName = sourceCourse || 'Java';
  const baseCourseName = courseName.replace(/\s*Tutorial\s*$/i, '').trim() || 'Java';
  const topicId = typeof topic.id === 'string' ? topic.id.trim().toLowerCase() : '';
  const sectionName = typeof topic.sectionTitle === 'string' ? topic.sectionTitle.trim() : '';
  
  let cleanTitle = sourceTitle
    .replace(/\s*[-|:]\s*(Complete Guide|Step[- ]by[- ]Step Guide|Guide)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const lower = cleanTitle.toLowerCase();
  const hasInterviewIntent = /\binterview\b/.test(lower);
  const hasMcqIntent = /\bmcq\b|\bquiz\b|\bexam\b|\btest\b/.test(lower);
  const hasSetupIntent = /\b(setup|installation|install|configure|configuration|project)\b/.test(lower);
  const hasIntroIntent = /\bintroduction\b|\bwhat is\b/.test(lower);
  const hasArchitectureIntent = /\barchitecture\b/.test(lower);
  const hasSecurityIntent = /\bsecurity\b|\bauth\b|\bauthorization\b|\bauthentication\b/.test(lower);
  const hasTroubleshootingIntent = /\bdebug\b|\blog\b|\berror\b|\btroubleshoot\b|\bfix\b/.test(lower);
  const hasHandsOnIntent = /\b(build|run|compose|dockerfile|api|crud|deployment|deploy)\b/.test(lower);
  const hasConceptIntent = /\b(concepts?|fundamentals?|basics?|overview)\b/.test(lower);
  
  const ensureCourseInTitle = (value) => {
    if (normalize(value).includes(normalize(baseCourseName))) return value;
    return `${baseCourseName} ${value}`.trim();
  };

  const courseLabelByKey = {
    corejava: 'Java',
    html: 'HTML',
    css: 'CSS',
    mysql: 'MySQL',
    jdbc: 'JDBC',
    servlets: 'Servlet',
    jsp: 'JSP',
    hibernate: 'Hibernate',
    spring: 'Spring Framework',
    springboot: 'Spring Boot',
    springcloud: 'Spring Cloud',
    http: 'HTTP API',
    maven: 'Maven',
    git: 'Git',
    kafka: 'Kafka',
    docker: 'Docker',
    sdlc: 'SDLC'
  };

  const normalizedCourse = normalize(baseCourseName);
  const courseKey = Object.keys(courseLabelByKey).find((key) => normalizedCourse.includes(normalize(courseLabelByKey[key])));
  const primaryCourseLabel = courseKey ? courseLabelByKey[courseKey] : baseCourseName;
  const topicPhrase = cleanTitle || toTitleCase(primaryCourseLabel);
  const titleRoot = ensureCourseInTitle(topicPhrase);

  // Avoid duplicate "Tutorial Tutorial" strings from pre-labeled headings
  const normalizeSuffix = (value) =>
    value
      .replace(/\s+Tutorial\s+Tutorial/gi, ' Tutorial')
      .replace(/\s{2,}/g, ' ')
      .trim();
  
  if (hasInterviewIntent) {
    const interviewTopic = ensureCourseInTitle(cleanTitle.replace(/\s*[-:]\s*.*/, '').trim() || baseCourseName);
    return buildBrandTitle(normalizeSuffix(`${interviewTopic} Interview Questions and Answers (2026)`));
  }
  
  if (hasMcqIntent) {
    return buildBrandTitle(normalizeSuffix(`${primaryCourseLabel} MCQ Questions and Answers - Free Practice Test`));
  }
  
  if (hasSetupIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Setup Guide - Installation and Configuration Steps`));
  }
  
  if (hasIntroIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Explained - Beginner Guide with Real Examples`));
  }

  if (hasArchitectureIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Architecture - Components, Flow and Real Use Cases`));
  }

  if (hasSecurityIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Security Guide - Best Practices and Examples`));
  }

  if (hasTroubleshootingIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Troubleshooting Guide - Debugging Steps and Fixes`));
  }

  if (hasHandsOnIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Tutorial - Hands-On Examples and Real Scenarios`));
  }

  if (hasConceptIntent) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Fundamentals - Core Concepts with Examples`));
  }

  // Use section/topic identity to vary the final pattern across all tutorials
  const sectionSignal = normalize(sectionName || topicId || topicPhrase);
  const patternIndex = sectionSignal.length % 3;
  if (patternIndex === 0) {
    return buildBrandTitle(normalizeSuffix(`${titleRoot} Tutorial - Complete Guide with Examples`));
  }
  if (patternIndex === 1) {
    return buildBrandTitle(normalizeSuffix(`Learn ${titleRoot} - Practical Guide for Beginners`));
  }
  return buildBrandTitle(normalizeSuffix(`${titleRoot} Explained - Concepts, Use Cases and Best Practices`));
};

/**
 * Generate SEO-friendly meta description
 */
export const generateSEODescription = (topic) => {
  if (!topic) {
    return 'LSH (LearnStackHub): Your complete journey from Core Java fundamentals to cloud-ready full-stack development. Learn Java, Servlets, JSP, JDBC, Hibernate, MySQL with interactive tutorials and live code execution.';
  }
  
  const { title, description, courseTitle } = topic;
  
  // Map of topic descriptions to SEO-friendly descriptions
  const seoDescriptions = {
    'Introduction to JDBC': 'Learn Java JDBC tutorial for beginners. Connect Java applications with MySQL database. Step-by-step guide with code examples, CRUD operations, and real-time scenarios. Master JDBC programming today!',
    'Servlet Lifecycle': 'Learn Servlet lifecycle explained with examples. Understand init(), service(), destroy() methods. Complete tutorial with code examples and real-world scenarios. Perfect for beginners!',
    'JSP Implicit Objects': 'Learn JSP implicit objects tutorial - request, response, session, out, application. Complete guide with examples and code snippets. Master JSP programming today!',
    'Hibernate Configuration': 'Learn Hibernate configuration step by step. Setup hibernate.cfg.xml, create entity classes, configure database connection. Complete tutorial with Maven project example.',
  };
  
  if (seoDescriptions[title]) {
    return seoDescriptions[title];
  }
  
  // Generate SEO-friendly description
  const courseName = courseTitle || 'Java';
  return `Learn ${title} in ${courseName}. Complete tutorial with step-by-step examples, code snippets, and real-world scenarios. Master ${courseName} programming with LearnStackHub. Free interactive tutorials with live code execution.`;
};

/**
 * Generate SEO keywords
 */
export const generateSEOKeywords = (topic) => {
  if (!topic) {
    return 'learn, learnstack, learnstack hub, learnstackhub, learn hub, learn stack hub, learnstack hub tutorial, learnstack hub java, learnstack hub spring, learn hub java, learn hub tutorial, learn stack hub java, learn stack hub tutorial, learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial, java online, java training, java certification, java web development, spring boot tutorial, java backend, java frontend, java database, java mysql, java servlet, java jsp, java jdbc, java hibernate, java react, java aws, java cloud, java microservices, java tutorial hyderabad, java training hyderabad, top tutorial company hyderabad, best tutorial hyderabad, top company hyderabad, spring tutorial hyderabad, learn stack hub hyderabad, top tutorial hyderabad';
  }
  
  const { title, courseTitle } = topic;
  const courseName = courseTitle || 'Java';
  
  // Generate long-tail keywords with high search volume terms
  const baseKeywords = [
    title,
    `${title} tutorial`,
    `${title} example`,
    `${title} for beginners`,
    `learn ${title}`,
    `${title} step by step`,
    `${title} with code`,
    `${title} program`,
    `${title} guide`,
    `how to ${title.toLowerCase()}`,
    `${title} explained`,
    `${title} complete guide`,
    `free ${title} tutorial`,
    `${title} online`,
    `${courseName} ${title}`,
    `${title} ${courseName}`,
  ];
  
  // Add course-specific high-volume keywords
  const courseKeywords = {
    'JDBC': ['JDBC tutorial', 'Java database connectivity', 'JDBC MySQL', 'JDBC example', 'JDBC connection', 'learn JDBC', 'JDBC for beginners', 'JDBC programming', 'Java JDBC', 'JDBC complete guide', 'JDBC step by step', 'JDBC online tutorial', 'free JDBC tutorial'],
    'Servlet': ['Servlet tutorial', 'Java servlet', 'Servlet example', 'Servlet lifecycle', 'Java web development', 'learn servlet', 'Servlet for beginners', 'Servlet programming', 'Java Servlet', 'Servlet complete guide', 'Servlet step by step', 'Servlet online tutorial', 'free Servlet tutorial', 'Java web application'],
    'JSP': ['JSP tutorial', 'JavaServer Pages', 'JSP example', 'JSP implicit objects', 'JSP JSTL', 'learn JSP', 'JSP for beginners', 'JSP programming', 'Java JSP', 'JSP complete guide', 'JSP step by step', 'JSP online tutorial', 'free JSP tutorial', 'JSP web development'],
    'Hibernate': ['Hibernate tutorial', 'Hibernate ORM', 'Hibernate example', 'Hibernate configuration', 'JPA Hibernate', 'learn Hibernate', 'Hibernate for beginners', 'Hibernate programming', 'Java Hibernate', 'Hibernate complete guide', 'Hibernate step by step', 'Hibernate online tutorial', 'free Hibernate tutorial', 'Hibernate ORM framework'],
    'MySQL': ['MySQL tutorial', 'MySQL database', 'MySQL query', 'MySQL example', 'SQL tutorial', 'learn MySQL', 'MySQL for beginners', 'MySQL programming', 'MySQL database tutorial', 'MySQL complete guide', 'MySQL step by step', 'MySQL online tutorial', 'free MySQL tutorial', 'SQL database'],
    'Core Java': ['Java tutorial', 'Java programming', 'Java for beginners', 'learn Java', 'Java course', 'Java online', 'Java training', 'Java certification', 'Java development', 'Java complete guide', 'Java step by step', 'free Java tutorial', 'Java programming language'],
    'HTML': ['HTML tutorial', 'HTML for beginners', 'learn HTML', 'HTML course', 'HTML online', 'HTML training', 'HTML web development', 'HTML complete guide', 'HTML step by step', 'free HTML tutorial', 'HTML programming'],
    'CSS': ['CSS tutorial', 'CSS for beginners', 'learn CSS', 'CSS course', 'CSS online', 'CSS training', 'CSS web development', 'CSS complete guide', 'CSS step by step', 'free CSS tutorial', 'CSS styling'],
  };
  
  const courseKey = courseName.replace(' Tutorial', '').split(' ')[0];
  if (courseKeywords[courseKey]) {
    baseKeywords.push(...courseKeywords[courseKey]);
  }
  
  // Add generic high-volume keywords
  baseKeywords.push(
    'java tutorial',
    'java programming',
    'learn java',
    'java for beginners',
    'java course',
    'java online',
    'java training',
    'java certification',
    'java development',
    'java full stack',
    'java web development',
    'free java tutorial',
    'java programming tutorial',
    'java tutorial online',
    'java step by step',
    'java complete guide'
  );
  
  // Add brand and location-based keywords
  baseKeywords.push(
    'learn',
    'learnstack',
    'learnstack hub',
    'learnstackhub',
    'learn hub',
    'learn stack hub',
    'learnstack hub tutorial',
    'learnstack hub java',
    'learnstack hub spring',
    'learn hub java',
    'learn hub tutorial',
    'learn stack hub java',
    'learn stack hub tutorial',
    'java tutorial hyderabad',
    'java training hyderabad',
    'java course hyderabad',
    'learn java hyderabad',
    'java programming hyderabad',
    'top java tutorial hyderabad',
    'best java tutorial hyderabad',
    'top tutorial company hyderabad',
    'best tutorial company hyderabad',
    'top company hyderabad',
    'java full stack hyderabad',
    'spring tutorial hyderabad',
    'spring boot hyderabad',
    'learn stack hub hyderabad',
    'top tutorial hyderabad',
    'best tutorial hyderabad'
  );
  
  return baseKeywords.join(', ');
};


