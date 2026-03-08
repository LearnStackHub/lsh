const springBootSecurity = {
  id: 'spring-boot-security',
  title: 'Spring Boot Security - Authentication and Authorization',
  description: 'Learn how to secure Spring Boot applications with Spring Security - authentication, authorization, JWT tokens, and password encoding',
  content: `
# Spring Boot Security - Authentication and Authorization

Spring Boot Security, built on Spring Security framework, provides comprehensive security features for enterprise Java applications. Security is fundamental for any application handling user data, financial transactions, or sensitive information. Spring Security simplifies implementing authentication (verifying user identity) and authorization (controlling access to resources) in Spring Boot applications.

Enterprise applications across industries utilize Spring Security for protecting REST APIs, web applications, and microservices. Banking systems use it for secure transaction processing, healthcare applications protect patient data, and e-commerce platforms secure customer information. Understanding Spring Security is essential for building secure, production-ready applications.

---

## What is Spring Security?

Spring Security is a framework that provides:
- **Authentication:** Who are you? (Login)
- **Authorization:** What can you do? (Permissions)
- **Protection:** Against common attacks (CSRF, XSS, etc.)

---

## Setting Up Spring Security

### Step 1: Add Dependency

In \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
\`\`\`

### Step 2: Basic Security Configuration

Just adding the dependency enables security! By default:
- All endpoints require authentication
- Default username: \`user\`
- Default password: Generated and shown in console

This is not production-ready. Let's configure it properly.

---

## Basic Security Configuration

### Create Security Configuration Class

\`\`\`java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic();
        
        return http.build();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("password"))
            .roles("USER")
            .build();
        
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin"))
            .roles("ADMIN")
            .build();
        
        return new InMemoryUserDetailsManager(user, admin);
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

**What this does:**
- \`/api/public/**\` - Anyone can access
- \`/api/admin/**\` - Only ADMIN role can access
- All other endpoints - Requires authentication
- Uses HTTP Basic authentication

---

## Password Encoding

Never store passwords in plain text! Always encode them.

### BCrypt Password Encoder

\`\`\`java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// Usage
@Autowired
private PasswordEncoder passwordEncoder;

public void createUser(String username, String rawPassword) {
    String encodedPassword = passwordEncoder.encode(rawPassword);
    // Store encodedPassword in database
}

public boolean checkPassword(String rawPassword, String encodedPassword) {
    return passwordEncoder.matches(rawPassword, encodedPassword);
}
\`\`\`

---

## Custom User Details Service

Instead of in-memory users, load from database:

### User Entity

\`\`\`java
package com.example.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}

enum Role {
    USER, ADMIN
}
\`\`\`

### Custom UserDetailsService

\`\`\`java
package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        Set<GrantedAuthority> authorities = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
            .collect(Collectors.toSet());
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .authorities(authorities)
            .build();
    }
}
\`\`\`

### Update Security Config

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .userDetailsService(userDetailsService)
            .httpBasic();
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

---

## JWT Token Authentication

For REST APIs, JWT (JSON Web Token) is better than Basic Auth.

### Add JWT Dependency

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
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
\`\`\`

### JWT Utility Class

\`\`\`java
package com.example.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    
    @Value("\${jwt.secret}")
    private String secret;
    
    @Value("\${jwt.expiration}")
    private Long expiration;
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}
\`\`\`

### Login Endpoint

\`\`\`java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        
        return ResponseEntity.ok(response);
    }
}
\`\`\`

### JWT Filter

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        
        if (token != null && jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
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

---

## Security Best Practices

1. **Always encode passwords** - Never store plain text
2. **Use HTTPS** - Encrypt data in transit
3. **Validate input** - Prevent injection attacks
4. **Use strong passwords** - Enforce password policies
5. **Limit login attempts** - Prevent brute force
6. **Keep dependencies updated** - Security patches

---

## Key Takeaways

1. Spring Security provides authentication and authorization
2. Use PasswordEncoder to hash passwords
3. Configure security rules in SecurityFilterChain
4. JWT tokens are better for REST APIs
5. Always validate and encode user input
6. Follow security best practices

Security is critical. Don't skip it.

**Related Topics:**
- Build secure REST APIs with [Spring Boot REST API](/tutorial/spring-boot-rest-api)
- Add input validation with [Spring Boot Validation](/tutorial/spring-boot-validation)
- Handle security exceptions with [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)
- Test security with [Spring Boot Testing](/tutorial/spring-boot-testing)
`,
  code: `// Complete Spring Security Example

// 1. Security Configuration
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic();
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// 2. User Entity
package com.example.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}

enum Role {
    USER, ADMIN
}

// 3. Custom UserDetailsService
package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        Set<GrantedAuthority> authorities = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
            .collect(Collectors.toSet());
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .authorities(authorities)
            .build();
    }
}

// Usage:
// 1. Add spring-boot-starter-security dependency
// 2. Configure SecurityConfig
// 3. Implement UserDetailsService
// 4. Use @PreAuthorize for method-level security

---

## Real-World Applications

### Banking and Financial Services
Financial applications use Spring Security extensively for protecting transaction APIs, account management endpoints, and sensitive financial data. Multi-factor authentication, role-based access control, and encryption are critical for financial security.

**Implementation Example:**
- JWT-based authentication for API access
- Role-based authorization (CUSTOMER, BANKER, ADMIN)
- Transaction endpoints protected with specific permissions
- Session management for secure user sessions
- OAuth2 integration for third-party financial services

### Healthcare Systems
Healthcare applications require HIPAA compliance and protect patient data through Spring Security. Authentication ensures only authorized medical staff access patient records, and authorization controls what data each role can view or modify.

**Implementation Example:**
- Role-based access (DOCTOR, NURSE, ADMIN, PATIENT)
- Patient data encryption and secure transmission
- Audit logging for compliance
- Session timeout for security
- Multi-factor authentication for sensitive operations

### E-Commerce Platforms
E-commerce applications use Spring Security to protect customer data, payment processing, and administrative functions. Different security levels for public browsing, customer accounts, and admin operations.

**Implementation Example:**
- Public access for product browsing
- Customer authentication for account management
- Admin authorization for inventory and order management
- Payment API protection with specific roles
- CSRF protection for form submissions

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Default Credentials in Production
**Problem:** Spring Security generates default credentials that are insecure and should never be used in production.

**Solution:** Always configure custom authentication:

\`\`\`java
@Bean
public UserDetailsService userDetailsService() {
    // Configure proper user management
}
\`\`\`

### Mistake 2: Not Using Password Encoding
**Problem:** Storing passwords in plain text is a critical security vulnerability.

**Solution:** Always use BCryptPasswordEncoder:

\`\`\`java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
\`\`\`

### Mistake 3: Overly Permissive Security Configuration
**Problem:** Allowing too much public access exposes sensitive endpoints.

**Solution:** Follow principle of least privilege:

\`\`\`java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
);
\`\`\`

### Mistake 4: Not Handling CSRF Protection
**Problem:** Disabling CSRF protection without understanding the implications.

**Solution:** Keep CSRF enabled for state-changing operations, disable only for stateless APIs:

\`\`\`java
http.csrf(csrf -> csrf.disable());  // Only for stateless REST APIs
\`\`\`

### Mistake 5: Not Using HTTPS
**Problem:** Transmitting credentials over HTTP exposes them to interception.

**Solution:** Always use HTTPS in production, configure Spring Security to require HTTPS:

\`\`\`java
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
    .requiresSecure()
);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is Spring Security and why do I need it?

Spring Security is a comprehensive security framework for Java applications that provides authentication, authorization, and protection against common attacks. You need it because security is not optional - every application handling user data requires protection. Spring Security simplifies implementing security features that would otherwise require significant custom development.

### What's the difference between authentication and authorization?

Authentication verifies who the user is (login process), while authorization determines what the user can do (permissions and roles). Authentication answers "Who are you?" and authorization answers "What are you allowed to do?" Both are essential for secure applications. Spring Security provides comprehensive support for both.

### How does Spring Security work by default?

By default, Spring Security secures all endpoints, requires authentication for all requests, provides a default user (username: "user") with a generated password, and enables CSRF protection. This default configuration is for development only and must be customized for production. Learn about [Spring Boot Configuration](/tutorial/spring-boot-configuration) for customizing security settings.

### What is JWT and how do I use it with Spring Security?

JWT (JSON Web Token) is a stateless authentication mechanism where tokens contain user information. Use JWT with Spring Security by implementing a JWT filter that validates tokens and sets authentication. JWT is ideal for REST APIs and microservices where stateless authentication is preferred. JWT eliminates the need for server-side session storage.

### How do I implement role-based access control?

Implement role-based access control by: (1) defining roles in your user model, (2) configuring SecurityConfig with role-based rules, (3) using @PreAuthorize annotations for method-level security, and (4) checking roles in your code. Spring Security provides comprehensive support for role-based authorization.

### What is password encoding and why is it important?

Password encoding (hashing) converts plain text passwords into irreversible hashes. It's critical because storing plain text passwords allows attackers who gain database access to use those passwords. BCryptPasswordEncoder is the recommended encoder in Spring Security, providing strong, adaptive hashing.

### Can I use Spring Security with REST APIs?

Yes, Spring Security works excellently with REST APIs. For stateless REST APIs, use JWT tokens instead of sessions, disable CSRF (since REST is stateless), and configure authentication filters. Spring Security provides comprehensive support for securing REST endpoints. Learn about [Spring Boot REST API](/tutorial/spring-boot-rest-api) for REST API development.

### What is CSRF protection and when should I disable it?

CSRF (Cross-Site Request Forgery) protection prevents malicious websites from making requests on behalf of authenticated users. Keep CSRF enabled for stateful web applications (forms, sessions). Disable CSRF only for stateless REST APIs that use token-based authentication. Never disable CSRF without understanding the security implications.

### How do I secure specific endpoints?

Secure specific endpoints by configuring SecurityFilterChain with requestMatchers:

\`\`\`java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
);
\`\`\`

### What is OAuth2 and how does it work with Spring Security?

OAuth2 is an authorization framework that allows third-party applications to access user resources without exposing passwords. Spring Security provides OAuth2 support through spring-security-oauth2-client. OAuth2 is commonly used for "Login with Google/Facebook" functionality and API authorization. Learn about OAuth2 for third-party authentication integration.

---

## Key Takeaways

Before proceeding to advanced Spring Boot topics, ensure you understand these security fundamentals:

- **Spring Security provides comprehensive security** for Spring Boot applications
- **Authentication verifies user identity**, while authorization controls access
- **Password encoding is mandatory** - always use BCryptPasswordEncoder
- **Role-based access control** enables fine-grained permission management
- **JWT tokens** provide stateless authentication for REST APIs
- **CSRF protection** should be enabled for stateful applications
- **Security configuration** must be customized for production use
- **HTTPS is essential** for secure data transmission
- **Follow principle of least privilege** when configuring access rules

---

## What's Next?

Now that you understand Spring Boot Security, you're ready to build secure applications:

### Immediate Next Steps

1. **[Spring Boot REST API](/tutorial/spring-boot-rest-api)**: Secure your REST APIs with Spring Security
2. **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: Integrate security with database operations
3. **[Spring Boot Validation](/tutorial/spring-boot-validation)**: Add input validation to secure forms
4. **[Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)**: Handle security exceptions gracefully

### Advanced Topics

- **OAuth2 Integration**: Implement third-party authentication
- **JWT Implementation**: Build stateless authentication with JWT
- **Method-Level Security**: Use @PreAuthorize and @PostAuthorize
- **Security Testing**: Learn to test security configurations
- **Multi-Factor Authentication**: Implement additional security layers

### Related Tutorials

- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Review Spring Boot fundamentals
- **[Spring Framework](/tutorial/spring-introduction)**: Understand the underlying Spring Framework
- **[Spring Boot Configuration](/tutorial/spring-boot-configuration)**: Master application configuration
- **[HTTP Security](/tutorial/https-security)**: Understand web security fundamentals

Spring Security is essential for building secure, production-ready applications. Continue learning about [Spring Boot REST API](/tutorial/spring-boot-rest-api) to see how security integrates with API development.
`,
  practiceQuestions: [
    {
      question: 'Create a SecurityConfig that allows public access to /api/public/** and requires ADMIN role for /api/admin/** endpoints',
      hint: 'Use @Configuration, @EnableWebSecurity, SecurityFilterChain bean with authorizeHttpRequests',
      starterCode: `package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // TODO: Configure security rules
        // TODO: Allow public access to /api/public/**
        // TODO: Require ADMIN role for /api/admin/**
        // TODO: Require authentication for all other requests
        
        return http.build();
    }
}
`
    }
  ]
};

export default springBootSecurity;


