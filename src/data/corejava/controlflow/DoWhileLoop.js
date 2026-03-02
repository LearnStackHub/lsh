const doWhileLoop = {
  id: 'do-while-loop',
  title: 'Do-While Loop',
  description: 'Learn about do-while loops that execute at least once',
  content: `
# Do-While Loop

Do-while loop is similar to while loop, but it guarantees that the code block executes at least once before checking the condition.

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
}`,
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
