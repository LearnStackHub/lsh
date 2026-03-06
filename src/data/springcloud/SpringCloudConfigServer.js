const springCloudConfigServer = {
  id: 'spring-cloud-config-server',
  title: 'Spring Cloud Config Server - Centralized Configuration',
  description: 'Learn how to set up and use Spring Cloud Config Server for centralized configuration management in microservices architecture',
  content: `
# Spring Cloud Config Server - Centralized Configuration

In a microservices architecture, you have many services, each with its own configuration. Managing configuration files for each service separately becomes a nightmare.

Let me explain what Config Server is and how to use it.

---

## What is Centralized Configuration?

**The Problem:**

Imagine you have 10 microservices. Each has its own application.properties file:
- user-service.properties
- product-service.properties
- order-service.properties
- payment-service.properties
- And 6 more...

Now, what happens when you need to change the database URL? You have to:
1. Update 10 different files
2. Make sure you don't make mistakes
3. Deploy all 10 services again
4. Hope you didn't miss any

What about different environments? You need:
- Dev configuration
- Test configuration
- Production configuration

For 10 services, that's 30 configuration files to manage!

**The Solution:**

Spring Cloud Config Server provides centralized configuration management. Instead of each service having its own config file, all services get their configuration from one central server.

**How It Works:**

1. You store all configurations in a Git repository
2. Config Server reads from Git
3. Services ask Config Server for their configuration
4. All services get configuration from one place

---

## Config Server Architecture

Here's how it works:

\`\`\`
┌─────────────┐
│   Git Repo  │
│  (Configs)  │
└──────┬──────┘
       │
       │ Reads configs
       │
┌──────┴──────┐
│   Config    │
│   Server    │
│  (Port 8888)│
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

---

## Setting Up Config Server

Let's create a Config Server step by step.

### Step 1: Create Config Server Project

Create a new Spring Boot project. In your pom.xml, add these dependencies:

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

The spring-cloud-config-server dependency gives you the Config Server functionality.

### Step 2: Enable Config Server

In your main application class, add the @EnableConfigServer annotation:

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

The @EnableConfigServer annotation tells Spring Boot to start a Config Server.

### Step 3: Configure Config Server

In your application.properties file:

\`\`\`properties
server.port=8888

spring.application.name=config-server

# Git repository for configuration
spring.cloud.config.server.git.uri=https://github.com/your-username/config-repo.git
spring.cloud.config.server.git.clone-on-start=true
\`\`\`

**Explanation:**
- server.port=8888: Config Server runs on port 8888 (default)
- spring.cloud.config.server.git.uri: Location of your Git repository with configurations
- clone-on-start=true: Clone the repository when server starts

### Step 4: Create Configuration Repository

Create a Git repository (on GitHub, GitLab, or any Git hosting) with your configuration files.

**Repository Structure:**

\`\`\`
config-repo/
  ├── user-service.properties
  ├── product-service.properties
  └── order-service.properties
\`\`\`

**Example: user-service.properties**

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb
spring.datasource.username=root
spring.datasource.password=password
server.port=8081

app.name=User Service
app.version=1.0.0
\`\`\`

**Example: product-service.properties**

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=root
spring.datasource.password=password
server.port=8082

app.name=Product Service
app.version=1.0.0
\`\`\`

Each service has its own configuration file in the repository.

---

## Connecting Client Services

Now let's connect your microservices to the Config Server.

### Step 1: Add Dependencies to Your Service

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

These dependencies allow your service to connect to Config Server.

### Step 2: Create bootstrap.properties

Create a file named bootstrap.properties in your service's src/main/resources folder.

**Important:** Use bootstrap.properties, NOT application.properties for Config Server connection.

\`\`\`properties
spring.application.name=user-service
spring.cloud.config.uri=http://localhost:8888
\`\`\`

**Why bootstrap.properties?**

Bootstrap properties are loaded before application.properties. Your service needs to know where the Config Server is BEFORE it can load its configuration.

**The Loading Order:**
1. Bootstrap properties load first
2. Service connects to Config Server
3. Config Server provides configuration
4. Application properties load (can override Config Server values)

### Step 3: Access Configuration

Your service will automatically fetch configuration from Config Server on startup. Use it like normal:

\`\`\`java
package com.example.userservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    
    @Value("\${server.port}")
    private String port;
    
    @Value("\${app.name}")
    private String appName;
    
    @GetMapping("/config")
    public String getConfig() {
        return "Service: " + appName + " running on port: " + port;
    }
}
\`\`\`

The @Value annotation reads from Config Server automatically.

---

## Bootstrap vs application.yml

You might be wondering: why bootstrap.properties? Can I use application.yml?

**Yes, you can use bootstrap.yml:**

\`\`\`yaml
spring:
  application:
    name: user-service
  cloud:
    config:
      uri: http://localhost:8888
\`\`\`

**The Rule:**
- Use bootstrap.properties or bootstrap.yml for Config Server connection
- Use application.properties or application.yml for local overrides

**Example:**

bootstrap.properties:
\`\`\`properties
spring.application.name=user-service
spring.cloud.config.uri=http://localhost:8888
\`\`\`

application.properties:
\`\`\`properties
# Local overrides (optional)
server.port=8081
# This overrides Config Server value if present
\`\`\`

---

## Advanced Features

### @RefreshScope - Refresh Configuration Without Restart

By default, if you change configuration in Git, you need to restart your service. @RefreshScope allows refreshing configuration without restart.

**Step 1: Add Actuator Dependency**

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**Step 2: Enable Refresh Endpoint**

\`\`\`properties
management.endpoints.web.exposure.include=refresh
\`\`\`

**Step 3: Use @RefreshScope**

\`\`\`java
package com.example.userservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

**Step 4: Refresh Configuration**

After updating config in Git:
1. Commit and push to Git
2. Call refresh endpoint: POST http://localhost:8081/actuator/refresh
3. Configuration refreshes without restart

**How It Works:**
- @RefreshScope creates a proxy
- When you call /actuator/refresh, the proxy reloads values
- No need to restart the service

### Spring Cloud Bus - Refresh All Services at Once

If you have 10 services, calling /actuator/refresh on each one is tedious. Spring Cloud Bus refreshes all services at once.

**How It Works:**
1. Services connect to a message broker (RabbitMQ or Kafka)
2. You send a refresh message to one service
3. That service publishes the message to the broker
4. All services listening get the message and refresh

**Setup:**

Add dependencies:
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
\`\`\`

Configure RabbitMQ:
\`\`\`properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
\`\`\`

Refresh all services:
POST http://localhost:8888/actuator/bus-refresh

All services refresh automatically.

### Encrypting Properties

You shouldn't store passwords and secrets in plain text. Config Server supports encryption.

**Step 1: Generate Encryption Keys**

\`\`\`bash
keytool -genkeypair -alias config-server-key -keyalg RSA -keysize 2048 -storetype JKS -keystore config-server.jks
\`\`\`

**Step 2: Configure Encryption**

\`\`\`properties
encrypt.key-store.location=classpath:config-server.jks
encrypt.key-store.password=your-password
encrypt.key-store.alias=config-server-key
encrypt.key-store.secret=your-secret
\`\`\`

**Step 3: Encrypt Values**

Call Config Server encryption endpoint:
POST http://localhost:8888/encrypt
Body: your-password

Response: {cipher}AQA1234567890...

**Step 4: Use Encrypted Values**

In your config file:
\`\`\`properties
spring.datasource.password={cipher}AQA1234567890...
\`\`\`

Config Server automatically decrypts when serving to services.

### Profile-Based Configuration

Different environments need different configurations. Use profiles.

**Repository Structure:**

\`\`\`
config-repo/
  ├── user-service-dev.properties
  ├── user-service-test.properties
  └── user-service-prod.properties
\`\`\`

**Set Active Profile:**

In bootstrap.properties:
\`\`\`properties
spring.profiles.active=prod
\`\`\`

Config Server serves user-service-prod.properties.

**Or via URL:**

http://localhost:8888/user-service/prod

---

## Real-World Example

Let's see a complete example.

**Config Repository (Git):**

user-service.properties:
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb
spring.datasource.username=root
spring.datasource.password=password
server.port=8081

app.name=User Service
app.version=1.0.0
app.feature.enabled=true
\`\`\`

**User Service bootstrap.properties:**

\`\`\`properties
spring.application.name=user-service
spring.cloud.config.uri=http://localhost:8888
\`\`\`

**User Service Code:**

\`\`\`java
@RestController
@RefreshScope
public class UserController {
    
    @Value("\${app.name}")
    private String appName;
    
    @Value("\${app.version}")
    private String version;
    
    @Value("\${app.feature.enabled:false}")
    private boolean featureEnabled;
    
    @GetMapping("/info")
    public Map<String, Object> getInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", appName);
        info.put("version", version);
        info.put("featureEnabled", featureEnabled);
        return info;
    }
}
\`\`\`

**How It Works:**
1. User Service starts
2. Reads bootstrap.properties
3. Connects to Config Server (port 8888)
4. Config Server reads user-service.properties from Git
5. Returns configuration to User Service
6. User Service uses the configuration

---

## Common Issues and Solutions

### Issue 1: Service Can't Connect to Config Server

**Error:** Connection refused or timeout

**Solutions:**
- Make sure Config Server is running
- Check the URL in bootstrap.properties
- Check firewall settings
- Verify port 8888 is accessible

### Issue 2: Configuration Not Found

**Error:** Could not locate PropertySource

**Solutions:**
- Check spring.application.name matches config file name
- Verify config file exists in Git repository
- Check Git repository URL is correct
- Make sure file is committed and pushed

### Issue 3: Configuration Not Refreshing

**Solutions:**
- Add @RefreshScope to your class
- Enable actuator refresh endpoint
- Call /actuator/refresh endpoint
- For Bus: Make sure RabbitMQ/Kafka is running

---

## Best Practices

### 1. Use Git for Configuration Storage

Git provides:
- Version control
- History of changes
- Easy rollback
- Collaboration

### 2. Separate Configs by Environment

Use profiles:
- dev: Development environment
- test: Testing environment
- prod: Production environment

### 3. Encrypt Sensitive Data

Never store passwords, API keys, or secrets in plain text. Always encrypt them.

### 4. Use Default Values

Always provide default values in @Value:

\`\`\`java
@Value("\${app.message:Hello World}")
\`\`\`

If config is missing, uses default.

### 5. Version Control Your Configs

Commit all configuration changes to Git. This provides:
- Audit trail
- Easy rollback
- Team collaboration

---

## Summary

Spring Cloud Config Server provides centralized configuration management:

**Benefits:**
- Single source of truth for configuration
- Easy to update configurations
- Environment-specific configs
- Version control for configurations
- Encryption support

**Key Concepts:**
- Config Server reads from Git
- Services connect via bootstrap.properties
- Use @RefreshScope for dynamic updates
- Use profiles for different environments
- Encrypt sensitive data

**What's Next?**

Now that you understand Config Server:

1. Learn [Service Discovery with Eureka](/tutorial/spring-cloud-eureka) to find services
2. Set up [API Gateway](/tutorial/spring-cloud-api-gateway) as single entry point
3. Master [Load Balancing](/tutorial/spring-cloud-load-balancing) for distributing requests
4. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for inter-service communication
`,
  code: `// Config Server Application
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

// Client Service with Config Server
package com.example.userservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class UserController {
    
    @Value("\${app.name}")
    private String appName;
    
    @Value("\${server.port}")
    private String port;
    
    @GetMapping("/info")
    public String getInfo() {
        return appName + " running on port " + port;
    }
}`
};

export default springCloudConfigServer;






