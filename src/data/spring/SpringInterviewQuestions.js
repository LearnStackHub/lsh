const springInterviewQuestions = {
  id: 'spring-interview-questions',
  title: 'Top 30 Spring Framework Interview Questions',
  description: 'Most frequently asked Spring Framework interview questions for Java developers with detailed answers, real-world scenarios, and code examples',
  content: `
# Top 30 Spring Framework Interview Questions - Complete Guide

Master the most commonly asked Spring Framework interview questions. These questions cover IOC, DI, MVC, AOP, and Spring Data concepts.

---

## Basic Level Questions (Freshers to 1 Year)

---

### Question 1: What is Spring Framework? Why do we use it?

**Answer:**
Spring Framework is a comprehensive Java application framework that provides infrastructure support for developing Java applications.

**Why Use Spring:**
- Dependency Injection (DI) - Loose coupling
- Inversion of Control (IOC) - Object creation management
- Aspect-Oriented Programming (AOP) - Cross-cutting concerns
- Transaction management
- MVC framework for web applications
- Integration with other frameworks

**Real-Time Example:**
\`\`\`java
// Without Spring - Tight coupling
public class UserService {
    private UserRepository repo = new UserRepository();
}

// With Spring - Loose coupling
@Service
public class UserService {
    @Autowired
    private UserRepository repo;  // Spring injects dependency
}
\`\`\`

---

### Question 2: Explain Inversion of Control (IOC).

**Answer:**
IOC means Spring creates and manages objects instead of you creating them.

**Traditional Java:**
\`\`\`java
UserService service = new UserService();  // You create
\`\`\`

**With Spring:**
\`\`\`java
@Autowired
UserService service;  // Spring creates and injects
\`\`\`

**Benefits:**
- Loose coupling
- Easy testing (can inject mocks)
- Centralized object management

---

### Question 3: What is Dependency Injection (DI)? Explain types.

**Answer:**
DI is providing dependencies to objects instead of creating them internally.

**Types of DI:**

**1. Constructor Injection:**
\`\`\`java
@Service
public class UserService {
    private UserRepository repo;
    
    @Autowired
    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

**2. Setter Injection:**
\`\`\`java
@Service
public class UserService {
    private UserRepository repo;
    
    @Autowired
    public void setRepo(UserRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

**3. Field Injection:**
\`\`\`java
@Service
public class UserService {
    @Autowired
    private UserRepository repo;
}
\`\`\`

**Best Practice:** Use Constructor Injection (mandatory dependencies).

---

### Question 4: What is a Spring Bean? Explain bean scopes.

**Answer:**
A bean is an object managed by Spring container.

**Bean Scopes:**
- **singleton** - One instance per container (default)
- **prototype** - New instance each time
- **request** - One per HTTP request
- **session** - One per HTTP session
- **application** - One per ServletContext

**Example:**
\`\`\`java
@Component
@Scope("prototype")
public class UserService { }
\`\`\`

---

### Question 5: Explain Spring MVC architecture.

**Answer:**
Spring MVC follows Model-View-Controller pattern.

**Components:**
1. **DispatcherServlet** - Front controller
2. **HandlerMapping** - Maps requests to controllers
3. **Controller** - Handles requests
4. **ModelAndView** - Returns data and view
5. **ViewResolver** - Resolves view names

**Flow:**
\`\`\`
Request → DispatcherServlet → HandlerMapping → Controller → ModelAndView → ViewResolver → View
\`\`\`

---

## Intermediate Level Questions (1-3 Years)

---

### Question 6: What is the difference between @Component, @Service, @Repository, and @Controller?

**Answer:**

| Annotation | Purpose | Use Case |
|------------|---------|----------|
| @Component | Generic Spring component | General purpose |
| @Service | Business logic layer | Service classes |
| @Repository | Data access layer | DAO/Repository classes |
| @Controller | Web layer | MVC controllers |

**Example:**
\`\`\`java
@Service
public class UserService { }

@Repository
public class UserRepository { }

@Controller
public class UserController { }
\`\`\`

**Note:** All are @Component, but provide semantic meaning.

---

### Question 7: Explain Spring AOP (Aspect-Oriented Programming).

**Answer:**
AOP separates cross-cutting concerns (logging, transactions, security).

**AOP Concepts:**
- **Aspect** - Module of cross-cutting concern
- **Join Point** - Point in execution (method call)
- **Pointcut** - Expression matching join points
- **Advice** - Action taken at join point
- **Weaving** - Applying aspects to target objects

**Example:**
\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Method: " + joinPoint.getSignature());
    }
}
\`\`\`

---

### Question 8: What is Spring ApplicationContext?

**Answer:**
ApplicationContext is Spring container that manages beans.

**Types:**
- **ClassPathXmlApplicationContext** - Loads from classpath XML
- **FileSystemXmlApplicationContext** - Loads from file system
- **AnnotationConfigApplicationContext** - Uses annotations

**Example:**
\`\`\`java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
UserService service = ctx.getBean(UserService.class);
\`\`\`

---

### Question 9: Explain Spring Bean lifecycle.

**Answer:**
Spring manages bean lifecycle through callbacks:

**Lifecycle Methods:**
1. Bean instantiation
2. Dependency injection
3. @PostConstruct
4. Bean ready
5. @PreDestroy
6. Bean destruction

**Example:**
\`\`\`java
@Component
public class UserService {
    @PostConstruct
    public void init() {
        // Initialization logic
    }
    
    @PreDestroy
    public void cleanup() {
        // Cleanup logic
    }
}
\`\`\`

---

### Question 10: What is the difference between @Autowired and @Qualifier?

**Answer:**
@Autowired injects dependencies, @Qualifier specifies which bean to inject.

**Example:**
\`\`\`java
@Component("userService1")
public class UserService1 implements UserService { }

@Component("userService2")
public class UserService2 implements UserService { }

@Service
public class OrderService {
    @Autowired
    @Qualifier("userService1")
    private UserService userService;  // Injects userService1
}
\`\`\`

---

## Advanced Level Questions (3+ Years)

---

### Question 11: Explain Spring transaction management.

**Answer:**
Spring provides declarative transaction management.

**@Transactional:**
\`\`\`java
@Service
@Transactional
public class UserService {
    public void transferMoney(Long from, Long to, BigDecimal amount) {
        // Both operations succeed or both fail
        accountRepository.debit(from, amount);
        accountRepository.credit(to, amount);
    }
}
\`\`\`

**Transaction Propagation:**
- REQUIRED (default) - Join existing or create new
- REQUIRES_NEW - Always create new
- SUPPORTS - Join if exists
- NOT_SUPPORTED - Suspend if exists
- MANDATORY - Must have existing
- NEVER - Must not have existing

---

### Question 12: What is Spring Data JPA?

**Answer:**
Spring Data JPA simplifies data access layer.

**Example:**
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
    List<User> findByAgeGreaterThan(int age);
}
\`\`\`

No implementation needed - Spring generates it!

---

### Question 13: Explain Spring Security architecture.

**Answer:**
Spring Security provides authentication and authorization.

**Key Components:**
- **AuthenticationManager** - Authenticates users
- **UserDetailsService** - Loads user data
- **SecurityFilterChain** - Security filters
- **PasswordEncoder** - Password encoding

**Example:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.authorizeRequests()
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated();
        return http.build();
    }
}
\`\`\`

---

### Question 14: What is Spring Boot? How is it different from Spring?

**Answer:**
Spring Boot is Spring Framework with auto-configuration and convention over configuration.

**Differences:**

| Feature | Spring | Spring Boot |
|---------|--------|-------------|
| Configuration | Manual | Auto-configuration |
| Embedded Server | No | Yes (Tomcat) |
| Starter Dependencies | No | Yes |
| Production Ready | Manual setup | Built-in (Actuator) |

---

### Question 15: Explain Spring profiles.

**Answer:**
Profiles allow environment-specific configuration.

**Example:**
\`\`\`java
@Configuration
@Profile("dev")
public class DevConfig { }

@Configuration
@Profile("prod")
public class ProdConfig { }
\`\`\`

**Activate Profile:**
\`\`\`properties
spring.profiles.active=dev
\`\`\`

---

## Tricky Questions

---

### Question 16: What is circular dependency? How to resolve it?

**Answer:**
Circular dependency occurs when beans depend on each other.

**Problem:**
\`\`\`java
@Component
public class A {
    @Autowired
    private B b;
}

@Component
public class B {
    @Autowired
    private A a;  // Circular!
}
\`\`\`

**Solutions:**
1. Use @Lazy
2. Use setter injection
3. Refactor design

---

### Question 17: Explain @Primary annotation.

**Answer:**
@Primary indicates preferred bean when multiple candidates exist.

**Example:**
\`\`\`java
@Component
@Primary
public class UserService1 implements UserService { }

@Component
public class UserService2 implements UserService { }

@Service
public class OrderService {
    @Autowired
    private UserService userService;  // Injects UserService1 (primary)
}
\`\`\`

---

### Question 18: What is the difference between @Controller and @RestController?

**Answer:**

| Annotation | Returns | Use Case |
|------------|---------|----------|
| @Controller | View name | MVC applications |
| @RestController | JSON/XML | REST APIs |

**Example:**
\`\`\`java
@Controller
public class UserController {
    @RequestMapping("/users")
    public String getUsers(Model model) {
        return "users";  // View name
    }
}

@RestController
public class UserRestController {
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();  // JSON response
    }
}
\`\`\`

---

### Question 19: Explain Spring BeanPostProcessor.

**Answer:**
BeanPostProcessor allows custom modification of beans.

**Example:**
\`\`\`java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // Before initialization
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        // After initialization
        return bean;
    }
}
\`\`\`

---

### Question 20: What is Spring Expression Language (SpEL)?

**Answer:**
SpEL provides expression evaluation at runtime.

**Example:**
\`\`\`java
@Value("#{systemProperties['user.name']}")
private String userName;

@Value("#{userService.getUserCount()}")
private int userCount;
\`\`\`

---

## Real-World Scenario Questions

---

### Question 21: How do you handle exceptions in Spring MVC?

**Answer:**
Use @ControllerAdvice for global exception handling.

**Example:**
\`\`\`java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
\`\`\`

---

### Question 22: Explain Spring JDBC Template.

**Answer:**
JdbcTemplate simplifies JDBC operations.

**Example:**
\`\`\`java
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new BeanPropertyRowMapper<>(User.class),
            id
        );
    }
}
\`\`\`

---

### Question 23: How do you implement caching in Spring?

**Answer:**
Use Spring Cache abstraction.

**Example:**
\`\`\`java
@Cacheable("users")
public User findById(Long id) {
    return userRepository.findById(id);
}

@CacheEvict("users")
public void deleteUser(Long id) {
    userRepository.deleteById(id);
}
\`\`\`

---

### Question 24: Explain Spring WebFlux (Reactive).

**Answer:**
WebFlux provides reactive programming model.

**Example:**
\`\`\`java
@RestController
public class UserController {
    @GetMapping("/users")
    public Flux<User> getUsers() {
        return userService.findAll();  // Reactive stream
    }
}
\`\`\`

---

### Question 25: How do you test Spring applications?

**Answer:**
Use Spring Test framework.

**Example:**
\`\`\`java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testGetUsers() throws Exception {
        mockMvc.perform(get("/users"))
            .andExpect(status().isOk());
    }
}
\`\`\`

---

## Debugging Questions

---

### Question 26: How do you debug Spring bean creation issues?

**Answer:**
- Check @ComponentScan configuration
- Verify @Autowired dependencies
- Check for circular dependencies
- Review application logs
- Use @PostConstruct for debugging

---

### Question 27: What causes @Autowired to fail?

**Answer:**
Common causes:
- Bean not found (not scanned)
- Multiple candidates without @Qualifier
- Circular dependency
- Missing @Component/@Service annotation

---

### Question 28: How do you handle Spring transaction rollback?

**Answer:**
\`\`\`java
@Transactional(rollbackFor = Exception.class)
public void transferMoney() {
    // Rolls back on any exception
}
\`\`\`

---

### Question 29: Explain Spring property injection.

**Answer:**
Inject properties from application.properties.

**Example:**
\`\`\`java
// Inject single property using @Value
// Syntax: @Value("\${property.key}")
@Value("\${application.name}")
private String appName;

// Inject multiple properties using @ConfigurationProperties
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int version;
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
\`\`\`

**Note:** In the @Value annotation, the syntax \`\${property.name}\` references properties from application.properties file.

---

### Question 30: What are Spring best practices?

**Answer:**
- Use constructor injection
- Prefer @ComponentScan over XML
- Use @Transactional appropriately
- Implement proper exception handling
- Use profiles for environments
- Enable caching where appropriate
- Follow naming conventions
- Use @Qualifier when needed
- Avoid circular dependencies
- Write unit and integration tests

---

## Summary

These 30 Spring Framework interview questions cover:
- IOC and Dependency Injection
- Spring MVC architecture
- AOP concepts
- Transaction management
- Spring Data JPA
- Spring Security
- Best practices

Master these questions to excel in Spring Framework interviews!
  `
};

export default springInterviewQuestions;

