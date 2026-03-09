const collectionIntroduction = {
  id: 'collection-introduction',
  title: 'Java Collections Framework - Complete Guide',
  description: 'Complete guide to Java Collections Framework - interfaces, implementations, and algorithms',
  content: `
# Java Collections Framework - Complete Guide

The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes interfaces, implementations, and algorithms.

## What is a Collection?

A collection is an object that groups multiple elements into a single unit. Collections are used to store, retrieve, manipulate, and communicate aggregate data.

### Why Collections over Arrays?

| Feature | Arrays | Collections |
|---------|--------|-------------|
| **Size** | Fixed | Dynamic (grows/shrinks) |
| **Type** | Homogeneous | Can use generics |
| **Primitives** | Supports | Only objects (use wrappers) |
| **Methods** | Limited | Rich API (add, remove, search) |
| **Memory** | Contiguous | Depends on implementation |
| **Performance** | Fast access | Varies by implementation |

---

## Collection Framework Hierarchy

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    COLLECTION FRAMEWORK HIERARCHY                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                         java.lang.Iterable                          │
│                               │                                     │
│                               ▼                                     │
│                      java.util.Collection                           │
│                               │                                     │
│         ┌─────────────────────┼─────────────────────┐               │
│         │                     │                     │               │
│         ▼                     ▼                     ▼               │
│      ┌──────┐             ┌──────┐             ┌───────┐            │
│      │ List │             │ Set  │             │ Queue │            │
│      └──┬───┘             └──┬───┘             └───┬───┘            │
│         │                    │                     │                │
│    ┌────┴────┐          ┌────┴────┐          ┌────┴────┐           │
│    │         │          │         │          │         │           │
│ ArrayList LinkedList  HashSet  TreeSet   PriorityQueue Deque       │
│ Vector    Stack     LinkedHashSet SortedSet            │           │
│                                                   ArrayDeque       │
│                                                   LinkedList       │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│                          java.util.Map                              │
│                               │                                     │
│         ┌─────────────────────┼─────────────────────┐               │
│         │                     │                     │               │
│      HashMap              TreeMap           LinkedHashMap           │
│      Hashtable            SortedMap         ConcurrentHashMap       │
│      WeakHashMap                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Collection Interfaces - Complete Overview

### 1. List Interface

- **Ordered** collection (maintains insertion order)
- **Allows duplicates**
- **Index-based** access
- Implementations: ArrayList, LinkedList, Vector, Stack

\`\`\`java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Apple");  // Duplicates allowed
list.get(0);        // Index-based access
\`\`\`

### 2. Set Interface

- **Unordered** collection (HashSet) or sorted (TreeSet)
- **No duplicates**
- Implementations: HashSet, LinkedHashSet, TreeSet

\`\`\`java
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple");  // Ignored - no duplicates
// set.get(0);     // NOT ALLOWED - no index access
\`\`\`

### 3. Queue Interface

- **FIFO** (First-In-First-Out) ordering
- **Allows duplicates**
- Implementations: PriorityQueue, LinkedList, ArrayDeque

\`\`\`java
Queue<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
queue.poll();  // Returns and removes "First"
\`\`\`

### 4. Map Interface

- **Key-Value** pairs
- **Keys are unique**, values can duplicate
- Implementations: HashMap, TreeMap, LinkedHashMap, Hashtable

\`\`\`java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 100);
map.put("Banana", 50);
map.get("Apple");  // Returns 100
\`\`\`

---

## Collection Implementations Comparison

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    LIST IMPLEMENTATIONS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Implementation │ Internal    │ Access │ Insert/Delete │ Thread    │
│                 │ Structure   │        │               │ Safe      │
│ ────────────────┼─────────────┼────────┼───────────────┼───────────│
│  ArrayList      │ Dynamic     │ O(1)   │ O(n)          │ No        │
│                 │ Array       │        │               │           │
│ ────────────────┼─────────────┼────────┼───────────────┼───────────│
│  LinkedList     │ Doubly      │ O(n)   │ O(1)          │ No        │
│                 │ Linked List │        │               │           │
│ ────────────────┼─────────────┼────────┼───────────────┼───────────│
│  Vector         │ Dynamic     │ O(1)   │ O(n)          │ Yes       │
│                 │ Array       │        │               │ (Legacy)  │
│ ────────────────┼─────────────┼────────┼───────────────┼───────────│
│  Stack          │ LIFO        │ O(1)   │ O(1) top      │ Yes       │
│                 │ (extends    │        │               │ (Legacy)  │
│                 │ Vector)     │        │               │           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    SET IMPLEMENTATIONS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Implementation   │ Internal    │ Order           │ Null │ Perf    │
│ ──────────────────┼─────────────┼─────────────────┼──────┼─────────│
│  HashSet          │ HashMap     │ No order        │ 1    │ O(1)    │
│ ──────────────────┼─────────────┼─────────────────┼──────┼─────────│
│  LinkedHashSet    │ LinkedHash  │ Insertion order │ 1    │ O(1)    │
│                   │ Map         │                 │      │         │
│ ──────────────────┼─────────────┼─────────────────┼──────┼─────────│
│  TreeSet          │ TreeMap     │ Sorted (natural │ No   │ O(log n)│
│                   │ (Red-Black) │ or comparator)  │      │         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    MAP IMPLEMENTATIONS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Implementation   │ Internal    │ Order           │ Null  │ Thread │
│                   │ Structure   │                 │ Key   │ Safe   │
│ ──────────────────┼─────────────┼─────────────────┼───────┼────────│
│  HashMap          │ Hash Table  │ No order        │ 1     │ No     │
│ ──────────────────┼─────────────┼─────────────────┼───────┼────────│
│  LinkedHashMap    │ Hash +      │ Insertion/      │ 1     │ No     │
│                   │ Linked List │ Access order    │       │        │
│ ──────────────────┼─────────────┼─────────────────┼───────┼────────│
│  TreeMap          │ Red-Black   │ Sorted by key   │ No    │ No     │
│                   │ Tree        │                 │       │        │
│ ──────────────────┼─────────────┼─────────────────┼───────┼────────│
│  Hashtable        │ Hash Table  │ No order        │ No    │ Yes    │
│                   │             │                 │       │(Legacy)│
│ ──────────────────┼─────────────┼─────────────────┼───────┼────────│
│  ConcurrentHash   │ Segmented   │ No order        │ No    │ Yes    │
│  Map              │ Hash Table  │                 │       │        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## When to Use Which Collection?

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    CHOOSING THE RIGHT COLLECTION                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  REQUIREMENT                        │ USE                           │
│ ────────────────────────────────────┼───────────────────────────────│
│  Fast random access by index        │ ArrayList                     │
│  Frequent insert/delete in middle   │ LinkedList                    │
│  LIFO (Last-In-First-Out)           │ Stack or ArrayDeque           │
│  FIFO (First-In-First-Out)          │ Queue (LinkedList/ArrayDeque) │
│  Unique elements, no order          │ HashSet                       │
│  Unique elements, sorted            │ TreeSet                       │
│  Unique elements, insertion order   │ LinkedHashSet                 │
│  Key-value pairs, fast lookup       │ HashMap                       │
│  Key-value pairs, sorted by key     │ TreeMap                       │
│  Key-value pairs, insertion order   │ LinkedHashMap                 │
│  Thread-safe map                    │ ConcurrentHashMap             │
│  Thread-safe list                   │ CopyOnWriteArrayList          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Collection Interface Methods

### Common Methods (Collection Interface)

| Method | Description |
|--------|-------------|
| \`add(E e)\` | Adds element to collection |
| \`addAll(Collection c)\` | Adds all elements from another collection |
| \`remove(Object o)\` | Removes single instance of element |
| \`removeAll(Collection c)\` | Removes all elements in specified collection |
| \`clear()\` | Removes all elements |
| \`contains(Object o)\` | Returns true if element exists |
| \`containsAll(Collection c)\` | Returns true if all elements exist |
| \`isEmpty()\` | Returns true if collection is empty |
| \`size()\` | Returns number of elements |
| \`toArray()\` | Returns array containing all elements |
| \`iterator()\` | Returns iterator over elements |

### List-Specific Methods

| Method | Description |
|--------|-------------|
| \`get(int index)\` | Returns element at index |
| \`set(int index, E e)\` | Replaces element at index |
| \`add(int index, E e)\` | Inserts element at index |
| \`remove(int index)\` | Removes element at index |
| \`indexOf(Object o)\` | Returns first index of element |
| \`lastIndexOf(Object o)\` | Returns last index of element |
| \`subList(int from, int to)\` | Returns portion of list |

### Map-Specific Methods

| Method | Description |
|--------|-------------|
| \`put(K key, V value)\` | Associates value with key |
| \`get(Object key)\` | Returns value for key |
| \`remove(Object key)\` | Removes mapping for key |
| \`containsKey(Object key)\` | Returns true if key exists |
| \`containsValue(Object value)\` | Returns true if value exists |
| \`keySet()\` | Returns Set of keys |
| \`values()\` | Returns Collection of values |
| \`entrySet()\` | Returns Set of key-value pairs |

---

## 🏢 Real-Time Project Example: E-Commerce Product Catalog

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

## 🏦 Real-Time Project Example: Banking System

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

### Different Ways to Iterate

\`\`\`java
List<String> list = Arrays.asList("A", "B", "C", "D");

// 1. For-each loop (recommended)
for(String item : list) {
    System.out.println(item);
}

// 2. Iterator
Iterator<String> it = list.iterator();
while(it.hasNext()) {
    System.out.println(it.next());
}

// 3. ListIterator (bidirectional)
ListIterator<String> lit = list.listIterator();
while(lit.hasNext()) {
    System.out.println(lit.next());
}

// 4. forEach with lambda (Java 8+)
list.forEach(item -> System.out.println(item));

// 5. Stream API (Java 8+)
list.stream().forEach(System.out::println);

// 6. Traditional for loop
for(int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
\`\`\`

---

## Summary

| Collection | Duplicates | Order | Null | Thread-Safe | Use Case |
|------------|------------|-------|------|-------------|----------|
| **ArrayList** | Yes | Insertion | Yes | No | General purpose list |
| **LinkedList** | Yes | Insertion | Yes | No | Frequent insert/delete |
| **HashSet** | No | No | 1 | No | Unique elements |
| **TreeSet** | No | Sorted | No | No | Sorted unique elements |
| **HashMap** | Keys: No | No | 1 key | No | Key-value lookup |
| **TreeMap** | Keys: No | Sorted | No | No | Sorted key-value |
| **LinkedHashMap** | Keys: No | Insertion | 1 key | No | Ordered key-value |

> **Industry Insight**: Collections are used everywhere in enterprise applications. E-commerce uses HashMap for product lookup, ArrayList for search results, and Queue for order processing. Banks use TreeMap for sorted transactions and ConcurrentHashMap for thread-safe operations.

---

## Test Your Knowledge

Mastered Collections framework? Test your Core Java skills with our comprehensive [Core Java MCQ Exam](/tutorial/core-java-mcq) covering Collections, List, Set, Map, Queue, and all Core Java topics!
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
