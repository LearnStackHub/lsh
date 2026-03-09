// MySQL MCQ Questions Pool (150 questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all MySQL topics: Introduction, DDL, DQL, DML, Joins, Functions, Constraints, Transactions, etc.

export const allQuestions = [
  // ========== MYSQL INTRODUCTION & BASICS (20 questions) ==========
  {
    id: 1,
    question: "What does MySQL stand for?",
    options: ["My Structured Query Language", "My SQL", "MySQL (no acronym)", "Microsoft SQL"],
    correctAnswer: 2,
    explanation: "MySQL is named after co-founder Michael Widenius's daughter, My. The 'SQL' part stands for Structured Query Language, but MySQL itself is not an acronym."
  },
  {
    id: 2,
    question: "What is MySQL?",
    options: ["A programming language", "A relational database management system", "An operating system", "A web server"],
    correctAnswer: 1,
    explanation: "MySQL is an open-source relational database management system (RDBMS) that uses SQL for managing data."
  },
  {
    id: 3,
    question: "Which company originally developed MySQL?",
    options: ["Oracle", "Microsoft", "MySQL AB (now Oracle)", "Google"],
    correctAnswer: 2,
    explanation: "MySQL was originally developed by MySQL AB, which was acquired by Sun Microsystems in 2008, and then by Oracle in 2010."
  },
  {
    id: 4,
    question: "What is the default port for MySQL?",
    options: ["1433", "1521", "3306", "5432"],
    correctAnswer: 2,
    explanation: "MySQL uses port 3306 by default for client connections."
  },
  {
    id: 5,
    question: "Which command is used to connect to MySQL from command line?",
    options: ["mysql -u username -p", "connect mysql", "mysql connect", "sql -u username"],
    correctAnswer: 0,
    explanation: "The command 'mysql -u username -p' is used to connect to MySQL, where -u specifies the username and -p prompts for password."
  },
  {
    id: 6,
    question: "What is a database in MySQL?",
    options: ["A table", "A collection of related tables", "A single row", "A column"],
    correctAnswer: 1,
    explanation: "A database in MySQL is a collection of related tables that store data in an organized manner."
  },
  {
    id: 7,
    question: "Which command shows all databases?",
    options: ["SHOW DATABASES;", "LIST DATABASES;", "DISPLAY DATABASES;", "VIEW DATABASES;"],
    correctAnswer: 0,
    explanation: "SHOW DATABASES; command displays all databases in the MySQL server."
  },
  {
    id: 8,
    question: "Which command is used to select a database?",
    options: ["SELECT DATABASE database_name;", "USE database_name;", "OPEN database_name;", "CONNECT database_name;"],
    correctAnswer: 1,
    explanation: "USE database_name; command selects a database to work with."
  },
  {
    id: 9,
    question: "What is a table in MySQL?",
    options: ["A database", "A collection of rows and columns", "A single record", "A query"],
    correctAnswer: 1,
    explanation: "A table is a collection of rows (records) and columns (fields) that stores data in a structured format."
  },
  {
    id: 10,
    question: "Which command shows all tables in the current database?",
    options: ["SHOW TABLES;", "LIST TABLES;", "DISPLAY TABLES;", "VIEW TABLES;"],
    correctAnswer: 0,
    explanation: "SHOW TABLES; command displays all tables in the currently selected database."
  },
  {
    id: 11,
    question: "What is a row in a MySQL table?",
    options: ["A column", "A single record", "A table", "A database"],
    correctAnswer: 1,
    explanation: "A row (also called a record or tuple) represents a single entry in a table."
  },
  {
    id: 12,
    question: "What is a column in a MySQL table?",
    options: ["A row", "A field that stores a specific type of data", "A table", "A database"],
    correctAnswer: 1,
    explanation: "A column (also called a field or attribute) represents a specific type of data in a table."
  },
  {
    id: 13,
    question: "What is SQL?",
    options: ["A database", "Structured Query Language", "A table", "A programming language"],
    correctAnswer: 1,
    explanation: "SQL (Structured Query Language) is a standard language for managing and manipulating relational databases."
  },
  {
    id: 14,
    question: "Which SQL statement is used to create a database?",
    options: ["CREATE DATABASE", "MAKE DATABASE", "NEW DATABASE", "ADD DATABASE"],
    correctAnswer: 0,
    explanation: "CREATE DATABASE database_name; is used to create a new database."
  },
  {
    id: 15,
    question: "Which SQL statement is used to delete a database?",
    options: ["DELETE DATABASE", "REMOVE DATABASE", "DROP DATABASE", "ERASE DATABASE"],
    correctAnswer: 2,
    explanation: "DROP DATABASE database_name; is used to delete a database and all its contents."
  },
  {
    id: 16,
    question: "What is the purpose of a primary key?",
    options: ["To store large data", "To uniquely identify each row", "To sort data", "To join tables"],
    correctAnswer: 1,
    explanation: "A primary key uniquely identifies each row in a table and cannot contain NULL values."
  },
  {
    id: 17,
    question: "Can a table have multiple primary keys?",
    options: ["Yes, unlimited", "No, only one", "Yes, but only two", "Yes, but only three"],
    correctAnswer: 1,
    explanation: "A table can have only one primary key, but that primary key can consist of multiple columns (composite primary key)."
  },
  {
    id: 18,
    question: "What does NULL mean in MySQL?",
    options: ["Zero", "Empty string", "No value or unknown", "False"],
    correctAnswer: 2,
    explanation: "NULL represents the absence of a value or an unknown value. It is different from zero or an empty string."
  },
  {
    id: 19,
    question: "Which command displays the structure of a table?",
    options: ["SHOW TABLE table_name;", "DESCRIBE table_name;", "VIEW TABLE table_name;", "DISPLAY TABLE table_name;"],
    correctAnswer: 1,
    explanation: "DESCRIBE table_name; or DESC table_name; displays the structure of a table including columns, data types, and constraints."
  },
  {
    id: 20,
    question: "What is the default storage engine in MySQL?",
    options: ["MyISAM", "InnoDB", "MEMORY", "CSV"],
    correctAnswer: 1,
    explanation: "InnoDB is the default storage engine in MySQL 5.5.5 and later. It supports transactions, foreign keys, and row-level locking."
  },

  // ========== DATA TYPES (20 questions) ==========
  {
    id: 21,
    question: "Which data type is used to store whole numbers?",
    options: ["VARCHAR", "INT", "DECIMAL", "TEXT"],
    correctAnswer: 1,
    explanation: "INT is used to store whole numbers (integers) in MySQL."
  },
  {
    id: 22,
    question: "Which data type is used to store decimal numbers?",
    options: ["INT", "VARCHAR", "DECIMAL", "TEXT"],
    correctAnswer: 2,
    explanation: "DECIMAL or FLOAT/DOUBLE are used to store decimal numbers with fractional parts."
  },
  {
    id: 23,
    question: "What is the maximum length of VARCHAR in MySQL?",
    options: ["255 characters", "65,535 characters", "256 characters", "Unlimited"],
    correctAnswer: 1,
    explanation: "VARCHAR can store up to 65,535 characters in MySQL, but the actual limit depends on the character set and row size."
  },
  {
    id: 24,
    question: "What is the difference between CHAR and VARCHAR?",
    options: ["No difference", "CHAR is fixed length, VARCHAR is variable length", "VARCHAR is fixed length, CHAR is variable length", "CHAR stores numbers, VARCHAR stores text"],
    correctAnswer: 1,
    explanation: "CHAR is fixed-length (padded with spaces), while VARCHAR is variable-length (stores only the actual data)."
  },
  {
    id: 25,
    question: "Which data type is used to store date and time?",
    options: ["DATE", "DATETIME", "TIMESTAMP", "All of the above"],
    correctAnswer: 3,
    explanation: "MySQL has DATE (date only), DATETIME (date and time), and TIMESTAMP (date and time with timezone) data types."
  },
  {
    id: 26,
    question: "What is the range of INT data type in MySQL?",
    options: ["-128 to 127", "-32,768 to 32,767", "-2,147,483,648 to 2,147,483,647", "-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807"],
    correctAnswer: 2,
    explanation: "INT (signed) ranges from -2,147,483,648 to 2,147,483,647. UNSIGNED INT ranges from 0 to 4,294,967,295."
  },
  {
    id: 27,
    question: "Which data type is used to store large text?",
    options: ["VARCHAR", "CHAR", "TEXT", "STRING"],
    correctAnswer: 2,
    explanation: "TEXT is used to store large amounts of text data (up to 65,535 characters for TEXT, more for MEDIUMTEXT and LONGTEXT)."
  },
  {
    id: 28,
    question: "What is the difference between FLOAT and DOUBLE?",
    options: ["No difference", "FLOAT is single precision, DOUBLE is double precision", "DOUBLE is single precision, FLOAT is double precision", "FLOAT stores integers, DOUBLE stores decimals"],
    correctAnswer: 1,
    explanation: "FLOAT is single-precision (32-bit), DOUBLE is double-precision (64-bit) floating-point numbers."
  },
  {
    id: 29,
    question: "Which data type stores only TRUE or FALSE?",
    options: ["BOOLEAN", "TINYINT(1)", "Both BOOLEAN and TINYINT(1)", "BIT"],
    correctAnswer: 2,
    explanation: "MySQL uses BOOLEAN as an alias for TINYINT(1), where 0 is FALSE and 1 is TRUE."
  },
  {
    id: 30,
    question: "What is the storage size of TINYINT?",
    options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
    correctAnswer: 0,
    explanation: "TINYINT uses 1 byte and can store values from -128 to 127 (signed) or 0 to 255 (unsigned)."
  },
  {
    id: 31,
    question: "Which data type is used to store binary data?",
    options: ["BLOB", "TEXT", "VARCHAR", "CHAR"],
    correctAnswer: 0,
    explanation: "BLOB (Binary Large Object) is used to store binary data like images, files, etc."
  },
  {
    id: 32,
    question: "What is the difference between DATE and DATETIME?",
    options: ["No difference", "DATE stores date only, DATETIME stores date and time", "DATETIME stores date only, DATE stores date and time", "DATE is for integers, DATETIME is for strings"],
    correctAnswer: 1,
    explanation: "DATE stores only the date (YYYY-MM-DD), while DATETIME stores both date and time (YYYY-MM-DD HH:MM:SS)."
  },
  {
    id: 33,
    question: "What is the storage size of BIGINT?",
    options: ["4 bytes", "8 bytes", "16 bytes", "32 bytes"],
    correctAnswer: 1,
    explanation: "BIGINT uses 8 bytes and can store very large integers."
  },
  {
    id: 34,
    question: "Which data type automatically updates when a row is modified?",
    options: ["DATE", "DATETIME", "TIMESTAMP", "TIME"],
    correctAnswer: 2,
    explanation: "TIMESTAMP can be set to automatically update to the current date and time when a row is modified."
  },
  {
    id: 35,
    question: "What is ENUM data type?",
    options: ["A list of possible values", "A number", "A date", "A text field"],
    correctAnswer: 0,
    explanation: "ENUM is a string object that can have only one value from a predefined list of possible values."
  },
  {
    id: 36,
    question: "What is SET data type?",
    options: ["A single value from a list", "Multiple values from a predefined list", "A number", "A date"],
    correctAnswer: 1,
    explanation: "SET is similar to ENUM but can store multiple values from a predefined list."
  },
  {
    id: 37,
    question: "Which data type is best for storing currency values?",
    options: ["FLOAT", "DOUBLE", "DECIMAL", "INT"],
    correctAnswer: 2,
    explanation: "DECIMAL is preferred for currency because it provides exact precision, avoiding floating-point rounding errors."
  },
  {
    id: 38,
    question: "What is the maximum length of TEXT data type?",
    options: ["255 characters", "65,535 characters", "16,777,215 characters", "4,294,967,295 characters"],
    correctAnswer: 1,
    explanation: "TEXT can store up to 65,535 characters. MEDIUMTEXT stores up to 16,777,215, and LONGTEXT stores up to 4,294,967,295 characters."
  },
  {
    id: 39,
    question: "Which data type stores only the time (without date)?",
    options: ["DATE", "DATETIME", "TIME", "TIMESTAMP"],
    correctAnswer: 2,
    explanation: "TIME data type stores only the time portion (HH:MM:SS) without the date."
  },
  {
    id: 40,
    question: "What is YEAR data type used for?",
    options: ["Storing full date", "Storing year only", "Storing time", "Storing timestamp"],
    correctAnswer: 1,
    explanation: "YEAR data type stores a year value in 2-digit or 4-digit format (e.g., 2024)."
  },

  // ========== DDL - CREATE, ALTER, DROP (20 questions) ==========
  {
    id: 41,
    question: "Which SQL statement is used to create a table?",
    options: ["CREATE TABLE", "MAKE TABLE", "NEW TABLE", "ADD TABLE"],
    correctAnswer: 0,
    explanation: "CREATE TABLE table_name (column1 datatype, column2 datatype, ...); is used to create a new table."
  },
  {
    id: 42,
    question: "Which SQL statement is used to modify a table structure?",
    options: ["MODIFY TABLE", "CHANGE TABLE", "ALTER TABLE", "UPDATE TABLE"],
    correctAnswer: 2,
    explanation: "ALTER TABLE is used to add, modify, or delete columns and constraints in an existing table."
  },
  {
    id: 43,
    question: "Which SQL statement is used to delete a table?",
    options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "ERASE TABLE"],
    correctAnswer: 2,
    explanation: "DROP TABLE table_name; is used to delete a table and all its data permanently."
  },
  {
    id: 44,
    question: "How do you add a column to an existing table?",
    options: ["ADD COLUMN column_name datatype;", "ALTER TABLE table_name ADD column_name datatype;", "INSERT COLUMN column_name;", "CREATE COLUMN column_name;"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name ADD column_name datatype; adds a new column to an existing table."
  },
  {
    id: 45,
    question: "How do you delete a column from a table?",
    options: ["DELETE COLUMN column_name;", "ALTER TABLE table_name DROP COLUMN column_name;", "REMOVE COLUMN column_name;", "DROP COLUMN column_name;"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name DROP COLUMN column_name; removes a column from a table."
  },
  {
    id: 46,
    question: "How do you modify a column's data type?",
    options: ["CHANGE COLUMN column_name new_datatype;", "ALTER TABLE table_name MODIFY column_name new_datatype;", "UPDATE COLUMN column_name new_datatype;", "MODIFY COLUMN column_name new_datatype;"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name MODIFY column_name new_datatype; changes a column's data type."
  },
  {
    id: 47,
    question: "How do you rename a table?",
    options: ["RENAME TABLE old_name TO new_name;", "ALTER TABLE old_name RENAME TO new_name;", "Both A and B", "CHANGE TABLE old_name TO new_name;"],
    correctAnswer: 2,
    explanation: "Both RENAME TABLE old_name TO new_name; and ALTER TABLE old_name RENAME TO new_name; can rename a table."
  },
  {
    id: 48,
    question: "How do you add a primary key to an existing table?",
    options: ["ADD PRIMARY KEY (column_name);", "ALTER TABLE table_name ADD PRIMARY KEY (column_name);", "CREATE PRIMARY KEY (column_name);", "SET PRIMARY KEY (column_name);"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name ADD PRIMARY KEY (column_name); adds a primary key constraint to an existing table."
  },
  {
    id: 49,
    question: "How do you add a foreign key constraint?",
    options: ["ADD FOREIGN KEY (column) REFERENCES table(column);", "ALTER TABLE table_name ADD FOREIGN KEY (column) REFERENCES other_table(column);", "CREATE FOREIGN KEY (column);", "SET FOREIGN KEY (column);"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name ADD FOREIGN KEY (column) REFERENCES other_table(column); adds a foreign key constraint."
  },
  {
    id: 50,
    question: "What does TRUNCATE TABLE do?",
    options: ["Deletes the table", "Deletes all rows but keeps table structure", "Deletes specific rows", "Modifies table structure"],
    correctAnswer: 1,
    explanation: "TRUNCATE TABLE table_name; deletes all rows from a table but keeps the table structure. It's faster than DELETE."
  },
  {
    id: 51,
    question: "What is the difference between DROP TABLE and TRUNCATE TABLE?",
    options: ["No difference", "DROP deletes table structure, TRUNCATE only deletes data", "TRUNCATE deletes table structure, DROP only deletes data", "DROP is faster"],
    correctAnswer: 1,
    explanation: "DROP TABLE deletes the entire table including structure. TRUNCATE TABLE deletes all data but keeps the table structure."
  },
  {
    id: 52,
    question: "How do you add a NOT NULL constraint to a column?",
    options: ["ALTER TABLE table_name MODIFY column_name datatype NOT NULL;", "ADD NOT NULL column_name;", "SET NOT NULL column_name;", "CREATE NOT NULL column_name;"],
    correctAnswer: 0,
    explanation: "ALTER TABLE table_name MODIFY column_name datatype NOT NULL; adds a NOT NULL constraint to a column."
  },
  {
    id: 53,
    question: "How do you add a UNIQUE constraint to a column?",
    options: ["ADD UNIQUE (column_name);", "ALTER TABLE table_name ADD UNIQUE (column_name);", "CREATE UNIQUE (column_name);", "SET UNIQUE (column_name);"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name ADD UNIQUE (column_name); adds a UNIQUE constraint to ensure no duplicate values."
  },
  {
    id: 54,
    question: "How do you add a DEFAULT value to a column?",
    options: ["ALTER TABLE table_name MODIFY column_name datatype DEFAULT value;", "ADD DEFAULT value TO column_name;", "SET DEFAULT value FOR column_name;", "CREATE DEFAULT value column_name;"],
    correctAnswer: 0,
    explanation: "ALTER TABLE table_name MODIFY column_name datatype DEFAULT value; sets a default value for a column."
  },
  {
    id: 55,
    question: "What is AUTO_INCREMENT used for?",
    options: ["To automatically increment a numeric value", "To automatically decrement a value", "To automatically update a date", "To automatically delete rows"],
    correctAnswer: 0,
    explanation: "AUTO_INCREMENT automatically generates a unique number for each new row, typically used for primary keys."
  },
  {
    id: 56,
    question: "How do you create an index on a column?",
    options: ["CREATE INDEX index_name ON table_name(column_name);", "ADD INDEX index_name ON table_name(column_name);", "Both A and B", "MAKE INDEX index_name;"],
    correctAnswer: 2,
    explanation: "Both CREATE INDEX index_name ON table_name(column_name); and ALTER TABLE table_name ADD INDEX index_name(column_name); create an index."
  },
  {
    id: 57,
    question: "How do you delete an index?",
    options: ["DELETE INDEX index_name;", "DROP INDEX index_name ON table_name;", "REMOVE INDEX index_name;", "ERASE INDEX index_name;"],
    correctAnswer: 1,
    explanation: "DROP INDEX index_name ON table_name; or ALTER TABLE table_name DROP INDEX index_name; deletes an index."
  },
  {
    id: 58,
    question: "What does IF NOT EXISTS do in CREATE TABLE?",
    options: ["Nothing", "Creates table only if it doesn't exist", "Creates table only if it exists", "Deletes existing table first"],
    correctAnswer: 1,
    explanation: "CREATE TABLE IF NOT EXISTS prevents an error if the table already exists."
  },
  {
    id: 59,
    question: "What does IF EXISTS do in DROP TABLE?",
    options: ["Nothing", "Drops table only if it exists", "Drops table only if it doesn't exist", "Creates table first"],
    correctAnswer: 1,
    explanation: "DROP TABLE IF EXISTS prevents an error if the table doesn't exist."
  },
  {
    id: 60,
    question: "How do you rename a column?",
    options: ["RENAME COLUMN old_name TO new_name;", "ALTER TABLE table_name CHANGE old_name new_name datatype;", "MODIFY COLUMN old_name TO new_name;", "UPDATE COLUMN old_name TO new_name;"],
    correctAnswer: 1,
    explanation: "ALTER TABLE table_name CHANGE old_name new_name datatype; renames a column and can also change its data type."
  },

  // ========== DQL - SELECT QUERIES (25 questions) ==========
  {
    id: 61,
    question: "Which SQL statement is used to retrieve data from a table?",
    options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
    correctAnswer: 2,
    explanation: "SELECT is used to retrieve data from one or more tables."
  },
  {
    id: 62,
    question: "What does SELECT * FROM table_name do?",
    options: ["Selects first row", "Selects all columns from all rows", "Selects last row", "Selects table structure"],
    correctAnswer: 1,
    explanation: "SELECT * retrieves all columns from all rows in the specified table."
  },
  {
    id: 63,
    question: "Which clause is used to filter rows?",
    options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    correctAnswer: 2,
    explanation: "WHERE clause is used to filter rows based on specified conditions."
  },
  {
    id: 64,
    question: "Which clause is used to sort results?",
    options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
    correctAnswer: 1,
    explanation: "ORDER BY clause is used to sort the result set in ascending (ASC) or descending (DESC) order."
  },
  {
    id: 65,
    question: "What does LIMIT clause do?",
    options: ["Limits columns", "Limits the number of rows returned", "Limits table size", "Limits database size"],
    correctAnswer: 1,
    explanation: "LIMIT clause restricts the number of rows returned by a query."
  },
  {
    id: 66,
    question: "What does DISTINCT do?",
    options: ["Selects unique values", "Selects duplicate values", "Selects all values", "Selects first value"],
    correctAnswer: 0,
    explanation: "DISTINCT eliminates duplicate rows from the result set, showing only unique values."
  },
  {
    id: 67,
    question: "Which operator is used for pattern matching?",
    options: ["=", "LIKE", "==", "MATCH"],
    correctAnswer: 1,
    explanation: "LIKE operator is used for pattern matching with wildcards % (any characters) and _ (single character)."
  },
  {
    id: 68,
    question: "What does % wildcard represent in LIKE?",
    options: ["Single character", "Zero or more characters", "Exactly one character", "No characters"],
    correctAnswer: 1,
    explanation: "% wildcard in LIKE matches zero or more characters. For example, 'a%' matches 'apple', 'abc', 'a'."
  },
  {
    id: 69,
    question: "What does _ wildcard represent in LIKE?",
    options: ["Zero or more characters", "Single character", "Multiple characters", "No characters"],
    correctAnswer: 1,
    explanation: "_ wildcard in LIKE matches exactly one character. For example, 'a_' matches 'ab', 'ac', but not 'abc'."
  },
  {
    id: 70,
    question: "Which operator checks if a value is NULL?",
    options: ["=", "==", "IS NULL", "EQUALS NULL"],
    correctAnswer: 2,
    explanation: "IS NULL checks if a value is NULL. Use IS NOT NULL to check for non-NULL values."
  },
  {
    id: 71,
    question: "What does BETWEEN operator do?",
    options: ["Checks if value is between two values (inclusive)", "Checks if value is between two values (exclusive)", "Checks if value equals two values", "Checks if value is not between two values"],
    correctAnswer: 0,
    explanation: "BETWEEN operator checks if a value is within a range, inclusive of both endpoints."
  },
  {
    id: 72,
    question: "What does IN operator do?",
    options: ["Checks if value is in a list", "Checks if value is not in a list", "Checks if value is inside a table", "Checks if value is outside a table"],
    correctAnswer: 0,
    explanation: "IN operator checks if a value matches any value in a list. For example: WHERE id IN (1, 2, 3)."
  },
  {
    id: 73,
    question: "What does GROUP BY do?",
    options: ["Groups rows with same values", "Groups columns", "Groups tables", "Groups databases"],
    correctAnswer: 0,
    explanation: "GROUP BY groups rows that have the same values in specified columns, typically used with aggregate functions."
  },
  {
    id: 74,
    question: "Which clause is used with GROUP BY to filter groups?",
    options: ["WHERE", "HAVING", "FILTER", "CONDITION"],
    correctAnswer: 1,
    explanation: "HAVING clause filters groups after GROUP BY, while WHERE filters rows before grouping."
  },
  {
    id: 75,
    question: "What is the difference between WHERE and HAVING?",
    options: ["No difference", "WHERE filters rows, HAVING filters groups", "HAVING filters rows, WHERE filters groups", "WHERE is for SELECT, HAVING is for UPDATE"],
    correctAnswer: 1,
    explanation: "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY."
  },
  {
    id: 76,
    question: "What does COUNT() function do?",
    options: ["Counts columns", "Counts the number of rows", "Counts databases", "Counts tables"],
    correctAnswer: 1,
    explanation: "COUNT() returns the number of rows. COUNT(*) counts all rows, COUNT(column) counts non-NULL values."
  },
  {
    id: 77,
    question: "What does SUM() function do?",
    options: ["Sums all values in a column", "Sums rows", "Sums columns", "Sums tables"],
    correctAnswer: 0,
    explanation: "SUM() calculates the sum of all values in a numeric column."
  },
  {
    id: 78,
    question: "What does AVG() function do?",
    options: ["Calculates average of values", "Calculates maximum value", "Calculates minimum value", "Calculates total"],
    correctAnswer: 0,
    explanation: "AVG() calculates the average (mean) of values in a numeric column."
  },
  {
    id: 79,
    question: "What does MAX() function do?",
    options: ["Returns maximum value", "Returns minimum value", "Returns average value", "Returns sum"],
    correctAnswer: 0,
    explanation: "MAX() returns the maximum value in a column."
  },
  {
    id: 80,
    question: "What does MIN() function do?",
    options: ["Returns minimum value", "Returns maximum value", "Returns average value", "Returns sum"],
    correctAnswer: 0,
    explanation: "MIN() returns the minimum value in a column."
  },
  {
    id: 81,
    question: "What does AS do in SELECT?",
    options: ["Creates alias for column or table", "Adds a column", "Deletes a column", "Modifies a column"],
    correctAnswer: 0,
    explanation: "AS keyword creates an alias (temporary name) for a column or table. Example: SELECT name AS employee_name."
  },
  {
    id: 82,
    question: "What does UNION do?",
    options: ["Combines results from multiple SELECT statements", "Joins tables", "Groups rows", "Filters rows"],
    correctAnswer: 0,
    explanation: "UNION combines the results of two or more SELECT statements, removing duplicates."
  },
  {
    id: 83,
    question: "What is the difference between UNION and UNION ALL?",
    options: ["No difference", "UNION removes duplicates, UNION ALL keeps duplicates", "UNION ALL removes duplicates, UNION keeps duplicates", "UNION is faster"],
    correctAnswer: 1,
    explanation: "UNION removes duplicate rows, UNION ALL keeps all rows including duplicates."
  },
  {
    id: 84,
    question: "What does ORDER BY DESC do?",
    options: ["Sorts in ascending order", "Sorts in descending order", "Doesn't sort", "Sorts randomly"],
    correctAnswer: 1,
    explanation: "ORDER BY column DESC sorts results in descending order (highest to lowest)."
  },
  {
    id: 85,
    question: "What does ORDER BY ASC do?",
    options: ["Sorts in ascending order", "Sorts in descending order", "Doesn't sort", "Sorts randomly"],
    correctAnswer: 0,
    explanation: "ORDER BY column ASC sorts results in ascending order (lowest to highest). ASC is the default."
  },

  // ========== DML - INSERT, UPDATE, DELETE (20 questions) ==========
  {
    id: 86,
    question: "Which SQL statement is used to insert data into a table?",
    options: ["ADD", "INSERT", "CREATE", "PUT"],
    correctAnswer: 1,
    explanation: "INSERT INTO statement is used to add new rows of data into a table."
  },
  {
    id: 87,
    question: "Which SQL statement is used to update data in a table?",
    options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"],
    correctAnswer: 2,
    explanation: "UPDATE statement is used to modify existing data in a table."
  },
  {
    id: 88,
    question: "Which SQL statement is used to delete data from a table?",
    options: ["REMOVE", "DELETE", "DROP", "ERASE"],
    correctAnswer: 1,
    explanation: "DELETE statement is used to remove rows from a table."
  },
  {
    id: 89,
    question: "What is the correct syntax for INSERT?",
    options: ["INSERT INTO table_name VALUES (value1, value2);", "INSERT table_name VALUES (value1, value2);", "ADD INTO table_name VALUES (value1, value2);", "PUT INTO table_name VALUES (value1, value2);"],
    correctAnswer: 0,
    explanation: "INSERT INTO table_name VALUES (value1, value2, ...); inserts values into all columns in order."
  },
  {
    id: 90,
    question: "How do you insert data into specific columns?",
    options: ["INSERT INTO table_name (col1, col2) VALUES (val1, val2);", "INSERT table_name (col1, col2) VALUES (val1, val2);", "ADD INTO table_name (col1, col2) VALUES (val1, val2);", "PUT INTO table_name (col1, col2) VALUES (val1, val2);"],
    correctAnswer: 0,
    explanation: "INSERT INTO table_name (column1, column2) VALUES (value1, value2); inserts values into specified columns."
  },
  {
    id: 91,
    question: "What is the correct syntax for UPDATE?",
    options: ["UPDATE table_name SET column = value;", "MODIFY table_name SET column = value;", "CHANGE table_name SET column = value;", "ALTER table_name SET column = value;"],
    correctAnswer: 0,
    explanation: "UPDATE table_name SET column = value WHERE condition; updates data in a table."
  },
  {
    id: 92,
    question: "What happens if you UPDATE without WHERE clause?",
    options: ["Updates first row", "Updates all rows", "Updates last row", "No update occurs"],
    correctAnswer: 1,
    explanation: "UPDATE without WHERE clause updates all rows in the table, which is usually not desired."
  },
  {
    id: 93,
    question: "What is the correct syntax for DELETE?",
    options: ["DELETE FROM table_name WHERE condition;", "DELETE table_name WHERE condition;", "REMOVE FROM table_name WHERE condition;", "ERASE FROM table_name WHERE condition;"],
    correctAnswer: 0,
    explanation: "DELETE FROM table_name WHERE condition; deletes rows that match the condition."
  },
  {
    id: 94,
    question: "What happens if you DELETE without WHERE clause?",
    options: ["Deletes first row", "Deletes all rows", "Deletes last row", "No deletion occurs"],
    correctAnswer: 1,
    explanation: "DELETE FROM table_name without WHERE clause deletes all rows from the table."
  },
  {
    id: 95,
    question: "What is the difference between DELETE and TRUNCATE?",
    options: ["No difference", "DELETE can be rolled back, TRUNCATE cannot", "TRUNCATE is faster and cannot be rolled back", "Both B and C"],
    correctAnswer: 3,
    explanation: "DELETE can be rolled back and is slower. TRUNCATE is faster, cannot be rolled back, and resets AUTO_INCREMENT."
  },
  {
    id: 96,
    question: "How do you insert multiple rows at once?",
    options: ["Multiple INSERT statements", "INSERT INTO table VALUES (val1), (val2), (val3);", "Both A and B", "You cannot insert multiple rows"],
    correctAnswer: 2,
    explanation: "You can use multiple INSERT statements or a single INSERT with multiple value sets: INSERT INTO table VALUES (val1), (val2), (val3);"
  },
  {
    id: 97,
    question: "How do you update multiple columns?",
    options: ["Multiple UPDATE statements", "UPDATE table SET col1=val1, col2=val2 WHERE condition;", "Both A and B", "You cannot update multiple columns"],
    correctAnswer: 2,
    explanation: "You can update multiple columns in one statement: UPDATE table SET col1=val1, col2=val2 WHERE condition;"
  },
  {
    id: 98,
    question: "What does INSERT IGNORE do?",
    options: ["Ignores errors and continues", "Ignores duplicate key errors", "Ignores all errors", "Ignores warnings"],
    correctAnswer: 1,
    explanation: "INSERT IGNORE ignores duplicate key errors and continues inserting other rows."
  },
  {
    id: 99,
    question: "What does ON DUPLICATE KEY UPDATE do?",
    options: ["Updates row if duplicate key exists", "Deletes row if duplicate key exists", "Ignores row if duplicate key exists", "Creates new row if duplicate key exists"],
    correctAnswer: 0,
    explanation: "ON DUPLICATE KEY UPDATE updates the existing row if a duplicate key is encountered during INSERT."
  },
  {
    id: 100,
    question: "How do you insert data from another table?",
    options: ["INSERT INTO table1 SELECT * FROM table2;", "COPY FROM table2 TO table1;", "MOVE FROM table2 TO table1;", "TRANSFER FROM table2 TO table1;"],
    correctAnswer: 0,
    explanation: "INSERT INTO table1 SELECT * FROM table2; inserts data from table2 into table1."
  },
  {
    id: 101,
    question: "What does REPLACE INTO do?",
    options: ["Replaces table", "Inserts or updates (replaces) row if duplicate key", "Replaces database", "Replaces column"],
    correctAnswer: 1,
    explanation: "REPLACE INTO inserts a new row or replaces an existing row if a duplicate key is found."
  },
  {
    id: 102,
    question: "How do you update data based on another table?",
    options: ["UPDATE table1 SET col = (SELECT col FROM table2);", "UPDATE table1 JOIN table2 ON condition SET col = value;", "Both A and B", "You cannot update from another table"],
    correctAnswer: 2,
    explanation: "You can use subqueries or JOINs to update data based on another table."
  },
  {
    id: 103,
    question: "What does LIMIT do with DELETE?",
    options: ["Limits columns to delete", "Limits number of rows to delete", "Limits tables to delete", "Limits databases to delete"],
    correctAnswer: 1,
    explanation: "DELETE FROM table WHERE condition LIMIT n; deletes only the first n rows matching the condition."
  },
  {
    id: 104,
    question: "What does ORDER BY do with DELETE?",
    options: ["Orders columns", "Orders which rows to delete first", "Orders tables", "Does nothing"],
    correctAnswer: 1,
    explanation: "DELETE FROM table WHERE condition ORDER BY column LIMIT n; deletes rows in a specific order."
  },
  {
    id: 105,
    question: "Can you use JOIN in UPDATE statement?",
    options: ["No", "Yes, to update based on another table", "Only in DELETE", "Only in SELECT"],
    correctAnswer: 1,
    explanation: "Yes, you can use JOIN in UPDATE to update rows based on data from another table."
  },

  // ========== JOINS (15 questions) ==========
  {
    id: 106,
    question: "What is a JOIN in SQL?",
    options: ["A way to combine rows from multiple tables", "A way to combine columns", "A way to delete tables", "A way to create tables"],
    correctAnswer: 0,
    explanation: "JOIN combines rows from two or more tables based on a related column between them."
  },
  {
    id: 107,
    question: "What is INNER JOIN?",
    options: ["Returns all rows from both tables", "Returns only matching rows from both tables", "Returns all rows from left table", "Returns all rows from right table"],
    correctAnswer: 1,
    explanation: "INNER JOIN returns only rows that have matching values in both tables."
  },
  {
    id: 108,
    question: "What is LEFT JOIN?",
    options: ["Returns all rows from right table", "Returns all rows from left table and matching rows from right", "Returns only matching rows", "Returns no rows"],
    correctAnswer: 1,
    explanation: "LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table and matching rows from the right table. Non-matching right rows show NULL."
  },
  {
    id: 109,
    question: "What is RIGHT JOIN?",
    options: ["Returns all rows from left table", "Returns all rows from right table and matching rows from left", "Returns only matching rows", "Returns no rows"],
    correctAnswer: 1,
    explanation: "RIGHT JOIN (or RIGHT OUTER JOIN) returns all rows from the right table and matching rows from the left table. Non-matching left rows show NULL."
  },
  {
    id: 110,
    question: "What is FULL OUTER JOIN?",
    options: ["Returns all rows from both tables", "Returns only matching rows", "Returns rows from left table only", "Returns rows from right table only"],
    correctAnswer: 0,
    explanation: "FULL OUTER JOIN returns all rows from both tables, with NULLs for non-matching rows. Note: MySQL doesn't support FULL OUTER JOIN directly."
  },
  {
    id: 111,
    question: "What is CROSS JOIN?",
    options: ["Returns matching rows", "Returns Cartesian product (all combinations)", "Returns no rows", "Returns one row"],
    correctAnswer: 1,
    explanation: "CROSS JOIN returns the Cartesian product - every row from first table combined with every row from second table."
  },
  {
    id: 112,
    question: "What is SELF JOIN?",
    options: ["Joining a table with itself", "Joining two identical tables", "Joining a table with another copy", "All of the above"],
    correctAnswer: 3,
    explanation: "SELF JOIN is joining a table with itself, typically using table aliases to distinguish the two instances."
  },
  {
    id: 113,
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    options: ["No difference", "INNER JOIN returns only matches, LEFT JOIN returns all left rows", "LEFT JOIN returns only matches, INNER JOIN returns all left rows", "INNER JOIN is faster"],
    correctAnswer: 1,
    explanation: "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from left table plus matching rows from right table."
  },
  {
    id: 114,
    question: "What happens if JOIN condition is not specified?",
    options: ["Error occurs", "CROSS JOIN is performed", "INNER JOIN is performed", "No join occurs"],
    correctAnswer: 1,
    explanation: "If no JOIN condition is specified, MySQL performs a CROSS JOIN (Cartesian product)."
  },
  {
    id: 115,
    question: "Can you join more than two tables?",
    options: ["No", "Yes, by chaining multiple JOINs", "Only in some databases", "Only with INNER JOIN"],
    correctAnswer: 1,
    explanation: "Yes, you can join multiple tables by chaining JOIN clauses: table1 JOIN table2 ON condition JOIN table3 ON condition."
  },
  {
    id: 116,
    question: "What is the ON clause used for in JOIN?",
    options: ["To specify join condition", "To specify table name", "To specify column name", "To specify database name"],
    correctAnswer: 0,
    explanation: "ON clause specifies the condition for joining tables, typically matching foreign key to primary key."
  },
  {
    id: 117,
    question: "What is the difference between ON and WHERE in JOIN?",
    options: ["No difference", "ON specifies join condition, WHERE filters results", "WHERE specifies join condition, ON filters results", "ON is for INNER JOIN, WHERE is for LEFT JOIN"],
    correctAnswer: 1,
    explanation: "ON specifies the join condition (how tables are related). WHERE filters the result set after the join."
  },
  {
    id: 118,
    question: "What is NATURAL JOIN?",
    options: ["Joins tables on columns with same name", "Joins tables automatically", "Joins tables on primary key", "Joins tables on foreign key"],
    correctAnswer: 0,
    explanation: "NATURAL JOIN automatically joins tables on columns with the same name. It's not recommended due to ambiguity."
  },
  {
    id: 119,
    question: "What is the result if LEFT JOIN finds no matches?",
    options: ["Error occurs", "Returns NULL for right table columns", "Returns empty result", "Returns only left table data"],
    correctAnswer: 1,
    explanation: "LEFT JOIN returns all left table rows. If no match in right table, right table columns show NULL."
  },
  {
    id: 120,
    question: "Can you use WHERE with JOIN?",
    options: ["No", "Yes, to filter joined results", "Only with INNER JOIN", "Only with LEFT JOIN"],
    correctAnswer: 1,
    explanation: "Yes, WHERE clause can be used with JOIN to filter the result set after the join operation."
  },

  // ========== CONSTRAINTS & KEYS (15 questions) ==========
  {
    id: 121,
    question: "What is a PRIMARY KEY?",
    options: ["A column that can be NULL", "A column that uniquely identifies each row", "A column that stores text", "A column that stores numbers"],
    correctAnswer: 1,
    explanation: "PRIMARY KEY uniquely identifies each row in a table and cannot be NULL. A table can have only one primary key."
  },
  {
    id: 122,
    question: "What is a FOREIGN KEY?",
    options: ["A key that is foreign to the table", "A key that references PRIMARY KEY in another table", "A key that is not used", "A key that is optional"],
    correctAnswer: 1,
    explanation: "FOREIGN KEY is a column that references the PRIMARY KEY of another table, establishing a relationship."
  },
  {
    id: 123,
    question: "What is a UNIQUE constraint?",
    options: ["Ensures all values are the same", "Ensures all values are different", "Ensures values are not NULL", "Ensures values are numbers"],
    correctAnswer: 1,
    explanation: "UNIQUE constraint ensures that all values in a column are different (no duplicates)."
  },
  {
    id: 124,
    question: "What is NOT NULL constraint?",
    options: ["Allows NULL values", "Prevents NULL values", "Allows empty strings", "Prevents empty strings"],
    correctAnswer: 1,
    explanation: "NOT NULL constraint prevents NULL values from being inserted into a column."
  },
  {
    id: 125,
    question: "What is a CHECK constraint?",
    options: ["Checks if table exists", "Checks if column exists", "Validates that values meet a condition", "Checks database connection"],
    correctAnswer: 2,
    explanation: "CHECK constraint validates that values in a column meet a specified condition (e.g., age > 0)."
  },
  {
    id: 126,
    question: "What is DEFAULT constraint?",
    options: ["Sets default database", "Sets default table", "Sets default value for a column", "Sets default user"],
    correctAnswer: 2,
    explanation: "DEFAULT constraint sets a default value for a column when no value is specified during INSERT."
  },
  {
    id: 127,
    question: "Can a table have multiple FOREIGN KEYs?",
    options: ["No", "Yes, multiple foreign keys are allowed", "Only two", "Only three"],
    correctAnswer: 1,
    explanation: "Yes, a table can have multiple foreign keys, each referencing a primary key in different tables."
  },
  {
    id: 128,
    question: "What is a composite primary key?",
    options: ["A primary key made of multiple columns", "A primary key made of one column", "A foreign key", "A unique key"],
    correctAnswer: 0,
    explanation: "A composite primary key consists of multiple columns that together uniquely identify each row."
  },
  {
    id: 129,
    question: "What does CASCADE do in foreign key?",
    options: ["Deletes parent row when child is deleted", "Deletes child rows when parent is deleted", "Updates child rows when parent is updated", "Both B and C"],
    correctAnswer: 3,
    explanation: "CASCADE automatically deletes or updates child rows when the parent row is deleted or updated."
  },
  {
    id: 130,
    question: "What does ON DELETE CASCADE do?",
    options: ["Deletes parent when child is deleted", "Deletes child rows when parent is deleted", "Prevents deletion", "Allows deletion"],
    correctAnswer: 1,
    explanation: "ON DELETE CASCADE automatically deletes child rows when the parent row is deleted."
  },
  {
    id: 131,
    question: "What does ON DELETE SET NULL do?",
    options: ["Sets parent to NULL when child is deleted", "Sets foreign key to NULL when parent is deleted", "Sets primary key to NULL", "Prevents deletion"],
    correctAnswer: 1,
    explanation: "ON DELETE SET NULL sets the foreign key column to NULL in child rows when the parent row is deleted."
  },
  {
    id: 132,
    question: "What does ON DELETE RESTRICT do?",
    options: ["Allows deletion", "Prevents deletion if child rows exist", "Deletes child rows", "Sets foreign key to NULL"],
    correctAnswer: 1,
    explanation: "ON DELETE RESTRICT prevents deletion of parent row if child rows exist (default behavior)."
  },
  {
    id: 133,
    question: "Can a FOREIGN KEY reference a non-primary key column?",
    options: ["No, must reference primary key", "Yes, can reference any unique column", "Yes, can reference any column", "Only in some databases"],
    correctAnswer: 1,
    explanation: "A foreign key can reference a PRIMARY KEY or any column with a UNIQUE constraint."
  },
  {
    id: 134,
    question: "What is the difference between PRIMARY KEY and UNIQUE?",
    options: ["No difference", "PRIMARY KEY cannot be NULL, UNIQUE can have one NULL", "UNIQUE cannot be NULL, PRIMARY KEY can have one NULL", "PRIMARY KEY allows duplicates"],
    correctAnswer: 1,
    explanation: "PRIMARY KEY cannot be NULL and there can be only one per table. UNIQUE can have one NULL value and there can be multiple UNIQUE constraints."
  },
  {
    id: 135,
    question: "Can a column be both PRIMARY KEY and FOREIGN KEY?",
    options: ["No", "Yes, a column can be both", "Only in some databases", "Only for numeric columns"],
    correctAnswer: 1,
    explanation: "Yes, a column can be both a primary key in its table and a foreign key referencing another table."
  },

  // ========== FUNCTIONS & AGGREGATES (15 questions) ==========
  {
    id: 136,
    question: "What does CONCAT() function do?",
    options: ["Concatenates strings", "Concatenates numbers", "Concatenates tables", "Concatenates databases"],
    correctAnswer: 0,
    explanation: "CONCAT() function concatenates (joins) two or more strings together."
  },
  {
    id: 137,
    question: "What does SUBSTRING() function do?",
    options: ["Extracts part of a string", "Extracts part of a number", "Extracts part of a table", "Extracts part of a database"],
    correctAnswer: 0,
    explanation: "SUBSTRING() or SUBSTR() extracts a portion of a string starting from a specified position."
  },
  {
    id: 138,
    question: "What does UPPER() function do?",
    options: ["Converts string to uppercase", "Converts string to lowercase", "Converts number to string", "Converts string to number"],
    correctAnswer: 0,
    explanation: "UPPER() or UCASE() converts a string to uppercase letters."
  },
  {
    id: 139,
    question: "What does LOWER() function do?",
    options: ["Converts string to lowercase", "Converts string to uppercase", "Converts number to string", "Converts string to number"],
    correctAnswer: 0,
    explanation: "LOWER() or LCASE() converts a string to lowercase letters."
  },
  {
    id: 140,
    question: "What does LENGTH() function do?",
    options: ["Returns length of string", "Returns length of number", "Returns length of table", "Returns length of database"],
    correctAnswer: 0,
    explanation: "LENGTH() returns the number of characters in a string."
  },
  {
    id: 141,
    question: "What does NOW() function return?",
    options: ["Current date only", "Current time only", "Current date and time", "Current year only"],
    correctAnswer: 2,
    explanation: "NOW() returns the current date and time as a DATETIME value."
  },
  {
    id: 142,
    question: "What does CURDATE() function return?",
    options: ["Current date only", "Current time only", "Current date and time", "Current year only"],
    correctAnswer: 0,
    explanation: "CURDATE() or CURRENT_DATE returns the current date (without time)."
  },
  {
    id: 143,
    question: "What does CURTIME() function return?",
    options: ["Current date only", "Current time only", "Current date and time", "Current year only"],
    correctAnswer: 1,
    explanation: "CURTIME() or CURRENT_TIME returns the current time (without date)."
  },
  {
    id: 144,
    question: "What does DATE_FORMAT() function do?",
    options: ["Formats date in specified format", "Formats number", "Formats string", "Formats table"],
    correctAnswer: 0,
    explanation: "DATE_FORMAT() formats a date value according to a specified format string (e.g., '%Y-%m-%d')."
  },
  {
    id: 145,
    question: "What does DATEDIFF() function do?",
    options: ["Calculates difference between two dates", "Calculates difference between two numbers", "Calculates difference between two strings", "Calculates difference between two times"],
    correctAnswer: 0,
    explanation: "DATEDIFF() calculates the number of days between two dates."
  },
  {
    id: 146,
    question: "What does ROUND() function do?",
    options: ["Rounds a number to specified decimal places", "Rounds a string", "Rounds a date", "Rounds a table"],
    correctAnswer: 0,
    explanation: "ROUND() rounds a number to a specified number of decimal places."
  },
  {
    id: 147,
    question: "What does CEIL() function do?",
    options: ["Rounds up to nearest integer", "Rounds down to nearest integer", "Rounds to nearest integer", "Returns absolute value"],
    correctAnswer: 0,
    explanation: "CEIL() or CEILING() rounds a number up to the nearest integer."
  },
  {
    id: 148,
    question: "What does FLOOR() function do?",
    options: ["Rounds up to nearest integer", "Rounds down to nearest integer", "Rounds to nearest integer", "Returns absolute value"],
    correctAnswer: 1,
    explanation: "FLOOR() rounds a number down to the nearest integer."
  },
  {
    id: 149,
    question: "What does ABS() function do?",
    options: ["Returns absolute value", "Returns average value", "Returns maximum value", "Returns minimum value"],
    correctAnswer: 0,
    explanation: "ABS() returns the absolute value of a number (removes negative sign)."
  },
  {
    id: 150,
    question: "What does COALESCE() function do?",
    options: ["Returns first non-NULL value", "Returns last non-NULL value", "Returns all NULL values", "Returns first NULL value"],
    correctAnswer: 0,
    explanation: "COALESCE() returns the first non-NULL value from a list of expressions."
  }
];

// Function to randomly select 20 questions
export const getRandomQuestions = () => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
};



