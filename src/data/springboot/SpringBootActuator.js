const springBootActuator = {
  id: 'spring-boot-actuator',
  title: 'Spring Boot Actuator - Monitoring and Management',
  description: 'Learn how to use Spring Boot Actuator for monitoring application health, metrics, and managing your application in production',
  content: `
# Spring Boot Actuator - Monitoring and Management

Once your application is deployed, you need to monitor it. Is it healthy? How many requests is it handling? What's the memory usage? Spring Boot Actuator provides endpoints to monitor and manage your application.

---

## What is Spring Boot Actuator?

Actuator provides production-ready features:
- Health checks
- Application metrics
- Environment information
- Application info
- And more...

---

## Setting Up Actuator

### Step 1: Add Dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

### Step 2: Configure Endpoints

\`\`\`properties
# Expose all endpoints
management.endpoints.web.exposure.include=*

# Or expose specific endpoints
management.endpoints.web.exposure.include=health,info,metrics

# Change base path
management.endpoints.web.base-path=/actuator
\`\`\`

---

## Available Endpoints

### Health Endpoint

Check if your application is running properly.

\`\`\`bash
curl http://localhost:8080/actuator/health
\`\`\`

**Response:**
\`\`\`json
{
  "status": "UP"
}
\`\`\`

**With Details:**
\`\`\`properties
management.endpoint.health.show-details=always
\`\`\`

\`\`\`json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "MySQL",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 500000000000,
        "free": 100000000000,
        "threshold": 10485760
      }
    }
  }
}
\`\`\`

---

### Info Endpoint

Display application information.

\`\`\`properties
# application.properties
info.app.name=Student Management System
info.app.version=1.0.0
info.app.description=Spring Boot application for managing students
\`\`\`

\`\`\`bash
curl http://localhost:8080/actuator/info
\`\`\`

**Response:**
\`\`\`json
{
  "app": {
    "name": "Student Management System",
    "version": "1.0.0",
    "description": "Spring Boot application for managing students"
  }
}
\`\`\`

---

### Metrics Endpoint

View application metrics.

\`\`\`bash
curl http://localhost:8080/actuator/metrics
\`\`\`

**Response:**
\`\`\`json
{
  "names": [
    "jvm.memory.used",
    "jvm.memory.max",
    "http.server.requests",
    "process.cpu.usage"
  ]
}
\`\`\`

**Get Specific Metric:**
\`\`\`bash
curl http://localhost:8080/actuator/metrics/jvm.memory.used
\`\`\`

**Response:**
\`\`\`json
{
  "name": "jvm.memory.used",
  "measurements": [
    {
      "statistic": "VALUE",
      "value": 512000000
    }
  ]
}
\`\`\`

---

### Environment Endpoint

View application configuration.

\`\`\`bash
curl http://localhost:8080/actuator/env
\`\`\`

Shows all environment variables and properties.

---

## Custom Health Indicators

Create custom health checks for your components.

### Database Health Indicator

\`\`\`java
package com.example.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    
    @Autowired
    private DataSource dataSource;
    
    @Override
    public Health health() {
        try {
            dataSource.getConnection().close();
            return Health.up()
                .withDetail("database", "Available")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("database", "Unavailable")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
\`\`\`

---

## Securing Actuator Endpoints

Actuator endpoints should be secured in production.

### Add Security

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic();
        
        return http.build();
    }
}
\`\`\`

---

## Production Configuration

\`\`\`properties
# Expose only necessary endpoints
management.endpoints.web.exposure.include=health,info,metrics

# Don't expose sensitive endpoints
management.endpoints.web.exposure.exclude=env,configprops

# Change base path
management.endpoints.web.base-path=/management

# Enable health details only for admins
management.endpoint.health.show-details=when-authorized
\`\`\`

---

## Key Takeaways

1. Actuator provides monitoring endpoints
2. Health endpoint checks application status
3. Metrics endpoint shows performance data
4. Secure actuator endpoints in production
5. Use custom health indicators for your components
6. Expose only necessary endpoints

Monitoring helps you keep your application healthy.
`,
  code: `// Spring Boot Actuator Examples

// 1. Custom Health Indicator
package com.example.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        // Check your component
        boolean isHealthy = checkComponent();
        
        if (isHealthy) {
            return Health.up()
                .withDetail("status", "Component is healthy")
                .build();
        } else {
            return Health.down()
                .withDetail("status", "Component is down")
                .build();
        }
    }
    
    private boolean checkComponent() {
        // Your health check logic
        return true;
    }
}

// 2. application.properties Configuration
/*
# Expose endpoints
management.endpoints.web.exposure.include=health,info,metrics

# Health endpoint details
management.endpoint.health.show-details=when-authorized

# Custom info
info.app.name=My Application
info.app.version=1.0.0
*/

// 3. Access Endpoints
/*
# Health check
curl http://localhost:8080/actuator/health

# Application info
curl http://localhost:8080/actuator/info

# Metrics
curl http://localhost:8080/actuator/metrics

# Specific metric
curl http://localhost:8080/actuator/metrics/jvm.memory.used
*/
`,
  practiceQuestions: [
    {
      question: 'Configure Spring Boot Actuator to expose only health and info endpoints, and add custom application info (name and version)',
      hint: 'Use management.endpoints.web.exposure.include in application.properties, add info.app.name and info.app.version',
      starterCode: `# application.properties
# TODO: Configure actuator endpoints
# TODO: Expose only health and info endpoints
# TODO: Add custom application info (name and version)
`
    }
  ]
};

export default springBootActuator;

