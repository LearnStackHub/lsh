const restfulApiDesign = {
  id: 'restful-api-design',
  title: 'RESTful API Design - Best Practices and Patterns',
  description: 'Learn RESTful API design: naming conventions, versioning, pagination, filtering, sorting, and best practices for building professional APIs',
  content: `
# RESTful API Design — Complete Guide

RESTful API design is about creating APIs that are intuitive, consistent, and easy to use. Following best practices ensures your API is maintainable, scalable, and developer-friendly.

---

## RESTful Design Principles

### 1. Resource-Based URLs

**Use nouns, not verbs:**
**Wrong approach:**
\`\`\`
GET /getUsers
POST /createUser
PUT /updateUser
DELETE /deleteUser
\`\`\`

**Correct approach:**
\`\`\`
GET    /users
POST   /users
GET    /users/123
PUT    /users/123
DELETE /users/123
\`\`\`

### 2. Use HTTP Methods Correctly

**Standard mapping:**
\`\`\`
GET    /users        → List users
GET    /users/123    → Get user 123
POST   /users        → Create user
PUT    /users/123     → Update entire user
PATCH  /users/123     → Partially update user
DELETE /users/123     → Delete user
\`\`\`

### 3. Use Plural Nouns

**Consistent naming:**
\`\`\`
/users        (not /user)
/products     (not /product)
/orders       (not /order)
\`\`\`

### 4. Hierarchical Resources

**Nested resources:**
\`\`\`
GET    /users/123/posts        → Posts by user 123
POST   /users/123/posts        → Create post for user 123
GET    /users/123/posts/456    → Post 456 by user 123
DELETE /users/123/posts/456    → Delete post 456
\`\`\`

---

## URL Design Best Practices

### 1. Use Forward Slashes for Hierarchy

**Good approach:**
\`\`\`
/users/123/posts/456
\`\`\`

**Bad approach:**
\`\`\`
/users_123_posts_456
\`\`\`

### 2. Use Hyphens for Readability

**Good approach:**
\`\`\`
/user-profiles
/order-items
\`\`\`

**Bad approach:**
\`\`\`
/userprofiles
/orderitems
\`\`\`

### 3. Use Lowercase

**Good approach:**
\`\`\`
/api/users
/api/order-items
\`\`\`

**Bad approach:**
\`\`\`
/api/Users
/api/OrderItems
\`\`\`

### 4. Don't Use File Extensions

**Good approach:**
\`\`\`
/api/users
/api/users/123
\`\`\`

**Bad approach:**
\`\`\`
/api/users.json
/api/users/123.xml
\`\`\`

### 5. Use Query Parameters for Filtering

**Good approach:**
\`\`\`
GET /api/users?status=active&role=admin
GET /api/products?category=electronics&minPrice=100
\`\`\`

**Bad approach:**
\`\`\`
GET /api/users/active/admin
GET /api/products/electronics/100
\`\`\`

---

## API Versioning

### Why Version APIs?

**Reasons:**
- Backward compatibility
- Gradual migration
- Breaking changes
- Multiple client versions

### Versioning Strategies

#### 1. URL Versioning (Most Common)

**Format:**
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

**Pros:**
- Clear and explicit
- Easy to understand
- Cache-friendly

**Cons:**
- URL changes
- More maintenance

**Example:**
\`\`\`java
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    // Version 1 implementation
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    // Version 2 implementation
}
\`\`\`

#### 2. Header Versioning

**Format:**
\`\`\`
GET /api/users
Accept: application/vnd.api+json;version=2
\`\`\`

**Pros:**
- Clean URLs
- Content negotiation

**Cons:**
- Less discoverable
- Harder to test

#### 3. Query Parameter Versioning

**Format:**
\`\`\`
GET /api/users?version=2
\`\`\`

**Pros:**
- Simple
- Easy to test

**Cons:**
- Not RESTful
- Can be confusing

### Best Practice: URL Versioning

**Recommended approach:**
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

**Why:**
- Most common
- Easy to understand
- Clear versioning
- Cache-friendly

---

## Pagination

### Why Pagination?

**Benefits:**
- Performance (limit data)
- User experience (manageable chunks)
- Server load (reduced)

### Pagination Strategies

#### 1. Offset-Based (Page/Size)

**Format:**
\`\`\`
GET /api/users?page=1&limit=10
\`\`\`

**Example:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<Page<User>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    Page<User> users = userService.findAll(PageRequest.of(page, size));
    return ResponseEntity.ok(users);
}
\`\`\`

**Response:**
\`\`\`json
{
  "content": [...],
  "page": 1,
  "size": 10,
  "totalElements": 100,
  "totalPages": 10
}
\`\`\`

**Pros:**
- Simple
- Easy to implement
- User-friendly

**Cons:**
- Performance issues with large offsets
- Inconsistent if data changes

#### 2. Cursor-Based

**Format:**
\`\`\`
GET /api/users?cursor=abc123&limit=10
\`\`\`

**Response:**
\`\`\`json
{
  "data": [...],
  "nextCursor": "xyz789",
  "hasMore": true
}
\`\`\`

**Pros:**
- Better performance
- Consistent results
- Scalable

**Cons:**
- More complex
- Less intuitive

**Example:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<CursorPage<User>> getUsers(
    @RequestParam(required = false) String cursor,
    @RequestParam(defaultValue = "10") int limit
) {
    CursorPage<User> users = userService.findWithCursor(cursor, limit);
    return ResponseEntity.ok(users);
}
\`\`\`

### Pagination Best Practices

**1. Default Limits:**
\`\`\`
?limit=10 (default)
?limit=50 (max)
\`\`\`

**2. Include Metadata:**
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  }
}
\`\`\`

**3. Link Headers:**
\`\`\`http
Link: </api/users?page=2>; rel="next",
      </api/users?page=10>; rel="last"
\`\`\`

---

## Filtering and Sorting

### Filtering

**Query Parameters:**
\`\`\`
GET /api/users?status=active&role=admin
GET /api/products?category=electronics&minPrice=100&maxPrice=1000
\`\`\`

**Example:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String role,
    @RequestParam(required = false) String email
) {
    List<User> users = userService.findUsers(status, role, email);
    return ResponseEntity.ok(users);
}
\`\`\`

### Sorting

**Query Parameters:**
\`\`\`
GET /api/users?sort=name&order=asc
GET /api/users?sort=createdAt&order=desc
\`\`\`

**Multiple Fields:**
\`\`\`
GET /api/users?sort=name,email&order=asc,desc
\`\`\`

**Example:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String sort,
    @RequestParam(required = false) String order
) {
    Sort sortObj = Sort.by(
        "desc".equalsIgnoreCase(order) ? 
        Sort.Direction.DESC : Sort.Direction.ASC, 
        sort != null ? sort : "id"
    );
    List<User> users = userService.findAll(sortObj);
    return ResponseEntity.ok(users);
}
\`\`\`

### Advanced Filtering

**Operators:**
\`\`\`
GET /api/users?age[gte]=18&age[lte]=65
GET /api/products?price[gt]=100&price[lt]=1000
GET /api/users?name[like]= Dattu
\`\`\`

**Example:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) @Min(0) Integer ageMin,
    @RequestParam(required = false) @Max(120) Integer ageMax,
    @RequestParam(required = false) String nameContains
) {
    List<User> users = userService.findUsers(ageMin, ageMax, nameContains);
    return ResponseEntity.ok(users);
}
\`\`\`

---

## Response Format

### Consistent Structure

**Success Response:**
\`\`\`json
{
  "data": {
    "id": 123,
    "name": "Dattu p"
  }
}
\`\`\`

**List Response:**
\`\`\`json
{
  "data": [
    {"id": 1, "name": "User 1"},
    {"id": 2, "name": "User 2"}
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
\`\`\`

### Include Metadata

**Useful metadata:**
\`\`\`json
{
  "data": {...},
  "meta": {
    "timestamp": "2026-02-21T10:00:00Z",
    "version": "1.0",
    "requestId": "req-123456"
  }
}
\`\`\`

---

## Error Handling

### Standard Error Format

**Structure:**
\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {},
    "timestamp": "2026-02-21T10:00:00Z",
    "path": "/api/users/123"
  }
}
\`\`\`

### HTTP Status Codes

**Use appropriate codes:**
- **200 OK**: Success
- **201 Created**: Resource created
- **400 Bad Request**: Validation error
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Permission denied
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict
- **500 Internal Server Error**: Server error

### Error Codes

**Categorize errors:**
\`\`\`
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
NOT_FOUND_ERROR
CONFLICT_ERROR
SERVER_ERROR
\`\`\`

---

## Security Best Practices

### 1. Use HTTPS

**Always use HTTPS:**
\`\`\`
https://api.example.com
\`\`\`

### 2. Authentication

**Use standard methods:**
- Bearer tokens (JWT)
- API keys
- OAuth 2.0

### 3. Rate Limiting

**Implement rate limiting:**
\`\`\`http
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 99
X-Rate-Limit-Reset: 1642771200
\`\`\`

### 4. Input Validation

**Validate all input:**
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
    // Validation happens automatically
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}
\`\`\`

### 5. CORS Configuration

**Whitelist origins:**
\`\`\`java
@CrossOrigin(origins = {"https://app.example.com"})
\`\`\`

---

## Industry Examples

### GitHub API

**Design:**
\`\`\`
GET    /repos/:owner/:repo
POST   /repos/:owner/:repo/issues
GET    /repos/:owner/:repo/issues/:number
PATCH  /repos/:owner/:repo/issues/:number
\`\`\`

**Features:**
- Resource-based URLs
- Proper HTTP methods
- Pagination
- Filtering

### Stripe API

**Design:**
\`\`\`
GET    /v1/customers
POST   /v1/customers
GET    /v1/customers/:id
POST   /v1/customers/:id
DELETE /v1/customers/:id
\`\`\`

**Features:**
- Versioned URLs
- Consistent structure
- Comprehensive documentation

### Twitter API

**Design:**
\`\`\`
GET    /2/tweets/search/recent
POST   /2/tweets
GET    /2/tweets/:id
DELETE /2/tweets/:id
\`\`\`

**Features:**
- Versioned API
- Query parameters for filtering
- Pagination

---

## Summary

RESTful API design principles:

- **Resource-Based URLs**: Use nouns, hierarchical structure
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE correctly
- **Versioning**: URL versioning (most common)
- **Pagination**: Offset or cursor-based
- **Filtering/Sorting**: Query parameters
- **Consistent Format**: Standard response structure
- **Error Handling**: Proper status codes and error format
- **Security**: HTTPS, authentication, rate limiting

**Important points to remember:**
- Use resource-based URLs with nouns
- Follow HTTP method conventions
- Version your API
- Implement pagination and filtering
- Use consistent response format
- Handle errors properly
- Follow security best practices

RESTful design principles help you build APIs that developers actually want to use. When your API follows these patterns, it becomes intuitive, maintainable, and professional. This is what separates good APIs from great ones.

---

## Frequently Asked Questions (FAQs)

### 1. Should I use singular or plural nouns in URLs?

**Use plural nouns** for consistency: \`/users\`, \`/products\`, \`/orders\`. This is the most common convention.

### 2. How do I handle nested resources?

**Use hierarchical URLs**: \`/users/123/posts\` for posts belonging to user 123. Limit nesting to 2-3 levels.

### 3. What is the best versioning strategy?

**URL versioning** (\`/api/v1/users\`) is most common and recommended. It's clear, cache-friendly, and easy to understand.

### 4. How do I implement pagination?

**Offset-based** (\`?page=1&limit=10\`) is simpler. **Cursor-based** is better for large datasets. Choose based on your needs.

### 5. Should I use query parameters or path variables?

**Path variables** for resource identification (\`/users/123\`). **Query parameters** for filtering, pagination, sorting (\`?status=active&page=1\`).

### 6. How do I handle complex filtering?

**Use query parameters** with operators: \`?age[gte]=18&age[lte]=65\`. Or use a query language like GraphQL for complex queries.

### 7. What response format should I use?

**Consistent structure**: \`{"data": {...}, "meta": {...}}\` for success. \`{"error": {...}}\` for errors. Include metadata for pagination, timestamps, etc.

### 8. How do I handle API breaking changes?

**Version your API**: Create new version (\`/api/v2\`). Keep old version running. Deprecate old version gradually.

### 9. Should I include links in responses (HATEOAS)?

**Optional but recommended**: Include links to related resources. Makes API self-documenting and discoverable.

### 10. How do I document my API?

**Use OpenAPI/Swagger**: Generate interactive documentation. Include examples, error codes, and authentication methods.
  `,
  code: `// RESTful API Design - Complete Examples

// Example 1: Resource-Based Controller (Java)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserRequest request
    ) {
        return userService.update(id, request)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

// Example 2: API Versioning (Java)
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    // Version 1 implementation
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    // Version 2 implementation
}

// Example 3: Pagination (Java)
@GetMapping("/api/users")
public ResponseEntity<Page<User>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    Page<User> users = userService.findAll(PageRequest.of(page, size));
    return ResponseEntity.ok(users);
}

// Example 4: Filtering (Java)
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String role,
    @RequestParam(required = false) @Min(0) Integer ageMin,
    @RequestParam(required = false) @Max(120) Integer ageMax
) {
    List<User> users = userService.findUsers(status, role, ageMin, ageMax);
    return ResponseEntity.ok(users);
}

// Example 5: Sorting (Java)
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String sort,
    @RequestParam(required = false, defaultValue = "asc") String order
) {
    Sort.Direction direction = "desc".equalsIgnoreCase(order) ? 
        Sort.Direction.DESC : Sort.Direction.ASC;
    Sort sortObj = Sort.by(direction, sort != null ? sort : "id");
    List<User> users = userService.findAll(sortObj);
    return ResponseEntity.ok(users);
}

// Example 6: Nested Resources (Java)
@RestController
@RequestMapping("/api/users/{userId}/posts")
public class UserPostController {
    
    @GetMapping
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        List<Post> posts = postService.findByUserId(userId);
        return ResponseEntity.ok(posts);
    }
    
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

// Example 7: Consistent Response Format (Java)
public class ApiResponse<T> {
    private T data;
    private Meta meta;
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.data = data;
        response.meta = new Meta();
        return response;
    }
}

// Example 8: Error Response (Java)
public class ErrorResponse {
    private Error error;
    
    public static ErrorResponse of(String code, String message) {
        ErrorResponse response = new ErrorResponse();
        response.error = new Error(code, message);
        return response;
    }
}

// Example 9: HATEOAS Links (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<UserResource> getUser(@PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    UserResource resource = new UserResource(user);
    resource.add(linkTo(methodOn(UserController.class).getUser(id)).withSelfRel());
    resource.add(linkTo(methodOn(UserController.class).getAllUsers()).withRel("users"));
    resource.add(linkTo(methodOn(UserPostController.class).getUserPosts(id)).withRel("posts"));
    
    return ResponseEntity.ok(resource);
}

// Example 10: API Documentation (OpenAPI)
@OpenAPIDefinition(
    info = @Info(
        title = "User API",
        version = "1.0",
        description = "RESTful API for user management"
    )
)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Operation(summary = "Get all users")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // ...
    }
}`
};

export default restfulApiDesign;

