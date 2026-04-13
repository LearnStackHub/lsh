const crudOperations = {
  id: 'crud-operations',
  title: 'CRUD Operations',
  description: 'Create, Read, Update, Delete with JDBC',
  content: `
# CRUD Operations — The Four Pillars of Data Management

Every database application does four basic things: **C**reate, **R**ead, **U**pdate, and **D**elete. Master these, and you can build any data-driven application.

> **CRUD sample JDBC code:** [LearnStackHub/Jdbc](https://github.com/LearnStackHub/Jdbc) on GitHub — clone or download a ZIP (**Code**). \`git clone https://github.com/LearnStackHub/Jdbc.git\`

---

## Setting Up

First, let's create a sample table:

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## CREATE — Inserting Data

### Basic Insert

\`\`\`java
String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "Dattu p");
    pstmt.setString(2, " Dattu@email.com");
    pstmt.setInt(3, 25);
    
    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) inserted");
}
\`\`\`

### Get Generated Key

\`\`\`java
String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
    pstmt.setString(1, "Jane Doe");
    pstmt.setString(2, "jane@email.com");
    pstmt.setInt(3, 28);
    
    pstmt.executeUpdate();
    
    ResultSet keys = pstmt.getGeneratedKeys();
    if (keys.next()) {
        int newId = keys.getInt(1);
        System.out.println("New user ID: " + newId);
    }
}
\`\`\`

### Batch Insert

\`\`\`java
String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    conn.setAutoCommit(false);
    
    String[][] users = {
        {"Alice", "alice@email.com", "30"},
        {"Bob", "bob@email.com", "35"},
        {"Charlie", "charlie@email.com", "28"}
    };
    
    for (String[] user : users) {
        pstmt.setString(1, user[0]);
        pstmt.setString(2, user[1]);
        pstmt.setInt(3, Integer.parseInt(user[2]));
        pstmt.addBatch();
    }
    
    int[] results = pstmt.executeBatch();
    conn.commit();
    
    System.out.println("Inserted " + results.length + " users");
}
\`\`\`

---

## READ — Querying Data

### Select All

\`\`\`java
String sql = "SELECT * FROM users";

try (Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(sql)) {
    
    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        String email = rs.getString("email");
        int age = rs.getInt("age");
        
        System.out.println(id + ": " + name + " (" + email + ") - " + age);
    }
}
\`\`\`

### Select with Condition

\`\`\`java
String sql = "SELECT * FROM users WHERE age > ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 25);
    
    ResultSet rs = pstmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name") + " - " + rs.getInt("age"));
    }
}
\`\`\`

### Select Single Record

\`\`\`java
String sql = "SELECT * FROM users WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 1);
    
    ResultSet rs = pstmt.executeQuery();
    if (rs.next()) {
        System.out.println("Found: " + rs.getString("name"));
    } else {
        System.out.println("User not found");
    }
}
\`\`\`

### Count Records

\`\`\`java
String sql = "SELECT COUNT(*) FROM users";

try (Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(sql)) {
    
    if (rs.next()) {
        int count = rs.getInt(1);
        System.out.println("Total users: " + count);
    }
}
\`\`\`

---

## UPDATE — Modifying Data

### Update Single Record

\`\`\`java
String sql = "UPDATE users SET age = ? WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 26);  // new age
    pstmt.setInt(2, 1);   // user id
    
    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) updated");
}
\`\`\`

### Update Multiple Fields

\`\`\`java
String sql = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, " Dattu Smith");
    pstmt.setString(2, " Dattu.smith@email.com");
    pstmt.setInt(3, 27);
    pstmt.setInt(4, 1);
    
    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) updated");
}
\`\`\`

### Conditional Update

\`\`\`java
String sql = "UPDATE users SET age = age + 1 WHERE age < ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 30);
    
    int rowsAffected = pstmt.executeUpdate();
    System.out.println("Incremented age for " + rowsAffected + " users");
}
\`\`\`

---

## DELETE — Removing Data

### Delete Single Record

\`\`\`java
String sql = "DELETE FROM users WHERE id = ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 1);
    
    int rowsAffected = pstmt.executeUpdate();
    if (rowsAffected > 0) {
        System.out.println("User deleted");
    } else {
        System.out.println("User not found");
    }
}
\`\`\`

### Delete with Condition

\`\`\`java
String sql = "DELETE FROM users WHERE age < ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 18);
    
    int rowsAffected = pstmt.executeUpdate();
    System.out.println("Deleted " + rowsAffected + " users");
}
\`\`\`

### Delete All (Be Careful!)

\`\`\`java
String sql = "DELETE FROM users";

try (Statement stmt = conn.createStatement()) {
    int rowsAffected = stmt.executeUpdate(sql);
    System.out.println("Deleted all " + rowsAffected + " users");
}
\`\`\`

---

## Real-World Example: User DAO

\`\`\`java
public class UserDAO {
    private Connection conn;
    
    public UserDAO(Connection conn) {
        this.conn = conn;
    }
    
    // CREATE
    public int create(User user) throws SQLException {
        String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getEmail());
            pstmt.setInt(3, user.getAge());
            pstmt.executeUpdate();
            
            ResultSet keys = pstmt.getGeneratedKeys();
            return keys.next() ? keys.getInt(1) : -1;
        }
    }
    
    // READ
    public User findById(int id) throws SQLException {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return mapUser(rs);
            }
            return null;
        }
    }
    
    // UPDATE
    public boolean update(User user) throws SQLException {
        String sql = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getEmail());
            pstmt.setInt(3, user.getAge());
            pstmt.setInt(4, user.getId());
            return pstmt.executeUpdate() > 0;
        }
    }
    
    // DELETE
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM users WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        }
    }
    
    private User mapUser(ResultSet rs) throws SQLException {
        return new User(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("email"),
            rs.getInt("age")
        );
    }
}
\`\`\`

---

## Best Practices

1. **Always use PreparedStatement** — Prevents SQL injection
2. **Use try-with-resources** — Auto-closes connections
3. **Use transactions for multiple operations** — Ensures data consistency
4. **Validate input before database operations** — Fail fast
5. **Handle null values properly** — Use \`wasNull()\` method

---

## Test Your Knowledge

Mastered CRUD operations? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering all JDBC topics including CRUD operations!
---


## 10 Important CRUD Operations Interview Questions

### 1. What does CRUD mean in JDBC context?
**Short Answer:** CRUD means Create, Read, Update, and Delete operations performed against a database from Java.
**Detailed Explanation:** In JDBC, CRUD represents the core lifecycle of data in most applications. Create adds new records, Read fetches records, Update modifies existing records, and Delete removes records. These are not just SQL keywords. They define how business state moves through your system. This page teaches CRUD with practical JDBC patterns like prepared statements, result mapping, and transaction awareness. Interviewers ask this question to confirm foundational clarity before moving to deeper design topics. A strong answer explains that reliable CRUD requires safe SQL execution, clear mapping between relational data and objects, and predictable behavior under concurrent access and failure scenarios.

### 2. How should Create operations be implemented safely?
**Short Answer:** Use PreparedStatement, validate inputs, handle generated keys, and manage constraint errors properly.
**Detailed Explanation:** Safe Create operations begin with parameterized SQL using PreparedStatement, which prevents injection and ensures correct data typing. Input validation should happen before execution so invalid data is rejected early. If your table uses auto-generated ids, capture generated keys reliably for downstream logic. You also need clear handling for unique and foreign key constraint violations to maintain data integrity. In this tutorial context, Create is not just inserting rows, it is about trustworthy record creation in production conditions. Interviewers value answers that connect security, validation, and failure handling together, showing that you understand both correctness and robustness in JDBC write operations.

### 3. What are best practices for Read operations?
**Short Answer:** Read only needed columns, filter with indexes, paginate large results, and map ResultSet carefully.
**Detailed Explanation:** Efficient Read operations focus on precision and scalability. Query only the columns you actually need, use indexed predicates for filtering, and paginate large result sets to avoid memory spikes. ResultSet mapping should be deterministic and type-safe so application objects are built correctly every time. Avoid broad queries that return unnecessary data, especially in high-traffic endpoints. On this page, Read examples are practical interview preparation because many performance issues start with careless select queries. A strong answer mentions both SQL quality and mapping quality, showing that fetching data is not complete until it is accurately transformed into application-friendly structures.

### 4. What should be considered in Update operations?
**Short Answer:** Use precise where clauses, verify affected rows, and protect against concurrent overwrite issues.
**Detailed Explanation:** Update operations must be carefully scoped so only intended records are changed. A weak or missing predicate can update too many rows and create severe data corruption. It is also good practice to check affected row count to confirm expected behavior. In concurrent systems, optimistic locking or version checks help avoid silently overwriting another transaction’s work. This tutorial positions Update as controlled state transition, not simple assignment. Interviewers often expect mention of consistency safeguards because production defects frequently come from careless updates. A complete answer links SQL correctness with concurrency awareness and clear post-update verification logic.

### 5. What are common risks in Delete operations?
**Short Answer:** Main risks are accidental data loss, broken relationships, and irreversible operations without safeguards.
**Detailed Explanation:** Delete operations are high-risk because mistakes can remove critical data quickly. Common failures include broad predicates, missing transaction boundaries, and ignoring foreign key relationships. In many business systems, soft delete strategies are preferred so data can be recovered and audit history is preserved. Even hard deletes should include strict conditions and verification. This page teaches CRUD with production awareness, so interviewers expect you to discuss recoverability, not only syntax. A strong answer highlights that safe deletion requires planning, guardrails, and rollback strategy. Deleting data responsibly is a reliability concern, not just a command execution step.

### 6. How do CRUD operations relate to DAO design?
**Short Answer:** DAO encapsulates CRUD SQL details and exposes domain-focused methods to upper layers.
**Detailed Explanation:** DAO design keeps SQL logic in one dedicated layer so services and controllers remain focused on business rules. CRUD methods in DAO should accept clear inputs, return domain-relevant outputs, and hide low-level JDBC plumbing like connection handling and statement creation. Transaction orchestration is usually coordinated at service level for multi-step workflows. This separation improves testability, readability, and maintainability as projects grow. In this tutorial interview context, DAO is important because it prevents SQL from being scattered across the codebase. A strong answer shows understanding of layering responsibilities and how clean boundaries reduce coupling and simplify long-term refactoring.

### 7. How do transactions affect multi-step CRUD flows?
**Short Answer:** Transactions ensure multiple CRUD steps either all succeed together or all roll back together.
**Detailed Explanation:** Real business operations often involve several CRUD actions that must be treated as one logical unit. With JDBC, this means disabling auto-commit, executing all required statements, and committing only after every validation passes. If any step fails, rollback is required to keep data consistent. This is essential in workflows like order placement, payment processing, or inventory updates where partial success is unacceptable. In this tutorial page, transaction control is a core interview topic because reliability depends on it. A complete answer should show understanding of atomicity, failure handling, and why transaction boundaries must align with business use cases.

### 8. What performance techniques help CRUD-heavy services?
**Short Answer:** Use batching, indexing, connection pooling, and efficient query design validated with real load tests.
**Detailed Explanation:** CRUD-heavy services need both database and application-level optimization. Batching reduces round trips for bulk writes, indexes speed up lookups and updates, and connection pooling avoids expensive connection setup costs. Query shape also matters, including selecting only required columns and minimizing unnecessary calls. Performance tuning should be driven by realistic datasets and measured metrics, not assumptions. In this tutorial context, interviewers expect practical tuning awareness rather than generic statements. A strong answer explains that optimization is iterative: identify bottlenecks, apply targeted improvements, and verify impact through profiling and load testing while preserving correctness under concurrency.

### 9. How should CRUD errors be handled and surfaced?
**Short Answer:** Capture technical details for logs, then translate errors into safe and meaningful service responses.
**Detailed Explanation:** Effective CRUD error handling separates internal diagnostics from external communication. At the JDBC layer, capture SQL state, vendor codes, and operation context for troubleshooting. At service or API boundaries, translate these into user-safe messages and stable error codes without exposing raw SQL internals. This improves security, user experience, and support workflows. In this tutorial’s interview framing, strong answers mention both logging quality and response quality. You need enough information for engineers to debug quickly, while clients receive predictable and understandable outcomes. This structured handling prevents confusion and builds trust in data-driven features.

### 10. How would you summarize CRUD interview expectations?
**Short Answer:** Interviewers expect safe SQL, correct mapping, transaction discipline, and production-ready reliability thinking.
**Detailed Explanation:** A complete CRUD interview answer should show more than command familiarity. You should demonstrate secure parameterized queries, accurate result mapping, proper transaction management, and careful handling of performance and errors. Interviewers want to see that you can build data flows that remain correct under real-world conditions such as concurrency, invalid input, and system failure. This page prepares that mindset by combining examples with design considerations. The strongest summary frames CRUD as a reliability responsibility across layers, from JDBC execution to API behavior. That practical perspective differentiates strong backend candidates from those who only memorize SQL keywords.

---

## Deep Theory: CRUD as State Transition Model

CRUD is not merely four SQL verbs. It is the application-level state lifecycle of domain entities in persistent storage.

### Theoretical Framing

- Create introduces a new persistent identity.
- Read materializes state into application memory.
- Update performs controlled state transition.
- Delete removes or retires identity based on retention policy.

Each operation must preserve integrity constraints and transactional guarantees.

### Consistency and Isolation

In real systems, CRUD runs under concurrent access. Correct CRUD design must account for:

- atomicity of multi-statement operations,
- isolation level impact on stale or phantom reads,
- idempotency for retry-safe behavior in distributed systems.

### Layered Responsibility

JDBC code should not only execute SQL; it should:

- bind parameters safely,
- map data deterministically,
- translate low-level failures into domain-level outcomes.

### Practical Insight

Most production CRUD defects are not syntax errors; they are semantic errors: wrong transaction boundaries, weak predicates, and unhandled concurrency assumptions.

`,
  code: `// CRUD Operations Demo

import java.sql.*;
import java.util.*;

public class CrudDemo {
    public static void main(String[] args) {
        System.out.println("=== CRUD Operations Demo ===\\n");
        
        // Simulated CRUD operations
        UserRepository repo = new UserRepository();
        
        // 1. CREATE
        System.out.println("1. CREATE - Adding Users");
        System.out.println("   ----------------------");
        
        User user1 = new User(0, "Dattu p", " Dattu@email.com", 25);
        User user2 = new User(0, "Jane Smith", "jane@email.com", 28);
        User user3 = new User(0, "Bob Wilson", "bob@email.com", 35);
        
        int id1 = repo.create(user1);
        int id2 = repo.create(user2);
        int id3 = repo.create(user3);
        
        System.out.println("   Created user with ID: " + id1);
        System.out.println("   Created user with ID: " + id2);
        System.out.println("   Created user with ID: " + id3);
        System.out.println();
        
        // 2. READ
        System.out.println("2. READ - Querying Users");
        System.out.println("   ----------------------");
        
        System.out.println("   All users:");
        for (User u : repo.findAll()) {
            System.out.println("   " + u);
        }
        
        System.out.println("\\n   Find by ID (1):");
        User found = repo.findById(1);
        System.out.println("   " + (found != null ? found : "Not found"));
        
        System.out.println("\\n   Find by age > 26:");
        for (User u : repo.findByAgeGreaterThan(26)) {
            System.out.println("   " + u);
        }
        System.out.println();
        
        // 3. UPDATE
        System.out.println("3. UPDATE - Modifying Users");
        System.out.println("   -------------------------");
        
        User toUpdate = repo.findById(1);
        if (toUpdate != null) {
            System.out.println("   Before: " + toUpdate);
            toUpdate.setName(" Dattu Updated");
            toUpdate.setAge(26);
            repo.update(toUpdate);
            System.out.println("   After:  " + repo.findById(1));
        }
        System.out.println();
        
        // 4. DELETE
        System.out.println("4. DELETE - Removing Users");
        System.out.println("   ------------------------");
        
        System.out.println("   Users before delete: " + repo.count());
        boolean deleted = repo.delete(3);
        System.out.println("   Deleted ID 3: " + deleted);
        System.out.println("   Users after delete: " + repo.count());
        System.out.println();
        
        // 5. BATCH OPERATIONS
        System.out.println("5. BATCH INSERT");
        System.out.println("   -------------");
        
        List<User> newUsers = Arrays.asList(
            new User(0, "Alice Brown", "alice@email.com", 30),
            new User(0, "Charlie Davis", "charlie@email.com", 22),
            new User(0, "Diana Evans", "diana@email.com", 27)
        );
        
        int[] results = repo.batchCreate(newUsers);
        System.out.println("   Batch inserted " + results.length + " users");
        System.out.println("   Total users now: " + repo.count());
        System.out.println();
        
        // 6. FINAL STATE
        System.out.println("6. FINAL STATE");
        System.out.println("   ------------");
        for (User u : repo.findAll()) {
            System.out.println("   " + u);
        }
    }
}

// User class
class User {
    private int id;
    private String name;
    private String email;
    private int age;
    
    public User(int id, String name, String email, int age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    @Override
    public String toString() {
        return String.format("User{id=%d, name='%s', email='%s', age=%d}", 
                            id, name, email, age);
    }
}

// Simulated Repository (In-memory for demo)
class UserRepository {
    private Map<Integer, User> users = new HashMap<>();
    private int nextId = 1;
    
    // CREATE
    public int create(User user) {
        user.setId(nextId);
        users.put(nextId, user);
        return nextId++;
    }
    
    // READ
    public User findById(int id) {
        return users.get(id);
    }
    
    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }
    
    public List<User> findByAgeGreaterThan(int age) {
        List<User> result = new ArrayList<>();
        for (User u : users.values()) {
            if (u.getAge() > age) {
                result.add(u);
            }
        }
        return result;
    }
    
    public int count() {
        return users.size();
    }
    
    // UPDATE
    public boolean update(User user) {
        if (users.containsKey(user.getId())) {
            users.put(user.getId(), user);
            return true;
        }
        return false;
    }
    
    // DELETE
    public boolean delete(int id) {
        return users.remove(id) != null;
    }
    
    // BATCH
    public int[] batchCreate(List<User> userList) {
        int[] results = new int[userList.size()];
        for (int i = 0; i < userList.size(); i++) {
            results[i] = create(userList.get(i));
        }
        return results;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Product CRUD system',
      hint: 'Implement create, read, update, delete for products',
      starterCode: `import java.util.*;

public class ProductCrudDemo {
    public static void main(String[] args) {
        System.out.println("=== Product CRUD System ===\\n");
        
        ProductDAO dao = new ProductDAO();
        
        // Create products
        dao.create(new Product(0, "Laptop", 999.99, 10));
        dao.create(new Product(0, "Mouse", 29.99, 50));
        dao.create(new Product(0, "Keyboard", 79.99, 30));
        
        // Read all
        System.out.println("All Products:");
        dao.findAll().forEach(System.out::println);
        
        // Update
        Product laptop = dao.findById(1);
        laptop.setPrice(899.99);
        dao.update(laptop);
        System.out.println("\\nAfter price update:");
        System.out.println(dao.findById(1));
        
        // Delete
        dao.delete(2);
        System.out.println("\\nAfter deleting Mouse:");
        dao.findAll().forEach(System.out::println);
        
        // Search
        System.out.println("\\nProducts under $100:");
        dao.findByPriceLessThan(100).forEach(System.out::println);
    }
}

class Product {
    private int id;
    private String name;
    private double price;
    private int stock;
    
    public Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getStock() { return stock; }
    
    @Override
    public String toString() {
        return String.format("Product{id=%d, name='%s', price=%.2f, stock=%d}", 
                            id, name, price, stock);
    }
}

class ProductDAO {
    private Map<Integer, Product> products = new HashMap<>();
    private int nextId = 1;
    
    public int create(Product product) {
        product.setId(nextId);
        products.put(nextId, product);
        System.out.println("Created: " + product.getName() + " (ID: " + nextId + ")");
        return nextId++;
    }
    
    public Product findById(int id) {
        return products.get(id);
    }
    
    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }
    
    public List<Product> findByPriceLessThan(double price) {
        List<Product> result = new ArrayList<>();
        for (Product p : products.values()) {
            if (p.getPrice() < price) {
                result.add(p);
            }
        }
        return result;
    }
    
    public boolean update(Product product) {
        if (products.containsKey(product.getId())) {
            products.put(product.getId(), product);
            return true;
        }
        return false;
    }
    
    public boolean delete(int id) {
        return products.remove(id) != null;
    }
}`
    }
  ]
};

export default crudOperations;
