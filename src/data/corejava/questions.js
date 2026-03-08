// Core Java MCQ Questions Pool (150 questions)
// Each exam randomly selects 20 questions from this pool
// Questions cover all Core Java topics: Basics, Control Flow, OOPs, Strings, Arrays, Exceptions, Collections, Multithreading, Advanced

export const allQuestions = [
  // ========== JAVA BASICS (15 questions) ==========
  {
    id: 1,
    question: "What is the default value of a boolean variable in Java?",
    options: ["true", "false", "null", "0"],
    correctAnswer: 1,
    explanation: "In Java, boolean variables have a default value of 'false' if not explicitly initialized."
  },
  {
    id: 2,
    question: "What is the size of 'int' data type in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the platform"],
    correctAnswer: 1,
    explanation: "In Java, 'int' is always 4 bytes (32 bits), regardless of the platform, ensuring platform independence."
  },
  {
    id: 3,
    question: "What is the default value of an int variable in Java?",
    options: ["0", "1", "null", "undefined"],
    correctAnswer: 0,
    explanation: "In Java, int variables have a default value of 0 if not explicitly initialized."
  },
  {
    id: 4,
    question: "What is the size of 'char' data type in Java?",
    options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
    correctAnswer: 1,
    explanation: "In Java, 'char' is 2 bytes (16 bits) to support Unicode characters."
  },
  {
    id: 5,
    question: "What is the default value of a String variable in Java?",
    options: ["\"\"", "null", "\"null\"", "undefined"],
    correctAnswer: 1,
    explanation: "String is a reference type, so its default value is null (not an empty string)."
  },
  {
    id: 6,
    question: "Which package is automatically imported in Java?",
    options: ["java.util", "java.lang", "java.io", "java.net"],
    correctAnswer: 1,
    explanation: "The java.lang package is automatically imported in every Java program, containing classes like String, Object, System, etc."
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
    question: "Which keyword is used to create an instance of a class?",
    options: ["new", "create", "instance", "make"],
    correctAnswer: 0,
    explanation: "The 'new' keyword is used to create a new instance (object) of a class."
  },
  {
    id: 9,
    question: "What is the output of: System.out.println(5 / 2);",
    options: ["2.5", "2", "2.0", "3"],
    correctAnswer: 1,
    explanation: "Integer division in Java truncates the decimal part. 5 / 2 = 2 (not 2.5)."
  },
  {
    id: 10,
    question: "What is the output of: System.out.println(10 % 3);",
    options: ["3", "1", "0", "3.33"],
    correctAnswer: 1,
    explanation: "The modulo operator (%) returns the remainder. 10 divided by 3 leaves a remainder of 1."
  },
  {
    id: 11,
    question: "What is the output of: System.out.println(5 + \"5\");",
    options: ["10", "55", "5+5", "Compilation error"],
    correctAnswer: 1,
    explanation: "When one operand is a String, + performs concatenation. 5 + \"5\" = \"55\"."
  },
  {
    id: 12,
    question: "What is the output of: System.out.println(5 == 5.0);",
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "Java performs automatic type promotion. 5 (int) is promoted to 5.0 (double) for comparison, so they are equal."
  },
  {
    id: 13,
    question: "What is the output of: int x = 5; System.out.println(++x);",
    options: ["5", "6", "4", "Compilation error"],
    correctAnswer: 1,
    explanation: "++x is pre-increment, so x is incremented first (to 6), then printed."
  },
  {
    id: 14,
    question: "What is the output of: System.out.println(10 + 20 + \"30\");",
    options: ["3030", "60", "102030", "30"],
    correctAnswer: 0,
    explanation: "Due to operator precedence, 10 + 20 is evaluated first (resulting in 30), then concatenated with \"30\" to give \"3030\"."
  },
  {
    id: 15,
    question: "Which method is called when an object is created in Java?",
    options: ["main()", "constructor", "init()", "create()"],
    correctAnswer: 1,
    explanation: "A constructor is automatically called when an object is created using the 'new' keyword."
  },

  // ========== CONTROL FLOW (15 questions) ==========
  {
    id: 16,
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for loop", "while loop", "do-while loop", "enhanced for loop"],
    correctAnswer: 2,
    explanation: "The do-while loop executes the body first, then checks the condition, ensuring at least one execution."
  },
  {
    id: 17,
    question: "Which keyword is used to exit from a loop in Java?",
    options: ["exit", "break", "continue", "return"],
    correctAnswer: 1,
    explanation: "The 'break' keyword is used to exit from a loop immediately."
  },
  {
    id: 18,
    question: "Which keyword is used to skip the current iteration of a loop?",
    options: ["break", "continue", "skip", "next"],
    correctAnswer: 1,
    explanation: "The 'continue' keyword skips the current iteration and proceeds to the next iteration of the loop."
  },
  {
    id: 19,
    question: "What is the output of: System.out.println(10 > 5 ? \"Yes\" : \"No\");",
    options: ["Yes", "No", "true", "Compilation error"],
    correctAnswer: 0,
    explanation: "This is a ternary operator. Since 10 > 5 is true, it returns \"Yes\"."
  },
  {
    id: 20,
    question: "What is the output of: System.out.println(10 / 0);",
    options: ["0", "Infinity", "ArithmeticException", "Compilation error"],
    correctAnswer: 2,
    explanation: "Dividing by zero throws an ArithmeticException at runtime."
  },
  {
    id: 21,
    question: "In a switch statement, what happens if no case matches and there's no default?",
    options: ["Compilation error", "Runtime error", "Nothing, execution continues", "Exception is thrown"],
    correctAnswer: 2,
    explanation: "If no case matches and there's no default clause, the switch statement does nothing and execution continues after the switch block."
  },
  {
    id: 22,
    question: "What is the difference between 'break' and 'continue' in loops?",
    options: [
      "No difference",
      "break exits the loop, continue skips to next iteration",
      "continue exits the loop, break skips to next iteration",
      "Both exit the loop"
    ],
    correctAnswer: 1,
    explanation: "'break' terminates the entire loop, while 'continue' skips the remaining code in the current iteration and moves to the next iteration."
  },
  {
    id: 23,
    question: "Can you use 'break' outside of a loop or switch statement?",
    options: ["Yes, anywhere", "No, only in loops", "No, only in switch", "No, only in loops and switch"],
    correctAnswer: 3,
    explanation: "The 'break' statement can only be used inside loops (for, while, do-while) or switch statements."
  },
  {
    id: 24,
    question: "What is the output of: for(int i=0; i<3; i++) { if(i==1) continue; System.out.print(i); }",
    options: ["012", "02", "01", "Compilation error"],
    correctAnswer: 1,
    explanation: "When i==1, continue skips the print statement, so only 0 and 2 are printed."
  },
  {
    id: 25,
    question: "What is the output of: for(int i=0; i<3; i++) { if(i==1) break; System.out.print(i); }",
    options: ["012", "0", "01", "Compilation error"],
    correctAnswer: 1,
    explanation: "When i==1, break exits the loop, so only 0 is printed."
  },
  {
    id: 26,
    question: "Which statement is true about if-else if-else chain?",
    options: [
      "All conditions are always evaluated",
      "Only the first true condition's block executes",
      "Multiple blocks can execute",
      "else is mandatory"
    ],
    correctAnswer: 1,
    explanation: "In an if-else if-else chain, only the first condition that evaluates to true will have its block executed, and the rest are skipped."
  },
  {
    id: 27,
    question: "What is the output of: int x = 5; if(x > 3) if(x > 4) System.out.print(\"A\"); else System.out.print(\"B\");",
    options: ["A", "B", "AB", "Nothing"],
    correctAnswer: 0,
    explanation: "The nested if-else structure: x>3 is true, then x>4 is also true, so \"A\" is printed."
  },
  {
    id: 28,
    question: "Can switch statement work with String in Java?",
    options: ["No, only with integers", "Yes, from Java 7 onwards", "Yes, from Java 5", "No, never"],
    correctAnswer: 1,
    explanation: "Switch statement with String was introduced in Java 7. Before that, only primitive types and enums were supported."
  },
  {
    id: 29,
    question: "What happens if you don't use 'break' after a case in switch statement?",
    options: [
      "Compilation error",
      "Only that case executes",
      "Execution falls through to next case",
      "Runtime error"
    ],
    correctAnswer: 2,
    explanation: "Without 'break', execution falls through to the next case(s) until a break is encountered or the switch ends."
  },
  {
    id: 30,
    question: "What is the output of: int i = 0; while(i < 3) { System.out.print(i); i++; }",
    options: ["012", "123", "0123", "Infinite loop"],
    correctAnswer: 0,
    explanation: "The loop executes while i < 3, printing 0, 1, and 2, then stops when i becomes 3."
  },

  // ========== OOPs CONCEPTS (20 questions) ==========
  {
    id: 31,
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    explanation: "The 'extends' keyword is used to create a subclass that inherits from a parent class in Java."
  },
  {
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
    question: "Which keyword is used to prevent method overriding?",
    options: ["static", "final", "private", "abstract"],
    correctAnswer: 1,
    explanation: "The 'final' keyword prevents a method from being overridden in subclasses."
  },
  {
    id: 36,
    question: "Which keyword is used to prevent a class from being inherited?",
    options: ["private", "final", "static", "abstract"],
    correctAnswer: 1,
    explanation: "A 'final' class cannot be extended or inherited by other classes."
  },
  {
    id: 37,
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
    id: 38,
    question: "Which keyword is used to create a method that must be overridden?",
    options: ["final", "static", "abstract", "private"],
    correctAnswer: 2,
    explanation: "An 'abstract' method must be overridden by the subclass that extends the abstract class."
  },
  {
    id: 39,
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
    id: 40,
    question: "Which access modifier allows access within the same package?",
    options: ["private", "public", "protected", "default (no modifier)"],
    correctAnswer: 3,
    explanation: "Default (package-private) access allows access within the same package but not from outside."
  },
  {
    id: 41,
    question: "Which keyword is used to create a variable that can only be accessed within the class?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 0,
    explanation: "The 'private' keyword restricts access to within the same class only."
  },
  {
    id: 42,
    question: "Which keyword is used to create a variable accessible within the package and subclasses?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 2,
    explanation: "The 'protected' keyword allows access within the same package and by subclasses in different packages."
  },
  {
    id: 43,
    question: "Which keyword is used to create a variable accessible from anywhere?",
    options: ["private", "public", "protected", "default"],
    correctAnswer: 1,
    explanation: "The 'public' keyword allows access from anywhere, including other packages."
  },
  {
    id: 44,
    question: "Which keyword is used to create an interface?",
    options: ["interface", "abstract", "class", "implements"],
    correctAnswer: 0,
    explanation: "The 'interface' keyword is used to declare an interface in Java."
  },
  {
    id: 45,
    question: "Which keyword is used to implement an interface?",
    options: ["extends", "implements", "inherits", "uses"],
    correctAnswer: 1,
    explanation: "The 'implements' keyword is used to implement an interface in a class."
  },
  {
    id: 46,
    question: "Can a class implement multiple interfaces in Java?",
    options: ["No, only one", "Yes, multiple interfaces", "Yes, but only two", "Depends on Java version"],
    correctAnswer: 1,
    explanation: "Yes, a class can implement multiple interfaces in Java, which helps achieve multiple inheritance-like behavior."
  },
  {
    id: 47,
    question: "Can a class extend multiple classes in Java?",
    options: ["Yes", "No, only single inheritance", "Yes, but only two", "Depends on Java version"],
    correctAnswer: 1,
    explanation: "No, Java supports only single inheritance for classes. A class can extend only one parent class."
  },
  {
    id: 48,
    question: "What is encapsulation in Java?",
    options: [
      "Hiding implementation details",
      "Binding data and methods together",
      "Restricting access to data",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Encapsulation is the mechanism of wrapping data (variables) and code (methods) together as a single unit and restricting access to data through access modifiers."
  },
  {
    id: 49,
    question: "What is polymorphism in Java?",
    options: [
      "One name, multiple forms",
      "Method overloading and overriding",
      "Ability of an object to take many forms",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Polymorphism allows objects of different types to be accessed through the same interface, achieved through method overloading (compile-time) and method overriding (runtime)."
  },
  {
    id: 50,
    question: "What is the output of: String str = \"Java\"; System.out.println(str == \"Java\");",
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "Due to string interning, string literals with the same value refer to the same object, so == returns true."
  },

  // ========== STRINGS (15 questions) ==========
  {
    id: 51,
    question: "What is the output of: System.out.println(\"Java\".length());",
    options: ["3", "4", "5", "Compilation error"],
    correctAnswer: 1,
    explanation: "The length() method returns the number of characters. \"Java\" has 4 characters."
  },
  {
    id: 52,
    question: "What is the output of: System.out.println(\"Java\".charAt(0));",
    options: ["'J'", "'a'", "0", "1"],
    correctAnswer: 0,
    explanation: "charAt(0) returns the character at index 0, which is 'J'."
  },
  {
    id: 53,
    question: "What is the output of: System.out.println(\"Java\".charAt(4));",
    options: ["'a'", "'J'", "StringIndexOutOfBoundsException", "null"],
    correctAnswer: 2,
    explanation: "The string \"Java\" has indices 0-3. Index 4 is out of bounds, causing StringIndexOutOfBoundsException."
  },
  {
    id: 54,
    question: "What is the output of: System.out.println(\"Java\".substring(0, 2));",
    options: ["He", "Hel", "Hello", "IndexOutOfBoundsException"],
    correctAnswer: 0,
    explanation: "substring(0, 2) returns characters from index 0 to 1 (exclusive of 2), which is \"Ja\"."
  },
  {
    id: 55,
    question: "What is the output of: System.out.println(\"Java\".substring(1));",
    options: ["J", "ava", "Java", "a"],
    correctAnswer: 1,
    explanation: "substring(1) returns the substring starting from index 1 to the end, which is \"ava\"."
  },
  {
    id: 56,
    question: "What is the output of: System.out.println(\"Java\".toUpperCase());",
    options: ["JAVA", "Java", "java", "JAVA"],
    correctAnswer: 0,
    explanation: "toUpperCase() converts all characters in the string to uppercase, resulting in \"JAVA\"."
  },
  {
    id: 57,
    question: "What is the output of: System.out.println(\"Java\".toLowerCase());",
    options: ["java", "Java", "JAVA", "jAvA"],
    correctAnswer: 0,
    explanation: "toLowerCase() converts all characters to lowercase, resulting in \"java\"."
  },
  {
    id: 58,
    question: "What is the output of: System.out.println(\"Hello\".equals(\"hello\"));",
    options: ["true", "false", "Compilation error", "null"],
    correctAnswer: 1,
    explanation: "equals() is case-sensitive. \"Hello\" and \"hello\" are different, so it returns false."
  },
  {
    id: 59,
    question: "What is the output of: System.out.println(\"Java\".equalsIgnoreCase(\"JAVA\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "equalsIgnoreCase() performs case-insensitive comparison, so \"Java\" equals \"JAVA\"."
  },
  {
    id: 60,
    question: "What is the output of: System.out.println(\"Java\".indexOf('a'));",
    options: ["0", "1", "2", "-1"],
    correctAnswer: 1,
    explanation: "indexOf('a') returns the index of the first occurrence of 'a', which is at index 1."
  },
  {
    id: 61,
    question: "What is the output of: System.out.println(\"Java\".lastIndexOf('a'));",
    options: ["1", "2", "3", "-1"],
    correctAnswer: 2,
    explanation: "lastIndexOf('a') returns the index of the last occurrence of 'a', which is at index 3."
  },
  {
    id: 62,
    question: "What is the output of: System.out.println(\"Java\".contains(\"av\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "contains(\"av\") returns true because \"Java\" contains the substring \"av\"."
  },
  {
    id: 63,
    question: "What is the output of: System.out.println(\"Java\".startsWith(\"Ja\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "startsWith(\"Ja\") returns true because \"Java\" starts with \"Ja\"."
  },
  {
    id: 64,
    question: "What is the output of: System.out.println(\"Java\".endsWith(\"va\"));",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "endsWith(\"va\") returns true because \"Java\" ends with \"va\"."
  },
  {
    id: 65,
    question: "What is the output of: System.out.println(\"Java\".concat(\"Script\"));",
    options: ["JavaScript", "Java Script", "Java+Script", "Compilation error"],
    correctAnswer: 0,
    explanation: "concat() concatenates the specified string to the end, resulting in \"JavaScript\"."
  },

  // ========== ARRAYS (15 questions) ==========
  {
    id: 66,
    question: "What is the output of: int[] arr = new int[5]; System.out.println(arr[0]);",
    options: ["0", "null", "undefined", "ArrayIndexOutOfBoundsException"],
    correctAnswer: 0,
    explanation: "Array elements are initialized to default values. For int arrays, the default value is 0."
  },
  {
    id: 67,
    question: "Which method is used to get the length of an array in Java?",
    options: [".length()", ".length", ".size()", ".count()"],
    correctAnswer: 1,
    explanation: "Arrays use the '.length' property (not a method) to get the number of elements."
  },
  {
    id: 68,
    question: "What is the output of: int[] arr = {1, 2, 3}; System.out.println(arr.length);",
    options: ["2", "3", "4", "Compilation error"],
    correctAnswer: 1,
    explanation: "The array has 3 elements, so arr.length returns 3."
  },
  {
    id: 69,
    question: "Can you change the size of an array after it's created in Java?",
    options: ["Yes, always", "No, arrays are fixed size", "Yes, using resize()", "Only for String arrays"],
    correctAnswer: 1,
    explanation: "No, arrays in Java have a fixed size once created. To change size, you need to create a new array."
  },
  {
    id: 70,
    question: "What is the output of: int[][] arr = new int[2][3]; System.out.println(arr.length);",
    options: ["2", "3", "6", "Compilation error"],
    correctAnswer: 0,
    explanation: "For a 2D array, arr.length returns the number of rows (first dimension), which is 2."
  },
  {
    id: 71,
    question: "What is the output of: int[][] arr = {{1,2}, {3,4,5}}; System.out.println(arr[1].length);",
    options: ["2", "3", "4", "Compilation error"],
    correctAnswer: 1,
    explanation: "arr[1] refers to the second row {3,4,5}, which has length 3."
  },
  {
    id: 72,
    question: "What is a jagged array in Java?",
    options: [
      "An array with different row sizes",
      "An array with same row sizes",
      "A 1D array",
      "An array that cannot be created"
    ],
    correctAnswer: 0,
    explanation: "A jagged array (ragged array) is a 2D array where rows can have different lengths."
  },
  {
    id: 73,
    question: "What is the output of: int[] arr = new int[0]; System.out.println(arr.length);",
    options: ["0", "1", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    explanation: "An array with size 0 is valid in Java and has length 0."
  },
  {
    id: 74,
    question: "What is the default value of elements in a boolean array?",
    options: ["true", "false", "null", "undefined"],
    correctAnswer: 1,
    explanation: "Boolean array elements default to 'false' if not explicitly initialized."
  },
  {
    id: 75,
    question: "What is the default value of elements in a String array?",
    options: ["\"\"", "null", "\"null\"", "undefined"],
    correctAnswer: 1,
    explanation: "String array elements default to 'null' since String is a reference type."
  },
  {
    id: 76,
    question: "Can you use enhanced for loop with arrays?",
    options: ["No", "Yes, from Java 5", "Yes, from Java 8", "Only for 1D arrays"],
    correctAnswer: 1,
    explanation: "Enhanced for loop (for-each) was introduced in Java 5 and can be used with arrays and collections."
  },
  {
    id: 77,
    question: "What is the output of: int[] arr = {1, 2, 3}; for(int x : arr) System.out.print(x);",
    options: ["123", "012", "1 2 3", "Compilation error"],
    correctAnswer: 0,
    explanation: "Enhanced for loop iterates through array elements, printing 1, 2, and 3 without spaces."
  },
  {
    id: 78,
    question: "What happens if you access an array index that doesn't exist?",
    options: [
      "Returns null",
      "Returns 0",
      "Throws ArrayIndexOutOfBoundsException",
      "Compilation error"
    ],
    correctAnswer: 2,
    explanation: "Accessing an invalid array index throws ArrayIndexOutOfBoundsException at runtime."
  },
  {
    id: 79,
    question: "Can arrays store primitive types in Java?",
    options: ["No, only objects", "Yes, primitives and objects", "Only primitives", "Depends on array type"],
    correctAnswer: 1,
    explanation: "Arrays in Java can store both primitive types (int, char, boolean, etc.) and objects (String, custom classes, etc.)."
  },
  {
    id: 80,
    question: "What is the output of: int[] arr1 = {1, 2}; int[] arr2 = arr1; arr2[0] = 5; System.out.println(arr1[0]);",
    options: ["1", "5", "2", "Compilation error"],
    correctAnswer: 1,
    explanation: "arr2 and arr1 reference the same array object. Changing arr2[0] also changes arr1[0] to 5."
  },

  // ========== EXCEPTIONS (15 questions) ==========
  {
    id: 81,
    question: "What is the output of: String s = null; System.out.println(s.length());",
    options: ["0", "null", "NullPointerException", "Compilation error"],
    correctAnswer: 2,
    explanation: "Calling a method on a null reference throws a NullPointerException at runtime."
  },
  {
    id: 82,
    question: "Which keyword is used to handle exceptions in Java?",
    options: ["try", "catch", "throw", "All of the above"],
    correctAnswer: 3,
    explanation: "try, catch, and throw are all keywords used in exception handling in Java."
  },
  {
    id: 83,
    question: "What is the purpose of the 'finally' block?",
    options: [
      "To catch exceptions",
      "To execute code regardless of exception",
      "To throw exceptions",
      "To skip exception handling"
    ],
    correctAnswer: 1,
    explanation: "The 'finally' block always executes, whether an exception occurs or not, making it useful for cleanup code."
  },
  {
    id: 84,
    question: "Can you have a try block without catch or finally?",
    options: ["Yes", "No, must have catch", "No, must have finally", "No, must have catch or finally"],
    correctAnswer: 3,
    explanation: "A try block must be followed by either a catch block, a finally block, or both."
  },
  {
    id: 85,
    question: "What is the output of: try { int x = 10/0; } catch(ArithmeticException e) { System.out.print(\"A\"); } catch(Exception e) { System.out.print(\"B\"); }",
    options: ["A", "B", "AB", "Compilation error"],
    correctAnswer: 0,
    explanation: "ArithmeticException is caught first, so \"A\" is printed. More specific exceptions should be caught before general ones."
  },
  {
    id: 86,
    question: "What is the difference between 'throw' and 'throws'?",
    options: [
      "No difference",
      "throw is used to throw exception, throws declares exception",
      "throws is used to throw exception, throw declares exception",
      "Both are same"
    ],
    correctAnswer: 1,
    explanation: "'throw' is used to explicitly throw an exception, while 'throws' is used in method signature to declare that the method may throw exceptions."
  },
  {
    id: 87,
    question: "Can you throw a checked exception without declaring it in throws clause?",
    options: ["Yes, always", "No, must declare", "Yes, if caught", "Only for unchecked exceptions"],
    correctAnswer: 1,
    explanation: "Checked exceptions must be either caught or declared in the throws clause of the method signature."
  },
  {
    id: 88,
    question: "Which of these is a checked exception?",
    options: ["NullPointerException", "ArithmeticException", "IOException", "RuntimeException"],
    correctAnswer: 2,
    explanation: "IOException is a checked exception. NullPointerException, ArithmeticException, and RuntimeException are unchecked exceptions."
  },
  {
    id: 89,
    question: "What is the output of: try { return 1; } finally { return 2; }",
    options: ["1", "2", "Compilation error", "Runtime error"],
    correctAnswer: 1,
    explanation: "If finally block has a return statement, it overrides the return value from try block. So 2 is returned."
  },
  {
    id: 90,
    question: "Can you have multiple catch blocks for a single try block?",
    options: ["No", "Yes, multiple catch blocks", "Yes, but only two", "Only for different exception types"],
    correctAnswer: 1,
    explanation: "Yes, you can have multiple catch blocks for different exception types, but more specific exceptions should come first."
  },
  {
    id: 91,
    question: "What is a custom exception in Java?",
    options: [
      "An exception defined by Java",
      "A user-defined exception class",
      "An exception that never occurs",
      "A built-in exception"
    ],
    correctAnswer: 1,
    explanation: "A custom exception is a user-defined exception class that extends Exception or RuntimeException to create application-specific exceptions."
  },
  {
    id: 92,
    question: "What is the parent class of all exceptions in Java?",
    options: ["Error", "Exception", "Throwable", "RuntimeException"],
    correctAnswer: 2,
    explanation: "Throwable is the parent class of all errors and exceptions in Java. Exception and Error both extend Throwable."
  },
  {
    id: 93,
    question: "What is the difference between Error and Exception?",
    options: [
      "No difference",
      "Errors are recoverable, Exceptions are not",
      "Errors are serious system problems, Exceptions are recoverable",
      "Both are same"
    ],
    correctAnswer: 2,
    explanation: "Errors represent serious system problems (like OutOfMemoryError) that are usually not recoverable. Exceptions represent conditions that can be caught and handled."
  },
  {
    id: 94,
    question: "Can you catch an Error in Java?",
    options: ["No, never", "Yes, but not recommended", "Yes, always recommended", "Only in finally block"],
    correctAnswer: 1,
    explanation: "Technically yes, you can catch an Error, but it's not recommended as Errors represent serious system problems that usually shouldn't be caught."
  },
  {
    id: 95,
    question: "What is the output of: try { int[] arr = new int[-1]; } catch(NegativeArraySizeException e) { System.out.print(\"Caught\"); }",
    options: ["Caught", "Runtime error", "Compilation error", "Nothing"],
    correctAnswer: 0,
    explanation: "Creating an array with negative size throws NegativeArraySizeException, which is caught and \"Caught\" is printed."
  },

  // ========== COLLECTIONS (20 questions) ==========
  {
    id: 96,
    question: "Which collection class is synchronized in Java?",
    options: ["ArrayList", "HashMap", "Vector", "HashSet"],
    correctAnswer: 2,
    explanation: "Vector is a synchronized collection class in Java, making it thread-safe but slower than ArrayList."
  },
  {
    id: 97,
    question: "Which collection does not allow duplicate elements?",
    options: ["ArrayList", "LinkedList", "HashSet", "HashMap"],
    correctAnswer: 2,
    explanation: "HashSet is a Set implementation that does not allow duplicate elements."
  },
  {
    id: 98,
    question: "Which collection maintains insertion order?",
    options: ["HashSet", "TreeSet", "LinkedHashSet", "HashMap"],
    correctAnswer: 2,
    explanation: "LinkedHashSet maintains the insertion order of elements while providing Set functionality."
  },
  {
    id: 99,
    question: "Which collection is sorted by default?",
    options: ["HashSet", "LinkedHashSet", "TreeSet", "ArrayList"],
    correctAnswer: 2,
    explanation: "TreeSet maintains elements in sorted order (natural ordering or by Comparator)."
  },
  {
    id: 100,
    question: "Which interface allows duplicate elements?",
    options: ["Set", "List", "Map", "Queue"],
    correctAnswer: 1,
    explanation: "List interface allows duplicate elements, while Set does not."
  },
  {
    id: 101,
    question: "Which interface is used for key-value pairs?",
    options: ["List", "Set", "Map", "Queue"],
    correctAnswer: 2,
    explanation: "Map interface is used to store key-value pairs."
  },
  {
    id: 102,
    question: "Which interface is implemented by all collection classes?",
    options: ["Collection", "List", "Set", "Map"],
    correctAnswer: 0,
    explanation: "The Collection interface is the root interface for all collection classes (except Map)."
  },
  {
    id: 103,
    question: "Which collection does not maintain insertion order?",
    options: ["ArrayList", "LinkedList", "HashSet", "LinkedHashSet"],
    correctAnswer: 2,
    explanation: "HashSet does not maintain insertion order, while LinkedHashSet does."
  },
  {
    id: 104,
    question: "Which method is used to add an element to an ArrayList?",
    options: [".add()", ".insert()", ".append()", ".put()"],
    correctAnswer: 0,
    explanation: "The add() method is used to add elements to an ArrayList."
  },
  {
    id: 105,
    question: "Which method is used to get the size of an ArrayList?",
    options: [".length()", ".length", ".size()", ".count()"],
    correctAnswer: 2,
    explanation: "ArrayList uses the size() method to get the number of elements."
  },
  {
    id: 106,
    question: "Which method is used to get an element from an ArrayList by index?",
    options: [".get()", ".element()", ".at()", ".retrieve()"],
    correctAnswer: 0,
    explanation: "The get(index) method is used to retrieve an element from an ArrayList at the specified index."
  },
  {
    id: 107,
    question: "Which method is used to remove an element from an ArrayList?",
    options: [".remove()", ".delete()", ".clear()", ".erase()"],
    correctAnswer: 0,
    explanation: "The remove() method is used to remove an element from an ArrayList."
  },
  {
    id: 108,
    question: "Which method is used to check if an ArrayList contains an element?",
    options: [".contains()", ".has()", ".includes()", ".find()"],
    correctAnswer: 0,
    explanation: "The contains() method returns true if the ArrayList contains the specified element."
  },
  {
    id: 109,
    question: "Which method is used to check if an ArrayList is empty?",
    options: [".isEmpty()", ".empty()", ".isNull()", ".hasElements()"],
    correctAnswer: 0,
    explanation: "The isEmpty() method returns true if the ArrayList contains no elements."
  },
  {
    id: 110,
    question: "Which collection allows null values?",
    options: ["HashSet", "TreeSet", "ArrayList", "All of the above"],
    correctAnswer: 3,
    explanation: "HashSet, TreeSet (with caution), and ArrayList all allow null values."
  },
  {
    id: 111,
    question: "What is the difference between ArrayList and LinkedList?",
    options: [
      "No difference",
      "ArrayList uses array, LinkedList uses nodes",
      "LinkedList is faster for insertion/deletion",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "ArrayList uses dynamic array internally, while LinkedList uses doubly-linked list. LinkedList is faster for insertion/deletion in the middle."
  },
  {
    id: 112,
    question: "What is the difference between HashMap and Hashtable?",
    options: [
      "No difference",
      "HashMap is synchronized, Hashtable is not",
      "Hashtable is synchronized, HashMap is not",
      "Hashtable allows null keys"
    ],
    correctAnswer: 2,
    explanation: "Hashtable is synchronized (thread-safe) and doesn't allow null keys/values. HashMap is not synchronized and allows one null key."
  },
  {
    id: 113,
    question: "Which collection is thread-safe?",
    options: ["ArrayList", "HashMap", "Vector", "HashSet"],
    correctAnswer: 2,
    explanation: "Vector is synchronized and thread-safe, unlike ArrayList, HashMap, and HashSet."
  },
  {
    id: 114,
    question: "What is the purpose of Iterator in Collections?",
    options: [
      "To add elements",
      "To iterate through collection elements",
      "To remove all elements",
      "To sort elements"
    ],
    correctAnswer: 1,
    explanation: "Iterator is used to traverse through collection elements in a safe manner, allowing removal during iteration."
  },
  {
    id: 115,
    question: "Can you modify a collection while iterating using enhanced for loop?",
    options: ["Yes, always", "No, throws ConcurrentModificationException", "Yes, but only add", "Only for ArrayList"],
    correctAnswer: 1,
    explanation: "Modifying a collection (except through Iterator's remove()) while iterating with enhanced for loop throws ConcurrentModificationException."
  },

  // ========== MULTITHREADING (15 questions) ==========
  {
    id: 116,
    question: "Which method is used to start a thread in Java?",
    options: ["run()", "start()", "begin()", "execute()"],
    correctAnswer: 1,
    explanation: "The start() method is used to start a new thread. It calls the run() method internally."
  },
  {
    id: 117,
    question: "Which interface must be implemented to use threads in Java?",
    options: ["Thread", "Runnable", "Executable", "Callable"],
    correctAnswer: 1,
    explanation: "The Runnable interface must be implemented to create a thread. It contains the run() method."
  },
  {
    id: 118,
    question: "Which method is used to get the current thread in Java?",
    options: ["getThread()", "currentThread()", "getCurrentThread()", "Thread.currentThread()"],
    correctAnswer: 3,
    explanation: "Thread.currentThread() is a static method that returns a reference to the currently executing thread."
  },
  {
    id: 119,
    question: "What is the difference between start() and run() methods?",
    options: [
      "No difference",
      "start() creates new thread, run() executes in current thread",
      "run() creates new thread, start() executes in current thread",
      "Both create new threads"
    ],
    correctAnswer: 1,
    explanation: "start() creates a new thread and calls run() in that thread. Calling run() directly executes it in the current thread without creating a new thread."
  },
  {
    id: 120,
    question: "What is thread synchronization in Java?",
    options: [
      "Running threads in sequence",
      "Coordinating access to shared resources",
      "Stopping all threads",
      "Creating multiple threads"
    ],
    correctAnswer: 1,
    explanation: "Thread synchronization is the mechanism to coordinate access to shared resources to prevent race conditions and ensure thread safety."
  },
  {
    id: 121,
    question: "Which keyword is used for thread synchronization?",
    options: ["sync", "synchronized", "lock", "mutex"],
    correctAnswer: 1,
    explanation: "The 'synchronized' keyword is used to create synchronized methods or blocks to ensure thread safety."
  },
  {
    id: 122,
    question: "What is a deadlock in multithreading?",
    options: [
      "When a thread stops",
      "When threads wait for each other indefinitely",
      "When thread completes execution",
      "When thread is interrupted"
    ],
    correctAnswer: 1,
    explanation: "Deadlock occurs when two or more threads are blocked forever, waiting for each other to release resources."
  },
  {
    id: 123,
    question: "What is the life cycle of a thread?",
    options: [
      "New, Running, Terminated",
      "New, Runnable, Running, Blocked, Terminated",
      "Created, Started, Stopped",
      "Init, Start, End"
    ],
    correctAnswer: 1,
    explanation: "Thread states: New (created), Runnable (ready to run), Running (executing), Blocked/Waiting (waiting for resource), Terminated (completed)."
  },
  {
    id: 124,
    question: "Can a thread be started twice?",
    options: ["Yes, multiple times", "No, throws IllegalThreadStateException", "Yes, but only twice", "Depends on thread type"],
    correctAnswer: 1,
    explanation: "No, once a thread has been started and completed, it cannot be started again. Attempting to do so throws IllegalThreadStateException."
  },
  {
    id: 125,
    question: "What is the difference between wait() and sleep()?",
    options: [
      "No difference",
      "wait() releases lock, sleep() doesn't",
      "sleep() releases lock, wait() doesn't",
      "Both release lock"
    ],
    correctAnswer: 1,
    explanation: "wait() releases the object lock and waits for notification. sleep() doesn't release any locks and just pauses execution."
  },
  {
    id: 126,
    question: "What is the purpose of notify() and notifyAll() methods?",
    options: [
      "To stop threads",
      "To wake up waiting threads",
      "To create new threads",
      "To interrupt threads"
    ],
    correctAnswer: 1,
    explanation: "notify() wakes up one waiting thread, notifyAll() wakes up all waiting threads that are waiting on the same object's monitor."
  },
  {
    id: 127,
    question: "What is a daemon thread in Java?",
    options: [
      "A thread that runs forever",
      "A low-priority background thread",
      "A thread that cannot be stopped",
      "A main thread"
    ],
    correctAnswer: 1,
    explanation: "A daemon thread is a background thread that provides services to user threads. JVM terminates when all user threads finish, even if daemon threads are running."
  },
  {
    id: 128,
    question: "What is thread priority in Java?",
    options: [
      "Order of thread execution",
      "Importance level (1-10) for thread scheduling",
      "Speed of thread execution",
      "Memory allocated to thread"
    ],
    correctAnswer: 1,
    explanation: "Thread priority is an integer value (1-10) that suggests to the JVM the importance of a thread for scheduling. Higher priority threads are more likely to be scheduled."
  },
  {
    id: 129,
    question: "What is the default priority of a thread?",
    options: ["1", "5", "10", "0"],
    correctAnswer: 1,
    explanation: "The default priority of a thread is 5 (NORM_PRIORITY). MIN_PRIORITY is 1, MAX_PRIORITY is 10."
  },
  {
    id: 130,
    question: "Can you extend Thread class and implement Runnable interface at the same time?",
    options: ["No, not possible", "Yes, but not recommended", "Yes, always recommended", "Only in Java 8+"],
    correctAnswer: 1,
    explanation: "Yes, technically possible, but not recommended. It's better to implement Runnable interface for flexibility, as Java doesn't support multiple inheritance."
  },

  // ========== ADVANCED TOPICS - SYNCHRONIZATION & SERIALIZATION (10 questions) ==========
  {
    id: 131,
    question: "What is synchronization in Java?",
    options: [
      "Running code in sequence",
      "Controlling access to shared resources by multiple threads",
      "Synchronizing system clock",
      "Matching data types"
    ],
    correctAnswer: 1,
    explanation: "Synchronization is the mechanism to control access to shared resources by multiple threads to prevent race conditions and ensure data consistency."
  },
  {
    id: 132,
    question: "What is a synchronized method?",
    options: [
      "A method that runs faster",
      "A method that can be accessed by only one thread at a time",
      "A method that runs in sequence",
      "A static method"
    ],
    correctAnswer: 1,
    explanation: "A synchronized method can be accessed by only one thread at a time, ensuring thread safety for the method's code."
  },
  {
    id: 133,
    question: "What is a synchronized block?",
    options: [
      "A block of code that runs faster",
      "A block of code synchronized on an object",
      "A try-catch block",
      "A finally block"
    ],
    correctAnswer: 1,
    explanation: "A synchronized block is a section of code synchronized on a specific object, providing more granular control than synchronized methods."
  },
  {
    id: 134,
    question: "What is serialization in Java?",
    options: [
      "Converting object to byte stream",
      "Converting byte stream to object",
      "Storing object in database",
      "Printing object to console"
    ],
    correctAnswer: 0,
    explanation: "Serialization is the process of converting an object into a byte stream so it can be saved to a file, sent over network, or stored in database."
  },
  {
    id: 135,
    question: "What is deserialization in Java?",
    options: [
      "Converting object to byte stream",
      "Converting byte stream back to object",
      "Deleting an object",
      "Cloning an object"
    ],
    correctAnswer: 1,
    explanation: "Deserialization is the reverse process of serialization - converting a byte stream back into an object."
  },
  {
    id: 136,
    question: "Which interface must be implemented for serialization?",
    options: ["Serializable", "Cloneable", "Comparable", "Runnable"],
    correctAnswer: 0,
    explanation: "A class must implement the Serializable interface (marker interface) to allow its objects to be serialized."
  },
  {
    id: 137,
    question: "What is transient keyword in serialization?",
    options: [
      "Makes variable serializable",
      "Prevents variable from being serialized",
      "Makes variable static",
      "Makes variable final"
    ],
    correctAnswer: 1,
    explanation: "The 'transient' keyword is used to mark variables that should not be serialized when the object is serialized."
  },
  {
    id: 138,
    question: "What is static variable serialization behavior?",
    options: [
      "Static variables are serialized",
      "Static variables are not serialized",
      "Static variables are always transient",
      "Depends on access modifier"
    ],
    correctAnswer: 1,
    explanation: "Static variables are not serialized because they belong to the class, not to individual object instances."
  },
  {
    id: 139,
    question: "What happens if a parent class is not serializable but child class is?",
    options: [
      "Compilation error",
      "Child can be serialized, parent fields use default values",
      "Both must be serializable",
      "Runtime error"
    ],
    correctAnswer: 1,
    explanation: "If parent class is not serializable, its fields are not serialized and will have default values when deserialized. Child class can still be serialized."
  },
  {
    id: 140,
    question: "What is the purpose of serialVersionUID?",
    options: [
      "To identify serialized object version",
      "To speed up serialization",
      "To encrypt serialized data",
      "To compress serialized data"
    ],
    correctAnswer: 0,
    explanation: "serialVersionUID is used to ensure that the same class version is used during serialization and deserialization, preventing InvalidClassException."
  },

  // ========== STRINGBUFFER & STRINGBUILDER (10 questions) ==========
  {
    id: 141,
    question: "What is the difference between String and StringBuffer?",
    options: [
      "No difference",
      "String is immutable, StringBuffer is mutable",
      "StringBuffer is immutable, String is mutable",
      "Both are mutable"
    ],
    correctAnswer: 1,
    explanation: "String objects are immutable (cannot be changed), while StringBuffer objects are mutable (can be modified)."
  },
  {
    id: 142,
    question: "What is the difference between StringBuffer and StringBuilder?",
    options: [
      "No difference",
      "StringBuffer is synchronized, StringBuilder is not",
      "StringBuilder is synchronized, StringBuffer is not",
      "StringBuilder is faster"
    ],
    correctAnswer: 1,
    explanation: "StringBuffer is synchronized (thread-safe) but slower. StringBuilder is not synchronized (not thread-safe) but faster. Both are mutable."
  },
  {
    id: 143,
    question: "When should you use StringBuilder over StringBuffer?",
    options: [
      "Always use StringBuilder",
      "When thread safety is not required",
      "When thread safety is required",
      "Never use StringBuilder"
    ],
    correctAnswer: 1,
    explanation: "Use StringBuilder when you don't need thread safety and want better performance. Use StringBuffer when thread safety is required."
  },
  {
    id: 144,
    question: "What is the default capacity of StringBuffer?",
    options: ["10", "16", "32", "0"],
    correctAnswer: 1,
    explanation: "The default capacity of StringBuffer (and StringBuilder) is 16 characters."
  },
  {
    id: 145,
    question: "What method is used to append to StringBuffer?",
    options: [".add()", ".append()", ".concat()", ".insert()"],
    correctAnswer: 1,
    explanation: "The append() method is used to add characters or strings to the end of a StringBuffer or StringBuilder."
  },
  {
    id: 146,
    question: "What method is used to reverse a StringBuffer?",
    options: [".reverse()", ".flip()", ".invert()", ".swap()"],
    correctAnswer: 0,
    explanation: "The reverse() method reverses the character sequence in a StringBuffer or StringBuilder."
  },
  {
    id: 147,
    question: "Can you convert StringBuffer to String?",
    options: ["No", "Yes, using toString()", "Yes, using valueOf()", "Only using constructor"],
    correctAnswer: 1,
    explanation: "Yes, you can convert StringBuffer to String using the toString() method."
  },
  {
    id: 148,
    question: "What is the output of: StringBuffer sb = new StringBuffer(\"Java\"); sb.append(\"Script\"); System.out.println(sb);",
    options: ["Java", "Script", "JavaScript", "JavaScript"],
    correctAnswer: 2,
    explanation: "append() adds \"Script\" to \"Java\", resulting in \"JavaScript\"."
  },
  {
    id: 149,
    question: "What is the output of: StringBuilder sb = new StringBuilder(\"Hello\"); sb.reverse(); System.out.println(sb);",
    options: ["Hello", "olleH", "HELLO", "hello"],
    correctAnswer: 1,
    explanation: "reverse() reverses the character sequence, so \"Hello\" becomes \"olleH\"."
  },
  {
    id: 150,
    question: "Which is more memory efficient for string concatenation in loops?",
    options: ["String", "StringBuffer", "StringBuilder", "Both StringBuffer and StringBuilder"],
    correctAnswer: 3,
    explanation: "String concatenation in loops creates many temporary objects. StringBuffer and StringBuilder are more memory efficient as they modify the same object."
  }
];

// Function to randomly select 20 questions
export const getRandomQuestions = () => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
};
