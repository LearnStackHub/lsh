/**
 * Markdown blocks injected before closing ` of `content` in Core Java tutorial files.
 * Each block: 10 topic-specific interview Q&As (no generic boilerplate).
 */
export const SNIPPETS = {
  'src/data/corejava/basics/JavaIntroduction.js': `
---

## 10 Important Java Introduction Interview Questions

### 1. What does “Write Once, Run Anywhere” (WORA) mean in practice?
**Answer:** You compile Java source to bytecode once; any OS with a compatible JVM can run that bytecode without recompiling for each platform.
Interviewers want to hear that portability is achieved by the JVM abstracting the OS, not by shipping different binaries per platform. In production, teams still test on each target OS because native integrations, file paths, and fonts can differ.

### 2. Explain JDK, JRE, and JVM and how they relate.
**Answer:** The JVM executes bytecode; the JRE bundles the JVM plus libraries needed to run programs; the JDK is the JRE plus compilers and dev tools (\`javac\`, \`javadoc\`, etc.).
A developer installs the JDK; a server that only runs apps might have just a JRE (or a trimmed runtime in modern distributions). Confusing JRE with JDK is a common junior mistake in interviews.

### 3. Is Java compiled, interpreted, or both?
**Answer:** Source is compiled to bytecode (\`javac\`); the JVM then interprets and/or JIT-compiles hot bytecode to native code at runtime.
This hybrid model is why startup and warm-up behavior differ: first runs can be slower until the JIT optimizes frequently executed paths.

### 4. Why use bytecode instead of distributing machine code?
**Answer:** Bytecode is portable and compact; the JVM can optimize the same program differently per CPU while keeping one build artifact.
Teams shipping to Linux servers and developer laptops benefit from one CI build. Security and sandboxing are also easier to reason about at the JVM layer.

### 5. What is the correct signature of \`main\` and why each part?
**Answer:** \`public static void main(String[] args)\` — public so the JVM can call it, static so it runs without an instance, \`String[] args\` for command-line arguments.
Interview follow-ups often cover what happens if you change the signature (program won’t start) and how \`args\` maps to command-line tokens.

### 6. How does a \`.java\` file become a running program?
**Answer:** \`javac\` produces \`.class\` bytecode; \`java ClassName\` loads the class, resolves dependencies, and starts execution at \`main\`.
In large apps, class loading, module path, and classpath issues dominate debugging—worth mentioning for senior roles.

### 7. What is the difference between Java SE, Jakarta EE, and Java ME?
**Answer:** SE is the core language and standard libraries; Jakarta EE (formerly Java EE) adds APIs for enterprise web, messaging, and persistence; ME targeted constrained devices (less common today).
Job postings saying “Core Java” usually mean SE plus solid OOP; “Java EE/Jakarta” implies servlets, JPA, etc.

### 8. Real-world scenario: your JAR runs on a developer laptop but fails on a Linux server with \`UnsupportedClassVersionError\`. What happened?
**Answer:** The code was compiled with a newer \`javac\` (higher class file version) than the JVM on the server supports.
Fix: align JDK used in CI with server JVM, or upgrade the server runtime. This appears constantly in deployment pipelines.

### 9. Why is Java still widely used in banks and large enterprises?
**Answer:** Mature tooling, strong typing, long-term support releases, observability, and a huge ecosystem reduce operational risk for long-lived systems.
Mention operational concerns—monitoring, GC tuning, and backward compatibility—more than syntax features.

### 10. What is one honest limitation of Java as a platform?
**Answer:** JVM startup and memory footprint can be heavier than native runtimes, which matters for CLI tools and tiny edge devices unless you use custom runtimes or GraalVM native images.
Pair that with a mitigation (containers with enough RAM, AOT compilation, or choosing a lighter stack where appropriate).

`,

  'src/data/corejava/basics/JavaFeatures.js': `
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

  'src/data/corejava/basics/JavaEnvironmentSetup.js': `
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

  'src/data/corejava/basics/JavaSyntax.js': `
---

## 10 Important Java Syntax Interview Questions

### 1. Why must a source file’s public class name match the filename?
**Answer:** The compiler enforces a one-to-one mapping for discoverability and predictable class loading from the filesystem.
Refactoring tools rename both together to stay consistent.

### 2. What is a compile-time error vs a runtime error with a simple example?
**Answer:** Syntax/type mistakes fail at compile time (\`String x = 1;\`); \`NullPointerException\` may appear only when a path executes.
Tests should cover branches that exercise nullable references.

### 3. What are Java identifiers and naming conventions?
**Answer:** Identifiers are names for classes, methods, variables; conventions use PascalCase for classes, camelCase for members, UPPER_SNAKE for constants.
Consistency matters more for team readability than for the compiler.

### 4. What delimits statements and blocks?
**Answer:** Statements end with \`;\`; blocks use braces \`{ }\` to group statements and define scope.
Omitting braces on single-line \`if\` is legal but risky during edits.

### 5. What is the role of the package declaration?
**Answer:** It namespaces types to avoid collisions and maps to directory structure for class loading.
Default package is only for quick experiments.

### 6. What are literals vs variables?
**Answer:** Literals are fixed values in source (\`42\`, \`"hi"\`); variables hold values that can change (unless \`final\`).
Type inference with \`var\` still requires initialization before use.

### 7. How do single-line vs multi-line comments differ?
**Answer:** \`//\` to end of line; \`/* */\` for blocks; Javadoc \`/** */\` for API documentation processed by \`javadoc\`.
Public API teams treat Javadoc as part of the contract.

### 8. Scenario: your teammate’s code compiles but your checkout doesn’t—same repo. What syntax-related causes do you check?
**Answer:** JDK version (preview features), file encoding, and line endings corrupting hidden characters—less often pure syntax.
Also verify you didn’t merge partial files with mismatched braces.

### 9. Why does Java require explicit types (or \`var\`) for local variables?
**Answer:** Static typing catches many mistakes early and documents intent; \`var\` infers type but still binds a single static type.
Dynamic typing is not Java’s model.

### 10. What happens if you forget a semicolon?
**Answer:** The compiler reports an error near the next token; cascading errors can appear until fixed.
IDEs usually highlight the exact statement.

`,

  'src/data/corejava/basics/JavaVariables.js': `
---

## 10 Important Java Variables Interview Questions

### 1. What is the difference between declaration and initialization?
**Answer:** Declaration introduces name and type; initialization assigns the first value; local variables must be assigned before read.
The compiler performs definite assignment analysis.

### 2. What are primitive types vs reference types?
**Answer:** Primitives hold values directly; references hold addresses of objects on the heap.
Primitives have fixed sizes; references’ footprint is JVM-dependent.

### 3. What does \`final\` mean for a variable?
**Answer:** The reference or value cannot be reassigned after initialization; for object references, the object may still mutate internally.
Useful for immutable bindings and safe publication patterns.

### 4. What is variable scope in Java?
**Answer:** The region where a variable is visible—block, method, instance, or class (static)—determines lifetime and accessibility.
Shadowing occurs when inner names hide outer ones—often a source of bugs.

### 5. What is the default value for instance fields vs local variables?
**Answer:** Instance fields get defaults (\`0\`, \`false\`, \`null\`); locals have no default and must be set explicitly.
This distinction is a classic exam and interview question.

### 6. What is widening and narrowing conversion?
**Answer:** Widening promotes smaller numeric types to larger safely; narrowing casts may lose data and requires explicit cast.
\`int\` to \`byte\` without cast is a compile error.

### 7. Why might you use \`var\` for locals?
**Answer:** It reduces repetition when the type is obvious from the right-hand side; still statically typed.
Overusing \`var\` can hurt readability when the type isn’t clear.

### 8. Scenario: a loop variable is declared inside \`for\` vs outside—what changes?
**Answer:** Inside \`for (int i = 0; ...)\`, \`i\` is scoped to the loop; outside declarations persist across iterations.
Choose based on whether you need the variable after the loop.

### 9. What is the difference between instance variables and class (static) variables?
**Answer:** Each object has its own instance fields; static fields are shared across all instances of the class.
Thread-safety questions often follow static mutable state.

### 10. How do constants differ from variables in team conventions?
**Answer:** \`static final\` fields represent immutable configuration; naming is usually UPPER_SNAKE.
Immutability reduces bugs in concurrent code.

`,

  'src/data/corejava/basics/JavaDataTypes.js': `
---

## 10 Important Java Data Types Interview Questions

### 1. List Java’s primitive types and their rough purposes.
**Answer:** \`byte\`, \`short\`, \`int\`, \`long\` for integers; \`float\`, \`double\` for floating point; \`char\` for UTF-16 code units; \`boolean\` for truth values.
Pick the smallest type that fits domain constraints and I/O formats.

### 2. Why is \`char\` 16-bit and what limitation does that imply?
**Answer:** \`char\` holds a UTF-16 code unit; supplementary characters use surrogate pairs, so one logical character may span two \`char\`s.
Text processing should often use \`String\` or \`codePoint\` APIs, not raw \`char\` arrays alone.

### 3. What is autoboxing and unboxing?
**Answer:** Automatic conversion between primitives and wrapper objects (\`int\` ↔ \`Integer\`).
It can hide \`NullPointerException\` and create unnecessary allocations in hot loops.

### 4. Compare \`float\` vs \`double\` for money calculations.
**Answer:** Neither is appropriate for exact decimal money; use \`BigDecimal\` or integer minor units.
Floating point has rounding errors that accumulate in ledgers.

### 5. What is the range of \`int\` and when do you move to \`long\`?
**Answer:** \`int\` is 32-bit signed; use \`long\` when values exceed roughly ±2 billion—timestamps, large counters.
Overflow silently wraps unless you use \`Math.*Exact\` methods.

### 6. What is the difference between \`==\` on primitives vs references?
**Answer:** For primitives, \`==\` compares values; for references, it compares object identity unless unboxing occurs.
Use \`equals\` for logical equality of objects.

### 7. What are wrapper classes used for besides collections?
**Answer:** Reflection, generics, nullable representations, and APIs that only accept objects.
\`Optional\` is preferred over null for explicit absence in newer code.

### 8. Scenario: two \`Integer\` objects \`a\` and \`b\` both value 200; does \`a == b\` hold?
**Answer:** Not guaranteed—small integers may be cached, larger values are different objects; always use \`equals\` for value comparison.
This catches developers who rely on reference equality for boxed types.

### 9. What is \`String\`’s type category?
**Answer:** It is a reference type (class) with immutable character sequence behavior.
String literals live in the string pool; \`new String("x")\` creates a distinct heap object.

### 10. Why declare \`final\` fields when possible?
**Answer:** Immutability of references makes reasoning and thread-safety easier; required for effective \`final\` fields in anonymous classes.
Pair with defensive copies for mutable components.

`,

  'src/data/corejava/basics/JavaKeywords.js': `
---

## 10 Important Java Keywords Interview Questions

### 1. What do access modifiers \`public\`, \`protected\`, default, and \`private\` control?
**Answer:** Visibility of classes, methods, and fields across packages and inheritance hierarchies.
Design APIs with the minimum necessary exposure.

### 2. What does \`static\` mean for methods and fields?
**Answer:** Belongs to the class, not instances; invoked as \`ClassName.method\` without an object (except through instances syntactically).
Static state is shared and can be a concurrency bottleneck.

### 3. What is \`final\` for classes, methods, and variables?
**Answer:** Final class cannot be subclassed; final method cannot be overridden; final variable cannot be reassigned.
Used for security-sensitive classes (\`String\`) and immutable patterns.

### 4. What does \`abstract\` signify?
**Answer:** Abstract classes/methods cannot be instantiated or called without implementation in subclasses.
Defines templates for polymorphic hierarchies.

### 5. What do \`extends\` and \`implements\` do?
**Answer:** \`extends\` inherits one superclass; \`implements\` lists interfaces a class conforms to (multiple allowed).
Java supports single inheritance of classes, multiple interfaces.

### 6. What is \`synchronized\` used for?
**Answer:** Provides mutual exclusion for blocks/methods so only one thread executes critical sections on a monitor at a time.
Incorrect locking causes deadlocks or poor scalability.

### 7. What is \`volatile\`’s role?
**Answer:** Ensures visibility of updates across threads and restricts certain reorderings for the guarded variable.
It does not replace atomic compound operations.

### 8. What do \`break\` and \`continue\` do in loops?
**Answer:** \`break\` exits the loop or labeled block; \`continue\` skips to the next iteration.
Labeled breaks appear in nested loops.

### 9. Scenario: a method is \`public\` in a package-private class—who can call it?
**Answer:** Only code in the same package can access the class at all; other packages cannot reference the class, so \`public\` methods aren’t reachable from outside the package.
Packaging and visibility interact.

### 10. Why can’t you use reserved keywords as identifiers?
**Answer:** The grammar reserves them for language constructs; compilers would be ambiguous otherwise.
Some languages work around with backticks—Java does not.

`,

  'src/data/corejava/basics/JavaOperators.js': `
---

## 10 Important Java Operators Interview Questions

### 1. What is the difference between \`=\` and \`==\`?
**Answer:** \`=\` is assignment; \`==\` compares primitives by value and references by identity.
For strings, prefer \`equals\` for content.

### 2. What do \`&&\`, \`||\`, and \`!\` short-circuit?
**Answer:** \`&&\` stops if left is false; \`||\` stops if left is true; \`!\` negates boolean.
Short-circuiting avoids evaluating side effects on the right when unnecessary.

### 3. What is the difference between \`++i\` and \`i++\`?
**Answer:** Prefix increments before value use; postfix uses then increments.
Order matters in expressions with side effects—avoid clever one-liners in production code.

### 4. What do bitwise operators \`&\`, \`|\`, \`^\`, \`~\` do?
**Answer:** AND, OR, XOR, and complement on integer bits; also \`&\` and \`|\` for booleans without short-circuit.
Common in flags, hashing, and low-level protocols.

### 5. What is \`instanceof\` used for?
**Answer:** Tests whether an object is an instance of a type or compatible subtype before casting.
Pattern matching for \`instanceof\` reduces casts in modern Java.

### 6. What is operator precedence and why care?
**Answer:** Rules determine evaluation order without parentheses; misunderstandings cause bugs in arithmetic/boolean mixes.
Use parentheses for clarity.

### 7. What is ternary \`?:\` and when is it appropriate?
**Answer:** Compact conditional expression; use when both branches are simple and side-effect free.
Deeply nested ternaries harm readability.

### 8. Scenario: \`a / b\` on two \`int\`s where \`b\` doesn’t divide evenly—what do you get?
**Answer:** Integer division truncates toward zero; remainder needs \`%\`.
For floating results, cast operands or use \`double\`.

### 9. What is \`>>>\` vs \`>>\`?
**Answer:** \`>>\` is signed right shift (sign-extends); \`>>>\` is unsigned right shift (fills with zeros).
Important for low-level bit manipulation and hashing.

### 10. How do compound assignments like \`+=\` behave with types?
**Answer:** They cast implicitly as needed (\`byte b += 1\` is legal where \`b = b + 1\` might not be).
Subtle widening rules apply.

`,

  'src/data/corejava/basics/JavaMethods.js': `
---

## 10 Important Java Methods Interview Questions

### 1. What is the method signature vs method body?
**Answer:** Signature includes name and parameter types (and generics); body contains implementation in braces.
Overloading depends on signature differences; overriding matches superclass contracts.

### 2. What is method overloading?
**Answer:** Same method name, different parameter lists in one class; resolved at compile time.
Return type alone is not enough to overload.

### 3. What is method overriding?
**Answer:** Subclass provides a new implementation for an inherited instance method with compatible signature and visibility.
\`@Override\` catches mistakes at compile time.

### 4. What does \`return\` do?
**Answer:** Exits the method, optionally passing a value to the caller.
\`void\` methods may use bare \`return\` to exit early.

### 5. How is pass-by-value applied to Java arguments?
**Answer:** Java passes copies of values—references are copied, not objects—so mutating object fields affects the shared object; reassigning the parameter doesn’t affect caller’s variable.
This confuses many candidates—practice with diagrams.

### 6. What are varargs (\`String... args\`)?
**Answer:** Syntactic sugar for an array parameter; caller can pass zero or more arguments.
Must be last in the parameter list.

### 7. What is recursion and what risks does it pose?
**Answer:** Method calls itself with a smaller problem; risks \`StackOverflowError\` if base case missing or depth huge.
Iterative or tail-call friendly designs may be preferred.

### 8. Scenario: you need to share expensive read-only data across calls—what options relate to methods?
**Answer:** Pass references to immutable objects, use static final configuration, or cache with thread-safe structures.
Avoid recreating large objects per call.

### 9. What is the difference between static and instance methods?
**Answer:** Static methods belong to the class and cannot access instance fields directly; instance methods run on \`this\`.
Utility methods are often static when stateless.

### 10. How do exceptions affect method contracts?
**Answer:** Checked exceptions appear in \`throws\` clauses; callers must handle or declare; runtime exceptions can propagate without declaration.
API design balances checked vs unchecked carefully.

`,
};
