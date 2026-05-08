const stringMethods = {
  id: "string-methods",
  title: "String Methods",
  description: "Learn commonly used String methods in Java",
  content: `
# String Methods in Java

Java String class provides many methods to perform operations on strings.

## Common String Methods

| Method | Description |
|--------|-------------|
| length() | Returns string length |
| charAt(i) | Returns character at index |
| substring() | Extracts substring |
| concat() | Concatenates strings |
| equals() | Compares content |
| equalsIgnoreCase() | Case-insensitive comparison |
| toUpperCase() | Converts to uppercase |
| toLowerCase() | Converts to lowercase |
| trim() | Removes whitespace |
| split() | Splits string |
| replace() | Replaces characters |
| contains() | Checks if contains substring |
| startsWith() | Checks prefix |
| endsWith() | Checks suffix |
| indexOf() | Finds index of substring |

---

## Why String Methods Matter in Real Projects

Strings are used in almost every domain:\n
- validating user input (email, username, password rules)\n
- parsing URLs and query parameters\n
- searching/filtering product catalogs\n
- log analysis and reporting\n
- tokenizing text (CSV, JSON-like formats)\n

Knowing String methods helps you write clean, efficient code without reinventing parsing logic.

---

## Category-wise Understanding (More Practical)

### 1) Length and Character Access

- \`length()\` gives string length\n
- \`charAt(i)\` accesses a character\n

**Use case:** password validation rules.

### 2) Searching and Indexing

- \`contains\`, \`indexOf\`, \`lastIndexOf\`\n

**Use case:** check if URL contains a route segment.

### 3) Substrings and Slicing

- \`substring(begin)\`, \`substring(begin, end)\`\n

**Use case:** extracting domain from email.

### 4) Comparison

- \`equals\`, \`equalsIgnoreCase\`, \`compareTo\`\n

**Use case:** authentication (username match), sorting names.

### 5) Transformation

- \`toLowerCase\`, \`toUpperCase\`, \`trim\`\n

**Use case:** normalize input before saving.

### 6) Replace and Split

- \`replace\`, \`replaceAll\`, \`split\`\n

**Use case:** parse CSV line, clean whitespace.

---

## Real-World Examples (With Explanation)

### Example 1: Email Validation (Basic)

\`\`\`java
String email = " Dattu@example.com";
boolean valid = email.contains("@") && email.contains(".") && !email.startsWith("@");
\`\`\`

**Note:** real-world email validation is more complex, but String methods handle basic rules.

### Example 2: Extract Username from Email

\`\`\`java
String email = " Dattu@example.com";
int atIndex = email.indexOf("@");
String username = email.substring(0, atIndex); // " Dattu"
\`\`\`

### Example 3: Case-Insensitive Search

\`\`\`java
String text = "Learn Java with LearnStackHub";
String query = "java";
boolean found = text.toLowerCase().contains(query.toLowerCase());
\`\`\`

---

## Comparison Table: String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---|---|---|---|
| Mutability | Immutable | Mutable | Mutable |
| Thread Safety | Yes (immutable) | No | Yes (sync) |
| Best for | few operations | many operations (single thread) | many ops (multi-thread, rare) |

---

## Common Mistakes

### Mistake 1: Using == to compare strings

\`==\` compares references, not content.

\`\`\`java
String a = new String("hi");
String b = new String("hi");
System.out.println(a == b); // false
System.out.println(a.equals(b)); // true
\`\`\`

### Mistake 2: Not handling null

Always check for null before calling methods.

---

## FAQs (String Methods)

### Q1: Why is String immutable?

**A:** Security, caching, and thread safety. Immutability allows safe reuse in String Pool.

### Q2: Which is better: contains() or indexOf()?

**A:** \`contains\` is more readable. Internally, both perform similar scanning.

### Q3: What’s the difference between replace and replaceAll?

**A:** \`replaceAll\` uses regex; \`replace\` does plain replacement.

### Q4: Why is split sometimes slow?

**A:** \`split\` uses regex. For performance-critical parsing, consider manual scanning.

### Q5: How do I join strings efficiently?

**A:** Use StringBuilder, String.join, or streams depending on use case.

---

## Conclusion

String methods are essential for validation, parsing, formatting, and searching. Mastering these methods improves code quality and reduces bugs in real applications.

### Next steps
- Learn [StringBuilder](/corejava/string-builder) for efficient concatenation
- Learn [StringBuffer](/corejava/string-buffer) for thread-safe mutable strings
- Continue with [Exception Handling](/corejava/exception-introduction) for safe string parsing
  
---

## 10 Important String Methods Interview Questions

### 1. What does \`substring\` do in modern Java regarding memory?
**Answer:** Historically shared char array (leaks); now copies to avoid retaining huge backing arrays—still watch indices.
Know start inclusive, end exclusive.

### 2. How do \`replace\` vs \`replaceAll\` differ?
**Answer:** \`replace\` char sequences literal; \`replaceAll\` uses regex patterns—metacharacters need escaping.
Performance differs—regex costs more.

### 3. What does \`split\` with regex pitfalls?
**Answer:** Trailing empty strings may be dropped unless limit parameter used; regex special chars need escape.
CSV parsing often better with dedicated libraries.

### 4. What is \`strip\` vs \`trim\`?
**Answer:** \`strip\` removes Unicode whitespace; \`trim\` only ≤ U+0020 space—prefer \`strip\` for user text.
Older code may still use \`trim\`.

### 5. Scenario: case-insensitive comparison for locale user names?
**Answer:** Prefer \`String.CASE_INSENSITIVE_ORDER\` or \`equalsIgnoreCase\` for ASCII-like tokens; for natural language use \`Collator\` with locale.
Turkish I problem matters globally.

### 6. What does \`formatted\` / \`String.format\` do?
**Answer:** Locale-aware formatting with placeholders—good for messages; avoid in tight loops without caching pattern.
i18n uses \`MessageFormat\` or resource bundles.

### 7. How does \`compareTo\` order strings?
**Answer:** Lexicographic by Unicode values—sign indicates less/greater—not always human sorting order.
Use \`Collator\` for locale rules.

### 8. What is \`chars\` / \`codePoints\` for?
**Answer:** Stream primitive char or Unicode code points—use code points for full Unicode iteration.
Avoid splitting surrogate pairs incorrectly.

### 9. Why \`isBlank\` vs \`isEmpty\`?
**Answer:** \`isBlank\` true for whitespace-only; \`isEmpty\` only for length 0.
Validation uses \`isBlank\` for forms.

### 10. What about \`matches\` performance?
**Answer:** Compiles regex each call—reuse \`Pattern\` for repeated checks.
Micro-optimization but common in hot paths.

`,
  code: `public class StringMethodsDemo {
    public static void main(String[] args) {
        System.out.println("=== String Methods Demo ===\\n");
        
        String str = "  Hello, Java World!  ";
        
        // Basic operations
        System.out.println("--- Basic Operations ---");
        System.out.println("Original: '" + str + "'");
        System.out.println("Length: " + str.length());
        System.out.println("Trimmed: '" + str.trim() + "'");
        
        str = str.trim();
        
        // Character operations
        System.out.println("\\n--- Character Operations ---");
        System.out.println("charAt(0): " + str.charAt(0));
        System.out.println("indexOf('Java'): " + str.indexOf("Java"));
        System.out.println("lastIndexOf('o'): " + str.lastIndexOf('o'));
        
        // Case conversion
        System.out.println("\\n--- Case Conversion ---");
        System.out.println("Upper: " + str.toUpperCase());
        System.out.println("Lower: " + str.toLowerCase());
        
        // Substring
        System.out.println("\\n--- Substring ---");
        System.out.println("substring(0, 5): " + str.substring(0, 5));
        System.out.println("substring(7): " + str.substring(7));
        
        // Replace
        System.out.println("\\n--- Replace ---");
        System.out.println("Replace 'Java' with 'Python': " + str.replace("Java", "Python"));
        System.out.println("Replace all 'o' with '0': " + str.replace('o', '0'));
        
        // Check methods
        System.out.println("\\n--- Check Methods ---");
        System.out.println("contains('Java'): " + str.contains("Java"));
        System.out.println("startsWith('Hello'): " + str.startsWith("Hello"));
        System.out.println("endsWith('!'): " + str.endsWith("!"));
        System.out.println("isEmpty(): " + str.isEmpty());
        
        // Split
        System.out.println("\\n--- Split ---");
        String[] words = str.split(" ");
        System.out.println("Words:");
        for (String word : words) {
            System.out.println("  - " + word);
        }
        
        // Comparison
        System.out.println("\\n--- Comparison ---");
        String s1 = "Hello";
        String s2 = "hello";
        System.out.println("equals: " + s1.equals(s2));
        System.out.println("equalsIgnoreCase: " + s1.equalsIgnoreCase(s2));
        System.out.println("compareTo: " + s1.compareTo(s2));
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to count vowels and consonants in a string",
      hint: "Use charAt() and check each character",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String str = "Hello World";
        int vowels = 0, consonants = 0;
        
        // Count vowels and consonants
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
}`
    }
  ]
};

export default stringMethods;





