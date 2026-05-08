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

Mastered Hibernate Mapping? Test your skills with our comprehensive [Hibernate MCQ Exam](/hibernate-mcq) covering Entity mapping, relationships, annotations, and all Hibernate topics!

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
**Short Answer:** Entity mapping defines how Java classes and fields are stored in database tables and columns.
**Detailed Explanation:** In practical project work, entity mapping is the contract between your Java domain model and your relational schema. It defines exactly which class maps to which table, which field maps to which column, how IDs are generated, how nullability and uniqueness are enforced, and how relationships are represented through foreign keys. Good mapping is not only about saving objects; it controls how SQL is generated, which joins run, and how updates behave. For example, if an order to items association is mapped incorrectly, you may create duplicate rows or orphan records during updates. Interviewers expect you to explain mapping as both a correctness layer and a performance layer, because poor mapping causes runtime bugs long before business logic gets blamed.

### 2. Why is ID generation strategy important?
**Short Answer:** ID strategy affects performance, batching behavior, and database compatibility.
**Detailed Explanation:** ID generation strategy directly impacts write throughput, transaction behavior, and database portability. IDENTITY is simple and works well with auto-increment databases, but it can reduce JDBC batch insert efficiency because IDs are created row by row at insert time. SEQUENCE is often better for high-throughput systems since Hibernate can preallocate IDs, reducing round trips and improving batching. TABLE is portable but slower because it adds locking overhead on the generator table. AUTO delegates decisions but may hide behavior differences across environments. In interviews, a strong answer includes operational impact: wrong strategy can become a production bottleneck when insert traffic grows, even if the application code itself remains unchanged.

### 3. String enum vs ordinal enum mapping: which is safer?
**Short Answer:** String enum mapping is safer because it remains stable when enum order changes.
**Detailed Explanation:** EnumType.STRING is safer in nearly all long-lived systems because it stores explicit names like ADMIN or PAID, which remain readable and stable in the database. EnumType.ORDINAL stores numeric positions such as 0, 1, or 2, and that becomes dangerous when enums evolve. If someone reorders constants or inserts a new one in the middle, existing persisted data can silently point to the wrong business meaning. That is a severe data integrity issue and often hard to detect early. Ordinal mapping can save a little storage, but modern systems usually prioritize maintainability and auditability over tiny space gains. Interviewers want you to discuss migration safety, debugging clarity, and why schema readability matters for support teams.

### 4. When should transient fields be used?
**Short Answer:** Use transient fields for calculated or runtime-only values that should not be saved to DB.
**Detailed Explanation:** Use the Transient annotation for values that are useful in application logic or UI responses but should not be persisted as database state. Common examples include computed display names, derived totals, temporary flags, request-specific metadata, or formatted strings. For instance, in an invoice entity you may store subtotal and tax rate, while grand total is calculated dynamically and marked transient. This avoids data duplication and inconsistency from stale stored values. Transient fields are also useful when you aggregate external API data into entity-like objects for response construction. In interviews, mention that transient is a persistence instruction, not a security mechanism; sensitive fields still need explicit DTO control and serialization rules if you do not want them exposed.

### 5. What is embedded mapping best for?
**Short Answer:** Embedded mapping is best for reusable value objects without separate table lifecycle.
**Detailed Explanation:** Embedded mapping, using Embeddable and Embedded, is ideal for value objects that belong entirely to a parent entity and do not need their own identity or lifecycle. Typical examples are Address, Money, GeoPoint, or AuditInfo. These are conceptually reusable structures but not independent aggregates. Embedding keeps related columns together in the same table, simplifying queries and avoiding extra joins for small, tightly coupled data. It also improves model expressiveness because you can group logically related fields into one type instead of scattering raw primitives. A strong interview answer should include trade-offs: use embedded objects when independent querying and separate lifecycle are unnecessary; use separate entities and relationships when that nested data must be shared, versioned, or managed independently.

