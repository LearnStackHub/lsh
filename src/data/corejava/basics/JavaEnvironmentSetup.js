const javaEnvironmentSetup = {
  id: 'java-environment-setup',
  title: 'Java Environment Setup',
  description: 'Installing and configuring Java on your computer',
  images: {
    jdkVsJre: 'https://imgs.search.brave.com/0e1FT4aq2FPioFkxFYLAHZdFvvhEYjrBdHjDZ0fW7Oc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOTExMjEx/OTIzNDIvanZtLmpw/Zw',
    adoptiumDownload: 'https://imgs.search.brave.com/3tq--a5IlLT_mSPJNmGxhlV3xUEAOBRPlf0RNFh_jXA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG9w/dGl1bS5uZXQvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDkv/YWRvcHRpdW0taG9t/ZXBhZ2Uud2VicA',
    windowsEnvVars: 'https://imgs.search.brave.com/Qs9fcaWH1o9Z8LTTy5o6KGRfwsPRg8dCLQjJWCbROo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGVjaGV4/cGVydC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMDUv/U2V0dGluZy1FbnZp/cm9ubWVudC1WYXJp/YWJsZXMtaW4tV2lu/ZG93cy0xMC5wbmc_/cmVzaXplPTEwMjQs/NTc2',
    intellijIDE: 'https://imgs.search.brave.com/1FR1-5L_wJLBBFVbPTlWWmx3P7C8XGEQmfQSzMzX0tU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMuamV0YnJh/aW5zLmNvbS9zdG9y/YWdlL3Byb2R1Y3Rz/L2ludGVsbGlqLWlk/ZWEvd2hhdC1pcy1p/bnRlbGxpai1pZGVh/L2ludGVsbGlqLWlk/ZWEtb3ZlcnZpZXcu/cG5n',
    terminalVerify: 'https://imgs.search.brave.com/m9xpJdJHb8VaxwEYoFQDhHWlq7XRKivP5OtlMtdLFYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnN0/YWNrLmltZ3VyLmNv/bS9DblBVTS5wbmc',
    projectStructure: 'https://imgs.search.brave.com/Q1e6p-B3dkUlknqhYhkCAUj_VH6B9nOxsWR5FqAL72s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9E/aUxBRTM2SFNLMC9t/YXhyZXNkZWZhdWx0/LmpwZw',
  },
  content: `
# Setting Up Java — Let's Get Your Machine Ready!

Hey! Before we write any Java code, we need to install Java on your computer first. Think of it like this — before you can cook, you need a kitchen. Before you write Java, you need to set up your "Java kitchen" on your computer.

Don't worry, I'll walk you through it step by step. It takes about 10–15 minutes and you only do this once!

---

## What Are We Actually Installing?

You need just **two things**:

1. **JDK** — This is Java itself. Without this, nothing works.
2. **IDE** — This is where you'll type your code (like Microsoft Word, but for coding).

That's it. Let's start.

---

## JDK vs JRE vs JVM — What's the Difference?

This confuses everyone at first, so let me explain it simply with a real-life analogy.

Think of it like a **factory**:

| Term | Real-Life Analogy | What It Does |
|------|-------------------|--------------|
| **JVM** | The factory machine | Actually runs your Java program |
| **JRE** | Machine + raw materials | JVM + the libraries Java needs to run |
| **JDK** | Entire factory (machine + tools + engineer) | JRE + tools to write & compile Java |

![JDK vs JRE vs JVM diagram](jdkVsJre)

**Bottom line: You are a developer → You install JDK. Full stop.**

The JDK contains everything — JRE and JVM are already inside it.

\`\`\`
JDK (what you install)
├── JRE (comes inside JDK)
│   ├── JVM  ← actually runs your code
│   └── Core Libraries (built-in Java tools like Math, String, etc.)
├── javac  ← the compiler (turns your .java file into machine code)
├── jdb    ← debugger (helps find bugs)
└── jar, javadoc, and other helper tools
\`\`\`

---

## Step 1: Download JDK

There are multiple trusted places to download Java from. Use an official or widely trusted JDK provider, then pick the version your teacher, project, or company asks for. If no version is specified, use an LTS version such as Java 17 or Java 21.

| Download Option | Official Link | When It Fits |
|---|---|---|
| Oracle JDK | [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/) | Official Oracle installers, enterprise/lab setups, Oracle JDK users |
| OpenJDK Reference Builds | [jdk.java.net](https://jdk.java.net/) | Official OpenJDK builds, testing newer JDK releases |
| Eclipse Temurin by Adoptium | [adoptium.net](https://adoptium.net/) | Free OpenJDK distribution commonly used on developer machines and servers |
| Microsoft Build of OpenJDK | [microsoft.com/openjdk](https://www.microsoft.com/openjdk) | Windows/Azure-focused Java setups |
| Amazon Corretto | [aws.amazon.com/corretto](https://aws.amazon.com/corretto/) | AWS/server-side Java environments |

### Example Download Page: [adoptium.net](https://adoptium.net/)

![Adoptium download page](adoptiumDownload)

When you land on the page:
- It auto-detects your OS (Windows/Mac/Linux) — usually correct
- Select **Java 17** or **Java 21** (these are the latest stable versions)
- Click **"Latest LTS Release"** → Download

> **LTS means Long Term Support** — it gets security updates for years. Always pick LTS for learning and real projects.

> **Version note:** Avoid Java 8 or older versions for a new learning setup unless your teacher or company specifically asks for it. For modern learning, Java 17 or Java 21 LTS is usually expected.

If you use Oracle, Adoptium, Microsoft OpenJDK, or Amazon Corretto, download the installer for your operating system. If you use \`jdk.java.net\`, check whether the build is GA, early-access, or archive before installing.

---

## Step 2: Install JDK

### On Windows:
1. Open the downloaded **.msi** file (double-click it)
2. Click **Next → Next → Install** (defaults are fine)
3. When done, note the install path — usually something like:
   \`C:\\Program Files\\Java\\jdk-17\` or your selected provider's JDK folder

### On macOS:
1. Open the **.pkg** file
2. Follow the installer — it auto-configures everything
3. No extra steps needed on modern Macs!

### On Linux (Ubuntu/Debian):
Open terminal and run these two commands:
\`\`\`bash
sudo apt update
sudo apt install openjdk-17-jdk
\`\`\`

That's it — Linux installs and configures automatically.

---

## Step 3: Set Environment Variables (Windows Only)

> **Mac and Linux users — skip this step!** It's already done for you.

Windows users need to tell the system "hey, Java lives here!" This is called setting an **environment variable**. In real projects, tools like Maven, Gradle, IDEs, and CI pipelines use these settings to find the correct JDK instead of accidentally using an old Java version.

![Windows Environment Variables window](windowsEnvVars)

**Follow these steps carefully:**

1. Press **Windows key** → type **"Environment Variables"** → click **"Edit the system environment variables"**
2. Click the **"Environment Variables"** button at the bottom
3. Under **"System variables"**, find **Path** → click **Edit**
4. Click **New** → paste your JDK bin path, for example:
   \`C:\\Program Files\\Java\\jdk-17\\bin\`
5. Click **OK** on all windows

**Also create JAVA_HOME:** this points development tools to the JDK folder, while PATH lets your terminal run commands like \`java\` and \`javac\` from any project folder.
1. Under "System variables" → click **New**
2. Variable name: \`JAVA_HOME\`
3. Variable value: your JDK folder, for example \`C:\\Program Files\\Java\\jdk-17\`
4. Click **OK**

> **Not sure of your exact path?** Open File Explorer and check common install folders like \`C:\\Program Files\\Java\`, \`C:\\Program Files\\Eclipse Adoptium\`, \`C:\\Program Files\\Microsoft\`, or your selected provider's JDK folder.

Or use Command Prompt as Administrator (faster):
\`\`\`cmd
setx JAVA_HOME "C:\\Program Files\\Java\\jdk-17"
setx PATH "%PATH%;%JAVA_HOME%\\bin"
\`\`\`

**Close and reopen your terminal after this step** — environment variables only load on fresh terminal start. If a company project says \`javac not found\` or uses the wrong Java version, this is one of the first things developers check.

---

## Step 4: Verify — Did It Work?

This is the moment of truth! Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:

\`\`\`bash
java -version
\`\`\`

You should see something like:
\`\`\`
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment Temurin-17.0.9+9 (build 17.0.9+9)
OpenJDK 64-Bit Server VM Temurin-17.0.9+9 (build 17.0.9+9, mixed mode)
\`\`\`

![Terminal showing java -version output](terminalVerify)

Now check the compiler too. \`java\` proves you can run Java programs; \`javac\` proves you can compile source code, which is required for real development work.
\`\`\`bash
javac -version
\`\`\`

Output:
\`\`\`
javac 17.0.9
\`\`\`

**See version numbers? You're done! Java is installed.**

If you see an error instead, jump to the Troubleshooting section below.

---

## Step 5: Install an IDE (Where You'll Write Code)

You could write Java in Notepad... but nobody does that. An IDE is like Notepad with superpowers — it highlights your code, catches errors as you type, runs your programs with one click, and helps you navigate large project files quickly.

![IntelliJ IDEA editor interface](intellijIDE)

Here are official IDE/editor options. Pick based on your class, company, system speed, or personal comfort:

### IntelliJ IDEA
- Official JetBrains Java IDE with strong refactoring, debugging, and project support.
- **Community Edition is free** and supports Core Java learning.
- Download: [jetbrains.com/idea/download](https://www.jetbrains.com/idea/download/) → scroll to **Community Edition**

### Eclipse IDE
- Official Eclipse Foundation IDE, widely used in enterprise Java and Jakarta EE ecosystems.
- Free and open source.
- Download: [eclipse.org/downloads](https://www.eclipse.org/downloads/)

### Visual Studio Code
- Official Microsoft editor. Install the **"Extension Pack for Java"** from the Extensions panel.
- Download: [code.visualstudio.com](https://code.visualstudio.com/)

### Apache NetBeans
- Official Apache IDE with Java project support and a simple interface.
- Download: [netbeans.apache.org](https://netbeans.apache.org/)

Use the IDE your teacher, team, or project uses. If there is no requirement, try any one from the official options above and continue with the same tool until you are comfortable.

---

## Step 6: Write Your First Java Program!

Let's make sure everything works end-to-end. We'll write, compile, and run a real Java program. This same compile-and-run flow happens behind the scenes when IDEs, build tools, and deployment pipelines build bigger applications.

**Without an IDE (just terminal):**

### 1. Create a file called \`HelloWorld.java\`
Open Notepad (or any text editor) and type:
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java is working on my computer!");
        System.out.println("My name is Dattu and I am learning Java!");
    }
}
\`\`\`
Save it as **HelloWorld.java** (file name must exactly match class name, including capital H and W).

### 2. Open terminal in the same folder and compile:
\`\`\`bash
javac HelloWorld.java
\`\`\`
This creates a \`HelloWorld.class\` file — that's the compiled bytecode the JVM reads.

### 3. Run it:
\`\`\`bash
java HelloWorld
\`\`\`

Output:
\`\`\`
Hello, World!
Java is working on my computer!
My name is Dattu and I am learning Java!
\`\`\`

**You just compiled and ran real Java code. That's exactly what professionals do — just with more complex programs!**

---

## How Java Works — The Big Picture

Here's what happens when you write and run Java (many beginners never understand this clearly):

\`\`\`
YOU WRITE:        HelloWorld.java    ← plain text you can read
        ↓
javac COMPILES:   HelloWorld.class  ← bytecode (not human-readable)
        ↓
JVM RUNS:         Output on screen  ← JVM reads bytecode and executes it
\`\`\`

**Why this two-step process?** Because bytecode is platform-independent. The same \`.class\` file runs on Windows, Mac, and Linux — the JVM handles the differences. This is what "Write Once, Run Anywhere" means.

---

## How a Java Project Is Organized

Once you start building real projects (especially in an IDE), your files are organized like this:

![Java project folder structure in IDE](projectStructure)

\`\`\`
my-java-project/
├── src/                        ← YOUR SOURCE CODE goes here (.java files)
│   └── com/
│       └── yourname/
│           └── Main.java
├── out/ or bin/                ← COMPILED FILES go here (.class files, auto-generated)
├── lib/                        ← EXTERNAL LIBRARIES go here (like database drivers)
└── README.md                   ← Project description
\`\`\`

Don't worry about this too much right now. Your IDE creates this structure automatically when you create a new project. Just know that **src/ is where you write code**.

---

## Troubleshooting — Something Went Wrong?

Don't panic. These are the most common issues and their fixes:

### "java is not recognized as an internal or external command"
**Means:** Windows can't find Java.
**Fix:** You didn't set the PATH environment variable correctly. Go back to Step 3. Also make sure you restarted your terminal after setting variables.

### "javac is not recognized"
**Means:** You installed JRE instead of JDK.
**Fix:** Uninstall what you have, go back to Step 1, and download a JDK (not JRE) from one of the official/trusted provider links listed there.

### Wrong version is showing (e.g. Java 8 instead of 17)
**Means:** You have an older Java installed from before.
**Fix:** Update your JAVA_HOME to point to the new version's folder. Or uninstall the old version first.

### "Permission denied" on Mac/Linux
**Fix:** Add \`sudo\` before your commands: \`sudo apt install openjdk-17-jdk\`

### "error: class HelloWorld is public, should be declared in a file named HelloWorld.java"
**Means:** Your file name doesn't match your class name.
**Fix:** The file name MUST exactly match the class name, including capitals. \`HelloWorld.java\` for \`public class HelloWorld\`.

---

## Quick Recap — What You Did

1. Learned the difference between JVM, JRE, and JDK
2. Downloaded and installed a JDK from Oracle, OpenJDK, Adoptium, Microsoft OpenJDK, Amazon Corretto, or another project-approved provider
3. Set environment variables (Windows) so terminal finds Java
4. Verified installation with \`java -version\` and \`javac -version\`
5. Installed an IDE to write code comfortably
6. Wrote, compiled, and ran your first Java program

**You're ready to start learning Java!**

---

## Test Your Knowledge

Java environment set up? Test your Core Java knowledge with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering all Core Java topics!

---

## 10 Important JDK & Environment Setup Interview Questions

### 1. What is \`JAVA_HOME\` and why do tools need it?
**Answer:** It points to the JDK installation root so build tools (Maven, Gradle, IDEs) find compilers and libraries consistently.
CI pipelines set \`JAVA_HOME\` explicitly to avoid picking up a random \`java\` from PATH.

### 2. How do \`java -version\` and \`javac -version\` differ in what they tell you?
**Answer:** They show the runtime and compiler versions; they can differ if multiple JDKs are installed and PATH is inconsistent.
Mismatch errors often show up as “class file version” problems at runtime.

### 3. What is the PATH variable’s role for Java commands?
**Answer:** PATH lists directories where the shell searches for executables like \`java\` and \`javac\`.
On Windows, installers sometimes add JDK \`bin\`; on Unix, \`sudo update-alternatives\` may manage versions.

### 4. Why might you install both a full JDK and a JRE-only runtime?
**Answer:** Developers need the JDK; some minimal production images only ship a runtime to reduce attack surface and size—if you use \`jlink\`, even smaller.
Container base images often use slim JRE builds.

### 5. What file name rule ties to \`public class\`?
**Answer:** A public top-level class must live in a file named \`ClassName.java\`.
This trips beginners when renaming classes without renaming files.

### 6. How do IDEs relate to \`javac\` on the command line?
**Answer:** IDEs invoke the same compiler APIs or fork \`javac\`; they add incremental compilation, indexing, and refactoring.
“Works in IDE but not CI” usually means different JDK or encoding settings.

### 7. What is a common Windows-specific pitfall when setting environment variables?
**Answer:** Forgetting to restart the terminal/IDE after changes, or mixing user vs system PATH entries so the wrong Java wins.
Document the exact steps for your team to avoid “works on my machine.”

### 8. Scenario: CI says \`javac: command not found\` but your laptop builds fine.
**Answer:** The CI image lacks a JDK, or PATH/\`JAVA_HOME\` isn’t set in the pipeline YAML.
Fix by installing a JDK in the image or using an official setup-java action.

### 9. Why verify \`javac\` and not only \`java\` for development machines?
**Answer:** You can have a JRE \`java\` without a compiler; building requires \`javac\` from a JDK.
Teams standardize on one JDK vendor (Temurin, Corretto, etc.) for support parity.

### 10. What is one reason to pin an exact JDK version in a project?
**Answer:** Reproducible builds and matching bytecode/features across dev, CI, and production; preview features and removed APIs vary by release.
Use toolchains (Gradle) or \`.sdkman\`/\`asdf\` for developer alignment.

`,
  code: `// Environment Verification Program
// Run this to confirm your Java setup is working correctly.
// Save as: EnvironmentCheck.java
// Compile: javac EnvironmentCheck.java
// Run:     java EnvironmentCheck

public class EnvironmentCheck {
    public static void main(String[] args) {
        System.out.println("╔══════════════════════════════════════╗");
        System.out.println("║     Java Environment Check           ║");
        System.out.println("╚══════════════════════════════════════╝");
        System.out.println();

        // ─── 1. Java Version ───────────────────────────────────────
        System.out.println("1. JAVA VERSION");
        System.out.println("   ─────────────────────────────────────");
        String javaVersion = System.getProperty("java.version");
        String javaVendor  = System.getProperty("java.vendor");
        System.out.println("   Version : " + javaVersion);
        System.out.println("   Vendor  : " + javaVendor);

        // Version check tip
        int majorVersion = Integer.parseInt(javaVersion.split("\\\\.")[0]);
        if (majorVersion >= 17) {
            System.out.println("   Status  : Great! Java " + majorVersion + " is modern and supported.");
        } else {
            System.out.println("   Warning : Java " + majorVersion + " is older. Consider upgrading to Java 17+.");
        }
        System.out.println();

        // ─── 2. JVM Information ────────────────────────────────────
        System.out.println("2. JVM INFORMATION");
        System.out.println("   ─────────────────────────────────────");
        String jvmName    = System.getProperty("java.vm.name");
        String jvmVersion = System.getProperty("java.vm.version");
        System.out.println("   JVM Name    : " + jvmName);
        System.out.println("   JVM Version : " + jvmVersion);
        System.out.println();

        // ─── 3. Java Home ──────────────────────────────────────────
        System.out.println("3. JAVA HOME (Where Java is installed)");
        System.out.println("   ─────────────────────────────────────");
        String javaHome = System.getProperty("java.home");
        System.out.println("   Path : " + javaHome);
        System.out.println("   Tip  : This folder contains your JDK. Set JAVA_HOME to this path.");
        System.out.println();

        // ─── 4. Operating System ───────────────────────────────────
        System.out.println("4. YOUR OPERATING SYSTEM");
        System.out.println("   ─────────────────────────────────────");
        String osName    = System.getProperty("os.name");
        String osVersion = System.getProperty("os.version");
        String osArch    = System.getProperty("os.arch");
        System.out.println("   OS           : " + osName);
        System.out.println("   Version      : " + osVersion);
        System.out.println("   Architecture : " + osArch);
        System.out.println();

        // ─── 5. User Info ──────────────────────────────────────────
        System.out.println("5. USER INFORMATION");
        System.out.println("   ─────────────────────────────────────");
        String userName = System.getProperty("user.name");
        String userHome = System.getProperty("user.home");
        String userDir  = System.getProperty("user.dir");
        System.out.println("   Username          : " + userName);
        System.out.println("   Home Directory    : " + userHome);
        System.out.println("   Working Directory : " + userDir);
        System.out.println("   Tip: Working Directory is where Java looks for your .java files.");
        System.out.println();

        // ─── 6. Memory ─────────────────────────────────────────────
        System.out.println("6. MEMORY (How much RAM Java can use)");
        System.out.println("   ─────────────────────────────────────");
        Runtime runtime     = Runtime.getRuntime();
        long maxMemory      = runtime.maxMemory()   / (1024 * 1024);
        long totalMemory    = runtime.totalMemory() / (1024 * 1024);
        long freeMemory     = runtime.freeMemory()  / (1024 * 1024);
        long usedMemory     = totalMemory - freeMemory;
        System.out.println("   Max Memory   : " + maxMemory   + " MB (max Java is allowed to use)");
        System.out.println("   Used Memory  : " + usedMemory  + " MB (currently in use)");
        System.out.println("   Free Memory  : " + freeMemory  + " MB (available right now)");
        System.out.println();

        // ─── 7. Processors ─────────────────────────────────────────
        System.out.println("7. CPU CORES");
        System.out.println("   ─────────────────────────────────────");
        int processors = runtime.availableProcessors();
        System.out.println("   Available Cores : " + processors);
        System.out.println("   Tip: More cores = Java can run more threads in parallel.");
        System.out.println();

        // ─── 8. Class Path ─────────────────────────────────────────
        System.out.println("8. CLASS PATH");
        System.out.println("   ─────────────────────────────────────");
        String classPath = System.getProperty("java.class.path");
        System.out.println("   " + classPath);
        System.out.println("   Tip: Java searches this path for .class files when running your program.");
        System.out.println();

        // ─── Final Summary ─────────────────────────────────────────
        System.out.println("╔══════════════════════════════════════╗");
        System.out.println("║            SUMMARY                   ║");
        System.out.println("╚══════════════════════════════════════╝");
        System.out.println();
        System.out.println("  Hello, " + userName + "!");
        System.out.println("  Java " + javaVersion + " is installed and running on your " + osName + ".");
        System.out.println("  Your environment is set up correctly. You are ready to code!");
        System.out.println();
        System.out.println("  Your next steps:");
        System.out.println("  ─────────────────────────────────────");
        System.out.println("  1. Install IntelliJ IDEA Community (free) from jetbrains.com");
        System.out.println("  2. Create a new Java project in IntelliJ");
        System.out.println("  3. Start with variables and data types");
        System.out.println("  4. Keep practising every day — even 30 minutes counts!");
        System.out.println();
        System.out.println("  Good luck on your Java journey! You've got this.");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a program that displays your system information',
      hint: 'Use System.getProperty() to access Java properties. Properties are like key-value lookups — you give Java a key like "java.version" and it returns the value.',
      starterCode: `public class SystemInfo {
    public static void main(String[] args) {
        System.out.println("=== My System Information ===\\n");
        
        // Java Information
        System.out.println("Java Version  : " + System.getProperty("java.version"));
        System.out.println("Java Home     : " + System.getProperty("java.home"));
        System.out.println("Java Vendor   : " + System.getProperty("java.vendor"));
        
        // OS Information
        System.out.println("\\nOperating System : " + System.getProperty("os.name"));
        System.out.println("OS Version       : " + System.getProperty("os.version"));
        System.out.println("Architecture     : " + System.getProperty("os.arch"));
        
        // User Information
        System.out.println("\\nUser Name         : " + System.getProperty("user.name"));
        System.out.println("Home Directory    : " + System.getProperty("user.home"));
        System.out.println("Working Directory : " + System.getProperty("user.dir"));
        
        // Memory
        Runtime rt = Runtime.getRuntime();
        System.out.println("\\nMax Memory  : " + (rt.maxMemory() / 1024 / 1024) + " MB");
        System.out.println("CPU Cores   : " + rt.availableProcessors());
        
        System.out.println("\\nYour Java environment is working correctly!");
        
        // TODO: Add your name using a variable and print a welcome message
        // String myName = "Dattu";
        // System.out.println("Welcome, " + myName + "! You are ready to learn Java.");
    }
}`
    },
    {
      question: 'Understand the compile-run cycle — fix and run this program',
      hint: 'The file name MUST match the class name exactly. "HelloDattu.java" must contain "public class HelloDattu". Fix the class name below to match the filename, then compile with: javac HelloDattu.java and run with: java HelloDattu',
      starterCode: `// File name: HelloDattu.java
// BUG: The class name doesn't match the file name — fix it!

public class Hello {          // BUG: Should be HelloDattu to match file name
    public static void main(String[] args) {
        
        // This is your first real Java program
        System.out.println("Hello! My name is Dattu.");
        System.out.println("I just set up Java on my computer!");
        System.out.println("Today's date: 2024");
        
        // Java version info
        String version = System.getProperty("java.version");
        System.out.println("I am using Java version: " + version);
        
        System.out.println("\\nI am ready to learn Java!");
    }
}`
    },
    {
      question: 'Compare JDK, JRE, and JVM by printing their properties',
      hint: 'System.getProperty() exposes many JVM details. Print them and observe. The "java.home" path IS your JRE. Your JDK folder is one level up from it.',
      starterCode: `public class JdkJreJvmDemo {
    public static void main(String[] args) {
        System.out.println("=== JDK vs JRE vs JVM ===\\n");
        
        // JVM properties — information about the running virtual machine
        System.out.println("--- JVM (Java Virtual Machine) ---");
        System.out.println("JVM Name    : " + System.getProperty("java.vm.name"));
        System.out.println("JVM Version : " + System.getProperty("java.vm.version"));
        System.out.println("JVM Vendor  : " + System.getProperty("java.vm.vendor"));
        
        // JRE properties — the runtime environment
        System.out.println("\\n--- JRE (Java Runtime Environment) ---");
        System.out.println("Java Home     : " + System.getProperty("java.home"));
        System.out.println("Java Version  : " + System.getProperty("java.version"));
        System.out.println("Spec Version  : " + System.getProperty("java.specification.version"));
        
        // JDK usage — the compiler tools (javac)
        System.out.println("\\n--- JDK (Java Development Kit) ---");
        System.out.println("The JDK includes everything above PLUS:");
        System.out.println("  - javac (compiler) → turns .java into .class");
        System.out.println("  - jdb   (debugger) → helps find bugs");
        System.out.println("  - jar   (archiver) → packages your app");
        System.out.println("  - javadoc          → generates documentation");
        
        // Memory — JVM manages this
        Runtime rt = Runtime.getRuntime();
        System.out.println("\\n--- JVM Memory Management ---");
        System.out.println("Max Heap  : " + (rt.maxMemory() / 1024 / 1024)   + " MB");
        System.out.println("Used      : " + ((rt.totalMemory() - rt.freeMemory()) / 1024 / 1024) + " MB");
        System.out.println("Cores     : " + rt.availableProcessors());
        
        System.out.println("\\nRemember: JDK > JRE > JVM (each contains the smaller one)");
        System.out.println("As a developer, you always install the JDK!");
    }
}`
    }
  ]
};

export default javaEnvironmentSetup;
