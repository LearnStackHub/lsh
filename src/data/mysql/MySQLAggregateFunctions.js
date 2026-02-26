const mysqlAggregateFunctions = {
  id: 'mysql-aggregate-functions',
  title: 'MySQL Aggregate Functions',
  description: 'Master aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT for data analysis',
  content: `
# MySQL Aggregate Functions — Analyzing Data

Aggregate functions perform calculations on a set of rows and return a single value. They're essential for data analysis and reporting.

---

## What are Aggregate Functions?

Aggregate functions operate on multiple rows and return a single result:
- **COUNT** - Count rows
- **SUM** - Sum of values
- **AVG** - Average of values
- **MIN** - Minimum value
- **MAX** - Maximum value
- **GROUP_CONCAT** - Concatenate values

---

## 1. COUNT()

Counts the number of rows.

### Basic COUNT

\`\`\`sql
-- Count all rows
SELECT COUNT(*) FROM users;

-- Count non-NULL values
SELECT COUNT(email) FROM users;

-- Count with condition
SELECT COUNT(*) FROM users WHERE age > 25;
\`\`\`

### COUNT with DISTINCT

\`\`\`sql
-- Count unique cities
SELECT COUNT(DISTINCT city) FROM users;

-- Count unique customers who placed orders
SELECT COUNT(DISTINCT customer_id) FROM orders;
\`\`\`

---

## 2. SUM()

Calculates the sum of numeric values.

\`\`\`sql
-- Sum of all prices
SELECT SUM(price) FROM products;

-- Sum with condition
SELECT SUM(total_amount) FROM orders WHERE status = 'completed';

-- Sum with calculation
SELECT SUM(quantity * price) AS total_revenue FROM order_items;
\`\`\`

---

## 3. AVG()

Calculates the average of numeric values.

\`\`\`sql
-- Average age
SELECT AVG(age) FROM users;

-- Average price
SELECT AVG(price) FROM products;

-- Average with condition
SELECT AVG(total_amount) FROM orders WHERE status = 'completed';
\`\`\`

---

## 4. MIN() and MAX()

Find minimum and maximum values.

\`\`\`sql
-- Minimum price
SELECT MIN(price) FROM products;

-- Maximum age
SELECT MAX(age) FROM users;

-- Get product with minimum price
SELECT * FROM products WHERE price = (SELECT MIN(price) FROM products);

-- Get product with maximum price
SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);
\`\`\`

---

## 5. GROUP_CONCAT()

Concatenates values from multiple rows into a single string.

\`\`\`sql
-- List all product names in a category
SELECT 
    category,
    GROUP_CONCAT(name) AS products
FROM products
GROUP BY category;

-- With separator
SELECT 
    category,
    GROUP_CONCAT(name SEPARATOR ', ') AS products
FROM products
GROUP BY category;

-- With ordering
SELECT 
    category,
    GROUP_CONCAT(name ORDER BY price DESC SEPARATOR ', ') AS products
FROM products
GROUP BY category;
\`\`\`

---

## GROUP BY with Aggregate Functions

Group rows and apply aggregate functions to each group.

### Basic GROUP BY

\`\`\`sql
-- Count users by city
SELECT city, COUNT(*) AS user_count 
FROM users 
GROUP BY city;

-- Average price by category
SELECT category, AVG(price) AS avg_price 
FROM products 
GROUP BY category;

-- Total sales by customer
SELECT customer_id, SUM(total_amount) AS total_spent 
FROM orders 
GROUP BY customer_id;
\`\`\`

### Multiple Column GROUP BY

\`\`\`sql
-- Count orders by customer and status
SELECT 
    customer_id,
    status,
    COUNT(*) AS order_count
FROM orders
GROUP BY customer_id, status;
\`\`\`

---

## HAVING Clause

Filters groups after GROUP BY (similar to WHERE but for groups).

\`\`\`sql
-- Cities with more than 10 users
SELECT city, COUNT(*) AS user_count 
FROM users 
GROUP BY city 
HAVING COUNT(*) > 10;

-- Categories with average price > 100
SELECT category, AVG(price) AS avg_price 
FROM products 
GROUP BY category 
HAVING AVG(price) > 100;

-- Customers who spent more than $1000
SELECT customer_id, SUM(total_amount) AS total_spent 
FROM orders 
GROUP BY customer_id 
HAVING SUM(total_amount) > 1000;
\`\`\`

**WHERE vs HAVING:**
- **WHERE** - Filters rows before grouping
- **HAVING** - Filters groups after grouping

---

## Multiple Aggregate Functions

Use multiple aggregate functions in one query.

\`\`\`sql
-- Product statistics
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;
\`\`\`

---

## Real-World Examples

### Example 1: Sales Report

\`\`\`sql
-- Monthly sales report
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value,
    MIN(total_amount) AS min_order,
    MAX(total_amount) AS max_order
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
\`\`\`

### Example 2: Customer Analytics

\`\`\`sql
-- Customer purchase statistics
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value,
    MIN(o.order_date) AS first_order,
    MAX(o.order_date) AS last_order
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC;
\`\`\`

### Example 3: Product Performance

\`\`\`sql
-- Product sales analysis
SELECT 
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue,
    AVG(oi.price) AS avg_selling_price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.id, p.name, p.category
ORDER BY total_revenue DESC;
\`\`\`

### Example 4: Category Analysis

\`\`\`sql
-- Category statistics
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(stock) AS total_stock,
    AVG(price) AS avg_price,
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive,
    SUM(price * stock) AS inventory_value
FROM products
WHERE is_active = 1
GROUP BY category
HAVING COUNT(*) > 5
ORDER BY inventory_value DESC;
\`\`\`

---

## Aggregate Functions with JOINs

\`\`\`sql
-- Total revenue by customer with customer details
SELECT 
    c.name AS customer_name,
    c.email,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_revenue,
    AVG(o.total_amount) AS avg_order_value
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
GROUP BY c.id, c.name, c.email
ORDER BY total_revenue DESC;
\`\`\`

---

## Conditional Aggregation

Use CASE with aggregate functions.

\`\`\`sql
-- Count by status
SELECT 
    COUNT(*) AS total_orders,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders
FROM orders;

-- Revenue by status
SELECT 
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_revenue,
    SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS pending_revenue
FROM orders;
\`\`\`

---

## Best Practices

### 1. Use GROUP BY with Aggregate Functions
\`\`\`sql
-- Good
SELECT category, COUNT(*) FROM products GROUP BY category;

-- Bad (won't work as expected)
SELECT category, COUNT(*) FROM products;
\`\`\`

### 2. Include All Non-Aggregate Columns in GROUP BY
\`\`\`sql
-- Good
SELECT category, name, COUNT(*) FROM products GROUP BY category, name;

-- Bad (MySQL 5.7+ strict mode will error)
SELECT category, name, COUNT(*) FROM products GROUP BY category;
\`\`\`

### 3. Use HAVING for Group Filters
\`\`\`sql
-- Good
SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;

-- Less efficient
SELECT * FROM (
    SELECT category, AVG(price) AS avg_price FROM products GROUP BY category
) AS subquery WHERE avg_price > 100;
\`\`\`

---

## Summary

**Aggregate Functions:**
- **COUNT()** - Count rows
- **SUM()** - Sum values
- **AVG()** - Average values
- **MIN()** - Minimum value
- **MAX()** - Maximum value
- **GROUP_CONCAT()** - Concatenate values

**Key Concepts:**
- Use with **GROUP BY** for grouped analysis
- Use **HAVING** to filter groups
- Combine multiple functions for comprehensive reports
- Use with **JOINs** for complex analysis

Master aggregate functions, and you can analyze any data!

**Related Topics:**
- Learn [MySQL Clauses](/tutorial/mysql-clauses) - GROUP BY, HAVING, ORDER BY
- Combine with [MySQL Joins](/tutorial/mysql-joins) for complex analysis
- Use in [MySQL Subqueries](/tutorial/mysql-subqueries) for advanced queries
- Query from Java with [JDBC](/tutorial/jdbc-introduction) and [Spring Boot JPA](/tutorial/spring-boot-jpa)

---

## Practice Question

**Q:** Write a query to find the top 3 product categories by total revenue, showing category name, number of products, total quantity sold, and total revenue. Only include categories with at least 10 products sold.

**Answer:**
\`\`\`sql
SELECT 
    p.category,
    COUNT(DISTINCT p.id) AS product_count,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.category
HAVING SUM(oi.quantity) >= 10
ORDER BY total_revenue DESC
LIMIT 3;
\`\`\`
  `,
  code: `-- MySQL Aggregate Functions Examples

CREATE DATABASE aggregate_demo;
USE aggregate_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED DEFAULT 0,
    category VARCHAR(50)
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert sample data
INSERT INTO products (name, price, stock, category) VALUES
('Laptop', 999.99, 50, 'Electronics'),
('Mouse', 29.99, 100, 'Electronics'),
('Keyboard', 79.99, 75, 'Electronics'),
('Desk', 199.99, 30, 'Furniture'),
('Chair', 149.99, 40, 'Furniture');

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

-- ========== COUNT Examples ==========

-- Count all rows
SELECT COUNT(*) FROM products;

-- Count with condition
SELECT COUNT(*) FROM products WHERE price > 100;

-- Count distinct
SELECT COUNT(DISTINCT category) FROM products;

-- Count by group
SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;

-- ========== SUM Examples ==========

-- Sum all prices
SELECT SUM(price) FROM products;

-- Sum with condition
SELECT SUM(total_amount) FROM orders WHERE status = 'completed';

-- Sum with calculation
SELECT SUM(quantity * price) AS total_revenue FROM order_items;

-- Sum by group
SELECT category, SUM(price) AS total_value FROM products GROUP BY category;

-- ========== AVG Examples ==========

-- Average price
SELECT AVG(price) FROM products;

-- Average by category
SELECT category, AVG(price) AS avg_price FROM products GROUP BY category;

-- Average order value
SELECT AVG(total_amount) FROM orders WHERE status = 'completed';

-- ========== MIN and MAX Examples ==========

-- Minimum and maximum price
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive FROM products;

-- By category
SELECT 
    category,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    AVG(price) AS avg_price
FROM products
GROUP BY category;

-- ========== GROUP_CONCAT Examples ==========

-- List all products in category
SELECT 
    category,
    GROUP_CONCAT(name) AS products
FROM products
GROUP BY category;

-- With separator and ordering
SELECT 
    category,
    GROUP_CONCAT(name ORDER BY price DESC SEPARATOR ', ') AS products
FROM products
GROUP BY category;

-- ========== HAVING Examples ==========

-- Categories with more than 2 products
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;

-- Categories with average price > 100
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- ========== Multiple Aggregate Functions ==========

-- Complete statistics
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(stock) AS total_stock,
    AVG(price) AS avg_price,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    SUM(price * stock) AS inventory_value
FROM products
GROUP BY category;

-- ========== Real-World Examples ==========

-- Sales report by month
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;

-- Product sales analysis
SELECT 
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category
ORDER BY total_revenue DESC;

-- Conditional aggregation
SELECT 
    COUNT(*) AS total_orders,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS revenue
FROM orders;`
};

export default mysqlAggregateFunctions;


