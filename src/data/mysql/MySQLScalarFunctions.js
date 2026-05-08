const mysqlScalarFunctions = {
  id: 'mysql-scalar-functions',
  title: 'MySQL Scalar Functions - String, Date, Math',
  description: 'Complete guide to MySQL scalar functions: string manipulation, date/time functions, mathematical functions',
  content: `
# MySQL Scalar Functions - String, Date, Math Functions

MySQL scalar functions operate on individual values and return a single result value. These functions enable data transformation, formatting, calculation, and manipulation within SQL queries without requiring application-level processing. Scalar functions are essential for data presentation, calculation, and transformation in database queries, reducing the need for post-processing in application code.

Enterprise applications extensively use scalar functions for data formatting, calculation, transformation, and presentation. String functions format text data, date functions handle temporal calculations, mathematical functions perform calculations, and conversion functions transform data types. Understanding scalar functions enables building more efficient, database-centric applications.

**Scalar Function Categories:**
- **String Functions**: Text manipulation (CONCAT, SUBSTRING, UPPER, LOWER, etc.)
- **Date/Time Functions**: Temporal operations (DATE, TIME, NOW, DATEDIFF, etc.)
- **Mathematical Functions**: Calculations (ROUND, FLOOR, CEIL, ABS, etc.)
- **Conversion Functions**: Type conversion (CAST, CONVERT)
- **Control Flow Functions**: Conditional logic (IF, CASE, COALESCE)

---

## Categories of Scalar Functions

1. **String Functions** - Text manipulation
2. **Date/Time Functions** - Date and time operations
3. **Mathematical Functions** - Calculations
4. **Conversion Functions** - Type conversion
5. **Control Flow Functions** - Conditional logic

---

## 1. String Functions

### CONCAT() - Concatenate Strings

\`\`\`sql
-- Combine strings
SELECT CONCAT('Hello', ' ', 'World');  -- 'Hello World'

-- Concatenate columns
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

-- With NULL handling
SELECT CONCAT(name, ' - ', COALESCE(description, 'No description')) FROM products;
\`\`\`

### SUBSTRING() / SUBSTR() - Extract Substring

\`\`\`sql
-- Extract substring
SELECT SUBSTRING('Hello World', 1, 5);  -- 'Hello'

-- Extract from position
SELECT SUBSTRING('Hello World', 7);  -- 'World'

-- Extract domain from email
SELECT SUBSTRING_INDEX(email, '@', -1) AS domain FROM users;
\`\`\`

### UPPER() / LOWER() - Case Conversion

\`\`\`sql
-- Convert to uppercase
SELECT UPPER('hello');  -- 'HELLO'

-- Convert to lowercase
SELECT LOWER('HELLO');  -- 'hello'

-- Use in queries
SELECT UPPER(name) AS name_upper FROM products;
\`\`\`

### LENGTH() / CHAR_LENGTH() - String Length

\`\`\`sql
-- Get string length
SELECT LENGTH('Hello');  -- 5
SELECT CHAR_LENGTH('Hello');  -- 5

-- Find products with long names
SELECT name FROM products WHERE CHAR_LENGTH(name) > 50;
\`\`\`

### TRIM() - Remove Whitespace

\`\`\`sql
-- Remove leading and trailing spaces
SELECT TRIM('  Hello  ');  -- 'Hello'

-- Remove leading spaces
SELECT LTRIM('  Hello');  -- 'Hello'

-- Remove trailing spaces
SELECT RTRIM('Hello  ');  -- 'Hello'
\`\`\`

### REPLACE() - Replace Substring

\`\`\`sql
-- Replace text
SELECT REPLACE('Hello World', 'World', 'MySQL');  -- 'Hello MySQL'

-- Clean data
UPDATE products SET name = REPLACE(name, '  ', ' ');  -- Remove double spaces
\`\`\`

### LEFT() / RIGHT() - Extract from Sides

\`\`\`sql
-- Get left characters
SELECT LEFT('Hello World', 5);  -- 'Hello'

-- Get right characters
SELECT RIGHT('Hello World', 5);  -- 'World'

-- Extract first 3 characters of SKU
SELECT LEFT(sku, 3) AS prefix FROM products;
\`\`\`

### LOCATE() / POSITION() - Find Position

\`\`\`sql
-- Find position of substring
SELECT LOCATE('World', 'Hello World');  -- 7
SELECT POSITION('World' IN 'Hello World');  -- 7

-- Find @ in email
SELECT email, LOCATE('@', email) AS at_position FROM users;
\`\`\`

### LPAD() / RPAD() - Pad Strings

\`\`\`sql
-- Pad left
SELECT LPAD('5', 3, '0');  -- '005'

-- Pad right
SELECT RPAD('Hello', 10, '*');  -- 'Hello*****'

-- Format product codes
SELECT LPAD(id, 6, '0') AS product_code FROM products;
\`\`\`

---

## 2. Date and Time Functions

### NOW() / CURRENT_TIMESTAMP - Current Date/Time

\`\`\`sql
-- Current date and time
SELECT NOW();  -- '2024-01-20 10:30:45'
SELECT CURRENT_TIMESTAMP;  -- Same as NOW()

-- Current date only
SELECT CURDATE();  -- '2024-01-20'
SELECT CURRENT_DATE;  -- Same

-- Current time only
SELECT CURTIME();  -- '10:30:45'
SELECT CURRENT_TIME;  -- Same
\`\`\`

### DATE_FORMAT() - Format Dates

\`\`\`sql
-- Format date
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d');  -- '2024-01-20'
SELECT DATE_FORMAT(NOW(), '%d/%m/%Y');  -- '20/01/2024'
SELECT DATE_FORMAT(NOW(), '%W, %M %d, %Y');  -- 'Saturday, January 20, 2024'

-- Common formats
SELECT DATE_FORMAT(order_date, '%Y-%m') AS month FROM orders;
SELECT DATE_FORMAT(created_at, '%H:%i:%s') AS time FROM users;
\`\`\`

**Format Specifiers:**
- \`%Y\` - 4-digit year
- \`%y\` - 2-digit year
- \`%m\` - Month (01-12)
- \`%d\` - Day (01-31)
- \`%H\` - Hour (00-23)
- \`%i\` - Minutes (00-59)
- \`%s\` - Seconds (00-59)
- \`%W\` - Weekday name
- \`%M\` - Month name

### DATE_ADD() / DATE_SUB() - Add/Subtract Dates

\`\`\`sql
-- Add days
SELECT DATE_ADD('2024-01-20', INTERVAL 7 DAY);  -- '2024-01-27'

-- Add months
SELECT DATE_ADD('2024-01-20', INTERVAL 1 MONTH);  -- '2024-02-20'

-- Subtract days
SELECT DATE_SUB('2024-01-20', INTERVAL 7 DAY);  -- '2024-01-13'

-- Orders from last 30 days
SELECT * FROM orders 
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY);
\`\`\`

### DATEDIFF() - Difference Between Dates

\`\`\`sql
-- Days between dates
SELECT DATEDIFF('2024-01-27', '2024-01-20');  -- 7

-- Age calculation
SELECT name, DATEDIFF(CURRENT_DATE, birth_date) / 365 AS age FROM users;

-- Days since order
SELECT order_id, DATEDIFF(CURRENT_DATE, order_date) AS days_ago FROM orders;
\`\`\`

### EXTRACT() - Extract Date Parts

\`\`\`sql
-- Extract year
SELECT EXTRACT(YEAR FROM '2024-01-20');  -- 2024

-- Extract month
SELECT EXTRACT(MONTH FROM '2024-01-20');  -- 1

-- Extract day
SELECT EXTRACT(DAY FROM '2024-01-20');  -- 20

-- Use in queries
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024;
\`\`\`

### YEAR(), MONTH(), DAY() - Quick Extractors

\`\`\`sql
-- Extract components
SELECT YEAR('2024-01-20');  -- 2024
SELECT MONTH('2024-01-20');  -- 1
SELECT DAY('2024-01-20');  -- 20
SELECT DAYNAME('2024-01-20');  -- 'Saturday'
SELECT MONTHNAME('2024-01-20');  -- 'January'
\`\`\`

---

## 3. Mathematical Functions

### ROUND() - Round Numbers

\`\`\`sql
-- Round to nearest integer
SELECT ROUND(3.7);  -- 4
SELECT ROUND(3.2);  -- 3

-- Round to decimal places
SELECT ROUND(3.14159, 2);  -- 3.14
SELECT ROUND(price, 2) FROM products;
\`\`\`

### CEIL() / CEILING() - Round Up

\`\`\`sql
-- Round up
SELECT CEIL(3.2);  -- 4
SELECT CEILING(3.2);  -- 4
\`\`\`

### FLOOR() - Round Down

\`\`\`sql
-- Round down
SELECT FLOOR(3.7);  -- 3
\`\`\`

### ABS() - Absolute Value

\`\`\`sql
-- Absolute value
SELECT ABS(-5);  -- 5
SELECT ABS(5);  -- 5
\`\`\`

### POWER() / POW() - Exponentiation

\`\`\`sql
-- Power
SELECT POWER(2, 3);  -- 8
SELECT POW(2, 3);  -- 8
\`\`\`

### SQRT() - Square Root

\`\`\`sql
-- Square root
SELECT SQRT(16);  -- 4
\`\`\`

### MOD() - Modulo

\`\`\`sql
-- Remainder
SELECT MOD(10, 3);  -- 1
SELECT 10 % 3;  -- 1 (alternative syntax)
\`\`\`

---

## 4. Conversion Functions

### CAST() - Type Conversion

\`\`\`sql
-- Convert to different types
SELECT CAST('123' AS UNSIGNED);  -- 123
SELECT CAST(123 AS CHAR);  -- '123'
SELECT CAST('2024-01-20' AS DATE);  -- '2024-01-20'
\`\`\`

### CONVERT() - Alternative Conversion

\`\`\`sql
-- Convert types
SELECT CONVERT('123', UNSIGNED);  -- 123
SELECT CONVERT(123, CHAR);  -- '123'
\`\`\`

---

## 5. Control Flow Functions

### IF() - Simple Conditional

\`\`\`sql
-- IF(condition, true_value, false_value)
SELECT IF(price > 100, 'Expensive', 'Affordable') AS price_category FROM products;

-- Check stock status
SELECT name, IF(stock > 0, 'In Stock', 'Out of Stock') AS status FROM products;
\`\`\`

### CASE - Multiple Conditions

\`\`\`sql
-- Simple CASE
SELECT 
    name,
    CASE category
        WHEN 'Electronics' THEN 'Tech'
        WHEN 'Furniture' THEN 'Home'
        ELSE 'Other'
    END AS category_type
FROM products;

-- Searched CASE
SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Premium'
        WHEN price > 100 THEN 'Standard'
        ELSE 'Budget'
    END AS price_tier
FROM products;
\`\`\`

### COALESCE() - Return First Non-NULL

\`\`\`sql
-- Return first non-NULL value
SELECT COALESCE(NULL, NULL, 'Default');  -- 'Default'

-- Use default if NULL
SELECT name, COALESCE(description, 'No description') FROM products;
SELECT name, COALESCE(phone, email, 'No contact') FROM users;
\`\`\`

### IFNULL() - Replace NULL

\`\`\`sql
-- Replace NULL with value
SELECT IFNULL(description, 'No description') FROM products;
SELECT IFNULL(phone, 'N/A') FROM users;
\`\`\`

### NULLIF() - Return NULL if Equal

\`\`\`sql
-- Return NULL if values are equal
SELECT NULLIF(price, 0);  -- NULL if price is 0, else price
\`\`\`

---

## Real-World Examples

### Example 1: Format Customer Names

\`\`\`sql
-- Format full name
SELECT 
    CONCAT(UPPER(LEFT(first_name, 1)), LOWER(SUBSTRING(first_name, 2)), 
           ' ', 
           UPPER(LEFT(last_name, 1)), LOWER(SUBSTRING(last_name, 2))) AS formatted_name
FROM users;
\`\`\`

### Example 2: Extract Email Domain

\`\`\`sql
-- Get email domain
SELECT 
    email,
    SUBSTRING_INDEX(email, '@', -1) AS domain
FROM users;

-- Count users by email domain
SELECT 
    SUBSTRING_INDEX(email, '@', -1) AS domain,
    COUNT(*) AS user_count
FROM users
GROUP BY domain;
\`\`\`

### Example 3: Calculate Age

\`\`\`sql
-- Calculate age from birth date
SELECT 
    name,
    birth_date,
    FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365) AS age
FROM users;
\`\`\`

### Example 4: Format Prices

\`\`\`sql
-- Format price with currency
SELECT 
    name,
    CONCAT('$', FORMAT(price, 2)) AS formatted_price
FROM products;
\`\`\`

### Example 5: Date Range Queries

\`\`\`sql
-- Orders in current month
SELECT * FROM orders 
WHERE YEAR(order_date) = YEAR(CURRENT_DATE)
AND MONTH(order_date) = MONTH(CURRENT_DATE);

-- Orders in last 7 days
SELECT * FROM orders 
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY);
\`\`\`

---

## Summary

**String Functions:**
- CONCAT, SUBSTRING, UPPER, LOWER, LENGTH, TRIM, REPLACE, LEFT, RIGHT

**Date/Time Functions:**
- NOW, DATE_FORMAT, DATE_ADD, DATE_SUB, DATEDIFF, EXTRACT, YEAR, MONTH, DAY

**Mathematical Functions:**
- ROUND, CEIL, FLOOR, ABS, POWER, SQRT, MOD

**Conversion Functions:**
- CAST, CONVERT

**Control Flow:**
- IF, CASE, COALESCE, IFNULL, NULLIF

Master these functions, and you can manipulate any data!

---

## Practice Question

**Q:** Write a query to format product information showing:
- Product name in title case
- Price formatted as currency ($XX.XX)
- Stock status (In Stock/Out of Stock)
- Days since created (if created in last 30 days, show "New")

**Answer:**
\`\`\`sql
SELECT 
    CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS formatted_name,
    CONCAT('$', FORMAT(price, 2)) AS formatted_price,
    IF(stock > 0, 'In Stock', 'Out of Stock') AS stock_status,
    CASE
        WHEN DATEDIFF(CURRENT_DATE, created_at) <= 30 THEN 'New'
        ELSE CONCAT(DATEDIFF(CURRENT_DATE, created_at), ' days old')
    END AS age
FROM products;
\`\`\`
---

## Real-World Applications

### Data Formatting and Presentation
Applications use scalar functions extensively for formatting data for display. String functions format names and addresses, date functions format timestamps, and mathematical functions format currency and percentages for user interfaces.

**Implementation Example:**
- Format customer names with proper capitalization
- Format prices with currency symbols and decimals
- Format dates for different locales
- Format phone numbers and addresses

### Data Transformation
ETL processes and data migration use scalar functions to transform data during import and export. Functions convert data types, clean data, and standardize formats for consistency across systems.

**Implementation Example:**
- Convert string dates to DATE type
- Clean and normalize text data
- Transform data formats for compatibility
- Standardize data values

### Business Calculations
Business applications use mathematical and date functions for calculations. Financial calculations, age calculations, duration calculations, and statistical computations are performed using scalar functions.

**Implementation Example:**
- Calculate ages from birth dates
- Calculate order totals with tax
- Calculate time differences for reporting
- Perform statistical calculations

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Functions in WHERE Without Indexes
**Problem:** Functions in WHERE clauses prevent index usage.

**Solution:** Avoid functions in WHERE when possible, or create function-based indexes:

\`\`\`sql
-- SLOW - Function prevents index usage
SELECT * FROM users WHERE UPPER(email) = 'USER@EXAMPLE.COM';

-- FASTER - Store normalized data or use index-friendly approach
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

### Mistake 2: Not Handling NULL in Functions
**Problem:** Functions with NULL inputs can return NULL unexpectedly.

**Solution:** Use COALESCE or IFNULL to handle NULL:

\`\`\`sql
-- GOOD - Handles NULL
SELECT COALESCE(description, 'No description') FROM products;

-- BAD - Returns NULL if description is NULL
SELECT CONCAT('Product: ', description) FROM products;
\`\`\`

### Mistake 3: Overusing Functions in SELECT
**Problem:** Too many function calls in SELECT can slow queries.

**Solution:** Balance function usage - use for necessary transformations, avoid for simple operations:

\`\`\`sql
-- PREFER - Application-level formatting when possible
-- Use functions for necessary database-level transformations
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What are scalar functions and how do they work?

Scalar functions operate on a single input value and return a single result value. They transform, format, calculate, or manipulate data within SQL queries. Functions can be used in SELECT clauses, WHERE conditions, and expressions. Examples include UPPER() for text conversion, ROUND() for number formatting, and DATE() for date extraction.

### What's the difference between scalar and aggregate functions?

Scalar functions operate on a single value and return a single value for each row. Aggregate functions operate on multiple rows and return a single summary value. Use scalar functions for row-level transformations, aggregate functions for group-level calculations. Learn about [MySQL Aggregate Functions](/mysql/mysql-aggregate-functions) for aggregation.

### Can I nest functions in MySQL?

Yes, you can nest functions (use function results as inputs to other functions):

\`\`\`sql
SELECT UPPER(SUBSTRING(name, 1, 5)) FROM products;
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') FROM dual;
\`\`\`

Nesting enables complex transformations but can impact readability.

### How do string functions handle NULL values?

Most string functions return NULL if any input is NULL. Use COALESCE or IFNULL to handle NULL:

\`\`\`sql
SELECT CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, '')) FROM users;
\`\`\`

Always consider NULL handling when using string functions.

### What date functions are most commonly used?

Common date functions include: NOW()/CURRENT_TIMESTAMP (current date/time), DATE() (extract date), TIME() (extract time), DATEDIFF() (date difference), DATE_ADD()/DATE_SUB() (date arithmetic), and DATE_FORMAT() (format dates). These enable temporal calculations and formatting.

### Can I use functions in WHERE clauses?

Yes, but be careful - functions in WHERE clauses can prevent index usage, slowing queries:

\`\`\`sql
-- Can use, but may be slow
SELECT * FROM products WHERE YEAR(created_at) = 2024;

-- Better - Index-friendly
SELECT * FROM products WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
\`\`\`

### What is the difference between CAST and CONVERT?

CAST and CONVERT both convert data types, but CONVERT allows specifying character set for string conversion. Both are functionally similar for most conversions. Use CAST for standard conversions, CONVERT when character set specification is needed.

### How do I handle NULL values with functions?

Use COALESCE (returns first non-NULL value) or IFNULL (MySQL-specific, returns default if NULL):

\`\`\`sql
SELECT COALESCE(description, 'No description') FROM products;
SELECT IFNULL(phone, 'No phone') FROM users;
\`\`\`

These functions provide default values when data is NULL.

### Can I create custom scalar functions?

MySQL supports user-defined functions (UDFs) created in C/C++ and loaded into MySQL, but this is advanced. For most cases, use built-in functions or implement logic in application code. Stored functions (different from UDFs) can be created using CREATE FUNCTION for reusable logic.

### How do functions affect query performance?

Functions can impact performance: (1) functions in WHERE prevent index usage, (2) complex function calculations add CPU overhead, (3) nested functions increase computation time. Use functions judiciously, avoid in WHERE when possible, and consider application-level processing for complex transformations.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these scalar function fundamentals:

- **Scalar functions transform single values** and return single results
- **String functions** manipulate and format text data
- **Date functions** handle temporal calculations and formatting
- **Mathematical functions** perform calculations and rounding
- **Conversion functions** transform data types
- **Control flow functions** enable conditional logic in queries
- **Functions in WHERE** can prevent index usage
- **Handle NULL values** when using functions
- **Use functions judiciously** to balance functionality and performance

---

## What's Next?

Now that you understand scalar functions, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Aggregate Functions](/mysql/mysql-aggregate-functions)**: Learn functions that operate on groups
2. **[MySQL Select](/mysql/mysql-select)**: Use functions in SELECT statements
3. **[MySQL Clauses](/mysql/mysql-clauses)**: Combine functions with WHERE, ORDER BY
4. **[MySQL Data Types](/mysql/mysql-data-types)**: Understand types used with conversion functions

### Advanced Topics

- **Function Optimization**: Master performance tuning with functions
- **Custom Functions**: Create user-defined functions
- **Window Functions**: Advanced analytical functions (MySQL 8.0+)
- **Regular Expressions**: Pattern matching with functions

### Related Tutorials

- **[MySQL Introduction](/mysql/mysql-introduction)**: Review database fundamentals
- **[MySQL Subqueries](/mysql/mysql-subqueries)**: Use functions in subqueries
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Work with function results in Java
- **[Spring Boot JPA](/springboot/spring-boot-jpa)**: See how JPA handles function expressions

Scalar functions are essential for data transformation. Continue learning about [MySQL Aggregate Functions](/mysql/mysql-aggregate-functions) to master group-level calculations.

---

## 10 Important MySQL Scalar Functions Interview Questions

### 1. What is a scalar function vs an aggregate function?

**Answer:** **Scalar** functions evaluate **per row** and return a value for **each** row (e.g. **UPPER(name)**, \`DATE_FORMAT(created_at, ...)\`). **Aggregate** functions combine **many** rows into **one** summary. **Mixing** them incorrectly (e.g. **SUM** without **GROUP BY**) is a common error.

### 2. Compare CONCAT and CONCAT_WS.

**Answer:** **CONCAT** concatenates arguments; if **any** argument is **NULL**, the whole result is **NULL** in MySQL. \`CONCAT_WS\` (**with separator**) skips **NULL** values but still returns **NULL** if all are **NULL**—useful for **building** CSV-like strings from **optional** fields.

### 3. What are SUBSTRING, LEFT, and RIGHT used for?

**Answer:** They **slice** strings: **SUBSTRING(str, pos, len)**, **LEFT(str, n)**, **RIGHT(str, n)**. Common for **prefix** codes, **masking** IDs, and **display** formatting. **Validate** lengths and **character sets** (multi-byte UTF-8).

### 4. What do TRIM, LTRIM, and RTRIM do?

**Answer:** They remove **whitespace** (or specified characters) from **both sides**, **left**, or **right**. Clean **user input** before **store** or **compare**—but **normalize** consistently **application-wide** to avoid **duplicate** records.

### 5. What is DATE_FORMAT for?

**Answer:** \`DATE_FORMAT\` converts **DATE/DATETIME** values to **formatted strings** for **reports** and **exports**. It does **not** fix **timezone** by itself—**session** time zone settings affect **TIMESTAMP** interpretation. **Prefer** keeping **raw** datetimes in SQL and **formatting** in the **app** if you need **locale**-aware display.

### 6. Name common date arithmetic functions.

**Answer:** \`DATE_ADD\` / \`DATE_SUB\` shift dates; **DATEDIFF** returns day difference; **NOW()**, **CURDATE()**, **CURTIME()** return **current** timestamps. **Use** for **SLA** deadlines, **expiry**, **ageing** buckets. **Watch** **DST** and **timezone** when **business** rules span regions.

### 7. Compare COALESCE and IFNULL.

**Answer:** **COALESCE(a,b,c,...)** is **standard SQL** and returns the **first non-NULL** argument. **IFNULL(a,b)** is **MySQL-specific** two-argument sugar. **Prefer** **COALESCE** for **portability** and **multiple** fallbacks.

### 8. What is the difference between ROUND, CEIL, and FLOOR?

**Answer:** **ROUND** rounds to **nearest** (with optional precision); **CEILING**/**FLOOR** move to **next**/**previous** integer. **Billing** and **tax** rules often specify **rounding** mode—**match** the **legal** requirement, not only **SQL defaults**.

### 9. Why avoid wrapping indexed columns in functions in WHERE?

**Answer:** A predicate like **\`WHERE YEAR(created_at) = 2024\`** applies a **function** to the column, often **preventing** **B-Tree** index use (unless **functional** indexes exist). **Prefer** **range** predicates: **\`WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'\`**.

### 10. What scalar skills should a fresher emphasize?

**Answer:** **String** manipulation (**CONCAT**, **substring**), **date** math, **NULL** handling (**COALESCE**), and **safe** casting (**CAST**/**CONVERT**). **Practice** real **reporting** queries—interviews favor **practical** SQL over trivia.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Data types** | [MySQL Data Types](/mysql/mysql-data-types) |
| **SELECT** | [MySQL SELECT](/mysql/mysql-select) |
| **Clauses** | [MySQL Clauses](/mysql/mysql-clauses) |
| **DML** | [MySQL INSERT, UPDATE, DELETE](/mysql/mysql-insert-update-delete) |
| **JDBC types** | [JDBC Introduction](/tutorial/jdbc-introduction) |

---

## Test Your Knowledge

Mastered scalar functions? Test your MySQL skills with our comprehensive [MySQL MCQ Exam](/mysql-mcq) covering string, date, numeric functions, and all MySQL topics!
  `,
  code: `-- MySQL Scalar Functions Examples

CREATE DATABASE functions_demo;
USE functions_demo;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    birth_date DATE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    price DECIMAL(10, 2),
    stock INT UNSIGNED DEFAULT 0,
    category VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (first_name, last_name, email, birth_date, phone) VALUES
(' Dattu', 'doe', ' Dattu@example.com', '1990-01-15', '123-456-7890'),
('JANE', 'SMITH', 'jane@gmail.com', '1985-05-22', NULL),
('bob', ' DattuSON', 'bob@yahoo.com', '1992-08-10', '098-765-4321');

INSERT INTO products (name, price, stock, category, description) VALUES
('Laptop Computer', 999.99, 50, 'Electronics', 'High-performance laptop'),
('Wireless Mouse', 29.99, 0, 'Electronics', NULL),
('Office Desk', 199.99, 30, 'Furniture', 'Large office desk');

-- ========== String Functions ==========

-- CONCAT
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;
SELECT CONCAT('Hello ', name, '!') AS greeting FROM products;

-- SUBSTRING
SELECT SUBSTRING(email, 1, 5) AS email_start FROM users;
SELECT SUBSTRING_INDEX(email, '@', -1) AS domain FROM users;

-- UPPER/LOWER
SELECT UPPER(name) AS name_upper, LOWER(name) AS name_lower FROM products;
SELECT CONCAT(UPPER(LEFT(first_name, 1)), LOWER(SUBSTRING(first_name, 2))) AS formatted FROM users;

-- LENGTH
SELECT name, CHAR_LENGTH(name) AS name_length FROM products;
SELECT * FROM products WHERE CHAR_LENGTH(name) > 10;

-- TRIM
SELECT TRIM('  Hello  ') AS trimmed;
UPDATE products SET name = TRIM(name);

-- REPLACE
SELECT REPLACE(name, ' ', '-') AS slug FROM products;
SELECT REPLACE(email, '@gmail.com', '@company.com') AS new_email FROM users;

-- LEFT/RIGHT
SELECT LEFT(sku, 3) AS prefix FROM products;
SELECT RIGHT(email, 4) AS extension FROM users;

-- LPAD/RPAD
SELECT LPAD(id, 6, '0') AS product_code FROM products;
SELECT RPAD(name, 20, '.') AS padded_name FROM products;

-- ========== Date/Time Functions ==========

-- Current date/time
SELECT NOW() AS current_datetime;
SELECT CURDATE() AS current_date;
SELECT CURTIME() AS current_time;

-- DATE_FORMAT
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') AS date_formatted;
SELECT DATE_FORMAT(NOW(), '%W, %M %d, %Y') AS full_date;
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month FROM products;

-- DATE_ADD/DATE_SUB
SELECT DATE_ADD('2024-01-20', INTERVAL 7 DAY) AS next_week;
SELECT DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) AS last_month;
SELECT * FROM orders WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY);

-- DATEDIFF
SELECT DATEDIFF(CURRENT_DATE, birth_date) / 365 AS age FROM users;
SELECT DATEDIFF(CURRENT_DATE, created_at) AS days_old FROM products;

-- EXTRACT
SELECT EXTRACT(YEAR FROM birth_date) AS birth_year FROM users;
SELECT EXTRACT(MONTH FROM created_at) AS month FROM products;

-- YEAR, MONTH, DAY
SELECT YEAR(birth_date) AS year, MONTH(birth_date) AS month, DAY(birth_date) AS day FROM users;
SELECT DAYNAME(created_at) AS weekday FROM products;

-- ========== Mathematical Functions ==========

-- ROUND
SELECT ROUND(price, 2) AS rounded_price FROM products;
SELECT ROUND(3.14159, 2) AS pi_rounded;

-- CEIL/FLOOR
SELECT CEIL(price) AS price_ceil, FLOOR(price) AS price_floor FROM products;

-- ABS
SELECT ABS(-5) AS absolute;

-- POWER
SELECT POWER(2, 3) AS power_result;

-- SQRT
SELECT SQRT(16) AS square_root;

-- MOD
SELECT MOD(10, 3) AS remainder;

-- ========== Conversion Functions ==========

-- CAST
SELECT CAST('123' AS UNSIGNED) AS converted_int;
SELECT CAST(price AS CHAR) AS price_string FROM products;

-- CONVERT
SELECT CONVERT('123', UNSIGNED) AS converted;

-- ========== Control Flow Functions ==========

-- IF
SELECT name, IF(stock > 0, 'In Stock', 'Out of Stock') AS status FROM products;
SELECT name, IF(price > 100, 'Expensive', 'Affordable') AS price_category FROM products;

-- CASE
SELECT 
    name,
    CASE category
        WHEN 'Electronics' THEN 'Tech'
        WHEN 'Furniture' THEN 'Home'
        ELSE 'Other'
    END AS category_type
FROM products;

SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Premium'
        WHEN price > 100 THEN 'Standard'
        ELSE 'Budget'
    END AS price_tier
FROM products;

-- COALESCE
SELECT name, COALESCE(description, 'No description') FROM products;
SELECT name, COALESCE(phone, email, 'No contact') FROM users;

-- IFNULL
SELECT name, IFNULL(description, 'N/A') FROM products;
SELECT name, IFNULL(phone, 'No phone') FROM users;

-- ========== Real-World Examples ==========

-- Format customer names
SELECT 
    CONCAT(
        UPPER(LEFT(first_name, 1)), 
        LOWER(SUBSTRING(first_name, 2)),
        ' ',
        UPPER(LEFT(last_name, 1)),
        LOWER(SUBSTRING(last_name, 2))
    ) AS formatted_name,
    email
FROM users;

-- Extract email domain
SELECT 
    email,
    SUBSTRING_INDEX(email, '@', -1) AS domain
FROM users;

-- Calculate age
SELECT 
    first_name,
    birth_date,
    FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365) AS age
FROM users;

-- Format prices
SELECT 
    name,
    CONCAT('$', FORMAT(price, 2)) AS formatted_price
FROM products;

-- Product status
SELECT 
    name,
    CONCAT('$', FORMAT(price, 2)) AS price,
    IF(stock > 0, 'In Stock', 'Out of Stock') AS stock_status,
    CASE
        WHEN DATEDIFF(CURRENT_DATE, created_at) <= 30 THEN 'New'
        ELSE CONCAT(DATEDIFF(CURRENT_DATE, created_at), ' days old')
    END AS age
FROM products;
`
};

export default mysqlScalarFunctions;


