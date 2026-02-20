const javaInterviewQuestions = {
  id: 'java-interview-questions',
  title: 'Top 30 Core Java Interview Questions ',
  description: 'Essential interview questions for developers with 1 year of Java experience. Practical questions covering OOPs, Collections, Exception Handling, and more.',
  content: `
# Top 30 Core Java Interview Questions for 

These questions are designed for developers who have been working with Java for approximately one year. They focus on practical concepts you'll encounter in real-world projects.

---

## 1. What is the difference between == and equals() method in Java?

**Answer:**
- \`==\` is a reference comparison operator. It checks if two references point to the same object in memory.
- \`equals()\` is a method that compares the actual content/value of objects.

**Example:**
\`\`\`java
String str1 = new String("Hello");
String str2 = new String("Hello");
String str3 = str1;

System.out.println(str1 == str2);        // false (different objects)
System.out.println(str1.equals(str2));    // true (same content)
System.out.println(str1 == str3);        // true (same reference)
\`\`\`

---

## 2. Explain the difference between String, StringBuffer, and StringBuilder.

**Answer:**
- **String**: Immutable, thread-safe, stored in String Pool
- **StringBuffer**: Mutable, thread-safe (synchronized), slower
- **StringBuilder**: Mutable, not thread-safe, faster than StringBuffer

**When to use:**
- Use String for constants or when immutability is needed
- Use StringBuffer for multi-threaded environments
- Use StringBuilder for single-threaded environments (most common)

---

## 3. What is the difference between ArrayList and LinkedList?

**Answer:**
- **ArrayList**: Uses dynamic array, fast random access (O(1)), slow insertion/deletion in middle (O(n))
- **LinkedList**: Uses doubly linked list, slow random access (O(n)), fast insertion/deletion (O(1))

**Use ArrayList when:** You need frequent random access
**Use LinkedList when:** You need frequent insertions/deletions

---

## 4. Explain the difference between HashMap and Hashtable.

**Answer:**
- **HashMap**: Not synchronized, allows one null key and multiple null values, faster
- **Hashtable**: Synchronized (thread-safe), doesn't allow null keys/values, slower

**In modern Java:** Use HashMap with ConcurrentHashMap for thread-safety

---

## 5. What is the difference between checked and unchecked exceptions?

**Answer:**
- **Checked Exceptions**: Must be handled at compile time (IOException, SQLException)
- **Unchecked Exceptions**: Don't need to be declared (RuntimeException, NullPointerException)

**Example:**
\`\`\`java
// Checked - must handle
try {
    FileReader file = new FileReader("file.txt");
} catch (IOException e) {
    e.printStackTrace();
}

// Unchecked - no need to handle
int[] arr = new int[5];
arr[10] = 50; // ArrayIndexOutOfBoundsException
\`\`\`

---

## 6. What is the difference between final, finally, and finalize?

**Answer:**
- **final**: Keyword used for constants, methods that can't be overridden, or classes that can't be inherited
- **finally**: Block that always executes (used in try-catch)
- **finalize()**: Method called by garbage collector before object destruction (deprecated in Java 9)

---

## 7. Explain method overloading vs method overriding.

**Answer:**
- **Overloading**: Same method name, different parameters (compile-time polymorphism)
- **Overriding**: Same method signature in child class (runtime polymorphism)

**Example:**
\`\`\`java
// Overloading
class Calculator {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

// Overriding
class Animal {
    void sound() { System.out.println("Animal makes sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Dog barks"); }
}
\`\`\`

---

## 8. What is the difference between abstract class and interface?

**Answer:**
- **Abstract Class**: Can have both abstract and concrete methods, can have instance variables, supports single inheritance
- **Interface**: All methods are abstract (before Java 8), can have default/static methods (Java 8+), supports multiple inheritance

**Use abstract class when:** You want to share code among related classes
**Use interface when:** You want to define a contract

---

## 9. Explain static keyword in Java.

**Answer:**
The \`static\` keyword means the member belongs to the class, not to instances.

**Key points:**
- Static variables are shared among all instances
- Static methods can be called without creating an object
- Static block executes when class is loaded
- Cannot access non-static members from static context

---

## 10. What is the difference between throw and throws?

**Answer:**
- **throw**: Used to explicitly throw an exception
- **throws**: Used in method signature to declare exceptions that might be thrown

**Example:**
\`\`\`java
void method() throws IOException {
    if (error) {
        throw new IOException("Error occurred");
    }
}
\`\`\`

---

## 11. Explain the concept of garbage collection in Java.

**Answer:**
Garbage Collection automatically frees memory by removing objects that are no longer referenced.

**How it works:**
1. JVM identifies unreachable objects
2. Marks them for deletion
3. Removes them from memory

**Types of GC:**
- Serial GC
- Parallel GC
- G1 GC (default in Java 9+)
- ZGC (for low latency)

---

## 12. What is the difference between this() and super()?

**Answer:**
- **this()**: Calls constructor of the same class
- **super()**: Calls constructor of parent class

**Rules:**
- Must be the first statement in constructor
- Cannot use both in the same constructor

---

## 13. Explain the difference between HashSet and TreeSet.

**Answer:**
- **HashSet**: Uses hash table, no ordering, O(1) average operations, allows null
- **TreeSet**: Uses red-black tree, sorted order, O(log n) operations, doesn't allow null

**Use HashSet when:** You need fast operations and don't care about order
**Use TreeSet when:** You need sorted elements

---

## 14. What is the difference between wait() and sleep()?

**Answer:**
- **wait()**: Object class method, releases lock, must be called from synchronized block, can be interrupted
- **sleep()**: Thread class method, doesn't release lock, can be called anywhere, can be interrupted

---

## 15. Explain the concept of wrapper classes in Java.

**Answer:**
Wrapper classes convert primitives to objects (autoboxing) and vice versa (unboxing).

**Primitive → Wrapper:**
- int → Integer
- char → Character
- boolean → Boolean
- etc.

**Example:**
\`\`\`java
// Autoboxing
Integer num = 10;  // int to Integer

// Unboxing
int value = num;   // Integer to int
\`\`\`

---

## 16. What is the difference between shallow copy and deep copy?

**Answer:**
- **Shallow Copy**: Copies object references, both objects point to same memory
- **Deep Copy**: Creates new objects, completely independent copies

**Example:**
\`\`\`java
// Shallow copy
Employee emp1 = new Employee("John");
Employee emp2 = emp1;  // Both point to same object

// Deep copy
Employee emp3 = new Employee(emp1.getName());  // New object
\`\`\`

---

## 17. Explain the concept of immutability in Java.

**Answer:**
An immutable object cannot be modified after creation.

**How to create immutable class:**
1. Make class final
2. Make all fields final and private
3. No setter methods
4. Return new objects from methods that modify state

**Benefits:** Thread-safe, can be safely shared, prevents bugs

---

## 18. What is the difference between synchronized and volatile?

**Answer:**
- **synchronized**: Ensures only one thread can access code block/method, provides mutual exclusion
- **volatile**: Ensures variable visibility across threads, doesn't provide mutual exclusion

**Use synchronized when:** You need mutual exclusion
**Use volatile when:** You only need visibility guarantee

---

## 19. Explain the concept of serialization in Java.

**Answer:**
Serialization converts objects into byte stream for storage/transmission.

**Key points:**
- Class must implement Serializable interface
- Use ObjectOutputStream for serialization
- Use ObjectInputStream for deserialization
- Use \`transient\` keyword to exclude fields

---

## 20. What is the difference between List and Set?

**Answer:**
- **List**: Ordered collection, allows duplicates, indexed access
- **Set**: Unordered collection (except TreeSet), no duplicates, no indexed access

**Common implementations:**
- List: ArrayList, LinkedList, Vector
- Set: HashSet, TreeSet, LinkedHashSet

---

## 21. Explain the concept of method chaining in Java.

**Answer:**
Method chaining allows calling multiple methods in sequence by returning \`this\`.

**Example:**
\`\`\`java
class StringBuilder {
    StringBuilder append(String str) {
        // append logic
        return this;  // Return this for chaining
    }
}

// Usage
new StringBuilder()
    .append("Hello")
    .append(" ")
    .append("World");
\`\`\`

---

## 22. What is the difference between Comparable and Comparator?

**Answer:**
- **Comparable**: Interface with \`compareTo()\` method, natural ordering, implemented by the class itself
- **Comparator**: Interface with \`compare()\` method, custom ordering, separate class

**Example:**
\`\`\`java
// Comparable
class Student implements Comparable<Student> {
    int age;
    public int compareTo(Student s) {
        return this.age - s.age;
    }
}

// Comparator
class AgeComparator implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        return s1.age - s2.age;
    }
}
\`\`\`

---

## 23. Explain the concept of inner classes in Java.

**Answer:**
Inner classes are classes defined inside another class.

**Types:**
1. **Member Inner Class**: Regular inner class
2. **Static Nested Class**: Static inner class
3. **Local Inner Class**: Defined inside method
4. **Anonymous Inner Class**: No name, defined inline

**Use cases:** Event handling, helper classes, encapsulation

---

## 24. What is the difference between Iterator and ListIterator?

**Answer:**
- **Iterator**: Can traverse in forward direction only, available for all collections
- **ListIterator**: Can traverse in both directions, only for List implementations, can modify list

**Example:**
\`\`\`java
ListIterator<String> it = list.listIterator();
while (it.hasNext()) {
    it.next();  // Forward
}
while (it.hasPrevious()) {
    it.previous();  // Backward
}
\`\`\`

---

## 25. Explain the concept of autoboxing and unboxing.

**Answer:**
- **Autoboxing**: Automatic conversion from primitive to wrapper class
- **Unboxing**: Automatic conversion from wrapper class to primitive

**Example:**
\`\`\`java
// Autoboxing
Integer num = 10;  // int → Integer

// Unboxing
int value = num;   // Integer → int

// In collections
List<Integer> list = new ArrayList<>();
list.add(5);  // Autoboxing: int → Integer
int num = list.get(0);  // Unboxing: Integer → int
\`\`\`

---

## 26. What is the difference between Vector and ArrayList?

**Answer:**
- **Vector**: Synchronized (thread-safe), slower, doubles capacity when full
- **ArrayList**: Not synchronized, faster, increases capacity by 50%

**Modern approach:** Use ArrayList with Collections.synchronizedList() if thread-safety needed

---

## 27. Explain the concept of marker interfaces in Java.

**Answer:**
Marker interfaces are empty interfaces used to mark classes with special behavior.

**Examples:**
- \`Serializable\`: Marks class as serializable
- \`Cloneable\`: Marks class as cloneable
- \`Remote\`: Marks class for RMI

**Modern approach:** Use annotations instead (e.g., @Serializable)

---

## 28. What is the difference between String Pool and Heap?

**Answer:**
- **String Pool**: Special area in heap for string literals, reuses existing strings
- **Heap**: General memory area for objects

**Example:**
\`\`\`java
String s1 = "Hello";  // String Pool
String s2 = "Hello";  // String Pool (reused)
String s3 = new String("Hello");  // Heap (new object)

System.out.println(s1 == s2);  // true (same reference)
System.out.println(s1 == s3);  // false (different references)
\`\`\`

---

## 29. Explain the concept of reflection in Java.

**Answer:**
Reflection allows inspecting and modifying classes, methods, fields at runtime.

**Use cases:**
- Getting class information
- Creating objects dynamically
- Invoking methods
- Accessing private members

**Example:**
\`\`\`java
Class<?> clazz = Class.forName("com.example.MyClass");
Object obj = clazz.newInstance();
Method method = clazz.getMethod("myMethod");
method.invoke(obj);
\`\`\`

---

## 30. What is the difference between fail-fast and fail-safe iterators?

**Answer:**
- **Fail-Fast**: Throws ConcurrentModificationException if collection is modified during iteration (ArrayList, HashMap)
- **Fail-Safe**: Doesn't throw exception, works on copy of collection (ConcurrentHashMap, CopyOnWriteArrayList)

**Example:**
\`\`\`java
// Fail-fast
List<String> list = new ArrayList<>();
list.add("A");
Iterator<String> it = list.iterator();
list.add("B");  // Will throw ConcurrentModificationException
it.next();

// Fail-safe
List<String> list = new CopyOnWriteArrayList<>();
list.add("A");
Iterator<String> it = list.iterator();
list.add("B");  // No exception
it.next();  // Works fine
\`\`\`

---

## Summary

These 30 questions cover the essential topics you'll encounter in Java interviews :

- **OOPs Concepts**: Inheritance, Polymorphism, Abstraction, Encapsulation
- **Collections Framework**: List, Set, Map implementations
- **Exception Handling**: Checked vs Unchecked, throw vs throws
- **String Handling**: String, StringBuffer, StringBuilder
- **Memory Management**: Garbage Collection, String Pool
- **Threading**: Synchronization, wait/sleep
- **Advanced Topics**: Serialization, Reflection, Inner Classes

**Tips for Interview:**
1. Always explain with code examples
2. Mention real-world use cases
3. Discuss performance implications
4. Be ready to write code on the spot
5. Ask clarifying questions if needed

Good luck with your interviews! 🚀
`,
  code: `// Interview Questions Code Examples
// These examples demonstrate key concepts from the interview questions

import java.util.*;

public class InterviewExamples {
    public static void main(String[] args) {
        System.out.println("=== Core Java Interview Questions Examples ===\\n");
        
        // 1. == vs equals()
        demonstrateEqualsVsDoubleEquals();
        
        // 2. String vs StringBuffer vs StringBuilder
        demonstrateStringTypes();
        
        // 3. ArrayList vs LinkedList
        demonstrateListTypes();
        
        // 4. HashMap vs Hashtable
        demonstrateMapTypes();
        
        // 5. Checked vs Unchecked Exceptions
        demonstrateExceptionTypes();
        
        // 6. Method Overloading vs Overriding
        demonstratePolymorphism();
        
        // 7. Collections Examples
        demonstrateCollections();
    }
    
    // 1. == vs equals()
    static void demonstrateEqualsVsDoubleEquals() {
        System.out.println("1. == vs equals()");
        System.out.println("------------------");
        
        String str1 = new String("Hello");
        String str2 = new String("Hello");
        String str3 = str1;
        
        System.out.println("str1 == str2: " + (str1 == str2));        // false
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true
        System.out.println("str1 == str3: " + (str1 == str3));        // true
        System.out.println();
    }
    
    // 2. String Types
    static void demonstrateStringTypes() {
        System.out.println("2. String vs StringBuffer vs StringBuilder");
        System.out.println("-------------------------------------------");
        
        // String - Immutable
        String str = "Hello";
        str = str + " World";  // Creates new object
        
        // StringBuffer - Mutable, Thread-safe
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" World");
        
        // StringBuilder - Mutable, Not thread-safe, Faster
        StringBuilder sbd = new StringBuilder("Hello");
        sbd.append(" World");
        
        System.out.println("String: " + str);
        System.out.println("StringBuffer: " + sb);
        System.out.println("StringBuilder: " + sbd);
        System.out.println();
    }
    
    // 3. List Types
    static void demonstrateListTypes() {
        System.out.println("3. ArrayList vs LinkedList");
        System.out.println("--------------------------");
        
        // ArrayList - Fast random access
        List<String> arrayList = new ArrayList<>();
        arrayList.add("A");
        arrayList.add("B");
        arrayList.add("C");
        System.out.println("ArrayList: " + arrayList);
        System.out.println("Get index 1: " + arrayList.get(1));  // O(1)
        
        // LinkedList - Fast insertion/deletion
        List<String> linkedList = new LinkedList<>();
        linkedList.add("X");
        linkedList.add("Y");
        linkedList.add("Z");
        System.out.println("LinkedList: " + linkedList);
        System.out.println();
    }
    
    // 4. Map Types
    static void demonstrateMapTypes() {
        System.out.println("4. HashMap vs Hashtable");
        System.out.println("------------------------");
        
        // HashMap - Not synchronized, allows null
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        hashMap.put(null, 0);  // Allowed
        System.out.println("HashMap: " + hashMap);
        
        // Hashtable - Synchronized, no null
        Hashtable<String, Integer> hashtable = new Hashtable<>();
        hashtable.put("One", 1);
        hashtable.put("Two", 2);
        // hashtable.put(null, 0);  // Not allowed - throws NullPointerException
        System.out.println("Hashtable: " + hashtable);
        System.out.println();
    }
    
    // 5. Exception Types
    static void demonstrateExceptionTypes() {
        System.out.println("5. Checked vs Unchecked Exceptions");
        System.out.println("-----------------------------------");
        
        // Unchecked Exception - No need to handle
        int[] arr = new int[5];
        try {
            arr[10] = 50;  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught unchecked exception: " + e.getClass().getSimpleName());
        }
        
        // Checked Exception - Must handle
        try {
            // FileReader file = new FileReader("nonexistent.txt");
            // This would throw IOException (checked exception)
            System.out.println("Checked exceptions must be handled with try-catch or throws");
        } catch (Exception e) {
            System.out.println("Exception handled");
        }
        System.out.println();
    }
    
    // 6. Polymorphism
    static void demonstratePolymorphism() {
        System.out.println("6. Method Overloading vs Overriding");
        System.out.println("-----------------------------------");
        
        Calculator calc = new Calculator();
        System.out.println("Overloading - add(2, 3): " + calc.add(2, 3));
        System.out.println("Overloading - add(2, 3, 4): " + calc.add(2, 3, 4));
        
        Animal animal = new Dog();
        animal.sound();  // Overriding - calls Dog's sound()
        System.out.println();
    }
    
    // 7. Collections
    static void demonstrateCollections() {
        System.out.println("7. Collections Framework");
        System.out.println("-------------------------");
        
        // HashSet - No duplicates, no order
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Apple");  // Duplicate ignored
        System.out.println("HashSet: " + hashSet);
        
        // TreeSet - Sorted, no duplicates
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Zebra");
        treeSet.add("Apple");
        treeSet.add("Banana");
        System.out.println("TreeSet (sorted): " + treeSet);
        
        // List vs Set
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("A");  // Duplicate allowed
        System.out.println("List (allows duplicates): " + list);
        
        Set<String> set = new HashSet<>(list);
        System.out.println("Set (no duplicates): " + set);
    }
}

// Helper classes for examples
class Calculator {
    // Method Overloading
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
}

class Animal {
    void sound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}`
};

export default javaInterviewQuestions;

