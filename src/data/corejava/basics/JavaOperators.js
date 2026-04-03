const javaOperators = {
  id: 'java-operators',
  title: 'Operators in Java',
  description: 'Performing operations on data — math, comparisons, and logic',
  content: `
# Operators — Making Things Happen in Java

Variables store data. But what good is data if you can't do anything with it? That's where operators come in. They let you perform calculations, make comparisons, and combine conditions.

Think of operators as the verbs of programming — they make things happen.

---

## Types of Operators

Java has several categories of operators:

1. **Arithmetic** — Math operations
2. **Assignment** — Storing values
3. **Comparison** — Comparing values
4. **Logical** — Combining conditions
5. **Bitwise** — Working with bits
6. **Unary** — Single operand operations
7. **Ternary** — Shorthand if-else

---

## 1. Arithmetic Operators

The basic math operations you learned in school:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 5 - 3 | 2 |
| * | Multiplication | 5 * 3 | 15 |
| / | Division | 5 / 3 | 1 (integer division!) |
| % | Modulus (remainder) | 5 % 3 | 2 |

**Watch out for integer division!**
\`\`\`java
int result = 5 / 2;    // Result is 2, not 2.5
double result = 5.0 / 2;  // Result is 2.5
\`\`\`

**Modulus is super useful:**
\`\`\`java
// Check if number is even
if (number % 2 == 0) {
    System.out.println("Even!");
}

// Get last digit
int lastDigit = number % 10;

// Wrap around (like clock hours)
int hour = 25 % 24;  // Result: 1
\`\`\`

---

## 2. Assignment Operators

Store values in variables:

| Operator | Example | Same As |
|----------|---------|---------|
| = | x = 5 | x = 5 |
| += | x += 3 | x = x + 3 |
| -= | x -= 3 | x = x - 3 |
| *= | x *= 3 | x = x * 3 |
| /= | x /= 3 | x = x / 3 |
| %= | x %= 3 | x = x % 3 |

**Compound assignment is cleaner:**
\`\`\`java
// Instead of this:
total = total + price;

// Write this:
total += price;
\`\`\`

---

## 3. Comparison Operators

Compare two values, return true or false:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| == | Equal to | 5 == 5 | true |
| != | Not equal | 5 != 3 | true |
| > | Greater than | 5 > 3 | true |
| < | Less than | 5 < 3 | false |
| >= | Greater or equal | 5 >= 5 | true |
| <= | Less or equal | 5 <= 3 | false |

**Used in conditions:**
\`\`\`java
if (age >= 18) {
    System.out.println("Adult");
}

if (password.equals(confirmPassword)) {
    System.out.println("Passwords match");
}
\`\`\`

**Important:** Use \`.equals()\` for comparing Strings, not \`==\`!

---

## 4. Logical Operators

Combine multiple conditions:

| Operator | Name | Description |
|----------|------|-------------|
| && | AND | Both must be true |
| \\|\\| | OR | At least one must be true |
| ! | NOT | Reverses the result |

**Truth table:**
\`\`\`
AND (&&):           OR (||):            NOT (!):
T && T = T          T || T = T          !T = F
T && F = F          T || F = T          !F = T
F && T = F          F || T = T
F && F = F          F || F = F
\`\`\`

**Real examples:**
\`\`\`java
// AND - both conditions must be true
if (age >= 18 && hasLicense) {
    System.out.println("Can drive");
}

// OR - at least one must be true
if (isAdmin || isOwner) {
    System.out.println("Has access");
}

// NOT - reverses the condition
if (!isLoggedIn) {
    System.out.println("Please log in");
}
\`\`\`

**Short-circuit evaluation:**
- \`&&\` stops if first condition is false (no need to check second)
- \`||\` stops if first condition is true (already satisfied)

---

## 5. Unary Operators

Work with a single operand:

| Operator | Name | Example | Description |
|----------|------|---------|-------------|
| + | Unary plus | +5 | Positive value |
| - | Unary minus | -5 | Negates value |
| ++ | Increment | x++ | Adds 1 |
| -- | Decrement | x-- | Subtracts 1 |
| ! | Logical NOT | !true | Reverses boolean |

**Pre vs Post increment:**
\`\`\`java
int x = 5;
System.out.println(x++);  // Prints 5, then x becomes 6
System.out.println(++x);  // x becomes 7, then prints 7
\`\`\`

**Rule of thumb:** Use \`x++\` or \`x--\` on their own line to avoid confusion.

---

## 6. Ternary Operator

A shorthand for simple if-else:

\`\`\`java
// Syntax: condition ? valueIfTrue : valueIfFalse

// Instead of:
String status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}

// Write:
String status = (age >= 18) ? "Adult" : "Minor";
\`\`\`

**Great for:**
\`\`\`java
int max = (a > b) ? a : b;
String greeting = (hour < 12) ? "Good morning" : "Good afternoon";
double discount = (isPremium) ? 0.20 : 0.10;
\`\`\`

---

## Operator Precedence

When multiple operators appear, Java follows this order (highest to lowest):

1. \`()\` — Parentheses
2. \`++\`, \`--\`, \`!\` — Unary
3. \`*\`, \`/\`, \`%\` — Multiplication, division
4. \`+\`, \`-\` — Addition, subtraction
5. \`<\`, \`>\`, \`<=\`, \`>=\` — Comparison
6. \`==\`, \`!=\` — Equality
7. \`&&\` — Logical AND
8. \`||\` — Logical OR
9. \`=\`, \`+=\`, etc. — Assignment

**When in doubt, use parentheses!**
\`\`\`java
// Confusing:
int result = 2 + 3 * 4;  // Is it 20 or 14?

// Clear:
int result = 2 + (3 * 4);  // Obviously 14
\`\`\`

---

## Real-World Examples

**E-Commerce Price Calculator:**
\`\`\`java
double price = 100.0;
int quantity = 3;
double taxRate = 0.08;
boolean hasCoupon = true;
double couponDiscount = 0.10;

double subtotal = price * quantity;
double discount = hasCoupon ? subtotal * couponDiscount : 0;
double afterDiscount = subtotal - discount;
double tax = afterDiscount * taxRate;
double total = afterDiscount + tax;
\`\`\`

**User Validation:**
\`\`\`java
boolean isValid = username != null 
    && username.length() >= 3 
    && password.length() >= 8
    && age >= 18;
\`\`\`

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
  code: `// Operators Demo - All Java operators in action

public class OperatorsDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Operators Demo ===\\n");
        
        // ARITHMETIC OPERATORS
        System.out.println("1. ARITHMETIC OPERATORS");
        System.out.println("   ---------------------");
        
        int a = 10, b = 3;
        System.out.println("   a = " + a + ", b = " + b);
        System.out.println("   a + b = " + (a + b));
        System.out.println("   a - b = " + (a - b));
        System.out.println("   a * b = " + (a * b));
        System.out.println("   a / b = " + (a / b) + " (integer division)");
        System.out.println("   a % b = " + (a % b) + " (remainder)");
        System.out.println();
        
        // ASSIGNMENT OPERATORS
        System.out.println("2. ASSIGNMENT OPERATORS");
        System.out.println("   ---------------------");
        
        int x = 10;
        System.out.println("   x = " + x);
        x += 5;
        System.out.println("   x += 5 → " + x);
        x -= 3;
        System.out.println("   x -= 3 → " + x);
        x *= 2;
        System.out.println("   x *= 2 → " + x);
        x /= 4;
        System.out.println("   x /= 4 → " + x);
        System.out.println();
        
        // COMPARISON OPERATORS
        System.out.println("3. COMPARISON OPERATORS");
        System.out.println("   ---------------------");
        
        int num1 = 10, num2 = 20;
        System.out.println("   num1 = " + num1 + ", num2 = " + num2);
        System.out.println("   num1 == num2: " + (num1 == num2));
        System.out.println("   num1 != num2: " + (num1 != num2));
        System.out.println("   num1 > num2:  " + (num1 > num2));
        System.out.println("   num1 < num2:  " + (num1 < num2));
        System.out.println("   num1 >= num2: " + (num1 >= num2));
        System.out.println("   num1 <= num2: " + (num1 <= num2));
        System.out.println();
        
        // LOGICAL OPERATORS
        System.out.println("4. LOGICAL OPERATORS");
        System.out.println("   ---------------------");
        
        boolean hasLicense = true;
        int age = 20;
        
        System.out.println("   hasLicense = " + hasLicense);
        System.out.println("   age = " + age);
        System.out.println("   age >= 18 && hasLicense: " + (age >= 18 && hasLicense));
        System.out.println("   age < 18 || hasLicense:  " + (age < 18 || hasLicense));
        System.out.println("   !hasLicense: " + (!hasLicense));
        System.out.println();
        
        // UNARY OPERATORS
        System.out.println("5. UNARY OPERATORS");
        System.out.println("   ---------------------");
        
        int count = 5;
        System.out.println("   count = " + count);
        System.out.println("   ++count = " + (++count) + " (pre-increment)");
        System.out.println("   count++ = " + (count++) + " (post-increment)");
        System.out.println("   count now = " + count);
        System.out.println("   --count = " + (--count) + " (pre-decrement)");
        System.out.println();
        
        // TERNARY OPERATOR
        System.out.println("6. TERNARY OPERATOR");
        System.out.println("   ---------------------");
        
        int userAge = 20;
        String status = (userAge >= 18) ? "Adult" : "Minor";
        System.out.println("   age = " + userAge);
        System.out.println("   status = " + status);
        
        int score = 75;
        String grade = (score >= 90) ? "A" : 
                       (score >= 80) ? "B" : 
                       (score >= 70) ? "C" : "F";
        System.out.println("   score = " + score + ", grade = " + grade);
        System.out.println();
        
        // PRACTICAL EXAMPLE
        System.out.println("7. PRACTICAL EXAMPLE - Shopping Cart");
        System.out.println("   ---------------------");
        
        double itemPrice = 49.99;
        int quantity = 3;
        double taxRate = 0.08;
        boolean isPremiumMember = true;
        double memberDiscount = 0.15;
        
        double subtotal = itemPrice * quantity;
        double discount = isPremiumMember ? subtotal * memberDiscount : 0;
        double afterDiscount = subtotal - discount;
        double tax = afterDiscount * taxRate;
        double total = afterDiscount + tax;
        
        System.out.println("   Item Price: $" + itemPrice);
        System.out.println("   Quantity: " + quantity);
        System.out.println("   Subtotal: $" + subtotal);
        System.out.println("   Premium Member: " + isPremiumMember);
        System.out.println("   Discount (15%): $" + discount);
        System.out.println("   After Discount: $" + afterDiscount);
        System.out.println("   Tax (8%): $" + tax);
        System.out.println("   Total: $" + String.format("%.2f", total));
    }
}

---

## Test Your Knowledge

Mastered Java operators? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering operators, expressions, and all Core Java topics!
`,
  practiceQuestions: [
    {
      question: 'Build a grade calculator using operators',
      hint: 'Use arithmetic operators for average, comparison for grade',
      starterCode: `public class GradeCalculator {
    public static void main(String[] args) {
        // Student scores
        int math = 85;
        int science = 92;
        int english = 78;
        int history = 88;
        
        // Calculate average
        double average = (math + science + english + history) / 4.0;
        
        // Determine grade using ternary
        String grade = (average >= 90) ? "A" :
                       (average >= 80) ? "B" :
                       (average >= 70) ? "C" :
                       (average >= 60) ? "D" : "F";
        
        // Check if passed (average >= 60)
        boolean passed = average >= 60;
        
        // Display results
        System.out.println("=== Grade Report ===");
        System.out.println("Math: " + math);
        System.out.println("Science: " + science);
        System.out.println("English: " + english);
        System.out.println("History: " + history);
        System.out.println("Average: " + average);
        System.out.println("Grade: " + grade);
        System.out.println("Passed: " + passed);
    }
}`
    }
  ]
};

export default javaOperators;
