const springBootValidation = {
  id: 'spring-boot-validation',
  title: 'Spring Boot Validation - Input Validation and Error Handling',
  description: 'Learn how to validate request data in Spring Boot using Bean Validation annotations, custom validators, and proper error responses',
  content: `
# Spring Boot Validation - Input Validation and Error Handling

Users will always enter wrong data. That's a fact. Your job is to catch those mistakes before they cause problems. Validation ensures data is correct before it reaches your business logic.

Spring Boot makes validation easy with Bean Validation (JSR-303). Let me show you how to validate input data properly.

---

## Why Validation is Important

Without validation:
- Users can submit empty names
- Invalid email addresses get stored
- Negative prices accepted
- Database errors from invalid data

With validation:
- Invalid data is rejected immediately
- Clear error messages to users
- Database stays clean
- Better user experience

---

## Setting Up Validation

### Step 1: Add Dependency

In \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`

### Step 2: Enable Validation

Add \`@Valid\` or \`@Validated\` annotation to controller methods.

---

## Basic Validation Annotations

### Common Validation Annotations

| Annotation | Purpose | Example |
|------------|---------|---------|
| @NotNull | Field cannot be null | @NotNull private String name; |
| @NotBlank | String cannot be null, empty, or whitespace | @NotBlank private String email; |
| @NotEmpty | Collection/Array cannot be empty | @NotEmpty private List<String> tags; |
| @Size | String/Collection size | @Size(min=2, max=50) private String name; |
| @Min | Minimum numeric value | @Min(0) private int age; |
| @Max | Maximum numeric value | @Max(100) private int age; |
| @Email | Valid email format | @Email private String email; |
| @Pattern | Regex pattern | @Pattern(regexp="^[0-9]{10}$") private String phone; |
| @Positive | Must be positive | @Positive private double price; |
| @Negative | Must be negative | @Negative private double loss; |
| @Past | Date must be in past | @Past private Date birthDate; |
| @Future | Date must be in future | @Future private Date expiryDate; |

---

## Validating Request Body

### Student Entity with Validation

\`\`\`java
package com.example.model;

import jakarta.validation.constraints.*;

public class Student {
    
    @NotNull(message = "ID is required")
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @Size(min = 3, max = 50, message = "Course must be between 3 and 50 characters")
    private String course;
    
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;
    
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
\`\`\`

### Controller with Validation

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        // Validation happens automatically before this method runs
        // If validation fails, MethodArgumentNotValidException is thrown
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {
        // Validation happens here too
        return ResponseEntity.ok(student);
    }
}
\`\`\`

**Key Point:** \`@Valid\` annotation triggers validation. If validation fails, Spring Boot throws \`MethodArgumentNotValidException\`.

---

## Handling Validation Errors

### Global Exception Handler for Validation

\`\`\`java
package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        
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
}
\`\`\`

### Example Error Response

When validation fails:

\`\`\`json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Email must be valid",
    "age": "Age must be at least 18"
  },
  "timestamp": "2026-02-24T10:30:00"
}
\`\`\`

---

## Validating Path Variables

\`\`\`java
@GetMapping("/{id}")
public ResponseEntity<Student> getStudentById(
        @PathVariable @Min(1) Long id) {
    // Validation happens automatically
    return ResponseEntity.ok(studentService.getStudentById(id));
}
\`\`\`

---

## Validating Query Parameters

\`\`\`java
@GetMapping("/search")
public List<Student> searchStudents(
        @RequestParam @NotBlank String name,
        @RequestParam @Min(0) @Max(100) Integer age) {
    // Both parameters are validated
    return studentService.search(name, age);
}
\`\`\`

**Note:** For query parameters, you need \`@Validated\` on the controller class:

\`\`\`java
@RestController
@RequestMapping("/api/students")
@Validated  // This enables validation for @RequestParam
public class StudentController {
    // ...
}
\`\`\`

---

## Custom Validation

Sometimes you need validation that doesn't exist. Create your own.

### Step 1: Create Custom Annotation

\`\`\`java
package com.example.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailDomainValidator.class)
public @interface ValidEmailDomain {
    String message() default "Email domain is not allowed";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String[] allowedDomains() default {};
}
\`\`\`

### Step 2: Create Validator Class

\`\`\`java
package com.example.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailDomainValidator implements ConstraintValidator<ValidEmailDomain, String> {
    
    private String[] allowedDomains;
    
    @Override
    public void initialize(ValidEmailDomain constraintAnnotation) {
        this.allowedDomains = constraintAnnotation.allowedDomains();
    }
    
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null) {
            return true; // Let @NotNull handle null
        }
        
        for (String domain : allowedDomains) {
            if (email.endsWith("@" + domain)) {
                return true;
            }
        }
        
        return false;
    }
}
\`\`\`

### Step 3: Use Custom Validator

\`\`\`java
@ValidEmailDomain(allowedDomains = {"example.com", "company.com"}, 
                  message = "Email must be from example.com or company.com")
private String email;
\`\`\`

---

## Complete Validation Example

### Student Entity

\`\`\`java
package com.example.model;

import jakarta.validation.constraints.*;

public class Student {
    
    @NotNull(message = "ID is required")
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @Size(min = 3, max = 50, message = "Course must be between 3 and 50 characters")
    private String course;
    
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;
    
    // Getters and Setters
    // ...
}
\`\`\`

### Controller

\`\`\`java
@RestController
@RequestMapping("/api/students")
@Validated
public class StudentController {
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable @Min(1) Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }
}
\`\`\`

### Exception Handler

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
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
}
\`\`\`

---

## Testing Validation

### Test with Invalid Data

\`\`\`bash
# Missing required fields
curl -X POST http://localhost:8080/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":""}'

# Response:
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Email is required"
  }
}

# Invalid email format
curl -X POST http://localhost:8080/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":" Dattu","email":"invalid-email"}'

# Response:
{
  "status": "VALIDATION_ERROR",
  "errors": {
    "email": "Email must be valid"
  }
}
\`\`\`

---

## Best Practices

1. **Validate at the boundary** - Validate in controllers, not in services
2. **Use meaningful error messages** - Tell users what's wrong
3. **Validate early** - Catch errors before they reach business logic
4. **Don't expose sensitive information** - Don't reveal database structure
5. **Be consistent** - Use same validation rules everywhere
6. **Test validation** - Test both valid and invalid inputs

---

## Key Takeaways

1. Add \`spring-boot-starter-validation\` dependency
2. Use validation annotations on entity fields
3. Add \`@Valid\` to controller method parameters
4. Handle \`MethodArgumentNotValidException\` in global exception handler
5. Return clear error messages to users
6. Create custom validators for complex validation

Validation protects your application from bad data. Use it everywhere.

**Related Topics:**
- Build REST APIs with [Spring Boot REST API](/tutorial/spring-boot-rest-api) (uses validation)
- Handle validation errors with [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)
- Work with database entities in [Spring Boot JPA](/tutorial/spring-boot-jpa)
- Test validation logic with [Spring Boot Testing](/tutorial/spring-boot-testing)
`,
  code: `// Complete Validation Example

// 1. Entity with Validation
package com.example.model;

import jakarta.validation.constraints.*;

public class Student {
    
    @NotNull(message = "ID is required")
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @Size(min = 3, max = 50)
    private String course;
    
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;
    
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}

// 2. Controller with Validation
package com.example.controller;

import com.example.model.Student;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@Validated
public class StudentController {
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        // Validation happens automatically
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable @Min(1) Long id) {
        // Path variable validation
        return ResponseEntity.ok(null); // Replace with actual service call
    }
}

// 3. Exception Handler
package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
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
}

// When invalid data is sent:
// POST /api/students with {"name":""}
// Returns: 400 BAD_REQUEST with validation errors
`,
  practiceQuestions: [
    {
      question: 'Create a Product entity with validation: name (required, 2-100 chars), price (required, positive), category (required, 3-50 chars). Add validation to the create endpoint.',
      hint: 'Use @NotBlank, @Size, @NotNull, @Positive annotations on Product fields. Add @Valid to @RequestBody in controller',
      starterCode: `package com.example.model;

import jakarta.validation.constraints.*;

public class Product {
    // TODO: Add id, name, price, category with validation annotations
    // TODO: Add getters and setters
}

// In Controller:
@PostMapping
public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
    // TODO: Implement
}
`
    }
  ]
};

export default springBootValidation;


