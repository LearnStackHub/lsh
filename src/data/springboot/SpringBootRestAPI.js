const springBootRestAPI = {
  id: 'spring-boot-rest-api',
  title: 'Spring Boot REST API - Building RESTful Web Services',
  description: 'Complete guide to building REST APIs with Spring Boot - controllers, request mapping, request/response handling, and best practices',
  content: `
# Spring Boot REST API - Building RESTful Web Services

REST APIs are how modern applications communicate. Your frontend talks to your backend through REST endpoints. Understanding REST is crucial for any backend developer.

Let me show you how to build professional REST APIs with Spring Boot.

---

## What is REST?

REST stands for Representational State Transfer. In simple terms, it's a way to design web services that use HTTP methods (GET, POST, PUT, DELETE) to perform operations.

**REST Principles:**
- Use HTTP methods correctly (GET for read, POST for create, etc.)
- URLs represent resources (not actions)
- Stateless (each request contains all information needed)
- Return JSON (or XML) data

---

## Your First REST Controller

Let's build a simple REST API for managing students.

### Basic Controller

\`\`\`java
package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    
    @GetMapping("/students")
    public String getAllStudents() {
        return "List of all students";
    }
}
\`\`\`

**What's happening:**
- \`@RestController\`: Marks this class as a REST controller
- \`@GetMapping("/students")\`: Maps GET requests to /students
- Method returns a String (Spring Boot converts it to JSON)

### Test It

\`\`\`bash
# Using curl
curl http://localhost:8080/students

# Using browser
# Just open: http://localhost:8080/students
\`\`\`

---

## HTTP Methods in REST

Each HTTP method has a specific purpose:

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get all students |
| POST | Create new resource | Create a student |
| PUT | Update entire resource | Update student |
| PATCH | Update part of resource | Update student name only |
| DELETE | Delete resource | Delete a student |

---

## Complete CRUD REST API

Let's build a complete Student Management API.

### Step 1: Create Student Model

\`\`\`java
package com.example.model;

public class Student {
    private int id;
    private String name;
    private String email;
    private String course;
    
    // Constructors
    public Student() {}
    
    public Student(int id, String name, String email, String course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
}
\`\`\`

### Step 2: Create Service Layer

\`\`\`java
package com.example.service;

import com.example.model.Student;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    private List<Student> students = new ArrayList<>();
    private int nextId = 1;
    
    public StudentService() {
        // Initialize with sample data
        students.add(new Student(1, "John Doe", "john@example.com", "Computer Science"));
        students.add(new Student(2, "Jane Smith", "jane@example.com", "Mathematics"));
    }
    
    // GET - Get all students
    public List<Student> getAllStudents() {
        return students;
    }
    
    // GET - Get student by ID
    public Optional<Student> getStudentById(int id) {
        return students.stream()
            .filter(s -> s.getId() == id)
            .findFirst();
    }
    
    // POST - Create new student
    public Student createStudent(Student student) {
        student.setId(nextId++);
        students.add(student);
        return student;
    }
    
    // PUT - Update student
    public Optional<Student> updateStudent(int id, Student updatedStudent) {
        Optional<Student> existing = getStudentById(id);
        if (existing.isPresent()) {
            Student student = existing.get();
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setCourse(updatedStudent.getCourse());
            return Optional.of(student);
        }
        return Optional.empty();
    }
    
    // DELETE - Delete student
    public boolean deleteStudent(int id) {
        return students.removeIf(s -> s.getId() == id);
    }
}
\`\`\`

### Step 3: Create REST Controller

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    // GET /api/students - Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    
    // GET /api/students/{id} - Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentService.getStudentById(id);
        
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // POST /api/students - Create new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    // PUT /api/students/{id} - Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable int id, 
            @RequestBody Student student) {
        Optional<Student> updated = studentService.updateStudent(id, student);
        
        if (updated.isPresent()) {
            return ResponseEntity.ok(updated.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // DELETE /api/students/{id} - Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
        boolean deleted = studentService.deleteStudent(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
\`\`\`

---

## Understanding the Annotations

**@RestController:**
- Combines @Controller and @ResponseBody
- All methods return data (not views)

**@RequestMapping("/api/students"):**
- Base path for all methods in this controller
- All URLs start with /api/students

**@GetMapping, @PostMapping, @PutMapping, @DeleteMapping:**
- Maps HTTP methods to Java methods
- Can specify additional path: @GetMapping("/{id}")

**@PathVariable:**
- Extracts value from URL
- /api/students/1 → id = 1

**@RequestBody:**
- Converts JSON from request body to Java object
- Spring Boot automatically handles JSON conversion

**@Autowired:**
- Spring Boot injects StudentService automatically

**ResponseEntity:**
- Allows you to set HTTP status code and headers
- ResponseEntity.ok() = 200 OK
- ResponseEntity.notFound() = 404 Not Found
- ResponseEntity.status(HttpStatus.CREATED) = 201 Created

---

## Testing Your REST API

### Using curl

\`\`\`bash
# GET all students
curl http://localhost:8080/api/students

# GET student by ID
curl http://localhost:8080/api/students/1

# POST - Create student
curl -X POST http://localhost:8080/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Bob","email":"bob@example.com","course":"Physics"}'

# PUT - Update student
curl -X PUT http://localhost:8080/api/students/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John Updated","email":"john.updated@example.com","course":"CS"}'

# DELETE - Delete student
curl -X DELETE http://localhost:8080/api/students/1
\`\`\`

### Using Postman

1. Create a new request
2. Set method (GET, POST, etc.)
3. Enter URL: http://localhost:8080/api/students
4. For POST/PUT: Go to Body → raw → JSON
5. Enter JSON data
6. Click Send

---

## Request Parameters

### Query Parameters

\`\`\`java
// GET /api/students?course=CS&limit=10
@GetMapping
public List<Student> getStudents(
    @RequestParam(required = false) String course,
    @RequestParam(defaultValue = "10") int limit) {
    
    if (course != null) {
        return studentService.getStudentsByCourse(course);
    }
    return studentService.getAllStudents().stream()
        .limit(limit)
        .collect(Collectors.toList());
}
\`\`\`

### Path Variables

\`\`\`java
// GET /api/students/1
@GetMapping("/{id}")
public Student getStudent(@PathVariable int id) {
    return studentService.getStudentById(id);
}
\`\`\`

### Request Body

\`\`\`java
// POST /api/students
@PostMapping
public Student createStudent(@RequestBody Student student) {
    return studentService.createStudent(student);
}
\`\`\`

---

## Response Status Codes

Use appropriate HTTP status codes:

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 OK | Success | GET, PUT successful |
| 201 Created | Resource created | POST successful |
| 204 No Content | Success, no body | DELETE successful |
| 400 Bad Request | Invalid input | Validation failed |
| 404 Not Found | Resource not found | ID doesn't exist |
| 500 Internal Server Error | Server error | Exception occurred |

---

## Exception Handling in REST API

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStudentNotFound(
            StudentNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "STUDENT_NOT_FOUND",
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An error occurred",
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
\`\`\`

---

## REST API Best Practices

1. **Use Nouns, Not Verbs:** /students not /getStudents
2. **Use Plural Nouns:** /students not /student
3. **Use HTTP Methods Correctly:** GET for read, POST for create
4. **Return Appropriate Status Codes:** 200, 201, 404, etc.
5. **Use Consistent URL Structure:** /api/v1/resource/{id}
6. **Version Your APIs:** /api/v1/students, /api/v2/students
7. **Document Your API:** Use Swagger/OpenAPI
8. **Handle Errors Gracefully:** Return meaningful error messages

---

## Key Takeaways

1. @RestController makes a class handle HTTP requests
2. @GetMapping, @PostMapping map HTTP methods to Java methods
3. @PathVariable extracts values from URL
4. @RequestBody converts JSON to Java objects
5. ResponseEntity gives you control over HTTP response
6. Follow REST conventions for professional APIs

Build your REST API step by step. Start simple, then add complexity.

**Next Steps:**
- Learn how to handle errors properly with [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)
- Add input validation with [Spring Boot Validation](/tutorial/spring-boot-validation)
- Connect your API to a database using [Spring Boot JPA](/tutorial/spring-boot-jpa)
- Secure your API with [Spring Boot Security](/tutorial/spring-boot-security)
`,
  code: `// Complete REST API Example
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    // GET all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    
    // GET student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // POST - Create student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    // PUT - Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable int id,
            @RequestBody Student student) {
        Optional<Student> updated = studentService.updateStudent(id, student);
        return updated.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE - Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
        if (studentService.deleteStudent(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // GET with query parameters
    @GetMapping("/search")
    public List<Student> searchStudents(
            @RequestParam(required = false) String course,
            @RequestParam(defaultValue = "10") int limit) {
        // Implementation
        return studentService.getAllStudents();
    }
}

// Test with:
// GET    http://localhost:8080/api/students
// GET    http://localhost:8080/api/students/1
// POST   http://localhost:8080/api/students
// PUT    http://localhost:8080/api/students/1
// DELETE http://localhost:8080/api/students/1
`,
  practiceQuestions: [
    {
      question: 'Create a REST API for Product management with endpoints: GET /api/products, GET /api/products/{id}, POST /api/products, PUT /api/products/{id}, DELETE /api/products/{id}',
      hint: 'Create Product model, ProductService, and ProductController. Use @RestController, @RequestMapping, and appropriate HTTP method annotations',
      starterCode: `package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // TODO: Autowire ProductService
    
    // TODO: GET /api/products - Get all products
    
    // TODO: GET /api/products/{id} - Get product by ID
    
    // TODO: POST /api/products - Create product
    
    // TODO: PUT /api/products/{id} - Update product
    
    // TODO: DELETE /api/products/{id} - Delete product
}
`
    }
  ]
};

export default springBootRestAPI;


