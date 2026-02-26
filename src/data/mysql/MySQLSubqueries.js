const mysqlSubqueries = {
  id: 'mysql-subqueries',
  title: 'MySQL Subqueries - Nested Queries',
  description: 'Master subqueries: correlated, non-correlated, EXISTS, IN, ANY, ALL for complex data retrieval',
  content: `
# MySQL Subqueries — Nested Queries for Complex Logic

Subqueries (nested queries) are queries inside other queries. They allow you to solve complex problems by breaking them into smaller parts.

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
AND p.stock > 0;`
};

export default mysqlSubqueries;


