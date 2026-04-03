const jspActionTags = {
  id: 'jsp-action-tags',
  title: 'JSP Action Tags',
  description: 'Standard actions for common tasks',
  content: `
# JSP Action Tags — Built-in Functionality

Action tags are XML-style tags that perform common tasks like including pages, forwarding requests, and working with JavaBeans. They're cleaner than scriptlets and easier to read.

---

## Common Action Tags

| Tag | Purpose |
|-----|---------|
| \`<jsp:include>\` | Include page at runtime |
| \`<jsp:forward>\` | Forward to another page |
| \`<jsp:useBean>\` | Create or find a JavaBean |
| \`<jsp:setProperty>\` | Set bean property |
| \`<jsp:getProperty>\` | Get bean property |
| \`<jsp:param>\` | Pass parameters |

---

## jsp:include — Dynamic Include

Includes another page at runtime (not compile time like the include directive).

### Basic Include

\`\`\`jsp
<jsp:include page="header.jsp" />

<main>
    <h1>Main Content</h1>
</main>

<jsp:include page="footer.jsp" />
\`\`\`

### Include with Parameters

\`\`\`jsp
<jsp:include page="header.jsp">
    <jsp:param name="title" value="Home Page" />
    <jsp:param name="showNav" value="true" />
</jsp:include>
\`\`\`

**In header.jsp:**
\`\`\`jsp
<title><%= request.getParameter("title") %></title>
\`\`\`

### Include Directive vs Action

| Feature | \`<%@ include %>\` | \`<jsp:include>\` |
|---------|-------------------|------------------|
| When | Compile time | Runtime |
| Content | Static | Dynamic |
| Parameters | No | Yes |
| Changes | Needs recompile | Immediate |

---

## jsp:forward — Request Forwarding

Forwards the request to another resource. The URL in the browser doesn't change.

### Basic Forward

\`\`\`jsp
<%
    if (user == null) {
%>
    <jsp:forward page="login.jsp" />
<%
    }
%>
\`\`\`

### Forward with Parameters

\`\`\`jsp
<jsp:forward page="result.jsp">
    <jsp:param name="status" value="success" />
    <jsp:param name="message" value="Operation completed" />
</jsp:forward>
\`\`\`

### Forward vs Redirect

| Feature | Forward | Redirect |
|---------|---------|----------|
| URL | Doesn't change | Changes |
| Request | Same request | New request |
| Data | Preserved | Lost |
| Speed | Faster | Slower |

---

## jsp:useBean — Working with JavaBeans

Creates or finds a JavaBean instance.

### Basic Usage

\`\`\`jsp
<jsp:useBean id="user" class="com.example.User" scope="session" />
\`\`\`

This is equivalent to:
\`\`\`java
User user = (User) session.getAttribute("user");
if (user == null) {
    user = new User();
    session.setAttribute("user", user);
}
\`\`\`

### Scope Options

\`\`\`jsp
<jsp:useBean id="pageBean" class="com.example.Bean" scope="page" />
<jsp:useBean id="requestBean" class="com.example.Bean" scope="request" />
<jsp:useBean id="sessionBean" class="com.example.Bean" scope="session" />
<jsp:useBean id="appBean" class="com.example.Bean" scope="application" />
\`\`\`

### With Type (Interface)

\`\`\`jsp
<jsp:useBean id="list" type="java.util.List" class="java.util.ArrayList" scope="request" />
\`\`\`

---

## jsp:setProperty — Setting Bean Properties

### Set Individual Property

\`\`\`jsp
<jsp:useBean id="user" class="com.example.User" scope="session" />
<jsp:setProperty name="user" property="name" value=" Dattu" />
<jsp:setProperty name="user" property="email" value=" Dattu@email.com" />
\`\`\`

### Set from Request Parameter

\`\`\`jsp
<%-- If parameter name matches property name --%>
<jsp:setProperty name="user" property="name" param="name" />

<%-- Or automatically match all parameters --%>
<jsp:setProperty name="user" property="*" />
\`\`\`

### Set with Expression

\`\`\`jsp
<jsp:setProperty name="user" property="registrationDate" 
                 value="<%= new java.util.Date() %>" />
\`\`\`

---

## jsp:getProperty — Getting Bean Properties

\`\`\`jsp
<jsp:useBean id="user" class="com.example.User" scope="session" />

<p>Name: <jsp:getProperty name="user" property="name" /></p>
<p>Email: <jsp:getProperty name="user" property="email" /></p>
\`\`\`

---

## Complete Example: User Registration

### User.java (JavaBean)

\`\`\`java
package com.example;

public class User {
    private String name;
    private String email;
    private int age;
    
    // Default constructor required
    public User() {}
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
\`\`\`

### register.jsp (Form)

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <h1>User Registration</h1>
    
    <form action="process.jsp" method="post">
        <p>
            <label>Name:</label>
            <input type="text" name="name" required>
        </p>
        <p>
            <label>Email:</label>
            <input type="email" name="email" required>
        </p>
        <p>
            <label>Age:</label>
            <input type="number" name="age" required>
        </p>
        <button type="submit">Register</button>
    </form>
</body>
</html>
\`\`\`

### process.jsp (Processing)

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>

<%-- Create bean and populate from form --%>
<jsp:useBean id="user" class="com.example.User" scope="session" />
<jsp:setProperty name="user" property="*" />

<%-- Validate --%>
<%
    if (user.getName() == null || user.getName().isEmpty()) {
%>
    <jsp:forward page="register.jsp">
        <jsp:param name="error" value="Name is required" />
    </jsp:forward>
<%
    }
%>

<%-- Success - forward to confirmation --%>
<jsp:forward page="confirm.jsp" />
\`\`\`

### confirm.jsp (Confirmation)

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>

<jsp:useBean id="user" class="com.example.User" scope="session" />

<!DOCTYPE html>
<html>
<head>
    <title>Registration Confirmed</title>
</head>
<body>
    <h1>Welcome!</h1>
    
    <p>Your registration is complete.</p>
    
    <h2>Your Details:</h2>
    <ul>
        <li>Name: <jsp:getProperty name="user" property="name" /></li>
        <li>Email: <jsp:getProperty name="user" property="email" /></li>
        <li>Age: <jsp:getProperty name="user" property="age" /></li>
    </ul>
</body>
</html>
\`\`\`

---

## 10 Important JSP Action Tags Interview Questions

### 1. What are JSP standard actions?

**Answer:** They are XML-style elements in the \`jsp\` namespace (\`<jsp:include>\`, \`<jsp:forward>\`, \`<jsp:useBean>\`, \`<jsp:setProperty>\`, \`<jsp:getProperty>\`, \`<jsp:param>\`, etc.) interpreted by the container at **runtime** as part of JSP processing. Unlike directives, they participate in **request-time** composition and bean wiring. They map closely to servlet APIs such as **RequestDispatcher** and **attribute** scopes.

### 2. How does \`<jsp:include>\` differ from the include directive?

**Answer:** \`<jsp:include page="target.jsp" />\` dispatches to another resource during the **request**, merges its **output** into the current response, and can vary per invocation. \`<%@ include file="..." %>\` inlines another file at **translation** time into **one** servlet class. Choose include **action** for **dynamic** or parameterized fragments; choose the **directive** for **static** templates that rarely change. This distinction is fundamental.

### 3. Compare \`<jsp:forward>\` with \`HttpServletResponse.sendRedirect\`.

**Answer:** **Forward** happens **entirely on the server**: the same request continues to a new resource, the browser URL usually **unchanged**, and **request attributes** remain. **Redirect** sends a **3xx** Location header; the browser issues a **new** GET, losing **POST** body unless you rebuild it, but enabling **bookmarkable** URLs and **PRG** (Post/Redirect/Get) patterns for **duplicate submit** prevention. Interview answers should mention **attribute** lifetime and **bookmark** behavior.

### 4. Explain \`<jsp:useBean>\` in depth.

**Answer:** The container looks up an object under the given **id** in the chosen **scope** (\`page\`, \`request\`, \`session\`, \`application\`). If missing, it may **instantiate** the **class** (requires a **no-arg** constructor), bind it under that id, and optionally run a \`jsp:useBean\` body for initialization. This mirrors manual code: \`getAttribute\` / \`new\` / \`setAttribute\`. Scope choice drives **visibility** and **memory**: session beans follow **users**; application beans are **global**.

### 5. What does \`<jsp:setProperty property="*" />\` do?

**Answer:** It matches **request parameter names** to **JavaBean setter** names (\`name\` → \`setName\`) and assigns **strings** with appropriate **conversion** for primitive properties. It is a quick way to **populate** a form-backed bean in **one** tag. Caveats: **type** conversion errors surface as exceptions; **security** requires validating input afterward; **nested** properties need more than \`*\` in complex cases.

### 6. How are \`<jsp:param>\` elements used?

**Answer:** Nested inside \`jsp:include\` or \`jsp:forward\`, they add **request parameters** visible to the **target** resource (as if they were query or form parameters, depending on dispatcher behavior). This is how you pass **context** to an included header without global state. Contrast with **request attributes**, which are **server-only** and not tied to parameter maps.

### 7. Why can \`forward\` fail with \`IllegalStateException\`?

**Answer:** Forwarding requires a **non-committed** response. If the JSP (or a tag) has **flushed** the buffer, headers and status may already be sent, so the container cannot switch the active resource. Managing **buffer** sizes, \`autoFlush\`, and avoiding premature prints before **forward** is part of servlet discipline.

### 8. Discuss choosing \`session\` vs \`application\` scope on \`useBean\`.

**Answer:** **Session** stores **per-user** conversational state (carts, wizard steps) but increases **memory** per user and complicates **clustering** unless sessions replicate or are sticky. **Application** scope shares **one** bean for **everyone**—only appropriate for **read-mostly** singletons (with thread-safe design), never for individual user data. Wrong scope causes **data leaks** between users—an interview-worthy horror story.

### 9. What goes wrong with \`<jsp:getProperty>\`?

**Answer:** The bean must expose a **readable** property: public \`getXxx()\` matching the **property** name. Typos, missing getters, or **null** beans cause **exceptions** or empty output. This is why many teams moved to **EL** (\`\${bean.prop}\`) which still requires correct getters but reads more cleanly—always escape untrusted values in output.

### 10. Are action tags obsolete in modern Spring applications?

**Answer:** Not **obsolete**, but **less central**. Spring MVC **controllers** usually put **model** objects in the request and return a **view** name; JSPs bind with **EL/JSTL** instead of \`useBean\`. You still see **jsp:include** for layout on legacy apps, and action tags remain fair game in **certification** and **maintenance** interviews. A balanced answer acknowledges **ecosystem shift** without dismissing JSP features outright.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Directives** | [JSP directives](/tutorial/jsp-directives) |
| **Implicit objects** | [JSP implicit objects](/tutorial/jsp-implicit-objects) |
| **EL** | [JSP Expression Language](/tutorial/jsp-expression-language) |
| **JSTL** | [JSP JSTL](/tutorial/jsp-jstl) |
| **Servlet basics** | [Servlet introduction](/tutorial/servlet-introduction) |

`,
  code: `// JSP Action Tags Demo
// Demonstrates include, forward, useBean, and property tags

import java.util.*;

public class JspActionTagsDemo {
    public static void main(String[] args) {
        System.out.println("=== JSP Action Tags Demo ===\\n");
        
        // 1. JSP:INCLUDE
        System.out.println("1. <jsp:include> - Dynamic Include");
        System.out.println("   --------------------------------");
        System.out.println("   Syntax: <jsp:include page=\\"file.jsp\\" />");
        System.out.println();
        System.out.println("   With parameters:");
        System.out.println("   <jsp:include page=\\"header.jsp\\">");
        System.out.println("       <jsp:param name=\\"title\\" value=\\"Home\\" />");
        System.out.println("   </jsp:include>");
        System.out.println();
        
        // Simulate include
        System.out.println("   Simulated output:");
        System.out.println("   -----------------");
        String header = simulateInclude("header.jsp", Map.of("title", "Home Page"));
        String content = "<main><h1>Welcome!</h1></main>";
        String footer = simulateInclude("footer.jsp", Map.of());
        System.out.println("   " + header);
        System.out.println("   " + content);
        System.out.println("   " + footer);
        System.out.println();
        
        // 2. JSP:FORWARD
        System.out.println("2. <jsp:forward> - Request Forwarding");
        System.out.println("   -----------------------------------");
        System.out.println("   Syntax: <jsp:forward page=\\"target.jsp\\" />");
        System.out.println();
        System.out.println("   With parameters:");
        System.out.println("   <jsp:forward page=\\"result.jsp\\">");
        System.out.println("       <jsp:param name=\\"status\\" value=\\"success\\" />");
        System.out.println("   </jsp:forward>");
        System.out.println();
        System.out.println("   Forward vs Redirect:");
        System.out.println("   | Feature  | Forward        | Redirect       |");
        System.out.println("   |----------|----------------|----------------|");
        System.out.println("   | URL      | Doesn't change | Changes        |");
        System.out.println("   | Request  | Same           | New            |");
        System.out.println("   | Data     | Preserved      | Lost           |");
        System.out.println();
        
        // 3. JSP:USEBEAN
        System.out.println("3. <jsp:useBean> - JavaBean Management");
        System.out.println("   ------------------------------------");
        System.out.println("   Syntax: <jsp:useBean id=\\"user\\" class=\\"com.example.User\\" scope=\\"session\\" />");
        System.out.println();
        System.out.println("   Equivalent Java code:");
        System.out.println("   User user = (User) session.getAttribute(\\"user\\");");
        System.out.println("   if (user == null) {");
        System.out.println("       user = new User();");
        System.out.println("       session.setAttribute(\\"user\\", user);");
        System.out.println("   }");
        System.out.println();
        
        // Simulate useBean
        SimulatedSession session = new SimulatedSession();
        User user = simulateUseBean(session, "user", User.class);
        System.out.println("   Created bean: " + user);
        System.out.println();
        
        // 4. JSP:SETPROPERTY
        System.out.println("4. <jsp:setProperty> - Setting Bean Properties");
        System.out.println("   --------------------------------------------");
        System.out.println("   Individual property:");
        System.out.println("   <jsp:setProperty name=\\"user\\" property=\\"name\\" value=\\" Dattu\\" />");
        System.out.println();
        System.out.println("   From request parameter:");
        System.out.println("   <jsp:setProperty name=\\"user\\" property=\\"name\\" param=\\"name\\" />");
        System.out.println();
        System.out.println("   All properties from request:");
        System.out.println("   <jsp:setProperty name=\\"user\\" property=\\"*\\" />");
        System.out.println();
        
        // Simulate setProperty
        simulateSetProperty(user, "name", "Dattu p");
        simulateSetProperty(user, "email", " Dattu@email.com");
        simulateSetProperty(user, "age", 25);
        System.out.println("   After setting properties: " + user);
        System.out.println();
        
        // 5. JSP:GETPROPERTY
        System.out.println("5. <jsp:getProperty> - Getting Bean Properties");
        System.out.println("   --------------------------------------------");
        System.out.println("   Syntax: <jsp:getProperty name=\\"user\\" property=\\"name\\" />");
        System.out.println();
        System.out.println("   Output:");
        System.out.println("   Name: " + simulateGetProperty(user, "name"));
        System.out.println("   Email: " + simulateGetProperty(user, "email"));
        System.out.println("   Age: " + simulateGetProperty(user, "age"));
        System.out.println();
        
        // 6. COMPLETE EXAMPLE
        System.out.println("6. COMPLETE EXAMPLE - User Registration Flow");
        System.out.println("   ------------------------------------------");
        System.out.println();
        
        // Simulate form submission
        Map<String, String> formData = Map.of(
            "name", "Jane Smith",
            "email", "jane@email.com",
            "age", "28"
        );
        
        System.out.println("   Form submitted with: " + formData);
        System.out.println();
        
        // Process
        User newUser = new User();
        simulateSetPropertyFromRequest(newUser, formData);
        
        System.out.println("   Bean populated: " + newUser);
        System.out.println();
        
        System.out.println("   Confirmation page output:");
        System.out.println("   -------------------------");
        System.out.println("   <h1>Welcome!</h1>");
        System.out.println("   <p>Name: " + newUser.getName() + "</p>");
        System.out.println("   <p>Email: " + newUser.getEmail() + "</p>");
        System.out.println("   <p>Age: " + newUser.getAge() + "</p>");
    }
    
    static String simulateInclude(String page, Map<String, String> params) {
        if (page.equals("header.jsp")) {
            String title = params.getOrDefault("title", "Default");
            return "<header><title>" + title + "</title><nav>...</nav></header>";
        } else if (page.equals("footer.jsp")) {
            return "<footer>&copy; 2024</footer>";
        }
        return "";
    }
    
    static <T> T simulateUseBean(SimulatedSession session, String id, Class<T> clazz) {
        Object bean = session.getAttribute(id);
        if (bean == null) {
            try {
                bean = clazz.getDeclaredConstructor().newInstance();
                session.setAttribute(id, bean);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return clazz.cast(bean);
    }
    
    static void simulateSetProperty(User user, String property, Object value) {
        switch (property) {
            case "name": user.setName((String) value); break;
            case "email": user.setEmail((String) value); break;
            case "age": user.setAge((Integer) value); break;
        }
    }
    
    static Object simulateGetProperty(User user, String property) {
        switch (property) {
            case "name": return user.getName();
            case "email": return user.getEmail();
            case "age": return user.getAge();
            default: return null;
        }
    }
    
    static void simulateSetPropertyFromRequest(User user, Map<String, String> params) {
        if (params.containsKey("name")) user.setName(params.get("name"));
        if (params.containsKey("email")) user.setEmail(params.get("email"));
        if (params.containsKey("age")) user.setAge(Integer.parseInt(params.get("age")));
    }
}

// JavaBean
class User {
    private String name;
    private String email;
    private int age;
    
    public User() {}
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public String toString() {
        return "User{name='" + name + "', email='" + email + "', age=" + age + "}";
    }
}

// Simulated Session
class SimulatedSession {
    private Map<String, Object> attributes = new HashMap<>();
    
    public void setAttribute(String name, Object value) {
        attributes.put(name, value);
    }
    
    public Object getAttribute(String name) {
        return attributes.get(name);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a shopping cart using JavaBeans and action tags',
      hint: 'Use useBean for cart, setProperty for items',
      starterCode: `import java.util.*;

public class ShoppingCartDemo {
    public static void main(String[] args) {
        System.out.println("=== Shopping Cart Demo ===\\n");
        
        // Simulate session
        Map<String, Object> session = new HashMap<>();
        
        // Create cart bean (like <jsp:useBean>)
        ShoppingCart cart = getOrCreateBean(session, "cart", ShoppingCart.class);
        
        System.out.println("Initial cart: " + cart);
        System.out.println();
        
        // Add items (like form submissions)
        System.out.println("Adding items...");
        cart.addItem(new CartItem("Laptop", 999.99, 1));
        cart.addItem(new CartItem("Mouse", 29.99, 2));
        cart.addItem(new CartItem("Keyboard", 79.99, 1));
        System.out.println();
        
        // Display cart (like <jsp:getProperty>)
        System.out.println("Cart contents:");
        System.out.println("--------------");
        for (CartItem item : cart.getItems()) {
            System.out.printf("  %s x%d = $%.2f%n", 
                item.getName(), item.getQuantity(), item.getSubtotal());
        }
        System.out.println("--------------");
        System.out.printf("  Total: $%.2f%n", cart.getTotal());
        System.out.printf("  Items: %d%n", cart.getItemCount());
    }
    
    static <T> T getOrCreateBean(Map<String, Object> session, String name, Class<T> clazz) {
        Object bean = session.get(name);
        if (bean == null) {
            try {
                bean = clazz.getDeclaredConstructor().newInstance();
                session.put(name, bean);
                System.out.println("Created new " + clazz.getSimpleName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Found existing " + clazz.getSimpleName());
        }
        return clazz.cast(bean);
    }
}

class CartItem {
    private String name;
    private double price;
    private int quantity;
    
    public CartItem(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public double getSubtotal() { return price * quantity; }
}

class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    public ShoppingCart() {}
    
    public void addItem(CartItem item) {
        items.add(item);
        System.out.println("  Added: " + item.getName());
    }
    
    public List<CartItem> getItems() {
        return items;
    }
    
    public double getTotal() {
        return items.stream().mapToDouble(CartItem::getSubtotal).sum();
    }
    
    public int getItemCount() {
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }
    
    public String toString() {
        return "ShoppingCart[" + items.size() + " items]";
    }
}`
    }
  ]
};

export default jspActionTags;