### 6. Why can default column mapping be risky?
**Short Answer:** Default mapping can mismatch real schema rules and cause runtime or migration issues.
**Detailed Explanation:** Default mapping conventions are convenient for prototypes but risky in production-grade systems where schema contracts must be explicit. Hibernate may infer column names, lengths, nullability, and SQL types in ways that differ from DBA standards or existing database design. For example, a default VARCHAR(255) may not fit indexing strategy, or a nullable inferred column may violate business rules that should be NOT NULL. Over time, these implicit assumptions cause schema drift between environments and lead to migration pain. Explicit column annotations, constraints, and type decisions make behavior predictable and easier to review. Interviewers like candidates who treat ORM mapping as infrastructure code: deterministic, documented, and aligned with real database governance rather than relying on framework defaults.

### 7. How do fetch and cascade settings interact with mapping?
**Short Answer:** Fetch controls read timing; cascade controls write/delete propagation across relations.
**Detailed Explanation:** Fetch and cascade solve different concerns but together define runtime behavior. Fetch, either LAZY or EAGER, controls when related data is loaded, while cascade options such as PERSIST, MERGE, and REMOVE control which operations propagate across relationships. A common mistake is combining broad cascade rules with large object graphs and then triggering unexpected writes or deletes. Another issue is using EAGER on collections, which can explode query size and create N+1 side effects when serializers touch nested properties. In interviews, explain with an example: deleting a parent with cascade all may remove children unexpectedly if lifecycle boundaries are not well defined. Best practice is conservative defaults, usually LAZY with selective cascade, then explicit fetch joins in query layer for screens that truly need deep object graphs.

### 8. Real-time scenario: profile module with address and preferences, how should mapping be designed?
**Short Answer:** Use embedded mapping for address and separate child entity mapping for dynamic preferences.
**Detailed Explanation:** Design this by separating value semantics from independent data. Keep address as an embedded value object if it belongs only to one profile and is not queried independently. For preferences, evaluate shape: if it is a small fixed set, map columns directly or embed another value object; if it is dynamic and user-extensible, use a child entity such as UserPreference with one to many mapping and a foreign key to profile. Use LAZY for collections, and avoid blanket cascade all unless lifecycle is strictly parent-owned. Add unique constraints where business rules require one key per user. This design keeps write operations predictable, prevents oversized rows, and supports future growth. Interviewers expect you to justify mapping decisions using access patterns, not only annotation syntax.

### 9. What mapping mistake commonly causes startup failure?
**Short Answer:** Wrong relationship ownership or join-column definitions commonly break startup validation.
**Detailed Explanation:** One of the most frequent startup failures is inconsistent relationship metadata between owning and inverse sides. Examples include wrong mappedBy value, mismatched join column names, referencing non-existent fields, or incompatible type definitions between parent and child IDs. Hibernate validates mappings at boot and throws metadata exceptions before the app fully starts, which is good but often confusing for beginners. Another startup issue is duplicate column mapping: the same column accidentally mapped by two properties without proper insertable and updatable configuration. Interviewers expect practical debugging steps: read the full root cause, verify owning side, confirm foreign key column names against schema, and test with schema validation mode to catch structural mismatches early in CI pipelines.

### 10. Interview summary for mapping?
**Short Answer:** Good mapping is explicit, maintainable, and performance-aware from day one.
**Detailed Explanation:** A strong Hibernate mapping mindset combines correctness, maintainability, and performance. Correctness means explicit entity and table contracts, safe ID strategy, and constraints aligned with business rules. Maintainability means readable enums, sensible value objects, and minimal reliance on hidden defaults. Performance means thoughtful fetch plans, controlled cascades, and avoiding accidental large graph loading. In interviews, summarize that ORM is not magic; mapping choices define SQL shape, transaction behavior, and data integrity under real traffic. Mention concrete practices: prefer string enum mapping, default to lazy loading, design ownership carefully, and validate schema continuously. If you present mapping as an architecture concern rather than a syntax checklist, interviewers see that you can build systems that remain stable as requirements and data volume grow.
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


