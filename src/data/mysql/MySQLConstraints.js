const mysqlConstraints = {
  id: 'mysql-constraints',
  title: 'MySQL Constraints and Keys',
  description: 'Learn about PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK constraints and their importance',
  content: `
# MySQL Constraints and Keys - Ensuring Data Integrity

MySQL constraints are rules enforced on table columns that ensure data integrity, validity, and consistency in relational databases. Constraints prevent invalid data from being inserted, maintain relationships between tables through foreign keys, and enforce business rules at the database level. Understanding constraints is essential for designing robust, reliable database schemas.

Enterprise applications rely heavily on database constraints to maintain data quality, prevent data corruption, and ensure referential integrity across related tables. Constraints act as a safety net, catching invalid data before it enters the database, reducing application-level validation complexity and ensuring data consistency even when multiple applications access the same database.

**Constraint Benefits:**
- **Data Integrity**: Prevents invalid or inconsistent data
- **Referential Integrity**: Maintains relationships between tables
- **Business Rule Enforcement**: Validates data at database level
- **Performance**: Indexes created for keys improve query performance
- **Data Quality**: Ensures only valid data is stored

---

## What are Constraints?

**Constraints** are rules applied to table columns that:
- ✅ Ensure data validity
- ✅ Maintain referential integrity
- ✅ Prevent duplicate data
- ✅ Enforce business rules

---

## Types of Constraints

1. **PRIMARY KEY** - Uniquely identifies each row
2. **FOREIGN KEY** - Maintains relationships
3. **UNIQUE** - Ensures no duplicate values
4. **NOT NULL** - Prevents NULL values
5. **CHECK** - Validates data (MySQL 8.0+)
6. **DEFAULT** - Sets default value

---

## 1. PRIMARY KEY

Uniquely identifies each row in a table. A table can have only one primary key.

### Single Column Primary Key

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
\`\`\`

### Auto-Increment Primary Key

\`\`\`sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
\`\`\`

### Composite Primary Key

\`\`\`sql
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
\`\`\`

### Add Primary Key to Existing Table

\`\`\`sql
ALTER TABLE users ADD PRIMARY KEY (id);
\`\`\`

---

## 2. FOREIGN KEY

Maintains referential integrity between tables. Ensures that values in one table exist in another.

### Basic Foreign Key

\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

### Foreign Key with Options

\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE CASCADE      -- Delete orders when customer deleted
        ON UPDATE CASCADE      -- Update orders when customer id changes
);
\`\`\`

### Foreign Key Options

**ON DELETE:**
- **CASCADE** - Delete related rows
- **SET NULL** - Set foreign key to NULL
- **RESTRICT** - Prevent deletion (default)
- **NO ACTION** - Same as RESTRICT

**ON UPDATE:**
- **CASCADE** - Update foreign key value
- **SET NULL** - Set to NULL
- **RESTRICT** - Prevent update

### Real-World Example

\`\`\`sql
-- Customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Orders table with foreign key
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE RESTRICT  -- Can't delete customer with orders
        ON UPDATE CASCADE    -- Update order if customer id changes
);

-- Order items with multiple foreign keys
CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE,  -- Delete items when order deleted
    FOREIGN KEY (product_id) 
        REFERENCES products(id) 
        ON DELETE RESTRICT  -- Can't delete product with orders
);
\`\`\`

---

## 3. UNIQUE Constraint

Ensures all values in a column are unique.

### Column Level

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(50) UNIQUE
);
\`\`\`

### Table Level

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(50),
    UNIQUE (email),
    UNIQUE (username)
);
\`\`\`

### Composite Unique

\`\`\`sql
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    UNIQUE (student_id, course_id)  -- Student can enroll once per course
);
\`\`\`

---

## 4. NOT NULL Constraint

Prevents NULL values in a column.

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)  -- Can be NULL
);
\`\`\`

---

## 5. CHECK Constraint (MySQL 8.0+)

Validates data before insertion.

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2) CHECK (price > 0),  -- Price must be positive
    stock INT CHECK (stock >= 0),            -- Stock cannot be negative
    discount DECIMAL(5, 2) CHECK (discount >= 0 AND discount <= 100)  -- 0-100%
);
\`\`\`

### Complex CHECK

\`\`\`sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT CHECK (age >= 18 AND age <= 65),
    salary DECIMAL(10, 2) CHECK (salary > 0),
    email VARCHAR(255) CHECK (email LIKE '%@%.%')
);
\`\`\`

---

## 6. DEFAULT Constraint

Sets default value when no value is provided.

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    stock INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

---

## Modifying Constraints

### Add Constraint

\`\`\`sql
-- Add NOT NULL
ALTER TABLE users MODIFY COLUMN email VARCHAR(255) NOT NULL;

-- Add UNIQUE
ALTER TABLE users ADD UNIQUE (email);

-- Add CHECK (MySQL 8.0+)
ALTER TABLE products ADD CONSTRAINT chk_price CHECK (price > 0);

-- Add FOREIGN KEY
ALTER TABLE orders 
ADD CONSTRAINT fk_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);
\`\`\`

### Drop Constraint

\`\`\`sql
-- Drop UNIQUE
ALTER TABLE users DROP INDEX email;

-- Drop FOREIGN KEY
ALTER TABLE orders DROP FOREIGN KEY fk_customer;

-- Drop PRIMARY KEY
ALTER TABLE users DROP PRIMARY KEY;
\`\`\`

---

## Complete Example: E-Commerce Database

\`\`\`sql
CREATE DATABASE ecommerce;
USE ecommerce;

-- Categories with self-referencing foreign key
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    parent_id INT UNSIGNED,
    FOREIGN KEY (parent_id) 
        REFERENCES categories(id) 
        ON DELETE SET NULL
);

-- Customers
CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (email LIKE '%@%.%')
);

-- Products
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    cost DECIMAL(10, 2) CHECK (cost >= 0),
    stock INT UNSIGNED DEFAULT 0 CHECK (stock >= 0),
    category_id INT UNSIGNED,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE SET NULL
);

-- Orders
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount > 0),
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') 
        DEFAULT 'pending',
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id) 
        ON DELETE RESTRICT
);

-- Order Items (Composite Primary Key)
CREATE TABLE order_items (
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) 
        REFERENCES products(id) 
        ON DELETE RESTRICT
);
\`\`\`

---

## Viewing Constraints

\`\`\`sql
-- Show all constraints
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    TABLE_NAME
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'your_database';

-- Show foreign keys
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'your_database'
AND REFERENCED_TABLE_NAME IS NOT NULL;
\`\`\`

---

## Best Practices

### 1. Always Use Primary Keys
\`\`\`sql
-- Good
CREATE TABLE users (id INT PRIMARY KEY, ...);

-- Bad
CREATE TABLE users (id INT, ...);  -- No primary key
\`\`\`

### 2. Use Foreign Keys for Relationships
\`\`\`sql
-- Good - maintains integrity
FOREIGN KEY (customer_id) REFERENCES customers(id)

-- Bad - no relationship enforcement
customer_id INT  -- No foreign key
\`\`\`

### 3. Choose Appropriate ON DELETE Action
\`\`\`sql
-- CASCADE - for dependent data (order items)
ON DELETE CASCADE

-- RESTRICT - for important data (customers)
ON DELETE RESTRICT

-- SET NULL - for optional relationships
ON DELETE SET NULL
\`\`\`

### 4. Use UNIQUE for Business Rules
\`\`\`sql
-- Email must be unique
email VARCHAR(255) UNIQUE

-- Username must be unique
username VARCHAR(50) UNIQUE
\`\`\`

---

## Summary

**Constraints ensure data integrity:**
- **PRIMARY KEY** - Unique identifier
- **FOREIGN KEY** - Relationships between tables
- **UNIQUE** - No duplicate values
- **NOT NULL** - Required fields
- **CHECK** - Data validation
- **DEFAULT** - Default values

**Key Benefits:**
- Prevents invalid data
- Maintains relationships
- Enforces business rules

**Related Topics:**
- Learn [Creating Databases and Tables](/tutorial/mysql-create-database) to apply constraints
- Use [MySQL Joins](/tutorial/mysql-joins) with FOREIGN KEY relationships
- Understand [MySQL Indexes](/tutorial/mysql-indexes) for PRIMARY KEY performance
- Connect from Java with [JDBC](/tutorial/jdbc-introduction) and [Spring Boot JPA](/tutorial/spring-boot-jpa)
- Improves data quality

Use constraints wisely to build robust databases!

---

## Practice Question

**Q:** Design a database for a library system with:
- Books table (id, isbn, title, author_id)
- Authors table (id, name)
- Members table (id, email, name)
- Borrowings table (member_id, book_id, borrow_date, return_date)

Add all necessary constraints including foreign keys with appropriate ON DELETE actions.

**Answer:**
\`\`\`sql
CREATE TABLE authors (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    author_id INT UNSIGNED,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL
);

CREATE TABLE members (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE borrowings (
    member_id INT UNSIGNED NOT NULL,
    book_id INT UNSIGNED NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE,
    PRIMARY KEY (member_id, book_id, borrow_date),
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT
);
\`\`\`
  `,
  code: `-- MySQL Constraints and Keys Examples

CREATE DATABASE constraints_demo;
USE constraints_demo;

-- ========== PRIMARY KEY Examples ==========

-- Single column primary key
CREATE TABLE users1 (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Auto-increment primary key
CREATE TABLE users2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- ========== FOREIGN KEY Examples ==========

CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Foreign key with CASCADE
CREATE TABLE orders1 (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Foreign key with RESTRICT
CREATE TABLE orders2 (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
);

-- Foreign key with SET NULL
CREATE TABLE orders3 (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

-- ========== UNIQUE Constraint ==========

CREATE TABLE users3 (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(50) UNIQUE,
    phone VARCHAR(20)
);

-- Composite unique
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    UNIQUE (student_id, course_id)
);

-- ========== NOT NULL ==========

CREATE TABLE users4 (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)  -- Can be NULL
);

-- ========== CHECK Constraint (MySQL 8.0+) ==========

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2) CHECK (price > 0),
    stock INT CHECK (stock >= 0),
    discount DECIMAL(5, 2) CHECK (discount >= 0 AND discount <= 100)
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT CHECK (age >= 18 AND age <= 65),
    salary DECIMAL(10, 2) CHECK (salary > 0),
    email VARCHAR(255) CHECK (email LIKE '%@%.%')
);

-- ========== DEFAULT Constraint ==========

CREATE TABLE products2 (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    stock INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========== Complete E-Commerce Example ==========

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    parent_id INT UNSIGNED,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products3 (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT UNSIGNED DEFAULT 0 CHECK (stock >= 0),
    category_id INT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ========== Modifying Constraints ==========

-- Add constraint
ALTER TABLE users4 ADD UNIQUE (email);
ALTER TABLE products3 ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE users4 DROP INDEX email;
ALTER TABLE orders1 DROP FOREIGN KEY orders1_ibfk_1;

-- View constraints
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    TABLE_NAME
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'constraints_demo';

---

## Real-World Applications

### E-Commerce Database Design
E-commerce platforms use constraints extensively to ensure data integrity. Primary keys uniquely identify products and orders, foreign keys maintain relationships between orders and customers, unique constraints prevent duplicate email addresses, and check constraints validate prices and quantities.

**Implementation Example:**
- Products table with PRIMARY KEY on product_id
- Orders table with FOREIGN KEY to customers table
- Customers table with UNIQUE constraint on email
- Products table with CHECK constraint ensuring price > 0
- Order_items table with FOREIGN KEY to both orders and products

### Financial Systems
Banking and financial applications rely heavily on constraints for data integrity. Primary keys ensure unique account numbers, foreign keys maintain transaction relationships, NOT NULL constraints ensure critical data is always present, and check constraints validate amounts and balances.

**Implementation Example:**
- Accounts table with PRIMARY KEY on account_number
- Transactions table with FOREIGN KEY to accounts
- Accounts table with NOT NULL on balance and account_type
- Transactions table with CHECK constraint ensuring amount > 0
- Customers table with UNIQUE constraint on SSN

### User Management Systems
User management systems use constraints to ensure data quality and prevent duplicates. Primary keys uniquely identify users, unique constraints on email and username prevent duplicates, foreign keys maintain role relationships, and check constraints validate data formats.

**Implementation Example:**
- Users table with PRIMARY KEY on user_id
- Users table with UNIQUE constraint on email and username
- User_roles table with FOREIGN KEY to users and roles
- Users table with CHECK constraint validating email format
- Profiles table with FOREIGN KEY to users ensuring one profile per user

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using Foreign Keys
**Problem:** Creating relationships without foreign key constraints leads to orphaned records and data inconsistency.

**Solution:** Always define foreign keys for relationships:

\`\`\`sql
-- GOOD - With foreign key
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- BAD - Without foreign key
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT  -- No constraint, can reference non-existent customer
);
\`\`\`

### Mistake 2: Using Wrong Primary Key
**Problem:** Using business data (like email) as primary key instead of surrogate key.

**Solution:** Use auto-increment integer as primary key:

\`\`\`sql
-- GOOD - Surrogate key
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- AVOID - Business key as primary
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY  -- Can cause issues if email changes
);
\`\`\`

### Mistake 3: Not Using NOT NULL for Critical Fields
**Problem:** Allowing NULL in critical fields leads to incomplete data.

**Solution:** Use NOT NULL for required fields:

\`\`\`sql
-- GOOD - Required fields
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- BAD - Missing NOT NULL
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),  -- Can be NULL, causing issues
    name VARCHAR(100)
);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What are database constraints and why are they important?

Database constraints are rules enforced on table columns that ensure data integrity, validity, and consistency. They're important because they prevent invalid data from entering the database, maintain relationships between tables, enforce business rules at the database level, and ensure data quality even when multiple applications access the database.

### What's the difference between PRIMARY KEY and UNIQUE constraint?

A PRIMARY KEY uniquely identifies each row, cannot be NULL, and a table can have only one primary key. A UNIQUE constraint ensures no duplicate values but allows NULL values, and a table can have multiple unique constraints. Primary keys are used for identification, unique constraints for preventing duplicates in non-key columns.

### What is a foreign key and how does it work?

A foreign key is a column or set of columns that references the primary key of another table. It maintains referential integrity by ensuring that values in the foreign key column exist in the referenced table. Foreign keys prevent orphaned records and maintain relationships between tables. Learn about [MySQL Joins](/tutorial/mysql-joins) to see how foreign keys enable table relationships.

### Can a table have multiple foreign keys?

Yes, a table can have multiple foreign keys, each referencing a different table or the same table (self-referencing). This is common in normalized databases where tables have relationships with multiple other tables. For example, an orders table might have foreign keys to both customers and products tables.

### What happens when I try to delete a row referenced by a foreign key?

The behavior depends on the foreign key's ON DELETE action: CASCADE deletes related rows, SET NULL sets foreign key to NULL, RESTRICT/NO ACTION prevents deletion, and SET DEFAULT sets foreign key to default value. The default is RESTRICT, which prevents deletion of referenced rows.

### What is the difference between CHECK constraint and application-level validation?

CHECK constraints validate data at the database level, ensuring data integrity regardless of which application inserts data. Application-level validation only works for that specific application. Use CHECK constraints for critical business rules that must always be enforced, and application validation for user experience and complex logic.

### Can I add constraints to existing tables?

Yes, you can add constraints to existing tables using ALTER TABLE statements. You can add PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and DEFAULT constraints. However, adding constraints to tables with existing data requires that the data meets the constraint requirements.

### What is a composite primary key?

A composite primary key is a primary key made up of multiple columns. It's used when a single column cannot uniquely identify rows, but a combination of columns can. Composite keys are common in junction tables (many-to-many relationships) and tables with natural composite identifiers.

### How do constraints affect database performance?

Constraints can improve performance through indexes (PRIMARY KEY and UNIQUE constraints create indexes automatically) but can also impact performance during INSERT/UPDATE operations due to constraint checking. Foreign keys require checking referenced tables, which can slow down operations. However, the data integrity benefits usually outweigh the performance costs.

### Should I use constraints or rely on application validation?

Use both - constraints for critical data integrity rules that must always be enforced, and application validation for user experience and complex business logic. Database constraints provide a safety net that works regardless of which application accesses the database, while application validation provides better user feedback and handles complex validation logic.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these constraint fundamentals:

- **Constraints ensure data integrity** by enforcing rules at the database level
- **PRIMARY KEY** uniquely identifies rows and cannot be NULL
- **FOREIGN KEY** maintains relationships and referential integrity
- **UNIQUE constraint** prevents duplicates but allows NULL
- **NOT NULL** ensures required fields always have values
- **CHECK constraint** validates data against conditions
- **DEFAULT** provides default values for columns
- **Constraints create indexes** (PRIMARY KEY, UNIQUE) improving performance
- **ON DELETE/UPDATE actions** control behavior when referenced rows change

---

## What's Next?

Now that you understand MySQL constraints, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Joins](/tutorial/mysql-joins)**: Use foreign keys to join related tables
2. **[MySQL Indexes](/tutorial/mysql-indexes)**: Understand how constraints create indexes
3. **[MySQL Data Types](/tutorial/mysql-data-types)**: Choose appropriate types for constraints
4. **[MySQL Transactions](/tutorial/mysql-transactions)**: Maintain integrity with transactions

### Advanced Topics

- **Constraint Optimization**: Learn to optimize constraint performance
- **Complex Constraints**: Master composite keys and multi-column constraints
- **Constraint Maintenance**: Add, modify, and drop constraints
- **Referential Integrity**: Deep dive into foreign key relationships

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
- **[MySQL Create Database](/tutorial/mysql-create-database)**: Create tables with constraints
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Work with constraints in Java
- **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: See how JPA handles constraints

Constraints are essential for maintaining data integrity. Continue learning about [MySQL Joins](/tutorial/mysql-joins) to see how foreign keys enable table relationships.
`
};

export default mysqlConstraints;


