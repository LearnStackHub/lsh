const springBootIntroduction = {
  id: 'spring-boot-introduction',
  title: 'Spring Boot Introduction - Enterprise Java Application Framework',
  description: 'Complete guide to Spring Boot framework - auto-configuration, starter dependencies, embedded servers, REST APIs, and building production-ready Java applications',
  content: `
# Spring Boot Introduction - Enterprise Java Application Framework

Spring Boot is an open-source Java framework built on top of the [Spring Framework](/tutorial/spring-introduction) that simplifies the development of production-ready, enterprise-grade Java applications. It eliminates the need for extensive XML configuration and boilerplate code, allowing developers to focus on business logic rather than infrastructure setup.

Spring Boot was created by Pivotal Software (now part of VMware) to address the complexity and configuration overhead associated with traditional Spring Framework applications. It provides opinionated defaults and auto-configuration capabilities that significantly reduce development time and configuration complexity.

---

## What is Spring Boot?

Spring Boot is a convention-over-configuration framework that provides:

- **Auto-Configuration**: Automatically configures Spring and third-party libraries based on classpath dependencies
- **Starter Dependencies**: Pre-configured dependency sets for common use cases
- **Embedded Servers**: Built-in Tomcat, Jetty, or Undertow servers for standalone applications
- **Production-Ready Features**: Built-in metrics, health checks, and externalized configuration
- **No Code Generation**: No XML configuration required; uses Java-based configuration

Spring Boot extends the [Spring Framework](/tutorial/spring-introduction) by providing a streamlined development experience. While Spring Framework offers dependency injection and aspect-oriented programming through [Spring IOC](/tutorial/spring-ioc) and [Spring DI](/tutorial/spring-di), Spring Boot adds convenience layers that eliminate traditional configuration requirements.

---

## Why Spring Boot Was Created

Traditional Spring Framework applications required extensive configuration through XML files, deployment descriptors, and manual bean definitions. This configuration overhead slowed development and increased the learning curve for new developers. Spring Boot was created to address these challenges by providing sensible defaults and automatic configuration.

### Traditional Spring Framework Approach

Before Spring Boot, developers had to manually configure every aspect of a Spring application:

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

This traditional approach required:
- XML configuration files for bean definitions
- Manual servlet configuration in web.xml
- Explicit dependency management
- Server deployment configuration
- Extensive boilerplate code

### Spring Boot Approach

Spring Boot eliminates this complexity through convention-over-configuration:

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

This Spring Boot approach provides:
- Zero XML configuration
- Automatic component scanning
- Embedded server startup
- Default configuration based on classpath
- Production-ready defaults

The same functionality is achieved with minimal code, demonstrating Spring Boot's power in simplifying enterprise Java development.

---

## Core Features of Spring Boot

Spring Boot provides several key features that differentiate it from traditional Spring Framework development:

### 1. Auto-Configuration

Auto-configuration is Spring Boot's mechanism for automatically configuring Spring applications based on detected dependencies. When Spring Boot detects specific libraries on the classpath, it automatically configures beans and properties needed for those libraries.

**How Auto-Configuration Works:**

When you add a database dependency (like MySQL connector), Spring Boot's auto-configuration:
- Detects the database driver on the classpath
- Automatically creates a DataSource bean
- Configures connection pooling
- Sets up transaction management
- Provides default connection properties

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

### 2. Starter Dependencies

Starter dependencies are curated sets of dependencies that provide everything needed for specific functionality. Instead of manually adding multiple dependencies and managing version compatibility, developers add a single starter dependency.

**Common Spring Boot Starters:**

- **spring-boot-starter-web**: Includes Spring MVC, embedded Tomcat, Jackson for JSON, and validation libraries
- **spring-boot-starter-data-jpa**: Includes JPA, Hibernate, and database connectivity for [MySQL](/tutorial/mysql-introduction) and other databases
- **spring-boot-starter-security**: Includes Spring Security for authentication and authorization
- **spring-boot-starter-test**: Includes JUnit, Mockito, and testing utilities

**Example: Web Application Starter**

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`

This single dependency automatically includes:
- Spring Web MVC framework
- Embedded Tomcat server
- Jackson library for JSON processing
- Validation API
- Spring Boot auto-configuration

Starter dependencies ensure version compatibility and reduce dependency conflicts, significantly simplifying project setup.

### 3. Embedded Servers

Spring Boot includes embedded application servers (Tomcat by default, with options for Jetty or Undertow) within the application JAR. This eliminates the need for:

- Separate server installation and configuration
- WAR file creation and deployment
- Server-specific configuration files
- Manual port and context path configuration

**Embedded Server Benefits:**

\`\`\`java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
        // Embedded Tomcat server starts automatically on port 8080
    }
}
\`\`\`

When you run this application, Spring Boot:
1. Starts an embedded Tomcat server
2. Configures it with sensible defaults
3. Deploys your application automatically
4. Makes it accessible at http://localhost:8080

This approach is ideal for microservices, cloud deployments, and containerized applications where standalone executables are preferred over traditional server deployments.

---

## Building Your First Spring Boot Application

This section demonstrates how to create a complete Spring Boot REST API application. We'll build a student management API that handles HTTP requests and returns JSON responses, showcasing Spring Boot's core features in action.

### Application Overview

We'll create a REST API with the following endpoints:
- \`GET /api/students\` - Retrieve all students
- \`GET /api/students/{id}\` - Retrieve a specific student by ID
- \`POST /api/students\` - Create a new student

This example demonstrates Spring Boot's auto-configuration, dependency injection, and REST API capabilities.

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

**Understanding the Controller:**

- **@RestController**: Combines \`@Controller\` and \`@ResponseBody\`, indicating this class handles HTTP requests and returns data (not views)
- **@GetMapping("/students")**: Maps HTTP GET requests to the \`/students\` URL path to this method
- **Return Type**: Methods return data that Spring Boot automatically converts to JSON format using Jackson

This demonstrates Spring Boot's convention-over-configuration approach - minimal code achieves maximum functionality.

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
        students.add(new Student(1, "Dattu p", " Dattu@example.com"));
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

**Advanced Controller Features:**

- **@Autowired**: Spring Boot's dependency injection automatically provides a StudentService instance. This demonstrates [Spring's Dependency Injection](/tutorial/spring-di) in action
- **@RequestMapping("/api/students")**: Sets a base path for all methods in this controller, following REST API best practices
- **@PathVariable**: Extracts path variables from the URL (e.g., \`/api/students/1\` extracts ID as 1)
- **@RequestBody**: Automatically deserializes JSON request body into Java objects using Jackson
- **@PostMapping**: Handles HTTP POST requests for creating new resources

These annotations demonstrate Spring Boot's powerful request mapping and data binding capabilities.

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

Understanding Spring Boot's internal mechanisms helps developers troubleshoot issues and customize behavior when needed. The framework follows a well-defined startup and execution process.

### Application Startup Process

When you execute \`SpringApplication.run(MyApplication.class, args)\`, Spring Boot performs the following steps:

**Step 1: Application Context Creation**
- Creates a Spring ApplicationContext (IoC container) that manages all beans
- Loads configuration from application.properties, YAML files, and environment variables
- Initializes the Spring environment

**Step 2: Component Scanning**
Spring Boot scans the package containing \`@SpringBootApplication\` and sub-packages to discover:
- \`@RestController\` classes → Creates controller beans
- \`@Service\` classes → Creates service beans  
- \`@Repository\` classes → Creates data access beans
- \`@Component\` classes → Creates general component beans

This scanning is enabled by the \`@ComponentScan\` annotation included in \`@SpringBootApplication\`.

**Step 3: Auto-Configuration**
Spring Boot's auto-configuration mechanism:
- Analyzes the classpath for available libraries
- Applies conditional configurations based on detected dependencies
- Creates default beans for common scenarios (DataSource, EntityManager, etc.)
- Configures properties with sensible defaults

**Step 4: Dependency Injection**
Using [Spring's Dependency Injection](/tutorial/spring-di) mechanism:
- Spring Boot creates bean instances for discovered components
- Resolves dependencies between beans
- Injects dependencies using \`@Autowired\` or constructor injection
- Manages bean lifecycle and scopes

**Step 5: Embedded Server Startup**
- Starts the embedded Tomcat (or configured server)
- Registers servlets and filters
- Configures port, context path, and server settings
- Makes the application accessible via HTTP

### Request Handling Flow

When an HTTP request arrives at a Spring Boot application:

1. **DispatcherServlet Reception**: The embedded server forwards requests to Spring's DispatcherServlet
2. **Handler Mapping**: DispatcherServlet uses handler mappers to find the appropriate controller method
3. **Method Execution**: The mapped controller method executes with resolved parameters
4. **Response Processing**: Return values are processed through message converters (JSON, XML, etc.)
5. **HTTP Response**: The converted response is sent back to the client

This entire process is handled automatically by Spring Boot's web infrastructure, allowing developers to focus on business logic implementation.

### Configuration Management

Spring Boot uses a hierarchical configuration system:
- **application.properties** or **application.yml**: Default configuration
- **Profile-specific files**: application-dev.properties, application-prod.properties
- **Environment variables**: Override configuration at runtime
- **Command-line arguments**: Highest priority configuration

Configuration properties are automatically bound to \`@ConfigurationProperties\` classes, eliminating manual property reading and parsing.

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

Spring Boot reads this file automatically. No code needed. For a complete guide on configuration, including YAML files and advanced settings, see our [Spring Boot Configuration](/tutorial/spring-boot-configuration) tutorial.

---

## Frequently Asked Questions (FAQs)

### What is Spring Boot and why should I learn it?

Spring Boot is a framework that simplifies Java enterprise application development by providing auto-configuration, starter dependencies, and embedded servers. You should learn Spring Boot because it's the industry standard for building production-ready Java applications, REST APIs, and microservices. Major companies use Spring Boot for backend development, making it essential for Java developers seeking enterprise opportunities.

### Do I need to know Spring Framework before learning Spring Boot?

While not strictly required, understanding [Spring Framework](/tutorial/spring-introduction) fundamentals significantly helps. Spring Boot builds on Spring Framework concepts like [Inversion of Control (IoC)](/tutorial/spring-ioc) and [Dependency Injection (DI)](/tutorial/spring-di). Spring Boot hides much of the configuration complexity, but understanding the underlying Spring concepts helps when you need to customize behavior or troubleshoot issues. We recommend learning [Spring Framework basics](/tutorial/spring-introduction) before diving deep into Spring Boot.

### What's the difference between Spring Framework and Spring Boot?

**Spring Framework** is a comprehensive framework providing dependency injection, aspect-oriented programming, and various modules for enterprise development. It requires extensive XML or Java-based configuration.

**Spring Boot** is an opinionated extension of Spring Framework that:
- Provides auto-configuration to reduce setup time
- Includes starter dependencies for common use cases
- Embeds servers (Tomcat, Jetty) for standalone applications
- Offers production-ready features out of the box

Think of Spring Framework as a toolkit and Spring Boot as a pre-configured, ready-to-use solution built on that toolkit. Learn more about the [Spring Framework](/tutorial/spring-introduction) to understand the foundation.

### Can I use Spring Boot without Maven or Gradle?

Technically possible but not recommended. Maven and Gradle handle dependency management, which is essential for Spring Boot applications. Starter dependencies, version management, and build processes all rely on build tools. Without Maven or Gradle, you'd need to manually manage JAR files and dependencies, losing Spring Boot's primary benefits. Learn [Maven basics](/tutorial/maven-introduction) to effectively use Spring Boot.

### Do I need to install Tomcat or other application servers?

No. Spring Boot includes embedded servers (Tomcat by default, with options for Jetty or Undertow). When you run a Spring Boot application, it starts its own web server automatically. This eliminates the need for separate server installation and configuration, making development and deployment significantly simpler. For production, you can still deploy Spring Boot applications as WAR files to traditional servers if needed.

### How do I deploy a Spring Boot application?

Spring Boot applications can be deployed in multiple ways:

1. **Standalone JAR**: Package as executable JAR and run with \`java -jar application.jar\`. This is the most common approach for microservices and cloud deployments.

2. **WAR File**: Deploy to traditional application servers like Tomcat or WebSphere by packaging as WAR and configuring for external server deployment.

3. **Docker Containers**: Containerize Spring Boot applications for consistent deployment across environments.

4. **Cloud Platforms**: Deploy directly to cloud platforms like AWS, Azure, or Google Cloud, which provide managed services for Spring Boot applications.

The embedded server approach (JAR deployment) is preferred for modern microservices architectures.

### What databases can I use with Spring Boot?

Spring Boot supports all major relational and NoSQL databases through auto-configuration:

- **Relational Databases**: MySQL (learn [MySQL Introduction](/tutorial/mysql-introduction)), PostgreSQL, Oracle, SQL Server, H2 (for testing)
- **NoSQL Databases**: MongoDB, Redis, Cassandra, Elasticsearch
- **Database Access**: Use [JDBC](/tutorial/jdbc-introduction) for direct database access or [Spring Boot JPA](/tutorial/spring-boot-jpa) for object-relational mapping

Spring Boot automatically configures data sources when it detects database drivers on the classpath.

### Is Spring Boot suitable for microservices architecture?

Yes. Spring Boot is one of the most popular frameworks for building microservices. It provides:
- Standalone executable JARs perfect for containerization
- Built-in health checks and metrics
- Easy integration with service discovery and configuration servers
- Support for distributed tracing and monitoring

Many organizations use Spring Boot with Spring Cloud for complete microservices solutions.

### What are Spring Boot starter dependencies?

Starter dependencies are pre-configured sets of dependencies that provide everything needed for specific functionality. For example:
- \`spring-boot-starter-web\`: Includes Spring MVC, embedded Tomcat, and JSON support
- \`spring-boot-starter-data-jpa\`: Includes JPA, Hibernate, and database connectivity
- \`spring-boot-starter-security\`: Includes Spring Security for authentication and authorization

Instead of manually adding multiple dependencies, you add one starter that includes all necessary libraries with compatible versions.

### How does Spring Boot auto-configuration work?

Auto-configuration uses conditional bean creation based on:
1. **Classpath Detection**: Checks which libraries are present
2. **Conditional Annotations**: Uses \`@ConditionalOnClass\`, \`@ConditionalOnProperty\` to determine what to configure
3. **Default Configuration**: Applies sensible defaults when conditions are met
4. **Override Capability**: Developers can override auto-configuration with explicit configuration

For example, if Spring Boot detects MySQL driver on the classpath, it automatically configures a DataSource bean with default connection properties.

### What should I learn after Spring Boot basics?

After mastering Spring Boot fundamentals:
1. **Database Integration**: Learn [Spring Boot JPA](/tutorial/spring-boot-jpa) for database operations
2. **REST API Development**: Build RESTful services with Spring Boot
3. **Security**: Implement authentication and authorization with Spring Security
4. **Testing**: Learn unit and integration testing for Spring Boot applications
5. **Advanced Topics**: Microservices with Spring Cloud, reactive programming with WebFlux, and production deployment strategies

Start with [Spring Boot Project Setup](/tutorial/spring-boot-project-setup) to begin building applications.

---

## Key Takeaways

Before proceeding to hands-on development, ensure you understand these fundamental Spring Boot concepts:

- **Auto-Configuration**: Spring Boot automatically configures applications based on classpath dependencies
- **Starter Dependencies**: Pre-configured dependency sets eliminate manual dependency management
- **Embedded Servers**: Built-in servers enable standalone application deployment without external server setup
- **Convention over Configuration**: Sensible defaults reduce configuration requirements
- **Production-Ready**: Built-in features for monitoring, health checks, and externalized configuration
- **Framework Extension**: Spring Boot extends [Spring Framework](/tutorial/spring-introduction) with convenience layers

## What's Next?

Now that you understand Spring Boot's architecture, features, and benefits, you're ready to begin hands-on development:

### Immediate Next Steps

1. **[Spring Boot Project Setup](/tutorial/spring-boot-project-setup)**: Learn to create Spring Boot projects using Spring Initializr, Maven, or IDE wizards
2. **[Spring Boot Configuration](/tutorial/spring-boot-configuration)**: Master application.properties, YAML configuration, and profile management
3. **[Spring Boot JPA](/tutorial/spring-boot-jpa)**: Integrate databases using Spring Data JPA for object-relational mapping

### Building REST APIs

4. **REST API Development**: Create RESTful web services with Spring Boot controllers
5. **Request Handling**: Learn to handle GET, POST, PUT, DELETE requests
6. **Response Management**: Return JSON responses and handle HTTP status codes

### Advanced Topics

7. **Database Integration**: Connect to [MySQL](/tutorial/mysql-introduction) or other databases using [JDBC](/tutorial/jdbc-introduction) or JPA
8. **Security Implementation**: Add authentication and authorization to protect your APIs
9. **Testing**: Write unit and integration tests for Spring Boot applications
10. **Production Deployment**: Learn deployment strategies for cloud platforms and containers

### Prerequisites Review

Before diving into Spring Boot development, ensure you have:
- Strong [Java fundamentals](/tutorial/java-introduction) including [OOPs concepts](/tutorial/oops-introduction)
- Understanding of [Spring Framework](/tutorial/spring-introduction) basics ([Spring IOC](/tutorial/spring-ioc), [Spring DI](/tutorial/spring-di))
- Knowledge of [Maven](/tutorial/maven-introduction) or Gradle for dependency management
- Familiarity with [REST API concepts](/tutorial/http-request-response) and HTTP methods

### Learning Path Recommendation

1. **Foundation**: Master [Java basics](/tutorial/java-introduction) and [Spring Framework](/tutorial/spring-introduction)
2. **Database Skills**: Learn [MySQL](/tutorial/mysql-introduction) and [JDBC](/tutorial/jdbc-introduction) for data persistence
3. **Spring Boot**: Start with [Spring Boot Project Setup](/tutorial/spring-boot-project-setup) and build progressively complex applications
4. **Practice**: Build real projects like a student management system, e-commerce API, or blog application

Spring Boot simplifies enterprise Java development, but understanding the underlying concepts from [Spring Framework](/tutorial/spring-introduction) and [Java fundamentals](/tutorial/java-introduction) ensures you can effectively use and customize Spring Boot applications. Begin with [Spring Boot Project Setup](/tutorial/spring-boot-project-setup) to create your first Spring Boot application.
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
        students.add(new Student(1, "Dattu p", " Dattu@example.com"));
        students.add(new Student(2, "Jane Smith", "jane@example.com"));
        students.add(new Student(3, "Bob  Dattuson", "bob@example.com"));
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

