const servletLifecycle = {
  id: 'servlet-lifecycle',
  title: 'Servlet Lifecycle',
  description: 'Understanding how servlets are born, live, and die',
  content: `
# Servlet Lifecycle — From Birth to Death

Every servlet goes through a predictable lifecycle managed by the servlet container (like Tomcat). Understanding this lifecycle helps you write efficient servlets and avoid common pitfalls.

---

## The Three Phases

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    SERVLET LIFECYCLE                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   1. LOADING & INSTANTIATION                            │
│      └── Container loads servlet class                  │
│      └── Creates single instance                        │
│                                                          │
│   2. INITIALIZATION                                      │
│      └── init() called ONCE                             │
│      └── Read config, setup resources                   │
│                                                          │
│   3. REQUEST HANDLING (repeated)                        │
│      └── service() → doGet()/doPost()                   │
│      └── Called for EVERY request                       │
│                                                          │
│   4. DESTRUCTION                                         │
│      └── destroy() called ONCE                          │
│      └── Cleanup resources                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Phase 1: Loading and Instantiation

When does the container load a servlet?

1. **On first request** — Default behavior (lazy loading)
2. **On startup** — If \`load-on-startup\` is configured
3. **When container decides** — Based on configuration

\`\`\`xml
<!-- Load on startup with priority 1 -->
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>com.example.MyServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
\`\`\`

**Key point:** Only ONE instance of each servlet is created. This instance handles ALL requests.

---

## Phase 2: Initialization — init()

Called exactly ONCE after instantiation:

\`\`\`java
public class MyServlet extends HttpServlet {
    private DatabaseConnection dbConnection;
    
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet initializing...");
        
        // One-time setup
        dbConnection = new DatabaseConnection();
        
        // Read init parameters
        String configValue = getServletConfig().getInitParameter("configKey");
    }
}
\`\`\`

### init() with ServletConfig

\`\`\`java
@Override
public void init(ServletConfig config) throws ServletException {
    super.init(config);  // Important! Call super
    
    String dbUrl = config.getInitParameter("dbUrl");
    String dbUser = config.getInitParameter("dbUser");
}
\`\`\`

**Use init() for:**
- Database connection setup
- Loading configuration
- Initializing expensive resources
- One-time calculations

---

## Phase 3: Request Handling — service()

Called for EVERY request:

\`\`\`
Client Request
      ↓
  service()
      ↓
  ┌─────────────────┐
  │ Check HTTP      │
  │ Method          │
  └────────┬────────┘
           │
     ┌─────┴─────┐
     ↓           ↓
  doGet()    doPost()
     ↓           ↓
  Response    Response
\`\`\`

### The service() Method

\`\`\`java
// You usually don't override this
protected void service(HttpServletRequest req, HttpServletResponse resp) {
    String method = req.getMethod();
    
    if (method.equals("GET")) {
        doGet(req, resp);
    } else if (method.equals("POST")) {
        doPost(req, resp);
    } else if (method.equals("PUT")) {
        doPut(req, resp);
    } else if (method.equals("DELETE")) {
        doDelete(req, resp);
    }
    // ... other methods
}
\`\`\`

### Override doGet() and doPost()

\`\`\`java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<h1>Hello from GET!</h1>");
}

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    
    String username = request.getParameter("username");
    // Process form data
}
\`\`\`

---

## Phase 4: Destruction — destroy()

Called exactly ONCE when servlet is being removed:

\`\`\`java
@Override
public void destroy() {
    System.out.println("Servlet shutting down...");
    
    // Cleanup resources
    if (dbConnection != null) {
        dbConnection.close();
    }
    
    // Release any held resources
    // Save state if needed
}
\`\`\`

**When is destroy() called?**
- Server shutdown
- Application undeployed
- Servlet removed from container

---

## Complete Lifecycle Example

\`\`\`java
public class LifecycleServlet extends HttpServlet {
    private int requestCount = 0;
    
    @Override
    public void init() throws ServletException {
        System.out.println("=== INIT: Servlet created ===");
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        requestCount++;  // Shared across all requests!
        
        System.out.println("=== SERVICE: Request #" + requestCount + " ===");
        System.out.println("Thread: " + Thread.currentThread().getName());
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Request Count: " + requestCount + "</h1>");
    }
    
    @Override
    public void destroy() {
        System.out.println("=== DESTROY: Servlet removed ===");
        System.out.println("Total requests served: " + requestCount);
    }
}
\`\`\`

---

## Thread Safety Warning!

Since ONE servlet instance handles ALL requests:

\`\`\`java
// DANGEROUS! Instance variable shared across threads
public class UnsafeServlet extends HttpServlet {
    private int counter = 0;  // Shared!
    
    protected void doGet(...) {
        counter++;  // Race condition!
    }
}

// SAFE! Local variables are thread-safe
public class SafeServlet extends HttpServlet {
    protected void doGet(...) {
        int counter = 0;  // Each request has its own
        counter++;
    }
}
\`\`\`

**Rules:**
- Avoid instance variables for request-specific data
- Use local variables inside doGet/doPost
- If you must use instance variables, synchronize access

---

## Lifecycle Methods Summary

| Method | Called | Purpose |
|--------|--------|---------|
| init() | Once | Setup resources |
| service() | Every request | Route to doXxx() |
| doGet() | GET requests | Handle GET |
| doPost() | POST requests | Handle POST |
| destroy() | Once | Cleanup resources |

---

## Real-World Example: Connection Pool

\`\`\`java
public class DatabaseServlet extends HttpServlet {
    private DataSource dataSource;
    
    @Override
    public void init() throws ServletException {
        try {
            // Initialize connection pool once
            Context ctx = new InitialContext();
            dataSource = (DataSource) ctx.lookup("java:comp/env/jdbc/mydb");
            System.out.println("Connection pool initialized");
        } catch (NamingException e) {
            throw new ServletException("Cannot initialize database", e);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get connection from pool for each request
        try (Connection conn = dataSource.getConnection()) {
            // Use connection
            // Connection returns to pool automatically
        } catch (SQLException e) {
            throw new ServletException("Database error", e);
        }
    }
    
    @Override
    public void destroy() {
        // Connection pool handles cleanup
        System.out.println("Servlet destroyed");
    }
}
\`\`\`

---

## Real-World Applications

### Database Connection Management
Enterprise applications use servlet lifecycle methods to manage database connection pools. Initialization in \`init()\` ensures connections are ready before handling requests, and cleanup in \`destroy()\` properly closes resources.

**Implementation Example:**
- Initialize connection pool in init()
- Get connections from pool in service methods
- Close pool in destroy()
- Handle connection errors gracefully

### Resource Initialization
Applications use servlet lifecycle for initializing expensive resources like cache managers, configuration loaders, and external service clients. Lifecycle methods ensure resources are ready when needed and cleaned up properly.

**Implementation Example:**
- Initialize configuration in init()
- Load application settings
- Initialize third-party service clients
- Cleanup resources in destroy()

### Application Startup Tasks
Servlet lifecycle enables performing startup tasks like loading data, initializing caches, and starting background services. \`load-on-startup\` configuration ensures servlets initialize when the application starts.

**Implementation Example:**
- Pre-load frequently accessed data
- Initialize application-wide caches
- Start background monitoring services
- Validate configuration on startup

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Initializing Resources in doGet/doPost
**Problem:** Creating expensive resources in request methods causes performance issues.

**Solution:** Initialize in init() method:

\`\`\`java
// GOOD - Initialize in init()
private DataSource dataSource;

@Override
public void init() throws ServletException {
    dataSource = createDataSource();
}

// BAD - Initialize in doGet
protected void doGet(...) {
    DataSource ds = createDataSource();  // Created every request!
}
\`\`\`

### Mistake 2: Not Handling Thread Safety
**Problem:** Instance variables shared across requests can cause race conditions.

**Solution:** Use local variables or synchronize access:

\`\`\`java
// GOOD - Local variable
protected void doGet(...) {
    int count = 0;  // Thread-safe
    count++;
}

// BAD - Shared instance variable
private int count = 0;  // Not thread-safe!
protected void doGet(...) {
    count++;  // Race condition!
}
\`\`\`

### Mistake 3: Not Cleaning Up Resources
**Problem:** Resources not closed in destroy() cause memory leaks.

**Solution:** Always cleanup in destroy():

\`\`\`java
// GOOD - Cleanup in destroy()
private ConnectionPool pool;

@Override
public void destroy() {
    if (pool != null) {
        pool.close();
    }
}

// BAD - No cleanup
// Resources leak when servlet is destroyed
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the servlet lifecycle?

The servlet lifecycle consists of four phases: (1) Loading and instantiation (container loads servlet class), (2) Initialization (\`init()\` called once), (3) Request handling (\`service()\` → \`doGet()\`/\`doPost()\` called for each request), and (4) Destruction (\`destroy()\` called once). Understanding the lifecycle helps write efficient servlets.

### When is init() called?

\`init()\` is called once when the servlet is first loaded. This happens either on the first request (lazy loading) or when the application starts if \`load-on-startup\` is configured. Use \`init()\` for one-time initialization tasks like setting up database connections or loading configuration.

### How many times is service() called?

\`service()\` is called once for each HTTP request. The container calls \`service()\`, which then routes to the appropriate \`doGet()\`, \`doPost()\`, etc. based on the HTTP method. This method handles the actual request processing.

### When is destroy() called?

\`destroy()\` is called once when the servlet is being removed from service, typically when the application is being shut down or the servlet is being reloaded. Use \`destroy()\` for cleanup tasks like closing database connections or saving state.

### What is load-on-startup?

\`load-on-startup\` is a configuration that makes the servlet initialize when the application starts, rather than on the first request. Use it for servlets that need to be ready immediately or perform startup tasks. Lower numbers initialize first.

### How do I ensure thread safety in servlets?

Ensure thread safety by: (1) using local variables instead of instance variables for request-specific data, (2) synchronizing access to shared resources, (3) using thread-safe collections, and (4) avoiding mutable instance variables. Servlets are shared across requests, so instance variables must be thread-safe.

### Can I have multiple instances of a servlet?

No, the servlet container creates only one instance of each servlet class. This single instance handles all requests, which is why thread safety is critical. The container manages the servlet lifecycle and ensures efficient resource usage.

### What happens if init() throws an exception?

If \`init()\` throws a ServletException, the servlet is not initialized and will not handle requests. The container logs the error and the servlet remains unavailable. Always handle initialization errors gracefully and provide meaningful error messages.

### How do I initialize servlets in a specific order?

Use \`load-on-startup\` with different values to control initialization order. Lower values initialize first. For example, \`load-on-startup="1"\` initializes before \`load-on-startup="2"\`. This is useful when servlets depend on each other.

### What's the difference between init() and init(ServletConfig)?

\`init(ServletConfig)\` is the original method that receives ServletConfig. \`init()\` is a convenience method that calls \`init(getServletConfig())\`. Override \`init()\` for simpler code, or \`init(ServletConfig)\` if you need to store the config. Always call \`super.init(config)\` if overriding the config version.

---

## Key Takeaways

Before proceeding to advanced servlet topics, ensure you understand these lifecycle fundamentals:

- **Servlet lifecycle has four phases**: Loading, initialization, request handling, destruction
- **init() is called once** for initialization tasks
- **service()/doGet()/doPost() are called** for each request
- **destroy() is called once** for cleanup
- **Servlets are singletons** - one instance handles all requests
- **Thread safety is critical** - use local variables or synchronize
- **Initialize expensive resources in init()**, not in request methods
- **Cleanup resources in destroy()** to prevent memory leaks
- **load-on-startup** controls when servlets initialize

---

## What's Next?

Now that you understand the servlet lifecycle, you're ready to explore advanced servlet topics:

### Immediate Next Steps

1. **[ServletConfig & ServletContext](/tutorial/servlet-config)**: Configure servlets and applications
2. **[HttpServletRequest & Response](/tutorial/http-request-response)**: Master request/response handling
3. **[Session Management](/tutorial/session-management)**: Learn user session handling
4. **[Servlet API](/tutorial/servlet-api)**: Review core servlet interfaces

### Advanced Topics

- **Thread Safety**: Deep dive into concurrent servlet programming
- **Resource Management**: Advanced resource initialization and cleanup
- **Performance Optimization**: Optimize servlet lifecycle for performance
- **Container Configuration**: Advanced servlet container setup

### Related Tutorials

- **[Servlet Introduction](/tutorial/servlet-introduction)**: Review servlet fundamentals
- **[JSP Introduction](/tutorial/jsp-introduction)**: Combine servlets with JSP
- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Modern servlet-based framework
- **[Web Development](/tutorial/web-development-introduction)**: Build complete web applications

The servlet lifecycle is fundamental to understanding how servlets work. Continue learning about [ServletConfig & ServletContext](/tutorial/servlet-config) to master servlet configuration.
---

## 10 Important Servlet Lifecycle Interview Questions

### 1. What are the main lifecycle methods of a servlet?
**Answer:** init(), service() (or doGet/doPost), and destroy(). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 2. How many times is init() called?
**Answer:** Once per servlet instance, after creation. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 3. How many times is destroy() called?
**Answer:** Once, before the container unloads the servlet. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 4. When is service() called?
**Answer:** For every incoming request mapped to that servlet. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 5. Who controls lifecycle execution?
**Answer:** The servlet container, not application code directly. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 6. Can lifecycle methods run concurrently?
**Answer:** Request methods can run concurrently across threads; lifecycle init/destroy are controlled by container. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 7. Where should expensive resource initialization happen?
**Answer:** In init() (e.g., DB pools, caches, config loading). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 8. Where should cleanup happen?
**Answer:** In destroy() (close connections, stop schedulers, release resources). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 9. What is load-on-startup?
**Answer:** It tells container to initialize servlet during startup instead of first request. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 10. Why is servlet lifecycle important for interviews?
**Answer:** It proves you understand performance, threading, resource management, and stability of web apps. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

  `,
  code: `// Servlet Lifecycle Demo
// Note: This is a simulation - actual servlets run in a container like Tomcat

public class ServletLifecycleDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Lifecycle Demo ===\\n");
        
        // Simulate servlet container behavior
        ServletContainer container = new ServletContainer();
        
        // 1. LOADING AND INSTANTIATION
        System.out.println("1. LOADING AND INSTANTIATION");
        System.out.println("   --------------------------");
        container.loadServlet("MyServlet");
        System.out.println();
        
        // 2. INITIALIZATION
        System.out.println("2. INITIALIZATION");
        System.out.println("   ---------------");
        container.initServlet("MyServlet");
        System.out.println();
        
        // 3. REQUEST HANDLING
        System.out.println("3. REQUEST HANDLING");
        System.out.println("   -----------------");
        
        // Simulate multiple requests
        container.handleRequest("MyServlet", "GET", "/users");
        container.handleRequest("MyServlet", "POST", "/users");
        container.handleRequest("MyServlet", "GET", "/users/1");
        container.handleRequest("MyServlet", "DELETE", "/users/1");
        System.out.println();
        
        // 4. DESTRUCTION
        System.out.println("4. DESTRUCTION");
        System.out.println("   -----------");
        container.destroyServlet("MyServlet");
        System.out.println();
        
        // Summary
        System.out.println("=== LIFECYCLE SUMMARY ===");
        System.out.println("• init() called: 1 time");
        System.out.println("• service() called: 4 times");
        System.out.println("• destroy() called: 1 time");
    }
}

// Simulated Servlet
class SimulatedServlet {
    private String name;
    private int requestCount = 0;
    private boolean initialized = false;
    
    public SimulatedServlet(String name) {
        this.name = name;
        System.out.println("   [" + name + "] Constructor called");
        System.out.println("   Instance created (only ONE instance!)");
    }
    
    public void init() {
        System.out.println("   [" + name + "] init() called");
        System.out.println("   Loading configuration...");
        System.out.println("   Setting up database connection...");
        System.out.println("   Initialization complete!");
        initialized = true;
    }
    
    public void service(String method, String path) {
        requestCount++;
        System.out.println("   [" + name + "] service() - Request #" + requestCount);
        System.out.println("   Method: " + method + ", Path: " + path);
        
        switch (method) {
            case "GET":
                doGet(path);
                break;
            case "POST":
                doPost(path);
                break;
            case "PUT":
                doPut(path);
                break;
            case "DELETE":
                doDelete(path);
                break;
        }
    }
    
    private void doGet(String path) {
        System.out.println("   → doGet() handling GET request");
    }
    
    private void doPost(String path) {
        System.out.println("   → doPost() handling POST request");
    }
    
    private void doPut(String path) {
        System.out.println("   → doPut() handling PUT request");
    }
    
    private void doDelete(String path) {
        System.out.println("   → doDelete() handling DELETE request");
    }
    
    public void destroy() {
        System.out.println("   [" + name + "] destroy() called");
        System.out.println("   Closing database connections...");
        System.out.println("   Releasing resources...");
        System.out.println("   Total requests served: " + requestCount);
        System.out.println("   Servlet destroyed!");
    }
}

// Simulated Servlet Container
class ServletContainer {
    private java.util.Map<String, SimulatedServlet> servlets = new java.util.HashMap<>();
    
    public void loadServlet(String name) {
        System.out.println("   Container loading servlet: " + name);
        SimulatedServlet servlet = new SimulatedServlet(name);
        servlets.put(name, servlet);
    }
    
    public void initServlet(String name) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.init();
        }
    }
    
    public void handleRequest(String name, String method, String path) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.service(method, path);
        }
    }
    
    public void destroyServlet(String name) {
        SimulatedServlet servlet = servlets.get(name);
        if (servlet != null) {
            servlet.destroy();
            servlets.remove(name);
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a servlet that tracks visitor count using lifecycle methods',
      hint: 'Use init() to load count, service() to increment, destroy() to save',
      starterCode: `// Visitor Counter Servlet Simulation

public class VisitorCounterDemo {
    public static void main(String[] args) {
        System.out.println("=== Visitor Counter Servlet ===\\n");
        
        VisitorCounterServlet servlet = new VisitorCounterServlet();
        
        // Lifecycle
        servlet.init();
        
        // Simulate visits
        for (int i = 0; i < 5; i++) {
            servlet.doGet();
        }
        
        servlet.destroy();
    }
}

class VisitorCounterServlet {
    private int visitorCount = 0;
    private String servletName = "VisitorCounter";
    
    public void init() {
        System.out.println("[INIT] " + servletName + " starting...");
        // In real servlet, load count from file/database
        visitorCount = loadCountFromStorage();
        System.out.println("[INIT] Loaded previous count: " + visitorCount);
        System.out.println();
    }
    
    public void doGet() {
        visitorCount++;
        System.out.println("[SERVICE] Visitor #" + visitorCount + " - Welcome!");
        // In real servlet, send HTML response
    }
    
    public void destroy() {
        System.out.println();
        System.out.println("[DESTROY] " + servletName + " shutting down...");
        // In real servlet, save count to file/database
        saveCountToStorage(visitorCount);
        System.out.println("[DESTROY] Saved final count: " + visitorCount);
    }
    
    // Simulated storage methods
    private int loadCountFromStorage() {
        // Simulate loading from file
        return 100; // Pretend we had 100 visitors before
    }
    
    private void saveCountToStorage(int count) {
        // Simulate saving to file
        System.out.println("[STORAGE] Count " + count + " saved to database");
    }
}`
    }
  ]
};

export default servletLifecycle;
