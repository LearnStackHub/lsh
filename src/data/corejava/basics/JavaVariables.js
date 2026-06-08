const javaVariables = {
  id: 'java-variables',
  title: 'Variables in Java',
  description: 'How to store and manage data in your programs',
  content: `
# Variables — Storing Data in Java

Every program needs to store data. A user's name, their age, a product price, a login status, a failed-login count, a cart total, or a database id all need to live somewhere while your program runs. That's what variables are for.

A **variable** is simply a named container that holds a value. You give it a name, tell Java what type of data it will hold, and then use it while processing a request, calculating a bill, validating a form, or preparing output for the user.

---

## Declaring Variables

Here is a complete runnable program showing the basic syntax. Notice how each variable represents one real piece of screen or backend data: age, name, price, and login status.

\`\`\`java
public class VariableDeclarationDemo {
    public static void main(String[] args) {
        int age = 25;
        String name = "Dattu";
        double price = 99.99;
        boolean isLoggedIn = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Price: " + price);
        System.out.println("Logged in: " + isLoggedIn);
    }
}
\`\`\`

Syntax pattern used inside the program:

\`\`\`java
public class VariableSyntaxPattern {
    public static void main(String[] args) {
        // dataType variableName = value;
        int quantity = 5;
        System.out.println("Quantity: " + quantity);
    }
}
\`\`\`

**Variable Declaration Components:**
- **int** — the data type (integer number)
- **age** — the variable name (you choose this)
- **25** — the initial value

You can also declare first and assign later. This is common when the value depends on a condition, a database result, or user input that is not available at the first line.

\`\`\`java
public class DeclareThenAssignDemo {
    public static void main(String[] args) {
        int age;
        age = 25;

        System.out.println("Age after assignment: " + age);
    }
}
\`\`\`

---

## Naming Rules

Java has rules about what you can name your variables. In real projects, names are read more often than they are written, so a clear name like \`invoiceTotal\` or \`failedLoginAttempts\` saves debugging time.

**Must follow:**
- Start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, digits, underscores, dollar signs
- Cannot be a Java keyword (like \`int\`, \`class\`, \`public\`)
- Case-sensitive (\`age\` and \`Age\` are different)

**Good names:**
\`\`\`java
public class GoodVariableNames {
    public static void main(String[] args) {
        int userAge = 24;
        String firstName = "Ravi";
        double accountBalance = 15000.75;
        boolean isActive = true;

        System.out.println(firstName + " age: " + userAge);
        System.out.println("Balance: " + accountBalance);
        System.out.println("Active: " + isActive);
    }
}
\`\`\`

**Bad names shown inside a full program as comments because they will not compile:**
\`\`\`java
public class BadVariableNames {
    public static void main(String[] args) {
        // int 2fast = 100;        // Error: cannot start with a number
        // String my-name = "Amit"; // Error: hyphen is not allowed
        // double class = 99.5;     // Error: class is a Java keyword

        int speed = 100;
        String myName = "Amit";
        double score = 99.5;

        System.out.println(speed);
        System.out.println(myName);
        System.out.println(score);
    }
}
\`\`\`

**Convention:** Use camelCase for variable names. Start with lowercase, capitalize each new word: \`firstName\`, \`totalAmount\`, \`isUserLoggedIn\`. Prefer business names over short names: \`taxAmount\` is better than \`t\` when a billing bug appears.

---

## Types of Variables

Java has three types of variables based on where they're declared:

### 1. Local Variables

Declared inside a method. Only accessible within that method. Use local variables for temporary work such as calculating one order total, checking one password, or preparing one response.

\`\`\`java
public class LocalVariableDemo {
    public static void main(String[] args) {
        calculateTotal();
    }

    public static void calculateTotal() {
        int quantity = 5;
        double price = 10.99;
        double total = quantity * price;

        System.out.println("Total bill: " + total);
    }
}
\`\`\`

**Key points:**
- Must be initialized before use
- No default value
- Destroyed when method ends, which is why they are good for temporary request-level calculations

### 2. Instance Variables

Declared inside a class but outside methods. Each object gets its own copy. Use instance variables for data that belongs to one object, like one employee's name, one account's balance, or one product's stock.

\`\`\`java
public class InstanceVariableDemo {
    String name;
    int age;

    public InstanceVariableDemo(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void printInfo() {
        System.out.println(name + " is " + age + " years old");
    }

    public static void main(String[] args) {
        InstanceVariableDemo user1 = new InstanceVariableDemo("Ravi", 24);
        InstanceVariableDemo user2 = new InstanceVariableDemo("Amit", 26);

        user1.printInfo();
        user2.printInfo();
    }
}
\`\`\`

**Key points:**
- Belong to an object
- Have default values (0 for numbers, null for objects, false for boolean)
- Accessible throughout the class, so methods of the same object can use the same state

### 3. Static Variables (Class Variables)

Declared with the \`static\` keyword. Shared by all objects of the class. Use static variables carefully for shared counters, constants, and application-wide settings; avoid using them for user-specific data.

\`\`\`java
public class StaticVariableDemo {
    static int totalUsers = 0;
    String name;

    public StaticVariableDemo(String name) {
        this.name = name;
        totalUsers++;
    }

    public static void main(String[] args) {
        StaticVariableDemo user1 = new StaticVariableDemo("Ravi");
        StaticVariableDemo user2 = new StaticVariableDemo("Amit");
        StaticVariableDemo user3 = new StaticVariableDemo("Dattu");

        System.out.println("Created users: " + user1.name + ", " + user2.name + ", " + user3.name);
        System.out.println("Total users: " + StaticVariableDemo.totalUsers);
    }
}
\`\`\`

**Key points:**
- One copy shared by all objects
- Can be accessed without creating an object
- Use for constants or counters, not for values that should differ per user or per request

---

## Default Values

Instance and static variables get default values if you don't initialize them. This matters in entity/model classes because missing values can silently become \`0\`, \`false\`, or \`null\`.

| Type | Default Value |
|------|---------------|
| int, short, byte, long | 0 |
| float, double | 0.0 |
| char | '\\u0000' (null character) |
| boolean | false |
| Object references | null |

**Important:** Local variables do NOT get default values. You must initialize them.

\`\`\`java
public class LocalVariableInitializationError {
    public static void main(String[] args) {
        // int x;
        // System.out.println(x); // Error: variable x might not have been initialized

        int x = 0;
        System.out.println("Initialized x: " + x);
    }
}
\`\`\`

---

## Constants (final)

Sometimes you want a variable that never changes. Use the \`final\` keyword for values like tax rate, max login attempts, minimum age, or application constants where accidental changes would create bugs.

\`\`\`java
public class ConstantsDemo {
    public static void main(String[] args) {
        final double PI = 3.14159;
        final int MAX_USERS = 100;
        final String COMPANY_NAME = "TechCorp";

        System.out.println("Company: " + COMPANY_NAME);
        System.out.println("Max users: " + MAX_USERS);
        System.out.println("PI value: " + PI);
    }
}
\`\`\`

**Convention:** Use ALL_CAPS with underscores for constants.

Once assigned, you can't change a final variable:

\`\`\`java
public class FinalVariableError {
    public static void main(String[] args) {
        final int MAX = 100;
        // MAX = 200; // Error: cannot assign a value to final variable MAX

        System.out.println("MAX value: " + MAX);
    }
}
\`\`\`

---

## Real-World Example

Let's see variables in a practical context: a simple user profile where instance variables store one user's data, a static variable counts all profiles, and a constant protects the minimum allowed age rule.

\`\`\`java
public class UserProfile {
    private String username;
    private String email;
    private int age;
    private boolean isPremium;

    private static int totalProfiles = 0;
    private static final int MIN_AGE = 13;

    public UserProfile(String username, String email, int age) {
        this.username = username;
        this.email = email;

        boolean isValidAge = age >= MIN_AGE;

        if (isValidAge) {
            this.age = age;
        } else {
            this.age = MIN_AGE;
        }
        
        this.isPremium = false;
        totalProfiles++;
    }

    public void printProfile() {
        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.println("Age: " + age);
        System.out.println("Premium: " + isPremium);
    }

    public static void main(String[] args) {
        UserProfile profile1 = new UserProfile("ravi24", "ravi@example.com", 24);
        UserProfile profile2 = new UserProfile("childUser", "child@example.com", 10);

        profile1.printProfile();
        profile2.printProfile();
        System.out.println("Total profiles: " + UserProfile.totalProfiles);
    }
}
\`\`\`

---

## Common Mistakes

**1. Using before declaring**
\`\`\`java
public class UsingBeforeDeclaringError {
    public static void main(String[] args) {
        // System.out.println(x); // Error: cannot find symbol x

        int x = 10;
        System.out.println("x: " + x);
    }
}
\`\`\`

**2. Type mismatch**
\`\`\`java
public class TypeMismatchError {
    public static void main(String[] args) {
        // int age = "twenty"; // Error: String cannot be converted to int

        int age = 20;
        System.out.println("Age: " + age);
    }
}
\`\`\`

**3. Forgetting to initialize local variables**
\`\`\`java
public class LocalVariableMistake {
    public static void main(String[] args) {
        // int sum;
        // sum = sum + 10; // Error: variable sum might not have been initialized

        int sum = 0;
        sum = sum + 10;
        System.out.println("Sum: " + sum);
    }
}
\`\`\`

**4. Shadowing (same name in different scopes)**
\`\`\`java
public class VariableShadowingDemo {
    static int count = 10;

    public static void main(String[] args) {
        int count = 20;

        System.out.println("Local count: " + count);
        System.out.println("Static count: " + VariableShadowingDemo.count);
    }
}
\`\`\`

---

## Quick Tips

- Use meaningful names: \`userAge\` not \`x\`
- Initialize variables when you declare them when possible
- Use \`final\` for values that shouldn't change
- Keep variable scope as small as possible
- Follow naming conventions consistently

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
---

## Topic-Focused Practice for Variables in Java

### Real-World Scenarios

1. Build one mini exercise focused on **scope and lifetime** and explain why your chosen approach is correct.
2. Add a second variation where **initialization rules** changes the expected output or system behavior.
3. Document one production caution related to **naming conventions** and how you would monitor it.

### Page-Specific Interview Questions

1. In Variables in Java, how do you decide between approaches related to **scope and lifetime** when requirements conflict?
2. What debugging steps would you follow if **initialization rules** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **naming conventions**, and how would you reduce them?
4. What is one real incident where misunderstanding **scope and lifetime** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **initialization rules** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **scope and lifetime** and one that highlights **initialization rules**.
- Record typical errors around **naming conventions** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

---

## Deep Understanding: Variables as State Modeling

Variables are named state holders, but more importantly they encode domain assumptions: type, mutability, scope, and lifetime.

Choosing a variable type is choosing valid value space. Choosing scope is choosing visibility and ownership. Choosing final is choosing immutability guarantees. These decisions influence correctness and thread-safety.

## Real Engineering Insight

Most beginner bugs in Java come from weak state modeling:

- wrong type leads to precision or overflow bugs,
- wrong scope leads to accidental sharing,
- weak naming leads to misunderstanding in maintenance.

Good variable design reduces future bugs before they happen.

`,
  code: `// Variables Demo - Understanding different types of variables

public class VariablesDemo {
    // Static variable - shared by all instances
    static int programRunCount = 0;
    
    // Constant - never changes
    static final String PROGRAM_NAME = "Variables Demo";
    
    public static void main(String[] args) {
        programRunCount++;
        
        System.out.println("=== " + PROGRAM_NAME + " ===");
        System.out.println("Run count: " + programRunCount);
        System.out.println();
        
        // LOCAL VARIABLES
        System.out.println("1. LOCAL VARIABLES");
        System.out.println("   Declared inside methods");
        
        int age = 25;
        String name = " Dattu";
        double salary = 50000.50;
        boolean isEmployed = true;
        
        System.out.println("   age = " + age);
        System.out.println("   name = " + name);
        System.out.println("   salary = " + salary);
        System.out.println("   isEmployed = " + isEmployed);
        System.out.println();
        
        // VARIABLE TYPES
        System.out.println("2. DATA TYPES");
        
        // Integer types
        byte smallNum = 127;           // -128 to 127
        short mediumNum = 32000;       // -32,768 to 32,767
        int normalNum = 2000000000;    // Most common
        long bigNum = 9000000000L;     // Note the L suffix
        
        System.out.println("   byte: " + smallNum);
        System.out.println("   short: " + mediumNum);
        System.out.println("   int: " + normalNum);
        System.out.println("   long: " + bigNum);
        
        // Decimal types
        float price = 19.99f;          // Note the f suffix
        double precisePrice = 19.99;   // More precise
        
        System.out.println("   float: " + price);
        System.out.println("   double: " + precisePrice);
        
        // Other types
        char grade = 'A';
        boolean passed = true;
        
        System.out.println("   char: " + grade);
        System.out.println("   boolean: " + passed);
        System.out.println();
        
        // CONSTANTS
        System.out.println("3. CONSTANTS (final)");
        final double PI = 3.14159;
        final int MAX_SCORE = 100;
        System.out.println("   PI = " + PI);
        System.out.println("   MAX_SCORE = " + MAX_SCORE);
        System.out.println("   These cannot be changed!");
        System.out.println();
        
        // PRACTICAL EXAMPLE
        System.out.println("4. PRACTICAL EXAMPLE - Shopping Cart");
        String productName = "Laptop";
        double productPrice = 999.99;
        int quantity = 2;
        double taxRate = 0.08;
        
        double subtotal = productPrice * quantity;
        double tax = subtotal * taxRate;
        double total = subtotal + tax;
        
        System.out.println("   Product: " + productName);
        System.out.println("   Price: $" + productPrice);
        System.out.println("   Quantity: " + quantity);
        System.out.println("   Subtotal: $" + subtotal);
        System.out.println("   Tax (8%): $" + tax);
        System.out.println("   Total: $" + total);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create variables to store student information',
      hint: 'Use appropriate data types for name, age, GPA, and enrollment status',
      starterCode: `public class StudentInfo {
    public static void main(String[] args) {
        // Declare variables for a student
        String studentName = "Alice  Dattuson";
        int studentAge = 20;
        double gpa = 3.75;
        boolean isEnrolled = true;
        char grade = 'A';
        
        // Print all information
        System.out.println("=== Student Information ===");
        System.out.println("Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + isEnrolled);
        System.out.println("Current Grade: " + grade);
        
        // Try adding more variables!
    }
}

---

## Test Your Knowledge

Mastered Java variables? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering variables, data types, and all Core Java topics!
`
    }
  ]
};

export default javaVariables;
