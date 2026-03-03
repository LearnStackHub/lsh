const microservicesApis = {
  id: 'microservices-apis',
  title: 'Microservices & APIs - API Gateway, Service Communication',
  description: 'Learn microservices and APIs: API Gateway, service-to-service communication, load balancing, circuit breaker pattern, and microservices architecture',
  content: `
# Microservices & APIs — Complete Guide

Microservices architecture uses APIs for service communication. Understanding API Gateway, service-to-service communication, and microservices patterns is essential for building scalable systems.

---

## What are Microservices?

**Microservices** are small, independent services that work together.

**Characteristics:**
- Independent deployment
- Technology diversity
- Service boundaries
- API communication

**Monolith vs Microservices:**
\`\`\`
Monolith: One large application
Microservices: Many small services
\`\`\`

---

## API Gateway

### What is API Gateway?

**Single entry point** for all client requests

**Functions:**
- Routing
- Authentication
- Rate limiting
- Load balancing
- Request/response transformation

**Benefits:**
- Single entry point
- Centralized security
- Request routing
- Protocol translation

### API Gateway Pattern

\`\`\`
Client → API Gateway → Microservices
\`\`\`

**Example:**
\`\`\`
GET /api/users → Gateway → User Service
GET /api/products → Gateway → Product Service
GET /api/orders → Gateway → Order Service
\`\`\`

---

## Service Communication

### 1. Synchronous (HTTP/REST)

**Request-response** pattern

**Example:**
\`\`\`
User Service → HTTP → Order Service
\`\`\`

**Pros:**
- Simple
- Request-response
- Easy to debug

**Cons:**
- Coupling
- Latency
- Failure propagation

### 2. Asynchronous (Message Queue)

**Event-driven** pattern

**Example:**
\`\`\`
User Service → Message Queue → Order Service
\`\`\`

**Pros:**
- Decoupling
- Scalability
- Resilience

**Cons:**
- Complexity
- Eventual consistency
- Debugging

---

## Patterns

### 1. Circuit Breaker

**Prevent cascade failures**

**States:**
- Closed: Normal operation
- Open: Failing, reject requests
- Half-Open: Testing recovery

### 2. Load Balancing

**Distribute requests**

**Strategies:**
- Round robin
- Least connections
- Weighted

### 3. Service Discovery

**Find services dynamically**

**Methods:**
- Client-side discovery
- Server-side discovery

---

## Summary

Microservices and APIs:

- **Architecture**: Small, independent services
- **Gateway**: Single entry point
- **Communication**: HTTP/REST, message queues
- **Patterns**: Circuit breaker, load balancing, service discovery

**Important points:**
- Use API Gateway
- Implement circuit breaker
- Load balance requests
- Service discovery
- Monitor services

Microservices enable:
- Scalability
- Technology diversity
- Independent deployment
- Fault isolation
- Team autonomy

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between monolith and microservices?

**Monolith**: One large application. **Microservices**: Many small, independent services communicating via APIs.

### 2. What is an API Gateway?

**API Gateway** is single entry point that routes requests to appropriate microservices, handles authentication, rate limiting, etc.

### 3. How do microservices communicate?

**Synchronously** via HTTP/REST or **asynchronously** via message queues. Choose based on requirements.

### 4. What is a circuit breaker?

**Circuit breaker** prevents cascade failures by stopping requests to failing services and allowing recovery.

### 5. Do I need microservices?

**Not always**. Start with monolith, split to microservices when needed (scale, team size, complexity).

### 6. How do I handle data consistency?

**Options**: Distributed transactions (complex), eventual consistency (common), saga pattern.

### 7. What is service discovery?

**Service discovery** allows services to find each other dynamically without hardcoded addresses.

### 8. How do I test microservices?

**Test**: Individual services (unit), service integration, end-to-end, contract testing.

### 9. What are the challenges of microservices?

**Challenges**: Complexity, distributed systems, data consistency, network latency, monitoring, deployment.

### 10. When should I use microservices?

**Use when**: Large team, need to scale, different technologies, independent deployment, fault isolation needed.
  `,
  code: `// Microservices & APIs - Complete Examples

// Example 1: API Gateway Routing
@RestController
public class ApiGateway {
    @Autowired
    private UserServiceClient userService;
    @Autowired
    private ProductServiceClient productService;
    
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getUsers() {
        return userService.getUsers();
    }
    
    @GetMapping("/api/products")
    public ResponseEntity<List<Product>> getProducts() {
        return productService.getProducts();
    }
}

// Example 2: Circuit Breaker
@Component
public class CircuitBreaker {
    private CircuitState state = CircuitState.CLOSED;
    private int failureCount = 0;
    private static final int THRESHOLD = 5;
    
    public boolean allowRequest() {
        if (state == CircuitState.OPEN) {
            return false;
        }
        return true;
    }
    
    public void recordSuccess() {
        failureCount = 0;
        state = CircuitState.CLOSED;
    }
    
    public void recordFailure() {
        failureCount++;
        if (failureCount >= THRESHOLD) {
            state = CircuitState.OPEN;
        }
    }
}

// Example 3: Service Discovery
@Service
public class ServiceDiscovery {
    public String getServiceUrl(String serviceName) {
        // Query service registry
        return serviceRegistry.find(serviceName);
    }
}`
};

export default microservicesApis;

