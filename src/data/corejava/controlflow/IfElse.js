const ifElse = {
  id: 'if-else',
  title: 'If-Else Statements',
  description: 'Making decisions in your code',
  content: `
# If-Else Statements - Making Decisions in Code

If-else statements are fundamental control flow constructs in Java that enable programs to execute different code blocks based on conditional logic. In real applications, every important decision uses conditions: allow login or reject it, apply discount or skip it, approve payment or block it, show error or save data.

Enterprise applications extensively use conditional statements for access control, data validation, business rule enforcement, and user interface logic. Banking systems use conditionals for transaction validation, e-commerce platforms use them for pricing and discount logic, and authentication systems rely on conditionals for access decisions. Mastery of if-else statements is fundamental for all Java developers.

---

## The Basic If Statement

\`\`\`java
public class BasicIfDemo {
    public static void main(String[] args) {
        boolean paymentCompleted = true;

        if (paymentCompleted) {
            System.out.println("Order can be confirmed");
        }
    }
}
\`\`\`

Use a basic \`if\` when one action should happen only if a condition is true, such as showing a success message after payment or sending an OTP only for an active user.

\`\`\`java
public class VotingEligibilityDemo {
    public static void main(String[] args) {
        int age = 20;

        if (age >= 18) {
            System.out.println("You can vote!");
        }
    }
}
\`\`\`

---

## If-Else Statement

\`\`\`java
public class IfElseSyntaxDemo {
    public static void main(String[] args) {
        boolean stockAvailable = false;

        if (stockAvailable) {
            System.out.println("Add item to cart");
        } else {
            System.out.println("Show out-of-stock message");
        }
    }
}
\`\`\`

Use \`if-else\` when both outcomes matter, like pass/fail, login success/login error, stock available/out of stock, or adult/minor.

\`\`\`java
public class PassFailDemo {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 60) {
            System.out.println("You passed!");
        } else {
            System.out.println("You failed.");
        }
    }
}
\`\`\`

---

## If-Else-If Ladder

For multiple conditions, use an if-else-if ladder. This is common in grading, order status decisions, loan eligibility, ticket priority, and salary tax slab logic.

\`\`\`java
public class DeliveryChargeDemo {
    public static void main(String[] args) {
        double cartTotal = 850.0;
        double deliveryCharge;

        if (cartTotal >= 1000) {
            deliveryCharge = 0;
        } else if (cartTotal >= 500) {
            deliveryCharge = 40;
        } else if (cartTotal >= 200) {
            deliveryCharge = 70;
        } else {
            deliveryCharge = 100;
        }

        System.out.println("Delivery charge: " + deliveryCharge);
    }
}
\`\`\`

**Example  Grade Calculator:**
\`\`\`java
public class GradeCalculator {
    public static void main(String[] args) {
        int score = 85;
        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }

        System.out.println("Grade: " + grade);
    }
}
\`\`\`

---

## Nested If Statements

If statements inside if statements. Nested checks are useful when the second rule should be checked only after the first rule passes, like checking license only after age is valid or checking payment only after cart is not empty.

\`\`\`java
public class DrivingEligibilityDemo {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;

        if (age >= 18) {
            if (hasLicense) {
                System.out.println("You can drive!");
            } else {
                System.out.println("Get a license first.");
            }
        } else {
            System.out.println("Too young to drive.");
        }
    }
}
\`\`\`

**Tip:** Avoid deep nesting  it makes code hard to read. Consider using early returns or combining conditions.

---

## Combining Conditions

### AND (&&)  Both must be true

\`\`\`java
public class AndConditionDemo {
    public static void main(String[] args) {
        int age = 22;
        boolean hasLicense = true;

        if (age >= 18 && hasLicense) {
            System.out.println("Can drive");
        }
    }
}
\`\`\`

### OR (||)  At least one must be true

\`\`\`java
public class OrConditionDemo {
    public static void main(String[] args) {
        boolean isAdmin = false;
        boolean isOwner = true;

        if (isAdmin || isOwner) {
            System.out.println("Has access");
        }
    }
}
\`\`\`

### NOT (!)  Reverses the condition

\`\`\`java
public class NotConditionDemo {
    public static void main(String[] args) {
        boolean isLoggedIn = false;

        if (!isLoggedIn) {
            System.out.println("Please log in");
        }
    }
}
\`\`\`

---

## Common Patterns

### Null Check

\`\`\`java
public class NullCheckDemo {
    static class User {
        private String name;
        private boolean active;

        User(String name, boolean active) {
            this.name = name;
            this.active = active;
        }

        String getName() {
            return name;
        }

        boolean isActive() {
            return active;
        }
    }

    public static void main(String[] args) {
        User user = new User("Dattu", true);

        if (user != null) {
            System.out.println("Hello, " + user.getName());
        }

        if (user != null && user.isActive()) {
            System.out.println("User can access dashboard");
        }
    }
}
\`\`\`

### Range Check

\`\`\`java
public class RangeCheckDemo {
    public static void main(String[] args) {
        int age = 16;

        if (age >= 13 && age <= 19) {
            System.out.println("Teenager");
        }
    }
}
\`\`\`

### Empty Check

\`\`\`java
public class EmptyCheckDemo {
    public static void main(String[] args) {
        String name = "Dattu";

        if (name != null && !name.isEmpty()) {
            System.out.println("Name: " + name);
        }

        if (name != null && !name.isBlank()) {
            System.out.println("Name after blank check: " + name);
        }
    }
}
\`\`\`

---

## Ternary Operator  Shorthand If-Else

For simple assignments. In real code, ternary is useful for small labels like account status, delivery charge text, discount type, or pass/fail result.

\`\`\`java
public class TernaryIfElseDemo {
    public static void main(String[] args) {
        int age = 20;

        String statusUsingIf;
        if (age >= 18) {
            statusUsingIf = "Adult";
        } else {
            statusUsingIf = "Minor";
        }

        String statusUsingTernary = (age >= 18) ? "Adult" : "Minor";

        System.out.println("If-else status: " + statusUsingIf);
        System.out.println("Ternary status: " + statusUsingTernary);
    }
}
\`\`\`

**Use ternary for simple cases only.** Complex logic should use regular if-else.

---

## Best Practices

### 1. Always Use Braces

\`\`\`java
public class AlwaysUseBracesDemo {
    static void reserveStock() {
        System.out.println("Stock reserved");
    }

    static void createOrder() {
        System.out.println("Order created");
    }

    public static void main(String[] args) {
        boolean paymentCompleted = true;

        if (paymentCompleted) {
            reserveStock();
            createOrder();
        }
    }
}
\`\`\`

### 2. Positive Conditions First

\`\`\`java
public class PositiveConditionDemo {
    public static void main(String[] args) {
        boolean isValid = true;

        if (isValid) {
            System.out.println("Save customer profile");
        } else {
            System.out.println("Show validation error");
        }
    }
}
\`\`\`

### 3. Early Return Pattern

\`\`\`java
public class EarlyReturnDemo {
    static class User {
        boolean active;
        boolean permission;

        User(boolean active, boolean permission) {
            this.active = active;
            this.permission = permission;
        }

        boolean isActive() {
            return active;
        }

        boolean hasPermission() {
            return permission;
        }
    }

    static void openAdminPage(User user) {
        if (user == null) {
            System.out.println("User not found");
            return;
        }
        if (!user.isActive()) {
            System.out.println("User is inactive");
            return;
        }
        if (!user.hasPermission()) {
            System.out.println("Permission denied");
            return;
        }

        System.out.println("Admin page opened");
    }

    public static void main(String[] args) {
        User user = new User(true, true);
        openAdminPage(user);
    }
}
\`\`\`

---

## Real-World Example: Login Validation

\`\`\`java
public class LoginValidationDemo {
    static class User {
        private String username;
        private String password;
        private boolean locked;
        private int failedAttempts;

        User(String username, String password) {
            this.username = username;
            this.password = password;
        }

        boolean isLocked() {
            return locked;
        }

        boolean checkPassword(String password) {
            return this.password.equals(password);
        }

        void incrementFailedAttempts() {
            failedAttempts++;
        }

        int getFailedAttempts() {
            return failedAttempts;
        }

        void lock() {
            locked = true;
        }

        void resetFailedAttempts() {
            failedAttempts = 0;
        }
    }

    static User findUser(String username) {
        if ("dattu".equals(username)) {
            return new User("dattu", "Java@123");
        }
        return null;
    }

    static String login(String username, String password) {
        if (username == null || username.isEmpty()) {
            return "Username is required";
        }

        if (password == null || password.isEmpty()) {
            return "Password is required";
        }

        User user = findUser(username);

        if (user == null) {
            return "User not found";
        }

        if (user.isLocked()) {
            return "Account is locked";
        }

        if (!user.checkPassword(password)) {
            user.incrementFailedAttempts();
            if (user.getFailedAttempts() >= 3) {
                user.lock();
                return "Account locked due to too many failed attempts";
            }
            return "Invalid password";
        }

        user.resetFailedAttempts();
        return "Login successful";
    }

    public static void main(String[] args) {
        System.out.println(login("", "Java@123"));
        System.out.println(login("unknown", "Java@123"));
        System.out.println(login("dattu", "wrong"));
        System.out.println(login("dattu", "Java@123"));
    }
}
\`\`\`

---

## 10 Important if-else Interview Questions

### 1. When do you choose if-else over switch?
**Answer:** Use if-else for ranges, compound boolean conditions, or non-constant predicates; switch fits discrete constants (especially enums) with clearer branching.
If-else chains with duplicated conditions are a smellextract methods.

### 2. What is dangling else and how does Java bind else?
**Answer:** An \`else\` binds to the nearest preceding \`if\` without an \`else\`; use braces to make intent explicit.
Always brace multi-line branches to avoid maintenance bugs.

### 3. How does \`boolean\` short-circuiting interact with if conditions?
**Answer:** \`&&\` and \`||\` skip evaluating the right side when the result is fixeduseful to avoid null checks and expensive calls.
Order conditions from cheapest/safest to heavier.

### 4. Can you use \`if\` with assignment accidentally?
**Answer:** Yes\`if (x = y)\` is a compile-time error when the assignment does not produce a \`boolean\` (e.g. \`int\` operands). If both sides are \`boolean\`, it compiles and assigns \`y\` to \`x\`, which is often a logic bug mistaken for \`==\`.
Use \`==\` for comparison and tools/review to catch suspicious assignments in conditions.

### 5. What is the ternary operator vs if-else for returns?
**Answer:** Ternary is an expression and can be assigned; if-else is statementspick based on readability.
Deep nesting of ternaries hurts clarity.

### 6. How do you structure validation with if-else early returns?
**Answer:** Guard clauses at the top reduce nesting (fail fast) and keep the happy path at the bottom.
This pattern appears heavily in REST controllers and parsers.

### 7. Scenario: feature flags control behaviorhow does if-else scale?
**Answer:** A few flags work with if-else; many combinations call for strategy pattern, polymorphism, or rule engines.
Interviewers probe when simple branching becomes unmaintainable.

### 8. What role does \`else if\` play?
**Answer:** It chains mutually exclusive conditions after the first \`if\`; only one branch runs.
Contrast with separate \`if\` statements where multiple could run.

### 9. How does floating-point comparison affect if conditions?
**Answer:** Never compare \`double\` with \`==\` for computed values; use epsilon ranges or \`BigDecimal\`.
Financial rules often encode thresholds in configuration.

### 10. What is a common readability guideline for nested ifs?
**Answer:** Limit nesting depth (e.g., flatten with early returns or extract methods); cyclomatic complexity tools flag deep trees.
Readable code reduces defect rates in reviews.

`,
  code: `// If-Else Demo

public class IfElseDemo {
    public static void main(String[] args) {
        System.out.println("=== If-Else Statements Demo ===\\n");
        
        // 1. BASIC IF
        System.out.println("1. BASIC IF");
        System.out.println("  ---------");
        
        int temperature = 30;
        System.out.println("Temperature: " + temperature + "C");
        
        if (temperature > 25) {
            System.out.println("It's hot today!");
        }
        System.out.println();
        
        // 2. IF-ELSE
        System.out.println("2. IF-ELSE");
        System.out.println("  --------");
        
        int age = 16;
        System.out.println("Age: " + age);
        
        if (age >= 18) {
            System.out.println("You can vote!");
        } else {
            System.out.println("Too young to vote.");
        }
        System.out.println();
        
        // 3. IF-ELSE-IF LADDER
        System.out.println("3. IF-ELSE-IF LADDER (Grade Calculator)");
        System.out.println("  -------------------------------------");
        
        int[] scores = {95, 82, 73, 65, 45};
        
        for (int score : scores) {
            String grade;
            if (score >= 90) {
                grade = "A";
            } else if (score >= 80) {
                grade = "B";
            } else if (score >= 70) {
                grade = "C";
            } else if (score >= 60) {
                grade = "D";
            } else {
                grade = "F";
            }
            System.out.println("Score: " + score + " -> Grade: " + grade);
        }
        System.out.println();
        
        // 4. COMBINING CONDITIONS
        System.out.println("4. COMBINING CONDITIONS");
        System.out.println("  ---------------------");
        
        int userAge = 25;
        boolean hasLicense = true;
        boolean hasCar = false;
        
        System.out.println("Age: " + userAge + ", License: " + hasLicense + ", Car: " + hasCar);
        
        // AND
        if (userAge >= 18 && hasLicense) {
            System.out.println("Can legally drive");
        }
        
        // OR
        if (hasLicense || hasCar) {
            System.out.println("Has license OR car");
        }
        
        // Complex
        if (userAge >= 18 && hasLicense && !hasCar) {
            System.out.println("Can drive but needs to rent a car");
        }
        System.out.println();
        
        // 5. NESTED IF
        System.out.println("5. NESTED IF");
        System.out.println("  ----------");
        
        String userType = "premium";
        int purchaseAmount = 150;
        
        System.out.println("User: " + userType + ", Purchase: $" + purchaseAmount);
        
        if (userType.equals("premium")) {
            if (purchaseAmount >= 100) {
                System.out.println("  20% discount applied!");
            } else {
                System.out.println("  10% discount applied!");
            }
        } else {
            if (purchaseAmount >= 100) {
                System.out.println("  5% discount applied!");
            } else {
                System.out.println("No discount");
            }
        }
        System.out.println();
        
        // 6. TERNARY OPERATOR
        System.out.println("6. TERNARY OPERATOR");
        System.out.println("  -----------------");
        
        int num = 7;
        String evenOdd = (num % 2 == 0) ? "even" : "odd";
        System.out.println("  " + num + " is " + evenOdd);
        
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("Max of " + a + " and " + b + " is " + max);
        
        // Nested ternary (use sparingly!)
        int score = 85;
        String result = (score >= 90) ? "Excellent" :
                        (score >= 70) ? "Good" :
                        (score >= 50) ? "Pass" : "Fail";
        System.out.println("Score " + score + ": " + result);
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Login System");
        System.out.println("  -----------------------------------");
        
        LoginSystem login = new LoginSystem();
        
        System.out.println("  " + login.authenticate("", "pass123"));
        System.out.println("  " + login.authenticate(" Dattu", ""));
        System.out.println("  " + login.authenticate("unknown", "pass123"));
        System.out.println("  " + login.authenticate(" Dattu", "wrong"));
        System.out.println("  " + login.authenticate(" Dattu", "password123"));
    }
}

class LoginSystem {
    public String authenticate(String username, String password) {
        // Validate input
        if (username == null || username.isEmpty()) {
            return "Error: Username required";
        }
        
        if (password == null || password.isEmpty()) {
            return "Error: Password required";
        }
        
        // Check user exists (simulated)
        if (!username.equals(" Dattu") && !username.equals("jane")) {
            return "Error: User not found";
        }
        
        // Verify password (simulated)
        if (!password.equals("password123")) {
            return "Error: Invalid password";
        }
        
        return "Success: Welcome, " + username + "!";
    }
}

---

## Real-World Applications

### Authentication Systems
Authentication systems use if-else statements extensively for login validation, password verification, and access control decisions. Conditional logic determines whether users can access resources based on credentials and permissions.

**Implementation Example:**
- Username and password validation
- Role-based access control decisions
- Session management based on authentication status
- Multi-factor authentication flow control

### E-Commerce Pricing Logic
E-commerce platforms use conditional statements for dynamic pricing, discount calculations, and tax computation. Business rules determine prices based on user type, product category, quantity, and promotional conditions.

**Implementation Example:**
- Customer type pricing (regular, premium, VIP)
- Quantity-based discounts
- Seasonal pricing adjustments
- Tax calculation based on location

### Data Validation
Applications use if-else statements for input validation, ensuring data integrity and preventing invalid operations. Validation checks data format, range, and business rules before processing.

**Implementation Example:**
- Email format validation
- Age verification for age-restricted content
- Credit limit checks before transactions
- Inventory availability checks

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Assignment (=) Instead of Comparison (==)
**Problem:** Using = instead of == always evaluates to true and assigns value.

**Solution:** Always use == for comparison:

\`\`\`java
public class AssignmentVsComparisonDemo {
    public static void main(String[] args) {
        int age = 18;

        // Wrong for int: if (age = 18) { }
        // Java does not allow int assignment as an if condition.

        if (age == 18) {
            System.out.println("Age is exactly 18");
        }
    }
}
\`\`\`

### Mistake 2: Missing Braces for Single Statements
**Problem:** Omitting braces can lead to bugs when adding code later.

**Solution:** Always use braces:

\`\`\`java
public class MissingBracesDemo {
    static void reserveStock() {
        System.out.println("Stock reserved");
    }

    public static void main(String[] args) {
        boolean paymentCompleted = true;

        if (paymentCompleted) {
            reserveStock();
        }
    }
}
\`\`\`

### Mistake 3: Deeply Nested If-Else Statements
**Problem:** Too many nested conditions make code hard to read and maintain.

**Solution:** Use early returns or switch statements:

\`\`\`java
public class EarlyReturnValidationDemo {
    static String validateOrder(boolean cartEmpty, boolean addressMissing, boolean paymentFailed) {
        if (cartEmpty) {
            return "Cart is empty";
        }
        if (addressMissing) {
            return "Address is required";
        }
        if (paymentFailed) {
            return "Payment failed";
        }

        return "Order can be placed";
    }

    public static void main(String[] args) {
        System.out.println(validateOrder(false, false, false));
    }
}
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is an if-else statement and when should I use it?

An if-else statement is a control flow construct that executes different code blocks based on boolean conditions. Use if-else when you need to make decisions in your code, validate input, implement business logic, or control program flow based on conditions. If-else statements are fundamental for building interactive, responsive applications.

### What's the difference between if, if-else, and if-else-if?

An \`if\` statement executes code only when the condition is true. An \`if-else\` statement provides an alternative path when the condition is false. An \`if-else-if\` chain allows multiple conditions to be checked sequentially, executing the first matching condition's code block.

### Can I nest if-else statements?

Yes, you can nest if-else statements (if inside if), but deep nesting should be avoided as it makes code hard to read and maintain. Consider using early returns, switch statements, or refactoring complex nested conditions into separate methods.

### What is the ternary operator and when should I use it?

The ternary operator (\`condition ? valueIfTrue : valueIfFalse\`) is a shorthand for simple if-else assignments. Use it for simple, readable assignments, but avoid it for complex logic. Ternary operators improve readability for simple conditional assignments.

### How do I check multiple conditions?

Use logical operators: \`&&\` (AND) requires both conditions true, \`||\` (OR) requires at least one true, \`!\` (NOT) negates a condition. Combine conditions appropriately based on your logic requirements.

### What's the difference between == and === in Java?

Java doesn't have === operator. Use == for primitive comparison and object reference comparison. For object content comparison, use \`.equals()\` method. String comparison should use \`.equals()\`, not ==.

### Can I use if-else without else?

Yes, if statements can exist without else blocks. Use standalone if when you only need to execute code when a condition is true, without an alternative action.

### How do I handle multiple conditions efficiently?

For multiple discrete values, use switch statements instead of long if-else-if chains. For complex boolean logic, use logical operators (&&, ||) or extract conditions into well-named boolean variables for readability.

---

## Key Takeaways

Before proceeding to other control flow statements, ensure you understand these if-else fundamentals:

- **If-else statements enable decision-making** in programs based on conditions
- **Comparison operators** (==, !=, <, >, <=, >=) evaluate conditions
- **Logical operators** (&&, ||, !) combine multiple conditions
- **Ternary operator** provides shorthand for simple conditional assignments
- **Always use braces** even for single statements to prevent bugs
- **Avoid deep nesting** by using early returns or refactoring
- **Use == for comparison**, not = (assignment)
- **String comparison** requires .equals(), not ==

---

## What's Next?

Now that you understand if-else statements, you're ready to explore other control flow constructs:

### Immediate Next Steps

1. **[Switch Statement](/corejava/switch-statement)**: Learn multi-way branching for discrete values
2. **[For Loop](/corejava/for-loop)**: Understand iteration with known count
3. **[While Loop](/corejava/while-loop)**: Learn conditional iteration
4. **[Break Continue](/corejava/break-continue)**: Master loop control statements

### Advanced Topics

- **Pattern Matching**: Modern Java pattern matching with if
- **Guard Clauses**: Early return patterns for cleaner code
- **Strategy Pattern**: Using conditionals in design patterns
- **Complex Business Logic**: Implementing sophisticated conditional logic

### Related Tutorials

- **[Java Control Flow](/tutorial/control-flow-introduction)**: Review all control flow statements
- **[Java Operators](/corejava/java-operators)**: Understand comparison and logical operators
- **[Java Basics](/corejava/java-introduction)**: Master Java fundamentals
- **[Exception Handling](/corejava/exception-introduction)**: Learn conditional error handling

If-else statements are essential for building interactive, decision-making applications. Continue learning about [Switch Statement](/corejava/switch-statement) for handling multiple discrete values efficiently.
`,
  practiceQuestions: [
    {
      question: 'Create a ticket pricing system based on age and day',
      hint: 'Different prices for children, adults, seniors, and weekends',
      starterCode: `public class TicketPricing {
    public static void main(String[] args) {
        System.out.println("=== Movie Ticket Pricing ===\\n");
        
        // Test different scenarios
        System.out.println(getTicketPrice(8, "Monday"));    // Child, weekday
        System.out.println(getTicketPrice(25, "Monday"));   // Adult, weekday
        System.out.println(getTicketPrice(65, "Monday"));   // Senior, weekday
        System.out.println(getTicketPrice(25, "Saturday")); // Adult, weekend
        System.out.println(getTicketPrice(8, "Sunday"));    // Child, weekend
    }
    
    public static String getTicketPrice(int age, String day) {
        double basePrice;
        String category;
        
        // Determine category and base price
        if (age < 12) {
            category = "Child";
            basePrice = 8.00;
        } else if (age >= 65) {
            category = "Senior";
            basePrice = 9.00;
        } else {
            category = "Adult";
            basePrice = 12.00;
        }
        
        // Weekend surcharge
        boolean isWeekend = day.equals("Saturday") || day.equals("Sunday");
        if (isWeekend) {
            basePrice += 3.00;
        }
        
        // Format result
        String dayType = isWeekend ? "Weekend" : "Weekday";
        return String.format("%s (%s, %s): $%.2f", category, day, dayType, basePrice);
    }
}`
    }
  ]
};

export default ifElse;
