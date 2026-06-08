const javaSyntax = {
  id: 'java-syntax',
  title: 'Java Syntax',
  description: 'The grammar rules of Java programming',
  content: `
# Java Syntax — The Grammar of Java

Every language has grammar rules. English has subjects, verbs, and punctuation. Java has its own rules too. Understanding Java syntax is like learning the alphabet before writing sentences, and in real projects it helps you read controllers, services, entity classes, and utility code without guessing.

Let's break down how Java code is structured.

---

## Your First Java Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

This simple program has a lot going on. Let's dissect it so you understand the structure that every real Java application starts from.

### The Class Declaration

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("This code belongs to the HelloWorld class");
    }
}
\`\`\`

- **public** — Anyone can access this class
- **class** — We're defining a class (blueprint)
- **HelloWorld** — The name of our class
- **{ }** — Everything inside belongs to this class

**Rule:** The filename must match the class name. This file must be \`HelloWorld.java\`.

### The Main Method

\`\`\`java
public class MainMethodDemo {
    public static void main(String[] args) {
        System.out.println("Java starts running from the main method");
    }
}
\`\`\`

This is the entry point — where your program starts running.

- **public** — Accessible from anywhere
- **static** — No need to create an object
- **void** — Returns nothing
- **main** — Special name Java looks for
- **String[] args** — Command-line arguments

**Every Java application needs a main method to run.**

### The Print Statement

\`\`\`java
public class PrintStatementDemo {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

- **System** — A built-in class
- **out** — The output stream
- **println** — Print and go to next line
- **"Hello, World!"** — The text to print
- **;** — Statement terminator (required!)

---

## Basic Syntax Rules

### 1. Statements End with Semicolons

Every statement must end with \`;\`. In real code, one missing semicolon can stop the whole project from compiling, even if the business logic is correct.

\`\`\`java
public class SemicolonDemo {
    public static void main(String[] args) {
        int x = 5;
        String name = "Dattu";

        System.out.println(x);
        System.out.println(name);
    }
}
\`\`\`

**Common mistake:** Forgetting the semicolon!

### 2. Code Blocks Use Curly Braces

Curly braces define the exact area controlled by a class, method, loop, or condition. In real work, misplaced braces can put validation, payment, or permission code in the wrong block.

\`\`\`java
public class CodeBlockDemo {
    public static void main(String[] args) {
        boolean isLoggedIn = true;

        if (isLoggedIn) {
            System.out.println("User can open dashboard");
        }

        for (int i = 1; i <= 3; i++) {
            System.out.println("Notification " + i);
        }
    }
}
\`\`\`

### 3. Java is Case-Sensitive

Case sensitivity matters when calling library classes and project methods. \`System\`, \`String\`, \`getUserById\`, and \`getUserByID\` are treated differently.

\`\`\`java
public class CaseSensitiveDemo {
    public static void main(String[] args) {
        String name = "Dattu";
        String Name = "Ravi";  // Different variable
        String NAME = "Amit";  // Also different

        System.out.println(name);
        System.out.println(Name);
        System.out.println(NAME);

        System.out.println("Correct: System starts with capital S");
        // system.out.println("Wrong"); // Error: cannot find symbol system
    }
}
\`\`\`

### 4. Whitespace is Ignored (Mostly)

Java doesn't care about extra spaces or blank lines:

\`\`\`java
public class WhitespaceDemo {
    public static void main(String[] args) {
        int firstNumber=5;
        int secondNumber = 5;
        int thirdNumber    =    5;

        System.out.println(firstNumber + secondNumber + thirdNumber);
    }
}
\`\`\`

But use whitespace for readability!

---

## Naming Conventions

Java has strong conventions (not rules, but everyone follows them). These conventions make large projects readable when many developers work on controllers, services, repositories, DTOs, and tests.

### Classes — PascalCase
\`\`\`java
public class NamingConventionDemo {
    static class BankAccount {
        String accountHolder = "Dattu";
    }

    static class HttpRequest {
        String method = "GET";
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        HttpRequest request = new HttpRequest();

        System.out.println(account.accountHolder);
        System.out.println(request.method);
    }
}
\`\`\`

### Methods & Variables — camelCase
\`\`\`java
public class CamelCaseDemo {
    static int calculateTotal(int price, int quantity) {
        return price * quantity;
    }

    static boolean isValid(int total) {
        return total > 0;
    }

    public static void main(String[] args) {
        String firstName = "Dattu";
        int myVariable = calculateTotal(250, 2);

        System.out.println(firstName + " total: " + myVariable);
        System.out.println("Valid bill: " + isValid(myVariable));
    }
}
\`\`\`

### Constants — UPPER_SNAKE_CASE
\`\`\`java
public class ConstantNamingDemo {
    public static void main(String[] args) {
        final int MAX_SIZE = 100;
        final double PI = 3.14159;
        final String DATABASE_URL = "localhost";

        System.out.println("Max size: " + MAX_SIZE);
        System.out.println("PI: " + PI);
        System.out.println("Database: " + DATABASE_URL);
    }
}
\`\`\`

### Packages — lowercase
\`\`\`java
package com.learnstackhub.syntax;

public class PackageNameDemo {
    public static void main(String[] args) {
        System.out.println("This class belongs to com.learnstackhub.syntax");
    }
}
\`\`\`

---

## Comments

Comments are notes for humans — Java ignores them. Use comments to explain business rules, tricky validations, external API behavior, or why a workaround exists; do not comment obvious lines.

### Single-Line Comments
\`\`\`java
public class SingleLineCommentDemo {
    public static void main(String[] args) {
        // Store the number of login attempts allowed
        int maxAttempts = 3;

        System.out.println("Max attempts: " + maxAttempts); // Print result
    }
}
\`\`\`

### Multi-Line Comments
\`\`\`java
public class MultiLineCommentDemo {
    public static void main(String[] args) {
        /*
         This calculation is simple now.
         In a real billing app, tax and discount rules may come from database.
        */
        int price = 1000;
        int discount = 100;

        System.out.println("Final price: " + (price - discount));
    }
}
\`\`\`

### Documentation Comments (Javadoc)
\`\`\`java
public class JavadocCommentDemo {
    /**
     * Calculates the sum of two numbers.
     * @param a first number
     * @param b second number
     * @return sum of a and b
     */
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("Sum: " + add(10, 20));
    }
}
\`\`\`

---

## Code Structure

A typical Java file structure. This same order appears in real files: package first, imports next, class name, fields, constructors, methods, and sometimes a \`main\` method for testing.

\`\`\`java
// 1. Package declaration (optional)
package com.learnstackhub.syntax;

// 2. Import statements
import java.util.ArrayList;
import java.util.Scanner;

// 3. Class declaration
public class JavaFileStructureDemo {
    
    // 4. Instance variables
    private String name;
    private int age;
    
    // 5. Constructor
    public JavaFileStructureDemo(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 6. Methods
    public void display() {
        System.out.println(name + " is " + age);
    }
    
    // 7. Main method (entry point)
    public static void main(String[] args) {
        JavaFileStructureDemo obj = new JavaFileStructureDemo("Dattu", 25);
        obj.display();
    }
}
\`\`\`

---

## Common Syntax Errors

### Missing Semicolon
\`\`\`java
public class MissingSemicolonError {
    public static void main(String[] args) {
        // int x = 5  // Error: ';' expected

        int x = 5;
        System.out.println("Correct value: " + x);
    }
}
\`\`\`

### Mismatched Braces
\`\`\`java
public class MismatchedBracesError {
    public static void main(String[] args) {
        if (true) {
            System.out.println("Hi");
        } // Correct: block is closed properly
    }
}
\`\`\`

### Wrong Case
\`\`\`java
public class WrongCaseError {
    public static void main(String[] args) {
        // system.out.println("Hi"); // Error: 'system' should be 'System'

        System.out.println("Hi");
    }
}
\`\`\`

### String with Single Quotes
\`\`\`java
public class QuoteUsageError {
    public static void main(String[] args) {
        // String name = 'Dattu'; // Error: use double quotes for String
        // char letter = "A";     // Error: use single quotes for char

        String name = "Dattu";
        char letter = 'A';

        System.out.println(name + " grade: " + letter);
    }
}
\`\`\`

---

## Print Statements

Different ways to output. In beginner programs this means console printing; in real apps the same idea becomes logs, debug messages, formatted reports, and command-line tool output.

\`\`\`java
public class PrintMethodsDemo {
    public static void main(String[] args) {
        System.out.println("Hello");          // Prints and adds new line
        System.out.print("Java ");            // Prints without new line
        System.out.print("Learner");
        System.out.println();
        System.out.printf("Age: %d%n", 25);   // Formatted output
    }
}
\`\`\`

**printf format specifiers:**
- \`%d\` — Integer
- \`%f\` — Float/Double
- \`%s\` — String
- \`%n\` — New line
- \`%.2f\` — Float with 2 decimal places

\`\`\`java
public class FormattedOutputDemo {
    public static void main(String[] args) {
        String name = "Dattu";
        int age = 25;
        double salary = 50000.50;

        System.out.printf("Name: %s, Age: %d, Salary: $%.2f%n", name, age, salary);
    }
}
\`\`\`

---

## Quick Reference

| Element | Rule |
|---------|------|
| Statements | End with \`;\` |
| Blocks | Wrapped in \`{ }\` |
| Strings | Use \`" "\` double quotes |
| Characters | Use \`' '\` single quotes |
| Class names | PascalCase |
| Variable names | camelCase |
| Constants | UPPER_SNAKE_CASE |
| File name | Must match public class name |

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
---

## Topic-Focused Practice for Java Syntax

### Real-World Scenarios

1. Build one mini exercise focused on **class structure** and explain why your chosen approach is correct.
2. Add a second variation where **statement syntax** changes the expected output or system behavior.
3. Document one production caution related to **compile-time rules** and how you would monitor it.

### Page-Specific Interview Questions

1. In Java Syntax, how do you decide between approaches related to **class structure** when requirements conflict?
2. What debugging steps would you follow if **statement syntax** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **compile-time rules**, and how would you reduce them?
4. What is one real incident where misunderstanding **class structure** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **statement syntax** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **class structure** and one that highlights **statement syntax**.
- Record typical errors around **compile-time rules** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

---

## Deep Understanding: Syntax Is the Compiler Contract

Java syntax is the formal grammar that maps source text to valid program structure. It is not cosmetic. Correct syntax allows the compiler to build a consistent abstract model of your program.

Semicolons, braces, declarations, and type annotations together provide unambiguous structure. This strictness is why Java catches many defects before runtime.

## Theory to Practice

When freshers treat syntax as memorization, they struggle with debugging. When they treat syntax as a structure language, errors become easier to reason about:

- scope errors become visibility mistakes,
- token errors become grammar mistakes,
- type errors become contract mismatches.

Mastering syntax means mastering how Java thinks, not just how Java looks.

`,
  code: `// Java Syntax Demo - Understanding Java code structure

// Package declaration would go here (optional)
// package com.example.demo;

// Import statements
import java.util.Date;

public class JavaSyntaxDemo {
    
    // Class-level constant
    static final String PROGRAM_NAME = "Syntax Demo";
    
    // Instance variable
    private String message;
    
    // Constructor
    public JavaSyntaxDemo(String message) {
        this.message = message;
    }
    
    // Instance method
    public void displayMessage() {
        System.out.println("Message: " + message);
    }
    
    // Main method - entry point
    public static void main(String[] args) {
        System.out.println("=== " + PROGRAM_NAME + " ===\\n");
        
        // 1. BASIC SYNTAX
        System.out.println("1. BASIC SYNTAX");
        System.out.println("   -------------");
        
        // Variable declarations
        int number = 42;
        String text = "Hello, Java!";
        boolean flag = true;
        
        System.out.println("   int number = " + number);
        System.out.println("   String text = " + text);
        System.out.println("   boolean flag = " + flag);
        System.out.println();
        
        // 2. COMMENTS
        System.out.println("2. COMMENTS");
        System.out.println("   ---------");
        System.out.println("   // Single-line comment");
        System.out.println("   /* Multi-line comment */");
        System.out.println("   /** Javadoc comment */");
        System.out.println();
        
        // 3. CODE BLOCKS
        System.out.println("3. CODE BLOCKS");
        System.out.println("   ------------");
        
        // If block
        if (number > 0) {
            System.out.println("   if block: number is positive");
        }
        
        // For loop block
        System.out.print("   for loop: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        System.out.println();
        
        // 4. NAMING CONVENTIONS
        System.out.println("4. NAMING CONVENTIONS");
        System.out.println("   -------------------");
        System.out.println("   Classes: PascalCase (MyClass)");
        System.out.println("   Methods: camelCase (myMethod)");
        System.out.println("   Variables: camelCase (myVariable)");
        System.out.println("   Constants: UPPER_SNAKE_CASE (MAX_VALUE)");
        System.out.println();
        
        // 5. PRINT METHODS
        System.out.println("5. PRINT METHODS");
        System.out.println("   --------------");
        
        System.out.println("   println - prints with newline");
        System.out.print("   print - ");
        System.out.print("no newline ");
        System.out.println("(continued)");
        
        String name = "Alice";
        int age = 25;
        double salary = 50000.50;
        System.out.printf("   printf - Name: %s, Age: %d, Salary: $%.2f%n", 
                          name, age, salary);
        System.out.println();
        
        // 6. CREATING OBJECTS
        System.out.println("6. CREATING OBJECTS");
        System.out.println("   -----------------");
        
        JavaSyntaxDemo demo = new JavaSyntaxDemo("Hello from object!");
        System.out.print("   ");
        demo.displayMessage();
        
        Date today = new Date();
        System.out.println("   Current date: " + today);
        System.out.println();
        
        // 7. CASE SENSITIVITY
        System.out.println("7. CASE SENSITIVITY");
        System.out.println("   -----------------");
        
        String Name = " Dattu";
        String name2 = "Jane";
        String NAME = "Bob";
        
        System.out.println("   Name = " + Name);
        System.out.println("   name2 = " + name2);
        System.out.println("   NAME = " + NAME);
        System.out.println("   (All different variables!)");
    }
}

---

## Test Your Knowledge

Mastered Java syntax? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering syntax, OOPs, and all Core Java topics!
`,
  practiceQuestions: [
    {
      question: 'Fix the syntax errors in this code',
      hint: 'Look for missing semicolons, wrong quotes, and case issues',
      starterCode: `public class SyntaxPractice {
    public static void main(String[] args) {
        // Correct syntax examples
        String greeting = "Hello, World!";
        int count = 10;
        char grade = 'A';
        boolean isValid = true;
        
        // Print statements
        System.out.println(greeting);
        System.out.println("Count: " + count);
        System.out.println("Grade: " + grade);
        System.out.println("Valid: " + isValid);
        
        // Using printf
        System.out.printf("Summary: %s, Count=%d, Grade=%c%n", 
                          greeting, count, grade);
    }
}`
    }
  ]
};

export default javaSyntax;
