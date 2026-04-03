const mavenMultiModule = {
  id: 'maven-multi-module',
  title: 'Multi-Module Project',
  description: 'Learn how to create and manage multi-module Maven projects',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Multi-Module Project

A **multi-module project** is a Maven project that contains multiple sub-projects (modules). This is useful for large applications, microservices, or when you want to organize code into separate modules.

## Why Multi-Module Projects?

### Benefits

1. **Code Organization**
   - Separate concerns into different modules
   - Clear boundaries between components
   - Easier to navigate large codebases

2. **Reusability**
   - Share code between modules
   - Common utilities in one module
   - Other modules depend on it

3. **Build Efficiency**
   - Build only changed modules
   - Parallel builds possible
   - Faster development cycle

4. **Dependency Management**
   - Centralized dependency versions
   - Consistent across modules
   - Easier updates

5. **Deployment Flexibility**
   - Deploy modules independently
   - Different versions per module
   - Microservices architecture

## Project Structure

A multi-module project looks like this:

\`\`\`
parent-project
 ┣ module1
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┣ module2
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┣ module3
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┗ pom.xml  (Parent POM)
\`\`\`

## Parent POM

The parent POM is the root pom.xml. It defines the modules and common configuration.

### Basic Parent POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>  <!-- Important: packaging is pom -->

    <name>Parent Project</name>
    <description>Multi-module project parent</description>

    <modules>
        <module>module1</module>
        <module>module2</module>
        <module>module3</module>
    </modules>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
\`\`\`

**Key points:**
- **packaging** is \`pom\` (not jar or war)
- **modules** section lists all sub-modules
- Common properties defined here

## Child Module POM

Each module has its own pom.xml that references the parent.

### Basic Child POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>module1</artifactId>
    <!-- groupId and version inherited from parent -->
    <packaging>jar</packaging>

    <name>Module 1</name>
</project>
\`\`\`

**Key points:**
- **parent** section references parent POM
- **artifactId** is required (defines module name)
- **groupId** and **version** inherited from parent
- **packaging** can be jar, war, etc.

## Real-World Example

Let's create a multi-module e-commerce application:

### Structure

\`\`\`
ecommerce-app
 ┣ api-module
 ┃ ┣ src/main/java/com/example/api
 ┃ ┗ pom.xml
 ┣ service-module
 ┃ ┣ src/main/java/com/example/service
 ┃ ┗ pom.xml
 ┣ web-module
 ┃ ┣ src/main/java/com/example/web
 ┃ ┗ pom.xml
 ┗ pom.xml
\`\`\`

### Parent POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>ecommerce-app</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>api-module</module>
        <module>service-module</module>
        <module>web-module</module>
    </modules>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <spring.version>5.3.30</spring.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>\${spring.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
\`\`\`

### API Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>api-module</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Version from dependencyManagement -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
    </dependencies>
</project>
\`\`\`

### Service Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>service-module</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Depends on api-module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>api-module</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

### Web Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>web-module</artifactId>
    <packaging>war</packaging>

    <dependencies>
        <!-- Depends on service-module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>service-module</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

## Module Dependencies

Modules can depend on each other:

**Example:**
- \`web-module\` depends on \`service-module\`
- \`service-module\` depends on \`api-module\`

**Dependency chain:**
\`\`\`
web-module → service-module → api-module
\`\`\`

Maven builds modules in the correct order automatically.

## Building Multi-Module Projects

### Build All Modules

From parent directory:

\`\`\`bash
mvn clean install
\`\`\`

This:
1. Builds all modules in dependency order
2. Installs each module to local repository
3. Makes modules available to dependent modules

### Build Specific Module

\`\`\`bash
cd module1
mvn clean install
\`\`\`

Or from parent:

\`\`\`bash
mvn clean install -pl module1
\`\`\`

**-pl** = project list (specify which modules to build)

### Build Module and Dependencies

\`\`\`bash
mvn clean install -pl module1 -am
\`\`\`

**-am** = also make (build dependencies too)

## Dependency Management

Use \`<dependencyManagement>\` in parent POM:

\`\`\`xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.30</version>
        </dependency>
    </dependencies>
</dependencyManagement>
\`\`\`

Child modules can use dependencies without specifying version:

\`\`\`xml
<dependencies>
    <!-- Version from parent dependencyManagement -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
    </dependency>
</dependencies>
\`\`\`

## Plugin Management

Similarly, use \`<pluginManagement>\` in parent:

\`\`\`xml
<pluginManagement>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
        </plugin>
    </plugins>
</pluginManagement>
\`\`\`

Child modules inherit plugin configuration.

## Common Patterns

### Pattern 1: Layered Architecture

\`\`\`
app
 ┣ domain (entities)
 ┣ service (business logic)
 ┣ repository (data access)
 ┗ web (controllers)
\`\`\`

### Pattern 2: Microservices

\`\`\`
services
 ┣ user-service
 ┣ order-service
 ┣ payment-service
 ┗ common (shared code)
\`\`\`

### Pattern 3: Library + Application

\`\`\`
project
 ┣ core-library
 ┗ application (uses core-library)
\`\`\`

## Best Practices

1. **Use dependencyManagement**
   - Centralized version control
   - Consistent dependencies

2. **Use pluginManagement**
   - Consistent build configuration
   - Easier maintenance

3. **Clear module boundaries**
   - Each module has a clear purpose
   - Minimize dependencies between modules

4. **Build from parent**
   - Always build from parent directory
   - Ensures correct build order

5. **Version management**
   - Use properties for versions
   - Update in one place

## Common Mistakes

### Mistake 1: Wrong Packaging in Parent

**Wrong:**
\`\`\`xml
<packaging>jar</packaging>  <!-- In parent POM -->
\`\`\`

**Correct:**
\`\`\`xml
<packaging>pom</packaging>  <!-- In parent POM -->
\`\`\`

### Mistake 2: Circular Dependencies

**Wrong:**
- Module A depends on Module B
- Module B depends on Module A

**Solution:** Refactor to remove circular dependency.

### Mistake 3: Building from Wrong Directory

**Wrong:**
\`\`\`bash
cd module1
mvn clean install  # Might miss dependencies
\`\`\`

**Correct:**
\`\`\`bash
cd parent-project
mvn clean install  # Builds all modules
\`\`\`

## Summary

Multi-module projects:
- Organize large codebases
- Enable code reuse
- Centralize dependency management
- Improve build efficiency

Key concepts:
- **Parent POM** - \`packaging\` is \`pom\`, defines modules
- **Child POM** - References parent, inherits configuration
- **Module dependencies** - Modules can depend on each other
- **Dependency management** - Centralized in parent POM

Use cases:
- Large applications
- Microservices
- Shared libraries
- Layered architectures

Next, let's learn about Maven with Spring Boot!

---

## 10 Important Maven Multi-Module Interview Questions

1. **What is an aggregator POM?**  
   A root \`pom.xml\` with **packaging \`pom\`** and a **\`<modules>\`** list (each entry = subfolder name). It **doesn’t compile Java itself**—it **orchestrates** child projects.  
   **\`mvn install\`** from root walks the **reactor** (all modules) in the **right order** so dependencies between modules resolve.

2. **Why use multi-module projects?**  
   Split **API** JAR, **implementation**, **web** layer, **shared** utilities—**clear boundaries** and **reuse**. One **\`mvn verify\`** at root tests **everything** together.  
   **Parent POM** holds **dependencyManagement** so **all** modules use the **same** Spring/Jackson versions.

3. **What is a parent POM?**  
   Child modules include **\`<parent>\`** pointing to the **corporate** or **framework** parent (e.g. \`spring-boot-starter-parent\`). They **inherit** **properties**, **pluginManagement**, **dependencyManagement**.  
   You avoid **copy-pasting** the same 200 lines into every module.

4. **How do modules depend on each other?**  
   Treat sibling modules like **any** Maven dependency: **\`<dependency>\`** with **groupId**, **artifactId**, **version**. For internal artifacts, version is often **\`\${project.version}\`** so **all** modules share one **release** version.  
   Maven builds **dependency module** before **consumer module** automatically.

5. **What is \`relativePath\` in \`<parent>\`?**  
   By default Maven looks **one level up** (\`../pom.xml\`) for the parent **file**. If parent is **only** in a **repository** (not on disk next to you), use **\`<relativePath/>\`** empty to **skip** local lookup.

6. **What does \`mvn -pl module -am\` do?**  
   **\`-pl\`** = **project list** (which module(s) to build). **\`-am\`** = **also make** dependencies—build **this** module **and** any modules it **depends on** that are part of the reactor.  
   **Use case:** Quick rebuild of **service-api** + its **service-core** dependency.

7. **What is \`-amd\`?**  
   **Also make dependents**—build the selected module **and** everything that **depends on** it. Useful when you change a **shared** library and want to **recompile all consumers**.

8. **How do you version internal modules together?**  
   Use one **\`\${revision}\`** property (e.g. \`1.4.0\`) in parent so **every** module gets the **same** version string. **flatten-maven-plugin** can **rewrite** POMs for publishing so consumers see a **literal** version.  
   **Avoid** each module hardcoding **different** patch versions.

9. **Circular dependency between modules?**  
   If **A** depends on **B** and **B** depends on **A**, Maven **cannot** compile—**no valid order**.  
   **Fix:** Extract **shared interfaces** to a **third** module **C** that both **A** and **B** depend on, or merge modules.

10. **Why might you use \`dependencyManagement\` only in parent?**  
    Children list **dependencies** **without** **\`<version>\`** tags—versions come **only** from parent’s **dependencyManagement**. When you **upgrade Spring**, you edit **one** parent POM, not **ten** child POMs.

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
| **Hibernate** | [Hibernate Introduction](/tutorial/hibernate-introduction) |
| **Spring Framework** | [Spring Introduction](/tutorial/spring-introduction) |
| **Spring Boot** | [Spring Boot Introduction](/tutorial/spring-boot-introduction) |
| **Spring Cloud** | [Spring Cloud & Microservices](/tutorial/spring-cloud-microservices) |
| **HTTP & HTTPS** | [HTTP Introduction](/tutorial/http-introduction) · [HTTPS Security](/tutorial/https-security) |
| **APIs** | [API Introduction](/tutorial/api-introduction) · [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

`
};

export default mavenMultiModule;

