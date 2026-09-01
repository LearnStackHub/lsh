import { TOTAL_QUESTIONS } from './config';

/** Assessment L1 question set — intern / fresher basics (paper 2). */

export const recruitmentQuestions = [
  // Java Collections (3)
  {
    id: 1,
    topic: 'Java Collections',
    question: 'Which List implementation is usually the default choice for a simple ordered list in Java?',
    options: ['HashMap', 'ArrayList', 'TreeSet', 'Hashtable'],
    correctAnswer: 1,
  },
  {
    id: 2,
    topic: 'Java Collections',
    question: 'What happens if you add the same value twice to a HashSet?',
    options: [
      'Both copies are stored',
      'An exception is thrown',
      'Only one copy is kept',
      'The set becomes a List',
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    topic: 'Java Collections',
    question: 'Which method is used to get a value from a HashMap using its key?',
    options: ['get(key)', 'fetch(key)', 'find(key)', 'read(key)'],
    correctAnswer: 0,
  },

  // Threads (3)
  {
    id: 4,
    topic: 'Java Threads',
    question: 'Which method should you call to start a new thread of execution?',
    options: ['run()', 'start()', 'executeNow()', 'begin()'],
    correctAnswer: 1,
  },
  {
    id: 5,
    topic: 'Java Threads',
    question: 'What does Thread.sleep(1000) do?',
    options: [
      'Stops the JVM permanently',
      'Pauses the current thread for about 1 second',
      'Deletes the thread object',
      'Speeds up the thread',
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    topic: 'Java Threads',
    question: 'Which interface is commonly implemented to create a task that can run on a thread?',
    options: ['Serializable', 'Comparable', 'Runnable', 'Cloneable'],
    correctAnswer: 2,
  },

  // MySQL (5)
  {
    id: 7,
    topic: 'MySQL',
    question: 'Which command adds a new row into a table?',
    options: ['SELECT', 'INSERT', 'ALTER', 'DROP'],
    correctAnswer: 1,
  },
  {
    id: 8,
    topic: 'MySQL',
    question: 'Which clause sorts the result of a query?',
    options: ['WHERE', 'ORDER BY', 'FROM', 'LIMIT'],
    correctAnswer: 1,
  },
  {
    id: 9,
    topic: 'MySQL',
    question: 'INNER JOIN returns rows when:',
    options: [
      'There is a match in both tables',
      'There is no match in either table',
      'Only the left table has data',
      'The tables have different column names',
    ],
    correctAnswer: 0,
  },
  {
    id: 10,
    topic: 'MySQL',
    question: 'Which SQL command changes existing data in a table?',
    options: ['UPDATE', 'CREATE', 'SELECT', 'GRANT'],
    correctAnswer: 0,
  },
  {
    id: 11,
    topic: 'MySQL',
    question: 'What does COUNT(*) return?',
    options: [
      'The number of columns in a table',
      'The number of rows matching the query',
      'The size of the database file',
      'The number of indexes only',
    ],
    correctAnswer: 1,
  },

  // JDBC (3)
  {
    id: 12,
    topic: 'JDBC',
    question: 'Which class is commonly used to obtain a JDBC Connection?',
    options: ['DriverManager', 'FileReader', 'Scanner', 'HttpURLConnection'],
    correctAnswer: 0,
  },
  {
    id: 13,
    topic: 'JDBC',
    question: 'executeUpdate() is typically used for:',
    options: [
      'SELECT queries only',
      'INSERT, UPDATE, and DELETE statements',
      'Opening the browser',
      'Compiling Java code',
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    topic: 'JDBC',
    question: 'Why should a JDBC Connection be closed after use?',
    options: [
      'To change the table name',
      'To free database resources and return the connection',
      'To print SQL on the screen',
      'To create a new database automatically',
    ],
    correctAnswer: 1,
  },

  // Spring Boot (4)
  {
    id: 15,
    topic: 'Spring Boot',
    question: 'Which annotation marks the main class of a Spring Boot application?',
    options: ['@SpringBootApplication', '@Entity', '@Bean', '@Override'],
    correctAnswer: 0,
  },
  {
    id: 16,
    topic: 'Spring Boot',
    question: 'Which annotation maps an HTTP GET request to a controller method?',
    options: ['@GetMapping', '@PostMapping', '@DeleteMapping', '@PutMapping'],
    correctAnswer: 0,
  },
  {
    id: 17,
    topic: 'Spring Boot',
    question: 'What is the default HTTP port of a Spring Boot web app if you do not change it?',
    options: ['3000', '8080', '3306', '443'],
    correctAnswer: 1,
  },
  {
    id: 18,
    topic: 'Spring Boot',
    question: 'Which annotation is commonly used on a class that talks to the database?',
    options: ['@ControllerAdvice', '@Repository', '@ConfigurationProperties', '@Scheduled'],
    correctAnswer: 1,
  },

  // HTML & CSS (5)
  {
    id: 19,
    topic: 'HTML/CSS',
    question: 'Which tag is used to display an image on a web page?',
    options: ['<img>', '<pic>', '<image>', '<src>'],
    correctAnswer: 0,
  },
  {
    id: 20,
    topic: 'HTML/CSS',
    question: 'Which CSS property changes the space outside an element’s border?',
    options: ['padding', 'margin', 'font-size', 'color'],
    correctAnswer: 1,
  },
  {
    id: 21,
    topic: 'HTML/CSS',
    question: 'Which input type should be used for an email field in a form?',
    options: ['type="text" only', 'type="email"', 'type="password"', 'type="number"'],
    correctAnswer: 1,
  },
  {
    id: 22,
    topic: 'HTML/CSS',
    question: 'In CSS, a class selector starts with:',
    options: ['#', '.', '@', '$'],
    correctAnswer: 1,
  },
  {
    id: 23,
    topic: 'HTML/CSS',
    question: 'Which tag creates a numbered list?',
    options: ['<ul>', '<ol>', '<dl>', '<list>'],
    correctAnswer: 1,
  },

  // JavaScript (5)
  {
    id: 24,
    topic: 'JavaScript',
    question: 'Which keyword declares a constant that cannot be reassigned?',
    options: ['let', 'var', 'const', 'static'],
    correctAnswer: 2,
  },
  {
    id: 25,
    topic: 'JavaScript',
    question: 'What does array.pop() do?',
    options: [
      'Adds an item at the start',
      'Removes the last item and returns it',
      'Sorts the array',
      'Converts the array to a string',
    ],
    correctAnswer: 1,
  },
  {
    id: 26,
    topic: 'JavaScript',
    question: 'Which value is treated as falsy in JavaScript?',
    options: ['"0"', '[]', '0', '{}'],
    correctAnswer: 2,
  },
  {
    id: 27,
    topic: 'JavaScript',
    question: 'What does JSON.stringify() do?',
    options: [
      'Converts a JavaScript object into a JSON string',
      'Parses HTML',
      'Connects to MySQL',
      'Creates a new array',
    ],
    correctAnswer: 0,
  },
  {
    id: 28,
    topic: 'JavaScript',
    question: 'Which method selects an HTML element by its id?',
    options: [
      'document.getElementByClass',
      'document.getElementById',
      'document.queryAll',
      'window.findId',
    ],
    correctAnswer: 1,
  },

  // React (5)
  {
    id: 29,
    topic: 'React',
    question: 'In React, a function that returns JSX is commonly called a:',
    options: ['controller', 'component', 'servlet', 'trigger'],
    correctAnswer: 1,
  },
  {
    id: 30,
    topic: 'React',
    question: 'How do you pass data from a parent component to a child component?',
    options: ['Using props', 'Using SQL', 'Using CSS only', 'Using package.json'],
    correctAnswer: 0,
  },
  {
    id: 31,
    topic: 'React',
    question: 'What should you use to update state based on the previous count value?',
    options: [
      'count = count + 1',
      'setCount((prev) => prev + 1)',
      'this.count++',
      'document.count++',
    ],
    correctAnswer: 1,
  },
  {
    id: 32,
    topic: 'React',
    question: 'Which attribute is used in JSX instead of the HTML class attribute?',
    options: ['class', 'className', 'css', 'styleName'],
    correctAnswer: 1,
  },
  {
    id: 33,
    topic: 'React',
    question: 'What does useEffect help you do?',
    options: [
      'Create CSS files',
      'Run side effects such as fetching data after render',
      'Replace HTML forms',
      'Compile Java code',
    ],
    correctAnswer: 1,
  },

  // Aptitude / logical reasoning (6)
  {
    id: 34,
    topic: 'Aptitude / Logical Reasoning',
    question: 'Find the next number: 3, 9, 27, 81, ?',
    options: ['162', '243', '108', '324'],
    correctAnswer: 1,
  },
  {
    id: 35,
    topic: 'Aptitude / Logical Reasoning',
    question: 'If 15% of a number is 45, what is the number?',
    options: ['250', '300', '350', '400'],
    correctAnswer: 1,
  },
  {
    id: 36,
    topic: 'Aptitude / Logical Reasoning',
    question: 'A shopkeeper buys a pen for ₹80 and sells it for ₹100. What is the profit percentage?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 2,
  },
  {
    id: 37,
    topic: 'Aptitude / Logical Reasoning',
    question: 'If CAT is written as DBU, how is DOG written in the same way? (each letter +1)',
    options: ['EPH', 'CNF', 'DPH', 'EPG'],
    correctAnswer: 0,
  },
  {
    id: 38,
    topic: 'Aptitude / Logical Reasoning',
    question: 'Odd one out: Java, Python, MySQL, JavaScript',
    options: ['Java', 'Python', 'MySQL', 'JavaScript'],
    correctAnswer: 2,
  },
  {
    id: 39,
    topic: 'Aptitude / Logical Reasoning',
    question: 'In a queue, Priya is 5th from the front and 8th from the back. How many people are in the queue?',
    options: ['11', '12', '13', '14'],
    correctAnswer: 1,
  },

  // Problem solving & debugging (6)
  {
    id: 40,
    topic: 'Problem Solving & Debugging',
    question:
      'This Java code always prints Done even when flag is false: if (flag == true); { System.out.println("Done"); } What is the bug?',
    options: [
      'println cannot be used in if',
      'The extra semicolon after if ends the if, so the block always runs',
      'flag cannot be boolean',
      'System.out is not allowed',
    ],
    correctAnswer: 1,
  },
  {
    id: 41,
    topic: 'Problem Solving & Debugging',
    question:
      'A Java loop for (int i = 0; i < names.length; i++) prints names[i + 1] and crashes on the last item. Why?',
    options: [
      'length is always 0',
      'i + 1 goes past the last valid index',
      'for loops cannot use arrays',
      'names must be a HashMap',
    ],
    correctAnswer: 1,
  },
  {
    id: 42,
    topic: 'Problem Solving & Debugging',
    question:
      'SELECT * FROM users WHERE age = "25" returns no rows, but age 25 exists. The column type is INT. What is the best first check?',
    options: [
      'Change the table name',
      'Compare with a number: WHERE age = 25, and confirm stored values',
      'Add ORDER BY age',
      'Use DELETE instead of SELECT',
    ],
    correctAnswer: 1,
  },
  {
    id: 43,
    topic: 'Problem Solving & Debugging',
    question:
      'In JavaScript, console.log(1 + "2") prints "12". Why?',
    options: [
      'JavaScript cannot add numbers',
      'The number 1 is converted to a string and concatenated',
      '+ always subtracts in JavaScript',
      'console.log rounds values',
    ],
    correctAnswer: 1,
  },
  {
    id: 44,
    topic: 'Problem Solving & Debugging',
    question:
      'A React counter button does not update the screen: function handleClick() { count = count + 1; }. What is the fix?',
    options: [
      'Use alert(count)',
      'Update through setCount so React re-renders',
      'Rename the function',
      'Add a CSS animation',
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    topic: 'Problem Solving & Debugging',
    question:
      'try { Integer.parseInt("abc"); } catch (Exception e) { } swallows the error and the app looks frozen. What is a better intern habit?',
    options: [
      'Never use try/catch',
      'Log the exception and show a clear error to the user',
      'Restart the computer',
      'Change the file extension to .txt',
    ],
    correctAnswer: 1,
  },
];

export function getRecruitmentExamQuestions() {
  return recruitmentQuestions.slice(0, TOTAL_QUESTIONS);
}
