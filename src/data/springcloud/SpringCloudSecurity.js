const springCloudSecurity = {
  id: 'spring-cloud-security',
  title: 'Security in Microservices - JWT and OAuth2',
  description: 'Learn how to implement security in microservices with JWT authentication, OAuth2, securing API Gateway, role-based authorization, and token validation across services',
  content: `
# Security in Microservices - JWT and OAuth2

In microservices, you can't use session-based authentication (services are stateless). JWT (JSON Web Token) provides stateless authentication that works across services.

Let me explain how to implement security in microservices.

---

## Stateless Authentication

### Why Stateless?

In a monolith, you can use sessions:
- User logs in
- Server creates session
- Session stored in server memory
- Subsequent requests include session ID

**Problem in Microservices:**
- Services are stateless
- Can't share session state
- Each service is independent
- Need stateless authentication

### Solution: JWT

JWT (JSON Web Token) is a stateless authentication mechanism:
- Token contains user information
- Services validate token independently
- No need to store sessions
- Works across services

---

## JWT Structure

JWT has three parts separated by dots:

\`\`\`
header.payload.signature
\`\`\`

### Header

Contains token type and algorithm:

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

**Explanation:**
- alg: Algorithm used to sign (HS256 = HMAC SHA-256)
- typ: Type of token (JWT)

### Payload

Contains claims (user information):

\`\`\`json
{
  "sub": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["USER", "ADMIN"],
  "iat": 1642234567,
  "exp": 1642320967
}
\`\`\`

**Common Claims:**
- sub: Subject (user ID)
- name: User's name
- email: User's email
- roles: User roles
- iat: Issued at (timestamp)
- exp: Expiration (timestamp)

### Signature

Created by signing header and payload with a secret:

\`\`\`
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
\`\`\`

**How It Works:**
1. Server creates header and payload
2. Server signs with secret key
3. Server sends token to client
4. Client includes token in requests
5. Server validates signature

---

## OAuth2 Fundamentals

OAuth2 is an authorization framework. It allows applications to access resources on behalf of users.

### Key Concepts

**Resource Owner:**
The user who owns the resources.

**Client:**
Application requesting access (your frontend, mobile app).

**Authorization Server:**
Issues tokens (your authentication service).

**Resource Server:**
Protected resources (your microservices).

### OAuth2 Flow

1. User logs in
2. Authorization server validates credentials
3. Authorization server issues access token (JWT)
4. Client uses token to access resources
5. Resource server validates token
6. Resource server grants access

---

## JWT Authentication in Microservices

Let's implement JWT authentication step by step.

### Step 1: Add Dependencies

\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
\`\`\`

### Step 2: Create JWT Service

\`\`\`java
package com.example.authservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    
    @Value("\${jwt.secret}")
    private String secret;
    
    @Value("\${jwt.expiration}")
    private long expiration; // in milliseconds
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
\`\`\`

### Step 3: Create JWT Filter

\`\`\`java
package com.example.authservice.filter;

import com.example.authservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        
        if (token != null && jwtService.validateToken(token, 
            userDetailsService.loadUserByUsername(jwtService.extractUsername(token)))) {
            
            UserDetails userDetails = userDetailsService.loadUserByUsername(
                jwtService.extractUsername(token)
            );
            
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
\`\`\`

### Step 4: Configure Security

\`\`\`java
package com.example.authservice.config;

import com.example.authservice.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
\`\`\`

---

## Securing API Gateway

Add JWT validation filter to API Gateway:

\`\`\`java
package com.example.gateway.filter;

import com.example.gateway.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class GatewayAuthFilter implements GatewayFilter, Ordered {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String token = extractToken(request);
        
        if (token == null || !jwtService.validateToken(token)) {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
        
        // Add user info to headers for downstream services
        String username = jwtService.extractUsername(token);
        ServerHttpRequest modifiedRequest = request.mutate()
            .header("X-User-Id", username)
            .build();
        
        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }
    
    private String extractToken(ServerHttpRequest request) {
        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    
    @Override
    public int getOrder() {
        return -100; // High priority
    }
}
\`\`\`

**Apply to Routes:**

\`\`\`properties
spring.cloud.gateway.routes[0].filters[0]=GatewayAuthFilter
\`\`\`

---

## Role-Based Authorization

### Method-Level Security

\`\`\`java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userService.getAllUsers();
}

@PreAuthorize("hasRole('USER')")
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.getUser(id);
}
\`\`\`

### Extract Roles from JWT

\`\`\`java
@Service
public class JwtService {
    
    public List<String> extractRoles(String token) {
        Claims claims = extractAllClaims(token);
        return (List<String>) claims.get("roles");
    }
}
\`\`\`

---

## Token Validation Across Services

Each service validates the JWT token independently. No need to call an authentication service for every request.

### Shared Secret

All services use the same secret to validate tokens. Store it in Config Server:

\`\`\`properties
jwt.secret=your-secret-key-should-be-long-and-secure-at-least-256-bits
jwt.expiration=86400000
\`\`\`

**Problem:** If secret is compromised, all services are affected.

### Public Key (Better Approach)

Use asymmetric encryption (RS256):
- Authorization server signs with private key
- Services validate with public key

**Benefits:**
- Private key stays secure
- Public key can be shared
- Better security

---

## Refresh Tokens

Access tokens expire quickly (15 minutes). Refresh tokens last longer (7 days). Use refresh token to get new access token:

### Implementation

\`\`\`java
@PostMapping("/auth/refresh")
public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
    String refreshToken = request.getRefreshToken();
    
    if (isValidRefreshToken(refreshToken)) {
        String username = extractUsernameFromRefreshToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        String newAccessToken = jwtService.generateToken(userDetails);
        
        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken));
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
\`\`\`

---

## Keycloak Integration (Optional Advanced Topic)

Keycloak is an open-source identity and access management solution.

**Features:**
- User management
- OAuth2/OIDC server
- Social login (Google, Facebook, etc.)
- Multi-factor authentication
- Single Sign-On (SSO)

**When to Use:**
- Complex authentication requirements
- Multiple applications
- Need SSO
- Enterprise features needed

---

## Real-World Example

Complete authentication flow:

**1. User Login:**

\`\`\`java
@PostMapping("/auth/login")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getUsername(),
            request.getPassword()
        )
    );
    
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String token = jwtService.generateToken(userDetails);
    
    return ResponseEntity.ok(new AuthResponse(token));
}
\`\`\`

**2. Client Uses Token:**

\`\`\`javascript
// Frontend
fetch('http://api-gateway/api/users', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
\`\`\`

**3. Services Validate Token:**

Each service validates token independently using the same secret.

---

## Best Practices

### 1. Use Strong Secrets

Secrets should be at least 256 bits long. Generate securely:

\`\`\`bash
openssl rand -base64 32
\`\`\`

### 2. Set Appropriate Expiration

- Access tokens: 15 minutes to 1 hour
- Refresh tokens: 7 to 30 days

### 3. Store Secrets Securely

Use Config Server or environment variables. Never commit secrets to code.

### 4. Use HTTPS

Always use HTTPS in production to protect tokens in transit.

### 5. Validate Tokens Early

Validate tokens in API Gateway to reject invalid requests early.

---

## Summary

Security in microservices requires:

**Key Concepts:**
- Stateless authentication with JWT
- Token validation across services
- Role-based authorization
- API Gateway security

**Benefits:**
- Works across stateless services
- No session management needed
- Scalable
- Secure

**What's Next?**

Now that you understand security:

1. Set up [Config Server](/tutorial/spring-cloud-config-server) to store secrets
2. Learn [API Gateway](/tutorial/spring-cloud-api-gateway) for centralized security
3. Master [Service Discovery](/tutorial/spring-cloud-eureka) for service location
4. Use [Distributed Tracing](/tutorial/spring-cloud-distributed-tracing) to track requests
`,
  code: `// JWT Service
package com.example.authservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    
    @Value("\${jwt.secret}")
    private String secret;
    
    @Value("\${jwt.expiration}")
    private long expiration;
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}`
};

export default springCloudSecurity;

