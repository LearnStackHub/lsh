const javaMethods = {
  id: 'java-methods',
  title: 'Methods in Java',
  description: 'Organizing code into reusable blocks',
  content: `
# Methods — Breaking Code into Reusable Pieces

Imagine writing the same 20 lines of code every time you need to calculate a discount. That would be tedious and error-prone. Methods solve this problem — they let you write code once and use it many times.

A **method** is a block of code that performs a specific task. You give it a name, and whenever you need that task done, you just call the method.

---

## Why Use Methods?

1. **Reusability** — Write once, use many times
2. **Organization** — Break complex problems into smaller pieces
3. **Readability** — Give meaningful names to operations
4. **Maintainability** — Fix bugs in one place, not everywhere
5. **Testing** — Test individual pieces independently

---

## Method Anatomy

\`\`\`java
accessModifier returnType methodName(parameters) {
    // method body
    return value;  // if returnType isn't void
}
\`\`\`

**Example:**
\`\`\`java
public static int add(int a, int b) {
    return a + b;
}
\`\`\`

Let's break this down:
- \`public\` — Access modifier (who can call this method)
- \`static\` — Belongs to class, not object
- \`int\` — Return type (what type of value it gives back)
- \`add\` — Method name
- \`(int a, int b)\` — Parameters (inputs)
- \`return a + b;\` — What the method gives back

---

## Types of Methods

### 1. No Parameters, No Return

\`\`\`java
public static void sayHello() {
    System.out.println("Hello!");
}

// Calling it:
sayHello();  // Output: Hello!
\`\`\`

### 2. With Parameters, No Return

\`\`\`java
public static void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

// Calling it:
greet(" Dattu");  // Output: Hello,  Dattu!
\`\`\`

### 3. No Parameters, With Return

\`\`\`java
public static int getRandomNumber() {
    return (int)(Math.random() * 100);
}

// Calling it:
int num = getRandomNumber();
\`\`\`

### 4. With Parameters and Return

\`\`\`java
public static double calculateTax(double amount, double rate) {
    return amount * rate;
}

// Calling it:
double tax = calculateTax(100.0, 0.08);  // Returns 8.0
\`\`\`

---

## Parameters vs Arguments

People often confuse these:

- **Parameters** — Variables in the method definition
- **Arguments** — Actual values passed when calling

\`\`\`java
// 'a' and 'b' are PARAMETERS
public static int add(int a, int b) {
    return a + b;
}

// 5 and 3 are ARGUMENTS
int result = add(5, 3);
\`\`\`

---

## Return Statement

The \`return\` statement does two things:
1. Sends a value back to the caller
2. Exits the method immediately

\`\`\`java
public static int findMax(int a, int b) {
    if (a > b) {
        return a;  // Method exits here if true
    }
    return b;  // Only reached if a <= b
}
\`\`\`

**For void methods:** You can use \`return;\` (no value) to exit early.

\`\`\`java
public static void printPositive(int num) {
    if (num < 0) {
        return;  // Exit early, don't print
    }
    System.out.println(num);
}
\`\`\`

---

## Method Overloading

You can have multiple methods with the same name but different parameters:

\`\`\`java
public static int add(int a, int b) {
    return a + b;
}

public static int add(int a, int b, int c) {
    return a + b + c;
}

public static double add(double a, double b) {
    return a + b;
}

// Java picks the right one based on arguments:
add(5, 3);        // Calls first version
add(5, 3, 2);     // Calls second version
add(5.0, 3.0);    // Calls third version
\`\`\`

**Rules for overloading:**
- Different number of parameters, OR
- Different types of parameters
- Return type alone doesn't count!

---

## Variable Scope

Variables declared inside a method only exist inside that method:

\`\`\`java
public static void methodA() {
    int x = 10;  // x only exists in methodA
}

public static void methodB() {
    System.out.println(x);  // ERROR! x doesn't exist here
}
\`\`\`

---

## Pass by Value

Java always passes arguments **by value** — it copies the value:

\`\`\`java
public static void changeValue(int num) {
    num = 100;  // Only changes the copy
}

int x = 5;
changeValue(x);
System.out.println(x);  // Still 5!
\`\`\`

**But with objects, the reference is copied:**

\`\`\`java
public static void changeArray(int[] arr) {
    arr[0] = 100;  // Changes the actual array!
}

int[] numbers = {1, 2, 3};
changeArray(numbers);
System.out.println(numbers[0]);  // Now 100!
\`\`\`

---

## Best Practices

1. **One task per method** — A method should do one thing well
2. **Meaningful names** — \`calculateTax()\` not \`calc()\`
3. **Keep methods short** — If it's too long, break it up
4. **Limit parameters** — More than 3-4 is a code smell
5. **Document complex methods** — Use comments or Javadoc

---

## Real-World Example

Here's how methods work in a real application:

\`\`\`java
public class ShoppingCart {
    
    public static double calculateSubtotal(double price, int quantity) {
        return price * quantity;
    }
    
    public static double applyDiscount(double amount, double discountRate) {
        return amount * (1 - discountRate);
    }
    
    public static double calculateTax(double amount, double taxRate) {
        return amount * taxRate;
    }
    
    public static double calculateTotal(double price, int qty, 
                                        double discount, double tax) {
        double subtotal = calculateSubtotal(price, qty);
        double afterDiscount = applyDiscount(subtotal, discount);
        double taxAmount = calculateTax(afterDiscount, tax);
        return afterDiscount + taxAmount;
    }
}
\`\`\`

Each method has a clear, single responsibility. The \`calculateTotal\` method orchestrates them all.
`,
  code: `// Methods Demo - Understanding Java methods

public class MethodsDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Methods Demo ===\\n");
        
        // 1. SIMPLE METHOD CALLS
        System.out.println("1. SIMPLE METHOD CALLS");
        System.out.println("   --------------------");
        sayHello();
        greet("Alice");
        System.out.println();
        
        // 2. METHODS WITH RETURN VALUES
        System.out.println("2. METHODS WITH RETURN VALUES");
        System.out.println("   ---------------------------");
        int sum = add(10, 20);
        System.out.println("   add(10, 20) = " + sum);
        
        double area = calculateCircleArea(5.0);
        System.out.println("   Circle area (r=5) = " + String.format("%.2f", area));
        System.out.println();
        
        // 3. METHOD OVERLOADING
        System.out.println("3. METHOD OVERLOADING");
        System.out.println("   -------------------");
        System.out.println("   add(5, 3) = " + add(5, 3));
        System.out.println("   add(5, 3, 2) = " + add(5, 3, 2));
        System.out.println("   add(5.5, 3.3) = " + add(5.5, 3.3));
        System.out.println();
        
        // 4. PRACTICAL EXAMPLE - E-Commerce
        System.out.println("4. PRACTICAL EXAMPLE - Shopping Cart");
        System.out.println("   ----------------------------------");
        
        double itemPrice = 49.99;
        int quantity = 3;
        double discountRate = 0.10;  // 10% discount
        double taxRate = 0.08;       // 8% tax
        
        double subtotal = calculateSubtotal(itemPrice, quantity);
        double discount = calculateDiscount(subtotal, discountRate);
        double afterDiscount = subtotal - discount;
        double tax = calculateTax(afterDiscount, taxRate);
        double total = afterDiscount + tax;
        
        System.out.println("   Item Price: $" + itemPrice);
        System.out.println("   Quantity: " + quantity);
        System.out.println("   Subtotal: $" + String.format("%.2f", subtotal));
        System.out.println("   Discount (10%): -$" + String.format("%.2f", discount));
        System.out.println("   After Discount: $" + String.format("%.2f", afterDiscount));
        System.out.println("   Tax (8%): +$" + String.format("%.2f", tax));
        System.out.println("   Total: $" + String.format("%.2f", total));
        System.out.println();
        
        // 5. VALIDATION METHODS
        System.out.println("5. VALIDATION METHODS");
        System.out.println("   -------------------");
        System.out.println("   isValidEmail('test@email.com'): " + isValidEmail("test@email.com"));
        System.out.println("   isValidEmail('invalid'): " + isValidEmail("invalid"));
        System.out.println("   isAdult(20): " + isAdult(20));
        System.out.println("   isAdult(15): " + isAdult(15));
    }
    
    // Simple void method - no parameters, no return
    public static void sayHello() {
        System.out.println("   Hello, World!");
    }
    
    // Void method with parameter
    public static void greet(String name) {
        System.out.println("   Hello, " + name + "!");
    }
    
    // Method with return value
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Overloaded method - three parameters
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Overloaded method - double parameters
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Calculate circle area
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }
    
    // E-Commerce methods
    public static double calculateSubtotal(double price, int quantity) {
        return price * quantity;
    }
    
    public static double calculateDiscount(double amount, double rate) {
        return amount * rate;
    }
    
    public static double calculateTax(double amount, double rate) {
        return amount * rate;
    }
    
    // Validation methods
    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
    
    public static boolean isAdult(int age) {
        return age >= 18;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a temperature converter with methods',
      hint: 'Create methods for Celsius to Fahrenheit and vice versa',
      starterCode: `public class TemperatureConverter {
    public static void main(String[] args) {
        // Test conversions
        double celsius = 25.0;
        double fahrenheit = 77.0;
        
        System.out.println("=== Temperature Converter ===");
        System.out.println(celsius + "°C = " + celsiusToFahrenheit(celsius) + "°F");
        System.out.println(fahrenheit + "°F = " + fahrenheitToCelsius(fahrenheit) + "°C");
        
        // Test with more values
        System.out.println("\\nConversion Table:");
        System.out.println("Celsius | Fahrenheit");
        for (int c = 0; c <= 100; c += 20) {
            System.out.println("  " + c + "°C  |  " + celsiusToFahrenheit(c) + "°F");
        }
    }
    
    // Convert Celsius to Fahrenheit: F = (C × 9/5) + 32
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0 / 5.0) + 32;
    }
    
    // Convert Fahrenheit to Celsius: C = (F - 32) × 5/9
    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}

---

## Test Your Knowledge

Mastered Java methods? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering methods, OOPs, and all Core Java topics!
`
    }
  ]
};

export default javaMethods;
