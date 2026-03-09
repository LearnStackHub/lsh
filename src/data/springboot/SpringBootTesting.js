const springBootTesting = {
  id: 'spring-boot-testing',
  title: 'Spring Boot Testing - Unit and Integration Tests',
  description: 'Learn how to write unit tests and integration tests for Spring Boot applications using JUnit, Mockito, and Spring Boot Test',
  content: `
# Spring Boot Testing - Unit and Integration Tests

Testing is not optional. It's how you know your code works. Spring Boot makes testing easy with built-in testing support.

Let me show you how to write proper tests for your Spring Boot application.

---

## Why Testing is Important

Without tests:
- You don't know if code works
- Changes break things silently
- Bugs reach production
- Refactoring is scary

With tests:
- Confidence in your code
- Catch bugs early
- Safe refactoring
- Documentation of behavior

---

## Types of Tests

1. **Unit Tests:** Test individual components in isolation
2. **Integration Tests:** Test components working together
3. **End-to-End Tests:** Test complete workflows

---

## Setting Up Testing

### Dependencies (Already Included)

Spring Boot includes testing dependencies by default:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`

This includes:
- JUnit 5
- Mockito
- AssertJ
- Spring Test

---

## Unit Testing - Service Layer

### Student Service Test

\`\`\`java
package com.example.service;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    
    @Mock
    private StudentRepository studentRepository;
    
    @InjectMocks
    private StudentService studentService;
    
    private Student student;
    
    @BeforeEach
    void setUp() {
        student = new Student();
        student.setId(1L);
        student.setName("Dattu p");
        student.setEmail(" Dattu@example.com");
        student.setCourse("Computer Science");
    }
    
    @Test
    void testGetStudentById_Success() {
        // Arrange
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        
        // Act
        Optional<Student> result = studentService.getStudentById(1L);
        
        // Assert
        assertTrue(result.isPresent());
        assertEquals("Dattu p", result.get().getName());
        verify(studentRepository, times(1)).findById(1L);
    }
    
    @Test
    void testGetStudentById_NotFound() {
        // Arrange
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());
        
        // Act
        Optional<Student> result = studentService.getStudentById(999L);
        
        // Assert
        assertFalse(result.isPresent());
        verify(studentRepository, times(1)).findById(999L);
    }
    
    @Test
    void testCreateStudent_Success() {
        // Arrange
        when(studentRepository.save(any(Student.class))).thenReturn(student);
        
        // Act
        Student result = studentService.createStudent(student);
        
        // Assert
        assertNotNull(result);
        assertEquals("Dattu p", result.getName());
        verify(studentRepository, times(1)).save(student);
    }
    
    @Test
    void testDeleteStudent_Success() {
        // Arrange
        doNothing().when(studentRepository).deleteById(1L);
        
        // Act
        studentService.deleteStudent(1L);
        
        // Assert
        verify(studentRepository, times(1)).deleteById(1L);
    }
}
\`\`\`

**Key Points:**
- \`@ExtendWith(MockitoExtension.class)\`: Enables Mockito
- \`@Mock\`: Creates a mock object
- \`@InjectMocks\`: Injects mocks into the service
- \`when().thenReturn()\`: Defines mock behavior
- \`verify()\`: Verifies method was called

---

## Integration Testing - Controller

### Student Controller Integration Test

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
class StudentControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private StudentService studentService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private Student student;
    
    @BeforeEach
    void setUp() {
        student = new Student();
        student.setId(1L);
        student.setName("Dattu p");
        student.setEmail(" Dattu@example.com");
        student.setCourse("Computer Science");
    }
    
    @Test
    void testGetStudentById_Success() throws Exception {
        // Arrange
        when(studentService.getStudentById(1L)).thenReturn(Optional.of(student));
        
        // Act & Assert
        mockMvc.perform(get("/api/students/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("Dattu p"))
            .andExpect(jsonPath("$.email").value(" Dattu@example.com"));
    }
    
    @Test
    void testGetStudentById_NotFound() throws Exception {
        // Arrange
        when(studentService.getStudentById(999L)).thenReturn(Optional.empty());
        
        // Act & Assert
        mockMvc.perform(get("/api/students/999"))
            .andExpect(status().isNotFound());
    }
    
    @Test
    void testCreateStudent_Success() throws Exception {
        // Arrange
        when(studentService.createStudent(any(Student.class))).thenReturn(student);
        
        // Act & Assert
        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("Dattu p"));
    }
    
    @Test
    void testDeleteStudent_Success() throws Exception {
        // Arrange
        doNothing().when(studentService).deleteStudent(1L);
        
        // Act & Assert
        mockMvc.perform(delete("/api/students/1"))
            .andExpect(status().isNoContent());
    }
}
\`\`\`

---

## Full Application Integration Test

### Test with Real Database (In-Memory)

\`\`\`java
package com.example;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class StudentApplicationIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Test
    void testCreateAndGetStudent() throws Exception {
        // Create student
        String studentJson = """
            {
                "name": "Dattu p",
                "email": " Dattu@example.com",
                "course": "Computer Science"
            }
            """;
        
        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(studentJson))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Dattu p"));
        
        // Verify in database
        Student student = studentRepository.findByEmail(" Dattu@example.com").orElse(null);
        assertNotNull(student);
        assertEquals("Dattu p", student.getName());
    }
}
\`\`\`

**Key Annotations:**
- \`@SpringBootTest\`: Loads full application context
- \`@AutoConfigureMockMvc\`: Enables MockMvc
- \`@Transactional\`: Rolls back after test

---

## Testing Best Practices

1. **Test one thing at a time** - Each test should verify one behavior
2. **Use descriptive test names** - \`testGetStudentById_NotFound\`
3. **Arrange-Act-Assert pattern** - Clear test structure
4. **Use mocks for dependencies** - Isolate what you're testing
5. **Test edge cases** - Null, empty, invalid inputs
6. **Keep tests fast** - Use in-memory database for integration tests

---

## Key Takeaways

1. Use JUnit 5 for test framework
2. Use Mockito for mocking dependencies
3. Use @WebMvcTest for controller tests
4. Use @SpringBootTest for integration tests
5. Test both success and failure cases
6. Keep tests simple and focused

Testing gives you confidence. Write tests for everything important.

**Related Topics:**
- Test your REST APIs built with [Spring Boot REST API](/tutorial/spring-boot-rest-api)
- Test validation logic from [Spring Boot Validation](/tutorial/spring-boot-validation)
- Test exception handling from [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)
- Test JPA repositories from [Spring Boot JPA](/tutorial/spring-boot-jpa)
`,
  code: `// Complete Testing Example

// 1. Service Unit Test
package com.example.service;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    
    @Mock
    private StudentRepository repository;
    
    @InjectMocks
    private StudentService service;
    
    private Student student;
    
    @BeforeEach
    void setUp() {
        student = new Student();
        student.setId(1L);
        student.setName(" Dattu");
        student.setEmail(" Dattu@example.com");
    }
    
    @Test
    void testGetStudentById_Success() {
        when(repository.findById(1L)).thenReturn(Optional.of(student));
        
        Optional<Student> result = service.getStudentById(1L);
        
        assertTrue(result.isPresent());
        assertEquals(" Dattu", result.get().getName());
        verify(repository).findById(1L);
    }
    
    @Test
    void testGetStudentById_NotFound() {
        when(repository.findById(999L)).thenReturn(Optional.empty());
        
        Optional<Student> result = service.getStudentById(999L);
        
        assertFalse(result.isPresent());
    }
}

// 2. Controller Integration Test
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
class StudentControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private StudentService service;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testGetStudentById() throws Exception {
        Student student = new Student();
        student.setId(1L);
        student.setName(" Dattu");
        
        when(service.getStudentById(1L)).thenReturn(Optional.of(student));
        
        mockMvc.perform(get("/api/students/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value(" Dattu"));
    }
}

// Run tests with: mvn test
`,
  practiceQuestions: [
    {
      question: 'Write a unit test for ProductService that tests getProductById method - test both success case (product found) and failure case (product not found)',
      hint: 'Use @ExtendWith(MockitoExtension.class), @Mock for repository, @InjectMocks for service, when().thenReturn() for mocking',
      starterCode: `package com.example.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    
    @Mock
    private ProductRepository repository;
    
    @InjectMocks
    private ProductService service;
    
    @Test
    void testGetProductById_Success() {
        // TODO: Test when product is found
    }
    
    @Test
    void testGetProductById_NotFound() {
        // TODO: Test when product is not found
    }
}
`
    }
  ]
};

export default springBootTesting;


