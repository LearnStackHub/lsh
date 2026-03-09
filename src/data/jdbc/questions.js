// JDBC MCQ Questions Pool (150 questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all JDBC topics: Introduction, Drivers, Connection, Statements, ResultSet, CRUD, Transactions

export const allQuestions = [
  // ========== JDBC INTRODUCTION (20 questions) ==========
  {
    id: 1,
    question: "What does JDBC stand for?",
    options: ["Java Database Connection", "Java Database Connectivity", "Java Data Binding Component", "Java Database Component"],
    correctAnswer: 1,
    explanation: "JDBC stands for Java Database Connectivity, which is a Java API for connecting and executing queries on databases."
  },
  {
    id: 2,
    question: "What is the main purpose of JDBC?",
    options: ["To create databases", "To connect Java applications with databases", "To design database schemas", "To optimize database queries"],
    correctAnswer: 1,
    explanation: "JDBC is used to connect Java applications with databases and execute SQL queries."
  },
  {
    id: 3,
    question: "Which package contains JDBC classes?",
    options: ["java.sql", "java.database", "java.jdbc", "java.db"],
    correctAnswer: 0,
    explanation: "All JDBC classes and interfaces are in the java.sql package."
  },
  {
    id: 4,
    question: "What is the first step in JDBC connection process?",
    options: ["Create Statement", "Load Driver", "Get Connection", "Execute Query"],
    correctAnswer: 1,
    explanation: "The first step is to load the JDBC driver (though in modern Java 4.0+, drivers are auto-loaded)."
  },
  {
    id: 5,
    question: "Which class is used to establish a connection to a database?",
    options: ["DriverManager", "Connection", "Statement", "ResultSet"],
    correctAnswer: 0,
    explanation: "DriverManager.getConnection() is used to establish a connection to a database."
  },
  {
    id: 6,
    question: "What is a JDBC URL?",
    options: ["A web address", "A connection string that identifies a database", "A file path", "A network protocol"],
    correctAnswer: 1,
    explanation: "JDBC URL is a connection string that identifies the database location, type, and connection parameters."
  },
  {
    id: 7,
    question: "What is the format of JDBC URL for MySQL?",
    options: ["jdbc:mysql://host:port/database", "mysql://host:port/database", "jdbc://mysql/host:port/database", "mysql:jdbc://host:port/database"],
    correctAnswer: 0,
    explanation: "MySQL JDBC URL format is: jdbc:mysql://host:port/database"
  },
  {
    id: 8,
    question: "What is the default port for MySQL?",
    options: ["1433", "1521", "3306", "5432"],
    correctAnswer: 2,
    explanation: "MySQL default port is 3306."
  },
  {
    id: 9,
    question: "What is the default port for PostgreSQL?",
    options: ["1433", "1521", "3306", "5432"],
    correctAnswer: 3,
    explanation: "PostgreSQL default port is 5432."
  },
  {
    id: 10,
    question: "Which method is used to get a database connection?",
    options: ["DriverManager.connect()", "DriverManager.getConnection()", "Connection.create()", "Database.connect()"],
    correctAnswer: 1,
    explanation: "DriverManager.getConnection(url, username, password) is used to get a database connection."
  },
  {
    id: 11,
    question: "What is try-with-resources in JDBC?",
    options: ["A database connection pool", "A way to automatically close resources", "A type of statement", "A result set handler"],
    correctAnswer: 1,
    explanation: "try-with-resources automatically closes Connection, Statement, and ResultSet objects when the try block exits."
  },
  {
    id: 12,
    question: "Why should you always close database connections?",
    options: ["To save memory", "To prevent connection leaks and free database resources", "To improve performance", "It's optional"],
    correctAnswer: 1,
    explanation: "Not closing connections leads to connection leaks, exhausting database resources and causing application failures."
  },
  {
    id: 13,
    question: "What exception is thrown by JDBC methods?",
    options: ["IOException", "SQLException", "DatabaseException", "ConnectionException"],
    correctAnswer: 1,
    explanation: "JDBC methods throw SQLException when database-related errors occur."
  },
  {
    id: 14,
    question: "What is the correct order to close JDBC resources?",
    options: ["Connection -> Statement -> ResultSet", "ResultSet -> Statement -> Connection", "Statement -> Connection -> ResultSet", "Any order"],
    correctAnswer: 1,
    explanation: "Resources should be closed in reverse order: ResultSet first, then Statement, then Connection."
  },
  {
    id: 15,
    question: "Which interface represents a connection to a database?",
    options: ["DriverManager", "Connection", "Statement", "Database"],
    correctAnswer: 1,
    explanation: "The Connection interface represents a session with a specific database."
  },
  {
    id: 16,
    question: "What is the JDBC URL format for PostgreSQL?",
    options: ["jdbc:postgresql://host:port/database", "jdbc:postgres://host:port/database", "postgresql://host:port/database", "jdbc://postgresql/host:port/database"],
    correctAnswer: 0,
    explanation: "PostgreSQL JDBC URL format is: jdbc:postgresql://host:port/database"
  },
  {
    id: 17,
    question: "What is the JDBC URL format for Oracle?",
    options: ["jdbc:oracle:thin:@host:port:sid", "jdbc:oracle://host:port/sid", "oracle:jdbc://host:port:sid", "jdbc://oracle/host:port:sid"],
    correctAnswer: 0,
    explanation: "Oracle JDBC URL format is: jdbc:oracle:thin:@host:port:sid"
  },
  {
    id: 18,
    question: "What does 'thin' driver mean in Oracle JDBC?",
    options: ["Lightweight driver", "Type 4 pure Java driver", "Network protocol driver", "Native API driver"],
    correctAnswer: 1,
    explanation: "Oracle 'thin' driver is a Type 4 pure Java driver that communicates directly with the database using TCP/IP."
  },
  {
    id: 19,
    question: "Which method returns database metadata?",
    options: ["getMetadata()", "getDatabaseMetaData()", "getInfo()", "getDatabaseInfo()"],
    correctAnswer: 1,
    explanation: "Connection.getDatabaseMetaData() returns a DatabaseMetaData object with information about the database."
  },
  {
    id: 20,
    question: "What is the minimum Java version required for JDBC 4.0?",
    options: ["Java 5", "Java 6", "Java 7", "Java 8"],
    correctAnswer: 1,
    explanation: "JDBC 4.0 was introduced in Java 6, which includes automatic driver loading."
  },

  // ========== JDBC DRIVERS (20 questions) ==========
  {
    id: 21,
    question: "How many types of JDBC drivers are there?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "There are 4 types of JDBC drivers: Type 1, Type 2, Type 3, and Type 4."
  },
  {
    id: 22,
    question: "Which JDBC driver type is recommended for new projects?",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    correctAnswer: 3,
    explanation: "Type 4 (Thin/Pure Java Driver) is recommended because it's platform-independent and doesn't require native libraries."
  },
  {
    id: 23,
    question: "What is Type 1 JDBC driver?",
    options: ["Native API driver", "JDBC-ODBC Bridge", "Network Protocol driver", "Thin driver"],
    correctAnswer: 1,
    explanation: "Type 1 is JDBC-ODBC Bridge driver, which is now obsolete and removed from Java 8+."
  },
  {
    id: 24,
    question: "What is Type 2 JDBC driver?",
    options: ["JDBC-ODBC Bridge", "Native API driver", "Network Protocol driver", "Thin driver"],
    correctAnswer: 1,
    explanation: "Type 2 is Native API driver that uses native database libraries (platform-dependent)."
  },
  {
    id: 25,
    question: "What is Type 3 JDBC driver?",
    options: ["JDBC-ODBC Bridge", "Native API driver", "Network Protocol driver", "Thin driver"],
    correctAnswer: 2,
    explanation: "Type 3 is Network Protocol driver that uses middleware to communicate with the database."
  },
  {
    id: 26,
    question: "What is Type 4 JDBC driver?",
    options: ["JDBC-ODBC Bridge", "Native API driver", "Network Protocol driver", "Thin/Pure Java driver"],
    correctAnswer: 3,
    explanation: "Type 4 is Thin/Pure Java driver that communicates directly with the database using database protocol."
  },
  {
    id: 27,
    question: "Which driver type is platform-independent?",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    correctAnswer: 3,
    explanation: "Type 4 driver is platform-independent as it's written entirely in Java."
  },
  {
    id: 28,
    question: "What is the MySQL JDBC driver class name?",
    options: ["com.mysql.jdbc.Driver", "com.mysql.cj.jdbc.Driver", "mysql.jdbc.Driver", "com.mysql.Driver"],
    correctAnswer: 1,
    explanation: "MySQL 8.0+ uses com.mysql.cj.jdbc.Driver (older versions used com.mysql.jdbc.Driver)."
  },
  {
    id: 29,
    question: "What is the PostgreSQL JDBC driver class name?",
    options: ["org.postgres.Driver", "org.postgresql.Driver", "postgresql.Driver", "com.postgresql.Driver"],
    correctAnswer: 1,
    explanation: "PostgreSQL JDBC driver class is org.postgresql.Driver."
  },
  {
    id: 30,
    question: "What is the Oracle JDBC driver class name?",
    options: ["oracle.jdbc.Driver", "oracle.jdbc.driver.OracleDriver", "com.oracle.Driver", "oracle.Driver"],
    correctAnswer: 1,
    explanation: "Oracle JDBC driver class is oracle.jdbc.driver.OracleDriver."
  },
  {
    id: 31,
    question: "In modern Java (JDBC 4.0+), do you need to explicitly load drivers?",
    options: ["Yes, always", "No, drivers are auto-loaded", "Only for Type 1", "Only for Type 2"],
    correctAnswer: 1,
    explanation: "JDBC 4.0+ (Java 6+) automatically loads drivers from the classpath, so explicit Class.forName() is not needed."
  },
  {
    id: 32,
    question: "How are JDBC drivers automatically discovered in JDBC 4.0+?",
    options: ["By scanning classpath", "By reading META-INF/services/java.sql.Driver file", "By configuration file", "By environment variable"],
    correctAnswer: 1,
    explanation: "JDBC 4.0+ uses ServiceLoader mechanism that reads META-INF/services/java.sql.Driver file from driver JAR."
  },
  {
    id: 33,
    question: "Which method lists all registered JDBC drivers?",
    options: ["DriverManager.listDrivers()", "DriverManager.getDrivers()", "DriverManager.getAllDrivers()", "DriverManager.enumerateDrivers()"],
    correctAnswer: 1,
    explanation: "DriverManager.getDrivers() returns an Enumeration of all currently loaded JDBC drivers."
  },
  {
    id: 34,
    question: "What is the Maven dependency for MySQL connector?",
    options: ["mysql:mysql-connector-java", "com.mysql:mysql-connector-j", "mysql:mysql-connector", "com.mysql:mysql-driver"],
    correctAnswer: 1,
    explanation: "MySQL 8.0+ Maven dependency is: com.mysql:mysql-connector-j (older: mysql:mysql-connector-java)."
  },
  {
    id: 35,
    question: "What is the Maven dependency for PostgreSQL connector?",
    options: ["org.postgres:postgresql", "org.postgresql:postgresql", "com.postgresql:postgresql", "postgresql:postgresql"],
    correctAnswer: 1,
    explanation: "PostgreSQL Maven dependency is: org.postgresql:postgresql."
  },
  {
    id: 36,
    question: "Which driver type requires native database libraries?",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    correctAnswer: 1,
    explanation: "Type 2 (Native API) driver requires native database client libraries installed on the system."
  },
  {
    id: 37,
    question: "Which driver type is fastest?",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    correctAnswer: 3,
    explanation: "Type 4 driver is typically fastest as it communicates directly with the database without intermediate layers."
  },
  {
    id: 38,
    question: "What happens if you don't have the JDBC driver JAR in classpath?",
    options: ["Application won't compile", "ClassNotFoundException at runtime", "SQLException", "No error, it works"],
    correctAnswer: 1,
    explanation: "Without the driver JAR in classpath, you'll get ClassNotFoundException when trying to load the driver."
  },
  {
    id: 39,
    question: "Can you use multiple JDBC drivers in the same application?",
    options: ["No", "Yes, DriverManager handles multiple drivers", "Only Type 4 drivers", "Only if they're the same type"],
    correctAnswer: 1,
    explanation: "Yes, DriverManager can handle multiple drivers. It selects the appropriate driver based on the JDBC URL."
  },
  {
    id: 40,
    question: "What is the advantage of Type 4 driver over Type 2?",
    options: ["Faster performance", "Platform independence", "No native libraries needed", "All of the above"],
    correctAnswer: 3,
    explanation: "Type 4 driver is platform-independent, doesn't need native libraries, and typically performs better."
  },

  // ========== CONNECTION & STATEMENTS (25 questions) ==========
  {
    id: 41,
    question: "Which interface is used to execute SQL statements?",
    options: ["Connection", "Statement", "ResultSet", "DriverManager"],
    correctAnswer: 1,
    explanation: "The Statement interface is used to execute SQL statements against a database."
  },
  {
    id: 42,
    question: "How do you create a Statement object?",
    options: ["new Statement()", "connection.createStatement()", "Statement.create()", "DriverManager.createStatement()"],
    correctAnswer: 1,
    explanation: "Statement is created using connection.createStatement() method."
  },
  {
    id: 43,
    question: "Which method executes a SELECT query?",
    options: ["execute()", "executeQuery()", "executeUpdate()", "executeSelect()"],
    correctAnswer: 1,
    explanation: "executeQuery() is used for SELECT statements that return a ResultSet."
  },
  {
    id: 44,
    question: "Which method executes INSERT, UPDATE, DELETE statements?",
    options: ["execute()", "executeQuery()", "executeUpdate()", "executeModify()"],
    correctAnswer: 2,
    explanation: "executeUpdate() is used for INSERT, UPDATE, DELETE, and DDL statements that return an int (number of rows affected)."
  },
  {
    id: 45,
    question: "What does executeUpdate() return?",
    options: ["ResultSet", "int (number of rows affected)", "boolean", "void"],
    correctAnswer: 1,
    explanation: "executeUpdate() returns an int representing the number of rows affected by the SQL statement."
  },
  {
    id: 46,
    question: "What does executeQuery() return?",
    options: ["int", "boolean", "ResultSet", "void"],
    correctAnswer: 2,
    explanation: "executeQuery() returns a ResultSet object containing the query results."
  },
  {
    id: 47,
    question: "What is PreparedStatement?",
    options: ["A compiled SQL statement", "A parameterized SQL statement", "A faster Statement", "All of the above"],
    correctAnswer: 3,
    explanation: "PreparedStatement is a precompiled, parameterized SQL statement that is faster and prevents SQL injection."
  },
  {
    id: 48,
    question: "How do you create a PreparedStatement?",
    options: ["new PreparedStatement()", "connection.prepareStatement(sql)", "Statement.prepare()", "PreparedStatement.create()"],
    correctAnswer: 1,
    explanation: "PreparedStatement is created using connection.prepareStatement(sql) with a SQL query containing placeholders (?)."
  },
  {
    id: 49,
    question: "What character is used as a placeholder in PreparedStatement?",
    options: ["?", ":", "@", "$"],
    correctAnswer: 0,
    explanation: "Question mark (?) is used as a placeholder for parameters in PreparedStatement SQL queries."
  },
  {
    id: 50,
    question: "Which method sets a String parameter in PreparedStatement?",
    options: ["setString(index, value)", "setParameter(index, value)", "setValue(index, value)", "set(index, value)"],
    correctAnswer: 0,
    explanation: "setString(int parameterIndex, String value) sets a String parameter in PreparedStatement."
  },
  {
    id: 51,
    question: "Which method sets an int parameter in PreparedStatement?",
    options: ["setInt(index, value)", "setInteger(index, value)", "setNumber(index, value)", "set(index, value)"],
    correctAnswer: 0,
    explanation: "setInt(int parameterIndex, int value) sets an int parameter in PreparedStatement."
  },
  {
    id: 52,
    question: "What is the main advantage of PreparedStatement over Statement?",
    options: ["Faster execution", "Prevents SQL injection", "Better performance", "All of the above"],
    correctAnswer: 3,
    explanation: "PreparedStatement is faster (precompiled), prevents SQL injection, and performs better for repeated queries."
  },
  {
    id: 53,
    question: "Can you reuse a PreparedStatement with different parameter values?",
    options: ["No", "Yes, by setting new parameter values and re-executing", "Only once", "Only for SELECT queries"],
    correctAnswer: 1,
    explanation: "Yes, you can set new parameter values and execute the PreparedStatement multiple times."
  },
  {
    id: 54,
    question: "What is CallableStatement used for?",
    options: ["Regular SQL queries", "Stored procedures", "DDL statements", "Batch operations"],
    correctAnswer: 1,
    explanation: "CallableStatement is used to execute stored procedures in the database."
  },
  {
    id: 55,
    question: "How do you create a CallableStatement?",
    options: ["connection.createCallableStatement()", "connection.prepareCall(sql)", "CallableStatement.create()", "new CallableStatement()"],
    correctAnswer: 1,
    explanation: "CallableStatement is created using connection.prepareCall(sql) method."
  },
  {
    id: 56,
    question: "What is batch processing in JDBC?",
    options: ["Processing multiple queries sequentially", "Executing multiple SQL statements together", "Processing large result sets", "Connection pooling"],
    correctAnswer: 1,
    explanation: "Batch processing allows executing multiple SQL statements together for better performance."
  },
  {
    id: 57,
    question: "Which method adds a statement to a batch?",
    options: ["addBatch()", "add()", "batch()", "addStatement()"],
    correctAnswer: 0,
    explanation: "addBatch() adds a SQL statement to the current batch."
  },
  {
    id: 58,
    question: "Which method executes a batch?",
    options: ["executeBatch()", "execute()", "runBatch()", "processBatch()"],
    correctAnswer: 0,
    explanation: "executeBatch() executes all statements in the batch and returns an array of update counts."
  },
  {
    id: 59,
    question: "What does executeBatch() return?",
    options: ["int", "int[]", "ResultSet", "boolean"],
    correctAnswer: 1,
    explanation: "executeBatch() returns an int[] array containing the update count for each statement in the batch."
  },
  {
    id: 60,
    question: "Which method clears the batch?",
    options: ["clearBatch()", "resetBatch()", "clear()", "removeBatch()"],
    correctAnswer: 0,
    explanation: "clearBatch() removes all statements from the current batch."
  },
  {
    id: 61,
    question: "What is the difference between Statement and PreparedStatement?",
    options: ["No difference", "PreparedStatement is precompiled and parameterized", "Statement is faster", "PreparedStatement can't be reused"],
    correctAnswer: 1,
    explanation: "PreparedStatement is precompiled (faster) and uses parameters (prevents SQL injection), while Statement is for static SQL."
  },
  {
    id: 62,
    question: "Can you use PreparedStatement for DDL statements (CREATE, DROP)?",
    options: ["No", "Yes, but not recommended", "Only for SELECT", "Only for INSERT"],
    correctAnswer: 1,
    explanation: "Yes, you can use PreparedStatement for DDL, but it's typically not necessary since DDL statements are usually static."
  },
  {
    id: 63,
    question: "What happens if you don't set all parameters in PreparedStatement?",
    options: ["SQLException", "It works fine", "Null values are used", "Default values are used"],
    correctAnswer: 0,
    explanation: "If you don't set all parameters, you'll get a SQLException when trying to execute the PreparedStatement."
  },
  {
    id: 64,
    question: "Which method is used to set a Date parameter in PreparedStatement?",
    options: ["setDate(index, date)", "setDateTime(index, date)", "setTimestamp(index, date)", "Both setDate() and setTimestamp()"],
    correctAnswer: 3,
    explanation: "You can use setDate() for date-only values or setTimestamp() for date-time values in PreparedStatement."
  },
  {
    id: 65,
    question: "What is the parameter index in PreparedStatement?",
    options: ["0-based", "1-based", "Can be either", "Starts from 2"],
    correctAnswer: 1,
    explanation: "Parameter index in PreparedStatement is 1-based (first parameter is index 1, not 0)."
  },

  // ========== RESULTSET (20 questions) ==========
  {
    id: 66,
    question: "What is a ResultSet?",
    options: ["A database table", "An object that holds query results", "A SQL statement", "A connection object"],
    correctAnswer: 1,
    explanation: "ResultSet is an object that contains the data returned by a SELECT query."
  },
  {
    id: 67,
    question: "How do you move to the next row in ResultSet?",
    options: ["next()", "moveNext()", "getNext()", "forward()"],
    correctAnswer: 0,
    explanation: "next() method moves the cursor to the next row and returns true if a row exists, false otherwise."
  },
  {
    id: 68,
    question: "What does ResultSet.next() return?",
    options: ["void", "boolean", "ResultSet", "int"],
    correctAnswer: 1,
    explanation: "next() returns true if there's a next row, false if there are no more rows."
  },
  {
    id: 69,
    question: "What is the initial position of ResultSet cursor?",
    options: ["First row", "Last row", "Before first row", "After last row"],
    correctAnswer: 2,
    explanation: "ResultSet cursor starts before the first row. You must call next() to move to the first row."
  },
  {
    id: 70,
    question: "Which method retrieves a String value from ResultSet?",
    options: ["getString(columnName)", "getString(columnIndex)", "Both of the above", "getValue(columnName)"],
    correctAnswer: 2,
    explanation: "getString() can take either column name (String) or column index (int, 1-based)."
  },
  {
    id: 71,
    question: "Which method retrieves an int value from ResultSet?",
    options: ["getInt(columnName)", "getInt(columnIndex)", "Both of the above", "getInteger(columnName)"],
    correctAnswer: 2,
    explanation: "getInt() can take either column name (String) or column index (int, 1-based)."
  },
  {
    id: 72,
    question: "What is the column index in ResultSet?",
    options: ["0-based", "1-based", "Can be either", "Starts from 2"],
    correctAnswer: 1,
    explanation: "Column index in ResultSet is 1-based (first column is index 1, not 0)."
  },
  {
    id: 73,
    question: "What does ResultSet.getInt(1) retrieve?",
    options: ["First row", "First column of current row", "Last column", "Row count"],
    correctAnswer: 1,
    explanation: "getInt(1) retrieves the value from the first column of the current row."
  },
  {
    id: 74,
    question: "What happens if you call getString() on a NULL column?",
    options: ["SQLException", "Returns null", "Returns empty string", "Returns \"NULL\""],
    correctAnswer: 1,
    explanation: "getString() returns null (not empty string) if the column value is NULL."
  },
  {
    id: 75,
    question: "Which method checks if a column value is NULL?",
    options: ["isNull()", "wasNull()", "isNullValue()", "checkNull()"],
    correctAnswer: 1,
    explanation: "wasNull() returns true if the last column read was NULL."
  },
  {
    id: 76,
    question: "What is the difference between getString(columnName) and getString(columnIndex)?",
    options: ["No difference", "columnName is case-sensitive, columnIndex is faster", "columnIndex is case-sensitive", "Only columnName works"],
    correctAnswer: 1,
    explanation: "Using column index is slightly faster, while column name is more readable but case-sensitive in some databases."
  },
  {
    id: 77,
    question: "Can you move backward in a ResultSet?",
    options: ["No, only forward", "Yes, with previous()", "Only with scrollable ResultSet", "Only with updatable ResultSet"],
    correctAnswer: 2,
    explanation: "You can move backward only if the ResultSet is scrollable (created with TYPE_SCROLL_INSENSITIVE or TYPE_SCROLL_SENSITIVE)."
  },
  {
    id: 78,
    question: "What are the types of ResultSet?",
    options: ["Forward-only, Scrollable", "Read-only, Updatable", "Both A and B", "None of the above"],
    correctAnswer: 2,
    explanation: "ResultSet has two dimensions: scrollability (forward-only vs scrollable) and updatability (read-only vs updatable)."
  },
  {
    id: 79,
    question: "What is the default ResultSet type?",
    options: ["TYPE_SCROLL_SENSITIVE", "TYPE_SCROLL_INSENSITIVE", "TYPE_FORWARD_ONLY", "TYPE_READ_ONLY"],
    correctAnswer: 2,
    explanation: "Default ResultSet is TYPE_FORWARD_ONLY and CONCUR_READ_ONLY (can only move forward, read-only)."
  },
  {
    id: 80,
    question: "How do you create a scrollable ResultSet?",
    options: ["connection.createStatement(TYPE_SCROLL_INSENSITIVE)", "connection.createStatement(TYPE_SCROLL_INSENSITIVE, CONCUR_READ_ONLY)", "ResultSet.setScrollable()", "Statement.setScrollable()"],
    correctAnswer: 1,
    explanation: "You create a scrollable ResultSet by passing TYPE_SCROLL_INSENSITIVE or TYPE_SCROLL_SENSITIVE to createStatement()."
  },
  {
    id: 81,
    question: "Which method moves to the first row in a scrollable ResultSet?",
    options: ["first()", "moveFirst()", "goToFirst()", "reset()"],
    correctAnswer: 0,
    explanation: "first() moves the cursor to the first row in a scrollable ResultSet."
  },
  {
    id: 82,
    question: "Which method moves to the last row in a scrollable ResultSet?",
    options: ["last()", "moveLast()", "goToLast()", "end()"],
    correctAnswer: 0,
    explanation: "last() moves the cursor to the last row in a scrollable ResultSet."
  },
  {
    id: 83,
    question: "Which method moves to a specific row number in a scrollable ResultSet?",
    options: ["moveTo(row)", "absolute(row)", "goTo(row)", "setRow(row)"],
    correctAnswer: 1,
    explanation: "absolute(int row) moves the cursor to the specified row number in a scrollable ResultSet."
  },
  {
    id: 84,
    question: "What does ResultSet.getMetaData() return?",
    options: ["ResultSet data", "ResultSetMetaData object", "Column names", "Row count"],
    correctAnswer: 1,
    explanation: "getMetaData() returns a ResultSetMetaData object containing information about the ResultSet columns."
  },
  {
    id: 85,
    question: "Which method gets the number of columns in ResultSet?",
    options: ["getColumnCount()", "getColumnNumber()", "getCount()", "getSize()"],
    correctAnswer: 0,
    explanation: "ResultSetMetaData.getColumnCount() returns the number of columns in the ResultSet."
  },

  // ========== CRUD OPERATIONS (25 questions) ==========
  {
    id: 86,
    question: "What does CRUD stand for?",
    options: ["Create, Read, Update, Delete", "Create, Retrieve, Update, Destroy", "Create, Read, Use, Delete", "Create, Read, Update, Drop"],
    correctAnswer: 0,
    explanation: "CRUD stands for Create, Read, Update, Delete - the four basic database operations."
  },
  {
    id: 87,
    question: "Which SQL statement is used for CREATE operation?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    correctAnswer: 1,
    explanation: "INSERT statement is used to create (add) new records in a table."
  },
  {
    id: 88,
    question: "Which SQL statement is used for READ operation?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    correctAnswer: 0,
    explanation: "SELECT statement is used to read (retrieve) data from a table."
  },
  {
    id: 89,
    question: "Which SQL statement is used for UPDATE operation?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    correctAnswer: 2,
    explanation: "UPDATE statement is used to modify existing records in a table."
  },
  {
    id: 90,
    question: "Which SQL statement is used for DELETE operation?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    correctAnswer: 3,
    explanation: "DELETE statement is used to remove records from a table."
  },
  {
    id: 91,
    question: "What does executeUpdate() return for an INSERT statement?",
    options: ["Number of rows inserted", "Generated key", "ResultSet", "boolean"],
    correctAnswer: 0,
    explanation: "executeUpdate() returns the number of rows affected (inserted) by the INSERT statement."
  },
  {
    id: 92,
    question: "How do you retrieve auto-generated keys after INSERT?",
    options: ["getGeneratedKeys()", "getKeys()", "getAutoKeys()", "getInsertedKeys()"],
    correctAnswer: 0,
    explanation: "Statement.getGeneratedKeys() returns a ResultSet containing auto-generated keys from the last INSERT."
  },
  {
    id: 93,
    question: "How do you enable retrieval of generated keys in PreparedStatement?",
    options: ["prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)", "prepareStatement(sql, true)", "Both of the above", "It's automatic"],
    correctAnswer: 2,
    explanation: "You can use either Statement.RETURN_GENERATED_KEYS constant or true as the second parameter."
  },
  {
    id: 94,
    question: "What is the correct way to insert data using PreparedStatement?",
    options: ["INSERT INTO table VALUES (?, ?)", "INSERT INTO table (col1, col2) VALUES (?, ?)", "Both are correct", "Neither is correct"],
    correctAnswer: 2,
    explanation: "Both syntaxes are valid. The second one is more explicit and recommended."
  },
  {
    id: 95,
    question: "What does executeUpdate() return for an UPDATE statement?",
    options: ["Number of rows updated", "Updated data", "ResultSet", "boolean"],
    correctAnswer: 0,
    explanation: "executeUpdate() returns the number of rows affected (updated) by the UPDATE statement."
  },
  {
    id: 96,
    question: "What does executeUpdate() return for a DELETE statement?",
    options: ["Number of rows deleted", "Deleted data", "ResultSet", "boolean"],
    correctAnswer: 0,
    explanation: "executeUpdate() returns the number of rows affected (deleted) by the DELETE statement."
  },
  {
    id: 97,
    question: "What happens if UPDATE affects 0 rows?",
    options: ["SQLException", "Returns 0", "Returns -1", "Returns false"],
    correctAnswer: 1,
    explanation: "executeUpdate() returns 0 if no rows are affected (no matching records found)."
  },
  {
    id: 98,
    question: "What is the WHERE clause used for in UPDATE?",
    options: ["To specify which columns to update", "To specify which rows to update", "To specify new values", "To specify table name"],
    correctAnswer: 1,
    explanation: "WHERE clause in UPDATE specifies which rows should be updated. Without WHERE, all rows are updated."
  },
  {
    id: 99,
    question: "What is the WHERE clause used for in DELETE?",
    options: ["To specify which columns to delete", "To specify which rows to delete", "To specify table name", "To specify order"],
    correctAnswer: 1,
    explanation: "WHERE clause in DELETE specifies which rows should be deleted. Without WHERE, all rows are deleted."
  },
  {
    id: 100,
    question: "What is a safe way to prevent accidental deletion of all rows?",
    options: ["Always use WHERE clause", "Use transactions", "Use PreparedStatement", "All of the above"],
    correctAnswer: 3,
    explanation: "Always use WHERE clause, use transactions for rollback, and use PreparedStatement for safety."
  },
  {
    id: 101,
    question: "How do you update multiple columns in a single UPDATE statement?",
    options: ["Use multiple UPDATE statements", "Use SET col1=?, col2=? in one UPDATE", "Both work", "You can't update multiple columns"],
    correctAnswer: 2,
    explanation: "You can update multiple columns in one UPDATE: UPDATE table SET col1=?, col2=? WHERE id=?"
  },
  {
    id: 102,
    question: "What is the difference between DELETE and TRUNCATE?",
    options: ["No difference", "DELETE can be rolled back, TRUNCATE cannot", "TRUNCATE is faster", "Both B and C"],
    correctAnswer: 3,
    explanation: "DELETE can be rolled back and is slower. TRUNCATE is faster but cannot be rolled back (DDL operation)."
  },
  {
    id: 103,
    question: "Can you use PreparedStatement for SELECT queries?",
    options: ["No", "Yes", "Only for INSERT", "Only for UPDATE"],
    correctAnswer: 1,
    explanation: "Yes, PreparedStatement can be used for SELECT queries, especially useful for parameterized WHERE clauses."
  },
  {
    id: 104,
    question: "What is the advantage of using PreparedStatement for CRUD operations?",
    options: ["Prevents SQL injection", "Better performance", "Code reusability", "All of the above"],
    correctAnswer: 3,
    explanation: "PreparedStatement prevents SQL injection, performs better (precompiled), and allows code reusability."
  },
  {
    id: 105,
    question: "How do you check if an INSERT was successful?",
    options: ["Check return value of executeUpdate()", "Check if it's > 0", "Check for SQLException", "All of the above"],
    correctAnswer: 3,
    explanation: "If executeUpdate() returns > 0, the insert was successful. If it throws SQLException, it failed."
  },
  {
    id: 106,
    question: "What is a common pattern for checking if a record exists before inserting?",
    options: ["SELECT first, then INSERT if not found", "Use INSERT IGNORE", "Use ON DUPLICATE KEY UPDATE", "All of the above"],
    correctAnswer: 3,
    explanation: "You can SELECT first, use INSERT IGNORE (MySQL), or ON DUPLICATE KEY UPDATE depending on your database."
  },
  {
    id: 107,
    question: "What is the purpose of LIMIT clause in SELECT?",
    options: ["To limit columns", "To limit rows returned", "To limit execution time", "To limit memory"],
    correctAnswer: 1,
    explanation: "LIMIT clause limits the number of rows returned by a SELECT query."
  },
  {
    id: 108,
    question: "What is the purpose of ORDER BY clause in SELECT?",
    options: ["To filter rows", "To sort results", "To group rows", "To join tables"],
    correctAnswer: 1,
    explanation: "ORDER BY clause sorts the result set by specified column(s) in ascending or descending order."
  },
  {
    id: 109,
    question: "What is the purpose of WHERE clause in SELECT?",
    options: ["To filter rows", "To sort results", "To group rows", "To join tables"],
    correctAnswer: 0,
    explanation: "WHERE clause filters rows based on specified conditions in a SELECT query."
  },
  {
    id: 110,
    question: "How do you handle large result sets efficiently?",
    options: ["Use LIMIT and OFFSET", "Use pagination", "Use scrollable ResultSet", "All of the above"],
    correctAnswer: 3,
    explanation: "For large result sets, use LIMIT/OFFSET for pagination, or scrollable ResultSet for navigation."
  },

  // ========== TRANSACTION MANAGEMENT (20 questions) ==========
  {
    id: 111,
    question: "What is a database transaction?",
    options: ["A single SQL statement", "A group of SQL statements executed as a single unit", "A database connection", "A ResultSet"],
    correctAnswer: 1,
    explanation: "A transaction is a group of SQL statements executed as a single unit - all succeed or all fail."
  },
  {
    id: 112,
    question: "What are the ACID properties of transactions?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Integrity, Durability", "Atomicity, Correctness, Integrity, Durability", "All, Complete, Isolated, Done"],
    correctAnswer: 0,
    explanation: "ACID stands for Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (permanent)."
  },
  {
    id: 113,
    question: "What is the default transaction mode in JDBC?",
    options: ["Auto-commit ON", "Auto-commit OFF", "Manual commit", "Depends on database"],
    correctAnswer: 0,
    explanation: "By default, JDBC connections have auto-commit enabled (each statement is automatically committed)."
  },
  {
    id: 114,
    question: "How do you disable auto-commit in JDBC?",
    options: ["connection.setAutoCommit(false)", "connection.autoCommit(false)", "connection.disableAutoCommit()", "Statement.setAutoCommit(false)"],
    correctAnswer: 0,
    explanation: "connection.setAutoCommit(false) disables auto-commit mode, allowing manual transaction control."
  },
  {
    id: 115,
    question: "How do you commit a transaction manually?",
    options: ["connection.commit()", "connection.save()", "Statement.commit()", "Transaction.commit()"],
    correctAnswer: 0,
    explanation: "connection.commit() commits all changes made since the last commit/rollback."
  },
  {
    id: 116,
    question: "How do you rollback a transaction?",
    options: ["connection.rollback()", "connection.undo()", "Statement.rollback()", "Transaction.rollback()"],
    correctAnswer: 0,
    explanation: "connection.rollback() undoes all changes made since the last commit/rollback."
  },
  {
    id: 117,
    question: "What happens if you don't commit a transaction?",
    options: ["Changes are automatically saved", "Changes are lost when connection closes", "SQLException is thrown", "Nothing happens"],
    correctAnswer: 1,
    explanation: "If auto-commit is disabled and you don't commit, changes are rolled back when the connection closes."
  },
  {
    id: 118,
    question: "What is a savepoint?",
    options: ["A checkpoint in a transaction", "A backup point", "A rollback point", "All of the above"],
    correctAnswer: 0,
    explanation: "A savepoint is a point within a transaction that you can rollback to without rolling back the entire transaction."
  },
  {
    id: 119,
    question: "How do you create a savepoint?",
    options: ["connection.createSavepoint(name)", "connection.setSavepoint(name)", "Savepoint.create()", "Transaction.createSavepoint()"],
    correctAnswer: 1,
    explanation: "connection.setSavepoint(String name) creates a savepoint and returns a Savepoint object."
  },
  {
    id: 120,
    question: "How do you rollback to a savepoint?",
    options: ["connection.rollback(savepoint)", "connection.undo(savepoint)", "Savepoint.rollback()", "Transaction.rollback(savepoint)"],
    correctAnswer: 0,
    explanation: "connection.rollback(Savepoint savepoint) rolls back to the specified savepoint."
  },
  {
    id: 121,
    question: "What is transaction isolation level?",
    options: ["How transactions are isolated from each other", "Transaction security level", "Transaction performance level", "Transaction size limit"],
    correctAnswer: 0,
    explanation: "Isolation level determines how transactions are isolated from each other and what data they can see."
  },
  {
    id: 122,
    question: "What are the transaction isolation levels?",
    options: ["READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE", "LOW, MEDIUM, HIGH, MAXIMUM", "NONE, BASIC, ADVANCED, COMPLETE", "READ, WRITE, READ_WRITE, EXCLUSIVE"],
    correctAnswer: 0,
    explanation: "The four isolation levels are: READ_UNCOMMITTED (lowest), READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE (highest)."
  },
  {
    id: 123,
    question: "How do you set transaction isolation level?",
    options: ["connection.setTransactionIsolation(level)", "connection.setIsolation(level)", "Statement.setIsolation(level)", "Transaction.setIsolation(level)"],
    correctAnswer: 0,
    explanation: "connection.setTransactionIsolation(int level) sets the transaction isolation level."
  },
  {
    id: 124,
    question: "What is READ_UNCOMMITTED isolation level?",
    options: ["Can read uncommitted data (dirty reads)", "Can only read committed data", "No isolation", "Full isolation"],
    correctAnswer: 0,
    explanation: "READ_UNCOMMITTED allows reading uncommitted data from other transactions (dirty reads, lowest isolation)."
  },
  {
    id: 125,
    question: "What is SERIALIZABLE isolation level?",
    options: ["Lowest isolation", "Highest isolation, prevents all concurrency issues", "Medium isolation", "No transactions allowed"],
    correctAnswer: 1,
    explanation: "SERIALIZABLE is the highest isolation level, preventing dirty reads, non-repeatable reads, and phantom reads."
  },
  {
    id: 126,
    question: "What is a dirty read?",
    options: ["Reading committed data", "Reading uncommitted data that may be rolled back", "Reading old data", "Reading corrupted data"],
    correctAnswer: 1,
    explanation: "Dirty read occurs when a transaction reads data that has been modified by another uncommitted transaction."
  },
  {
    id: 127,
    question: "What is a non-repeatable read?",
    options: ["Reading the same data twice with different results", "Reading uncommitted data", "Reading committed data", "Not being able to read"],
    correctAnswer: 0,
    explanation: "Non-repeatable read occurs when a transaction reads the same row twice and gets different values."
  },
  {
    id: 128,
    question: "What is a phantom read?",
    options: ["Reading non-existent data", "New rows appearing in a result set when the same query is executed again", "Reading old data", "Reading corrupted data"],
    correctAnswer: 1,
    explanation: "Phantom read occurs when new rows appear in a result set when the same query is executed again in the same transaction."
  },
  {
    id: 129,
    question: "When should you use transactions?",
    options: ["For single statements", "For multiple related operations that must succeed or fail together", "Always", "Never"],
    correctAnswer: 1,
    explanation: "Use transactions when multiple operations must be atomic - all succeed or all fail together."
  },
  {
    id: 130,
    question: "What is the best practice for transaction management?",
    options: ["Always use auto-commit", "Disable auto-commit, use try-catch with commit/rollback", "Never commit", "Commit after every statement"],
    correctAnswer: 1,
    explanation: "Best practice: disable auto-commit, use try-catch-finally to commit on success or rollback on exception."
  }
];

// Function to randomly select 20 questions
export const getRandomQuestions = () => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
};



