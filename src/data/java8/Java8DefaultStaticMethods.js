const java8DefaultStaticMethods = {
  id: 'java8-default-static-methods',
  title: 'Java 8 Interface Default Static Methods',
  description: 'Learn Java 8 default and static interface methods with realtime API evolution, conflict rules, multiple inheritance problems, and examples.',
  content: `
# Java 8 Default and Static Methods in Interface with Conflict Rules

Before Java 8, interfaces could contain only abstract methods and constants. Java 8 introduced default and static methods in interfaces.

---

## Why Default Methods Were Introduced

Default methods were introduced so Java could add new behavior to existing interfaces without breaking all old implementation classes.

For example, Java added new methods to collection-related interfaces for lambda and stream support. Without default methods, every existing implementation class would need updates.

---

## Default Method Example

\`\`\`java
interface Vehicle {
    void start();

    default void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car started");
    }
}
\`\`\`

## Static Method in Interface

\`\`\`java
interface MathUtil {
    static int square(int number) {
        return number * number;
    }
}

public class Demo {
    public static void main(String[] args) {
        System.out.println(MathUtil.square(5));
    }
}
\`\`\`

Static interface methods are called using the interface name.

---

## Multiple Inheritance Problem

If a class implements two interfaces with the same default method, Java forces the class to override the method.

\`\`\`java
interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

class Test implements A, B {
    public void show() {
        A.super.show();
    }
}
\`\`\`

## How Java Solves Default Method Conflict

Java solves the conflict by making the implementing class provide its own method. Inside that method, the class can choose one parent interface using \`InterfaceName.super.methodName()\`.

## Key Takeaways

- Default methods allow interfaces to evolve safely.
- Static methods in interfaces are utility-style methods.
- If two interfaces have the same default method, the class must override it.
`,
  code: `interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

public class DefaultMethodExample implements A, B {
    public void show() {
        A.super.show();
    }

    public static void main(String[] args) {
        new DefaultMethodExample().show();
    }
}`
};

export default java8DefaultStaticMethods;
