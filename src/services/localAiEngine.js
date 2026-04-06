/**
 * Practice Lab — interview question banks and local coach hints only.
 * Chat at /ai-lab/chat uses Ollama Cloud from the browser (see AiChat.jsx).
 */

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
