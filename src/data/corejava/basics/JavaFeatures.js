const javaFeatures = {
  id: 'java-features',
  title: 'Java Features',
  description: 'What makes Java special and why developers love it',
  content: `
# Java Features — Why Java Has Stood the Test of Time

Java has been around since 1995, and it's still one of the most popular programming languages. Why? Because it was designed with features that solve real problems developers face every day.

Let's explore what makes Java special.

---

## The Big 12: Java's Key Features

### 1. Simple

Java was designed to be easy to learn. If you know C or C++, Java feels familiar — but without the complexity. For freshers, this means you can focus on classes, methods, objects, and business logic instead of memory addresses and manual cleanup.

**What Java removed:**
- Pointers (explicit memory addresses)
- Operator overloading
- Multiple inheritance (of classes)
- Manual memory management

\`\`\`java
public class SimpleJavaDemo {
    public static void main(String[] args) {
        String name = "Dattu";
        int age = 25;

        System.out.println(name + " is " + age);
    }
}
\`\`\`

### 2. Object-Oriented

Everything in Java revolves around objects. This is why real applications model data as objects like \`Student\`, \`Employee\`, \`Product\`, \`Order\`, and \`BankAccount\`. This makes code:
- Organized
- Reusable
- Easier to maintain

\`\`\`java
public class ObjectOrientedDemo {
    static class Car {
        String brand;
        int speed;

        void accelerate() {
            speed += 10;
        }
    }

    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "Honda";
        car.speed = 40;

        car.accelerate();
        System.out.println(car.brand + " speed: " + car.speed);
    }
}
\`\`\`

### 3. Platform Independent (Write Once, Run Anywhere)

This is Java's superpower. Write code once, run it on any device with a JVM. A Java backend built on a developer laptop can run on a Linux server or inside a Docker container without changing the source code.

\`\`\`
Your Code (.java)
      ↓
   Compiler
      ↓
Bytecode (.class)
      ↓
   JVM (Windows) → Runs!
   JVM (Mac)     → Runs!
   JVM (Linux)   → Runs!
\`\`\`

**Real impact:** Deploy the same application to Windows servers, Mac laptops, and Linux containers without changing a single line of code.

### 4. Secure

Java was built with security in mind. This matters in enterprise applications where user data, payments, authentication, and file uploads must be handled safely:

- **No pointers** — Can't access arbitrary memory
- **Bytecode verification** — Code is checked before running
- **Security Manager** — Controls what code can do
- **Sandbox execution** — Applets run in isolated environment

\`\`\`java
public class ArraySafetyDemo {
    public static void main(String[] args) {
        int[] arr = new int[5];

        try {
            arr[10] = 100;
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Java stopped unsafe array access: " + e.getMessage());
        }
    }
}
\`\`\`

### 5. Robust

Java is designed to be reliable. In real systems, reliability means the application should fail clearly, recover when possible, and avoid corrupting data:

- **Strong type checking** — Catch errors at compile time
- **Exception handling** — Graceful error recovery
- **Automatic garbage collection** — No memory leaks
- **No pointer arithmetic** — No segmentation faults

\`\`\`java
public class StrongTypingDemo {
    public static void main(String[] args) {
        // int x = "hello"; // Error: String cannot be stored in int

        int x = 100;
        String text = "hello";

        System.out.println("Number: " + x);
        System.out.println("Text: " + text);
    }
}
\`\`\`

### 6. Portable

Java programs are portable because:
- Bytecode is the same everywhere
- Data types have fixed sizes (int is always 32 bits)
- No implementation-dependent features

### 7. High Performance

Java is fast thanks to:

- **JIT (Just-In-Time) Compilation** — Bytecode compiled to native code at runtime
- **Adaptive optimization** — JVM optimizes hot code paths
- **Efficient garbage collection** — Modern GC algorithms

**Myth busted:** "Java is slow" was true in 1995. Modern Java is incredibly fast.

### 8. Multithreaded

Built-in support for concurrent programming. Real applications use concurrency to handle many users, background jobs, scheduled tasks, file processing, and API calls without freezing the main flow:

\`\`\`java
public class MultithreadingDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Running in parallel!");
        });

        thread.start();
        thread.join();

        System.out.println("Main method completed");
    }
}
\`\`\`

**Why it matters:** Modern apps need to handle multiple users, process data in parallel, and stay responsive.

### 9. Distributed

Java was designed for networked environments. That is why Java is common in backend APIs, microservices, payment integrations, messaging systems, and distributed enterprise platforms:

- Built-in networking libraries
- RMI (Remote Method Invocation)
- Support for distributed computing

\`\`\`java
import java.net.URL;
import java.net.URLConnection;

public class NetworkFeatureDemo {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://example.com");
        URLConnection connection = url.openConnection();

        System.out.println("Connected to host: " + url.getHost());
        System.out.println("Content type: " + connection.getContentType());
    }
}
\`\`\`

### 10. Dynamic

Java can adapt at runtime. Frameworks like Spring use this ability to inspect classes, create objects, inject dependencies, and call methods based on configuration:

- **Reflection** — Inspect and modify code at runtime
- **Dynamic class loading** — Load classes on demand
- **Late binding** — Resolve method calls at runtime

\`\`\`java
public class DynamicLoadingDemo {
    public static class Message {
        public String text() {
            return "Loaded at runtime";
        }
    }

    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("DynamicLoadingDemo$Message");
        Object obj = clazz.getDeclaredConstructor().newInstance();
        Message message = (Message) obj;

        System.out.println(message.text());
    }
}
\`\`\`

### 11. Architecture Neutral

Java bytecode doesn't depend on any processor architecture. This helps the same application run across laptop CPUs, cloud servers, and container platforms:
- Same bytecode runs on x86, ARM, SPARC
- JVM handles architecture differences
- No recompilation needed

### 12. Interpreted (and Compiled)

Java uses a hybrid approach:

\`\`\`
Source Code → Compiler → Bytecode → JVM Interpreter → Execution
                                  ↓
                            JIT Compiler → Native Code (faster!)
\`\`\`

---

## Feature Comparison

| Feature | Java | C++ | Python |
|---------|------|-----|--------|
| Platform Independent | Yes | No | Yes |
| Memory Management | Automatic | Manual | Automatic |
| Type Safety | Strong | Strong | Weak |
| Performance | High | Very High | Moderate |
| Learning Curve | Moderate | Steep | Easy |
| Enterprise Support | Excellent | Good | Growing |

---

## Real-World Impact

### Banking Systems
- **Security** — Protects financial data
- **Robustness** — No crashes, no data loss
- **Portability** — Runs on mainframes and servers

### Android Apps
- **Object-Oriented** — Clean app architecture
- **Multithreaded** — Smooth UI + background tasks
- **Portable** — Runs on thousands of device types

### Enterprise Applications
- **Distributed** — Microservices architecture
- **Scalable** — Handle millions of users
- **Maintainable** — Large codebases stay organized

---

## Why Companies Choose Java

1. **Stability** — 25+ years of proven reliability
2. **Talent pool** — Millions of Java developers
3. **Ecosystem** — Massive library and framework support
4. **Backward compatibility** — Old code still works
5. **Performance** — Handles enterprise scale
6. **Security** — Battle-tested in banking and government

---

## 10 Important Java Language Features Interview Questions

### 1. What does “everything is an object” in Java really mean?
**Answer:** It is a simplification: primitives are not objects, but most domain modeling uses objects on the heap with references.
Interviewers check whether you know wrappers (\`Integer\`, \`Boolean\`) bridge primitives to APIs expecting objects.

### 2. How does automatic garbage collection affect how you write Java?
**Answer:** You don’t explicitly free memory, but you must avoid retaining references to large graphs, unregister listeners, and manage resources that aren’t memory (files, sockets).
Memory leaks still happen through static caches and forgotten collections.

### 3. What is the Java Collections Framework and why is it central?
**Answer:** It provides reusable \`List\`, \`Set\`, \`Map\`, and \`Queue\` implementations with consistent iteration and algorithms.
Almost every service layer uses collections; knowing time complexity of \`HashMap\` vs \`TreeMap\` is a frequent follow-up.

### 4. Explain checked vs unchecked exceptions at a high level.
**Answer:** Checked exceptions (\`IOException\`, etc.) must be declared or handled; \`RuntimeException\` and subclasses are unchecked.
API design debates often cover whether checked exceptions help reliability or hurt maintainability.

### 5. What is generics’ purpose in Java collections?
**Answer:** Generics add compile-time type safety and remove casts when using collections and APIs like \`List<String>\`.
Type erasure means runtime \`List\` doesn’t know \`String\`—reflection questions often follow.

### 6. What is the module system (Java 9+) trying to solve?
**Answer:** Strong encapsulation of packages, explicit dependencies, and smaller custom runtimes (\`jlink\`).
Large products benefit from clearer boundaries; libraries must declare what they export.

### 7. How do modern Java versions change the language without breaking old code?
**Answer:** New features are added conservatively with preview/incubating stages; long-term support releases emphasize compatibility.
Teams upgrade JDK versions on a schedule; preview features may require \`--enable-preview\`.

### 8. Scenario: you need concurrency-safe shared counters. What language features come up?
**Answer:** \`java.util.concurrent\` (atomic classes, locks), synchronized methods/blocks, and virtual threads (Project Loom) for blocking I/O at scale.
Interview depth ranges from \`synchronized\` basics to \`j.u.c.\` abstractions.

### 9. What is the value of interfaces and default methods?
**Answer:** Interfaces define contracts; default methods let you evolve APIs without breaking every implementor.
This interacts with multiple inheritance rules (diamond problem) and design of library upgrades.

### 10. Name one feature you’d highlight for a performance-sensitive service.
**Answer:** JIT compilation plus mature GCs (G1, ZGC) tuned for latency or throughput, together with profiling tools (JFR, async-profiler).
Always tie features to measurement, not assumptions.

`,
  code: `// Java Features Demo - Showcasing what makes Java special

public class JavaFeaturesDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Features Demo ===\\n");
        
        // 1. SIMPLE - Clean, readable syntax
        System.out.println("1. SIMPLE");
        System.out.println("   -------");
        String message = "Java is easy to read and write";
        int number = 42;
        System.out.println("   " + message);
        System.out.println("   The answer is: " + number);
        System.out.println();
        
        // 2. OBJECT-ORIENTED - Everything is an object
        System.out.println("2. OBJECT-ORIENTED");
        System.out.println("   -----------------");
        Car myCar = new Car("Toyota", "Camry");
        myCar.displayInfo();
        myCar.accelerate();
        myCar.displayInfo();
        System.out.println();
        
        // 3. PLATFORM INDEPENDENT
        System.out.println("3. PLATFORM INDEPENDENT");
        System.out.println("   ---------------------");
        System.out.println("   OS: " + System.getProperty("os.name"));
        System.out.println("   This same code runs on Windows, Mac, Linux!");
        System.out.println();
        
        // 4. SECURE - Type safety and bounds checking
        System.out.println("4. SECURE");
        System.out.println("   -------");
        try {
            int[] arr = {1, 2, 3};
            // arr[10] = 100;  // Would throw exception
            System.out.println("   Array bounds are checked automatically");
            System.out.println("   No buffer overflow vulnerabilities!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
        }
        System.out.println();
        
        // 5. ROBUST - Exception handling
        System.out.println("5. ROBUST");
        System.out.println("   -------");
        try {
            int result = divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("   Gracefully handled: Division by zero");
            System.out.println("   Program continues running!");
        }
        System.out.println();
        
        // 6. MULTITHREADED
        System.out.println("6. MULTITHREADED");
        System.out.println("   ---------------");
        System.out.println("   Available processors: " + 
                          Runtime.getRuntime().availableProcessors());
        
        Thread thread1 = new Thread(() -> 
            System.out.println("   Thread 1: Running in parallel!"));
        Thread thread2 = new Thread(() -> 
            System.out.println("   Thread 2: Also running!"));
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println();
        
        // 7. AUTOMATIC MEMORY MANAGEMENT
        System.out.println("7. AUTOMATIC MEMORY MANAGEMENT");
        System.out.println("   -----------------------------");
        Runtime runtime = Runtime.getRuntime();
        System.out.println("   Total Memory: " + 
                          (runtime.totalMemory() / 1024 / 1024) + " MB");
        System.out.println("   Free Memory: " + 
                          (runtime.freeMemory() / 1024 / 1024) + " MB");
        System.out.println("   Garbage collection happens automatically!");
        System.out.println();
        
        // 8. DYNAMIC - Reflection
        System.out.println("8. DYNAMIC (Reflection)");
        System.out.println("   ---------------------");
        Class<?> carClass = myCar.getClass();
        System.out.println("   Class name: " + carClass.getName());
        System.out.println("   Methods: " + carClass.getDeclaredMethods().length);
        System.out.println("   Fields: " + carClass.getDeclaredFields().length);
        System.out.println();
        
        // Summary
        System.out.println("=== SUMMARY ===");
        System.out.println("Java combines:");
        System.out.println("Simplicity of high-level languages");
        System.out.println("Power of object-oriented design");
        System.out.println("Security of managed runtime");
        System.out.println("Portability across all platforms");
        System.out.println("Performance of JIT compilation");
    }
    
    public static int divide(int a, int b) {
        return a / b;
    }
}

// Simple class to demonstrate OOP
class Car {
    private String brand;
    private String model;
    private int speed;
    
    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }
    
    public void accelerate() {
        speed += 20;
        System.out.println("   Accelerating... Speed is now " + speed + " km/h");
    }
    
    public void displayInfo() {
        System.out.println("   " + brand + " " + model + " - Speed: " + speed + " km/h");
    }
}

---

## Test Your Knowledge

Mastered Java features? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering Java features, OOPs, and all Core Java topics!
`,
  practiceQuestions: [
    {
      question: 'Demonstrate Java features with a practical example',
      hint: 'Create a class that shows OOP, exception handling, and platform info',
      starterCode: `public class FeaturesPractice {
    public static void main(String[] args) {
        System.out.println("=== Java Features in Action ===\\n");
        
        // Platform Independence
        System.out.println("Running on: " + System.getProperty("os.name"));
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println();
        
        // Object-Oriented
        BankAccount account = new BankAccount("Dattu p", 1000.0);
        account.display();
        
        // Robust - Exception Handling
        try {
            account.withdraw(500);
            account.withdraw(600);  // This will fail
        } catch (Exception e) {
            System.out.println("Handled: " + e.getMessage());
        }
        
        account.display();
        
        // Automatic Memory Management
        System.out.println("\\nMemory managed automatically by JVM!");
    }
}

class BankAccount {
    private String owner;
    private double balance;
    
    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    
    public void withdraw(double amount) throws Exception {
        if (amount > balance) {
            throw new Exception("Insufficient funds!");
        }
        balance -= amount;
        System.out.println("Withdrew: $" + amount);
    }
    
    public void display() {
        System.out.println("Account: " + owner + " | Balance: $" + balance);
    }
}`
    }
  ]
};

export default javaFeatures;
