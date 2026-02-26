const mysqlTransactions = {
  id: 'mysql-transactions',
  title: 'MySQL Transactions - ACID Properties',
  description: 'Master transactions to ensure data consistency and handle concurrent operations',
  content: `
# MySQL Transactions — Ensuring Data Consistency

Transactions ensure that a series of database operations either all succeed or all fail. This maintains data integrity and consistency.

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
- Use transactions in [Spring Boot JPA](/tutorial/spring-boot-jpa)
- Understand [Hibernate Transactions](/tutorial/hibernate-session) for ORM
- Master [MySQL DML](/tutorial/mysql-insert-update-delete) operations

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
DELIMITER ;`
};

export default mysqlTransactions;


