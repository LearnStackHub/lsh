const mysqlIndexes = {
  id: 'mysql-indexes',
  title: 'MySQL Indexes - Performance Optimization',
  description: 'Learn about indexes: types, creation, optimization, and best practices for query performance',
  content: `
# MySQL Indexes - Performance Optimization

MySQL indexes are data structures that improve the speed of data retrieval operations by providing fast access paths to table data. Indexes work like book indexes, allowing the database to quickly locate rows without scanning entire tables. Understanding indexes is essential for optimizing database performance, especially as data volumes grow. Proper index design significantly improves query performance while balancing the overhead of index maintenance.

Enterprise applications rely heavily on indexes for performance optimization. Large-scale applications with millions of rows require strategic index design to maintain acceptable query performance. Indexes are critical for WHERE clauses, JOIN operations, ORDER BY, and GROUP BY operations. However, indexes also add overhead to INSERT, UPDATE, and DELETE operations, requiring careful design and maintenance.

**Index Types:**
- **Primary Key Index**: Automatically created for PRIMARY KEY columns
- **Unique Index**: Ensures uniqueness and speeds up lookups
- **Regular Index**: Most common type for general query optimization
- **Composite Index**: Index on multiple columns
- **Full-Text Index**: For text search operations (MyISAM/InnoDB)

---

## What are Indexes?

An **index** is like a book's index:
- Points to data location
- Speeds up SELECT queries
- Slows down INSERT/UPDATE/DELETE (trade-off)

---

## Types of Indexes

### 1. Primary Key Index
Automatically created for PRIMARY KEY.

\`\`\`sql
-- Primary key automatically creates index
CREATE TABLE products (
    id INT PRIMARY KEY,  -- Index created automatically
    name VARCHAR(200)
);
\`\`\`

### 2. Unique Index
Ensures unique values, speeds up lookups.

\`\`\`sql
-- Create unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Or in table definition
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    UNIQUE INDEX idx_email (email)
);
\`\`\`

### 3. Regular Index (Non-Unique)
Most common type, speeds up queries.

\`\`\`sql
-- Create index
CREATE INDEX idx_name ON products(name);

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);
\`\`\`

### 4. Full-Text Index
For full-text searches (MyISAM, InnoDB 5.6+).

\`\`\`sql
-- Create full-text index
CREATE FULLTEXT INDEX idx_description ON products(description);

-- Use in queries
SELECT * FROM products 
WHERE MATCH(description) AGAINST('laptop' IN NATURAL LANGUAGE MODE);
\`\`\`

### 5. Spatial Index
For geographic data (GEOMETRY columns).

\`\`\`sql
-- Create spatial index
CREATE SPATIAL INDEX idx_location ON places(location);
\`\`\`

---

## Creating Indexes

### CREATE INDEX

\`\`\`sql
-- Single column index
CREATE INDEX idx_name ON products(name);

-- Composite index (multiple columns)
CREATE INDEX idx_category_price ON products(category, price);

-- Index with prefix length
CREATE INDEX idx_name_prefix ON products(name(10));
\`\`\`

### CREATE INDEX with ALTER TABLE

\`\`\`sql
-- Add index
ALTER TABLE products ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products ADD INDEX idx_category_price (category, price);
\`\`\`

### CREATE INDEX in Table Definition

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_category_price (category, price)
);
\`\`\`

---

## Dropping Indexes

\`\`\`sql
-- Drop index
DROP INDEX idx_name ON products;

-- Or with ALTER TABLE
ALTER TABLE products DROP INDEX idx_name;
\`\`\`

---

## Viewing Indexes

\`\`\`sql
-- Show indexes for table
SHOW INDEX FROM products;

-- Show indexes with details
SHOW INDEX FROM products FROM database_name;

-- Query information schema
SELECT 
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'database_name'
AND TABLE_NAME = 'products';
\`\`\`

---

## Index Usage

### When Indexes are Used

Indexes are used for:
- **WHERE clauses** - Filtering rows
- **JOIN conditions** - Joining tables
- **ORDER BY** - Sorting results
- **GROUP BY** - Grouping data

\`\`\`sql
-- Index used for WHERE
SELECT * FROM products WHERE name = 'Laptop';  -- Uses idx_name

-- Index used for JOIN
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id;  -- Uses index on category_id

-- Index used for ORDER BY
SELECT * FROM products ORDER BY name;  -- Uses idx_name
\`\`\`

### EXPLAIN to Check Index Usage

\`\`\`sql
-- Check if index is used
EXPLAIN SELECT * FROM products WHERE name = 'Laptop';

-- Look for:
-- key: Index name used
-- rows: Number of rows examined
-- type: ALL = no index, ref/index = index used
\`\`\`

---

## Composite Indexes

Index on multiple columns.

### Column Order Matters

\`\`\`sql
-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- This index helps:
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM products WHERE category = 'Electronics' AND price > 100;

-- But NOT this:
SELECT * FROM products WHERE price > 100;  -- Can't use index efficiently
\`\`\`

### Best Practices for Composite Indexes

1. **Most selective column first**
\`\`\`sql
-- Good: category is more selective
CREATE INDEX idx_category_price ON products(category, price);

-- Less optimal: price first
CREATE INDEX idx_price_category ON products(price, category);
\`\`\`

2. **Leftmost prefix rule**
\`\`\`sql
-- Index on (a, b, c) can be used for:
-- WHERE a = ?
-- WHERE a = ? AND b = ?
-- WHERE a = ? AND b = ? AND c = ?
-- But NOT: WHERE b = ? or WHERE c = ?
\`\`\`

---

## Index Performance

### Benefits
- ✅ Faster SELECT queries
- ✅ Faster JOINs
- ✅ Faster ORDER BY
- ✅ Enforces uniqueness

### Costs
- ❌ Slower INSERT/UPDATE/DELETE
- ❌ Additional storage space
- ❌ Maintenance overhead

---

## Real-World Examples

### Example 1: E-Commerce Products

\`\`\`sql
-- Products table with indexes
CREATE TABLE products (
    id INT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_category_price (category, price),
    INDEX idx_created (created_at)
);

-- Common queries will use indexes:
-- Search by name
SELECT * FROM products WHERE name LIKE '%laptop%';

-- Filter by category and price
SELECT * FROM products WHERE category = 'Electronics' AND price < 500;

-- Sort by date
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;
\`\`\`

### Example 2: User Orders

\`\`\`sql
-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    status VARCHAR(20),
    total_amount DECIMAL(10, 2),
    INDEX idx_user_id (user_id),
    INDEX idx_order_date (order_date),
    INDEX idx_status (status),
    INDEX idx_user_date (user_id, order_date)
);

-- Efficient queries:
-- User's orders
SELECT * FROM orders WHERE user_id = 123;

-- User's recent orders
SELECT * FROM orders WHERE user_id = 123 ORDER BY order_date DESC;

-- Orders by status
SELECT * FROM orders WHERE status = 'pending';
\`\`\`

---

## Best Practices

### 1. Index Columns in WHERE
\`\`\`sql
-- If you frequently query:
SELECT * FROM products WHERE category = 'Electronics';
-- Then index:
CREATE INDEX idx_category ON products(category);
\`\`\`

### 2. Index Foreign Keys
\`\`\`sql
-- Foreign keys should be indexed
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);
\`\`\`

### 3. Don't Over-Index
Too many indexes slow down writes.

### 4. Use EXPLAIN
Check if indexes are actually used.

### 5. Monitor Index Usage
\`\`\`sql
-- Check index usage statistics
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'your_database';
\`\`\`

---

## Summary

**Index Types:**
- Primary Key (automatic)
- Unique Index
- Regular Index
- Full-Text Index
- Spatial Index

**Key Points:**
- Indexes speed up SELECT queries
- Slow down INSERT/UPDATE/DELETE
- Composite indexes: column order matters
- Use EXPLAIN to verify index usage

Master indexes to optimize database performance!

---

## Practice Question

**Q:** Create indexes for a products table that will optimize:
1. Searching by product name
2. Filtering by category and price range
3. Sorting by creation date
4. Joining with categories table

**Answer:**
\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category_id INT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category_price (category_id, price),
    INDEX idx_created (created_at),
    INDEX idx_category_id (category_id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
\`\`\`
  `,
  code: `-- MySQL Indexes Examples

CREATE DATABASE indexes_demo;
USE indexes_demo;

-- ========== Primary Key Index ==========

-- Primary key automatically creates index
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200)
);

-- ========== Unique Index ==========

CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(50)
);

-- Create unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Or in table definition
CREATE TABLE users2 (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    UNIQUE INDEX idx_email (email)
);

-- ========== Regular Index ==========

-- Single column index
CREATE INDEX idx_name ON products(name);

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- Index with prefix
CREATE INDEX idx_name_prefix ON products(name(10));

-- ========== Full-Text Index ==========

CREATE TABLE articles (
    id INT PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    FULLTEXT INDEX idx_content (content)
);

-- Use full-text search
SELECT * FROM articles 
WHERE MATCH(content) AGAINST('laptop' IN NATURAL LANGUAGE MODE);

-- ========== Creating Indexes ==========

-- CREATE INDEX
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_category_price ON products(category, price);

-- ALTER TABLE
ALTER TABLE products ADD INDEX idx_name (name);
ALTER TABLE products ADD UNIQUE INDEX idx_sku (sku);
ALTER TABLE products ADD INDEX idx_category_price (category, price);

-- In table definition
CREATE TABLE products2 (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_category_price (category, price)
);

-- ========== Dropping Indexes ==========

-- Drop index
DROP INDEX idx_name ON products;

-- Or with ALTER TABLE
ALTER TABLE products DROP INDEX idx_name;

-- ========== Viewing Indexes ==========

-- Show indexes
SHOW INDEX FROM products;

-- Query information schema
SELECT 
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'indexes_demo'
AND TABLE_NAME = 'products';

-- ========== Index Usage ==========

-- Check index usage with EXPLAIN
EXPLAIN SELECT * FROM products WHERE name = 'Laptop';

-- Index used for WHERE
SELECT * FROM products WHERE name = 'Laptop';

-- Index used for ORDER BY
SELECT * FROM products ORDER BY name;

-- Index used for JOIN
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id;

-- ========== Composite Indexes ==========

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- This helps:
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM products WHERE category = 'Electronics' AND price > 100;

-- This doesn't use index efficiently:
-- SELECT * FROM products WHERE price > 100;

-- ========== Real-World Example ==========

CREATE TABLE products (
    id INT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_category_price (category, price),
    INDEX idx_created (created_at)
);

-- Optimized queries
SELECT * FROM products WHERE name LIKE '%laptop%';
SELECT * FROM products WHERE category = 'Electronics' AND price < 500;
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;

-- ========== Foreign Key Indexes ==========

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    INDEX idx_customer_id (customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

---

## Real-World Applications

### High-Traffic E-Commerce
E-commerce platforms with millions of products require strategic indexing for search, filtering, and sorting operations. Indexes on product names, categories, prices, and SKUs enable fast product searches and catalog browsing.

**Implementation Example:**
- Index on product name for search functionality
- Composite index on (category, price) for filtered sorting
- Index on SKU for product lookup
- Index on created_at for new product listings

### User Management Systems
User management systems use indexes extensively for authentication and user lookup operations. Indexes on email, username, and user IDs enable fast login and user retrieval operations.

**Implementation Example:**
- Unique index on email for login and duplicate prevention
- Index on username for user lookup
- Index on user_id for foreign key relationships
- Composite index on (status, created_at) for user queries

### Financial Transaction Systems
Banking and financial systems require indexes for transaction queries, account lookups, and reporting. Indexes enable fast transaction history retrieval and account balance calculations.

**Implementation Example:**
- Index on account_number for account lookup
- Index on transaction_date for time-based queries
- Composite index on (account_id, transaction_date) for account history
- Index on transaction_type for filtering

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Over-Indexing
**Problem:** Too many indexes slow down INSERT/UPDATE/DELETE operations.

**Solution:** Create indexes only for frequently queried columns:

\`\`\`sql
-- AVOID - Too many indexes
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    INDEX idx_name (name),
    INDEX idx_name2 (name),  -- Duplicate!
    INDEX idx_created (created_at),
    INDEX idx_updated (updated_at),
    INDEX idx_status (status)
    -- Too many indexes!
);

-- PREFER - Strategic indexing
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    INDEX idx_name (name),  -- For search
    INDEX idx_status_created (status, created_at)  -- Composite for common queries
);
\`\`\`

### Mistake 2: Not Indexing Foreign Keys
**Problem:** Foreign key columns without indexes cause slow JOINs.

**Solution:** Always index foreign key columns:

\`\`\`sql
-- GOOD - Indexed foreign key
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    INDEX idx_customer_id (customer_id),  -- Index for JOIN
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

### Mistake 3: Wrong Composite Index Order
**Problem:** Composite index column order affects usability.

**Solution:** Order columns by selectivity (most selective first):

\`\`\`sql
-- GOOD - Most selective first
CREATE INDEX idx_category_price ON products(category, price);
-- Works for: category, category+price
-- Doesn't work efficiently for: price alone

-- BETTER - If price queries are common
CREATE INDEX idx_price_category ON products(price, category);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is an index and why is it important?

An index is a data structure that improves query performance by providing fast access paths to table data. It's important because it dramatically speeds up SELECT queries, especially on large tables. Without indexes, databases must scan entire tables (full table scan), which becomes slow as data grows. Indexes are essential for production database performance.

### How do indexes improve query performance?

Indexes improve performance by allowing the database to quickly locate rows without scanning entire tables. Instead of checking every row, the database uses the index to jump directly to relevant rows. This is similar to using a book's index to find a topic instead of reading the entire book.

### What's the difference between PRIMARY KEY and UNIQUE index?

A PRIMARY KEY is a special unique index that cannot be NULL and a table can have only one. A UNIQUE index ensures uniqueness but allows NULL values and a table can have multiple. Both create indexes automatically. Use PRIMARY KEY for the main identifier, UNIQUE for other unique columns like email.

### Do indexes slow down INSERT/UPDATE/DELETE?

Yes, indexes add overhead to INSERT, UPDATE, and DELETE operations because the database must maintain the index when data changes. However, the performance benefit for SELECT queries usually outweighs this cost. Balance index creation based on query patterns - more SELECTs benefit from more indexes, more writes benefit from fewer indexes.

### What is a composite index and when should I use it?

A composite index is an index on multiple columns. Use it when queries filter or sort by multiple columns together. The column order matters - put the most selective column first. Composite indexes can be used for queries on the leftmost columns, but not efficiently for queries on only rightmost columns.

### How many indexes should I create?

Create indexes strategically based on query patterns. Index columns used in WHERE clauses, JOIN conditions, ORDER BY, and GROUP BY. Avoid over-indexing as it slows down writes. A good starting point is: primary key (automatic), foreign keys, frequently queried columns, and composite indexes for common query patterns.

### Can I see if my query uses an index?

Yes, use EXPLAIN before your SELECT statement to see the query execution plan:

\`\`\`sql
EXPLAIN SELECT * FROM products WHERE name = 'Laptop';
\`\`\`

The output shows whether indexes are used and how the query is executed.

### What happens if I don't index a column used in WHERE?

Without an index, the database performs a full table scan, checking every row. This is slow for large tables and gets slower as data grows. Always index columns used frequently in WHERE clauses for acceptable performance.

### Should I index every column?

No, don't index every column. Index only columns used in WHERE, JOIN, ORDER BY, or GROUP BY clauses. Over-indexing wastes storage and slows down INSERT/UPDATE/DELETE operations. Create indexes strategically based on actual query patterns, not "just in case."

### How do I maintain indexes?

Indexes are automatically maintained by MySQL when data changes. However, you should periodically analyze table statistics (ANALYZE TABLE) to help the optimizer choose the best indexes. Monitor index usage and remove unused indexes. Use OPTIMIZE TABLE to rebuild indexes and reclaim space.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these index fundamentals:

- **Indexes improve SELECT performance** by providing fast data access
- **Indexes slow down INSERT/UPDATE/DELETE** due to maintenance overhead
- **Primary keys automatically create indexes** for fast lookups
- **Always index foreign keys** for efficient JOINs
- **Composite indexes** enable efficient multi-column queries
- **Index column order matters** in composite indexes
- **Use EXPLAIN** to verify index usage
- **Create indexes strategically** based on query patterns
- **Balance index benefits** with write performance costs

---

## What's Next?

Now that you understand indexes, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Select](/tutorial/mysql-select)**: See how indexes improve SELECT queries
2. **[MySQL Joins](/tutorial/mysql-joins)**: Understand index usage in JOINs
3. **[MySQL Constraints](/tutorial/mysql-constraints)**: See how constraints create indexes
4. **[MySQL Performance Tuning](/tutorial/mysql-performance)**: Master query optimization

### Advanced Topics

- **Index Types**: Deep dive into different index implementations
- **Query Optimization**: Master EXPLAIN and query tuning
- **Index Maintenance**: Learn index monitoring and maintenance
- **Full-Text Search**: Understand full-text indexes for text search

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Create Database](/tutorial/mysql-create-database)**: Create tables with indexes
- **[Database Design](/tutorial/database-design)**: Design databases with performance in mind
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA handles indexing

Indexes are essential for database performance. Continue learning about [MySQL Performance Tuning](/tutorial/mysql-performance) to master query optimization techniques.
`
};

export default mysqlIndexes;


