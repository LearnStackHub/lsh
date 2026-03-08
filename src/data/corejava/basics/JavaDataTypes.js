const javaDataTypes = {
  id: 'java-data-types',
  title: 'Data Types in Java',
  description: 'Understanding how Java stores different kinds of data',
  content: `
# Data Types — The Building Blocks of Java

When you create a variable, Java needs to know what kind of data you're storing. Will it be a number? Text? A yes/no value? This is where data types come in.

Java is a **strongly typed language** — every variable must have a declared type, and you can't put the wrong type of data in it.

---

## Two Categories of Data Types

Java has two main categories:

### 1. Primitive Types (8 total)
Built into the language. Store simple values directly.

### 2. Reference Types
Store references (addresses) to objects. Includes classes, arrays, interfaces.

---

## The 8 Primitive Types

### Integer Types (Whole Numbers)

| Type | Size | Range | Use Case |
|------|------|-------|----------|
| byte | 1 byte | -128 to 127 | Saving memory in large arrays |
| short | 2 bytes | -32,768 to 32,767 | Rarely used |
| int | 4 bytes | -2.1 billion to 2.1 billion | **Most common choice** |
| long | 8 bytes | Very large numbers | When int isn't big enough |

\`\`\`java
byte age = 25;
short year = 2024;
int population = 1500000;
long worldPopulation = 8000000000L;  // Note the 'L' suffix
\`\`\`

**Pro tip:** Just use \`int\` for most whole numbers. Only use \`long\` when you need really big numbers (like file sizes or timestamps).

### Floating-Point Types (Decimals)

| Type | Size | Precision | Use Case |
|------|------|-----------|----------|
| float | 4 bytes | ~7 digits | When memory matters |
| double | 8 bytes | ~15 digits | **Default choice for decimals** |

\`\`\`java
float price = 19.99f;        // Note the 'f' suffix
double preciseValue = 3.14159265358979;
\`\`\`

**Pro tip:** Always use \`double\` unless you have a specific reason not to. It's more precise and is Java's default for decimal literals.

### Character Type

| Type | Size | Range | Use Case |
|------|------|-------|----------|
| char | 2 bytes | 0 to 65,535 | Single characters |

\`\`\`java
char letter = 'A';
char digit = '7';
char symbol = '@';
char unicode = '\\u0041';  // Also 'A'
\`\`\`

### Boolean Type

| Type | Size | Values | Use Case |
|------|------|--------|----------|
| boolean | 1 bit* | true or false | Conditions, flags |

\`\`\`java
boolean isLoggedIn = true;
boolean hasPermission = false;
boolean isValid = (age >= 18);
\`\`\`

---

## Memory Visualization

\`\`\`
byte:    [        8 bits        ]
short:   [       16 bits        ]
int:     [       32 bits        ]
long:    [       64 bits        ]

float:   [       32 bits        ]
double:  [       64 bits        ]

char:    [       16 bits        ]
boolean: [  1 bit (logically)   ]
\`\`\`

---

## Type Conversion

### Automatic (Widening) Conversion

Java automatically converts smaller types to larger types:

\`\`\`
byte → short → int → long → float → double
\`\`\`

\`\`\`java
int myInt = 100;
double myDouble = myInt;  // Automatic: 100 → 100.0
\`\`\`

### Manual (Narrowing) Conversion

Going from larger to smaller requires explicit casting:

\`\`\`java
double myDouble = 9.78;
int myInt = (int) myDouble;  // Manual cast: 9.78 → 9 (truncated!)
\`\`\`

**Warning:** You lose data when narrowing! 9.78 becomes 9, not 10.

---

## Reference Types

Everything that's not a primitive is a reference type:

\`\`\`java
String name = "John";           // String class
int[] numbers = {1, 2, 3};      // Array
ArrayList<String> list = new ArrayList<>();  // Class
\`\`\`

**Key difference:** Primitives store values directly. References store memory addresses pointing to objects.

\`\`\`
Primitive:  int x = 10;
            x → [10]

Reference:  String s = "Hello";
            s → [address] → "Hello" (in heap memory)
\`\`\`

---

## Wrapper Classes

Each primitive has a corresponding wrapper class:

| Primitive | Wrapper |
|-----------|---------|
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

**Why use wrappers?**
- Collections only work with objects, not primitives
- Useful methods (parsing, converting)
- Can be null (primitives can't)

\`\`\`java
// Autoboxing: primitive → wrapper
Integer num = 10;

// Unboxing: wrapper → primitive
int value = num;

// Useful methods
int parsed = Integer.parseInt("123");
String str = Integer.toString(456);
\`\`\`

---

## Choosing the Right Type

| Scenario | Recommended Type |
|----------|------------------|
| Counting things | int |
| Money/prices | double (or BigDecimal for precision) |
| True/false flags | boolean |
| Single character | char |
| Text | String |
| Very large numbers | long |
| Percentages | double |
| Age, quantity | int |

---

## Common Mistakes

**1. Integer overflow**
\`\`\`java
int big = 2147483647;
big = big + 1;  // Wraps to -2147483648!
\`\`\`

**2. Float precision issues**
\`\`\`java
double result = 0.1 + 0.2;
System.out.println(result);  // 0.30000000000000004 (not 0.3!)
\`\`\`

**3. Forgetting suffixes**
\`\`\`java
long big = 3000000000;   // ERROR! Needs L suffix
float f = 3.14;          // ERROR! Needs f suffix
\`\`\`

**4. Comparing floats with ==**
\`\`\`java
double a = 0.1 + 0.2;
double b = 0.3;
System.out.println(a == b);  // false! Use Math.abs(a-b) < 0.0001
\`\`\`

---

## Real-World Application

The following example demonstrates how different data types work together in a practical application scenario:

\`\`\`java
public class Product {
    int id;                    // Product ID
    String name;               // Product name
    double price;              // Price with decimals
    int quantity;              // Stock count
    boolean isAvailable;       // In stock?
    char category;             // 'E' for electronics, 'C' for clothing
    long barcode;              // Large number for barcode
}
\`\`\`
`,
  code: `// Data Types Demo - Understanding all Java data types

public class DataTypesDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Data Types Demo ===\\n");
        
        // INTEGER TYPES
        System.out.println("1. INTEGER TYPES (Whole Numbers)");
        System.out.println("   ---------------------------------");
        
        byte myByte = 127;
        System.out.println("   byte: " + myByte + " (Range: -128 to 127)");
        
        short myShort = 32000;
        System.out.println("   short: " + myShort + " (Range: -32,768 to 32,767)");
        
        int myInt = 2000000000;
        System.out.println("   int: " + myInt + " (Most commonly used)");
        
        long myLong = 9000000000L;
        System.out.println("   long: " + myLong + " (Note the 'L' suffix)");
        System.out.println();
        
        // FLOATING-POINT TYPES
        System.out.println("2. FLOATING-POINT TYPES (Decimals)");
        System.out.println("   ---------------------------------");
        
        float myFloat = 3.14159f;
        System.out.println("   float: " + myFloat + " (Note the 'f' suffix)");
        
        double myDouble = 3.141592653589793;
        System.out.println("   double: " + myDouble + " (More precise, default choice)");
        System.out.println();
        
        // CHARACTER TYPE
        System.out.println("3. CHARACTER TYPE");
        System.out.println("   ---------------------------------");
        
        char letter = 'A';
        char number = '7';
        char symbol = '@';
        
        System.out.println("   char letter: " + letter);
        System.out.println("   char number: " + number);
        System.out.println("   char symbol: " + symbol);
        System.out.println();
        
        // BOOLEAN TYPE
        System.out.println("4. BOOLEAN TYPE");
        System.out.println("   ---------------------------------");
        
        boolean isJavaFun = true;
        boolean isFriday = false;
        
        System.out.println("   Is Java fun? " + isJavaFun);
        System.out.println("   Is it Friday? " + isFriday);
        System.out.println();
        
        // TYPE CONVERSION
        System.out.println("5. TYPE CONVERSION");
        System.out.println("   ---------------------------------");
        
        // Widening (automatic)
        int intValue = 100;
        double doubleValue = intValue;
        System.out.println("   Widening: int " + intValue + " → double " + doubleValue);
        
        // Narrowing (manual casting)
        double price = 99.99;
        int roundedPrice = (int) price;
        System.out.println("   Narrowing: double " + price + " → int " + roundedPrice);
        System.out.println();
        
        // PRACTICAL EXAMPLE
        System.out.println("6. PRACTICAL EXAMPLE - E-Commerce Product");
        System.out.println("   ---------------------------------");
        
        int productId = 1001;
        String productName = "Wireless Headphones";
        double productPrice = 79.99;
        int stockQuantity = 150;
        boolean inStock = stockQuantity > 0;
        char category = 'E';  // Electronics
        long barcode = 8901234567890L;
        
        System.out.println("   Product ID: " + productId);
        System.out.println("   Name: " + productName);
        System.out.println("   Price: $" + productPrice);
        System.out.println("   Stock: " + stockQuantity + " units");
        System.out.println("   In Stock: " + inStock);
        System.out.println("   Category: " + category);
        System.out.println("   Barcode: " + barcode);
        System.out.println();
        
        // SIZE COMPARISON
        System.out.println("7. MEMORY SIZE COMPARISON");
        System.out.println("   ---------------------------------");
        System.out.println("   byte:    1 byte  (8 bits)");
        System.out.println("   short:   2 bytes (16 bits)");
        System.out.println("   int:     4 bytes (32 bits)");
        System.out.println("   long:    8 bytes (64 bits)");
        System.out.println("   float:   4 bytes (32 bits)");
        System.out.println("   double:  8 bytes (64 bits)");
        System.out.println("   char:    2 bytes (16 bits)");
        System.out.println("   boolean: 1 bit   (true/false)");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a bank account using appropriate data types',
      hint: 'Think about what type each piece of information should be',
      starterCode: `public class BankAccount {
    public static void main(String[] args) {
        // Bank Account Information
        long accountNumber = 1234567890123456L;
        String accountHolder = "John Smith";
        double balance = 15750.50;
        boolean isActive = true;
        char accountType = 'S';  // S = Savings, C = Checking
        
        // Transaction
        double deposit = 500.00;
        double withdrawal = 200.00;
        
        // Calculate new balance
        balance = balance + deposit - withdrawal;
        
        // Display account info
        System.out.println("=== Bank Account Details ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Account Type: " + accountType);
        System.out.println("Active: " + isActive);
        System.out.println("Balance: $" + balance);
    }
}`
    }
  ]
};

export default javaDataTypes;
