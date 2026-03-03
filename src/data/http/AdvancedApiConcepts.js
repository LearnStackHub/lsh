const advancedApiConcepts = {
  id: 'advanced-api-concepts',
  title: 'Advanced API Concepts - HATEOAS, GraphQL, WebSockets, gRPC',
  description: 'Learn advanced API concepts: HATEOAS, GraphQL vs REST, WebSockets for real-time, gRPC for high performance, and when to use each approach',
  content: `
# Advanced API Concepts — Complete Guide

Beyond REST, there are advanced API concepts (HATEOAS, GraphQL, WebSockets, gRPC) that solve specific problems. Understanding when to use each is essential for building modern APIs.

---

## HATEOAS (Hypermedia as the Engine of Application State)

### What is HATEOAS?

**HATEOAS** means responses include links to related resources.

**Example:**
\`\`\`json
{
  "id": 123,
  "name": "John Doe",
  "_links": {
    "self": {"href": "/api/users/123"},
    "posts": {"href": "/api/users/123/posts"},
    "update": {"href": "/api/users/123", "method": "PUT"},
    "delete": {"href": "/api/users/123", "method": "DELETE"}
  }
}
\`\`\`

**Benefits:**
- Self-documenting
- Discoverable
- Client flexibility

---

## GraphQL vs REST

### GraphQL

**Query language** for APIs

**Features:**
- Single endpoint
- Client-specified queries
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

**Pros:**
- Flexible queries
- No over-fetching
- Single endpoint
- Strong typing

**Cons:**
- More complex
- Caching harder
- Learning curve

### REST vs GraphQL

| Feature | REST | GraphQL |
|---------|------|---------|
| **Endpoints** | Multiple | Single |
| **Data Fetching** | Fixed | Flexible |
| **Over-fetching** | Possible | No |
| **Caching** | Easy | Complex |
| **Complexity** | Simple | Medium |

**When to Use:**
- **REST**: Simple APIs, caching important, standard operations
- **GraphQL**: Complex queries, mobile apps, real-time needs

---

## WebSockets

### What are WebSockets?

**Persistent bidirectional** connection

**Use Cases:**
- Real-time chat
- Live updates
- Gaming
- Notifications

**Example:**
\`\`\`javascript
const ws = new WebSocket('ws://api.example.com/chat');
ws.onmessage = (event) => {
    console.log('Message:', event.data);
};
ws.send('Hello, Server!');
\`\`\`

**Pros:**
- Real-time
- Low latency
- Bidirectional
- Efficient

**Cons:**
- More complex
- Connection management
- Scaling challenges

---

## gRPC

### What is gRPC?

**High-performance** RPC framework

**Features:**
- Binary protocol
- HTTP/2
- Strongly typed
- Streaming

**Example:**
\`\`\`protobuf
service UserService {
  rpc GetUser(UserRequest) returns (User);
  rpc ListUsers(Empty) returns (stream User);
}
\`\`\`

**Pros:**
- High performance
- Strong typing
- Streaming
- Language agnostic

**Cons:**
- Less human-readable
- Browser support limited
- Learning curve

---

## When to Use Each

### REST
- **When**: Standard CRUD, web APIs, caching needed
- **Example**: User management, product catalog

### GraphQL
- **When**: Complex queries, mobile apps, flexible data
- **Example**: Social media feeds, dashboards

### WebSockets
- **When**: Real-time updates, chat, live data
- **Example**: Chat apps, live scores, notifications

### gRPC
- **When**: High performance, microservices, streaming
- **Example**: Internal services, data processing

---

## Summary

Advanced API concepts:

- **HATEOAS**: Self-documenting APIs with links
- **GraphQL**: Flexible query language
- **WebSockets**: Real-time bidirectional communication
- **gRPC**: High-performance RPC

**Important points:**
- Choose based on requirements
- REST for standard APIs
- GraphQL for complex queries
- WebSockets for real-time
- gRPC for performance

Understanding advanced concepts enables:
- Better API design
- Solving specific problems
- Performance optimization
- Real-time capabilities
- Modern architectures

---

## Frequently Asked Questions (FAQs)

### 1. What is HATEOAS?

**HATEOAS** means API responses include links to related resources, making APIs self-documenting and discoverable.

### 2. Should I use GraphQL or REST?

**REST** for simple, standard APIs. **GraphQL** for complex queries, mobile apps, flexible data needs.

### 3. When should I use WebSockets?

**Use WebSockets** for real-time communication: chat, live updates, notifications, gaming.

### 4. What is the difference between REST and gRPC?

**REST** uses HTTP/JSON, human-readable. **gRPC** uses HTTP/2/binary, high performance, strongly typed.

### 5. Can I use multiple approaches?

**Yes**, use REST for public APIs, GraphQL for complex queries, WebSockets for real-time, gRPC for internal services.

### 6. Is GraphQL better than REST?

**Not necessarily**. Choose based on requirements. REST is simpler, GraphQL is more flexible.

### 7. How do WebSockets work?

**WebSockets** establish persistent connection, allowing bidirectional real-time communication without HTTP overhead.

### 8. What is gRPC used for?

**gRPC** is used for high-performance microservices communication, streaming data, internal APIs.

### 9. Do I need HATEOAS?

**Optional** but recommended for self-documenting APIs. Makes APIs more discoverable and flexible.

### 10. Can I combine REST and GraphQL?

**Yes**, use REST for standard operations, GraphQL for complex queries. Many APIs offer both.
  `,
  code: `// Advanced API Concepts - Complete Examples

// Example 1: HATEOAS (Java)
@GetMapping("/api/users/{id}")
public ResponseEntity<UserResource> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    UserResource resource = new UserResource(user);
    
    resource.add(linkTo(methodOn(UserController.class).getUser(id)).withSelfRel());
    resource.add(linkTo(methodOn(UserController.class).getAllUsers()).withRel("users"));
    
    return ResponseEntity.ok(resource);
}

// Example 2: GraphQL Query
query {
  user(id: 123) {
    name
    email
    posts {
      title
    }
  }
}

// Example 3: WebSocket (JavaScript)
const ws = new WebSocket('ws://api.example.com/chat');
ws.onmessage = (event) => {
    console.log('Message:', event.data);
};

// Example 4: gRPC (Protobuf)
service UserService {
  rpc GetUser(UserRequest) returns (User);
}`
};

export default advancedApiConcepts;

