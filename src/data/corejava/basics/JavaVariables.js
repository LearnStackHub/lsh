const javaVariables = {
  id: 'java-variables',
  title: 'Variables in Java',
  description: 'How to store and manage data in your programs',
  content: `
# Variables — Storing Data in Java

Every program needs to store data. A user's name, their age, a product price, a login status — all of this needs to live somewhere while your program runs. That's what variables are for.

A **variable** is simply a named container that holds a value. You give it a name, tell Java what type of data it will hold, and then you can use it throughout your code.

---

## Declaring Variables

Here's the basic syntax:

\`\`\`java
dataType variableName = value;
\`\`\`

Some examples:

\`\`\`java
int age = 25;
String name = " Dattu";
double price = 99.99;
boolean isLoggedIn = true;
\`\`\`

**Variable Declaration Components:**
- **int** — the data type (integer number)
- **age** — the variable name (you choose this)
- **25** — the initial value

You can also declare without initializing:

\`\`\`java
int age;        // Declared but not initialized
age = 25;       // Assigned later
\`\`\`

---

## Naming Rules

Java has rules about what you can name your variables:

**Must follow:**
- Start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, digits, underscores, dollar signs
- Cannot be a Java keyword (like \`int\`, \`class\`, \`public\`)
- Case-sensitive (\`age\` and \`Age\` are different)

**Good names:**
\`\`\`java
int userAge;
String firstName;
double accountBalance;
boolean isActive;
\`\`\`

**Bad names:**
\`\`\`java
int 2fast;        // Can't start with number
String my-name;   // No hyphens allowed
double class;     // 'class' is a keyword
\`\`\`

**Convention:** Use camelCase for variable names. Start with lowercase, capitalize each new word: \`firstName\`, \`totalAmount\`, \`isUserLoggedIn\`.

---

## Types of Variables

Java has three types of variables based on where they're declared:

### 1. Local Variables

Declared inside a method. Only accessible within that method.

\`\`\`java
public void calculateTotal() {
    int quantity = 5;        // Local variable
    double price = 10.99;    // Local variable
    double total = quantity * price;
}
// quantity, price, total don't exist outside this method
\`\`\`

**Key points:**
- Must be initialized before use
- No default value
- Destroyed when method ends

### 2. Instance Variables

Declared inside a class but outside methods. Each object gets its own copy.

\`\`\`java
public class User {
    String name;        // Instance variable
    int age;            // Instance variable
    
    public void printInfo() {
        System.out.println(name + " is " + age);
    }
}
\`\`\`

**Key points:**
- Belong to an object
- Have default values (0 for numbers, null for objects, false for boolean)
- Accessible throughout the class

### 3. Static Variables (Class Variables)

Declared with the \`static\` keyword. Shared by all objects of the class.

\`\`\`java
public class User {
    static int totalUsers = 0;  // Shared by all User objects
    String name;
    
    public User(String name) {
        this.name = name;
        totalUsers++;  // Increment for each new user
    }
}
\`\`\`

**Key points:**
- One copy shared by all objects
- Can be accessed without creating an object
- Use for constants or counters

---

## Default Values

Instance and static variables get default values if you don't initialize them:

| Type | Default Value |
|------|---------------|
| int, short, byte, long | 0 |
| float, double | 0.0 |
| char | '\\u0000' (null character) |
| boolean | false |
| Object references | null |

**Important:** Local variables do NOT get default values. You must initialize them.

\`\`\`java
public void test() {
    int x;
    System.out.println(x);  // ERROR! x not initialized
}
\`\`\`

---

## Constants (final)

Sometimes you want a variable that never changes. Use the \`final\` keyword:

\`\`\`java
final double PI = 3.14159;
final int MAX_USERS = 100;
final String COMPANY_NAME = "TechCorp";
\`\`\`

**Convention:** Use ALL_CAPS with underscores for constants.

Once assigned, you can't change a final variable:

\`\`\`java
final int MAX = 100;
MAX = 200;  // ERROR! Cannot reassign final variable
\`\`\`

---

## Real-World Example

Let's see variables in a practical context — a simple user profile:

\`\`\`java
public class UserProfile {
    // Instance variables
    private String username;
    private String email;
    private int age;
    private boolean isPremium;
    
    // Static variable - shared across all profiles
    private static int totalProfiles = 0;
    
    // Constant
    private static final int MIN_AGE = 13;
    
    public UserProfile(String username, String email, int age) {
        this.username = username;
        this.email = email;
        
        // Local variable for validation
        boolean isValidAge = age >= MIN_AGE;
        
        if (isValidAge) {
            this.age = age;
        } else {
            this.age = MIN_AGE;
        }
        
        this.isPremium = false;
        totalProfiles++;
    }
}
\`\`\`

---

## Common Mistakes

**1. Using before declaring**
\`\`\`java
System.out.println(x);  // ERROR!
int x = 10;
\`\`\`

**2. Type mismatch**
\`\`\`java
int age = "twenty";  // ERROR! Can't put String in int
\`\`\`

**3. Forgetting to initialize local variables**
\`\`\`java
int sum;
sum = sum + 10;  // ERROR! sum not initialized
\`\`\`

**4. Shadowing (same name in different scopes)**
\`\`\`java
int x = 10;
if (true) {
    int x = 20;  // This shadows the outer x - confusing!
}
\`\`\`

---

## Quick Tips

- Use meaningful names: \`userAge\` not \`x\`
- Initialize variables when you declare them when possible
- Use \`final\` for values that shouldn't change
- Keep variable scope as small as possible
- Follow naming conventions consistently
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
