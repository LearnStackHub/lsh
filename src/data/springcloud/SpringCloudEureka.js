const springCloudEureka = {
  id: 'spring-cloud-eureka',
  title: 'Service Discovery with Eureka',
  description: 'Learn how to set up Eureka Server for service discovery in microservices architecture - register services, discover services, and handle service instances',
  content: `
# Service Discovery with Eureka

In a microservices architecture, services need to find each other. But services can be on different machines, have dynamic IPs, and scale up/down.

Let me explain how Eureka solves this problem.

---

## What is Service Registry?

**The Problem:**

Imagine you have these services:
- User Service running on server1:8081
- Product Service running on server2:8082
- Order Service running on server3:8083

Now, User Service needs to call Product Service. But:
- Product Service might move to a different server
- Product Service might have multiple instances (for load balancing)
- Product Service IP might change
- How does User Service know where Product Service is?

**The Solution:**

Service Discovery. Services register themselves with a registry (Eureka Server). When a service needs to call another, it asks the registry for the address.

**How It Works:**

1. Services start up
2. Services register themselves with Eureka Server
3. Eureka Server maintains a registry of all services
4. When Service A needs to call Service B, it asks Eureka: "Where is Service B?"
5. Eureka returns the address(es) of Service B
6. Service A calls Service B

---

## Why Service Discovery is Needed

### Without Service Discovery

**Hardcode IP Addresses:**
\`\`\`java
String productServiceUrl = "http://192.168.1.100:8082";
\`\`\`

**Problems:**
- If Product Service moves, code breaks
- If Product Service has multiple instances, can't use all
- Need to update code for every change

**Use Load Balancer IPs:**
\`\`\`java
String productServiceUrl = "http://loadbalancer:8082";
\`\`\`

**Problems:**
- Need to configure load balancer separately
- Adds another component to manage
- More complexity

### With Service Discovery

**Use Service Name:**
\`\`\`java
String productServiceUrl = "http://product-service";
\`\`\`

**Benefits:**
- Services register themselves automatically
- Eureka knows all instances
- Load balancing built-in
- No hardcoded IPs
- Services can move freely

---

## Client-Side vs Server-Side Discovery

### Client-Side Discovery

The client (service making the call) queries the registry and chooses an instance.

**How It Works:**
1. Service A needs to call Service B
2. Service A asks Eureka: "Where is Service B?"
3. Eureka returns list of Service B instances
4. Service A chooses one instance (or uses load balancer)
5. Service A calls the chosen instance

**Spring Cloud uses this approach.**

**Pros:**
- Simple for services
- No additional component needed
- Services have control

**Cons:**
- Each service needs Eureka client
- Services need to handle load balancing

### Server-Side Discovery

The client calls a load balancer, which queries the registry.

**How It Works:**
1. Service A needs to call Service B
2. Service A calls Load Balancer
3. Load Balancer asks Eureka: "Where is Service B?"
4. Load Balancer chooses instance
5. Load Balancer forwards request to instance

**Pros:**
- Simpler for services
- Centralized load balancing

**Cons:**
- Need load balancer component
- Additional network hop

---

## Setting Up Eureka Server

Let's create an Eureka Server step by step.

### Step 1: Create Eureka Server Project

Create a new Spring Boot project. Add this dependency in pom.xml:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

Also add Spring Cloud dependencies management:

\`\`\`xml
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

### Step 2: Enable Eureka Server

In your main application class:

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

The @EnableEurekaServer annotation tells Spring Boot to start an Eureka Server.

### Step 3: Configure Eureka Server

In your application.properties:

\`\`\`properties
server.port=8761

spring.application.name=eureka-server

# Don't register itself as a client
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
\`\`\`

**Explanation:**
- server.port=8761: Eureka Server runs on port 8761 (default)
- eureka.client.register-with-eureka=false: Eureka Server doesn't register itself (it's the registry, not a service)
- eureka.client.fetch-registry=false: Eureka Server doesn't fetch registry (it IS the registry)

### Step 4: Access Eureka Dashboard

Start the Eureka Server and visit: http://localhost:8761

You'll see the Eureka dashboard. Initially, it will show "No instances available" because no services have registered yet.

---

## Registering Services with Eureka

Now let's register your microservices with Eureka.

### Step 1: Add Dependency to Your Service

In your service's pom.xml:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

This dependency provides the Eureka client functionality.

### Step 2: Enable Eureka Client

In your service's main application class:

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

The @EnableEurekaClient annotation enables Eureka client functionality.

**Note:** In newer Spring Cloud versions, @EnableEurekaClient is optional if you have the dependency. But it's good to be explicit.

### Step 3: Configure Service

In your service's application.properties:

\`\`\`properties
spring.application.name=user-service
server.port=8081

# Eureka server location
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Instance configuration
eureka.instance.hostname=localhost
eureka.instance.prefer-ip-address=true
\`\`\`

**Explanation:**
- spring.application.name: This is the service name that Eureka will use
- eureka.client.service-url.defaultZone: Location of Eureka Server
- eureka.instance.prefer-ip-address=true: Use IP address instead of hostname

### Step 4: Verify Registration

1. Start Eureka Server
2. Start your service
3. Visit http://localhost:8761
4. You should see your service registered

The dashboard will show:
- Application name: user-service
- Status: UP
- Instance count: 1

---

## Instance Metadata

You can add custom metadata to service instances. This helps with routing and load balancing decisions.

### Adding Metadata

\`\`\`properties
eureka.instance.metadata-map.zone=us-east-1
eureka.instance.metadata-map.version=1.0.0
eureka.instance.metadata-map.environment=production
\`\`\`

### Using Metadata

Other services or load balancers can use this metadata to make routing decisions:

\`\`\`java
@Autowired
private DiscoveryClient discoveryClient;

public List<ServiceInstance> getInstancesInZone(String zone) {
    return discoveryClient.getInstances("user-service").stream()
        .filter(instance -> zone.equals(
            instance.getMetadata().get("zone")
        ))
        .collect(Collectors.toList());
}
\`\`\`

---

## Advanced Features

### Heartbeat Mechanism

Services send heartbeats to Eureka every 30 seconds (default). This tells Eureka: "I'm still alive."

**How It Works:**
1. Service registers with Eureka
2. Every 30 seconds, service sends heartbeat
3. Eureka receives heartbeat, knows service is alive
4. If Eureka doesn't receive heartbeat for 90 seconds, it removes the service

**Configure Heartbeat Interval:**

\`\`\`properties
# How often to send heartbeat (default: 30 seconds)
eureka.instance.lease-renewal-interval-in-seconds=30

# How long to wait before removing (default: 90 seconds)
eureka.instance.lease-expiration-duration-in-seconds=90
\`\`\`

### Self-Preservation Mode

If too many services fail to send heartbeats, Eureka assumes it's a network issue (not that all services are down) and enters self-preservation mode.

**In Self-Preservation Mode:**
- Eureka keeps all registrations
- Doesn't remove services even if heartbeats are missing
- Prevents accidental removal during network issues

**Disable Self-Preservation (Not Recommended):**

\`\`\`properties
eureka.server.enable-self-preservation=false
\`\`\`

**Better Approach:**
Keep it enabled. It protects you from network issues.

### Health Check Configuration

Eureka can use Spring Boot Actuator health endpoint to determine if a service is healthy.

**Enable Health Checks:**

\`\`\`properties
eureka.client.healthcheck.enabled=true
\`\`\`

**Add Actuator Dependency:**

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**How It Works:**
1. Eureka calls /actuator/health endpoint
2. If health check returns UP, service is registered
3. If health check returns DOWN, service is removed

### Service Deregistration

**Graceful Shutdown:**
When a service shuts down gracefully (like stopping the application), it deregisters itself from Eureka.

**Abrupt Shutdown:**
If a service crashes or is killed, Eureka removes it after missing heartbeats (90 seconds default).

**Force Deregistration:**

You can manually deregister a service:
DELETE http://localhost:8761/eureka/apps/user-service/instance-id

---

## Using Service Discovery in Code

Once services are registered, you can discover them in your code.

### Using DiscoveryClient

\`\`\`java
package com.example.orderservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }
    
    @GetMapping("/user-service-instances")
    public List<ServiceInstance> getUserServiceInstances() {
        return discoveryClient.getInstances("user-service");
    }
}
\`\`\`

### Using Service Name in URLs

With Spring Cloud LoadBalancer, you can use service names directly:

\`\`\`java
@Autowired
@LoadBalanced
private RestTemplate restTemplate;

public User getUser(Long id) {
    // Use service name instead of IP
    return restTemplate.getForObject(
        "http://user-service/api/users/" + id,
        User.class
    );
}
\`\`\`

Spring Cloud automatically resolves "user-service" to an actual instance.

---

## Real-World Example

Let's see a complete example with multiple services.

**Eureka Server Configuration:**

\`\`\`properties
server.port=8761
spring.application.name=eureka-server
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
\`\`\`

**User Service Configuration:**

\`\`\`properties
spring.application.name=user-service
server.port=8081
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

**Product Service Configuration:**

\`\`\`properties
spring.application.name=product-service
server.port=8082
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

**Order Service Calling Product Service:**

\`\`\`java
@Service
public class OrderService {
    
    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;
    
    public Product getProduct(Long productId) {
        // Service name is resolved by Eureka
        return restTemplate.getForObject(
            "http://product-service/api/products/" + productId,
            Product.class
        );
    }
}
\`\`\`

**How It Works:**
1. Order Service needs Product Service
2. Order Service asks Eureka: "Where is product-service?"
3. Eureka returns: "http://localhost:8082"
4. Order Service calls Product Service
5. Load balancing happens automatically if multiple instances exist

---

## Common Issues and Solutions

### Issue 1: Service Not Registering

**Symptoms:** Service doesn't appear in Eureka dashboard

**Solutions:**
- Check Eureka Server is running
- Verify eureka.client.service-url.defaultZone is correct
- Check service name matches in application.properties
- Verify @EnableEurekaClient is present
- Check network connectivity

### Issue 2: Service Shows as DOWN

**Symptoms:** Service appears in dashboard but status is DOWN

**Solutions:**
- Enable health checks: eureka.client.healthcheck.enabled=true
- Add actuator dependency
- Check /actuator/health endpoint works
- Verify service is actually running

### Issue 3: Service Removed After Some Time

**Symptoms:** Service registers but disappears after 90 seconds

**Solutions:**
- Check service is sending heartbeats
- Verify network connectivity
- Check firewall settings
- Increase lease expiration duration if needed

---

## Best Practices

### 1. Use Descriptive Service Names

Use clear, descriptive names:
- Good: user-service, product-service, order-service
- Bad: service1, service2, app1

### 2. Configure Proper Heartbeat Intervals

Don't make heartbeats too frequent (wastes resources) or too infrequent (slow failure detection).

Default 30 seconds is usually good.

### 3. Enable Health Checks

Always enable health checks so Eureka knows if services are actually healthy.

### 4. Use Multiple Eureka Servers (Production)

In production, run multiple Eureka Servers for high availability. They replicate registrations to each other.

### 5. Monitor Eureka Dashboard

Regularly check the Eureka dashboard to see:
- Which services are registered
- Service health status
- Instance counts

---

## Summary

Eureka provides service discovery for microservices:

**Key Concepts:**
- Services register themselves with Eureka Server
- Services discover each other by name
- Eureka maintains registry of all services
- Automatic health checking
- Built-in load balancing support

**Benefits:**
- No hardcoded IPs
- Services can move freely
- Automatic instance management
- Health monitoring
- Load balancing ready

**What's Next?**

Now that you understand service discovery:

1. Set up [API Gateway](/tutorial/spring-cloud-api-gateway) as single entry point
2. Learn [Load Balancing](/tutorial/spring-cloud-load-balancing) for distributing requests
3. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for inter-service communication
4. Master [Config Server](/tutorial/spring-cloud-config-server) for centralized configuration
`,
  code: `// Eureka Server
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

// Eureka Client Service
package com.example.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// Using Service Discovery
package com.example.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class UserController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private DiscoveryClient discoveryClient;
    
    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }
    
    public Product getProduct(Long id) {
        // Service name resolved by Eureka
        return restTemplate.getForObject(
            "http://product-service/api/products/" + id,
            Product.class
        );
    }
}`
};

export default springCloudEureka;






