const mavenBestPractices = {
  id: 'maven-best-practices',
  title: 'Best Practices',
  description: 'Maven best practices for professional development',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven Best Practices

Following best practices makes your Maven projects maintainable, reliable, and professional. Here are the most important ones.

## 1. Use Specific Versions

**Bad:**
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>LATEST</version>  <!-- Don't do this -->
</dependency>
\`\`\`

**Good:**
\`\`\`xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.3.30</version>  <!-- Specific version -->
</dependency>
\`\`\`

**Why:**
- Predictable builds
- No surprises from version changes
- Reproducible builds
- Easier debugging

## 2. Use Properties for Versions

**Bad:**
\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.30</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.30</version>  <!-- Repeated version -->
    </dependency>
</dependencies>
\`\`\`

**Good:**
\`\`\`xml
<properties>
    <spring.version>5.3.30</spring.version>
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

**Why:**
- Update version in one place
- Consistent versions
- Easier maintenance

## 3. Use dependencyManagement

**For multi-module projects:**

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
    <!-- No version needed - from dependencyManagement -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
    </dependency>
</dependencies>
\`\`\`

**Why:**
- Centralized version management
- Consistent dependencies across modules
- Easier updates

## 4. Use Appropriate Scopes

**Good:**
\`\`\`xml
<dependencies>
    <!-- Runtime dependency -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Test-only dependency -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
    
    <!-- Provided dependency -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>servlet-api</artifactId>
        <version>2.5</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
\`\`\`

**Why:**
- Smaller final JAR/WAR
- Clearer dependencies
- Better performance

## 5. Keep Dependencies Updated

**Regularly:**
- Check for updates
- Update for security patches
- Test after updates
- Use tools like \`versions-maven-plugin\`

**Command:**
\`\`\`bash
mvn versions:display-dependency-updates
\`\`\`

**Why:**
- Security fixes
- Bug fixes
- New features
- Performance improvements

## 6. Remove Unused Dependencies

**Check regularly:**
\`\`\`bash
mvn dependency:analyze
\`\`\`

**Why:**
- Smaller builds
- Faster compilation
- Clearer dependencies
- Less confusion

## 7. Use Standard Directory Structure

**Follow Maven conventions:**
\`\`\`
src/main/java
src/main/resources
src/test/java
src/test/resources
\`\`\`

**Why:**
- Works with all IDEs
- No configuration needed
- Team members understand immediately
- Standard across projects

## 8. Specify Plugin Versions

**Bad:**
\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <!-- No version - uses default -->
</plugin>
\`\`\`

**Good:**
\`\`\`xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
</plugin>
\`\`\`

**Why:**
- Predictable builds
- Consistent behavior
- Avoid surprises from version changes

## 9. Use pluginManagement

**For multi-module projects:**

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

**Why:**
- Centralized plugin versions
- Consistent builds
- Easier maintenance

## 10. Set Java Version Explicitly

**Good:**
\`\`\`xml
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <java.version>17</java.version>
</properties>
\`\`\`

**Why:**
- Clear Java version requirement
- Consistent compilation
- Avoids version mismatches

## 11. Use Meaningful Artifact IDs

**Bad:**
\`\`\`xml
<artifactId>project1</artifactId>
<artifactId>my-app</artifactId>
\`\`\`

**Good:**
\`\`\`xml
<artifactId>user-service</artifactId>
<artifactId>payment-api</artifactId>
\`\`\`

**Why:**
- Self-documenting
- Easier to understand
- Better organization

## 12. Add Project Information

**Good:**
\`\`\`xml
<name>User Service</name>
<description>User management service for e-commerce platform</description>
<url>https://github.com/example/user-service</url>
\`\`\`

**Why:**
- Documentation
- Helps other developers
- Professional appearance

## 13. Use .gitignore

**Add to .gitignore:**
\`\`\`
target/
.m2/repository/
*.class
*.jar
*.war
\`\`\`

**Why:**
- Don't commit build artifacts
- Smaller repository
- Cleaner version control

## 14. Document Non-Obvious Configuration

**Good:**
\`\`\`xml
<!-- Using Java 17 for compatibility with Spring Boot 3.x -->
<properties>
    <java.version>17</java.version>
</properties>

<!-- Excluding old logging to use SLF4J -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
\`\`\`

**Why:**
- Future developers understand decisions
- Easier maintenance
- Prevents accidental changes

## 15. Use Clean Builds Regularly

**Command:**
\`\`\`bash
mvn clean install
\`\`\`

**Why:**
- Ensures fresh build
- Catches issues early
- Prevents stale artifacts

## 16. Run Tests Before Committing

**Command:**
\`\`\`bash
mvn clean test
\`\`\`

**Why:**
- Catch issues early
- Maintain code quality
- Prevent broken builds

## 17. Use Profiles for Different Environments

**Good:**
\`\`\`xml
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <env>development</env>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <env>production</env>
        </properties>
    </profile>
</profiles>
\`\`\`

**Why:**
- Different configurations per environment
- Flexible builds
- Environment-specific dependencies

## 18. Keep pom.xml Organized

**Structure:**
1. Model version
2. Parent (if any)
3. Group/artifact/version
4. Packaging
5. Properties
6. Dependency management
7. Dependencies
8. Build configuration

**Why:**
- Easier to read
- Consistent structure
- Faster navigation

## 19. Use Repositories Wisely

**Good:**
\`\`\`xml
<repositories>
    <repository>
        <id>spring-releases</id>
        <url>https://repo.spring.io/release</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
\`\`\`

**Why:**
- Control which repositories to use
- Faster builds (closer repositories)
- Security (trusted repositories)

## 20. Avoid SNAPSHOT in Production

**Bad:**
\`\`\`xml
<version>1.0.0-SNAPSHOT</version>  <!-- In production -->
\`\`\`

**Good:**
\`\`\`xml
<version>1.0.0</version>  <!-- Stable version -->
\`\`\`

**Why:**
- SNAPSHOT versions can change
- Unpredictable builds
- Use only for development

## Summary

Key best practices:
1. Use specific versions (not LATEST)
2. Use properties for versions
3. Use dependencyManagement for multi-module
4. Use appropriate scopes
5. Keep dependencies updated
6. Remove unused dependencies
7. Follow standard structure
8. Specify plugin versions
9. Set Java version explicitly
10. Use meaningful names
11. Add project information
12. Use .gitignore
13. Document configuration
14. Use clean builds
15. Run tests regularly
16. Use profiles for environments
17. Keep pom.xml organized
18. Use repositories wisely
19. Avoid SNAPSHOT in production

Following these practices makes your projects:
- More maintainable
- More reliable
- Easier to understand
- Professional quality

## Deep Understanding: Best Practices as Build Governance

Maven best practices are not style preferences; they are governance rules for reproducible software delivery.

A mature Maven project has predictable dependency resolution, explicit plugin behavior, stable Java/tool versions, and environment-aware configuration boundaries. Without these, builds become machine-dependent and release risk increases.

Best practices reduce entropy in long-lived projects:

- version drift is controlled,
- transitive dependency surprises are reduced,
- CI and local builds stay consistent,
- onboarding friction drops for new engineers.

Think of Maven best practices as reliability engineering for your build pipeline.

Remember: Good practices save time in the long run!

---

## 10 Important Maven Best Practices Interview Questions

1. **Why pin dependency and plugin versions explicitly?**  
   If versions **float**, today’s build might differ from tomorrow’s **without** a code change—**bugs** become **impossible** to reproduce.  
   **Best practice:** Use a **parent** or **BOM** so you **bump** versions in **one** place, but every build still resolves to **known** numbers.

2. **Why prefer \`dependencyManagement\` in parent for teams?**  
   Ten microservices **sharing** a library should **not** each pick a **different** Spring patch version.  
   **Parent** \`dependencyManagement\` means **one** upgrade path, **fewer** production surprises.

3. **What is the enforcer plugin used for?**  
   **maven-enforcer-plugin** **fails the build early** if rules break: e.g. “**JDK must be 17+**”, “**no SNAPSHOT** dependencies in **release** builds”, “**ban** known-bad library versions.”  
   **Why:** Catch mistakes in **CI** before they reach **production**.

4. **Why use \`.mvn/maven.config\` or \`jvm.config\`?**  
   Files **committed** in the repo (e.g. **\`.mvn/jvm.config\`** with **\`-Xmx512m\`**) give **every** developer the **same** JVM flags for Maven.  
   **Benefit:** Fewer “works on my machine” **OutOfMemory** issues.

5. **How do you handle secrets for deploy?**  
   Never put **passwords** in \`pom.xml\`. Use **\`<server id="nexus-releases">\`** in **\`~/.m2/settings.xml\`** with username/password, matching **\`distributionManagement\` id**.  
   **CI** injects credentials via **environment** or **secret store**—masked in logs.

6. **Why run \`mvn -ntp\` (no transfer progress) in CI?**  
   **\`-ntp\`** (no transfer progress) **reduces** **spam** lines when downloading dependencies—**cleaner** Docker/CI logs and **easier** to find **real** errors.

7. **What is a BOM and why import it?**  
   A **BOM** POM lists **compatible versions** for a **family** of libraries (e.g. **Jackson** modules). You **import** it once; dependencies **inherit** matching versions.  
   **Result:** Less **manual** version alignment and fewer **NoSuchMethodError** at runtime.

8. **Why avoid unused dependencies?**  
   Extra libraries **increase** download time, **confuse** readers (“why is this here?”), and **widen** the **security** surface (more CVEs to track).  
   Run **\`mvn dependency:analyze\`** occasionally and **remove** dead deps.

9. **How do profiles help environments?**  
   **Profiles** switch **configuration** without duplicating whole POMs: e.g. **\`-Pdev\`** activates **H2** database properties; **\`-Pprod\`** uses **PostgreSQL**.  
   **Caution:** Don’t hide **critical** differences—document which profile **CI** uses.

10. **What is \`flatten-maven-plugin\` for CI-friendly versions?**  
    Teams use **\`\${revision}\`** in POMs for **one** version variable across modules. **Flatten** rewrites the **installed** POM so published artifacts show a **plain** version string (e.g. **1.2.3**) for **consumers** who don’t understand **CI placeholders**.

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

export default mavenBestPractices;

