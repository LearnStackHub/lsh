const customExceptions = {
  id: 'custom-exceptions',
  title: 'Custom Exceptions',
  description: 'Creating your own exception classes',
  content: `
# Custom Exceptions — When Built-in Isn't Enough

Java provides many built-in exceptions, but sometimes you need exceptions specific to your application. A \`UserNotFoundException\` is more meaningful than a generic \`RuntimeException\`.

---

## Why Create Custom Exceptions?

1. **Clarity** — \`InsufficientFundsException\` is clearer than \`Exception\`
2. **Specific handling** — Catch specific business errors
3. **Additional data** — Include relevant information
4. **Documentation** — Self-documenting code

---

## Creating a Custom Exception

### Basic Custom Exception

\`\`\`java
public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
    }
}
\`\`\`

### With Additional Data

\`\`\`java
public class UserNotFoundException extends Exception {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found with ID: " + userId);
        this.userId = userId;
    }
    
    public Long getUserId() {
        return userId;
    }
}
\`\`\`

---

## Checked vs Unchecked Custom Exceptions

### Checked Exception (extends Exception)

Caller MUST handle or declare:

\`\`\`java
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Caller must handle
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException("Not enough funds");
    }
}
\`\`\`

### Unchecked Exception (extends RuntimeException)

Caller doesn't have to handle:

\`\`\`java
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}

// Caller doesn't have to handle
public void setAge(int age) {
    if (age < 0) {
        throw new InvalidInputException("Age cannot be negative");
    }
}
\`\`\`

---

## When to Use Which

| Use Checked Exception When | Use Unchecked Exception When |
|---------------------------|------------------------------|
| Caller can recover | Programming error |
| Business rule violation | Invalid argument |
| External resource failure | Null pointer |
| Caller should be forced to handle | Caller can't reasonably recover |

---

## Complete Custom Exception Template

\`\`\`java
public class BusinessException extends Exception {
    private String errorCode;
    private Map<String, Object> details;
    
    // Basic constructor
    public BusinessException(String message) {
        super(message);
    }
    
    // With error code
    public BusinessException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    // With cause
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
    
    // Full constructor
    public BusinessException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    // Getters
    public String getErrorCode() { return errorCode; }
    
    // Add details
    public BusinessException addDetail(String key, Object value) {
        if (details == null) {
            details = new HashMap<>();
        }
        details.put(key, value);
        return this;
    }
    
    public Map<String, Object> getDetails() {
        return details != null ? details : Collections.emptyMap();
    }
}
\`\`\`

---

## Exception Hierarchy for Your Application

\`\`\`java
// Base exception for your application
public class AppException extends Exception {
    public AppException(String message) { super(message); }
    public AppException(String message, Throwable cause) { super(message, cause); }
}

// Service layer exceptions
public class ServiceException extends AppException {
    public ServiceException(String message) { super(message); }
}

// Data access exceptions
public class DataAccessException extends AppException {
    public DataAccessException(String message, Throwable cause) { 
        super(message, cause); 
    }
}

// Specific exceptions
public class UserNotFoundException extends ServiceException {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found: " + userId);
        this.userId = userId;
    }
}

public class DuplicateEmailException extends ServiceException {
    private String email;
    
    public DuplicateEmailException(String email) {
        super("Email already exists: " + email);
        this.email = email;
    }
}
\`\`\`

---

## Real-World Example: E-Commerce

\`\`\`java
// Base exception
public class ECommerceException extends Exception {
    private String errorCode;
    
    public ECommerceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() { return errorCode; }
}

// Order exceptions
public class OrderException extends ECommerceException {
    private Long orderId;
    
    public OrderException(String message, String errorCode, Long orderId) {
        super(message, errorCode);
        this.orderId = orderId;
    }
}

public class OrderNotFoundException extends OrderException {
    public OrderNotFoundException(Long orderId) {
        super("Order not found", "ORDER_NOT_FOUND", orderId);
    }
}

public class OrderAlreadyShippedException extends OrderException {
    public OrderAlreadyShippedException(Long orderId) {
        super("Order already shipped", "ORDER_SHIPPED", orderId);
    }
}

// Payment exceptions
public class PaymentException extends ECommerceException {
    private Double amount;
    
    public PaymentException(String message, String errorCode, Double amount) {
        super(message, errorCode);
        this.amount = amount;
    }
}

public class PaymentDeclinedException extends PaymentException {
    private String reason;
    
    public PaymentDeclinedException(Double amount, String reason) {
        super("Payment declined: " + reason, "PAYMENT_DECLINED", amount);
        this.reason = reason;
    }
}

// Inventory exceptions
public class InsufficientStockException extends ECommerceException {
    private String productId;
    private int requested;
    private int available;
    
    public InsufficientStockException(String productId, int requested, int available) {
        super("Insufficient stock for product: " + productId, "INSUFFICIENT_STOCK");
        this.productId = productId;
        this.requested = requested;
        this.available = available;
    }
}
\`\`\`

---

## Best Practices

### 1. Meaningful Names

\`\`\`java
// BAD
class MyException extends Exception { }

// GOOD
class UserNotFoundException extends Exception { }
\`\`\`

### 2. Include Relevant Data

\`\`\`java
// BAD
throw new UserNotFoundException("User not found");

// GOOD
throw new UserNotFoundException(userId);  // Exception stores the ID
\`\`\`

### 3. Provide Multiple Constructors

\`\`\`java
public class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }
    
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

### 4. Document Your Exceptions

\`\`\`java
/**
 * Thrown when a user attempts to withdraw more than their balance.
 * Contains the available balance and requested amount for error handling.
 */
public class InsufficientFundsException extends Exception {
    // ...
}
\`\`\`

---

## 10 Important Custom Exceptions Interview Questions

### 1. When create a custom checked exception?
**Short Answer:** Use a custom checked exception when callers can recover and should be forced to handle the case.
**Detailed Explanation:** A custom checked exception is useful when the failure is part of normal business flow and the caller can do something meaningful in response. For example, a payment can be retried, an input can be corrected, or a missing record can be requested again. In those cases, forcing explicit handling improves reliability and makes intent visible in method signatures. At the same time, not every failure should be checked. Programming bugs and infrastructure crashes usually do not benefit from mandatory catch blocks. Interviewers expect you to treat checked exceptions as a contract tool, not a default choice for every problem in Java applications.

### 2. What should a custom exception include?
**Short Answer:** Include a clear name, useful context fields, and constructors for both message and root cause.
**Detailed Explanation:** A well-designed custom exception should communicate both meaning and debugging context. Use a descriptive class name, a human-readable message, and optional fields like error code, entity id, or operation name. Also provide constructors that accept message and cause so stack traces preserve original failure chains. Keep the hierarchy practical and shallow unless the domain truly requires multiple specialized categories. In this tutorial context, custom exceptions are part of clean error communication, not decorative classes. A strong interview answer highlights balance: enough structure for logging and API mapping, but not so much complexity that developers struggle to maintain or correctly use the exception model.

### 3. Should custom exceptions extend \`RuntimeException\` or \`Exception\`?
**Short Answer:** Extend RuntimeException for unchecked flow, and Exception when explicit caller handling is required.
**Detailed Explanation:** Choosing between RuntimeException and Exception is an architectural decision. RuntimeException is common in modern frameworks where centralized handlers translate failures into API responses, reducing repeated try-catch blocks. Exception is better when the API should force callers to handle recoverable situations directly. Neither option is always right. The decision should depend on team conventions, service boundaries, and expected recovery behavior. In interview discussions, strong candidates explain the trade-off in readability, method signatures, and error propagation. This tutorial page supports that mindset by showing custom exceptions as part of system design, not just Java syntax preference.

### 4. Scenario: multi-tenant SaaS—what extra data in exceptions?
**Short Answer:** Include tenant-safe metadata like tenant id and request id, but never store secrets.
**Detailed Explanation:** In a multi-tenant system, debugging without context is very difficult. Custom exceptions should carry safe identifiers such as tenant id, request correlation id, and operation name so support teams can quickly trace incidents. However, sensitive data like passwords, tokens, card numbers, or private payloads must never be included in exception messages or fields. This balance improves observability without creating security risk. In this tutorial and interview context, the key point is production readiness. Great answers connect exception design with logging strategy and structured error responses, showing that exceptions are part of both software correctness and operational safety in real-world SaaS platforms.

### 5. How does internationalization interact with exceptions?
**Short Answer:** Keep internal exception semantics stable and localize user-facing messages at the boundary layer.
**Detailed Explanation:** Exception classes should primarily carry technical meaning, stable error codes, and developer-focused diagnostics. Localization should usually happen in API or UI layers where user language preferences are available. This keeps logs and monitoring consistent for engineering teams while still delivering friendly translated messages to end users. If you localize too early inside core exceptions, troubleshooting becomes inconsistent across environments. In this page’s interview framing, the best answer shows separation of concerns: domain exceptions describe failure type, while presentation layers convert that failure into localized text. This approach improves maintainability, supports global applications, and avoids mixing developer diagnostics with user communication concerns.

### 6. Is it OK to subclass library exceptions?
**Short Answer:** It can be fine internally, but avoid leaking library-specific exceptions into domain or public API contracts.
**Detailed Explanation:** Subclassing framework exceptions can be practical in infrastructure layers, especially when integrating with existing transaction or data-access behaviors. The problem appears when those framework types leak upward into domain services or outward to client-facing APIs. That creates tight coupling and makes technology changes expensive. A cleaner design translates low-level exceptions into domain-specific exceptions at boundaries such as repositories or adapters. In interview terms, this shows architectural maturity. This tutorial aligns with that idea by treating custom exceptions as a domain language. A strong answer explains how translation protects maintainability, testability, and long-term flexibility while still allowing useful framework integration where appropriate.

### 7. What is error code enum pattern?
**Short Answer:** It is a standardized enum-based system for stable machine-readable error identification.
**Detailed Explanation:** The error code enum pattern defines a fixed catalog of domain errors, often including fields like code, default status, and severity. Custom exceptions reference these codes so handlers can produce consistent responses for clients and logs. This helps frontend and integration systems react predictably without parsing free-text messages. In this tutorial context, the pattern bridges Java exception handling with API design quality. Interviewers value this because it demonstrates structured thinking, not ad-hoc error strings. A complete answer should mention governance benefits too: easier analytics, safer refactoring, and clearer communication between backend, frontend, and support teams when diagnosing incidents.

### 8. Should you override \`fillInStackTrace\`?
**Short Answer:** Rarely, and only when profiling proves stack-trace creation is a measurable bottleneck.
**Detailed Explanation:** Overriding fillInStackTrace can reduce exception overhead in very high-frequency paths, but it removes valuable debugging information. For most business applications, keeping full stack traces is the right choice because operational diagnosis matters more than minor micro-optimizations. This technique should be considered only after profiling shows exceptions are a real performance hotspot and not just a suspected issue. Even then, it should be applied narrowly and documented clearly. In interview settings, this question checks your engineering judgment. A strong response shows that you prioritize correctness and observability first, then optimize carefully based on evidence from production-like workloads.

### 9. Serialization of exceptions across services?
**Short Answer:** Do not send raw exception objects across services; send structured error payloads instead.
**Detailed Explanation:** Raw exception objects are not a stable cross-service contract because they depend on language runtime and internal class structure. They can also expose sensitive implementation details through stack traces and internal messages. A better approach is to translate exceptions into structured error responses with fields like code, message, request id, and optional details. This works consistently in REST and gRPC ecosystems and keeps boundaries clean. In this tutorial interview context, the key idea is contract-driven communication. Strong candidates explain that exceptions stay internal, while external systems receive standardized, secure, machine-readable error information that supports retries, user messaging, and monitoring.

### 10. Testing custom exceptions?
**Short Answer:** Test type, context fields, and translation behavior from internal exceptions to outward responses.
**Detailed Explanation:** Effective exception testing goes beyond checking that something throws. You should verify the exact exception type, important metadata fields, and expected error code or message key. Also test boundary translation, such as converting repository failures into domain exceptions and then into API responses. This ensures consistency from internal logic to client-facing behavior. In the context of this page, exception tests protect both correctness and maintainability as code evolves. Interviewers appreciate answers that include negative-path testing and clear assertions for diagnostic data. Good tests make refactoring safer and help teams trust that failure handling remains predictable under real-world scenarios.

---

## Deep Theory: Exceptions as Domain Error Semantics

Custom exceptions encode business meaning into failure paths. They transform low-level technical failures into semantically rich signals that upper layers can reason about.

### Why Custom Exceptions Exist

Generic exceptions answer "something failed." Domain exceptions answer:

- what failed,
- why it failed in business terms,
- whether caller can recover.

This distinction is critical in service architecture and API contract design.

### Checked vs Unchecked from Design Perspective

This is a coupling decision:

- checked exceptions force caller-level acknowledgment,
- unchecked exceptions prioritize flow simplicity and central handling.

The right choice depends on whether recovery is expected at call sites.

### Architectural Benefit

Custom exceptions improve observability, error translation, and policy enforcement, especially when mapping backend errors to HTTP/API responses.

`,
  code: `// Custom Exceptions Demo

import java.util.*;

public class CustomExceptionsDemo {
    public static void main(String[] args) {
        System.out.println("=== Custom Exceptions Demo ===\\n");
        
        // 1. BASIC CUSTOM EXCEPTION
        System.out.println("1. BASIC CUSTOM EXCEPTION");
        System.out.println("   ------------------------");
        
        UserService userService = new UserService();
        
        try {
            userService.findUser(999L);
        } catch (UserNotFoundException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   User ID: " + e.getUserId());
        }
        System.out.println();
        
        // 2. EXCEPTION WITH ADDITIONAL DATA
        System.out.println("2. EXCEPTION WITH ADDITIONAL DATA");
        System.out.println("   --------------------------------");
        
        BankService bankService = new BankService();
        
        try {
            bankService.withdraw("ACC001", 5000);
        } catch (InsufficientFundsException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   Account: " + e.getAccountId());
            System.out.println("   Requested: $" + e.getRequestedAmount());
            System.out.println("   Available: $" + e.getAvailableBalance());
        }
        System.out.println();
        
        // 3. EXCEPTION HIERARCHY
        System.out.println("3. EXCEPTION HIERARCHY");
        System.out.println("   --------------------");
        
        OrderService orderService = new OrderService();
        
        try {
            orderService.cancelOrder(123L);
        } catch (OrderAlreadyShippedException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   Error Code: " + e.getErrorCode());
            System.out.println("   Order ID: " + e.getOrderId());
        } catch (OrderException e) {
            System.out.println("   Generic order error: " + e.getMessage());
        }
        System.out.println();
        
        // 4. VALIDATION EXCEPTIONS
        System.out.println("4. VALIDATION EXCEPTIONS");
        System.out.println("   ----------------------");
        
        RegistrationService regService = new RegistrationService();
        
        // Test various invalid inputs
        String[][] testCases = {
            {"", "test@email.com", "password123"},
            {" Dattu", "invalid-email", "password123"},
            {" Dattu", " Dattu@email.com", "123"},
            {" Dattu", " Dattu@email.com", "password123"}
        };
        
        for (String[] testCase : testCases) {
            try {
                regService.register(testCase[0], testCase[1], testCase[2]);
                System.out.println("   Registration successful for: " + testCase[0]);
            } catch (ValidationException e) {
                System.out.println("   Validation failed: " + e.getMessage());
                System.out.println("     Field: " + e.getFieldName());
            }
        }
        System.out.println();
        
        // 5. CHAINED EXCEPTIONS
        System.out.println("5. CHAINED EXCEPTIONS");
        System.out.println("   -------------------");
        
        DataService dataService = new DataService();
        
        try {
            dataService.fetchData();
        } catch (ServiceException e) {
            System.out.println("   Service error: " + e.getMessage());
            System.out.println("   Caused by: " + e.getCause().getMessage());
        }
        System.out.println();
        
        // 6. REAL-WORLD E-COMMERCE EXAMPLE
        System.out.println("6. REAL-WORLD E-COMMERCE EXAMPLE");
        System.out.println("   -------------------------------");
        
        ECommerceService ecommerce = new ECommerceService();
        
        // Test insufficient stock
        try {
            ecommerce.placeOrder("PROD001", 100);
        } catch (InsufficientStockException e) {
            System.out.println("   Stock error: " + e.getMessage());
            System.out.println("   Product: " + e.getProductId());
            System.out.println("   Requested: " + e.getRequested());
            System.out.println("   Available: " + e.getAvailable());
        } catch (ECommerceException e) {
            System.out.println("   E-commerce error: " + e.getMessage());
        }
        
        // Test payment declined
        try {
            ecommerce.processPayment(1000, "4111111111111111");
        } catch (PaymentDeclinedException e) {
            System.out.println("\\n   Payment error: " + e.getMessage());
            System.out.println("   Amount: $" + e.getAmount());
            System.out.println("   Reason: " + e.getReason());
        } catch (ECommerceException e) {
            System.out.println("   E-commerce error: " + e.getMessage());
        }
    }
}

// ============ Custom Exception Classes ============

// Basic custom exception
class UserNotFoundException extends Exception {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found with ID: " + userId);
        this.userId = userId;
    }
    
    public Long getUserId() { return userId; }
}

// Exception with additional data
class InsufficientFundsException extends Exception {
    private String accountId;
    private double requestedAmount;
    private double availableBalance;
    
    public InsufficientFundsException(String accountId, double requested, double available) {
        super("Insufficient funds in account: " + accountId);
        this.accountId = accountId;
        this.requestedAmount = requested;
        this.availableBalance = available;
    }
    
    public String getAccountId() { return accountId; }
    public double getRequestedAmount() { return requestedAmount; }
    public double getAvailableBalance() { return availableBalance; }
}

// Exception hierarchy
class OrderException extends Exception {
    private String errorCode;
    private Long orderId;
    
    public OrderException(String message, String errorCode, Long orderId) {
        super(message);
        this.errorCode = errorCode;
        this.orderId = orderId;
    }
    
    public String getErrorCode() { return errorCode; }
    public Long getOrderId() { return orderId; }
}

class OrderNotFoundException extends OrderException {
    public OrderNotFoundException(Long orderId) {
        super("Order not found", "ORDER_NOT_FOUND", orderId);
    }
}

class OrderAlreadyShippedException extends OrderException {
    public OrderAlreadyShippedException(Long orderId) {
        super("Cannot cancel - order already shipped", "ORDER_SHIPPED", orderId);
    }
}

// Validation exception
class ValidationException extends RuntimeException {
    private String fieldName;
    
    public ValidationException(String fieldName, String message) {
        super(message);
        this.fieldName = fieldName;
    }
    
    public String getFieldName() { return fieldName; }
}

// Service exception with cause
class ServiceException extends Exception {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

// E-Commerce exceptions
class ECommerceException extends Exception {
    private String errorCode;
    
    public ECommerceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() { return errorCode; }
}

class InsufficientStockException extends ECommerceException {
    private String productId;
    private int requested;
    private int available;
    
    public InsufficientStockException(String productId, int requested, int available) {
        super("Insufficient stock for product: " + productId, "INSUFFICIENT_STOCK");
        this.productId = productId;
        this.requested = requested;
        this.available = available;
    }
    
    public String getProductId() { return productId; }
    public int getRequested() { return requested; }
    public int getAvailable() { return available; }
}

class PaymentDeclinedException extends ECommerceException {
    private double amount;
    private String reason;
    
    public PaymentDeclinedException(double amount, String reason) {
        super("Payment declined: " + reason, "PAYMENT_DECLINED");
        this.amount = amount;
        this.reason = reason;
    }
    
    public double getAmount() { return amount; }
    public String getReason() { return reason; }
}

// ============ Service Classes ============

class UserService {
    public void findUser(Long userId) throws UserNotFoundException {
        // Simulating user not found
        throw new UserNotFoundException(userId);
    }
}

class BankService {
    public void withdraw(String accountId, double amount) throws InsufficientFundsException {
        double balance = 1000;  // Simulated balance
        if (amount > balance) {
            throw new InsufficientFundsException(accountId, amount, balance);
        }
    }
}

class OrderService {
    public void cancelOrder(Long orderId) throws OrderException {
        // Simulating order already shipped
        throw new OrderAlreadyShippedException(orderId);
    }
}

class RegistrationService {
    public void register(String name, String email, String password) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException("name", "Name is required");
        }
        if (email == null || !email.contains("@")) {
            throw new ValidationException("email", "Valid email is required");
        }
        if (password == null || password.length() < 8) {
            throw new ValidationException("password", "Password must be at least 8 characters");
        }
    }
}

class DataService {
    public void fetchData() throws ServiceException {
        try {
            // Simulating database error
            throw new RuntimeException("Database connection failed");
        } catch (RuntimeException e) {
            throw new ServiceException("Failed to fetch data", e);
        }
    }
}

class ECommerceService {
    public void placeOrder(String productId, int quantity) throws ECommerceException {
        int stock = 50;  // Simulated stock
        if (quantity > stock) {
            throw new InsufficientStockException(productId, quantity, stock);
        }
    }
    
    public void processPayment(double amount, String cardNumber) throws ECommerceException {
        // Simulating payment decline
        throw new PaymentDeclinedException(amount, "Card expired");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a library management system with custom exceptions',
      hint: 'Create exceptions for book not found, already borrowed, overdue, etc.',
      starterCode: `import java.util.*;

public class LibraryDemo {
    public static void main(String[] args) {
        System.out.println("=== Library Management System ===\\n");
        
        Library library = new Library();
        
        // Add some books
        library.addBook(new Book("B001", "Java Programming", "Dattu p"));
        library.addBook(new Book("B002", "Python Basics", "Jane Smith"));
        
        // Test scenarios
        try {
            // Borrow a book
            library.borrowBook("B001", "Alice");
            System.out.println("Alice borrowed B001");
            
            // Try to borrow same book
            library.borrowBook("B001", "Bob");
        } catch (BookNotAvailableException e) {
            System.out.println(e.getMessage());
            System.out.println("  Borrowed by: " + e.getCurrentBorrower());
        }
        
        try {
            // Return a book
            library.returnBook("B001", "Alice");
            System.out.println("Alice returned B001");
            
            // Try to return book not borrowed
            library.returnBook("B002", "Alice");
        } catch (BookNotBorrowedException e) {
            System.out.println(e.getMessage());
        }
        
        try {
            // Find non-existent book
            library.findBook("B999");
        } catch (BookNotFoundException e) {
            System.out.println(e.getMessage());
            System.out.println("  Book ID: " + e.getBookId());
        }
    }
}

// Custom exceptions
class LibraryException extends Exception {
    public LibraryException(String message) {
        super(message);
    }
}

class BookNotFoundException extends LibraryException {
    private String bookId;
    
    public BookNotFoundException(String bookId) {
        super("Book not found: " + bookId);
        this.bookId = bookId;
    }
    
    public String getBookId() { return bookId; }
}

class BookNotAvailableException extends LibraryException {
    private String bookId;
    private String currentBorrower;
    
    public BookNotAvailableException(String bookId, String borrower) {
        super("Book " + bookId + " is not available");
        this.bookId = bookId;
        this.currentBorrower = borrower;
    }
    
    public String getBookId() { return bookId; }
    public String getCurrentBorrower() { return currentBorrower; }
}

class BookNotBorrowedException extends LibraryException {
    public BookNotBorrowedException(String bookId) {
        super("Book " + bookId + " was not borrowed");
    }
}

// Book class
class Book {
    String id;
    String title;
    String author;
    String borrowedBy;
    
    public Book(String id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
    
    public boolean isAvailable() {
        return borrowedBy == null;
    }
}

// Library class
class Library {
    private Map<String, Book> books = new HashMap<>();
    
    public void addBook(Book book) {
        books.put(book.id, book);
    }
    
    public Book findBook(String bookId) throws BookNotFoundException {
        Book book = books.get(bookId);
        if (book == null) {
            throw new BookNotFoundException(bookId);
        }
        return book;
    }
    
    public void borrowBook(String bookId, String borrower) 
            throws BookNotFoundException, BookNotAvailableException {
        Book book = findBook(bookId);
        if (!book.isAvailable()) {
            throw new BookNotAvailableException(bookId, book.borrowedBy);
        }
        book.borrowedBy = borrower;
    }
    
    public void returnBook(String bookId, String borrower) 
            throws BookNotFoundException, BookNotBorrowedException {
        Book book = findBook(bookId);
        if (book.isAvailable() || !book.borrowedBy.equals(borrower)) {
            throw new BookNotBorrowedException(bookId);
        }
        book.borrowedBy = null;
    }
}`
    }
  ]
};

export default customExceptions;
