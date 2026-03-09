const springBootRestAPI = {
  id: 'spring-boot-rest-api',
  title: 'Spring Boot REST API - Building RESTful Web Services',
  description: 'Complete guide to building REST APIs with Spring Boot - controllers, request mapping, request/response handling, and best practices',
  content: `
# Spring Boot REST API - Building RESTful Web Services

REST (Representational State Transfer) APIs serve as the communication layer between frontend applications and backend services in modern software architecture. RESTful web services enable client-server interactions through standardized HTTP methods, making them the preferred approach for building scalable, maintainable web applications. Spring Boot provides comprehensive support for building REST APIs, offering annotations, automatic JSON serialization, and built-in exception handling.

Enterprise applications across industries utilize REST APIs for various purposes: e-commerce platforms expose product and order APIs, financial services provide transaction and account APIs, social media platforms offer user and content APIs, and cloud services expose management APIs. Understanding REST API development with Spring Boot is essential for modern Java developers building microservices, web applications, and mobile backends.

---

## What is REST?

REST (Representational State Transfer) is an architectural style for designing networked applications. REST was introduced by Roy Fielding in 2000 and has become the de facto standard for building web services. RESTful APIs use HTTP methods to perform operations on resources, which are identified by URLs.

**Core REST Principles:**

1. **Resource-Based URLs**: URLs represent resources (nouns), not actions (verbs)
   - Good: \`/api/students/1\`
   - Bad: \`/api/getStudent?id=1\`

2. **HTTP Methods**: Use appropriate HTTP methods for operations
   - GET: Retrieve resources (read-only, idempotent)
   - POST: Create new resources (may have side effects)
   - PUT: Update entire resources (idempotent)
   - PATCH: Partially update resources
   - DELETE: Remove resources (idempotent)

3. **Stateless**: Each request contains all information needed to process it
   - No server-side session storage
   - Authentication via tokens or headers
   - Request independence

4. **Representation**: Resources can have multiple representations (JSON, XML, HTML)
   - JSON is the most common format
   - Content negotiation via Accept header

5. **Uniform Interface**: Consistent interaction patterns across all resources

6. **Layered System**: Architecture can include intermediaries (proxies, gateways)

REST APIs enable loose coupling between clients and servers, making systems more scalable and maintainable. Spring Boot simplifies REST API development by providing annotations, automatic content negotiation, and built-in support for common HTTP operations.

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
        students.add(new Student(1, "Dattu p", " Dattu@example.com", "Computer Science"));
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
  -d '{"name":" Dattu Updated","email":" Dattu.updated@example.com","course":"CS"}'

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

Spring Boot REST APIs provide a robust foundation for building modern web services. Understanding REST principles and Spring Boot's annotations enables developers to create scalable, maintainable APIs that follow industry best practices.

---

## Real-World Applications

### E-Commerce Platform
E-commerce applications expose REST APIs for product catalog management, shopping cart operations, order processing, and payment integration. REST APIs enable mobile apps and web frontends to interact with the same backend services.

**Implementation Example:**
- Product API endpoints for catalog browsing and search
- Cart API for managing shopping cart items
- Order API for processing and tracking orders
- Payment API for secure transaction processing

### Social Media Platform
Social media applications use REST APIs for user management, content creation, feed generation, and social interactions. REST APIs enable real-time updates and cross-platform compatibility.

**Implementation Example:**
- User API for profile management and authentication
- Post API for content creation and retrieval
- Comment API for user interactions
- Feed API for personalized content delivery

### Financial Services
Banking and financial applications expose REST APIs for account management, transaction processing, and financial reporting. REST APIs ensure secure, standardized access to financial data.

**Implementation Example:**
- Account API for balance inquiries and account details
- Transaction API for payment processing
- Statement API for transaction history
- Transfer API for fund transfers between accounts

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Wrong HTTP Methods
**Problem:** Using GET for operations that modify data violates REST principles and can cause caching issues.

**Solution:** Always use appropriate HTTP methods:
- GET for retrieving data
- POST for creating resources
- PUT for full updates
- PATCH for partial updates
- DELETE for removing resources

### Mistake 2: Not Returning Proper Status Codes
**Problem:** Returning 200 OK for all responses makes error handling difficult for clients.

**Solution:** Use appropriate HTTP status codes:
- 200 OK for successful GET/PUT requests
- 201 Created for successful POST requests
- 204 No Content for successful DELETE requests
- 400 Bad Request for validation errors
- 404 Not Found for missing resources
- 500 Internal Server Error for server errors

### Mistake 3: Exposing Internal Implementation Details
**Problem:** Returning stack traces or internal error messages in API responses.

**Solution:** Create custom error response objects:

\`\`\`java
public class ErrorResponse {
    private String error;
    private String message;
    private long timestamp;
}
\`\`\`

### Mistake 4: Not Versioning APIs
**Problem:** Changing API structure breaks existing clients.

**Solution:** Version your APIs from the start:

\`\`\`java
@RequestMapping("/api/v1/students")
\`\`\`

### Mistake 5: Ignoring Content Negotiation
**Problem:** Hardcoding JSON responses limits API flexibility.

**Solution:** Support multiple content types and use Accept header:

\`\`\`java
@GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is REST and why is it important?

REST (Representational State Transfer) is an architectural style for designing web services that use HTTP methods to perform operations on resources. REST is important because it provides a standardized, scalable approach to building APIs that are easy to understand, maintain, and integrate with. Most modern applications use REST APIs for client-server communication. Learn more about [HTTP Methods](/tutorial/http-methods) to understand the foundation of REST.

### What's the difference between REST and SOAP?

REST is an architectural style that uses HTTP methods and JSON/XML for data exchange, while SOAP is a protocol that uses XML and can work over various transport protocols. REST is simpler, more lightweight, and easier to work with, making it the preferred choice for most modern web services. SOAP provides more built-in security and transaction features but is more complex.

### Do I need to know Spring Framework before learning Spring Boot REST API?

While not strictly required, understanding [Spring Framework](/tutorial/spring-introduction) fundamentals helps. Spring Boot REST APIs use Spring MVC under the hood, so knowledge of [Spring DI](/tutorial/spring-di) and [Spring IOC](/tutorial/spring-ioc) concepts is beneficial. However, Spring Boot simplifies REST API development significantly, so you can start with Spring Boot and learn Spring Framework concepts as needed.

### What is the difference between @Controller and @RestController?

@Controller is used for traditional Spring MVC applications that return views (HTML pages), while @RestController combines @Controller and @ResponseBody, indicating that all methods return data (JSON/XML) rather than views. For REST APIs, always use @RestController.

### How do I handle errors in REST APIs?

Use @RestControllerAdvice to create global exception handlers that return appropriate error responses. Create custom exception classes and map them to HTTP status codes. Always return consistent error response formats with meaningful error messages. Learn about [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling) for detailed error handling strategies.

### What is the purpose of @RequestBody and @ResponseBody?

@RequestBody converts JSON/XML from the HTTP request body into Java objects automatically. @ResponseBody converts Java objects returned from controller methods into JSON/XML responses. @RestController includes @ResponseBody by default, so you don't need to add it explicitly.

### How do I validate request data in REST APIs?

Use Bean Validation annotations (@NotNull, @Size, @Email, etc.) on your model classes and add @Valid annotation to controller method parameters. Spring Boot automatically validates requests and returns 400 Bad Request for validation failures. Learn about [Spring Boot Validation](/tutorial/spring-boot-validation) for comprehensive validation strategies.

### What is the difference between PUT and PATCH?

PUT is used to replace an entire resource, requiring all fields to be provided. PATCH is used for partial updates, allowing you to update only specific fields. Use PUT when you want to ensure the entire resource is updated, and PATCH when you want to update only certain fields.

### How do I secure my REST API?

Implement authentication and authorization using Spring Security. Use JWT tokens for stateless authentication, implement role-based access control, and use HTTPS for secure communication. Learn about [Spring Boot Security](/tutorial/spring-boot-security) for comprehensive security implementation.

### Can I use REST APIs with databases?

Yes, REST APIs commonly interact with databases. Use [Spring Boot JPA](/tutorial/spring-boot-jpa) to connect your REST API to databases. The service layer handles database operations, and controllers expose REST endpoints that use the service layer. This separation of concerns keeps your code organized and maintainable.

---

## Key Takeaways

Before proceeding to advanced REST API topics, ensure you understand these fundamental concepts:

- **REST uses HTTP methods** (GET, POST, PUT, DELETE) to perform operations on resources
- **\`@RestController\`** marks a class as a REST controller that returns data, not views
- **\`@RequestMapping\`** defines the base URL path for all methods in a controller
- **\`@GetMapping, @PostMapping, etc.\`** map HTTP methods to Java methods
- **\`@PathVariable\`** extracts values from URL paths
- **\`@RequestBody\`** converts JSON request bodies to Java objects
- **ResponseEntity** provides control over HTTP status codes and response headers
- **REST principles** ensure APIs are stateless, resource-based, and use standard HTTP methods

---

## What's Next?

Now that you understand Spring Boot REST API fundamentals, you're ready to build complete backend services:

### Immediate Next Steps

1. **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: Connect your REST API to databases for persistent data storage
2. **[Spring Boot Validation](/tutorial/spring-boot-validation)**: Add input validation to ensure data integrity
3. **[Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)**: Handle errors gracefully with proper exception handling
4. **[Spring Boot Security](/tutorial/spring-boot-security)**: Secure your API with authentication and authorization

### Advanced Topics

- **API Versioning**: Implement versioning strategies for API evolution
- **Content Negotiation**: Support multiple response formats (JSON, XML)
- **Pagination**: Implement pagination for large data sets
- **Filtering and Sorting**: Add query parameters for data filtering
- **API Documentation**: Use Swagger/OpenAPI for API documentation
- **Rate Limiting**: Implement rate limiting to protect your API
- **Caching**: Add caching strategies for improved performance

### Related Tutorials

- **[HTTP Methods](/tutorial/http-methods)**: Understand HTTP protocol fundamentals
- **[REST API Fundamentals](/tutorial/rest-api-fundamentals)**: Deep dive into REST principles
- **[Spring Boot Introduction](/tutorial/spring-boot-introduction)**: Master Spring Boot framework
- **[Spring Framework](/tutorial/spring-introduction)**: Understand the underlying Spring Framework

Spring Boot REST APIs enable you to build scalable, maintainable web services. Continue learning about [Spring Boot JPA](/tutorial/spring-boot-jpa) to create complete data-driven applications with persistent storage.
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


