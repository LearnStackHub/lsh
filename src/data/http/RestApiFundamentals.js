const restApiFundamentals = {
  id: 'rest-api-fundamentals',
  title: 'REST API Fundamentals - Architecture and Principles',
  description: 'Learn REST architecture, REST principles (statelessness, client-server, uniform interface), resource-based URLs, and how to design RESTful APIs',
  content: `
# REST API Fundamentals — Complete Guide

REST (Representational State Transfer) is the most popular architectural style for designing web APIs. Understanding REST principles is essential for building scalable, maintainable, and user-friendly APIs.

---

## What is REST?

**REST** stands for **Representational State Transfer**:

- **Representational**: Data is represented in a format (JSON, XML)
- **State**: The current condition of a resource
- **Transfer**: Moving data between client and server

### Simple Definition

REST is an **architectural style** for designing networked applications. It uses standard HTTP methods and follows specific principles to create APIs that are simple, scalable, and maintainable.

### Key Concept

REST treats everything as a **resource** that can be accessed via a unique URL and manipulated using HTTP methods.

---

## REST Architecture

### Client-Server Architecture

REST follows a **client-server model**:

\`\`\`
┌─────────┐                    ┌─────────┐
│ Client  │                    │ Server  │
│  (App)  │                    │  (API)  │
└────┬────┘                    └────┬────┘
     │                              │
     │  HTTP Request                │
     │─────────────────────────────>│
     │                              │
     │  HTTP Response               │
     │<─────────────────────────────│
     │                              │
\`\`\`

**Benefits:**
- **Separation of Concerns**: Client and server can evolve independently
- **Scalability**: Server can handle multiple clients
- **Portability**: Clients can be web, mobile, desktop

### Resource-Based URLs

REST uses **resource-based URLs** instead of action-based:

**Action-Based (Not RESTful):**
\`\`\`
GET /getUsers
POST /createUser
PUT /updateUser
DELETE /deleteUser
\`\`\`

**Resource-Based (RESTful):**
\`\`\`
GET    /users        → List users
GET    /users/123    → Get user 123
POST   /users        → Create user
PUT    /users/123     → Update user 123
DELETE /users/123     → Delete user 123
\`\`\`

**Key Points:**
- URLs represent **resources** (nouns), not actions (verbs)
- HTTP methods indicate the **action**
- Resources are identified by unique URLs

---

## REST Principles

REST is built on six core principles:

### 1. Statelessness

**Definition**: Each request from client to server must contain all information needed to understand and process the request.

**What This Means:**
- Server doesn't store client state between requests
- Each request is independent
- Session state is kept on the client side

**Example:**

❌ **Stateful (Not RESTful):**
\`\`\`
Request 1: GET /login
[Server creates session, stores user ID]

Request 2: GET /dashboard
[Server uses stored session to identify user]
\`\`\`

✅ **Stateless (RESTful):**
\`\`\`
Request 1: POST /login
[Server returns token]

Request 2: GET /dashboard
Authorization: Bearer token123
[Server validates token from request]
\`\`\`

**Benefits:**
- **Scalability**: Any server can handle any request
- **Reliability**: No server-side session storage
- **Simplicity**: Easier to understand and debug

**Implementation:**
\`\`\`java
// Stateless - Token in every request
@GetMapping("/api/dashboard")
public ResponseEntity<Dashboard> getDashboard(
    @RequestHeader("Authorization") String token
) {
    // Validate token from header (not from session)
    User user = tokenService.validateToken(token);
    Dashboard dashboard = dashboardService.getDashboard(user.getId());
    return ResponseEntity.ok(dashboard);
}
\`\`\`

### 2. Client-Server

**Definition**: Client and server are separate entities that communicate over a network.

**Separation:**
- **Client**: User interface, user interactions
- **Server**: Data storage, business logic, security

**Benefits:**
- **Independence**: Client and server can be developed separately
- **Technology Flexibility**: Different technologies for client and server
- **Scalability**: Server can serve multiple clients

**Example:**
\`\`\`
Client (React)  ←→  REST API  ←→  Server (Java/Spring Boot)
\`\`\`

### 3. Uniform Interface

**Definition**: A consistent way of interacting with resources across the API.

**Components:**

#### a. Resource Identification

Resources are identified by **unique URLs**:

\`\`\`
/users/123          → User resource with ID 123
/users/123/posts     → Posts belonging to user 123
/users/123/posts/456 → Post 456 by user 123
\`\`\`

#### b. Resource Manipulation Through Representations

Resources are manipulated through their **representations** (JSON, XML):

\`\`\`json
// Request representation
{
  "name": "Dattu p",
  "email": " Dattu@example.com"
}

// Response representation
{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com",
  "createdAt": "2026-02-21T10:00:00Z"
}
\`\`\`

#### c. Self-Descriptive Messages

Each message contains enough information to describe how to process it:

\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token123
\`\`\`

**Contains:**
- **Method**: What action (GET)
- **URL**: Which resource (/api/users/123)
- **Headers**: Format (Accept), Authentication (Authorization)

#### d. HATEOAS (Hypermedia as the Engine of Application State)

Resources include links to related resources:

\`\`\`json
{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com",
  "_links": {
    "self": { "href": "/api/users/123" },
    "posts": { "href": "/api/users/123/posts" },
    "update": { "href": "/api/users/123", "method": "PUT" },
    "delete": { "href": "/api/users/123", "method": "DELETE" }
  }
}
\`\`\`

**Benefits:**
- Client can discover available actions
- API is self-documenting
- Easier to evolve API

### 4. Layered System

**Definition**: Architecture can be composed of hierarchical layers.

**Layers:**
\`\`\`
Client
  ↓
Load Balancer
  ↓
API Gateway
  ↓
Application Server
  ↓
Database
\`\`\`

**Benefits:**
- **Security**: Layers can enforce security policies
- **Scalability**: Each layer can scale independently
- **Flexibility**: Layers can be added/removed

**Example:**
\`\`\`
Client → CDN → Load Balancer → API Gateway → Microservices → Database
\`\`\`

### 5. Cacheable

**Definition**: Responses should be cacheable when possible.

**Benefits:**
- **Performance**: Faster responses
- **Scalability**: Reduced server load
- **Bandwidth**: Less data transfer

**Implementation:**
\`\`\`http
HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "abc123"
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT

{
  "id": 123,
  "name": "Dattu p"
}
\`\`\`

**Cacheable Methods:**
- **GET**: Usually cacheable
- **HEAD**: Usually cacheable
- **POST, PUT, PATCH, DELETE**: Not cacheable

### 6. Code on Demand (Optional)

**Definition**: Server can send executable code to client (JavaScript, applets).

**Rarely Used:**
- Most REST APIs don't use this
- More common in web applications
- Not essential for REST compliance

---

## RESTful URL Design

### Best Practices

#### 1. Use Nouns, Not Verbs

**Wrong approach:**
\`\`\`
GET /getUsers
POST /createUser
PUT /updateUser
\`\`\`

**Correct approach:**
\`\`\`
GET /users
POST /users
PUT /users/123
\`\`\`

#### 2. Use Plural Nouns

**Wrong approach:**
\`\`\`
GET /user/123
\`\`\`

**Correct approach:**
\`\`\`
GET /users/123
\`\`\`

#### 3. Use Hierarchical URLs

**Good approach:**
\`\`\`
GET /users/123/posts        → Posts by user 123
GET /users/123/posts/456    → Post 456 by user 123
\`\`\`

#### 4. Use Query Parameters for Filtering

**Good approach:**
\`\`\`
GET /users?status=active&role=admin
GET /users?page=1&limit=10
GET /users?sort=name&order=asc
\`\`\`

#### 5. Use HTTP Methods Correctly

\`\`\`
GET    /users        → List users
GET    /users/123    → Get user 123
POST   /users        → Create user
PUT    /users/123     → Update user 123
PATCH  /users/123     → Partially update user 123
DELETE /users/123     → Delete user 123
\`\`\`

### URL Structure Examples

**Simple Resources:**
\`\`\`
GET    /api/users
GET    /api/users/123
POST   /api/users
PUT    /api/users/123
DELETE /api/users/123
\`\`\`

**Nested Resources:**
\`\`\`
GET    /api/users/123/posts
GET    /api/users/123/posts/456
POST   /api/users/123/posts
PUT    /api/users/123/posts/456
DELETE /api/users/123/posts/456
\`\`\`

**Filtering and Pagination:**
\`\`\`
GET /api/users?status=active
GET /api/users?page=1&limit=10
GET /api/users?sort=name&order=desc
GET /api/users?status=active&role=admin&page=1&limit=10
\`\`\`

---

## RESTful API Design Example

### Complete User API

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET /api/users - List all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String role,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int limit
    ) {
        List<User> users = userService.findUsers(status, role, page, limit);
        return ResponseEntity.ok(users);
    }
    
    // GET /api/users/123 - Get single user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/users - Create user
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    // PUT /api/users/123 - Update entire user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserRequest request
    ) {
        return userService.update(id, request)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // PATCH /api/users/123 - Partially update user
    @PatchMapping("/{id}")
    public ResponseEntity<User> partialUpdateUser(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates
    ) {
        return userService.partialUpdate(id, updates)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /api/users/123 - Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
\`\`\`

---

## REST vs Other API Styles

### REST vs SOAP

| Feature | REST | SOAP |
|---------|------|------|
| **Format** | JSON, XML | XML only |
| **Complexity** | Simple | Complex |
| **Caching** | Yes | Limited |
| **Overhead** | Low | High |
| **Standards** | HTTP | WSDL, XML Schema |
| **Use Case** | Web APIs | Enterprise systems |

### REST vs GraphQL

| Feature | REST | GraphQL |
|---------|------|---------|
| **Endpoints** | Multiple | Single |
| **Data Fetching** | Fixed | Flexible |
| **Over-fetching** | Possible | No |
| **Under-fetching** | Possible | No |
| **Caching** | Easy | Complex |
| **Learning Curve** | Low | Medium |

---

## Industry Examples

### GitHub API

**RESTful Design:**
\`\`\`
GET    /repos/owner/repo
POST   /repos/owner/repo/issues
GET    /repos/owner/repo/issues/123
PATCH  /repos/owner/repo/issues/123
DELETE /repos/owner/repo/issues/123
\`\`\`

**Features:**
- Resource-based URLs
- Proper HTTP methods
- JSON responses
- Stateless authentication

### Twitter API

**RESTful Design:**
\`\`\`
GET    /2/tweets/search/recent
POST   /2/tweets
GET    /2/tweets/{id}
DELETE /2/tweets/{id}
\`\`\`

**Features:**
- Versioned API (/2/)
- Query parameters for filtering
- Proper status codes

### Stripe API

**RESTful Design:**
\`\`\`
GET    /v1/customers
POST   /v1/customers
GET    /v1/customers/{id}
POST   /v1/customers/{id}
DELETE /v1/customers/{id}
\`\`\`

**Features:**
- Versioned URLs
- Consistent structure
- Comprehensive documentation

---

## Common REST Mistakes

### 1. Using Verbs in URLs

**Wrong approach:**
\`\`\`
POST /api/users/create
GET  /api/users/getAll
\`\`\`

**Correct approach:**
\`\`\`
POST /api/users
GET  /api/users
\`\`\`

### 2. Not Using Proper HTTP Methods

**Wrong approach:**
\`\`\`
GET /api/users/123/delete
POST /api/users/123/update
\`\`\`

**Correct approach:**
\`\`\`
DELETE /api/users/123
PUT    /api/users/123
\`\`\`

### 3. Not Returning Proper Status Codes

**Wrong approach:**
\`\`\`
POST /api/users → 200 OK (should be 201 Created)
\`\`\`

**Correct approach:**
\`\`\`
POST /api/users → 201 Created
\`\`\`

### 4. Not Being Stateless

**Wrong approach:**
\`\`\`
// Server stores session
Session session = request.getSession();
session.setAttribute("userId", 123);
\`\`\`

**Correct approach:**
\`\`\`
// Token in every request
Authorization: Bearer token123
\`\`\`

---

## Summary

REST is the most popular API architectural style:

- **Principles**: Statelessness, client-server, uniform interface, layered system, cacheable
- **URL Design**: Resource-based, use nouns, hierarchical structure
- **HTTP Methods**: GET (retrieve), POST (create), PUT (update), PATCH (partial update), DELETE (remove)
- **Benefits**: Simple, scalable, maintainable, widely adopted

**Remember these important points:**
- Treat everything as a resource
- Use proper HTTP methods
- Design resource-based URLs
- Keep APIs stateless
- Return appropriate status codes
- Use consistent response formats

REST is the foundation of modern web APIs. When you understand REST principles, you can build APIs that are easy to use, maintain, and scale. This knowledge is essential whether you're building your own APIs or integrating with third-party services.

---

## Frequently Asked Questions (FAQs)

### 1. What makes an API RESTful?

An API is RESTful if it follows REST principles:
- **Stateless**: No server-side session storage
- **Resource-based URLs**: Use nouns, not verbs
- **HTTP Methods**: Use GET, POST, PUT, PATCH, DELETE correctly
- **Uniform Interface**: Consistent structure across API
- **Cacheable**: Responses can be cached when appropriate

### 2. What is the difference between REST and RESTful?

**REST** is the architectural style/principle. **RESTful** describes an API that follows REST principles. Most people use them interchangeably.

### 3. Is REST a protocol?

**No**, REST is an **architectural style**, not a protocol. It uses HTTP protocol but defines how to structure APIs.

### 4. What is HATEOAS?

**HATEOAS** (Hypermedia as the Engine of Application State) means responses include links to related resources. It makes APIs self-documenting and discoverable.

### 5. Can REST APIs use sessions?

Technically yes, but it **violates statelessness principle**. REST APIs should use tokens (JWT) instead of server-side sessions.

### 6. What is the difference between PUT and PATCH?

**PUT** replaces the entire resource (idempotent). **PATCH** updates only specified fields (may or may not be idempotent).

### 7. Should REST APIs always return JSON?

**No**, REST APIs can return any format (JSON, XML, etc.). JSON is most common because it's lightweight and easy to parse.

### 8. How do I version a REST API?

Common approaches:
- **URL versioning**: \`/api/v1/users\`, \`/api/v2/users\`
- **Header versioning**: \`Accept: application/vnd.api+json;version=2\`
- **Query parameter**: \`/api/users?version=2\`

### 9. What is the difference between REST and GraphQL?

**REST** uses multiple endpoints with fixed responses. **GraphQL** uses a single endpoint with flexible queries. REST is simpler; GraphQL is more flexible.

### 10. Do all REST APIs need to follow all principles?

**Ideally yes**, but in practice, many REST APIs don't implement HATEOAS or code-on-demand. The core principles (statelessness, resource-based URLs, HTTP methods) are most important.
  `,
  code: `// REST API Fundamentals - Complete Examples

// Example 1: RESTful User Controller (Java - Spring Boot)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET /api/users - List all users (with filtering)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String role,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int limit
    ) {
        List<User> users = userService.findUsers(status, role, page, limit);
        return ResponseEntity.ok(users);
    }
    
    // GET /api/users/123 - Get single user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/users - Create user
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    // PUT /api/users/123 - Update entire user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserRequest request
    ) {
        return userService.update(id, request)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // PATCH /api/users/123 - Partially update user
    @PatchMapping("/{id}")
    public ResponseEntity<User> partialUpdateUser(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates
    ) {
        return userService.partialUpdate(id, updates)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /api/users/123 - Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

// Example 2: Nested Resources (Java)
@RestController
@RequestMapping("/api/users/{userId}/posts")
public class UserPostController {
    
    // GET /api/users/123/posts - Get all posts by user
    @GetMapping
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        List<Post> posts = postService.findByUserId(userId);
        return ResponseEntity.ok(posts);
    }
    
    // GET /api/users/123/posts/456 - Get specific post
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getUserPost(
        @PathVariable Long userId,
        @PathVariable Long postId
    ) {
        Post post = postService.findByUserAndPost(userId, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }
    
    // POST /api/users/123/posts - Create post for user
    @PostMapping
    public ResponseEntity<Post> createUserPost(
        @PathVariable Long userId,
        @RequestBody PostRequest request
    ) {
        Post post = postService.create(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + userId + "/posts/" + post.getId()))
            .body(post);
    }
}

// Example 3: Stateless Authentication (Java)
@RestController
@RequestMapping("/api")
public class StatelessController {
    
    // Stateless - Token in every request
    @GetMapping("/dashboard")
    public ResponseEntity<Dashboard> getDashboard(
        @RequestHeader("Authorization") String authHeader
    ) {
        // Extract token from header
        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String token = authHeader.substring(7);
        User user = tokenService.validateToken(token);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Dashboard dashboard = dashboardService.getDashboard(user.getId());
        return ResponseEntity.ok(dashboard);
    }
}

// Example 4: HATEOAS Implementation (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<UserResource> getUser(@PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    UserResource resource = new UserResource(user);
    
    // Add links (HATEOAS)
    resource.add(linkTo(methodOn(UserController.class).getUser(id)).withSelfRel());
    resource.add(linkTo(methodOn(UserController.class).getAllUsers(null, null, 0, 10)).withRel("users"));
    resource.add(linkTo(methodOn(UserPostController.class).getUserPosts(id)).withRel("posts"));
    
    return ResponseEntity.ok(resource);
}

// Example 5: RESTful API Client (JavaScript)
class RestApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async request(method, endpoint, data = null) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': \`Bearer \${this.getToken()}\`
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(\`API Error: \${response.status}\`);
        }
        
        return await response.json();
    }
    
    // GET - Retrieve resources
    async get(endpoint) {
        return this.request('GET', endpoint);
    }
    
    // POST - Create resource
    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    }
    
    // PUT - Update entire resource
    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    }
    
    // PATCH - Partially update resource
    async patch(endpoint, data) {
        return this.request('PATCH', endpoint, data);
    }
    
    // DELETE - Remove resource
    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }
    
    getToken() {
        return localStorage.getItem('authToken');
    }
}

// Usage
const api = new RestApiClient('https://api.example.com');

// GET /api/users
const users = await api.get('/users');

// GET /api/users/123
const user = await api.get('/users/123');

// POST /api/users
const newUser = await api.post('/users', {
    name: 'Dattu p',
    email: ' Dattu@example.com'
});

// PUT /api/users/123
const updatedUser = await api.put('/users/123', {
    name: ' Dattu Updated',
    email: ' Dattu.updated@example.com'
});

// PATCH /api/users/123
const partiallyUpdated = await api.patch('/users/123', {
    email: 'newemail@example.com'
});

// DELETE /api/users/123
await api.delete('/users/123');

// Example 6: Filtering and Pagination (Java)
@GetMapping("/api/users")
public ResponseEntity<Page<User>> getUsers(
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String role,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) String sort
) {
    Pageable pageable = PageRequest.of(page, size);
    if (sort != null) {
        String[] sortParams = sort.split(",");
        Sort sortObj = Sort.by(sortParams);
        pageable = PageRequest.of(page, size, sortObj);
    }
    
    Page<User> users = userService.findUsers(status, role, pageable);
    return ResponseEntity.ok(users);
}

// Example 7: RESTful Error Handling (Java)
@RestControllerAdvice
public class RestExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "NOT_FOUND",
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse(
            "VALIDATION_ERROR",
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}

// Example 8: Caching Headers (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    String etag = generateETag(user);
    
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .eTag(etag)
        .lastModified(user.getUpdatedAt())
        .body(user);
}`
};

export default restApiFundamentals;

