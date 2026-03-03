const authenticationAuthorization = {
  id: 'authentication-authorization',
  title: 'Authentication & Authorization - API Security',
  description: 'Learn API authentication and authorization: Basic Auth, API Keys, JWT tokens, OAuth 2.0, role-based access control, and security best practices',
  content: `
# Authentication & Authorization — Complete Guide

Authentication and authorization are critical for API security. Understanding different methods (Basic Auth, API Keys, JWT, OAuth 2.0) and when to use each is essential for building secure APIs.

---

## Authentication vs Authorization

### Authentication

**"Who are you?"** - Verifying user identity

**Examples:**
- Username/password login
- Token validation
- Biometric verification

### Authorization

**"What can you do?"** - Determining permissions

**Examples:**
- Role-based access (admin, user)
- Resource permissions (read, write, delete)
- Feature access

### Relationship

\`\`\`
Authentication → Authorization
(Who you are) → (What you can do)
\`\`\`

**Flow:**
1. **Authenticate**: Verify user identity
2. **Authorize**: Check permissions
3. **Access**: Grant or deny

---

## Authentication Methods

### 1. Basic Authentication

**Simple username/password** authentication

**How it Works:**
\`\`\`
Username:Password → Base64 Encode → Authorization Header
\`\`\`

**Request:**
\`\`\`http
GET /api/users HTTP/1.1
Authorization: Basic base64(username:password)
\`\`\`

**Example:**
\`\`\`http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
\`\`\`

**Pros:**
- Simple to implement
- Widely supported
- HTTP standard

**Cons:**
- Credentials in every request
- Base64 is not encryption (easily decoded)
- No expiration
- Not secure over HTTP

**Use Cases:**
- Internal APIs
- Simple applications
- Development/testing

**Implementation:**
\`\`\`java
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("Authorization") String authHeader
) {
    if (authHeader == null || !authHeader.startsWith("Basic ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    String credentials = new String(Base64.getDecoder().decode(
        authHeader.substring(6)
    ));
    String[] parts = credentials.split(":");
    String username = parts[0];
    String password = parts[1];
    
    if (authService.authenticate(username, password)) {
        return ResponseEntity.ok(dataService.getData());
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
\`\`\`

---

### 2. API Keys

**Simple token-based** authentication

**How it Works:**
\`\`\`
Client → API Key in Header → Server validates key
\`\`\`

**Request:**
\`\`\`http
GET /api/data HTTP/1.1
X-API-Key: your-api-key-here
\`\`\`

**Or:**
\`\`\`http
Authorization: ApiKey your-api-key-here
\`\`\`

**Pros:**
- Simple
- Easy to implement
- Good for server-to-server

**Cons:**
- Key can be stolen
- No expiration (unless managed)
- Hard to revoke

**Use Cases:**
- Public APIs
- Server-to-server
- Third-party integrations

**Implementation:**
\`\`\`java
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("X-API-Key") String apiKey
) {
    if (!apiKeyService.isValid(apiKey)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    return ResponseEntity.ok(dataService.getData());
}
\`\`\`

---

### 3. Bearer Tokens (JWT)

**Token-based** authentication with JSON Web Tokens

**How it Works:**
\`\`\`
1. User logs in → Server issues JWT
2. Client stores token
3. Client sends token in requests
4. Server validates token
\`\`\`

**Request:**
\`\`\`http
GET /api/users HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

**JWT Structure:**
\`\`\`
Header.Payload.Signature

Header: Algorithm, token type
Payload: User data, claims, expiration
Signature: Verify token integrity
\`\`\`

**Pros:**
- Stateless (no server storage)
- Scalable
- Contains user data
- Expiration built-in

**Cons:**
- Hard to revoke (must wait for expiry)
- Token size limit
- Must validate on every request

**Use Cases:**
- Modern web apps
- Mobile apps
- Microservices
- Stateless APIs

**Implementation:**
\`\`\`java
@PostMapping("/api/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
    User user = userService.authenticate(request);
    String token = jwtService.generateToken(user);
    return ResponseEntity.ok(Map.of("token", token));
}

@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestHeader("Authorization") String authHeader
) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    String token = authHeader.substring(7);
    if (!jwtService.isValid(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    User user = jwtService.getUserFromToken(token);
    return ResponseEntity.ok(userService.findAll());
}
\`\`\`

---

### 4. OAuth 2.0

**Industry standard** for authorization

**Flow:**
\`\`\`
1. User → Authorization Server (login)
2. Authorization Server → Client (authorization code)
3. Client → Authorization Server (exchange code for token)
4. Authorization Server → Client (access token)
5. Client → Resource Server (use token)
\`\`\`

**Grant Types:**

#### Authorization Code Flow
\`\`\`
User → Auth Server → Code → Client → Token
\`\`\`

#### Client Credentials Flow
\`\`\`
Client → Auth Server → Token (server-to-server)
\`\`\`

#### Implicit Flow (Deprecated)
\`\`\`
User → Auth Server → Token (direct)
\`\`\`

**Pros:**
- Industry standard
- Secure
- Flexible
- Third-party access

**Cons:**
- Complex
- Requires authorization server
- More setup

**Use Cases:**
- Third-party integrations
- Social login
- Enterprise APIs
- Delegated access

---

## Authorization Methods

### 1. Role-Based Access Control (RBAC)

**Roles determine permissions**

**Example:**
\`\`\`
Admin → Full access
User → Limited access
Guest → Read-only
\`\`\`

**Implementation:**
\`\`\`java
@GetMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
}

@DeleteMapping("/api/users/{id}")
@PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and #id == authentication.principal.id)")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
\`\`\`

### 2. Permission-Based Access Control

**Permissions determine access**

**Example:**
\`\`\`
user:read
user:write
user:delete
\`\`\`

**Implementation:**
\`\`\`java
@GetMapping("/api/users")
@PreAuthorize("hasPermission(null, 'user:read')")
public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(userService.findAll());
}
\`\`\`

### 3. Resource-Based Authorization

**Resource ownership determines access**

**Example:**
\`\`\`
User can only access their own resources
\`\`\`

**Implementation:**
\`\`\`java
@GetMapping("/api/users/{id}/posts")
public ResponseEntity<List<Post>> getUserPosts(
    @PathVariable Long id,
    @AuthenticationPrincipal User currentUser
) {
    if (!id.equals(currentUser.getId()) && !currentUser.hasRole("ADMIN")) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    return ResponseEntity.ok(postService.findByUserId(id));
}
\`\`\`

---

## Security Best Practices

### 1. Always Use HTTPS

**Never send credentials over HTTP**

\`\`\`
✅ HTTPS: Encrypted
❌ HTTP: Plain text (vulnerable)
\`\`\`

### 2. Token Expiration

**Set appropriate expiration:**
\`\`\`
Access Token: 15 minutes - 1 hour
Refresh Token: 7-30 days
\`\`\`

### 3. Token Storage

**Client-side:**
- **HttpOnly cookies**: Most secure
- **Memory**: Secure but lost on refresh
- **LocalStorage**: Vulnerable to XSS

**Server-side:**
- Hash tokens
- Store securely
- Implement token rotation

### 4. Password Security

**Best practices:**
- Hash passwords (bcrypt, Argon2)
- Salt passwords
- Enforce strong passwords
- Never store plain text

### 5. Rate Limiting

**Prevent brute force:**
\`\`\`
Login attempts: 5 per minute
API calls: 100 per hour
\`\`\`

---

## Real-World Examples

### Example 1: JWT Authentication Flow

**1. Login:**
\`\`\`http
POST /api/login
{
  "username": "john",
  "password": "secret123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
\`\`\`

**2. Use Token:**
\`\`\`http
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response:
[
  {"id": 1, "name": "User 1"},
  {"id": 2, "name": "User 2"}
]
\`\`\`

### Example 2: Role-Based Authorization

**Admin Access:**
\`\`\`java
@DeleteMapping("/api/users/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
\`\`\`

**User Access:**
\`\`\`java
@GetMapping("/api/profile")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<Profile> getProfile(@AuthenticationPrincipal User user) {
    return ResponseEntity.ok(profileService.getProfile(user.getId()));
}
\`\`\`

---

## Industry Examples

### GitHub API

**Authentication**: Personal Access Tokens, OAuth 2.0

**Authorization**: Scopes (repo, user, admin)

### Stripe API

**Authentication**: API Keys (publishable, secret)

**Authorization**: Permissions based on key type

### Google APIs

**Authentication**: OAuth 2.0

**Authorization**: Scopes (read, write, admin)

---

## Summary

Authentication and authorization:

- **Authentication**: Verify identity (Basic, API Keys, JWT, OAuth)
- **Authorization**: Control access (RBAC, Permissions, Resource-based)
- **Security**: HTTPS, token expiration, password hashing, rate limiting

**Important points:**
- Use JWT for modern stateless APIs
- Implement role-based authorization
- Always use HTTPS
- Set token expiration
- Hash passwords properly
- Implement rate limiting

Understanding auth is essential for:
- Building secure APIs
- Protecting user data
- Controlling access
- Meeting security requirements
- Enabling third-party integrations

---

## Frequently Asked Questions (FAQs)

### 1. What is the difference between authentication and authorization?

**Authentication** verifies who you are (login). **Authorization** determines what you can do (permissions).

### 2. Which authentication method should I use?

**JWT** for modern stateless APIs. **OAuth 2.0** for third-party access. **API Keys** for server-to-server. **Basic Auth** for simple internal APIs.

### 3. How do I secure JWT tokens?

**Use HTTPS**, set expiration, use refresh tokens, validate on every request, store securely (HttpOnly cookies).

### 4. What is OAuth 2.0?

**OAuth 2.0** is authorization framework for delegated access. Allows third parties to access resources without sharing credentials.

### 5. How do I implement role-based access?

**Use annotations** like \`@PreAuthorize("hasRole('ADMIN')")\` or check roles in code. Store roles in token or database.

### 6. Should I store tokens in localStorage?

**Not recommended** for sensitive tokens (vulnerable to XSS). Use **HttpOnly cookies** or **memory** for better security.

### 7. How do I handle token expiration?

**Use refresh tokens**. When access token expires, use refresh token to get new access token without re-login.

### 8. What is the difference between access token and refresh token?

**Access token**: Short-lived (15 min - 1 hour), used for API calls. **Refresh token**: Long-lived (days), used to get new access tokens.

### 9. How do I revoke JWT tokens?

**Hard to revoke** (stateless). Options: Short expiration, token blacklist, or use sessions instead.

### 10. Should I use Basic Auth for production?

**Not recommended** for production. Use JWT or OAuth 2.0. Basic Auth is acceptable for internal APIs over HTTPS.
  `,
  code: `// Authentication & Authorization - Complete Examples

// Example 1: Basic Authentication (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("Authorization") String authHeader
) {
    if (authHeader == null || !authHeader.startsWith("Basic ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    String credentials = new String(Base64.getDecoder().decode(
        authHeader.substring(6)
    ));
    String[] parts = credentials.split(":");
    String username = parts[0];
    String password = parts[1];
    
    if (authService.authenticate(username, password)) {
        return ResponseEntity.ok(dataService.getData());
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}

// Example 2: API Key Authentication (Java)
@GetMapping("/api/data")
public ResponseEntity<Data> getData(
    @RequestHeader("X-API-Key") String apiKey
) {
    if (!apiKeyService.isValid(apiKey)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    return ResponseEntity.ok(dataService.getData());
}

// Example 3: JWT Authentication (Java)
@PostMapping("/api/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
    User user = userService.authenticate(request);
    String token = jwtService.generateToken(user);
    return ResponseEntity.ok(Map.of("token", token));
}

@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestHeader("Authorization") String authHeader
) {
    String token = extractToken(authHeader);
    if (!jwtService.isValid(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    return ResponseEntity.ok(userService.findAll());
}

// Example 4: Role-Based Authorization (Java)
@GetMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
}

@DeleteMapping("/api/users/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}

// Example 5: Permission-Based Authorization (Java)
@GetMapping("/api/users")
@PreAuthorize("hasPermission(null, 'user:read')")
public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(userService.findAll());
}

@PostMapping("/api/users")
@PreAuthorize("hasPermission(null, 'user:write')")
public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}

// Example 6: Resource-Based Authorization (Java)
@GetMapping("/api/users/{id}/posts")
public ResponseEntity<List<Post>> getUserPosts(
    @PathVariable Long id,
    @AuthenticationPrincipal User currentUser
) {
    if (!id.equals(currentUser.getId()) && !currentUser.hasRole("ADMIN")) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    return ResponseEntity.ok(postService.findByUserId(id));
}

// Example 7: JWT Service (Java)
@Service
public class JwtService {
    private final String secret = "your-secret-key";
    private final long expiration = 3600000; // 1 hour
    
    public String generateToken(User user) {
        return Jwts.builder()
            .setSubject(user.getUsername())
            .claim("userId", user.getId())
            .claim("roles", user.getRoles())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
    
    public boolean isValid(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
    
    public User getUserFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        
        return userService.findById((Long) claims.get("userId"));
    }
}

// Example 8: Authentication Filter (Java)
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.isValid(token)) {
                User user = jwtService.getUserFromToken(token);
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}

// Example 9: Password Hashing (Java)
@Service
public class PasswordService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    
    public String hashPassword(String password) {
        return encoder.encode(password);
    }
    
    public boolean matches(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}

// Example 10: Rate Limiting for Authentication (Java)
@Component
public class LoginRateLimiter {
    private final Map<String, List<Long>> attempts = new ConcurrentHashMap<>();
    private static final int MAX_ATTEMPTS = 5;
    private static final long WINDOW_MS = 60000; // 1 minute
    
    public boolean isAllowed(String username) {
        long now = System.currentTimeMillis();
        List<Long> userAttempts = attempts.computeIfAbsent(username, k -> new ArrayList<>());
        
        userAttempts.removeIf(time -> now - time > WINDOW_MS);
        
        if (userAttempts.size() >= MAX_ATTEMPTS) {
            return false;
        }
        
        userAttempts.add(now);
        return true;
    }
}`
};

export default authenticationAuthorization;

