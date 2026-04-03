const switchStatement = {
  id: 'switch-statement',
  title: 'Switch Statement',
  description: 'Learn how to use switch statements for multiple condition handling',
  content: `
# Switch Statement - Multi-Way Branching

The switch statement is a control flow construct that enables multi-way branching based on the value of a single expression. Switch statements provide a cleaner, more readable alternative to long chains of if-else-if statements when dealing with discrete values. Switch statements are particularly efficient for handling multiple possible values of a variable, making code more maintainable and easier to understand.

Enterprise applications use switch statements extensively for routing logic, state machines, command processing, menu systems, and handling enumerated values. Modern Java (14+) introduced switch expressions that return values, making switch statements even more powerful and concise. Understanding switch statements is essential for writing efficient, readable conditional logic.

## Syntax

\`\`\`java
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // default code
}
\`\`\`

## Switch Expression (Java 14+)

\`\`\`java
String result = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
\`\`\`

## 🏢 Real-Time Project Example: Payment Gateway Router

\`\`\`java
// Real-Time: Payment Processing System
// Used in Stripe, PayPal, Razorpay

public class PaymentGateway {
    public static void main(String[] args) {
        System.out.println("💳 Payment Gateway Router");
        System.out.println("=========================");
        
        // Payment details
        String paymentMethod = "CREDIT_CARD";
        double amount = 1500.00;
        String currency = "USD";
        String cardNetwork = "VISA";
        
        System.out.println("\\n📋 Transaction Details:");
        System.out.println("Amount: " + currency + " " + amount);
        System.out.println("Method: " + paymentMethod);
        
        System.out.println("\\n🔄 Processing Payment...");
        
        double processingFee = 0;
        String processor = "";
        String status = "";
        int estimatedTime = 0;
        
        switch (paymentMethod) {
            case "CREDIT_CARD":
                processingFee = amount * 0.029 + 0.30; // 2.9% + $0.30
                estimatedTime = 2;
                
                // Nested switch for card network
                switch (cardNetwork) {
                    case "VISA":
                        processor = "Visa Direct";
                        System.out.println("   → Routing to Visa Direct");
                        break;
                    case "MASTERCARD":
                        processor = "Mastercard Gateway";
                        System.out.println("   → Routing to Mastercard Gateway");
                        break;
                    case "AMEX":
                        processor = "American Express";
                        processingFee = amount * 0.035 + 0.30; // Higher fee
                        System.out.println("   → Routing to Amex (premium fee)");
                        break;
                    default:
                        processor = "Generic Card Processor";
                        System.out.println("   → Routing to Generic Processor");
                }
                status = "APPROVED";
                break;
                
            case "DEBIT_CARD":
                processingFee = amount * 0.015 + 0.25; // Lower fee
                processor = "Debit Network";
                estimatedTime = 1;
                status = "APPROVED";
                System.out.println("   → Processing via Debit Network");
                break;
                
            case "UPI":
                processingFee = 0; // No fee for UPI
                processor = "NPCI UPI";
                estimatedTime = 1;
                status = "APPROVED";
                System.out.println("   → Processing via NPCI UPI");
                break;
                
            case "NET_BANKING":
                processingFee = amount * 0.01; // 1%
                processor = "Bank Gateway";
                estimatedTime = 3;
                status = "PENDING";
                System.out.println("   → Redirecting to Bank Gateway");
                break;
                
            case "WALLET":
                processingFee = 0;
                processor = "Digital Wallet";
                estimatedTime = 1;
                status = "APPROVED";
                System.out.println("   → Processing via Digital Wallet");
                break;
                
            case "CRYPTO":
                processingFee = amount * 0.01;
                processor = "Crypto Gateway";
                estimatedTime = 10;
                status = "PENDING_CONFIRMATION";
                System.out.println("   → Processing via Blockchain");
                break;
                
            case "COD":
                processingFee = 50.00; // Flat fee
                processor = "Cash Collection";
                estimatedTime = 0;
                status = "PENDING_DELIVERY";
                System.out.println("   → Cash on Delivery selected");
                break;
                
            default:
                status = "FAILED";
                System.out.println("   Invalid payment method!");
        }
        
        if (!status.equals("FAILED")) {
            double netAmount = amount - processingFee;
            
            System.out.println("\\nPAYMENT PROCESSED");
            System.out.println("====================");
            System.out.println("Processor: " + processor);
            System.out.println("Status: " + status);
            System.out.println("Amount: $" + String.format("%.2f", amount));
            System.out.println("Fee: $" + String.format("%.2f", processingFee));
            System.out.println("Net: $" + String.format("%.2f", netAmount));
            System.out.println("Est. Time: " + estimatedTime + " seconds");
        }
    }
}
\`\`\`

## 🛒 Real-Time Project Example: Order Status Tracker

\`\`\`java
// Real-Time: Order Tracking System
// Used in Amazon, FedEx, DHL tracking

public class OrderTracker {
    public static void main(String[] args) {
        System.out.println("📦 Order Tracking System");
        System.out.println("========================");
        
        String orderId = "ORD-2024-78901";
        String currentStatus = "SHIPPED";
        
        System.out.println("\\nOrder ID: " + orderId);
        System.out.println("\\n📍 Tracking Status:");
        
        String statusMessage = "";
        String nextStep = "";
        int progressPercent = 0;
        String estimatedDelivery = "";
        
        switch (currentStatus) {
            case "PLACED":
                statusMessage = "Order has been placed";
                nextStep = "Waiting for seller confirmation";
                progressPercent = 10;
                estimatedDelivery = "5-7 business days";
                System.out.println("   [●○○○○○○○○○] 10%");
                break;
                
            case "CONFIRMED":
                statusMessage = "Order confirmed by seller";
                nextStep = "Preparing for shipment";
                progressPercent = 20;
                estimatedDelivery = "4-6 business days";
                System.out.println("   [●●○○○○○○○○] 20%");
                break;
                
            case "PROCESSING":
                statusMessage = "Order is being processed";
                nextStep = "Packing items";
                progressPercent = 30;
                estimatedDelivery = "4-5 business days";
                System.out.println("   [●●●○○○○○○○] 30%");
                break;
                
            case "PACKED":
                statusMessage = "Order has been packed";
                nextStep = "Ready for pickup by courier";
                progressPercent = 40;
                estimatedDelivery = "3-4 business days";
                System.out.println("   [●●●●○○○○○○] 40%");
                break;
                
            case "SHIPPED":
                statusMessage = "Order has been shipped";
                nextStep = "In transit to your city";
                progressPercent = 60;
                estimatedDelivery = "2-3 business days";
                System.out.println("   [●●●●●●○○○○] 60%");
                break;
                
            case "IN_TRANSIT":
                statusMessage = "Package is in transit";
                nextStep = "Arriving at local facility";
                progressPercent = 70;
                estimatedDelivery = "1-2 business days";
                System.out.println("   [●●●●●●●○○○] 70%");
                break;
                
            case "OUT_FOR_DELIVERY":
                statusMessage = "Out for delivery";
                nextStep = "Will be delivered today";
                progressPercent = 90;
                estimatedDelivery = "Today";
                System.out.println("   [●●●●●●●●●○] 90%");
                break;
                
            case "DELIVERED":
                statusMessage = "Package delivered!";
                nextStep = "Thank you for shopping!";
                progressPercent = 100;
                estimatedDelivery = "Completed";
                System.out.println("   [●●●●●●●●●●] 100%");
                break;
                
            case "CANCELLED":
                statusMessage = "Order has been cancelled";
                nextStep = "Refund will be processed";
                progressPercent = 0;
                estimatedDelivery = "N/A";
                System.out.println("   [CANCELLED]");
                break;
                
            case "RETURNED":
                statusMessage = "Return initiated";
                nextStep = "Pickup scheduled";
                progressPercent = 0;
                estimatedDelivery = "Refund in 5-7 days";
                System.out.println("   [RETURN IN PROGRESS]");
                break;
                
            default:
                statusMessage = "Status unknown";
                nextStep = "Contact support";
        }
        
        System.out.println("\\n📋 Status: " + statusMessage);
        System.out.println("📌 Next: " + nextStep);
        System.out.println("📅 Estimated: " + estimatedDelivery);
    }
}
\`\`\`

## 🎮 Real-Time Project Example: Game Menu System

\`\`\`java
// Real-Time: Game Menu Handler
// Used in mobile and console games

public class GameMenu {
    public static void main(String[] args) {
        System.out.println("🎮 ADVENTURE QUEST - MAIN MENU");
        System.out.println("==============================");
        
        int menuChoice = 2;
        String playerName = "Hero123";
        int playerLevel = 45;
        int gold = 15000;
        
        System.out.println("\\nWelcome, " + playerName + "!");
        System.out.println("Level: " + playerLevel + " | Gold: " + gold);
        System.out.println("\\nSelect Option: " + menuChoice);
        
        switch (menuChoice) {
            case 1:
                System.out.println("\\n⚔️ STARTING NEW GAME...");
                System.out.println("   Creating character...");
                System.out.println("   Loading world...");
                System.out.println("   Ready to play!");
                break;
                
            case 2:
                System.out.println("\\n📂 LOADING SAVED GAME...");
                System.out.println("   Save file found!");
                System.out.println("   Progress: Chapter 5");
                System.out.println("   Last played: 2 days ago");
                System.out.println("   Resuming adventure...");
                break;
                
            case 3:
                System.out.println("\\n⚙️ SETTINGS");
                System.out.println("   1. Graphics: High");
                System.out.println("   2. Sound: ON");
                System.out.println("   3. Controls: Default");
                System.out.println("   4. Language: English");
                break;
                
            case 4:
                System.out.println("\\n🏪 ITEM SHOP");
                System.out.println("   Your Gold: " + gold);
                System.out.println("   ─────────────────");
                System.out.println("   1. Health Potion - 100g");
                System.out.println("   2. Magic Sword - 5000g");
                System.out.println("   3. Shield - 3000g");
                break;
                
            case 5:
                System.out.println("\\n🏆 ACHIEVEMENTS");
                System.out.println("   Unlocked: 25/50");
                System.out.println("   First Victory");
                System.out.println("   Dragon Slayer");
                System.out.println("   ○ Complete All Quests");
                break;
                
            case 6:
                System.out.println("\\n👋 EXITING GAME...");
                System.out.println("   Saving progress...");
                System.out.println("   See you next time!");
                break;
                
            default:
                System.out.println("\\nInvalid option!");
                System.out.println("   Please select 1-6");
        }
    }
}
\`\`\`

> **Industry Insight**: Switch statements are heavily used in state machines, menu systems, and protocol handlers. Netflix uses switch-based routing for their streaming quality selection based on network conditions.

---

## 10 Important switch Interview Questions

### 1. What types can switch use (classic vs modern Java)?
**Answer:** Historically integral types, enums, strings (Java 7+); pattern matching for types and sealed hierarchies evolves in newer versions.
Know your team’s JDK for which switch features are allowed.

### 2. Why is \`break\` important in switch cases?
**Answer:** Without \`break\`, execution falls through to the next case—sometimes intentional, often a bug.
Use comments when fall-through is deliberate.

### 3. What does \`default\` do?
**Answer:** Catches values not matched by cases—good for defensive handling or “impossible” states that log errors.
Some style guides require \`default\` even if empty.

### 4. How does switch on \`String\` work at compile time?
**Answer:** Compiler translates to hash-based dispatch with equals checks—roughly similar to if-else chain but cleaner.
Null \`String\` throws \`NullPointerException\` before matching.

### 5. What is exhaustive switch with enums or sealed types?
**Answer:** Compiler can require all variants covered—reduces missing cases when new enum values appear.
Team process must update switches when enums grow.

### 6. Scenario: routing HTTP methods or event types—why prefer switch?
**Answer:** Clear mapping from discrete constants to handlers; pairs well with enums.
Avoid giant switches that should be polymorphic handlers.

### 7. When is polymorphism better than switch?
**Answer:** When many cases share structure or new types are added frequently—Open/Closed principle.
Switch suits stable, finite sets.

### 8. What is the arrow syntax (\`case X ->\`) in modern switch?
**Answer:** No fall-through by default; can yield values as expressions—reduces boilerplate.
Improves readability for multi-case logic.

### 9. Can you declare variables in case blocks?
**Answer:** Yes, but brace scopes to avoid name clashes between cases in classic switch.
Arrow syntax often avoids brace noise.

### 10. What exception risks exist with switch on boxed types?
**Answer:** Unboxing null throws \`NullPointerException\`; ensure nullable values are handled before switch.
Validate inputs at system boundaries.

`,
  code: `// Real-Time: Complete Payment Gateway System
// Production-grade payment routing

public class PaymentGateway {
    public static void main(String[] args) {
        System.out.println("💳 PAYMENT GATEWAY SYSTEM");
        System.out.println("=========================");
        
        // Transaction Details
        String transactionId = "TXN-" + System.currentTimeMillis();
        String paymentMethod = "CREDIT_CARD";
        String cardNetwork = "VISA";
        double amount = 2500.00;
        String currency = "USD";
        String country = "USA";
        
        // Customer Details
        String customerId = "CUST-12345";
        boolean isVerified = true;
        String riskLevel = "LOW"; // LOW, MEDIUM, HIGH
        
        System.out.println("\\n📋 TRANSACTION DETAILS");
        System.out.println("──────────────────────");
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Customer: " + customerId);
        System.out.println("Amount: " + currency + " " + String.format("%,.2f", amount));
        System.out.println("Method: " + paymentMethod);
        
        // Initialize variables
        double processingFee = 0;
        double platformFee = 0;
        String processor = "";
        String status = "";
        String statusCode = "";
        int settlementDays = 0;
        boolean requiresVerification = false;
        
        System.out.println("\\n🔄 ROUTING PAYMENT...");
        System.out.println("────────────────────");
        
        // Main payment method switch
        switch (paymentMethod) {
            case "CREDIT_CARD":
                System.out.println("→ Credit Card Payment");
                
                // Card network routing
                switch (cardNetwork) {
                    case "VISA":
                        processor = "Visa Direct API";
                        processingFee = amount * 0.029 + 0.30;
                        settlementDays = 2;
                        System.out.println("  → Network: Visa");
                        System.out.println("  → Processor: " + processor);
                        break;
                        
                    case "MASTERCARD":
                        processor = "Mastercard Gateway";
                        processingFee = amount * 0.029 + 0.30;
                        settlementDays = 2;
                        System.out.println("  → Network: Mastercard");
                        System.out.println("  → Processor: " + processor);
                        break;
                        
                    case "AMEX":
                        processor = "American Express";
                        processingFee = amount * 0.035 + 0.30;
                        settlementDays = 3;
                        System.out.println("  → Network: Amex (Premium)");
                        System.out.println("  → Processor: " + processor);
                        break;
                        
                    case "DISCOVER":
                        processor = "Discover Network";
                        processingFee = amount * 0.029 + 0.30;
                        settlementDays = 2;
                        System.out.println("  → Network: Discover");
                        System.out.println("  → Processor: " + processor);
                        break;
                        
                    default:
                        processor = "Generic Card Processor";
                        processingFee = amount * 0.032 + 0.35;
                        settlementDays = 3;
                        System.out.println("  → Network: Unknown");
                        System.out.println("  → Processor: " + processor);
                }
                
                // 3D Secure check based on amount
                if (amount > 1000) {
                    requiresVerification = true;
                    System.out.println("  → 3D Secure: Required");
                }
                
                status = "APPROVED";
                statusCode = "00";
                break;
                
            case "DEBIT_CARD":
                processor = "Debit Network Gateway";
                processingFee = amount * 0.015 + 0.22;
                settlementDays = 1;
                status = "APPROVED";
                statusCode = "00";
                System.out.println("→ Debit Card Payment");
                System.out.println("  → Processor: " + processor);
                System.out.println("  → PIN Verification: Required");
                break;
                
            case "UPI":
                processor = "NPCI UPI Gateway";
                processingFee = 0;
                platformFee = 2.00; // Flat platform fee
                settlementDays = 0; // Instant
                status = "APPROVED";
                statusCode = "00";
                System.out.println("→ UPI Payment");
                System.out.println("  → Processor: " + processor);
                System.out.println("  → Settlement: Instant");
                break;
                
            case "NET_BANKING":
                processor = "Bank Aggregator";
                processingFee = amount * 0.018;
                settlementDays = 2;
                status = "PENDING";
                statusCode = "09";
                System.out.println("→ Net Banking Payment");
                System.out.println("  → Processor: " + processor);
                System.out.println("  → Redirect: Bank Portal");
                break;
                
            case "WALLET":
                processor = "Digital Wallet API";
                processingFee = amount * 0.02;
                settlementDays = 1;
                status = "APPROVED";
                statusCode = "00";
                System.out.println("→ Wallet Payment");
                System.out.println("  → Processor: " + processor);
                break;
                
            case "BNPL": // Buy Now Pay Later
                processor = "BNPL Provider";
                processingFee = amount * 0.06;
                settlementDays = 1;
                status = "APPROVED";
                statusCode = "00";
                System.out.println("→ Buy Now Pay Later");
                System.out.println("  → Processor: " + processor);
                System.out.println("  → Installments: 3 months");
                break;
                
            case "CRYPTO":
                processor = "Blockchain Gateway";
                processingFee = amount * 0.01;
                settlementDays = 0;
                status = "PENDING_CONFIRMATION";
                statusCode = "P1";
                System.out.println("→ Cryptocurrency Payment");
                System.out.println("  → Processor: " + processor);
                System.out.println("  → Confirmations: Waiting...");
                break;
                
            case "BANK_TRANSFER":
                processor = "ACH/Wire Transfer";
                processingFee = 25.00; // Flat fee
                settlementDays = 3;
                status = "PENDING";
                statusCode = "09";
                System.out.println("→ Bank Transfer");
                System.out.println("  → Processor: " + processor);
                break;
                
            default:
                status = "FAILED";
                statusCode = "14";
                System.out.println("→ Invalid Payment Method!");
        }
        
        // Risk assessment
        System.out.println("\\n🔒 RISK ASSESSMENT");
        System.out.println("──────────────────");
        
        switch (riskLevel) {
            case "LOW":
                System.out.println("Risk Level: LOW");
                System.out.println("Action: Auto-approve");
                break;
            case "MEDIUM":
                System.out.println("Risk Level: MEDIUM ⚠️");
                System.out.println("Action: Additional verification");
                requiresVerification = true;
                break;
            case "HIGH":
                System.out.println("Risk Level: HIGH 🚨");
                System.out.println("Action: Manual review required");
                status = "UNDER_REVIEW";
                statusCode = "R1";
                break;
            default:
                System.out.println("Risk Level: Unknown");
        }
        
        // Calculate final amounts
        double totalFees = processingFee + platformFee;
        double netAmount = amount - totalFees;
        
        // Transaction Result
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("📊 TRANSACTION RESULT");
        System.out.println("═".repeat(40));
        System.out.println("Status: " + status + " (" + statusCode + ")");
        System.out.println("Processor: " + processor);
        System.out.println("\\n💰 FINANCIAL SUMMARY");
        System.out.println("────────────────────");
        System.out.println("Gross Amount:    $" + String.format("%,.2f", amount));
        System.out.println("Processing Fee:  $" + String.format("%,.2f", processingFee));
        if (platformFee > 0) {
            System.out.println("Platform Fee:    $" + String.format("%,.2f", platformFee));
        }
        System.out.println("────────────────────");
        System.out.println("Net Amount:      $" + String.format("%,.2f", netAmount));
        System.out.println("\\n📅 Settlement: " + settlementDays + " business day(s)");
        
        if (requiresVerification) {
            System.out.println("\\n⚠️ Additional verification required");
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Restaurant Order System with menu categories and customizations',
      hint: 'Use switch for menu categories (appetizers, mains, desserts) and nested switch for customizations',
      starterCode: `public class RestaurantOrder {
    public static void main(String[] args) {
        String category = "MAIN_COURSE";
        String item = "BURGER";
        String size = "LARGE";
        
        // Use switch to handle menu categories
        // Nested switch for item customizations
        // Calculate price based on selections
    }
}`
    }
  ]
};

export default switchStatement;
