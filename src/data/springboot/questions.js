// Spring Boot MCQ Questions Pool (120+ questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all Spring Boot topics: Introduction, Auto-configuration, Starters, Actuator, JPA, Security, etc.

export const allQuestions = [
  // ========== SPRING BOOT INTRODUCTION & BASICS (20 questions) ==========
  {
    id: 1,
    question: "What is Spring Boot?",
    options: ["A programming language", "A framework built on top of Spring Framework", "A database", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Boot is a framework built on top of Spring Framework that simplifies Spring application development."
  },
  {
    id: 2,
    question: "What is the main advantage of Spring Boot?",
    options: ["Faster development", "Auto-configuration", "Embedded server", "All of the above"],
    correctAnswer: 3,
    explanation: "Spring Boot provides faster development, auto-configuration, embedded servers, and production-ready features."
  },
  {
    id: 3,
    question: "What is auto-configuration in Spring Boot?",
    options: ["Manual configuration", "Automatic configuration based on classpath", "No configuration", "Database configuration"],
    correctAnswer: 1,
    explanation: "Auto-configuration automatically configures Spring applications based on dependencies present in the classpath."
  },
  {
    id: 4,
    question: "What are Spring Boot Starters?",
    options: ["Starter classes", "Pre-configured dependency sets", "Configuration files", "Database tables"],
    correctAnswer: 1,
    explanation: "Spring Boot Starters are pre-configured dependency sets that simplify dependency management."
  },
  {
    id: 5,
    question: "Which annotation is used to mark the main Spring Boot application class?",
    options: ["@SpringBootApplication", "@SpringApplication", "@BootApplication", "@Application"],
    correctAnswer: 0,
    explanation: "@SpringBootApplication is a combination of @Configuration, @EnableAutoConfiguration, and @ComponentScan."
  },
  {
    id: 6,
    question: "What does @SpringBootApplication include?",
    options: ["@Configuration", "@EnableAutoConfiguration, @ComponentScan", "@Configuration, @EnableAutoConfiguration, @ComponentScan", "Only @ComponentScan"],
    correctAnswer: 2,
    explanation: "@SpringBootApplication is equivalent to @Configuration + @EnableAutoConfiguration + @ComponentScan."
  },
  {
    id: 7,
    question: "What is an embedded server in Spring Boot?",
    options: ["External server", "Server embedded in the application (Tomcat, Jetty)", "No server", "Database server"],
    correctAnswer: 1,
    explanation: "Spring Boot includes embedded servers (Tomcat, Jetty, Undertow) so applications can run as standalone JARs."
  },
  {
    id: 8,
    question: "What is the default embedded server in Spring Boot?",
    options: ["Jetty", "Tomcat", "Undertow", "WildFly"],
    correctAnswer: 1,
    explanation: "Tomcat is the default embedded server in Spring Boot."
  },
  {
    id: 9,
    question: "What is the default port for Spring Boot applications?",
    options: ["8080", "9090", "3000", "5000"],
    correctAnswer: 0,
    explanation: "Spring Boot applications run on port 8080 by default."
  },
  {
    id: 10,
    question: "How to change the default port in Spring Boot?",
    options: ["server.port in application.properties", "PORT environment variable", "Both", "Cannot be changed"],
    correctAnswer: 2,
    explanation: "Port can be changed using server.port in application.properties or PORT environment variable."
  },
  {
    id: 11,
    question: "What is Spring Initializr?",
    options: ["A database", "A web-based tool to generate Spring Boot projects", "A framework", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Initializr is a web-based tool (start.spring.io) to generate Spring Boot project structure."
  },
  {
    id: 12,
    question: "What file format is used for Spring Boot configuration?",
    options: ["Only XML", "Only properties", "properties, YAML, or both", "Only YAML"],
    correctAnswer: 2,
    explanation: "Spring Boot supports both application.properties and application.yml (YAML) for configuration."
  },
  {
    id: 13,
    question: "What is the main method in Spring Boot application?",
    options: ["SpringApplication.run()", "Application.run()", "Boot.run()", "Spring.run()"],
    correctAnswer: 0,
    explanation: "SpringApplication.run() is used to bootstrap and run a Spring Boot application."
  },
  {
    id: 14,
    question: "What is the default packaging for Spring Boot applications?",
    options: ["WAR", "JAR", "EAR", "ZIP"],
    correctAnswer: 1,
    explanation: "Spring Boot applications are packaged as JAR files by default (executable JARs)."
  },
  {
    id: 15,
    question: "Can Spring Boot applications be packaged as WAR?",
    options: ["No", "Yes, with configuration", "Only JAR", "Only WAR"],
    correctAnswer: 1,
    explanation: "Yes, Spring Boot applications can be packaged as WAR files with proper configuration."
  },
  {
    id: 16,
    question: "What is the parent POM in Spring Boot?",
    options: ["spring-boot-parent", "spring-boot-starter-parent", "spring-parent", "boot-parent"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-parent is the parent POM that provides dependency management and plugin configuration."
  },
  {
    id: 17,
    question: "What is the purpose of spring-boot-starter-parent?",
    options: ["To create parent class", "To provide dependency management and defaults", "To create database", "To compile code"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-parent provides dependency management, plugin configuration, and sensible defaults."
  },
  {
    id: 18,
    question: "What is spring-boot-starter-web?",
    options: ["Web framework", "Starter for building web applications", "Database starter", "Security starter"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-web is a starter for building web applications including REST APIs."
  },
  {
    id: 19,
    question: "What dependencies does spring-boot-starter-web include?",
    options: ["Only Spring MVC", "Spring MVC, Tomcat, Jackson", "Only Tomcat", "Only Jackson"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-web includes Spring MVC, embedded Tomcat, and Jackson for JSON processing."
  },
  {
    id: 20,
    question: "What is the difference between Spring and Spring Boot?",
    options: ["No difference", "Spring Boot adds auto-configuration and starters", "Spring Boot replaces Spring", "Spring is newer"],
    correctAnswer: 1,
    explanation: "Spring Boot extends Spring Framework with auto-configuration, starters, and embedded servers for faster development."
  },

  // ========== SPRING BOOT AUTO-CONFIGURATION (15 questions) ==========
  {
    id: 21,
    question: "What is @EnableAutoConfiguration?",
    options: ["Enables manual configuration", "Enables Spring Boot auto-configuration", "Disables configuration", "Creates configuration"],
    correctAnswer: 1,
    explanation: "@EnableAutoConfiguration enables Spring Boot's auto-configuration mechanism."
  },
  {
    id: 22,
    question: "How does Spring Boot auto-configuration work?",
    options: ["Randomly", "Based on classpath dependencies", "Based on database", "Based on IDE"],
    correctAnswer: 1,
    explanation: "Auto-configuration works by detecting dependencies in the classpath and configuring beans accordingly."
  },
  {
    id: 23,
    question: "What is @ConditionalOnClass used for?",
    options: ["To check class", "To conditionally configure beans when class is present", "To create class", "To delete class"],
    correctAnswer: 1,
    explanation: "@ConditionalOnClass conditionally configures beans only when specified class is present in classpath."
  },
  {
    id: 24,
    question: "What is @ConditionalOnMissingBean used for?",
    options: ["To check bean", "To configure bean only if it doesn't exist", "To create bean", "To delete bean"],
    correctAnswer: 1,
    explanation: "@ConditionalOnMissingBean configures a bean only if no bean of that type already exists."
  },
  {
    id: 25,
    question: "What is @ConditionalOnProperty used for?",
    options: ["To check property", "To conditionally configure based on property value", "To create property", "To delete property"],
    correctAnswer: 1,
    explanation: "@ConditionalOnProperty conditionally configures beans based on property values."
  },
  {
    id: 26,
    question: "Can auto-configuration be disabled?",
    options: ["No", "Yes, using exclude in @SpringBootApplication", "Only partially", "Only in Spring Boot 3"],
    correctAnswer: 1,
    explanation: "Yes, auto-configuration can be disabled using exclude parameter in @SpringBootApplication."
  },
  {
    id: 27,
    question: "What is spring.autoconfigure.exclude used for?",
    options: ["To exclude auto-configuration classes", "To include classes", "To create classes", "To delete classes"],
    correctAnswer: 0,
    explanation: "spring.autoconfigure.exclude property is used to exclude specific auto-configuration classes."
  },
  {
    id: 28,
    question: "What happens if you add spring-boot-starter-data-jpa?",
    options: ["Nothing", "Auto-configures JPA, Hibernate, DataSource", "Only configures JPA", "Only configures Hibernate"],
    correctAnswer: 1,
    explanation: "Adding spring-boot-starter-data-jpa auto-configures JPA, Hibernate, and DataSource."
  },
  {
    id: 29,
    question: "What is the default database in Spring Boot?",
    options: ["MySQL", "H2 (in-memory)", "PostgreSQL", "Oracle"],
    correctAnswer: 1,
    explanation: "H2 is the default in-memory database used by Spring Boot for development and testing."
  },
  {
    id: 30,
    question: "How to override auto-configuration?",
    options: ["Cannot override", "Define your own @Bean", "Use @Primary", "Both define @Bean and use @Primary"],
    correctAnswer: 3,
    explanation: "You can override auto-configuration by defining your own @Bean, optionally with @Primary annotation."
  },
  {
    id: 31,
    question: "What is @AutoConfigureAfter used for?",
    options: ["To configure after", "To specify order of auto-configuration", "To configure before", "To skip configuration"],
    correctAnswer: 1,
    explanation: "@AutoConfigureAfter specifies that auto-configuration should happen after specified classes."
  },
  {
    id: 32,
    question: "What is @AutoConfigureBefore used for?",
    options: ["To configure before", "To specify order of auto-configuration", "To configure after", "To skip configuration"],
    correctAnswer: 1,
    explanation: "@AutoConfigureBefore specifies that auto-configuration should happen before specified classes."
  },
  {
    id: 33,
    question: "What is @ConditionalOnWebApplication used for?",
    options: ["To check web", "To conditionally configure for web applications", "To create web app", "To delete web app"],
    correctAnswer: 1,
    explanation: "@ConditionalOnWebApplication conditionally configures beans only in web application context."
  },
  {
    id: 34,
    question: "What is @ConditionalOnClass used for?",
    options: ["To check class exists", "To conditionally configure when class is present", "To create class", "To delete class"],
    correctAnswer: 1,
    explanation: "@ConditionalOnClass conditionally configures beans when specified class is in classpath."
  },
  {
    id: 35,
    question: "What is the purpose of spring.factories file?",
    options: ["To list factories", "To list auto-configuration classes", "To create factories", "To delete factories"],
    correctAnswer: 1,
    explanation: "spring.factories file lists auto-configuration classes that Spring Boot should load."
  },

  // ========== SPRING BOOT CONFIGURATION (15 questions) ==========
  {
    id: 36,
    question: "What is application.properties?",
    options: ["A database", "Configuration file for Spring Boot", "A class", "A method"],
    correctAnswer: 1,
    explanation: "application.properties is the default configuration file for Spring Boot applications."
  },
  {
    id: 37,
    question: "What is application.yml?",
    options: ["A database", "YAML format configuration file", "A class", "A method"],
    correctAnswer: 1,
    explanation: "application.yml is a YAML format configuration file alternative to application.properties."
  },
  {
    id: 38,
    question: "Which has higher priority: application.properties or application.yml?",
    options: ["application.properties", "application.yml", "Both equal", "Depends on order"],
    correctAnswer: 0,
    explanation: "application.properties has higher priority than application.yml if both exist."
  },
  {
    id: 39,
    question: "What is @ConfigurationProperties used for?",
    options: ["To configure properties", "To bind properties to Java objects", "To create properties", "To delete properties"],
    correctAnswer: 1,
    explanation: "@ConfigurationProperties binds properties from configuration files to Java objects."
  },
  {
    id: 40,
    question: "What is @Value annotation used for?",
    options: ["To inject values", "To inject property values", "To create values", "To delete values"],
    correctAnswer: 1,
    explanation: "@Value annotation injects property values or SpEL expressions into fields or method parameters."
  },
  {
    id: 41,
    question: "What are Spring Boot Profiles?",
    options: ["User profiles", "Environment-specific configurations", "Database profiles", "Network profiles"],
    correctAnswer: 1,
    explanation: "Spring Boot Profiles allow environment-specific configurations (dev, prod, test, etc.)."
  },
  {
    id: 42,
    question: "How to activate a profile?",
    options: ["spring.profiles.active in properties", "SPRING_PROFILES_ACTIVE environment variable", "Both", "Cannot activate"],
    correctAnswer: 2,
    explanation: "Profiles can be activated using spring.profiles.active property or SPRING_PROFILES_ACTIVE environment variable."
  },
  {
    id: 43,
    question: "What is profile-specific configuration file?",
    options: ["application.properties", "application-{profile}.properties", "profile.properties", "config.properties"],
    correctAnswer: 1,
    explanation: "Profile-specific files like application-dev.properties are loaded when that profile is active."
  },
  {
    id: 44,
    question: "What is @Profile annotation used for?",
    options: ["To create profile", "To conditionally register beans based on active profile", "To delete profile", "To update profile"],
    correctAnswer: 1,
    explanation: "@Profile annotation conditionally registers beans only when specified profile is active."
  },
  {
    id: 45,
    question: "What is externalized configuration?",
    options: ["Internal config", "Moving configuration outside application code", "Database config", "Network config"],
    correctAnswer: 1,
    explanation: "Externalized configuration means storing configuration outside application code (properties files, environment variables)."
  },
  {
    id: 46,
    question: "What is the order of configuration property sources?",
    options: ["Random", "Command line > Environment variables > application.properties", "Only properties file", "Only environment variables"],
    correctAnswer: 1,
    explanation: "Configuration priority: command line arguments > environment variables > application.properties/yml."
  },
  {
    id: 47,
    question: "What is @PropertySource used for?",
    options: ["To load properties", "To load additional property files", "To create properties", "To delete properties"],
    correctAnswer: 1,
    explanation: "@PropertySource loads additional property files into Spring Environment."
  },
  {
    id: 48,
    question: "What is spring.config.location used for?",
    options: ["To set config location", "To specify custom configuration file location", "To create config", "To delete config"],
    correctAnswer: 1,
    explanation: "spring.config.location property specifies custom location for configuration files."
  },
  {
    id: 49,
    question: "What is @RefreshScope used for?",
    options: ["To refresh scope", "To refresh beans when configuration changes (Spring Cloud)", "To create scope", "To delete scope"],
    correctAnswer: 1,
    explanation: "@RefreshScope (Spring Cloud) allows beans to be refreshed when configuration changes without restart."
  },
  {
    id: 50,
    question: "What is the default configuration file name?",
    options: ["config.properties", "application.properties", "spring.properties", "boot.properties"],
    correctAnswer: 1,
    explanation: "application.properties (or application.yml) is the default configuration file name in Spring Boot."
  },

  // ========== SPRING BOOT ACTUATOR (15 questions) ==========
  {
    id: 51,
    question: "What is Spring Boot Actuator?",
    options: ["A database", "Production-ready features for monitoring and management", "A framework", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Boot Actuator provides production-ready features for monitoring and managing applications."
  },
  {
    id: 52,
    question: "What is the starter for Actuator?",
    options: ["spring-boot-starter-actuator", "spring-boot-actuator", "spring-actuator", "boot-actuator"],
    correctAnswer: 0,
    explanation: "spring-boot-starter-actuator is the starter dependency for Actuator."
  },
  {
    id: 53,
    question: "What is /actuator/health endpoint?",
    options: ["Health check endpoint", "Database endpoint", "Config endpoint", "Log endpoint"],
    correctAnswer: 0,
    explanation: "/actuator/health endpoint provides application health information."
  },
  {
    id: 54,
    question: "What is /actuator/info endpoint?",
    options: ["Health info", "Application information", "Database info", "Config info"],
    correctAnswer: 1,
    explanation: "/actuator/info endpoint provides custom application information."
  },
  {
    id: 55,
    question: "What is /actuator/metrics endpoint?",
    options: ["Health metrics", "Application metrics", "Database metrics", "Network metrics"],
    correctAnswer: 1,
    explanation: "/actuator/metrics endpoint provides application metrics and measurements."
  },
  {
    id: 56,
    question: "How to expose Actuator endpoints?",
    options: ["management.endpoints.web.exposure.include", "management.endpoint.health.enabled", "Both", "Cannot expose"],
    correctAnswer: 2,
    explanation: "Endpoints are exposed using management.endpoints.web.exposure.include property."
  },
  {
    id: 57,
    question: "What is the default exposure of Actuator endpoints?",
    options: ["All exposed", "Only health and info", "None exposed", "Only health"],
    correctAnswer: 1,
    explanation: "By default, only /health and /info endpoints are exposed."
  },
  {
    id: 58,
    question: "What is management.endpoints.web.exposure.include=*?",
    options: ["Exposes no endpoints", "Exposes all endpoints", "Exposes only health", "Exposes only info"],
    correctAnswer: 1,
    explanation: "Setting it to '*' exposes all Actuator endpoints (use with caution in production)."
  },
  {
    id: 59,
    question: "What is /actuator/env endpoint?",
    options: ["Environment variables", "Environment properties and configuration", "Database env", "Network env"],
    correctAnswer: 1,
    explanation: "/actuator/env endpoint shows environment properties and configuration."
  },
  {
    id: 60,
    question: "What is /actuator/beans endpoint?",
    options: ["Database beans", "All Spring beans in application context", "Only controllers", "Only services"],
    correctAnswer: 1,
    explanation: "/actuator/beans endpoint shows all Spring beans in the application context."
  },
  {
    id: 61,
    question: "What is custom health indicator?",
    options: ["Default health", "Custom health check implementation", "Database health", "Network health"],
    correctAnswer: 1,
    explanation: "Custom health indicators implement HealthIndicator interface to provide custom health checks."
  },
  {
    id: 62,
    question: "What is @Component with implements HealthIndicator?",
    options: ["Default component", "Custom health indicator", "Service component", "Controller component"],
    correctAnswer: 1,
    explanation: "A class annotated with @Component and implementing HealthIndicator creates a custom health check."
  },
  {
    id: 63,
    question: "What is management.endpoint.health.show-details?",
    options: ["Shows health details", "Configures health endpoint detail level", "Shows database", "Shows network"],
    correctAnswer: 1,
    explanation: "This property configures how much detail the health endpoint shows (never, when-authorized, always)."
  },
  {
    id: 64,
    question: "What is /actuator/shutdown endpoint?",
    options: ["Shuts down database", "Gracefully shuts down application", "Shuts down server", "Shuts down network"],
    correctAnswer: 1,
    explanation: "/actuator/shutdown endpoint allows graceful shutdown of the application (POST request)."
  },
  {
    id: 65,
    question: "Is /actuator/shutdown enabled by default?",
    options: ["Yes", "No, must be enabled explicitly", "Only in dev", "Only in prod"],
    correctAnswer: 1,
    explanation: "Shutdown endpoint is disabled by default and must be explicitly enabled for security reasons."
  },

  // ========== SPRING BOOT JPA & DATABASE (15 questions) ==========
  {
    id: 66,
    question: "What is spring-boot-starter-data-jpa?",
    options: ["JPA framework", "Starter for Spring Data JPA", "Database", "ORM tool"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-data-jpa is a starter for Spring Data JPA with Hibernate."
  },
  {
    id: 67,
    question: "What does spring-boot-starter-data-jpa include?",
    options: ["Only JPA", "JPA, Hibernate, Spring Data JPA", "Only Hibernate", "Only Spring Data"],
    correctAnswer: 1,
    explanation: "It includes JPA API, Hibernate implementation, and Spring Data JPA."
  },
  {
    id: 68,
    question: "What is the default JPA provider in Spring Boot?",
    options: ["EclipseLink", "Hibernate", "OpenJPA", "TopLink"],
    correctAnswer: 1,
    explanation: "Hibernate is the default JPA provider in Spring Boot."
  },
  {
    id: 69,
    question: "What is spring.jpa.hibernate.ddl-auto?",
    options: ["Database creation", "Hibernate DDL auto mode (create, update, validate, none)", "JPA config", "Hibernate version"],
    correctAnswer: 1,
    explanation: "This property controls Hibernate's DDL auto mode (create, update, validate, none)."
  },
  {
    id: 70,
    question: "What is spring.jpa.show-sql?",
    options: ["Shows SQL", "Enables logging of SQL statements", "Shows database", "Shows JPA"],
    correctAnswer: 1,
    explanation: "spring.jpa.show-sql enables logging of SQL statements to console."
  },
  {
    id: 71,
    question: "What is @Entity annotation?",
    options: ["Marks entity", "Marks JPA entity class", "Marks component", "Marks service"],
    correctAnswer: 1,
    explanation: "@Entity annotation marks a class as a JPA entity (database table)."
  },
  {
    id: 72,
    question: "What is @Repository annotation in Spring Data JPA?",
    options: ["Marks repository", "Marks repository interface (optional in Spring Data)", "Marks service", "Marks controller"],
    correctAnswer: 1,
    explanation: "@Repository is optional in Spring Data JPA as interfaces extending JpaRepository are automatically detected."
  },
  {
    id: 73,
    question: "What is JpaRepository?",
    options: ["A class", "Interface providing JPA-specific methods", "A method", "A property"],
    correctAnswer: 1,
    explanation: "JpaRepository is a Spring Data interface that extends Repository and provides JPA-specific methods."
  },
  {
    id: 74,
    question: "What methods does JpaRepository provide?",
    options: ["Only save", "save, findAll, findById, delete, etc.", "Only findById", "Only delete"],
    correctAnswer: 1,
    explanation: "JpaRepository provides methods like save, findAll, findById, delete, count, exists, etc."
  },
  {
    id: 75,
    question: "What is @Query annotation used for?",
    options: ["To create queries", "To define custom queries in repositories", "To delete queries", "To update queries"],
    correctAnswer: 1,
    explanation: "@Query annotation defines custom queries (JPQL or native SQL) in repository methods."
  },
  {
    id: 76,
    question: "What is @Modifying annotation used for?",
    options: ["To modify queries", "To mark modifying queries (UPDATE, DELETE)", "To create queries", "To delete queries"],
    correctAnswer: 1,
    explanation: "@Modifying marks repository methods that modify data (UPDATE, DELETE operations)."
  },
  {
    id: 77,
    question: "What is @Transactional used for in repositories?",
    options: ["To create transactions", "To manage transaction boundaries", "To delete transactions", "To update transactions"],
    correctAnswer: 1,
    explanation: "@Transactional manages transaction boundaries for repository methods."
  },
  {
    id: 78,
    question: "What is the default transaction management in Spring Data JPA?",
    options: ["No transactions", "Repository methods are transactional", "Only save is transactional", "Only delete is transactional"],
    correctAnswer: 1,
    explanation: "Repository methods (save, delete, etc.) are transactional by default in Spring Data JPA."
  },
  {
    id: 79,
    question: "What is @EnableJpaRepositories used for?",
    options: ["To enable JPA", "To enable Spring Data JPA repositories", "To disable JPA", "To create JPA"],
    correctAnswer: 1,
    explanation: "@EnableJpaRepositories enables Spring Data JPA repository scanning (auto-enabled in Spring Boot)."
  },
  {
    id: 80,
    question: "What is spring.datasource.url used for?",
    options: ["To set database URL", "To configure database connection URL", "To create database", "To delete database"],
    correctAnswer: 1,
    explanation: "spring.datasource.url configures the JDBC URL for database connection."
  },

  // ========== SPRING BOOT REST API (15 questions) ==========
  {
    id: 81,
    question: "What is @RestController?",
    options: ["Same as @Controller", "@Controller + @ResponseBody", "Different from @Controller", "Only for REST"],
    correctAnswer: 1,
    explanation: "@RestController is a combination of @Controller and @ResponseBody, used for REST APIs."
  },
  {
    id: 82,
    question: "What is @RequestMapping used for?",
    options: ["To map requests", "To map HTTP requests to controller methods", "To map database", "To map views"],
    correctAnswer: 1,
    explanation: "@RequestMapping maps HTTP requests to controller methods based on URL patterns and HTTP methods."
  },
  {
    id: 83,
    question: "What are specialized @RequestMapping annotations?",
    options: ["@GetMapping, @PostMapping", "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping", "Only @GetMapping", "Only @PostMapping"],
    correctAnswer: 1,
    explanation: "Specialized annotations: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping."
  },
  {
    id: 84,
    question: "What is @RequestBody used for?",
    options: ["To get request parameters", "To bind request body (JSON/XML) to Java object", "To get path variables", "To get headers"],
    correctAnswer: 1,
    explanation: "@RequestBody binds HTTP request body (JSON, XML) to a Java object."
  },
  {
    id: 85,
    question: "What is @ResponseBody used for?",
    options: ["To set response parameters", "To bind return value to response body (JSON/XML)", "To set path variables", "To set headers"],
    correctAnswer: 1,
    explanation: "@ResponseBody binds method return value to HTTP response body (typically JSON)."
  },
  {
    id: 86,
    question: "What is @PathVariable used for?",
    options: ["To get request parameters", "To extract path variables from URL", "To get request body", "To get headers"],
    correctAnswer: 1,
    explanation: "@PathVariable extracts path variables from URL (e.g., /user/{id})."
  },
  {
    id: 87,
    question: "What is @RequestParam used for?",
    options: ["To get path variables", "To extract query parameters or form data", "To get request body", "To get headers"],
    correctAnswer: 1,
    explanation: "@RequestParam extracts query parameters or form data from the request."
  },
  {
    id: 88,
    question: "What is ResponseEntity?",
    options: ["A response", "Wrapper for HTTP response with status, headers, body", "A request", "A controller"],
    correctAnswer: 1,
    explanation: "ResponseEntity is a wrapper for HTTP response that includes status code, headers, and body."
  },
  {
    id: 89,
    question: "What is @CrossOrigin used for?",
    options: ["To enable CORS", "To handle cross-origin requests", "To disable CORS", "To create origin"],
    correctAnswer: 1,
    explanation: "@CrossOrigin enables CORS (Cross-Origin Resource Sharing) for specific endpoints."
  },
  {
    id: 90,
    question: "What is @Valid annotation used for?",
    options: ["To validate", "To enable validation on request body", "To disable validation", "To create validation"],
    correctAnswer: 1,
    explanation: "@Valid annotation enables validation on request body using Bean Validation (JSR-303)."
  },
  {
    id: 91,
    question: "What is @ExceptionHandler used for?",
    options: ["To handle exceptions", "To handle exceptions in controllers", "To create exceptions", "To delete exceptions"],
    correctAnswer: 1,
    explanation: "@ExceptionHandler handles exceptions thrown by controller methods."
  },
  {
    id: 92,
    question: "What is @ControllerAdvice used for?",
    options: ["To create controller", "To provide global exception handling", "To delete controller", "To update controller"],
    correctAnswer: 1,
    explanation: "@ControllerAdvice provides global exception handling and common behavior for all controllers."
  },
  {
    id: 93,
    question: "What is the default JSON library in Spring Boot?",
    options: ["Gson", "Jackson", "FastJSON", "JSON-lib"],
    correctAnswer: 1,
    explanation: "Jackson is the default JSON processing library in Spring Boot."
  },
  {
    id: 94,
    question: "What is @JsonIgnore used for?",
    options: ["To ignore JSON", "To exclude fields from JSON serialization", "To include fields", "To create JSON"],
    correctAnswer: 1,
    explanation: "@JsonIgnore excludes fields from JSON serialization/deserialization."
  },
  {
    id: 95,
    question: "What is content negotiation in Spring Boot?",
    options: ["Negotiating content", "Determining response format (JSON, XML) based on Accept header", "Creating content", "Deleting content"],
    correctAnswer: 1,
    explanation: "Content negotiation determines response format (JSON, XML) based on Accept header or URL extension."
  },

  // ========== SPRING BOOT SECURITY (10 questions) ==========
  {
    id: 96,
    question: "What is spring-boot-starter-security?",
    options: ["Security framework", "Starter for Spring Security", "Database security", "Network security"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-security is a starter for Spring Security framework."
  },
  {
    id: 97,
    question: "What does Spring Security provide by default?",
    options: ["No security", "Basic authentication for all endpoints", "Only login", "Only logout"],
    correctAnswer: 1,
    explanation: "Spring Security provides basic authentication for all endpoints by default (username: user, password: generated)."
  },
  {
    id: 98,
    question: "What is @EnableWebSecurity used for?",
    options: ["To enable security", "To enable Spring Security web support", "To disable security", "To create security"],
    correctAnswer: 1,
    explanation: "@EnableWebSecurity enables Spring Security web support and applies security configuration."
  },
  {
    id: 99,
    question: "What is SecurityFilterChain?",
    options: ["A filter", "Configuration for security filters", "A database filter", "A network filter"],
    correctAnswer: 1,
    explanation: "SecurityFilterChain (Bean) configures security filters and rules for Spring Security."
  },
  {
    id: 100,
    question: "What is @PreAuthorize used for?",
    options: ["To authorize", "To check authorization before method execution", "To create authorization", "To delete authorization"],
    correctAnswer: 1,
    explanation: "@PreAuthorize checks authorization before method execution using SpEL expressions."
  },
  {
    id: 101,
    question: "What is @Secured used for?",
    options: ["To secure", "To secure methods with roles", "To create security", "To delete security"],
    correctAnswer: 1,
    explanation: "@Secured secures methods by requiring specific roles."
  },
  {
    id: 102,
    question: "What is JWT in Spring Security?",
    options: ["Java Web Token", "JSON Web Token for authentication", "Java Token", "JSON Token"],
    correctAnswer: 1,
    explanation: "JWT (JSON Web Token) is a token-based authentication mechanism used in Spring Security."
  },
  {
    id: 103,
    question: "What is OAuth2?",
    options: ["A database", "Authorization framework", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "OAuth2 is an authorization framework that allows third-party services to access resources."
  },
  {
    id: 104,
    question: "What is spring.security.user.name used for?",
    options: ["To set username", "To configure default username", "To create user", "To delete user"],
    correctAnswer: 1,
    explanation: "spring.security.user.name configures the default username for basic authentication."
  },
  {
    id: 105,
    question: "What is spring.security.user.password used for?",
    options: ["To set password", "To configure default password", "To create password", "To delete password"],
    correctAnswer: 1,
    explanation: "spring.security.user.password configures the default password for basic authentication."
  },

  // ========== SPRING BOOT TESTING & DEPLOYMENT (10 questions) ==========
  {
    id: 106,
    question: "What is spring-boot-starter-test?",
    options: ["Test framework", "Starter for testing (JUnit, Mockito, etc.)", "Only JUnit", "Only Mockito"],
    correctAnswer: 1,
    explanation: "spring-boot-starter-test includes JUnit, Mockito, AssertJ, and other testing libraries."
  },
  {
    id: 107,
    question: "What is @SpringBootTest used for?",
    options: ["To test Spring", "To create integration test with full Spring context", "To test only controllers", "To test only services"],
    correctAnswer: 1,
    explanation: "@SpringBootTest creates integration tests with full Spring application context."
  },
  {
    id: 108,
    question: "What is @WebMvcTest used for?",
    options: ["To test web", "To test Spring MVC controllers", "To test services", "To test repositories"],
    correctAnswer: 1,
    explanation: "@WebMvcTest is used for testing Spring MVC controllers with a sliced Spring context."
  },
  {
    id: 109,
    question: "What is @DataJpaTest used for?",
    options: ["To test data", "To test JPA repositories", "To test controllers", "To test services"],
    correctAnswer: 1,
    explanation: "@DataJpaTest is used for testing JPA repositories with an in-memory database."
  },
  {
    id: 110,
    question: "What is @MockBean used for?",
    options: ["To mock beans", "To create mock Spring beans", "To create real beans", "To delete beans"],
    correctAnswer: 1,
    explanation: "@MockBean creates a mock Spring bean that replaces or adds to the application context."
  },
  {
    id: 111,
    question: "How to run Spring Boot application?",
    options: ["java -jar app.jar", "mvn spring-boot:run", "Both", "Only mvn command"],
    correctAnswer: 2,
    explanation: "Spring Boot apps can be run using 'java -jar app.jar' or 'mvn spring-boot:run'."
  },
  {
    id: 112,
    question: "What is Spring Boot DevTools?",
    options: ["Development tools", "Tools for faster development (auto-restart, live reload)", "Production tools", "Testing tools"],
    correctAnswer: 1,
    explanation: "Spring Boot DevTools provides auto-restart, live reload, and other development-time features."
  },
  {
    id: 113,
    question: "What is spring-boot-maven-plugin used for?",
    options: ["To build", "To package Spring Boot apps as executable JARs", "To test", "To deploy"],
    correctAnswer: 1,
    explanation: "spring-boot-maven-plugin packages Spring Boot applications as executable JAR/WAR files."
  },
  {
    id: 114,
    question: "What is @ActiveProfiles used for in tests?",
    options: ["To activate profiles", "To activate specific profiles for testing", "To create profiles", "To delete profiles"],
    correctAnswer: 1,
    explanation: "@ActiveProfiles activates specific profiles for test execution."
  },
  {
    id: 115,
    question: "What is TestRestTemplate?",
    options: ["Test template", "RestTemplate for integration testing", "Test controller", "Test service"],
    correctAnswer: 1,
    explanation: "TestRestTemplate is a RestTemplate variant designed for integration testing of Spring Boot applications."
  },

  // ========== SPRING BOOT MISCELLANEOUS (5 questions) ==========
  {
    id: 116,
    question: "What is @Scheduled used for?",
    options: ["To schedule", "To schedule method execution", "To create schedule", "To delete schedule"],
    correctAnswer: 1,
    explanation: "@Scheduled annotation schedules method execution at fixed intervals or cron expressions."
  },
  {
    id: 117,
    question: "What is @EnableScheduling used for?",
    options: ["To enable scheduling", "To enable Spring's scheduling support", "To disable scheduling", "To create scheduling"],
    correctAnswer: 1,
    explanation: "@EnableScheduling enables Spring's scheduling support for @Scheduled methods."
  },
  {
    id: 118,
    question: "What is @Async used for?",
    options: ["To make async", "To execute methods asynchronously", "To create async", "To delete async"],
    correctAnswer: 1,
    explanation: "@Async annotation executes methods asynchronously in a separate thread."
  },
  {
    id: 119,
    question: "What is @EnableAsync used for?",
    options: ["To enable async", "To enable Spring's async support", "To disable async", "To create async"],
    correctAnswer: 1,
    explanation: "@EnableAsync enables Spring's asynchronous method execution support."
  },
  {
    id: 120,
    question: "What is Spring Boot CLI?",
    options: ["Command line", "Command-line tool for rapid Spring Boot development", "Database CLI", "Network CLI"],
    correctAnswer: 1,
    explanation: "Spring Boot CLI is a command-line tool for rapid Spring Boot application development using Groovy scripts."
  }
];

// Function to get random questions for exam
export const getRandomQuestions = (count = 20) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

