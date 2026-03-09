const jspJSTL = {
  id: 'jsp-jstl',
  title: 'JSTL (JSP Standard Tag Library)',
  description: 'Standard tags for common tasks',
  content: `
# JSTL — The Standard Tag Library

JSTL provides a set of standard tags for common tasks like loops, conditionals, and formatting. It's the recommended way to add logic to JSP pages — cleaner than scriptlets and more maintainable.

---

## JSTL Libraries

| Library | URI | Prefix | Purpose |
|---------|-----|--------|---------|
| Core | http://java.sun.com/jsp/jstl/core | c | Flow control, variables |
| Formatting | http://java.sun.com/jsp/jstl/fmt | fmt | Dates, numbers, i18n |
| Functions | http://java.sun.com/jsp/jstl/functions | fn | String functions |
| SQL | http://java.sun.com/jsp/jstl/sql | sql | Database access |
| XML | http://java.sun.com/jsp/jstl/xml | x | XML processing |

---

## Core Tags (c:)

### Import the Library

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
\`\`\`

### c:out — Output with Escaping

\`\`\`jsp
<c:out value="Dollar{user.name}" />
<c:out value="Dollar{user.bio}" default="No bio available" />
<c:out value="Dollar{htmlContent}" escapeXml="false" />
\`\`\`

### c:set — Set Variables

\`\`\`jsp
<c:set var="greeting" value="Hello, World!" />
<c:set var="total" value="Dollar{price * quantity}" />
<c:set var="user" value="Dollar{sessionScope.currentUser}" scope="request" />
\`\`\`

### c:remove — Remove Variables

\`\`\`jsp
<c:remove var="tempData" />
<c:remove var="user" scope="session" />
\`\`\`

### c:if — Conditional

\`\`\`jsp
<c:if test="Dollar{user != null}">
    <p>Welcome, Dollar{user.name}!</p>
</c:if>

<c:if test="Dollar{cart.itemCount > 0}">
    <a href="checkout">Checkout (Dollar{cart.itemCount} items)</a>
</c:if>
\`\`\`

### c:choose/c:when/c:otherwise — Switch

\`\`\`jsp
<c:choose>
    <c:when test="Dollar{user.role == 'admin'}">
        <p>Admin Dashboard</p>
    </c:when>
    <c:when test="Dollar{user.role == 'manager'}">
        <p>Manager Dashboard</p>
    </c:when>
    <c:otherwise>
        <p>User Dashboard</p>
    </c:otherwise>
</c:choose>
\`\`\`

### c:forEach — Loop

\`\`\`jsp
<%-- Simple loop --%>
<c:forEach var="i" begin="1" end="5">
    <p>Item Dollar{i}</p>
</c:forEach>

<%-- Loop with step --%>
<c:forEach var="i" begin="0" end="10" step="2">
    <p>Even: Dollar{i}</p>
</c:forEach>

<%-- Loop over collection --%>
<c:forEach var="product" items="Dollar{products}">
    <div class="product">
        <h3>Dollar{product.name}</h3>
        <p>Dollar{product.price}</p>
    </div>
</c:forEach>

<%-- Loop with status --%>
<c:forEach var="item" items="Dollar{items}" varStatus="status">
    <tr class="Dollar{status.index % 2 == 0 ? 'even' : 'odd'}">
        <td>Dollar{status.count}</td>
        <td>Dollar{item.name}</td>
        <td>Dollar{status.first ? 'First!' : ''}</td>
        <td>Dollar{status.last ? 'Last!' : ''}</td>
    </tr>
</c:forEach>
\`\`\`

### c:forTokens — Split and Loop

\`\`\`jsp
<c:forTokens var="color" items="red,green,blue" delims=",">
    <span style="color: Dollar{color}">Dollar{color}</span>
</c:forTokens>
\`\`\`

### c:url — URL Building

\`\`\`jsp
<c:url var="productUrl" value="/products">
    <c:param name="id" value="Dollar{product.id}" />
    <c:param name="action" value="view" />
</c:url>
<a href="Dollar{productUrl}">View Product</a>
\`\`\`

### c:redirect — Redirect

\`\`\`jsp
<c:if test="Dollar{user == null}">
    <c:redirect url="/login" />
</c:if>
\`\`\`

### c:import — Include External Content

\`\`\`jsp
<c:import url="header.jsp" />
<c:import url="http://example.com/api/data" var="apiData" />
\`\`\`

---

## Formatting Tags (fmt:)

### Import the Library

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
\`\`\`

### fmt:formatDate — Date Formatting

\`\`\`jsp
<fmt:formatDate value="Dollar{order.date}" pattern="yyyy-MM-dd" />
<fmt:formatDate value="Dollar{event.time}" pattern="HH:mm:ss" />
<fmt:formatDate value="Dollar{user.joinDate}" type="both" dateStyle="long" timeStyle="short" />
\`\`\`

### fmt:formatNumber — Number Formatting

\`\`\`jsp
<fmt:formatNumber value="Dollar{product.price}" type="currency" />
<fmt:formatNumber value="Dollar{percentage}" type="percent" />
<fmt:formatNumber value="Dollar{largeNumber}" pattern="#,###.##" />
<fmt:formatNumber value="Dollar{rating}" maxFractionDigits="1" />
\`\`\`

### fmt:parseDate — Parse Date String

\`\`\`jsp
<fmt:parseDate var="parsedDate" value="2024-01-15" pattern="yyyy-MM-dd" />
\`\`\`

### fmt:setLocale — Set Locale

\`\`\`jsp
<fmt:setLocale value="en_US" />
<fmt:setLocale value="Dollar{userLocale}" />
\`\`\`

---

## Function Tags (fn:)

### Import the Library

\`\`\`jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
\`\`\`

### String Functions

\`\`\`jsp
Dollar{fn:length(items)}                    <%-- Collection/string length --%>
Dollar{fn:toUpperCase(name)}                <%--  Dattu --%>
Dollar{fn:toLowerCase(name)}                <%--  Dattu --%>
Dollar{fn:substring(text, 0, 10)}           <%-- First 10 chars --%>
Dollar{fn:substringAfter(email, '@')}       <%-- Domain part --%>
Dollar{fn:substringBefore(email, '@')}      <%-- Username part --%>
Dollar{fn:trim(input)}                      <%-- Remove whitespace --%>
Dollar{fn:replace(text, 'old', 'new')}      <%-- Replace text --%>
Dollar{fn:split(csv, ',')}                  <%-- Split to array --%>
Dollar{fn:join(array, ', ')}                <%-- Join array --%>
Dollar{fn:contains(text, 'search')}         <%-- true/false --%>
Dollar{fn:containsIgnoreCase(text, 'SEARCH')}
Dollar{fn:startsWith(url, 'http')}
Dollar{fn:endsWith(file, '.pdf')}
Dollar{fn:indexOf(text, 'find')}            <%-- Position or -1 --%>
Dollar{fn:escapeXml(htmlContent)}           <%-- Escape HTML --%>
\`\`\`

---

## Complete Example

\`\`\`jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <title>Product Catalog</title>
</head>
<body>
    <h1>Product Catalog</h1>
    
    <%-- Show user greeting if logged in --%>
    <c:if test="Dollar{not empty sessionScope.user}">
        <p>Welcome, <c:out value="Dollar{user.name}" />!</p>
    </c:if>
    
    <%-- Product count --%>
    <p>Showing Dollar{fn:length(products)} products</p>
    
    <%-- Product list --%>
    <c:choose>
        <c:when test="Dollar{empty products}">
            <p>No products available.</p>
        </c:when>
        <c:otherwise>
            <table>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Added</th>
                </tr>
                <c:forEach var="product" items="Dollar{products}" varStatus="status">
                    <tr class="Dollar{status.index % 2 == 0 ? 'even' : 'odd'}">
                        <td>Dollar{status.count}</td>
                        <td>
                            <c:out value="Dollar{fn:substring(product.name, 0, 20)}" />
                            <c:if test="Dollar{fn:length(product.name) > 20}">...</c:if>
                        </td>
                        <td><fmt:formatNumber value="Dollar{product.price}" type="currency" /></td>
                        <td><fmt:formatDate value="Dollar{product.dateAdded}" pattern="MMM dd, yyyy" /></td>
                    </tr>
                </c:forEach>
            </table>
        </c:otherwise>
    </c:choose>
    
    <%-- Build URL with parameters --%>
    <c:url var="searchUrl" value="/search">
        <c:param name="category" value="electronics" />
        <c:param name="sort" value="price" />
    </c:url>
    <a href="Dollar{searchUrl}">Search Electronics</a>
</body>
</html>
\`\`\`
`,
  code: `// JSTL Demo
// Demonstrates core, formatting, and function tags

import java.util.*;
import java.text.*;

public class JSTLDemo {
    public static void main(String[] args) {
        System.out.println("=== JSTL (JSP Standard Tag Library) Demo ===\\n");
        
        // Setup data
        List<Product> products = Arrays.asList(
            new Product("Laptop Computer", 999.99, new Date()),
            new Product("Wireless Mouse", 29.99, new Date()),
            new Product("Mechanical Keyboard", 149.99, new Date()),
            new Product("4K Monitor", 399.99, new Date())
        );
        
        // 1. CORE TAGS
        System.out.println("1. CORE TAGS (c:)");
        System.out.println("   ---------------");
        
        // c:out
        System.out.println("   c:out - Output with escaping:");
        String userInput = "<script>alert('xss')</script>";
        System.out.println("     Input: " + userInput);
        System.out.println("     <c:out>: " + escapeXml(userInput));
        System.out.println();
        
        // c:set
        System.out.println("   c:set - Set variables:");
        System.out.println("     <c:set var=\\"greeting\\" value=\\"Hello!\\" />");
        String greeting = "Hello!";
        System.out.println("     Dollar{greeting} = " + greeting);
        System.out.println();
        
        // c:if
        System.out.println("   c:if - Conditional:");
        System.out.println("     <c:if test=\\"Dollar{products.size() > 0}\\">");
        if (products.size() > 0) {
            System.out.println("       Products available: " + products.size());
        }
        System.out.println("     </c:if>");
        System.out.println();
        
        // c:choose
        System.out.println("   c:choose - Switch:");
        String role = "admin";
        System.out.println("     User role: " + role);
        System.out.print("     Dashboard: ");
        if (role.equals("admin")) {
            System.out.println("Admin Dashboard");
        } else if (role.equals("manager")) {
            System.out.println("Manager Dashboard");
        } else {
            System.out.println("User Dashboard");
        }
        System.out.println();
        
        // c:forEach
        System.out.println("   c:forEach - Loop:");
        System.out.println("     <c:forEach var=\\"p\\" items=\\"Dollar{products}\\" varStatus=\\"s\\">");
        int count = 0;
        for (Product p : products) {
            count++;
            String rowClass = (count % 2 == 0) ? "even" : "odd";
            System.out.println("       " + count + ". " + p.getName() + " (" + rowClass + ")");
        }
        System.out.println("     </c:forEach>");
        System.out.println();
        
        // c:url
        System.out.println("   c:url - URL building:");
        System.out.println("     <c:url var=\\"url\\" value=\\"/search\\">");
        System.out.println("       <c:param name=\\"q\\" value=\\"laptop\\" />");
        System.out.println("     </c:url>");
        System.out.println("     Result: /search?q=laptop");
        System.out.println();
        
        // 2. FORMATTING TAGS
        System.out.println("2. FORMATTING TAGS (fmt:)");
        System.out.println("   -----------------------");
        
        // fmt:formatNumber
        System.out.println("   fmt:formatNumber:");
        double price = 1234.567;
        System.out.println("     Value: " + price);
        System.out.println("     Currency: " + formatCurrency(price));
        System.out.println("     Percent: " + formatPercent(0.856));
        System.out.println("     Pattern: " + formatPattern(price, "#,###.##"));
        System.out.println();
        
        // fmt:formatDate
        System.out.println("   fmt:formatDate:");
        Date now = new Date();
        System.out.println("     Value: " + now);
        System.out.println("     yyyy-MM-dd: " + formatDate(now, "yyyy-MM-dd"));
        System.out.println("     MMM dd, yyyy: " + formatDate(now, "MMM dd, yyyy"));
        System.out.println("     HH:mm:ss: " + formatDate(now, "HH:mm:ss"));
        System.out.println();
        
        // 3. FUNCTION TAGS
        System.out.println("3. FUNCTION TAGS (fn:)");
        System.out.println("   --------------------");
        
        String text = "  Hello, World!  ";
        System.out.println("   Text: \\"" + text + "\\"");
        System.out.println("   fn:length(): " + text.length());
        System.out.println("   fn:trim(): \\"" + text.trim() + "\\"");
        System.out.println("   fn:toUpperCase(): " + text.toUpperCase());
        System.out.println("   fn:toLowerCase(): " + text.toLowerCase());
        System.out.println("   fn:substring(0,5): " + text.substring(0, 5));
        System.out.println("   fn:contains('World'): " + text.contains("World"));
        System.out.println("   fn:replace('World','JSTL'): " + text.replace("World", "JSTL"));
        System.out.println();
        
        String email = " Dattu@example.com";
        System.out.println("   Email: " + email);
        System.out.println("   fn:substringBefore('@'): " + email.substring(0, email.indexOf('@')));
        System.out.println("   fn:substringAfter('@'): " + email.substring(email.indexOf('@') + 1));
        System.out.println();
        
        // 4. COMPLETE EXAMPLE OUTPUT
        System.out.println("4. COMPLETE EXAMPLE OUTPUT");
        System.out.println("   ------------------------");
        System.out.println("   <h1>Product Catalog</h1>");
        System.out.println("   <p>Showing " + products.size() + " products</p>");
        System.out.println("   <table>");
        System.out.println("     <tr><th>#</th><th>Name</th><th>Price</th></tr>");
        count = 0;
        for (Product p : products) {
            count++;
            String name = p.getName();
            if (name.length() > 15) {
                name = name.substring(0, 15) + "...";
            }
            System.out.println("     <tr><td>" + count + "</td><td>" + name + 
                "</td><td>" + formatCurrency(p.getPrice()) + "</td></tr>");
        }
        System.out.println("   </table>");
    }
    
    static String escapeXml(String input) {
        return input
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\\"", "&quot;")
            .replace("'", "&#39;");
    }
    
    static String formatCurrency(double value) {
        return NumberFormat.getCurrencyInstance(Locale.US).format(value);
    }
    
    static String formatPercent(double value) {
        return NumberFormat.getPercentInstance().format(value);
    }
    
    static String formatPattern(double value, String pattern) {
        return new DecimalFormat(pattern).format(value);
    }
    
    static String formatDate(Date date, String pattern) {
        return new SimpleDateFormat(pattern).format(date);
    }
}

// Product class
class Product {
    private String name;
    private double price;
    private Date dateAdded;
    
    Product(String name, double price, Date dateAdded) {
        this.name = name;
        this.price = price;
        this.dateAdded = dateAdded;
    }
    
    public String getName() { return name; }
    public double getPrice() { return price; }
    public Date getDateAdded() { return dateAdded; }
}`,
  practiceQuestions: [
    {
      question: 'Create a JSTL tag simulator for common operations',
      hint: 'Implement forEach, if, and choose logic',
      starterCode: `import java.util.*;

public class JSTLSimulatorDemo {
    public static void main(String[] args) {
        System.out.println("=== JSTL Simulator Demo ===\\n");
        
        JSTLSimulator jstl = new JSTLSimulator();
        
        // Setup data
        List<String> items = Arrays.asList("Apple", "Banana", "Cherry", "Date");
        
        // c:forEach simulation
        System.out.println("c:forEach simulation:");
        System.out.println("---------------------");
        jstl.forEach(items, (item, status) -> {
            System.out.println("  " + status.count + ". " + item + 
                (status.first ? " (first)" : "") +
                (status.last ? " (last)" : ""));
        });
        System.out.println();
        
        // c:if simulation
        System.out.println("c:if simulation:");
        System.out.println("----------------");
        jstl.cIf(items.size() > 0, () -> {
            System.out.println("  Items available: " + items.size());
        });
        System.out.println();
        
        // c:choose simulation
        System.out.println("c:choose simulation:");
        System.out.println("--------------------");
        String role = "admin";
        jstl.choose()
            .when(role.equals("admin"), () -> System.out.println("  Admin access"))
            .when(role.equals("user"), () -> System.out.println("  User access"))
            .otherwise(() -> System.out.println("  Guest access"))
            .execute();
    }
}

class JSTLSimulator {
    
    public <T> void forEach(List<T> items, LoopCallback<T> callback) {
        for (int i = 0; i < items.size(); i++) {
            LoopStatus status = new LoopStatus();
            status.index = i;
            status.count = i + 1;
            status.first = (i == 0);
            status.last = (i == items.size() - 1);
            callback.execute(items.get(i), status);
        }
    }
    
    public void cIf(boolean condition, Runnable action) {
        if (condition) {
            action.run();
        }
    }
    
    public ChooseBuilder choose() {
        return new ChooseBuilder();
    }
}

interface LoopCallback<T> {
    void execute(T item, LoopStatus status);
}

class LoopStatus {
    int index;
    int count;
    boolean first;
    boolean last;
}

class ChooseBuilder {
    private boolean executed = false;
    private List<WhenClause> whens = new ArrayList<>();
    private Runnable otherwiseAction;
    
    public ChooseBuilder when(boolean condition, Runnable action) {
        whens.add(new WhenClause(condition, action));
        return this;
    }
    
    public ChooseBuilder otherwise(Runnable action) {
        this.otherwiseAction = action;
        return this;
    }
    
    public void execute() {
        for (WhenClause when : whens) {
            if (when.condition) {
                when.action.run();
                return;
            }
        }
        if (otherwiseAction != null) {
            otherwiseAction.run();
        }
    }
    
    static class WhenClause {
        boolean condition;
        Runnable action;
        WhenClause(boolean c, Runnable a) { condition = c; action = a; }
    }
}`
    }
  ]
};

export default jspJSTL;
