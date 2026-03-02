const stringBuilder = {
  id: "string-builder",
  title: "StringBuilder",
  description: "Learn about StringBuilder - faster alternative to StringBuffer",
  content: `
# StringBuilder in Java (Mutable Strings for Fast Concatenation)

In Java, \`String\` objects are **immutable**. That means every time you do concatenation like \`s = s + "x"\`, Java creates a **new String object**. In loops, this becomes expensive and can slow down your application.

**StringBuilder** solves this by providing a **mutable** sequence of characters. You can append, insert, delete, and modify characters **without creating many intermediate objects**.

---

## Why StringBuilder Exists

### Problem: String concatenation in loops is slow

\`\`\`java
String s = "";
for (int i = 0; i < 10000; i++) {
    s += "a"; // creates many new String objects
}
\`\`\`

This creates a large number of temporary strings and increases GC (Garbage Collection) pressure.

### Solution: StringBuilder uses a resizable char buffer

\`\`\`java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append("a");
}
String result = sb.toString();
\`\`\`

---

## Core Properties of StringBuilder

- **Mutable**: contents can change\n
- **Not synchronized**: faster, but **not thread-safe**\n
- **Backed by internal char array** that grows as needed\n
- Best choice for **single-threaded** string building

---

## Diagram: String vs StringBuilder (Conceptual)

\`\`\`
String (Immutable):
  "Hi" + "!"  -> creates new object "Hi!"

StringBuilder (Mutable):
  buffer: [H][i] -> append('!') -> buffer: [H][i][!]
\`\`\`

---

## StringBuilder vs StringBuffer vs String

| Feature | String | StringBuilder | StringBuffer |
|---|---|---|---|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes (synchronized) |
| Performance | Best for few ops | Best for many ops (single thread) | Slower than SB |
| Common use | constants, keys | building output | shared mutable string |

---

## Real-World Use Cases

### Use Case 1: Building API Responses / JSON-like Output

Servers often build large strings (logs, CSV, JSON output).

### Use Case 2: Generating Reports (Invoices, Statements)

Concatenating thousands of lines is common in reporting modules.

### Use Case 3: Building SQL Queries Dynamically (Careful with security)

\`StringBuilder\` can build query strings, but always use PreparedStatement to prevent SQL injection.\n
Learn more in [PreparedStatement](/tutorial/jdbc-prepared-statement).

---

## Common StringBuilder Methods (With Examples)

### append()

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" ").append("Java").append("!");
\`\`\`

### insert()

\`\`\`java
sb.insert(5, " World");
\`\`\`

### delete() and deleteCharAt()

\`\`\`java
sb.delete(0, 5); // delete range
sb.deleteCharAt(0); // delete one character
\`\`\`

### reverse()

\`\`\`java
sb.reverse();
\`\`\`

### capacity() and ensureCapacity()

\`\`\`java
StringBuilder sb = new StringBuilder(1000); // pre-allocate
\`\`\`

**Best practice:** if you know the approximate size, set initial capacity to reduce resizing.

---

## Common Mistakes

### Mistake 1: Using String concatenation inside loops

Prefer StringBuilder for repeated concatenation.

### Mistake 2: Using StringBuilder across multiple threads

StringBuilder is not thread-safe. If multiple threads need to mutate a shared string, prefer StringBuffer or design with thread confinement.

---

## FAQs (StringBuilder)

### Q1: Is StringBuilder always faster than String?

**A:** Only when many modifications happen (especially in loops). For small concatenations, the compiler may optimize.

### Q2: Should I use StringBuilder or StringBuffer?

**A:** Use StringBuilder for single-threaded code. Use StringBuffer only when shared mutation across threads is required (rare in modern design).

### Q3: Does StringBuilder modify the original String?

**A:** No. Strings are immutable. StringBuilder manages its own internal buffer.

### Q4: What does toString() do?

**A:** It creates a new immutable String containing the builder’s current content.

### Q5: When should I set capacity manually?

**A:** When you expect large output, setting capacity improves performance by reducing reallocations.

---

## Conclusion

StringBuilder is the standard tool for **fast string construction** in Java. Learn to use it whenever you build output repeatedly, especially inside loops.

### Next steps
- Learn [StringBuffer](/tutorial/string-buffer) for thread-safe mutable strings
- Learn [String Methods](/tutorial/string-methods) for common operations on String
- Learn [Collections](/tutorial/collection-introduction) for storing many strings efficiently
  `,
  code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        System.out.println("=== StringBuilder Demo ===\\n");
        
        // Creating StringBuilder
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Initial: " + sb);
        
        // Append
        sb.append(" World").append("!");
        System.out.println("After append: " + sb);
        
        // Insert
        sb.insert(5, " Java");
        System.out.println("After insert: " + sb);
        
        // Delete
        sb.delete(5, 10);
        System.out.println("After delete: " + sb);
        
        // Reverse
        sb.reverse();
        System.out.println("Reversed: " + sb);
        
        // Performance comparison
        System.out.println("\\n--- Performance Comparison ---");
        int iterations = 100000;
        
        // String concatenation
        long start = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < 1000; i++) {
            s += "a";
        }
        System.out.println("String (1000 iterations): " + (System.currentTimeMillis() - start) + "ms");
        
        // StringBuilder
        start = System.currentTimeMillis();
        StringBuilder sbPerf = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sbPerf.append("a");
        }
        System.out.println("StringBuilder (100000 iterations): " + (System.currentTimeMillis() - start) + "ms");
        
        // StringBuffer
        start = System.currentTimeMillis();
        StringBuffer sbfPerf = new StringBuffer();
        for (int i = 0; i < iterations; i++) {
            sbfPerf.append("a");
        }
        System.out.println("StringBuffer (100000 iterations): " + (System.currentTimeMillis() - start) + "ms");
    }
}`,
  practiceQuestions: [
    {
      question: "Compare performance of String, StringBuilder, and StringBuffer",
      hint: "Use System.currentTimeMillis() to measure time",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int iterations = 10000;
        
        // Test String concatenation
        
        // Test StringBuilder
        
        // Test StringBuffer
        
    }
}`
    }
  ]
};

export default stringBuilder;





