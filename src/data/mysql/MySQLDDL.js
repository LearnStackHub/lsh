const mysqlDDL = {
  id: 'mysql-ddl',
  title: 'MySQL DDL - ALTER, DROP, TRUNCATE',
  description: 'Learn Data Definition Language: ALTER, DROP, TRUNCATE, and table modifications',
  content: `
# MySQL DDL - Data Definition Language

MySQL DDL (Data Definition Language) encompasses commands for defining and modifying database structure, including tables, indexes, constraints, and other database objects. DDL commands (CREATE, ALTER, DROP, TRUNCATE, RENAME) enable database administrators and developers to manage schema structure, modify table definitions, and maintain database objects. Understanding DDL is essential for database design, schema evolution, and database administration.

Enterprise applications require careful DDL management for schema changes, database migrations, and structural modifications. DDL operations are critical for database evolution as applications grow and requirements change. Proper DDL usage ensures database structure remains organized, efficient, and aligned with application needs while maintaining data integrity.

**DDL Commands:**
- **CREATE**: Create database objects (tables, indexes, views)
- **ALTER**: Modify existing database objects
- **DROP**: Delete database objects
- **TRUNCATE**: Remove all data from tables
- **RENAME**: Rename database objects

---

## DDL Commands Overview

- **CREATE** - Create database objects
- **ALTER** - Modify existing objects
- **DROP** - Delete objects
- **TRUNCATE** - Remove all data from table
- **RENAME** - Rename objects

---

## ALTER TABLE

Modify existing table structure.

### Add Column

\`\`\`sql
-- Add single column
ALTER TABLE products 
ADD COLUMN description TEXT;

-- Add multiple columns
ALTER TABLE products 
ADD COLUMN description TEXT,
ADD COLUMN category VARCHAR(50);

-- Add column with position
ALTER TABLE products 
ADD COLUMN sku VARCHAR(50) AFTER name;
\`\`\`

### Modify Column

\`\`\`sql
-- Change column data type
ALTER TABLE products 
MODIFY COLUMN price DECIMAL(12, 2);

-- Change column name and type
ALTER TABLE products 
CHANGE COLUMN old_name new_name VARCHAR(200);

-- Modify with constraints
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(200) NOT NULL;
\`\`\`

### Drop Column

\`\`\`sql
-- Remove column
ALTER TABLE products 
DROP COLUMN description;
\`\`\`

### Add/Drop Constraints

\`\`\`sql
-- Add primary key
ALTER TABLE products 
ADD PRIMARY KEY (id);

-- Add foreign key
ALTER TABLE order_items 
ADD CONSTRAINT fk_product 
FOREIGN KEY (product_id) REFERENCES products(id);

-- Add unique constraint
ALTER TABLE products 
ADD CONSTRAINT uk_sku UNIQUE (sku);

-- Add check constraint (MySQL 8.0.16+)
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE products 
DROP CONSTRAINT uk_sku;

-- Drop foreign key
ALTER TABLE order_items 
DROP FOREIGN KEY fk_product;
\`\`\`

### Add/Drop Index

\`\`\`sql
-- Add index
ALTER TABLE products 
ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products 
ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products 
ADD INDEX idx_category_price (category, price);

-- Drop index
ALTER TABLE products 
DROP INDEX idx_name;
\`\`\`

### Rename Table

\`\`\`sql
-- Rename table
ALTER TABLE old_table_name 
RENAME TO new_table_name;

-- Or use RENAME TABLE
RENAME TABLE old_table_name TO new_table_name;
\`\`\`

---

## DROP Statement

Delete database objects permanently.

### DROP TABLE

\`\`\`sql
-- Drop single table
DROP TABLE products;

-- Drop if exists (prevents error)
DROP TABLE IF EXISTS products;

-- Drop multiple tables
DROP TABLE products, orders, customers;

-- Drop with foreign key constraints
DROP TABLE products CASCADE;  -- MySQL doesn't support CASCADE
-- Must drop foreign keys first
\`\`\`

### DROP DATABASE

\`\`\`sql
-- Drop database
DROP DATABASE my_database;

-- Drop if exists
DROP DATABASE IF EXISTS my_database;
\`\`\`

### DROP INDEX

\`\`\`sql
-- Drop index
DROP INDEX idx_name ON products;
\`\`\`

---

## TRUNCATE TABLE

Remove all rows from table (faster than DELETE).

\`\`\`sql
-- Truncate table
TRUNCATE TABLE products;

-- Truncate resets AUTO_INCREMENT
-- DELETE does not reset AUTO_INCREMENT
\`\`\`

### TRUNCATE vs DELETE

| Feature | TRUNCATE | DELETE |
|---------|----------|--------|
| Speed | Faster | Slower |
| Auto-increment | Resets | Not reset |
| WHERE clause | No | Yes |
| Rollback | No (in some engines) | Yes |
| Triggers | Not fired | Fired |

---

## Real-World Examples

### Example 1: Add Timestamp Columns

\`\`\`sql
-- Add created_at and updated_at
ALTER TABLE products 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
\`\`\`

### Example 2: Modify Column Size

\`\`\`sql
-- Increase VARCHAR size
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(500);

-- Decrease size (data may be truncated)
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(100);
\`\`\`

### Example 3: Add Foreign Key

\`\`\`sql
-- Add foreign key with name
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_product 
FOREIGN KEY (product_id) 
REFERENCES products(id) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
\`\`\`

### Example 4: Reorganize Table

\`\`\`sql
-- Add column at specific position
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- Move column
ALTER TABLE products 
MODIFY COLUMN description TEXT AFTER price;
\`\`\`

---

## Best Practices

### 1. Backup Before ALTER
Always backup before major structure changes.

### 2. Test on Development First
Test ALTER statements on development database.

### 3. Use IF EXISTS
Prevent errors with IF EXISTS clause.

\`\`\`sql
DROP TABLE IF EXISTS temp_table;
\`\`\`

### 4. Consider Downtime
Large ALTER operations may lock tables.

---

## Summary

**DDL Commands:**
- **ALTER** - Modify table structure
- **DROP** - Delete objects
- **TRUNCATE** - Remove all rows

**Common Operations:**
- Add/Modify/Drop columns
- Add/Drop constraints
- Add/Drop indexes
- Rename tables

Master DDL to manage your database structure effectively!

---

## Practice Question

**Q:** Write ALTER statements to:
1. Add a 'status' column (VARCHAR(20), default 'active') after 'name'
2. Add a unique index on 'email' column
3. Add a foreign key from 'orders.customer_id' to 'customers.id'
4. Rename 'old_products' table to 'products'

**Answer:**
\`\`\`sql
-- 1. Add status column
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- 2. Add unique index
ALTER TABLE customers 
ADD UNIQUE INDEX idx_email (email);

-- 3. Add foreign key
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);

-- 4. Rename table
ALTER TABLE old_products RENAME TO products;
\`\`\`
---

## Real-World Applications

### Database Schema Evolution
Applications use DDL extensively for schema changes as requirements evolve. ALTER statements add new columns, modify data types, add constraints, and restructure tables to support new features while maintaining existing data.

**Implementation Example:**
- Adding new columns for new features
- Modifying column types for data expansion
- Adding indexes for performance optimization
- Adding foreign keys for new relationships

### Database Migration and Deployment
Deployment processes use DDL for database migrations, creating initial schemas, and applying structural changes across environments. DDL scripts enable version-controlled database evolution.

**Implementation Example:**
- Initial schema creation with CREATE statements
- Migration scripts with ALTER statements
- Environment-specific schema modifications
- Rollback procedures using DROP and ALTER

### Database Maintenance
Database administration uses DDL for maintenance operations, cleanup, and optimization. DROP removes unused objects, TRUNCATE clears test data, and ALTER optimizes table structures.

**Implementation Example:**
- Removing obsolete tables and columns
- Truncating test/development data
- Reorganizing table structures
- Cleaning up unused indexes

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Dropping Tables Without Backup
**Problem:** DROP operations are irreversible and can cause data loss.

**Solution:** Always backup before DROP operations:

\`\`\`sql
-- GOOD - Backup first
CREATE TABLE products_backup AS SELECT * FROM products;
DROP TABLE products;

-- BAD - No backup
DROP TABLE products;  -- Data lost forever!
\`\`\`

### Mistake 2: ALTER on Large Tables Without Planning
**Problem:** ALTER operations on large tables can lock tables for extended periods.

**Solution:** Plan ALTER operations, use online DDL when available, and schedule during low-traffic periods:

\`\`\`sql
-- For large tables, consider:
-- 1. Use ALGORITHM=INPLACE, LOCK=NONE when possible
-- 2. Schedule during maintenance windows
-- 3. Test on smaller tables first
\`\`\`

### Mistake 3: Using TRUNCATE Instead of DELETE
**Problem:** TRUNCATE cannot be rolled back and resets AUTO_INCREMENT.

**Solution:** Use DELETE when you need rollback capability:

\`\`\`sql
-- TRUNCATE - Fast, no rollback, resets AUTO_INCREMENT
TRUNCATE TABLE products;

-- DELETE - Slower, can rollback, preserves AUTO_INCREMENT
DELETE FROM products;
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is DDL and what commands does it include?

DDL (Data Definition Language) is the subset of SQL used for defining and modifying database structure. DDL commands include CREATE (create objects), ALTER (modify objects), DROP (delete objects), TRUNCATE (remove all data), and RENAME (rename objects). DDL operations affect database structure, not data content (except TRUNCATE).

### What's the difference between DDL and DML?

DDL (Data Definition Language) defines and modifies database structure (CREATE, ALTER, DROP). DML (Data Manipulation Language) modifies data content (INSERT, UPDATE, DELETE). DDL changes schema, DML changes data. Both are essential but serve different purposes in database management.

### Can I modify a column's data type with ALTER?

Yes, you can modify column data types using ALTER TABLE MODIFY COLUMN:

\`\`\`sql
ALTER TABLE products MODIFY COLUMN price DECIMAL(12, 2);
\`\`\`

However, ensure existing data is compatible with the new type. Test on non-production data first.

### What happens when I DROP a table?

Dropping a table permanently deletes the table structure and all its data. This operation cannot be undone unless you have a backup. Always backup important data before dropping tables. DROP also removes associated indexes, triggers, and constraints.

### What's the difference between DROP and TRUNCATE?

DROP removes the entire table structure and data permanently. TRUNCATE removes all data but keeps the table structure. Use DROP to remove tables completely, TRUNCATE to clear all data while keeping the table. TRUNCATE is faster than DELETE but cannot be rolled back.

### Can I add multiple columns in one ALTER statement?

Yes, you can add multiple columns in a single ALTER TABLE statement:

\`\`\`sql
ALTER TABLE products 
ADD COLUMN description TEXT,
ADD COLUMN category VARCHAR(50),
ADD COLUMN status VARCHAR(20);
\`\`\`

This is more efficient than multiple ALTER statements.

### How do I rename a table?

Use ALTER TABLE RENAME or RENAME TABLE:

\`\`\`sql
ALTER TABLE old_name RENAME TO new_name;
-- Or
RENAME TABLE old_name TO new_name;
\`\`\`

Both commands rename the table while preserving all data and structure.

### Can I add a column at a specific position?

Yes, you can specify column position using AFTER or FIRST:

\`\`\`sql
ALTER TABLE products ADD COLUMN sku VARCHAR(50) AFTER name;
ALTER TABLE products ADD COLUMN id INT FIRST;
\`\`\`

This controls the physical column order in the table.

### What happens to data when I modify a column?

When you modify a column (change type, size, etc.), MySQL attempts to convert existing data to the new specification. If conversion is impossible, the operation fails. Always backup data before modifying columns and test conversions on sample data first.

### How do I safely modify production database structure?

Safely modify production structure by: (1) backing up data first, (2) testing changes on non-production databases, (3) planning for downtime if needed, (4) using transactions when possible, (5) documenting all changes, and (6) having rollback procedures ready. Consider using migration tools for version-controlled schema changes.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these DDL fundamentals:

- **DDL defines database structure** using CREATE, ALTER, DROP commands
- **ALTER modifies existing objects** without losing data (when done correctly)
- **DROP permanently deletes** objects and cannot be undone
- **TRUNCATE clears all data** but keeps table structure
- **Always backup** before DROP and major ALTER operations
- **Test DDL changes** on non-production databases first
- **Plan ALTER operations** for large tables to minimize downtime
- **Use transactions** when possible for DDL operations
- **Document schema changes** for maintainability

---

## What's Next?

Now that you understand DDL, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Create Database](/mysql/mysql-create-database)**: Learn to create tables and databases
2. **[MySQL Constraints](/mysql/mysql-constraints)**: Add constraints using ALTER
3. **[MySQL Indexes](/mysql/mysql-indexes)**: Create and manage indexes with DDL
4. **[MySQL Insert Update Delete](/mysql/mysql-insert-update-delete)**: Understand DML operations

### Advanced Topics

- **Schema Migration**: Master database migration techniques
- **Online DDL**: Learn non-blocking ALTER operations (MySQL 5.6+)
- **Partitioning**: Use DDL for table partitioning
- **Database Design**: Design schemas with DDL best practices

### Related Tutorials

- **[MySQL Introduction](/mysql/mysql-introduction)**: Review database fundamentals
- **[MySQL Data Types](/mysql/mysql-data-types)**: Choose types for DDL operations
- **[Database Administration](/tutorial/database-administration)**: Master DDL for administration
- **[Spring Boot JPA](/springboot/spring-boot-jpa)**: See how JPA generates DDL

DDL is essential for database structure management. Continue learning about [MySQL Constraints](/mysql/mysql-constraints) to understand how to add constraints using ALTER statements.

---

## 10 Important MySQL DDL Interview Questions

### 1. What is DDL and how does it differ from DML?

**Answer:** **DDL (Data Definition Language)** describes **metadata**: creating and altering **schemas**, **tables**, **indexes**, **views**, and **constraints**—statements like \`CREATE\`, \`ALTER\`, \`DROP\`, and often \`TRUNCATE\` for wiping a table’s rows. **DML (Data Manipulation Language)** changes **rows**: \`INSERT\`, \`UPDATE\`, \`DELETE\`, and \`SELECT\` for reading. In operations, DDL may require **stronger locks** or **online DDL** planning on large InnoDB tables. Interviewers like when you mention **migrations** (Flyway/Liquibase) and **rollback** strategy for DDL.

### 2. What should you consider when using ALTER TABLE ADD COLUMN?

**Answer:** Adding a column must define how **existing rows** get values: **NULL** (if allowed), **DEFAULT**, or a **generated** default in newer versions. On **large** tables, \`ALTER\` can be **slow** and may **block** or use **online** algorithms depending on version and settings. Always test on a **copy** of production volume and read **metadata locks**. Mention **backfill** jobs if you need computed values for old rows.

### 3. What is the difference between DROP TABLE and TRUNCATE TABLE?

**Answer:** **DROP TABLE** removes the **table object** from the catalog (and its indexes); it is a structural change. **TRUNCATE** removes **all rows** quickly and typically **resets** \`AUTO_INCREMENT\`; the **table definition** remains. **TRUNCATE** is often **DDL-like** and may **commit** implicitly in ways that differ from **DELETE**; **foreign keys** and **referential** rules may block or cascade depending on definitions. **DELETE** without \`WHERE\` is row-by-row and fully logged—**slower** but sometimes safer for transactional control.

### 4. How do indexes relate to DDL?

**Answer:** Indexes are **created** with DDL (\`CREATE INDEX\`, or inline \`KEY\`/\`INDEX\` in \`CREATE TABLE\`). They are **physical structures** that speed **point lookups**, **range scans**, and **some** sorts and joins. **Trade-off:** faster reads, **more** disk, and **write amplification** on every insert/update/delete. **Primary key** and **unique** constraints are implemented with **unique** indexes in InnoDB.

### 5. What is a composite primary key?

**Answer:** A **composite** primary key uses **two or more** columns together, e.g. \`PRIMARY KEY (order_id, line_no)\`. **Uniqueness** applies to the **combination**, not each column alone. **Junction** tables for many-to-many relationships often use composite PKs or a **surrogate** id plus **unique** constraints—be ready to defend either design.

### 6. What does MODIFY COLUMN (or CHANGE COLUMN) do?

**Answer:** \`ALTER TABLE ... MODIFY\` changes **column definition**: type, **NULL**/**NOT NULL**, **default**, **charset**, etc. **Narrowing** types (e.g. \`VARCHAR(255)\` → \`VARCHAR(10)\`) can **truncate** or **fail** if data does not fit. **Widening** is usually safer. Always validate with **SELECT** checks on min/max lengths before **ALTER** in production.

### 7. Why use IF EXISTS / IF NOT EXISTS in DDL scripts?

**Answer:** These clauses make scripts **idempotent**—safe to run in **automation** when the object may already exist. They reduce **noise** in CI/CD but are **not** a substitute for **migration versioning**; you still need ordered, reviewed changes. In production, **blind** \`CREATE IF NOT EXISTS\` can hide **schema drift** if someone hand-edited the database.

### 8. What is a view from a DDL perspective?

**Answer:** \`CREATE VIEW\` registers a **named query** that behaves like a **virtual table**. Views simplify **reporting**, **security** (hiding columns), and **API** stability. They usually **do not** store data (unless **materialized** views—limited in MySQL compared to other DBs). **Updatable** views have restrictions; complex views may be **read-only**.

### 9. What is normalization?

**Answer:** **Normalization** organizes tables to **reduce redundancy** and **anomalies** (insert/update/delete). **Third Normal Form (3NF)** is a common OLTP target: every non-key column depends **only** on the key, **not** on other non-key columns. Denormalization is sometimes intentional for **read** performance—say you understand **trade-offs**, not only textbook rules.

### 10. What should you say about DDL in production?

**Answer:** Treat DDL as **high-risk**: coordinate with **backups**, **replication** lag, **application** deploy order, and **rollback** plans. Use **maintenance windows** or **online DDL** where supported. **Review** lock duration and **binlog** impact. A mature sound bite: “**Schema changes** are code changes—same **review**, **testing**, and **observability**.”

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Create DB & tables** | [Creating Databases and Tables](/mysql/mysql-create-database) |
| **Data types** | [MySQL Data Types](/mysql/mysql-data-types) |
| **Constraints** | [MySQL Constraints](/mysql/mysql-constraints) |
| **Indexes** | [MySQL Indexes](/mysql/mysql-indexes) |
| **Hibernate mapping** | [Hibernate Mapping](/hibernate/hibernate-mapping) |

---

## Test Your Knowledge

Ready to test your MySQL DDL understanding? Take our comprehensive [MySQL MCQ Exam](/mysql-mcq) with 20 randomly selected questions covering DDL, DML, DQL, and all MySQL topics!
  `,
  code: `-- MySQL DDL Examples

CREATE DATABASE ddl_demo;
USE ddl_demo;

-- Create initial table
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- ========== ALTER TABLE - Add Column ==========

-- Add single column
ALTER TABLE products 
ADD COLUMN description TEXT;

-- Add multiple columns
ALTER TABLE products 
ADD COLUMN category VARCHAR(50),
ADD COLUMN stock INT UNSIGNED DEFAULT 0;

-- Add column at specific position
ALTER TABLE products 
ADD COLUMN sku VARCHAR(50) AFTER name;

-- ========== ALTER TABLE - Modify Column ==========

-- Change column data type
ALTER TABLE products 
MODIFY COLUMN price DECIMAL(12, 2);

-- Change column name and type
ALTER TABLE products 
CHANGE COLUMN description product_description TEXT;

-- Modify with constraints
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(200) NOT NULL;

-- ========== ALTER TABLE - Drop Column ==========

-- Remove column
ALTER TABLE products 
DROP COLUMN product_description;

-- ========== ALTER TABLE - Constraints ==========

-- Add primary key (if not exists)
-- ALTER TABLE products ADD PRIMARY KEY (id);

-- Add foreign key
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    total_amount DECIMAL(10, 2)
);

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Add unique constraint
ALTER TABLE products 
ADD CONSTRAINT uk_sku UNIQUE (sku);

-- Add check constraint (MySQL 8.0.16+)
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE products 
DROP CONSTRAINT uk_sku;

-- Drop foreign key
ALTER TABLE orders 
DROP FOREIGN KEY fk_orders_customer;

-- ========== ALTER TABLE - Indexes ==========

-- Add index
ALTER TABLE products 
ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products 
ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products 
ADD INDEX idx_category_price (category, price);

-- Drop index
ALTER TABLE products 
DROP INDEX idx_name;

-- ========== ALTER TABLE - Rename ==========

-- Rename table
ALTER TABLE products RENAME TO product_items;

-- Or use RENAME TABLE
RENAME TABLE product_items TO products;

-- ========== DROP Statement ==========

-- Drop table
DROP TABLE IF EXISTS temp_table;

-- Drop multiple tables
-- DROP TABLE table1, table2, table3;

-- Drop database
-- DROP DATABASE IF EXISTS test_db;

-- Drop index
DROP INDEX idx_sku ON products;

-- ========== TRUNCATE TABLE ==========

-- Truncate table (removes all rows)
TRUNCATE TABLE products;

-- TRUNCATE vs DELETE
-- TRUNCATE: Faster, resets AUTO_INCREMENT, no WHERE clause
-- DELETE: Slower, doesn't reset AUTO_INCREMENT, supports WHERE

-- ========== Real-World Examples ==========

-- Add timestamp columns
ALTER TABLE products 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Increase column size
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(500);

-- Add status column
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- Add foreign key with CASCADE
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) 
REFERENCES customers(id) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
`
};

export default mysqlDDL;


