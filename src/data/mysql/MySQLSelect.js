const mysqlSelect = {
  id: 'mysql-select',
  title: 'SELECT Query - Retrieving Data',
  description: 'Master the SELECT statement - the most important SQL command for retrieving data',
  content: `
# SELECT Query — Retrieving Data from Database

The SELECT statement is the most frequently used SQL command. It retrieves data from one or more tables. Mastering SELECT is essential for working with databases.

---

## Basic SELECT Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name;
\`\`\`

---

## Simple Examples

### Select All Columns

\`\`\`sql
-- Select all columns from users table
SELECT * FROM users;
\`\`\`

### Select Specific Columns

\`\`\`sql
-- Select only name and email
SELECT name, email FROM users;
\`\`\`

### Select with WHERE Clause

\`\`\`sql
-- Select users where age is greater than 25
SELECT name, email, age 
FROM users 
WHERE age > 25;
\`\`\`

---

## WHERE Clause

Filters rows based on conditions.

### Comparison Operators

\`\`\`sql
-- Equal to
SELECT * FROM users WHERE age = 25;

-- Not equal to
SELECT * FROM users WHERE age != 25;
-- Or
SELECT * FROM users WHERE age <> 25;

-- Greater than
SELECT * FROM products WHERE price > 100;

-- Less than
SELECT * FROM products WHERE price < 50;

-- Greater than or equal
SELECT * FROM products WHERE stock >= 10;

-- Less than or equal
SELECT * FROM products WHERE stock <= 5;
\`\`\`

### Logical Operators

\`\`\`sql
-- AND - Both conditions must be true
SELECT * FROM users 
WHERE age > 25 AND city = 'New York';

-- OR - Either condition can be true
SELECT * FROM users 
WHERE city = 'New York' OR city = 'Los Angeles';

-- NOT - Negates condition
SELECT * FROM users 
WHERE NOT city = 'New York';
\`\`\`

### IN Operator

\`\`\`sql
-- Select users in specific cities
SELECT * FROM users 
WHERE city IN ('New York', 'Los Angeles', 'Chicago');

-- Select products with specific IDs
SELECT * FROM products 
WHERE id IN (1, 5, 10, 15);
\`\`\`

### LIKE Operator (Pattern Matching)

\`\`\`sql
-- Starts with 'John'
SELECT * FROM users WHERE name LIKE 'John%';

-- Ends with 'com'
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Contains 'admin'
SELECT * FROM users WHERE name LIKE '%admin%';

-- Single character wildcard
SELECT * FROM users WHERE name LIKE 'J_n';  -- Matches: Jan, Jon, etc.
\`\`\`

### BETWEEN Operator

\`\`\`sql
-- Select products with price between 50 and 100
SELECT * FROM products 
WHERE price BETWEEN 50 AND 100;

-- Select users with age between 25 and 35
SELECT * FROM users 
WHERE age BETWEEN 25 AND 35;
\`\`\`

### IS NULL / IS NOT NULL

\`\`\`sql
-- Select users without phone number
SELECT * FROM users WHERE phone IS NULL;

-- Select users with phone number
SELECT * FROM users WHERE phone IS NOT NULL;
\`\`\`

---

## ORDER BY

Sorts results.

\`\`\`sql
-- Sort by name (ascending)
SELECT * FROM users ORDER BY name;

-- Sort by name (descending)
SELECT * FROM users ORDER BY name DESC;

-- Sort by multiple columns
SELECT * FROM users ORDER BY city, name;

-- Sort by age descending, then name ascending
SELECT * FROM users ORDER BY age DESC, name ASC;
\`\`\`

---

## LIMIT

Limits number of results.

\`\`\`sql
-- Get first 10 users
SELECT * FROM users LIMIT 10;

-- Get 10 users starting from 20th (pagination)
SELECT * FROM users LIMIT 20, 10;
-- Or
SELECT * FROM users LIMIT 10 OFFSET 20;
\`\`\`

---

## DISTINCT

Removes duplicate rows.

\`\`\`sql
-- Get unique cities
SELECT DISTINCT city FROM users;

-- Get unique combinations
SELECT DISTINCT city, country FROM users;
\`\`\`

---

## Aliases

Give columns or tables temporary names.

\`\`\`sql
-- Column alias
SELECT name AS user_name, email AS user_email FROM users;

-- Table alias
SELECT u.name, u.email 
FROM users AS u 
WHERE u.age > 25;
\`\`\`

---

## Aggregate Functions

### COUNT

\`\`\`sql
-- Count all rows
SELECT COUNT(*) FROM users;

-- Count non-null values
SELECT COUNT(email) FROM users;

-- Count with condition
SELECT COUNT(*) FROM users WHERE age > 25;
\`\`\`

### SUM

\`\`\`sql
-- Sum of all prices
SELECT SUM(price) FROM products;

-- Sum with condition
SELECT SUM(total_amount) FROM orders WHERE status = 'completed';
\`\`\`

### AVG

\`\`\`sql
-- Average age
SELECT AVG(age) FROM users;

-- Average price
SELECT AVG(price) FROM products;
\`\`\`

### MIN and MAX

\`\`\`sql
-- Minimum price
SELECT MIN(price) FROM products;

-- Maximum age
SELECT MAX(age) FROM users;

-- Get product with minimum price
SELECT * FROM products WHERE price = (SELECT MIN(price) FROM products);
\`\`\`

---

## GROUP BY

Groups rows with same values.

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

---

## HAVING

Filters groups (used with GROUP BY).

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
\`\`\`

**Difference:**
- **WHERE** - Filters rows before grouping
- **HAVING** - Filters groups after grouping

---

## Complete Real-World Examples

### E-Commerce Queries

\`\`\`sql
-- Get all active products sorted by price
SELECT id, name, price, stock 
FROM products 
WHERE is_active = 1 
ORDER BY price ASC;

-- Get top 10 best-selling products
SELECT product_id, SUM(quantity) AS total_sold 
FROM order_items 
GROUP BY product_id 
ORDER BY total_sold DESC 
LIMIT 10;

-- Get customers who spent more than $1000
SELECT customer_id, SUM(total_amount) AS total_spent 
FROM orders 
GROUP BY customer_id 
HAVING SUM(total_amount) > 1000 
ORDER BY total_spent DESC;

-- Get products with low stock
SELECT name, stock 
FROM products 
WHERE stock < 10 
ORDER BY stock ASC;

-- Search products by name
SELECT * FROM products 
WHERE name LIKE '%laptop%' 
AND price BETWEEN 500 AND 1500 
ORDER BY price;
\`\`\`

---

## Combining Clauses

Complete SELECT syntax order:

\`\`\`sql
SELECT column1, column2, aggregate_function(column3)
FROM table_name
WHERE condition
GROUP BY column1, column2
HAVING condition
ORDER BY column1 ASC/DESC
LIMIT number;
\`\`\`

**Example:**
\`\`\`sql
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MAX(price) AS max_price
FROM products
WHERE is_active = 1
GROUP BY category
HAVING COUNT(*) > 5
ORDER BY avg_price DESC
LIMIT 10;
\`\`\`

---

## Best Practices

### 1. Select Only Needed Columns
\`\`\`sql
-- Good
SELECT name, email FROM users;

-- Bad (unless you need all)
SELECT * FROM users;
\`\`\`

### 2. Use WHERE to Filter Early
\`\`\`sql
-- Good - filters before processing
SELECT * FROM users WHERE age > 25;

-- Bad - processes all then filters
SELECT * FROM users;
-- Then filter in application
\`\`\`

### 3. Use Indexes
\`\`\`sql
-- Create index for frequently queried columns
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_age ON users(age);
\`\`\`

### 4. Use LIMIT for Large Results
\`\`\`sql
-- Good - limits results
SELECT * FROM products LIMIT 100;

-- Bad - might return millions of rows
SELECT * FROM products;
\`\`\`

---

## Summary

SELECT is the foundation of data retrieval:
- **Basic SELECT** - Get data from tables
- **WHERE** - Filter rows
- **ORDER BY** - Sort results
- **LIMIT** - Restrict results
- **GROUP BY** - Group data
- **HAVING** - Filter groups
- **Aggregate Functions** - Calculate statistics

Mastering SELECT is fundamental to working with databases. The SELECT statement, combined with WHERE, ORDER BY, GROUP BY, and aggregate functions, provides powerful data retrieval capabilities essential for application development.

---

## Real-World Applications

### E-Commerce Analytics
E-commerce platforms use SELECT queries extensively for business intelligence, reporting, and analytics. Queries retrieve product performance data, customer purchase patterns, sales trends, and inventory status.

**Implementation Example:**
- Top-selling products by category
- Customer purchase history and preferences
- Sales reports by date range
- Low stock alerts for inventory management
- Revenue analysis by product or region

### Financial Reporting
Banking and financial applications rely on SELECT queries for transaction reporting, account statements, and financial analysis. Complex queries aggregate transaction data, calculate balances, and generate regulatory reports.

**Implementation Example:**
- Account balance calculations
- Transaction history with filtering
- Monthly/yearly financial summaries
- Fraud detection queries
- Regulatory compliance reports

### User Management Systems
Applications use SELECT queries to retrieve user information, filter users by criteria, and generate user reports. Queries support authentication, authorization, and user analytics.

**Implementation Example:**
- User search and filtering
- Active user statistics
- User activity reports
- Role-based user queries
- Registration analytics

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using SELECT * in Production
**Problem:** SELECT * retrieves all columns, wasting bandwidth and memory, especially with large tables.

**Solution:** Always specify only needed columns:

\`\`\`sql
-- GOOD
SELECT name, email FROM users;

-- BAD
SELECT * FROM users;
\`\`\`

### Mistake 2: Not Using Indexes
**Problem:** Queries on non-indexed columns are slow, especially with large datasets.

**Solution:** Create indexes on frequently queried columns:

\`\`\`sql
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_age ON users(age);
\`\`\`

### Mistake 3: Missing WHERE Clause
**Problem:** Retrieving all rows when only specific data is needed wastes resources.

**Solution:** Always use WHERE to filter data:

\`\`\`sql
-- GOOD - Filters early
SELECT * FROM products WHERE category = 'Electronics';

-- BAD - Processes all rows
SELECT * FROM products;
\`\`\`

### Mistake 4: Confusing WHERE and HAVING
**Problem:** Using HAVING for row-level filtering instead of WHERE.

**Solution:** Use WHERE for row filtering, HAVING for group filtering:

\`\`\`sql
-- CORRECT
SELECT city, COUNT(*) 
FROM users 
WHERE age > 25           -- Filters rows
GROUP BY city 
HAVING COUNT(*) > 10;     -- Filters groups
\`\`\`

### Mistake 5: Not Using LIMIT for Large Results
**Problem:** Queries returning millions of rows can cause performance issues and memory problems.

**Solution:** Always use LIMIT for potentially large result sets:

\`\`\`sql
-- GOOD - Limits results
SELECT * FROM products LIMIT 100;

-- BAD - Might return millions
SELECT * FROM products;
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the SELECT statement used for?

The SELECT statement is used to retrieve data from one or more database tables. It's the most fundamental SQL command and is used in almost every database operation. SELECT allows you to specify which columns to retrieve, filter rows with WHERE, sort with ORDER BY, group with GROUP BY, and aggregate data with functions like COUNT, SUM, and AVG.

### What's the difference between WHERE and HAVING?

WHERE filters rows before grouping, while HAVING filters groups after grouping. Use WHERE for row-level conditions (e.g., \`WHERE age > 25\`). Use HAVING for group-level conditions with aggregate functions (e.g., \`HAVING COUNT(*) > 10\`). WHERE is more efficient as it filters data earlier in the query execution. Learn about [MySQL Clauses](/tutorial/mysql-clauses) for detailed clause usage.

### When should I use SELECT *?

SELECT * should be avoided in production code. Use it only during development or when you genuinely need all columns. In production, always specify column names to improve performance, reduce network traffic, and make code more maintainable. Explicit column lists also protect against schema changes.

### How do I optimize SELECT queries?

Optimize SELECT queries by: (1) selecting only needed columns, (2) using WHERE to filter early, (3) creating indexes on frequently queried columns, (4) using LIMIT for large result sets, (5) avoiding functions in WHERE clauses when possible, and (6) using appropriate JOIN types. Learn about [MySQL Indexes](/tutorial/mysql-indexes) for performance optimization.

### What are aggregate functions?

Aggregate functions perform calculations on groups of rows and return a single value. Common aggregate functions include COUNT (count rows), SUM (sum values), AVG (average), MIN (minimum), MAX (maximum). They're used with GROUP BY to aggregate data by groups. Learn about [MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions) for detailed usage.

### What's the difference between COUNT(*) and COUNT(column)?

COUNT(*) counts all rows including those with NULL values, while COUNT(column) counts only non-NULL values in that column. Use COUNT(*) when you want the total number of rows, and COUNT(column) when you want to count only rows with values in that specific column.

### How do I use DISTINCT in SELECT?

DISTINCT removes duplicate rows from the result set. Use it when you want unique values:

\`\`\`sql
SELECT DISTINCT city FROM users;
SELECT DISTINCT city, country FROM users;  -- Unique combinations
\`\`\`

### What is the ORDER BY clause used for?

ORDER BY sorts the result set by one or more columns in ascending (ASC) or descending (DESC) order. You can sort by multiple columns, and sorting happens after WHERE filtering but before LIMIT. ORDER BY is essential for displaying data in a meaningful order.

### How does LIMIT work with pagination?

LIMIT restricts the number of rows returned. For pagination, use LIMIT with OFFSET:

\`\`\`sql
-- Page 1: First 10 rows
SELECT * FROM products LIMIT 10 OFFSET 0;

-- Page 2: Next 10 rows
SELECT * FROM products LIMIT 10 OFFSET 10;

-- Page 3: Next 10 rows
SELECT * FROM products LIMIT 10 OFFSET 20;
\`\`\`

### Can I use SELECT with multiple tables?

Yes, you can retrieve data from multiple tables using JOINs. JOINs combine rows from different tables based on related columns. Learn about [MySQL Joins](/tutorial/mysql-joins) to understand how to combine data from multiple tables effectively.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these SELECT fundamentals:

- **SELECT retrieves data** from database tables with precise control
- **WHERE clause** filters rows before processing, improving performance
- **ORDER BY** sorts results in ascending or descending order
- **GROUP BY** groups rows for aggregate calculations
- **HAVING** filters groups after aggregation
- **Aggregate functions** (COUNT, SUM, AVG, MIN, MAX) calculate statistics
- **LIMIT** restricts result set size, essential for pagination
- **DISTINCT** removes duplicate rows from results
- **Always select specific columns** instead of SELECT * in production

---

## What's Next?

Now that you understand SELECT queries, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Joins](/tutorial/mysql-joins)**: Learn to combine data from multiple tables
2. **[MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions)**: Master COUNT, SUM, AVG, MIN, MAX
3. **[MySQL Clauses](/tutorial/mysql-clauses)**: Deep dive into WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
4. **[MySQL Subqueries](/tutorial/mysql-subqueries)**: Learn nested queries for complex data retrieval

### Advanced Topics

- **Query Optimization**: Learn indexing and performance tuning
- **Complex Joins**: Master INNER, LEFT, RIGHT, FULL OUTER joins
- **Window Functions**: Advanced analytical functions
- **Common Table Expressions (CTEs)**: Simplify complex queries

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Data Types](/tutorial/mysql-data-types)**: Understand column types
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Use SELECT in Java applications
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: Simplify queries with JPA

SELECT is the foundation of data retrieval. Continue learning about [MySQL Joins](/tutorial/mysql-joins) to combine data from multiple tables and build more powerful queries.

---

## Practice Question

**Q:** Write a query to find the top 5 customers (by total order amount) who have placed orders in the last 30 days, showing their name, email, and total spent.

**Answer:**
\`\`\`sql
SELECT 
    c.name,
    c.email,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 5;
\`\`\`
  `,
  code: `-- MySQL SELECT Query Examples

-- Create sample database
CREATE DATABASE IF NOT EXISTS select_demo;
USE select_demo;

-- Create tables
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    city VARCHAR(100),
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
    user_id INT UNSIGNED NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (name, email, age, city) VALUES
('John Doe', 'john@example.com', 25, 'New York'),
('Jane Smith', 'jane@example.com', 30, 'Los Angeles'),
('Bob Johnson', 'bob@example.com', 28, 'New York'),
('Alice Brown', 'alice@example.com', 35, 'Chicago'),
('Charlie Wilson', 'charlie@example.com', 22, 'Los Angeles');

INSERT INTO products (name, price, stock, category) VALUES
('Laptop', 999.99, 50, 'Electronics'),
('Mouse', 29.99, 100, 'Electronics'),
('Keyboard', 79.99, 75, 'Electronics'),
('Desk', 199.99, 30, 'Furniture'),
('Chair', 149.99, 40, 'Furniture');

INSERT INTO orders (user_id, total_amount, order_date, status) VALUES
(1, 999.99, '2024-01-15', 'completed'),
(2, 109.98, '2024-01-16', 'completed'),
(1, 199.99, '2024-01-17', 'pending'),
(3, 79.99, '2024-01-18', 'completed'),
(2, 149.99, '2024-01-19', 'completed');

-- Basic SELECT
SELECT * FROM users;
SELECT name, email FROM users;

-- WHERE clause
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE city = 'New York';
SELECT * FROM users WHERE age BETWEEN 25 AND 30;
SELECT * FROM users WHERE city IN ('New York', 'Los Angeles');
SELECT * FROM users WHERE name LIKE 'J%';
SELECT * FROM users WHERE email LIKE '%@example.com';

-- ORDER BY
SELECT * FROM users ORDER BY name;
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM users ORDER BY city, name;

-- LIMIT
SELECT * FROM users LIMIT 3;
SELECT * FROM users LIMIT 2, 3;  -- Skip 2, get 3

-- DISTINCT
SELECT DISTINCT city FROM users;

-- Aggregate functions
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age) AS min_age, MAX(age) AS max_age FROM users;
SELECT SUM(price) AS total_value FROM products;

-- GROUP BY
SELECT city, COUNT(*) AS user_count FROM users GROUP BY city;
SELECT category, AVG(price) AS avg_price FROM products GROUP BY category;
SELECT user_id, SUM(total_amount) AS total_spent FROM orders GROUP BY user_id;

-- HAVING
SELECT city, COUNT(*) AS user_count 
FROM users 
GROUP BY city 
HAVING COUNT(*) > 1;

SELECT category, AVG(price) AS avg_price 
FROM products 
GROUP BY category 
HAVING AVG(price) > 100;

-- Complex query
SELECT 
    u.name,
    u.city,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.age > 25
GROUP BY u.id, u.name, u.city
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 5;
\`\`\`

---

## What's Next?

Master these related MySQL topics:

1. **[MySQL Joins](/tutorial/mysql-joins)** - Combine data from multiple tables
2. **[MySQL Clauses](/tutorial/mysql-clauses)** - WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
3. **[MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions)** - COUNT, SUM, AVG, MIN, MAX
4. **[MySQL Subqueries](/tutorial/mysql-subqueries)** - Nested queries for complex data
5. **[MySQL Views](/tutorial/mysql-views)** - Simplify complex SELECT queries

**Connect to Java:**
- Use SELECT in [JDBC](/tutorial/jdbc-introduction) to retrieve data
- Spring Boot JPA simplifies queries - see [Spring Boot JPA](/tutorial/spring-boot-jpa)
`
};

export default mysqlSelect;
