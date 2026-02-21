const httpStatusCodes = {
  id: 'http-status-codes',
  title: 'HTTP Status Codes - Complete Guide',
  description: 'Learn all HTTP status codes (100, 200, 300, 400, 500 series) with real-world examples and how to use them in REST APIs',
  content: `
# HTTP Status Codes - Complete Guide

HTTP status codes are three-digit numbers returned by a server to indicate the result of a client's request. Understanding these codes is crucial for building and debugging REST APIs.

---

## Understanding HTTP Status Code Structure

HTTP status codes are divided into 5 categories:

- **1xx (100-199)**: Informational responses
- **2xx (200-299)**: Success responses
- **3xx (300-399)**: Redirection responses
- **4xx (400-499)**: Client error responses
- **5xx (500-599)**: Server error responses

The first digit indicates the category, making it easy to understand the response type.

---

## 100 Series - Informational Responses

These codes indicate that the request was received and the server is continuing to process it.

### 100 Continue

**Meaning**: The server has received the request headers and the client should proceed to send the request body.

**When to Use**: Used in HTTP/1.1 when a client sends a request with \`Expect: 100-continue\` header.

**Real-World Example**:
\`\`\`java
// Client sends request with Expect header
POST /api/upload HTTP/1.1
Host: example.com
Content-Length: 1000000
Expect: 100-continue

// Server responds
HTTP/1.1 100 Continue

// Client now sends the actual body
[Request body data...]
\`\`\`

### 101 Switching Protocols

**Meaning**: The server is switching protocols as requested by the client.

**When to Use**: Used when upgrading from HTTP to WebSocket or HTTP/2.

**Real-World Example**:
\`\`\`java
// Client requests protocol upgrade
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade

// Server responds
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
\`\`\`

### 102 Processing

**Meaning**: The server has received and is processing the request, but no response is available yet.

**When to Use**: Used for long-running requests to prevent client timeout.

---

## 200 Series - Success Responses

These codes indicate that the request was successfully received, understood, and accepted.

### 200 OK

**Meaning**: The request succeeded. The response body contains the requested resource.

**When to Use**: Standard success response for GET, PUT, PATCH requests.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);  // Returns 200 OK
}

// Response
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### 201 Created

**Meaning**: The request succeeded and a new resource was created.

**When to Use**: Standard response for POST requests that create new resources.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);  // Returns 201
}

// Response
HTTP/1.1 201 Created
Location: /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

### 202 Accepted

**Meaning**: The request has been accepted for processing, but processing has not been completed.

**When to Use**: Used for asynchronous processing, like sending emails or processing large files.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/reports/generate")
public ResponseEntity<Map<String, String>> generateReport(@RequestBody ReportRequest request) {
    // Start async processing
    reportService.generateAsync(request);
    
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(
        Map.of("message", "Report generation started", 
               "status", "processing")
    );  // Returns 202
}

// Response
HTTP/1.1 202 Accepted
Content-Type: application/json

{
  "message": "Report generation started",
  "status": "processing"
}
\`\`\`

### 204 No Content

**Meaning**: The server successfully processed the request but is not returning any content.

**When to Use**: Standard response for DELETE requests or PUT requests that don't need to return data.

**Real-World Example**:
\`\`\`java
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();  // Returns 204
}

// Response
HTTP/1.1 204 No Content
\`\`\`

### 206 Partial Content

**Meaning**: The server is delivering only part of the resource due to a range header sent by the client.

**When to Use**: Used for resumable downloads or streaming large files.

**Real-World Example**:
\`\`\`java
// Client request
GET /api/files/large-video.mp4 HTTP/1.1
Range: bytes=0-1023

// Server response
HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/10000000
Content-Length: 1024

[First 1024 bytes of file]
\`\`\`

---

## 300 Series - Redirection Responses

These codes indicate that further action needs to be taken to complete the request.

### 301 Moved Permanently

**Meaning**: The requested resource has been permanently moved to a new URL.

**When to Use**: When a resource URL has permanently changed.

**Real-World Example**:
\`\`\`java
@GetMapping("/old-url")
public ResponseEntity<Void> redirectOldUrl() {
    return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
        .location(URI.create("/new-url"))
        .build();  // Returns 301
}

// Response
HTTP/1.1 301 Moved Permanently
Location: /new-url
\`\`\`

### 302 Found (Temporary Redirect)

**Meaning**: The requested resource has been temporarily moved to a different URL.

**When to Use**: For temporary redirects, like after login.

**Real-World Example**:
\`\`\`java
@PostMapping("/login")
public ResponseEntity<Void> login(@RequestBody LoginRequest request) {
    if (authService.authenticate(request)) {
        return ResponseEntity.status(HttpStatus.FOUND)
            .location(URI.create("/dashboard"))
            .build();  // Returns 302
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
\`\`\`

### 304 Not Modified

**Meaning**: The resource has not been modified since the last request. Client can use cached version.

**When to Use**: Used with ETags and Last-Modified headers for caching.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/products/{id}")
public ResponseEntity<Product> getProduct(@PathVariable Long id,
                                        @RequestHeader("If-None-Match") String ifNoneMatch) {
    Product product = productService.findById(id);
    String etag = generateETag(product);
    
    if (etag.equals(ifNoneMatch)) {
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();  // Returns 304
    }
    
    return ResponseEntity.ok()
        .eTag(etag)
        .body(product);
}

// Response (when not modified)
HTTP/1.1 304 Not Modified
ETag: "abc123"
\`\`\`

### 307 Temporary Redirect

**Meaning**: Similar to 302, but the request method must not be changed.

**When to Use**: When you want to preserve the HTTP method during redirect.

### 308 Permanent Redirect

**Meaning**: Similar to 301, but the request method must not be changed.

**When to Use**: For permanent redirects where method should be preserved.

---

## 400 Series - Client Error Responses

These codes indicate that the client made an error in the request.

### 400 Bad Request

**Meaning**: The server cannot process the request due to a client error (malformed syntax, invalid request).

**When to Use**: For validation errors, malformed JSON, missing required fields.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest request) {
    // Validation happens automatically with @Valid
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}

// If validation fails, Spring returns 400 automatically
// Response
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "timestamp": "2026-02-21T10:30:00",
  "status": 400,
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

### 401 Unauthorized

**Meaning**: The request requires authentication. The client must authenticate itself.

**When to Use**: When user is not authenticated or authentication token is missing/invalid.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/profile")
public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String token) {
    if (token == null || !authService.isValidToken(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // Returns 401
    }
    
    User user = userService.getCurrentUser(token);
    return ResponseEntity.ok(user);
}

// Response
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer
Content-Type: application/json

{
  "error": "Unauthorized",
  "message": "Authentication required"
}
\`\`\`

### 403 Forbidden

**Meaning**: The server understood the request but refuses to authorize it.

**When to Use**: When user is authenticated but doesn't have permission to access the resource.

**Real-World Example**:
\`\`\`java
@DeleteMapping("/api/admin/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id, 
                                     @RequestHeader("Authorization") String token) {
    User currentUser = authService.getUserFromToken(token);
    
    if (!currentUser.hasRole("ADMIN")) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();  // Returns 403
    }
    
    userService.delete(id);
    return ResponseEntity.noContent().build();
}

// Response
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
\`\`\`

### 404 Not Found

**Meaning**: The server cannot find the requested resource.

**When to Use**: When the requested resource doesn't exist.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    return ResponseEntity.ok(user);
}

// In GlobalExceptionHandler
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse(ex.getMessage()));  // Returns 404
}

// Response
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "Not Found",
  "message": "User not found",
  "path": "/api/users/999"
}
\`\`\`

### 405 Method Not Allowed

**Meaning**: The request method is not allowed for the requested resource.

**When to Use**: When client uses wrong HTTP method (e.g., GET instead of POST).

**Real-World Example**:
\`\`\`java
// Only POST is allowed
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    // ...
}

// If client sends GET request
// Response
HTTP/1.1 405 Method Not Allowed
Allow: POST
Content-Type: application/json

{
  "error": "Method Not Allowed",
  "message": "GET method is not supported for this endpoint"
}
\`\`\`

### 409 Conflict

**Meaning**: The request conflicts with the current state of the server.

**When to Use**: When creating a resource that already exists, or concurrent modification conflicts.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<?> createUser(@RequestBody UserRequest request) {
    if (userService.existsByEmail(request.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(Map.of("error", "User with this email already exists"));  // Returns 409
    }
    
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}

// Response
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": "Conflict",
  "message": "User with this email already exists"
}
\`\`\`

### 422 Unprocessable Entity

**Meaning**: The request is well-formed but contains semantic errors.

**When to Use**: For validation errors that are more specific than 400.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/orders")
public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
    List<String> errors = validateOrder(request);
    
    if (!errors.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
            .body(Map.of("errors", errors));  // Returns 422
    }
    
    Order order = orderService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(order);
}

// Response
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "errors": [
    "Product is out of stock",
    "Insufficient balance"
  ]
}
\`\`\`

### 429 Too Many Requests

**Meaning**: The user has sent too many requests in a given amount of time (rate limiting).

**When to Use**: For rate limiting and throttling.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/data")
public ResponseEntity<?> getData(@RequestHeader("Authorization") String token) {
    if (rateLimiter.isExceeded(token)) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
            .header("Retry-After", "60")
            .body(Map.of("error", "Too many requests"));  // Returns 429
    }
    
    return ResponseEntity.ok(dataService.getData());
}

// Response
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again after 60 seconds"
}
\`\`\`

---

## 500 Series - Server Error Responses

These codes indicate that the server encountered an error and cannot fulfill the request.

### 500 Internal Server Error

**Meaning**: The server encountered an unexpected condition that prevented it from fulfilling the request.

**When to Use**: For unexpected server errors, unhandled exceptions.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    try {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        // Log error internally
        logger.error("Unexpected error", e);
        
        // Return generic error to client
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", "Internal server error"));  // Returns 500
    }
}

// Or in GlobalExceptionHandler
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
    logger.error("Unexpected error", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("An unexpected error occurred"));  // Returns 500
}

// Response
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please try again later."
}
\`\`\`

### 501 Not Implemented

**Meaning**: The server does not support the functionality required to fulfill the request.

**When to Use**: When a feature is not yet implemented.

**Real-World Example**:
\`\`\`java
@PostMapping("/api/advanced-feature")
public ResponseEntity<?> advancedFeature() {
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
        .body(Map.of("error", "Feature not yet implemented"));  // Returns 501
}

// Response
HTTP/1.1 501 Not Implemented
Content-Type: application/json

{
  "error": "Not Implemented",
  "message": "This feature is not yet available"
}
\`\`\`

### 502 Bad Gateway

**Meaning**: The server, while acting as a gateway or proxy, received an invalid response from an upstream server.

**When to Use**: When your server acts as a gateway and the upstream server fails.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/external-data")
public ResponseEntity<?> getExternalData() {
    try {
        String data = externalService.fetchData();
        return ResponseEntity.ok(data);
    } catch (ExternalServiceException e) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
            .body(Map.of("error", "External service unavailable"));  // Returns 502
    }
}

// Response
HTTP/1.1 502 Bad Gateway
Content-Type: application/json

{
  "error": "Bad Gateway",
  "message": "External service is temporarily unavailable"
}
\`\`\`

### 503 Service Unavailable

**Meaning**: The server is currently unable to handle the request due to temporary overload or maintenance.

**When to Use**: During maintenance, server overload, or when a service is temporarily down.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/data")
public ResponseEntity<?> getData() {
    if (maintenanceMode.isEnabled()) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
            .header("Retry-After", "3600")
            .body(Map.of("error", "Service under maintenance"));  // Returns 503
    }
    
    return ResponseEntity.ok(dataService.getData());
}

// Response
HTTP/1.1 503 Service Unavailable
Retry-After: 3600
Content-Type: application/json

{
  "error": "Service Unavailable",
  "message": "Service is under maintenance. Please try again later."
}
\`\`\`

### 504 Gateway Timeout

**Meaning**: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.

**When to Use**: When an upstream server takes too long to respond.

**Real-World Example**:
\`\`\`java
@GetMapping("/api/external-data")
public ResponseEntity<?> getExternalData() {
    try {
        String data = externalService.fetchDataWithTimeout(5000);  // 5 second timeout
        return ResponseEntity.ok(data);
    } catch (TimeoutException e) {
        return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT)
            .body(Map.of("error", "Upstream server timeout"));  // Returns 504
    }
}

// Response
HTTP/1.1 504 Gateway Timeout
Content-Type: application/json

{
  "error": "Gateway Timeout",
  "message": "Upstream server did not respond in time"
}
\`\`\`

---

## Complete Real-World Example: REST API with Proper Status Codes

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET /api/users/{id} - Returns 200 OK or 404 Not Found
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))  // 200 OK
            .orElse(ResponseEntity.notFound().build());  // 404 Not Found
    }
    
    // POST /api/users - Returns 201 Created, 400 Bad Request, or 409 Conflict
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest request) {
        // Check if user already exists
        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)  // 409 Conflict
                .body(Map.of("error", "User with this email already exists"));
        }
        
        // Validation happens automatically with @Valid
        // If validation fails, Spring returns 400 Bad Request
        
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)  // 201 Created
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    // PUT /api/users/{id} - Returns 200 OK or 404 Not Found
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                          @Valid @RequestBody UserRequest request) {
        return userService.update(id, request)
            .map(user -> ResponseEntity.ok(user))  // 200 OK
            .orElse(ResponseEntity.notFound().build());  // 404 Not Found
    }
    
    // DELETE /api/users/{id} - Returns 204 No Content or 404 Not Found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();  // 204 No Content
        }
        return ResponseEntity.notFound().build();  // 404 Not Found
    }
    
    // GET /api/users - Returns 200 OK
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);  // 200 OK
    }
}
\`\`\`

---

## Status Code Selection Guide

| Scenario | Status Code | Example |
|----------|-------------|---------|
| Successful GET request | 200 OK | Get user details |
| Successful POST (create) | 201 Created | Create new user |
| Successful PUT/PATCH | 200 OK | Update user |
| Successful DELETE | 204 No Content | Delete user |
| Resource not found | 404 Not Found | User doesn't exist |
| Validation error | 400 Bad Request | Invalid email format |
| Authentication required | 401 Unauthorized | Missing/invalid token |
| Permission denied | 403 Forbidden | User not admin |
| Resource already exists | 409 Conflict | Email already registered |
| Rate limit exceeded | 429 Too Many Requests | Too many API calls |
| Server error | 500 Internal Server Error | Database connection failed |
| Service unavailable | 503 Service Unavailable | Under maintenance |

---

## Best Practices

1. **Use Appropriate Status Codes**: Match the status code to the actual situation
2. **Be Consistent**: Use the same status codes for similar situations across your API
3. **Include Error Details**: For 4xx and 5xx errors, include helpful error messages
4. **Use 201 for Creation**: Always use 201 Created for successful POST requests
5. **Use 204 for Deletion**: Use 204 No Content for successful DELETE requests
6. **Never Expose Internal Errors**: For 500 errors, log details internally but return generic messages to clients
7. **Document Your Status Codes**: Include status codes in your API documentation

---

---

## Understanding Error Codes - Clear Explanation

### What Are Error Codes?

Error codes are specific identifiers that help identify the exact type of error that occurred. In HTTP, we have two types of codes:

1. **HTTP Status Codes** (100, 200, 300, 400, 500 series) - Standard HTTP response codes
2. **Custom Error Codes** (USER_1001, PAYMENT_2001, etc.) - Application-specific error codes

### HTTP Status Codes vs Custom Error Codes

**HTTP Status Codes** (like 400, 404, 500) tell you the **category** of error:
- **400 Bad Request** - Client made a mistake
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server problem

**Custom Error Codes** (like USER_1001, PAYMENT_2001) tell you the **specific** error:
- **USER_1001** - User not found (more specific than just 404)
- **PAYMENT_2001** - Insufficient balance (more specific than just 400)

### How Error Codes Work Together

In real applications, you use **both**:

\`\`\`json
{
  "status": 400,              // HTTP Status Code (category)
  "errorCode": "PAYMENT_2001", // Custom Error Code (specific)
  "message": "Insufficient balance",
  "timestamp": "2026-02-21T10:30:00"
}
\`\`\`

**Why Use Both?**

1. **HTTP Status Code (400)**: Tells frontend "this is a client error"
2. **Custom Error Code (PAYMENT_2001)**: Tells frontend "specifically, it's insufficient balance"

Frontend can then:
- Show appropriate error message
- Take specific action (like showing "Add Money" button)
- Handle retry logic properly

### Real-World Example: How Error Codes Work

**Scenario**: User tries to transfer money

**Step 1: Request**
\`\`\`http
POST /api/payments/transfer HTTP/1.1
Content-Type: application/json

{
  "fromAccount": 123,
  "toAccount": 456,
  "amount": 10000
}
\`\`\`

**Step 2: Server Checks**

\`\`\`java
@Service
public class PaymentService {
    public void transferMoney(Long fromAccount, Long toAccount, BigDecimal amount) {
        // Check if account exists
        Account account = accountRepository.findById(fromAccount)
            .orElseThrow(() -> new AccountNotFoundException("Account not found"));
        
        // Check balance
        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException(
                "Insufficient balance. Available: " + account.getBalance());
        }
        
        // Process transfer
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);
    }
}
\`\`\`

**Step 3: Error Response with Codes**

If balance is insufficient:
\`\`\`json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "status": 400,                    // HTTP Status Code
  "errorCode": "PAYMENT_2001",      // Custom Error Code
  "message": "Insufficient balance. Available: 5000.00, Required: 10000.00",
  "timestamp": "2026-02-21T10:30:00",
  "path": "/api/payments/transfer"
}
\`\`\`

**Step 4: Frontend Handles Based on Error Code**

\`\`\`javascript
async function transferMoney(fromAccount, toAccount, amount) {
    try {
        const response = await fetch('/api/payments/transfer', {
            method: 'POST',
            body: JSON.stringify({ fromAccount, toAccount, amount })
        });
        
        if (!response.ok) {
            const error = await response.json();
            
            // Handle based on HTTP status code
            if (error.status === 400) {
                // Handle based on custom error code
                switch(error.errorCode) {
                    case 'PAYMENT_2001':
                        // Show "Add Money" button
                        showAddMoneyDialog();
                        break;
                    case 'PAYMENT_2002':
                        // Show "Update Card" message
                        showUpdateCardMessage();
                        break;
                    default:
                        showGenericError();
                }
            } else if (error.status === 404) {
                showNotFoundMessage();
            } else if (error.status === 500) {
                showServerError();
            }
        }
    } catch (error) {
        console.error('Transfer failed:', error);
    }
}
\`\`\`

### Error Code Structure Explained

**HTTP Status Code Structure:**
- **First digit** = Category (1xx, 2xx, 3xx, 4xx, 5xx)
- **Second and third digits** = Specific code within category

**Custom Error Code Structure:**
- **Prefix** = Module/Category (USER_, PAYMENT_, ORDER_)
- **Number** = Specific error (1001, 2001, 3001)

**Example:**
\`\`\`
PAYMENT_2001
│       │
│       └─ Specific error number (2001)
└───────── Module prefix (PAYMENT_)
\`\`\`

### Common Error Code Patterns

**Pattern 1: Category-Based (Most Common)**
\`\`\`
USER_1001, USER_1002, USER_1003    // User-related errors
PAYMENT_2001, PAYMENT_2002         // Payment-related errors
ORDER_3001, ORDER_3002             // Order-related errors
SYSTEM_5001, SYSTEM_5002          // System errors
\`\`\`

**Pattern 2: HTTP Status Based**
\`\`\`
ERR_400_001, ERR_400_002           // 400 Bad Request errors
ERR_404_001, ERR_404_002           // 404 Not Found errors
ERR_500_001, ERR_500_002           // 500 Server Error errors
\`\`\`

**Pattern 3: Numeric Only**
\`\`\`
1001, 1002, 1003                   // User errors
2001, 2002, 2003                   // Payment errors
3001, 3002, 3003                   // Order errors
\`\`\`

### How to Resolve Errors Using Error Codes

**Step 1: Identify the Error Code**

When an error occurs, check both codes:
\`\`\`json
{
  "status": 400,              // HTTP Status Code
  "errorCode": "PAYMENT_2001"  // Custom Error Code
}
\`\`\`

**Step 2: Look Up in Documentation**

Companies maintain error code documentation:

| HTTP Status | Custom Error Code | Description | Resolution |
|-------------|-------------------|-------------|------------|
| 400 | PAYMENT_2001 | Insufficient balance | Add money to account |
| 400 | PAYMENT_2002 | Card expired | Update card details |
| 404 | USER_1001 | User not found | Check user ID |
| 409 | USER_1002 | User already exists | Use different email |
| 500 | SYSTEM_5001 | Database error | Contact support |

**Step 3: Implement Resolution**

\`\`\`java
@Service
public class ErrorResolutionService {
    
    public String getResolution(int httpStatus, String errorCode) {
        // Check HTTP status first
        if (httpStatus == 400) {
            // Then check custom error code
            switch (errorCode) {
                case "PAYMENT_2001":
                    return "Insufficient balance. Please add money to your account";
                case "PAYMENT_2002":
                    return "Card has expired. Please update your card details";
                default:
                    return "Invalid request. Please check your input";
            }
        } else if (httpStatus == 404) {
            return "Resource not found. Please check the URL";
        } else if (httpStatus == 500) {
            return "Server error. Please try again later";
        }
        
        return "An error occurred. Please try again";
    }
    
    public boolean isRetryable(int httpStatus, String errorCode) {
        // Some errors can be retried
        if (httpStatus == 500 || httpStatus == 503) {
            return true;  // Server errors can be retried
        }
        
        if (errorCode != null && errorCode.startsWith("SYSTEM_")) {
            return true;  // System errors can be retried
        }
        
        return false;  // Client errors (400, 404) should not be retried
    }
}
\`\`\`

**Step 4: Frontend Resolution**

\`\`\`javascript
function handleError(errorResponse) {
    const httpStatus = errorResponse.status;
    const errorCode = errorResponse.errorCode;
    
    // Check if error is retryable
    if (isRetryable(httpStatus, errorCode)) {
        showRetryButton();
    }
    
    // Get resolution message
    const resolution = getResolution(httpStatus, errorCode);
    showErrorDialog(errorResponse.message, resolution);
}

function isRetryable(httpStatus, errorCode) {
    // Server errors can be retried
    if (httpStatus === 500 || httpStatus === 503) {
        return true;
    }
    
    // System errors can be retried
    if (errorCode && errorCode.startsWith('SYSTEM_')) {
        return true;
    }
    
    return false;
}

function getResolution(httpStatus, errorCode) {
    const resolutions = {
        400: {
            'PAYMENT_2001': 'Add money to your account',
            'PAYMENT_2002': 'Update your card details',
            'default': 'Please check your input'
        },
        404: {
            'default': 'Resource not found. Please check the URL'
        },
        500: {
            'default': 'Server error. Please try again later'
        }
    };
    
    if (resolutions[httpStatus]) {
        return resolutions[httpStatus][errorCode] || 
               resolutions[httpStatus]['default'];
    }
    
    return 'An error occurred. Please try again';
}
\`\`\`

### Best Practices for Error Codes

1. **Use HTTP Status Codes for Categories**
   - 400 for client errors
   - 404 for not found
   - 500 for server errors

2. **Use Custom Error Codes for Specific Errors**
   - PAYMENT_2001 for insufficient balance
   - USER_1001 for user not found

3. **Document All Error Codes**
   - Maintain error code documentation
   - Include resolution steps

4. **Be Consistent**
   - Use same pattern throughout application
   - Group related errors together

5. **Include Both Codes in Response**
   - HTTP status code (category)
   - Custom error code (specific)

---

## Summary

HTTP status codes are essential for building professional REST APIs. They communicate the result of a request clearly:

- **1xx**: Informational - Request received, processing
- **2xx**: Success - Request was successful
- **3xx**: Redirection - Further action needed
- **4xx**: Client Error - Client made a mistake
- **5xx**: Server Error - Server encountered a problem

**Error Codes Work Together:**
- **HTTP Status Code** = Category of error (400, 404, 500)
- **Custom Error Code** = Specific error (PAYMENT_2001, USER_1001)

Using both codes helps frontend developers handle errors properly and provides better user experience.
  `,
  code: `// HTTP Status Codes - Complete Example

// Spring Boot Controller with Proper Status Codes
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // 200 OK - Successful GET request
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // 200 OK
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }
    
    // 201 Created - Successful POST request
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest request) {
        // Check if user already exists
        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)  // 409 Conflict
                .body(Map.of("error", "User with this email already exists"));
        }
        
        // Validation happens automatically with @Valid
        // If validation fails, Spring returns 400 Bad Request
        
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)  // 201 Created
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    // 200 OK - Successful PUT request
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                          @Valid @RequestBody UserRequest request) {
        Optional<User> updatedUser = userService.update(id, request);
        
        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(updatedUser.get());  // 200 OK
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }
    
    // 204 No Content - Successful DELETE request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();  // 204 No Content
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }
    
    // 200 OK - Successful GET all request
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);  // 200 OK
    }
}

// Global Exception Handler with Status Codes
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // 400 Bad Request - Validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Validation failed",
            400,
            errors
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
    
    // 401 Unauthorized - Authentication required
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            "Authentication required",
            401,
            null
        );
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
    
    // 403 Forbidden - Permission denied
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(ForbiddenException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            "You don't have permission to perform this action",
            403,
            null
        );
        
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }
    
    // 404 Not Found - Resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            ex.getMessage(),
            404,
            null
        );
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    
    // 409 Conflict - Resource already exists
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ResourceAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            ex.getMessage(),
            409,
            null
        );
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
    
    // 500 Internal Server Error - Unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        // Log error internally
        System.err.println("Unexpected error: " + ex.getMessage());
        ex.printStackTrace();
        
        // Return generic error to client
        ErrorResponse errorResponse = new ErrorResponse(
            "An unexpected error occurred. Please try again later.",
            500,
            null
        );
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(errorResponse);
    }
}

// Error Response Model
class ErrorResponse {
    private String message;
    private int status;
    private Object details;
    
    public ErrorResponse(String message, int status, Object details) {
        this.message = message;
        this.status = status;
        this.details = details;
    }
    
    // Getters and setters
    public String getMessage() { return message; }
    public int getStatus() { return status; }
    public Object getDetails() { return details; }
}

// Example API Responses:

// Success Response (200 OK)
// HTTP/1.1 200 OK
// Content-Type: application/json
// {
//   "id": 1,
//   "name": "John Doe",
//   "email": "john@example.com"
// }

// Created Response (201 Created)
// HTTP/1.1 201 Created
// Location: /api/users/123
// Content-Type: application/json
// {
//   "id": 123,
//   "name": "Jane Doe",
//   "email": "jane@example.com"
// }

// Not Found Response (404 Not Found)
// HTTP/1.1 404 Not Found
// Content-Type: application/json
// {
//   "message": "User not found",
//   "status": 404
// }

// Bad Request Response (400 Bad Request)
// HTTP/1.1 400 Bad Request
// Content-Type: application/json
// {
//   "message": "Validation failed",
//   "status": 400,
//   "details": {
//     "email": "Email is required",
//     "name": "Name must be at least 3 characters"
//   }
// }

// Internal Server Error Response (500 Internal Server Error)
// HTTP/1.1 500 Internal Server Error
// Content-Type: application/json
// {
//   "message": "An unexpected error occurred. Please try again later.",
//   "status": 500
// }`
};

export default httpStatusCodes;

