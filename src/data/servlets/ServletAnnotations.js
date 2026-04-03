const servletAnnotations = {
  id: 'servlet-annotations',
  title: 'Servlet Annotations',
  description: 'Modern annotation-based servlet configuration',
  content: `
# Servlet Annotations — Configuration Without XML

Before Servlet 3.0, every servlet needed to be configured in web.xml. Now, with annotations, you can configure servlets directly in your Java code. It's cleaner, easier to maintain, and keeps configuration close to the code it configures.

---

## @WebServlet — The Main Annotation

### Basic Usage

\`\`\`java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.getWriter().println("Hello, World!");
    }
}
\`\`\`

### Multiple URL Patterns

\`\`\`java
@WebServlet(urlPatterns = {"/users", "/user", "/api/users"})
public class UserServlet extends HttpServlet {
    // Handles all three URLs
}
\`\`\`

### Full Configuration

\`\`\`java
@WebServlet(
    name = "UserServlet",
    urlPatterns = {"/users", "/api/users"},
    loadOnStartup = 1,
    initParams = {
        @WebInitParam(name = "dbUrl", value = "jdbc:mysql://localhost/mydb"),
        @WebInitParam(name = "maxResults", value = "100")
    },
    asyncSupported = true
)
public class UserServlet extends HttpServlet {
    // Full configuration in one place
}
\`\`\`

### @WebServlet Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| name | Servlet name | "UserServlet" |
| urlPatterns | URL mappings | {"/users", "/api/users"} |
| value | Shortcut for urlPatterns | "/users" |
| loadOnStartup | Load order (0+) | 1 |
| initParams | Init parameters | @WebInitParam array |
| asyncSupported | Enable async | true |

---

## @WebFilter — Filter Annotation

### Basic Filter

\`\`\`java
@WebFilter("/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        System.out.println("Request received: " + ((HttpServletRequest) request).getRequestURI());
        chain.doFilter(request, response);
        System.out.println("Response sent");
    }
}
\`\`\`

### Filter with Configuration

\`\`\`java
@WebFilter(
    filterName = "AuthFilter",
    urlPatterns = {"/admin/*", "/api/*"},
    initParams = {
        @WebInitParam(name = "excludePaths", value = "/api/public")
    },
    dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD}
)
public class AuthenticationFilter implements Filter {
    // Filter configuration
}
\`\`\`

---

## @WebListener — Listener Annotation

### Context Listener

\`\`\`java
@WebListener
public class AppInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application starting...");
        // Initialize resources
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Application shutting down...");
        // Cleanup resources
    }
}
\`\`\`

### Session Listener

\`\`\`java
@WebListener
public class SessionTracker implements HttpSessionListener {
    private static int activeSessions = 0;
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        activeSessions++;
        System.out.println("Session created. Active: " + activeSessions);
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        activeSessions--;
        System.out.println("Session destroyed. Active: " + activeSessions);
    }
}
\`\`\`

---

## @WebInitParam — Init Parameters

\`\`\`java
@WebServlet(
    urlPatterns = "/email",
    initParams = {
        @WebInitParam(name = "smtpHost", value = "smtp.gmail.com"),
        @WebInitParam(name = "smtpPort", value = "587"),
        @WebInitParam(name = "timeout", value = "30000")
    }
)
public class EmailServlet extends HttpServlet {
    private String smtpHost;
    private int smtpPort;
    
    @Override
    public void init() throws ServletException {
        smtpHost = getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(getInitParameter("smtpPort"));
    }
}
\`\`\`

---

## @MultipartConfig — File Upload

\`\`\`java
@WebServlet("/upload")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,      // 1 MB
    maxFileSize = 1024 * 1024 * 10,        // 10 MB
    maxRequestSize = 1024 * 1024 * 50,     // 50 MB
    location = "/tmp"
)
public class FileUploadServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();
        
        // Save file
        filePart.write(fileName);
        
        response.getWriter().println("File uploaded: " + fileName);
    }
}
\`\`\`

---

## Annotations vs web.xml

### When to Use Annotations

- New projects
- Simple configurations
- When config should stay with code
- Rapid development

### When to Use web.xml

- Override annotation settings
- Third-party servlets (no source access)
- Environment-specific configuration
- Complex deployment scenarios

### Combining Both

\`\`\`java
// Annotation provides defaults
@WebServlet(
    name = "UserServlet",
    urlPatterns = "/users",
    initParams = @WebInitParam(name = "maxResults", value = "100")
)
public class UserServlet extends HttpServlet { }
\`\`\`

\`\`\`xml
<!-- web.xml can override -->
<servlet>
    <servlet-name>UserServlet</servlet-name>
    <init-param>
        <param-name>maxResults</param-name>
        <param-value>50</param-value>  <!-- Overrides annotation -->
    </init-param>
</servlet>
\`\`\`

---

## Complete Example: E-Commerce Application

\`\`\`java
// Main product servlet
@WebServlet(
    name = "ProductServlet",
    urlPatterns = {"/products", "/products/*"},
    loadOnStartup = 1,
    initParams = {
        @WebInitParam(name = "pageSize", value = "20"),
        @WebInitParam(name = "cacheEnabled", value = "true")
    }
)
public class ProductServlet extends HttpServlet {
    private int pageSize;
    private boolean cacheEnabled;
    
    @Override
    public void init() throws ServletException {
        pageSize = Integer.parseInt(getInitParameter("pageSize"));
        cacheEnabled = Boolean.parseBoolean(getInitParameter("cacheEnabled"));
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Handle product listing
    }
}

// Authentication filter
@WebFilter(
    filterName = "AuthFilter",
    urlPatterns = {"/cart/*", "/checkout/*", "/account/*"}
)
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpSession session = request.getSession(false);
        
        if (session == null || session.getAttribute("user") == null) {
            ((HttpServletResponse) res).sendRedirect("/login");
            return;
        }
        chain.doFilter(req, res);
    }
}

// Application initializer
@WebListener
public class AppInitializer implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Initialize database pool
        // Load configuration
        // Start background services
    }
}
\`\`\`

---

## Real-World Applications

### Modern Web Application Development
Modern Java web applications extensively use servlet annotations for configuration. Annotations eliminate the need for web.xml configuration, making code more maintainable and keeping configuration close to the code it configures.

**Implementation Example:**
- RESTful API endpoints using @WebServlet
- Authentication filters using @WebFilter
- Application lifecycle listeners using @WebListener
- File upload servlets using @MultipartConfig

### Microservices Architecture
Microservices built with Java Servlets use annotations for rapid development and deployment. Annotation-based configuration enables faster development cycles and easier maintenance compared to XML-based configuration.

**Implementation Example:**
- Service endpoints with @WebServlet
- Cross-cutting concerns with @WebFilter
- Health check endpoints
- Service discovery integration

### Rapid Prototyping
Development teams use servlet annotations for rapid prototyping and development. Annotations reduce boilerplate configuration and enable faster iteration cycles.

**Implementation Example:**
- Quick API endpoint creation
- Rapid filter implementation
- Fast listener setup
- Quick configuration changes

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Mixing Annotations and web.xml
**Problem:** Duplicate configuration in both annotations and web.xml causes confusion.

**Solution:** Choose one approach consistently:

\`\`\`java
// GOOD - Use annotations OR web.xml, not both
@WebServlet("/users")
public class UserServlet extends HttpServlet {
    // Configuration in annotation
}

// BAD - Also defined in web.xml
// Causes duplicate configuration!
\`\`\`

### Mistake 2: Not Specifying URL Patterns Correctly
**Problem:** Incorrect URL patterns cause 404 errors.

**Solution:** Use correct URL pattern syntax:

\`\`\`java
// GOOD - Correct patterns
@WebServlet("/users")           // Exact match
@WebServlet("/users/*")         // Path prefix
@WebServlet({"/users", "/api/users"})  // Multiple patterns

// BAD - Incorrect patterns
@WebServlet("users")            // Missing leading slash
@WebServlet("/*users")          // Invalid pattern
\`\`\`

### Mistake 3: Forgetting @MultipartConfig for File Uploads
**Problem:** File uploads fail without @MultipartConfig.

**Solution:** Always add @MultipartConfig for file uploads:

\`\`\`java
// GOOD - With @MultipartConfig
@MultipartConfig
@WebServlet("/upload")
public class UploadServlet extends HttpServlet {
    // Can handle file uploads
}

// BAD - Without @MultipartConfig
@WebServlet("/upload")
public class UploadServlet extends HttpServlet {
    // File uploads will fail!
}
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What are servlet annotations and why use them?

Servlet annotations (like \`@WebServlet\`, \`@WebFilter\`, \`@WebListener\`) provide a way to configure servlets, filters, and listeners directly in Java code without needing web.xml. They're easier to maintain, keep configuration close to code, and reduce boilerplate. Annotations were introduced in Servlet 3.0.

### What is @WebServlet annotation?

\`@WebServlet\` configures a servlet class, specifying URL patterns, initialization parameters, load-on-startup, and other settings. It replaces \`<servlet>\` and \`<servlet-mapping>\` in web.xml. Use it to declare servlets directly in the servlet class.

### How do I specify multiple URL patterns?

Specify multiple URL patterns using the \`urlPatterns\` attribute:

\`\`\`java
@WebServlet(urlPatterns = {"/users", "/api/users", "/user/*"})
\`\`\`

Or use the \`value\` attribute for a single pattern.

### What is @WebFilter annotation?

\`@WebFilter\` configures a filter class, specifying URL patterns, servlet names, or dispatcher types to filter. It replaces \`<filter>\` and \`<filter-mapping>\` in web.xml. Use it to declare filters directly in the filter class.

### What is @WebListener annotation?

\`@WebListener\` marks a class as a servlet listener, eliminating the need to declare it in web.xml. It works with ServletContextListener, HttpSessionListener, and other listener interfaces. Use it to declare listeners directly in the listener class.

### What is @MultipartConfig annotation?

\`@MultipartConfig\` enables a servlet to handle multipart/form-data requests (file uploads). It specifies file size limits, location, and threshold. Without this annotation, servlets cannot handle file uploads. Always use it for file upload servlets.

### Can I use annotations with web.xml?

Yes, you can mix annotations and web.xml, but it's not recommended. Annotations take precedence for servlet/filter/listener declarations, but web.xml can still be used for other configuration. For consistency, choose one approach.

### How do I set init parameters with annotations?

Set init parameters using \`@WebInitParam\`:

\`\`\`java
@WebServlet(
    urlPatterns = "/users",
    initParams = {
        @WebInitParam(name = "maxResults", value = "100"),
        @WebInitParam(name = "cacheEnabled", value = "true")
    }
)
\`\`\`

### What is load-on-startup in annotations?

\`loadOnStartup\` specifies when the servlet should be initialized. Lower numbers initialize first. Use it to ensure servlets are ready when the application starts:

\`\`\`java
@WebServlet(urlPatterns = "/init", loadOnStartup = 1)
\`\`\`

### Do annotations work in all servlet containers?

Annotations work in Servlet 3.0+ containers (Tomcat 7+, Jetty 8+, etc.). Older containers (Servlet 2.5 and earlier) don't support annotations and require web.xml configuration. Always check your container's Servlet API version.

---

## Key Takeaways

Before proceeding to advanced servlet topics, ensure you understand these annotation fundamentals:

- **Annotations replace web.xml** for servlet/filter/listener configuration
- **@WebServlet** configures servlets with URL patterns and settings
- **@WebFilter** configures filters for request interception
- **@WebListener** marks classes as servlet listeners
- **@MultipartConfig** is required for file upload handling
- **@WebInitParam** sets initialization parameters
- **loadOnStartup** controls servlet initialization order
- **Choose one approach** - annotations OR web.xml, not both
- **Annotations require Servlet 3.0+** containers

---

## What's Next?

Now that you understand servlet annotations, you're ready to explore advanced servlet topics:

### Immediate Next Steps

1. **[ServletConfig & ServletContext](/tutorial/servlet-config)**: Review configuration management
2. **[Filters & Listeners](/tutorial/filters-listeners)**: Master request interception and events
3. **[Servlet Security](/tutorial/servlet-security)**: Implement authentication and authorization
4. **[Servlet Project Setup](/tutorial/servlet-project-setup)**: Set up servlet development environment

### Advanced Topics

- **Annotation Processing**: Advanced annotation usage patterns
- **Dynamic Registration**: Programmatic servlet registration
- **Servlet 4.0 Features**: HTTP/2 and server push
- **Modern Frameworks**: Spring Boot and servlet annotations

### Related Tutorials

- **[Servlet Introduction](/tutorial/servlet-introduction)**: Review servlet fundamentals
- **[Servlet API](/tutorial/servlet-api)**: Review core servlet interfaces
- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Modern servlet-based framework
- **[Web Development](/tutorial/web-development-introduction)**: Build complete web applications

Servlet annotations modernize servlet development. Continue learning about [Filters & Listeners](/tutorial/filters-listeners) to master request interception.
---

## 10 Important Servlet Annotations Interview Questions

### 1. Why are servlet annotations used?
**Answer:** They replace much of XML config and keep mapping/config close to source code. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 2. What does @WebServlet do?
**Answer:** Declares servlet metadata such as URL patterns and init params. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 3. How to map multiple URLs with annotations?
**Answer:** Use @WebServlet(urlPatterns = {"/a", "/b"}). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 4. What is loadOnStartup in @WebServlet?
**Answer:** It forces servlet initialization at server startup with priority order. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 5. What does @WebFilter provide?
**Answer:** Annotation-based filter registration and URL mapping. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 6. What does @WebListener provide?
**Answer:** Annotation-based registration for listener classes. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 7. When is XML still preferred over annotations?
**Answer:** For centralized control, environment-specific overrides, or large legacy apps. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 8. Can annotations and XML coexist?
**Answer:** Yes, both can be used together in the same application. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 9. Are annotations compile-time or runtime config?
**Answer:** They are metadata read by container at deployment/runtime initialization. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 10. Interview one-liner on annotations?
**Answer:** “Use annotations for clean local config; use XML when centralized control is required.” In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

  `,
  code: `// Servlet Annotations Demo
// Demonstrates annotation-based configuration

import java.util.*;

public class ServletAnnotationsDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Annotations Demo ===\\n");
        
        // Simulate annotation processing
        AnnotationProcessor processor = new AnnotationProcessor();
        
        // 1. @WEBSERVLET ANNOTATION
        System.out.println("1. @WebServlet ANNOTATION");
        System.out.println("   -----------------------");
        
        // Simulate servlet with annotations
        WebServletConfig helloConfig = new WebServletConfig();
        helloConfig.name = "HelloServlet";
        helloConfig.urlPatterns = new String[]{"/hello", "/hi"};
        helloConfig.loadOnStartup = 1;
        
        processor.registerServlet("HelloServlet", helloConfig);
        System.out.println();
        
        // Servlet with init params
        WebServletConfig userConfig = new WebServletConfig();
        userConfig.name = "UserServlet";
        userConfig.urlPatterns = new String[]{"/users", "/api/users"};
        userConfig.loadOnStartup = 2;
        userConfig.initParams.put("dbUrl", "jdbc:mysql://localhost/mydb");
        userConfig.initParams.put("maxResults", "100");
        userConfig.asyncSupported = true;
        
        processor.registerServlet("UserServlet", userConfig);
        System.out.println();
        
        // 2. @WEBFILTER ANNOTATION
        System.out.println("2. @WebFilter ANNOTATION");
        System.out.println("   ----------------------");
        
        WebFilterConfig loggingFilter = new WebFilterConfig();
        loggingFilter.filterName = "LoggingFilter";
        loggingFilter.urlPatterns = new String[]{"/*"};
        
        processor.registerFilter(loggingFilter);
        System.out.println();
        
        WebFilterConfig authFilter = new WebFilterConfig();
        authFilter.filterName = "AuthFilter";
        authFilter.urlPatterns = new String[]{"/admin/*", "/api/*"};
        authFilter.initParams.put("excludePaths", "/api/public,/api/health");
        
        processor.registerFilter(authFilter);
        System.out.println();
        
        // 3. @WEBLISTENER ANNOTATION
        System.out.println("3. @WebListener ANNOTATION");
        System.out.println("   ------------------------");
        
        processor.registerListener("AppInitializer", "ServletContextListener");
        processor.registerListener("SessionTracker", "HttpSessionListener");
        processor.registerListener("RequestLogger", "ServletRequestListener");
        System.out.println();
        
        // 4. @MULTIPARTCONFIG ANNOTATION
        System.out.println("4. @MultipartConfig ANNOTATION");
        System.out.println("   ----------------------------");
        
        MultipartConfig uploadConfig = new MultipartConfig();
        uploadConfig.fileSizeThreshold = 1024 * 1024;  // 1 MB
        uploadConfig.maxFileSize = 1024 * 1024 * 10;   // 10 MB
        uploadConfig.maxRequestSize = 1024 * 1024 * 50; // 50 MB
        uploadConfig.location = "/tmp/uploads";
        
        processor.registerMultipartServlet("FileUploadServlet", uploadConfig);
        System.out.println();
        
        // 5. ANNOTATION VS WEB.XML COMPARISON
        System.out.println("5. ANNOTATION VS WEB.XML");
        System.out.println("   ----------------------");
        System.out.println("   | Feature          | Annotation | web.xml |");
        System.out.println("   |------------------|------------|---------|");
        System.out.println("   | Location         | In code    | Separate|");
        System.out.println("   | Compile-time     | Yes        | No      |");
        System.out.println("   | Override         | No         | Yes     |");
        System.out.println("   | Third-party      | No         | Yes     |");
        System.out.println("   | Environment-spec | Hard       | Easy    |");
        System.out.println();
        
        // 6. SIMULATED SERVLET CONTAINER
        System.out.println("6. SIMULATED CONTAINER STARTUP");
        System.out.println("   ----------------------------");
        processor.startContainer();
        System.out.println();
        
        // 7. SIMULATED REQUEST HANDLING
        System.out.println("7. SIMULATED REQUEST HANDLING");
        System.out.println("   ---------------------------");
        processor.handleRequest("/hello");
        processor.handleRequest("/users?id=123");
        processor.handleRequest("/admin/dashboard");
    }
}

// Simulated @WebServlet configuration
class WebServletConfig {
    String name;
    String[] urlPatterns;
    int loadOnStartup = -1;
    Map<String, String> initParams = new HashMap<>();
    boolean asyncSupported = false;
}

// Simulated @WebFilter configuration
class WebFilterConfig {
    String filterName;
    String[] urlPatterns;
    Map<String, String> initParams = new HashMap<>();
}

// Simulated @MultipartConfig
class MultipartConfig {
    int fileSizeThreshold;
    long maxFileSize;
    long maxRequestSize;
    String location;
}

// Annotation processor (simulates container)
class AnnotationProcessor {
    private List<WebServletConfig> servlets = new ArrayList<>();
    private List<WebFilterConfig> filters = new ArrayList<>();
    private List<String[]> listeners = new ArrayList<>();
    
    public void registerServlet(String className, WebServletConfig config) {
        servlets.add(config);
        System.out.println("   Registered servlet: " + config.name);
        System.out.println("     URL patterns: " + Arrays.toString(config.urlPatterns));
        System.out.println("     Load on startup: " + config.loadOnStartup);
        if (!config.initParams.isEmpty()) {
            System.out.println("     Init params:");
            config.initParams.forEach((k, v) -> 
                System.out.println("       " + k + " = " + v));
        }
        if (config.asyncSupported) {
            System.out.println("     Async supported: true");
        }
    }
    
    public void registerFilter(WebFilterConfig config) {
        filters.add(config);
        System.out.println("   Registered filter: " + config.filterName);
        System.out.println("     URL patterns: " + Arrays.toString(config.urlPatterns));
        if (!config.initParams.isEmpty()) {
            System.out.println("     Init params:");
            config.initParams.forEach((k, v) -> 
                System.out.println("       " + k + " = " + v));
        }
    }
    
    public void registerListener(String className, String type) {
        listeners.add(new String[]{className, type});
        System.out.println("   Registered listener: " + className + " (" + type + ")");
    }
    
    public void registerMultipartServlet(String name, MultipartConfig config) {
        System.out.println("   Registered multipart servlet: " + name);
        System.out.println("     File size threshold: " + formatSize(config.fileSizeThreshold));
        System.out.println("     Max file size: " + formatSize(config.maxFileSize));
        System.out.println("     Max request size: " + formatSize(config.maxRequestSize));
        System.out.println("     Location: " + config.location);
    }
    
    private String formatSize(long bytes) {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)) + " MB";
        } else if (bytes >= 1024) {
            return (bytes / 1024) + " KB";
        }
        return bytes + " bytes";
    }
    
    public void startContainer() {
        System.out.println("   Starting servlet container...");
        
        // Initialize listeners
        System.out.println("   Initializing listeners:");
        for (String[] listener : listeners) {
            System.out.println("     - " + listener[0] + " initialized");
        }
        
        // Load servlets by loadOnStartup order
        System.out.println("   Loading servlets:");
        servlets.stream()
            .filter(s -> s.loadOnStartup >= 0)
            .sorted((a, b) -> a.loadOnStartup - b.loadOnStartup)
            .forEach(s -> System.out.println("     - " + s.name + " loaded (order: " + s.loadOnStartup + ")"));
        
        System.out.println("   Container started!");
    }
    
    public void handleRequest(String url) {
        System.out.println("   Request: " + url);
        
        // Check filters
        for (WebFilterConfig filter : filters) {
            for (String pattern : filter.urlPatterns) {
                if (matchesPattern(url, pattern)) {
                    System.out.println("     -> Filter: " + filter.filterName);
                    break;
                }
            }
        }
        
        // Find servlet
        for (WebServletConfig servlet : servlets) {
            for (String pattern : servlet.urlPatterns) {
                if (matchesPattern(url, pattern)) {
                    System.out.println("     -> Servlet: " + servlet.name);
                    return;
                }
            }
        }
        System.out.println("     -> 404 Not Found");
    }
    
    private boolean matchesPattern(String url, String pattern) {
        if (pattern.equals("/*")) return true;
        if (pattern.endsWith("/*")) {
            String prefix = pattern.substring(0, pattern.length() - 2);
            return url.startsWith(prefix);
        }
        return url.startsWith(pattern.split("\\\\?")[0]);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an annotation processor that validates servlet configurations',
      hint: 'Check for valid URL patterns and required attributes',
      starterCode: `import java.util.*;

public class AnnotationValidatorDemo {
    public static void main(String[] args) {
        System.out.println("=== Annotation Validator Demo ===\\n");
        
        AnnotationValidator validator = new AnnotationValidator();
        
        // Test 1: Valid servlet
        System.out.println("1. Valid Servlet:");
        ServletAnnotation valid = new ServletAnnotation();
        valid.name = "UserServlet";
        valid.urlPatterns = new String[]{"/users", "/api/users"};
        valid.loadOnStartup = 1;
        validator.validate(valid);
        System.out.println();
        
        // Test 2: Missing URL pattern
        System.out.println("2. Missing URL Pattern:");
        ServletAnnotation noUrl = new ServletAnnotation();
        noUrl.name = "BadServlet";
        noUrl.urlPatterns = new String[]{};
        validator.validate(noUrl);
        System.out.println();
        
        // Test 3: Invalid URL pattern
        System.out.println("3. Invalid URL Pattern:");
        ServletAnnotation badUrl = new ServletAnnotation();
        badUrl.name = "BadUrlServlet";
        badUrl.urlPatterns = new String[]{"users"};  // Missing leading /
        validator.validate(badUrl);
        System.out.println();
        
        // Test 4: Missing name
        System.out.println("4. Missing Name:");
        ServletAnnotation noName = new ServletAnnotation();
        noName.urlPatterns = new String[]{"/test"};
        validator.validate(noName);
    }
}

class ServletAnnotation {
    String name;
    String[] urlPatterns;
    int loadOnStartup = -1;
}

class AnnotationValidator {
    public void validate(ServletAnnotation annotation) {
        List<String> errors = new ArrayList<>();
        
        // Check name
        if (annotation.name == null || annotation.name.isEmpty()) {
            errors.add("Servlet name is required");
        }
        
        // Check URL patterns
        if (annotation.urlPatterns == null || annotation.urlPatterns.length == 0) {
            errors.add("At least one URL pattern is required");
        } else {
            for (String pattern : annotation.urlPatterns) {
                if (!pattern.startsWith("/")) {
                    errors.add("URL pattern must start with /: " + pattern);
                }
            }
        }
        
        // Print results
        if (errors.isEmpty()) {
            System.out.println("   VALID: " + annotation.name);
            System.out.println("   URL patterns: " + Arrays.toString(annotation.urlPatterns));
        } else {
            System.out.println("   INVALID:");
            errors.forEach(e -> System.out.println("   - " + e));
        }
    }
}`
    }
  ]
};

export default servletAnnotations;
