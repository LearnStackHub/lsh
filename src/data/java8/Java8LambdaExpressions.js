const java8LambdaExpressions = {
  id: 'java8-lambda-expressions',
  title: 'Java 8 Lambda Expressions for Freshers',
  description: 'Learn Java 8 lambda expressions using fresher-friendly syntax, realtime collection tasks, return values, parameters, and interview mistakes.',
  content: `
# Java 8 Lambda Expressions with Realtime Collection Examples

A lambda expression is a short way to write an implementation of a functional interface. It lets you pass behavior as a value.

Before Java 8, you often used anonymous inner classes. Java 8 lambdas make the same code shorter and easier to read.

---

## Why Lambda Is Used

Lambda expressions are used to:

- Reduce boilerplate code
- Pass behavior to methods
- Work with functional interfaces
- Process collections with Stream API
- Write cleaner event handling and callback logic

---

## Realtime Fresher Scenario: Validation Rules

In a real project, a fresher may be asked to validate user input before saving data. For example:

- Check whether a username is not empty
- Check whether salary is greater than zero
- Check whether an email contains \`@\`
- Check whether a product is active

Without Java 8, developers often write separate methods or bulky anonymous classes. With lambda expressions, small rules can be passed directly.

\`\`\`java
Predicate<String> validEmail = email -> email != null && email.contains("@");
Predicate<Double> validSalary = salary -> salary != null && salary > 0;
\`\`\`

### Lambda Decision Diagram

\`\`\`
Input value
   |
   v
Lambda rule
   |
   +-- true  -> continue processing
   |
   +-- false -> reject or show error
\`\`\`

This is the practical mindset: a lambda is not just syntax, it is a small piece of business logic.

---

## Lambda Syntax

\`\`\`java
(parameters) -> expression
\`\`\`

or

\`\`\`java
(parameters) -> {
    statements;
}
\`\`\`

---

## Lambda With No Parameter

\`\`\`java
Runnable task = () -> System.out.println("Task is running");
task.run();
\`\`\`

## Lambda With One Parameter

\`\`\`java
Consumer<String> printer = name -> System.out.println(name);
printer.accept("Dattu");
\`\`\`

## Lambda With Multiple Parameters

\`\`\`java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(10, 20));
\`\`\`

## Lambda With Return Value

\`\`\`java
Function<String, Integer> lengthFinder = name -> name.length();
System.out.println(lengthFinder.apply("LearnStackHub"));
\`\`\`

If the lambda body has only one expression, Java returns the value automatically. If you use braces, you must write \`return\`.

\`\`\`java
Function<Integer, Integer> square = number -> {
    return number * number;
};
\`\`\`

---

## Lambda With Collections

\`\`\`java
import java.util.Arrays;
import java.util.List;

public class LambdaCollectionExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");

        names.forEach(name -> System.out.println(name));
    }
}
\`\`\`

## Realtime Collection Example: Active Users

\`\`\`java
List<String> users = Arrays.asList("ACTIVE:Ravi", "INACTIVE:Amit", "ACTIVE:Dattu");

users.stream()
        .filter(user -> user.startsWith("ACTIVE"))
        .forEach(user -> System.out.println(user));
\`\`\`

In real projects, this pattern appears as active users, paid orders, approved leaves, high salary employees, completed payments, or failed transactions.

## Lambda Flow Diagram

\`\`\`
Functional Interface
        |
        v
Single abstract method
        |
        v
Lambda expression provides method body
        |
        v
Java executes lambda when the method is called
\`\`\`

## Key Takeaways

- Lambda expressions work with functional interfaces.
- A lambda can have no parameter, one parameter, or many parameters.
- Lambdas are heavily used with collections and streams.
- Method references can replace simple lambdas in some cases.
`,
  code: `import java.util.Arrays;
import java.util.List;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");
        names.forEach(name -> System.out.println(name));
    }
}`
};

export default java8LambdaExpressions;
