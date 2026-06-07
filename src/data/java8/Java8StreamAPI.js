const java8StreamAPI = {
  id: 'java8-stream-api',
  title: 'Java 8 Stream API for Freshers',
  description: 'Learn Java 8 Stream API with realtime employee reports, filter, map, flatMap, collect, reduce, grouping, sorting, and interview-focused flow.',
  content: `
# Java 8 Stream API with Realtime Employee Report Examples

The Stream API is used to process data from collections in a clean, functional style. A stream does not store data. It reads data from a source, applies operations, and produces a result.

---

## Fresher Job Task: Service Layer Report

Assume your Spring Boot service receives a list of employees from the repository. Your task is to prepare data for an admin dashboard:

- Keep only active employees
- Keep salary greater than 50,000
- Convert names to uppercase
- Sort names
- Return the final list

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private boolean active;
    private double salary;

    Employee(String name, boolean active, double salary) {
        this.name = name;
        this.active = active;
        this.salary = salary;
    }

    public String getName() { return name; }
    public boolean isActive() { return active; }
    public double getSalary() { return salary; }
}

public class EmployeeReportService {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
                new Employee("Ravi", true, 45000),
                new Employee("Amit", true, 70000),
                new Employee("Dattu", true, 90000),
                new Employee("Kiran", false, 80000)
        );

        List<String> reportNames = employees.stream()
                .filter(Employee::isActive)
                .filter(employee -> employee.getSalary() > 50000)
                .map(Employee::getName)
                .map(String::toUpperCase)
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());

        System.out.println(reportNames);
    }
}
\`\`\`

This is how streams appear in real service logic: not as isolated syntax, but as a readable business pipeline.

---

## Stream vs Collection

| Collection | Stream |
|------------|--------|
| Stores data | Processes data |
| Can be reused | Usually consumed once |
| Uses external iteration with loops | Uses internal iteration |
| Focuses on data structure | Focuses on operations |

---

## Creating Streams

\`\`\`java
List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");
Stream<String> stream = names.stream();
\`\`\`

\`\`\`java
Stream<Integer> numbers = Stream.of(10, 20, 30);
\`\`\`

---

## Intermediate Operations

Intermediate operations return another stream. They are lazy and run only when a terminal operation is called.

Important intermediate methods:

- \`filter()\`
- \`map()\`
- \`flatMap()\`
- \`sorted()\`
- \`distinct()\`
- \`limit()\`
- \`skip()\`

## Terminal Operations

Terminal operations produce the final result.

Important terminal methods:

- \`collect()\`
- \`forEach()\`
- \`count()\`
- \`min()\`
- \`max()\`
- \`reduce()\`

---

## Stream Pipeline Diagram

\`\`\`
Collection
   |
   v
stream()
   |
   v
filter() -> map() -> sorted()
   |
   v
collect() / count() / reduce()
\`\`\`

## Lazy Execution Diagram

\`\`\`
employees.stream()
        |
        v
filter()    -> not executed immediately
        |
        v
map()       -> not executed immediately
        |
        v
collect()   -> terminal operation starts the pipeline
\`\`\`

Freshers often think \`filter()\` runs as soon as Java sees it. It does not. Stream intermediate operations are lazy.

## Example

\`\`\`java
List<String> names = Arrays.asList("Ravi", "Amit", "Dattu", "Raj");

List<String> result = names.stream()
        .filter(name -> name.length() > 3)
        .map(String::toUpperCase)
        .sorted()
        .collect(Collectors.toList());
\`\`\`

## Common Fresher Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Reusing the same stream twice | Streams are consumed after terminal operation | Create a new stream from the collection |
| Forgetting terminal operation | Nothing executes | End with collect, count, forEach, reduce, min, or max |
| Using streams for every simple loop | Can reduce readability | Use streams when it improves clarity |
| Modifying source list inside stream | Can cause bugs | Keep stream operations side-effect free |

## Interview Traps

### Is Stream API faster than for loop?

Not always. Stream API is mainly for readability and expressive data processing. Performance depends on data size, operation type, and whether parallel streams are used correctly.

### What is the difference between map and flatMap?

\`map()\` converts each element into one value. \`flatMap()\` converts each element into a stream and flattens all results into one stream.

## Key Takeaways

- Stream API is used for data processing.
- Intermediate operations are lazy.
- Terminal operations trigger execution.
- Streams make collection operations cleaner and more expressive.
`,
  code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu", "Raj");

        List<String> result = names.stream()
                .filter(name -> name.length() > 3)
                .map(String::toUpperCase)
                .sorted()
                .collect(Collectors.toList());

        System.out.println(result);
    }
}`
};

export default java8StreamAPI;
