const mysqlInterviewQuestions = {
  id: 'mysql-interview-questions',
  title: 'Top 30 MySQL Interview Questions',
  description: 'Most frequently asked MySQL interview questions for database developers with detailed answers, real-world scenarios, and SQL examples',
  content: `
# Top 30 MySQL Interview Questions - Complete Guide

Master the most commonly asked MySQL interview questions for database developers and backend engineers. These questions cover fundamentals to advanced concepts.

---

## Basic Level Questions (Freshers to 1 Year)

---

### Question 1: What is MySQL? Explain its features.

**Answer:**
MySQL is an open-source relational database management system (RDBMS) that uses SQL (Structured Query Language).

**Key Features:**
- Open-source and free
- Cross-platform (Windows, Linux, macOS)
- High performance and scalability
- ACID compliance
- Supports multiple storage engines (InnoDB, MyISAM)
- Strong data security
- Easy to use and maintain

**Real-Time Use Cases:**
- Web applications (WordPress, Drupal)
- E-commerce platforms
- Content management systems
- Data warehousing

---

### Question 2: What is the difference between CHAR and VARCHAR?

**Answer:**

| Feature | CHAR | VARCHAR |
|---------|------|---------|
| Storage | Fixed length | Variable length |
| Padding | Pads with spaces | No padding |
| Performance | Faster for fixed data | Slightly slower |
| Use Case | Fixed-length data (codes, IDs) | Variable-length data (names, addresses) |

**Example:**
\`\`\`sql
CREATE TABLE users (
    id CHAR(10),        -- Always 10 characters
    name VARCHAR(100)   -- Up to 100 characters
);
\`\`\`

---

### Question 3: Explain MySQL data types.

**Answer:**
MySQL supports various data types:

**Numeric Types:**
- \`INT\` - Integer (-2,147,483,648 to 2,147,483,647)
- \`BIGINT\` - Large integer
- \`DECIMAL(p,s)\` - Fixed-point number
- \`FLOAT\` - Single precision floating-point
- \`DOUBLE\` - Double precision floating-point

**String Types:**
- \`CHAR(n)\` - Fixed-length string
- \`VARCHAR(n)\` - Variable-length string
- \`TEXT\` - Large text data
- \`BLOB\` - Binary large object

**Date/Time Types:**
- \`DATE\` - Date (YYYY-MM-DD)
- \`TIME\` - Time (HH:MM:SS)
- \`DATETIME\` - Date and time
- \`TIMESTAMP\` - Auto-updating timestamp

---

### Question 4: What is the difference between DELETE, TRUNCATE, and DROP?

**Answer:**

| Operation | Speed | Rollback | WHERE Clause | Auto-increment Reset |
|-----------|-------|----------|--------------|---------------------|
| DELETE | Slow | Yes | Yes | No |
| TRUNCATE | Fast | No | No | Yes |
| DROP | Fastest | No | No | N/A (table removed) |

**Example:**
\`\`\`sql
-- DELETE: Removes rows, can be rolled back
DELETE FROM users WHERE age < 18;

-- TRUNCATE: Removes all rows, faster
TRUNCATE TABLE users;

-- DROP: Removes entire table
DROP TABLE users;
\`\`\`

---

### Question 5: Explain MySQL JOINs with examples.

**Answer:**
JOINs combine rows from multiple tables.

**Types of JOINs:**
1. **INNER JOIN** - Returns matching rows
2. **LEFT JOIN** - Returns all left table rows + matching right
3. **RIGHT JOIN** - Returns all right table rows + matching left
4. **FULL OUTER JOIN** - Returns all rows (MySQL doesn't support, use UNION)

**Example:**
\`\`\`sql
-- INNER JOIN
SELECT u.name, o.order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.name, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN
SELECT u.name, o.order_id
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
\`\`\`

---

## Intermediate Level Questions (1-3 Years)

---

### Question 6: What is the difference between PRIMARY KEY and UNIQUE KEY?

**Answer:**

| Feature | PRIMARY KEY | UNIQUE KEY |
|---------|-------------|------------|
| Null Values | Not allowed | Allows one NULL |
| Number per Table | One | Multiple |
| Auto Index | Yes | Yes |
| Purpose | Identify row uniquely | Ensure uniqueness |

**Example:**
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE
);
\`\`\`

---

### Question 7: Explain MySQL indexes and their types.

**Answer:**
Indexes improve query performance by creating a data structure for faster lookups.

**Types of Indexes:**
- **PRIMARY KEY** - Unique identifier
- **UNIQUE INDEX** - Ensures uniqueness
- **INDEX** - Regular index for faster searches
- **FULLTEXT INDEX** - For text searching
- **COMPOSITE INDEX** - Multiple columns

**Example:**
\`\`\`sql
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_name_age ON users(name, age);
CREATE FULLTEXT INDEX idx_content ON articles(content);
\`\`\`

---

### Question 8: What is normalization? Explain 1NF, 2NF, 3NF.

**Answer:**
Normalization reduces data redundancy and improves data integrity.

**1NF (First Normal Form):**
- Each column contains atomic values
- No repeating groups

**2NF (Second Normal Form):**
- Must be in 1NF
- All non-key attributes fully dependent on primary key

**3NF (Third Normal Form):**
- Must be in 2NF
- No transitive dependencies

**Example:**
\`\`\`sql
-- Before Normalization
CREATE TABLE orders (
    order_id INT,
    customer_name VARCHAR(100),
    product_name VARCHAR(100),
    product_price DECIMAL(10,2)
);

-- After Normalization (3NF)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
\`\`\`

---

### Question 9: Explain MySQL transactions and ACID properties.

**Answer:**
Transactions ensure data consistency.

**ACID Properties:**
- **Atomicity** - All or nothing
- **Consistency** - Valid state transitions
- **Isolation** - Concurrent transactions don't interfere
- **Durability** - Committed changes persist

**Example:**
\`\`\`sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If both succeed
COMMIT;

-- If any fails
ROLLBACK;
\`\`\`

---

### Question 10: What are MySQL stored procedures and functions?

**Answer:**
Stored procedures and functions are reusable SQL code blocks.

**Stored Procedure:**
\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN user_id INT)
BEGIN
    SELECT * FROM orders WHERE user_id = user_id;
END //
DELIMITER ;

-- Call procedure
CALL GetUserOrders(123);
\`\`\`

**Function:**
\`\`\`sql
DELIMITER //
CREATE FUNCTION CalculateTotal(price DECIMAL(10,2), quantity INT)
RETURNS DECIMAL(10,2)
BEGIN
    RETURN price * quantity;
END //
DELIMITER ;

-- Use function
SELECT CalculateTotal(100.00, 5) AS total;
\`\`\`

---

## Advanced Level Questions (3+ Years)

---

### Question 11: Explain MySQL triggers.

**Answer:**
Triggers automatically execute SQL statements when events occur.

**Example:**
\`\`\`sql
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END;
\`\`\`

**Trigger Types:**
- BEFORE INSERT/UPDATE/DELETE
- AFTER INSERT/UPDATE/DELETE

---

### Question 12: What is the difference between MyISAM and InnoDB?

**Answer:**

| Feature | MyISAM | InnoDB |
|---------|--------|--------|
| Transactions | No | Yes (ACID) |
| Foreign Keys | No | Yes |
| Row-level Locking | No | Yes |
| Crash Recovery | Poor | Good |
| Full-text Search | Yes | Yes (MySQL 5.6+) |
| Performance | Faster reads | Better for writes |

**When to Use:**
- **MyISAM**: Read-heavy, no transactions needed
- **InnoDB**: Write-heavy, transactions, foreign keys

---

### Question 13: Explain MySQL query optimization techniques.

**Answer:**
Optimization techniques:

1. **Use Indexes**
\`\`\`sql
CREATE INDEX idx_email ON users(email);
\`\`\`

2. **Avoid SELECT ***
\`\`\`sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, name, email FROM users;
\`\`\`

3. **Use LIMIT**
\`\`\`sql
SELECT * FROM users LIMIT 10;
\`\`\`

4. **Optimize JOINs**
\`\`\`sql
-- Use indexes on JOIN columns
SELECT u.name, o.order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.id = 123;
\`\`\`

5. **Use EXPLAIN**
\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

---

### Question 14: What are MySQL views? When to use them?

**Answer:**
Views are virtual tables based on query results.

**Example:**
\`\`\`sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE status = 'active';

-- Use view
SELECT * FROM active_users;
\`\`\`

**Benefits:**
- Simplify complex queries
- Security (hide sensitive columns)
- Consistency
- Reusability

---

### Question 15: Explain MySQL replication.

**Answer:**
Replication copies data from master to slave servers.

**Types:**
- **Master-Slave** - One master, multiple slaves
- **Master-Master** - Multiple masters

**Benefits:**
- High availability
- Load distribution
- Backup
- Geographic distribution

---

## Tricky Questions

---

### Question 16: What is the difference between UNION and UNION ALL?

**Answer:**

| Feature | UNION | UNION ALL |
|---------|-------|------------|
| Duplicates | Removes | Keeps |
| Performance | Slower | Faster |
| Sorting | Sorts results | No sorting |

**Example:**
\`\`\`sql
-- UNION (removes duplicates)
SELECT name FROM users
UNION
SELECT name FROM customers;

-- UNION ALL (keeps duplicates)
SELECT name FROM users
UNION ALL
SELECT name FROM customers;
\`\`\`

---

### Question 17: Explain MySQL subqueries vs JOINs.

**Answer:**
Both can achieve similar results, but performance differs.

**Subquery:**
\`\`\`sql
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders);
\`\`\`

**JOIN (Usually Faster):**
\`\`\`sql
SELECT DISTINCT u.*
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
\`\`\`

**When to Use:**
- **Subquery**: When you need aggregated data
- **JOIN**: For better performance with large datasets

---

### Question 18: What is the difference between WHERE and HAVING?

**Answer:**

| Clause | Used With | Filters |
|--------|-----------|---------|
| WHERE | Before GROUP BY | Individual rows |
| HAVING | After GROUP BY | Grouped rows |

**Example:**
\`\`\`sql
SELECT department, COUNT(*) as count
FROM employees
WHERE salary > 50000        -- Filter rows
GROUP BY department
HAVING COUNT(*) > 10;       -- Filter groups
\`\`\`

---

### Question 19: Explain MySQL locking mechanisms.

**Answer:**
MySQL uses locks to ensure data consistency.

**Lock Types:**
- **Table Lock** - Locks entire table
- **Row Lock** - Locks specific rows (InnoDB)
- **Page Lock** - Locks data pages

**Lock Modes:**
- **Shared Lock (READ)** - Multiple reads allowed
- **Exclusive Lock (WRITE)** - No other operations allowed

---

### Question 20: What is MySQL partitioning?

**Answer:**
Partitioning splits large tables into smaller, manageable pieces.

**Types:**
- **RANGE** - Based on range of values
- **LIST** - Based on list of values
- **HASH** - Based on hash function
- **KEY** - Similar to HASH

**Example:**
\`\`\`sql
CREATE TABLE orders (
    id INT,
    order_date DATE,
    amount DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
\`\`\`

---

## Real-World Scenario Questions

---

### Question 21: How do you handle database backups in MySQL?

**Answer:**
Multiple backup strategies:

**mysqldump:**
\`\`\`bash
mysqldump -u root -p database_name > backup.sql
\`\`\`

**Restore:**
\`\`\`bash
mysql -u root -p database_name < backup.sql
\`\`\`

**Binary Log Backup:**
- Point-in-time recovery
- Continuous backup

---

### Question 22: How do you optimize a slow MySQL query?

**Answer:**
Steps:
1. Use EXPLAIN to analyze query
2. Check for missing indexes
3. Optimize WHERE clauses
4. Avoid functions in WHERE
5. Use appropriate JOIN types
6. Limit result sets

---

### Question 23: Explain MySQL connection pooling.

**Answer:**
Connection pooling reuses database connections.

**Benefits:**
- Reduces connection overhead
- Improves performance
- Limits resource usage

**Example (Java):**
\`\`\`java
// HikariCP connection pool
HikariConfig config = new HikariConfig();
config.setMaximumPoolSize(10);
HikariDataSource ds = new HikariDataSource(config);
\`\`\`

---

### Question 24: How do you handle MySQL deadlocks?

**Answer:**
Deadlocks occur when transactions wait for each other.

**Prevention:**
- Access tables in same order
- Keep transactions short
- Use appropriate isolation levels
- Index foreign keys

**Detection:**
\`\`\`sql
SHOW ENGINE INNODB STATUS;
\`\`\`

---

### Question 25: Explain MySQL isolation levels.

**Answer:**
Isolation levels control transaction visibility.

**Levels:**
1. **READ UNCOMMITTED** - Dirty reads allowed
2. **READ COMMITTED** - No dirty reads
3. **REPEATABLE READ** - Default in MySQL
4. **SERIALIZABLE** - Highest isolation

**Example:**
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
-- Transaction code
COMMIT;
\`\`\`

---

## Debugging Questions

---

### Question 26: How do you debug MySQL performance issues?

**Answer:**
Tools and techniques:
- **EXPLAIN** - Query execution plan
- **SHOW PROCESSLIST** - Active connections
- **Slow Query Log** - Log slow queries
- **Performance Schema** - Detailed metrics
- **MySQL Workbench** - Visual analysis

---

### Question 27: What causes MySQL connection errors?

**Answer:**
Common causes:
- Too many connections (max_connections)
- Network issues
- Firewall blocking
- Incorrect credentials
- Server not running

**Solution:**
\`\`\`sql
SHOW VARIABLES LIKE 'max_connections';
SET GLOBAL max_connections = 200;
\`\`\`

---

### Question 28: How do you handle MySQL data corruption?

**Answer:**
Steps:
1. Stop MySQL server
2. Check error logs
3. Use CHECK TABLE
4. Repair if needed: REPAIR TABLE
5. Restore from backup if necessary

---

### Question 29: Explain MySQL query cache (deprecated in MySQL 8.0).

**Answer:**
Query cache stored query results (removed in MySQL 8.0).

**Alternative in MySQL 8.0:**
- Application-level caching (Redis, Memcached)
- InnoDB buffer pool optimization

---

### Question 30: What are MySQL best practices?

**Answer:**
- Use InnoDB for transactional data
- Create indexes on frequently queried columns
- Normalize database design
- Use prepared statements (prevent SQL injection)
- Regular backups
- Monitor slow queries
- Use connection pooling
- Optimize queries with EXPLAIN
- Set appropriate isolation levels
- Use transactions for data integrity

---

## Summary

These 30 MySQL interview questions cover:
- Database fundamentals
- SQL queries and JOINs
- Indexes and optimization
- Transactions and ACID
- Stored procedures and triggers
- Performance tuning
- Replication and backup
- Best practices

Master these questions to excel in MySQL interviews!
  `
};

export default mysqlInterviewQuestions;

