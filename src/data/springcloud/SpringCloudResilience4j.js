const springCloudResilience4j = {
  id: 'spring-cloud-resilience4j',
  title: 'Fault Tolerance with Resilience4j',
  description: 'Learn how to implement fault tolerance patterns with Resilience4j - Circuit Breaker, Retry, Rate Limiter, Bulkhead, and TimeLimiter',
  content: `
# Fault Tolerance with Resilience4j

In microservices, services can fail. Network issues, service overload, bugs - failures happen. Resilience4j helps you handle these failures gracefully.

Let me explain the fault tolerance patterns and how to implement them with Resilience4j.

---

## What is Fault Tolerance?

Fault tolerance is the ability of a system to continue operating even when some components fail.

**The Problem:**

Service A calls Service B. If Service B is down:
- Service A waits (timeout)
- Service A might fail too
- Cascading failures can bring down entire system

**The Solution:**

Use fault tolerance patterns:
- Circuit Breaker: Stop calling failing services
- Retry: Try again for transient failures
- Rate Limiter: Prevent overwhelming services
- Bulkhead: Isolate failures
- TimeLimiter: Fail fast if too slow

---

## Core Patterns

### Circuit Breaker

Like an electrical circuit breaker. If a service is failing, "open" the circuit to stop calling it. After some time, try again (half-open state). If it works, close the circuit.

**States:**
- CLOSED: Normal operation, calls go through
- OPEN: Service is failing, calls are blocked (use fallback)
- HALF_OPEN: Testing if service recovered, allow limited calls

**How It Works:**
1. Service calls are successful → Circuit stays CLOSED
2. Failures exceed threshold → Circuit opens (OPEN state)
3. After wait time → Circuit goes to HALF_OPEN
4. Test call succeeds → Circuit closes (CLOSED state)
5. Test call fails → Circuit opens again (OPEN state)

### Retry

Automatically retry failed requests. Useful for transient failures (network glitches, temporary unavailability).

**When to Use:**
- Transient failures (network issues)
- Temporary service unavailability
- Not for permanent failures

### Rate Limiter

Limit the number of calls per time period. Prevents overwhelming a service.

**Example:**
- Limit: 10 calls per minute
- 11th call in same minute → Blocked or queued

### Bulkhead

Isolate resources. Like ship bulkheads prevent water from flooding the entire ship, bulkheads isolate failures.

**Types:**
- Thread pool bulkhead: Isolate thread pools
- Semaphore bulkhead: Limit concurrent calls

### TimeLimiter

Set maximum time for an operation. If it takes longer, fail fast.

**Example:**
- Timeout: 5 seconds
- Operation takes 6 seconds → Fail immediately

---

## Configuring Circuit Breaker

Let's implement a circuit breaker step by step.

### Step 1: Add Dependencies

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

The AOP dependency is needed for annotations to work.

### Step 2: Configure Circuit Breaker

In application.properties:

\`\`\`properties
resilience4j.circuitbreaker.instances.productService.failureRateThreshold=50
resilience4j.circuitbreaker.instances.productService.waitDurationInOpenState=10000
resilience4j.circuitbreaker.instances.productService.slidingWindowSize=10
resilience4j.circuitbreaker.instances.productService.minimumNumberOfCalls=5
\`\`\`

**Explanation:**
- failureRateThreshold=50: Open circuit if 50% of calls fail
- waitDurationInOpenState=10000: Wait 10 seconds before trying again
- slidingWindowSize=10: Check last 10 calls
- minimumNumberOfCalls=5: Need at least 5 calls before evaluating

### Step 3: Use Circuit Breaker

\`\`\`java
package com.example.orderservice.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        product.setPrice(0.0);
        return product;
    }
}
\`\`\`

**How It Works:**
1. Normal operation: getProduct() calls Product Service
2. If Product Service fails: Circuit opens
3. Next calls: getProductFallback() is called instead
4. After 10 seconds: Circuit goes to HALF_OPEN
5. Test call: If succeeds, circuit closes; if fails, opens again

---

## Retry Configuration

Retry automatically retries failed requests.

### Configuration

\`\`\`properties
resilience4j.retry.instances.productService.maxAttempts=3
resilience4j.retry.instances.productService.waitDuration=1000
resilience4j.retry.instances.productService.retryExceptions=java.net.ConnectException, java.io.IOException
\`\`\`

**Explanation:**
- maxAttempts=3: Try up to 3 times
- waitDuration=1000: Wait 1 second between retries
- retryExceptions: Only retry for these exceptions

### Using Retry

\`\`\`java
import io.github.resilience4j.retry.annotation.Retry;

@Service
public class OrderService {
    
    @Retry(name = "productService")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
}
\`\`\`

**How It Works:**
1. First attempt fails → Wait 1 second
2. Second attempt fails → Wait 1 second
3. Third attempt fails → Throw exception
4. If any attempt succeeds → Return result

---

## Rate Limiter

Limit the number of calls per time period.

### Configuration

\`\`\`properties
resilience4j.ratelimiter.instances.productService.limitForPeriod=10
resilience4j.ratelimiter.instances.productService.limitRefreshPeriod=60s
resilience4j.ratelimiter.instances.productService.timeoutDuration=5s
\`\`\`

**Explanation:**
- limitForPeriod=10: Allow 10 calls
- limitRefreshPeriod=60s: Per 60 seconds
- timeoutDuration=5s: Wait up to 5 seconds if limit reached

### Using Rate Limiter

\`\`\`java
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;

@Service
public class OrderService {
    
    @RateLimiter(name = "productService", fallbackMethod = "getProductRateLimited")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductRateLimited(Long id, Exception e) {
        Product product = new Product();
        product.setId(id);
        product.setName("Rate limit exceeded. Please try again later.");
        return product;
    }
}
\`\`\`

---

## Bulkhead

Isolate resources to prevent failures from spreading.

### Thread Pool Bulkhead

\`\`\`properties
resilience4j.threadpoolbulkhead.instances.productService.maxThreadPoolSize=10
resilience4j.threadpoolbulkhead.instances.productService.coreThreadPoolSize=5
resilience4j.threadpoolbulkhead.instances.productService.queueCapacity=100
\`\`\`

### Semaphore Bulkhead

\`\`\`properties
resilience4j.bulkhead.instances.productService.maxConcurrentCalls=10
resilience4j.bulkhead.instances.productService.maxWaitDuration=5s
\`\`\`

### Using Bulkhead

\`\`\`java
import io.github.resilience4j.bulkhead.annotation.Bulkhead;

@Service
public class OrderService {
    
    @Bulkhead(name = "productService", fallbackMethod = "getProductBulkheadFull")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductBulkheadFull(Long id, Exception e) {
        Product product = new Product();
        product.setId(id);
        product.setName("Service is busy. Please try again later.");
        return product;
    }
}
\`\`\`

---

## TimeLimiter

Set maximum time for an operation.

### Configuration

\`\`\`properties
resilience4j.timelimiter.instances.productService.timeoutDuration=5s
\`\`\`

### Using TimeLimiter

\`\`\`java
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;

@Service
public class OrderService {
    
    @TimeLimiter(name = "productService", fallbackMethod = "getProductTimeout")
    public CompletableFuture<Product> getProduct(Long id) {
        return CompletableFuture.supplyAsync(() -> {
            return productClient.getProduct(id);
        });
    }
    
    public CompletableFuture<Product> getProductTimeout(Long id, Exception e) {
        Product product = new Product();
        product.setId(id);
        product.setName("Request timeout. Please try again.");
        return CompletableFuture.completedFuture(product);
    }
}
\`\`\`

**Note:** TimeLimiter works with CompletableFuture for async operations.

---

## Monitoring Circuit Breaker States

You can check the state of circuit breakers programmatically.

\`\`\`java
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CircuitBreakerMonitor {
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    public void checkCircuitBreakerState() {
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker("productService");
        CircuitBreaker.State state = circuitBreaker.getState();
        
        System.out.println("Circuit Breaker State: " + state);
        
        // States: CLOSED, OPEN, HALF_OPEN
        if (state == CircuitBreaker.State.OPEN) {
            System.out.println("Circuit is OPEN - Service is failing");
        } else if (state == CircuitBreaker.State.HALF_OPEN) {
            System.out.println("Circuit is HALF_OPEN - Testing recovery");
        } else {
            System.out.println("Circuit is CLOSED - Service is healthy");
        }
    }
}
\`\`\`

---

## Combining Patterns

You can combine multiple patterns:

\`\`\`java
@Service
public class OrderService {
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    @Retry(name = "productService")
    @RateLimiter(name = "productService")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductFallback(Long id, Exception e) {
        Product product = new Product();
        product.setId(id);
        product.setName("Product service unavailable");
        return product;
    }
}
\`\`\`

**Execution Order:**
1. Rate Limiter: Check if limit reached
2. Retry: Retry if fails
3. Circuit Breaker: Open circuit if too many failures

---

## Handling Cascading Failures

Cascading failures happen when one service failure causes others to fail.

**Example:**
- Product Service fails
- Order Service waits for Product Service
- Order Service times out
- Payment Service waits for Order Service
- Payment Service times out
- Entire system fails

**Solution:**
Use Circuit Breaker to stop calling failing services immediately. Use fallback methods to return default values.

---

## Real-World Example

Complete example with all patterns:

\`\`\`java
@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    @Retry(name = "productService")
    @RateLimiter(name = "productService")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductFallback(Long id, Exception e) {
        // Log the error
        System.err.println("Product service unavailable: " + e.getMessage());
        
        // Return default product
        Product product = new Product();
        product.setId(id);
        product.setName("Product temporarily unavailable");
        product.setPrice(0.0);
        product.setDescription("Please try again later");
        return product;
    }
}
\`\`\`

**Configuration:**

\`\`\`properties
# Circuit Breaker
resilience4j.circuitbreaker.instances.productService.failureRateThreshold=50
resilience4j.circuitbreaker.instances.productService.waitDurationInOpenState=10000
resilience4j.circuitbreaker.instances.productService.slidingWindowSize=10

# Retry
resilience4j.retry.instances.productService.maxAttempts=3
resilience4j.retry.instances.productService.waitDuration=1000

# Rate Limiter
resilience4j.ratelimiter.instances.productService.limitForPeriod=10
resilience4j.ratelimiter.instances.productService.limitRefreshPeriod=60s
\`\`\`

---

## Best Practices

### 1. Always Provide Fallback Methods

Fallback methods prevent cascading failures. Always return a sensible default.

### 2. Configure Timeouts Appropriately

Set timeouts based on your service response times. Too short = false failures. Too long = slow failure detection.

### 3. Monitor Circuit Breaker States

Monitor circuit breaker states to understand service health.

### 4. Use Retry for Transient Failures Only

Don't retry for permanent failures (like 404 Not Found). Only retry for transient failures (network issues).

### 5. Test Failure Scenarios

Test your fallback methods and circuit breaker behavior.

---

## Summary

Resilience4j provides fault tolerance patterns:

**Key Patterns:**
- Circuit Breaker: Stop calling failing services
- Retry: Retry transient failures
- Rate Limiter: Limit call rate
- Bulkhead: Isolate resources
- TimeLimiter: Fail fast on timeout

**Benefits:**
- Prevents cascading failures
- Graceful degradation
- Better user experience
- System stability

**What's Next?**

Now that you understand fault tolerance:

1. Learn [Distributed Tracing](/tutorial/spring-cloud-distributed-tracing) to track requests
2. Use [OpenFeign](/tutorial/spring-cloud-openfeign) with Resilience4j
3. Set up [Service Discovery](/tutorial/spring-cloud-eureka) for service location
4. Master [API Gateway](/tutorial/spring-cloud-api-gateway) for routing
`,
  code: `// Circuit Breaker Example
package com.example.orderservice.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
    
    public Product getProductFallback(Long id, Exception e) {
        Product product = new Product();
        product.setId(id);
        product.setName("Product temporarily unavailable");
        return product;
    }
}

// Combining Multiple Patterns
@Service
public class OrderService {
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    @Retry(name = "productService")
    @RateLimiter(name = "productService")
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
}

// Monitoring Circuit Breaker
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;

@Service
public class CircuitBreakerMonitor {
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    public void checkState() {
        CircuitBreaker cb = circuitBreakerRegistry.circuitBreaker("productService");
        System.out.println("State: " + cb.getState());
    }
}`
};

export default springCloudResilience4j;






