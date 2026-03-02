const singleDimensionalArray = {
  id: "single-dimensional-array",
  title: "Single Dimensional Array",
  description: "Learn operations on single dimensional arrays",
  content: `# Single Dimensional Array in Java (1D Array)

A **single dimensional array (1D array)** is a linear collection of elements of the **same data type**, stored in **contiguous memory** and accessed using a **0-based index**. Arrays are one of the most important data structures in Java because they appear everywhere: processing marks, storing sensor readings, handling weekly sales numbers, building buffers, and even implementing other structures like stacks and queues.

---

## What is a 1D Array?

A 1D array represents a straight list of values:

- **Fixed size**: the length is decided at creation time
- **Same type**: all elements are of one type (int, double, String, etc.)
- **Fast index access**: $O(1)$ access using index
- **Contiguous memory**: elements are placed next to each other in memory (conceptually)

---

## Array Memory Diagram (Conceptual)

\`\`\`
int[] arr = {64, 34, 25, 12, 22};

Index:      0      1      2      3      4
          +------+------+------+------+------+
Value:    |  64  |  34  |  25  |  12  |  22  |
          +------+------+------+------+------+
\`\`\`

**Why this matters:**\n
- Traversal becomes simple and fast\n
- Random access is efficient\n
- Insert/delete in the middle is expensive (requires shifting)

---

## Declaration and Initialization

\`\`\`java
// Declaration
int[] numbers;

// Initialization with size (default values: 0 for int)
numbers = new int[5];

// Initialization with values
int[] marks = {90, 76, 88, 95};

// Initialization using new with values
int[] primes = new int[] {2, 3, 5, 7, 11};
\`\`\`

---

## Common Operations (With Time Complexity)

| Operation | Example | Complexity |
|---|---|---:|
| Access by index | \`arr[i]\` | $O(1)$ |
| Update by index | \`arr[i] = x\` | $O(1)$ |
| Traversal | loop through all elements | $O(n)$ |
| Search (linear) | find a value | $O(n)$ |
| Insert at end (fixed array) | not possible without new array | $O(n)$ |
| Insert/delete at index | shift elements | $O(n)$ |
| Sort | \`Arrays.sort(arr)\` | $O(n log n)$ |

---

## Real-World Use Cases (Where 1D Arrays Are Used)

### Use Case 1: Student Marks / Attendance Tracking

- An exam system stores marks of students in a class.
- A school stores attendance of each day as 0/1 values.

\`\`\`java
int[] marks = {78, 91, 66, 84, 99};
int[] attendance = {1, 1, 0, 1, 1}; // 1 = present, 0 = absent
\`\`\`

### Use Case 2: Daily Sales / Traffic Analytics

- A shop stores daily revenue for last 30 days
- A website stores daily visitors count

\`\`\`java
int[] visitors = {120, 180, 150, 200, 170, 220, 190};
\`\`\`

### Use Case 3: Sensor Readings / IoT Data

- Temperature readings every minute
- Power usage readings for a device

\`\`\`java
double[] temperatures = {31.2, 31.1, 31.4, 31.8, 32.0};
\`\`\`

---

## Code Example: Core Operations on a 1D Array

### 1) Traversal

\`\`\`java
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}
\`\`\`

### 2) Reverse an Array (In-Place)

\`\`\`java
int left = 0, right = arr.length - 1;
while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
}
\`\`\`

**Explanation:**
- Swap first and last
- Move pointers toward the center
- This reverses without extra array

### 3) Linear Search

\`\`\`java
int target = 25;
int index = -1;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        index = i;
        break;
    }
}
\`\`\`

---

## Comparison Table: Array vs ArrayList

| Feature | Array | ArrayList |
|---|---|---|
| Size | Fixed | Dynamic |
| Stores | Primitives + Objects | Objects only (wrappers for primitives) |
| Access by index | Fast | Fast |
| Insert/Delete | Costly (shift) | Easier (but still may shift) |
| Best for | Fixed-size data, performance | Flexible collections |

For dynamic collections, learn [Java Collections Framework](/tutorial/collection-introduction).

---

## Common Mistakes (And How to Avoid Them)

### 1) ArrayIndexOutOfBoundsException

**Cause:** accessing invalid index

\`\`\`java
int[] a = new int[3];
System.out.println(a[3]); // invalid: max index is 2
\`\`\`

**Fix:** always keep loop within \`0\` to \`length - 1\`

### 2) Confusing length

Arrays use \`arr.length\` (field), not \`arr.length()\`.

---

## FAQs (Single Dimensional Arrays)

### Q1: Why are arrays 0-indexed in Java?

**A:** 0-indexing maps naturally to memory offsets. Index 0 points to the first element; index i is base address + i * elementSize.

### Q2: Can an array size change after creation?

**A:** No. Arrays are fixed-size. To “resize”, you create a new array and copy elements (or use ArrayList).

### Q3: When should I prefer arrays over collections?

**A:** Use arrays when size is fixed and performance matters (buffers, fixed datasets, low-level algorithms). Use collections when you need frequent insert/delete or dynamic size.

### Q4: What is the fastest way to sort an array in Java?

**A:** Use \`Arrays.sort()\` which uses optimized algorithms depending on type. For primitives it is highly optimized.

### Q5: How do I copy an array safely?

**A:** Use \`Arrays.copyOf\`, \`Arrays.copyOfRange\`, or \`System.arraycopy\`.\n
Learn more in [Array Methods](/tutorial/array-methods).

### Q6: How to find the max/min in an array?

**A:** Traverse once, track max/min. Complexity is $O(n)$.

---

## Conclusion

A single dimensional array is a **core building block** for Java programming. When you understand indexing, traversal, searching, and reversing, you can implement many algorithms and data structures efficiently.

### Next steps
- Learn [Multi-Dimensional Arrays](/tutorial/multi-dimensional-array) for matrices
- Learn [Array Methods](/tutorial/array-methods) for \`Arrays.sort\`, \`copyOf\`, \`binarySearch\`
- Learn [Exception Handling](/tutorial/exception-introduction) to handle array errors safely
  `,
  code: `import java.util.Arrays;

public class SingleDimensionalArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Single Dimensional Array ===\\n");
        
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(arr));
        
        // Find max and min
        int max = arr[0], min = arr[0];
        for (int num : arr) {
            if (num > max) max = num;
            if (num < min) min = num;
        }
        System.out.println("Max: " + max + ", Min: " + min);
        
        // Reverse array
        System.out.println("\\n--- Reverse Array ---");
        int[] reversed = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            reversed[i] = arr[arr.length - 1 - i];
        }
        System.out.println("Reversed: " + Arrays.toString(reversed));
        
        // Linear search
        System.out.println("\\n--- Linear Search ---");
        int searchFor = 25;
        int foundAt = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == searchFor) {
                foundAt = i;
                break;
            }
        }
        System.out.println(searchFor + " found at index: " + foundAt);
        
        // Sorting (Bubble Sort)
        System.out.println("\\n--- Bubble Sort ---");
        int[] sortArr = arr.clone();
        for (int i = 0; i < sortArr.length - 1; i++) {
            for (int j = 0; j < sortArr.length - i - 1; j++) {
                if (sortArr[j] > sortArr[j + 1]) {
                    int temp = sortArr[j];
                    sortArr[j] = sortArr[j + 1];
                    sortArr[j + 1] = temp;
                }
            }
        }
        System.out.println("Sorted: " + Arrays.toString(sortArr));
        
        // Copy array
        System.out.println("\\n--- Copy Array ---");
        int[] copy = Arrays.copyOf(arr, arr.length);
        System.out.println("Copy: " + Arrays.toString(copy));
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to reverse an array without using extra array",
      hint: "Swap elements from start and end moving towards center",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        
        // Reverse in place
        
    }
}`
    }
  ]
};

export default singleDimensionalArray;





