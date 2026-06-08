const javaMethods = {
  id: 'java-methods',
  title: 'Methods in Java',
  description: 'Organizing code into reusable blocks',
  content: `
# Methods — Breaking Code into Reusable Pieces

Imagine writing the same 20 lines of code every time you need to calculate a discount, validate an email, check stock, or format an invoice. That would be tedious and error-prone. Methods solve this problem — they let you write code once and use it many times.

A **method** is a block of code that performs a specific task. You give it a name, and whenever you need that task done, you just call the method. In real projects, method names often describe business actions like \`calculateTotal()\`, \`isEligibleForLoan()\`, \`sendOtp()\`, or \`findEmployeeById()\`.

---

## Why Use Methods?

1. **Reusability** — Write once, use many times, like one tax method used by checkout, invoice, and report screens
2. **Organization** — Break complex problems into smaller pieces such as validate input, calculate amount, save record
3. **Readability** — Give meaningful names to operations so code reads like business flow
4. **Maintainability** — Fix bugs in one place, not everywhere
5. **Testing** — Test individual pieces independently before connecting the full feature

---

## Method Anatomy

\`\`\`java
public class MethodAnatomyDemo {
    public static int methodName(int firstNumber, int secondNumber) {
        int value = firstNumber + secondNumber;
        return value;
    }

    public static void main(String[] args) {
        int result = methodName(10, 20);
        System.out.println("Result: " + result);
    }
}
\`\`\`

**Example:**
\`\`\`java
public class AddMethodDemo {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("Sum: " + add(5, 3));
    }
}
\`\`\`

Let's break this down using a real mindset: the method name tells what work is done, parameters are the data needed to do that work, and the return type tells what result the caller gets back.
- \`public\` — Access modifier (who can call this method)
- \`static\` — Belongs to class, not object
- \`int\` — Return type (what type of value it gives back)
- \`add\` — Method name
- \`(int a, int b)\` — Parameters (inputs)
- \`return a + b;\` — What the method gives back

---

## Types of Methods

Different method shapes solve different real tasks: some only print or save data, some accept input, some return calculated values, and some do both.

### 1. No Parameters, No Return

\`\`\`java
public class NoParameterNoReturnDemo {
    public static void sayHello() {
        System.out.println("Hello!");
    }

    public static void main(String[] args) {
        sayHello();
    }
}
\`\`\`

### 2. With Parameters, No Return

\`\`\`java
public class ParameterNoReturnDemo {
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        greet("Dattu");
    }
}
\`\`\`

### 3. No Parameters, With Return

\`\`\`java
public class NoParameterWithReturnDemo {
    public static int getRandomNumber() {
        return (int) (Math.random() * 100);
    }

    public static void main(String[] args) {
        int num = getRandomNumber();
        System.out.println("Random number: " + num);
    }
}
\`\`\`

### 4. With Parameters and Return

\`\`\`java
public class ParameterWithReturnDemo {
    public static double calculateTax(double amount, double rate) {
        return amount * rate;
    }

    public static void main(String[] args) {
        double tax = calculateTax(100.0, 0.08);
        System.out.println("Tax: " + tax);
    }
}
\`\`\`

---

## Parameters vs Arguments

People often confuse these. In real code, parameters are like empty form fields in a method definition, and arguments are the actual values passed from a screen, API request, test case, or another method.

- **Parameters** — Variables in the method definition
- **Arguments** — Actual values passed when calling

\`\`\`java
public class ParametersArgumentsDemo {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("Result: " + result);
    }
}
\`\`\`

---

## Return Statement

The \`return\` statement does two things, and both matter in real business logic:
1. Sends a value back to the caller
2. Exits the method immediately

\`\`\`java
public class ReturnStatementDemo {
    public static int findMax(int a, int b) {
        if (a > b) {
            return a;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println("Max: " + findMax(45, 30));
    }
}
\`\`\`

**For void methods:** You can use \`return;\` (no value) to exit early.

\`\`\`java
public class VoidReturnDemo {
    public static void printPositive(int num) {
        if (num < 0) {
            return;
        }
        System.out.println(num);
    }

    public static void main(String[] args) {
        printPositive(10);
        printPositive(-5);
    }
}
\`\`\`

---

## Method Overloading

You can have multiple methods with the same name but different parameters. This is useful when one business action supports multiple inputs, such as adding two numbers, three numbers, or decimal values without creating confusing method names.

\`\`\`java
public class MethodOverloadingDemo {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(5, 3));
        System.out.println(add(5, 3, 2));
        System.out.println(add(5.0, 3.0));
    }
}
\`\`\`

**Rules for overloading:**
- Different number of parameters, OR
- Different types of parameters
- Return type alone doesn't count!

---

## Variable Scope

Variables declared inside a method only exist inside that method. This keeps temporary values like one user's discount, one request's OTP, or one calculation's subtotal from leaking into unrelated code.

\`\`\`java
public class MethodScopeDemo {
    public static void methodA() {
        int x = 10;
        System.out.println("x inside methodA: " + x);
    }

    public static void methodB() {
        // System.out.println(x); // Error: x exists only inside methodA
        System.out.println("methodB cannot access methodA local variable");
    }

    public static void main(String[] args) {
        methodA();
        methodB();
    }
}
\`\`\`

---

## Pass by Value

Java always passes arguments **by value** — it copies the value. This matters when debugging because changing a primitive parameter inside a method will not change the caller's original variable.

\`\`\`java
public class PrimitivePassByValueDemo {
    public static void changeValue(int num) {
        num = 100;
        System.out.println("Inside method: " + num);
    }

    public static void main(String[] args) {
        int x = 5;
        changeValue(x);
        System.out.println("Outside method: " + x);
    }
}
\`\`\`

**But with objects, the reference is copied:** this means the method receives a copied address to the same object, so changing array elements or object fields can affect the caller's data.

\`\`\`java
public class ArrayReferencePassDemo {
    public static void changeArray(int[] arr) {
        arr[0] = 100;
    }

    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        changeArray(numbers);
        System.out.println("First value: " + numbers[0]);
    }
}
\`\`\`

---

## Best Practices

1. **One task per method** — A method should do one business action well
2. **Meaningful names** — \`calculateTax()\` or \`validatePassword()\`, not \`calc()\` or \`process()\`
3. **Keep methods short** — If checkout logic mixes validation, discount, tax, and save logic, split it
4. **Limit parameters** — More than 3-4 often means you need an object like \`Order\` or \`Employee\`
5. **Document complex methods** — Use comments or Javadoc when rules involve tax, eligibility, security, or external systems

---

## Real-World Example

Here's how methods work in a real application: one method calculates subtotal, one applies discount, one calculates tax, and one final method combines them into the checkout total.

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

    public static void main(String[] args) {
        double price = 499.0;
        int quantity = 2;
        double discountRate = 0.10;
        double taxRate = 0.08;

        double total = calculateTotal(price, quantity, discountRate, taxRate);

        System.out.println("Price: " + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Discount rate: " + discountRate);
        System.out.println("Tax rate: " + taxRate);
        System.out.println("Final total: " + total);
    }
}
\`\`\`

Each method has a clear, single responsibility. The \`calculateTotal\` method orchestrates them all, just like a service method in a real application calls smaller helper methods to complete one user action.

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
---

## Topic-Focused Practice for Methods in Java

### Real-World Scenarios

1. Build one mini exercise focused on **method signatures** and explain why your chosen approach is correct.
2. Add a second variation where **parameter passing** changes the expected output or system behavior.
3. Document one production caution related to **return type design** and how you would monitor it.

### Page-Specific Interview Questions

1. In Methods in Java, how do you decide between approaches related to **method signatures** when requirements conflict?
2. What debugging steps would you follow if **parameter passing** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **return type design**, and how would you reduce them?
4. What is one real incident where misunderstanding **method signatures** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **parameter passing** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **method signatures** and one that highlights **parameter passing**.
- Record typical errors around **return type design** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

---

## Deep Understanding: Methods as Behavioral Contracts

A Java method is a contract boundary between caller and implementation. Signature defines input and output expectations; body defines execution behavior.

Method quality is judged by cohesion, clarity, and side-effect control. Small, focused methods are easier to test and compose. Overloaded methods improve API ergonomics when names remain semantically consistent. Poor method design causes hidden dependency chains and brittle code.

## Why This Matters in Real Systems

In enterprise codebases, methods become reusable units across services, controllers, and utilities. If contracts are vague, integration defects grow. If contracts are clear, refactoring becomes safer and onboarding becomes faster.

Think of methods as units of business intent, not just blocks of code.

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
