const setInterface = {
  id: 'set-interface',
  title: 'Set Interface',
  description: 'Collections that store unique elements only',
  content: `
# Set Interface — No Duplicates Allowed

A Set is like a bag of unique items. You can't have two of the same thing. If you try to add a duplicate, it's simply ignored. This makes Sets perfect for storing unique values like user IDs, email addresses, or tags.

---

## Set Characteristics

- **No duplicates** — Each element appears only once
- **No index** — Can't access by position
- **Null handling** — Most allow one null (TreeSet doesn't)
- **Order** — Depends on implementation

---

## Set Implementations

### HashSet
- **Backed by:** HashMap
- **Order:** No guaranteed order
- **Performance:** O(1) for add, remove, contains
- **Best for:** Fast lookups, no order needed

\`\`\`java
Set<String> hashSet = new HashSet<>();
hashSet.add("Apple");
hashSet.add("Banana");
hashSet.add("Apple");  // Ignored - duplicate
// Result: [Banana, Apple] (order may vary)
\`\`\`

### LinkedHashSet
- **Backed by:** LinkedHashMap
- **Order:** Insertion order preserved
- **Performance:** Slightly slower than HashSet
- **Best for:** Unique elements + predictable iteration

\`\`\`java
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.add("Apple");
linkedSet.add("Banana");
linkedSet.add("Cherry");
// Result: [Apple, Banana, Cherry] (insertion order)
\`\`\`

### TreeSet
- **Backed by:** TreeMap (Red-Black tree)
- **Order:** Sorted (natural or custom)
- **Performance:** O(log n) for operations
- **Best for:** Sorted unique elements

\`\`\`java
Set<String> treeSet = new TreeSet<>();
treeSet.add("Cherry");
treeSet.add("Apple");
treeSet.add("Banana");
// Result: [Apple, Banana, Cherry] (sorted)
\`\`\`

---

## Comparison Table

| Feature | HashSet | LinkedHashSet | TreeSet |
|---------|---------|---------------|---------|
| Order | None | Insertion | Sorted |
| Null | One allowed | One allowed | Not allowed |
| Performance | O(1) | O(1) | O(log n) |
| Memory | Less | More | More |
| Thread-safe | No | No | No |

---

## Common Set Operations

### Creating Sets

\`\`\`java
// Empty set
Set<String> set1 = new HashSet<>();

// With initial capacity
Set<String> set2 = new HashSet<>(100);

// From collection
Set<String> set3 = new HashSet<>(list);

// Immutable set (Java 9+)
Set<String> set4 = Set.of("A", "B", "C");
\`\`\`

### Adding Elements

\`\`\`java
set.add("Apple");           // Returns true if added
boolean added = set.add("Apple");  // Returns false (duplicate)
set.addAll(otherCollection);
\`\`\`

### Removing Elements

\`\`\`java
set.remove("Apple");
set.removeAll(otherCollection);
set.removeIf(s -> s.startsWith("A"));
set.clear();
\`\`\`

### Checking Contents

\`\`\`java
boolean has = set.contains("Apple");
boolean hasAll = set.containsAll(otherCollection);
boolean empty = set.isEmpty();
int size = set.size();
\`\`\`

---

## Set Operations (Math)

Sets support mathematical set operations:

### Union (All elements from both)

\`\`\`java
Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> set2 = new HashSet<>(Arrays.asList(3, 4, 5));

Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);
// Result: [1, 2, 3, 4, 5]
\`\`\`

### Intersection (Common elements)

\`\`\`java
Set<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);
// Result: [3]
\`\`\`

### Difference (Elements in set1 but not set2)

\`\`\`java
Set<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);
// Result: [1, 2]
\`\`\`

---

## TreeSet Special Features

TreeSet provides additional navigation methods:

\`\`\`java
TreeSet<Integer> numbers = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50));

numbers.first();      // 10 (smallest)
numbers.last();       // 50 (largest)
numbers.lower(30);    // 20 (largest < 30)
numbers.higher(30);   // 40 (smallest > 30)
numbers.floor(25);    // 20 (largest <= 25)
numbers.ceiling(25);  // 30 (smallest >= 25)

numbers.headSet(30);  // [10, 20] (elements < 30)
numbers.tailSet(30);  // [30, 40, 50] (elements >= 30)
numbers.subSet(20, 40); // [20, 30] (20 <= x < 40)
\`\`\`

---

## Custom Objects in Sets

For custom objects, you must override \`equals()\` and \`hashCode()\`:

\`\`\`java
class User {
    private String email;
    private String name;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(email, user.email);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}

Set<User> users = new HashSet<>();
users.add(new User(" Dattu@email.com", " Dattu"));
users.add(new User(" Dattu@email.com", " Dattuny"));  // Duplicate! Same email
// Set size: 1
\`\`\`

For TreeSet, implement \`Comparable\` or provide a \`Comparator\`.

---

## Real-World Example: Tag System

\`\`\`java
public class Article {
    private String title;
    private Set<String> tags = new HashSet<>();
    
    public void addTag(String tag) {
        tags.add(tag.toLowerCase());  // Normalize
    }
    
    public void removeTag(String tag) {
        tags.remove(tag.toLowerCase());
    }
    
    public boolean hasTag(String tag) {
        return tags.contains(tag.toLowerCase());
    }
    
    public Set<String> getCommonTags(Article other) {
        Set<String> common = new HashSet<>(this.tags);
        common.retainAll(other.tags);
        return common;
    }
}
\`\`\`

---

## When to Use Which Set

| Use Case | Best Choice |
|----------|-------------|
| Fast lookups, order doesn't matter | HashSet |
| Need insertion order | LinkedHashSet |
| Need sorted elements | TreeSet |
| Need range queries | TreeSet |
| Removing duplicates from list | HashSet |
`,
  code: `// Set Interface Demo

import java.util.*;

public class SetDemo {
    public static void main(String[] args) {
        System.out.println("=== Set Interface Demo ===\\n");
        
        // 1. HASHSET - No order, fast operations
        System.out.println("1. HASHSET");
        System.out.println("   --------");
        
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Banana");
        hashSet.add("Apple");
        hashSet.add("Cherry");
        hashSet.add("Apple");  // Duplicate - ignored
        
        System.out.println("   HashSet: " + hashSet);
        System.out.println("   Size: " + hashSet.size());
        System.out.println("   Contains 'Apple': " + hashSet.contains("Apple"));
        System.out.println("   (Note: Order is not guaranteed)");
        System.out.println();
        
        // 2. LINKEDHASHSET - Maintains insertion order
        System.out.println("2. LINKEDHASHSET");
        System.out.println("   --------------");
        
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.add("First");
        linkedSet.add("Second");
        linkedSet.add("Third");
        linkedSet.add("First");  // Duplicate - ignored
        
        System.out.println("   LinkedHashSet: " + linkedSet);
        System.out.println("   (Maintains insertion order)");
        System.out.println();
        
        // 3. TREESET - Sorted order
        System.out.println("3. TREESET");
        System.out.println("   --------");
        
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Cherry");
        treeSet.add("Apple");
        treeSet.add("Banana");
        treeSet.add("Date");
        
        System.out.println("   TreeSet: " + treeSet);
        System.out.println("   (Automatically sorted)");
        
        TreeSet<Integer> numbers = new TreeSet<>(Arrays.asList(50, 20, 40, 10, 30));
        System.out.println("\\n   Numbers: " + numbers);
        System.out.println("   First: " + numbers.first());
        System.out.println("   Last: " + numbers.last());
        System.out.println("   Lower than 30: " + numbers.lower(30));
        System.out.println("   Higher than 30: " + numbers.higher(30));
        System.out.println("   HeadSet(30): " + numbers.headSet(30));
        System.out.println("   TailSet(30): " + numbers.tailSet(30));
        System.out.println();
        
        // 4. SET OPERATIONS (Math)
        System.out.println("4. SET OPERATIONS (Math)");
        System.out.println("   ----------------------");
        
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));
        
        System.out.println("   Set1: " + set1);
        System.out.println("   Set2: " + set2);
        
        // Union
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("   Union: " + union);
        
        // Intersection
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("   Intersection: " + intersection);
        
        // Difference
        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("   Difference (Set1 - Set2): " + difference);
        System.out.println();
        
        // 5. REMOVING DUPLICATES
        System.out.println("5. REMOVING DUPLICATES FROM LIST");
        System.out.println("   -------------------------------");
        
        List<String> listWithDupes = Arrays.asList("A", "B", "A", "C", "B", "D", "A");
        System.out.println("   Original list: " + listWithDupes);
        
        Set<String> uniqueSet = new LinkedHashSet<>(listWithDupes);
        System.out.println("   Unique (LinkedHashSet): " + uniqueSet);
        
        List<String> uniqueList = new ArrayList<>(uniqueSet);
        System.out.println("   Back to list: " + uniqueList);
        System.out.println();
        
        // 6. REAL-WORLD EXAMPLE - User Roles
        System.out.println("6. REAL-WORLD EXAMPLE - User Roles");
        System.out.println("   ---------------------------------");
        
        User admin = new User("admin@company.com");
        admin.addRole("ADMIN");
        admin.addRole("USER");
        admin.addRole("MODERATOR");
        admin.addRole("USER");  // Duplicate ignored
        
        User regular = new User("user@company.com");
        regular.addRole("USER");
        
        System.out.println("   Admin roles: " + admin.getRoles());
        System.out.println("   Regular user roles: " + regular.getRoles());
        System.out.println("   Admin has ADMIN role: " + admin.hasRole("ADMIN"));
        System.out.println("   Regular has ADMIN role: " + regular.hasRole("ADMIN"));
        System.out.println();
        
        // 7. TAG SYSTEM
        System.out.println("7. TAG SYSTEM");
        System.out.println("   -----------");
        
        Article article1 = new Article("Java Tutorial");
        article1.addTag("java");
        article1.addTag("programming");
        article1.addTag("tutorial");
        article1.addTag("JAVA");  // Duplicate (case-insensitive)
        
        Article article2 = new Article("Python Guide");
        article2.addTag("python");
        article2.addTag("programming");
        article2.addTag("guide");
        
        System.out.println("   Article 1 tags: " + article1.getTags());
        System.out.println("   Article 2 tags: " + article2.getTags());
        System.out.println("   Common tags: " + article1.getCommonTags(article2));
    }
}

// User with roles
class User {
    private String email;
    private Set<String> roles = new HashSet<>();
    
    public User(String email) {
        this.email = email;
    }
    
    public void addRole(String role) {
        roles.add(role.toUpperCase());
    }
    
    public boolean hasRole(String role) {
        return roles.contains(role.toUpperCase());
    }
    
    public Set<String> getRoles() {
        return new HashSet<>(roles);  // Return copy
    }
}

// Article with tags
class Article {
    private String title;
    private Set<String> tags = new HashSet<>();
    
    public Article(String title) {
        this.title = title;
    }
    
    public void addTag(String tag) {
        tags.add(tag.toLowerCase());
    }
    
    public Set<String> getTags() {
        return new HashSet<>(tags);
    }
    
    public Set<String> getCommonTags(Article other) {
        Set<String> common = new HashSet<>(this.tags);
        common.retainAll(other.tags);
        return common;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a word frequency counter that tracks unique words',
      hint: 'Use Set to find unique words and Map for counting',
      starterCode: `import java.util.*;

public class WordAnalyzer {
    public static void main(String[] args) {
        String text = "Java is great and Java is powerful. " +
                      "Learning Java is fun and programming is creative.";
        
        System.out.println("=== Word Analyzer ===\\n");
        System.out.println("Text: " + text);
        System.out.println();
        
        // Analyze the text
        TextAnalyzer analyzer = new TextAnalyzer(text);
        
        System.out.println("Total words: " + analyzer.getTotalWords());
        System.out.println("Unique words: " + analyzer.getUniqueWordCount());
        System.out.println();
        
        System.out.println("Unique words (sorted): " + analyzer.getUniqueWordsSorted());
        System.out.println();
        
        System.out.println("Word frequencies:");
        analyzer.printFrequencies();
    }
}

class TextAnalyzer {
    private List<String> words;
    private Set<String> uniqueWords;
    private Map<String, Integer> frequencies;
    
    public TextAnalyzer(String text) {
        // Clean and split text
        String[] wordArray = text.toLowerCase()
                                 .replaceAll("[^a-z\\\\s]", "")
                                 .split("\\\\s+");
        
        words = Arrays.asList(wordArray);
        uniqueWords = new HashSet<>(words);
        
        // Count frequencies
        frequencies = new HashMap<>();
        for (String word : words) {
            frequencies.put(word, frequencies.getOrDefault(word, 0) + 1);
        }
    }
    
    public int getTotalWords() {
        return words.size();
    }
    
    public int getUniqueWordCount() {
        return uniqueWords.size();
    }
    
    public Set<String> getUniqueWordsSorted() {
        return new TreeSet<>(uniqueWords);
    }
    
    public void printFrequencies() {
        frequencies.entrySet()
                   .stream()
                   .sorted((a, b) -> b.getValue() - a.getValue())
                   .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));
    }
}`
    }
  ]
};

export default setInterface;
