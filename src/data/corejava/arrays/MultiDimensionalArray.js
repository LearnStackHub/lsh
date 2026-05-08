const multiDimensionalArray = {
  id: "multi-dimensional-array",
  title: "Multi-Dimensional Array",
  description: "Learn about 2D arrays and matrices in Java",
  content: `# Multi-Dimensional Arrays in Java (2D Arrays and Matrices)

A **multi-dimensional array** in Java is an **array of arrays**. The most commonly used form is the **2D array**, which is often treated as a **matrix** (rows and columns). 2D arrays are used for tabular data, grids, image-like data, and many real-world problems such as seating charts, leaderboard tables, and mathematical computations.

---

## What is a 2D Array?

A 2D array is a collection of rows, where each row itself is a 1D array.

\`\`\`java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

**Important understanding:** A 2D array is not a single flat block of values in Java. It is an array holding references to row arrays.

---

## 2D Array Diagram (Matrix View)

\`\`\`
matrix (3x3)

          Col 0   Col 1   Col 2
        +------+------+------+
Row 0   |  1   |  2   |  3   |
        +------+------+------+
Row 1   |  4   |  5   |  6   |
        +------+------+------+
Row 2   |  7   |  8   |  9   |
        +------+------+------+
\`\`\`

---

## Declaration and Initialization

### 1) Declaration with fixed size

\`\`\`java
int[][] grid = new int[3][4]; // 3 rows, 4 columns (default values are 0)
\`\`\`

### 2) Initialization with values

\`\`\`java
int[][] grid = {
    {10, 20, 30, 40},
    {50, 60, 70, 80},
    {90, 100, 110, 120}
};
\`\`\`

### 3) Jagged arrays (rows of different sizes)

\`\`\`java
int[][] jagged = {
    {1, 2},
    {3, 4, 5},
    {6}
};
\`\`\`

**Use jagged arrays when:** each row naturally has different length (example: students per class section).

---

## Real-World Use Cases (Where 2D Arrays Are Used)

### Use Case 1: Classroom Seating / Exam Hall Arrangement

Each row represents a bench row; each column represents a seat number.

\`\`\`java
int[][] seats = new int[5][6]; // 5 rows, 6 seats per row
\`\`\`

### Use Case 2: Monthly Sales Table (Rows = Products, Columns = Weeks)

\`\`\`java
int[][] sales = {
    {1200, 1350, 1100, 1600}, // Product A weekly sales
    {900,  950,  1000, 1050}  // Product B weekly sales
};
\`\`\`

### Use Case 3: Game Grid (Tic-Tac-Toe, Chess, Sudoku)

\`\`\`java
char[][] board = new char[3][3];
\`\`\`

### Use Case 4: Image-Like Data / Pixel Matrix

An image can be represented as a 2D matrix of pixel intensities (simplified).

---

## Common Operations with 2D Arrays

### 1) Traversal (Row-wise)

\`\`\`java
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
\`\`\`

**Explanation:**\n
- Outer loop goes over rows\n
- Inner loop goes over columns in each row\n

### 2) Sum of all elements

\`\`\`java
int sum = 0;
for (int[] row : matrix) {
    for (int value : row) {
        sum += value;
    }
}
\`\`\`

### 3) Transpose of a matrix

Transpose converts rows into columns:

\`\`\`
Original (2x3):          Transpose (3x2):
1 2 3                    1 4
4 5 6                    2 5
                         3 6
\`\`\`

\`\`\`java
int rows = matrix.length;
int cols = matrix[0].length;
int[][] t = new int[cols][rows];
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        t[j][i] = matrix[i][j];
    }
}
\`\`\`

### 4) Diagonal sum (square matrix only)

\`\`\`java
int diag = 0;
for (int i = 0; i < matrix.length; i++) {
    diag += matrix[i][i];
}
\`\`\`

---

## Comparison Table: 1D vs 2D vs Jagged Arrays

| Type | Example | Structure | Best for |
|---|---|---|---|
| 1D Array | \`int[] a\` | Single list | linear data |
| 2D Array | \`int[][] m\` | rows x cols | tables, grids |
| Jagged | \`int[][] j\` | rows with variable cols | uneven row sizes |

---

## Common Mistakes and Fixes

### 1) Using wrong dimensions

\`\`\`java
int rows = matrix.length;
int cols = matrix[0].length; // safe only if at least one row exists
\`\`\`

**Fix:** ensure matrix has at least one row, and handle jagged rows carefully.

### 2) NullPointerException in jagged arrays

\`\`\`java
int[][] m = new int[3][];
m[0] = new int[2];
// m[1] is null until assigned -> accessing m[1].length throws NPE
\`\`\`

---

## FAQs (Multi-Dimensional Arrays)

### Q1: Are 2D arrays stored as a single contiguous block in Java?

**A:** Not exactly. Java represents a 2D array as an array of row references. Each row is its own array object.

### Q2: What is a jagged array, and when is it useful?

**A:** A jagged array has rows of different lengths. It is useful when each row naturally needs different size (for example, class sections with different student counts).

### Q3: How do I safely get the number of columns?

**A:** For a rectangular matrix, use \`matrix[0].length\`. For jagged arrays, each row has its own length, so use \`matrix[i].length\` inside loops.

### Q4: Can a 2D array store objects like String?

**A:** Yes. Example: \`String[][] table\` for spreadsheet-like data.

### Q5: Where are 2D arrays used in real interviews?

**A:** Matrix traversal, spiral printing, transpose, searching in sorted matrix, and DP problems (grid paths).

---

## Conclusion

2D arrays are essential for representing **grid and table data** in Java. Once you understand traversal, transpose, diagonal operations, and jagged arrays, you can solve many real-world and interview problems efficiently.

### Next steps
- Practice [Single Dimensional Array](/corejava/single-dimensional-array)
- Learn [Array Methods](/corejava/array-methods) for common utilities
- Move to [Multithreading Introduction](/corejava/thread-introduction) after mastering core data structures
  
---

## 10 Important Multi-Dimensional Array Interview Questions

### 1. Are Java multidimensional arrays truly rectangular?
**Answer:** Arrays of arrays—each row can have different lengths (jagged arrays).
\`int[][]\` may have \`matrix[i].length\` vary per row.

### 2. How do you allocate a 3×4 int matrix?
**Answer:** \`int[][] m = new int[3][4];\` rectangular, or \`new int[3][]\` then assign each row.
Memory layout is row-major in the flattened view of each row.

### 3. What is the memory layout implication for iteration order?
**Answer:** Traversing row-major sequentially caches better than jumping columns in naive 2D storage.
Performance-sensitive matrix code aligns access patterns accordingly.

### 4. Scenario: image represented as pixel[][]—what pitfalls appear?
**Answer:** Jagged rows break assumptions; bounds checks per row; watch for \`NullPointerException\` if a row unset.
Validate rectangular inputs at boundaries.

### 5. How do you transpose a matrix?
**Answer:** Swap \`i\` and \`j\` with extra storage or in-place for square matrices with index tricks.
Rectangular transpose needs new array dimensions.

### 6. What is spiral order traversal?
**Answer:** Layer-by-layer from outside inward—four pointers or direction deltas.
Common interview question—test empty and single-cell matrices.

### 7. Can you pass \`int[][]\` to a method expecting varargs of arrays?
**Answer:** Not directly as varargs of ints—varargs are 1D array parameters; 2D arrays are separate type.
Know method signatures for APIs like image processing.

### 8. What exceptions arise with bad indices in 2D?
**Answer:** \`ArrayIndexOutOfBoundsException\` on either dimension; NPE if row array missing.
Defensive checks on untrusted input.

### 9. How does \`Arrays.deepEquals\` help?
**Answer:** Compares nested arrays by content, not reference—useful for testing 2D equality.
\`deepToString\` helps debug.

### 10. When might you flatten 2D to 1D?
**Answer:** Interop with native libraries, buffer APIs, or contiguous memory requirements.
Track mapping formulas between (row,col) and flat index.

`,
  code: `public class MultiDimensionalArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Multi-Dimensional Array ===\\n");
        
        // 2D Array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Print matrix
        System.out.println("--- Matrix ---");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        // Sum of all elements
        int sum = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                sum += val;
            }
        }
        System.out.println("Sum: " + sum);
        
        // Transpose
        System.out.println("\\n--- Transpose ---");
        int[][] transpose = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        for (int[] row : transpose) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
        
        // Jagged Array
        System.out.println("\\n--- Jagged Array ---");
        int[][] jagged = {
            {1, 2},
            {3, 4, 5},
            {6}
        };
        for (int[] row : jagged) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to multiply two matrices",
      hint: "Result[i][j] = sum of (A[i][k] * B[k][j]) for all k",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[][] A = {{1, 2}, {3, 4}};
        int[][] B = {{5, 6}, {7, 8}};
        
        // Multiply matrices
        
    }
}`
    }
  ]
};

export default multiDimensionalArray;





