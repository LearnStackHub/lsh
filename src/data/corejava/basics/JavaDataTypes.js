const javaDataTypes = {
  id: 'java-data-types',
  title: 'Data Types in Java',
  description: 'Understanding how Java stores different kinds of data',
  content: `
# Data Types — The Building Blocks of Java

When you create a variable, Java needs to know what kind of data you're storing. Will it be a number? Text? A yes/no value? This is where data types come in.

Java is a **strongly typed language** — every variable must have a declared type, and you can't put the wrong type of data in it.

> **Why does this matter?** Choosing the wrong type can cause silent bugs, wasted memory, or compile-time errors. Understanding types is the foundation of all Java programming.

---

## Two Categories of Data Types

Java has two main categories:

### 1. Primitive Types (8 total)
Built directly into the language. Store simple values directly in memory (on the **stack**). Fast and memory-efficient.

### 2. Reference Types
Store a **memory address** (reference) pointing to an object on the **heap**. Includes classes, arrays, interfaces, and String.

---

## The 8 Primitive Types

### Integer Types (Whole Numbers)

| Type | Size | Range | Default Value | Use Case |
|------|------|-------|---------------|----------|
| byte | 1 byte | -128 to 127 | 0 | Saving memory in large arrays |
| short | 2 bytes | -32,768 to 32,767 | 0 | Legacy code, rarely used |
| int | 4 bytes | -2,147,483,648 to 2,147,483,647 | 0 | **Most common choice** |
| long | 8 bytes | -9.2 quintillion to 9.2 quintillion | 0L | Timestamps, file sizes, barcodes |

\`\`\`java
byte age = 25;
short year = 2024;
int population = 1500000;
long worldPopulation = 8000000000L;  // Note the 'L' suffix
long timestamp = System.currentTimeMillis(); // ms since Jan 1, 1970
\`\`\`

**Pro tip:** Just use \`int\` for most whole numbers. Only use \`long\` when you need really big numbers (like file sizes or timestamps).

---

### Floating-Point Types (Decimals)

| Type | Size | Precision | Default Value | Use Case |
|------|------|-----------|---------------|----------|
| float | 4 bytes | ~7 decimal digits | 0.0f | Graphics, games (memory-sensitive) |
| double | 8 bytes | ~15 decimal digits | 0.0d | **Default choice for decimals** |

\`\`\`java
float price = 19.99f;              // Note the 'f' suffix
double preciseValue = 3.14159265358979;
double salary = 75000.50;
\`\`\`

**Pro tip:** Always use \`double\` unless you have a specific reason not to. It's more precise and is Java's default for decimal literals.

> **Never use float or double for money in real apps!** Use \`BigDecimal\` instead to avoid precision errors like 0.1 + 0.2 = 0.30000000000000004.

---

### Character Type

| Type | Size | Range | Default Value | Use Case |
|------|------|-------|---------------|----------|
| char | 2 bytes | 0 to 65,535 (Unicode) | '\\u0000' | Single characters |

\`\`\`java
char letter = 'A';
char digit = '7';
char symbol = '@';
char unicode = '\\u0041';  // Also 'A' — Java uses Unicode (UTF-16)
char newline = '\\n';      // Escape characters work too
\`\`\`

> **char uses single quotes** \`'A'\`, while String uses double quotes \`"Hello"\`. These are completely different types!

---

### Boolean Type

| Type | Size | Values | Default Value | Use Case |
|------|------|--------|---------------|----------|
| boolean | 1 bit* | true or false | false | Conditions, flags, on/off states |

\`\`\`java
boolean isLoggedIn = true;
boolean hasPermission = false;
boolean isValid = (age >= 18);       // Can store a result of a condition
boolean isEven = (number % 2 == 0); // Computed boolean
\`\`\`

> **Naming convention:** Start boolean variable names with \`is\`, \`has\`, \`can\`, or \`should\` — e.g., \`isActive\`, \`hasAccount\`, \`canEdit\`. This makes your code read like a sentence.

---

## Memory Visualization

\`\`\`
TYPE        MEMORY SIZE         BITS
----------- ------------------- ----
boolean:    [#] (1 bit)           1
byte:       [########]            8
short:      [################]   16
char:       [################]   16
int:        [################    32
             ################]
float:      [################    32
             ################]
long:       [################    64
             ################
             ################
             ################]
double:     [################    64
             ################
             ################
             ################]
\`\`\`

---

## Default Values

When you declare a variable as a **class field** (not inside a method), Java gives it a default value automatically:

\`\`\`java
public class DefaultValues {
    byte   b;      // 0
    short  s;      // 0
    int    i;      // 0
    long   l;      // 0L
    float  f;      // 0.0f
    double d;      // 0.0d
    char   c;      // '\\u0000' (null character)
    boolean flag;  // false
    String text;   // null
}
\`\`\`

> **Local variables (inside methods) do NOT get default values.** You MUST initialize them before use or Java will give a compile error.

---

## Type Conversion

### Automatic (Widening) Conversion

Java automatically converts smaller types to larger types — no data is lost:

\`\`\`
byte → short → int → long → float → double
                      ↑
                   char fits here too
\`\`\`

\`\`\`java
int myInt = 100;
double myDouble = myInt;   // Automatic: 100 → 100.0 long myLong = myInt;       // Automatic: 100 → 100L  float myFloat = myInt;     // Automatic: 100 → 100.0f\`\`\`

### Manual (Narrowing) Conversion

Going from larger to smaller requires explicit **casting** — you may lose data:

\`\`\`java
double myDouble = 9.78;
int myInt = (int) myDouble;  // Manual cast: 9.78 → 9 (decimal truncated!)

long bigNumber = 3000000000L;
int smallInt = (int) bigNumber; // May overflow! Result is unpredictable
\`\`\`

**Warning:** You lose data when narrowing! 9.78 becomes 9, not 10. Always cast intentionally.

---

## Reference Types

Everything that's not a primitive is a reference type:

\`\`\`java
String name = "Dattu";                        // String class
int[] numbers = {1, 2, 3};                   // Array
ArrayList<String> list = new ArrayList<>();   // Generic class
Scanner sc = new Scanner(System.in);          // Object
\`\`\`

**Key difference:** Primitives store values directly. References store memory addresses pointing to objects.

\`\`\`
Primitive:  int x = 10;
            [Stack] x → [10]

Reference:  String s = "Hello";
            [Stack] s → [0x4A2F] → [Heap: "Hello"]
\`\`\`

> This is why comparing Strings with \`==\` can give wrong results — you're comparing addresses, not values. Always use \`.equals()\` for Strings!

\`\`\`java
String a = new String("hello");
String b = new String("hello");
System.out.println(a == b);       // false — different addresses
System.out.println(a.equals(b));  // true  — same content
\`\`\`

---

## Wrapper Classes

Each primitive has a corresponding **Wrapper Class** — an object version of the primitive:

| Primitive | Wrapper Class | Useful Methods |
|-----------|---------------|----------------|
| byte | Byte | Byte.parseByte("10") |
| short | Short | Short.parseShort("10") |
| int | Integer | Integer.parseInt("10"), Integer.MAX_VALUE |
| long | Long | Long.parseLong("10"), Long.toBinaryString(n) |
| float | Float | Float.parseFloat("3.14") |
| double | Double | Double.parseDouble("3.14"), Double.isNaN(d) |
| char | Character | Character.isLetter('a'), Character.toUpperCase('a') |
| boolean | Boolean | Boolean.parseBoolean("true") |

**Why use wrappers?**
- Collections (ArrayList, HashMap) only work with objects, not primitives
- Useful utility methods (parsing Strings to numbers)
- Can be \`null\` (primitives can't)
- Required for generics: \`ArrayList<Integer>\` not \`ArrayList<int>\`

\`\`\`java
// Autoboxing: primitive → wrapper (automatic)
Integer num = 10;
Double price = 9.99;

// Unboxing: wrapper → primitive (automatic)
int value = num;
double d = price;

// Useful static methods
int parsed = Integer.parseInt("123");      // String → int
String str = Integer.toString(456);        // int → String
int maxInt = Integer.MAX_VALUE;            // 2147483647
int minInt = Integer.MIN_VALUE;            // -2147483648
String binary = Integer.toBinaryString(10); // "1010"
String hex = Integer.toHexString(255);      // "ff"

boolean isLetter = Character.isLetter('A');   // true
char upper = Character.toUpperCase('a');       // 'A'
boolean isDigit = Character.isDigit('5');      // true
\`\`\`

---

## Choosing the Right Type

| Scenario | Recommended Type | Why |
|----------|-----------------|-----|
| Age, score, count | int | Default whole number |
| Money/prices | double or BigDecimal | Decimals needed |
| True/false flags | boolean | Binary state |
| Single character | char | One char only |
| Text / names | String | Multiple characters |
| Timestamps (ms) | long | Too big for int |
| File sizes (bytes) | long | Can exceed int range |
| Scientific calc | double | High precision |
| Loop counters | int | Standard choice |
| Array indexes | int | Standard in Java |
| Account numbers | long | Large unique numbers |
| Percentages | double | Decimal precision |

---

## Common Mistakes

**1. Integer overflow — silent bug!**
\`\`\`java
int big = 2147483647;       // Integer.MAX_VALUE
big = big + 1;              // Wraps to -2147483648! No error thrown!
// Fix: use long
long safe = 2147483647L;
safe = safe + 1;            // 2147483648 — correct
\`\`\`

**2. Float precision issues**
\`\`\`java
double result = 0.1 + 0.2;
System.out.println(result);  // 0.30000000000000004 (not 0.3!)
// Fix: use BigDecimal for money
BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");
System.out.println(a.add(b)); // 0.3 — correct
\`\`\`

**3. Forgetting suffixes**
\`\`\`java
long big = 3000000000;   // ERROR! Java thinks it's int — too large!
long big = 3000000000L;  // CORRECT
float f = 3.14;          // ERROR! Java sees 3.14 as double
float f = 3.14f;         // CORRECT\`\`\`

**4. Comparing floats with ==**
\`\`\`java
double a = 0.1 + 0.2;
double b = 0.3;
System.out.println(a == b);  // false! Floating point imprecision
// Fix:
System.out.println(Math.abs(a - b) < 0.0001);  // true\`\`\`

**5. Using == to compare Strings**
\`\`\`java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);       // false — compares addresses!
System.out.println(s1.equals(s2));  // true — compares content
\`\`\`

**6. Local variable used without initialization**
\`\`\`java
int x;
System.out.println(x);  // COMPILE ERROR: variable x might not have been initialized
// Fix:
int x = 0;
System.out.println(x);  // 0
\`\`\`

---

## Real-World Application

The following example demonstrates how different data types work together in a practical application scenario:

\`\`\`java
public class Product {
    int id;                    // Product ID (fits in int)
    String name;               // Product name (text = String)
    double price;              // Price with decimals
    int quantity;              // Stock count (whole number)
    boolean isAvailable;       // In stock? (true/false)
    char category;             // 'E' for electronics, 'C' for clothing
    long barcode;              // Large number for barcode (needs long)
}

// Usage:
Product p = new Product();
p.id = 1001;
p.name = "Wireless Headphones";
p.price = 79.99;
p.quantity = 150;
p.isAvailable = p.quantity > 0;   // computed boolean
p.category = 'E';
p.barcode = 8901234567890L;
\`\`\`

---

## Quick Reference Cheat Sheet

\`\`\`
WHOLE NUMBERS:
  byte    →  small (-128 to 127)
  short   →  medium (rarely used)
  int     →  DEFAULT whole number ← use this most
  long    →  huge numbers (add L: 100L)

DECIMALS:
  float   →  less precise (add f: 3.14f)
  double  →  DEFAULT decimal ← use this most

OTHER:
  char    →  one character (use single quotes: 'A')
  boolean →  true or false only

REMEMBER:
  long   → needs L suffix:  9000000000L
  float  → needs f suffix:  3.14f
  char   → single quotes:   'A'
  String → double quotes:   "Hello"  (not a primitive!)
\`\`\`

---

## Test Your Knowledge

Mastered Java data types? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering data types, variables, and all Core Java topics!

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
  code: `// Data Types Demo - Understanding all Java data types

public class DataTypesDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Data Types Demo ===\\n");
        
        // ─────────────────────────────────────────
        // 1. INTEGER TYPES
        // ─────────────────────────────────────────
        System.out.println("1. INTEGER TYPES (Whole Numbers)");
        System.out.println("   ---------------------------------");
        
        byte myByte = 127;
        System.out.println("   byte:  " + myByte + "          | Range: -128 to 127");
        
        short myShort = 32000;
        System.out.println("   short: " + myShort + "         | Range: -32,768 to 32,767");
        
        int myInt = 2000000000;
        System.out.println("   int:   " + myInt + "   | Most commonly used");
        
        long myLong = 9000000000L;  // Must add L
        System.out.println("   long:  " + myLong + "        | Note the 'L' suffix");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 2. FLOATING-POINT TYPES
        // ─────────────────────────────────────────
        System.out.println("2. FLOATING-POINT TYPES (Decimals)");
        System.out.println("   ---------------------------------");
        
        float myFloat = 3.14159f;   // Must add f
        System.out.println("   float:  " + myFloat + "   | Note the 'f' suffix (~7 digits precision)");
        
        double myDouble = 3.141592653589793;
        System.out.println("   double: " + myDouble + " | Default decimal (~15 digits precision)");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 3. CHARACTER TYPE
        // ─────────────────────────────────────────
        System.out.println("3. CHARACTER TYPE");
        System.out.println("   ---------------------------------");
        
        char letter  = 'A';
        char number  = '7';
        char symbol  = '@';
        char unicode = '\\u0041';  // Unicode for 'A'
        
        System.out.println("   char letter:  " + letter  + " (use single quotes)");
        System.out.println("   char number:  " + number);
        System.out.println("   char symbol:  " + symbol);
        System.out.println("   char unicode: " + unicode + " (\\\\u0041 = 'A')");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 4. BOOLEAN TYPE
        // ─────────────────────────────────────────
        System.out.println("4. BOOLEAN TYPE");
        System.out.println("   ---------------------------------");
        
        boolean isJavaFun  = true;
        boolean isFriday   = false;
        int score = 85;
        boolean isPassing  = score >= 60;   // computed boolean
        
        System.out.println("   Is Java fun?  " + isJavaFun);
        System.out.println("   Is it Friday? " + isFriday);
        System.out.println("   Is passing?   " + isPassing + " (score = " + score + ")");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 5. DEFAULT VALUES (class fields only)
        // ─────────────────────────────────────────
        System.out.println("5. DEFAULT VALUES");
        System.out.println("   ---------------------------------");
        System.out.println("   int default:     0");
        System.out.println("   double default:  0.0");
        System.out.println("   boolean default: false");
        System.out.println("   char default:    \\\\u0000 (null char)");
        System.out.println("   String default:  null");
        System.out.println("   (Local variables must be initialized manually!)");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 6. TYPE CONVERSION
        // ─────────────────────────────────────────
        System.out.println("6. TYPE CONVERSION");
        System.out.println("   ---------------------------------");
        
        // Widening (automatic — safe, no data loss)
        int intValue = 100;
        long longValue   = intValue;   // int → long (auto)
        double dblValue  = intValue;   // int → double (auto)
        System.out.println("   Widening: int " + intValue + " → long " + longValue + ", double " + dblValue);
        
        // Narrowing (manual cast — may lose data)
        double price = 99.99;
        int roundedPrice = (int) price;   // 9.99 is truncated, not rounded!
        System.out.println("   Narrowing: double " + price + " → int " + roundedPrice + " (decimal truncated!)");
        
        // Safe rounding using Math.round
        long rounded = Math.round(price);
        System.out.println("   Rounded:   Math.round(" + price + ") = " + rounded);
        System.out.println();
        
        // ─────────────────────────────────────────
        // 7. WRAPPER CLASS METHODS
        // ─────────────────────────────────────────
        System.out.println("7. WRAPPER CLASS METHODS");
        System.out.println("   ---------------------------------");
        
        int parsed = Integer.parseInt("123");
        System.out.println("   Integer.parseInt(\\"123\\") = " + parsed);
        
        String str = Integer.toString(456);
        System.out.println("   Integer.toString(456)  = \\"" + str + "\\"");
        
        System.out.println("   Integer.MAX_VALUE      = " + Integer.MAX_VALUE);
        System.out.println("   Integer.MIN_VALUE      = " + Integer.MIN_VALUE);
        System.out.println("   Integer.toBinaryString(10) = " + Integer.toBinaryString(10));
        System.out.println("   Integer.toHexString(255)   = " + Integer.toHexString(255));
        
        boolean isLetter = Character.isLetter('A');
        boolean isDigit  = Character.isDigit('5');
        char upper = Character.toUpperCase('a');
        System.out.println("   Character.isLetter('A')    = " + isLetter);
        System.out.println("   Character.isDigit('5')     = " + isDigit);
        System.out.println("   Character.toUpperCase('a') = " + upper);
        System.out.println();
        
        // ─────────────────────────────────────────
        // 8. PRACTICAL EXAMPLE — E-Commerce Product
        // ─────────────────────────────────────────
        System.out.println("8. PRACTICAL EXAMPLE - E-Commerce Product");
        System.out.println("   ---------------------------------");
        
        int     productId    = 1001;
        String  productName  = "Wireless Headphones";
        double  productPrice = 79.99;
        int     stockQty     = 150;
        boolean inStock      = stockQty > 0;   // computed
        char    category     = 'E';            // E = Electronics
        long    barcode      = 8901234567890L;
        
        System.out.println("   Product ID:   " + productId     + "    (int)");
        System.out.println("   Name:         " + productName   + " (String)");
        System.out.println("   Price:        $" + productPrice + "  (double)");
        System.out.println("   Stock:        " + stockQty      + " units       (int)");
        System.out.println("   In Stock:     " + inStock       + "          (boolean)");
        System.out.println("   Category:     " + category      + "             (char)");
        System.out.println("   Barcode:      " + barcode       + " (long)");
        System.out.println();
        
        // ─────────────────────────────────────────
        // 9. MEMORY SIZE COMPARISON
        // ─────────────────────────────────────────
        System.out.println("9. MEMORY SIZE COMPARISON");
        System.out.println("   ---------------------------------");
        System.out.println("   boolean: 1 bit    (true/false only)");
        System.out.println("   byte:    1 byte   (8 bits)");
        System.out.println("   short:   2 bytes  (16 bits)");
        System.out.println("   char:    2 bytes  (16 bits)");
        System.out.println("   int:     4 bytes  (32 bits)  ← default whole number");
        System.out.println("   float:   4 bytes  (32 bits)");
        System.out.println("   long:    8 bytes  (64 bits)");
        System.out.println("   double:  8 bytes  (64 bits)  ← default decimal");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a bank account using appropriate data types',
      hint: 'Think about what type each piece of information should be: account numbers are large (long), balance has decimals (double), account status is true/false (boolean)',
      starterCode: `public class BankAccount {
    public static void main(String[] args) {
        // Bank Account Information
        long   accountNumber = 1234567890123456L;  // long: too big for int
        String accountHolder = "Dattu Smith";       // String: text
        double balance       = 15750.50;            // double: has decimals
        boolean isActive     = true;                // boolean: true/false
        char   accountType   = 'S';                 // char: S=Savings, C=Checking
        
        // Transaction amounts
        double deposit    = 500.00;
        double withdrawal = 200.00;
        
        // Calculate new balance
        balance = balance + deposit - withdrawal;
        
        // Display account info
        System.out.println("=== Bank Account Details ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Account Type:   " + accountType);
        System.out.println("Active:         " + isActive);
        System.out.println("Balance:        $" + balance);
        
        // TODO: Add a check — print "Low Balance!" if balance < 1000
        // TODO: Try changing accountType to 'C' for Checking
    }
}`
    },
    {
      question: 'Fix the data type bugs in the Student report card',
      hint: 'Look carefully at the types: GPA needs decimals, grade is a single character, large IDs may need long. Also check for missing suffixes!',
      starterCode: `public class StudentReportCard {
    public static void main(String[] args) {
        // BUG: Some types are wrong or missing required suffixes!
        // Fix all the bugs below:
        
        int studentId   = 9876543210;     // BUG 1: too large for int
        String name     = "Dattu Kumar";
        int gpa         = 3.85;           // BUG 2: GPA has decimals
        String grade    = "A";            // BUG 3: grade is ONE character
        boolean isPassed = 1;             // BUG 4: pass/fail should be boolean
        float tuitionFee = 45000.00;      // BUG 5: missing suffix
        
        System.out.println("Student ID:   " + studentId);
        System.out.println("Name:         " + name);
        System.out.println("GPA:          " + gpa);
        System.out.println("Grade:        " + grade);
        System.out.println("Passed:       " + isPassed);
        System.out.println("Tuition Fee:  " + tuitionFee);
    }
}`
    },
    {
      question: 'Explore type conversion — widening and narrowing',
      hint: 'Widening (small to big) is automatic. Narrowing (big to small) needs (type) casting and may lose data.',
      starterCode: `public class TypeConversionDemo {
    public static void main(String[] args) {
        // WIDENING CONVERSIONS (automatic — no data lost)
        byte  b = 42;
        short s = b;    // byte → short (auto)
        int   i = s;    // short → int  (auto)
        long  l = i;    // int → long   (auto)
        float f = l;    // long → float (auto)
        double d = f;   // float → double (auto)
        
        System.out.println("Widening chain: " + b + " → " + s + " → " + i + " → " + l + " → " + f + " → " + d);
        
        // NARROWING CONVERSIONS (manual — may lose data!)
        double price = 99.75;
        int truncated = (int) price;  // 99.75 → 99 (decimal CUT OFF)
        
        System.out.println("\\nNarrowing:");
        System.out.println("  double " + price + " → int " + truncated + "  (decimal truncated!)");
        
        // Safe rounding
        long rounded = Math.round(price);
        System.out.println("  Math.round(" + price + ") = " + rounded + " (correct rounding)");
        
        // TODO: Try casting a large long to int and see what happens
        long bigNum = 3000000000L;
        int overflow = (int) bigNum;
        System.out.println("\\nOverflow: long " + bigNum + " → int " + overflow + " (unexpected result!)");
    }
}`
    },
    {
      question: 'Use Wrapper class methods to parse and inspect values',
      hint: 'Wrapper classes have static methods like Integer.parseInt(), Character.isLetter(), Double.parseDouble(). Use them to work with user input as strings.',
      starterCode: `public class WrapperClassDemo {
    public static void main(String[] args) {
        // Parsing strings into numbers (common when reading user input)
        String ageInput    = "22";
        String salaryInput = "55000.75";
        String flagInput   = "true";
        
        int     age    = Integer.parseInt(ageInput);
        double  salary = Double.parseDouble(salaryInput);
        boolean isEmp  = Boolean.parseBoolean(flagInput);
        
        System.out.println("Age:      " + age    + " (type: int)");
        System.out.println("Salary:   " + salary + " (type: double)");
        System.out.println("Employed: " + isEmp  + " (type: boolean)");
        
        // Useful Integer methods
        System.out.println("\\nInteger utilities:");
        System.out.println("  MAX_VALUE:       " + Integer.MAX_VALUE);
        System.out.println("  MIN_VALUE:       " + Integer.MIN_VALUE);
        System.out.println("  toBinaryString:  " + Integer.toBinaryString(age));
        System.out.println("  toHexString:     " + Integer.toHexString(age));
        
        // Character methods
        char ch = 'D';
        System.out.println("\\nCharacter '" + ch + "' utilities:");
        System.out.println("  isLetter:    " + Character.isLetter(ch));
        System.out.println("  isUpperCase: " + Character.isUpperCase(ch));
        System.out.println("  toLowerCase: " + Character.toLowerCase(ch));
        
        // TODO: Try Integer.parseInt("abc") — what happens? (NumberFormatException!)
    }
}`
    }
  ]
};

export default javaDataTypes;