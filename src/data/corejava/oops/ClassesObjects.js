const classesObjects = {
  id: 'classes-objects',
  title: 'Classes and Objects',
  description: 'The foundation of object-oriented programming in Java',
  content: `
# Classes and Objects - The Foundation of Object-Oriented Programming

Classes and objects are the fundamental building blocks of object-oriented programming in Java. A **class** is a blueprint or template that defines the structure and behavior of objects, while an **object** is a specific instance of a class with actual data values. Understanding classes and objects is essential for mastering Java programming and object-oriented design principles.

Classes encapsulate data (attributes) and behavior (methods) into a single unit, enabling code organization, reusability, and maintainability. Objects represent real-world entities in software, allowing developers to model complex systems using familiar concepts. Enterprise applications extensively use classes and objects to organize code, manage state, and implement business logic.

**Class and Object Relationship:**
- **Class**: Template defining attributes and methods (e.g., "Car" class)
- **Object**: Specific instance with actual values (e.g., "2023 Toyota Camry" object)
- **Multiple objects** can be created from a single class
- Each object has its own **independent state** (attribute values)

---

## What is a Class?

A class is a template that defines:
- **Attributes** (what it has) — variables
- **Behaviors** (what it does) — methods

\`\`\`java
public class Car {
    // Attributes (instance variables)
    String brand;
    String model;
    int year;
    double price;
    
    // Behavior (method)
    void start() {
        System.out.println("The " + brand + " is starting...");
    }
    
    void displayInfo() {
        System.out.println(year + " " + brand + " " + model + " - $" + price);
    }
}
\`\`\`

---

## What is an Object?

An object is a specific instance of a class. It has actual values for the attributes.

\`\`\`java
// Creating objects
Car myCar = new Car();
myCar.brand = "Toyota";
myCar.model = "Camry";
myCar.year = 2023;
myCar.price = 28000;

Car yourCar = new Car();
yourCar.brand = "Honda";
yourCar.model = "Civic";
yourCar.year = 2022;
yourCar.price = 25000;
\`\`\`

**Key insight:** \`myCar\` and \`yourCar\` are different objects, but they're both Cars. They have the same structure but different data.

---

## Creating Objects: The \`new\` Keyword

\`\`\`java
ClassName objectName = new ClassName();
\`\`\`

What happens when you write \`new Car()\`:
1. Memory is allocated for the object
2. Instance variables get default values
3. Constructor is called
4. Reference to the object is returned

\`\`\`java
Car car1 = new Car();  // car1 points to a new Car object
Car car2 = new Car();  // car2 points to a different Car object
Car car3 = car1;       // car3 points to the SAME object as car1
\`\`\`

---

## Accessing Members

Use the dot (.) operator to access an object's members:

\`\`\`java
// Accessing variables
car1.brand = "Ford";
String b = car1.brand;

// Calling methods
car1.start();
car1.displayInfo();
\`\`\`

---

## Instance vs Class Members

### Instance Members
Belong to each object. Each object has its own copy.

\`\`\`java
public class Counter {
    int count = 0;  // Each Counter object has its own count
    
    void increment() {
        count++;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();  // c1.count = 1
c2.increment();  // c2.count = 1 (separate from c1)
\`\`\`

### Class Members (static)
Belong to the class itself. Shared by all objects.

\`\`\`java
public class Counter {
    static int totalCounters = 0;  // Shared by all
    int count = 0;                 // Each object has its own
    
    public Counter() {
        totalCounters++;  // Increment shared counter
    }
}

Counter c1 = new Counter();  // totalCounters = 1
Counter c2 = new Counter();  // totalCounters = 2
Counter c3 = new Counter();  // totalCounters = 3
\`\`\`

---

## Object Memory Model

\`\`\`
Stack Memory              Heap Memory
┌─────────────┐          ┌─────────────────┐
│ car1 ───────┼─────────→│ Car Object      │
│             │          │ brand: "Toyota" │
│ car2 ───────┼────┐     │ model: "Camry"  │
│             │    │     │ year: 2023      │
│ car3 ───────┼────┼──→  └─────────────────┘
└─────────────┘    │
                   │     ┌─────────────────┐
                   └────→│ Car Object      │
                         │ brand: "Honda"  │
                         │ model: "Civic"  │
                         │ year: 2022      │
                         └─────────────────┘
\`\`\`

---

## Multiple Classes in a Project

In real projects, you'll have many classes working together:

\`\`\`java
// User.java
public class User {
    String name;
    String email;
}

// Product.java
public class Product {
    String name;
    double price;
}

// Order.java
public class Order {
    User customer;      // An Order HAS a User
    Product[] items;    // An Order HAS Products
    double total;
}
\`\`\`

---

## Best Practices

1. **One class per file** — Keep it organized
2. **Meaningful names** — \`Customer\` not \`C1\`
3. **Single responsibility** — Each class does one thing well
4. **Encapsulation** — Use private fields with getters/setters
5. **Initialize objects properly** — Use constructors

---

## Real-World Example: E-Commerce

\`\`\`java
public class Product {
    private int id;
    private String name;
    private double price;
    private int stock;
    
    public boolean isAvailable() {
        return stock > 0;
    }
    
    public void reduceStock(int quantity) {
        if (quantity <= stock) {
            stock -= quantity;
        }
    }
}

public class Customer {
    private String name;
    private String email;
    private List<Order> orderHistory;
    
    public void placeOrder(Order order) {
        orderHistory.add(order);
    }
}

public class Order {
    private Customer customer;
    private List<Product> products;
    private Date orderDate;
    private double total;
    
    public void calculateTotal() {
        total = products.stream()
                       .mapToDouble(Product::getPrice)
                       .sum();
    }
}
\`\`\`

This is how real applications are structured — multiple classes representing different concepts, working together.

---

## 10 Important Classes & Objects Interview Questions

### 1. What is a class vs an object?
**Answer:** A class is the blueprint; an object is an instance residing on the heap with its own state.
Many objects can share one class definition.

### 2. What is object identity vs equality?
**Answer:** Identity (\`==\` on references) compares memory address; logical equality uses \`equals\` (when overridden).
Contracts require consistent \`hashCode\` with \`equals\`.

### 3. What is \`this\`?
**Answer:** Reference to the current instance—disambiguates fields from parameters; passed implicitly to instance methods.
In constructors, \`this(...)\` chains constructors.

### 4. What are instance fields vs static fields?
**Answer:** Instance fields per object; static fields shared across all instances of the class.
Static members bind to class load time.

### 5. Scenario: singleton service class—what object considerations matter?
**Answer:** Thread-safety of mutable state, lazy vs eager initialization, and testability (often prefer dependency injection over hard singletons).
Interviewers discuss Spring singleton scope vs plain static.

### 6. What is an anonymous object?
**Answer:** Created without storing reference—\`new Person().greet()\`—eligible for GC immediately after use if unreachable.
Useful for one-shot helpers.

### 7. How does the GC relate to objects?
**Answer:** Unreachable objects are collected automatically; finalize is deprecated—use try-with-resources for cleanup.
Don’t rely on prompt destruction.

### 8. What is a POJO?
**Answer:** Plain Old Java Object—simple data holder without framework inheritance requirements; often with accessors.
JPA entities are annotated POJOs.

### 9. Why avoid public mutable fields?
**Answer:** Breaks encapsulation—callers can put objects in invalid states; use accessors with validation.
Immutability reduces bugs.

### 10. What is object initialization order?
**Answer:** Superclass fields and constructors run before subclass; instance initializers and field defaults precede constructors.
Understanding this explains subtle constructor bugs.

`,
  code: `// Classes and Objects Demo

public class ClassesObjectsDemo {
    public static void main(String[] args) {
        System.out.println("=== Classes and Objects Demo ===\\n");
        
        // 1. CREATING OBJECTS
        System.out.println("1. CREATING OBJECTS");
        System.out.println("   -----------------");
        
        // Create first car
        Car car1 = new Car();
        car1.brand = "Toyota";
        car1.model = "Camry";
        car1.year = 2023;
        car1.price = 28000;
        
        // Create second car
        Car car2 = new Car();
        car2.brand = "Honda";
        car2.model = "Civic";
        car2.year = 2022;
        car2.price = 25000;
        
        System.out.println("   Created 2 Car objects");
        System.out.println();
        
        // 2. ACCESSING MEMBERS
        System.out.println("2. ACCESSING MEMBERS");
        System.out.println("   ------------------");
        
        System.out.println("   Car 1: " + car1.brand + " " + car1.model);
        System.out.println("   Car 2: " + car2.brand + " " + car2.model);
        System.out.println();
        
        // 3. CALLING METHODS
        System.out.println("3. CALLING METHODS");
        System.out.println("   ----------------");
        
        car1.displayInfo();
        car1.start();
        car1.accelerate();
        car1.accelerate();
        System.out.println();
        
        car2.displayInfo();
        car2.start();
        System.out.println();
        
        // 4. OBJECT REFERENCES
        System.out.println("4. OBJECT REFERENCES");
        System.out.println("   ------------------");
        
        Car car3 = car1;  // car3 points to same object as car1
        System.out.println("   car3 = car1 (same reference)");
        System.out.println("   car3.brand: " + car3.brand);
        
        car3.brand = "Lexus";  // Changes car1 too!
        System.out.println("   After car3.brand = 'Lexus':");
        System.out.println("   car1.brand: " + car1.brand);
        System.out.println("   car3.brand: " + car3.brand);
        System.out.println("   (Both changed because same object!)");
        System.out.println();
        
        // 5. STATIC MEMBERS
        System.out.println("5. STATIC MEMBERS");
        System.out.println("   ---------------");
        
        System.out.println("   Total cars created: " + Car.totalCars);
        System.out.println("   (Shared across all Car objects)");
        System.out.println();
        
        // 6. PRACTICAL EXAMPLE
        System.out.println("6. PRACTICAL EXAMPLE - Bank Account");
        System.out.println("   ----------------------------------");
        
        BankAccount account1 = new BankAccount("Alice", 1000);
        BankAccount account2 = new BankAccount("Bob", 500);
        
        account1.display();
        account2.display();
        
        System.out.println("\\n   Transactions:");
        account1.deposit(500);
        account1.withdraw(200);
        account2.deposit(1000);
        
        System.out.println("\\n   After transactions:");
        account1.display();
        account2.display();
        
        System.out.println("\\n   Total accounts: " + BankAccount.getTotalAccounts());
    }
}

// Car class
class Car {
    // Static variable - shared by all objects
    static int totalCars = 0;
    
    // Instance variables - each object has its own
    String brand;
    String model;
    int year;
    double price;
    int speed = 0;
    
    // Constructor
    public Car() {
        totalCars++;
    }
    
    // Methods
    void start() {
        System.out.println("   " + brand + " " + model + " is starting...");
    }
    
    void accelerate() {
        speed += 20;
        System.out.println("   Accelerating... Speed: " + speed + " km/h");
    }
    
    void displayInfo() {
        System.out.println("   " + year + " " + brand + " " + model + " - $" + price);
    }
}

// BankAccount class
class BankAccount {
    private static int totalAccounts = 0;
    
    private String owner;
    private double balance;
    private int accountNumber;
    
    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountNumber = ++totalAccounts;
    }
    
    public void deposit(double amount) {
        balance += amount;
        System.out.println("   " + owner + " deposited $" + amount);
    }
    
    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("   " + owner + " withdrew $" + amount);
        } else {
            System.out.println("   Insufficient funds for " + owner);
        }
    }
    
    public void display() {
        System.out.println("   Account #" + accountNumber + ": " + owner + " - Balance: $" + balance);
    }
    
    public static int getTotalAccounts() {
        return totalAccounts;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Student class with properties and methods',
      hint: 'Include name, grade, and methods to display info',
      starterCode: `public class StudentDemo {
    public static void main(String[] args) {
        System.out.println("=== Student Management ===\\n");
        
        // Create students
        Student s1 = new Student("Alice", 101, 85.5);
        Student s2 = new Student("Bob", 102, 92.0);
        Student s3 = new Student("Charlie", 103, 78.5);
        
        // Display all students
        s1.display();
        s2.display();
        s3.display();
        
        // Update grades
        System.out.println("\\nUpdating grades...");
        s1.updateGrade(90.0);
        s3.updateGrade(82.0);
        
        // Display updated info
        System.out.println("\\nAfter updates:");
        s1.display();
        s3.display();
        
        // Show total students
        System.out.println("\\nTotal students: " + Student.getTotalStudents());
    }
}

class Student {
    private static int totalStudents = 0;
    
    private String name;
    private int id;
    private double grade;
    
    public Student(String name, int id, double grade) {
        this.name = name;
        this.id = id;
        this.grade = grade;
        totalStudents++;
    }
    
    public void updateGrade(double newGrade) {
        this.grade = newGrade;
        System.out.println(name + "'s grade updated to " + newGrade);
    }
    
    public void display() {
        String letterGrade = grade >= 90 ? "A" : grade >= 80 ? "B" : grade >= 70 ? "C" : "F";
        System.out.println("ID: " + id + " | Name: " + name + " | Grade: " + grade + " (" + letterGrade + ")");
    }
    
    public static int getTotalStudents() {
        return totalStudents;
    }
}`
    }
  ]
};

export default classesObjects;
