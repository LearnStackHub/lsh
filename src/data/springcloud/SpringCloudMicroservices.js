const springCloudMicroservices = {
  id: 'spring-cloud-microservices',
  title: 'Spring Cloud & Microservices Architecture',
  description: 'Complete guide to building microservices with Spring Cloud - Config Server, Eureka, API Gateway, Load Balancing, Feign, Resilience4j, Distributed Tracing, Security, and Centralized Logging',
  content: `
# Spring Cloud & Microservices Architecture - Complete Guide

Microservices is a way of building applications where instead of one big application (monolith), you break it down into smaller, independent services. Each service does one thing well and can be developed, deployed, and scaled independently.

Think of it like a restaurant. A monolith is like a small family restaurant where one chef does everything. Microservices is like a large restaurant with specialized stations - one chef for appetizers, one for main courses, one for desserts. Each station works independently but together they create the complete dining experience.

Let me walk you through everything you need to know about microservices and how to build them with Spring Cloud.

---

## 1. Microservices Architecture Fundamentals

### What is Monolith vs Microservices?

**Monolith Architecture:**

A monolith is a single, large application where all components are tightly coupled. Everything runs in one process.

Imagine you're building an e-commerce application. In a monolith, you have:
- User management
- Product catalog
- Shopping cart
- Payment processing
- Order management
- Inventory management

All of these are in one codebase, one database, one deployment.

**Microservices Architecture:**

In microservices, you break this into separate services:
- User Service - handles user registration, login, profiles
- Product Service - manages product catalog
- Cart Service - handles shopping cart operations
- Payment Service - processes payments
- Order Service - manages orders
- Inventory Service - tracks stock levels

Each service is a separate application with its own database, can be deployed independently, and communicates with others through APIs.

### Advantages of Microservices

**1. Independent Development:**
Teams can work on different services without stepping on each other's toes. The user service team can deploy updates without affecting the product service.

**2. Technology Diversity:**
You can use different technologies for different services. Maybe the payment service uses Java, but the analytics service uses Python. Each service can choose the best tool for its job.

**3. Scalability:**
If your product catalog gets a lot of traffic, you can scale just the product service. You don't need to scale the entire application.

**4. Fault Isolation:**
If the payment service crashes, the rest of your application can still function. Users can still browse products and add items to cart.

**5. Faster Deployment:**
You can deploy one service without redeploying everything. This means faster releases and less risk.

### Disadvantages of Microservices

**1. Complexity:**
Managing multiple services is more complex than managing one application. You need to handle service discovery, load balancing, distributed transactions, and more.

**2. Network Latency:**
Services communicate over the network, which adds latency. A request that used to be a simple method call now involves network calls.

**3. Data Consistency:**
Each service has its own database. Maintaining data consistency across services is challenging. If the order service creates an order but the inventory service fails to update stock, you have inconsistent data.

**4. Testing:**
Testing microservices is harder. You need to test each service individually and also test how they work together.

**5. Operational Overhead:**
You need to monitor multiple services, manage multiple deployments, handle service discovery, and more.

### When NOT to Use Microservices

Microservices aren't always the right choice. Don't use microservices if:

- Your team is small (less than 10 developers)
- Your application is simple and doesn't need to scale
- You're just starting out - build a monolith first, then break it down if needed
- You don't have DevOps expertise to manage multiple services
- Your application has tight coupling between components

Start with a monolith. Break it into microservices only when you have a real need - like different scaling requirements, independent deployment needs, or multiple teams working on different parts.

### Domain-Driven Design (DDD) Basics

Domain-Driven Design helps you identify where to split your monolith into microservices. The idea is to organize your services around business domains, not technical layers.

**Example: E-Commerce Application**

Instead of splitting by technical layers (like User Layer, Product Layer), split by business domains:

- **Order Domain** - Everything related to orders: creating orders, order history, order status
- **Product Domain** - Product catalog, categories, search, recommendations
- **Payment Domain** - Payment processing, refunds, payment methods
- **Shipping Domain** - Shipping addresses, delivery tracking, shipping rates

Each domain becomes a microservice.

### Bounded Context

A bounded context is a boundary within which a domain model is valid. It's like a department in a company - each department has its own terminology and rules.

**Example:**

In the Order service, a "Product" might mean "an item that can be ordered" with fields like: productId, name, price, availableQuantity.

In the Product service, a "Product" might mean "a catalog item" with fields like: productId, name, description, images, specifications, reviews.

Same word, different meaning in different contexts. That's why they're separate services.

### Architecture Principles

**Database per Service:**

Each microservice should have its own database. Don't share databases between services.

**Why?**
- Services can evolve independently
- No risk of one service breaking another's data
- Each service can choose the best database for its needs

**Example:**
- User Service uses MySQL for relational data
- Product Service uses MongoDB for flexible product schemas
- Analytics Service uses Elasticsearch for search

**API Composition:**

When you need data from multiple services, compose it at the API Gateway or a separate composition service.

**Example:**
To show an order with product details:
1. Order Service provides order information
2. Product Service provides product details
3. API Gateway or Composition Service combines them

**Event-Driven vs Request-Response:**

**Request-Response (Synchronous):**
Service A calls Service B and waits for a response. Like making a phone call.

**Event-Driven (Asynchronous):**
Service A publishes an event. Service B listens and reacts. Like sending an email.

**Example:**
When an order is placed:
- Request-Response: Order Service calls Inventory Service to reserve items, waits for confirmation
- Event-Driven: Order Service publishes "OrderCreated" event. Inventory Service listens and reserves items.

**Stateless Services:**

Services shouldn't store session state. Each request should contain all information needed to process it.

**Why?**
- Services can be scaled horizontally (add more instances)
- Any instance can handle any request
- No need for sticky sessions

**Horizontal Scaling:**

Add more instances of a service to handle more load. Instead of making one server bigger (vertical scaling), add more servers (horizontal scaling).

### Challenges in Microservices

**Distributed System Problems:**

When services are on different machines, you face new problems:
- Network failures
- Service unavailability
- Partial failures
- Message ordering

**Network Latency:**

Every service call goes over the network, adding delay. A request that used to take 10ms might now take 100ms.

**Data Consistency:**

With separate databases, maintaining consistency is hard. You might need:
- Saga pattern for distributed transactions
- Eventual consistency (data becomes consistent over time)
- Compensating transactions (undo operations if something fails)

**Distributed Transactions:**

In a monolith, you can use database transactions. In microservices, you can't easily do transactions across services. This is a complex topic, but for now, understand that you'll need patterns like Saga to handle multi-service operations.

---

## 2. Spring Cloud Config Server

### What is Centralized Configuration?

In a microservices architecture, you have many services, each with its own configuration. Managing configuration files for each service separately becomes a nightmare.

**The Problem:**
- 10 services, each with application.properties
- Need to change database URL? Update 10 files
- Different configurations for dev, test, prod environments
- Hard to keep configurations in sync

**The Solution:**
Spring Cloud Config Server provides centralized configuration management. All services get their configuration from one central server.

### Config Server Architecture

\`\`\`
┌─────────────┐
│ Config      │
│ Server      │
│ (Git Repo)  │
└──────┬──────┘
       │
       │ Fetches config
       │
┌──────┴──────┐
│   Service   │
│   A, B, C   │
└─────────────┘
\`\`\`

The Config Server reads configuration from a Git repository (or file system) and serves it to client services.

### Setting Up Config Server

**Step 1: Create Config Server Project**

Create a new Spring Boot project with these dependencies in pom.xml:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
\`\`\`

**Step 2: Enable Config Server**

In your main application class:

\`\`\`java
package com.example.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
\`\`\`

**Step 3: Configure Config Server**

In application.properties:

\`\`\`properties
server.port=8888

spring.application.name=config-server

# Git repository for configuration
spring.cloud.config.server.git.uri=https://github.com/your-username/config-repo.git
spring.cloud.config.server.git.clone-on-start=true
\`\`\`

**Step 4: Create Configuration Repository**

Create a Git repository with configuration files. Structure:

\`\`\`
config-repo/
  ├── user-service.properties
  ├── product-service.properties
  └── order-service.properties
\`\`\`

Example: user-service.properties

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb
spring.datasource.username=root
spring.datasource.password=password
server.port=8081
\`\`\`

### Connecting Client Services

**Step 1: Add Dependency**

In your service's pom.xml:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
\`\`\`

**Step 2: Create bootstrap.properties**

Create bootstrap.properties (not application.properties) in your service:

\`\`\`properties
spring.application.name=user-service
spring.cloud.config.uri=http://localhost:8888
\`\`\`

**Why bootstrap.properties?**

Bootstrap properties are loaded before application.properties. The service needs to know where the Config Server is before it can load its configuration.

**Step 3: Access Configuration**

Your service will automatically fetch configuration from Config Server on startup. Use @Value or @ConfigurationProperties as usual:

\`\`\`java
@RestController
public class UserController {
    
    @Value("\${server.port}")
    private String port;
    
    @GetMapping("/config")
    public String getConfig() {
        return "Service running on port: " + port;
    }
}
\`\`\`

### Advanced Features

**@RefreshScope:**

By default, configuration changes require service restart. @RefreshScope allows refreshing configuration without restart.

\`\`\`java
@RestController
@RefreshScope
public class UserController {
    
    @Value("\${app.message:Hello}")
    private String message;
    
    @GetMapping("/message")
    public String getMessage() {
        return message;
    }
}
\`\`\`

After updating config in Git, call: POST http://localhost:8081/actuator/refresh

**Spring Cloud Bus:**

Spring Cloud Bus propagates configuration changes to all services at once using a message broker (RabbitMQ or Kafka).

**Encrypting Properties:**

Store sensitive data encrypted:

\`\`\`properties
# Encrypted password
spring.datasource.password={cipher}AQA1234567890...
\`\`\`

**Profile-Based Configuration:**

Different configs for different environments:

\`\`\`
config-repo/
  ├── user-service-dev.properties
  ├── user-service-test.properties
  └── user-service-prod.properties
\`\`\`

Set active profile: \`spring.profiles.active=prod\`

---

## 3. Service Discovery (Eureka)

### What is Service Registry?

In a microservices architecture, services need to find each other. But services can be on different machines, have dynamic IPs, and scale up/down.

**The Problem:**
- User Service needs to call Product Service
- Product Service might be on different IPs
- Product Service might have multiple instances
- How does User Service know where Product Service is?

**The Solution:**
Service Discovery. Services register themselves with a registry (Eureka Server). When a service needs to call another, it asks the registry for the address.

### Why Service Discovery is Needed

**Without Service Discovery:**
- Hardcode IP addresses (breaks when services move)
- Use load balancer IPs (adds complexity)
- Manual service location management

**With Service Discovery:**
- Services register themselves
- Services discover each other by name
- Automatic health checking
- Load balancing built-in

### Client-Side vs Server-Side Discovery

**Client-Side Discovery:**
Client (service making the call) queries the registry and chooses an instance. Spring Cloud uses this approach.

**Server-Side Discovery:**
Client calls a load balancer, which queries the registry. Simpler for clients but adds a load balancer component.

### Setting Up Eureka Server

**Step 1: Create Eureka Server Project**

Add dependencies:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

**Step 2: Enable Eureka Server**

\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
\`\`\`

**Step 3: Configure Eureka Server**

\`\`\`properties
server.port=8761

spring.application.name=eureka-server

# Don't register itself as a client
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
\`\`\`

**Step 4: Access Eureka Dashboard**

Start the server and visit: http://localhost:8761

You'll see the Eureka dashboard showing registered services.

### Registering Services

**Step 1: Add Dependency to Your Service**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

**Step 2: Enable Eureka Client**

\`\`\`java
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

**Step 3: Configure Service**

\`\`\`properties
spring.application.name=user-service
server.port=8081

# Eureka server location
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Instance configuration
eureka.instance.hostname=localhost
eureka.instance.prefer-ip-address=true
\`\`\`

Your service will automatically register with Eureka on startup.

### Instance Metadata

You can add custom metadata to service instances:

\`\`\`properties
eureka.instance.metadata-map.zone=us-east-1
eureka.instance.metadata-map.version=1.0.0
\`\`\`

This helps with routing and load balancing decisions.

### Advanced Features

**Heartbeat Mechanism:**

Services send heartbeats to Eureka every 30 seconds (default). If Eureka doesn't receive a heartbeat for 90 seconds, it removes the service.

**Self-Preservation Mode:**

If too many services fail to send heartbeats, Eureka assumes it's a network issue and enters self-preservation mode, keeping all registrations.

**Health Check Configuration:**

Eureka uses Spring Boot Actuator health endpoint:

\`\`\`properties
eureka.client.healthcheck.enabled=true
\`\`\`

**Service Deregistration:**

When a service shuts down gracefully, it deregisters itself. For abrupt shutdowns, Eureka removes it after missing heartbeats.

---

## 4. API Gateway (Spring Cloud Gateway)

### Why API Gateway is Needed

In microservices, clients need to call multiple services. Without a gateway:
- Client needs to know all service addresses
- Client handles authentication for each service
- Client handles rate limiting, logging, etc. for each service
- CORS issues when calling from browser

**The Solution:**
API Gateway acts as a single entry point. Clients call the gateway, which routes requests to appropriate services.

### Gateway vs Load Balancer

**Load Balancer:**
Distributes requests across multiple instances of the same service.

**API Gateway:**
Routes requests to different services, handles cross-cutting concerns (auth, logging, rate limiting), and can aggregate responses.

### Single Entry Point Architecture

\`\`\`
Client → API Gateway → Service A
                    → Service B
                    → Service C
\`\`\`

All requests go through the gateway.

### Setting Up Spring Cloud Gateway

**Step 1: Add Dependencies**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

**Step 2: Configure Routes**

\`\`\`properties
spring.application.name=api-gateway
server.port=8080

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Gateway Routes
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://user-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

spring.cloud.gateway.routes[1].id=product-service
spring.cloud.gateway.routes[1].uri=lb://product-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/products/**
\`\`\`

**lb://** means load-balanced service discovery. Gateway will find user-service from Eureka.

### Route Predicates

Predicates determine which requests match a route.

**Path-Based Routing:**

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**
\`\`\`

Matches any path starting with /api/users/

**Method-Based Routing:**

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Method=GET,POST
\`\`\`

Matches GET and POST requests.

**Header-Based Routing:**

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Header=X-Request-Id, \\d+
\`\`\`

Matches requests with X-Request-Id header containing digits.

**Query Parameter Routing:**

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Query=version, v1
\`\`\`

Matches requests with ?version=v1

### Path Rewriting

Rewrite paths before forwarding:

\`\`\`properties
spring.cloud.gateway.routes[0].filters[0]=RewritePath=/api/users/(?<segment>.*), /$\\{segment}
\`\`\`

Request: /api/users/123 → Forwarded to service as: /123

### Filters

**Global Filters:**

Apply to all routes:

\`\`\`java
@Component
public class LoggingFilter implements GlobalFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        System.out.println("Request: " + request.getMethod() + " " + request.getURI());
        return chain.filter(exchange);
    }
    
    @Override
    public int getOrder() {
        return -1;
    }
}
\`\`\`

**Custom Filters:**

\`\`\`java
@Component
public class AuthenticationFilter implements GatewayFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
        
        return chain.filter(exchange);
    }
    
    @Override
    public int getOrder() {
        return 0;
    }
}
\`\`\`

**Rate Limiting:**

\`\`\`xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>7.6.0</version>
</dependency>
\`\`\`

**CORS Handling:**

\`\`\`java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsWebFilter(source);
    }
}
\`\`\`

---

## 5. Load Balancing

### Client-Side Load Balancing

In client-side load balancing, the client (service making the call) chooses which instance to call. Spring Cloud LoadBalancer provides this.

### Spring Cloud LoadBalancer

**Add Dependency:**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
\`\`\`

**Using RestTemplate:**

\`\`\`java
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
    return new RestTemplate();
}

@Service
public class UserService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Product getProduct(Long id) {
        // LoadBalancer automatically chooses an instance
        return restTemplate.getForObject(
            "http://product-service/api/products/" + id, 
            Product.class
        );
    }
}
\`\`\`

**Using WebClient:**

\`\`\`java
@Bean
@LoadBalanced
public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
}

@Service
public class UserService {
    
    @Autowired
    private WebClient.Builder webClientBuilder;
    
    public Mono<Product> getProduct(Long id) {
        return webClientBuilder.build()
            .get()
            .uri("http://product-service/api/products/" + id)
            .retrieve()
            .bodyToMono(Product.class);
    }
}
\`\`\`

### Difference Between Ribbon and LoadBalancer

**Ribbon (Deprecated):**
- Older library
- Netflix Ribbon
- Being phased out

**LoadBalancer (Current):**
- Spring Cloud's own implementation
- Actively maintained
- Simpler API

### Load Balancing Strategies

**Round Robin (Default):**
Distributes requests evenly across instances: 1, 2, 3, 1, 2, 3...

**Custom Strategy:**

\`\`\`java
@Configuration
public class LoadBalancerConfig {
    
    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}
\`\`\`

### Load Balancing with Eureka

When using Eureka, LoadBalancer automatically discovers service instances:

\`\`\`properties
spring.cloud.loadbalancer.ribbon.enabled=false
\`\`\`

### Load Balancing without Eureka

You can configure instances manually:

\`\`\`properties
product-service.ribbon.listOfServers=http://localhost:8082,http://localhost:8083
\`\`\`

---

## 6. Inter-Service Communication (OpenFeign)

### What is Declarative REST Client?

Instead of writing RestTemplate or WebClient code, Feign lets you define REST clients as interfaces. Spring Cloud generates the implementation.

### Feign vs RestTemplate vs WebClient

**RestTemplate:**
- Synchronous
- Blocking
- Simple but limited

**WebClient:**
- Asynchronous
- Non-blocking
- Reactive programming
- More complex

**Feign:**
- Declarative
- Simple interface definition
- Synchronous by default
- Easy to use

### Creating Feign Client Interface

**Step 1: Add Dependency**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
\`\`\`

**Step 2: Enable Feign Clients**

\`\`\`java
@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
\`\`\`

**Step 3: Create Feign Client Interface**

\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
    
    @PostMapping("/api/products")
    Product createProduct(@RequestBody Product product);
    
    @GetMapping("/api/products")
    List<Product> getAllProducts();
}
\`\`\`

**Step 4: Use the Client**

\`\`\`java
@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    public Order createOrder(OrderRequest request) {
        // Call product service using Feign
        Product product = productClient.getProduct(request.getProductId());
        
        // Create order logic
        Order order = new Order();
        order.setProductId(product.getId());
        order.setPrice(product.getPrice());
        // ...
        
        return order;
    }
}
\`\`\`

### Service Name Resolution with Eureka

Feign automatically uses Eureka for service discovery. The \`name = "product-service"\` in @FeignClient is the service name registered in Eureka.

### Request & Response Mapping

**Request Headers:**

\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    
    @GetMapping("/api/products/{id}")
    Product getProduct(
        @PathVariable Long id,
        @RequestHeader("Authorization") String token
    );
}
\`\`\`

**Request Parameters:**

\`\`\`java
@GetMapping("/api/products")
List<Product> searchProducts(@RequestParam String category);
\`\`\`

**Request Body:**

\`\`\`java
@PostMapping("/api/products")
Product createProduct(@RequestBody Product product);
\`\`\`

### Advanced Features

**Feign Timeout Configuration:**

\`\`\`properties
feign.client.config.default.connectTimeout=5000
feign.client.config.default.readTimeout=10000
\`\`\`

**Feign Logging Levels:**

\`\`\`java
@Configuration
public class FeignConfig {
    
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
\`\`\`

Set logging level in application.properties:

\`\`\`properties
logging.level.com.example.client.ProductClient=DEBUG
\`\`\`

**Custom Error Decoder:**

\`\`\`java
public class CustomErrorDecoder implements ErrorDecoder {
    
    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 404) {
            return new ProductNotFoundException("Product not found");
        }
        return new Default().decode(methodKey, response);
    }
}
\`\`\`

**Feign with Resilience4j:**

See the next section for integrating Feign with Resilience4j for circuit breaking and retry.

---

## 7. Fault Tolerance (Resilience4j)

### Core Patterns

**Circuit Breaker:**

Like an electrical circuit breaker. If a service is failing, "open" the circuit to stop calling it. After some time, try again (half-open state). If it works, close the circuit.

**Retry:**

Automatically retry failed requests. Useful for transient failures.

**Rate Limiter:**

Limit the number of calls per time period. Prevents overwhelming a service.

**Bulkhead:**

Isolate resources. Like ship bulkheads prevent water from flooding the entire ship, bulkheads isolate failures.

**TimeLimiter:**

Set maximum time for an operation. If it takes longer, fail fast.

### Configuring Circuit Breaker

**Step 1: Add Dependencies**

\`\`\`xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot2</artifactId>
    <version>1.7.1</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
\`\`\`

**Step 2: Configure Circuit Breaker**

\`\`\`properties
resilience4j.circuitbreaker.instances.productService.failureRateThreshold=50
resilience4j.circuitbreaker.instances.productService.waitDurationInOpenState=10000
resilience4j.circuitbreaker.instances.productService.slidingWindowSize=10
resilience4j.circuitbreaker.instances.productService.minimumNumberOfCalls=5
\`\`\`

**Step 3: Use Circuit Breaker**

\`\`\`java
@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductFallback(Long id, Exception e) {
        // Fallback logic when circuit is open
        Product product = new Product();
        product.setId(id);
        product.setName("Product temporarily unavailable");
        return product;
    }
}
\`\`\`

### Retry Configuration

\`\`\`properties
resilience4j.retry.instances.productService.maxAttempts=3
resilience4j.retry.instances.productService.waitDuration=1000
\`\`\`

\`\`\`java
@Retry(name = "productService")
public Product getProduct(Long id) {
    return productClient.getProduct(id);
}
\`\`\`

### Rate Limiter

\`\`\`properties
resilience4j.ratelimiter.instances.productService.limitForPeriod=10
resilience4j.ratelimiter.instances.productService.limitRefreshPeriod=60s
\`\`\`

\`\`\`java
@RateLimiter(name = "productService")
public Product getProduct(Long id) {
    return productClient.getProduct(id);
}
\`\`\`

### Monitoring Circuit Breaker States

\`\`\`java
@Autowired
private CircuitBreakerRegistry circuitBreakerRegistry;

public void checkCircuitBreakerState() {
    CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker("productService");
    CircuitBreaker.State state = circuitBreaker.getState();
    System.out.println("Circuit Breaker State: " + state);
}
\`\`\`

States: CLOSED (normal), OPEN (failing), HALF_OPEN (testing)

### Combining Retry + Circuit Breaker

\`\`\`java
@CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
@Retry(name = "productService")
public Product getProduct(Long id) {
    return productClient.getProduct(id);
}
\`\`\`

Retry will attempt 3 times. If all fail, circuit breaker opens.

### Handling Cascading Failures

Cascading failures happen when one service failure causes others to fail. Circuit breakers prevent this by stopping calls to failing services.

---

## 8. Distributed Tracing (Sleuth + Zipkin)

### What is Distributed Tracing?

In microservices, a single request might go through multiple services. Distributed tracing helps you see the complete path of a request across all services.

**Example Request Flow:**
1. Client → API Gateway
2. API Gateway → User Service
3. User Service → Product Service
4. Product Service → Database

Distributed tracing shows you this entire flow with timing information.

### Trace ID and Span ID

**Trace ID:**
Unique identifier for the entire request journey. Same across all services for one request.

**Span ID:**
Unique identifier for each operation within a trace. Each service call creates a span.

**Example:**
- Trace ID: abc123
  - Span 1: API Gateway receives request
  - Span 2: User Service processes request
  - Span 3: Product Service called
  - Span 4: Database query

### Correlation ID

Correlation ID is another term for Trace ID. It correlates all logs and spans for one request.

### Integrating Sleuth

**Step 1: Add Dependency**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
\`\`\`

Sleuth automatically adds trace and span IDs to logs.

**Step 2: View Traces in Logs**

Your logs will now include trace information:

\`\`\`
2024-01-15 10:30:45.123 [user-service,abc123,def456] INFO - Processing request
\`\`\`

Format: [service-name,trace-id,span-id]

### Setting Up Zipkin

**Step 1: Run Zipkin Server**

Using Docker:

\`\`\`bash
docker run -d -p 9411:9411 openzipkin/zipkin
\`\`\`

Or download and run Zipkin JAR.

**Step 2: Add Zipkin Dependency**

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>
\`\`\`

**Step 3: Configure Zipkin**

\`\`\`properties
spring.zipkin.base-url=http://localhost:9411
spring.sleuth.sampler.probability=1.0
\`\`\`

**Step 4: View Traces**

Visit: http://localhost:9411

You'll see a UI where you can:
- Search for traces
- View trace timeline
- See service dependencies
- Analyze performance

### Log Correlation

All logs for the same request will have the same trace ID. You can filter logs by trace ID to see the complete request flow.

### Performance Bottleneck Analysis

Zipkin shows timing for each span. You can identify which service is slow:

- API Gateway: 10ms
- User Service: 50ms
- Product Service: 2000ms ← Bottleneck!
- Database: 100ms

### Observability Basics

Observability = Monitoring + Logging + Tracing

- **Monitoring:** Metrics (CPU, memory, request rate)
- **Logging:** Event logs
- **Tracing:** Request flow across services

Together, they give you complete visibility into your system.

---

## 9. Security (JWT, OAuth2)

### Stateless Authentication

In microservices, you can't use session-based authentication (stateless services). JWT (JSON Web Token) provides stateless authentication.

### JWT Structure

JWT has three parts separated by dots:

\`\`\`
header.payload.signature
\`\`\`

**Header:**
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

**Payload:**
\`\`\`json
{
  "sub": "user123",
  "name": "Dattu p",
  "roles": ["USER", "ADMIN"],
  "exp": 1642234567
}
\`\`\`

**Signature:**
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

### OAuth2 Fundamentals

OAuth2 is an authorization framework. Key concepts:

- **Resource Owner:** The user
- **Client:** Application requesting access
- **Authorization Server:** Issues tokens
- **Resource Server:** Protected resources

**Flow:**
1. User logs in
2. Authorization server issues access token
3. Client uses token to access resources
4. Resource server validates token

### JWT Authentication in Microservices

**Step 1: Add Dependencies**

\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
\`\`\`

**Step 2: Create JWT Service**

\`\`\`java
@Service
public class JwtService {
    
    private String secret = "your-secret-key-should-be-long-and-secure";
    private long expiration = 86400000; // 24 hours
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}
\`\`\`

**Step 3: Create JWT Filter**

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        
        if (token != null && jwtService.validateToken(token, 
            userDetailsService.loadUserByUsername(jwtService.extractUsername(token)))) {
            // Token is valid, set authentication
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    userDetailsService.loadUserByUsername(jwtService.extractUsername(token)),
                    null,
                    null
                );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
\`\`\`

### Securing API Gateway

Add JWT validation filter to API Gateway:

\`\`\`java
@Component
public class GatewayAuthFilter implements GatewayFilter, Ordered {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String token = extractToken(request);
        
        if (token == null || !jwtService.validateToken(token)) {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
        
        // Add user info to headers for downstream services
        String username = jwtService.extractUsername(token);
        ServerHttpRequest modifiedRequest = request.mutate()
            .header("X-User-Id", username)
            .build();
        
        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }
    
    private String extractToken(ServerHttpRequest request) {
        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    
    @Override
    public int getOrder() {
        return -100;
    }
}
\`\`\`

### Role-Based Authorization

\`\`\`java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userService.getAllUsers();
}

@PreAuthorize("hasRole('USER')")
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.getUser(id);
}
\`\`\`

### Token Validation Across Services

Each service validates the JWT token independently. No need to call an authentication service for every request.

**Shared Secret:**
All services use the same secret to validate tokens. Store it in Config Server.

**Public Key (Better):**
Use asymmetric encryption (RS256). Authorization server signs with private key, services validate with public key.

### Refresh Tokens

Access tokens expire quickly (15 minutes). Refresh tokens last longer (7 days). Use refresh token to get new access token:

\`\`\`java
@PostMapping("/auth/refresh")
public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
    String refreshToken = request.getRefreshToken();
    
    if (isValidRefreshToken(refreshToken)) {
        String username = extractUsernameFromRefreshToken(refreshToken);
        String newAccessToken = jwtService.generateToken(
            userDetailsService.loadUserByUsername(username)
        );
        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken));
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
\`\`\`

### Keycloak Integration (Optional Advanced Topic)

Keycloak is an open-source identity and access management solution. It provides:
- User management
- OAuth2/OIDC server
- Social login
- Multi-factor authentication

---

## 10. Centralized Logging (ELK)

### Why Centralized Logging is Needed

In microservices, logs are scattered across multiple services. Finding logs for a specific request is difficult.

**The Problem:**
- 10 services, each with its own log files
- Need to check 10 different places for one request
- No correlation between logs
- Hard to debug issues

**The Solution:**
Centralized logging. All services send logs to one place (Elasticsearch). You can search, filter, and analyze all logs together.

### Logs in Distributed Systems

**Challenges:**
- Logs from multiple services
- Different log formats
- High volume of logs
- Need to correlate logs by trace ID

**Solution:**
- Structured logging (JSON format)
- Include trace ID in all logs
- Send logs to central location
- Use ELK stack for analysis

### Structured Logging

Instead of plain text logs:

\`\`\`
2024-01-15 10:30:45 INFO UserService - User created: 123
\`\`\`

Use structured JSON logs:

\`\`\`json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "level": "INFO",
  "service": "user-service",
  "traceId": "abc123",
  "spanId": "def456",
  "message": "User created",
  "userId": 123
}
\`\`\`

**Benefits:**
- Easy to parse
- Can filter by any field
- Better for analysis

### ELK Stack

**Elasticsearch:**
Search and analytics engine. Stores and indexes logs.

**Logstash:**
Data processing pipeline. Collects, transforms, and sends logs to Elasticsearch.

**Kibana:**
Visualization tool. Creates dashboards and visualizations from Elasticsearch data.

### Elasticsearch Basics

Elasticsearch stores data in indices (like databases). Each log entry is a document.

**Index:**
Collection of documents. Example: \`logs-2024-01-15\`

**Document:**
Single log entry. JSON object.

**Mapping:**
Schema definition. Defines fields and their types.

### Logstash Pipeline

**Input:**
Where logs come from (file, TCP, HTTP, etc.)

**Filter:**
Transform logs (parse, add fields, etc.)

**Output:**
Where to send logs (Elasticsearch)

**Example Logstash Config:**

\`\`\`
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [service] == "user-service" {
    mutate {
      add_field => { "environment" => "production" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

### Sending Logs from Spring Boot

**Step 1: Add Dependency**

\`\`\`xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
\`\`\`

**Step 2: Configure Logback**

\`\`\`xml
<configuration>
    <appender name="STASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp/>
                <version/>
                <logLevel/>
                <message/>
                <mdc/>
                <stackTrace/>
            </providers>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STASH" />
    </root>
</configuration>
\`\`\`

### Kibana Dashboards

**Creating Dashboards:**

1. Go to Kibana: http://localhost:5601
2. Create index pattern: \`logs-*\`
3. Create visualizations:
   - Line chart: Errors over time
   - Pie chart: Errors by service
   - Table: Top error messages
4. Add visualizations to dashboard

### Correlating Logs with Trace IDs

In Kibana, search by trace ID:

\`\`\`
traceId:abc123
\`\`\`

You'll see all logs for that request across all services.

### Log Indexing Strategies

**Daily Indices:**
\`logs-2024-01-15\`, \`logs-2024-01-16\`

**Benefits:**
- Easy to delete old logs
- Better performance
- Easier management

### Log Retention Policies

Delete old logs to save space:

\`\`\`
# Delete logs older than 30 days
DELETE /logs-*/_query
{
  "query": {
    "range": {
      "@timestamp": {
        "lt": "now-30d"
      }
    }
  }
}
\`\`\`

---

## Summary

Building microservices with Spring Cloud involves:

1. **Architecture:** Understanding when and how to split into microservices
2. **Configuration:** Centralized config with Config Server
3. **Discovery:** Service discovery with Eureka
4. **Gateway:** Single entry point with API Gateway
5. **Communication:** Inter-service calls with Feign
6. **Resilience:** Fault tolerance with Resilience4j
7. **Observability:** Distributed tracing with Sleuth/Zipkin
8. **Security:** JWT authentication across services
9. **Logging:** Centralized logging with ELK

Each component solves a specific problem in microservices architecture. Start simple, add components as you need them.

**What's Next?**

- Practice building a complete microservices application
- Learn [Spring Boot](/tutorial/spring-boot-introduction) fundamentals
- Master [Spring Boot REST API](/tutorial/spring-boot-rest-api) for service endpoints
- Understand [Spring Boot JPA](/tutorial/spring-boot-jpa) for database operations
`,
  code: `// Example: Microservices Service with Eureka, Feign, and Circuit Breaker
package com.example.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

// Feign Client
package com.example.orderservice.client;

import com.example.orderservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
}

// Service with Circuit Breaker
package com.example.orderservice.service;

import com.example.orderservice.client.ProductClient;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.Product;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    public Order createOrder(Long productId, Integer quantity) {
        Product product = productClient.getProduct(productId);
        
        Order order = new Order();
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setTotalPrice(product.getPrice() * quantity);
        
        return order;
    }
    
    public Order getProductFallback(Long productId, Integer quantity, Exception e) {
        Order order = new Order();
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setTotalPrice(0.0);
        order.setStatus("PENDING - Product service unavailable");
        return order;
    }
}`
};

export default springCloudMicroservices;

