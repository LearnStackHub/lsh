const hibernateMapping = {
  id: 'hibernate-mapping',
  title: 'Hibernate Mapping with Annotations',
  description: 'Learn how to map Java objects to database tables using JPA annotations',
  content: `
# Hibernate Mapping — Connecting Objects to Tables

Mapping is the process of telling Hibernate how your Java objects relate to database tables. Hibernate supports two mapping approaches:
1. **XML Mapping** (hbm.xml files) - Traditional
2. **Annotation Mapping** (JPA annotations) - Modern, recommended

We'll focus on annotations as they're more commonly used today.

---

## Basic Entity Mapping

### @Entity

Marks a class as a Hibernate entity (maps to a database table).

\`\`\`java
@Entity
public class User {
    // ...
}
\`\`\`

### @Table

Specifies the table name. If omitted, Hibernate uses the class name.

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    // ...
}
\`\`\`

---

## Primary Key Mapping

### @Id

Marks a field as the primary key.

\`\`\`java
@Id
private Long id;
\`\`\`

### @GeneratedValue

Specifies how the primary key is generated.

\`\`\`java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
\`\`\`

**Generation Strategies:**
- \`IDENTITY\` - Database auto-increment (MySQL, SQL Server)
- \`SEQUENCE\` - Database sequence (Oracle, PostgreSQL)
- \`TABLE\` - Uses a table to generate IDs
- \`AUTO\` - Let Hibernate choose

---

## Column Mapping

### @Column

Maps a field to a database column.

\`\`\`java
@Column(name = "user_name", nullable = false, length = 100)
private String name;
\`\`\`

**Common Attributes:**
- \`name\` - Column name
- \`nullable\` - Can be null?
- \`length\` - Column length
- \`unique\` - Unique constraint
- \`insertable\` - Include in INSERT?
- \`updatable\` - Include in UPDATE?

---

## Complete Entity Example

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    
    @Column(name = "user_name", nullable = false, length = 100)
    private String name;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "age")
    private Integer age;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors, getters, setters
}
\`\`\`

---

## Data Type Mapping

Hibernate automatically maps Java types to SQL types:

| Java Type | SQL Type |
|-----------|----------|
| String | VARCHAR |
| int/Integer | INT |
| long/Long | BIGINT |
| double/Double | DOUBLE |
| boolean/Boolean | BOOLEAN |
| Date | DATE/TIMESTAMP |
| LocalDate | DATE |
| LocalDateTime | TIMESTAMP |
| BigDecimal | DECIMAL |

### @Temporal

For Date/Time fields:

\`\`\`java
@Temporal(TemporalType.DATE)
private Date birthDate;

@Temporal(TemporalType.TIMESTAMP)
private Date createdAt;
\`\`\`

---

## Transient Fields

### @Transient

Fields marked as @Transient are NOT persisted to database.

\`\`\`java
@Transient
private String fullName; // Not stored in database

public String getFullName() {
    return firstName + " " + lastName;
}
\`\`\`

---

## Enumerations

### @Enumerated

Maps Java enums to database.

\`\`\`java
public enum UserRole {
    ADMIN, USER, GUEST
}

@Entity
public class User {
    @Enumerated(EnumType.STRING)
    private UserRole role; // Stored as "ADMIN", "USER", etc.
    
    // OR
    
    @Enumerated(EnumType.ORDINAL)
    private UserRole role; // Stored as 0, 1, 2, etc.
}
\`\`\`

---

## Large Objects

### @Lob

For large objects (text, binary data).

\`\`\`java
@Lob
@Column(name = "description")
private String description; // CLOB

@Lob
@Column(name = "profile_picture")
private byte[] profilePicture; // BLOB
\`\`\`

---

## Embedded Objects

### @Embedded and @Embeddable

For value objects that don't have their own table.

\`\`\`java
@Embeddable
public class Address {
    private String street;
    private String city;
    private String zipCode;
    
    // Getters and setters
}

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    @Embedded
    private Address address; // Fields stored in users table
}
\`\`\`

---

## Relationships

### @OneToOne

One-to-one relationship.

\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
}

@Entity
public class UserProfile {
    @Id
    @GeneratedValue
    private Long id;
    
    @OneToOne(mappedBy = "profile")
    private User user;
}
\`\`\`

### @OneToMany and @ManyToOne

One-to-many / Many-to-one relationship.

\`\`\`java
@Entity
public class Department {
    @Id
    @GeneratedValue
    private Long id;
    
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;
}
\`\`\`

### @ManyToMany

Many-to-many relationship.

\`\`\`java
@Entity
public class Student {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses;
}

@Entity
public class Course {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToMany(mappedBy = "courses")
    private List<Student> students;
}
\`\`\`

---

## Fetch Types

### FetchType.EAGER vs FetchType.LAZY

Controls when related entities are loaded.

\`\`\`java
@OneToMany(fetch = FetchType.EAGER) // Load immediately
private List<Order> orders;

@OneToMany(fetch = FetchType.LAZY) // Load when accessed
private List<Order> orders;
\`\`\`

**EAGER**: Loads immediately (can cause N+1 problem)
**LAZY**: Loads when accessed (better performance)

---

## Cascade Operations

### @Cascade

Defines which operations cascade to related entities.

\`\`\`java
@OneToMany(cascade = CascadeType.ALL)
private List<Order> orders;

// Cascade types:
// ALL - All operations
// PERSIST - Save operation
// MERGE - Update operation
// REMOVE - Delete operation
// REFRESH - Refresh operation
\`\`\`

---

## Complete Example

\`\`\`java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_name", nullable = false, length = 200)
    private String name;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private ProductCategory category;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
    
    // Constructors, getters, setters
}
\`\`\`

---

## Summary

Hibernate mapping with annotations:
- **@Entity** - Marks entity class
- **@Table** - Specifies table name
- **@Id** - Primary key
- **@GeneratedValue** - ID generation strategy
- **@Column** - Column mapping
- **@Transient** - Non-persistent fields
- **@Embedded** - Value objects
- **Relationship annotations** - @OneToOne, @OneToMany, @ManyToOne, @ManyToMany
- **Fetch types** - EAGER vs LAZY
- **Cascade** - Operation cascading

Master these annotations, and you can map any Java object to any database table!

---

## Test Your Knowledge

Mastered Hibernate Mapping? Test your skills with our comprehensive [Hibernate MCQ Exam](/tutorial/hibernate-mcq) covering Entity mapping, relationships, annotations, and all Hibernate topics!

---

## Practice Question

**Q:** What's the difference between \`FetchType.EAGER\` and \`FetchType.LAZY\`? When would you use each?

**Hint:** Think about performance and when data is needed.

**Answer:**
- **EAGER**: Loads related entities immediately - use when you always need the data
- **LAZY**: Loads when accessed - use for better performance, especially for collections
- **Default**: @OneToMany and @ManyToMany are LAZY by default, @ManyToOne and @OneToOne are EAGER
- **Best Practice**: Use LAZY for most relationships to avoid N+1 queries

---



## 10 Important Hibernate Mapping Interview Questions

### 1. What is entity mapping in practical terms?
**Answer:** Entity mapping defines how class fields correspond to table columns, keys, constraints, and relation semantics in DB.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 2. Why is ID generation strategy important?
**Answer:** It affects insert behavior, scalability, batching efficiency, and portability across databases.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 3. String enum vs ordinal enum mapping: which is safer?
**Answer:** String mapping is safer for long-term maintainability because ordinal mapping breaks when enum order changes.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 4. When should transient fields be used?
**Answer:** Use transient for computed or runtime-only fields that should not be persisted to database.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 5. What is embedded mapping best for?
**Answer:** Embedded mapping is best for reusable value objects like Address or Money without separate table lifecycle.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 6. Why can default column mapping be risky?
**Answer:** Implicit defaults may not match DB naming conventions, lengths, or constraints, causing schema drift and runtime exceptions.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 7. How do fetch and cascade settings interact with mapping?
**Answer:** Fetch defines loading strategy while cascade defines operation propagation; incorrect combinations often cause heavy queries or unwanted deletes.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 8. Real-time scenario: profile module with address and preferences, how should mapping be designed?
**Answer:** Use embedded value object for address-like fields and explicit relations for collections with conservative fetch defaults.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 9. What mapping mistake commonly causes startup failure?
**Answer:** Incorrect relation ownership annotations or mismatched join column definitions often break metadata validation at startup.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.

### 10. Interview summary for mapping?
**Answer:** Good mapping is explicit, constraint-aware, and performance-conscious; it is the foundation that determines persistence correctness.
Detailed Explanation: Mapping answers should connect annotation design to schema correctness, fetch behavior, and maintainability over time. This point is important in real systems because it influences correctness, performance, and debugging effort under production load.
Implementation Insight: A strong interview response should include one concrete project example, one common failure mode, and one mitigation approach connected to this exact concept.
  `,
  code: `// Hibernate Mapping Example
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;
    
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @Column(name = "isbn", unique = true, length = 13)
    private String isbn;
    
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;
    
    @Column(name = "published_date")
    private LocalDateTime publishedDate;
    
    @Lob
    @Column(name = "description")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
    
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Review> reviews;
    
    @Transient
    private String displayTitle; // Not persisted
    
    public String getDisplayTitle() {
        return title + " (" + genre + ")";
    }
    
    // Constructors, getters, setters
    public Book() {}
    
    public Book(String title, String isbn, BigDecimal price, Genre genre) {
        this.title = title;
        this.isbn = isbn;
        this.price = price;
        this.genre = genre;
        this.publishedDate = LocalDateTime.now();
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Genre getGenre() { return genre; }
    public void setGenre(Genre genre) { this.genre = genre; }
    
    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }
    
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
}

enum Genre {
    FICTION, NON_FICTION, SCI_FI, MYSTERY, ROMANCE
}

@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "author_name", nullable = false)
    private String name;
    
    @OneToMany(mappedBy = "author")
    private List<Book> books;
    
    // Constructors, getters, setters
}

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "rating")
    private Integer rating;
    
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
    
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    
    // Constructors, getters, setters
}`
};

export default hibernateMapping;


