const whileLoop = {
  id: 'while-loop',
  title: 'While Loop',
  description: 'Learn how to use while loops for conditional iteration',
  content: `
# While Loop - Conditional Iteration

The while loop is a control flow statement that repeatedly executes a block of code as long as a specified condition evaluates to true. Unlike for loops that iterate a predetermined number of times, while loops are ideal for situations where the number of iterations depends on runtime conditions or user input. While loops provide flexibility for processing data streams, handling user interactions, and implementing algorithms with dynamic termination conditions.

Enterprise applications use while loops for processing data streams, handling user input validation, implementing retry logic, processing queues, and managing long-running operations. Understanding while loops is essential for building interactive applications, processing dynamic data, and implementing algorithms that require conditional repetition.

## Syntax

\`\`\`java
while (condition) {
    // code to be executed
}
\`\`\`

## When to Use While Loop

| Scenario | Example |
|----------|---------|
| Unknown iterations | Reading file until EOF |
| User input validation | Keep asking until valid |
| Game loops | Run until game over |
| Server processes | Listen for connections |

## 🏢 Real-Time Project Example: ATM Machine Simulation

\`\`\`java
// Real-Time: ATM Banking System
// Used in actual ATM software

public class ATMMachine {
    public static void main(String[] args) {
        System.out.println("🏧 WELCOME TO SECURE BANK ATM");
        System.out.println("==============================");
        
        // Account setup
        double balance = 5000.00;
        int pin = 1234;
        int maxAttempts = 3;
        int attempts = 0;
        boolean authenticated = false;
        boolean sessionActive = true;
        
        // PIN verification with while loop
        System.out.println("\\n🔐 PIN VERIFICATION");
        int enteredPin = 1234; // Simulated input
        
        while (attempts < maxAttempts && !authenticated) {
            attempts++;
            
            if (enteredPin == pin) {
                authenticated = true;
                System.out.println("PIN Verified Successfully!");
            } else {
                System.out.println("Incorrect PIN. Attempts: " + attempts + "/" + maxAttempts);
                if (attempts >= maxAttempts) {
                    System.out.println("🔒 Card blocked! Contact bank.");
                    return;
                }
            }
        }
        
        // ATM Menu Loop
        int menuChoice = 0;
        int transactionCount = 0;
        
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("       ATM MAIN MENU");
        System.out.println("═".repeat(40));
        
        // Simulate menu selections
        int[] selections = {1, 2, 3, 1, 5}; // User selections
        int selectionIndex = 0;
        
        while (sessionActive && selectionIndex < selections.length) {
            menuChoice = selections[selectionIndex];
            selectionIndex++;
            transactionCount++;
            
            System.out.println("\\n📋 Selection: " + menuChoice);
            
            switch (menuChoice) {
                case 1: // Check Balance
                    System.out.println("\\n💰 BALANCE INQUIRY");
                    System.out.println("   Available Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 2: // Withdraw
                    System.out.println("\\n💵 CASH WITHDRAWAL");
                    double withdrawAmount = 500.00;
                    
                    if (withdrawAmount > balance) {
                        System.out.println("   Insufficient funds!");
                    } else if (withdrawAmount > 1000) {
                        System.out.println("   Daily limit exceeded!");
                    } else {
                        balance -= withdrawAmount;
                        System.out.println("   Dispensing: $" + withdrawAmount);
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 3: // Deposit
                    System.out.println("\\n📥 CASH DEPOSIT");
                    double depositAmount = 1000.00;
                    balance += depositAmount;
                    System.out.println("   Deposited: $" + depositAmount);
                    System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 4: // Transfer
                    System.out.println("\\n🔄 FUND TRANSFER");
                    System.out.println("   Feature coming soon!");
                    break;
                    
                case 5: // Exit
                    System.out.println("\\n👋 Thank you for using SecureBank ATM!");
                    sessionActive = false;
                    break;
                    
                default:
                    System.out.println("   Invalid option!");
            }
        }
        
        System.out.println("\\n📊 Session Summary:");
        System.out.println("   Transactions: " + transactionCount);
        System.out.println("   Final Balance: $" + String.format("%,.2f", balance));
    }
}
\`\`\`

## 🎮 Real-Time Project Example: Game Score Tracker

\`\`\`java
// Real-Time: Multiplayer Game Session
// Used in online gaming platforms

public class GameSession {
    public static void main(String[] args) {
        System.out.println("🎮 BATTLE ROYALE - GAME SESSION");
        System.out.println("================================");
        
        // Game settings
        int maxPlayers = 100;
        int playersAlive = 100;
        int playerScore = 0;
        int kills = 0;
        int round = 0;
        boolean gameOver = false;
        boolean playerAlive = true;
        
        String playerName = "ProGamer123";
        int playerHealth = 100;
        int playerShield = 50;
        
        System.out.println("\\n👤 Player: " + playerName);
        System.out.println("🎯 Starting Match...");
        System.out.println("👥 Players: " + playersAlive);
        
        // Game loop
        while (!gameOver && playerAlive) {
            round++;
            System.out.println("\\n" + "─".repeat(40));
            System.out.println("⚔️ ROUND " + round);
            System.out.println("─".repeat(40));
            
            // Simulate game events
            int event = round % 4;
            
            switch (event) {
                case 0: // Combat
                    System.out.println("🔫 Enemy encountered!");
                    int damage = 25;
                    
                    if (playerShield > 0) {
                        playerShield -= damage;
                        if (playerShield < 0) {
                            playerHealth += playerShield;
                            playerShield = 0;
                        }
                    } else {
                        playerHealth -= damage;
                    }
                    
                    kills++;
                    playerScore += 100;
                    playersAlive -= 5;
                    System.out.println("   Enemy eliminated! +100 points");
                    break;
                    
                case 1: // Loot
                    System.out.println("📦 Found supply crate!");
                    playerShield = Math.min(playerShield + 25, 100);
                    playerScore += 25;
                    System.out.println("   +25 Shield");
                    break;
                    
                case 2: // Zone damage
                    System.out.println("⚠️ Storm approaching!");
                    playersAlive -= 10;
                    System.out.println("   " + playersAlive + " players remaining");
                    break;
                    
                case 3: // Heal
                    System.out.println("💊 Using medkit...");
                    playerHealth = Math.min(playerHealth + 30, 100);
                    System.out.println("   Health restored to " + playerHealth);
                    break;
            }
            
            // Display status
            System.out.println("\\n📊 Status:");
            System.out.println("   ❤️ Health: " + playerHealth);
            System.out.println("   🛡️ Shield: " + playerShield);
            System.out.println("   🎯 Kills: " + kills);
            System.out.println("   ⭐ Score: " + playerScore);
            System.out.println("   👥 Alive: " + playersAlive);
            
            // Check game end conditions
            if (playerHealth <= 0) {
                playerAlive = false;
                System.out.println("\\n💀 YOU WERE ELIMINATED!");
            } else if (playersAlive <= 1) {
                gameOver = true;
                System.out.println("\\n🏆 VICTORY ROYALE!");
                playerScore += 500;
            } else if (round >= 10) {
                gameOver = true;
                System.out.println("\\n⏱️ Match ended (time limit)");
            }
        }
        
        // Final stats
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("📊 MATCH SUMMARY");
        System.out.println("═".repeat(40));
        System.out.println("Player: " + playerName);
        System.out.println("Placement: #" + playersAlive);
        System.out.println("Kills: " + kills);
        System.out.println("Score: " + playerScore);
        System.out.println("Rounds Survived: " + round);
    }
}
\`\`\`

## 📡 Real-Time Project Example: Server Request Handler

\`\`\`java
// Real-Time: Web Server Request Processing
// Used in web servers like Tomcat, Jetty

public class RequestHandler {
    public static void main(String[] args) {
        System.out.println("🌐 WEB SERVER - REQUEST HANDLER");
        System.out.println("================================");
        
        boolean serverRunning = true;
        int requestCount = 0;
        int maxRequests = 5; // Simulate 5 requests
        long startTime = System.currentTimeMillis();
        
        System.out.println("Server started on port 8080");
        System.out.println("📡 Listening for connections...");
        
        // Server loop
        while (serverRunning && requestCount < maxRequests) {
            requestCount++;
            
            // Simulate incoming request
            String[] methods = {"GET", "POST", "GET", "PUT", "DELETE"};
            String[] endpoints = {"/api/users", "/api/orders", "/api/products", 
                                 "/api/users/1", "/api/orders/5"};
            int[] responseCodes = {200, 201, 200, 200, 204};
            
            int idx = requestCount - 1;
            String method = methods[idx];
            String endpoint = endpoints[idx];
            int responseCode = responseCodes[idx];
            
            System.out.println("\\n─────────────────────────────────");
            System.out.println("📥 Request #" + requestCount);
            System.out.println("   Method: " + method);
            System.out.println("   Endpoint: " + endpoint);
            
            // Process request
            long processStart = System.currentTimeMillis();
            
            // Simulate processing
            String response = "";
            switch (method) {
                case "GET":
                    response = "Data retrieved successfully";
                    break;
                case "POST":
                    response = "Resource created";
                    break;
                case "PUT":
                    response = "Resource updated";
                    break;
                case "DELETE":
                    response = "Resource deleted";
                    break;
            }
            
            long processTime = System.currentTimeMillis() - processStart;
            
            System.out.println("📤 Response:");
            System.out.println("   Status: " + responseCode);
            System.out.println("   Message: " + response);
            System.out.println("   Time: " + processTime + "ms");
        }
        
        // Server stats
        long totalTime = System.currentTimeMillis() - startTime;
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("📊 SERVER STATISTICS");
        System.out.println("═".repeat(40));
        System.out.println("Total Requests: " + requestCount);
        System.out.println("Uptime: " + totalTime + "ms");
        System.out.println("Avg Response: " + (totalTime / requestCount) + "ms");
    }
}
\`\`\`

> **Industry Insight**: While loops are fundamental in server programming. Web servers like Apache Tomcat use while loops to continuously listen for incoming HTTP requests, process them, and send responses.

---

## 10 Important while-loop Interview Questions

### 1. When do you pick \`while\` over \`for\`?
**Answer:** When iterations aren’t counted upfront—event loops, reading streams until EOF, polling until a condition flips.
For known ranges, \`for\` often reads clearer.

### 2. What is the difference between \`while\` and \`do-while\`?
**Answer:** \`while\` checks condition before first entry; \`do-while\` runs at least once then checks.
Use \`do-while\` for menus that must execute once.

### 3. What infinite loop risks exist with \`while (true)\`?
**Answer:** Must guarantee a \`break\`, \`return\`, or exception path exits; otherwise CPU spins forever.
Server loops often block on I/O inside to avoid burning cores.

### 4. How do you avoid busy-waiting?
**Answer:** Use blocking queues, \`wait/notify\`, \`LockSupport\`, or higher-level concurrency utilities instead of tight empty spins.
Busy-wait is for specialized low-latency systems with care.

### 5. Scenario: reading a \`ResultSet\` or \`BufferedReader\`—which loop fits?
**Answer:** \`while (rs.next())\` or \`while ((line = br.readLine()) != null)\`—condition drives continuation until data ends.
Classic JDBC and I/O interview patterns.

### 6. What happens if the condition never becomes false?
**Answer:** Infinite loop—often a logic bug; sometimes intentional servers with internal blocking.
Add timeouts and watchdogs for production loops.

### 7. Can \`while\` variables declared outside the loop create bugs?
**Answer:** Yes—reusing mutable flags without reset between iterations or concurrent updates cause subtle errors.
Prefer smaller scopes and immutable snapshots where possible.

### 8. How does \`continue\` behave in \`while\`?
**Answer:** Skips to next condition check—ensure increment steps still run or you may infinite-loop.
Double-check \`continue\` placement vs update expressions.

### 9. What is a sentinel-controlled loop?
**Answer:** Repeats until a special value (sentinel) appears—common in CLI input parsing.
Validate sentinel doesn’t collide with valid data.

### 10. How do you test while-loops effectively?
**Answer:** Cover zero iterations, one iteration, many iterations, and boundary where condition flips.
Property-based tests help find edge cases.

`,
  code: `// Real-Time: ATM Banking System
// Complete ATM simulation with while loops

public class ATMMachine {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║     🏧 SECURE BANK ATM SYSTEM          ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        // Account data
        String accountNumber = "****-****-1234";
        String accountHolder = " Dattu Smith";
        double balance = 7500.00;
        double dailyLimit = 2000.00;
        double withdrawnToday = 0;
        int correctPin = 1234;
        
        // Session variables
        int attempts = 0;
        int maxAttempts = 3;
        boolean authenticated = false;
        boolean sessionActive = true;
        int transactionCount = 0;
        
        // PIN Authentication Loop
        System.out.println("\\n🔐 AUTHENTICATION REQUIRED");
        System.out.println("──────────────────────────");
        
        int enteredPin = 1234; // Simulated correct PIN
        
        while (attempts < maxAttempts && !authenticated) {
            attempts++;
            System.out.println("Attempt " + attempts + "/" + maxAttempts);
            
            if (enteredPin == correctPin) {
                authenticated = true;
                System.out.println("Authentication Successful!");
                System.out.println("\\nWelcome, " + accountHolder + "!");
            } else {
                System.out.println("Incorrect PIN");
                if (attempts >= maxAttempts) {
                    System.out.println("\\n🔒 CARD BLOCKED");
                    System.out.println("Please contact customer service.");
                    return;
                }
                // In real ATM, would prompt for new PIN
                enteredPin = 1234; // Retry with correct PIN
            }
        }
        
        // Simulated menu selections
        int[] menuSelections = {1, 2, 3, 2, 4, 1, 5};
        int selectionIndex = 0;
        
        // Main ATM Menu Loop
        while (sessionActive && selectionIndex < menuSelections.length) {
            System.out.println("\\n╔════════════════════════════════════════╗");
            System.out.println("║           MAIN MENU                    ║");
            System.out.println("╠════════════════════════════════════════╣");
            System.out.println("║  1. 💰 Check Balance                   ║");
            System.out.println("║  2. 💵 Withdraw Cash                   ║");
            System.out.println("║  3. 📥 Deposit Cash                    ║");
            System.out.println("║  4. 🔄 Fund Transfer                   ║");
            System.out.println("║  5. 👋 Exit                            ║");
            System.out.println("╚════════════════════════════════════════╝");
            
            int choice = menuSelections[selectionIndex];
            selectionIndex++;
            System.out.println("\\nSelected: " + choice);
            
            switch (choice) {
                case 1: // Balance Inquiry
                    transactionCount++;
                    System.out.println("\\n💰 BALANCE INQUIRY");
                    System.out.println("────────────────────");
                    System.out.println("Account: " + accountNumber);
                    System.out.println("Available Balance: $" + String.format("%,.2f", balance));
                    System.out.println("Daily Limit Remaining: $" + 
                        String.format("%,.2f", dailyLimit - withdrawnToday));
                    break;
                    
                case 2: // Withdraw
                    transactionCount++;
                    System.out.println("\\n💵 CASH WITHDRAWAL");
                    System.out.println("────────────────────");
                    
                    double withdrawAmount = 500.00;
                    System.out.println("Amount: $" + withdrawAmount);
                    
                    // Validation checks
                    if (withdrawAmount > balance) {
                        System.out.println("Insufficient balance!");
                    } else if (withdrawAmount + withdrawnToday > dailyLimit) {
                        System.out.println("Daily limit exceeded!");
                        System.out.println("   Remaining limit: $" + 
                            String.format("%,.2f", dailyLimit - withdrawnToday));
                    } else if (withdrawAmount % 20 != 0) {
                        System.out.println("Amount must be multiple of $20");
                    } else {
                        balance -= withdrawAmount;
                        withdrawnToday += withdrawAmount;
                        System.out.println("Please collect your cash");
                        System.out.println("   Dispensed: $" + String.format("%,.2f", withdrawAmount));
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 3: // Deposit
                    transactionCount++;
                    System.out.println("\\n📥 CASH DEPOSIT");
                    System.out.println("────────────────────");
                    
                    double depositAmount = 1000.00;
                    System.out.println("Amount: $" + depositAmount);
                    
                    // Count bills (simulated)
                    System.out.println("Counting bills...");
                    System.out.println("Verifying authenticity...");
                    
                    balance += depositAmount;
                    System.out.println("Deposit successful!");
                    System.out.println("   Deposited: $" + String.format("%,.2f", depositAmount));
                    System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 4: // Transfer
                    transactionCount++;
                    System.out.println("\\n🔄 FUND TRANSFER");
                    System.out.println("────────────────────");
                    
                    String targetAccount = "****-****-5678";
                    double transferAmount = 200.00;
                    
                    System.out.println("To Account: " + targetAccount);
                    System.out.println("Amount: $" + transferAmount);
                    
                    if (transferAmount > balance) {
                        System.out.println("Insufficient balance!");
                    } else {
                        balance -= transferAmount;
                        System.out.println("Transfer successful!");
                        System.out.println("   Transferred: $" + String.format("%,.2f", transferAmount));
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 5: // Exit
                    sessionActive = false;
                    System.out.println("\\n👋 THANK YOU FOR BANKING WITH US!");
                    break;
                    
                default:
                    System.out.println("Invalid selection!");
            }
            
            // Print receipt option
            if (choice >= 1 && choice <= 4) {
                System.out.println("\\n📄 Receipt printed.");
            }
        }
        
        // Session Summary
        System.out.println("\\n╔════════════════════════════════════════╗");
        System.out.println("║         SESSION SUMMARY                ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Transactions: " + transactionCount);
        System.out.println("Final Balance: $" + String.format("%,.2f", balance));
        System.out.println("\\n🔒 Please take your card.");
        System.out.println("Have a great day!");
    }
}

---

## Real-World Applications

### Data Processing
Enterprise applications use while loops to process data streams, read files line by line, and handle continuous data input. While loops are ideal when the amount of data is unknown or comes from external sources.

**Implementation Example:**
- Reading files until end of file
- Processing database result sets
- Parsing network data streams
- Handling real-time data feeds

### User Input Validation
Applications use while loops to repeatedly prompt users for input until valid data is provided. This ensures data quality and improves user experience by guiding users to correct input.

**Implementation Example:**
- PIN verification with retry limits
- Form validation with re-prompting
- Menu systems that continue until exit
- Configuration wizards

### Game Development
Game applications use while loops for game loops that continue until game over conditions are met. The loop processes game logic, handles user input, and updates game state continuously.

**Implementation Example:**
- Main game loop running until game over
- Level progression loops
- Turn-based game mechanics
- Animation loops

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Infinite Loops
**Problem:** Forgetting to update loop variable or having condition that never becomes false.

**Solution:** Always ensure condition will eventually become false:

\`\`\`java
// WRONG - Infinite loop
int i = 0;
while (i < 10) {
    System.out.println(i);
    // Forgot to increment i!
}

// CORRECT
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;  // Update loop variable
}
\`\`\`

### Mistake 2: Using While When For Loop is Better
**Problem:** Using while loop when number of iterations is known.

**Solution:** Use for loop when iteration count is known:

\`\`\`java
// PREFER - For loop for known iterations
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// AVOID - While loop for known iterations
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
\`\`\`

### Mistake 3: Not Handling Edge Cases
**Problem:** Not considering what happens if condition is false initially.

**Solution:** Consider if loop should execute at least once (use do-while) or not at all:

\`\`\`java
// If loop might not execute, use while
while (condition) { }

// If loop must execute at least once, use do-while
do { } while (condition);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a while loop and when should I use it?

A while loop repeatedly executes a block of code as long as a condition is true. Use a while loop when the number of iterations is unknown and depends on runtime conditions, such as processing data streams, handling user input validation, or implementing algorithms with dynamic termination.

### What's the difference between while and for loop?

Use a for loop when you know the number of iterations in advance (iterating arrays, counting). Use a while loop when iterations depend on conditions that may change during execution (user input, data streams, unknown data size). For loops are more concise for known iteration counts.

### What's the difference between while and do-while?

A while loop checks the condition before executing, so it may not execute at all. A do-while loop executes at least once and checks the condition after execution. Use do-while when you need the loop body to execute at least once. Learn about [Do While Loop](/tutorial/do-while-loop) for details.

### How do I avoid infinite loops?

Avoid infinite loops by: (1) ensuring the loop variable is updated inside the loop, (2) making sure the condition will eventually become false, (3) using break statements for early termination when needed, and (4) testing with known termination conditions.

### Can I use break and continue in while loops?

Yes, both \`break\` and \`continue\` work in while loops. \`break\` exits the loop immediately, while \`continue\` skips the rest of the current iteration and proceeds to check the condition again. These are useful for early termination and skipping iterations. Learn about [Break Continue](/tutorial/break-continue) for detailed usage.

### When should I use a while loop vs for loop?

Use a for loop for: iterating arrays/collections, counting iterations, known iteration count. Use a while loop for: unknown iteration count, condition-based repetition, processing streams, user input validation, game loops, server processes.

### How do I read data until a sentinel value?

Use a while loop that continues until a sentinel (termination) value is encountered:

\`\`\`java
int value;
while ((value = readValue()) != -1) {
    process(value);
}
\`\`\`

### Can I nest while loops?

Yes, you can nest while loops (while inside while), but be careful with performance and readability. Nested loops can be slow with large datasets. Consider if the nested structure is necessary or if the algorithm can be optimized.

### How do I implement a retry mechanism with while loop?

Use a while loop with a retry counter:

\`\`\`java
int maxRetries = 3;
int attempts = 0;
boolean success = false;

while (attempts < maxRetries && !success) {
    try {
        performOperation();
        success = true;
    } catch (Exception e) {
        attempts++;
    }
}
\`\`\`

---

## Key Takeaways

Before proceeding to other control flow statements, ensure you understand these while loop fundamentals:

- **While loops repeat code** as long as a condition is true
- **Use while loops** when iteration count is unknown or condition-based
- **Always update loop variables** inside the loop to avoid infinite loops
- **break and continue** provide control over loop execution
- **Do-while loops** execute at least once before checking condition
- **Sentinel values** can control loop termination
- **Nested while loops** are possible but should be used carefully
- **While loops are ideal** for user input, data streams, and dynamic conditions

---

## What's Next?

Now that you understand while loops, you're ready to explore related control flow statements:

### Immediate Next Steps

1. **[Do While Loop](/tutorial/do-while-loop)**: Learn loops that execute at least once
2. **[For Loop](/tutorial/for-loop)**: Understand iteration with known count
3. **[If-Else Statements](/tutorial/if-else)**: Master conditional execution
4. **[Break Continue](/tutorial/break-continue)**: Learn loop control statements

### Advanced Topics

- **Stream Processing**: Process data streams with while loops
- **Event-Driven Programming**: While loops in event handling
- **Algorithm Implementation**: Using while loops in algorithms
- **Performance Optimization**: Optimizing while loop performance

### Related Tutorials

- **[Java Control Flow](/tutorial/control-flow-introduction)**: Review all control flow statements
- **[Java Basics](/tutorial/java-introduction)**: Master Java fundamentals
- **[Exception Handling](/tutorial/exception-introduction)**: Handle errors in loops
- **[Collections](/tutorial/collection-introduction)**: Iterate collections with while loops

While loops are essential for handling dynamic, condition-based repetition. Continue learning about [Do While Loop](/tutorial/do-while-loop) to understand loops that guarantee at least one execution.
`,
  practiceQuestions: [
    {
      question: 'Create a Customer Support Chatbot that keeps responding until user types "exit"',
      hint: 'Use while loop to keep the conversation going, handle different query types',
      starterCode: `public class SupportChatbot {
    public static void main(String[] args) {
        boolean chatActive = true;
        
        // Simulate user messages
        String[] userMessages = {"hello", "order status", "refund", "exit"};
        int msgIndex = 0;
        
        while (chatActive) {
            // Process each message
            // Respond based on query type
            // Exit when user says "exit"
        }
    }
}`
    }
  ]
};

export default whileLoop;
