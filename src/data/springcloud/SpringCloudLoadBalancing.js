const springCloudLoadBalancing = {
  id: 'spring-cloud-load-balancing',
  title: 'Load Balancing in Spring Cloud',
  description: 'Learn how to implement client-side load balancing with Spring Cloud LoadBalancer - round robin, custom strategies, and integration with Eureka',
  content: `
# Load Balancing in Spring Cloud

When you have multiple instances of the same service running, you need to distribute requests across them. This is called load balancing.

Let me explain how load balancing works and how to implement it with Spring Cloud.

---

## What is Load Balancing?

**The Problem:**

You have Product Service running on:
- Instance 1: http://server1:8082
- Instance 2: http://server2:8082
- Instance 3: http://server3:8082

When Order Service needs to call Product Service, which instance should it call?

**The Solution:**

Load balancing distributes requests across all instances. Instead of calling one instance, requests are distributed evenly (or based on a strategy).

**Benefits:**
- Better performance (spread load)
- High availability (if one instance fails, others continue)
- Scalability (add more instances to handle more load)

---

## Client-Side Load Balancing

In client-side load balancing, the client (service making the call) chooses which instance to call.

**How It Works:**
1. Service A needs to call Service B
2. Service A asks Eureka: "Where are all instances of Service B?"
3. Eureka returns list: [instance1, instance2, instance3]
4. Service A chooses one instance (using a strategy)
5. Service A calls the chosen instance

**Spring Cloud uses client-side load balancing.**

---

## Spring Cloud LoadBalancer

Spring Cloud LoadBalancer is the current library for load balancing. It replaced Ribbon (which is deprecated).

### Add Dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
\`\`\`

This dependency is often included automatically when you use Eureka client or Gateway.

---

## Using LoadBalancer with RestTemplate

### Step 1: Create LoadBalanced RestTemplate

\`\`\`java
package com.example.orderservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
\`\`\`

The @LoadBalanced annotation enables load balancing for this RestTemplate.

### Step 2: Use Service Name Instead of URL

\`\`\`java
package com.example.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Product getProduct(Long id) {
        // Use service name instead of IP address
        return restTemplate.getForObject(
            "http://product-service/api/products/" + id, 
            Product.class
        );
    }
}
\`\`\`

**How It Works:**
1. RestTemplate sees "product-service" (not an IP)
2. LoadBalancer intercepts the call
3. LoadBalancer asks Eureka for product-service instances
4. LoadBalancer chooses an instance (round robin by default)
5. RestTemplate calls the chosen instance

---

## Using LoadBalancer with WebClient

WebClient is the reactive (non-blocking) alternative to RestTemplate.

### Step 1: Create LoadBalanced WebClient Builder

\`\`\`java
package com.example.orderservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    
    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
\`\`\`

### Step 2: Use WebClient

\`\`\`java
package com.example.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class OrderService {
    
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

WebClient works the same way - uses service name, LoadBalancer resolves it.

---

## Difference Between Ribbon and LoadBalancer

### Ribbon (Deprecated)

**What It Was:**
- Netflix Ribbon
- Older load balancing library
- Being phased out by Netflix

**Why It's Deprecated:**
- Not actively maintained
- Spring Cloud moving to own solutions
- LoadBalancer is simpler

### LoadBalancer (Current)

**What It Is:**
- Spring Cloud's own implementation
- Actively maintained
- Simpler API
- Better integration with Spring Cloud

**Migration:**
If you have Ribbon code, migrate to LoadBalancer. It's straightforward.

---

## Load Balancing Strategies

### Round Robin (Default)

Distributes requests evenly across instances: 1, 2, 3, 1, 2, 3...

**Example:**
- Request 1 → Instance 1
- Request 2 → Instance 2
- Request 3 → Instance 3
- Request 4 → Instance 1
- Request 5 → Instance 2

**When to Use:**
- All instances have similar capacity
- Requests are similar in complexity
- Default choice for most cases

### Random Load Balancing

Randomly chooses an instance.

**Implementation:**

\`\`\`java
package com.example.orderservice.config;

import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.cloud.client.loadbalancer.reactive.ReactorLoadBalancer;
import org.springframework.cloud.client.loadbalancer.reactive.ReactiveLoadBalancer;

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

**When to Use:**
- When you want true randomness
- Less common than round robin

### Weighted Load Balancing

Distribute based on instance capacity or weight.

**Example:**
- Instance 1: Weight 3 (handles 3 requests)
- Instance 2: Weight 2 (handles 2 requests)
- Instance 3: Weight 1 (handles 1 request)

**When to Use:**
- Instances have different capacities
- Some instances are more powerful

### Custom Strategy

You can implement your own load balancing strategy.

\`\`\`java
public class CustomLoadBalancer implements ReactorLoadBalancer<ServiceInstance> {
    
    @Override
    public Mono<Response<ServiceInstance>> choose(Request request) {
        List<ServiceInstance> instances = getInstances();
        
        // Your custom logic here
        // Example: Choose instance with least connections
        ServiceInstance selected = selectLeastLoaded(instances);
        
        return Mono.just(new DefaultResponse(selected));
    }
}
\`\`\`

---

## Load Balancing with Eureka

When using Eureka, LoadBalancer automatically discovers service instances.

### How It Works

1. Service registers with Eureka
2. Eureka maintains list of instances
3. LoadBalancer queries Eureka for instances
4. LoadBalancer chooses one instance
5. Request goes to chosen instance

### Configuration

\`\`\`properties
# Disable Ribbon (if present)
spring.cloud.loadbalancer.ribbon.enabled=false

# Eureka configuration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

That's it! LoadBalancer automatically uses Eureka for service discovery.

---

## Load Balancing without Eureka

You can use LoadBalancer without Eureka by configuring instances manually.

### Manual Configuration

\`\`\`properties
# Configure service instances manually
product-service.ribbon.listOfServers=http://localhost:8082,http://localhost:8083,http://localhost:8084
\`\`\`

**Note:** This uses Ribbon configuration format, but LoadBalancer can read it.

### Programmatic Configuration

\`\`\`java
@Configuration
public class ManualLoadBalancerConfig {
    
    @Bean
    public ServiceInstanceListSupplier serviceInstanceListSupplier() {
        return ServiceInstanceListSupplier.builder()
            .withDiscoveryClient()
            .withCaching()
            .build();
    }
}
\`\`\`

---

## Real-World Example

Let's see a complete example.

**Product Service (3 instances):**

Instance 1:
\`\`\`properties
spring.application.name=product-service
server.port=8082
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

Instance 2:
\`\`\`properties
spring.application.name=product-service
server.port=8083
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

Instance 3:
\`\`\`properties
spring.application.name=product-service
server.port=8084
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
\`\`\`

**Order Service Calling Product Service:**

\`\`\`java
@Configuration
public class Config {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Product getProduct(Long id) {
        // LoadBalancer automatically distributes across 3 instances
        return restTemplate.getForObject(
            "http://product-service/api/products/" + id,
            Product.class
        );
    }
}
\`\`\`

**What Happens:**
1. Order Service calls: http://product-service/api/products/123
2. LoadBalancer intercepts
3. LoadBalancer gets 3 instances from Eureka
4. LoadBalancer chooses one (round robin)
5. Request goes to chosen instance
6. Response returns to Order Service

---

## Monitoring Load Balancing

You can monitor which instances are being used.

### Logging Load Balancer Decisions

\`\`\`java
@Component
public class LoadBalancerLoggingFilter implements GlobalFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Log which instance was chosen
        return chain.filter(exchange);
    }
}
\`\`\`

### Using Actuator

\`\`\`properties
management.endpoints.web.exposure.include=*
\`\`\`

View load balancer stats at: http://localhost:8080/actuator

---

## Common Issues and Solutions

### Issue 1: Load Balancing Not Working

**Symptoms:** All requests go to same instance

**Solutions:**
- Verify @LoadBalanced annotation is present
- Check Eureka has multiple instances registered
- Verify service name is used (not IP)
- Check LoadBalancer dependency is included

### Issue 2: Service Name Not Resolved

**Symptoms:** UnknownHostException for service name

**Solutions:**
- Verify service is registered in Eureka
- Check service name matches exactly
- Verify Eureka client is enabled
- Check network connectivity to Eureka

---

## Best Practices

### 1. Always Use Service Names

Never hardcode IPs. Always use service names:
- Good: http://product-service/api/products
- Bad: http://192.168.1.100:8082/api/products

### 2. Use Round Robin by Default

Round robin is simple and works well for most cases. Only use custom strategies if you have a specific need.

### 3. Monitor Instance Health

Make sure unhealthy instances are removed from load balancing. Eureka handles this automatically.

### 4. Test with Multiple Instances

Always test with multiple instances to verify load balancing works.

---

## Summary

Load balancing distributes requests across multiple service instances:

**Key Concepts:**
- Client-side load balancing (Spring Cloud approach)
- Round robin by default
- Automatic with Eureka
- Works with RestTemplate and WebClient

**Benefits:**
- Better performance
- High availability
- Scalability

**What's Next?**

Now that you understand load balancing:

1. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for declarative REST clients
2. Master [Resilience4j](/tutorial/spring-cloud-resilience4j) for fault tolerance
3. Set up [Service Discovery](/tutorial/spring-cloud-eureka) to find services
4. Learn [API Gateway](/tutorial/spring-cloud-api-gateway) for routing
`,
  code: `// LoadBalanced RestTemplate
package com.example.orderservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// Using LoadBalanced RestTemplate
package com.example.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Product getProduct(Long id) {
        // Service name resolved by LoadBalancer
        return restTemplate.getForObject(
            "http://product-service/api/products/" + id,
            Product.class
        );
    }
}

// LoadBalanced WebClient
package com.example.orderservice.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    
    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}`
};

export default springCloudLoadBalancing;



