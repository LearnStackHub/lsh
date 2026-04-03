const mavenCommands = {
  id: 'maven-commands',
  title: 'Useful Maven Commands',
  description: 'Essential Maven commands every developer should know',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Useful Maven Commands

Here are the most useful Maven commands you'll use daily. Mastering these will make you productive with Maven.

## Basic Build Commands

### mvn clean

\`\`\`bash
mvn clean
\`\`\`

- Deletes the \`target\` directory
- Removes all compiled classes and generated files
- Use when you want a fresh build

**When to use:**
- After changing build configuration
- When build seems corrupted
- Before important builds

### mvn compile

\`\`\`bash
mvn compile
\`\`\`

- Compiles source code from \`src/main/java\`
- Puts compiled classes in \`target/classes\`
- Does NOT run tests
- Does NOT create JAR

**When to use:**
- Quick compilation check
- During development
- Fast feedback loop

### mvn test

\`\`\`bash
mvn test
\`\`\`

- Compiles source and test code
- Runs all tests
- Generates test reports in \`target/surefire-reports\`
- Does NOT create JAR

**When to use:**
- Before committing code
- To verify everything works
- During development

### mvn package

\`\`\`bash
mvn package
\`\`\`

- Compiles code
- Runs tests
- Packages into JAR/WAR/EAR
- Creates file in \`target\` directory

**When to use:**
- Creating deployable artifact
- Before deployment
- Creating release

### mvn install

\`\`\`bash
mvn install
\`\`\`

- Does everything \`package\` does
- Installs artifact to local repository (\`~/.m2/repository\`)
- Makes it available for other projects

**When to use:**
- Building library for other projects
- Multi-module projects
- Most common build command

### mvn clean install

\`\`\`bash
mvn clean install
\`\`\`

- Combines clean and install
- Most commonly used command
- Ensures fresh build

**When to use:**
- Default build command
- Before committing
- Creating release

## Dependency Commands

### mvn dependency:tree

\`\`\`bash
mvn dependency:tree
\`\`\`

Shows all dependencies (direct and transitive) in a tree structure.

**Example output:**
\`\`\`
com.example:my-app:jar:1.0.0
+- org.springframework:spring-core:jar:5.3.30:compile
|  +- org.springframework:spring-jcl:jar:5.3.30:compile
+- junit:junit:jar:4.13.2:test
\`\`\`

**When to use:**
- Understanding dependency chain
- Finding version conflicts
- Debugging dependency issues

### mvn dependency:analyze

\`\`\`bash
mvn dependency:analyze
\`\`\`

Analyzes dependencies and reports:
- Unused declared dependencies
- Used undeclared dependencies

**When to use:**
- Cleaning up pom.xml
- Finding unused dependencies
- Optimizing dependencies

### mvn dependency:resolve

\`\`\`bash
mvn dependency:resolve
\`\`\`

Downloads all dependencies without building the project.

**When to use:**
- Pre-downloading dependencies
- Offline preparation
- Checking dependency availability

### mvn dependency:copy-dependencies

\`\`\`bash
mvn dependency:copy-dependencies
\`\`\`

Copies all dependencies to \`target/dependency\` directory.

**When to use:**
- Manual deployment
- Creating deployment package
- Analyzing dependencies

## Plugin Commands

### mvn compiler:compile

\`\`\`bash
mvn compiler:compile
\`\`\`

Runs compiler plugin directly (same as \`mvn compile\`).

### mvn surefire:test

\`\`\`bash
mvn surefire:test
\`\`\`

Runs test plugin directly (same as \`mvn test\`).

### mvn spring-boot:run

\`\`\`bash
mvn spring-boot:run
\`\`\`

Runs Spring Boot application directly.

**When to use:**
- Running Spring Boot apps
- Development
- Quick testing

### mvn exec:java

\`\`\`bash
mvn exec:java -Dexec.mainClass="com.example.App"
\`\`\`

Runs a Java class directly.

**When to use:**
- Running main classes
- Quick testing
- Development

## Advanced Commands

### mvn clean package -DskipTests

\`\`\`bash
mvn clean package -DskipTests
\`\`\`

Builds without running tests.

**When to use:**
- Quick builds during development
- When tests are broken but you need JAR
- NOT for production builds

### mvn clean package -Dmaven.test.skip=true

\`\`\`bash
mvn clean package -Dmaven.test.skip=true
\`\`\`

Skips test compilation and execution.

**Difference from -DskipTests:**
- \`-DskipTests\` - Compiles tests but doesn't run
- \`-Dmaven.test.skip=true\` - Skips test compilation entirely

### mvn clean install -pl module1

\`\`\`bash
mvn clean install -pl module1
\`\`\`

Builds only specific module (multi-module projects).

**-pl** = project list

### mvn clean install -pl module1 -am

\`\`\`bash
mvn clean install -pl module1 -am
\`\`\`

Builds module1 and its dependencies.

**-am** = also make

### mvn versions:display-dependency-updates

\`\`\`bash
mvn versions:display-dependency-updates
\`\`\`

Shows which dependencies have newer versions available.

**Requires:** \`versions-maven-plugin\`

**When to use:**
- Checking for updates
- Security updates
- Staying current

### mvn help:effective-pom

\`\`\`bash
mvn help:effective-pom
\`\`\`

Shows the effective POM (after inheritance and interpolation).

**When to use:**
- Debugging configuration
- Understanding inherited settings
- Verifying plugin configuration

### mvn help:describe

\`\`\`bash
mvn help:describe -Dplugin=compiler
\`\`\`

Describes a plugin and its goals.

**When to use:**
- Learning about plugins
- Finding plugin goals
- Understanding plugin configuration

## Information Commands

### mvn -version

\`\`\`bash
mvn -version
\`\`\`

Shows Maven version and Java information.

### mvn help:effective-settings

\`\`\`bash
mvn help:effective-settings
\`\`\`

Shows effective settings (from settings.xml).

### mvn validate

\`\`\`bash
mvn validate
\`\`\`

Validates project structure and configuration.

**When to use:**
- Checking project setup
- Verifying configuration
- Quick validation

## Multi-Module Commands

### mvn clean install -rf :module1

\`\`\`bash
mvn clean install -rf :module1
\`\`\`

Resumes build from specific module.

**-rf** = resume from

**When to use:**
- After build failure
- Continuing from specific point

### mvn clean install -N

\`\`\`bash
mvn clean install -N
\`\`\`

Builds only parent POM, not modules.

**-N** = non-recursive

## Useful Command Combinations

### Daily Development

\`\`\`bash
# Quick compile check
mvn compile

# Run tests
mvn test

# Full build
mvn clean install
\`\`\`

### Before Commit

\`\`\`bash
# Clean build with tests
mvn clean install

# Check dependencies
mvn dependency:tree
\`\`\`

### Production Build

\`\`\`bash
# Full clean build
mvn clean package

# Verify
mvn verify
\`\`\`

### Debugging

\`\`\`bash
# See effective POM
mvn help:effective-pom

# Analyze dependencies
mvn dependency:tree
mvn dependency:analyze

# Check for updates
mvn versions:display-dependency-updates
\`\`\`

## Command Options

### -X (Debug)

\`\`\`bash
mvn clean install -X
\`\`\`

Shows debug output.

### -e (Errors)

\`\`\`bash
mvn clean install -e
\`\`\`

Shows full error stack traces.

### -q (Quiet)

\`\`\`bash
mvn clean install -q
\`\`\`

Suppresses most output.

### -U (Update)

\`\`\`bash
mvn clean install -U
\`\`\`

Forces update of dependencies.

## Tips

1. **Use clean install regularly**
   - Most common command
   - Ensures fresh build

2. **Check dependency tree**
   - Understand what's included
   - Find conflicts

3. **Run tests before committing**
   - \`mvn test\` or \`mvn clean install\`

4. **Use -DskipTests carefully**
   - Only during development
   - Never in production

5. **Learn plugin goals**
   - \`mvn help:describe\` to learn plugins
   - Extend Maven functionality

## Summary

Essential commands:
- **mvn clean install** - Most common
- **mvn test** - Run tests
- **mvn package** - Create JAR/WAR
- **mvn dependency:tree** - View dependencies
- **mvn spring-boot:run** - Run Spring Boot apps

Command options:
- **-DskipTests** - Skip tests
- **-pl** - Build specific module
- **-X** - Debug output
- **-U** - Update dependencies

Master these commands and you'll be productive with Maven!

Next, let's learn about common errors and how to fix them!

---

## 10 Important Maven Commands Interview Questions

1. **What does \`mvn clean install\` do end-to-end?**  
   **\`clean\`** deletes the **\`target/\`** folder. Then Maven runs the **default lifecycle** through **\`install\`**: validate → compile → test → package → verify → install.  
   **\`install\`** copies the built JAR/WAR into **\`~/.m2/repository\`** so **other projects** on your machine can depend on it.  
   **Typical use:** “I want a **full** local build before I publish or before another module picks up my changes.”

2. **What is \`mvn verify\` used for?**  
   Runs everything **through** \`package\`, then runs **integration-test** / **verify** phases (Failsafe, extra checks). **CI** often uses **\`mvn verify\`** as the **quality gate** before **deploy**.  
   **vs install:** \`verify\` does **not** put the artifact in **local** \`.m2\` unless you also run **install** (depends on pipeline).

3. **What does \`mvn dependency:tree\` show?**  
   Prints a **tree** of **dependencies** and **transitive** dependencies—**essential** when you see **NoClassDefFoundError** or **version conflicts**.  
   **\`mvn dependency:tree -Dverbose\`** shows **why** a version was **chosen** (omitted for conflict).

4. **What is \`mvn -o\` / offline mode?**  
   **\`mvn -o\`** or **\`--offline\`** tells Maven **no downloads**. Build **fails** if something is missing from \`.m2\`.  
   **Use:** Air-gapped networks or **checking** that your cache is complete.

5. **What does \`mvn -U\` mean?**  
   **\`--update-snapshots\`** forces Maven to **check** remote repos for **newer** snapshots (and **metadata** for releases). Use when you think you’re stuck on an **old** SNAPSHOT.

6. **What is \`mvn -X\`?**  
   **Debug mode**—very **verbose** logs: settings files, plugin resolution, HTTP, **why** a dependency was picked.  
   **Tip:** Redirect to a file: \`mvn -X clean install > debug.log 2>&1\` (then search for **ERROR**).

7. **What is \`mvn dependency:go-offline\`?**  
   Downloads **all** dependencies and plugins needed for the build so you can work **offline** later. Used in **Docker** builds to **cache** a layer of dependencies.

8. **What does \`-DskipTests\` vs \`-Dmaven.test.skip\`?**  
   **\`-DskipTests\`:** Skip **running** tests, but still **compile** test classes (faster; tests might be broken).  
   **\`-Dmaven.test.skip=true\`:** Skip **both** compiling and running tests (when test code doesn’t compile—**temporary** only).

9. **What is \`mvn help:effective-pom\`?**  
   Prints the **merged** POM after **parent inheritance**, **profiles**, and **defaults**. Use when you **can’t** see where a **plugin version** or **dependency** version comes from.  
   **Pipe to file** if it’s huge.

10. **What is \`mvn versions:set\`?**  
    **versions-maven-plugin** can **bump** \`<version>\` across **all modules** in one go (e.g. **1.0.0** → **1.1.0**).  
    **Use with care:** update **Git tags**, **CI**, and **release notes**—version bumps are **team** events.

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

export default mavenCommands;

