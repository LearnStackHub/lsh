const mysqlSubqueries = {
  id: 'mysql-subqueries',
  title: 'MySQL Subqueries - Nested Queries',
  description: 'Master subqueries: correlated, non-correlated, EXISTS, IN, ANY, ALL for complex data retrieval',
  content: `
# MySQL Subqueries - Nested Queries for Complex Logic

MySQL subqueries, also known as nested queries, are SELECT statements embedded within other SQL statements. Subqueries enable complex data retrieval by breaking problems into smaller, manageable parts and allow you to use the result of one query as input for another. Understanding subqueries is essential for solving advanced data retrieval problems that cannot be easily solved with simple SELECT statements.

Enterprise applications extensively use subqueries for complex reporting, data analysis, and conditional data retrieval. Subqueries enable finding data based on calculations from other tables, comparing values against aggregated results, and implementing sophisticated filtering logic. Mastery of subqueries is crucial for building complex database queries and reports.

**Subquery Types:**
- **Scalar Subquery**: Returns single value (one row, one column)
- **Row Subquery**: Returns single row (multiple columns)
- **Column Subquery**: Returns single column (multiple rows)
- **Table Subquery**: Returns table (used in FROM clause)

---

## What are Subqueries?

A **subquery** is a SELECT statement nested inside another SQL statement:
- Inside SELECT
- Inside WHERE
- Inside FROM
- Inside HAVING

---

## Types of Subqueries

1. **Scalar Subquery** - Returns single value
2. **Row Subquery** - Returns single row
3. **Column Subquery** - Returns single column
4. **Table Subquery** - Returns table (used in FROM)

---

## 1. Scalar Subquery (Single Value)

Returns one row and one column.

### In SELECT

\`\`\`sql
-- Get product with average price
SELECT 
    name,
    price,
    (SELECT AVG(price) FROM products) AS avg_price,
    price - (SELECT AVG(price) FROM products) AS difference
FROM products;
\`\`\`

### In WHERE

\`\`\`sql
-- Products above average price
SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);

-- Customers who spent more than average
SELECT * FROM customers
WHERE id IN (
    SELECT customer_id FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) > (SELECT AVG(total_amount) FROM orders)
);
\`\`\`

---

## 2. Subquery with IN

Check if value exists in subquery result.

\`\`\`sql
-- Customers who placed orders
SELECT * FROM customers
WHERE id IN (SELECT DISTINCT customer_id FROM orders);

-- Products in specific category
SELECT * FROM products
WHERE category IN ('Electronics', 'Furniture');
\`\`\`

### NOT IN

\`\`\`sql
-- Customers who never placed orders
SELECT * FROM customers
WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL);
\`\`\`

---

## 3. Subquery with EXISTS

Checks if subquery returns any rows (more efficient than IN for large datasets).

\`\`\`sql
-- Customers who have orders
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- Products that have been ordered
SELECT * FROM products p
WHERE EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
);
\`\`\`

### NOT EXISTS

\`\`\`sql
-- Customers without orders
SELECT * FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
\`\`\`

---

## 4. Correlated Subqueries

Subquery references outer query (executes for each row).

\`\`\`sql
-- Products with price above category average
SELECT p1.* FROM products p1
WHERE p1.price > (
    SELECT AVG(p2.price) 
    FROM products p2 
    WHERE p2.category = p1.category
);

-- Orders with total above customer average
SELECT o1.* FROM orders o1
WHERE o1.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);
\`\`\`

---

## 5. Subquery with ANY/SOME

Returns true if comparison is true for ANY value.

\`\`\`sql
-- Products more expensive than any Electronics product
SELECT * FROM products
WHERE price > ANY (
    SELECT price FROM products WHERE category = 'Electronics'
);

-- Same as
SELECT * FROM products
WHERE price > (
    SELECT MIN(price) FROM products WHERE category = 'Electronics'
);
\`\`\`

---

## 6. Subquery with ALL

Returns true if comparison is true for ALL values.

\`\`\`sql
-- Products more expensive than all Electronics products
SELECT * FROM products
WHERE price > ALL (
    SELECT price FROM products WHERE category = 'Electronics'
);

-- Same as
SELECT * FROM products
WHERE price > (
    SELECT MAX(price) FROM products WHERE category = 'Electronics'
);
\`\`\`

---

## 7. Subquery in FROM (Derived Tables)

Use subquery result as a table.

\`\`\`sql
-- Top customers by spending
SELECT 
    customer_name,
    total_spent
FROM (
    SELECT 
        c.name AS customer_name,
        SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id, c.name
) AS customer_totals
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

---

## Real-World Examples

### Example 1: Find Top Customers

\`\`\`sql
-- Customers who spent more than average
SELECT 
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING SUM(o.total_amount) > (
    SELECT AVG(total_amount) FROM orders
)
ORDER BY total_spent DESC;
\`\`\`

### Example 2: Products Never Ordered

\`\`\`sql
-- Products that have never been ordered
SELECT * FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
);
\`\`\`

### Example 3: Second Highest Price

\`\`\`sql
-- Product with second highest price
SELECT * FROM products
WHERE price = (
    SELECT MAX(price) FROM products
    WHERE price < (SELECT MAX(price) FROM products)
);
\`\`\`

### Example 4: Customers with Most Orders

\`\`\`sql
-- Customers who placed more orders than average
SELECT 
    c.name,
    COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING COUNT(o.id) > (
    SELECT AVG(order_count)
    FROM (
        SELECT COUNT(*) AS order_count
        FROM orders
        GROUP BY customer_id
    ) AS avg_orders
);
\`\`\`

---

## Subquery vs JOIN

### When to Use Subquery

✅ Single value needed
✅ EXISTS checks
✅ Correlated conditions
✅ Complex calculations

### When to Use JOIN

✅ Multiple columns needed
✅ Better performance for large datasets
✅ Simpler to read

### Example Comparison

**Subquery:**
\`\`\`sql
SELECT * FROM products
WHERE category_id IN (SELECT id FROM categories WHERE name = 'Electronics');
\`\`\`

**JOIN (Often Better):**
\`\`\`sql
SELECT p.* FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name = 'Electronics';
\`\`\`

---

## Best Practices

### 1. Use EXISTS for Existence Checks
\`\`\`sql
-- Good (stops at first match)
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Less efficient
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

### 2. Avoid Subqueries in SELECT (When Possible)
\`\`\`sql
-- Less efficient
SELECT name, (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) AS order_count
FROM customers c;

-- Better with JOIN
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`

### 3. Use Indexes
Ensure subquery columns are indexed.

---

## Summary

Subqueries enable:
- **Complex Logic** - Break problems into parts
- **Flexible Queries** - Dynamic conditions
- **Data Comparison** - Compare with aggregated data
- **Existence Checks** - EXISTS, IN, ANY, ALL

**Types:**
- Scalar (single value)
- EXISTS/IN (existence)
- Correlated (references outer query)
- Derived tables (in FROM)

Master subqueries, and you can solve any query problem!

**Related Topics:**
- Combine with [MySQL Joins](/tutorial/mysql-joins) for complex queries
- Use [MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions) in subqueries
- Learn [MySQL Clauses](/tutorial/mysql-clauses) for filtering subquery results
- Practice with [MySQL SELECT](/tutorial/mysql-select) queries

---

## Practice Question

**Q:** Write a query to find products that:
1. Have price above the average price of their category
2. Have been ordered at least once
3. Are currently in stock

**Answer:**
\`\`\`sql
SELECT * FROM products p
WHERE p.price > (
    SELECT AVG(price) FROM products WHERE category = p.category
)
AND EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
)
AND p.stock > 0;
\`\`\`
  `,
  code: `-- MySQL Subqueries Examples

CREATE DATABASE subqueries_demo;
USE subqueries_demo;

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock INT UNSIGNED DEFAULT 0
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
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

INSERT INTO products (name, price, category, stock) VALUES
('Laptop', 999.99, 'Electronics', 50),
('Mouse', 29.99, 'Electronics', 100),
('Keyboard', 79.99, 'Electronics', 75),
('Desk', 199.99, 'Furniture', 30);

INSERT INTO orders (customer_id, total_amount, order_date) VALUES
(1, 999.99, '2024-01-15'),
(2, 109.98, '2024-01-16'),
(1, 199.99, '2024-01-17');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 999.99),
(2, 2, 2, 29.99),
(2, 3, 1, 79.99),
(3, 4, 1, 199.99);

-- ========== Scalar Subqueries ==========

-- In SELECT
SELECT 
    name,
    price,
    (SELECT AVG(price) FROM products) AS avg_price,
    price - (SELECT AVG(price) FROM products) AS difference
FROM products;

-- In WHERE
SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);

-- ========== IN Subquery ==========

-- Customers who placed orders
SELECT * FROM customers
WHERE id IN (SELECT DISTINCT customer_id FROM orders);

-- Products that have been ordered
SELECT * FROM products
WHERE id IN (SELECT DISTINCT product_id FROM order_items);

-- NOT IN
SELECT * FROM customers
WHERE id NOT IN (
    SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL
);

-- ========== EXISTS Subquery ==========

-- Customers with orders
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- Products that have been ordered
SELECT * FROM products p
WHERE EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
);

-- NOT EXISTS
SELECT * FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
);

-- ========== Correlated Subqueries ==========

-- Products above category average
SELECT p1.* FROM products p1
WHERE p1.price > (
    SELECT AVG(p2.price) 
    FROM products p2 
    WHERE p2.category = p1.category
);

-- Orders above customer average
SELECT o1.* FROM orders o1
WHERE o1.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);

-- ========== ANY/SOME ==========

-- Products more expensive than any Electronics product
SELECT * FROM products
WHERE price > ANY (
    SELECT price FROM products WHERE category = 'Electronics'
);

-- ========== ALL ==========

-- Products more expensive than all Electronics products
SELECT * FROM products
WHERE price > ALL (
    SELECT price FROM products WHERE category = 'Electronics'
);

-- ========== Derived Tables (FROM) ==========

-- Top customers by spending
SELECT 
    customer_name,
    total_spent
FROM (
    SELECT 
        c.name AS customer_name,
        SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id, c.name
) AS customer_totals
ORDER BY total_spent DESC;

-- ========== Real-World Examples ==========

-- Customers who spent more than average
SELECT 
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING SUM(o.total_amount) > (
    SELECT AVG(total_amount) FROM orders
);

-- Second highest price
SELECT * FROM products
WHERE price = (
    SELECT MAX(price) FROM products
    WHERE price < (SELECT MAX(price) FROM products)
);

-- Products above category average, ordered, in stock
SELECT * FROM products p
WHERE p.price > (
    SELECT AVG(price) FROM products WHERE category = p.category
)
AND EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
)
AND p.stock > 0;

---

## Real-World Applications

### Advanced Reporting
Reporting systems use subqueries extensively for complex calculations and comparisons. Subqueries enable finding records above averages, comparing against totals, and implementing sophisticated filtering logic that requires data from multiple sources.

**Implementation Example:**
- Products priced above category average
- Customers who spent more than average
- Orders with values above customer's average order
- Employees with salaries above department average

### Data Analysis
Analytics applications use subqueries for comparative analysis and statistical calculations. Subqueries enable finding top performers, identifying outliers, and calculating relative metrics that require comparison against aggregated data.

**Implementation Example:**
- Top N products by sales using subqueries
- Products with sales above threshold
- Customers with purchase frequency above average
- Time periods with performance above average

### Complex Filtering
Applications use subqueries for complex filtering that depends on calculations from other tables or aggregated data. Subqueries enable filtering based on relationships and calculations that cannot be expressed with simple WHERE conditions.

**Implementation Example:**
- Products that have been ordered (EXISTS subquery)
- Customers who have placed orders in last 30 days
- Products with inventory below reorder level
- Orders with items from specific categories

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Subquery When Join Would Work
**Problem:** Using subquery when a JOIN would be simpler and more efficient.

**Solution:** Prefer JOINs when possible, use subqueries for complex logic:

\`\`\`sql
-- PREFER - JOIN is simpler
SELECT p.* FROM products p
JOIN order_items oi ON p.id = oi.product_id;

-- AVOID - Subquery when JOIN works
SELECT * FROM products 
WHERE id IN (SELECT product_id FROM order_items);
\`\`\`

### Mistake 2: Correlated Subquery Performance Issues
**Problem:** Correlated subqueries can be slow as they execute for each row.

**Solution:** Consider rewriting as JOINs or using EXISTS for better performance:

\`\`\`sql
-- SLOW - Correlated subquery
SELECT * FROM products p
WHERE p.price > (SELECT AVG(price) FROM products WHERE category = p.category);

-- FASTER - Consider JOIN or window function
\`\`\`

### Mistake 3: Subquery Returning Multiple Rows When Single Expected
**Problem:** Subquery returning multiple rows when operator expects single value.

**Solution:** Ensure subquery returns single value or use IN/ANY/ALL:

\`\`\`sql
-- WRONG - Multiple rows with =
SELECT * FROM products 
WHERE price = (SELECT price FROM products WHERE category = 'Electronics');

-- CORRECT - Use IN or aggregate
SELECT * FROM products 
WHERE price IN (SELECT price FROM products WHERE category = 'Electronics');
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a subquery and when should I use it?

A subquery is a SELECT statement nested inside another SQL statement. Use subqueries when you need to: (1) filter based on calculations from other tables, (2) compare values against aggregated results, (3) implement complex logic that cannot be expressed with simple WHERE conditions, or (4) use results from one query as input for another. Subqueries are powerful but should be used when JOINs cannot solve the problem.

### What's the difference between correlated and non-correlated subqueries?

A non-correlated subquery executes once and its result is used by the outer query. A correlated subquery references columns from the outer query and executes once for each row of the outer query. Correlated subqueries are more flexible but can be slower. Use non-correlated when possible for better performance.

### Can I use subqueries in the SELECT clause?

Yes, scalar subqueries (returning single value) can be used in the SELECT clause:

\`\`\`sql
SELECT 
    name,
    price,
    (SELECT AVG(price) FROM products) AS avg_price
FROM products;
\`\`\`

This is useful for including calculated values in results.

### What's the difference between IN and EXISTS?

IN checks if a value exists in a list of values from subquery results. EXISTS checks if the subquery returns any rows. EXISTS is often more efficient, especially with correlated subqueries, as it stops at the first match. Use IN for value lists, EXISTS for existence checks. Learn about [MySQL Joins](/tutorial/mysql-joins) as an alternative to IN/EXISTS.

### Can I use aggregate functions in subqueries?

Yes, aggregate functions are commonly used in subqueries to calculate values for comparison:

\`\`\`sql
SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

This enables filtering based on calculated thresholds.

### What is a derived table (table subquery)?

A derived table is a subquery used in the FROM clause that acts like a temporary table:

\`\`\`sql
SELECT * FROM (
    SELECT category, COUNT(*) AS count 
    FROM products 
    GROUP BY category
) AS category_counts;
\`\`\`

Derived tables enable complex querying of aggregated or transformed data.

### How do I optimize subquery performance?

Optimize subqueries by: (1) using EXISTS instead of IN when possible, (2) rewriting correlated subqueries as JOINs, (3) ensuring subqueries use indexes, (4) limiting subquery results, and (5) considering window functions (MySQL 8.0+) as alternatives. Test query performance and use EXPLAIN to analyze execution plans.

### Can I nest subqueries multiple levels deep?

Yes, you can nest subqueries multiple levels, but deep nesting makes queries hard to read and maintain. Consider refactoring deeply nested subqueries using JOINs, CTEs (Common Table Expressions in MySQL 8.0+), or breaking into multiple queries. Limit nesting to 2-3 levels for maintainability.

### What's the difference between ANY and ALL?

ANY returns true if the condition is true for any value returned by the subquery. ALL returns true only if the condition is true for all values returned by the subquery. Use ANY for "at least one" conditions, ALL for "all must satisfy" conditions.

### When should I use a subquery vs a JOIN?

Use JOINs when you need to combine data from multiple tables in the result set. Use subqueries when you need to filter or calculate based on data from other tables but don't need that data in the result. JOINs are generally more efficient, but subqueries are better for complex conditional logic. Often, both approaches work - choose based on readability and performance.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these subquery fundamentals:

- **Subqueries are nested queries** that enable complex data retrieval
- **Scalar subqueries** return single values for comparison
- **Correlated subqueries** reference outer query columns
- **IN and EXISTS** check for value existence in subquery results
- **Subqueries can use aggregates** for calculated comparisons
- **Derived tables** are subqueries used in FROM clause
- **JOINs are often better** than subqueries for combining data
- **Subquery performance** can be optimized with proper indexing
- **Deep nesting** should be avoided for maintainability

---

## What's Next?

Now that you understand subqueries, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Joins](/tutorial/mysql-joins)**: Learn alternatives to subqueries using JOINs
2. **[MySQL Aggregate Functions](/tutorial/mysql-aggregate-functions)**: Use aggregates in subqueries
3. **[MySQL Views](/tutorial/mysql-views)**: Simplify complex subqueries with views
4. **[MySQL Select](/tutorial/mysql-select)**: Combine subqueries with SELECT

### Advanced Topics

- **Common Table Expressions (CTEs)**: Simplify complex subqueries (MySQL 8.0+)
- **Window Functions**: Advanced analytical alternatives to subqueries
- **Subquery Optimization**: Master performance tuning techniques
- **Complex Nested Queries**: Handle multi-level subquery scenarios

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Clauses](/tutorial/mysql-clauses)**: Understand WHERE, HAVING with subqueries
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Execute subqueries from Java
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA handles complex queries

Subqueries are essential for complex data retrieval. Continue learning about [MySQL Views](/tutorial/mysql-views) to simplify complex subquery logic.
`
};

export default mysqlSubqueries;


