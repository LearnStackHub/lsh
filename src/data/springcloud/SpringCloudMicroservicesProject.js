const springCloudMicroservicesProject = {
  id: 'spring-cloud-microservices-project',
  title: 'Spring Cloud Microservices Project Setup',
  description: 'Complete step-by-step guide to create and run a simple microservices project with Spring Cloud - Eureka Server, User Service, Product Service, and API Gateway',
  content: `
# Spring Cloud Microservices Project Setup

Let's build a complete microservices project from scratch. We'll create a simple e-commerce system with multiple services that communicate with each other.

This project will help you understand how all the Spring Cloud components work together in a real application.

---

## Project Overview

We'll build 4 microservices:

1. **Eureka Server** - Service registry (port 8761)
2. **User Service** - Manages users (port 8081)
3. **Product Service** - Manages products (port 8082)
4. **API Gateway** - Single entry point (port 8080)

**Architecture:**

\`\`\`
Client
  │
  ▼
API Gateway (8080)
  │
  ├─► User Service (8081) ──► Eureka (8761)
  │
  └─► Product Service (8082) ──► Eureka (8761)
\`\`\`

---

## Prerequisites

Before starting, make sure you have:

- Java 17 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)
- Basic knowledge of Spring Boot

---

## Step 1: Create Parent Project Structure

First, let's create the parent project structure.

**Create a folder:** \`microservices-project\`

**Inside this folder, create:** \`pom.xml\` (parent POM)

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>microservices-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <name>Microservices Project</name>
    <description>Spring Cloud Microservices Project</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2022.0.3</spring-cloud.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
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
        <module>api-gateway</module>
    </modules>

</project>
\`\`\`

---

## Step 2: Create Eureka Server

**Create folder:** \`eureka-server\`

**Create:** \`eureka-server/pom.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>microservices-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>eureka-server</artifactId>
    <name>Eureka Server</name>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>

</project>
\`\`\`

**Create:** \`eureka-server/src/main/java/com/example/eurekaserver/EurekaServerApplication.java\`

\`\`\`java
package com.example.eurekaserver;

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

**Create:** \`eureka-server/src/main/resources/application.properties\`

\`\`\`properties
server.port=8761

spring.application.name=eureka-server

eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
\`\`\`

---

## Step 3: Create User Service

**Create folder:** \`user-service\`

**Create:** \`user-service/pom.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>microservices-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>user-service</artifactId>
    <name>User Service</name>

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

</project>
\`\`\`

**Create:** \`user-service/src/main/java/com/example/userservice/UserServiceApplication.java\`

\`\`\`java
package com.example.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

**Create:** \`user-service/src/main/java/com/example/userservice/model/User.java\`

\`\`\`java
package com.example.userservice.model;

public class User {
    private Long id;
    private String name;
    private String email;

    public User() {
    }

    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
\`\`\`

**Create:** \`user-service/src/main/java/com/example/userservice/controller/UserController.java\`

\`\`\`java
package com.example.userservice.controller;

import com.example.userservice.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private List<User> users = new ArrayList<>();

    public UserController() {
        users.add(new User(1L, "John Doe", "john@example.com"));
        users.add(new User(2L, "Jane Smith", "jane@example.com"));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setId((long) (users.size() + 1));
        users.add(user);
        return user;
    }
}
\`\`\`

**Create:** \`user-service/src/main/resources/application.properties\`

\`\`\`properties
spring.application.name=user-service
server.port=8081

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true
\`\`\`

---

## Step 4: Create Product Service

**Create folder:** \`product-service\`

**Create:** \`product-service/pom.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>microservices-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>product-service</artifactId>
    <name>Product Service</name>

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

</project>
\`\`\`

**Create:** \`product-service/src/main/java/com/example/productservice/ProductServiceApplication.java\`

\`\`\`java
package com.example.productservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}
\`\`\`

**Create:** \`product-service/src/main/java/com/example/productservice/model/Product.java\`

\`\`\`java
package com.example.productservice.model;

public class Product {
    private Long id;
    private String name;
    private Double price;
    private String description;

    public Product() {
    }

    public Product(Long id, String name, Double price, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
\`\`\`

**Create:** \`product-service/src/main/java/com/example/productservice/controller/ProductController.java\`

\`\`\`java
package com.example.productservice.controller;

import com.example.productservice.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private List<Product> products = new ArrayList<>();

    public ProductController() {
        products.add(new Product(1L, "Laptop", 999.99, "High-performance laptop"));
        products.add(new Product(2L, "Mouse", 29.99, "Wireless mouse"));
        products.add(new Product(3L, "Keyboard", 79.99, "Mechanical keyboard"));
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return products.stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        product.setId((long) (products.size() + 1));
        products.add(product);
        return product;
    }
}
\`\`\`

**Create:** \`product-service/src/main/resources/application.properties\`

\`\`\`properties
spring.application.name=product-service
server.port=8082

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.instance.prefer-ip-address=true
\`\`\`

---

## Step 5: Create API Gateway

**Create folder:** \`api-gateway\`

**Create:** \`api-gateway/pom.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>microservices-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>api-gateway</artifactId>
    <name>API Gateway</name>

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

</project>
\`\`\`

**Create:** \`api-gateway/src/main/java/com/example/apigateway/ApiGatewayApplication.java\`

\`\`\`java
package com.example.apigateway;

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
\`\`\`

**Create:** \`api-gateway/src/main/resources/application.properties\`

\`\`\`properties
spring.application.name=api-gateway
server.port=8080

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Gateway Routes
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://user-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

spring.cloud.gateway.routes[1].id=product-service
spring.cloud.gateway.routes[1].uri=lb://product-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/products/**
\`\`\`

---

## Step 6: Project Structure

Your final project structure should look like this:

\`\`\`
microservices-project/
├── pom.xml
├── eureka-server/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/eurekaserver/
│           │   └── EurekaServerApplication.java
│           └── resources/
│               └── application.properties
├── user-service/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/userservice/
│           │   ├── UserServiceApplication.java
│           │   ├── controller/
│           │   │   └── UserController.java
│           │   └── model/
│           │       └── User.java
│           └── resources/
│               └── application.properties
├── product-service/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/productservice/
│           │   ├── ProductServiceApplication.java
│           │   ├── controller/
│           │   │   └── ProductController.java
│           │   └── model/
│           │       └── Product.java
│           └── resources/
│               └── application.properties
└── api-gateway/
    ├── pom.xml
    └── src/
        └── main/
            ├── java/com/example/apigateway/
            │   └── ApiGatewayApplication.java
            └── resources/
                └── application.properties
\`\`\`

---

## Step 7: How to Run the Project

### Option 1: Run from IDE (Recommended)

**Step 1: Import Project**
- Open your IDE (IntelliJ IDEA, Eclipse)
- Import as Maven project
- Select the parent \`pom.xml\`

**Step 2: Run Services in Order**

1. **Start Eureka Server:**
   - Right-click on \`EurekaServerApplication.java\`
   - Select "Run"
   - Wait for it to start (check console for "Started EurekaServerApplication")
   - Visit: http://localhost:8761

2. **Start User Service:**
   - Right-click on \`UserServiceApplication.java\`
   - Select "Run"
   - Wait for it to register with Eureka

3. **Start Product Service:**
   - Right-click on \`ProductServiceApplication.java\`
   - Select "Run"
   - Wait for it to register with Eureka

4. **Start API Gateway:**
   - Right-click on \`ApiGatewayApplication.java\`
   - Select "Run"
   - Wait for it to start

### Option 2: Run from Command Line

**Step 1: Build the Project**

\`\`\`bash
cd microservices-project
mvn clean install
\`\`\`

**Step 2: Run Services**

Open 4 separate terminal windows:

**Terminal 1 - Eureka Server:**
\`\`\`bash
cd eureka-server
mvn spring-boot:run
\`\`\`

**Terminal 2 - User Service:**
\`\`\`bash
cd user-service
mvn spring-boot:run
\`\`\`

**Terminal 3 - Product Service:**
\`\`\`bash
cd product-service
mvn spring-boot:run
\`\`\`

**Terminal 4 - API Gateway:**
\`\`\`bash
cd api-gateway
mvn spring-boot:run
\`\`\`

---

## Step 8: Testing the Project

### 1. Check Eureka Dashboard

Visit: http://localhost:8761

You should see:
- user-service (UP)
- product-service (UP)
- api-gateway (UP)

### 2. Test User Service Directly

\`\`\`bash
# Get all users
curl http://localhost:8081/api/users

# Get user by ID
curl http://localhost:8081/api/users/1
\`\`\`

### 3. Test Product Service Directly

\`\`\`bash
# Get all products
curl http://localhost:8082/api/products

# Get product by ID
curl http://localhost:8082/api/products/1
\`\`\`

### 4. Test Through API Gateway

\`\`\`bash
# Get all users through gateway
curl http://localhost:8080/api/users

# Get user by ID through gateway
curl http://localhost:8080/api/users/1

# Get all products through gateway
curl http://localhost:8080/api/products

# Get product by ID through gateway
curl http://localhost:8080/api/products/1
\`\`\`

### 5. Test with Browser

- http://localhost:8080/api/users
- http://localhost:8080/api/users/1
- http://localhost:8080/api/products
- http://localhost:8080/api/products/1

---

## Common Issues and Solutions

### Issue 1: Services Not Registering with Eureka

**Symptoms:** Services don't appear in Eureka dashboard

**Solutions:**
- Make sure Eureka Server is running first
- Check \`eureka.client.service-url.defaultZone\` is correct
- Verify service names match exactly
- Check network connectivity

### Issue 2: Gateway Can't Route to Services

**Symptoms:** 404 errors when calling through gateway

**Solutions:**
- Verify services are registered in Eureka
- Check route predicates match your requests
- Verify \`lb://\` prefix is used for service discovery
- Check service names match

### Issue 3: Port Already in Use

**Symptoms:** Port binding error

**Solutions:**
- Change port in \`application.properties\`
- Stop other applications using the port
- Use different ports for each service

---

## What's Next?

Now that you have a working microservices project:

1. Learn [Microservices Architecture Fundamentals](/tutorial/microservices-architecture-fundamentals) to understand the concepts
2. Set up [Config Server](/tutorial/spring-cloud-config-server) for centralized configuration
3. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for inter-service communication
4. Add [Resilience4j](/tutorial/spring-cloud-resilience4j) for fault tolerance
5. Implement [Distributed Tracing](/tutorial/spring-cloud-distributed-tracing) to track requests

---

## Summary

You've successfully created and run a complete microservices project with:

- Eureka Server for service discovery
- User Service and Product Service as microservices
- API Gateway as single entry point
- All services communicating through Eureka

This is a solid foundation for building more complex microservices applications!
`,
  code: `// Complete Project Structure Example

// Parent pom.xml
<project>
    <modules>
        <module>eureka-server</module>
        <module>user-service</module>
        <module>product-service</module>
        <module>api-gateway</module>
    </modules>
</project>

// Eureka Server Application
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// User Service Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }
}

// Product Service Controller
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }
}

// API Gateway Configuration
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://user-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

// Run Order:
// 1. Eureka Server (8761)
// 2. User Service (8081)
// 3. Product Service (8082)
// 4. API Gateway (8080)`
};

export default springCloudMicroservicesProject;



