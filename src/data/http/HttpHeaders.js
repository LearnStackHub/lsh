const httpHeaders = {
  id: 'http-headers',
  title: 'HTTP Headers - Complete Guide',
  description: 'Learn all HTTP headers: common request headers, response headers, authorization, content-type, caching headers, CORS headers, and custom headers',
  content: `
# HTTP Headers — Complete Guide

HTTP headers are key-value pairs that provide metadata about HTTP requests and responses. They control caching, authentication, content negotiation, security, and more. Understanding headers is essential for building robust APIs and web applications.

---

## What are HTTP Headers?

**HTTP headers** are additional information sent with HTTP requests and responses. They are metadata that tells the client or server how to handle the message.

### Structure

Headers are formatted as key-value pairs:

\`\`\`http
Header-Name: header-value
\`\`\`

**Example:**
\`\`\`http
Content-Type: application/json
Authorization: Bearer token123
Cache-Control: public, max-age=3600
\`\`\`

### Characteristics

- **Case-Insensitive**: Header names are case-insensitive
- **Multiple Values**: Some headers can have multiple values
- **Custom Headers**: You can create custom headers (usually prefixed with \`X-\`)

---

## Request Headers

Request headers are sent by the client to provide information about the request.

### Common Request Headers

#### Host

**Purpose**: Specifies the domain name of the server

**Required**: Yes (in HTTP/1.1)

**Example:**
\`\`\`http
Host: api.example.com
\`\`\`

**Why Important:**
- Enables virtual hosting (multiple sites on one server)
- Required for HTTP/1.1
- Used for routing requests

#### User-Agent

**Purpose**: Identifies the client application

**Example:**
\`\`\`http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0
\`\`\`

**Use Cases:**
- Server can provide different responses based on client
- Analytics and logging
- Compatibility handling

#### Accept

**Purpose**: Media types the client can handle

**Example:**
\`\`\`http
Accept: application/json, text/html, */*
\`\`\`

**Quality Values:**
\`\`\`http
Accept: application/json;q=0.9, text/html;q=0.8
\`\`\`

**Use Cases:**
- Content negotiation
- API versioning
- Format selection

#### Accept-Language

**Purpose**: Preferred languages for response

**Example:**
\`\`\`http
Accept-Language: en-US, en;q=0.9, fr;q=0.8
\`\`\`

**Use Cases:**
- Internationalization
- Localized content
- Multi-language APIs

#### Accept-Encoding

**Purpose**: Content encodings the client supports

**Example:**
\`\`\`http
Accept-Encoding: gzip, deflate, br
\`\`\`

**Use Cases:**
- Compression
- Bandwidth optimization
- Performance improvement

#### Authorization

**Purpose**: Authentication credentials

**Common Formats:**

**Bearer Token:**
\`\`\`http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

**Basic Auth:**
\`\`\`http
Authorization: Basic base64(username:password)
\`\`\`

**API Key:**
\`\`\`http
Authorization: ApiKey your-api-key-here
\`\`\`

#### Content-Type

**Purpose**: Media type of the request body

**Example:**
\`\`\`http
Content-Type: application/json; charset=utf-8
\`\`\`

**Common Values:**
- \`application/json\` - JSON data
- \`application/xml\` - XML data
- \`application/x-www-form-urlencoded\` - Form data
- \`multipart/form-data\` - File uploads

#### Content-Length

**Purpose**: Size of request body in bytes

**Example:**
\`\`\`http
Content-Length: 156
\`\`\`

#### If-None-Match

**Purpose**: Conditional request using ETag

**Example:**
\`\`\`http
If-None-Match: "abc123"
\`\`\`

**Use Case**: Cache validation - server returns 304 if resource hasn't changed

#### If-Modified-Since

**Purpose**: Conditional request using date

**Example:**
\`\`\`http
If-Modified-Since: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

**Use Case**: Cache validation - server returns 304 if resource hasn't been modified

#### Referer

**Purpose**: URL of the page that linked to this resource

**Example:**
\`\`\`http
Referer: https://example.com/page
\`\`\`

**Use Cases:**
- Analytics
- Security (CSRF protection)
- Logging

#### Origin

**Purpose**: Origin of the request (for CORS)

**Example:**
\`\`\`http
Origin: https://example.com
\`\`\`

**Use Case**: CORS preflight requests

---

## Response Headers

Response headers are sent by the server to provide information about the response.

### Common Response Headers

#### Content-Type

**Purpose**: Media type of the response body

**Example:**
\`\`\`http
Content-Type: application/json; charset=utf-8
\`\`\`

**Why Important:**
- Tells client how to parse response
- Browsers use it to render content
- APIs use it to format data

#### Content-Length

**Purpose**: Size of response body in bytes

**Example:**
\`\`\`http
Content-Length: 156
\`\`\`

**Why Important:**
- Client knows how much data to expect
- Helps with connection management
- Useful for progress indicators

#### Content-Encoding

**Purpose**: Encoding applied to response body

**Example:**
\`\`\`http
Content-Encoding: gzip
\`\`\`

**Common Values:**
- \`gzip\` - Gzip compression
- \`deflate\` - Deflate compression
- \`br\` - Brotli compression

#### Cache-Control

**Purpose**: Directives for caching

**Example:**
\`\`\`http
Cache-Control: public, max-age=3600, must-revalidate
\`\`\`

**Directives:**
- \`public\` - Can be cached by any cache
- \`private\` - Only browser can cache
- \`no-cache\` - Must revalidate before use
- \`no-store\` - Don't cache at all
- \`max-age=3600\` - Cache for 3600 seconds
- \`must-revalidate\` - Must check with server after expiry

#### ETag

**Purpose**: Entity tag for cache validation

**Example:**
\`\`\`http
ETag: "abc123def456"
\`\`\`

**Use Case**: Client sends in \`If-None-Match\` header to check if resource changed

#### Last-Modified

**Purpose**: Date when resource was last modified

**Example:**
\`\`\`http
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

**Use Case**: Client sends in \`If-Modified-Since\` header for cache validation

#### Location

**Purpose**: URL for redirects or created resources

**Example:**
\`\`\`http
HTTP/1.1 201 Created
Location: /api/users/123
\`\`\`

**Use Cases:**
- Redirects (3xx status codes)
- Created resources (201 status code)

#### Set-Cookie

**Purpose**: Sets a cookie in the browser

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
\`\`\`

**Attributes:**
- \`Path=/\` - Cookie path
- \`HttpOnly\` - Not accessible via JavaScript
- \`Secure\` - Only sent over HTTPS
- \`SameSite=Strict\` - CSRF protection

#### Access-Control-Allow-Origin

**Purpose**: CORS - which origins can access resource

**Example:**
\`\`\`http
Access-Control-Allow-Origin: https://example.com
\`\`\`

**Wildcard:**
\`\`\`http
Access-Control-Allow-Origin: *
\`\`\`

#### Access-Control-Allow-Methods

**Purpose**: CORS - allowed HTTP methods

**Example:**
\`\`\`http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
\`\`\`

#### Access-Control-Allow-Headers

**Purpose**: CORS - allowed request headers

**Example:**
\`\`\`http
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

#### Allow

**Purpose**: Allowed HTTP methods for resource

**Example:**
\`\`\`http
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST, PUT
\`\`\`

#### X-Frame-Options

**Purpose**: Prevents clickjacking attacks

**Example:**
\`\`\`http
X-Frame-Options: DENY
\`\`\`

**Values:**
- \`DENY\` - Never allow framing
- \`SAMEORIGIN\` - Only allow same origin
- \`ALLOW-FROM uri\` - Allow from specific URI

#### X-Content-Type-Options

**Purpose**: Prevents MIME type sniffing

**Example:**
\`\`\`http
X-Content-Type-Options: nosniff
\`\`\`

#### X-XSS-Protection

**Purpose**: Enables XSS filter in browser

**Example:**
\`\`\`http
X-XSS-Protection: 1; mode=block
\`\`\`

---

## Custom Headers

You can create custom headers, usually prefixed with \`X-\`:

### Common Custom Headers

#### X-API-Version

**Purpose**: API version

**Example:**
\`\`\`http
X-API-Version: 1.0
\`\`\`

#### X-Request-ID

**Purpose**: Unique identifier for request tracking

**Example:**
\`\`\`http
X-Request-ID: req-abc123def456
\`\`\`

#### X-Rate-Limit-Remaining

**Purpose**: Number of requests remaining

**Example:**
\`\`\`http
X-Rate-Limit-Remaining: 99
\`\`\`

#### X-Rate-Limit-Reset

**Purpose**: Time when rate limit resets

**Example:**
\`\`\`http
X-Rate-Limit-Reset: 1642771200
\`\`\`

#### X-Powered-By

**Purpose**: Server technology (often removed for security)

**Example:**
\`\`\`http
X-Powered-By: Express
\`\`\`

**Note**: Often removed to hide server technology

---

## Header Categories

### Content Negotiation Headers

**Request:**
- \`Accept\` - Response format preference
- \`Accept-Language\` - Language preference
- \`Accept-Encoding\` - Encoding preference

**Response:**
- \`Content-Type\` - Response format
- \`Content-Language\` - Response language
- \`Content-Encoding\` - Response encoding

### Caching Headers

**Request:**
- \`If-None-Match\` - ETag validation
- \`If-Modified-Since\` - Date validation

**Response:**
- \`Cache-Control\` - Caching directives
- \`ETag\` - Entity tag
- \`Last-Modified\` - Modification date
- \`Expires\` - Expiration date

### Authentication Headers

**Request:**
- \`Authorization\` - Credentials
- \`Cookie\` - Session cookies

**Response:**
- \`WWW-Authenticate\` - Authentication challenge
- \`Set-Cookie\` - Set cookies

### CORS Headers

**Request:**
- \`Origin\` - Request origin

**Response:**
- \`Access-Control-Allow-Origin\` - Allowed origins
- \`Access-Control-Allow-Methods\` - Allowed methods
- \`Access-Control-Allow-Headers\` - Allowed headers
- \`Access-Control-Allow-Credentials\` - Allow credentials
- \`Access-Control-Max-Age\` - Preflight cache time

### Security Headers

**Response:**
- \`X-Frame-Options\` - Clickjacking protection
- \`X-Content-Type-Options\` - MIME sniffing protection
- \`X-XSS-Protection\` - XSS protection
- \`Strict-Transport-Security\` - HSTS
- \`Content-Security-Policy\` - CSP

---

## Real-World Examples

### Example 1: API Request with Headers

\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com
User-Agent: MyApp/1.0
Accept: application/json
Accept-Language: en-US
Accept-Encoding: gzip, deflate
Authorization: Bearer token123
If-None-Match: "abc123"
\`\`\`

### Example 2: API Response with Headers

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 156
Content-Encoding: gzip
Cache-Control: public, max-age=3600
ETag: "abc123"
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
X-Request-ID: req-123456
X-Rate-Limit-Remaining: 99
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "id": 123,
  "name": "John Doe"
}
\`\`\`

### Example 3: CORS Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
\`\`\`

### Example 4: Cached Response

\`\`\`http
HTTP/1.1 304 Not Modified
Cache-Control: public, max-age=3600
ETag: "abc123"
Date: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

---

## Best Practices

### 1. Always Set Content-Type

Always set \`Content-Type\` header:
- \`application/json\` for JSON
- \`application/xml\` for XML
- \`text/html\` for HTML

### 2. Use Appropriate Cache Headers

Set cache headers based on content:
- Static content: Long cache time
- Dynamic content: Short or no cache
- Private content: \`private\` directive

### 3. Include Security Headers

Always include security headers:
- \`X-Frame-Options\`
- \`X-Content-Type-Options\`
- \`Strict-Transport-Security\` (for HTTPS)

### 4. Use Custom Headers for Metadata

Include useful metadata:
- Request IDs for tracking
- Rate limit information
- API version

### 5. Handle CORS Properly

Set CORS headers appropriately:
- Don't use \`*\` with credentials
- Specify allowed origins
- Include necessary methods and headers

---

## Industry Examples

### GitHub API Headers

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-GitHub-Media-Type: github.v3
X-Rate-Limit-Limit: 5000
X-Rate-Limit-Remaining: 4999
X-Rate-Limit-Reset: 1642771200
\`\`\`

### Stripe API Headers

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Request-Id: req_abc123
Stripe-Version: 2020-08-27
\`\`\`

### Twitter API Headers

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
x-rate-limit-limit: 300
x-rate-limit-remaining: 299
x-rate-limit-reset: 1642771200
\`\`\`

---

## Summary

HTTP headers are essential for:

- **Content Negotiation**: Accept, Content-Type
- **Caching**: Cache-Control, ETag, Last-Modified
- **Authentication**: Authorization, Set-Cookie
- **CORS**: Access-Control-* headers
- **Security**: X-Frame-Options, X-Content-Type-Options
- **Metadata**: Custom X-* headers

**Important points:**
- Headers provide metadata about requests/responses
- Always set appropriate Content-Type
- Use cache headers for performance
- Include security headers for protection
- Custom headers for useful metadata

Understanding headers is essential for:
- Building REST APIs
- Optimizing performance
- Implementing security
- Debugging issues
- Following best practices

---

## Frequently Asked Questions (FAQs)

### 1. Are HTTP header names case-sensitive?

**No**, header names are **case-insensitive**. \`Content-Type\`, \`content-type\`, and \`CONTENT-TYPE\` are all the same.

### 2. Can I create custom headers?

**Yes**, you can create custom headers. Convention is to prefix them with \`X-\` (e.g., \`X-API-Version\`, \`X-Request-ID\`).

### 3. What is the maximum size of HTTP headers?

There's no HTTP standard limit, but:
- **Browsers**: Usually 8-16 KB total
- **Servers**: Configurable (often 8-16 KB)
- **Best Practice**: Keep headers under 8 KB

### 4. What is the difference between Cache-Control and Expires?

**Cache-Control** is HTTP/1.1 and more flexible. **Expires** is HTTP/1.0 and uses absolute dates. Use Cache-Control for modern applications.

### 5. How do I set multiple values for a header?

Use comma-separated values:
\`\`\`http
Accept: application/json, text/html
\`\`\`

### 6. What is the purpose of the ETag header?

**ETag** (Entity Tag) is used for cache validation. Client sends it in \`If-None-Match\` header. If resource hasn't changed, server returns 304 Not Modified.

### 7. How do CORS headers work?

**CORS** (Cross-Origin Resource Sharing) headers allow browsers to make cross-origin requests:
- \`Access-Control-Allow-Origin\`: Which origins can access
- \`Access-Control-Allow-Methods\`: Which methods are allowed
- \`Access-Control-Allow-Headers\`: Which headers are allowed

### 8. What security headers should I always include?

Essential security headers:
- \`X-Frame-Options: DENY\` - Prevents clickjacking
- \`X-Content-Type-Options: nosniff\` - Prevents MIME sniffing
- \`Strict-Transport-Security\` - Forces HTTPS (HSTS)

### 9. What is the difference between Authorization and Cookie headers?

**Authorization** is for API authentication (tokens, API keys). **Cookie** is for session-based authentication (cookies set by server).

### 10. How do I handle header size limits?

If headers are too large:
- Use fewer custom headers
- Compress header values (if supported)
- Move data to request/response body
- Use query parameters instead
  `,
  code: `// HTTP Headers - Complete Examples

// Example 1: Setting Response Headers (Java - Spring Boot)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    
    return ResponseEntity.ok()
        .header("Content-Type", "application/json")
        .header("Cache-Control", "public, max-age=3600")
        .header("ETag", generateETag(user))
        .header("X-Request-ID", generateRequestId())
        .body(user);
}

// Example 2: Reading Request Headers (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("Authorization") String authHeader,
    @RequestHeader(value = "Accept", defaultValue = "application/json") String accept,
    @RequestHeader(value = "User-Agent", required = false) String userAgent
) {
    // Process headers
    User user = validateToken(authHeader);
    Data data = dataService.getData(user.getId());
    
    return ResponseEntity.ok()
        .header("Content-Type", accept)
        .body(data);
}

// Example 3: Cache Headers (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUserWithCache(
    @PathVariable Long id,
    @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch
) {
    User user = userService.findById(id);
    String etag = generateETag(user);
    
    if (etag.equals(ifNoneMatch)) {
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
            .eTag(etag)
            .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
            .build();
    }
    
    return ResponseEntity.ok()
        .eTag(etag)
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .body(user);
}

// Example 4: CORS Headers (Java)
@CrossOrigin(origins = "https://example.com", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/api")
public class ApiController {
    // Spring automatically adds CORS headers
}

// Or manually:
@GetMapping("/api/data")
public ResponseEntity<Data> getData() {
    Data data = dataService.getData();
    
    return ResponseEntity.ok()
        .header("Access-Control-Allow-Origin", "https://example.com")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .header("Access-Control-Allow-Credentials", "true")
        .body(data);
}

// Example 5: Security Headers (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData() {
    Data data = dataService.getData();
    
    return ResponseEntity.ok()
        .header("X-Frame-Options", "DENY")
        .header("X-Content-Type-Options", "nosniff")
        .header("X-XSS-Protection", "1; mode=block")
        .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        .body(data);
}

// Example 6: Custom Headers (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData() {
    Data data = dataService.getData();
    
    return ResponseEntity.ok()
        .header("X-API-Version", "1.0")
        .header("X-Request-ID", generateRequestId())
        .header("X-Rate-Limit-Remaining", "99")
        .header("X-Rate-Limit-Reset", String.valueOf(getResetTime()))
        .body(data);
}

// Example 7: Content Negotiation (Java)
@GetMapping(value = "/api/data", produces = {
    MediaType.APPLICATION_JSON_VALUE,
    MediaType.APPLICATION_XML_VALUE
})
public ResponseEntity<?> getData(
    @RequestHeader("Accept") String accept
) {
    Data data = dataService.getData();
    
    if (accept.contains("application/xml")) {
        return ResponseEntity.ok()
            .header("Content-Type", "application/xml")
            .body(convertToXml(data));
    }
    
    return ResponseEntity.ok()
        .header("Content-Type", "application/json")
        .body(data);
}

// Example 8: JavaScript - Reading Headers
async function getData() {
    const response = await fetch('/api/data');
    
    // Read headers
    const contentType = response.headers.get('Content-Type');
    const rateLimitRemaining = response.headers.get('X-Rate-Limit-Remaining');
    const etag = response.headers.get('ETag');
    
    const data = await response.json();
    return { data, contentType, rateLimitRemaining, etag };
}

// Example 9: JavaScript - Setting Request Headers
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
            'Accept': 'application/json',
            'X-Request-ID': generateRequestId()
        },
        body: JSON.stringify(userData)
    });
    
    return await response.json();
}

// Example 10: Header Filter/Interceptor (Java)
@Component
public class HeaderInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) {
        // Add security headers to all responses
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Request-ID", generateRequestId());
        
        return true;
    }
}

// Register interceptor
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Autowired
    private HeaderInterceptor headerInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(headerInterceptor);
    }
}

// Example 11: Conditional Requests (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch,
    @RequestHeader(value = "If-Modified-Since", required = false) String ifModifiedSince
) {
    User user = userService.findById(id);
    String etag = generateETag(user);
    
    // Check ETag
    if (ifNoneMatch != null && etag.equals(ifNoneMatch)) {
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
            .eTag(etag)
            .build();
    }
    
    // Check Last-Modified
    if (ifModifiedSince != null) {
        Date lastModified = user.getUpdatedAt();
        Date ifModifiedSinceDate = parseDate(ifModifiedSince);
        
        if (lastModified.before(ifModifiedSinceDate) || 
            lastModified.equals(ifModifiedSinceDate)) {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                .lastModified(lastModified.getTime())
                .build();
        }
    }
    
    return ResponseEntity.ok()
        .eTag(etag)
        .lastModified(user.getUpdatedAt().getTime())
        .body(user);
}`
};

export default httpHeaders;

