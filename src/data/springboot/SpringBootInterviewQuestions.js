const springBootInterviewQuestions = {
  id: 'spring-boot-interview-questions',
  title: 'Top 30 Spring Boot Interview Questions',
  description: 'Most frequently asked Spring Boot interview questions for 1-3 years experience developers with detailed answers and real-world examples',
  content: `
# Top 30 Spring Boot Interview Questions

These are the most commonly asked Spring Boot interview questions. Master these to ace your interviews!

---

## 1. What is Spring Boot? Why do we use it?

**Answer:**
Spring Boot is a framework built on top of Spring Framework that simplifies Spring application development. It provides:

- **Auto-configuration:** Automatically configures beans based on dependencies
- **Starter dependencies:** Pre-configured dependency sets
- **Embedded server:** No need to deploy WAR files
- **Production-ready features:** Actuator, metrics, health checks

**Real-Time Scenario:**
Without Spring Boot, you need to configure:
- DispatcherServlet
- ViewResolver
- DataSource
- TransactionManager
- And 50+ other configurations manually

With Spring Boot, just add \`spring-boot-starter-web\` and everything is auto-configured!

---

## 2. What are Spring Boot Starters?

**Answer:**
Starters are dependency descriptors that include all necessary dependencies for a specific feature.

**Examples:**
- \`spring-boot-starter-web\` - Web applications (Tomcat, Spring MVC)
- \`spring-boot-starter-data-jpa\` - JPA, Hibernate
- \`spring-boot-starter-security\` - Spring Security
- \`spring-boot-starter-mail\` - Email support

**Real-Time Example:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`

This single dependency includes:
- Spring MVC
- Embedded Tomcat
- Jackson (JSON)
- Validation
- And more...

---

## 3. What is Auto-Configuration in Spring Boot?

**Answer:**
Auto-configuration automatically configures beans based on:
- Classpath dependencies
- Existing bean definitions
- Property settings

**How it works:**
1. Spring Boot scans classpath
2. Finds \`@ConditionalOnClass\` annotations
3. If class exists, creates bean automatically

**Real-Time Example:**
If you add \`spring-boot-starter-data-jpa\`:
- Spring Boot detects Hibernate on classpath
- Automatically configures DataSource
- Creates EntityManagerFactory
- Sets up TransactionManager

You don't write any configuration code!

---

## 4. What is @SpringBootApplication annotation?

**Answer:**
\`@SpringBootApplication\` is a combination of three annotations:

1. \`@Configuration\` - Marks class as configuration
2. \`@EnableAutoConfiguration\` - Enables auto-configuration
3. \`@ComponentScan\` - Scans for components

**Example:**
\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

---

## 5. What is the difference between @Component, @Service, @Repository, and @Controller?

**Answer:**

| Annotation | Purpose | Use Case |
|------------|---------|----------|
| @Component | Generic component | General purpose beans |
| @Service | Business logic | Service layer |
| @Repository | Data access | DAO/Repository layer |
| @Controller | Web requests | MVC controllers |
| @RestController | REST APIs | REST endpoints |

**Real-Time Example:**
\`\`\`java
@Service
public class UserService {
    // Business logic
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Data access
}

@RestController
public class UserController {
    // REST endpoints
}
\`\`\`

---

## 6. What is Spring Boot Actuator?

**Answer:**
Actuator provides production-ready features:
- Health checks
- Metrics
- Application info
- Environment details

**Configuration:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**Endpoints:**
- \`/actuator/health\` - Application health
- \`/actuator/metrics\` - Application metrics
- \`/actuator/info\` - Application information

---

## 7. How does Spring Boot handle exceptions globally?

**Answer:**
Use \`@ControllerAdvice\` or \`@RestControllerAdvice\`:

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
\`\`\`

---

## 8. What is the difference between @RequestParam and @PathVariable?

**Answer:**

**@RequestParam:** Query parameters
\`\`\`java
@GetMapping("/users")
public User getUser(@RequestParam Long id) {
    // URL: /users?id=123
}
\`\`\`

**@PathVariable:** Path variables
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // URL: /users/123
}
\`\`\`

---

## 9. What is Spring Boot DevTools?

**Answer:**
DevTools provides development-time features:
- Automatic restart on code changes
- Live reload
- Property defaults

**Configuration:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

---

## 10. How do you configure database connection in Spring Boot?

**Answer:**
Use \`application.properties\`:

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
\`\`\`

Or \`application.yml\`:

\`\`\`yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
\`\`\`

---

## 11. What is the difference between application.properties and application.yml?

**Answer:**

**application.properties:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
\`\`\`

**application.yml:**
\`\`\`yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
\`\`\`

YAML is more readable for nested configurations.

---

## 12. What are Spring Boot Profiles?

**Answer:**
Profiles allow different configurations for different environments:

**application-dev.properties:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
\`\`\`

**application-prod.properties:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
\`\`\`

**Activate profile:**
\`\`\`bash
java -jar app.jar --spring.profiles.active=prod
\`\`\`

---

## 13. How do you implement JWT authentication in Spring Boot?

**Answer:**

**Step 1: Add dependency**
\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
\`\`\`

**Step 2: Create JWT Service**
\`\`\`java
@Service
public class JwtService {
    private String secret = "mySecretKey";
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
    
    public String extractUsername(String token) {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
\`\`\`

**Step 3: Create JWT Filter**
\`\`\`java
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) {
        String token = extractToken(request);
        if (token != null && jwtService.validateToken(token)) {
            // Set authentication
        }
        filterChain.doFilter(request, response);
    }
}
\`\`\`

---

## 14. What is the difference between @Autowired and @Resource?

**Answer:**

**@Autowired:** Spring-specific, by type
\`\`\`java
@Autowired
private UserService userService; // Injects by type
\`\`\`

**@Resource:** JSR-250, by name
\`\`\`java
@Resource(name = "userService")
private UserService userService; // Injects by name
\`\`\`

---

## 15. How do you handle transactions in Spring Boot?

**Answer:**
Use \`@Transactional\` annotation:

\`\`\`java
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        User from = userRepository.findById(fromId).orElseThrow();
        User to = userRepository.findById(toId).orElseThrow();
        
        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));
        
        userRepository.save(from);
        userRepository.save(to);
        // If any operation fails, entire transaction rolls back
    }
}
\`\`\`

---

## 16. What is Spring Data JPA?

**Answer:**
Spring Data JPA simplifies database operations:
- Reduces boilerplate code
- Provides repository abstraction
- Automatic query generation

**Example:**
\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
    List<User> findByNameContaining(String name);
}
\`\`\`

No implementation needed! Spring generates it automatically.

---

## 17. What is the difference between CrudRepository and JpaRepository?

**Answer:**

**CrudRepository:**
- Basic CRUD operations
- \`save()\`, \`findById()\`, \`delete()\`, etc.

**JpaRepository:**
- Extends CrudRepository
- Adds pagination and sorting
- \`findAll(Pageable)\`, \`findAll(Sort)\`

**Real-Time Example:**
\`\`\`java
// CrudRepository
public interface UserRepository extends CrudRepository<User, Long> {
    // Basic operations only
}

// JpaRepository
public interface UserRepository extends JpaRepository<User, Long> {
    // Basic + Pagination + Sorting
    Page<User> findAll(Pageable pageable);
}
\`\`\`

---

## 18. How do you implement pagination in Spring Boot?

**Answer:**
Use \`Pageable\`:

\`\`\`java
@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/users")
    public Page<User> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }
}
\`\`\`

**Request:**
\`GET /users?page=0&size=10\`

---

## 19. What is @Query annotation in Spring Data JPA?

**Answer:**
\`@Query\` allows custom queries:

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmailAddress(String email);
    
    @Query(value = "SELECT * FROM users WHERE age > ?1", nativeQuery = true)
    List<User> findUsersOlderThan(int age);
}
\`\`\`

---

## 20. How do you handle file upload in Spring Boot?

**Answer:**
Use \`MultipartFile\`:

\`\`\`java
@RestController
public class FileController {
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file) {
        try {
            file.transferTo(new File("/uploads/" + file.getOriginalFilename()));
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }
}
\`\`\`

**Configuration:**
\`\`\`properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
\`\`\`

---

## 21. What is the difference between @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping?

**Answer:**
These are shortcuts for \`@RequestMapping\`:

| Annotation | HTTP Method | Use Case |
|------------|-------------|----------|
| @GetMapping | GET | Retrieve data |
| @PostMapping | POST | Create data |
| @PutMapping | PUT | Update data |
| @DeleteMapping | DELETE | Delete data |

**Example:**
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // GET request
}

@PostMapping("/users")
public User createUser(@RequestBody User user) {
    // POST request
}

@PutMapping("/users/{id}")
public User updateUser(@PathVariable Long id, @RequestBody User user) {
    // PUT request
}

@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) {
    // DELETE request
}
\`\`\`

---

## 22. How do you implement caching in Spring Boot?

**Answer:**
Use \`@Cacheable\`:

**Step 1: Enable caching**
\`\`\`java
@SpringBootApplication
@EnableCaching
public class Application {
    // ...
}
\`\`\`

**Step 2: Use @Cacheable**
\`\`\`java
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public User getUser(Long id) {
        // This method result will be cached
        return userRepository.findById(id).orElseThrow();
    }
    
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        // Cache will be cleared when user is deleted
        userRepository.deleteById(id);
    }
}
\`\`\`

---

## 23. What is Spring Boot Actuator Health Check?

**Answer:**
Actuator provides health endpoints:

\`\`\`java
@Component
public class CustomHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        // Check database connection
        if (isDatabaseUp()) {
            return Health.up().build();
        }
        return Health.down().withDetail("Error", "Database is down").build();
    }
}
\`\`\`

**Endpoint:**
\`GET /actuator/health\`

---

## 24. How do you implement validation in Spring Boot?

**Answer:**
Use Bean Validation:

**Step 1: Add dependency**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`

**Step 2: Add validation annotations**
\`\`\`java
public class User {
    @NotNull
    @Size(min = 3, max = 50)
    private String name;
    
    @Email
    @NotBlank
    private String email;
}
\`\`\`

**Step 3: Validate in controller**
\`\`\`java
@PostMapping("/users")
public User createUser(@Valid @RequestBody User user) {
    // @Valid triggers validation
    return userService.save(user);
}
\`\`\`

---

## 25. What is the difference between @ComponentScan and @EnableAutoConfiguration?

**Answer:**

**@ComponentScan:**
- Scans packages for \`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\`
- Registers beans manually defined

**@EnableAutoConfiguration:**
- Auto-configures beans based on classpath
- Configures based on dependencies present

---

## 26. How do you handle CORS in Spring Boot?

**Answer:**
Use \`@CrossOrigin\` or global configuration:

**Method 1: @CrossOrigin**
\`\`\`java
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    // ...
}
\`\`\`

**Method 2: Global Configuration**
\`\`\`java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
\`\`\`

---

## 27. What is Spring Boot Starter Parent?

**Answer:**
\`spring-boot-starter-parent\` provides:
- Default Java version
- UTF-8 encoding
- Dependency management
- Plugin configuration

**Example:**
\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.0</version>
</parent>
\`\`\`

---

## 28. How do you implement scheduled tasks in Spring Boot?

**Answer:**
Use \`@Scheduled\`:

**Step 1: Enable scheduling**
\`\`\`java
@SpringBootApplication
@EnableScheduling
public class Application {
    // ...
}
\`\`\`

**Step 2: Create scheduled method**
\`\`\`java
@Component
public class ScheduledTasks {
    
    @Scheduled(fixedRate = 5000) // Every 5 seconds
    public void reportCurrentTime() {
        System.out.println("Current time: " + new Date());
    }
    
    @Scheduled(cron = "0 0 12 * * ?") // Every day at noon
    public void dailyReport() {
        // Generate daily report
    }
}
\`\`\`

---

## 29. What is the difference between @Controller and @RestController?

**Answer:**

**@Controller:**
- Returns view name (for MVC)
- Used with \`@ResponseBody\` for JSON

**@RestController:**
- Combination of \`@Controller\` + \`@ResponseBody\`
- Returns JSON/XML directly
- Used for REST APIs

**Example:**
\`\`\`java
@Controller
public class UserController {
    @GetMapping("/users")
    public String getUsers(Model model) {
        // Returns view name
        return "users";
    }
}

@RestController
public class UserRestController {
    @GetMapping("/api/users")
    public List<User> getUsers() {
        // Returns JSON directly
        return userService.getAllUsers();
    }
}
\`\`\`

---

## 30. How do you deploy Spring Boot application?

**Answer:**

**Method 1: JAR file**
\`\`\`bash
mvn clean package
java -jar target/myapp.jar
\`\`\`

**Method 2: WAR file**
\`\`\`java
@SpringBootApplication
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
}
\`\`\`

**Method 3: Docker**
\`\`\`dockerfile
FROM openjdk:17-jdk-slim
COPY target/myapp.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

---

## Final Tips for Interview

1. **Understand the basics:** Auto-configuration, starters, profiles
2. **Know common annotations:** @RestController, @Service, @Repository
3. **Practice coding:** JWT, transactions, pagination
4. **Real-world scenarios:** How you used Spring Boot in projects
5. **Best practices:** Exception handling, validation, security

Master these questions and you'll ace your Spring Boot interview! 🚀
`
};

export default springBootInterviewQuestions;

