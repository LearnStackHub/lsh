const springBootInterviewQuestions = {
  id: 'spring-boot-interview-questions',
  title: 'Top 30 Spring Boot Interview Questions',
  description: 'Most frequently asked Spring Boot interview questions for 1-3 years experience developers with detailed answers, real-world scenarios, tricky questions, and debugging examples',
  content: `
# Top 30 Spring Boot Interview Questions - Complete Guide

I've compiled the most important Spring Boot interview questions that interviewers actually ask. These are organized by difficulty level, and I'll explain not just the answers, but also how interviewers think when asking these questions.

---

## How Interviewers Think

Before we start, let me tell you something important. Interviewers don't just want to know if you can answer questions. They want to know:

1. **Can you explain concepts clearly?** - Shows you really understand, not just memorized
2. **Can you relate to real projects?** - Shows practical experience
3. **Can you debug problems?** - Shows problem-solving skills
4. **Do you know the differences?** - Shows deep understanding
5. **Can you handle tricky scenarios?** - Shows advanced knowledge

Keep this in mind as you read through these questions.

---

## Basic Level Questions (Freshers to 1 Year)

These are the foundation. Master these first.

---

### Question 1: What is Spring Boot? Why do we use it?

**How Interviewer Thinks:** "Does this person understand the basic purpose of Spring Boot? Can they explain why it exists?"

**Answer:**
Spring Boot is a framework that makes Spring application development much easier. Think of it as Spring Framework with batteries included.

**What it provides:**
- Auto-configuration - Spring Boot automatically configures beans based on what dependencies you have
- Starter dependencies - Pre-packaged sets of dependencies for common features
- Embedded server - No need to deploy WAR files, runs as standalone JAR
- Production-ready features - Actuator for monitoring, metrics, health checks

**Real-Time Scenario:**
In a traditional Spring application, to create a web application, you need to configure:
- DispatcherServlet
- ViewResolver
- DataSource
- TransactionManager
- And 50+ other configurations manually

With Spring Boot, you just add \`spring-boot-starter-web\` dependency and everything is configured automatically. This saves hours of configuration time.

**Why companies use it:**
- Faster development - Less configuration, more coding
- Less boilerplate code - Focus on business logic
- Easy deployment - Single JAR file
- Production-ready - Built-in monitoring and health checks

---

### Question 2: What are Spring Boot Starters?

**How Interviewer Thinks:** "Does this person understand how Spring Boot simplifies dependency management?"

**Answer:**
Starters are pre-configured dependency sets. Instead of adding 10-15 individual dependencies, you add one starter and get everything you need.

**Common Starters:**

\`spring-boot-starter-web\` - For web applications
- Includes: Spring MVC, Embedded Tomcat, Jackson (JSON), Validation

\`spring-boot-starter-data-jpa\` - For database operations
- Includes: Hibernate, JPA, Spring Data JPA

\`spring-boot-starter-security\` - For security
- Includes: Spring Security, Authentication, Authorization

\`spring-boot-starter-mail\` - For email
- Includes: JavaMailSender, Email support

**Real-Time Example:**
Instead of adding these dependencies manually:
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-core</artifactId>
</dependency>
<!-- 10+ more dependencies -->
\`\`\`

You just add:
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`

**Why this matters:** Starters ensure all dependencies are compatible versions. No more version conflicts!

---

### Question 3: What is @SpringBootApplication annotation?

**How Interviewer Thinks:** "Can they explain what this annotation actually does under the hood?"

**Answer:**
\`@SpringBootApplication\` is actually three annotations combined:

1. \`@Configuration\` - Tells Spring this class has configuration
2. \`@EnableAutoConfiguration\` - Enables Spring Boot's auto-configuration
3. \`@ComponentScan\` - Scans for components in the package and sub-packages

**Example:**
\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

**What happens when you run this:**
1. Spring Boot starts
2. Scans for \`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\`
3. Auto-configures beans based on classpath
4. Starts embedded server
5. Application is ready!

**Real-Time Scenario:**
If you remove \`@ComponentScan\`, Spring won't find your controllers, services, or repositories. Your application will start but endpoints won't work because controllers aren't registered.

---

### Question 4: What is the difference between @Component, @Service, @Repository, and @Controller?

**How Interviewer Thinks:** "Do they understand the purpose of each annotation, or do they just use them randomly?"

**Answer:**

| Annotation | Purpose | When to Use |
|------------|---------|-------------|
| @Component | Generic component | General purpose beans |
| @Service | Business logic | Service layer classes |
| @Repository | Data access | DAO/Repository classes |
| @Controller | Web requests | MVC controllers (returns view) |
| @RestController | REST APIs | REST controllers (returns JSON) |

**Important:** Technically, they all do the same thing - register beans. The difference is semantic (meaning/purpose).

**Real-Time Example:**
\`\`\`java
@Service
public class UserService {
    // Business logic here
    public User createUser(User user) {
        // Validation, processing
        return userRepository.save(user);
    }
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Data access methods
}

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
}
\`\`\`

**Why use different annotations?**
- Makes code more readable - You know what each class does
- Better for AOP - Can target specific layers (e.g., add transaction to all @Repository)
- Industry standard - Other developers understand your code structure

---

### Question 5: What is Auto-Configuration in Spring Boot?

**How Interviewer Thinks:** "Can they explain how Spring Boot magically configures everything?"

**Answer:**
Auto-configuration automatically creates and configures beans based on:
- Dependencies in classpath
- Existing bean definitions
- Property settings in application.properties

**How it works:**
1. Spring Boot scans classpath
2. Finds classes with \`@ConditionalOnClass\` annotation
3. If required class exists, creates bean automatically
4. If bean already exists, skips auto-configuration

**Real-Time Example:**
When you add \`spring-boot-starter-data-jpa\`:
- Spring Boot detects Hibernate on classpath
- Automatically creates DataSource bean
- Creates EntityManagerFactory
- Sets up TransactionManager
- Configures JPA properties

You don't write any \`@Bean\` methods! It's all automatic.

**How to see what's auto-configured:**
Add this to application.properties:
\`\`\`properties
debug=true
\`\`\`

When you run the application, you'll see in logs:
- Positive matches (what was auto-configured)
- Negative matches (what was skipped and why)

---

## Intermediate Level Questions (1-2 Years Experience)

These test your practical knowledge and real project experience.

---

### Question 6: Explain the difference between @RequestParam and @PathVariable

**How Interviewer Thinks:** "Do they know when to use which? Can they explain the difference clearly?"

**Answer:**

**@RequestParam:** Used for query parameters
\`\`\`java
@GetMapping("/users")
public User getUser(@RequestParam Long id) {
    // URL: /users?id=123
    return userService.findById(id);
}
\`\`\`

**@PathVariable:** Used for path variables
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // URL: /users/123
    return userService.findById(id);
}
\`\`\`

**When to use which:**

Use @RequestParam for:
- Optional parameters
- Filtering/searching
- Multiple parameters

\`\`\`java
@GetMapping("/users")
public List<User> getUsers(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) String email) {
    // URL: /users?name=John&email=john@example.com
}
\`\`\`

Use @PathVariable for:
- Resource identification
- Required parameters
- RESTful URLs

\`\`\`java
@GetMapping("/users/{id}/orders/{orderId}")
public Order getOrder(@PathVariable Long id, @PathVariable Long orderId) {
    // URL: /users/123/orders/456
}
\`\`\`

**Real-Time Scenario:**
In an e-commerce application:
- \`GET /products?category=electronics&price=1000\` - Use @RequestParam (filtering)
- \`GET /products/123\` - Use @PathVariable (getting specific product)

---

### Question 7: How do you handle exceptions globally in Spring Boot?

**How Interviewer Thinks:** "Do they know best practices for exception handling? Can they implement it?"

**Answer:**
Use \`@ControllerAdvice\` or \`@RestControllerAdvice\` to handle exceptions globally.

**Complete Example:**

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        // Log full exception for debugging
        logger.error("Unexpected error", ex);
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
\`\`\`

**ErrorResponse class:**
\`\`\`java
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    
    // Constructors, getters, setters
}
\`\`\`

**Real-Time Scenario:**
In a banking application:
- User tries to transfer money from non-existent account → ResourceNotFoundException
- User enters invalid amount → ValidationException
- Database connection fails → Generic Exception

All handled in one place, consistent error format for frontend.

---

### Question 8: What is the difference between CrudRepository and JpaRepository?

**How Interviewer Thinks:** "Do they understand the hierarchy and when to use which?"

**Answer:**

**Repository Hierarchy:**
\`\`\`
Repository (interface)
    ↓
CrudRepository (extends Repository)
    ↓
PagingAndSortingRepository (extends CrudRepository)
    ↓
JpaRepository (extends PagingAndSortingRepository)
\`\`\`

**CrudRepository:**
- Basic CRUD operations
- Methods: save(), findById(), findAll(), delete(), existsById()

**JpaRepository:**
- Extends CrudRepository
- Adds pagination: findAll(Pageable), findAll(Sort)
- Adds flush operations: flush(), saveAndFlush()
- Returns List instead of Iterable

**Real-Time Example:**

\`\`\`java
// Using CrudRepository
public interface UserRepository extends CrudRepository<User, Long> {
    // Basic operations only
    // findAll() returns Iterable<User>
}

// Using JpaRepository
public interface UserRepository extends JpaRepository<User, Long> {
    // Basic operations + Pagination + Sorting
    // findAll() returns List<User>
    // Can use: findAll(Pageable pageable)
    // Can use: findAll(Sort sort)
}
\`\`\`

**When to use which:**
- Use CrudRepository if you only need basic CRUD
- Use JpaRepository if you need pagination, sorting, or List return type
- Most projects use JpaRepository (more features)

---

### Question 9: How do you implement pagination in Spring Boot?

**How Interviewer Thinks:** "Can they implement a common real-world requirement?"

**Answer:**
Use \`Pageable\` interface with JpaRepository.

**Complete Example:**

\`\`\`java
@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/users")
    public Page<User> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }
}
\`\`\`

**Request Examples:**
- \`GET /users?page=0&size=10\` - First page, 10 items
- \`GET /users?page=1&size=20&sortBy=name\` - Second page, 20 items, sorted by name

**Response Structure:**
\`\`\`json
{
    "content": [...users...],
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 0,
    "first": true,
    "last": false
}
\`\`\`

**Real-Time Scenario:**
In an e-commerce application showing products:
- Without pagination: Loading 10,000 products at once (slow, crashes browser)
- With pagination: Load 20 products per page (fast, smooth user experience)

---

### Question 10: How do you implement JWT authentication in Spring Boot?

**How Interviewer Thinks:** "Can they implement security? This is a critical skill."

**Answer:**
JWT (JSON Web Token) is used for stateless authentication.

**Step 1: Add Dependencies**
\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
\`\`\`

**Step 2: Create JWT Service**
\`\`\`java
@Service
public class JwtService {
    
    private String secret = "mySecretKeyShouldBeLongAndSecureInProduction";
    private long expiration = 86400000; // 24 hours
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512)
            .compact();
    }
    
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
\`\`\`

**Step 3: Create Login Endpoint**
\`\`\`java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Validate credentials
        User user = userService.authenticate(request.getUsername(), request.getPassword());
        
        // Generate token
        String token = jwtService.generateToken(user.getUsername());
        
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
\`\`\`

**Step 4: Create JWT Filter**
\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        
        if (token != null && jwtService.validateToken(token)) {
            String username = jwtService.extractUsername(token);
            // Set authentication
            UsernamePasswordAuthenticationToken auth = 
                new UsernamePasswordAuthenticationToken(username, null, null);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
\`\`\`

**Real-Time Scenario:**
User logs in → Receives JWT token → Sends token in header for subsequent requests → Server validates token → Grants access

---

## Advanced Level Questions (2+ Years Experience)

These test deep understanding and problem-solving skills.

---

### Question 11: Explain Spring Boot's Auto-Configuration mechanism in detail

**How Interviewer Thinks:** "Do they understand how Spring Boot works internally? This shows advanced knowledge."

**Answer:**
Auto-configuration uses conditional annotations to decide what to configure.

**Key Annotations:**

\`@ConditionalOnClass\` - Configure only if class exists in classpath
\`\`\`java
@ConditionalOnClass(DataSource.class)
@Configuration
public class DataSourceAutoConfiguration {
    // Only creates DataSource if DataSource class is in classpath
}
\`\`\`

\`@ConditionalOnMissingBean\` - Configure only if bean doesn't exist
\`\`\`java
@ConditionalOnMissingBean(DataSource.class)
@Bean
public DataSource dataSource() {
    // Only creates if you haven't created your own DataSource
}
\`\`\`

\`@ConditionalOnProperty\` - Configure based on property
\`\`\`java
@ConditionalOnProperty(name = "spring.mail.host")
@Configuration
public class MailAutoConfiguration {
    // Only configures if mail.host property is set
}
\`\`\`

**How it works:**
1. Spring Boot scans \`META-INF/spring.factories\` file
2. Finds all auto-configuration classes
3. Checks conditions (@ConditionalOnClass, etc.)
4. If conditions match, creates beans
5. If conditions don't match, skips

**Real-Time Scenario:**
If you add \`spring-boot-starter-data-jpa\`:
- Spring Boot finds \`DataSourceAutoConfiguration\`
- Checks if DataSource class exists (yes, it does)
- Checks if you created your own DataSource (no, you didn't)
- Creates DataSource bean automatically

If you create your own DataSource bean:
- Spring Boot finds \`DataSourceAutoConfiguration\`
- Checks if you created your own DataSource (yes, you did)
- Skips auto-configuration (uses your bean instead)

---

### Question 12: What is the difference between @Transactional and manual transaction management?

**How Interviewer Thinks:** "Do they understand transactions deeply? Can they explain when to use which?"

**Answer:**

**@Transactional (Declarative):**
\`\`\`java
@Service
@Transactional
public class UserService {
    
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        User from = userRepository.findById(fromId).orElseThrow();
        User to = userRepository.findById(toId).orElseThrow();
        
        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));
        
        userRepository.save(from);
        userRepository.save(to);
        // If any operation fails, entire transaction rolls back automatically
    }
}
\`\`\`

**Manual Transaction Management (Programmatic):**
\`\`\`java
@Service
public class UserService {
    
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        TransactionStatus status = transactionManager.getTransaction(
            new DefaultTransactionDefinition()
        );
        
        try {
            User from = userRepository.findById(fromId).orElseThrow();
            User to = userRepository.findById(toId).orElseThrow();
            
            from.setBalance(from.getBalance().subtract(amount));
            to.setBalance(to.getBalance().add(amount));
            
            userRepository.save(from);
            userRepository.save(to);
            
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}
\`\`\`

**When to use which:**
- Use @Transactional for most cases (simpler, cleaner)
- Use manual management when you need fine-grained control (multiple transactions in one method)

**Real-Time Scenario:**
In a banking transfer:
- With @Transactional: If any step fails, entire transfer rolls back automatically
- Without transaction: If second save fails, first save remains (money disappears!)

---

## Tricky Questions - What Interviewers Ask to Test You

These questions are designed to see if you really understand, not just memorized.

---

### Question 13: What happens if you have both @Component and @Service on the same class?

**How Interviewer Thinks:** "Do they understand that these are just markers? Can they explain what actually happens?"

**Answer:**
Both annotations register the bean. Having both is redundant but not an error.

\`\`\`java
@Component
@Service
public class UserService {
    // This class is registered twice (but Spring handles it)
}
\`\`\`

**What happens:**
- Spring sees @Component → Registers bean
- Spring sees @Service → Registers bean again
- Spring detects duplicate → Keeps one, ignores the other
- No error, but redundant

**Best Practice:** Use only one annotation. Use @Service for service classes.

---

### Question 14: Can @Autowired work on a private field? Why or why not?

**How Interviewer Thinks:** "Do they understand how dependency injection works? This tests deep knowledge."

**Answer:**
Yes, @Autowired works on private fields through reflection.

\`\`\`java
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository; // This works!
}
\`\`\`

**How it works:**
- Spring uses Java Reflection API
- Reflection can access private fields
- Spring sets the field value directly

**Why some people say it doesn't work:**
- They might be thinking of manual instantiation
- If you do \`new UserService()\`, @Autowired won't work
- Only works when Spring creates the bean

**Best Practice:** Use constructor injection (better for testing):
\`\`\`java
@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
\`\`\`

---

## Difference-Based Questions

Interviewers love asking "What's the difference between X and Y?" Here are the most common ones.

---

### Question 15: What is the difference between @Controller and @RestController?

**How Interviewer Thinks:** "Do they understand the fundamental difference? Can they explain clearly?"

**Answer:**

**@Controller:**
- Returns view name (for MVC)
- Used with @ResponseBody for JSON
- For server-side rendering

**@RestController:**
- Combination of @Controller + @ResponseBody
- Returns JSON/XML directly
- For REST APIs

**Example:**

\`\`\`java
@Controller
public class UserController {
    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "users"; // Returns view name (users.html)
    }
    
    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getUsersJson() {
        return userService.getAllUsers(); // Returns JSON
    }
}

@RestController
public class UserRestController {
    @GetMapping("/api/users")
    public List<User> getUsers() {
        return userService.getAllUsers(); // Returns JSON automatically
    }
}
\`\`\`

**When to use which:**
- Use @Controller for traditional MVC (HTML pages)
- Use @RestController for REST APIs (JSON responses)

---

### Question 16: What is the difference between @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping?

**How Interviewer Thinks:** "Do they understand HTTP methods and REST principles?"

**Answer:**
These are shortcuts for @RequestMapping with specific HTTP methods.

| Annotation | HTTP Method | Use Case | Idempotent |
|------------|------------|----------|------------|
| @GetMapping | GET | Retrieve data | Yes |
| @PostMapping | POST | Create data | No |
| @PutMapping | PUT | Update data (full) | Yes |
| @DeleteMapping | DELETE | Delete data | Yes |

**Idempotent means:** Calling multiple times has same effect as calling once.

**Real-Time Example:**

\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // GET - Safe, doesn't change data
    // Can call 100 times, same result
}

@PostMapping("/users")
public User createUser(@RequestBody User user) {
    // POST - Creates new resource
    // Calling 10 times creates 10 users
}

@PutMapping("/users/{id}")
public User updateUser(@PathVariable Long id, @RequestBody User user) {
    // PUT - Updates entire resource
    // Calling 10 times with same data = same result
}

@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) {
    // DELETE - Removes resource
    // Calling 10 times = same result (already deleted)
}
\`\`\`

---

## Scenario-Based Questions

These test your ability to apply knowledge to real situations.

---

### Question 17: In a banking application, how would you ensure money transfer is atomic?

**How Interviewer Thinks:** "Can they apply transactions to real business scenarios?"

**Answer:**
Use @Transactional to ensure atomicity.

\`\`\`java
@Service
@Transactional
public class BankingService {
    
    @Autowired
    private AccountRepository accountRepository;
    
    public void transferMoney(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        // Step 1: Validate
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        
        // Step 2: Get accounts
        Account fromAccount = accountRepository.findById(fromAccountId)
            .orElseThrow(() -> new AccountNotFoundException("From account not found"));
        Account toAccount = accountRepository.findById(toAccountId)
            .orElseThrow(() -> new AccountNotFoundException("To account not found"));
        
        // Step 3: Check balance
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance");
        }
        
        // Step 4: Transfer (atomic operation)
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));
        
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
        
        // If any step fails, entire transaction rolls back
        // Either both accounts update, or neither updates
    }
}
\`\`\`

**Why @Transactional is critical:**
- Without it: If second save fails, first save remains (money disappears!)
- With it: If any step fails, entire operation rolls back (money stays safe)

**Real-Time Scenario:**
User transfers $1000 from Account A to Account B:
- Account A balance: $5000 → $4000
- Account B balance: $2000 → $3000

If database crashes after updating Account A but before updating Account B:
- Without transaction: $1000 is lost
- With transaction: Both updates roll back, $1000 is safe

---

### Question 18: How would you implement rate limiting for API endpoints?

**How Interviewer Thinks:** "Can they implement common production requirements?"

**Answer:**
Use interceptor or filter to limit requests per user/IP.

\`\`\`java
@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    
    private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long TIME_WINDOW = 60000; // 1 minute
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) {
        String clientId = getClientId(request);
        long currentTime = System.currentTimeMillis();
        
        List<Long> requests = requestCounts.getOrDefault(clientId, new ArrayList<>());
        
        // Remove old requests (outside time window)
        requests.removeIf(time -> currentTime - time > TIME_WINDOW);
        
        // Check if limit exceeded
        if (requests.size() >= MAX_REQUESTS) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("Retry-After", "60");
            return false; // Block request
        }
        
        // Add current request
        requests.add(currentTime);
        requestCounts.put(clientId, requests);
        
        return true; // Allow request
    }
    
    private String getClientId(HttpServletRequest request) {
        // Use IP address or user ID
        return request.getRemoteAddr();
    }
}
\`\`\`

**Register interceptor:**
\`\`\`java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Autowired
    private RateLimitInterceptor rateLimitInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/api/**");
    }
}
\`\`\`

**Real-Time Scenario:**
Prevents API abuse:
- Without rate limiting: Attacker can send 10,000 requests/second (crashes server)
- With rate limiting: Maximum 100 requests per minute per IP (server stays safe)

---

## Debugging Questions

These test your problem-solving skills.

---

### Question 19: Your @Autowired field is null. How do you debug this?

**How Interviewer Thinks:** "Can they debug common Spring Boot issues? This is critical skill."

**Answer:**
Step-by-step debugging approach:

**Step 1: Check if class is a Spring bean**
\`\`\`java
// Is the class annotated?
@Service  // Missing this?
public class UserService {
    @Autowired
    private UserRepository userRepository; // This will be null!
}
\`\`\`

**Step 2: Check if dependency is a Spring bean**
\`\`\`java
// Is UserRepository a Spring bean?
public class UserRepository {  // Missing @Repository?
    // This won't be injected
}
\`\`\`

**Step 3: Check component scanning**
\`\`\`java
@SpringBootApplication
// Is UserService in the same package or sub-package?
// If UserService is in com.otherpackage, it won't be scanned
public class Application {
}
\`\`\`

**Step 4: Check if you're creating instance manually**
\`\`\`java
// This won't work - Spring doesn't manage this instance
UserService userService = new UserService();
// userService.userRepository will be null
\`\`\`

**Step 5: Check circular dependencies**
\`\`\`java
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB; // ServiceB depends on ServiceA
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA; // Circular dependency!
}
\`\`\`

**Debugging Checklist:**
- [ ] Is the class annotated with @Component, @Service, @Repository, or @Controller?
- [ ] Is the dependency annotated with Spring annotation?
- [ ] Is the class in a package scanned by @ComponentScan?
- [ ] Are you using Spring-managed instance (not \`new\`)?
- [ ] Is there a circular dependency?
- [ ] Check application logs for bean creation errors

---

### Question 20: Your REST API returns 404. How do you debug?

**How Interviewer Thinks:** "Can they systematically debug HTTP issues?"

**Answer:**
Debugging checklist:

**Step 1: Check URL mapping**
\`\`\`java
@RestController
@RequestMapping("/api/users")  // Is this correct?
public class UserController {
    @GetMapping("/{id}")  // Full path: /api/users/{id}
    public User getUser(@PathVariable Long id) {
        // Request: GET /api/users/123 (correct)
        // Request: GET /users/123 (wrong - missing /api)
    }
}
\`\`\`

**Step 2: Check HTTP method**
\`\`\`java
@GetMapping("/users")  // Only accepts GET
// POST /users → 404 (wrong method)
// GET /users → 200 (correct)
\`\`\`

**Step 3: Check if controller is registered**
- Is @RestController or @Controller present?
- Is controller in scanned package?
- Check logs for "Mapped" messages

**Step 4: Check path variables**
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // /users/123 → Works
    // /users/abc → Might fail (type conversion)
}
\`\`\`

**Step 5: Check server is running**
- Is application started?
- Check console for "Started Application"
- Check port (default 8080)

**Step 6: Check Actuator endpoints**
\`\`\`
GET http://localhost:8080/actuator/mappings
\`\`\`
This shows all registered endpoints.

**Common Mistakes:**
- Wrong URL path
- Wrong HTTP method
- Controller not scanned
- Path variable type mismatch
- Server not running

---

## Final Tips for Interview Success

**Before the interview:**
1. Practice explaining concepts out loud
2. Prepare real project examples
3. Review common Spring Boot annotations
4. Practice coding on whiteboard/paper

**During the interview:**
1. Think before answering - It's okay to pause
2. Ask clarifying questions if needed
3. Explain your thought process
4. Relate to real projects when possible
5. Admit if you don't know something

**What interviewers really want:**
- Clear communication
- Problem-solving approach
- Real project experience
- Willingness to learn
- Honest answers

Remember: Interviewers are not trying to trick you. They want to see if you can work with them. Be confident, be honest, and show your passion for learning.

Good luck with your interview!
`
};

export default springBootInterviewQuestions;
