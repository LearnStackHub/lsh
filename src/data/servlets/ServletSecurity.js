const servletSecurity = {
  id: 'servlet-security',
  title: 'Servlet Security',
  description: 'Authentication, authorization, and security best practices',
  content: `
# Servlet Security — Protecting Your Web Application

Security isn't optional. Every web application needs authentication (who are you?), authorization (what can you do?), and protection against common attacks. Let's learn how to build secure servlets.

---

## Authentication Methods

### 1. Form-Based Authentication

The most common approach for web applications:

\`\`\`java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Validate credentials
        User user = userService.authenticate(username, password);
        
        if (user != null) {
            // Create session
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            session.setMaxInactiveInterval(30 * 60);  // 30 minutes
            
            // Redirect to original page or dashboard
            String redirectUrl = (String) session.getAttribute("redirectUrl");
            if (redirectUrl != null) {
                session.removeAttribute("redirectUrl");
                response.sendRedirect(redirectUrl);
            } else {
                response.sendRedirect("dashboard");
            }
        } else {
            request.setAttribute("error", "Invalid credentials");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
}
\`\`\`

### 2. Token-Based Authentication (JWT)

For REST APIs:

\`\`\`java
@WebServlet("/api/login")
public class ApiLoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Parse JSON body
        JsonObject json = JsonParser.parseReader(request.getReader()).getAsJsonObject();
        String username = json.get("username").getAsString();
        String password = json.get("password").getAsString();
        
        User user = userService.authenticate(username, password);
        
        response.setContentType("application/json");
        
        if (user != null) {
            // Generate JWT token
            String token = JwtUtil.generateToken(user);
            
            response.getWriter().write(
                "{\\"token\\": \\"" + token + "\\", \\"user\\": \\"" + user.getUsername() + "\\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\\"error\\": \\"Invalid credentials\\"}");
        }
    }
}
\`\`\`

---

## Authorization — Role-Based Access Control

### Security Filter

\`\`\`java
@WebFilter(urlPatterns = {"/admin/*", "/api/admin/*"})
public class AdminAuthorizationFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        HttpSession session = request.getSession(false);
        
        // Check if logged in
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }
        
        // Check if admin
        User user = (User) session.getAttribute("user");
        if (!user.hasRole("ADMIN")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Admin access required");
            return;
        }
        
        chain.doFilter(req, res);
    }
}
\`\`\`

### Role Checking in Servlet

\`\`\`java
@WebServlet("/admin/users")
public class AdminUserServlet extends HttpServlet {
    
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        User currentUser = (User) request.getSession().getAttribute("user");
        
        // Only super admins can delete users
        if (!currentUser.hasRole("SUPER_ADMIN")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, 
                "Only super admins can delete users");
            return;
        }
        
        // Proceed with deletion
        String userId = request.getParameter("id");
        userService.delete(userId);
        
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}
\`\`\`

---

## Preventing Common Attacks

### 1. SQL Injection Prevention

**Bad (Vulnerable):**
\`\`\`java
String query = "SELECT * FROM users WHERE username = '" + username + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);  // DANGEROUS!
\`\`\`

**Good (Safe):**
\`\`\`java
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement pstmt = conn.prepareStatement(query);
pstmt.setString(1, username);  // Parameterized - safe!
ResultSet rs = pstmt.executeQuery();
\`\`\`

### 2. XSS (Cross-Site Scripting) Prevention

**Escape output:**
\`\`\`java
// Bad - direct output
out.println("<p>Welcome, " + username + "</p>");

// Good - escape HTML
out.println("<p>Welcome, " + escapeHtml(username) + "</p>");

private String escapeHtml(String input) {
    if (input == null) return null;
    return input
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\\"", "&quot;")
        .replace("'", "&#x27;");
}
\`\`\`

**In JSP, use JSTL:**
\`\`\`jsp
<%-- Bad --%>
<p>Welcome, <%= username %></p>

<%-- Good - auto-escapes --%>
<p>Welcome, <c:out value="\${username}"/></p>
\`\`\`

### 3. CSRF (Cross-Site Request Forgery) Prevention

\`\`\`java
// Generate token on form display
@WebServlet("/transfer")
public class TransferServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Generate CSRF token
        String csrfToken = UUID.randomUUID().toString();
        request.getSession().setAttribute("csrfToken", csrfToken);
        request.setAttribute("csrfToken", csrfToken);
        
        request.getRequestDispatcher("/transfer.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Validate CSRF token
        String sessionToken = (String) request.getSession().getAttribute("csrfToken");
        String requestToken = request.getParameter("csrfToken");
        
        if (sessionToken == null || !sessionToken.equals(requestToken)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid CSRF token");
            return;
        }
        
        // Process transfer
        // ...
    }
}
\`\`\`

### 4. Password Security

\`\`\`java
import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {
    
    // Hash password for storage
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12));
    }
    
    // Verify password
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}

// Usage in registration
String hashedPassword = PasswordUtil.hashPassword(password);
user.setPassword(hashedPassword);

// Usage in login
if (PasswordUtil.checkPassword(inputPassword, user.getPassword())) {
    // Login successful
}
\`\`\`

---

## Security Headers

\`\`\`java
@WebFilter("/*")
public class SecurityHeadersFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse response = (HttpServletResponse) res;
        
        // Prevent clickjacking
        response.setHeader("X-Frame-Options", "DENY");
        
        // Prevent MIME type sniffing
        response.setHeader("X-Content-Type-Options", "nosniff");
        
        // Enable XSS filter
        response.setHeader("X-XSS-Protection", "1; mode=block");
        
        // Content Security Policy
        response.setHeader("Content-Security-Policy", 
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
        
        // HTTPS only
        response.setHeader("Strict-Transport-Security", 
            "max-age=31536000; includeSubDomains");
        
        chain.doFilter(req, res);
    }
}
\`\`\`

---

## Session Security

\`\`\`java
// Secure session configuration
HttpSession session = request.getSession();

// Set timeout
session.setMaxInactiveInterval(30 * 60);  // 30 minutes

// Regenerate session ID after login (prevent session fixation)
request.changeSessionId();

// Invalidate on logout
@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        // Clear cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
        
        response.sendRedirect("login");
    }
}
\`\`\`

---

## Input Validation

\`\`\`java
public class InputValidator {
    
    public static boolean isValidEmail(String email) {
        return email != null && 
               email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }
    
    public static boolean isValidUsername(String username) {
        return username != null && 
               username.matches("^[a-zA-Z0-9_]{3,20}$");
    }
    
    public static boolean isValidPassword(String password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit
        return password != null && 
               password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d).{8,}$");
    }
    
    public static String sanitizeInput(String input) {
        if (input == null) return null;
        return input.replaceAll("[<>\"'&]", "");
    }
}
\`\`\`
`,
  code: `// Servlet Security Demo
// Demonstrates authentication, authorization, and security practices

import java.util.*;

public class ServletSecurityDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Security Demo ===\\n");
        
        // Create security components
        UserService userService = new UserService();
        SecurityFilter securityFilter = new SecurityFilter();
        
        // 1. PASSWORD HASHING
        System.out.println("1. PASSWORD HASHING");
        System.out.println("   -----------------");
        
        String plainPassword = "MySecureP@ss123";
        String hashedPassword = PasswordUtil.hash(plainPassword);
        
        System.out.println("   Plain password: " + plainPassword);
        System.out.println("   Hashed password: " + hashedPassword);
        System.out.println("   Verify correct: " + PasswordUtil.verify(plainPassword, hashedPassword));
        System.out.println("   Verify wrong: " + PasswordUtil.verify("wrongpassword", hashedPassword));
        System.out.println();
        
        // 2. USER AUTHENTICATION
        System.out.println("2. USER AUTHENTICATION");
        System.out.println("   --------------------");
        
        // Register users
        userService.register("admin", "Admin@123", "ADMIN");
        userService.register(" Dattu", "User@123", "USER");
        
        // Test login
        System.out.println("   Login 'admin' with correct password:");
        User admin = userService.authenticate("admin", "Admin@123");
        System.out.println("     Result: " + (admin != null ? "SUCCESS - " + admin : "FAILED"));
        
        System.out.println("   Login 'admin' with wrong password:");
        User failed = userService.authenticate("admin", "wrongpass");
        System.out.println("     Result: " + (failed != null ? "SUCCESS" : "FAILED - Invalid credentials"));
        System.out.println();
        
        // 3. AUTHORIZATION (ROLE-BASED)
        System.out.println("3. AUTHORIZATION (Role-Based)");
        System.out.println("   ---------------------------");
        
        User adminUser = userService.authenticate("admin", "Admin@123");
        User normalUser = userService.authenticate(" Dattu", "User@123");
        
        System.out.println("   Admin accessing /admin/dashboard:");
        System.out.println("     " + securityFilter.checkAccess("/admin/dashboard", adminUser));
        
        System.out.println("   User accessing /admin/dashboard:");
        System.out.println("     " + securityFilter.checkAccess("/admin/dashboard", normalUser));
        
        System.out.println("   User accessing /profile:");
        System.out.println("     " + securityFilter.checkAccess("/profile", normalUser));
        System.out.println();
        
        // 4. SQL INJECTION PREVENTION
        System.out.println("4. SQL INJECTION PREVENTION");
        System.out.println("   -------------------------");
        
        String maliciousInput = "admin'; DROP TABLE users; --";
        
        System.out.println("   Malicious input: " + maliciousInput);
        System.out.println();
        System.out.println("   VULNERABLE query:");
        System.out.println("     SELECT * FROM users WHERE username = '" + maliciousInput + "'");
        System.out.println("     -> This would DROP the users table!");
        System.out.println();
        System.out.println("   SAFE query (parameterized):");
        System.out.println("     SELECT * FROM users WHERE username = ?");
        System.out.println("     Parameter: " + maliciousInput);
        System.out.println("     -> Input is treated as data, not SQL code");
        System.out.println();
        
        // 5. XSS PREVENTION
        System.out.println("5. XSS PREVENTION");
        System.out.println("   ---------------");
        
        String xssInput = "<script>alert('XSS')</script>";
        
        System.out.println("   Malicious input: " + xssInput);
        System.out.println("   Escaped output: " + SecurityUtil.escapeHtml(xssInput));
        System.out.println();
        
        // 6. CSRF TOKEN
        System.out.println("6. CSRF TOKEN");
        System.out.println("   -----------");
        
        String csrfToken = SecurityUtil.generateCsrfToken();
        System.out.println("   Generated token: " + csrfToken);
        System.out.println("   Valid token check: " + SecurityUtil.validateCsrfToken(csrfToken, csrfToken));
        System.out.println("   Invalid token check: " + SecurityUtil.validateCsrfToken(csrfToken, "fake-token"));
        System.out.println();
        
        // 7. INPUT VALIDATION
        System.out.println("7. INPUT VALIDATION");
        System.out.println("   -----------------");
        
        System.out.println("   Email validation:");
        System.out.println("     ' Dattu@email.com': " + InputValidator.isValidEmail(" Dattu@email.com"));
        System.out.println("     'invalid-email': " + InputValidator.isValidEmail("invalid-email"));
        
        System.out.println("   Username validation:");
        System.out.println("     ' Dattu_doe': " + InputValidator.isValidUsername(" Dattu_doe"));
        System.out.println("     'a': " + InputValidator.isValidUsername("a"));
        
        System.out.println("   Password validation:");
        System.out.println("     'Secure@123': " + InputValidator.isValidPassword("Secure@123"));
        System.out.println("     'weak': " + InputValidator.isValidPassword("weak"));
        System.out.println();
        
        // 8. SECURITY HEADERS
        System.out.println("8. SECURITY HEADERS");
        System.out.println("   -----------------");
        System.out.println("   X-Frame-Options: DENY");
        System.out.println("   X-Content-Type-Options: nosniff");
        System.out.println("   X-XSS-Protection: 1; mode=block");
        System.out.println("   Content-Security-Policy: default-src 'self'");
        System.out.println("   Strict-Transport-Security: max-age=31536000");
    }
}

// User class
class User {
    private String username;
    private String passwordHash;
    private String role;
    
    User(String username, String passwordHash, String role) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }
    
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public String getRole() { return role; }
    
    public boolean hasRole(String requiredRole) {
        return role.equals(requiredRole);
    }
    
    public String toString() {
        return "User{username='" + username + "', role='" + role + "'}";
    }
}

// User Service
class UserService {
    private Map<String, User> users = new HashMap<>();
    
    public void register(String username, String password, String role) {
        String hash = PasswordUtil.hash(password);
        users.put(username, new User(username, hash, role));
        System.out.println("   Registered user: " + username + " (role: " + role + ")");
    }
    
    public User authenticate(String username, String password) {
        User user = users.get(username);
        if (user != null && PasswordUtil.verify(password, user.getPasswordHash())) {
            return user;
        }
        return null;
    }
}

// Password Utility (simplified - use BCrypt in production)
class PasswordUtil {
    public static String hash(String password) {
        // Simplified hash - use BCrypt in production!
        return "HASH:" + Integer.toHexString(password.hashCode()) + 
               Integer.toHexString((password + "salt").hashCode());
    }
    
    public static boolean verify(String password, String hash) {
        return hash(password).equals(hash);
    }
}

// Security Filter
class SecurityFilter {
    private Map<String, String> protectedPaths = new HashMap<>();
    
    SecurityFilter() {
        protectedPaths.put("/admin", "ADMIN");
        protectedPaths.put("/api/admin", "ADMIN");
        protectedPaths.put("/profile", "USER");
    }
    
    public String checkAccess(String path, User user) {
        if (user == null) {
            return "DENIED - Not authenticated";
        }
        
        for (Map.Entry<String, String> entry : protectedPaths.entrySet()) {
            if (path.startsWith(entry.getKey())) {
                String requiredRole = entry.getValue();
                if (user.hasRole(requiredRole) || user.hasRole("ADMIN")) {
                    return "ALLOWED - User has " + user.getRole() + " role";
                } else {
                    return "DENIED - Requires " + requiredRole + " role";
                }
            }
        }
        
        return "ALLOWED - Public path";
    }
}

// Security Utilities
class SecurityUtil {
    public static String escapeHtml(String input) {
        if (input == null) return null;
        return input
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\\"", "&quot;")
            .replace("'", "&#x27;");
    }
    
    public static String generateCsrfToken() {
        return UUID.randomUUID().toString();
    }
    
    public static boolean validateCsrfToken(String sessionToken, String requestToken) {
        return sessionToken != null && sessionToken.equals(requestToken);
    }
}

// Input Validator
class InputValidator {
    public static boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }
    
    public static boolean isValidUsername(String username) {
        return username != null && username.matches("^[a-zA-Z0-9_]{3,20}$");
    }
    
    public static boolean isValidPassword(String password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special
        return password != null && 
               password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\\\d.*") &&
               password.matches(".*[@#$%^&+=!].*");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a login attempt tracker that locks accounts after failed attempts',
      hint: 'Track failed attempts per user and implement lockout period',
      starterCode: `import java.util.*;

public class LoginTrackerDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Login Attempt Tracker Demo ===\\n");
        
        LoginTracker tracker = new LoginTracker(3, 30000);  // 3 attempts, 30 sec lockout
        
        String username = " Dattu";
        
        // Simulate failed login attempts
        System.out.println("Simulating login attempts for user: " + username);
        System.out.println("(Max attempts: 3, Lockout: 30 seconds)\\n");
        
        for (int i = 1; i <= 5; i++) {
            System.out.println("Attempt #" + i + ":");
            
            if (tracker.isLocked(username)) {
                System.out.println("  Account is LOCKED!");
                System.out.println("  Remaining lockout: " + tracker.getRemainingLockout(username) + "ms");
            } else {
                // Simulate failed login
                boolean success = false;  // Always fail for demo
                
                if (!success) {
                    tracker.recordFailedAttempt(username);
                    System.out.println("  Login FAILED");
                    System.out.println("  Failed attempts: " + tracker.getFailedAttempts(username));
                }
            }
            
            Thread.sleep(1000);
        }
        
        System.out.println("\\nWaiting for lockout to expire...");
        Thread.sleep(30000);
        
        System.out.println("\\nAfter lockout period:");
        System.out.println("  Account locked: " + tracker.isLocked(username));
        
        // Successful login clears attempts
        tracker.recordSuccessfulLogin(username);
        System.out.println("  After successful login - Failed attempts: " + tracker.getFailedAttempts(username));
    }
}

