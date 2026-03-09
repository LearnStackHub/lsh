const hibernateRelationships = {
  id: 'hibernate-relationships',
  title: 'Hibernate Relationships - Real-World Examples',
  description: 'Master Hibernate relationships with practical examples: One-to-One, One-to-Many, Many-to-Many',
  content: `
# Hibernate Relationships — Building Real-World Data Models

In real applications, entities are connected. Users have orders, orders have items, products belong to categories. Understanding relationships is crucial for building proper data models.

---

## Types of Relationships

Hibernate supports four relationship types:

1. **One-to-One** (1:1) - User ↔ UserProfile
2. **One-to-Many** (1:N) - Department ↔ Employees
3. **Many-to-One** (N:1) - Employee → Department
4. **Many-to-Many** (N:N) - Student ↔ Course

---

## 1. One-to-One Relationship

### Real-World Example: User and UserProfile

**Scenario:** Each user has exactly one profile, and each profile belongs to exactly one user.

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", unique = true)
    private String username;
    
    @Column(name = "email")
    private String email;
    
    // One-to-One relationship
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;
    
    // Bidirectional relationship (optional)
    @OneToOne(mappedBy = "profile")
    private User user;
    
    // Constructors, getters, setters
}
\`\`\`

### Usage Example

\`\`\`java
// Create user with profile
User user = new User(" Dattu_doe", " Dattu@example.com");
UserProfile profile = new UserProfile();
profile.setFirstName(" Dattu");
profile.setLastName("Doe");
profile.setPhone("123-456-7890");

user.setProfile(profile);
session.save(user); // Profile is saved automatically (cascade)

// Load user with profile
User loadedUser = session.get(User.class, 1L);
UserProfile loadedProfile = loadedUser.getProfile(); // Lazy loaded
\`\`\`

---

## 2. One-to-Many / Many-to-One Relationship

### Real-World Example: E-Commerce Order System

**Scenario:** One order has many order items, each item belongs to one order.

\`\`\`java
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    
    @Column(name = "total_amount")
    private BigDecimal totalAmount;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    // One-to-Many: One order has many items
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, 
               fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();
    
    // Helper method
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "quantity")
    private Integer quantity;
    
    @Column(name = "price")
    private BigDecimal price;
    
    // Many-to-One: Many items belong to one order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "customer_name")
    private String name;
    
    @Column(name = "email")
    private String email;
    
    // One-to-Many: One customer has many orders
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
    
    // Constructors, getters, setters
}
\`\`\`

### Usage Example: Creating an Order

\`\`\`java
// Create order with items
Customer customer = session.get(Customer.class, 1L);
Product product1 = session.get(Product.class, 101L);
Product product2 = session.get(Product.class, 102L);

Order order = new Order();
order.setOrderDate(LocalDateTime.now());
order.setCustomer(customer);

// Add items
OrderItem item1 = new OrderItem();
item1.setProduct(product1);
item1.setQuantity(2);
item1.setPrice(product1.getPrice());
order.addItem(item1);

OrderItem item2 = new OrderItem();
item2.setProduct(product2);
item2.setQuantity(1);
item2.setPrice(product2.getPrice());
order.addItem(item2);

// Calculate total
BigDecimal total = order.getItems().stream()
    .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
    .reduce(BigDecimal.ZERO, BigDecimal::add);
order.setTotalAmount(total);

session.save(order); // Items saved automatically (cascade)
\`\`\`

---

## 3. Many-to-Many Relationship

### Real-World Example: Student-Course Enrollment

**Scenario:** Students can enroll in multiple courses, and courses have multiple students.

\`\`\`java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "student_name")
    private String name;
    
    @Column(name = "email")
    private String email;
    
    // Many-to-Many: Students have many courses
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_course", // Join table name
        joinColumns = @JoinColumn(name = "student_id"), // This entity's column
        inverseJoinColumns = @JoinColumn(name = "course_id") // Other entity's column
    )
    private List<Course> courses = new ArrayList<>();
    
    // Helper method
    public void enrollInCourse(Course course) {
        courses.add(course);
        course.getStudents().add(this);
    }
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "course_name")
    private String name;
    
    @Column(name = "description")
    private String description;
    
    // Many-to-Many: Courses have many students
    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();
    
    // Constructors, getters, setters
}
\`\`\`

### Usage Example

\`\`\`java
// Create students and courses
Student student1 = new Student("Alice", "alice@example.com");
Student student2 = new Student("Bob", "bob@example.com");

Course course1 = new Course("Java Programming", "Learn Java");
Course course2 = new Course("Database Design", "Learn SQL");

// Enroll students
student1.enrollInCourse(course1);
student1.enrollInCourse(course2);
student2.enrollInCourse(course1);

session.save(student1);
session.save(student2);
session.save(course1);
session.save(course2);

// Query: Get all courses for a student
Student student = session.get(Student.class, 1L);
List<Course> courses = student.getCourses(); // Lazy loaded
\`\`\`

---

## Complete Real-World Example: E-Commerce System

### Full Data Model

\`\`\`java
// Customer Entity
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private ShoppingCart cart;
    
    // Constructors, getters, setters
}

// Shopping Cart
@Entity
@Table(name = "shopping_carts")
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(mappedBy = "cart")
    private Customer customer;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> items = new ArrayList<>();
    
    // Constructors, getters, setters
}

// Cart Item
@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer quantity;
    
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private ShoppingCart cart;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    // Constructors, getters, setters
}

// Product
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private BigDecimal price;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToMany
    @JoinTable(
        name = "product_tags",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
    
    // Constructors, getters, setters
}

// Category
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "category")
    private List<Product> products;
    
    // Constructors, getters, setters
}
\`\`\`

---

## Fetch Types: EAGER vs LAZY

### LAZY Loading (Recommended)

Loads related entities only when accessed.

\`\`\`java
@OneToMany(fetch = FetchType.LAZY)
private List<Order> orders;

// Usage
Customer customer = session.get(Customer.class, 1L);
// Orders NOT loaded yet

List<Order> orders = customer.getOrders(); 
// NOW orders are loaded from database
\`\`\`

**Benefits:**
- Faster initial load
- Loads only what you need
- Better performance

### EAGER Loading

Loads related entities immediately.

\`\`\`java
@OneToMany(fetch = FetchType.EAGER)
private List<Order> orders;

// Usage
Customer customer = session.get(Customer.class, 1L);
// Orders loaded immediately (even if not needed)
\`\`\`

**Drawbacks:**
- Slower initial load
- May load unnecessary data
- Can cause N+1 query problem

---

## Cascade Operations

Cascade defines which operations propagate to related entities.

\`\`\`java
@OneToMany(cascade = CascadeType.ALL)
private List<OrderItem> items;

// When you save Order, items are saved automatically
order.getItems().add(item);
session.save(order); // Item saved automatically
\`\`\`

**Cascade Types:**
- **ALL** - All operations cascade
- **PERSIST** - Save operation
- **MERGE** - Update operation
- **REMOVE** - Delete operation
- **REFRESH** - Refresh operation

---

## Best Practices

### 1. Use LAZY Loading by Default
\`\`\`java
@OneToMany(fetch = FetchType.LAZY) // Recommended
private List<Order> orders;
\`\`\`

### 2. Use Bidirectional Relationships Carefully
Only when you need to navigate from both sides.

### 3. Use Cascade Appropriately
\`\`\`java
// Good: Cascade for dependent entities
@OneToMany(cascade = CascadeType.ALL)
private List<OrderItem> items; // Items depend on Order

// Bad: Don't cascade to independent entities
@ManyToOne(cascade = CascadeType.ALL)
private Customer customer; // Customer exists independently
\`\`\`

### 4. Use Helper Methods
\`\`\`java
public void addItem(OrderItem item) {
    items.add(item);
    item.setOrder(this); // Maintain both sides
}
\`\`\`

---

## Summary

Hibernate relationships enable:
- **One-to-One** - User ↔ Profile
- **One-to-Many** - Order → OrderItems
- **Many-to-One** - OrderItem → Order
- **Many-to-Many** - Student ↔ Course

**Key Concepts:**
- **Fetch Types** - LAZY (default) vs EAGER
- **Cascade** - Automatic operation propagation
- **Join Tables** - For many-to-many relationships
- **Bidirectional** - Navigate from both sides

Master relationships, and you can model any real-world data structure!

---

## Practice Question

**Q:** In an e-commerce system, design the relationships between Customer, Order, OrderItem, and Product. What fetch types and cascade strategies would you use?

**Answer:**
- **Customer → Order**: One-to-Many, LAZY, no cascade (orders exist independently)
- **Order → OrderItem**: One-to-Many, LAZY, CascadeType.ALL (items depend on order)
- **OrderItem → Product**: Many-to-One, LAZY, no cascade (products exist independently)
- **Order → Customer**: Many-to-One, LAZY, no cascade

This ensures orders can exist independently, items are deleted with orders, and products are shared across orders.
  `,
  code: `// Hibernate Relationships - Real-World Examples
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// ========== ONE-TO-ONE: User and Profile ==========
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", unique = true)
    private String username;
    
    @Column(name = "email")
    private String email;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
    
    public User() {}
    
    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public UserProfile getProfile() { return profile; }
    public void setProfile(UserProfile profile) { this.profile = profile; }
}

@Entity
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String phone;
    
    @OneToOne(mappedBy = "profile")
    private User user;
    
    // Getters and setters
}

// ========== ONE-TO-MANY: Order and OrderItems ==========
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, 
               fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();
    
    // Helper method
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
    
    // Getters and setters
}

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer quantity;
    private BigDecimal price;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    
    // Getters and setters
}

// ========== MANY-TO-MANY: Student and Course ==========
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses = new ArrayList<>();
    
    public void enrollInCourse(Course course) {
        courses.add(course);
        course.getStudents().add(this);
    }
    
    // Getters and setters
}

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    
    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();
    
    // Getters and setters
}

// ========== USAGE EXAMPLES ==========
public class RelationshipExamples {
    private SessionFactory sessionFactory;
    
    // Create order with items
    public void createOrder(Long customerId, List<Product> products) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        Customer customer = session.get(Customer.class, customerId);
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setCustomer(customer);
        
        BigDecimal total = BigDecimal.ZERO;
        for (Product product : products) {
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(1);
            item.setPrice(product.getPrice());
            order.addItem(item);
            total = total.add(product.getPrice());
        }
        
        order.setTotalAmount(total);
        session.save(order); // Items saved automatically (cascade)
        
        tx.commit();
        session.close();
    }
    
    // Get customer with orders (lazy loading)
    public Customer getCustomerWithOrders(Long customerId) {
        Session session = sessionFactory.openSession();
        try {
            Customer customer = session.get(Customer.class, customerId);
            // Orders not loaded yet (LAZY)
            
            // Access orders - triggers lazy load
            List<Order> orders = customer.getOrders();
            
            return customer;
        } finally {
            session.close();
        }
    }
}`
};

export default hibernateRelationships;


