const springCloudDistributedTracing = {
  id: 'spring-cloud-distributed-tracing',
  title: 'Distributed Tracing with Micrometer and Zipkin',
  description: 'Learn distributed tracing in Spring Boot 3 microservices using Micrometer Tracing, Zipkin, trace IDs, span IDs, log correlation, full dependencies, configuration, and realtime debugging flow.',
  content: `
# Distributed Tracing with Micrometer Tracing and Zipkin

In microservices, a single request might go through multiple services. Distributed tracing helps you see the complete path of a request across all services.

Modern Spring Boot 3 applications should use **Micrometer Tracing** for tracing. Older tutorials often teach Spring Cloud Sleuth, but Sleuth does not support Spring Boot 3.x. Sleuth's core tracing work moved into Micrometer Tracing, and Zipkin can still be used as the tracing UI/backend.

Use this rule:

| Spring Boot Version | Recommended Tracing |
|---|---|
| Spring Boot 2.x | Spring Cloud Sleuth |
| Spring Boot 3.x and newer | Micrometer Tracing + Zipkin/OpenTelemetry |

---

## What is Distributed Tracing?

**The Problem:**

In a monolith, when something goes wrong, you check one log file. In microservices, a request goes through multiple services:

1. Client → API Gateway
2. API Gateway → User Service
3. User Service → Product Service
4. Product Service → Database

If something fails, which service? Where? How long did each step take?

**The Solution:**

Distributed tracing tracks a request as it flows through multiple services. You can see:
- Which services were called
- How long each service took
- Where errors occurred
- The complete request path

**Example Request Flow:**

\`\`\`
Client Request
    │
    ▼
API Gateway (10ms)
    │
    ▼
User Service (50ms)
    │
    ├─► Product Service (2000ms) ← Slow!
    │       │
    │       ▼
    │   Database (100ms)
    │
    ▼
Response (2060ms total)
\`\`\`

Distributed tracing shows you this entire flow with timing information.

---

## Trace ID and Span ID

### Trace ID

Unique identifier for the entire request journey. Same across all services for one request.

**Example:**
- Trace ID: abc123
- This ID appears in logs from all services involved in the request

### Span ID

Unique identifier for each operation within a trace. Each service call creates a span.

**Example:**
- Trace ID: abc123
  - Span 1: API Gateway receives request (span-id: def456)
  - Span 2: User Service processes request (span-id: ghi789)
  - Span 3: Product Service called (span-id: jkl012)
  - Span 4: Database query (span-id: mno345)

### Correlation ID

Correlation ID is another term for Trace ID. It correlates all logs and spans for one request.

**In Logs:**
All logs for the same request have the same trace ID. You can search logs by trace ID to see the complete request flow.

---

## Integrating Micrometer Tracing

Micrometer Tracing adds trace and span IDs to HTTP requests, logs, and outgoing client calls. Spring Boot Actuator provides the auto-configuration.

### Step 1: Add Dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>
<dependency>
    <groupId>io.zipkin.reporter2</groupId>
    <artifactId>zipkin-reporter-brave</artifactId>
</dependency>
\`\`\`

These dependencies enable tracing and send spans to Zipkin using Brave.

### Step 2: View Traces in Logs

Your logs will now include trace information automatically:

**Before tracing:**
\`\`\`
2024-01-15 10:30:45.123 INFO - Processing request
\`\`\`

**After tracing:**
\`\`\`
2024-01-15 10:30:45.123 [user-service,abc123,def456] INFO - Processing request
\`\`\`

**Format:** [service-name,trace-id,span-id]

**Example Logs from Different Services:**

User Service:
\`\`\`
2024-01-15 10:30:45.123 [user-service,abc123,def456] INFO - Received request
2024-01-15 10:30:45.200 [user-service,abc123,def456] INFO - Calling product service
\`\`\`

Product Service:
\`\`\`
2024-01-15 10:30:45.250 [product-service,abc123,ghi789] INFO - Received request from user service
2024-01-15 10:30:47.250 [product-service,abc123,ghi789] INFO - Querying database
\`\`\`

Notice: Same trace ID (abc123) across both services, but different span IDs.

---

## Setting Up Zipkin

Zipkin is a distributed tracing system. It collects, stores, and visualizes traces.

### Step 1: Run Zipkin Server

**Using Docker (Easiest):**

\`\`\`bash
docker run -d -p 9411:9411 openzipkin/zipkin
\`\`\`

**Or Download JAR:**

Download from https://zipkin.io/pages/quickstart.html and run:

\`\`\`bash
java -jar zipkin.jar
\`\`\`

Zipkin runs on port 9411 by default.

### Step 2: Configure Zipkin Export

In each service, add:

In \`application.properties\`:

\`\`\`properties
management.tracing.sampling.probability=1.0
management.zipkin.tracing.endpoint=http://localhost:9411/api/v2/spans
\`\`\`

**Explanation:**
- \`management.tracing.sampling.probability=1.0\`: sample 100% of requests in development
- \`management.zipkin.tracing.endpoint\`: Zipkin span endpoint
- In production, reduce sampling, for example 0.1 for 10% traffic

### Step 3: View Traces

Visit: http://localhost:9411

You'll see the Zipkin UI where you can:
- Search for traces
- View trace timeline
- See service dependencies
- Analyze performance

---

## Viewing Traces in Zipkin

### Search Traces

**By Service:**
- Select service from dropdown
- Click "Find Traces"

**By Trace ID:**
- Enter trace ID in search box
- Click "Find Traces"

**By Time Range:**
- Select time range
- Click "Find Traces"

### Trace Timeline

Zipkin shows a timeline view:

\`\`\`
Service Timeline:
│
├─ API Gateway (10ms)
│
├─ User Service (50ms)
│   │
│   └─ Product Service (2000ms) ← Slow!
│       │
│       └─ Database (100ms)
│
Total: 2060ms
\`\`\`

You can see:
- Which services were called
- How long each took
- Parent-child relationships
- Where time was spent

### Service Dependencies

Zipkin shows a dependency graph:

\`\`\`
API Gateway
    │
    ├─► User Service
    │       │
    │       └─► Product Service
    │               │
    │               └─► Database
\`\`\`

This helps you understand service relationships.

---

## Log Correlation

All logs for the same request have the same trace ID. You can filter logs by trace ID to see the complete request flow.

### Searching Logs by Trace ID

**In Your Log Files:**

Search for trace ID: abc123

User Service logs:
\`\`\`
[user-service,abc123,def456] INFO - Received request
[user-service,abc123,def456] INFO - Calling product service
[user-service,abc123,def456] INFO - Response received
\`\`\`

Product Service logs:
\`\`\`
[product-service,abc123,ghi789] INFO - Received request
[product-service,abc123,ghi789] INFO - Querying database
[product-service,abc123,ghi789] INFO - Response sent
\`\`\`

**In ELK Stack:**

Search: traceId:abc123

You'll see all logs for that request across all services.

---

## Performance Bottleneck Analysis

Zipkin shows timing for each span. You can identify which service is slow:

**Example Trace:**

\`\`\`
Service          Duration
─────────────────────────
API Gateway      10ms
User Service     50ms
Product Service  2000ms  ← Bottleneck!
Database         100ms
─────────────────────────
Total            2060ms
\`\`\`

**Analysis:**
- Product Service takes 2000ms (97% of total time)
- This is the bottleneck
- Optimize Product Service to improve performance

**What to Check:**
- Database queries (slow queries?)
- External API calls (timeouts?)
- Business logic (inefficient code?)
- Resource constraints (CPU, memory?)

---

## Observability Basics

Observability = Monitoring + Logging + Tracing

### Monitoring

Metrics about your system:
- CPU usage
- Memory usage
- Request rate
- Error rate
- Response times

**Tools:** Prometheus, Grafana

### Logging

Event logs from your application:
- What happened
- When it happened
- Error messages
- Debug information

**Tools:** ELK Stack, Splunk

### Tracing

Request flow across services:
- Which services were called
- How long each took
- Where errors occurred

**Tools:** Zipkin, Jaeger

**Together:**
- Monitoring: System health
- Logging: What happened
- Tracing: How it happened

All three together give you complete visibility into your system.

---

## Real-World Example

Let's see a complete example with multiple services.

**Services:**
- API Gateway (port 8080)
- User Service (port 8081)
- Product Service (port 8082)

**Configuration (All Services):**

\`\`\`properties
management.tracing.sampling.probability=1.0
management.zipkin.tracing.endpoint=http://localhost:9411/api/v2/spans
\`\`\`

**Request Flow:**

1. Client calls: GET http://localhost:8080/api/users/123/orders
2. API Gateway receives request (trace-id: abc123, span-id: def456)
3. API Gateway calls User Service (trace-id: abc123, span-id: ghi789)
4. User Service calls Product Service (trace-id: abc123, span-id: jkl012)
5. Product Service queries database (trace-id: abc123, span-id: mno345)
6. Response flows back through all services

**In Zipkin:**

You'll see:
- Complete trace with all services
- Timing for each service
- Service dependencies
- Any errors

---

## Common Issues and Solutions

### Issue 1: Traces Not Appearing in Zipkin

**Symptoms:** Services running but no traces in Zipkin

**Solutions:**
- Check Zipkin server is running
- Verify \`management.zipkin.tracing.endpoint\` is correct
- Check network connectivity
- Verify \`management.tracing.sampling.probability\` is not 0

### Issue 2: Trace IDs Not Consistent

**Symptoms:** Different trace IDs in different services

**Solutions:**
- Verify Micrometer Tracing dependencies are in all services
- Check HTTP headers are being passed correctly
- Verify service-to-service calls use proper HTTP clients

### Issue 3: High Overhead

**Symptoms:** Tracing slows down services

**Solutions:**
- Reduce sampler.probability (use 0.1 for production)
- Use async sending to Zipkin
- Consider sampling strategies

---

## Best Practices

### 1. Use Sampling in Production

Don't trace 100% of requests in production. Use 10% (0.1) or less:

\`\`\`properties
management.tracing.sampling.probability=0.1
\`\`\`

### 2. Include Trace ID in Logs

Always include trace ID in your logs. Micrometer Tracing and Spring Boot logging correlation can add this automatically when tracing is enabled.

### 3. Use Structured Logging

Use JSON logs with trace ID for better correlation.

### 4. Monitor Trace Volume

Monitor how many traces you're sending. Too many can overwhelm Zipkin.

### 5. Set Appropriate Timeouts

Set timeouts for sending traces to Zipkin to avoid blocking requests.

---

## Summary

Distributed tracing with Micrometer Tracing and Zipkin provides:

**Key Features:**
- Automatic trace ID generation
- Span tracking across services
- Visualization in Zipkin
- Performance analysis
- Error tracking

**Benefits:**
- See complete request flow
- Identify bottlenecks
- Debug issues faster
- Understand service dependencies
- Improve performance

**What's Next?**

Now that you understand distributed tracing:

1. Set up [Centralized Logging with ELK](/tutorial/spring-cloud-elk) to correlate logs
2. Learn [Service Discovery](/tutorial/spring-cloud-eureka) for service location
3. Master [API Gateway](/tutorial/spring-cloud-api-gateway) for routing
4. Use [OpenFeign](/tutorial/spring-cloud-openfeign) for inter-service communication
`,
  code: `// Micrometer Tracing adds trace IDs to logs and outgoing requests
// Add dependencies and configuration, then keep normal service code clean.

// Example: Your existing code
@Service
public class OrderService {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    
    public Order createOrder(OrderRequest request) {
        // Trace ID is attached to this log by tracing/log correlation
        logger.info("Creating order for user: {}", request.getUserId());
        
        // Call another service
        Product product = productClient.getProduct(request.getProductId());
        
        // Trace ID is automatically passed to productClient
        // Both services will have same trace ID
        
        return order;
    }
}

// Logs will automatically include trace ID:
// [order-service,abc123,def456] INFO - Creating order for user: 123
// [product-service,abc123,ghi789] INFO - Received request

// Configuration
// application.properties
management.tracing.sampling.probability=1.0
management.zipkin.tracing.endpoint=http://localhost:9411/api/v2/spans`
};

export default springCloudDistributedTracing;






