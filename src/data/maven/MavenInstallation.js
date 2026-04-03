const mavenInstallation = {
  id: 'maven-installation',
  title: 'Install Maven',
  description: 'Step-by-step guide to install Maven on Windows, Mac, and Linux',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Install Maven

Before you can use Maven, you need to install it on your computer. This tutorial will guide you through the installation process on Windows, Mac, and Linux.

## Prerequisites

Maven requires Java to be installed. Maven is a Java application, so it needs the Java Development Kit (JDK) to run.

### Step 1: Check Java Installation

First, verify that Java is installed on your system:

\`\`\`bash
java -version
\`\`\`

You should see output like:

\`\`\`
java version "17.0.1" 2021-10-19 LTS
Java(TM) SE Runtime Environment (build 17.0.1+12-LTS-39)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+12-LTS-39, mixed mode, sharing)
\`\`\`

**If Java is not installed:**
- Download JDK from Oracle or use OpenJDK
- Java 8 or higher is recommended (Java 11 or 17 is ideal)
- Install it and set JAVA_HOME environment variable

## Step 2: Download Maven

1. Go to the official Maven website: https://maven.apache.org/download.cgi

2. Download the **Binary zip archive** (apache-maven-X.X.X-bin.zip)
   - Don't download the source code version
   - Get the latest stable version (3.9.x or 3.8.x)

3. The file will be something like: \`apache-maven-3.9.5-bin.zip\`

## Step 3: Extract Maven

Extract the downloaded zip file to a location on your computer.

**Recommended locations:**
- **Windows:** \`C:\\Program Files\\Apache\\Maven\`
- **Mac/Linux:** \`/usr/local/apache-maven\` or \`/opt/maven\`

After extraction, you should have a folder like:
- \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\`

## Step 4: Set Environment Variables

Maven needs to know where it's installed, and your system needs to know where to find Maven commands.

### Windows Installation

1. **Set MAVEN_HOME:**
   - Right-click "This PC" or "My Computer"
   - Select "Properties"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", click "New"
   - Variable name: \`MAVEN_HOME\`
   - Variable value: \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\`
   - Click "OK"

2. **Add Maven to PATH:**
   - In the same "Environment Variables" window
   - Find "Path" in System variables
   - Click "Edit"
   - Click "New"
   - Add: \`%MAVEN_HOME%\\bin\`
   - Click "OK" on all windows

3. **Verify Installation:**
   - Open a **new** Command Prompt (important - close and reopen)
   - Run: \`mvn -version\`

### Mac Installation

1. **Extract Maven:**
   \`\`\`bash
   sudo tar -xzf apache-maven-3.9.5-bin.tar.gz -C /usr/local
   \`\`\`

2. **Set Environment Variables:**
   
   Edit your shell profile file:
   - For Bash: \`~/.bash_profile\` or \`~/.bashrc\`
   - For Zsh: \`~/.zshrc\`
   
   Add these lines:
   \`\`\`bash
   export MAVEN_HOME=/usr/local/apache-maven-3.9.5
   export PATH=$MAVEN_HOME/bin:$PATH
   \`\`\`

3. **Reload your profile:**
   \`\`\`bash
   source ~/.bash_profile
   # or
   source ~/.zshrc
   \`\`\`

4. **Verify Installation:**
   \`\`\`bash
   mvn -version
   \`\`\`

### Linux Installation

1. **Extract Maven:**
   \`\`\`bash
   sudo tar -xzf apache-maven-3.9.5-bin.tar.gz -C /opt
   \`\`\`

2. **Set Environment Variables:**
   
   Edit \`~/.bashrc\` or \`~/.profile\`:
   \`\`\`bash
   export MAVEN_HOME=/opt/apache-maven-3.9.5
   export PATH=$MAVEN_HOME/bin:$PATH
   \`\`\`

3. **Reload your profile:**
   \`\`\`bash
   source ~/.bashrc
   \`\`\`

4. **Verify Installation:**
   \`\`\`bash
   mvn -version
   \`\`\`

## Step 5: Verify Installation

After setting up environment variables, verify that Maven is installed correctly:

\`\`\`bash
mvn -version
\`\`\`

You should see output like:

\`\`\`
Apache Maven 3.9.5 (c8d5c9b17484f4a8d3f2954461459fd5d32a959e)
Maven home: C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5
Java version: 17.0.1, vendor: Oracle Corporation
Java home: C:\\Program Files\\Java\\jdk-17.0.1
Default locale: en_US, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
\`\`\`

If you see this output, congratulations! Maven is installed correctly.

## Troubleshooting

### Problem: "mvn is not recognized as an internal or external command"

**Solution:**
- Make sure you closed and reopened your terminal/command prompt after setting environment variables
- Verify that MAVEN_HOME is set correctly
- Verify that %MAVEN_HOME%\\bin is in your PATH
- On Windows, check both User and System environment variables

### Problem: "JAVA_HOME is not set"

**Solution:**
- Set JAVA_HOME environment variable pointing to your JDK installation
- Example: \`C:\\Program Files\\Java\\jdk-17\`
- Make sure JAVA_HOME points to JDK, not JRE

### Problem: "Maven version shows but can't run Maven commands"

**Solution:**
- Check that the Maven bin directory is in your PATH
- Try using the full path: \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\\bin\\mvn.cmd -version\`

### Problem: Permission denied (Mac/Linux)

**Solution:**
- Make sure Maven directory has correct permissions
- You might need to use \`sudo\` for installation
- Check that the bin directory is executable: \`chmod +x $MAVEN_HOME/bin/mvn\`

## Alternative: Using Package Managers

### Mac (Homebrew)

\`\`\`bash
brew install maven
\`\`\`

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo apt update
sudo apt install maven
\`\`\`

### Linux (CentOS/RHEL)

\`\`\`bash
sudo yum install maven
\`\`\`

Using package managers is easier, but you might get an older version. Manual installation gives you the latest version.

## What's Next?

Now that Maven is installed, you're ready to:
1. Create your first Maven project
2. Understand Maven project structure
3. Work with pom.xml

Let's move to the next tutorial and create a Maven project!

---

## 10 Important Maven Installation Interview Questions

1. **What do you need installed before Maven?**  
   Maven itself is **written in Java**, so you need a **JDK** (Java Development Kit)—not only a **JRE** (runtime). The JDK includes **\`javac\`** (compiler) which Maven calls through plugins.  
   **Check:** Open terminal and run \`java -version\` and \`javac -version\`. If \`javac\` is not found, install a full JDK (e.g. Temurin 17). Your project’s \`pom.xml\` should use a **matching** Java version (e.g. Java 17).

2. **What is \`MAVEN_HOME\` / \`M2_HOME\`?**  
   After you unzip Maven, you get a folder like \`apache-maven-3.9.6\`. **MAVEN_HOME** (older name **M2_HOME**) should point to **that folder**—the place that contains the **\`bin\`** subfolder.  
   You must add **\`%MAVEN_HOME%\\bin\`** (Windows) or **\`$MAVEN_HOME/bin\`** (Mac/Linux) to your **PATH** so typing \`mvn\` works in any folder. If \`mvn\` is “not recognized,” PATH is wrong.

3. **How do you verify Maven installed correctly?**  
   Run: \`mvn -v\`  
   Good output shows: **Maven version** (e.g. 3.9.x), **Java version** Maven is using, and **OS**.  
   If **Java version** looks wrong (e.g. Java 8 when you need 17), fix **JAVA_HOME** to point to the correct JDK folder.

4. **Why set \`JAVA_HOME\`?**  
   **JAVA_HOME** is an environment variable pointing to your **JDK root** (folder that contains \`bin/java\`). Maven **forks** new Java processes for compiling and testing; they read **JAVA_HOME**.  
   If JAVA_HOME is empty or points to a **JRE** only, you may see errors like **“invalid target release”** or wrong bytecode version.

5. **What is the difference between installing via archive vs package manager?**  
   **Manual zip from Apache:** You choose **exact** Maven version; good for matching **company standard**.  
   **brew install maven / apt install maven:** Very fast, but version might be **older** than the website.  
   **For CI Docker images:** Teams often **pin** one Maven + one JDK version so builds never change accidentally.

6. **Where is user-level Maven config?**  
   File: **\`~/.m2/settings.xml\`** (Windows: \`C:\\Users\\YourName\\.m2\\settings.xml\`). You can add **mirrors** (company proxy), **servers** (username/password for private repo—**never** commit passwords to Git), and **profiles**.  
   If the file **does not exist**, you can create it. Project-specific stuff stays in **\`pom.xml\`**; **secrets** stay in **settings.xml** or CI variables.

7. **Can multiple Maven versions coexist?**  
   Yes. Install different versions in different folders and **change PATH** when needed, or use tools like **SDKMAN** (Linux/Mac).  
   Best practice for **teams:** use **Maven Wrapper** (\`mvnw\` / \`mvnw.cmd\`) so the **project** stores which Maven version to use—no arguing.

8. **What is the Maven Wrapper (\`mvnw\`)?**  
   Small scripts (\`mvnw\` on Unix, \`mvnw.cmd\` on Windows) that **download** the **exact** Maven version listed in the project (first run may download).  
   **Benefit:** New developer clones repo and runs \`./mvnw clean install\` **without** installing Maven globally. **CI** uses the same file—**zero** version mismatch.

9. **Common install issue: \`mvn\` not found?**  
   **Cause 1:** PATH does not include Maven’s \`bin\`.  
   **Cause 2:** Typo in **MAVEN_HOME**.  
   **Windows:** Close and reopen **terminal** after changing environment variables.  
   **Fix:** Run full path once: \`C:\\\\path\\\\to\\\\maven\\\\bin\\\\mvn -v\` to confirm Maven works, then fix PATH.

10. **Should Maven run as root?**  
    **No** on your laptop. Run as **your user** so the \`.m2\` folder **owns** downloaded files. Running as root can create **permission** problems later. On **CI**, use a normal **service account**, not root, unless your admin requires it.

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

export default mavenInstallation;

