const jspArchitecture = {
  id: 'jsp-architecture',
  title: 'JSP Architecture & Lifecycle',
  description: 'How JSP pages are processed and executed',
  content: `
# JSP Architecture & Lifecycle — Under the Hood

Understanding how JSP works internally helps you write better code and debug issues. Let's explore the translation process and lifecycle of a JSP page.

---

## JSP Architecture

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│ Web Server  │────▶│ JSP Engine  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Translate  │
                                        │  to Servlet │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Compile   │
                                        │   Servlet   │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Execute   │
                                        │   Servlet   │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │    HTML     │
                                        │   Response  │
                                        └─────────────┘
\`\`\`

---

## Two Phases of JSP Processing

### Phase 1: Translation (Compile Time)

The JSP engine converts your JSP file into a Java servlet:

**hello.jsp:**
\`\`\`jsp
<%@ page language="java" %>
<html>
<body>
    <h1>Hello, <%= request.getParameter("name") %>!</h1>
</body>
</html>
\`\`\`

**Generated hello_jsp.java:**
\`\`\`java
public class hello_jsp extends HttpJspBase {
    
    public void _jspService(HttpServletRequest request, 
                           HttpServletResponse response)
            throws ServletException, IOException {
        
        JspWriter out = response.getWriter();
        
        out.write("<html>\\n");
        out.write("<body>\\n");
        out.write("    <h1>Hello, ");
        out.print(request.getParameter("name"));
        out.write("!</h1>\\n");
        out.write("</body>\\n");
        out.write("</html>");
    }
}
\`\`\`

### Phase 2: Execution (Runtime)

The compiled servlet handles requests like any other servlet.

---

## JSP Lifecycle

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    JSP LIFECYCLE                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Translation    JSP → Servlet Source (.java)         │
│         ↓                                                │
│  2. Compilation    Servlet Source → Bytecode (.class)   │
│         ↓                                                │
│  3. Loading        Load class into memory               │
│         ↓                                                │
│  4. Instantiation  Create servlet instance              │
│         ↓                                                │
│  5. Initialization jspInit() called once                │
│         ↓                                                │
│  6. Service        _jspService() for each request       │
│         ↓                                                │
│  7. Destruction    jspDestroy() when unloaded           │
│                                                          │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Lifecycle Methods

### jspInit()

Called once when the JSP is first loaded:

\`\`\`jsp
<%!
    private Connection conn;
    
    public void jspInit() {
        // Initialize resources
        try {
            conn = DriverManager.getConnection(url, user, pass);
            System.out.println("Database connection established");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>
\`\`\`

### _jspService()

Called for every request (you don't override this directly):

\`\`\`jsp
<%-- This code runs in _jspService() --%>
<html>
<body>
    <h1>Request #<%= ++requestCount %></h1>
</body>
</html>
\`\`\`

### jspDestroy()

Called when the JSP is unloaded:

\`\`\`jsp
<%!
    public void jspDestroy() {
        // Cleanup resources
        try {
            if (conn != null) {
                conn.close();
                System.out.println("Database connection closed");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>
\`\`\`

---

## Translation Rules

### Static Content → out.write()

\`\`\`jsp
<p>Hello World</p>
\`\`\`

Becomes:

\`\`\`java
out.write("<p>Hello World</p>");
\`\`\`

### Expressions → out.print()

\`\`\`jsp
<%= user.getName() %>
\`\`\`

Becomes:

\`\`\`java
out.print(user.getName());
\`\`\`

### Scriptlets → Direct Code

\`\`\`jsp
<% 
    for (int i = 0; i < 5; i++) {
%>
    <p>Line <%= i %></p>
<%
    }
%>
\`\`\`

Becomes:

\`\`\`java
for (int i = 0; i < 5; i++) {
    out.write("<p>Line ");
    out.print(i);
    out.write("</p>");
}
\`\`\`

### Declarations → Class Members

\`\`\`jsp
<%!
    private int counter = 0;
    
    public int getCount() {
        return ++counter;
    }
%>
\`\`\`

Becomes:

\`\`\`java
public class page_jsp extends HttpJspBase {
    private int counter = 0;
    
    public int getCount() {
        return ++counter;
    }
    
    // ... _jspService method
}
\`\`\`

---

## When Does Translation Happen?

1. **First Request:** JSP is translated and compiled
2. **JSP Modified:** Re-translated on next request
3. **Server Restart:** May re-translate depending on config

### Precompilation

You can precompile JSPs to avoid first-request delay:

\`\`\`bash
# Using jspc tool
jspc -webapp /path/to/webapp -d /output/dir
\`\`\`

Or in web.xml:

\`\`\`xml
<servlet>
    <servlet-name>hello</servlet-name>
    <jsp-file>/hello.jsp</jsp-file>
    <load-on-startup>1</load-on-startup>
</servlet>
\`\`\`

---

## Generated Servlet Location

The generated servlet files are typically in:

- **Tomcat:** \`work/Catalina/localhost/yourapp/\`
- **Jetty:** \`work/\`
- **WildFly:** \`standalone/tmp/\`

---

## Complete Lifecycle Example

\`\`\`jsp
<%@ page language="java" contentType="text/html" %>
<%!
    // Class-level variables (shared across requests)
    private int visitCount = 0;
    private java.util.Date startTime;
    
    // Called once when JSP is loaded
    public void jspInit() {
        startTime = new java.util.Date();
        System.out.println("JSP initialized at: " + startTime);
    }
    
    // Called when JSP is unloaded
    public void jspDestroy() {
        System.out.println("JSP destroyed. Total visits: " + visitCount);
    }
%>
<!DOCTYPE html>
<html>
<head>
    <title>Lifecycle Demo</title>
</head>
<body>
    <h1>JSP Lifecycle Demo</h1>
    
    <% visitCount++; %>
    
    <p>This page has been visited <%= visitCount %> times.</p>
    <p>JSP started at: <%= startTime %></p>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`
`,
  code: `// JSP Architecture & Lifecycle Demo
// Demonstrates how JSP pages are processed

import java.util.*;

public class JspArchitectureDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Architecture & Lifecycle Demo ===\\n");
        
        // 1. JSP PROCESSING PHASES
        System.out.println("1. JSP PROCESSING PHASES");
        System.out.println("   ----------------------");
        System.out.println("   Phase 1: TRANSLATION (Compile Time)");
        System.out.println("     - JSP file → Servlet source code (.java)");
        System.out.println("     - Happens once (or when JSP changes)");
        System.out.println();
        System.out.println("   Phase 2: EXECUTION (Runtime)");
        System.out.println("     - Servlet handles each request");
        System.out.println("     - Generates HTML response");
        System.out.println();
        
        // 2. SIMULATE JSP TRANSLATION
        System.out.println("2. JSP TO SERVLET TRANSLATION");
        System.out.println("   ---------------------------");
        
        String jspCode = 
            "<%@ page language=\\"java\\" %>\\n" +
            "<html>\\n" +
            "<body>\\n" +
            "  <h1>Hello, <%= name %>!</h1>\\n" +
            "  <% for(int i=0; i<3; i++) { %>\\n" +
            "    <p>Line <%= i %></p>\\n" +
            "  <% } %>\\n" +
            "</body>\\n" +
            "</html>";
        
        System.out.println("   Original JSP:");
        System.out.println("   " + jspCode.replace("\\n", "\\n   "));
        System.out.println();
        
        String servletCode = translateJspToServlet(jspCode);
        System.out.println("   Generated Servlet:");
        System.out.println(servletCode);
        System.out.println();
        
        // 3. JSP LIFECYCLE
        System.out.println("3. JSP LIFECYCLE");
        System.out.println("   --------------");
        
        SimulatedJsp jsp = new SimulatedJsp("demo.jsp");
        
        System.out.println("   Step 1: Translation");
        jsp.translate();
        
        System.out.println("   Step 2: Compilation");
        jsp.compile();
        
        System.out.println("   Step 3: Loading");
        jsp.load();
        
        System.out.println("   Step 4: Instantiation");
        jsp.instantiate();
        
        System.out.println("   Step 5: Initialization (jspInit)");
        jsp.jspInit();
        
        System.out.println("   Step 6: Service (multiple requests)");
        jsp.jspService("Request 1");
        jsp.jspService("Request 2");
        jsp.jspService("Request 3");
        
        System.out.println("   Step 7: Destruction (jspDestroy)");
        jsp.jspDestroy();
        System.out.println();
        
        // 4. LIFECYCLE METHODS
        System.out.println("4. LIFECYCLE METHODS");
        System.out.println("   ------------------");
        System.out.println("   jspInit():");
        System.out.println("     - Called once when JSP is first loaded");
        System.out.println("     - Use for initialization (DB connections, etc.)");
        System.out.println();
        System.out.println("   _jspService(request, response):");
        System.out.println("     - Called for every request");
        System.out.println("     - Contains your JSP code");
        System.out.println("     - You don't override this directly");
        System.out.println();
        System.out.println("   jspDestroy():");
        System.out.println("     - Called when JSP is unloaded");
        System.out.println("     - Use for cleanup (close connections, etc.)");
        System.out.println();
        
        // 5. TRANSLATION RULES
        System.out.println("5. TRANSLATION RULES");
        System.out.println("   ------------------");
        System.out.println("   | JSP Element      | Becomes                    |");
        System.out.println("   |------------------|----------------------------|");
        System.out.println("   | Static HTML      | out.write(\\"..\\")           |");
        System.out.println("   | <%= expr %>      | out.print(expr)            |");
        System.out.println("   | <% code %>       | Direct Java code           |");
        System.out.println("   | <%! decl %>      | Class member               |");
        System.out.println("   | <%-- comment --% | Removed (not in output)    |");
        System.out.println();
        
        // 6. WHEN TRANSLATION HAPPENS
        System.out.println("6. WHEN TRANSLATION HAPPENS");
        System.out.println("   -------------------------");
        System.out.println("   - First request to the JSP");
        System.out.println("   - JSP file is modified");
        System.out.println("   - Server is restarted (depends on config)");
        System.out.println();
        System.out.println("   Tip: Precompile JSPs to avoid first-request delay!");
    }
    
    static String translateJspToServlet(String jsp) {
        StringBuilder sb = new StringBuilder();
        sb.append("   public class demo_jsp extends HttpJspBase {\\n");
        sb.append("       public void _jspService(HttpServletRequest request,\\n");
        sb.append("                              HttpServletResponse response) {\\n");
        sb.append("           JspWriter out = response.getWriter();\\n");
        sb.append("           \\n");
        sb.append("           out.write(\\"<html>\\\\n\\");\\n");
        sb.append("           out.write(\\"<body>\\\\n\\");\\n");
        sb.append("           out.write(\\"  <h1>Hello, \\");\\n");
        sb.append("           out.print(name);\\n");
        sb.append("           out.write(\\"!</h1>\\\\n\\");\\n");
        sb.append("           for(int i=0; i<3; i++) {\\n");
        sb.append("               out.write(\\"    <p>Line \\");\\n");
        sb.append("               out.print(i);\\n");
        sb.append("               out.write(\\"</p>\\\\n\\");\\n");
        sb.append("           }\\n");
        sb.append("           out.write(\\"</body>\\\\n\\");\\n");
        sb.append("           out.write(\\"</html>\\");\\n");
        sb.append("       }\\n");
        sb.append("   }");
        return sb.toString();
    }
}

