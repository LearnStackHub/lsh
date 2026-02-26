const inheritance = {
  id: 'inheritance',
  title: 'Inheritance',
  description: 'Building new classes from existing ones',
  content: `
# Inheritance — Standing on the Shoulders of Giants

Why write the same code twice? If you have a \`Vehicle\` class with common properties, why rewrite them for \`Car\`, \`Bike\`, and \`Truck\`? Inheritance lets you create new classes that automatically get all the features of an existing class.

**Inheritance** = "is-a" relationship + code reuse

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

Each employee type calculates salary differently, but they all share common properties and behaviors.
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
