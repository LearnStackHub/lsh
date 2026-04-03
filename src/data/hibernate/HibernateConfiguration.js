const hibernateConfiguration = {
  id: 'hibernate-configuration',
  title: 'Hibernate Configuration',
  description: 'Learn how to configure Hibernate using XML and programmatic configuration',
  content: `
# Hibernate Configuration — Setting Up Your ORM

Before you can use Hibernate, you need to configure it. Configuration tells Hibernate:
- Which database to connect to
- How to connect (username, password, URL)
- Which entity classes to use
- Various settings (dialect, caching, etc.)

---

## Configuration Methods

Hibernate can be configured in two ways:
1. **XML Configuration** (hibernate.cfg.xml) - Traditional, recommended
2. **Programmatic Configuration** - Using Java code
3. **JPA Configuration** (persistence.xml) - JPA standard

---

## XML Configuration (hibernate.cfg.xml)

The most common way to configure Hibernate is using an XML file.

### Basic Configuration File

Create \`hibernate.cfg.xml\` in your \`src/main/resources\` folder:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- Database Connection Settings -->
        <property name="hibernate.connection.driver_class">
            com.mysql.cj.jdbc.Driver
        </property>
        <property name="hibernate.connection.url">
            jdbc:mysql://localhost:3306/hibernatedb?useSSL=false
        </property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">password</property>
        
        <!-- Dialect -->
        <property name="hibernate.dialect">
            org.hibernate.dialect.MySQL8Dialect
        </property>
        
        <!-- Show SQL (for development) -->
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>
        
        <!-- Auto create/update tables -->
        <property name="hibernate.hbm2ddl.auto">update</property>
        
        <!-- Mapping Files or Annotated Classes -->
        <mapping class="com.example.User"/>
        <mapping class="com.example.Product"/>
    </session-factory>
</hibernate-configuration>
\`\`\`

---

## Key Configuration Properties

### Database Connection

\`\`\`xml
<!-- Driver class -->
<property name="hibernate.connection.driver_class">
    com.mysql.cj.jdbc.Driver
</property>

<!-- Database URL -->
<property name="hibernate.connection.url">
    jdbc:mysql://localhost:3306/mydb
</property>

<!-- Credentials -->
<property name="hibernate.connection.username">root</property>
<property name="hibernate.connection.password">password</property>
\`\`\`

### Dialect

Dialect tells Hibernate which database you're using so it can generate correct SQL.

\`\`\`xml
<!-- MySQL 8 -->
<property name="hibernate.dialect">
    org.hibernate.dialect.MySQL8Dialect
</property>

<!-- PostgreSQL -->
<property name="hibernate.dialect">
    org.hibernate.dialect.PostgreSQLDialect
</property>

<!-- Oracle -->
<property name="hibernate.dialect">
    org.hibernate.dialect.Oracle12cDialect
</property>
\`\`\`

### Schema Management (hbm2ddl.auto)

Controls automatic schema generation:

\`\`\`xml
<!-- create: Drop and create tables on startup -->
<property name="hibernate.hbm2ddl.auto">create</property>

<!-- update: Update schema if needed -->
<property name="hibernate.hbm2ddl.auto">update</property>

<!-- validate: Only validate, don't change schema -->
<property name="hibernate.hbm2ddl.auto">validate</property>

<!-- none: Do nothing -->
<property name="hibernate.hbm2ddl.auto">none</property>
\`\`\`

**⚠️ Warning:** Use \`create\` or \`update\` only in development. Use \`validate\` or \`none\` in production.

### SQL Logging

\`\`\`xml
<!-- Show generated SQL -->
<property name="hibernate.show_sql">true</property>

<!-- Format SQL for readability -->
<property name="hibernate.format_sql">true</property>
\`\`\`

---

## Programmatic Configuration

You can also configure Hibernate programmatically:

\`\`\`java
Configuration configuration = new Configuration();

// Database connection
configuration.setProperty("hibernate.connection.driver_class", 
    "com.mysql.cj.jdbc.Driver");
configuration.setProperty("hibernate.connection.url", 
    "jdbc:mysql://localhost:3306/mydb");
configuration.setProperty("hibernate.connection.username", "root");
configuration.setProperty("hibernate.connection.password", "password");

// Dialect
configuration.setProperty("hibernate.dialect", 
    "org.hibernate.dialect.MySQL8Dialect");

// Other settings
configuration.setProperty("hibernate.show_sql", "true");
configuration.setProperty("hibernate.hbm2ddl.auto", "update");

// Add annotated classes
configuration.addAnnotatedClass(User.class);
configuration.addAnnotatedClass(Product.class);

// Build SessionFactory
SessionFactory sessionFactory = configuration.buildSessionFactory();
\`\`\`

---

## Connection Pooling

For production, use a proper connection pool instead of Hibernate's default.

### HikariCP (Recommended)

\`\`\`xml
<property name="hibernate.connection.provider_class">
    org.hibernate.hikaricp.internal.HikariCPConnectionProvider
</property>
<property name="hibernate.hikari.dataSourceClassName">
    com.mysql.cj.jdbc.MysqlDataSource
</property>
<property name="hibernate.hikari.dataSource.url">
    jdbc:mysql://localhost:3306/mydb
</property>
<property name="hibernate.hikari.dataSource.user">root</property>
<property name="hibernate.hikari.dataSource.password">password</property>
<property name="hibernate.hikari.maximumPoolSize">10</property>
<property name="hibernate.hikari.minimumIdle">5</property>
\`\`\`

### C3P0

\`\`\`xml
<property name="hibernate.connection.provider_class">
    org.hibernate.connection.C3P0ConnectionProvider
</property>
<property name="hibernate.c3p0.min_size">5</property>
<property name="hibernate.c3p0.max_size">20</property>
<property name="hibernate.c3p0.timeout">300</property>
<property name="hibernate.c3p0.max_statements">50</property>
\`\`\`

---

## Complete Configuration Example

Here's a complete production-ready configuration:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- Database Connection -->
        <property name="hibernate.connection.driver_class">
            com.mysql.cj.jdbc.Driver
        </property>
        <property name="hibernate.connection.url">
            jdbc:mysql://localhost:3306/ecommerce?useSSL=false&amp;serverTimezone=UTC
        </property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">password</property>
        
        <!-- Dialect -->
        <property name="hibernate.dialect">
            org.hibernate.dialect.MySQL8Dialect
        </property>
        
        <!-- Connection Pool (HikariCP) -->
        <property name="hibernate.connection.provider_class">
            org.hibernate.hikaricp.internal.HikariCPConnectionProvider
        </property>
        <property name="hibernate.hikari.maximumPoolSize">10</property>
        <property name="hibernate.hikari.minimumIdle">5</property>
        
        <!-- Schema Management -->
        <property name="hibernate.hbm2ddl.auto">validate</property>
        
        <!-- SQL Logging (disable in production) -->
        <property name="hibernate.show_sql">false</property>
        <property name="hibernate.format_sql">false</property>
        
        <!-- Second-Level Cache (optional) -->
        <property name="hibernate.cache.use_second_level_cache">true</property>
        <property name="hibernate.cache.region.factory_class">
            org.hibernate.cache.ehcache.EhCacheRegionFactory
        </property>
        
        <!-- Entity Classes -->
        <mapping class="com.example.model.User"/>
        <mapping class="com.example.model.Product"/>
        <mapping class="com.example.model.Order"/>
    </session-factory>
</hibernate-configuration>
\`\`\`

---

## Using Configuration

Once configured, use it to create SessionFactory:

\`\`\`java
public class HibernateUtil {
    private static SessionFactory sessionFactory;
    
    static {
        try {
            Configuration configuration = new Configuration();
            configuration.configure("hibernate.cfg.xml");
            sessionFactory = configuration.buildSessionFactory();
        } catch (Exception e) {
            System.err.println("Initial SessionFactory creation failed: " + e);
            throw new ExceptionInInitializerError(e);
        }
    }
    
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
    
    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }
}
\`\`\`

---

## Environment-Specific Configuration

You can have different configurations for different environments:

### Development (hibernate-dev.cfg.xml)
\`\`\`xml
<property name="hibernate.show_sql">true</property>
<property name="hibernate.hbm2ddl.auto">update</property>
\`\`\`

### Production (hibernate-prod.cfg.xml)
\`\`\`xml
<property name="hibernate.show_sql">false</property>
<property name="hibernate.hbm2ddl.auto">validate</property>
\`\`\`

Load specific configuration:
\`\`\`java
Configuration config = new Configuration();
config.configure("hibernate-prod.cfg.xml");
\`\`\`

---

## Summary

Hibernate configuration involves:
- **Database connection** settings
- **Dialect** selection
- **Schema management** strategy
- **Connection pooling** setup
- **Entity class** registration
- **Optional features** (caching, etc.)

Choose XML configuration for most cases, and use programmatic configuration when you need dynamic setup.

---

## Practice Question

**Q:** What's the difference between \`hibernate.hbm2ddl.auto\` values: create, update, validate, and none? When would you use each?

**Hint:** Think about development vs production environments.

**Answer:**
- **create**: Drops and recreates tables - use only in development/testing
- **update**: Updates schema if needed - use in development
- **validate**: Only validates schema matches entities - use in production
- **none**: No schema operations - use in production when schema is managed externally

---



## 10 Important Hibernate Configuration Interview Questions

### 1. What does Hibernate configuration control?
**Answer:** It controls DB connectivity, dialect, schema behavior, SQL logging, batching, cache settings, and mapping registration.

### 2. Why is wrong dialect configuration dangerous?
**Answer:** Wrong dialect can generate incompatible SQL and subtle runtime failures even when code compiles and starts.

### 3. What should hbm2ddl mode be in production?
**Answer:** Production should usually use validate or none with migration tools, not create or create-drop, to avoid accidental schema loss.

### 4. XML config vs programmatic config: when to choose each?
**Answer:** XML is explicit and good for legacy clarity; programmatic/property-driven config is easier for profile-based modern deployments.

### 5. Which settings matter most for performance tuning?
**Answer:** Batch size, fetch size, SQL logging level, second-level cache toggles, and connection pool properties are high-impact settings.

### 6. How should environments be separated?
**Answer:** Use externalized profile configs for dev, test, and prod with different URLs, credentials, logging verbosity, and schema policies.

### 7. What startup logs should you verify first?
**Answer:** Dialect resolution, datasource connectivity, mapped entity count, and schema validation messages should be checked first.

### 8. Real-time scenario: app works locally but fails in staging, where do you debug first?
**Answer:** Compare env properties, driver versions, dialect, timezone settings, and credential injection path before touching business code.

### 9. What common configuration mistake causes data bugs?
**Answer:** Misconfigured timezone and collation settings can cause wrong date/time persistence or sorting inconsistencies across environments.

### 10. Interview summary for configuration?
**Answer:** Hibernate configuration is operational architecture; good configuration strategy prevents deployment failures and performance regressions before runtime incidents.
`,
  code: `// Hibernate Configuration Example
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String department;
    private Double salary;
    
    public Employee() {}
    
    public Employee(String name, String department, Double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
}

// Configuration Utility Class
public class HibernateConfig {
    private static SessionFactory sessionFactory;
    
    // Initialize SessionFactory using XML configuration
    public static SessionFactory getSessionFactoryFromXML() {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration();
            configuration.configure("hibernate.cfg.xml");
            sessionFactory = configuration.buildSessionFactory();
        }
        return sessionFactory;
    }
    
    // Initialize SessionFactory programmatically
    public static SessionFactory getSessionFactoryProgrammatic() {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration();
            
            // Database connection
            configuration.setProperty("hibernate.connection.driver_class", 
                "com.mysql.cj.jdbc.Driver");
            configuration.setProperty("hibernate.connection.url", 
                "jdbc:mysql://localhost:3306/hibernatedb");
            configuration.setProperty("hibernate.connection.username", "root");
            configuration.setProperty("hibernate.connection.password", "password");
            
            // Dialect
            configuration.setProperty("hibernate.dialect", 
                "org.hibernate.dialect.MySQL8Dialect");
            
            // Settings
            configuration.setProperty("hibernate.show_sql", "true");
            configuration.setProperty("hibernate.format_sql", "true");
            configuration.setProperty("hibernate.hbm2ddl.auto", "update");
            
            // Add entity classes
            configuration.addAnnotatedClass(Employee.class);
            
            sessionFactory = configuration.buildSessionFactory();
        }
        return sessionFactory;
    }
    
    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }
}`
};

export default hibernateConfiguration;


