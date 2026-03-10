// Spring Cloud / Microservices MCQ Questions Pool (120+ questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover Microservices architecture, Spring Cloud components, Eureka, API Gateway, Config Server, etc.

export const allQuestions = [
  // ========== MICROSERVICES INTRODUCTION & BASICS (20 questions) ==========
  {
    id: 1,
    question: "What are Microservices?",
    options: ["Small services", "Architectural style where application is built as collection of small, independent services", "Large services", "Single service"],
    correctAnswer: 1,
    explanation: "Microservices is an architectural style where an application is built as a collection of small, independent, loosely coupled services."
  },
  {
    id: 2,
    question: "What is the main advantage of Microservices?",
    options: ["Smaller code", "Independent deployment, scalability, technology diversity", "Faster compilation", "Less code"],
    correctAnswer: 1,
    explanation: "Microservices provide independent deployment, scalability, technology diversity, fault isolation, and team autonomy."
  },
  {
    id: 3,
    question: "What is the difference between Monolithic and Microservices architecture?",
    options: ["No difference", "Monolithic is single deployable unit, Microservices are multiple independent services", "Microservices is single unit", "Both are same"],
    correctAnswer: 1,
    explanation: "Monolithic architecture is a single deployable unit, while Microservices architecture consists of multiple independent, deployable services."
  },
  {
    id: 4,
    question: "What is Service Discovery?",
    options: ["Finding services", "Mechanism for services to find and communicate with each other", "Creating services", "Deleting services"],
    correctAnswer: 1,
    explanation: "Service Discovery is a mechanism that allows services to find and communicate with each other dynamically."
  },
  {
    id: 5,
    question: "What is API Gateway?",
    options: ["A database", "Single entry point for all client requests to microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "API Gateway is a single entry point that routes client requests to appropriate microservices and handles cross-cutting concerns."
  },
  {
    id: 6,
    question: "What is Circuit Breaker?",
    options: ["Electrical component", "Pattern to prevent cascading failures in microservices", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Circuit Breaker pattern prevents cascading failures by stopping requests to failing services and providing fallback responses."
  },
  {
    id: 7,
    question: "What is Load Balancing?",
    options: ["Balancing load", "Distributing incoming requests across multiple service instances", "Creating load", "Deleting load"],
    correctAnswer: 1,
    explanation: "Load Balancing distributes incoming requests across multiple instances of a service to improve performance and availability."
  },
  {
    id: 8,
    question: "What is Distributed Configuration?",
    options: ["Local config", "Centralized configuration management for microservices", "Database config", "File config"],
    correctAnswer: 1,
    explanation: "Distributed Configuration provides centralized configuration management for microservices (e.g., Spring Cloud Config)."
  },
  {
    id: 9,
    question: "What is Distributed Tracing?",
    options: ["Tracing services", "Tracing requests across multiple microservices for debugging", "Tracing database", "Tracing network"],
    correctAnswer: 1,
    explanation: "Distributed Tracing tracks requests as they flow through multiple microservices for debugging and monitoring."
  },
  {
    id: 10,
    question: "What is Spring Cloud?",
    options: ["A database", "Framework for building microservices with Spring Boot", "A programming language", "An IDE"],
    correctAnswer: 1,
    explanation: "Spring Cloud is a framework that provides tools for building microservices using Spring Boot."
  },
  {
    id: 11,
    question: "What are the main Spring Cloud components?",
    options: ["Only Eureka", "Eureka, Config Server, API Gateway, Circuit Breaker, etc.", "Only Config Server", "Only API Gateway"],
    correctAnswer: 1,
    explanation: "Spring Cloud includes: Eureka (Service Discovery), Config Server, API Gateway (Zuul/Gateway), Circuit Breaker (Hystrix/Resilience4j), etc."
  },
  {
    id: 12,
    question: "What is the difference between Spring Boot and Spring Cloud?",
    options: ["No difference", "Spring Boot is for single apps, Spring Cloud adds microservices capabilities", "Spring Cloud replaces Spring Boot", "Spring Boot is for microservices"],
    correctAnswer: 1,
    explanation: "Spring Boot simplifies Spring app development, while Spring Cloud adds microservices capabilities (service discovery, config, etc.)."
  },
  {
    id: 13,
    question: "What is Bounded Context in Microservices?",
    options: ["A database", "Domain-driven design concept defining service boundaries", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Bounded Context defines the boundaries of a microservice and what it's responsible for (Domain-Driven Design concept)."
  },
  {
    id: 14,
    question: "What is Database per Service pattern?",
    options: ["Shared database", "Each microservice has its own database", "No database", "Single database"],
    correctAnswer: 1,
    explanation: "Database per Service pattern means each microservice has its own database to ensure loose coupling."
  },
  {
    id: 15,
    question: "What is Saga pattern?",
    options: ["A story", "Pattern for managing distributed transactions across microservices", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Saga pattern manages distributed transactions across microservices using a sequence of local transactions."
  },
  {
    id: 16,
    question: "What is Event-Driven Architecture?",
    options: ["Event creation", "Architecture where services communicate through events", "Service creation", "Database events"],
    correctAnswer: 1,
    explanation: "Event-Driven Architecture is where microservices communicate asynchronously through events (pub/sub pattern)."
  },
  {
    id: 17,
    question: "What is API Gateway pattern?",
    options: ["Gateway creation", "Single entry point for all client requests", "Multiple gateways", "No gateway"],
    correctAnswer: 1,
    explanation: "API Gateway pattern provides a single entry point for all client requests, routing them to appropriate microservices."
  },
  {
    id: 18,
    question: "What is Service Mesh?",
    options: ["A network", "Infrastructure layer for service-to-service communication", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Service Mesh is an infrastructure layer that handles service-to-service communication (e.g., Istio, Linkerd)."
  },
  {
    id: 19,
    question: "What is Containerization in Microservices?",
    options: ["Creating containers", "Packaging services in containers (Docker) for deployment", "Creating services", "Creating databases"],
    correctAnswer: 1,
    explanation: "Containerization packages microservices in containers (Docker) for consistent deployment across environments."
  },
  {
    id: 20,
    question: "What is Orchestration in Microservices?",
    options: ["Music", "Managing and coordinating multiple containers/services (Kubernetes)", "Creating services", "Deleting services"],
    correctAnswer: 1,
    explanation: "Orchestration manages and coordinates multiple containers/services (e.g., Kubernetes, Docker Swarm)."
  },

  // ========== SPRING CLOUD EUREKA (SERVICE DISCOVERY) (15 questions) ==========
  {
    id: 21,
    question: "What is Eureka?",
    options: ["A database", "Service Discovery server from Netflix (part of Spring Cloud)", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Eureka is a Service Discovery server from Netflix that's integrated into Spring Cloud for service registration and discovery."
  },
  {
    id: 22,
    question: "What is Eureka Server?",
    options: ["A database", "Server that maintains registry of available services", "A client", "A service"],
    correctAnswer: 1,
    explanation: "Eureka Server maintains a registry of all available service instances and their locations."
  },
  {
    id: 23,
    question: "What is Eureka Client?",
    options: ["A server", "Service that registers itself with Eureka Server and discovers other services", "A database", "A framework"],
    correctAnswer: 1,
    explanation: "Eureka Client is a microservice that registers itself with Eureka Server and can discover other services."
  },
  {
    id: 24,
    question: "What is @EnableEurekaServer annotation?",
    options: ["Enables Eureka client", "Enables Eureka Server in Spring Boot application", "Disables Eureka", "Creates Eureka"],
    correctAnswer: 1,
    explanation: "@EnableEurekaServer annotation enables Eureka Server functionality in a Spring Boot application."
  },
  {
    id: 25,
    question: "What is @EnableEurekaClient annotation?",
    options: ["Enables Eureka server", "Enables Eureka Client in Spring Boot application", "Disables Eureka", "Creates Eureka"],
    correctAnswer: 1,
    explanation: "@EnableEurekaClient annotation enables Eureka Client functionality (service registration and discovery)."
  },
  {
    id: 26,
    question: "What is eureka.client.service-url.defaultZone?",
    options: ["Service URL", "URL of Eureka Server for client registration", "Client URL", "Database URL"],
    correctAnswer: 1,
    explanation: "eureka.client.service-url.defaultZone specifies the URL of Eureka Server where clients should register."
  },
  {
    id: 27,
    question: "What is eureka.instance.hostname?",
    options: ["Database hostname", "Hostname of the service instance", "Server hostname", "Client hostname"],
    correctAnswer: 1,
    explanation: "eureka.instance.hostname specifies the hostname of the service instance for registration."
  },
  {
    id: 28,
    question: "What is eureka.instance.prefer-ip-address?",
    options: ["Prefer hostname", "Use IP address instead of hostname for service registration", "Prefer URL", "Prefer port"],
    correctAnswer: 1,
    explanation: "eureka.instance.prefer-ip-address=true uses IP address instead of hostname for service registration."
  },
  {
    id: 29,
    question: "What is Eureka Self-Preservation?",
    options: ["Self-protection", "Mechanism to protect registry from network issues", "Self-deletion", "Self-creation"],
    correctAnswer: 1,
    explanation: "Eureka Self-Preservation protects the registry from removing services due to temporary network issues."
  },
  {
    id: 30,
    question: "What is Eureka Renewal?",
    options: ["Renewing services", "Heartbeat mechanism where clients renew registration periodically", "Deleting services", "Creating services"],
    correctAnswer: 1,
    explanation: "Eureka Renewal is the heartbeat mechanism where clients send renewal requests to keep their registration alive."
  },
  {
    id: 31,
    question: "What is Eureka Lease Expiration?",
    options: ["Lease creation", "Time after which service is removed if renewal not received", "Lease renewal", "Lease deletion"],
    correctAnswer: 1,
    explanation: "Eureka Lease Expiration is the time after which a service is removed from registry if renewal is not received."
  },
  {
    id: 32,
    question: "What is Eureka Replication?",
    options: ["Replicating database", "Replicating service registry across multiple Eureka servers", "Replicating services", "Replicating clients"],
    correctAnswer: 1,
    explanation: "Eureka Replication replicates the service registry across multiple Eureka servers for high availability."
  },
  {
    id: 33,
    question: "What is @LoadBalanced annotation?",
    options: ["Marks load balanced", "Enables client-side load balancing with Ribbon", "Disables load balancing", "Creates load balancer"],
    correctAnswer: 1,
    explanation: "@LoadBalanced annotation on RestTemplate enables client-side load balancing using Ribbon."
  },
  {
    id: 34,
    question: "What is Ribbon?",
    options: ["A database", "Client-side load balancer from Netflix", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Ribbon is a client-side load balancer from Netflix that works with Eureka for service discovery and load balancing."
  },
  {
    id: 35,
    question: "What is the default Eureka Server port?",
    options: ["8080", "8761", "9090", "3000"],
    correctAnswer: 1,
    explanation: "Eureka Server runs on port 8761 by default."
  },

  // ========== SPRING CLOUD CONFIG SERVER (15 questions) ==========
  {
    id: 36,
    question: "What is Spring Cloud Config Server?",
    options: ["A database", "Centralized configuration management server for microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Config Server provides centralized configuration management for microservices from a Git repository or file system."
  },
  {
    id: 37,
    question: "What is @EnableConfigServer annotation?",
    options: ["Enables config client", "Enables Config Server in Spring Boot application", "Disables config", "Creates config"],
    correctAnswer: 1,
    explanation: "@EnableConfigServer annotation enables Spring Cloud Config Server functionality."
  },
  {
    id: 38,
    question: "What is @RefreshScope annotation?",
    options: ["Refreshes scope", "Allows beans to be refreshed when configuration changes", "Creates scope", "Deletes scope"],
    correctAnswer: 1,
    explanation: "@RefreshScope annotation allows beans to be refreshed when configuration changes without restarting the application."
  },
  {
    id: 39,
    question: "What is spring.cloud.config.server.git.uri?",
    options: ["Database URI", "Git repository URI for configuration files", "Service URI", "Client URI"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.server.git.uri specifies the Git repository URI where configuration files are stored."
  },
  {
    id: 40,
    question: "What is spring.cloud.config.name?",
    options: ["Config name", "Name of the configuration file to load", "Service name", "Client name"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.name specifies the name of the configuration file (default: application)."
  },
  {
    id: 41,
    question: "What is spring.cloud.config.profile?",
    options: ["Config profile", "Profile name for configuration (dev, prod, etc.)", "Service profile", "Client profile"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.profile specifies the profile name (dev, prod, test) for loading profile-specific configuration."
  },
  {
    id: 42,
    question: "What is /actuator/refresh endpoint?",
    options: ["Refreshes actuator", "Refreshes configuration without restart (requires @RefreshScope)", "Refreshes service", "Refreshes client"],
    correctAnswer: 1,
    explanation: "/actuator/refresh endpoint refreshes configuration for beans annotated with @RefreshScope without restarting the application."
  },
  {
    id: 43,
    question: "What is Spring Cloud Bus?",
    options: ["A database", "Message bus for broadcasting configuration changes to all services", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Bus broadcasts configuration changes to all services using a message broker (RabbitMQ, Kafka)."
  },
  {
    id: 44,
    question: "What is /actuator/bus-refresh endpoint?",
    options: ["Refreshes bus", "Broadcasts configuration refresh to all services via Spring Cloud Bus", "Refreshes service", "Refreshes client"],
    correctAnswer: 1,
    explanation: "/actuator/bus-refresh broadcasts configuration refresh to all services connected to Spring Cloud Bus."
  },
  {
    id: 45,
    question: "What is spring.cloud.config.label?",
    options: ["Config label", "Git branch/tag name for configuration", "Service label", "Client label"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.label specifies the Git branch or tag name to use for configuration files."
  },
  {
    id: 46,
    question: "What is the default Config Server port?",
    options: ["8080", "8888", "8761", "9090"],
    correctAnswer: 1,
    explanation: "Spring Cloud Config Server runs on port 8888 by default."
  },
  {
    id: 47,
    question: "What is spring.cloud.config.uri?",
    options: ["Config URI", "Config Server URI for clients", "Service URI", "Database URI"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.uri specifies the Config Server URI for client applications to fetch configuration."
  },
  {
    id: 48,
    question: "What is spring.cloud.config.fail-fast?",
    options: ["Fail fast", "Whether to fail startup if Config Server is unavailable", "Fail slow", "No fail"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.fail-fast=true makes the application fail to start if Config Server is unavailable."
  },
  {
    id: 49,
    question: "What is spring.cloud.config.retry?",
    options: ["Retry config", "Enables retry mechanism for Config Server connection", "No retry", "Single retry"],
    correctAnswer: 1,
    explanation: "spring.cloud.config.retry enables retry mechanism for connecting to Config Server if initial connection fails."
  },
  {
    id: 50,
    question: "What is native profile in Config Server?",
    options: ["Native language", "Profile for loading configuration from local file system instead of Git", "Git profile", "Remote profile"],
    correctAnswer: 1,
    explanation: "Native profile (spring.profiles.active=native) loads configuration from local file system instead of Git repository."
  },

  // ========== SPRING CLOUD API GATEWAY (15 questions) ==========
  {
    id: 51,
    question: "What is Spring Cloud Gateway?",
    options: ["A database", "API Gateway built on Spring WebFlux for routing requests to microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Gateway is a reactive API Gateway built on Spring WebFlux for routing requests to microservices."
  },
  {
    id: 52,
    question: "What is @EnableZuulProxy (deprecated)?",
    options: ["Enables Gateway", "Enables Zuul API Gateway (deprecated, use Spring Cloud Gateway)", "Disables Gateway", "Creates Gateway"],
    correctAnswer: 1,
    explanation: "@EnableZuulProxy enabled Zuul API Gateway (now deprecated, replaced by Spring Cloud Gateway)."
  },
  {
    id: 53,
    question: "What is Route in API Gateway?",
    options: ["A path", "Mapping between URL pattern and target service", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Route defines how requests matching a URL pattern are routed to target microservices."
  },
  {
    id: 54,
    question: "What is Predicate in Spring Cloud Gateway?",
    options: ["A condition", "Condition that determines if a route matches a request", "A route", "A filter"],
    correctAnswer: 1,
    explanation: "Predicate is a condition that determines if a route matches an incoming request."
  },
  {
    id: 55,
    question: "What is Filter in Spring Cloud Gateway?",
    options: ["A filter", "Modifies requests/responses before/after routing", "A route", "A predicate"],
    correctAnswer: 1,
    explanation: "Filter modifies requests or responses before or after routing to microservices."
  },
  {
    id: 56,
    question: "What is spring.cloud.gateway.routes?",
    options: ["Gateway routes", "Configuration for API Gateway routes", "Service routes", "Client routes"],
    correctAnswer: 1,
    explanation: "spring.cloud.gateway.routes configures routes for API Gateway (URL patterns and target services)."
  },
  {
    id: 57,
    question: "What is LoadBalancer in API Gateway?",
    options: ["A database", "Load balances requests across multiple service instances", "A service", "A filter"],
    correctAnswer: 1,
    explanation: "LoadBalancer in API Gateway distributes requests across multiple instances of a service for load balancing."
  },
  {
    id: 58,
    question: "What is Circuit Breaker in API Gateway?",
    options: ["Electrical component", "Prevents cascading failures by stopping requests to failing services", "A filter", "A route"],
    correctAnswer: 1,
    explanation: "Circuit Breaker in API Gateway prevents cascading failures by stopping requests to failing services and providing fallback."
  },
  {
    id: 59,
    question: "What is Rate Limiting in API Gateway?",
    options: ["Limiting rates", "Limits number of requests per client/time period", "Limiting services", "Limiting routes"],
    correctAnswer: 1,
    explanation: "Rate Limiting limits the number of requests a client can make within a time period to prevent abuse."
  },
  {
    id: 60,
    question: "What is Authentication/Authorization in API Gateway?",
    options: ["Auth creation", "Centralized authentication and authorization for all requests", "Service auth", "Client auth"],
    correctAnswer: 1,
    explanation: "API Gateway can handle authentication and authorization centrally for all incoming requests."
  },
  {
    id: 61,
    question: "What is CORS in API Gateway?",
    options: ["A database", "Cross-Origin Resource Sharing configuration for API Gateway", "A service", "A filter"],
    correctAnswer: 1,
    explanation: "CORS (Cross-Origin Resource Sharing) configuration in API Gateway allows cross-origin requests from browsers."
  },
  {
    id: 62,
    question: "What is Request/Response Transformation in API Gateway?",
    options: ["Transforming requests", "Modifying request/response data before/after routing", "Creating requests", "Deleting requests"],
    correctAnswer: 1,
    explanation: "Request/Response Transformation modifies request or response data (headers, body) before or after routing."
  },
  {
    id: 63,
    question: "What is API Gateway vs Direct Service Communication?",
    options: ["No difference", "API Gateway provides single entry point, direct communication bypasses gateway", "Both same", "Gateway is slower"],
    correctAnswer: 1,
    explanation: "API Gateway provides a single entry point with cross-cutting concerns, while direct communication bypasses the gateway."
  },
  {
    id: 64,
    question: "What is the default Gateway port?",
    options: ["8080", "8765", "8888", "9090"],
    correctAnswer: 0,
    explanation: "Spring Cloud Gateway runs on port 8080 by default (configurable)."
  },
  {
    id: 65,
    question: "What is Global Filter in Gateway?",
    options: ["Global filter", "Filter applied to all routes", "Route-specific filter", "No filter"],
    correctAnswer: 1,
    explanation: "Global Filter is applied to all routes in the API Gateway, while route filters are specific to routes."
  },

  // ========== CIRCUIT BREAKER & RESILIENCE (15 questions) ==========
  {
    id: 66,
    question: "What is Circuit Breaker pattern?",
    options: ["Electrical component", "Pattern to prevent cascading failures by stopping requests to failing services", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Circuit Breaker pattern prevents cascading failures by stopping requests to failing services and providing fallback responses."
  },
  {
    id: 67,
    question: "What is Resilience4j?",
    options: ["A database", "Lightweight fault tolerance library for Java (replacement for Hystrix)", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Resilience4j is a lightweight fault tolerance library for Java, replacing Hystrix in Spring Cloud."
  },
  {
    id: 68,
    question: "What is Hystrix (deprecated)?",
    options: ["Current library", "Circuit Breaker library from Netflix (deprecated, use Resilience4j)", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Hystrix was a Circuit Breaker library from Netflix, now deprecated in favor of Resilience4j."
  },
  {
    id: 69,
    question: "What is @CircuitBreaker annotation?",
    options: ["Marks circuit breaker", "Enables circuit breaker for a method", "Disables circuit breaker", "Creates circuit breaker"],
    correctAnswer: 1,
    explanation: "@CircuitBreaker annotation (Resilience4j) enables circuit breaker functionality for a method."
  },
  {
    id: 70,
    question: "What is Fallback method?",
    options: ["Fallback creation", "Method executed when circuit breaker is open or service fails", "Main method", "Error method"],
    correctAnswer: 1,
    explanation: "Fallback method provides alternative response when circuit breaker is open or service call fails."
  },
  {
    id: 71,
    question: "What are Circuit Breaker states?",
    options: ["Only Open", "Closed, Open, Half-Open", "Only Closed", "Only Half-Open"],
    correctAnswer: 1,
    explanation: "Circuit Breaker has three states: Closed (normal), Open (failing), and Half-Open (testing recovery)."
  },
  {
    id: 72,
    question: "What is @Retry annotation?",
    options: ["Marks retry", "Enables retry mechanism for failed method calls", "Disables retry", "Creates retry"],
    correctAnswer: 1,
    explanation: "@Retry annotation (Resilience4j) enables retry mechanism for failed method calls."
  },
  {
    id: 73,
    question: "What is @RateLimiter annotation?",
    options: ["Marks rate limiter", "Limits number of calls to a method per time period", "Disables rate limit", "Creates rate limit"],
    correctAnswer: 1,
    explanation: "@RateLimiter annotation (Resilience4j) limits the number of calls to a method within a time period."
  },
  {
    id: 74,
    question: "What is @Bulkhead annotation?",
    options: ["Marks bulkhead", "Isolates method execution in separate thread pool", "Disables isolation", "Creates isolation"],
    correctAnswer: 1,
    explanation: "@Bulkhead annotation (Resilience4j) isolates method execution in a separate thread pool to prevent resource exhaustion."
  },
  {
    id: 75,
    question: "What is @TimeLimiter annotation?",
    options: ["Marks time limiter", "Limits execution time of a method", "Disables time limit", "Creates time limit"],
    correctAnswer: 1,
    explanation: "@TimeLimiter annotation (Resilience4j) limits the execution time of asynchronous methods."
  },
  {
    id: 76,
    question: "What is Bulkhead pattern?",
    options: ["Ship component", "Isolates resources to prevent cascading failures", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Bulkhead pattern isolates resources (thread pools) to prevent one failing service from affecting others."
  },
  {
    id: 77,
    question: "What is Retry pattern?",
    options: ["Retry creation", "Automatically retries failed operations with exponential backoff", "No retry", "Single retry"],
    correctAnswer: 1,
    explanation: "Retry pattern automatically retries failed operations with exponential backoff to handle transient failures."
  },
  {
    id: 78,
    question: "What is Timeout pattern?",
    options: ["Timeout creation", "Sets maximum time for operation, fails if exceeded", "No timeout", "Infinite timeout"],
    correctAnswer: 1,
    explanation: "Timeout pattern sets a maximum time for an operation and fails if the time is exceeded."
  },
  {
    id: 79,
    question: "What is Health Check in Circuit Breaker?",
    options: ["Health creation", "Mechanism to check if service is healthy before closing circuit", "No health check", "Single health check"],
    correctAnswer: 1,
    explanation: "Health Check verifies if a service is healthy before transitioning circuit breaker from Open to Closed state."
  },
  {
    id: 80,
    question: "What is Resilience4j vs Hystrix?",
    options: ["No difference", "Resilience4j is lighter, functional, Hystrix is deprecated", "Hystrix is better", "Both same"],
    correctAnswer: 1,
    explanation: "Resilience4j is lighter, functional, and actively maintained, while Hystrix is deprecated."
  },

  // ========== DISTRIBUTED TRACING & MONITORING (10 questions) ==========
  {
    id: 81,
    question: "What is Distributed Tracing?",
    options: ["Tracing services", "Tracing requests across multiple microservices for debugging", "Tracing database", "Tracing network"],
    correctAnswer: 1,
    explanation: "Distributed Tracing tracks requests as they flow through multiple microservices for debugging and performance monitoring."
  },
  {
    id: 82,
    question: "What is Spring Cloud Sleuth?",
    options: ["A database", "Distributed tracing solution for Spring Cloud (now part of Micrometer)", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Sleuth provides distributed tracing for Spring Cloud applications (now integrated with Micrometer)."
  },
  {
    id: 83,
    question: "What is Trace ID?",
    options: ["Service ID", "Unique ID for a request across all microservices", "Client ID", "Database ID"],
    correctAnswer: 1,
    explanation: "Trace ID is a unique identifier for a request that remains constant as it flows through all microservices."
  },
  {
    id: 84,
    question: "What is Span ID?",
    options: ["Service ID", "Unique ID for a single operation within a trace", "Trace ID", "Request ID"],
    correctAnswer: 1,
    explanation: "Span ID is a unique identifier for a single operation (span) within a distributed trace."
  },
  {
    id: 85,
    question: "What is Zipkin?",
    options: ["A database", "Distributed tracing system for collecting and visualizing traces", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Zipkin is a distributed tracing system that collects and visualizes traces from microservices."
  },
  {
    id: 86,
    question: "What is ELK Stack?",
    options: ["A database", "Elasticsearch, Logstash, Kibana - for log aggregation and analysis", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "ELK Stack (Elasticsearch, Logstash, Kibana) is used for log aggregation, analysis, and visualization in microservices."
  },
  {
    id: 87,
    question: "What is Micrometer?",
    options: ["A database", "Metrics collection library for JVM applications", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Micrometer is a metrics collection library that provides a vendor-neutral interface for metrics in Spring Boot applications."
  },
  {
    id: 88,
    question: "What is Prometheus?",
    options: ["A database", "Monitoring and alerting toolkit that collects metrics", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Prometheus is a monitoring and alerting toolkit that collects and stores metrics from microservices."
  },
  {
    id: 89,
    question: "What is Grafana?",
    options: ["A database", "Visualization and analytics platform for metrics", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Grafana is a visualization and analytics platform for creating dashboards from metrics (Prometheus, etc.)."
  },
  {
    id: 90,
    question: "What is OpenFeign?",
    options: ["A database", "Declarative HTTP client for calling microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "OpenFeign is a declarative HTTP client that simplifies calling other microservices with load balancing and circuit breaking."
  },

  // ========== SPRING CLOUD SECURITY (10 questions) ==========
  {
    id: 91,
    question: "What is OAuth2?",
    options: ["A database", "Authorization framework for secure API access", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "OAuth2 is an authorization framework that allows third-party services to access resources on behalf of users."
  },
  {
    id: 92,
    question: "What is JWT (JSON Web Token)?",
    options: ["A database", "Token-based authentication mechanism", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "JWT is a compact, URL-safe token format used for authentication and authorization in microservices."
  },
  {
    id: 93,
    question: "What is Spring Cloud Security?",
    options: ["A database", "Security features for microservices (OAuth2, JWT)", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Security provides security features for microservices including OAuth2 and JWT support."
  },
  {
    id: 94,
    question: "What is Resource Server in OAuth2?",
    options: ["Database server", "Service that protects resources and validates tokens", "Client server", "Auth server"],
    correctAnswer: 1,
    explanation: "Resource Server in OAuth2 protects resources and validates access tokens from clients."
  },
  {
    id: 95,
    question: "What is Authorization Server in OAuth2?",
    options: ["Database server", "Server that issues access tokens to clients", "Resource server", "Client server"],
    correctAnswer: 1,
    explanation: "Authorization Server in OAuth2 issues access tokens to clients after authentication."
  },
  {
    id: 96,
    question: "What is @EnableResourceServer annotation?",
    options: ["Enables resource", "Enables OAuth2 Resource Server", "Disables resource", "Creates resource"],
    correctAnswer: 1,
    explanation: "@EnableResourceServer annotation enables OAuth2 Resource Server functionality."
  },
  {
    id: 97,
    question: "What is @EnableAuthorizationServer annotation?",
    options: ["Enables auth", "Enables OAuth2 Authorization Server", "Disables auth", "Creates auth"],
    correctAnswer: 1,
    explanation: "@EnableAuthorizationServer annotation enables OAuth2 Authorization Server functionality."
  },
  {
    id: 98,
    question: "What is Service-to-Service Authentication?",
    options: ["Client auth", "Authentication between microservices", "User auth", "Database auth"],
    correctAnswer: 1,
    explanation: "Service-to-Service Authentication ensures secure communication between microservices (e.g., using JWT or mTLS)."
  },
  {
    id: 99,
    question: "What is mTLS (Mutual TLS)?",
    options: ["Single TLS", "Mutual authentication using TLS certificates", "No TLS", "One-way TLS"],
    correctAnswer: 1,
    explanation: "mTLS (Mutual TLS) provides mutual authentication where both client and server verify each other's certificates."
  },
  {
    id: 100,
    question: "What is API Key Authentication?",
    options: ["Key creation", "Authentication using API keys for service-to-service communication", "Token auth", "Certificate auth"],
    correctAnswer: 1,
    explanation: "API Key Authentication uses API keys for authenticating service-to-service communication."
  },

  // ========== MICROSERVICES PATTERNS & BEST PRACTICES (10 questions) ==========
  {
    id: 101,
    question: "What is Database per Service pattern?",
    options: ["Shared database", "Each microservice has its own database", "No database", "Single database"],
    correctAnswer: 1,
    explanation: "Database per Service pattern ensures each microservice has its own database for loose coupling."
  },
  {
    id: 102,
    question: "What is Saga pattern?",
    options: ["A story", "Pattern for managing distributed transactions across microservices", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Saga pattern manages distributed transactions across microservices using a sequence of local transactions."
  },
  {
    id: 103,
    question: "What is Event Sourcing?",
    options: ["Event creation", "Storing state changes as sequence of events", "Storing state", "Deleting events"],
    correctAnswer: 1,
    explanation: "Event Sourcing stores state changes as a sequence of events, allowing reconstruction of state at any point."
  },
  {
    id: 104,
    question: "What is CQRS (Command Query Responsibility Segregation)?",
    options: ["Single model", "Separating read and write models", "Combined model", "No model"],
    correctAnswer: 1,
    explanation: "CQRS separates read and write models, allowing independent optimization of read and write operations."
  },
  {
    id: 105,
    question: "What is API Versioning?",
    options: ["Version creation", "Managing multiple versions of APIs for backward compatibility", "Single version", "No versioning"],
    correctAnswer: 1,
    explanation: "API Versioning manages multiple versions of APIs to support backward compatibility and gradual migration."
  },
  {
    id: 106,
    question: "What is Blue-Green Deployment?",
    options: ["Color deployment", "Deployment strategy with two identical environments (switch traffic)", "Single environment", "No deployment"],
    correctAnswer: 1,
    explanation: "Blue-Green Deployment uses two identical environments, switching traffic from old (blue) to new (green) for zero-downtime."
  },
  {
    id: 107,
    question: "What is Canary Deployment?",
    options: ["Bird deployment", "Gradual rollout to small subset of users before full deployment", "Full deployment", "No deployment"],
    correctAnswer: 1,
    explanation: "Canary Deployment gradually rolls out new version to a small subset of users before full deployment."
  },
  {
    id: 108,
    question: "What is Service Mesh?",
    options: ["A network", "Infrastructure layer for service-to-service communication (Istio, Linkerd)", "A service", "A database"],
    correctAnswer: 1,
    explanation: "Service Mesh is an infrastructure layer that handles service-to-service communication, security, and observability."
  },
  {
    id: 109,
    question: "What is Container Orchestration?",
    options: ["Container creation", "Managing and coordinating containers (Kubernetes, Docker Swarm)", "Container deletion", "Container storage"],
    correctAnswer: 1,
    explanation: "Container Orchestration manages and coordinates containers across multiple hosts (e.g., Kubernetes, Docker Swarm)."
  },
  {
    id: 110,
    question: "What is Kubernetes?",
    options: ["A database", "Container orchestration platform for managing microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Kubernetes is a container orchestration platform for automating deployment, scaling, and management of microservices."
  },

  // ========== SPRING CLOUD MISCELLANEOUS (10 questions) ==========
  {
    id: 111,
    question: "What is Spring Cloud OpenFeign?",
    options: ["A database", "Declarative HTTP client for calling microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud OpenFeign is a declarative HTTP client that simplifies calling other microservices."
  },
  {
    id: 112,
    question: "What is @FeignClient annotation?",
    options: ["Marks Feign client", "Declares a Feign client interface for calling another service", "Creates client", "Deletes client"],
    correctAnswer: 1,
    explanation: "@FeignClient annotation declares a Feign client interface for calling another microservice."
  },
  {
    id: 113,
    question: "What is Spring Cloud LoadBalancer?",
    options: ["A database", "Client-side load balancer for Spring Cloud", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud LoadBalancer is a client-side load balancer that replaces Ribbon in newer Spring Cloud versions."
  },
  {
    id: 114,
    question: "What is @LoadBalanced annotation?",
    options: ["Marks load balanced", "Enables client-side load balancing", "Disables load balancing", "Creates load balancer"],
    correctAnswer: 1,
    explanation: "@LoadBalanced annotation on RestTemplate or WebClient enables client-side load balancing."
  },
  {
    id: 115,
    question: "What is Spring Cloud Stream?",
    options: ["A database", "Framework for building event-driven microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Stream is a framework for building event-driven microservices using message brokers (Kafka, RabbitMQ)."
  },
  {
    id: 116,
    question: "What is @EnableBinding annotation?",
    options: ["Enables binding", "Enables message channel bindings in Spring Cloud Stream", "Disables binding", "Creates binding"],
    correctAnswer: 1,
    explanation: "@EnableBinding annotation enables message channel bindings in Spring Cloud Stream applications."
  },
  {
    id: 117,
    question: "What is Spring Cloud Task?",
    options: ["A database", "Framework for short-lived microservices (batch jobs, tasks)", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Task is a framework for building short-lived microservices like batch jobs and scheduled tasks."
  },
  {
    id: 118,
    question: "What is Spring Cloud Function?",
    options: ["A database", "Framework for building serverless functions with Spring", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Function enables building serverless functions that can run on various platforms (AWS Lambda, etc.)."
  },
  {
    id: 119,
    question: "What is Spring Cloud Contract?",
    options: ["A database", "Framework for contract testing between microservices", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Contract enables contract testing to ensure compatibility between microservices."
  },
  {
    id: 120,
    question: "What is Spring Cloud Vault?",
    options: ["A database", "Integration with HashiCorp Vault for secrets management", "A service", "A framework"],
    correctAnswer: 1,
    explanation: "Spring Cloud Vault integrates with HashiCorp Vault for secure secrets management in microservices."
  }
];

// Function to get random questions for exam
export const getRandomQuestions = (count = 20) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

