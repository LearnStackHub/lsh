const jspDirectives = {
  id: 'jsp-directives',
  title: 'JSP Directives',
  description: 'Page, include, and taglib directives',
  content: `
# JSP Directives — Page Configuration

Directives provide instructions to the JSP container about how to process the page. They don't produce output directly but control the page's behavior.

---

## Three Types of Directives

| Directive | Syntax | Purpose |
|-----------|--------|---------|
| page | \`<%@ page ... %>\` | Page configuration |
| include | \`<%@ include ... %>\` | Include files at compile time |
| taglib | \`<%@ taglib ... %>\` | Import tag libraries |

---

## Page Directive

The page directive defines page-level settings.

### Common Attributes

\`\`\`jsp
<%@ page 
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.util.*, java.text.*"
    session="true"
    buffer="8kb"
    autoFlush="true"
    isThreadSafe="true"
    errorPage="error.jsp"
    isErrorPage="false"
%>
\`\`\`

### language

Specifies the scripting language (always "java"):

\`\`\`jsp
<%@ page language="java" %>
\`\`\`

### contentType

Sets the MIME type and character encoding:

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page contentType="application/json" %>
<%@ page contentType="text/xml" %>
\`\`\`

### import

Imports Java classes (like Java import statements):

\`\`\`jsp
<%@ page import="java.util.List" %>
<%@ page import="java.util.*, java.text.*, com.example.User" %>
\`\`\`

### session

Controls whether the page participates in sessions:

\`\`\`jsp
<%@ page session="true" %>   <%-- Default: session available --%>
<%@ page session="false" %>  <%-- No session object available --%>
\`\`\`

### buffer and autoFlush

Controls output buffering:

\`\`\`jsp
<%@ page buffer="16kb" autoFlush="true" %>
<%@ page buffer="none" %>  <%-- No buffering --%>
\`\`\`

### errorPage and isErrorPage

Error handling configuration:

\`\`\`jsp
<%-- In regular pages --%>
<%@ page errorPage="error.jsp" %>

<%-- In error.jsp --%>
<%@ page isErrorPage="true" %>
<%-- Now 'exception' object is available --%>
<h1>Error: <%= exception.getMessage() %></h1>
\`\`\`

### isThreadSafe

Thread safety declaration:

\`\`\`jsp
<%@ page isThreadSafe="true" %>   <%-- Default: multiple threads --%>
<%@ page isThreadSafe="false" %>  <%-- Single-threaded (deprecated) --%>
\`\`\`

---

## Include Directive

Includes another file at translation time (compile time).

### Syntax

\`\`\`jsp
<%@ include file="header.jsp" %>
<%@ include file="/WEB-INF/includes/footer.jsp" %>
\`\`\`

### Example: Page Layout

**header.jsp:**
\`\`\`jsp
<!DOCTYPE html>
<html>
<head>
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <a href="home.jsp">Home</a>
        <a href="products.jsp">Products</a>
        <a href="contact.jsp">Contact</a>
    </nav>
\`\`\`

**footer.jsp:**
\`\`\`jsp
    <footer>
        <p>&copy; 2024 My Company</p>
    </footer>
</body>
</html>
\`\`\`

**main.jsp:**
\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<% String pageTitle = "Home Page"; %>

<%@ include file="header.jsp" %>

<main>
    <h1>Welcome to our website!</h1>
    <p>This is the main content.</p>
</main>

<%@ include file="footer.jsp" %>
\`\`\`

### Include Directive vs Include Action

| Feature | Directive | Action |
|---------|-----------|--------|
| Syntax | \`<%@ include file="..." %>\` | \`<jsp:include page="..." />\` |
| When | Compile time | Runtime |
| Content | Static | Dynamic |
| Changes | Requires recompile | Immediate |

---

## Taglib Directive

Imports custom tag libraries.

### JSTL Core Tags

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="\${user != null}">
    <p>Welcome, \${user.name}!</p>
</c:if>

<c:forEach var="item" items="\${items}">
    <li>\${item}</li>
</c:forEach>
\`\`\`

### JSTL Formatting Tags

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<fmt:formatDate value="\${date}" pattern="yyyy-MM-dd" />
<fmt:formatNumber value="\${price}" type="currency" />
\`\`\`

### Custom Tag Library

\`\`\`jsp
<%@ taglib uri="/WEB-INF/mytags.tld" prefix="my" %>

<my:greeting name=" Dattu" />
<my:formatPhone number="1234567890" />
\`\`\`

---

## Error Handling with Directives

### Regular Page

\`\`\`jsp
<%@ page errorPage="error.jsp" %>
<%@ page contentType="text/html" %>

<%
    // This might throw an exception
    int result = 10 / 0;
%>
\`\`\`

### Error Page

\`\`\`jsp
<%@ page isErrorPage="true" %>
<%@ page contentType="text/html" %>

<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h1>Oops! Something went wrong.</h1>
    
    <p>Error: <%= exception.getMessage() %></p>
    
    <% if (exception instanceof NullPointerException) { %>
        <p>A null value was encountered.</p>
    <% } else if (exception instanceof ArithmeticException) { %>
        <p>A calculation error occurred.</p>
    <% } %>
    
    <a href="home.jsp">Return to Home</a>
</body>
</html>
\`\`\`

---

## Complete Example

\`\`\`jsp
<%-- Page configuration --%>
<%@ page language="java" 
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"
         import="java.util.*, com.example.model.*"
         session="true"
         errorPage="error.jsp" %>

<%-- Tag libraries --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<%-- Include header --%>
<%@ include file="/WEB-INF/includes/header.jsp" %>

<main>
    <h1>Product Catalog</h1>
    
    <c:forEach var="product" items="\${products}">
        <div class="product">
            <h2>\${product.name}</h2>
            <p>Price: <fmt:formatNumber value="\${product.price}" type="currency" /></p>
            <p>Added: <fmt:formatDate value="\${product.dateAdded}" pattern="MMM dd, yyyy" /></p>
        </div>
    </c:forEach>
</main>

<%-- Include footer --%>
<%@ include file="/WEB-INF/includes/footer.jsp" %>
\`\`\`

---

## 10 Important JSP Directives Interview Questions

### 1. What is a JSP directive?

**Answer:** Directives use the syntax \`<%@ ... %>\` and send **instructions to the JSP container** during translation, not markup to the browser. The three common kinds are **page** (per-JSP settings), **include** (static file inclusion at translation time), and **taglib** (registering tag libraries with a **URI** and **prefix**). They are processed **before** the page becomes a servlet. Explaining “translation-time vs runtime” is the key differentiator from **action** tags.

### 2. What can you configure with the page directive?

**Answer:** Typical attributes include \`language\`, \`contentType\`, \`pageEncoding\`, \`import\`, \`session\` (true/false to disable session creation), \`buffer\` and \`autoFlush\`, \`isThreadSafe\` (legacy), \`errorPage\` and \`isErrorPage\`, \`extends\` (rare), and \`isELIgnored\`. Together they shape how the **generated servlet** behaves and how the **response** is encoded. A strong candidate ties \`pageEncoding\` vs \`contentType\` to **UTF-8** end-to-end correctness.

### 3. Compare \`<%@ include file="..." %>\` with \`<jsp:include page="..." />\`.

**Answer:** The **include directive** pulls file contents in at **translation** time, producing **one** combined servlet. If the included file changes, the parent JSP must be **retranslated**. **jsp:include** dispatches to another resource at **request time**, so the included output can vary per request and can even be dynamic. Use the directive for **static** chrome (headers/footers) that rarely changes; use the action when you need **parameterized** or **volatile** fragments. This is one of the most classic JSP interview comparisons.

### 4. When is static include the wrong tool?

**Answer:** When included content changes **frequently** or per **user/locale** and you forget to redeploy dependent parents, you get **stale** output. Static include also cannot accept **request parameters** the way \`jsp:include\` can with \`jsp:param\`. Very large static includes can **inflate** generated servlet size. Mention **tag files** or **composition** patterns as modern alternatives for reusable UI.

### 5. What does the taglib directive do?

**Answer:** \`<%@ taglib uri="..." prefix="c" %>\` binds a **tag library** namespace to a **prefix** used in the page (\`<c:if>\`, etc.). The URI may map to a **TLD** file or be resolved by the container. Without it, custom and JSTL tags are unknown at translation time. Interview follow-up: explain the difference between **standard** URIs (JSTL) and **custom** URIs packaged in your JAR.

### 6. How do \`errorPage\` and \`isErrorPage\` work together?

**Answer:** A page can declare \`errorPage="error.jsp"\` so **uncaught exceptions** during its execution forward to the error handler (per container rules). The handler JSP sets \`isErrorPage="true"\` so the **exception** implicit object is available for logging or user-safe messaging. Discuss **security**: error pages should not dump **stack traces** to end users in production. Also contrast with **web.xml** \`<error-page>\` for **global** mapping.

### 7. Can a JSP have multiple page directives?

**Answer:** Yes, multiple \`<%@ page %>\` directives are merged into one effective set of attributes, but readability suffers. Teams usually consolidate to **one** directive at the top. Know the spec-level behavior in case of **conflicting** attributes—some combinations are invalid or last-wins depending on rules; in interviews, prefer saying “we keep a single page directive to avoid ambiguity.”

### 8. What does \`import\` on the page directive accomplish?

**Answer:** It adds Java \`import\` statements to the **generated servlet** source so you can reference classes without fully qualified names inside scriptlets or expressions. With **scriptless** JSPs, imports matter less because EL and tags hide types. Still relevant when legacy code uses **Java** in the page.

### 9. What is the purpose of the \`buffer\` and \`autoFlush\` attributes?

**Answer:** They control the **JspWriter** buffer size and whether the buffer **auto-flushes** when full. Buffering affects whether you can still call \`forward\` or set **status** headers—once response bytes are **committed**, forwarding throws \`IllegalStateException\`. This links JSP directives to servlet **response commit** semantics and is a favorite advanced topic.

### 10. What does \`body-content\` like \`scriptless\` or \`tagdependent\` mean for tags?

**Answer:** In a **TLD**, \`body-content\` tells the container how to parse the tag body. **scriptless** forbids scriptlets but allows EL and standard actions; **tagdependent** passes body text **verbatim** to the tag handler (useful for **embedded** mini-languages). **empty** means no body. Understanding this shows you know **custom tag** development, not only built-in directives.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **JSP overview** | [JSP introduction](/tutorial/jsp-introduction) |
| **Action tags** | [JSP action tags](/tutorial/jsp-action-tags) |
| **JSTL** | [JSP JSTL](/tutorial/jsp-jstl) |
| **Custom tags** | [JSP custom tags](/tutorial/jsp-custom-tags) |
| **Architecture** | [JSP architecture](/tutorial/jsp-architecture) |

`,
  code: `// JSP Directives Demo
// Demonstrates page, include, and taglib directives

import java.util.*;

public class JspDirectivesDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Directives Demo ===\\n");
        
        // 1. PAGE DIRECTIVE
        System.out.println("1. PAGE DIRECTIVE: <%@ page ... %>");
        System.out.println("   --------------------------------");
        System.out.println("   Purpose: Configure page settings");
        System.out.println();
        
        System.out.println("   Common attributes:");
        System.out.println("   | Attribute     | Example                          | Purpose              |");
        System.out.println("   |---------------|----------------------------------|----------------------|");
        System.out.println("   | language      | language=\\"java\\"                 | Scripting language   |");
        System.out.println("   | contentType   | contentType=\\"text/html\\"         | MIME type            |");
        System.out.println("   | pageEncoding  | pageEncoding=\\"UTF-8\\"            | Character encoding   |");
        System.out.println("   | import        | import=\\"java.util.*\\"            | Import classes       |");
        System.out.println("   | session       | session=\\"true\\"                  | Enable session       |");
        System.out.println("   | buffer        | buffer=\\"8kb\\"                    | Output buffer size   |");
        System.out.println("   | errorPage     | errorPage=\\"error.jsp\\"           | Error handler        |");
        System.out.println("   | isErrorPage   | isErrorPage=\\"true\\"              | Is error page        |");
        System.out.println();
        
        // 2. INCLUDE DIRECTIVE
        System.out.println("2. INCLUDE DIRECTIVE: <%@ include file=\\"...\\" %>");
        System.out.println("   -------------------------------------------");
        System.out.println("   Purpose: Include files at compile time");
        System.out.println();
        
        System.out.println("   Example layout structure:");
        System.out.println();
        
        // Simulate include directive
        String header = simulateHeader();
        String content = simulateContent();
        String footer = simulateFooter();
        
        System.out.println("   header.jsp:");
        System.out.println("   -----------");
        System.out.println(header);
        System.out.println();
        
        System.out.println("   main.jsp (with includes):");
        System.out.println("   -------------------------");
        System.out.println("   <%@ include file=\\"header.jsp\\" %>");
        System.out.println(content);
        System.out.println("   <%@ include file=\\"footer.jsp\\" %>");
        System.out.println();
        
        System.out.println("   footer.jsp:");
        System.out.println("   -----------");
        System.out.println(footer);
        System.out.println();
        
        System.out.println("   Final output:");
        System.out.println("   -------------");
        System.out.println(header + content + footer);
        System.out.println();
        
        // 3. TAGLIB DIRECTIVE
        System.out.println("3. TAGLIB DIRECTIVE: <%@ taglib ... %>");
        System.out.println("   ------------------------------------");
        System.out.println("   Purpose: Import tag libraries");
        System.out.println();
        
        System.out.println("   Common tag libraries:");
        System.out.println("   | Library | URI                                    | Prefix |");
        System.out.println("   |---------|----------------------------------------|--------|");
        System.out.println("   | Core    | http://java.sun.com/jsp/jstl/core      | c      |");
        System.out.println("   | Format  | http://java.sun.com/jsp/jstl/fmt       | fmt    |");
        System.out.println("   | SQL     | http://java.sun.com/jsp/jstl/sql       | sql    |");
        System.out.println("   | XML     | http://java.sun.com/jsp/jstl/xml       | x      |");
        System.out.println("   | Functions| http://java.sun.com/jsp/jstl/functions| fn     |");
        System.out.println();
        
        // 4. INCLUDE DIRECTIVE VS ACTION
        System.out.println("4. INCLUDE DIRECTIVE VS ACTION");
        System.out.println("   ----------------------------");
        System.out.println("   | Feature    | <%@ include %>     | <jsp:include>      |");
        System.out.println("   |------------|--------------------|--------------------|");
        System.out.println("   | When       | Compile time       | Runtime            |");
        System.out.println("   | Content    | Static             | Dynamic            |");
        System.out.println("   | Changes    | Needs recompile    | Immediate          |");
        System.out.println("   | Parameters | No                 | Yes                |");
        System.out.println("   | Use for    | Headers/footers    | Dynamic content    |");
        System.out.println();
        
        // 5. ERROR HANDLING
        System.out.println("5. ERROR HANDLING WITH DIRECTIVES");
        System.out.println("   --------------------------------");
        System.out.println("   Regular page:");
        System.out.println("   <%@ page errorPage=\\"error.jsp\\" %>");
        System.out.println();
        System.out.println("   Error page:");
        System.out.println("   <%@ page isErrorPage=\\"true\\" %>");
        System.out.println("   <h1>Error: <%= exception.getMessage() %></h1>");
        System.out.println();
        
        // 6. COMPLETE EXAMPLE
        System.out.println("6. COMPLETE EXAMPLE");
        System.out.println("   -----------------");
        String completeExample = 
            "   <%@ page language=\\"java\\"\\n" +
            "            contentType=\\"text/html; charset=UTF-8\\"\\n" +
            "            import=\\"java.util.*, com.example.*\\"\\n" +
            "            session=\\"true\\"\\n" +
            "            errorPage=\\"error.jsp\\" %>\\n" +
            "   \\n" +
            "   <%@ taglib uri=\\"http://java.sun.com/jsp/jstl/core\\" prefix=\\"c\\" %>\\n" +
            "   <%@ taglib uri=\\"http://java.sun.com/jsp/jstl/fmt\\" prefix=\\"fmt\\" %>\\n" +
            "   \\n" +
            "   <%@ include file=\\"/WEB-INF/includes/header.jsp\\" %>\\n" +
            "   \\n" +
            "   <main>\\n" +
            "       <c:forEach var=\\"item\\" items=\\"Dollar{items}\\">\\n" +
            "           <p>Dollar{item.name}</p>\\n" +
            "       </c:forEach>\\n" +
            "   </main>\\n" +
            "   \\n" +
            "   <%@ include file=\\"/WEB-INF/includes/footer.jsp\\" %>";
        System.out.println(completeExample);
    }
    
    static String simulateHeader() {
        return "   <!DOCTYPE html>\\n" +
               "   <html>\\n" +
               "   <head><title>My Page</title></head>\\n" +
               "   <body>\\n" +
               "   <nav>Home | Products | Contact</nav>";
    }
    
    static String simulateContent() {
        return "   <main>\\n" +
               "       <h1>Welcome!</h1>\\n" +
               "       <p>This is the main content.</p>\\n" +
               "   </main>";
    }
    
    static String simulateFooter() {
        return "   <footer>&copy; 2024 My Company</footer>\\n" +
               "   </body>\\n" +
               "   </html>";
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a page layout system using include directives',
      hint: 'Build header, content, and footer components',
      starterCode: `import java.util.*;

public class PageLayoutDemo {
    public static void main(String[] args) {
        System.out.println("=== Page Layout System Demo ===\\n");
        
        LayoutEngine engine = new LayoutEngine();
        
        // Register layout components
        engine.registerComponent("header", 
            "<!DOCTYPE html>\\n" +
            "<html>\\n" +
            "<head><title>#{title}</title></head>\\n" +
            "<body>\\n" +
            "<nav>#{nav}</nav>");
        
        engine.registerComponent("footer",
            "<footer>#{copyright}</footer>\\n" +
            "</body>\\n" +
            "</html>");
        
        // Create a page
        Map<String, String> vars = new HashMap<>();
        vars.put("title", "Home Page");
        vars.put("nav", "Home | Products | About");
        vars.put("copyright", "&copy; 2024 My Company");
        
        String content = "<main>\\n" +
                        "  <h1>Welcome!</h1>\\n" +
                        "  <p>This is the home page.</p>\\n" +
                        "</main>";
        
        String page = engine.buildPage("header", content, "footer", vars);
        
        System.out.println("Generated Page:");
        System.out.println("---------------");
        System.out.println(page);
    }
}

class LayoutEngine {
    private Map<String, String> components = new HashMap<>();
    
    public void registerComponent(String name, String template) {
        components.put(name, template);
    }
    
    public String buildPage(String headerName, String content, 
                           String footerName, Map<String, String> vars) {
        StringBuilder page = new StringBuilder();
        
        // Include header
        String header = components.get(headerName);
        page.append(processTemplate(header, vars));
        page.append("\\n");
        
        // Add content
        page.append(content);
        page.append("\\n");
        
        // Include footer
        String footer = components.get(footerName);
        page.append(processTemplate(footer, vars));
        
        return page.toString();
    }
    
    private String processTemplate(String template, Map<String, String> vars) {
        String result = template;
        for (Map.Entry<String, String> entry : vars.entrySet()) {
            result = result.replace("#{" + entry.getKey() + "}", entry.getValue());
        }
        return result;
    }
}`
    }
  ]
};

export default jspDirectives;
