const java8MethodReferences = {
  id: 'java8-method-references',
  title: 'Java 8 Method References Tutorial',
  description: 'Learn Java 8 method references with lambda comparison, static, instance, and constructor references using clean realtime examples.',
  content: `
# Java 8 Method References with Lambda Comparison Examples

A method reference is a shorter form of a lambda expression when the lambda only calls an existing method.

\`\`\`java
names.forEach(name -> System.out.println(name));
\`\`\`

can be written as:

\`\`\`java
names.forEach(System.out::println);
\`\`\`

---

## Lambda vs Method Reference

| Lambda | Method reference |
|--------|------------------|
| \`name -> System.out.println(name)\` | \`System.out::println\` |
| Useful when custom logic is needed | Useful when only calling an existing method |
| Can contain multiple statements | Usually short and direct |

---

## Static Method Reference

\`\`\`java
Function<String, Integer> parser = Integer::parseInt;
System.out.println(parser.apply("100"));
\`\`\`

Pattern:

\`\`\`java
ClassName::staticMethodName
\`\`\`

---

## Instance Method Reference

\`\`\`java
List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");
names.forEach(System.out::println);
\`\`\`

Pattern:

\`\`\`java
objectName::instanceMethodName
\`\`\`

---

## Constructor Reference

\`\`\`java
Supplier<StringBuilder> supplier = StringBuilder::new;
StringBuilder builder = supplier.get();
\`\`\`

Pattern:

\`\`\`java
ClassName::new
\`\`\`

## Key Takeaways

- Method references make simple lambdas shorter.
- Use method reference when the lambda only calls an existing method.
- Common forms are static, instance, and constructor references.
`,
  code: `import java.util.Arrays;
import java.util.List;

public class MethodReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ravi", "Amit", "Dattu");
        names.forEach(System.out::println);
    }
}`
};

export default java8MethodReferences;
