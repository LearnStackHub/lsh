const springBootConfiguration = {
  id: 'spring-boot-configuration',
  title: 'Spring Boot Configuration - application.properties and YAML',
  description: 'Learn how to configure Spring Boot applications using application.properties, YAML files, and environment variables',
  content: `
# Spring Boot Configuration - Complete Guide

Configuration is how you tell Spring Boot how to behave. What port to use, which database to connect to, what logging level to use. Without configuration, your application uses defaults. But real applications need customization.

Let me show you all the ways to configure a Spring Boot application.

---

## Understanding Configuration Files

Spring Boot looks for configuration in this order (first found wins):

1. Command line arguments
2. Java System properties
3. Environment variables
4. \`application.properties\` or \`application.yml\` in your project
5. Default values

---

## Method 1: application.properties

This is the most common way. Simple key-value pairs.

### Basic Structure

\`\`\`properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Application Information
spring.application.name=my-app
spring.application.version=1.0.0

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.com.example=DEBUG
logging.level.org.springframework.web=INFO
\`\`\`

### Common Configuration Properties

**Server Settings:**
\`\`\`properties
server.port=8080                    # Port number
server.servlet.context-path=/api    # Base path for all URLs
server.error.whitelabel.enabled=false # Disable default error page
\`\`\`

**Database Settings:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
\`\`\`

**JPA/Hibernate Settings:**
\`\`\`properties
spring.jpa.hibernate.ddl-auto=update    # create, update, validate, none
spring.jpa.show-sql=true                 # Show SQL queries
spring.jpa.properties.hibernate.format_sql=true
\`\`\`

**Logging:**
\`\`\`properties
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.file.name=application.log
logging.file.path=/var/log
\`\`\`

---

## Method 2: application.yml (YAML Format)

YAML is more readable for complex configurations. Same file, different format.

### Basic Structure

\`\`\`yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: my-app
    version: 1.0.0
  
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

logging:
  level:
    root: INFO
    com.example: DEBUG
  file:
    name: application.log
\`\`\`

### When to Use YAML vs Properties

- **Use Properties:** Simple configurations, you're comfortable with it
- **Use YAML:** Complex nested configurations, better readability

Both work the same. Choose what you prefer.

---

## Method 3: Profile-Specific Configuration

Different configurations for different environments (dev, test, prod).

### Create Profile Files

\`\`\`properties
# application-dev.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
logging.level.com.example=DEBUG

# application-prod.properties
server.port=80
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
logging.level.com.example=WARN
\`\`\`

### Activate Profile

**Option 1: In application.properties**
\`\`\`properties
spring.profiles.active=dev
\`\`\`

**Option 2: Command Line**
\`\`\`bash
java -jar app.jar --spring.profiles.active=prod
\`\`\`

**Option 3: Environment Variable**
\`\`\`bash
export SPRING_PROFILES_ACTIVE=prod
\`\`\`

---

## Method 4: Environment Variables

Useful for sensitive data like passwords. Never commit passwords to code.

### Setting Environment Variables

**Windows:**
\`\`\`bash
set SPRING_DATASOURCE_PASSWORD=mypassword
\`\`\`

**Linux/Mac:**
\`\`\`bash
export SPRING_DATASOURCE_PASSWORD=mypassword
\`\`\`

### Using in application.properties

\`\`\`properties
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:defaultpassword}
\`\`\`

This uses the environment variable, or "defaultpassword" if not set.

---

## Method 5: @ConfigurationProperties

For complex configurations, create a configuration class.

### Create Configuration Class

\`\`\`java
package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String version;
    private Database database = new Database();
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    
    public Database getDatabase() { return database; }
    public void setDatabase(Database database) { this.database = database; }
    
    public static class Database {
        private String url;
        private String username;
        
        // Getters and Setters
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    }
}
\`\`\`

### Use in application.properties

\`\`\`properties
app.name=My Application
app.version=1.0.0
app.database.url=jdbc:mysql://localhost:3306/mydb
app.database.username=root
\`\`\`

### Inject and Use

\`\`\`java
@Autowired
private AppConfig appConfig;

public void someMethod() {
    String appName = appConfig.getName();
    String dbUrl = appConfig.getDatabase().getUrl();
}
\`\`\`

---

## Real-World Configuration Example

Here's a complete configuration for a production-ready application:

\`\`\`yaml
# application.yml
server:
  port: 8080
  error:
    whitelabel:
      enabled: false

spring:
  application:
    name: student-management-api
  
  datasource:
    url: jdbc:mysql://localhost:3306/studentdb
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework.web: INFO
    org.hibernate.SQL: DEBUG
  file:
    name: application.log
    max-size: 10MB
    max-history: 30

# Custom Application Properties
app:
  name: Student Management System
  version: 1.0.0
  api:
    base-url: /api/v1
    timeout: 5000
\`\`\`

---

## Configuration Best Practices

1. **Never Commit Secrets:** Use environment variables for passwords
2. **Use Profiles:** Separate dev, test, prod configurations
3. **Validate Configuration:** Use @Valid on @ConfigurationProperties
4. **Document Properties:** Add comments explaining what each property does
5. **Use Sensible Defaults:** Set defaults that work for most cases

---

## Common Configuration Mistakes

**Mistake 1: Hardcoding Values**
\`\`\`java
// BAD
String dbUrl = "jdbc:mysql://localhost:3306/mydb";

// GOOD
@Value("\${spring.datasource.url}")
private String dbUrl;
\`\`\`

**Mistake 2: Committing Passwords**
\`\`\`properties
# BAD - Never do this
spring.datasource.password=mysecretpassword

# GOOD - Use environment variable
spring.datasource.password=\${DB_PASSWORD}
\`\`\`

**Mistake 3: Not Using Profiles**
\`\`\`properties
# BAD - Same config for all environments
spring.datasource.url=jdbc:mysql://localhost:3306/mydb

# GOOD - Profile-specific
# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/devdb

# application-prod.properties  
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
\`\`\`

---

## Key Takeaways

1. Use \`application.properties\` or \`application.yml\` for most configurations
2. Use profiles for environment-specific settings
3. Use environment variables for sensitive data
4. Use @ConfigurationProperties for complex configurations
5. Never commit passwords or secrets to version control

Configuration is powerful. Use it wisely.

**Next Steps:**
- Set up your first project with [Spring Boot Project Setup](/tutorial/spring-boot-project-setup)
- Learn to send emails with [Spring Boot SMTP](/tutorial/spring-boot-smtp) (uses configuration)
- Deploy your application with [Spring Boot Deployment](/tutorial/spring-boot-deployment) (uses profiles)
- Monitor your app with [Spring Boot Actuator](/tutorial/spring-boot-actuator) (uses configuration)
`,
  code: `// Spring Boot Configuration Examples

// 1. Using @Value annotation
package com.example.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig {
    
    @Value("\${spring.datasource.url}")
    private String dbUrl;
    
    @Value("\${spring.datasource.username}")
    private String dbUsername;
    
    @Value("\${app.name:Default App Name}")
    private String appName;
    
    public void printConfig() {
        System.out.println("Database URL: " + dbUrl);
        System.out.println("Database Username: " + dbUsername);
        System.out.println("App Name: " + appName);
    }
}

// 2. Using @ConfigurationProperties
package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
    private Api api = new Api();
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    
    public Api getApi() { return api; }
    public void setApi(Api api) { this.api = api; }
    
    public static class Api {
        private String baseUrl;
        private int timeout;
        
        public String getBaseUrl() { return baseUrl; }
        public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
        
        public int getTimeout() { return timeout; }
        public void setTimeout(int timeout) { this.timeout = timeout; }
    }
}

// 3. Using Environment
package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig {
    
    @Autowired
    private Environment env;
    
    public String getProperty(String key) {
        return env.getProperty(key);
    }
    
    public String getProperty(String key, String defaultValue) {
        return env.getProperty(key, defaultValue);
    }
}

// application.properties example:
/*
server.port=8080
spring.application.name=my-app

app.name=My Application
app.version=1.0.0
app.api.base-url=/api/v1
app.api.timeout=5000

spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=\\$\\{DB_PASSWORD:password\\}
*/
`,
  practiceQuestions: [
    {
      question: 'Create a configuration class that reads custom properties for email settings (host, port, username) from application.properties',
      hint: 'Use @ConfigurationProperties with prefix="email", create a class with host, port, username fields and their getters/setters',
      starterCode: `package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "email")
public class EmailConfig {
    // TODO: Add host, port, username fields
    // TODO: Add getters and setters
    
    // In application.properties add:
    // email.host=smtp.gmail.com
    // email.port=587
    // email.username=your-email@gmail.com
}
`
    }
  ]
};

export default springBootConfiguration;

