const mysqlDataTypes = {
  id: 'mysql-data-types',
  title: 'MySQL Data Types',
  description: 'Complete guide to MySQL data types: numeric, string, date, and JSON types',
  content: `
# MySQL Data Types - Choosing the Right Type for Your Data

MySQL data types define the kind of data that can be stored in table columns, determining storage requirements, value ranges, and operations that can be performed. Choosing the correct data type is crucial for database design, affecting storage efficiency, query performance, data integrity, and application functionality. MySQL provides comprehensive data type options for numeric, string, date/time, JSON, and binary data. After learning data types, explore [MySQL Constraints](/mysql/mysql-constraints) to add data validation rules.

Enterprise applications require careful data type selection to optimize storage, ensure data accuracy, and maintain performance at scale. Understanding data types enables developers to design efficient schemas, prevent data overflow, and leverage MySQL's type-specific features. Proper data type selection is fundamental to building robust, performant database applications.

**Data Type Categories:**
- **Numeric Types**: Integers (TINYINT, INT, BIGINT) and decimals (DECIMAL, FLOAT, DOUBLE)
- **String Types**: Variable-length (VARCHAR) and fixed-length (CHAR) text, large text (TEXT)
- **Date/Time Types**: DATE, TIME, DATETIME, TIMESTAMP for temporal data
- **JSON Type**: Native JSON storage and querying (MySQL 5.7+)
- **Binary Types**: BLOB for binary large objects

---

## Why Data Types Matter

**Benefits of Correct Types:**
- ✅ **Storage Efficiency** - Saves disk space
- ✅ **Performance** - Faster queries and indexing
- ✅ **Data Integrity** - Prevents invalid data
- ✅ **Validation** - Automatic type checking

**Problems with Wrong Types:**
- ❌ Wasted storage space
- ❌ Slower queries
- ❌ Data integrity issues
- ❌ Difficult to maintain

---

## Categories of Data Types

1. **Numeric Types** - Numbers (INT, DECIMAL, FLOAT)
2. **String Types** - Text (VARCHAR, TEXT, CHAR)
3. **Date/Time Types** - Dates and times (DATE, DATETIME, TIMESTAMP)
4. **JSON Type** - JSON data (MySQL 5.7+)
5. **Binary Types** - Binary data (BLOB)

---

## 1. Numeric Types

Understanding numeric types is essential before creating tables. Learn about [Creating Databases and Tables](/mysql/mysql-create-database) to apply these data types.

### Integer Types

| Type | Storage | Signed Range | Unsigned Range | Use Case |
|------|---------|--------------|----------------|----------|
| **TINYINT** | 1 byte | -128 to 127 | 0 to 255 | Age, status codes |
| **SMALLINT** | 2 bytes | -32,768 to 32,767 | 0 to 65,535 | Small numbers |
| **MEDIUMINT** | 3 bytes | -8M to 8M | 0 to 16M | Medium numbers |
| **INT** | 4 bytes | -2B to 2B | 0 to 4B | IDs, counts (most common) |
| **BIGINT** | 8 bytes | -9Q to 9Q | 0 to 18Q | Large numbers |

**Examples:**
\`\`\`sql
-- Age (0-150)
age TINYINT UNSIGNED

-- User ID (can be large)
user_id INT UNSIGNED AUTO_INCREMENT

-- Product count (can be very large)
total_products BIGINT UNSIGNED

-- Status code (0 or 1)
is_active TINYINT(1)  -- 0 = false, 1 = true
\`\`\`

### Decimal Types

**DECIMAL(M, D)**
- **M** = Total digits (precision)
- **D** = Digits after decimal (scale)
- Exact precision - no rounding errors
- Use for: Money, prices, measurements

\`\`\`sql
-- Price with 2 decimal places
price DECIMAL(10, 2)  -- Max: 99,999,999.99

-- Weight with 3 decimal places
weight DECIMAL(8, 3)  -- Max: 99,999.999
\`\`\`

**FLOAT and DOUBLE**
- Approximate floating-point numbers
- Faster but less precise
- Use for: Scientific calculations, measurements

\`\`\`sql
-- Scientific measurement
temperature FLOAT

-- High precision calculation
distance DOUBLE
\`\`\`

---

## 2. String Types

### VARCHAR vs CHAR

**VARCHAR(N)**
- Variable-length string
- Stores up to N characters
- Uses only needed space
- **Use for**: Names, addresses, descriptions

\`\`\`sql
-- Name (variable length)
name VARCHAR(100)

-- Email (variable length)
email VARCHAR(255)
\`\`\`

**CHAR(N)**
- Fixed-length string
- Always uses N characters
- Faster for fixed-length data
- **Use for**: Codes, status flags

\`\`\`sql
-- Country code (always 2 chars)
country_code CHAR(2)  -- 'US', 'IN', 'UK'

-- Status (always 1 char)
status CHAR(1)  -- 'A' (Active), 'I' (Inactive)
\`\`\`

### Text Types

| Type | Max Size | Use Case |
|------|----------|----------|
| **TINYTEXT** | 255 bytes | Short descriptions |
| **TEXT** | 65,535 bytes (64 KB) | Articles, comments |
| **MEDIUMTEXT** | 16,777,215 bytes (16 MB) | Long articles, content |
| **LONGTEXT** | 4,294,967,295 bytes (4 GB) | Very long content |

\`\`\`sql
-- Product description
description TEXT

-- Blog post content
content MEDIUMTEXT

-- Large document
document LONGTEXT
\`\`\`

---

## 3. Date and Time Types

### DATE
Stores date only (YYYY-MM-DD)

\`\`\`sql
-- Birth date
birth_date DATE

-- Order date
order_date DATE
\`\`\`

### TIME
Stores time only (HH:MM:SS)

\`\`\`sql
-- Meeting time
meeting_time TIME
\`\`\`

### DATETIME
Stores date and time (YYYY-MM-DD HH:MM:SS)
- Range: 1000-01-01 to 9999-12-31
- No timezone awareness

\`\`\`sql
-- Created timestamp
created_at DATETIME

-- Event date and time
event_datetime DATETIME
\`\`\`

### TIMESTAMP
Stores date and time with timezone
- Range: 1970-01-01 to 2038-01-19
- Automatically converts to UTC
- Auto-update on row modification

\`\`\`sql
-- Auto-updating timestamp
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- Auto-update on change
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

### YEAR
Stores year only (1901 to 2155)

\`\`\`sql
-- Graduation year
graduation_year YEAR
\`\`\`

---

## 4. JSON Type (MySQL 5.7+)

Stores JSON documents with validation.

\`\`\`sql
-- User preferences as JSON
preferences JSON

-- Product metadata
metadata JSON
\`\`\`

**Usage:**
\`\`\`sql
-- Insert JSON
INSERT INTO users (name, preferences) VALUES
(' Dattu', '{"theme": "dark", "language": "en"}');

-- Query JSON
SELECT name, preferences->'$.theme' AS theme FROM users;
\`\`\`

---

## 5. Binary Types

### BLOB Types

| Type | Max Size | Use Case |
|------|----------|----------|
| **TINYBLOB** | 255 bytes | Small binary data |
| **BLOB** | 65,535 bytes | Images, files |
| **MEDIUMBLOB** | 16 MB | Large images |
| **LONGBLOB** | 4 GB | Very large files |

**Note:** For files, consider storing file paths instead of BLOB data.

---

## Complete Example: E-Commerce Database

\`\`\`sql
CREATE TABLE products (
    -- Integer types
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id SMALLINT UNSIGNED,
    stock_quantity INT UNSIGNED DEFAULT 0,
    views_count BIGINT UNSIGNED DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    
    -- String types
    name VARCHAR(200) NOT NULL,
    sku CHAR(20) UNIQUE,
    description TEXT,
    full_description LONGTEXT,
    
    -- Decimal types
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(8, 3),
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    
    -- Date/Time types
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    release_date DATE,
    
    -- JSON type
    specifications JSON,
    
    -- Indexes
    INDEX idx_category (category_id),
    INDEX idx_name (name),
    INDEX idx_price (price)
);
\`\`\`

---

## Choosing the Right Type

### For IDs
\`\`\`sql
-- Primary key (auto-increment)
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY

-- Foreign key
user_id INT UNSIGNED
\`\`\`

### For Names
\`\`\`sql
-- First name (usually short)
first_name VARCHAR(50)

-- Full name (can be longer)
full_name VARCHAR(100)

-- Company name (can be very long)
company_name VARCHAR(255)
\`\`\`

### For Money/Prices
\`\`\`sql
-- Always use DECIMAL for money
price DECIMAL(10, 2)  -- 10 digits total, 2 after decimal
total DECIMAL(12, 2)  -- For larger amounts
\`\`\`

### For Dates
\`\`\`sql
-- Date only
birth_date DATE

-- Date and time (with auto-update)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

### For Boolean
\`\`\`sql
-- Use TINYINT(1)
is_active TINYINT(1) DEFAULT 1  -- 1 = true, 0 = false
is_deleted TINYINT(1) DEFAULT 0
\`\`\`

---

## Common Mistakes

### ❌ Wrong: Using VARCHAR for Everything
\`\`\`sql
-- Bad
age VARCHAR(10)  -- Should be TINYINT
price VARCHAR(20)  -- Should be DECIMAL
\`\`\`

### ✅ Correct: Using Appropriate Types
\`\`\`sql
-- Good
age TINYINT UNSIGNED
price DECIMAL(10, 2)
\`\`\`

### ❌ Wrong: Using TEXT for Short Strings
\`\`\`sql
-- Bad (wastes space)
name TEXT  -- Should be VARCHAR
\`\`\`

### ✅ Correct: Using VARCHAR for Short Strings
\`\`\`sql
-- Good
name VARCHAR(100)
\`\`\`

---

## Summary

**Numeric Types:**
- **INT** - Most common for IDs and counts
- **DECIMAL** - For money and exact decimals
- **FLOAT/DOUBLE** - For approximate numbers

**String Types:**
- **VARCHAR** - Variable-length strings (most common)
- **CHAR** - Fixed-length strings
- **TEXT** - Long text content

**Date/Time Types:**
- **DATE** - Date only
- **DATETIME** - Date and time
- **TIMESTAMP** - Auto-updating date/time

**Special Types:**
- **JSON** - Structured data (MySQL 5.7+)
- **BLOB** - Binary data

Choose the right type for better performance and data integrity!

---

## Practice Question

**Q:** Design a table for an e-commerce product with the following fields:
- Product ID (auto-increment)
- Product name
- SKU (unique code, always 10 characters)
- Price (with 2 decimal places)
- Stock quantity
- Description (can be long)
- Created date/time (auto-set)
- Updated date/time (auto-update)
- Active status (true/false)

**Answer:**
\`\`\`sql
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku CHAR(10) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1
);
\`\`\`
---

## Real-World Applications

### E-Commerce Product Catalog
E-commerce platforms carefully select data types for product information. Prices use DECIMAL for precise currency values, product names use VARCHAR with appropriate lengths, descriptions use TEXT for longer content, and specifications use JSON for flexible attribute storage.

**Implementation Example:**
- Product prices: DECIMAL(10,2) for currency precision
- Product names: VARCHAR(200) for variable-length names
- Descriptions: TEXT for long product descriptions
- Specifications: JSON for flexible product attributes
- Stock quantities: INT UNSIGNED for non-negative integers

### Financial Transaction Systems
Banking applications require precise numeric types for financial calculations. Account balances use DECIMAL for exact precision, transaction amounts use DECIMAL, timestamps use TIMESTAMP for automatic tracking, and account numbers use appropriate integer or string types.

**Implementation Example:**
- Account balances: DECIMAL(15,2) for precise currency
- Transaction amounts: DECIMAL(10,2) for transaction values
- Transaction dates: TIMESTAMP for automatic date tracking
- Account numbers: VARCHAR(20) or BIGINT depending on format
- Interest rates: DECIMAL(5,4) for precise percentage values

### User Management Systems
User management requires appropriate types for personal information. Names use VARCHAR, emails use VARCHAR with length constraints, birth dates use DATE, registration timestamps use TIMESTAMP, and user preferences use JSON for flexible data.

**Implementation Example:**
- User names: VARCHAR(100) for variable-length names
- Email addresses: VARCHAR(255) for standard email length
- Birth dates: DATE for date-only values
- Registration time: TIMESTAMP for automatic timestamp
- User preferences: JSON for flexible preference storage

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Wrong Numeric Type
**Problem:** Using INT for currency or DECIMAL for counts causes precision issues.

**Solution:** Use DECIMAL for currency, INT for counts:

\`\`\`sql
-- GOOD - DECIMAL for currency
CREATE TABLE products (
    price DECIMAL(10, 2)  -- Precise currency
);

-- BAD - INT for currency
CREATE TABLE products (
    price INT  -- Loses decimal precision!
);
\`\`\`

### Mistake 2: Oversizing VARCHAR
**Problem:** Using unnecessarily large VARCHAR sizes wastes storage and impacts performance.

**Solution:** Choose appropriate VARCHAR length:

\`\`\`sql
-- GOOD - Appropriate size
CREATE TABLE users (
    email VARCHAR(255),  -- Standard email length
    name VARCHAR(100)    -- Reasonable name length
);

-- BAD - Oversized
CREATE TABLE users (
    email VARCHAR(1000),  -- Wasteful
    name VARCHAR(500)     -- Unnecessary
);
\`\`\`

### Mistake 3: Using CHAR Instead of VARCHAR
**Problem:** Using CHAR for variable-length data wastes storage space.

**Solution:** Use VARCHAR for variable-length, CHAR only for fixed-length:

\`\`\`sql
-- GOOD - VARCHAR for variable
CREATE TABLE users (
    name VARCHAR(100)  -- Variable length
);

-- BAD - CHAR for variable
CREATE TABLE users (
    name CHAR(100)  -- Wastes space for shorter names
);
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a data type and why does it matter?

A data type defines the kind of data that can be stored in a column, including the value range, storage requirements, and operations that can be performed. It matters because correct data types ensure data integrity, optimize storage, improve performance, and enable proper validation. Wrong data types can lead to data loss, wasted storage, and performance issues.

### What's the difference between INT and DECIMAL?

INT stores whole numbers (integers) with fixed storage (4 bytes), while DECIMAL stores exact decimal numbers with specified precision and scale. Use INT for counts and IDs, DECIMAL for currency and precise calculations. DECIMAL is slower but provides exact precision, while INT is faster but only handles whole numbers.

### When should I use VARCHAR vs CHAR?

Use VARCHAR for variable-length strings (names, addresses, descriptions) as it only uses storage for actual data. Use CHAR for fixed-length strings (country codes, status codes) where the length is always the same. VARCHAR is more flexible but slightly slower, CHAR is faster for fixed-length data.

### What's the difference between DATETIME and TIMESTAMP?

DATETIME stores date and time without timezone, has a range from 1000-01-01 to 9999-12-31, and uses 8 bytes. TIMESTAMP stores date and time with timezone conversion, has a range from 1970-01-01 to 2038-01-19, uses 4 bytes, and automatically updates. Use DATETIME for application-controlled dates, TIMESTAMP for automatic tracking.

### Can I store JSON data in MySQL?

Yes, MySQL 5.7+ supports native JSON data type that stores JSON documents and provides JSON functions for querying and manipulation. JSON type is useful for flexible schemas, storing configuration data, and handling semi-structured data. Use JSON when you need schema flexibility within a column.

### What is the difference between TEXT and VARCHAR?

TEXT is for large text data (up to 65,535 bytes) and cannot have a default value or be used in indexes (except prefix indexes). VARCHAR is for smaller text (up to 65,535 characters) and can have defaults and full indexes. Use VARCHAR for shorter text, TEXT for longer content like descriptions or articles.

### How do I choose the right integer type?

Choose based on the value range you need: TINYINT for small numbers (-128 to 127), SMALLINT for medium (-32K to 32K), INT for most cases (-2B to 2B), BIGINT for very large numbers. Use UNSIGNED when you only need positive numbers to double the positive range. Most commonly, use INT for IDs and counts.

### What happens if I store data larger than the column type allows?

MySQL will truncate the data (for strings) or cause an error (for numeric overflow). String data exceeding VARCHAR/TEXT length is truncated with a warning. Numeric data exceeding the type range causes an error. Always choose appropriate sizes to prevent data loss.

### Should I use FLOAT or DECIMAL for currency?

Always use DECIMAL for currency. FLOAT and DOUBLE are approximate types that can have rounding errors, which is unacceptable for financial data. DECIMAL provides exact precision, ensuring currency calculations are accurate. Use DECIMAL(10,2) or DECIMAL(15,2) for currency values.

### Can I change a column's data type after creating the table?

Yes, you can change a column's data type using ALTER TABLE, but you must ensure existing data is compatible with the new type. Changing types can be slow for large tables and may cause data loss if the new type cannot accommodate existing values. Always backup data before changing types.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these data type fundamentals:

- **Data types determine storage** requirements and value ranges
- **DECIMAL is essential for currency** to maintain precision
- **VARCHAR is for variable-length** strings, CHAR for fixed-length
- **INT is most common** for IDs and counts
- **TIMESTAMP provides automatic** date/time tracking
- **JSON enables flexible** schema within columns (MySQL 5.7+)
- **Choose appropriate sizes** to optimize storage and performance
- **Consider value ranges** when selecting numeric types
- **TEXT is for large content**, VARCHAR for shorter text

---

## What's Next?

Now that you understand MySQL data types, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Constraints](/mysql/mysql-constraints)**: Combine data types with constraints
2. **[MySQL Create Database](/mysql/mysql-create-database)**: Create tables with proper types
3. **[MySQL Insert Update Delete](/mysql/mysql-insert-update-delete)**: Work with different data types
4. **[MySQL Select](/mysql/mysql-select)**: Query data of various types

### Advanced Topics

- **Type Conversion**: Learn implicit and explicit type conversion
- **Storage Optimization**: Optimize storage with appropriate types
- **JSON Functions**: Master JSON data type operations
- **Performance Tuning**: Understand type impact on performance

### Related Tutorials

- **[MySQL Introduction](/mysql/mysql-introduction)**: Review database fundamentals
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Work with data types in Java
- **[Spring Boot JPA](/springboot/spring-boot-jpa)**: See how JPA maps Java types to MySQL types
- **[Java Data Types](/tutorial/java-data-types)**: Understand Java type system

Data types are fundamental to database design. Continue learning about [MySQL Constraints](/mysql/mysql-constraints) to combine types with data integrity rules.

---

## 10 Important MySQL Data Types Interview Questions

### 1. Why do data types matter in schema design?

**Answer:** Data types **bound** storage size, **permitted values**, **comparison semantics**, and how **indexes** behave. Choosing a type that is too small risks **overflow**; too large wastes **memory** and **I/O** and can hurt **buffer pool** efficiency. Types also affect **JOIN** performance and **sort** order (e.g. string vs numeric). A good interview answer ties types to **constraints** and **query patterns**, not only to “saving disk.”

### 2. When do you choose INT vs BIGINT?

**Answer:** **INT** (signed ~±2.1 billion) is enough for many **surrogate keys** with \`AUTO_INCREMENT\`. **BIGINT** is used when you need a **much larger** range (high-volume IDs, **snowflake**-style IDs, or avoiding overflow in analytics). **BIGINT** doubles key width compared to **INT**, which increases **index** and **row** size—use it when you truly need the range.

### 3. Compare CHAR and VARCHAR.

**Answer:** **CHAR(n)** stores **fixed** width: shorter values are **padded** with spaces (for the CHAR type). **VARCHAR(n)** stores **variable** length up to **n** characters (subject to row format limits). Use **CHAR** for fixed-length codes (e.g. country codes if truly fixed). Use **VARCHAR** for names, emails, and descriptions—**always** pick a **realistic** maximum to avoid bloat and bad data.

### 4. Why use DECIMAL for money?

**Answer:** **DECIMAL(p,s)** is **fixed-point** decimal arithmetic—exact for money at the scale you define. **FLOAT** and **DOUBLE** are **binary floating** types and cannot represent all decimal fractions exactly, which causes **rounding** bugs in financial totals. State **DECIMAL(19,4)** or similar for **ledger**-grade systems if needed. Mention **application** rounding rules and **currency** as a separate concern.

### 5. Explain DATE, DATETIME, and TIMESTAMP.

**Answer:** **DATE** stores a **calendar date** without time-of-day. **DATETIME** stores **date and time** with a range from **1000-01-01** to **9999-12-31**; it does **not** carry timezone information in the type itself. **TIMESTAMP** stores **UTC** internally and converts to the **session** \`time_zone\` for display; range is limited (roughly **1970–2038** on older systems). **TIMESTAMP** is common for **created_at** if you rely on **session** TZ; **DATETIME** is simpler when you store “wall clock” as agreed in the app.

### 6. What is ENUM and when is it a bad fit?

**Answer:** **ENUM** restricts a column to a **small fixed set** of string labels stored as integers internally. **Pros:** compact storage and **DB-enforced** allowed values. **Cons:** changing the list requires **ALTER**; ordering is tied to enum definition; portability to other DBs is weaker than a **lookup table**. Many teams prefer a **reference table** + **FK** for evolving domain values.

### 7. What does NULL mean in SQL?

**Answer:** **NULL** means **unknown** or **missing**—not the same as **zero**, **false**, or **empty string**. **Aggregates** and **predicates** treat NULL specially: e.g. \`COUNT(*)\` counts rows, **COUNT(col)** skips NULLs in that column; **WHERE col = NULL** is wrong—use **IS NULL**. **Three-valued logic** (TRUE/FALSE/UNKNOWN) is a frequent interview follow-up.

### 8. Compare BLOB and TEXT.

**Answer:** **BLOB** stores **binary** data (images, PDFs); **TEXT** is for **character** large objects with a **character set**. Both can make **rows very large**, hurting **buffer pool** and **backup** times. Often better to store **files** in **object storage** and keep only **metadata** and **URLs** in MySQL. If you must store large objects, understand **max_allowed_packet** and **InnoDB** row limits.

### 9. What is the BOOLEAN type in MySQL?

**Answer:** **BOOLEAN** is a synonym for **TINYINT(1)**. Values are typically **0** and **1**. There is no separate boolean engine type; **ORMs** map booleans to this. Be explicit in **migrations** and **APIs** so consumers know the convention.

### 10. What is a practical rule of thumb for choosing types?

**Answer:** Use the **smallest** type that fits the **domain**; use **DECIMAL** for money; use **utf8mb4** (with **utf8mb4_unicode_ci** or similar) for **Unicode** text; avoid oversized **VARCHAR**; prefer **INT/BIGINT** for keys; document **timezone** and **NULL** policies. Mentioning **index** width and **JOIN** cardinality links data types to **performance**—that is senior-level framing.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **DDL & table design** | [MySQL DDL](/mysql/mysql-ddl) |
| **Create tables** | [Creating Databases and Tables](/mysql/mysql-create-database) |
| **Constraints** | [MySQL Constraints](/mysql/mysql-constraints) |
| **Indexes & types** | [MySQL Indexes](/mysql/mysql-indexes) |
| **JDBC types** | [JDBC Introduction](/tutorial/jdbc-introduction) |

---

## Test Your Knowledge

Ready to test your MySQL data types knowledge? Take our comprehensive [MySQL MCQ Exam](/mysql-mcq) with 20 randomly selected questions covering data types, DDL, DML, and all MySQL topics!
  `,
  code: `-- MySQL Data Types Examples

-- Create database
CREATE DATABASE data_types_demo;
USE data_types_demo;

-- Example 1: Numeric Types
CREATE TABLE numeric_examples (
    -- Integer types
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    age TINYINT UNSIGNED,
    user_count INT UNSIGNED DEFAULT 0,
    total_views BIGINT UNSIGNED DEFAULT 0,
    status_code TINYINT(1) DEFAULT 1,  -- Boolean-like
    
    -- Decimal types
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(8, 3),
    discount DECIMAL(5, 2) DEFAULT 0.00,
    
    -- Float types
    temperature FLOAT,
    distance DOUBLE
);

-- Example 2: String Types
CREATE TABLE string_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- VARCHAR (variable length)
    name VARCHAR(100),
    email VARCHAR(255),
    address VARCHAR(500),
    
    -- CHAR (fixed length)
    country_code CHAR(2),  -- 'US', 'IN', 'UK'
    status CHAR(1),  -- 'A', 'I', 'D'
    
    -- TEXT types
    short_description TINYTEXT,
    description TEXT,
    long_content MEDIUMTEXT,
    very_long_content LONGTEXT
);

-- Example 3: Date/Time Types
CREATE TABLE datetime_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- DATE
    birth_date DATE,
    order_date DATE,
    
    -- TIME
    meeting_time TIME,
    
    -- DATETIME
    created_at DATETIME,
    event_datetime DATETIME,
    
    -- TIMESTAMP (auto-updating)
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- YEAR
    graduation_year YEAR
);

-- Example 4: JSON Type (MySQL 5.7+)
CREATE TABLE json_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    
    -- JSON data
    preferences JSON,
    metadata JSON,
    settings JSON
);

-- Insert examples
INSERT INTO numeric_examples (age, price, weight, temperature) VALUES
(25, 99.99, 1.500, 23.5),
(30, 149.50, 2.250, 25.8);

INSERT INTO string_examples (name, email, country_code, status, description) VALUES
('Dattu p', ' Dattu@example.com', 'US', 'A', 'This is a description'),
('Jane Smith', 'jane@example.com', 'UK', 'I', 'Another description');

INSERT INTO datetime_examples (birth_date, order_date, created_at) VALUES
('1990-01-15', '2024-01-20', '2024-01-20 10:30:00'),
('1985-05-22', '2024-01-21', '2024-01-21 14:45:00');

INSERT INTO json_examples (name, preferences, metadata) VALUES
(' Dattu', '{"theme": "dark", "language": "en"}', '{"version": 1, "features": ["feature1", "feature2"]}'),
('Jane', '{"theme": "light", "language": "fr"}', '{"version": 2, "features": ["feature1"]}');

-- Query examples
SELECT * FROM numeric_examples;
SELECT * FROM string_examples;
SELECT * FROM datetime_examples;

-- Query JSON
SELECT name, preferences->'$.theme' AS theme FROM json_examples;
SELECT name, JSON_EXTRACT(metadata, '$.version') AS version FROM json_examples;

-- Complete E-Commerce Example
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id SMALLINT UNSIGNED,
    name VARCHAR(200) NOT NULL,
    sku CHAR(20) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED DEFAULT 0,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    specifications JSON
);

INSERT INTO products (category_id, name, sku, price, stock_quantity, description, specifications) VALUES
(1, 'Laptop', 'LAP-001', 999.99, 50, 'High-performance laptop', '{"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}'),
(1, 'Mouse', 'MOU-001', 29.99, 100, 'Wireless mouse', '{"connectivity": "Bluetooth", "battery": "Rechargeable"}');

SELECT * FROM products;
`
};

export default mysqlDataTypes;


