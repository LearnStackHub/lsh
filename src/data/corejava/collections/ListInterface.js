const listInterface = {
  id: 'list-interface',
  title: 'List Interface',
  description: 'Ordered collections that allow duplicates',
  content: `
# List Interface — Ordered Collections

Think of a List like the exam seating list in your classroom. Student names are written in order, seat number 1 is at index 0, and if two students have the same name they both stay on the list. That is exactly what Java's \`List\` interface gives you: ordered, indexed, duplicates allowed.

You will use List more than any other collection in day-to-day Java. Shopping lists, playlists, attendance rolls, pending tasks — whenever order and position matter, reach for a List.

---

## What Makes a List Different?

- **Ordered** — Items stay in the order you added them (like a playlist)
- **Indexed** — You can ask for "the 3rd item" using \`get(2)\` (index starts at 0)
- **Duplicates allowed** — Same song twice in a playlist? Fine. Same student name twice? Also fine.
- **Null allowed** — You can store \`null\` if your code needs it

---

## Understand Deeply — What Is a List in Java?

Before you write code, understand these three layers. Freshers often mix them up.

| Layer | What it is | Example |
|-------|------------|---------|
| **Interface** | A contract — rules any List must follow | \`List<String>\` |
| **Implementation** | The actual class that does the work | \`ArrayList\`, \`LinkedList\` |
| **Element type** | What you store inside (generics) | \`String\`, \`Integer\`, your own \`Student\` class |

When you write:

\`\`\`java
List<String> fruits = new ArrayList<>();
\`\`\`

Read it as: *"I want a List that holds Strings. Right now I will use ArrayList to store them."* Tomorrow you could swap \`ArrayList\` for \`LinkedList\` and most of your code still works, because both follow the \`List\` contract.

**Why index starts at 0:** Java copied the C tradition. First item is index 0, second is index 1. A list of size 5 has valid indexes 0 to 4 only. Asking for \`get(5)\` throws \`IndexOutOfBoundsException\` — same idea as array bounds.

**Why duplicates are allowed:** A List models a sequence, not uniqueness. Your playlist can have the same song twice. Your attendance sheet can have two students named "Ravi". If you need uniqueness, use a [Set](/corejava/set-interface) instead.

---

## Understand Deeply — How ArrayList Works Inside

Think of ArrayList as a **stretchable array** behind the scenes.

**Step 1 — Empty list:** Java creates an internal array (often size 10 by default). Your list looks empty but room is reserved.

**Step 2 — You call \`add("Apple")\`:** Java puts "Apple" at index 0. Size becomes 1.

**Step 3 — More adds:** "Banana" goes to index 1, "Cherry" to index 2.

**Step 4 — Array gets full:** When the internal array has no empty slot, ArrayList creates a **new bigger array** (usually double the size), copies all old items into it, then adds the new item. You do not see this — it happens automatically.

**Step 5 — \`get(2)\`:** Java jumps directly to index 2 in the internal array. That is why random access is fast — no walking through other elements.

**Step 6 — \`remove(1)\`:** Java removes "Banana" and **shifts** everything after it one position left. That shift is why removing from the middle of a large ArrayList feels slow.

| Operation | What ArrayList does internally | Feels fast when... |
|-----------|-------------------------------|-------------------|
| \`add(end)\` | Puts item in next free slot (or resizes) | You mostly append |
| \`get(i)\` | Reads internal array at index \`i\` | You read by index often |
| \`add(middle)\` | Shifts elements right, then inserts | List is small |
| \`remove(middle)\` | Shifts elements left to fill gap | List is small |

**Real project use:** Search results on Amazon, student names in a class section, cart line items, API response rows — all are Lists because order matters and you often need "give me item number 5."

---

## Understand Deeply — How LinkedList Works Inside

LinkedList does **not** use one big array. Each item is a **node** with:
- the data (e.g. "Apple")
- a link to the **next** node
- a link to the **previous** node (doubly linked)

Imagine students in a line holding hands. To reach the 5th student, you start at the first and walk forward four steps. That is why \`get(4)\` is slow on LinkedList.

But inserting a new student **between** two others only requires updating two hand-holds (links). No shifting of the whole line. That is why add/remove at front or middle can be faster than ArrayList for certain patterns.

**When LinkedList makes sense:** You rarely call \`get(index)\` on a huge list, but you constantly add/remove at the beginning — like a browser's back-button history or a task queue processed from the front.

**Default advice stays the same:** Start with ArrayList. Switch to LinkedList only when you measure a real performance problem or your design is clearly queue-like at both ends.

---

## List Implementations

### ArrayList

Behind the scenes, ArrayList uses a resizable array. Grabbing any item by index is fast, like flipping straight to seat number 15 in the seating chart. Adding or removing in the middle is slower because other elements may need to shift.

We run this demo to see the basics: create a list, add fruits, read the first one with \`get(0)\`, and print the whole list. Expect output showing \`First fruit: Apple\`, the full list \`[Apple, Banana, Cherry]\`, and \`Size: 3\`.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class ArrayListBasicsDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        String firstFruit = list.get(0);  // Fast! O(1)
        System.out.println("First fruit: " + firstFruit);
        System.out.println("All fruits: " + list);
        System.out.println("Size: " + list.size());
    }
}
\`\`\`

### LinkedList

LinkedList chains each item to the next, like students holding hands in a line. Adding or removing at the front or back is quick. But jumping to "the 5th student" means walking through the chain, so random access is slow.

This demo shows \`addFirst\`, \`addLast\`, and inserting in the middle. Run it and you should see something like \`[First, Middle, Last]\`, plus the first and last elements printed separately.

\`\`\`java
import java.util.LinkedList;

public class LinkedListBasicsDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.addFirst("First");
        list.addLast("Last");
        list.add(1, "Middle");  // Fast insertion! O(1)

        System.out.println("LinkedList: " + list);
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
    }
}
\`\`\`

### Vector (Legacy)

Vector is an old thread-safe version of ArrayList. You rarely need it today. If multiple threads share a list, use \`Collections.synchronizedList()\` or \`CopyOnWriteArrayList\` instead.

---

## ArrayList vs LinkedList — Keep It Simple

In plain words: ArrayList is like a notebook with numbered pages. Flip to any page instantly. LinkedList is like a chain where you walk link by link to reach a spot.

| What you do | ArrayList | LinkedList |
|-------------|-----------|------------|
| Read by index (\`get(5)\`) | Fast | Slow |
| Add at the end | Fast | Fast |
| Add/remove in the middle | Slow (shifts items) | Faster at that spot |
| Memory | Less | More (each node stores extra links) |

**Default choice: ArrayList.** Use it unless you have a clear reason not to (for example, heavy add/remove at the front of a very large list). In interviews and real projects, ArrayList is what most teams pick.

### Walkthrough — One \`add\`, one \`get\`, one \`remove\` on ArrayList

\`\`\`
Start: []

add("A")     →  [A]
add("B")     →  [A, B]
add("C")     →  [A, B, C]

get(1)       →  returns "B"  (index 1 = second item)

remove(1)    →  removes "B", shifts C left  →  [A, C]
\`\`\`

If you draw this on paper when learning, List operations become much easier in exams and debugging.

---

## Common List Operations

This program is your cheat sheet for everyday List work: creating lists in different ways, adding, reading, sorting, checking, and removing. Run it once and read the section headers in the output. You will see how each operation changes the list step by step.

\`\`\`java
import java.util.*;

public class ListOperationsDemo {
    public static void main(String[] args) {
        // Creating lists
        List<String> list = new ArrayList<>();
        List<String> withCapacity = new ArrayList<>(100);
        List<String> fromCollection = new ArrayList<>(List.of("X", "Y"));
        List<String> immutable = List.of("A", "B", "C");
        List<String> fixedSize = Arrays.asList("A", "B", "C");

        System.out.println("=== Creating Lists ===");
        System.out.println("Immutable: " + immutable);
        System.out.println("Fixed-size: " + fixedSize);

        // Adding elements
        list.add("Apple");
        list.add("Banana");
        list.add(0, "First");
        list.addAll(List.of("Cherry", "Date"));
        System.out.println("\\nAfter adds: " + list);

        // Accessing elements
        String first = list.get(0);
        int index = list.indexOf("Apple");
        int last = list.lastIndexOf("Apple");
        List<String> sub = list.subList(1, 4);
        System.out.println("\\nFirst: " + first);
        System.out.println("Index of Apple: " + index);
        System.out.println("Sublist [1,4): " + sub);

        // Modifying elements
        list.set(0, "Orange");
        Collections.sort(list);
        System.out.println("\\nAfter set and sort: " + list);

        // Checking contents
        System.out.println("\\nContains Apple: " + list.contains("Apple"));
        System.out.println("Size: " + list.size());
        System.out.println("Is empty: " + list.isEmpty());

        // Removing elements
        list.remove(0);
        list.remove("Banana");
        list.removeIf(s -> s.startsWith("C"));
        System.out.println("\\nAfter removals: " + list);
    }
}
\`\`\`

### What each creation style means (read the output carefully)

| Code | Can you add more? | Can you change size? | When to use |
|------|-------------------|----------------------|-------------|
| \`new ArrayList<>()\` | Yes | Yes | Normal coding — default |
| \`new ArrayList<>(100)\` | Yes | Yes | You expect ~100 items; avoids early resizing |
| \`List.of("A","B")\` | No | No | Fixed constants, config values |
| \`Arrays.asList(...)\` | No new adds | No | Quick list from array; wrap in ArrayList if you need growth |

---

## Iterating Over Lists

There are many ways to loop through a List. In college labs you will mostly use the for-each loop. In interviews they may ask about Iterator or streams. This demo prints the same fruit list five different ways so you can compare them side by side.

\`\`\`java
import java.util.*;

public class ListIterationDemo {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry"));

        System.out.println("=== 1. For-each loop ===");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        System.out.println("\\n=== 2. Traditional for loop ===");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println(i + ": " + fruits.get(i));
        }

        System.out.println("\\n=== 3. Iterator ===");
        Iterator<String> it = fruits.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        System.out.println("\\n=== 4. forEach with lambda ===");
        fruits.forEach(fruit -> System.out.println(fruit));

        System.out.println("\\n=== 5. Stream API ===");
        fruits.stream()
              .filter(f -> f.startsWith("A"))
              .forEach(System.out::println);
    }
}
\`\`\`

### Which loop should you use?

| Loop style | Use when | Avoid when |
|------------|----------|------------|
| **for-each** | You only need each value, not the index | You need to remove items while looping (use Iterator or removeIf) |
| **Indexed for** | You need position: \`i\`, or parallel arrays | Very large lists where index access on LinkedList is slow |
| **Iterator** | Safe remove during loop | You just need simple read-only traversal |
| **Stream** | Filter/map/collect in one chain | Fresher homework where teacher wants basic loops |

---

## Sorting Lists

Sorting student names alphabetically for the attendance sheet? Or ranking playlist songs by title length? Lists can be sorted in place. This program sorts names naturally, in reverse, and by string length. Run it and watch the same three names appear in different orders each time.

\`\`\`java
import java.util.*;

public class ListSortingDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));

        Collections.sort(names);
        System.out.println("Natural order: " + names);

        Collections.sort(names, Collections.reverseOrder());
        System.out.println("Reverse order: " + names);

        names.sort((a, b) -> a.length() - b.length());
        System.out.println("By length: " + names);

        names.sort(Comparator.comparing(String::length).reversed());
        System.out.println("By length reversed: " + names);
    }
}
\`\`\`

---

## Real-World Example: Shopping Cart

Here is a small Flipkart-style cart. Items live in an ArrayList. Add a laptop and two mice, remove one product, and the total updates. We write this to show how a List holds real objects (not just strings) and how you loop to find or update items. Expect cart size, bill in rupees, and totals before and after removal.

\`\`\`java
import java.util.*;

public class ShoppingCartDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Product("Laptop", 55000), 1);
        cart.addItem(new Product("Mouse", 800), 2);
        cart.addItem(new Product("Mouse", 800), 1);  // increases quantity

        System.out.println("Cart items: " + cart.getItems().size());
        System.out.println("Total bill: Rs " + cart.getTotal());

        cart.removeItem(new Product("Mouse", 800));
        System.out.println("After removing mouse: Rs " + cart.getTotal());
    }
}

class ShoppingCart {
    private final List<CartItem> items = new ArrayList<>();

    public void addItem(Product product, int quantity) {
        for (CartItem item : items) {
            if (item.getProduct().equals(product)) {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        items.add(new CartItem(product, quantity));
    }

    public void removeItem(Product product) {
        items.removeIf(item -> item.getProduct().equals(product));
    }

    public double getTotal() {
        return items.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }

    public List<CartItem> getItems() {
        return new ArrayList<>(items);
    }
}

class Product {
    private final String name;
    private final double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product product = (Product) o;
        return Objects.equals(name, product.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name); }

    @Override
    public String toString() { return name + " @ " + price; }
}

class CartItem {
    private final Product product;
    private int quantity;

    public CartItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    @Override
    public String toString() { return quantity + " x " + product; }
}
\`\`\`

### After the shopping cart code — what happened?

1. \`items\` is an \`ArrayList<CartItem>\` — order of items matches add order.
2. \`addItem\` **loops** the list to see if the product already exists — if yes, it increases quantity instead of adding a duplicate row.
3. \`removeItem\` uses \`removeIf\` — removes every cart row whose product matches.
4. \`getTotal\` uses a **stream** to multiply price × quantity for each row and sum them.
5. \`getItems()\` returns a **copy** (\`new ArrayList<>(items)\`) so outside code cannot break the cart's internal list.

This is how real e-commerce backends think: List holds rows, loop finds matches, stream calculates totals.

---

## Common Pitfalls

### ConcurrentModificationException

This is a classic fresher mistake. You loop through a list with for-each and call \`list.remove()\` inside the loop. Java throws \`ConcurrentModificationException\`.

**Why Java complains:** The for-each loop uses a hidden iterator that tracks how many items the list should have. When you call \`list.remove()\` directly, the list size changes but the iterator's expected count does not. Java detects the mismatch and throws the exception to prevent you from skipping elements or looping forever.

**Safe fixes:** Use \`Iterator.remove()\` (iterator knows about the removal) or \`removeIf()\` (Java handles it internally). Run this demo to see both safe approaches.

\`\`\`java
import java.util.*;

public class ConcurrentModificationDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("keep", "remove", "keep2"));

        // CORRECT - use Iterator.remove()
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            if (it.next().equals("remove")) {
                it.remove();
            }
        }
        System.out.println("After iterator remove: " + list);

        // CORRECT - use removeIf (Java 8+)
        list.add("remove");
        list.removeIf(s -> s.equals("remove"));
        System.out.println("After removeIf: " + list);

        // WRONG - modifying while iterating throws ConcurrentModificationException
        // for (String s : list) {
        //     if (s.equals("remove")) list.remove(s);
        // }
    }
}
\`\`\`

### Arrays.asList Returns Fixed-Size List

\`Arrays.asList("A", "B", "C")\` looks like a normal list but you cannot add new items. Calling \`add()\` throws \`UnsupportedOperationException\`. Wrap it in \`new ArrayList<>(...)\` when you need a growable list. This small program shows both behaviors.

\`\`\`java
import java.util.*;

public class ArraysAsListDemo {
    public static void main(String[] args) {
        List<String> fixed = Arrays.asList("A", "B", "C");
        System.out.println("Fixed-size list: " + fixed);

        // fixed.add("D"); // UnsupportedOperationException!

        List<String> growable = new ArrayList<>(Arrays.asList("A", "B", "C"));
        growable.add("D");
        System.out.println("Growable list: " + growable);
    }
}
\`\`\`

---

## 10 Important List Interface Interview Questions

### 1. What does \`List\` guarantee over \`Collection\`?
**Answer:** A List keeps elements in order and lets you access them by index with \`get(i)\`. You can also have duplicates, which a Set does not allow. The interface is the same, but ArrayList and LinkedList behave differently under the hood.

### 2. When should you pick \`ArrayList\` over \`LinkedList\`?
**Answer:** Almost always pick ArrayList. It is faster for reading by index and for most everyday code. LinkedList only makes sense when you constantly add or remove at the front of a very large list and rarely read by position.

### 3. What is the \`RandomAccess\` marker interface?
**Answer:** It is an empty tag interface. ArrayList implements it to signal "I support fast index access." Some JDK methods check for it and pick a faster algorithm when they see it.

### 4. You need frequent inserts in the middle of a huge list. What do you do?
**Answer:** Neither ArrayList nor LinkedList is perfect here. ArrayList shifts elements on insert. LinkedList must walk to the index first. If this is a real bottleneck, you may need a different structure or batch your updates instead of inserting one by one.

### 5. What is the caution with \`subList()\`?
**Answer:** A sublist is a view backed by the original list, not a separate copy. If you change the parent list or the sublist structurally, you can get unexpected results or a \`ConcurrentModificationException\`. Copy into a new ArrayList if you need independence.

### 6. How does \`List.of\` differ from \`Arrays.asList\`?
**Answer:** \`List.of\` (Java 9+) gives you a fully immutable list. You cannot add, remove, or even change elements. \`Arrays.asList\` is fixed size but you can still do \`set(index, value)\`. For literal lists in new code, prefer \`List.of\`.

### 7. Is ArrayList thread-safe?
**Answer:** No. If two threads modify the same ArrayList at the same time, you can corrupt data or lose elements. Use \`Collections.synchronizedList()\`, \`CopyOnWriteArrayList\`, or proper locking. Vector is the old synchronized option but most teams avoid it now.

### 8. What are \`removeIf\` and \`replaceAll\`?
**Answer:** They are bulk update methods added in Java 8. \`removeIf\` deletes every element that matches a condition. \`replaceAll\` updates every element using a function. They are cleaner than writing your own loop with manual remove logic.

### 9. How do you sort a List in place?
**Answer:** Call \`Collections.sort(list)\` or \`list.sort(comparator)\`. The original list is modified directly. No new list is created. For strings, natural order is alphabetical.

### 10. What is \`ListIterator\`?
**Answer:** It is like Iterator but you can move both forward and backward. You can also add or replace elements safely while iterating. Useful when you need to walk a list in both directions or edit during traversal.

---

## Remember These 5 Things

1. **List = ordered + indexed + duplicates OK** — like a numbered attendance sheet.
2. **Default implementation is ArrayList** — use LinkedList only with a clear reason.
3. **Index starts at 0** — valid indexes are \`0\` to \`size() - 1\`.
4. **Never \`list.remove()\` inside a for-each loop** — use \`removeIf\` or \`Iterator.remove()\`.
5. **Wrap \`Arrays.asList\` in \`new ArrayList<>()\`** when you need to add more items later.

---

## What's Next?

You now know how to store ordered, duplicate-friendly data. Two good next topics:

1. **[Set Interface](/corejava/set-interface)** — Collections with no duplicates (think unique roll numbers)
2. **[Array Introduction](/corejava/array-introduction)** — Understand the array that ArrayList grows on top of

`,
  code: `// List Interface Demo

import java.util.*;

public class ListDemo {
    public static void main(String[] args) {
        System.out.println("=== List Interface Demo ===\\n");
        
        // 1. ARRAYLIST BASICS
        System.out.println("1. ARRAYLIST BASICS");
        System.out.println("   -----------------");
        
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Apple");  // Duplicates allowed
        
        System.out.println("   Fruits: " + fruits);
        System.out.println("   Size: " + fruits.size());
        System.out.println("   First: " + fruits.get(0));
        System.out.println("   Contains 'Banana': " + fruits.contains("Banana"));
        System.out.println("   Index of 'Apple': " + fruits.indexOf("Apple"));
        System.out.println("   Last index of 'Apple': " + fruits.lastIndexOf("Apple"));
        System.out.println();
        
        // 2. LIST OPERATIONS
        System.out.println("2. LIST OPERATIONS");
        System.out.println("   ----------------");
        
        List<String> colors = new ArrayList<>();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        System.out.println("   Initial: " + colors);
        
        colors.add(1, "Yellow");  // Insert at index
        System.out.println("   After add(1, Yellow): " + colors);
        
        colors.set(0, "Orange");  // Replace
        System.out.println("   After set(0, Orange): " + colors);
        
        colors.remove(2);  // Remove by index
        System.out.println("   After remove(2): " + colors);
        
        colors.remove("Yellow");  // Remove by value
        System.out.println("   After remove(Yellow): " + colors);
        System.out.println();
        
        // 3. LINKEDLIST
        System.out.println("3. LINKEDLIST");
        System.out.println("   -----------");
        
        LinkedList<String> queue = new LinkedList<>();
        queue.addFirst("First");
        queue.addLast("Last");
        queue.add("Middle");
        System.out.println("   LinkedList: " + queue);
        
        System.out.println("   First element: " + queue.getFirst());
        System.out.println("   Last element: " + queue.getLast());
        
        queue.removeFirst();
        System.out.println("   After removeFirst: " + queue);
        System.out.println();
        
        // 4. SORTING
        System.out.println("4. SORTING");
        System.out.println("   --------");
        
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("   Original: " + numbers);
        
        Collections.sort(numbers);
        System.out.println("   Sorted: " + numbers);
        
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("   Reverse: " + numbers);
        
        List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));
        names.sort(Comparator.comparing(String::length));
        System.out.println("   By length: " + names);
        System.out.println();
        
        // 5. ITERATION METHODS
        System.out.println("5. ITERATION METHODS");
        System.out.println("   ------------------");
        
        List<String> items = Arrays.asList("A", "B", "C", "D");
        
        System.out.print("   For-each: ");
        for (String item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
        
        System.out.print("   forEach lambda: ");
        items.forEach(item -> System.out.print(item + " "));
        System.out.println();
        
        System.out.print("   Stream: ");
        items.stream().forEach(item -> System.out.print(item + " "));
        System.out.println();
        System.out.println();
        
        // 6. SUBLIST AND BULK OPERATIONS
        System.out.println("6. SUBLIST AND BULK OPERATIONS");
        System.out.println("   -----------------------------");
        
        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        System.out.println("   Original: " + nums);
        
        List<Integer> subList = nums.subList(2, 7);
        System.out.println("   SubList(2,7): " + subList);
        
        nums.removeIf(n -> n % 2 == 0);  // Remove even numbers
        System.out.println("   After removeIf(even): " + nums);
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Todo List");
        System.out.println("   --------------------------------");
        
        TodoList todoList = new TodoList();
        todoList.addTask("Learn Java");
        todoList.addTask("Build a project");
        todoList.addTask("Practice coding");
        todoList.addTask("Learn Java");  // Duplicate
        
        todoList.display();
        
        todoList.completeTask("Learn Java");
        System.out.println("\\n   After completing 'Learn Java':");
        todoList.display();
        
        System.out.println("\\n   Pending tasks: " + todoList.getPendingCount());
    }
}

// Todo List example
class TodoList {
    private List<Task> tasks = new ArrayList<>();
    
    public void addTask(String description) {
        tasks.add(new Task(description));
        System.out.println("   Added: " + description);
    }
    
    public void completeTask(String description) {
        for (Task task : tasks) {
            if (task.description.equals(description) && !task.completed) {
                task.completed = true;
                System.out.println("   Completed: " + description);
                return;
            }
        }
    }
    
    public void display() {
        System.out.println("   --- Todo List ---");
        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            String status = task.completed ? "Done" : "Pending";
            System.out.println("   " + (i + 1) + ". [" + status + "] " + task.description);
        }
    }
    
    public int getPendingCount() {
        return (int) tasks.stream().filter(t -> !t.completed).count();
    }
    
    private static class Task {
        String description;
        boolean completed;
        
        Task(String description) {
            this.description = description;
            this.completed = false;
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a playlist manager using ArrayList',
      hint: 'Implement add, remove, shuffle, and display operations',
      starterCode: `import java.util.*;

public class PlaylistDemo {
    public static void main(String[] args) {
        System.out.println("=== Music Playlist ===\\n");
        
        Playlist playlist = new Playlist("My Favorites");
        
        // Add songs
        playlist.addSong("Bohemian Rhapsody - Queen");
        playlist.addSong("Hotel California - Eagles");
        playlist.addSong("Stairway to Heaven - Led Zeppelin");
        playlist.addSong("Imagine -  Dattu Lennon");
        playlist.addSong("Sweet Child O Mine - Guns N Roses");
        
        playlist.display();
        
        // Shuffle
        System.out.println("\\nShuffling playlist...");
        playlist.shuffle();
        playlist.display();
        
        // Remove a song
        System.out.println("\\nRemoving 'Imagine -  Dattu Lennon'...");
        playlist.removeSong("Imagine -  Dattu Lennon");
        playlist.display();
        
        // Play next
        System.out.println("\\nPlaying songs:");
        playlist.playNext();
        playlist.playNext();
        playlist.playNext();
    }
}

class Playlist {
    private String name;
    private List<String> songs;
    private int currentIndex;
    
    public Playlist(String name) {
        this.name = name;
        this.songs = new ArrayList<>();
        this.currentIndex = 0;
    }
    
    public void addSong(String song) {
        songs.add(song);
        System.out.println("Added: " + song);
    }
    
    public void removeSong(String song) {
        if (songs.remove(song)) {
            System.out.println("Removed: " + song);
        } else {
            System.out.println("Song not found: " + song);
        }
    }
    
    public void shuffle() {
        Collections.shuffle(songs);
        currentIndex = 0;
    }
    
    public void playNext() {
        if (currentIndex < songs.size()) {
            System.out.println("🎵 Now playing: " + songs.get(currentIndex));
            currentIndex++;
        } else {
            System.out.println("End of playlist!");
            currentIndex = 0;
        }
    }
    
    public void display() {
        System.out.println("\\n📋 Playlist: " + name + " (" + songs.size() + " songs)");
        for (int i = 0; i < songs.size(); i++) {
            String marker = (i == currentIndex) ? "▶ " : "  ";
            System.out.println(marker + (i + 1) + ". " + songs.get(i));
        }
    }
}`
    }
  ]
};

export default listInterface;
