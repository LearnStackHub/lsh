const httpMethods = {
  id: 'http-methods',
  title: 'HTTP Methods - GET, POST, PUT, PATCH, DELETE',
  description: 'Complete guide to HTTP methods (verbs): GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD with idempotency, safety, and real-world examples',
  content: `
# HTTP Methods — Complete Guide

HTTP methods (also called HTTP verbs) define the action you want to perform on a resource. Understanding each method's purpose, characteristics, and proper usage is essential for building RESTful APIs.

---

## What are HTTP Methods?

HTTP methods indicate **what action** should be performed on a resource identified by the URL. They are the verbs in the HTTP protocol that tell the server what to do.

\`\`\`
GET    /api/users     → Retrieve users
POST   /api/users     → Create a user
PUT    /api/users/123 → Update entire user
PATCH  /api/users/123 → Partially update user
DELETE /api/users/123 → Delete user
\`\`\`

---

## Method Characteristics

Each HTTP method has specific characteristics:

| Method | Idempotent | Safe | Body Allowed | Cacheable |
|--------|------------|------|--------------|-----------|
| **GET** | Yes | Yes | No | Yes |
| **POST** | No | No | Yes | No |
| **PUT** | Yes | No | Yes | No |
| **PATCH** | Depends | No | Yes | No |
| **DELETE** | Yes | No | No | No |
| **OPTIONS** | Yes | Yes | No | No |
| **HEAD** | Yes | Yes | No | Yes |

### Idempotent

**Idempotent** means making the same request multiple times produces the same result.

**Idempotent Methods:**
- **GET**: Always returns the same data
- **PUT**: Replacing resource with same data = same result
- **DELETE**: Deleting twice = same result (resource already deleted)
- **OPTIONS**: Always returns same allowed methods
- **HEAD**: Always returns same headers

**Non-Idempotent:**
- **POST**: Creating multiple resources = different results

### Safe

**Safe** methods don't modify server state. They only retrieve data.

**Safe Methods:**
- **GET**: Only retrieves data
- **HEAD**: Only retrieves headers
- **OPTIONS**: Only retrieves allowed methods

**Unsafe Methods:**
- **POST**, **PUT**, **PATCH**, **DELETE**: All modify server state

---

## GET - Retrieve Data

**Purpose**: Fetch data from the server

### Characteristics

- **Idempotent**: Yes
- **Safe**: Yes
- **Body**: Not allowed (ignored if sent)
- **Cacheable**: Yes
- **Status Codes**: 200 (OK), 404 (Not Found), etc.

### Syntax

\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com
\`\`\`

### Use Cases

1. **Fetching Resources**
   - Get user profile
   - Retrieve product details
   - Load blog posts

2. **Querying Data**
   - Search products
   - Filter users
   - List items

3. **Reading Data**
   - Dashboard data
   - Reports
   - Statistics

### Real-World Examples

**Example 1: Get Single User**
\`\`\`java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user != null) {
        return ResponseEntity.ok(user);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}
\`\`\`

**Example 2: Get All Users with Filtering**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String status,
    @RequestParam(required = false) String role
) {
    List<User> users = userService.findUsers(status, role);
    return ResponseEntity.ok(users);  // 200 OK
}
\`\`\`

**Example 3: JavaScript GET Request**
\`\`\`javascript
async function getUser(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (response.ok) {
        return await response.json();
    }
    throw new Error('User not found');
}
\`\`\`

### Best Practices

1. **Use for Retrieval Only**: Never use GET to modify data
2. **Use Query Parameters**: For filtering, pagination, sorting
3. **Cache Responses**: GET requests can be cached
4. **No Sensitive Data**: Don't put sensitive data in URLs

---

## POST - Create Resource

**Purpose**: Create a new resource or submit data

### Characteristics

- **Idempotent**: No (multiple requests = multiple resources)
- **Safe**: No (modifies server state)
- **Body**: Required (usually)
- **Cacheable**: No
- **Status Codes**: 201 (Created), 400 (Bad Request), 409 (Conflict)

### Syntax

\`\`\`http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

### Use Cases

1. **Creating Resources**
   - Create new user
   - Add product
   - Submit form

2. **Submitting Data**
   - File upload
   - Payment processing
   - Form submission

3. **Complex Operations**
   - Triggering workflows
   - Sending emails
   - Processing data

### Real-World Examples

**Example 1: Create User**
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
    // Check if user already exists
    if (userService.existsByEmail(request.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(null);  // 409 Conflict
    }
    
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/api/users/" + user.getId()))
        .body(user);  // 201 Created
}
\`\`\`

**Example 2: Submit Form**
\`\`\`java
@PostMapping("/api/contact")
public ResponseEntity<Map<String, String>> submitContact(
    @RequestBody ContactRequest request
) {
    emailService.sendContactEmail(request);
    return ResponseEntity.ok(Map.of("message", "Contact form submitted"));
}
\`\`\`

**Example 3: JavaScript POST Request**
\`\`\`javascript
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (response.status === 201) {
        return await response.json();
    }
    throw new Error('Failed to create user');
}
\`\`\`

### Best Practices

1. **Return 201 Created**: Use 201 status code for successful creation
2. **Include Location Header**: Point to the newly created resource
3. **Validate Input**: Always validate request body
4. **Handle Conflicts**: Check for duplicate resources (409 Conflict)

---

## PUT - Update Entire Resource

**Purpose**: Replace an entire resource with new data

### Characteristics

- **Idempotent**: Yes (same request = same result)
- **Safe**: No (modifies server state)
- **Body**: Required (complete resource)
- **Cacheable**: No
- **Status Codes**: 200 (OK), 201 (Created), 404 (Not Found)

### Syntax

\`\`\`http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "id": 123,
  "name": " Dattu Updated",
  "email": " Dattu.updated@example.com",
  "age": 31
}
\`\`\`

### Use Cases

1. **Full Resource Updates**
   - Update entire user profile
   - Replace document content
   - Update product details

2. **Idempotent Updates**
   - When you need to ensure idempotency
   - Replacing entire resource

### Real-World Examples

**Example 1: Update User**
\`\`\`java
@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @Valid @RequestBody UserRequest request
) {
    User updatedUser = userService.update(id, request);
    if (updatedUser != null) {
        return ResponseEntity.ok(updatedUser);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}
\`\`\`

**Example 2: Create or Update (Upsert)**
\`\`\`java
@PutMapping("/api/users/{id}")
public ResponseEntity<User> upsertUser(
    @PathVariable Long id,
    @Valid @RequestBody UserRequest request
) {
    User user = userService.findById(id);
    
    if (user == null) {
        // Create new resource
        user = userService.create(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(user);  // 201 Created
    } else {
        // Update existing resource
        user = userService.update(id, request);
        return ResponseEntity.ok(user);  // 200 OK
    }
}
\`\`\`

### PUT vs POST

| Aspect | PUT | POST |
|--------|-----|------|
| **Purpose** | Update/Create | Create |
| **Idempotent** | Yes | No |
| **URL** | Specific resource | Collection |
| **Body** | Complete resource | Partial data |
| **Status** | 200/201 | 201 |

### Best Practices

1. **Include Complete Resource**: PUT should include all fields
2. **Idempotent**: Same request should produce same result
3. **Use for Replacements**: When replacing entire resource

---

## PATCH - Partial Update

**Purpose**: Partially update a resource

### Characteristics

- **Idempotent**: Depends on implementation
- **Safe**: No (modifies server state)
- **Body**: Required (only changed fields)
- **Cacheable**: No
- **Status Codes**: 200 (OK), 404 (Not Found)

### Syntax

\`\`\`http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "newemail@example.com"
}
\`\`\`

### Use Cases

1. **Partial Updates**
   - Update email address
   - Change password
   - Update single field

2. **Efficient Updates**
   - When you only need to change one field
   - Reducing bandwidth

### Real-World Examples

**Example 1: Partial Update**
\`\`\`java
@PatchMapping("/api/users/{id}")
public ResponseEntity<User> partialUpdateUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
) {
    User updatedUser = userService.partialUpdate(id, updates);
    if (updatedUser != null) {
        return ResponseEntity.ok(updatedUser);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}
\`\`\`

**Example 2: Update Email Only**
\`\`\`java
@PatchMapping("/api/users/{id}/email")
public ResponseEntity<User> updateEmail(
    @PathVariable Long id,
    @RequestBody EmailUpdateRequest request
) {
    User user = userService.updateEmail(id, request.getEmail());
    return ResponseEntity.ok(user);
}
\`\`\`

### PATCH vs PUT

| Aspect | PATCH | PUT |
|--------|-------|-----|
| **Purpose** | Partial update | Full update |
| **Body** | Only changed fields | Complete resource |
| **Idempotent** | Depends | Yes |
| **Use Case** | Update one field | Replace entire resource |

### Best Practices

1. **Send Only Changed Fields**: Don't send entire resource
2. **Document Behavior**: Clearly document what fields can be updated
3. **Validate Updates**: Validate each field being updated

---

## DELETE - Remove Resource

**Purpose**: Delete a resource

### Characteristics

- **Idempotent**: Yes (deleting twice = same result)
- **Safe**: No (modifies server state)
- **Body**: Not allowed (usually)
- **Cacheable**: No
- **Status Codes**: 204 (No Content), 404 (Not Found)

### Syntax

\`\`\`http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
\`\`\`

### Use Cases

1. **Removing Resources**
   - Delete user account
   - Remove product
   - Delete file

2. **Cleanup Operations**
   - Clear cache
   - Remove temporary data

### Real-World Examples

**Example 1: Delete User**
\`\`\`java
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    boolean deleted = userService.delete(id);
    if (deleted) {
        return ResponseEntity.noContent().build();  // 204 No Content
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}
\`\`\`

**Example 2: Soft Delete**
\`\`\`java
@DeleteMapping("/api/users/{id}")
public ResponseEntity<User> softDeleteUser(@PathVariable Long id) {
    User user = userService.softDelete(id);
    if (user != null) {
        return ResponseEntity.ok(user);  // 200 OK (with updated user)
    }
    return ResponseEntity.notFound().build();
}
\`\`\`

### Best Practices

1. **Return 204 No Content**: Successful deletion should return 204
2. **Idempotent**: Deleting non-existent resource should return 404, not error
3. **Authorization**: Always check permissions before deletion
4. **Cascading**: Consider related resources (cascade delete or prevent)

---

## OPTIONS - Get Allowed Methods

**Purpose**: Get allowed HTTP methods for a resource

### Characteristics

- **Idempotent**: Yes
- **Safe**: Yes
- **Body**: Not allowed
- **Cacheable**: No
- **Status Codes**: 200 (OK)

### Syntax

\`\`\`http
OPTIONS /api/users HTTP/1.1
Host: api.example.com
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE, OPTIONS
\`\`\`

### Use Cases

1. **CORS Preflight**: Browser automatically sends OPTIONS for CORS
2. **API Discovery**: Find out what methods are allowed
3. **Testing**: Check API capabilities

### Real-World Example

**Example: CORS Preflight**
\`\`\`java
@CrossOrigin(origins = "https://example.com")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // Browser automatically sends OPTIONS request
    // Spring handles CORS preflight automatically
}
\`\`\`

---

## HEAD - Get Headers Only

**Purpose**: Get response headers without body

### Characteristics

- **Idempotent**: Yes
- **Safe**: Yes
- **Body**: Not allowed
- **Cacheable**: Yes
- **Status Codes**: Same as GET (200, 404, etc.)

### Syntax

\`\`\`http
HEAD /api/users/123 HTTP/1.1
Host: api.example.com
\`\`\`

**Response:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156
Last-Modified: Wed, 21 Feb 2026 10:00:00 GMT
ETag: "abc123"
\`\`\`

### Use Cases

1. **Check Resource Existence**: Without downloading body
2. **Check Last Modified**: For caching
3. **Check Content Length**: Before downloading large file
4. **Validate ETag**: For cache validation

### Real-World Example

**Example: Check if Resource Exists**
\`\`\`java
@HeadMapping("/api/users/{id}")
public ResponseEntity<Void> checkUserExists(@PathVariable Long id) {
    if (userService.exists(id)) {
        return ResponseEntity.ok().build();  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}
\`\`\`

---

## Method Comparison Table

| Method | Purpose | Idempotent | Safe | Body | Typical Status |
|--------|---------|------------|------|------|----------------|
| **GET** | Retrieve | Yes | Yes | No | 200 |
| **POST** | Create | No | No | Yes | 201 |
| **PUT** | Update/Replace | Yes | No | Yes | 200/201 |
| **PATCH** | Partial Update | Depends | No | Yes | 200 |
| **DELETE** | Remove | Yes | No | No | 204 |
| **OPTIONS** | Allowed Methods | Yes | Yes | No | 200 |
| **HEAD** | Headers Only | Yes | Yes | No | 200 |

---

## RESTful API Design with HTTP Methods

### Resource-Based URLs

\`\`\`
GET    /api/users        → List all users
GET    /api/users/123    → Get user 123
POST   /api/users        → Create new user
PUT    /api/users/123    → Update entire user 123
PATCH  /api/users/123    → Partially update user 123
DELETE /api/users/123    → Delete user 123
\`\`\`

### Nested Resources

\`\`\`
GET    /api/users/123/posts        → Get posts by user 123
POST   /api/users/123/posts        → Create post for user 123
GET    /api/users/123/posts/456    → Get post 456 by user 123
DELETE /api/users/123/posts/456    → Delete post 456
\`\`\`

---

## Industry Examples

### GitHub API

\`\`\`http
GET    /repos/owner/repo/issues
POST   /repos/owner/repo/issues
PATCH  /repos/owner/repo/issues/123
DELETE /repos/owner/repo/issues/123
\`\`\`

### Twitter API

\`\`\`http
GET    /2/tweets/search/recent
POST   /2/tweets
DELETE /2/tweets/{id}
\`\`\`

### Stripe API

\`\`\`http
GET    /v1/customers
POST   /v1/customers
GET    /v1/customers/{id}
POST   /v1/customers/{id}
DELETE /v1/customers/{id}
\`\`\`

---

## Common Mistakes

### 1. Using GET for Modifications

**Wrong approach:**
\`\`\`http
GET /api/users/123/delete
\`\`\`

**Correct approach:**
\`\`\`http
DELETE /api/users/123
\`\`\`

### 2. Using POST for Updates

**Wrong approach:**
\`\`\`http
POST /api/users/123/update
\`\`\`

**Correct approach:**
\`\`\`http
PUT /api/users/123
\`\`\`

### 3. Not Using Proper Status Codes

**Wrong approach:**
\`\`\`http
POST /api/users
→ 200 OK (should be 201 Created)
\`\`\`

**Correct approach:**
\`\`\`http
POST /api/users
→ 201 Created
\`\`\`

---

## Summary

HTTP methods define actions on resources:

- **GET**: Retrieve data (idempotent, safe, cacheable)
- **POST**: Create resource (not idempotent, modifies state)
- **PUT**: Replace entire resource (idempotent, full update)
- **PATCH**: Partially update resource (partial update)
- **DELETE**: Remove resource (idempotent)
- **OPTIONS**: Get allowed methods (for CORS)
- **HEAD**: Get headers only (without body)

**Key Principles:**
- Use appropriate method for each action
- Follow RESTful conventions
- Return proper status codes
- Ensure idempotency where applicable
- Keep methods safe when possible

Understanding HTTP methods is essential for:
- Building RESTful APIs
- Following web standards
- Creating maintainable APIs
- Ensuring proper caching
- Implementing security

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between PUT and PATCH?

**PUT** replaces the entire resource (idempotent), while **PATCH** updates only specified fields. PUT requires the complete resource; PATCH sends only changed fields.

### 2. Why is POST not idempotent?

**POST** creates new resources, so multiple identical requests create multiple resources. This makes it non-idempotent. Use PUT for idempotent operations.

### 3. Can I use GET to modify data?

**No!** GET should only retrieve data. Using GET for modifications violates HTTP standards, breaks caching, and can cause security issues.

### 4. When should I use PUT vs PATCH?

Use **PUT** when replacing the entire resource. Use **PATCH** when updating only specific fields. PUT is idempotent; PATCH depends on implementation.

### 5. What status code should DELETE return?

**204 No Content** for successful deletion. **404 Not Found** if the resource doesn't exist. Some APIs return **200 OK** with deleted resource data.

### 6. Is PATCH idempotent?

**Depends on implementation.** PATCH can be idempotent if implemented correctly (applying same patch multiple times = same result), but it's not required by the HTTP specification.

### 7. What is the purpose of OPTIONS method?

**OPTIONS** is used for:
- **CORS preflight requests** (browser automatically sends)
- **API discovery** (finding allowed methods)
- **Testing** (checking API capabilities)

### 8. Can DELETE requests have a body?

Technically yes, but **not recommended**. Most servers ignore DELETE request bodies. Use query parameters or path variables if needed.

### 9. What is the difference between safe and idempotent?

**Safe** methods don't modify server state (GET, HEAD, OPTIONS). **Idempotent** methods produce the same result when called multiple times (GET, PUT, DELETE). A method can be both (GET) or neither (POST).

### 10. Should I use PUT or POST for creating resources?

Use **POST** for creating resources when the server assigns the ID. Use **PUT** for creating resources when the client specifies the ID (upsert operation).
  `,
  code: `// HTTP Methods - Complete Examples

// Example 1: GET Request (Java - Spring Boot)
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user != null) {
        return ResponseEntity.ok(user);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 2: POST Request (Java - Spring Boot)
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
    if (userService.existsByEmail(request.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();  // 409 Conflict
    }
    
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
        .location(URI.create("/api/users/" + user.getId()))
        .body(user);  // 201 Created
}

// Example 3: PUT Request (Java - Spring Boot)
@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @Valid @RequestBody UserRequest request
) {
    User updatedUser = userService.update(id, request);
    if (updatedUser != null) {
        return ResponseEntity.ok(updatedUser);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 4: PATCH Request (Java - Spring Boot)
@PatchMapping("/api/users/{id}")
public ResponseEntity<User> partialUpdateUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
) {
    User updatedUser = userService.partialUpdate(id, updates);
    if (updatedUser != null) {
        return ResponseEntity.ok(updatedUser);  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 5: DELETE Request (Java - Spring Boot)
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    boolean deleted = userService.delete(id);
    if (deleted) {
        return ResponseEntity.noContent().build();  // 204 No Content
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 6: OPTIONS Request (Java - Spring Boot)
@CrossOrigin(origins = "https://example.com")
@RestController
@RequestMapping("/api/users")
public class UserController {
    // Spring automatically handles OPTIONS for CORS
}

// Example 7: HEAD Request (Java - Spring Boot)
@HeadMapping("/api/users/{id}")
public ResponseEntity<Void> checkUserExists(@PathVariable Long id) {
    if (userService.exists(id)) {
        return ResponseEntity.ok().build();  // 200 OK
    }
    return ResponseEntity.notFound().build();  // 404 Not Found
}

// Example 8: JavaScript - All Methods
// GET
async function getUser(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    return await response.json();
}

// POST
async function createUser(userData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return await response.json();
}

// PUT
async function updateUser(userId, userData) {
    const response = await fetch(\`/api/users/\${userId}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return await response.json();
}

// PATCH
async function partialUpdateUser(userId, updates) {
    const response = await fetch(\`/api/users/\${userId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return await response.json();
}

// DELETE
async function deleteUser(userId) {
    const response = await fetch(\`/api/users/\${userId}\`, {
        method: 'DELETE'
    });
    return response.status === 204;
}

// Example 9: RESTful Controller (Complete Example)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET - List all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
        @RequestParam(required = false) String status
    ) {
        List<User> users = userService.findAll(status);
        return ResponseEntity.ok(users);
    }
    
    // GET - Get single user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // POST - Create user
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    // PUT - Update entire user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserRequest request
    ) {
        return userService.update(id, request)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // PATCH - Partial update
    @PatchMapping("/{id}")
    public ResponseEntity<User> partialUpdateUser(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates
    ) {
        return userService.partialUpdate(id, updates)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE - Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

// Example 10: Method Validation
public class HttpMethodValidator {
    public boolean isValidMethod(String method, String operation) {
        switch (method) {
            case "GET":
                return operation.equals("read");
            case "POST":
                return operation.equals("create");
            case "PUT":
            case "PATCH":
                return operation.equals("update");
            case "DELETE":
                return operation.equals("delete");
            default:
                return false;
        }
    }
}`
};

export default httpMethods;

