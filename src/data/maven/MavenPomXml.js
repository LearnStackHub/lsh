const mavenPomXml = {
  id: 'maven-pom-xml',
  title: 'What is pom.xml?',
  description: 'Learn about the Project Object Model file - the heart of every Maven project',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# What is pom.xml?

**POM** stands for **Project Object Model**. The \`pom.xml\` file is the heart of every Maven project. It's an XML file that contains all the information Maven needs to build your project.

Think of \`pom.xml\` as a recipe for your project - it tells Maven:
- What your project is
- What dependencies it needs
- How to build it
- What plugins to use

## Basic pom.xml Structure

Let's start with a simple example:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>demo-project</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Demo Project</name>
    <description>A simple Maven project</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.30</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

Let me explain each part:

## Essential Elements

### modelVersion

\`\`\`xml
<modelVersion>4.0.0</modelVersion>
\`\`\`

- The version of the POM model itself
- Always \`4.0.0\` for Maven 3.x
- Don't change this

### Group ID, Artifact ID, and Version

These three elements uniquely identify your project:

**groupId**
\`\`\`xml
<groupId>com.example</groupId>
\`\`\`
- Usually your company/organization domain in reverse
- Example: \`com.example\`, \`org.apache\`, \`io.github\`
- Like a package name for your project

**artifactId**
\`\`\`xml
<artifactId>demo-project</artifactId>
\`\`\`
- The name of your project
- Should be lowercase, use hyphens for spaces
- Example: \`demo-project\`, \`user-service\`, \`payment-api\`

**version**
\`\`\`xml
<version>1.0.0</version>
\`\`\`
- The version of your project
- Common formats: \`1.0.0\`, \`1.0-SNAPSHOT\`, \`2.3.4\`
- \`SNAPSHOT\` means it's under development

Together, these form the **coordinates** of your project:
\`groupId:artifactId:version\` = \`com.example:demo-project:1.0.0\`

### packaging

\`\`\`xml
<packaging>jar</packaging>
\`\`\`

- Defines what type of artifact Maven will create
- Common values:
  - \`jar\` - Java Archive (default)
  - \`war\` - Web Archive (for web applications)
  - \`pom\` - Parent POM (for multi-module projects)
  - \`ear\` - Enterprise Archive

### name and description

\`\`\`xml
<name>Demo Project</name>
<description>A simple Maven project</description>
\`\`\`

- Human-readable name and description
- Optional but recommended
- Helps others understand your project

## Properties

\`\`\`xml
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
\`\`\`

Properties define reusable values:
- **maven.compiler.source** - Java version for compilation
- **maven.compiler.target** - Java version for the compiled code
- **project.build.sourceEncoding** - Character encoding

You can define custom properties too:
\`\`\`xml
<properties>
    <spring.version>5.3.30</spring.version>
    <junit.version>5.9.2</junit.version>
</properties>
\`

Then use them like: \`\${spring.version}\`

## Dependencies

This is where you declare external libraries your project needs:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.30</version>
    </dependency>
</dependencies>
\`\`\`

Each dependency needs:
- **groupId** - The organization that created the library
- **artifactId** - The library name
- **version** - The version you want to use

Maven automatically:
- Downloads the library
- Downloads its dependencies (transitive dependencies)
- Adds them to your classpath

### Dependency Scope

You can specify when a dependency is needed:

\`\`\`xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
\`\`\`

Common scopes:
- **compile** - Default, needed for compilation and runtime
- **test** - Only needed for testing (not included in final JAR)
- **provided** - Provided by the runtime environment (like servlet-api)
- **runtime** - Needed at runtime but not for compilation

## Build Configuration

\`\`\`xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
            </configuration>
        </plugin>
    </plugins>
</build>
\`\`\`

Plugins extend Maven's functionality:
- **maven-compiler-plugin** - Compiles Java code
- **maven-surefire-plugin** - Runs tests
- **maven-jar-plugin** - Creates JAR files
- And many more

## Complete Example

Here's a more complete pom.xml for a Spring Boot application:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>my-web-app</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>

    <name>My Web Application</name>
    <description>A Spring Boot web application</description>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <spring.boot.version>3.2.5</spring.boot.version>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>

    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>

        <!-- JUnit for Testing -->
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

## Parent POM

Notice the \`<parent>\` element:

\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>
\`\`\`

A parent POM:
- Inherits configuration from another POM
- Reduces duplication
- Common in frameworks like Spring Boot
- Your POM inherits dependencies, plugins, and properties

## Important Tags Summary

| Tag | Purpose | Required |
|-----|---------|----------|
| modelVersion | POM model version | Yes |
| groupId | Project group identifier | Yes |
| artifactId | Project artifact identifier | Yes |
| version | Project version | Yes |
| packaging | Output type (jar/war/pom) | No (default: jar) |
| name | Project name | No |
| description | Project description | No |
| properties | Reusable values | No |
| dependencies | External libraries | No |
| build | Build configuration | No |
| parent | Parent POM | No |

## Common Mistakes

### Mistake 1: Wrong Coordinates

**Wrong:**
\`\`\`xml
<groupId>com.example</groupId>
<artifactId>My Project</artifactId>  <!-- Spaces not allowed -->
\`\`\`

**Correct:**
\`\`\`xml
<groupId>com.example</groupId>
<artifactId>my-project</artifactId>  <!-- Use hyphens -->
\`\`\`

### Mistake 2: Missing Version

**Wrong:**
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <!-- Missing version -->
</dependency>
\`\`\`

**Correct:**
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
</dependency>
\`\`\`

### Mistake 3: Wrong Java Version

**Wrong:**
\`\`\`xml
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>  <!-- Mismatch -->
</properties>
\`\`\`

**Correct:**
\`\`\`xml
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>
\`\`\`

## Summary

The \`pom.xml\` file:
- Defines your project (groupId, artifactId, version)
- Declares dependencies
- Configures build process
- Sets project properties
- Is the single source of truth for Maven

Key elements:
- **Coordinates**: groupId:artifactId:version
- **Dependencies**: External libraries your project needs
- **Properties**: Reusable configuration values
- **Build**: Plugins and build configuration

Once you understand pom.xml, you understand Maven. It's that important!

Next, let's learn how to create a Maven project.

---

## 10 Important Maven \`pom.xml\` Interview Questions

1. **What are groupId, artifactId, and version?**  
   Together they form **Maven coordinates**—like a **unique address** for your JAR in the world (and in \`~/.m2\`).  
   - **groupId:** Usually **reverse domain**, e.g. \`com.mycompany\` (organization).  
   - **artifactId:** Short **project name**, e.g. \`order-service\`.  
   - **version:** e.g. \`1.0.0\` or \`1.0.0-SNAPSHOT\` (SNAPSHOT = still changing).  
   **Packaging** (\`jar\`, \`war\`, \`pom\`) says what **type** of file Maven builds. **Jar** = library or runnable fat-jar; **war** = web app for Tomcat; **pom** = parent/aggregator only.

2. **What is \`<parent>\` in a POM?**  
   **Inheritance:** Your project can **extend** another POM. The parent may define **\`<dependencyManagement>\`** (approved versions), **\`<pluginManagement>\`** (plugin versions), and **\`<properties>\`**.  
   **Spring Boot:** \`spring-boot-starter-parent\` gives you **sensible defaults** so you don’t type versions for every small library.

3. **What is \`<properties>\` used for?**  
   A **single place** for values used many times: **\`java.version\`**, **\`project.build.sourceEncoding\`**, or your own \`my.lib.version\`.  
   You reference them as **\`\${propertyName}\`** in dependencies and plugins—change **once**, update **everywhere**.

4. **Difference between \`<dependencies>\` and \`<dependencyManagement>\`?**  
   **\`<dependencies>\`:** These libraries are **actually added** to this module’s classpath.  
   **\`<dependencyManagement>\`:** Only **declares versions** (often in a **parent** BOM). Child modules can list a dependency **without** a version tag—“use the version Dad chose.”  
   **Analogy:** dependencyManagement is the **approved shopping list**; dependencies is **what you actually put in your cart**.

5. **What does \`<scope>\` mean on a dependency?**  
   **compile** (default): needed to compile and run.  
   **provided:** compile-time only; **Tomcat** gives **servlet-api** at runtime (don’t bundle it).  
   **runtime:** needed to run but not compile (some JDBC drivers).  
   **test:** only for **tests** (JUnit).  
   **system:** local path—**avoid**; not portable.

6. **What is \`<build><plugins>\`?**  
   **Plugins** are tools Maven runs: **compiler**, **surefire** (tests), **jar**, **spring-boot**, etc. You configure versions and options here. **\`<executions>\`** can **bind** a plugin goal to a **lifecycle phase** (e.g. run a check before \`package\`).  
   **pluginManagement** in parent = “default config + versions for children”; children still **declare** the plugin to **activate** it.

7. **Why specify \`maven.compiler.source/target\`?**  
   They tell the **compiler plugin** which **Java language features** you use (\`source\`) and which **bytecode version** to emit (\`target\`).  
   If you set **17** but CI uses JDK **11**, build **fails**. They should match **team JDK** and **\`java.version\`** in Spring Boot.

8. **What is a BOM (Bill of Materials)?**  
   A **POM** that only lists **dependencyManagement** for **many** related libraries (same **compatible** versions). You **import** the BOM with \`scope import\` so you don’t manually align **Jackson** minor versions across 10 dependencies.

9. **What is \`<modules>\` in a parent POM?**  
   Lists **subfolders** to build in **one reactor** build (e.g. \`<module>api</module>\`). Order can matter for **inter-module** dependencies.  
   This is **not** the same as listing **\`<dependency>\`** on another module—\`modules\` is **“build these projects together.”**

10. **Should you commit internal credentials in \`pom.xml\`?**  
    **Never.** \`pom.xml\` is usually **public** in Git. Put **passwords** in **\`~/.m2/settings.xml\`** under **\`<servers>\`**, or in **CI secret stores**, and reference **\`<id>\`** that matches **distributionManagement**.

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

export default mavenPomXml;

