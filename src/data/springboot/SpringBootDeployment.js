const springBootDeployment = {
  id: 'spring-boot-deployment',
  title: 'Spring Boot Deployment - Deploy to Production',
  description: 'Learn how to deploy Spring Boot applications - build JAR/WAR files, deploy to cloud platforms, and production best practices',
  content: `
# Spring Boot Deployment - Deploy to Production

Building an application is only half the work. You need to deploy it so users can access it. Spring Boot makes deployment easy with embedded servers and simple packaging.

Let me show you how to deploy your Spring Boot application to production.

---

## Building Your Application

### Step 1: Build JAR File

Spring Boot creates a "fat JAR" - a single file containing your application and all dependencies.

\`\`\`bash
# Using Maven
mvn clean package

# Output: target/my-app-1.0.0.jar
\`\`\`

### Step 2: Run JAR File

\`\`\`bash
java -jar target/my-app-1.0.0.jar
\`\`\`

That's it! Your application is running. No server installation needed.

---

## Production Configuration

### application-prod.properties

\`\`\`properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://prod-db-server:3306/proddb
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logging
logging.level.root=WARN
logging.level.com.example=INFO
logging.file.name=/var/log/myapp/application.log

# Security
spring.security.user.name=\${ADMIN_USERNAME}
spring.security.user.password=\${ADMIN_PASSWORD}
\`\`\`

### Run with Production Profile

\`\`\`bash
java -jar my-app.jar --spring.profiles.active=prod
\`\`\`

---

## Deployment Options

### Option 1: Traditional Server (VPS/Dedicated)

**Steps:**
1. Upload JAR file to server
2. Install Java on server
3. Run the JAR file
4. Set up reverse proxy (Nginx/Apache)
5. Configure firewall

**Example:**
\`\`\`bash
# On server
scp my-app.jar user@server:/opt/myapp/
ssh user@server
cd /opt/myapp
java -jar my-app.jar --spring.profiles.active=prod
\`\`\`

**Using systemd (Linux):**
\`\`\`ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Spring Boot Application
After=network.target

[Service]
Type=simple
User=myapp
ExecStart=/usr/bin/java -jar /opt/myapp/my-app.jar
Restart=always

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
# Enable and start
sudo systemctl enable myapp
sudo systemctl start myapp
\`\`\`

---

### Option 2: Cloud Platforms

#### Heroku

**Steps:**
1. Create \`Procfile\`:
\`\`\`
web: java -jar target/my-app.jar
\`\`\`

2. Deploy:
\`\`\`bash
heroku create my-app
git push heroku main
\`\`\`

#### AWS Elastic Beanstalk

**Steps:**
1. Install EB CLI
2. Initialize:
\`\`\`bash
eb init
eb create my-app-env
eb deploy
\`\`\`

#### Google Cloud Platform

**Steps:**
1. Build container image
2. Push to Container Registry
3. Deploy to Cloud Run

---

### Option 3: Docker

**Dockerfile:**
\`\`\`dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/my-app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

**Build and Run:**
\`\`\`bash
# Build image
docker build -t my-app .

# Run container
docker run -p 8080:8080 my-app

# With environment variables
docker run -p 8080:8080 \\
  -e SPRING_PROFILES_ACTIVE=prod \\
  -e DB_PASSWORD=secret \\
  my-app
\`\`\`

---

## Production Best Practices

### 1. Use Environment Variables for Secrets

Never hardcode passwords or API keys.

\`\`\`properties
# application.properties
spring.datasource.password=\${DB_PASSWORD}
\`\`\`

Set environment variable:
\`\`\`bash
export DB_PASSWORD=mysecretpassword
\`\`\`

### 2. Enable Health Checks

Add Spring Boot Actuator:
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

\`\`\`properties
management.endpoints.web.exposure.include=health,info
\`\`\`

### 3. Configure Logging

\`\`\`properties
logging.level.root=INFO
logging.file.name=/var/log/myapp/application.log
logging.file.max-size=10MB
logging.file.max-history=30
\`\`\`

### 4. Set JVM Options

\`\`\`bash
java -Xms512m -Xmx1024m \\
     -XX:+UseG1GC \\
     -jar my-app.jar
\`\`\`

### 5. Use Reverse Proxy

**Nginx Configuration:**
\`\`\`nginx
server {
    listen 80;
    server_name myapp.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

---

## Monitoring and Maintenance

### Health Check Endpoint

\`\`\`bash
curl http://localhost:8080/actuator/health
\`\`\`

### View Logs

\`\`\`bash
# Real-time logs
tail -f /var/log/myapp/application.log

# Search logs
grep "ERROR" /var/log/myapp/application.log
\`\`\`

### Restart Application

\`\`\`bash
# If using systemd
sudo systemctl restart myapp

# If running directly
# Stop: Ctrl+C or kill process
# Start: java -jar my-app.jar
\`\`\`

---

## Common Deployment Issues

### Issue 1: Port Already in Use

**Solution:**
\`\`\`bash
# Find process using port
lsof -i :8080

# Kill process or change port
server.port=9090
\`\`\`

### Issue 2: Out of Memory

**Solution:**
\`\`\`bash
java -Xmx2048m -jar my-app.jar
\`\`\`

### Issue 3: Database Connection Failed

**Solution:**
- Check database is running
- Verify connection string
- Check firewall rules
- Test connection manually

---

## Key Takeaways

1. Build JAR file with \`mvn clean package\`
2. Run with \`java -jar app.jar\`
3. Use profiles for different environments
4. Store secrets in environment variables
5. Use Docker for containerization
6. Monitor with health checks and logs

Deployment is the final step. Make it smooth and reliable.

**Related Topics:**
- Learn configuration with [Spring Boot Configuration](/springboot/spring-boot-configuration) (uses profiles)
- Monitor your deployed app with [Spring Boot Actuator](/springboot/spring-boot-actuator)
- Set up your project with [Spring Boot Project Setup](/springboot/spring-boot-project-setup)
- Secure your deployment with [Spring Boot Security](/springboot/spring-boot-security)
`,
  code: `// Deployment Configuration Examples

// 1. application-prod.properties
/*
server.port=8080
spring.profiles.active=prod

spring.datasource.url=jdbc:mysql://prod-db:3306/proddb
spring.datasource.username=\\$\\{DB_USERNAME\\}
spring.datasource.password=\\$\\{DB_PASSWORD\\}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

logging.level.root=WARN
logging.level.com.example=INFO
logging.file.name=/var/log/myapp/application.log
*/

// 2. Dockerfile
/*
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/my-app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
*/

// 3. Build and Deploy Commands
/*
# Build JAR
mvn clean package

# Run locally
java -jar target/my-app.jar

# Run with production profile
java -jar target/my-app.jar --spring.profiles.active=prod

# Run with environment variables
export DB_PASSWORD=secret
java -jar target/my-app.jar

# Docker build
docker build -t my-app .

# Docker run
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod my-app
*/

// 4. systemd Service File
/*
[Unit]
Description=My Spring Boot Application
After=network.target

[Service]
Type=simple
User=myapp
ExecStart=/usr/bin/java -jar /opt/myapp/my-app.jar
Restart=always
Environment="SPRING_PROFILES_ACTIVE=prod"

[Install]
WantedBy=multi-user.target
*/
`,
  practiceQuestions: [
    {
      question: 'Create a Dockerfile for your Spring Boot application that uses Java 17, copies the JAR file, exposes port 8080, and runs the application',
      hint: 'Use FROM openjdk:17-jdk-slim, COPY target/*.jar app.jar, EXPOSE 8080, ENTRYPOINT java -jar',
      starterCode: `# Dockerfile
# TODO: Create Dockerfile for Spring Boot application
# Use openjdk:17-jdk-slim as base image
# Copy JAR file to /app
# Expose port 8080
# Set entrypoint to run the JAR
`
    }
  ]
};

export default springBootDeployment;

