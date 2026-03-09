const javaInterviewQuestions = {
  id: 'java-interview-questions',
  title: 'Top 30 Java Interview Questions ',
  description: 'Master the most commonly asked Java interview questions for developers with. Real-world scenarios and practical answers.',
  content: `
# Top 30 Java Interview Questions  

These are the most frequently asked Java interview questions for developers. Focus on practical understanding and real-world scenarios.

---

## 1. What is the difference between == and equals() in Java?

**Answer:**

\`==\` compares references (memory addresses), while \`equals()\` compares values.

\`\`\`java
String str1 = new String("Hello");
String str2 = new String("Hello");
String str3 = "Hello";
String str4 = "Hello";

System.out.println(str1 == str2);        // false (different objects)
System.out.println(str1.equals(str2));   // true (same content)
System.out.println(str3 == str4);        // true (string pool)
System.out.println(str3.equals(str4));   // true (same content)
\`\`\`

**Real-time scenario:** When comparing user input with database values, always use \`equals()\` to compare content, not \`==\`.

---

## 2. Explain the difference between String, StringBuffer, and StringBuilder.

**Answer:**

| Feature | String | StringBuffer | StringBuilder |
|---------|--------|--------------|---------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread Safety | Thread-safe | Thread-safe (synchronized) | Not thread-safe |
| Performance | Slow for concatenation | Moderate | Fastest |
| When to Use | When value won't change | Multi-threaded environment | Single-threaded environment |

\`\`\`java
// String - creates new object each time
String str = "Hello";
str = str + " World";  // Creates new object

// StringBuffer - thread-safe, slower
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");  // Modifies existing object

// StringBuilder - not thread-safe, fastest
StringBuilder sb2 = new StringBuilder("Hello");
sb2.append(" World");  // Modifies existing object
\`\`\`

**Real-time scenario:** Use \`StringBuilder\` for building SQL queries in a single-threaded application. Use \`StringBuffer\` in multi-threaded web applications.

---

## 3. What is the difference between ArrayList and LinkedList?

**Answer:**

| Feature | ArrayList | LinkedList |
|---------|-----------|------------|
| Underlying Structure | Dynamic array | Doubly linked list |
| Random Access | Fast (O(1)) | Slow (O(n)) |
| Insertion/Deletion | Slow (O(n)) | Fast (O(1)) |
| Memory | Less overhead | More overhead (pointers) |

\`\`\`java
// ArrayList - better for frequent access
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.get(0);  // Fast - O(1)

// LinkedList - better for frequent insertion/deletion
LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("A");
linkedList.addFirst("B");  // Fast - O(1)
\`\`\`

**Real-time scenario:** Use \`ArrayList\` for displaying paginated data (frequent access). Use \`LinkedList\` for implementing a queue or stack.

---

## 4. What is the difference between HashSet and TreeSet?

**Answer:**

| Feature | HashSet | TreeSet |
|---------|---------|---------|
| Ordering | No order | Sorted order |
| Null values | Allows one null | No null (if natural ordering) |
| Performance | O(1) average | O(log n) |
| Implementation | Hash table | Red-Black tree |

\`\`\`java
// HashSet - no order, faster
HashSet<Integer> hashSet = new HashSet<>();
hashSet.add(5);
hashSet.add(2);
hashSet.add(8);
System.out.println(hashSet);  // [2, 5, 8] - no guarantee

// TreeSet - sorted order, slower
TreeSet<Integer> treeSet = new TreeSet<>();
treeSet.add(5);
treeSet.add(2);
treeSet.add(8);
System.out.println(treeSet);  // [2, 5, 8] - always sorted
\`\`\`

**Real-time scenario:** Use \`HashSet\` for checking if a user ID exists (fast lookup). Use \`TreeSet\` when you need sorted unique values.

---

## 5. Explain HashMap internal working.

**Answer:**

HashMap uses an array of buckets (buckets). Each bucket can contain a linked list or tree (Java 8+).

**How it works:**
1. Calculate hash code of key
2. Use hash code to find bucket index
3. If bucket is empty, store key-value pair
4. If bucket has entries, check for key equality
5. If key exists, update value; otherwise, add to list/tree

\`\`\`java
HashMap<String, Integer> map = new HashMap<>();
map.put(" Dattu", 25);  // Hash(" Dattu") % bucket_size = bucket_index
map.put("Jane", 30);
map.get(" Dattu");     // Hash(" Dattu") -> find bucket -> search list/tree
\`\`\`

**Real-time scenario:** HashMap is used for caching user sessions, storing configuration key-value pairs, and implementing lookup tables.

---

## 6. What is the difference between HashMap and Hashtable?

**Answer:**

| Feature | HashMap | Hashtable |
|---------|----------|-----------|
| Synchronization | Not synchronized | Synchronized (thread-safe) |
| Null keys/values | Allows one null key, multiple null values | No null keys or values |
| Performance | Faster | Slower (due to synchronization) |
| Legacy | Modern | Legacy class |

\`\`\`java
// HashMap - not thread-safe, faster
HashMap<String, String> map = new HashMap<>();
map.put(null, "value");  // Allowed

// Hashtable - thread-safe, slower
Hashtable<String, String> table = new Hashtable<>();
table.put(null, "value");  // NullPointerException
\`\`\`

**Real-time scenario:** Use \`HashMap\` in single-threaded applications. Use \`ConcurrentHashMap\` (not Hashtable) for multi-threaded applications.

---

## 7. What is the difference between checked and unchecked exceptions?

**Answer:**

**Checked Exceptions:**
- Must be handled using try-catch or declared with throws
- Compile-time checking
- Examples: IOException, SQLException, ClassNotFoundException

**Unchecked Exceptions:**
- No compile-time checking required
- Runtime exceptions
- Examples: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException

\`\`\`java
// Checked exception - must handle
public void readFile() throws IOException {
    FileReader file = new FileReader("file.txt");  // Compiler forces handling
}

// Unchecked exception - no forced handling
public void divide(int a, int b) {
    int result = a / b;  // May throw ArithmeticException, but no forced handling
}
\`\`\`

**Real-time scenario:** Database operations throw checked exceptions (SQLException) - you must handle them. NullPointerException is unchecked - you should prevent it with null checks.

---

## 8. Explain the difference between final, finally, and finalize.

**Answer:**

**final:**
- Variable: Cannot be reassigned
- Method: Cannot be overridden
- Class: Cannot be extended

**finally:**
- Block that always executes (except System.exit())
- Used for cleanup code

**finalize:**
- Method called by garbage collector before object destruction
- Deprecated in Java 9+

\`\`\`java
// final - variable cannot be reassigned
final int x = 10;
// x = 20;  // Compilation error

// finally - always executes
try {
    // risky code
} catch (Exception e) {
    // handle exception
} finally {
    // cleanup code - always executes
    System.out.println("Cleanup");
}

// finalize - deprecated, don't use
protected void finalize() {
    // Cleanup before GC
}
\`\`\`

**Real-time scenario:** Use \`final\` for constants. Use \`finally\` to close database connections or file streams. Avoid \`finalize()\`.

---

## 9. What is the difference between throw and throws?

**Answer:**

**throw:**
- Used to explicitly throw an exception
- Used inside a method

**throws:**
- Used to declare that a method may throw an exception
- Used in method signature

\`\`\`java
// throw - explicitly throw exception
public void validateAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be 18 or above");
    }
}

// throws - declare exception in method signature
public void readFile() throws IOException {
    FileReader file = new FileReader("file.txt");
}
\`\`\`

**Real-time scenario:** Use \`throw\` when validating user input. Use \`throws\` when your method calls another method that throws a checked exception.

---

## 10. Explain method overloading vs method overriding.

**Answer:**

**Method Overloading:**
- Same method name, different parameters
- Compile-time polymorphism
- Within same class

**Method Overriding:**
- Same method name and signature
- Runtime polymorphism
- In parent-child classes

\`\`\`java
// Overloading - same class, different parameters
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {  // Overloaded
        return a + b + c;
    }
}

// Overriding - parent-child classes
class Animal {
    public void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {  // Overridden
        System.out.println("Dog barks");
    }
}
\`\`\`

**Real-time scenario:** Overloading is used for providing multiple ways to create objects (constructors). Overriding is used for customizing behavior in subclasses.

---

## 11. What is the difference between abstract class and interface?

**Answer:**

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| Variables | Can have instance variables | Only constants (public static final) |
| Methods | Can have concrete and abstract methods | Java 8+: default and static methods |
| Inheritance | Single inheritance | Multiple inheritance (implements) |
| Constructor | Can have constructor | Cannot have constructor |
| Access Modifier | Can be protected, private | Public by default |

\`\`\`java
// Abstract class
abstract class Animal {
    protected String name;  // Instance variable
    
    public Animal(String name) {  // Constructor
        this.name = name;
    }
    
    abstract void makeSound();  // Abstract method
    
    public void sleep() {  // Concrete method
        System.out.println("Sleeping");
    }
}

// Interface
interface Flyable {
    void fly();  // Abstract method (implicitly public)
    
    default void land() {  // Default method (Java 8+)
        System.out.println("Landing");
    }
}
\`\`\`

**Real-time scenario:** Use abstract class when you have common code to share. Use interface when you want to define a contract that multiple classes can implement.

---

## 12. What is the difference between static and instance methods?

**Answer:**

**Static Method:**
- Belongs to class, not instance
- Called using class name
- Cannot access instance variables
- Cannot use \`this\` keyword

**Instance Method:**
- Belongs to instance
- Called using object
- Can access both static and instance variables
- Can use \`this\` keyword

\`\`\`java
class Calculator {
    private int value;  // Instance variable
    private static int count = 0;  // Static variable
    
    // Instance method
    public void setValue(int value) {
        this.value = value;  // Can use 'this'
    }
    
    // Static method
    public static int getCount() {
        return count;  // Can only access static variables
        // return this.value;  // Error - cannot use 'this'
    }
}

// Usage
Calculator calc = new Calculator();
calc.setValue(10);        // Instance method
Calculator.getCount();    // Static method
\`\`\`

**Real-time scenario:** Use static methods for utility functions (like \`Math.max()\`). Use instance methods for operations on object data.

---

## 13. Explain the concept of wrapper classes.

**Answer:**

Wrapper classes provide object representation of primitive types.

| Primitive | Wrapper Class |
|-----------|---------------|
| int | Integer |
| char | Character |
| double | Double |
| boolean | Boolean |
| float | Float |
| long | Long |
| byte | Byte |
| short | Short |

\`\`\`java
// Autoboxing - primitive to wrapper (automatic)
int num = 10;
Integer numObj = num;  // Autoboxing

// Unboxing - wrapper to primitive (automatic)
Integer numObj2 = 20;
int num2 = numObj2;  // Unboxing

// Why use wrapper classes?
List<Integer> numbers = new ArrayList<>();  // Collections need objects
numbers.add(10);  // Autoboxing: int -> Integer
\`\`\`

**Real-time scenario:** Wrapper classes are used in Collections (List<Integer>), when you need null values, and for reflection APIs.

---

## 14. What is the difference between Comparable and Comparator?

**Answer:**

**Comparable:**
- Interface with \`compareTo()\` method
- Natural ordering
- Implemented by the class itself
- Single sorting logic

**Comparator:**
- Interface with \`compare()\` method
- Custom ordering
- Separate class or lambda
- Multiple sorting logics

\`\`\`java
// Comparable - natural ordering
class Student implements Comparable<Student> {
    private String name;
    private int age;
    
    @Override
    public int compareTo(Student other) {
        return this.age - other.age;  // Sort by age
    }
}

// Comparator - custom ordering
class NameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getName().compareTo(s2.getName());  // Sort by name
    }
}

// Usage
List<Student> students = new ArrayList<>();
Collections.sort(students);  // Uses Comparable (age)
Collections.sort(students, new NameComparator());  // Uses Comparator (name)
\`\`\`

**Real-time scenario:** Use \`Comparable\` for default sorting (e.g., sort employees by ID). Use \`Comparator\` for custom sorting (e.g., sort by salary, then by name).

---

## 15. Explain the concept of garbage collection in Java.

**Answer:**

Garbage Collection automatically frees memory by removing objects that are no longer referenced.

**How it works:**
1. JVM identifies unreachable objects
2. Marks them for deletion
3. Removes them from memory
4. Compacts remaining objects

\`\`\`java
// Object becomes eligible for GC when no references exist
String str = new String("Hello");
str = null;  // Object "Hello" is now eligible for GC

// Or when reference goes out of scope
public void method() {
    String local = new String("World");
    // local becomes eligible for GC when method ends
}
\`\`\`

**Real-time scenario:** In a web application, when a user session expires, the session object becomes eligible for GC, freeing memory automatically.

---

## 16. What is the difference between wait() and sleep()?

**Answer:**

| Feature | wait() | sleep() |
|---------|--------|---------|
| Class | Object class method | Thread class method |
| Synchronization | Must be in synchronized block | No synchronization needed |
| Lock | Releases lock | Keeps lock |
| Wake up | notify() or notifyAll() | Time expires or interrupt() |
| Usage | Inter-thread communication | Pause execution |

\`\`\`java
// wait() - releases lock, used for inter-thread communication
synchronized (lock) {
    lock.wait();  // Releases lock, waits for notify()
}

// sleep() - keeps lock, pauses execution
Thread.sleep(1000);  // Pauses for 1 second, keeps lock
\`\`\`

**Real-time scenario:** Use \`wait()\` in producer-consumer scenarios. Use \`sleep()\` to add delays in processing (e.g., retry logic with delay).

---

## 17. Explain the concept of synchronization in Java.

**Answer:**

Synchronization ensures only one thread can access a shared resource at a time, preventing race conditions.

\`\`\`java
class Counter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;  // Thread-safe
    }
    
    // Synchronized block
    public void decrement() {
        synchronized (this) {
            count--;  // Thread-safe
        }
    }
}
\`\`\`

**Real-time scenario:** In a banking application, when multiple threads try to update account balance simultaneously, synchronization prevents incorrect balance calculations.

---

## 18. What is the difference between Set and List?

**Answer:**

| Feature | List | Set |
|---------|------|-----|
| Duplicates | Allows duplicates | No duplicates |
| Order | Maintains insertion order | No guaranteed order (except LinkedHashSet, TreeSet) |
| Index | Has index | No index |
| Implementation | ArrayList, LinkedList | HashSet, TreeSet, LinkedHashSet |

\`\`\`java
// List - allows duplicates, has index
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Apple");  // Duplicate allowed
list.get(0);  // Access by index

// Set - no duplicates, no index
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Apple");  // Duplicate ignored
// set.get(0);  // Error - no index
\`\`\`

**Real-time scenario:** Use \`List\` for storing order items (duplicates allowed). Use \`Set\` for storing unique user IDs.

---

## 19. What is the difference between Iterator and ListIterator?

**Answer:**

| Feature | Iterator | ListIterator |
|---------|-----------|--------------|
| Direction | Forward only | Forward and backward |
| Methods | hasNext(), next(), remove() | hasNext(), next(), hasPrevious(), previous(), add(), set() |
| Applicable | All Collections | Only List implementations |

\`\`\`java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

// Iterator - forward only
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// ListIterator - bidirectional
ListIterator<String> lit = list.listIterator();
while (lit.hasNext()) {
    System.out.println(lit.next());
}
while (lit.hasPrevious()) {
    System.out.println(lit.previous());
}
\`\`\`

**Real-time scenario:** Use \`Iterator\` for simple forward traversal. Use \`ListIterator\` when you need to modify list during iteration or traverse backward.

---

## 20. Explain the concept of serialization in Java.

**Answer:**

Serialization converts an object into a byte stream for storage or transmission. Deserialization converts byte stream back to object.

\`\`\`java
// Serializable class
class Student implements Serializable {
    private String name;
    private int age;
    // transient fields are not serialized
    private transient String password;
}

// Serialization
Student student = new Student(" Dattu", 25);
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("student.ser"));
oos.writeObject(student);
oos.close();

// Deserialization
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("student.ser"));
Student deserialized = (Student) ois.readObject();
ois.close();
\`\`\`

**Real-time scenario:** Serialization is used for saving user session data, caching objects to disk, and sending objects over network in distributed systems.

---

## 21. What is the difference between shallow copy and deep copy?

**Answer:**

**Shallow Copy:**
- Copies object references, not actual objects
- Changes in copied object affect original
- Default clone() method creates shallow copy

**Deep Copy:**
- Creates new objects for all referenced objects
- Changes in copied object don't affect original
- Must be implemented manually

\`\`\`java
// Shallow copy
class Address {
    String city;
}

class Person implements Cloneable {
    String name;
    Address address;
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // Shallow copy
    }
}

// Deep copy
class PersonDeep implements Cloneable {
    String name;
    Address address;
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        PersonDeep cloned = (PersonDeep) super.clone();
        cloned.address = new Address();  // Create new Address object
        cloned.address.city = this.address.city;
        return cloned;  // Deep copy
    }
}
\`\`\`

**Real-time scenario:** Use shallow copy for simple objects. Use deep copy when object contains references to other objects that should be independent.

---

## 22. What is the difference between fail-fast and fail-safe iterators?

**Answer:**

**Fail-Fast:**
- Throws ConcurrentModificationException if collection is modified during iteration
- Examples: ArrayList, HashMap iterators
- Uses modCount to detect changes

**Fail-Safe:**
- Doesn't throw exception if collection is modified during iteration
- Examples: ConcurrentHashMap, CopyOnWriteArrayList iterators
- Works on snapshot of collection

\`\`\`java
// Fail-fast - throws exception
List<String> list = new ArrayList<>();
list.add("A");
Iterator<String> it = list.iterator();
list.add("B");  // Modification
it.next();  // ConcurrentModificationException

// Fail-safe - no exception
List<String> safeList = new CopyOnWriteArrayList<>();
safeList.add("A");
Iterator<String> safeIt = safeList.iterator();
safeList.add("B");  // Modification
safeIt.next();  // No exception, works on snapshot
\`\`\`

**Real-time scenario:** Fail-fast helps catch bugs early. Fail-safe is used in multi-threaded environments where collection might be modified by other threads.

---

## 23. Explain the concept of method reference in Java 8.

**Answer:**

Method reference is a shorthand notation for lambda expressions that call existing methods.

\`\`\`java
// Lambda expression
list.forEach(s -> System.out.println(s));

// Method reference
list.forEach(System.out::println);

// Types of method references:
// 1. Static method reference
list.sort(String::compareToIgnoreCase);

// 2. Instance method reference
String str = "Hello";
Predicate<String> predicate = str::startsWith;

// 3. Constructor reference
Supplier<List<String>> supplier = ArrayList::new;
\`\`\`

**Real-time scenario:** Method references make code more readable. Use them when lambda just calls an existing method.

---

## 24. What is the difference between Predicate, Function, and Consumer?

**Answer:**

**Predicate:**
- Takes one argument, returns boolean
- Used for filtering/condition checking

**Function:**
- Takes one argument, returns result
- Used for transformation

**Consumer:**
- Takes one argument, returns void
- Used for side effects (printing, saving)

\`\`\`java
// Predicate - returns boolean
Predicate<Integer> isEven = n -> n % 2 == 0;
list.stream().filter(isEven).forEach(System.out::println);

// Function - transforms input to output
Function<String, Integer> length = s -> s.length();
list.stream().map(length).forEach(System.out::println);

// Consumer - performs action, returns void
Consumer<String> printer = s -> System.out.println(s);
list.forEach(printer);
\`\`\`

**Real-time scenario:** Use \`Predicate\` for filtering users by age. Use \`Function\` for converting user objects to DTOs. Use \`Consumer\` for logging or saving data.

---

## 25. Explain the concept of Optional in Java 8.

**Answer:**

Optional is a container that may or may not contain a value. It helps avoid NullPointerException.

\`\`\`java
// Without Optional - NullPointerException risk
String name = getUserName(id);
if (name != null) {
    System.out.println(name.length());
}

// With Optional - safer
Optional<String> nameOpt = Optional.ofNullable(getUserName(id));
nameOpt.ifPresent(n -> System.out.println(n.length()));

// Common methods
Optional<String> opt = Optional.of("Hello");
opt.isPresent();           // true
opt.get();                 // "Hello"
opt.orElse("Default");     // "Hello" or "Default" if empty
opt.orElseGet(() -> "Default");
\`\`\`

**Real-time scenario:** Use Optional for method return values that might be null. It makes the API clearer and forces callers to handle null cases.

---

## 26. What is the difference between Stream and Collection?

**Answer:**

| Feature | Collection | Stream |
|---------|------------|--------|
| Storage | Stores data | Doesn't store data |
| Operations | Eager (immediate) | Lazy (on terminal operation) |
| Iteration | External (for-each) | Internal (functional) |
| Reusability | Can iterate multiple times | Can use only once |
| Purpose | Data structure | Data processing pipeline |

\`\`\`java
// Collection - stores data, eager operations
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.forEach(n -> System.out.println(n));  // Can iterate multiple times

// Stream - processes data, lazy operations
numbers.stream()
    .filter(n -> n % 2 == 0)      // Intermediate operation (lazy)
    .map(n -> n * 2)               // Intermediate operation (lazy)
    .forEach(System.out::println); // Terminal operation (executes pipeline)
\`\`\`

**Real-time scenario:** Use Collections for storing and managing data. Use Streams for processing, filtering, and transforming data in a functional style.

---

## 27. Explain the concept of lambda expressions in Java 8.

**Answer:**

Lambda expressions provide a way to represent functional interfaces (interfaces with single abstract method) using concise syntax.

\`\`\`java
// Before Java 8 - anonymous inner class
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// Java 8 - lambda expression
Runnable r2 = () -> System.out.println("Hello");

// More examples
Comparator<Integer> comp = (a, b) -> a - b;
Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Integer> length = s -> s.length();
\`\`\`

**Real-time scenario:** Lambda expressions are used extensively with Streams API for filtering, mapping, and processing collections in a functional programming style.

---

## 28. What is the difference between parallel stream and sequential stream?

**Answer:**

**Sequential Stream:**
- Processes elements one by one
- Single thread
- Predictable order

**Parallel Stream:**
- Processes elements in parallel
- Multiple threads
- Order not guaranteed

\`\`\`java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Sequential stream
numbers.stream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);  // Single thread

// Parallel stream
numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);  // Multiple threads
\`\`\`

**Real-time scenario:** Use sequential stream for small datasets or when order matters. Use parallel stream for large datasets and CPU-intensive operations.

---

## 29. Explain the concept of immutability in Java.

**Answer:**

Immutability means an object's state cannot be changed after creation. Examples: String, Integer, LocalDate.

\`\`\`java
// Immutable String
String str = "Hello";
str = str + " World";  // Creates new String object, doesn't modify original

// Creating immutable class
final class ImmutablePerson {
    private final String name;
    private final int age;
    
    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    // No setters - cannot modify after creation
}
\`\`\`

**Real-time scenario:** Immutable objects are thread-safe and prevent accidental modifications. Use them for configuration objects, DTOs, and value objects.

---

## 30. What is the difference between checked and unchecked exceptions? (Revisited with examples)

**Answer:**

**Checked Exceptions:**
- Must be handled or declared
- Compile-time checking
- Examples: IOException, SQLException

**Unchecked Exceptions:**
- No forced handling
- Runtime exceptions
- Examples: NullPointerException, IllegalArgumentException

\`\`\`java
// Checked exception - compiler forces handling
public void readFile() throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
    // IOException must be handled or declared
}

// Unchecked exception - no forced handling
public void divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Divisor cannot be zero");
    }
    int result = a / b;  // ArithmeticException possible, but not forced to handle
}
\`\`\`

**Real-time scenario:** Database operations throw checked exceptions - you must handle them. Business logic validation throws unchecked exceptions - you should prevent them with proper checks.

---

## Summary

These 30 questions cover the essential Java concepts that are frequently asked in interviews for developers. Focus on understanding the concepts deeply rather than memorizing answers.

**Key Topics Covered:**
- Collections Framework (List, Set, Map)
- Exception Handling
- Object-Oriented Programming
- String Handling
- Multithreading basics
- Java 8 features (Streams, Lambda, Optional)
- Memory Management
- Best Practices

Practice implementing these concepts in real projects to gain practical understanding.
  `,
  code: `// Java Interview Questions - Practical Examples

// 1. == vs equals()
String str1 = new String("Hello");
String str2 = new String("Hello");
System.out.println(str1 == str2);        // false
System.out.println(str1.equals(str2));  // true

// 2. String vs StringBuffer vs StringBuilder
String str = "Hello";
str = str + " World";  // Creates new object

StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");  // Modifies existing (thread-safe)

StringBuilder sbd = new StringBuilder("Hello");
sbd.append(" World");  // Modifies existing (not thread-safe, faster)

// 3. ArrayList vs LinkedList
ArrayList<String> arrayList = new ArrayList<>();
arrayList.add("A");
arrayList.get(0);  // Fast random access

LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("A");
linkedList.addFirst("B");  // Fast insertion

// 4. HashSet vs TreeSet
HashSet<Integer> hashSet = new HashSet<>();
hashSet.add(5);
hashSet.add(2);
hashSet.add(8);
// No guaranteed order

TreeSet<Integer> treeSet = new TreeSet<>();
treeSet.add(5);
treeSet.add(2);
treeSet.add(8);
// Always sorted: [2, 5, 8]

// 5. HashMap internal working
HashMap<String, Integer> map = new HashMap<>();
map.put(" Dattu", 25);
map.put("Jane", 30);
map.get(" Dattu");  // O(1) average case

// 6. HashMap vs Hashtable
HashMap<String, String> hashMap = new HashMap<>();
hashMap.put(null, "value");  // Allowed

Hashtable<String, String> hashtable = new Hashtable<>();
// hashtable.put(null, "value");  // NullPointerException

// 7. Checked vs Unchecked Exceptions
// Checked - must handle
try {
    FileReader file = new FileReader("file.txt");
} catch (IOException e) {
    e.printStackTrace();
}

// Unchecked - no forced handling
int[] arr = new int[5];
int value = arr[10];  // ArrayIndexOutOfBoundsException (unchecked)

// 8. final, finally, finalize
final int x = 10;  // Cannot reassign

try {
    // code
} finally {
    // Always executes
}

// finalize() - deprecated, don't use

// 9. throw vs throws
public void validate(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be 18+");
    }
}

public void readFile() throws IOException {
    // Method may throw IOException
}

// 10. Overloading vs Overriding
class Calculator {
    // Overloading - same class, different parameters
    public int add(int a, int b) { return a + b; }
    public int add(int a, int b, int c) { return a + b + c; }
}

class Animal {
    public void makeSound() { System.out.println("Sound"); }
}

class Dog extends Animal {
    @Override  // Overriding - parent-child, same signature
    public void makeSound() { System.out.println("Bark"); }
}

// 11. Abstract Class vs Interface
abstract class Animal {
    protected String name;
    abstract void makeSound();
    public void sleep() { System.out.println("Sleeping"); }
}

interface Flyable {
    void fly();
    default void land() { System.out.println("Landing"); }
}

// 12. Static vs Instance
class Calculator {
    private int value;  // Instance variable
    private static int count = 0;  // Static variable
    
    public void setValue(int value) {  // Instance method
        this.value = value;
    }
    
    public static int getCount() {  // Static method
        return count;
    }
}

// 13. Wrapper Classes
int num = 10;
Integer numObj = num;  // Autoboxing
int num2 = numObj;     // Unboxing

// 14. Comparable vs Comparator
class Student implements Comparable<Student> {
    private int age;
    @Override
    public int compareTo(Student other) {
        return this.age - other.age;
    }
}

class NameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getName().compareTo(s2.getName());
    }
}

// 15. Garbage Collection
String str = new String("Hello");
str = null;  // Eligible for GC

// 16. wait() vs sleep()
synchronized (lock) {
    lock.wait();  // Releases lock, waits for notify()
}

Thread.sleep(1000);  // Keeps lock, pauses execution

// 17. Synchronization
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
}

// 18. List vs Set
List<String> list = new ArrayList<>();
list.add("A");
list.add("A");  // Duplicate allowed

Set<String> set = new HashSet<>();
set.add("A");
set.add("A");  // Duplicate ignored

// 19. Iterator vs ListIterator
List<String> list = new ArrayList<>();
Iterator<String> it = list.iterator();  // Forward only
ListIterator<String> lit = list.listIterator();  // Bidirectional

// 20. Serialization
class Student implements Serializable {
    private String name;
    private transient String password;  // Not serialized
}

// 21. Shallow vs Deep Copy
// Shallow - copies references
// Deep - creates new objects

// 22. Fail-fast vs Fail-safe
List<String> list = new ArrayList<>();  // Fail-fast
List<String> safe = new CopyOnWriteArrayList<>();  // Fail-safe

// 23. Method Reference
list.forEach(System.out::println);  // Instead of s -> System.out.println(s)

// 24. Predicate, Function, Consumer
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);

// 25. Optional
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(n -> System.out.println(n.length()));

// 26. Stream vs Collection
List<Integer> numbers = Arrays.asList(1, 2, 3);
numbers.stream().filter(n -> n % 2 == 0).forEach(System.out::println);

// 27. Lambda Expressions
Runnable r = () -> System.out.println("Hello");
Comparator<Integer> comp = (a, b) -> a - b;

// 28. Parallel Stream
numbers.parallelStream().filter(n -> n % 2 == 0).forEach(System.out::println);

// 29. Immutability
final class ImmutablePerson {
    private final String name;
    public ImmutablePerson(String name) { this.name = name; }
    public String getName() { return name; }
}

// 30. Exception Handling
try {
    // risky code
} catch (IOException e) {  // Checked exception
    e.printStackTrace();
} catch (NullPointerException e) {  // Unchecked exception
    e.printStackTrace();
}`
};

export default javaInterviewQuestions;


