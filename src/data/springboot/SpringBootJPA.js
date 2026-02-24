const springBootJPA = {
  id: 'spring-boot-jpa',
  title: 'Spring Boot with JPA - Database Integration',
  description: 'Learn how to connect Spring Boot with databases using JPA, create entities, repositories, and perform CRUD operations',
  content: `
# Spring Boot with JPA - Database Integration

Most applications need to store data. That's where databases come in. Spring Boot makes database integration incredibly easy with JPA (Java Persistence API). Let me show you how to connect your Spring Boot application to a database and work with data.

---

## What is JPA?

JPA is a Java specification for managing relational data. It lets you work with databases using Java objects instead of writing SQL queries manually.

**Key Benefits:**
- Write Java code, not SQL
- Automatic table creation
- Easy relationships between entities
- Built-in query methods

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
  -d '{"name":"John","email":"john@example.com","course":"CS"}'

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

JPA makes database work much easier. Start simple, then add complexity as needed.
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