// Simulated JSP for lifecycle demonstration
class SimulatedJsp {
    private String name;
    private boolean translated = false;
    private boolean compiled = false;
    private boolean loaded = false;
    private boolean instantiated = false;
    private boolean initialized = false;
    private int requestCount = 0;
    
    SimulatedJsp(String name) {
        this.name = name;
    }
    
    public void translate() {
        System.out.println("     " + name + " → " + name.replace(".jsp", "_jsp.java"));
        translated = true;
    }
    
    public void compile() {
        System.out.println("     " + name.replace(".jsp", "_jsp.java") + " → " + 
                          name.replace(".jsp", "_jsp.class"));
        compiled = true;
    }
    
    public void load() {
        System.out.println("     Loading " + name.replace(".jsp", "_jsp.class") + " into memory");
        loaded = true;
    }
    
    public void instantiate() {
        System.out.println("     Creating instance of " + name.replace(".jsp", "_jsp"));
        instantiated = true;
    }
    
    public void jspInit() {
        System.out.println("     jspInit() called - initializing resources");
        initialized = true;
    }
    
    public void jspService(String requestInfo) {
        requestCount++;
        System.out.println("     _jspService() - handling " + requestInfo + 
                          " (total: " + requestCount + ")");
    }
    
    public void jspDestroy() {
        System.out.println("     jspDestroy() called - cleaning up resources");
        System.out.println("     Total requests handled: " + requestCount);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a JSP lifecycle simulator that tracks state transitions',
      hint: 'Implement state machine for JSP lifecycle',
      starterCode: `import java.util.*;

public class JspLifecycleSimulator {
    public static void main(String[] args) {
        System.out.println("=== JSP Lifecycle Simulator ===\\n");
        
        JspPage page = new JspPage("welcome.jsp");
        
        // Simulate lifecycle
        System.out.println("Simulating JSP lifecycle:\\n");
        
        // First request - full lifecycle
        System.out.println("--- First Request ---");
        page.handleRequest("GET /welcome.jsp");
        System.out.println();
        
        // Second request - only service
        System.out.println("--- Second Request ---");
        page.handleRequest("GET /welcome.jsp?name= Dattu");
        System.out.println();
        
        // Third request
        System.out.println("--- Third Request ---");
        page.handleRequest("GET /welcome.jsp?name=Jane");
        System.out.println();
        
        // Modify JSP - triggers recompilation
        System.out.println("--- JSP Modified ---");
        page.modify();
        System.out.println();
        
        // Request after modification
        System.out.println("--- Request After Modification ---");
        page.handleRequest("GET /welcome.jsp");
        System.out.println();
        
        // Shutdown
        System.out.println("--- Server Shutdown ---");
        page.destroy();
    }
}

class JspPage {
    private String name;
    private String state = "NEW";
    private long lastModified;
    private long compiledAt;
    private int requestCount = 0;
    
    JspPage(String name) {
        this.name = name;
        this.lastModified = System.currentTimeMillis();
    }
    
    public void handleRequest(String request) {
        System.out.println("Request: " + request);
        
        // Check if translation needed
        if (state.equals("NEW") || lastModified > compiledAt) {
            translate();
            compile();
            load();
            initialize();
        }
        
        // Service the request
        service(request);
    }
    
    private void translate() {
        System.out.println("  [TRANSLATE] " + name + " -> " + name.replace(".jsp", "_jsp.java"));
        state = "TRANSLATED";
    }
    
    private void compile() {
        System.out.println("  [COMPILE] " + name.replace(".jsp", "_jsp.java") + " -> .class");
        compiledAt = System.currentTimeMillis();
        state = "COMPILED";
    }
    
    private void load() {
        System.out.println("  [LOAD] Loading class into memory");
        state = "LOADED";
    }
    
    private void initialize() {
        System.out.println("  [INIT] jspInit() called");
        state = "INITIALIZED";
    }
    
    private void service(String request) {
        requestCount++;
        System.out.println("  [SERVICE] _jspService() - Request #" + requestCount);
    }
    
    public void modify() {
        System.out.println("JSP file modified - will recompile on next request");
        lastModified = System.currentTimeMillis() + 1000;
    }
    
    public void destroy() {
        System.out.println("  [DESTROY] jspDestroy() called");
        System.out.println("  Total requests served: " + requestCount);
        state = "DESTROYED";
    }
}`
    }
  ]
};

export default jspArchitecture;
