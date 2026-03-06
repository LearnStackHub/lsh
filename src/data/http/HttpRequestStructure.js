const httpRequestStructure = {
  id: 'http-request-structure',
  title: 'HTTP Request Structure - Request Line, Methods, Headers, Body',
  description: 'Learn the complete structure of HTTP requests including request line, HTTP methods, headers, body, and query parameters vs path variables',
  content: `
# HTTP Request Structure — Complete Guide

An HTTP request is how clients communicate with servers. Understanding its structure is fundamental to building and consuming web APIs. Every HTTP request follows a specific format with distinct components.

---

## HTTP Request Components

An HTTP request consists of four main parts:

\`\`\`
┌─────────────────────────────────────┐
│  1. Request Line                     │
│     Method + URL + HTTP Version      │
├─────────────────────────────────────┤
│  2. Request Headers                  │
│     Metadata about the request       │
├─────────────────────────────────────┤
│  3. Empty Line (CRLF)                │
│     Separates headers from body      │
├─────────────────────────────────────┤
│  4. Request Body (Optional)          │
│     Data sent to the server          │
└─────────────────────────────────────┘
\`\`\`

---

## 1. Request Line

The **request line** is the first line of an HTTP request. It contains three parts:

\`\`\`http
METHOD /path/to/resource HTTP/VERSION
\`\`\`

### Components

1. **HTTP Method**: The action to perform (GET, POST, PUT, DELETE, etc.)
2. **Request URI**: The path to the resource
3. **HTTP Version**: Protocol version (HTTP/1.1, HTTP/2, etc.)

### Example

\`\`\`http
GET /api/users/123 HTTP/1.1
\`\`\`

**Breakdown:**
- **Method**: \`GET\` - Retrieve data
- **URI**: \`/api/users/123\` - Path to user resource with ID 123
- **Version**: \`HTTP/1.1\` - Using HTTP version 1.1

### Real-World Examples

**Example 1: Simple GET Request**
\`\`\`http
GET /products HTTP/1.1
Host: api.example.com
\`\`\`

**Example 2: POST Request with Body**
\`\`\`http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 45

{"name":"John Doe","email":"john@example.com"}
\`\`\`

**Example 3: DELETE Request**
\`\`\`http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
\`\`\`

---

## 2. HTTP Methods (Verbs)

HTTP methods indicate the **action** you want to perform on a resource. Each method has a specific purpose and behavior.

### GET - Retrieve Data

**Purpose**: Fetch data from the server

**Characteristics:**
- **Idempotent**: Yes (same request = same result)
- **Safe**: Yes (doesn't modify server state)
- **Body**: Not allowed
- **Caching**: Can be cached

**Example:**
\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com
\`\`\`

**Use Cases:**
- Fetching user profile
- Retrieving product list
- Getting blog posts
- Loading dashboard data

**Real-World Example:**
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);
}
\`\`\`

### POST - Create Resource

**Purpose**: Create a new resource or submit data

**Characteristics:**
- **Idempotent**: No (multiple requests may create multiple resources)
- **Safe**: No (modifies server state)
- **Body**: Required (usually)
- **Caching**: Not cached

**Example:**
\`\`\`http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

**Use Cases:**
- Creating new users
- Submitting forms
- Uploading files
- Processing payments

**Real-World Example:**
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/api/users/" + user.getId()))
        .body(user);
}
\`\`\`

### PUT - Update Entire Resource

**Purpose**: Replace an entire resource with new data

**Characteristics:**
- **Idempotent**: Yes (same request = same result)
- **Safe**: No (modifies server state)
- **Body**: Required
- **Caching**: Not cached

**Example:**
\`\`\`http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "id": 123,
  "name": "John Updated",
  "email": "john.updated@example.com"
}
\`\`\`

**Use Cases:**
- Updating entire user profile
- Replacing document content
- Full resource updates

**Real-World Example:**
\`\`\`java
@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @RequestBody UserRequest request
) {
    User updatedUser = userService.update(id, request);
    return ResponseEntity.ok(updatedUser);
}
\`\`\`

### PATCH - Partial Update

**Purpose**: Partially update a resource

**Characteristics:**
- **Idempotent**: Depends on implementation
- **Safe**: No (modifies server state)
- **Body**: Required (only changed fields)
- **Caching**: Not cached

**Example:**
\`\`\`http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "newemail@example.com"
}
\`\`\`

**Use Cases:**
- Updating email address
- Changing password
- Partial profile updates

**Real-World Example:**
\`\`\`java
@PatchMapping("/api/users/{id}")
public ResponseEntity<User> partialUpdateUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
) {
    User updatedUser = userService.partialUpdate(id, updates);
    return ResponseEntity.ok(updatedUser);
}
\`\`\`

### DELETE - Remove Resource

**Purpose**: Delete a resource

**Characteristics:**
- **Idempotent**: Yes (deleting twice = same result)
- **Safe**: No (modifies server state)
- **Body**: Not allowed (usually)
- **Caching**: Not cached

**Example:**
\`\`\`http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
\`\`\`

**Use Cases:**
- Deleting user accounts
- Removing products
- Clearing data

**Real-World Example:**
\`\`\`java
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
\`\`\`

### Other HTTP Methods

**OPTIONS** - Get allowed methods
\`\`\`http
OPTIONS /api/users HTTP/1.1
Host: api.example.com

HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE, OPTIONS
\`\`\`

**HEAD** - Get headers only (no body)
\`\`\`http
HEAD /api/users/123 HTTP/1.1
Host: api.example.com

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156
\`\`\`

---

## 3. Request Headers

Headers provide **metadata** about the request. They are key-value pairs that give the server additional information.

### Common Request Headers

#### Host

**Purpose**: Specifies the domain name of the server

**Example:**
\`\`\`http
Host: api.example.com
\`\`\`

**Why Required:**
- Enables virtual hosting (multiple sites on one server)
- Required in HTTP/1.1

#### Content-Type

**Purpose**: Indicates the media type of the request body

**Common Values:**
- \`application/json\` - JSON data
- \`application/xml\` - XML data
- \`application/x-www-form-urlencoded\` - Form data
- \`multipart/form-data\` - File uploads
- \`text/plain\` - Plain text

**Example:**
\`\`\`http
Content-Type: application/json
\`\`\`

#### Content-Length

**Purpose**: Size of the request body in bytes

**Example:**
\`\`\`http
Content-Length: 156
\`\`\`

#### Authorization

**Purpose**: Authentication credentials

**Common Formats:**
- **Basic**: \`Authorization: Basic base64(username:password)\`
- **Bearer**: \`Authorization: Bearer token123\`
- **API Key**: \`Authorization: ApiKey key123\`

**Example:**
\`\`\`http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### Accept

**Purpose**: Media types the client can handle in response

**Example:**
\`\`\`http
Accept: application/json, text/html
\`\`\`

#### User-Agent

**Purpose**: Identifies the client application

**Example:**
\`\`\`http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0
\`\`\`

#### Accept-Language

**Purpose**: Preferred languages for response

**Example:**
\`\`\`http
Accept-Language: en-US, en;q=0.9
\`\`\`

#### Cache-Control

**Purpose**: Directives for caching

**Example:**
\`\`\`http
Cache-Control: no-cache
\`\`\`

### Custom Headers

You can create custom headers (usually prefixed with \`X-\`):

\`\`\`http
X-API-Version: 1.0
X-Request-ID: abc123
X-Custom-Header: value
\`\`\`

---

## 4. Request Body

The **request body** contains the actual data being sent to the server. It's optional and only used with certain methods.

### When Body is Used

- **POST**: Usually has a body (data to create)
- **PUT**: Has a body (complete resource data)
- **PATCH**: Has a body (partial updates)
- **GET**: No body (data in URL)
- **DELETE**: Usually no body

### Body Formats

#### JSON

**Content-Type**: \`application/json\`

**Example:**
\`\`\`http
POST /api/users HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
\`\`\`

#### Form Data

**Content-Type**: \`application/x-www-form-urlencoded\`

**Example:**
\`\`\`http
POST /api/login HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=john&password=secret123
\`\`\`

#### Multipart (File Upload)

**Content-Type**: \`multipart/form-data\`

**Example:**
\`\`\`http
POST /api/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

[binary file data]
------WebKitFormBoundary--
\`\`\`

#### XML

**Content-Type**: \`application/xml\`

**Example:**
\`\`\`http
POST /api/data HTTP/1.1
Content-Type: application/xml

<?xml version="1.0"?>
<user>
  <name>John Doe</name>
  <email>john@example.com</email>
</user>
\`\`\`

---

## Query Parameters vs Path Variables

### Query Parameters

**Format**: \`?key=value&key2=value2\`

**Use Cases:**
- Filtering data
- Pagination
- Sorting
- Optional parameters

**Example:**
\`\`\`http
GET /api/users?page=1&limit=10&sort=name&status=active HTTP/1.1
\`\`\`

**Breakdown:**
- \`page=1\` - Page number
- \`limit=10\` - Items per page
- \`sort=name\` - Sort by name
- \`status=active\` - Filter by status

**Server-Side Handling:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int limit,
    @RequestParam(required = false) String sort,
    @RequestParam(required = false) String status
) {
    // Filter and paginate users
    List<User> users = userService.findUsers(page, limit, sort, status);
    return ResponseEntity.ok(users);
}
\`\`\`

### Path Variables

**Format**: \`/resource/{id}\`

**Use Cases:**
- Resource identification
- Required parameters
- RESTful URLs

**Example:**
\`\`\`http
GET /api/users/123 HTTP/1.1
\`\`\`

**Server-Side Handling:**
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);
}
\`\`\`

### When to Use Each

| Scenario | Use | Example |
|----------|-----|---------|
| **Resource ID** | Path Variable | \`/users/123\` |
| **Filtering** | Query Parameter | \`/users?status=active\` |
| **Pagination** | Query Parameter | \`/users?page=1&limit=10\` |
| **Sorting** | Query Parameter | \`/users?sort=name\` |
| **Optional Data** | Query Parameter | \`/users?include=profile\` |
| **Required ID** | Path Variable | \`/users/123/posts\` |

### Combined Example

\`\`\`http
GET /api/users/123/posts?page=1&limit=5&sort=date HTTP/1.1
\`\`\`

**Breakdown:**
- \`/users/123\` - Path variable (user ID)
- \`/posts\` - Nested resource
- \`?page=1&limit=5&sort=date\` - Query parameters (pagination and sorting)

**Server-Side:**
\`\`\`java
@GetMapping("/api/users/{userId}/posts")
public ResponseEntity<List<Post>> getUserPosts(
    @PathVariable Long userId,
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int limit,
    @RequestParam(required = false) String sort
) {
    List<Post> posts = postService.findByUserId(userId, page, limit, sort);
    return ResponseEntity.ok(posts);
}
\`\`\`

---

## Complete HTTP Request Examples

### Example 1: GET Request with Query Parameters

\`\`\`http
GET /api/products?category=electronics&minPrice=100&maxPrice=1000&sort=price&order=asc HTTP/1.1
Host: api.example.com
Accept: application/json
User-Agent: MyApp/1.0
Authorization: Bearer token123
\`\`\`

### Example 2: POST Request with JSON Body

\`\`\`http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 89
Authorization: Bearer token123
Accept: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
\`\`\`

### Example 3: PUT Request with XML Body

\`\`\`http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/xml
Content-Length: 156
Authorization: Bearer token123

<?xml version="1.0"?>
<user>
  <name>John Updated</name>
  <email>john.updated@example.com</email>
</user>
\`\`\`

### Example 4: DELETE Request

\`\`\`http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
\`\`\`

### Example 5: PATCH Request (Partial Update)

\`\`\`http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 45
Authorization: Bearer token123

{
  "email": "newemail@example.com"
}
\`\`\`

---

## Request Structure Diagram

\`\`\`
Complete HTTP Request Structure:

┌─────────────────────────────────────────────────────────┐
│                    REQUEST LINE                         │
│  METHOD    URI                    HTTP/VERSION         │
│  GET       /api/users/123         HTTP/1.1             │
├─────────────────────────────────────────────────────────┤
│                    REQUEST HEADERS                     │
│  Host: api.example.com                                  │
│  Content-Type: application/json                         │
│  Authorization: Bearer token123                         │
│  Accept: application/json                               │
│  User-Agent: MyApp/1.0                                  │
│  [Additional headers...]                                │
├─────────────────────────────────────────────────────────┤
│                    EMPTY LINE (CRLF)                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    REQUEST BODY                         │
│  {                                                      │
│    "name": "John Doe",                                  │
│    "email": "john@example.com"                          │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Best Practices

### 1. Use Appropriate HTTP Methods

- **GET** for retrieving data
- **POST** for creating resources
- **PUT** for full updates
- **PATCH** for partial updates
- **DELETE** for removing resources

### 2. Use Proper Headers

- Always include \`Content-Type\` for requests with body
- Use \`Authorization\` header for authentication
- Include \`Accept\` header to specify response format

### 3. RESTful URL Design

- Use nouns, not verbs: \`/users\` not \`/getUsers\`
- Use plural nouns: \`/users\` not \`/user\`
- Use path variables for IDs: \`/users/123\`
- Use query parameters for filtering: \`/users?status=active\`

### 4. Request Body Guidelines

- Use JSON for most APIs
- Validate request body on server
- Include only necessary data
- Keep request size reasonable

### 5. Security Considerations

- Never send passwords in URLs (use body)
- Use HTTPS for sensitive data
- Validate and sanitize all input
- Use proper authentication headers

---

## Industry Examples

### Amazon API

**Request:**
\`\`\`http
GET /products?category=electronics&minPrice=50&maxPrice=500 HTTP/1.1
Host: api.amazon.com
Authorization: Bearer aws-token
\`\`\`

**Features:**
- Query parameters for filtering
- Bearer token authentication
- RESTful design

### GitHub API

**Request:**
\`\`\`http
POST /repos/owner/repo/issues HTTP/1.1
Host: api.github.com
Authorization: token ghp_token123
Content-Type: application/json

{
  "title": "Bug Report",
  "body": "Description of the bug"
}
\`\`\`

**Features:**
- Path variables for resource hierarchy
- Token-based authentication
- JSON request body

### Twitter API

**Request:**
\`\`\`http
GET /2/tweets/search/recent?query=java&max_results=10 HTTP/1.1
Host: api.twitter.com
Authorization: Bearer bearer_token
\`\`\`

**Features:**
- Versioned API (\`/2/\`)
- Query parameters for search
- Bearer authentication

---

## Summary

HTTP request structure consists of:

1. **Request Line**: Method + URI + HTTP Version
2. **Headers**: Metadata (Host, Content-Type, Authorization, etc.)
3. **Empty Line**: Separates headers from body
4. **Body**: Optional data (JSON, XML, form data, etc.)

**Key Concepts:**
- **HTTP Methods**: GET (retrieve), POST (create), PUT (update), PATCH (partial update), DELETE (remove)
- **Headers**: Provide metadata about the request
- **Query Parameters**: For filtering, pagination, sorting (\`?key=value\`)
- **Path Variables**: For resource identification (\`/resource/{id}\`)
- **Request Body**: Data sent to server (JSON, XML, form data)

Understanding request structure is essential for:
- Building REST APIs
- Consuming web services
- Debugging network issues
- Implementing proper authentication
- Optimizing API performance

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between PUT and PATCH?

**PUT** replaces the entire resource, while **PATCH** updates only specified fields. PUT is idempotent and requires the full resource, while PATCH sends only changed fields.

### 2. Can GET requests have a body?

Technically yes, but it's **not recommended**. GET requests should use query parameters or path variables. Most servers and proxies ignore GET request bodies.

### 3. What is the maximum size of an HTTP request?

There's no HTTP standard limit, but:
- **Browsers**: Usually 2-8 MB
- **Servers**: Configurable (often 1-10 MB)
- **Best Practice**: Keep requests under 1 MB when possible

### 4. When should I use query parameters vs path variables?

Use **path variables** for required resource identification (\`/users/123\`). Use **query parameters** for optional filtering, pagination, and sorting (\`/users?status=active\`).

### 5. What headers are required in HTTP/1.1?

Only the **Host** header is required in HTTP/1.1. All other headers are optional but recommended for proper functionality.

### 6. Can I send multiple values in a query parameter?

Yes, use array notation: \`?tags=java&tags=spring\` or \`?tags[]=java&tags[]=spring\`. The server parses these as arrays.

### 7. What is the difference between POST and PUT?

**POST** creates a new resource (server assigns ID), while **PUT** updates/replaces an existing resource (client specifies ID). POST is not idempotent; PUT is idempotent.

### 8. How do I handle file uploads in HTTP requests?

Use \`multipart/form-data\` content type:
\`\`\`http
POST /api/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
\`\`\`

### 9. What is the purpose of the User-Agent header?

**User-Agent** identifies the client application (browser, mobile app, API client). It helps servers provide appropriate responses and track usage.

### 10. Can I use custom headers in HTTP requests?

Yes, but use a prefix like \`X-\` to avoid conflicts with standard headers. Example: \`X-API-Version: 1.0\`, \`X-Request-ID: abc123\`.
  `,
  code: `// HTTP Request Structure - Complete Examples

// Example 1: GET Request with Query Parameters (JavaScript)
async function getUsers(filters) {
    const queryParams = new URLSearchParams({
        page: filters.page || 1,
        limit: filters.limit || 10,
        status: filters.status,
        sort: filters.sort
    });
    
    const response = await fetch(\`/api/users?\${queryParams}\`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer token123'
        }
    });
    
    return await response.json();
}

// Example 2: POST Request with JSON Body (JavaScript)
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (response.status === 201) {
        return await response.json();
    }
    throw new Error('Failed to create user');
}

// Example 3: PUT Request (Java - Spring Boot)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @RequestBody UserRequest request
    ) {
        User updatedUser = userService.update(id, request);
        return ResponseEntity.ok(updatedUser);
    }
}

// Example 4: PATCH Request (Java - Spring Boot)
@PatchMapping("/{id}")
public ResponseEntity<User> partialUpdateUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
) {
    User updatedUser = userService.partialUpdate(id, updates);
    return ResponseEntity.ok(updatedUser);
}

// Example 5: DELETE Request (Java - Spring Boot)
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}

// Example 6: Request with Query Parameters (Java)
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int limit,
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String sort
) {
    List<User> users = userService.findUsers(page, limit, status, sort);
    return ResponseEntity.ok(users);
}

// Example 7: Request with Path Variables (Java)
@GetMapping("/api/users/{userId}/posts/{postId}")
public ResponseEntity<Post> getPost(
    @PathVariable Long userId,
    @PathVariable Long postId
) {
    Post post = postService.findByUserAndPost(userId, postId);
    return ResponseEntity.ok(post);
}

// Example 8: File Upload (Multipart) - Java
@PostMapping("/api/upload")
public ResponseEntity<Map<String, String>> uploadFile(
    @RequestParam("file") MultipartFile file
) {
    String fileUrl = fileService.upload(file);
    return ResponseEntity.ok(Map.of("url", fileUrl));
}

// Example 9: Request with Custom Headers (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("X-API-Version") String apiVersion,
    @RequestHeader("X-Request-ID") String requestId
) {
    // Use headers for processing
    Data data = dataService.getData(apiVersion, requestId);
    return ResponseEntity.ok(data);
}

// Example 10: Form Data Request (JavaScript)
async function login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    });
    
    return await response.json();
}

// Example 11: XML Request Body (Java)
@PostMapping(value = "/api/data", consumes = "application/xml")
public ResponseEntity<String> processXml(@RequestBody String xmlData) {
    // Process XML data
    String result = xmlProcessor.process(xmlData);
    return ResponseEntity.ok(result);
}

// Example 12: Request with Authentication (Java)
@GetMapping("/api/protected")
public ResponseEntity<Data> getProtectedData(
    @RequestHeader("Authorization") String authHeader
) {
    if (!authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    String token = authHeader.substring(7);
    if (!tokenService.isValid(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    Data data = dataService.getProtectedData();
    return ResponseEntity.ok(data);
}

// Example 13: Request Validation (Java)
@PostMapping("/api/users")
public ResponseEntity<User> createUser(
    @Valid @RequestBody UserRequest request
) {
    // @Valid triggers validation
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}

// Example 14: Request with Multiple Query Parameters (Java)
@GetMapping("/api/products")
public ResponseEntity<List<Product>> getProducts(
    @RequestParam(required = false) String category,
    @RequestParam(required = false) Double minPrice,
    @RequestParam(required = false) Double maxPrice,
    @RequestParam(required = false) String sort,
    @RequestParam(required = false) String order
) {
    List<Product> products = productService.findProducts(
        category, minPrice, maxPrice, sort, order
    );
    return ResponseEntity.ok(products);
}

// Example 15: Request Structure Validation
public class RequestValidator {
    public boolean isValidRequest(HttpServletRequest request) {
        // Check required headers
        if (request.getHeader("Host") == null) {
            return false;
        }
        
        // Check content type for POST/PUT
        String method = request.getMethod();
        if ("POST".equals(method) || "PUT".equals(method)) {
            String contentType = request.getContentType();
            if (contentType == null || !contentType.startsWith("application/json")) {
                return false;
            }
        }
        
        return true;
    }
}`
};

export default httpRequestStructure;



