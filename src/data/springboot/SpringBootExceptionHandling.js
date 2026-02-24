const springBootExceptionHandling = {
  id: 'spring-boot-exception-handling',
  title: 'Spring Boot Exception Handling - Global Exception Handler',
  description: 'Learn how to handle exceptions globally in Spring Boot using @ControllerAdvice, create custom exceptions, and return proper error responses',
  content: `
# Spring Boot Exception Handling - Global Exception Handler

When something goes wrong in your application, you need to handle it gracefully. Instead of letting exceptions crash your application or return ugly error pages, you should return clean, meaningful error messages to your API clients.

Spring Boot provides excellent support for exception handling. Let me show you how to do it properly.

---

## The Problem with Default Exception Handling

By default, when an exception occurs in Spring Boot:

\`\`\`java
@GetMapping("/students/{id}")
public Student getStudent(@PathVariable Long id) {
    return studentService.getStudentById(id)
        .orElseThrow(() -> new RuntimeException("Student not found"));
}
\`\`\`

If student is not found, you get:
- HTTP 500 Internal Server Error
- Ugly error page or stack trace
- No meaningful error message

This is bad for APIs. You need:
- Proper HTTP status codes (404 for not found)
- Clean JSON error response
- Meaningful error messages

---

## Solution: Global Exception Handler

Spring Boot lets you create a global exception handler that catches all exceptions and returns proper responses.

### Basic Global Exception Handler

\`\`\`java
package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        ErrorResponse error = new ErrorResponse(
            "ERROR",
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
\`\`\`

**What this does:**
- \`@RestControllerAdvice\`: Catches exceptions from all controllers
- \`@ExceptionHandler\`: Specifies which exception to handle
- Returns a proper JSON response with status code

### Error Response DTO

\`\`\`java
package com.example.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String status;
    private String message;
    private LocalDateTime timestamp;
    private String path;
    
    public ErrorResponse(String status, String message, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
}
\`\`\`

---

## Creating Custom Exceptions

Instead of using generic RuntimeException, create specific exceptions:

### StudentNotFoundException

\`\`\`java
package com.example.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(String message) {
        super(message);
    }
    
    public StudentNotFoundException(Long id) {
        super("Student not found with ID: " + id);
    }
}
\`\`\`

### InvalidInputException

\`\`\`java
package com.example.exception;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
\`\`\`

---

## Complete Global Exception Handler

\`\`\`java
package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // Handle StudentNotFoundException
    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStudentNotFound(
            StudentNotFoundException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "STUDENT_NOT_FOUND",
            ex.getMessage(),
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    // Handle InvalidInputException
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInput(
            InvalidInputException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "INVALID_INPUT",
            ex.getMessage(),
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    // Handle Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "VALIDATION_ERROR");
        response.put("message", "Validation failed");
        response.put("errors", errors);
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    // Handle all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        
        // Log the exception
        ex.printStackTrace();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
\`\`\`

---

## Using Custom Exceptions in Service

\`\`\`java
@Service
public class StudentService {
    
    @Autowired
    private StudentRepository repository;
    
    public Student getStudentById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(id));
    }
    
    public Student createStudent(Student student) {
        if (student.getEmail() == null || student.getEmail().isEmpty()) {
            throw new InvalidInputException("Email is required");
        }
        
        if (repository.findByEmail(student.getEmail()) != null) {
            throw new InvalidInputException("Email already exists");
        }
        
        return repository.save(student);
    }
}
\`\`\`

---

## Controller with Exception Handling

\`\`\`java
@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
\`\`\`

Notice: No try-catch blocks! The global exception handler takes care of everything.

---

## Error Response Examples

### Student Not Found (404)

\`\`\`json
{
  "status": "STUDENT_NOT_FOUND",
  "message": "Student not found with ID: 999",
  "timestamp": "2026-02-24T10:30:00",
  "path": "/api/students/999"
}
\`\`\`

### Invalid Input (400)

\`\`\`json
{
  "status": "INVALID_INPUT",
  "message": "Email is required",
  "timestamp": "2026-02-24T10:30:00",
  "path": "/api/students"
}
\`\`\`

### Validation Error (400)

\`\`\`json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "email": "Email is required",
    "name": "Name must not be empty"
  },
  "timestamp": "2026-02-24T10:30:00"
}
\`\`\`

---

## HTTP Status Codes for Different Errors

| Exception Type | HTTP Status | When to Use |
|---------------|-------------|-------------|
| Resource Not Found | 404 NOT_FOUND | Student, Product not found |
| Invalid Input | 400 BAD_REQUEST | Missing required fields |
| Validation Error | 400 BAD_REQUEST | Data validation failed |
| Unauthorized | 401 UNAUTHORIZED | Not authenticated |
| Forbidden | 403 FORBIDDEN | Not authorized |
| Conflict | 409 CONFLICT | Duplicate email, etc. |
| Server Error | 500 INTERNAL_SERVER_ERROR | Unexpected errors |

---

## Best Practices

1. **Create specific exceptions** for different error types
2. **Use appropriate HTTP status codes**
3. **Return meaningful error messages** (but don't expose sensitive info)
4. **Log exceptions** for debugging
5. **Don't expose stack traces** in production
6. **Use consistent error response format**

---

## Advanced: Exception Handling with Logging

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStudentNotFound(
            StudentNotFoundException ex, WebRequest request) {
        
        logger.warn("Student not found: {}", ex.getMessage());
        
        ErrorResponse error = new ErrorResponse(
            "STUDENT_NOT_FOUND",
            ex.getMessage(),
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, WebRequest request) {
        
        logger.error("Unexpected error occurred", ex);
        
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
\`\`\`

---

## Key Takeaways

1. Use @RestControllerAdvice for global exception handling
2. Create custom exceptions for specific error types
3. Return appropriate HTTP status codes
4. Provide meaningful error messages
5. Log exceptions for debugging
6. Keep error response format consistent

Exception handling makes your API professional and user-friendly. Handle errors gracefully.
`,
  code: `// Complete Exception Handling Example

// 1. Custom Exceptions
package com.example.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(Long id) {
        super("Student not found with ID: " + id);
    }
}

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}

// 2. Error Response DTO
package com.example.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String status;
    private String message;
    private LocalDateTime timestamp;
    private String path;
    
    public ErrorResponse(String status, String message, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
}

// 3. Global Exception Handler
package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStudentNotFound(
            StudentNotFoundException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "STUDENT_NOT_FOUND",
            ex.getMessage(),
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInput(
            InvalidInputException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "INVALID_INPUT",
            ex.getMessage(),
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        error.setPath(request.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

// 4. Service using exceptions
package com.example.service;

import com.example.exception.StudentNotFoundException;
import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository repository;
    
    public Student getStudentById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(id));
    }
}

// When StudentNotFoundException is thrown, GlobalExceptionHandler
// automatically catches it and returns proper JSON response with 404 status
`,
  practiceQuestions: [
    {
      question: 'Create a ProductNotFoundException and add it to the GlobalExceptionHandler to return 404 status when product is not found',
      hint: 'Create ProductNotFoundException extending RuntimeException, add @ExceptionHandler method in GlobalExceptionHandler',
      starterCode: `package com.example.exception;

// TODO: Create ProductNotFoundException class

// In GlobalExceptionHandler:
// TODO: Add @ExceptionHandler method for ProductNotFoundException
// TODO: Return 404 status with proper error response
`
    }
  ]
};

export default springBootExceptionHandling;

