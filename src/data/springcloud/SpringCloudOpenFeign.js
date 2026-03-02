const springCloudOpenFeign = {
  id: 'spring-cloud-openfeign',
  title: 'Inter-Service Communication with OpenFeign',
  description: 'Learn how to use OpenFeign for declarative REST clients in microservices - create Feign interfaces, handle requests/responses, and configure timeouts and error handling',
  content: `
# Inter-Service Communication with OpenFeign

When services need to call each other, you have options: RestTemplate, WebClient, or Feign. Feign is the easiest and most declarative way.

Let me explain what Feign is and how to use it.

---

## What is Declarative REST Client?

Instead of writing code to make HTTP calls, Feign lets you define REST clients as Java interfaces. Spring Cloud generates the implementation automatically.

**Traditional Way (RestTemplate):**

\`\`\`java
RestTemplate restTemplate = new RestTemplate();
String url = "http://product-service/api/products/" + id;
Product product = restTemplate.getForObject(url, Product.class);
\`\`\`

**Feign Way:**

\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
}

// Use it
Product product = productClient.getProduct(id);
\`\`\`

Much simpler! You just define an interface, and Feign handles the HTTP calls.

---

## Feign vs RestTemplate vs WebClient

Let's compare the three options:

### RestTemplate

**Characteristics:**
- Synchronous (blocking)
- Simple to use
- Limited features

**Example:**
\`\`\`java
RestTemplate restTemplate = new RestTemplate();
Product product = restTemplate.getForObject(
    "http://product-service/api/products/" + id,
    Product.class
);
\`\`\`

**When to Use:**
- Simple synchronous calls
- Don't need reactive features
- Quick and easy

### WebClient

**Characteristics:**
- Asynchronous (non-blocking)
- Reactive programming
- More complex
- Better performance for high concurrency

**Example:**
\`\`\`java
WebClient webClient = WebClient.builder().build();
Mono<Product> product = webClient.get()
    .uri("http://product-service/api/products/" + id)
    .retrieve()
    .bodyToMono(Product.class);
\`\`\`

**When to Use:**
- Need non-blocking calls
- High concurrency
- Reactive programming

### Feign

**Characteristics:**
- Declarative (interface-based)
- Simple interface definition
- Synchronous by default
- Easiest to use
- Automatic service discovery

**Example:**
\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
}
\`\`\`

**When to Use:**
- Most common choice
- Want simple, clean code
- Using service discovery
- Default recommendation

---

## Creating Feign Client Interface

Let's create a Feign client step by step.

### Step 1: Add Dependency

In your service's pom.xml:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
\`\`\`

This dependency provides Feign functionality.

### Step 2: Enable Feign Clients

In your main application class:

\`\`\`java
package com.example.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
\`\`\`

The @EnableFeignClients annotation tells Spring to scan for @FeignClient interfaces.

### Step 3: Create Feign Client Interface

Create an interface and annotate it with @FeignClient:

\`\`\`java
package com.example.orderservice.client;

import com.example.orderservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

**Explanation:**
- @FeignClient(name = "product-service"): Service name in Eureka
- @GetMapping, @PostMapping: Same as Spring MVC annotations
- @PathVariable, @RequestBody: Same as Spring MVC

### Step 4: Use the Client

Inject and use the client like any other Spring bean:

\`\`\`java
package com.example.orderservice.service;

import com.example.orderservice.client.ProductClient;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(product.getPrice() * request.getQuantity());
        
        return order;
    }
}
\`\`\`

That's it! Feign handles all the HTTP calls automatically.

---

## Service Name Resolution with Eureka

Feign automatically uses Eureka for service discovery. The name in @FeignClient is the service name registered in Eureka.

**How It Works:**

1. You write: @FeignClient(name = "product-service")
2. Feign asks Eureka: "Where is product-service?"
3. Eureka returns: "http://localhost:8082" (or multiple instances)
4. Feign calls the service
5. Load balancing happens automatically if multiple instances exist

**No Need to Specify URLs:**

You don't need to know the IP address or port. Just use the service name.

---

## Request & Response Mapping

Feign supports all standard Spring MVC annotations for mapping requests and responses.

### Path Variables

\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
}
\`\`\`

Call: productClient.getProduct(123L)
Feign calls: GET /api/products/123

### Request Parameters

\`\`\`java
@GetMapping("/api/products")
List<Product> searchProducts(@RequestParam String category);
\`\`\`

Call: productClient.searchProducts("electronics")
Feign calls: GET /api/products?category=electronics

### Request Headers

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

Feign automatically adds the Authorization header to the request.

### Request Body

\`\`\`java
@PostMapping("/api/products")
Product createProduct(@RequestBody Product product);
\`\`\`

Call: productClient.createProduct(product)
Feign calls: POST /api/products with product as JSON body

### Multiple Parameters

\`\`\`java
@GetMapping("/api/products")
List<Product> searchProducts(
    @RequestParam String category,
    @RequestParam(required = false) Double maxPrice,
    @RequestParam(required = false) String sortBy
);
\`\`\`

Call: productClient.searchProducts("electronics", 1000.0, "price")
Feign calls: GET /api/products?category=electronics&maxPrice=1000.0&sortBy=price

---

## Advanced Features

### Feign Timeout Configuration

By default, Feign has timeouts. You can configure them:

\`\`\`properties
feign.client.config.default.connectTimeout=5000
feign.client.config.default.readTimeout=10000
\`\`\`

**Explanation:**
- connectTimeout: Time to establish connection (5 seconds)
- readTimeout: Time to read response (10 seconds)

**Per-Service Configuration:**

\`\`\`properties
feign.client.config.product-service.connectTimeout=3000
feign.client.config.product-service.readTimeout=5000
\`\`\`

### Feign Logging Levels

Enable logging to see what Feign is doing:

**Step 1: Configure Logger Level**

\`\`\`java
package com.example.orderservice.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
\`\`\`

**Logger Levels:**
- NONE: No logging
- BASIC: Logs request method and URL
- HEADERS: Logs headers too
- FULL: Logs everything (request, response, headers, body)

**Step 2: Set Logging Level for Client**

\`\`\`properties
logging.level.com.example.orderservice.client.ProductClient=DEBUG
\`\`\`

Replace with your actual package path.

**Example Output:**
\`\`\`
ProductClient#getProduct(Long) <--- GET http://product-service/api/products/123 HTTP/1.1
ProductClient#getProduct(Long) <--- END HTTP (200ms)
\`\`\`

### Custom Error Decoder

Handle errors from Feign calls:

\`\`\`java
package com.example.orderservice.client;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomErrorDecoder implements ErrorDecoder {
    
    @Override
    public Exception decode(String methodKey, Response response) {
        HttpStatus status = HttpStatus.valueOf(response.status());
        
        switch (status) {
            case NOT_FOUND:
                return new ProductNotFoundException("Product not found");
            case BAD_REQUEST:
                return new IllegalArgumentException("Invalid request");
            case INTERNAL_SERVER_ERROR:
                return new RuntimeException("Product service error");
            default:
                return new ResponseStatusException(status, "Error calling product service");
        }
    }
}
\`\`\`

**Register Error Decoder:**

\`\`\`java
@Configuration
public class FeignConfig {
    
    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomErrorDecoder();
    }
}
\`\`\`

Now Feign will throw your custom exceptions instead of generic FeignException.

### Feign with Resilience4j

You can combine Feign with Resilience4j for circuit breaking and retry. See the Resilience4j topic for details.

---

## Real-World Example

Let's see a complete example with multiple Feign clients.

**Product Client:**

\`\`\`java
@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
    
    @GetMapping("/api/products")
    List<Product> getAllProducts();
}
\`\`\`

**User Client:**

\`\`\`java
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/users/{id}")
    User getUser(@PathVariable Long id);
    
    @PostMapping("/api/users")
    User createUser(@RequestBody User user);
}
\`\`\`

**Order Service Using Both:**

\`\`\`java
@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    @Autowired
    private UserClient userClient;
    
    public Order createOrder(OrderRequest request) {
        // Get product
        Product product = productClient.getProduct(request.getProductId());
        
        // Get user
        User user = userClient.getUser(request.getUserId());
        
        // Create order
        Order order = new Order();
        order.setUserId(user.getId());
        order.setProductId(product.getId());
        order.setPrice(product.getPrice());
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(product.getPrice() * request.getQuantity());
        
        return order;
    }
}
\`\`\`

**How It Works:**
1. Order Service calls productClient.getProduct()
2. Feign makes HTTP call to product-service
3. Product Service responds
4. Order Service continues
5. Same process for userClient

---

## Common Issues and Solutions

### Issue 1: Feign Client Not Found

**Error:** No qualifying bean of type 'ProductClient'

**Solutions:**
- Verify @EnableFeignClients is present
- Check @FeignClient annotation is correct
- Verify package is scanned (or specify basePackages)

### Issue 2: Service Name Not Resolved

**Error:** UnknownHostException: product-service

**Solutions:**
- Verify service is registered in Eureka
- Check service name matches exactly
- Verify Eureka client is enabled
- Check network connectivity

### Issue 3: Timeout Errors

**Error:** Read timed out

**Solutions:**
- Increase readTimeout
- Check if service is responding
- Verify network connectivity
- Check service performance

---

## Best Practices

### 1. Use Service Names

Always use service names from Eureka, never hardcode URLs.

### 2. Handle Errors Properly

Use custom error decoder to handle different error scenarios.

### 3. Configure Timeouts

Set appropriate timeouts based on your service response times.

### 4. Enable Logging in Development

Use FULL logging level during development to debug issues.

### 5. Use Fallback Methods

Combine with Resilience4j for fallback methods when services fail.

---

## Summary

OpenFeign provides declarative REST clients:

**Key Features:**
- Define clients as interfaces
- Automatic service discovery
- Simple and clean code
- Supports all HTTP methods
- Request/response mapping

**Benefits:**
- Less boilerplate code
- Type-safe
- Easy to test
- Automatic load balancing

**What's Next?**

Now that you understand Feign:

1. Master [Resilience4j](/tutorial/spring-cloud-resilience4j) for fault tolerance with Feign
2. Learn [Load Balancing](/tutorial/spring-cloud-load-balancing) (automatic with Feign)
3. Set up [Service Discovery](/tutorial/spring-cloud-eureka) (required for Feign)
4. Use [API Gateway](/tutorial/spring-cloud-api-gateway) as single entry point
`,
  code: `// Feign Client Interface
package com.example.orderservice.client;

import com.example.orderservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "product-service")
public interface ProductClient {
    
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable Long id);
    
    @PostMapping("/api/products")
    Product createProduct(@RequestBody Product product);
    
    @GetMapping("/api/products")
    List<Product> getAllProducts();
    
    @GetMapping("/api/products")
    List<Product> searchProducts(@RequestParam String category);
}

// Using Feign Client
package com.example.orderservice.service;

import com.example.orderservice.client.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @Autowired
    private ProductClient productClient;
    
    public Product getProduct(Long id) {
        return productClient.getProduct(id);
    }
}

// Feign Configuration
package com.example.orderservice.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}`
};

export default springCloudOpenFeign;



