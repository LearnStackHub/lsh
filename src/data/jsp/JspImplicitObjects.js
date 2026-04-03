const jspImplicitObjects = {
  id: 'jsp-implicit-objects',
  title: 'JSP Implicit Objects',
  description: 'Built-in objects available in every JSP',
  content: `
# JSP Implicit Objects — Ready to Use

JSP provides nine implicit objects that are automatically available in every page. You don't need to declare them — they're ready to use in scriptlets and expressions.

---

## The Nine Implicit Objects

| Object | Type | Scope | Description |
|--------|------|-------|-------------|
| request | HttpServletRequest | Request | Client request |
| response | HttpServletResponse | Page | Server response |
| out | JspWriter | Page | Output stream |
| session | HttpSession | Session | User session |
| application | ServletContext | Application | App context |
| config | ServletConfig | Page | Servlet config |
| pageContext | PageContext | Page | Page context |
| page | Object | Page | Current servlet |
| exception | Throwable | Page | Error (error pages) |

---

## request Object

Access everything about the incoming request.

### Getting Parameters

\`\`\`jsp
<%
    String username = request.getParameter("username");
    String[] hobbies = request.getParameterValues("hobbies");
%>
\`\`\`

### Request Information

\`\`\`jsp
<p>Method: <%= request.getMethod() %></p>
<p>URI: <%= request.getRequestURI() %></p>
<p>Query: <%= request.getQueryString() %></p>
<p>Client IP: <%= request.getRemoteAddr() %></p>
\`\`\`

### Headers

\`\`\`jsp
<p>Browser: <%= request.getHeader("User-Agent") %></p>
<p>Content-Type: <%= request.getContentType() %></p>
\`\`\`

### Attributes (for forwarding)

\`\`\`jsp
<%
    User user = (User) request.getAttribute("user");
    request.setAttribute("message", "Hello!");
%>
\`\`\`

---

## response Object

Control the response sent to the client.

### Redirects

\`\`\`jsp
<%
    if (user == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
\`\`\`

### Headers

\`\`\`jsp
<%
    response.setHeader("Cache-Control", "no-cache");
    response.setContentType("text/html; charset=UTF-8");
%>
\`\`\`

### Cookies

\`\`\`jsp
<%
    Cookie cookie = new Cookie("username", " Dattu");
    cookie.setMaxAge(3600);  // 1 hour
    response.addCookie(cookie);
%>
\`\`\`

---

## out Object

Write output to the response.

\`\`\`jsp
<%
    out.println("<p>Hello, World!</p>");
    out.print("No newline");
    out.newLine();
    out.flush();  // Force output
%>
\`\`\`

**Note:** Expressions \`<%= %>\` are usually cleaner than \`out.print()\`.

---

## session Object

Store user-specific data across requests.

### Setting Session Data

\`\`\`jsp
<%
    session.setAttribute("user", user);
    session.setAttribute("cart", new ShoppingCart());
    session.setMaxInactiveInterval(30 * 60);  // 30 minutes
%>
\`\`\`

### Getting Session Data

\`\`\`jsp
<%
    User user = (User) session.getAttribute("user");
    ShoppingCart cart = (ShoppingCart) session.getAttribute("cart");
    String sessionId = session.getId();
%>
\`\`\`

### Invalidating Session

\`\`\`jsp
<%
    session.invalidate();  // Logout
%>
\`\`\`

---

## application Object

Share data across all users and sessions.

\`\`\`jsp
<%
    // Get application-wide data
    Integer visitorCount = (Integer) application.getAttribute("visitorCount");
    if (visitorCount == null) {
        visitorCount = 0;
    }
    application.setAttribute("visitorCount", ++visitorCount);
%>

<p>Total visitors: <%= application.getAttribute("visitorCount") %></p>
\`\`\`

### Application Parameters

\`\`\`jsp
<%
    String dbUrl = application.getInitParameter("dbUrl");
    String appName = application.getInitParameter("appName");
%>
\`\`\`

---

## config Object

Access servlet configuration.

\`\`\`jsp
<%
    String servletName = config.getServletName();
    String initParam = config.getInitParameter("paramName");
%>
\`\`\`

---

## pageContext Object

Access all scopes and provide utility methods.

### Scope Access

\`\`\`jsp
<%
    // Set attributes in different scopes
    pageContext.setAttribute("pageVar", "value", PageContext.PAGE_SCOPE);
    pageContext.setAttribute("requestVar", "value", PageContext.REQUEST_SCOPE);
    pageContext.setAttribute("sessionVar", "value", PageContext.SESSION_SCOPE);
    pageContext.setAttribute("appVar", "value", PageContext.APPLICATION_SCOPE);
    
    // Get from any scope
    Object value = pageContext.findAttribute("someVar");  // Searches all scopes
%>
\`\`\`

### Forward and Include

\`\`\`jsp
<%
    pageContext.forward("other.jsp");
    pageContext.include("header.jsp");
%>
\`\`\`

---

## page Object

Reference to the current servlet instance.

\`\`\`jsp
<%
    String className = page.getClass().getName();
%>
\`\`\`

---

## exception Object

Available only in error pages (\`isErrorPage="true"\`).

\`\`\`jsp
<%@ page isErrorPage="true" %>

<h1>Error Occurred</h1>
<p>Message: <%= exception.getMessage() %></p>
<p>Type: <%= exception.getClass().getName() %></p>

<pre>
<%
    exception.printStackTrace(new java.io.PrintWriter(out));
%>
</pre>
\`\`\`

---

## Scope Hierarchy

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION SCOPE                      │
│  (Shared by all users, all sessions)                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │               SESSION SCOPE                      │    │
│  │  (Shared by one user across requests)           │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │           REQUEST SCOPE                  │    │    │
│  │  │  (Single request, can be forwarded)     │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │         PAGE SCOPE              │    │    │    │
│  │  │  │  (Single page only)             │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Complete Example

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>

<!DOCTYPE html>
<html>
<head>
    <title>Implicit Objects Demo</title>
</head>
<body>
    <h1>JSP Implicit Objects</h1>
    
    <h2>Request Information</h2>
    <ul>
        <li>Method: <%= request.getMethod() %></li>
        <li>URI: <%= request.getRequestURI() %></li>
        <li>Client IP: <%= request.getRemoteAddr() %></li>
        <li>Browser: <%= request.getHeader("User-Agent") %></li>
    </ul>
    
    <h2>Session Information</h2>
    <%
        Integer visits = (Integer) session.getAttribute("visits");
        if (visits == null) visits = 0;
        session.setAttribute("visits", ++visits);
    %>
    <ul>
        <li>Session ID: <%= session.getId() %></li>
        <li>Your visits: <%= visits %></li>
        <li>Created: <%= new Date(session.getCreationTime()) %></li>
    </ul>
    
    <h2>Application Information</h2>
    <%
        Integer totalVisits = (Integer) application.getAttribute("totalVisits");
        if (totalVisits == null) totalVisits = 0;
        application.setAttribute("totalVisits", ++totalVisits);
    %>
    <ul>
        <li>Server: <%= application.getServerInfo() %></li>
        <li>Total site visits: <%= totalVisits %></li>
    </ul>
</body>
</html>
\`\`\`

---

## 10 Important JSP Implicit Objects Interview Questions

### 1. List the JSP implicit objects and what they represent.

**Answer:** The usual nine are **request** (\`HttpServletRequest\`), **response** (\`HttpServletResponse\`), **session** (\`HttpSession\`), **application** (\`ServletContext\`), **out** (\`JspWriter\`), **pageContext** (\`PageContext\`), **config** (\`ServletConfig\`), **page** (the servlet instance, \`this\`), and **exception** (a \`Throwable\`, only on error pages). They exist so the JSP author can access the servlet environment **without** declaring variables. Memorizing the **types** matters because follow-up questions often drill into servlet APIs.

### 2. What concrete types are \`request\` and \`response\`?

**Answer:** In a typical Jakarta Servlet / Java EE stack they are \`javax.servlet.http.HttpServletRequest\` and \`javax.servlet.http.HttpServletResponse\` (package names may be \`jakarta.*\` in newer versions). They expose parameters, headers, cookies, dispatcher APIs, output streams, status codes, and redirects. Connecting JSP implicit objects to **servlet** training proves foundational understanding.

### 3. Why is \`pageContext\` considered powerful?

**Answer:** \`PageContext\` is a façade: it can store and retrieve attributes in **PAGE**, **REQUEST**, **SESSION**, and **APPLICATION** scopes; expose sibling implicit objects; and provide \`forward\` / \`include\` helpers that respect JSP semantics. It is the bridge between **scripting** JSP and higher-level abstractions. Advanced answers mention \`findAttribute\` walking the scope chain—mirroring how **EL** resolves simple names.

### 4. When can you use the \`exception\` implicit object?

**Answer:** Only on a JSP that is designated an **error page** via \`isErrorPage="true"\` (and the container has routed an error there). It represents the **throwable** that caused the failure. Use it to log internally and show a **safe** user message. Never assume \`exception\` exists on ordinary pages.

### 5. Can \`session\` be unavailable on a JSP?

**Answer:** If the page directive sets \`session="false"\`, the container does **not** create or join an \`HttpSession\` for that page, and code should not rely on \`session\` for state. This is done for **stateless** public pages to save memory or cookies. Interviewers may pair this with **REST**-style statelessness.

### 6. Compare \`application\` and \`session\`.

**Answer:** \`application\` is the \`ServletContext\`: **one** per web application deployment, shared by **all** users and threads for **global** configuration or caches (with careful synchronization). \`session\` is \`HttpSession\`: **per browser conversation**, ideal for **shopping carts** or **login** tickets, with a **timeout** and **serialization** concerns in clusters. Misusing \`application\` for user-specific data is a classic bug.

### 7. Should you use \`out\` or \`response.getWriter()\` in a JSP?

**Answer:** Prefer \`out\` (\`JspWriter\`) because it participates in JSP **buffering** and coordinates with tag handlers and the page lifecycle. Calling \`getWriter()\` directly can conflict with JSP’s writer management and cause **IllegalStateException** if mixed improperly. In scriptlet-heavy legacy code, consistency matters more than dogma, but the spec-minded answer is **use \`out\`**.

### 8. What does the \`page\` implicit object refer to?

**Answer:** It is \`this\` in the generated servlet class—the servlet instance itself. Rarely needed except for reflection-style hacks or legacy patterns. Most modern JSPs never reference \`page\` explicitly.

### 9. How does EL resolve a simple name like \`user\`?

**Answer:** EL searches **scoped attributes** in a defined order (conceptually similar to \`pageContext.findAttribute\`): **page**, then **request**, then **session**, then **application**. You can disambiguate with **implicit scope maps** such as \`requestScope.user\`. Mentioning alignment between **implicit objects** and **EL** scopes shows integrated knowledge.

### 10. Why is EL often preferred to scriptlets that call \`request.getAttribute\`?

**Answer:** EL is **concise**, encourages **view-focused** expressions, and applies **coercion** and **null** handling rules that reduce boilerplate and some classes of \`NullPointerException\` in templates. It keeps templates readable for non-Java specialists. The trade-off is you must understand **what** EL can and cannot do (security, method calls, performance of repeated resolution).

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Expression Language** | [JSP Expression Language](/tutorial/jsp-expression-language) |
| **Session usage** | [Session management](/tutorial/session-management) |
| **Servlet API** | [Servlet introduction](/tutorial/servlet-introduction) |
| **HTTP** | [HttpServletRequest & Response](/tutorial/http-request-response) |
| **Scripting** | [JSP scripting elements](/tutorial/jsp-scripting-elements) |

`,
  code: `// JSP Implicit Objects Demo
// Demonstrates the 9 built-in objects

import java.util.*;

public class JspImplicitObjectsDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Implicit Objects Demo ===\\n");
        
        // Create simulated objects
        SimulatedRequest request = new SimulatedRequest();
        SimulatedResponse response = new SimulatedResponse();
        SimulatedSession session = new SimulatedSession();
        SimulatedApplication application = new SimulatedApplication();
        SimulatedPageContext pageContext = new SimulatedPageContext();
        
        // Setup request
        request.setParameter("username", " Dattu");
        request.setParameter("action", "login");
        request.setHeader("User-Agent", "Mozilla/5.0");
        request.setMethod("POST");
        request.setRequestURI("/app/login");
        
        // 1. REQUEST OBJECT
        System.out.println("1. REQUEST OBJECT (HttpServletRequest)");
        System.out.println("   ------------------------------------");
        System.out.println("   Parameters:");
        System.out.println("     username: " + request.getParameter("username"));
        System.out.println("     action: " + request.getParameter("action"));
        System.out.println("   Request Info:");
        System.out.println("     Method: " + request.getMethod());
        System.out.println("     URI: " + request.getRequestURI());
        System.out.println("   Headers:");
        System.out.println("     User-Agent: " + request.getHeader("User-Agent"));
        System.out.println();
        
        // 2. RESPONSE OBJECT
        System.out.println("2. RESPONSE OBJECT (HttpServletResponse)");
        System.out.println("   --------------------------------------");
        response.setContentType("text/html");
        response.setHeader("Cache-Control", "no-cache");
        System.out.println("   Content-Type: " + response.getContentType());
        System.out.println("   Methods: sendRedirect(), addCookie(), setHeader()");
        System.out.println();
        
        // 3. OUT OBJECT
        System.out.println("3. OUT OBJECT (JspWriter)");
        System.out.println("   -----------------------");
        System.out.println("   Methods:");
        System.out.println("     out.print('text')    - Print without newline");
        System.out.println("     out.println('text')  - Print with newline");
        System.out.println("     out.flush()          - Force output");
        System.out.println();
        
        // 4. SESSION OBJECT
        System.out.println("4. SESSION OBJECT (HttpSession)");
        System.out.println("   -----------------------------");
        session.setAttribute("user", "Dattu p");
        session.setAttribute("cart", "ShoppingCart[3 items]");
        System.out.println("   Session ID: " + session.getId());
        System.out.println("   Attributes:");
        System.out.println("     user: " + session.getAttribute("user"));
        System.out.println("     cart: " + session.getAttribute("cart"));
        System.out.println();
        
        // 5. APPLICATION OBJECT
        System.out.println("5. APPLICATION OBJECT (ServletContext)");
        System.out.println("   ------------------------------------");
        application.setAttribute("visitorCount", 1000);
        application.setAttribute("appName", "My Web App");
        System.out.println("   Application attributes:");
        System.out.println("     visitorCount: " + application.getAttribute("visitorCount"));
        System.out.println("     appName: " + application.getAttribute("appName"));
        System.out.println();
        
        // 6. CONFIG OBJECT
        System.out.println("6. CONFIG OBJECT (ServletConfig)");
        System.out.println("   ------------------------------");
        System.out.println("   Methods:");
        System.out.println("     config.getServletName()");
        System.out.println("     config.getInitParameter('name')");
        System.out.println();
        
        // 7. PAGECONTEXT OBJECT
        System.out.println("7. PAGECONTEXT OBJECT");
        System.out.println("   -------------------");
        pageContext.setAttribute("pageVar", "page value", "PAGE");
        pageContext.setAttribute("requestVar", "request value", "REQUEST");
        pageContext.setAttribute("sessionVar", "session value", "SESSION");
        pageContext.setAttribute("appVar", "app value", "APPLICATION");
        
        System.out.println("   Scope constants:");
        System.out.println("     PAGE_SCOPE = 1");
        System.out.println("     REQUEST_SCOPE = 2");
        System.out.println("     SESSION_SCOPE = 3");
        System.out.println("     APPLICATION_SCOPE = 4");
        System.out.println();
        System.out.println("   Attributes by scope:");
        System.out.println("     Page: " + pageContext.getAttribute("pageVar", "PAGE"));
        System.out.println("     Request: " + pageContext.getAttribute("requestVar", "REQUEST"));
        System.out.println("     Session: " + pageContext.getAttribute("sessionVar", "SESSION"));
        System.out.println("     Application: " + pageContext.getAttribute("appVar", "APPLICATION"));
        System.out.println();
        
        // 8. PAGE OBJECT
        System.out.println("8. PAGE OBJECT");
        System.out.println("   ------------");
        System.out.println("   Reference to current servlet instance");
        System.out.println("   Equivalent to 'this' in the generated servlet");
        System.out.println();
        
        // 9. EXCEPTION OBJECT
        System.out.println("9. EXCEPTION OBJECT (Error pages only)");
        System.out.println("   ------------------------------------");
        System.out.println("   Available only when isErrorPage=\\"true\\"");
        System.out.println("   Methods:");
        System.out.println("     exception.getMessage()");
        System.out.println("     exception.getClass().getName()");
        System.out.println("     exception.printStackTrace(out)");
        System.out.println();
        
        // SCOPE HIERARCHY
        System.out.println("SCOPE HIERARCHY");
        System.out.println("---------------");
        System.out.println("   APPLICATION (all users, all sessions)");
        System.out.println("       └── SESSION (one user, multiple requests)");
        System.out.println("           └── REQUEST (one request, can forward)");
        System.out.println("               └── PAGE (single page only)");
        System.out.println();
        
        // SUMMARY TABLE
        System.out.println("SUMMARY TABLE");
        System.out.println("-------------");
        System.out.println("   | Object      | Type                  | Scope       |");
        System.out.println("   |-------------|----------------------|-------------|");
        System.out.println("   | request     | HttpServletRequest   | Request     |");
        System.out.println("   | response    | HttpServletResponse  | Page        |");
        System.out.println("   | out         | JspWriter            | Page        |");
        System.out.println("   | session     | HttpSession          | Session     |");
        System.out.println("   | application | ServletContext       | Application |");
        System.out.println("   | config      | ServletConfig        | Page        |");
        System.out.println("   | pageContext | PageContext          | Page        |");
        System.out.println("   | page        | Object               | Page        |");
        System.out.println("   | exception   | Throwable            | Page        |");
    }
}

// Simulated Request
class SimulatedRequest {
    private Map<String, String> params = new HashMap<>();
    private Map<String, String> headers = new HashMap<>();
    private String method;
    private String requestURI;
    
    public void setParameter(String name, String value) { params.put(name, value); }
    public String getParameter(String name) { return params.get(name); }
    public void setHeader(String name, String value) { headers.put(name, value); }
    public String getHeader(String name) { return headers.get(name); }
    public void setMethod(String method) { this.method = method; }
    public String getMethod() { return method; }
    public void setRequestURI(String uri) { this.requestURI = uri; }
    public String getRequestURI() { return requestURI; }
}

// Simulated Response
class SimulatedResponse {
    private String contentType;
    private Map<String, String> headers = new HashMap<>();
    
    public void setContentType(String type) { this.contentType = type; }
    public String getContentType() { return contentType; }
    public void setHeader(String name, String value) { headers.put(name, value); }
}

// Simulated Session
class SimulatedSession {
    private String id = "SESSION_" + System.currentTimeMillis();
    private Map<String, Object> attributes = new HashMap<>();
    
    public String getId() { return id; }
    public void setAttribute(String name, Object value) { attributes.put(name, value); }
    public Object getAttribute(String name) { return attributes.get(name); }
}

// Simulated Application
class SimulatedApplication {
    private Map<String, Object> attributes = new HashMap<>();
    
    public void setAttribute(String name, Object value) { attributes.put(name, value); }
    public Object getAttribute(String name) { return attributes.get(name); }
}

// Simulated PageContext
class SimulatedPageContext {
    private Map<String, Map<String, Object>> scopes = new HashMap<>();
    
    SimulatedPageContext() {
        scopes.put("PAGE", new HashMap<>());
        scopes.put("REQUEST", new HashMap<>());
        scopes.put("SESSION", new HashMap<>());
        scopes.put("APPLICATION", new HashMap<>());
    }
    
    public void setAttribute(String name, Object value, String scope) {
        scopes.get(scope).put(name, value);
    }
    
    public Object getAttribute(String name, String scope) {
        return scopes.get(scope).get(name);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a scope manager that demonstrates attribute visibility',
      hint: 'Show how attributes in different scopes are accessed',
      starterCode: `import java.util.*;

public class ScopeManagerDemo {
    public static void main(String[] args) {
        System.out.println("=== Scope Manager Demo ===\\n");
        
        ScopeManager manager = new ScopeManager();
        
        // Set attributes in different scopes
        manager.setAttribute("pageVar", "Page Value", ScopeManager.PAGE_SCOPE);
        manager.setAttribute("requestVar", "Request Value", ScopeManager.REQUEST_SCOPE);
        manager.setAttribute("sessionVar", "Session Value", ScopeManager.SESSION_SCOPE);
        manager.setAttribute("appVar", "Application Value", ScopeManager.APPLICATION_SCOPE);
        
        // Also set a variable with same name in multiple scopes
        manager.setAttribute("sharedVar", "Page Level", ScopeManager.PAGE_SCOPE);
        manager.setAttribute("sharedVar", "Session Level", ScopeManager.SESSION_SCOPE);
        
        System.out.println("Attributes by scope:");
        System.out.println("--------------------");
        manager.printAllAttributes();
        System.out.println();
        
        System.out.println("Finding 'sharedVar' (searches from narrowest scope):");
        System.out.println("  findAttribute('sharedVar') = " + manager.findAttribute("sharedVar"));
        System.out.println();
        
        System.out.println("Simulating page change (clearing page scope):");
        manager.clearScope(ScopeManager.PAGE_SCOPE);
        System.out.println("  findAttribute('sharedVar') = " + manager.findAttribute("sharedVar"));
    }
}

class ScopeManager {
    public static final int PAGE_SCOPE = 1;
    public static final int REQUEST_SCOPE = 2;
    public static final int SESSION_SCOPE = 3;
    public static final int APPLICATION_SCOPE = 4;
    
    private Map<Integer, Map<String, Object>> scopes = new HashMap<>();
    
    ScopeManager() {
        scopes.put(PAGE_SCOPE, new HashMap<>());
        scopes.put(REQUEST_SCOPE, new HashMap<>());
        scopes.put(SESSION_SCOPE, new HashMap<>());
        scopes.put(APPLICATION_SCOPE, new HashMap<>());
    }
    
    public void setAttribute(String name, Object value, int scope) {
        scopes.get(scope).put(name, value);
    }
    
    public Object getAttribute(String name, int scope) {
        return scopes.get(scope).get(name);
    }
    
    public Object findAttribute(String name) {
        // Search from narrowest to widest scope
        for (int scope = PAGE_SCOPE; scope <= APPLICATION_SCOPE; scope++) {
            Object value = scopes.get(scope).get(name);
            if (value != null) {
                return value;
            }
        }
        return null;
    }
    
    public void clearScope(int scope) {
        scopes.get(scope).clear();
    }
    
    public void printAllAttributes() {
        String[] scopeNames = {"", "PAGE", "REQUEST", "SESSION", "APPLICATION"};
        
        for (int scope = PAGE_SCOPE; scope <= APPLICATION_SCOPE; scope++) {
            System.out.println("  " + scopeNames[scope] + " SCOPE:");
            Map<String, Object> attrs = scopes.get(scope);
            if (attrs.isEmpty()) {
                System.out.println("    (empty)");
            } else {
                for (Map.Entry<String, Object> entry : attrs.entrySet()) {
                    System.out.println("    " + entry.getKey() + " = " + entry.getValue());
                }
            }
        }
    }
}`
    }
  ]
};

export default jspImplicitObjects;
