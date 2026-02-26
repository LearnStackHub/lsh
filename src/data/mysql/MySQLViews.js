const mysqlViews = {
  id: 'mysql-views',
  title: 'MySQL Views - Virtual Tables',
  description: 'Learn how to create and use views to simplify complex queries and improve security',
  content: `
# MySQL Views — Virtual Tables for Simplified Queries

A **view** is a virtual table based on the result of a SQL query. It doesn't store data itself but provides a way to simplify complex queries and control data access.

---

## What is a View?

A view is a **saved query** that acts like a table. You can query a view just like a regular table.

**Benefits:**
- ✅ Simplify complex queries
- ✅ Improve security (hide sensitive data)
- ✅ Reusable query logic
- ✅ Abstract table structure changes

---

## Creating Views

### Basic Syntax

\`\`\`sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
\`\`\`

### Simple Example

\`\`\`sql
-- Create view for active products
CREATE VIEW active_products AS
SELECT id, name, price, stock
FROM products
WHERE is_active = 1;

-- Use the view
SELECT * FROM active_products;
\`\`\`

---

## Real-World Examples

### Example 1: Customer Order Summary

\`\`\`sql
-- Create view for customer order summary
CREATE VIEW customer_order_summary AS
SELECT 
    c.id AS customer_id,
    c.name AS customer_name,
    c.email,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email;

-- Query the view
SELECT * FROM customer_order_summary 
WHERE total_spent > 1000
ORDER BY total_spent DESC;
\`\`\`

### Example 2: Product Sales View

\`\`\`sql
-- Product sales statistics
CREATE VIEW product_sales_view AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue,
    AVG(oi.price) AS avg_selling_price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.id, p.name, p.category;

-- Use the view
SELECT * FROM product_sales_view 
WHERE total_revenue > 5000
ORDER BY total_revenue DESC;
\`\`\`

### Example 3: Recent Orders View

\`\`\`sql
-- Recent orders with customer details
CREATE VIEW recent_orders AS
SELECT 
    o.id AS order_id,
    o.order_date,
    c.name AS customer_name,
    c.email AS customer_email,
    o.total_amount,
    o.status,
    COUNT(oi.id) AS item_count
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY o.id, o.order_date, c.name, c.email, o.total_amount, o.status;

-- Query recent orders
SELECT * FROM recent_orders 
WHERE status = 'completed'
ORDER BY order_date DESC;
\`\`\`

---

## Viewing Views

\`\`\`sql
-- Show all views
SHOW FULL TABLES WHERE Table_type = 'VIEW';

-- Show view definition
SHOW CREATE VIEW view_name;

-- Describe view structure
DESCRIBE view_name;
\`\`\`

---

## Updating Views

### CREATE OR REPLACE

\`\`\`sql
-- Update view definition
CREATE OR REPLACE VIEW active_products AS
SELECT id, name, price, stock, category
FROM products
WHERE is_active = 1 AND stock > 0;
\`\`\`

### ALTER VIEW

\`\`\`sql
-- Alter view
ALTER VIEW view_name AS
SELECT ...;
\`\`\`

---

## Dropping Views

\`\`\`sql
-- Drop view
DROP VIEW view_name;

-- Drop if exists
DROP VIEW IF EXISTS view_name;
\`\`\`

---

## Updatable Views

Some views can be updated (INSERT, UPDATE, DELETE).

### Conditions for Updatable Views:
- Based on single table
- No aggregate functions
- No DISTINCT
- No GROUP BY or HAVING
- No UNION

### Example

\`\`\`sql
-- Simple updatable view
CREATE VIEW active_users AS
SELECT id, name, email, is_active
FROM users
WHERE is_active = 1;

-- Update through view
UPDATE active_users SET name = 'New Name' WHERE id = 1;

-- Insert through view
INSERT INTO active_users (name, email) VALUES ('John', 'john@example.com');
\`\`\`

---

## Views for Security

Hide sensitive columns from users.

\`\`\`sql
-- Public view (hides sensitive data)
CREATE VIEW public_user_info AS
SELECT id, name, email, created_at
FROM users;
-- password, phone, address are hidden

-- Admin view (full access)
CREATE VIEW admin_user_info AS
SELECT * FROM users;
\`\`\`

---

## Nested Views

Views can be based on other views.

\`\`\`sql
-- Base view
CREATE VIEW customer_orders AS
SELECT c.id, c.name, o.id AS order_id, o.total_amount
FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- View based on another view
CREATE VIEW top_customers AS
SELECT 
    id,
    name,
    COUNT(order_id) AS order_count,
    SUM(total_amount) AS total_spent
FROM customer_orders
GROUP BY id, name
HAVING total_spent > 1000;
\`\`\`

---

## Best Practices

### 1. Use Views for Complex Queries
\`\`\`sql
-- Instead of writing this every time:
SELECT ... complex query ...

-- Create a view
CREATE VIEW my_view AS SELECT ... complex query ...;
SELECT * FROM my_view;
\`\`\`

### 2. Use Views for Security
\`\`\`sql
-- Grant access to view, not table
GRANT SELECT ON database.public_view TO 'user'@'localhost';
\`\`\`

### 3. Document Views
\`\`\`sql
-- Add comments
CREATE VIEW customer_summary AS
SELECT ...;
-- Comment: Summary of customer orders and spending
\`\`\`

---

## Summary

Views provide:
- **Simplified Queries** - Complex logic in one place
- **Security** - Hide sensitive data
- **Reusability** - Use same query multiple times
- **Abstraction** - Hide table structure changes

**Key Points:**
- Views don't store data
- Based on SELECT queries
- Can be updatable (with restrictions)
- Can be nested

Use views to simplify your database queries!

**Related Topics:**
- Learn [MySQL Joins](/tutorial/mysql-joins) to create complex views
- Use [MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions) in views
- Combine with [MySQL Subqueries](/tutorial/mysql-subqueries) for advanced views
- Query views from Java using [JDBC](/tutorial/jdbc-introduction)

---

## Practice Question

**Q:** Create a view that shows monthly sales summary with:
- Month (YYYY-MM format)
- Total orders
- Total revenue
- Average order value
- Number of unique customers

**Answer:**
\`\`\`sql
CREATE VIEW monthly_sales_summary AS
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
\`\`\`
  `,
  code: `-- MySQL Views Examples

CREATE DATABASE views_demo;
USE views_demo;

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED DEFAULT 0,
    category VARCHAR(50),
    is_active TINYINT(1) DEFAULT 1
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
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
INSERT INTO customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Bob Johnson', 'bob@example.com');

INSERT INTO products (name, price, stock, category) VALUES
('Laptop', 999.99, 50, 'Electronics'),
('Mouse', 29.99, 100, 'Electronics'),
('Keyboard', 79.99, 75, 'Electronics');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 999.99, 'completed'),
(2, '2024-01-16', 109.98, 'completed'),
(1, '2024-01-17', 199.99, 'pending');

-- ========== Basic Views ==========

-- Simple view: Active products
CREATE VIEW active_products AS
SELECT id, name, price, stock, category
FROM products
WHERE is_active = 1;

-- Query the view
SELECT * FROM active_products;

-- ========== Complex Views ==========

-- Customer order summary
CREATE VIEW customer_order_summary AS
SELECT 
    c.id AS customer_id,
    c.name AS customer_name,
    c.email,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent,
    COALESCE(AVG(o.total_amount), 0) AS avg_order_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email;

-- Query the view
SELECT * FROM customer_order_summary WHERE total_spent > 100;

-- Product sales view
CREATE VIEW product_sales_view AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.category,
    COUNT(oi.id) AS times_ordered,
    COALESCE(SUM(oi.quantity), 0) AS total_quantity_sold,
    COALESCE(SUM(oi.quantity * oi.price), 0) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.id, p.name, p.category;

-- Monthly sales summary
CREATE VIEW monthly_sales_summary AS
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;

-- ========== Security Views ==========

-- Public view (hides sensitive data)
CREATE VIEW public_customer_info AS
SELECT id, name, email, created_at
FROM customers;
-- phone is hidden

-- Admin view (full access)
CREATE VIEW admin_customer_info AS
SELECT * FROM customers;

-- ========== Updatable Views ==========

-- Simple updatable view
CREATE VIEW active_products_editable AS
SELECT id, name, price, stock
FROM products
WHERE is_active = 1;

-- Update through view
UPDATE active_products_editable SET price = 899.99 WHERE id = 1;

-- ========== View Management ==========

-- Show all views
SHOW FULL TABLES WHERE Table_type = 'VIEW';

-- Show view definition
SHOW CREATE VIEW customer_order_summary;

-- Describe view
DESCRIBE customer_order_summary;

-- Update view
CREATE OR REPLACE VIEW active_products AS
SELECT id, name, price, stock, category
FROM products
WHERE is_active = 1 AND stock > 0;

-- Drop view
DROP VIEW IF EXISTS old_view;`
};

export default mysqlViews;


