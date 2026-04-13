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
   **Short Answer:** It is the root project file that lists modules and coordinates reactor builds.  
   **Detailed Explanation:** An aggregator project exists mainly to orchestrate module builds as one unit. It usually has pom packaging and contains a modules section listing child projects. When you run Maven from this root, Maven calculates build order based on module dependencies and compiles in the correct sequence. This avoids manual coordination and reduces build errors in larger codebases. Interviewers often check whether you understand that aggregator behavior is about orchestration, not code packaging. In enterprise projects, using an aggregator POM improves consistency, supports one-command builds, and simplifies CI pipelines because all related modules are handled through a single parent entry point.

2. **Why use multi-module projects?**  
   **Short Answer:** Multi-module setup improves organization, reuse, and centralized dependency and build management.  
   **Detailed Explanation:** Multi-module design helps teams separate concerns into clear modules such as API, service, web, and shared utilities. This structure improves code ownership and makes large systems easier to understand. It also supports reuse because common logic can be placed in one module and consumed by many others. Another major benefit is centralized version management through a parent configuration, reducing dependency drift across teams. Interviewers value this because real-world systems rarely stay as single modules for long. A clear module strategy improves scalability, testability, deployment flexibility, and team collaboration, especially in long-term enterprise projects with frequent releases.

3. **What is a parent POM?**  
   **Short Answer:** A parent project provides shared configuration that child modules inherit automatically.  
   **Detailed Explanation:** A parent configuration defines common values such as Java version, plugin setup, dependency versions, repository settings, and build conventions. Child modules reference this parent so they inherit these settings without repeating them in every project file. This greatly reduces duplication and keeps build behavior consistent across modules. When versions or plugins need updates, teams can change one place instead of many files. Interviewers ask this to test maintainability thinking. A strong answer explains inheritance benefits, reduced copy paste risk, and faster upgrades. Parent POM usage is a foundational practice for scalable Maven architecture in multi-team environments.

4. **How do modules depend on each other?**  
   **Short Answer:** Modules declare standard Maven dependencies using coordinates, and reactor builds resolve order automatically.  
   **Detailed Explanation:** Inter-module dependency works exactly like external dependency declaration using group, artifact, and version coordinates. When modules are part of the same reactor build, Maven resolves and builds dependency modules before consumers, ensuring class availability during compile and test phases. Teams often align internal versions to a common parent-driven value to avoid mismatch. Interviewers expect you to mention both declaration and build ordering behavior. A good response also highlights avoiding unnecessary coupling between modules and keeping dependency directions clean. Proper module dependency design improves incremental builds, troubleshooting clarity, and long-term architecture stability.

5. **What is \`relativePath\` in \`<parent>\`?**  
   **Short Answer:** It tells Maven where to locate the parent file locally before repository resolution.  
   **Detailed Explanation:** Parent lookup typically checks a default local path first, often one directory up. The relative path element lets you override or disable this behavior. If your parent lives in a repository and should not be resolved from local disk, you can set an empty relative path to force repository-based resolution. Interviewers use this to test practical troubleshooting knowledge because wrong parent resolution causes build confusion, especially in CI or imported workspaces. Understanding this field helps when structuring enterprise repositories, sharing parent configurations across projects, and avoiding accidental linkage to stale local parent files during development.

6. **What does \`mvn -pl module -am\` do?**  
   **Short Answer:** It builds selected modules and also builds required upstream dependencies in the reactor.  
   **Detailed Explanation:** The project list option limits build scope to chosen modules, which speeds up development cycles. Adding also make tells Maven to include any modules those selected targets depend on, ensuring compilation does not fail due to missing upstream artifacts. This is very useful for focused local development when full project builds are too slow. Interviewers ask this because selective build commands are important in large modular systems. A strong answer shows understanding of build optimization and dependency-aware execution. Knowing this command helps developers reduce wait time while still producing correct local builds and reliable validation before commits.

7. **What is \`-amd\`?**  
   **Short Answer:** It builds selected modules and their downstream dependents that rely on them.  
   **Detailed Explanation:** Also make dependents is the inverse of also make. Instead of adding dependencies your module needs, it adds modules that need your module. This is useful after changing shared contracts or utility APIs because dependent modules should be rebuilt and tested for compatibility. Interviewers often expect awareness of this command in enterprise-scale repositories where many modules are connected. It supports efficient impact analysis during refactoring and reduces risk of late integration failures. Mentioning this option demonstrates practical Maven proficiency and shows you can run targeted yet safe build verification after modifying shared components.

8. **How do you version internal modules together?**  
   **Short Answer:** Use centralized version properties in parent configuration so all internal modules stay aligned.  
   **Detailed Explanation:** Keeping internal modules on a coordinated version strategy avoids dependency mismatch and release confusion. A common approach is defining one shared version value in the parent and referencing it across child modules. This ensures all artifacts from one release are compatible by design. In more advanced pipelines, publishing plugins can convert dynamic properties to explicit versions for repository consumers. Interviewers ask this to evaluate release management awareness, not just local build knowledge. A good answer emphasizes consistency, simpler upgrades, and predictable rollback behavior. Unified versioning is critical for stable multi-module release engineering and clean dependency graphs.

9. **Circular dependency between modules?**  
   **Short Answer:** Circular dependencies break build order and must be removed through refactoring.  
   **Detailed Explanation:** Maven requires a directed dependency graph to determine compile order. If module A depends on B and B depends on A, there is no valid sequence, so builds fail. This usually indicates poor boundary design or misplaced shared contracts. The common fix is extracting shared interfaces or models into a third module both can depend on, or rethinking module responsibilities. Interviewers ask this because circular dependency handling reveals architectural thinking. Your answer should show that the problem is not only technical but structural. Clean module direction improves build stability, clearer ownership, and easier long-term system evolution.

10. **Why might you use \`dependencyManagement\` only in parent?**  
    **Short Answer:** It centralizes version control so child modules stay consistent without repeated version declarations.  
    **Detailed Explanation:** Dependency management allows the parent to define approved versions for libraries used across modules. Child modules then declare what they need without repeating version numbers, reducing duplication and drift. When upgrades are required, teams change one location and propagate consistently across the project. This lowers maintenance effort and avoids hidden conflicts caused by accidental version mismatches. Interviewers expect this answer because dependency consistency is a major reliability factor in enterprise Java builds. A strong explanation includes governance benefits: easier audits, predictable upgrades, and cleaner review processes since dependency policy is centralized and visible in one authoritative place.

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

