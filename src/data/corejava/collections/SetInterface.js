const setInterface = {
  id: 'set-interface',
  title: 'Set Interface',
  description: 'Collections that store unique elements only',
  content: `
# Set Interface — No Duplicates Allowed

Think of a **Set** like a guest list at a wedding. Once someone's name is on the list, writing it again does nothing — the same person cannot enter twice. In Java, a Set stores **unique elements only**. Try to add a duplicate and the Set quietly ignores it.

Other everyday examples:
- **Unique student roll numbers** in a class register — roll 101 can appear only once
- **Tags on a blog post** — you don't want \`java\` and \`Java\` counted as two different tags if you normalize them
- **Visited URLs** in a web crawler — each URL should be tracked once

If you need order with duplicates, use a **List**. If you need key–value pairs, use a **Map**. A Set is for "have I seen this before?" and "give me every unique value."

---

## Understand Deeply — How a Set Knows Something Is a Duplicate

A Set does not magically "see" duplicates. It uses two methods from the \`Object\` class:

1. \`hashCode()\` — a number that helps Java find the right bucket quickly
2. \`equals()\` — checks if two objects are "the same" for your purpose

**When you call \`set.add(student)\`:**

1. Java computes \`student.hashCode()\`
2. Java goes to the bucket for that hash
3. Java compares with existing items using \`equals()\`
4. If \`equals\` says "same" → add is ignored, \`add\` returns \`false\`
5. If no match → item is stored, \`add\` returns \`true\`

**Example with Strings:** \`"Apple"\` and \`"Apple"\` have the same hash and are equal — second add fails silently.

**Example with your own class:** If you store \`User\` objects in a HashSet but do **not** override \`equals\` and \`hashCode\`, Java compares memory addresses. Two users with the same email might both get stored — a common fresher bug. Fix it by defining equality on email (see the custom object demo below).

**Why HashSet order looks random:** HashSet spreads items across buckets for speed. Print order is not insertion order. Need order? Use LinkedHashSet (insertion) or TreeSet (sorted).

---

## Set Characteristics

Before we look at code, remember these four rules:

- **No duplicates** — each element appears at most once (Java checks with \`equals()\`)
- **No index** — you cannot call \`get(0)\` like on a List; you search with \`contains()\` or loop
- **Null handling** — HashSet and LinkedHashSet allow one \`null\`; TreeSet does not
- **Order depends on the implementation** — HashSet has no guaranteed order; LinkedHashSet keeps insertion order; TreeSet keeps sorted order

---

## Set Implementations

Java gives you three main Set classes. All three reject duplicates, but they differ in **order** and **speed**.

### HashSet — fast, no guaranteed order

HashSet is the default choice. It is backed by a hash table (internally a HashMap), so add, remove, and \`contains\` are very fast on average — O(1). The trade-off: when you print the Set, elements may appear in any order.

**Real example:** storing unique email addresses for a newsletter signup — you only care that each email appears once, not the order they signed up.

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class HashSetBasicsDemo {
    public static void main(String[] args) {
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Apple");  // Ignored - duplicate

        System.out.println("HashSet: " + hashSet);
        System.out.println("Size: " + hashSet.size());
        System.out.println("(Order may vary)");
    }
}
\`\`\`

Notice \`size()\` is 2, not 3 — the second \`"Apple"\` was ignored.

### LinkedHashSet — unique + insertion order

LinkedHashSet is like HashSet with a memory of **when** each item was added. Iteration order matches insertion order. It is slightly slower and uses a bit more memory because it links entries together.

**Real example:** removing duplicates from a list but keeping the first occurrence's order — e.g. \`["A", "B", "A", "C"]\` becomes \`["A", "B", "C"]\`.

\`\`\`java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetBasicsDemo {
    public static void main(String[] args) {
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.add("Apple");
        linkedSet.add("Banana");
        linkedSet.add("Cherry");

        System.out.println("LinkedHashSet: " + linkedSet);
        System.out.println("(Maintains insertion order)");
    }
}
\`\`\`

### TreeSet — unique + sorted order

TreeSet stores elements in **sorted order** (natural order for Strings and numbers, or a custom \`Comparator\`). It uses a red-black tree internally, so operations are O(log n) — still fast, but not as fast as HashSet for huge datasets.

**Real example:** maintaining a sorted list of unique product IDs, or finding the nearest price in a range.

\`\`\`java
import java.util.Set;
import java.util.TreeSet;

public class TreeSetBasicsDemo {
    public static void main(String[] args) {
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Cherry");
        treeSet.add("Apple");
        treeSet.add("Banana");

        System.out.println("TreeSet: " + treeSet);
        System.out.println("(Automatically sorted)");
    }
}
\`\`\`

Even though we added Cherry first, the output is Apple, Banana, Cherry — alphabetical order.

---

## HashSet vs LinkedHashSet vs TreeSet — When to Pick

Use this table when you are choosing which Set to create:

| When you need… | Pick this | Real-world example |
|----------------|-----------|-------------------|
| Fastest lookups, order does not matter | **HashSet** | Set of logged-in user IDs checked on every request |
| Unique values in the order they were added | **LinkedHashSet** | Browsing history — each page once, most recent trail preserved |
| Unique values always sorted | **TreeSet** | Leaderboard scores, sorted unique city names |
| Range queries (values between X and Y) | **TreeSet** | All product prices from ₹500 to ₹1000 using \`subSet()\` |
| Remove duplicates from a List, keep first-seen order | **LinkedHashSet** | \`new LinkedHashSet<>(listWithDupes)\` |

### Feature comparison

| Feature | HashSet | LinkedHashSet | TreeSet |
|---------|---------|---------------|---------|
| Order | None guaranteed | Insertion order | Sorted order |
| Null allowed | One null | One null | No null |
| Average speed | O(1) | O(1) | O(log n) |
| Memory | Least | More than HashSet | More than HashSet |
| Thread-safe | No | No | No |

**Simple rule for freshers:** start with **HashSet**. Switch to **LinkedHashSet** if iteration order matters. Switch to **TreeSet** if you need sorting or range queries.

### Set vs List — same data, different behavior

\`\`\`java
List<String> list = new ArrayList<>();
list.add("A"); list.add("B"); list.add("A");
// list → [A, B, A]  size 3

Set<String> set = new HashSet<>();
set.add("A"); set.add("B"); set.add("A");
// set → [A, B]  size 2  (order may vary)
\`\`\`

If your requirement says "no duplicates," do not manually check \`list.contains()\` in a loop every time — use a Set and let Java enforce uniqueness.

---

## Common Set Operations

The program below shows everyday tasks: creating Sets (including from a List to remove duplicates), checking what \`add\` returns, searching with \`contains\`, and removing items.

Watch \`add("Apple")\` — it returns \`true\` the first time and \`false\` when the duplicate is rejected.

\`\`\`java
import java.util.*;

public class SetOperationsDemo {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        Set<String> withCapacity = new HashSet<>(100);
        Set<String> fromList = new HashSet<>(List.of("X", "Y", "X"));
        Set<String> immutable = Set.of("A", "B", "C");

        System.out.println("From list (deduped): " + fromList);
        System.out.println("Immutable: " + immutable);

        boolean firstAdd = set.add("Apple");
        boolean duplicateAdd = set.add("Apple");
        set.addAll(List.of("Banana", "Cherry"));

        System.out.println("\nSet: " + set);
        System.out.println("First add returned: " + firstAdd);
        System.out.println("Duplicate add returned: " + duplicateAdd);
        System.out.println("Contains Apple: " + set.contains("Apple"));
        System.out.println("Size: " + set.size());

        set.remove("Banana");
        set.removeIf(s -> s.startsWith("C"));
        System.out.println("After removals: " + set);
    }
}
\`\`\`

---

## Set Operations (Math)

Sets behave like math sets from school. You can compute **union** (everything in either set), **intersection** (only what both share), and **difference** (in first set but not second).

Example: students who chose Java **or** Python (union), who chose **both** (intersection), or who chose Java **but not** Python (difference).

\`\`\`java
import java.util.*;

public class SetMathOperationsDemo {
    public static void main(String[] args) {
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(3, 4, 5));

        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union);

        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);

        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference: " + difference);
    }
}
\`\`\`

| Operation | Method | Meaning |
|-----------|--------|---------|
| Union | \`addAll(other)\` | All elements from both sets |
| Intersection | \`retainAll(other)\` | Only elements in both sets |
| Difference | \`removeAll(other)\` | Elements in this set but not the other |

**Plain English with Venn diagrams in your head:**

- **Union** — students who chose Java **or** Python (everyone from both classes combined)
- **Intersection** — students enrolled in Java **and** Python (only those in both)
- **Difference** — students in Java but **not** in Python (set1 minus overlap)

If set1 = {1,2,3} and set2 = {3,4,5}: union = {1,2,3,4,5}, intersection = {3}, difference = {1,2}.

---

## TreeSet Special Features

Because TreeSet keeps data sorted, it offers extra navigation methods that HashSet does not have — \`first()\`, \`last()\`, \`lower()\`, \`higher()\`, and views like \`headSet()\` / \`tailSet()\` / \`subSet()\`.

Think of it like a sorted guest list where you can quickly ask: "Who is just below seat 30?" or "Give me everyone from 20 up to (but not including) 40."

\`\`\`java
import java.util.Arrays;
import java.util.TreeSet;

public class TreeSetNavigationDemo {
    public static void main(String[] args) {
        TreeSet<Integer> numbers = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50));

        System.out.println("First: " + numbers.first());
        System.out.println("Last: " + numbers.last());
        System.out.println("Lower than 30: " + numbers.lower(30));
        System.out.println("Higher than 30: " + numbers.higher(30));
        System.out.println("Floor of 25: " + numbers.floor(25));
        System.out.println("Ceiling of 25: " + numbers.ceiling(25));
        System.out.println("HeadSet(<30): " + numbers.headSet(30));
        System.out.println("TailSet(>=30): " + numbers.tailSet(30));
        System.out.println("SubSet [20,40): " + numbers.subSet(20, 40));
    }
}
\`\`\`

---

## Custom Objects in Sets

When you store your own classes (like \`User\`) in a HashSet or LinkedHashSet, Java must know what "duplicate" means. You **must override \`equals()\` and \`hashCode()\`** using the same fields — here, two users with the same email are treated as one person on the guest list.

Without proper \`equals\`/\`hashCode\`, the same email could appear twice and the Set would not notice.

\`\`\`java
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class CustomObjectInSetDemo {
    public static void main(String[] args) {
        Set<User> users = new HashSet<>();
        users.add(new User("dattu@email.com", "Dattu"));
        users.add(new User("dattu@email.com", "Dattuny"));  // Duplicate! Same email

        System.out.println("Users in set: " + users.size());
        for (User user : users) {
            System.out.println(user);
        }
    }
}

class User {
    private final String email;
    private final String name;

    public User(String email, String name) {
        this.email = email;
        this.name = name;
    }

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

    @Override
    public String toString() {
        return name + " <" + email + ">";
    }
}
\`\`\`

For **TreeSet** with custom objects, also implement \`Comparable\` (or pass a \`Comparator\`) so Java knows how to sort them.

---

## Real-World Example: Tag System

Blog posts often have tags like \`java\`, \`spring\`, \`tutorial\`. A Set is a natural fit — each tag should appear once per article. The demo below normalizes tags to lowercase so \`"Java"\` and \`"java"\` count as the same tag, and uses set intersection to find tags shared between two articles.

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class ArticleTagSystemDemo {
    public static void main(String[] args) {
        Article javaArticle = new Article("Java Collections");
        javaArticle.addTag("Java");
        javaArticle.addTag("Collections");
        javaArticle.addTag("java");  // duplicate after normalization

        Article springArticle = new Article("Spring Boot");
        springArticle.addTag("Java");
        springArticle.addTag("Spring");

        System.out.println("Java article tags: " + javaArticle.getTags());
        System.out.println("Common tags: " + javaArticle.getCommonTags(springArticle));
    }
}

class Article {
    private final String title;
    private final Set<String> tags = new HashSet<>();

    public Article(String title) {
        this.title = title;
    }

    public void addTag(String tag) {
        tags.add(tag.toLowerCase());
    }

    public void removeTag(String tag) {
        tags.remove(tag.toLowerCase());
    }

    public boolean hasTag(String tag) {
        return tags.contains(tag.toLowerCase());
    }

    public Set<String> getTags() {
        return new HashSet<>(tags);
    }

    public Set<String> getCommonTags(Article other) {
        Set<String> common = new HashSet<>(this.tags);
        common.retainAll(other.tags);
        return common;
    }
}
\`\`\`

---

## Interview Questions — Plain Answers

### 1. What makes a Set different from a List?

A List allows duplicates and gives you index-based access. A Set allows **only unique** elements and has **no index**. If you add the same value twice to a Set, the second add is ignored.

### 2. HashSet vs LinkedHashSet vs TreeSet — which one should I use?

Pick based on order: **HashSet** when you don't care about order and want speed. **LinkedHashSet** when you need insertion order. **TreeSet** when you need sorted order or range queries. All three reject duplicates.

### 3. How does a Set decide two elements are duplicates?

It uses \`equals()\`. For HashSet and LinkedHashSet, \`hashCode()\` must also match — that is why you override both for custom objects. Two objects that are \`equals\` must have the same \`hashCode\`.

### 4. Can I change an object after putting it in a HashSet?

Be very careful. If you change a field that \`equals()\` or \`hashCode()\` uses, the Set may not find the object anymore, or it may allow what looks like a duplicate. Best practice: use **immutable** keys (like \`String\`, \`Integer\`, or \`final\` fields) in Sets.

### 5. How do I remove duplicates from a List?

Wrap the List in a Set: \`new HashSet<>(list)\` removes duplicates but loses order. Use \`new LinkedHashSet<>(list)\` to keep the first-seen order. In streams: \`.distinct()\` or \`.collect(Collectors.toSet())\`.

### 6. What is EnumSet?

When your Set contains **enum** values only (like \`Day.MONDAY\`, \`Day.TUESDAY\`), \`EnumSet\` is faster and more compact than HashSet. Use it whenever the element type is an enum.

### 7. What is CopyOnWriteArraySet?

A **thread-safe** Set for read-heavy scenarios. Reads are fast; writes copy the whole backing array, so writes are expensive. Useful for small listener lists that are read often and changed rarely.

### 8. Are two Sets equal if they have the same elements in different order?

Yes. Set equality ignores order — \`{1, 2, 3}\` equals \`{3, 1, 2}\`. A List would **not** consider those equal because order matters for Lists.

### 9. Why must a TreeSet comparator agree with equals?

If your comparator says two objects are different but \`equals\` says they are the same (or the opposite), the Set contract breaks — you could end up with "duplicate" values that TreeSet treats as distinct. Keep comparison and equality consistent.

### 10. How fast is \`contains()\` on a HashSet?

On average, **O(1)** — constant time — because hashing jumps straight to the right bucket. Worst case can degrade if many keys collide, but with a good \`hashCode()\` and normal load, it is very fast. TreeSet \`contains\` is O(log n) because it walks the tree.

---

## Remember These 5 Things

1. **Set = no duplicates** — second add of the same element is ignored.
2. **Default is HashSet** — fastest; order when printing is not guaranteed.
3. **Use LinkedHashSet** when you care about insertion order; **TreeSet** when you need sorting.
4. **Custom objects need \`equals\` + \`hashCode\`** — or duplicates will slip through.
5. **Remove duplicates from a List:** \`new LinkedHashSet<>(list)\` then back to \`ArrayList\` if needed.

---

## What's Next?

Now that you understand Sets, continue with the other Java Collections Framework interfaces:

### Immediate Next Steps

1. **[Queue Interface](/corejava/queue-interface)** — First-in-first-out collections for tasks, messages, and waiting lines
2. **[Map Interface](/corejava/map-interface)** — Key–value pairs when you need to look up data by a key, not just check uniqueness
3. **[List Interface](/corejava/list-interface)** — Ordered collections that allow duplicates and index-based access
4. **[Collection Introduction](/corejava/collection-introduction)** — Review the big picture of Lists, Sets, Queues, and Maps together


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
