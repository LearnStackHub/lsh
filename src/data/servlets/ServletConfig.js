const servletConfig = {
  id: 'servlet-config',
  title: 'ServletConfig & ServletContext',
  description: 'Configuration objects for servlets and applications',
  content: `
# ServletConfig & ServletContext — Configuration Made Easy

Every servlet needs configuration. Whether it's database URLs, email addresses, or feature flags, you need a way to externalize settings. That's where ServletConfig and ServletContext come in.

---

## ServletConfig vs ServletContext

| Feature | ServletConfig | ServletContext |
|---------|---------------|----------------|
| Scope | Single servlet | Entire application |
| Access | Only that servlet | All servlets |
| Use case | Servlet-specific settings | App-wide settings |
| Defined in | \`<servlet>\` tag | \`<context-param>\` tag |

---

## ServletConfig — Servlet-Specific Configuration

### Defining Init Parameters

**web.xml:**
\`\`\`xml
<servlet>
    <servlet-name>EmailServlet</servlet-name>
    <servlet-class>com.example.EmailServlet</servlet-class>
    <init-param>
        <param-name>smtpHost</param-name>
        <param-value>smtp.gmail.com</param-value>
    </init-param>
    <init-param>
        <param-name>smtpPort</param-name>
        <param-value>587</param-value>
    </init-param>
    <init-param>
        <param-name>adminEmail</param-name>
        <param-value>admin@company.com</param-value>
    </init-param>
</servlet>
\`\`\`

### Using Annotations

\`\`\`java
@WebServlet(
    urlPatterns = "/email",
    initParams = {
        @WebInitParam(name = "smtpHost", value = "smtp.gmail.com"),
        @WebInitParam(name = "smtpPort", value = "587"),
        @WebInitParam(name = "adminEmail", value = "admin@company.com")
    }
)
public class EmailServlet extends HttpServlet {
    // ...
}
\`\`\`

### Accessing Init Parameters

\`\`\`java
public class EmailServlet extends HttpServlet {
    private String smtpHost;
    private int smtpPort;
    private String adminEmail;
    
    @Override
    public void init() throws ServletException {
        ServletConfig config = getServletConfig();
        
        // Get individual parameters
        smtpHost = config.getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(config.getInitParameter("smtpPort"));
        adminEmail = config.getInitParameter("adminEmail");
        
        // Or iterate all parameters
        Enumeration<String> names = config.getInitParameterNames();
        while (names.hasMoreElements()) {
            String name = names.nextElement();
            String value = config.getInitParameter(name);
            System.out.println(name + " = " + value);
        }
    }
}
\`\`\`

---

## ServletContext — Application-Wide Configuration

### Defining Context Parameters

**web.xml:**
\`\`\`xml
<web-app>
    <context-param>
        <param-name>appName</param-name>
        <param-value>My E-Commerce App</param-value>
    </context-param>
    <context-param>
        <param-name>dbUrl</param-name>
        <param-value>jdbc:mysql://localhost:3306/ecommerce</param-value>
    </context-param>
    <context-param>
        <param-name>maxUploadSize</param-name>
        <param-value>10485760</param-value>
    </context-param>
</web-app>
\`\`\`

### Accessing Context Parameters

\`\`\`java
public class AppServlet extends HttpServlet {
    
    @Override
    public void init() throws ServletException {
        ServletContext context = getServletContext();
        
        // Get context parameters
        String appName = context.getInitParameter("appName");
        String dbUrl = context.getInitParameter("dbUrl");
        
        System.out.println("Application: " + appName);
        System.out.println("Database: " + dbUrl);
    }
}
\`\`\`

---

## ServletContext Capabilities

### 1. Application Attributes

\`\`\`java
// Set application-wide data
ServletContext context = getServletContext();

// Store shared objects
context.setAttribute("connectionPool", connectionPool);
context.setAttribute("cacheManager", cacheManager);
context.setAttribute("visitorCount", 0);

// Retrieve in any servlet
ConnectionPool pool = (ConnectionPool) context.getAttribute("connectionPool");

// Remove when done
context.removeAttribute("tempData");
\`\`\`

### 2. Real Path

\`\`\`java
// Get actual file system path
String configPath = context.getRealPath("/WEB-INF/config.properties");
String uploadPath = context.getRealPath("/uploads");

// Load properties file
Properties props = new Properties();
props.load(new FileInputStream(configPath));
\`\`\`

### 3. Resource Access

\`\`\`java
// Get resource as stream
InputStream is = context.getResourceAsStream("/WEB-INF/data.xml");

// Get resource URL
URL url = context.getResource("/images/logo.png");
\`\`\`

### 4. Request Dispatcher

\`\`\`java
// Forward to another resource
RequestDispatcher dispatcher = context.getRequestDispatcher("/result.jsp");
dispatcher.forward(request, response);
\`\`\`

### 5. Logging

\`\`\`java
// Log to server log
context.log("Application started");
context.log("Error occurred", exception);
\`\`\`

---

## Real-World Example: Database Configuration

\`\`\`java
@WebServlet("/products")
public class ProductServlet extends HttpServlet {
    private DataSource dataSource;
    
    @Override
    public void init() throws ServletException {
        ServletContext context = getServletContext();
        
        // Get database configuration
        String dbUrl = context.getInitParameter("dbUrl");
        String dbUser = context.getInitParameter("dbUser");
        String dbPassword = context.getInitParameter("dbPassword");
        
        // Check if connection pool already exists
        dataSource = (DataSource) context.getAttribute("dataSource");
        
        if (dataSource == null) {
            // Create connection pool
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(dbUrl);
            config.setUsername(dbUser);
            config.setPassword(dbPassword);
            
            dataSource = new HikariDataSource(config);
            
            // Share with other servlets
            context.setAttribute("dataSource", dataSource);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try (Connection conn = dataSource.getConnection()) {
            // Use connection
        }
    }
}
\`\`\`

---

## Real-World Example: Feature Flags

\`\`\`java
@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
    private boolean newCheckoutEnabled;
    private boolean paypalEnabled;
    private boolean stripeEnabled;
    
    @Override
    public void init() throws ServletException {
        ServletConfig config = getServletConfig();
        
        // Read feature flags
        newCheckoutEnabled = Boolean.parseBoolean(
            config.getInitParameter("newCheckoutEnabled"));
        paypalEnabled = Boolean.parseBoolean(
            config.getInitParameter("paypalEnabled"));
        stripeEnabled = Boolean.parseBoolean(
            config.getInitParameter("stripeEnabled"));
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        if (newCheckoutEnabled) {
            // Use new checkout flow
            processNewCheckout(request, response);
        } else {
            // Use legacy checkout
            processLegacyCheckout(request, response);
        }
    }
}
\`\`\`

---

## Best Practices

### 1. Use Context for Shared Resources

\`\`\`java
// Good: Share expensive resources
context.setAttribute("connectionPool", pool);
context.setAttribute("cacheManager", cache);

// Bad: Create per-servlet
private ConnectionPool pool = new ConnectionPool(); // Wasteful!
\`\`\`

### 2. Initialize in Listeners

\`\`\`java
@WebListener
public class AppInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        
        // Initialize shared resources
        ConnectionPool pool = new ConnectionPool();
        context.setAttribute("connectionPool", pool);
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Cleanup
        ConnectionPool pool = (ConnectionPool) 
            sce.getServletContext().getAttribute("connectionPool");
        pool.close();
    }
}
\`\`\`

### 3. Externalize Configuration

\`\`\`java
// Load from properties file
public void init() throws ServletException {
    String configPath = getServletContext().getRealPath("/WEB-INF/app.properties");
    Properties props = new Properties();
    props.load(new FileInputStream(configPath));
    
    // Use properties
    String dbUrl = props.getProperty("db.url");
}
\`\`\`

---

## Real-World Applications

### Application Configuration Management
Enterprise applications use ServletConfig and ServletContext for managing configuration settings. ServletConfig handles servlet-specific settings, while ServletContext manages application-wide configuration shared across all servlets.

**Implementation Example:**
- Database connection strings via ServletContext
- Feature flags and application settings
- External service endpoints and API keys
- Environment-specific configuration (dev, test, prod)

### Resource Sharing
Applications use ServletContext to share expensive resources like connection pools, cache managers, and service clients across all servlets. This ensures efficient resource usage and consistent application state.

**Implementation Example:**
- Shared database connection pools
- Application-wide cache managers
- Shared configuration objects
- Global service clients

### Multi-Tenant Applications
Multi-tenant applications use ServletContext to store tenant-specific configuration and resources. Context attributes enable servlets to access tenant information and resources efficiently.

**Implementation Example:**
- Tenant-specific database connections
- Per-tenant configuration settings
- Shared tenant resources
- Tenant isolation and management

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using ServletConfig for Application-Wide Settings
**Problem:** ServletConfig is servlet-specific, not accessible to other servlets.

**Solution:** Use ServletContext for shared settings:

\`\`\`java
// GOOD - Application-wide via ServletContext
ServletContext context = getServletContext();
context.setAttribute("dbUrl", "jdbc:mysql://localhost/mydb");

// BAD - Servlet-specific via ServletConfig
// Other servlets can't access this!
String dbUrl = getServletConfig().getInitParameter("dbUrl");
\`\`\`

### Mistake 2: Not Initializing Context in Listeners
**Problem:** Initializing context in servlet init() may be too late or inefficient.

**Solution:** Initialize in ServletContextListener:

\`\`\`java
// GOOD - Initialize in listener
@WebListener
public class AppInitializer implements ServletContextListener {
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        // Initialize shared resources
    }
}

// BAD - Initialize in servlet
public void init() {
    getServletContext().setAttribute("pool", pool);  // May be too late
}
\`\`\`

### Mistake 3: Not Externalizing Configuration
**Problem:** Hardcoding configuration in code makes deployment difficult.

**Solution:** Use external configuration files:

\`\`\`java
// GOOD - External configuration
String configPath = context.getRealPath("/WEB-INF/config.properties");
Properties props = new Properties();
props.load(new FileInputStream(configPath));

// BAD - Hardcoded
String dbUrl = "jdbc:mysql://localhost/mydb";  // Hard to change!
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the difference between ServletConfig and ServletContext?

ServletConfig provides servlet-specific configuration accessible only to that servlet, while ServletContext provides application-wide configuration accessible to all servlets. Use ServletConfig for servlet-specific settings, ServletContext for shared application settings. ServletConfig is defined in \`<servlet>\` tags, ServletContext in \`<context-param>\` tags.

### How do I access ServletConfig in a servlet?

Access ServletConfig using \`getServletConfig()\` method:

\`\`\`java
String value = getServletConfig().getInitParameter("paramName");
\`\`\`

Or directly using \`getInitParameter()\` (which calls getServletConfig() internally).

### How do I access ServletContext in a servlet?

Access ServletContext using \`getServletContext()\` method:

\`\`\`java
String value = getServletContext().getInitParameter("paramName");
Object attr = getServletContext().getAttribute("attrName");
\`\`\`

ServletContext is available throughout the application.

### How do I set context parameters in web.xml?

Define context parameters in \`<context-param>\` tags:

\`\`\`xml
<context-param>
    <param-name>dbUrl</param-name>
    <param-value>jdbc:mysql://localhost/mydb</param-value>
</context-param>
\`\`\`

Access via \`getServletContext().getInitParameter("dbUrl")\`.

### How do I set servlet init parameters?

Set init parameters in \`<init-param>\` tags within \`<servlet>\`:

\`\`\`xml
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>com.example.MyServlet</servlet-class>
    <init-param>
        <param-name>maxResults</param-name>
        <param-value>100</param-value>
    </init-param>
</servlet>
\`\`\`

Or use \`@WebInitParam\` annotation.

### What is the difference between getInitParameter() and getAttribute()?

\`getInitParameter()\` reads configuration values (strings) defined in web.xml or annotations, while \`getAttribute()\` reads/sets runtime objects (any type) stored in context. Parameters are read-only configuration, attributes are mutable runtime data.

### How do I share data between servlets?

Share data using ServletContext attributes:

\`\`\`java
// In one servlet
getServletContext().setAttribute("sharedData", data);

// In another servlet
Object data = getServletContext().getAttribute("sharedData");
\`\`\`

Context attributes are accessible to all servlets.

### When should I use ServletContextListener?

Use ServletContextListener for: (1) initializing shared resources on application startup, (2) loading configuration, (3) starting background services, and (4) cleanup on application shutdown. Listeners run before servlets initialize, making them ideal for application-wide setup.

### How do I get the real file path from ServletContext?

Use \`getRealPath()\` to convert web-relative paths to file system paths:

\`\`\`java
String realPath = getServletContext().getRealPath("/WEB-INF/config.properties");
File file = new File(realPath);
\`\`\`

This is useful for reading configuration files.

### Can I modify ServletContext attributes?

Yes, ServletContext attributes are mutable. You can set, get, and remove attributes at runtime:

\`\`\`java
context.setAttribute("counter", 0);
int count = (Integer) context.getAttribute("counter");
context.setAttribute("counter", count + 1);
context.removeAttribute("counter");
\`\`\`

However, ensure thread safety when modifying shared attributes.

---

## Key Takeaways

Before proceeding to advanced servlet topics, ensure you understand these configuration fundamentals:

- **ServletConfig** is for servlet-specific configuration
- **ServletContext** is for application-wide configuration
- **Use ServletContext** for shared resources and settings
- **Initialize context** in ServletContextListener for efficiency
- **Externalize configuration** using properties files or context parameters
- **getInitParameter()** reads configuration, **getAttribute()** reads/sets runtime data
- **Context attributes** enable data sharing between servlets
- **getRealPath()** converts web paths to file system paths
- **Thread safety** is important when modifying shared context attributes

---

## What's Next?

Now that you understand ServletConfig and ServletContext, you're ready to explore advanced servlet topics:

### Immediate Next Steps

1. **[Servlet Annotations](/tutorial/servlet-annotations)**: Modern annotation-based configuration
2. **[Servlet Lifecycle](/tutorial/servlet-lifecycle)**: Understand servlet initialization
3. **[Session Management](/tutorial/session-management)**: Learn user session handling
4. **[Filters & Listeners](/tutorial/filters-listeners)**: Intercept requests and handle events

### Advanced Topics

- **Configuration Management**: Advanced configuration patterns
- **Resource Management**: Efficient resource sharing strategies
- **Multi-Tenancy**: Context-based tenant management
- **Application Initialization**: Advanced startup patterns

### Related Tutorials

- **[Servlet Introduction](/tutorial/servlet-introduction)**: Review servlet fundamentals
- **[Servlet API](/tutorial/servlet-api)**: Review core servlet interfaces
- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Modern servlet-based framework
- **[Web Development](/tutorial/web-development-introduction)**: Build complete web applications

Configuration management is essential for maintainable servlet applications. Continue learning about [Servlet Annotations](/tutorial/servlet-annotations) to master modern servlet configuration.
---

## 10 Important ServletConfig & ServletContext Interview Questions

### 1. What is ServletConfig?
**Answer:** It stores initialization parameters specific to a single servlet. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 2. What is ServletContext?
**Answer:** It is application-wide shared context for all servlets in the web app. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 3. Key difference between ServletConfig and ServletContext?
**Answer:** Scope: servlet-level vs application-level. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 4. Where are ServletConfig params usually defined?
**Answer:** In servlet annotation init params or init-param in web.xml. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 5. Where are ServletContext params defined?
**Answer:** In context-param entries in web.xml (or equivalent config). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 6. Can ServletContext share objects between servlets?
**Answer:** Yes, using setAttribute/getAttribute, but thread safety must be handled. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 7. Typical use of ServletConfig?
**Answer:** Per-servlet values like page size, endpoint path, feature switch. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 8. Typical use of ServletContext?
**Answer:** App metadata, shared services, startup configuration, global resources. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 9. Is ServletContext a good place for user session data?
**Answer:** No. User-specific data belongs in HttpSession, not global context. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 10. Why are these objects frequently asked in interviews?
**Answer:** They test your understanding of scope, configuration design, and multi-servlet architecture. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

  `,
  code: `// ServletConfig & ServletContext Demo
// Demonstrates configuration management in servlets

import java.util.*;

public class ServletConfigDemo {
    public static void main(String[] args) {
        System.out.println("=== ServletConfig & ServletContext Demo ===\\n");
        
        // Create application context (application-wide)
        SimulatedServletContext appContext = new SimulatedServletContext();
        
        // Set context parameters (from web.xml <context-param>)
        appContext.setInitParameter("appName", "E-Commerce Platform");
        appContext.setInitParameter("dbUrl", "jdbc:mysql://localhost:3306/ecommerce");
        appContext.setInitParameter("dbUser", "admin");
        appContext.setInitParameter("maxUploadSize", "10485760");
        appContext.setInitParameter("maintenanceMode", "false");
        
        System.out.println("1. SERVLET CONTEXT (Application-Wide)");
        System.out.println("   -----------------------------------");
        System.out.println("   Context Parameters (from web.xml):");
        for (String name : appContext.getInitParameterNames()) {
            System.out.println("     " + name + " = " + appContext.getInitParameter(name));
        }
        System.out.println();
        
        // Create servlet configs (servlet-specific)
        System.out.println("2. SERVLET CONFIG (Servlet-Specific)");
        System.out.println("   ----------------------------------");
        
        // Email Servlet Config
        SimulatedServletConfig emailConfig = new SimulatedServletConfig("EmailServlet", appContext);
        emailConfig.setInitParameter("smtpHost", "smtp.gmail.com");
        emailConfig.setInitParameter("smtpPort", "587");
        emailConfig.setInitParameter("adminEmail", "admin@company.com");
        
        System.out.println("   EmailServlet Config:");
        System.out.println("     Servlet Name: " + emailConfig.getServletName());
        for (String name : emailConfig.getInitParameterNames()) {
            System.out.println("     " + name + " = " + emailConfig.getInitParameter(name));
        }
        System.out.println();
        
        // Payment Servlet Config
        SimulatedServletConfig paymentConfig = new SimulatedServletConfig("PaymentServlet", appContext);
        paymentConfig.setInitParameter("stripeEnabled", "true");
        paymentConfig.setInitParameter("paypalEnabled", "true");
        paymentConfig.setInitParameter("maxRetries", "3");
        
        System.out.println("   PaymentServlet Config:");
        System.out.println("     Servlet Name: " + paymentConfig.getServletName());
        for (String name : paymentConfig.getInitParameterNames()) {
            System.out.println("     " + name + " = " + paymentConfig.getInitParameter(name));
        }
        System.out.println();
        
        // 3. APPLICATION ATTRIBUTES
        System.out.println("3. APPLICATION ATTRIBUTES (Shared State)");
        System.out.println("   --------------------------------------");
        
        // Simulate shared resources
        appContext.setAttribute("visitorCount", 0);
        appContext.setAttribute("connectionPool", "HikariCP[10 connections]");
        appContext.setAttribute("cacheManager", "EhCache[1000 entries]");
        
        System.out.println("   Shared Resources:");
        System.out.println("     connectionPool: " + appContext.getAttribute("connectionPool"));
        System.out.println("     cacheManager: " + appContext.getAttribute("cacheManager"));
        System.out.println("     visitorCount: " + appContext.getAttribute("visitorCount"));
        System.out.println();
        
        // 4. SIMULATING SERVLET INITIALIZATION
        System.out.println("4. SERVLET INITIALIZATION");
        System.out.println("   -----------------------");
        
        EmailServlet emailServlet = new EmailServlet();
        emailServlet.init(emailConfig);
        System.out.println();
        
        PaymentServlet paymentServlet = new PaymentServlet();
        paymentServlet.init(paymentConfig);
        System.out.println();
        
        // 5. UPDATING VISITOR COUNT
        System.out.println("5. SHARED STATE UPDATES");
        System.out.println("   ---------------------");
        
        // Simulate visitors
        for (int i = 0; i < 5; i++) {
            int count = (int) appContext.getAttribute("visitorCount");
            appContext.setAttribute("visitorCount", count + 1);
        }
        System.out.println("   After 5 visitors: " + appContext.getAttribute("visitorCount"));
        System.out.println();
        
        // 6. REAL PATH SIMULATION
        System.out.println("6. REAL PATH (File System Access)");
        System.out.println("   --------------------------------");
        System.out.println("   getRealPath('/WEB-INF/config.properties'):");
        System.out.println("     -> " + appContext.getRealPath("/WEB-INF/config.properties"));
        System.out.println("   getRealPath('/uploads'):");
        System.out.println("     -> " + appContext.getRealPath("/uploads"));
        System.out.println();
        
        // 7. COMPARISON TABLE
        System.out.println("7. COMPARISON: ServletConfig vs ServletContext");
        System.out.println("   ---------------------------------------------");
        System.out.println("   | Feature        | ServletConfig | ServletContext |");
        System.out.println("   |----------------|---------------|----------------|");
        System.out.println("   | Scope          | One servlet   | All servlets   |");
        System.out.println("   | Defined in     | <servlet>     | <context-param>|");
        System.out.println("   | Access         | getServletConfig() | getServletContext() |");
        System.out.println("   | Attributes     | No            | Yes            |");
        System.out.println("   | Use case       | Servlet settings | App settings |");
    }
}

// Simulated ServletContext
class SimulatedServletContext {
    private Map<String, String> initParams = new HashMap<>();
    private Map<String, Object> attributes = new HashMap<>();
    private String contextPath = "/myapp";
    
    public void setInitParameter(String name, String value) {
        initParams.put(name, value);
    }
    
    public String getInitParameter(String name) {
        return initParams.get(name);
    }
    
    public Set<String> getInitParameterNames() {
        return initParams.keySet();
    }
    
    public void setAttribute(String name, Object value) {
        attributes.put(name, value);
    }
    
    public Object getAttribute(String name) {
        return attributes.get(name);
    }
    
    public void removeAttribute(String name) {
        attributes.remove(name);
    }
    
    public String getRealPath(String path) {
        return "/var/www/tomcat/webapps/myapp" + path;
    }
    
    public void log(String message) {
        System.out.println("[SERVER LOG] " + message);
    }
}

// Simulated ServletConfig
class SimulatedServletConfig {
    private String servletName;
    private SimulatedServletContext context;
    private Map<String, String> initParams = new HashMap<>();
    
    public SimulatedServletConfig(String name, SimulatedServletContext context) {
        this.servletName = name;
        this.context = context;
    }
    
    public String getServletName() {
        return servletName;
    }
    
    public SimulatedServletContext getServletContext() {
        return context;
    }
    
    public void setInitParameter(String name, String value) {
        initParams.put(name, value);
    }
    
    public String getInitParameter(String name) {
        return initParams.get(name);
    }
    
    public Set<String> getInitParameterNames() {
        return initParams.keySet();
    }
}

// Simulated Email Servlet
class EmailServlet {
    private String smtpHost;
    private int smtpPort;
    private String adminEmail;
    
    public void init(SimulatedServletConfig config) {
        System.out.println("   Initializing EmailServlet...");
        
        // Get servlet-specific config
        smtpHost = config.getInitParameter("smtpHost");
        smtpPort = Integer.parseInt(config.getInitParameter("smtpPort"));
        adminEmail = config.getInitParameter("adminEmail");
        
        // Get app-wide config
        SimulatedServletContext context = config.getServletContext();
        String appName = context.getInitParameter("appName");
        
        System.out.println("     SMTP Host: " + smtpHost);
        System.out.println("     SMTP Port: " + smtpPort);
        System.out.println("     Admin Email: " + adminEmail);
        System.out.println("     App Name (from context): " + appName);
        System.out.println("   EmailServlet initialized!");
    }
}

// Simulated Payment Servlet
class PaymentServlet {
    private boolean stripeEnabled;
    private boolean paypalEnabled;
    private int maxRetries;
    
    public void init(SimulatedServletConfig config) {
        System.out.println("   Initializing PaymentServlet...");
        
        // Get servlet-specific config
        stripeEnabled = Boolean.parseBoolean(config.getInitParameter("stripeEnabled"));
        paypalEnabled = Boolean.parseBoolean(config.getInitParameter("paypalEnabled"));
        maxRetries = Integer.parseInt(config.getInitParameter("maxRetries"));
        
        // Get shared resources from context
        SimulatedServletContext context = config.getServletContext();
        String dbUrl = context.getInitParameter("dbUrl");
        
        System.out.println("     Stripe Enabled: " + stripeEnabled);
        System.out.println("     PayPal Enabled: " + paypalEnabled);
        System.out.println("     Max Retries: " + maxRetries);
        System.out.println("     Database (from context): " + dbUrl);
        System.out.println("   PaymentServlet initialized!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a configuration manager that loads settings from different sources',
      hint: 'Combine init params, context params, and properties files',
      starterCode: `import java.util.*;

public class ConfigManagerDemo {
    public static void main(String[] args) {
        System.out.println("=== Configuration Manager Demo ===\\n");
        
        ConfigManager config = new ConfigManager();
        
        // Load from different sources
        config.loadContextParams(Map.of(
            "app.name", "MyApp",
            "app.version", "1.0.0",
            "db.url", "jdbc:mysql://localhost:3306/mydb"
        ));
        
        config.loadServletParams(Map.of(
            "cache.enabled", "true",
            "cache.ttl", "3600"
        ));
        
        config.loadProperties(Map.of(
            "email.host", "smtp.gmail.com",
            "email.port", "587"
        ));
        
        // Display all configuration
        System.out.println("All Configuration:");
        config.getAllConfig().forEach((k, v) -> 
            System.out.println("  " + k + " = " + v));
        System.out.println();
        
        // Get typed values
        System.out.println("Typed Access:");
        System.out.println("  app.name (String): " + config.getString("app.name"));
        System.out.println("  cache.enabled (Boolean): " + config.getBoolean("cache.enabled"));
        System.out.println("  cache.ttl (Integer): " + config.getInt("cache.ttl"));
        System.out.println("  email.port (Integer): " + config.getInt("email.port"));
    }
}

class ConfigManager {
    private Map<String, String> config = new HashMap<>();
    
    public void loadContextParams(Map<String, String> params) {
        config.putAll(params);
    }
    
    public void loadServletParams(Map<String, String> params) {
        config.putAll(params);
    }
    
    public void loadProperties(Map<String, String> props) {
        config.putAll(props);
    }
    
    public Map<String, String> getAllConfig() {
        return new HashMap<>(config);
    }
    
    public String getString(String key) {
        return config.get(key);
    }
    
    public boolean getBoolean(String key) {
        return Boolean.parseBoolean(config.get(key));
    }
    
    public int getInt(String key) {
        return Integer.parseInt(config.get(key));
    }
}`
    }
  ]
};

export default servletConfig;
