const globalExceptionHandling = {
  id: 'global-exception-handling',
  title: 'Global Exception Handling',
  description: 'Learn how to implement global exception handling in real-world Spring Boot applications with practical scenarios',
  content: `
# Global Exception Handling - Real-World Application Strategy

What is Global Exception Handling?

Imagine you are building a backend application using Spring MVC or Spring Boot.

Users are:
- Creating accounts
- Making payments
- Booking tickets
- Submitting forms

Now what happens if:
- User enters wrong data?
- Database connection fails?
- NullPointerException occurs?
- Payment gateway throws error?
- API endpoint not found?
- Unauthorized access attempt?

If you don't handle these properly:
- Application crashes
- User sees ugly stack trace
- Security risk
- Bad user experience

That's why we use Global Exception Handling.

---

## First Understand This

There are 3 levels of exception handling:

**1. Local Exception Handling** - Inside method (try-catch)

**2. Controller Level Handling** - In specific controller

**3. Global Exception Handling** - Best practice in real applications

In real projects, we mostly use Global Handling because it centralizes error management and provides consistent responses.

---

## Real-Time Scenario 1: Banking Application

User transfers 10,000 rupees.

Possible errors:
- Insufficient balance
- Account not found
- Database failure
- Network timeout

We don't want:
\`\`\`
java.lang.NullPointerException at AccountService.java:45
\`\`\`

We want:
\`\`\`json
{
  "timestamp": "2026-02-21T10:30:00",
  "message": "Insufficient balance",
  "status": 400
}
\`\`\`

Professional response that frontend can handle.

---

## How Industry Handles This (Spring MVC Style)

We use:
- \`@ControllerAdvice\`
- \`@ExceptionHandler\`

Think of \`@ControllerAdvice\` like this:

"Hey Spring, if ANY controller throws an exception, send it here."

---

## Real-Time Example (Spring MVC)

### Step 1 - Create Custom Exception

\`\`\`java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class InsufficientBalanceException extends RuntimeException {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}
\`\`\`

### Step 2 - Throw Exception in Service

\`\`\`java
@Service
public class AccountService {
    
    public void transferMoney(Long fromAccount, Long toAccount, BigDecimal amount) {
        Account account = accountRepository.findById(fromAccount)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Account not found with id: " + fromAccount));
        
        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException(
                "Insufficient balance. Available: " + account.getBalance());
        }
        
        // Perform transfer
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);
    }
}
\`\`\`

### Step 3 - Global Exception Handler

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(
        GlobalExceptionHandler.class);
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {
        
        logger.warn("Resource not found: {}", ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value()
        );
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientBalance(
            InsufficientBalanceException ex) {
        
        logger.warn("Insufficient balance: {}", ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value()
        );
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        
        logger.error("Unexpected error occurred", ex);
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            "An unexpected error occurred. Please try again later.",
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Standard Error Response DTO
class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private int status;
    
    public ErrorResponse(LocalDateTime timestamp, String message, int status) {
        this.timestamp = timestamp;
        this.message = message;
        this.status = status;
    }
    
    // Getters and setters
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getMessage() { return message; }
    public int getStatus() { return status; }
}
\`\`\`

Now every time these exceptions happen, user gets clean JSON response instead of stack trace.

---

## Real-Time Scenario 2: E-Commerce Website

User tries to order a product.

Possible issues:
- Product out of stock
- Invalid coupon code
- Payment failed
- Shipping address missing

We create custom exceptions for each:

\`\`\`java
public class OutOfStockException extends RuntimeException {
    public OutOfStockException(String message) {
        super(message);
    }
}

public class InvalidCouponException extends RuntimeException {
    public InvalidCouponException(String message) {
        super(message);
    }
}

public class PaymentFailedException extends RuntimeException {
    public PaymentFailedException(String message) {
        super(message);
    }
}
\`\`\`

Service layer throws these:

\`\`\`java
@Service
public class OrderService {
    
    public Order createOrder(OrderRequest request) {
        // Check stock
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Product not found"));
        
        if (product.getStock() < request.getQuantity()) {
            throw new OutOfStockException(
                "Product out of stock. Available: " + product.getStock());
        }
        
        // Validate coupon
        if (request.getCouponCode() != null) {
            Coupon coupon = couponRepository.findByCode(request.getCouponCode())
                .orElseThrow(() -> new InvalidCouponException(
                    "Invalid coupon code: " + request.getCouponCode()));
            
            if (coupon.isExpired()) {
                throw new InvalidCouponException("Coupon has expired");
            }
        }
        
        // Process payment
        PaymentResult result = paymentService.processPayment(
            request.getPaymentDetails(), request.getAmount());
        
        if (!result.isSuccess()) {
            throw new PaymentFailedException(
                "Payment failed: " + result.getErrorMessage());
        }
        
        // Create order
        Order order = new Order();
        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.setStatus("CONFIRMED");
        return orderRepository.save(order);
    }
}
\`\`\`

Global handler catches all:

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(OutOfStockException.class)
    public ResponseEntity<ErrorResponse> handleOutOfStock(
            OutOfStockException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(LocalDateTime.now(), ex.getMessage(), 400));
    }
    
    @ExceptionHandler(InvalidCouponException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCoupon(
            InvalidCouponException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(LocalDateTime.now(), ex.getMessage(), 400));
    }
    
    @ExceptionHandler(PaymentFailedException.class)
    public ResponseEntity<ErrorResponse> handlePaymentFailed(
            PaymentFailedException ex) {
        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED)
            .body(new ErrorResponse(LocalDateTime.now(), ex.getMessage(), 402));
    }
}
\`\`\`

---

## Real-Time Scenario 3: Form Validation Error

User submits registration form:
- Email empty
- Password too short
- Age negative

Spring throws \`MethodArgumentNotValidException\` automatically.

We handle it globally:

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("errors", errors);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
\`\`\`

Now frontend receives:

\`\`\`json
{
  "timestamp": "2026-02-21T10:30:00",
  "status": 400,
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 8 characters",
    "age": "Age must be positive"
  }
}
\`\`\`

Frontend can show field-level errors to user. This is how real companies do it.

---

## Why Global Handling is Important in Real Projects

**Centralized Control**

All errors handled in one place. Easy to maintain and update.

**Clean Controllers**

Controllers focus only on business logic. No try-catch blocks cluttering the code.

**Consistent Response Format**

Frontend always receives same structure. Mobile app developers know exactly what to expect.

**Security**

Never expose stack trace to users. Internal errors stay internal.

**Better Logging**

All errors logged in one place with proper context.

---

## Real Industry Architecture

In big projects, structure looks like this:

\`\`\`
controller/
service/
repository/
exception/
  ├── custom exceptions
  └── GlobalExceptionHandler
\`\`\`

Each layer throws exceptions, but only Global Handler responds to user.

---

## Important Real-Time Concepts

### 1. Never Catch Generic Exception Everywhere

**Bad approach:**

\`\`\`java
public void processData() {
    try {
        // business logic
    } catch (Exception e) {
        e.printStackTrace();
    }
}
\`\`\`

**Good approach:**

\`\`\`java
public void processData() {
    // Let exceptions throw naturally
    // Handle in Global layer
    if (data == null) {
        throw new DataNotFoundException("Data not found");
    }
    // process data
}
\`\`\`

### 2. Logging Is Mandatory

In real companies, you must log errors:

\`\`\`java
private static final Logger logger = LoggerFactory.getLogger(
    GlobalExceptionHandler.class);

@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleException(Exception ex) {
    // Log full error internally for debugging
    logger.error("Error occurred", ex);
    
    // Send clean message to user
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(LocalDateTime.now(),
            "An error occurred. Please try again later.", 500));
}
\`\`\`

We log full error internally but send clean message to user.

### 3. Different HTTP Status Codes Matter

Real applications follow HTTP status codes strictly:

| Situation | Status Code | When to Use |
|-----------|-------------|-------------|
| Bad input | 400 | Validation errors, invalid data |
| Unauthorized | 401 | User not authenticated |
| Forbidden | 403 | User authenticated but not authorized |
| Not found | 404 | Resource doesn't exist |
| Server error | 500 | Unexpected internal errors |

\`\`\`java
@ExceptionHandler(ValidationException.class)
public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(...);
}

@ExceptionHandler(UnauthorizedException.class)
public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(...);
}

@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(...);
}
\`\`\`

---

## Real-Time Enterprise Pattern

Companies create a Standard Error Response DTO:

\`\`\`java
public class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private int status;
    private String path;
    private Object details;
    
    public ErrorResponse(LocalDateTime timestamp, String message, 
                        int status, String path, Object details) {
        this.timestamp = timestamp;
        this.message = message;
        this.status = status;
        this.path = path;
        this.details = details;
    }
    
    // Getters and setters
}
\`\`\`

Then every exception returns this structure.

**Why?**

- Frontend team depends on consistent structure
- Mobile app depends on it
- API documentation depends on it
- Testing becomes easier

---

## Most Asked Interview Question

**Difference between @ControllerAdvice and @RestControllerAdvice?**

\`@ControllerAdvice\` - For MVC applications (returns views, HTML pages)

\`@RestControllerAdvice\` - For REST APIs (returns JSON responses)

In modern APIs, we use \`@RestControllerAdvice\` because we're building REST services that return JSON.

\`\`\`java
// For REST APIs (most common)
@RestControllerAdvice
public class GlobalExceptionHandler {
    // Returns JSON automatically
}

// For MVC (less common now)
@ControllerAdvice
public class GlobalExceptionHandler {
    // Returns ModelAndView or redirects
}
\`\`\`

---

## Real-Time Microservice Scenario

In microservices architecture:

Service A calls Service B

Service B fails

We need to:
- Catch error properly
- Convert into meaningful response
- Log correlation ID for tracking
- Send proper HTTP status
- Sometimes use custom error codes

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RemoteServiceException.class)
    public ResponseEntity<ErrorResponse> handleRemoteService(
            RemoteServiceException ex) {
        
        // Log with correlation ID
        logger.error("Remote service error [CorrelationId: {}]: {}", 
            ex.getCorrelationId(), ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            "Service temporarily unavailable. Please try again later.",
            HttpStatus.SERVICE_UNAVAILABLE.value(),
            null,
            null
        );
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
            .body(error);
    }
}
\`\`\`

Sometimes companies use:
- Custom error codes (like ERROR_CODE_1001)
- Centralized logging (ELK stack)
- API Gateway level handling

---

## Complete Real-World Example

Here's a complete example of how real companies implement global exception handling:

\`\`\`java
// Custom Exceptions
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

public class InvalidInputException extends RuntimeException {
    private Map<String, String> errors;
    
    public InvalidInputException(String message, Map<String, String> errors) {
        super(message);
        this.errors = errors;
    }
    
    public Map<String, String> getErrors() {
        return errors;
    }
}

// Service Layer
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));
    }
    
    public User createUser(UserRequest request) {
        // Validate
        Map<String, String> errors = validateUser(request);
        if (!errors.isEmpty()) {
            throw new InvalidInputException("Invalid user data", errors);
        }
        
        // Create user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        return userRepository.save(user);
    }
    
    private Map<String, String> validateUser(UserRequest request) {
        Map<String, String> errors = new HashMap<>();
        
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        }
        
        if (request.getEmail() == null || !isValidEmail(request.getEmail())) {
            errors.put("email", "Valid email is required");
        }
        
        return errors;
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
}

// Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}

// Global Exception Handler
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(
        GlobalExceptionHandler.class);
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
            UserNotFoundException ex, HttpServletRequest request) {
        
        logger.warn("User not found: {}", ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value(),
            request.getRequestURI(),
            null
        );
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInput(
            InvalidInputException ex, HttpServletRequest request) {
        
        logger.warn("Invalid input: {}", ex.getErrors());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value(),
            request.getRequestURI(),
            ex.getErrors()
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        logger.warn("Validation error: {}", errors);
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            "Request validation failed",
            HttpStatus.BAD_REQUEST.value(),
            request.getRequestURI(),
            errors
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, HttpServletRequest request) {
        
        logger.error("Unexpected error occurred", ex);
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            "An unexpected error occurred. Please try again later.",
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            request.getRequestURI(),
            null
        );
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }
}

// Error Response DTO
class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private int status;
    private String path;
    private Object details;
    
    public ErrorResponse(LocalDateTime timestamp, String message, 
                        int status, String path, Object details) {
        this.timestamp = timestamp;
        this.message = message;
        this.status = status;
        this.path = path;
        this.details = details;
    }
    
    // Getters and setters
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
    
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    
    public Object getDetails() { return details; }
    public void setDetails(Object details) { this.details = details; }
}
\`\`\`

---

## Final Real-Time Advice

If you want to write production-level exception handling:

1. Create custom exceptions for your business logic
2. Use @RestControllerAdvice for REST APIs
3. Create common ErrorResponse DTO
4. Log errors properly with context
5. Never expose internal error details to users
6. Use correct HTTP status codes
7. Handle validation errors separately
8. Include request path in error response for debugging

---

## Real Developer Mindset

Exception handling is not about avoiding crash.

It is about controlling failure professionally.

Every professional backend system fails. The difference is:

- Bad system crashes and shows stack trace
- Good system responds gracefully with proper error message

In real companies, when something goes wrong, users should see:

"Something went wrong. Please try again later."

Not:

"java.lang.NullPointerException at com.example.service.UserService.getUser(UserService.java:45)"

That's the difference between amateur and professional code.
  `,
  code: `// Global Exception Handling - Complete Real-World Example

// Custom Exception Classes
class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

class InvalidInputException extends RuntimeException {
    private Map<String, String> errors;
    
    public InvalidInputException(String message, Map<String, String> errors) {
        super(message);
        this.errors = errors;
    }
    
    public Map<String, String> getErrors() {
        return errors;
    }
}

// Service Layer
class UserService {
    
    public User getUserById(Long id) {
        // Simulate database lookup
        if (id == null || id <= 0) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        
        User user = new User();
        user.setId(id);
        user.setName("Dattu p");
        user.setEmail(" Dattu@example.com");
        return user;
    }
    
    public User createUser(UserRequest request) {
        // Validate input
        Map<String, String> errors = validateUser(request);
        if (!errors.isEmpty()) {
            throw new InvalidInputException("Invalid user data", errors);
        }
        
        // Create user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        return user;
    }
    
    private Map<String, String> validateUser(UserRequest request) {
        Map<String, String> errors = new HashMap<>();
        
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        }
        
        if (request.getEmail() == null || !request.getEmail().contains("@")) {
            errors.put("email", "Valid email is required");
        }
        
        return errors;
    }
}

// Global Exception Handler
@RestControllerAdvice
class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
            UserNotFoundException ex) {
        System.out.println("User not found: " + ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            404,
            "/api/users",
            null
        );
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInput(
            InvalidInputException ex) {
        System.out.println("Invalid input: " + ex.getErrors());
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            ex.getMessage(),
            400,
            "/api/users",
            ex.getErrors()
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        System.out.println("Unexpected error: " + ex.getMessage());
        ex.printStackTrace();
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            "An unexpected error occurred. Please try again later.",
            500,
            "/api/users",
            null
        );
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }
}

// Error Response Model
class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private int status;
    private String path;
    private Object details;
    
    public ErrorResponse(LocalDateTime timestamp, String message, 
                        int status, String path, Object details) {
        this.timestamp = timestamp;
        this.message = message;
        this.status = status;
        this.path = path;
        this.details = details;
    }
    
    // Getters and setters
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getMessage() { return message; }
    public int getStatus() { return status; }
    public String getPath() { return path; }
    public Object getDetails() { return details; }
}

// Usage Example
public class GlobalExceptionHandlingExample {
    public static void main(String[] args) {
        UserService userService = new UserService();
        
        try {
            // This will throw UserNotFoundException
            User user = userService.getUserById(null);
        } catch (UserNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        try {
            // This will throw InvalidInputException
            UserRequest request = new UserRequest();
            request.setName(""); // Invalid
            request.setEmail("invalid-email"); // Invalid
            User newUser = userService.createUser(request);
        } catch (InvalidInputException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Details: " + e.getErrors());
        }
    }
}`
};

export default globalExceptionHandling;
