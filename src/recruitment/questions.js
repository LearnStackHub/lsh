import { TOTAL_QUESTIONS } from './config';

/** Assessment L1 question set — intern / fresher basics. */

export const recruitmentQuestions = [
  // Java Collections (3)
  {
    id: 1,
    topic: 'Java Collections',
    question: 'Which collection stores unique elements only (no duplicates)?',
    options: ['ArrayList', 'LinkedList', 'HashSet', 'Stack'],
    correctAnswer: 2,
  },
  {
    id: 2,
    topic: 'Java Collections',
    question: 'Which collection stores data as key–value pairs?',
    options: ['ArrayList', 'HashMap', 'HashSet', 'Queue'],
    correctAnswer: 1,
  },
  {
    id: 3,
    topic: 'Java Collections',
    question: 'Which statement about ArrayList is correct?',
    options: [
      'It has a fixed size like an array',
      'It can grow dynamically and allows duplicate values',
      'It stores only unique keys',
      'It cannot store String values',
    ],
    correctAnswer: 1,
  },

  // Threads (3)
  {
    id: 4,
    topic: 'Java Threads',
    question: 'What does the Thread.start() method do?',
    options: [
      'It only calls run() in the same thread',
      'It creates a new thread and then executes run()',
      'It stops the current thread',
      'It compiles the Java file',
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    topic: 'Java Threads',
    question: 'Which keyword is used to make a method thread-safe by allowing only one thread at a time?',
    options: ['volatile', 'transient', 'synchronized', 'static'],
    correctAnswer: 2,
  },
  {
    id: 6,
    topic: 'Java Threads',
    question: 'What is a deadlock?',
    options: [
      'When a thread finishes too quickly',
      'When two or more threads wait for each other forever',
      'When a program has no threads',
      'When sleep() is called once',
    ],
    correctAnswer: 1,
  },

  // MySQL (5)
  {
    id: 7,
    topic: 'MySQL',
    question: 'Which SQL command is used to fetch data from a table?',
    options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
    correctAnswer: 2,
  },
  {
    id: 8,
    topic: 'MySQL',
    question: 'What does a PRIMARY KEY do?',
    options: [
      'Allows duplicate rows',
      'Uniquely identifies each row and cannot be NULL',
      'Stores only numbers',
      'Deletes a table automatically',
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    topic: 'MySQL',
    question: 'Which JOIN returns all rows from the left table and matching rows from the right table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctAnswer: 1,
  },
  {
    id: 10,
    topic: 'MySQL',
    question: 'What is the purpose of an INDEX in MySQL?',
    options: [
      'To print the table',
      'To speed up searches on a column',
      'To delete duplicate rows automatically',
      'To change the table name',
    ],
    correctAnswer: 1,
  },
  {
    id: 11,
    topic: 'MySQL',
    question: 'Which clause is used to filter rows in a SELECT query?',
    options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING only'],
    correctAnswer: 2,
  },

  // JDBC (3)
  {
    id: 12,
    topic: 'JDBC',
    question: 'What is JDBC used for?',
    options: [
      'To style HTML pages',
      'To connect a Java application to a database',
      'To compile Java files',
      'To create React components',
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    topic: 'JDBC',
    question: 'Why is PreparedStatement preferred over Statement?',
    options: [
      'It is slower always',
      'It helps prevent SQL injection and can reuse SQL',
      'It cannot take parameters',
      'It is used only for DELETE queries',
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    topic: 'JDBC',
    question: 'Which JDBC method is commonly used to run a SELECT query?',
    options: ['executeUpdate()', 'executeQuery()', 'commit() only', 'close()'],
    correctAnswer: 1,
  },

  // Spring Boot (4)
  {
    id: 15,
    topic: 'Spring Boot',
    question: 'What is the main advantage of Spring Boot?',
    options: [
      'It removes the need to write Java',
      'It helps create stand-alone applications quickly with auto-configuration',
      'It is used only for Android apps',
      'It replaces MySQL',
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    topic: 'Spring Boot',
    question: 'Which annotation is used to create a REST API controller in Spring Boot?',
    options: ['@Entity', '@RestController', '@Repository', '@ComponentScan only'],
    correctAnswer: 1,
  },
  {
    id: 17,
    topic: 'Spring Boot',
    question: 'Where are common Spring Boot settings like port and database URL stored?',
    options: [
      'index.html',
      'application.properties or application.yml',
      'package.json',
      'style.css',
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    topic: 'Spring Boot',
    question: 'What does @Autowired do?',
    options: [
      'Creates a database table',
      'Injects a required bean/dependency automatically',
      'Starts the browser',
      'Compiles CSS',
    ],
    correctAnswer: 1,
  },

  // HTML & CSS (5)
  {
    id: 19,
    topic: 'HTML/CSS',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<p>', '<a>', '<link-text>', '<img>'],
    correctAnswer: 1,
  },
  {
    id: 20,
    topic: 'HTML/CSS',
    question: 'Which CSS property changes the text color?',
    options: ['font-size', 'background-color', 'color', 'margin'],
    correctAnswer: 2,
  },
  {
    id: 21,
    topic: 'HTML/CSS',
    question: 'What is the correct HTML tag for the largest heading?',
    options: ['<h6>', '<heading>', '<h1>', '<head>'],
    correctAnswer: 2,
  },
  {
    id: 22,
    topic: 'HTML/CSS',
    question: 'In CSS Flexbox, which property is set on the container to place items in a row or column?',
    options: ['align-items', 'flex-direction', 'font-weight', 'z-index'],
    correctAnswer: 1,
  },
  {
    id: 23,
    topic: 'HTML/CSS',
    question: 'What does the HTML <form> tag do?',
    options: [
      'Plays a video',
      'Collects user input to send to a server',
      'Creates a database',
      'Defines a CSS class',
    ],
    correctAnswer: 1,
  },

  // JavaScript (5)
  {
    id: 24,
    topic: 'JavaScript',
    question: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
    options: ['var only', 'let', 'int', 'define'],
    correctAnswer: 1,
  },
  {
    id: 25,
    topic: 'JavaScript',
    question: 'What is the result of typeof "Hello"?',
    options: ['number', 'object', 'string', 'boolean'],
    correctAnswer: 2,
  },
  {
    id: 26,
    topic: 'JavaScript',
    question: 'Which operator checks both value and type (strict equality)?',
    options: ['==', '=', '===', '!='],
    correctAnswer: 2,
  },
  {
    id: 27,
    topic: 'JavaScript',
    question: 'What does JSON.parse() do?',
    options: [
      'Converts a JSON string into a JavaScript object',
      'Converts an object into HTML',
      'Deletes a file',
      'Connects to MySQL',
    ],
    correctAnswer: 0,
  },
  {
    id: 28,
    topic: 'JavaScript',
    question: 'Which method is used to add an item at the end of an array?',
    options: ['pop()', 'push()', 'shift()', 'slice()'],
    correctAnswer: 1,
  },

  // React (5)
  {
    id: 29,
    topic: 'React',
    question: 'What is React mainly used to build?',
    options: ['Database tables', 'User interfaces (UI) for web apps', 'Operating systems', 'MySQL queries'],
    correctAnswer: 1,
  },
  {
    id: 30,
    topic: 'React',
    question: 'Which hook is used to store state in a function component?',
    options: ['useEffect', 'useState', 'useContext only', 'useRef only'],
    correctAnswer: 1,
  },
  {
    id: 31,
    topic: 'React',
    question: 'Why do we use keys in a React list?',
    options: [
      'To style the list with CSS',
      'To help React identify each item uniquely while updating the UI',
      'To connect to the database',
      'To create a new server',
    ],
    correctAnswer: 1,
  },
  {
    id: 32,
    topic: 'React',
    question: 'What does JSX allow you to write?',
    options: [
      'SQL inside CSS',
      'HTML-like code inside JavaScript',
      'Only Python code',
      'Binary machine code',
    ],
    correctAnswer: 1,
  },
  {
    id: 33,
    topic: 'React',
    question: 'useEffect(() => { ... }, []) runs:',
    options: [
      'On every key press only',
      'Once after the component first loads (mounts)',
      'Before the file is saved',
      'Only when CSS changes',
    ],
    correctAnswer: 1,
  },

  // Aptitude / logical reasoning (6)
  {
    id: 34,
    topic: 'Aptitude / Logical Reasoning',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '48'],
    correctAnswer: 2,
  },
  {
    id: 35,
    topic: 'Aptitude / Logical Reasoning',
    question: 'If RAM is 4th from the left in a row of 10 students, what is RAM’s position from the right?',
    options: ['4th', '6th', '7th', '8th'],
    correctAnswer: 2,
  },
  {
    id: 36,
    topic: 'Aptitude / Logical Reasoning',
    question: 'A train covers 120 km in 2 hours. What is its average speed?',
    options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
    correctAnswer: 2,
  },
  {
    id: 37,
    topic: 'Aptitude / Logical Reasoning',
    question: 'If CODING is written as DPEJOH, how is LOGIC written in the same way? (each letter +1)',
    options: ['MPHJD', 'KNFHB', 'MPHJC', 'NQHKE'],
    correctAnswer: 0,
  },
  {
    id: 38,
    topic: 'Aptitude / Logical Reasoning',
    question: 'Odd one out: Keyboard, Mouse, Monitor, Compiler',
    options: ['Keyboard', 'Mouse', 'Monitor', 'Compiler'],
    correctAnswer: 3,
  },
  {
    id: 39,
    topic: 'Aptitude / Logical Reasoning',
    question: 'A is taller than B. C is shorter than B. D is taller than A. Who is the tallest?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 3,
  },

  // Problem solving & debugging (6)
  {
    id: 40,
    topic: 'Problem Solving & Debugging',
    question:
      'This Java loop is meant to print numbers 1 to 5, but it never stops: for (int i = 1; i <= 5; i--) { System.out.println(i); } What is the bug?',
    options: [
      'println cannot print numbers',
      'i-- decreases i, so the loop never reaches 6 and never ends',
      'The loop should use while instead of for',
      'int cannot start from 1',
    ],
    correctAnswer: 1,
  },
  {
    id: 41,
    topic: 'Problem Solving & Debugging',
    question:
      'String a = new String("hi"); String b = new String("hi"); Why is (a == b) false but a.equals(b) true?',
    options: [
      'equals() always returns false for strings',
      '== compares object references; equals() compares the text content',
      'new String() is not allowed in Java',
      '== compares content and equals() compares memory only',
    ],
    correctAnswer: 1,
  },
  {
    id: 42,
    topic: 'Problem Solving & Debugging',
    question:
      'A program crashes with NullPointerException on user.getName(). What is the most likely cause?',
    options: [
      'The database table name is too long',
      'user is null, so a method is called on a null object',
      'getName() cannot return a String',
      'The CSS file is missing',
    ],
    correctAnswer: 1,
  },
  {
    id: 43,
    topic: 'Problem Solving & Debugging',
    question:
      'An intern runs DELETE FROM employees; and all rows disappear. What was missing?',
    options: [
      'ORDER BY clause',
      'A WHERE clause to delete only specific rows',
      'JOIN clause',
      'INDEX on every column',
    ],
    correctAnswer: 1,
  },
  {
    id: 44,
    topic: 'Problem Solving & Debugging',
    question:
      'int[] nums = {10, 20, 30}; System.out.println(nums[3]); What happens and why?',
    options: [
      'It prints 30',
      'ArrayIndexOutOfBoundsException because valid indexes are 0, 1, and 2',
      'It prints 0',
      'It prints 10',
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    topic: 'Problem Solving & Debugging',
    question:
      'A function is supposed to return the sum of two numbers but always returns undefined in JavaScript: function add(a, b) { a + b; } What is the fix?',
    options: [
      'Rename the function to sum',
      'Add return: return a + b;',
      'Change + to -',
      'Use a CSS class',
    ],
    correctAnswer: 1,
  },
];

export function getRecruitmentExamQuestions() {
  return recruitmentQuestions.slice(0, TOTAL_QUESTIONS);
}
