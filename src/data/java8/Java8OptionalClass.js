const java8OptionalClass = {
  id: 'java8-optional-class',
  title: 'Java 8 Optional Class for Null Safety',
  description: 'Learn Java 8 Optional with repository null handling, ofNullable, ifPresent, orElse, orElseGet, orElseThrow, map, flatMap, and common mistakes.',
  content: `
# Java 8 Optional Class with Realtime Null Safety Examples

Optional is a container object that may or may not contain a value. It is used to write safer code when a value can be missing.

The main goal of Optional is to reduce direct null checks and avoid NullPointerException.

---

## Fresher Job Task: Handle Missing Employee Profile

In a real Spring Boot project, a repository lookup may not find a record. A fresher may write this unsafe code:

\`\`\`java
Employee employee = repositoryFindById(101);
return employee.getName(); // may throw NullPointerException
\`\`\`

Optional makes the missing-record case explicit.

\`\`\`java
import java.util.Optional;

class Employee {
    private int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() { return id; }
    public String getName() { return name; }
}

public class EmployeeProfileService {
    static Optional<Employee> findEmployeeById(int id) {
        if (id == 101) {
            return Optional.of(new Employee(101, "Dattu"));
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        String employeeName = findEmployeeById(102)
                .map(Employee::getName)
                .orElse("Employee profile not found");

        System.out.println(employeeName);
    }
}
\`\`\`

### Optional Flow in Service Layer

\`\`\`
Repository findById(id)
        |
        v
Optional<Employee>
        |
        +-- value present -> map to response
        |
        +-- empty -> return default or throw custom exception
\`\`\`

---

## Why Optional Is Used

Without Optional:

\`\`\`java
String name = getName();
if (name != null) {
    System.out.println(name.toUpperCase());
}
\`\`\`

With Optional:

\`\`\`java
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(value -> System.out.println(value.toUpperCase()));
\`\`\`

---

## Optional.of()

Use \`Optional.of()\` when the value is definitely not null.

\`\`\`java
Optional<String> name = Optional.of("Dattu");
\`\`\`

If the value is null, it throws NullPointerException.

## Optional.ofNullable()

Use \`Optional.ofNullable()\` when the value may be null.

\`\`\`java
Optional<String> name = Optional.ofNullable(null);
\`\`\`

## isPresent()

\`\`\`java
if (name.isPresent()) {
    System.out.println(name.get());
}
\`\`\`

## ifPresent()

\`\`\`java
name.ifPresent(value -> System.out.println(value));
\`\`\`

## orElse()

\`\`\`java
String result = name.orElse("Default Name");
\`\`\`

## orElseGet()

\`\`\`java
String result = name.orElseGet(() -> "Generated Name");
\`\`\`

## orElseThrow()

\`\`\`java
String result = name.orElseThrow(() -> new RuntimeException("Name not found"));
\`\`\`

## map()

\`\`\`java
Optional<Integer> length = name.map(String::length);
\`\`\`

## flatMap()

\`\`\`java
Optional<String> result = name.flatMap(value -> Optional.of(value.toUpperCase()));
\`\`\`

## Common Fresher Mistakes

| Mistake | Why it is bad | Better approach |
|---------|---------------|-----------------|
| Calling \`get()\` without checking | Can throw NoSuchElementException | Use orElse, orElseGet, orElseThrow, or map |
| Using Optional for every field in entity class | Makes models awkward | Use Optional mainly as return type |
| Using \`Optional.of(value)\` when value may be null | Throws NullPointerException | Use \`Optional.ofNullable(value)\` |
| Using \`orElse(expensiveMethod())\` | Method runs even when value exists | Use \`orElseGet(() -> expensiveMethod())\` |

## Interview Traps

### Difference between of and ofNullable?

\`Optional.of()\` expects non-null values. \`Optional.ofNullable()\` accepts null and returns Optional.empty().

### Difference between orElse and orElseGet?

\`orElse()\` evaluates the fallback immediately. \`orElseGet()\` evaluates lazily only when Optional is empty.

### Should Optional be used as a method parameter?

Usually no. It is clearer as a return type to tell callers that a value may be absent.

## Key Takeaways

- Use Optional mainly for return values.
- Use \`ofNullable()\` when the value may be null.
- Prefer \`ifPresent()\`, \`orElse()\`, \`orElseGet()\`, and \`orElseThrow()\` over direct \`get()\`.
- Optional makes missing values explicit.
`,
  code: `import java.util.Optional;

public class OptionalExample {
    public static void main(String[] args) {
        Optional<String> name = Optional.ofNullable("Dattu");

        String result = name
                .map(String::toUpperCase)
                .orElse("UNKNOWN");

        System.out.println(result);
    }
}`
};

export default java8OptionalClass;
