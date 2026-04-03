const javaKeywords = {
  id: 'java-keywords',
  title: 'Java Keywords',
  description: 'Reserved words with special meaning in Java',
  content: `
# Java Keywords — Reserved Words You Can't Use

Keywords are special words that Java has reserved for itself. They have specific meanings and purposes in the language. You cannot use them as variable names, class names, or method names.

Think of them as "taken" — Java got there first!

---

## All 50+ Java Keywords

Java has about 50 reserved keywords. Let's organize them by purpose:

### Data Type Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| byte | 8-bit integer | \`byte b = 127;\` |
| short | 16-bit integer | \`short s = 32000;\` |
| int | 32-bit integer | \`int i = 100;\` |
| long | 64-bit integer | \`long l = 100L;\` |
| float | 32-bit decimal | \`float f = 3.14f;\` |
| double | 64-bit decimal | \`double d = 3.14;\` |
| char | Single character | \`char c = 'A';\` |
| boolean | true/false | \`boolean b = true;\` |
| void | No return value | \`void method() {}\` |

### Access Modifiers

| Keyword | Visibility |
|---------|------------|
| public | Accessible everywhere |
| private | Only within the class |
| protected | Within package + subclasses |
| (default) | Within package only |

### Class & Object Keywords

| Keyword | Purpose |
|---------|---------|
| class | Define a class |
| interface | Define an interface |
| extends | Inherit from a class |
| implements | Implement an interface |
| new | Create an object |
| this | Reference current object |
| super | Reference parent class |
| instanceof | Check object type |
| enum | Define enumeration |

### Control Flow Keywords

| Keyword | Purpose |
|---------|---------|
| if | Conditional statement |
| else | Alternative branch |
| switch | Multi-way branch |
| case | Switch branch |
| default | Default switch branch |
| for | Loop with counter |
| while | Loop with condition |
| do | Do-while loop |
| break | Exit loop/switch |
| continue | Skip to next iteration |
| return | Return from method |

### Exception Keywords

| Keyword | Purpose |
|---------|---------|
| try | Start exception block |
| catch | Handle exception |
| finally | Always execute |
| throw | Throw an exception |
| throws | Declare exceptions |

### Modifier Keywords

| Keyword | Purpose |
|---------|---------|
| static | Belongs to class, not object |
| final | Cannot be changed/overridden |
| abstract | No implementation |
| synchronized | Thread-safe |
| volatile | Direct memory access |
| transient | Skip serialization |
| native | Implemented in other language |
| strictfp | Strict floating-point |

### Package Keywords

| Keyword | Purpose |
|---------|---------|
| package | Declare package |
| import | Import classes |

### Other Keywords

| Keyword | Purpose |
|---------|---------|
| assert | Debug assertions |
| const | Reserved (not used) |
| goto | Reserved (not used) |

---

## Most Important Keywords Explained

### static

Belongs to the class itself, not to any object:

\`\`\`java
public class Counter {
    static int count = 0;  // Shared by all objects
    
    public Counter() {
        count++;
    }
    
    public static void main(String[] args) {
        new Counter();
        new Counter();
        System.out.println(count);  // Output: 2
    }
}
\`\`\`

### final

Makes things unchangeable:

\`\`\`java
// Final variable - constant
final int MAX = 100;
MAX = 200;  // ERROR!

// Final method - can't override
public final void display() { }

// Final class - can't extend
public final class String { }
\`\`\`

### this

Refers to the current object:

\`\`\`java
public class Person {
    String name;
    
    public Person(String name) {
        this.name = name;  // this.name is the field
    }
}
\`\`\`

### super

Refers to the parent class:

\`\`\`java
public class Dog extends Animal {
    public Dog() {
        super();  // Call parent constructor
    }
    
    public void speak() {
        super.speak();  // Call parent method
        System.out.println("Woof!");
    }
}
\`\`\`

### abstract

Declares something without implementation:

\`\`\`java
public abstract class Shape {
    abstract double getArea();  // No body
}

public class Circle extends Shape {
    double radius;
    
    double getArea() {
        return Math.PI * radius * radius;  // Must implement
    }
}
\`\`\`

### synchronized

Makes code thread-safe:

\`\`\`java
public synchronized void withdraw(double amount) {
    if (balance >= amount) {
        balance -= amount;
    }
}
\`\`\`

---

## Common Mistakes

### Using Keywords as Names

\`\`\`java
int class = 5;      // ERROR! 'class' is a keyword
String new = "hi";  // ERROR! 'new' is a keyword
boolean for = true; // ERROR! 'for' is a keyword
\`\`\`

### Confusing Similar Keywords

\`\`\`java
// throw vs throws
throw new Exception();  // Actually throw an exception
void method() throws Exception { }  // Declare that method might throw

// this vs super
this.name = name;   // Current object's field
super.name = name;  // Parent class's field
\`\`\`

---

## Literals (Not Keywords, But Reserved)

These aren't technically keywords, but they're reserved:

| Literal | Meaning |
|---------|---------|
| true | Boolean true |
| false | Boolean false |
| null | No object reference |

\`\`\`java
boolean flag = true;
boolean other = false;
String name = null;
\`\`\`

---

## Quick Reference by Category

**Creating things:** class, interface, enum, new
**Inheritance:** extends, implements, super
**Access:** public, private, protected
**Data types:** int, double, boolean, char, etc.
**Control flow:** if, else, for, while, switch
**Exceptions:** try, catch, finally, throw, throws
**Modifiers:** static, final, abstract, synchronized
**References:** this, super, null

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
  code: `// Java Keywords Demo - Understanding reserved words

public class KeywordsDemo {
    
    // 'static' - belongs to class, not object
    static int instanceCount = 0;
    
    // 'final' - constant, cannot change
    static final String APP_NAME = "Keywords Demo";
    static final double PI = 3.14159;
    
    // Instance variables
    private String name;  // 'private' - only accessible in this class
    
    // Constructor
    public KeywordsDemo(String name) {
        this.name = name;  // 'this' - refers to current object
        instanceCount++;
    }
    
    public static void main(String[] args) {
        System.out.println("=== " + APP_NAME + " ===\\n");
        
        // 1. DATA TYPE KEYWORDS
        System.out.println("1. DATA TYPE KEYWORDS");
        System.out.println("   -------------------");
        
        byte byteVar = 127;
        short shortVar = 32000;
        int intVar = 100000;
        long longVar = 100000L;
        float floatVar = 3.14f;
        double doubleVar = 3.14159;
        char charVar = 'A';
        boolean boolVar = true;
        
        System.out.println("   byte: " + byteVar);
        System.out.println("   short: " + shortVar);
        System.out.println("   int: " + intVar);
        System.out.println("   long: " + longVar);
        System.out.println("   float: " + floatVar);
        System.out.println("   double: " + doubleVar);
        System.out.println("   char: " + charVar);
        System.out.println("   boolean: " + boolVar);
        System.out.println();
        
        // 2. STATIC AND FINAL
        System.out.println("2. STATIC AND FINAL");
        System.out.println("   -----------------");
        
        KeywordsDemo obj1 = new KeywordsDemo("First");
        KeywordsDemo obj2 = new KeywordsDemo("Second");
        
        System.out.println("   Objects created: " + instanceCount);
        System.out.println("   PI (final): " + PI);
        System.out.println();
        
        // 3. CONTROL FLOW KEYWORDS
        System.out.println("3. CONTROL FLOW KEYWORDS");
        System.out.println("   ----------------------");
        
        int score = 85;
        
        // if-else
        if (score >= 90) {
            System.out.println("   Grade: A");
        } else if (score >= 80) {
            System.out.println("   Grade: B");
        } else {
            System.out.println("   Grade: C or below");
        }
        
        // switch
        int day = 3;
        String dayName;
        switch (day) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            default: dayName = "Other";
        }
        System.out.println("   Day " + day + " is " + dayName);
        
        // for loop with break and continue
        System.out.print("   Even numbers 1-10: ");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) continue;  // Skip odd
            System.out.print(i + " ");
        }
        System.out.println();
        System.out.println();
        
        // 4. EXCEPTION KEYWORDS
        System.out.println("4. EXCEPTION KEYWORDS");
        System.out.println("   -------------------");
        
        try {
            int result = 10 / 2;
            System.out.println("   10 / 2 = " + result);
        } catch (ArithmeticException e) {
            System.out.println("   Error: " + e.getMessage());
        } finally {
            System.out.println("   Finally block always runs");
        }
        System.out.println();
        
        // 5. THIS KEYWORD
        System.out.println("5. THIS KEYWORD");
        System.out.println("   -------------");
        System.out.println("   obj1.name = " + obj1.getName());
        System.out.println("   obj2.name = " + obj2.getName());
        System.out.println();
        
        // 6. INSTANCEOF KEYWORD
        System.out.println("6. INSTANCEOF KEYWORD");
        System.out.println("   -------------------");
        
        String text = "Hello";
        System.out.println("   'Hello' instanceof String: " + (text instanceof String));
        
        Object obj = "Test";
        System.out.println("   obj instanceof String: " + (obj instanceof String));
        System.out.println();
        
        // 7. NULL LITERAL
        System.out.println("7. NULL LITERAL");
        System.out.println("   -------------");
        
        String nullString = null;
        System.out.println("   nullString == null: " + (nullString == null));
        
        if (nullString != null) {
            System.out.println("   " + nullString.length());
        } else {
            System.out.println("   Cannot get length of null!");
        }
    }
    
    // Getter method using 'this'
    public String getName() {
        return this.name;
    }
}

