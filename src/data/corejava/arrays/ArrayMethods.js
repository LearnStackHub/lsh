const arrayMethods = {
  id: "array-methods",
  title: "Array Methods",
  description: "Learn useful array methods from Arrays class",
  content: `# Arrays Class Methods in Java (java.util.Arrays)

The \`java.util.Arrays\` class provides a set of highly optimized utility methods for working with arrays. In real projects, you rarely write sorting or copying loops manually—these methods are faster, safer, and easier to read.

This guide covers the most important \`Arrays\` methods, real-world use cases, time complexity, and common mistakes.

---

## Why Arrays Utility Methods Matter

Arrays are fixed-size, but they are widely used in:\n
- performance-sensitive systems\n
- data pipelines\n
- competitive programming\n
- interview problems\n
- internal data processing (buffers, caches)\n

When you use \`Arrays\`, you get battle-tested implementations that are often significantly faster than naive loops.

---

## Most Used Arrays Methods (Quick Table)

| Method | What it does | Common use |
|---|---|---|
| \`sort()\` | sorts array | ranking, ordering |
| \`binarySearch()\` | search in sorted array | fast lookup |
| \`fill()\` | fill with a value | initialization |
| \`copyOf()\` | copy/resize | resize-like behavior |
| \`copyOfRange()\` | slice a range | subarray extraction |
| \`equals()\` | compare arrays | validation |
| \`deepEquals()\` | compare 2D arrays | matrix comparisons |
| \`toString()\` | pretty print 1D arrays | logging |
| \`deepToString()\` | pretty print 2D arrays | logging |
| \`asList()\` | array → list view (objects only) | interoperability |
| \`setAll()\` | compute values for each index | generated data |
| \`parallelSort()\` | parallel sorting | big datasets |

---

## 1) Arrays.toString() and Arrays.deepToString()

### toString() (1D)

\`\`\`java
int[] a = {3, 1, 9};
System.out.println(Arrays.toString(a)); // [3, 1, 9]
\`\`\`

### deepToString() (2D)

\`\`\`java
int[][] m = {{1,2}, {3,4}};
System.out.println(Arrays.deepToString(m)); // [[1, 2], [3, 4]]
\`\`\`

**Use case:** logging and debugging without writing manual loops.

---

## 2) Arrays.sort() and Arrays.parallelSort()

\`\`\`java
int[] scores = {90, 12, 45, 70};
Arrays.sort(scores);
\`\`\`

**Time complexity:** typically $O(n log n)$.\n
For primitives, Java uses highly optimized algorithms.

### parallelSort()

\`\`\`java
int[] big = new int[1_000_000];
Arrays.parallelSort(big);
\`\`\`

**When to use:** large arrays on multi-core machines. For small arrays, \`sort()\` is often faster due to overhead.

---

## 3) Arrays.binarySearch()

Binary search works only on a **sorted** array.

\`\`\`java
int[] a = {10, 20, 30, 40};
int idx = Arrays.binarySearch(a, 30); // 2
\`\`\`

**If not found**, it returns a negative insertion point:\n
\`-(insertionPoint) - 1\`

---

## 4) Arrays.copyOf() and copyOfRange()

### copyOf() (copy + resize)

\`\`\`java
int[] a = {1,2,3};
int[] b = Arrays.copyOf(a, 5); // [1,2,3,0,0]
\`\`\`

### copyOfRange() (slice)

\`\`\`java
int[] a = {10,20,30,40,50};
int[] mid = Arrays.copyOfRange(a, 1, 4); // [20,30,40]
\`\`\`

---

## 5) Arrays.fill()

\`\`\`java
int[] flags = new int[5];
Arrays.fill(flags, 1); // [1,1,1,1,1]
\`\`\`

Use case: initialization (DP arrays, visited arrays, default values).

---

## 6) Arrays.equals() and deepEquals()

\`\`\`java
int[] a = {1,2};
int[] b = {1,2};
System.out.println(Arrays.equals(a, b)); // true
\`\`\`

For 2D arrays, use \`deepEquals\`:

\`\`\`java
int[][] x = {{1,2},{3,4}};
int[][] y = {{1,2},{3,4}};
System.out.println(Arrays.deepEquals(x, y)); // true
\`\`\`

---

## Real-World Use Cases

### Use Case 1: Ranking Students by Score

- Sort scores\n
- Pick top N\n

### Use Case 2: Fast Search in Product IDs

- Sort product IDs once\n
- Binary search for lookups\n

### Use Case 3: Data Preprocessing

- Fill arrays to default values\n
- Copy ranges for batching\n

---

## Comparison Table: Manual Loop vs Arrays Utility

| Task | Manual loop | Arrays method |
|---|---|---|
| Sort | easy to write wrong | \`Arrays.sort()\` |
| Copy | verbose | \`copyOf()\` / \`copyOfRange()\` |
| Print | loop required | \`toString()\` |
| Compare | tricky for 2D | \`equals()\` / \`deepEquals()\` |

---

## Common Mistakes

### Mistake 1: Using binarySearch on unsorted array

**Fix:** always sort first.

### Mistake 2: Printing a 2D array with toString

\`\`\`java
System.out.println(Arrays.toString(matrix)); // prints references
\`\`\`

**Fix:** use \`deepToString\`.

---

## FAQs (Arrays Methods)

### Q1: Does Arrays.sort() work for objects?

**A:** Yes. For objects, you can provide a comparator: \`Arrays.sort(arr, comparator)\`.

### Q2: Why does binarySearch return negative values sometimes?

**A:** It returns insertion point information when the key is not present.

### Q3: What is the best way to copy arrays?

**A:** \`Arrays.copyOf\` and \`System.arraycopy\` are standard. Prefer \`Arrays.copyOf\` for readability.

### Q4: Which is better: sort or parallelSort?

**A:** \`parallelSort\` can be faster for very large arrays; for small/medium arrays, \`sort\` is usually better.

### Q5: How do I convert an int[] to a List?

**A:** Primitive arrays don’t work with \`Arrays.asList\` like you expect. Convert manually or use streams.

---

## Conclusion

The \`java.util.Arrays\` class is a must-know utility for writing clean and efficient Java code. Mastering these methods reduces bugs and improves performance in everyday development.

### Next steps
- Practice [Single Dimensional Array](/corejava/single-dimensional-array)
- Learn [Multi-Dimensional Array](/corejava/multi-dimensional-array)
- Learn [Collections](/corejava/collection-introduction) for dynamic structures
  
---

## 10 Important Arrays Class Utilities Interview Questions

### 1. What does \`java.util.Arrays\` provide?
**Answer:** Static helpers: sort, binarySearch, fill, copyOf, equals, hashCode, stream, parallel operations, etc.
Prefer these over hand-rolled loops for correctness.

### 2. What is the difference between \`Arrays.sort\` for primitives vs objects?
**Answer:** Primitives use dual-pivot quicksort/tuning; objects require \`Comparable\` or \`Comparator\` and may use TimSort—stable.
Null elements in object arrays require comparator handling.

### 3. When does \`binarySearch\` return a negative value?
**Answer:** If key not found, returns \`-(insertion point) - 1\`—useful to find insertion index.
Array must be sorted first or results are meaningless.

### 4. What does \`Arrays.asList\` return?
**Answer:** A fixed-size list backed by the array—structural changes that resize throw; element set still affects array.
Wrapping, not copying.

### 5. Scenario: you need immutable snapshot of an array for an API—what’s wrong with exposing \`Arrays.asList\` backing array?
**Answer:** Callers can still mutate underlying array elements—copy defensively if needed.
Immutability requires unmodifiable wrappers plus array clone for references.

### 6. What is \`parallelSort\` good for?
**Answer:** Large primitive arrays where fork/join overhead pays off; small arrays may be slower than \`sort\`.
Measure on target hardware.

### 7. How does \`Arrays.deepEquals\` differ from \`equals\` on arrays?
**Answer:** \`equals\` on arrays compares references; \`deepEquals\` walks nested structure.
Important in tests comparing 2D arrays.

### 8. What is \`Arrays.setAll\` / \`parallelSetAll\`?
**Answer:** Initialize elements by index with lambdas—concise for computed tables.
Useful for benchmarks and functional-style setup.

### 9. Can \`sort\` throw \`ClassCastException\`?
**Answer:** If elements aren’t mutually comparable and comparator not provided—mixed incompatible types.
Validate types before sort.

### 10. What’s a pitfall with \`hashCode\` on arrays?
**Answer:** Default array \`hashCode\` is identity-based—use \`Arrays.hashCode\` or \`Arrays.deepHashCode\` for content-based hashing.
Impacts hash maps keyed on array content incorrectly.

---

## Deep Theory: Arrays Utility Design in Java

The Arrays class exists to standardize high-frequency operations on contiguous memory structures. It prevents ad-hoc loop logic from becoming a source of subtle correctness and performance bugs.

### Core Theoretical Idea

Primitive arrays are low-level data structures with no behavior attached. Arrays adds algorithmic behavior around them:

- ordering behavior (sort, parallelSort),
- lookup behavior (binarySearch),
- equality and hashing semantics,
- transformation and copying semantics.

This makes array code deterministic and testable across teams.

### Algorithmic Perspective

- Sorting gives canonical order representation.
- Binary search assumes sorted order and trades preprocessing cost for fast repeated lookups.
- Copy operations enforce boundary-safe memory slices.

From theory, many array operations are about preserving invariants: sortedness, length, index safety, and value identity.

### Why This Matters in Production

Manual loops often mix business logic with index management. Arrays utilities isolate index mechanics so business logic stays expressive.

### Practical Trade-off

Arrays APIs increase correctness and readability, but developers must understand preconditions (for example, binarySearch on unsorted data gives invalid meaning). Theory first, then API usage.

`,
  code: `import java.util.Arrays;

public class ArrayMethodsDemo {
    public static void main(String[] args) {
        System.out.println("=== Arrays Class Methods ===\\n");
        
        int[] arr = {5, 2, 8, 1, 9, 3};
        System.out.println("Original: " + Arrays.toString(arr));
        
        // Sort
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        System.out.println("Sorted: " + Arrays.toString(sorted));
        
        // Binary Search (on sorted array)
        int index = Arrays.binarySearch(sorted, 5);
        System.out.println("Index of 5: " + index);
        
        // Fill
        int[] filled = new int[5];
        Arrays.fill(filled, 7);
        System.out.println("Filled: " + Arrays.toString(filled));
        
        // Copy
        int[] copy = Arrays.copyOf(arr, 10);
        System.out.println("Copy (extended): " + Arrays.toString(copy));
        
        // Copy range
        int[] range = Arrays.copyOfRange(arr, 1, 4);
        System.out.println("Copy range [1,4): " + Arrays.toString(range));
        
        // Equals
        int[] arr2 = {5, 2, 8, 1, 9, 3};
        System.out.println("Arrays equal: " + Arrays.equals(arr, arr2));
        
        // Parallel sort (for large arrays)
        int[] large = new int[1000];
        for (int i = 0; i < large.length; i++) {
            large[i] = (int)(Math.random() * 1000);
        }
        Arrays.parallelSort(large);
        System.out.println("Parallel sorted (first 10): " + 
            Arrays.toString(Arrays.copyOf(large, 10)));
    }
}`,
  practiceQuestions: [
    {
      question: "Use Arrays methods to sort, search, and copy an array",
      hint: "Use Arrays.sort(), Arrays.binarySearch(), Arrays.copyOf()",
      starterCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 78, 34, 89, 23};
        
        // Sort the array
        
        // Search for 34
        
        // Copy first 3 elements
        
    }
}`
    }
  ]
};

export default arrayMethods;





