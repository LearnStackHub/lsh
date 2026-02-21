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
    'JDBC Project Setup': 'JDBC Project Setup Tutorial - How to Add MySQL Connector JAR File',
    
    // Servlet Topics
    'Servlet Introduction': 'Java Servlet Tutorial for Beginners - Web Application Development',
    'Servlet Lifecycle': 'Servlet Lifecycle Explained with Example - init(), service(), destroy()',
    'Servlet API': 'Java Servlet API Tutorial - HttpServletRequest and HttpServletResponse',
    'Servlet Configuration': 'Servlet Configuration Tutorial - web.xml and Annotations',
    'HTTP Request and Response': 'Servlet Request Response Tutorial - Get Parameters, Set Headers',
    'Session Management': 'Servlet Session Management Tutorial - HttpSession with Examples',
    'Filters and Listeners': 'Servlet Filters and Listeners Tutorial - Request Filtering Examples',
    'Servlet Annotations': 'Servlet Annotations Tutorial - @WebServlet, @WebFilter Examples',
    'Servlet Security': 'Servlet Security Tutorial - Authentication and Authorization',
    'Servlet Project Setup': 'Servlet Project Setup Tutorial - Create Servlet in Eclipse with Tomcat',
    'Tomcat Server': 'Apache Tomcat Server Tutorial - Installation, Configuration, Deployment',
    'Servlet Frontend Integration': 'HTML CSS with Servlet Tutorial - Complete Project Example',
    
    // JSP Topics
    'JSP Introduction': 'JSP Tutorial for Beginners - JavaServer Pages with Examples',
    'JSP Architecture': 'JSP Architecture Explained - How JSP Works Internally',
    'JSP Scripting Elements': 'JSP Scripting Elements Tutorial - Scriptlets, Expressions, Declarations',
    'JSP Directives': 'JSP Directives Tutorial - page, include, taglib Directives',
    'JSP Implicit Objects': 'JSP Implicit Objects Tutorial - request, response, session, out Examples',
    'JSP Action Tags': 'JSP Action Tags Tutorial - jsp:include, jsp:forward, jsp:useBean',
    'JSP Expression Language': 'JSP EL Tutorial - Expression Language with Examples',
    'JSP JSTL': 'JSP JSTL Tutorial - JSP Standard Tag Library with Examples',
    'JSP Custom Tags': 'JSP Custom Tags Tutorial - Create Custom Tags in JSP',
    'JSP Project Setup': 'JSP Project Setup Tutorial - Create JSP Project in Eclipse with Tomcat',
    
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