---

## Test Your Knowledge

Mastered Java keywords? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering keywords, modifiers, and all Core Java topics!
`,
  practiceQuestions: [
    {
      question: 'Demonstrate the use of static, final, and this keywords',
      hint: 'Create a class with static counter, final constant, and use this in constructor',
      starterCode: `public class KeywordsPractice {
    // Static variable - shared by all objects
    static int objectCount = 0;
    
    // Final constant - cannot change
    static final String COMPANY = "TechCorp";
    
    // Instance variables
    private String employeeName;
    private int employeeId;
    
    // Constructor using 'this'
    public KeywordsPractice(String employeeName, int employeeId) {
        this.employeeName = employeeName;
        this.employeeId = employeeId;
        objectCount++;  // Increment static counter
    }
    
    public void display() {
        System.out.println("Company: " + COMPANY);
        System.out.println("Employee: " + this.employeeName);
        System.out.println("ID: " + this.employeeId);
    }
    
    public static void main(String[] args) {
        System.out.println("=== Keywords Practice ===\\n");
        
        KeywordsPractice emp1 = new KeywordsPractice("Alice", 101);
        KeywordsPractice emp2 = new KeywordsPractice("Bob", 102);
        KeywordsPractice emp3 = new KeywordsPractice("Charlie", 103);
        
        emp1.display();
        System.out.println();
        emp2.display();
        System.out.println();
        emp3.display();
        
        System.out.println("\\nTotal employees created: " + objectCount);
    }
}`
    }
  ]
};

export default javaKeywords;
