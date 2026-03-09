const statementInterface = {
  id: 'statement-interface',
  title: 'Statement Interface',
  description: 'Executing SQL queries with Statement',
  content: `
# Statement Interface — Executing SQL Queries

The Statement interface is your tool for sending SQL commands to the database. While PreparedStatement is preferred for most cases, understanding Statement helps you grasp the fundamentals.

---

## Creating a Statement

\`\`\`java
Connection conn = DriverManager.getConnection(url, user, password);
Statement stmt = conn.createStatement();
\`\`\`

---

## Three Execution Methods

### 1. executeQuery() — For SELECT

Returns a ResultSet with the query results.

\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
while (rs.next()) {
    System.out.println(rs.getString("name"));
}
\`\`\`

### 2. executeUpdate() — For INSERT, UPDATE, DELETE, DDL

Returns the number of rows affected.

\`\`\`java
// INSERT
int inserted = stmt.executeUpdate(
    "INSERT INTO users (name, email) VALUES (' Dattu', ' Dattu@email.com')");
System.out.println("Rows inserted: " + inserted);

// UPDATE
int updated = stmt.executeUpdate(
    "UPDATE users SET email = 'new@email.com' WHERE id = 1");
System.out.println("Rows updated: " + updated);

// DELETE
int deleted = stmt.executeUpdate("DELETE FROM users WHERE id = 1");
System.out.println("Rows deleted: " + deleted);

// DDL (CREATE, ALTER, DROP)
stmt.executeUpdate("CREATE TABLE products (id INT, name VARCHAR(100))");
\`\`\`

### 3. execute() — For Any SQL

Returns true if result is a ResultSet, false otherwise.

\`\`\`java
boolean hasResultSet = stmt.execute(sql);

if (hasResultSet) {
    ResultSet rs = stmt.getResultSet();
    // Process results
} else {
    int updateCount = stmt.getUpdateCount();
    System.out.println("Rows affected: " + updateCount);
}
\`\`\`

---

## Batch Processing

Execute multiple SQL statements in one round trip to the database.

\`\`\`java
Statement stmt = conn.createStatement();

// Add statements to batch
stmt.addBatch("INSERT INTO users (name) VALUES (' Dattu')");
stmt.addBatch("INSERT INTO users (name) VALUES ('Jane')");
stmt.addBatch("INSERT INTO users (name) VALUES ('Bob')");

// Execute all at once
int[] results = stmt.executeBatch();

System.out.println("Batch results:");
for (int i = 0; i < results.length; i++) {
    System.out.println("Statement " + (i+1) + ": " + results[i] + " rows");
}
\`\`\`

### Batch with Transaction

\`\`\`java
try {
    conn.setAutoCommit(false);  // Start transaction
    
    Statement stmt = conn.createStatement();
    stmt.addBatch("INSERT INTO orders (product_id, quantity) VALUES (1, 10)");
    stmt.addBatch("UPDATE inventory SET stock = stock - 10 WHERE product_id = 1");
    
    int[] results = stmt.executeBatch();
    
    conn.commit();  // All succeeded
    System.out.println("Batch completed successfully");
    
} catch (SQLException e) {
    conn.rollback();  // Something failed, undo all
    System.out.println("Batch failed, rolled back");
}
\`\`\`

---

## Statement Options

### Scrollable ResultSet

\`\`\`java
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_INSENSITIVE,
    ResultSet.CONCUR_READ_ONLY
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// Move to last row
rs.last();
System.out.println("Last: " + rs.getString("name"));

// Move to first row
rs.first();
System.out.println("First: " + rs.getString("name"));

// Move to specific row
rs.absolute(3);
System.out.println("Row 3: " + rs.getString("name"));
\`\`\`

### Updatable ResultSet

\`\`\`java
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_SENSITIVE,
    ResultSet.CONCUR_UPDATABLE
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

while (rs.next()) {
    if (rs.getString("name").equals(" Dattu")) {
        rs.updateString("email", " Dattu.updated@email.com");
        rs.updateRow();  // Save changes
    }
}
\`\`\`

---

## Fetch Size and Timeout

\`\`\`java
Statement stmt = conn.createStatement();

// Fetch size - rows fetched at a time
stmt.setFetchSize(100);

// Query timeout in seconds
stmt.setQueryTimeout(30);

// Max rows to return
stmt.setMaxRows(1000);
\`\`\`

---

## Why Use PreparedStatement Instead?

Statement has limitations:

1. **SQL Injection Risk**
\`\`\`java
// DANGEROUS!
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
// If userInput = "'; DROP TABLE users; --" ... disaster!
\`\`\`

2. **No Query Caching**
\`\`\`java
// Each execution is parsed separately
stmt.executeQuery("SELECT * FROM users WHERE id = 1");
stmt.executeQuery("SELECT * FROM users WHERE id = 2");
// Database parses the query twice
\`\`\`

3. **Type Safety Issues**
\`\`\`java
// Manual string formatting is error-prone
String sql = "INSERT INTO users (name, age) VALUES ('" + name + "', " + age + ")";
\`\`\`

**Use Statement only for:**
- DDL statements (CREATE, ALTER, DROP)
- Simple, one-time queries
- Dynamic table/column names (can't parameterize these)

---

## Complete Example

\`\`\`java
public class StatementExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        
        try (Connection conn = DriverManager.getConnection(url, "root", "password");
             Statement stmt = conn.createStatement()) {
            
            // Create table
            stmt.executeUpdate(
                "CREATE TABLE IF NOT EXISTS products (" +
                "id INT AUTO_INCREMENT PRIMARY KEY, " +
                "name VARCHAR(100), " +
                "price DECIMAL(10,2))");
            
            // Batch insert
            stmt.addBatch("INSERT INTO products (name, price) VALUES ('Laptop', 999.99)");
            stmt.addBatch("INSERT INTO products (name, price) VALUES ('Mouse', 29.99)");
            stmt.addBatch("INSERT INTO products (name, price) VALUES ('Keyboard', 79.99)");
            stmt.executeBatch();
            
            // Query
            ResultSet rs = stmt.executeQuery("SELECT * FROM products");
            while (rs.next()) {
                System.out.printf("%d: %s - $%.2f%n",
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getDouble("price"));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## Test Your Knowledge

Mastered Statement interface? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering Statement, PreparedStatement, and all JDBC topics!
`,
  code: `// Statement Interface Demo
// Demonstrates different execution methods and batch processing

import java.util.*;

public class StatementDemo {
    public static void main(String[] args) {
        System.out.println("=== Statement Interface Demo ===\\n");
        
        // Create simulated connection and statement
        SimulatedConnection conn = new SimulatedConnection();
        SimulatedStatement stmt = conn.createStatement();
        
        // 1. EXECUTE UPDATE - DDL
        System.out.println("1. executeUpdate() - DDL (CREATE TABLE)");
        System.out.println("   ------------------------------------");
        String createSql = "CREATE TABLE products (id INT, name VARCHAR(100), price DECIMAL)";
        System.out.println("   SQL: " + createSql);
        int result = stmt.executeUpdate(createSql);
        System.out.println("   Result: Table created (0 rows affected)");
        System.out.println();
        
        // 2. EXECUTE UPDATE - INSERT
        System.out.println("2. executeUpdate() - INSERT");
        System.out.println("   -------------------------");
        
        String[] inserts = {
            "INSERT INTO products VALUES (1, 'Laptop', 999.99)",
            "INSERT INTO products VALUES (2, 'Mouse', 29.99)",
            "INSERT INTO products VALUES (3, 'Keyboard', 79.99)"
        };
        
        for (String sql : inserts) {
            System.out.println("   SQL: " + sql);
            result = stmt.executeUpdate(sql);
            System.out.println("   Rows affected: " + result);
        }
        System.out.println();
        
        // 3. EXECUTE QUERY - SELECT
        System.out.println("3. executeQuery() - SELECT");
        System.out.println("   ------------------------");
        String selectSql = "SELECT * FROM products";
        System.out.println("   SQL: " + selectSql);
        System.out.println();
        
        SimulatedResultSet rs = stmt.executeQuery(selectSql);
        
        System.out.println("   Results:");
        System.out.println("   +----+----------+--------+");
        System.out.println("   | ID | Name     | Price  |");
        System.out.println("   +----+----------+--------+");
        while (rs.next()) {
            System.out.printf("   | %-2d | %-8s | %6.2f |%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getDouble("price"));
        }
        System.out.println("   +----+----------+--------+");
        System.out.println();
        
        // 4. EXECUTE UPDATE - UPDATE
        System.out.println("4. executeUpdate() - UPDATE");
        System.out.println("   -------------------------");
        String updateSql = "UPDATE products SET price = 899.99 WHERE id = 1";
        System.out.println("   SQL: " + updateSql);
        result = stmt.executeUpdate(updateSql);
        System.out.println("   Rows affected: " + result);
        System.out.println();
        
        // 5. EXECUTE UPDATE - DELETE
        System.out.println("5. executeUpdate() - DELETE");
        System.out.println("   -------------------------");
        String deleteSql = "DELETE FROM products WHERE id = 3";
        System.out.println("   SQL: " + deleteSql);
        result = stmt.executeUpdate(deleteSql);
        System.out.println("   Rows affected: " + result);
        System.out.println();
        
        // 6. BATCH PROCESSING
        System.out.println("6. BATCH PROCESSING");
        System.out.println("   -----------------");
        
        SimulatedStatement batchStmt = conn.createStatement();
        
        System.out.println("   Adding to batch:");
        batchStmt.addBatch("INSERT INTO products VALUES (4, 'Monitor', 299.99)");
        System.out.println("     - INSERT Monitor");
        batchStmt.addBatch("INSERT INTO products VALUES (5, 'Webcam', 89.99)");
        System.out.println("     - INSERT Webcam");
        batchStmt.addBatch("INSERT INTO products VALUES (6, 'Headset', 149.99)");
        System.out.println("     - INSERT Headset");
        
        System.out.println("\\n   Executing batch...");
        int[] batchResults = batchStmt.executeBatch();
        
        System.out.println("   Batch results:");
        for (int i = 0; i < batchResults.length; i++) {
            System.out.println("     Statement " + (i+1) + ": " + batchResults[i] + " row(s) affected");
        }
        System.out.println();
        
        // 7. EXECUTE() METHOD
        System.out.println("7. execute() - Generic Execution");
        System.out.println("   ------------------------------");
        
        String sql1 = "SELECT * FROM products";
        System.out.println("   SQL: " + sql1);
        boolean hasResultSet = stmt.execute(sql1);
        System.out.println("   Has ResultSet: " + hasResultSet);
        
        String sql2 = "UPDATE products SET price = price * 1.1";
        System.out.println("\\n   SQL: " + sql2);
        hasResultSet = stmt.execute(sql2);
        System.out.println("   Has ResultSet: " + hasResultSet);
        System.out.println("   Update count: " + stmt.getUpdateCount());
        System.out.println();
        
        // 8. STATEMENT OPTIONS
        System.out.println("8. STATEMENT OPTIONS");
        System.out.println("   ------------------");
        System.out.println("   setFetchSize(100)    - Fetch 100 rows at a time");
        System.out.println("   setQueryTimeout(30)  - 30 second timeout");
        System.out.println("   setMaxRows(1000)     - Return max 1000 rows");
        System.out.println();
        
        // 9. WHY USE PREPAREDSTATEMENT
        System.out.println("9. WHY USE PreparedStatement INSTEAD?");
        System.out.println("   ------------------------------------");
        System.out.println("   Statement limitations:");
        System.out.println("   1. SQL Injection vulnerability");
        System.out.println("   2. No query plan caching");
        System.out.println("   3. Manual type conversion");
        System.out.println();
        System.out.println("   Use Statement only for:");
        System.out.println("   - DDL (CREATE, ALTER, DROP)");
        System.out.println("   - Simple one-time queries");
        System.out.println("   - Dynamic table/column names");
    }
}

// Simulated Connection
class SimulatedConnection {
    public SimulatedStatement createStatement() {
        return new SimulatedStatement();
    }
}

// Simulated Statement
class SimulatedStatement {
    private static List<Map<String, Object>> products = new ArrayList<>();
    private List<String> batch = new ArrayList<>();
    private int lastUpdateCount = 0;
    
    public int executeUpdate(String sql) {
        sql = sql.toUpperCase();
        
        if (sql.startsWith("CREATE") || sql.startsWith("DROP") || sql.startsWith("ALTER")) {
            return 0;
        }
        
        if (sql.startsWith("INSERT")) {
            Map<String, Object> row = parseInsert(sql);
            if (row != null) {
                products.add(row);
                lastUpdateCount = 1;
                return 1;
            }
        }
        
        if (sql.startsWith("UPDATE")) {
            lastUpdateCount = products.size();
            return products.size();
        }
        
        if (sql.startsWith("DELETE")) {
            if (products.size() > 0) {
                products.remove(products.size() - 1);
                lastUpdateCount = 1;
                return 1;
            }
        }
        
        return 0;
    }
    
    public SimulatedResultSet executeQuery(String sql) {
        return new SimulatedResultSet(new ArrayList<>(products));
    }
    
    public boolean execute(String sql) {
        sql = sql.toUpperCase().trim();
        if (sql.startsWith("SELECT")) {
            return true;
        }
        executeUpdate(sql);
        return false;
    }
    
    public int getUpdateCount() {
        return lastUpdateCount;
    }
    
    public void addBatch(String sql) {
        batch.add(sql);
    }
    
    public int[] executeBatch() {
        int[] results = new int[batch.size()];
        for (int i = 0; i < batch.size(); i++) {
            results[i] = executeUpdate(batch.get(i));
        }
        batch.clear();
        return results;
    }
    
    private Map<String, Object> parseInsert(String sql) {
        try {
            String values = sql.substring(sql.indexOf("VALUES") + 6).trim();
            values = values.substring(1, values.length() - 1);
            String[] parts = values.split(",");
            
            Map<String, Object> row = new HashMap<>();
            row.put("id", Integer.parseInt(parts[0].trim()));
            row.put("name", parts[1].replace("'", "").trim());
            row.put("price", Double.parseDouble(parts[2].trim()));
            return row;
        } catch (Exception e) {
            return null;
        }
    }
}

// Simulated ResultSet
class SimulatedResultSet {
    private List<Map<String, Object>> data;
    private int cursor = -1;
    
    SimulatedResultSet(List<Map<String, Object>> data) {
        this.data = data;
    }
    
    public boolean next() {
        cursor++;
        return cursor < data.size();
    }
    
    public int getInt(String column) {
        return (int) data.get(cursor).get(column.toLowerCase());
    }
    
    public String getString(String column) {
        return (String) data.get(cursor).get(column.toLowerCase());
    }
    
    public double getDouble(String column) {
        return (double) data.get(cursor).get(column.toLowerCase());
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a SQL executor that handles different query types',
      hint: 'Detect query type and use appropriate execute method',
      starterCode: `import java.util.*;

public class SqlExecutorDemo {
    public static void main(String[] args) {
        System.out.println("=== SQL Executor Demo ===\\n");
        
        SqlExecutor executor = new SqlExecutor();
        
        // Test different SQL types
        String[] queries = {
            "CREATE TABLE users (id INT, name VARCHAR(100))",
            "INSERT INTO users VALUES (1, ' Dattu')",
            "SELECT * FROM users",
            "UPDATE users SET name = 'Jane' WHERE id = 1",
            "DELETE FROM users WHERE id = 1",
            "DROP TABLE users"
        };
        
        for (String sql : queries) {
            System.out.println("SQL: " + sql);
            executor.execute(sql);
            System.out.println();
        }
    }
}

class SqlExecutor {
    public void execute(String sql) {
        String type = detectQueryType(sql);
        System.out.println("  Type: " + type);
        
        switch (type) {
            case "SELECT":
                System.out.println("  Method: executeQuery()");
                System.out.println("  Returns: ResultSet");
                break;
            case "INSERT":
            case "UPDATE":
            case "DELETE":
                System.out.println("  Method: executeUpdate()");
                System.out.println("  Returns: int (rows affected)");
                break;
            case "DDL":
                System.out.println("  Method: executeUpdate()");
                System.out.println("  Returns: 0 (no rows affected)");
                break;
            default:
                System.out.println("  Method: execute()");
                System.out.println("  Returns: boolean (has ResultSet?)");
        }
    }
    
    private String detectQueryType(String sql) {
        sql = sql.trim().toUpperCase();
        
        if (sql.startsWith("SELECT")) return "SELECT";
        if (sql.startsWith("INSERT")) return "INSERT";
        if (sql.startsWith("UPDATE")) return "UPDATE";
        if (sql.startsWith("DELETE")) return "DELETE";
        if (sql.startsWith("CREATE") || sql.startsWith("DROP") || 
            sql.startsWith("ALTER") || sql.startsWith("TRUNCATE")) {
            return "DDL";
        }
        
        return "UNKNOWN";
    }
}`
    }
  ]
};

export default statementInterface;
