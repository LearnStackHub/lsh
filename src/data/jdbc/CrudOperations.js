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
**Answer:** CRUD stands for Create, Read, Update, and Delete database operations executed via SQL from Java code. It represents the core data access responsibilities in most backend systems. Interviewers use CRUD questions to test practical JDBC fluency.

### 2. How should Create operations be implemented safely?
**Answer:** Use PreparedStatement with parameter binding, validate inputs, and handle generated keys when needed. Safe insertion also includes proper error handling for constraint violations. This prevents both security and data integrity issues.

### 3. What are best practices for Read operations?
**Answer:** Select only required columns, use indexed filters, paginate large datasets, and map ResultSet carefully. Avoid SELECT * in production paths unless truly needed. Good answers include both query quality and mapping quality.

### 4. What should be considered in Update operations?
**Answer:** Updates should include clear predicates, validate affected row count, and optionally implement optimistic locking/version checks. Blind updates can overwrite concurrent changes. Interviewers like when you mention consistency control.

### 5. What are common risks in Delete operations?
**Answer:** Deletes can cause accidental data loss if predicates are wrong or too broad. Soft-delete patterns, foreign key awareness, and transaction boundaries reduce risk. Production-safe deletion is about control and recoverability.

### 6. How do CRUD operations relate to DAO design?
**Answer:** DAO methods should encapsulate SQL and return domain-focused results while keeping transaction boundaries explicit at service layer. This separation makes code testable and easier to evolve. It also avoids SQL scattering across business logic.

### 7. How do transactions affect multi-step CRUD flows?
**Answer:** When several CRUD actions must succeed together, disable auto-commit and commit only after all validations pass. On failure, rollback to maintain consistency. This is central to real business operations like checkout and payments.

### 8. What performance techniques help CRUD-heavy services?
**Answer:** Use batching for bulk operations, proper indexing, connection pooling, and efficient SQL plans. Minimize unnecessary round-trips and object allocations in tight loops. Performance tuning should be validated with realistic data volumes.

### 9. How should CRUD errors be handled and surfaced?
**Answer:** Capture SQL state/vendor codes, log context safely, and translate technical errors into meaningful service-level responses. Avoid exposing raw SQL internals to end users. Clear error strategy improves debuggability and user trust.

### 10. How would you summarize CRUD interview expectations?
**Answer:** Interviewers expect safe parameterized SQL, clean mapping, correct transaction handling, and production-aware error/performance practices. Showing only syntax is not enough; they look for end-to-end reliability thinking.

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
