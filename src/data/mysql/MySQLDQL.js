const mysqlDQL = {
  id: 'mysql-dql',
  title: 'MySQL DQL - Data Query Language (SELECT)',
  description: 'Complete guide to SELECT statement: DQL operations, filtering, sorting, and querying data',
  content: `
# MySQL DQL - Data Query Language (SELECT)

MySQL DQL (Data Query Language) encompasses all operations for retrieving and querying data from databases. The primary DQL command is SELECT, which enables retrieving data from one or more tables with filtering, sorting, grouping, and aggregation capabilities. Understanding DQL is fundamental to working with databases, as data retrieval is the most common database operation in applications.

Enterprise applications extensively use DQL for data retrieval, reporting, analytics, and business intelligence. SELECT statements power user interfaces, generate reports, provide data for APIs, and enable data analysis. Mastery of DQL, particularly the SELECT statement and its various clauses, is essential for building data-driven applications.

**DQL Operations:**
- **SELECT**: Retrieve data from tables
- **Query Filtering**: WHERE clause for row filtering
- **Data Grouping**: GROUP BY for aggregation
- **Result Sorting**: ORDER BY for ordering
- **Result Limiting**: LIMIT for pagination

---

## What is DQL?

DQL includes:
- **SELECT** - Retrieve data from tables
- Query operations
- Data filtering and sorting
- Aggregations and grouping

**Note:** SELECT is often categorized separately from DML because it doesn't modify data.

---

## Basic SELECT Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column
LIMIT number;
\`\`\`

---

## SELECT All Columns

\`\`\`sql
-- Select all columns
SELECT * FROM products;

-- Select specific columns
SELECT id, name, price FROM products;
\`\`\`

---

## SELECT with WHERE

Filter rows based on conditions.

\`\`\`sql
-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions
SELECT * FROM products 
WHERE price > 100 AND stock > 0;

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';
\`\`\`

---

## SELECT with DISTINCT

Remove duplicate rows.

\`\`\`sql
-- Distinct values
SELECT DISTINCT category FROM products;

-- Distinct combinations
SELECT DISTINCT category, price FROM products;
\`\`\`

---

## SELECT with ORDER BY

Sort results.

\`\`\`sql
-- Ascending order (default)
SELECT * FROM products ORDER BY price;

-- Descending order
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- Using column position
SELECT * FROM products ORDER BY 3 DESC;  -- Sort by 3rd column
\`\`\`

---

## SELECT with LIMIT

Limit number of rows returned.

\`\`\`sql
-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 20;
-- Or
SELECT * FROM products LIMIT 20, 10;  -- Skip 20, take 10
\`\`\`

---

## SELECT with GROUP BY

Group rows by column values.

\`\`\`sql
-- Group by category
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group with aggregate functions
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;
\`\`\`

---

## SELECT with HAVING

Filter groups (used with GROUP BY).

\`\`\`sql
-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- HAVING vs WHERE
-- WHERE filters rows before grouping
-- HAVING filters groups after grouping
\`\`\`

---

## SELECT with Aliases

Use aliases for columns and tables.

\`\`\`sql
-- Column alias
SELECT 
    name AS product_name,
    price AS product_price
FROM products;

-- Table alias
SELECT p.name, p.price
FROM products p
WHERE p.price > 100;
\`\`\`

---

## SELECT with Expressions

Calculate values in SELECT.

\`\`\`sql
-- Calculate total
SELECT 
    name,
    price,
    quantity,
    price * quantity AS total
FROM order_items;

-- Use functions
SELECT 
    name,
    UPPER(name) AS name_upper,
    ROUND(price, 2) AS price_rounded
FROM products;
\`\`\`

---

## SELECT with CASE

Conditional logic in SELECT.

\`\`\`sql
SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Expensive'
        WHEN price > 100 THEN 'Moderate'
        ELSE 'Cheap'
    END AS price_category
FROM products;
\`\`\`

---

## Real-World Examples

### Example 1: Top Products by Sales

\`\`\`sql
SELECT 
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_revenue DESC
LIMIT 10;
\`\`\`

### Example 2: Customer Order Summary

\`\`\`sql
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING total_spent > 1000
ORDER BY total_spent DESC;
\`\`\`

### Example 3: Monthly Sales Report

\`\`\`sql
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
\`\`\`

---

## DQL vs DML

| Feature | DQL (SELECT) | DML (INSERT/UPDATE/DELETE) |
|---------|--------------|----------------------------|
| Purpose | Retrieve data | Modify data |
| Data Change | No | Yes |
| Transactions | Read-only | Write operations |
| Locks | Shared locks | Exclusive locks |

---

## Best Practices

### 1. Select Only Needed Columns
\`\`\`sql
-- Good
SELECT id, name, price FROM products;

-- Avoid (unless needed)
SELECT * FROM products;
\`\`\`

### 2. Use WHERE to Filter Early
Filter at database level, not in application.

### 3. Use Indexes
Index columns used in WHERE, JOIN, ORDER BY.

### 4. Limit Results
Use LIMIT to prevent large result sets.

---

## Summary

DQL (Data Query Language) includes:
- **SELECT** - Primary query command
- **Filtering** - WHERE, HAVING
- **Sorting** - ORDER BY
- **Grouping** - GROUP BY
- **Limiting** - LIMIT

**Key Points:**
- SELECT retrieves data (doesn't modify)
- Use WHERE for row filtering
- Use HAVING for group filtering
- Use indexes for performance

Master DQL to efficiently retrieve and analyze data!

---

## Practice Question

**Q:** Write a SELECT query to find:
1. Top 5 customers by total spending
2. Products with price above average
3. Categories with more than 10 products

**Answer:**
\`\`\`sql
-- 1. Top 5 customers
SELECT 
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 5;

-- 2. Products above average price
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- 3. Categories with > 10 products
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 10;
\`\`\`
---

## Real-World Applications

### Data Retrieval for Applications
Applications use DQL extensively to retrieve data for user interfaces, APIs, and business logic. SELECT statements power data display, search functionality, and data-driven features across all application types.

**Implementation Example:**
- User profile retrieval for account pages
- Product listings for e-commerce catalogs
- Search results for search functionality
- Dashboard data for analytics interfaces

### Business Intelligence and Reporting
BI systems rely heavily on DQL for generating reports and analytics. Complex SELECT statements with aggregations, groupings, and filtering enable comprehensive business reporting and data analysis.

**Implementation Example:**
- Sales reports with aggregations and groupings
- Financial summaries with calculations
- Performance metrics with time-based analysis
- Comparative analysis across dimensions

### API Data Provision
REST APIs and data services use DQL to provide data to clients. SELECT statements retrieve and format data for API responses, enabling data access for mobile apps, web applications, and third-party integrations.

**Implementation Example:**
- API endpoints querying database tables
- Data formatting for JSON responses
- Filtered data based on API parameters
- Paginated results for large datasets

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using SELECT * in Production
**Problem:** SELECT * retrieves all columns, wasting bandwidth and resources.

**Solution:** Select only needed columns:

\`\`\`sql
-- AVOID - Selects all columns
SELECT * FROM products;

-- PREFER - Select only needed columns
SELECT id, name, price FROM products;
\`\`\`

### Mistake 2: Not Using WHERE to Filter
**Problem:** Retrieving all rows when only specific data is needed.

**Solution:** Always use WHERE to filter data:

\`\`\`sql
-- AVOID - Gets all products
SELECT * FROM products;

-- PREFER - Filtered query
SELECT * FROM products WHERE category = 'Electronics';
\`\`\`

### Mistake 3: Missing Indexes for WHERE/ORDER BY
**Problem:** Queries without indexes on filtered/sorted columns are slow.

**Solution:** Create indexes on frequently queried columns:

\`\`\`sql
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_price ON products(price);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is DQL and what does it include?

DQL (Data Query Language) is the subset of SQL used for retrieving and querying data from databases. The primary DQL command is SELECT, which includes various clauses for filtering (WHERE), grouping (GROUP BY), sorting (ORDER BY), and limiting (LIMIT) results. DQL is read-only and doesn't modify data.

### What's the difference between DQL and DML?

DQL (Data Query Language) is for retrieving data (SELECT statements). DML (Data Manipulation Language) is for modifying data (INSERT, UPDATE, DELETE). DQL is read-only, while DML changes database content. Both are essential SQL subsets for different purposes.

### Can I retrieve data from multiple tables?

Yes, you can retrieve data from multiple tables using JOINs:

\`\`\`sql
SELECT p.name, c.name AS category
FROM products p
JOIN categories c ON p.category_id = c.id;
\`\`\`

JOINs enable combining data from related tables. Learn about [MySQL Joins](/mysql/mysql-joins) for details.

### How do I filter data in SELECT queries?

Use the WHERE clause to filter rows:

\`\`\`sql
SELECT * FROM products WHERE price > 100;
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

WHERE supports various operators (>, <, =, LIKE, IN, etc.) for flexible filtering.

### What is the difference between SELECT and SELECT DISTINCT?

SELECT returns all rows including duplicates. SELECT DISTINCT returns only unique rows, eliminating duplicates. Use DISTINCT when you need unique values:

\`\`\`sql
SELECT DISTINCT category FROM products;
\`\`\`

### Can I calculate values in SELECT statements?

Yes, you can use expressions and functions in SELECT:

\`\`\`sql
SELECT name, price, stock, price * stock AS total_value FROM products;
SELECT name, UPPER(name) AS name_upper FROM products;
\`\`\`

This enables calculated columns and data transformation.

### How do I sort query results?

Use ORDER BY to sort results:

\`\`\`sql
SELECT * FROM products ORDER BY price DESC;
SELECT * FROM products ORDER BY category, price;
\`\`\`

Specify ASC (ascending, default) or DESC (descending) for each column.

### What is the LIMIT clause used for?

LIMIT restricts the number of rows returned, useful for pagination and top-N queries:

\`\`\`sql
SELECT * FROM products LIMIT 10;
SELECT * FROM products ORDER BY price DESC LIMIT 5;  -- Top 5
\`\`\`

LIMIT with OFFSET enables pagination.

### Can I use aggregate functions in SELECT?

Yes, aggregate functions (COUNT, SUM, AVG, etc.) can be used in SELECT, typically with GROUP BY:

\`\`\`sql
SELECT category, COUNT(*) AS count, AVG(price) AS avg_price
FROM products
GROUP BY category;
\`\`\`

Learn about [MySQL Aggregate Functions](/mysql/mysql-aggregate-functions) for details.

### How do I optimize SELECT query performance?

Optimize SELECT queries by: (1) selecting only needed columns, (2) using WHERE to filter early, (3) creating indexes on filtered/sorted columns, (4) using LIMIT to restrict results, (5) avoiding SELECT * in production, and (6) using EXPLAIN to analyze query plans. Learn about [MySQL Indexes](/mysql/mysql-indexes) for performance optimization.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these DQL fundamentals:

- **DQL is for data retrieval** using SELECT statements
- **SELECT retrieves data** from one or more tables
- **WHERE filters rows** before processing
- **GROUP BY creates groups** for aggregation
- **ORDER BY sorts results** in specified order
- **LIMIT restricts** the number of rows returned
- **Select only needed columns** for better performance
- **Use indexes** on filtered and sorted columns
- **Combine clauses** for powerful, flexible queries

---

## What's Next?

Now that you understand DQL, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Clauses](/mysql/mysql-clauses)**: Master WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
2. **[MySQL Joins](/mysql/mysql-joins)**: Retrieve data from multiple tables
3. **[MySQL Aggregate Functions](/mysql/mysql-aggregate-functions)**: Calculate summaries and statistics
4. **[MySQL Subqueries](/mysql/mysql-subqueries)**: Use nested queries for complex logic

### Advanced Topics

- **Query Optimization**: Master performance tuning techniques
- **Complex Queries**: Build sophisticated SELECT statements
- **Window Functions**: Advanced analytical functions (MySQL 8.0+)
- **Full-Text Search**: Text search capabilities

### Related Tutorials

- **[MySQL Introduction](/mysql/mysql-introduction)**: Review database fundamentals
- **[MySQL Indexes](/mysql/mysql-indexes)**: Optimize query performance
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Execute SELECT queries from Java
- **[Spring Boot JPA](/springboot/spring-boot-jpa)**: See how JPA generates SELECT queries

DQL is essential for data retrieval. Continue learning about [MySQL Joins](/mysql/mysql-joins) to retrieve data from multiple related tables.

---

## 10 Important MySQL DQL Interview Questions

### 1. What is DQL?

**Answer:** **Data Query Language (DQL)** is the subset of SQL centered on **reading** data—primarily **\`SELECT\`**. Some textbooks fold **SELECT** under **DML**; others separate **DQL** for clarity. In interviews, **DDL/DML/DQL** taxonomy shows you can **classify** statements: \`CREATE TABLE\` is DDL, \`INSERT\` is DML, \`SELECT\` is DQL.

### 2. What is the logical order of SELECT clauses?

**Answer:** Think in this **logical** order for understanding: **FROM** (including **JOINs**) → **WHERE** → **GROUP BY** → **HAVING** → **SELECT** expressions → **DISTINCT** → **ORDER BY** → **LIMIT**. The **optimizer** may **reorder** operations for efficiency, but **semantics** follow this mental model—e.g. **WHERE** cannot see **aliases** from **SELECT** in the same level (use **subquery** or repeat expression).

### 3. Why avoid SELECT * in production?

**Answer:** \`SELECT *\` pulls **every** column, increasing **disk I/O**, **network**, and **memory**. It also **couples** clients to **schema changes**—new columns can break **ORDER BY** assumptions or **ORM** mappings. **Explicit** columns document **intent** and **stabilize** APIs.

### 4. What is a predicate in WHERE?

**Answer:** A **predicate** is a **boolean** expression that evaluates per row: comparisons (\`=\`, \`<\`), **\`IN\`**, **\`BETWEEN\`**, **\`LIKE\`**, **\`IS NULL\`**, **combinations** with **AND/OR/NOT**. **Short-circuit** evaluation is not guaranteed—**optimize** predicates for **index** use.

### 5. Explain WHERE vs HAVING again.

**Answer:** \`WHERE\` filters **individual rows** **before** aggregation. \`HAVING\` filters **groups** **after** \`GROUP BY\` and may reference **aggregate** results. **Example:** \`WHERE status = 'shipped'\` then \`HAVING COUNT(*) > 10\` per customer.

### 6. What are aggregate functions?

**Answer:** **COUNT**, **SUM**, **AVG**, **MIN**, **MAX** collapse **many** rows into a **single** summary (or **per-group** summary with \`GROUP BY\`). **COUNT(\*)** counts rows; **COUNT(column)** counts **non-NULL** values. **Aggregates** are central to **reporting** and **dashboards**.

### 7. What does DISTINCT accomplish?

**Answer:** \`DISTINCT\` **eliminates duplicate** rows from the **result** for the **selected** column list. **Contrast** with **GROUP BY** when you also need **aggregates**—use **GROUP BY** for that pattern.

### 8. What is a subquery?

**Answer:** A **subquery** is a **nested** \`SELECT\` used inside **WHERE**, **FROM**, or **SELECT** list. **Correlated** subqueries reference **outer** query columns (often **slower** per row). **Uncorrelated** subqueries run **once**. **Optimizer** may rewrite subqueries to **JOINs**.

### 9. What is the purpose of JOIN?

**Answer:** **JOIN** combines **related** rows from **two or more** tables in **one** result set based on a **predicate** (usually **keys**). **Relational** databases **normalize** data across tables; **JOIN** is how you **reassemble** it for **applications** and **reports**.

### 10. How does DQL relate to JDBC?

**Answer:** Java code uses **JDBC** \`Statement\` or \`PreparedStatement\` to execute **\`SELECT\`** strings, then **\`ResultSet\`** iterates rows. **ORMs** generate **SELECT** behind the scenes. **Same SQL** skills apply—**tuning** happens in the database and in **connection** pool settings.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **SELECT deep dive** | [MySQL SELECT](/mysql/mysql-select) |
| **Clauses** | [MySQL Clauses](/mysql/mysql-clauses) |
| **Joins** | [MySQL Joins](/mysql/mysql-joins) |
| **Subqueries** | [MySQL Subqueries](/mysql/mysql-subqueries) |
| **JDBC ResultSet** | [Result Set Interface](/tutorial/resultset-interface) |

---

## Test Your Knowledge

Ready to test your MySQL DQL understanding? Take our comprehensive [MySQL MCQ Exam](/mysql-mcq) with 20 randomly selected questions covering DQL, DDL, DML, and all MySQL topics!
  `,
  code: `-- MySQL DQL Examples

CREATE DATABASE dql_demo;
USE dql_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock INT UNSIGNED DEFAULT 0
);

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data
INSERT INTO products (name, price, category, stock) VALUES
('Laptop', 999.99, 'Electronics', 50),
('Mouse', 29.99, 'Electronics', 100),
('Keyboard', 79.99, 'Electronics', 75),
('Desk', 199.99, 'Furniture', 30);

INSERT INTO customers (name, email) VALUES
('Dattu p', ' Dattu@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 999.99, 'completed'),
(2, '2024-01-16', 109.98, 'completed');

-- ========== Basic SELECT ==========

-- Select all columns
SELECT * FROM products;

-- Select specific columns
SELECT id, name, price FROM products;

-- ========== SELECT with WHERE ==========

-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions
SELECT * FROM products WHERE price > 100 AND stock > 0;

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';

-- ========== SELECT with DISTINCT ==========

-- Distinct values
SELECT DISTINCT category FROM products;

-- ========== SELECT with ORDER BY ==========

-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- ========== SELECT with LIMIT ==========

-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 0;
SELECT * FROM products LIMIT 0, 10;  -- Same as above

-- ========== SELECT with GROUP BY ==========

-- Group by category
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group with aggregates
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;

-- ========== SELECT with HAVING ==========

-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 1;

-- ========== SELECT with Aliases ==========

-- Column alias
SELECT 
    name AS product_name,
    price AS product_price
FROM products;

-- Table alias
SELECT p.name, p.price
FROM products p
WHERE p.price > 100;

-- ========== SELECT with Expressions ==========

-- Calculate total
SELECT 
    name,
    price,
    stock,
    price * stock AS total_value
FROM products;

-- Use functions
SELECT 
    name,
    UPPER(name) AS name_upper,
    ROUND(price, 2) AS price_rounded
FROM products;

-- ========== SELECT with CASE ==========

SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Expensive'
        WHEN price > 100 THEN 'Moderate'
        ELSE 'Cheap'
    END AS price_category
FROM products;

-- ========== Real-World Examples ==========

-- Top products by stock value
SELECT 
    name,
    price,
    stock,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC
LIMIT 5;

-- Customer order summary
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Products above average price
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Categories with multiple products
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 1;
`
};

export default mysqlDQL;


