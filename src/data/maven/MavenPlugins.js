const mavenPlugins = {
  id: 'maven-plugins',
  title: 'Maven Plugins',
  description: 'Learn how to use and configure Maven plugins',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven Plugins

Plugins are what make Maven powerful. They extend Maven's functionality and allow you to customize the build process. Every Maven command you run actually executes a plugin.

## What is a Plugin?

A **plugin** is a collection of goals (tasks) that Maven can execute. Think of plugins as tools that Maven uses to build your project.

**Examples:**
- **Compiler Plugin** - Compiles Java code
- **Surefire Plugin** - Runs tests
- **JAR Plugin** - Creates JAR files
- **War Plugin** - Creates WAR files

## How Plugins Work

Maven lifecycle phases are bound to plugin goals:

**Example:**
When you run \`mvn compile\`:
1. Maven executes the \`compile\` phase
2. This phase is bound to \`maven-compiler-plugin:compile\` goal
3. The plugin compiles your Java code

## Built-in Plugins

Maven comes with many plugins built-in. These are bound to lifecycle phases automatically.

### maven-compiler-plugin

Compiles Java source code.

**Default configuration:**
- Compiles \`src/main/java\` to \`target/classes\`
- Uses Java version from \`properties\` or defaults to Java 5

**Custom configuration:**
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
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
\`\`\`

**What it does:**
- Sets Java source version to 17
- Sets compiled bytecode to Java 17
- Sets encoding to UTF-8

### maven-surefire-plugin

Runs unit tests.

**Default behavior:**
- Finds tests in \`src/test/java\`
- Runs tests matching \`**/*Test.java\` or \`**/*Tests.java\`
- Generates reports in \`target/surefire-reports\`

**Custom configuration:**
\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0</version>
    <configuration>
        <includes>
            <include>**/*Test.java</include>
        </includes>
        <excludes>
            <exclude>**/*IntegrationTest.java</exclude>
        </excludes>
    </configuration>
</plugin>
\`\`\`

### maven-jar-plugin

Creates JAR files.

**Default behavior:**
- Packages compiled classes into JAR
- JAR name: \`artifactId-version.jar\`

**Custom configuration:**
\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.3.0</version>
    <configuration>
        <archive>
            <manifest>
                <mainClass>com.example.App</mainClass>
            </manifest>
        </archive>
    </configuration>
</plugin>
\`\`\`

**What it does:**
- Sets main class in MANIFEST.MF
- Allows running JAR with \`java -jar app.jar\`

### maven-war-plugin

Creates WAR files for web applications.

\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>3.3.1</version>
    <configuration>
        <warSourceDirectory>src/main/webapp</warSourceDirectory>
    </configuration>
</plugin>
\`\`\`

## Popular Third-Party Plugins

### spring-boot-maven-plugin

Runs Spring Boot applications.

\`\`\`xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>3.2.5</version>
</plugin>
\`\`\`

**Usage:**
\`\`\`bash
mvn spring-boot:run
\`\`\`

Runs your Spring Boot application directly.

### exec-maven-plugin

Executes Java classes or system commands.

\`\`\`xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>3.1.0</version>
    <configuration>
        <mainClass>com.example.App</mainClass>
    </configuration>
</plugin>
\`\`\`

**Usage:**
\`\`\`bash
mvn exec:java
\`\`\`

Runs the specified main class.

### maven-shade-plugin

Creates "fat JAR" (includes all dependencies).

\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
\`\`\`

**What it does:**
- Packages all dependencies into one JAR
- Creates executable JAR with all dependencies included
- Useful for standalone applications

## Plugin Configuration

### Basic Plugin Declaration

\`\`\`xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
        </plugin>
    </plugins>
</build>
\`\`\`

### Plugin with Configuration

\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>17</source>
        <target>17</target>
    </configuration>
</plugin>
\`\`\`

### Plugin with Execution

\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <executions>
        <execution>
            <phase>compile</phase>
            <goals>
                <goal>compile</goal>
            </goals>
        </execution>
    </executions>
</plugin>
\`\`\`

## Running Plugin Goals Directly

You can run plugin goals without going through lifecycle phases:

\`\`\`bash
# Run compiler plugin directly
mvn compiler:compile

# Run surefire plugin directly
mvn surefire:test

# Run exec plugin
mvn exec:java

# Run Spring Boot plugin
mvn spring-boot:run
\`\`\`

**Format:** \`mvn pluginGroupId:pluginArtifactId:goal\`

**Short format (for official plugins):**
\`\`\`bash
mvn compiler:compile  # Instead of org.apache.maven.plugins:maven-compiler-plugin:compile
\`\`\`

## Plugin Management

For multi-module projects, use \`<pluginManagement>\`:

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

<build>
    <plugins>
        <!-- Version inherited from pluginManagement -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
        </plugin>
    </plugins>
</build>
\`\`\`

**Benefits:**
- Centralized plugin version management
- Consistent versions across modules
- Easier updates

## Finding Plugins

### Maven Plugin Directory

Visit: https://maven.apache.org/plugins/

Lists all official Maven plugins with documentation.

### Maven Central

Search: https://mvnrepository.com/

Search for plugins like any other dependency.

### Plugin Documentation

Each plugin has documentation:
- Official plugins: https://maven.apache.org/plugins/
- Third-party: Check plugin's GitHub/website

## Common Plugin Configurations

### Complete Example

\`\`\`xml
<build>
    <plugins>
        <!-- Compiler Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
            </configuration>
        </plugin>

        <!-- Surefire Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0</version>
        </plugin>

        <!-- JAR Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.App</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
\`\`\`

## Best Practices

1. **Specify plugin versions**
   - Don't rely on default versions
   - Ensures consistent builds

2. **Use pluginManagement**
   - For multi-module projects
   - Centralized version control

3. **Keep plugins updated**
   - Check for updates regularly
   - Security and bug fixes

4. **Document custom configurations**
   - Add comments explaining why
   - Helps future developers

5. **Use appropriate plugins**
   - Don't add unnecessary plugins
   - Each plugin adds build time

## Summary

Maven plugins:
- Extend Maven's functionality
- Bound to lifecycle phases
- Can be run directly
- Configurable via \`<configuration>\`

Key plugins:
- **maven-compiler-plugin** - Compiles Java code
- **maven-surefire-plugin** - Runs tests
- **maven-jar-plugin** - Creates JAR files
- **maven-war-plugin** - Creates WAR files

Plugin management:
- Use \`<pluginManagement>\` for multi-module projects
- Centralized version control
- Consistent builds

Next, let's learn about multi-module projects!

---

## 10 Important Maven Plugins Interview Questions

1. **What is a Maven plugin?**  
   Maven’s **lifecycle** (compile, test, package) is **empty** without plugins. Each plugin is a **set of goals** (tasks): e.g. **compiler** runs **javac**, **surefire** runs **JUnit**.  
   Plugins are identified like dependencies: **\`groupId:artifactId:version\`**. Maven downloads them automatically when needed.

2. **What does \`maven-compiler-plugin\` do?**  
   It runs the **Java compiler** with settings from **\`maven.compiler.release\`** or **source/target**. If Java version doesn’t match your **JDK**, you get errors like **invalid flag** or **release version not supported**.  
   **Fresher:** “Compiler plugin = bridge between Maven lifecycle and **javac**.”

3. **What is Surefire vs Failsafe?**  
   **maven-surefire-plugin:** runs **fast unit tests** during **\`test\`** phase (\`*Test.java\`).  
   **maven-failsafe-plugin:** runs **integration tests** during **\`integration-test\`** / **\`verify\`** (\`*IT.java\`). Failsafe **won’t fail** the build before **package** in the same way—designed for tests that **start** Tomcat/Spring and **tear down** cleanly.

4. **What is \`pluginManagement\`?**  
   In a **parent** POM, **pluginManagement** says: “**If** a child uses this plugin, **here** is the **version** and default **config**.” Children still **declare** the plugin to **turn it on**.  
   **Benefit:** One place to bump **Surefire** version for **all** modules.

5. **How do you run a plugin goal directly?**  
   Syntax: **\`mvn prefix:goal\`** or full **\`mvn groupId:artifactId:version:goal\`**. Example: **\`mvn spring-boot:run\`** (shortcut) or **\`mvn org.springframework.boot:spring-boot-maven-plugin:run\`**.  
   If version isn’t in **pluginManagement**, Maven may ask or fail—**define** version in parent.

6. **What is \`<executions>\`?**  
   Binds a plugin **goal** to a **lifecycle phase** (e.g. run **code generation** before \`compile\`). You can have **multiple** executions with **different** IDs (generate sources twice, etc.).

7. **Why pin plugin versions?**  
   Without a fixed version, Maven might pick a **newer** plugin later—**CI** behavior changes **without** code changes. **Pin** versions in **\`<build><plugins>\`** or **pluginManagement** for **reproducible** builds.

8. **What does \`spring-boot-maven-plugin\` add?**  
   Main goals: **repackage** — turns your JAR into a **fat JAR** (dependencies inside) with a special **loader**; **run** — runs the app with **\`mvn spring-boot:run\`** for development.  
   **Interview:** “Repackage = production-ready executable JAR.”

9. **What is \`maven-jar-plugin\` \`manifest\` configuration?**  
   For **non-Boot** apps, you set **Main-Class** in **MANIFEST.MF** so **\`java -jar app.jar\`** knows where **main()** is. Spring Boot plugin **replaces** much of this for Boot apps.

10. **How do plugins relate to the lifecycle?**  
    Maven **binds** default plugins to phases: **compiler:compile** → **compile**, **surefire:test** → **test**, **jar:jar** → **package**.  
    If your JAR looks wrong, check **which phase** ran and **which plugin** is configured—debugging builds means **thinking in phases + goals**.

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

export default mavenPlugins;

