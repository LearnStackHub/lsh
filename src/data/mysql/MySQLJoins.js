const mysqlJoins = {
  id: 'mysql-joins',
  title: 'MySQL Joins - Combining Data from Multiple Tables',
  description: 'Master SQL joins: INNER, LEFT, RIGHT, and FULL OUTER joins with real-world examples',
  content: `
# MySQL Joins — Combining Data from Multiple Tables

Joins are essential for retrieving data from multiple related tables. They allow you to combine rows from different tables based on a related column.

---

## Why Joins Are Needed

In a relational database, data is split across multiple tables:
- **Users table** - User information
- **Orders table** - Order information
- **Products table** - Product information

To get complete information, you need to **join** these tables.

---

## Types of Joins

1. **INNER JOIN** - Returns matching rows from both tables
2. **LEFT JOIN** - Returns all rows from left table + matching rows from right
3. **RIGHT JOIN** - Returns all rows from right table + matching rows from left
4. **FULL OUTER JOIN** - Returns all rows from both tables (MySQL doesn't support, use UNION)

---

## 1. INNER JOIN

Returns only rows that have matching values in both tables.

### Syntax

\`\`\`sql
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;
\`\`\`

### Example

\`\`\`sql
-- Get orders with customer names
SELECT 
    o.id AS order_id,
    o.order_date,
    o.total_amount,
    c.name AS customer_name,
    c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

**Result:** Only orders that have a matching customer.

---

## 2. LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table, plus matching rows from the right table. If no match, right table columns are NULL.

### Example

\`\`\`sql
-- Get all customers and their orders (if any)
SELECT 
    c.name AS customer_name,
    c.email,
    o.id AS order_id,
    o.total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

**Result:** All customers, even if they have no orders (order columns will be NULL).

### Real-World Use Case

\`\`\`sql
-- Find customers who haven't placed any orders
SELECT 
    c.name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

---

## 3. RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table, plus matching rows from the left table. If no match, left table columns are NULL.

### Example

\`\`\`sql
-- Get all orders and their customers (if customer exists)
SELECT 
    o.id AS order_id,
    o.total_amount,
    c.name AS customer_name
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;
\`\`\`

**Result:** All orders, even if customer doesn't exist (customer columns will be NULL).

---

## 4. Multiple Table Joins

Join more than two tables.

### Example: E-Commerce Query

\`\`\`sql
-- Get order details with customer and product information
SELECT 
    o.id AS order_id,
    o.order_date,
    c.name AS customer_name,
    p.name AS product_name,
    oi.quantity,
    oi.price,
    o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
ORDER BY o.order_date DESC;
\`\`\`

---

## Complete Real-World Examples

### Example 1: E-Commerce Order Report

\`\`\`sql
-- Get complete order information
SELECT 
    o.id AS order_id,
    o.order_date,
    c.name AS customer_name,
    c.email AS customer_email,
    COUNT(oi.id) AS item_count,
    SUM(oi.quantity * oi.price) AS order_total,
    o.status
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_date, c.name, c.email, o.status
ORDER BY o.order_date DESC;
\`\`\`

### Example 2: Product Sales Report

\`\`\`sql
-- Get product sales statistics
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.id, p.name, p.category
ORDER BY total_revenue DESC;
\`\`\`

### Example 3: Customer Purchase History

\`\`\`sql
-- Get customer's complete purchase history
SELECT 
    c.name AS customer_name,
    o.order_date,
    p.name AS product_name,
    oi.quantity,
    oi.price AS unit_price,
    (oi.quantity * oi.price) AS line_total
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE c.id = 1
ORDER BY o.order_date DESC, p.name;
\`\`\`

---

## JOIN vs WHERE (Old Syntax)

### Modern JOIN Syntax (Recommended)

\`\`\`sql
SELECT *
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

### Old WHERE Syntax (Still Works)

\`\`\`sql
SELECT *
FROM orders o, customers c
WHERE o.customer_id = c.id;
\`\`\`

**Recommendation:** Use modern JOIN syntax - it's clearer and more readable.

---

## Self JOIN

Join a table with itself.

### Example: Employee Hierarchy

\`\`\`sql
-- Get employees with their managers
SELECT 
    e.name AS employee_name,
    e.position,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

---

## JOIN Performance Tips

### 1. Use Indexes

\`\`\`sql
-- Create indexes on join columns
CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_product_id ON order_items(product_id);
\`\`\`

### 2. Select Only Needed Columns

\`\`\`sql
-- Good
SELECT c.name, o.total_amount FROM customers c JOIN orders o...

-- Bad (unless you need all)
SELECT * FROM customers c JOIN orders o...
\`\`\`

### 3. Use WHERE to Filter Early

\`\`\`sql
-- Good - filters before join
SELECT * FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.city = 'New York';

-- Less efficient - joins all then filters
SELECT * FROM customers c
JOIN orders o ON c.id = o.customer_id;
-- Then filter in application
\`\`\`

---

## Common JOIN Patterns

### Pattern 1: Get Related Data

\`\`\`sql
-- Get orders with customer info
SELECT o.*, c.name, c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

### Pattern 2: Find Missing Relationships

\`\`\`sql
-- Customers without orders
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

### Pattern 3: Aggregate with JOIN

\`\`\`sql
-- Total sales per customer
SELECT 
    c.name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`

---

## Summary

**INNER JOIN:**
- Returns matching rows from both tables
- Most common join type
- Use when you need data from both tables

**LEFT JOIN:**
- Returns all rows from left table
- Right table columns NULL if no match
- Use to find missing relationships

**RIGHT JOIN:**
- Returns all rows from right table
- Left table columns NULL if no match
- Less commonly used

**Multiple Joins:**
- Join 3+ tables for complex queries
- Use aliases for readability
- Add indexes for performance

Master joins, and you can query any relational data!

---

## Practice Question

**Q:** Write a query to find the top 5 customers by total spending, showing their name, email, number of orders, and total amount spent. Include customers even if they have no orders.

**Answer:**
\`\`\`sql
SELECT 
    c.name AS customer_name,
    c.email,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 5;
\`\`\`
  `,
  code: `-- MySQL Joins Examples

-- Create database and tables
CREATE DATABASE IF NOT EXISTS joins_demo;
USE joins_demo;

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(100)
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data
INSERT INTO customers (name, email, city) VALUES
('John Doe', 'john@example.com', 'New York'),
('Jane Smith', 'jane@example.com', 'Los Angeles'),
('Bob Johnson', 'bob@example.com', 'Chicago'),
('Alice Brown', 'alice@example.com', 'New York');

INSERT INTO products (name, price, category) VALUES
('Laptop', 999.99, 'Electronics'),
('Mouse', 29.99, 'Electronics'),
('Keyboard', 79.99, 'Electronics'),
('Desk', 199.99, 'Furniture');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 999.99, 'completed'),
(2, '2024-01-16', 109.98, 'completed'),
(1, '2024-01-17', 199.99, 'pending'),
(3, '2024-01-18', 79.99, 'completed');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 999.99),
(2, 2, 2, 29.99),
(2, 3, 1, 79.99),
(3, 4, 1, 199.99),
(4, 3, 1, 79.99);

-- ========== INNER JOIN ==========

-- Get orders with customer names
SELECT 
    o.id AS order_id,
    o.order_date,
    o.total_amount,
    c.name AS customer_name,
    c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;

-- ========== LEFT JOIN ==========

-- Get all customers and their orders
SELECT 
    c.name AS customer_name,
    c.email,
    o.id AS order_id,
    o.total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- Find customers without orders
SELECT 
    c.name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- ========== RIGHT JOIN ==========

-- Get all orders with customer info
SELECT 
    o.id AS order_id,
    o.total_amount,
    c.name AS customer_name
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;

-- ========== Multiple Table Joins ==========

-- Complete order details
SELECT 
    o.id AS order_id,
    o.order_date,
    c.name AS customer_name,
    p.name AS product_name,
    oi.quantity,
    oi.price AS unit_price,
    (oi.quantity * oi.price) AS line_total
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
ORDER BY o.order_date DESC;

-- ========== Aggregate with JOIN ==========

-- Total sales per customer
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;

-- Product sales statistics
SELECT 
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.id, p.name, p.category
ORDER BY total_revenue DESC;

-- ========== Self JOIN Example ==========

CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INT UNSIGNED,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO employees (name, manager_id) VALUES
('CEO', NULL),
('Manager 1', 1),
('Manager 2', 1),
('Employee 1', 2),
('Employee 2', 2);

-- Get employees with managers
SELECT 
    e.name AS employee_name,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- ========== Complex Real-World Query ==========

-- Customer purchase history with product details
SELECT 
    c.name AS customer_name,
    o.order_date,
    p.name AS product_name,
    p.category,
    oi.quantity,
    oi.price AS unit_price,
    (oi.quantity * oi.price) AS line_total,
    o.status
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE c.id = 1
ORDER BY o.order_date DESC, p.name;
\`\`\`

---

## What's Next?

Master these related MySQL topics:

1. **[MySQL Subqueries](/tutorial/mysql-subqueries)** - Nested queries for complex data retrieval
2. **[MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions)** - COUNT, SUM, AVG, MIN, MAX
3. **[MySQL Clauses](/tutorial/mysql-clauses)** - WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
4. **[MySQL Constraints](/tutorial/mysql-constraints)** - PRIMARY KEY, FOREIGN KEY, UNIQUE
5. **[MySQL Indexes](/tutorial/mysql-indexes)** - Improve query performance

**Connect to Java:**
- Use joins in [JDBC](/tutorial/jdbc-introduction) queries
- Spring Boot JPA handles joins automatically - see [Spring Boot JPA](/tutorial/spring-boot-jpa)
`
};

export default mysqlJoins;
