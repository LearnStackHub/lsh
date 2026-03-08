const mysqlStoredProcedures = {
  id: 'mysql-stored-procedures',
  title: 'MySQL Stored Procedures',
  description: 'Learn to create and use stored procedures for reusable database logic',
  content: `
# MySQL Stored Procedures - Reusable Database Logic

MySQL stored procedures are precompiled SQL code blocks stored in the database that can be executed by name. Stored procedures encapsulate complex database logic, accept parameters, return results, and can be called from applications or other procedures. They improve performance through precompilation, enhance security by controlling database access, and promote code reusability across multiple applications.

Enterprise applications extensively use stored procedures for complex business logic, data validation, transaction management, and performance-critical operations. Stored procedures enable moving logic from application code to the database, reducing network traffic and centralizing business rules. Understanding stored procedures is essential for building scalable, maintainable database applications.

**Stored Procedure Benefits:**
- **Performance**: Precompiled and optimized for faster execution
- **Security**: Controlled database access through procedures
- **Reusability**: Logic shared across multiple applications
- **Maintainability**: Centralized business logic in database
- **Transaction Management**: Complex multi-step operations

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
SHOW CREATE PROCEDURE GetUserById;

---

## Real-World Applications

### Order Processing Systems
E-commerce platforms use stored procedures for complex order processing logic. Procedures handle order creation, inventory updates, payment processing, and email notifications in a single atomic operation, ensuring data consistency.

**Implementation Example:**
- CreateOrder procedure with inventory validation
- ProcessPayment procedure with transaction handling
- CancelOrder procedure with inventory restoration
- GenerateInvoice procedure with tax calculations

### Data Migration and ETL
Data migration and ETL (Extract, Transform, Load) processes use stored procedures to encapsulate complex transformation logic. Procedures handle data validation, transformation, and loading operations efficiently.

**Implementation Example:**
- ImportData procedure for bulk data loading
- TransformData procedure for data conversion
- ValidateData procedure for data quality checks
- ArchiveData procedure for data archival

### Business Logic Implementation
Enterprise applications move business logic to stored procedures for centralization and performance. Procedures implement complex calculations, validations, and workflows that are shared across multiple applications.

**Implementation Example:**
- CalculateTax procedure for tax computation
- ValidateBusinessRules procedure for rule enforcement
- GenerateReports procedure for report generation
- ProcessWorkflow procedure for workflow automation

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using Transactions in Procedures
**Problem:** Procedures performing multiple operations without transactions can leave data inconsistent.

**Solution:** Always use transactions for multi-step operations:

\`\`\`sql
CREATE PROCEDURE ProcessOrder(...)
BEGIN
    START TRANSACTION;
    -- Multiple operations
    COMMIT;
END
\`\`\`

### Mistake 2: Not Handling Errors
**Problem:** Procedures without error handling fail silently or cause unexpected behavior.

**Solution:** Always include error handlers:

\`\`\`sql
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
    SELECT 'Error occurred' AS message;
END;
\`\`\`

### Mistake 3: Using Procedures for Simple Queries
**Problem:** Creating procedures for simple queries adds unnecessary complexity.

**Solution:** Use procedures for complex logic, not simple queries:

\`\`\`sql
-- AVOID - Simple query doesn't need procedure
CREATE PROCEDURE GetUsers()
BEGIN
    SELECT * FROM users;
END

-- PREFER - Direct query
SELECT * FROM users;
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a stored procedure and why should I use it?

A stored procedure is precompiled SQL code stored in the database that can be executed by name. Use stored procedures for: (1) complex business logic, (2) performance-critical operations, (3) security control, (4) code reusability, and (5) transaction management. Procedures improve performance through precompilation and reduce network traffic by executing logic on the database server.

### What's the difference between stored procedures and functions?

Stored procedures can return multiple result sets, perform DML operations, and don't have to return values. Functions must return a single value, can be used in SQL expressions, and are typically used for calculations. Use procedures for operations, functions for calculations. Learn about [MySQL Functions](/tutorial/mysql-scalar-functions) for function details.

### Can stored procedures call other stored procedures?

Yes, stored procedures can call other stored procedures, enabling modular code organization. This allows you to build complex procedures from simpler ones, promoting code reuse and maintainability. However, avoid deep nesting and circular dependencies.

### How do I pass parameters to stored procedures?

Stored procedures accept three types of parameters: IN (input, default), OUT (output), and INOUT (both input and output). Define parameters in the procedure signature and use them in the procedure body. Parameters enable procedures to work with different data values.

### Can stored procedures return result sets?

Yes, stored procedures can return one or more result sets using SELECT statements. Applications can retrieve these result sets just like regular query results. Multiple result sets enable returning different types of data in a single procedure call.

### What is a cursor and when should I use it?

A cursor is a database object used to iterate through result sets row by row within a stored procedure. Use cursors when you need to process each row individually, but be aware they can be slow. Prefer set-based operations when possible, use cursors only when row-by-row processing is necessary.

### How do I handle errors in stored procedures?

Use DECLARE HANDLER statements to handle errors in stored procedures. EXIT handlers stop execution, CONTINUE handlers allow execution to continue. Handle specific error codes or use SQLEXCEPTION for all errors. Always include error handling for robust procedures.

### Can I use transactions in stored procedures?

Yes, stored procedures can use transactions with START TRANSACTION, COMMIT, and ROLLBACK. Procedures are ideal for complex multi-step operations that require atomicity. Use transactions to ensure all operations succeed or all fail together.

### How do I debug stored procedures?

Debug stored procedures by: (1) using SELECT statements to output variable values, (2) testing procedures with sample data, (3) checking error messages, (4) using SHOW PROCEDURE STATUS to verify procedure exists, and (5) reviewing procedure code with SHOW CREATE PROCEDURE. Consider using MySQL debugging tools for complex procedures.

### Should I use stored procedures or application code?

Use stored procedures for: database-intensive operations, complex business logic shared across applications, performance-critical operations, and security-sensitive operations. Use application code for: user interface logic, external API calls, complex application workflows, and logic that changes frequently. Balance based on your architecture and requirements.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these stored procedure fundamentals:

- **Stored procedures are precompiled** SQL code stored in the database
- **Procedures improve performance** through precompilation and reduced network traffic
- **Parameters enable reusability** with IN, OUT, and INOUT types
- **Error handling is essential** using DECLARE HANDLER statements
- **Transactions ensure atomicity** for multi-step operations
- **Cursors enable row-by-row** processing when needed
- **Procedures can call other procedures** for modular design
- **Use procedures for complex logic**, not simple queries
- **Document procedures clearly** for maintainability

---

## What's Next?

Now that you understand stored procedures, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Triggers](/tutorial/mysql-triggers)**: Learn automated database actions
2. **[MySQL Transactions](/tutorial/mysql-transactions)**: Understand transaction management in procedures
3. **[MySQL Functions](/tutorial/mysql-scalar-functions)**: Compare procedures with functions
4. **[JDBC Introduction](/tutorial/jdbc-introduction)**: Call procedures from Java applications

### Advanced Topics

- **Procedure Optimization**: Master performance tuning techniques
- **Complex Procedures**: Build sophisticated business logic
- **Error Handling**: Advanced error handling patterns
- **Security**: Implement security through procedures

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Views](/tutorial/mysql-views)**: Compare views with procedures
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA works with procedures
- **[Database Design](/tutorial/database-design)**: Design databases with procedures in mind

Stored procedures are essential for complex database logic. Continue learning about [MySQL Triggers](/tutorial/mysql-triggers) to understand automated database actions.
`
};

export default mysqlStoredProcedures;


