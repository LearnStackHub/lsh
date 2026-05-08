const mavenSpringBoot = {
  id: 'maven-spring-boot',
  title: 'Maven with Spring Boot',
  description: 'Learn how to use Maven with Spring Boot applications',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven with Spring Boot

Spring Boot is a popular Java framework that makes it easy to create production-ready applications. It works seamlessly with Maven, and understanding their integration is essential for modern Java development.

## What is Spring Boot?

Spring Boot is built on top of the Spring Framework. It provides:
- Auto-configuration (less configuration needed)
- Embedded servers (Tomcat, Jetty)
- Production-ready features (metrics, health checks)
- Opinionated defaults (convention over configuration)

## Spring Boot + Maven

Spring Boot uses Maven heavily. When you create a Spring Boot project, you get:
- A pom.xml with Spring Boot parent
- Spring Boot Maven plugin
- Starter dependencies
- Auto-configuration

## Creating Spring Boot Project with Maven

### Method 1: Spring Initializr

1. Go to https://start.spring.io/
2. Select:
   - **Project**: Maven
   - **Language**: Java
   - **Spring Boot**: Latest version
   - **Group**: com.example
   - **Artifact**: my-app
3. Add dependencies (Web, JPA, etc.)
4. Click "Generate"
5. Download and extract
6. Import into IDE

### Method 2: Maven Archetype

\`\`\`bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-app \
  -DarchetypeArtifactId=spring-boot-archetype \
  -DinteractiveMode=false
\`\`\`

### Method 3: Manual Setup

Create pom.xml manually (we'll see this next).

## Spring Boot Parent POM

Spring Boot projects use a parent POM:

\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>
\`\`\`

**What it provides:**
- Default Java version
- Dependency management (versions for Spring and related libraries)
- Plugin management
- Resource filtering
- Properties defaults

**Benefits:**
- No need to specify versions for Spring dependencies
- Consistent versions across Spring ecosystem
- Less configuration

## Spring Boot Starter Dependencies

Spring Boot provides "starter" dependencies that include everything you need:

### spring-boot-starter-web

For web applications:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`

**Includes:**
- Spring MVC
- Embedded Tomcat
- Jackson (JSON support)
- Validation
- And more...

### spring-boot-starter-data-jpa

For database access:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
\`\`\`

**Includes:**
- Spring Data JPA
- Hibernate
- Database drivers

### spring-boot-starter-test

For testing:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`

**Includes:**
- JUnit
- Mockito
- AssertJ
- Spring Test

## Complete Spring Boot pom.xml

Here's a complete example:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>my-spring-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>My Spring Boot Application</name>
    <description>Spring Boot application with Maven</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- JPA Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>

        <!-- Test Starter -->
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

**Notice:**
- No versions for Spring dependencies (from parent)
- No version for Spring Boot plugin (from parent)
- Simple and clean

## Spring Boot Maven Plugin

The Spring Boot Maven plugin is essential:

\`\`\`xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
\`\`\`

**What it does:**
- Packages application as executable JAR
- Includes all dependencies (fat JAR)
- Can run application directly
- Repackages existing JARs

## Running Spring Boot Applications

### Method 1: Maven Command

\`\`\`bash
mvn spring-boot:run
\`\`\`

Runs the application directly. No need to build JAR first.

### Method 2: Run JAR

\`\`\`bash
# Build
mvn clean package

# Run
java -jar target/my-spring-app-1.0.0.jar
\`\`\`

The JAR is executable and includes everything.

### Method 3: IDE

Run the main class directly from IDE (IntelliJ, Eclipse, etc.).

## Project Structure

Spring Boot follows Maven standard structure:

\`\`\`
my-spring-app
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┣ MySpringAppApplication.java  (Main class)
 ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserController.java
 ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserService.java
 ┃ ┃ ┃ ┃ ┃ ┗ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserRepository.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┣ application.properties
 ┃ ┃ ┃ ┗ application.yml
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ MySpringAppApplicationTests.java
 ┃ ┃ ┗ resources
 ┣ pom.xml
 ┗ target
\`\`\`

## Configuration Files

Spring Boot uses \`application.properties\` or \`application.yml\`:

**application.properties:**
\`\`\`properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
\`\`\`

**application.yml:**
\`\`\`yaml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
\`\`\`

## Building for Production

### Create Executable JAR

\`\`\`bash
mvn clean package
\`\`\`

Creates: \`target/my-spring-app-1.0.0.jar\`

### Run Production JAR

\`\`\`bash
java -jar target/my-spring-app-1.0.0.jar
\`\`\`

### Create WAR (for deployment to external server)

Change packaging in pom.xml:

\`\`\`xml
<packaging>war</packaging>
\`\`\`

Then:

\`\`\`bash
mvn clean package
\`\`\`

Creates: \`target/my-spring-app-1.0.0.war\`

## Profiles

Spring Boot supports profiles for different environments:

**application-dev.properties:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
\`\`\`

**application-prod.properties:**
\`\`\`properties
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
\`\`\`

**Run with profile:**
\`\`\`bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
\`\`\`

Or:

\`\`\`bash
java -jar app.jar --spring.profiles.active=prod
\`\`\`

## Common Maven Commands for Spring Boot

\`\`\`bash
# Run application
mvn spring-boot:run

# Build executable JAR
mvn clean package

# Run tests
mvn test

# Build and skip tests
mvn clean package -DskipTests

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
\`\`\`

## Best Practices

1. **Use Spring Boot parent**
   - Inherits dependency management
   - Less configuration

2. **Use starter dependencies**
   - Include everything you need
   - Consistent versions

3. **Use Spring Boot plugin**
   - Creates executable JARs
   - Easy deployment

4. **Externalize configuration**
   - Use \`application.properties\` or \`application.yml\`
   - Use profiles for different environments

5. **Keep dependencies updated**
   - Spring Boot releases regularly
   - Update for security and features

## Common Issues

### Issue 1: Port Already in Use

**Error:** Port 8080 already in use

**Solution:**
\`\`\`properties
server.port=8081
\`\`\`

### Issue 2: Main Class Not Found

**Error:** Main class not found

**Solution:** Specify main class in plugin:
\`\`\`xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <mainClass>com.example.MySpringAppApplication</mainClass>
    </configuration>
</plugin>
\`\`\`

### Issue 3: Dependencies Not Resolved

**Error:** Could not resolve dependencies

**Solution:**
- Check Spring Boot version compatibility
- Verify repository access
- Clear local repository: \`rm -rf ~/.m2/repository\`

## Summary

Spring Boot + Maven:
- **Parent POM** - Inherits Spring Boot configuration
- **Starter dependencies** - Include everything needed
- **Spring Boot plugin** - Creates executable JARs
- **Auto-configuration** - Less configuration needed

Key benefits:
- Fast development
- Production-ready
- Embedded server
- Easy deployment

Spring Boot makes Maven even more powerful by providing:
- Opinionated defaults
- Starter dependencies
- Auto-configuration
- Production features

Next, let's learn about useful Maven commands!

---

## 10 Important Maven + Spring Boot Interview Questions

1. **What does \`spring-boot-starter-parent\` provide?**  
   It is a **parent POM** you put in **\`<parent>\`**. It pre-defines **compatible versions** for hundreds of libraries (Spring, Tomcat, Jackson, etc.), default **plugin** versions, **UTF-8** encoding, and **Java** properties.  
   **Result:** In your \`pom.xml\` you add **\`spring-boot-starter-web\`** **without** a version—parent already **knows** a safe version.

2. **What is a Spring Boot “starter” dependency?**  
   A **starter** is a **bundle** of dependencies for one **feature**. Example: **\`spring-boot-starter-web\`** pulls **Spring MVC**, **embedded Tomcat**, **Jackson** for JSON, **logging** bridges—**pre-tested together**.  
   **Fresher analogy:** A “meal combo” instead of ordering each side dish separately.

3. **What does \`spring-boot-maven-plugin\` do?**  
   - **repackage:** After \`jar:jar\`, **repackages** into a **fat/executable JAR** (dependencies nested + **Main-Class** loader).  
   - **run:** Runs your app with **\`mvn spring-boot:run\`** using **dev** classpath (good for local dev).  
   - Optional **build-info** for **Actuator** (/info endpoint).

4. **Why might \`mvn spring-boot:run\` differ from \`java -jar\`?**  
   **\`spring-boot:run\`** uses Maven’s **runtime classpath** (can pick **test** resources if configured, **devtools** on classpath). **\`java -jar\`** runs the **packaged** fat JAR—closest to **production**.  
   Always **verify** with **packaged JAR** before release.

5. **How do you skip repackaging for a library module?**  
   In a **multi-module** project, **shared** JAR modules often should **not** be fat JARs—only the **final** app module needs **repackage**. Set **\`<skip>true</skip>\`** on **spring-boot-maven-plugin** in library POMs or omit the plugin there.

6. **What is \`spring-boot.version\` property?**  
   Often set in **parent** or **imported BOM** so **all** Boot pieces use the **same** x.y.z. If you **change** Boot version, **update** parent/BOM **once**—don’t mix random Boot **2.x** and **3.x** artifacts.

7. **How does Spring Boot relate to \`maven-compiler-plugin\`?**  
   Parent sets **\`java.version\`** / **compiler plugin** **release** so bytecode matches **supported JDK** for that Boot line (e.g. Boot 3 needs **Java 17+**).  
   Mismatch = **“release version not supported”** or runtime errors.

8. **What is \`spring-boot-starter-test\` scope?**  
   Declared with **\`<scope>test</scope>\`**: JUnit 5, Mockito, AssertJ, Spring Test **only for tests**—**not** inside the production fat JAR.

9. **Why “Could not find spring-boot-starter-parent”?**  
   **Typo** in **groupId**/**artifactId**/**version**, **no internet**, or **corporate** mirror **blocking** Maven Central. **Spring** artifacts are on Central—ensure **settings.xml** allows access.  
   **Offline:** \`~/.m2\` might be missing the parent—run **online** once.

10. **What is \`spring-boot.build-info\` goal?**  
    Optional execution that writes **build-info.properties** (time, version, git if configured) into the JAR for **Actuator** \`/actuator/info\`. Helps **ops** see **what** was deployed.

---

## Full-stack Java tutorials — quick links

Continue learning the full Java stack alongside Maven.

| Topic | Tutorial link |
|-------|----------------|
| **Core Java** | [Java Introduction](/tutorial/java-introduction) |
| **HTML** | [HTML Introduction](/tutorial/html-introduction) |
| **CSS** | [CSS Introduction](/tutorial/css-introduction) |
| **MySQL** | [MySQL Introduction](/tutorial/mysql-introduction) |
| **JDBC** | [JDBC Introduction](/tutorial/jdbc-introduction) |
| **Servlets** | [Servlet Introduction](/tutorial/servlet-introduction) |
| **JSP** | [JSP Introduction](/tutorial/jsp-introduction) |
| **Hibernate** | [Hibernate Introduction](/hibernate/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

`
};

export default mavenSpringBoot;

