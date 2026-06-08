const microservicesRealtimeProject = {
  id: 'microservices-realtime-project',
  title: 'Microservices Realtime Project',
  description: 'Build a realtime microservices project with full Spring Boot code, complete folder structure, service-to-service calls, DTOs, controllers, run steps, curl testing, common errors, and fixes.',
  content: `
# Microservices Realtime Project with Full Code and Error Fixes

This project is a fresher-friendly realtime microservices project. We will build three separate Spring Boot applications:

- **User Service**: owns customer data
- **Product Service**: owns product data
- **Order Service**: creates an order by calling User Service and Product Service

We are not using Spring Cloud in this first project. That is intentional. First understand the microservices idea clearly. After that, Spring Cloud tools like Eureka, API Gateway, Config Server, and Resilience4j will make more sense.

---

## Business Requirement

A frontend team asks for this API:

> Create an order for a user and product. The response should show customer name, product name, quantity, total amount, and order status.

In a monolith, one application may read all tables directly. In microservices, each service owns its own responsibility.

\`\`\`
Client
  |
  | POST /orders
  v
Order Service : 8083
  |
  +-- GET /users/{id}    -> User Service : 8081
  |
  +-- GET /products/{id} -> Product Service : 8082
  |
  v
Order response
\`\`\`

---

## What You Will Understand

| Concept | Where You Will See It |
|---|---|
| Independent services | Three separate Spring Boot apps |
| Service ownership | User/Product/Order each owns its own code and data |
| REST communication | Order Service calls User Service and Product Service |
| DTOs | Request and response records |
| Failure handling | What happens if one service is down |
| Testing flow | Curl commands and expected output |

---

## Final Folder Structure

\`\`\`
microservices-realtime-project/
  user-service/
    pom.xml
    src/main/java/com/learnstackhub/userservice/
      UserServiceApplication.java
      UserResponse.java
      UserController.java
    src/main/resources/
      application.properties

  product-service/
    pom.xml
    src/main/java/com/learnstackhub/productservice/
      ProductServiceApplication.java
      ProductResponse.java
      ProductController.java
    src/main/resources/
      application.properties

  order-service/
    pom.xml
    src/main/java/com/learnstackhub/orderservice/
      OrderServiceApplication.java
      OrderRequest.java
      UserResponse.java
      ProductResponse.java
      OrderResponse.java
      OrderController.java
      OrderService.java
      GlobalExceptionHandler.java
    src/main/resources/
      application.properties
\`\`\`

---

## Step 1: Build User Service

User Service owns user data. Other services should not directly access its database or internal data. They should call its API.

### user-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath/>
    </parent>

    <groupId>com.learnstackhub</groupId>
    <artifactId>user-service</artifactId>
    <version>1.0.0</version>
    <name>user-service</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### UserServiceApplication.java

\`\`\`java
package com.learnstackhub.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

### UserResponse.java

\`\`\`java
package com.learnstackhub.userservice;

public record UserResponse(Long id, String name, String email) {
}
\`\`\`

### UserController.java

\`\`\`java
package com.learnstackhub.userservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final Map<Long, UserResponse> users = Map.of(
            1L, new UserResponse(1L, "Ravi", "ravi@example.com"),
            2L, new UserResponse(2L, "Amit", "amit@example.com"),
            3L, new UserResponse(3L, "Dattu", "dattu@example.com")
    );

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        UserResponse user = users.get(id);
        if (user == null) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        return user;
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class UserNotFoundException extends RuntimeException {
    UserNotFoundException(String message) {
        super(message);
    }
}
\`\`\`

### application.properties

\`\`\`properties
server.port=8081
spring.application.name=user-service
\`\`\`

### Test User Service

\`\`\`bash
curl http://localhost:8081/users/1
\`\`\`

Expected response:

\`\`\`json
{
  "id": 1,
  "name": "Ravi",
  "email": "ravi@example.com"
}
\`\`\`

---

## Step 2: Build Product Service

Product Service owns product data. Order Service should not keep product names and prices inside itself.

### product-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath/>
    </parent>

    <groupId>com.learnstackhub</groupId>
    <artifactId>product-service</artifactId>
    <version>1.0.0</version>
    <name>product-service</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### ProductServiceApplication.java

\`\`\`java
package com.learnstackhub.productservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}
\`\`\`

### ProductResponse.java

\`\`\`java
package com.learnstackhub.productservice;

import java.math.BigDecimal;

public record ProductResponse(Long id, String name, BigDecimal price) {
}
\`\`\`

### ProductController.java

\`\`\`java
package com.learnstackhub.productservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final Map<Long, ProductResponse> products = Map.of(
            101L, new ProductResponse(101L, "Java Course", new BigDecimal("999.00")),
            102L, new ProductResponse(102L, "Spring Boot Course", new BigDecimal("1499.00")),
            103L, new ProductResponse(103L, "Microservices Course", new BigDecimal("1999.00"))
    );

    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        ProductResponse product = products.get(id);
        if (product == null) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }
        return product;
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ProductNotFoundException extends RuntimeException {
    ProductNotFoundException(String message) {
        super(message);
    }
}
\`\`\`

### application.properties

\`\`\`properties
server.port=8082
spring.application.name=product-service
\`\`\`

### Test Product Service

\`\`\`bash
curl http://localhost:8082/products/101
\`\`\`

Expected response:

\`\`\`json
{
  "id": 101,
  "name": "Java Course",
  "price": 999.00
}
\`\`\`

---

## Step 3: Build Order Service

Order Service coordinates the business flow. It receives the order request, calls User Service and Product Service, calculates total amount, and returns the order response.

### order-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath/>
    </parent>

    <groupId>com.learnstackhub</groupId>
    <artifactId>order-service</artifactId>
    <version>1.0.0</version>
    <name>order-service</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### OrderServiceApplication.java

\`\`\`java
package com.learnstackhub.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;

@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

    @Bean
    RestClient restClient() {
        return RestClient.create();
    }
}
\`\`\`

### OrderRequest.java

\`\`\`java
package com.learnstackhub.orderservice;

public record OrderRequest(Long userId, Long productId, int quantity) {
}
\`\`\`

### UserResponse.java

\`\`\`java
package com.learnstackhub.orderservice;

public record UserResponse(Long id, String name, String email) {
}
\`\`\`

### ProductResponse.java

\`\`\`java
package com.learnstackhub.orderservice;

import java.math.BigDecimal;

public record ProductResponse(Long id, String name, BigDecimal price) {
}
\`\`\`

### OrderResponse.java

\`\`\`java
package com.learnstackhub.orderservice;

import java.math.BigDecimal;

public record OrderResponse(
        Long orderId,
        String customerName,
        String productName,
        int quantity,
        BigDecimal totalAmount,
        String status
) {
}
\`\`\`

### OrderController.java

\`\`\`java
package com.learnstackhub.orderservice;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }
}
\`\`\`

### OrderService.java

\`\`\`java
package com.learnstackhub.orderservice;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.math.BigDecimal;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final RestClient restClient;
    private final AtomicLong orderSequence = new AtomicLong(1000);

    public OrderService(RestClient restClient) {
        this.restClient = restClient;
    }

    public OrderResponse createOrder(OrderRequest request) {
        validateRequest(request);

        UserResponse user = getUser(request.userId());
        ProductResponse product = getProduct(request.productId());

        BigDecimal totalAmount = product.price()
                .multiply(BigDecimal.valueOf(request.quantity()));

        return new OrderResponse(
                orderSequence.incrementAndGet(),
                user.name(),
                product.name(),
                request.quantity(),
                totalAmount,
                "CREATED"
        );
    }

    private void validateRequest(OrderRequest request) {
        if (request.userId() == null) {
            throw new IllegalArgumentException("userId is required");
        }
        if (request.productId() == null) {
            throw new IllegalArgumentException("productId is required");
        }
        if (request.quantity() <= 0) {
            throw new IllegalArgumentException("quantity must be greater than zero");
        }
    }

    private UserResponse getUser(Long userId) {
        try {
            return restClient.get()
                    .uri("http://localhost:8081/users/{id}", userId)
                    .retrieve()
                    .body(UserResponse.class);
        } catch (RestClientException ex) {
            throw new IllegalStateException("Unable to fetch user from User Service. Check user-service on port 8081.", ex);
        }
    }

    private ProductResponse getProduct(Long productId) {
        try {
            return restClient.get()
                    .uri("http://localhost:8082/products/{id}", productId)
                    .retrieve()
                    .body(ProductResponse.class);
        } catch (RestClientException ex) {
            throw new IllegalStateException("Unable to fetch product from Product Service. Check product-service on port 8082.", ex);
        }
    }
}
\`\`\`

### GlobalExceptionHandler.java

\`\`\`java
package com.learnstackhub.orderservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(errorBody("BAD_REQUEST", ex.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleServiceFailure(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(errorBody("SERVICE_UNAVAILABLE", ex.getMessage()));
    }

    private Map<String, Object> errorBody(String code, String message) {
        return Map.of(
                "timestamp", LocalDateTime.now().toString(),
                "code", code,
                "message", message
        );
    }
}
\`\`\`

### application.properties

\`\`\`properties
server.port=8083
spring.application.name=order-service
\`\`\`

---

## Run the Project

Open three terminals.

### Terminal 1

\`\`\`bash
cd user-service
mvn spring-boot:run
\`\`\`

### Terminal 2

\`\`\`bash
cd product-service
mvn spring-boot:run
\`\`\`

### Terminal 3

\`\`\`bash
cd order-service
mvn spring-boot:run
\`\`\`

Run order matters:

1. User Service on 8081
2. Product Service on 8082
3. Order Service on 8083

---

## Test the Project

### Test User Service

\`\`\`bash
curl http://localhost:8081/users/1
\`\`\`

### Test Product Service

\`\`\`bash
curl http://localhost:8082/products/101
\`\`\`

### Create Order

\`\`\`bash
curl -X POST http://localhost:8083/orders \\
  -H "Content-Type: application/json" \\
  -d "{\\"userId\\":1,\\"productId\\":101,\\"quantity\\":2}"
\`\`\`

Expected response:

\`\`\`json
{
  "orderId": 1001,
  "customerName": "Ravi",
  "productName": "Java Course",
  "quantity": 2,
  "totalAmount": 1998.00,
  "status": "CREATED"
}
\`\`\`

---

## Full Explanation of the Flow

### 1. Client sends order request

The client does not know about User Service or Product Service. It only calls Order Service.

### 2. Order Service validates request

It checks whether userId, productId, and quantity are valid. This prevents bad requests from going to downstream services.

### 3. Order Service calls User Service

\`\`\`java
GET http://localhost:8081/users/1
\`\`\`

This returns customer details.

### 4. Order Service calls Product Service

\`\`\`java
GET http://localhost:8082/products/101
\`\`\`

This returns product name and price.

### 5. Order Service calculates amount

\`\`\`java
totalAmount = product.price() * quantity
\`\`\`

### 6. Order Service returns combined response

This is called API composition. One service builds a response by calling other services.

---

## Common Errors and How to Resolve Them

### Error 1: Port Already in Use

Message:

\`\`\`
Web server failed to start. Port 8081 was already in use.
\`\`\`

Reason:

Another application is already running on the same port.

Fix:

- Stop the old application, or
- Change the port in \`application.properties\`

\`\`\`properties
server.port=8091
\`\`\`

If you change User Service port, also update the URL inside Order Service.

---

### Error 2: Connection Refused

Message:

\`\`\`
I/O error on GET request for "http://localhost:8081/users/1": Connection refused
\`\`\`

Reason:

Order Service is trying to call User Service, but User Service is not running.

Fix:

1. Start User Service.
2. Confirm it works:

\`\`\`bash
curl http://localhost:8081/users/1
\`\`\`

3. Then call Order Service again.

---

### Error 3: 404 Not Found

Message:

\`\`\`
404 Not Found from GET http://localhost:8081/users/99
\`\`\`

Reason:

The user ID does not exist in the User Service map.

Fix:

Use existing user IDs: \`1\`, \`2\`, or \`3\`.

Or add one more record:

\`\`\`java
4L, new UserResponse(4L, "Sneha", "sneha@example.com")
\`\`\`

---

### Error 4: Bad Request for Missing Fields

Request:

\`\`\`json
{
  "userId": 1,
  "productId": 101,
  "quantity": 0
}
\`\`\`

Response:

\`\`\`json
{
  "code": "BAD_REQUEST",
  "message": "quantity must be greater than zero"
}
\`\`\`

Reason:

Order Service validation rejected invalid quantity.

Fix:

Send quantity greater than zero.

---

### Error 5: Cannot Find Symbol RestClient

Message:

\`\`\`
cannot find symbol class RestClient
\`\`\`

Reason:

\`RestClient\` is available in Spring Framework 6.1+ / Spring Boot 3.2+. If your project uses older Spring Boot, it may not exist.

Fix:

- Use Spring Boot 3.5.0 as shown in this tutorial, or
- Use \`RestTemplate\` / \`WebClient\` in older projects.

---

### Error 6: Invalid JSON in curl

Message:

\`\`\`
JSON parse error
\`\`\`

Reason:

The request body is not valid JSON, often because quotes are not escaped correctly in Windows terminal.

PowerShell-friendly command:

\`\`\`powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8083/orders -ContentType "application/json" -Body '{"userId":1,"productId":101,"quantity":2}'
\`\`\`

---

### Error 7: Package Name Mismatch

Message:

\`\`\`
Error: Could not find or load main class
\`\`\`

Reason:

The package name in Java file does not match folder structure.

Correct:

\`\`\`
src/main/java/com/learnstackhub/orderservice/OrderServiceApplication.java
package com.learnstackhub.orderservice;
\`\`\`

---

## Why This Project Is Microservices

| Reason | Explanation |
|---|---|
| Separate applications | Each service can start independently |
| Separate ports | Each service has its own runtime |
| Separate responsibility | User/Product/Order have different business ownership |
| API communication | Services talk using HTTP |
| Failure boundary | If Product Service fails, User Service can still run |

## What Is Missing in This Basic Version

This beginner version uses hardcoded URLs:

\`\`\`java
http://localhost:8081
http://localhost:8082
\`\`\`

In real production, we improve this using:

| Problem | Production Solution |
|---|---|
| Hardcoded service URLs | Service discovery with Eureka/Kubernetes |
| No single frontend entry point | API Gateway |
| No circuit breaker | Resilience4j |
| No tracing | Micrometer Tracing + Zipkin |
| No centralized config | Spring Cloud Config Server |
| Manual startup | Docker Compose or Kubernetes |

That next level belongs to [Spring Cloud Microservices Full Project](/tutorial/spring-cloud-microservices-project).
`,
  code: `// Project run order:
// 1. user-service    -> localhost:8081
// 2. product-service -> localhost:8082
// 3. order-service   -> localhost:8083
//
// Test:
// POST http://localhost:8083/orders
// Body: {"userId":1,"productId":101,"quantity":2}`
};

export default microservicesRealtimeProject;
