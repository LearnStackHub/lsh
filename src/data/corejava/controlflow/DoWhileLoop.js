const doWhileLoop = {
  id: 'do-while-loop',
  title: 'Do-While Loop',
  description: 'Learn about do-while loops that execute at least once',
  content: `
# Do-While Loop - Guaranteed Execution Loop

The do-while loop is a control flow statement that executes a block of code at least once, then repeatedly executes it as long as a condition remains true. Unlike the while loop that checks the condition before execution, the do-while loop checks the condition after execution, ensuring the loop body runs at least once regardless of the initial condition value.

Do-while loops are essential for scenarios where you need guaranteed execution before condition evaluation, such as menu systems, user input validation with retry logic, and initialization sequences. Understanding do-while loops complements your knowledge of while and for loops, providing the right tool for specific iteration requirements.

## Syntax

\`\`\`java
do {
    // code to be executed
} while (condition);
\`\`\`

## Difference: While vs Do-While

| While Loop | Do-While Loop |
|------------|---------------|
| Checks condition first | Executes first, then checks |
| May not execute at all | Executes at least once |
| Entry-controlled | Exit-controlled |

---

## When to Use Do-While (Practical Scenarios)

Use a do-while loop when:\n
- the program must run the block **at least once**\n
- the condition depends on user input or an action inside the loop\n
- you are implementing menu systems, retry logic, or validation flows\n

### Diagram: While vs Do-While

\`\`\`
While loop:
  check condition -> if true run -> repeat

Do-while loop:
  run once -> check condition -> if true repeat
\`\`\`

---

## Real-World Use Case 1: User Input Validation (Registration Form)

\`\`\`java
// Form Validation System (Registration Form)
// Common in signup screens, checkout forms, profile update forms

public class FormValidation {
    public static void main(String[] args) {
        System.out.println("USER REGISTRATION FORM");
        System.out.println("==========================");
        
        // Simulated user inputs (in real app, from Scanner)
        String[] usernameAttempts = {"ab", "user@123", "john_doe"};
        String[] emailAttempts = {"invalid", "test@", "john@email.com"};
        String[] passwordAttempts = {"123", "weak", "SecurePass@123"};
        
        int attemptIndex = 0;
        boolean isValid = false;
        String validUsername = "";
        String validEmail = "";
        String validPassword = "";
        
        // Username validation - must be 3+ chars, alphanumeric
        System.out.println("\\n👤 USERNAME VALIDATION");
        System.out.println("─────────────────────");
        
        do {
            String username = usernameAttempts[attemptIndex];
            System.out.println("Input: " + username);
            
            if (username.length() < 3) {
                System.out.println("Too short (min 3 characters)");
            } else if (username.contains("@")) {
                System.out.println("Cannot contain special characters");
            } else {
                System.out.println("Username accepted!");
                validUsername = username;
                isValid = true;
            }
            attemptIndex++;
        } while (!isValid && attemptIndex < usernameAttempts.length);
        
        // Email validation
        attemptIndex = 0;
        isValid = false;
        
        System.out.println("\\n📧 EMAIL VALIDATION");
        System.out.println("───────────────────");
        
        do {
            String email = emailAttempts[attemptIndex];
            System.out.println("Input: " + email);
            
            if (!email.contains("@")) {
                System.out.println("Must contain @");
            } else if (!email.contains(".")) {
                System.out.println("Invalid email format");
            } else {
                System.out.println("Email accepted!");
                validEmail = email;
                isValid = true;
            }
            attemptIndex++;
        } while (!isValid && attemptIndex < emailAttempts.length);
        
        // Password validation
        attemptIndex = 0;
        isValid = false;
        
        System.out.println("\\n🔐 PASSWORD VALIDATION");
        System.out.println("─────────────────────");
        
        do {
            String password = passwordAttempts[attemptIndex];
            System.out.println("Input: " + password);
            
            if (password.length() < 8) {
                System.out.println("Too short (min 8 characters)");
            } else if (!password.matches(".*[A-Z].*")) {
                System.out.println("Must contain uppercase letter");
            } else if (!password.matches(".*[0-9].*")) {
                System.out.println("Must contain a number");
            } else {
                System.out.println("Password accepted!");
                validPassword = password;
                isValid = true;
            }
            attemptIndex++;
        } while (!isValid && attemptIndex < passwordAttempts.length);
        
        // Registration result
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("REGISTRATION SUCCESSFUL!");
        System.out.println("═".repeat(40));
        System.out.println("Username: " + validUsername);
        System.out.println("Email: " + validEmail);
        System.out.println("Password: ********");
    }
}
\`\`\`

---

## Real-World Use Case 2: Menu-Driven Application (Game / ATM / CLI Tool)

\`\`\`java
// Menu-driven program (common in CLI tools, ATM simulation, game menus)

public class GameMainMenu {
    public static void main(String[] args) {
        System.out.println("ADVENTURE QUEST");
        System.out.println("==================");
        
        boolean exitGame = false;
        int[] menuSelections = {3, 1, 2, 4}; // Simulated selections
        int selectionIndex = 0;
        
        // Game menu - always shows at least once
        do {
            System.out.println("\\n╔═══════════════════════╗");
            System.out.println("║     MAIN MENU         ║");
            System.out.println("╠═══════════════════════╣");
            System.out.println("║ 1. New Game           ║");
            System.out.println("║ 2. Load Game          ║");
            System.out.println("║ 3. Settings           ║");
            System.out.println("║ 4. Exit               ║");
            System.out.println("╚═══════════════════════╝");
            
            int choice = menuSelections[selectionIndex];
            selectionIndex++;
            
            System.out.println("Selection: " + choice);
            
            switch (choice) {
                case 1:
                    System.out.println("\\nStarting New Game...");
                    System.out.println("   Creating character...");
                    System.out.println("   Loading world...");
                    System.out.println("   [Game Started]");
                    break;
                    
                case 2:
                    System.out.println("\\nLoading Saved Game...");
                    System.out.println("   Save 1: Level 45 - 80% complete");
                    System.out.println("   Save 2: Level 23 - 45% complete");
                    System.out.println("   [Game Loaded]");
                    break;
                    
                case 3:
                    System.out.println("\\nSettings");
                    System.out.println("   Sound: ON");
                    System.out.println("   Music: ON");
                    System.out.println("   Graphics: HIGH");
                    System.out.println("   [Settings Saved]");
                    break;
                    
                case 4:
                    System.out.println("\\nThanks for playing!");
                    exitGame = true;
                    break;
                    
                default:
                    System.out.println("Invalid option!");
            }
            
        } while (!exitGame && selectionIndex < menuSelections.length);
        
        System.out.println("\\nGame Closed.");
    }
}
\`\`\`

---

## Real-World Use Case 3: Retry/Confirmation Loop (Checkout / OTP / Payment)

Do-while is useful when you must attempt an operation at least once and then decide whether to retry based on result.

\`\`\`java
// Checkout confirmation / retry loop (simplified)
// Used in e-commerce checkout flows

public class CheckoutProcess {
    public static void main(String[] args) {
        System.out.println("🛒 CHECKOUT PROCESS");
        System.out.println("====================");
        
        // Cart items
        double cartTotal = 299.99;
        boolean checkoutComplete = false;
        int step = 1;
        
        // Checkout steps - must go through at least once
        do {
            System.out.println("\\n" + "─".repeat(40));
            System.out.println("📍 STEP " + step + " of 4");
            System.out.println("─".repeat(40));
            
            switch (step) {
                case 1: // Review Cart
                    System.out.println("\\n🛍️ REVIEW YOUR CART");
                    System.out.println("   Items: 3");
                    System.out.println("   Subtotal: $" + cartTotal);
                    System.out.println("   Cart confirmed");
                    step++;
                    break;
                    
                case 2: // Shipping Address
                    System.out.println("\\n📍 SHIPPING ADDRESS");
                    System.out.println("   John Smith");
                    System.out.println("   123 Main Street");
                    System.out.println("   New York, NY 10001");
                    System.out.println("   Address verified");
                    step++;
                    break;
                    
                case 3: // Payment
                    System.out.println("\\n💳 PAYMENT METHOD");
                    System.out.println("   Card: **** **** **** 1234");
                    System.out.println("   Processing payment...");
                    System.out.println("   Payment successful!");
                    step++;
                    break;
                    
                case 4: // Confirmation
                    System.out.println("\\nORDER CONFIRMED!");
                    System.out.println("   Order #: ORD-" + System.currentTimeMillis());
                    System.out.println("   Total: $" + cartTotal);
                    System.out.println("   Delivery: 3-5 business days");
                    checkoutComplete = true;
                    break;
            }
            
        } while (!checkoutComplete);
        
        System.out.println("\\n🎉 Thank you for your order!");
    }
}
\`\`\`

> **Industry Insight**: Do-while loops are perfect for menu systems and input validation where you need to show options or prompt at least once. Payment gateways use do-while for retry mechanisms when transactions fail.
`,
  code: `// Real-Time: Complete User Registration with Validation
// Multi-step form validation using do-while

public class UserRegistration {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║      📝 USER REGISTRATION SYSTEM       ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        // Simulated user inputs for each field
        String[] usernameInputs = {"ab", "user@name", "john_doe123"};
        String[] emailInputs = {"invalid", "test@", "john.doe@email.com"};
        String[] passwordInputs = {"123", "password", "SecureP@ss123"};
        String[] phoneInputs = {"123", "12345", "1234567890"};
        
        // Validation results
        String validUsername = "";
        String validEmail = "";
        String validPassword = "";
        String validPhone = "";
        
        int attempts;
        boolean isValid;
        
        // ═══════════════════════════════════════
        // STEP 1: Username Validation
        // ═══════════════════════════════════════
        System.out.println("\\n📋 STEP 1: Username");
        System.out.println("────────────────────");
        System.out.println("Requirements: 3-20 chars, alphanumeric, underscore allowed");
        
        attempts = 0;
        isValid = false;
        
        do {
            String username = usernameInputs[attempts];
            System.out.println("\\nAttempt " + (attempts + 1) + ": \\"" + username + "\\"");
            
            if (username.length() < 3) {
                System.out.println("   Too short (minimum 3 characters)");
            } else if (username.length() > 20) {
                System.out.println("   Too long (maximum 20 characters)");
            } else if (!username.matches("^[a-zA-Z0-9_]+$")) {
                System.out.println("   Invalid characters (only letters, numbers, underscore)");
            } else {
                System.out.println("   Username accepted!");
                validUsername = username;
                isValid = true;
            }
            attempts++;
        } while (!isValid && attempts < usernameInputs.length);
        
        // ═══════════════════════════════════════
        // STEP 2: Email Validation
        // ═══════════════════════════════════════
        System.out.println("\\n📋 STEP 2: Email Address");
        System.out.println("────────────────────────");
        System.out.println("Requirements: Valid email format (user@domain.com)");
        
        attempts = 0;
        isValid = false;
        
        do {
            String email = emailInputs[attempts];
            System.out.println("\\nAttempt " + (attempts + 1) + ": \\"" + email + "\\"");
            
            if (!email.contains("@")) {
                System.out.println("   Missing @ symbol");
            } else if (!email.contains(".")) {
                System.out.println("   Missing domain extension");
            } else if (email.indexOf("@") > email.lastIndexOf(".")) {
                System.out.println("   Invalid format");
            } else {
                System.out.println("   Email accepted!");
                validEmail = email;
                isValid = true;
            }
            attempts++;
        } while (!isValid && attempts < emailInputs.length);
        
        // ═══════════════════════════════════════
        // STEP 3: Password Validation
        // ═══════════════════════════════════════
        System.out.println("\\n📋 STEP 3: Password");
        System.out.println("───────────────────");
        System.out.println("Requirements: 8+ chars, uppercase, lowercase, number, special char");
        
        attempts = 0;
        isValid = false;
        
        do {
            String password = passwordInputs[attempts];
            System.out.println("\\nAttempt " + (attempts + 1) + ": \\"" + password + "\\"");
            
            // Password strength checks
            boolean hasLength = password.length() >= 8;
            boolean hasUpper = password.matches(".*[A-Z].*");
            boolean hasLower = password.matches(".*[a-z].*");
            boolean hasDigit = password.matches(".*[0-9].*");
            boolean hasSpecial = password.matches(".*[!@#$%^&*].*");
            
            System.out.println("   Strength Check:");
            System.out.println("   " + (hasLength ? "Yes" : "No") + " Minimum 8 characters");
            System.out.println("   " + (hasUpper ? "Yes" : "No") + " Uppercase letter");
            System.out.println("   " + (hasLower ? "Yes" : "No") + " Lowercase letter");
            System.out.println("   " + (hasDigit ? "Yes" : "No") + " Number");
            System.out.println("   " + (hasSpecial ? "Yes" : "No") + " Special character");
            
            if (hasLength && hasUpper && hasLower && hasDigit && hasSpecial) {
                System.out.println("   Password accepted! (Strong)");
                validPassword = password;
                isValid = true;
            } else if (hasLength && hasUpper && hasDigit) {
                System.out.println("   ⚠️ Password weak but accepted");
                validPassword = password;
                isValid = true;
            } else {
                System.out.println("   Password too weak");
            }
            attempts++;
        } while (!isValid && attempts < passwordInputs.length);
        
        // ═══════════════════════════════════════
        // STEP 4: Phone Validation
        // ═══════════════════════════════════════
        System.out.println("\\n📋 STEP 4: Phone Number");
        System.out.println("───────────────────────");
        System.out.println("Requirements: 10 digits");
        
        attempts = 0;
        isValid = false;
        
        do {
            String phone = phoneInputs[attempts];
            System.out.println("\\nAttempt " + (attempts + 1) + ": \\"" + phone + "\\"");
            
            if (phone.length() != 10) {
                System.out.println("   Must be exactly 10 digits");
            } else if (!phone.matches("^[0-9]+$")) {
                System.out.println("   Must contain only numbers");
            } else {
                System.out.println("   Phone number accepted!");
                validPhone = phone;
                isValid = true;
            }
            attempts++;
        } while (!isValid && attempts < phoneInputs.length);
        
        // ═══════════════════════════════════════
        // REGISTRATION COMPLETE
        // ═══════════════════════════════════════
        System.out.println("\\n╔════════════════════════════════════════╗");
        System.out.println("║     REGISTRATION SUCCESSFUL!        ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("\\n📋 Account Details:");
        System.out.println("────────────────────");
        System.out.println("Username: " + validUsername);
        System.out.println("Email:    " + validEmail);
        System.out.println("Password: " + "*".repeat(validPassword.length()));
        System.out.println("Phone:    " + validPhone.substring(0, 3) + "-" + 
                          validPhone.substring(3, 6) + "-" + validPhone.substring(6));
        
        System.out.println("\\n📧 Verification email sent to: " + validEmail);
        System.out.println("🎉 Welcome to our platform!");
    }
}

---

## Real-World Applications

### Menu Systems
Menu-driven applications use do-while loops to display menus and process user selections until the user chooses to exit. The menu must display at least once, making do-while ideal for this scenario.

**Implementation Example:**
- ATM menu systems that show options until user exits
- Game menus that display until user quits
- Configuration wizards that guide users through setup
- Interactive command-line tools

### Input Validation with Retry
Applications use do-while loops for input validation where the user must provide valid input. The validation prompt appears at least once, and continues until valid input is received.

**Implementation Example:**
- PIN entry systems with retry limits
- Form validation that re-prompts until valid
- File selection that continues until valid file chosen
- Configuration that validates until correct

### Initialization Sequences
Systems use do-while loops for initialization processes that must run at least once, then continue based on conditions. This ensures initialization always occurs before condition checking.

**Implementation Example:**
- System startup sequences
- Database connection retry logic
- Service initialization with health checks
- Resource allocation that must attempt at least once

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Do-While When While is Better
**Problem:** Using do-while when the loop might not need to execute at all.

**Solution:** Use while when execution might not be needed:

\`\`\`java
// PREFER - While when might not execute
while (hasData()) {
    processData();
}

// AVOID - Do-while forces execution
do {
    processData();
} while (hasData());  // Executes even if hasData() is false initially
\`\`\`

### Mistake 2: Forgetting Semicolon After While
**Problem:** Missing semicolon after while condition causes compilation error.

**Solution:** Always include semicolon:

\`\`\`java
// CORRECT
do {
    // code
} while (condition);  // Semicolon required!

// WRONG
do {
    // code
} while (condition)  // Missing semicolon!
\`\`\`

### Mistake 3: Infinite Loops
**Problem:** Condition that never becomes false causes infinite loop.

**Solution:** Ensure condition will eventually become false:

\`\`\`java
// WRONG - Infinite if user never enters "exit"
String input;
do {
    input = readInput();
    process(input);
} while (!input.equals("exit"));  // What if input is null?

// CORRECT - Handle null and provide exit mechanism
String input;
do {
    input = readInput();
    if (input != null) {
        process(input);
    }
} while (input == null || !input.equals("exit"));
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a do-while loop and when should I use it?

A do-while loop executes a block of code at least once, then repeatedly executes it as long as a condition is true. Use do-while when you need guaranteed execution before condition checking, such as menu systems, input validation with retry, and initialization sequences that must run at least once.

### What's the difference between while and do-while?

A while loop checks the condition before execution, so it may not execute at all. A do-while loop executes at least once and checks the condition after execution. Use while when execution might not be needed, do-while when you need guaranteed execution. Learn about [While Loop](/tutorial/while-loop) for comparison.

### Can I use break and continue in do-while loops?

Yes, both \`break\` and \`continue\` work in do-while loops. \`break\` exits the loop immediately, while \`continue\` skips the rest of the current iteration and proceeds to check the condition again. These are useful for early termination and skipping iterations. Learn about [Break Continue](/tutorial/break-continue) for detailed usage.

### Why do I need a semicolon after while in do-while?

The semicolon after the while condition in do-while is required by Java syntax. It distinguishes the do-while statement from a regular while statement. Without the semicolon, the code will not compile.

### When should I use do-while instead of while?

Use do-while when: (1) the loop must execute at least once, (2) the condition depends on actions inside the loop, (3) you're implementing menu systems, (4) you need input validation with retry logic. Use while when execution might not be needed.

### Can I nest do-while loops?

Yes, you can nest do-while loops (do-while inside do-while), but be careful with readability and performance. Nested loops can be complex to understand and may have performance implications. Consider refactoring if nesting becomes too deep.

### How do I avoid infinite loops in do-while?

Avoid infinite loops by: (1) ensuring the condition will eventually become false, (2) updating variables that affect the condition inside the loop, (3) using break statements for early termination, (4) handling edge cases like null values, and (5) testing with known termination conditions.

### What happens if the condition is false initially in do-while?

In a do-while loop, even if the condition is false initially, the loop body executes once before checking the condition. This is the key difference from while loops - do-while guarantees at least one execution.

### Can I use do-while for file processing?

Yes, do-while can be used for file processing, but it's typically better to use while loops with proper condition checking. Do-while is useful when you need to read at least one line or process at least one record before checking for end-of-file conditions.

### How do do-while loops relate to user input validation?

Do-while loops are ideal for user input validation because they ensure the validation prompt appears at least once and continues until valid input is received. This provides a better user experience than while loops that might not prompt at all.

---

## Key Takeaways

Before proceeding to other control flow statements, ensure you understand these do-while loop fundamentals:

- **Do-while loops guarantee execution** at least once before condition checking
- **Use do-while** when loop must execute at least once
- **Semicolon is required** after while condition in do-while
- **Condition is checked after** execution, not before
- **break and continue** work in do-while loops
- **Avoid infinite loops** by ensuring condition becomes false
- **Do-while is ideal** for menu systems and input validation
- **While vs do-while** choice depends on whether execution is required

---

## What's Next?

Now that you understand do-while loops, you're ready to explore related control flow statements:

### Immediate Next Steps

1. **[While Loop](/tutorial/while-loop)**: Learn condition-checked loops
2. **[For Loop](/tutorial/for-loop)**: Understand iteration with known count
3. **[If-Else Statements](/tutorial/if-else)**: Master conditional execution
4. **[Switch Statement](/tutorial/switch-statement)**: Learn multi-way branching

### Advanced Topics

- **Loop Optimization**: Learn techniques for improving loop performance
- **Nested Loops**: Master complex loop structures
- **Loop Patterns**: Common patterns in loop usage
- **Performance Considerations**: Optimizing loop performance

### Related Tutorials

- **[Java Control Flow](/tutorial/control-flow-introduction)**: Review all control flow statements
- **[Java Basics](/tutorial/java-introduction)**: Master Java fundamentals
- **[Exception Handling](/tutorial/exception-introduction)**: Handle errors in loops
- **[User Input](/tutorial/user-input)**: Process user input with loops

Do-while loops are essential for scenarios requiring guaranteed execution. Continue learning about [Switch Statement](/tutorial/switch-statement) for handling multiple discrete values efficiently.
`,
  practiceQuestions: [
    {
      question: 'Create a PIN Change System that validates old PIN and confirms new PIN',
      hint: 'Use do-while to keep asking until correct old PIN, then validate new PIN matches confirmation',
      starterCode: `public class PINChange {
    public static void main(String[] args) {
        int currentPIN = 1234;
        
        // Step 1: Verify old PIN (do-while)
        // Step 2: Enter new PIN
        // Step 3: Confirm new PIN (do-while until match)
        // Display success message
    }
}`
    }
  ]
};

export default doWhileLoop;
