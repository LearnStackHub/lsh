const mavenRepositories = {
  id: 'maven-repositories',
  title: 'Maven Repositories',
  description: 'Understand how Maven stores and retrieves dependencies',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven Repositories

Maven repositories are places where Maven stores and retrieves dependencies (JAR files). Understanding repositories is essential for working with Maven effectively.

## What is a Repository?

A **repository** is a storage location for Maven artifacts (JAR files, WAR files, etc.). Think of it as a library where Maven can find and download the libraries your project needs.

When you declare a dependency in pom.xml, Maven looks for it in repositories. If found, it downloads it automatically.

## Types of Repositories

Maven uses three types of repositories:

### 1. Local Repository

**Location:** \`~/.m2/repository\` (on your computer)

**Purpose:**
- Stores all dependencies downloaded by Maven
- Caches dependencies for faster builds
- Shared across all Maven projects on your machine

**How it works:**
1. First time you use a dependency, Maven downloads it
2. Stores it in local repository
3. Next time, Maven uses the cached version
4. Much faster than downloading every time

**Example path:**
\`\`\`
C:\\Users\\YourName\\.m2\\repository\\
  ┣ org\\
  ┃ ┗ springframework\\
  ┃ ┃ ┗ spring-core\\
  ┃ ┃ ┃ ┣ 5.3.30\\
  ┃ ┃ ┃ ┃ ┗ spring-core-5.3.30.jar
\`\`\`

**Benefits:**
- Fast - no need to download repeatedly
- Offline builds possible (if dependencies already cached)
- Shared across projects

### 2. Central Repository

**Location:** https://repo1.maven.org/maven2/

**Purpose:**
- Maven's default public repository
- Contains millions of open-source libraries
- Maintained by Maven community

**How it works:**
1. When you declare a dependency, Maven first checks local repository
2. If not found locally, Maven downloads from Central Repository
3. Stores in local repository for future use

**What's in it:**
- Spring Framework
- Apache Commons
- JUnit
- Log4j
- Hibernate
- And thousands more...

**Access:**
- Public and free
- No authentication needed
- Available to everyone

### 3. Remote Repository

**Location:** Custom (company server, private repository, etc.)

**Purpose:**
- Company-specific libraries
- Private/internal dependencies
- Custom builds not in Central Repository

**Types:**
- **Private Repository** - Company's internal Maven repository
- **Third-party Repository** - Like JCenter, Spring Repository
- **Public Repository** - Like Maven Central

## Repository Configuration

### Default Behavior

By default, Maven uses:
1. Local repository (\`~/.m2/repository\`)
2. Central Repository (https://repo1.maven.org/maven2/)

No configuration needed for these.

### Adding Remote Repository

To use a remote repository, add it to pom.xml:

\`\`\`xml
<repositories>
    <repository>
        <id>spring-releases</id>
        <name>Spring Releases</name>
        <url>https://repo.spring.io/release</url>
    </repository>
</repositories>
\`\`\`

**Common remote repositories:**

**Spring Repository:**
\`\`\`xml
<repository>
    <id>spring-releases</id>
    <url>https://repo.spring.io/release</url>
</repository>
\`\`\`

**JBoss Repository:**
\`\`\`xml
<repository>
    <id>jboss-public</id>
    <url>https://repository.jboss.org/nexus/content/groups/public/</url>
</repository>
\`\`\`

### Repository Order

Maven checks repositories in this order:
1. Local repository
2. Repositories in pom.xml (in order listed)
3. Central repository (if not found elsewhere)

## Repository Resolution Process

When Maven needs a dependency, here's what happens:

1. **Check Local Repository**
   - Looks in \`~/.m2/repository\`
   - If found, uses it (fast!)

2. **Check Remote Repositories**
   - Checks repositories listed in pom.xml
   - Downloads if found

3. **Check Central Repository**
   - Last resort
   - Downloads if found

4. **Error if Not Found**
   - If dependency not found anywhere, build fails
   - Error message shows where Maven looked

## Local Repository Management

### View Local Repository

**Location:**
- Windows: \`C:\\Users\\YourName\\.m2\\repository\`
- Mac/Linux: \`~/.m2/repository\`

**Structure:**
\`\`\`
repository/
 ┣ com/
 ┃ ┗ example/
 ┃ ┃ ┗ my-library/
 ┃ ┃ ┃ ┣ 1.0.0/
 ┃ ┃ ┃ ┃ ┣ my-library-1.0.0.jar
 ┃ ┃ ┃ ┃ ┣ my-library-1.0.0.pom
 ┃ ┃ ┃ ┃ ┗ my-library-1.0.0.jar.sha1
 ┃ ┃ ┃ ┗ 1.1.0/
 ┃ ┃ ┃ ┃ ┗ ...
 ┃ ┗ springframework/
 ┃ ┃ ┗ spring-core/
 ┃ ┃ ┃ ┗ 5.3.30/
 ┃ ┃ ┃ ┃ ┗ spring-core-5.3.30.jar
\`\`\`

### Clear Local Repository

Sometimes you need to clear corrupted downloads:

**Delete specific dependency:**
\`\`\`bash
# Delete Spring Core
rm -rf ~/.m2/repository/org/springframework/spring-core
\`\`\`

**Delete entire repository:**
\`\`\`bash
# Delete everything (Maven will re-download)
rm -rf ~/.m2/repository
\`\`\`

**Note:** This forces Maven to re-download all dependencies. Use only if necessary.

## Repository Mirrors

A **mirror** is an alternative location for a repository. Useful for:
- Faster downloads (closer server)
- Internal company mirrors
- Backup repositories

**Configure in \`~/.m2/settings.xml\`:**

\`\`\`xml
<settings>
    <mirrors>
        <mirror>
            <id>aliyun-maven</id>
            <mirrorOf>central</mirrorOf>
            <name>Aliyun Maven</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
    </mirrors>
</settings>
\`\`\`

This makes Maven use Aliyun mirror instead of Central Repository (useful in some regions).

## Private Repositories

For company projects, you might need private repositories:

### Nexus Repository Manager

Popular private repository manager:
- Host your own Maven repository
- Control access
- Cache external dependencies
- Manage releases

### Artifactory

Another popular option:
- Similar to Nexus
- Good for large organizations
- Supports multiple package types

### Configuration for Private Repository

\`\`\`xml
<repositories>
    <repository>
        <id>company-repo</id>
        <name>Company Repository</name>
        <url>https://repo.company.com/maven</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
\`\`\`

**With Authentication:**

Configure in \`~/.m2/settings.xml\`:

\`\`\`xml
<settings>
    <servers>
        <server>
            <id>company-repo</id>
            <username>your-username</username>
            <password>your-password</password>
        </server>
    </servers>
</settings>
\`\`\`

## Common Issues

### Issue 1: Dependency Not Found

**Error:**
\`\`\`
Could not find artifact com.example:my-lib:jar:1.0.0
\`\`\`

**Solutions:**
- Check dependency coordinates (groupId:artifactId:version)
- Verify repository URL is correct
- Check internet connection
- Try clearing local repository

### Issue 2: Slow Downloads

**Problem:** Central Repository is slow in your region.

**Solution:** Use a mirror closer to you:
\`\`\`xml
<mirror>
    <id>aliyun-maven</id>
    <mirrorOf>central</mirrorOf>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
\`\`\`

### Issue 3: Authentication Required

**Problem:** Private repository requires login.

**Solution:** Configure credentials in \`settings.xml\` (not pom.xml for security).

## Best Practices

1. **Don't commit local repository**
   - \`.m2/repository\` should not be in version control
   - Maven will download dependencies automatically

2. **Use mirrors for speed**
   - Configure mirrors in \`settings.xml\` for faster downloads

3. **Cache dependencies**
   - Local repository caches dependencies
   - Speeds up builds significantly

4. **Use private repositories for internal libraries**
   - Don't publish internal code to Central Repository
   - Use company repository instead

5. **Keep credentials secure**
   - Store in \`settings.xml\` (not pom.xml)
   - Don't commit \`settings.xml\` with passwords

## Summary

Maven uses three types of repositories:
- **Local** - \`~/.m2/repository\` (on your machine)
- **Central** - https://repo1.maven.org/maven2/ (public)
- **Remote** - Custom repositories (company, private, etc.)

Repository resolution order:
1. Local repository
2. Remote repositories (from pom.xml)
3. Central repository

Key points:
- Local repository caches dependencies for speed
- Central Repository has millions of libraries
- Remote repositories for private/company libraries
- Mirrors can speed up downloads

Understanding repositories helps you:
- Troubleshoot dependency issues
- Configure private repositories
- Optimize build performance

Next, let's learn about dependency management!

---

## 10 Important Maven Repositories Interview Questions

1. **What is the local repository?**  
   When Maven downloads a library the first time, it stores a **copy** on your computer under **\`~/.m2/repository\`** (Windows: \`C:\\Users\\You\\.m2\\repository\`).  
   Next builds **reuse** the cache—**faster** and works **offline** (if everything was already downloaded).  
   If a file is **corrupt**, you can delete that folder under \`.m2\` and Maven will **re-download**. **Do not** treat \`.m2\` as project backup.

2. **What is Maven Central?**  
   **Maven Central** is the **default public** server where most **open-source** Java libraries are published. When your \`pom.xml\` lists a dependency, Maven looks up **Central** (unless your company **mirrors** it).  
   You rarely add Central by hand—it is **built in**—but you must have **internet** (or a mirror) the first time.

3. **What is a remote repository in \`pom.xml\`?**  
   Sometimes a JAR is **not** on Central (older **JBoss**, **private** company libs). Then you add **\`<repositories>\`** with a **URL**. **Plugin** JARs use **\`<pluginRepositories>\`**.  
   **Fresher note:** Company **Nexus** often replaces many remotes with **one internal URL**.

4. **What is a mirror in \`settings.xml\`?**  
   A **mirror** **redirects** requests: instead of every developer hitting the public internet, everyone hits **company Nexus** (faster, **cached**, **audited**).  
   **\`mirrorOf\`** can be \`central\` or \`*\` (everything—use carefully). Admins set this; you just need to know **why** builds use an internal URL.

5. **What is a SNAPSHOT version?**  
   **\`1.0.0-SNAPSHOT\`** means “**still under development**”—the JAR can **change** day to day. Maven may **check again** for newer snapshots.  
   **\`1.0.0\`** (no SNAPSHOT) is a **release**: **immutable**—you should always get the **same** bits. **Production** should depend on **releases**, not snapshots.

6. **How does artifact resolution order work?**  
   **Step 1:** Look in **local** \`.m2\`. **Step 2:** If missing, download from **repositories** listed in POM + **settings** + **parent** POMs. **Step 3:** Usually ends at **Central** or your **mirror**.  
   Understanding this helps when Maven says **“cannot find artifact”**—wrong version, repo blocked, or typo in coordinates.

7. **What is \`distributionManagement\`?**  
   When you run **\`mvn deploy\`**, Maven needs **where to upload** your built JAR (snapshots vs releases URLs). That’s **\`<distributionManagement>\`** in \`pom.xml\`.  
   **Passwords** are **not** stored in POM—use **\`<server>\`** in **\`settings.xml\`** with the **same id** as in distributionManagement.

8. **Why might builds fail with “Could not transfer artifact”?**  
   Common causes: **no network**, **VPN** off, **wrong** repository URL, **SSL** certificate problems (corporate proxy), or **401** (bad username for private repo).  
   **Fix path:** Run **\`mvn -X\`** for details, verify **\`settings.xml\`** proxy/credentials, try the URL in a browser (if allowed).

9. **What is a private / hosted repository manager?**  
   Products like **Sonatype Nexus** or **JFrog Artifactory** sit **inside** the company. They **cache** Maven Central (speed), **host** internal \`com.mycompany:...\` artifacts, and **scan** for security issues.  
   **Interview:** “Private repo = control + speed + compliance.”

10. **Should you commit \`~/.m2\` to Git?**  
    **No.** It can be **gigabytes** and is **machine-specific**. You only commit **\`pom.xml\`**, **wrapper** files, and source. Anyone can run Maven to **rebuild** the same cache.

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

export default mavenRepositories;

