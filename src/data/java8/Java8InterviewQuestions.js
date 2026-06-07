const java8InterviewQuestions = {
  id: 'java8-interview-questions',
  title: 'Java 8 Interview Questions and Coding',
  description: 'Practice top Java 8 interview questions with 30 fresher-friendly answers and 20 full runnable coding examples using streams, lambdas, Optional, collectors, and Date Time API.',
  content: `
# Top 30 Java 8 Interview Questions with 20 Full Coding Examples

This page is for freshers who want to answer Java 8 questions with confidence and also write complete programs in interviews. Read the theory first, then practice the coding examples without looking at the solution.

---

## Java 8 Interview Questions and Answers

### 1. What is Java 8?

Java 8 is a major Java release that introduced functional programming features into Java. The most important additions are lambda expressions, functional interfaces, Stream API, Optional, method references, default methods, static methods in interfaces, and the new Date and Time API.

### 2. Why is Java 8 important for backend developers?

Java 8 is important because most modern Java backend code uses streams, lambdas, Optional, and functional interfaces. These features reduce boilerplate code and make collection processing, validation, filtering, grouping, and transformation easier.

### 3. What are the main features introduced in Java 8?

The main Java 8 features are lambda expressions, functional interfaces, Stream API, Optional class, method references, default methods in interfaces, static methods in interfaces, Date and Time API, Nashorn JavaScript engine, and CompletableFuture improvements.

### 4. What is a lambda expression?

A lambda expression is a short way to provide the implementation of a functional interface method. It allows behavior to be passed as a value.

Example idea: instead of writing a full anonymous class for sorting or filtering, you can pass a small expression like (a, b) -> a.compareTo(b).

### 5. Why do we use lambda expressions?

We use lambda expressions to reduce anonymous class boilerplate, write cleaner code, pass behavior to methods, and work naturally with Stream API operations like filter, map, forEach, and sorted.

### 6. What is the syntax of a lambda expression?

Lambda syntax has three parts: parameters, arrow token, and body.

Example formats:

- No parameter: () -> System.out.println("Hello")
- One parameter: name -> System.out.println(name)
- Multiple parameters: (a, b) -> a + b
- Block body: (a, b) -> { return a + b; }

### 7. Can a lambda expression exist without a functional interface?

No. A lambda expression must be assigned to or passed as a functional interface type. Java needs the target functional interface to understand which abstract method the lambda is implementing.

### 8. What is a functional interface?

A functional interface is an interface that has exactly one abstract method. It can have any number of default and static methods.

Examples: Runnable, Callable, Comparator, Predicate, Function, Consumer, Supplier, and BiFunction.

### 9. What is the use of @FunctionalInterface?

The @FunctionalInterface annotation tells the compiler to check that the interface has only one abstract method. If a second abstract method is added by mistake, compilation fails.

### 10. Can a functional interface have default methods?

Yes. A functional interface can have multiple default methods because default methods have a method body and do not count as abstract methods.

### 11. What is Predicate in Java 8?

Predicate is a built-in functional interface used for conditional checks. It takes one input and returns boolean.

Realtime use: checking whether an employee salary is greater than 50000 or whether a string is not blank.

### 12. What is Function in Java 8?

Function takes one input and returns one output. It is mainly used for transformation.

Realtime use: converting an Employee object to employee name, converting a string to uppercase, or converting a DTO to an entity.

### 13. What is Consumer in Java 8?

Consumer takes one input and returns nothing. It is used when you want to perform an action.

Realtime use: printing values, logging objects, sending notifications, or updating an external system.

### 14. What is Supplier in Java 8?

Supplier takes no input and returns a value. It is useful for lazy value creation.

Realtime use: generating an OTP, creating a default object, or loading fallback data only when needed.

### 15. What is BiFunction in Java 8?

BiFunction takes two inputs and returns one output.

Realtime use: calculating bonus from salary and rating, combining first name and last name, or converting two request values into one response.

### 16. What is a method reference?

A method reference is a shorter form of a lambda expression when the lambda only calls an existing method.

Example idea: name -> System.out.println(name) can become System.out::println.

### 17. What are the types of method references?

There are four common types:

- Static method reference
- Instance method reference using an object
- Instance method reference using a class type
- Constructor reference

### 18. What is Stream API?

Stream API is used to process data from collections in a functional style. A stream does not store data. It reads data from a source, applies operations, and produces a result.

### 19. Difference between Collection and Stream?

A Collection stores data. A Stream processes data. A collection can be reused, but a stream can be consumed only once. Stream operations can be lazy and can form a pipeline.

### 20. What are intermediate operations in Stream API?

Intermediate operations return another stream. They are lazy and run only when a terminal operation is called.

Examples: filter, map, flatMap, sorted, distinct, limit, skip, and peek.

### 21. What are terminal operations in Stream API?

Terminal operations produce a final result or side effect and close the stream pipeline.

Examples: collect, forEach, count, min, max, reduce, anyMatch, allMatch, noneMatch, and findFirst.

### 22. Difference between map and flatMap?

map converts each element into one result. flatMap converts each element into a stream and then combines all small streams into one stream.

Use map when one input gives one output. Use flatMap when one input can produce multiple outputs.

### 23. Difference between findFirst and findAny?

findFirst returns the first element based on stream order. findAny can return any matching element, especially useful in parallel streams where strict order is not required.

### 24. Difference between sorted and Comparator?

sorted is a stream operation. Comparator defines the sorting logic. You often use them together, like employees.stream().sorted(Comparator.comparing(Employee::getSalary)).

### 25. What is Optional in Java 8?

Optional is a container that may or may not contain a value. It helps represent missing values clearly and reduces unsafe null checks.

### 26. Difference between Optional.of and Optional.ofNullable?

Optional.of requires a non-null value. If the value is null, it throws NullPointerException. Optional.ofNullable accepts null and creates an empty Optional.

### 27. Difference between orElse and orElseGet?

orElse evaluates the fallback value immediately. orElseGet accepts a Supplier and evaluates the fallback lazily only when the Optional is empty.

### 28. Why were default methods introduced in interfaces?

Default methods were introduced to add new methods to existing interfaces without breaking old implementations. This helped Java add methods to interfaces like Collection while keeping older code compatible.

### 29. How does Java solve default method conflict?

If a class implements two interfaces that have the same default method, the class must override that method and decide which behavior to use. This removes ambiguity.

### 30. Why is the Java 8 Date and Time API better than Date and Calendar?

The Java 8 Date and Time API is immutable, clearer, thread-safe, and easier to format, parse, and calculate with. Important classes include LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Period, Duration, and DateTimeFormatter.

---

## Top 20 Java 8 Coding Examples with Full Code

Each program below is complete. You can copy one class into a file with the same class name and run it.

### 1. Find Duplicate Numbers

\`\`\`java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class FindDuplicateNumbers {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 30, 10, 40, 20, 50, 30);
        Set<Integer> seen = new HashSet<>();

        List<Integer> duplicates = numbers.stream()
                .filter(number -> !seen.add(number))
                .distinct()
                .collect(Collectors.toList());

        System.out.println("Duplicate numbers: " + duplicates);
    }
}
\`\`\`

### 2. Find First Non-Repeated Character

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FirstNonRepeatedCharacter {
    public static void main(String[] args) {
        String input = "swiss";

        Character result = input.chars()
                .mapToObj(ch -> (char) ch)
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        LinkedHashMap::new,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue() == 1)
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        System.out.println("First non-repeated character: " + result);
    }
}
\`\`\`

### 3. Sort a List Using Java 8

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SortListUsingJava8 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 9, 1, 7);

        List<Integer> ascending = numbers.stream()
                .sorted()
                .collect(Collectors.toList());

        List<Integer> descending = numbers.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        System.out.println("Ascending: " + ascending);
        System.out.println("Descending: " + descending);
    }
}
\`\`\`

### 4. Find Max and Min from a List

\`\`\`java
import java.util.Arrays;
import java.util.List;

public class FindMaxMinUsingJava8 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(44, 12, 99, 31, 67);

        Integer max = numbers.stream()
                .max(Integer::compareTo)
                .orElseThrow(() -> new RuntimeException("List is empty"));

        Integer min = numbers.stream()
                .min(Integer::compareTo)
                .orElseThrow(() -> new RuntimeException("List is empty"));

        System.out.println("Max: " + max);
        System.out.println("Min: " + min);
    }
}
\`\`\`

### 5. Find Second Highest Number

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class SecondHighestNumber {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 30, 20, 50, 40, 50);

        Integer secondHighest = numbers.stream()
                .distinct()
                .sorted(Comparator.reverseOrder())
                .skip(1)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Second highest not found"));

        System.out.println("Second highest number: " + secondHighest);
    }
}
\`\`\`

### 6. Convert Names to Uppercase

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ConvertNamesToUppercase {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");

        List<String> uppercaseNames = names.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        System.out.println("Uppercase names: " + uppercaseNames);
    }
}
\`\`\`

### 7. Count Word Frequency

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class WordFrequencyCount {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "spring", "java", "stream", "spring", "java");

        Map<String, Long> frequency = words.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        System.out.println("Word frequency: " + frequency);
    }
}
\`\`\`

### 8. Convert String to Character Frequency Map

\`\`\`java
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CharacterFrequencyMap {
    public static void main(String[] args) {
        String input = "learnstackhub";

        Map<Character, Long> frequency = input.chars()
                .mapToObj(ch -> (char) ch)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        System.out.println("Character frequency: " + frequency);
    }
}
\`\`\`

### 9. Filter Employees by Salary

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Employee {
    private final int id;
    private final String name;
    private final String department;
    private final double salary;

    Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return id + " - " + name + " - " + department + " - " + salary;
    }
}

public class FilterEmployeesBySalary {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
                new Employee(1, "Ravi", "IT", 75000),
                new Employee(2, "Amit", "HR", 42000),
                new Employee(3, "Dattu", "IT", 90000)
        );

        List<Employee> highSalaryEmployees = employees.stream()
                .filter(employee -> employee.getSalary() > 50000)
                .collect(Collectors.toList());

        highSalaryEmployees.forEach(System.out::println);
    }
}
\`\`\`

### 10. Sort Employees by Salary

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

class SalaryEmployee {
    private final String name;
    private final double salary;

    SalaryEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return name + " - " + salary;
    }
}

public class SortEmployeesBySalary {
    public static void main(String[] args) {
        List<SalaryEmployee> employees = Arrays.asList(
                new SalaryEmployee("Ravi", 75000),
                new SalaryEmployee("Amit", 42000),
                new SalaryEmployee("Dattu", 90000)
        );

        List<SalaryEmployee> sortedEmployees = employees.stream()
                .sorted(Comparator.comparingDouble(SalaryEmployee::getSalary).reversed())
                .collect(Collectors.toList());

        sortedEmployees.forEach(System.out::println);
    }
}
\`\`\`

### 11. Group Employees by Department

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class DepartmentEmployee {
    private final String name;
    private final String department;

    DepartmentEmployee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }

    @Override
    public String toString() {
        return name;
    }
}

public class GroupEmployeesByDepartment {
    public static void main(String[] args) {
        List<DepartmentEmployee> employees = Arrays.asList(
                new DepartmentEmployee("Ravi", "IT"),
                new DepartmentEmployee("Amit", "HR"),
                new DepartmentEmployee("Dattu", "IT"),
                new DepartmentEmployee("Kiran", "Finance")
        );

        Map<String, List<DepartmentEmployee>> groupedEmployees = employees.stream()
                .collect(Collectors.groupingBy(DepartmentEmployee::getDepartment));

        System.out.println(groupedEmployees);
    }
}
\`\`\`

### 12. Count Employees by Department

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class CountEmployee {
    private final String name;
    private final String department;

    CountEmployee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }
}

public class CountEmployeesByDepartment {
    public static void main(String[] args) {
        List<CountEmployee> employees = Arrays.asList(
                new CountEmployee("Ravi", "IT"),
                new CountEmployee("Amit", "HR"),
                new CountEmployee("Dattu", "IT"),
                new CountEmployee("Kiran", "HR")
        );

        Map<String, Long> countByDepartment = employees.stream()
                .collect(Collectors.groupingBy(CountEmployee::getDepartment, Collectors.counting()));

        System.out.println(countByDepartment);
    }
}
\`\`\`

### 13. Find Highest Salary Employee

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class HighestSalaryEmployee {
    private final String name;
    private final double salary;

    HighestSalaryEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return name + " - " + salary;
    }
}

public class FindHighestSalaryEmployee {
    public static void main(String[] args) {
        List<HighestSalaryEmployee> employees = Arrays.asList(
                new HighestSalaryEmployee("Ravi", 75000),
                new HighestSalaryEmployee("Amit", 42000),
                new HighestSalaryEmployee("Dattu", 90000)
        );

        HighestSalaryEmployee highestPaidEmployee = employees.stream()
                .max(Comparator.comparingDouble(HighestSalaryEmployee::getSalary))
                .orElseThrow(() -> new RuntimeException("No employee found"));

        System.out.println("Highest salary employee: " + highestPaidEmployee);
    }
}
\`\`\`

### 14. Convert List to Map

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

class MapEmployee {
    private final int id;
    private final String name;

    MapEmployee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return name;
    }
}

public class ConvertListToMap {
    public static void main(String[] args) {
        List<MapEmployee> employees = Arrays.asList(
                new MapEmployee(101, "Ravi"),
                new MapEmployee(102, "Amit"),
                new MapEmployee(103, "Dattu")
        );

        Map<Integer, MapEmployee> employeeMap = employees.stream()
                .collect(Collectors.toMap(MapEmployee::getId, Function.identity()));

        System.out.println(employeeMap);
    }
}
\`\`\`

### 15. Remove Duplicate Objects by ID

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

class UniqueEmployee {
    private final int id;
    private final String name;

    UniqueEmployee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class RemoveDuplicateObjectsById {
    public static void main(String[] args) {
        List<UniqueEmployee> employees = Arrays.asList(
                new UniqueEmployee(101, "Ravi"),
                new UniqueEmployee(102, "Amit"),
                new UniqueEmployee(101, "Ravi Duplicate"),
                new UniqueEmployee(103, "Dattu")
        );

        Map<Integer, UniqueEmployee> uniqueMap = employees.stream()
                .collect(Collectors.toMap(
                        UniqueEmployee::getId,
                        Function.identity(),
                        (oldValue, newValue) -> oldValue
                ));

        List<UniqueEmployee> uniqueEmployees = new ArrayList<>(uniqueMap.values());
        System.out.println(uniqueEmployees);
    }
}
\`\`\`

### 16. Partition Employees by Salary

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class PartitionEmployee {
    private final String name;
    private final double salary;

    PartitionEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return name + " - " + salary;
    }
}

public class PartitionEmployeesBySalary {
    public static void main(String[] args) {
        List<PartitionEmployee> employees = Arrays.asList(
                new PartitionEmployee("Ravi", 75000),
                new PartitionEmployee("Amit", 42000),
                new PartitionEmployee("Dattu", 90000)
        );

        Map<Boolean, List<PartitionEmployee>> partitionedEmployees = employees.stream()
                .collect(Collectors.partitioningBy(employee -> employee.getSalary() >= 50000));

        System.out.println("High salary: " + partitionedEmployees.get(true));
        System.out.println("Low salary: " + partitionedEmployees.get(false));
    }
}
\`\`\`

### 17. Use Optional to Avoid NullPointerException

\`\`\`java
import java.util.Optional;

class User {
    private final String name;
    private final String email;

    User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}

public class OptionalNullSafetyExample {
    public static void main(String[] args) {
        User user = new User("Ravi", null);

        String email = Optional.ofNullable(user)
                .map(User::getEmail)
                .orElse("email-not-found@example.com");

        System.out.println("Email: " + email);
    }
}
\`\`\`

### 18. Use Predicate, Function, Consumer, and Supplier

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class FunctionalInterfacesExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu", "Raj");

        Predicate<String> startsWithR = name -> name.startsWith("R");
        Function<String, String> toUppercase = String::toUpperCase;
        Consumer<String> printer = System.out::println;
        Supplier<String> fallbackName = () -> "No matching name";

        List<String> result = names.stream()
                .filter(startsWithR)
                .map(toUppercase)
                .collect(Collectors.toList());

        if (result.isEmpty()) {
            printer.accept(fallbackName.get());
        } else {
            result.forEach(printer);
        }
    }
}
\`\`\`

### 19. Calculate Age Using Java 8 Date and Time API

\`\`\`java
import java.time.LocalDate;
import java.time.Period;

public class CalculateAgeUsingJava8 {
    public static void main(String[] args) {
        LocalDate dateOfBirth = LocalDate.of(2000, 5, 15);
        LocalDate today = LocalDate.now();

        Period age = Period.between(dateOfBirth, today);

        System.out.println("Age: " + age.getYears() + " years, "
                + age.getMonths() + " months, "
                + age.getDays() + " days");
    }
}
\`\`\`

### 20. Format Date Using DateTimeFormatter

\`\`\`java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FormatDateUsingJava8 {
    public static void main(String[] args) {
        LocalDate joiningDate = LocalDate.of(2026, 3, 27);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");

        String formattedDate = joiningDate.format(formatter);

        System.out.println("Formatted joining date: " + formattedDate);
    }
}
\`\`\`

---

## Fresher Interview Practice Plan

Practice these examples in three rounds:

1. Read and understand the logic.
2. Write the same program without looking at the solution.
3. Change the input and explain the output line by line.

For fresher interviews, focus especially on duplicate numbers, first non-repeated character, second highest number, grouping employees by department, Optional null handling, and map vs flatMap.
`,
  code: `import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Java8InterviewExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 30, 20, 50, 40, 50);

        Integer secondHighest = numbers.stream()
                .distinct()
                .sorted(Comparator.reverseOrder())
                .skip(1)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Second highest not found"));

        System.out.println("Second highest number: " + secondHighest);
    }
}`
};

export default java8InterviewQuestions;
