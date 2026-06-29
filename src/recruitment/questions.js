/** Static recruitment exam question set (fixed order). */

export const recruitmentQuestions = [
  {
    id: 1,
    question: 'Which keyword is used to inherit a class in Java?',
    options: ['implements', 'extends', 'inherits', 'super'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What is the default value of a boolean variable in Java?',
    options: ['true', 'false', 'null', '0'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Which collection does not allow duplicate elements?',
    options: ['List', 'Set', 'Map', 'Queue'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'Which HTTP method is typically used to create a new resource in REST APIs?',
    options: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'In SQL, which clause is used to filter rows?',
    options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: 'What does JVM stand for?',
    options: [
      'Java Virtual Machine',
      'Java Version Manager',
      'Joint Variable Method',
      'Java Visual Module',
    ],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: 'Which Spring annotation marks a class as a REST controller?',
    options: ['@Service', '@Repository', '@RestController', '@Component'],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: 'Which access modifier provides visibility only within the same package?',
    options: ['private', 'protected', 'default (package-private)', 'public'],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: 'What is the purpose of the finally block in Java?',
    options: [
      'Handle compile-time errors',
      'Always execute cleanup code',
      'Create threads',
      'Define interfaces',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: 'Which data structure follows FIFO order?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: 'In Git, which command creates a new branch and switches to it?',
    options: ['git merge', 'git checkout -b', 'git pull', 'git stash'],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: 'Which HTML tag is used for the largest heading?',
    options: ['<h6>', '<h1>', '<head>', '<header>'],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: 'What is dependency injection primarily used for in Spring?',
    options: [
      'Loose coupling and testability',
      'Faster CPU execution',
      'Database indexing',
      'CSS styling',
    ],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: 'Which Java keyword prevents a class from being subclassed?',
    options: ['static', 'final', 'abstract', 'volatile'],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: 'What does API stand for?',
    options: [
      'Application Programming Interface',
      'Advanced Program Integration',
      'Automated Process Instance',
      'Application Process Index',
    ],
    correctAnswer: 0,
  },
];

export function getRecruitmentExamQuestions() {
  return recruitmentQuestions.slice(0, 15);
}
