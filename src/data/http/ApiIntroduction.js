const apiIntroduction = {
  id: 'api-introduction',
  title: 'API Introduction - What is an API?',
  description: 'Learn what APIs are, types of APIs (Public, Private, Partner), API vs Web Service, and how APIs power modern applications',
  content: `
# API Introduction — Understanding Application Programming Interfaces

APIs (Application Programming Interfaces) are the foundation of modern software development. They enable different applications to communicate and share data, powering everything from mobile apps to cloud services.

---

## What is an API?

**API** stands for **Application Programming Interface**:

- **Application**: A software program
- **Programming**: Writing code to interact with it
- **Interface**: A contract that defines how to communicate

An API is a set of rules and protocols that allows different software applications to communicate with each other. 

**Practical Example:** Mobile applications often retrieve data from external services rather than storing it locally. For instance, a weather application doesn't contain weather data within the app itself. Instead, it sends a request to a weather service's API, which processes the request and returns current weather data. The API serves as an intermediary layer that enables communication between the mobile app and the weather service backend.

**How it works:**
- Your application (client) sends a request to the API
- The API forwards the request to the server that has the data
- The server processes the request and sends back a response
- The API returns that response to your application

**API Documentation** tells you:
- What endpoints are available (like a menu of options)
- What format to send requests in
- What kind of response you'll get back
- Any authentication or rate limits you need to know about

---

## Why APIs Exist

APIs solve critical problems in software development:

### 1. **Separation of Concerns**

APIs allow frontend and backend to be developed independently:

\`\`\`
Frontend (React)  ←→  API  ←→  Backend (Java)
\`\`\`

**Benefits:**
- Teams can work in parallel
- Technologies can be different
- Easier to maintain and update

### 2. **Reusability**

One API can serve multiple clients:

\`\`\`
        ┌─────────┐
        │   API   │
        └────┬────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───┴───┐ ┌──┴───┐ ┌──┴───┐
│ Web   │ │Mobile│ │Desktop│
│ App   │ │ App  │ │  App │
└───────┘ └──────┘ └───────┘
\`\`\`

**Example:**
- Same API powers website, mobile app, and desktop app
- No need to duplicate backend logic

### 3. **Scalability**

APIs enable microservices architecture:

\`\`\`
┌──────────┐  ┌──────────┐  ┌──────────┐
│ User API │  │ Order API│  │Payment API│
└──────────┘  └──────────┘  └──────────┘
\`\`\`

**Benefits:**
- Each service can scale independently
- Easier to maintain and deploy
- Better fault isolation

### 4. **Integration**

APIs enable third-party integrations:

\`\`\`
Your App  →  Payment API (Stripe)
Your App  →  Email API (SendGrid)
Your App  →  Maps API (Google Maps)
\`\`\`

**Benefits:**
- Use specialized services
- Faster development
- Better features

---

## Types of APIs

### 1. Public APIs (Open APIs)

**Definition**: APIs available to anyone on the internet

**Characteristics:**
- **Access**: Public, no restrictions
- **Authentication**: Usually required (API keys)
- **Documentation**: Publicly available
- **Rate Limits**: Usually enforced

**Examples:**
- **Twitter API**: Access tweets, post content
- **Google Maps API**: Embed maps, get directions
- **GitHub API**: Access repositories, manage code
- **Weather API**: Get weather data

**Use Cases:**
- Third-party integrations
- Public data access
- Developer ecosystems

**Example:**
\`\`\`javascript
// Public API - Weather Service
async function getWeather(city) {
    const response = await fetch(
        \`https://api.weather.com/v1/current?city=\${city}&key=YOUR_API_KEY\`
    );
    return await response.json();
}
\`\`\`

### 2. Private APIs (Internal APIs)

**Definition**: APIs used within an organization

**Characteristics:**
- **Access**: Internal only (behind firewall)
- **Authentication**: Internal systems
- **Documentation**: Internal documentation
- **Rate Limits**: Usually not enforced

**Examples:**
- **Employee Management API**: Internal HR system
- **Inventory API**: Warehouse management
- **Billing API**: Internal billing system

**Use Cases:**
- Internal system communication
- Microservices within organization
- Backend-to-backend communication

**Example:**
\`\`\`java
// Private API - Internal Employee Service
@RestController
@RequestMapping("/internal/employees")
public class EmployeeController {
    
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        // Only accessible within company network
        Employee employee = employeeService.findById(id);
        return ResponseEntity.ok(employee);
    }
}
\`\`\`

### 3. Partner APIs

**Definition**: APIs shared with specific business partners

**Characteristics:**
- **Access**: Restricted to partners
- **Authentication**: Partner-specific credentials
- **Documentation**: Partner portal
- **Rate Limits**: Based on partnership agreement

**Examples:**
- **Supplier API**: For vendors to check inventory
- **Partner Integration API**: For business partners
- **Reseller API**: For authorized resellers

**Use Cases:**
- B2B integrations
- Supply chain management
- Partner ecosystems

**Example:**
\`\`\`java
// Partner API - Supplier Integration
@RestController
@RequestMapping("/partner/suppliers")
public class SupplierController {
    
    @GetMapping("/inventory")
    public ResponseEntity<Inventory> getInventory(
        @RequestHeader("X-Partner-ID") String partnerId
    ) {
        // Only accessible by authorized partners
        if (!partnerService.isAuthorized(partnerId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        Inventory inventory = inventoryService.getCurrentInventory();
        return ResponseEntity.ok(inventory);
    }
}
\`\`\`

### Comparison Table

| Feature | Public API | Private API | Partner API |
|---------|-----------|-------------|-------------|
| **Access** | Anyone | Internal only | Partners only |
| **Authentication** | API keys | Internal auth | Partner credentials |
| **Documentation** | Public | Internal | Partner portal |
| **Rate Limits** | Strict | Flexible | Based on agreement |
| **Examples** | Twitter, Google | Internal systems | Supplier APIs |

---

## API vs Web Service

### What is a Web Service?

A **web service** is a specific type of API that uses web technologies (HTTP) for communication.

### Key Differences

| Aspect | API | Web Service |
|--------|-----|-------------|
| **Scope** | Broader term | Specific type of API |
| **Protocol** | Any (HTTP, gRPC, etc.) | HTTP only |
| **Format** | JSON, XML, etc. | Usually XML (SOAP) or JSON (REST) |
| **Definition** | Any interface | Web-based interface |

### Types of Web Services

#### 1. REST (Representational State Transfer)

**Characteristics:**
- Uses HTTP methods (GET, POST, PUT, DELETE)
- JSON or XML format
- Stateless
- Resource-based URLs

**Example:**
\`\`\`http
GET /api/users/123 HTTP/1.1
Host: api.example.com

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

#### 2. SOAP (Simple Object Access Protocol)

**Characteristics:**
- XML format only
- More structured
- Built-in security
- WSDL (Web Services Description Language)

**Example:**
\`\`\`xml
<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>
\`\`\`

#### 3. GraphQL

**Characteristics:**
- Single endpoint
- Client specifies needed fields
- Flexible queries
- Strongly typed

**Example:**
\`\`\`graphql
query {
  user(id: 123) {
    name
    email
  }
}
\`\`\`

### REST vs SOAP vs GraphQL

| Feature | REST | SOAP | GraphQL |
|---------|------|------|---------|
| **Format** | JSON/XML | XML only | JSON |
| **Complexity** | Simple | Complex | Medium |
| **Caching** | Yes | Limited | Yes |
| **Overhead** | Low | High | Medium |
| **Flexibility** | Medium | Low | High |

---

## How APIs Work

### Request-Response Cycle

\`\`\`
┌─────────┐                    ┌─────────┐
│ Client  │                    │  API    │
│  App    │                    │ Server  │
└────┬────┘                    └────┬────┘
     │                              │
     │  1. HTTP Request             │
     │  GET /api/users/123          │
     │─────────────────────────────>│
     │                              │
     │                              │ 2. Process Request
     │                              │    - Validate
     │                              │    - Query Database
     │                              │    - Format Response
     │                              │
     │  3. HTTP Response            │
     │  {                            │
     │    "id": 123,                 │
     │    "name": " Dattu"             │
     │  }                            │
     │<─────────────────────────────│
     │                              │
\`\`\`

### Step-by-Step Process

1. **Client Makes Request**
   - Application sends HTTP request
   - Includes endpoint, method, headers, body

2. **API Receives Request**
   - Server receives HTTP request
   - Validates authentication
   - Parses request data

3. **API Processes Request**
   - Business logic execution
   - Database queries
   - Data processing

4. **API Sends Response**
   - Formats response data
   - Sets HTTP status code
   - Returns JSON/XML

5. **Client Receives Response**
   - Application receives data
   - Parses response
   - Updates UI

---

## Real-World API Examples

### 1. Social Media API (Twitter)

**Purpose**: Access Twitter data and post tweets

**Example:**
\`\`\`javascript
// Get user tweets
async function getUserTweets(userId) {
    const response = await fetch(
        \`https://api.twitter.com/2/users/\${userId}/tweets\`,
        {
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN'
            }
        }
    );
    return await response.json();
}
\`\`\`

**Use Cases:**
- Social media management tools
- Analytics dashboards
- Content aggregation

### 2. Payment API (Stripe)

**Purpose**: Process payments securely

**Example:**
\`\`\`javascript
// Process payment
async function processPayment(amount, token) {
    const response = await fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_...',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            amount: amount,
            currency: 'usd',
            source: token
        })
    });
    return await response.json();
}
\`\`\`

**Use Cases:**
- E-commerce websites
- Subscription services
- Payment processing

### 3. Maps API (Google Maps)

**Purpose**: Embed maps and get location data

**Example:**
\`\`\`javascript
// Get directions
async function getDirections(origin, destination) {
    const response = await fetch(
        \`https://maps.googleapis.com/maps/api/directions/json?origin=\${origin}&destination=\${destination}&key=YOUR_KEY\`
    );
    return await response.json();
}
\`\`\`

**Use Cases:**
- Location-based apps
- Delivery services
- Navigation apps

### 4. Weather API (OpenWeatherMap)

**Purpose**: Get weather information

**Example:**
\`\`\`javascript
// Get current weather
async function getWeather(city) {
    const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_KEY\`
    );
    return await response.json();
}
\`\`\`

**Use Cases:**
- Weather apps
- Travel applications
- Agriculture monitoring

---

## API Benefits

### 1. **Faster Development**

Instead of building everything from scratch:
- Use payment APIs (Stripe, PayPal)
- Use email APIs (SendGrid, Mailgun)
- Use storage APIs (AWS S3, Google Cloud)

**Result**: Focus on core business logic

### 2. **Better Features**

Leverage specialized services:
- **Maps**: Google Maps API
- **Analytics**: Google Analytics API
- **Authentication**: Auth0 API

**Result**: Professional features without expertise

### 3. **Cost Efficiency**

Pay only for what you use:
- No infrastructure costs
- No maintenance overhead
- Scalable pricing

**Result**: Lower total cost of ownership

### 4. **Scalability**

APIs handle scaling:
- Automatic load balancing
- Global CDN distribution
- High availability

**Result**: Your app scales automatically

---

## API Architecture Patterns

### 1. RESTful API

**Characteristics:**
- Resource-based URLs
- HTTP methods
- Stateless
- JSON responses

**Example:**
\`\`\`
GET    /api/users        → List users
GET    /api/users/123    → Get user
POST   /api/users        → Create user
PUT    /api/users/123     → Update user
DELETE /api/users/123     → Delete user
\`\`\`

### 2. GraphQL API

**Characteristics:**
- Single endpoint
- Client-defined queries
- Strongly typed
- Efficient data fetching

**Example:**
\`\`\`graphql
query {
  user(id: 123) {
    name
    email
    posts {
      title
      content
    }
  }
}
\`\`\`

### 3. gRPC API

**Characteristics:**
- Binary protocol
- High performance
- Strongly typed
- Streaming support

**Example:**
\`\`\`protobuf
service UserService {
  rpc GetUser(UserRequest) returns (User);
  rpc ListUsers(Empty) returns (stream User);
}
\`\`\`

---

## Industry Examples

### Amazon Web Services (AWS)

**APIs Provided:**
- **S3 API**: Object storage
- **EC2 API**: Virtual servers
- **Lambda API**: Serverless functions
- **DynamoDB API**: NoSQL database

**Impact:**
- Powers millions of applications
- Enables cloud computing
- $80+ billion revenue

### Stripe

**API Provided:**
- Payment processing API

**Impact:**
- Used by millions of businesses
- Processes billions in payments
- $95+ billion valuation

### Twilio

**API Provided:**
- Communication APIs (SMS, Voice, Video)

**Impact:**
- Powers communication for thousands of apps
- $15+ billion valuation

---

## Summary

APIs are essential for modern software development:

- **Definition**: Application Programming Interfaces enable software communication
- **Types**: Public (open), Private (internal), Partner (restricted)
- **vs Web Services**: APIs are broader; web services are HTTP-based APIs
- **Benefits**: Faster development, better features, cost efficiency, scalability
- **Architecture**: REST, GraphQL, gRPC

Understanding APIs is crucial for:
- Building modern applications
- Integrating third-party services
- Creating scalable architectures
- Enabling microservices
- Powering mobile and web apps

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between API and web service?

**API** is a broader term for any programming interface. **Web service** is a specific type of API that uses HTTP/HTTPS protocols. All web services are APIs, but not all APIs are web services.

### 2. What are the main types of APIs?

The main types are:
- **Public APIs**: Open to anyone (Twitter, Google Maps)
- **Private APIs**: Internal use only (company systems)
- **Partner APIs**: Shared with specific partners (supplier systems)

### 3. How do APIs work?

APIs work through a request-response cycle:
1. Client sends HTTP request
2. API server processes request
3. Server returns HTTP response
4. Client receives and uses data

### 4. What is REST API?

**REST** (Representational State Transfer) is an architectural style for APIs. It uses HTTP methods (GET, POST, PUT, DELETE), resource-based URLs, and JSON/XML formats.

### 5. What is the difference between REST and SOAP?

**REST** is simpler, uses JSON/XML, and is more flexible. **SOAP** is more structured, uses XML only, and has built-in security features. REST is more popular for modern APIs.

### 6. Can APIs work without the internet?

APIs can work on local networks (localhost, intranet) but require network connectivity. They cannot work completely offline as they need client-server communication.

### 7. How do I secure my API?

Secure APIs using:
- **Authentication**: API keys, OAuth, JWT tokens
- **HTTPS**: Encrypt data in transit
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Prevent attacks
- **Authorization**: Control access levels

### 8. What is API versioning?

**API versioning** allows you to update APIs without breaking existing clients. Common approaches:
- URL versioning: \`/api/v1/users\`, \`/api/v2/users\`
- Header versioning: \`Accept: application/vnd.api+json;version=2\`

### 9. How do I test an API?

Test APIs using:
- **Postman**: GUI tool for API testing
- **cURL**: Command-line tool
- **Swagger UI**: Interactive API documentation
- **Automated Tests**: Unit and integration tests

### 10. What is API documentation?

**API documentation** describes how to use an API:
- Available endpoints
- Request/response formats
- Authentication methods
- Example requests
- Error codes

Good documentation is essential for API adoption.
  `,
  code: `// API Introduction - Complete Examples

// Example 1: Public API - Weather Service (JavaScript)
async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}\`
    );
    
    if (response.ok) {
        const data = await response.json();
        return {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description
        };
    }
    throw new Error('Failed to fetch weather');
}

// Example 2: REST API - User Service (Java - Spring Boot)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET - Retrieve user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    // POST - Create user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .location(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
}

// Example 3: Private API - Internal Service (Java)
@RestController
@RequestMapping("/internal/employees")
public class EmployeeController {
    
    // Only accessible within company network
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        return ResponseEntity.ok(employee);
    }
}

// Example 4: Partner API - Supplier Integration (Java)
@RestController
@RequestMapping("/partner/suppliers")
public class SupplierController {
    
    @GetMapping("/inventory")
    public ResponseEntity<Inventory> getInventory(
        @RequestHeader("X-Partner-ID") String partnerId
    ) {
        // Verify partner authorization
        if (!partnerService.isAuthorized(partnerId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        Inventory inventory = inventoryService.getCurrentInventory();
        return ResponseEntity.ok(inventory);
    }
}

// Example 5: Payment API Integration (JavaScript)
async function processPayment(amount, cardToken) {
    const response = await fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_...',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            source: cardToken
        })
    });
    
    if (response.ok) {
        return await response.json();
    }
    throw new Error('Payment failed');
}

// Example 6: Maps API Integration (JavaScript)
async function getDirections(origin, destination) {
    const apiKey = 'YOUR_GOOGLE_MAPS_KEY';
    const response = await fetch(
        \`https://maps.googleapis.com/maps/api/directions/json?origin=\${origin}&destination=\${destination}&key=\${apiKey}\`
    );
    
    if (response.ok) {
        const data = await response.json();
        return data.routes[0].legs[0];
    }
    throw new Error('Failed to get directions');
}

// Example 7: Social Media API (Twitter) - JavaScript
async function getUserTweets(userId) {
    const response = await fetch(
        \`https://api.twitter.com/2/users/\${userId}/tweets\`,
        {
            headers: {
                'Authorization': 'Bearer YOUR_BEARER_TOKEN'
            }
        }
    );
    
    if (response.ok) {
        return await response.json();
    }
    throw new Error('Failed to fetch tweets');
}

// Example 8: API Client Class (JavaScript)
class ApiClient {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const config = {
            ...options,
            headers: {
                'Authorization': \`Bearer \${this.apiKey}\`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        };
        
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(\`API Error: \${response.status} \${response.statusText}\`);
        }
        
        return await response.json();
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage
const client = new ApiClient('https://api.example.com', 'your-api-key');
const users = await client.get('/users');
const newUser = await client.post('/users', { name: ' Dattu', email: ' Dattu@example.com' });

// Example 9: API Error Handling (Java)
@RestControllerAdvice
public class ApiExceptionHandler {
    
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

// Example 10: API Rate Limiting (Java)
@Component
public class RateLimiter {
    private final Map<String, List<Long>> requests = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60000; // 1 minute
    
    public boolean isAllowed(String clientId) {
        long now = System.currentTimeMillis();
        List<Long> clientRequests = requests.computeIfAbsent(clientId, k -> new ArrayList<>());
        
        // Remove old requests outside window
        clientRequests.removeIf(time -> now - time > WINDOW_MS);
        
        if (clientRequests.size() >= MAX_REQUESTS) {
            return false; // Rate limit exceeded
        }
        
        clientRequests.add(now);
        return true;
    }
}`
};

export default apiIntroduction;

