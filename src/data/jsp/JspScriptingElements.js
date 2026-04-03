const jspScriptingElements = {
  id: 'jsp-scripting-elements',
  title: 'JSP Scripting Elements',
  description: 'Scriptlets, expressions, and declarations',
  content: `
# JSP Scripting Elements — Embedding Java in HTML

Scripting elements let you embed Java code directly in your JSP pages. There are three types: scriptlets, expressions, and declarations. Each serves a different purpose.

---

## The Three Scripting Elements

| Element | Syntax | Purpose |
|---------|--------|---------|
| Scriptlet | \`<% code %>\` | Execute Java code |
| Expression | \`<%= value %>\` | Output a value |
| Declaration | \`<%! declaration %>\` | Declare methods/variables |

---

## Scriptlets: <% code %>

Scriptlets contain Java code that executes when the page is requested.

### Basic Scriptlet

\`\`\`jsp
<%
    String name = request.getParameter("name");
    if (name == null) {
        name = "Guest";
    }
    out.println("Hello, " + name);
%>
\`\`\`

### Mixing HTML and Scriptlets

\`\`\`jsp
<ul>
<%
    for (int i = 1; i <= 5; i++) {
%>
    <li>Item <%= i %></li>
<%
    }
%>
</ul>
\`\`\`

**Output:**
\`\`\`html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
</ul>
\`\`\`

### Conditional Content

\`\`\`jsp
<% if (user != null) { %>
    <p>Welcome back, <%= user.getName() %>!</p>
    <a href="logout">Logout</a>
<% } else { %>
    <p>Please log in.</p>
    <a href="login">Login</a>
<% } %>
\`\`\`

---

## Expressions: <%= value %>

Expressions output a value directly to the page. No semicolon needed!

### Simple Expressions

\`\`\`jsp
<p>Current time: <%= new java.util.Date() %></p>
<p>2 + 2 = <%= 2 + 2 %></p>
<p>Your name: <%= request.getParameter("name") %></p>
\`\`\`

### Method Calls

\`\`\`jsp
<p>User: <%= user.getName() %></p>
<p>Items in cart: <%= cart.getItemCount() %></p>
<p>Total: $<%= String.format("%.2f", cart.getTotal()) %></p>
\`\`\`

### Expression vs Scriptlet

\`\`\`jsp
<%-- Expression (cleaner) --%>
<p>Hello, <%= name %></p>

<%-- Scriptlet (equivalent but verbose) --%>
<p>Hello, <% out.print(name); %></p>
\`\`\`

---

## Declarations: <%! declaration %>

Declarations define methods and instance variables that exist at the class level.

### Instance Variables

\`\`\`jsp
<%!
    private int visitCount = 0;
    private java.util.Date startTime = new java.util.Date();
%>

<p>Page started: <%= startTime %></p>
<p>Visit count: <%= ++visitCount %></p>
\`\`\`

**Warning:** Instance variables are shared across all requests! This can cause thread-safety issues.

### Methods

\`\`\`jsp
<%!
    public String formatCurrency(double amount) {
        return String.format("$%.2f", amount);
    }
    
    public String formatDate(java.util.Date date) {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }
%>

<p>Price: <%= formatCurrency(99.99) %></p>
<p>Date: <%= formatDate(new java.util.Date()) %></p>
\`\`\`

### Lifecycle Methods

\`\`\`jsp
<%!
    public void jspInit() {
        // Called once when JSP is loaded
        System.out.println("JSP initialized");
    }
    
    public void jspDestroy() {
        // Called when JSP is unloaded
        System.out.println("JSP destroyed");
    }
%>
\`\`\`

---

## JSP Comments

### JSP Comment (Not sent to browser)

\`\`\`jsp
<%-- This comment is hidden from the client --%>
\`\`\`

### HTML Comment (Visible in page source)

\`\`\`jsp
<!-- This comment appears in the HTML source -->
\`\`\`

---

## Implicit Objects

These objects are available in scriptlets and expressions without declaration:

| Object | Type | Description |
|--------|------|-------------|
| request | HttpServletRequest | The request object |
| response | HttpServletResponse | The response object |
| out | JspWriter | Output stream |
| session | HttpSession | User session |
| application | ServletContext | Application context |
| config | ServletConfig | Servlet configuration |
| pageContext | PageContext | Page context |
| page | Object | Current servlet instance |
| exception | Throwable | Exception (error pages only) |

### Using Implicit Objects

\`\`\`jsp
<%
    // Request
    String name = request.getParameter("name");
    String method = request.getMethod();
    
    // Session
    session.setAttribute("user", user);
    User currentUser = (User) session.getAttribute("user");
    
    // Application
    int totalUsers = (Integer) application.getAttribute("totalUsers");
    
    // Output
    out.println("Hello, " + name);
%>
\`\`\`

---

## Complete Example: User Dashboard

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*, com.example.User" %>

<%!
    // Helper methods
    public String formatDate(Date date) {
        return new java.text.SimpleDateFormat("MMM dd, yyyy").format(date);
    }
    
    public String getGreeting() {
        int hour = java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY);
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    }
%>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <%
        User user = (User) session.getAttribute("user");
        if (user == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        List<String> notifications = user.getNotifications();
    %>
    
    <h1><%= getGreeting() %>, <%= user.getName() %>!</h1>
    
    <p>Last login: <%= formatDate(user.getLastLogin()) %></p>
    
    <h2>Notifications</h2>
    
    <% if (notifications.isEmpty()) { %>
        <p>No new notifications.</p>
    <% } else { %>
        <ul>
        <% for (String notification : notifications) { %>
            <li><%= notification %></li>
        <% } %>
        </ul>
    <% } %>
    
    <a href="logout">Logout</a>
</body>
</html>
\`\`\`

---

## Best Practices

1. **Minimize scriptlets** — Use JSTL and EL instead
2. **Keep logic simple** — Complex logic belongs in servlets
3. **Avoid declarations** — Thread-safety issues
4. **Use expressions for output** — Cleaner than out.print()
5. **Comment your code** — Use JSP comments for hidden notes

---

## 10 Important JSP Scripting Elements Interview Questions

### 1. What is a JSP scriptlet?

**Answer:** A scriptlet is a block \`<% ... %>\` containing **Java statements** that are copied into the generated servlet’s \`_jspService\` method (or equivalent), executing **on the server** for each request when that part of the page is reached. You use it for control flow, variable assignment, and calling Java APIs. Because it lives inside the service method, **local** variables are **per request** (each thread gets its own stack frame), which is different from **declarations** at class scope. Interview tip: always mention that excessive scriptlets harm **maintainability** and that **JSTL** replaces most looping/branching needs.

### 2. What is a JSP expression?

**Answer:** \`<%= expression %>\` evaluates a **single Java expression**, converts the result with something like \`String.valueOf\`, and writes it to the output stream. It must **not** include a trailing semicolon (it is an expression position, not a full statement). Common uses: printing request parameters, bean properties, or simple calculations. Compare to **scriptlets**, which run **statements** without automatically printing. Getting this distinction right is a basic but frequent screening question.

### 3. What is a JSP declaration?

**Answer:** \`<%! ... %>\` defines **fields or methods** on the **generated servlet class**, outside any single request method. That means **instance fields** are **shared** by all threads hitting that servlet unless you guard them—classic **thread-safety** hazard. Helper **methods** declared here can be called from scriptlets or expressions. Best practice: prefer **static** utility methods or **separate** Java classes instead of large declaration blocks. Interviewers reward hearing “declaration = class level, scriptlet = request method level.”

### 4. How do JSP comments differ from HTML comments?

**Answer:** \`<%-- ... --%>\` is removed entirely during JSP processing; it never appears in the HTML sent to the browser, so it is safe for **internal** notes and sometimes for temporarily disabling JSP fragments. \`<!-- ... -->\` is plain HTML: it is sent to the client and visible in **View Source**, and may leak **implementation** details. For security discussions, note that HTML comments do **not** stop sensitive data from reaching the client if you mistakenly put secrets there.

### 5. Why are scriptlets discouraged in modern codebases?

**Answer:** They entangle **Java** with **presentation**, defeating **separation of concerns** and making pages harder to read for **front-end** collaborators. They are awkward to **unit test** and encourage copy-paste logic instead of **shared services**. EL and JSTL express most view concerns **declaratively** and align better with **MVC**. A nuanced answer acknowledges **legacy** pages full of scriptlets and a **gradual** migration strategy rather than pretending they never exist.

### 6. Can you define a method inside a scriptlet?

**Answer:** **No.** Method definitions belong at **class** scope; a scriptlet is inside a method body already. If you try to declare a method inside \`<%\`, it is a **syntax error**. Put methods in \`<%! %>\` declarations or, preferably, in ordinary Java classes. This question tests whether you understand **where** generated code lands in the servlet.

### 7. What rules apply to JSP expressions and return types?

**Answer:** The expression must be **evaluable** as Java code in an expression context and should produce a value that can be **stringified** for output. If the result is \`null\`, behavior depends on conversion rules and context; in practice you should design for **null-safe** rendering (EL handles many null cases more gracefully than raw \`<%= %>\`). Mention that expressions should stay **side-effect free** for clarity, even though Java allows side effects in expressions.

### 8. What is the difference between \`<%\` and \`<%= %>\`?

**Answer:** **Scriptlet** runs **statements** (often multiple lines) and prints **nothing** unless you call \`out.print\` yourself. **Expression** evaluates **one expression** and **always** prints its string form. Mnemonic: \`=\` means “**emit** this value.” Many bugs come from putting a semicolon inside \`<%= %>\` or from using a scriptlet when an expression would suffice.

### 9. How does thread safety relate to JSP?

**Answer:** The container typically uses **one instance** of the JSP servlet to serve **many concurrent requests**, each on its own thread. **Local** variables in scriptlets are thread-safe because they are **stack-confined**. **Instance fields** from declarations or the \`page\` implicit object’s mutable state are **not** automatically safe. Shared **static** mutable state is also dangerous. Good interview language: “Treat the JSP servlet like any servlet—avoid mutable instance fields; use request/session scopes appropriately.”

### 10. How does EL compare to \`<%= %>\` for reading data?

**Answer:** Expression Language (for example \`\${user.name}\`) is designed for **reading** attributes and **bean properties** with **compact** syntax and **null-friendly** rules. It reduces casting and \`getAttribute\` noise compared to scriptlets. \`<%= %>\` still works but scales poorly as models grow. In interviews, say you default to **EL + JSTL** and fall back to scriptlets only for **legacy** maintenance or rare edge cases.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **JSP basics** | [JSP introduction](/tutorial/jsp-introduction) |
| **Directives** | [JSP directives](/tutorial/jsp-directives) |
| **Implicit objects** | [JSP implicit objects](/tutorial/jsp-implicit-objects) |
| **EL** | [JSP Expression Language](/tutorial/jsp-expression-language) |
| **JSTL** | [JSP JSTL](/tutorial/jsp-jstl) |

`,
  code: `// JSP Scripting Elements Demo
// Demonstrates scriptlets, expressions, and declarations

import java.util.*;

public class JspScriptingDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Scripting Elements Demo ===\\n");
        
        // 1. SCRIPTLETS
        System.out.println("1. SCRIPTLETS: <% code %>");
        System.out.println("   --------------------------");
        System.out.println("   Purpose: Execute Java code");
        System.out.println();
        
        System.out.println("   Example:");
        System.out.println("   <%");
        System.out.println("       String name = request.getParameter(\\"name\\");");
        System.out.println("       if (name == null) {");
        System.out.println("           name = \\"Guest\\";");
        System.out.println("       }");
        System.out.println("   %>");
        System.out.println();
        
        // Simulate scriptlet execution
        Map<String, String> request = new HashMap<>();
        request.put("name", " Dattu");
        
        String name = request.get("name");
        if (name == null) {
            name = "Guest";
        }
        System.out.println("   Output: Hello, " + name);
        System.out.println();
        
        // 2. EXPRESSIONS
        System.out.println("2. EXPRESSIONS: <%= value %>");
        System.out.println("   ----------------------------");
        System.out.println("   Purpose: Output a value (no semicolon!)");
        System.out.println();
        
        System.out.println("   Examples:");
        System.out.println("   <%= new java.util.Date() %>  →  " + new Date());
        System.out.println("   <%= 2 + 2 %>                 →  " + (2 + 2));
        System.out.println("   <%= \\"Hello\\".toUpperCase() %> →  " + "Hello".toUpperCase());
        System.out.println();
        
        // 3. DECLARATIONS
        System.out.println("3. DECLARATIONS: <%! declaration %>");
        System.out.println("   ----------------------------------");
        System.out.println("   Purpose: Declare methods and instance variables");
        System.out.println();
        
        System.out.println("   Example:");
        System.out.println("   <%!");
        System.out.println("       private int visitCount = 0;");
        System.out.println("       ");
        System.out.println("       public String formatCurrency(double amount) {");
        System.out.println("           return String.format(\\"$%.2f\\", amount);");
        System.out.println("       }");
        System.out.println("   %>");
        System.out.println();
        
        // Simulate declaration usage
        System.out.println("   Usage: <%= formatCurrency(99.99) %>");
        System.out.println("   Output: " + String.format("$%.2f", 99.99));
        System.out.println();
        
        // 4. MIXING SCRIPTLETS AND HTML
        System.out.println("4. MIXING SCRIPTLETS AND HTML");
        System.out.println("   ---------------------------");
        System.out.println("   JSP Code:");
        System.out.println("   <ul>");
        System.out.println("   <% for (int i = 1; i <= 3; i++) { %>");
        System.out.println("       <li>Item <%= i %></li>");
        System.out.println("   <% } %>");
        System.out.println("   </ul>");
        System.out.println();
        System.out.println("   Output:");
        System.out.println("   <ul>");
        for (int i = 1; i <= 3; i++) {
            System.out.println("       <li>Item " + i + "</li>");
        }
        System.out.println("   </ul>");
        System.out.println();
        
        // 5. CONDITIONAL CONTENT
        System.out.println("5. CONDITIONAL CONTENT");
        System.out.println("   --------------------");
        System.out.println("   JSP Code:");
        System.out.println("   <% if (user != null) { %>");
        System.out.println("       <p>Welcome, <%= user.getName() %>!</p>");
        System.out.println("   <% } else { %>");
        System.out.println("       <p>Please log in.</p>");
        System.out.println("   <% } %>");
        System.out.println();
        
        // Simulate with user
        String user = " Dattu";
        System.out.println("   Output (user = \\" Dattu\\"):");
        if (user != null) {
            System.out.println("       <p>Welcome, " + user + "!</p>");
        } else {
            System.out.println("       <p>Please log in.</p>");
        }
        System.out.println();
        
        // 6. JSP COMMENTS
        System.out.println("6. JSP COMMENTS");
        System.out.println("   -------------");
        System.out.println("   JSP Comment (hidden from browser):");
        System.out.println("   <%-- This won't appear in HTML source --%>");
        System.out.println();
        System.out.println("   HTML Comment (visible in source):");
        System.out.println("   <!-- This appears in HTML source -->");
        System.out.println();
        
        // 7. IMPLICIT OBJECTS
        System.out.println("7. IMPLICIT OBJECTS");
        System.out.println("   -----------------");
        System.out.println("   | Object      | Type                  | Description           |");
        System.out.println("   |-------------|----------------------|----------------------|");
        System.out.println("   | request     | HttpServletRequest   | Request object       |");
        System.out.println("   | response    | HttpServletResponse  | Response object      |");
        System.out.println("   | out         | JspWriter            | Output stream        |");
        System.out.println("   | session     | HttpSession          | User session         |");
        System.out.println("   | application | ServletContext       | Application context  |");
        System.out.println("   | config      | ServletConfig        | Servlet config       |");
        System.out.println("   | pageContext | PageContext          | Page context         |");
        System.out.println("   | page        | Object               | Current servlet      |");
        System.out.println("   | exception   | Throwable            | Error pages only     |");
        System.out.println();
        
        // 8. COMPLETE EXAMPLE
        System.out.println("8. COMPLETE EXAMPLE");
        System.out.println("   -----------------");
        
        String jspExample = simulateJspPage();
        System.out.println(jspExample);
    }
    
    static String simulateJspPage() {
        StringBuilder sb = new StringBuilder();
        sb.append("   Input JSP:\\n");
        sb.append("   ----------\\n");
        sb.append("   <%@ page import=\\"java.util.*\\" %>\\n");
        sb.append("   <%!\\n");
        sb.append("       public String greet(String name) {\\n");
        sb.append("           return \\"Hello, \\" + name + \\"!\\";\\n");
        sb.append("       }\\n");
        sb.append("   %>\\n");
        sb.append("   <html>\\n");
        sb.append("   <body>\\n");
        sb.append("       <h1><%= greet(\\"World\\") %></h1>\\n");
        sb.append("       <p>Time: <%= new Date() %></p>\\n");
        sb.append("       <ul>\\n");
        sb.append("       <% for(int i=1; i<=3; i++) { %>\\n");
        sb.append("           <li>Item <%= i %></li>\\n");
        sb.append("       <% } %>\\n");
        sb.append("       </ul>\\n");
        sb.append("   </body>\\n");
        sb.append("   </html>\\n");
        sb.append("\\n");
        sb.append("   Output HTML:\\n");
        sb.append("   ------------\\n");
        sb.append("   <html>\\n");
        sb.append("   <body>\\n");
        sb.append("       <h1>Hello, World!</h1>\\n");
        sb.append("       <p>Time: " + new Date() + "</p>\\n");
        sb.append("       <ul>\\n");
        sb.append("           <li>Item 1</li>\\n");
        sb.append("           <li>Item 2</li>\\n");
        sb.append("           <li>Item 3</li>\\n");
        sb.append("       </ul>\\n");
        sb.append("   </body>\\n");
        sb.append("   </html>");
        return sb.toString();
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a JSP template engine that processes all three scripting elements',
      hint: 'Parse and execute scriptlets, expressions, and declarations',
      starterCode: `import java.util.*;

public class JspTemplateEngine {
    public static void main(String[] args) {
        System.out.println("=== JSP Template Engine Demo ===\\n");
        
        TemplateEngine engine = new TemplateEngine();
        
        // Add some variables
        engine.setVariable("name", " Dattu");
        engine.setVariable("items", Arrays.asList("Apple", "Banana", "Orange"));
        
        // Template with all scripting elements
        String template = 
            "<%! public String upper(String s) { return s.toUpperCase(); } %>\\n" +
            "<h1>Hello, <%= upper(name) %>!</h1>\\n" +
            "<ul>\\n" +
            "<% for(String item : items) { %>\\n" +
            "  <li><%= item %></li>\\n" +
            "<% } %>\\n" +
            "</ul>";
        
        System.out.println("Template:");
        System.out.println(template);
        System.out.println();
        
        String output = engine.process(template);
        
        System.out.println("Output:");
        System.out.println(output);
    }
}

class TemplateEngine {
    private Map<String, Object> variables = new HashMap<>();
    
    public void setVariable(String name, Object value) {
        variables.put(name, value);
    }
    
    public String process(String template) {
        StringBuilder output = new StringBuilder();
        
        // Simple processing - replace expressions
        String result = template;
        
        // Process expressions <%= ... %>
        result = result.replace("<%= upper(name) %>", 
            ((String) variables.get("name")).toUpperCase());
        
        // Process loop (simplified)
        StringBuilder items = new StringBuilder();
        for (Object item : (List<?>) variables.get("items")) {
            items.append("  <li>").append(item).append("</li>\\n");
        }
        
        // Remove loop constructs and insert items
        result = result.replaceAll(
            "<%! public String upper.*%>\\\\n", "");
        result = result.replaceAll(
            "<% for\\\\(String item : items\\\\) \\\\{ %>\\\\n  <li><%= item %></li>\\\\n<% \\\\} %>\\\\n",
            items.toString());
        
        return result;
    }
}`
    }
  ]
};

export default jspScriptingElements;
