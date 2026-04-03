const mapInterface = {
  id: 'map-interface',
  title: 'Map Interface',
  description: 'Key-value pair collections for fast lookups',
  content: `
# Map Interface — Key-Value Storage

A Map is like a dictionary — you look up a word (key) to find its definition (value). Each key maps to exactly one value, and keys must be unique. Maps are incredibly useful for fast lookups, caching, and storing relationships.

---

## Map Characteristics

- **Key-Value pairs** — Each entry has a key and a value
- **Unique keys** — No duplicate keys (values can duplicate)
- **One value per key** — Adding same key replaces value
- **Null handling** — Depends on implementation

---

## Map Implementations

### HashMap
- **Order:** No guaranteed order
- **Performance:** O(1) for get/put
- **Null:** One null key, multiple null values
- **Best for:** General purpose, fast lookups

\`\`\`java
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.put("Bob", 30);
int age = ages.get("Alice");  // 25
\`\`\`

### LinkedHashMap
- **Order:** Insertion order (or access order)
- **Performance:** Slightly slower than HashMap
- **Best for:** When iteration order matters

\`\`\`java
Map<String, Integer> orderedMap = new LinkedHashMap<>();
orderedMap.put("First", 1);
orderedMap.put("Second", 2);
// Iteration: First, Second (insertion order)
\`\`\`

### TreeMap
- **Order:** Sorted by keys
- **Performance:** O(log n) for operations
- **Null:** No null keys
- **Best for:** Sorted key iteration, range queries

\`\`\`java
Map<String, Integer> sortedMap = new TreeMap<>();
sortedMap.put("Charlie", 3);
sortedMap.put("Alice", 1);
sortedMap.put("Bob", 2);
// Iteration: Alice, Bob, Charlie (sorted)
\`\`\`

### Hashtable (Legacy)
- **Thread-safe** but slow
- **Use instead:** \`ConcurrentHashMap\`

---

## Comparison Table

| Feature | HashMap | LinkedHashMap | TreeMap |
|---------|---------|---------------|---------|
| Order | None | Insertion | Sorted |
| Null keys | Yes (one) | Yes (one) | No |
| Performance | O(1) | O(1) | O(log n) |
| Thread-safe | No | No | No |

---

## Common Map Operations

### Creating Maps

\`\`\`java
// Empty map
Map<String, Integer> map1 = new HashMap<>();

// With initial capacity
Map<String, Integer> map2 = new HashMap<>(100);

// Immutable map (Java 9+)
Map<String, Integer> map3 = Map.of("A", 1, "B", 2);

// From entries (Java 9+)
Map<String, Integer> map4 = Map.ofEntries(
    Map.entry("A", 1),
    Map.entry("B", 2)
);
\`\`\`

### Adding/Updating Entries

\`\`\`java
map.put("key", value);           // Add or replace
map.putIfAbsent("key", value);   // Add only if key doesn't exist
map.putAll(otherMap);            // Add all from another map
map.replace("key", newValue);    // Replace if exists
map.replace("key", oldVal, newVal); // Replace if value matches
\`\`\`

### Getting Values

\`\`\`java
Integer value = map.get("key");           // null if not found
Integer value = map.getOrDefault("key", 0); // default if not found
\`\`\`

### Removing Entries

\`\`\`java
map.remove("key");               // Remove by key
map.remove("key", value);        // Remove if value matches
map.clear();                     // Remove all
\`\`\`

### Checking Contents

\`\`\`java
boolean hasKey = map.containsKey("key");
boolean hasValue = map.containsValue(100);
boolean empty = map.isEmpty();
int size = map.size();
\`\`\`

---

## Iterating Over Maps

\`\`\`java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.put("Charlie", 92);

// 1. Iterate over entries (most common)
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 2. Iterate over keys
for (String name : scores.keySet()) {
    System.out.println(name + ": " + scores.get(name));
}

// 3. Iterate over values
for (Integer score : scores.values()) {
    System.out.println(score);
}

// 4. forEach with lambda (Java 8+)
scores.forEach((name, score) -> 
    System.out.println(name + ": " + score));

// 5. Stream API
scores.entrySet().stream()
      .filter(e -> e.getValue() > 90)
      .forEach(e -> System.out.println(e.getKey()));
\`\`\`

---

## Advanced Operations (Java 8+)

### compute — Calculate value based on key

\`\`\`java
// Increment counter
map.compute("count", (key, val) -> val == null ? 1 : val + 1);
\`\`\`

### computeIfAbsent — Calculate only if key missing

\`\`\`java
// Initialize list if not exists
map.computeIfAbsent("users", k -> new ArrayList<>()).add(" Dattu");
\`\`\`

### merge — Combine values

\`\`\`java
// Sum values for same key
map.merge("total", 100, Integer::sum);
\`\`\`

---

## TreeMap Navigation

\`\`\`java
TreeMap<Integer, String> map = new TreeMap<>();
map.put(1, "One");
map.put(3, "Three");
map.put(5, "Five");
map.put(7, "Seven");

map.firstKey();      // 1
map.lastKey();       // 7
map.lowerKey(5);     // 3 (largest < 5)
map.higherKey(5);    // 7 (smallest > 5)
map.floorKey(4);     // 3 (largest <= 4)
map.ceilingKey(4);   // 5 (smallest >= 4)

map.headMap(5);      // {1=One, 3=Three}
map.tailMap(5);      // {5=Five, 7=Seven}
map.subMap(2, 6);    // {3=Three, 5=Five}
\`\`\`

---

## Real-World Example: Word Counter

\`\`\`java
public class WordCounter {
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> wordCount = new HashMap<>();
        
        String[] words = text.toLowerCase().split("\\\\W+");
        
        for (String word : words) {
            wordCount.merge(word, 1, Integer::sum);
        }
        
        return wordCount;
    }
}
\`\`\`

---

## Real-World Example: Cache

\`\`\`java
public class SimpleCache<K, V> {
    private final Map<K, V> cache;
    private final int maxSize;
    
    public SimpleCache(int maxSize) {
        this.maxSize = maxSize;
        // LinkedHashMap with access-order for LRU
        this.cache = new LinkedHashMap<>(maxSize, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > maxSize;
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
| General purpose | HashMap |
| Need insertion order | LinkedHashMap |
| Need sorted keys | TreeMap |
| Need range queries | TreeMap |
| LRU cache | LinkedHashMap (access order) |
| Thread-safe | ConcurrentHashMap |

---

## 10 Important Map Interface Interview Questions

### 1. Why doesn’t Map extend Collection?
**Answer:** Different abstraction—key-value pairs vs elements—separate hierarchy with \`entrySet\`, \`keySet\`, \`values\` bridging views.
Design clarity.

### 2. HashMap vs Hashtable vs ConcurrentHashMap?
**Answer:** HashMap unsynchronized null-friendly one null key; Hashtable legacy synchronized; CHM segmented locking/JDK8+ node locking for concurrency.
Default new code: HashMap single-thread, CHM concurrent.

### 3. What is load factor and resizing?
**Answer:** When size/capacity exceeds load factor threshold, HashMap doubles capacity and rehashes—amortized cost—tune initial capacity if known size.
Rehashing pauses can hurt latency spikes.

### 4. Hash collision handling in HashMap?
**Answer:** Separate chaining with linked lists → treeification for long chains—O(log n) worst per bucket after Java 8.
Poor hash function degrades to trees.

### 5. Scenario: cache with TTL—use HashMap alone?
**Answer:** No—needs eviction—use Caffeine, Guava Cache, or Redis—HashMap grows unbounded leaks memory.
Know off-heap and concurrent requirements.

### 6. What is \`LinkedHashMap\` access order?
**Answer:** Can maintain insertion or access order—basis for LRU caches with removeEldestEntry override.
Simple LRU pattern.

### 7. IdentityHashMap purpose?
**Answer:** Reference identity (\`==\`) instead of equals—rare—framework internals, serialization tracking—don’t use for business keys normally.

### 8. WeakHashMap vs HashMap?
**Answer:** Keys held weakly—entries disappear when keys GC—useful for canonical registries without preventing GC—subtle lifecycle semantics.
Not a general cache.

### 9. Immutable maps in Java 9+?
**Answer:** \`Map.of\` and \`Map.copyOf\`—compact immutable maps—fail on duplicate keys—null-prohibited.
Prefer for static catalogs.

### 10. Why \`equals\` and \`hashCode\` for keys critical?
**Answer:** Buckets determined by hash—equal keys must land in same bucket—broken equals/hash loses entries or duplicates.
Immutable keys strongly recommended.

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
