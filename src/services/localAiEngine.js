/**
 * Practice Lab — rule-based chat, interview banks, and coach hints. All in the browser; no server.
 */

const GENERIC_HELP =
  'I match keywords and answer from a fixed knowledge base. Try JVM, OOP, collections, StringBuilder, JDBC, ' +
  'Spring Boot, REST, threads, MySQL, or Git. For spoken practice, use Audio & Video interview.';

const RULES = [
  {
    patterns: [/what\s+is\s+java\b|define\s+java\b|java\s+language\b/i],
    reply:
      'Java is a statically typed, object-oriented language: source compiles to bytecode, and the JVM runs that bytecode with garbage collection and a strong standard library. ' +
      'It is widely used for backends, Android (historically), and enterprise apps.',
  },
  {
    patterns: [/jvm|java virtual machine/i],
    reply:
      'The JVM runs bytecode, manages memory (heap, metaspace, GC), and provides portability. ' +
      'Pieces: classloaders, runtime data areas, execution engine, JNI.',
  },
  {
    patterns: [/jdk|jre/i],
    reply:
      'The JDK includes javac and tools plus a JRE. The JRE is the runtime (JVM + libraries) to execute Java programs.',
  },
  {
    patterns: [/oop|encapsulation|inheritance|polymorphism|abstraction/i],
    reply:
      'OOP: encapsulation (hide state), inheritance (reuse/specialize), polymorphism (one interface, many behaviors), abstraction (what not how).',
  },
  {
    patterns: [/equals|hashcode|hash code/i],
    reply:
      'equals is logical equality; hashCode must stay consistent with equals for hash maps. Override both together when equality is custom.',
  },
  {
    patterns: [/stringbuilder|string\s*builder|stringbuffer|string\s*buffer|difference between string/i],
    reply:
      'String is immutable. StringBuilder is mutable, not synchronized—good for single-thread assembly. StringBuffer is synchronized. Avoid += in tight loops.',
  },
  {
    patterns: [/immutable|string\s*pool|intern/i],
    reply:
      'Strings are immutable; the pool deduplicates literals. Use StringBuilder for heavy concatenation; intern() sparingly.',
  },
  {
    patterns: [/string\s+in\s+java|strings?\s+in\s+java|about\s+strings?\s+in\s+java|what\s+(is|are)\s+(a\s+)?string/i],
    reply:
      'In Java, String is an immutable type for text: each change creates a new object. Use equals() for value comparison, not ==. ' +
      'Literals may be interned in the string pool. For repeated concatenation in loops, use StringBuilder or StringBuffer (thread-safe). ' +
      'charAt, substring, and length are common; String also implements CharSequence.',
  },
  {
    patterns: [/arraylist|linkedlist|hashmap|concurrenthashmap|collections?|treemap|treeset/i],
    reply:
      'ArrayList: array-backed, fast index access. LinkedList: good inserts at ends. HashMap: buckets, load factor. ConcurrentHashMap for concurrent maps. TreeMap/TreeSet: sorted.',
  },
  {
    patterns: [/generics?|wildcard|\? extends|\? super/i],
    reply:
      'Generics add compile-time safety. PECS: Producer Extends, Consumer Super for wildcards.',
  },
  {
    patterns: [/stream\b|optional\b/i],
    reply:
      'Streams: lazy pipelines; terminal ops like collect/forEach. Optional models absence without null.',
  },
  {
    patterns: [/exception|try\s*catch|try\s*with\s*resources|checked|unchecked/i],
    reply:
      'Checked exceptions must be handled or declared; RuntimeException is unchecked. Prefer try-with-resources for AutoCloseable.',
  },
  {
    patterns: [/thread|executor|synchroni|volatile|concurrent/i],
    reply:
      'Prefer java.util.concurrent over raw threads. volatile gives visibility, not atomicity for compound updates.',
  },
  {
    patterns: [/jdbc|preparedstatement|connection pool|hikari/i],
    reply:
      'JDBC: use PreparedStatement for parameters (SQL injection safe), manage transactions, close resources. Pools reuse connections.',
  },
  {
    patterns: [/transaction|isolation|acid/i],
    reply:
      'ACID: atomicity, consistency, isolation, durability. Isolation levels trade consistency vs concurrency.',
  },
  {
    patterns: [/spring boot|autoconfig|starter/i],
    reply:
      'Spring Boot: starters, auto-configuration, @SpringBootApplication. Actuator for health/metrics.',
  },
  {
    patterns: [/spring\s*ioc|@autowired|bean/i],
    reply:
      'IoC container wires dependencies. Prefer constructor injection. Beans are often singleton by default.',
  },
  {
    patterns: [/@transactional|propagation/i],
    reply:
      '@Transactional uses proxies—self-invocation skips AOP. Know propagation and rollback rules.',
  },
  {
    patterns: [/@restcontroller|@getmapping|responseentity/i],
    reply:
      '@RestController = @Controller + @ResponseBody. Map verbs with *Mapping; ResponseEntity for status + body.',
  },
  {
    patterns: [/jpa|hibernate|lazy|n\+1/i],
    reply:
      'JPA/Hibernate: mind lazy loading and N+1; use fetch joins or @EntityGraph where appropriate.',
  },
  {
    patterns: [/servlet|filter|session|cookie|jwt/i],
    reply:
      'Servlets handle HTTP; filters cross-cut. Sessions are server-side; JWTs carry claims client-side for APIs.',
  },
  {
    patterns: [/mysql|sql\b|database\s+index|inner\s+join|left\s+join|normali[sz]ation|\bexplain\s+select/i],
    reply:
      'Indexes speed reads; use EXPLAIN on real SQL to see the plan. Normalize to reduce redundancy; denormalize selectively. Know INNER vs LEFT JOIN.',
  },
  {
    patterns: [/maven|pom|lifecycle/i],
    reply:
      'Maven: POM coordinates, dependencies, plugins; lifecycle phases compile/test/package/install.',
  },
  {
    patterns: [/git\b|merge|rebase|branch/i],
    reply:
      'Git: branches are pointers; merge vs rebase changes history shape; resolve conflicts carefully.',
  },
  {
    patterns: [/rest|http|idempotent/i],
    reply:
      'REST maps resources to URIs/verbs. GET safe; PUT/DELETE often idempotent. Use meaningful status codes.',
  },
  {
    patterns: [/microservice|gateway|circuit/i],
    reply:
      'Microservices: independent deploys, more ops complexity. Gateways route; circuit breakers limit cascade failures.',
  },
  {
    patterns: [/hello|hi\b|hey\b/i],
    reply: 'Hello. Ask a Java or backend question, or try Audio & Video interview for practice.',
  },
  {
    patterns: [/thank/i],
    reply: 'You are welcome. Keep practicing.',
  },
];

