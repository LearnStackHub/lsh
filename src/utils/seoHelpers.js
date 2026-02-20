// SEO Helper Functions for generating SEO-friendly titles and descriptions

/**
 * Generate SEO-friendly title with long-tail keywords
 */
export const generateSEOTitle = (topic) => {
  if (!topic) return 'LearnStackHub - Master Java Full Stack Development';
  
  const { title, courseTitle } = topic;
  
  // Map of topic titles to SEO-friendly long-tail keyword titles
  const seoTitles = {
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
    'ServletConfig & ServletContext': 'ServletConfig and ServletContext Tutorial - Configuration Objects',
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
    
    // Core Java Topics - Basics
    'Java Introduction': 'Java Programming Tutorial for Beginners - Learn Java from Scratch',
    'Java Features': 'Java Features Explained - Object-Oriented, Platform Independent, Secure',
    'Java Environment Setup': 'Java Environment Setup Tutorial - Install JDK and Set PATH',
    'Java Syntax': 'Java Syntax Tutorial - Basic Syntax Rules and Examples',
    'Variables in Java': 'Java Variables Tutorial - Local, Instance, Static Variables',
    'Java Data Types': 'Java Data Types Tutorial - Primitive and Reference Types',
    'Operators in Java': 'Java Operators Tutorial - Arithmetic, Logical, Comparison Operators',
    'Methods in Java': 'Java Methods Tutorial - Method Declaration, Parameters, Return Types',
    'Java Keywords': 'Java Keywords Tutorial - Reserved Words in Java',
    'Top 30 Core Java Interview Questions (1 Year Experience)': 'Top 30 Core Java Interview Questions for 1 Year Experience - OOPs, Collections, Exceptions',
    
    // Core Java - Control Flow
    'If-Else Statement': 'Java If-Else Statement Tutorial - Conditional Statements with Examples',
    'Switch Statement': 'Java Switch Statement Tutorial - Multi-way Branching with Examples',
    'For Loop': 'Java For Loop Tutorial - Iteration and Looping with Examples',
    'While Loop': 'Java While Loop Tutorial - Conditional Looping with Examples',
    'Do-While Loop': 'Java Do-While Loop Tutorial - Post-test Loop with Examples',
    'Break and Continue': 'Java Break and Continue Tutorial - Control Loop Flow with Examples',
    
    // Core Java - OOPs
    'OOPs Introduction': 'Java OOPs Concepts Tutorial - Object-Oriented Programming Basics',
    'Classes and Objects': 'Java Classes and Objects Tutorial - Create Classes and Objects',
    'Constructors': 'Java Constructors Tutorial - Default and Parameterized Constructors',
    'Inheritance': 'Java Inheritance Tutorial - IS-A Relationship with Examples',
    'Polymorphism': 'Java Polymorphism Tutorial - Method Overloading and Overriding',
    'Abstraction': 'Java Abstraction Tutorial - Abstract Classes and Methods',
    'Encapsulation': 'Java Encapsulation Tutorial - Data Hiding with Getters and Setters',
    'Interfaces': 'Java Interfaces Tutorial - Multiple Inheritance with Examples',
    
    // Core Java - Strings
    'String Introduction': 'Java String Tutorial - String Class Methods and Examples',
    'String Methods': 'Java String Methods Tutorial - length(), charAt(), substring() Examples',
    'StringBuffer': 'Java StringBuffer Tutorial - Mutable String with Examples',
    'StringBuilder': 'Java StringBuilder Tutorial - Fast String Concatenation',
    
    // Core Java - Arrays
    'Array Introduction': 'Java Array Tutorial - Single and Multi-dimensional Arrays',
    'Single Dimensional Array': 'Java Single Dimensional Array Tutorial - 1D Array Examples',
    'Multi Dimensional Array': 'Java Multi Dimensional Array Tutorial - 2D and 3D Arrays',
    'Array Methods': 'Java Array Methods Tutorial - Arrays Class Utility Methods',
    
    // Core Java - Exception Handling
    'Exception Introduction': 'Java Exception Handling Tutorial - Try-Catch-Finally Blocks',
    'Try-Catch-Finally': 'Java Try-Catch-Finally Tutorial - Exception Handling Examples',
    'Throw and Throws': 'Java Throw and Throws Tutorial - Custom Exceptions',
    'Custom Exceptions': 'Java Custom Exceptions Tutorial - Create User-Defined Exceptions',
    
    // Core Java - Collections
    'Collection Introduction': 'Java Collections Framework Tutorial - List, Set, Map, Queue',
    'List Interface': 'Java List Interface Tutorial - ArrayList and LinkedList Examples',
    'Set Interface': 'Java Set Interface Tutorial - HashSet and TreeSet Examples',
    'Map Interface': 'Java Map Interface Tutorial - HashMap and TreeMap Examples',
    'Queue Interface': 'Java Queue Interface Tutorial - PriorityQueue and ArrayDeque',
    
    // Core Java - Multithreading
    'Thread Introduction': 'Java Multithreading Tutorial - Concurrent Programming Basics',
    'Thread Creation': 'Java Thread Creation Tutorial - Extend Thread vs Implement Runnable',
    'Thread Lifecycle': 'Java Thread Lifecycle Tutorial - New, Runnable, Blocked, Dead States',
    'Thread Methods': 'Java Thread Methods Tutorial - sleep(), join(), yield() Examples',
    
    // Core Java - Advanced
    'Synchronization': 'Java Synchronization Tutorial - Thread Safety with synchronized Keyword',
    'Serialization': 'Java Serialization Tutorial - Object Serialization and Deserialization',
    
    // HTML Topics
    'HTML Introduction': 'HTML Tutorial for Beginners - HyperText Markup Language Basics',
    'HTML Structure': 'HTML Document Structure Tutorial - DOCTYPE, html, head, body Tags',
    'HTML Links': 'HTML Links Tutorial - Anchor Tag and Hyperlinks with Examples',
    'HTML Images': 'HTML Images Tutorial - img Tag, alt Text, and Image Optimization',
    'HTML Lists': 'HTML Lists Tutorial - Ordered, Unordered, and Definition Lists',
    'HTML Tables': 'HTML Tables Tutorial - Create Tables with tr, td, th Tags',
    'HTML Forms': 'HTML Forms Tutorial - Input, Textarea, Select, Button Elements',
    'HTML Semantic Elements': 'HTML Semantic Elements Tutorial - header, nav, article, section',
    'HTML Media': 'HTML Media Tutorial - Audio and Video Tags with Examples',
    'HTML Iframe': 'HTML Iframe Tutorial - Embed External Content in Web Pages',
    'HTML DOM': 'HTML DOM Tutorial - Document Object Model Manipulation',
    'HTML Best Practices': 'HTML Best Practices Tutorial - Clean Code and Accessibility',
    
    // CSS Topics
    'CSS Introduction': 'CSS Tutorial for Beginners - Cascading Style Sheets Basics',
    'CSS Selectors': 'CSS Selectors Tutorial - Class, ID, Attribute, Pseudo-class Selectors',
    'CSS Colors and Backgrounds': 'CSS Colors and Backgrounds Tutorial - Color Values and Background Properties',
    'CSS Box Model': 'CSS Box Model Tutorial - Margin, Border, Padding Explained',
    'CSS Text and Fonts': 'CSS Text and Fonts Tutorial - Typography and Text Styling',
    'CSS Display and Positioning': 'CSS Display and Positioning Tutorial - position, display Properties',
    'CSS Flexbox': 'CSS Flexbox Tutorial - Flexible Layout with flexbox',
    'CSS Grid': 'CSS Grid Tutorial - Two-Dimensional Layout System',
    'CSS Responsive': 'CSS Responsive Design Tutorial - Media Queries and Mobile-First',
    'CSS Animations': 'CSS Animations Tutorial - Transitions and Keyframe Animations',
    
    // Git Topics
    'Git Introduction': 'Git Tutorial for Beginners - Version Control System Basics',
    'Git Installation': 'Git Installation Tutorial - Install Git on Windows, Mac, Linux',
    'Git Basics': 'Git Basics Tutorial - git init, add, commit, status Commands',
    'Git Branches': 'Git Branches Tutorial - Create, Switch, Merge Branches',
    'GitHub Basics': 'GitHub Tutorial for Beginners - Repository, Push, Pull, Clone',
    'GitHub Pull Requests': 'GitHub Pull Requests Tutorial - Create and Merge PRs',
    'Git Workflow': 'Git Workflow Tutorial - Feature Branch Workflow Best Practices',
    'Git Merge Config': 'Git Merge Configuration Tutorial - Resolve Merge Conflicts',
    'Git Branch Protection': 'Git Branch Protection Tutorial - Protect Main Branch',
    'Git Deployment': 'Git Deployment Tutorial - Deploy to Production with Git',
    'GitHub Security': 'GitHub Security Tutorial - Secrets, Dependencies, Vulnerabilities',
    'GitHub Teams': 'GitHub Teams Tutorial - Collaborate with Team Members',
    'Git Revert': 'Git Revert Tutorial - Undo Commits and Changes',
    
    // Maven Topics
    'Maven Introduction': 'Maven Tutorial for Beginners - Build Automation Tool',
    'Why Maven': 'Why Use Maven - Benefits of Maven Build Tool',
    'Maven Installation': 'Maven Installation Tutorial - Install Maven on Windows, Mac, Linux',
    'Maven Project Structure': 'Maven Project Structure Tutorial - Standard Directory Layout',
    'Maven POM XML': 'Maven POM XML Tutorial - Project Object Model Configuration',
    'Maven Create Project': 'Maven Create Project Tutorial - Generate Maven Project',
    'Maven Build Lifecycle': 'Maven Build Lifecycle Tutorial - validate, compile, test, package',
    'Maven Repositories': 'Maven Repositories Tutorial - Local, Central, Remote Repositories',
    'Maven Dependency Management': 'Maven Dependency Management Tutorial - Add and Manage Dependencies',
    'Maven Plugins': 'Maven Plugins Tutorial - Configure and Use Maven Plugins',
    'Maven Multi Module': 'Maven Multi Module Project Tutorial - Parent and Child Modules',
    'Maven Spring Boot': 'Maven Spring Boot Tutorial - Spring Boot Maven Project Setup',
    'Maven Commands': 'Maven Commands Tutorial - mvn clean, install, test, package',
    'Maven Common Errors': 'Maven Common Errors Tutorial - Troubleshoot Maven Issues',
    'Maven vs Gradle': 'Maven vs Gradle Comparison - Which Build Tool to Choose',
    'Maven Best Practices': 'Maven Best Practices Tutorial - Optimize Maven Configuration',
    
    // Spring Topics
    'Spring Introduction': 'Spring Framework Tutorial for Beginners - Dependency Injection and IOC',
    'Spring IOC': 'Spring IOC Tutorial - Inversion of Control Container',
    'Spring DI': 'Spring Dependency Injection Tutorial - Constructor and Setter Injection',
    'Spring Bean': 'Spring Bean Tutorial - Bean Lifecycle and Scopes',
    'Spring Application Context': 'Spring Application Context Tutorial - BeanFactory vs ApplicationContext',
    'Spring Configuration XML': 'Spring XML Configuration Tutorial - Configure Beans in XML',
    'Spring Configuration Annotation': 'Spring Annotation Configuration Tutorial - @Component, @Autowired',
    'Spring MVC Dispatcher Servlet': 'Spring MVC DispatcherServlet Tutorial - Front Controller Pattern',
    'Spring MVC Controller': 'Spring MVC Controller Tutorial - @Controller and @RequestMapping',
    'Spring MVC View Resolver': 'Spring MVC View Resolver Tutorial - JSP, Thymeleaf Views',
    'Spring MVC ModelAndView': 'Spring MVC ModelAndView Tutorial - Pass Data to Views',
    'Spring Project Login Student CRUD': 'Spring MVC CRUD Project Tutorial - Login and Student Management',
    'Spring Data Introduction': 'Spring Data Tutorial - Repository Pattern and JPA',
    'Spring Data Repository Architecture': 'Spring Data Repository Tutorial - CrudRepository, JpaRepository',
    'Spring JDBC Template': 'Spring JDBC Template Tutorial - Database Operations without JDBC Boilerplate',
    'Spring Data Custom Queries': 'Spring Data Custom Queries Tutorial - @Query and Native Queries',
    'Spring AOP Introduction': 'Spring AOP Tutorial - Aspect-Oriented Programming Basics',
    'Spring AOP Advanced Pointcuts': 'Spring AOP Pointcuts Tutorial - @Pointcut Expressions',
    'Spring AOP Custom Annotations': 'Spring AOP Custom Annotations Tutorial - Create Custom Aspects',
    'Spring AOP Aspect Ordering': 'Spring AOP Aspect Ordering Tutorial - Control Aspect Execution Order',
    'Spring AOP with Spring Boot': 'Spring AOP Spring Boot Tutorial - AOP in Spring Boot Applications',
    
    // MySQL Topics
    'MySQL Introduction': 'MySQL Database Tutorial for Beginners - Relational Database Management',
    'MySQL Installation': 'MySQL Installation Tutorial - Step by Step Guide for Windows',
    'MySQL Data Types': 'MySQL Data Types Tutorial - INT, VARCHAR, DATE, TEXT Examples',
    'MySQL Create Database': 'MySQL Create Database Tutorial - CREATE DATABASE and TABLE',
    'MySQL SELECT': 'MySQL SELECT Query Tutorial - Retrieve Data from Tables',
    'MySQL INSERT UPDATE DELETE': 'MySQL DML Tutorial - INSERT, UPDATE, DELETE Statements',
    'MySQL Joins': 'MySQL Joins Tutorial - INNER, LEFT, RIGHT, FULL OUTER JOIN',
    'MySQL Constraints': 'MySQL Constraints Tutorial - PRIMARY KEY, FOREIGN KEY, UNIQUE',
    'MySQL Aggregate Functions': 'MySQL Aggregate Functions - COUNT, SUM, AVG, MIN, MAX',
    'MySQL Scalar Functions': 'MySQL Scalar Functions - UCASE, LCASE, MID, LENGTH, ROUND',
    'MySQL Views': 'MySQL Views Tutorial - CREATE, ALTER, DROP Views',
    'MySQL Stored Procedures': 'MySQL Stored Procedures Tutorial - CREATE and CALL Procedures',
    'MySQL Triggers': 'MySQL Triggers Tutorial - BEFORE and AFTER Triggers',
    'MySQL Transactions': 'MySQL Transactions Tutorial - COMMIT, ROLLBACK, SAVEPOINT',
    'MySQL Subqueries': 'MySQL Subqueries Tutorial - Nested Queries in SELECT, WHERE',
    'MySQL DDL': 'MySQL DDL Tutorial - ALTER, DROP, TRUNCATE Statements',
    'MySQL DQL': 'MySQL DQL Tutorial - SELECT Statement with Examples',
    'MySQL Clauses': 'MySQL Clauses Tutorial - WHERE, GROUP BY, HAVING, ORDER BY',
    'MySQL Privileges': 'MySQL Privileges Tutorial - GRANT and REVOKE User Permissions',
    'MySQL Indexes': 'MySQL Indexes Tutorial - CREATE INDEX for Performance',
    'MySQL Project Setup': 'MySQL Project Setup Tutorial - Connect Java with MySQL',
  };
  
  // Return SEO title if exists, otherwise generate one
  if (seoTitles[title]) {
    return seoTitles[title];
  }
  
  // Generate SEO-friendly title with more descriptive format
  const courseName = courseTitle || 'Java';
  
  // Make title more descriptive based on course type
  if (courseName.includes('Java') || courseName.includes('Core')) {
    return `${title} Tutorial - Learn ${title} in Java with Examples & Code | LearnStackHub`;
  } else if (courseName.includes('MySQL')) {
    return `${title} Tutorial - MySQL Database ${title} with Examples | LearnStackHub`;
  } else if (courseName.includes('Servlet')) {
    return `${title} Tutorial - Java Servlet ${title} with Code Examples | LearnStackHub`;
  } else if (courseName.includes('JSP')) {
    return `${title} Tutorial - JSP ${title} with Examples & Code | LearnStackHub`;
  } else if (courseName.includes('Hibernate')) {
    return `${title} Tutorial - Hibernate ORM ${title} with Examples | LearnStackHub`;
  } else if (courseName.includes('Spring')) {
    return `${title} Tutorial - Spring Framework ${title} with Examples | LearnStackHub`;
  } else if (courseName.includes('HTML')) {
    return `${title} Tutorial - HTML ${title} for Beginners with Examples | LearnStackHub`;
  } else if (courseName.includes('CSS')) {
    return `${title} Tutorial - CSS ${title} Styling with Examples | LearnStackHub`;
  } else if (courseName.includes('Git')) {
    return `${title} Tutorial - Git ${title} Commands and Examples | LearnStackHub`;
  } else if (courseName.includes('Maven')) {
    return `${title} Tutorial - Maven ${title} Configuration with Examples | LearnStackHub`;
  }
  
  // Default fallback
  return `${title} Tutorial - ${courseName} ${title} with Examples & Code | LearnStackHub`;
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


