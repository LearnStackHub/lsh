const resultSetInterface = {
  id: 'resultset-interface',
  title: 'ResultSet Interface',
  description: 'Reading and navigating query results',
  content: `
# ResultSet — Reading Your Query Results

When you execute a SELECT query, the database returns a ResultSet. Think of it as a cursor that moves through your data row by row. Understanding ResultSet is essential for retrieving data from your database.

> **ResultSet walkthrough code:** [LearnStackHub/Jdbc](https://github.com/LearnStackHub/Jdbc) on GitHub — clone or download a ZIP (**Code**). \`git clone https://github.com/LearnStackHub/Jdbc.git\`

---

## Basic ResultSet Usage

\`\`\`java
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

while (rs.next()) {  // Move to next row
    int id = rs.getInt("id");
    String name = rs.getString("name");
    String email = rs.getString("email");
    System.out.println(id + ": " + name + " - " + email);
}

rs.close();
\`\`\`

---

## Getting Data by Column Name vs Index

### By Column Name (Recommended)

\`\`\`java
String name = rs.getString("name");
int age = rs.getInt("age");
double salary = rs.getDouble("salary");
\`\`\`

### By Column Index (1-based)

\`\`\`java
String name = rs.getString(1);   // First column
int age = rs.getInt(2);          // Second column
double salary = rs.getDouble(3); // Third column
\`\`\`

**Tip:** Use column names for readability and maintainability. Column indices can break if the query changes.

---

## Getter Methods

### Primitive Types

\`\`\`java
int id = rs.getInt("id");
long bigId = rs.getLong("big_id");
double price = rs.getDouble("price");
float rate = rs.getFloat("rate");
boolean active = rs.getBoolean("active");
byte flag = rs.getByte("flag");
short code = rs.getShort("code");
\`\`\`

### String and Text

\`\`\`java
String name = rs.getString("name");
String description = rs.getString("description");
\`\`\`

### Date and Time

\`\`\`java
java.sql.Date date = rs.getDate("birth_date");
java.sql.Time time = rs.getTime("start_time");
java.sql.Timestamp timestamp = rs.getTimestamp("created_at");

// Convert to LocalDate/LocalDateTime (Java 8+)
LocalDate localDate = rs.getDate("birth_date").toLocalDate();
LocalDateTime localDateTime = rs.getTimestamp("created_at").toLocalDateTime();
\`\`\`

### Binary Data

\`\`\`java
byte[] data = rs.getBytes("file_data");
InputStream stream = rs.getBinaryStream("image");
Blob blob = rs.getBlob("document");
\`\`\`

### Large Text

\`\`\`java
Reader reader = rs.getCharacterStream("content");
Clob clob = rs.getClob("article");
\`\`\`

---

## Handling NULL Values

\`\`\`java
// Check if value was NULL
int age = rs.getInt("age");
if (rs.wasNull()) {
    System.out.println("Age is NULL");
}

// For objects, NULL is returned directly
String email = rs.getString("email");
if (email == null) {
    System.out.println("Email is NULL");
}

// Using getObject for nullable primitives
Integer age = (Integer) rs.getObject("age");
if (age == null) {
    // Handle NULL
}
\`\`\`

---

## ResultSet Types

### Forward-Only (Default)

\`\`\`java
Statement stmt = conn.createStatement();
// or
Statement stmt = conn.createStatement(
    ResultSet.TYPE_FORWARD_ONLY,
    ResultSet.CONCUR_READ_ONLY
);
\`\`\`

### Scrollable ResultSet

\`\`\`java
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_INSENSITIVE,  // or TYPE_SCROLL_SENSITIVE
    ResultSet.CONCUR_READ_ONLY
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// Navigation methods
rs.first();          // Move to first row
rs.last();           // Move to last row
rs.absolute(5);      // Move to row 5
rs.relative(2);      // Move 2 rows forward
rs.relative(-1);     // Move 1 row backward
rs.beforeFirst();    // Move before first row
rs.afterLast();      // Move after last row
rs.previous();       // Move to previous row

// Position checks
rs.isFirst();        // Am I at first row?
rs.isLast();         // Am I at last row?
rs.isBeforeFirst();  // Am I before first?
rs.isAfterLast();    // Am I after last?
rs.getRow();         // Current row number
\`\`\`

### Updatable ResultSet

\`\`\`java
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_SENSITIVE,
    ResultSet.CONCUR_UPDATABLE
);

ResultSet rs = stmt.executeQuery("SELECT * FROM users");

while (rs.next()) {
    if (rs.getString("status").equals("pending")) {
        // Update current row
        rs.updateString("status", "active");
        rs.updateTimestamp("updated_at", new Timestamp(System.currentTimeMillis()));
        rs.updateRow();  // Save changes
    }
}

// Insert new row
rs.moveToInsertRow();
rs.updateString("name", "New User");
rs.updateString("email", "new@email.com");
rs.insertRow();
rs.moveToCurrentRow();

// Delete current row
rs.absolute(3);
rs.deleteRow();
\`\`\`

---

## ResultSetMetaData

Get information about the result structure:

\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
ResultSetMetaData meta = rs.getMetaData();

int columnCount = meta.getColumnCount();
System.out.println("Columns: " + columnCount);

for (int i = 1; i <= columnCount; i++) {
    System.out.println("Column " + i + ":");
    System.out.println("  Name: " + meta.getColumnName(i));
    System.out.println("  Type: " + meta.getColumnTypeName(i));
    System.out.println("  Size: " + meta.getColumnDisplaySize(i));
    System.out.println("  Nullable: " + meta.isNullable(i));
}
\`\`\`

---

## Best Practices

### 1. Always Close ResultSet

\`\`\`java
// Try-with-resources (recommended)
try (ResultSet rs = stmt.executeQuery(sql)) {
    while (rs.next()) {
        // Process
    }
}  // Automatically closed

// Manual closing
ResultSet rs = null;
try {
    rs = stmt.executeQuery(sql);
    // Process
} finally {
    if (rs != null) rs.close();
}
\`\`\`

### 2. Process Results Efficiently

\`\`\`java
// Set fetch size for large results
stmt.setFetchSize(100);

// Don't load everything into memory
while (rs.next()) {
    processRow(rs);  // Process one at a time
}
\`\`\`

### 3. Map to Objects

\`\`\`java
public User mapRow(ResultSet rs) throws SQLException {
    User user = new User();
    user.setId(rs.getInt("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
    user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
    return user;
}

List<User> users = new ArrayList<>();
while (rs.next()) {
    users.add(mapRow(rs));
}
\`\`\`

---

## Complete Example

\`\`\`java
public class ResultSetExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        
        try (Connection conn = DriverManager.getConnection(url, "root", "password");
             Statement stmt = conn.createStatement(
                 ResultSet.TYPE_SCROLL_INSENSITIVE,
                 ResultSet.CONCUR_READ_ONLY);
             ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
            
            // Get metadata
            ResultSetMetaData meta = rs.getMetaData();
            System.out.println("Columns: " + meta.getColumnCount());
            
            // Forward iteration
            System.out.println("\\nAll users:");
            while (rs.next()) {
                System.out.println(rs.getInt("id") + ": " + rs.getString("name"));
            }
            
            // Go to last row
            rs.last();
            System.out.println("\\nLast user: " + rs.getString("name"));
            
            // Go to first row
            rs.first();
            System.out.println("First user: " + rs.getString("name"));
            
            // Row count
            rs.last();
            System.out.println("\\nTotal rows: " + rs.getRow());
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## Test Your Knowledge

Mastered ResultSet interface? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering ResultSet, data retrieval, and all JDBC topics!
---


## 10 Important ResultSet Interface Interview Questions

### 1. What is ResultSet in JDBC?
**Answer:** ResultSet is the tabular cursor object that represents rows returned by a SELECT query. It lets you iterate row by row and extract typed column values. Understanding cursor behavior is fundamental for correct data mapping.

### 2. What is the difference between accessing columns by name and index?
**Answer:** Access by name is clearer and safer against select-list reorder changes, while index can be slightly faster but more error-prone. In most business code, readability and maintainability favor column names. Interviewers appreciate this trade-off explanation.

### 3. How do you correctly handle NULL values in ResultSet?
**Answer:** Use getter methods carefully and call wasNull when needed for primitive getters, or use object getters where appropriate. Ignoring null handling can produce silent data bugs. This is a common mapping pitfall.

### 4. What are ResultSet types and why do they matter?
**Answer:** ResultSet can be forward-only, scroll-insensitive, or scroll-sensitive, with varying navigation capabilities and cost. Choosing richer cursor types than needed may add overhead. Good answers connect capability choice with performance impact.

### 5. What is ResultSet concurrency mode?
**Answer:** Concurrency modes define whether rows are read-only or updatable through the ResultSet. Most applications use read-only result sets for clarity and efficiency. Updatable result sets are less common and require careful usage.

### 6. What is ResultSetMetaData used for?
**Answer:** It provides column-level metadata such as names, types, and counts, useful for generic mappers and dynamic reporting tools. It is especially helpful when schema or selected columns vary at runtime.

### 7. What are common ResultSet performance issues?
**Answer:** Fetching too many columns, large unbounded result sets, and poor fetch-size settings can increase memory and latency. Limiting selected columns and paginating queries are practical optimization techniques. Mentioning these shows production awareness.

### 8. How should ResultSet be mapped to domain objects?
**Answer:** Mapping should be explicit, type-safe, and centralized so conversion logic is easy to test and maintain. Avoid scattered inline mapping in large methods. Structured mapping reduces long-term maintenance cost.

### 9. What are lifecycle best practices for ResultSet?
**Answer:** Process rows promptly, avoid holding cursors longer than necessary, and always close ResultSet/Statement/Connection reliably. Cursor leaks can become severe under concurrency. Try-with-resources is the recommended pattern.

### 10. How would you explain ResultSet in an interview one-liner?
**Answer:** ResultSet is JDBC’s row cursor abstraction used to safely and efficiently read SQL query results into application models. Correct navigation, null handling, and cleanup are critical for reliable data access code.

`,
  code: `// ResultSet Interface Demo
// Demonstrates reading and navigating query results

import java.util.*;

public class ResultSetDemo {
    public static void main(String[] args) {
        System.out.println("=== ResultSet Interface Demo ===\\n");
        
        // Create simulated data
        SimulatedStatement stmt = new SimulatedStatement();
        stmt.addData(1, "Dattu p", " Dattu@email.com", 25, 50000.0, true, "2024-01-15");
        stmt.addData(2, "Jane Smith", "jane@email.com", 30, 65000.0, true, "2024-02-20");
        stmt.addData(3, "Bob Wilson", "bob@email.com", 35, 75000.0, false, "2024-03-10");
        stmt.addData(4, "Alice Brown", "alice@email.com", 28, 55000.0, true, "2024-04-05");
        stmt.addData(5, "Charlie Davis", "charlie@email.com", 32, 70000.0, true, "2024-05-12");
        
        // 1. BASIC ITERATION
        System.out.println("1. BASIC ITERATION");
        System.out.println("   ----------------");
        
        SimulatedResultSet rs = stmt.executeQuery("SELECT * FROM users");
        
        System.out.println("   while (rs.next()) { ... }");
        System.out.println();
        System.out.println("   +----+---------------+---------------------+-----+");
        System.out.println("   | ID | Name          | Email               | Age |");
        System.out.println("   +----+---------------+---------------------+-----+");
        
        while (rs.next()) {
            System.out.printf("   | %-2d | %-13s | %-19s | %-3d |%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"),
                rs.getInt("age"));
        }
        System.out.println("   +----+---------------+---------------------+-----+");
        System.out.println();
        
        // 2. GETTER METHODS
        System.out.println("2. GETTER METHODS");
        System.out.println("   ---------------");
        
        rs = stmt.executeQuery("SELECT * FROM users");
        rs.next();  // Move to first row
        
        System.out.println("   First row data:");
        System.out.println("     getInt('id'): " + rs.getInt("id"));
        System.out.println("     getString('name'): " + rs.getString("name"));
        System.out.println("     getString('email'): " + rs.getString("email"));
        System.out.println("     getInt('age'): " + rs.getInt("age"));
        System.out.println("     getDouble('salary'): " + rs.getDouble("salary"));
        System.out.println("     getBoolean('active'): " + rs.getBoolean("active"));
        System.out.println("     getString('created_at'): " + rs.getString("created_at"));
        System.out.println();
        
        // 3. COLUMN NAME VS INDEX
        System.out.println("3. COLUMN NAME VS INDEX");
        System.out.println("   ---------------------");
        
        rs = stmt.executeQuery("SELECT * FROM users");
        rs.next();
        
        System.out.println("   By column name (recommended):");
        System.out.println("     rs.getString('name'): " + rs.getString("name"));
        System.out.println();
        System.out.println("   By column index (1-based):");
        System.out.println("     rs.getString(2): " + rs.getString(2));
        System.out.println();
        
        // 4. SCROLLABLE RESULTSET
        System.out.println("4. SCROLLABLE RESULTSET");
        System.out.println("   ---------------------");
        
        SimulatedScrollableResultSet scrollRs = stmt.executeScrollableQuery("SELECT * FROM users");
        
        System.out.println("   Navigation methods:");
        
        scrollRs.first();
        System.out.println("     first(): " + scrollRs.getString("name"));
        
        scrollRs.last();
        System.out.println("     last(): " + scrollRs.getString("name"));
        
        scrollRs.absolute(3);
        System.out.println("     absolute(3): " + scrollRs.getString("name"));
        
        scrollRs.relative(-1);
        System.out.println("     relative(-1): " + scrollRs.getString("name"));
        
        scrollRs.previous();
        System.out.println("     previous(): " + scrollRs.getString("name"));
        
        System.out.println();
        System.out.println("   Position checks:");
        scrollRs.first();
        System.out.println("     isFirst(): " + scrollRs.isFirst());
        scrollRs.last();
        System.out.println("     isLast(): " + scrollRs.isLast());
        System.out.println("     getRow(): " + scrollRs.getRow());
        System.out.println();
        
        // 5. RESULTSET METADATA
        System.out.println("5. RESULTSET METADATA");
        System.out.println("   -------------------");
        
        rs = stmt.executeQuery("SELECT * FROM users");
        SimulatedResultSetMetaData meta = rs.getMetaData();
        
        System.out.println("   Column count: " + meta.getColumnCount());
        System.out.println();
        System.out.println("   Column details:");
        for (int i = 1; i <= meta.getColumnCount(); i++) {
            System.out.println("     Column " + i + ":");
            System.out.println("       Name: " + meta.getColumnName(i));
            System.out.println("       Type: " + meta.getColumnTypeName(i));
        }
        System.out.println();
        
        // 6. HANDLING NULL VALUES
        System.out.println("6. HANDLING NULL VALUES");
        System.out.println("   ---------------------");
        System.out.println("   // Check if value was NULL");
        System.out.println("   int age = rs.getInt('age');");
        System.out.println("   if (rs.wasNull()) {");
        System.out.println("       System.out.println('Age is NULL');");
        System.out.println("   }");
        System.out.println();
        System.out.println("   // For objects, NULL is returned directly");
        System.out.println("   String email = rs.getString('email');");
        System.out.println("   if (email == null) {");
        System.out.println("       System.out.println('Email is NULL');");
        System.out.println("   }");
        System.out.println();
        
        // 7. MAPPING TO OBJECTS
        System.out.println("7. MAPPING TO OBJECTS");
        System.out.println("   -------------------");
        
        rs = stmt.executeQuery("SELECT * FROM users");
        List<User> users = new ArrayList<>();
        
        while (rs.next()) {
            User user = new User();
            user.id = rs.getInt("id");
            user.name = rs.getString("name");
            user.email = rs.getString("email");
            user.age = rs.getInt("age");
            users.add(user);
        }
        
        System.out.println("   Mapped " + users.size() + " users to objects:");
        for (User user : users) {
            System.out.println("     " + user);
        }
        System.out.println();
        
        // 8. RESULTSET TYPES
        System.out.println("8. RESULTSET TYPES");
        System.out.println("   ----------------");
        System.out.println("   TYPE_FORWARD_ONLY (default):");
        System.out.println("     - Can only move forward with next()");
        System.out.println("     - Most efficient");
        System.out.println();
        System.out.println("   TYPE_SCROLL_INSENSITIVE:");
        System.out.println("     - Can scroll in any direction");
        System.out.println("     - Doesn't see database changes");
        System.out.println();
        System.out.println("   TYPE_SCROLL_SENSITIVE:");
        System.out.println("     - Can scroll in any direction");
        System.out.println("     - Sees database changes");
        System.out.println();
        System.out.println("   CONCUR_READ_ONLY (default):");
        System.out.println("     - Cannot update through ResultSet");
        System.out.println();
        System.out.println("   CONCUR_UPDATABLE:");
        System.out.println("     - Can update, insert, delete rows");
    }
}

// User class for mapping
class User {
    int id;
    String name;
    String email;
    int age;
    
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', age=" + age + "}";
    }
}

// Simulated Statement
class SimulatedStatement {
    private List<Map<String, Object>> data = new ArrayList<>();
    
    public void addData(int id, String name, String email, int age, 
                        double salary, boolean active, String createdAt) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", id);
        row.put("name", name);
        row.put("email", email);
        row.put("age", age);
        row.put("salary", salary);
        row.put("active", active);
        row.put("created_at", createdAt);
        data.add(row);
    }
    
    public SimulatedResultSet executeQuery(String sql) {
        return new SimulatedResultSet(new ArrayList<>(data));
    }
    
    public SimulatedScrollableResultSet executeScrollableQuery(String sql) {
        return new SimulatedScrollableResultSet(new ArrayList<>(data));
    }
}

// Simulated ResultSet
class SimulatedResultSet {
    protected List<Map<String, Object>> data;
    protected int cursor = -1;
    protected List<String> columnNames;
    
    SimulatedResultSet(List<Map<String, Object>> data) {
        this.data = data;
        if (!data.isEmpty()) {
            this.columnNames = new ArrayList<>(data.get(0).keySet());
        }
    }
    
    public boolean next() {
        cursor++;
        return cursor < data.size();
    }
    
    public int getInt(String column) {
        Object value = data.get(cursor).get(column);
        return value instanceof Integer ? (int) value : 0;
    }
    
    public int getInt(int columnIndex) {
        String column = columnNames.get(columnIndex - 1);
        return getInt(column);
    }
    
    public String getString(String column) {
        Object value = data.get(cursor).get(column);
        return value != null ? value.toString() : null;
    }
    
    public String getString(int columnIndex) {
        String column = columnNames.get(columnIndex - 1);
        return getString(column);
    }
    
    public double getDouble(String column) {
        Object value = data.get(cursor).get(column);
        return value instanceof Double ? (double) value : 0.0;
    }
    
    public boolean getBoolean(String column) {
        Object value = data.get(cursor).get(column);
        return value instanceof Boolean ? (boolean) value : false;
    }
    
    public SimulatedResultSetMetaData getMetaData() {
        return new SimulatedResultSetMetaData(columnNames, data.isEmpty() ? null : data.get(0));
    }
}

// Simulated Scrollable ResultSet
class SimulatedScrollableResultSet extends SimulatedResultSet {
    
    SimulatedScrollableResultSet(List<Map<String, Object>> data) {
        super(data);
    }
    
    public void first() {
        cursor = 0;
    }
    
    public void last() {
        cursor = data.size() - 1;
    }
    
    public void absolute(int row) {
        cursor = row - 1;
    }
    
    public void relative(int rows) {
        cursor += rows;
    }
    
    public void previous() {
        cursor--;
    }
    
    public boolean isFirst() {
        return cursor == 0;
    }
    
    public boolean isLast() {
        return cursor == data.size() - 1;
    }
    
    public int getRow() {
        return cursor + 1;
    }
}

// Simulated ResultSetMetaData
class SimulatedResultSetMetaData {
    private List<String> columnNames;
    private Map<String, Object> sampleRow;
    
    SimulatedResultSetMetaData(List<String> columnNames, Map<String, Object> sampleRow) {
        this.columnNames = columnNames;
        this.sampleRow = sampleRow;
    }
    
    public int getColumnCount() {
        return columnNames.size();
    }
    
    public String getColumnName(int column) {
        return columnNames.get(column - 1);
    }
    
    public String getColumnTypeName(int column) {
        if (sampleRow == null) return "UNKNOWN";
        Object value = sampleRow.get(columnNames.get(column - 1));
        if (value instanceof Integer) return "INTEGER";
        if (value instanceof Double) return "DOUBLE";
        if (value instanceof Boolean) return "BOOLEAN";
        return "VARCHAR";
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a result set processor that exports data to different formats',
      hint: 'Support CSV, JSON, and table format output',
      starterCode: `import java.util.*;

public class ResultSetExporterDemo {
    public static void main(String[] args) {
        System.out.println("=== ResultSet Exporter Demo ===\\n");
        
        // Create sample data
        List<Map<String, Object>> data = new ArrayList<>();
        data.add(createRow(1, "Dattu p", " Dattu@email.com", 25));
        data.add(createRow(2, "Jane Smith", "jane@email.com", 30));
        data.add(createRow(3, "Bob Wilson", "bob@email.com", 35));
        
        ResultSetExporter exporter = new ResultSetExporter(data);
        
        // Export as table
        System.out.println("TABLE FORMAT:");
        System.out.println(exporter.toTable());
        
        // Export as CSV
        System.out.println("CSV FORMAT:");
        System.out.println(exporter.toCsv());
        
        // Export as JSON
        System.out.println("JSON FORMAT:");
        System.out.println(exporter.toJson());
    }
    
    static Map<String, Object> createRow(int id, String name, String email, int age) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", id);
        row.put("name", name);
        row.put("email", email);
        row.put("age", age);
        return row;
    }
}

