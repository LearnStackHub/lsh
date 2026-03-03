const rateLimiting = {
  id: 'rate-limiting',
  title: 'API Rate Limiting - Throttling and Quotas',
  description: 'Learn API rate limiting: why rate limiting, throttling strategies, implementation, rate limit headers, and best practices for protecting APIs',
  content: `
# Rate Limiting — Complete Guide

Rate limiting protects APIs from abuse, ensures fair usage, and maintains service quality. Understanding rate limiting strategies and implementation is essential for building robust APIs.

---

## Why Rate Limiting?

**Problems Without Rate Limiting:**
- **DDoS Attacks**: Overwhelm server
- **Abuse**: Single user consumes all resources
- **Cost**: Uncontrolled API usage
- **Fairness**: Some users monopolize service

**Benefits:**
- **Protection**: Prevent abuse
- **Fair Usage**: Distribute resources
- **Cost Control**: Manage API costs
- **Quality**: Maintain service performance

---

## Rate Limiting Strategies

### 1. Fixed Window

**Limit requests per time window**

**Example:**
\`\`\`
100 requests per hour
\`\`\`

**Pros:**
- Simple
- Easy to understand

**Cons:**
- Burst at window start
- Uneven distribution

### 2. Sliding Window

**Limit requests in rolling window**

**Example:**
\`\`\`
100 requests in any 1-hour period
\`\`\`

**Pros:**
- More even distribution
- Better for bursts

**Cons:**
- More complex
- Higher memory usage

### 3. Token Bucket

**Tokens refill at fixed rate**

**Example:**
\`\`\`
Bucket: 100 tokens
Refill: 10 tokens/second
\`\`\`

**Pros:**
- Handles bursts
- Flexible

**Cons:**
- Complex implementation

### 4. Leaky Bucket

**Requests processed at fixed rate**

**Example:**
\`\`\`
Process: 10 requests/second
Queue: 100 requests max
\`\`\`

**Pros:**
- Smooth rate
- Queue management

**Cons:**
- Delays requests
- Queue overflow

---

## Implementation

### Java (Spring Boot)

**Using Bucket4j:**
\`\`\`java
@Component
public class RateLimiter {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    
    public boolean isAllowed(String key) {
        Bucket bucket = buckets.computeIfAbsent(key, k -> createBucket());
        return bucket.tryConsume(1);
    }
    
    private Bucket createBucket() {
        return Bucket4j.builder()
            .addLimit(Bandwidth.classic(100, Refill.intervally(100, Duration.ofHours(1))))
            .build();
    }
}
\`\`\`

### Node.js

**Using express-rate-limit:**
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

---

## Rate Limit Headers

**Standard Headers:**
\`\`\`http
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 99
X-Rate-Limit-Reset: 1642771200
Retry-After: 60
\`\`\`

**429 Response:**
\`\`\`http
HTTP/1.1 429 Too Many Requests
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1642771200
Retry-After: 60

{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later."
}
\`\`\`

---

## Best Practices

### 1. Set Appropriate Limits

**Based on use case:**
\`\`\`
Free tier: 100 requests/hour
Paid tier: 1000 requests/hour
Enterprise: Custom limits
\`\`\`

### 2. Return Rate Limit Info

**Always include headers:**
\`\`\`http
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 99
X-Rate-Limit-Reset: 1642771200
\`\`\`

### 3. Clear Error Messages

**429 Response:**
\`\`\`json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. 100 requests per hour allowed.",
  "retryAfter": 3600
}
\`\`\`

### 4. Different Limits per Endpoint

**Vary by endpoint:**
\`\`\`
GET /users: 100/hour
POST /users: 10/hour
DELETE /users: 5/hour
\`\`\`

### 5. Identify Users

**By:**
- API key
- IP address
- User ID
- Combination

---

## Summary

Rate limiting protects APIs:

- **Strategies**: Fixed window, sliding window, token bucket
- **Implementation**: Bucket4j, express-rate-limit, Redis
- **Headers**: X-Rate-Limit-*, Retry-After
- **Best Practices**: Appropriate limits, clear errors

**Important points:**
- Implement rate limiting
- Return rate limit headers
- Set appropriate limits
- Clear error messages
- Identify users properly

Rate limiting is essential for:
- API protection
- Fair usage
- Cost control
- Service quality
- Preventing abuse

---

## Frequently Asked Questions (FAQs)

### 1. What is rate limiting?

**Rate limiting** restricts number of requests a client can make in a time period. Prevents abuse and ensures fair usage.

### 2. How do I choose rate limit strategy?

**Fixed window** for simplicity. **Sliding window** for better distribution. **Token bucket** for burst handling.

### 3. What should rate limits be?

**Depends on use case**: Free tier (100/hour), Paid (1000/hour), Enterprise (custom). Consider API cost and usage patterns.

### 4. How do I identify users for rate limiting?

**Use**: API key, IP address, user ID, or combination. API key is most common for authenticated APIs.

### 5. What happens when limit is exceeded?

**Return 429 Too Many Requests** with Retry-After header. Include clear error message and rate limit info.

### 6. Should I rate limit all endpoints?

**Yes**, but with different limits. Read operations (higher limit), write operations (lower limit), delete (lowest limit).

### 7. How do I implement distributed rate limiting?

**Use Redis** or distributed cache. Store rate limit counters in shared storage accessible by all servers.

### 8. Can users see their rate limit?

**Yes**, return rate limit headers (X-Rate-Limit-*) in every response. Helps users manage their usage.

### 9. How do I handle rate limit bursts?

**Use token bucket** or **sliding window**. Allows some burst while maintaining overall rate limit.

### 10. Should I rate limit by IP or user?

**By user** (API key/user ID) for authenticated APIs. **By IP** for public endpoints. **Both** for maximum protection.
  `,
  code: `// Rate Limiting - Complete Examples

// Example 1: Java - Bucket4j
@Component
public class RateLimiter {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    
    public boolean isAllowed(String key) {
        Bucket bucket = buckets.computeIfAbsent(key, k -> createBucket());
        return bucket.tryConsume(1);
    }
    
    private Bucket createBucket() {
        return Bucket4j.builder()
            .addLimit(Bandwidth.classic(100, Refill.intervally(100, Duration.ofHours(1))))
            .build();
    }
}

// Example 2: Java - Rate Limit Interceptor
@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    @Autowired
    private RateLimiter rateLimiter;
    
    @Override
    public boolean preHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler) {
        String key = getRateLimitKey(request);
        
        if (!rateLimiter.isAllowed(key)) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("X-Rate-Limit-Limit", "100");
            response.setHeader("X-Rate-Limit-Remaining", "0");
            response.setHeader("Retry-After", "3600");
            return false;
        }
        
        // Set rate limit headers
        response.setHeader("X-Rate-Limit-Limit", "100");
        response.setHeader("X-Rate-Limit-Remaining", String.valueOf(rateLimiter.getRemaining(key)));
        return true;
    }
}

// Example 3: Node.js - express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// Example 4: Redis Rate Limiting
public boolean isAllowed(String key) {
    String count = redis.get("rate_limit:" + key);
    if (count == null) {
        redis.setex("rate_limit:" + key, 3600, "1");
        return true;
    }
    
    int current = Integer.parseInt(count);
    if (current >= 100) {
        return false;
    }
    
    redis.incr("rate_limit:" + key);
    return true;
}`
};

export default rateLimiting;

