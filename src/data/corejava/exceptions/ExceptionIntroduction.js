const exceptionIntroduction = {
  id: 'exception-introduction',
  title: 'Exception Handling - Complete Guide',
  description: 'Complete guide to exception handling in Java - types, hierarchy, and best practices',
  content: `
# Exception Handling in Java - Complete Guide

An exception is an unwanted or unexpected event that occurs during program execution. Exception handling is a mechanism to handle runtime errors gracefully without crashing the program.

## What is an Exception?

An exception is an event that disrupts the normal flow of the program. When an error occurs, Java creates an exception object containing:
- **Type of error** - What kind of exception occurred
- **State of the program** - Where it occurred
- **Stack trace** - Call sequence leading to the error

---

## Exception Hierarchy

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    EXCEPTION HIERARCHY                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        java.lang.Object                             │
│                              │                                      │
│                              ▼                                      │
│                      java.lang.Throwable                            │
│                              │                                      │
│              ┌───────────────┴───────────────┐                      │
│              │                               │                      │
│              ▼                               ▼                      │
│      java.lang.Error              java.lang.Exception               │
│      (Unchecked)                         │                          │
│              │                   ┌───────┴───────┐                  │
│      ┌───────┴───────┐           │               │                  │
│      │               │           ▼               ▼                  │
│ OutOfMemory    StackOverflow  Checked      RuntimeException         │
│ Error          Error          Exceptions    (Unchecked)             │
│                               │                   │                 │
│                         ┌─────┴─────┐      ┌──────┴──────┐          │
│                         │           │      │             │          │
│                    IOException  SQLException  NullPointer  Arithmetic│
│                    FileNotFound ClassNotFound  Exception   Exception │
│                                              IndexOutOf              │
│                                              Bounds                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Types of Exceptions

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    TYPES OF EXCEPTIONS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. CHECKED EXCEPTIONS (Compile-time)                               │
│     ─────────────────────────────────                               │
│     • Must be handled or declared                                   │
│     • Compiler checks for handling                                  │
│     • Recoverable errors                                            │
│                                                                     │
│     Examples:                                                       │
│     • IOException - File operations                                 │
│     • SQLException - Database operations                            │
│     • FileNotFoundException - File not found                        │
│     • ClassNotFoundException - Class not found                      │
│     • InterruptedException - Thread interrupted                     │
│                                                                     │
│  2. UNCHECKED EXCEPTIONS (Runtime)                                  │
│     ───────────────────────────────                                 │
│     • Not checked at compile time                                   │
│     • Extend RuntimeException                                       │
│     • Programming errors                                            │
│                                                                     │
│     Examples:                                                       │
│     • NullPointerException - Null reference access                  │
│     • ArithmeticException - Division by zero                        │
│     • ArrayIndexOutOfBoundsException - Invalid array index          │
│     • NumberFormatException - Invalid number format                 │
│     • IllegalArgumentException - Invalid argument                   │
│     • ClassCastException - Invalid type casting                     │
│                                                                     │
│  3. ERRORS (Serious Problems)                                       │
│     ─────────────────────────                                       │
│     • Cannot be handled by application                              │
│     • JVM-level problems                                            │
│     • Non-recoverable                                               │
│                                                                     │
│     Examples:                                                       │
│     • OutOfMemoryError - JVM out of memory                          │
│     • StackOverflowError - Stack overflow (infinite recursion)      │
│     • VirtualMachineError - JVM malfunction                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Checked vs Unchecked Exceptions

| Feature | Checked Exception | Unchecked Exception |
|---------|-------------------|---------------------|
| **Compile-time check** | Yes | No |
| **Must handle** | Yes (try-catch or throws) | No (optional) |
| **Extends** | Exception (not RuntimeException) | RuntimeException |
| **Cause** | External factors | Programming errors |
| **Recovery** | Usually recoverable | Usually not recoverable |
| **Examples** | IOException, SQLException | NullPointerException |

---

## Exception Handling Keywords

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    EXCEPTION HANDLING KEYWORDS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  KEYWORD     │ PURPOSE                                              │
│ ─────────────┼──────────────────────────────────────────────────────│
│  try         │ Block of code that might throw exception             │
│  catch       │ Block to handle the exception                        │
│  finally     │ Block that always executes (cleanup)                 │
│  throw       │ Manually throw an exception                          │
│  throws      │ Declare exceptions a method might throw              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

### Basic Syntax

\`\`\`java
try {
    // Code that might throw exception
    int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    // Handle the exception
    System.out.println("Cannot divide by zero!");
} finally {
    // Always executes - cleanup code
    System.out.println("Cleanup completed");
}
\`\`\`

---

## Common Exception Types

### 1. NullPointerException

\`\`\`java
// Cause: Accessing method/field on null reference
String str = null;
str.length();  // NullPointerException

// Prevention
if (str != null) {
    str.length();
}
// Or use Optional (Java 8+)
Optional.ofNullable(str).ifPresent(s -> s.length());
\`\`\`

### 2. ArrayIndexOutOfBoundsException

\`\`\`java
// Cause: Invalid array index
int[] arr = {1, 2, 3};
arr[5];  // ArrayIndexOutOfBoundsException

// Prevention
if (index >= 0 && index < arr.length) {
    arr[index];
}
\`\`\`

### 3. ArithmeticException

\`\`\`java
// Cause: Division by zero
int result = 10 / 0;  // ArithmeticException

// Prevention
if (divisor != 0) {
    int result = dividend / divisor;
}
\`\`\`

### 4. NumberFormatException

\`\`\`java
// Cause: Invalid number format
int num = Integer.parseInt("abc");  // NumberFormatException

// Prevention
try {
    int num = Integer.parseInt(str);
} catch (NumberFormatException e) {
    System.out.println("Invalid number format");
}
\`\`\`

### 5. ClassCastException

\`\`\`java
// Cause: Invalid type casting
Object obj = "Hello";
Integer num = (Integer) obj;  // ClassCastException

// Prevention
if (obj instanceof Integer) {
    Integer num = (Integer) obj;
}
\`\`\`

---

## Why Exception Handling?

| Benefit | Description |
|---------|-------------|
| **Graceful Recovery** | Program doesn't crash abruptly |
| **Meaningful Messages** | Users understand what went wrong |
| **Resource Cleanup** | Close files, connections properly |
| **Debugging** | Stack traces help identify issues |
| **Separation of Concerns** | Error handling separate from logic |
| **Propagation** | Errors can be handled at appropriate level |

---

## 🏢 Real-Time Project Example: E-Commerce Order Processing

\`\`\`java
// Real-Time: Order Processing with Exception Handling
// Used in Amazon, Flipkart order systems

public class ECommerceExceptionDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🛒 E-COMMERCE EXCEPTION HANDLING            ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // Order details
        String orderId = "ORD-2024-78901";
        String customerId = "CUST-12345";
        double orderAmount = 1299.99;
        int quantity = 2;
        int stockAvailable = 1;
        
        System.out.println("\\n📦 Processing Order: " + orderId);
        System.out.println("👤 Customer: " + customerId);
        System.out.println("💰 Amount: $" + orderAmount);
        
        // ═══════════════════════════════════════════════════
        // Exception Scenarios in E-Commerce
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔍 EXCEPTION SCENARIOS IN E-COMMERCE");
        System.out.println("═".repeat(50));
        
        // Scenario 1: Inventory Check
        System.out.println("\\n1️⃣ INVENTORY CHECK:");
        System.out.println("   Ordered: " + quantity + ", Available: " + stockAvailable);
        if (quantity > stockAvailable) {
            System.out.println("   InsufficientStockException");
            System.out.println("   Action: Notify customer, suggest alternatives");
        } else {
            System.out.println("   Stock available");
        }
        
        // Scenario 2: Payment Processing
        System.out.println("\\n2️⃣ PAYMENT PROCESSING:");
        String cardNumber = null;
        if (cardNumber == null) {
            System.out.println("   NullPointerException (Card details missing)");
            System.out.println("   Action: Redirect to payment page");
        }
        
        // Scenario 3: Database Connection
        System.out.println("\\n3️⃣ DATABASE CONNECTION:");
        System.out.println("   SQLException (Connection timeout)");
        System.out.println("   Action: Retry connection, show error message");
        
        // Scenario 4: External API Call
        System.out.println("\\n4️⃣ SHIPPING API CALL:");
        System.out.println("   IOException (API unreachable)");
        System.out.println("   Action: Use fallback shipping provider");
        
        // ═══════════════════════════════════════════════════
        // How to Handle
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("PROPER EXCEPTION HANDLING");
        System.out.println("═".repeat(50));
        
        System.out.println("\\ntry {");
        System.out.println("    // 1. Validate order");
        System.out.println("    // 2. Check inventory");
        System.out.println("    // 3. Process payment");
        System.out.println("    // 4. Create shipment");
        System.out.println("} catch (InsufficientStockException e) {");
        System.out.println("    // Notify customer, suggest alternatives");
        System.out.println("} catch (PaymentFailedException e) {");
        System.out.println("    // Retry payment, notify customer");
        System.out.println("} catch (SQLException e) {");
        System.out.println("    // Log error, retry connection");
        System.out.println("} finally {");
        System.out.println("    // Close database connections");
        System.out.println("    // Release resources");
        System.out.println("}");
    }
}
\`\`\`

---

## 🏦 Real-Time Project Example: Banking System

\`\`\`java
// Real-Time: Banking Exception Handling
// Used in HDFC, ICICI, SBI applications

public class BankingExceptionDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🏦 BANKING EXCEPTION HANDLING               ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // Account details
        String accountNumber = "ACC-1234567890";
        double balance = 5000.00;
        double withdrawAmount = 7000.00;
        
        System.out.println("\\n📋 Account: " + accountNumber);
        System.out.println("💰 Balance: $" + String.format("%,.2f", balance));
        System.out.println("💳 Withdraw Request: $" + String.format("%,.2f", withdrawAmount));
        
        // ═══════════════════════════════════════════════════
        // Banking Exception Scenarios
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔍 BANKING EXCEPTION SCENARIOS");
        System.out.println("═".repeat(50));
        
        // Scenario 1: Insufficient Balance
        System.out.println("\\n1️⃣ WITHDRAWAL:");
        if (withdrawAmount > balance) {
            System.out.println("   InsufficientBalanceException");
            System.out.println("   Message: Insufficient funds");
            System.out.println("   Available: $" + String.format("%,.2f", balance));
            System.out.println("   Action: Deny transaction, notify customer");
        }
        
        // Scenario 2: Invalid Account
        System.out.println("\\n2️⃣ ACCOUNT LOOKUP:");
        String invalidAccount = "ACC-0000000000";
        System.out.println("   Looking up: " + invalidAccount);
        System.out.println("   AccountNotFoundException");
        System.out.println("   Action: Show error, verify account number");
        
        // Scenario 3: Daily Limit Exceeded
        System.out.println("\\n3️⃣ DAILY LIMIT:");
        double dailyLimit = 10000.00;
        double todayWithdrawals = 8000.00;
        double newWithdrawal = 5000.00;
        if (todayWithdrawals + newWithdrawal > dailyLimit) {
            System.out.println("   DailyLimitExceededException");
            System.out.println("   Daily Limit: $" + String.format("%,.2f", dailyLimit));
            System.out.println("   Already Withdrawn: $" + String.format("%,.2f", todayWithdrawals));
            System.out.println("   Remaining: $" + String.format("%,.2f", dailyLimit - todayWithdrawals));
        }
        
        // Scenario 4: Session Timeout
        System.out.println("\\n4️⃣ SESSION:");
        System.out.println("   SessionExpiredException");
        System.out.println("   Action: Redirect to login page");
        
        // ═══════════════════════════════════════════════════
        // Custom Banking Exceptions
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 CUSTOM BANKING EXCEPTIONS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nclass InsufficientBalanceException extends Exception {");
        System.out.println("    private double balance;");
        System.out.println("    private double requested;");
        System.out.println("    ");
        System.out.println("    public InsufficientBalanceException(double bal, double req) {");
        System.out.println("        super(\\"Insufficient balance: \" + bal + \" < \" + req);");
        System.out.println("        this.balance = bal;");
        System.out.println("        this.requested = req;");
        System.out.println("    }");
        System.out.println("}");
    }
}
\`\`\`

---

## Exception Handling Best Practices

| Practice | Description |
|----------|-------------|
| **Catch specific exceptions** | Don't catch generic Exception |
| **Don't swallow exceptions** | Always log or handle properly |
| **Use finally for cleanup** | Close resources in finally block |
| **Use try-with-resources** | For auto-closeable resources (Java 7+) |
| **Create custom exceptions** | For domain-specific errors |
| **Include meaningful messages** | Help with debugging |
| **Don't use exceptions for flow control** | Use if-else instead |
| **Log exceptions properly** | Include stack trace |

---

## Summary

| Concept | Description |
|---------|-------------|
| **Exception** | Event that disrupts normal program flow |
| **Checked** | Must be handled (IOException, SQLException) |
| **Unchecked** | Optional handling (NullPointerException) |
| **Error** | Serious problems (OutOfMemoryError) |
| **try-catch** | Handle exceptions |
| **finally** | Cleanup code (always executes) |
| **throw** | Manually throw exception |
| **throws** | Declare exceptions method might throw |

> **Industry Insight**: Exception handling is critical in enterprise applications. Banks use custom exceptions for business rules (InsufficientBalanceException), e-commerce uses them for inventory management (OutOfStockException), and all applications use them for graceful error recovery.

---

## 10 Important Exception Basics Interview Questions

### 1. What is the hierarchy root for exceptions?
**Answer:** \`Throwable\` → \`Error\` vs \`Exception\`—\`Error\` usually not caught; \`Exception\` splits checked/unchecked at \`RuntimeException\`.
Interviewers draw this tree from memory.

### 2. Checked vs unchecked—who decides?
**Answer:** Subclasses of \`RuntimeException\` and \`Error\` are unchecked; other \`Exception\` subclasses are checked unless declared otherwise.
API designers choose recoverability expectations.

### 3. When should you catch \`Exception\` broadly?
**Answer:** Sparingly—at top-level handlers, logging, or framework boundaries—avoid swallowing without rethrowing wrapped domain errors.
Hides programming bugs if overused.

### 4. What is the difference between \`throw\` and \`throws\`?
**Answer:** \`throw\` emits an exception instance; \`throws\` declares checked exceptions a method may propagate.
Callers must handle or declare checked types.

### 5. Scenario: REST API—what exceptions should clients see?
**Answer:** Mapped HTTP status with sanitized messages—never raw stack traces or SQL details to clients.
Use \`@ControllerAdvice\` in Spring.

### 6. Why not catch \`NullPointerException\` for control flow?
**Answer:** It indicates bugs—fix the null with \`Optional\`, validation, or defaults—catching masks defects.
Performance and clarity suffer.

### 7. What is fail-fast vs fail-safe iterators related to exceptions?
**Answer:** Concurrent modification throws quickly on structural change—different from catching exceptions for flow.
Collections topic overlaps.

### 8. Can constructors declare checked exceptions?
**Answer:** Yes—callers must handle when constructing—sometimes prefer static factory returning \`Result\` types.
Framework constructors (e.g., \`IOException\`) propagate.

### 9. What information belongs in exception messages?
**Answer:** Enough to diagnose (ids, operation) without secrets—PII and tokens must be redacted.
Observability platforms parse structured errors.

### 10. What is suppression and addSuppressed?
**Answer:** Try-with-resources chains exceptions—primary exception holds suppressed ones from close failures—Java 7+.
Important for resource cleanup debugging.

`,
  code: `// Complete Exception Handling Demo
// Understanding all exception concepts

public class ExceptionCompleteDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    ⚠️ EXCEPTION HANDLING - COMPLETE GUIDE      ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: Exception Hierarchy
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 1: EXCEPTION HIERARCHY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n              Throwable");
        System.out.println("                  │");
        System.out.println("        ┌─────────┴─────────┐");
        System.out.println("        │                   │");
        System.out.println("      Error             Exception");
        System.out.println("   (Unchecked)              │");
        System.out.println("        │           ┌───────┴───────┐");
        System.out.println("  OutOfMemory      Checked    RuntimeException");
        System.out.println("  StackOverflow  IOException   (Unchecked)");
        System.out.println("                 SQLException  NullPointer");
        System.out.println("                              Arithmetic");
        
        // ═══════════════════════════════════════════════════
        // PART 2: Types of Exceptions
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 2: TYPES OF EXCEPTIONS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Type      | Check Time  | Must Handle | Example           |");
        System.out.println("|-----------|-------------|-------------|-------------------|");
        System.out.println("| Checked   | Compile     | Yes         | IOException       |");
        System.out.println("| Unchecked | Runtime     | No          | NullPointerException|");
        System.out.println("| Error     | Runtime     | No          | OutOfMemoryError  |");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Common Exceptions Demo
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 3: COMMON EXCEPTIONS");
        System.out.println("═".repeat(50));
        
        // ArithmeticException
        System.out.println("\\n1. ArithmeticException:");
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Message: " + e.getMessage());
            System.out.println("   Cause: Division by zero");
        }
        
        // NullPointerException
        System.out.println("\\n2. NullPointerException:");
        try {
            String str = null;
            int len = str.length();
        } catch (NullPointerException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Cause: Accessing method on null reference");
        }
        
        // ArrayIndexOutOfBoundsException
        System.out.println("\\n3. ArrayIndexOutOfBoundsException:");
        try {
            int[] arr = {1, 2, 3};
            int val = arr[5];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Message: " + e.getMessage());
            System.out.println("   Cause: Invalid array index");
        }
        
        // NumberFormatException
        System.out.println("\\n4. NumberFormatException:");
        try {
            int num = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Cause: Invalid number format");
        }
        
        // ═══════════════════════════════════════════════════
        // PART 4: try-catch-finally
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 4: TRY-CATCH-FINALLY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nExample:");
        try {
            System.out.println("   try: Executing risky code...");
            int result = 10 / 2;  // No exception
            System.out.println("   try: Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("   catch: Handling exception...");
        } finally {
            System.out.println("   finally: Cleanup (always executes)");
        }
        
        System.out.println("\\nWith Exception:");
        try {
            System.out.println("   try: Executing risky code...");
            int result = 10 / 0;  // Exception!
        } catch (ArithmeticException e) {
            System.out.println("   catch: Handling ArithmeticException");
        } finally {
            System.out.println("   finally: Cleanup (always executes)");
        }
        
        // ═══════════════════════════════════════════════════
        // PART 5: Multiple Catch Blocks
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 5: MULTIPLE CATCH BLOCKS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\ntry {");
        System.out.println("    // Code that might throw multiple exceptions");
        System.out.println("} catch (NullPointerException e) {");
        System.out.println("    // Handle null pointer");
        System.out.println("} catch (ArithmeticException e) {");
        System.out.println("    // Handle arithmetic error");
        System.out.println("} catch (Exception e) {");
        System.out.println("    // Handle any other exception");
        System.out.println("}");
        
        // ═══════════════════════════════════════════════════
        // PART 6: throw vs throws
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 6: THROW vs THROWS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Keyword | Purpose                    | Location        |");
        System.out.println("|---------|----------------------------|-----------------|");
        System.out.println("| throw   | Throw an exception         | Inside method   |");
        System.out.println("| throws  | Declare possible exception | Method signature|");
        
        System.out.println("\\nthrow example:");
        System.out.println("  if (age < 0) {");
        System.out.println("      throw new IllegalArgumentException(\\"Invalid age\\");");
        System.out.println("  }");
        
        System.out.println("\\nthrows example:");
        System.out.println("  public void readFile() throws IOException {");
        System.out.println("      // File reading code");
        System.out.println("  }");
        
        // ═══════════════════════════════════════════════════
        // PART 7: Best Practices
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 7: BEST PRACTICES");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nDO:");
        System.out.println("   • Catch specific exceptions");
        System.out.println("   • Use finally for cleanup");
        System.out.println("   • Log exceptions properly");
        System.out.println("   • Create custom exceptions for business logic");
        System.out.println("   • Use try-with-resources for auto-close");
        
        System.out.println("\\nDON'T:");
        System.out.println("   • Catch generic Exception");
        System.out.println("   • Swallow exceptions (empty catch)");
        System.out.println("   • Use exceptions for flow control");
        System.out.println("   • Throw Exception from main()");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nKey Takeaways:");
        System.out.println("   • Exception = Unexpected event during execution");
        System.out.println("   • Checked = Must handle (IOException)");
        System.out.println("   • Unchecked = Optional (NullPointerException)");
        System.out.println("   • try-catch-finally = Handle and cleanup");
        System.out.println("   • throw = Manually throw exception");
        System.out.println("   • throws = Declare in method signature");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a banking withdrawal system with proper exception handling',
      hint: 'Handle InsufficientBalanceException, InvalidAmountException, and AccountNotFoundException',
      starterCode: `public class BankingWithdrawal {
    public static void main(String[] args) {
        double balance = 5000.00;
        double withdrawAmount = 7000.00;
        
        System.out.println("=== BANKING WITHDRAWAL ===");
        System.out.println("Balance: $" + balance);
        System.out.println("Withdraw: $" + withdrawAmount);
        
        try {
            // Validate amount (must be positive)
            if (withdrawAmount <= 0) {
                // throw InvalidAmountException
            }
            
            // Check balance
            if (withdrawAmount > balance) {
                // throw InsufficientBalanceException
            }
            
            // Process withdrawal
            balance -= withdrawAmount;
            System.out.println("New Balance: $" + balance);
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Transaction completed");
        }
    }
}`
    }
  ]
};

export default exceptionIntroduction;
