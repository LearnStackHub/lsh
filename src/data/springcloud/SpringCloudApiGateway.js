const springCloudApiGateway = {
  id: 'spring-cloud-api-gateway',
  title: 'API Gateway with Spring Cloud Gateway',
  description: 'Learn how to set up Spring Cloud Gateway as API Gateway - routing, filters, authentication, rate limiting, and CORS handling',
  content: `
# API Gateway with Spring Cloud Gateway

In microservices, clients need to call multiple services. Without a gateway, clients need to know all service addresses, handle authentication for each service, and deal with CORS issues.

Let me explain what an API Gateway is and how to use Spring Cloud Gateway.

---

## Why API Gateway is Needed

**The Problem:**

Imagine you have a frontend application (React, Angular, etc.) that needs to call:
- User Service: http://localhost:8081
- Product Service: http://localhost:8082
- Order Service: http://localhost:8083
- Payment Service: http://localhost:8084

**Issues:**
1. Frontend needs to know all service addresses
2. Frontend needs to handle authentication for each service
3. CORS issues when calling from browser
4. Frontend needs to handle rate limiting, logging, etc. for each service
5. If a service moves, frontend code breaks

**The Solution:**

API Gateway acts as a single entry point. Clients call the gateway, which routes requests to appropriate services.

**Benefits:**
- Single entry point for all clients
- Centralized authentication
- Centralized logging
- Centralized rate limiting
- CORS handling
- Service abstraction (clients don't know service addresses)

---

## Gateway vs Load Balancer

These are different things, though they can work together.

**Load Balancer:**
- Distributes requests across multiple instances of the same service
- Example: 3 instances of Product Service, load balancer distributes requests

**API Gateway:**
- Routes requests to different services
- Handles cross-cutting concerns (auth, logging, rate limiting)
- Can aggregate responses from multiple services
- Single entry point for all services

**They Work Together:**
- API Gateway routes to services
- Load Balancer distributes across instances of each service

---

## Single Entry Point Architecture

Here's how it works:

\`\`\`
Client (Browser/Mobile)
    │
    │ All requests go here
    │
    ▼
┌─────────────┐
│ API Gateway │
│  (Port 8080)│
└──────┬──────┘
       │
       │ Routes based on path
       │
   ┌───┴───┬─────────┬──────────┐
   │       │         │          │
   ▼       ▼         ▼          ▼
User    Product   Order    Payment
Service Service  Service  Service
\`\`\`

All requests from clients go through the gateway. The gateway routes them to the appropriate service.

---

## Setting Up Spring Cloud Gateway

Let's create an API Gateway step by step.

### Step 1: Create Gateway Project

Create a new Spring Boot project. Add these dependencies in pom.xml:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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

**Important:** Don't include spring-boot-starter-web. Gateway uses reactive Netty server, not servlet container.

### Step 2: Configure Routes

In application.properties:

\`\`\`properties
spring.application.name=api-gateway
server.port=8080

# Eureka for service discovery
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Gateway Routes
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://user-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

spring.cloud.gateway.routes[1].id=product-service
spring.cloud.gateway.routes[1].uri=lb://product-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/products/**

spring.cloud.gateway.routes[2].id=order-service
spring.cloud.gateway.routes[2].uri=lb://order-service
spring.cloud.gateway.routes[2].predicates[0]=Path=/api/orders/**
\`\`\`

**Explanation:**
- lb://user-service: Load-balanced service discovery. Gateway finds user-service from Eureka
- Path=/api/users/**: Matches any path starting with /api/users/

### Step 3: Start Gateway

That's it! Your gateway is ready. Start it and test:

- Client calls: http://localhost:8080/api/users/123
- Gateway routes to: http://user-service/api/users/123
- Gateway returns response to client

---

## Route Predicates

Predicates determine which requests match a route. Think of them as conditions.

### Path-Based Routing

Most common type. Routes based on URL path.

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**
\`\`\`

Matches any path starting with /api/users/

**Examples:**
- /api/users/123 → Matches
- /api/users/123/profile → Matches
- /api/products/123 → Doesn't match

### Method-Based Routing

Route based on HTTP method.

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Method=GET,POST
\`\`\`

Matches GET and POST requests only.

**Examples:**
- GET /api/users/123 → Matches
- POST /api/users → Matches
- PUT /api/users/123 → Doesn't match

### Header-Based Routing

Route based on request headers.

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Header=X-Request-Id, \\d+
\`\`\`

Matches requests with X-Request-Id header containing digits.

**Examples:**
- Header: X-Request-Id: 12345 → Matches
- Header: X-Request-Id: abc → Doesn't match
- No X-Request-Id header → Doesn't match

### Query Parameter Routing

Route based on query parameters.

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Query=version, v1
\`\`\`

Matches requests with ?version=v1

**Examples:**
- /api/users?version=v1 → Matches
- /api/users?version=v2 → Doesn't match
- /api/users → Doesn't match

### Combining Predicates

You can combine multiple predicates. All must match.

\`\`\`properties
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**
spring.cloud.gateway.routes[0].predicates[1]=Method=GET
spring.cloud.gateway.routes[0].predicates[2]=Header=X-API-Key, valid-key
\`\`\`

Matches: GET requests to /api/users/** with X-API-Key header = "valid-key"

---

## Path Rewriting

Sometimes you want to change the path before forwarding to the service.

### Why Rewrite Paths?

**Example:**
- Client calls: /api/users/123
- But User Service expects: /users/123

You can rewrite the path.

### Rewrite Path Filter

\`\`\`properties
spring.cloud.gateway.routes[0].filters[0]=RewritePath=/api/users/(?<segment>.*), /$\\{segment}
\`\`\`

**Explanation:**
- /api/users/(?<segment>.*): Captures everything after /api/users/
- /$\\{segment}: Replaces with /segment

**Example:**
- Request: /api/users/123
- Rewritten to: /123
- Forwarded to service as: /123

### Remove Prefix

\`\`\`properties
spring.cloud.gateway.routes[0].filters[0]=StripPrefix=2
\`\`\`

Removes first 2 path segments.

**Example:**
- Request: /api/v1/users/123
- After StripPrefix=2: /users/123

---

## Filters

Filters modify requests and responses. You can add custom logic.

### Global Filters

Apply to all routes automatically.

**Example: Logging Filter**

\`\`\`java
package com.example.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        System.out.println("Request: " + request.getMethod() + " " + request.getURI());
        System.out.println("Headers: " + request.getHeaders());
        return chain.filter(exchange);
    }
    
    @Override
    public int getOrder() {
        return -1; // Lower number = higher priority
    }
}
\`\`\`

This filter logs all requests passing through the gateway.

### Custom Authentication Filter

\`\`\`java
package com.example.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    
    public AuthenticationFilter() {
        super(Config.class);
    }
    
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String authHeader = request.getHeaders().getFirst("Authorization");
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
            
            // Extract token
            String token = authHeader.substring(7);
            
            // Validate token (simplified - in real app, validate JWT)
            if (!isValidToken(token)) {
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
            
            // Add user info to headers for downstream services
            ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-Id", extractUserId(token))
                .build();
            
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }
    
    private boolean isValidToken(String token) {
        // In real app, validate JWT token
        return token != null && !token.isEmpty();
    }
    
    private String extractUserId(String token) {
        // In real app, extract from JWT
        return "user123";
    }
    
    public static class Config {
        // Configuration properties if needed
    }
}
\`\`\`

**Using the Filter:**

\`\`\`properties
spring.cloud.gateway.routes[0].filters[0]=AuthenticationFilter
\`\`\`

### Rate Limiting Filter

Limit the number of requests per time period.

**Add Dependency:**

\`\`\`xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>7.6.0</version>
</dependency>
\`\`\`

**Create Rate Limiter Filter:**

\`\`\`java
@Component
public class RateLimitingFilter implements GlobalFilter {
    
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String clientId = getClientId(request);
        
        Bucket bucket = buckets.computeIfAbsent(clientId, this::createBucket);
        
        if (bucket.tryConsume(1)) {
            return chain.filter(exchange);
        } else {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            return response.setComplete();
        }
    }
    
    private Bucket createBucket(String clientId) {
        return Bucket4j.builder()
            .addLimit(Bandwidth.classic(10, Refill.intervally(10, Duration.ofMinutes(1))))
            .build();
    }
    
    private String getClientId(ServerHttpRequest request) {
        return request.getRemoteAddress() != null 
            ? request.getRemoteAddress().getAddress().toString() 
            : "unknown";
    }
}
\`\`\`

This limits each client to 10 requests per minute.

### CORS Handling

Handle Cross-Origin Resource Sharing for browser clients.

**Configuration:**

\`\`\`java
package com.example.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // Your frontend URL
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsWebFilter(source);
    }
}
\`\`\`

This allows requests from http://localhost:3000 (your frontend).

---

## Real-World Example

Let's see a complete gateway configuration.

**application.properties:**

\`\`\`properties
spring.application.name=api-gateway
server.port=8080

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# User Service Route
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://user-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

# Product Service Route
spring.cloud.gateway.routes[1].id=product-service
spring.cloud.gateway.routes[1].uri=lb://product-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/products/**

# Order Service Route (with path rewrite)
spring.cloud.gateway.routes[2].id=order-service
spring.cloud.gateway.routes[2].uri=lb://order-service
spring.cloud.gateway.routes[2].predicates[0]=Path=/api/orders/**
spring.cloud.gateway.routes[2].filters[0]=RewritePath=/api/orders/(?<segment>.*), /orders/$\\{segment}
\`\`\`

**How It Works:**

1. Client calls: http://localhost:8080/api/users/123
2. Gateway matches user-service route
3. Gateway finds user-service from Eureka
4. Gateway forwards to: http://user-service/api/users/123
5. Gateway returns response to client

---

## Common Issues and Solutions

### Issue 1: Gateway Not Routing

**Symptoms:** Requests return 404

**Solutions:**
- Check route predicates match your requests
- Verify services are registered in Eureka
- Check service names match
- Verify lb:// prefix is used for service discovery

### Issue 2: CORS Errors

**Symptoms:** Browser shows CORS errors

**Solutions:**
- Add CORS configuration
- Check allowed origins
- Verify credentials setting

### Issue 3: Filters Not Working

**Symptoms:** Filters don't execute

**Solutions:**
- Check filter order
- Verify filter is registered as @Component
- Check filter implements correct interface

---

## Best Practices

### 1. Use Service Discovery

Always use lb:// prefix with Eureka service names. Don't hardcode URLs.

### 2. Centralize Authentication

Handle authentication in gateway, not in each service.

### 3. Log All Requests

Add logging filter to track all requests for debugging and monitoring.

### 4. Rate Limit Aggressively

Protect your services from abuse with rate limiting.

### 5. Use Path Rewriting

Keep service URLs clean. Rewrite paths in gateway if needed.

---

## Summary

Spring Cloud Gateway provides API Gateway functionality:

**Key Features:**
- Single entry point for all clients
- Route requests to services
- Apply filters (auth, logging, rate limiting)
- Handle CORS
- Path rewriting

**Benefits:**
- Clients don't need to know service addresses
- Centralized cross-cutting concerns
- Better security
- Easier to manage

**What's Next?**

Now that you understand API Gateway:

1. Learn [Load Balancing](/tutorial/spring-cloud-load-balancing) for distributing requests
2. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for inter-service communication
3. Master [Resilience4j](/tutorial/spring-cloud-resilience4j) for fault tolerance
4. Set up [Service Discovery](/tutorial/spring-cloud-eureka) to find services
`,
  code: `// API Gateway Configuration
package com.example.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}

// Global Logging Filter
package com.example.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

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

// Authentication Filter
package com.example.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {
    
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
}`
};

export default springCloudApiGateway;






