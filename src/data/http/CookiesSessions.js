const cookiesSessions = {
  id: 'cookies-sessions',
  title: 'Cookies & Sessions - State Management in HTTP',
  description: 'Learn cookies, session management, stateless vs stateful authentication, how to set and read cookies, and session security best practices',
  content: `
# Cookies & Sessions — Complete Guide

Since HTTP is stateless, we need mechanisms to maintain state between requests. Cookies and sessions are the primary ways to manage state in web applications, enabling features like user authentication, shopping carts, and personalization.

---

## The Stateless Problem

HTTP is **stateless** - each request is independent. The server doesn't remember previous requests:

\`\`\`
Request 1: GET /login
[Server processes, responds, forgets]

Request 2: GET /dashboard
[Server doesn't know this is same user from Request 1]
\`\`\`

**Problem**: How do we maintain user state (login, preferences, cart)?

**Solution**: Cookies and Sessions

---

## What are Cookies?

**Cookies** are small pieces of data stored in the browser and sent with every request to the same domain.

### Cookie Characteristics

- **Stored in Browser**: Client-side storage
- **Sent Automatically**: Included in every request
- **Domain-Specific**: Only sent to same domain
- **Size Limit**: ~4KB per cookie
- **Expiration**: Can be set to expire

### How Cookies Work

\`\`\`
1. Server sends cookie in response:
   Set-Cookie: sessionId=abc123

2. Browser stores cookie:
   [Browser stores: sessionId=abc123]

3. Browser sends cookie in every request:
   Cookie: sessionId=abc123

4. Server reads cookie:
   [Server identifies user from cookie]
\`\`\`

---

## Setting Cookies

### Server-Side (Response Header)

**Set-Cookie Header:**
\`\`\`http
HTTP/1.1 200 OK
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
\`\`\`

### Cookie Attributes

#### Name and Value

\`\`\`http
Set-Cookie: sessionId=abc123
\`\`\`
- **Name**: \`sessionId\`
- **Value**: \`abc123\`

#### Path

**Purpose**: Which paths the cookie is sent to

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; Path=/
\`\`\`

- \`Path=/\`: Sent to all paths
- \`Path=/api\`: Only sent to /api and subpaths

#### Domain

**Purpose**: Which domains the cookie is sent to

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; Domain=.example.com
\`\`\`

- \`Domain=.example.com\`: Sent to example.com and subdomains
- \`Domain=example.com\`: Only sent to example.com

#### Expires / Max-Age

**Purpose**: When cookie expires

**Expires (Date):**
\`\`\`http
Set-Cookie: sessionId=abc123; Expires=Wed, 21 Feb 2027 10:00:00 GMT
\`\`\`

**Max-Age (Seconds):**
\`\`\`http
Set-Cookie: sessionId=abc123; Max-Age=3600
\`\`\`

- **Session Cookie**: No Expires/Max-Age (deleted when browser closes)
- **Persistent Cookie**: Has Expires/Max-Age (survives browser restart)

#### Secure

**Purpose**: Only send over HTTPS

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; Secure
\`\`\`

**Important**: Always use Secure for sensitive cookies

#### HttpOnly

**Purpose**: Not accessible via JavaScript

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; HttpOnly
\`\`\`

**Benefits**: Prevents XSS attacks from stealing cookies

#### SameSite

**Purpose**: CSRF protection

**Values:**
- \`SameSite=Strict\`: Never send in cross-site requests
- \`SameSite=Lax\`: Send in top-level navigation
- \`SameSite=None\`: Always send (requires Secure)

**Example:**
\`\`\`http
Set-Cookie: sessionId=abc123; SameSite=Strict
\`\`\`

---

## Reading Cookies

### Client-Side (JavaScript)

**Read All Cookies:**
\`\`\`javascript
document.cookie
// Returns: "sessionId=abc123; theme=dark; lang=en"
\`\`\`

**Parse Cookies:**
\`\`\`javascript
function getCookie(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
\`\`\`

**Set Cookie:**
\`\`\`javascript
document.cookie = "theme=dark; Path=/; Max-Age=3600";
\`\`\`

### Server-Side

**Java (Spring Boot):**
\`\`\`java
@GetMapping("/api/data")
public ResponseEntity<Data> getData(@CookieValue("sessionId") String sessionId) {
    // Use sessionId
    User user = sessionService.getUser(sessionId);
    return ResponseEntity.ok(data);
}
\`\`\`

**Node.js (Express):**
\`\`\`javascript
app.get('/api/data', (req, res) => {
    const sessionId = req.cookies.sessionId;
    // Use sessionId
    res.json(data);
});
\`\`\`

---

## What are Sessions?

**Sessions** are server-side storage of user data. The server creates a session and sends a session ID to the client (usually in a cookie).

### Session Flow

\`\`\`
1. User logs in
   → Server creates session
   → Server stores session data
   → Server sends session ID in cookie

2. User makes request
   → Browser sends session ID cookie
   → Server reads session ID
   → Server retrieves session data
   → Server processes request with session data

3. User logs out
   → Server deletes session
   → Server invalidates session ID
\`\`\`

### Session Storage

**Options:**
- **Memory**: Fast but lost on restart
- **Database**: Persistent, scalable
- **Redis**: Fast, distributed
- **File System**: Simple but not scalable

---

## Cookies vs Sessions

### Comparison

| Aspect | Cookies | Sessions |
|--------|---------|----------|
| **Storage** | Browser (client) | Server |
| **Size Limit** | ~4KB | Unlimited |
| **Security** | Can be stolen | More secure |
| **Performance** | Fast (no server lookup) | Slower (server lookup) |
| **Scalability** | Good (stateless) | Requires shared storage |
| **Use Case** | Preferences, tracking | Authentication, sensitive data |

### When to Use Each

**Use Cookies For:**
- User preferences (theme, language)
- Tracking (analytics)
- Non-sensitive data
- Client-side state

**Use Sessions For:**
- User authentication
- Shopping cart
- Sensitive data
- Server-side state

---

## Stateless vs Stateful Authentication

### Stateful (Sessions)

**How it Works:**
\`\`\`
1. User logs in
   → Server creates session
   → Server stores: { sessionId: "abc123", userId: 123 }
   → Server sends: Set-Cookie: sessionId=abc123

2. User requests /dashboard
   → Browser sends: Cookie: sessionId=abc123
   → Server looks up session
   → Server finds: userId: 123
   → Server processes request
\`\`\`

**Pros:**
- Easy to invalidate (delete session)
- Server controls session
- Can store large data

**Cons:**
- Requires server storage
- Not scalable (needs shared storage)
- Server must look up session

### Stateless (Tokens)

**How it Works:**
\`\`\`
1. User logs in
   → Server creates JWT token
   → Token contains: { userId: 123, exp: ... }
   → Server sends: Set-Cookie: token=eyJhbGc...

2. User requests /dashboard
   → Browser sends: Cookie: token=eyJhbGc...
   → Server validates token (no lookup needed)
   → Server extracts: userId: 123
   → Server processes request
\`\`\`

**Pros:**
- Scalable (no server storage)
- Fast (no lookup)
- Works across servers

**Cons:**
- Hard to invalidate (token valid until expiry)
- Token size limit
- Must validate on every request

---

## Real-World Examples

### Example 1: Login with Session

**Step 1: User Logs In**
\`\`\`http
POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": " Dattu",
  "password": "secret123"
}
\`\`\`

**Step 2: Server Response**
\`\`\`http
HTTP/1.1 200 OK
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict

{
  "message": "Login successful"
}
\`\`\`

**Step 3: Subsequent Requests**
\`\`\`http
GET /api/dashboard HTTP/1.1
Cookie: sessionId=abc123
\`\`\`

**Step 4: Server Processes**
\`\`\`java
String sessionId = request.getCookie("sessionId");
Session session = sessionStore.get(sessionId);
User user = session.getUser();
// Process request with user
\`\`\`

### Example 2: Shopping Cart with Session

**Add to Cart:**
\`\`\`java
@PostMapping("/api/cart/add")
public ResponseEntity<Void> addToCart(
    @CookieValue("sessionId") String sessionId,
    @RequestBody CartItem item
) {
    Session session = sessionStore.get(sessionId);
    Cart cart = session.getCart();
    cart.addItem(item);
    return ResponseEntity.ok().build();
}
\`\`\`

**View Cart:**
\`\`\`java
@GetMapping("/api/cart")
public ResponseEntity<Cart> getCart(@CookieValue("sessionId") String sessionId) {
    Session session = sessionStore.get(sessionId);
    Cart cart = session.getCart();
    return ResponseEntity.ok(cart);
}
\`\`\`

### Example 3: User Preferences with Cookies

**Set Preference:**
\`\`\`javascript
// Client-side
document.cookie = "theme=dark; Path=/; Max-Age=31536000"; // 1 year
document.cookie = "lang=en; Path=/; Max-Age=31536000";
\`\`\`

**Read Preference:**
\`\`\`javascript
const theme = getCookie("theme"); // "dark"
const lang = getCookie("lang");   // "en"
\`\`\`

---

## Security Best Practices

### 1. Use HttpOnly for Session Cookies

**Prevents XSS attacks:**
\`\`\`http
Set-Cookie: sessionId=abc123; HttpOnly
\`\`\`

**Why**: JavaScript cannot access cookie, preventing XSS theft

### 2. Use Secure Flag

**Only send over HTTPS:**
\`\`\`http
Set-Cookie: sessionId=abc123; Secure
\`\`\`

**Why**: Prevents interception over unencrypted connections

### 3. Use SameSite Attribute

**CSRF protection:**
\`\`\`http
Set-Cookie: sessionId=abc123; SameSite=Strict
\`\`\`

**Why**: Prevents cross-site request forgery attacks

### 4. Set Appropriate Expiration

**Don't make sessions too long:**
\`\`\`http
Set-Cookie: sessionId=abc123; Max-Age=3600  // 1 hour
\`\`\`

**Why**: Limits exposure if cookie is stolen

### 5. Regenerate Session ID

**After login:**
\`\`\`java
// Generate new session ID after successful login
String newSessionId = generateSessionId();
sessionStore.create(newSessionId, user);
response.addCookie(new Cookie("sessionId", newSessionId));
\`\`\`

**Why**: Prevents session fixation attacks

### 6. Validate Session on Every Request

**Always check session:**
\`\`\`java
String sessionId = request.getCookie("sessionId");
if (sessionId == null || !sessionStore.exists(sessionId)) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
\`\`\`

**Why**: Ensures session is still valid

---

## Common Issues

### 1. Cookie Not Sent

**Causes:**
- Wrong domain/path
- Secure flag on HTTP
- SameSite blocking

**Solution**: Check cookie attributes match request

### 2. Session Expired

**Causes:**
- Session timeout
- Server restart (if in-memory)
- Session deleted

**Solution**: Implement session refresh or re-authentication

### 3. Cookie Size Limit

**Problem**: Cookie too large (>4KB)

**Solution**: Store data in session, only send session ID in cookie

### 4. Cross-Domain Cookies

**Problem**: Cookies not shared across domains

**Solution**: Use subdomains or token-based authentication

---

## Industry Examples

### Amazon

**Uses:**
- Session cookies for authentication
- Preference cookies for settings
- Tracking cookies for analytics

**Implementation:**
- HttpOnly, Secure, SameSite
- Session stored in distributed cache
- Auto-refresh on activity

### GitHub

**Uses:**
- Session-based authentication
- Secure cookies
- Session timeout

**Implementation:**
- Redis for session storage
- Secure, HttpOnly cookies
- 30-day expiration

### Google

**Uses:**
- Multiple cookies for different services
- Preference cookies
- Analytics cookies

**Implementation:**
- Domain-specific cookies
- Secure, HttpOnly for sensitive data
- Long expiration for preferences

---

## Summary

Cookies and sessions enable state management in stateless HTTP:

- **Cookies**: Client-side storage, sent with every request
- **Sessions**: Server-side storage, identified by session ID in cookie
- **Stateless**: Tokens (JWT) - no server storage
- **Stateful**: Sessions - server stores state

**Important points:**
- Use HttpOnly, Secure, SameSite for security
- Set appropriate expiration
- Validate sessions on every request
- Use sessions for sensitive data, cookies for preferences
- Consider stateless tokens for scalability

Understanding cookies and sessions is essential for:
- User authentication
- State management
- Shopping carts
- Personalization
- Security implementation

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between cookies and sessions?

**Cookies** are stored in the browser (client-side). **Sessions** are stored on the server. Sessions use a cookie to store the session ID.

### 2. Are cookies secure?

Cookies can be secure if you use:
- **HttpOnly**: Prevents JavaScript access
- **Secure**: Only sent over HTTPS
- **SameSite**: CSRF protection

### 3. How long should sessions last?

**Depends on use case:**
- Banking: 15-30 minutes
- E-commerce: 1-2 hours
- Social media: Days to weeks
- Always implement auto-logout on inactivity

### 4. Can I store sensitive data in cookies?

**Not recommended**. Store sensitive data in sessions (server-side). Only store session ID or non-sensitive preferences in cookies.

### 5. What happens if a cookie is stolen?

If a cookie is stolen:
- Attacker can impersonate user
- **Mitigation**: Use HttpOnly, Secure, short expiration
- **Detection**: Monitor for unusual activity
- **Response**: Invalidate session immediately

### 6. How do I implement "Remember Me"?

**Option 1**: Long-lived cookie with secure token
**Option 2**: Persistent session with longer expiration

Always use secure tokens, not passwords.

### 7. What is session fixation?

**Session fixation** is when an attacker forces a user to use a known session ID. **Prevention**: Regenerate session ID after login.

### 8. Can I use sessions in a distributed system?

**Yes**, but you need shared storage:
- **Redis**: Fast, distributed
- **Database**: Persistent, scalable
- **Not**: In-memory (lost on restart)

### 9. What is the difference between SameSite Strict and Lax?

**Strict**: Never send in cross-site requests (most secure)
**Lax**: Send in top-level navigation (better UX, still secure)

### 10. How do I invalidate a session?

**For sessions**: Delete from server storage
**For tokens**: Hard to invalidate (must wait for expiry or use blacklist)

This is why sessions are better for logout functionality.
  `,
  code: `// Cookies & Sessions - Complete Examples

// Example 1: Setting Cookie (Java - Spring Boot)
@PostMapping("/api/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
    User user = userService.authenticate(request);
    
    // Create session
    String sessionId = UUID.randomUUID().toString();
    sessionStore.create(sessionId, user);
    
    // Set cookie
    ResponseCookie cookie = ResponseCookie.from("sessionId", sessionId)
        .path("/")
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .maxAge(Duration.ofHours(1))
        .build();
    
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(Map.of("message", "Login successful"));
}

// Example 2: Reading Cookie (Java)
@GetMapping("/api/dashboard")
public ResponseEntity<Dashboard> getDashboard(
    @CookieValue("sessionId") String sessionId
) {
    Session session = sessionStore.get(sessionId);
    if (session == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    User user = session.getUser();
    Dashboard dashboard = dashboardService.getDashboard(user.getId());
    return ResponseEntity.ok(dashboard);
}

// Example 3: Session Management (Java)
@Service
public class SessionService {
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    
    public String createSession(User user) {
        String sessionId = UUID.randomUUID().toString();
        Session session = new Session(user, Instant.now());
        sessions.put(sessionId, session);
        return sessionId;
    }
    
    public Session getSession(String sessionId) {
        Session session = sessions.get(sessionId);
        if (session == null || session.isExpired()) {
            return null;
        }
        return session;
    }
    
    public void invalidateSession(String sessionId) {
        sessions.remove(sessionId);
    }
    
    public void cleanupExpiredSessions() {
        sessions.entrySet().removeIf(entry -> entry.getValue().isExpired());
    }
}

// Example 4: Cookie Utility (JavaScript)
class CookieUtil {
    static set(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = \`\${name}=\${value};expires=\${expires.toUTCString()};path=/\`;
    }
    
    static get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    static delete(name) {
        document.cookie = \`\${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/\`;
    }
}

// Usage
CookieUtil.set("theme", "dark", 365);
const theme = CookieUtil.get("theme");
CookieUtil.delete("theme");

// Example 5: Session with Redis (Java - Spring Boot)
@Service
public class RedisSessionService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public String createSession(User user) {
        String sessionId = UUID.randomUUID().toString();
        Session session = new Session(user, Instant.now());
        redisTemplate.opsForValue().set(
            "session:" + sessionId, 
            session, 
            Duration.ofHours(1)
        );
        return sessionId;
    }
    
    public Session getSession(String sessionId) {
        return (Session) redisTemplate.opsForValue().get("session:" + sessionId);
    }
    
    public void invalidateSession(String sessionId) {
        redisTemplate.delete("session:" + sessionId);
    }
}

// Example 6: Shopping Cart with Session (Java)
@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private SessionService sessionService;
    
    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(
        @CookieValue("sessionId") String sessionId,
        @RequestBody CartItem item
    ) {
        Session session = sessionService.getSession(sessionId);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Cart cart = session.getCart();
        cart.addItem(item);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping
    public ResponseEntity<Cart> getCart(@CookieValue("sessionId") String sessionId) {
        Session session = sessionService.getSession(sessionId);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return ResponseEntity.ok(session.getCart());
    }
}

// Example 7: Logout (Java)
@PostMapping("/api/logout")
public ResponseEntity<Map<String, String>> logout(@CookieValue("sessionId") String sessionId) {
    sessionService.invalidateSession(sessionId);
    
    // Clear cookie
    ResponseCookie cookie = ResponseCookie.from("sessionId", "")
        .path("/")
        .httpOnly(true)
        .secure(true)
        .maxAge(0)
        .build();
    
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(Map.of("message", "Logged out"));
}

// Example 8: Session Interceptor (Java)
@Component
public class SessionInterceptor implements HandlerInterceptor {
    
    @Autowired
    private SessionService sessionService;
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) {
        String sessionId = getCookieValue(request, "sessionId");
        
        if (sessionId == null || sessionService.getSession(sessionId) == null) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }
        
        return true;
    }
    
    private String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}

// Example 9: Node.js - Express Sessions
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    }
}));

app.post('/api/login', (req, res) => {
    // Authenticate user
    const user = authenticateUser(req.body);
    
    // Store in session
    req.session.userId = user.id;
    req.session.save();
    
    res.json({ message: 'Login successful' });
});

app.get('/api/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const dashboard = getDashboard(req.session.userId);
    res.json(dashboard);
});

// Example 10: Cookie Security Check
public class CookieSecurityValidator {
    public boolean isSecure(Cookie cookie) {
        // Check HttpOnly
        if (!cookie.isHttpOnly()) {
            return false;
        }
        
        // Check Secure (should be true in production)
        if (!cookie.getSecure() && !isDevelopment()) {
            return false;
        }
        
        // Check SameSite
        String sameSite = cookie.getAttribute("SameSite");
        if (sameSite == null || sameSite.equals("None")) {
            return false;
        }
        
        return true;
    }
}`
};

export default cookiesSessions;

