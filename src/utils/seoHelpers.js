// SEO Helper Functions for generating SEO-friendly titles and descriptions

/**
 * Generate SEO-friendly title with long-tail keywords
 */
export const generateSEOTitle = (topic) => {
  if (!topic) return 'LearnStackHub - Master Java Full Stack Development';
  
  const { title, courseTitle } = topic;
  
  // Map of topic titles to SEO-friendly long-tail keyword titles
  const seoTitles = {
    // HTML Topics
    'HTML Introduction - What is HTML?': 'HTML Tutorial for Beginners - Learn HTML from Scratch with Examples',
    'HTML Document Structure & Basic Tags': 'HTML Document Structure Tutorial - DOCTYPE, html, head, body Tags',
    'HTML Links & Anchors': 'HTML Links Tutorial - Create Hyperlinks with href, target, anchor Tags',
    'HTML Images': 'HTML Images Tutorial - Insert Images with img Tag, alt, src Attributes',
    'HTML Lists - Ordered, Unordered & Description Lists': 'HTML Lists Tutorial - ul, ol, li, dl, dt, dd Tags with Examples',
    'HTML Tables - Creating Data Tables': 'HTML Tables Tutorial - Create Tables with table, tr, td, th Tags',
    'HTML Forms - Input Elements & Form Handling': 'HTML Forms Tutorial - Form, input, select, textarea Elements',
    'HTML5 Semantic Elements': 'HTML5 Semantic Tags Tutorial - header, nav, article, section, footer',
    'HTML Media - Audio & Video': 'HTML Media Tutorial - Embed Audio and Video with audio, video Tags',
    'HTML iframe - Embedding Content': 'HTML iframe Tutorial - Embed External Content with iframe Tag',
    'HTML Marquee - Scrolling Text (Deprecated)': 'HTML Marquee Tag Tutorial - Scrolling Text Animation (Deprecated)',
    'HTML DOM - Document Object Model': 'HTML DOM Tutorial - Manipulate HTML Elements with JavaScript',
    'HTML Best Practices': 'HTML Best Practices Tutorial - Semantic HTML, Accessibility, SEO Tips',
    
    // CSS Topics
    'CSS Introduction - What is CSS?': 'CSS Tutorial for Beginners - Learn CSS Styling from Scratch',
    'CSS Selectors': 'CSS Selectors Tutorial - Class, ID, Element, Attribute Selectors with Examples',
    'CSS Colors & Backgrounds': 'CSS Colors and Backgrounds Tutorial - color, background-color, background-image',
    'CSS Box Model': 'CSS Box Model Tutorial - margin, padding, border, width, height Explained',
    'CSS Text & Fonts': 'CSS Text and Fonts Tutorial - font-family, font-size, text-align, text-decoration',
    'CSS Display & Positioning': 'CSS Display and Positioning Tutorial - display, position, float, z-index',
    'CSS Flexbox': 'CSS Flexbox Tutorial - Complete Guide to Flexible Layout with flexbox',
    'CSS Grid': 'CSS Grid Tutorial - Two-Dimensional Layout System with grid-template',
    'CSS Responsive Design': 'CSS Responsive Design Tutorial - Media Queries, Mobile-First Approach',
    'CSS Animations': 'CSS Animations Tutorial - Keyframes, transitions, transform, animation Properties',
    
    // Core Java Topics
    'Java Introduction': 'Java Programming Tutorial for Beginners - Learn Java from Scratch',
    'Java Features': 'Java Features Explained - Object-Oriented, Platform Independent, Secure',
    'Java Environment Setup': 'Java Environment Setup Tutorial - Install JDK and Set PATH',
    'Java Syntax': 'Java Syntax Tutorial - Basic Syntax Rules and Examples',
    'Variables in Java': 'Java Variables Tutorial - Local, Instance, Static Variables',
    'Java Data Types': 'Java Data Types Tutorial - Primitive and Reference Types',
    'Operators in Java': 'Java Operators Tutorial - Arithmetic, Logical, Comparison Operators',
    'Methods in Java': 'Java Methods Tutorial - Method Declaration, Parameters, Return Types',
    'Java Keywords': 'Java Keywords Tutorial - Reserved Words in Java',
    'If-Else Statement': 'Java If-Else Statement Tutorial - Conditional Statements with Examples',
    'Switch Statement': 'Java Switch Statement Tutorial - Multi-way Branching with switch-case',
    'For Loop': 'Java For Loop Tutorial - Iteration with for, for-each Loop Examples',
    'While Loop': 'Java While Loop Tutorial - Conditional Iteration with while, do-while',
    'Break and Continue': 'Java Break and Continue Tutorial - Control Loop Execution',
    'OOPs Introduction': 'Java OOPs Concepts Tutorial - Object-Oriented Programming Fundamentals',
    'Classes and Objects': 'Java Classes and Objects Tutorial - Create Classes and Instantiate Objects',
    'Constructors': 'Java Constructors Tutorial - Default, Parameterized, Constructor Overloading',
    'Inheritance': 'Java Inheritance Tutorial - extends, super, Method Overriding',
    'Polymorphism': 'Java Polymorphism Tutorial - Method Overloading and Overriding',
    'Abstraction': 'Java Abstraction Tutorial - Abstract Classes and Methods',
    'Encapsulation': 'Java Encapsulation Tutorial - Data Hiding with private, getters, setters',
    'Interfaces': 'Java Interfaces Tutorial - interface Keyword, Multiple Inheritance',
    'String Introduction': 'Java String Tutorial - String Class, String Literals, String Pool',
    'String Methods': 'Java String Methods Tutorial - length, charAt, substring, indexOf, replace',
    'StringBuffer': 'Java StringBuffer Tutorial - Mutable String with StringBuffer Class',
    'StringBuilder': 'Java StringBuilder Tutorial - Efficient String Concatenation',
    'Array Introduction': 'Java Array Tutorial - Declare, Initialize, Access Array Elements',
    'Single Dimensional Array': 'Java 1D Array Tutorial - Single Dimensional Array with Examples',
    'Multi Dimensional Array': 'Java 2D Array Tutorial - Multi-Dimensional Arrays, Matrix',
    'Array Methods': 'Java Array Methods Tutorial - Arrays Class, Sorting, Searching',
    'Exception Handling Introduction': 'Java Exception Handling Tutorial - try-catch, throw, throws',
    'Try-Catch-Finally': 'Java Try-Catch-Finally Tutorial - Exception Handling Blocks',
    'Throw and Throws': 'Java Throw and Throws Tutorial - Throw Exceptions, Declare Exceptions',
    'Custom Exceptions': 'Java Custom Exceptions Tutorial - Create User-Defined Exception Classes',
    'Global Exception Handling': 'Java Global Exception Handling Tutorial - @ControllerAdvice, @ExceptionHandler',
    'Collection Framework Introduction': 'Java Collections Tutorial - Collection Framework Overview',
    'List Interface': 'Java List Interface Tutorial - ArrayList, LinkedList, Vector Examples',
    'Set Interface': 'Java Set Interface Tutorial - HashSet, TreeSet, LinkedHashSet',
    'Map Interface': 'Java Map Interface Tutorial - HashMap, TreeMap, LinkedHashMap',
    'Queue Interface': 'Java Queue Interface Tutorial - PriorityQueue, LinkedList Queue',
    'Synchronization': 'Java Synchronization Tutorial - synchronized Keyword, Thread Safety',
    'Serialization': 'Java Serialization Tutorial - Serializable Interface, Object Streams',
    'Thread Introduction': 'Java Multithreading Tutorial - Thread Class, Runnable Interface',
    'Thread Creation': 'Java Thread Creation Tutorial - Extend Thread, Implement Runnable',
    'Thread Lifecycle': 'Java Thread Lifecycle Tutorial - New, Runnable, Blocked, Dead States',
    'Thread Methods': 'Java Thread Methods Tutorial - start, sleep, join, interrupt, yield',
    'Top 30 Java Interview Questions ': 'Top 30 Java Interview Questions - Most Asked Java Interview Questions with Answers',
    
    // JDBC Topics
    'Introduction to JDBC': 'Java JDBC Tutorial for Beginners - Connect Java with MySQL Database',
    'JDBC Drivers': 'JDBC Drivers Explained - Type 1, 2, 3, 4 Drivers with Examples',
    'JDBC Connection Steps': 'JDBC Connection Steps - How to Connect Java with MySQL Step by Step',
    'Statement Interface': 'JDBC Statement Interface Tutorial - Execute SQL Queries in Java',
    'PreparedStatement Interface': 'JDBC PreparedStatement Tutorial - Prevent SQL Injection with Examples',
    'ResultSet Interface': 'JDBC ResultSet Tutorial - Retrieve Data from Database in Java',
    'CRUD Operations': 'JDBC CRUD Operations Tutorial - Create, Read, Update, Delete with MySQL',
    'Transaction Management': 'JDBC Transaction Management - Commit, Rollback Examples',
    'JDBC Project Setup - MySQL Connection': 'JDBC Project Setup Tutorial - How to Add MySQL Connector JAR File',
    
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
    'Top 30 Spring Boot Interview Questions': 'Top 30 Spring Boot Interview Questions - Most Asked Spring Boot Interview Questions with Answers',
    
    // HTTP & APIs Topics
    'HTTP Status Codes - Complete Guide': 'HTTP Status Codes Tutorial - 100, 200, 300, 400, 500 Series Explained',
    'Global Exception Handling': 'Global Exception Handling Tutorial - @ControllerAdvice, @ExceptionHandler in Spring Boot',
    
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
  
  // Return SEO title if exists, otherwise generate one
  if (seoTitles[title]) {
    return seoTitles[title];
  }
  
  // Generate SEO-friendly title
  const courseName = courseTitle || 'Java';
  return `${title} Tutorial - ${courseName} with Examples & Code | LearnStackHub`;
};

/**
 * Generate SEO-friendly meta description
 */
export const generateSEODescription = (topic) => {
  if (!topic) {
    return 'LearnStackHub: Your complete journey from Core Java fundamentals to cloud-ready full-stack development. Learn Java, Servlets, JSP, JDBC, Hibernate, MySQL with interactive tutorials and live code execution.';
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
    return 'learn java, java tutorial, java full stack, java programming, java development, servlets tutorial, jsp tutorial, jdbc tutorial, hibernate tutorial, mysql tutorial, react tutorial, aws tutorial, java for beginners, java course, free java tutorial, java online, java training, java certification, java web development, spring boot tutorial, java backend, java frontend, java database, java mysql, java servlet, java jsp, java jdbc, java hibernate, java react, java aws, java cloud, java microservices';
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
  
  return baseKeywords.join(', ');
};


