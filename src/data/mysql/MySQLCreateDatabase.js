const mysqlCreateDatabase = {
  id: 'mysql-create-database',
  title: 'Creating Databases and Tables',
  description: 'Learn how to create databases, tables, and understand database structure',
  content: `
# Creating Databases and Tables — Building Your Data Foundation

Creating databases and tables is the first step in building any application. This tutorial covers everything you need to know about database and table creation in MySQL.

---

## Creating a Database

### Basic Syntax

\`\`\`sql
CREATE DATABASE database_name;
\`\`\`

### Example

\`\`\`sql
-- Create a database
CREATE DATABASE ecommerce_db;

-- Use the database
USE ecommerce_db;
\`\`\`

### With Character Set

\`\`\`sql
-- Create database with UTF-8 encoding
CREATE DATABASE mydb 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
\`\`\`

### Check if Database Exists

\`\`\`sql
-- Create only if doesn't exist
CREATE DATABASE IF NOT EXISTS mydb;
\`\`\`

---

## Viewing Databases

\`\`\`sql
-- Show all databases
SHOW DATABASES;

-- Show current database
SELECT DATABASE();

-- Show database creation statement
SHOW CREATE DATABASE mydb;
\`\`\`

---

## Creating Tables

### Basic Syntax

\`\`\`sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
);
\`\`\`

### Simple Example

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## Table Constraints

### PRIMARY KEY
Uniquely identifies each row.

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);
\`\`\`

### AUTO_INCREMENT
Automatically generates sequential numbers.

\`\`\`sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE
);
\`\`\`

### NOT NULL
Column cannot be empty.

\`\`\`sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Required
    email VARCHAR(255) NOT NULL  -- Required
);
\`\`\`

### UNIQUE
Column values must be unique.

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,  -- No duplicates
    email VARCHAR(255) UNIQUE     -- No duplicates
);
\`\`\`

### DEFAULT
Sets default value if not provided.

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    stock INT DEFAULT 0,  -- Default: 0
    is_active TINYINT(1) DEFAULT 1,  -- Default: 1 (true)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### CHECK (MySQL 8.0+)
Validates data before insertion.

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2) CHECK (price > 0),  -- Price must be positive
    stock INT CHECK (stock >= 0)  -- Stock cannot be negative
);
\`\`\`

---

## Complete Real-World Example

### E-Commerce Database Structure

\`\`\`sql
-- Create database
CREATE DATABASE IF NOT EXISTS ecommerce 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ecommerce;

-- Customers table
CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(50) DEFAULT 'USA',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_name (last_name, first_name)
);

-- Categories table
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Products table
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    cost DECIMAL(10, 2),
    stock_quantity INT UNSIGNED DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id INT UNSIGNED,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_sku (sku),
    INDEX idx_name (name),
    INDEX idx_price (price)
);

-- Orders table
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
    INDEX idx_customer (customer_id),
    INDEX idx_date (order_date),
    INDEX idx_status (status)
);

-- Order items table
CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);
\`\`\`

---

## Viewing Table Structure

\`\`\`sql
-- Show all tables
SHOW TABLES;

-- Describe table structure
DESCRIBE table_name;
-- Or
DESC table_name;

-- Show create table statement
SHOW CREATE TABLE table_name;

-- Show table status
SHOW TABLE STATUS LIKE 'table_name';
\`\`\`

---

## Modifying Tables

### Add Column

\`\`\`sql
ALTER TABLE users 
ADD COLUMN phone VARCHAR(20) AFTER email;
\`\`\`

### Modify Column

\`\`\`sql
ALTER TABLE users 
MODIFY COLUMN name VARCHAR(150);
\`\`\`

### Drop Column

\`\`\`sql
ALTER TABLE users 
DROP COLUMN phone;
\`\`\`

### Rename Table

\`\`\`sql
RENAME TABLE old_name TO new_name;
\`\`\`

---

## Dropping Tables and Databases

### Drop Table

\`\`\`sql
-- Drop table
DROP TABLE table_name;

-- Drop if exists
DROP TABLE IF EXISTS table_name;
\`\`\`

### Drop Database

\`\`\`sql
-- Drop database
DROP DATABASE database_name;

-- Drop if exists
DROP DATABASE IF EXISTS database_name;
\`\`\`

**⚠️ Warning:** Dropping deletes all data permanently!

---

## Indexes

Indexes improve query performance.

### Create Index

\`\`\`sql
-- Create index
CREATE INDEX idx_email ON users(email);

-- Create unique index
CREATE UNIQUE INDEX idx_username ON users(username);

-- Create composite index
CREATE INDEX idx_name ON users(last_name, first_name);
\`\`\`

### Show Indexes

\`\`\`sql
SHOW INDEXES FROM table_name;
\`\`\`

### Drop Index

\`\`\`sql
DROP INDEX idx_email ON users;
\`\`\`

---

## Foreign Keys

Foreign keys maintain referential integrity.

### Create Foreign Key

\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

### Foreign Key Options

\`\`\`sql
-- ON DELETE CASCADE - Delete related records
FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE

-- ON DELETE SET NULL - Set to NULL
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL

-- ON DELETE RESTRICT - Prevent deletion
FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT
\`\`\`

---

## Best Practices

### 1. Use Meaningful Names
\`\`\`sql
-- Good
CREATE TABLE user_profiles (...);

-- Bad
CREATE TABLE up (...);
\`\`\`

### 2. Use Appropriate Data Types
\`\`\`sql
-- Good
price DECIMAL(10, 2)
age TINYINT UNSIGNED

-- Bad
price VARCHAR(20)
age TEXT
\`\`\`

### 3. Always Use Primary Keys
\`\`\`sql
-- Good
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY

-- Bad
-- No primary key
\`\`\`

### 4. Add Indexes for Frequently Queried Columns
\`\`\`sql
-- Index on email (often used in WHERE clause)
INDEX idx_email (email)
\`\`\`

### 5. Use Foreign Keys for Relationships
\`\`\`sql
-- Maintain data integrity
FOREIGN KEY (customer_id) REFERENCES customers(id)
\`\`\`

---

## Summary

**Creating Databases:**
- \`CREATE DATABASE\` - Create new database
- \`USE database_name\` - Select database
- \`SHOW DATABASES\` - List all databases

**Creating Tables:**
- \`CREATE TABLE\` - Create new table
- Define columns with data types
- Add constraints (PRIMARY KEY, NOT NULL, UNIQUE, etc.)
- Add indexes for performance
- Add foreign keys for relationships

**Key Constraints:**
- **PRIMARY KEY** - Unique identifier
- **AUTO_INCREMENT** - Auto-generate IDs
- **NOT NULL** - Required field
- **UNIQUE** - No duplicates
- **DEFAULT** - Default value
- **FOREIGN KEY** - Relationship constraint

After mastering database and table creation, you can proceed to store and manage data in your MySQL databases.

---

## Practice Question

**Q:** Create a complete database structure for a blog system with:
- Users table (id, username, email, password, created_at)
- Posts table (id, user_id, title, content, published_at)
- Comments table (id, post_id, user_id, comment, created_at)

Include all necessary constraints, indexes, and foreign keys.

**Answer:**
\`\`\`sql
CREATE DATABASE blog_db;
USE blog_db;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

CREATE TABLE posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_published (published_at)
);

CREATE TABLE comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_user (user_id)
);
\`\`\`
  `,
  code: `-- MySQL Database and Table Creation Examples

-- Create database
CREATE DATABASE IF NOT EXISTS demo_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE demo_db;

-- Example 1: Simple Users Table
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age TINYINT UNSIGNED,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Example 2: Products Table with Constraints
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT UNSIGNED DEFAULT 0 CHECK (stock >= 0),
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example 3: Orders with Foreign Keys
CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
    INDEX idx_customer (customer_id),
    INDEX idx_date (order_date)
);

-- Example 4: Many-to-Many Relationship
CREATE TABLE students (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE student_courses (
    student_id INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    enrolled_date DATE DEFAULT (CURRENT_DATE),
    grade DECIMAL(5, 2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- View table structures
SHOW TABLES;
DESCRIBE users;
SHOW CREATE TABLE products;

-- Modify table
ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;
ALTER TABLE users MODIFY COLUMN name VARCHAR(150);
ALTER TABLE users DROP COLUMN phone;

-- Create indexes
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_price ON products(price);

-- Show indexes
SHOW INDEXES FROM users;

-- Insert sample data
INSERT INTO customers (name, email, phone) VALUES
('Dattu p', ' Dattu@example.com', '123-456-7890'),
('Jane Smith', 'jane@example.com', '098-765-4321');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 99.99, 'pending'),
(2, '2024-01-16', 149.50, 'processing');

-- Query with JOIN
SELECT 
    o.id AS order_id,
    c.name AS customer_name,
    o.order_date,
    o.total_amount,
    o.status
FROM orders o
JOIN customers c ON o.customer_id = c.id;

---

## Test Your Knowledge

Mastered creating databases and tables? Test your MySQL skills with our comprehensive [MySQL MCQ Exam](/tutorial/mysql-mcq) covering CREATE, ALTER, DROP, and all MySQL topics!`
};

export default mysqlCreateDatabase;


