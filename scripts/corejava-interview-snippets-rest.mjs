/** Remaining Core Java tutorial interview blocks (merge with corejava-interview-snippets.mjs). */
export const SNIPPETS_REST = {
  'src/data/corejava/controlflow/IfElse.js': `
---

## 10 Important if-else Interview Questions

### 1. When do you choose if-else over switch?
**Answer:** Use if-else for ranges, compound boolean conditions, or non-constant predicates; switch fits discrete constants (especially enums) with clearer branching.
If-else chains with duplicated conditions are a smell—extract methods.

### 2. What is dangling else and how does Java bind else?
**Answer:** An \`else\` binds to the nearest preceding \`if\` without an \`else\`; use braces to make intent explicit.
Always brace multi-line branches to avoid maintenance bugs.

### 3. How does \`boolean\` short-circuiting interact with if conditions?
**Answer:** \`&&\` and \`||\` skip evaluating the right side when the result is fixed—useful to avoid null checks and expensive calls.
Order conditions from cheapest/safest to heavier.

### 4. Can you use \`if\` with assignment accidentally?
**Answer:** Yes—\`if (x = y)\` is a compile-time error when the assignment does not produce a \`boolean\` (e.g. \`int\` operands). If both sides are \`boolean\`, it compiles and assigns \`y\` to \`x\`, which is often a logic bug mistaken for \`==\`.
Use \`==\` for comparison and tools/review to catch suspicious assignments in conditions.

### 5. What is the ternary operator vs if-else for returns?
**Answer:** Ternary is an expression and can be assigned; if-else is statements—pick based on readability.
Deep nesting of ternaries hurts clarity.

### 6. How do you structure validation with if-else early returns?
**Answer:** Guard clauses at the top reduce nesting (“fail fast”) and keep the happy path at the bottom.
This pattern appears heavily in REST controllers and parsers.

### 7. Scenario: feature flags control behavior—how does if-else scale?
**Answer:** A few flags work with if-else; many combinations call for strategy pattern, polymorphism, or rule engines.
Interviewers probe when simple branching becomes unmaintainable.

### 8. What role does \`else if\` play?
**Answer:** It chains mutually exclusive conditions after the first \`if\`; only one branch runs.
Contrast with separate \`if\` statements where multiple could run.

### 9. How does floating-point comparison affect if conditions?
**Answer:** Never compare \`double\` with \`==\` for computed values; use epsilon ranges or \`BigDecimal\`.
Financial rules often encode thresholds in configuration.

### 10. What is a common readability guideline for nested ifs?
**Answer:** Limit nesting depth (e.g., flatten with early returns or extract methods); cyclomatic complexity tools flag deep trees.
Readable code reduces defect rates in reviews.

`,

  'src/data/corejava/controlflow/ForLoop.js': `
---

## 10 Important for-loop Interview Questions

### 1. What are the three parts of a traditional \`for\` loop?
**Answer:** Initialization, condition, and update—executed before iteration, before each body, and after each body respectively.
The condition is checked every iteration.

### 2. What is enhanced for (\`for-each\`) and what types does it accept?
**Answer:** \`for (T x : iterable)\` iterates arrays or \`Iterable\`; no index unless you track manually.
Fails fast if collection is structurally modified—\`ConcurrentModificationException\` for many collections.

### 3. When is a traditional \`for\` loop better than enhanced for?
**Answer:** When you need the index, multiple arrays in lockstep, or to iterate backwards.
Enhanced for is clearer when you only need elements.

### 4. What is \`break\` and \`continue\` inside a for loop?
**Answer:** \`break\` exits the loop; \`continue\` skips to the next iteration.
Labeled \`break\` can exit outer loops.

### 5. What is off-by-one risk in loop bounds?
**Answer:** Using \`<=\` vs \`<\` with array length—classic fencepost errors.
Test with empty and single-element collections.

### 6. How do multiple variables work in \`for\` initialization?
**Answer:** You can declare several same-type vars: \`for (int i = 0, j = n - 1; i < j; i++, j--)\`.
Useful for two-pointer algorithms.

### 7. Scenario: processing millions of rows—what for-loop concerns arise?
**Answer:** Allocation in the loop header, autoboxing in enhanced for over poor structures, and unnecessary object creation in update step.
Profile before micro-optimizing.

### 8. What is the scope of the loop variable in a traditional for?
**Answer:** Declared in the for header, scoped to the loop body in modern Java (block scoped).
Older code sometimes declared \`int i\` outside for wider scope—avoid unless needed.

### 9. Can the loop condition call methods with side effects?
**Answer:** Yes, but it’s poor style—\`for (; it.hasNext(); )\` on an \`Iterator\` or calling \`size()\` each time can be costly if the method isn’t O(1).
Cache lengths or iterator state when appropriate.

### 10. How does \`for\` relate to iterators under the hood?
**Answer:** Enhanced for compiles to iterator or array index loops depending on type.
Understanding this explains CME and performance of raw arrays vs lists.

`,

  'src/data/corejava/controlflow/WhileLoop.js': `
---

## 10 Important while-loop Interview Questions

### 1. When do you pick \`while\` over \`for\`?
**Answer:** When iterations aren’t counted upfront—event loops, reading streams until EOF, polling until a condition flips.
For known ranges, \`for\` often reads clearer.

### 2. What is the difference between \`while\` and \`do-while\`?
**Answer:** \`while\` checks condition before first entry; \`do-while\` runs at least once then checks.
Use \`do-while\` for menus that must execute once.

### 3. What infinite loop risks exist with \`while (true)\`?
**Answer:** Must guarantee a \`break\`, \`return\`, or exception path exits; otherwise CPU spins forever.
Server loops often block on I/O inside to avoid burning cores.

### 4. How do you avoid busy-waiting?
**Answer:** Use blocking queues, \`wait/notify\`, \`LockSupport\`, or higher-level concurrency utilities instead of tight empty spins.
Busy-wait is for specialized low-latency systems with care.

### 5. Scenario: reading a \`ResultSet\` or \`BufferedReader\`—which loop fits?
**Answer:** \`while (rs.next())\` or \`while ((line = br.readLine()) != null)\`—condition drives continuation until data ends.
Classic JDBC and I/O interview patterns.

### 6. What happens if the condition never becomes false?
**Answer:** Infinite loop—often a logic bug; sometimes intentional servers with internal blocking.
Add timeouts and watchdogs for production loops.

### 7. Can \`while\` variables declared outside the loop create bugs?
**Answer:** Yes—reusing mutable flags without reset between iterations or concurrent updates cause subtle errors.
Prefer smaller scopes and immutable snapshots where possible.

### 8. How does \`continue\` behave in \`while\`?
**Answer:** Skips to next condition check—ensure increment steps still run or you may infinite-loop.
Double-check \`continue\` placement vs update expressions.

### 9. What is a sentinel-controlled loop?
**Answer:** Repeats until a special value (sentinel) appears—common in CLI input parsing.
Validate sentinel doesn’t collide with valid data.

### 10. How do you test while-loops effectively?
**Answer:** Cover zero iterations, one iteration, many iterations, and boundary where condition flips.
Property-based tests help find edge cases.

`,

  'src/data/corejava/controlflow/DoWhileLoop.js': `
---

## 10 Important do-while Interview Questions

### 1. Why does do-while guarantee at least one iteration?
**Answer:** The condition is evaluated after the body runs, so the body executes once before the first check.
Use when the first computation supplies data for the condition.

### 2. Give a realistic use case for do-while.
**Answer:** Menu prompts (“Enter choice until quit”), retry loops that must attempt an operation once, or reading until valid input.
Contrast with while when zero attempts should happen if already satisfied.

### 3. What’s a common bug when translating while to do-while?
**Answer:** Accidentally running an extra iteration or performing side effects when the while version would skip entirely.
Revalidate invariants at loop end.

### 4. How does do-while interact with \`continue\`?
**Answer:** \`continue\` jumps to condition check—ensure state updates still occur or you might stall.
Less common than in for loops; still test carefully.

### 5. Scenario: retry with exponential backoff—do you use do-while?
**Answer:** Often you attempt once then backoff in while; do-while fits “always try once” before checking whether to retry.
Combine with max retry caps.

### 6. Is do-while common in enterprise Java code?
**Answer:** Less than while/for; appears in parsers, interactive CLIs, and some polling patterns.
Readability matters—sometimes an infinite while with structured break is clearer.

### 7. Can do-while be rewritten with while only?
**Answer:** Yes—duplicate the body once before a while, or use flags—usually uglier.
Choose the form that minimizes duplication.

### 8. What about do-while with multiple exit conditions?
**Answer:** Combine boolean expressions or use breaks with clear comments.
Avoid deeply nested conditions inside the body.

### 9. How do you unit test do-while loops?
**Answer:** Force paths that exit on first condition check vs multiple iterations; mock I/O or predicates.
Verify boundary when the body should run exactly once.

### 10. Performance vs while?
**Answer:** Negligible difference—choose based on semantics.
Micro-optimizations belong after profiling.

`,

  'src/data/corejava/controlflow/SwitchStatement.js': `
---

## 10 Important switch Interview Questions

### 1. What types can switch use (classic vs modern Java)?
**Answer:** Historically integral types, enums, strings (Java 7+); pattern matching for types and sealed hierarchies evolves in newer versions.
Know your team’s JDK for which switch features are allowed.

### 2. Why is \`break\` important in switch cases?
**Answer:** Without \`break\`, execution falls through to the next case—sometimes intentional, often a bug.
Use comments when fall-through is deliberate.

### 3. What does \`default\` do?
**Answer:** Catches values not matched by cases—good for defensive handling or “impossible” states that log errors.
Some style guides require \`default\` even if empty.

### 4. How does switch on \`String\` work at compile time?
**Answer:** Compiler translates to hash-based dispatch with equals checks—roughly similar to if-else chain but cleaner.
Null \`String\` throws \`NullPointerException\` before matching.

### 5. What is exhaustive switch with enums or sealed types?
**Answer:** Compiler can require all variants covered—reduces missing cases when new enum values appear.
Team process must update switches when enums grow.

### 6. Scenario: routing HTTP methods or event types—why prefer switch?
**Answer:** Clear mapping from discrete constants to handlers; pairs well with enums.
Avoid giant switches that should be polymorphic handlers.

### 7. When is polymorphism better than switch?
**Answer:** When many cases share structure or new types are added frequently—Open/Closed principle.
Switch suits stable, finite sets.

### 8. What is the arrow syntax (\`case X ->\`) in modern switch?
**Answer:** No fall-through by default; can yield values as expressions—reduces boilerplate.
Improves readability for multi-case logic.

### 9. Can you declare variables in case blocks?
**Answer:** Yes, but brace scopes to avoid name clashes between cases in classic switch.
Arrow syntax often avoids brace noise.

### 10. What exception risks exist with switch on boxed types?
**Answer:** Unboxing null throws \`NullPointerException\`; ensure nullable values are handled before switch.
Validate inputs at system boundaries.

`,

  'src/data/corejava/controlflow/BreakContinue.js': `
---

## 10 Important break & continue Interview Questions

### 1. What is the difference between \`break\` and \`continue\`?
**Answer:** \`break\` exits the nearest loop or \`switch\`; \`continue\` skips to the next loop iteration.
Neither skips \`finally\` blocks.

### 2. What are labeled \`break\` and \`continue\`?
**Answer:** They target outer loops by label—\`break outer;\` exits nested loops; \`continue outer;\` advances the outer loop.
Use sparingly—often refactor to methods is clearer.

### 3. Can \`break\` exit a block that isn’t a loop?
**Answer:** Only with labeled blocks—rare style; many teams prefer structured returns or flags.
Know it for reading legacy code.

### 4. How does \`break\` interact with \`try/finally\`?
**Answer:** \`finally\` runs before the loop actually exits after \`break\`.
Resource cleanup still happens.

### 5. Scenario: searching a 2D matrix—when is labeled break useful?
**Answer:** When you find an element and want to exit both row and column loops immediately.
Alternatively use helper method with \`return\`.

### 6. Does \`continue\` skip the increment clause in a for loop?
**Answer:** In a traditional \`for\`, \`continue\` jumps to the update expression then condition—increment still runs.
In \`while\`, you must ensure state advances to avoid infinite loops.

### 7. What happens with \`continue\` inside \`try\` with \`finally\`?
**Answer:** \`finally\` executes before the next iteration begins.
Side effects in \`finally\` run every continue—watch performance.

### 8. Why avoid \`continue\` in deeply nested code?
**Answer:** It obscures control flow—extract loops or use stream operations with predicates.
Readability beats micro-conciseness.

### 9. Can switch use \`continue\`?
**Answer:** In a loop, \`continue\` inside \`switch\` continues the enclosing loop, not the switch—common gotcha.
Structure code to avoid confusion.

### 10. What’s a safe alternative to multiple breaks?
**Answer:** Extract method returning boolean success, or use \`Optional\` and short-circuit patterns.
Tests become simpler with structured exits.

`,

  'src/data/corejava/arrays/ArrayIntroduction.js': `
---

## 10 Important Arrays (Introduction) Interview Questions

### 1. What is an array in Java?
**Answer:** A fixed-length, ordered container of elements of the same type, indexed from \`0\` to \`length-1\`, stored contiguously for fast access.
Length is set at creation and cannot grow.

### 2. What is the default value for array elements?
**Answer:** Numeric types default to zero, \`boolean\` to false, reference types to \`null\`.
Local array variables themselves must be assigned before use.

### 3. How do you get array length—method or field?
**Answer:** \`array.length\` is a field, not a method—common gotcha vs \`String.length()\`.
No parentheses for arrays.

### 4. What is \`ArrayIndexOutOfBoundsException\`?
**Answer:** Thrown when index is negative or \`>= length\`; indicates bounds check failure.
Always validate external input indices.

### 5. Are arrays objects in Java?
**Answer:** Yes—arrays extend \`Object\`, can be \`null\`, and are heap allocated.
They’re covariant (typing pitfall with arrays of subtypes).

### 6. What is array covariance?
**Answer:** \`String[]\` is a subtype of \`Object[]\`, which allows \`ArrayStoreException\` at runtime if you insert wrong reified types.
Prefer \`List\` with generics for safer APIs.

### 7. Scenario: API returns byte[]—what concerns appear?
**Answer:** Mutability—callers might alter backing arrays; consider defensive copies for security-sensitive data.
Also watch large allocations on heap.

### 8. How do arrays compare to \`ArrayList\`?
**Answer:** Arrays fixed-size and faster for primitive-heavy tight loops; \`ArrayList\` resizable with boxing cost for primitives unless specialized libraries used.
Choose based on sizing uncertainty and API needs.

### 9. Can you resize an array?
**Answer:** No—create a new array and copy; \`Arrays.copyOf\` helps.
That’s why dynamic collections exist.

### 10. What is a typical time complexity for index access?
**Answer:** O(1) random access by index.
Insertion/deletion in the middle requires shifting—O(n).

`,

  'src/data/corejava/arrays/SingleDimensionalArray.js': `
---

## 10 Important Single-Dimensional Array Interview Questions

### 1. How do you declare and allocate a 1D array?
**Answer:** \`int[] a = new int[10];\` or shorthand \`int[] a = {1,2,3};\`.
Type notation \`int[]\` is idiomatic in Java.

### 2. What algorithms commonly use 1D arrays?
**Answer:** Sliding window, prefix sums, dynamic programming tables, counting sorts.
Interview loops often ask for O(n) passes with O(1) extra space.

### 3. How do you copy a 1D array efficiently?
**Answer:** \`System.arraycopy\`, \`Arrays.copyOf\`, or \`clone\` for shallow copies of references.
Deep copy requires per-element cloning for mutable objects.

### 4. What is two-pointer technique on a sorted array?
**Answer:** Place pointers at both ends to find pairs summing to target in O(n).
Classic interview pattern.

### 5. Scenario: rotating an array k steps—what’s the space-time tradeoff?
**Answer:** Extra O(n) buffer is simple; in-place reversal tricks achieve O(1) extra space.
Know both for interviews.

### 6. How do you find min/max in one pass?
**Answer:** Initialize with first element, iterate comparing—O(n) time, O(1) space.
Be careful with empty arrays.

### 7. What about parallel prefix operations?
**Answer:** Useful for cumulative sums; can parallelize for large arrays with fork/join—overhead matters for small n.
Big data pipelines use different frameworks.

### 8. Can 1D arrays hold primitives without boxing?
**Answer:** Yes—\`int[]\`, \`double[]\`, etc., avoid \`Integer\` overhead.
Generics require boxed types or arrays of primitives carefully.

### 9. What is binary search prerequisite?
**Answer:** Array must be sorted (or partitioned monotonic) for standard binary search.
Off-by-one in mid calculation is a common bug—use \`lo <= hi\` patterns consistently.

### 10. How do you reverse an array in place?
**Answer:** Swap elements from both ends moving inward until pointers cross—O(n/2) swaps.
Tests should include odd/even lengths.

`,

  'src/data/corejava/arrays/MultiDimensionalArray.js': `
---

## 10 Important Multi-Dimensional Array Interview Questions

### 1. Are Java multidimensional arrays truly rectangular?
**Answer:** Arrays of arrays—each row can have different lengths (jagged arrays).
\`int[][]\` may have \`matrix[i].length\` vary per row.

### 2. How do you allocate a 3×4 int matrix?
**Answer:** \`int[][] m = new int[3][4];\` rectangular, or \`new int[3][]\` then assign each row.
Memory layout is row-major in the flattened view of each row.

### 3. What is the memory layout implication for iteration order?
**Answer:** Traversing row-major sequentially caches better than jumping columns in naive 2D storage.
Performance-sensitive matrix code aligns access patterns accordingly.

### 4. Scenario: image represented as pixel[][]—what pitfalls appear?
**Answer:** Jagged rows break assumptions; bounds checks per row; watch for \`NullPointerException\` if a row unset.
Validate rectangular inputs at boundaries.

### 5. How do you transpose a matrix?
**Answer:** Swap \`i\` and \`j\` with extra storage or in-place for square matrices with index tricks.
Rectangular transpose needs new array dimensions.

### 6. What is spiral order traversal?
**Answer:** Layer-by-layer from outside inward—four pointers or direction deltas.
Common interview question—test empty and single-cell matrices.

### 7. Can you pass \`int[][]\` to a method expecting varargs of arrays?
**Answer:** Not directly as varargs of ints—varargs are 1D array parameters; 2D arrays are separate type.
Know method signatures for APIs like image processing.

### 8. What exceptions arise with bad indices in 2D?
**Answer:** \`ArrayIndexOutOfBoundsException\` on either dimension; NPE if row array missing.
Defensive checks on untrusted input.

### 9. How does \`Arrays.deepEquals\` help?
**Answer:** Compares nested arrays by content, not reference—useful for testing 2D equality.
\`deepToString\` helps debug.

### 10. When might you flatten 2D to 1D?
**Answer:** Interop with native libraries, buffer APIs, or contiguous memory requirements.
Track mapping formulas between (row,col) and flat index.

`,

  'src/data/corejava/arrays/ArrayMethods.js': `
---

## 10 Important Arrays Class Utilities Interview Questions

### 1. What does \`java.util.Arrays\` provide?
**Answer:** Static helpers: sort, binarySearch, fill, copyOf, equals, hashCode, stream, parallel operations, etc.
Prefer these over hand-rolled loops for correctness.

### 2. What is the difference between \`Arrays.sort\` for primitives vs objects?
**Answer:** Primitives use dual-pivot quicksort/tuning; objects require \`Comparable\` or \`Comparator\` and may use TimSort—stable.
Null elements in object arrays require comparator handling.

### 3. When does \`binarySearch\` return a negative value?
**Answer:** If key not found, returns \`-(insertion point) - 1\`—useful to find insertion index.
Array must be sorted first or results are meaningless.

### 4. What does \`Arrays.asList\` return?
**Answer:** A fixed-size list backed by the array—structural changes that resize throw; element set still affects array.
Wrapping, not copying.

### 5. Scenario: you need immutable snapshot of an array for an API—what’s wrong with exposing \`Arrays.asList\` backing array?
**Answer:** Callers can still mutate underlying array elements—copy defensively if needed.
Immutability requires unmodifiable wrappers plus array clone for references.

### 6. What is \`parallelSort\` good for?
**Answer:** Large primitive arrays where fork/join overhead pays off; small arrays may be slower than \`sort\`.
Measure on target hardware.

### 7. How does \`Arrays.deepEquals\` differ from \`equals\` on arrays?
**Answer:** \`equals\` on arrays compares references; \`deepEquals\` walks nested structure.
Important in tests comparing 2D arrays.

### 8. What is \`Arrays.setAll\` / \`parallelSetAll\`?
**Answer:** Initialize elements by index with lambdas—concise for computed tables.
Useful for benchmarks and functional-style setup.

### 9. Can \`sort\` throw \`ClassCastException\`?
**Answer:** If elements aren’t mutually comparable and comparator not provided—mixed incompatible types.
Validate types before sort.

### 10. What’s a pitfall with \`hashCode\` on arrays?
**Answer:** Default array \`hashCode\` is identity-based—use \`Arrays.hashCode\` or \`Arrays.deepHashCode\` for content-based hashing.
Impacts hash maps keyed on array content incorrectly.

`,

  'src/data/corejava/oops/OopsIntroduction.js': `
---

## 10 Important OOP Introduction Interview Questions

### 1. What are the four pillars of OOP in Java-centric interviews?
**Answer:** Encapsulation, inheritance, polymorphism, abstraction—teams expect definitions plus trade-offs, not textbook-only lists.
Relate each to maintenance and testing.

### 2. Why bundle data and behavior in objects?
**Answer:** Cohesion: invariants are enforced by methods instead of scattered procedural code mutating raw data.
Reduces duplication and bugs in large codebases.

### 3. How does OOP help with change?
**Answer:** Stable interfaces with substitutable implementations (polymorphism) localize changes behind abstractions.
Contrast with brittle global state.

### 4. What is coupling vs cohesion?
**Answer:** Coupling measures dependencies between modules; cohesion measures how focused a module’s responsibilities are.
Good OOP aims for loose coupling and high cohesion.

### 5. Scenario: a “God class” does everything—what OOP smell is that?
**Answer:** Low cohesion and likely high coupling—refactor into smaller classes with clear roles.
Interviewers probe refactoring experience.

### 6. Is inheritance always the right reuse mechanism?
**Answer:** No—composition often avoids fragile hierarchies and respects “favor composition over inheritance.”
Java 8+ interfaces and default methods shift patterns.

### 7. What role do interfaces play in OOP design?
**Answer:** Define contracts decoupled from implementation—enables testing with mocks and swapping implementations.
Key for Spring-style dependency injection.

### 8. How does encapsulation improve security?
**Answer:** Hide internal state, validate on setters, and prevent unauthorized mutation of sensitive fields.
Critical for PCI/HIPAA-style domains.

### 9. What is polymorphism in one sentence for interviews?
**Answer:** Code written to a supertype can operate on many subtypes with different behaviors at runtime.
Enables plug-in architectures.

### 10. Why learn OOP before frameworks like Spring?
**Answer:** Frameworks are OOP-heavy—beans, proxies, AOP, and lifecycle management assume solid class design fundamentals.
Weak OOP leads to anemic models and spaghetti wiring.

`,

  'src/data/corejava/oops/ClassesObjects.js': `
---

## 10 Important Classes & Objects Interview Questions

### 1. What is a class vs an object?
**Answer:** A class is the blueprint; an object is an instance residing on the heap with its own state.
Many objects can share one class definition.

### 2. What is object identity vs equality?
**Answer:** Identity (\`==\` on references) compares memory address; logical equality uses \`equals\` (when overridden).
Contracts require consistent \`hashCode\` with \`equals\`.

### 3. What is \`this\`?
**Answer:** Reference to the current instance—disambiguates fields from parameters; passed implicitly to instance methods.
In constructors, \`this(...)\` chains constructors.

### 4. What are instance fields vs static fields?
**Answer:** Instance fields per object; static fields shared across all instances of the class.
Static members bind to class load time.

### 5. Scenario: singleton service class—what object considerations matter?
**Answer:** Thread-safety of mutable state, lazy vs eager initialization, and testability (often prefer dependency injection over hard singletons).
Interviewers discuss Spring singleton scope vs plain static.

### 6. What is an anonymous object?
**Answer:** Created without storing reference—\`new Person().greet()\`—eligible for GC immediately after use if unreachable.
Useful for one-shot helpers.

### 7. How does the GC relate to objects?
**Answer:** Unreachable objects are collected automatically; finalize is deprecated—use try-with-resources for cleanup.
Don’t rely on prompt destruction.

### 8. What is a POJO?
**Answer:** Plain Old Java Object—simple data holder without framework inheritance requirements; often with accessors.
JPA entities are annotated POJOs.

### 9. Why avoid public mutable fields?
**Answer:** Breaks encapsulation—callers can put objects in invalid states; use accessors with validation.
Immutability reduces bugs.

### 10. What is object initialization order?
**Answer:** Superclass fields and constructors run before subclass; instance initializers and field defaults precede constructors.
Understanding this explains subtle constructor bugs.

`,

  'src/data/corejava/oops/Constructors.js': `
---

## 10 Important Constructors Interview Questions

### 1. What is a constructor’s purpose?
**Answer:** Initialize new objects—same name as class, no return type; runs after superconstructor.
Ensures invariants before methods are called.

### 2. What is constructor overloading?
**Answer:** Multiple constructors with different parameter lists—delegate with \`this(...)\` to centralize logic.
Reduces duplication.

### 3. What is a default constructor?
**Answer:** Provided only if you declare no constructors—public no-arg if class is public.
Once you define any constructor, the default is not inserted.

### 4. Can constructors be \`final\`, \`static\`, or \`synchronized\`?
**Answer:** No—constructors are not inherited and don’t follow those modifiers semantics.
\`private\` constructors enforce factory patterns or singletons.

### 5. What order must \`super(...)\` and \`this(...)\` appear?
**Answer:** Must be the first statement in a constructor—exactly one of them.
Ensures superclass is constructed before subclass fields rely on it.

### 6. Scenario: immutable object—how do constructors help?
**Answer:** Set all final fields once; reject invalid arguments; no setters afterward.
Thread-safe publication easier with true immutability.

### 7. What is constructor vs factory method?
**Answer:** Factories can hide subclasses, cache instances, and handle failure without throwing from constructors—constructors must succeed or fail object creation awkwardly.
Effective Java recommends considering static factories.

### 8. Can a constructor throw checked exceptions?
**Answer:** Yes, declare \`throws\`—callers must handle; object may be partially visible only in edge cases—be careful.
Prefer validation before construction when possible.

### 9. What happens if an exception escapes during construction?
**Answer:** Object may not be fully constructed; finalize is unreliable—avoid heavy work in constructors.
Use builders for complex setup.

### 10. What is copy constructor pattern?
**Answer:** Build new instance from existing—less idiomatic in Java than clone/builder; still appears in domain models.
Ensure deep vs shallow copy clarity.

`,

  'src/data/corejava/oops/Encapsulation.js': `
---

## 10 Important Encapsulation Interview Questions

### 1. Define encapsulation in engineering terms.
**Answer:** Hide internal representation and expose behavior through a controlled API—getters/setters, validation, invariants.
Clients depend on interface, not layout of fields.

### 2. Why not expose internal \`List\` via getter?
**Answer:** Callers could modify the list breaking invariants—return unmodifiable view or copy.
Defensive copying has performance cost—document policy.

### 3. What is a JavaBean convention?
**Answer:** Private fields, public accessors \`getX\`/\`setX\`, no-arg constructor—common in frameworks introspecting properties.
Not always the best domain model—avoid anemic-only design.

### 4. Scenario: account balance field—how does encapsulation prevent fraud bugs?
**Answer:** Mutations go through methods that log, authorize, and validate—no direct negative deposits.
Audit trails pair with encapsulation.

### 5. How does encapsulation relate to testing?
**Answer:** You can substitute collaborators behind interfaces; hidden state changes don’t ripple across the codebase if boundaries are clean.
Mocks rely on clear contracts.

### 6. What is package-private visibility’s role?
**Answer:** Hide implementation details within a module while keeping public API minimal—Java 9 modules strengthen this.
Reduces API surface for libraries.

### 7. Can encapsulation hurt performance?
**Answer:** Extra indirection and copying can matter in hot paths—profile before breaking encapsulation with public fields.
Usually clarity wins until proven otherwise.

### 8. What is property vs field?
**Answer:** Field is storage; property is conceptual accessor-backed attribute in bean terms.
Frameworks map columns to properties.

### 9. How do records (Java 16+) relate to encapsulation?
**Answer:** Immutable data carriers with generated accessors—less boilerplate while keeping invariants at construction.
Good for DTOs.

### 10. What’s a sign encapsulation is broken?
**Answer:** Widespread \`getters\` returning mutable internals, or other classes switching on type fields of peers.
Refactor toward Tell, Don’t Ask where appropriate.

`,

  'src/data/corejava/oops/Inheritance.js': `
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

`,

  'src/data/corejava/oops/Polymorphism.js': `
---

## 10 Important Polymorphism Interview Questions

### 1. What is compile-time vs runtime polymorphism?
**Answer:** Overloading resolves at compile time; overriding resolves at runtime via virtual method dispatch on the actual object type.
Interviewers love this distinction.

### 2. How does JVM invoke virtual methods?
**Answer:** Dynamic dispatch using class metadata—late binding allows subclass implementations to run through superclass references.
Performance is optimized by JIT inline caches.

### 3. What is upcasting and why is it safe?
**Answer:** Assign subclass reference to superclass type—callers use abstract contracts; downcasting needs \`instanceof\` checks.
Enables APIs accepting \`List<Shape>\` processing \`Circle\`, \`Square\`.

### 4. Can polymorphism apply to static methods or fields?
**Answer:** No virtual dispatch for statics—hidden by class; fields are not polymorphic—avoid “overriding” fields—use accessors.
Common trick question.

### 5. Scenario: plugin architecture—how does polymorphism help?
**Answer:** Core code depends on interfaces; plugins supply implementations discovered at runtime (SPI, DI containers).
Open/Closed principle in action.

### 6. What is double dispatch?
**Answer:** Technique to route operations based on two polymorphic types—visitor pattern solves expression problem.
Advanced OOP topic for senior roles.

### 7. How do generics interact with polymorphism?
**Answer:** Generics are invariant (\`List<String>\` not subtype of \`List<Object>\`) to preserve type safety—use wildcards for flexibility.
PECS principle guides bounds.

### 8. What is covariant return types in overriding?
**Answer:** Overriding method may return subtype of original return—allowed since Java 5.
Improves API precision in hierarchies.

### 9. Why is polymorphism hard with \`equals\` and \`hashCode\`?
**Answer:** Symmetric equality across inheritance requires careful design—often use \`Composition\` or \`canEqual\` pattern.
Broken contracts break hash-based collections.

### 10. What’s a performance consideration with polymorphic megamorphic call sites?
**Answer:** Too many implementation types can defeat inline caches—rare in business apps, relevant in language runtimes.
Profile before optimizing dispatch.

`,

  'src/data/corejava/oops/Abstraction.js': `
---

## 10 Important Abstraction Interview Questions

### 1. What is abstraction in OOP?
**Answer:** Hiding complexity and exposing only essentials—achieved via abstract classes and interfaces focusing on what, not how.
Reduces cognitive load for API users.

### 2. Abstract class vs interface—when choose which?
**Answer:** Abstract class for shared state/implementation; interface for cross-cutting capabilities and multiple typing.
Java records/sealed types influence modern choices.

### 3. Can you instantiate an abstract class?
**Answer:** No—must subclass and implement abstract methods (unless partially implemented by another abstract subclass).
Concrete leaf classes complete the model.

### 4. What is a pure abstract class vs interface with defaults?
**Answer:** Similar roles—defaults on interfaces reduce abstract class usage for mixin-like behavior.
Watch for accidental method collisions.

### 5. Scenario: payment processing—how does abstraction help?
**Answer:** Client code depends on \`PaymentGateway\` interface; Stripe/PayPal implementations swap without client changes.
Critical for testing with fakes.

### 6. How does abstraction relate to layered architecture?
**Answer:** Each layer exposes narrow interfaces to upper layers—hides databases, transports, and frameworks.
Violations leak SQL into UI—bad abstraction.

### 7. What is leaking abstraction?
**Answer:** When underlying details (SQL errors, HTTP codes) bubble up raw to callers who can’t handle them meaningfully.
Map to domain exceptions at boundaries.

### 8. Are \`abstract\` methods \`virtual\` by default?
**Answer:** Instance methods are virtual by default in Java—subclasses override unless \`final\`.
Contrast with C# \`virtual\` keyword.

### 9. How do sealed classes relate to abstraction (newer Java)?
**Answer:** Restrict which classes implement an abstraction—exhaustive pattern matching and safer domain modeling.
Useful for AST-like hierarchies.

### 10. Why too much abstraction hurts?
**Answer:** Indirection without benefit obscures flow—balance with YAGNI; abstractions should track real variation points.
Refactor when second implementation appears.

`,

  'src/data/corejava/oops/Interfaces.js': `
---

## 10 Important Interfaces Interview Questions

### 1. What can interfaces contain since Java 8?
**Answer:** \`default\` methods, \`static\` methods, private methods—interfaces evolve without breaking implementors as easily.
Still no instance fields (only \`public static final\` constants).

### 2. Can a class implement multiple interfaces?
**Answer:** Yes—Java supports multiple interface inheritance; resolve conflicts by overriding defaults explicitly.
Diamond problem handled by compiler rules.

### 3. What is a marker interface?
**Answer:** Empty interface signaling capability—\`Serializable\`, \`Cloneable\`—behavior provided by JVM/reflection conventions.
Consider annotations as modern alternative for metadata.

### 4. How does \`implements\` differ from \`extends\`?
**Answer:** \`implements\` lists interfaces; \`extends\` for one superclass—class can extend one class and implement many interfaces.
Order: extends first, then implements.

### 5. Scenario: repository layer—why define \`UserRepository\` interface?
**Answer:** Services depend on interface; JPA or in-memory implementations swap for tests and different environments.
Core Spring pattern.

### 6. What is functional interface?
**Answer:** Single abstract method interface—target for lambdas; \`@FunctionalInterface\` documents intent.
\`Comparator\`, \`Runnable\` examples.

### 7. Can interfaces extend other interfaces?
**Answer:** Yes—inheritance chains combine contracts; implementors must satisfy all abstract methods.
Combine small interfaces (Interface Segregation).

### 8. What happens if two defaults conflict?
**Answer:** Concrete class must override the conflicting method—compiler error until resolved.
Design default methods carefully in library upgrades.

### 9. Are interface methods implicitly \`public\`?
**Answer:** Yes—abstract methods are public; before Java 9, no private methods allowed.
Package-private not applicable to interface methods historically.

### 10. Why prefer small interfaces?
**Answer:** Interface Segregation Principle—clients shouldn’t depend on methods they don’t use—easier mocking and evolution.
Fat interfaces resist change.

`,

  'src/data/corejava/strings/StringIntroduction.js': `
---

## 10 Important String Introduction Interview Questions

### 1. Why is \`String\` immutable in Java?
**Answer:** Security (class loading, network), caching (string pool), thread-safety without locks, and safe sharing as keys in \`HashMap\`.
Immutability trades memory for predictability.

### 2. Where do string literals live?
**Answer:** String literals are interned in the string pool (part of the Java heap in modern JVMs); class metadata uses metaspace (Java 8+). Interned literals may share instances.
\`new String("hi")\` creates a separate heap object outside the pool unless interned.

### 3. What is \`String.intern()\`?
**Answer:** Adds string to pool and returns canonical reference—use sparingly; misuse can blow metaspace and slow down GC.
Rare in app code; more in frameworks.

### 4. How does \`+\` concatenation perform in loops?
**Answer:** Creates many intermediate \`String\` objects—use \`StringBuilder\` in hot loops.
Compiler optimizes some simple cases, not all.

### 5. What encoding does \`String\` use internally?
**Answer:** UTF-16 \`char\` sequence—supplementary characters use surrogate pairs.
Network I/O should specify charset explicitly.

### 6. Scenario: reading user password into \`String\`—what security concern exists?
**Answer:** Strings stay in memory until GC and may be interned—sensitive data better in \`char[]\` you can wipe.
Security reviews flag \`String\` passwords.

### 7. What does \`equals\` vs \`==\` mean for strings?
**Answer:** \`equals\` compares character content; \`==\` compares references—interning can make \`==\` accidentally true for literals.
Always use \`equals\` for logic unless identity intended.

### 8. Are strings thread-safe?
**Answer:** Yes, immutable values are freely shared across threads without synchronization.
Contrast with \`StringBuilder\`.

### 9. What is string pool duplication issue?
**Answer:** Large dynamic strings interned unnecessarily waste memory—don’t intern untrusted large inputs.
Monitor metaspace in long-running services.

### 10. How do raw bytes become \`String\`?
**Answer:** Via constructors and \`Charset\`—wrong charset produces mojibake—always specify UTF-8 at boundaries.
Files and sockets need explicit decoding.

`,

  'src/data/corejava/strings/StringMethods.js': `
---

## 10 Important String Methods Interview Questions

### 1. What does \`substring\` do in modern Java regarding memory?
**Answer:** Historically shared char array (leaks); now copies to avoid retaining huge backing arrays—still watch indices.
Know start inclusive, end exclusive.

### 2. How do \`replace\` vs \`replaceAll\` differ?
**Answer:** \`replace\` char sequences literal; \`replaceAll\` uses regex patterns—metacharacters need escaping.
Performance differs—regex costs more.

### 3. What does \`split\` with regex pitfalls?
**Answer:** Trailing empty strings may be dropped unless limit parameter used; regex special chars need escape.
CSV parsing often better with dedicated libraries.

### 4. What is \`strip\` vs \`trim\`?
**Answer:** \`strip\` removes Unicode whitespace; \`trim\` only ≤ U+0020 space—prefer \`strip\` for user text.
Older code may still use \`trim\`.

### 5. Scenario: case-insensitive comparison for locale user names?
**Answer:** Prefer \`String.CASE_INSENSITIVE_ORDER\` or \`equalsIgnoreCase\` for ASCII-like tokens; for natural language use \`Collator\` with locale.
Turkish I problem matters globally.

### 6. What does \`formatted\` / \`String.format\` do?
**Answer:** Locale-aware formatting with placeholders—good for messages; avoid in tight loops without caching pattern.
i18n uses \`MessageFormat\` or resource bundles.

### 7. How does \`compareTo\` order strings?
**Answer:** Lexicographic by Unicode values—sign indicates less/greater—not always human sorting order.
Use \`Collator\` for locale rules.

### 8. What is \`chars\` / \`codePoints\` for?
**Answer:** Stream primitive char or Unicode code points—use code points for full Unicode iteration.
Avoid splitting surrogate pairs incorrectly.

### 9. Why \`isBlank\` vs \`isEmpty\`?
**Answer:** \`isBlank\` true for whitespace-only; \`isEmpty\` only for length 0.
Validation uses \`isBlank\` for forms.

### 10. What about \`matches\` performance?
**Answer:** Compiles regex each call—reuse \`Pattern\` for repeated checks.
Micro-optimization but common in hot paths.

`,

  'src/data/corejava/strings/StringBuilder.js': `
---

## 10 Important StringBuilder Interview Questions

### 1. Why use \`StringBuilder\` over \`String\` in loops?
**Answer:** Mutable buffer avoids O(n²) object churn from repeated concatenation.
Single-threaded editing of text.

### 2. Is \`StringBuilder\` thread-safe?
**Answer:** No—use \`StringBuffer\` if synchronization required (rare); otherwise \`StringBuilder\` faster.
Concurrency on shared builder corrupts internal state.

### 3. What is initial capacity and why set it?
**Answer:** Reduces array resizing copies when you know approximate final size—constructor \`new StringBuilder(estimated)\`.
Default 16 may realloc often for large text.

### 4. How does \`append\` chain work?
**Answer:** Returns \`this\` for fluent chaining—single object mutated.
Watch for append order bugs in complex chains.

### 5. Scenario: building SQL or HTML—what risks appear?
**Answer:** Injection if concatenating untrusted input—use prepared statements and escaping, not string building alone.
Security trumps micro-performance.

### 6. What is \`toString\` cost?
**Answer:** Allocates final immutable \`String\`—call once after building.
Avoid repeated \`toString\` in intermediate steps unnecessarily.

### 7. Does \`delete\` / \`insert\` shift contents?
**Answer:** Yes—O(n) moves for arbitrary positions; frequent middle edits may suggest different structure (rope, chunks).
Profile if editing large buffers.

### 8. What JDK version changes matter (compact strings)?
**Answer:** JVM may store bytes for Latin-1 strings internally—transparent to API but affects memory footprint.
Still use APIs the same way.

### 9. How to reuse \`StringBuilder\` safely?
**Answer:** \`setLength(0)\` or new instance—reset clears content for pooling in tight loops—ensure not shared across threads.
Some parsers recycle builders.

### 10. Difference from \`StringJoiner\` / \`Collectors.joining\`?
**Answer:** Higher-level joining with delimiters—use streams for collection-to-text pipelines.
Pick based on readability.

`,

  'src/data/corejava/strings/StringBuffer.js': `
---

## 10 Important StringBuffer Interview Questions

### 1. When is \`StringBuffer\` still used?
**Answer:** Legacy code or rare cases needing synchronized \`append\` across threads—most apps prefer external synchronization or \`StringBuilder\` per thread.
Modern code rarely needs it.

### 2. How does synchronization impact performance?
**Answer:** Every method acquires monitor—contention kills throughput; avoid shared \`StringBuffer\` as global accumulator.
Use thread-local \`StringBuilder\` instead.

### 3. Is \`StringBuffer\` API compatible with \`StringBuilder\`?
**Answer:** Nearly identical mutating API—easy swap when thread-safety requirement disappears.
Refactor to \`StringBuilder\` after reviewing concurrency.

### 4. Scenario: logging framework appends on shared buffer—good idea?
**Answer:** Generally no—logging uses per-event builders or formatters; shared mutable buffers race.
Log4j/SLF4J handle thread safety differently.

### 5. What about \`append\` with primitives?
**Answer:** Overloaded for efficiency—avoids boxing in many paths.
Same as \`StringBuilder\`.

### 6. Does \`reverse\` mutate in place?
**Answer:** Yes—same object content reversed—useful for palindrome tricks rarely in production business logic.
Know BigInteger uses strings differently.

### 7. Why might interviewers still ask \`StringBuffer\`?
**Answer:** To discuss synchronization, evolution of Java performance, and knowing when sharing mutable state is wrong.
Signals multithreading awareness.

### 8. Can you convert \`StringBuffer\` to \`StringBuilder\` cheaply?
**Answer:** No direct shared conversion—copy via \`toString\` then new builder—implies allocation.
Design choice at construction time matters.

### 9. What is \`equals\` on \`StringBuffer\`?
**Answer:** Inherits \`Object.equals\` identity—use \`toString().equals\` for content compare.
Often surprises beginners.

### 10. Memory considerations vs \`String\`?
**Answer:** Both on heap; \`StringBuffer\` grows backing array—capacity tuning similar to \`StringBuilder\`.
Monitor large XML/JSON string assembly.

`,

  'src/data/corejava/exceptions/ExceptionIntroduction.js': `
---

## 10 Important Exception Basics Interview Questions

### 1. What is the hierarchy root for exceptions?
**Answer:** \`Throwable\` → \`Error\` vs \`Exception\`—\`Error\` usually not caught; \`Exception\` splits checked/unchecked at \`RuntimeException\`.
Interviewers draw this tree from memory.

### 2. Checked vs unchecked—who decides?
**Answer:** Subclasses of \`RuntimeException\` and \`Error\` are unchecked; other \`Exception\` subclasses are checked unless declared otherwise.
API designers choose recoverability expectations.

### 3. When should you catch \`Exception\` broadly?
**Answer:** Sparingly—at top-level handlers, logging, or framework boundaries—avoid swallowing without rethrowing wrapped domain errors.
Hides programming bugs if overused.

### 4. What is the difference between \`throw\` and \`throws\`?
**Answer:** \`throw\` emits an exception instance; \`throws\` declares checked exceptions a method may propagate.
Callers must handle or declare checked types.

### 5. Scenario: REST API—what exceptions should clients see?
**Answer:** Mapped HTTP status with sanitized messages—never raw stack traces or SQL details to clients.
Use \`@ControllerAdvice\` in Spring.

### 6. Why not catch \`NullPointerException\` for control flow?
**Answer:** It indicates bugs—fix the null with \`Optional\`, validation, or defaults—catching masks defects.
Performance and clarity suffer.

### 7. What is fail-fast vs fail-safe iterators related to exceptions?
**Answer:** Concurrent modification throws quickly on structural change—different from catching exceptions for flow.
Collections topic overlaps.

### 8. Can constructors declare checked exceptions?
**Answer:** Yes—callers must handle when constructing—sometimes prefer static factory returning \`Result\` types.
Framework constructors (e.g., \`IOException\`) propagate.

### 9. What information belongs in exception messages?
**Answer:** Enough to diagnose (ids, operation) without secrets—PII and tokens must be redacted.
Observability platforms parse structured errors.

### 10. What is suppression and addSuppressed?
**Answer:** Try-with-resources chains exceptions—primary exception holds suppressed ones from close failures—Java 7+.
Important for resource cleanup debugging.

`,

  'src/data/corejava/exceptions/TryCatchFinally.js': `
---

## 10 Important try-catch-finally Interview Questions

### 1. Does \`finally\` always run?
**Answer:** Almost always—even if \`try\` returns or throws—except JVM exit or infinite loop/thread death.
Don’t return values from \`finally\`—overrides try/catch returns confusingly.

### 2. What is try-with-resources?
**Answer:** Auto-closes \`AutoCloseable\` resources—preferred over manual \`finally\` closes—suppresses close exceptions properly.
Since Java 7.

### 3. Can you have try-with-resources without catch?
**Answer:** Yes—resources still close; exceptions propagate—often paired with \`throws\` on method.
Cleaner than verbose finally.

### 4. Scenario: closing JDBC Connection in finally—still needed with try-with-resources?
**Answer:** Try-with-resources handles it—ensure JDBC 4+ drivers implement \`AutoCloseable\`.
Legacy code may still show manual finally.

### 5. What exception do you catch first—specific or general?
**Answer:** Specific subclasses first—broader catches later—unreachable catch compile error if ordered wrong.
Reflects recoverability tiers.

### 6. What is exception translation?
**Answer:** Catch low-level exception, wrap in domain exception, rethrow—preserves cause chain via \`initCause\` or constructor.
Spring \`DataAccessException\` pattern.

### 7. Can \`finally\` block throw?
**Answer:** Yes—masks original exception from try—dangerous—keep finally minimal or catch within finally carefully.
Suppressed exceptions mitigate in try-with-resources.

### 8. What is multi-catch?
**Answer:** \`catch (IOException | SQLException e)\`—single handler for disjoint types—must not be subclasses of each other.
Reduces duplication.

### 9. How does return in try interact with finally?
**Answer:** Finally runs before return completes—finally’s return overrides try’s return value—avoid.
Tricky interview puzzle.

### 10. Why avoid empty catch blocks?
**Answer:** Swallows errors silently—logging at minimum—even if “impossible.”
Production incidents hide in empty catches.

`,

  'src/data/corejava/exceptions/ThrowThrows.js': `
---

## 10 Important throw & throws Interview Questions

### 1. What does \`throws\` on a method communicate?
**Answer:** Callers must handle or declare checked exceptions—part of the method contract alongside parameters and return type.
Document recoverable failures.

### 2. Can you throw checked exceptions inside lambdas freely?
**Answer:** Functional interfaces don’t declare checked exceptions—must wrap in runtime or use custom functional interfaces throwing checked.
Streams complicate this—try/catch inside or sneaky throw hacks (discouraged).

### 3. What is exception chaining?
**Answer:** Wrap low-level cause in high-level exception—\`new ServiceException("...", cause)\` preserves stack for root-cause analysis.
Don’t lose the cause.

### 4. Scenario: validating API input—throw \`IllegalArgumentException\` or custom?
**Answer:** \`IllegalArgumentException\` for programmer misuse; domain-specific validation may use custom types with error codes for clients.
Consistency across the API matters.

### 5. Does \`throws\` list need to include unchecked exceptions?
**Answer:** Optional—unchecked can be declared for documentation but not required.
Some APIs declare \`RuntimeException\` for clarity.

### 6. Can constructors throw?
**Answer:** Yes—object may not be constructed; be careful with partially initialized observers.
Factories can catch and translate.

### 7. What is the difference between \`throw new\` vs rethrow?
**Answer:** Rethrow passes same instance; wrapping adds context—choose based on abstraction layers.
Java 7+ rethrow with refined typing in some cases.

### 8. How many exceptions can \`throws\` list?
**Answer:** Multiple comma-separated—implementors must declare compatible or narrower throws (subtypes) when overriding.
Subclass can throw fewer checked types (contravariance rules).

### 9. What is \`Error\` and should you throw it?
**Answer:** Serious JVM issues—don’t throw application \`Error\`—use \`Exception\` hierarchy for app failures.
\`OutOfMemoryError\` is not catch-and-recover usually.

### 10. What is assert vs throw for invariants?
**Answer:** Assertions disabled by default in production—use for internal invariants; public validation uses exceptions.
Don’t rely on assert for security checks.

`,

  'src/data/corejava/exceptions/CustomExceptions.js': `
---

## 10 Important Custom Exceptions Interview Questions

### 1. When create a custom checked exception?
**Answer:** When callers should explicitly handle a recoverable domain failure—payment declined, inventory conflict.
Avoid overusing checked for non-recoverable bugs.

### 2. What should a custom exception include?
**Answer:** Meaningful name, fields for error codes/context, constructors chaining message and cause—serialVersionUID if serializable.
Avoid giant hierarchies without need.

### 3. Should custom exceptions extend \`RuntimeException\` or \`Exception\`?
**Answer:** \`RuntimeException\` if programming errors or everywhere propagation is acceptable; \`Exception\` if forcing handling.
Team conventions vary—Spring favors unchecked data access.

### 4. Scenario: multi-tenant SaaS—what extra data in exceptions?
**Answer:** Tenant id, request id, safe operation name—never secrets—helps support correlate logs.
Map to problem+json HTTP responses.

### 5. How does internationalization interact with exceptions?
**Answer:** Separate message keys from technical English logs—user-facing localized messages built at UI/API boundary.
Don’t localize engineer-only stack traces.

### 6. Is it OK to subclass library exceptions?
**Answer:** Sometimes—e.g., \`DataAccessException\`—but avoid coupling your domain to vendor exceptions at API edges.
Translate at boundaries.

### 7. What is error code enum pattern?
**Answer:** Enum implements interface with code + default HTTP status—consistent machine-readable errors for clients.
Used in well-designed REST APIs.

### 8. Should you override \`fillInStackTrace\`?
**Answer:** Rare optimization for high-volume exceptions—default stacks are costly—only after profiling proves need.
Security-sensitive code might strip stacks—be careful.

### 9. Serialization of exceptions across services?
**Answer:** Problematic—stack traces don’t serialize cleanly across processes—send structured error DTOs.
gRPC/REST use status codes.

### 10. Testing custom exceptions?
**Answer:** Assert exception type and message fields with \`assertThrows\`—verify mapping from domain events.
JUnit 5 patterns.

`,

  'src/data/corejava/exceptions/GlobalExceptionHandling.js': `
---

## 10 Important Global Exception Handling Interview Questions

### 1. What is a global exception handler in Spring?
**Answer:** \`@ControllerAdvice\` / \`@ExceptionHandler\` centralizes mapping from exceptions to HTTP responses and logging.
Reduces duplication in controllers.

### 2. Why not handle exceptions in every controller method?
**Answer:** Cross-cutting concern—DRY, consistent client experience, easier policy changes.
Local handling only for special cases.

### 3. Scenario: validation errors—what HTTP status?
**Answer:** Often 400 Bad Request with field-level error list—422 Unprocessable Entity sometimes for semantic validation.
Document consistent schema.

### 4. How to log exceptions globally without double logging?
**Answer:** Single handler logs once at appropriate level—avoid logging in filter and advice unless differentiated.
Correlation IDs tie logs to requests.

### 5. Should global handlers catch \`Throwable\`?
**Answer:** Dangerous—catches \`Error\`—usually catch \`Exception\` or specific types—let JVM handle serious errors.
OOM needs process-level response.

### 6. What about async/thread pool exceptions?
**Answer:** Not handled by MVC advice—use \`AsyncUncaughtExceptionHandler\` or framework hooks.
Reactive stacks use different error channels.

### 7. How to propagate trace ids to error payloads?
**Answer:** MDC logging context + include trace id in JSON error body—OpenTelemetry integration.
Supports customer support debugging.

### 8. Security of error messages globally?
**Answer:** Sanitize—no SQL fragments, paths, or stack traces to external users—detailed info only in server logs.
Pen testers look for info leaks.

### 9. Ordering of multiple \`@ControllerAdvice\` beans?
**Answer:** \`@Order\` annotation controls precedence—more specific handlers should win—document ordering rules.
Avoid overlapping exception type handling ambiguity.

### 10. Testing global handlers?
**Answer:** \`@WebMvcTest\` with thrown exceptions—verify JSON shape and status—contract tests for API errors.
Consumers rely on stable error formats.

`,

  'src/data/corejava/multithreading/ThreadIntroduction.js': `
---

## 10 Important Thread Introduction Interview Questions

### 1. What is a thread vs a process?
**Answer:** Process has isolated memory; threads share heap within a process—lighter context switch but needs synchronization for shared data.
JVM maps Java threads to OS threads (mostly).

### 2. What is preemptive multitasking?
**Answer:** OS schedules threads—any thread can pause at arbitrary points—race conditions without locks.
Explains why testing concurrency is hard.

### 3. Why not create unbounded threads for each request?
**Answer:** Threads consume memory and OS resources—thrashing and context switch overhead—use pools.
Virtual threads change economics on JDK 21+.

### 4. What is the main thread?
**Answer:** JVM starts it to run \`main\`—if it exits and no non-daemon threads remain, JVM may terminate.
Daemon threads don’t keep JVM alive.

### 5. Scenario: GUI / Android—why main thread matters?
**Answer:** UI toolkits require updates on EDT/main thread—long work on UI thread freezes—offload to background.
Similar patterns in web with async servlets.

### 6. What is context switching cost?
**Answer:** Saving registers and caches—too many threads hurt throughput—profile before massive parallelism.
CPU-bound vs IO-bound workloads differ.

### 7. How does Java map threads to OS threads?
**Answer:** 1:1 model on HotSpot—Project Loom adds lightweight virtual threads scheduled on carrier pool.
Interviewers may ask JDK 21 features.

### 8. What is a race condition?
**Answer:** Outcome depends on scheduling order—two threads mutate shared state without coordination—undefined behavior.
Fix with locks or atomic classes.

### 9. Why learn happens-before and memory model later?
**Answer:** Correct synchronization requires visibility guarantees beyond mutual exclusion—\`volatile\`, \`synchronized\`, concurrent collections establish happens-before.
Junior interviews may stay at lock basics.

### 10. What tools observe threads?
**Answer:** JVisualVM, JMC, \`jstack\`, async-profiler—thread dumps show deadlocks and hot locks.
Essential for production triage.

`,

  'src/data/corejava/multithreading/ThreadCreation.js': `
---

## 10 Important Thread Creation Interview Questions

### 1. What are two ways to create a thread?
**Answer:** Extend \`Thread\` (less flexible) or implement \`Runnable\`/\`Callable\` and pass to \`new Thread(runnable)\`—prefer composition over extending Thread.
Callable returns value and throws checked exceptions via \`Future\`.

### 2. Why prefer \`Runnable\` over extending \`Thread\`?
**Answer:** Separation of task from scheduling—same runnable can run on executors—inheritance not wasted on Thread.
Better OOP.

### 3. What is \`ExecutorService\` vs raw \`Thread\`?
**Answer:** Pools reuse threads, queue tasks, handle lifecycle—raw threads are low-level—always use executors in apps.
\`Executors\` factory methods with caution—bounded queues preferred.

### 4. How do you stop a thread safely?
**Answer:** Cooperative cancellation via \`volatile\` flag or interrupt—\`stop()\` deprecated unsafe.
Interrupt blocking IO and waits to wake threads.

### 5. Scenario: fire-and-forget logging thread—what’s wrong with endless new Thread per log?
**Answer:** Resource exhaustion—use async appenders backed by bounded queues and thread pools.
Logging libraries handle this.

### 6. What is \`Callable\` and \`Future\`?
**Answer:** Callable returns result; Future.get blocks for completion—timeouts prevent hangs.
\`ExecutorService.submit\` returns Future.

### 7. Can you start a thread twice?
**Answer:** No—\`IllegalThreadStateException\`—create new Thread instance to rerun task.
Thread object state machine enforces this.

### 8. What is thread naming and why set it?
**Answer:** \`setName\` aids thread dumps and JFR—meaningful names for pool threads via factory.
Debugging production issues faster.

### 9. What is \`ThreadGroup\`—still relevant?
**Answer:** Mostly legacy—security manager removed—limited use in modern code.
Know for reading old systems.

### 10. How do virtual threads change creation advice?
**Answer:** Cheap enough per task for blocking IO—still use structured concurrency APIs when available—don’t block carrier threads with CPU work.
JDK 21+ ecosystem shift.

`,

  'src/data/corejava/multithreading/ThreadMethods.js': `
---

## 10 Important Thread Methods Interview Questions

### 1. What does \`sleep\` do?
**Answer:** Pauses current thread without releasing locks—subject to interrupt—use \`TimeUnit\` for clarity.
Not precise real-time guarantees.

### 2. Difference between \`wait\` and \`sleep\`?
**Answer:** \`wait\` releases monitor lock and must be called in synchronized block on same object; \`sleep\` holds locks.
\`wait\` is for coordination; \`sleep\` for timing.

### 3. What is \`join\`?
**Answer:** Current thread waits for another thread to finish—timeouts available—useful for fork-join style tasks.
Join ordering can deadlock if circular waits.

### 4. What does \`interrupt\` mean?
**Answer:** Sets interrupt flag—cooperative—blocking methods throw \`InterruptedException\` and clear flag—restore interrupt status if catching.
Don’t ignore interrupted exception silently.

### 5. Scenario: graceful shutdown—what sequence of methods?
**Answer:** Signal threads interrupt, await termination with \`ExecutorService.awaitTermination\`, then force shutdown if needed—drain queues carefully.
Spring Boot hooks use similar patterns.

### 6. What is \`yield\`?
**Answer:** Hint to scheduler—rarely needed—non-deterministic—testing concurrency with yield is flaky.
Avoid for correctness.

### 7. \`setDaemon\` purpose?
**Answer:** Daemon threads don’t prevent JVM exit—background tasks like heartbeats—must set before \`start\`.
User threads keep JVM alive.

### 8. What is \`Thread.currentThread()\`?
**Answer:** Returns reference to executing thread—useful for names, class loaders in frameworks.
Don’t abuse for implicit globals.

### 9. Priority \`setPriority\` reliable?
**Answer:** Platform-dependent—don’t rely on priorities for correctness—use proper scheduling abstractions.
Games/real-time systems tune carefully.

### 10. What is \`holdsLock\` debugging aid?
**Answer:** \`Thread.holdsLock\` asserts lock ownership in assertions—useful in custom locks debugging.
Not for production control flow.

`,

  'src/data/corejava/multithreading/ThreadLifecycle.js': `
---

## 10 Important Thread Lifecycle Interview Questions

### 1. What are thread states in \`Thread.State\`?
**Answer:** NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED—JVM maps OS states into these categories.
\`RUNNABLE\` includes ready and running.

### 2. When is a thread BLOCKED?
**Answer:** Waiting to enter synchronized block/method because monitor held by another thread—distinct from WAITING on \`wait\`.
Thread dumps show “waiting to lock monitor.”

### 3. What transitions to WAITING?
**Answer:** \`Object.wait\`, \`join\` without timeout, \`LockSupport.park\`, \`Condition.await\`—until another thread signals.
Must understand paired signal/notify.

### 4. What is TIMED_WAITING?
**Answer:** \`sleep\`, \`wait(timeout)\`, \`join(timeout)\`—wake after time or signal.
Used for timeouts and polling.

### 5. Scenario: thread stuck in BLOCKED—how diagnose?
**Answer:** Thread dump—find lock owner—often deadlock or hot lock—reduce critical sections or reorder lock acquisition.
Avoid lock ordering violations.

### 6. Can you restart TERMINATED thread?
**Answer:** No—create new Thread wrapping new or same Runnable.
Lifecycle is one-way.

### 7. What is spurious wakeup?
**Answer:** \`wait\` may wake without notify—always re-check condition in loop.
Official pattern in concurrency books.

### 8. How do thread pools mask lifecycle details?
**Answer:** Workers reuse threads across tasks—task failures shouldn’t kill worker thread—uncaught handlers log errors.
Understand pool’s afterExecute hooks.

### 9. What is \`j.u.c.\` \`Phaser\` / \`CyclicBarrier\` lifecycle?
**Answer:** Coordinate phases of parallel tasks—advanced beyond basic thread states but interview for senior concurrency roles.
Know they exist.

### 10. JVM shutdown and thread lifecycle?
**Answer:** Shutdown hooks run for orderly termination—daemon threads stop abruptly—ensure resources closed via try-with-resources and hooks.
Containers send SIGTERM—handle gracefully.

`,

  'src/data/corejava/collections/CollectionIntroduction.js': `
---

## 10 Important Collections Framework Interview Questions

### 1. What root interfaces define Java collections?
**Answer:** \`Collection\`, \`List\`, \`Set\`, \`Queue\`, \`Map\` (not extending Collection)—choose by duplicates, order, and key-value needs.
Interviewers expect complexity trade-offs.

### 2. What is difference between \`Iterable\` and \`Collection\`?
**Answer:** \`Iterable\` enables enhanced for; \`Collection\` adds size, add, contains—broader mutability contract.
Streams also build on spliterator iteration.

### 3. Why not use Vector / Hashtable in new code?
**Answer:** Legacy synchronized collections—poor concurrency scalability—prefer \`ConcurrentHashMap\`, \`CopyOnWriteArrayList\` when needed.
Performance and API modernization.

### 4. What is fail-fast iterator?
**Answer:** Throws \`ConcurrentModificationException\` if collection structurally modified during iteration (except via iterator’s remove)—detects single-thread misuse mostly.
Not a full concurrency guarantee.

### 5. Scenario: counting distinct users—Set vs List?
**Answer:** \`Set\` enforces uniqueness—\`HashSet\` average O(1) add/contains—List would need contains scan O(n) per insert.
Choose structure for access pattern.

### 6. What is \`Collections.unmodifiableList\`?
**Answer:** Wrapper preventing modification—fails fast on mutators—underlying list changes still visible if mutable elements.
Defensive copies for true immutability.

### 7. How do generics improve collections?
**Answer:** Compile-time checks instead of runtime \`ClassCastException\`—readability and safety.
Wildcards capture producer/consumer roles.

### 8. What is \`Comparable\` vs \`Comparator\`?
**Answer:** Natural ordering inside class vs external ordering strategy—\`TreeSet\` uses Comparable or provided Comparator.
Multiple sort orders need Comparator.

### 9. Big-O for \`ArrayList\` vs \`LinkedList\`?
**Answer:** ArrayList fast random access O(1), append amortized O(1); LinkedList O(n) random, fast head/tail inserts—ArrayList wins most cases due to cache locality.
Benchmark before choosing LinkedList.

### 10. What is \`equals/hashCode\` contract for Set/Map keys?
**Answer:** Equal objects must have equal hash codes—mutating key fields after insert breaks map invariants—use immutable keys.
Frequent interview trap.

`,

  'src/data/corejava/collections/ListInterface.js': `
---

## 10 Important List Interface Interview Questions

### 1. What does \`List\` guarantee over \`Collection\`?
**Answer:** Positional access, search by index, iterators ordered by sequence—allows duplicates.
Implementations differ in performance characteristics.

### 2. When pick \`ArrayList\` over \`LinkedList\`?
**Answer:** Almost always \`ArrayList\` for general-purpose—cache-friendly contiguous storage—LinkedList rare for deque operations without index access.
Default choice in interviews.

### 3. What is random access marker interface?
**Answer:** \`RandomAccess\` flags lists supporting fast index—algorithms like \`Collections.binarySearch\` choose strategy based on it.
Binary search requires sorted list anyway.

### 4. Scenario: frequent inserts in middle of large list?
**Answer:** Both ArrayList and LinkedList have pain—ArrayList shifts O(n); LinkedList find index O(n)—often rethink data structure (tree, gap buffer) or batch edits.
Profile real workloads.

### 5. What is subList view caution?
**Answer:** Sublist backed by original—structural modifications to either may throw \`ConcurrentModificationException\`—modifications can surprise.
Copy if you need independence.

### 6. How does \`List.of\` differ from \`Arrays.asList\`?
**Answer:** \`List.of\` returns immutable list—\`Arrays.asList\` fixed size mutable elements—neither supports structural add/remove semantics same way.
Java 9+ prefers \`List.of\` for literals.

### 7. Thread safety of ArrayList?
**Answer:** Not synchronized—external sync or \`Collections.synchronizedList\` or use concurrent structures—often \`CopyOnWriteArrayList\` for read-heavy.
Vector is legacy synchronized growable array.

### 8. What is \`removeIf\` / \`replaceAll\`?
**Answer:** Default methods mutating with predicates—can throw CME if not supported concurrently—use concurrent variants if needed.
Functional-style bulk operations.

### 9. How to sort List in place?
**Answer:** \`Collections.sort\` or \`list.sort(Comparator)\`—TimSort stable O(n log n).
Original list mutated.

### 10. What about \`ListIterator\`?
**Answer:** Bidirectional traversal, add/replace during iteration—useful for linked structures and safe removal during iteration.
More powerful than basic Iterator.

`,

  'src/data/corejava/collections/SetInterface.js': `
---

## 10 Important Set Interface Interview Questions

### 1. What is Set’s uniqueness contract?
**Answer:** No duplicate elements per \`equals\`/\`hashCode\`—at most one null in implementations allowing null (avoid).
Mathematical set abstraction.

### 2. HashSet vs LinkedHashSet vs TreeSet?
**Answer:** HashSet O(1) avg ops unordered; LinkedHashSet insertion order; TreeSet sorted per Comparable/Comparator O(log n).
Pick ordering requirements first.

### 3. Can you modify elements used in HashSet after insert?
**Answer:** Dangerous—if fields affecting equals/hash change, set breaks—use immutable keys or remove/re-add consciously.
Classic defect in interviews.

### 4. Scenario: dedupe user IDs from stream—idiomatic approach?
**Answer:** \`stream().collect(Collectors.toSet())\` or \`distinct()\` if hash based on equals—ensure stable equals for objects.
Large datasets consider trove/openhash if primitives.

### 5. What is \`EnumSet\`?
**Answer:** Extremely efficient bit-vector set for enums—preferred when domain is enum universe.
Faster than HashSet for enums.

### 6. What is \`CopyOnWriteArraySet\`?
**Answer:** Thread-safe copy-on-write—good read-heavy, rare writes—expensive writes—iterator snapshot.
Event listener registries sometimes.

### 7. Set equals/hashCode with other collections?
**Answer:** Set equals another Set if same elements regardless of order—hashCode defined accordingly.
Symmetry with List differs.

### 8. Why TreeSet’s comparator must be consistent with equals?
**Answer:** Otherwise Set contract breaks—equal elements might both exist if compare returns non-zero—subtle bugs.
Document comparator assumptions.

### 9. BitSet vs HashSet for integers?
**Answer:** BitSet compact for dense integer ranges—specialized—not implementing Set interface fully same way—domain specific.
Memory efficient cardinality.

### 10. Performance of \`contains\` in HashSet?
**Answer:** Average O(1)—depends on good hash function and load factor—resize costs amortized.
Know initial capacity and load factor tuning.

`,

  'src/data/corejava/collections/QueueInterface.js': `
---

## 10 Important Queue Interface Interview Questions

### 1. What operations does Queue add beyond Collection?
**Answer:** \`offer/poll/peek\` (non-throwing) vs \`add/remove/element\` (throwing)—choose for bounded queues handling backpressure.
Critical in producer-consumer systems.

### 2. LinkedList as Queue—still recommended?
**Answer:** Works but often \`ArrayDeque\` is faster for deque operations without null elements—prefer \`ArrayDeque\` as queue.
LinkedList poor cache locality.

### 3. What is PriorityQueue?
**Answer:** Min-heap by natural order or comparator—head is least element—O(log n) insert/remove—unbounded.
Not thread-safe—\`PriorityBlockingQueue\` for concurrency.

### 4. Scenario: task scheduling by deadline—what queue fits?
**Answer:** \`PriorityQueue\` or time-wheel structures for efficiency at scale—simple cases use \`PriorityQueue\` of tasks.
Know delayed and scheduled executors built atop.

### 5. BlockingQueue vs Queue?
**Answer:** \`put/take\` block when full/empty—essential for backpressure—\`ArrayBlockingQueue\`, \`LinkedBlockingQueue\`.
Producer-consumer pipelines.

### 6. What is \`Deque\` double-ended queue?
**Answer:** Add/remove both ends—stack (\`push/pop\`) and queue—\`ArrayDeque\` preferred over \`Stack\` class.
Stack extends Vector—legacy.

### 7. Why avoid \`Stack\` class?
**Answer:** Legacy synchronized vector-based—use \`Deque\`—better performance and clearer API.
Interview historical note.

### 8. What is \`ConcurrentLinkedQueue\`?
**Answer:** Lock-free non-blocking queue—high concurrency—weak consistency size—good for MPMC in some patterns.
Understand memory ordering costs.

### 9. Bounded vs unbounded queue risk?
**Answer:** Unbounded queues hide overload—OOM risk—bounded with rejection policies or backpressure in reactive systems.
Resilience engineering.

### 10. FIFO guarantee always?
**Answer:** \`PriorityQueue\` not FIFO by arrival—\`LinkedBlockingQueue\` FIFO—choose semantics carefully.
Fairness vs priority trade-off.

`,

  'src/data/corejava/collections/MapInterface.js': `
---

## 10 Important Map Interface Interview Questions

### 1. Why doesn’t Map extend Collection?
**Answer:** Different abstraction—key-value pairs vs elements—separate hierarchy with \`entrySet\`, \`keySet\`, \`values\` bridging views.
Design clarity.

### 2. HashMap vs Hashtable vs ConcurrentHashMap?
**Answer:** HashMap unsynchronized null-friendly one null key; Hashtable legacy synchronized; CHM segmented locking/JDK8+ node locking for concurrency.
Default new code: HashMap single-thread, CHM concurrent.

### 3. What is load factor and resizing?
**Answer:** When size/capacity exceeds load factor threshold, HashMap doubles capacity and rehashes—amortized cost—tune initial capacity if known size.
Rehashing pauses can hurt latency spikes.

### 4. Hash collision handling in HashMap?
**Answer:** Separate chaining with linked lists → treeification for long chains—O(log n) worst per bucket after Java 8.
Poor hash function degrades to trees.

### 5. Scenario: cache with TTL—use HashMap alone?
**Answer:** No—needs eviction—use Caffeine, Guava Cache, or Redis—HashMap grows unbounded leaks memory.
Know off-heap and concurrent requirements.

### 6. What is \`LinkedHashMap\` access order?
**Answer:** Can maintain insertion or access order—basis for LRU caches with removeEldestEntry override.
Simple LRU pattern.

### 7. IdentityHashMap purpose?
**Answer:** Reference identity (\`==\`) instead of equals—rare—framework internals, serialization tracking—don’t use for business keys normally.

### 8. WeakHashMap vs HashMap?
**Answer:** Keys held weakly—entries disappear when keys GC—useful for canonical registries without preventing GC—subtle lifecycle semantics.
Not a general cache.

### 9. Immutable maps in Java 9+?
**Answer:** \`Map.of\` and \`Map.copyOf\`—compact immutable maps—fail on duplicate keys—null-prohibited.
Prefer for static catalogs.

### 10. Why \`equals\` and \`hashCode\` for keys critical?
**Answer:** Buckets determined by hash—equal keys must land in same bucket—broken equals/hash loses entries or duplicates.
Immutable keys strongly recommended.

`,

  'src/data/corejava/advanced/Serialization.js': `
---

## 10 Important Serialization Interview Questions

### 1. What is Java serialization?
**Answer:** Converting object graphs to bytes via \`ObjectOutputStream\`—deserialization reconstructs objects—uses class metadata and \`serialVersionUID\`.
Security-sensitive—validate inputs.

### 2. What is \`serialVersionUID\`?
**Answer:** Version fingerprint—mismatch causes \`InvalidClassException\`—declare explicitly to control compatibility across releases.
Don’t rely on generated default across machines.

### 3. What does \`transient\` mean?
**Answer:** Field skipped from default serialization—recompute on deserialization or mark non-serializable collaborators.
Secrets must be transient.

### 4. Scenario: microservices—do teams use Java serialization for APIs?
**Answer:** Rare—JSON/Protobuf preferred—Java serialization couples JVM versions and classes—security risks (gadget chains).
Only trusted networks if used.

### 5. What is \`Externalizable\`?
**Answer:** Custom read/write control—performance and evolution—more work than \`Serializable\` defaults.
Advanced use cases.

### 6. Serialization vs JSON (Jackson)?
**Answer:** JSON human-readable cross-language; Java serialization preserves Java-only object graph and types—different interoperability and security models.
REST APIs almost always JSON.

### 7. What is deserialization attack?
**Answer:** Malicious bytes instantiate dangerous classes—gadget chains—use allowlists, avoid blind deserialization, prefer signing.
OWASP guidance critical.

### 8. Parent class serialization rules?
**Answer:** Non-serializable superclass must have accessible no-arg constructor for deserialization subclass—careful hierarchy design.
Inheritance complicates.

### 9. \`readObject\` / \`writeObject\` hooks?
**Answer:** Customize serialization for class—validate invariants, substitute proxies—careful with security.
Used in libraries.

### 10. Performance concerns?
**Answer:** Slow, verbose bytes—use faster formats when possible—Kryo/Protobuf for internal high-throughput—measure.
GC pressure from large graphs.

`,

  'src/data/corejava/advanced/Synchronization.js': `
---

## 10 Important Synchronization Interview Questions

### 1. What problem does synchronization solve?
**Answer:** Mutual exclusion and visibility—prevents data races on shared mutable state and ensures updates visible across threads.
Without sync, stale reads occur.

### 2. \`synchronized\` method vs block?
**Answer:** Method locks \`this\` or class object for static; block can lock any object—finer granularity reduces contention.
Prefer smaller critical sections.

### 3. What is intrinsic lock / monitor?
**Answer:** Every object has monitor—\`synchronized\` acquires/releases—one thread at a time per monitor.
Reentrant locks allow same thread reentry.

### 4. \`ReentrantLock\` vs \`synchronized\`?
**Answer:** Lock offers tryLock, timed lock, fairness option, interruptible lock acquisition—more flexible—must unlock in finally.
\`synchronized\` simpler and JVM optimized.

### 5. Scenario: banking transfer between accounts—how to lock?
**Answer:** Lock ordering—always acquire locks in global order to prevent deadlock—e.g., by account id sort—use \`Objects.hash\` ordering.
Classic concurrency interview.

### 6. What is \`ReadWriteLock\`?
**Answer:** Multiple concurrent readers or single writer—good read-heavy caches—overhead if reads short—profile.
\`StampedLock\` optimistic reads advanced.

### 7. Does synchronization fix all concurrency bugs?
**Answer:** No—atomicity of compound operations needs careful design—use \`java.util.concurrent.atomic\` or higher-level abstractions.
Deadlocks still possible.

### 8. What is lock contention symptom?
**Answer:** Threads BLOCKED in dumps, low CPU but high latency—reduce critical section, split locks, or use concurrent collections.
Metrics: blocked time in profilers.

### 9. \`volatile\` vs synchronized for visibility?
**Answer:** \`volatile\` ensures visibility and ordering for single variable—no mutual exclusion—compound operations still need locks or atomics.
One-write many-read flags often volatile.

### 10. Modern alternatives to manual synchronization?
**Answer:** \`java.util.concurrent\` utilities, parallel streams cautiously, reactive APIs, immutable data—reduce shared mutable state first.
Best synchronization is no synchronization.

`,
};
