const java8FunctionalInterfaces = {
  id: 'java8-functional-interfaces',
  title: 'Java 8 Functional Interfaces for Freshers',
  description: 'Learn Java 8 functional interfaces with Predicate, Function, Consumer, Supplier, BiFunction, custom validation rules, and interview traps.',
  content: `
# Java 8 Functional Interfaces with Realtime Validation Rules

A functional interface is an interface that contains exactly one abstract method. Java 8 lambda expressions need functional interfaces because the lambda becomes the implementation of that single method.

---

## Fresher Job Task: Build Employee Validation Rules

In a real backend project, validation rules change often. One day the HR team may say:

- Employee name should not be blank
- Salary should be greater than zero
- Department should be one of IT, HR, Finance, or Admin
- Bonus should be calculated using salary and rating

Functional interfaces help you model these small rules cleanly.

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class EmployeeRuleEngine {
    public static void main(String[] args) {
        List<String> departments = Arrays.asList("IT", "HR", "Finance", "Admin");

        Predicate<String> validName = name -> name != null && !name.trim().isEmpty();
        Predicate<Double> validSalary = salary -> salary != null && salary > 0;
        Function<String, String> normalizeDepartment = dept -> dept.trim().toUpperCase();
        Consumer<String> auditLog = message -> System.out.println("AUDIT: " + message);
        Supplier<String> defaultStatus = () -> "ACTIVE";
        BiFunction<Double, Integer, Double> bonusCalculator =
                (salary, rating) -> salary * rating / 100;

        String name = "Dattu";
        Double salary = 60000.0;
        String department = " it ";

        if (validName.test(name) && validSalary.test(salary)) {
            String normalizedDept = normalizeDepartment.apply(department);
            double bonus = bonusCalculator.apply(salary, 10);

            auditLog.accept("Employee is valid");
            System.out.println(name + " - " + normalizedDept + " - " + defaultStatus.get());
            System.out.println("Bonus: " + bonus);
        }
    }
}
\`\`\`

This is more realistic than a calculator example because it shows how functional interfaces represent project rules.

---

## @FunctionalInterface Annotation

The \`@FunctionalInterface\` annotation is optional, but it is recommended. It tells the compiler to give an error if the interface has more than one abstract method.

\`\`\`java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}
\`\`\`

---

## Custom Functional Interface

\`\`\`java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class CustomFunctionalInterfaceDemo {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        System.out.println(add.calculate(10, 20));
    }
}
\`\`\`

---

## Built-In Functional Interfaces

Java 8 provides many ready-made functional interfaces in \`java.util.function\`.

| Interface | Method | Use |
|----------|--------|-----|
| Predicate<T> | \`test(T t)\` | Checks a condition and returns boolean |
| Function<T, R> | \`apply(T t)\` | Converts one value into another |
| Consumer<T> | \`accept(T t)\` | Performs an action without returning a value |
| Supplier<T> | \`get()\` | Supplies a value without input |
| BiFunction<T, U, R> | \`apply(T t, U u)\` | Takes two inputs and returns one result |

## Predicate Example

\`\`\`java
Predicate<Integer> isEven = number -> number % 2 == 0;
System.out.println(isEven.test(10));
\`\`\`

## Function Example

\`\`\`java
Function<String, Integer> length = name -> name.length();
System.out.println(length.apply("Dattu"));
\`\`\`

## Consumer Example

\`\`\`java
Consumer<String> printer = name -> System.out.println(name);
printer.accept("LearnStackHub");
\`\`\`

## Supplier Example

\`\`\`java
Supplier<Double> randomValue = () -> Math.random();
System.out.println(randomValue.get());
\`\`\`

## BiFunction Example

\`\`\`java
BiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;
System.out.println(multiply.apply(5, 4));
\`\`\`

## Common Fresher Mistakes

| Mistake | Why it is wrong | Better approach |
|---------|-----------------|-----------------|
| Adding two abstract methods in a functional interface | It stops being functional | Keep only one abstract method |
| Using Function when Predicate is clearer | Function can return anything | Use Predicate for true/false checks |
| Calling Supplier with input | Supplier takes no input | Use Function if input is needed |
| Putting large business logic inside one lambda | Hard to read and test | Move complex logic into a named method |

## Interview Traps

### Can a functional interface have default methods?

Yes. A functional interface can have many default or static methods, but only one abstract method.

### Is @FunctionalInterface mandatory?

No, but it is recommended because the compiler protects your intent.

### Difference between Predicate and Function?

Predicate returns boolean. Function converts input into another output.

## Key Takeaways

- Functional interfaces have exactly one abstract method.
- Lambdas implement functional interfaces.
- Predicate, Function, Consumer, Supplier, and BiFunction are the most common interview interfaces.
`,
  code: `import java.util.function.*;

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Predicate<Integer> isEven = number -> number % 2 == 0;
        Function<String, Integer> length = name -> name.length();
        Consumer<String> printer = name -> System.out.println(name);
        Supplier<Double> randomValue = () -> Math.random();
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

        System.out.println(isEven.test(10));
        System.out.println(length.apply("Dattu"));
        printer.accept("Java 8");
        System.out.println(randomValue.get());
        System.out.println(add.apply(10, 20));
    }
}`
};

export default java8FunctionalInterfaces;
