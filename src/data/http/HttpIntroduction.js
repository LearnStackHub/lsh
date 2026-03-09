const httpIntroduction = {
  id: 'http-introduction',
  title: 'HTTP Introduction - What is HTTP?',
  description: 'Learn what HTTP is, how it evolved from HTTP/1.0 to HTTP/3, its stateless nature, and client-server architecture',
  content: `
# HTTP Introduction — The Foundation of Web Communication

HTTP (HyperText Transfer Protocol) is the fundamental protocol that powers the World Wide Web. Every time you visit a website, send a form, or interact with a web application, HTTP is working behind the scenes to facilitate communication between your browser and the server.

---

## What is HTTP?

**HTTP** stands for **HyperText Transfer Protocol**:

- **HyperText**: Text that contains links (hyperlinks) to other documents, enabling navigation between web pages
- **Transfer**: The movement of data from one location to another
- **Protocol**: A set of rules that define how data is transmitted over a network

HTTP is essentially the language that web browsers and servers use to communicate. Without HTTP, your browser wouldn't know how to ask for a webpage, and servers wouldn't know how to respond. It's the standard that makes the entire web work.

---

## Why HTTP Exists

Before HTTP, there was no standard way for computers to request and share documents over the internet. HTTP was created to:

1. **Enable Web Browsing**: Allow users to navigate between web pages by clicking links
2. **Standardize Communication**: Provide a consistent way for clients and servers to exchange data
3. **Support Multiple Media Types**: Handle text, images, videos, and other content formats
4. **Enable Stateless Communication**: Allow servers to handle requests independently without maintaining client state

---

## How HTTP Works: Client-Server Architecture

HTTP follows a **client-server model**:

\`\`\`
┌─────────┐                    ┌─────────┐
│ Client  │                    │ Server  │
│(Browser)│                    │(Web App)│
└────┬────┘                    └────┬────┘
     │                              │
     │  1. HTTP Request             │
     │─────────────────────────────>│
     │                              │
     │                              │ Process Request
     │                              │
     │  2. HTTP Response            │
     │<─────────────────────────────│
     │                              │
\`\`\`

### The Request-Response Cycle

1. **Client Sends Request**: Your browser (client) sends an HTTP request to the server
2. **Server Processes**: The server receives the request, processes it, and prepares a response
3. **Server Sends Response**: The server sends back an HTTP response with the requested data
4. **Client Receives**: Your browser receives the response and displays the content

### Real-World Example

When you visit \`https://learnstackhub.com\`:

\`\`\`http
GET / HTTP/1.1
Host: learnstackhub.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
\`\`\`

The server responds:

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 15234

<!DOCTYPE html>
<html>
<head>
  <title>LearnStackHub</title>
</head>
<body>
  <!-- Page content -->
</body>
</html>
\`\`\`

---

## Evolution of HTTP: HTTP/1.0 to HTTP/3

HTTP has evolved significantly since its creation. Understanding this evolution helps you appreciate modern web performance optimizations.

### HTTP/1.0 (1996)

**Characteristics:**
- One request per connection
- Connection closed after each response
- No persistent connections
- Limited header support

**Limitations:**
- **Slow**: Each request required a new TCP connection
- **Inefficient**: High overhead for establishing connections
- **No Pipelining**: Couldn't send multiple requests simultaneously

**Example:**
\`\`\`http
GET /page.html HTTP/1.0
Host: example.com

HTTP/1.0 200 OK
Content-Type: text/html

<html>...</html>
[Connection closes]
\`\`\`

### HTTP/1.1 (1997) - Most Common Today

**Key Improvements:**
- **Persistent Connections**: Reuse connections for multiple requests
- **Pipelining**: Send multiple requests without waiting for responses
- **Host Header**: Required, enabling virtual hosting
- **Chunked Transfer**: Stream data without knowing content length upfront
- **Caching**: Better cache control headers

**Example:**
\`\`\`http
GET /page1.html HTTP/1.1
Host: example.com
Connection: keep-alive

HTTP/1.1 200 OK
Content-Type: text/html
Connection: keep-alive
Content-Length: 1234

<html>...</html>

[Connection stays open for next request]
\`\`\`

**Real-World Impact:**
- **Amazon**: Reduced page load time by 20% after implementing HTTP/1.1 optimizations
- **Netflix**: Uses persistent connections to stream video efficiently

### HTTP/2 (2015) - Major Performance Boost

**Revolutionary Features:**
- **Multiplexing**: Multiple requests/responses over a single connection simultaneously
- **Header Compression**: Reduces overhead using HPACK
- **Server Push**: Server can send resources before client requests them
- **Binary Protocol**: More efficient than text-based HTTP/1.1
- **Stream Prioritization**: Important resources load first

**Performance Comparison:**

| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Connections per domain | 6-8 | 1 |
| Request overhead | High | Low (compressed headers) |
| Parallel requests | Limited | Unlimited (multiplexing) |
| Server push | No | Yes |

**Example:**
\`\`\`http
:method: GET
:path: /page.html
:scheme: https
host: example.com
user-agent: Mozilla/5.0

[Multiple requests can be sent simultaneously on same connection]
\`\`\`

**Industry Adoption:**
- **Google**: 50% of traffic uses HTTP/2
- **Cloudflare**: Automatically enables HTTP/2 for all sites
- **Major CDNs**: All support HTTP/2

### HTTP/3 (2020) - The Future

**Game-Changing Features:**
- **QUIC Protocol**: Uses UDP instead of TCP, eliminating head-of-line blocking
- **Built-in Encryption**: TLS 1.3 mandatory
- **Faster Connection Setup**: 0-RTT and 1-RTT handshakes
- **Connection Migration**: Maintains connection even when IP changes

**Why HTTP/3 Matters:**
- **Mobile Networks**: Handles network switching better
- **Latency Reduction**: 30-50% faster than HTTP/2 in poor network conditions
- **Reliability**: Better error recovery

**Example:**
\`\`\`http
[Uses QUIC over UDP]
[Encrypted by default]
[0-RTT for repeat connections]
\`\`\`

**Adoption Status:**
- **Cloudflare**: Supports HTTP/3
- **Google**: Using HTTP/3 for YouTube and other services
- **Facebook**: Testing HTTP/3 for mobile apps

---

## Stateless Nature of HTTP

HTTP is **stateless**, meaning each request is independent. The server doesn't remember previous requests from the same client.

### What "Stateless" Means

\`\`\`
Request 1: GET /login
[Server processes, responds, forgets]

Request 2: GET /dashboard
[Server doesn't know this is same user from Request 1]
\`\`\`

### Why Stateless?

**Advantages:**
1. **Scalability**: Servers can handle requests from any client without maintaining state
2. **Simplicity**: No need to manage complex session state
3. **Reliability**: If one server fails, another can handle the next request
4. **Caching**: Responses can be cached and reused

**Disadvantages:**
1. **No Memory**: Server doesn't remember user login, shopping cart, etc.
2. **Extra Overhead**: Need to send authentication/state with every request

### How We Handle State in Stateless HTTP

Since HTTP is stateless, we use techniques to maintain state:

**1. Cookies**
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/
\`\`\`

**2. Sessions**
\`\`\`java
// Server creates session
HttpSession session = request.getSession();
session.setAttribute("userId", 123);

// Client sends session ID in cookie
Cookie: JSESSIONID=xyz789
\`\`\`

**3. Tokens (JWT)**
\`\`\`http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

**4. URL Parameters**
\`\`\`
GET /dashboard?userId=123
\`\`\`

---

## Client-Server Architecture

HTTP is built on a **client-server architecture** where:

### Client (Browser/Application)

**Responsibilities:**
- Initiates requests
- Sends HTTP requests to servers
- Receives and displays responses
- Manages cookies and cache

**Examples:**
- Web browsers (Chrome, Firefox, Safari)
- Mobile apps
- API clients (Postman, cURL)
- Command-line tools

### Server (Web Server/Application)

**Responsibilities:**
- Listens for incoming requests
- Processes requests
- Generates responses
- Manages resources and data

**Examples:**
- Apache HTTP Server
- Nginx
- Spring Boot applications
- Node.js servers
- Cloud services (AWS, Azure)

### Communication Flow

\`\`\`
┌─────────────────────────────────────────────────┐
│                    Client                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Browser  │  │  Mobile  │  │   API    │    │
│  │          │  │   App    │  │  Client   │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │              │           │
│       └─────────────┼──────────────┘           │
│                     │                          │
│              HTTP Requests                      │
└─────────────────────┼──────────────────────────┘
                      │
                      │ Internet/Network
                      │
┌─────────────────────┼──────────────────────────┐
│                     │                          │
│              HTTP Responses                     │
│                     │                          │
│       ┌─────────────┼──────────────┐           │
│       │             │              │           │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐    │
│  │  Web     │  │  API     │  │  CDN     │    │
│  │  Server  │  │  Server  │  │  Server  │    │
│  └──────────┘  └──────────┘  └──────────┘    │
│                    Server                       │
└─────────────────────────────────────────────────┘
\`\`\`

---

## HTTP vs Other Protocols

### HTTP vs HTTPS

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Security** | No encryption | Encrypted (TLS/SSL) |
| **Port** | 80 | 443 |
| **Data Protection** | Plain text | Encrypted |
| **SEO** | Lower ranking | Higher ranking |
| **Browser Trust** | Not secure warning | Secure indicator |

**Example:**
\`\`\`
HTTP:  http://example.com
HTTPS: https://example.com (encrypted)
\`\`\`

### HTTP vs FTP

| Feature | HTTP | FTP |
|---------|------|-----|
| **Purpose** | Web pages, APIs | File transfer |
| **Connection** | Stateless | Stateful |
| **Port** | 80/443 | 21 (control), 20 (data) |
| **Use Case** | Browsing, APIs | File upload/download |

### HTTP vs WebSocket

| Feature | HTTP | WebSocket |
|---------|------|-----------|
| **Connection** | Request-response | Persistent bidirectional |
| **Overhead** | Headers per request | Low (after handshake) |
| **Use Case** | Traditional web pages | Real-time chat, gaming |
| **Latency** | Higher | Lower |

---

## Real-World Use Cases

### 1. E-commerce Website (Amazon)

**HTTP Flow:**
1. User browses products → \`GET /products\`
2. Adds to cart → \`POST /cart/add\`
3. Checks out → \`POST /checkout\`
4. Payment → \`POST /payment/process\`

**Technologies:**
- HTTP/2 for faster page loads
- HTTPS for secure transactions
- Cookies for session management

### 2. REST API (Twitter API)

**HTTP Flow:**
\`\`\`http
GET /api/v2/tweets/123456
Authorization: Bearer token123
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123456",
  "text": "Hello, World!",
  "created_at": "2026-02-21T10:00:00Z"
}
\`\`\`

### 3. Content Delivery (Netflix)

**HTTP Flow:**
1. User requests video → \`GET /video/movie123\`
2. Server streams content → Chunked transfer encoding
3. HTTP/2 multiplexing for multiple segments

---

## HTTP Request Structure Overview

An HTTP request consists of:

1. **Request Line**: Method, URL, HTTP version
2. **Headers**: Metadata about the request
3. **Body**: Optional data (for POST, PUT, etc.)

**Example:**
\`\`\`http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

---

## HTTP Response Structure Overview

An HTTP response consists of:

1. **Status Line**: HTTP version, status code, status message
2. **Headers**: Metadata about the response
3. **Body**: The actual content

**Example:**
\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156
Cache-Control: max-age=3600

{
  "id": 123,
  "name": "Dattu p",
  "email": " Dattu@example.com"
}
\`\`\`

---

## Performance Considerations

### HTTP/1.1 Optimizations

1. **Connection Pooling**: Reuse connections
2. **Compression**: Gzip/Brotli for responses
3. **Caching**: Use cache headers effectively
4. **CDN**: Distribute content geographically

### HTTP/2 Benefits

1. **Multiplexing**: Load multiple resources simultaneously
2. **Header Compression**: Reduce overhead
3. **Server Push**: Preload critical resources

### HTTP/3 Advantages

1. **QUIC**: Faster connection setup
2. **Better Mobile**: Handles network switching
3. **Lower Latency**: Especially on poor networks

---

## Security Considerations

### Why HTTPS is Essential

1. **Data Encryption**: Protects sensitive information
2. **Authentication**: Verifies server identity
3. **Integrity**: Prevents data tampering
4. **SEO Benefits**: Google favors HTTPS sites

### Common HTTP Security Issues

1. **Man-in-the-Middle Attacks**: Without HTTPS, data can be intercepted
2. **Session Hijacking**: Cookies sent over HTTP can be stolen
3. **Data Leakage**: Sensitive data in URLs or headers

---

## Industry Examples

### Amazon

- **HTTP/2**: Used for faster page loads
- **HTTPS**: All pages encrypted
- **CDN**: CloudFront for global distribution
- **Result**: 20% faster page loads, better user experience

### Netflix

- **HTTP/2**: Streaming multiple video segments
- **Adaptive Streaming**: Adjusts quality based on connection
- **CDN**: Global content distribution
- **Result**: Smooth streaming even on slow connections

### Google

- **HTTP/3**: Testing on YouTube and other services
- **QUIC Protocol**: Better mobile experience
- **Result**: 30-50% latency reduction on mobile networks

---

## Summary

HTTP is the foundation of web communication:

- **Definition**: HyperText Transfer Protocol for web communication
- **Evolution**: HTTP/1.0 → HTTP/1.1 → HTTP/2 → HTTP/3
- **Architecture**: Client-server model with request-response cycle
- **Stateless**: Each request is independent (state managed via cookies/sessions)
- **Security**: HTTPS encrypts data in transit
- **Performance**: HTTP/2 and HTTP/3 provide significant speed improvements

Understanding HTTP is essential for:
- Building web applications
- Creating REST APIs
- Optimizing website performance
- Debugging network issues
- Implementing security best practices

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between HTTP and HTTPS?

**HTTP** is unencrypted, while **HTTPS** uses TLS/SSL encryption. HTTPS protects data from interception and is required for secure transactions. Modern browsers flag HTTP sites as "not secure."

### 2. Why is HTTP stateless?

HTTP is stateless for **scalability and simplicity**. Servers don't need to maintain client state, making it easier to scale horizontally. State is managed through cookies, sessions, or tokens sent with each request.

### 3. What is the difference between HTTP/1.1 and HTTP/2?

**HTTP/2** introduces multiplexing (multiple requests over one connection), header compression, and server push. This results in faster page loads and better performance compared to HTTP/1.1.

### 4. Should I use HTTP/3?

**HTTP/3** is beneficial for:
- Mobile applications (better network switching)
- Poor network conditions (lower latency)
- Real-time applications

However, adoption is still growing, and HTTP/2 is sufficient for most use cases.

### 5. How does HTTP handle authentication?

HTTP uses headers like \`Authorization\` for authentication. Common methods include:
- **Basic Auth**: Username/password in header
- **Bearer Tokens**: JWT tokens
- **API Keys**: Custom authentication tokens

### 6. What is the default HTTP port?

- **HTTP**: Port 80
- **HTTPS**: Port 443

These are the standard ports, though applications can use other ports.

### 7. Can HTTP work without the internet?

HTTP requires a network connection (TCP/IP). However, you can use HTTP on:
- **Localhost**: \`http://localhost:8080\`
- **Local Network**: \`http://192.168.1.100:8080\`
- **Intranet**: Within a private network

### 8. What happens if an HTTP request fails?

If a request fails, the server returns an error status code (4xx for client errors, 5xx for server errors). The client can retry the request or display an error message to the user.

### 9. How does HTTP caching work?

HTTP uses headers like \`Cache-Control\`, \`ETag\`, and \`Last-Modified\` to control caching. Browsers cache responses to reduce server load and improve performance.

### 10. Is HTTP still relevant with WebSockets?

**Yes!** HTTP and WebSockets serve different purposes:
- **HTTP**: Request-response model for traditional web pages and APIs
- **WebSockets**: Persistent bidirectional connection for real-time applications

Both are essential in modern web development.
  `,
  code: `// HTTP Introduction - Understanding HTTP Protocol

// Example 1: Basic HTTP Request (Client Side - JavaScript)
async function fetchUserData(userId) {
    try {
        // HTTP GET request
        const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'MyApp/1.0'
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            console.log('User data:', userData);
            return userData;
        } else {
            console.error('HTTP Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Example 2: HTTP POST Request (Client Side)
async function createUser(userData) {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.status === 201) {
            const newUser = await response.json();
            console.log('User created:', newUser);
            return newUser;
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Example 3: HTTP Server (Node.js/Express)
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// HTTP GET endpoint
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    // Simulate database lookup
    const user = {
        id: userId,
        name: 'Dattu p',
        email: ' Dattu@example.com'
    };
    
    // Send HTTP response
    res.status(200).json(user);
});

// HTTP POST endpoint
app.post('/users', (req, res) => {
    const userData = req.body;
    
    // Validate and create user
    const newUser = {
        id: Date.now(),
        ...userData
    };
    
    // Send HTTP 201 Created response
    res.status(201)
        .location(\`/users/\${newUser.id}\`)
        .json(newUser);
});

// Start HTTP server
app.listen(3000, () => {
    console.log('HTTP server running on http://localhost:3000');
});

// Example 4: HTTP Client (Java - Spring Boot)
@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    // HTTP GET request to external API
    @GetMapping("/external-user/{id}")
    public ResponseEntity<User> getExternalUser(@PathVariable String id) {
        String url = "https://api.example.com/users/" + id;
        
        // Make HTTP GET request
        ResponseEntity<User> response = restTemplate.getForEntity(url, User.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        }
        
        return ResponseEntity.status(response.getStatusCode()).build();
    }
    
    // HTTP POST request to external API
    @PostMapping("/external-user")
    public ResponseEntity<User> createExternalUser(@RequestBody UserRequest request) {
        String url = "https://api.example.com/users";
        
        // Make HTTP POST request
        ResponseEntity<User> response = restTemplate.postForEntity(
            url, 
            request, 
            User.class
        );
        
        if (response.getStatusCode() == HttpStatus.CREATED) {
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(response.getBody());
        }
        
        return ResponseEntity.status(response.getStatusCode()).build();
    }
}

// Example 5: HTTP/2 Server Push (Node.js)
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
});

server.on('stream', (stream, headers) => {
    // Main HTML file
    if (headers[':path'] === '/') {
        stream.respond({
            ':status': 200,
            'content-type': 'text/html'
        });
        stream.end('<html><head><link rel="stylesheet" href="/style.css"></head></html>');
        
        // Push CSS file
        stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
            if (err) throw err;
            pushStream.respond({ ':status': 200, 'content-type': 'text/css' });
            pushStream.end('body { margin: 0; }');
        });
    }
});

server.listen(8443);

// Example 6: HTTP Caching Headers
app.get('/api/data', (req, res) => {
    const data = { message: 'Hello, World!' };
    
    // Set cache headers
    res.set({
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'ETag': 'abc123',
        'Last-Modified': new Date().toUTCString()
    });
    
    // Check if client has cached version
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === 'abc123') {
        return res.status(304).end(); // Not Modified
    }
    
    res.json(data);
});

// Example 7: HTTP Authentication
app.get('/api/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = authHeader.substring(7);
    
    // Validate token
    if (isValidToken(token)) {
        res.json({ message: 'Protected data' });
    } else {
        res.status(401).json({ error: 'Invalid token' });
    }
});

function isValidToken(token) {
    // Token validation logic
    return token === 'valid-token-123';
}

// Example 8: HTTP Status Codes
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = findUserById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
    const userData = req.body;
    
    if (!userData.email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    const newUser = createUser(userData);
    res.status(201).json(newUser);
});

// Example 9: HTTP Headers Usage
app.get('/api/data', (req, res) => {
    // Set custom headers
    res.set({
        'X-API-Version': '1.0',
        'X-Request-ID': generateRequestId(),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    res.json({ data: 'example' });
});

// Example 10: HTTP Methods Comparison
// GET - Retrieve data
app.get('/api/users', (req, res) => {
    res.json(getAllUsers());
});

// POST - Create new resource
app.post('/api/users', (req, res) => {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
});

// PUT - Update entire resource
app.put('/api/users/:id', (req, res) => {
    const updatedUser = updateUser(req.params.id, req.body);
    res.json(updatedUser);
});

// PATCH - Partial update
app.patch('/api/users/:id', (req, res) => {
    const updatedUser = partiallyUpdateUser(req.params.id, req.body);
    res.json(updatedUser);
});

// DELETE - Remove resource
app.delete('/api/users/:id', (req, res) => {
    deleteUser(req.params.id);
    res.status(204).end();
});`
};

export default httpIntroduction;

