const mysqlIntroduction = {
  id: 'mysql-introduction',
  title: 'Introduction to MySQL',
  description: 'Learn what MySQL is, why it\'s popular, and how it fits into modern applications',
  content: `
# MySQL — The World's Most Popular Database

MySQL is the most widely used open-source relational database management system (RDBMS) in the world. It powers millions of websites and applications, from small blogs to large-scale enterprise systems.

---

## What is MySQL?

**MySQL** is a relational database management system (RDBMS) that uses Structured Query Language (SQL) to manage data. It's:
- **Open-source** - Free to use and modify
- **Relational** - Data stored in tables with relationships
- **Fast** - Optimized for performance
- **Reliable** - Used by major companies worldwide
- **Scalable** - Handles small to large applications

---

## Why MySQL is Popular

### 1. **Free and Open Source**
- No licensing costs
- Large community support
- Constantly improved

### 2. **Easy to Use**
- Simple installation
- Intuitive SQL syntax
- Great documentation

### 3. **High Performance**
- Fast read/write operations
- Efficient query execution
- Optimized storage engines

### 4. **Widely Supported**
- Works with all major programming languages
- Integrates with web frameworks
- Cloud platform support (AWS, Azure, GCP)

### 5. **Proven Track Record**
- Used by Facebook, Twitter, YouTube, Wikipedia
- Handles billions of queries daily
- Battle-tested in production

---

## What is a Database?

A **database** is an organized collection of data stored and accessed electronically.

**Real-World Analogy:**
- **Database** = Filing cabinet
- **Table** = Drawer in the cabinet
- **Row** = File in the drawer
- **Column** = Information in the file

---

## Relational Database Concepts

### Tables

Data is stored in **tables** (like spreadsheets).

**Example: Users Table**

| id | name | email | age |
|----|------|-------|-----|
| 1 | John | john@example.com | 25 |
| 2 | Jane | jane@example.com | 30 |
| 3 | Bob | bob@example.com | 28 |

### Rows (Records)

Each row represents a single record.

### Columns (Fields)

Each column represents a data attribute.

### Relationships

Tables can be related to each other:

**Users Table**
| id | name | email |
|----|------|-------|
| 1 | John | john@example.com |

**Orders Table**
| id | user_id | total |
|----|---------|-------|
| 101 | 1 | 99.99 |

The \`user_id\` in Orders table references \`id\` in Users table.

---

## MySQL vs Other Databases

| Feature | MySQL | PostgreSQL | Oracle | SQL Server |
|---------|-------|------------|--------|------------|
| **Cost** | Free | Free | Expensive | Expensive |
| **Performance** | Excellent | Excellent | Excellent | Excellent |
| **Ease of Use** | Very Easy | Moderate | Complex | Moderate |
| **Platform** | Cross-platform | Cross-platform | Cross-platform | Windows-focused |
| **Best For** | Web apps | Complex apps | Enterprise | Enterprise |

---

## MySQL Architecture

\`\`\`
┌─────────────────────────────────┐
│      Client Applications        │
│  (Java, PHP, Python, Node.js)    │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      MySQL Server               │
│  ┌──────────────────────────┐  │
│  │  Connection Manager      │  │
│  │  Query Parser            │  │
│  │  Query Optimizer         │  │
│  │  Storage Engine          │  │
│  └──────────────────────────┘  │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Storage (Files/Disk)       │
└─────────────────────────────────┘
\`\`\`

---

## Storage Engines

MySQL supports multiple storage engines:

### InnoDB (Default)
- ✅ ACID compliant (transactions)
- ✅ Foreign key support
- ✅ Row-level locking
- ✅ Best for most applications

### MyISAM
- ✅ Fast reads
- ❌ No transactions
- ❌ Table-level locking
- ⚠️ Legacy (not recommended for new projects)

### Memory
- ✅ Very fast (in-memory)
- ❌ Data lost on restart
- ⚠️ For temporary data

---

## Common Use Cases

### 1. **Web Applications**
- User data
- Product catalogs
- Order management
- Content management

### 2. **E-Commerce**
- Product inventory
- Customer orders
- Payment processing
- Analytics

### 3. **Content Management**
- Articles and blogs
- User comments
- Media metadata
- Search functionality

### 4. **Analytics**
- Business intelligence
- Reporting
- Data warehousing
- Log analysis

---

## MySQL Versions

### MySQL 8.0 (Current)
- Latest features
- Better performance
- Enhanced security
- JSON support
- Window functions

### MySQL 5.7 (Still Supported)
- Stable and reliable
- Widely used
- Good documentation

**Recommendation:** Use MySQL 8.0 for new projects.

---

## Getting Started

### What You'll Learn

1. **Database Fundamentals** - Creating databases and tables
2. **SQL Basics** - SELECT, INSERT, UPDATE, DELETE
3. **Data Types** - Choosing the right types
4. **Constraints** - Ensuring data integrity
5. **Joins** - Combining data from multiple tables
6. **Functions** - Built-in MySQL functions
7. **Advanced Topics** - Stored procedures, triggers, views

### Prerequisites

- Basic computer knowledge
- Understanding of data concepts
- Willingness to practice

---

## MySQL Tools

### 1. **MySQL Command Line**
- Built-in client
- Direct SQL execution
- Lightweight

### 2. **MySQL Workbench** (Recommended)
- Visual database design
- SQL editor
- Query execution
- Database administration

### 3. **phpMyAdmin**
- Web-based interface
- Easy to use
- Good for beginners

### 4. **DBeaver**
- Universal database tool
- Free and open-source
- Supports many databases

---

## Real-World Example: E-Commerce Database

Imagine an e-commerce website. Here's how MySQL stores the data:

**Products Table**
\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stock INT
);
\`\`\`

**Customers Table**
\`\`\`sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
\`\`\`

**Orders Table**
\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

---

## Summary

MySQL is:
- **Popular** - Most used open-source database
- **Powerful** - Handles large-scale applications
- **Free** - Open-source and cost-effective
- **Reliable** - Used by major companies
- **Easy to Learn** - Intuitive SQL syntax

**Key Concepts:**
- **Database** - Collection of related data
- **Table** - Structured data storage
- **Row** - Single record
- **Column** - Data attribute
- **Relationship** - Connection between tables

Ready to dive in? Let's start building databases!

---

## Practice Question

**Q:** Why would you choose MySQL over other databases for a web application?

**Hint:** Think about cost, ease of use, performance, and community support.

**Answer:** MySQL is ideal for web applications because:
1. **Free** - No licensing costs, important for startups
2. **Easy to Use** - Simple SQL syntax, quick to learn
3. **High Performance** - Fast read/write operations
4. **Great Community** - Lots of resources and support
5. **Widely Supported** - Works with all web frameworks
6. **Proven** - Used by major websites, battle-tested
7. **Scalable** - Can grow with your application
  `,
  code: `-- MySQL Introduction Examples

-- Create a simple database
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

-- Create a products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a customers table
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an orders table with relationship
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO products (name, price, stock) VALUES
('Laptop', 999.99, 50),
('Mouse', 29.99, 100),
('Keyboard', 79.99, 75);

INSERT INTO customers (name, email, phone) VALUES
('John Doe', 'john@example.com', '123-456-7890'),
('Jane Smith', 'jane@example.com', '098-765-4321');

INSERT INTO orders (customer_id, order_date, total_amount) VALUES
(1, '2024-01-15', 999.99),
(2, '2024-01-16', 109.98);

-- Query data
SELECT * FROM products;
SELECT * FROM customers;
SELECT * FROM orders;

-- Query with JOIN
SELECT 
    o.id AS order_id,
    c.name AS customer_name,
    o.order_date,
    o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id;
\`\`\`

---

## What's Next?

Now that you understand MySQL basics:

1. **[MySQL Installation and Setup](/tutorial/mysql-installation)** - Install MySQL on your system
2. **[MySQL Data Types](/tutorial/mysql-data-types)** - Learn all data types
3. **[Creating Databases and Tables](/tutorial/mysql-create-database)** - Create your first database
4. **[SELECT Query](/tutorial/mysql-select)** - Retrieve data from tables
5. **[MySQL Joins](/tutorial/mysql-joins)** - Combine data from multiple tables

**Connect MySQL to Java:**
- Learn [JDBC Introduction](/tutorial/jdbc-introduction) to connect Java with MySQL
- Use [Spring Boot JPA](/tutorial/spring-boot-jpa) for easier database operations
`
};

export default mysqlIntroduction;
