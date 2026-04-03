const stringBuffer = {
  id: "string-buffer",
  title: "StringBuffer",
  description: "Learn about mutable StringBuffer class in Java",
  content: `
# StringBuffer in Java (Thread-Safe Mutable Strings)

\`StringBuffer\` is a **mutable** sequence of characters. Unlike \`String\` (immutable), StringBuffer allows modifications (append/insert/delete) **without creating new objects** repeatedly.

The key difference between **StringBuffer** and **StringBuilder** is **thread safety**:\n
- **StringBuffer is synchronized**, so it is safer when multiple threads may modify the same instance.\n
- That synchronization makes it **slower** than StringBuilder in single-threaded code.

---

## Why StringBuffer Exists

In multi-threaded applications, if multiple threads modify a shared mutable string without synchronization, you can get corrupted output. StringBuffer provides synchronized methods to avoid these race conditions.

**Note:** In modern applications, shared mutable strings are often avoided. Developers prefer thread confinement or immutable objects. Still, StringBuffer is important to understand and is used in legacy code.

---

## Key Features

- **Mutable**: can be modified in place\n
- **Thread-safe**: most methods are synchronized\n
- **Efficient for frequent modifications** compared to String concatenation\n
- Has an internal resizable buffer (capacity grows as needed)

---

## String vs StringBuffer vs StringBuilder (Comparison)

| Feature | String | StringBuilder | StringBuffer |
|---|---|---|---|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes |
| Performance | Best for few changes | Best for many changes (single thread) | Slower (sync overhead) |
| Typical use | constants, keys | builders, logs | shared mutable string (rare) |

---

## Real-World Use Cases

### Use Case 1: Legacy Multi-Threaded Logging or Report Building

Older systems sometimes used StringBuffer to build log lines or reports from multiple threads.

### Use Case 2: Shared Text Buffer in Concurrent Utility Code

Some utilities append messages from multiple worker threads (not recommended now, but exists).

---

## Common Methods (With Explanation)

| Method | What it does | Example |
|---|---|---|
| \`append()\` | adds to end | \`sb.append(\"Hi\")\` |
| \`insert()\` | inserts at index | \`sb.insert(2, \"X\")\` |
| \`delete()\` | removes range | \`sb.delete(0, 3)\` |
| \`reverse()\` | reverses buffer | \`sb.reverse()\` |
| \`replace()\` | replace a range | \`sb.replace(0, 2, \"Yo\")\` |
| \`capacity()\` | current buffer size | \`sb.capacity()\` |

---

## Thread Safety: What “Synchronized” Means

StringBuffer synchronizes method calls so only one thread can modify the buffer at a time.

**Impact:**\n
- prevents data corruption\n
- adds overhead (lock acquisition)\n
- may reduce throughput if many threads contend

---

## Common Mistakes

### Mistake 1: Using StringBuffer everywhere (unnecessary)

If your code is single-threaded, prefer StringBuilder.

### Mistake 2: Assuming StringBuffer makes all logic thread-safe

StringBuffer only synchronizes its methods. Your full workflow (multiple operations) may still need higher-level synchronization if you require atomic sequences.

---

## FAQs (StringBuffer)

### Q1: Should I use StringBuffer in Spring Boot applications?

**A:** Usually no. Prefer StringBuilder for local building. Use thread pools and avoid shared mutable text across threads.

### Q2: Is StringBuffer fully thread-safe?

**A:** Individual methods are synchronized. But complex sequences across multiple calls may still require external synchronization if you need atomic multi-step operations.

### Q3: Why is StringBuffer slower than StringBuilder?

**A:** Because StringBuffer uses synchronization (locking) which adds overhead.

### Q4: Does StringBuffer reduce memory usage?

**A:** It reduces temporary object creation compared to String concatenation in loops, which can reduce GC pressure.

### Q5: When is StringBuffer still useful today?

**A:** Mainly in legacy codebases or when you truly share a mutable character buffer across threads (rare).

---

## Conclusion

StringBuffer is a thread-safe mutable string class. Learn it to understand concurrency and legacy Java, but in most modern code, prefer StringBuilder (single-thread) and avoid sharing mutable strings across threads.

### Next steps
- Learn [StringBuilder](/tutorial/string-builder) for faster single-thread building
- Learn [Thread Lifecycle](/tutorial/thread-lifecycle) to understand thread states
- Learn [Synchronization](/tutorial/synchronization) for thread safety
  
---

## 10 Important StringBuffer Interview Questions

### 1. When is \`StringBuffer\` still used?
**Answer:** Legacy code or rare cases needing synchronized \`append\` across threads—most apps prefer external synchronization or \`StringBuilder\` per thread.
Modern code rarely needs it.

### 2. How does synchronization impact performance?
**Answer:** Every method acquires monitor—contention kills throughput; avoid shared \`StringBuffer\` as global accumulator.
Use thread-local \`StringBuilder\` instead.

### 3. Is \`StringBuffer\` API compatible with \`StringBuilder\`?
**Answer:** Nearly identical mutating API—easy swap when thread-safety requirement disappears.
Refactor to \`StringBuilder\` after reviewing concurrency.

### 4. Scenario: logging framework appends on shared buffer—good idea?
**Answer:** Generally no—logging uses per-event builders or formatters; shared mutable buffers race.
Log4j/SLF4J handle thread safety differently.

### 5. What about \`append\` with primitives?
**Answer:** Overloaded for efficiency—avoids boxing in many paths.
Same as \`StringBuilder\`.

### 6. Does \`reverse\` mutate in place?
**Answer:** Yes—same object content reversed—useful for palindrome tricks rarely in production business logic.
Know BigInteger uses strings differently.

### 7. Why might interviewers still ask \`StringBuffer\`?
**Answer:** To discuss synchronization, evolution of Java performance, and knowing when sharing mutable state is wrong.
Signals multithreading awareness.

### 8. Can you convert \`StringBuffer\` to \`StringBuilder\` cheaply?
**Answer:** No direct shared conversion—copy via \`toString\` then new builder—implies allocation.
Design choice at construction time matters.

### 9. What is \`equals\` on \`StringBuffer\`?
**Answer:** Inherits \`Object.equals\` identity—use \`toString().equals\` for content compare.
Often surprises beginners.

### 10. Memory considerations vs \`String\`?
**Answer:** Both on heap; \`StringBuffer\` grows backing array—capacity tuning similar to \`StringBuilder\`.
Monitor large XML/JSON string assembly.

`,
  code: `public class StringBufferDemo {
    public static void main(String[] args) {
        System.out.println("=== StringBuffer Demo ===\\n");
        
        // Creating StringBuffer
        StringBuffer sb = new StringBuffer("Hello");
        System.out.println("Initial: " + sb);
        System.out.println("Capacity: " + sb.capacity());
        System.out.println("Length: " + sb.length());
        
        // Append
        System.out.println("\\n--- Append ---");
        sb.append(" World");
        System.out.println("After append: " + sb);
        sb.append(123);
        System.out.println("After append int: " + sb);
        
        // Insert
        System.out.println("\\n--- Insert ---");
        sb.insert(5, " Java");
        System.out.println("After insert: " + sb);
        
        // Delete
        System.out.println("\\n--- Delete ---");
        sb.delete(5, 10);
        System.out.println("After delete: " + sb);
        
        // Reverse
        System.out.println("\\n--- Reverse ---");
        StringBuffer sb2 = new StringBuffer("Hello");
        sb2.reverse();
        System.out.println("Reversed: " + sb2);
        
        // Replace
        System.out.println("\\n--- Replace ---");
        StringBuffer sb3 = new StringBuffer("Hello World");
        sb3.replace(6, 11, "Java");
        System.out.println("After replace: " + sb3);
        
        // Chaining methods
        System.out.println("\\n--- Method Chaining ---");
        StringBuffer sb4 = new StringBuffer();
        sb4.append("Hello").append(" ").append("World").reverse();
        System.out.println("Chained result: " + sb4);
        
        // Performance comparison
        System.out.println("\\n--- Performance Demo ---");
        long start = System.currentTimeMillis();
        StringBuffer sbPerf = new StringBuffer();
        for (int i = 0; i < 10000; i++) {
            sbPerf.append("a");
        }
        long end = System.currentTimeMillis();
        System.out.println("StringBuffer time: " + (end - start) + "ms");
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to reverse a string using StringBuffer",
      hint: "Use StringBuffer's reverse() method",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String original = "Hello Java";
        
        // Reverse using StringBuffer
        
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reversed);
    }
}`
    }
  ]
};

export default stringBuffer;





