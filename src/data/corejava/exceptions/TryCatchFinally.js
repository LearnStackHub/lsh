const tryCatchFinally = {
  id: 'try-catch-finally',
  title: 'Try-Catch-Finally',
  description: 'The core mechanism for handling exceptions',
  content: `
# Try-Catch-Finally — Handling Exceptions Gracefully

When something goes wrong in your code, you have two choices: let the program crash, or handle the problem gracefully. The try-catch-finally block is your tool for graceful handling.

---

## The Basic Structure

\`\`\`java
try {
    // Code that might throw an exception
} catch (ExceptionType e) {
    // Handle the exception
} finally {
    // Always runs (cleanup code)
}
\`\`\`

---

## How It Works

1. **try block** — Contains risky code that might throw an exception
2. **catch block** — Catches and handles specific exceptions
3. **finally block** — Always executes, regardless of exception (cleanup)

\`\`\`java
try {
    int result = 10 / 0;  // ArithmeticException!
    System.out.println("This won't print");
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("This always runs");
}
// Output:
// Cannot divide by zero!
// This always runs
\`\`\`

---

## Multiple Catch Blocks

You can catch different exception types:

\`\`\`java
try {
    String str = null;
    System.out.println(str.length());  // NullPointerException
} catch (NullPointerException e) {
    System.out.println("String is null!");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index out of bounds!");
} catch (Exception e) {
    System.out.println("Some other error: " + e.getMessage());
}
\`\`\`

**Order matters!** Catch specific exceptions first, then general ones.

\`\`\`java
// WRONG - won't compile
catch (Exception e) { }
catch (IOException e) { }  // Unreachable!

// CORRECT
catch (IOException e) { }
catch (Exception e) { }
\`\`\`

---

## Multi-Catch (Java 7+)

Handle multiple exceptions the same way:

\`\`\`java
try {
    // risky code
} catch (IOException | SQLException e) {
    System.out.println("IO or SQL error: " + e.getMessage());
}
\`\`\`

---

## The Finally Block

\`finally\` always executes — even if:
- No exception occurs
- An exception is caught
- An exception is not caught
- A return statement is in try/catch

\`\`\`java
public int getValue() {
    try {
        return 1;
    } finally {
        System.out.println("Finally runs!");
        // Don't return here - it overrides try's return
    }
}
// Output: Finally runs!
// Returns: 1
\`\`\`

**Use finally for cleanup:**
\`\`\`java
FileInputStream fis = null;
try {
    fis = new FileInputStream("file.txt");
    // read file
} catch (IOException e) {
    System.out.println("Error reading file");
} finally {
    if (fis != null) {
        try {
            fis.close();  // Always close resources!
        } catch (IOException e) {
            // ignore
        }
    }
}
\`\`\`

---

## Try-With-Resources (Java 7+)

A cleaner way to handle resources that need closing:

\`\`\`java
// Old way
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("file.txt"));
    String line = br.readLine();
} finally {
    if (br != null) br.close();
}

// New way - try-with-resources
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
}  // br.close() called automatically!
\`\`\`

Multiple resources:
\`\`\`java
try (
    FileInputStream fis = new FileInputStream("input.txt");
    FileOutputStream fos = new FileOutputStream("output.txt")
) {
    // use both streams
}  // Both closed automatically
\`\`\`

---

## Exception Information

The exception object contains useful information:

\`\`\`java
try {
    int[] arr = new int[5];
    arr[10] = 100;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Message: " + e.getMessage());
    System.out.println("Type: " + e.getClass().getName());
    e.printStackTrace();  // Full stack trace
}
\`\`\`

---

## Nested Try-Catch

You can nest try-catch blocks:

\`\`\`java
try {
    try {
        int result = 10 / 0;
    } catch (ArithmeticException e) {
        System.out.println("Inner catch: " + e.getMessage());
        throw e;  // Re-throw to outer
    }
} catch (ArithmeticException e) {
    System.out.println("Outer catch: " + e.getMessage());
}
\`\`\`

---

## Best Practices

### 1. Catch Specific Exceptions

\`\`\`java
// BAD - too broad
catch (Exception e) { }

// GOOD - specific
catch (FileNotFoundException e) { }
\`\`\`

### 2. Don't Swallow Exceptions

\`\`\`java
// BAD - hiding problems
catch (Exception e) {
    // do nothing
}

// GOOD - at least log it
catch (Exception e) {
    logger.error("Error occurred", e);
}
\`\`\`

### 3. Use Try-With-Resources

\`\`\`java
// GOOD
try (Connection conn = getConnection()) {
    // use connection
}
\`\`\`

### 4. Don't Use Exceptions for Flow Control

\`\`\`java
// BAD
try {
    int value = Integer.parseInt(str);
} catch (NumberFormatException e) {
    value = 0;  // Using exception for default value
}

// GOOD
if (str != null && str.matches("\\\\d+")) {
    value = Integer.parseInt(str);
} else {
    value = 0;
}
\`\`\`

---

## Real-World Example: File Processing

\`\`\`java
public List<String> readLines(String filename) {
    List<String> lines = new ArrayList<>();
    
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        while ((line = reader.readLine()) != null) {
            lines.add(line);
        }
    } catch (FileNotFoundException e) {
        System.err.println("File not found: " + filename);
    } catch (IOException e) {
        System.err.println("Error reading file: " + e.getMessage());
    }
    
    return lines;
}
\`\`\`

---

## 10 Important try-catch-finally Interview Questions

### 1. Does \`finally\` always run?
**Answer:** Almost always—even if \`try\` returns or throws—except JVM exit or infinite loop/thread death.
Don’t return values from \`finally\`—overrides try/catch returns confusingly.

### 2. What is try-with-resources?
**Answer:** Auto-closes \`AutoCloseable\` resources—preferred over manual \`finally\` closes—suppresses close exceptions properly.
Since Java 7.

### 3. Can you have try-with-resources without catch?
**Answer:** Yes—resources still close; exceptions propagate—often paired with \`throws\` on method.
Cleaner than verbose finally.

### 4. Scenario: closing JDBC Connection in finally—still needed with try-with-resources?
**Answer:** Try-with-resources handles it—ensure JDBC 4+ drivers implement \`AutoCloseable\`.
Legacy code may still show manual finally.

### 5. What exception do you catch first—specific or general?
**Answer:** Specific subclasses first—broader catches later—unreachable catch compile error if ordered wrong.
Reflects recoverability tiers.

### 6. What is exception translation?
**Answer:** Catch low-level exception, wrap in domain exception, rethrow—preserves cause chain via \`initCause\` or constructor.
Spring \`DataAccessException\` pattern.

### 7. Can \`finally\` block throw?
**Answer:** Yes—masks original exception from try—dangerous—keep finally minimal or catch within finally carefully.
Suppressed exceptions mitigate in try-with-resources.

### 8. What is multi-catch?
**Answer:** \`catch (IOException | SQLException e)\`—single handler for disjoint types—must not be subclasses of each other.
Reduces duplication.

### 9. How does return in try interact with finally?
**Answer:** Finally runs before return completes—finally’s return overrides try’s return value—avoid.
Tricky interview puzzle.

### 10. Why avoid empty catch blocks?
**Answer:** Swallows errors silently—logging at minimum—even if “impossible.”
Production incidents hide in empty catches.

`,
  code: `// Try-Catch-Finally Demo

import java.io.*;
import java.util.*;

public class TryCatchFinallyDemo {
    public static void main(String[] args) {
        System.out.println("=== Try-Catch-Finally Demo ===\\n");
        
        // 1. BASIC TRY-CATCH
        System.out.println("1. BASIC TRY-CATCH");
        System.out.println("   -----------------");
        
        try {
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Message: " + e.getMessage());
        }
        System.out.println();
        
        // 2. TRY-CATCH-FINALLY
        System.out.println("2. TRY-CATCH-FINALLY");
        System.out.println("   ------------------");
        
        try {
            System.out.println("   In try block");
            int[] arr = {1, 2, 3};
            System.out.println("   arr[5] = " + arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("   In catch block: Array index error");
        } finally {
            System.out.println("   In finally block (always runs)");
        }
        System.out.println();
        
        // 3. MULTIPLE CATCH BLOCKS
        System.out.println("3. MULTIPLE CATCH BLOCKS");
        System.out.println("   ----------------------");
        
        testMultipleCatch(null);
        testMultipleCatch("abc");
        testMultipleCatch("123");
        System.out.println();
        
        // 4. MULTI-CATCH (Java 7+)
        System.out.println("4. MULTI-CATCH (Java 7+)");
        System.out.println("   ----------------------");
        
        try {
            Random rand = new Random();
            if (rand.nextBoolean()) {
                throw new IllegalArgumentException("Bad argument");
            } else {
                throw new IllegalStateException("Bad state");
            }
        } catch (IllegalArgumentException | IllegalStateException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
        }
        System.out.println();
        
        // 5. FINALLY ALWAYS RUNS
        System.out.println("5. FINALLY ALWAYS RUNS");
        System.out.println("   --------------------");
        
        System.out.println("   Return value: " + testFinallyReturn());
        System.out.println();
        
        // 6. NESTED TRY-CATCH
        System.out.println("6. NESTED TRY-CATCH");
        System.out.println("   -----------------");
        
        try {
            System.out.println("   Outer try");
            try {
                System.out.println("   Inner try");
                throw new RuntimeException("Inner exception");
            } catch (RuntimeException e) {
                System.out.println("   Inner catch: " + e.getMessage());
                throw new RuntimeException("Re-thrown");
            } finally {
                System.out.println("   Inner finally");
            }
        } catch (RuntimeException e) {
            System.out.println("   Outer catch: " + e.getMessage());
        } finally {
            System.out.println("   Outer finally");
        }
        System.out.println();
        
        // 7. EXCEPTION INFORMATION
        System.out.println("7. EXCEPTION INFORMATION");
        System.out.println("   ----------------------");
        
        try {
            String str = null;
            str.length();
        } catch (NullPointerException e) {
            System.out.println("   Exception type: " + e.getClass().getName());
            System.out.println("   Message: " + e.getMessage());
            System.out.println("   Stack trace (first 3 lines):");
            StackTraceElement[] stack = e.getStackTrace();
            for (int i = 0; i < Math.min(3, stack.length); i++) {
                System.out.println("     " + stack[i]);
            }
        }
        System.out.println();
        
        // 8. REAL-WORLD EXAMPLE
        System.out.println("8. REAL-WORLD EXAMPLE - User Input Validation");
        System.out.println("   --------------------------------------------");
        
        String[] inputs = {"25", "abc", "150", "-5", "30"};
        for (String input : inputs) {
            int age = parseAge(input);
            System.out.println("   Input: '" + input + "' -> Age: " + age);
        }
    }
    
    // Multiple catch blocks example
    static void testMultipleCatch(String str) {
        try {
            int num = Integer.parseInt(str);
            System.out.println("   Parsed: " + num);
        } catch (NullPointerException e) {
            System.out.println("   String is null");
        } catch (NumberFormatException e) {
            System.out.println("   Not a valid number: " + str);
        }
    }
    
    // Finally with return
    static int testFinallyReturn() {
        try {
            System.out.println("   In try, about to return 1");
            return 1;
        } finally {
            System.out.println("   In finally (still runs!)");
        }
    }
    
    // Real-world validation
    static int parseAge(String input) {
        try {
            int age = Integer.parseInt(input);
            if (age < 0 || age > 120) {
                throw new IllegalArgumentException("Age out of range");
            }
            return age;
        } catch (NumberFormatException e) {
            return -1;  // Invalid format
        } catch (IllegalArgumentException e) {
            return -1;  // Out of range
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a safe calculator that handles all edge cases',
      hint: 'Handle division by zero, invalid input, and overflow',
      starterCode: `import java.util.*;

public class SafeCalculator {
    public static void main(String[] args) {
        System.out.println("=== Safe Calculator ===\\n");
        
        Calculator calc = new Calculator();
        
        // Test cases
        System.out.println("10 / 2 = " + calc.divide(10, 2));
        System.out.println("10 / 0 = " + calc.divide(10, 0));
        
        System.out.println("\\nparse('123') = " + calc.parseNumber("123"));
        System.out.println("parse('abc') = " + calc.parseNumber("abc"));
        System.out.println("parse(null) = " + calc.parseNumber(null));
        
        System.out.println("\\nsqrt(16) = " + calc.squareRoot(16));
        System.out.println("sqrt(-4) = " + calc.squareRoot(-4));
        
        System.out.println("\\nArray access tests:");
        int[] arr = {10, 20, 30};
        System.out.println("arr[1] = " + calc.safeArrayAccess(arr, 1));
        System.out.println("arr[5] = " + calc.safeArrayAccess(arr, 5));
        System.out.println("null[0] = " + calc.safeArrayAccess(null, 0));
    }
}

class Calculator {
    
    public String divide(int a, int b) {
        try {
            int result = a / b;
            return String.valueOf(result);
        } catch (ArithmeticException e) {
            return "Error: Cannot divide by zero";
        }
    }
    
    public String parseNumber(String str) {
        try {
            int num = Integer.parseInt(str);
            return String.valueOf(num);
        } catch (NullPointerException e) {
            return "Error: Input is null";
        } catch (NumberFormatException e) {
            return "Error: Invalid number format";
        }
    }
    
    public String squareRoot(double num) {
        try {
            if (num < 0) {
                throw new IllegalArgumentException("Cannot calculate square root of negative number");
            }
            return String.valueOf(Math.sqrt(num));
        } catch (IllegalArgumentException e) {
            return "Error: " + e.getMessage();
        }
    }
    
    public String safeArrayAccess(int[] arr, int index) {
        try {
            return String.valueOf(arr[index]);
        } catch (NullPointerException e) {
            return "Error: Array is null";
        } catch (ArrayIndexOutOfBoundsException e) {
            return "Error: Index " + index + " out of bounds";
        }
    }
}`
    }
  ]
};

export default tryCatchFinally;
