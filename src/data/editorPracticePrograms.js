/**
 * Named practice snippets for the live editor sidebar.
 * In "Screen share" mode the sidebar is hidden so viewers do not see titles or full templates.
 */

export const EDITOR_PRACTICE_PROGRAMS = [
  {
    id: 'java-string-reverse',
    label: 'Reverse a string',
    language: 'java',
    code: `public class Main {
  public static void main(String[] args) {
    String s = "LearnStackHub";
    String reversed = new StringBuilder(s).reverse().toString();
    System.out.println("Original: " + s);
    System.out.println("Reversed: " + reversed);
  }
}`,
  },
  {
    id: 'java-array-swap',
    label: 'Swap two array elements',
    language: 'java',
    code: `public class Main {
  public static void main(String[] args) {
    int[] arr = { 10, 20, 30, 40 };
    int i = 1, j = 3;
    System.out.println("Before: " + java.util.Arrays.toString(arr));
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    System.out.println("After:  " + java.util.Arrays.toString(arr));
  }
}`,
  },
  {
    id: 'java-palindrome',
    label: 'Check palindrome string',
    language: 'java',
    code: `public class Main {
  public static void main(String[] args) {
    String s = "racecar";
    String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    boolean ok = clean.equals(new StringBuilder(clean).reverse().toString());
    System.out.println(s + " -> palindrome? " + ok);
  }
}`,
  },
  {
    id: 'java-factorial',
    label: 'Factorial (n)',
    language: 'java',
    code: `public class Main {
  static long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
  }
  public static void main(String[] args) {
    int n = 6;
    System.out.println("factorial(" + n + ") = " + fact(n));
  }
}`,
  },
  {
    id: 'html-simple-card',
    label: 'HTML: simple card',
    language: 'html',
    code: `<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui; padding: 24px; background: #0f172a; color: #e2e8f0; }
      .card { max-width: 360px; padding: 16px; border-radius: 12px; background: #1e293b; border: 1px solid #334155; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2 style="margin:0 0 8px;">Title</h2>
      <p style="margin:0;">Edit this card layout.</p>
    </div>
  </body>
</html>`,
  },
  {
    id: 'mysql-join-sample',
    label: 'MySQL: join sample',
    language: 'mysql',
    code: `-- Sample join
CREATE TABLE orders (id INT, user_id INT, amount INT);
CREATE TABLE users (id INT, name STRING);
INSERT INTO users VALUES (1, 'Asha'), (2, 'Rahul');
INSERT INTO orders VALUES (101, 1, 50), (102, 1, 30), (103, 2, 80);
SELECT u.name, SUM(o.amount) AS total
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.name;`,
  },
];