class LoginTracker {
    private int maxAttempts;
    private long lockoutDurationMs;
    private Map<String, Integer> failedAttempts = new HashMap<>();
    private Map<String, Long> lockoutTimes = new HashMap<>();
    
    LoginTracker(int maxAttempts, long lockoutDurationMs) {
        this.maxAttempts = maxAttempts;
        this.lockoutDurationMs = lockoutDurationMs;
    }
    
    public void recordFailedAttempt(String username) {
        int attempts = failedAttempts.getOrDefault(username, 0) + 1;
        failedAttempts.put(username, attempts);
        
        if (attempts >= maxAttempts) {
            lockoutTimes.put(username, System.currentTimeMillis());
        }
    }
    
    public void recordSuccessfulLogin(String username) {
        failedAttempts.remove(username);
        lockoutTimes.remove(username);
    }
    
    public boolean isLocked(String username) {
        Long lockoutTime = lockoutTimes.get(username);
        if (lockoutTime == null) return false;
        
        if (System.currentTimeMillis() - lockoutTime > lockoutDurationMs) {
            // Lockout expired
            lockoutTimes.remove(username);
            failedAttempts.remove(username);
            return false;
        }
        
        return true;
    }
    
    public long getRemainingLockout(String username) {
        Long lockoutTime = lockoutTimes.get(username);
        if (lockoutTime == null) return 0;
        
        long remaining = lockoutDurationMs - (System.currentTimeMillis() - lockoutTime);
        return Math.max(0, remaining);
    }
    
    public int getFailedAttempts(String username) {
        return failedAttempts.getOrDefault(username, 0);
    }
}`
    }
  ]
};

export default servletSecurity;
