import { TOTAL_QUESTIONS } from './config';

/** Assessment L1 question set — fixed order, advanced level. */

export const recruitmentQuestions = [
  // Java Collections (3)
  {
    id: 1,
    topic: 'Java Collections',
    question:
      'In JDK 8+, when does a HashMap bucket convert a linked list into a red-black tree?',
    options: [
      'When load factor exceeds 0.75',
      'When bucket size exceeds 8 and table capacity is at least 64',
      'When hash collisions exceed 50%',
      'When key implements Comparable',
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    topic: 'Java Collections',
    question:
      'Which statement about ConcurrentHashMap in Java 8+ is correct?',
    options: [
      'It locks the entire map for every write operation',
      'It uses synchronized blocks on the whole table for reads',
      'It uses CAS and synchronized bin locks for fine-grained concurrency',
      'It throws ConcurrentModificationException on concurrent updates',
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    topic: 'Java Collections',
    question:
      'You iterate an ArrayList with an enhanced for-loop and call list.remove(index) inside the loop. What typically happens?',
    options: [
      'Elements are removed safely',
      'ConcurrentModificationException is thrown',
      'Only the last element can be removed',
      'The list becomes thread-safe automatically',
    ],
    correctAnswer: 1,
  },

  // Threads (3)
  {
    id: 4,
    topic: 'Java Threads',
    question:
      'Which guarantee does the volatile keyword provide in Java?',
    options: [
      'Atomic read-modify-write of long variables only',
      'Visibility of writes across threads and ordering constraints',
      'Mutual exclusion like synchronized',
      'Prevention of all race conditions',
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    topic: 'Java Threads',
    question:
      'What is the key difference between ExecutorService shutdown() and shutdownNow()?',
    options: [
      'shutdown() stops immediately; shutdownNow() waits for tasks',
      'shutdown() initiates orderly termination; shutdownNow() attempts to stop running tasks',
      'Both are identical in modern JDK versions',
      'shutdownNow() can only be used on fixed thread pools',
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    topic: 'Java Threads',
    question:
      'Which set of conditions is required for a deadlock to occur?',
    options: [
      'Mutual exclusion, hold and wait, no preemption, circular wait',
      'Race condition, starvation, priority inversion, livelock',
      'Synchronized methods only in nested calls',
      'Two threads accessing the same volatile variable',
    ],
    correctAnswer: 0,
  },

  // MySQL (5)
  {
    id: 7,
    topic: 'MySQL',
    question:
      'In EXPLAIN output, which access type generally indicates the worst performance for large tables?',
    options: ['const', 'ref', 'range', 'ALL (full table scan)'],
    correctAnswer: 3,
  },
  {
    id: 8,
    topic: 'MySQL',
    question:
      'Under InnoDB REPEATABLE READ (default), which phenomenon is prevented using MVCC and next-key locking?',
    options: ['Dirty reads only', 'Non-repeatable reads only', 'Phantom reads in many cases', 'Lost updates always'],
    correctAnswer: 2,
  },
  {
    id: 9,
    topic: 'MySQL',
    question:
      'You LEFT JOIN orders to customers. Which rows appear when a customer has no orders?',
    options: [
      'Customer row is excluded',
      'Customer row appears with NULL order columns',
      'MySQL throws an error',
      'Only the first order is returned',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    topic: 'MySQL',
    question:
      'A composite index exists on (last_name, first_name, city). Which query can use the index most effectively?',
    options: [
      'WHERE city = "Pune"',
      'WHERE first_name = "Asha"',
      'WHERE last_name = "Patil" AND first_name = "Asha"',
      'WHERE UPPER(last_name) = "PATIL"',
    ],
    correctAnswer: 2,
  },
  {
    id: 11,
    topic: 'MySQL',
    question:
      'How does InnoDB typically handle a deadlock between two transactions?',
    options: [
      'Both transactions are rolled back permanently',
      'It waits until one transaction times out after 30 minutes',
      'It detects the cycle and rolls back one transaction (victim)',
      'It locks the entire database until manual intervention',
    ],
    correctAnswer: 2,
  },

  // JDBC (3)
  {
    id: 12,
    topic: 'JDBC',
    question:
      'Why is PreparedStatement preferred over Statement for user-supplied input?',
    options: [
      'It compiles SQL only once per JVM lifetime',
      'It separates SQL structure from parameters, mitigating SQL injection',
      'It automatically creates indexes',
      'It disables transactions by default',
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    topic: 'JDBC',
    question:
      'A production app exhausts the connection pool under load. What is the most common root cause?',
    options: [
      'Using PreparedStatement instead of Statement',
      'Connections not closed in finally/try-with-resources',
      'SELECT queries without ORDER BY',
      'Using MySQL instead of PostgreSQL',
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    topic: 'JDBC',
    question:
      'Which JDBC API sets transaction isolation for a Connection?',
    options: [
      'Connection.setAutoCommit(false) only',
      'Connection.setTransactionIsolation(int level)',
      'Statement.setIsolationLevel()',
      'DriverManager.setIsolation()',
    ],
    correctAnswer: 1,
  },

  // Hibernate (3)
  {
    id: 15,
    topic: 'Hibernate',
    question:
      'What is the standard fix for the Hibernate N+1 select problem when loading entities with associations?',
    options: [
      'Disable lazy loading globally',
      'Use JOIN FETCH or entity graph in the query',
      'Replace Hibernate with JDBC only',
      'Set batch size to 1',
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    topic: 'Hibernate',
    question:
      'LazyInitializationException occurs when:',
    options: [
      'A lazy association is accessed outside an open persistence context/session',
      'Two entities have the same primary key',
      'A transaction is committed twice',
      'HQL syntax is invalid',
    ],
    correctAnswer: 0,
  },
  {
    id: 17,
    topic: 'Hibernate',
    question:
      'Which cache is enabled by default in a typical Hibernate setup?',
    options: [
      'Second-level cache for all entities',
      'Query cache for all queries',
      'First-level (session) cache only',
      'No caching at any level',
    ],
    correctAnswer: 2,
  },

  // Spring Boot (4)
  {
    id: 18,
    topic: 'Spring Boot',
    question:
      'Why does @Transactional often fail when called from another method in the same class?',
    options: [
      'Spring Boot disables transactions in development',
      'Self-invocation bypasses the Spring proxy (AOP limitation)',
      'Transactions work only on private methods',
      '@Transactional requires @RestController on the class',
    ],
    correctAnswer: 1,
  },
  {
    id: 19,
    topic: 'Spring Boot',
    question:
      'What does @ConditionalOnClass primarily control in Spring Boot auto-configuration?',
    options: [
      'Bean creation based on presence of classes on the classpath',
      'HTTP response status codes',
      'Database migration order',
      'CSS minification in production',
    ],
    correctAnswer: 0,
  },
  {
    id: 20,
    topic: 'Spring Boot',
    question:
      'How do Spring profiles (e.g. application-dev.yml) affect configuration?',
    options: [
      'They replace the JVM classpath entirely',
      'They load profile-specific properties when the profile is active',
      'They disable security automatically',
      'They can only be set in web.xml',
    ],
    correctAnswer: 1,
  },
  {
    id: 21,
    topic: 'Spring Boot',
    question:
      'Which annotation is commonly used for global REST exception handling in Spring Boot?',
    options: ['@ControllerAdvice / @RestControllerAdvice', '@Transactional', '@EnableWebMvc', '@Scheduled'],
    correctAnswer: 0,
  },

  // Spring Cloud (2)
  {
    id: 22,
    topic: 'Spring Cloud',
    question:
      'In a Eureka-based microservices setup, client-side load balancing typically means:',
    options: [
      'A hardware load balancer chooses instances before the request reaches the app',
      'The service consumer (e.g. Ribbon/LoadBalancer) chooses an instance from the registry',
      'Every service must have exactly one instance',
      'DNS round-robin replaces service discovery',
    ],
    correctAnswer: 1,
  },
  {
    id: 23,
    topic: 'Spring Cloud',
    question:
      'What is the main purpose of a circuit breaker (e.g. Resilience4j) in microservices?',
    options: [
      'Encrypt traffic between services',
      'Stop cascading failures by failing fast when a dependency is unhealthy',
      'Replace API Gateway routing',
      'Compile services into a monolith',
    ],
    correctAnswer: 1,
  },

  // HTML & CSS (5)
  {
    id: 24,
    topic: 'HTML/CSS',
    question:
      'Adjacent block elements with vertical margins sometimes collapse. Which scenario demonstrates margin collapse?',
    options: [
      'Two siblings with bottom and top margins combine into one margin',
      'Padding always collapses with border',
      'Flex items always collapse margins',
      'Inline elements collapse margins by default',
    ],
    correctAnswer: 0,
  },
  {
    id: 25,
    topic: 'HTML/CSS',
    question:
      'Which selector has the highest specificity?',
    options: [
      'div.card p',
      '.card p',
      'p#title.card',
      'p.card',
    ],
    correctAnswer: 2,
  },
  {
    id: 26,
    topic: 'HTML/CSS',
    question:
      'Why use <main>, <nav>, and <article> instead of only <div>?',
    options: [
      'They load faster than div',
      'They improve semantics and accessibility for assistive technologies',
      'They automatically apply CSS grid',
      'Browsers block <div> in HTML5',
    ],
    correctAnswer: 1,
  },
  {
    id: 27,
    topic: 'HTML/CSS',
    question:
      'In a flex container with flex-direction: row, align-items controls:',
    options: [
      'Horizontal distribution along the main axis',
      'Alignment along the cross axis (perpendicular to main axis)',
      'Z-index stacking order',
      'Font weight of children',
    ],
    correctAnswer: 1,
  },
  {
    id: 28,
    topic: 'HTML/CSS',
    question:
      'position: sticky keeps an element sticky until:',
    options: [
      'The viewport height changes only',
      'Its containing scroll ancestor boundary is reached',
      'Any parent has display: inline',
      'The element has float: left',
    ],
    correctAnswer: 1,
  },

  // JavaScript (5)
  {
    id: 29,
    topic: 'JavaScript',
    question:
      'A function inside another function remembers variables from the outer function after it returns. This is called:',
    options: ['Prototype chain', 'Closure', 'Hoisting', 'Currying only in TypeScript'],
    correctAnswer: 1,
  },
  {
    id: 30,
    topic: 'JavaScript',
    question:
      'After synchronous code runs, which typically executes first?',
    options: [
      'setTimeout callback (macrotask)',
      'Promise .then callback (microtask)',
      'requestAnimationFrame always before microtasks',
      'All timers before any promises',
    ],
    correctAnswer: 1,
  },
  {
    id: 31,
    topic: 'JavaScript',
    question:
      'What is the result of comparing 0 == false and 0 === false in JavaScript?',
    options: [
      'Both true',
      'Both false',
      '== is true, === is false',
      '== is false, === is true',
    ],
    correctAnswer: 2,
  },
  {
    id: 32,
    topic: 'JavaScript',
    question:
      'Which statement about let vs var in the same scope is correct?',
    options: [
      'var is block-scoped; let is function-scoped',
      'let is block-scoped; var is function-scoped (or global)',
      'Both are hoisted identically with the same TDZ rules',
      'let allows redeclaration in the same block',
    ],
    correctAnswer: 1,
  },
  {
    id: 33,
    topic: 'JavaScript',
    question:
      'How should errors from an async function be handled when using await?',
    options: [
      'Errors cannot be caught; use .then only',
      'Wrap await calls in try/catch or use .catch on the returned promise',
      'async functions never reject',
      'Only window.onerror works',
    ],
    correctAnswer: 1,
  },

  // jQuery (2)
  {
    id: 34,
    topic: 'jQuery',
    question:
      'Why is $(document).ready() used instead of running code at the top of the script?',
    options: [
      'It waits until the DOM is parsed before executing handlers',
      'It downloads jQuery from a CDN automatically',
      'It replaces defer on all script tags',
      'It prevents CORS errors',
    ],
    correctAnswer: 0,
  },
  {
    id: 35,
    topic: 'jQuery',
    question:
      'Event delegation with $(parent).on("click", ".child", handler) is useful because:',
    options: [
      'It only works for static elements created at page load',
      'It handles clicks on current and future matching descendants efficiently',
      'It disables bubbling permanently',
      'It requires React to be installed',
    ],
    correctAnswer: 1,
  },

  // React (5)
  {
    id: 36,
    topic: 'React',
    question:
      'You call setCount(count + 1) three times in one event handler without a functional update. What often happens?',
    options: [
      'Count increases by 3 always',
      'Count increases by 1 because state updates may batch using the same stale value',
      'React throws a hooks error',
      'The component unmounts',
    ],
    correctAnswer: 1,
  },
  {
    id: 37,
    topic: 'React',
    question:
      'useEffect(() => { ... }, []) runs the effect:',
    options: [
      'On every render',
      'Only once after the initial mount (empty dependency array)',
      'Only when props change but not state',
      'Before the component is created',
    ],
    correctAnswer: 1,
  },
  {
    id: 38,
    topic: 'React',
    question:
      'Why should list items have stable unique keys in React?',
    options: [
      'Keys are only for CSS styling',
      'Keys help React identify items across re-renders for efficient reconciliation',
      'Keys prevent all re-renders of parent components',
      'Keys are required only in class components',
    ],
    correctAnswer: 1,
  },
  {
    id: 39,
    topic: 'React',
    question:
      'A controlled input in React means:',
    options: [
      'The DOM owns the value; React never updates it',
      'React state is the single source of truth for the input value',
      'The input cannot use onChange',
      'Only <textarea> can be controlled',
    ],
    correctAnswer: 1,
  },
  {
    id: 40,
    topic: 'React',
    question:
      'When is React.memo most appropriate?',
    options: [
      'To memoize expensive calculations inside a component',
      'To skip re-rendering a component when props are shallowly equal',
      'To replace useState entirely',
      'To fix incorrect keys in lists',
    ],
    correctAnswer: 1,
  },

  // Frontend ↔ Backend APIs & real-time troubleshooting (5)
  {
    id: 41,
    topic: 'API Integration',
    question:
      'A browser blocks a cross-origin POST with custom headers. What usually happens first?',
    options: [
      'The server returns 500',
      'The browser sends an OPTIONS preflight request',
      'JWT is automatically refreshed',
      'WebSocket replaces HTTP',
    ],
    correctAnswer: 1,
  },
  {
    id: 42,
    topic: 'API Integration',
    question:
      'HTTP 401 Unauthorized typically means:',
    options: [
      'The user is authenticated but lacks permission',
      'Authentication is missing or invalid',
      'The server is down',
      'The request body is too large',
    ],
    correctAnswer: 1,
  },
  {
    id: 43,
    topic: 'API Integration',
    question:
      'Storing JWT in httpOnly cookies (with secure flags) is often preferred over localStorage because:',
    options: [
      'Cookies cannot be sent to the server',
      'It reduces exposure to XSS stealing the token via JavaScript',
      'localStorage encrypts tokens automatically',
      'Cookies disable CORS entirely',
    ],
    correctAnswer: 1,
  },
  {
    id: 44,
    topic: 'API Integration',
    question:
      'For real-time chat updates, WebSockets are often chosen over short polling because:',
    options: [
      'WebSockets use more HTTP requests per message',
      'WebSockets maintain a persistent bidirectional connection with lower overhead',
      'Polling cannot work behind load balancers',
      'WebSockets do not require server support',
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    topic: 'API Integration',
    question:
      'A client retries a POST after a network timeout and creates duplicate orders. Best practice:',
    options: [
      'Disable retries for all APIs',
      'Use idempotency keys or idempotent server-side handling for safe retries',
      'Switch POST to GET',
      'Store duplicates in localStorage only',
    ],
    correctAnswer: 1,
  },
];

export function getRecruitmentExamQuestions() {
  return recruitmentQuestions.slice(0, TOTAL_QUESTIONS);
}
