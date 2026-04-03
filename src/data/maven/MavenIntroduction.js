const mavenIntroduction = {
  id: 'maven-introduction',
  title: 'What is Maven?',
  description: 'Learn what Maven is and why it\'s essential for Java development',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# What is Maven?

Apache Maven is a build automation and project management tool primarily used for Java projects. Maven standardizes the build process, manages dependencies automatically, and enforces consistent project structure across development teams.

## What Does Maven Do?

Maven helps you with:

**Dependency Management**
- Automatically downloads libraries your project needs (like Spring, Hibernate, JUnit)
- Resolves version conflicts between different libraries
- Manages transitive dependencies (dependencies of your dependencies)

**Build Process**
- Compiles your Java code
- Runs your test cases
- Packages your application into JAR or WAR files
- Deploys your application

**Project Structure**
- Enforces a standard directory layout
- Makes your project easy to understand for other developers
- Works consistently across different IDEs

**Reporting**
- Generates documentation
- Creates test reports
- Shows code coverage

## Enterprise Development Scenario

Consider building a web application using Spring Framework. Without Maven, developers must:

1. Go to Spring's website
2. Download the JAR files manually
3. Figure out which other libraries Spring needs
4. Download those too
5. Add all JARs to your project's classpath
6. Repeat this process every time you need a new library
7. Manually compile your code
8. Manually run tests
9. Manually create the JAR file

With Maven, you just add this to your configuration file:

\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>
</dependency>
\`\`\`

Maven automatically:
- Downloads Spring Core
- Downloads all libraries Spring needs
- Adds them to your project
- Compiles your code
- Runs tests
- Packages everything

## Why Maven Exists

Before Maven, Java developers faced several problems:

**Manual Dependency Management**
- Developers had to manually download JAR files
- No easy way to track which versions you were using
- Dependency conflicts were common
- Sharing projects meant sharing JAR files

**No Standard Structure**
- Every project had a different folder structure
- Hard to understand someone else's project
- Build scripts varied from project to project

**Repetitive Build Tasks**
- Writing custom build scripts for each project
- Manually compiling, testing, and packaging
- Different processes for different IDEs

Maven solves all these problems by providing:
- Automatic dependency management
- Standard project structure
- Consistent build process
- Works the same way everywhere

## Maven's Philosophy

Maven follows the principle of "Convention over Configuration." This means:

- Maven assumes a standard project structure
- You don't need to configure everything from scratch
- If you follow Maven's conventions, everything just works
- You only configure what's different from the standard

## What You'll Learn

In this Maven tutorial series, we'll cover:

1. Installing Maven on your computer
2. Understanding Maven project structure
3. Working with pom.xml (the heart of Maven)
4. Managing dependencies
5. Using Maven build lifecycle
6. Working with repositories
7. Using Maven plugins
8. Creating multi-module projects
9. Integrating Maven with Spring Boot
10. Common errors and how to fix them
11. Best practices

## Is Maven Only for Java?

While Maven is primarily used for Java projects, it can also work with:
- Scala
- Kotlin
- Groovy
- Other JVM languages

However, most tutorials and examples focus on Java, which is what we'll do here.

## Maven vs Other Build Tools

You might have heard of other build tools like:
- **Ant** - Older, more manual, XML-based
- **Gradle** - Newer, more flexible, uses Groovy/Kotlin
- **Maven** - Middle ground, widely used, XML-based

Maven is still the most popular choice for Java projects because:
- It's mature and stable
- Huge community support
- Works with all major IDEs
- Easy to learn
- Excellent documentation

## Getting Started

To use Maven, you need:
1. Java installed (JDK 8 or higher)
2. Maven installed on your system
3. A text editor or IDE (IntelliJ, Eclipse, VS Code)

Don't worry if you don't have Maven installed yet. We'll cover the installation process in the next tutorial.

## Summary

Maven is a build automation tool that:
- Manages your project dependencies automatically
- Provides a standard project structure
- Handles compilation, testing, and packaging
- Works consistently across different environments
- Saves you time and reduces errors

Maven serves as a comprehensive project management tool that automates build processes, dependency management, and project lifecycle tasks, enabling developers to focus on application logic rather than build configuration.

Ready to install Maven? Let's move to the next tutorial!

---

## 10 Important Maven Introduction Interview Questions

1. **What is Apache Maven?**  
   Without a build tool, you would **manually** compile each \`.java\` file, collect \`.class\` files, download every JAR, fix the **classpath**, run tests by hand, and zip everything—easy to mess up.  
   **Maven** automates this. You describe the project in **\`pom.xml\`**, then run commands like \`mvn compile\` or \`mvn package\`. Maven **knows** how to compile, test, and package in a **repeatable** way on any machine.  
   **Simple interview answer:** Maven is a **build automation** and **dependency management** tool for Java projects.

2. **What is a Project Object Model (POM)?**  
   **POM** = **Project Object Model** = your **\`pom.xml\`** file. It is the **single main configuration file** Maven reads first.  
   Inside it you write: project **name/version**, **dependencies** (which libraries you need), **plugins** (compiler, tests, packaging), optional **modules** (sub-projects), and **properties** (like Java version).  
   **For freshers:** If \`pom.xml\` has a mistake, **nothing** works—so learning this file is step one.

3. **What are Maven coordinates (GAV)?**  
   Maven needs a **unique address** for every JAR on the internet—like a postal address for libraries. Three parts:  
   - **groupId** — Usually your **organization**, e.g. \`org.springframework\` or \`com.mycompany\`.  
   - **artifactId** — The **project** name, e.g. \`spring-boot-starter-web\`.  
   - **version** — The **release number**, e.g. \`3.2.0\`.  
   Together: **\`groupId:artifactId:version\`**. Maven uses this string to **download exactly that JAR**, every time.

4. **How does Maven handle dependencies?**  
   You list libraries inside \`<dependencies>\` in \`pom.xml\`. For each one, Maven:  
   **(1)** Checks your **local** folder (\`~/.m2/repository\` on Windows often \`C:\\Users\\You\\.m2\\repository\`). If the file exists, it **reuses** it.  
   **(2)** If not, it **downloads** from the internet (Maven Central by default).  
   **Transitive:** If you add library **A**, and **A** needs **B**, Maven can bring **B** too—you don’t always write **B** yourself. That saves time but later you learn to check conflicts with \`mvn dependency:tree\`.

5. **What is the standard Maven directory layout?**  
   Maven expects this **fixed folder pattern**:  
   - **\`src/main/java\`** — Your **main** Java source.  
   - **\`src/main/resources\`** — Config files (properties, XML) copied into the final JAR.  
   - **\`src/test/java\`** — **JUnit** tests.  
   - **\`src/test/resources\`** — Test-only files.  
   - **\`target/\`** — **Output** after build (compiled code, final JAR). Use \`mvn clean\` to delete it; add \`target/\` to **\`.gitignore\`**.  
   **Why:** Any developer opens any Maven project and **immediately** knows where code lives.

6. **What does “convention over configuration” mean for Maven?**  
   **Convention** = Maven’s **default rules** (folder names, build steps). If you follow them, your XML stays **short**.  
   **Configuration** = **Extra XML** only when you need something **non-standard**.  
   **Fresher analogy:** Like a **standard chessboard**—everyone knows where pieces start; you only write special rules if you play a **variant**.

7. **Is Maven only for Java?**  
   **Mostly Java and JVM** (Kotlin, Scala). The core is **Java compilation** and JAR/WAR packaging. Other languages usually use **Gradle** or other tools, but in **enterprise Java**, Maven is **very common**. Spring, Hibernate, and most tutorials assume Maven **or** Gradle.

8. **How does Maven relate to an IDE?**  
   **IntelliJ / Eclipse / VS Code** can **import** \`pom.xml\`, download dependencies, and show **Run** buttons. But the **official** definition of the project is still **\`pom.xml\`**.  
   **Team rule:** Everyone should be able to run \`mvn clean install\` from **terminal**. CI servers (GitHub Actions, Jenkins) use **command-line Maven**, not your IDE clicks.

9. **What is the local repository?**  
   A **folder on your PC** (default \`~/.m2/repository\`) where Maven **stores downloaded JARs** forever (until you delete them).  
   **Benefit:** Second project that needs the **same** Spring version **does not download again**—builds are **faster**.  
   **Fix for weird errors:** Sometimes a **half-downloaded** file breaks the build—delete that library’s folder under \`.m2\` and run Maven again.

10. **Why use Maven instead of manually downloading JARs?**  
    **Manual:** Download from random sites, wrong versions, missing transitive JARs, different setups per developer.  
    **Maven:** One \`pom.xml\`, **same** versions for the whole team, **automatic** transitive libraries, **one command** for CI.  
    **Interview line:** Less **“works on my machine”**, more **professional** and **scalable** development.

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

export default mavenIntroduction;

