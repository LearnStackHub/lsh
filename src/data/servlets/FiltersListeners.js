const filtersListeners = {
  id: 'filters-listeners',
  title: 'Filters & Listeners',
  description: 'Intercepting requests and responding to events',
  content: `
# Filters & Listeners — The Invisible Helpers

Filters and listeners work behind the scenes. Filters intercept requests before they reach servlets, while listeners respond to application events. Together, they handle cross-cutting concerns like logging, authentication, and resource management.

---

## Filters — Request Interceptors

### How Filters Work

\`\`\`
Browser → Filter1 → Filter2 → Filter3 → Servlet
         ←         ←         ←         ←
\`\`\`

Filters form a chain. Each filter can:
- Process the request before passing it on
- Process the response on the way back
- Block the request entirely

### Creating a Filter

\`\`\`java
@WebFilter("/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("LoggingFilter initialized");
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        
        // Before servlet
        long startTime = System.currentTimeMillis();
        System.out.println("Request: " + req.getMethod() + " " + req.getRequestURI());
        
        // Pass to next filter or servlet
        chain.doFilter(request, response);
        
        // After servlet
        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Response time: " + duration + "ms");
    }
    
    @Override
    public void destroy() {
        System.out.println("LoggingFilter destroyed");
    }
}
\`\`\`

### Authentication Filter

\`\`\`java
@WebFilter(urlPatterns = {"/admin/*", "/api/*"})
public class AuthenticationFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);
        
        // Check if user is logged in
        if (session == null || session.getAttribute("user") == null) {
            res.sendRedirect(req.getContextPath() + "/login");
            return;  // Don't continue chain
        }
        
        // User is authenticated, continue
        chain.doFilter(request, response);
    }
}
\`\`\`

### CORS Filter

\`\`\`java
@WebFilter("/api/*")
public class CorsFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletResponse res = (HttpServletResponse) response;
        
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Max-Age", "3600");
        
        chain.doFilter(request, response);
    }
}
\`\`\`

### Compression Filter

\`\`\`java
@WebFilter("/*")
public class CompressionFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        String acceptEncoding = req.getHeader("Accept-Encoding");
        
        if (acceptEncoding != null && acceptEncoding.contains("gzip")) {
            GzipResponseWrapper wrappedResponse = new GzipResponseWrapper(res);
            chain.doFilter(request, wrappedResponse);
            wrappedResponse.finish();
        } else {
            chain.doFilter(request, response);
        }
    }
}
\`\`\`

---

## Listeners — Event Handlers

### Types of Listeners

| Listener | Events |
|----------|--------|
| ServletContextListener | Application start/stop |
| HttpSessionListener | Session create/destroy |
| ServletRequestListener | Request start/end |
| ServletContextAttributeListener | Context attribute changes |
| HttpSessionAttributeListener | Session attribute changes |
| ServletRequestAttributeListener | Request attribute changes |

### ServletContextListener — Application Lifecycle

\`\`\`java
@WebListener
public class AppInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application starting...");
        
        ServletContext context = sce.getServletContext();
        
        // Initialize database connection pool
        DataSource dataSource = createDataSource();
        context.setAttribute("dataSource", dataSource);
        
        // Load configuration
        Properties config = loadConfig();
        context.setAttribute("config", config);
        
        // Start background services
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);
        context.setAttribute("scheduler", scheduler);
        
        System.out.println("Application started!");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Application shutting down...");
        
        ServletContext context = sce.getServletContext();
        
        // Close database pool
        DataSource ds = (DataSource) context.getAttribute("dataSource");
        if (ds != null) {
            ((HikariDataSource) ds).close();
        }
        
        // Stop scheduler
        ScheduledExecutorService scheduler = 
            (ScheduledExecutorService) context.getAttribute("scheduler");
        if (scheduler != null) {
            scheduler.shutdown();
        }
        
        System.out.println("Application stopped!");
    }
}
\`\`\`

### HttpSessionListener — Session Tracking

\`\`\`java
@WebListener
public class SessionTracker implements HttpSessionListener {
    private static AtomicInteger activeSessions = new AtomicInteger(0);
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        int count = activeSessions.incrementAndGet();
        System.out.println("Session created: " + se.getSession().getId());
        System.out.println("Active sessions: " + count);
        
        // Update application attribute
        se.getSession().getServletContext()
            .setAttribute("activeSessions", count);
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        int count = activeSessions.decrementAndGet();
        System.out.println("Session destroyed: " + se.getSession().getId());
        System.out.println("Active sessions: " + count);
        
        se.getSession().getServletContext()
            .setAttribute("activeSessions", count);
    }
    
    public static int getActiveSessions() {
        return activeSessions.get();
    }
}
\`\`\`

### ServletRequestListener — Request Logging

\`\`\`java
@WebListener
public class RequestLogger implements ServletRequestListener {
    
    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        HttpServletRequest request = (HttpServletRequest) sre.getServletRequest();
        request.setAttribute("startTime", System.currentTimeMillis());
        
        System.out.println("Request started: " + request.getRequestURI());
    }
    
    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        HttpServletRequest request = (HttpServletRequest) sre.getServletRequest();
        long startTime = (Long) request.getAttribute("startTime");
        long duration = System.currentTimeMillis() - startTime;
        
        System.out.println("Request completed: " + request.getRequestURI() + 
                          " (" + duration + "ms)");
    }
}
\`\`\`

### Attribute Listeners

\`\`\`java
@WebListener
public class SessionAttributeLogger implements HttpSessionAttributeListener {
    
    @Override
    public void attributeAdded(HttpSessionBindingEvent event) {
        System.out.println("Session attribute added: " + 
            event.getName() + " = " + event.getValue());
    }
    
    @Override
    public void attributeRemoved(HttpSessionBindingEvent event) {
        System.out.println("Session attribute removed: " + event.getName());
    }
    
    @Override
    public void attributeReplaced(HttpSessionBindingEvent event) {
        System.out.println("Session attribute replaced: " + 
            event.getName() + " (old: " + event.getValue() + ")");
    }
}
\`\`\`

---

## Real-World Example: E-Commerce Application

\`\`\`java
// Application initialization
@WebListener
public class ECommerceInitializer implements ServletContextListener {
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext ctx = sce.getServletContext();
        
        // Database
        ctx.setAttribute("dataSource", createDataSource());
        
        // Cache
        ctx.setAttribute("productCache", new ProductCache());
        
        // Email service
        ctx.setAttribute("emailService", new EmailService());
    }
}

// Session tracking for analytics
@WebListener
public class ShoppingSessionTracker implements HttpSessionListener {
    
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        session.setAttribute("cart", new ShoppingCart());
        session.setAttribute("visitTime", new Date());
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
        
        // Log abandoned carts
        if (!cart.isEmpty() && !cart.isCheckedOut()) {
            logAbandonedCart(session, cart);
        }
    }
}

// Security filter
@WebFilter(urlPatterns = {"/checkout/*", "/account/*"})
public class SecurityFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        // Check authentication
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            // Save original URL for redirect after login
            session = request.getSession();
            session.setAttribute("redirectUrl", request.getRequestURI());
            response.sendRedirect("/login");
            return;
        }
        
        chain.doFilter(req, res);
    }
}

// Performance monitoring filter
@WebFilter("/*")
public class PerformanceFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        long start = System.currentTimeMillis();
        
        try {
            chain.doFilter(req, res);
        } finally {
            long duration = System.currentTimeMillis() - start;
            HttpServletRequest request = (HttpServletRequest) req;
            
            if (duration > 1000) {  // Log slow requests
                System.out.println("SLOW REQUEST: " + request.getRequestURI() + 
                                  " took " + duration + "ms");
            }
        }
    }
}
\`\`\`
---

## 10 Important Filters & Listeners Interview Questions

### 1. What is a servlet filter?
**Answer:** A component that intercepts requests/responses before or after servlet execution. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 2. Typical use cases for filters?
**Answer:** Authentication, logging, CORS, compression, validation, and rate limiting. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 3. What is FilterChain?
**Answer:** It passes control to next filter or target servlet via chain.doFilter(...). In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 4. What happens if chain.doFilter is not called?
**Answer:** Request processing stops; target servlet is never invoked. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 5. What is a listener in servlets?
**Answer:** Event-driven component that reacts to app/session/request lifecycle events. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 6. Name common listener types.
**Answer:** ServletContextListener, HttpSessionListener, and request attribute listeners. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 7. Filter vs Listener difference?
**Answer:** Filters handle request/response flow; listeners handle lifecycle/event callbacks. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 8. Can filters modify request and response?
**Answer:** Yes, directly or via wrapper classes before passing down the chain. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 9. Why are filters important in architecture?
**Answer:** They centralize cross-cutting concerns and keep servlet code cleaner. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

### 10. Why are listeners useful in enterprise apps?
**Answer:** They manage startup/shutdown tasks, monitoring, and session analytics hooks. In real projects, this directly impacts design decisions, maintainability, and runtime behavior, so interviewers expect both definition and correct usage context. A strong response should include one practical example, one common pitfall, and one best-practice recommendation.

  `,
  code: `// Filters & Listeners Demo
// Demonstrates request filtering and event handling

import java.util.*;

public class FiltersListenersDemo {
    public static void main(String[] args) {
        System.out.println("=== Filters & Listeners Demo ===\\n");
        
        // Create simulated container
        SimulatedContainer container = new SimulatedContainer();
        
        // Register listeners
        container.addListener(new AppInitListener());
        container.addListener(new SessionListener());
        container.addListener(new RequestListener());
        
        // Register filters
        container.addFilter(new LoggingFilter(), "/*");
        container.addFilter(new AuthFilter(), "/admin/*");
        container.addFilter(new CorsFilter(), "/api/*");
        
        // 1. APPLICATION STARTUP
        System.out.println("1. APPLICATION STARTUP");
        System.out.println("   --------------------");
        container.start();
        System.out.println();
        
        // 2. SIMULATE REQUESTS
        System.out.println("2. SIMULATING REQUESTS");
        System.out.println("   --------------------");
        
        // Public request
        System.out.println("\\n   --- Request to /products ---");
        container.handleRequest("/products", null);
        
        // API request (CORS filter)
        System.out.println("\\n   --- Request to /api/users ---");
        container.handleRequest("/api/users", null);
        
        // Admin request without auth
        System.out.println("\\n   --- Request to /admin/dashboard (no auth) ---");
        container.handleRequest("/admin/dashboard", null);
        
        // Admin request with auth
        System.out.println("\\n   --- Request to /admin/dashboard (with auth) ---");
        container.handleRequest("/admin/dashboard", "admin_user");
        System.out.println();
        
        // 3. SESSION EVENTS
        System.out.println("3. SESSION EVENTS");
        System.out.println("   ---------------");
        
        String session1 = container.createSession();
        String session2 = container.createSession();
        container.destroySession(session1);
        System.out.println();
        
        // 4. APPLICATION SHUTDOWN
        System.out.println("4. APPLICATION SHUTDOWN");
        System.out.println("   ---------------------");
        container.stop();
    }
}

// Simulated Container
class SimulatedContainer {
    private List<Object> listeners = new ArrayList<>();
    private List<FilterEntry> filters = new ArrayList<>();
    private Map<String, String> sessions = new HashMap<>();
    private int sessionCounter = 0;
    
    static class FilterEntry {
        SimulatedFilter filter;
        String pattern;
        FilterEntry(SimulatedFilter f, String p) { filter = f; pattern = p; }
    }
    
    public void addListener(Object listener) {
        listeners.add(listener);
    }
    
    public void addFilter(SimulatedFilter filter, String pattern) {
        filters.add(new FilterEntry(filter, pattern));
    }
    
    public void start() {
        System.out.println("   Container starting...");
        
        // Initialize filters
        for (FilterEntry entry : filters) {
            entry.filter.init();
        }
        
        // Notify context listeners
        for (Object listener : listeners) {
            if (listener instanceof AppInitListener) {
                ((AppInitListener) listener).contextInitialized();
            }
        }
        
        System.out.println("   Container started!");
    }
    
    public void stop() {
        System.out.println("   Container stopping...");
        
        // Destroy all sessions
        for (String sessionId : new ArrayList<>(sessions.keySet())) {
            destroySession(sessionId);
        }
        
        // Notify context listeners
        for (Object listener : listeners) {
            if (listener instanceof AppInitListener) {
                ((AppInitListener) listener).contextDestroyed();
            }
        }
        
        // Destroy filters
        for (FilterEntry entry : filters) {
            entry.filter.destroy();
        }
        
        System.out.println("   Container stopped!");
    }
    
    public void handleRequest(String uri, String user) {
        // Notify request listeners - start
        for (Object listener : listeners) {
            if (listener instanceof RequestListener) {
                ((RequestListener) listener).requestInitialized(uri);
            }
        }
        
        // Build filter chain
        List<SimulatedFilter> matchingFilters = new ArrayList<>();
        for (FilterEntry entry : filters) {
            if (matchesPattern(uri, entry.pattern)) {
                matchingFilters.add(entry.filter);
            }
        }
        
        // Execute filter chain
        FilterChain chain = new FilterChain(matchingFilters, uri, user);
        chain.doFilter();
        
        // Notify request listeners - end
        for (Object listener : listeners) {
            if (listener instanceof RequestListener) {
                ((RequestListener) listener).requestDestroyed(uri);
            }
        }
    }
    
    public String createSession() {
        String sessionId = "SESSION_" + (++sessionCounter);
        sessions.put(sessionId, sessionId);
        
        for (Object listener : listeners) {
            if (listener instanceof SessionListener) {
                ((SessionListener) listener).sessionCreated(sessionId);
            }
        }
        
        return sessionId;
    }
    
    public void destroySession(String sessionId) {
        if (sessions.remove(sessionId) != null) {
            for (Object listener : listeners) {
                if (listener instanceof SessionListener) {
                    ((SessionListener) listener).sessionDestroyed(sessionId);
                }
            }
        }
    }
    
    private boolean matchesPattern(String uri, String pattern) {
        if (pattern.equals("/*")) return true;
        if (pattern.endsWith("/*")) {
            return uri.startsWith(pattern.substring(0, pattern.length() - 2));
        }
        return uri.equals(pattern);
    }
}

// Filter Chain
class FilterChain {
    private List<SimulatedFilter> filters;
    private int index = 0;
    private String uri;
    private String user;
    
    FilterChain(List<SimulatedFilter> filters, String uri, String user) {
        this.filters = filters;
        this.uri = uri;
        this.user = user;
    }
    
    public void doFilter() {
        if (index < filters.size()) {
            SimulatedFilter filter = filters.get(index++);
            filter.doFilter(uri, user, this);
        } else {
            // End of chain - servlet would be called here
            System.out.println("      [Servlet] Processing " + uri);
        }
    }
}

// Filter interface
interface SimulatedFilter {
    void init();
    void doFilter(String uri, String user, FilterChain chain);
    void destroy();
}

// Logging Filter
class LoggingFilter implements SimulatedFilter {
    public void init() {
        System.out.println("   [LoggingFilter] Initialized");
    }
    
    public void doFilter(String uri, String user, FilterChain chain) {
        long start = System.currentTimeMillis();
        System.out.println("      [LoggingFilter] Request: " + uri);
        
        chain.doFilter();
        
        long duration = System.currentTimeMillis() - start;
        System.out.println("      [LoggingFilter] Response time: " + duration + "ms");
    }
    
    public void destroy() {
        System.out.println("   [LoggingFilter] Destroyed");
    }
}

// Auth Filter
class AuthFilter implements SimulatedFilter {
    public void init() {
        System.out.println("   [AuthFilter] Initialized");
    }
    
    public void doFilter(String uri, String user, FilterChain chain) {
        System.out.println("      [AuthFilter] Checking authentication...");
        
        if (user == null) {
            System.out.println("      [AuthFilter] BLOCKED - Not authenticated!");
            System.out.println("      [AuthFilter] Redirecting to /login");
            return;  // Don't continue chain
        }
        
        System.out.println("      [AuthFilter] User authenticated: " + user);
        chain.doFilter();
    }
    
    public void destroy() {
        System.out.println("   [AuthFilter] Destroyed");
    }
}

// CORS Filter
class CorsFilter implements SimulatedFilter {
    public void init() {
        System.out.println("   [CorsFilter] Initialized");
    }
    
    public void doFilter(String uri, String user, FilterChain chain) {
        System.out.println("      [CorsFilter] Adding CORS headers");
        System.out.println("        Access-Control-Allow-Origin: *");
        System.out.println("        Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
        
        chain.doFilter();
    }
    
    public void destroy() {
        System.out.println("   [CorsFilter] Destroyed");
    }
}

// Application Listener
class AppInitListener {
    public void contextInitialized() {
        System.out.println("   [AppInitListener] Application starting...");
        System.out.println("   [AppInitListener] Initializing database pool...");
        System.out.println("   [AppInitListener] Loading configuration...");
        System.out.println("   [AppInitListener] Application initialized!");
    }
    
    public void contextDestroyed() {
        System.out.println("   [AppInitListener] Application stopping...");
        System.out.println("   [AppInitListener] Closing database pool...");
        System.out.println("   [AppInitListener] Application destroyed!");
    }
}

// Session Listener
class SessionListener {
    private int activeSessions = 0;
    
    public void sessionCreated(String sessionId) {
        activeSessions++;
        System.out.println("   [SessionListener] Session created: " + sessionId);
        System.out.println("   [SessionListener] Active sessions: " + activeSessions);
    }
    
    public void sessionDestroyed(String sessionId) {
        activeSessions--;
        System.out.println("   [SessionListener] Session destroyed: " + sessionId);
        System.out.println("   [SessionListener] Active sessions: " + activeSessions);
    }
}

// Request Listener
class RequestListener {
    private Map<String, Long> requestTimes = new HashMap<>();
    
    public void requestInitialized(String uri) {
        requestTimes.put(uri, System.currentTimeMillis());
        System.out.println("      [RequestListener] Request started: " + uri);
    }
    
    public void requestDestroyed(String uri) {
        Long startTime = requestTimes.remove(uri);
        if (startTime != null) {
            long duration = System.currentTimeMillis() - startTime;
            System.out.println("      [RequestListener] Request completed: " + uri + " (" + duration + "ms)");
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a rate limiting filter that blocks excessive requests',
      hint: 'Track request counts per IP address with time windows',
      starterCode: `import java.util.*;

public class RateLimitDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Rate Limiting Filter Demo ===\\n");
        
        RateLimitFilter filter = new RateLimitFilter(5, 10000);  // 5 requests per 10 seconds
        filter.init();
        
        String clientIP = "192.168.1.100";
        
        System.out.println("Simulating requests from " + clientIP + ":");
        System.out.println("(Limit: 5 requests per 10 seconds)\\n");
        
        // Simulate 8 rapid requests
        for (int i = 1; i <= 8; i++) {
            System.out.println("Request #" + i + ":");
            boolean allowed = filter.checkRateLimit(clientIP);
            if (allowed) {
                System.out.println("  -> ALLOWED");
            } else {
                System.out.println("  -> BLOCKED (Rate limit exceeded)");
            }
            Thread.sleep(500);  // 500ms between requests
        }
        
        System.out.println("\\nWaiting for rate limit window to reset...");
        Thread.sleep(10000);
        
        System.out.println("\\nRequest after reset:");
        boolean allowed = filter.checkRateLimit(clientIP);
        System.out.println("  -> " + (allowed ? "ALLOWED" : "BLOCKED"));
    }
}

class RateLimitFilter {
    private int maxRequests;
    private long windowMs;
    private Map<String, List<Long>> requestLog = new HashMap<>();
    
    RateLimitFilter(int maxRequests, long windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }
    
    public void init() {
        System.out.println("RateLimitFilter initialized");
        System.out.println("Max requests: " + maxRequests);
        System.out.println("Window: " + windowMs + "ms\\n");
    }
    
    public boolean checkRateLimit(String clientIP) {
        long now = System.currentTimeMillis();
        long windowStart = now - windowMs;
        
        // Get or create request list for this IP
        List<Long> requests = requestLog.computeIfAbsent(clientIP, k -> new ArrayList<>());
        
        // Remove old requests outside the window
        requests.removeIf(time -> time < windowStart);
        
        // Check if under limit
        if (requests.size() < maxRequests) {
            requests.add(now);
            return true;
        }
        
        return false;
    }
}`
    }
  ]
};

export default filtersListeners;
