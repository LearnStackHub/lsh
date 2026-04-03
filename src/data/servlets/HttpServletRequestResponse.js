const httpServletRequestResponse = {
  id: 'http-request-response',
  title: 'HttpServletRequest & Response',
  description: 'Working with HTTP requests and responses in servlets',
  content: `
# HttpServletRequest & HttpServletResponse — The Heart of Servlet Communication

Every web interaction is a conversation: the browser asks (request), and your servlet answers (response). Understanding these two objects is essential for servlet development.

---

## HttpServletRequest — Everything About the Incoming Request

### Getting Request Parameters

\`\`\`java
// Single value
String username = request.getParameter("username");
String email = request.getParameter("email");

// Multiple values (checkboxes, multi-select)
String[] hobbies = request.getParameterValues("hobbies");
for (String hobby : hobbies) {
    System.out.println(hobby);
}

// All parameters
Map<String, String[]> allParams = request.getParameterMap();
\`\`\`

### URL Information

\`\`\`java
// Request URL: http://localhost:8080/myapp/users?id=123

request.getRequestURL();     // http://localhost:8080/myapp/users
request.getRequestURI();     // /myapp/users
request.getContextPath();    // /myapp
request.getServletPath();    // /users
request.getQueryString();    // id=123
request.getMethod();         // GET or POST
request.getProtocol();       // HTTP/1.1
request.getScheme();         // http or https
request.getServerName();     // localhost
request.getServerPort();     // 8080
\`\`\`

### HTTP Headers

\`\`\`java
// Get specific header
String userAgent = request.getHeader("User-Agent");
String contentType = request.getContentType();
String accept = request.getHeader("Accept");
String authorization = request.getHeader("Authorization");

// Get all headers
Enumeration<String> headerNames = request.getHeaderNames();
while (headerNames.hasMoreElements()) {
    String name = headerNames.nextElement();
    String value = request.getHeader(name);
    System.out.println(name + ": " + value);
}

// Numeric headers
int contentLength = request.getContentLength();
long dateHeader = request.getDateHeader("If-Modified-Since");
\`\`\`

### Client Information

\`\`\`java
String clientIP = request.getRemoteAddr();    // 192.168.1.100
String clientHost = request.getRemoteHost();  // client.example.com
int clientPort = request.getRemotePort();     // 54321
String localAddr = request.getLocalAddr();    // Server IP
\`\`\`

### Request Attributes

\`\`\`java
// Set attribute (for forwarding to JSP)
User user = userService.findById(id);
request.setAttribute("user", user);
request.setAttribute("message", "User found!");

// Get attribute
User user = (User) request.getAttribute("user");

// Remove attribute
request.removeAttribute("tempData");
\`\`\`

### Reading Request Body

\`\`\`java
// For text data (JSON, XML)
BufferedReader reader = request.getReader();
StringBuilder body = new StringBuilder();
String line;
while ((line = reader.readLine()) != null) {
    body.append(line);
}
String jsonBody = body.toString();

// For binary data (file upload)
InputStream is = request.getInputStream();
\`\`\`

---

## HttpServletResponse — Building Your Response

### Setting Content Type

\`\`\`java
// HTML response
response.setContentType("text/html");

// JSON response
response.setContentType("application/json");

// XML response
response.setContentType("application/xml");

// Plain text
response.setContentType("text/plain");

// Character encoding
response.setCharacterEncoding("UTF-8");

// Combined
response.setContentType("text/html;charset=UTF-8");
\`\`\`

### Status Codes

\`\`\`java
// Success
response.setStatus(HttpServletResponse.SC_OK);           // 200
response.setStatus(HttpServletResponse.SC_CREATED);      // 201
response.setStatus(HttpServletResponse.SC_NO_CONTENT);   // 204

// Redirect
response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);  // 301
response.setStatus(HttpServletResponse.SC_FOUND);              // 302

// Client errors
response.sendError(HttpServletResponse.SC_BAD_REQUEST);        // 400
response.sendError(HttpServletResponse.SC_UNAUTHORIZED);       // 401
response.sendError(HttpServletResponse.SC_FORBIDDEN);          // 403
response.sendError(HttpServletResponse.SC_NOT_FOUND);          // 404

// Server errors
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);  // 500
\`\`\`

### Response Headers

\`\`\`java
// Set header (replaces existing)
response.setHeader("Cache-Control", "no-cache");
response.setHeader("X-Custom-Header", "value");

// Add header (allows multiple values)
response.addHeader("Set-Cookie", "session=abc123");
response.addHeader("Set-Cookie", "user= Dattu");

// Date headers
response.setDateHeader("Expires", System.currentTimeMillis() + 3600000);

// Integer headers
response.setIntHeader("Refresh", 5);  // Refresh page every 5 seconds
\`\`\`

### Writing Response Body

\`\`\`java
// For text (HTML, JSON)
PrintWriter out = response.getWriter();
out.println("<html><body>");
out.println("<h1>Hello World!</h1>");
out.println("</body></html>");

// For binary (images, files)
OutputStream os = response.getOutputStream();
byte[] data = getImageBytes();
os.write(data);
\`\`\`

### Redirects

\`\`\`java
// Client-side redirect (URL changes)
response.sendRedirect("success.jsp");
response.sendRedirect("/myapp/dashboard");
response.sendRedirect("http://example.com");

// With context path
response.sendRedirect(request.getContextPath() + "/login");
\`\`\`

---

## Complete Examples

### Form Processing

\`\`\`java
@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Show registration form
        request.getRequestDispatcher("/register.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get form data
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String[] interests = request.getParameterValues("interests");
        
        // Validate
        List<String> errors = new ArrayList<>();
        if (username == null || username.length() < 3) {
            errors.add("Username must be at least 3 characters");
        }
        if (email == null || !email.contains("@")) {
            errors.add("Invalid email address");
        }
        
        if (!errors.isEmpty()) {
            request.setAttribute("errors", errors);
            request.getRequestDispatcher("/register.jsp").forward(request, response);
            return;
        }
        
        // Create user
        User user = new User(username, email, password);
        userService.save(user);
        
        // Redirect to success page
        response.sendRedirect(request.getContextPath() + "/welcome");
    }
}
\`\`\`

### JSON API Response

\`\`\`java
@WebServlet("/api/users/*")
public class UserApiServlet extends HttpServlet {
    private Gson gson = new Gson();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();  // /123
        
        if (pathInfo == null || pathInfo.equals("/")) {
            // Return all users
            List<User> users = userService.findAll();
            response.getWriter().write(gson.toJson(users));
        } else {
            // Return specific user
            String userId = pathInfo.substring(1);  // Remove leading /
            User user = userService.findById(userId);
            
            if (user == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\\"error\\": \\"User not found\\"}");
            } else {
                response.getWriter().write(gson.toJson(user));
            }
        }
    }
}
\`\`\`

### File Download

\`\`\`java
@WebServlet("/download")
public class DownloadServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String fileName = request.getParameter("file");
        String filePath = getServletContext().getRealPath("/files/" + fileName);
        
        File file = new File(filePath);
        if (!file.exists()) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        
        // Set headers for download
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=\\"" + fileName + "\\"");
        response.setContentLength((int) file.length());
        
        // Write file to response
        try (FileInputStream fis = new FileInputStream(file);
             OutputStream os = response.getOutputStream()) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        }
    }
}
\`\`\`

---

## Common Patterns

### CORS Headers

\`\`\`java
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
\`\`\`

### Caching Headers

\`\`\`java
// No caching
response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);

// Cache for 1 hour
response.setHeader("Cache-Control", "max-age=3600");
response.setDateHeader("Expires", System.currentTimeMillis() + 3600000);
\`\`\`

### Security Headers

\`\`\`java
response.setHeader("X-Content-Type-Options", "nosniff");
response.setHeader("X-Frame-Options", "DENY");
response.setHeader("X-XSS-Protection", "1; mode=block");
response.setHeader("Content-Security-Policy", "default-src 'self'");
\`\`\`

---

## Real-World Applications

### RESTful API Development
REST APIs extensively use HttpServletRequest and HttpServletResponse for handling HTTP methods, headers, request bodies, and response formatting. Understanding request/response handling is essential for building robust APIs.

**Implementation Example:**
- Processing JSON request bodies
- Setting appropriate HTTP status codes
- Handling different content types (JSON, XML, form data)
- Implementing CORS headers for cross-origin requests

### Form Processing Applications
Web applications use HttpServletRequest to extract form data, validate input, and process submissions. HttpServletResponse is used to generate appropriate responses, redirects, and error messages.

**Implementation Example:**
- User registration forms
- Contact forms with validation
- Search forms with query parameters
- File upload forms with multipart data

### Content Delivery Systems
Content management and delivery systems use request/response objects for content negotiation, caching headers, and conditional requests. Proper header handling enables efficient content delivery.

**Implementation Example:**
- Dynamic content generation based on Accept headers
- Cache control for static and dynamic content
- Content compression and encoding
- Security headers for protection

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Setting Content Type Before Writing
**Problem:** Writing to response before setting content type may cause incorrect rendering.

**Solution:** Always set content type first:

\`\`\`java
// GOOD - Set content type first
response.setContentType("application/json;charset=UTF-8");
response.getWriter().write(jsonData);

// BAD - Writing before setting type
response.getWriter().write(jsonData);
response.setContentType("application/json");  // Too late!
\`\`\`

### Mistake 2: Not Handling Null Parameters
**Problem:** getParameter() returns null if parameter doesn't exist, causing NullPointerException.

**Solution:** Always check for null:

\`\`\`java
// GOOD - Null check
String id = request.getParameter("id");
if (id != null && !id.isEmpty()) {
    // Process id
}

// BAD - No null check
String id = request.getParameter("id");
int userId = Integer.parseInt(id);  // NullPointerException if id is null!
\`\`\`

### Mistake 3: Committing Response Before Forward/Redirect
**Problem:** Cannot forward or redirect after response is committed.

**Solution:** Don't write to response before forwarding/redirecting:

\`\`\`java
// GOOD - No output before redirect
if (success) {
    response.sendRedirect("success.jsp");
} else {
    request.getRequestDispatcher("error.jsp").forward(request, response);
}

// BAD - Output before redirect
response.getWriter().println("Processing...");
response.sendRedirect("success.jsp");  // Error! Response already committed
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is HttpServletRequest and how do I use it?

HttpServletRequest represents the HTTP request from the client. It provides access to request parameters, headers, cookies, session, URL information, and request body. Use it to extract all information sent by the client. Common methods include \`getParameter()\`, \`getHeader()\`, \`getSession()\`, and \`getRequestURI()\`.

### What is HttpServletResponse and how do I use it?

HttpServletResponse represents the HTTP response to be sent to the client. It's used to set status codes, headers, content type, cookies, and write response body. Use it to build and send responses. Common methods include \`setContentType()\`, \`setStatus()\`, \`getWriter()\`, and \`sendRedirect()\`.

### How do I read request body in a servlet?

Read request body using \`request.getInputStream()\` or \`request.getReader()\`:

\`\`\`java
BufferedReader reader = request.getReader();
StringBuilder body = new StringBuilder();
String line;
while ((line = reader.readLine()) != null) {
    body.append(line);
}
String jsonData = body.toString();
\`\`\`

For JSON, use libraries like Gson or Jackson for parsing.

### How do I send JSON response from a servlet?

Set content type to application/json and write JSON string:

\`\`\`java
response.setContentType("application/json;charset=UTF-8");
response.getWriter().write("{\\"name\\":\\" Dattu\\",\\"age\\":30}");
\`\`\`

Use JSON libraries (Gson, Jackson) for object serialization.

### What's the difference between getParameter() and getAttribute()?

\`getParameter()\` reads data from the request (query string, form data), while \`getAttribute()\` reads data set by servlets/JSPs for forwarding. Parameters come from the client, attributes are set server-side. Use parameters for user input, attributes for server-side data sharing.

### How do I handle file uploads in servlets?

Handle file uploads using \`@MultipartConfig\` annotation and \`request.getPart()\`:

\`\`\`java
@MultipartConfig
@WebServlet("/upload")
public class UploadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        Part filePart = request.getPart("file");
        // Process file
    }
}
\`\`\`

### How do I set response headers?

Set headers using \`setHeader()\`, \`addHeader()\`, or convenience methods:

\`\`\`java
response.setHeader("Cache-Control", "no-cache");
response.addHeader("X-Custom-Header", "value");
response.setContentType("text/html");  // Convenience method
\`\`\`

### How do I handle different HTTP methods?

Override appropriate methods in HttpServlet: \`doGet()\` for GET, \`doPost()\` for POST, \`doPut()\` for PUT, \`doDelete()\` for DELETE. The \`service()\` method automatically routes requests to the correct doXxx() method based on HTTP method.

### How do I get client IP address?

Get client IP using \`request.getRemoteAddr()\`:

\`\`\`java
String clientIp = request.getRemoteAddr();
\`\`\`

Note: Behind proxies, check \`X-Forwarded-For\` header for real IP.

### How do I set cookies in response?

Create Cookie object and add to response:

\`\`\`java
Cookie cookie = new Cookie("username", " Dattu");
cookie.setMaxAge(3600);  // 1 hour
cookie.setPath("/");
response.addCookie(cookie);
\`\`\`

---

## Key Takeaways

Before proceeding to advanced servlet topics, ensure you understand these request/response fundamentals:

- **HttpServletRequest** provides access to all request information
- **HttpServletResponse** is used to build and send responses
- **Always set content type** before writing to response
- **Check for null parameters** to avoid NullPointerException
- **getParameter()** reads client data, **getAttribute()** reads server-set data
- **Don't commit response** before forwarding or redirecting
- **Use appropriate HTTP methods** (doGet, doPost, etc.)
- **Set proper headers** for security, caching, and CORS
- **Handle request body** correctly for JSON, form data, etc.

---

## What's Next?

Now that you understand HttpServletRequest and HttpServletResponse, you're ready to explore advanced servlet topics:

### Immediate Next Steps

1. **[Servlet Lifecycle](/tutorial/servlet-lifecycle)**: Understand servlet initialization and lifecycle
2. **[Session Management](/tutorial/session-management)**: Learn user session handling
3. **[Servlet API](/tutorial/servlet-api)**: Review core servlet interfaces
4. **[Servlet Annotations](/tutorial/servlet-annotations)**: Modern servlet configuration

### Advanced Topics

- **File Upload**: Handle multipart file uploads
- **RESTful Services**: Build REST APIs with servlets
- **Security**: Implement authentication and authorization
- **Filters**: Intercept and modify requests/responses

### Related Tutorials

- **[Servlet Introduction](/tutorial/servlet-introduction)**: Review servlet fundamentals
- **[JSP Introduction](/tutorial/jsp-introduction)**: Combine servlets with JSP
- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Modern servlet-based framework
- **[Web Development](/tutorial/web-development-introduction)**: Build complete web applications

Request and response handling is the core of servlet development. Continue learning about [Session Management](/tutorial/session-management) to maintain user state.
---

## 10 Important HttpServletRequest & HttpServletResponse Interview Questions

### 1. What does HttpServletRequest represent?
**Answer:** The incoming client request: params, headers, cookies, URI, method, and body. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 2. What does HttpServletResponse represent?
**Answer:** The outgoing server response: status code, headers, cookies, and body. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 3. How do you read query/form parameters?
**Answer:** Use request.getParameter() and getParameterValues() for multi-values. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 4. Difference between sendRedirect and forward?
**Answer:** Redirect is client-side new request; forward is server-side internal dispatch. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 5. How do you set response type?
**Answer:** Use response.setContentType("text/html") or JSON MIME type before writing output. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 6. How to set HTTP status code?
**Answer:** Use response.setStatus(...) or sendError(...). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 7. How are headers read and written?
**Answer:** Read from request.getHeader(...), write using response.setHeader(...). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 8. How do you handle file download response?
**Answer:** Set content type, Content-Disposition, and stream bytes via response output stream. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 9. Where should request validation happen?
**Answer:** Immediately in servlet/service layer before business operations. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 10. Why are request/response fundamentals critical?
**Answer:** Every servlet operation is built on correct request parsing and response construction. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

  `,
  code: `// HttpServletRequest & Response Demo
// Simulates HTTP request/response handling

import java.util.*;

public class HttpRequestResponseDemo {
    public static void main(String[] args) {
        System.out.println("=== HttpServletRequest & Response Demo ===\\n");
        
        // Create simulated request
        SimulatedHttpRequest request = new SimulatedHttpRequest();
        
        // Set up request (simulating browser request)
        request.setMethod("POST");
        request.setRequestURL("http://localhost:8080/myapp/users");
        request.setRequestURI("/myapp/users");
        request.setContextPath("/myapp");
        request.setServletPath("/users");
        request.setQueryString("action=create");
        request.setProtocol("HTTP/1.1");
        request.setScheme("http");
        request.setServerName("localhost");
        request.setServerPort(8080);
        request.setRemoteAddr("192.168.1.100");
        
        // Set headers
        request.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        request.setHeader("Accept", "text/html,application/json");
        request.setHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setHeader("Accept-Language", "en-US,en;q=0.9");
        request.setHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIs...");
        
        // Set parameters (form data)
        request.setParameter("username", " Dattu_doe");
        request.setParameter("email", " Dattu@email.com");
        request.setParameter("password", "secret123");
        request.setParameterValues("interests", new String[]{"coding", "gaming", "music"});
        
        // 1. REQUEST INFORMATION
        System.out.println("1. REQUEST LINE");
        System.out.println("   -------------");
        System.out.println("   Method: " + request.getMethod());
        System.out.println("   Request URL: " + request.getRequestURL());
        System.out.println("   Request URI: " + request.getRequestURI());
        System.out.println("   Context Path: " + request.getContextPath());
        System.out.println("   Servlet Path: " + request.getServletPath());
        System.out.println("   Query String: " + request.getQueryString());
        System.out.println("   Protocol: " + request.getProtocol());
        System.out.println();
        
        // 2. REQUEST HEADERS
        System.out.println("2. REQUEST HEADERS");
        System.out.println("   ----------------");
        for (String name : request.getHeaderNames()) {
            System.out.println("   " + name + ": " + request.getHeader(name));
        }
        System.out.println();
        
        // 3. REQUEST PARAMETERS
        System.out.println("3. REQUEST PARAMETERS");
        System.out.println("   -------------------");
        System.out.println("   username: " + request.getParameter("username"));
        System.out.println("   email: " + request.getParameter("email"));
        System.out.println("   password: " + request.getParameter("password"));
        System.out.println("   interests: " + Arrays.toString(request.getParameterValues("interests")));
        System.out.println();
        
        // 4. CLIENT INFO
        System.out.println("4. CLIENT INFORMATION");
        System.out.println("   -------------------");
        System.out.println("   Remote Address: " + request.getRemoteAddr());
        System.out.println("   Server Name: " + request.getServerName());
        System.out.println("   Server Port: " + request.getServerPort());
        System.out.println();
        
        // Create simulated response
        SimulatedHttpResponse response = new SimulatedHttpResponse();
        
        // 5. BUILDING RESPONSE
        System.out.println("5. BUILDING RESPONSE");
        System.out.println("   ------------------");
        
        // Set content type
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        System.out.println("   Content-Type: " + response.getContentType());
        System.out.println("   Encoding: " + response.getCharacterEncoding());
        
        // Set status
        response.setStatus(200);
        System.out.println("   Status: " + response.getStatus() + " OK");
        
        // Set headers
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Custom-Header", "MyValue");
        System.out.println("   Headers set: Cache-Control, X-Custom-Header");
        System.out.println();
        
        // 6. RESPONSE BODY
        System.out.println("6. RESPONSE BODY");
        System.out.println("   --------------");
        
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>\\n");
        html.append("<html>\\n");
        html.append("<head><title>Registration Success</title></head>\\n");
        html.append("<body>\\n");
        html.append("  <h1>Welcome, " + request.getParameter("username") + "!</h1>\\n");
        html.append("  <p>Email: " + request.getParameter("email") + "</p>\\n");
        html.append("  <p>Interests: " + Arrays.toString(request.getParameterValues("interests")) + "</p>\\n");
        html.append("</body>\\n");
        html.append("</html>");
        
        response.write(html.toString());
        System.out.println(response.getBody());
        System.out.println();
        
        // 7. JSON API RESPONSE
        System.out.println("7. JSON API RESPONSE EXAMPLE");
        System.out.println("   --------------------------");
        
        SimulatedHttpResponse jsonResponse = new SimulatedHttpResponse();
        jsonResponse.setContentType("application/json");
        jsonResponse.setCharacterEncoding("UTF-8");
        jsonResponse.setStatus(200);
        
        String json = "{\\n" +
            "  \\"success\\": true,\\n" +
            "  \\"user\\": {\\n" +
            "    \\"id\\": 123,\\n" +
            "    \\"username\\": \\"" + request.getParameter("username") + "\\",\\n" +
            "    \\"email\\": \\"" + request.getParameter("email") + "\\"\\n" +
            "  }\\n" +
            "}";
        
        jsonResponse.write(json);
        System.out.println("   Content-Type: " + jsonResponse.getContentType());
        System.out.println("   Body:");
        System.out.println(jsonResponse.getBody());
        System.out.println();
        
        // 8. COMMON STATUS CODES
        System.out.println("8. COMMON HTTP STATUS CODES");
        System.out.println("   -------------------------");
        System.out.println("   200 OK - Request successful");
        System.out.println("   201 Created - Resource created");
        System.out.println("   204 No Content - Success, no body");
        System.out.println("   301 Moved Permanently - Permanent redirect");
        System.out.println("   302 Found - Temporary redirect");
        System.out.println("   400 Bad Request - Invalid request");
        System.out.println("   401 Unauthorized - Authentication required");
        System.out.println("   403 Forbidden - Access denied");
        System.out.println("   404 Not Found - Resource not found");
        System.out.println("   500 Internal Server Error - Server error");
    }
}

// Simulated HttpServletRequest
class SimulatedHttpRequest {
    private String method;
    private String requestURL;
    private String requestURI;
    private String contextPath;
    private String servletPath;
    private String queryString;
    private String protocol;
    private String scheme;
    private String serverName;
    private int serverPort;
    private String remoteAddr;
    private Map<String, String> headers = new LinkedHashMap<>();
    private Map<String, String> parameters = new HashMap<>();
    private Map<String, String[]> parameterArrays = new HashMap<>();
    private Map<String, Object> attributes = new HashMap<>();
    
    // Setters
    public void setMethod(String method) { this.method = method; }
    public void setRequestURL(String url) { this.requestURL = url; }
    public void setRequestURI(String uri) { this.requestURI = uri; }
    public void setContextPath(String path) { this.contextPath = path; }
    public void setServletPath(String path) { this.servletPath = path; }
    public void setQueryString(String qs) { this.queryString = qs; }
    public void setProtocol(String protocol) { this.protocol = protocol; }
    public void setScheme(String scheme) { this.scheme = scheme; }
    public void setServerName(String name) { this.serverName = name; }
    public void setServerPort(int port) { this.serverPort = port; }
    public void setRemoteAddr(String addr) { this.remoteAddr = addr; }
    public void setHeader(String name, String value) { headers.put(name, value); }
    public void setParameter(String name, String value) { parameters.put(name, value); }
    public void setParameterValues(String name, String[] values) { parameterArrays.put(name, values); }
    public void setAttribute(String name, Object value) { attributes.put(name, value); }
    
    // Getters
    public String getMethod() { return method; }
    public String getRequestURL() { return requestURL; }
    public String getRequestURI() { return requestURI; }
    public String getContextPath() { return contextPath; }
    public String getServletPath() { return servletPath; }
    public String getQueryString() { return queryString; }
    public String getProtocol() { return protocol; }
    public String getScheme() { return scheme; }
    public String getServerName() { return serverName; }
    public int getServerPort() { return serverPort; }
    public String getRemoteAddr() { return remoteAddr; }
    public String getHeader(String name) { return headers.get(name); }
    public Set<String> getHeaderNames() { return headers.keySet(); }
    public String getParameter(String name) { return parameters.get(name); }
    public String[] getParameterValues(String name) { return parameterArrays.get(name); }
    public Object getAttribute(String name) { return attributes.get(name); }
}

// Simulated HttpServletResponse
class SimulatedHttpResponse {
    private String contentType;
    private String characterEncoding;
    private int status;
    private Map<String, String> headers = new HashMap<>();
    private StringBuilder body = new StringBuilder();
    
    public void setContentType(String type) { this.contentType = type; }
    public String getContentType() { return contentType; }
    
    public void setCharacterEncoding(String encoding) { this.characterEncoding = encoding; }
    public String getCharacterEncoding() { return characterEncoding; }
    
    public void setStatus(int status) { this.status = status; }
    public int getStatus() { return status; }
    
    public void setHeader(String name, String value) { headers.put(name, value); }
    
    public void write(String content) { body.append(content); }
    public String getBody() { return body.toString(); }
}`,
  practiceQuestions: [
    {
      question: 'Create a request processor that handles different content types',
      hint: 'Check Content-Type header and process accordingly',
      starterCode: `import java.util.*;

public class ContentTypeDemo {
    public static void main(String[] args) {
        System.out.println("=== Content Type Handler Demo ===\\n");
        
        ContentTypeHandler handler = new ContentTypeHandler();
        
        // Test 1: Form data
        System.out.println("1. Processing Form Data:");
        Map<String, String> formHeaders = new HashMap<>();
        formHeaders.put("Content-Type", "application/x-www-form-urlencoded");
        String formBody = "username= Dattu&email= Dattu@email.com";
        handler.processRequest(formHeaders, formBody);
        System.out.println();
        
        // Test 2: JSON data
        System.out.println("2. Processing JSON Data:");
        Map<String, String> jsonHeaders = new HashMap<>();
        jsonHeaders.put("Content-Type", "application/json");
        String jsonBody = "{\\"name\\": \\" Dattu\\", \\"age\\": 25}";
        handler.processRequest(jsonHeaders, jsonBody);
        System.out.println();
        
        // Test 3: Plain text
        System.out.println("3. Processing Plain Text:");
        Map<String, String> textHeaders = new HashMap<>();
        textHeaders.put("Content-Type", "text/plain");
        String textBody = "Hello, World!";
        handler.processRequest(textHeaders, textBody);
    }
}

class ContentTypeHandler {
    public void processRequest(Map<String, String> headers, String body) {
        String contentType = headers.get("Content-Type");
        System.out.println("   Content-Type: " + contentType);
        System.out.println("   Body: " + body);
        
        if (contentType.contains("application/x-www-form-urlencoded")) {
            processFormData(body);
        } else if (contentType.contains("application/json")) {
            processJson(body);
        } else if (contentType.contains("text/plain")) {
            processText(body);
        } else {
            System.out.println("   Unknown content type!");
        }
    }
    
    private void processFormData(String body) {
        System.out.println("   Parsed form data:");
        String[] pairs = body.split("&");
        for (String pair : pairs) {
            String[] kv = pair.split("=");
            System.out.println("     " + kv[0] + " = " + kv[1]);
        }
    }
    
    private void processJson(String body) {
        System.out.println("   Processing as JSON object...");
        System.out.println("   (In real app, use Gson or Jackson to parse)");
    }
    
    private void processText(String body) {
        System.out.println("   Plain text content: " + body);
    }
}`
    }
  ]
};

export default httpServletRequestResponse;
