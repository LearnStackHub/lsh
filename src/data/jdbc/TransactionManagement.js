const transactionManagement = {
  id: 'transaction-management',
  title: 'Transaction Management',
  description: 'ACID properties, commit, rollback, and savepoints',
  content: `
# Transaction Management — All or Nothing

A transaction is a group of operations that must all succeed or all fail together. Think of transferring money between bank accounts: you can't debit one account without crediting another. Transactions ensure data integrity.

> **Transaction examples (commit / rollback):** [LearnStackHub/Jdbc](https://github.com/LearnStackHub/Jdbc) on GitHub — clone or download a ZIP (**Code**). \`git clone https://github.com/LearnStackHub/Jdbc.git\`

---

## ACID Properties

Every transaction guarantees these four properties:

| Property | Description | Example |
|----------|-------------|---------|
| **Atomicity** | All or nothing | Transfer completes fully or not at all |
| **Consistency** | Valid state to valid state | Account balances always balance |
| **Isolation** | Transactions don't interfere | Two transfers don't mix up |
| **Durability** | Changes persist | Committed data survives crashes |

---

## Auto-Commit Mode

By default, JDBC commits each statement immediately.

\`\`\`java
// Default: auto-commit is ON
Connection conn = DriverManager.getConnection(url, user, password);
System.out.println(conn.getAutoCommit());  // true

// Each statement is its own transaction
stmt.executeUpdate("INSERT INTO users (name) VALUES (' Dattu')");  // Committed!
stmt.executeUpdate("INSERT INTO users (name) VALUES ('Jane')");  // Committed!
\`\`\`

---

## Manual Transaction Control

### Basic Pattern

\`\`\`java
Connection conn = null;
try {
    conn = DriverManager.getConnection(url, user, password);
    conn.setAutoCommit(false);  // Start transaction
    
    // Multiple operations
    stmt.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    stmt.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    
    conn.commit();  // All succeeded, make permanent
    
} catch (SQLException e) {
    if (conn != null) {
        conn.rollback();  // Something failed, undo all
    }
    throw e;
} finally {
    if (conn != null) {
        conn.setAutoCommit(true);  // Restore default
        conn.close();
    }
}
\`\`\`

### With Try-with-Resources

\`\`\`java
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    conn.setAutoCommit(false);
    
    try (PreparedStatement debit = conn.prepareStatement(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?");
         PreparedStatement credit = conn.prepareStatement(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
        
        // Debit from account 1
        debit.setDouble(1, 100.00);
        debit.setInt(2, 1);
        debit.executeUpdate();
        
        // Credit to account 2
        credit.setDouble(1, 100.00);
        credit.setInt(2, 2);
        credit.executeUpdate();
        
        conn.commit();
        System.out.println("Transfer successful!");
        
    } catch (SQLException e) {
        conn.rollback();
        System.out.println("Transfer failed, rolled back");
        throw e;
    }
}
\`\`\`

---

## Savepoints

Savepoints let you rollback to a specific point within a transaction, not all the way back.

\`\`\`java
conn.setAutoCommit(false);

try {
    // Operation 1
    stmt.executeUpdate("INSERT INTO orders (product_id) VALUES (1)");
    
    // Create savepoint
    Savepoint savepoint = conn.setSavepoint("afterOrder");
    
    try {
        // Operation 2 - might fail
        stmt.executeUpdate("UPDATE inventory SET stock = stock - 1 WHERE product_id = 1");
        
    } catch (SQLException e) {
        // Rollback only operation 2
        conn.rollback(savepoint);
        System.out.println("Inventory update failed, but order kept");
    }
    
    conn.commit();
    
} catch (SQLException e) {
    conn.rollback();  // Rollback everything
}
\`\`\`

### Named Savepoints

\`\`\`java
Savepoint sp1 = conn.setSavepoint("checkpoint1");
// ... operations ...
Savepoint sp2 = conn.setSavepoint("checkpoint2");
// ... more operations ...

// Rollback to specific savepoint
conn.rollback(sp2);  // Undo everything after checkpoint2
conn.rollback(sp1);  // Undo everything after checkpoint1

// Release savepoint (optional, frees resources)
conn.releaseSavepoint(sp1);
\`\`\`

---

## Transaction Isolation Levels

Control how transactions see each other's changes.

### Isolation Levels

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| READ_UNCOMMITTED | Yes | Yes | Yes |
| READ_COMMITTED | No | Yes | Yes |
| REPEATABLE_READ | No | No | Yes |
| SERIALIZABLE | No | No | No |

### Setting Isolation Level

\`\`\`java
// Check current level
int level = conn.getTransactionIsolation();

// Set isolation level
conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
\`\`\`

### Problems Explained

**Dirty Read:** Reading uncommitted changes from another transaction.

**Non-Repeatable Read:** Same query returns different results within a transaction.

**Phantom Read:** New rows appear in repeated queries.

---

## Real-World Example: Bank Transfer

\`\`\`java
public class BankService {
    
    public void transfer(int fromAccount, int toAccount, double amount) 
            throws SQLException {
        
        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
        String logSql = "INSERT INTO transactions (from_acc, to_acc, amount, timestamp) VALUES (?, ?, ?, ?)";
        
        try (Connection conn = getConnection()) {
            conn.setAutoCommit(false);
            conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
            
            try {
                // Debit from source account
                try (PreparedStatement debit = conn.prepareStatement(debitSql)) {
                    debit.setDouble(1, amount);
                    debit.setInt(2, fromAccount);
                    debit.setDouble(3, amount);
                    
                    int rows = debit.executeUpdate();
                    if (rows == 0) {
                        throw new SQLException("Insufficient funds or account not found");
                    }
                }
                
                // Credit to destination account
                try (PreparedStatement credit = conn.prepareStatement(creditSql)) {
                    credit.setDouble(1, amount);
                    credit.setInt(2, toAccount);
                    
                    int rows = credit.executeUpdate();
                    if (rows == 0) {
                        throw new SQLException("Destination account not found");
                    }
                }
                
                // Log the transaction
                try (PreparedStatement log = conn.prepareStatement(logSql)) {
                    log.setInt(1, fromAccount);
                    log.setInt(2, toAccount);
                    log.setDouble(3, amount);
                    log.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
                    log.executeUpdate();
                }
                
                conn.commit();
                System.out.println("Transfer of $" + amount + " completed successfully");
                
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transfer failed: " + e.getMessage());
                throw e;
            }
        }
    }
}
\`\`\`

---

## Real-World Example: Order Processing

\`\`\`java
public class OrderService {
    
    public int createOrder(int customerId, List<OrderItem> items) throws SQLException {
        
        try (Connection conn = getConnection()) {
            conn.setAutoCommit(false);
            
            Savepoint orderCreated = null;
            
            try {
                // Create order
                int orderId = insertOrder(conn, customerId);
                orderCreated = conn.setSavepoint("orderCreated");
                
                // Add items and update inventory
                for (OrderItem item : items) {
                    insertOrderItem(conn, orderId, item);
                    
                    // Try to update inventory
                    try {
                        updateInventory(conn, item.getProductId(), item.getQuantity());
                    } catch (SQLException e) {
                        // Inventory update failed, but keep the order
                        conn.rollback(orderCreated);
                        // Mark order as "pending inventory"
                        updateOrderStatus(conn, orderId, "PENDING_INVENTORY");
                        break;
                    }
                }
                
                conn.commit();
                return orderId;
                
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        }
    }
}
\`\`\`

---

## Best Practices

1. **Keep transactions short** — Long transactions block other users
2. **Use appropriate isolation** — Higher isolation = lower performance
3. **Always handle rollback** — Never leave transactions hanging
4. **Use savepoints sparingly** — They add complexity
5. **Test failure scenarios** — Ensure rollback works correctly

---

## Test Your Knowledge

Ready to test your transaction management skills? Take our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering ACID properties, commit, rollback, and isolation levels!
---


## 10 Important Transaction Management Interview Questions

### 1. What is a transaction in JDBC?
**Answer:** A transaction is a logical unit of work containing one or more SQL operations that must succeed or fail together. JDBC controls this at the Connection level. This guarantees consistency for multi-step business updates.

### 2. What does auto-commit mean?
**Answer:** Auto-commit means each SQL statement is committed immediately after execution. It is simple for independent operations but unsafe for dependent multi-step workflows. Turning it off is necessary for atomic business transactions.

### 3. When should you disable auto-commit?
**Answer:** Disable auto-commit when multiple operations must be treated as one business unit, such as money transfer or order placement. Then commit only after all steps succeed, otherwise rollback. This is a common interview scenario.

### 4. What is rollback and why is it important?
**Answer:** Rollback reverts all uncommitted changes in the current transaction after an error or validation failure. It prevents partial updates and protects data integrity. Robust systems always define clear rollback paths.

### 5. What are savepoints and when do you use them?
**Answer:** Savepoints are intermediate markers inside a transaction that let you roll back part of the work without discarding everything. They are useful in long workflows with optional steps. This provides finer-grained recovery control.

### 6. What are transaction isolation levels?
**Answer:** Isolation levels define how concurrent transactions see each other’s changes and control phenomena like dirty reads, non-repeatable reads, and phantom reads. Higher isolation improves correctness but may reduce concurrency. Choosing level is a business trade-off.

### 7. Why are ACID properties important in interviews?
**Answer:** ACID explains the guarantees transaction systems provide: atomicity, consistency, isolation, and durability. Interviewers use ACID to evaluate your conceptual depth in reliability and concurrency. Good answers tie ACID to practical examples.

### 8. How do transaction boundaries affect application design?
**Answer:** Boundaries should align with business operations, not arbitrary method calls. Incorrect boundaries cause lock contention, partial states, or long-running transactions. Clear boundaries improve correctness and throughput.

### 9. What are common transaction management mistakes?
**Answer:** Common mistakes include forgetting rollback in catch blocks, mixing unrelated work in one transaction, and holding transactions open during slow external calls. These mistakes hurt consistency and performance under load.

### 10. How would you explain JDBC transaction management briefly?
**Answer:** JDBC transaction management is explicit connection-level control of commit, rollback, savepoints, and isolation to guarantee consistent outcomes in concurrent systems. It is essential for financial, ordering, and inventory workflows where partial success is unacceptable.

`,
  code: `// Transaction Management Demo
// Demonstrates commit, rollback, and savepoints

import java.util.*;

public class TransactionDemo {
    public static void main(String[] args) {
        System.out.println("=== Transaction Management Demo ===\\n");
        
        // Create simulated bank
        SimulatedBank bank = new SimulatedBank();
        bank.createAccount(1, " Dattu", 1000.00);
        bank.createAccount(2, "Jane", 500.00);
        bank.createAccount(3, "Bob", 750.00);
        
        // 1. ACID PROPERTIES
        System.out.println("1. ACID PROPERTIES");
        System.out.println("   ----------------");
        System.out.println("   Atomicity:    All or nothing");
        System.out.println("   Consistency:  Valid state to valid state");
        System.out.println("   Isolation:    Transactions don't interfere");
        System.out.println("   Durability:   Changes persist after commit");
        System.out.println();
        
        // 2. INITIAL BALANCES
        System.out.println("2. INITIAL ACCOUNT BALANCES");
        System.out.println("   -------------------------");
        bank.printBalances();
        System.out.println();
        
        // 3. SUCCESSFUL TRANSACTION
        System.out.println("3. SUCCESSFUL TRANSACTION");
        System.out.println("   -----------------------");
        System.out.println("   Transferring $200 from  Dattu to Jane...");
        System.out.println();
        
        SimulatedConnection conn = bank.getConnection();
        conn.setAutoCommit(false);
        System.out.println("   conn.setAutoCommit(false)  // Start transaction");
        
        try {
            bank.debit(1, 200.00);
            System.out.println("   Debited $200 from  Dattu");
            
            bank.credit(2, 200.00);
            System.out.println("   Credited $200 to Jane");
            
            conn.commit();
            System.out.println("   conn.commit()  // Transaction committed!");
            System.out.println();
            
            System.out.println("   Balances after successful transfer:");
            bank.printBalances();
            
        } catch (Exception e) {
            conn.rollback();
            System.out.println("   conn.rollback()  // Transaction rolled back!");
        }
        System.out.println();
        
        // 4. FAILED TRANSACTION (ROLLBACK)
        System.out.println("4. FAILED TRANSACTION (ROLLBACK)");
        System.out.println("   ------------------------------");
        System.out.println("   Attempting to transfer $5000 from  Dattu (insufficient funds)...");
        System.out.println();
        
        conn.setAutoCommit(false);
        System.out.println("   conn.setAutoCommit(false)  // Start transaction");
        
        try {
            bank.debit(1, 5000.00);  // This will fail
            bank.credit(2, 5000.00);
            conn.commit();
            
        } catch (Exception e) {
            System.out.println("   ERROR: " + e.getMessage());
            conn.rollback();
            System.out.println("   conn.rollback()  // Transaction rolled back!");
            System.out.println();
            
            System.out.println("   Balances unchanged after rollback:");
            bank.printBalances();
        }
        System.out.println();
        
        // 5. SAVEPOINTS
        System.out.println("5. SAVEPOINTS");
        System.out.println("   ----------");
        System.out.println("   Complex transaction with savepoint...");
        System.out.println();
        
        conn.setAutoCommit(false);
        
        try {
            // First operation
            bank.debit(1, 100.00);
            System.out.println("   Debited $100 from  Dattu");
            
            // Create savepoint
            String savepoint = conn.setSavepoint("afterDebit");
            System.out.println("   Savepoint 'afterDebit' created");
            
            try {
                // Second operation - might fail
                bank.credit(99, 100.00);  // Invalid account!
                
            } catch (Exception e) {
                System.out.println("   ERROR: " + e.getMessage());
                conn.rollback(savepoint);
                System.out.println("   Rolled back to savepoint 'afterDebit'");
                
                // Alternative: credit to Bob instead
                bank.credit(3, 100.00);
                System.out.println("   Credited $100 to Bob instead");
            }
            
            conn.commit();
            System.out.println("   Transaction committed!");
            System.out.println();
            
            System.out.println("   Final balances:");
            bank.printBalances();
            
        } catch (Exception e) {
            conn.rollback();
        }
        System.out.println();
        
        // 6. ISOLATION LEVELS
        System.out.println("6. TRANSACTION ISOLATION LEVELS");
        System.out.println("   -----------------------------");
        System.out.println("   | Level              | Dirty | Non-Repeat | Phantom |");
        System.out.println("   |--------------------|-------|------------|---------|");
        System.out.println("   | READ_UNCOMMITTED   | Yes   | Yes        | Yes     |");
        System.out.println("   | READ_COMMITTED     | No    | Yes        | Yes     |");
        System.out.println("   | REPEATABLE_READ    | No    | No         | Yes     |");
        System.out.println("   | SERIALIZABLE       | No    | No         | No      |");
        System.out.println();
        System.out.println("   Higher isolation = More safety, Less performance");
        System.out.println();
        
        // 7. BEST PRACTICES
        System.out.println("7. BEST PRACTICES");
        System.out.println("   ---------------");
        System.out.println("   1. Keep transactions short");
        System.out.println("   2. Use appropriate isolation level");
        System.out.println("   3. Always handle rollback in catch block");
        System.out.println("   4. Use try-with-resources for connections");
        System.out.println("   5. Test failure scenarios");
    }
}

// Simulated Bank
class SimulatedBank {
    private Map<Integer, Account> accounts = new HashMap<>();
    private SimulatedConnection conn = new SimulatedConnection();
    
    public void createAccount(int id, String name, double balance) {
        accounts.put(id, new Account(id, name, balance));
    }
    
    public SimulatedConnection getConnection() {
        return conn;
    }
    
    public void debit(int accountId, double amount) throws Exception {
        Account account = accounts.get(accountId);
        if (account == null) {
            throw new Exception("Account " + accountId + " not found");
        }
        if (account.balance < amount) {
            throw new Exception("Insufficient funds in account " + accountId);
        }
        
        if (conn.isAutoCommit()) {
            account.balance -= amount;
        } else {
            conn.addPendingOperation(() -> account.balance -= amount);
        }
    }
    
    public void credit(int accountId, double amount) throws Exception {
        Account account = accounts.get(accountId);
        if (account == null) {
            throw new Exception("Account " + accountId + " not found");
        }
        
        if (conn.isAutoCommit()) {
            account.balance += amount;
        } else {
            conn.addPendingOperation(() -> account.balance += amount);
        }
    }
    
    public void printBalances() {
        System.out.println("   +----+-------+---------+");
        System.out.println("   | ID | Name  | Balance |");
        System.out.println("   +----+-------+---------+");
        for (Account acc : accounts.values()) {
            System.out.printf("   | %-2d | %-5s | $%6.2f |%n", 
                acc.id, acc.name, acc.balance);
        }
        System.out.println("   +----+-------+---------+");
    }
}

// Account class
class Account {
    int id;
    String name;
    double balance;
    
    Account(int id, String name, double balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}

// Simulated Connection
class SimulatedConnection {
    private boolean autoCommit = true;
    private List<Runnable> pendingOperations = new ArrayList<>();
    private Map<String, Integer> savepoints = new HashMap<>();
    
    public void setAutoCommit(boolean autoCommit) {
        this.autoCommit = autoCommit;
        if (autoCommit) {
            pendingOperations.clear();
            savepoints.clear();
        }
    }
    
    public boolean isAutoCommit() {
        return autoCommit;
    }
    
    public void addPendingOperation(Runnable operation) {
        pendingOperations.add(operation);
    }
    
    public void commit() {
        for (Runnable op : pendingOperations) {
            op.run();
        }
        pendingOperations.clear();
        savepoints.clear();
    }
    
    public void rollback() {
        pendingOperations.clear();
        savepoints.clear();
    }
    
    public String setSavepoint(String name) {
        savepoints.put(name, pendingOperations.size());
        return name;
    }
    
    public void rollback(String savepoint) {
        Integer index = savepoints.get(savepoint);
        if (index != null) {
            while (pendingOperations.size() > index) {
                pendingOperations.remove(pendingOperations.size() - 1);
            }
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an order processing system with transaction management',
      hint: 'Handle order creation, inventory update, and payment in a single transaction',
      starterCode: `import java.util.*;

public class OrderProcessingDemo {
    public static void main(String[] args) {
        System.out.println("=== Order Processing Demo ===\\n");
        
        OrderSystem system = new OrderSystem();
        
        // Setup inventory
        system.addProduct(1, "Laptop", 10, 999.99);
        system.addProduct(2, "Mouse", 50, 29.99);
        system.addProduct(3, "Keyboard", 30, 79.99);
        
        System.out.println("Initial Inventory:");
        system.printInventory();
        System.out.println();
        
        // Process order 1 - Should succeed
        System.out.println("Processing Order 1 (2 Laptops, 1 Mouse)...");
        List<OrderItem> items1 = Arrays.asList(
            new OrderItem(1, 2),  // 2 Laptops
            new OrderItem(2, 1)   // 1 Mouse
        );
        system.processOrder(items1);
        System.out.println();
        
        // Process order 2 - Should fail (not enough laptops)
        System.out.println("Processing Order 2 (15 Laptops)...");
        List<OrderItem> items2 = Arrays.asList(
            new OrderItem(1, 15)  // 15 Laptops - not enough!
        );
        system.processOrder(items2);
        System.out.println();
        
        System.out.println("Final Inventory:");
        system.printInventory();
    }
}

class OrderItem {
    int productId;
    int quantity;
    
    OrderItem(int productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}

class Product {
    int id;
    String name;
    int stock;
    double price;
    
    Product(int id, String name, int stock, double price) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.price = price;
    }
}

class OrderSystem {
    private Map<Integer, Product> products = new HashMap<>();
    private List<List<OrderItem>> orders = new ArrayList<>();
    
    public void addProduct(int id, String name, int stock, double price) {
        products.put(id, new Product(id, name, stock, price));
    }
    
    public void processOrder(List<OrderItem> items) {
        // Start transaction
        Map<Integer, Integer> originalStock = new HashMap<>();
        
        try {
            // Save original stock (for rollback)
            for (OrderItem item : items) {
                Product p = products.get(item.productId);
                originalStock.put(item.productId, p.stock);
            }
            
            // Process each item
            double total = 0;
            for (OrderItem item : items) {
                Product p = products.get(item.productId);
                
                if (p.stock < item.quantity) {
                    throw new Exception("Insufficient stock for " + p.name);
                }
                
                p.stock -= item.quantity;
                total += p.price * item.quantity;
            }
            
            // Commit
            orders.add(items);
            System.out.println("  Order completed! Total: $" + String.format("%.2f", total));
            
        } catch (Exception e) {
            // Rollback
            System.out.println("  Order failed: " + e.getMessage());
            System.out.println("  Rolling back...");
            
            for (Map.Entry<Integer, Integer> entry : originalStock.entrySet()) {
                products.get(entry.getKey()).stock = entry.getValue();
            }
            
            System.out.println("  Rollback complete");
        }
    }
    
    public void printInventory() {
        System.out.println("  +----+----------+-------+---------+");
        System.out.println("  | ID | Product  | Stock | Price   |");
        System.out.println("  +----+----------+-------+---------+");
        for (Product p : products.values()) {
            System.out.printf("  | %-2d | %-8s | %-5d | $%6.2f |%n",
                p.id, p.name, p.stock, p.price);
        }
        System.out.println("  +----+----------+-------+---------+");
    }
}`
    }
  ]
};

export default transactionManagement;
