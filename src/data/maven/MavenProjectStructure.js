const mavenProjectStructure = {
  id: 'maven-project-structure',
  title: 'Maven Project Structure',
  description: 'Understand the standard Maven directory layout and why it matters',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven Project Structure

Maven follows a standard directory structure. This might seem restrictive at first, but it's actually one of Maven's greatest strengths. Once you learn this structure, you can understand any Maven project instantly.

## Standard Maven Directory Layout

Here's what a typical Maven project looks like:

\`\`\`
my-project
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ application.properties
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ AppTest.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ test-config.properties
 ┣ target
 ┃ ┣ classes
 ┃ ┣ test-classes
 ┃ ┗ my-project-1.0.jar
 ┗ pom.xml
\`\`\`

Let me break this down for you:

## Directory Breakdown

### Root Directory

**my-project/**
- This is your project root
- Contains \`pom.xml\` (the project configuration file)
- Contains \`src\` directory (your source code)
- Contains \`target\` directory (build output)

### src/ Directory

The \`src\` directory contains all your source code and resources.

**src/main/**
- This is where your **production code** lives
- Code that will be compiled and packaged
- This is what gets deployed

**src/main/java/**
- All your Java source files go here
- Follow standard Java package structure
- Example: \`com.example.App.java\` goes in \`src/main/java/com/example/App.java\`

**src/main/resources/**
- Configuration files
- Properties files
- XML files
- Images, templates, etc.
- Anything your application needs at runtime
- Files here are copied to the classpath

**src/test/**
- This is where your **test code** lives
- Test files are NOT included in the final JAR/WAR
- Only used during testing phase

**src/test/java/**
- Your test classes (JUnit, TestNG, etc.)
- Same package structure as main code
- Example: \`com.example.AppTest.java\` goes in \`src/test/java/com/example/AppTest.java\`

**src/test/resources/**
- Test-specific configuration files
- Test data files
- Mock resources for testing

### target/ Directory

**target/**
- This is where Maven puts all build output
- Created automatically when you build
- Contains compiled classes, JAR files, test reports, etc.
- You can delete this folder anytime - Maven will recreate it
- Usually added to \`.gitignore\` (don't commit to version control)

**target/classes/**
- Compiled Java classes from \`src/main/java\`
- Resources from \`src/main/resources\`

**target/test-classes/**
- Compiled test classes from \`src/test/java\`
- Test resources from \`src/test/resources\`

**target/my-project-1.0.jar**
- The final packaged JAR file
- Created when you run \`mvn package\`

### pom.xml

**pom.xml**
- Project Object Model file
- The heart of your Maven project
- Contains all project configuration
- We'll cover this in detail in the next tutorial

## Why This Structure?

### 1. Convention Over Configuration

Maven assumes this structure. You don't need to tell Maven where your code is - it already knows. This means:
- Less configuration
- Consistent projects
- Easy to understand

### 2. Separation of Concerns

**Main vs Test:**
- Production code separate from test code
- Tests don't get packaged with your application
- Clear distinction between what runs and what tests

**Java vs Resources:**
- Code separate from configuration
- Resources copied to classpath automatically
- Easy to manage different file types

### 3. IDE Compatibility

All IDEs understand this structure:
- IntelliJ IDEA recognizes it immediately
- Eclipse imports it correctly
- VS Code works with it
- No IDE-specific configuration needed

### 4. Build Process

Maven's build process relies on this structure:
- \`mvn compile\` compiles \`src/main/java\`
- \`mvn test\` compiles and runs \`src/test/java\`
- \`mvn package\` packages \`src/main\` into JAR/WAR

## Real Example

Let's say you're building a web application:

\`\`\`
ecommerce-app
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ myshop
 ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductController.java
 ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductService.java
 ┃ ┃ ┃ ┃ ┃ ┣ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ Product.java
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┣ application.properties
 ┃ ┃ ┃ ┣ log4j.xml
 ┃ ┃ ┃ ┗ static
 ┃ ┃ ┃ ┃ ┣ css
 ┃ ┃ ┃ ┃ ┃ ┗ style.css
 ┃ ┃ ┃ ┃ ┗ images
 ┃ ┃ ┃ ┃ ┃ ┗ logo.png
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ myshop
 ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductServiceTest.java
 ┃ ┃ ┃ ┃ ┃ ┗ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductTest.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ test-data.properties
 ┣ target
 ┃ ┣ classes
 ┃ ┣ test-classes
 ┃ ┣ ecommerce-app-1.0.war
 ┃ ┗ surefire-reports
 ┗ pom.xml
\`\`\`

Notice:
- All Java code in \`src/main/java\` with proper package structure
- Configuration files in \`src/main/resources\`
- Test code mirrors the main code structure
- Build output in \`target\`

## Customizing the Structure

While Maven prefers the standard structure, you can customize it if needed:

\`\`\`xml
<build>
    <sourceDirectory>src/main/java</sourceDirectory>
    <testSourceDirectory>src/test/java</testSourceDirectory>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
</build>
\`\`\`

But honestly, you rarely need to do this. The standard structure works for 99% of projects.

## Common Mistakes

### Mistake 1: Putting Code in Wrong Location

**Wrong:**
\`\`\`
my-project
 ┣ src
 ┃ ┗ App.java  (WRONG - should be in src/main/java)
\`\`\`

**Correct:**
\`\`\`
my-project
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┗ java
 ┃ ┃ ┃ ┗ App.java
\`\`\`

### Mistake 2: Mixing Test and Main Code

**Wrong:**
\`\`\`
src/main/java
 ┣ App.java
 ┗ AppTest.java  (WRONG - tests should be in src/test/java)
\`\`\`

**Correct:**
\`\`\`
src/main/java/App.java
src/test/java/AppTest.java
\`\`\`

### Mistake 3: Committing target/ Directory

**Wrong:**
- Adding \`target/\` to version control

**Correct:**
- Add \`target/\` to \`.gitignore\`
- Maven recreates it on every build

## Summary

Maven's standard directory structure:
- **src/main/java** - Production Java code
- **src/main/resources** - Production resources
- **src/test/java** - Test Java code
- **src/test/resources** - Test resources
- **target/** - Build output (don't commit)
- **pom.xml** - Project configuration

Benefits:
- Consistent across all projects
- Works with all IDEs
- No configuration needed
- Easy to understand

Once you learn this structure, you can navigate any Maven project instantly. It's one of Maven's best features!

Next, let's learn about pom.xml - the file that makes it all work.

---

## 10 Important Maven Project Structure Interview Questions

1. **Where does production Java code live?**  
   All **real application** code goes under **\`src/main/java\`**. Inside that, you create folders that match your **package name**: for package \`com.example.order\`, the path is \`src/main/java/com/example/order/\`.  
   **Tests** (JUnit) go in **\`src/test/java\`** with the **same package structure** so you can test package-private code easily.  
   **Why separate?** Maven’s **Surefire** plugin looks only in \`test/java\` for tests. If you mix tests inside \`main\`, you confuse tools and may ship test code in production by mistake.

2. **What belongs in \`src/main/resources\`?**  
   Anything that is **not** \`.java\` but must sit on the **classpath** at runtime: **\`application.properties\`**, **\`application.yml\`**, **Hibernate** \`.xml\` mappings, **JSON** samples, **SQL** scripts, **logback.xml**, etc.  
   These files are **copied as-is** into the JAR/WAR (no compilation). **Interview tip:** “Resources = configuration and non-code assets the app reads from the classpath.”

3. **What is the \`target/\` directory?**  
   **\`target/\`** is Maven’s **scratch folder**: compiled \`.class\` files, packaged **\`.jar\`**, test reports, temporary files. It is **regenerated** every build.  
   Run **\`mvn clean\`** to delete \`target/\` when you suspect **old** class files are confusing you. **Never** commit \`target/\` to Git—add it to **\`.gitignore\`**.

4. **Why separate \`test\` resources?**  
   **\`src/test/resources\`** holds files **only for tests**: e.g. **H2** in-memory DB config, **mock** JSON, **logback-test.xml** with DEBUG logging.  
   Normal packaging puts **main** resources in the artifact; test resources **stay out** of the production JAR so you don’t ship test passwords or huge test data.

5. **What is the standard package-to-directory rule?**  
   Java requires: package \`com.example.app\` → folder path **\`com/example/app\`**. If you put a class in the wrong folder, the compiler or IDE says **“class … is public, should be declared in a file named …”** or **wrong package**.  
   **Always** match folder names to package dots (except the root \`java\` folder).

6. **Can you customize source directories?**  
   Technically **yes** (e.g. \`build-helper-maven-plugin\` or \`<sourceDirectory>\`), but **avoid** unless you inherit an old Ant layout. Custom paths break **onboarding**—everyone expects \`src/main/java\`.  
   **Fresher answer:** “Possible, but standard layout is preferred.”

7. **What is \`src/site\` for?**  
   Optional folder for **Maven Site**—generated project documentation (reports, Javadoc links). Many teams skip it and use **README**, **Wiki**, or **Swagger** instead.  
   You only need to know it exists for **interviews**; most junior projects won’t use it.

8. **How do multi-module projects look?**  
   Top folder has a **parent** \`pom.xml\` with **\`<modules>\`** listing subfolders like \`service-api\`, \`service-impl\`, \`web\`. Each subfolder has its own **\`src\`** and **child** \`pom.xml\`.  
   The **parent** might have **packaging \`pom\`** and **no** \`src\` at all—it only **coordinates** children.

9. **Why does Maven enforce layout?**  
   **Convention over configuration:** Compiler, Surefire, and JAR plugins **already know** where to look. Less XML, fewer mistakes. New developers **open any Maven repo** and instantly know where code lives.

10. **What happens if resources aren’t in \`resources\`?**  
    If you put a \`.properties\` file inside **\`src/main/java\`**, it might **not** be copied into the JAR unless you add special config. **Best practice:** put all non-Java files under **\`src/main/resources\`** in a path that mirrors the package if you want **\`ClassLoader.getResource\`** to find them predictably.

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

export default mavenProjectStructure;

