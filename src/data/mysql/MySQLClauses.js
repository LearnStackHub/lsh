const mysqlClauses = {
  id: 'mysql-clauses',
  title: 'MySQL Clauses - WHERE, GROUP BY, HAVING, ORDER BY, LIMIT',
  description: 'Master all SQL clauses: WHERE, GROUP BY, HAVING, ORDER BY, LIMIT for powerful data querying',
  content: `
# MySQL Clauses - Powerful Query Building Blocks

MySQL clauses are essential components of SELECT statements that control data filtering, grouping, sorting, and limiting. Understanding SQL clauses (WHERE, GROUP BY, HAVING, ORDER BY, LIMIT) is fundamental to building effective database queries. Each clause serves a specific purpose in the query execution pipeline, enabling developers to retrieve exactly the data they need in the desired format.

Enterprise applications extensively use SQL clauses for data retrieval, reporting, analytics, and business intelligence. Clauses enable filtering large datasets, grouping related data, calculating aggregates, sorting results, and limiting output. Mastery of SQL clauses is essential for building efficient, maintainable database queries that power modern applications.

**SQL Clause Execution Order:**
1. **FROM**: Specifies source tables
2. **WHERE**: Filters rows before grouping
3. **GROUP BY**: Groups rows for aggregation
4. **HAVING**: Filters groups after aggregation
5. **SELECT**: Selects columns and calculates expressions
6. **ORDER BY**: Sorts results
7. **LIMIT**: Limits number of rows returned

---

## SQL Clause Order

The correct order of clauses in a SELECT statement:

\`\`\`sql
SELECT      -- 1. What columns to retrieve
FROM        -- 2. Which tables
WHERE       -- 3. Filter rows
GROUP BY    -- 4. Group rows
HAVING      -- 5. Filter groups
ORDER BY    -- 6. Sort results
LIMIT       -- 7. Limit rows
\`\`\`

---

## WHERE Clause

Filters rows before grouping and aggregation.

### Basic WHERE

\`\`\`sql
-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions with AND
SELECT * FROM products 
WHERE price > 100 AND stock > 0;

-- Multiple conditions with OR
SELECT * FROM products 
WHERE category = 'Electronics' OR category = 'Furniture';

-- Combining AND and OR
SELECT * FROM products 
WHERE (category = 'Electronics' OR category = 'Furniture') 
AND price < 500;
\`\`\`

### WHERE with Comparison Operators

\`\`\`sql
-- Equal
SELECT * FROM products WHERE price = 99.99;

-- Not equal
SELECT * FROM products WHERE price != 100;
SELECT * FROM products WHERE price <> 100;

-- Greater than
SELECT * FROM products WHERE price > 100;

-- Less than
SELECT * FROM products WHERE price < 100;

-- Greater than or equal
SELECT * FROM products WHERE price >= 100;

-- Less than or equal
SELECT * FROM products WHERE price <= 100;
\`\`\`

### WHERE with IN

\`\`\`sql
-- Match any value in list
SELECT * FROM products 
WHERE category IN ('Electronics', 'Furniture', 'Books');

-- NOT IN
SELECT * FROM products 
WHERE category NOT IN ('Electronics', 'Furniture');
\`\`\`

### WHERE with BETWEEN

\`\`\`sql
-- Range (inclusive)
SELECT * FROM products 
WHERE price BETWEEN 50 AND 200;

-- NOT BETWEEN
SELECT * FROM products 
WHERE price NOT BETWEEN 50 AND 200;

-- Date range
SELECT * FROM orders 
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';
\`\`\`

### WHERE with LIKE

\`\`\`sql
-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';

-- Starts with
SELECT * FROM products WHERE name LIKE 'Laptop%';

-- Ends with
SELECT * FROM products WHERE name LIKE '%Pro';

-- Single character
SELECT * FROM products WHERE name LIKE 'Lap_op';

-- NOT LIKE
SELECT * FROM products WHERE name NOT LIKE '%test%';
\`\`\`

### WHERE with IS NULL / IS NOT NULL

\`\`\`sql
-- Check for NULL
SELECT * FROM products WHERE description IS NULL;

-- Check for NOT NULL
SELECT * FROM products WHERE description IS NOT NULL;
\`\`\`

---

## GROUP BY Clause

Groups rows that have the same values in specified columns.

\`\`\`sql
-- Group by single column
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group by multiple columns
SELECT category, status, COUNT(*) AS count
FROM products
GROUP BY category, status;

-- Group with aggregate functions
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;
\`\`\`

### GROUP BY with Expressions

\`\`\`sql
-- Group by expression
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');
\`\`\`

---

## HAVING Clause

Filters groups after GROUP BY (similar to WHERE but for groups).

\`\`\`sql
-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- HAVING with aggregate functions
SELECT 
    category,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;
\`\`\`

### WHERE vs HAVING

| Feature | WHERE | HAVING |
|---------|-------|--------|
| Applied to | Rows | Groups |
| Used with | All SELECT statements | Only with GROUP BY |
| Aggregate functions | Cannot use | Can use |
| Execution order | Before grouping | After grouping |

\`\`\`sql
-- WHERE filters rows, HAVING filters groups
SELECT 
    category,
    COUNT(*) AS count,
    AVG(price) AS avg_price
FROM products
WHERE stock > 0          -- Filter rows first
GROUP BY category
HAVING COUNT(*) > 3      -- Filter groups after
AND AVG(price) > 50;    -- Can use aggregates in HAVING
\`\`\`

---

## ORDER BY Clause

Sorts the result set.

\`\`\`sql
-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products 
ORDER BY category, price DESC;

-- Using column position
SELECT * FROM products ORDER BY 3 DESC;  -- Sort by 3rd column

-- Using expressions
SELECT 
    name,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC;
\`\`\`

### ORDER BY with NULL Values

\`\`\`sql
-- NULLS FIRST (MySQL default)
SELECT * FROM products ORDER BY description;

-- NULLS LAST (MySQL 8.0+)
SELECT * FROM products ORDER BY description IS NULL, description;
\`\`\`

---

## LIMIT Clause

Limits the number of rows returned.

\`\`\`sql
-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 20;

-- Alternative syntax
SELECT * FROM products LIMIT 20, 10;  -- Skip 20, take 10

-- Top N records
SELECT * FROM products 
ORDER BY price DESC 
LIMIT 5;
\`\`\`

### LIMIT for Pagination

\`\`\`sql
-- Page 1 (rows 1-10)
SELECT * FROM products LIMIT 0, 10;

-- Page 2 (rows 11-20)
SELECT * FROM products LIMIT 10, 10;

-- Page 3 (rows 21-30)
SELECT * FROM products LIMIT 20, 10;

-- General formula: LIMIT (page - 1) * page_size, page_size
\`\`\`

---

## Complete Example

\`\`\`sql
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0              -- Filter rows
AND price > 10              -- More row filtering
GROUP BY category            -- Group by category
HAVING COUNT(*) > 2         -- Filter groups
AND AVG(price) > 50        -- More group filtering
ORDER BY avg_price DESC     -- Sort results
LIMIT 10;                   -- Limit to 10 rows
\`\`\`

---

## Real-World Examples

### Example 1: Top Categories by Revenue

\`\`\`sql
SELECT 
    p.category,
    COUNT(DISTINCT oi.order_id) AS order_count,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.category
HAVING total_revenue > 1000
ORDER BY total_revenue DESC
LIMIT 5;
\`\`\`

### Example 2: Monthly Sales Report

\`\`\`sql
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
AND status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
HAVING order_count > 10
ORDER BY month DESC;
\`\`\`

### Example 3: Customer Purchase Analysis

\`\`\`sql
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
GROUP BY c.id, c.name
HAVING order_count >= 3
AND total_spent > 500
ORDER BY total_spent DESC;
\`\`\`

---

## Best Practices

### 1. Use WHERE Before GROUP BY
Filter rows early to improve performance.

### 2. Use HAVING for Group Filters
Only use HAVING when filtering groups, not rows.

### 3. Index Columns in WHERE and ORDER BY
Indexes improve query performance.

### 4. Use LIMIT for Large Result Sets
Prevent returning too many rows.

---

## Summary

**SQL Clauses:**
- **WHERE** - Filter rows
- **GROUP BY** - Group rows
- **HAVING** - Filter groups
- **ORDER BY** - Sort results
- **LIMIT** - Limit rows

**Key Points:**
- WHERE filters before grouping
- HAVING filters after grouping
- ORDER BY sorts final results
- LIMIT restricts output

Master these clauses to build powerful queries!

---

## Practice Question

**Q:** Write a query to find:
1. Categories with average price > 100
2. Products in stock, grouped by category
3. Top 3 categories by total stock value (price * stock)

**Answer:**
\`\`\`sql
-- 1. Categories with avg price > 100
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- 2. Products in stock, grouped by category
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0
GROUP BY category;

-- 3. Top 3 categories by stock value
SELECT 
    category,
    SUM(price * stock) AS total_stock_value
FROM products
WHERE stock > 0
GROUP BY category
ORDER BY total_stock_value DESC
LIMIT 3;
\`\`\`
  `,
  code: `-- MySQL Clauses Examples

CREATE DATABASE clauses_demo;
USE clauses_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock INT UNSIGNED DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    description TEXT
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Insert sample data
INSERT INTO products (name, price, category, stock, status) VALUES
('Laptop', 999.99, 'Electronics', 50, 'active'),
('Mouse', 29.99, 'Electronics', 100, 'active'),
('Keyboard', 79.99, 'Electronics', 75, 'active'),
('Desk', 199.99, 'Furniture', 30, 'active'),
('Chair', 149.99, 'Furniture', 25, 'active');

-- ========== WHERE Clause ==========

-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions with AND
SELECT * FROM products WHERE price > 100 AND stock > 0;

-- Multiple conditions with OR
SELECT * FROM products WHERE category = 'Electronics' OR category = 'Furniture';

-- IN
SELECT * FROM products WHERE category IN ('Electronics', 'Furniture');

-- NOT IN
SELECT * FROM products WHERE category NOT IN ('Electronics');

-- BETWEEN
SELECT * FROM products WHERE price BETWEEN 50 AND 200;

-- LIKE
SELECT * FROM products WHERE name LIKE '%laptop%';
SELECT * FROM products WHERE name LIKE 'Laptop%';
SELECT * FROM products WHERE name LIKE '%Pro';

-- IS NULL / IS NOT NULL
SELECT * FROM products WHERE description IS NULL;
SELECT * FROM products WHERE description IS NOT NULL;

-- ========== GROUP BY Clause ==========

-- Group by single column
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group by multiple columns
SELECT category, status, COUNT(*) AS count
FROM products
GROUP BY category, status;

-- Group with aggregates
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;

-- ========== HAVING Clause ==========

-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;

-- HAVING with aggregates
SELECT 
    category,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- WHERE vs HAVING
SELECT 
    category,
    COUNT(*) AS count,
    AVG(price) AS avg_price
FROM products
WHERE stock > 0          -- Filter rows first
GROUP BY category
HAVING COUNT(*) > 1     -- Filter groups after
AND AVG(price) > 50;

-- ========== ORDER BY Clause ==========

-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- Using expressions
SELECT 
    name,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC;

-- ========== LIMIT Clause ==========

-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 0;
SELECT * FROM products LIMIT 0, 10;

-- Top N
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- Pagination
SELECT * FROM products LIMIT 0, 10;   -- Page 1
SELECT * FROM products LIMIT 10, 10;  -- Page 2
SELECT * FROM products LIMIT 20, 10;  -- Page 3

-- ========== Complete Example ==========

SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0
AND price > 10
GROUP BY category
HAVING COUNT(*) > 1
AND AVG(price) > 50
ORDER BY avg_price DESC
LIMIT 10;

-- ========== Real-World Examples ==========

-- Top categories by stock value
SELECT 
    category,
    SUM(price * stock) AS total_stock_value
FROM products
WHERE stock > 0
GROUP BY category
ORDER BY total_stock_value DESC
LIMIT 3;

-- Categories with high average price
SELECT 
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING AVG(price) > 100
ORDER BY avg_price DESC;

---

## Real-World Applications

### Business Reporting
Reporting systems use SQL clauses extensively to generate business reports. WHERE filters relevant data, GROUP BY creates report sections, HAVING filters report groups, ORDER BY organizes results, and LIMIT controls report size.

**Implementation Example:**
- Sales reports grouped by month with HAVING for high-performing months
- Product analysis with WHERE filtering and ORDER BY for top products
- Customer reports with GROUP BY for customer segments
- Financial summaries with multiple clauses for comprehensive reporting

### Data Analytics
Analytics applications use clauses for data analysis and insights. WHERE filters data sets, GROUP BY creates analytical dimensions, aggregate functions calculate metrics, HAVING filters significant results, and ORDER BY ranks findings.

**Implementation Example:**
- User behavior analysis with grouping and filtering
- Product performance metrics with aggregation and sorting
- Time-series analysis with date grouping and ordering
- Comparative analysis with multiple clause combinations

### Search and Filtering
Search functionality uses WHERE clauses for filtering, ORDER BY for relevance sorting, and LIMIT for pagination. E-commerce platforms, content management systems, and data applications rely heavily on clause combinations for search.

**Implementation Example:**
- Product search with WHERE filters and ORDER BY relevance
- User search with multiple WHERE conditions
- Paginated results with LIMIT and OFFSET
- Sorted listings with ORDER BY and LIMIT

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using WHERE with Aggregate Functions
**Problem:** WHERE cannot filter on aggregate function results.

**Solution:** Use HAVING to filter groups after aggregation:

\`\`\`sql
-- WRONG - WHERE with aggregate
SELECT category, COUNT(*) FROM products WHERE COUNT(*) > 5;  -- Error!

-- CORRECT - HAVING for aggregates
SELECT category, COUNT(*) FROM products 
GROUP BY category 
HAVING COUNT(*) > 5;
\`\`\`

### Mistake 2: Wrong Clause Order
**Problem:** Incorrect clause order causes syntax errors.

**Solution:** Follow correct SQL clause order:

\`\`\`sql
-- CORRECT ORDER
SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT
\`\`\`

### Mistake 3: Not Using Indexes with WHERE/ORDER BY
**Problem:** WHERE and ORDER BY without indexes cause slow queries.

**Solution:** Create indexes on columns used in WHERE and ORDER BY:

\`\`\`sql
-- Create index for WHERE clause
CREATE INDEX idx_category ON products(category);

-- Create index for ORDER BY
CREATE INDEX idx_price ON products(price);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the correct order of SQL clauses?

The correct order is: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. This order reflects the logical execution sequence: first specify tables (FROM), filter rows (WHERE), group data (GROUP BY), filter groups (HAVING), select columns (SELECT), sort results (ORDER BY), and limit output (LIMIT). Understanding this order is essential for writing correct SQL.

### What's the difference between WHERE and HAVING?

WHERE filters rows before grouping and aggregation, while HAVING filters groups after aggregation. Use WHERE for row-level conditions (e.g., \`WHERE price > 100\`). Use HAVING for group-level conditions with aggregate functions (e.g., \`HAVING COUNT(*) > 10\`). WHERE is more efficient as it filters data earlier in the query execution.

### When should I use GROUP BY?

Use GROUP BY when you need to aggregate data by groups, such as calculating totals, averages, or counts for each category. GROUP BY divides rows into groups, and aggregate functions calculate values for each group. Common use cases include: sales by region, products by category, orders by customer, and data by time period.

### Can I use multiple columns in ORDER BY?

Yes, you can order by multiple columns. The query sorts by the first column, then by the second column for rows with the same first column value, and so on. Specify ASC (ascending) or DESC (descending) for each column:

\`\`\`sql
ORDER BY category ASC, price DESC
\`\`\`

### What is the difference between LIMIT and TOP?

LIMIT is MySQL syntax that limits the number of rows returned. TOP is SQL Server syntax. MySQL uses LIMIT with optional OFFSET for pagination. Use LIMIT for restricting result sets and implementing pagination in MySQL applications.

### Can I use expressions in ORDER BY?

Yes, you can use expressions, column aliases, and even aggregate functions in ORDER BY:

\`\`\`sql
ORDER BY price * stock DESC
ORDER BY total_value DESC  -- Using alias
ORDER BY COUNT(*) DESC  -- With GROUP BY
\`\`\`

### How do I implement pagination with LIMIT?

Use LIMIT with OFFSET for pagination:

\`\`\`sql
-- Page 1 (rows 1-10)
SELECT * FROM products LIMIT 10 OFFSET 0;

-- Page 2 (rows 11-20)
SELECT * FROM products LIMIT 10 OFFSET 10;

-- Page N (rows (N-1)*10+1 to N*10)
SELECT * FROM products LIMIT 10 OFFSET (page_number - 1) * 10;
\`\`\`

### Can I use WHERE with JOINs?

Yes, WHERE works with JOINs. You can filter joined tables using WHERE:

\`\`\`sql
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.price > 100 AND c.name = 'Electronics';
\`\`\`

WHERE filters after the JOIN is performed.

### What happens if I use GROUP BY without aggregate functions?

GROUP BY without aggregates effectively creates distinct groups, similar to DISTINCT but with more control. However, it's more common to use GROUP BY with aggregate functions. Without aggregates, you might want to use DISTINCT instead for simpler queries.

### How do clauses affect query performance?

Clauses affect performance differently: WHERE and HAVING filter data (can improve performance by reducing data processed), ORDER BY requires sorting (can be slow without indexes), GROUP BY requires grouping (can be expensive for large datasets), and LIMIT can improve performance by reducing result set size. Use indexes on columns in WHERE and ORDER BY for best performance.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these clause fundamentals:

- **SQL clauses execute in specific order**: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT
- **WHERE filters rows** before grouping and aggregation
- **HAVING filters groups** after aggregation
- **GROUP BY creates groups** for aggregate calculations
- **ORDER BY sorts results** in ascending or descending order
- **LIMIT restricts** the number of rows returned
- **Use WHERE for row filtering**, HAVING for group filtering
- **Index columns** used in WHERE and ORDER BY for performance
- **Combine clauses** for powerful, flexible queries

---

## What's Next?

Now that you understand SQL clauses, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Select](/tutorial/mysql-select)**: Master the complete SELECT statement
2. **[MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions)**: Use aggregates with GROUP BY and HAVING
3. **[MySQL Joins](/tutorial/mysql-joins)**: Combine clauses with table joins
4. **[MySQL Indexes](/tutorial/mysql-indexes)**: Optimize clause performance with indexes

### Advanced Topics

- **Query Optimization**: Master clause performance tuning
- **Complex Queries**: Build sophisticated multi-clause queries
- **Window Functions**: Advanced analytical functions (MySQL 8.0+)
- **Query Patterns**: Common clause combination patterns

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Clauses](/tutorial/mysql-clauses)**: Deep dive into each clause
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Execute queries with clauses from Java
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA generates clause-based queries

SQL clauses are essential for building effective queries. Continue learning about [MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions) to master data aggregation.
`
};

export default mysqlClauses;


