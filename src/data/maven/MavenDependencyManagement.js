const mavenDependencyManagement = {
  id: 'maven-dependency-management',
  title: 'Dependency Management',
  description: 'Learn how to manage project dependencies effectively',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Dependency Management

Dependency management is one of Maven's core features. It automatically downloads and manages the libraries your project needs. Let's learn how to use it effectively.

## What is a Dependency?

A **dependency** is an external library (JAR file) that your project needs to compile or run. Examples:
- Spring Framework
- Hibernate
- JUnit
- MySQL Connector
- Apache Commons

Instead of manually downloading these JARs, you declare them in pom.xml, and Maven handles the rest.

## Adding a Dependency

To add a dependency, add it to the \`<dependencies>\` section in pom.xml:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.30</version>
    </dependency>
</dependencies>
\`\`\`

**Required elements:**
- **groupId** - Organization/company identifier
- **artifactId** - Library name
- **version** - Version number

## Finding Dependencies

### Method 1: Maven Central Search

1. Go to https://mvnrepository.com/
2. Search for the library you need
3. Click on the version you want
4. Copy the Maven dependency XML
5. Paste into your pom.xml

**Example:** Searching for "Spring Core"

You'll see:
\`\`\`xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
</dependency>
\`\`\`

### Method 2: IDE Autocomplete

Most IDEs (IntelliJ, Eclipse) provide autocomplete for dependencies:
- Type \`<dependency>\` and IDE suggests popular libraries
- Shows available versions
- Auto-imports when you save

### Method 3: Official Documentation

Library documentation usually provides Maven dependency:
- Spring: https://spring.io/projects/spring-framework
- Hibernate: https://hibernate.org/
- Check their "Getting Started" or "Maven" sections

## Dependency Coordinates

Every dependency has three coordinates:

**Format:** \`groupId:artifactId:version\`

**Example:** \`org.springframework:spring-core:5.3.30\`

**Breaking it down:**
- **groupId** (\`org.springframework\`) - Usually reverse domain name
- **artifactId** (\`spring-core\`) - Library name
- **version** (\`5.3.30\`) - Specific version

## Common Dependencies

### Spring Framework

\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
</dependency>
\`\`\`

### Hibernate

\`\`\`xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.15.Final</version>
</dependency>
\`\`\`

### MySQL Connector

\`\`\`xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.0.33</version>
</dependency>
\`\`\`

### JUnit (for testing)

\`\`\`xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
\`\`\`

### Apache Commons

\`\`\`xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>
\`\`\`

## Dependency Scope

Scope defines when a dependency is needed:

### compile (default)

\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
    <scope>compile</scope>  <!-- Default, can omit -->
</dependency>
\`\`\`

- Needed for compilation and runtime
- Included in final JAR/WAR
- Most common scope

### test

\`\`\`xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
\`\`\`

- Only needed for testing
- NOT included in final JAR/WAR
- Available only during test phase

### provided

\`\`\`xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
    <scope>provided</scope>
</dependency>
\`\`\`

- Provided by runtime environment
- Needed for compilation
- NOT included in final JAR/WAR
- Common for servlet-api, Java EE APIs

### runtime

\`\`\`xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
    <scope>runtime</scope>
</dependency>
\`\`\`

- Needed at runtime
- NOT needed for compilation
- Included in final JAR/WAR

## Transitive Dependencies

When you add a dependency, Maven automatically downloads its dependencies too.

**Example:**
You add Spring Core:
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
</dependency>
\`\`\`

Spring Core needs:
- commons-logging
- spring-jcl

Maven automatically downloads these too! You don't need to declare them.

**View transitive dependencies:**
\`\`\`bash
mvn dependency:tree
\`\`\`

This shows all dependencies (direct and transitive).

## Excluding Dependencies

Sometimes you want to exclude a transitive dependency:

\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
\`\`\`

**Why exclude?**
- Version conflict
- You want a different version
- Dependency not needed

## Version Management

### Using Properties

Instead of hardcoding versions, use properties:

\`\`\`xml
<properties>
    <spring.version>5.3.30</spring.version>
    <junit.version>4.13.2</junit.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>\${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>\${spring.version}</version>
    </dependency>
</dependencies>
\`\`\`

**Benefits:**
- Update version in one place
- Consistent versions across dependencies
- Easier maintenance

### Using Parent POM

Parent POMs can manage versions:

\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>

<dependencies>
    <!-- No version needed - inherited from parent -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
\`\`\`

## Dependency Management Section

For multi-module projects, use \`<dependencyManagement>\`:

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

<dependencies>
    <!-- Version inherited from dependencyManagement -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
    </dependency>
</dependencies>
\`\`\`

**Benefits:**
- Centralized version management
- Consistent versions across modules
- Easier updates

## Updating Dependencies

### Check for Updates

**View dependency tree:**
\`\`\`bash
mvn dependency:tree
\`\`\`

**Check for newer versions:**
- Visit https://mvnrepository.com/
- Check library's official website
- Use IDE plugins (like "Maven Helper" in IntelliJ)

### Update Version

Simply change the version in pom.xml:

\`\`\`xml
<!-- Old version -->
<version>5.3.20</version>

<!-- New version -->
<version>5.3.30</version>
\`\`\`

Then run:
\`\`\`bash
mvn clean install
\`\`\`

Maven will download the new version.

## Common Issues

### Issue 1: Dependency Not Found

**Error:**
\`\`\`
Could not find artifact com.example:my-lib:jar:1.0.0
\`\`\`

**Solutions:**
- Check coordinates (groupId:artifactId:version)
- Verify version exists
- Check repository configuration
- Clear local repository: \`rm -rf ~/.m2/repository/com/example\`

### Issue 2: Version Conflict

**Problem:** Two dependencies need different versions of the same library.

**Solution:** Use \`<exclusions>\` or \`<dependencyManagement>\` to force a specific version.

### Issue 3: Outdated Dependencies

**Problem:** Using old versions with security vulnerabilities.

**Solution:** Regularly update dependencies. Check for security advisories.

## Best Practices

1. **Use specific versions**
   - Avoid \`LATEST\` or \`RELEASE\` (unpredictable)
   - Use exact version numbers

2. **Keep dependencies updated**
   - Check for updates regularly
   - Update for security patches

3. **Use dependencyManagement**
   - For multi-module projects
   - Centralized version control

4. **Exclude unnecessary dependencies**
   - Use \`<exclusions>\` to remove unwanted transitive dependencies

5. **Use appropriate scopes**
   - \`test\` scope for test-only dependencies
   - \`provided\` scope for runtime-provided libraries

6. **Document why you need each dependency**
   - Add comments in pom.xml
   - Helps future developers

## Summary

Dependency management in Maven:
- Declare dependencies in \`<dependencies>\` section
- Maven downloads automatically
- Transitive dependencies included automatically
- Use scopes to control when dependencies are needed
- Use properties for version management
- Use \`dependencyManagement\` for multi-module projects

Key scopes:
- **compile** - Default, needed for compilation and runtime
- **test** - Only for testing
- **provided** - Provided by runtime
- **runtime** - Only at runtime

Next, let's learn about Maven plugins!

---

## 10 Important Maven Dependency Management Interview Questions

1. **What is a transitive dependency?**  
   You declare **only** \`spring-boot-starter-web\`. Spring **also** needs **Tomcat**, **Jackson**, **logging**, etc. Those **extra** JARs are **transitive**—you didn’t list them, but Maven adds them.  
   Run **\`mvn dependency:tree\`** to see the **full tree**. **Conflict:** Two libraries ask for **different versions** of **the same** artifact (e.g. two Guava versions)—you must **choose** one (BOM, explicit version, or **exclusion**).

2. **What does \`<scope>test</scope>\` mean?**  
   The dependency is used **only when compiling and running tests**. It does **not** go into the **production** JAR/WAR. **JUnit**, **Mockito**, **Spring Test** are **test** scope.  
   **Why it matters:** Smaller deployable artifact and no test code leaking to production.

3. **What is \`provided\` scope?**  
   You need the classes **while writing code** (compile), but at **runtime** something else **already provides** them. Example: **Servlet API** on Tomcat—the **server** has those JARs; you must **not** bundle duplicate APIs in the WAR.  
   **compile** = ship with app; **provided** = “container has it.”

4. **How do you exclude a transitive dependency?**  
   Under **\`<dependency>\`**, add **\`<exclusions><exclusion>...</exclusion></exclusions>\`** with **groupId** + **artifactId** of the library you want to **block**.  
   Use when a library pulls **wrong** SLF4J binding or **old** vulnerable JAR. **Better first:** fix root cause with a **BOM** or **aligned** parent so you don’t fight the tree blindly.

5. **What is \`optional\` dependency?**  
   Marks “**nice to have**” for your library: **consumers** of your JAR **do not automatically** get that dependency. Used for **optional features** (e.g. extra codec).  
   Contrast: normal transitive deps are pulled **unless** excluded.

6. **What is \`dependencyManagement\` in a parent POM?**  
   Parent lists **artifact + version** pairs **without** necessarily adding them to classpath. Child modules say **“I need spring-core”** **without** a version—parent’s **dependencyManagement** supplies the version.  
   **Spring Boot parent** manages **hundreds** of versions so **starters** stay compatible.

7. **What is \`mvn dependency:analyze\`?**  
   A **report** that says: dependencies you **declared but never use**, and classes you **use** but **didn’t declare** (coming transitively—risky). Helps **clean** \`pom.xml\` and avoid **accidental** reliance on transitive deps.

8. **How do you force a specific version (last resort)?**  
   Put the winning version in **\`<dependencyManagement>\`** (or a direct **\`<dependency>\`** with explicit version). **Enforcer** plugin can **fail** the build if forbidden versions appear.  
   **Don’t** randomly exclude libraries without reading **\`dependency:tree\`**—you might break runtime.

9. **What is a version conflict “nearest wins” rule?**  
   Maven picks **one** version per artifact using rules (shortest path, order). It is **not** magic—sometimes the “nearest” is **wrong** for your app.  
   **Fix:** import a **BOM**, use **Spring** parent, or set **explicit** version in **dependencyManagement**.

10. **Why avoid \`LATEST\` / \`RELEASE\` version ranges in production?**  
    Today’s build might resolve **1.2.3**; next month **the same POM** might pull **1.3.0** without you changing a line—**not reproducible**, bad for audits.  
    **Best practice:** **Pin** versions (e.g. \`1.2.3\`); upgrade **deliberately** with PRs and tests.

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

export default mavenDependencyManagement;

