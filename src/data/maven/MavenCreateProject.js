const mavenCreateProject = {
  id: 'maven-create-project',
  title: 'Create Maven Project',
  description: 'Learn different ways to create a new Maven project',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Create Maven Project

There are several ways to create a Maven project. Let's explore the most common methods, from command line to IDE-based approaches.

## Method 1: Using Maven Archetype (Command Line)

Maven archetypes are project templates. They generate a project structure with sample code.

### Basic Command

\`\`\`bash
mvn archetype:generate
\`\`\`

This command will:
1. Show you a list of available archetypes
2. Ask you to choose one
3. Ask for project details
4. Generate the project structure

### Quick Start (Non-Interactive)

To skip the interactive prompts:

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
\`\`\`

This creates a project with:
- **groupId**: \`com.example\`
- **artifactId**: \`my-app\`
- **Archetype**: \`maven-archetype-quickstart\` (basic Java project)

### What You Get

After running the command, you'll have:

\`\`\`
my-app
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ AppTest.java
 ┃ ┃ ┗ resources
 ┣ pom.xml
 ┗ target
\`\`\`

### Common Archetypes

**maven-archetype-quickstart**
- Basic Java project
- Good for learning
- Command: \`-DarchetypeArtifactId=maven-archetype-quickstart\`

**maven-archetype-webapp**
- Web application project
- Creates WAR packaging
- Command: \`-DarchetypeArtifactId=maven-archetype-webapp\`

**spring-boot-archetype**
- Spring Boot project
- Command: \`-DarchetypeArtifactId=spring-boot-archetype\`

## Method 2: Using IntelliJ IDEA

IntelliJ IDEA has excellent Maven support built-in.

### Steps:

1. **File → New → Project**

2. **Select "Maven"** from the left sidebar

3. **Configure Project:**
   - **Name**: Your project name
   - **Location**: Where to create the project
   - **GroupId**: \`com.example\`
   - **ArtifactId**: \`my-app\`
   - **Version**: \`1.0-SNAPSHOT\`

4. **Click "Create"**

5. IntelliJ will:
   - Create the project structure
   - Generate pom.xml
   - Set up Maven integration
   - Download dependencies automatically

### Benefits:
- Visual interface
- Automatic Maven integration
- Built-in terminal for Maven commands
- Dependency management UI

## Method 3: Using Eclipse

Eclipse also supports Maven projects.

### Steps:

1. **File → New → Other**

2. **Maven → Maven Project**

3. **Select Archetype:**
   - Choose \`maven-archetype-quickstart\` for basic project
   - Or \`maven-archetype-webapp\` for web project

4. **Configure Project:**
   - **Group Id**: \`com.example\`
   - **Artifact Id**: \`my-app\`
   - **Version**: \`1.0-SNAPSHOT\`

5. **Click "Finish"**

### Note:
Eclipse requires M2Eclipse plugin. Most modern Eclipse versions include it.

## Method 4: Using VS Code

VS Code can work with Maven projects too.

### Steps:

1. **Install Extensions:**
   - "Extension Pack for Java" (includes Maven support)

2. **Create Project:**
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Java: Create Java Project"
   - Select "Maven" as build tool
   - Choose archetype
   - Enter project details

3. **Or Create Manually:**
   - Create folder structure
   - Create pom.xml
   - VS Code will recognize it

## Method 5: Manual Creation

You can also create a Maven project manually:

### Steps:

1. **Create Project Directory:**
   \`\`\`bash
   mkdir my-app
   cd my-app
   \`\`\`

2. **Create Directory Structure:**
   \`\`\`bash
   mkdir -p src/main/java/com/example
   mkdir -p src/main/resources
   mkdir -p src/test/java/com/example
   mkdir -p src/test/resources
   \`\`\`

3. **Create pom.xml:**
   \`\`\`xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
       
       <groupId>com.example</groupId>
       <artifactId>my-app</artifactId>
       <version>1.0-SNAPSHOT</version>
       
       <properties>
           <maven.compiler.source>17</maven.compiler.source>
           <maven.compiler.target>17</maven.compiler.target>
       </properties>
   </project>
   \`\`\`

4. **Create a Java Class:**
   \`\`\`java
   // src/main/java/com/example/App.java
   package com.example;
   
   public class App {
       public static void main(String[] args) {
           System.out.println("Hello Maven!");
       }
   }
   \`\`\`

5. **Test It:**
   \`\`\`bash
   mvn compile
   mvn exec:java -Dexec.mainClass="com.example.App"
   \`\`\`

## Which Method to Use?

**Command Line (archetype):**
- Fast and simple
- Good for learning
- Works everywhere
- No IDE needed

**IntelliJ IDEA:**
- Best IDE experience
- Great for beginners
- Automatic setup
- Visual dependency management

**Eclipse:**
- Free and open source
- Good Maven support
- Popular in enterprise

**VS Code:**
- Lightweight
- Good for small projects
- Free

**Manual:**
- Full control
- Good for understanding structure
- Time-consuming

## Verifying Your Project

After creating a project, verify it works:

\`\`\`bash
# Navigate to project directory
cd my-app

# Compile the project
mvn compile

# Run tests
mvn test

# Package the project
mvn package

# Run the application (if you have exec plugin)
mvn exec:java -Dexec.mainClass="com.example.App"
\`\`\`

## Common Issues

### Issue 1: "mvn: command not found"

**Solution:** Maven is not in your PATH. Check Maven installation.

### Issue 2: Archetype not found

**Solution:** Maven needs to download archetypes. Make sure you have internet connection. First run might take time.

### Issue 3: Project created but can't compile

**Solution:** 
- Check Java version matches pom.xml
- Verify directory structure is correct
- Check pom.xml syntax

### Issue 4: IDE doesn't recognize Maven project

**Solution:**
- In IntelliJ: Right-click pom.xml → "Add as Maven Project"
- In Eclipse: Right-click project → "Configure" → "Convert to Maven Project"
- In VS Code: Reload window or install Java extensions

## Next Steps

After creating your project:
1. Explore the generated pom.xml
2. Understand the directory structure
3. Add your first dependency
4. Write some code
5. Build and run the project

## Summary

Ways to create Maven project:
- **Command line**: \`mvn archetype:generate\` - Fast, works everywhere
- **IntelliJ**: Visual interface, best IDE experience
- **Eclipse**: Free, good Maven support
- **VS Code**: Lightweight, good for small projects
- **Manual**: Full control, educational

Choose the method that works best for you. For beginners, I recommend starting with IntelliJ or the command line archetype.

Once you have a project, let's learn about Maven's build lifecycle!

---

## 10 Important Creating Maven Projects Interview Questions

1. **What is a Maven Archetype?**  
   An **archetype** is a **blueprint project**. When you run **\`mvn archetype:generate\`**, Maven downloads a template and creates folders + a starter \`pom.xml\` + sample Java files.  
   Think of it as **“File → New Project”** on the command line. There are archetypes for **plain Java**, **web apps**, **Spring**, etc.

2. **How do you create a project non-interactively?**  
   Add **\`-B\`** (batch mode) so Maven **does not ask** questions in the terminal. Pass everything with **\`-D\` flags**: \`-DgroupId=com.example\`, \`-DartifactId=demo\`, \`-DarchetypeArtifactId=maven-archetype-quickstart\`, etc.  
   **Why:** CI servers **cannot** answer interactive prompts.

3. **What is \`archetypeArtifactId=quickstart\`?**  
   **\`maven-archetype-quickstart\`** is the **simplest** Java project: one \`App.java\`, one JUnit test, standard \`src/main/java\` layout.  
   For **servlets**, people often start from **\`maven-archetype-webapp\`** or use **Spring Initializr** (which also produces Maven projects).

4. **How do IDEs create Maven projects?**  
   IntelliJ / Eclipse / VS Code can **generate** the same \`pom.xml\` and folders. The IDE then **imports** the Maven model.  
   **You should still check:** Java version in POM matches **JDK** installed; **parent** and **dependencies** match **company** standards (don’t ship a homework project with wrong Spring version).

5. **What is \`mvnw\` / Maven Wrapper generation?**  
   Run **\`mvn -N wrapper:wrapper\`** (or use Spring Initializr which includes it). This adds **\`mvnw\`**, **\`mvnw.cmd\`**, and **\`.mvn/wrapper/\`**.  
   **Benefit:** Everyone uses the **same Maven version** from the repo—no “works on my machine” because of different global Maven installs.

6. **Can you convert a non-Maven project?**  
   Yes, step by step: create **\`pom.xml\`**, move \`.java\` files into **\`src/main/java\`** with correct packages, move config files to **\`src/main/resources\`**, add **\`<dependencies>\`** for libraries you used to keep in \`lib/\`, then run **\`mvn verify\`** and fix errors.  
   Large legacy apps may need **build-helper** or gradual migration.

7. **What is \`packaging\` in a new project?**  
   **\`jar\`:** default; builds a **\`.jar\`** (CLI tool, library, or Spring Boot executable JAR).  
   **\`war\`:** builds a **\`.war\`** for deployment to **Tomcat** / **JBoss**.  
   **\`pom\`:** this project **only aggregates** other modules—**no** main artifact.

8. **Why might first \`mvn\` run be slow?**  
   Maven must **download** the **compiler plugin**, **Surefire**, and **every dependency** (Spring can pull **100+** JARs). All of that is cached under **\`~/.m2/repository\`**.  
   Behind a **corporate firewall**, you may need a **mirror** in **\`settings.xml\`**.

9. **What is \`modelVersion\` in POM?**  
   Almost always **\`4.0.0\`**—this is the **XML schema version** for Maven 3.x POM files. It must be the **first** thing inside \`<project>\` (after the XML header).

10. **How do you validate a new POM?**  
    Run **\`mvn validate\`**—checks POM structure. IDEs underline XML errors. For **stricter** checks, teams add **maven-enforcer-plugin** (JDK version, banned dependencies, etc.).

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

export default mavenCreateProject;

