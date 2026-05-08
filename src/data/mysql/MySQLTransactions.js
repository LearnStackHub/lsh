const mysqlTransactions = {
  id: 'mysql-transactions',
  title: 'MySQL Transactions - ACID Properties',
  description: 'Master transactions to ensure data consistency and handle concurrent operations',
  content: `
# MySQL Transactions - ACID Properties and Data Consistency

MySQL transactions are sequences of database operations that are executed as a single atomic unit, ensuring that either all operations succeed (commit) or all operations fail (rollback). Transactions are fundamental to maintaining data integrity, consistency, and reliability in database applications. Understanding transactions and their ACID properties is essential for building robust, production-ready database applications.

Enterprise applications extensively use transactions to ensure data consistency across related operations. Banking systems use transactions for money transfers, e-commerce platforms use them for order processing, and inventory systems use them for stock management. Transactions prevent partial updates that could leave databases in inconsistent states, making them critical for data integrity.

**ACID Properties:**
- **Atomicity**: All operations succeed or all fail together
- **Consistency**: Database remains in valid state
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed changes are permanent

---

## What are Transactions?

A **transaction** is a sequence of database operations that:
- ✅ Either **all succeed** (COMMIT)
- ✅ Or **all fail** (ROLLBACK)
- ✅ Maintains **ACID properties**

---

## ACID Properties

### 1. **Atomicity**
All operations in a transaction succeed or fail together.

### 2. **Consistency**
Database remains in a valid state after transaction.

### 3. **Isolation**
Concurrent transactions don't interfere with each other.

### 4. **Durability**
Committed changes are permanent.

---

## Basic Transaction Syntax

\`\`\`sql
-- Start transaction
START TRANSACTION;

-- SQL operations
INSERT INTO orders ...;
UPDATE products ...;
INSERT INTO order_items ...;

-- Commit (save changes)
COMMIT;

-- Or rollback (undo changes)
ROLLBACK;
\`\`\`

---

## Simple Example

\`\`\`sql
START TRANSACTION;

-- Transfer money from account A to account B
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If both succeed, commit
COMMIT;

-- If error occurs, rollback
-- ROLLBACK;
\`\`\`

---

## Real-World Example: Order Processing

\`\`\`sql
START TRANSACTION;

-- Create order
INSERT INTO orders (customer_id, order_date, total_amount)
VALUES (1, CURRENT_DATE, 99.99);
SET @order_id = LAST_INSERT_ID();

-- Add order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (@order_id, 5, 1, 99.99);

-- Update product stock
UPDATE products SET stock = stock - 1 WHERE id = 5;

-- Check if stock is negative
IF (SELECT stock FROM products WHERE id = 5) < 0 THEN
    ROLLBACK;
    SELECT 'Transaction failed: Insufficient stock' AS message;
ELSE
    COMMIT;
    SELECT 'Order created successfully' AS message;
END IF;
\`\`\`

---

## Transaction Isolation Levels

Control how transactions interact with each other.

### 1. READ UNCOMMITTED
- Lowest isolation
- Can read uncommitted data
- Dirty reads possible

\`\`\`sql
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
\`\`\`

### 2. READ COMMITTED
- Read only committed data
- Prevents dirty reads
- Allows non-repeatable reads

\`\`\`sql
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
\`\`\`

### 3. REPEATABLE READ (MySQL Default)
- Consistent reads within transaction
- Prevents dirty and non-repeatable reads
- May have phantom reads

\`\`\`sql
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
\`\`\`

### 4. SERIALIZABLE
- Highest isolation
- No concurrency issues
- Slower performance

\`\`\`sql
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

---

## Savepoints

Create checkpoints within a transaction.

\`\`\`sql
START TRANSACTION;

-- Operation 1
INSERT INTO orders ...;
SAVEPOINT sp1;

-- Operation 2
UPDATE products ...;
SAVEPOINT sp2;

-- Operation 3
INSERT INTO order_items ...;

-- Rollback to savepoint
ROLLBACK TO SAVEPOINT sp1;

-- Continue or commit
COMMIT;
\`\`\`

---

## Auto-commit

MySQL auto-commits each statement by default.

\`\`\`sql
-- Check auto-commit status
SELECT @@autocommit;  -- 1 = enabled, 0 = disabled

-- Disable auto-commit
SET autocommit = 0;

-- Now statements are part of transaction
INSERT INTO orders ...;
UPDATE products ...;

-- Must explicitly commit
COMMIT;

-- Re-enable auto-commit
SET autocommit = 1;
\`\`\`

---

## Error Handling in Transactions

\`\`\`sql
START TRANSACTION;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    SELECT 'Transaction failed' AS message;
END;

-- Operations
INSERT INTO orders ...;
UPDATE products ...;

COMMIT;
SELECT 'Transaction successful' AS message;
\`\`\`

---

## Best Practices

### 1. Keep Transactions Short
Long transactions hold locks longer.

### 2. Handle Errors
Always include error handling.

### 3. Use Appropriate Isolation Level
Balance between consistency and performance.

### 4. Commit Frequently
Don't keep transactions open unnecessarily.

---

## Summary

Transactions ensure:
- **Atomicity** - All or nothing
- **Consistency** - Valid state
- **Isolation** - Concurrent safety
- **Durability** - Permanent changes

Use transactions for operations that must succeed together!

**Related Topics:**
- Learn [JDBC Transaction Management](/tutorial/jdbc-transaction-management) for Java
- Use transactions in [Spring Boot JPA](/springboot/spring-boot-jpa)
- Understand [Hibernate Transactions](/hibernate/hibernate-session) for ORM
- Master [MySQL DML](/mysql/mysql-insert-update-delete) operations

---

## Practice Question

**Q:** Write a transaction to process a refund:
1. Update order status to 'refunded'
2. Add money back to customer account
3. Restore product stock
4. Log the refund

**Answer:**
\`\`\`sql
START TRANSACTION;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    SELECT 'Refund failed' AS message;
END;

-- Update order
UPDATE orders SET status = 'refunded' WHERE id = @order_id;

-- Refund customer
UPDATE customers 
SET balance = balance + (SELECT total_amount FROM orders WHERE id = @order_id)
WHERE id = @customer_id;

-- Restore stock
UPDATE products p
JOIN order_items oi ON p.id = oi.product_id
SET p.stock = p.stock + oi.quantity
WHERE oi.order_id = @order_id;

-- Log refund
INSERT INTO refund_log (order_id, refund_date, amount)
VALUES (@order_id, CURRENT_DATE, (SELECT total_amount FROM orders WHERE id = @order_id));

COMMIT;
SELECT 'Refund processed successfully' AS message;
\`\`\`
---

## Real-World Applications

### Financial Transaction Processing
Banking and financial systems rely heavily on transactions to ensure money transfers are atomic. A transfer must debit one account and credit another - both operations must succeed or both must fail to maintain account balance integrity.

**Implementation Example:**
- Money transfers between accounts (debit and credit in one transaction)
- Payment processing (charge customer and update order status)
- Account balance updates (multiple balance changes together)
- Transaction logging (record transaction and update balances)

### E-Commerce Order Processing
E-commerce platforms use transactions to ensure order processing is atomic. Creating an order, updating inventory, and processing payment must all succeed together to maintain data consistency.

**Implementation Example:**
- Order creation with inventory updates
- Payment processing with order status updates
- Order cancellation with inventory restoration
- Multi-item orders with multiple inventory updates

### Inventory Management
Inventory systems use transactions to ensure stock updates are consistent. When items are sold, inventory must decrease, orders must be created, and related records must be updated atomically.

**Implementation Example:**
- Stock reduction with order creation
- Inventory updates with transaction logging
- Multi-product orders with multiple stock updates
- Inventory adjustments with audit trail creation

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using Transactions for Related Operations
**Problem:** Performing related operations without transactions can leave data inconsistent.

**Solution:** Always use transactions for related operations:

\`\`\`sql
-- GOOD - Transaction ensures consistency
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- BAD - No transaction, can leave inconsistent state
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- If second fails, first already executed!
\`\`\`

### Mistake 2: Forgetting to Commit or Rollback
**Problem:** Leaving transactions open locks resources and can cause deadlocks.

**Solution:** Always commit or rollback transactions:

\`\`\`sql
-- GOOD - Explicit commit
START TRANSACTION;
-- operations
COMMIT;

-- BAD - Transaction left open
START TRANSACTION;
-- operations
-- Missing COMMIT or ROLLBACK!
\`\`\`

### Mistake 3: Using Wrong Isolation Level
**Problem:** Using inappropriate isolation level causes performance issues or data inconsistency.

**Solution:** Choose appropriate isolation level:

\`\`\`sql
-- READ COMMITTED - Good balance (default in many systems)
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- SERIALIZABLE - Highest isolation, but slowest
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a transaction and why is it important?

A transaction is a sequence of database operations executed as a single atomic unit. It's important because it ensures data consistency - either all operations succeed or all fail together. Transactions prevent partial updates that could leave databases in inconsistent states, making them essential for data integrity in multi-step operations.

### What are ACID properties?

ACID stands for Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), and Durability (committed changes are permanent). These properties ensure reliable transaction processing. Understanding ACID is fundamental to database design and application development.

### What's the difference between COMMIT and ROLLBACK?

COMMIT saves all changes made in the transaction, making them permanent. ROLLBACK undoes all changes made in the transaction, returning the database to its state before the transaction started. Use COMMIT when operations succeed, ROLLBACK when errors occur or operations should be cancelled.

### When should I use transactions?

Use transactions for any sequence of related operations that must succeed or fail together: money transfers, order processing, inventory updates, multi-table updates, and any operations where partial success would cause data inconsistency. Single operations typically don't need explicit transactions (auto-commit handles them).

### What is a savepoint?

A savepoint is a point within a transaction that you can rollback to without rolling back the entire transaction. Savepoints enable partial rollback within a transaction, allowing you to undo some operations while keeping others. Use savepoints for complex transactions with multiple logical sections.

### What are transaction isolation levels?

Isolation levels control how transactions interact with each other: READ UNCOMMITTED (lowest isolation, fastest), READ COMMITTED (default, good balance), REPEATABLE READ (higher isolation), SERIALIZABLE (highest isolation, slowest). Choose based on consistency requirements vs performance needs.

### Can I nest transactions in MySQL?

MySQL doesn't support true nested transactions, but you can use savepoints to achieve similar functionality. Savepoints allow you to create checkpoints within a transaction and rollback to specific points without rolling back the entire transaction.

### What happens if a transaction is interrupted?

If a transaction is interrupted (connection lost, server crash), MySQL automatically rolls back uncommitted transactions. Only committed transactions are permanent. This ensures data consistency even in case of failures.

### How do transactions affect performance?

Transactions can impact performance by: (1) holding locks on resources, (2) requiring commit overhead, and (3) isolation level affecting concurrency. Keep transactions short, commit promptly, and choose appropriate isolation levels to balance consistency and performance.

### What is deadlock and how do I prevent it?

Deadlock occurs when two transactions wait for each other's locks indefinitely. Prevent deadlocks by: (1) accessing tables in consistent order, (2) keeping transactions short, (3) using appropriate isolation levels, and (4) handling deadlock errors with retry logic. MySQL automatically detects and resolves deadlocks by rolling back one transaction.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these transaction fundamentals:

- **Transactions ensure atomicity** - all operations succeed or all fail
- **ACID properties** guarantee reliable transaction processing
- **COMMIT saves changes**, ROLLBACK undoes them
- **Use transactions** for related operations that must be atomic
- **Isolation levels** control transaction interaction and performance
- **Savepoints** enable partial rollback within transactions
- **Keep transactions short** to minimize locking and improve performance
- **Handle deadlocks** with retry logic and consistent access patterns
- **Auto-commit** handles single operations automatically

---

## What's Next?

Now that you understand transactions, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Insert Update Delete](/mysql/mysql-insert-update-delete)**: Use transactions with DML operations
2. **[MySQL Constraints](/mysql/mysql-constraints)**: Understand how constraints work with transactions
3. **[MySQL Stored Procedures](/mysql/mysql-stored-procedures)**: Implement transaction logic in procedures
4. **[JDBC Introduction](/tutorial/jdbc-introduction)**: Handle transactions in Java applications

### Advanced Topics

- **Transaction Isolation**: Deep dive into isolation levels and their effects
- **Locking Mechanisms**: Understand how MySQL implements transaction isolation
- **Deadlock Prevention**: Master techniques for avoiding deadlocks
- **Performance Tuning**: Optimize transaction performance

### Related Tutorials

- **[MySQL Introduction](/mysql/mysql-introduction)**: Review database fundamentals
- **[Spring Boot JPA](/springboot/spring-boot-jpa)**: See how JPA manages transactions
- **[Spring Transaction Management](/spring/spring-transaction-management)**: Understand Spring's transaction support
- **[Database Design](/tutorial/database-design)**: Design databases with transactions in mind

Transactions are essential for data integrity. Continue learning about [MySQL Stored Procedures](/mysql/mysql-stored-procedures) to implement transaction logic in database procedures.

---

## 10 Important MySQL Transactions Interview Questions

### 1. What is a database transaction?

**Answer:** A **transaction** is a **logical unit of work**—one or more SQL statements that should **commit** **together** or **roll back** **together**. **Atomicity** means **all-or-nothing**: either every change **persists** or **none** do. **Bank transfers** (debit + credit) are the classic example. **InnoDB** transactions are **ACID**-compliant.

### 2. What does ACID stand for?

**Answer:** **Atomicity** (all-or-nothing commits); **Consistency** (constraints hold when a transaction ends); **Isolation** (concurrent transactions don’t **interfere** beyond allowed phenomena); **Durability** (committed data survives **crashes** after the log is **flushed**). **Interviewers** expect you to **define** each term in **plain English**, not only **acronyms**.

### 3. How do START TRANSACTION, COMMIT, and ROLLBACK work?

**Answer:** **START TRANSACTION** (or **BEGIN**) opens a transaction boundary. **COMMIT** makes changes **permanent** and **releases** locks (subject to isolation). **ROLLBACK** **undoes** work since the transaction **start** (or to a **SAVEPOINT**). **autocommit=1** (default) wraps **each statement** in its **own** transaction unless you **explicitly** begin one.

### 4. What is a transaction isolation level?

**Answer:** Isolation defines **which** **concurrency anomalies** are possible: **dirty reads** (uncommitted data), **non-repeatable reads**, **phantom reads**. **Higher** isolation **reduces** anomalies but **increases** **locking** and **contention**. **Trade-off** between **correctness** and **throughput**.

### 5. Compare READ COMMITTED and REPEATABLE READ in InnoDB.

**Answer:** **REPEATABLE READ** is **InnoDB’s default**: consistent **read snapshot** for the transaction; **phantom** behavior is **limited** by **next-key locking** in many cases. **READ COMMITTED** sees **each** statement’s **fresh** committed data—**fewer** lock **conflicts** but **weaker** guarantees. **Choose** based on **business** tolerance for **anomalies**.

### 6. What is a deadlock?

**Answer:** **Deadlock** occurs when **two or more** transactions **hold** locks the others **need**, forming a **cycle**. **InnoDB** **detects** deadlocks and **rolls back** one transaction (**victim**) to **break** the cycle. **Reduce** deadlocks with **consistent lock order**, **shorter** transactions, and **proper** **indexing**.

### 7. What is autocommit?

**Answer:** When **autocommit** is **ON**, each **standalone** statement **commits** immediately. Turn it **OFF** (or use **explicit** transaction APIs) to **batch** multiple statements **atomically**. **Connection pools** often **reset** autocommit—**watch** for **surprises**.

### 8. What is a SAVEPOINT?

**Answer:** **SAVEPOINT name** marks a **position** inside a transaction; **ROLLBACK TO SAVEPOINT** **undoes** work after that point **without** ending the whole transaction. **Use** for **complex** workflows—**rare** in simple CRUD but **fair** for **advanced** interviews.

### 9. How do JDBC transactions map to MySQL?

**Answer:** **Connection.setAutoCommit(false)** begins **manual** transaction control; **commit()** and **rollback()** end it. **Must** use **try/finally** or try-with-resources to **rollback** on **errors**. **Spring** \`@Transactional\` manages this **declaratively**—still **same** underlying semantics.

### 10. How do you summarize transactions for an interview?

**Answer:** **Transactions** **bundle** related changes; **isolation** controls **how much** of **others’** work you **see** while **in flight**; **locks** and **deadlocks** are the **price** of **concurrency**. **Measure** under **load**, don’t only **recite** definitions.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **DML** | [MySQL INSERT, UPDATE, DELETE](/mysql/mysql-insert-update-delete) |
| **Locks & concurrency** | [Hibernate Locking](/hibernate/hibernate-locking) |
| **JDBC transactions** | [Transaction Management (JDBC)](/tutorial/transaction-management) |
| **Spring @Transactional** | [Spring Boot JPA](/springboot/spring-boot-jpa) |
| **Indexes & contention** | [MySQL Indexes](/mysql/mysql-indexes) |

---

## Test Your Knowledge

Mastered MySQL transactions? Test your skills with our comprehensive [MySQL MCQ Exam](/mysql-mcq) covering transactions, ACID properties, isolation levels, and all MySQL topics!
  `,
  code: `-- MySQL Transactions Examples

CREATE DATABASE transactions_demo;
USE transactions_demo;

CREATE TABLE accounts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    stock INT UNSIGNED DEFAULT 0
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED
);

-- ========== Basic Transaction ==========

-- Money transfer
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check for errors
-- If successful:
COMMIT;

-- If error:
-- ROLLBACK;

-- ========== Order Processing Transaction ==========

START TRANSACTION;

-- Create order
INSERT INTO orders (customer_id, total_amount) VALUES (1, 99.99);
SET @order_id = LAST_INSERT_ID();

-- Add item
INSERT INTO order_items (order_id, product_id, quantity) 
VALUES (@order_id, 5, 1);

-- Update stock
UPDATE products SET stock = stock - 1 WHERE id = 5;

-- Check stock
IF (SELECT stock FROM products WHERE id = 5) < 0 THEN
    ROLLBACK;
ELSE
    COMMIT;
END IF;

-- ========== Savepoints ==========

START TRANSACTION;

INSERT INTO orders (customer_id, total_amount) VALUES (1, 50.00);
SAVEPOINT sp1;

UPDATE products SET stock = stock - 1 WHERE id = 1;
SAVEPOINT sp2;

-- Rollback to savepoint
ROLLBACK TO SAVEPOINT sp1;

-- Continue
COMMIT;

-- ========== Auto-commit Control ==========

-- Disable auto-commit
SET autocommit = 0;

-- Multiple operations
INSERT INTO orders ...;
UPDATE products ...;

-- Must commit
COMMIT;

-- Re-enable
SET autocommit = 1;

-- ========== Isolation Levels ==========

-- Set isolation level
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;
SELECT * FROM orders;
COMMIT;

-- ========== Error Handling ==========

DELIMITER //
CREATE PROCEDURE ProcessOrderWithTransaction(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Transaction failed' AS message;
    END;
    
    START TRANSACTION;
    
    -- Create order
    INSERT INTO orders (customer_id, total_amount) VALUES (p_customer_id, 99.99);
    SET @order_id = LAST_INSERT_ID();
    
    -- Add item
    INSERT INTO order_items (order_id, product_id, quantity) 
    VALUES (@order_id, p_product_id, p_quantity);
    
    -- Update stock
    UPDATE products SET stock = stock - p_quantity WHERE id = p_product_id;
    
    COMMIT;
    SELECT 'Order processed successfully' AS message;
END //
DELIMITER ;
`
};

export default mysqlTransactions;


