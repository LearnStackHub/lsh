import { TOTAL_QUESTIONS } from './config';

/** 60 medium intern MCQs (plain + some program snippets); exam picks 45 at random; options shuffled per question. */

export const QUESTION_BANK_SIZE = 60;

export const recruitmentQuestions = [
  // Software Engineering (10)
  {
    id: 1,
    topic: 'Software Engineering',
    question:
      'How many if decision points appear in the code below?\n\nProgram:\nif (a > 0) { if (b > 0) x++; else x--; } else x = 0;',
    options: ['Four if statements', 'One if decision point only', 'Two if decision points (outer and inner if)', 'Zero; there are no conditionals'],
    correctAnswer: 2,
  },
  {
    id: 2,
    topic: 'Software Engineering',
    question:
      'Encapsulation hides state behind methods. What is the output of the following program?\n\nProgram:\nclass W { private int n; void inc(){ n++; } int get(){ return n; } }\nW w = new W(); w.inc(); w.inc(); System.out.print(w.get());',
    options: ['Prints 0 because n is private', 'Prints 2 via get() after two inc() calls', 'Compile error: cannot call inc()', 'Prints null because n is not initialized'],
    correctAnswer: 1,
  },
  {
    id: 3,
    topic: 'Software Engineering',
    question:
      'The same validateEmail() logic is copy-pasted in Controller and Service. Before adding a third copy, what is the best refactor?',
    options: ['Comment out validation in production builds only', 'Store emails unvalidated to reduce duplicate code', 'Move validateEmail() to one shared module both layers call', 'Delete the Service layer so only Controller validates'],
    correctAnswer: 2,
  },
  {
    id: 4,
    topic: 'Software Engineering',
    question:
      'What behavior does this unit test design verify?\n\nProgram:\nassert divide(10,2) == 5;\nassert throws( () -> divide(1,0) );',
    options: ['Network timeout to the payment gateway', 'Database index usage on a full table scan', 'UI layout pixels on the login page', 'Normal division and error when divisor is zero'],
    correctAnswer: 3,
  },
  {
    id: 5,
    topic: 'Software Engineering',
    question:
      'What problem does this design have, and what is a reasonable fix?\n\nProgram:\nclass OrderService {\n  void notify() {\n    new SmtpMailer().send();\n  }\n}',
    options: ['High coupling; inject Mailer interface instead of new SmtpMailer()', 'No problem; new inside method is always best practice', 'Fix by copying SmtpMailer code into OrderService', 'Fix by removing notify() and emailing manually'],
    correctAnswer: 0,
  },
  {
    id: 6,
    topic: 'Software Engineering',
    question:
      'The team finishes the login API in sprint 1 and demos it to stakeholders. What is the main benefit of that demo?',
    options: ['Proof that documentation is never needed again', 'Guarantee that scope cannot change for 12 months', 'Replace all automated tests with the demo only', 'Feedback early so next sprint can adjust priorities'],
    correctAnswer: 3,
  },
  {
    id: 7,
    topic: 'Software Engineering',
    question:
      'If userInput is 1 OR 1=1 --, what is the risk?\n\nProgram:\nquery = "SELECT * FROM users WHERE id=" + userInput;',
    options: ['Only CSS on the page will break', 'Git history will be deleted automatically', 'Query may return extra rows; attacker alters SQL logic', 'Compiler error because + cannot concat strings'],
    correctAnswer: 2,
  },
  {
    id: 8,
    topic: 'Software Engineering',
    question:
      'Repository layer talks to DB; Service holds business rules.\nWhich call chain fits layered design?',
    options: ['Browser → SQL → Service → Git', 'Controller → Service → Repository → Database', 'Database → HTML → Controller → Browser', 'Repository → Controller → Service → SMTP'],
    correctAnswer: 1,
  },
  {
    id: 9,
    topic: 'Software Engineering',
    question:
      'Testable requirement has clear pass/fail criteria.\nWhich story is most testable automatically?',
    options: ['Team morale should stay high every sprint', 'App should feel fast and modern to users', 'Reset link expires in 15 minutes after email is sent', 'Design should look premium and minimal'],
    correctAnswer: 2,
  },
  {
    id: 10,
    topic: 'Software Engineering',
    question:
      'A developer opens a pull request, CI runs tests, and a peer reviews the diff. What is the main purpose of that review before merge?',
    options: ['Skip CI because human review replaces all tests', 'Force push to main without reading the diff', 'Delete remote branches after every commit', 'Catch defects and design issues before shared branch merge'],
    correctAnswer: 3,
  },

  // Web Development (10)
  {
    id: 11,
    topic: 'Web Development',
    question:
      'What happens when this runs in the browser console?\n\nProgram:\nlet el = document.getElementById("title");\nel.textContent = "Hello";',
    options: ['CSS files are recompiled on the server', 'A new HTTP GET is sent for every character', 'The element with id title shows text Hello', 'The entire DOM tree is deleted from memory'],
    correctAnswer: 2,
  },
  {
    id: 12,
    topic: 'Web Development',
    question:
      '=== checks value and type. What is the output of the following program?\n\nProgram:\nconsole.log(5 == "5", 5 === "5");',
    options: ['false false', 'true false', 'false true', 'true true'],
    correctAnswer: 1,
  },
  {
    id: 13,
    topic: 'Web Development',
    question:
      'What is the order of console output (event loop)?\n\nProgram:\nconsole.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");',
    options: ['A C B', 'A B C', 'B A C', 'C B A'],
    correctAnswer: 0,
  },
  {
    id: 14,
    topic: 'Web Development',
    question:
      'What does await r.json() do?\n\nProgram:\nasync function load() {\nlet r = await fetch("/api/x");\nlet j = await r.json();\nreturn j.id;\n}',
    options: ['Sends JSON to the server without a request body', 'Closes the browser tab if status is 404', 'Compiles TypeScript to Java bytecode', 'Parses response body as JSON into a JavaScript value'],
    correctAnswer: 3,
  },
  {
    id: 15,
    topic: 'Web Development',
    question:
      'Total layout width of .box?\n\nProgram:\n* { box-sizing: border-box; } .box { width: 100px; padding: 10px; }',
    options: ['80px because padding subtracts from content only', '0px until JavaScript sets inline style', 'About 100px including padding inside the width', '120px because padding always adds outside width'],
    correctAnswer: 2,
  },
  {
    id: 16,
    topic: 'Web Development',
    question:
      'If userComment is <img src=x onerror=alert(1)>, risk?\n\nProgram:\ndiv.innerHTML = userComment;',
    options: ['HTTPS certificate expires immediately', 'Script may run in victim browser via injected markup', 'Only the image file size increases on disk', 'SQL primary key will duplicate automatically'],
    correctAnswer: 1,
  },
  {
    id: 17,
    topic: 'Web Development',
    question:
      'REST — GET should not change server state.\nClient sends GET /users/5/delete to remove user.\nWhy is this a design smell?',
    options: ['GET should be safe/idempotent; use DELETE or POST with intent', 'GET cannot include number 5 in the URL path', 'Browsers block all GET requests to APIs', 'JSON cannot be returned on GET responses'],
    correctAnswer: 0,
  },
  {
    id: 18,
    topic: 'Web Development',
    question:
      'After one click, the handler below runs setN twice but n is often still 0. Why?\n\nProgram:\nconst [n, setN] = useState(0);\nsetN(n + 1);\nsetN(n + 1);',
    options: ['useState forbids more than one setN per event', 'React deletes state on second setN call', 'Hooks only work in class components', 'Both updates use same stale n; batch uses one increment'],
    correctAnswer: 3,
  },
  {
    id: 19,
    topic: 'Web Development',
    question:
      'HTTP status codes.\nServer responds 404 for GET /missing-page.\nMeaning for the client?',
    options: ['Payment completed and invoice is ready', 'Client must send cookies in CSS file', 'Requested resource was not found on the server', 'Server crashed and must be rebooted'],
    correctAnswer: 2,
  },
  {
    id: 20,
    topic: 'Web Development',
    question:
      'For <form method="POST" action="/register">, what does the browser typically do on submit?',
    options: ['Converts form to WebSocket permanently', 'Sends form fields in request body to /register', 'Runs Java only on the client without HTTP', 'Stores password in localStorage automatically'],
    correctAnswer: 1,
  },

  // Java (10)
  {
    id: 21,
    topic: 'Java',
    question:
      'Array index starts at 0. What is the output of the following program?\n\nProgram:\nint[] a = {10, 20, 30};\nSystem.out.println(a[2] + a[0]);',
    options: ['40', '30', '1020', 'ArrayIndexOutOfBoundsException'],
    correctAnswer: 0,
  },
  {
    id: 22,
    topic: 'Java',
    question:
      'String concat creates new object. What is the output of the following program?\n\nProgram:\nString s = "Hi";\ns = s + "!";\nSystem.out.println(s.length());',
    options: ['2', 'Hi!', 'Compile error on length()', '3'],
    correctAnswer: 3,
  },
  {
    id: 23,
    topic: 'Java',
    question:
      'What is the output of the following program?\n\nProgram:\nfor (int i = 0; i < 5; i++) {\n  if (i == 2) continue;\n  System.out.print(i);\n}',
    options: ['024', '1234', '0134', '01234'],
    correctAnswer: 2,
  },
  {
    id: 24,
    topic: 'Java',
    question:
      'HashMap stores unique keys. What is the output of the following program?\n\nProgram:\nMap<String,Integer> m = new HashMap<>();\nm.put("a", 1); m.put("a", 2);\nSystem.out.println(m.get("a"));',
    options: ['Compile error on duplicate key', '2', '1', 'null'],
    correctAnswer: 1,
  },
  {
    id: 25,
    topic: 'Java',
    question:
      'try/catch/finally — finally runs after catch. What is the output of the following program?\n\nProgram:\ntry { System.out.print("A"); throw new RuntimeException(); }\ncatch (Exception e) { System.out.print("B"); }\nfinally { System.out.print("C"); }',
    options: ['ABC', 'AC', 'BC', 'A only'],
    correctAnswer: 0,
  },
  {
    id: 26,
    topic: 'Java',
    question:
      '== on objects compares references. What is the output of the following program?\n\nProgram:\nString x = new String("ok");\nString y = new String("ok");\nSystem.out.println(x == y);',
    options: ['true', 'ok', 'Compile error', 'false'],
    correctAnswer: 3,
  },
  {
    id: 27,
    topic: 'Java',
    question:
      'Method overloading picks best match. What is the output of the following program?\n\nProgram:\nvoid show(int n) { System.out.print("I"); }\nvoid show(String s) { System.out.print("S"); }\nshow(7);',
    options: ['IS', 'Compile error ambiguous', 'I', 'S'],
    correctAnswer: 2,
  },
  {
    id: 28,
    topic: 'Java',
    question:
      'ArrayList allows duplicates and grows. What is the output of the following program?\n\nProgram:\nList<Integer> list = new ArrayList<>();\nlist.add(1); list.add(1);\nSystem.out.println(list.size());',
    options: ['ConcurrentModificationException', '2', '1', '0'],
    correctAnswer: 1,
  },
  {
    id: 29,
    topic: 'Java',
    question:
      'static method belongs to class. What is the output of the following program?\n\nProgram:\nclass Util { static int twice(int x){ return x*2; } }\nSystem.out.println(Util.twice(4));',
    options: ['8', '4', '24', 'Must create Util instance first'],
    correctAnswer: 0,
  },
  {
    id: 30,
    topic: 'Java',
    question:
      'Division of ints truncates. What is the output of the following program?\n\nProgram:\nint a = 7; int b = 2;\nSystem.out.println(a / b);',
    options: ['3.5', '4', 'Compile error needs double', '3'],
    correctAnswer: 3,
  },

  // Python (10)
  {
    id: 31,
    topic: 'Python',
    question:
      'Lists are mutable and referenced. What is the output of the following program?\n\nProgram:\na = [1, 2]\nb = a\nb.append(3)\nprint(len(a))',
    options: ['1', 'TypeError on append', '3', '2'],
    correctAnswer: 2,
  },
  {
    id: 32,
    topic: 'Python',
    question:
      'Dictionary lookup by key. What is the output of the following program?\n\nProgram:\nd = {"id": 10, "id": 20}\nprint(d["id"])',
    options: ['KeyError always', '20', '10', '[10, 20]'],
    correctAnswer: 1,
  },
  {
    id: 33,
    topic: 'Python',
    question:
      'Default argument used when omitted. What is the output of the following program?\n\nProgram:\ndef f(x, y=2): return x + y\nprint(f(3))',
    options: ['5', '3', '32', 'SyntaxError on def'],
    correctAnswer: 0,
  },
  {
    id: 34,
    topic: 'Python',
    question:
      'range(3) yields 0,1,2. What is the output of the following program?\n\nProgram:\nprint(list(range(3)))',
    options: ['[1, 2, 3]', '[0, 1, 2, 3]', 'range object only', '[0, 1, 2]'],
    correctAnswer: 3,
  },
  {
    id: 35,
    topic: 'Python',
    question:
      '// is floor division in Python 3. What is the output of the following program?\n\nProgram:\nprint(7 // 2, 7 % 2)',
    options: ['4 1', '3 0', '3 1', '3.5 1'],
    correctAnswer: 2,
  },
  {
    id: 36,
    topic: 'Python',
    question:
      'Slicing excludes end index. What is the output of the following program?\n\nProgram:\ns = "Python"\nprint(s[0:3])',
    options: ['Python', 'Pyt', 'Pyth', 'yth'],
    correctAnswer: 1,
  },
  {
    id: 37,
    topic: 'Python',
    question:
      'What is the output of the following program?\n\nProgram:\nclass C:\n    def val(self):\n        return 42\nc = C()\nprint(c.val())',
    options: ['42', 'val', 'None', 'NameError: self'],
    correctAnswer: 0,
  },
  {
    id: 38,
    topic: 'Python',
    question:
      'What is printed on the second line?\n\nProgram:\ndef add(x, arr=[]): arr.append(x); return arr\nprint(add(1)); print(add(2))',
    options: ['[2]', '[1]', '[2, 1]', '[1, 2]'],
    correctAnswer: 3,
  },
  {
    id: 39,
    topic: 'Python',
    question:
      'except handles conversion error. What is the output of the following program?\n\nProgram:\ntry: n = int("x")\nexcept ValueError: n = 0\nprint(n)',
    options: ['None', 'Uncaught ValueError', '0', 'x'],
    correctAnswer: 2,
  },
  {
    id: 40,
    topic: 'Python',
    question:
      'List comprehension builds list. What is the output of the following program?\n\nProgram:\nprint([n*n for n in range(4) if n % 2 == 0])',
    options: ['[4]', '[0, 4]', '[1, 9]', '[0, 1, 4, 9]'],
    correctAnswer: 1,
  },

  // AI Basics (10)
  {
    id: 41,
    topic: 'AI Basics',
    question:
      'You train a classifier on 1,000 emails labeled spam or ham. This is an example of:',
    options: ['Supervised learning with labeled training data', 'Unsupervised learning with no labels at all', 'Reinforcement learning with reward only', 'Rule engine with zero training examples'],
    correctAnswer: 0,
  },
  {
    id: 42,
    topic: 'AI Basics',
    question:
      'Train/validation/test split.\nModel tuned on validation; final metric reported on test once.\nTest set purpose?',
    options: ['Replace training set every epoch permanently', 'Store API keys for the deployment server', 'Tune learning rate every iteration forever', 'Estimate performance on unseen data after model choice'],
    correctAnswer: 3,
  },
  {
    id: 43,
    topic: 'AI Basics',
    question:
      'Training accuracy is 99% but test accuracy is 60%. What is the best label for this situation?',
    options: ['Underfitting; model is too simple always', 'Data leak impossible in any pipeline', 'Likely overfitting; try regularization or more data', 'Perfect model; deploy without checks'],
    correctAnswer: 2,
  },
  {
    id: 44,
    topic: 'AI Basics',
    question:
      'An LLM generates a Java main method for you. What should you assume about that output?',
    options: [
      'Always equal to Stack Overflow top answer',
      'It should be reviewed and tested by a human because it may contain bugs or hallucinations',
      'Guaranteed compiled and deployed to production',
      'Ignored because LLMs cannot output text',
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    topic: 'AI Basics',
    question:
      'Class imbalance — 98% negative class.\nModel predicts "negative" for every row → accuracy 98%.\nProblem?',
    options: ['Accuracy hides poor recall on rare positive class', 'Accuracy proves model is fair for all groups', 'Imbalance means metrics are always perfect', 'No problem if accuracy is above 50%'],
    correctAnswer: 0,
  },
  {
    id: 46,
    topic: 'AI Basics',
    question:
      'You run k-means on customer features with no class labels. What is the goal?',
    options: ['Predict exact salary from labeled rows only', 'Execute SQL UPDATE on training table', 'Replace Git with a neural network', 'Find groups in data without using class labels'],
    correctAnswer: 3,
  },
  {
    id: 47,
    topic: 'AI Basics',
    question:
      'Feature = model input column.\nPredict house price. Which feature is most useful?',
    options: ['Random UUID copied from Git commit', 'Number of spaces in source file', 'Square feet and neighborhood code', 'Developer favorite IDE theme color'],
    correctAnswer: 2,
  },
  {
    id: 48,
    topic: 'AI Basics',
    question:
      'Embedding = dense vector for text.\nSimilar sentences → vectors closer in distance.\nUsed for?',
    options: ['Deleting training data after one epoch', 'Semantic search and recommendation matching', 'Formatting CSS margin in the browser', 'Compiling Java bytecode on the JVM'],
    correctAnswer: 1,
  },
  {
    id: 49,
    topic: 'AI Basics',
    question:
      'Human-in-the-loop.\nModel scores resumes; recruiter reviews before interview.\nWhy?',
    options: ['Humans validate decisions; reduce blind trust in scores', 'Model must hire without any human input', 'Recruiters cannot see model output by policy', 'Training data must be empty for fairness'],
    correctAnswer: 0,
  },
  {
    id: 50,
    topic: 'AI Basics',
    question:
      'Confusion matrix for binary classifier.\nMany false negatives on disease detection.\nWhich metric to watch closely?',
    options: ['Git commit count on main branch', 'CSS line height in admin UI', 'Number of Docker layers only', 'Recall (sensitivity) on positive class'],
    correctAnswer: 3,
  },

  // Git (10)
  {
    id: 51,
    topic: 'Git',
    question:
      'After git add app.js and git commit -m "fix", where does the new snapshot live?',
    options: ['Only RAM until computer restarts', '.gitignore file as plain text', 'Local repository history as a new commit object', 'Remote origin automatically without push'],
    correctAnswer: 2,
  },
  {
    id: 52,
    topic: 'Git',
    question:
      'git status shows branch and changes.\nYou edited file.js but did not git add.\nstatus shows file.js as:',
    options: ['Ignored because Git cannot track js', 'Modified in working tree, not staged', 'Staged and ready to commit already', 'Deleted from repository history'],
    correctAnswer: 1,
  },
  {
    id: 53,
    topic: 'Git',
    question:
      'git stash saves WIP.\ngit stash push -m "wip"\nWorking tree becomes clean. Restore later with:',
    options: ['git stash pop or git stash apply', 'git stash delete --force only', 'git reset --hard HEAD~10', 'git remote remove origin'],
    correctAnswer: 0,
  },
  {
    id: 54,
    topic: 'Git',
    question:
      'git diff compares versions.\ngit diff --staged shows:',
    options: ['Only commits on remote not fetched', 'CPU temperature of git process', 'List of all branches alphabetically', 'Changes already staged for next commit'],
    correctAnswer: 3,
  },
  {
    id: 55,
    topic: 'Git',
    question:
      'node_modules/ is listed in .gitignore and has never been committed (untracked). Note: .gitignore does not stop Git from tracking files that were already committed. In this untracked case, git add . will:',
    options: [
      'Upload node_modules to remote always',
      'Disable npm install on developer machine',
      'Skip untracked files under node_modules/',
      'Untrack every file that was previously committed under node_modules/',
    ],
    correctAnswer: 2,
  },
  {
    id: 56,
    topic: 'Git',
    question:
      'fetch vs pull.\ngit fetch origin updates remote-tracking refs.\ngit pull origin main is roughly:',
    options: ['tag every commit as v1.0 automatically', 'fetch then merge (or rebase) into current branch', 'delete main on remote server', 'clone repository into nested folder'],
    correctAnswer: 1,
  },
  {
    id: 57,
    topic: 'Git',
    question:
      'Merge conflict markers must be resolved.\nFile contains <<<<<<< HEAD ======= >>>>>>> branch\nBefore commit you should:',
    options: ['Edit to final code and remove all marker lines', 'Commit markers so team sees conflict art', 'Push --force to skip merge', 'Delete .git folder and reclone daily'],
    correctAnswer: 0,
  },
  {
    id: 58,
    topic: 'Git',
    question:
      'git log shows history.\ngit log --oneline -3 shows:',
    options: ['Three largest files in working tree', 'Three open TCP ports on GitHub', 'Next three sprint tasks from Jira', 'Last three commits one line each'],
    correctAnswer: 3,
  },
  {
    id: 59,
    topic: 'Git',
    question:
      'branch pointer moves on commit.\ngit checkout -b feature/api creates and switches.\nHEAD now points to:',
    options: ['Detached tag v1.0 only', 'Stash stack top entry', 'New branch tip at current commit', 'Remote origin/main always'],
    correctAnswer: 2,
  },
  {
    id: 60,
    topic: 'Git',
    question:
      'revert adds inverse commit; reset moves branch tip.\nOn shared main, to undo a bad commit safely prefer:',
    options: ['Edit old commit SHA manually in .git/objects', 'git revert <sha> so history stays for collaborators', 'git reset --hard and force push without telling team', 'Delete main branch on remote'],
    correctAnswer: 1,
  },
];

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Shuffle option order so correct letter position is not predictable. */
function shuffleQuestionOptions(question) {
  const order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const options = order.map((idx) => question.options[idx]);
  const correctAnswer = order.indexOf(question.correctAnswer);
  return { ...question, options, correctAnswer };
}

/** Balanced pick per topic (7–8 each → 45 for six topics), then shuffle; options reshuffled per question. */
export function getRecruitmentExamQuestions() {
  if (recruitmentQuestions.length <= TOTAL_QUESTIONS) {
    return recruitmentQuestions.map(shuffleQuestionOptions);
  }

  const byTopic = new Map();
  for (const q of recruitmentQuestions) {
    if (!byTopic.has(q.topic)) byTopic.set(q.topic, []);
    byTopic.get(q.topic).push(q);
  }

  const topics = shuffleArray([...byTopic.keys()]);
  const basePerTopic = Math.floor(TOTAL_QUESTIONS / topics.length);
  let remainder = TOTAL_QUESTIONS - basePerTopic * topics.length;

  const pool = [];
  for (const topic of topics) {
    const pickCount = basePerTopic + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    const topicPool = byTopic.get(topic) ?? [];
    const n = Math.min(pickCount, topicPool.length);
    pool.push(...shuffleArray(topicPool).slice(0, n));
  }

  return shuffleArray(pool).map(shuffleQuestionOptions);
}
