const servletIntroduction = {
  id: 'servlet-introduction',
  title: 'Introduction to Servlets',
  description: 'How Java powers the web — from request to response',
  content: `
# Servlets — Java Enterprise Web Development

Java Servlets are server-side Java programs that handle HTTP requests and generate dynamic web content. Servlets form the foundation of Java Enterprise Edition (JEE) web applications, powering enterprise systems that process millions of requests daily.

**Servlets** are Java classes that extend server capabilities by responding to client requests. They operate within a servlet container (like Apache Tomcat, Jetty, or WildFly) and provide the core mechanism for building dynamic, data-driven web applications in Java.

---

## Real-Time Scenarios: Servlets in Daily Web Applications

### Scenario 1: User Login (E-Commerce, Banking, Social Media)

**Daily Life:** When you login to any website, a Servlet handles it:

\`\`\`java
// Real-world: Login on Amazon/Flipkart/Banking
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Validate credentials with database
        User user = userDAO.authenticate(username, password);
        
        if (user != null) {
            // Create session
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            
            // Redirect to home page
            response.sendRedirect("home.jsp");
        } else {
            // Show error
            request.setAttribute("error", "Invalid credentials");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
\`\`\`

**What Happens:**
1. You enter username/password and click "Login"
2. Browser sends POST request to \`/login\`
3. Servlet receives request
4. Servlet validates credentials with database
5. If valid, creates session and redirects to home
6. If invalid, shows error message

### Scenario 2: Product Search (E-Commerce)

**Daily Life:** When you search for products, a Servlet processes it:

\`\`\`java
// Real-world: Search products on Amazon
@WebServlet("/search")
public class SearchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String searchTerm = request.getParameter("q");
        String category = request.getParameter("category");
        double maxPrice = Double.parseDouble(request.getParameter("maxPrice"));
        
        // Search products in database
        List<Product> products = productDAO.search(searchTerm, category, maxPrice);
        
        // Set results in request
        request.setAttribute("products", products);
        request.setAttribute("searchTerm", searchTerm);
        
        // Forward to results page
        request.getRequestDispatcher("searchResults.jsp").forward(request, response);
    }
}
\`\`\`

**What Happens:**
1. You type "laptop" in search box and click "Search"
2. Browser sends GET request: \`/search?q=laptop&category=electronics&maxPrice=50000\`
3. Servlet extracts search parameters
4. Servlet queries database for matching products
5. Servlet forwards results to JSP page
6. JSP displays products on your screen

### Scenario 3: Online Shopping Cart (E-Commerce)

**Daily Life:** When you add items to cart, a Servlet manages it:

\`\`\`java
// Real-world: Add to cart on Amazon
@WebServlet("/addToCart")
public class AddToCartServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        // Get user from session
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        int productId = Integer.parseInt(request.getParameter("productId"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        
        // Add to cart in database
        cartDAO.addItem(user.getId(), productId, quantity);
        
        // Update session cart count
        int cartCount = cartDAO.getCartCount(user.getId());
        session.setAttribute("cartCount", cartCount);
        
        response.sendRedirect("cart.jsp?message=Item added to cart");
    }
}
\`\`\`

**What Happens:**
1. You click "Add to Cart" button
2. Browser sends POST request with product ID and quantity
3. Servlet gets user from session
4. Servlet saves item to cart in database
5. Servlet updates cart count in session
6. Servlet redirects to cart page with success message

### Scenario 4: Online Banking Money Transfer

**Daily Life:** When you transfer money online, a Servlet handles it:

\`\`\`java
// Real-world: Transfer money in banking app
@WebServlet("/transfer")
public class TransferServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        String toAccount = request.getParameter("toAccount");
        double amount = Double.parseDouble(request.getParameter("amount"));
        
        // Validate and transfer
        try {
            accountService.transfer(user.getAccountNumber(), toAccount, amount);
            request.setAttribute("success", "Transfer successful!");
        } catch (InsufficientBalanceException e) {
            request.setAttribute("error", "Insufficient balance");
        } catch (Exception e) {
            request.setAttribute("error", "Transfer failed");
        }
        
        request.getRequestDispatcher("transfer.jsp").forward(request, response);
    }
}
\`\`\`

**What Happens:**
1. You enter recipient account and amount, click "Transfer"
2. Browser sends POST request
3. Servlet validates user session
4. Servlet processes transfer (updates both accounts)
5. Servlet shows success or error message
6. Transaction recorded in database

### Scenario 5: Online Food Ordering (Swiggy, Zomato)

**Daily Life:** When you place a food order, a Servlet processes it:

\`\`\`java
// Real-world: Place order on Swiggy/Zomato
@WebServlet("/placeOrder")
public class PlaceOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        Cart cart = (Cart) session.getAttribute("cart");
        
        String deliveryAddress = request.getParameter("address");
        String paymentMethod = request.getParameter("payment");
        
        // Create order
        Order order = orderService.createOrder(user, cart, deliveryAddress, paymentMethod);
        
        // Clear cart
        session.removeAttribute("cart");
        
        // Redirect to order confirmation
        response.sendRedirect("orderConfirmation.jsp?orderId=" + order.getId());
    }
}
\`\`\`

**What Happens:**
1. You click "Place Order" after adding items
2. Browser sends POST request with address and payment info
3. Servlet creates order in database
4. Servlet clears cart from session
5. Servlet redirects to order confirmation page
6. You see order details and tracking info

---

## Servlet Architecture and Components

A Servlet is a Java class that extends server capabilities by processing HTTP requests and generating dynamic responses. Servlets operate within a servlet container, which manages their lifecycle, thread allocation, and resource handling.

**Core Servlet Responsibilities:**

1. **Request Processing**: Receive and parse HTTP requests (GET, POST, PUT, DELETE)
2. **Business Logic Execution**: Process requests, interact with databases, perform calculations
3. **Response Generation**: Generate dynamic HTML, JSON, XML, or other content types
4. **Session Management**: Maintain user state across multiple requests
5. **Security Enforcement**: Implement authentication, authorization, and input validation

**Servlet Container Benefits:**

- **Thread Management**: Container creates and manages threads for concurrent request handling
- **Lifecycle Management**: Container controls servlet initialization, service, and destruction
- **Resource Pooling**: Efficient management of database connections and other resources
- **Security**: Container provides security context and access control mechanisms
- **Deployment**: Simplified deployment and configuration through web.xml or annotations

---

## The Old Way: CGI

Before Servlets, we had **CGI (Common Gateway Interface)**. Here's why it was problematic:

With CGI, every request created a new **process**. Imagine 1000 users hitting your site simultaneously — that's 1000 processes. Your server would melt.

Servlets fixed this. Instead of processes, they use **threads**. One Servlet instance handles multiple requests, each in its own thread. Much more efficient.

| CGI | Servlets |
|-----|----------|
| New process per request | New thread per request |
| Heavy and slow | Lightweight and fast |
| Limited scalability | Handles thousands of requests |
| Platform dependent | Platform independent |

---

## How Servlets Work

Here's the flow:

\`\`\`
Browser sends request
        ↓
    Web Server (Apache/Nginx)
        ↓
    Servlet Container (Tomcat)
        ↓
    Your Servlet
        ↓
    Response sent back
\`\`\`

The Servlet Container does a lot of heavy lifting:
- Loads your Servlet when needed
- Creates threads for each request
- Calls the right method (doGet, doPost, etc.)
- Manages the Servlet's lifecycle

You just focus on what happens when a request comes in.

---

## Enterprise Servlet Implementation Example

The following example demonstrates a production-ready servlet implementation:

\`\`\`java
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<html>");
        out.println("<body>");
        out.println("<h1>Hello from Servlet!</h1>");
        out.println("</body>");
        out.println("</html>");
    }
}
\`\`\`

**Implementation Breakdown:**

1. **extends HttpServlet**: All HTTP servlets extend \`HttpServlet\`, which provides HTTP-specific functionality
2. **doGet()**: Handles HTTP GET requests (resource retrieval, page loads)
3. **HttpServletRequest**: Encapsulates HTTP request data (parameters, headers, session)
4. **HttpServletResponse**: Provides methods to construct HTTP responses (status codes, headers, body)
5. **PrintWriter**: Output stream for writing response content to the client

**Best Practice**: For production applications, use JSP or templating engines (Thymeleaf, FreeMarker) instead of writing HTML directly in servlets for better separation of concerns.

---

## GET vs POST

You'll mostly deal with two HTTP methods:

**GET** — Used to retrieve data
- When you type a URL and hit enter
- When you click a link
- Parameters visible in URL (\`?name=John&age=25\`)

**POST** — Used to submit data
- When you submit a form
- When you upload a file
- Parameters hidden in request body

In your Servlet:
\`\`\`java
protected void doGet(HttpServletRequest req, HttpServletResponse res) {
    // Handle GET requests
}

protected void doPost(HttpServletRequest req, HttpServletResponse res) {
    // Handle POST requests
}
\`\`\`

---

## Getting Request Parameters

Users send data to your Servlet through parameters. Here's how to get them:

\`\`\`java
// URL: /search?query=java&page=1

protected void doGet(HttpServletRequest request, 
                    HttpServletResponse response) throws IOException {
    
    String query = request.getParameter("query");  // "java"
    String page = request.getParameter("page");    // "1"
    
    // Now use these values
}
\`\`\`

For a login form:
\`\`\`java
protected void doPost(HttpServletRequest request, 
                     HttpServletResponse response) throws IOException {
    
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    
    // Validate credentials
    if (isValidUser(username, password)) {
        // Login successful
    } else {
        // Login failed
    }
}
\`\`\`

---

## Mapping URLs to Servlets

How does the container know which Servlet to call? Through URL mapping.

**Old way (web.xml):**
\`\`\`xml
<servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.example.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
\`\`\`

**Modern way (annotations):**
\`\`\`java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    // ...
}
\`\`\`

Much cleaner, right? The annotation approach was introduced in Servlet 3.0.

---

## Real-World Example: Login System

Let's build something practical — a login page:

\`\`\`java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, 
                         HttpServletResponse response) 
            throws IOException, ServletException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        // In real apps, you'd check against a database
        if ("admin".equals(username) && "password123".equals(password)) {
            // Create a session
            HttpSession session = request.getSession();
            session.setAttribute("user", username);
            
            out.println("<h1>Welcome, " + username + "!</h1>");
            out.println("<a href='dashboard'>Go to Dashboard</a>");
        } else {
            out.println("<h1>Login Failed</h1>");
            out.println("<p>Invalid username or password</p>");
            out.println("<a href='login.html'>Try Again</a>");
        }
    }
}
\`\`\`

This is a simplified example, but it shows the pattern:
1. Get user input
2. Validate it
3. Create session if valid
4. Send appropriate response

---

## Sessions — Remembering Users

HTTP is stateless. Each request is independent. But you need to remember that a user is logged in. That's what sessions are for.

\`\`\`java
// Create or get existing session
HttpSession session = request.getSession();

// Store data in session
session.setAttribute("user", "john");
session.setAttribute("role", "admin");

// Retrieve data later
String user = (String) session.getAttribute("user");

// Invalidate session (logout)
session.invalidate();
\`\`\`

The container handles all the cookie management behind the scenes. You just work with the session object.

---

## Common Mistakes

**1. Not setting content type**
\`\`\`java
response.setContentType("text/html");  // Do this first!
\`\`\`

**2. Writing after getting PrintWriter**
Get the PrintWriter after setting headers, not before.

**3. Not handling null parameters**
\`\`\`java
String name = request.getParameter("name");
if (name != null && !name.isEmpty()) {
    // Safe to use
}
\`\`\`

**4. Storing sensitive data in sessions**
Don't store passwords in sessions. Store user IDs and look up data when needed.

---

## Servlet Containers

You need a Servlet Container to run Servlets. Popular options:

| Container | Description |
|-----------|-------------|
| **Apache Tomcat** | Most popular, lightweight |
| **Jetty** | Embedded, great for microservices |
| **WildFly** | Full Java EE server |
| **GlassFish** | Reference implementation |

For learning, Tomcat is perfect. It's free, easy to set up, and widely used in production.

---

## Industry Applications and Enterprise Use Cases

### Enterprise Web Application Patterns

**E-Commerce Platforms:**
- Amazon, Flipkart utilize servlets for order processing, payment handling, and inventory management
- High-concurrency request handling requires optimized servlet container configuration
- Session management ensures shopping cart persistence across user interactions

**Banking and Financial Services:**
- Online banking applications use servlets for secure transaction processing
- Servlet filters implement security policies and request validation
- Session management maintains user authentication state

**Content Management Systems:**
- Enterprise CMS platforms use servlets for dynamic content generation
- Servlet-based architectures enable scalable content delivery
- Integration with databases and caching systems for performance

**API Development:**
- RESTful APIs built with servlets handle JSON/XML request/response processing
- Servlet filters implement CORS, authentication, and rate limiting
- Microservices architectures leverage lightweight servlet containers

---

## Performance Optimization Best Practices

### Servlet Container Tuning

**Thread Pool Configuration:**
\`\`\`xml
<!-- Tomcat server.xml -->
<Connector port="8080" 
           maxThreads="200" 
           minSpareThreads="10"
           acceptCount="100"
           connectionTimeout="20000"/>
\`\`\`

**Connection Pooling:**
- Configure database connection pools (HikariCP, Apache DBCP)
- Set appropriate pool sizes based on application load
- Monitor connection pool metrics for optimization

### Response Caching

\`\`\`java
response.setHeader("Cache-Control", "max-age=3600");
response.setHeader("ETag", generateETag(content));
\`\`\`

### Async Processing

\`\`\`java
@WebServlet(asyncSupported = true, urlPatterns = "/async")
public class AsyncServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) {
        AsyncContext asyncContext = request.startAsync();
        // Process asynchronously
    }
}
\`\`\`

---

## Security Best Practices

### Input Validation

\`\`\`java
String userInput = request.getParameter("input");
if (userInput == null || userInput.isEmpty()) {
    response.sendError(HttpServletResponse.SC_BAD_REQUEST);
    return;
}
// Validate format, length, content
\`\`\`

### SQL Injection Prevention

Always use PreparedStatement with parameterized queries:
\`\`\`java
PreparedStatement pstmt = conn.prepareStatement(
    "SELECT * FROM users WHERE username = ?"
);
pstmt.setString(1, username);
\`\`\`

### XSS Prevention

\`\`\`java
String userContent = request.getParameter("content");
String sanitized = escapeHtml(userContent);
response.getWriter().print(sanitized);
\`\`\`

### Session Security

\`\`\`java
HttpSession session = request.getSession();
session.setAttribute("user", user);
// Set session timeout
session.setMaxInactiveInterval(1800); // 30 minutes
\`\`\`

---

## Common Pitfalls and Solutions

### 1. Thread Safety Issues

**Problem:**
\`\`\`java
public class CounterServlet extends HttpServlet {
    private int count = 0; // Not thread-safe!
    
    protected void doGet(...) {
        count++;
    }
}
\`\`\`

**Solution:**
\`\`\`java
private final AtomicInteger count = new AtomicInteger(0);

protected void doGet(...) {
    count.incrementAndGet();
}
\`\`\`

### 2. Resource Leaks

**Problem:** Not closing database connections, streams.

**Solution:** Use try-with-resources:
\`\`\`java
try (Connection conn = dataSource.getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    // Use resources
} // Auto-closed
\`\`\`

### 3. Improper Exception Handling

**Problem:** Swallowing exceptions or exposing stack traces.

**Solution:**
\`\`\`java
try {
    // Servlet logic
} catch (SQLException e) {
    logger.error("Database error", e);
    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}
\`\`\`

---

## Frequently Asked Questions (FAQs)

### Q1: What is the difference between Servlets and JSP?

**A:** Servlets are Java classes that generate responses programmatically. JSP (JavaServer Pages) are HTML-like files with embedded Java code that compile into servlets. Servlets provide more control and are better for complex logic, while JSP simplifies view generation. Modern applications often use servlets for controllers and JSP/templating engines for views. Learn more about [JSP Introduction](/tutorial/jsp-introduction) for view layer development.

### Q2: How do Servlets handle concurrent requests?

**A:** Servlet containers create a new thread for each request, allowing concurrent processing. Servlets must be thread-safe since multiple threads may access the same servlet instance. Avoid instance variables for request-specific data. Use local variables, method parameters, or thread-safe collections. Servlet containers manage thread pools efficiently, handling thousands of concurrent requests.

### Q3: What is the Servlet lifecycle?

**A:** Servlet lifecycle consists of three phases: initialization (\`init()\`), service (\`service()\` → \`doGet()\`/\`doPost()\`), and destruction (\`destroy()\`). The container calls \`init()\` once when the servlet is first loaded, \`service()\` methods for each request, and \`destroy()\` when the servlet is unloaded. Understanding the lifecycle is crucial for resource management and performance optimization.

### Q4: How do I handle file uploads in Servlets?

**A:** Use \`multipart/form-data\` encoding and parse the request using Apache Commons FileUpload or Servlet 3.0+ \`Part\` API. Servlet 3.0+ provides built-in support: \`Part filePart = request.getPart("file");\`. Always validate file types, sizes, and sanitize filenames. Store uploaded files outside the web application directory for security.

### Q5: What are Servlet filters and when should I use them?

**A:** Servlet filters intercept requests before they reach servlets, enabling cross-cutting concerns like authentication, logging, compression, and encoding. Filters implement the \`Filter\` interface and are configured in \`web.xml\` or using \`@WebFilter\` annotation. Use filters for concerns that apply to multiple servlets, not business logic specific to individual servlets.

### Q6: How do I implement session management in Servlets?

**A:** Use \`HttpSession\` interface: \`HttpSession session = request.getSession();\` creates or retrieves a session. Store data: \`session.setAttribute("key", value);\`. Retrieve data: \`Object value = session.getAttribute("key");\`. Configure session timeout in \`web.xml\` or programmatically. Sessions use cookies (JSESSIONID) or URL rewriting for tracking. For distributed systems, use session replication or external session stores (Redis).

### Q7: What is the difference between forward() and sendRedirect()?

**A:** \`request.getRequestDispatcher("page.jsp").forward(request, response);\` forwards the request server-side (same request, URL unchanged). \`response.sendRedirect("page.jsp");\` sends a redirect response to the client (new request, URL changes). Use forward for internal navigation, redirect for external URLs or after POST requests (prevents duplicate submissions).

### Q8: How do I handle errors and exceptions in Servlets?

**A:** Use try-catch blocks for expected exceptions, send appropriate HTTP status codes (\`response.sendError()\`), and configure error pages in \`web.xml\` for unhandled exceptions. Implement \`@WebServlet\` with error handling or use \`<error-page>\` configuration. Log exceptions for debugging but don't expose sensitive information to clients.

### Q9: Can Servlets be used in microservices architectures?

**A:** Yes, lightweight servlet containers like Jetty and Undertow are commonly used in microservices. Spring Boot embeds Tomcat/Jetty, making servlet-based microservices easy to deploy. However, many modern microservices use reactive frameworks (Spring WebFlux) or JAX-RS (Jersey) for REST APIs. Servlets remain viable for traditional request-response patterns.

### Q10: How do I optimize Servlet performance?

**A:** Performance optimization strategies include: connection pooling for database access, response caching, async processing for long-running operations, proper thread pool configuration, minimizing session data, using CDN for static resources, and profiling to identify bottlenecks. Monitor servlet container metrics (response times, thread usage, memory) for continuous optimization.

---

## Key Takeaways

- **Servlets** are the foundation of Java web development, providing server-side request processing capabilities
- **Servlet containers** (Tomcat, Jetty) manage servlet lifecycle, threading, and resource allocation
- **Thread safety** is critical since servlets handle concurrent requests through shared instances
- **Session management** enables stateful web applications through HttpSession
- **Servlet filters** provide cross-cutting concerns like authentication, logging, and encoding
- **Security best practices** include input validation, SQL injection prevention, and proper session management
- **Performance optimization** through connection pooling, caching, and async processing is essential for scalability
- **Modern frameworks** (Spring MVC) build on servlet foundation, abstracting common patterns

---

## What's Next?

Continue your servlet learning journey with these essential topics:

- **Servlet Lifecycle**: Understand initialization, service, and destruction phases
- **Servlet API**: Master core interfaces (HttpServletRequest, HttpServletResponse, HttpSession)
- **HTTP Request and Response**: Handle request parameters, headers, and response generation
- **Session Management**: Implement user state persistence across requests
- **Servlet Filters**: Implement cross-cutting concerns and request preprocessing
- **Servlet Listeners**: React to application and session lifecycle events
- **JSP Introduction**: Learn JavaServer Pages for view layer development
- **Spring MVC**: Explore modern servlet-based web framework
- **Spring Boot**: Build production-ready web applications with embedded servlet containers

Servlets are the foundation of Java web development. Master servlet fundamentals before advancing to modern frameworks to understand the underlying request-response model and make informed architectural decisions.
`,

- **[Servlet Lifecycle](/tutorial/servlet-lifecycle)** — How Servlets are created and destroyed
- **[Servlet API](/tutorial/servlet-api)** — Core interfaces and classes
- **[HTTP Request and Response](/tutorial/servlet-http-request-response)** — Handle request/response objects
- **[Session Management](/tutorial/servlet-session-management)** — Maintain user state
- **[Filters and Listeners](/tutorial/servlet-filters-listeners)** — Intercept requests and react to events
- **[Servlet Security](/tutorial/servlet-security)** — Secure your web applications
- **[JSP Introduction](/tutorial/jsp-introduction)** — Easier way to write HTML with Java

**Prerequisites:**
- Learn [Core Java](/tutorial/core-java-introduction) fundamentals
- Understand [HTTP & APIs](/tutorial/http-introduction) basics

**Next Level:**
- Use [Spring Boot REST API](/tutorial/spring-boot-rest-api) for modern web development
- Learn [Spring MVC](/tutorial/spring-mvc-introduction) for better architecture

But before moving on, try building a simple Servlet yourself. Create a form, submit it to a Servlet, process the data. That hands-on experience is invaluable.

> **Pro Tip:** Download Tomcat, deploy a simple Servlet, and see it work. There's no substitute for actually running code.
`,
  code: `// Servlet Basics Demo
// Understanding how Servlets work

public class ServletBasicsDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Basics Demo ===");
        System.out.println();
        
        // What is a Servlet?
        System.out.println("WHAT IS A SERVLET?");
        System.out.println("------------------");
        System.out.println("A Java class that handles web requests.");
        System.out.println("Request comes in -> Servlet processes -> Response goes out");
        System.out.println();
        
        // Why Servlets?
        System.out.println("WHY SERVLETS OVER CGI?");
        System.out.println("----------------------");
        System.out.println("CGI:     New PROCESS per request (heavy)");
        System.out.println("Servlet: New THREAD per request (lightweight)");
        System.out.println();
        
        // The flow
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("Browser -> Web Server -> Servlet Container -> Your Servlet");
        System.out.println();
        
        // Key methods
        System.out.println("KEY METHODS:");
        System.out.println("------------");
        System.out.println("doGet()  - Handles GET requests (viewing pages)");
        System.out.println("doPost() - Handles POST requests (form submissions)");
        System.out.println();
        
        // Simple example
        System.out.println("SIMPLE SERVLET:");
        System.out.println("---------------");
        System.out.println("@WebServlet(\\"/hello\\")");
        System.out.println("public class HelloServlet extends HttpServlet {");
        System.out.println("    protected void doGet(HttpServletRequest req,");
        System.out.println("                        HttpServletResponse res) {");
        System.out.println("        res.setContentType(\\"text/html\\");");
        System.out.println("        PrintWriter out = res.getWriter();");
        System.out.println("        out.println(\\"<h1>Hello!</h1>\\");");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        
        // Getting parameters
        System.out.println("GETTING USER INPUT:");
        System.out.println("-------------------");
        System.out.println("String name = request.getParameter(\\"name\\");");
        System.out.println("String email = request.getParameter(\\"email\\");");
        System.out.println();
        
        // Sessions
        System.out.println("SESSIONS (Remembering Users):");
        System.out.println("-----------------------------");
        System.out.println("HttpSession session = request.getSession();");
        System.out.println("session.setAttribute(\\"user\\", \\"john\\");");
        System.out.println("String user = (String) session.getAttribute(\\"user\\");");
        System.out.println();
        
        // Popular containers
        System.out.println("SERVLET CONTAINERS:");
        System.out.println("-------------------");
        System.out.println("- Apache Tomcat (most popular)");
        System.out.println("- Jetty (lightweight)");
        System.out.println("- WildFly (full Java EE)");
        System.out.println();
        
        System.out.println("Ready to build web apps with Java? Let's go!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple Servlet that displays a welcome message',
      hint: 'Extend HttpServlet and override doGet()',
      starterCode: `import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;

@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request,
                        HttpServletResponse response)
            throws IOException {
        
        // Set the content type
        response.setContentType("text/html");
        
        // Get the writer
        PrintWriter out = response.getWriter();
        
        // Write the HTML response
        out.println("<html>");
        out.println("<head><title>Welcome</title></head>");
        out.println("<body>");
        out.println("<h1>Welcome to My First Servlet!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}`
    }
  ]
};

export default servletIntroduction;
