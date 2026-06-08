const collectionIntroduction = {
  id: 'collection-introduction',
  title: 'Java Collections Framework - Complete Guide',
  description: 'Complete guide to Java Collections Framework - interfaces, implementations, and algorithms',
  content: `
# Java Collections Framework — Your Starting Point

Welcome! If you are new to Java, this is where storing groups of data gets much easier.

You already know **arrays** — they hold multiple values in one variable. But arrays have a catch: once you create an array of size 5, it stays size 5. You cannot easily add a 6th item.

**Collections** solve that. They grow and shrink as you add or remove items — like the difference between a fixed-page notebook and an expandable file folder.

The Java Collections Framework gives you ready-made data structures for almost every situation: shopping lists, unique tags, waiting lines, and lookup tables.

---

## Understand Deeply — Why Arrays Are Not Enough

Suppose you build a college app and store student names in an array:

\`\`\`java
String[] students = new String[3];
students[0] = "Ravi";
students[1] = "Priya";
students[2] = "Amit";
// A 4th student joins — now what?
\`\`\`

With a fixed array of size 3, you cannot simply add a 4th name. You must create a **new bigger array**, copy all old names, add the new one, and replace the reference. Every time the class grows, you repeat this work.

Collections handle that growth for you. When you call \`list.add("NewStudent")\`, Java expands storage behind the scenes. You focus on business logic, not array resizing.

**Another pain with arrays:** Finding "does this email already exist?" means looping the entire array every time. A \`HashSet\` or \`HashMap\` answers that question much faster in large data.

---

## Arrays vs Collections — Quick Comparison

| | Arrays | Collections |
|---|--------|-------------|
| **Size** | Fixed at creation | Grows and shrinks automatically |
| **Adding items** | Tricky — need a new array | Simple — just call \`add()\` |
| **Everyday analogy** | A notebook with exactly 10 pages | An expandable file folder |
| **Duplicates** | Allowed | Depends on type (List yes, Set no) |
| **Lookup by key** | Not built in | Map does this for you |

You will still use arrays for simple, fixed-size data. But for most application code — user lists, product catalogs, order queues — collections are the standard choice.

---

## The Four Collection Types — At a Glance

Think of the framework as four tools in your toolbox. Each solves a different everyday problem:

| Type | Real-life analogy | What it does | Common class |
|------|-------------------|--------------|--------------|
| **List** | Numbered to-do list | Ordered, duplicates OK, access by index | \`ArrayList\` |
| **Set** | Guest list (no repeats) | Unique items only, no duplicates | \`HashSet\` |
| **Queue** | Bus ticket waiting line | First in, first out (FIFO) | \`ArrayDeque\` |
| **Map** | Phone contacts (name → number) | Key-value pairs, fast lookup | \`HashMap\` |

\`Map\` is slightly different — it does not extend \`Collection\`, but every Java developer uses it alongside the other three.

### How they connect (simple view)

| Interface | Extends | Popular implementations |
|-----------|---------|------------------------|
| \`List\` | \`Collection\` | \`ArrayList\`, \`LinkedList\` |
| \`Set\` | \`Collection\` | \`HashSet\`, \`TreeSet\`, \`LinkedHashSet\` |
| \`Queue\` | \`Collection\` | \`ArrayDeque\`, \`PriorityQueue\`, \`LinkedList\` |
| \`Map\` | (separate hierarchy) | \`HashMap\`, \`TreeMap\`, \`LinkedHashMap\` |

Do not worry about memorizing every class now. Learn the four types first — the details come in the next lessons.

### Pick the right type in 30 seconds

Ask yourself these questions in order:

1. **Do I need key → value lookup?** (roll number → marks, product id → price) → use **Map** (\`HashMap\`)
2. **Must every item be unique?** (emails, tags, visited URLs) → use **Set** (\`HashSet\`)
3. **Must the first item added be processed first?** (ticket line, print queue) → use **Queue** (\`ArrayDeque\`)
4. **Otherwise** — you need order and maybe duplicates → use **List** (\`ArrayList\`)

Most beginner and intermediate projects spend most of their time on **ArrayList** and **HashMap**. Learn those two deeply first.

### What does \`List<String>\` mean?

The part in angle brackets is **generics**. It tells Java: "this collection holds only Strings."

\`\`\`java
List<String> names = new ArrayList<>();  // OK
names.add("Ravi");                        // OK
// names.add(101);                        // Compile error — wrong type
\`\`\`

This catches mistakes at compile time instead of runtime. You will see \`List<String>\`, \`Map<Integer, String>\`, \`Set<User>\` everywhere in real code.

---

## The Four Types in Plain English

### 1. List — Your Numbered To-Do List

A List keeps items in order, allows duplicates, and lets you ask for "item number 3." Like a numbered shopping list where you can add "milk" twice.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class ListInterfaceOverviewDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Apple");  // Duplicates allowed

        System.out.println("List: " + list);
        System.out.println("Index 0: " + list.get(0));
    }
}
\`\`\`

### 2. Set — Your Guest List (No Duplicates)

A Set is like a party guest list — each name appears only once. Add "Apple" twice and the second one is ignored. You cannot access items by index.

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class SetInterfaceOverviewDemo {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple");  // Ignored - no duplicates

        System.out.println("Set: " + set);
        System.out.println("Size: " + set.size());
        // set.get(0);  // NOT ALLOWED - no index access
    }
}
\`\`\`

### 3. Queue — The Waiting Line

A Queue is a waiting line — first person in is first person served. Bus tickets, print jobs, hospital tokens — all FIFO. You add at the back and remove from the front.

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class QueueInterfaceOverviewDemo {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");

        String removed = queue.poll();
        System.out.println("Removed: " + removed);
        System.out.println("Remaining: " + queue);
    }
}
\`\`\`

### 4. Map — Your Phone Contacts

A Map stores pairs: a key and a value. Like your phone contacts — name (key) maps to phone number (value). Look up "Ravi" and get his number instantly. Keys must be unique; values can repeat.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class MapInterfaceOverviewDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Apple", 100);
        map.put("Banana", 50);

        System.out.println("Apple price: " + map.get("Apple"));
        System.out.println("All entries: " + map);
    }
}
\`\`\`

---

## Popular Implementations — Simple Comparison

You do not need to memorize all of these on day one. Here is a quick reference for when you start coding:

| Class | Type | Best for | Fresher tip |
|-------|------|----------|-------------|
| \`ArrayList\` | List | Most everyday lists | **Default choice** for lists |
| \`LinkedList\` | List | Frequent add/remove at ends | Rarely needed as a beginner |
| \`HashSet\` | Set | Unique items, no order needed | **Default choice** for sets |
| \`TreeSet\` | Set | Unique items, sorted order | Use when you need alphabetical order |
| \`ArrayDeque\` | Queue/Deque | Waiting lines, stacks | **Default choice** for queues |
| \`PriorityQueue\` | Queue | Urgent-first processing | Tasks with priority levels |
| \`HashMap\` | Map | Fast key-value lookup | **Default choice** for maps |
| \`TreeMap\` | Map | Sorted by key | Price-sorted product lists |
| \`LinkedHashMap\` | Map | Keeps insertion order | "Recently viewed" features |

Avoid \`Vector\`, \`Stack\`, and \`Hashtable\` in new code — they are legacy classes from older Java.

---

## When to Use Which Collection?

Use this table as your cheat sheet. When in doubt, the **Default choice** column is your safe pick:

| You need to... | Use this | Default choice |
|----------------|----------|----------------|
| Store a list of students in order | \`ArrayList\` | \`ArrayList\` |
| Make sure email addresses are unique | \`HashSet\` | \`HashSet\` |
| Process orders first-come-first-served | \`ArrayDeque\` as Queue | \`ArrayDeque\` |
| Look up a student by roll number | \`HashMap\` | \`HashMap\` |
| Show unique tags in the order they were added | \`LinkedHashSet\` | — |
| Sort beneficiaries alphabetically | \`TreeSet\` | — |
| Show products from cheapest to most expensive | \`TreeMap\` | — |
| Handle urgent tasks before normal ones | \`PriorityQueue\` | — |
| Track recently viewed pages in order | \`LinkedHashMap\` | — |

---

## Methods You Will Use Daily

You do not need to memorize every method. These are the ones you will type most often:

| Type | Add | Remove | Look up | Check size |
|------|-----|--------|---------|------------|
| **List** | \`add(item)\` | \`remove(item)\` | \`get(index)\` | \`size()\` |
| **Set** | \`add(item)\` | \`remove(item)\` | \`contains(item)\` | \`size()\` |
| **Queue** | \`offer(item)\` | \`poll()\` | \`peek()\` | \`size()\` |
| **Map** | \`put(key, value)\` | \`remove(key)\` | \`get(key)\` | \`size()\` |

All types also support \`isEmpty()\`, \`clear()\`, and looping with a for-each loop.

---

## Real-World Example: E-Commerce Product Catalog

Every online store — Amazon, Flipkart, or a college project — mixes all four collection types. Before you run the code, map each part to a real feature:

| Code section | Collection | Real app feature |
|--------------|------------|------------------|
| Product list | \`ArrayList\` | Search results page — scrollable, ordered list |
| Categories | \`HashSet\` | Filter sidebar — each category shown once |
| Product prices | \`HashMap\` | "Get price for PROD-001" — instant lookup |
| Recently viewed | \`LinkedHashMap\` | "You viewed these last" — order preserved |
| Sort by price | \`TreeMap\` | "Cheapest first" — keys sorted automatically |
| Order queue | \`Queue\` | Warehouse processes orders first-come-first-served |

This program shows how a real e-commerce app might use them together.

\`\`\`java
// Real-Time: E-Commerce using Collections
// Used in Amazon, Flipkart, eBay

import java.util.*;

public class ECommerceCollections {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🛒 E-COMMERCE COLLECTIONS DEMO              ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // 1. ArrayList - Product Listing
        // ═══════════════════════════════════════════════════
        System.out.println("\\n📦 1. ArrayList - Product Listing");
        System.out.println("─".repeat(50));
        
        List<String> products = new ArrayList<>();
        products.add("iPhone 15 Pro - $999");
        products.add("Samsung S24 Ultra - $899");
        products.add("MacBook Pro - $1999");
        products.add("Dell XPS 15 - $1499");
        
        System.out.println("Products in catalog:");
        for(int i = 0; i < products.size(); i++) {
            System.out.println("  [" + i + "] " + products.get(i));
        }
        System.out.println("Use Case: Search results, category products");
        System.out.println("Why ArrayList: Fast random access O(1)");
        
        // ═══════════════════════════════════════════════════
        // 2. HashSet - Unique Categories
        // ═══════════════════════════════════════════════════
        System.out.println("\\n🏷️ 2. HashSet - Unique Categories");
        System.out.println("─".repeat(50));
        
        Set<String> categories = new HashSet<>();
        categories.add("Electronics");
        categories.add("Mobiles");
        categories.add("Laptops");
        categories.add("Electronics");  // Duplicate - ignored
        categories.add("Mobiles");      // Duplicate - ignored
        
        System.out.println("Categories (duplicates removed):");
        for(String cat : categories) {
            System.out.println("  • " + cat);
        }
        System.out.println("Use Case: Filter options, tag cloud");
        System.out.println("Why HashSet: No duplicates, O(1) lookup");
        
        // ═══════════════════════════════════════════════════
        // 3. HashMap - Product Details
        // ═══════════════════════════════════════════════════
        System.out.println("\\n📋 3. HashMap - Product Details");
        System.out.println("─".repeat(50));
        
        Map<String, Double> productPrices = new HashMap<>();
        productPrices.put("PROD-001", 999.99);
        productPrices.put("PROD-002", 899.99);
        productPrices.put("PROD-003", 1999.99);
        
        System.out.println("Product Price Lookup:");
        for(Map.Entry<String, Double> entry : productPrices.entrySet()) {
            System.out.println("  " + entry.getKey() + " → $" + entry.getValue());
        }
        System.out.println("Use Case: Product detail page, cart items");
        System.out.println("Why HashMap: O(1) access by key");
        
        // ═══════════════════════════════════════════════════
        // 4. LinkedHashMap - Recently Viewed
        // ═══════════════════════════════════════════════════
        System.out.println("\\n👁️ 4. LinkedHashMap - Recently Viewed");
        System.out.println("─".repeat(50));
        
        Map<String, String> recentlyViewed = new LinkedHashMap<>();
        recentlyViewed.put("10:30", "iPhone 15 Pro");
        recentlyViewed.put("10:35", "MacBook Pro");
        recentlyViewed.put("10:40", "AirPods Pro");
        
        System.out.println("Recently Viewed (maintains order):");
        for(Map.Entry<String, String> entry : recentlyViewed.entrySet()) {
            System.out.println("  " + entry.getKey() + " - " + entry.getValue());
        }
        System.out.println("Use Case: Browsing history, recent searches");
        System.out.println("Why LinkedHashMap: Maintains insertion order");
        
        // ═══════════════════════════════════════════════════
        // 5. TreeMap - Price Sorting
        // ═══════════════════════════════════════════════════
        System.out.println("\\n💰 5. TreeMap - Price Sorting");
        System.out.println("─".repeat(50));
        
        Map<Double, String> sortedByPrice = new TreeMap<>();
        sortedByPrice.put(999.99, "iPhone 15 Pro");
        sortedByPrice.put(1999.99, "MacBook Pro");
        sortedByPrice.put(249.99, "AirPods Pro");
        sortedByPrice.put(899.99, "Samsung S24");
        
        System.out.println("Products sorted by price:");
        for(Map.Entry<Double, String> entry : sortedByPrice.entrySet()) {
            System.out.println("  $" + entry.getKey() + " - " + entry.getValue());
        }
        System.out.println("Use Case: Price filter (low to high)");
        System.out.println("Why TreeMap: Automatically sorted by key");
        
        // ═══════════════════════════════════════════════════
        // 6. Queue - Order Processing
        // ═══════════════════════════════════════════════════
        System.out.println("\\n📬 6. Queue - Order Processing");
        System.out.println("─".repeat(50));
        
        Queue<String> orderQueue = new LinkedList<>();
        orderQueue.offer("Order #1001 -  Dattu");
        orderQueue.offer("Order #1002 - Jane");
        orderQueue.offer("Order #1003 - Bob");
        
        System.out.println("Order Queue (FIFO):");
        while(!orderQueue.isEmpty()) {
            System.out.println("  Processing: " + orderQueue.poll());
        }
        System.out.println("Use Case: Order processing, task queue");
        System.out.println("Why Queue: First-come-first-served");
    }
}
\`\`\`

---

## Real-World Example: Banking System

Banks use the same collection patterns. Account lookup is a \`HashMap\` (account number → balance), transaction history is an \`ArrayList\` (ordered records), beneficiaries are a \`TreeSet\` (sorted names, no duplicates), and high-value transactions get processed first via \`PriorityQueue\`:

\`\`\`java
// Real-Time: Banking System using Collections
// Used in HDFC, ICICI, SBI applications

import java.util.*;

public class BankingCollections {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🏦 BANKING COLLECTIONS DEMO                 ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // 1. HashMap - Account Lookup
        System.out.println("\\n💳 1. HashMap - Account Lookup");
        System.out.println("─".repeat(50));
        
        Map<String, Double> accounts = new HashMap<>();
        accounts.put("ACC-1001", 50000.00);
        accounts.put("ACC-1002", 75000.00);
        accounts.put("ACC-1003", 25000.00);
        
        System.out.println("Account Balances:");
        for(Map.Entry<String, Double> entry : accounts.entrySet()) {
            System.out.println("  " + entry.getKey() + " → $" + 
                String.format("%,.2f", entry.getValue()));
        }
        
        // 2. ArrayList - Transaction History
        System.out.println("\\n📜 2. ArrayList - Transaction History");
        System.out.println("─".repeat(50));
        
        List<String> transactions = new ArrayList<>();
        transactions.add("2024-01-15 | CREDIT | $5000 | Salary");
        transactions.add("2024-01-16 | DEBIT  | $500  | ATM Withdrawal");
        transactions.add("2024-01-17 | DEBIT  | $150  | Amazon");
        
        System.out.println("Recent Transactions:");
        for(String txn : transactions) {
            System.out.println("  " + txn);
        }
        
        // 3. TreeSet - Sorted Beneficiaries
        System.out.println("\\n👥 3. TreeSet - Sorted Beneficiaries");
        System.out.println("─".repeat(50));
        
        Set<String> beneficiaries = new TreeSet<>();
        beneficiaries.add("Dattu p - ACC-2001");
        beneficiaries.add("Alice Smith - ACC-2002");
        beneficiaries.add("Bob Wilson - ACC-2003");
        
        System.out.println("Beneficiaries (sorted alphabetically):");
        for(String ben : beneficiaries) {
            System.out.println("  • " + ben);
        }
        
        // 4. PriorityQueue - Transaction Priority
        System.out.println("\\n⚡ 4. PriorityQueue - Transaction Priority");
        System.out.println("─".repeat(50));
        
        PriorityQueue<Integer> priorityTxn = new PriorityQueue<>(
            Collections.reverseOrder()
        );
        priorityTxn.offer(1000);
        priorityTxn.offer(50000);
        priorityTxn.offer(500);
        priorityTxn.offer(10000);
        
        System.out.println("Processing by amount (highest first):");
        while(!priorityTxn.isEmpty()) {
            System.out.println("  Processing: $" + priorityTxn.poll());
        }
    }
}
\`\`\`

---

## Iterating Collections

The easiest way to loop through any collection is the **for-each loop**. You will also see \`Iterator\` and \`forEach\` in real projects. Here are all the common approaches:

\`\`\`java
import java.util.*;

public class CollectionIterationDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        System.out.println("=== For-each ===");
        for (String item : list) {
            System.out.println(item);
        }

        System.out.println("\\n=== Iterator ===");
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        System.out.println("\\n=== ListIterator ===");
        ListIterator<String> lit = list.listIterator();
        while (lit.hasNext()) {
            System.out.println(lit.next());
        }

        System.out.println("\\n=== forEach lambda ===");
        list.forEach(item -> System.out.println(item));

        System.out.println("\\n=== Stream ===");
        list.stream().forEach(System.out::println);

        System.out.println("\\n=== Indexed for ===");
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }
    }
}
\`\`\`

---

## Key Takeaways

- **Arrays** are fixed size; **collections** grow and shrink
- Four types to remember: **List**, **Set**, **Queue**, **Map**
- Default choices: \`ArrayList\`, \`HashSet\`, \`ArrayDeque\`, \`HashMap\`
- Pick the collection based on what your data needs — order, uniqueness, waiting line, or key lookup
- The for-each loop works on every collection type

---

## 10 Important Collections Framework Interview Questions

### 1. What are the main interfaces in the Java Collections Framework?
**Answer:** \`List\`, \`Set\`, \`Queue\`, and \`Map\`. The first three extend \`Collection\`; \`Map\` is separate but equally important. Pick based on whether you need order, uniqueness, FIFO, or key-value lookup.

### 2. What is the difference between Iterable and Collection?
**Answer:** \`Iterable\` just lets you loop (the for-each loop). \`Collection\` adds useful methods like \`add\`, \`remove\`, \`size\`, and \`contains\`. Every List, Set, and Queue is a Collection.

### 3. Why should I avoid Vector and Hashtable?
**Answer:** They are old, synchronized classes from Java 1.0. They are slower than modern alternatives. Use \`ArrayList\` instead of \`Vector\`, and \`HashMap\` or \`ConcurrentHashMap\` instead of \`Hashtable\`.

### 4. What is a fail-fast iterator?
**Answer:** If you add or remove items from a collection while looping over it (without using the iterator's own \`remove\` method), Java throws \`ConcurrentModificationException\`. This catches a common beginner mistake.

### 5. You need to count unique website visitors — List or Set?
**Answer:** \`Set\`, specifically \`HashSet\`. A Set automatically ignores duplicates. With a List, you would have to manually check \`contains()\` before every \`add()\` — slow and error-prone.

### 6. What is Collections.unmodifiableList?
**Answer:** It wraps a list so nobody can add or remove items — useful when you want to return data from a method without letting callers change it. The underlying list can still change if you hold a reference to it.

### 7. Why do we use generics with collections?
**Answer:** \`List<String>\` tells the compiler "this list only holds Strings." You get compile-time safety instead of a runtime \`ClassCastException\`. Always use generics — never raw types like \`List\` without the angle brackets.

### 8. What is Comparable vs Comparator?
**Answer:** \`Comparable\` is built into the class itself (natural ordering, like numbers). \`Comparator\` is an external sorting rule you pass in. \`TreeSet\` and \`TreeMap\` need one or the other to know how to sort.

### 9. ArrayList vs LinkedList — which is faster?
**Answer:** \`ArrayList\` for almost everything. It gives O(1) access by index. \`LinkedList\` is only better if you constantly add/remove at both ends and never need random access. In practice, \`ArrayList\` wins 95% of the time.

### 10. Why do Set and Map care about equals() and hashCode()?
**Answer:** \`HashSet\` and \`HashMap\` use \`hashCode()\` to find items quickly and \`equals()\` to check if two items are the same. If you use custom objects as keys, you must override both methods. Never change a key's fields after putting it in a Map.

---

## Remember These 5 Things

1. **Collections grow and shrink** — arrays do not, without manual copying.
2. **Four types: List, Set, Queue, Map** — pick by duplicates, order, line behavior, or key lookup.
3. **Start with ArrayList and HashMap** — they cover most fresher and junior projects.
4. **\`List<String>\` means "list of strings"** — generics prevent wrong-type bugs at compile time.
5. **Interface on the left, class on the right** — \`List<String> x = new ArrayList<>();\`

---

## What's Next?

You now know the big picture. Dive into each collection type in detail:

### Immediate Next Steps

1. **[List Interface](/corejava/list-interface)**: Ordered lists with index access — your most-used collection
2. **[Set Interface](/corejava/set-interface)**: Unique elements with no duplicates
3. **[Queue Interface](/corejava/queue-interface)**: Waiting lines and task processing
4. **[Map Interface](/corejava/map-interface)**: Key-value lookups like a phone book

### Test Yourself

Ready to check your understanding? Try the [Core Java MCQ Exam](/tutorial/core-java-mcq) — it covers Collections, List, Set, Map, Queue, and more.

`,
  code: `// Complete Collections Framework Demo
// Understanding all collection types

import java.util.*;

public class CollectionsCompleteDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    📚 JAVA COLLECTIONS - COMPLETE GUIDE        ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: Collection Hierarchy
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 1: COLLECTION HIERARCHY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n                 Iterable");
        System.out.println("                    │");
        System.out.println("                Collection");
        System.out.println("                    │");
        System.out.println("      ┌─────────────┼─────────────┐");
        System.out.println("      │             │             │");
        System.out.println("    List           Set          Queue");
        System.out.println("      │             │             │");
        System.out.println("  ArrayList     HashSet    PriorityQueue");
        System.out.println("  LinkedList    TreeSet    ArrayDeque");
        System.out.println("  Vector     LinkedHashSet");
        
        // ═══════════════════════════════════════════════════
        // PART 2: List Implementations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 2: LIST IMPLEMENTATIONS");
        System.out.println("═".repeat(50));
        
        // ArrayList
        System.out.println("\\n1. ArrayList:");
        List<String> arrayList = new ArrayList<>();
        arrayList.add("Apple");
        arrayList.add("Banana");
        arrayList.add("Cherry");
        System.out.println("   " + arrayList);
        System.out.println("   • Dynamic array, O(1) access");
        System.out.println("   • Best for: Random access, iteration");
        
        // LinkedList
        System.out.println("\\n2. LinkedList:");
        List<String> linkedList = new LinkedList<>();
        linkedList.add("First");
        linkedList.add("Second");
        linkedList.add("Third");
        System.out.println("   " + linkedList);
        System.out.println("   • Doubly linked list, O(1) insert/delete");
        System.out.println("   • Best for: Frequent insert/delete");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Set Implementations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 3: SET IMPLEMENTATIONS");
        System.out.println("═".repeat(50));
        
        // HashSet
        System.out.println("\\n1. HashSet:");
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Red");
        hashSet.add("Green");
        hashSet.add("Blue");
        hashSet.add("Red");  // Duplicate ignored
        System.out.println("   " + hashSet);
        System.out.println("   • No order, no duplicates, O(1) operations");
        
        // TreeSet
        System.out.println("\\n2. TreeSet:");
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Zebra");
        treeSet.add("Apple");
        treeSet.add("Mango");
        System.out.println("   " + treeSet);
        System.out.println("   • Sorted order, O(log n) operations");
        
        // LinkedHashSet
        System.out.println("\\n3. LinkedHashSet:");
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("First");
        linkedHashSet.add("Second");
        linkedHashSet.add("Third");
        System.out.println("   " + linkedHashSet);
        System.out.println("   • Insertion order maintained");
        
        // ═══════════════════════════════════════════════════
        // PART 4: Map Implementations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 4: MAP IMPLEMENTATIONS");
        System.out.println("═".repeat(50));
        
        // HashMap
        System.out.println("\\n1. HashMap:");
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Apple", 100);
        hashMap.put("Banana", 50);
        hashMap.put("Cherry", 75);
        System.out.println("   " + hashMap);
        System.out.println("   • No order, O(1) operations");
        
        // TreeMap
        System.out.println("\\n2. TreeMap:");
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Zebra", 1);
        treeMap.put("Apple", 2);
        treeMap.put("Mango", 3);
        System.out.println("   " + treeMap);
        System.out.println("   • Sorted by key");
        
        // LinkedHashMap
        System.out.println("\\n3. LinkedHashMap:");
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
        linkedHashMap.put("First", 1);
        linkedHashMap.put("Second", 2);
        linkedHashMap.put("Third", 3);
        System.out.println("   " + linkedHashMap);
        System.out.println("   • Insertion order maintained");
        
        // ═══════════════════════════════════════════════════
        // PART 5: Queue Implementations
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 5: QUEUE IMPLEMENTATIONS");
        System.out.println("═".repeat(50));
        
        // PriorityQueue
        System.out.println("\\n1. PriorityQueue:");
        Queue<Integer> priorityQueue = new PriorityQueue<>();
        priorityQueue.offer(30);
        priorityQueue.offer(10);
        priorityQueue.offer(20);
        System.out.println("   Added: 30, 10, 20");
        System.out.print("   Poll order: ");
        while(!priorityQueue.isEmpty()) {
            System.out.print(priorityQueue.poll() + " ");
        }
        System.out.println("\\n   • Elements ordered by priority (natural order)");
        
        // ArrayDeque
        System.out.println("\\n2. ArrayDeque (as Stack):");
        Deque<String> stack = new ArrayDeque<>();
        stack.push("First");
        stack.push("Second");
        stack.push("Third");
        System.out.println("   Pushed: First, Second, Third");
        System.out.print("   Pop order: ");
        while(!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
        System.out.println("\\n   • LIFO (Last-In-First-Out)");
        
        // ═══════════════════════════════════════════════════
        // PART 6: Choosing the Right Collection
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 6: CHOOSING THE RIGHT COLLECTION");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Requirement              | Use                |");
        System.out.println("|--------------------------|---------------------|");
        System.out.println("| Fast random access       | ArrayList           |");
        System.out.println("| Frequent insert/delete   | LinkedList          |");
        System.out.println("| Unique elements          | HashSet             |");
        System.out.println("| Sorted unique elements   | TreeSet             |");
        System.out.println("| Key-value pairs          | HashMap             |");
        System.out.println("| Sorted key-value         | TreeMap             |");
        System.out.println("| FIFO queue               | LinkedList/ArrayDeque|");
        System.out.println("| Priority queue           | PriorityQueue       |");
        System.out.println("| Thread-safe map          | ConcurrentHashMap   |");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nKey Takeaways:");
        System.out.println("   • List: Ordered, allows duplicates");
        System.out.println("   • Set: No duplicates");
        System.out.println("   • Map: Key-value pairs");
        System.out.println("   • Queue: FIFO ordering");
        System.out.println("   • Choose based on requirements!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a student management system using different collections',
      hint: 'Use HashMap for student lookup by ID, TreeSet for sorted names, ArrayList for course list',
      starterCode: `import java.util.*;

public class StudentManagement {
    public static void main(String[] args) {
        // 1. HashMap - Student lookup by ID
        Map<String, String> students = new HashMap<>();
        students.put("STU-001", "Dattu p");
        students.put("STU-002", "Jane Smith");
        // Add more students
        
        // 2. TreeSet - Sorted student names
        Set<String> sortedNames = new TreeSet<>();
        // Add names from HashMap values
        
        // 3. ArrayList - Courses for a student
        List<String> courses = new ArrayList<>();
        courses.add("Java Programming");
        courses.add("Database Systems");
        // Add more courses
        
        // Display all data
        System.out.println("=== STUDENT MANAGEMENT ===");
        // Print students, sorted names, and courses
    }
}`
    }
  ]
};

export default collectionIntroduction;
