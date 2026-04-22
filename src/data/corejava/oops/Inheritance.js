const inheritance = {
  id: 'inheritance',
  title: 'Inheritance',
  description: 'Building new classes from existing ones',
  content: `
# Inheritance - Building New Classes from Existing Ones

![Inheritance](/corejava/oops/inheritance.png)

Inheritance is a fundamental object-oriented programming concept that enables developers to create new classes based on existing classes, promoting code reuse and establishing hierarchical relationships between classes. When multiple classes share common properties and behaviors, inheritance allows you to define these commonalities in a base class and have derived classes inherit them automatically.

Inheritance establishes an "is-a" relationship between classes, where a derived class (subclass) is a specialized version of its base class (superclass). This relationship enables polymorphism, code organization, and maintainability in large-scale software development. Enterprise applications extensively use inheritance to model real-world hierarchies, such as employee management systems, vehicle classifications, and user role hierarchies.

**Inheritance Benefits:**
- **Code Reuse**: Eliminates duplicate code by inheriting common functionality
- **Maintainability**: Changes to base class automatically affect all derived classes
- **Polymorphism**: Enables treating derived classes as their base class type
- **Hierarchical Organization**: Models real-world relationships naturally
- **Extensibility**: Easy to add new derived classes without modifying existing code

---

## The Basic Idea

\`\`\`java
// Parent class (superclass)
public class Animal {
    String name;
    
    void eat() {
        System.out.println(name + " is eating");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (subclass)
public class Dog extends Animal {
    void bark() {
        System.out.println(name + " says Woof!");
    }
}
\`\`\`

Now \`Dog\` has:
- \`name\` (inherited from Animal)
- \`eat()\` (inherited from Animal)
- \`sleep()\` (inherited from Animal)
- \`bark()\` (its own method)

\`\`\`java
Dog myDog = new Dog();
myDog.name = "Buddy";
myDog.eat();    // Inherited
myDog.sleep();  // Inherited
myDog.bark();   // Own method
\`\`\`

---

## The \`extends\` Keyword

\`\`\`java
class ChildClass extends ParentClass {
    // Child class body
}
\`\`\`

**Important:** Java supports single inheritance only. A class can extend only ONE other class.

\`\`\`java
class A { }
class B extends A { }      // OK
class C extends A, B { }   // ERROR! Can't extend multiple classes
\`\`\`

---

## What Gets Inherited?

| Inherited | Not Inherited |
|-----------|---------------|
| public members | private members |
| protected members | Constructors |
| default members (same package) | |

\`\`\`java
public class Parent {
    public int publicVar;      // Inherited
    protected int protectedVar; // Inherited
    int defaultVar;            // Inherited (same package)
    private int privateVar;    // NOT inherited
    
    public Parent() { }        // NOT inherited (but can be called)
}
\`\`\`

---

## The \`super\` Keyword

\`super\` refers to the parent class. Use it to:

### 1. Call Parent Constructor

\`\`\`java
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    String breed;
    
    Dog(String name, String breed) {
        super(name);  // Call parent constructor FIRST
        this.breed = breed;
    }
}
\`\`\`

**Rule:** \`super()\` must be the first statement in the constructor.

### 2. Access Parent Members

\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    void makeSound() {
        super.makeSound();  // Call parent's version
        System.out.println("Woof!");
    }
}
\`\`\`

---

## Method Overriding

A child class can provide its own implementation of a parent method:

\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Some generic sound");
    }
}

class Dog extends Animal {
    @Override  // Good practice to add this annotation
    void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }
}
\`\`\`

**Rules for overriding:**
- Same method name
- Same parameters
- Same or more accessible (can't make it more restrictive)
- Same or covariant return type

---

## Types of Inheritance

### 1. Single Inheritance
\`\`\`
    Animal
       ↓
      Dog
\`\`\`

### 2. Multilevel Inheritance
\`\`\`
    Animal
       ↓
    Mammal
       ↓
      Dog
\`\`\`

### 3. Hierarchical Inheritance
\`\`\`
       Animal
      /   |   \\
    Dog  Cat  Bird
\`\`\`

### 4. Multiple Inheritance (NOT supported with classes)
\`\`\`
   A      B
    \\    /
      C     ← NOT allowed in Java (use interfaces instead)
\`\`\`

---

## The \`final\` Keyword

### Final Class — Cannot Be Extended

\`\`\`java
final class SecureClass {
    // No one can extend this
}

class Hacker extends SecureClass { }  // ERROR!
\`\`\`

### Final Method — Cannot Be Overridden

\`\`\`java
class Parent {
    final void importantMethod() {
        // Child classes can't change this
    }
}
\`\`\`

---

## IS-A Relationship

Inheritance creates an "is-a" relationship:

\`\`\`java
Dog myDog = new Dog();

// A Dog IS-A Animal
Animal animal = myDog;  // Valid!

// But an Animal is NOT necessarily a Dog
Dog dog = new Animal();  // ERROR!
\`\`\`

---

## Real-World Example: Employee Hierarchy

\`\`\`java
// Base class
public class Employee {
    protected String name;
    protected String id;
    protected double baseSalary;
    
    public Employee(String name, String id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }
    
    public double calculateSalary() {
        return baseSalary;
    }
    
    public void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name);
    }
}

// Manager gets bonus
public class Manager extends Employee {
    private double bonus;
    private int teamSize;
    
    public Manager(String name, String id, double baseSalary, double bonus) {
        super(name, id, baseSalary);
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
}

// Developer gets overtime
public class Developer extends Employee {
    private int overtimeHours;
    private double hourlyRate;
    
    public Developer(String name, String id, double baseSalary, double hourlyRate) {
        super(name, id, baseSalary);
        this.hourlyRate = hourlyRate;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + (overtimeHours * hourlyRate);
    }
}
\`\`\`

Each employee type calculates salary differently, but they all share common properties and behaviors. This demonstrates how inheritance enables code reuse while allowing specialized behavior in derived classes.

---

## Real-World Applications

### Banking System
Banking applications use inheritance to model different account types. A base Account class defines common properties like account number and balance, while derived classes like SavingsAccount, CheckingAccount, and LoanAccount add specialized features.

**Implementation Example:**
- Base Account class with common operations (deposit, withdraw, getBalance)
- SavingsAccount extends Account with interest calculation
- CheckingAccount extends Account with overdraft protection
- LoanAccount extends Account with repayment scheduling

### E-Commerce Platform
E-commerce systems use inheritance for product hierarchies. A base Product class contains common attributes, while Electronics, Clothing, and Books add category-specific properties.

**Implementation Example:**
- Product base class with name, price, SKU
- Electronics extends Product with warranty and specifications
- Clothing extends Product with size and material
- Books extends Product with author and ISBN

### User Management System
Applications model user hierarchies using inheritance. A base User class provides authentication, while Admin, Customer, and Employee classes add role-specific functionality.

**Implementation Example:**
- User base class with login and profile management
- Admin extends User with system management capabilities
- Customer extends User with order history
- Employee extends User with timesheet tracking

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Violating IS-A Relationship
**Problem:** Using inheritance for "has-a" relationships instead of "is-a" relationships.

**Solution:** Use composition for "has-a" relationships:

\`\`\`java
// WRONG - Car is not a type of Engine
class Car extends Engine { }

// CORRECT - Car has an Engine
class Car {
    private Engine engine;
}
\`\`\`

### Mistake 2: Not Calling super() in Constructor
**Problem:** Forgetting to call parent constructor when parent has parameterized constructor.

**Solution:** Always call super() as first statement:

\`\`\`java
class Child extends Parent {
    Child(String name) {
        super(name);  // Must be first
        // other initialization
    }
}
\`\`\`

### Mistake 3: Making Everything Public
**Problem:** Exposing all members as public breaks encapsulation.

**Solution:** Use protected for members that should be accessible to subclasses:

\`\`\`java
class Parent {
    protected String name;  // Accessible to subclasses
    private String secret;  // Not accessible
}
\`\`\`

### Mistake 4: Deep Inheritance Hierarchies
**Problem:** Creating inheritance chains that are too deep makes code hard to understand.

**Solution:** Keep inheritance hierarchies shallow (2-3 levels maximum):

\`\`\`java
// AVOID: Too deep
Animal → Mammal → Dog → Puppy → SpecificBreed

// PREFER: Shallow hierarchy
Animal → Dog → SpecificBreed
\`\`\`

### Mistake 5: Not Using @Override Annotation
**Problem:** Missing @Override can lead to accidental method hiding instead of overriding.

**Solution:** Always use @Override when overriding methods:

\`\`\`java
@Override
public void makeSound() {
    System.out.println("Woof!");
}
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is inheritance and why is it important?

Inheritance is an object-oriented programming concept that allows a class to inherit properties and methods from another class. It's important because it promotes code reuse, reduces duplication, enables polymorphism, and models real-world hierarchical relationships naturally. Inheritance is one of the four pillars of OOP along with [Encapsulation](/tutorial/encapsulation), [Polymorphism](/tutorial/polymorphism), and [Abstraction](/tutorial/abstraction).

### What's the difference between inheritance and composition?

Inheritance represents an "is-a" relationship (Dog is an Animal), while composition represents a "has-a" relationship (Car has an Engine). Use inheritance when the derived class is a specialized version of the base class. Use composition when one class contains another class as a component. Composition is generally more flexible and should be preferred when the relationship isn't truly "is-a".

### Can a class extend multiple classes in Java?

No, Java supports only single inheritance for classes. A class can extend only one parent class. However, Java supports multiple inheritance through interfaces - a class can implement multiple interfaces. This design prevents the "diamond problem" that occurs in languages with multiple inheritance. Learn about [Interfaces](/tutorial/interfaces) to understand how to achieve multiple inheritance-like behavior.

### What is the difference between extends and implements?

The \`extends\` keyword is used for class inheritance, where a subclass inherits from a superclass. The \`implements\` keyword is used when a class implements an interface, agreeing to provide implementations for all interface methods. A class can extend one class and implement multiple interfaces. Learn about [Interfaces](/tutorial/interfaces) for more details.

### What is method overriding?

Method overriding occurs when a subclass provides its own implementation of a method that exists in the parent class. The method signature must match exactly, and the @Override annotation should be used. Overriding enables polymorphism, where the same method call can produce different results based on the actual object type. This is closely related to [Polymorphism](/tutorial/polymorphism).

### What is the super keyword used for?

The \`super\` keyword refers to the parent class. It's used to: (1) call the parent class constructor with \`super()\`, (2) access parent class members with \`super.member\`, and (3) call parent class methods with \`super.method()\`. The super() call must be the first statement in a constructor.

### What gets inherited from the parent class?

Public and protected members are inherited, as well as default (package-private) members if the subclass is in the same package. Private members are NOT inherited but can be accessed through public/protected methods. Constructors are not inherited but can be called using super(). Static members are inherited but belong to the class, not instances.

### Can I prevent a class from being inherited?

Yes, use the \`final\` keyword. A \`final class\` cannot be extended, and a \`final method\` cannot be overridden. This is useful for security (preventing modification) and performance (enabling compiler optimizations). Final classes are commonly used for utility classes and immutable objects.

### What is multilevel inheritance?

Multilevel inheritance occurs when a class inherits from another class, which in turn inherits from yet another class. For example: Animal → Mammal → Dog. This creates an inheritance chain where each level adds more specific functionality. While useful, deep inheritance hierarchies should be avoided as they make code harder to understand and maintain.

### How does inheritance relate to polymorphism?

Inheritance enables polymorphism by allowing objects of derived classes to be treated as objects of their base class. This means you can write code that works with the base class type, and it will automatically work with any derived class. For example, an Animal array can hold Dog, Cat, and Bird objects. Learn more about [Polymorphism](/tutorial/polymorphism) to understand this powerful concept.

---

## Key Takeaways

Before proceeding to advanced OOP concepts, ensure you understand these inheritance fundamentals:

- **Inheritance creates "is-a" relationships** between classes, enabling code reuse
- **extends keyword** is used to create inheritance relationships in Java
- **super keyword** accesses parent class members and calls parent constructors
- **Method overriding** allows subclasses to provide specialized implementations
- **Java supports single inheritance** for classes but multiple inheritance through interfaces
- **@Override annotation** should always be used when overriding methods
- **Protected access** allows subclasses to access parent members while maintaining encapsulation
- **Inheritance enables polymorphism** by allowing derived classes to be treated as base class types

---

## What's Next?

Now that you understand inheritance, you're ready to explore related OOP concepts:

### Immediate Next Steps

1. **[Polymorphism](/tutorial/polymorphism)**: Learn how inheritance enables one interface with many implementations
2. **[Encapsulation](/tutorial/encapsulation)**: Understand data hiding and access control in inheritance
3. **[Abstraction](/tutorial/abstraction)**: Learn to hide complexity while showing essential features
4. **[Interfaces](/tutorial/interfaces)**: Discover how to achieve multiple inheritance-like behavior

### Advanced Topics

- **Abstract Classes**: Learn about classes that cannot be instantiated
- **Method Overloading vs Overriding**: Understand the differences
- **Covariant Return Types**: Learn about return type flexibility in overriding
- **Design Patterns**: Explore inheritance-based patterns like Template Method

### Related Tutorials

- **[OOPs Introduction](/tutorial/oops-introduction)**: Review object-oriented programming fundamentals
- **[Classes and Objects](/tutorial/classes-objects)**: Understand the foundation of inheritance
- **[Constructors](/tutorial/constructors)**: Learn how constructors work in inheritance
- **[Java Introduction](/tutorial/java-introduction)**: Master Java fundamentals

Inheritance is a powerful tool for building maintainable, extensible software. Continue learning about [Polymorphism](/tutorial/polymorphism) to see how inheritance enables flexible, dynamic behavior in your applications.

---

## 10 Important Inheritance Interview Questions

### 1. Why does Java allow only single class inheritance?
**Answer:** To avoid diamond ambiguity with state fields; multiple interface inheritance is allowed without duplicated state layout.
Design patterns bridge gaps.

### 2. What does \`super\` refer to?
**Answer:** Superclass members—constructor chaining \`super(...)\`, method calls when overriding.
Necessary when subclass hides names.

### 3. What is method overriding vs overloading in inheritance?
**Answer:** Overriding replaces superclass behavior with same signature; overloading adds variants in same class hierarchy context.
\`@Override\` prevents accidental overloads.

### 4. Can you override \`static\` methods?
**Answer:** No true overriding—static methods hide by class; runtime dispatch doesn’t apply—avoid confusing hierarchies.
Call with class name for clarity.

### 5. What is Liskov Substitution Principle?
**Answer:** Subtypes must be substitutable for supertypes without breaking expectations—overridden methods must honor contracts.
Violations cause fragile polymorphism.

### 6. Scenario: \`equals\` in inheritance—what breaks?
**Answer:** Symmetry breaks if subclass adds fields without careful design—often prefer composition or \`getClass\` checks in strict equality.
Effective Java discusses \`equals\` pitfalls.

### 7. What is \`protected\` access?
**Answer:** Visible to subclasses and same package—use for extension hooks, not as public API lightly.
Framework templates use protected methods.

### 8. When should you stop subclassing?
**Answer:** When behavior varies along multiple axes—prefer composition or strategy pattern to avoid deep fragile trees.
“Favor composition over inheritance.”

### 9. What is abstract class vs interface for inheritance?
**Answer:** Abstract classes share implementation and state; interfaces define behavior contracts—Java 8+ defaults blur lines.
Choose based on is-a vs capability.

### 10. How does \`Object\` fit into every class?
**Answer:** All classes extend \`Object\` implicitly—\`toString\`, \`equals\`, \`hashCode\` contracts originate here.
Override thoughtfully for value types.
---

## Topic-Focused Practice for Inheritance

### Real-World Scenarios

1. Build one mini exercise focused on **is-a relationships** and explain why your chosen approach is correct.
2. Add a second variation where **method overriding** changes the expected output or system behavior.
3. Document one production caution related to **super keyword** and how you would monitor it.

### Page-Specific Interview Questions

1. In Inheritance, how do you decide between approaches related to **is-a relationships** when requirements conflict?
2. What debugging steps would you follow if **method overriding** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **super keyword**, and how would you reduce them?
4. What is one real incident where misunderstanding **is-a relationships** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **method overriding** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **is-a relationships** and one that highlights **method overriding**.
- Record typical errors around **super keyword** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

`,
  code: `// Inheritance Demo

public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Inheritance Demo ===\\n");
        
        // 1. BASIC INHERITANCE
        System.out.println("1. BASIC INHERITANCE");
        System.out.println("   ------------------");
        
        Dog dog = new Dog("Buddy", "Golden Retriever");
        dog.eat();      // Inherited from Animal
        dog.sleep();    // Inherited from Animal
        dog.bark();     // Dog's own method
        System.out.println();
        
        Cat cat = new Cat("Whiskers", true);
        cat.eat();
        cat.meow();
        System.out.println();
        
        // 2. METHOD OVERRIDING
        System.out.println("2. METHOD OVERRIDING");
        System.out.println("   ------------------");
        
        Animal genericAnimal = new Animal("Generic");
        genericAnimal.makeSound();
        
        dog.makeSound();  // Overridden in Dog
        cat.makeSound();  // Overridden in Cat
        System.out.println();
        
        // 3. SUPER KEYWORD
        System.out.println("3. SUPER KEYWORD");
        System.out.println("   --------------");
        
        Bird bird = new Bird("Tweety", true);
        bird.move();  // Calls super.move() then adds flying
        System.out.println();
        
        // 4. IS-A RELATIONSHIP
        System.out.println("4. IS-A RELATIONSHIP (Polymorphism)");
        System.out.println("   ---------------------------------");
        
        Animal[] animals = new Animal[3];
        animals[0] = new Dog("Rex", "German Shepherd");
        animals[1] = new Cat("Mittens", false);
        animals[2] = new Bird("Polly", true);
        
        for (Animal animal : animals) {
            System.out.print("   ");
            animal.makeSound();  // Each makes its own sound!
        }
        System.out.println();
        
        // 5. MULTILEVEL INHERITANCE
        System.out.println("5. MULTILEVEL INHERITANCE");
        System.out.println("   -----------------------");
        
        Puppy puppy = new Puppy("Max", "Labrador", 3);
        puppy.eat();
        puppy.bark();
        puppy.play();
        System.out.println();
        
        // 6. REAL-WORLD EXAMPLE
        System.out.println("6. REAL-WORLD EXAMPLE - Employee Hierarchy");
        System.out.println("   ----------------------------------------");
        
        Employee[] employees = new Employee[3];
        employees[0] = new Manager("Alice", "M001", 80000, 20000);
        employees[1] = new Developer("Bob", "D001", 70000, 50);
        employees[2] = new Intern("Charlie", "I001", 30000, "Engineering");
        
        System.out.println("   Employee Salaries:");
        for (Employee emp : employees) {
            emp.displayInfo();
        }
    }
}

// Base Animal class
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println("   " + name + " is eating");
    }
    
    public void sleep() {
        System.out.println("   " + name + " is sleeping");
    }
    
    public void move() {
        System.out.println("   " + name + " is moving");
    }
    
    public void makeSound() {
        System.out.println("   " + name + " makes a sound");
    }
}

// Dog extends Animal
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println("   " + name + " (" + breed + ") barks: Woof!");
    }
    
    @Override
    public void makeSound() {
        System.out.println("   " + name + " says: Woof! Woof!");
    }
}

// Cat extends Animal
class Cat extends Animal {
    private boolean isIndoor;
    
    public Cat(String name, boolean isIndoor) {
        super(name);
        this.isIndoor = isIndoor;
    }
    
    public void meow() {
        System.out.println("   " + name + " meows: Meow!");
    }
    
    @Override
    public void makeSound() {
        System.out.println("   " + name + " says: Meow! Meow!");
    }
}

// Bird extends Animal
class Bird extends Animal {
    private boolean canFly;
    
    public Bird(String name, boolean canFly) {
        super(name);
        this.canFly = canFly;
    }
    
    @Override
    public void move() {
        super.move();  // Call parent's move
        if (canFly) {
            System.out.println("   " + name + " is also flying!");
        }
    }
    
    @Override
    public void makeSound() {
        System.out.println("   " + name + " says: Tweet! Tweet!");
    }
}

// Puppy extends Dog (Multilevel inheritance)
class Puppy extends Dog {
    private int ageInMonths;
    
    public Puppy(String name, String breed, int ageInMonths) {
        super(name, breed);
        this.ageInMonths = ageInMonths;
    }
    
    public void play() {
        System.out.println("   " + name + " (" + ageInMonths + " months) is playing!");
    }
}

// Employee hierarchy
class Employee {
    protected String name;
    protected String id;
    protected double baseSalary;
    
    public Employee(String name, String id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }
    
    public double calculateSalary() {
        return baseSalary;
    }
    
    public void displayInfo() {
        System.out.println("   " + getClass().getSimpleName() + " " + name + 
                          " (" + id + "): $" + calculateSalary());
    }
}

class Manager extends Employee {
    private double bonus;
    
    public Manager(String name, String id, double baseSalary, double bonus) {
        super(name, id, baseSalary);
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
}

class Developer extends Employee {
    private int overtimeHours;
    private double hourlyRate;
    
    public Developer(String name, String id, double baseSalary, double hourlyRate) {
        super(name, id, baseSalary);
        this.hourlyRate = hourlyRate;
        this.overtimeHours = 10;  // Default overtime
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + (overtimeHours * hourlyRate);
    }
}

class Intern extends Employee {
    private String department;
    
    public Intern(String name, String id, double baseSalary, String department) {
        super(name, id, baseSalary);
        this.department = department;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Vehicle hierarchy with Car and Motorcycle',
      hint: 'Use inheritance to share common properties like brand, model, year',
      starterCode: `public class VehicleDemo {
    public static void main(String[] args) {
        System.out.println("=== Vehicle Hierarchy ===\\n");
        
        // Create vehicles
        Car car = new Car("Toyota", "Camry", 2023, 4, true);
        Motorcycle bike = new Motorcycle("Harley-Davidson", "Street 750", 2022, "Cruiser");
        
        // Display info
        System.out.println("Car:");
        car.displayInfo();
        car.startEngine();
        car.honk();
        
        System.out.println("\\nMotorcycle:");
        bike.displayInfo();
        bike.startEngine();
        bike.wheelie();
        
        // Polymorphism
        System.out.println("\\n--- All Vehicles ---");
        Vehicle[] vehicles = {car, bike};
        for (Vehicle v : vehicles) {
            v.startEngine();
        }
    }
}

class Vehicle {
    protected String brand;
    protected String model;
    protected int year;
    
    public Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    public void startEngine() {
        System.out.println(brand + " " + model + " engine started!");
    }
    
    public void displayInfo() {
        System.out.println(year + " " + brand + " " + model);
    }
}

class Car extends Vehicle {
    private int doors;
    private boolean hasAC;
    
    public Car(String brand, String model, int year, int doors, boolean hasAC) {
        super(brand, model, year);
        this.doors = doors;
        this.hasAC = hasAC;
    }
    
    public void honk() {
        System.out.println("Beep beep!");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Doors: " + doors + ", AC: " + hasAC);
    }
}

class Motorcycle extends Vehicle {
    private String type;
    
    public Motorcycle(String brand, String model, int year, String type) {
        super(brand, model, year);
        this.type = type;
    }
    
    public void wheelie() {
        System.out.println(brand + " does a wheelie!");
    }
    
    @Override
    public void startEngine() {
        System.out.println(brand + " " + model + " roars to life! Vroom!");
    }
}\`\`\`

---

## What's Next?

Master these related OOPs concepts:

1. **[Polymorphism](/tutorial/polymorphism)** — One interface, many implementations
2. **[Encapsulation](/tutorial/encapsulation)** — Data hiding and access control
3. **[Abstraction](/tutorial/abstraction)** — Hide complexity, show essentials
4. **[Interfaces](/tutorial/interfaces)** — Define contracts for classes
5. **[Classes and Objects](/tutorial/classes-objects)** — Create and use objects
6. **[Constructors](/tutorial/constructors)** — Initialize objects properly

**Prerequisites:**
- Complete [OOPs Introduction](/tutorial/oops-introduction) first
- Understand [Java Classes and Objects](/tutorial/classes-objects) basics

**Next Level:**
- Use inheritance in [Spring Framework](/tutorial/spring-framework-introduction)
- Build applications with [Spring Boot](/tutorial/spring-boot-introduction)
`
    }
  ]
};

export default inheritance;
