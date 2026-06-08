const springCloudMicroservicesProject = {
  id: 'spring-cloud-microservices-project',
  title: 'Spring Cloud Microservices Full Project',
  description: 'Build a realtime Spring Cloud project with full code for Eureka Server, User Service, Product Service, Order Service, API Gateway, service discovery, gateway routing, load-balanced calls, run steps, testing, and error fixes.',
  content: `
# Spring Cloud Microservices Full Project with Code and Explanation

This project shows how Spring Cloud tools help implement microservices in a real Java backend.

We will build:

- **Eureka Server**: service registry
- **User Service**: returns customer data
- **Product Service**: returns product data
- **Order Service**: creates an order by calling User Service and Product Service using service names
- **API Gateway**: one public entry point for frontend/mobile clients

This project is different from the basic [Microservices Realtime Project](/microservices/realtime-project). There, services used hardcoded URLs like \`http://localhost:8081\`. Here, Spring Cloud uses Eureka and load-balanced service names like \`http://user-service\`.

---

## What Problem Spring Cloud Solves

Without Spring Cloud:

\`\`\`
Order Service -> http://localhost:8081/users/1
Order Service -> http://localhost:8082/products/101
\`\`\`

Problem:

- host/port is hardcoded
- service scaling is difficult
- gateway routing is manual
- frontend needs many service URLs

With Spring Cloud:

\`\`\`
Order Service -> http://user-service/users/1
Order Service -> http://product-service/products/101
Frontend      -> http://localhost:8080/orders
\`\`\`

Eureka resolves service names, and API Gateway becomes the single public entry point.

---

## Final Architecture

\`\`\`
Client / Frontend
       |
       v
API Gateway : 8080
       |
       +-- lb://user-service    -> User Service : 8081
       +-- lb://product-service -> Product Service : 8082
       +-- lb://order-service   -> Order Service : 8083
                                      |
                                      +-- http://user-service/users/{id}
                                      +-- http://product-service/products/{id}

Eureka Server : 8761 keeps service registry
\`\`\`

---

## Final Folder Structure

\`\`\`
spring-cloud-realtime-project/
  pom.xml
  eureka-server/
  user-service/
  product-service/
  order-service/
  api-gateway/
\`\`\`

Each child folder is a separate Spring Boot application.

---

## Parent Project

Create folder: \`spring-cloud-realtime-project\`

### pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.learnstackhub</groupId>
    <artifactId>spring-cloud-realtime-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2025.0.0</spring-cloud.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>\${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <modules>
        <module>eureka-server</module>
        <module>user-service</module>
        <module>product-service</module>
        <module>order-service</module>
        <module>api-gateway</module>
    </modules>
</project>
\`\`\`

### Explanation

The parent POM controls Spring Boot and Spring Cloud versions in one place. Child services do not need to repeat version numbers for Spring Cloud dependencies.

---

## 1. Eureka Server

Eureka Server is the service registry. Services register themselves here using their \`spring.application.name\`.

### eureka-server/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.learnstackhub</groupId>
        <artifactId>spring-cloud-realtime-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>eureka-server</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
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

### EurekaServerApplication.java

\`\`\`java
package com.learnstackhub.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
\`\`\`

### application.properties

\`\`\`properties
server.port=8761
spring.application.name=eureka-server

eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
\`\`\`

### Why these properties?

Eureka Server should not register itself as a client. That is why both values are false.

---

## 2. User Service

User Service registers with Eureka and exposes user APIs.

### user-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.learnstackhub</groupId>
        <artifactId>spring-cloud-realtime-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>user-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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

In modern Spring Cloud, \`@EnableEurekaClient\` is usually not required when the Eureka client dependency is present.

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

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final List<UserResponse> users = List.of(
            new UserResponse(1L, "Ravi", "ravi@example.com"),
            new UserResponse(2L, "Amit", "amit@example.com"),
            new UserResponse(3L, "Dattu", "dattu@example.com")
    );

    @GetMapping
    public List<UserResponse> getUsers() {
        return users;
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return users.stream()
                .filter(user -> user.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new UserNotFoundException("User not found: " + id));
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

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true
\`\`\`

---

## 3. Product Service

Product Service registers with Eureka and exposes product APIs.

### product-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.learnstackhub</groupId>
        <artifactId>spring-cloud-realtime-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>product-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final List<ProductResponse> products = List.of(
            new ProductResponse(101L, "Java Course", new BigDecimal("999.00")),
            new ProductResponse(102L, "Spring Boot Course", new BigDecimal("1499.00")),
            new ProductResponse(103L, "Microservices Course", new BigDecimal("1999.00"))
    );

    @GetMapping
    public List<ProductResponse> getProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        return products.stream()
                .filter(product -> product.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Product not found: " + id));
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

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true
\`\`\`

---

## 4. Order Service

Order Service registers with Eureka and calls other services by name using \`@LoadBalanced RestClient.Builder\`.

### order-service/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.learnstackhub</groupId>
        <artifactId>spring-cloud-realtime-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>order-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
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
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;

@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

    @Bean
    @LoadBalanced
    RestClient.Builder restClientBuilder() {
        return RestClient.builder();
    }
}
\`\`\`

### DTO Classes

\`\`\`java
package com.learnstackhub.orderservice;

public record OrderRequest(Long userId, Long productId, int quantity) {
}
\`\`\`

\`\`\`java
package com.learnstackhub.orderservice;

public record UserResponse(Long id, String name, String email) {
}
\`\`\`

\`\`\`java
package com.learnstackhub.orderservice;

import java.math.BigDecimal;

public record ProductResponse(Long id, String name, BigDecimal price) {
}
\`\`\`

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

    public OrderService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
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
                    .uri("http://user-service/users/{id}", userId)
                    .retrieve()
                    .body(UserResponse.class);
        } catch (RestClientException ex) {
            throw new IllegalStateException("Unable to fetch user through Eureka service name user-service", ex);
        }
    }

    private ProductResponse getProduct(Long productId) {
        try {
            return restClient.get()
                    .uri("http://product-service/products/{id}", productId)
                    .retrieve()
                    .body(ProductResponse.class);
        } catch (RestClientException ex) {
            throw new IllegalStateException("Unable to fetch product through Eureka service name product-service", ex);
        }
    }
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

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true
\`\`\`

### Why \`@LoadBalanced\` is important

\`http://user-service\` is not a real DNS URL on your machine. It is a service name registered in Eureka. \`@LoadBalanced\` tells Spring Cloud LoadBalancer to resolve that service name to an actual running instance.

---

## 5. API Gateway

API Gateway receives frontend requests and routes them to internal services using Eureka service names.

### api-gateway/pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.learnstackhub</groupId>
        <artifactId>spring-cloud-realtime-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>api-gateway</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway-server-webflux</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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

### ApiGatewayApplication.java

\`\`\`java
package com.learnstackhub.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
\`\`\`

### application.properties

\`\`\`properties
server.port=8080
spring.application.name=api-gateway

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true

spring.cloud.gateway.server.webflux.routes[0].id=user-service
spring.cloud.gateway.server.webflux.routes[0].uri=lb://user-service
spring.cloud.gateway.server.webflux.routes[0].predicates[0]=Path=/users/**

spring.cloud.gateway.server.webflux.routes[1].id=product-service
spring.cloud.gateway.server.webflux.routes[1].uri=lb://product-service
spring.cloud.gateway.server.webflux.routes[1].predicates[0]=Path=/products/**

spring.cloud.gateway.server.webflux.routes[2].id=order-service
spring.cloud.gateway.server.webflux.routes[2].uri=lb://order-service
spring.cloud.gateway.server.webflux.routes[2].predicates[0]=Path=/orders/**
\`\`\`

### Gateway Explanation

When client calls:

\`\`\`
http://localhost:8080/users/1
\`\`\`

Gateway sees \`Path=/users/**\` and forwards the request to:

\`\`\`
lb://user-service
\`\`\`

Spring Cloud LoadBalancer asks Eureka for a running user-service instance and routes the request.

---

## Run the Project

Open five terminals.

### Terminal 1: Eureka Server

\`\`\`bash
cd eureka-server
mvn spring-boot:run
\`\`\`

Open dashboard:

\`\`\`
http://localhost:8761
\`\`\`

### Terminal 2: User Service

\`\`\`bash
cd user-service
mvn spring-boot:run
\`\`\`

### Terminal 3: Product Service

\`\`\`bash
cd product-service
mvn spring-boot:run
\`\`\`

### Terminal 4: Order Service

\`\`\`bash
cd order-service
mvn spring-boot:run
\`\`\`

### Terminal 5: API Gateway

\`\`\`bash
cd api-gateway
mvn spring-boot:run
\`\`\`

Run order matters because clients need Eureka available first.

---

## Test Direct Services

\`\`\`bash
curl http://localhost:8081/users/1
curl http://localhost:8082/products/101
\`\`\`

---

## Test Through API Gateway

\`\`\`bash
curl http://localhost:8080/users/1
curl http://localhost:8080/products/101
\`\`\`

Create order through gateway:

\`\`\`bash
curl -X POST http://localhost:8080/orders \\
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

## How the Full Request Works

1. Client calls API Gateway: \`POST /orders\`
2. Gateway routes request to \`lb://order-service\`
3. Eureka resolves \`order-service\` to localhost:8083
4. Order Service receives request
5. Order Service calls \`http://user-service/users/1\`
6. LoadBalancer asks Eureka for user-service instance
7. Order Service calls \`http://product-service/products/101\`
8. LoadBalancer asks Eureka for product-service instance
9. Order Service calculates total
10. Gateway returns final response to client

---

## Common Errors and Fixes

### Error 1: Services not showing in Eureka

Reason:

- Eureka Server is not running
- wrong Eureka URL
- service started before Eureka and did not reconnect yet

Fix:

\`\`\`properties
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

Restart the client service after Eureka starts.

---

### Error 2: Gateway returns 503 Service Unavailable

Reason:

Gateway route is correct, but target service is not registered in Eureka.

Fix:

1. Open http://localhost:8761
2. Check whether service is UP
3. Confirm service name matches route URI:

\`\`\`properties
spring.application.name=user-service
spring.cloud.gateway.server.webflux.routes[0].uri=lb://user-service
\`\`\`

---

### Error 3: UnknownHostException user-service

Reason:

Order Service is calling \`http://user-service\`, but RestClient is not load-balanced.

Fix:

Add \`@LoadBalanced\`:

\`\`\`java
@Bean
@LoadBalanced
RestClient.Builder restClientBuilder() {
    return RestClient.builder();
}
\`\`\`

Also include:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
\`\`\`

---

### Error 4: Port already in use

Reason:

Another service is already running on the same port.

Fix:

Change port:

\`\`\`properties
server.port=8084
\`\`\`

Or stop the existing process.

---

### Error 5: Gateway route not matching

Reason:

Path predicate does not match the request URL.

Example:

\`\`\`properties
Path=/users/**
\`\`\`

This matches:

\`\`\`
/users
/users/1
\`\`\`

It does not match:

\`\`\`
/api/users/1
\`\`\`

Fix either your route path or controller path.

---

## Why This Is Spring Cloud

| Feature | Spring Cloud Tool |
|---|---|
| Service registry | Eureka Server |
| Service registration | Eureka Client |
| Single public entry point | Spring Cloud Gateway |
| Service name routing | Spring Cloud LoadBalancer |
| Gateway route resolution | \`lb://service-name\` |

## Next Improvements

After this project runs, add:

1. [Config Server](/tutorial/spring-cloud-config-server)
2. [OpenFeign](/tutorial/spring-cloud-openfeign)
3. [Resilience4j](/tutorial/spring-cloud-resilience4j)
4. [Micrometer Tracing and Zipkin](/tutorial/spring-cloud-distributed-tracing)
5. [ELK centralized logging](/tutorial/spring-cloud-elk)
`,
  code: `// Spring Cloud project flow:
// Client -> API Gateway -> Eureka service lookup -> target service
// Order Service also uses Eureka service names through @LoadBalanced RestClient.Builder`
};

export default springCloudMicroservicesProject;
