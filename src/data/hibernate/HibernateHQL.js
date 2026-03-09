const hibernateHQL = {
  id: 'hibernate-hql',
  title: 'Hibernate Query Language (HQL)',
  description: 'Learn HQL - Hibernate\'s object-oriented query language for database operations',
  content: `
# Hibernate Query Language (HQL) — Object-Oriented Queries

HQL (Hibernate Query Language) is Hibernate's object-oriented query language. Instead of writing SQL that works with tables and columns, you write HQL that works with entities and properties.

---

## What is HQL?

**HQL** is similar to SQL but operates on objects instead of tables. Hibernate translates HQL to SQL based on your mappings.

**Key Differences:**
- SQL: \`SELECT * FROM users WHERE age > 25\`
- HQL: \`FROM User WHERE age > 25\`

HQL is **case-sensitive** for entity names and properties, but **case-insensitive** for keywords.

---

## Basic HQL Syntax

### Simple SELECT Query

\`\`\`java
String hql = "FROM User";
Query<User> query = session.createQuery(hql, User.class);
List<User> users = query.list();
\`\`\`

### SELECT with WHERE Clause

\`\`\`java
String hql = "FROM User WHERE age > :age";
Query<User> query = session.createQuery(hql, User.class);
query.setParameter("age", 25);
List<User> users = query.list();
\`\`\`

### SELECT Specific Properties

\`\`\`java
String hql = "SELECT name, email FROM User";
Query<Object[]> query = session.createQuery(hql);
List<Object[]> results = query.list();
for (Object[] row : results) {
    String name = (String) row[0];
    String email = (String) row[1];
}
\`\`\`

---

## Real-Time Scenarios: HQL in Daily Applications

### Scenario 1: E-Commerce Product Search

**Daily Life:** When you search for products on Amazon/Flipkart:

\`\`\`java
// User searches: "laptop" under $1000, sorted by rating
String hql = "FROM Product WHERE name LIKE :searchTerm " +
             "AND price <= :maxPrice AND stock > 0 " +
             "ORDER BY rating DESC, price ASC";
Query<Product> query = session.createQuery(hql, Product.class);
query.setParameter("searchTerm", "%laptop%");
query.setParameter("maxPrice", 1000.0);
query.setMaxResults(20); // Show top 20 results
List<Product> products = query.list();
// Returns: All laptops under $1000, sorted by best rating
\`\`\`

**What Happens:**
- Hibernate generates optimized SQL
- Filters products by name, price, and stock
- Sorts by rating (descending) then price (ascending)
- Returns only top 20 results (pagination)

### Scenario 2: Social Media News Feed

**Daily Life:** Loading your Facebook/Instagram feed:

\`\`\`java
// Load posts from friends, ordered by date (newest first)
String hql = "SELECT p FROM Post p " +
             "JOIN p.author a " +
             "WHERE a IN (SELECT f.friend FROM Friendship f WHERE f.user = :currentUser) " +
             "OR a = :currentUser " +
             "ORDER BY p.createdDate DESC";
Query<Post> query = session.createQuery(hql, Post.class);
query.setParameter("currentUser", currentUser);
query.setFirstResult(0); // Start from first post
query.setMaxResults(10); // Load 10 posts at a time
List<Post> feedPosts = query.list();
// Returns: Latest 10 posts from you and your friends
\`\`\`

**What Happens:**
- Hibernate joins Post with User (author)
- Filters posts from friends or current user
- Orders by creation date (newest first)
- Implements pagination (load 10 at a time)

### Scenario 3: Banking Transaction History

**Daily Life:** Viewing your bank transaction history:

\`\`\`java
// Get transactions for last 30 days, amount > $100
String hql = "FROM TransactionRecord t " +
             "WHERE t.account = :account " +
             "AND t.transactionDate >= :startDate " +
             "AND ABS(t.amount) >= :minAmount " +
             "ORDER BY t.transactionDate DESC";
Query<TransactionRecord> query = session.createQuery(hql, TransactionRecord.class);
query.setParameter("account", userAccount);
query.setParameter("startDate", LocalDate.now().minusDays(30));
query.setParameter("minAmount", 100.0);
List<TransactionRecord> transactions = query.list();
// Returns: All transactions >= $100 in last 30 days
\`\`\`

**What Happens:**
- Filters transactions by account, date range, and amount
- Orders by date (most recent first)
- Uses date arithmetic (last 30 days)

### Scenario 4: Hospital Patient Search

**Daily Life:** Doctor searches for patients by condition:

\`\`\`java
// Find all patients with "diabetes" diagnosis in last year
String hql = "SELECT DISTINCT p FROM Patient p " +
             "JOIN p.medicalRecords mr " +
             "WHERE mr.diagnosis LIKE :condition " +
             "AND mr.recordDate >= :startDate " +
             "ORDER BY p.lastName, p.firstName";
Query<Patient> query = session.createQuery(hql, Patient.class);
query.setParameter("condition", "%diabetes%");
query.setParameter("startDate", LocalDate.now().minusYears(1));
List<Patient> patients = query.list();
// Returns: All diabetic patients seen in last year
\`\`\`

**What Happens:**
- Joins Patient with MedicalRecord
- Filters by diagnosis and date
- Removes duplicates (DISTINCT)
- Orders alphabetically

### Scenario 5: Restaurant Menu Filtering

**Daily Life:** Filtering restaurant menu on Zomato/Swiggy:

\`\`\`java
// Get vegetarian dishes under $500, sorted by popularity
String hql = "FROM MenuItem m " +
             "WHERE m.restaurant = :restaurant " +
             "AND m.isVegetarian = true " +
             "AND m.price <= :maxPrice " +
             "AND m.isAvailable = true " +
             "ORDER BY m.popularity DESC, m.price ASC";
Query<MenuItem> query = session.createQuery(hql, MenuItem.class);
query.setParameter("restaurant", selectedRestaurant);
query.setParameter("maxPrice", 500.0);
List<MenuItem> menuItems = query.list();
// Returns: Available vegetarian dishes under $500, sorted by popularity
\`\`\`

**What Happens:**
- Filters by restaurant, dietary preference, price, and availability
- Sorts by popularity (most popular first) then price (cheapest first)

---

## Named Parameters

Use \`:parameterName\` for named parameters (recommended).

\`\`\`java
// Real-world: Search products by name and price range
String hql = "FROM Product WHERE name LIKE :name AND price BETWEEN :minPrice AND :maxPrice";
Query<Product> query = session.createQuery(hql, Product.class);
query.setParameter("name", "%laptop%");
query.setParameter("minPrice", 500.0);
query.setParameter("maxPrice", 2000.0);
List<Product> products = query.list();
\`\`\`

---

## Positional Parameters

Use \`?\` for positional parameters.

\`\`\`java
String hql = "FROM User WHERE name = ? AND age > ?";
Query<User> query = session.createQuery(hql, User.class);
query.setParameter(0, " Dattu");
query.setParameter(1, 25);
List<User> users = query.list();
\`\`\`

**Note:** Named parameters are preferred for readability.

---

## Common HQL Operations

### ORDER BY

\`\`\`java
String hql = "FROM User ORDER BY name ASC";
Query<User> query = session.createQuery(hql, User.class);
List<User> users = query.list();
\`\`\`

### GROUP BY

\`\`\`java
String hql = "SELECT department, COUNT(*) FROM Employee GROUP BY department";
Query<Object[]> query = session.createQuery(hql);
List<Object[]> results = query.list();
\`\`\`

### Aggregate Functions

\`\`\`java
String hql = "SELECT AVG(salary), MAX(salary), MIN(salary) FROM Employee";
Query<Object[]> query = session.createQuery(hql);
Object[] result = query.uniqueResult();
\`\`\`

---

## Joins in HQL

### Implicit Join

HQL automatically joins based on relationships.

\`\`\`java
String hql = "FROM Order o WHERE o.customer.name = :name";
Query<Order> query = session.createQuery(hql, Order.class);
query.setParameter("name", " Dattu");
List<Order> orders = query.list();
\`\`\`

### Explicit Join

\`\`\`java
String hql = "SELECT o FROM Order o JOIN o.customer c WHERE c.name = :name";
Query<Order> query = session.createQuery(hql, Order.class);
query.setParameter("name", " Dattu");
List<Order> orders = query.list();
\`\`\`

### LEFT JOIN

\`\`\`java
String hql = "SELECT u FROM User u LEFT JOIN u.orders o";
Query<User> query = session.createQuery(hql, User.class);
List<User> users = query.list();
\`\`\`

---

## Subqueries

\`\`\`java
String hql = "FROM User u WHERE u.age > (SELECT AVG(u2.age) FROM User u2)";
Query<User> query = session.createQuery(hql, User.class);
List<User> users = query.list();
\`\`\`

---

## Pagination

### setFirstResult() and setMaxResults()

\`\`\`java
String hql = "FROM User ORDER BY name";
Query<User> query = session.createQuery(hql, User.class);
query.setFirstResult(0);  // Start from index 0
query.setMaxResults(10);  // Return 10 results
List<User> users = query.list();
\`\`\`

---

## Update and Delete

### Update

\`\`\`java
String hql = "UPDATE User SET age = :newAge WHERE age < :oldAge";
Query query = session.createQuery(hql);
query.setParameter("newAge", 30);
query.setParameter("oldAge", 25);
int updated = query.executeUpdate();
\`\`\`

### Delete

\`\`\`java
String hql = "DELETE FROM User WHERE age < :age";
Query query = session.createQuery(hql);
query.setParameter("age", 18);
int deleted = query.executeUpdate();
\`\`\`

---

## Named Queries

Define queries in entity classes using @NamedQuery.

\`\`\`java
@Entity
@NamedQuery(
    name = "User.findByAge",
    query = "FROM User WHERE age > :age"
)
public class User {
    // ...
}
\`\`\`

**Usage:**
\`\`\`java
Query<User> query = session.createNamedQuery("User.findByAge", User.class);
query.setParameter("age", 25);
List<User> users = query.list();
\`\`\`

---

## Complete Examples

### Example 1: Find Users by Department

\`\`\`java
public List<User> findUsersByDepartment(String department) {
    Session session = sessionFactory.openSession();
    try {
        String hql = "FROM User u WHERE u.department.name = :deptName";
        Query<User> query = session.createQuery(hql, User.class);
        query.setParameter("deptName", department);
        return query.list();
    } finally {
        session.close();
    }
}
\`\`\`

### Example 2: Get User Statistics

\`\`\`java
public Map<String, Object> getUserStatistics() {
    Session session = sessionFactory.openSession();
    try {
        String hql = "SELECT COUNT(*), AVG(age), MAX(age), MIN(age) FROM User";
        Query<Object[]> query = session.createQuery(hql);
        Object[] result = query.uniqueResult();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", result[0]);
        stats.put("avgAge", result[1]);
        stats.put("maxAge", result[2]);
        stats.put("minAge", result[3]);
        return stats;
    } finally {
        session.close();
    }
}
\`\`\`

### Example 3: Paginated User List

\`\`\`java
public List<User> getUsers(int page, int pageSize) {
    Session session = sessionFactory.openSession();
    try {
        String hql = "FROM User ORDER BY name";
        Query<User> query = session.createQuery(hql, User.class);
        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);
        return query.list();
    } finally {
        session.close();
    }
}
\`\`\`

---

## HQL vs SQL

| Feature | SQL | HQL |
|---------|-----|-----|
| **Works with** | Tables, columns | Entities, properties |
| **Database** | Database-specific | Database-independent |
| **Case sensitivity** | Case-insensitive | Case-sensitive for entities |
| **Portability** | Low | High |

---

## Best Practices

1. **Use named parameters** - More readable and safer
2. **Use named queries** - Better performance, reusable
3. **Avoid SELECT *** - Select only needed properties
4. **Use pagination** - For large result sets
5. **Cache queries** - For frequently used queries

---

## Summary

HQL provides:
- **Object-oriented queries** - Work with entities, not tables
- **Database independence** - Same HQL works with any database
- **Type safety** - Compile-time checking possible
- **Powerful features** - Joins, subqueries, aggregations
- **Named queries** - Reusable, optimized queries

Master HQL, and you can query your database in an object-oriented way!

---

## Practice Question

**Q:** Write an HQL query to find all users who have placed more than 5 orders, ordered by the number of orders descending.

**Hint:** Use GROUP BY, HAVING, and COUNT.

**Answer:**
\`\`\`java
String hql = "SELECT u FROM User u JOIN u.orders o " +
             "GROUP BY u.id HAVING COUNT(o) > 5 " +
             "ORDER BY COUNT(o) DESC";
Query<User> query = session.createQuery(hql, User.class);
List<User> users = query.list();
\`\`\`
  `,
  code: `// Hibernate HQL Examples
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(name = "orders")
@NamedQuery(
    name = "Order.findByCustomer",
    query = "FROM Order o WHERE o.customer.name = :customerName"
)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    @Column(name = "total_amount")
    private Double totalAmount;
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private Integer age;
    
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;
    
    // Constructors, getters, setters
}

// HQL Examples
public class HQLExamples {
    private SessionFactory sessionFactory;
    
    // Example 1: Simple query
    public List<Customer> getAllCustomers() {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Customer";
            Query<Customer> query = session.createQuery(hql, Customer.class);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Example 2: Query with WHERE clause
    public List<Customer> getCustomersByAge(int minAge) {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Customer WHERE age > :age";
            Query<Customer> query = session.createQuery(hql, Customer.class);
            query.setParameter("age", minAge);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Example 3: Named query
    public List<Order> getOrdersByCustomer(String customerName) {
        Session session = sessionFactory.openSession();
        try {
            Query<Order> query = session.createNamedQuery("Order.findByCustomer", Order.class);
            query.setParameter("customerName", customerName);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Example 4: Aggregate functions
    public Map<String, Object> getCustomerStatistics() {
        Session session = sessionFactory.openSession();
        try {
            String hql = "SELECT COUNT(*), AVG(age), MAX(age), MIN(age) FROM Customer";
            Query<Object[]> query = session.createQuery(hql);
            Object[] result = query.uniqueResult();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("total", result[0]);
            stats.put("avgAge", result[1]);
            stats.put("maxAge", result[2]);
            stats.put("minAge", result[3]);
            return stats;
        } finally {
            session.close();
        }
    }
    
    // Example 5: Pagination
    public List<Customer> getCustomers(int page, int pageSize) {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Customer ORDER BY name";
            Query<Customer> query = session.createQuery(hql, Customer.class);
            query.setFirstResult(page * pageSize);
            query.setMaxResults(pageSize);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Example 6: Join query
    public List<Order> getOrdersWithCustomerDetails() {
        Session session = sessionFactory.openSession();
        try {
            String hql = "SELECT o FROM Order o JOIN o.customer c WHERE c.age > :age";
            Query<Order> query = session.createQuery(hql, Order.class);
            query.setParameter("age", 25);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Example 7: Update query
    public int updateCustomerAge(String customerName, int newAge) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            String hql = "UPDATE Customer SET age = :newAge WHERE name = :name";
            Query query = session.createQuery(hql);
            query.setParameter("newAge", newAge);
            query.setParameter("name", customerName);
            int updated = query.executeUpdate();
            tx.commit();
            return updated;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
}`
};

export default hibernateHQL;

