const jspIntroduction = {
  id: 'jsp-introduction',
  title: 'JSP Introduction - JavaServer Pages for Dynamic Web Development',
  description: 'Complete guide to JSP - embedding Java in HTML, JSP lifecycle, JSTL, EL expressions, and building dynamic web applications with JavaServer Pages',
  content: `
# JSP Introduction - JavaServer Pages for Dynamic Web Development

JavaServer Pages (JSP) is a server-side technology that enables developers to create dynamic web content by embedding Java code within HTML pages. Unlike [servlets](/tutorial/servlet-introduction) that generate HTML programmatically, JSP allows developers to write HTML templates with embedded Java code, providing a more intuitive approach to building dynamic web applications.

JSP pages are compiled into servlets at runtime, combining the flexibility of HTML markup with the power of Java programming. This technology has been widely adopted in enterprise Java web applications for over two decades and serves as the foundation for modern Java web frameworks.

---

## What is JSP?

JSP is a server-side technology that enables embedding Java code directly within HTML pages. When a user requests a JSP page, the server processes the embedded Java code and generates pure HTML to send to the browser. This approach separates presentation logic from business logic, making web applications more maintainable.

**Basic JSP Example:**

\`\`\`jsp
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Hello, <%= request.getParameter("name") %>!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

In this example, JSP expressions (\`<%= %>\`) embed Java code that executes on the server before the HTML is sent to the client.

---

## Real-World Applications of JSP

JSP is extensively used in enterprise web applications for dynamic content generation. Understanding these use cases demonstrates JSP's role in modern web development.

### Application Example 1: E-Commerce Product Display

E-commerce platforms use JSP to dynamically render product information:

\`\`\`jsp
<!-- Real-world: Product page on Amazon -->
<%@ page import="com.example.Product" %>
<%
    Product product = (Product) request.getAttribute("product");
    List<Product> relatedProducts = (List<Product>) request.getAttribute("relatedProducts");
%>
<!DOCTYPE html>
<html>
<head>
    <title><%= product.getName() %></title>
</head>
<body>
    <h1><%= product.getName() %></h1>
    <p>Price: ₹<%= product.getPrice() %></p>
    <p>Stock: <%= product.getStock() %> available</p>
    <p>Rating: <%= product.getRating() %>/5</p>
    
    <h2>Related Products</h2>
    <ul>
    <% for (Product related : relatedProducts) { %>
        <li><%= related.getName() %> - ₹<%= related.getPrice() %></li>
    <% } %>
    </ul>
    
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

**Process Flow:**
1. [Servlet](/tutorial/servlet-introduction) retrieves product data from database using [JDBC](/tutorial/jdbc-introduction) or [Hibernate](/tutorial/hibernate-introduction)
2. Servlet stores product object in request attributes
3. Servlet forwards request to JSP page using RequestDispatcher
4. JSP accesses product data from request attributes
5. JSP dynamically renders product details using JSP expressions and scriptlets
6. JSP iterates through related products using JSP loops
7. Server sends rendered HTML to browser

This demonstrates JSP's capability in presenting dynamic data retrieved from servlets and databases.

### Application Example 2: Social Media Content Feeds

Social media platforms use JSP to render dynamic news feeds and user-generated content:

\`\`\`jsp
<!-- Real-world: News feed page -->
<%@ page import="java.util.List, com.example.Post" %>
<%
    List<Post> posts = (List<Post>) request.getAttribute("posts");
    User currentUser = (User) session.getAttribute("user");
%>
<!DOCTYPE html>
<html>
<body>
    <h1>Welcome, <%= currentUser.getName() %>!</h1>
    
    <div class="feed">
    <% for (Post post : posts) { %>
        <div class="post">
            <h3><%= post.getAuthor().getName() %></h3>
            <p><%= post.getContent() %></p>
            <p>Likes: <%= post.getLikes() %></p>
            <p>Posted: <%= post.getCreatedDate() %></p>
            
            <!-- Comments -->
            <div class="comments">
            <% for (Comment comment : post.getComments()) { %>
                <p><strong><%= comment.getAuthor().getName() %>:</strong> 
                   <%= comment.getContent() %></p>
            <% } %>
            </div>
        </div>
    <% } %>
    </div>
</body>
</html>
\`\`\`

**Process Flow:**
1. [Servlet](/tutorial/servlet-introduction) retrieves posts from database based on user's feed algorithm
2. Servlet loads user information from HTTP session
3. Servlet forwards request to JSP with posts and user data
4. JSP iterates through posts using JSP loops
5. JSP displays post content, author information, and engagement metrics
6. JSP renders nested comments for each post
7. JSP displays authenticated user's name from session

This demonstrates JSP's ability to handle complex nested data structures and session-based user information.

### Application Example 3: Financial Account Statements

Banking applications use JSP to display transaction history and account information:

\`\`\`jsp
<!-- Real-world: Bank statement page -->
<%@ page import="java.util.List, com.example.Transaction" %>
<%
    List<Transaction> transactions = (List<Transaction>) request.getAttribute("transactions");
    Account account = (Account) request.getAttribute("account");
%>
<!DOCTYPE html>
<html>
<body>
    <h1>Account Statement</h1>
    <p>Account Number: <%= account.getAccountNumber() %></p>
    <p>Balance: ₹<%= account.getBalance() %></p>
    
    <table border="1">
        <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
        </tr>
        <% for (Transaction txn : transactions) { %>
        <tr>
            <td><%= txn.getDate() %></td>
            <td><%= txn.getDescription() %></td>
            <td><%= txn.getType().equals("DEBIT") ? txn.getAmount() : "-" %></td>
            <td><%= txn.getType().equals("CREDIT") ? txn.getAmount() : "-" %></td>
            <td><%= txn.getBalance() %></td>
        </tr>
        <% } %>
    </table>
    
    <p>Generated on: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

**Process Flow:**
1. [Servlet](/tutorial/servlet-introduction) retrieves account information and transaction history from database
2. Servlet stores data in request attributes
3. Servlet forwards request to JSP page
4. JSP accesses account and transaction data from request
5. JSP iterates through transactions using JSP loops
6. JSP renders transaction table with debit/credit columns
7. Server sends complete HTML page to browser

This demonstrates JSP's capability in rendering complex tabular data with dynamic calculations.

### Scenario 4: Online Shopping Cart

**Application Example 4:** Shopping cart pages use JSP to display cart contents:

\`\`\`jsp
<!-- Real-world: Shopping cart page -->
<%@ page import="java.util.List, com.example.CartItem" %>
<%
    List<CartItem> cartItems = (List<CartItem>) session.getAttribute("cart");
    double total = 0;
%>
<!DOCTYPE html>
<html>
<body>
    <h1>Shopping Cart</h1>
    
    <% if (cartItems == null || cartItems.isEmpty()) { %>
        <p>Your cart is empty!</p>
    <% } else { %>
        <table border="1">
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            <% for (CartItem item : cartItems) {
                double itemTotal = item.getPrice() * item.getQuantity();
                total += itemTotal;
            %>
            <tr>
                <td><%= item.getProduct().getName() %></td>
                <td>₹<%= item.getPrice() %></td>
                <td><%= item.getQuantity() %></td>
                <td>₹<%= itemTotal %></td>
            </tr>
            <% } %>
        </table>
        
        <h2>Total: ₹<%= total %></h2>
        <a href="checkout.jsp">Proceed to Checkout</a>
    <% } %>
</body>
</html>
\`\`\`

**Process Flow:**
1. Cart items are stored in HTTP session by [servlet](/tutorial/servlet-introduction) during shopping
2. JSP retrieves cart from session using \`session.getAttribute()\`
3. JSP checks if cart is empty using conditional logic
4. JSP iterates through cart items using JSP loops
5. JSP calculates item totals and grand total dynamically
6. JSP conditionally displays checkout button based on cart state
7. Server sends rendered cart page to browser

This demonstrates JSP's ability to work with session data and perform dynamic calculations for e-commerce applications.

### Scenario 5: Hospital Appointment Booking

**Application Example 5:** Healthcare appointment systems use JSP for scheduling interfaces:

\`\`\`jsp
<!-- Real-world: Appointment booking page -->
<%@ page import="java.util.List, com.example.Doctor, com.example.TimeSlot" %>
<%
    Doctor doctor = (Doctor) request.getAttribute("doctor");
    List<TimeSlot> availableSlots = (List<TimeSlot>) request.getAttribute("availableSlots");
%>
<!DOCTYPE html>
<html>
<body>
    <h1>Book Appointment</h1>
    <h2>Dr. <%= doctor.getName() %> - <%= doctor.getSpecialization() %></h2>
    
    <form action="bookAppointment" method="post">
        <input type="hidden" name="doctorId" value="<%= doctor.getId() %>">
        
        <label>Select Date:</label>
        <input type="date" name="appointmentDate" required>
        
        <label>Select Time Slot:</label>
        <select name="timeSlot" required>
            <% for (TimeSlot slot : availableSlots) { %>
                <option value="<%= slot.getTime() %>">
                    <%= slot.getTime() %> - <%= slot.isAvailable() ? "Available" : "Booked" %>
                </option>
            <% } %>
        </select>
        
        <button type="submit">Book Appointment</button>
    </form>
    
    <p>Current date: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

**Process Flow:**
1. [Servlet](/tutorial/servlet-introduction) retrieves doctor information from database
2. Servlet queries available appointment slots for selected date
3. Servlet stores doctor and time slots in request attributes
4. Servlet forwards request to JSP booking page
5. JSP displays doctor details using JSP expressions
6. JSP populates time slot dropdown using JSP loops
7. JSP renders appointment booking form with validation
8. User submits form, which is processed by servlet

This demonstrates JSP's role in creating interactive forms with dynamic data population.

---

## Why Use JSP?

### Servlet Approach (Hard Way)

\`\`\`java
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Welcome</title></head>");
        out.println("<body>");
        out.println("<h1>Hello, " + request.getParameter("name") + "!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}
\`\`\`

### JSP Approach (Easy Way)

\`\`\`jsp
<!DOCTYPE html>
<html>
<head><title>Welcome</title></head>
<body>
    <h1>Hello, <%= request.getParameter("name") %>!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

**Much cleaner!** The HTML structure is visible, and Java code is only where needed.

---

## How JSP Works

\`\`\`
1. Browser requests page.jsp
2. Server checks if JSP is compiled
3. If not, translates JSP to Servlet
4. Compiles the Servlet
5. Executes the Servlet
6. Returns HTML to browser
\`\`\`

### Behind the Scenes

Your JSP file gets converted to a servlet automatically:

**hello.jsp:**
\`\`\`jsp
<h1>Hello, <%= name %></h1>
\`\`\`

**Becomes (simplified):**
\`\`\`java
public class hello_jsp extends HttpServlet {
    public void _jspService(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter out = response.getWriter();
        out.write("<h1>Hello, ");
        out.print(name);
        out.write("</h1>");
    }
}
\`\`\`

---

## JSP vs Servlet

| Feature | JSP | Servlet |
|---------|-----|---------|
| Primary content | HTML with Java | Java with HTML |
| Best for | Presentation/View | Business logic/Controller |
| Ease of design | Easy for designers | Hard for designers |
| Compilation | Auto-compiled | Manual compile |
| Changes | Hot reload | Restart needed |

### When to Use What

- **JSP:** Display data, forms, user interface
- **Servlet:** Process forms, business logic, database operations
- **Best Practice:** Use both together (MVC pattern)

---

## Your First JSP

### 1. Create the File

Save as \`hello.jsp\` in your web application's root:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>My First JSP</title>
</head>
<body>
    <h1>Welcome to JSP!</h1>
    
    <%-- This is a JSP comment --%>
    
    <p>Server time: <%= new java.util.Date() %></p>
    
    <% 
        String name = request.getParameter("name");
        if (name == null) {
            name = "Guest";
        }
    %>
    
    <p>Hello, <%= name %>!</p>
    
    <form method="get">
        <input type="text" name="name" placeholder="Enter your name">
        <button type="submit">Greet Me</button>
    </form>
</body>
</html>
\`\`\`

### 2. Access It

Open in browser: \`http://localhost:8080/yourapp/hello.jsp\`

---

## JSP Syntax Overview

### Expression: <%= %>

Output a value:

\`\`\`jsp
<p>2 + 2 = <%= 2 + 2 %></p>
<p>Name: <%= user.getName() %></p>
\`\`\`

### Scriptlet: <% %>

Execute Java code:

\`\`\`jsp
<%
    for (int i = 1; i <= 5; i++) {
        out.println("<p>Line " + i + "</p>");
    }
%>
\`\`\`

### Declaration: <%! %>

Declare methods or variables:

\`\`\`jsp
<%!
    private int counter = 0;
    
    public String formatDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
%>
\`\`\`

### Directive: <%@ %>

Page configuration:

\`\`\`jsp
<%@ page language="java" contentType="text/html" %>
<%@ page import="java.util.*, java.text.*" %>
<%@ include file="header.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
\`\`\`

---

## Real-World Example: Product List

\`\`\`jsp
<%@ page import="java.util.*, com.example.Product" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Product Catalog</title>
</head>
<body>
    <h1>Our Products</h1>
    
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
        
        <c:forEach var="product" items="\${products}">
            <tr>
                <td>\${product.id}</td>
                <td>\${product.name}</td>
                <td>$\${product.price}</td>
                <td>
                    <a href="cart?action=add&id=\${product.id}">Add to Cart</a>
                </td>
            </tr>
        </c:forEach>
    </table>
    
    <c:if test="\${empty products}">
        <p>No products available.</p>
    </c:if>
</body>
</html>
\`\`\`

---

## JSP vs Modern Alternatives

### JSP vs Template Engines

**Thymeleaf:**
- Natural templates (HTML valid)
- Better separation of concerns
- Strong Spring integration
- Modern syntax

**FreeMarker:**
- Template engine (not JSP)
- More flexible than JSP
- Better performance
- Used in many enterprise applications

**Mustache/Handlebars:**
- Logic-less templates
- Client and server-side rendering
- Simple syntax
- Popular in modern web development

### When to Use JSP

**Use JSP when:**
- Working with legacy Java web applications
- Team is familiar with JSP syntax
- Integrating with existing JSP-based systems
- Simple dynamic content requirements

**Consider alternatives when:**
- Building new applications (use Thymeleaf or modern frameworks)
- Requiring better separation of concerns
- Needing client-side rendering capabilities
- Working with modern JavaScript frameworks

---

## Performance Optimization

### JSP Compilation

JSP pages are compiled to servlets on first request. Subsequent requests use the compiled servlet, improving performance.

**Optimization strategies:**
- Precompile JSPs during deployment
- Minimize scriptlet usage (use JSTL/EL instead)
- Cache frequently accessed data
- Use JSP include efficiently

### Best Practices for Performance

\`\`\`jsp
<%-- Good: Use JSTL instead of scriptlets --%>
<c:forEach var="item" items="\${items}">
    <p>\${item.name}</p>
</c:forEach>

<%-- Bad: Scriptlets are slower --%>
<% for (Item item : items) { %>
    <p><%= item.getName() %></p>
<% } %>
\`\`\`

---

## Security Considerations

### XSS Prevention

Always escape user input to prevent cross-site scripting:

\`\`\`jsp
<%-- Use JSTL c:out for automatic escaping --%>
<c:out value="\${userInput}" />

<%-- Bad: Direct output is vulnerable --%>
<%= userInput %>
\`\`\`

### Input Validation

Validate all user input before processing:

\`\`\`jsp
<c:if test="\${not empty param.username}">
    <p>Welcome, <c:out value="\${param.username}" /></p>
</c:if>
\`\`\`

---

## Common Pitfalls

### 1. Mixing Business Logic with Presentation

**Problem:**
\`\`\`jsp
<%
    // Business logic in JSP - BAD!
    List<Product> products = productService.getAllProducts();
    products = products.stream()
        .filter(p -> p.getPrice() > 100)
        .collect(Collectors.toList());
%>
\`\`\`

**Solution:** Move logic to servlet or service layer:
\`\`\`java
// In Servlet
List<Product> products = productService.getExpensiveProducts();
request.setAttribute("products", products);
request.getRequestDispatcher("products.jsp").forward(request, response);
\`\`\`

### 2. Excessive Scriptlet Usage

**Problem:** Too much Java code in JSP makes maintenance difficult.

**Solution:** Use JSTL and Expression Language (EL).

### 3. Not Handling Null Values

**Problem:**
\`\`\`jsp
<%= user.getName() %> <%-- NullPointerException if user is null --%>
\`\`\`

**Solution:**
\`\`\`jsp
<c:if test="\${not empty user}">
    <c:out value="\${user.name}" />
</c:if>
\`\`\`

---

## Frequently Asked Questions (FAQs)

### Q1: What is the difference between JSP and Servlets?

**A:** Servlets are Java classes that generate HTML programmatically using PrintWriter. JSP pages are HTML-like files with embedded Java code that compile into servlets. Servlets are better for complex business logic, while JSP simplifies view generation. Modern applications use servlets as controllers and JSP for views. Learn more about [Servlets Introduction](/tutorial/servlet-introduction) for request handling.

### Q2: Are JSP pages still used in modern applications?

**A:** JSP is still used in legacy enterprise applications, but many new projects prefer modern template engines like Thymeleaf, FreeMarker, or JavaScript-based solutions (React, Vue). JSP remains relevant for maintaining existing systems and teams familiar with JSP. However, new projects typically choose alternatives for better separation of concerns and modern development workflows.

### Q3: What are JSP implicit objects and how do I use them?

**A:** JSP provides nine implicit objects: request, response, out, session, application, pageContext, config, page, and exception. These objects are automatically available in JSP pages without declaration. For example, \`request.getParameter("name")\` accesses request parameters, and \`session.setAttribute("user", user)\` stores session data. Understanding implicit objects is essential for JSP development.

### Q4: What is the difference between JSP scriptlets, expressions, and declarations?

**A:** Scriptlets (\`<% code %>\`) contain Java code that executes during page processing. Expressions (\`<%= value %>\`) output values directly to the response. Declarations (\`<%! declaration %>\`) define variables or methods at the servlet class level. Modern best practice is to minimize scriptlets and use JSTL/EL instead for better maintainability.

### Q5: How do I pass data from a Servlet to a JSP page?

**A:** Use request attributes: \`request.setAttribute("key", value);\` in the servlet, then access with \`\${key}\` or \`request.getAttribute("key")\` in JSP. For session data, use \`session.setAttribute()\`. For application-wide data, use \`application.setAttribute()\`. Forward the request using \`request.getRequestDispatcher("page.jsp").forward(request, response);\`.

### Q6: What is JSTL and why should I use it?

**A:** JSTL (JSP Standard Tag Library) provides standard tags for common tasks (iteration, conditionals, formatting) without writing Java code. JSTL improves code readability, reduces scriptlet usage, and separates presentation from logic. Common libraries include Core (\`<c:forEach>\`), Formatting (\`<fmt:formatDate>\`), and SQL (\`<sql:query>\`). JSTL is essential for maintainable JSP applications.

### Q7: How do I handle errors in JSP pages?

**A:** Use error pages configured in \`web.xml\` or JSP \`errorPage\` directive. Define error handling: \`<%@ page errorPage="error.jsp" %>\`. In the error page, access exception with \`\${exception}\` or \`request.getAttribute("javax.servlet.error.exception")\`. Implement proper error handling to provide user-friendly error messages and log errors for debugging.

### Q8: Can I use JSP with modern JavaScript frameworks?

**A:** JSP can generate initial HTML and data, while JavaScript frameworks handle client-side interactivity. However, this approach creates mixed concerns. Modern applications typically use JSP/Thymeleaf for server-side rendering or separate frontend (React/Vue) with REST APIs. Choose based on application requirements: server-side rendering (JSP) or client-side rendering (JavaScript frameworks).

### Q9: What is the JSP lifecycle?

**A:** JSP lifecycle consists of: translation (JSP to servlet source), compilation (servlet source to class), loading (servlet class loaded), instantiation (servlet instance created), initialization (\`jspInit()\`), service (\`_jspService()\` for each request), and destruction (\`jspDestroy()\`). Understanding the lifecycle helps optimize JSP performance and manage resources effectively.

### Q10: How do I optimize JSP performance?

**A:** Performance optimization strategies include: precompiling JSPs during deployment, minimizing scriptlet usage (use JSTL/EL), caching frequently accessed data, using JSP include efficiently, avoiding excessive use of \`<%@ include %>\`, and configuring appropriate buffer sizes. Profile JSP execution to identify bottlenecks. Consider using template engines (Thymeleaf) for better performance in new applications.

---

## Key Takeaways

- **JSP (JavaServer Pages)** enables dynamic web content by embedding Java code in HTML templates
- **JSP compiles to servlets** at runtime, combining HTML flexibility with Java power
- **JSTL and Expression Language** should replace scriptlets for better maintainability
- **Separation of concerns** requires business logic in servlets/services, presentation in JSP
- **JSP implicit objects** provide convenient access to request, response, session, and application data
- **Security best practices** include input validation, XSS prevention, and proper error handling
- **Modern alternatives** (Thymeleaf, FreeMarker) offer better separation of concerns for new projects
- **JSP remains relevant** for legacy systems and teams familiar with JSP syntax

---

## What's Next?

Master these JSP topics:

1. **[JSP Scripting Elements](/tutorial/jsp-scripting-elements)** — Scriptlets, expressions, declarations
2. **[JSP Directives](/tutorial/jsp-directives)** — Page, include, taglib directives
3. **[JSP Implicit Objects](/tutorial/jsp-implicit-objects)** — request, response, session, application
4. **[JSP Expression Language (EL)](/tutorial/jsp-expression-language)** — Simplify JSP code
5. **[JSP JSTL](/tutorial/jsp-jstl)** — JSP Standard Tag Library
6. **[JSP Action Tags](/tutorial/jsp-action-tags)** — jsp:include, jsp:forward, jsp:useBean
7. **[JSP Custom Tags](/tutorial/jsp-custom-tags)** — Create reusable components
8. **[JSP Architecture](/tutorial/jsp-architecture)** — How JSP works internally

**Prerequisites:**
- Learn [Servlets Introduction](/tutorial/servlet-introduction) first
- Understand [HTTP Request and Response](/tutorial/servlet-http-request-response)
- Master [Session Management](/tutorial/servlet-session-management)

**Next Level:**
- Use [Spring Boot](/tutorial/spring-boot-introduction) with Thymeleaf templates
- Learn [Spring MVC](/tutorial/spring-mvc-introduction) for modern web development
`,
  code: `// JSP Introduction Demo
// Demonstrates JSP concepts and syntax

import java.util.*;

public class JspIntroDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Introduction Demo ===\\n");
        
        // 1. WHAT IS JSP
        System.out.println("1. WHAT IS JSP?");
        System.out.println("   -------------");
        System.out.println("   JSP = JavaServer Pages");
        System.out.println("   - Server-side technology");
        System.out.println("   - HTML with embedded Java code");
        System.out.println("   - Automatically compiled to servlets");
        System.out.println();
        
        // 2. JSP VS SERVLET COMPARISON
        System.out.println("2. JSP VS SERVLET");
        System.out.println("   ---------------");
        System.out.println();
        
        System.out.println("   SERVLET (Java with HTML):");
        System.out.println("   -------------------------");
        String servletCode = 
            "   out.println(\\"<html>\\");\\n" +
            "   out.println(\\"<body>\\");\\n" +
            "   out.println(\\"<h1>Hello, \\" + name + \\"!</h1>\\");\\n" +
            "   out.println(\\"</body>\\");\\n" +
            "   out.println(\\"</html>\\");";
        System.out.println(servletCode);
        System.out.println();
        
        System.out.println("   JSP (HTML with Java):");
        System.out.println("   ---------------------");
        String jspCode = 
            "   <html>\\n" +
            "   <body>\\n" +
            "   <h1>Hello, <%= name %>!</h1>\\n" +
            "   </body>\\n" +
            "   </html>";
        System.out.println(jspCode);
        System.out.println();
        
        // 3. HOW JSP WORKS
        System.out.println("3. HOW JSP WORKS");
        System.out.println("   --------------");
        System.out.println("   1. Browser requests page.jsp");
        System.out.println("   2. Server translates JSP to Servlet");
        System.out.println("   3. Server compiles the Servlet");
        System.out.println("   4. Server executes the Servlet");
        System.out.println("   5. HTML response sent to browser");
        System.out.println();
        
        // 4. JSP SYNTAX ELEMENTS
        System.out.println("4. JSP SYNTAX ELEMENTS");
        System.out.println("   --------------------");
        System.out.println();
        
        System.out.println("   Expression: <%= expression %>");
        System.out.println("   Example: <%= 2 + 2 %> outputs: 4");
        System.out.println();
        
        System.out.println("   Scriptlet: <% code %>");
        System.out.println("   Example: <% for(int i=0; i<5; i++) { %>");
        System.out.println();
        
        System.out.println("   Declaration: <%! declaration %>");
        System.out.println("   Example: <%! int count = 0; %>");
        System.out.println();
        
        System.out.println("   Directive: <%@ directive %>");
        System.out.println("   Example: <%@ page import=\\"java.util.*\\" %>");
        System.out.println();
        
        System.out.println("   Comment: <%-- comment --%>");
        System.out.println("   (Not sent to browser)");
        System.out.println();
        
        // 5. SIMULATE JSP PROCESSING
        System.out.println("5. SIMULATING JSP PROCESSING");
        System.out.println("   --------------------------");
        
        String jspTemplate = 
            "<html>\\n" +
            "<body>\\n" +
            "<h1>Hello, <%= name %>!</h1>\\n" +
            "<p>Today is <%= date %></p>\\n" +
            "<ul>\\n" +
            "<% for(item : items) { %>\\n" +
            "  <li><%= item %></li>\\n" +
            "<% } %>\\n" +
            "</ul>\\n" +
            "</body>\\n" +
            "</html>";
        
        System.out.println("   JSP Template:");
        System.out.println("   " + jspTemplate.replace("\\n", "\\n   "));
        System.out.println();
        
        // Process the template
        Map<String, Object> data = new HashMap<>();
        data.put("name", "John");
        data.put("date", new Date().toString());
        data.put("items", Arrays.asList("Apple", "Banana", "Orange"));
        
        String output = processJsp(jspTemplate, data);
        
        System.out.println("   Processed Output:");
        System.out.println("   " + output.replace("\\n", "\\n   "));
        System.out.println();
        
        // 6. COMPARISON TABLE
        System.out.println("6. JSP VS SERVLET COMPARISON");
        System.out.println("   --------------------------");
        System.out.println("   | Feature      | JSP              | Servlet          |");
        System.out.println("   |--------------|------------------|------------------|");
        System.out.println("   | Content      | HTML with Java   | Java with HTML   |");
        System.out.println("   | Best for     | Presentation     | Business logic   |");
        System.out.println("   | Design       | Easy for UI      | Hard for UI      |");
        System.out.println("   | Compilation  | Auto-compiled    | Manual compile   |");
        System.out.println("   | Changes      | Hot reload       | Restart needed   |");
        System.out.println();
        
        // 7. BEST PRACTICES
        System.out.println("7. BEST PRACTICES");
        System.out.println("   ---------------");
        System.out.println("   1. Use JSP for presentation (View)");
        System.out.println("   2. Use Servlets for logic (Controller)");
        System.out.println("   3. Use JavaBeans for data (Model)");
        System.out.println("   4. Minimize Java code in JSP");
        System.out.println("   5. Use JSTL and EL instead of scriptlets");
    }
    
    // Simple JSP processor simulation
    static String processJsp(String template, Map<String, Object> data) {
        String result = template;
        
        // Replace expressions
        result = result.replace("<%= name %>", (String) data.get("name"));
        result = result.replace("<%= date %>", (String) data.get("date"));
        
        // Handle loop (simplified)
        StringBuilder items = new StringBuilder();
        for (Object item : (List<?>) data.get("items")) {
            items.append("  <li>").append(item).append("</li>\\n");
        }
        
        // Replace loop construct
        result = result.replaceAll(
            "<% for\\\\(item : items\\\\) \\\\{ %>\\\\n  <li><%= item %></li>\\\\n<% \\\\} %>\\\\n",
            items.toString()
        );
        
        return result;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple JSP template processor',
      hint: 'Replace placeholders with actual values',
      starterCode: `import java.util.*;

public class JspProcessorDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Template Processor Demo ===\\n");
        
        JspProcessor processor = new JspProcessor();
        
        // Template with expressions
        String template = 
            "<html>\\n" +
            "<head><title><%= title %></title></head>\\n" +
            "<body>\\n" +
            "  <h1>Welcome, <%= username %>!</h1>\\n" +
            "  <p>You have <%= messageCount %> messages.</p>\\n" +
            "  <p>Last login: <%= lastLogin %></p>\\n" +
            "</body>\\n" +
            "</html>";
        
        System.out.println("Template:");
        System.out.println(template);
        System.out.println();
        
        // Data to inject
        Map<String, String> data = new HashMap<>();
        data.put("title", "Dashboard");
        data.put("username", "John Doe");
        data.put("messageCount", "5");
        data.put("lastLogin", "2024-01-15 10:30 AM");
        
        // Process template
        String output = processor.process(template, data);
        
        System.out.println("Processed Output:");
        System.out.println(output);
    }
}

class JspProcessor {
    public String process(String template, Map<String, String> data) {
        String result = template;
        
        // Replace all <%= key %> with values
        for (Map.Entry<String, String> entry : data.entrySet()) {
            String placeholder = "<%= " + entry.getKey() + " %>";
            result = result.replace(placeholder, entry.getValue());
        }
        
        return result;
    }
}`
    }
  ]
};

export default jspIntroduction;
