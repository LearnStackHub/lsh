const springBootProjectSetup = {
  id: 'spring-boot-project-setup',
  title: 'Spring Boot Project Setup - Step by Step Guide',
  description: 'Learn how to create your first Spring Boot project from scratch using Spring Initializr, Maven, and IDE setup',
  content: `
# Spring Boot Project Setup - Step by Step Guide

Spring Boot project setup involves configuring build tools, dependencies, and project structure. Multiple approaches exist, each suited to different development environments and team preferences. This guide covers the most common and reliable methods used in enterprise development.

---

## Method 1: Using Spring Initializr (Recommended for Beginners)

Spring Initializr is a web-based project generator that creates Spring Boot project scaffolding with pre-configured dependencies and project structure. It eliminates manual configuration and ensures consistent project setup across teams.

### Step 1: Go to Spring Initializr

Open your browser and go to: \`https://start.spring.io\`

The Spring Initializr interface presents configuration options for project metadata, build tool selection, and dependency management.

### Step 2: Configure Project Settings

**Project:**
- Choose **Maven** (most common in enterprise) or **Gradle**
- Maven is widely adopted and has extensive documentation

**Language:**
- Choose **Java** (unless you know Kotlin or Groovy)

**Spring Boot Version:**
- Use the latest stable version (usually pre-selected)
- Don't change this unless you have a specific reason

**Project Metadata:**
- **Group:** Your company domain in reverse (e.g., \`com.example\`)
- **Artifact:** Your project name (e.g., \`my-spring-boot-app\`)
- **Name:** Same as artifact (auto-filled)
- **Description:** What your project does
- **Package name:** Usually auto-filled based on Group
- **Packaging:** **JAR** (for microservices) or **WAR** (for traditional deployment)
- **Java Version:** Choose **17** or **21** (LTS versions)

### Step 3: Add Dependencies

Click "Add Dependencies" and search for what you need:

**For Web Applications:**
- Search: "Spring Web" → Add it
- This gives you REST API capabilities

**For Database:**
- Search: "Spring Data JPA" → Add it
- Search: "MySQL Driver" or "PostgreSQL Driver" → Add it

**For Security:**
- Search: "Spring Security" → Add it

**For Testing:**
- "Spring Boot DevTools" (optional, for hot reload)
- "Spring Boot Test" (usually included by default)

### Step 4: Generate and Download

Click the big green "Generate" button. A ZIP file will download.

### Step 5: Extract and Open in IDE

1. Extract the ZIP file
2. Open it in your IDE (IntelliJ IDEA, Eclipse, or VS Code)

---

## Method 2: Using IntelliJ IDEA (Easiest for IDE Users)

If you're using IntelliJ IDEA, you can create Spring Boot projects directly from the IDE.

### Step 1: Create New Project

1. Open IntelliJ IDEA
2. Click "New Project"
3. Select "Spring Initializr"
4. Click "Next"

### Step 2: Configure Project

- **Name:** my-spring-boot-app
- **Location:** Choose where to save
- **Type:** Maven
- **Language:** Java
- **Group:** com.example
- **Artifact:** my-spring-boot-app
- **Package name:** com.example.my-spring-boot-app
- **Packaging:** JAR
- **Java:** 17 or 21

Click "Next"

### Step 3: Select Dependencies

Check the boxes for:
- Spring Web
- Spring Data JPA (if using database)
- MySQL Driver (if using MySQL)
- Spring Boot DevTools (optional)

Click "Next" → "Finish"

IntelliJ will download dependencies and set up the project.

---

## Method 3: Manual Setup (For Learning)

If you want to understand what's happening under the hood, set it up manually.

### Step 1: Create Project Structure

\`\`\`
my-spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── myapp/
│   │   │               └── MyApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
└── pom.xml
\`\`\`

### Step 2: Create pom.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Inherit from Spring Boot parent -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>my-spring-boot-app</artifactId>
    <version>1.0.0</version>
    <name>My Spring Boot App</name>
    <description>My first Spring Boot application</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### Step 3: Create Main Application Class

\`\`\`java
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
\`\`\`

### Step 4: Create application.properties

\`\`\`properties
# Server Configuration
server.port=8080

# Application Name
spring.application.name=my-spring-boot-app
\`\`\`

---

## Understanding the Project Structure

Once your project is set up, here's what each folder means:

\`\`\`
src/
├── main/
│   ├── java/              # Your Java source code
│   │   └── com/example/
│   │       └── myapp/
│   │           ├── MyApplication.java    # Main class
│   │           ├── controller/          # REST controllers
│   │           ├── service/             # Business logic
│   │           ├── repository/         # Data access
│   │           └── model/               # Entity classes
│   └── resources/
│       ├── application.properties       # Configuration
│       └── static/                      # Static files (CSS, JS)
└── test/
    └── java/                            # Test files
\`\`\`

---

## Running Your First Spring Boot Application

### Option 1: Using IDE

1. Right-click on \`MyApplication.java\`
2. Select "Run 'MyApplication'"
3. Wait for "Started MyApplication" message
4. Open browser: \`http://localhost:8080\`

### Option 2: Using Maven

\`\`\`bash
# Navigate to project directory
cd my-spring-boot-app

# Run the application
mvn spring-boot:run
\`\`\`

### Option 3: Using JAR

\`\`\`bash
# Build the JAR
mvn clean package

# Run the JAR
java -jar target/my-spring-boot-app-1.0.0.jar
\`\`\`

---

## Common Setup Issues and Solutions

### Issue 1: Maven Dependencies Not Downloading

**Solution:**
\`\`\`bash
# Clean and rebuild
mvn clean install

# Or in IDE: Right-click project → Maven → Reload Project
\`\`\`

### Issue 2: Port 8080 Already in Use

**Solution:**
Change port in \`application.properties\`:
\`\`\`properties
server.port=9090
\`\`\`

### Issue 3: Java Version Mismatch

**Solution:**
- Check your Java version: \`java -version\`
- Make sure pom.xml Java version matches
- Set JAVA_HOME environment variable

### Issue 4: IDE Not Recognizing Spring Boot

**Solution:**
- In IntelliJ: File → Invalidate Caches → Restart
- In Eclipse: Right-click project → Maven → Update Project

---

## What Happens When You Run Spring Boot?

When you run your application, Spring Boot:

1. **Scans for Components:** Looks for @Controller, @Service, @Repository
2. **Auto-Configures:** Sets up database, web server, etc. based on dependencies
3. **Starts Embedded Server:** Tomcat starts on port 8080 (or your configured port)
4. **Registers Endpoints:** Maps your @GetMapping, @PostMapping methods
5. **Ready to Accept Requests:** Your application is now running

---

## Next Steps

Now that you've set up your Spring Boot project:

1. **Learn Configuration**: Master [Spring Boot Configuration](/tutorial/spring-boot-configuration) to customize your application
2. **Build Your First API**: Create REST endpoints with [Spring Boot REST API](/tutorial/spring-boot-rest-api) tutorial
3. **Connect to Database**: Integrate databases using [Spring Boot JPA](/tutorial/spring-boot-jpa)
4. **Add Validation**: Learn input validation in [Spring Boot Validation](/tutorial/spring-boot-validation)
5. **Handle Errors**: Master error handling with [Spring Boot Exception Handling](/tutorial/spring-boot-exception-handling)

If you're new to Spring Boot, make sure you understand the basics from our [Spring Boot Introduction](/tutorial/spring-boot-introduction) first.

After setting up your project:

1. Create a simple REST controller
2. Test it with a browser or Postman
3. Add a database connection
4. Build a complete CRUD application

Remember: The hardest part is getting started. Once your project is set up, everything else becomes easier.
`,
  code: `// Complete Spring Boot Project Setup Example
// This shows the minimal setup needed

// 1. pom.xml structure
/*
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
*/

// 2. Main Application Class
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        System.out.println("Starting Spring Boot Application...");
        SpringApplication.run(MyApplication.class, args);
        System.out.println("Application started successfully!");
        System.out.println("Server running on: http://localhost:8080");
    }
}

// 3. Simple Controller to Test
package com.example.myapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    
    @GetMapping("/")
    public String home() {
        return "Welcome to Spring Boot!";
    }
    
    @GetMapping("/test")
    public String test() {
        return "Application is working!";
    }
}

// 4. application.properties
/*
# Server Configuration
server.port=8080

# Application Name
spring.application.name=my-spring-boot-app

# Logging
logging.level.com.example=INFO
*/

// To run:
// 1. Save all files in proper structure
// 2. Run: mvn spring-boot:run
// 3. Or run MyApplication.main() method
// 4. Visit: http://localhost:8080/test
`,
  practiceQuestions: [
    {
      question: 'Create a Spring Boot project using Spring Initializr with Spring Web dependency and create a simple controller that returns "Hello Spring Boot"',
      hint: 'Use Spring Initializr website, add Spring Web dependency, create a @RestController with @GetMapping("/hello")',
      starterCode: `// Create a new Spring Boot project and add this controller

package com.example.myapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    // TODO: Create a GET endpoint at /hello that returns "Hello Spring Boot"
}
`
    }
  ]
};

export default springBootProjectSetup;


