const mapInterface = {
  id: 'map-interface',
  title: 'Map Interface',
  description: 'Key-value pair collections for fast lookups',
  content: `
# Map Interface — Key-Value Storage

Think of a Map like your phone contacts. You search by **name** (the key) and get back a **phone number** (the value). Or like a school marks sheet: **roll number → marks**. Or an online store: **product id → price**.

That is the whole idea. You give a key, you get a value. Keys must be unique — you cannot have two contacts with the same name stored as separate entries. But two different products can share the same price. If you add the same key again, the old value gets replaced.

Maps are one of the most useful tools in Java because lookup by key is fast. Instead of looping through a whole list to find something, you just ask: "What is the value for this key?"

---

## Understand Deeply — How HashMap Finds a Value So Fast

Imagine a school office with many drawers. Each drawer is a **bucket**.

**When you call \`map.put("Ravi", 85)\`:**

1. Java runs \`"Ravi".hashCode()\` to pick a drawer (bucket)
2. Java stores the pair \`"Ravi" → 85\` inside that drawer
3. If \`"Ravi"\` was already there, the old marks are **replaced** with 85

**When you call \`map.get("Ravi")\`:**

1. Java hashes \`"Ravi"\` again → same drawer
2. Java finds the entry in that drawer
3. Returns \`85\`

You did **not** scan every student in the school — you went straight to the right drawer. That is why Map lookup is fast compared to looping a List.

**Important rules for keys:**

| Rule | Why it matters |
|------|----------------|
| Keys must be **unique** | One key → one value at a time |
| Keys should not change after \`put\` | If hash changes, Java looks in the wrong drawer and \`get\` fails |
| Override \`equals\` + \`hashCode\` for custom key classes | Same idea as Set — broken equality breaks the map |
| \`null\` key allowed once in HashMap | Only one null key; many null values OK |

**List vs Map — do not confuse them:**

\`\`\`java
// List — find by position
List<String> list = new ArrayList<>();
list.get(0);  // first item

// Map — find by key
Map<String, Integer> map = new HashMap<>();
map.get("Ravi");  // value for key "Ravi"
\`\`\`

---

## Map Characteristics

- **Key-Value pairs** — Every entry has a key and a value, like name → number
- **Unique keys** — No duplicate keys allowed (values can repeat)
- **One value per key** — Putting the same key again replaces the old value
- **Null handling** — Depends on which Map class you pick

---

## Map Implementations — Which One Should You Pick?

Java gives you three main Map types. Here is the simple fresher-level rule:

| Map Type | Think of it as... | When to use |
|----------|-------------------|-------------|
| **HashMap** | A fast drawer — grab anything quickly, order does not matter | Default choice for most apps |
| **LinkedHashMap** | A notebook — entries stay in the order you wrote them | When print order should match add order |
| **TreeMap** | An alphabetically sorted phone book — keys always sorted | When you need sorted keys or range queries |

**HashMap** — Use this 90% of the time. Fast \`get\` and \`put\`. Order is not guaranteed when you print the map.

**LinkedHashMap** — Same speed as HashMap, but remembers insertion order. Useful for shopping carts, recent history, or simple LRU caches.

**TreeMap** — Keys are always sorted (A before B, 1 before 2). Slightly slower, but great when you need "first key", "last key", or a range of keys.

**Hashtable** — Old and slow. Do not use in new code. Use \`ConcurrentHashMap\` if you need thread safety.

---

### HashMap — Fast Lookups, No Fixed Order

Imagine storing student ages: name → age. You just want quick lookup — "How old is Alice?" HashMap is perfect for that.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapBasicsDemo {
    public static void main(String[] args) {
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);

        int aliceAge = ages.get("Alice");
        System.out.println("Alice age: " + aliceAge);
        System.out.println("All ages: " + ages);
    }
}
\`\`\`

---

### LinkedHashMap — Remembers Insertion Order

Same as HashMap, but when you loop through it, entries appear in the order you added them. Like writing contacts in a notebook — first added stays first.

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapBasicsDemo {
    public static void main(String[] args) {
        Map<String, Integer> orderedMap = new LinkedHashMap<>();
        orderedMap.put("First", 1);
        orderedMap.put("Second", 2);
        orderedMap.put("Third", 3);

        System.out.println("Insertion order:");
        orderedMap.forEach((key, value) -> System.out.println("  " + key + " -> " + value));
    }
}
\`\`\`

---

### TreeMap — Keys Always Sorted

If you add Charlie, Alice, Bob — TreeMap prints them as Alice, Bob, Charlie. Perfect for roll-number → marks when you want sorted reports, or product id → price when ids must appear in order.

\`\`\`java
import java.util.Map;
import java.util.TreeMap;

public class TreeMapBasicsDemo {
    public static void main(String[] args) {
        Map<String, Integer> sortedMap = new TreeMap<>();
        sortedMap.put("Charlie", 3);
        sortedMap.put("Alice", 1);
        sortedMap.put("Bob", 2);

        System.out.println("Sorted by key:");
        sortedMap.forEach((key, value) -> System.out.println("  " + key + " -> " + value));
    }
}
\`\`\`

---

## Common Map Operations

Now let us see the methods you will use every day: \`put\`, \`get\`, \`getOrDefault\`, \`containsKey\`, \`remove\`, and more. This example uses a student marks map — roll number or name as key, score as value.

\`\`\`java
import java.util.*;

public class MapOperationsDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        Map<String, Integer> withCapacity = new HashMap<>(100);
        Map<String, Integer> immutable = Map.of("A", 1, "B", 2);
        Map<String, Integer> fromEntries = Map.ofEntries(
            Map.entry("X", 10),
            Map.entry("Y", 20)
        );

        System.out.println("Immutable: " + immutable);
        System.out.println("From entries: " + fromEntries);

        map.put("Alice", 95);
        map.putIfAbsent("Bob", 87);
        map.putIfAbsent("Alice", 60);  // ignored
        map.putAll(Map.of("Charlie", 92));

        System.out.println("\\nMap: " + map);
        System.out.println("Alice score: " + map.get("Alice"));
        System.out.println("Unknown: " + map.getOrDefault("Unknown", 0));
        System.out.println("Contains key Bob: " + map.containsKey("Bob"));
        System.out.println("Contains value 92: " + map.containsValue(92));

        map.replace("Bob", 90);
        map.remove("Charlie");
        System.out.println("After update/remove: " + map);
    }
}
\`\`\`

Notice \`putIfAbsent\` — it only adds if the key is missing. And \`getOrDefault\` — returns a fallback instead of null when the key is not found. Very handy in real projects.

---

## Iterating Over Maps

A Map is not a List — you do not loop with \`get(i)\`. You have three views:

| View | Method | You get |
|------|--------|---------|
| Entries | \`entrySet()\` | Both key and value — **most common in real code** |
| Keys only | \`keySet()\` | Every key; use \`get(key)\` if you need the value |
| Values only | \`values()\` | Every value; keys are lost |

**Best practice:** Use \`entrySet()\` when you need both name and score together. It avoids calling \`get(key)\` twice and is easier to read.

There are several ways to loop through a Map. In interviews and at work, \`entrySet\` and \`forEach\` are the most common. Here we print student names and their scores.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class MapIterationDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        System.out.println("=== entrySet ===");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        System.out.println("\\n=== keySet ===");
        for (String name : scores.keySet()) {
            System.out.println(name + ": " + scores.get(name));
        }

        System.out.println("\\n=== values ===");
        for (Integer score : scores.values()) {
            System.out.println(score);
        }

        System.out.println("\\n=== forEach ===");
        scores.forEach((name, score) -> System.out.println(name + ": " + score));

        System.out.println("\\n=== stream filter > 90 ===");
        scores.entrySet().stream()
              .filter(e -> e.getValue() > 90)
              .forEach(e -> System.out.println(e.getKey()));
    }
}
\`\`\`

**Tip for freshers:** Prefer \`entrySet\` when you need both key and value. Use \`keySet\` only when you need keys and will call \`get\` inside the loop.

---

## Advanced Operations (Java 8+)

Java 8 added smart methods that save you from writing long if-else blocks. \`compute\` updates a value, \`computeIfAbsent\` creates a list if missing, and \`merge\` adds numbers together. You will see these in counting and grouping logic.

\`\`\`java
import java.util.*;

public class MapAdvancedOperationsDemo {
    public static void main(String[] args) {
        Map<String, Integer> counter = new HashMap<>();
        counter.compute("count", (key, val) -> val == null ? 1 : val + 1);
        counter.compute("count", (key, val) -> val == null ? 1 : val + 1);
        System.out.println("Counter: " + counter.get("count"));

        Map<String, List<String>> usersByRole = new HashMap<>();
        usersByRole.computeIfAbsent("admins", k -> new ArrayList<>()).add("Dattu");
        usersByRole.computeIfAbsent("admins", k -> new ArrayList<>()).add("Ravi");
        System.out.println("Admins: " + usersByRole.get("admins"));

        Map<String, Integer> totals = new HashMap<>();
        totals.merge("total", 100, Integer::sum);
        totals.merge("total", 50, Integer::sum);
        System.out.println("Total: " + totals.get("total"));
    }
}
\`\`\`

---

## TreeMap Navigation

TreeMap is special because keys are sorted. So you can ask: "What is the first key? The last? What comes just before 5?" This is useful for price ranges, score bands, or date ranges.

\`\`\`java
import java.util.TreeMap;

public class TreeMapNavigationDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(1, "One");
        map.put(3, "Three");
        map.put(5, "Five");
        map.put(7, "Seven");

        System.out.println("First key: " + map.firstKey());
        System.out.println("Last key: " + map.lastKey());
        System.out.println("Lower than 5: " + map.lowerKey(5));
        System.out.println("Higher than 5: " + map.higherKey(5));
        System.out.println("Floor of 4: " + map.floorKey(4));
        System.out.println("Ceiling of 4: " + map.ceilingKey(4));
        System.out.println("HeadMap(<5): " + map.headMap(5));
        System.out.println("TailMap(>=5): " + map.tailMap(5));
        System.out.println("SubMap [2,6): " + map.subMap(2, 6));
    }
}
\`\`\`

---

## Real-World Example: Word Counter

Count how many times each word appears — word → count. This is a classic Map use case. The \`merge\` method makes counting clean: if the word exists, add 1; if not, start at 1.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class WordCounterDemo {
    public static void main(String[] args) {
        String text = "Java is powerful and Java is popular";
        Map<String, Integer> wordCount = WordCounter.countWords(text);
        wordCount.forEach((word, count) -> System.out.println(word + " -> " + count));
    }
}

class WordCounter {
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> wordCount = new HashMap<>();
        String[] words = text.toLowerCase().split("\\\\W+");

        for (String word : words) {
            if (!word.isEmpty()) {
                wordCount.merge(word, 1, Integer::sum);
            }
        }
        return wordCount;
    }
}
\`\`\`

---

## Real-World Example: Cache

A cache stores recently used data for fast access — user id → user details. This example builds a simple LRU (Least Recently Used) cache using LinkedHashMap. When the cache is full, the oldest unused entry is removed automatically.

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class SimpleCacheDemo {
    public static void main(String[] args) {
        SimpleCache<String, String> cache = new SimpleCache<>(2);
        cache.put("user:1", "Dattu");
        cache.put("user:2", "Ravi");
        cache.get("user:1");  // mark as recently used
        cache.put("user:3", "Asha");  // evicts user:2 (LRU)

        System.out.println("user:1 -> " + cache.get("user:1"));
        System.out.println("user:2 -> " + cache.get("user:2"));
        System.out.println("user:3 -> " + cache.get("user:3"));
    }
}

class SimpleCache<K, V> {
    private final Map<K, V> cache;
    private final int maxSize;

    public SimpleCache(int maxSize) {
        this.maxSize = maxSize;
        this.cache = new LinkedHashMap<>(maxSize, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > SimpleCache.this.maxSize;
            }
        };
    }

    public V get(K key) {
        return cache.get(key);
    }

    public void put(K key, V value) {
        cache.put(key, value);
    }
}
\`\`\`

---

## When to Use Which Map

| Use Case | Best Choice |
|----------|-------------|
| General purpose (contacts, marks, prices) | HashMap |
| Need insertion order (cart, history) | LinkedHashMap |
| Need sorted keys (sorted reports) | TreeMap |
| Need range queries (scores between 60–80) | TreeMap |
| LRU cache (keep recent items) | LinkedHashMap (access order) |
| Multiple threads accessing the map | ConcurrentHashMap |

**Simple rule:** Start with HashMap. Switch to LinkedHashMap if order matters. Switch to TreeMap if sorting matters.

---

## 10 Important Map Interface Interview Questions

### 1. Why doesn't Map extend Collection?

**Answer:** A List or Set stores individual elements — one item after another. A Map stores **pairs** — key and value together. That is a different idea, so Map has its own interface. You can still get a List-like view through \`keySet()\`, \`values()\`, or \`entrySet()\`, but the core model is key → value, not just "a bag of items."

### 2. HashMap vs Hashtable vs ConcurrentHashMap?

**Answer:** **HashMap** is the normal choice — fast, not thread-safe, allows one null key. **Hashtable** is the old synchronized version — slow, avoid it in new code. **ConcurrentHashMap** is for when multiple threads read and write the same map at the same time. Rule of thumb: HashMap for single-threaded code, ConcurrentHashMap when threads share the map.

### 3. What is load factor and resizing?

**Answer:** HashMap stores entries in buckets. Load factor (default 0.75) means "when the map is 75% full, make it bigger." Java doubles the bucket array and rehashes all entries. This keeps lookups fast. If you know you will store 10,000 entries, create the map with initial capacity to avoid repeated resizing.

### 4. How does HashMap handle hash collisions?

**Answer:** Two different keys can land in the same bucket — that is a collision. HashMap stores them in a linked list inside that bucket. If the list gets too long (Java 8+), it converts to a balanced tree for faster lookup. A bad \`hashCode()\` on your key class causes too many collisions and slows things down.

### 5. Can I use HashMap alone for a cache with expiry?

**Answer:** Not really. A plain HashMap never removes old entries — it keeps growing and can cause memory leaks. For a real cache with size limits or time-to-live (TTL), use libraries like Caffeine or Guava Cache, or an external store like Redis. The SimpleCache example above shows a size-limited cache, but not TTL.

### 6. What is LinkedHashMap access order?

**Answer:** LinkedHashMap can track either **insertion order** (default) or **access order** (when you pass \`true\` in the constructor). Access order moves an entry to the end every time you \`get\` it. That is how LRU caches work — the least recently used entry sits at the front and gets removed first.

### 7. What is IdentityHashMap used for?

**Answer:** Normal maps compare keys with \`equals()\`. IdentityHashMap compares with \`==\` — same object in memory, not just same content. You will rarely use this in business code. It appears inside Java frameworks for internal tracking. For your apps, stick with HashMap.

### 8. WeakHashMap vs HashMap?

**Answer:** In HashMap, as long as you hold the map, keys stay alive. In WeakHashMap, keys are "weak" — if nothing else references the key object, garbage collection can remove that entry automatically. Useful for caches tied to object lifecycle, but tricky to reason about. Not a general-purpose replacement for HashMap.

### 9. How do immutable maps work in Java 9+?

**Answer:** \`Map.of("A", 1, "B", 2)\` creates a small, unchangeable map — you cannot add, remove, or update entries. \`Map.copyOf(existingMap)\` makes a read-only copy. They throw an error if you pass null or duplicate keys. Great for fixed config data like status codes or country codes.

### 10. Why are equals and hashCode important for Map keys?

**Answer:** HashMap uses \`hashCode()\` to pick a bucket and \`equals()\` to find the exact entry inside that bucket. If two keys are equal but have different hash codes, the map breaks — you might store a value but fail to retrieve it. Always override both methods together in custom key classes, and prefer immutable keys (String, Integer) when possible.

---

## Remember These 5 Things

1. **Map = unique keys → values** — like roll number → marks or product id → price.
2. **Default is HashMap** — fast lookup; print order is not guaranteed.
3. **Same key twice replaces the old value** — \`put\` is add or update.
4. **Loop with \`entrySet()\`** when you need both key and value in one pass.
5. **Never change key fields after putting in the map** — broken \`hashCode\` means \`get\` stops working.

---

## What's Next?

You now understand how Maps store key-value pairs — the backbone of lookups in real applications. Here is where to go next:

### Immediate Next Steps

1. **[Queue Interface](/corejava/queue-interface)**: Learn FIFO collections for task queues and waiting lines
2. **[Set Interface](/corejava/set-interface)**: Review unique-element collections (Set is built on Map internally)
3. **[List Interface](/corejava/list-interface)**: Compare ordered lists with indexed access vs key-based lookup

### Practice Ideas

- Build a phone book: name → phone number using TreeMap for sorted names
- Build a product catalog: product id → price using HashMap for fast lookup
- Build a roll-number → marks tracker and print students scoring above 90

### Related Tutorials

- **[Collection Introduction](/corejava/collection-introduction)**: Review the full Java Collections Framework
- **[Core Java MCQ Exam](/tutorial/core-java-mcq)**: Test your Map and Collections knowledge

Maps power caching, configuration, counting, grouping, and indexing in almost every Java backend. Practice the phone book exercise in the practice section below, then move on to [Queue Interface](/corejava/queue-interface).

`,
  code: `// Map Interface Demo

import java.util.*;

public class MapDemo {
    public static void main(String[] args) {
        System.out.println("=== Map Interface Demo ===\\n");
        
        // 1. HASHMAP BASICS
        System.out.println("1. HASHMAP BASICS");
        System.out.println("   ---------------");
        
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 28);
        ages.put("Alice", 26);  // Replaces previous value
        
        System.out.println("   Map: " + ages);
        System.out.println("   Alice's age: " + ages.get("Alice"));
        System.out.println("   Contains 'Bob': " + ages.containsKey("Bob"));
        System.out.println("   Contains age 30: " + ages.containsValue(30));
        System.out.println("   Size: " + ages.size());
        System.out.println();
        
        // 2. LINKEDHASHMAP - Maintains insertion order
        System.out.println("2. LINKEDHASHMAP");
        System.out.println("   --------------");
        
        Map<String, String> linkedMap = new LinkedHashMap<>();
        linkedMap.put("first", "1st");
        linkedMap.put("second", "2nd");
        linkedMap.put("third", "3rd");
        
        System.out.println("   LinkedHashMap: " + linkedMap);
        System.out.println("   (Maintains insertion order)");
        System.out.println();
        
        // 3. TREEMAP - Sorted by keys
        System.out.println("3. TREEMAP");
        System.out.println("   --------");
        
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Charlie", 3);
        treeMap.put("Alice", 1);
        treeMap.put("Bob", 2);
        
        System.out.println("   TreeMap: " + treeMap);
        System.out.println("   (Sorted by keys)");
        
        TreeMap<Integer, String> scores = new TreeMap<>();
        scores.put(85, "B");
        scores.put(95, "A");
        scores.put(75, "C");
        scores.put(65, "D");
        
        System.out.println("\\n   Scores: " + scores);
        System.out.println("   First key: " + scores.firstKey());
        System.out.println("   Last key: " + scores.lastKey());
        System.out.println("   Floor of 80: " + scores.floorKey(80));
        System.out.println("   Ceiling of 80: " + scores.ceilingKey(80));
        System.out.println();
        
        // 4. ITERATION METHODS
        System.out.println("4. ITERATION METHODS");
        System.out.println("   ------------------");
        
        Map<String, Double> prices = new HashMap<>();
        prices.put("Apple", 1.50);
        prices.put("Banana", 0.75);
        prices.put("Orange", 2.00);
        
        System.out.println("   Using entrySet:");
        for (Map.Entry<String, Double> entry : prices.entrySet()) {
            System.out.println("     " + entry.getKey() + ": $" + entry.getValue());
        }
        
        System.out.println("\\n   Using forEach:");
        prices.forEach((fruit, price) -> 
            System.out.println("     " + fruit + ": $" + price));
        System.out.println();
        
        // 5. ADVANCED OPERATIONS
        System.out.println("5. ADVANCED OPERATIONS (Java 8+)");
        System.out.println("   ------------------------------");
        
        Map<String, Integer> inventory = new HashMap<>();
        
        // putIfAbsent
        inventory.putIfAbsent("Laptop", 10);
        inventory.putIfAbsent("Laptop", 20);  // Won't replace
        System.out.println("   After putIfAbsent: " + inventory);
        
        // getOrDefault
        int phones = inventory.getOrDefault("Phone", 0);
        System.out.println("   Phones (default 0): " + phones);
        
        // compute
        inventory.compute("Laptop", (k, v) -> v + 5);
        System.out.println("   After compute +5: " + inventory);
        
        // merge
        inventory.merge("Laptop", 3, Integer::sum);
        System.out.println("   After merge +3: " + inventory);
        System.out.println();
        
        // 6. WORD COUNTER
        System.out.println("6. WORD COUNTER");
        System.out.println("   -------------");
        
        String text = "Java is great and Java is powerful and Java is everywhere";
        Map<String, Integer> wordCount = new HashMap<>();
        
        for (String word : text.toLowerCase().split(" ")) {
            wordCount.merge(word, 1, Integer::sum);
        }
        
        System.out.println("   Text: " + text);
        System.out.println("   Word counts: " + wordCount);
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE - Student Grades
        System.out.println("7. REAL-WORLD EXAMPLE - Student Grades");
        System.out.println("   ------------------------------------");
        
        GradeBook gradeBook = new GradeBook();
        gradeBook.addGrade("Alice", "Math", 95);
        gradeBook.addGrade("Alice", "Science", 88);
        gradeBook.addGrade("Alice", "English", 92);
        gradeBook.addGrade("Bob", "Math", 78);
        gradeBook.addGrade("Bob", "Science", 85);
        
        System.out.println("   Alice's grades: " + gradeBook.getGrades("Alice"));
        System.out.println("   Alice's average: " + gradeBook.getAverage("Alice"));
        System.out.println("   Bob's grades: " + gradeBook.getGrades("Bob"));
        System.out.println("   Bob's average: " + gradeBook.getAverage("Bob"));
        System.out.println();
        
        // 8. SHOPPING CART
        System.out.println("8. SHOPPING CART");
        System.out.println("   --------------");
        
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Laptop", 999.99, 1);
        cart.addItem("Mouse", 29.99, 2);
        cart.addItem("Keyboard", 79.99, 1);
        cart.addItem("Mouse", 29.99, 1);  // Add more
        
        cart.display();
        System.out.println("   Total: $" + String.format("%.2f", cart.getTotal()));
    }
}

// Grade Book using nested maps
class GradeBook {
    private Map<String, Map<String, Integer>> studentGrades = new HashMap<>();
    
    public void addGrade(String student, String subject, int grade) {
        studentGrades.computeIfAbsent(student, k -> new HashMap<>())
                     .put(subject, grade);
    }
    
    public Map<String, Integer> getGrades(String student) {
        return studentGrades.getOrDefault(student, new HashMap<>());
    }
    
    public double getAverage(String student) {
        Map<String, Integer> grades = getGrades(student);
        if (grades.isEmpty()) return 0;
        
        return grades.values().stream()
                     .mapToInt(Integer::intValue)
                     .average()
                     .orElse(0);
    }
}

// Shopping Cart using Map
class ShoppingCart {
    private Map<String, CartItem> items = new LinkedHashMap<>();
    
    public void addItem(String name, double price, int quantity) {
        items.compute(name, (k, existing) -> {
            if (existing == null) {
                return new CartItem(name, price, quantity);
            }
            existing.quantity += quantity;
            return existing;
        });
    }
    
    public void removeItem(String name) {
        items.remove(name);
    }
    
    public double getTotal() {
        return items.values().stream()
                    .mapToDouble(item -> item.price * item.quantity)
                    .sum();
    }
    
    public void display() {
        System.out.println("   Shopping Cart:");
        items.forEach((name, item) -> 
            System.out.println("     " + name + " x" + item.quantity + 
                             " @ $" + item.price + " = $" + 
                             String.format("%.2f", item.price * item.quantity)));
    }
    
    private static class CartItem {
        String name;
        double price;
        int quantity;
        
        CartItem(String name, double price, int quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a phone book application using Map',
      hint: 'Store contacts with name as key and phone number as value',
      starterCode: `import java.util.*;

public class PhoneBookDemo {
    public static void main(String[] args) {
        System.out.println("=== Phone Book ===\\n");
        
        PhoneBook phoneBook = new PhoneBook();
        
        // Add contacts
        phoneBook.addContact("Alice", "555-1234");
        phoneBook.addContact("Bob", "555-5678");
        phoneBook.addContact("Charlie", "555-9012");
        phoneBook.addContact("Alice", "555-4321");  // Update Alice's number
        
        // Display all contacts
        phoneBook.displayAll();
        
        // Search
        System.out.println("\\nSearching for 'Bob': " + phoneBook.search("Bob"));
        System.out.println("Searching for 'David': " + phoneBook.search("David"));
        
        // Search by partial name
        System.out.println("\\nContacts starting with 'A':");
        phoneBook.searchByPrefix("A").forEach(
            (name, phone) -> System.out.println("  " + name + ": " + phone));
        
        // Delete
        System.out.println("\\nDeleting 'Charlie'...");
        phoneBook.deleteContact("Charlie");
        
        // Display again
        System.out.println("\\nAfter deletion:");
        phoneBook.displayAll();
    }
}

class PhoneBook {
    private Map<String, String> contacts = new TreeMap<>();  // Sorted by name
    
    public void addContact(String name, String phone) {
        contacts.put(name, phone);
        System.out.println("Added/Updated: " + name + " -> " + phone);
    }
    
    public String search(String name) {
        return contacts.getOrDefault(name, "Not found");
    }
    
    public Map<String, String> searchByPrefix(String prefix) {
        Map<String, String> results = new TreeMap<>();
        contacts.forEach((name, phone) -> {
            if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
                results.put(name, phone);
            }
        });
        return results;
    }
    
    public void deleteContact(String name) {
        if (contacts.remove(name) != null) {
            System.out.println("Deleted: " + name);
        } else {
            System.out.println("Contact not found: " + name);
        }
    }
    
    public void displayAll() {
        System.out.println("All Contacts (" + contacts.size() + "):");
        contacts.forEach((name, phone) -> 
            System.out.println("  " + name + ": " + phone));
    }
}`
    }
  ]
};

export default mapInterface;
