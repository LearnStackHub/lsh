const apiSecurityBestPractices = {
  id: 'api-security-best-practices',
  title: 'API Security Best Practices - Input Validation, SQL Injection, XSS',
  description: 'Learn API security best practices: input validation, SQL injection prevention, XSS prevention, CSRF protection, and comprehensive security guidelines',
  content: `
# API Security Best Practices — Complete Guide

API security is critical for protecting data and systems. Understanding security threats (SQL injection, XSS, CSRF) and implementing best practices is essential for building secure APIs.

---

## Security Threats

### 1. SQL Injection

**Attack**: Malicious SQL in user input

**Example:**
\`\`\`
Input: ' OR '1'='1
SQL: SELECT * FROM users WHERE email = '' OR '1'='1'
Result: Returns all users
\`\`\`

**Prevention:**
- Use parameterized queries
- Input validation
- ORM frameworks

### 2. XSS (Cross-Site Scripting)

**Attack**: Malicious scripts in output

**Example:**
\`\`\`
Input: <script>alert('XSS')</script>
Output: Renders script (if not escaped)
\`\`\`

**Prevention:**
- Output encoding
- Content Security Policy
- Input sanitization

### 3. CSRF (Cross-Site Request Forgery)

**Attack**: Unauthorized actions from authenticated user

**Prevention:**
- CSRF tokens
- SameSite cookies
- Origin validation

### 4. Authentication Bypass

**Attack**: Access without proper authentication

**Prevention:**
- Strong authentication
- Token validation
- Session management

---

## Security Best Practices

### 1. Input Validation

**Validate all input:**
\`\`\`java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
    // @Valid triggers validation
    User user = userService.create(request);
    return ResponseEntity.ok(user);
}
\`\`\`

**Validation Rules:**
- Required fields
- Data types
- Format (email, URL)
- Length limits
- Range checks

### 2. Use HTTPS

**Always use HTTPS:**
\`\`\`
**Use HTTPS:** https://api.example.com
**Avoid HTTP:** http://api.example.com
\`\`\`

**Benefits:**
- Encrypted data
- Prevents interception
- Required for credentials

### 3. Authentication

**Strong authentication:**
- JWT tokens
- OAuth 2.0
- API keys
- Multi-factor authentication

### 4. Authorization

**Role-based access:**
\`\`\`java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    // Only admins can delete
}
\`\`\`

### 5. Rate Limiting

**Prevent abuse:**
\`\`\`java
@RateLimiter(limit = 100, window = 3600)
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers() {
    // Limited to 100 requests/hour
}
\`\`\`

### 6. Error Handling

**Don't expose details:**
\`\`\`java
// Bad approach
throw new Exception("SQL Error: " + sqlException.getMessage());

// Good approach
throw new ApiException("An error occurred. Please try again.");
\`\`\`

### 7. Logging

**Log security events:**
\`\`\`java
logger.warn("Failed login attempt: {}", username);
logger.error("Unauthorized access attempt: {}", request.getRemoteAddr());
\`\`\`

### 8. Security Headers

**Set security headers:**
\`\`\`http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
\`\`\`

---

## Summary

API security essentials:

- **Threats**: SQL injection, XSS, CSRF, authentication bypass
- **Practices**: Input validation, HTTPS, authentication, authorization
- **Protection**: Rate limiting, error handling, logging, security headers

**Critical security practices:**
- Validate all input
- Use HTTPS always
- Implement strong authentication
- Set security headers
- Log security events

Security isn't optional when building APIs. A single vulnerability can compromise your entire system and your users' data. Taking the time to implement these security practices from the start will save you from major problems down the road.

---

## Frequently Asked Questions (FAQs)

### 1. How do I prevent SQL injection?

**Use parameterized queries** or ORM frameworks. Never concatenate user input into SQL strings.

### 2. What is the difference between authentication and authorization?

**Authentication** verifies identity. **Authorization** determines permissions. Both are needed for security.

### 3. Should I use HTTPS for all APIs?

**Yes**, always use HTTPS. HTTP exposes data in plain text and is vulnerable to interception.

### 4. How do I handle sensitive data?

**Encrypt** sensitive data at rest and in transit. Use HTTPS for transit, encryption for storage.

### 5. What security headers should I set?

**Essential headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Strict-Transport-Security.

### 6. How do I prevent XSS?

**Encode output**, use Content Security Policy, sanitize input, validate data types.

### 7. Should I log all API requests?

**Log security events** (failed logins, unauthorized access). Be careful with sensitive data in logs.

### 8. How do I implement CSRF protection?

**Use CSRF tokens**, SameSite cookies, validate Origin header, require authentication for state-changing operations.

### 9. What is the OWASP Top 10?

**Top 10 security risks** identified by OWASP. Includes injection, broken authentication, sensitive data exposure, etc.

### 10. How often should I review security?

**Regularly**: Security audits, penetration testing, code reviews, dependency updates. Security is ongoing process.
  `,
  code: `// API Security Best Practices - Complete Examples

// Example 1: Input Validation
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
    User user = userService.create(request);
    return ResponseEntity.ok(user);
}

// Example 2: SQL Injection Prevention
// Bad approach
String sql = "SELECT * FROM users WHERE email = '" + email + "'";

// Good approach
String sql = "SELECT * FROM users WHERE email = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, email);

// Example 3: Security Headers
@Configuration
public class SecurityHeadersConfig {
    @Bean
    public FilterRegistrationBean<Filter> securityHeadersFilter() {
        FilterRegistrationBean<Filter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new SecurityHeadersFilter());
        return registration;
    }
}

// Example 4: Rate Limiting
@Component
public class RateLimiter {
    public boolean isAllowed(String key) {
        // Implement rate limiting
        return true;
    }
}

// Example 5: Error Handling
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleException(Exception ex) {
    logger.error("Error occurred", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("An error occurred. Please try again."));
}`
};

export default apiSecurityBestPractices;

