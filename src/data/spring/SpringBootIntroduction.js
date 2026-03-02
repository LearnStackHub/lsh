const springBootIntroduction = {
  id: 'spring-boot-introduction',
  title: 'Spring Boot - Your First Step into Enterprise Java',
  description: 'Complete beginner guide to Spring Boot - understand what it is, why it exists, and build your first application',
  content: `
# Spring Boot - Your First Step into Enterprise Java

Let me tell you something straight. If you're learning Java and want to build real applications that companies actually use, you need to know Spring Boot. Not "maybe" or "someday". You need it now.

But here's the thing - most tutorials throw a bunch of technical jargon at you. "Auto-configuration", "starter dependencies", "embedded server". What does that even mean? Let me explain it like I'm sitting next to you, showing you how it works.

---

## What is Spring Boot? The Simple Answer

Think of Spring Boot as a helper that makes building Java applications way easier. 

Remember when you learned Servlets? You had to:
- Create web.xml
- Configure Tomcat
- Set up deployment descriptors
- Write tons of boilerplate code

Spring Boot says: "Forget all that. Just write your code. I'll handle the rest."

That's it. That's Spring Boot in one sentence.

---

## Why Spring Boot Exists - The Real Story

Before Spring Boot, building a Spring application was painful. Let me show you what developers had to do:

### The Old Way (Before Spring Boot)

\`\`\`java
// Step 1: Create web.xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app>
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring-config.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>

// Step 2: Create spring-config.xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans">
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>
    <!-- More configuration... -->
</beans>

// Step 3: Configure Tomcat
// Step 4: Create WAR file
// Step 5: Deploy to server
// Step 6: Hope it works
\`\`\`

That's a lot of work just to get started, right? And I haven't even shown you the Java code yet.

### The Spring Boot Way

\`\`\`java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
\`\`\`

That's it. Two classes. No XML. No configuration files. No server setup. Just run it and it works.

---

## What Makes Spring Boot Special?

Spring Boot does three things that change everything:

### 1. Auto-Configuration - It Guesses What You Need

You know how your phone automatically connects to WiFi when you're at home? Spring Boot does something similar.

When you add a database dependency, Spring Boot automatically:
- Creates a database connection
- Sets up connection pooling
- Configures everything for you

You don't tell it to do this. It just knows.

**Real Example:**

\`\`\`java
// You add this to pom.xml:
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

// Spring Boot automatically:
// - Detects MySQL driver
// - Creates DataSource bean
// - Configures connection
// - You just use it!
\`\`\`

### 2. Starter Dependencies - Get Everything You Need

Instead of adding 20 different dependencies one by one, Spring Boot gives you "starters" - pre-packaged sets of dependencies.

Want to build a web application? Add one dependency:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`

This one dependency includes:
- Spring MVC (for web)
- Embedded Tomcat (server)
- Jackson (JSON handling)
- Validation
- And more...

All in one line. That's the power of starters.

### 3. Embedded Server - No More Server Setup

Remember deploying to Tomcat? Creating WAR files? Configuring ports?

Spring Boot includes a server inside your application. When you run your Java program, it starts a web server automatically.

\`\`\`java
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
        // Server starts automatically on port 8080
    }
}
\`\`\`

No Tomcat installation. No deployment. Just run and it works.

---

## Your First Spring Boot Application

Let's build something real. A simple REST API that returns student information.

### Step 1: Create the Project Structure

\`\`\`
my-spring-boot-app/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── MyApplication.java
│       │           └── controller/
│       │               └── StudentController.java
│       └── resources/
│           └── application.properties
└── pom.xml
\`\`\`

### Step 2: Add Dependencies (pom.xml)

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>my-spring-boot-app</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <!-- Web starter - includes everything for web apps -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
\`\`\`

### Step 3: Create the Main Application Class

\`\`\`java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
\`\`\`

This is your entry point. The \`@SpringBootApplication\` annotation tells Spring Boot:
- This is a Spring Boot application
- Enable auto-configuration
- Scan for components in this package

### Step 4: Create a Controller

\`\`\`java
package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    
    @GetMapping("/students")
    public String getStudents() {
        return "List of students";
    }
    
    @GetMapping("/students/1")
    public String getStudent() {
        return "Student with ID 1";
    }
}
\`\`\`

Let me explain what's happening:

- \`@RestController\`: This class handles HTTP requests
- \`@GetMapping("/students")\`: When someone visits /students, this method runs
- The method returns a String, which Spring Boot converts to JSON automatically

### Step 5: Run It

\`\`\`bash
# Option 1: Using Maven
mvn spring-boot:run

# Option 2: Run the main method in your IDE
# Just right-click MyApplication.java → Run
\`\`\`

Open your browser and go to: \`http://localhost:8080/students\`

You'll see: "List of students"

That's it. Your first Spring Boot application is running.

---

## Understanding the Annotations

Let me break down what each annotation does:

### @SpringBootApplication

This is actually three annotations in one:

\`\`\`java
@SpringBootApplication
// Is equivalent to:
@Configuration      // This class has configuration
@EnableAutoConfiguration  // Enable auto-configuration
@ComponentScan      // Scan for components in this package
\`\`\`

### @RestController

\`\`\`java
@RestController
// Is equivalent to:
@Controller
@ResponseBody  // Return data directly, not a view
\`\`\`

### @GetMapping

This maps HTTP GET requests to your method:

\`\`\`java
@GetMapping("/students")
// When someone does: GET http://localhost:8080/students
// This method runs
\`\`\`

---

## Real-World Example: Student Management API

Let's build something more realistic. A simple API to manage students.

### Create a Student Model

\`\`\`java
package com.example.model;

public class Student {
    private int id;
    private String name;
    private String email;
    
    // Constructors
    public Student() {}
    
    public Student(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
\`\`\`

### Create a Service Layer

\`\`\`java
package com.example.service;

import com.example.model.Student;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    
    private List<Student> students = new ArrayList<>();
    
    public StudentService() {
        // Add some sample data
        students.add(new Student(1, "John Doe", "john@example.com"));
        students.add(new Student(2, "Jane Smith", "jane@example.com"));
    }
    
    public List<Student> getAllStudents() {
        return students;
    }
    
    public Student getStudentById(int id) {
        return students.stream()
            .filter(s -> s.getId() == id)
            .findFirst()
            .orElse(null);
    }
    
    public Student addStudent(Student student) {
        student.setId(students.size() + 1);
        students.add(student);
        return student;
    }
}
\`\`\`

Notice the \`@Service\` annotation. This tells Spring Boot: "This is a service class. Create an instance and manage it for me."

### Update the Controller

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Student getStudent(@PathVariable int id) {
        return studentService.getStudentById(id);
    }
    
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }
}
\`\`\`

Let me explain the new parts:

- \`@Autowired\`: Spring Boot automatically injects StudentService here. You don't create it yourself.
- \`@RequestMapping("/api/students")\`: All methods in this controller start with /api/students
- \`@PathVariable\`: Gets the ID from the URL (e.g., /api/students/1)
- \`@RequestBody\`: Converts JSON from request body to Student object
- \`@PostMapping\`: Handles POST requests

### Test It

\`\`\`bash
# Get all students
curl http://localhost:8080/api/students

# Get student by ID
curl http://localhost:8080/api/students/1

# Add a new student
curl -X POST http://localhost:8080/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Bob","email":"bob@example.com"}'
\`\`\`

---

## How Spring Boot Works Internally

When you run a Spring Boot application, here's what happens:

### Step 1: Application Starts

\`\`\`java
SpringApplication.run(MyApplication.class, args);
\`\`\`

This line:
1. Creates an ApplicationContext (container for all your beans)
2. Scans for components (@Controller, @Service, etc.)
3. Auto-configures everything
4. Starts the embedded server

### Step 2: Component Scanning

Spring Boot scans your package and finds:
- @RestController → Creates StudentController
- @Service → Creates StudentService
- @SpringBootApplication → Your main class

### Step 3: Dependency Injection

When Spring Boot creates StudentController, it sees:

\`\`\`java
@Autowired
private StudentService studentService;
\`\`\`

It automatically finds StudentService (which it already created) and injects it here.

### Step 4: Request Handling

When a request comes in:
1. DispatcherServlet receives it
2. Finds the right controller method
3. Executes the method
4. Converts return value to JSON
5. Sends response

All of this happens automatically. You just write the business logic.

---

## Configuration with application.properties

You can configure your application without code:

\`\`\`properties
# application.properties

# Change server port
server.port=9090

# Application name
spring.application.name=Student Management

# Logging level
logging.level.com.example=DEBUG
\`\`\`

Spring Boot reads this file automatically. No code needed.

---

## Common Questions from Freshers

### Q: Do I need to know Spring Framework before Spring Boot?

**A:** Not really. Spring Boot hides most of the complexity. But understanding Spring basics (IoC, DI) helps.

### Q: What's the difference between Spring and Spring Boot?

**A:** 
- Spring: Framework with lots of configuration
- Spring Boot: Opinionated version of Spring with auto-configuration

Think of Spring as a toolkit. Spring Boot is a pre-assembled tool that works out of the box.

### Q: Can I use Spring Boot without Maven/Gradle?

**A:** Technically yes, but you'll lose all the benefits. Maven/Gradle handle dependencies for you.

### Q: Do I need to install Tomcat?

**A:** No. Spring Boot includes an embedded server. Just run your application.

### Q: How do I deploy a Spring Boot application?

**A:** Two ways:
1. Run as JAR: \`java -jar myapp.jar\`
2. Create WAR and deploy to server (optional)

---

## What's Next?

Now that you understand Spring Boot basics:

1. **Connect to a Database**: Learn Spring Data JPA
2. **Add Security**: Learn Spring Security
3. **Build REST APIs**: Learn advanced REST patterns
4. **Deploy**: Learn how to deploy to cloud

But first, practice what you learned. Build a simple CRUD application. Make mistakes. Fix them. That's how you learn.

---

## Key Takeaways

1. Spring Boot makes Java development faster and easier
2. Auto-configuration handles setup for you
3. Starter dependencies give you everything you need
4. Embedded server means no deployment configuration
5. Just focus on your business logic, Spring Boot handles the rest

Remember: Spring Boot isn't magic. It's just smart defaults and automation. Once you understand what it's doing, you'll see it's all just Spring Framework with less configuration.

Now go build something.
`,
  code: `// Complete Spring Boot Application Example
// This is a working example you can run

package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// Main Application Class
@SpringBootApplication
public class StudentManagementApp {
    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApp.class, args);
        System.out.println("Application started on http://localhost:8080");
    }
}

// Student Model
class Student {
    private int id;
    private String name;
    private String email;
    
    public Student() {}
    
    public Student(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    @Override
    public String toString() {
        return "Student{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}

// Service Layer
@Service
class StudentService {
    private List<Student> students = new ArrayList<>();
    
    public StudentService() {
        // Initialize with sample data
        students.add(new Student(1, "John Doe", "john@example.com"));
        students.add(new Student(2, "Jane Smith", "jane@example.com"));
        students.add(new Student(3, "Bob Johnson", "bob@example.com"));
    }
    
    public List<Student> getAllStudents() {
        return students;
    }
    
    public Student getStudentById(int id) {
        return students.stream()
            .filter(s -> s.getId() == id)
            .findFirst()
            .orElse(null);
    }
    
    public Student addStudent(Student student) {
        int newId = students.size() + 1;
        student.setId(newId);
        students.add(student);
        return student;
    }
    
    public void printAllStudents() {
        System.out.println("\\n=== All Students ===");
        students.forEach(System.out::println);
    }
}

// Controller Layer
@RestController
@RequestMapping("/api/students")
class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
    
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        Student student = studentService.getStudentById(id);
        if (student == null) {
            throw new RuntimeException("Student not found with ID: " + id);
        }
        return student;
    }
    
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }
    
    @GetMapping("/hello")
    public String hello() {
        return "Welcome to Student Management API!";
    }
}

// Note: In a real application, you would:
// 1. Create separate files for each class
// 2. Use proper package structure
// 3. Add proper error handling
// 4. Connect to a real database
// 5. Add validation
// 
// This is a simplified example to understand the concepts.

// To run this:
// 1. Create a Spring Boot project with spring-boot-starter-web dependency
// 2. Copy these classes to appropriate packages
// 3. Run the main method
// 4. Test with:
//    - GET http://localhost:8080/api/students/hello
//    - GET http://localhost:8080/api/students
//    - GET http://localhost:8080/api/students/1
`,
  practiceQuestions: [
    {
      question: 'Create a Spring Boot application with a Product API that has endpoints to get all products, get product by ID, and add a new product',
      hint: 'Create Product model, ProductService, and ProductController. Use @RestController, @GetMapping, @PostMapping annotations',
      starterCode: `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class ProductApp {
    public static void main(String[] args) {
        SpringApplication.run(ProductApp.class, args);
    }
}

// TODO: Create Product model with id, name, price fields

// TODO: Create ProductService with methods:
// - getAllProducts()
// - getProductById(int id)
// - addProduct(Product product)

// TODO: Create ProductController with:
// - GET /api/products - get all products
// - GET /api/products/{id} - get product by ID
// - POST /api/products - add new product
`
    }
  ]
};

export default springBootIntroduction;




