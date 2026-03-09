const springBootJPA = {
  id: 'spring-boot-jpa',
  title: 'Spring Boot with JPA - Database Integration',
  description: 'Learn how to connect Spring Boot with databases using JPA, create entities, repositories, and perform CRUD operations',
  content: `
# Spring Boot with JPA - Database Integration

Spring Boot with JPA (Java Persistence API) provides a powerful and efficient solution for database integration in enterprise Java applications. JPA is the industry-standard specification for managing relational data in Java, enabling developers to work with databases using object-oriented programming principles rather than writing raw SQL queries. Spring Boot's auto-configuration capabilities simplify JPA setup, making database integration seamless for modern application development.

Enterprise applications across various industries utilize Spring Boot JPA for data persistence, including e-commerce platforms, financial systems, healthcare applications, and content management systems. Major organizations rely on JPA for its ability to abstract database operations, improve code maintainability, and provide consistent data access patterns.

---

## What is JPA?

JPA (Java Persistence API) is a Java specification that provides a standard approach for object-relational mapping (ORM) in Java applications. JPA enables developers to work with relational databases using Java objects, eliminating the need to write complex SQL queries manually. The specification defines a set of interfaces and annotations that standardize how Java applications interact with databases.

JPA is implemented by various providers, with Hibernate being the most popular. Spring Boot uses Hibernate as its default JPA implementation, providing seamless integration between Spring's dependency injection framework and JPA's persistence capabilities.

**Key Benefits of JPA:**
- **Object-Oriented Approach**: Work with Java objects instead of SQL result sets
- **Automatic Table Management**: Generate database schemas from entity classes
- **Relationship Mapping**: Easily define and manage relationships between entities
- **Query Generation**: Automatic query creation from method names
- **Transaction Management**: Built-in support for database transactions
- **Portability**: Switch between different JPA providers without changing code
- **Type Safety**: Compile-time checking of queries and entity relationships

JPA is particularly valuable in enterprise applications where data models are complex and relationships between entities are numerous. It reduces the amount of boilerplate code required for database operations and provides a consistent API across different database systems.

---

## Setting Up Database Connection

### Step 1: Add Dependencies

In your \`pom.xml\`, add:

\`\`\`xml
<dependencies>
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>
\`\`\`

### Step 2: Configure Database

In \`application.properties\`:

\`\`\`properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
\`\`\`

**What each property does:**
- \`spring.datasource.url\`: Database connection URL
- \`spring.datasource.username\`: Database username
- \`spring.datasource.password\`: Database password
- \`spring.jpa.hibernate.ddl-auto=update\`: Automatically create/update tables
- \`spring.jpa.show-sql=true\`: Show SQL queries in console

---

## Creating Your First Entity

An entity is a Java class that represents a database table.

### Student Entity Example

\`\`\`java
package com.example.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "course_name")
    private String course;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors
    public Student() {}
    
    public Student(String name, String email, String course) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
\`\`\`

### Understanding Entity Annotations

**@Entity:**
- Marks this class as a JPA entity
- Spring Boot will create a table for this class

**@Table(name = "students"):**
- Specifies the table name
- If omitted, uses class name (Student → student)

**@Id:**
- Marks this field as primary key

**@GeneratedValue(strategy = GenerationType.IDENTITY):**
- Auto-generates ID values
- IDENTITY = database auto-increment

**@Column:**
- Customizes column properties
- \`nullable = false\` = NOT NULL constraint
- \`unique = true\` = UNIQUE constraint
- \`length = 100\` = VARCHAR(100)
- \`name = "course_name"\` = custom column name

---

## Creating a Repository

Repository is an interface that handles database operations. You don't implement it - Spring Boot does.

### Basic Repository

\`\`\`java
package com.example.repository;

import com.example.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // That's it! You get all CRUD methods for free
}
\`\`\`

**What you get automatically:**
- \`save(Student)\` - Save or update
- \`findById(Long)\` - Find by ID
- \`findAll()\` - Get all students
- \`deleteById(Long)\` - Delete by ID
- \`count()\` - Count records
- And more...

### Custom Query Methods

You can add custom methods by following naming conventions:

\`\`\`java
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Find by email
    Student findByEmail(String email);
    
    // Find by course
    List<Student> findByCourse(String course);
    
    // Find by name containing
    List<Student> findByNameContaining(String name);
    
    // Find by course and name
    List<Student> findByCourseAndName(String course, String name);
    
    // Count by course
    long countByCourse(String course);
    
    // Delete by email
    void deleteByEmail(String email);
}
\`\`\`

Spring Boot automatically implements these methods based on the method name!

---

## Creating a Service Layer

Service layer contains business logic.

\`\`\`java
package com.example.service;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    // Create student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    
    // Update student
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setCourse(studentDetails.getCourse());
        
        return studentRepository.save(student);
    }
    
    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    
    // Find by course
    public List<Student> getStudentsByCourse(String course) {
        return studentRepository.findByCourse(course);
    }
}
\`\`\`

---

## Complete REST API with JPA

Now let's create a controller that uses the service:

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {
        try {
            Student updated = studentService.updateStudent(id, student);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/course/{course}")
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable String course) {
        return ResponseEntity.ok(studentService.getStudentsByCourse(course));
    }
}
\`\`\`

---

## Entity Relationships

### One-to-Many Example

Student can have multiple Addresses:

\`\`\`java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Address> addresses;
    
    // getters and setters
}

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String street;
    private String city;
    
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    
    // getters and setters
}
\`\`\`

### Many-to-Many Example

Student can enroll in multiple Courses:

\`\`\`java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses;
}
\`\`\`

---

## Custom Queries with @Query

For complex queries, use @Query annotation:

\`\`\`java
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // JPQL Query
    @Query("SELECT s FROM Student s WHERE s.course = :course")
    List<Student> findStudentsByCourse(@Param("course") String course);
    
    // Native SQL Query
    @Query(value = "SELECT * FROM students WHERE course = :course", nativeQuery = true)
    List<Student> findStudentsByCourseNative(@Param("course") String course);
    
    // Update Query
    @Modifying
    @Query("UPDATE Student s SET s.course = :course WHERE s.id = :id")
    void updateCourse(@Param("id") Long id, @Param("course") String course);
}
\`\`\`

---

## Transaction Management

Spring Boot automatically manages transactions. But you can control it:

\`\`\`java
@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Transactional
    public void transferStudent(Long fromId, Long toId) {
        Student from = studentRepository.findById(fromId).orElseThrow();
        Student to = studentRepository.findById(toId).orElseThrow();
        
        // Both operations succeed or both fail
        from.setCourse("Transferred");
        to.setCourse("Transferred");
        
        studentRepository.save(from);
        studentRepository.save(to);
    }
}
\`\`\`

---

## Testing Your Setup

### Create Database First

\`\`\`sql
CREATE DATABASE studentdb;
USE studentdb;
\`\`\`

### Run Your Application

When you run Spring Boot:
1. It connects to the database
2. Creates tables automatically (if \`ddl-auto=update\`)
3. You can now use the API

### Test with curl

\`\`\`bash
# Create a student
curl -X POST http://localhost:8080/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":" Dattu","email":" Dattu@example.com","course":"CS"}'

# Get all students
curl http://localhost:8080/api/students

# Get student by ID
curl http://localhost:8080/api/students/1
\`\`\`

---

## Common JPA Issues and Solutions

### Issue 1: Table Not Created

**Solution:** Check \`spring.jpa.hibernate.ddl-auto\` is set to \`update\` or \`create\`

### Issue 2: Column Not Found

**Solution:** Make sure column names match. Use \`@Column(name = "column_name")\` if different.

### Issue 3: LazyInitializationException

**Solution:** Use \`@Transactional\` on service methods or fetch eagerly with \`fetch = FetchType.EAGER\`

### Issue 4: Duplicate Entry

**Solution:** Check unique constraints. Use \`@Column(unique = true)\` or handle exceptions.

---

## Best Practices

1. **Always use @Service for business logic**
2. **Use @Repository for data access**
3. **Use @Transactional for multiple database operations**
4. **Don't expose entities directly - use DTOs**
5. **Use proper exception handling**
6. **Validate data before saving**

---

## Key Takeaways

1. JPA lets you work with databases using Java objects
2. @Entity marks a class as a database table
3. Repository interface provides CRUD methods automatically
4. Service layer contains business logic
5. Spring Boot handles database connections automatically
6. Use @Query for custom queries

Spring Boot JPA simplifies database operations by providing automatic configuration, transaction management, and repository abstractions. Understanding JPA fundamentals is essential for building scalable, maintainable enterprise applications. The combination of Spring Boot's convenience features and JPA's powerful ORM capabilities creates an efficient development environment for data-driven applications.

---

## Real-World Applications

### E-Commerce Platform
E-commerce applications utilize Spring Boot JPA for managing product catalogs, customer information, order processing, and inventory management. JPA's relationship mapping capabilities enable complex data models where products relate to categories, orders contain multiple items, and customers have shipping addresses.

**Implementation Example:**
- Product entities with relationships to categories and inventory
- Order entities with one-to-many relationships to order items
- Customer entities with embedded address information
- Transaction management for order processing

### Financial Services
Banking and financial applications leverage Spring Boot JPA for account management, transaction processing, and regulatory compliance. JPA's transaction management ensures data consistency for critical financial operations.

**Implementation Example:**
- Account entities with transaction history
- Audit trail entities for compliance tracking
- Secure data access with JPA's entity-level security
- Complex queries for financial reporting

### Healthcare Systems
Healthcare applications use Spring Boot JPA for patient records, appointment scheduling, and medical history management. JPA's ability to handle complex relationships supports the interconnected nature of healthcare data.

**Implementation Example:**
- Patient entities with medical history relationships
- Appointment entities linking patients, doctors, and facilities
- Prescription entities with medication and dosage information
- Secure access patterns for sensitive health data

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using @Transactional
**Problem:** Performing multiple database operations without transaction management can lead to inconsistent data states.

**Solution:** Always use @Transactional annotation on service methods that perform multiple database operations:

\`\`\`java
@Service
@Transactional
public class StudentService {
    // All methods are transactional
}
\`\`\`

### Mistake 2: N+1 Query Problem
**Problem:** Fetching related entities in a loop causes multiple database queries.

**Solution:** Use fetch joins or @EntityGraph to load related data efficiently:

\`\`\`java
@Query("SELECT s FROM Student s JOIN FETCH s.addresses")
List<Student> findAllWithAddresses();
\`\`\`

### Mistake 3: Exposing Entities Directly
**Problem:** Returning entity objects directly from controllers can cause serialization issues and security vulnerabilities.

**Solution:** Use DTOs (Data Transfer Objects) to transfer data between layers:

\`\`\`java
public class StudentDTO {
    private String name;
    private String email;
    // Only include necessary fields
}
\`\`\`

### Mistake 4: Not Handling LazyInitializationException
**Problem:** Accessing lazy-loaded relationships outside of a transaction causes exceptions.

**Solution:** Use @Transactional on service methods or configure eager fetching where appropriate:

\`\`\`java
@OneToMany(fetch = FetchType.EAGER)
private List<Address> addresses;
\`\`\`

### Mistake 5: Ignoring Database Constraints
**Problem:** Not defining proper constraints in entities can lead to data integrity issues.

**Solution:** Use JPA annotations to enforce constraints:

\`\`\`java
@Column(nullable = false, unique = true)
private String email;
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is JPA and why should I use it with Spring Boot?

JPA (Java Persistence API) is a Java specification for managing relational data in applications. You should use JPA with Spring Boot because it provides automatic configuration, eliminates boilerplate code, and offers powerful features like automatic table creation, relationship mapping, and query generation. Spring Boot's integration with JPA simplifies database operations, making it the preferred choice for enterprise application development. Learn more about [Spring Boot Introduction](/tutorial/spring-boot-introduction) to understand the framework's capabilities.

### What's the difference between JPA and JDBC?

JPA is an object-relational mapping (ORM) framework that works with Java objects, while JDBC is a low-level API for direct database access using SQL. JPA provides higher-level abstractions, automatic query generation, and relationship management, while JDBC requires manual SQL writing and result set handling. JPA is built on top of JDBC and provides a more developer-friendly approach. For direct database access, learn [JDBC Introduction](/tutorial/jdbc-introduction).

### Do I need to know SQL to use JPA?

While JPA abstracts away much of the SQL complexity, understanding SQL fundamentals is beneficial for writing custom queries, optimizing performance, and debugging issues. JPA provides query methods that generate SQL automatically, but complex queries may require JPQL (Java Persistence Query Language) or native SQL. Knowledge of [MySQL Introduction](/tutorial/mysql-introduction) helps understand database concepts.

### What is the difference between JPA and Hibernate?

Hibernate is an implementation of the JPA specification. JPA defines the standard API, while Hibernate is one of several JPA providers (others include EclipseLink, OpenJPA). Spring Boot uses Hibernate as the default JPA implementation. Understanding [Hibernate Introduction](/tutorial/hibernate-introduction) provides deeper insights into JPA implementation details.

### How does Spring Boot auto-configure JPA?

Spring Boot auto-configures JPA by detecting JPA-related dependencies on the classpath. When it finds spring-boot-starter-data-jpa, it automatically configures a DataSource, EntityManagerFactory, and TransactionManager. Spring Boot reads database configuration from application.properties and sets up Hibernate as the JPA provider. Learn about [Spring Boot Configuration](/tutorial/spring-boot-configuration) for detailed setup information.

### What is the purpose of @Entity annotation?

The @Entity annotation marks a Java class as a JPA entity, indicating that it represents a database table. Spring Boot automatically creates database tables for entity classes when ddl-auto is set to create or update. The @Entity annotation is required for JPA to recognize the class as a persistent entity.

### When should I use @Repository vs @Service?

Use @Repository for data access layer interfaces that extend JpaRepository. Use @Service for business logic layer classes that contain application logic and coordinate between repositories and controllers. The @Repository annotation provides exception translation and is specifically designed for data access, while @Service is for business logic.

### How do I handle relationships between entities?

JPA provides several relationship annotations: @OneToOne, @OneToMany, @ManyToOne, and @ManyToMany. Use @JoinColumn to specify foreign key columns, and configure cascade operations with CascadeType. For bidirectional relationships, use mappedBy to indicate the owning side of the relationship.

### What is the difference between save() and saveAndFlush()?

The save() method queues the entity for persistence but doesn't immediately write to the database. The saveAndFlush() method immediately synchronizes changes with the database. Use saveAndFlush() when you need to access the generated ID immediately or ensure data is persisted before subsequent operations.

### How do I write custom queries in JPA?

You can write custom queries using method naming conventions (findBy...), @Query annotation with JPQL, or native SQL queries. For complex queries, use @Query with JPQL syntax. For database-specific features, use native queries with nativeQuery = true. Learn about [Spring Boot REST API](/tutorial/spring-boot-rest-api) to see JPA in action with REST endpoints.

---

## Key Takeaways

Before proceeding to advanced JPA topics, ensure you understand these fundamental concepts:

- **JPA provides ORM capabilities** that map Java objects to database tables automatically
- **@Entity annotation** marks classes as persistent entities
- **Repository interfaces** extend JpaRepository to provide CRUD operations without implementation
- **@Service layer** contains business logic and coordinates data access
- **@Transactional** ensures data consistency for multiple database operations
- **Relationship annotations** (@OneToMany, @ManyToOne, etc.) manage entity relationships
- **Spring Boot auto-configuration** simplifies JPA setup and database connectivity

---

## What's Next?

Now that you understand Spring Boot JPA fundamentals, you're ready to explore advanced topics and build complete applications:

### Immediate Next Steps

1. **[Spring Boot REST API](/tutorial/spring-boot-rest-api)**: Build RESTful web services that use JPA for data persistence
2. **[Spring Boot Validation](/tutorial/spring-boot-validation)**: Add input validation to your JPA entities
3. **[Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)**: Handle database errors gracefully

### Advanced Topics

- **Custom Queries**: Master JPQL and native SQL queries for complex data retrieval
- **Entity Relationships**: Implement complex one-to-many, many-to-many relationships
- **Transaction Management**: Understand transaction propagation and isolation levels
- **Performance Optimization**: Learn about lazy loading, eager fetching, and query optimization
- **Database Migrations**: Use Flyway or Liquibase for version-controlled schema changes

### Related Tutorials

- **[MySQL Introduction](/tutorial/mysql-introduction)**: Understand database fundamentals
- **[JDBC Introduction](/tutorial/jdbc-introduction)**: Learn direct database access patterns
- **[Hibernate Introduction](/tutorial/hibernate-introduction)**: Deep dive into JPA implementation
- **[Spring Boot Configuration](/tutorial/spring-boot-configuration)**: Master application configuration

Spring Boot JPA provides a robust foundation for building data-driven applications. Continue learning about [Spring Boot REST API](/tutorial/spring-boot-rest-api) to create complete backend services that leverage JPA's powerful features.
`,
  code: `// Complete Spring Boot JPA Example

// 1. Entity
package com.example.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String course;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors, getters, setters
    public Student() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

// 2. Repository
package com.example.repository;

import com.example.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByCourse(String course);
    Student findByEmail(String email);
    
    @Query("SELECT s FROM Student s WHERE s.name LIKE %:name%")
    List<Student> searchByName(@Param("name") String name);
}

// 3. Service
package com.example.service;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {
    
    @Autowired
    private StudentRepository repository;
    
    public List<Student> getAllStudents() {
        return repository.findAll();
    }
    
    public Optional<Student> getStudentById(Long id) {
        return repository.findById(id);
    }
    
    public Student createStudent(Student student) {
        return repository.save(student);
    }
    
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setCourse(studentDetails.getCourse());
        
        return repository.save(student);
    }
    
    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
    
    public List<Student> getStudentsByCourse(String course) {
        return repository.findByCourse(course);
    }
}

// 4. Controller
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {
        try {
            return ResponseEntity.ok(studentService.updateStudent(id, student));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}

// application.properties:
/*
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
*/
`,
  practiceQuestions: [
    {
      question: 'Create a Product entity with JPA annotations (id, name, price, category) and a ProductRepository with methods to find products by category and search by name',
      hint: 'Use @Entity, @Id, @GeneratedValue, @Column annotations. Create repository extending JpaRepository with custom methods',
      starterCode: `package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    // TODO: Add id, name, price, category fields with proper annotations
    // TODO: Add constructors, getters, and setters
}

package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // TODO: Add method to find by category
    // TODO: Add method to search by name
}
`
    }
  ]
};

export default springBootJPA;


