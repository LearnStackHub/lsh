const apiTestingTools = {
  id: 'api-testing-tools',
  title: 'API Testing Tools - Postman, cURL, Swagger',
  description: 'Learn API testing tools: Postman, cURL, Swagger UI, Thunder Client, how to test APIs, write test cases, and automate API testing',
  content: `
# API Testing Tools — Complete Guide

Testing APIs is essential for ensuring functionality, reliability, and performance. Understanding different testing tools (Postman, cURL, Swagger) and how to use them effectively is crucial for API development.

---

## Why Test APIs?

**Benefits:**
- **Functionality**: Verify API works correctly
- **Reliability**: Ensure consistent behavior
- **Performance**: Check response times
- **Security**: Test authentication and authorization
- **Documentation**: Examples for developers

---

## Testing Tools Overview

### 1. Postman

**Most Popular** GUI tool for API testing

**Features:**
- GUI interface
- Collections and environments
- Automated testing
- Documentation
- Team collaboration

**Use Cases:**
- Manual testing
- API development
- Test automation
- API documentation

### 2. cURL

**Command-line** tool for API testing

**Features:**
- Available everywhere
- Scriptable
- Lightweight
- Powerful

**Use Cases:**
- Quick testing
- Scripts and automation
- CI/CD pipelines
- Server environments

### 3. Swagger UI

**Interactive** API documentation and testing

**Features:**
- Auto-generated from OpenAPI
- Try it out functionality
- Documentation
- Schema validation

**Use Cases:**
- API documentation
- Interactive testing
- Developer onboarding
- API exploration

### 4. Thunder Client

**VS Code Extension** for API testing

**Features:**
- Integrated in VS Code
- Lightweight
- Collections
- Environment variables

**Use Cases:**
- Development workflow
- Quick testing
- VS Code users

---

## Postman

### Getting Started

**Installation:**
- Download from postman.com
- Create account (optional)
- Start testing

### Basic Usage

**1. Create Request:**
\`\`\`
1. Click "New" → "HTTP Request"
2. Select method (GET, POST, etc.)
3. Enter URL
4. Click "Send"
\`\`\`

**2. View Response:**
\`\`\`
- Status code
- Response body
- Headers
- Time taken
\`\`\`

### Collections

**Organize requests:**
\`\`\`
Collections
  ├── User API
  │   ├── Get Users
  │   ├── Get User by ID
  │   ├── Create User
  │   └── Update User
  └── Product API
      ├── Get Products
      └── Create Product
\`\`\`

### Environments

**Manage variables:**
\`\`\`
Environment: Development
  baseUrl: http://localhost:8080
  apiKey: dev-key-123

Environment: Production
  baseUrl: https://api.example.com
  apiKey: prod-key-456
\`\`\`

**Usage:**
\`\`\`
{{baseUrl}}/api/users
Authorization: Bearer {{apiKey}}
\`\`\`

### Automated Testing

**Test Scripts:**
\`\`\`javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has user data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
\`\`\`

### Pre-request Scripts

**Set variables:**
\`\`\`javascript
// Generate timestamp
pm.environment.set("timestamp", new Date().toISOString());

// Generate random ID
pm.environment.set("randomId", Math.random().toString(36));
\`\`\`

---

## cURL

### Basic Syntax

**Format:**
\`\`\`bash
curl [options] <url>
\`\`\`

### Common Commands

#### GET Request

\`\`\`bash
curl https://api.example.com/users
\`\`\`

#### POST Request

\`\`\`bash
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'
\`\`\`

#### With Headers

\`\`\`bash
curl -H "Authorization: Bearer token123" \\
     -H "Content-Type: application/json" \\
     https://api.example.com/users
\`\`\`

#### With Authentication

\`\`\`bash
# Basic Auth
curl -u username:password https://api.example.com/data

# Bearer Token
curl -H "Authorization: Bearer token123" https://api.example.com/data
\`\`\`

#### Save Response

\`\`\`bash
curl -o response.json https://api.example.com/users
\`\`\`

#### Verbose Output

\`\`\`bash
curl -v https://api.example.com/users
\`\`\`

### Advanced Usage

**Follow Redirects:**
\`\`\`bash
curl -L https://api.example.com/data
\`\`\`

**Custom Method:**
\`\`\`bash
curl -X PUT https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John Updated"}'
\`\`\`

**File Upload:**
\`\`\`bash
curl -X POST https://api.example.com/upload \\
  -F "file=@/path/to/file.jpg"
\`\`\`

---

## Swagger UI

### What is Swagger?

**OpenAPI** specification for API documentation

**Features:**
- Interactive documentation
- Try it out
- Schema validation
- Code generation

### Using Swagger UI

**1. Access Swagger UI:**
\`\`\`
http://localhost:8080/swagger-ui.html
\`\`\`

**2. Explore API:**
\`\`\`
- Browse endpoints
- See request/response schemas
- View examples
\`\`\`

**3. Test API:**
\`\`\`
- Click "Try it out"
- Enter parameters
- Click "Execute"
- View response
\`\`\`

### OpenAPI Specification

**Example:**
\`\`\`yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
\`\`\`

---

## Testing Strategies

### 1. Unit Testing

**Test individual endpoints:**
\`\`\`java
@Test
public void testGetUser() {
    ResponseEntity<User> response = restTemplate.getForEntity(
        "/api/users/123", User.class
    );
    
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(123L, response.getBody().getId());
}
\`\`\`

### 2. Integration Testing

**Test API with database:**
\`\`\`java
@SpringBootTest
@AutoConfigureMockMvc
class UserApiIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testCreateUser() throws Exception {
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"John\",\"email\":\"john@example.com\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("John"));
    }
}
\`\`\`

### 3. End-to-End Testing

**Test complete flows:**
\`\`\`java
@Test
public void testUserFlow() {
    // Create user
    User user = createUser();
    
    // Get user
    User retrieved = getUser(user.getId());
    
    // Update user
    updateUser(user.getId());
    
    // Delete user
    deleteUser(user.getId());
}
\`\`\`

---

## Test Cases

### 1. Success Cases

**Test normal operation:**
\`\`\`
✓ GET /users → 200 OK
✓ POST /users → 201 Created
✓ PUT /users/123 → 200 OK
✓ DELETE /users/123 → 204 No Content
\`\`\`

### 2. Error Cases

**Test error handling:**
\`\`\`
✓ GET /users/999 → 404 Not Found
✓ POST /users (invalid data) → 400 Bad Request
✓ DELETE /users/999 → 404 Not Found
✓ Unauthorized request → 401 Unauthorized
\`\`\`

### 3. Edge Cases

**Test boundaries:**
\`\`\`
✓ Empty list → 200 OK, []
✓ Large payload → 413 Payload Too Large
✓ Invalid JSON → 400 Bad Request
✓ Missing required fields → 400 Bad Request
\`\`\`

---

## Automation

### Postman Collections

**Run collection:**
\`\`\`bash
newman run collection.json -e environment.json
\`\`\`

### CI/CD Integration

**GitHub Actions:**
\`\`\`yaml
- name: Run API Tests
  run: |
    newman run api-tests.json
\`\`\`

### Test Scripts

**Automated testing:**
\`\`\`bash
#!/bin/bash
curl -X GET https://api.example.com/users
if [ $? -eq 0 ]; then
    echo "API is working"
else
    echo "API test failed"
    exit 1
fi
\`\`\`

---

## Best Practices

### 1. Organize Tests

**Structure:**
\`\`\`
Tests
  ├── Unit Tests
  ├── Integration Tests
  └── E2E Tests
\`\`\`

### 2. Use Environments

**Separate configs:**
\`\`\`
- Development
- Staging
- Production
\`\`\`

### 3. Document Tests

**Clear test names:**
\`\`\`
✓ "Get user by ID - success"
✓ "Get user by ID - not found"
✓ "Create user - validation error"
\`\`\`

### 4. Test Security

**Verify:**
\`\`\`
✓ Authentication required
✓ Authorization checks
✓ Input validation
✓ SQL injection prevention
\`\`\`

### 5. Performance Testing

**Measure:**
\`\`\`
✓ Response time
✓ Throughput
✓ Error rate
\`\`\`

---

## Summary

API testing tools:

- **Postman**: GUI tool, collections, automation
- **cURL**: Command-line, scripting, CI/CD
- **Swagger UI**: Interactive documentation
- **Thunder Client**: VS Code extension

**Important points:**
- Use appropriate tool for task
- Organize tests in collections
- Use environments for config
- Automate testing
- Test success and error cases

Understanding testing tools is essential for:
- Ensuring API quality
- Catching bugs early
- Documenting APIs
- Automating testing
- CI/CD integration

---

## Frequently Asked Questions (FAQs)

### 1. Which tool should I use?

**Postman** for GUI testing and development. **cURL** for scripting and automation. **Swagger** for documentation and exploration.

### 2. How do I test authentication?

**Include auth headers**: \`Authorization: Bearer token\` in Postman or \`-H "Authorization: Bearer token"\` in cURL.

### 3. Can I automate API testing?

**Yes**, use Postman collections with Newman, or write scripts with cURL, or use testing frameworks like JUnit, Jest.

### 4. How do I test file uploads?

**Postman**: Use form-data, select file. **cURL**: Use \`-F "file=@path/to/file"\`.

### 5. What should I test?

**Test**: Success cases, error cases, edge cases, security, performance, validation.

### 6. How do I share API tests?

**Postman**: Export collection, share with team. **Swagger**: Share OpenAPI spec. **cURL**: Share scripts.

### 7. Can I test APIs without GUI?

**Yes**, use cURL, scripts, or automated testing frameworks. Many tools support headless/CLI mode.

### 8. How do I test rate limiting?

**Send multiple requests** quickly and verify rate limit headers and 429 status code.

### 9. What is the difference between Postman and Swagger?

**Postman** is testing tool. **Swagger** is documentation tool with testing capability. Use both for comprehensive API development.

### 10. How do I test APIs in CI/CD?

**Use Newman** (Postman CLI), **cURL scripts**, or **testing frameworks** integrated into your CI/CD pipeline.
  `,
  code: `// API Testing Tools - Complete Examples

// Example 1: Postman Collection (JSON)
{
  "info": {
    "name": "User API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Users",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\\n  \\"name\\": \\"John\\",\\n  \\"email\\": \\"john@example.com\\"\\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/users",
          "host": ["{{baseUrl}}"],
          "path": ["api", "users"]
        }
      }
    }
  ]
}

// Example 2: cURL - GET Request
curl https://api.example.com/users

// Example 3: cURL - POST Request
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'

// Example 4: cURL - With Authentication
curl -H "Authorization: Bearer token123" \\
     https://api.example.com/users

// Example 5: cURL - File Upload
curl -X POST https://api.example.com/upload \\
  -F "file=@/path/to/file.jpg" \\
  -F "description=Profile photo"

// Example 6: Postman Test Script
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Example 7: Java - REST Assured Testing
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@Test
public void testGetUser() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body("id", equalTo(123))
        .body("name", notNullValue());
}

// Example 8: JavaScript - Fetch API Testing
async function testGetUser() {
    const response = await fetch('https://api.example.com/users/123');
    const user = await response.json();
    
    console.assert(response.status === 200, 'Status should be 200');
    console.assert(user.id === 123, 'User ID should be 123');
    console.assert(user.name !== null, 'Name should not be null');
}

// Example 9: Python - Requests Testing
import requests

def test_get_user():
    response = requests.get('https://api.example.com/users/123')
    assert response.status_code == 200
    user = response.json()
    assert user['id'] == 123
    assert user['name'] is not None

// Example 10: Newman - Run Postman Collection
newman run collection.json \\
  -e environment.json \\
  --reporters cli,json \\
  --reporter-json-export results.json

// Example 11: OpenAPI Specification
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string`
};

export default apiTestingTools;