class ResultSetExporter {
    private List<Map<String, Object>> data;
    private List<String> columns;
    
    ResultSetExporter(List<Map<String, Object>> data) {
        this.data = data;
        this.columns = new ArrayList<>(data.get(0).keySet());
    }
    
    public String toTable() {
        StringBuilder sb = new StringBuilder();
        
        // Header
        sb.append("+----+-------------+------------------+-----+\\n");
        sb.append("| ID | Name        | Email            | Age |\\n");
        sb.append("+----+-------------+------------------+-----+\\n");
        
        // Data rows
        for (Map<String, Object> row : data) {
            sb.append(String.format("| %-2d | %-11s | %-16s | %-3d |%n",
                row.get("id"), row.get("name"), row.get("email"), row.get("age")));
        }
        
        sb.append("+----+-------------+------------------+-----+\\n");
        return sb.toString();
    }
    
    public String toCsv() {
        StringBuilder sb = new StringBuilder();
        
        // Header
        sb.append(String.join(",", columns)).append("\\n");
        
        // Data rows
        for (Map<String, Object> row : data) {
            List<String> values = new ArrayList<>();
            for (String col : columns) {
                values.add(String.valueOf(row.get(col)));
            }
            sb.append(String.join(",", values)).append("\\n");
        }
        
        return sb.toString();
    }
    
    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("[\\n");
        
        for (int i = 0; i < data.size(); i++) {
            Map<String, Object> row = data.get(i);
            sb.append("  {");
            
            List<String> pairs = new ArrayList<>();
            for (String col : columns) {
                Object value = row.get(col);
                if (value instanceof String) {
                    pairs.add("\\"" + col + "\\": \\"" + value + "\\"");
                } else {
                    pairs.add("\\"" + col + "\\": " + value);
                }
            }
            
            sb.append(String.join(", ", pairs));
            sb.append("}");
            
            if (i < data.size() - 1) sb.append(",");
            sb.append("\\n");
        }
        
        sb.append("]\\n");
        return sb.toString();
    }
}`
    }
  ]
};

export default resultSetInterface;
