const hibernateSession = {
  id: 'hibernate-session',
  title: 'Hibernate Session',
  description: 'Master the Hibernate Session API - the core interface for all database operations',
  content: `
# Hibernate Session — Your Gateway to the Database

The Session interface is the most important part of Hibernate. It's your main tool for interacting with the database. Understanding Session is crucial for using Hibernate effectively.

---

## What is a Session?

A **Session** is a single-threaded, short-lived object representing a conversation between your application and the database. Think of it as a connection that maintains a first-level cache of loaded objects.

**Key Characteristics:**
- **Not thread-safe** - Each thread should have its own Session
- **Lightweight** - Can be created and destroyed frequently
- **First-level cache** - Maintains cache of objects in the session
- **Dirty checking** - Automatically detects changes to persistent objects

---

## Creating a Session

\`\`\`java
SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
Session session = sessionFactory.openSession();
\`\`\`

**Important:** Always close sessions when done!

\`\`\`java
try {
    Session session = sessionFactory.openSession();
    // Use session
} finally {
    session.close();
}
\`\`\`

---

## Real-Time Scenarios: Session in Daily Applications

### Scenario 1: User Registration (E-Commerce/Social Media)

**Daily Life:** When you sign up on any website, a Session is used:

\`\`\`java
// User registers on Amazon/Flipkart
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

// Create new user account
User newUser = new User(" Dattu_doe", " Dattu@example.com", "password123");
session.persist(newUser); // User saved to database

// Create user profile
UserProfile profile = new UserProfile();
profile.setFirstName(" Dattu");
profile.setLastName("Doe");
profile.setPhone("123-456-7890");
newUser.setProfile(profile);
session.persist(profile); // Profile saved

tx.commit();
session.close();
// User account created successfully!
\`\`\`

**What Happens:**
- Session opens connection to database
- User object is saved
- Profile is saved and linked to user
- Transaction ensures both save or neither (data integrity)
- Session closes, connection released

### Scenario 2: Online Shopping Cart (E-Commerce)

**Daily Life:** Adding items to cart uses Session:

\`\`\`java
// User adds laptop to cart on Amazon
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

// Load user
User user = session.get(User.class, userId);

// Load product
Product laptop = session.get(Product.class, productId);

// Create cart item
CartItem cartItem = new CartItem();
cartItem.setUser(user);
cartItem.setProduct(laptop);
cartItem.setQuantity(1);
cartItem.setPrice(laptop.getPrice());

session.persist(cartItem); // Item added to cart
tx.commit();
session.close();
// Item successfully added to cart!
\`\`\`

**What Happens:**
- Session loads user and product (uses first-level cache)
- Cart item created with relationships
- Saved to database
- If error occurs, transaction rolls back (cart item not saved)

### Scenario 3: Booking Movie Tickets

**Daily Life:** Booking tickets uses Session for transaction management:

\`\`\`java
// User books 2 tickets for a movie
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

try {
    // Load user and show
    User user = session.get(User.class, userId);
    MovieShow show = session.get(MovieShow.class, showId);
    
    // Check available seats
    if (show.getAvailableSeats() < 2) {
        throw new Exception("Not enough seats available");
    }
    
    // Create booking
    Booking booking = new Booking();
    booking.setUser(user);
    booking.setShow(show);
    booking.setNumberOfTickets(2);
    booking.setTotalAmount(show.getTicketPrice() * 2);
    booking.setBookingDate(new Date());
    
    session.persist(booking);
    
    // Update available seats
    show.setAvailableSeats(show.getAvailableSeats() - 2);
    session.merge(show);
    
    tx.commit(); // Both booking and seat update saved
    System.out.println("Booking confirmed! Booking ID: " + booking.getId());
    
} catch (Exception e) {
    tx.rollback(); // If error, nothing is saved
    System.out.println("Booking failed: " + e.getMessage());
} finally {
    session.close();
}
\`\`\`

**What Happens:**
- Session ensures atomicity: booking and seat update happen together
- If any step fails, entire transaction rolls back
- No partial bookings (data integrity maintained)

### Scenario 4: Bank Money Transfer

**Daily Life:** Transferring money requires Session for transaction safety:

\`\`\`java
// User transfers $500 from Account A to Account B
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

try {
    // Load both accounts
    Account accountA = session.get(Account.class, accountAId);
    Account accountB = session.get(Account.class, accountBId);
    
    // Check sufficient balance
    if (accountA.getBalance() < 500) {
        throw new Exception("Insufficient balance");
    }
    
    // Debit from Account A
    accountA.setBalance(accountA.getBalance() - 500);
    session.merge(accountA);
    
    // Credit to Account B
    accountB.setBalance(accountB.getBalance() + 500);
    session.merge(accountB);
    
    // Create transaction record
    TransactionRecord record = new TransactionRecord();
    record.setFromAccount(accountA);
    record.setToAccount(accountB);
    record.setAmount(500);
    record.setTransactionDate(new Date());
    session.persist(record);
    
    tx.commit(); // All operations succeed or none
    System.out.println("Transfer successful!");
    
} catch (Exception e) {
    tx.rollback(); // If error, all changes reverted
    System.out.println("Transfer failed: " + e.getMessage());
} finally {
    session.close();
}
\`\`\`

**What Happens:**
- Session ensures money is debited and credited atomically
- Transaction record created only if transfer succeeds
- If any step fails, all changes are rolled back
- No money lost or duplicated (critical for banking)

---

## Core Session Methods

### 1. **persist()** - Persist a New Entity (Hibernate 6.x)

Saves a new entity to the database.

\`\`\`java
// Real-world: User registration
User user = new User(" Dattu", " Dattu@example.com");
session.persist(user);
// User is now persisted and has an ID
System.out.println("User ID: " + user.getId());
\`\`\`

**Note:** \`persist()\` is the JPA standard method (Hibernate 6.x uses this instead of save()).

---

### 2. **persist()** - Alternative to save()

Similar to \`save()\`, but doesn't guarantee immediate ID assignment.

\`\`\`java
User user = new User("Jane", "jane@example.com");
session.persist(user);
\`\`\`

**Difference from save():**
- \`save()\` returns the generated ID
- \`persist()\` returns void
- \`persist()\` is JPA standard

---

### 3. **get()** - Load by ID (Eager)

Loads an entity by its ID. Returns \`null\` if not found.

\`\`\`java
User user = session.get(User.class, 1L);
if (user != null) {
    System.out.println("Found: " + user.getName());
}
\`\`\`

**Characteristics:**
- Always hits database (or cache)
- Returns null if not found
- Eager loading

---

### 4. **load()** - Load by ID (Lazy)

Creates a proxy object. Database hit happens when you access the object.

\`\`\`java
User user = session.load(User.class, 1L);
// No database query yet
String name = user.getName(); // Database query happens here
\`\`\`

**Characteristics:**
- Returns proxy immediately
- Database query when accessed
- Throws exception if not found

**Use get() when:** You're not sure if entity exists
**Use load() when:** You're certain it exists and want lazy loading

---

### 5. **update()** - Update Detached Entity

Updates a detached entity (re-attaches it to session).

\`\`\`java
// Entity was loaded in previous session
User detachedUser = ...; // from previous session

Session newSession = sessionFactory.openSession();
Transaction tx = newSession.beginTransaction();
newSession.update(detachedUser); // Re-attach and update
tx.commit();
newSession.close();
\`\`\`

---

### 6. **merge()** - Merge Detached Entity

Merges state of detached entity into persistent entity.

\`\`\`java
User detachedUser = ...;
Session newSession = sessionFactory.openSession();
Transaction tx = newSession.beginTransaction();
User mergedUser = newSession.merge(detachedUser);
tx.commit();
newSession.close();
\`\`\`

**Difference from update():**
- \`update()\` throws exception if entity already exists in session
- \`merge()\` handles both new and existing entities

---

### 7. **delete()** - Remove Entity

Deletes an entity from the database.

\`\`\`java
User user = session.get(User.class, 1L);
session.delete(user);
\`\`\`

Or delete by ID:

\`\`\`java
User user = new User();
user.setId(1L);
session.delete(user);
\`\`\`

---

### 8. **saveOrUpdate()** - Save or Update

Saves if new, updates if existing.

\`\`\`java
User user = ...; // could be new or existing
session.saveOrUpdate(user);
\`\`\`

---

## Session States and Lifecycle

Objects in Hibernate can be in different states:

### 1. **Transient**
- New object, not associated with any session
- No database representation
- No ID assigned

\`\`\`java
User user = new User(" Dattu", " Dattu@example.com");
// user is in transient state
\`\`\`

### 2. **Persistent**
- Associated with a session
- Has database representation
- Changes are tracked

\`\`\`java
session.save(user);
// user is now in persistent state
user.setName(" Dattu Updated"); // Change is tracked
\`\`\`

### 3. **Detached**
- Was persistent, but session is closed
- Has database representation
- Changes are NOT tracked

\`\`\`java
session.close();
// user is now in detached state
user.setName("Another Name"); // Change is NOT tracked
\`\`\`

### 4. **Removed**
- Scheduled for deletion
- Will be removed from database on commit

\`\`\`java
session.delete(user);
// user is in removed state
\`\`\`

---

## Dirty Checking

Hibernate automatically detects changes to persistent objects. This is called **dirty checking**.

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = session.get(User.class, 1L);
user.setName("Updated Name"); // Change detected automatically

tx.commit(); // UPDATE query is executed automatically
session.close();
\`\`\`

**No need to call update()** - Hibernate tracks changes automatically!

---

## First-Level Cache

Every Session maintains its own cache. Objects loaded in a session are cached.

\`\`\`java
Session session = sessionFactory.openSession();

// First call - hits database
User user1 = session.get(User.class, 1L);

// Second call - returns from cache (no database query!)
User user2 = session.get(User.class, 1L);

// Same object instance
System.out.println(user1 == user2); // true
\`\`\`

**Benefits:**
- Reduces database queries
- Maintains object identity
- Improves performance

---

## Flush and Clear

### flush()
Forces Hibernate to synchronize session state with database.

\`\`\`java
session.save(user);
session.flush(); // Forces SQL execution
\`\`\`

### clear()
Clears the session cache.

\`\`\`java
session.clear(); // Removes all objects from cache
\`\`\`

---

## Best Practices

### 1. Always Use Transactions

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();
try {
    // Your operations
    session.save(user);
    tx.commit();
} catch (Exception e) {
    tx.rollback();
} finally {
    session.close();
}
\`\`\`

### 2. Close Sessions Properly

Always close sessions in finally block or use try-with-resources.

### 3. One Session Per Request

In web applications, use one session per HTTP request.

### 4. Don't Keep Sessions Open Long

Sessions are lightweight but should be closed promptly.

---

## Complete Example

\`\`\`java
public class UserDAO {
    private SessionFactory sessionFactory;
    
    public UserDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
    
    public Long saveUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Long id = (Long) session.save(user);
            tx.commit();
            return id;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
    
    public User getUser(Long id) {
        Session session = sessionFactory.openSession();
        try {
            return session.get(User.class, id);
        } finally {
            session.close();
        }
    }
    
    public void updateUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.update(user);
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
    
    public void deleteUser(Long id) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            User user = session.get(User.class, id);
            if (user != null) {
                session.delete(user);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
}
\`\`\`

---

---

## Test Your Knowledge

Mastered Hibernate Session? Test your Hibernate skills with our comprehensive [Hibernate MCQ Exam](/hibernate-mcq) covering Session, SessionFactory, lifecycle, and all Hibernate topics!

---

## Summary

Session is the core interface for Hibernate operations:
- **CRUD operations**: save, get, update, delete
- **State management**: Transient, Persistent, Detached, Removed
- **Dirty checking**: Automatic change detection
- **First-level cache**: Per-session caching
- **Transaction management**: Works with Transaction interface

Master the Session API, and you've mastered the core of Hibernate!

---

## Practice Question

**Q:** What's the difference between \`get()\` and \`load()\`? When would you use each?

**Hint:** Think about when the database query happens and what happens if the entity doesn't exist.

**Answer:**
- **get()**: Immediately queries database, returns null if not found, eager loading
- **load()**: Returns proxy, queries when accessed, throws exception if not found, lazy loading
- **Use get()**: When entity might not exist
- **Use load()**: When you're certain it exists and want lazy loading

---



## 10 Important Hibernate Session Interview Questions

### 1. What is Session and why is it central in Hibernate?
**Answer:** Session is the persistence context that manages entity states, first-level cache, and SQL synchronization for a unit of work.

### 2. What are transient, persistent, and detached states?
**Answer:** Transient objects are not tracked, persistent are tracked in session, and detached were tracked previously but are now outside active session scope.

### 3. What is dirty checking in Session?
**Answer:** Hibernate compares managed entity state changes and auto-generates update SQL during flush, reducing manual update calls.

### 4. What is the difference between flush and commit?
**Answer:** Flush sends SQL to DB but transaction may still rollback; commit finalizes transaction durability.

### 5. Why can long Session scope be harmful?
**Answer:** It increases memory usage, stale entity risk, and accidental writes due to large persistence context.

### 6. When should clear or evict be used?
**Answer:** In large loops or batch flows, clear or selective evict helps control memory and avoid managing too many entities.

### 7. How does first-level cache affect repeated find calls?
**Answer:** Within one session, repeated lookup of same ID returns cached managed object and avoids duplicate DB round-trips.

### 8. Real-time scenario: checkout API handling high concurrent orders, what Session strategy is safe?
**Answer:** Use short-lived session per request with explicit transaction and immediate close to avoid contention and stale context issues.

### 9. What is Open Session in View and why is it debated?
**Answer:** It simplifies lazy loading in views but can hide N+1 problems and leak persistence concerns into web layer.

### 10. Interview summary for Session?
**Answer:** Session must be treated as short unit-of-work context; correct scope, flush timing, and lifecycle handling determine stability and performance.
`,
  code: `// Hibernate Session Example
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import javax.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    public Customer() {}
    
    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

// Demonstrating Session operations
public class SessionDemo {
    private SessionFactory sessionFactory;
    
    public SessionDemo() {
        Configuration config = new Configuration();
        config.configure("hibernate.cfg.xml");
        config.addAnnotatedClass(Customer.class);
        sessionFactory = config.buildSessionFactory();
    }
    
    // Demonstrate save()
    public Long createCustomer(String name, String email) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Customer customer = new Customer(name, email);
            Long id = (Long) session.save(customer);
            tx.commit();
            System.out.println("Customer saved with ID: " + id);
            return id;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
    }
    
    // Demonstrate get() vs load()
    public void demonstrateGetVsLoad() {
        Session session = sessionFactory.openSession();
        
        // get() - immediate database query
        Customer customer1 = session.get(Customer.class, 1L);
        System.out.println("get() result: " + customer1);
        
        // load() - returns proxy, queries when accessed
        Customer customer2 = session.load(Customer.class, 1L);
        System.out.println("load() proxy created");
        String name = customer2.getName(); // Database query happens here
        System.out.println("load() accessed: " + name);
        
        session.close();
    }
    
    // Demonstrate dirty checking
    public void demonstrateDirtyChecking() {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        Customer customer = session.get(Customer.class, 1L);
        customer.setName("Updated Name"); // Change tracked automatically
        
        tx.commit(); // UPDATE query executed automatically
        session.close();
    }
    
    // Demonstrate first-level cache
    public void demonstrateCache() {
        Session session = sessionFactory.openSession();
        
        // First call - database query
        Customer c1 = session.get(Customer.class, 1L);
        System.out.println("First call - from database");
        
        // Second call - from cache (no database query)
        Customer c2 = session.get(Customer.class, 1L);
        System.out.println("Second call - from cache");
        System.out.println("Same instance? " + (c1 == c2)); // true
        
        session.close();
    }
    
    public void shutdown() {
        sessionFactory.close();
    }
    
    public static void main(String[] args) {
        SessionDemo demo = new SessionDemo();
        demo.createCustomer("Dattu p", " Dattu@example.com");
        demo.demonstrateGetVsLoad();
        demo.demonstrateDirtyChecking();
        demo.demonstrateCache();
        demo.shutdown();
    }
}`
};

export default hibernateSession;

