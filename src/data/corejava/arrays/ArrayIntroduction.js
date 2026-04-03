const arrayIntroduction = {
  id: 'array-introduction',
  title: 'Introduction to Arrays',
  description: 'Learn about arrays in Java and how to use them effectively',
  content: `
# Introduction to Arrays in Java

An array is a container object that holds a fixed number of values of a single type. Arrays are fundamental data structures used to store collections of elements.

## What is an Array?

- **Fixed Size**: Size is determined at creation
- **Homogeneous**: All elements must be same type
- **Indexed**: Elements accessed by index (0-based)
- **Contiguous Memory**: Elements stored sequentially

## Array Declaration and Initialization

\`\`\`java
// Declaration
int[] numbers;        // Preferred
int numbers[];        // Also valid

// Initialization
int[] numbers = new int[5];           // Size 5, default values (0)
int[] numbers = {1, 2, 3, 4, 5};      // With values
int[] numbers = new int[]{1, 2, 3};   // Anonymous array
\`\`\`

## Array Memory Representation

\`\`\`
int[] arr = {10, 20, 30, 40, 50};

Index:    [0]   [1]   [2]   [3]   [4]
         ┌─────┬─────┬─────┬─────┬─────┐
Values:  │ 10  │ 20  │ 30  │ 40  │ 50  │
         └─────┴─────┴─────┴─────┴─────┘
Address: 1000  1004  1008  1012  1016  (4 bytes each for int)
\`\`\`

## 🏢 Real-Time Project Example: E-Commerce Product Ratings

\`\`\`java
// Real-Time: Product Rating System
// Used in Amazon, Flipkart for product reviews

public class ProductRatingSystem {
    public static void main(String[] args) {
        System.out.println("⭐ PRODUCT RATING SYSTEM");
        System.out.println("=========================");
        
        // Product ratings array
        System.out.println("\\n📦 Product: iPhone 15 Pro");
        System.out.println("─".repeat(50));
        
        // Store ratings (1-5 stars)
        int[] ratings = {5, 4, 5, 3, 5, 4, 4, 5, 2, 5};
        
        System.out.println("\\n📊 Ratings Array:");
        System.out.print("   ratings = [");
        for (int i = 0; i < ratings.length; i++) {
            System.out.print(ratings[i] + (i < ratings.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println("   Length: " + ratings.length + " reviews");
        
        // Calculate statistics
        int sum = 0;
        int max = ratings[0];
        int min = ratings[0];
        int[] starCount = new int[6]; // Index 1-5 for stars
        
        for (int rating : ratings) {
            sum += rating;
            if (rating > max) max = rating;
            if (rating < min) min = rating;
            starCount[rating]++;
        }
        
        double average = (double) sum / ratings.length;
        
        System.out.println("\\n📈 Rating Statistics:");
        System.out.println("   Total Reviews: " + ratings.length);
        System.out.println("   Average Rating: " + String.format("%.1f", average) + " ⭐");
        System.out.println("   Highest: " + max + " ⭐");
        System.out.println("   Lowest: " + min + " ⭐");
        
        System.out.println("\\n📊 Rating Distribution:");
        for (int i = 5; i >= 1; i--) {
            String stars = "⭐".repeat(i);
            String bar = "█".repeat(starCount[i] * 3);
            System.out.println("   " + i + " " + stars + " " + bar + " (" + starCount[i] + ")");
        }
        
        // Array operations
        System.out.println("\\n🔧 ARRAY OPERATIONS:");
        System.out.println("─".repeat(50));
        System.out.println("   ratings[0]         → " + ratings[0] + " (first rating)");
        System.out.println("   ratings[9]         → " + ratings[9] + " (last rating)");
        System.out.println("   ratings.length     → " + ratings.length);
        System.out.println("   ratings[5] = 3     → Update 6th rating to 3");
    }
}
\`\`\`

## 🏦 Real-Time Project Example: Banking Transaction History

\`\`\`java
// Real-Time: Transaction History using Arrays
// Used in banking applications

public class TransactionHistory {
    public static void main(String[] args) {
        System.out.println("🏦 TRANSACTION HISTORY");
        System.out.println("=======================");
        
        // Transaction amounts (positive = credit, negative = debit)
        double[] transactions = {5000.00, -200.00, -1500.00, 100.00, -50.00, 3000.00, -800.00};
        String[] descriptions = {"Salary", "ATM", "Bill Pay", "Cashback", "Coffee", "Bonus", "Shopping"};
        
        System.out.println("\\n📋 Account: ****1234");
        System.out.println("─".repeat(50));
        
        // Display transactions
        System.out.println("\\n📊 Recent Transactions:");
        System.out.println("┌────┬─────────────┬────────────┬─────────────┐");
        System.out.println("│ #  │ Type        │ Amount     │ Description │");
        System.out.println("├────┼─────────────┼────────────┼─────────────┤");
        
        double balance = 10000.00; // Starting balance
        double totalCredits = 0;
        double totalDebits = 0;
        
        for (int i = 0; i < transactions.length; i++) {
            String type = transactions[i] >= 0 ? "CREDIT" : "DEBIT";
            String sign = transactions[i] >= 0 ? "+" : "";
            
            if (transactions[i] >= 0) {
                totalCredits += transactions[i];
            } else {
                totalDebits += Math.abs(transactions[i]);
            }
            
            balance += transactions[i];
            
            System.out.printf("│ %d  │ %-11s │ %s$%-8.2f │ %-11s │%n", 
                i, type, sign, Math.abs(transactions[i]), descriptions[i]);
        }
        
        System.out.println("└────┴─────────────┴────────────┴─────────────┘");
        
        System.out.println("\\n📈 Summary:");
        System.out.println("   Total Credits: +$" + totalCredits);
        System.out.println("   Total Debits:  -$" + totalDebits);
        System.out.println("   Net Change:    $" + (totalCredits - totalDebits));
        System.out.println("   Final Balance: $" + balance);
        
        // Array benefits
        System.out.println("\\nWhy Arrays for Transactions:");
        System.out.println("   • Fast access by index O(1)");
        System.out.println("   • Efficient iteration");
        System.out.println("   • Memory efficient for fixed data");
        System.out.println("   • Easy to calculate statistics");
    }
}
\`\`\`

## 📊 Real-Time Project Example: Student Grade Management

\`\`\`java
// Real-Time: Grade Management System
// Used in school/college management systems

public class GradeManagement {
    public static void main(String[] args) {
        System.out.println("📚 STUDENT GRADE MANAGEMENT");
        System.out.println("============================");
        
        // Student grades in different subjects
        String[] subjects = {"Math", "Science", "English", "History", "Computer"};
        int[] marks = {85, 92, 78, 88, 95};
        int[] maxMarks = {100, 100, 100, 100, 100};
        
        System.out.println("\\n👤 Student: Dattu p");
        System.out.println("📋 Class: 10th Grade");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n📊 Subject-wise Performance:");
        System.out.println("┌─────────────┬────────┬──────────┬────────┐");
        System.out.println("│ Subject     │ Marks  │ Max      │ Grade  │");
        System.out.println("├─────────────┼────────┼──────────┼────────┤");
        
        int totalMarks = 0;
        int totalMax = 0;
        
        for (int i = 0; i < subjects.length; i++) {
            totalMarks += marks[i];
            totalMax += maxMarks[i];
            
            String grade;
            if (marks[i] >= 90) grade = "A+";
            else if (marks[i] >= 80) grade = "A";
            else if (marks[i] >= 70) grade = "B";
            else if (marks[i] >= 60) grade = "C";
            else grade = "D";
            
            System.out.printf("│ %-11s │ %3d    │ %3d      │ %-6s │%n",
                subjects[i], marks[i], maxMarks[i], grade);
        }
        
        System.out.println("└─────────────┴────────┴──────────┴────────┘");
        
        double percentage = (double) totalMarks / totalMax * 100;
        System.out.println("\\n📈 Overall Performance:");
        System.out.println("   Total: " + totalMarks + "/" + totalMax);
        System.out.println("   Percentage: " + String.format("%.2f", percentage) + "%");
        System.out.println("   Result: " + (percentage >= 40 ? "PASS" : "FAIL"));
    }
}
\`\`\`

## Array Properties

| Property | Description |
|----------|-------------|
| length | Number of elements (not a method!) |
| Index | 0 to length-1 |
| Default values | 0 (int), 0.0 (double), null (objects), false (boolean) |
| Immutable size | Cannot change after creation |

## Common Array Operations

| Operation | Time Complexity |
|-----------|-----------------|
| Access by index | O(1) |
| Search (unsorted) | O(n) |
| Search (sorted) | O(log n) with binary search |
| Insert/Delete | O(n) - need to shift elements |
| Iteration | O(n) |

> **Industry Insight**: Arrays are used extensively in data processing. Netflix uses arrays for storing user watch history. Amazon uses arrays for product recommendations. Financial systems use arrays for storing stock prices and calculating moving averages.

---

## Test Your Knowledge

Mastered Arrays? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering Arrays, single-dimensional, multi-dimensional, and all Core Java topics!

---

## 10 Important Arrays (Introduction) Interview Questions

### 1. What is an array in Java?
**Answer:** A fixed-length, ordered container of elements of the same type, indexed from \`0\` to \`length-1\`, stored contiguously for fast access.
Length is set at creation and cannot grow.

### 2. What is the default value for array elements?
**Answer:** Numeric types default to zero, \`boolean\` to false, reference types to \`null\`.
Local array variables themselves must be assigned before use.

### 3. How do you get array length—method or field?
**Answer:** \`array.length\` is a field, not a method—common gotcha vs \`String.length()\`.
No parentheses for arrays.

### 4. What is \`ArrayIndexOutOfBoundsException\`?
**Answer:** Thrown when index is negative or \`>= length\`; indicates bounds check failure.
Always validate external input indices.

### 5. Are arrays objects in Java?
**Answer:** Yes—arrays extend \`Object\`, can be \`null\`, and are heap allocated.
They’re covariant (typing pitfall with arrays of subtypes).

### 6. What is array covariance?
**Answer:** \`String[]\` is a subtype of \`Object[]\`, which allows \`ArrayStoreException\` at runtime if you insert wrong reified types.
Prefer \`List\` with generics for safer APIs.

### 7. Scenario: API returns byte[]—what concerns appear?
**Answer:** Mutability—callers might alter backing arrays; consider defensive copies for security-sensitive data.
Also watch large allocations on heap.

### 8. How do arrays compare to \`ArrayList\`?
**Answer:** Arrays fixed-size and faster for primitive-heavy tight loops; \`ArrayList\` resizable with boxing cost for primitives unless specialized libraries used.
Choose based on sizing uncertainty and API needs.

### 9. Can you resize an array?
**Answer:** No—create a new array and copy; \`Arrays.copyOf\` helps.
That’s why dynamic collections exist.

### 10. What is a typical time complexity for index access?
**Answer:** O(1) random access by index.
Insertion/deletion in the middle requires shifting—O(n).

`,
  code: `// Real-Time: Complete Array Operations Demo
// E-Commerce inventory management

public class ArrayOperationsDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    📦 ARRAY OPERATIONS DEMONSTRATION           ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: Array Declaration & Initialization
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 1: DECLARATION & INITIALIZATION");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Method 1: Declare then initialize");
        System.out.println("int[] prices;");
        System.out.println("prices = new int[5];");
        
        System.out.println("\\n// Method 2: Declare and initialize");
        System.out.println("int[] prices = new int[5];");
        
        System.out.println("\\n// Method 3: With values");
        System.out.println("int[] prices = {999, 1299, 799, 599, 1499};");
        
        System.out.println("\\n// Method 4: Anonymous array");
        System.out.println("int[] prices = new int[]{999, 1299, 799};");
        
        // ═══════════════════════════════════════════════════
        // PART 2: E-Commerce Inventory
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🛒 PART 2: E-COMMERCE INVENTORY");
        System.out.println("═".repeat(50));
        
        // Product data
        String[] products = {"iPhone 15", "Samsung S24", "Pixel 8", "OnePlus 12", "Xiaomi 14"};
        double[] prices = {999.99, 899.99, 699.99, 799.99, 599.99};
        int[] stock = {50, 30, 45, 60, 100};
        
        System.out.println("\\n📋 Inventory Data:");
        System.out.println("┌────┬─────────────┬───────────┬────────┐");
        System.out.println("│ ID │ Product     │ Price     │ Stock  │");
        System.out.println("├────┼─────────────┼───────────┼────────┤");
        
        for (int i = 0; i < products.length; i++) {
            System.out.printf("│ %d  │ %-11s │ $%-8.2f │ %4d   │%n",
                i, products[i], prices[i], stock[i]);
        }
        System.out.println("└────┴─────────────┴───────────┴────────┘");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Array Operations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔧 PART 3: ARRAY OPERATIONS");
        System.out.println("═".repeat(50));
        
        // Access
        System.out.println("\\n[ACCESS]");
        System.out.println("   products[0]     → " + products[0]);
        System.out.println("   prices[2]       → $" + prices[2]);
        System.out.println("   stock.length    → " + stock.length);
        
        // Modify
        System.out.println("\\n[MODIFY]");
        System.out.println("   stock[0] = 45;  // Update iPhone stock");
        stock[0] = 45;
        System.out.println("   New stock[0]    → " + stock[0]);
        
        // Calculate
        System.out.println("\\n[CALCULATE]");
        double totalValue = 0;
        int totalStock = 0;
        double maxPrice = prices[0];
        double minPrice = prices[0];
        
        for (int i = 0; i < products.length; i++) {
            totalValue += prices[i] * stock[i];
            totalStock += stock[i];
            if (prices[i] > maxPrice) maxPrice = prices[i];
            if (prices[i] < minPrice) minPrice = prices[i];
        }
        
        System.out.println("   Total Stock:    " + totalStock + " units");
        System.out.println("   Total Value:    $" + String.format("%,.2f", totalValue));
        System.out.println("   Highest Price:  $" + maxPrice);
        System.out.println("   Lowest Price:   $" + minPrice);
        System.out.println("   Average Price:  $" + String.format("%.2f", 
            (maxPrice + minPrice + prices[1] + prices[2] + prices[3]) / 5));
        
        // ═══════════════════════════════════════════════════
        // PART 4: Iteration Methods
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔄 PART 4: ITERATION METHODS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Method 1: Traditional for loop");
        System.out.println("for (int i = 0; i < products.length; i++) {");
        System.out.println("    System.out.println(products[i]);");
        System.out.println("}");
        
        System.out.println("\\n// Method 2: Enhanced for-each loop");
        System.out.println("for (String product : products) {");
        System.out.println("    System.out.println(product);");
        System.out.println("}");
        
        System.out.println("\\n// Method 3: While loop");
        System.out.println("int i = 0;");
        System.out.println("while (i < products.length) {");
        System.out.println("    System.out.println(products[i++]);");
        System.out.println("}");
        
        // ═══════════════════════════════════════════════════
        // PART 5: Search Operations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔍 PART 5: SEARCH OPERATIONS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Linear Search");
        String searchProduct = "Pixel 8";
        int foundIndex = -1;
        
        for (int i = 0; i < products.length; i++) {
            if (products[i].equals(searchProduct)) {
                foundIndex = i;
                break;
            }
        }
        
        System.out.println("   Searching for: " + searchProduct);
        System.out.println("   Found at index: " + foundIndex);
        System.out.println("   Price: $" + prices[foundIndex]);
        System.out.println("   Stock: " + stock[foundIndex]);
        
        // ═══════════════════════════════════════════════════
        // PART 6: Common Pitfalls
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("⚠️ PART 6: COMMON PITFALLS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nArrayIndexOutOfBoundsException:");
        System.out.println("   int[] arr = new int[5];");
        System.out.println("   arr[5] = 10; // ERROR! Valid indices: 0-4");
        
        System.out.println("\\nNullPointerException:");
        System.out.println("   int[] arr = null;");
        System.out.println("   arr[0] = 10; // ERROR! Array not initialized");
        
        System.out.println("\\nSafe Access:");
        System.out.println("   if (index >= 0 && index < arr.length) {");
        System.out.println("       value = arr[index];");
        System.out.println("   }");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 ARRAY SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Operation      | Syntax              | Complexity |");
        System.out.println("|----------------|---------------------|------------|");
        System.out.println("| Declare        | int[] arr;          | -          |");
        System.out.println("| Initialize     | arr = new int[n];   | O(n)       |");
        System.out.println("| Access         | arr[i]              | O(1)       |");
        System.out.println("| Modify         | arr[i] = value;     | O(1)       |");
        System.out.println("| Length         | arr.length          | O(1)       |");
        System.out.println("| Search         | Linear search       | O(n)       |");
        System.out.println("| Iterate        | for/for-each        | O(n)       |");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Movie Rating System that stores and analyzes movie ratings',
      hint: 'Use arrays for movie names and ratings, calculate average, find highest/lowest rated',
      starterCode: `public class MovieRatingSystem {
    public static void main(String[] args) {
        // Create arrays for movie names and ratings
        // Display all movies with ratings
        // Calculate average rating
        // Find highest and lowest rated movies
        // Count movies above average
    }
}`
    }
  ]
};

export default arrayIntroduction;
