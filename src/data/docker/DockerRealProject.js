const dockerRealProject = {
  id: 'docker-real-project-springboot-mysql-compose',
  title: 'Real Project: Spring Boot + MySQL + Docker Compose (Full)',
  description:
    'Build a complete Spring Boot + MySQL project, containerize it, and run the full stack with Docker Compose.',
  content: `
# Real Project: Spring Boot + MySQL + Docker Compose (FULL)

This is a complete, interview-ready hands-on project.  
You will build a small Spring Boot REST API, connect it to MySQL, dockerize the application, and run the full setup using Docker Compose.

## End-to-End Project Diagram

\`\`\`diagram layers
{
  "layers": [
    { "icon": "🌍", "name": "Client Layer", "tech": "Browser / Postman" },
    { "icon": "🚀", "name": "Application Layer", "tech": "Spring Boot Container" },
    { "icon": "🗄️", "name": "Data Layer", "tech": "MySQL Container" },
    { "icon": "💾", "name": "Persistence Layer", "tech": "Named Docker Volume" }
  ]
}
\`\`\`

## What you'll build

- Spring Boot REST API
- MySQL database
- Dockerized app
- Full stack bootstrapped with Docker Compose

## Project Structure (Important)

\`\`\`
springboot-docker-demo/
|
|-- src/main/java/com/example/demo/
|   |-- DemoApplication.java
|   |-- controller/UserController.java
|   |-- entity/User.java
|   |-- repository/UserRepository.java
|   |-- service/UserService.java
|
|-- src/main/resources/
|   |-- application.properties
|
|-- pom.xml
|-- Dockerfile
|-- docker-compose.yml
\`\`\`

## 1) pom.xml (Full)

\`\`\`xml
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>docker-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>

    <dependencies>
        <!-- Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>

        <!-- Lombok (optional) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
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

## 2) application.properties

\`\`\`properties
server.port=8080

spring.datasource.url=jdbc:mysql://db:3306/appdb
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
\`\`\`

Important:
- \`db\` is the service name from \`docker-compose.yml\`
- Do not use \`localhost\` when your app runs inside Docker

## 3) Main Class

\`\`\`java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
\`\`\`

## 4) Entity

\`\`\`java
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String department;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
\`\`\`

## 5) Repository

\`\`\`java
package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
\`\`\`

## 6) Service

\`\`\`java
package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User save(User user) {
        return repo.save(user);
    }

    public List<User> getAll() {
        return repo.findAll();
    }
}
\`\`\`

## 7) Controller

\`\`\`java
package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }
}
\`\`\`

## 8) Dockerfile

\`\`\`dockerfile
FROM openjdk:17

WORKDIR /app

COPY target/docker-demo-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
\`\`\`

## 9) docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    container_name: springboot-app
    ports:
      - "8080:8080"
    depends_on:
      - db

  db:
    image: mysql:8
    container_name: mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
\`\`\`

## 10) Run Steps (Very Important)

Step 1: Build JAR

\`\`\`bash
mvn clean package
\`\`\`

Step 2: Run Docker Compose

\`\`\`bash
docker compose up --build
\`\`\`

## 11) Test API

POST:

\`\`\`
http://localhost:8080/api/users
\`\`\`

Body:

\`\`\`json
{
  "name": "Dattu",
  "department": "Java"
}
\`\`\`

GET:

\`\`\`
http://localhost:8080/api/users
\`\`\`

## Real errors you will face (and fixes)

### Error 1: DB connection failed
\`Communications link failure\`

Reason:
- MySQL container is not fully ready yet

Fix:
- Restart app container
- Add retry strategy or healthcheck

### Error 2: Access denied
\`Access denied for user 'root'\`

Fix:
- Verify username/password in both:
  - \`docker-compose.yml\`
  - \`application.properties\`

### Error 3: Unknown host 'db'

Reason:
- App is running outside Docker, but URL still uses \`db\`

Fix:
- If running locally (outside container), use \`localhost\`
- If running inside Docker Compose, use \`db\`

### Error 4: Port already in use
\`BindException: Address already in use\`

Fix:
- Stop previous process/container using port 8080
- Then rerun compose

### Error 5: Table not created

Fix:
- Ensure:
\`\`\`properties
spring.jpa.hibernate.ddl-auto=update
\`\`\`

## Final takeaway

This project mirrors a real backend deployment flow:

\`\`\`
User -> API -> Spring Boot Container -> MySQL Container
\`\`\`

If you understand this setup clearly, you are ready for:
- Docker interview questions
- Spring Boot deployment basics
- Multi-container real-world projects
`
};

export default dockerRealProject;
