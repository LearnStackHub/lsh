const hibernateInterviewQuestions = {
  id: 'hibernate-interview-questions',
  title: 'Top 30 Hibernate Interview Questions',
  description: 'Most frequently asked Hibernate interview questions for Java developers with detailed answers, real-world scenarios, and code examples',
  content: `
# Top 30 Hibernate Interview Questions - Complete Guide

Master the most commonly asked Hibernate interview questions for Java developers. These questions cover ORM concepts, Session management, relationships, and performance optimization.

---

## Basic Level Questions (Freshers to 1 Year)

---

### Question 1: What is Hibernate? Why do we use it?

**Answer:**
Hibernate is an open-source ORM (Object-Relational Mapping) framework for Java that maps Java objects to database tables.

**Why Use Hibernate:**
- Reduces boilerplate JDBC code
- Automatic SQL generation
- Database independence
- Lazy loading for performance
- Caching mechanisms
- Transaction management

**Real-Time Example:**
\`\`\`java
// Without Hibernate (JDBC)
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
PreparedStatement stmt = conn.prepareStatement(sql);
stmt.setString(1, user.getName());
stmt.setString(2, user.getEmail());
stmt.executeUpdate();

// With Hibernate
session.save(user);  // Much simpler!
\`\`\`

---

### Question 2: Explain Hibernate architecture.

**Answer:**
Hibernate architecture consists of:

**Core Components:**
1. **SessionFactory** - Creates Session instances (expensive, create once)
2. **Session** - Main interface for database operations
3. **Transaction** - Manages database transactions
4. **Query** - Executes HQL queries
5. **Configuration** - Configures Hibernate

**Architecture Flow:**
\`\`\`java
Configuration → SessionFactory → Session → Database
\`\`\`

---

### Question 3: What is the difference between Session.get() and Session.load()?

**Answer:**

| Method | Behavior | Exception | Proxy |
|--------|----------|-----------|-------|
| \`get()\` | Returns null if not found | No exception | No proxy |
| \`load()\` | Returns proxy, throws exception if not found | ObjectNotFoundException | Returns proxy |

**Example:**
\`\`\`java
// get() - returns null if not found
User user = session.get(User.class, 1L);
if (user == null) {
    // Handle not found
}

// load() - returns proxy, throws exception if not found
User user = session.load(User.class, 1L);  // Proxy created
String name = user.getName();  // Database hit happens here
\`\`\`

---

### Question 4: Explain Hibernate Session lifecycle.

**Answer:**
Session manages entity lifecycle states:

**States:**
1. **Transient** - New object, not associated with session
2. **Persistent** - Associated with session, tracked
3. **Detached** - Was persistent, session closed
4. **Removed** - Marked for deletion

**Example:**
\`\`\`java
User user = new User("John");  // Transient
session.save(user);            // Persistent
session.close();                // Detached
session.delete(user);           // Removed
\`\`\`

---

### Question 5: What is HQL? How is it different from SQL?

**Answer:**
HQL (Hibernate Query Language) is object-oriented query language.

**Differences:**

| Feature | SQL | HQL |
|---------|-----|-----|
| Works With | Tables, columns | Entities, properties |
| Database | Database-specific | Database-independent |
| Case Sensitivity | Case-insensitive | Case-sensitive for entities |

**Example:**
\`\`\`java
// SQL
String sql = "SELECT * FROM users WHERE age > 25";

// HQL
String hql = "FROM User WHERE age > 25";
Query query = session.createQuery(hql);
List<User> users = query.list();
\`\`\`

---

## Intermediate Level Questions (1-3 Years)

---

### Question 6: Explain Hibernate relationships (@OneToOne, @OneToMany, @ManyToOne, @ManyToMany).

**Answer:**
Hibernate supports four relationship types:

**@OneToOne:**
\`\`\`java
@Entity
public class User {
    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
}
\`\`\`

**@OneToMany:**
\`\`\`java
@Entity
public class User {
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}
\`\`\`

**@ManyToOne:**
\`\`\`java
@Entity
public class Order {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
\`\`\`

**@ManyToMany:**
\`\`\`java
@Entity
public class Student {
    @ManyToMany
    @JoinTable(name = "student_course")
    private List<Course> courses;
}
\`\`\`

---

### Question 7: What is the difference between EAGER and LAZY loading?

**Answer:**

| Fetch Type | Behavior | Performance | Use Case |
|------------|----------|-------------|----------|
| EAGER | Loads immediately | Slower initial load | Always needed data |
| LAZY | Loads on access | Faster initial load | Sometimes needed data |

**Example:**
\`\`\`java
@OneToMany(fetch = FetchType.LAZY)
private List<Order> orders;  // Loads when accessed

@OneToMany(fetch = FetchType.EAGER)
private List<Order> orders;  // Loads immediately
\`\`\`

**Best Practice:** Use LAZY for most relationships to avoid N+1 queries.

---

### Question 8: Explain Hibernate caching (First-level and Second-level).

**Answer:**
Hibernate provides two cache levels:

**First-Level Cache (Session Cache):**
- Automatic, per-session
- Lifecycle tied to session
- No configuration needed

**Second-Level Cache (SessionFactory Cache):**
- Shared across sessions
- Requires cache provider (EhCache, Redis)
- Needs configuration

**Example:**
\`\`\`java
// First-level cache
Session session = sessionFactory.openSession();
User user1 = session.get(User.class, 1L);  // Database hit
User user2 = session.get(User.class, 1L);  // Cache hit

// Second-level cache (configured)
@Cacheable
@Entity
public class User { }
\`\`\`

---

### Question 9: What is the N+1 problem? How to solve it?

**Answer:**
N+1 problem occurs when fetching related entities causes multiple queries.

**Problem:**
\`\`\`java
List<User> users = session.createQuery("FROM User").list();
// 1 query for users
for (User user : users) {
    user.getOrders().size();  // N queries for orders
}
// Total: 1 + N queries
\`\`\`

**Solution - Use JOIN FETCH:**
\`\`\`java
String hql = "SELECT u FROM User u JOIN FETCH u.orders";
List<User> users = session.createQuery(hql).list();
// Only 1 query with JOIN
\`\`\`

---

### Question 10: Explain Hibernate transaction management.

**Answer:**
Hibernate manages transactions through Session.

**Example:**
\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = null;
try {
    tx = session.beginTransaction();
    
    User user = new User("John");
    session.save(user);
    
    tx.commit();
} catch (Exception e) {
    if (tx != null) tx.rollback();
    throw e;
} finally {
    session.close();
}
\`\`\`

---

## Advanced Level Questions (3+ Years)

---

### Question 11: What is Hibernate Criteria API?

**Answer:**
Criteria API provides programmatic query building.

**Example:**
\`\`\`java
Criteria criteria = session.createCriteria(User.class);
criteria.add(Restrictions.gt("age", 25));
criteria.add(Restrictions.like("name", "John%"));
List<User> users = criteria.list();
\`\`\`

**Note:** Criteria API is deprecated in Hibernate 5.2+, use JPA Criteria API.

---

### Question 12: Explain Hibernate inheritance strategies.

**Answer:**
Hibernate supports three inheritance strategies:

**1. Single Table:**
\`\`\`java
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
public class Animal { }
\`\`\`

**2. Table Per Class:**
\`\`\`java
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Animal { }
\`\`\`

**3. Joined:**
\`\`\`java
@Inheritance(strategy = InheritanceType.JOINED)
public class Animal { }
\`\`\`

---

### Question 13: What is Hibernate dirty checking?

**Answer:**
Dirty checking automatically detects entity changes.

**Example:**
\`\`\`java
User user = session.get(User.class, 1L);
user.setName("Updated Name");  // Change detected
session.flush();  // UPDATE query executed automatically
\`\`\`

No need to call \`update()\` - Hibernate tracks changes!

---

### Question 14: Explain Hibernate batch processing.

**Answer:**
Batch processing improves performance for bulk operations.

**Configuration:**
\`\`\`properties
hibernate.jdbc.batch_size=20
hibernate.order_inserts=true
hibernate.order_updates=true
\`\`\`

**Example:**
\`\`\`java
for (int i = 0; i < 1000; i++) {
    User user = new User("User" + i);
    session.save(user);
    if (i % 20 == 0) {
        session.flush();
        session.clear();
    }
}
\`\`\`

---

### Question 15: What is the difference between merge() and update()?

**Answer:**

| Method | Detached Entity | New Entity | Exception |
|--------|----------------|------------|-----------|
| \`update()\` | Updates | Throws exception | If entity doesn't exist |
| \`merge()\` | Updates | Inserts | Never throws |

**Example:**
\`\`\`java
// update() - for detached entities
User detachedUser = // ... detached entity
session.update(detachedUser);  // Updates

// merge() - safer, works for both
User mergedUser = session.merge(detachedUser);  // Returns managed entity
\`\`\`

---

## Tricky Questions

---

### Question 16: Explain Hibernate proxy objects.

**Answer:**
Hibernate uses proxies for lazy loading.

**Example:**
\`\`\`java
User user = session.load(User.class, 1L);  // Returns proxy
// Proxy is created, database not hit yet
String name = user.getName();  // Database hit happens here
\`\`\`

**Proxy Characteristics:**
- Subclass of entity class
- Initialized on first access
- Can cause LazyInitializationException if session closed

---

### Question 17: What is LazyInitializationException? How to fix it?

**Answer:**
Occurs when accessing lazy-loaded collection after session closed.

**Problem:**
\`\`\`java
User user = session.get(User.class, 1L);
session.close();
user.getOrders().size();  // LazyInitializationException!
\`\`\`

**Solutions:**
1. Use JOIN FETCH
2. Keep session open (Open Session in View pattern)
3. Initialize before closing session

---

### Question 18: Explain Hibernate cascade types.

**Answer:**
Cascade defines operations to propagate to related entities.

**Types:**
- \`CascadeType.ALL\` - All operations
- \`CascadeType.PERSIST\` - Save operation
- \`CascadeType.MERGE\` - Merge operation
- \`CascadeType.REMOVE\` - Delete operation
- \`CascadeType.REFRESH\` - Refresh operation

**Example:**
\`\`\`java
@OneToMany(cascade = CascadeType.ALL)
private List<Order> orders;
\`\`\`

---

### Question 19: What is the difference between save(), persist(), and saveOrUpdate()?

**Answer:**

| Method | Returns | ID Generation | Detached Entity |
|--------|---------|---------------|-----------------|
| \`save()\` | Generated ID | Immediate | Throws exception |
| \`persist()\` | void | On flush | Throws exception |
| \`saveOrUpdate()\` | void | If new | Updates if detached |

---

### Question 20: Explain Hibernate named queries.

**Answer:**
Named queries are predefined queries with names.

**Example:**
\`\`\`java
@NamedQuery(
    name = "User.findByAge",
    query = "FROM User WHERE age > :age"
)

// Usage
Query query = session.getNamedQuery("User.findByAge");
query.setParameter("age", 25);
List<User> users = query.list();
\`\`\`

**Benefits:**
- Reusable
- Pre-compiled
- Better performance

---

## Real-World Scenario Questions

---

### Question 21: How do you optimize Hibernate performance?

**Answer:**
Optimization techniques:
- Use lazy loading
- Enable second-level cache
- Use batch processing
- Optimize queries (JOIN FETCH)
- Use appropriate fetch strategies
- Index database columns
- Use pagination

---

### Question 22: How do you handle Hibernate connection pooling?

**Answer:**
Configure connection pool in hibernate.cfg.xml:

\`\`\`xml
<property name="hibernate.connection.provider_class">
    org.hibernate.connection.C3P0ConnectionProvider
</property>
<property name="hibernate.c3p0.min_size">5</property>
<property name="hibernate.c3p0.max_size">20</property>
\`\`\`

---

### Question 23: Explain Hibernate with Spring integration.

**Answer:**
Spring provides HibernateTemplate and @Transactional.

**Example:**
\`\`\`java
@Service
@Transactional
public class UserService {
    @Autowired
    private SessionFactory sessionFactory;
    
    public void saveUser(User user) {
        sessionFactory.getCurrentSession().save(user);
    }
}
\`\`\`

---

### Question 24: How do you handle Hibernate versioning (optimistic locking)?

**Answer:**
Use @Version annotation for optimistic locking.

**Example:**
\`\`\`java
@Entity
public class User {
    @Version
    private int version;
}
\`\`\`

Prevents lost updates in concurrent scenarios.

---

### Question 25: Explain Hibernate filters.

**Answer:**
Filters apply conditions to queries dynamically.

**Example:**
\`\`\`java
@FilterDef(name = "activeFilter")
@Filter(name = "activeFilter", condition = "status = 'ACTIVE'")

// Enable filter
session.enableFilter("activeFilter");
\`\`\`

---

## Debugging Questions

---

### Question 26: How do you debug Hibernate SQL queries?

**Answer:**
Enable SQL logging:

\`\`\`properties
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.use_sql_comments=true
\`\`\`

---

### Question 27: What causes Hibernate session leaks?

**Answer:**
Common causes:
- Not closing sessions
- Exception before close()
- Thread-local session not cleared

**Solution:** Use try-with-resources or @Transactional.

---

### Question 28: How do you handle Hibernate transaction timeout?

**Answer:**
Set timeout:

\`\`\`java
@Transactional(timeout = 30)
public void longRunningMethod() { }
\`\`\`

---

### Question 29: Explain Hibernate entity lifecycle callbacks.

**Answer:**
Use annotations for lifecycle events:

\`\`\`java
@PrePersist
public void beforeSave() {
    this.createdAt = new Date();
}

@PostLoad
public void afterLoad() {
    // Post-load logic
}
\`\`\`

---

### Question 30: What are Hibernate best practices?

**Answer:**
- Use lazy loading by default
- Enable second-level cache
- Use batch processing for bulk operations
- Optimize queries with JOIN FETCH
- Use @Transactional for transaction management
- Close sessions properly
- Use connection pooling
- Index database columns
- Avoid N+1 queries
- Use appropriate fetch strategies

---

## Summary

These 30 Hibernate interview questions cover:
- ORM fundamentals
- Session management
- Relationships and mappings
- Caching strategies
- Performance optimization
- Transaction management
- Best practices

Master these questions to excel in Hibernate interviews!
  `
};

export default hibernateInterviewQuestions;

