const apiDocumentation = {
  id: 'api-documentation',
  title: 'API Documentation - OpenAPI, Swagger, Best Practices',
  description: 'Learn API documentation: OpenAPI specification, Swagger UI, API contracts, how to write good documentation, and documentation best practices',
  content: `
# API Documentation — Complete Guide

Good API documentation is essential for API adoption. Understanding how to create comprehensive, clear, and interactive documentation using OpenAPI/Swagger is crucial for building successful APIs.

---

## Why API Documentation Matters

**Benefits:**
- **Developer Onboarding**: Faster integration
- **Reduced Support**: Fewer questions
- **API Adoption**: Easier to use = more users
- **Consistency**: Standard format
- **Testing**: Interactive examples

**Poor Documentation:**
- Confusion
- Integration delays
- Support burden
- Low adoption

**Good Documentation:**
- Clear examples
- Interactive testing
- Complete reference
- Quick integration

---

## OpenAPI Specification

### What is OpenAPI?

**OpenAPI** (formerly Swagger) is a specification for describing REST APIs.

**Features:**
- Machine-readable
- Human-readable
- Tool support
- Code generation

### OpenAPI Structure

**Basic Structure:**
\`\`\`yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for user management
servers:
  - url: https://api.example.com
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Success
\`\`\`

### Key Components

**1. Info:**
\`\`\`yaml
info:
  title: User API
  version: 1.0.0
  description: API for managing users
  contact:
    name: API Support
    email: support@example.com
\`\`\`

**2. Servers:**
\`\`\`yaml
servers:
  - url: https://api.example.com
    description: Production server
  - url: https://staging.api.example.com
    description: Staging server
\`\`\`

**3. Paths:**
\`\`\`yaml
paths:
  /users:
    get:
      summary: Get all users
      operationId: getUsers
      responses:
        '200':
          description: Success
\`\`\`

**4. Components:**
\`\`\`yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
\`\`\`

---

## Swagger UI

### What is Swagger UI?

**Interactive** API documentation generated from OpenAPI spec

**Features:**
- Try it out
- Schema visualization
- Response examples
- Authentication testing

### Using Swagger UI

**1. Generate from Code:**
\`\`\`java
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User API")
                .version("1.0.0")
                .description("API for user management"));
    }
}
\`\`\`

**2. Access UI:**
\`\`\`
http://localhost:8080/swagger-ui.html
\`\`\`

**3. Test API:**
\`\`\`
- Click "Try it out"
- Enter parameters
- Click "Execute"
- View response
\`\`\`

---

## Documentation Best Practices

### 1. Clear Descriptions

**Good:**
\`\`\`yaml
get:
  summary: Get user by ID
  description: Retrieves a specific user by their unique identifier. Returns 404 if user not found.
\`\`\`

**Bad:**
\`\`\`yaml
get:
  summary: Get user
\`\`\`

### 2. Complete Examples

**Include examples:**
\`\`\`yaml
requestBody:
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/UserRequest'
      example:
        name: "John Doe"
        email: "john@example.com"
\`\`\`

### 3. Error Documentation

**Document all errors:**
\`\`\`yaml
responses:
  '200':
    description: Success
  '400':
    description: Bad Request - Validation error
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
  '404':
    description: User not found
\`\`\`

### 4. Authentication Documentation

**Explain auth:**
\`\`\`yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
security:
  - bearerAuth: []
\`\`\`

### 5. Parameter Documentation

**Document parameters:**
\`\`\`yaml
parameters:
  - name: id
    in: path
    required: true
    description: User ID
    schema:
      type: integer
      example: 123
\`\`\`

---

## Documentation Structure

### 1. Getting Started

**Include:**
- Quick start guide
- Authentication setup
- First API call
- Common examples

### 2. API Reference

**Complete reference:**
- All endpoints
- Request/response formats
- Parameters
- Error codes

### 3. Examples

**Real-world examples:**
- Common use cases
- Code samples
- cURL examples
- SDK examples

### 4. Guides

**Tutorials:**
- Step-by-step guides
- Integration guides
- Best practices

---

## Real-World Examples

### GitHub API Documentation

**Features:**
- Interactive examples
- Code samples
- Rate limiting info
- Authentication guide

### Stripe API Documentation

**Features:**
- Comprehensive reference
- Code examples
- Testing tools
- SDK documentation

### Twilio API Documentation

**Features:**
- Quick start guides
- Code samples
- Interactive testing
- Error handling

---

## Summary

API documentation essentials:

- **OpenAPI**: Standard specification
- **Swagger UI**: Interactive documentation
- **Best Practices**: Clear, complete, examples
- **Structure**: Getting started, reference, examples

**Important points:**
- Use OpenAPI specification
- Generate Swagger UI
- Include examples
- Document errors
- Keep updated

Good documentation is essential for:
- API adoption
- Developer experience
- Reduced support
- Faster integration
- Professional APIs

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between OpenAPI and Swagger?

**OpenAPI** is the specification (formerly Swagger). **Swagger** refers to tools (Swagger UI, Swagger Editor). OpenAPI 3.0 is current standard.

### 2. How do I generate OpenAPI from code?

**Use annotations** (Java: SpringDoc, .NET: Swashbuckle) or **write manually**. Tools can generate from code.

### 3. Should I document all endpoints?

**Yes**, document all public endpoints. Include request/response formats, parameters, errors, examples.

### 4. How often should I update documentation?

**Update with every API change**. Outdated documentation is worse than no documentation.

### 5. Can I test APIs from documentation?

**Yes**, Swagger UI allows "Try it out" functionality. Postman collections also enable testing.

### 6. What should I include in examples?

**Include**: Request body, response body, error responses, authentication, common use cases.

### 7. How do I document authentication?

**Use security schemes** in OpenAPI. Explain in getting started guide. Include token examples.

### 8. Should I include code samples?

**Yes**, include code samples in multiple languages (JavaScript, Python, Java, cURL) for better developer experience.

### 9. How do I keep documentation in sync with code?

**Generate from code** using annotations/tools. Or use CI/CD to validate OpenAPI spec matches implementation.

### 10. What tools can I use for documentation?

**Tools**: Swagger UI, Postman, Redoc, Stoplight, API Blueprint. Choose based on needs and team preferences.
  `,
  code: `// API Documentation - Complete Examples

// Example 1: OpenAPI Specification
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for user management
servers:
  - url: https://api.example.com
paths:
  /users:
    get:
      summary: Get all users
      operationId: getUsers
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
          type: string

// Example 2: SpringDoc Configuration (Java)
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User API")
                .version("1.0.0")
                .description("API for user management")
                .contact(new Contact()
                    .name("API Support")
                    .email("support@example.com")))
            .addServersItem(new Server()
                .url("https://api.example.com")
                .description("Production"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}

// Example 3: API Documentation Annotations (Java)
@Operation(summary = "Get user by ID", description = "Retrieves a specific user")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "User found"),
    @ApiResponse(responseCode = "404", description = "User not found")
})
@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    // ...
}

// Example 4: Schema Documentation
@Schema(description = "User information")
public class User {
    @Schema(description = "User ID", example = "123")
    private Long id;
    
    @Schema(description = "User name", example = "John Doe")
    private String name;
    
    @Schema(description = "User email", example = "john@example.com")
    private String email;
}

// Example 5: Request Body Documentation
@Operation(summary = "Create user")
@io.swagger.v3.oas.annotations.parameters.RequestBody(
    description = "User creation request",
    required = true,
    content = @Content(schema = @Schema(implementation = UserRequest.class))
)
@PostMapping("/users")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    // ...
}`
};

export default apiDocumentation;

