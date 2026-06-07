const java8StreamPracticalExamples = {
  id: 'java8-stream-practical-examples',
  title: 'Java 8 Stream Coding Examples',
  description: 'Practice Java 8 Stream API with full runnable programs for filter, map, flatMap, sorted, distinct, limit, skip, collect, reduce, groupingBy, partitioningBy, toMap, and parallel streams.',
  content: `
# Java 8 Stream API Practical Examples with Full Code

This lesson covers the important Java 8 Stream API methods using complete runnable programs. These are not snippets. Each example has imports, data, model class when needed, main method, stream logic, and output-friendly printing.

Use this page like interview practice:

1. Read the problem.
2. Run the full program.
3. Change the input data.
4. Explain which stream method solved which part.

---

## Realtime Stream API Flow

\`\`\`
Repository returns List<Employee>
        |
        v
Stream pipeline starts
        |
        +-- filter()       -> keep matching records
        +-- map()          -> transform records
        +-- flatMap()      -> flatten nested lists
        +-- sorted()       -> order records
        +-- distinct()     -> remove duplicates
        +-- limit()/skip() -> pagination and ranking
        |
        v
Terminal operation
        |
        +-- collect()  -> List, Set, Map, grouping report
        +-- count()    -> total records
        +-- min()/max()-> lowest/highest record
        +-- reduce()   -> one combined result
        +-- forEach()  -> action/output
\`\`\`

---

## 1. filter() - Filter Employees by Salary

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

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return id + " - " + name + " - " + department + " - " + salary;
    }
}

public class StreamFilterEmployees {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
                new Employee(101, "Ravi", "IT", 75000),
                new Employee(102, "Amit", "HR", 42000),
                new Employee(103, "Dattu", "IT", 90000),
                new Employee(104, "Priya", "Finance", 56000)
        );

        List<Employee> highSalaryEmployees = employees.stream()
                .filter(employee -> employee.getSalary() > 50000)
                .collect(Collectors.toList());

        highSalaryEmployees.forEach(System.out::println);
    }
}
\`\`\`

Use \`filter()\` when you want SQL-like WHERE logic.

---

## 2. map() - Convert Names to Uppercase

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamMapUppercase {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("ravi", "amit", "dattu", "priya");

        List<String> uppercaseNames = names.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        System.out.println(uppercaseNames);
    }
}
\`\`\`

Use \`map()\` when one input should become one output.

---

## 3. flatMap() - Convert List of Teams into One Employee List

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamFlatMapTeams {
    public static void main(String[] args) {
        List<List<String>> projectTeams = Arrays.asList(
                Arrays.asList("Ravi", "Amit"),
                Arrays.asList("Dattu", "Priya"),
                Arrays.asList("Kiran", "Sneha")
        );

        List<String> allEmployees = projectTeams.stream()
                .flatMap(team -> team.stream())
                .collect(Collectors.toList());

        System.out.println(allEmployees);
    }
}
\`\`\`

Use \`flatMap()\` when one element contains many inner elements and you need one flat stream.

---

## 4. sorted() - Sort Employees by Salary

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

public class StreamSortedEmployees {
    public static void main(String[] args) {
        List<SalaryEmployee> employees = Arrays.asList(
                new SalaryEmployee("Ravi", 75000),
                new SalaryEmployee("Amit", 42000),
                new SalaryEmployee("Dattu", 90000),
                new SalaryEmployee("Priya", 56000)
        );

        List<SalaryEmployee> sortedBySalaryDesc = employees.stream()
                .sorted(Comparator.comparingDouble(SalaryEmployee::getSalary).reversed())
                .collect(Collectors.toList());

        sortedBySalaryDesc.forEach(System.out::println);
    }
}
\`\`\`

Use \`sorted()\` with \`Comparator\` for object sorting.

---

## 5. distinct() - Remove Duplicate Numbers

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamDistinctNumbers {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 10, 30, 20, 40, 50, 40);

        List<Integer> uniqueNumbers = numbers.stream()
                .distinct()
                .collect(Collectors.toList());

        System.out.println(uniqueNumbers);
    }
}
\`\`\`

Use \`distinct()\` when equals/hashCode can identify duplicates.

---

## 6. limit() and skip() - Pagination Example

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamLimitSkipPagination {
    public static void main(String[] args) {
        List<String> tutorials = Arrays.asList(
                "Java", "JDBC", "Servlets", "JSP", "Hibernate",
                "Spring", "Spring Boot", "Docker", "Kafka", "AWS"
        );

        int pageNumber = 2;
        int pageSize = 3;

        List<String> pageData = tutorials.stream()
                .skip((long) (pageNumber - 1) * pageSize)
                .limit(pageSize)
                .collect(Collectors.toList());

        System.out.println("Page " + pageNumber + ": " + pageData);
    }
}
\`\`\`

Use \`skip()\` and \`limit()\` for simple in-memory pagination and ranking.

---

## 7. collect() - Collect Stream into List, Set, and Map

\`\`\`java
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

class CollectEmployee {
    private final int id;
    private final String name;

    CollectEmployee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

public class StreamCollectExamples {
    public static void main(String[] args) {
        List<CollectEmployee> employees = Arrays.asList(
                new CollectEmployee(101, "Ravi"),
                new CollectEmployee(102, "Amit"),
                new CollectEmployee(103, "Dattu")
        );

        List<String> nameList = employees.stream()
                .map(CollectEmployee::getName)
                .collect(Collectors.toList());

        Set<String> nameSet = employees.stream()
                .map(CollectEmployee::getName)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        Map<Integer, String> employeeMap = employees.stream()
                .collect(Collectors.toMap(CollectEmployee::getId, CollectEmployee::getName));

        System.out.println("List: " + nameList);
        System.out.println("Set: " + nameSet);
        System.out.println("Map: " + employeeMap);
    }
}
\`\`\`

Use \`collect()\` when you need a final collection or report structure.

---

## 8. count() - Count Active Employees

\`\`\`java
import java.util.Arrays;
import java.util.List;

class ActiveEmployee {
    private final String name;
    private final boolean active;

    ActiveEmployee(String name, boolean active) {
        this.name = name;
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }
}

public class StreamCountActiveEmployees {
    public static void main(String[] args) {
        List<ActiveEmployee> employees = Arrays.asList(
                new ActiveEmployee("Ravi", true),
                new ActiveEmployee("Amit", false),
                new ActiveEmployee("Dattu", true),
                new ActiveEmployee("Priya", true)
        );

        long activeCount = employees.stream()
                .filter(ActiveEmployee::isActive)
                .count();

        System.out.println("Active employee count: " + activeCount);
    }
}
\`\`\`

Use \`count()\` when the final result is a number of matching records.

---

## 9. min() and max() - Find Lowest and Highest Salary

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class MinMaxEmployee {
    private final String name;
    private final double salary;

    MinMaxEmployee(String name, double salary) {
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

public class StreamMinMaxSalary {
    public static void main(String[] args) {
        List<MinMaxEmployee> employees = Arrays.asList(
                new MinMaxEmployee("Ravi", 75000),
                new MinMaxEmployee("Amit", 42000),
                new MinMaxEmployee("Dattu", 90000)
        );

        MinMaxEmployee lowestPaid = employees.stream()
                .min(Comparator.comparingDouble(MinMaxEmployee::getSalary))
                .orElseThrow(() -> new RuntimeException("No employee found"));

        MinMaxEmployee highestPaid = employees.stream()
                .max(Comparator.comparingDouble(MinMaxEmployee::getSalary))
                .orElseThrow(() -> new RuntimeException("No employee found"));

        System.out.println("Lowest paid: " + lowestPaid);
        System.out.println("Highest paid: " + highestPaid);
    }
}
\`\`\`

Use \`min()\` and \`max()\` for lowest/highest record problems.

---

## 10. reduce() - Calculate Total Salary

\`\`\`java
import java.util.Arrays;
import java.util.List;

class ReduceEmployee {
    private final String name;
    private final double salary;

    ReduceEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }
}

public class StreamReduceTotalSalary {
    public static void main(String[] args) {
        List<ReduceEmployee> employees = Arrays.asList(
                new ReduceEmployee("Ravi", 75000),
                new ReduceEmployee("Amit", 42000),
                new ReduceEmployee("Dattu", 90000)
        );

        double totalSalary = employees.stream()
                .map(ReduceEmployee::getSalary)
                .reduce(0.0, Double::sum);

        System.out.println("Total salary: " + totalSalary);
    }
}
\`\`\`

Use \`reduce()\` when many values must become one value.

---

## 11. forEach() - Print Report Rows

\`\`\`java
import java.util.Arrays;
import java.util.List;

public class StreamForEachReport {
    public static void main(String[] args) {
        List<String> reportRows = Arrays.asList(
                "Ravi - IT - 75000",
                "Amit - HR - 42000",
                "Dattu - IT - 90000"
        );

        reportRows.stream()
                .filter(row -> row.contains("IT"))
                .forEach(row -> System.out.println("Report row: " + row));
    }
}
\`\`\`

Use \`forEach()\` for actions. Do not use it when you need to return a transformed list; use \`map()\` and \`collect()\`.

---

## 12. anyMatch(), allMatch(), noneMatch() - Validate Data

\`\`\`java
import java.util.Arrays;
import java.util.List;

class ValidationEmployee {
    private final String name;
    private final double salary;

    ValidationEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }
}

public class StreamMatchValidation {
    public static void main(String[] args) {
        List<ValidationEmployee> employees = Arrays.asList(
                new ValidationEmployee("Ravi", 75000),
                new ValidationEmployee("Amit", 42000),
                new ValidationEmployee("Dattu", 90000)
        );

        boolean hasHighSalary = employees.stream()
                .anyMatch(employee -> employee.getSalary() > 80000);

        boolean allHaveSalary = employees.stream()
                .allMatch(employee -> employee.getSalary() > 0);

        boolean noneHaveNegativeSalary = employees.stream()
                .noneMatch(employee -> employee.getSalary() < 0);

        System.out.println("Any salary > 80000: " + hasHighSalary);
        System.out.println("All salary > 0: " + allHaveSalary);
        System.out.println("No negative salary: " + noneHaveNegativeSalary);
    }
}
\`\`\`

Use match methods when the answer is true or false.

---

## 13. findFirst() and findAny() - Find Matching Records

\`\`\`java
import java.util.Arrays;
import java.util.List;

public class StreamFindFirstFindAny {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu", "Rajesh", "Priya");

        String firstNameStartingWithR = names.stream()
                .filter(name -> name.startsWith("R"))
                .findFirst()
                .orElse("No name found");

        String anyNameStartingWithR = names.parallelStream()
                .filter(name -> name.startsWith("R"))
                .findAny()
                .orElse("No name found");

        System.out.println("findFirst result: " + firstNameStartingWithR);
        System.out.println("findAny result: " + anyNameStartingWithR);
    }
}
\`\`\`

Use \`findFirst()\` when order matters. Use \`findAny()\` when any matching value is acceptable.

---

## 14. groupingBy() - Group Employees by Department

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class GroupEmployee {
    private final String name;
    private final String department;

    GroupEmployee(String name, String department) {
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

public class StreamGroupingByDepartment {
    public static void main(String[] args) {
        List<GroupEmployee> employees = Arrays.asList(
                new GroupEmployee("Ravi", "IT"),
                new GroupEmployee("Amit", "HR"),
                new GroupEmployee("Dattu", "IT"),
                new GroupEmployee("Priya", "Finance"),
                new GroupEmployee("Sneha", "Finance")
        );

        Map<String, List<GroupEmployee>> employeesByDepartment = employees.stream()
                .collect(Collectors.groupingBy(GroupEmployee::getDepartment));

        employeesByDepartment.forEach((department, employeeList) ->
                System.out.println(department + " -> " + employeeList)
        );
    }
}
\`\`\`

Use \`groupingBy()\` for category-based reports.

---

## 15. groupingBy() with counting() - Count Employees by Department

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class CountDepartmentEmployee {
    private final String name;
    private final String department;

    CountDepartmentEmployee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }
}

public class StreamCountByDepartment {
    public static void main(String[] args) {
        List<CountDepartmentEmployee> employees = Arrays.asList(
                new CountDepartmentEmployee("Ravi", "IT"),
                new CountDepartmentEmployee("Amit", "HR"),
                new CountDepartmentEmployee("Dattu", "IT"),
                new CountDepartmentEmployee("Priya", "Finance"),
                new CountDepartmentEmployee("Sneha", "Finance")
        );

        Map<String, Long> countByDepartment = employees.stream()
                .collect(Collectors.groupingBy(
                        CountDepartmentEmployee::getDepartment,
                        Collectors.counting()
                ));

        System.out.println(countByDepartment);
    }
}
\`\`\`

Use downstream collectors when grouped data needs a calculated value.

---

## 16. partitioningBy() - Split Employees by Salary Condition

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

public class StreamPartitioningBySalary {
    public static void main(String[] args) {
        List<PartitionEmployee> employees = Arrays.asList(
                new PartitionEmployee("Ravi", 75000),
                new PartitionEmployee("Amit", 42000),
                new PartitionEmployee("Dattu", 90000),
                new PartitionEmployee("Priya", 46000)
        );

        Map<Boolean, List<PartitionEmployee>> salaryPartition = employees.stream()
                .collect(Collectors.partitioningBy(employee -> employee.getSalary() >= 50000));

        System.out.println("Salary >= 50000: " + salaryPartition.get(true));
        System.out.println("Salary < 50000: " + salaryPartition.get(false));
    }
}
\`\`\`

Use \`partitioningBy()\` when the grouping condition is true/false.

---

## 17. toMap() - Convert Employee List to Map

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

public class StreamToMapEmployees {
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

Use \`toMap()\` when you need fast lookup by key.

---

## 18. toMap() with Merge Function - Remove Duplicate Employee IDs

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

class DuplicateEmployee {
    private final int id;
    private final String name;

    DuplicateEmployee(int id, String name) {
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

public class StreamRemoveDuplicateEmployees {
    public static void main(String[] args) {
        List<DuplicateEmployee> employees = Arrays.asList(
                new DuplicateEmployee(101, "Ravi"),
                new DuplicateEmployee(102, "Amit"),
                new DuplicateEmployee(101, "Ravi Duplicate"),
                new DuplicateEmployee(103, "Dattu")
        );

        Map<Integer, DuplicateEmployee> uniqueMap = employees.stream()
                .collect(Collectors.toMap(
                        DuplicateEmployee::getId,
                        Function.identity(),
                        (oldEmployee, newEmployee) -> oldEmployee
                ));

        List<DuplicateEmployee> uniqueEmployees = new ArrayList<>(uniqueMap.values());
        System.out.println(uniqueEmployees);
    }
}
\`\`\`

Use a merge function when duplicate map keys are possible.

---

## 19. joining() - Create Comma-Separated Names

\`\`\`java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamJoiningNames {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu", "Priya");

        String commaSeparatedNames = names.stream()
                .collect(Collectors.joining(", "));

        String readableNames = names.stream()
                .collect(Collectors.joining(", ", "[", "]"));

        System.out.println(commaSeparatedNames);
        System.out.println(readableNames);
    }
}
\`\`\`

Use \`joining()\` when strings must become one formatted string.

---

## 20. summarizingDouble() - Salary Summary Report

\`\`\`java
import java.util.Arrays;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;

class SummaryEmployee {
    private final String name;
    private final double salary;

    SummaryEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }
}

public class StreamSalarySummary {
    public static void main(String[] args) {
        List<SummaryEmployee> employees = Arrays.asList(
                new SummaryEmployee("Ravi", 75000),
                new SummaryEmployee("Amit", 42000),
                new SummaryEmployee("Dattu", 90000),
                new SummaryEmployee("Priya", 56000)
        );

        DoubleSummaryStatistics salarySummary = employees.stream()
                .collect(Collectors.summarizingDouble(SummaryEmployee::getSalary));

        System.out.println("Count: " + salarySummary.getCount());
        System.out.println("Min: " + salarySummary.getMin());
        System.out.println("Max: " + salarySummary.getMax());
        System.out.println("Average: " + salarySummary.getAverage());
        System.out.println("Sum: " + salarySummary.getSum());
    }
}
\`\`\`

Use summary collectors when you need count, min, max, average, and sum together.

---

## 21. Second Highest Salary Using Streams

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class RankEmployee {
    private final String name;
    private final double salary;

    RankEmployee(String name, double salary) {
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

public class StreamSecondHighestSalary {
    public static void main(String[] args) {
        List<RankEmployee> employees = Arrays.asList(
                new RankEmployee("Ravi", 75000),
                new RankEmployee("Amit", 42000),
                new RankEmployee("Dattu", 90000),
                new RankEmployee("Priya", 90000),
                new RankEmployee("Sneha", 56000)
        );

        Double secondHighestSalary = employees.stream()
                .map(RankEmployee::getSalary)
                .distinct()
                .sorted(Comparator.reverseOrder())
                .skip(1)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Second highest salary not found"));

        System.out.println("Second highest salary: " + secondHighestSalary);
    }
}
\`\`\`

This pattern is common in fresher and experienced interviews.

---

## 22. Parallel Stream - Process Large Number List

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class ParallelStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 1000; i++) {
            numbers.add(i);
        }

        int sumOfEvenNumbers = numbers.parallelStream()
                .filter(number -> number % 2 == 0)
                .mapToInt(Integer::intValue)
                .sum();

        System.out.println("Sum of even numbers: " + sumOfEvenNumbers);
    }
}
\`\`\`

Use \`parallelStream()\` carefully. It can help for large CPU-heavy work, but it is not always faster for small lists or database/API calls.

---

## Stream Method Selection Guide

| Requirement | Stream Method |
|---|---|
| Keep only matching records | \`filter()\` |
| Convert one value into another | \`map()\` |
| Flatten nested collections | \`flatMap()\` |
| Sort values or objects | \`sorted()\` |
| Remove duplicate values | \`distinct()\` |
| Read only first N records | \`limit()\` |
| Ignore first N records | \`skip()\` |
| Convert stream to List, Set, Map, or report | \`collect()\` |
| Count matching records | \`count()\` |
| Find lowest or highest value | \`min()\`, \`max()\` |
| Combine many values into one | \`reduce()\` |
| Check true/false rules | \`anyMatch()\`, \`allMatch()\`, \`noneMatch()\` |
| Find a matching record | \`findFirst()\`, \`findAny()\` |
| Build category reports | \`Collectors.groupingBy()\` |
| Split true/false groups | \`Collectors.partitioningBy()\` |
| Create lookup map | \`Collectors.toMap()\` |
| Create string output | \`Collectors.joining()\` |
| Build numeric report | \`summarizingInt()\`, \`summarizingDouble()\` |

## Interview Mistakes to Avoid

| Mistake | Why It Fails |
|---|---|
| Using \`map()\` for filtering | \`map()\` transforms, \`filter()\` removes |
| Forgetting terminal operation | Intermediate operations will not execute |
| Reusing the same stream twice | A stream is consumed after terminal operation |
| Using \`toMap()\` without merge function | Duplicate keys throw an exception |
| Calling \`Optional.get()\` directly | It can throw NoSuchElementException |
| Using parallel stream everywhere | It may be slower or unsafe for side effects |

## Fresher Practice Tasks

Try these changes after running the programs:

1. Change salary threshold from 50000 to 70000.
2. Sort employees by name and then salary.
3. Group employees by department and calculate average salary.
4. Convert employee list into Map<String, List<Employee>> by department.
5. Find the third highest salary using \`skip(2)\`.
6. Use \`noneMatch()\` to check that no employee has blank name.
`,
  code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamPracticalExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("ravi", "amit", "dattu");

        List<String> upperNames = names.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        System.out.println(upperNames);
    }
}`
};

export default java8StreamPracticalExamples;
