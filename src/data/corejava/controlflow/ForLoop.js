const forLoop = {
  id: 'for-loop',
  title: 'For Loop',
  description: 'Repeating code a specific number of times',
  content: `
# For Loop - Repeating Code a Specific Number of Times

The for loop is a fundamental control flow construct in Java that enables developers to execute a block of code repeatedly for a predetermined number of iterations. For loops are essential for processing arrays, collections, and performing repetitive operations with precise control over iteration count. Understanding for loops is crucial for efficient data processing, algorithm implementation, and working with data structures.

For loops are widely used in enterprise applications for tasks such as data processing, batch operations, array manipulation, and iterative algorithms. They provide better performance and readability compared to while loops when the number of iterations is known in advance. Mastery of for loops is fundamental for Java developers working with collections, arrays, and iterative problem-solving.

---

## Basic For Loop

\`\`\`java
for (initialization; condition; update) {
    // Code to repeat
}
\`\`\`

**Example:**
\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
// Output: 1, 2, 3, 4, 5
\`\`\`

**How it works:**
1. **Initialization** (\`int i = 1\`) — Runs once at the start
2. **Condition** (\`i <= 5\`) — Checked before each iteration
3. **Update** (\`i++\`) — Runs after each iteration
4. **Body** — Runs if condition is true

---

## Common Patterns

### Counting Up

\`\`\`java
for (int i = 0; i < 10; i++) {
    System.out.println(i);  // 0 to 9
}
\`\`\`

### Counting Down

\`\`\`java
for (int i = 10; i > 0; i--) {
    System.out.println(i);  // 10 to 1
}
\`\`\`

### Step by 2

\`\`\`java
for (int i = 0; i <= 10; i += 2) {
    System.out.println(i);  // 0, 2, 4, 6, 8, 10
}
\`\`\`

### Iterating Arrays

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Index " + i + ": " + numbers[i]);
}
\`\`\`

---

## Enhanced For Loop (For-Each)

Simpler syntax for iterating collections:

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

**When to use:**
- You don't need the index
- You're not modifying the array
- You want cleaner code

**When NOT to use:**
- You need the index
- You need to modify elements
- You need to iterate backwards

---

## Nested For Loops

Loops inside loops:

\`\`\`java
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}
\`\`\`

Output:
\`\`\`
1   2   3   4   5
2   4   6   8   10
3   6   9   12  15
4   8   12  16  20
5   10  15  20  25
\`\`\`

---

## Loop Control

### break — Exit the loop

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // Exit loop
    }
    System.out.println(i);
}
// Output: 1, 2, 3, 4
\`\`\`

### continue — Skip to next iteration

\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // Skip this iteration
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5
\`\`\`

### Labeled break/continue

For nested loops:

\`\`\`java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;  // Exit both loops
        }
        System.out.println(i + "," + j);
    }
}
\`\`\`

---

## Infinite Loop

Be careful! This runs forever:

\`\`\`java
for (;;) {
    // Infinite loop
}

// Or
for (int i = 0; i >= 0; i++) {
    // Also infinite (until overflow)
}
\`\`\`

---

## Real-World Examples

### Processing a List

\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

for (int i = 0; i < names.size(); i++) {
    System.out.println((i + 1) + ". " + names.get(i));
}
\`\`\`

### Finding an Element

\`\`\`java
int[] numbers = {5, 12, 8, 130, 44};
int target = 8;
int foundIndex = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        foundIndex = i;
        break;
    }
}

if (foundIndex != -1) {
    System.out.println("Found at index: " + foundIndex);
}
\`\`\`

### Calculating Sum

\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};
int sum = 0;

for (int num : numbers) {
    sum += num;
}

System.out.println("Sum: " + sum);  // 15
\`\`\`

---

## Common Mistakes

### Off-by-One Errors

\`\`\`java
int[] arr = {1, 2, 3, 4, 5};

// WRONG - ArrayIndexOutOfBoundsException
for (int i = 0; i <= arr.length; i++) { }

// CORRECT
for (int i = 0; i < arr.length; i++) { }
\`\`\`

### Modifying Loop Variable

\`\`\`java
// Confusing and error-prone
for (int i = 0; i < 10; i++) {
    i = i + 2;  // Don't do this!
}
\`\`\`

### Infinite Loop by Mistake

\`\`\`java
// WRONG - i never changes
for (int i = 0; i < 10; ) {
    System.out.println(i);
}
\`\`\`

---

## Real-World Applications

### Data Processing
Enterprise applications use for loops to process large datasets, transform data, and perform batch operations. E-commerce platforms process order items, financial systems calculate transactions, and analytics applications aggregate data using for loops.

**Implementation Example:**
- Processing order items in a shopping cart
- Calculating total sales from transaction records
- Aggregating user activity data for analytics
- Batch processing of file uploads

### Array and Collection Operations
For loops are essential for iterating through arrays and collections to perform operations like searching, filtering, transforming, and aggregating data. Most data manipulation operations require for loops.

**Implementation Example:**
- Searching for specific products in a catalog
- Filtering users by criteria
- Transforming data formats
- Calculating statistics from datasets

### Algorithm Implementation
Many algorithms rely on for loops for iterative processing. Sorting algorithms, search algorithms, and mathematical computations use for loops extensively.

**Implementation Example:**
- Sorting algorithms (bubble sort, selection sort)
- Search algorithms (linear search, binary search)
- Mathematical computations (factorial, Fibonacci)
- Pattern matching and string processing

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Off-by-One Errors
**Problem:** Using `<=` instead of `<` when iterating arrays causes ArrayIndexOutOfBoundsException.

**Solution:** Always use `<` with array.length:

\`\`\`java
// CORRECT
for (int i = 0; i < arr.length; i++) { }

// WRONG
for (int i = 0; i <= arr.length; i++) { }  // Index out of bounds!
\`\`\`

### Mistake 2: Modifying Loop Variable
**Problem:** Changing the loop variable inside the loop body causes unpredictable behavior.

**Solution:** Don't modify the loop variable:

\`\`\`java
// WRONG
for (int i = 0; i < 10; i++) {
    i = i + 2;  // Don't do this!
}

// CORRECT - Use step in update
for (int i = 0; i < 10; i += 3) { }
\`\`\`

### Mistake 3: Infinite Loops
**Problem:** Forgetting the update expression or having a condition that never becomes false.

**Solution:** Always ensure the condition will eventually become false:

\`\`\`java
// WRONG - Missing update
for (int i = 0; i < 10; ) { }  // Infinite!

// CORRECT
for (int i = 0; i < 10; i++) { }
\`\`\`

### Mistake 4: Using Traditional Loop When Enhanced Loop Works
**Problem:** Using index-based loop when enhanced for-each loop is simpler and safer.

**Solution:** Use enhanced for loop when you don't need the index:

\`\`\`java
// PREFER - Simpler and safer
for (String item : items) {
    System.out.println(item);
}

// AVOID - More complex
for (int i = 0; i < items.length; i++) {
    System.out.println(items[i]);
}
\`\`\`

### Mistake 5: Nested Loop Performance Issues
**Problem:** Using nested loops with large datasets causes performance problems.

**Solution:** Optimize nested loops or use more efficient algorithms:

\`\`\`java
// WRONG - O(n²) complexity
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // Process
    }
}

// PREFER - Optimize when possible
// Use hash maps, sorting, or other optimizations
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is a for loop and when should I use it?

A for loop is a control flow statement that repeats a block of code a specific number of times. Use a for loop when you know in advance how many times you want to execute the code, such as iterating through arrays, processing collections, or performing a fixed number of operations. For loops provide better readability and performance compared to while loops for known iteration counts.

### What's the difference between for loop and while loop?

A for loop is used when you know the number of iterations in advance, while a while loop is used when the number of iterations depends on a condition that may change during execution. For loops are more concise for counting iterations, while while loops are better for condition-based repetition. Learn about [While Loop](/corejava/while-loop) to understand the differences.

### What is an enhanced for loop (for-each)?

The enhanced for loop (for-each) is a simplified syntax introduced in Java 5 for iterating through arrays and collections. It automatically handles iteration without requiring an index variable. Use it when you don't need the index and aren't modifying the collection. It's safer and more readable than traditional for loops for simple iteration.

### Can I use break and continue in for loops?

Yes, both \`break\` and \`continue\` work in for loops. The \`break\` statement exits the loop immediately, while \`continue\` skips the rest of the current iteration and proceeds to the next iteration. These are useful for early termination and skipping specific iterations based on conditions. Learn about [Break Continue](/corejava/break-continue) for detailed usage.

### How do nested for loops work?

Nested for loops are for loops inside other for loops. They're commonly used for processing two-dimensional arrays, creating patterns, and implementing algorithms that require multiple levels of iteration. The inner loop completes all its iterations for each iteration of the outer loop. Be careful with performance - nested loops can be slow for large datasets.

### What happens if I don't include all three parts of a for loop?

All three parts (initialization, condition, update) are optional, but you must include semicolons. If you omit the condition, it creates an infinite loop. If you omit initialization or update, you must handle them elsewhere. Infinite loops are created with \`for(;;)\` syntax, which is sometimes used intentionally with break statements.

### Can I declare multiple variables in a for loop?

Yes, you can declare multiple variables of the same type in the initialization part:

\`\`\`java
for (int i = 0, j = 10; i < j; i++, j--) {
    // Both i and j are available
}
\`\`\`

### What's the scope of variables declared in a for loop?

Variables declared in the for loop initialization (like \`int i = 0\`) are scoped to the for loop block only. They cannot be accessed outside the loop. This is useful for keeping variable names clean and avoiding conflicts with other variables in your code.

### How do I iterate backwards through an array?

Use a for loop that starts at the last index and decrements:

\`\`\`java
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.println(arr[i]);
}
\`\`\`

### When should I use a traditional for loop vs enhanced for loop?

Use a traditional for loop when you need the index, need to modify elements, need to iterate backwards, or need to skip elements based on index. Use an enhanced for loop when you simply need to process each element sequentially without modification. The enhanced for loop is generally preferred for readability and safety.

---

## Key Takeaways

Before proceeding to other control flow statements, ensure you understand these for loop fundamentals:

- **For loops repeat code** a specific number of times with precise control
- **Three parts**: initialization, condition, and update control the loop behavior
- **Enhanced for loop** provides simpler syntax for iterating arrays and collections
- **Nested for loops** enable processing multi-dimensional data structures
- **break and continue** provide control over loop execution flow
- **Off-by-one errors** are common - always use `<` with array.length
- **Loop variable scope** is limited to the loop block
- **For loops are preferred** when iteration count is known in advance

---

## What's Next?

Now that you understand for loops, you're ready to explore other control flow statements:

### Immediate Next Steps

1. **[While Loop](/corejava/while-loop)**: Learn condition-based repetition
2. **[Do While Loop](/corejava/do-while-loop)**: Understand loops that execute at least once
3. **[If-Else Statements](/corejava/if-else)**: Master conditional execution
4. **[Switch Statement](/corejava/switch-statement)**: Learn multi-way branching

### Advanced Topics

- **Loop Optimization**: Learn techniques for improving loop performance
- **Stream API**: Discover modern Java's functional approach to iteration
- **Iterators**: Understand collection iteration mechanisms
- **Algorithm Complexity**: Learn about time complexity in loops

### Related Tutorials

- **[Java Control Flow](/tutorial/control-flow-introduction)**: Review all control flow statements
- **[Arrays](/corejava/single-dimensional-array)**: Practice for loops with arrays
- **[Collections](/corejava/collection-introduction)**: Learn to iterate collections
- **[Java Basics](/corejava/java-introduction)**: Master Java fundamentals

For loops are essential for processing data and implementing algorithms. Continue learning about [While Loop](/corejava/while-loop) to understand condition-based repetition and expand your control flow knowledge.

---

## 10 Important for-loop Interview Questions

### 1. What are the three parts of a traditional \`for\` loop?
**Answer:** Initialization, condition, and update—executed before iteration, before each body, and after each body respectively.
The condition is checked every iteration.

### 2. What is enhanced for (\`for-each\`) and what types does it accept?
**Answer:** \`for (T x : iterable)\` iterates arrays or \`Iterable\`; no index unless you track manually.
Fails fast if collection is structurally modified—\`ConcurrentModificationException\` for many collections.

### 3. When is a traditional \`for\` loop better than enhanced for?
**Answer:** When you need the index, multiple arrays in lockstep, or to iterate backwards.
Enhanced for is clearer when you only need elements.

### 4. What is \`break\` and \`continue\` inside a for loop?
**Answer:** \`break\` exits the loop; \`continue\` skips to the next iteration.
Labeled \`break\` can exit outer loops.

### 5. What is off-by-one risk in loop bounds?
**Answer:** Using \`<=\` vs \`<\` with array length—classic fencepost errors.
Test with empty and single-element collections.

### 6. How do multiple variables work in \`for\` initialization?
**Answer:** You can declare several same-type vars: \`for (int i = 0, j = n - 1; i < j; i++, j--)\`.
Useful for two-pointer algorithms.

### 7. Scenario: processing millions of rows—what for-loop concerns arise?
**Answer:** Allocation in the loop header, autoboxing in enhanced for over poor structures, and unnecessary object creation in update step.
Profile before micro-optimizing.

### 8. What is the scope of the loop variable in a traditional for?
**Answer:** Declared in the for header, scoped to the loop body in modern Java (block scoped).
Older code sometimes declared \`int i\` outside for wider scope—avoid unless needed.

### 9. Can the loop condition call methods with side effects?
**Answer:** Yes, but it’s poor style—\`for (; it.hasNext(); )\` on an \`Iterator\` or calling \`size()\` each time can be costly if the method isn’t O(1).
Cache lengths or iterator state when appropriate.

### 10. How does \`for\` relate to iterators under the hood?
**Answer:** Enhanced for compiles to iterator or array index loops depending on type.
Understanding this explains CME and performance of raw arrays vs lists.

---

## Deep Theory: for-loop as Controlled Iteration Contract

for-loop represents bounded iteration where initialization, guard, and state transition are co-located. This structure improves reasoning about termination and complexity.

### Formal Components

- initializer defines starting state,
- condition defines continuation invariant,
- update defines deterministic progression.

Together they express loop correctness in one compact control header.

### Why It Matters

Many algorithmic bugs are off-by-one or termination faults. for-loop centralizes loop mechanics and reduces accidental divergence between loop body logic and iteration state.

### Complexity Lens

for-loops are often the visible source of time complexity. Single loop typically maps to O(n), nested loops to O(n*m), unless early termination alters average behavior.

`,
  code: `// For Loop Demo

import java.util.*;

public class ForLoopDemo {
    public static void main(String[] args) {
        System.out.println("=== For Loop Demo ===\\n");
        
        // 1. BASIC FOR LOOP
        System.out.println("1. BASIC FOR LOOP");
        System.out.println("   ---------------");
        
        System.out.print("   Counting 1-5: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Counting down 5-1: ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Even numbers 0-10: ");
        for (int i = 0; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println("\\n");
        
        // 2. ITERATING ARRAYS
        System.out.println("2. ITERATING ARRAYS");
        System.out.println("   -----------------");
        
        String[] fruits = {"Apple", "Banana", "Cherry", "Date"};
        
        System.out.println("   Traditional for loop:");
        for (int i = 0; i < fruits.length; i++) {
            System.out.println("   " + i + ": " + fruits[i]);
        }
        
        System.out.println("\\n   Enhanced for loop (for-each):");
        for (String fruit : fruits) {
            System.out.println("   - " + fruit);
        }
        System.out.println();
        
        // 3. NESTED FOR LOOPS
        System.out.println("3. NESTED FOR LOOPS");
        System.out.println("   -----------------");
        
        System.out.println("   Multiplication Table (1-5):");
        System.out.print("      ");
        for (int i = 1; i <= 5; i++) {
            System.out.printf("%4d", i);
        }
        System.out.println();
        System.out.println("      " + "----".repeat(5));
        
        for (int i = 1; i <= 5; i++) {
            System.out.printf("   %d |", i);
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }
        System.out.println();
        
        // 4. BREAK AND CONTINUE
        System.out.println("4. BREAK AND CONTINUE");
        System.out.println("   -------------------");
        
        System.out.print("   Break at 5: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break;
            System.out.print(i + " ");
        }
        System.out.println();
        
        System.out.print("   Skip 3 and 6: ");
        for (int i = 1; i <= 7; i++) {
            if (i == 3 || i == 6) continue;
            System.out.print(i + " ");
        }
        System.out.println("\\n");
        
        // 5. PATTERN PRINTING
        System.out.println("5. PATTERN PRINTING");
        System.out.println("   -----------------");
        
        System.out.println("   Right triangle:");
        for (int i = 1; i <= 5; i++) {
            System.out.print("   ");
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();
        
        // 6. PRACTICAL EXAMPLES
        System.out.println("6. PRACTICAL EXAMPLES");
        System.out.println("   -------------------");
        
        // Sum of array
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("   Sum of array: " + sum);
        
        // Find maximum
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("   Maximum: " + max);
        
        // Count occurrences
        String text = "hello world";
        int count = 0;
        for (char c : text.toCharArray()) {
            if (c == 'l') count++;
        }
        System.out.println("   'l' appears " + count + " times in '" + text + "'");
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Shopping Cart");
        System.out.println("   ------------------------------------");
        
        String[] items = {"Laptop", "Mouse", "Keyboard"};
        double[] prices = {999.99, 29.99, 79.99};
        int[] quantities = {1, 2, 1};
        
        double total = 0;
        System.out.println("   Cart Items:");
        for (int i = 0; i < items.length; i++) {
            double itemTotal = prices[i] * quantities[i];
            total += itemTotal;
            System.out.printf("   %d. %s x%d @ $%.2f = $%.2f%n", 
                             i + 1, items[i], quantities[i], prices[i], itemTotal);
        }
        System.out.printf("   Total: $%.2f%n", total);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a program that finds prime numbers',
      hint: 'Use nested loops to check if a number is divisible',
      starterCode: `public class PrimeNumbers {
    public static void main(String[] args) {
        System.out.println("=== Prime Numbers ===\\n");
        
        int limit = 50;
        System.out.println("Prime numbers from 2 to " + limit + ":");
        
        int count = 0;
        for (int num = 2; num <= limit; num++) {
            if (isPrime(num)) {
                System.out.print(num + " ");
                count++;
            }
        }
        
        System.out.println("\\n\\nTotal primes found: " + count);
    }
    
    public static boolean isPrime(int num) {
        if (num < 2) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;
        
        // Check odd divisors up to square root
        for (int i = 3; i * i <= num; i += 2) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}`
    }
  ]
};

export default forLoop;
