const mysqlInsertUpdateDelete = {
  id: 'mysql-insert-update-delete',
  title: 'INSERT, UPDATE, DELETE - Modifying Data',
  description: 'Learn how to insert, update, and delete data in MySQL tables',
  content: `
# INSERT, UPDATE, DELETE - Modifying Data in MySQL

INSERT, UPDATE, and DELETE are the three fundamental Data Manipulation Language (DML) commands in MySQL that enable you to add, modify, and remove data from database tables. These commands are essential for maintaining database content, supporting all CRUD (Create, Read, Update, Delete) operations that applications require. Understanding these commands is crucial for database administration and application development. Learn about [MySQL Data Types](/tutorial/mysql-data-types), [Creating Tables](/tutorial/mysql-create-database), and [MySQL Constraints](/tutorial/mysql-constraints) before using DML.

Enterprise applications extensively use INSERT for data creation, UPDATE for data modification, and DELETE for data removal. These operations are typically executed within transactions to ensure data consistency and atomicity. Mastery of INSERT, UPDATE, and DELETE, combined with proper transaction management, is essential for building reliable database applications.

**DML Commands Overview:**
- **INSERT**: Adds new rows to tables
- **UPDATE**: Modifies existing row data
- **DELETE**: Removes rows from tables
- **All three** work within transactions for data consistency

---

## INSERT - Adding Data

Learn about [Creating Tables](/tutorial/mysql-create-database) and [MySQL DDL](/tutorial/mysql-ddl) to understand table structure before inserting data.

### Basic INSERT Syntax

\`\`\`sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
\`\`\`

### Simple Examples

\`\`\`sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('Dattu p', ' Dattu@example.com', 25);

-- Insert multiple rows
INSERT INTO users (name, email, age)
VALUES 
    ('Jane Smith', 'jane@example.com', 30),
    ('Bob  Dattuson', 'bob@example.com', 28),
    ('Alice Brown', 'alice@example.com', 35);
\`\`\`

### Insert with Default Values

\`\`\`sql
-- Use DEFAULT keyword
INSERT INTO products (name, price, stock)
VALUES ('Laptop', 999.99, DEFAULT);

-- Omit columns with defaults
INSERT INTO products (name, price)
VALUES ('Mouse', 29.99);
-- stock will use default value (0)
\`\`\`

### Insert with AUTO_INCREMENT

\`\`\`sql
-- ID is auto-generated
INSERT INTO users (name, email)
VALUES ('Dattu p', ' Dattu@example.com');
-- id is automatically assigned
\`\`\`

### Insert from Another Table

\`\`\`sql
-- Copy data from one table to another
INSERT INTO users_backup (name, email, age)
SELECT name, email, age 
FROM users 
WHERE age > 25;
\`\`\`

---

## UPDATE - Modifying Data

Use [SELECT queries](/tutorial/mysql-select) to verify updates and [WHERE clause](/tutorial/mysql-clauses) for filtering rows to update.

### Basic UPDATE Syntax

\`\`\`sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
\`\`\`

### Simple Examples

\`\`\`sql
-- Update single row
UPDATE users 
SET age = 26 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET name = ' Dattu Smith', email = ' Dattusmith@example.com'
WHERE id = 1;

-- Update multiple rows
UPDATE products 
SET price = price * 0.9 
WHERE category = 'Electronics';

-- Update with calculation
UPDATE products 
SET stock = stock + 10 
WHERE id = 5;
\`\`\`

### ⚠️ Important: Always Use WHERE!

\`\`\`sql
-- DANGEROUS - Updates ALL rows!
UPDATE users SET age = 25;  -- Don't do this!

-- SAFE - Updates specific rows
UPDATE users SET age = 25 WHERE id = 1;
\`\`\`

### Update with JOIN

\`\`\`sql
-- Update based on another table
UPDATE orders o
JOIN customers c ON o.customer_id = c.id
SET o.status = 'completed'
WHERE c.email = ' Dattu@example.com';
\`\`\`

---

## DELETE - Removing Data

Learn about [MySQL Transactions](/tutorial/mysql-transactions) to safely delete data with rollback capability. Use [SELECT](/tutorial/mysql-select) to preview data before deleting.

### Basic DELETE Syntax

\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

### Simple Examples

\`\`\`sql
-- Delete specific row
DELETE FROM users WHERE id = 5;

-- Delete multiple rows
DELETE FROM products WHERE stock = 0;

-- Delete with condition
DELETE FROM orders WHERE status = 'cancelled';
\`\`\`

### ⚠️ Important: Always Use WHERE!

\`\`\`sql
-- DANGEROUS - Deletes ALL rows!
DELETE FROM users;  -- Don't do this!

-- SAFE - Deletes specific rows
DELETE FROM users WHERE id = 5;
\`\`\`

### Delete with JOIN

\`\`\`sql
-- Delete orders for specific customer
DELETE o FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.email = ' Dattu@example.com';
\`\`\`

### TRUNCATE vs DELETE

\`\`\`sql
-- DELETE - Removes rows one by one (slower, can rollback)
DELETE FROM users;

-- TRUNCATE - Removes all rows quickly (faster, cannot rollback)
TRUNCATE TABLE users;
\`\`\`

**Use TRUNCATE when:**
- You want to delete all rows
- You don't need to rollback
- You want faster execution

---

## Real-World Examples

### E-Commerce Operations

\`\`\`sql
-- Add new product
INSERT INTO products (name, sku, price, stock, category)
VALUES ('Wireless Mouse', 'MOU-002', 39.99, 100, 'Electronics');

-- Update product price (sale)
UPDATE products 
SET price = price * 0.8 
WHERE category = 'Electronics' AND id IN (1, 2, 3);

-- Update stock after order
UPDATE products 
SET stock = stock - 2 
WHERE id = 5;

-- Mark order as shipped
UPDATE orders 
SET status = 'shipped', shipped_date = CURRENT_DATE
WHERE id = 101;

-- Delete cancelled orders older than 1 year
DELETE FROM orders 
WHERE status = 'cancelled' 
AND order_date < DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR);

-- Soft delete (mark as deleted instead of removing)
UPDATE users 
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP
WHERE id = 10;
\`\`\`

---

## Best Practices

### 1. Always Use WHERE in UPDATE/DELETE

\`\`\`sql
-- Good
UPDATE users SET age = 25 WHERE id = 1;

-- Bad (updates all rows!)
UPDATE users SET age = 25;
\`\`\`

### 2. Test with SELECT First

\`\`\`sql
-- First, see what will be updated
SELECT * FROM users WHERE age > 30;

-- Then update
UPDATE users SET status = 'inactive' WHERE age > 30;
\`\`\`

### 3. Use Transactions for Multiple Operations

\`\`\`sql
START TRANSACTION;

UPDATE products SET stock = stock - 1 WHERE id = 5;
INSERT INTO order_items (order_id, product_id, quantity) VALUES (101, 5, 1);
UPDATE orders SET total_amount = total_amount + 99.99 WHERE id = 101;

COMMIT;  -- Or ROLLBACK if error
\`\`\`

### 4. Use Soft Deletes When Possible

\`\`\`sql
-- Instead of DELETE
DELETE FROM users WHERE id = 10;

-- Use soft delete
UPDATE users SET is_deleted = 1 WHERE id = 10;

-- Query active users
SELECT * FROM users WHERE is_deleted = 0;
\`\`\`

### 5. Validate Data Before Insert

\`\`\`sql
-- Check if email already exists
SELECT COUNT(*) FROM users WHERE email = 'new@example.com';

-- If count is 0, then insert
INSERT INTO users (name, email) VALUES ('New User', 'new@example.com');
\`\`\`

---

## Common Patterns

### Insert or Update (UPSERT)

\`\`\`sql
-- MySQL 8.0+ - ON DUPLICATE KEY UPDATE
INSERT INTO users (id, name, email)
VALUES (1, 'Dattu p', ' Dattu@example.com')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    email = VALUES(email);
\`\`\`

### Increment Counter

\`\`\`sql
-- Increment view count
UPDATE products 
SET views = views + 1 
WHERE id = 5;
\`\`\`

### Archive Old Data

\`\`\`sql
-- Move old orders to archive table
INSERT INTO orders_archive 
SELECT * FROM orders 
WHERE order_date < DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR);

-- Delete archived orders
DELETE FROM orders 
WHERE order_date < DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR);
\`\`\`

---

## Summary

**INSERT:**
- Adds new rows to table
- Can insert single or multiple rows
- Use VALUES or SELECT

**UPDATE:**
- Modifies existing rows
- ⚠️ Always use WHERE clause
- Can update single or multiple columns

**DELETE:**
- Removes rows from table
- ⚠️ Always use WHERE clause
- Consider soft deletes for important data

**Related Topics:**
- Learn [MySQL SELECT](/tutorial/mysql-select) to query the data you insert
- Understand [MySQL Constraints](/tutorial/mysql-constraints) that affect INSERT/UPDATE/DELETE
- Use [MySQL Transactions](/tutorial/mysql-transactions) for safe data modifications
- Connect from Java with [JDBC CRUD Operations](/tutorial/jdbc-crud-operations)

**Key Points:**
- Always use WHERE in UPDATE/DELETE
- Test with SELECT first
- Use transactions for multiple operations
- Consider soft deletes for data recovery

Master these commands, and you can fully manage your database data!

---

## Practice Question

**Q:** Write SQL statements to:
1. Insert a new customer
2. Update their email
3. Create an order for them
4. Update product stock after order
5. Soft delete the customer (mark as deleted)

**Answer:**
\`\`\`sql
-- 1. Insert customer
INSERT INTO customers (name, email, phone)
VALUES ('New Customer', 'new@example.com', '123-456-7890');

-- 2. Update email
UPDATE customers 
SET email = 'updated@example.com' 
WHERE name = 'New Customer';

-- 3. Create order
INSERT INTO orders (customer_id, order_date, total_amount)
SELECT id, CURRENT_DATE, 99.99 
FROM customers 
WHERE email = 'updated@example.com';

-- 4. Update product stock
UPDATE products 
SET stock = stock - 1 
WHERE id = 5;

-- 5. Soft delete customer
UPDATE customers 
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP
WHERE email = 'updated@example.com';
\`\`\`
---

## Real-World Applications

### E-Commerce Order Processing
E-commerce platforms use INSERT to create orders, UPDATE to modify order status and inventory, and DELETE (or soft delete) to remove cancelled orders. These operations are executed within transactions to ensure data consistency.

**Implementation Example:**
- INSERT new orders when customers place orders
- UPDATE product stock when items are purchased
- UPDATE order status as orders are processed
- Soft DELETE (mark as deleted) for cancelled orders
- Transaction ensures all operations succeed or fail together

### User Account Management
User management systems use INSERT for registration, UPDATE for profile modifications, and DELETE (or deactivation) for account removal. These operations maintain user data integrity and support account lifecycle management.

**Implementation Example:**
- INSERT new users during registration
- UPDATE user profiles when information changes
- UPDATE account status for activation/deactivation
- Soft DELETE for account deletion (maintains audit trail)
- Foreign key constraints maintain data relationships

### Inventory Management
Inventory systems use INSERT to add new products, UPDATE to adjust stock levels and prices, and DELETE to remove discontinued items. These operations support real-time inventory tracking and management.

**Implementation Example:**
- INSERT new products into catalog
- UPDATE stock quantities after sales and restocking
- UPDATE product prices during sales and promotions
- DELETE discontinued products (or mark as inactive)
- Transactions ensure inventory accuracy

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using WHERE in UPDATE/DELETE
**Problem:** Forgetting WHERE clause updates or deletes all rows.

**Solution:** Always use WHERE clause unless intentionally updating all rows:

\`\`\`sql
-- WRONG - Updates all rows!
UPDATE products SET price = 99.99;

-- CORRECT - Updates specific rows
UPDATE products SET price = 99.99 WHERE id = 1;
\`\`\`

### Mistake 2: Not Using Transactions
**Problem:** Performing related operations without transactions can leave data inconsistent.

**Solution:** Use transactions for related operations:

\`\`\`sql
-- GOOD - Transaction ensures consistency
START TRANSACTION;
UPDATE products SET stock = stock - 1 WHERE id = 1;
INSERT INTO orders (product_id, quantity) VALUES (1, 1);
COMMIT;

-- BAD - No transaction, can leave inconsistent state
UPDATE products SET stock = stock - 1 WHERE id = 1;
INSERT INTO orders (product_id, quantity) VALUES (1, 1);
-- If INSERT fails, stock is already updated!
\`\`\`

### Mistake 3: Hard Delete Instead of Soft Delete
**Problem:** Using DELETE removes data permanently, losing audit trail.

**Solution:** Use soft delete (UPDATE with is_deleted flag):

\`\`\`sql
-- PREFER - Soft delete
UPDATE users SET is_deleted = 1, deleted_at = NOW() WHERE id = 1;

-- AVOID - Hard delete (unless necessary)
DELETE FROM users WHERE id = 1;  -- Data lost forever
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is the difference between INSERT, UPDATE, and DELETE?

INSERT adds new rows to a table, UPDATE modifies existing row data, and DELETE removes rows from a table. INSERT creates new records, UPDATE changes existing records, and DELETE removes records. All three are DML (Data Manipulation Language) commands that modify table data. Learn about [MySQL Select](/tutorial/mysql-select) for reading data.

### Can I insert multiple rows in a single INSERT statement?

Yes, you can insert multiple rows in a single INSERT statement by providing multiple value sets:

\`\`\`sql
INSERT INTO users (name, email) VALUES
(' Dattu', ' Dattu@example.com'),
('Jane', 'jane@example.com'),
('Bob', 'bob@example.com');
\`\`\`

This is more efficient than multiple separate INSERT statements.

### What happens if I UPDATE without a WHERE clause?

UPDATE without WHERE clause updates ALL rows in the table, which is usually unintended and dangerous. Always include a WHERE clause unless you intentionally want to update all rows. Test UPDATE statements carefully, especially in production databases.

### How do I update multiple columns at once?

You can update multiple columns in a single UPDATE statement by separating column assignments with commas:

\`\`\`sql
UPDATE users 
SET name = 'Dattu p', 
    email = ' Dattu.doe@example.com',
    age = 30
WHERE id = 1;
\`\`\`

### What is the difference between DELETE and TRUNCATE?

DELETE removes rows one by one, can use WHERE clause, can be rolled back, and triggers are fired. TRUNCATE removes all rows at once, cannot use WHERE, is faster, and cannot be rolled back. Use DELETE for selective removal, TRUNCATE for removing all data quickly.

### Can I use INSERT to copy data from another table?

Yes, you can use INSERT with SELECT to copy data from another table:

\`\`\`sql
INSERT INTO users_backup (name, email)
SELECT name, email FROM users WHERE age > 18;
\`\`\`

This is useful for archiving, backup, and data migration.

### What is ON DUPLICATE KEY UPDATE?

ON DUPLICATE KEY UPDATE (MySQL's UPSERT) inserts a row, or updates it if a duplicate key exists:

\`\`\`sql
INSERT INTO users (id, name, email)
VALUES (1, ' Dattu', ' Dattu@example.com')
ON DUPLICATE KEY UPDATE name = ' Dattu', email = ' Dattu@example.com';
\`\`\`

This is useful for insert-or-update operations.

### How do I safely delete data?

Safely delete data by: (1) using WHERE clause to target specific rows, (2) using transactions so you can rollback, (3) backing up data before deletion, (4) using soft delete (UPDATE with flag) instead of hard delete when possible, and (5) testing DELETE statements on non-production data first.

### Can I update data based on values from another table?

Yes, you can use JOIN in UPDATE statements:

\`\`\`sql
UPDATE orders o
JOIN users u ON o.user_id = u.id
SET o.status = 'processed'
WHERE u.email = 'admin@example.com';
\`\`\`

This allows updating based on related table data.

### What is the LIMIT clause in UPDATE/DELETE?

LIMIT restricts the number of rows affected by UPDATE or DELETE:

\`\`\`sql
DELETE FROM logs WHERE created_at < '2020-01-01' LIMIT 1000;
\`\`\`

This is useful for batch operations and preventing accidental mass updates/deletes. However, LIMIT in UPDATE/DELETE with ORDER BY is recommended for predictable results.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these DML command fundamentals:

- **INSERT adds new rows** to tables with specified values
- **UPDATE modifies existing rows** based on WHERE conditions
- **DELETE removes rows** from tables based on WHERE conditions
- **Always use WHERE clause** in UPDATE/DELETE unless updating all rows
- **Use transactions** for related operations to ensure consistency
- **Soft delete** (UPDATE with flag) is often better than hard delete
- **Multiple rows** can be inserted in a single INSERT statement
- **ON DUPLICATE KEY UPDATE** provides insert-or-update functionality
- **Test DML statements** carefully, especially in production

---

## What's Next?

Now that you understand INSERT, UPDATE, and DELETE, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Transactions](/tutorial/mysql-transactions)**: Learn to group DML operations for consistency
2. **[MySQL Select](/tutorial/mysql-select)**: Master data retrieval to complement data modification
3. **[MySQL Constraints](/tutorial/mysql-constraints)**: Understand how constraints affect DML operations
4. **[MySQL Joins](/tutorial/mysql-joins)**: Use joins in UPDATE and DELETE statements

### Advanced Topics

- **Bulk Operations**: Optimize large-scale INSERT/UPDATE/DELETE
- **UPSERT Patterns**: Master insert-or-update scenarios
- **Cascade Operations**: Understand foreign key cascade behavior
- **Performance Tuning**: Optimize DML operation performance

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Create Database](/tutorial/mysql-create-database)**: Create tables for DML operations
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Execute DML from Java applications
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA handles DML operations

INSERT, UPDATE, and DELETE are essential for data management. Continue learning about [MySQL Transactions](/tutorial/mysql-transactions) to ensure data consistency across multiple operations.

---

## 10 Important DML (INSERT/UPDATE/DELETE) Interview Questions

### 1. What is DML?

**Answer:** **Data Manipulation Language** covers **INSERT**, **UPDATE**, and **DELETE**—statements that **change** table data. **SELECT** is sometimes grouped with DML for **read/write** work, or classified separately as **DQL**. **DDL** (\`CREATE\`, \`ALTER\`) changes **structure**, not row content—keep the **taxonomy** straight in interviews.

### 2. What is the benefit of bulk INSERT?

**Answer:** **Multi-row** inserts—**\`INSERT INTO t (cols) VALUES (...), (...), ...\`**—reduce **round trips** and **parser** overhead versus **many** single-row statements. For **large** loads, also consider **LOAD DATA**, **batching**, and **disable keys** strategies (with **care**). **Throughput** matters in **ETL**.

### 3. What does ON DUPLICATE KEY UPDATE do?

**Answer:** It implements an **upsert**: if a **PRIMARY** or **UNIQUE** key **conflict** occurs, MySQL **updates** specified columns instead of **failing**. **Use** for **idempotent** sync jobs and **natural** keys. **Understand** which row counts **affected rows** returns and **race** conditions under **concurrency**.

### 4. Why use LIMIT with UPDATE or DELETE?

**Answer:** **LIMIT** caps how many rows are changed in **one** statement—**safety** for **manual** fixes and **batch** maintenance. **Still** use **transactions** and **verify** with **SELECT** first. **Replication** and **locking** behavior differ from **unlimited** deletes—**plan** for **large** tables.

### 5. Compare DELETE and TRUNCATE.

**Answer:** **DELETE** removes rows **optionally** filtered by **WHERE**; **fires** **triggers**; **fully logged** in **statement/row** form depending on settings; can be **rolled back** in a transaction. **TRUNCATE** quickly removes **all** rows, **resets** auto-increment, and has **different** **locking** and **logging** characteristics—often **faster** but **less** flexible. **Foreign keys** may block or **cascade**.

### 6. What is ON DELETE CASCADE?

**Answer:** A **foreign key** option that **automatically deletes** **dependent** child rows when the **parent** row is deleted. **Powerful** for **referential** cleanup but **dangerous** if a **mistaken** parent delete **wipes** children—**prefer** **RESTRICT** or **soft** deletes when **business** rules require **audit**.

### 7. Why use PreparedStatement for INSERT in Java?

**Answer:** **PreparedStatement** binds **typed** parameters, **prevents SQL injection**, and **reduces** parse overhead for repeated inserts. **Batch** updates (\`addBatch\`/\`executeBatch\`) **boost** throughput. **Never** concatenate user input into SQL.

### 8. What is LAST_INSERT_ID()?

**Answer:** **LAST\_INSERT\_ID()** returns the **first** auto-generated **id** from the **most recent** successful **INSERT** in the **current** **session** connection—**critical** for **parent/child** inserts in **same** transaction. **Do not** rely on it across **pooled** connections without **care**—**use** the **same** connection.

### 9. What is a soft delete?

**Answer:** Instead of **DELETE**, mark rows with **\`deleted_at\`** timestamp or **\`is_active = 0\`**. **Queries** filter **\`WHERE deleted_at IS NULL\`**. **Pros:** **history** and **recovery**. **Cons:** **unique** constraints and **indexes** need **care**; **ORM** must **respect** the filter globally.

### 10. How do transactions relate to DML?

**Answer:** Wrap related **INSERT/UPDATE/DELETE** in **\`START TRANSACTION ... COMMIT\`** (or JDBC **\`setAutoCommit(false)\`**) so changes **commit** **together**—**atomicity**. **ROLLBACK** on **failure**. **Isolation level** determines what **concurrent** sessions **see**—**pair** with **business** rules.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Transactions** | [MySQL Transactions](/tutorial/mysql-transactions) |
| **Constraints & FK** | [MySQL Constraints](/tutorial/mysql-constraints) |
| **SELECT** | [MySQL SELECT](/tutorial/mysql-select) |
| **JDBC CRUD** | [CRUD Operations](/tutorial/crud-operations) |
| **Spring Data JPA** | [Spring Boot JPA](/tutorial/spring-boot-jpa) |

---

## Test Your Knowledge

Mastered DML operations? Test your MySQL skills with our comprehensive [MySQL MCQ Exam](/tutorial/mysql-mcq) covering INSERT, UPDATE, DELETE, and all MySQL topics!
  `,
  code: `-- MySQL INSERT, UPDATE, DELETE Examples

-- Create database and tables
CREATE DATABASE IF NOT EXISTS crud_demo;
USE crud_demo;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    city VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED DEFAULT 0,
    category VARCHAR(50),
    views INT UNSIGNED DEFAULT 0
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ========== INSERT Examples ==========

-- Insert single row
INSERT INTO users (name, email, age, city)
VALUES ('Dattu p', ' Dattu@example.com', 25, 'New York');

-- Insert multiple rows
INSERT INTO users (name, email, age, city) VALUES
('Jane Smith', 'jane@example.com', 30, 'Los Angeles'),
('Bob  Dattuson', 'bob@example.com', 28, 'Chicago'),
('Alice Brown', 'alice@example.com', 35, 'New York');

-- Insert with default values
INSERT INTO users (name, email)
VALUES ('Charlie Wilson', 'charlie@example.com');
-- age and city will be NULL, is_active will be 1

-- Insert products
INSERT INTO products (name, price, stock, category) VALUES
('Laptop', 999.99, 50, 'Electronics'),
('Mouse', 29.99, 100, 'Electronics'),
('Keyboard', 79.99, 75, 'Electronics'),
('Desk', 199.99, 30, 'Furniture');

-- Insert from SELECT
CREATE TABLE users_backup LIKE users;
INSERT INTO users_backup (name, email, age)
SELECT name, email, age FROM users WHERE age > 25;

-- ========== UPDATE Examples ==========

-- Update single row
UPDATE users SET age = 26 WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET name = ' Dattu Smith', city = 'Boston'
WHERE id = 1;

-- Update multiple rows
UPDATE products 
SET price = price * 0.9 
WHERE category = 'Electronics';

-- Update with calculation
UPDATE products 
SET stock = stock + 10 
WHERE id = 1;

-- Increment counter
UPDATE products 
SET views = views + 1 
WHERE id = 1;

-- Update with condition
UPDATE users 
SET is_active = 0 
WHERE age < 18;

-- Update with JOIN
UPDATE orders o
JOIN users u ON o.user_id = u.id
SET o.status = 'completed'
WHERE u.email = ' Dattu@example.com';

-- ========== DELETE Examples ==========

-- Delete specific row
DELETE FROM users WHERE id = 5;

-- Delete multiple rows
DELETE FROM products WHERE stock = 0;

-- Delete with condition
DELETE FROM orders WHERE status = 'cancelled';

-- Delete with JOIN
DELETE o FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.email = ' Dattu@example.com';

-- Soft delete (recommended)
ALTER TABLE users ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;

UPDATE users 
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP
WHERE id = 10;

-- Query active users
SELECT * FROM users WHERE is_deleted = 0;

-- ========== Real-World Examples ==========

-- E-commerce: Add new product
INSERT INTO products (name, price, stock, category)
VALUES ('Wireless Mouse', 39.99, 100, 'Electronics');

-- E-commerce: Update price on sale
UPDATE products 
SET price = price * 0.8 
WHERE category = 'Electronics' AND id IN (1, 2, 3);

-- E-commerce: Update stock after order
UPDATE products 
SET stock = stock - 2 
WHERE id = 5;

-- E-commerce: Create order
INSERT INTO orders (user_id, order_date, total_amount, status)
VALUES (1, CURRENT_DATE, 99.99, 'pending');

-- E-commerce: Mark order as shipped
UPDATE orders 
SET status = 'shipped'
WHERE id = 1;

-- E-commerce: Delete old cancelled orders
DELETE FROM orders 
WHERE status = 'cancelled' 
AND order_date < DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR);

-- ========== UPSERT (Insert or Update) ==========

-- MySQL 8.0+ ON DUPLICATE KEY UPDATE
INSERT INTO users (id, name, email, age)
VALUES (1, ' Dattu Updated', ' Dattu@example.com', 27)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    age = VALUES(age);

-- ========== Transactions ==========

START TRANSACTION;

UPDATE products SET stock = stock - 1 WHERE id = 1;
INSERT INTO orders (user_id, order_date, total_amount) 
VALUES (1, CURRENT_DATE, 99.99);
UPDATE users SET is_active = 1 WHERE id = 1;

COMMIT;  -- Or ROLLBACK if error

-- ========== Archive Pattern ==========

-- Create archive table
CREATE TABLE orders_archive LIKE orders;

-- Move old orders to archive
INSERT INTO orders_archive 
SELECT * FROM orders 
WHERE order_date < DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR);

-- Delete archived orders
DELETE FROM orders 
WHERE order_date < DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR);
`
};

export default mysqlInsertUpdateDelete;


