// Core Java MCQ Questions Pool (150 questions)
// Each exam randomly selects 20 questions from this pool

export const allQuestions = [
  {
    id: 1,
    question: "What is the default value of a boolean variable in Java?",
    options: ["true", "false", "null", "0"],
    correctAnswer: 1,
    explanation: "In Java, boolean variables have a default value of 'false' if not explicitly initialized."
  },
  {
    id: 2,
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    explanation: "The 'extends' keyword is used to create a subclass that inherits from a parent class in Java."
  },
  {
    id: 3,
    question: "What is the size of 'int' data type in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the platform"],
    correctAnswer: 1,
    explanation: "In Java, 'int' is always 4 bytes (32 bits), regardless of the platform, ensuring platform independence."
  },
  {
    id: 4,
    question: "Which method is used to start a thread in Java?",
    options: ["run()", "start()", "begin()", "execute()"],
    correctAnswer: 1,
    explanation: "The start() method is used to start a new thread. It calls the run() method internally."
  },
  {
    id: 5,
    question: "What is the output of: System.out.println(10 + 20 + \"30\");",
    options: ["3030", "60", "102030", "30"],
    correctAnswer: 0,
    explanation: "Due to operator precedence, 10 + 20 is evaluated first (resulting in 30), then concatenated with \"30\" to give \"3030\"."
  },
  {
    id: 6,
    question: "Which collection class is synchronized in Java?",
    options: ["ArrayList", "HashMap", "Vector", "HashSet"],
    correctAnswer: 2,
    explanation: "Vector is a synchronized collection class in Java, making it thread-safe but slower than ArrayList."
  },
  {
    id: 7,
    question: "What is the parent class of all classes in Java?",
    options: ["Object", "Class", "Super", "Parent"],
    correctAnswer: 0,
    explanation: "The Object class is the root of the class hierarchy in Java. Every class implicitly extends Object."
  },
  {
    id: 8,
    question: "Which access modifier allows access within the same package?",
    options: ["private", "public", "protected", "default (no modifier)"],
    correctAnswer: 3,
    explanation: "Default (package-private) access allows access within the same package but not from outside."
  },
  {
    id: 9,
    question: "What is method overriding in Java?",
    options: [
      "Creating multiple methods with the same name",
      "Redefining a method in a subclass",
      "Hiding a method in a parent class",
      "Calling a method multiple times"
    ],
    correctAnswer: 1,
    explanation: "Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its parent class."
  },
  {
    id: 10,
    question: "Which keyword is used to prevent method overriding?",
    options: ["static", "final", "private", "abstract"],
    correctAnswer: 1,
    explanation: "The 'final' keyword prevents a method from being overridden in subclasses."
  },
  {
    id: 11,
    question: "What is the output of: String s = null; System.out.println(s.length());",
    options: ["0", "null", "NullPointerException", "Compilation error"],
    correctAnswer: 2,
    explanation: "Calling a method on a null reference throws a NullPointerException at runtime."
  },
  {
    id: 12,
    question: "Which interface must be implemented to use threads in Java?",
    options: ["Thread", "Runnable", "Executable", "Callable"],
    correctAnswer: 1,
    explanation: "The Runnable interface must be implemented to create a thread. It contains the run() method."
  },
  {
    id: 13,
    question: "What is the difference between == and .equals() in Java?",
    options: [
      "No difference",
      "== compares references, .equals() compares values",
      "== compares values, .equals() compares references",
      "Both compare references"
    ],
    correctAnswer: 1,
    explanation: "== compares object references (memory addresses), while .equals() compares the actual content/values of objects."
  },
  {
    id: 14,
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for loop", "while loop", "do-while loop", "enhanced for loop"],
    correctAnswer: 2,
    explanation: "The do-while loop executes the body first, then checks the condition, ensuring at least one execution."
  },
  {
    id: 15,
    question: "What is the purpose of the 'super' keyword in Java?",
    options: [
      "To call parent class methods",
      "To access parent class variables",
      "To call parent class constructor",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The 'super' keyword is used to refer to the immediate parent class and can be used to access methods, variables, and constructors."
  },
  {
    id: 16,
    question: "What is the default value of an int variable in Java?",
    options: ["0", "1", "null", "undefined"],
    correctAnswer: 0,
    explanation: "In Java, int variables have a default value of 0 if not explicitly initialized."
  },
  {
    id: 17,
    question: "Which method is called when an object is created in Java?",
    options: ["main()", "constructor", "init()", "create()"],
    correctAnswer: 1,
    explanation: "A constructor is automatically called when an object is created using the 'new' keyword."
  },
  {
    id: 18,
    question: "What is the output of: System.out.println(\"Hello\".substring(0, 2));",
    options: ["He", "Hel", "Hello", "IndexOutOfBoundsException"],
    correctAnswer: 0,
    explanation: "substring(0, 2) returns characters from index 0 to 1 (exclusive of 2), which is \"He\"."
  },
  {
    id: 19,
    question: "Which keyword is used to create a constant in Java?",
    options: ["const", "final", "static", "constant"],
    correctAnswer: 1,
    explanation: "The 'final' keyword is used to create constants in Java. Once assigned, the value cannot be changed."
  },
  {
    id: 20,
    question: "What is the size of 'char' data type in Java?",
    options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
    correctAnswer: 1,
    explanation: "In Java, 'char' is 2 bytes (16 bits) to support Unicode characters."
  },
  {
    id: 21,
    question: "Which collection does not allow duplicate elements?",
    options: ["ArrayList", "LinkedList", "HashSet", "HashMap"],
    correctAnswer: 2,
    explanation: "HashSet is a Set implementation that does not allow duplicate elements."
  },
  {
    id: 22,
    question: "What is the output of: int[] arr = new int[5]; System.out.println(arr[0]);",
    options: ["0", "null", "undefined", "ArrayIndexOutOfBoundsException"],
    correctAnswer: 0,
    explanation: "Array elements are initialized to default values. For int arrays, the default value is 0."
  },
  {
    id: 23,
    question: "Which method is used to get the length of an array in Java?",
    options: [".length()", ".length", ".size()", ".count()"],
    correctAnswer: 1,
    explanation: "Arrays use the '.length' property (not a method) to get the number of elements."
  },
  {
    id: 24,
    question: "What is method overloading in Java?",
    options: [
      "Having multiple methods with same name but different parameters",
      "Redefining a method in subclass",
      "Calling a method multiple times",
      "None of the above"
    ],
    correctAnswer: 0,
    explanation: "Method overloading allows multiple methods with the same name but different parameter lists (different number or types of parameters)."
  },
  {
    id: 25,
    question: "Which package is automatically imported in Java?",
    options: ["java.util", "java.lang", "java.io", "java.net"],
    correctAnswer: 1,
    explanation: "The java.lang package is automatically imported in every Java program, containing classes like String, Object, System, etc."
  },
  {
    id: 26,
    question: "What is the output of: System.out.println(5 / 2);",
    options: ["2.5", "2", "2.0", "3"],
    correctAnswer: 1,
    explanation: "Integer division in Java truncates the decimal part. 5 / 2 = 2 (not 2.5)."
  },
  {
    id: 27,
    question: "Which keyword is used to exit from a loop in Java?",
    options: ["exit", "break", "continue", "return"],
    correctAnswer: 1,
    explanation: "The 'break' keyword is used to exit from a loop immediately."
  },
  {
    id: 28,
    question: "What is an abstract class in Java?",
    options: [
      "A class that cannot be instantiated",
      "A class with only abstract methods",
      "A class that must be extended",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "An abstract class cannot be instantiated, may contain abstract methods, and must be extended by a concrete class."
  },
  {
    id: 29,
    question: "Which method is used to convert a String to an int in Java?",
    options: ["parseInt()", "toInt()", "convertToInt()", "valueOf()"],
    correctAnswer: 0,
    explanation: "Integer.parseInt() is used to convert a String to an int primitive type."
  },
  {
    id: 30,
    question: "What is the output of: String str = \"Java\"; System.out.println(str == \"Java\");",
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "Due to string interning, string literals with the same value refer to the same object, so == returns true."
  },
  {
    id: 31,
    question: "Which collection maintains insertion order?",
    options: ["HashSet", "TreeSet", "LinkedHashSet", "HashMap"],
    correctAnswer: 2,
    explanation: "LinkedHashSet maintains the insertion order of elements while providing Set functionality."
  },
  {
    id: 32,
    question: "What is the default value of a String variable in Java?",
    options: ["\"\"", "null", "\"null\"", "undefined"],
    correctAnswer: 1,
    explanation: "String is a reference type, so its default value is null (not an empty string)."
  },
  {
    id: 33,
    question: "Which keyword is used to skip the current iteration of a loop?",
    options: ["break", "continue", "skip", "next"],
    correctAnswer: 1,
    explanation: "The 'continue' keyword skips the current iteration and proceeds to the next iteration of the loop."
  },
  {
    id: 34,
    question: "What is the output of: System.out.println(\"Java\".charAt(4));",
    options: ["'a'", "'J'", "StringIndexOutOfBoundsException", "null"],
    correctAnswer: 2,
    explanation: "The string \"Java\" has indices 0-3. Index 4 is out of bounds, causing StringIndexOutOfBoundsException."
  },
  {
    id: 35,
    question: "Which interface is implemented by all collection classes?",
    options: ["Collection", "List", "Set", "Map"],
    correctAnswer: 0,
    explanation: "The Collection interface is the root interface for all collection classes (except Map)."
  },
  {
    id: 36,
    question: "What is the output of: System.out.println(10 > 5 ? \"Yes\" : \"No\");",
    options: ["Yes", "No", "true", "Compilation error"],
    correctAnswer: 0,
    explanation: "This is a ternary operator. Since 10 > 5 is true, it returns \"Yes\"."
  },
  {
    id: 37,
    question: "Which method is used to get the current thread in Java?",
    options: ["getThread()", "currentThread()", "getCurrentThread()", "Thread.currentThread()"],
    correctAnswer: 3,
    explanation: "Thread.currentThread() is a static method that returns a reference to the currently executing thread."
  },
  {
    id: 38,
    question: "What is the output of: System.out.println(Math.max(5, 10));",
    options: ["5", "10", "15", "50"],
    correctAnswer: 1,
    explanation: "Math.max() returns the larger of the two values, which is 10."
  },
  {
    id: 39,
    question: "Which keyword is used to prevent a class from being inherited?",
    options: ["private", "final", "static", "abstract"],
    correctAnswer: 1,
    explanation: "A 'final' class cannot be extended or inherited by other classes."
  },
  {
    id: 40,
    question: "What is the output of: System.out.println(\"Hello\".equals(\"hello\"));",
    options: ["true", "false", "Compilation error", "null"],
    correctAnswer: 1,
    explanation: "equals() is case-sensitive. \"Hello\" and \"hello\" are different, so it returns false."
  },
  {
    id: 41,
    question: "Which method is used to check if a string contains a substring?",
    options: [".contains()", ".has()", ".includes()", ".find()"],
    correctAnswer: 0,
    explanation: "The contains() method returns true if the string contains the specified substring."
  },
  {
    id: 42,
    question: "What is the output of: System.out.println(10 % 3);",
    options: ["3", "1", "0", "3.33"],
    correctAnswer: 1,
    explanation: "The modulo operator (%) returns the remainder. 10 divided by 3 leaves a remainder of 1."
  },
  {
    id: 43,
    question: "Which collection is sorted by default?",
    options: ["HashSet", "LinkedHashSet", "TreeSet", "ArrayList"],
    correctAnswer: 2,
    explanation: "TreeSet maintains elements in sorted order (natural ordering or by Comparator)."
  },
  {
    id: 44,
    question: "What is the output of: System.out.println(\"Java\".length());",
    options: ["3", "4", "5", "Compilation error"],
    correctAnswer: 1,
    explanation: "The length() method returns the number of characters. \"Java\" has 4 characters."
  },
  {
    id: 45,
    question: "Which keyword is used to create an instance of a class?",
    options: ["new", "create", "instance", "make"],
    correctAnswer: 0,
    explanation: "The 'new' keyword is used to create a new instance (object) of a class."
  },
  {
    id: 46,
    question: "What is the output of: int x = 5; System.out.println(++x);",
    options: ["5", "6", "4", "Compilation error"],
    correctAnswer: 1,
    explanation: "++x is pre-increment, so x is incremented first (to 6), then printed."
  },
  {
    id: 47,
    question: "Which method is used to convert an object to String?",
    options: [".toString()", ".toStr()", ".stringify()", ".convert()"],
    correctAnswer: 0,
    explanation: "The toString() method is inherited from Object class and is used to get string representation of an object."
  },
  {
    id: 48,
    question: "What is the output of: System.out.println(\"Java\".toUpperCase());",
    options: ["JAVA", "Java", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "toUpperCase() converts all characters in the string to uppercase, resulting in \"JAVA\"."
  },
  {
    id: 49,
    question: "Which interface allows duplicate elements?",
    options: ["Set", "List", "Map", "Queue"],
    correctAnswer: 1,
    explanation: "List interface allows duplicate elements, while Set does not."
  },
  {
    id: 50,
    question: "What is the output of: System.out.println(5 == 5.0);",
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "Java performs automatic type promotion. 5 (int) is promoted to 5.0 (double) for comparison, so they are equal."
  },
  {
    id: 51,
    question: "Which keyword is used to handle exceptions in Java?",
    options: ["try", "catch", "throw", "All of the above"],
    correctAnswer: 3,
    explanation: "try, catch, and throw are all keywords used in exception handling in Java."
  },
  {
    id: 52,
    question: "What is the output of: System.out.println(\"Java\".substring(1));",
    options: ["J", "ava", "Java", "a"],
    correctAnswer: 1,
    explanation: "substring(1) returns the substring starting from index 1 to the end, which is \"ava\"."
  },
  {
    id: 53,
    question: "Which method is used to add an element to an ArrayList?",
    options: [".add()", ".insert()", ".append()", ".put()"],
    correctAnswer: 0,
    explanation: "The add() method is used to add elements to an ArrayList."
  },
  {
    id: 54,
    question: "What is the output of: System.out.println(\"Java\".indexOf('a'));",
    options: ["0", "1", "2", "-1"],
    correctAnswer: 1,
    explanation: "indexOf('a') returns the index of the first occurrence of 'a', which is at index 1."
  },
  {
    id: 55,
    question: "Which keyword is used to return a value from a method?",
    options: ["return", "break", "continue", "exit"],
    correctAnswer: 0,
    explanation: "The 'return' keyword is used to return a value from a method and exit the method."
  },
  {
    id: 56,
    question: "What is the output of: System.out.println(\"Java\".replace('a', 'o'));",
    options: ["Jovo", "Java", "Jovo", "Jovo"],
    correctAnswer: 0,
    explanation: "replace('a', 'o') replaces all occurrences of 'a' with 'o', resulting in \"Jovo\"."
  },
  {
    id: 57,
    question: "Which collection does not maintain insertion order?",
    options: ["ArrayList", "LinkedList", "HashSet", "LinkedHashSet"],
    correctAnswer: 2,
    explanation: "HashSet does not maintain insertion order, while LinkedHashSet does."
  },
  {
    id: 58,
    question: "What is the output of: System.out.println(10 / 0);",
    options: ["0", "Infinity", "ArithmeticException", "Compilation error"],
    correctAnswer: 2,
    explanation: "Dividing by zero throws an ArithmeticException at runtime."
  },
  {
    id: 59,
    question: "Which method is used to remove an element from an ArrayList?",
    options: [".remove()", ".delete()", ".clear()", ".erase()"],
    correctAnswer: 0,
    explanation: "The remove() method is used to remove an element from an ArrayList."
  },
  {
    id: 60,
    question: "What is the output of: System.out.println(\"Java\".startsWith(\"Ja\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "startsWith(\"Ja\") returns true because \"Java\" starts with \"Ja\"."
  },
  {
    id: 61,
    question: "Which keyword is used to create a variable that cannot be changed?",
    options: ["const", "final", "static", "immutable"],
    correctAnswer: 1,
    explanation: "The 'final' keyword is used to create constants or variables that cannot be reassigned."
  },
  {
    id: 62,
    question: "What is the output of: System.out.println(\"Java\".endsWith(\"va\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "endsWith(\"va\") returns true because \"Java\" ends with \"va\"."
  },
  {
    id: 63,
    question: "Which method is used to get the size of an ArrayList?",
    options: [".length()", ".length", ".size()", ".count()"],
    correctAnswer: 2,
    explanation: "ArrayList uses the size() method to get the number of elements."
  },
  {
    id: 64,
    question: "What is the output of: System.out.println(\"Java\".concat(\"Script\"));",
    options: ["JavaScript", "Java Script", "Java+Script", "Compilation error"],
    correctAnswer: 0,
    explanation: "concat() concatenates the specified string to the end, resulting in \"JavaScript\"."
  },
  {
    id: 65,
    question: "Which keyword is used to access static members?",
    options: ["this", "super", "static", "class name"],
    correctAnswer: 3,
    explanation: "Static members are accessed using the class name, not an instance."
  },
  {
    id: 66,
    question: "What is the output of: System.out.println(\"Java\".trim());",
    options: ["Java", "\"Java\"", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "trim() removes leading and trailing whitespace. Since \"Java\" has no whitespace, it returns \"Java\"."
  },
  {
    id: 67,
    question: "Which interface is used for key-value pairs?",
    options: ["List", "Set", "Map", "Queue"],
    correctAnswer: 2,
    explanation: "Map interface is used to store key-value pairs."
  },
  {
    id: 68,
    question: "What is the output of: System.out.println(\"Java\".equalsIgnoreCase(\"JAVA\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "equalsIgnoreCase() performs case-insensitive comparison, so \"Java\" equals \"JAVA\"."
  },
  {
    id: 69,
    question: "Which method is used to check if an ArrayList is empty?",
    options: [".isEmpty()", ".empty()", ".isNull()", ".hasElements()"],
    correctAnswer: 0,
    explanation: "The isEmpty() method returns true if the ArrayList contains no elements."
  },
  {
    id: 70,
    question: "What is the output of: System.out.println(\"Java\".charAt(0));",
    options: ["'J'", "'a'", "0", "1"],
    correctAnswer: 0,
    explanation: "charAt(0) returns the character at index 0, which is 'J'."
  },
  {
    id: 71,
    question: "Which keyword is used to prevent a variable from being modified?",
    options: ["const", "final", "static", "readonly"],
    correctAnswer: 1,
    explanation: "The 'final' keyword prevents a variable from being reassigned after initialization."
  },
  {
    id: 72,
    question: "What is the output of: System.out.println(\"Java\".toLowerCase());",
    options: ["java", "Java", "JAVA", "jAvA"],
    correctAnswer: 0,
    explanation: "toLowerCase() converts all characters to lowercase, resulting in \"java\"."
  },
  {
    id: 73,
    question: "Which collection allows null values?",
    options: ["HashSet", "TreeSet", "ArrayList", "All of the above"],
    correctAnswer: 3,
    explanation: "HashSet, TreeSet (with caution), and ArrayList all allow null values."
  },
  {
    id: 74,
    question: "What is the output of: System.out.println(5 + \"5\");",
    options: ["10", "55", "5+5", "Compilation error"],
    correctAnswer: 1,
    explanation: "When one operand is a String, + performs concatenation. 5 + \"5\" = \"55\"."
  },
  {
    id: 75,
    question: "Which method is used to clear all elements from an ArrayList?",
    options: [".clear()", ".removeAll()", ".deleteAll()", ".empty()"],
    correctAnswer: 0,
    explanation: "The clear() method removes all elements from an ArrayList."
  },
  {
    id: 76,
    question: "What is the output of: System.out.println(\"Java\".split(\"a\").length);",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "split(\"a\") splits on 'a', resulting in [\"J\", \"v\", \"\"], which has 3 elements."
  },
  {
    id: 77,
    question: "Which keyword is used to create a class that cannot be instantiated?",
    options: ["private", "abstract", "final", "static"],
    correctAnswer: 1,
    explanation: "An abstract class cannot be instantiated directly and must be extended."
  },
  {
    id: 78,
    question: "What is the output of: System.out.println(\"Java\".contains(\"av\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "contains(\"av\") returns true because \"Java\" contains the substring \"av\"."
  },
  {
    id: 79,
    question: "Which method is used to check if an ArrayList contains an element?",
    options: [".contains()", ".has()", ".includes()", ".find()"],
    correctAnswer: 0,
    explanation: "The contains() method returns true if the ArrayList contains the specified element."
  },
  {
    id: 80,
    question: "What is the output of: System.out.println(\"Java\".replaceAll(\"a\", \"o\"));",
    options: ["Jovo", "Java", "Jovo", "Jovo"],
    correctAnswer: 0,
    explanation: "replaceAll(\"a\", \"o\") replaces all occurrences of 'a' with 'o', resulting in \"Jovo\"."
  },
  {
    id: 81,
    question: "Which keyword is used to create a method that belongs to the class, not the instance?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 1,
    explanation: "The 'static' keyword is used to create class-level methods that belong to the class itself."
  },
  {
    id: 82,
    question: "What is the output of: System.out.println(\"Java\".matches(\"Java\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "matches() checks if the entire string matches the regex. \"Java\" matches \"Java\", so it returns true."
  },
  {
    id: 83,
    question: "Which collection is thread-safe?",
    options: ["ArrayList", "HashMap", "Vector", "HashSet"],
    correctAnswer: 2,
    explanation: "Vector is synchronized and thread-safe, unlike ArrayList, HashMap, and HashSet."
  },
  {
    id: 84,
    question: "What is the output of: System.out.println(\"Java\".compareTo(\"Java\"));",
    options: ["0", "1", "-1", "4"],
    correctAnswer: 0,
    explanation: "compareTo() returns 0 when strings are equal, positive when first is greater, negative when first is smaller."
  },
  {
    id: 85,
    question: "Which method is used to get an element from an ArrayList by index?",
    options: [".get()", ".element()", ".at()", ".retrieve()"],
    correctAnswer: 0,
    explanation: "The get(index) method is used to retrieve an element from an ArrayList at the specified index."
  },
  {
    id: 86,
    question: "What is the output of: System.out.println(\"Java\".compareToIgnoreCase(\"JAVA\"));",
    options: ["0", "1", "-1", "4"],
    correctAnswer: 0,
    explanation: "compareToIgnoreCase() performs case-insensitive comparison. \"Java\" equals \"JAVA\", so it returns 0."
  },
  {
    id: 87,
    question: "Which keyword is used to create a variable shared by all instances of a class?",
    options: ["final", "static", "abstract", "public"],
    correctAnswer: 1,
    explanation: "A 'static' variable is shared by all instances of a class (class-level variable)."
  },
  {
    id: 88,
    question: "What is the output of: System.out.println(\"Java\".valueOf('J'));",
    options: ["J", "\"J\"", "Java", "Compilation error"],
    correctAnswer: 0,
    explanation: "String.valueOf(char) converts a character to a String, resulting in \"J\"."
  },
  {
    id: 89,
    question: "Which method is used to add an element at a specific index in ArrayList?",
    options: [".add(index, element)", ".insert(index, element)", ".set(index, element)", ".put(index, element)"],
    correctAnswer: 0,
    explanation: "add(index, element) inserts the element at the specified index, shifting existing elements."
  },
  {
    id: 90,
    question: "What is the output of: System.out.println(\"Java\".lastIndexOf('a'));",
    options: ["1", "2", "3", "-1"],
    correctAnswer: 2,
    explanation: "lastIndexOf('a') returns the index of the last occurrence of 'a', which is at index 3."
  },
  {
    id: 91,
    question: "Which keyword is used to create an interface?",
    options: ["interface", "abstract", "class", "implements"],
    correctAnswer: 0,
    explanation: "The 'interface' keyword is used to declare an interface in Java."
  },
  {
    id: 92,
    question: "What is the output of: System.out.println(\"Java\".isEmpty());",
    options: ["true", "false", "0", "1"],
    correctAnswer: 1,
    explanation: "isEmpty() returns true only if the string has length 0. \"Java\" has 4 characters, so it returns false."
  },
  {
    id: 93,
    question: "Which method is used to replace an element in an ArrayList?",
    options: [".replace()", ".set()", ".update()", ".change()"],
    correctAnswer: 1,
    explanation: "The set(index, element) method replaces the element at the specified index."
  },
  {
    id: 94,
    question: "What is the output of: System.out.println(\"Java\".getBytes().length);",
    options: ["4", "8", "16", "32"],
    correctAnswer: 0,
    explanation: "getBytes() converts the string to bytes. \"Java\" has 4 characters, so it returns 4 bytes (in default encoding)."
  },
  {
    id: 95,
    question: "Which keyword is used to implement an interface?",
    options: ["extends", "implements", "inherits", "uses"],
    correctAnswer: 1,
    explanation: "The 'implements' keyword is used to implement an interface in a class."
  },
  {
    id: 96,
    question: "What is the output of: System.out.println(\"Java\".codePointAt(0));",
    options: ["74", "65", "97", "106"],
    correctAnswer: 0,
    explanation: "codePointAt(0) returns the Unicode code point of 'J', which is 74."
  },
  {
    id: 97,
    question: "Which method is used to check if an ArrayList contains all elements of another collection?",
    options: [".containsAll()", ".hasAll()", ".includesAll()", ".findAll()"],
    correctAnswer: 0,
    explanation: "The containsAll() method returns true if the ArrayList contains all elements of the specified collection."
  },
  {
    id: 98,
    question: "What is the output of: System.out.println(\"Java\".regionMatches(0, \"Java\", 0, 4));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "regionMatches() compares regions of strings. Comparing \"Java\" with \"Java\" from index 0 for length 4 returns true."
  },
  {
    id: 99,
    question: "Which keyword is used to create a variable that can only be accessed within the class?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 0,
    explanation: "The 'private' keyword restricts access to within the same class only."
  },
  {
    id: 100,
    question: "What is the output of: System.out.println(\"Java\".intern() == \"Java\");",
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "intern() returns a canonical representation. String literals are interned, so == returns true."
  },
  {
    id: 101,
    question: "Which method is used to remove all elements from an ArrayList that are in another collection?",
    options: [".removeAll()", ".clearAll()", ".deleteAll()", ".eraseAll()"],
    correctAnswer: 0,
    explanation: "The removeAll() method removes all elements from the ArrayList that are present in the specified collection."
  },
  {
    id: 102,
    question: "What is the output of: System.out.println(\"Java\".hashCode());",
    options: ["A number", "null", "Java", "Compilation error"],
    correctAnswer: 0,
    explanation: "hashCode() returns an integer hash code for the string. It returns a number, not null or the string itself."
  },
  {
    id: 103,
    question: "Which keyword is used to create a method that must be overridden?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 2,
    explanation: "An 'abstract' method must be overridden by the subclass that extends the abstract class."
  },
  {
    id: 104,
    question: "What is the output of: System.out.println(\"Java\".format(\"Hello %s\", \"World\"));",
    options: ["Hello World", "Hello Java", "Java World", "Compilation error"],
    correctAnswer: 0,
    explanation: "format() is a static method. String.format(\"Hello %s\", \"World\") returns \"Hello World\"."
  },
  {
    id: 105,
    question: "Which method is used to convert an ArrayList to an array?",
    options: [".toArray()", ".array()", ".convertToArray()", ".getArray()"],
    correctAnswer: 0,
    explanation: "The toArray() method converts an ArrayList to an array."
  },
  {
    id: 106,
    question: "What is the output of: System.out.println(\"Java\".getClass().getName());",
    options: ["java.lang.String", "String", "Java", "Class"],
    correctAnswer: 0,
    explanation: "getClass().getName() returns the fully qualified class name, which is \"java.lang.String\"."
  },
  {
    id: 107,
    question: "Which keyword is used to create a variable accessible within the package and subclasses?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 2,
    explanation: "The 'protected' keyword allows access within the same package and by subclasses in different packages."
  },
  {
    id: 108,
    question: "What is the output of: System.out.println(\"Java\".offsetByCodePoints(0, 2));",
    options: ["2", "3", "4", "0"],
    correctAnswer: 0,
    explanation: "offsetByCodePoints(0, 2) returns the index offset by 2 code points from index 0, which is 2."
  },
  {
    id: 109,
    question: "Which method is used to create a sublist from an ArrayList?",
    options: [".subList()", ".slice()", ".substring()", ".getRange()"],
    correctAnswer: 0,
    explanation: "The subList(fromIndex, toIndex) method returns a view of the portion of the list."
  },
  {
    id: 110,
    question: "What is the output of: System.out.println(\"Java\".codePointBefore(1));",
    options: ["74", "65", "97", "106"],
    correctAnswer: 0,
    explanation: "codePointBefore(1) returns the Unicode code point before index 1, which is 'J' (74)."
  },
  {
    id: 111,
    question: "Which keyword is used to create a variable accessible from anywhere?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 1,
    explanation: "The 'public' keyword allows access from anywhere, including other packages."
  },
  {
    id: 112,
    question: "What is the output of: System.out.println(\"Java\".codePointCount(0, 4));",
    options: ["4", "3", "2", "1"],
    correctAnswer: 0,
    explanation: "codePointCount(0, 4) returns the number of Unicode code points between indices 0 and 4, which is 4."
  },
  {
    id: 113,
    question: "Which method is used to check if two ArrayLists are equal?",
    options: [".equals()", ".isEqual()", ".compare()", ".same()"],
    correctAnswer: 0,
    explanation: "The equals() method compares two ArrayLists and returns true if they contain the same elements in the same order."
  },
  {
    id: 114,
    question: "What is the output of: System.out.println(\"Java\".contentEquals(\"Java\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "contentEquals() compares the content of the string with the specified CharSequence. \"Java\" equals \"Java\", so it returns true."
  },
  {
    id: 115,
    question: "Which keyword is used to create a method that cannot be overridden?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 0,
    explanation: "A 'final' method cannot be overridden by subclasses."
  },
  {
    id: 116,
    question: "What is the output of: System.out.println(\"Java\".getChars(0, 2, new char[2], 0));",
    options: ["Ja", "Java", "void", "Compilation error"],
    correctAnswer: 2,
    explanation: "getChars() is a void method that copies characters to a char array. It doesn't return a value."
  },
  {
    id: 117,
    question: "Which method is used to find the index of an element in an ArrayList?",
    options: [".indexOf()", ".find()", ".search()", ".locate()"],
    correctAnswer: 0,
    explanation: "The indexOf(element) method returns the index of the first occurrence of the specified element."
  },
  {
    id: 118,
    question: "What is the output of: System.out.println(\"Java\".copyValueOf(new char[]{'J','a','v','a'}));",
    options: ["Java", "J,a,v,a", "char[]", "Compilation error"],
    correctAnswer: 0,
    explanation: "copyValueOf() creates a new String from a char array, resulting in \"Java\"."
  },
  {
    id: 119,
    question: "Which keyword is used to create a method that returns nothing?",
    options: ["void", "null", "empty", "none"],
    correctAnswer: 0,
    explanation: "The 'void' keyword is used to declare a method that does not return any value."
  },
  {
    id: 120,
    question: "What is the output of: System.out.println(\"Java\".valueOf(123));",
    options: ["123", "\"123\"", "Java123", "Compilation error"],
    correctAnswer: 0,
    explanation: "String.valueOf(int) converts an integer to a String, resulting in \"123\"."
  },
  {
    id: 121,
    question: "Which method is used to find the last index of an element in an ArrayList?",
    options: [".lastIndexOf()", ".findLast()", ".searchLast()", ".locateLast()"],
    correctAnswer: 0,
    explanation: "The lastIndexOf(element) method returns the index of the last occurrence of the specified element."
  },
  {
    id: 122,
    question: "What is the output of: System.out.println(\"Java\".join(\"-\", \"J\", \"a\", \"v\", \"a\"));",
    options: ["J-a-v-a", "Java", "J,a,v,a", "Compilation error"],
    correctAnswer: 0,
    explanation: "join() concatenates strings with the specified delimiter. join(\"-\", \"J\", \"a\", \"v\", \"a\") returns \"J-a-v-a\"."
  },
  {
    id: 123,
    question: "Which keyword is used to create a method that can be called without creating an object?",
    options: ["final", "static", "abstract", "public"],
    correctAnswer: 1,
    explanation: "A 'static' method can be called using the class name without creating an instance."
  },
  {
    id: 124,
    question: "What is the output of: System.out.println(\"Java\".repeat(2));",
    options: ["JavaJava", "Java Java", "Java2", "Compilation error"],
    correctAnswer: 0,
    explanation: "repeat(2) repeats the string 2 times, resulting in \"JavaJava\"."
  },
  {
    id: 125,
    question: "Which method is used to check if an ArrayList is empty?",
    options: [".isEmpty()", ".empty()", ".isNull()", ".hasElements()"],
    correctAnswer: 0,
    explanation: "The isEmpty() method returns true if the ArrayList contains no elements."
  },
  {
    id: 126,
    question: "What is the output of: System.out.println(\"Java\".lines().count());",
    options: ["1", "2", "0", "4"],
    correctAnswer: 0,
    explanation: "lines() returns a stream of lines. \"Java\" has one line, so count() returns 1."
  },
  {
    id: 127,
    question: "Which keyword is used to create a variable that is initialized only once?",
    options: ["final", "static", "const", "readonly"],
    correctAnswer: 0,
    explanation: "A 'final' variable can only be initialized once and cannot be reassigned."
  },
  {
    id: 128,
    question: "What is the output of: System.out.println(\"Java\".strip());",
    options: ["Java", "\"Java\"", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "strip() removes leading and trailing whitespace. Since \"Java\" has no whitespace, it returns \"Java\"."
  },
  {
    id: 129,
    question: "Which method is used to check if an ArrayList contains a specific element?",
    options: [".contains()", ".has()", ".includes()", ".find()"],
    correctAnswer: 0,
    explanation: "The contains(element) method returns true if the ArrayList contains the specified element."
  },
  {
    id: 130,
    question: "What is the output of: System.out.println(\"Java\".stripLeading());",
    options: ["Java", "\"Java\"", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "stripLeading() removes leading whitespace only. Since \"Java\" has no leading whitespace, it returns \"Java\"."
  },
  {
    id: 131,
    question: "Which keyword is used to create a class that can have only one instance?",
    options: ["final", "static", "singleton", "private"],
    correctAnswer: 2,
    explanation: "A singleton class is designed to have only one instance (though 'singleton' is not a keyword, it's a design pattern)."
  },
  {
    id: 132,
    question: "What is the output of: System.out.println(\"Java\".stripTrailing());",
    options: ["Java", "\"Java\"", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "stripTrailing() removes trailing whitespace only. Since \"Java\" has no trailing whitespace, it returns \"Java\"."
  },
  {
    id: 133,
    question: "Which method is used to check if an ArrayList is equal to another collection?",
    options: [".equals()", ".isEqual()", ".compare()", ".same()"],
    correctAnswer: 0,
    explanation: "The equals() method compares the ArrayList with another object and returns true if they are equal."
  },
  {
    id: 134,
    question: "What is the output of: System.out.println(\"Java\".isBlank());",
    options: ["true", "false", "0", "1"],
    correctAnswer: 1,
    explanation: "isBlank() returns true only if the string is empty or contains only whitespace. \"Java\" has content, so it returns false."
  },
  {
    id: 135,
    question: "Which keyword is used to create a method that must be implemented by a class?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 2,
    explanation: "An 'abstract' method in an abstract class or interface must be implemented by the concrete class."
  },
  {
    id: 136,
    question: "What is the output of: System.out.println(\"Java\".isEmpty());",
    options: ["true", "false", "0", "1"],
    correctAnswer: 1,
    explanation: "isEmpty() returns true only if the string length is 0. \"Java\" has 4 characters, so it returns false."
  },
  {
    id: 137,
    question: "Which method is used to check if an ArrayList is empty or null?",
    options: [".isEmpty()", ".empty()", ".isNull()", ".hasElements()"],
    correctAnswer: 0,
    explanation: "The isEmpty() method returns true if the ArrayList contains no elements (size is 0)."
  },
  {
    id: 138,
    question: "What is the output of: System.out.println(\"Java\".isBlank());",
    options: ["true", "false", "0", "1"],
    correctAnswer: 1,
    explanation: "isBlank() returns true only if the string is empty or contains only whitespace. \"Java\" has content, so it returns false."
  },
  {
    id: 139,
    question: "Which keyword is used to create a variable that belongs to the class, not the instance?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 1,
    explanation: "A 'static' variable belongs to the class itself, not to any instance of the class."
  },
  {
    id: 140,
    question: "What is the output of: System.out.println(\"Java\".formatted(\"Hello %s\", \"World\"));",
    options: ["Hello World", "Hello Java", "Java World", "Compilation error"],
    correctAnswer: 3,
    explanation: "formatted() is an instance method (Java 15+). The correct usage would be \"Hello %s\".formatted(\"World\")."
  },
  {
    id: 141,
    question: "Which method is used to remove an element from an ArrayList by index?",
    options: [".remove(index)", ".delete(index)", ".erase(index)", ".clear(index)"],
    correctAnswer: 0,
    explanation: "The remove(index) method removes the element at the specified index from the ArrayList."
  },
  {
    id: 142,
    question: "What is the output of: System.out.println(\"Java\".indent(2));",
    options: ["  Java", "Java  ", "Java", "Compilation error"],
    correctAnswer: 0,
    explanation: "indent(2) adds 2 spaces of indentation to each line, resulting in \"  Java\"."
  },
  {
    id: 143,
    question: "Which keyword is used to create a method that can be accessed without an instance?",
    options: ["final", "static", "abstract", "public"],
    correctAnswer: 1,
    explanation: "A 'static' method can be called using the class name without creating an instance of the class."
  },
  {
    id: 144,
    question: "What is the output of: System.out.println(\"Java\".transform(s -> s.toUpperCase()));",
    options: ["JAVA", "Java", "java", "Compilation error"],
    correctAnswer: 0,
    explanation: "transform() applies a function to the string. s.toUpperCase() converts \"Java\" to \"JAVA\"."
  },
  {
    id: 145,
    question: "Which method is used to add all elements from a collection to an ArrayList?",
    options: [".addAll()", ".insertAll()", ".appendAll()", ".putAll()"],
    correctAnswer: 0,
    explanation: "The addAll() method adds all elements from the specified collection to the ArrayList."
  },
  {
    id: 146,
    question: "What is the output of: System.out.println(\"Java\".describeConstable());",
    options: ["Optional[String]", "Java", "String", "Compilation error"],
    correctAnswer: 0,
    explanation: "describeConstable() returns an Optional describing the String constant, which is Optional[String]."
  },
  {
    id: 147,
    question: "Which keyword is used to create a method that cannot be accessed from outside the package?",
    options: ["private", "public", "protected", "default (no modifier)"],
    correctAnswer: 3,
    explanation: "Default (package-private) access allows access only within the same package."
  },
  {
    id: 148,
    question: "What is the output of: System.out.println(\"Java\".resolveConstantDesc(null));",
    options: ["Java", "String", "null", "Compilation error"],
    correctAnswer: 0,
    explanation: "resolveConstantDesc() resolves this instance as a ConstantDesc, returning the String itself."
  },
  {
    id: 149,
    question: "Which method is used to remove all elements from an ArrayList that match a condition?",
    options: [".removeIf()", ".deleteIf()", ".eraseIf()", ".clearIf()"],
    correctAnswer: 0,
    explanation: "The removeIf(predicate) method removes all elements that match the given predicate."
  },
  {
    id: 150,
    question: "What is the output of: System.out.println(\"Java\".chars().count());",
    options: ["4", "3", "2", "1"],
    correctAnswer: 0,
    explanation: "chars() returns an IntStream of char values. count() returns the number of elements, which is 4 for \"Java\"."
  }
];

// Function to randomly select 20 questions
export const getRandomQuestions = () => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
};

