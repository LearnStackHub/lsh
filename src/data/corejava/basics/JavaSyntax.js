const javaSyntax = {
  id: 'java-syntax',
  title: 'Java Syntax',
  description: 'The grammar rules of Java programming',
  content: `
# Java Syntax — The Grammar of Java

Every language has grammar rules. English has subjects, verbs, and punctuation. Java has its own rules too. Understanding Java syntax is like learning the alphabet before writing sentences.

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

This simple program has a lot going on. Let's dissect it:

### The Class Declaration

\`\`\`java
public class HelloWorld {
    // code goes here
}
\`\`\`

- **public** — Anyone can access this class
- **class** — We're defining a class (blueprint)
- **HelloWorld** — The name of our class
- **{ }** — Everything inside belongs to this class

**Rule:** The filename must match the class name. This file must be \`HelloWorld.java\`.

### The Main Method

\`\`\`java
public static void main(String[] args) {
    // code goes here
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
System.out.println("Hello, World!");
\`\`\`

- **System** — A built-in class
- **out** — The output stream
- **println** — Print and go to next line
- **"Hello, World!"** — The text to print
- **;** — Statement terminator (required!)

---

## Basic Syntax Rules

### 1. Statements End with Semicolons

Every statement must end with \`;\`

\`\`\`java
int x = 5;
System.out.println(x);
String name = " Dattu";
\`\`\`

**Common mistake:** Forgetting the semicolon!

### 2. Code Blocks Use Curly Braces

\`\`\`java
if (condition) {
    // code block
}

for (int i = 0; i < 10; i++) {
    // code block
}

public void myMethod() {
    // code block
}
\`\`\`

### 3. Java is Case-Sensitive

\`\`\`java
String name = " Dattu";
String Name = "Jane";  // Different variable!
String NAME = "Bob";   // Also different!

// System vs system
System.out.println("Hi");  // Correct
system.out.println("Hi");  // ERROR!
\`\`\`

### 4. Whitespace is Ignored (Mostly)

Java doesn't care about extra spaces or blank lines:

\`\`\`java
// These are identical to Java:
int x=5;
int x = 5;
int x    =    5;
\`\`\`

But use whitespace for readability!

---

## Naming Conventions

Java has strong conventions (not rules, but everyone follows them):

### Classes — PascalCase
\`\`\`java
public class MyClass { }
public class BankAccount { }
public class HttpRequest { }
\`\`\`

### Methods & Variables — camelCase
\`\`\`java
int myVariable;
String firstName;
void calculateTotal() { }
boolean isValid() { }
\`\`\`

### Constants — UPPER_SNAKE_CASE
\`\`\`java
final int MAX_SIZE = 100;
final double PI = 3.14159;
final String DATABASE_URL = "localhost";
\`\`\`

### Packages — lowercase
\`\`\`java
package com.mycompany.myapp;
package java.util;
\`\`\`

---

## Comments

Comments are notes for humans — Java ignores them.

### Single-Line Comments
\`\`\`java
// This is a single-line comment
int x = 5;  // Comment at end of line
\`\`\`

### Multi-Line Comments
\`\`\`java
/* This is a
   multi-line comment
   spanning several lines */
\`\`\`

### Documentation Comments (Javadoc)
\`\`\`java
/**
 * Calculates the sum of two numbers.
 * @param a First number
 * @param b Second number
 * @return The sum of a and b
 */
public int add(int a, int b) {
    return a + b;
}
\`\`\`

---

## Code Structure

A typical Java file structure:

\`\`\`java
// 1. Package declaration (optional)
package com.mycompany.myapp;

// 2. Import statements
import java.util.ArrayList;
import java.util.Scanner;

// 3. Class declaration
public class MyClass {
    
    // 4. Instance variables
    private String name;
    private int age;
    
    // 5. Constructor
    public MyClass(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 6. Methods
    public void display() {
        System.out.println(name + " is " + age);
    }
    
    // 7. Main method (entry point)
    public static void main(String[] args) {
        MyClass obj = new MyClass(" Dattu", 25);
        obj.display();
    }
}
\`\`\`

---

## Common Syntax Errors

### Missing Semicolon
\`\`\`java
int x = 5  // ERROR: ';' expected
\`\`\`

### Mismatched Braces
\`\`\`java
if (true) {
    System.out.println("Hi");
// ERROR: Missing closing brace
\`\`\`

### Wrong Case
\`\`\`java
system.out.println("Hi");  // ERROR: 'system' should be 'System'
\`\`\`

### String with Single Quotes
\`\`\`java
String name = ' Dattu';  // ERROR: Use double quotes for strings
char letter = "A";     // ERROR: Use single quotes for char
\`\`\`

---

## Print Statements

Different ways to output:

\`\`\`java
System.out.println("Hello");  // Prints and adds new line
System.out.print("Hello");    // Prints without new line
System.out.printf("Age: %d", 25);  // Formatted output
\`\`\`

**printf format specifiers:**
- \`%d\` — Integer
- \`%f\` — Float/Double
- \`%s\` — String
- \`%n\` — New line
- \`%.2f\` — Float with 2 decimal places

\`\`\`java
String name = " Dattu";
int age = 25;
double salary = 50000.50;

System.out.printf("Name: %s, Age: %d, Salary: $%.2f%n", name, age, salary);
// Output: Name:  Dattu, Age: 25, Salary: $50000.50
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
