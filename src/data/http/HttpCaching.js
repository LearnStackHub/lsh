const httpCaching = {
  id: 'http-caching',
  title: 'HTTP Caching - Browser Caching, Cache-Control, ETag',
  description: 'Learn HTTP caching: browser caching, Cache-Control headers, ETag, Last-Modified, cache validation, and performance optimization strategies',
  content: `
# HTTP Caching — Complete Guide

HTTP caching is a critical performance optimization technique that stores responses to reduce server load and improve response times. Understanding caching is essential for building fast, scalable web applications and APIs.

---

## What is HTTP Caching?

**HTTP caching** stores HTTP responses so they can be reused for subsequent requests. Instead of fetching the same resource repeatedly, the browser or intermediate caches can serve cached copies.

### Why Caching Matters

**Without Caching:**
\`\`\`
Request 1: GET /api/users/123 → Server processes → 500ms
Request 2: GET /api/users/123 → Server processes → 500ms
Request 3: GET /api/users/123 → Server processes → 500ms
Total: 1500ms, 3 server requests
\`\`\`

**With Caching:**
\`\`\`
Request 1: GET /api/users/123 → Server processes → 500ms (cached)
Request 2: GET /api/users/123 → Cache serves → 5ms
Request 3: GET /api/users/123 → Cache serves → 5ms
Total: 510ms, 1 server request
\`\`\`

**Benefits:**
- **Faster Response Times**: Cached responses are served instantly
- **Reduced Server Load**: Fewer requests to origin server
- **Lower Bandwidth**: Less data transferred
- **Better User Experience**: Pages load faster

---

## Types of Caching

### 1. Browser Cache

**Location**: User's browser

**Stored**: HTML, CSS, JavaScript, images, API responses

**Lifetime**: Until expiration or manual clear

**Example:**
\`\`\`
Browser → Caches /api/users/123
         → Next request served from cache
\`\`\`

### 2. Proxy Cache

**Location**: Intermediate server (CDN, reverse proxy)

**Stored**: Responses from origin server

**Lifetime**: Based on cache headers

**Example:**
\`\`\`
Client → Proxy Cache → Origin Server
        (if cached, proxy serves directly)
\`\`\`

### 3. CDN Cache

**Location**: Content Delivery Network (geographically distributed)

**Stored**: Static assets, API responses

**Lifetime**: Based on cache headers

**Example:**
\`\`\`
User in US → US CDN node (cached)
User in EU → EU CDN node (cached)
\`\`\`

---

## Cache-Control Header

The **Cache-Control** header is the primary mechanism for controlling caching behavior.

### Directives

#### Public vs Private

**Public:**
\`\`\`http
Cache-Control: public, max-age=3600
\`\`\`
- Can be cached by any cache (browser, CDN, proxy)
- Use for: Public content, static assets

**Private:**
\`\`\`http
Cache-Control: private, max-age=3600
\`\`\`
- Only browser can cache
- Use for: User-specific content, personal data

#### Max-Age

**Purpose**: How long to cache (in seconds)

**Example:**
\`\`\`http
Cache-Control: public, max-age=3600
\`\`\`
- Cache for 3600 seconds (1 hour)

**Common Values:**
- \`max-age=60\` - 1 minute (dynamic content)
- \`max-age=3600\` - 1 hour (semi-static)
- \`max-age=86400\` - 1 day (static content)
- \`max-age=31536000\` - 1 year (very static)

#### No-Cache

**Purpose**: Must revalidate before use

**Example:**
\`\`\`http
Cache-Control: no-cache
\`\`\`
- Cache can store, but must check with server first
- Use for: Content that changes but not frequently

#### No-Store

**Purpose**: Don't cache at all

**Example:**
\`\`\`http
Cache-Control: no-store
\`\`\`
- Never cache this response
- Use for: Sensitive data, personal information

#### Must-Revalidate

**Purpose**: Must check with server after expiration

**Example:**
\`\`\`http
Cache-Control: must-revalidate, max-age=3600
\`\`\`
- After 1 hour, must check with server
- Use for: Important content that must be fresh

#### S-Maxage

**Purpose**: Max-age for shared caches (CDN, proxy)

**Example:**
\`\`\`http
Cache-Control: public, max-age=3600, s-maxage=7200
\`\`\`
- Browser caches for 1 hour
- CDN caches for 2 hours

---

## ETag (Entity Tag)

**ETag** is a unique identifier for a specific version of a resource. It enables cache validation.

### How ETag Works

\`\`\`
1. Server sends response with ETag:
   ETag: "abc123"

2. Browser caches response with ETag

3. Next request, browser sends:
   If-None-Match: "abc123"

4. Server checks:
   - If resource unchanged → 304 Not Modified
   - If resource changed → 200 OK with new ETag
\`\`\`

### Example

**First Request:**
\`\`\`http
GET /api/users/123 HTTP/1.1

HTTP/1.1 200 OK
ETag: "abc123"
Content-Type: application/json

{
  "id": 123,
  "name": "Dattu p"
}
\`\`\`

**Second Request (Resource Unchanged):**
\`\`\`http
GET /api/users/123 HTTP/1.1
If-None-Match: "abc123"

HTTP/1.1 304 Not Modified
ETag: "abc123"
\`\`\`

**Second Request (Resource Changed):**
\`\`\`http
GET /api/users/123 HTTP/1.1
If-None-Match: "abc123"

HTTP/1.1 200 OK
ETag: "xyz789"
Content-Type: application/json

{
  "id": 123,
  "name": " Dattu Updated"
}
\`\`\`

### Generating ETags

**Weak ETag:**
\`\`\`http
ETag: W/"abc123"
\`\`\`
- Content semantically equivalent
- Can differ in representation

**Strong ETag:**
\`\`\`http
ETag: "abc123"
\`\`\`
- Content byte-for-byte identical
- Default for most cases

---

## Last-Modified Header

**Last-Modified** indicates when the resource was last changed. Used with \`If-Modified-Since\` for cache validation.

### How It Works

\`\`\`
1. Server sends:
   Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT

2. Browser caches with date

3. Next request, browser sends:
   If-Modified-Since: Wed, 21 Feb 2026 10:00:00 GMT

4. Server checks:
   - If unchanged → 304 Not Modified
   - If changed → 200 OK with new Last-Modified
\`\`\`

### Example

**First Request:**
\`\`\`http
GET /api/users/123 HTTP/1.1

HTTP/1.1 200 OK
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
Content-Type: application/json

{
  "id": 123,
  "name": "Dattu p"
}
\`\`\`

**Second Request:**
\`\`\`http
GET /api/users/123 HTTP/1.1
If-Modified-Since: Wed, 21 Feb 2026 10:00:00 GMT

HTTP/1.1 304 Not Modified
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

---

## Cache Validation

Cache validation checks if cached content is still fresh.

### Validation Methods

#### 1. Expiration-Based

**How**: Check if cache entry expired

**Example:**
\`\`\`http
Cache-Control: max-age=3600
\`\`\`
- Cache valid for 1 hour
- After 1 hour, must revalidate

#### 2. ETag Validation

**How**: Compare ETag with server

**Example:**
\`\`\`http
If-None-Match: "abc123"
\`\`\`
- Server returns 304 if ETag matches
- Server returns 200 if ETag differs

#### 3. Last-Modified Validation

**How**: Compare Last-Modified date

**Example:**
\`\`\`http
If-Modified-Since: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`
- Server returns 304 if unchanged
- Server returns 200 if modified

---

## Caching Strategies

### 1. Cache-First (Aggressive Caching)

**Strategy**: Cache for long time, rarely revalidate

**Use For**: Static assets, public content

**Example:**
\`\`\`http
Cache-Control: public, max-age=31536000
\`\`\`
- Cache for 1 year
- Use for: Images, CSS, JavaScript

### 2. Revalidate (Balanced)

**Strategy**: Cache but always revalidate

**Use For**: Content that changes but not frequently

**Example:**
\`\`\`http
Cache-Control: no-cache
ETag: "abc123"
\`\`\`
- Cache stores but checks with server
- Use for: User profiles, product listings

### 3. No Cache (Dynamic)

**Strategy**: Never cache

**Use For**: Personal data, real-time content

**Example:**
\`\`\`http
Cache-Control: no-store
\`\`\`
- Never cache
- Use for: Bank balances, personal messages

### 4. Stale-While-Revalidate

**Strategy**: Serve stale content while revalidating

**Use For**: Content where freshness is less critical

**Example:**
\`\`\`http
Cache-Control: max-age=3600, stale-while-revalidate=86400
\`\`\`
- Serve cached for 1 hour
- After 1 hour, serve stale while fetching fresh
- Use for: News articles, blog posts

---

## Real-World Examples

### Example 1: Static Assets

**CSS File:**
\`\`\`http
GET /styles.css HTTP/1.1

HTTP/1.1 200 OK
Cache-Control: public, max-age=31536000
ETag: "css-v1.2.3"
Content-Type: text/css

/* CSS content */
\`\`\`
- Cache for 1 year (static, rarely changes)
- ETag for version validation

### Example 2: API Response

**User Profile:**
\`\`\`http
GET /api/users/123 HTTP/1.1

HTTP/1.1 200 OK
Cache-Control: private, max-age=300
ETag: "user-123-v5"
Content-Type: application/json

{
  "id": 123,
  "name": "Dattu p"
}
\`\`\`
- Cache for 5 minutes (changes occasionally)
- Private (user-specific)
- ETag for validation

### Example 3: Dynamic Content

**Real-Time Data:**
\`\`\`http
GET /api/balance HTTP/1.1

HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, must-revalidate
Content-Type: application/json

{
  "balance": 1234.56
}
\`\`\`
- Never cache (sensitive, real-time)
- Always fetch fresh

---

## Cache Invalidation

Cache invalidation removes cached content when it's no longer valid.

### Methods

#### 1. Time-Based Expiration

**How**: Set short max-age

**Example:**
\`\`\`http
Cache-Control: max-age=60
\`\`\`
- Cache expires after 1 minute
- Automatically invalidated

#### 2. Version-Based

**How**: Change URL when content changes

**Example:**
\`\`\`
/styles.css → /styles.v1.css
/styles.css → /styles.v2.css (new version)
\`\`\`
- Old cache becomes invalid (different URL)
- New version cached separately

#### 3. ETag Change

**How**: Change ETag when content changes

**Example:**
\`\`\`
ETag: "abc123" → ETag: "xyz789"
\`\`\`
- Browser detects ETag change
- Fetches new content

#### 4. Manual Invalidation

**How**: Programmatically clear cache

**Example:**
\`\`\`java
// Invalidate cache for user 123
cacheService.invalidate("user:123");
\`\`\`

---

## Best Practices

### 1. Cache Static Assets Aggressively

**Static files** (CSS, JS, images):
\`\`\`http
Cache-Control: public, max-age=31536000
\`\`\`
- Cache for 1 year
- Use versioned URLs for updates

### 2. Cache API Responses Appropriately

**Public API:**
\`\`\`http
Cache-Control: public, max-age=3600
ETag: "resource-version"
\`\`\`

**Private API:**
\`\`\`http
Cache-Control: private, max-age=300
\`\`\`

### 3. Always Use ETag or Last-Modified

**Enable validation:**
\`\`\`http
ETag: "abc123"
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`
- Allows efficient revalidation
- Reduces bandwidth

### 4. Set Appropriate Expiration

**Guidelines:**
- Static assets: 1 year
- Semi-static: 1 hour to 1 day
- Dynamic: 5 minutes to 1 hour
- Real-time: No cache

### 5. Use Versioned URLs for Static Assets

**Instead of:**
\`\`\`
/styles.css
\`\`\`

**Use:**
\`\`\`
/styles.v1.2.3.css
/styles-abc123.css (hash-based)
\`\`\`
- Enables long caching
- Easy invalidation (new URL)

---

## Common Issues

### 1. Stale Content

**Problem**: Users see old content

**Causes:**
- Too long max-age
- Cache not invalidated

**Solution**: Shorter max-age, proper invalidation

### 2. Cache Not Working

**Problem**: Content always fetched from server

**Causes:**
- No-cache or no-store
- Cache-Control missing
- Browser cache disabled

**Solution**: Check cache headers, enable caching

### 3. Private Content Cached Publicly

**Problem**: User data cached in CDN

**Causes:**
- Public directive on private content

**Solution**: Use private directive

---

## Industry Examples

### Google

**Static Assets:**
\`\`\`http
Cache-Control: public, max-age=31536000
\`\`\`
- 1 year cache for CSS/JS
- Versioned URLs

### GitHub

**API Responses:**
\`\`\`http
Cache-Control: private, max-age=60
ETag: "abc123"
\`\`\`
- Short cache with validation
- Private for user data

### Amazon

**Product Pages:**
\`\`\`http
Cache-Control: public, max-age=300
\`\`\`
- 5-minute cache
- CDN caching

---

## Summary

HTTP caching improves performance:

- **Types**: Browser, proxy, CDN
- **Headers**: Cache-Control, ETag, Last-Modified
- **Strategies**: Cache-first, revalidate, no-cache
- **Validation**: ETag, Last-Modified
- **Best Practices**: Appropriate expiration, validation, versioning

**Important points:**
- Cache static assets aggressively
- Use ETag/Last-Modified for validation
- Set appropriate expiration times
- Use private for user-specific content
- Version URLs for long caching

Understanding caching is essential for:
- Performance optimization
- Reducing server load
- Improving user experience
- Scaling applications
- Reducing bandwidth costs

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between max-age and Expires?

**max-age** is relative (seconds from now). **Expires** is absolute (specific date/time). Use max-age for modern applications.

### 2. When should I use ETag vs Last-Modified?

**ETag** is more flexible (works with any change detection). **Last-Modified** is simpler but limited to date-based changes. Use ETag when possible.

### 3. What is the difference between no-cache and no-store?

**no-cache** allows caching but requires revalidation. **no-store** prevents any caching. Use no-store for sensitive data.

### 4. How do I invalidate a cached response?

**Methods:**
- Wait for expiration
- Change URL (versioning)
- Change ETag
- Programmatically clear cache

### 5. Can I cache POST requests?

**Generally no**. POST requests are not cacheable by default. Use GET for cacheable resources.

### 6. What is stale-while-revalidate?

**Strategy** that serves stale content while fetching fresh content in background. Improves perceived performance.

### 7. How long should I cache API responses?

**Depends on content:**
- Static: 1 year
- Semi-static: 1 hour to 1 day
- Dynamic: 5 minutes to 1 hour
- Real-time: No cache

### 8. What is the difference between public and private caching?

**public** allows any cache (browser, CDN, proxy). **private** only allows browser cache. Use private for user-specific content.

### 9. How do I handle cache invalidation in distributed systems?

**Options:**
- Cache versioning (URL-based)
- Event-based invalidation
- TTL-based expiration
- Distributed cache (Redis)

### 10. Can I cache responses with different status codes?

**200 OK**: Cacheable
**201 Created**: Usually not cacheable
**304 Not Modified**: Cacheable (validation response)
**4xx/5xx**: Usually not cacheable
  `,
  code: `// HTTP Caching - Complete Examples

// Example 1: Setting Cache Headers (Java - Spring Boot)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    String etag = generateETag(user);
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .eTag(etag)
        .lastModified(user.getUpdatedAt())
        .body(user);
}

// Example 2: Cache Validation with ETag (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch
) {
    User user = userService.findById(id);
    String etag = generateETag(user);
    
    // Check if resource not modified
    if (etag.equals(ifNoneMatch)) {
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
            .eTag(etag)
            .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
            .build(); // 304 Not Modified
    }
    
    return ResponseEntity.ok()
        .eTag(etag)
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .body(user);
}

// Example 3: Cache Validation with Last-Modified (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "If-Modified-Since", required = false) String ifModifiedSince
) {
    User user = userService.findById(id);
    Date lastModified = user.getUpdatedAt();
    
    if (ifModifiedSince != null) {
        Date ifModifiedSinceDate = parseDate(ifModifiedSince);
        if (lastModified.before(ifModifiedSinceDate) || 
            lastModified.equals(ifModifiedSinceDate)) {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                .lastModified(lastModified.getTime())
                .build(); // 304 Not Modified
        }
    }
    
    return ResponseEntity.ok()
        .lastModified(lastModified.getTime())
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .body(user);
}

// Example 4: Static Asset Caching (Java)
@GetMapping("/styles/{version}/style.css")
public ResponseEntity<Resource> getStyles(@PathVariable String version) {
    Resource resource = new ClassPathResource("static/styles.css");
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(31536000, TimeUnit.SECONDS)) // 1 year
        .contentType(MediaType.valueOf("text/css"))
        .body(resource);
}

// Example 5: Private Caching (Java)
@GetMapping("/api/profile")
public ResponseEntity<Profile> getProfile(@AuthenticationPrincipal User user) {
    Profile profile = profileService.getProfile(user.getId());
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(300, TimeUnit.SECONDS).cachePrivate()) // 5 min, private
        .body(profile);
}

// Example 6: No Cache (Java)
@GetMapping("/api/balance")
public ResponseEntity<Balance> getBalance(@AuthenticationPrincipal User user) {
    Balance balance = balanceService.getBalance(user.getId());
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.noStore().mustRevalidate())
        .body(balance);
}

// Example 7: ETag Generation (Java)
public String generateETag(Object object) {
    try {
        String data = objectMapper.writeValueAsString(object);
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(data.getBytes());
        return "\"" + Base64.getEncoder().encodeToString(hash) + "\"";
    } catch (Exception e) {
        return "\"" + UUID.randomUUID().toString() + "\"";
    }
}

// Example 8: Cache Invalidation (Java)
@Service
public class CacheService {
    
    @Autowired
    private CacheManager cacheManager;
    
    public void invalidateUser(Long userId) {
        cacheManager.getCache("users").evict("user:" + userId);
    }
    
    public void invalidateAllUsers() {
        cacheManager.getCache("users").clear();
    }
}

// Example 9: Stale-While-Revalidate (Java)
@GetMapping("/api/news")
public ResponseEntity<List<News>> getNews() {
    List<News> news = newsService.getLatestNews();
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS)
            .cachePublic()
            .staleWhileRevalidate(86400, TimeUnit.SECONDS)) // 1 day stale
        .body(news);
}

// Example 10: Node.js - Express Caching
const express = require('express');
const app = express();

// Static files with long cache
app.use('/static', express.static('public', {
    maxAge: 31536000, // 1 year
    etag: true,
    lastModified: true
}));

// API with short cache
app.get('/api/users/:id', (req, res) => {
    const user = getUserById(req.params.id);
    const etag = generateETag(user);
    
    // Check If-None-Match
    if (req.headers['if-none-match'] === etag) {
        return res.status(304).end();
    }
    
    res.set({
        'Cache-Control': 'private, max-age=300',
        'ETag': etag,
        'Last-Modified': user.updatedAt.toUTCString()
    });
    
    res.json(user);
});

// Example 11: Cache-Control Builder
public class CacheControlBuilder {
    private long maxAge = -1;
    private boolean isPublic = false;
    private boolean isPrivate = false;
    private boolean noCache = false;
    private boolean noStore = false;
    private boolean mustRevalidate = false;
    
    public CacheControlBuilder maxAge(long seconds) {
        this.maxAge = seconds;
        return this;
    }
    
    public CacheControlBuilder cachePublic() {
        this.isPublic = true;
        this.isPrivate = false;
        return this;
    }
    
    public CacheControlBuilder cachePrivate() {
        this.isPrivate = true;
        this.isPublic = false;
        return this;
    }
    
    public String build() {
        StringBuilder sb = new StringBuilder();
        
        if (isPublic) sb.append("public, ");
        if (isPrivate) sb.append("private, ");
        if (noCache) sb.append("no-cache, ");
        if (noStore) sb.append("no-store, ");
        if (mustRevalidate) sb.append("must-revalidate, ");
        if (maxAge >= 0) sb.append("max-age=").append(maxAge);
        
        return sb.toString().replaceAll(", $", "");
    }
}

// Usage
String cacheControl = new CacheControlBuilder()
    .cachePublic()
    .maxAge(3600)
    .build(); // "public, max-age=3600"`

};

export default httpCaching;

