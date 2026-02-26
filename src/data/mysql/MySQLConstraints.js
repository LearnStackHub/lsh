const mysqlConstraints = {
  id: 'mysql-constraints',
  title: 'MySQL Constraints and Keys',
  description: 'Learn about PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK constraints and their importance',
  content: `
# MySQL Constraints and Keys — Ensuring Data Integrity

Constraints are rules that enforce data integrity in your database. They prevent invalid data from being inserted and maintain relationships between tables.

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
WHERE TABLE_SCHEMA = 'constraints_demo';`
};

export default mysqlConstraints;


