const mysqlStoredProcedures = {
  id: 'mysql-stored-procedures',
  title: 'MySQL Stored Procedures',
  description: 'Learn to create and use stored procedures for reusable database logic',
  content: `
# MySQL Stored Procedures — Reusable Database Logic

Stored procedures are precompiled SQL statements stored in the database. They allow you to encapsulate complex logic and execute it efficiently.

---

## What are Stored Procedures?

**Stored Procedures** are:
- Precompiled SQL code stored in database
- Reusable across applications
- Can accept parameters
- Can return results
- Improve performance (compiled once)
- Enhance security (controlled access)

---

## Creating Stored Procedures

### Basic Syntax

\`\`\`sql
DELIMITER //
CREATE PROCEDURE procedure_name()
BEGIN
    -- SQL statements
END //
DELIMITER ;
\`\`\`

### Simple Example

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM users;
END //
DELIMITER ;

-- Call the procedure
CALL GetAllUsers();
\`\`\`

---

## Procedures with Parameters

### IN Parameters (Input)

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetUserById(IN user_id INT)
BEGIN
    SELECT * FROM users WHERE id = user_id;
END //
DELIMITER ;

-- Call with parameter
CALL GetUserById(1);
\`\`\`

### OUT Parameters (Output)

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetUserCount(OUT total_count INT)
BEGIN
    SELECT COUNT(*) INTO total_count FROM users;
END //
DELIMITER ;

-- Call and get output
CALL GetUserCount(@count);
SELECT @count AS total_users;
\`\`\`

### INOUT Parameters (Input/Output)

\`\`\`sql
DELIMITER //
CREATE PROCEDURE IncrementCounter(INOUT counter INT)
BEGIN
    SET counter = counter + 1;
END //
DELIMITER ;

-- Use INOUT
SET @num = 5;
CALL IncrementCounter(@num);
SELECT @num;  -- Returns 6
\`\`\`

---

## Real-World Examples

### Example 1: Create Order Procedure

\`\`\`sql
DELIMITER //
CREATE PROCEDURE CreateOrder(
    IN p_customer_id INT,
    IN p_total_amount DECIMAL(10, 2),
    OUT p_order_id INT
)
BEGIN
    INSERT INTO orders (customer_id, order_date, total_amount, status)
    VALUES (p_customer_id, CURRENT_DATE, p_total_amount, 'pending');
    
    SET p_order_id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Use the procedure
CALL CreateOrder(1, 99.99, @new_order_id);
SELECT @new_order_id;
\`\`\`

### Example 2: Update Product Stock

\`\`\`sql
DELIMITER //
CREATE PROCEDURE UpdateProductStock(
    IN p_product_id INT,
    IN p_quantity INT,
    OUT p_success TINYINT
)
BEGIN
    DECLARE current_stock INT;
    
    -- Get current stock
    SELECT stock INTO current_stock FROM products WHERE id = p_product_id;
    
    -- Check if enough stock
    IF current_stock >= p_quantity THEN
        UPDATE products 
        SET stock = stock - p_quantity 
        WHERE id = p_product_id;
        SET p_success = 1;
    ELSE
        SET p_success = 0;
    END IF;
END //
DELIMITER ;

-- Use the procedure
CALL UpdateProductStock(1, 5, @success);
SELECT @success;
\`\`\`

### Example 3: Get Customer Statistics

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetCustomerStats(
    IN p_customer_id INT,
    OUT p_order_count INT,
    OUT p_total_spent DECIMAL(10, 2),
    OUT p_avg_order_value DECIMAL(10, 2)
)
BEGIN
    SELECT 
        COUNT(*),
        COALESCE(SUM(total_amount), 0),
        COALESCE(AVG(total_amount), 0)
    INTO 
        p_order_count,
        p_total_spent,
        p_avg_order_value
    FROM orders
    WHERE customer_id = p_customer_id AND status = 'completed';
END //
DELIMITER ;

-- Call procedure
CALL GetCustomerStats(1, @order_count, @total_spent, @avg_value);
SELECT @order_count, @total_spent, @avg_value;
\`\`\`

---

## Control Flow in Procedures

### IF-ELSE

\`\`\`sql
DELIMITER //
CREATE PROCEDURE CheckStock(IN p_product_id INT)
BEGIN
    DECLARE product_stock INT;
    SELECT stock INTO product_stock FROM products WHERE id = p_product_id;
    
    IF product_stock > 10 THEN
        SELECT 'In Stock' AS status;
    ELSEIF product_stock > 0 THEN
        SELECT 'Low Stock' AS status;
    ELSE
        SELECT 'Out of Stock' AS status;
    END IF;
END //
DELIMITER ;
\`\`\`

### CASE Statement

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetOrderStatus(IN p_order_id INT)
BEGIN
    DECLARE order_status VARCHAR(20);
    SELECT status INTO order_status FROM orders WHERE id = p_order_id;
    
    CASE order_status
        WHEN 'pending' THEN SELECT 'Order is pending' AS message;
        WHEN 'processing' THEN SELECT 'Order is being processed' AS message;
        WHEN 'shipped' THEN SELECT 'Order has been shipped' AS message;
        WHEN 'delivered' THEN SELECT 'Order has been delivered' AS message;
        ELSE SELECT 'Unknown status' AS message;
    END CASE;
END //
DELIMITER ;
\`\`\`

### WHILE Loop

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GenerateTestData(IN p_count INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    
    WHILE i <= p_count DO
        INSERT INTO products (name, price) 
        VALUES (CONCAT('Product ', i), RAND() * 100);
        SET i = i + 1;
    END WHILE;
END //
DELIMITER ;
\`\`\`

### REPEAT Loop

\`\`\`sql
DELIMITER //
CREATE PROCEDURE ProcessUntilDone()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE counter INT DEFAULT 0;
    
    REPEAT
        SET counter = counter + 1;
        -- Process logic here
        IF counter >= 10 THEN
            SET done = 1;
        END IF;
    UNTIL done END REPEAT;
END //
DELIMITER ;
\`\`\`

---

## Cursors (Iterating Through Results)

\`\`\`sql
DELIMITER //
CREATE PROCEDURE ProcessAllOrders()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE order_id INT;
    DECLARE order_total DECIMAL(10, 2);
    
    -- Declare cursor
    DECLARE order_cursor CURSOR FOR
        SELECT id, total_amount FROM orders WHERE status = 'pending';
    
    -- Declare handler
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    OPEN order_cursor;
    
    read_loop: LOOP
        FETCH order_cursor INTO order_id, order_total;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Process each order
        -- Example: Update status, send notification, etc.
        UPDATE orders SET status = 'processing' WHERE id = order_id;
    END LOOP;
    
    CLOSE order_cursor;
END //
DELIMITER ;
\`\`\`

---

## Error Handling

\`\`\`sql
DELIMITER //
CREATE PROCEDURE SafeInsert(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred' AS message;
    END;
    
    START TRANSACTION;
    
    INSERT INTO users (name, email) VALUES (p_name, p_email);
    
    COMMIT;
    SELECT 'User inserted successfully' AS message;
END //
DELIMITER ;
\`\`\`

---

## Viewing and Managing Procedures

\`\`\`sql
-- Show all procedures
SHOW PROCEDURE STATUS WHERE Db = 'your_database';

-- Show procedure definition
SHOW CREATE PROCEDURE procedure_name;

-- Drop procedure
DROP PROCEDURE IF EXISTS procedure_name;
\`\`\`

---

## Best Practices

### 1. Use Meaningful Names
\`\`\`sql
-- Good
CREATE PROCEDURE GetCustomerOrders(...)

-- Bad
CREATE PROCEDURE proc1(...)
\`\`\`

### 2. Document Procedures
\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetUserById(IN user_id INT)
COMMENT 'Retrieves user information by ID'
BEGIN
    -- Procedure logic
END //
DELIMITER ;
\`\`\`

### 3. Handle Errors
Always include error handling for critical operations.

### 4. Use Transactions
Wrap multiple operations in transactions.

---

## Summary

Stored procedures provide:
- **Reusability** - Write once, use many times
- **Performance** - Precompiled and optimized
- **Security** - Controlled database access
- **Complex Logic** - IF, CASE, loops, cursors
- **Error Handling** - Robust error management

Master stored procedures, and you can build powerful database logic!

**Related Topics:**
- Learn [MySQL Triggers](/tutorial/mysql-triggers) for automated actions
- Use [MySQL Functions](/tutorial/mysql-scalar-functions) within procedures
- Combine with [MySQL Transactions](/tutorial/mysql-transactions) for data integrity
- Call from Java using [JDBC PreparedStatement](/tutorial/jdbc-prepared-statement)

---

## Practice Question

**Q:** Create a stored procedure that:
1. Takes customer_id and product_id as input
2. Checks if product is in stock
3. Creates an order if stock is available
4. Updates product stock
5. Returns order_id and success status

**Answer:**
\`\`\`sql
DELIMITER //
CREATE PROCEDURE PlaceOrder(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    OUT p_order_id INT,
    OUT p_success TINYINT
)
BEGIN
    DECLARE product_stock INT;
    DECLARE product_price DECIMAL(10, 2);
    DECLARE order_total DECIMAL(10, 2);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = 0;
    END;
    
    START TRANSACTION;
    
    -- Get product stock and price
    SELECT stock, price INTO product_stock, product_price
    FROM products WHERE id = p_product_id;
    
    -- Check stock
    IF product_stock >= p_quantity THEN
        -- Calculate total
        SET order_total = product_price * p_quantity;
        
        -- Create order
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (p_customer_id, CURRENT_DATE, order_total, 'pending');
        SET p_order_id = LAST_INSERT_ID();
        
        -- Add order item
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (p_order_id, p_product_id, p_quantity, product_price);
        
        -- Update stock
        UPDATE products SET stock = stock - p_quantity WHERE id = p_product_id;
        
        SET p_success = 1;
        COMMIT;
    ELSE
        SET p_success = 0;
        ROLLBACK;
    END IF;
END //
DELIMITER ;
\`\`\`
  `,
  code: `-- MySQL Stored Procedures Examples

CREATE DATABASE procedures_demo;
USE procedures_demo;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED DEFAULT 0
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ========== Basic Procedures ==========

-- Simple procedure
DELIMITER //
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM users;
END //
DELIMITER ;

-- Procedure with IN parameter
DELIMITER //
CREATE PROCEDURE GetUserById(IN user_id INT)
BEGIN
    SELECT * FROM users WHERE id = user_id;
END //
DELIMITER ;

-- Procedure with OUT parameter
DELIMITER //
CREATE PROCEDURE GetUserCount(OUT total_count INT)
BEGIN
    SELECT COUNT(*) INTO total_count FROM users;
END //
DELIMITER ;

-- ========== Real-World Procedures ==========

-- Create order procedure
DELIMITER //
CREATE PROCEDURE CreateOrder(
    IN p_user_id INT,
    IN p_total_amount DECIMAL(10, 2),
    OUT p_order_id INT
)
BEGIN
    INSERT INTO orders (user_id, order_date, total_amount, status)
    VALUES (p_user_id, CURRENT_DATE, p_total_amount, 'pending');
    
    SET p_order_id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Update stock procedure
DELIMITER //
CREATE PROCEDURE UpdateStock(
    IN p_product_id INT,
    IN p_quantity INT,
    OUT p_success TINYINT
)
BEGIN
    DECLARE current_stock INT;
    
    SELECT stock INTO current_stock FROM products WHERE id = p_product_id;
    
    IF current_stock >= p_quantity THEN
        UPDATE products SET stock = stock - p_quantity WHERE id = p_product_id;
        SET p_success = 1;
    ELSE
        SET p_success = 0;
    END IF;
END //
DELIMITER ;

-- ========== Control Flow ==========

-- IF-ELSE
DELIMITER //
CREATE PROCEDURE CheckStock(IN p_product_id INT)
BEGIN
    DECLARE product_stock INT;
    SELECT stock INTO product_stock FROM products WHERE id = p_product_id;
    
    IF product_stock > 10 THEN
        SELECT 'In Stock' AS status;
    ELSEIF product_stock > 0 THEN
        SELECT 'Low Stock' AS status;
    ELSE
        SELECT 'Out of Stock' AS status;
    END IF;
END //
DELIMITER ;

-- CASE
DELIMITER //
CREATE PROCEDURE GetOrderStatus(IN p_order_id INT)
BEGIN
    DECLARE order_status VARCHAR(20);
    SELECT status INTO order_status FROM orders WHERE id = p_order_id;
    
    CASE order_status
        WHEN 'pending' THEN SELECT 'Order is pending' AS message;
        WHEN 'processing' THEN SELECT 'Order is being processed' AS message;
        ELSE SELECT 'Order status: ' || order_status AS message;
    END CASE;
END //
DELIMITER ;

-- WHILE loop
DELIMITER //
CREATE PROCEDURE GenerateTestUsers(IN p_count INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    
    WHILE i <= p_count DO
        INSERT INTO users (name, email) 
        VALUES (CONCAT('User ', i), CONCAT('user', i, '@example.com'));
        SET i = i + 1;
    END WHILE;
END //
DELIMITER ;

-- ========== Cursor Example ==========

DELIMITER //
CREATE PROCEDURE ProcessPendingOrders()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE order_id INT;
    DECLARE order_total DECIMAL(10, 2);
    
    DECLARE order_cursor CURSOR FOR
        SELECT id, total_amount FROM orders WHERE status = 'pending';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    OPEN order_cursor;
    
    read_loop: LOOP
        FETCH order_cursor INTO order_id, order_total;
        IF done THEN LEAVE read_loop; END IF;
        
        -- Process order
        UPDATE orders SET status = 'processing' WHERE id = order_id;
    END LOOP;
    
    CLOSE order_cursor;
END //
DELIMITER ;

-- ========== Error Handling ==========

DELIMITER //
CREATE PROCEDURE SafeInsertUser(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error: User insertion failed' AS message;
    END;
    
    START TRANSACTION;
    INSERT INTO users (name, email) VALUES (p_name, p_email);
    COMMIT;
    SELECT 'User inserted successfully' AS message;
END //
DELIMITER ;

-- ========== Using Procedures ==========

-- Call simple procedure
CALL GetAllUsers();

-- Call with parameter
CALL GetUserById(1);

-- Call with output
CALL GetUserCount(@count);
SELECT @count AS total_users;

-- Create order
CALL CreateOrder(1, 99.99, @order_id);
SELECT @order_id;

-- View procedures
SHOW PROCEDURE STATUS WHERE Db = 'procedures_demo';
SHOW CREATE PROCEDURE GetUserById;`
};

export default mysqlStoredProcedures;


