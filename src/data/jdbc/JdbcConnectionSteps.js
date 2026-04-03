const jdbcConnectionSteps = {
  id: 'jdbc-connection-steps',
  title: 'JDBC Connection Steps',
  description: 'The 5 steps to connect Java to a database',
  content: `
# JDBC Connection Steps — Your First Database Connection

Connecting to a database in Java follows a predictable pattern. Once you learn these 5 steps, you can connect to any database — MySQL, PostgreSQL, Oracle, or SQL Server. Let's walk through each step.

> **Working connection examples:** [LearnStackHub/Jdbc](https://github.com/LearnStackHub/Jdbc) on GitHub — clone or download a ZIP (**Code**). \`git clone https://github.com/LearnStackHub/Jdbc.git\`

---

## The 5 Steps

\`\`\`
1. Load the Driver
2. Establish Connection
3. Create Statement
4. Execute Query
5. Close Resources
\`\`\`

---

## Step 1: Load the Driver

The driver is the bridge between Java and your database. Modern JDBC (4.0+) loads drivers automatically, but understanding this step helps with troubleshooting.

### Automatic Loading (JDBC 4.0+)

\`\`\`java
// Just add the driver JAR to classpath
// Driver loads automatically via ServiceLoader
\`\`\`

### Manual Loading (Legacy)

\`\`\`java
// MySQL
Class.forName("com.mysql.cj.jdbc.Driver");

// PostgreSQL
Class.forName("org.postgresql.Driver");

// Oracle
Class.forName("oracle.jdbc.driver.OracleDriver");

// SQL Server
Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
\`\`\`

---

## Step 2: Establish Connection

Create a connection using DriverManager with your database URL, username, and password.

### Connection URL Formats

\`\`\`java
// MySQL
String url = "jdbc:mysql://localhost:3306/mydb";

// PostgreSQL
String url = "jdbc:postgresql://localhost:5432/mydb";

// Oracle
String url = "jdbc:oracle:thin:@localhost:1521:orcl";

// SQL Server
String url = "jdbc:sqlserver://localhost:1433;databaseName=mydb";
\`\`\`

### Creating the Connection

\`\`\`java
String url = "jdbc:mysql://localhost:3306/mydb";
String username = "root";
String password = "password";

Connection conn = DriverManager.getConnection(url, username, password);
\`\`\`

### With Connection Properties

\`\`\`java
Properties props = new Properties();
props.setProperty("user", "root");
props.setProperty("password", "password");
props.setProperty("useSSL", "false");
props.setProperty("serverTimezone", "UTC");

Connection conn = DriverManager.getConnection(url, props);
\`\`\`

---

## Step 3: Create Statement

Statements are used to execute SQL queries. There are three types:

### Statement (Simple queries)

\`\`\`java
Statement stmt = conn.createStatement();
\`\`\`

### PreparedStatement (Parameterized queries — recommended)

\`\`\`java
String sql = "SELECT * FROM users WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, userId);
\`\`\`

### CallableStatement (Stored procedures)

\`\`\`java
String sql = "{call getUser(?)}";
CallableStatement cstmt = conn.prepareCall(sql);
cstmt.setInt(1, userId);
\`\`\`

---

## Step 4: Execute Query

Different methods for different operations:

### executeQuery() — For SELECT

\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    System.out.println(id + ": " + name);
}
\`\`\`

### executeUpdate() — For INSERT, UPDATE, DELETE

\`\`\`java
int rowsAffected = stmt.executeUpdate(
    "INSERT INTO users (name, email) VALUES (' Dattu', ' Dattu@email.com')");
System.out.println("Rows inserted: " + rowsAffected);
\`\`\`

### execute() — For any SQL

\`\`\`java
boolean hasResultSet = stmt.execute(sql);
if (hasResultSet) {
    ResultSet rs = stmt.getResultSet();
} else {
    int count = stmt.getUpdateCount();
}
\`\`\`

---

## Step 5: Close Resources

Always close resources in reverse order. Use try-with-resources for automatic cleanup.

### Manual Closing (Old way)

\`\`\`java
ResultSet rs = null;
Statement stmt = null;
Connection conn = null;

try {
    conn = DriverManager.getConnection(url, user, pass);
    stmt = conn.createStatement();
    rs = stmt.executeQuery("SELECT * FROM users");
    // Process results
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    // Close in reverse order
    if (rs != null) try { rs.close(); } catch (SQLException e) { }
    if (stmt != null) try { stmt.close(); } catch (SQLException e) { }
    if (conn != null) try { conn.close(); } catch (SQLException e) { }
}
\`\`\`

### Try-with-Resources (Recommended)

\`\`\`java
try (Connection conn = DriverManager.getConnection(url, user, pass);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
    
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
// Resources automatically closed!
\`\`\`

---

## Complete Example

\`\`\`java
public class JdbcExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "password";
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connected successfully!");
            
            // Create table
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(
                    "CREATE TABLE IF NOT EXISTS users (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "name VARCHAR(100), " +
                    "email VARCHAR(100))");
            }
            
            // Insert data
            String insertSql = "INSERT INTO users (name, email) VALUES (?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(insertSql)) {
                pstmt.setString(1, "Dattu p");
                pstmt.setString(2, " Dattu@email.com");
                pstmt.executeUpdate();
            }
            
            // Query data
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
                
                while (rs.next()) {
                    System.out.println(
                        rs.getInt("id") + ": " +
                        rs.getString("name") + " - " +
                        rs.getString("email"));
                }
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## Real-World: Connection Utility Class

\`\`\`java
public class DatabaseUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
    
    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        try { if (rs != null) rs.close(); } catch (SQLException e) { }
        try { if (stmt != null) stmt.close(); } catch (SQLException e) { }
        try { if (conn != null) conn.close(); } catch (SQLException e) { }
    }
}
\`\`\`

---

## Test Your Knowledge

Mastered JDBC connection steps? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering connection establishment, statements, and all JDBC topics!
---


## 10 Important JDBC Connection Steps Interview Questions

### 1. What are the standard JDBC connection steps?
**Answer:** The standard flow is load driver, create connection, create statement, execute SQL, process results, and close resources. Many people compress this mentally to five steps, but result processing and cleanup are equally critical. Interviewers expect lifecycle clarity from start to finish.

### 2. Why is driver loading discussed even when auto-loading exists?
**Answer:** Because troubleshooting older systems still requires understanding explicit loading behavior. If auto-discovery fails due to packaging issues, you need to reason about classpath and driver registration. This demonstrates practical debugging ability.

### 3. What makes a good JDBC URL and connection configuration?
**Answer:** A good configuration includes correct host/port/database, timezone/SSL options where needed, and credentials provided securely via environment config. Misconfigured URLs cause subtle runtime issues. Good answers mention both correctness and security.

### 4. Why is try-with-resources important in the connection flow?
**Answer:** It guarantees deterministic cleanup of Connection, Statement, and ResultSet, even during exceptions. This prevents leaks that can exhaust pool capacity in production. It is one of the highest-impact best practices in JDBC code.

### 5. How do you handle connection failures in robust systems?
**Answer:** Handle failures with clear error classification (network, auth, timeout), retries when appropriate, and useful logging for support teams. Blind retry loops are dangerous. A strong answer balances resilience with controlled behavior.

### 6. Why should statements be created as late as possible?
**Answer:** Creating statements only when needed reduces resource hold time and keeps transaction scopes cleaner. Long-lived statements can increase contention and memory footprint. Interviewers like when you discuss lifecycle minimization.

### 7. What should happen immediately after query execution?
**Answer:** You should process results carefully, map to domain objects, handle nulls/types correctly, and close result sets promptly. Data mapping errors are a frequent bug source. Strong answers include correctness and readability considerations.

### 8. How does this flow change when using connection pooling?
**Answer:** The coding flow is similar, but obtaining/closing a connection returns it to the pool instead of creating/destroying physical sockets each time. Pool settings then become central for throughput and latency. Mentioning this shows production awareness.

### 9. What diagnostics help when JDBC connection steps fail?
**Answer:** Useful diagnostics include SQL state/code, endpoint reachability, dependency verification, and DB-side logs. Clear context in logs shortens incident resolution time. Interviewers appreciate operational thinking here.

### 10. How would you explain JDBC connection steps to a junior developer?
**Answer:** Think of JDBC as a strict request lifecycle: connect, prepare, execute, read, and close safely every time. Following this pattern consistently avoids most beginner mistakes. This is the base habit that scales from small apps to enterprise services.

`,
  code: `// JDBC Connection Steps Demo
// Demonstrates the 5 steps to connect to a database

import java.util.*;

public class JdbcConnectionDemo {
    public static void main(String[] args) {
        System.out.println("=== JDBC Connection Steps Demo ===\\n");
        
        // Simulated database connection
        SimulatedDatabase db = new SimulatedDatabase();
        
        // STEP 1: LOAD DRIVER
        System.out.println("STEP 1: LOAD DRIVER");
        System.out.println("-------------------");
        System.out.println("Modern JDBC (4.0+) loads drivers automatically.");
        System.out.println("Just add the driver JAR to your classpath.");
        System.out.println();
        System.out.println("Driver classes:");
        System.out.println("  MySQL:      com.mysql.cj.jdbc.Driver");
        System.out.println("  PostgreSQL: org.postgresql.Driver");
        System.out.println("  Oracle:     oracle.jdbc.driver.OracleDriver");
        System.out.println("  SQL Server: com.microsoft.sqlserver.jdbc.SQLServerDriver");
        System.out.println();
        
        // STEP 2: ESTABLISH CONNECTION
        System.out.println("STEP 2: ESTABLISH CONNECTION");
        System.out.println("----------------------------");
        
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "password";
        
        System.out.println("Connection URL: " + url);
        System.out.println("Username: " + user);
        System.out.println("Password: ********");
        
        SimulatedConnection conn = db.getConnection(url, user, password);
        System.out.println("Connection established: " + conn);
        System.out.println();
        
        // STEP 3: CREATE STATEMENT
        System.out.println("STEP 3: CREATE STATEMENT");
        System.out.println("------------------------");
        
        System.out.println("Statement types:");
        System.out.println("  1. Statement - Simple queries");
        System.out.println("  2. PreparedStatement - Parameterized (recommended)");
        System.out.println("  3. CallableStatement - Stored procedures");
        System.out.println();
        
        SimulatedStatement stmt = conn.createStatement();
        System.out.println("Created Statement: " + stmt);
        System.out.println();
        
        // STEP 4: EXECUTE QUERY
        System.out.println("STEP 4: EXECUTE QUERY");
        System.out.println("---------------------");
        
        // Create table
        System.out.println("Creating table...");
        stmt.executeUpdate("CREATE TABLE users (id INT, name VARCHAR(100), email VARCHAR(100))");
        System.out.println("Table created!");
        System.out.println();
        
        // Insert data
        System.out.println("Inserting data...");
        stmt.executeUpdate("INSERT INTO users VALUES (1, 'Dattu p', ' Dattu@email.com')");
        stmt.executeUpdate("INSERT INTO users VALUES (2, 'Jane Smith', 'jane@email.com')");
        stmt.executeUpdate("INSERT INTO users VALUES (3, 'Bob Wilson', 'bob@email.com')");
        System.out.println("3 rows inserted!");
        System.out.println();
        
        // Query data
        System.out.println("Querying data...");
        System.out.println("SQL: SELECT * FROM users");
        System.out.println();
        
        SimulatedResultSet rs = stmt.executeQuery("SELECT * FROM users");
        
        System.out.println("Results:");
        System.out.println("+----+-------------+------------------+");
        System.out.println("| ID | Name        | Email            |");
        System.out.println("+----+-------------+------------------+");
        while (rs.next()) {
            System.out.printf("| %-2d | %-11s | %-16s |%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"));
        }
        System.out.println("+----+-------------+------------------+");
        System.out.println();
        
        // STEP 5: CLOSE RESOURCES
        System.out.println("STEP 5: CLOSE RESOURCES");
        System.out.println("-----------------------");
        System.out.println("Always close in reverse order: ResultSet -> Statement -> Connection");
        System.out.println();
        
        rs.close();
        System.out.println("ResultSet closed");
        
        stmt.close();
        System.out.println("Statement closed");
        
        conn.close();
        System.out.println("Connection closed");
        System.out.println();
        
        // TRY-WITH-RESOURCES EXAMPLE
        System.out.println("BEST PRACTICE: Try-with-Resources");
        System.out.println("----------------------------------");
        System.out.println("try (Connection conn = DriverManager.getConnection(url, user, pass);");
        System.out.println("     Statement stmt = conn.createStatement();");
        System.out.println("     ResultSet rs = stmt.executeQuery(sql)) {");
        System.out.println("    // Process results");
        System.out.println("} // Resources automatically closed!");
        System.out.println();
        
        // CONNECTION URL FORMATS
        System.out.println("CONNECTION URL FORMATS");
        System.out.println("----------------------");
        System.out.println("MySQL:      jdbc:mysql://host:3306/database");
        System.out.println("PostgreSQL: jdbc:postgresql://host:5432/database");
        System.out.println("Oracle:     jdbc:oracle:thin:@host:1521:sid");
        System.out.println("SQL Server: jdbc:sqlserver://host:1433;databaseName=db");
    }
}

// Simulated Database
class SimulatedDatabase {
    public SimulatedConnection getConnection(String url, String user, String password) {
        return new SimulatedConnection(url);
    }
}

// Simulated Connection
class SimulatedConnection {
    private String url;
    private boolean closed = false;
    
    SimulatedConnection(String url) {
        this.url = url;
    }
    
    public SimulatedStatement createStatement() {
        return new SimulatedStatement();
    }
    
    public void close() {
        closed = true;
    }
    
    public String toString() {
        return "Connection[" + url + "]";
    }
}

// Simulated Statement
class SimulatedStatement {
    private static List<Map<String, Object>> data = new ArrayList<>();
    private boolean closed = false;
    
    public int executeUpdate(String sql) {
        if (sql.startsWith("INSERT")) {
            // Parse simple INSERT
            String values = sql.substring(sql.indexOf("VALUES") + 7).trim();
            values = values.substring(1, values.length() - 1);  // Remove parentheses
            String[] parts = values.split(", ");
            
            Map<String, Object> row = new HashMap<>();
            row.put("id", Integer.parseInt(parts[0].trim()));
            row.put("name", parts[1].replace("'", "").trim());
            row.put("email", parts[2].replace("'", "").trim());
            data.add(row);
            
            return 1;
        }
        return 0;
    }
    
    public SimulatedResultSet executeQuery(String sql) {
        return new SimulatedResultSet(data);
    }
    
    public void close() {
        closed = true;
    }
    
    public String toString() {
        return "Statement[ready]";
    }
}

// Simulated ResultSet
class SimulatedResultSet {
    private List<Map<String, Object>> data;
    private int cursor = -1;
    private boolean closed = false;
    
    SimulatedResultSet(List<Map<String, Object>> data) {
        this.data = new ArrayList<>(data);
    }
    
    public boolean next() {
        cursor++;
        return cursor < data.size();
    }
    
    public int getInt(String column) {
        return (int) data.get(cursor).get(column);
    }
    
    public String getString(String column) {
        return (String) data.get(cursor).get(column);
    }
    
    public void close() {
        closed = true;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a database connection manager with connection pooling simulation',
      hint: 'Manage a pool of reusable connections',
      starterCode: `import java.util.*;

public class ConnectionPoolDemo {
    public static void main(String[] args) {
        System.out.println("=== Connection Pool Demo ===\\n");
        
        ConnectionPool pool = new ConnectionPool(3);  // Pool of 3 connections
        
        System.out.println("Pool created with 3 connections\\n");
        
        // Get connections
        System.out.println("Getting connections from pool:");
        Connection conn1 = pool.getConnection();
        System.out.println("  Got: " + conn1);
        
        Connection conn2 = pool.getConnection();
        System.out.println("  Got: " + conn2);
        
        Connection conn3 = pool.getConnection();
        System.out.println("  Got: " + conn3);
        
        System.out.println("\\nPool status: " + pool.getAvailableCount() + " available");
        
        // Try to get another (should wait or fail)
        System.out.println("\\nTrying to get 4th connection (pool exhausted)...");
        Connection conn4 = pool.getConnection();
        System.out.println("  Result: " + (conn4 != null ? conn4 : "No connection available"));
        
        // Return a connection
        System.out.println("\\nReturning conn1 to pool...");
        pool.releaseConnection(conn1);
        System.out.println("Pool status: " + pool.getAvailableCount() + " available");
        
        // Now we can get another
        System.out.println("\\nGetting connection again...");
        Connection conn5 = pool.getConnection();
        System.out.println("  Got: " + conn5);
    }
}

class Connection {
    private int id;
    private boolean inUse = false;
    
    Connection(int id) {
        this.id = id;
    }
    
    public int getId() { return id; }
    public boolean isInUse() { return inUse; }
    public void setInUse(boolean inUse) { this.inUse = inUse; }
    
    public String toString() {
        return "Connection-" + id;
    }
}

class ConnectionPool {
    private List<Connection> pool = new ArrayList<>();
    
    ConnectionPool(int size) {
        for (int i = 1; i <= size; i++) {
            pool.add(new Connection(i));
        }
    }
    
    public synchronized Connection getConnection() {
        for (Connection conn : pool) {
            if (!conn.isInUse()) {
                conn.setInUse(true);
                return conn;
            }
        }
        return null;  // No available connections
    }
    
    public synchronized void releaseConnection(Connection conn) {
        conn.setInUse(false);
    }
    
    public int getAvailableCount() {
        int count = 0;
        for (Connection conn : pool) {
            if (!conn.isInUse()) count++;
        }
        return count;
    }
}`
    }
  ]
};

export default jdbcConnectionSteps;
