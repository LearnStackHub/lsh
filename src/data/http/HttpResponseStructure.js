const httpResponseStructure = {
  id: 'http-response-structure',
  title: 'HTTP Response Structure - Status Line, Headers, Body',
  description: 'Learn the complete structure of HTTP responses including status line, status codes, response headers, response body, and how to format proper responses',
  content: `
# HTTP Response Structure — Complete Guide

An HTTP response is how servers communicate back to clients. Understanding its structure is essential for building APIs, debugging issues, and ensuring proper communication between client and server.

---

## HTTP Response Components

An HTTP response consists of three main parts:

\`\`\`
┌─────────────────────────────────────┐
│  1. Status Line                      │
│     HTTP Version + Status Code       │
├─────────────────────────────────────┤
│  2. Response Headers                  │
│     Metadata about the response      │
├─────────────────────────────────────┤
│  3. Response Body (Optional)          │
│     The actual content/data           │
└─────────────────────────────────────┘
\`\`\`

---

## 1. Status Line

The **status line** is the first line of an HTTP response. It contains three parts:

\`\`\`http
HTTP/VERSION STATUS_CODE STATUS_MESSAGE
\`\`\`

### Components

1. **HTTP Version**: Protocol version (HTTP/1.1, HTTP/2, etc.)
2. **Status Code**: Three-digit number indicating result
3. **Status Message**: Human-readable description

### Example

\`\`\`http
HTTP/1.1 200 OK
\`\`\`

**Breakdown:**
- **Version**: \`HTTP/1.1\` - Using HTTP version 1.1
- **Status Code**: \`200\` - Success
- **Status Message**: \`OK\` - Request succeeded

### Common Status Lines

\`\`\`http
HTTP/1.1 200 OK
HTTP/1.1 201 Created
HTTP/1.1 400 Bad Request
HTTP/1.1 404 Not Found
HTTP/1.1 500 Internal Server Error
\`\`\`

---

## 2. Response Headers

Headers provide **metadata** about the response. They are key-value pairs that give the client additional information.

### Common Response Headers

#### Content-Type

**Purpose**: Indicates the media type of the response body

**Common Values:**
- \`application/json\` - JSON data
- \`application/xml\` - XML data
- \`text/html\` - HTML content
- \`text/plain\` - Plain text
- \`image/jpeg\` - JPEG image
- \`application/pdf\` - PDF document

**Example:**
\`\`\`http
Content-Type: application/json; charset=utf-8
\`\`\`

**Why Important:**
- Tells client how to parse the body
- Browsers use it to render content
- APIs use it to format responses

#### Content-Length

**Purpose**: Size of the response body in bytes

**Example:**
\`\`\`http
Content-Length: 156
\`\`\`

**Why Important:**
- Client knows how much data to expect
- Helps with connection management
- Useful for progress indicators

#### Status Code Headers

**Location** (for redirects):
\`\`\`http
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-url
\`\`\`

**Allow** (for 405 Method Not Allowed):
\`\`\`http
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST, PUT
\`\`\`

#### Cache Control Headers

**Cache-Control**:
\`\`\`http
Cache-Control: public, max-age=3600
\`\`\`

**ETag**:
\`\`\`http
ETag: "abc123def456"
\`\`\`

**Last-Modified**:
\`\`\`http
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

#### Security Headers

**Set-Cookie**:
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure
\`\`\`

**Access-Control-Allow-Origin** (CORS):
\`\`\`http
Access-Control-Allow-Origin: https://example.com
\`\`\`

**X-Frame-Options**:
\`\`\`http
X-Frame-Options: DENY
\`\`\`

#### Custom Headers

You can create custom headers (usually prefixed with \`X-\`):

\`\`\`http
X-API-Version: 1.0
X-Request-ID: abc123
X-Rate-Limit-Remaining: 99
\`\`\`

---

## 3. Response Body

The **response body** contains the actual data being sent to the client. It's optional and format depends on Content-Type.

### Body Formats

#### JSON

**Content-Type**: \`application/json\`

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 89

{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

#### XML

**Content-Type**: \`application/xml\` or \`text/xml\`

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 156

<?xml version="1.0"?>
<user>
  <id>123</id>
  <name>Dattu p</name>
  <email> Dattu@example.com</email>
</user>
\`\`\`

#### HTML

**Content-Type**: \`text/html\`

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234

<!DOCTYPE html>
<html>
<head>
  <title>Welcome</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

#### Plain Text

**Content-Type**: \`text/plain\`

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 13

Hello, World!
\`\`\`

---

## Complete HTTP Response Examples

### Example 1: Successful GET Request

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 89
Cache-Control: public, max-age=3600
ETag: "abc123"
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

### Example 2: Created Resource (POST)

\`\`\`http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 89
Location: /api/users/123
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "id": 123,
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

### Example 3: No Content (DELETE)

\`\`\`http
HTTP/1.1 204 No Content
Date: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

### Example 4: Not Found (404)

\`\`\`http
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 67
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "error": "Not Found",
  "message": "User with ID 999 does not exist"
}
\`\`\`

### Example 5: Bad Request (400)

\`\`\`http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 123
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
\`\`\`

### Example 6: Redirect (301)

\`\`\`http
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-url
Date: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

### Example 7: Server Error (500)

\`\`\`http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
Content-Length: 89
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
\`\`\`

---

## Response Structure Diagram

\`\`\`
Complete HTTP Response Structure:

┌─────────────────────────────────────────────────────────┐
│                    STATUS LINE                          │
│  HTTP/VERSION    STATUS_CODE    STATUS_MESSAGE         │
│  HTTP/1.1        200            OK                     │
├─────────────────────────────────────────────────────────┤
│                    RESPONSE HEADERS                     │
│  Content-Type: application/json                         │
│  Content-Length: 156                                    │
│  Cache-Control: public, max-age=3600                    │
│  ETag: "abc123"                                         │
│  Date: Wed, 21 Feb 2026 10:00:00 GMT                    │
│  [Additional headers...]                                │
├─────────────────────────────────────────────────────────┤
│                    EMPTY LINE (CRLF)                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    RESPONSE BODY                        │
│  {                                                      │
│    "id": 123,                                           │
│    "name": "Dattu p",                                  │
│    "email": " Dattu@example.com"                          │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Status Code Categories

### 1xx - Informational

**Purpose**: Request received, continuing process

**Example:**
\`\`\`http
HTTP/1.1 100 Continue
\`\`\`

### 2xx - Success

**Purpose**: Request successfully received, understood, and accepted

**Common Codes:**
- **200 OK**: Standard success response
- **201 Created**: Resource created successfully
- **204 No Content**: Success but no content to return

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Dattu p"
}
\`\`\`

### 3xx - Redirection

**Purpose**: Further action needed to complete request

**Common Codes:**
- **301 Moved Permanently**: Resource moved permanently
- **302 Found**: Temporary redirect
- **304 Not Modified**: Resource not modified (caching)

**Example:**
\`\`\`http
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-url
\`\`\`

### 4xx - Client Error

**Purpose**: Client made an error in the request

**Common Codes:**
- **400 Bad Request**: Malformed request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Permission denied
- **404 Not Found**: Resource doesn't exist

**Example:**
\`\`\`http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "Not Found",
  "message": "User with ID 999 does not exist"
}
\`\`\`

### 5xx - Server Error

**Purpose**: Server encountered an error

**Common Codes:**
- **500 Internal Server Error**: Generic server error
- **502 Bad Gateway**: Invalid response from upstream
- **503 Service Unavailable**: Server temporarily unavailable

**Example:**
\`\`\`http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
\`\`\`

---

## Response Headers in Detail

### Content Negotiation Headers

**Content-Type**:
\`\`\`http
Content-Type: application/json; charset=utf-8
\`\`\`

**Content-Encoding**:
\`\`\`http
Content-Encoding: gzip
\`\`\`

**Content-Language**:
\`\`\`http
Content-Language: en-US
\`\`\`

### Caching Headers

**Cache-Control**:
\`\`\`http
Cache-Control: public, max-age=3600, must-revalidate
\`\`\`

**Directives:**
- \`public\`: Can be cached by any cache
- \`private\`: Only browser can cache
- \`no-cache\`: Must revalidate before use
- \`max-age=3600\`: Cache for 3600 seconds
- \`must-revalidate\`: Must check with server after expiry

**ETag**:
\`\`\`http
ETag: "abc123def456"
\`\`\`

**Last-Modified**:
\`\`\`http
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
\`\`\`

### Security Headers

**Set-Cookie**:
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
\`\`\`

**Access-Control-Allow-Origin** (CORS):
\`\`\`http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

**X-Frame-Options**:
\`\`\`http
X-Frame-Options: DENY
\`\`\`

**X-Content-Type-Options**:
\`\`\`http
X-Content-Type-Options: nosniff
\`\`\`

### Custom Headers

**X-API-Version**:
\`\`\`http
X-API-Version: 1.0
\`\`\`

**X-Request-ID**:
\`\`\`http
X-Request-ID: abc123def456
\`\`\`

**X-Rate-Limit-Remaining**:
\`\`\`http
X-Rate-Limit-Remaining: 99
X-Rate-Limit-Reset: 1642771200
\`\`\`

---

## Real-World Response Examples

### Example 1: REST API Success Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156
Cache-Control: private, max-age=300
ETag: "abc123"
Date: Wed, 21 Feb 2026 10:00:00 GMT
X-Request-ID: req-123456

{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com",
  "createdAt": "2026-02-21T10:00:00Z"
}
\`\`\`

### Example 2: Created Resource Response

\`\`\`http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 156
Location: /api/users/123
Date: Wed, 21 Feb 2026 10:00:00 GMT

{
  "id": 123,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2026-02-21T10:00:00Z"
}
\`\`\`

### Example 3: Error Response

\`\`\`http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 234
Date: Wed, 21 Feb 2026 10:00:00 GMT
X-Request-ID: req-123456

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "name",
        "message": "Name must be at least 3 characters"
      }
    ]
  },
  "timestamp": "2026-02-21T10:00:00Z"
}
\`\`\`

### Example 4: Paginated Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 456
Date: Wed, 21 Feb 2026 10:00:00 GMT
Link: </api/users?page=2>; rel="next", </api/users?page=10>; rel="last"

{
  "data": [
    {"id": 1, "name": "User 1"},
    {"id": 2, "name": "User 2"}
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
\`\`\`

---

## Best Practices

### 1. Use Appropriate Status Codes

- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST (creation)
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Client error (validation)
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error

### 2. Include Proper Headers

- Always set \`Content-Type\`
- Include \`Content-Length\` when known
- Use cache headers appropriately
- Set security headers

### 3. Consistent Error Format

Use consistent error response structure:

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  },
  "timestamp": "2026-02-21T10:00:00Z"
}
\`\`\`

### 4. Include Useful Metadata

- Request IDs for tracking
- Rate limit information
- API version
- Timestamps

### 5. Proper Content-Type

Always set correct \`Content-Type\`:
- \`application/json\` for JSON
- \`application/xml\` for XML
- \`text/html\` for HTML

---

## Industry Examples

### GitHub API Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-GitHub-Media-Type: github.v3
X-Rate-Limit-Limit: 5000
X-Rate-Limit-Remaining: 4999
X-Rate-Limit-Reset: 1642771200

{
  "id": 123456,
  "name": "octocat",
  "login": "octocat"
}
\`\`\`

### Stripe API Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Request-Id: req_abc123
Stripe-Version: 2020-08-27

{
  "id": "cus_abc123",
  "object": "customer",
  "email": "customer@example.com"
}
\`\`\`

### Twitter API Response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
x-rate-limit-limit: 300
x-rate-limit-remaining: 299
x-rate-limit-reset: 1642771200

{
  "data": {
    "id": "123456",
    "text": "Hello, World!"
  }
}
\`\`\`

---

## Summary

HTTP response structure consists of:

1. **Status Line**: HTTP version + status code + status message
2. **Headers**: Metadata (Content-Type, Cache-Control, etc.)
3. **Body**: Actual data (JSON, XML, HTML, etc.)

**Key Concepts:**
- **Status Codes**: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)
- **Headers**: Provide metadata and control behavior
- **Body**: Contains the actual response data
- **Format**: Depends on Content-Type header

Understanding response structure is essential for:
- Building REST APIs
- Debugging API issues
- Implementing proper error handling
- Optimizing performance with caching
- Ensuring security with proper headers

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between status code and status message?

**Status code** is a three-digit number (200, 404, 500). **Status message** is a human-readable description (OK, Not Found, Internal Server Error). The code is what matters; the message is informational.

### 2. Is the response body always required?

**No**, the response body is optional. Some responses like **204 No Content** don't have a body. DELETE requests often return 204 without a body.

### 3. What headers are required in an HTTP response?

Only the **status line** is required. However, it's best practice to include:
- \`Content-Type\` (if body exists)
- \`Content-Length\` (if known)
- \`Date\` (recommended)

### 4. How do I handle different response formats?

Use the \`Content-Type\` header to indicate format:
- \`application/json\` for JSON
- \`application/xml\` for XML
- \`text/html\` for HTML

### 5. What is the purpose of the ETag header?

**ETag** (Entity Tag) is used for cache validation. The client can send it in \`If-None-Match\` header to check if resource has changed. If unchanged, server returns 304 Not Modified.

### 6. How do I set cookies in a response?

Use the \`Set-Cookie\` header:
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure
\`\`\`

### 7. What is the difference between 200 and 201 status codes?

**200 OK** is for successful requests (GET, PUT, PATCH). **201 Created** is specifically for successful POST requests that create new resources. Always use 201 for creation.

### 8. How do I implement pagination in responses?

Include pagination metadata in the response body:
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
\`\`\`

### 9. What is the purpose of the Location header?

**Location** header is used with redirects (3xx) and created resources (201). It tells the client where to find the resource.

### 10. How do I handle errors in API responses?

Return appropriate status codes (4xx for client errors, 5xx for server errors) with error details in the body:
\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
\`\`\`
  `,
  code: `// HTTP Response Structure - Complete Examples

// Example 1: Successful Response (Java - Spring Boot)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    
    if (user != null) {
        return ResponseEntity.ok()
            .header("Cache-Control", "public, max-age=3600")
            .header("ETag", generateETag(user))
            .body(user);  // 200 OK
    }
    
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 2: Created Response (Java)
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    User user = userService.create(request);
    
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/api/users/" + user.getId()))
        .header("X-Request-ID", generateRequestId())
        .body(user);  // 201 Created
}

// Example 3: No Content Response (Java)
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();  // 204 No Content
}

// Example 4: Error Response (Java)
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
    ErrorResponse error = new ErrorResponse(
        "NOT_FOUND",
        ex.getMessage(),
        HttpStatus.NOT_FOUND.value()
    );
    
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .header("X-Request-ID", generateRequestId())
        .body(error);  // 404 Not Found
}

// Example 5: Response with Custom Headers (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData() {
    Data data = dataService.getData();
    
    return ResponseEntity.ok()
        .header("X-API-Version", "1.0")
        .header("X-Rate-Limit-Remaining", "99")
        .header("X-Rate-Limit-Reset", String.valueOf(getResetTime()))
        .body(data);
}

// Example 6: Paginated Response (Java)
@GetMapping("/api/users")
public ResponseEntity<Page<User>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    Page<User> users = userService.findAll(PageRequest.of(page, size));
    
    // Add Link header for pagination
    String linkHeader = buildLinkHeader(users, page, size);
    
    return ResponseEntity.ok()
        .header("Link", linkHeader)
        .body(users);
}

// Example 7: Cached Response (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUserWithCache(
    @PathVariable Long id,
    @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch
) {
    User user = userService.findById(id);
    String etag = generateETag(user);
    
    // Check if resource not modified
    if (etag.equals(ifNoneMatch)) {
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
            .eTag(etag)
            .build();  // 304 Not Modified
    }
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .eTag(etag)
        .lastModified(user.getUpdatedAt())
        .body(user);
}

// Example 8: Redirect Response (Java)
@GetMapping("/old-url")
public ResponseEntity<Void> redirectToNewUrl() {
    return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
        .location(URI.create("/new-url"))
        .build();  // 301 Moved Permanently
}

// Example 9: Response with CORS Headers (Java)
@CrossOrigin(origins = "https://example.com")
@GetMapping("/api/data")
public ResponseEntity<Data> getDataWithCORS() {
    Data data = dataService.getData();
    return ResponseEntity.ok(data);
}

// Or manually:
@GetMapping("/api/data")
public ResponseEntity<Data> getData() {
    Data data = dataService.getData();
    return ResponseEntity.ok()
        .header("Access-Control-Allow-Origin", "https://example.com")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        .body(data);
}

// Example 10: JavaScript - Handling Responses
async function getUser(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    // Check status code
    if (response.status === 200) {
        const user = await response.json();
        return user;
    } else if (response.status === 404) {
        throw new Error('User not found');
    } else {
        throw new Error(\`API Error: \${response.status}\`);
    }
}

// Example 11: JavaScript - Reading Headers
async function getData() {
    const response = await fetch('/api/data');
    
    // Read headers
    const contentType = response.headers.get('Content-Type');
    const rateLimitRemaining = response.headers.get('X-Rate-Limit-Remaining');
    const etag = response.headers.get('ETag');
    
    const data = await response.json();
    return { data, rateLimitRemaining, etag };
}

// Example 12: Error Response Format (Java)
public class ErrorResponse {
    private String code;
    private String message;
    private int status;
    private Object details;
    private String timestamp;
    
    public ErrorResponse(String code, String message, int status) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.timestamp = Instant.now().toString();
    }
    
    // Getters and setters
}

// Example 13: Response Builder Pattern (Java)
public class ResponseBuilder {
    public static <T> ResponseEntity<T> success(T data) {
        return ResponseEntity.ok()
            .header("X-Request-ID", generateRequestId())
            .body(data);
    }
    
    public static <T> ResponseEntity<T> created(T data, String location) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create(location))
            .header("X-Request-ID", generateRequestId())
            .body(data);
    }
    
    public static ResponseEntity<ErrorResponse> error(
        String code, String message, HttpStatus status
    ) {
        ErrorResponse error = new ErrorResponse(code, message, status.value());
        return ResponseEntity.status(status)
            .header("X-Request-ID", generateRequestId())
            .body(error);
    }
}

// Usage:
return ResponseBuilder.success(user);
return ResponseBuilder.created(user, "/api/users/" + user.getId());
return ResponseBuilder.error("NOT_FOUND", "User not found", HttpStatus.NOT_FOUND);`
};

export default httpResponseStructure;