/**
 * @param {string} userMessage
 * @returns {string}
 */
export function getChatReply(userMessage) {
  const text = (userMessage || '').trim();
  if (!text) {
    return 'Type a question to get a local answer—no server or external AI.';
  }
  for (const rule of RULES) {
    if (rule.patterns.some((re) => re.test(text))) {
      return rule.reply;
    }
  }
  if (text.length < 4) {
    return 'Could you add a bit more detail?';
  }
  return GENERIC_HELP;
}

const INTERVIEW_BANK = {
  java: [
    { id: 'j1', text: 'Explain the difference between == and equals() for reference types in Java.' },
    { id: 'j2', text: 'What is the difference between String, StringBuilder, and StringBuffer?' },
    { id: 'j3', text: 'How does the try-with-resources statement work and when would you use it?' },
    { id: 'j4', text: 'Describe how HashMap handles collisions and resizing at a high level.' },
    { id: 'j5', text: 'What are the main states in the Java thread lifecycle?' },
    { id: 'j6', text: 'When would you choose an interface over an abstract class?' },
    { id: 'j7', text: 'What is the difference between final, finally, and finalize?' },
    { id: 'j8', text: 'Explain shallow copy versus deep copy for objects containing references.' },
    { id: 'j9', text: 'What are generics type erasure and what limitations does it impose at runtime?' },
    { id: 'j10', text: 'Compare fail-fast versus fail-safe iterators with an example use case for each.' },
    { id: 'j11', text: 'What is the difference between Callable and Runnable?' },
    { id: 'j12', text: 'When would you use a CountDownLatch versus a CyclicBarrier?' },
    { id: 'j13', text: 'Explain the happens-before relationship and why it matters for concurrent code.' },
    { id: 'j14', text: 'What is the purpose of the transient keyword in serialization?' },
    { id: 'j15', text: 'Describe method overloading versus overriding and how the JVM resolves calls.' },
    { id: 'j16', text: 'What are checked versus unchecked exceptions, and when would you introduce a custom exception?' },
    { id: 'j17', text: 'How does Optional help you design APIs, and when is it inappropriate?' },
    { id: 'j18', text: 'Explain the difference between Comparable and Comparator.' },
  ],
  jdbc: [
    { id: 'db1', text: 'Why use PreparedStatement instead of concatenating SQL strings?' },
    { id: 'db2', text: 'Explain JDBC transaction boundaries and what can go wrong without proper commit/rollback.' },
    { id: 'db3', text: 'How would you prevent connection pool exhaustion in a web application?' },
    { id: 'db4', text: 'What is the difference between Statement, PreparedStatement, and CallableStatement?' },
    { id: 'db5', text: 'How do you handle large result sets without loading everything into memory?' },
    { id: 'db6', text: 'Describe batch inserts in JDBC and when they improve performance.' },
    { id: 'db7', text: 'What is savepoint usage in JDBC and when might you need nested transaction-like control?' },
    { id: 'db8', text: 'How does connection validation work in a pool (e.g. test query on checkout)?' },
    { id: 'db9', text: 'Explain read-only connections and when to mark a JDBC connection read-only.' },
    { id: 'db10', text: 'What are common causes of “connection closed” errors in web apps under load?' },
  ],
  spring: [
    { id: 's1', text: 'What is dependency injection and how does Spring achieve it?' },
    { id: 's2', text: 'Compare @Component, @Service, @Repository, and @Controller stereotypes.' },
    { id: 's3', text: 'How does Spring MVC map an HTTP request to a controller method?' },
    { id: 's4', text: 'Explain @RequestBody, @RequestParam, and @PathVariable and typical pitfalls.' },
    { id: 's5', text: 'How does @Transactional work and why might it not roll back as you expect?' },
    { id: 's6', text: 'What is the difference between singleton and prototype bean scopes?' },
    { id: 's7', text: 'Describe Spring Boot auto-configuration at a high level.' },
    { id: 's8', text: 'How would you expose health and metrics in production for a Spring Boot service?' },
    { id: 's9', text: 'Compare @ControllerAdvice versus handling exceptions inside each controller.' },
    { id: 's10', text: 'What is Spring Security’s filter chain and where does authentication typically happen?' },
    { id: 's11', text: 'Explain REST idempotency for GET, PUT, POST, and DELETE in API design.' },
    { id: 's12', text: 'How do you validate request DTOs and return consistent error responses?' },
  ],
  mysql: [
    { id: 'mq1', text: 'What is the difference between PRIMARY KEY and UNIQUE constraints?' },
    { id: 'mq2', text: 'Explain clustered versus non-clustered indexes in MySQL (InnoDB perspective).' },
    { id: 'mq3', text: 'How would you diagnose a slow query using EXPLAIN?' },
    { id: 'mq4', text: 'What are the trade-offs of normalizing versus denormalizing a schema?' },
    { id: 'mq5', text: 'Describe ACID and how InnoDB provides durability and isolation.' },
    { id: 'mq6', text: 'What is a covering index and why can it speed up reads?' },
    { id: 'mq7', text: 'Compare INNER JOIN, LEFT JOIN, and when you would choose each.' },
    { id: 'mq8', text: 'How do you design indexes for a query that filters by status and sorts by created_at?' },
    { id: 'mq9', text: 'What are deadlocks in MySQL and how do you reduce them?' },
    { id: 'mq10', text: 'Explain transactions and isolation levels you have used in practice.' },
    { id: 'mq11', text: 'When would you use ENUM versus a lookup table?' },
  ],
  behavior: [
    { id: 'b1', text: 'Tell me about a time you debugged a tricky production issue. What was your process?' },
    { id: 'b2', text: 'Describe how you handle conflicting priorities when deadlines overlap.' },
    { id: 'b3', text: 'How do you give constructive code review feedback?' },
    { id: 'b4', text: 'Describe a time you disagreed with a technical decision. How did you proceed?' },
    { id: 'b5', text: 'How do you learn a new framework or stack under time pressure?' },
    { id: 'b6', text: 'Tell me about a mistake you made in production and what you changed afterward.' },
    { id: 'b7', text: 'How do you balance code quality with shipping features?' },
    { id: 'b8', text: 'Describe how you collaborate with QA on a critical release.' },
  ],
};

