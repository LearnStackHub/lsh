const jspExpressionLanguage = {
  id: 'jsp-expression-language',
  title: 'JSP Expression Language (EL)',
  description: 'Simplified syntax for accessing data',
  content: `
# Expression Language (EL) — Clean and Simple

Expression Language (EL) provides a simpler way to access data in JSP pages. Instead of writing Java code in scriptlets, you use a clean Dollar{...} syntax. It's the modern way to work with data in JSP.

---

## Basic Syntax

EL expressions use the Dollar{expression} syntax:

\`\`\`jsp
<%-- Old way (scriptlet) --%>
<%= request.getParameter("name") %>

<%-- New way (EL) --%>
Dollar{param.name}
\`\`\`

---

## Accessing Data

### Request Parameters

\`\`\`jsp
<%-- Single value --%>
Dollar{param.username}
Dollar{param.email}

<%-- Multiple values --%>
Dollar{paramValues.hobbies[0]}
Dollar{paramValues.hobbies[1]}
\`\`\`

### Scoped Attributes

\`\`\`jsp
<%-- Searches all scopes (page, request, session, application) --%>
Dollar{user}
Dollar{user.name}

<%-- Specific scope --%>
Dollar{pageScope.message}
Dollar{requestScope.user}
Dollar{sessionScope.cart}
Dollar{applicationScope.config}
\`\`\`

### JavaBean Properties

\`\`\`jsp
<%-- Dot notation --%>
Dollar{user.name}
Dollar{user.email}
Dollar{user.address.city}

<%-- Bracket notation --%>
Dollar{user["name"]}
Dollar{user['email']}
\`\`\`

### Collections and Arrays

\`\`\`jsp
<%-- List/Array access --%>
Dollar{items[0]}
Dollar{items[1]}

<%-- Map access --%>
Dollar{prices["laptop"]}
Dollar{prices['mouse']}

<%-- Size --%>
Dollar{items.size()}
\`\`\`

---

## EL Implicit Objects

| Object | Description |
|--------|-------------|
| pageScope | Page scope attributes |
| requestScope | Request scope attributes |
| sessionScope | Session scope attributes |
| applicationScope | Application scope attributes |
| param | Request parameters (single) |
| paramValues | Request parameters (array) |
| header | HTTP headers (single) |
| headerValues | HTTP headers (array) |
| cookie | Cookies |
| initParam | Context init parameters |
| pageContext | PageContext object |

### Examples

\`\`\`jsp
<%-- Parameters --%>
Dollar{param.id}
Dollar{paramValues.colors[0]}

<%-- Headers --%>
Dollar{header["User-Agent"]}
Dollar{header.host}

<%-- Cookies --%>
Dollar{cookie.username.value}
Dollar{cookie.sessionId.value}

<%-- Init parameters --%>
Dollar{initParam.dbUrl}

<%-- Page context --%>
Dollar{pageContext.request.method}
Dollar{pageContext.session.id}
Dollar{pageContext.servletContext.serverInfo}
\`\`\`

---

## EL Operators

### Arithmetic

\`\`\`jsp
Dollar{10 + 5}      <%-- 15 --%>
Dollar{10 - 5}      <%-- 5 --%>
Dollar{10 * 5}      <%-- 50 --%>
Dollar{10 / 5}      <%-- 2 --%>
Dollar{10 div 5}    <%-- 2 --%>
Dollar{10 % 3}      <%-- 1 --%>
Dollar{10 mod 3}    <%-- 1 --%>
\`\`\`

### Comparison

\`\`\`jsp
Dollar{a == b}      Dollar{a eq b}
Dollar{a != b}      Dollar{a ne b}
Dollar{a < b}       Dollar{a lt b}
Dollar{a > b}       Dollar{a gt b}
Dollar{a <= b}      Dollar{a le b}
Dollar{a >= b}      Dollar{a ge b}
\`\`\`

### Logical

\`\`\`jsp
Dollar{a && b}      Dollar{a and b}
Dollar{a || b}      Dollar{a or b}
Dollar{!a}          Dollar{not a}
\`\`\`

### Empty Operator

\`\`\`jsp
Dollar{empty name}           <%-- true if null or empty string --%>
Dollar{empty list}           <%-- true if null or empty collection --%>
Dollar{not empty user}       <%-- true if user exists --%>
\`\`\`

### Ternary Operator

\`\`\`jsp
Dollar{user != null ? user.name : 'Guest'}
Dollar{score >= 60 ? 'Pass' : 'Fail'}
\`\`\`

---

## Disabling EL

If you need to display Dollar{...} literally:

\`\`\`jsp
<%-- Escape with backslash --%>
\\Dollar{not evaluated}

<%-- Or disable for entire page --%>
<%@ page isELIgnored="true" %>
\`\`\`

---

## EL with JSTL

EL is most powerful when combined with JSTL:

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%-- Conditional --%>
<c:if test="Dollar{user != null}">
    <p>Welcome, Dollar{user.name}!</p>
</c:if>

<%-- Choose/When --%>
<c:choose>
    <c:when test="Dollar{user.role == 'admin'}">
        <p>Admin Dashboard</p>
    </c:when>
    <c:when test="Dollar{user.role == 'user'}">
        <p>User Dashboard</p>
    </c:when>
    <c:otherwise>
        <p>Guest View</p>
    </c:otherwise>
</c:choose>

<%-- Loop --%>
<c:forEach var="item" items="Dollar{cart.items}">
    <p>Dollar{item.name}: Dollar{item.price}</p>
</c:forEach>

<%-- Set variable --%>
<c:set var="total" value="Dollar{cart.total}" />
<p>Total: Dollar{total}</p>
\`\`\`

---

## Complete Example

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
<head>
    <title>Dollar{pageTitle}</title>
</head>
<body>
    <h1>Welcome, Dollar{sessionScope.user.name}!</h1>
    
    <h2>Your Profile</h2>
    <ul>
        <li>Email: Dollar{user.email}</li>
        <li>Role: Dollar{user.role}</li>
        <li>Member since: <fmt:formatDate value="Dollar{user.joinDate}" pattern="MMM dd, yyyy" /></li>
    </ul>
    
    <h2>Your Orders (Dollar{orders.size()})</h2>
    
    <c:if test="Dollar{empty orders}">
        <p>No orders yet.</p>
    </c:if>
    
    <c:if test="Dollar{not empty orders}">
        <table>
            <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
            <c:forEach var="order" items="Dollar{orders}">
                <tr>
                    <td>Dollar{order.id}</td>
                    <td><fmt:formatDate value="Dollar{order.date}" pattern="yyyy-MM-dd" /></td>
                    <td><fmt:formatNumber value="Dollar{order.total}" type="currency" /></td>
                    <td>Dollar{order.status}</td>
                </tr>
            </c:forEach>
        </table>
    </c:if>
    
    <p>Request method: Dollar{pageContext.request.method}</p>
    <p>Session ID: Dollar{pageContext.session.id}</p>
</body>
</html>
\`\`\`
`,
  code: `// JSP Expression Language Demo
// Demonstrates EL syntax and features

import java.util.*;

public class ExpressionLanguageDemo {
    public static void main(String[] args) {
        System.out.println("=== Expression Language (EL) Demo ===\\n");
        
        // Create simulated context
        ELContext context = new ELContext();
        
        // Setup data
        User user = new User("Dattu p", " Dattu@email.com", "admin");
        context.setSessionAttribute("user", user);
        
        List<Product> products = Arrays.asList(
            new Product("Laptop", 999.99),
            new Product("Mouse", 29.99),
            new Product("Keyboard", 79.99)
        );
        context.setRequestAttribute("products", products);
        
        context.setParameter("id", "123");
        context.setParameter("action", "view");
        context.setHeader("User-Agent", "Mozilla/5.0");
        
        // 1. BASIC SYNTAX
        System.out.println("1. BASIC SYNTAX");
        System.out.println("   -------------");
        System.out.println("   Old way: <%= request.getParameter(\\"name\\") %>");
        System.out.println("   New way: Dollar{param.name}");
        System.out.println();
        
        // 2. ACCESSING DATA
        System.out.println("2. ACCESSING DATA");
        System.out.println("   ---------------");
        
        System.out.println("   Request Parameters:");
        System.out.println("     Dollar{param.id} = " + context.evaluateParam("id"));
        System.out.println("     Dollar{param.action} = " + context.evaluateParam("action"));
        System.out.println();
        
        System.out.println("   Session Attributes:");
        System.out.println("     Dollar{sessionScope.user} = " + context.getSessionAttribute("user"));
        System.out.println("     Dollar{user.name} = " + user.getName());
        System.out.println("     Dollar{user.email} = " + user.getEmail());
        System.out.println();
        
        System.out.println("   Request Attributes:");
        System.out.println("     Dollar{products[0].name} = " + products.get(0).getName());
        System.out.println("     Dollar{products[0].price} = " + products.get(0).getPrice());
        System.out.println();
        
        System.out.println("   Headers:");
        System.out.println("     Dollar{header[\\"User-Agent\\"]} = " + context.getHeader("User-Agent"));
        System.out.println();
        
        // 3. OPERATORS
        System.out.println("3. OPERATORS");
        System.out.println("   ----------");
        
        System.out.println("   Arithmetic:");
        System.out.println("     Dollar{10 + 5} = " + (10 + 5));
        System.out.println("     Dollar{10 - 5} = " + (10 - 5));
        System.out.println("     Dollar{10 * 5} = " + (10 * 5));
        System.out.println("     Dollar{10 / 5} = " + (10 / 5));
        System.out.println("     Dollar{10 % 3} = " + (10 % 3));
        System.out.println();
        
        System.out.println("   Comparison:");
        System.out.println("     Dollar{5 == 5} = " + (5 == 5));
        System.out.println("     Dollar{5 != 3} = " + (5 != 3));
        System.out.println("     Dollar{5 > 3} = " + (5 > 3));
        System.out.println("     Dollar{5 < 10} = " + (5 < 10));
        System.out.println();
        
        System.out.println("   Logical:");
        System.out.println("     Dollar{true && true} = " + (true && true));
        System.out.println("     Dollar{true || false} = " + (true || false));
        System.out.println("     Dollar{!false} = " + (!false));
        System.out.println();
        
        System.out.println("   Empty operator:");
        System.out.println("     Dollar{empty null} = true");
        System.out.println("     Dollar{empty ''} = true");
        System.out.println("     Dollar{empty []} = true");
        System.out.println("     Dollar{not empty user} = " + (user != null));
        System.out.println();
        
        System.out.println("   Ternary:");
        System.out.println("     Dollar{user != null ? user.name : 'Guest'} = " + 
            (user != null ? user.getName() : "Guest"));
        System.out.println();
        
        // 4. EL IMPLICIT OBJECTS
        System.out.println("4. EL IMPLICIT OBJECTS");
        System.out.println("   --------------------");
        System.out.println("   | Object          | Description                    |");
        System.out.println("   |-----------------|--------------------------------|");
        System.out.println("   | pageScope       | Page scope attributes          |");
        System.out.println("   | requestScope    | Request scope attributes       |");
        System.out.println("   | sessionScope    | Session scope attributes       |");
        System.out.println("   | applicationScope| Application scope attributes   |");
        System.out.println("   | param           | Request parameters (single)    |");
        System.out.println("   | paramValues     | Request parameters (array)     |");
        System.out.println("   | header          | HTTP headers (single)          |");
        System.out.println("   | headerValues    | HTTP headers (array)           |");
        System.out.println("   | cookie          | Cookies                        |");
        System.out.println("   | initParam       | Context init parameters        |");
        System.out.println("   | pageContext     | PageContext object             |");
        System.out.println();
        
        // 5. EL WITH JSTL
        System.out.println("5. EL WITH JSTL");
        System.out.println("   -------------");
        System.out.println("   <c:if test=\\"Dollar{user != null}\\">");
        System.out.println("       <p>Welcome, Dollar{user.name}!</p>");
        System.out.println("   </c:if>");
        System.out.println();
        System.out.println("   <c:forEach var=\\"item\\" items=\\"Dollar{products}\\">");
        System.out.println("       <p>Dollar{item.name}: Dollar{item.price}</p>");
        System.out.println("   </c:forEach>");
        System.out.println();
        
        // 6. SIMULATED OUTPUT
        System.out.println("6. SIMULATED PAGE OUTPUT");
        System.out.println("   ----------------------");
        System.out.println("   <h1>Welcome, " + user.getName() + "!</h1>");
        System.out.println("   <p>Email: " + user.getEmail() + "</p>");
        System.out.println("   <p>Role: " + user.getRole() + "</p>");
        System.out.println();
        System.out.println("   <h2>Products</h2>");
        System.out.println("   <ul>");
        for (Product p : products) {
            System.out.println("       <li>" + p.getName() + ": $" + p.getPrice() + "</li>");
        }
        System.out.println("   </ul>");
    }
}

// Simulated EL Context
class ELContext {
    private Map<String, Object> sessionAttributes = new HashMap<>();
    private Map<String, Object> requestAttributes = new HashMap<>();
    private Map<String, String> parameters = new HashMap<>();
    private Map<String, String> headers = new HashMap<>();
    
    public void setSessionAttribute(String name, Object value) {
        sessionAttributes.put(name, value);
    }
    
    public Object getSessionAttribute(String name) {
        return sessionAttributes.get(name);
    }
    
    public void setRequestAttribute(String name, Object value) {
        requestAttributes.put(name, value);
    }
    
    public Object getRequestAttribute(String name) {
        return requestAttributes.get(name);
    }
    
    public void setParameter(String name, String value) {
        parameters.put(name, value);
    }
    
    public String evaluateParam(String name) {
        return parameters.get(name);
    }
    
    public void setHeader(String name, String value) {
        headers.put(name, value);
    }
    
    public String getHeader(String name) {
        return headers.get(name);
    }
}

// User class
class User {
    private String name;
    private String email;
    private String role;
    
    User(String name, String email, String role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
    
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    
    public String toString() {
        return "User{name='" + name + "', role='" + role + "'}";
    }
}

// Product class
class Product {
    private String name;
    private double price;
    
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public String getName() { return name; }
    public double getPrice() { return price; }
}`,
  practiceQuestions: [
    {
      question: 'Create an EL expression evaluator',
      hint: 'Parse and evaluate simple EL expressions',
      starterCode: `import java.util.*;

public class ELEvaluatorDemo {
    public static void main(String[] args) {
        System.out.println("=== EL Evaluator Demo ===\\n");
        
        ELEvaluator evaluator = new ELEvaluator();
        
        // Setup context
        evaluator.setVariable("name", " Dattu");
        evaluator.setVariable("age", 25);
        evaluator.setVariable("active", true);
        
        Map<String, Object> user = new HashMap<>();
        user.put("email", " Dattu@email.com");
        user.put("role", "admin");
        evaluator.setVariable("user", user);
        
        // Test expressions
        String[] expressions = {
            "name",
            "age",
            "active",
            "user.email",
            "user.role",
            "age > 18",
            "active && age > 20",
            "empty name",
            "not empty user"
        };
        
        System.out.println("Evaluating expressions:");
        System.out.println("-----------------------");
        for (String expr : expressions) {
            Object result = evaluator.evaluate(expr);
            System.out.println("  Dollar{" + expr + "} = " + result);
        }
    }
}

class ELEvaluator {
    private Map<String, Object> variables = new HashMap<>();
    
    public void setVariable(String name, Object value) {
        variables.put(name, value);
    }
    
    public Object evaluate(String expression) {
        // Handle dot notation (user.email)
        if (expression.contains(".")) {
            String[] parts = expression.split("\\\\.", 2);
            Object obj = variables.get(parts[0]);
            if (obj instanceof Map) {
                return ((Map<?, ?>) obj).get(parts[1]);
            }
            return null;
        }
        
        // Handle comparison (age > 18)
        if (expression.contains(">")) {
            String[] parts = expression.split("\\\\s*>\\\\s*");
            Object left = variables.get(parts[0].trim());
            int right = Integer.parseInt(parts[1].trim());
            return ((Integer) left) > right;
        }
        
        // Handle logical AND
        if (expression.contains("&&")) {
            String[] parts = expression.split("\\\\s*&&\\\\s*");
            boolean left = (Boolean) evaluate(parts[0].trim());
            boolean right = (Boolean) evaluate(parts[1].trim());
            return left && right;
        }
        
        // Handle empty
        if (expression.startsWith("empty ")) {
            String varName = expression.substring(6);
            Object value = variables.get(varName);
            return value == null || value.toString().isEmpty();
        }
        
        // Handle not empty
        if (expression.startsWith("not empty ")) {
            String varName = expression.substring(10);
            Object value = variables.get(varName);
            return value != null && !value.toString().isEmpty();
        }
        
        // Simple variable lookup
        return variables.get(expression);
    }
}`
    }
  ]
};

export default jspExpressionLanguage;
