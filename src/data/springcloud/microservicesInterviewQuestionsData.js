/** Top 30 Microservices interview Q&A — used by MicroservicesInterviewQuestionsShowcase */

export const MICROSERVICES_IQ_TABS = [
  ['fundamentals', 'Fundamentals (1–8)'],
  ['spring-cloud', 'Spring Cloud (9–16)'],
  ['resilience', 'Resilience & Data (17–23)'],
  ['production', 'Production (24–30)']
];

export const MICROSERVICES_IQ_QUESTIONS = {
  fundamentals: [
    {
      num: 1,
      level: 'Basic',
      q: 'What are microservices? Explain with an example.',
      a: `Definition: Microservices is an architectural style where a large application is split into small, independently deployable services. Each service owns a specific business capability, runs in its own process, and communicates over the network using lightweight protocols such as HTTP/REST, gRPC, or messaging.

How it works: Instead of one giant application (monolith), you build several focused services. Each team can develop, test, and deploy their service without waiting for a full application release. Services expose APIs; other services or clients call those APIs rather than sharing code or database tables directly.

Key characteristics:
• Loosely coupled — services know each other through contracts (APIs), not shared internals
• Independently deployable — a bug fix in Payment Service does not require redeploying Order Service
• Organized around business capabilities — User, Order, Payment, not technical layers like "DAO layer"
• Database per service — each service owns and protects its data

Example (E-commerce):
• User Service — registration, login, profiles
• Product Service — catalog, search, pricing
• Order Service — cart, checkout, order status
• Payment Service — card/UPI transactions, refunds
• Notification Service — email, SMS, push alerts

Interview tip: Mention that microservices solve organizational and scaling problems as much as technical ones — they work best when multiple teams need to ship independently.`
    },
    {
      num: 2,
      level: 'Basic',
      q: 'What is the difference between monolith and microservices?',
      a: `Definition: A monolith is a single deployable unit containing all features. Microservices split those features into separate deployables that communicate over the network.

Monolith characteristics:
• One codebase (or tightly linked modules)
• Single deployment artifact (one WAR/JAR or one Docker image for the whole app)
• Usually one shared database
• Simple local method calls between modules — no network overhead
• Easier to start with: one repo, one build, one deploy pipeline

Microservices characteristics:
• Multiple codebases/repos (often one per service)
• Each service deployed independently on its own schedule
• Database per service — no direct cross-service SQL joins
• Network calls between services — adds latency and failure modes
• Requires service discovery, API gateway, monitoring, and mature DevOps

Comparison table (what interviewers expect):
• Development speed (early stage): Monolith wins — less infrastructure overhead
• Team scaling (10+ engineers): Microservices win — teams own services end-to-end
• Fault isolation: Microservices — a crash in one service does not take down everything (if designed well)
• Data consistency: Monolith — single ACID transaction; Microservices — eventual consistency patterns
• Operational complexity: Monolith is simpler; microservices need Kubernetes, tracing, config servers

When to choose: Start with a well-structured modular monolith when the domain is new or the team is small. Move to microservices when independent scaling, release cadence, or technology diversity clearly justifies the distributed cost.`
    },
    {
      num: 3,
      level: 'Basic',
      q: 'What are the advantages and disadvantages of microservices?',
      a: `Advantages:
• Independent deployment — ship Payment Service v2 without touching User Service
• Technology diversity — use Node.js for a real-time chat service and Java for billing if it makes sense
• Targeted scaling — scale only the search service during a sale, not the entire monolith
• Fault isolation — circuit breakers can stop failures from spreading (when designed correctly)
• Team autonomy — each team owns design, code, tests, and on-call for their service
• Faster parallel development in large organizations — fewer merge conflicts across one giant repo

Disadvantages:
• Network latency — every service call adds milliseconds; long synchronous chains hurt UX
• Distributed debugging — one user request may touch 5 services; you need trace IDs in logs
• Data consistency — no single ACID transaction across services; Sagas and events add complexity
• Infrastructure overhead — service discovery, config management, API gateway, message brokers
• Testing complexity — integration tests need test containers or contract testing (Pact)
• Operational maturity required — CI/CD, monitoring, on-call, runbooks before splitting

Interview tip: Never say "microservices are always better." Strong candidates explain trade-offs and tie the answer to team size, traffic patterns, and release frequency. Example: "We stayed monolith until checkout traffic needed independent scaling — then we extracted Order and Payment services first."`
    },
    {
      num: 4,
      level: 'Intermediate',
      q: 'When should you avoid microservices?',
      a: `Definition: Microservices are a scaling pattern for teams and systems — not a default architecture. Using them too early creates a distributed monolith: all the pain of distribution with none of the benefits.

Avoid or delay microservices when:
• The business domain is unclear — you will split along wrong boundaries and refactor constantly
• The team is small (roughly under 8–10 engineers) without dedicated platform/DevOps support
• You lack CI/CD, centralized logging, metrics, and on-call practices
• Traffic is low and uniform — one well-tuned monolith on a few servers is cheaper and simpler
• A modular monolith can deliver the same features faster with lower risk

Signs you split too early:
• Services must be deployed together anyway
• Most features still touch 4–5 services synchronously
• Teams spend more time on infrastructure than product features
• Incidents are harder to debug than before the split

Better alternative first steps:
• Build a modular monolith with clear package boundaries
• Use async events inside the monolith before extracting services
• Extract one service only when there is a clear pain point (scaling, team ownership, different release cycle)

Interview tip: Interviewers love hearing "We would not use microservices on day one." Explain what maturity signals you wait for: stable domain model, automated deploys, observability, and a service that genuinely needs independent scaling.`
    },
    {
      num: 5,
      level: 'Intermediate',
      q: 'Explain the Database-per-Service pattern.',
      a: `Definition: Each microservice has its own private database (schema or physical DB). No other service is allowed to read or write that database directly — they must call the owning service's API.

Why it exists: Shared databases create tight coupling. If Order Service and Payment Service both write to an orders table, a schema change in one team breaks the other. Database-per-service enforces true service boundaries.

Benefits:
• Loose coupling — schema changes are local to one team
• Technology choice — MySQL for orders, MongoDB for product catalog, Redis for sessions
• Independent scaling — scale the database that actually has load
• Clear ownership — one team is responsible for data integrity in that domain

Challenges:
• No cross-service JOINs — you cannot SELECT from users and orders in one SQL query across services
• Data duplication — User Service may store userId + name; Order Service stores userId + snapshot of name at order time
• Eventual consistency — data across services may be temporarily out of sync

Solutions when you need combined data:
• API composition — BFF (Backend for Frontend) calls User + Order APIs and merges results
• CQRS read models — a denormalized view built from events for fast reads
• Event-driven sync — UserUpdatedEvent updates cached user info in Order Service

Example: Payment Service stores transaction_id, amount, status. Order Service stores order_id, user_id, line items. Order Service never queries payment_db — it calls GET /payments/{id} or listens to PaymentCompletedEvent.

Interview tip: Emphasize that this pattern is non-negotiable in mature microservices — shared databases are the fastest way to recreate a monolith with extra network hops.`
    },
    {
      num: 6,
      level: 'Intermediate',
      q: 'What is a bounded context in microservices?',
      a: `Definition: A bounded context (from Domain-Driven Design) is a boundary within which a domain model has one clear, consistent meaning. Terms and rules inside the boundary are unambiguous; the same word may mean something different in another context.

Why it matters for microservices: Each microservice should align with one bounded context. Splitting by technical layer ("database service", "API service") causes confusion. Splitting by business capability ("Order", "Shipping", "Billing") maps cleanly to how the business thinks.

Example — the word "Order":
• In Order Service — line items, quantities, order status (PLACED, SHIPPED)
• In Payment Service — amount charged, payment method, transaction reference
• In Shipping Service — tracking number, carrier, delivery ETA

These are related but not identical models. Forcing one shared Order entity across all services creates a fragile god-object.

How to identify bounded contexts:
• Listen to how business teams speak — "checkout", "inventory", "loyalty" are often natural boundaries
• Look for different change rates — catalog changes weekly; tax rules change rarely
• Find places where the same noun has different attributes or lifecycle rules

Interview tip: Say "We split services by bounded context, not by CRUD tables." Draw three boxes on the whiteboard with different fields for "Order" in each — interviewers notice you understand DDD basics.`
    },
    {
      num: 7,
      level: 'Basic',
      q: 'What is Spring Cloud and what are its main components?',
      a: `Definition: Spring Cloud is a collection of tools and libraries that sit on top of Spring Boot to solve common problems in distributed systems — service discovery, configuration, routing, resilience, and observability.

Think of it this way: Spring Boot helps you build one service quickly. Spring Cloud helps many Spring Boot services work together in production.

Main components:
• Eureka — service registry; services register on startup and discover each other by logical name
• Spring Cloud Config Server — central configuration stored in Git; services pull config by app name + profile
• Spring Cloud Gateway — edge API gateway for routing, auth, rate limiting, SSL termination
• Spring Cloud LoadBalancer — client-side load balancing when calling http://order-service/...
• OpenFeign — declarative REST client; write an interface, Spring generates HTTP calls
• Resilience4j — circuit breaker, retry, rate limiter, bulkhead for fault tolerance
• Micrometer Tracing — distributed tracing with Zipkin/Jaeger integration (Spring Boot 3+)

Typical request flow:
1. Client hits API Gateway
2. Gateway routes to user-service via LoadBalancer
3. user-service was found via Eureka
4. Config came from Config Server at startup
5. If payment-service fails, Resilience4j circuit breaker returns fallback
6. traceId links all logs across services

Interview tip: You do not need to list every project — focus on Eureka + Gateway + Config + Resilience4j and explain one end-to-end user login or checkout flow through them.`
    },
    {
      num: 8,
      level: 'Senior',
      q: 'What is a distributed monolith?',
      a: `Definition: A distributed monolith is a system that looks like microservices (separate deployable JARs/containers) but behaves like a monolith — services are tightly coupled, must be released together, and cannot scale or fail independently.

Common symptoms:
• Cannot deploy Service A without deploying Service B — shared library or schema coupling
• Multiple services read/write the same database tables
• Long synchronous call chains: A → B → C → D on every user request
• One service down means the entire user journey fails
• No real team ownership — three teams still coordinate every release

How it happens: Teams split the monolith by package name or URL path without enforcing database-per-service, async boundaries, or independent release pipelines. They gain network latency without gaining autonomy.

How to fix it:
• Enforce database-per-service — migrate shared tables behind owning service APIs
• Replace sync chains with events for non-critical steps
• Introduce API contracts and consumer-driven contract tests
• Give each service its own CI/CD pipeline and on-call rotation
• Use strangler fig pattern — extract one bounded context at a time

Interview tip: Mention you have seen this in real projects. Example: "We had five services but one shared orders table — deployments were still weekly and coordinated. We fixed it by moving schema ownership to Order Service and publishing OrderCreated events."`
    }
  ],
  'spring-cloud': [
    {
      num: 9,
      level: 'Basic',
      q: 'What is Service Discovery and why is it needed?',
      a: `Definition: Service discovery is the mechanism by which services find the network location (IP, port) of other services at runtime without hard-coded URLs.

Why it is needed: In cloud environments and Kubernetes, instances are ephemeral. A service may run as 3 pods today and 10 tomorrow. IPs change on every deploy. Hard-coding http://192.168.1.50:8080 breaks the moment that container restarts.

How it works:
1. Service instance starts and registers itself with a registry (e.g., Eureka) under a logical name like order-service
2. Registry stores instance metadata: host, port, health status
3. Calling service asks the registry: "Give me healthy order-service instances"
4. Client-side load balancer picks one instance and makes the HTTP call
5. On shutdown, instance deregisters; heartbeats keep the registry fresh

Without service discovery you would:
• Maintain static URL lists in config files — brittle and manual
• Reconfigure load balancers on every scale event
• Break blue-green deploys when IPs shift

Alternatives to Eureka: Kubernetes DNS (order-service.default.svc.cluster.local), Consul, AWS Cloud Map. In Kubernetes-native setups, K8s service names often replace Eureka.

Interview tip: Connect discovery to elastic scaling — "When we scale Payment Service from 2 to 8 pods during a sale, callers automatically get the new instances without config changes."`
    },
    {
      num: 10,
      level: 'Intermediate',
      q: 'Explain Spring Cloud Eureka (Server and Client).',
      a: `Definition: Netflix Eureka (integrated in Spring Cloud) implements service registration and discovery. Eureka Server is the registry; Eureka Client runs inside each microservice.

Eureka Server:
• Central registry that stores service names and instance lists
• Enabled with @EnableEurekaServer on a Spring Boot application
• Does not route traffic — it only answers "where are the instances of order-service?"
• Designed for AP (availability + partition tolerance) in CAP theorem — prefers staying available even if some data is slightly stale

Eureka Client (each microservice):
• Registers on startup with app name, IP, port
• Sends heartbeats every 30 seconds (default) — "I am still alive"
• If heartbeats stop, server evicts the instance after ~90 seconds
• Also fetches registry cache so it can call other services
• Dependency: spring-cloud-starter-netflix-eureka-client

Configuration example:
• Server port: 8761
• Client: eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
• spring.application.name=order-service

Calling another service: Use http://order-service/api/orders — Spring Cloud LoadBalancer resolves order-service via Eureka and picks a healthy instance.

Self-preservation mode: Eureka may keep "dead" instances briefly during network partitions to avoid mass eviction — understand this when debugging "why is traffic still going to a bad node?"

Interview tip: Contrast Eureka with a static Nginx upstream block — Eureka updates automatically when pods scale up or down.`
    },
    {
      num: 11,
      level: 'Intermediate',
      q: 'What is Spring Cloud Config Server?',
      a: `Definition: Spring Cloud Config Server provides centralized, externalized configuration for all microservices. Configuration lives in a Git repository (or Vault, filesystem); services fetch their properties at startup and on refresh.

Problem it solves: Without Config Server, each service has application.properties baked into the JAR. Changing a database URL means rebuild + redeploy every service. Secrets in Git history are a security risk.

How it works:
1. Config Server connects to a Git repo with files like order-service.yml, order-service-prod.yml
2. Each microservice declares spring.application.name=order-service and profile prod
3. Client imports config: spring.config.import=optional:configserver:http://config-server:8888
4. Server returns merged properties for order-service + prod profile
5. @RefreshScope beans can reload on /actuator/refresh without full restart (for non-critical changes)

Benefits:
• Single source of truth for URLs, feature flags, pool sizes
• Environment-specific overrides — dev vs staging vs prod in separate files or branches
• Audit trail via Git commits — who changed the payment gateway URL and when
• Secrets can integrate with HashiCorp Vault instead of plain text in Git

Best practices:
• Never commit production secrets to plain Git — use Vault or encrypted properties
• Keep service-specific config in separate files — avoid one giant application.yml
• Version config changes like code — tag releases that match service deployments

Interview tip: Mention bootstrap context — services need minimal local config (only Config Server URL) and pull everything else remotely.`
    },
    {
      num: 12,
      level: 'Intermediate',
      q: 'Explain the API Gateway pattern and its benefits.',
      a: `Definition: An API Gateway is a single entry point for all external client requests (web, mobile, third-party). It routes requests to the appropriate internal microservice and handles cross-cutting concerns in one place.

Why not call services directly: If mobile apps knew internal hostnames for user-service, order-service, and payment-service, every API change would require app updates. Internal topology would be exposed. Auth would be duplicated in every service.

Gateway responsibilities:
• Routing — /api/users/** → user-service, /api/orders/** → order-service
• Authentication — validate JWT/OAuth2 token once at the edge
• Rate limiting — protect backend from abuse or DDoS
• SSL termination — HTTPS outside, HTTP inside the cluster
• Request aggregation — one call from mobile, gateway fetches user + cart + recommendations
• Protocol translation — HTTP/JSON outside, gRPC inside (if needed)
• CORS handling — browser security headers in one place

Spring Cloud Gateway example (application.yml routes):
• Path=/api/users/** → uri=lb://user-service
• Path=/api/orders/** → uri=lb://order-service
• Filters: StripPrefix, AddRequestHeader, RequestRateLimiter

Trade-offs:
• Gateway can become a bottleneck — scale it horizontally and keep it stateless
• Do not put heavy business logic in the gateway — it should route and enforce policy, not calculate prices

Interview tip: Distinguish API Gateway (north-south, client → system) from service-to-service calls (east-west) — they solve different problems.`
    },
    {
      num: 13,
      level: 'Intermediate',
      q: 'How does Spring Cloud Load Balancing work?',
      a: `Definition: Spring Cloud LoadBalancer provides client-side load balancing — the calling service (or OpenFeign client) chooses which instance of a downstream service to hit, rather than a central proxy making the decision.

How it works with Eureka:
1. Application calls http://order-service/api/orders/123
2. LoadBalancer intercepts the hostname order-service
3. It queries Eureka (or K8s discovery) for all healthy order-service instances
4. Applies a strategy — default is RoundRobin (instance 1, then 2, then 3, repeat)
5. Replaces order-service with actual IP:port and sends the HTTP request

Setup options:
• @LoadBalanced on RestTemplate or WebClient @Bean — enables logical service names in URLs
• OpenFeign — @FeignClient(name = "order-service") integrates LoadBalancer automatically
• Spring Cloud Gateway — uses lb://order-service scheme for server-side routing

Client-side vs server-side load balancing:
• Client-side (Spring LoadBalancer): caller picks instance; good for service-to-service; no extra hop
• Server-side (Nginx, AWS ALB): proxy picks backend; good for external traffic; centralized config

Tips for production:
• Combine with circuit breakers — if one instance is slow, retry another instance cautiously (idempotent GETs only)
• Use health checks so LoadBalancer skips unhealthy instances
• For sticky sessions, configure consistent hashing — rare in stateless microservices

Interview tip: Say "We use logical service names in code, not IPs — discovery + LoadBalancer resolve them at runtime."`
    },
    {
      num: 14,
      level: 'Intermediate',
      q: 'Explain Spring Cloud OpenFeign.',
      a: `Definition: OpenFeign is a declarative HTTP client for Java/Spring. You define a Java interface with Spring MVC annotations; at runtime Spring generates the implementation that makes HTTP calls.

Problem it solves: Raw RestTemplate code repeats URL building, error handling, and serialization boilerplate across every service call.

Example:
\`@FeignClient(name = "user-service")
public interface UserClient {
  @GetMapping("/users/{id}")
  UserDto getUser(@PathVariable Long id);
}\`

How it integrates:
• name = "user-service" ties to Eureka — LoadBalancer resolves instances
• Jackson serializes/deserializes JSON automatically
• Works with Resilience4j — wrap calls with circuit breaker via spring-cloud-starter-circuitbreaker-resilience4j
• Request interceptors add auth headers, correlation IDs, or tenant IDs

Configuration highlights:
• feign.client.config.default.connectTimeout / readTimeout — always set timeouts
• ErrorDecoder — map 404/500 to custom exceptions
• Fallback factory — return cached or default response when circuit is open

OpenFeign vs RestTemplate vs WebClient:
• OpenFeign — best for synchronous service-to-service REST; clean and readable
• RestTemplate — older, blocking; still valid but verbose
• WebClient — reactive/non-blocking; use with WebFlux stacks

Interview tip: Always mention timeouts and fallbacks with Feign — "We set 2s read timeout and a fallback that returns cached user profile if User Service is down."`
    },
    {
      num: 15,
      level: 'Common',
      q: 'What is the difference between RestTemplate and WebClient?',
      a: `RestTemplate:
• Synchronous and blocking — the thread waits until the HTTP response arrives
• Part of classic Spring MVC (spring-web)
• Simple mental model — call getForObject(), get result, continue
• Risk: under high concurrency, thread pool exhaustion if many slow downstream calls
• Status: maintenance mode — Spring team recommends WebClient for new code

WebClient:
• Reactive and non-blocking — built on Project Reactor (Mono, Flux)
• Part of Spring WebFlux (spring-webflux)
• A small thread pool can handle many concurrent outbound calls
• Better for streaming responses and backpressure scenarios
• Steeper learning curve — async composition with flatMap, zip, etc.

When to use which in microservices:
• Traditional Spring MVC service with moderate outbound calls → OpenFeign (which is blocking) is fine with proper thread pool sizing
• High-throughput gateway or I/O-bound aggregator → WebClient
• Mixing blocking JDBC with WebClient in same app — use bounded elastic scheduler; avoid blocking on reactive threads

Practical advice:
• Do not convert entire codebase to reactive unless you have a clear throughput problem
• If using WebClient, set connect/read timeouts explicitly
• Prefer OpenFeign for internal CRUD-style service calls in most Spring Boot teams

Interview tip: "Blocking is not evil — unbounded blocking without timeouts is. We use Feign with Resilience4j timeouts for 90% of calls."`
    },
    {
      num: 16,
      level: 'Common',
      q: 'What is the difference between Service Discovery and Service Registry?',
      a: `Service Registry (the server/database):
• Stores the catalog of services and their instances
• Examples: Eureka Server, Consul server, etcd
• Answers: "order-service currently has instances at 10.0.1.5:8080 and 10.0.1.6:8080"
• Maintains health via heartbeats or health check probes

Service Discovery (the client process):
• The act of a service finding where another service lives
• Eureka Client library in each microservice performs discovery
• Happens when you call http://order-service/... — LoadBalancer asks registry for instances

Complete flow:
1. Order Service starts → registers with Eureka Server (registry write)
2. Payment Service needs Order Service → Eureka Client fetches registry (discovery read)
3. LoadBalancer selects an instance → HTTP call proceeds
4. Order Service shuts down → deregisters or times out

Analogy: Service Registry is the phone book. Service Discovery is looking up a number before dialing.

In Kubernetes: the "registry" is often the K8s API + CoreDNS; the "discovery client" is built into Spring Cloud Kubernetes or plain DNS resolution.

Interview tip: Use precise terms — registry is the store; discovery is the lookup mechanism. Interviewers test whether you confuse the two.`
    }
  ],
  resilience: [
    {
      num: 17,
      level: 'Intermediate',
      q: 'What is a Circuit Breaker? Explain Resilience4j.',
      a: `Definition: A circuit breaker protects your service from repeatedly calling a failing downstream dependency. Like an electrical breaker, it "opens" to stop current (requests) when failure rate exceeds a threshold.

Why it is needed: If Payment Service is down and Order Service keeps calling it, threads block waiting for timeouts, connection pools fill up, and Order Service crashes too — cascading failure.

Three states:
• CLOSED — normal operation; requests pass through; failures are counted
• OPEN — failure threshold exceeded; calls fail immediately (fail fast); no load on sick dependency
• HALF_OPEN — after a wait period, allow one trial request; success → CLOSED, failure → OPEN again

Resilience4j in Spring Boot:
• Lightweight successor to Netflix Hystrix (Hystrix is in maintenance mode)
• @CircuitBreaker(name = "payment", fallbackMethod = "paymentFallback")
• Configurable: failureRateThreshold, waitDurationInOpenState, slidingWindowSize
• Also provides Retry, RateLimiter, Bulkhead, TimeLimiter — compose them

Example scenario: Payment gateway timeout spikes to 30s. Without breaker, 200 threads hang. With breaker, after 50% failures in 10 calls, circuit opens — orders get "payment temporarily unavailable" in 5ms instead of 30s.

Best practices:
• Always pair circuit breaker with timeout — breaker alone does not help if threads wait forever
• Fallback must be safe — return cached data or graceful degradation, not corrupt state
• Monitor circuit state metrics — alert when payment circuit stays OPEN

Interview tip: Draw the three states on a whiteboard and give a numeric example — "50% failure rate over 10 calls opens the circuit for 30 seconds."`
    },
    {
      num: 18,
      level: 'Senior',
      q: 'Explain the Saga pattern for distributed transactions.',
      a: `Definition: A Saga is a sequence of local transactions across multiple services. Each step commits in its own database. If a later step fails, compensating transactions undo the effects of earlier steps — without using two-phase commit (2PC) across services.

Problem it solves: In a monolith, @Transactional wraps user + order + payment in one ACID transaction. In microservices, each has its own DB — you cannot roll back all three atomically with one XA transaction (and you should avoid XA in cloud-native systems).

Two Saga styles:
• Choreography — services react to events with no central coordinator. Order Service publishes OrderCreated → Inventory reserves → Payment charges → Order confirms. Simple for 2–3 steps; hard to track when flows grow.
• Orchestration — a Saga orchestrator service tells each participant what to do and handles failure logic. Easier to visualize and debug for complex flows.

Compensation example (e-commerce checkout):
1. Create order — status PENDING (local TX in Order Service)
2. Reserve inventory (local TX in Inventory Service)
3. Charge payment — FAILS
4. Compensate: release inventory reservation
5. Compensate: mark order CANCELLED

Key rules:
• Every forward step must have a compensating action (or be safely retryable/idempotent)
• Sagas are eventually consistent — there is a window where order exists but payment failed
• Use unique saga ID in all messages for correlation and deduplication

Interview tip: Contrast with 2PC — "2PC locks resources and does not scale; Saga trades strong consistency for availability and is the standard in microservices commerce flows."`
    },
    {
      num: 19,
      level: 'Senior',
      q: 'What is CQRS (Command Query Responsibility Segregation)?',
      a: `Definition: CQRS separates the model used for writes (commands) from the model used for reads (queries). Instead of one entity serving both update screens and complex reports, you optimize each path independently.

Command side (write):
• Handles CreateOrder, UpdateInventory, ProcessPayment
• Enforces business rules and invariants
• Uses normalized schema in the owning service's database
• May publish domain events after successful commit

Query side (read):
• Handles GetOrderDashboard, SearchProducts, AdminReports
• Uses denormalized tables or materialized views optimized for reads
• Can lag slightly behind writes — eventual consistency acceptable for many UIs
• Often updated by consuming events from command services

Why use CQRS in microservices:
• A mobile home screen needs user name + last 3 orders + recommendations — calling 4 services synchronously is slow
• Build one read model (MongoDB document or Redis cache) updated by OrderCreated, UserUpdated events
• Mobile reads one API — fast and simple

CQRS is not always needed:
• Simple CRUD with one database — adds unnecessary complexity
• Strong read-your-writes requirement on every screen — harder with async read models

Often paired with Event Sourcing (events as source of truth) but CQRS can exist without event sourcing.

Interview tip: Give a concrete read model example — "Our Order Summary table is populated by Kafka consumers listening to OrderPlaced and PaymentCompleted — the admin dashboard reads one row per order instead of joining five services."`
    },
    {
      num: 20,
      level: 'Intermediate',
      q: 'What is the difference between synchronous and asynchronous communication?',
      a: `Synchronous communication:
• Caller sends a request and blocks until a response arrives (or times out)
• Protocols: REST, gRPC, GraphQL over HTTP
• Use when the user needs an immediate answer — "Place order and show confirmation now"
• Simple to reason about — success or failure in one round trip
• Risk: latency adds up in chains (A calls B calls C calls D = sum of all latencies)

Asynchronous communication:
• Caller publishes a message/event and continues without waiting
• Protocols: Kafka, RabbitMQ, Amazon SQS, Google Pub/Sub
• Use for side effects — send email, update analytics, notify warehouse, rebuild search index
• Better resilience — consumer can retry when back online; producer is not blocked
• Harder to debug — need correlation IDs and dead-letter queues

Hybrid (real production systems):
• Sync: User submits checkout → Order Service validates and returns orderId immediately
• Async: Order Service publishes OrderPlaced → Notification, Inventory, Analytics consume independently

Anti-pattern: 5 synchronous HTTP calls on the critical user path where 3 could be events after response.

Interview tip: "We use sync for the happy-path user response and async for everything the user does not wait for — that cut our checkout p95 latency from 2.1s to 400ms."`
    },
    {
      num: 21,
      level: 'Intermediate',
      q: 'Explain Event-Driven Architecture in microservices.',
      a: `Definition: In event-driven architecture (EDA), services communicate by publishing and subscribing to events — notifications that something happened in the past tense (OrderPlaced, PaymentFailed, UserRegistered).

Core concepts:
• Event — immutable fact with payload and timestamp
• Producer — service that publishes after its local transaction commits
• Broker — Kafka/RabbitMQ routes events to subscribers
• Consumer — service that reacts to events idempotently

Benefits:
• Loose coupling — Notification Service does not need Order Service's API address
• Scalability — add new consumers without changing producers (open/closed principle)
• Resilience — consumers catch up after downtime; events can be replayed
• Audit trail — event log shows history of state changes

Example flow:
1. Order Service saves order, publishes OrderCreatedEvent { orderId, userId, total }
2. Inventory Service consumes → reserves stock
3. Payment Service consumes → initiates charge
4. Notification Service consumes → sends confirmation email
5. Analytics Service consumes → updates dashboard

Design rules:
• Events describe what happened, not commands ("OrderCreated" not "CreateOrder")
• Consumers must be idempotent — same event delivered twice must not double-charge
• Use schema registry (Avro/Protobuf) for contract evolution
• Monitor consumer lag — growing lag means downstream cannot keep up

Interview tip: Mention outbox pattern — write event to DB outbox table in same TX as order, separate process publishes to Kafka — guarantees no lost events.`
    },
    {
      num: 22,
      level: 'Senior',
      q: 'How do you handle data consistency across microservices?',
      a: `Core truth: You cannot have a single ACID transaction spanning multiple microservice databases without distributed transactions (2PC/XA) — which are slow, fragile, and discouraged in cloud-native systems.

Consistency strategies:

1. Saga pattern — sequence of local transactions with compensating actions on failure (checkout, booking)

2. Eventual consistency — accept temporary inconsistency; systems converge via events. Example: inventory count on dashboard updates 2 seconds after order.

3. Event sourcing — store all changes as events; rebuild state by replaying; strong audit but complex

4. CQRS read models — write to authoritative service DB; project denormalized views for reads

5. Idempotency keys — client sends Idempotency-Key header so retries do not duplicate payments

6. Outbox pattern — atomic write of business data + outbound event in one local transaction

What to avoid:
• Two-phase commit (2PC) across PostgreSQL + MySQL + MongoDB — operational nightmare
• Shared database "just for joins" — recreates monolith coupling
• Synchronous dual writes — update Service A and Service B in one request without saga; one fails = inconsistent forever

Interview framing: "We choose strong consistency inside one service boundary and eventual consistency across boundaries — and we design UX to tolerate brief delays where needed."

Interview tip: Pick one pattern and go deep — Saga for write flows, CQRS for read aggregation — rather than listing ten buzzwords without examples.`
    },
    {
      num: 23,
      level: 'Intermediate',
      q: 'What is eventual consistency?',
      a: `Definition: Eventual consistency means that if no new updates are made, all replicas/copies of data will eventually converge to the same state — but they may differ temporarily.

Why it exists: In distributed systems, synchronizing every read across all services instantly is impractical. Network delays, async events, and replication lag mean different services see different versions for a short time.

Example (e-commerce):
• T0: User places order — Order Service shows "Confirmed"
• T0+500ms: Payment Service processes charge
• T0+2s: Inventory Service updates stock count on warehouse dashboard
• T0+3s: Search index reflects reduced stock

For those 3 seconds, systems disagree slightly — that is acceptable if business rules allow it.

CAP theorem connection: During a partition, you often choose Availability over strong Consistency (AP systems). Eventual consistency is the practical outcome.

Design techniques:
• Show users meaningful status — "Payment processing" instead of wrong stock count
• Idempotent event handlers — safe retries during lag
• Version numbers or timestamps — detect stale reads
• SLAs on replication lag — alert if read model is > 30s behind

When NOT acceptable: Bank balance debit/credit in same account may need strong consistency within Account Service — but not necessarily instant sync to marketing analytics.

Interview tip: "We document which reads are strongly consistent (inside one service) vs eventually consistent (cross-service dashboards) — interviewers want to see you manage expectations, not pretend everything is instant."`
    }
  ],
  production: [
    {
      num: 24,
      level: 'Intermediate',
      q: 'What is Distributed Tracing? Explain Micrometer Tracing.',
      a: `Definition: Distributed tracing tracks a single user request as it flows through multiple services, linking all logs and spans with a shared trace ID.

Problem it solves: User reports "checkout is slow." Without tracing, you grep logs in Gateway, Order, Payment, Inventory separately and guess. With tracing, one traceId shows: Gateway 12ms → Order 890ms (slow!) → Payment 45ms.

Key concepts:
• Trace — entire request journey (one checkout)
• Span — one operation within a trace (HTTP call from Order to Payment)
• traceId — same across all services for one user request
• spanId — identifies each step; parent-child relationships form a tree

Micrometer Tracing (Spring Boot 3):
• Auto-instruments RestTemplate, WebClient, OpenFeign, HTTP servlets
• Propagates trace context via W3C traceparent headers
• Exports to Zipkin, Jaeger, or OTLP-compatible backends
• Integrates with logging — put traceId in every log line (MDC)

Debugging workflow:
1. Find slow trace in Jaeger UI
2. Identify span with highest duration
3. Jump to logs filtered by traceId in Kibana
4. Fix slow SQL or add cache

Best practices:
• Always propagate trace context through async messages (Kafka headers)
• Sample wisely — 100% tracing in high traffic is expensive; use tail-based sampling for errors
• Add custom spans around critical business logic

Interview tip: Walk through a concrete trace — "Our order span showed 900ms because of a missing DB index — we found it in one trace view, not hours of log hunting."`
    },
    {
      num: 25,
      level: 'Intermediate',
      q: 'How do you handle security in microservices?',
      a: `Principle: Defense in depth — never assume the internal network is safe. Every layer validates trust.

Layer 1 — API Gateway (edge):
• Validate JWT/OAuth2 access tokens on every request
• Rate limiting and IP allowlists for public APIs
• Terminate TLS; strip dangerous headers
• Route only to authorized paths — block admin endpoints from public internet

Layer 2 — Service-to-service:
• mTLS (mutual TLS) or service mesh policies — services prove identity to each other
• Internal JWT or signed service tokens — not just "trust any request from 10.0.0.0/8"
• Network policies in Kubernetes — Payment Service only accepts from Order Service namespace

Layer 3 — Application (each service):
• @PreAuthorize / method-level authorization — role checks on sensitive operations
• Input validation — prevent injection; validate DTOs
• Least-privilege DB accounts — Order Service DB user cannot read payment tables
• OWASP basics — no secrets in logs, sanitize error messages

Layer 4 — Secrets management:
• HashiCorp Vault, AWS Secrets Manager, or Config Server with encryption
• Rotate keys; never commit secrets to Git
• Short-lived tokens over long-lived passwords

OAuth2 flow (typical): User logs in via Auth Server → gets JWT → Gateway validates JWT → forwards user claims as headers → downstream services trust Gateway or re-validate signature.

Interview tip: "We authenticate at the gateway and authorize in each service — the gateway knowing you are logged in does not mean you can call DELETE /admin/users."`
    },
    {
      num: 26,
      level: 'Intermediate',
      q: 'How do you monitor microservices in production?',
      a: `Three pillars of observability:

1. Metrics (what is happening, aggregated):
• Prometheus scrapes /actuator/prometheus endpoints
• Grafana dashboards: request rate, error rate, latency p50/p95/p99 per service
• RED method: Rate, Errors, Duration for each endpoint
• USE method for resources: Utilization, Saturation, Errors (CPU, memory, DB pool)

2. Logs (what happened, detailed):
• Centralized stack: ELK (Elasticsearch, Logstash, Kibana) or EFK (Fluentd)
• Structured JSON logs with traceId, userId, serviceName
• Correlate logs across services using traceId from Micrometer Tracing

3. Traces (why it is slow, request path):
• Zipkin or Jaeger visualize cross-service latency
• Find bottlenecks and error spans

Spring Boot Actuator essentials:
• /actuator/health — liveness/readiness for Kubernetes probes
• /actuator/metrics — JVM, HTTP, custom business metrics
• /actuator/info — build version, git commit

Alerting on SLOs (not just "CPU high"):
• p95 latency > 500ms for checkout for 5 minutes
• Error rate > 1% on payment endpoints
• Pod restart loop; consumer lag > 10,000 messages

Interview tip: Mention on-call runbooks — "Alert links to a runbook: check payment circuit breaker state, then DB connection pool, then downstream gateway status."`
    },
    {
      num: 27,
      level: 'Common',
      q: 'Explain Blue-Green deployment in microservices.',
      a: `Definition: Blue-Green deployment maintains two identical production environments. Blue runs the current live version; Green runs the new version. Traffic switches from Blue to Green once Green is verified healthy.

Steps:
1. Blue environment serves 100% user traffic (v1.4)
2. Deploy v1.5 to Green — run smoke tests, integration tests, canary checks
3. Switch load balancer / router from Blue to Green — instant cutover
4. Monitor error rates and latency on Green
5. If problems: switch back to Blue (fast rollback)
6. If stable: decommission old Blue or make it the next Green staging target

Benefits:
• Zero-downtime releases — no "stop server, deploy, pray"
• Rollback in seconds — flip traffic back to Blue
• Full environment testing before users hit new version

Requirements for microservices:
• Backward-compatible APIs — v1.5 consumers must not break v1.4 providers during transition
• Database migrations use expand-contract pattern — add column first, deploy code, remove old column later
• Stateless services — session data in Redis, not in-memory on one pod
• Feature flags for risky logic — disable without redeploy

Contrast with Rolling deployment: Rolling updates pods one-by-one — slower rollback, mixed versions during deploy. Blue-Green is cleaner but needs double infrastructure cost.

Interview tip: "We blue-green the gateway and stateless services; database changes follow expand-contract so both colors can run during cutover."`
    },
    {
      num: 28,
      level: 'Common',
      q: 'How do you handle API versioning in microservices?',
      a: `Why version APIs: Clients (mobile apps, partners) cannot update instantly. Breaking changes to response shape or URL structure need a migration period.

Common strategies:

1. URL path versioning (most popular):
• /api/v1/orders, /api/v2/orders
• Easy to route in API Gateway; visible in logs
• Used by many public REST APIs

2. Header versioning:
• Accept: application/vnd.mycompany.orders.v2+json
• Clean URLs but harder to test in browser; less visible in access logs

3. Query parameter:
• /api/orders?version=2 — simple but easy to forget; caching complications

Best practices:
• Support at least one previous major version during migration — give mobile teams 3–6 months
• Document breaking changes in changelog; deprecate with Sunset header
• Gateway routes /api/v1/** and /api/v2/** to same or different service instances
• Internal service-to-service calls can move faster — only public/partner APIs need long deprecation

Implementation in Spring:
• Separate controllers: OrderControllerV1, OrderControllerV2
• Or content negotiation with custom HandlerMapping
• Contract tests ensure v1 behavior unchanged while v2 evolves

Interview tip: "We never break v1 silently — we add v2, migrate clients with metrics on v1 traffic, deprecate when v1 hits zero."`
    },
    {
      num: 29,
      level: 'Senior',
      q: 'What is the difference between API Gateway and Service Mesh?',
      a: `API Gateway — north-south traffic:
• Direction: external clients (browser, mobile, partners) → your cluster
• Responsibilities: authentication, SSL, rate limiting, API versioning, request routing to internal services
• Examples: Spring Cloud Gateway, Kong, AWS API Gateway, NGINX Ingress
• One hop at the edge — clients never see internal topology

Service Mesh — east-west traffic:
• Direction: service → service inside the cluster
• Responsibilities: mTLS, retries, timeouts, traffic splitting (canary 5% to v2), circuit breaking at proxy level
• Implementation: sidecar proxy (Envoy) injected next to each pod — Istio, Linkerd
• Application code unchanged — policy lives in mesh control plane

Comparison:
• Gateway = front door for users
• Mesh = internal traffic cop between microservices
• Gateway is almost always needed for public APIs
• Mesh becomes valuable at 15–20+ services when mTLS and fine-grained traffic policy are painful to implement in each app

Many teams use both: Gateway at edge + Istio internally. Smaller teams may skip mesh and use Resilience4j + mTLS at ingress only until complexity justifies mesh overhead.

Interview tip: "Mesh adds operational cost — we introduced Istio when we needed mTLS everywhere and canary deploys without changing Java code in fifteen services."`
    },
    {
      num: 30,
      level: 'Senior',
      q: 'What are microservices best practices?',
      a: `Architecture and design:
• Model services around business capabilities and bounded contexts — not technical layers
• Enforce database-per-service; expose data only via APIs or events
• Design API-first with OpenAPI contracts; use consumer-driven contract tests (Pact)
• Prefer async events for non-critical paths; keep sync chains short on user-facing flows

Resilience and performance:
• Circuit breakers, timeouts, and bulkheads on every outbound call — no exceptions
• Idempotent APIs and consumers — safe retries
• Cache read-heavy data; use CDN for static assets
• Plan for failure — chaos testing in staging (kill random pods)

Operations and delivery:
• One CI/CD pipeline per service — independent release cadence
• Containerize with Docker; orchestrate with Kubernetes or managed platform
• Centralized config (Config Server/Vault), service discovery, API gateway from day one
• Health checks (liveness/readiness), graceful shutdown, structured logging with traceId

Observability and security:
• Metrics + logs + traces — the three pillars; alert on SLOs not just infrastructure
• Authenticate at gateway; authorize in each service; mTLS or mesh for internal traffic
• Secrets never in Git; rotate credentials; least-privilege IAM and DB roles

Team practices:
• You build it, you run it — service teams own on-call
• Document runbooks and architecture decision records (ADRs)
• Extract services gradually (strangler fig) — not big-bang rewrite

Interview tip: Close with a real principle you follow — "The best microservice is one you do not build until a modular monolith proves the boundary. We extract when scaling or team ownership forces it, not because the diagram looks modern."`
    }
  ]
};