export const INTERVIEW_TRACKS = [
  { key: 'java', label: 'Core Java' },
  { key: 'jdbc', label: 'JDBC & databases' },
  { key: 'spring', label: 'Spring & web' },
  { key: 'mysql', label: 'MySQL & SQL' },
  { key: 'behavior', label: 'Behavioral' },
];

/**
 * @param {{ track: string, usedIds: Set<string> }} params
 * @returns {{ id: string, text: string } | null}
 */
export function nextInterviewQuestion({ track, usedIds }) {
  const pool = INTERVIEW_BANK[track] || INTERVIEW_BANK.java;
  const fresh = pool.filter((q) => !usedIds.has(q.id));
  const source = fresh.length ? fresh : pool;
  const pick = source[Math.floor(Math.random() * source.length)];
  return pick ? { id: pick.id, text: pick.text } : null;
}

/**
 * @param {string} question
 * @param {string} userNotes
 * @returns {string}
 */
export function coachAfterAnswer(question, userNotes) {
  const notes = (userNotes || '').trim();
  if (notes.length < 15) {
    return 'Try to speak or write for 30–60 seconds: situation, what you did, result, and what you learned.';
  }
  const lower = notes.toLowerCase();
  if (/because|therefore|so that|in order to/.test(lower)) {
    return 'Good: you connected reasoning. Next question: add a concrete example (numbers, tools, time saved).';
  }
  if (/\b(i|we)\s+(implemented|fixed|designed|refactored)/i.test(notes)) {
    return 'Strong action verbs. Mention trade-offs or alternatives you considered if this was system design.';
  }
  return 'Solid effort. Compare your answer to a textbook answer in the related LearnStackHub tutorial and note gaps.';
}
