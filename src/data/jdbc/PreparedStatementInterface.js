const preparedStatementInterface = {
  id: 'prepared-statement',
  title: 'PreparedStatement Interface',
  description: 'Safe and efficient parameterized queries',
  content: `
# PreparedStatement — The Right Way to Query

PreparedStatement is the preferred way to execute SQL in Java. It prevents SQL injection, improves performance through query caching, and makes your code cleaner. If you're writing JDBC code, you should be using PreparedStatement.

---

## Why PreparedStatement?

### 1. SQL Injection Prevention

**Statement (Vulnerable):**
\`\`\`java
String userInput = "'; DROP TABLE users; --";
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
// Executes: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
// Your table is gone!
\`\`\`

**PreparedStatement (Safe):**
\`\`\`java
String sql = "SELECT * FROM users WHERE name = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, userInput);
// The input is treated as data, not SQL code
\`\`\`

### 2. Performance (Query Caching)

\`\`\`java
// Statement - parsed every time
for (int i = 0; i < 1000; i++) {
    stmt.executeQuery("SELECT * FROM users WHERE id = " + i);
    // Database parses 1000 times
}

// PreparedStatement - parsed once
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
for (int i = 0; i < 1000; i++) {
    pstmt.setInt(1, i);
    pstmt.executeQuery();
    // Database parses once, executes 1000 times
}
\`\`\`

### 3. Type Safety

\`\`\`java
// Automatic type handling
pstmt.setInt(1, 42);
pstmt.setString(2, " Dattu");
pstmt.setDouble(3, 99.99);
pstmt.setDate(4, new java.sql.Date(System.currentTimeMillis()));
pstmt.setBoolean(5, true);
\`\`\`

---

## Creating PreparedStatement

\`\`\`java
String sql = "SELECT * FROM users WHERE id = ? AND status = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
\`\`\`

---

## Setting Parameters

Parameters are numbered starting from 1 (not 0!).

### Common Setter Methods

\`\`\`java
pstmt.setInt(1, 42);                    // Integer
pstmt.setLong(2, 123456789L);           // Long
pstmt.setDouble(3, 99.99);              // Double
pstmt.setFloat(4, 3.14f);               // Float
pstmt.setString(5, " Dattu");             // String
pstmt.setBoolean(6, true);              // Boolean
pstmt.setDate(7, sqlDate);              // java.sql.Date
pstmt.setTimestamp(8, timestamp);       // java.sql.Timestamp
pstmt.setNull(9, Types.VARCHAR);        // NULL value
pstmt.setBytes(10, byteArray);          // Binary data
pstmt.setBlob(11, inputStream);         // Large binary
pstmt.setClob(12, reader);              // Large text
\`\`\`

### Handling NULL Values

\`\`\`java
String email = user.getEmail();
if (email != null) {
    pstmt.setString(1, email);
} else {
    pstmt.setNull(1, Types.VARCHAR);
}
\`\`\`

---

## CRUD Operations

### Create (INSERT)

\`\`\`java
String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "Dattu p");
    pstmt.setString(2, " Dattu@email.com");
    pstmt.setInt(3, 25);
    
    int rowsInserted = pstmt.executeUpdate();
    System.out.println("Inserted: " + rowsInserted + " row(s)");
}
\`\`\`

### Get Generated Keys

\`\`\`java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql, 
        Statement.RETURN_GENERATED_KEYS)) {
    
    pstmt.setString(1, " Dattu");
    pstmt.setString(2, " Dattu@email.com");
    pstmt.executeUpdate();
    
    // Get the auto-generated ID
    ResultSet keys = pstmt.getGeneratedKeys();
    if (keys.next()) {
        int newId = keys.getInt(1);
        System.out.println("New user ID: " + newId);
    }
}
\`\`\`

### Read (SELECT)

\`\`\`java
String sql = "SELECT * FROM users WHERE age > ? AND status = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 18);
    pstmt.setString(2, "active");
    
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    }
}
\`\`\`

### Update

\`\`\`java
String sql = "UPDATE users SET email = ?, updated_at = ? WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "new.email@example.com");
    pstmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
    pstmt.setInt(3, userId);
    
    int rowsUpdated = pstmt.executeUpdate();
    System.out.println("Updated: " + rowsUpdated + " row(s)");
}
\`\`\`

### Delete

\`\`\`java
String sql = "DELETE FROM users WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, userId);
    
    int rowsDeleted = pstmt.executeUpdate();
    System.out.println("Deleted: " + rowsDeleted + " row(s)");
}
\`\`\`

---

## Batch Processing

\`\`\`java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    
    // Add multiple sets of parameters
    String[][] users = {
        {" Dattu", " Dattu@email.com"},
        {"Jane", "jane@email.com"},
        {"Bob", "bob@email.com"}
    };
    
    for (String[] user : users) {
        pstmt.setString(1, user[0]);
        pstmt.setString(2, user[1]);
        pstmt.addBatch();
    }
    
    // Execute all at once
    int[] results = pstmt.executeBatch();
    
    int total = 0;
    for (int count : results) {
        total += count;
    }
    System.out.println("Total inserted: " + total);
}
\`\`\`

---

## Reusing PreparedStatement

\`\`\`java
String sql = "SELECT * FROM products WHERE category = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    
    // Query electronics
    pstmt.setString(1, "Electronics");
    ResultSet rs1 = pstmt.executeQuery();
    // Process results...
    rs1.close();
    
    // Reuse for books
    pstmt.setString(1, "Books");
    ResultSet rs2 = pstmt.executeQuery();
    // Process results...
    rs2.close();
    
    // Reuse for clothing
    pstmt.setString(1, "Clothing");
    ResultSet rs3 = pstmt.executeQuery();
    // Process results...
}
\`\`\`

---

## Real-World Example: User Service

\`\`\`java
public class UserService {
    private Connection conn;
    
    public User findById(int id) throws SQLException {
        String sql = "SELECT * FROM users WHERE id = ?";
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToUser(rs);
                }
            }
        }
        return null;
    }
    
    public List<User> findByStatus(String status) throws SQLException {
        String sql = "SELECT * FROM users WHERE status = ? ORDER BY name";
        List<User> users = new ArrayList<>();
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, status);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    users.add(mapResultSetToUser(rs));
                }
            }
        }
        return users;
    }
    
    public int create(User user) throws SQLException {
        String sql = "INSERT INTO users (name, email, status) VALUES (?, ?, ?)";
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql, 
                Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getEmail());
            pstmt.setString(3, "active");
            pstmt.executeUpdate();
            
            ResultSet keys = pstmt.getGeneratedKeys();
            if (keys.next()) {
                return keys.getInt(1);
            }
        }
        return -1;
    }
    
    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setStatus(rs.getString("status"));
        return user;
    }
}
\`\`\`

---

## Test Your Knowledge

Mastered PreparedStatement? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering PreparedStatement, parameterized queries, and all JDBC topics!
`,
  code: `// PreparedStatement Demo
// Demonstrates safe, parameterized queries

import java.util.*;

public class PreparedStatementDemo {
    public static void main(String[] args) {
        System.out.println("=== PreparedStatement Demo ===\\n");
        
        SimulatedConnection conn = new SimulatedConnection();
        
        // 1. SQL INJECTION PREVENTION
        System.out.println("1. SQL INJECTION PREVENTION");
        System.out.println("   -------------------------");
        
        String maliciousInput = "'; DROP TABLE users; --";
        
        System.out.println("   Malicious input: " + maliciousInput);
        System.out.println();
        
        System.out.println("   Statement (VULNERABLE):");
        String unsafeSql = "SELECT * FROM users WHERE name = '" + maliciousInput + "'";
        System.out.println("   SQL: " + unsafeSql);
        System.out.println("   DANGER: This would execute DROP TABLE!");
        System.out.println();
        
        System.out.println("   PreparedStatement (SAFE):");
        System.out.println("   SQL: SELECT * FROM users WHERE name = ?");
        System.out.println("   Parameter 1: " + maliciousInput);
        System.out.println("   Result: Input treated as data, not SQL code");
        System.out.println();
        
        // 2. CREATING PREPAREDSTATEMENT
        System.out.println("2. CREATING PREPAREDSTATEMENT");
        System.out.println("   ---------------------------");
        
        String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        System.out.println("   SQL: " + sql);
        
        SimulatedPreparedStatement pstmt = conn.prepareStatement(sql);
        System.out.println("   PreparedStatement created");
        System.out.println();
        
        // 3. SETTING PARAMETERS
        System.out.println("3. SETTING PARAMETERS");
        System.out.println("   -------------------");
        
        System.out.println("   pstmt.setString(1, \\"Dattu p\\")");
        pstmt.setString(1, "Dattu p");
        
        System.out.println("   pstmt.setString(2, \\" Dattu@email.com\\")");
        pstmt.setString(2, " Dattu@email.com");
        
        System.out.println("   pstmt.setInt(3, 25)");
        pstmt.setInt(3, 25);
        
        System.out.println();
        System.out.println("   Final SQL: " + pstmt.getResolvedSql());
        System.out.println();
        
        // 4. EXECUTE INSERT
        System.out.println("4. EXECUTE INSERT");
        System.out.println("   ---------------");
        
        int rows = pstmt.executeUpdate();
        System.out.println("   Rows inserted: " + rows);
        System.out.println();
        
        // 5. EXECUTE SELECT
        System.out.println("5. EXECUTE SELECT");
        System.out.println("   ---------------");
        
        String selectSql = "SELECT * FROM users WHERE age > ?";
        SimulatedPreparedStatement selectStmt = conn.prepareStatement(selectSql);
        selectStmt.setInt(1, 18);
        
        System.out.println("   SQL: " + selectSql);
        System.out.println("   Parameter 1: 18");
        System.out.println();
        
        SimulatedResultSet rs = selectStmt.executeQuery();
        
        System.out.println("   Results:");
        System.out.println("   +----+----------+------------------+-----+");
        System.out.println("   | ID | Name     | Email            | Age |");
        System.out.println("   +----+----------+------------------+-----+");
        while (rs.next()) {
            System.out.printf("   | %-2d | %-8s | %-16s | %-3d |%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"),
                rs.getInt("age"));
        }
        System.out.println("   +----+----------+------------------+-----+");
        System.out.println();
        
        // 6. BATCH PROCESSING
        System.out.println("6. BATCH PROCESSING");
        System.out.println("   -----------------");
        
        String batchSql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        SimulatedPreparedStatement batchStmt = conn.prepareStatement(batchSql);
        
        String[][] users = {
            {"Jane Smith", "jane@email.com", "30"},
            {"Bob Wilson", "bob@email.com", "35"},
            {"Alice Brown", "alice@email.com", "28"}
        };
        
        System.out.println("   Adding to batch:");
        for (String[] user : users) {
            batchStmt.setString(1, user[0]);
            batchStmt.setString(2, user[1]);
            batchStmt.setInt(3, Integer.parseInt(user[2]));
            batchStmt.addBatch();
            System.out.println("     - " + user[0]);
        }
        
        System.out.println("\\n   Executing batch...");
        int[] results = batchStmt.executeBatch();
        
        int total = 0;
        for (int r : results) total += r;
        System.out.println("   Total rows inserted: " + total);
        System.out.println();
        
        // 7. PARAMETER TYPES
        System.out.println("7. COMMON PARAMETER TYPES");
        System.out.println("   -----------------------");
        System.out.println("   setInt(index, value)       - Integer");
        System.out.println("   setLong(index, value)      - Long");
        System.out.println("   setDouble(index, value)    - Double");
        System.out.println("   setString(index, value)    - String");
        System.out.println("   setBoolean(index, value)   - Boolean");
        System.out.println("   setDate(index, value)      - java.sql.Date");
        System.out.println("   setTimestamp(index, value) - java.sql.Timestamp");
        System.out.println("   setNull(index, Types.XXX)  - NULL value");
        System.out.println("   setBytes(index, value)     - Binary data");
        System.out.println();
        
        // 8. PERFORMANCE COMPARISON
        System.out.println("8. PERFORMANCE COMPARISON");
        System.out.println("   -----------------------");
        System.out.println("   Statement:");
        System.out.println("     - Query parsed every execution");
        System.out.println("     - 1000 executions = 1000 parses");
        System.out.println();
        System.out.println("   PreparedStatement:");
        System.out.println("     - Query parsed once, cached");
        System.out.println("     - 1000 executions = 1 parse");
        System.out.println("     - Much faster for repeated queries!");
    }
}

// Simulated Connection
class SimulatedConnection {
    public SimulatedPreparedStatement prepareStatement(String sql) {
        return new SimulatedPreparedStatement(sql);
    }
}

// Simulated PreparedStatement
class SimulatedPreparedStatement {
    private String sql;
    private Map<Integer, Object> parameters = new HashMap<>();
    private List<Map<Integer, Object>> batch = new ArrayList<>();
    private static List<Map<String, Object>> database = new ArrayList<>();
    private static int idCounter = 0;
    
    SimulatedPreparedStatement(String sql) {
        this.sql = sql;
    }
    
    public void setString(int index, String value) {
        parameters.put(index, value);
    }
    
    public void setInt(int index, int value) {
        parameters.put(index, value);
    }
    
    public void setDouble(int index, double value) {
        parameters.put(index, value);
    }
    
    public int executeUpdate() {
        if (sql.toUpperCase().contains("INSERT")) {
            Map<String, Object> row = new HashMap<>();
            row.put("id", ++idCounter);
            row.put("name", parameters.get(1));
            row.put("email", parameters.get(2));
            row.put("age", parameters.get(3));
            database.add(row);
            return 1;
        }
        return 0;
    }
    
    public SimulatedResultSet executeQuery() {
        return new SimulatedResultSet(new ArrayList<>(database));
    }
    
    public void addBatch() {
        batch.add(new HashMap<>(parameters));
        parameters.clear();
    }
    
    public int[] executeBatch() {
        int[] results = new int[batch.size()];
        for (int i = 0; i < batch.size(); i++) {
            parameters = batch.get(i);
            results[i] = executeUpdate();
        }
        batch.clear();
        return results;
    }
    
    public String getResolvedSql() {
        String resolved = sql;
        for (int i = 1; i <= parameters.size(); i++) {
            Object value = parameters.get(i);
            String replacement = value instanceof String ? "'" + value + "'" : String.valueOf(value);
            resolved = resolved.replaceFirst("\\\\?", replacement);
        }
        return resolved;
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
        Object value = data.get(cursor).get(column);
        return value instanceof Integer ? (int) value : 0;
    }
    
    public String getString(String column) {
        Object value = data.get(cursor).get(column);
        return value != null ? value.toString() : null;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a user repository with CRUD operations using PreparedStatement',
      hint: 'Implement findById, findAll, create, update, and delete methods',
      starterCode: `import java.util.*;

public class UserRepositoryDemo {
    public static void main(String[] args) {
        System.out.println("=== User Repository Demo ===\\n");
        
        UserRepository repo = new UserRepository();
        
        // Create users
        System.out.println("Creating users...");
        int id1 = repo.create(new User("Dattu p", " Dattu@email.com"));
        int id2 = repo.create(new User("Jane Smith", "jane@email.com"));
        int id3 = repo.create(new User("Bob Wilson", "bob@email.com"));
        System.out.println("Created users with IDs: " + id1 + ", " + id2 + ", " + id3);
        System.out.println();
        
        // Find all
        System.out.println("All users:");
        for (User user : repo.findAll()) {
            System.out.println("  " + user);
        }
        System.out.println();
        
        // Find by ID
        System.out.println("Find user with ID " + id1 + ":");
        User found = repo.findById(id1);
        System.out.println("  " + found);
        System.out.println();
        
        // Update
        System.out.println("Updating user " + id1 + "...");
        found.setEmail(" Dattu.updated@email.com");
        repo.update(found);
        System.out.println("Updated: " + repo.findById(id1));
        System.out.println();
        
        // Delete
        System.out.println("Deleting user " + id3 + "...");
        repo.delete(id3);
        System.out.println("Remaining users:");
        for (User user : repo.findAll()) {
            System.out.println("  " + user);
        }
    }
}

class User {
    private int id;
    private String name;
    private String email;
    
    User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}

class UserRepository {
    private List<User> database = new ArrayList<>();
    private int idCounter = 0;
    
    public int create(User user) {
        user.setId(++idCounter);
        database.add(user);
        return user.getId();
    }
    
    public User findById(int id) {
        for (User user : database) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }
    
    public List<User> findAll() {
        return new ArrayList<>(database);
    }
    
    public void update(User user) {
        for (int i = 0; i < database.size(); i++) {
            if (database.get(i).getId() == user.getId()) {
                database.set(i, user);
                return;
            }
        }
    }
    
    public void delete(int id) {
        database.removeIf(user -> user.getId() == id);
    }
}`
    }
  ]
};

export default preparedStatementInterface;
