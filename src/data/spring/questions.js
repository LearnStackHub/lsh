// Spring Framework MCQ Questions Pool (120+ questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all Spring topics: IOC, DI, Bean, MVC, AOP, Configuration, etc.

export const allQuestions = [
  // ========== SPRING INTRODUCTION & BASICS (15 questions) ==========
  {
    id: 1,
    question: "What is Spring Framework?",
    options: ["A programming language", "An open-source application framework for Java", "A database", "An operating system"],
    correctAnswer: 1,
    explanation: "Spring Framework is an open-source application framework for Java that provides infrastructure support for developing Java applications."
  },
  {
    id: 2,
    question: "What is the main purpose of Spring Framework?",
    options: ["To replace Java", "To simplify Java development", "To create databases", "To compile code"],
    correctAnswer: 1,
    explanation: "Spring Framework simplifies Java development by providing infrastructure support and reducing boilerplate code."
  },
  {
    id: 3,
    question: "What does IOC stand for in Spring?",
    options: ["Input Output Control", "Inversion of Control", "Internal Object Creation", "Interface Object Class"],
    correctAnswer: 1,
    explanation: "IOC stands for Inversion of Control, which is a design principle where the control of object creation and lifecycle is inverted to the framework."
  },
  {
    id: 4,
    question: "What is Dependency Injection (DI) in Spring?",
    options: ["A way to compile code", "A design pattern where objects receive dependencies from external sources", "A database operation", "A type of loop"],
    correctAnswer: 1,
    explanation: "Dependency Injection is a design pattern where objects receive their dependencies from external sources rather than creating them internally."
  },
  {
    id: 5,
    question: "Which annotation is used to mark a class as a Spring component?",
    options: ["@Component", "@Spring", "@Bean", "@Service"],
    correctAnswer: 0,
    explanation: "@Component is a generic annotation used to mark a class as a Spring component that will be managed by Spring container."
  },
  {
    id: 6,
    question: "What is a Spring Bean?",
    options: ["A Java class", "An object managed by Spring IoC container", "A database table", "A configuration file"],
    correctAnswer: 1,
    explanation: "A Spring Bean is an object that is instantiated, assembled, and managed by the Spring IoC container."
  },
  {
    id: 7,
    question: "Which annotation is used for dependency injection in Spring?",
    options: ["@Inject", "@Autowired", "@Dependency", "@Wire"],
    correctAnswer: 1,
    explanation: "@Autowired annotation is used to inject dependencies automatically by Spring container."
  },
  {
    id: 8,
    question: "What is Spring Container?",
    options: ["A database", "The core of Spring Framework that manages beans", "A file system", "A network protocol"],
    correctAnswer: 1,
    explanation: "Spring Container is the core of Spring Framework responsible for creating, configuring, and managing beans throughout their lifecycle."
  },
  {
    id: 9,
    question: "Which of the following is a Spring Container?",
    options: ["ApplicationContext", "BeanFactory", "Both ApplicationContext and BeanFactory", "None of the above"],
    correctAnswer: 2,
    explanation: "Both ApplicationContext and BeanFactory are Spring containers. ApplicationContext extends BeanFactory with additional features."
  },
  {
    id: 10,
    question: "What is the difference between BeanFactory and ApplicationContext?",
    options: ["No difference", "ApplicationContext provides more features like AOP, event handling", "BeanFactory is newer", "ApplicationContext is deprecated"],
    correctAnswer: 1,
    explanation: "ApplicationContext extends BeanFactory and provides additional features like AOP, event handling, and internationalization."
  },
  {
    id: 11,
    question: "Which annotation is used to mark a class as a Service layer component?",
    options: ["@Component", "@Service", "@Repository", "@Controller"],
    correctAnswer: 1,
    explanation: "@Service annotation is used to mark a class as a service layer component in Spring."
  },
  {
    id: 12,
    question: "Which annotation is used to mark a class as a Repository (DAO) layer component?",
    options: ["@Component", "@Service", "@Repository", "@Controller"],
    correctAnswer: 2,
    explanation: "@Repository annotation is used to mark a class as a repository/DAO layer component in Spring."
  },
  {
    id: 13,
    question: "Which annotation is used to mark a class as a Controller in Spring MVC?",
    options: ["@Component", "@Service", "@Repository", "@Controller"],
    correctAnswer: 3,
    explanation: "@Controller annotation is used to mark a class as a Spring MVC controller."
  },
  {
    id: 14,
    question: "What is the default scope of a Spring Bean?",
    options: ["prototype", "singleton", "request", "session"],
    correctAnswer: 1,
    explanation: "The default scope of a Spring Bean is singleton, meaning only one instance is created per Spring container."
  },
  {
    id: 15,
    question: "Which scope creates a new bean instance for each request?",
    options: ["singleton", "prototype", "request", "session"],
    correctAnswer: 1,
    explanation: "prototype scope creates a new bean instance every time it is requested from the container."
  },

  // ========== SPRING IOC (Inversion of Control) (15 questions) ==========
  {
    id: 16,
    question: "What is Inversion of Control (IoC)?",
    options: ["A design pattern", "A programming language", "A database", "A compiler"],
    correctAnswer: 0,
    explanation: "Inversion of Control is a design principle where the control of object creation and dependency management is inverted to the framework."
  },
  {
    id: 17,
    question: "In traditional Java, who creates objects?",
    options: ["Framework", "Developer manually", "Database", "Compiler"],
    correctAnswer: 1,
    explanation: "In traditional Java, developers manually create objects using 'new' keyword."
  },
  {
    id: 18,
    question: "In Spring, who creates objects?",
    options: ["Developer", "Spring Container", "Database", "Compiler"],
    correctAnswer: 1,
    explanation: "In Spring, the Spring Container (IoC container) creates and manages objects."
  },
  {
    id: 19,
    question: "What are the benefits of IoC?",
    options: ["Loose coupling", "Easier testing", "Better code organization", "All of the above"],
    correctAnswer: 3,
    explanation: "IoC provides loose coupling, easier testing, and better code organization."
  },
  {
    id: 20,
    question: "Which interface is the root interface for accessing Spring container?",
    options: ["BeanFactory", "ApplicationContext", "Container", "SpringContext"],
    correctAnswer: 0,
    explanation: "BeanFactory is the root interface for accessing Spring container."
  },
  {
    id: 21,
    question: "What is the difference between BeanFactory and ApplicationContext?",
    options: ["ApplicationContext is lazy loading", "BeanFactory is lazy loading, ApplicationContext is eager", "No difference", "Both are deprecated"],
    correctAnswer: 1,
    explanation: "BeanFactory uses lazy loading (beans created on demand), while ApplicationContext uses eager loading (beans created at startup)."
  },
  {
    id: 22,
    question: "Which method is used to get a bean from ApplicationContext?",
    options: ["getBean()", "createBean()", "newBean()", "findBean()"],
    correctAnswer: 0,
    explanation: "getBean() method is used to retrieve a bean from ApplicationContext."
  },
  {
    id: 23,
    question: "What happens if a bean is not found in Spring container?",
    options: ["Returns null", "Throws NoSuchBeanDefinitionException", "Creates a new one", "Returns empty object"],
    correctAnswer: 1,
    explanation: "If a bean is not found, Spring throws NoSuchBeanDefinitionException."
  },
  {
    id: 24,
    question: "Can Spring container have multiple beans of the same type?",
    options: ["No, never", "Yes, if they have different names", "Only in prototype scope", "Only in singleton scope"],
    correctAnswer: 1,
    explanation: "Yes, Spring can have multiple beans of the same type if they have different names/IDs."
  },
  {
    id: 25,
    question: "What is bean initialization?",
    options: ["Creating bean instance", "Setting bean properties", "Both creating and setting properties", "Destroying bean"],
    correctAnswer: 2,
    explanation: "Bean initialization includes creating the bean instance and setting its properties/dependencies."
  },
  {
    id: 26,
    question: "Which annotation is used for bean initialization method?",
    options: ["@Init", "@PostConstruct", "@Initialize", "@Start"],
    correctAnswer: 1,
    explanation: "@PostConstruct annotation is used to mark a method that should be called after bean initialization."
  },
  {
    id: 27,
    question: "Which annotation is used for bean destruction method?",
    options: ["@Destroy", "@PreDestroy", "@Cleanup", "@End"],
    correctAnswer: 1,
    explanation: "@PreDestroy annotation is used to mark a method that should be called before bean destruction."
  },
  {
    id: 28,
    question: "What is bean lifecycle in Spring?",
    options: ["Only creation", "Creation, initialization, usage, destruction", "Only destruction", "Only usage"],
    correctAnswer: 1,
    explanation: "Bean lifecycle includes: instantiation, dependency injection, initialization, usage, and destruction."
  },
  {
    id: 29,
    question: "Can a Spring bean implement InitializingBean interface?",
    options: ["No", "Yes, for custom initialization", "Only for singleton", "Only for prototype"],
    correctAnswer: 1,
    explanation: "Yes, a bean can implement InitializingBean interface to perform custom initialization logic."
  },
  {
    id: 30,
    question: "What is the order of bean initialization?",
    options: ["Constructor -> Properties -> @PostConstruct", "Properties -> Constructor -> @PostConstruct", "@PostConstruct -> Constructor -> Properties", "Random order"],
    correctAnswer: 0,
    explanation: "Order: Constructor is called first, then properties are set, then @PostConstruct method is called."
  },

  // ========== SPRING DEPENDENCY INJECTION (15 questions) ==========
  {
    id: 31,
    question: "What are the types of Dependency Injection in Spring?",
    options: ["Constructor and Setter", "Only Constructor", "Only Setter", "Field injection only"],
    correctAnswer: 0,
    explanation: "Spring supports Constructor Injection, Setter Injection, and Field Injection (via @Autowired)."
  },
  {
    id: 32,
    question: "Which type of DI is recommended for required dependencies?",
    options: ["Setter Injection", "Constructor Injection", "Field Injection", "All are equal"],
    correctAnswer: 1,
    explanation: "Constructor Injection is recommended for required dependencies as it ensures dependencies are available at object creation."
  },
  {
    id: 33,
    question: "Which type of DI is recommended for optional dependencies?",
    options: ["Constructor Injection", "Setter Injection", "Field Injection", "All are equal"],
    correctAnswer: 1,
    explanation: "Setter Injection is recommended for optional dependencies."
  },
  {
    id: 34,
    question: "What is Constructor Injection?",
    options: ["Injecting via constructor parameters", "Injecting via setter methods", "Injecting via fields", "Injecting via annotations"],
    correctAnswer: 0,
    explanation: "Constructor Injection is injecting dependencies through constructor parameters."
  },
  {
    id: 35,
    question: "What is Setter Injection?",
    options: ["Injecting via constructor", "Injecting via setter methods", "Injecting via fields", "Injecting via annotations"],
    correctAnswer: 1,
    explanation: "Setter Injection is injecting dependencies through setter methods."
  },
  {
    id: 36,
    question: "Can @Autowired be used on constructor?",
    options: ["No", "Yes, but optional in Spring 4.3+", "Only in Spring Boot", "Only for singleton"],
    correctAnswer: 1,
    explanation: "Yes, @Autowired can be used on constructor, and it's optional in Spring 4.3+ if there's only one constructor."
  },
  {
    id: 37,
    question: "What happens if @Autowired dependency is not found?",
    options: ["Returns null", "Throws NoSuchBeanDefinitionException", "Creates a new one", "Uses default value"],
    correctAnswer: 1,
    explanation: "If required dependency is not found, Spring throws NoSuchBeanDefinitionException."
  },
  {
    id: 38,
    question: "How to make @Autowired optional?",
    options: ["@Autowired(required=false)", "@Optional", "Cannot be optional", "Use @Nullable"],
    correctAnswer: 0,
    explanation: "Use @Autowired(required=false) to make dependency injection optional."
  },
  {
    id: 39,
    question: "What is @Qualifier annotation used for?",
    options: ["To qualify beans", "To specify which bean to inject when multiple beans of same type exist", "To mark as primary", "To create beans"],
    correctAnswer: 1,
    explanation: "@Qualifier is used to specify which bean to inject when multiple beans of the same type exist."
  },
  {
    id: 40,
    question: "What is @Primary annotation used for?",
    options: ["To mark primary bean", "To mark as default when multiple beans exist", "To create primary key", "To mark as singleton"],
    correctAnswer: 1,
    explanation: "@Primary marks a bean as the default choice when multiple beans of the same type are available."
  },
  {
    id: 41,
    question: "Can we use both @Qualifier and @Primary together?",
    options: ["No", "Yes, @Qualifier takes precedence", "Yes, @Primary takes precedence", "They are same"],
    correctAnswer: 1,
    explanation: "Yes, if both are used, @Qualifier takes precedence over @Primary."
  },
  {
    id: 42,
    question: "What is circular dependency?",
    options: ["When two beans depend on each other", "When bean depends on itself", "When no dependencies", "When too many dependencies"],
    correctAnswer: 0,
    explanation: "Circular dependency occurs when two or more beans depend on each other directly or indirectly."
  },
  {
    id: 43,
    question: "Does Spring support circular dependencies?",
    options: ["No, never", "Yes, for setter injection", "Yes, for constructor injection", "Yes, for both"],
    correctAnswer: 1,
    explanation: "Spring supports circular dependencies for setter injection, but not for constructor injection."
  },
  {
    id: 44,
    question: "What is the best way to avoid circular dependencies?",
    options: ["Use setter injection", "Redesign to remove circular dependency", "Use @Lazy", "All of the above"],
    correctAnswer: 3,
    explanation: "Best practices: redesign to remove circular dependency, use @Lazy annotation, or use setter injection."
  },
  {
    id: 45,
    question: "What does @Lazy annotation do?",
    options: ["Makes bean lazy", "Delays bean creation until first use", "Makes bean singleton", "Makes bean prototype"],
    correctAnswer: 1,
    explanation: "@Lazy annotation delays bean creation until it's first requested, which can help with circular dependencies."
  },

  // ========== SPRING BEAN (15 questions) ==========
  {
    id: 46,
    question: "What is a Spring Bean?",
    options: ["A Java class", "An object managed by Spring IoC container", "A configuration file", "A database table"],
    correctAnswer: 1,
    explanation: "A Spring Bean is an object that is instantiated, assembled, and managed by the Spring IoC container."
  },
  {
    id: 47,
    question: "How to define a bean in Spring?",
    options: ["Using @Component", "Using @Bean in @Configuration", "Using XML configuration", "All of the above"],
    correctAnswer: 3,
    explanation: "Beans can be defined using @Component, @Bean in @Configuration class, or XML configuration."
  },
  {
    id: 48,
    question: "What is the default bean name when using @Component?",
    options: ["Same as class name with lowercase first letter", "Same as class name", "Random name", "Must specify name"],
    correctAnswer: 0,
    explanation: "Default bean name is the class name with first letter in lowercase (e.g., UserService -> userService)."
  },
  {
    id: 49,
    question: "How to specify custom bean name with @Component?",
    options: ["@Component(\"customName\")", "@Component(name=\"customName\")", "@Component(value=\"customName\")", "All of the above"],
    correctAnswer: 3,
    explanation: "All three ways are valid: @Component(\"customName\"), @Component(name=\"customName\"), @Component(value=\"customName\")."
  },
  {
    id: 50,
    question: "What are Spring Bean Scopes?",
    options: ["singleton, prototype", "singleton, prototype, request, session", "singleton, prototype, request, session, application, websocket", "Only singleton"],
    correctAnswer: 2,
    explanation: "Spring supports: singleton, prototype, request, session, application, and websocket scopes."
  },
  {
    id: 51,
    question: "What is singleton scope?",
    options: ["One instance per JVM", "One instance per Spring container", "One instance per request", "New instance every time"],
    correctAnswer: 1,
    explanation: "Singleton scope creates one instance per Spring IoC container (default scope)."
  },
  {
    id: 52,
    question: "What is prototype scope?",
    options: ["One instance per container", "New instance every time bean is requested", "One instance per request", "One instance per session"],
    correctAnswer: 1,
    explanation: "Prototype scope creates a new bean instance every time it's requested from the container."
  },
  {
    id: 53,
    question: "Which scope should be used for stateful beans?",
    options: ["singleton", "prototype", "request", "session"],
    correctAnswer: 1,
    explanation: "Prototype scope should be used for stateful beans as each request gets a new instance."
  },
  {
    id: 54,
    question: "Which scope should be used for stateless beans?",
    options: ["singleton", "prototype", "request", "session"],
    correctAnswer: 0,
    explanation: "Singleton scope should be used for stateless beans as it's more efficient (one instance shared)."
  },
  {
    id: 55,
    question: "How to specify bean scope?",
    options: ["@Scope(\"prototype\")", "@Scope(scopeName=\"prototype\")", "@Scope(value=\"prototype\")", "All of the above"],
    correctAnswer: 3,
    explanation: "All three ways are valid to specify bean scope."
  },
  {
    id: 56,
    question: "What is @Configuration annotation?",
    options: ["Marks class as configuration", "Marks class as component", "Marks class as service", "Marks class as controller"],
    correctAnswer: 0,
    explanation: "@Configuration annotation marks a class as a source of bean definitions."
  },
  {
    id: 57,
    question: "What is @Bean annotation?",
    options: ["Marks method as bean producer", "Marks class as bean", "Marks field as bean", "Marks parameter as bean"],
    correctAnswer: 0,
    explanation: "@Bean annotation marks a method as a bean producer method in a @Configuration class."
  },
  {
    id: 58,
    question: "Can @Bean be used outside @Configuration class?",
    options: ["No", "Yes, but not recommended", "Only in Spring Boot", "Only for singleton"],
    correctAnswer: 1,
    explanation: "Yes, @Bean can be used in @Component classes, but it's not recommended. Best practice is to use it in @Configuration classes."
  },
  {
    id: 59,
    question: "What is bean autowiring?",
    options: ["Automatic bean creation", "Automatic dependency injection", "Automatic bean destruction", "Automatic bean naming"],
    correctAnswer: 1,
    explanation: "Bean autowiring is the automatic injection of dependencies by Spring container."
  },
  {
    id: 60,
    question: "What are the autowiring modes in XML?",
    options: ["no, byName, byType", "no, byName, byType, constructor", "only byType", "only byName"],
    correctAnswer: 1,
    explanation: "XML autowiring modes: no (default), byName, byType, and constructor."
  },

  // ========== SPRING MVC (20 questions) ==========
  {
    id: 61,
    question: "What is Spring MVC?",
    options: ["A database", "A web framework based on MVC pattern", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring MVC is a web framework that implements the Model-View-Controller (MVC) design pattern."
  },
  {
    id: 62,
    question: "What does MVC stand for?",
    options: ["Model View Controller", "Multiple View Controller", "Model View Component", "Main View Controller"],
    correctAnswer: 0,
    explanation: "MVC stands for Model-View-Controller, a design pattern for building web applications."
  },
  {
    id: 63,
    question: "What is DispatcherServlet in Spring MVC?",
    options: ["A servlet", "Front controller that handles all requests", "A view", "A model"],
    correctAnswer: 1,
    explanation: "DispatcherServlet is the front controller in Spring MVC that handles all incoming requests and routes them to appropriate handlers."
  },
  {
    id: 64,
    question: "What is @RequestMapping annotation?",
    options: ["Maps URL to controller method", "Maps database to table", "Maps view to model", "Maps bean to container"],
    correctAnswer: 0,
    explanation: "@RequestMapping maps HTTP requests to controller methods based on URL patterns."
  },
  {
    id: 65,
    question: "What are the specialized @RequestMapping annotations?",
    options: ["@GetMapping, @PostMapping", "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping", "Only @GetMapping", "Only @PostMapping"],
    correctAnswer: 1,
    explanation: "Specialized annotations: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping."
  },
  {
    id: 66,
    question: "What is @RequestParam used for?",
    options: ["To get request parameters", "To get path variables", "To get request body", "To get headers"],
    correctAnswer: 0,
    explanation: "@RequestParam is used to extract query parameters or form data from the request."
  },
  {
    id: 67,
    question: "What is @PathVariable used for?",
    options: ["To get request parameters", "To get path variables from URL", "To get request body", "To get headers"],
    correctAnswer: 1,
    explanation: "@PathVariable is used to extract path variables from the URL (e.g., /user/{id})."
  },
  {
    id: 68,
    question: "What is @RequestBody used for?",
    options: ["To get request parameters", "To get path variables", "To get request body (JSON/XML)", "To get headers"],
    correctAnswer: 2,
    explanation: "@RequestBody is used to bind the HTTP request body (JSON, XML, etc.) to a Java object."
  },
  {
    id: 69,
    question: "What is @ResponseBody used for?",
    options: ["To set response parameters", "To set response body (JSON/XML)", "To set path variables", "To set headers"],
    correctAnswer: 1,
    explanation: "@ResponseBody is used to bind method return value to HTTP response body (typically JSON/XML)."
  },
  {
    id: 70,
    question: "What is ModelAndView?",
    options: ["A model", "A view", "Container for both model and view", "A controller"],
    correctAnswer: 2,
    explanation: "ModelAndView is a container that holds both model data and view information to be returned from a controller."
  },
  {
    id: 71,
    question: "What is ViewResolver in Spring MVC?",
    options: ["Resolves views", "Maps logical view names to actual view implementations", "Creates views", "Destroys views"],
    correctAnswer: 1,
    explanation: "ViewResolver maps logical view names returned by controllers to actual view implementations (JSP, Thymeleaf, etc.)."
  },
  {
    id: 72,
    question: "What is @ModelAttribute used for?",
    options: ["To bind model to view", "To bind form data to model object", "To create model", "To destroy model"],
    correctAnswer: 1,
    explanation: "@ModelAttribute is used to bind form data or request parameters to a model object."
  },
  {
    id: 73,
    question: "What is @SessionAttribute used for?",
    options: ["To store in session", "To access session attributes", "To delete session", "To create session"],
    correctAnswer: 1,
    explanation: "@SessionAttribute is used to access or store attributes in HTTP session."
  },
  {
    id: 74,
    question: "What is @ControllerAdvice used for?",
    options: ["To create controller", "To provide global exception handling", "To delete controller", "To update controller"],
    correctAnswer: 1,
    explanation: "@ControllerAdvice is used for global exception handling and applying common behavior to all controllers."
  },
  {
    id: 75,
    question: "What is @ExceptionHandler used for?",
    options: ["To handle exceptions", "To create exceptions", "To delete exceptions", "To ignore exceptions"],
    correctAnswer: 0,
    explanation: "@ExceptionHandler is used to handle exceptions thrown by controller methods."
  },
  {
    id: 76,
    question: "What is the default view technology in Spring MVC?",
    options: ["JSP", "Thymeleaf", "Freemarker", "No default, configurable"],
    correctAnswer: 3,
    explanation: "Spring MVC doesn't have a default view technology. You need to configure ViewResolver for your chosen technology."
  },
  {
    id: 77,
    question: "What is InternalResourceViewResolver used for?",
    options: ["For JSP views", "For Thymeleaf views", "For REST APIs", "For JSON responses"],
    correctAnswer: 0,
    explanation: "InternalResourceViewResolver is used to resolve JSP views in Spring MVC."
  },
  {
    id: 78,
    question: "Can Spring MVC return JSON?",
    options: ["No", "Yes, with @ResponseBody and Jackson", "Only XML", "Only HTML"],
    correctAnswer: 1,
    explanation: "Yes, Spring MVC can return JSON using @ResponseBody annotation with Jackson library for serialization."
  },
  {
    id: 79,
    question: "What is @RestController?",
    options: ["Same as @Controller", "@Controller + @ResponseBody", "Different from @Controller", "Only for REST"],
    correctAnswer: 1,
    explanation: "@RestController is a combination of @Controller and @ResponseBody, used for REST APIs."
  },
  {
    id: 80,
    question: "What is the difference between @Controller and @RestController?",
    options: ["No difference", "@RestController automatically adds @ResponseBody to all methods", "@Controller is for REST only", "Both are same"],
    correctAnswer: 1,
    explanation: "@RestController automatically adds @ResponseBody to all methods, making it suitable for REST APIs."
  },

  // ========== SPRING AOP (15 questions) ==========
  {
    id: 81,
    question: "What does AOP stand for?",
    options: ["Aspect Oriented Programming", "Application Oriented Programming", "Advanced Object Programming", "All Object Programming"],
    correctAnswer: 0,
    explanation: "AOP stands for Aspect Oriented Programming, a programming paradigm that aims to increase modularity."
  },
  {
    id: 82,
    question: "What is the main purpose of AOP?",
    options: ["To replace OOP", "To separate cross-cutting concerns", "To create objects", "To manage databases"],
    correctAnswer: 1,
    explanation: "AOP separates cross-cutting concerns (logging, security, transaction management) from business logic."
  },
  {
    id: 83,
    question: "What is an Aspect in AOP?",
    options: ["A class", "A module that encapsulates cross-cutting concerns", "A method", "A variable"],
    correctAnswer: 1,
    explanation: "An Aspect is a module that encapsulates cross-cutting concerns (like logging, security)."
  },
  {
    id: 84,
    question: "What is a Join Point in AOP?",
    options: ["A point in execution", "A point in program execution where an aspect can be applied", "A class", "A method"],
    correctAnswer: 1,
    explanation: "A Join Point is a point in program execution where an aspect can be applied (e.g., method execution)."
  },
  {
    id: 85,
    question: "What is a Pointcut in AOP?",
    options: ["A point", "An expression that selects join points", "A class", "A method"],
    correctAnswer: 1,
    explanation: "A Pointcut is an expression that selects join points where advice should be applied."
  },
  {
    id: 86,
    question: "What is Advice in AOP?",
    options: ["A suggestion", "Action taken at a join point", "A class", "A method"],
    correctAnswer: 1,
    explanation: "Advice is the action taken at a join point (e.g., before, after, around method execution)."
  },
  {
    id: 87,
    question: "What are the types of Advice in Spring AOP?",
    options: ["Before, After", "Before, After, Around", "Before, After, AfterReturning, AfterThrowing, Around", "Only Before"],
    correctAnswer: 2,
    explanation: "Spring AOP supports: Before, After, AfterReturning, AfterThrowing, and Around advice."
  },
  {
    id: 88,
    question: "What is @Aspect annotation used for?",
    options: ["To mark a class as aspect", "To mark a method as aspect", "To create aspect", "To delete aspect"],
    correctAnswer: 0,
    explanation: "@Aspect annotation marks a class as an aspect containing advice and pointcuts."
  },
  {
    id: 89,
    question: "What is @Pointcut annotation used for?",
    options: ["To define pointcut expression", "To create pointcut", "To delete pointcut", "To update pointcut"],
    correctAnswer: 0,
    explanation: "@Pointcut annotation is used to define a pointcut expression that can be reused."
  },
  {
    id: 90,
    question: "What is @Before advice?",
    options: ["Executes before method", "Executes after method", "Executes around method", "Executes on exception"],
    correctAnswer: 0,
    explanation: "@Before advice executes before the join point (e.g., before method execution)."
  },
  {
    id: 91,
    question: "What is @After advice?",
    options: ["Executes before method", "Executes after method (always)", "Executes around method", "Executes on exception"],
    correctAnswer: 1,
    explanation: "@After advice executes after the join point completes (whether normally or with exception)."
  },
  {
    id: 92,
    question: "What is @Around advice?",
    options: ["Executes before method", "Executes after method", "Executes around method (can control execution)", "Executes on exception"],
    correctAnswer: 2,
    explanation: "@Around advice can execute before and after the join point, and can control whether the join point executes."
  },
  {
    id: 93,
    question: "What is @AfterReturning advice?",
    options: ["Executes after normal return", "Executes after exception", "Executes before method", "Executes around method"],
    correctAnswer: 0,
    explanation: "@AfterReturning advice executes only after the join point completes normally (without exception)."
  },
  {
    id: 94,
    question: "What is @AfterThrowing advice?",
    options: ["Executes after normal return", "Executes after exception is thrown", "Executes before method", "Executes around method"],
    correctAnswer: 1,
    explanation: "@AfterThrowing advice executes only when the join point throws an exception."
  },
  {
    id: 95,
    question: "What is the pointcut expression for all methods in a package?",
    options: ["execution(* com.example.*.*(..))", "execution(* com.example..*(..))", "within(com.example.*)", "All of the above"],
    correctAnswer: 3,
    explanation: "All three expressions can match methods in a package, with slight differences in matching."
  },

  // ========== SPRING CONFIGURATION (10 questions) ==========
  {
    id: 96,
    question: "What are the ways to configure Spring?",
    options: ["XML only", "Annotation only", "XML, Annotation, Java-based", "Only Java-based"],
    correctAnswer: 2,
    explanation: "Spring can be configured using XML, annotations, or Java-based configuration."
  },
  {
    id: 97,
    question: "What is @Configuration annotation?",
    options: ["Marks class as configuration", "Marks class as component", "Marks class as service", "Marks class as controller"],
    correctAnswer: 0,
    explanation: "@Configuration annotation marks a class as a source of bean definitions (Java-based configuration)."
  },
  {
    id: 98,
    question: "What is @ComponentScan used for?",
    options: ["To scan components", "To enable component scanning", "To disable components", "To delete components"],
    correctAnswer: 1,
    explanation: "@ComponentScan enables Spring to scan for components (beans) in specified packages."
  },
  {
    id: 99,
    question: "What is @EnableAspectJAutoProxy used for?",
    options: ["To enable AOP", "To enable AspectJ auto-proxying", "To disable AOP", "To create aspects"],
    correctAnswer: 1,
    explanation: "@EnableAspectJAutoProxy enables AspectJ auto-proxying for Spring AOP."
  },
  {
    id: 100,
    question: "What is @EnableWebMvc used for?",
    options: ["To enable web", "To enable Spring MVC", "To disable MVC", "To create MVC"],
    correctAnswer: 1,
    explanation: "@EnableWebMvc enables Spring MVC configuration and registers necessary beans."
  },
  {
    id: 101,
    question: "What is @PropertySource used for?",
    options: ["To load properties", "To load property files", "To create properties", "To delete properties"],
    correctAnswer: 1,
    explanation: "@PropertySource loads properties from property files into Spring Environment."
  },
  {
    id: 102,
    question: "What is @Value annotation used for?",
    options: ["To inject values", "To inject property values", "To create values", "To delete values"],
    correctAnswer: 1,
    explanation: "@Value annotation is used to inject property values or SpEL expressions into beans."
  },
  {
    id: 103,
    question: "What is @Profile used for?",
    options: ["To create profiles", "To activate beans based on active profile", "To delete profiles", "To update profiles"],
    correctAnswer: 1,
    explanation: "@Profile annotation activates beans only when specified profile is active."
  },
  {
    id: 104,
    question: "What is @Import used for?",
    options: ["To import classes", "To import other @Configuration classes", "To import beans", "To import components"],
    correctAnswer: 1,
    explanation: "@Import annotation is used to import other @Configuration classes."
  },
  {
    id: 105,
    question: "What is @Conditional used for?",
    options: ["To create conditions", "To conditionally register beans", "To delete conditions", "To update conditions"],
    correctAnswer: 1,
    explanation: "@Conditional annotation conditionally registers beans based on specified conditions."
  },

  // ========== SPRING DATA & TRANSACTIONS (15 questions) ==========
  {
    id: 106,
    question: "What is Spring Data?",
    options: ["A database", "A framework that simplifies data access", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Data is a framework that simplifies data access by reducing boilerplate code."
  },
  {
    id: 107,
    question: "What is Spring Data JPA?",
    options: ["A database", "An abstraction over JPA", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Data JPA is an abstraction over JPA that reduces boilerplate code for data access."
  },
  {
    id: 108,
    question: "What is JpaRepository?",
    options: ["A database", "An interface that extends Repository", "A class", "A method"],
    correctAnswer: 1,
    explanation: "JpaRepository is a Spring Data interface that extends Repository and provides JPA-specific methods."
  },
  {
    id: 109,
    question: "What is @Transactional annotation used for?",
    options: ["To create transactions", "To manage transactions", "To delete transactions", "To update transactions"],
    correctAnswer: 1,
    explanation: "@Transactional annotation manages transaction boundaries declaratively."
  },
  {
    id: 110,
    question: "What is transaction propagation?",
    options: ["How transactions spread", "How transactions behave when called from another transaction", "Transaction speed", "Transaction size"],
    correctAnswer: 1,
    explanation: "Transaction propagation defines how transactions behave when a transactional method is called from another transaction."
  },
  {
    id: 111,
    question: "What is REQUIRED propagation?",
    options: ["Creates new transaction", "Uses existing or creates new", "Suspends existing", "Never creates"],
    correctAnswer: 1,
    explanation: "REQUIRED propagation uses existing transaction if available, otherwise creates a new one."
  },
  {
    id: 112,
    question: "What is REQUIRES_NEW propagation?",
    options: ["Uses existing", "Always creates new transaction", "Suspends existing", "Never creates"],
    correctAnswer: 1,
    explanation: "REQUIRES_NEW propagation always creates a new transaction, suspending any existing one."
  },
  {
    id: 113,
    question: "What is transaction isolation?",
    options: ["Transaction speed", "How transactions are isolated from each other", "Transaction size", "Transaction type"],
    correctAnswer: 1,
    explanation: "Transaction isolation defines how transactions are isolated from each other to prevent data inconsistencies."
  },
  {
    id: 114,
    question: "What are the isolation levels?",
    options: ["READ_UNCOMMITTED, READ_COMMITTED", "READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE", "Only READ_COMMITTED", "Only SERIALIZABLE"],
    correctAnswer: 1,
    explanation: "Isolation levels: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE."
  },
  {
    id: 115,
    question: "What is @Repository annotation used for?",
    options: ["To mark repository", "To mark DAO layer", "To enable exception translation", "All of the above"],
    correctAnswer: 3,
    explanation: "@Repository marks DAO/repository layer and enables automatic exception translation to Spring's DataAccessException."
  },
  {
    id: 116,
    question: "What is Spring JDBC Template?",
    options: ["A database", "A template class that simplifies JDBC operations", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring JDBC Template is a template class that simplifies JDBC operations and reduces boilerplate code."
  },
  {
    id: 117,
    question: "What is RowMapper in Spring JDBC?",
    options: ["Maps rows", "Interface to map ResultSet rows to objects", "Maps columns", "Maps tables"],
    correctAnswer: 1,
    explanation: "RowMapper is an interface used to map ResultSet rows to Java objects."
  },
  {
    id: 118,
    question: "What is ResultSetExtractor?",
    options: ["Extracts results", "Extracts entire ResultSet to object", "Extracts single row", "Extracts columns"],
    correctAnswer: 1,
    explanation: "ResultSetExtractor extracts the entire ResultSet to a single object (unlike RowMapper which maps row by row)."
  },
  {
    id: 119,
    question: "What is @Query annotation used for?",
    options: ["To create queries", "To define custom queries", "To delete queries", "To update queries"],
    correctAnswer: 1,
    explanation: "@Query annotation is used to define custom queries in Spring Data repositories."
  },
  {
    id: 120,
    question: "What is @Modifying annotation used for?",
    options: ["To modify queries", "To mark modifying queries (UPDATE, DELETE)", "To create queries", "To delete queries"],
    correctAnswer: 1,
    explanation: "@Modifying annotation marks repository methods that modify data (UPDATE, DELETE operations)."
  }
];

// Function to get random questions for exam
export const getRandomQuestions = (count = 20) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

