const queueInterface = {
  id: 'queue-interface',
  title: 'Queue Interface',
  description: 'First-In-First-Out (FIFO) collections',
  content: `
# Queue Interface — First In, First Out

A Queue is like a line at a coffee shop — the first person in line gets served first. This is called FIFO (First-In-First-Out). Queues are essential for task scheduling, message processing, and managing ordered workflows.

---

## Queue Characteristics

- **FIFO ordering** — First element added is first removed
- **Two ends** — Add at tail, remove from head
- **No random access** — Can only access head element
- **Null handling** — Most implementations don't allow null

---

## Queue Operations

Queues have two sets of methods — one throws exceptions, one returns special values:

| Operation | Throws Exception | Returns Special Value |
|-----------|------------------|----------------------|
| Insert | add(e) | offer(e) → true/false |
| Remove | remove() | poll() → element/null |
| Examine | element() | peek() → element/null |

**Recommendation:** Use \`offer\`, \`poll\`, \`peek\` — they're safer.

---

## Queue Implementations

### LinkedList
- **Implements:** Queue, Deque, List
- **Best for:** General purpose queue

\`\`\`java
Queue<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
String head = queue.poll();  // "First"
\`\`\`

### PriorityQueue
- **Order:** By priority (natural order or Comparator)
- **Best for:** Task scheduling, event processing

\`\`\`java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
pq.poll();  // 10 (smallest first)
\`\`\`

### ArrayDeque
- **Implements:** Deque (double-ended queue)
- **Best for:** Stack or queue operations, faster than LinkedList

\`\`\`java
Deque<String> deque = new ArrayDeque<>();
deque.offerFirst("First");  // Add to front
deque.offerLast("Last");    // Add to back
\`\`\`

---

## Basic Queue Operations

\`\`\`java
Queue<String> queue = new LinkedList<>();

// Adding elements
queue.offer("Task 1");
queue.offer("Task 2");
queue.offer("Task 3");

// Examining head (without removing)
String head = queue.peek();  // "Task 1"

// Removing head
String removed = queue.poll();  // "Task 1"

// Check size
int size = queue.size();
boolean empty = queue.isEmpty();
\`\`\`

---

## PriorityQueue — Ordered by Priority

Elements are ordered by natural ordering or a custom Comparator:

\`\`\`java
// Natural ordering (smallest first)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
// poll() returns: 1, 3, 5

// Reverse ordering (largest first)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(5);
maxHeap.offer(1);
maxHeap.offer(3);
// poll() returns: 5, 3, 1

// Custom ordering
PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparing(Task::getPriority)
);
\`\`\`

---

## Deque — Double-Ended Queue

A Deque (pronounced "deck") allows insertion and removal at both ends:

\`\`\`java
Deque<String> deque = new ArrayDeque<>();

// Add to front
deque.offerFirst("A");
deque.addFirst("B");

// Add to back
deque.offerLast("C");
deque.addLast("D");

// Remove from front
deque.pollFirst();
deque.removeFirst();

// Remove from back
deque.pollLast();
deque.removeLast();

// Peek at both ends
deque.peekFirst();
deque.peekLast();
\`\`\`

### Using Deque as Stack

\`\`\`java
Deque<String> stack = new ArrayDeque<>();
stack.push("First");   // Same as addFirst
stack.push("Second");
stack.pop();           // Same as removeFirst → "Second"
stack.peek();          // Same as peekFirst → "First"
\`\`\`

---

## Real-World Example: Task Scheduler

\`\`\`java
public class TaskScheduler {
    private PriorityQueue<Task> taskQueue;
    
    public TaskScheduler() {
        // Higher priority (lower number) first
        taskQueue = new PriorityQueue<>(
            Comparator.comparingInt(Task::getPriority)
        );
    }
    
    public void addTask(String name, int priority) {
        taskQueue.offer(new Task(name, priority));
    }
    
    public void processNext() {
        Task task = taskQueue.poll();
        if (task != null) {
            System.out.println("Processing: " + task.getName());
        }
    }
    
    public void processAll() {
        while (!taskQueue.isEmpty()) {
            processNext();
        }
    }
}
\`\`\`

---

## Real-World Example: Print Queue

\`\`\`java
public class PrintQueue {
    private Queue<PrintJob> queue = new LinkedList<>();
    
    public void addJob(String document, int pages) {
        queue.offer(new PrintJob(document, pages));
        System.out.println("Added to queue: " + document);
    }
    
    public void printNext() {
        PrintJob job = queue.poll();
        if (job != null) {
            System.out.println("Printing: " + job.document + 
                             " (" + job.pages + " pages)");
        } else {
            System.out.println("Queue is empty");
        }
    }
    
    public int getQueueSize() {
        return queue.size();
    }
}
\`\`\`

---

## Real-World Example: Browser History (Deque)

\`\`\`java
public class BrowserHistory {
    private Deque<String> backStack = new ArrayDeque<>();
    private Deque<String> forwardStack = new ArrayDeque<>();
    private String currentPage;
    
    public void visit(String url) {
        if (currentPage != null) {
            backStack.push(currentPage);
        }
        currentPage = url;
        forwardStack.clear();  // Clear forward history
    }
    
    public void back() {
        if (!backStack.isEmpty()) {
            forwardStack.push(currentPage);
            currentPage = backStack.pop();
        }
    }
    
    public void forward() {
        if (!forwardStack.isEmpty()) {
            backStack.push(currentPage);
            currentPage = forwardStack.pop();
        }
    }
}
\`\`\`

---

## When to Use Which

| Use Case | Best Choice |
|----------|-------------|
| Simple FIFO queue | LinkedList or ArrayDeque |
| Priority-based processing | PriorityQueue |
| Stack operations | ArrayDeque |
| Double-ended operations | ArrayDeque |
| Thread-safe queue | ConcurrentLinkedQueue |
| Blocking queue | LinkedBlockingQueue |

---

## 10 Important Queue Interface Interview Questions

### 1. What operations does Queue add beyond Collection?
**Answer:** \`offer/poll/peek\` (non-throwing) vs \`add/remove/element\` (throwing)—choose for bounded queues handling backpressure.
Critical in producer-consumer systems.

### 2. LinkedList as Queue—still recommended?
**Answer:** Works but often \`ArrayDeque\` is faster for deque operations without null elements—prefer \`ArrayDeque\` as queue.
LinkedList poor cache locality.

### 3. What is PriorityQueue?
**Answer:** Min-heap by natural order or comparator—head is least element—O(log n) insert/remove—unbounded.
Not thread-safe—\`PriorityBlockingQueue\` for concurrency.

### 4. Scenario: task scheduling by deadline—what queue fits?
**Answer:** \`PriorityQueue\` or time-wheel structures for efficiency at scale—simple cases use \`PriorityQueue\` of tasks.
Know delayed and scheduled executors built atop.

### 5. BlockingQueue vs Queue?
**Answer:** \`put/take\` block when full/empty—essential for backpressure—\`ArrayBlockingQueue\`, \`LinkedBlockingQueue\`.
Producer-consumer pipelines.

### 6. What is \`Deque\` double-ended queue?
**Answer:** Add/remove both ends—stack (\`push/pop\`) and queue—\`ArrayDeque\` preferred over \`Stack\` class.
Stack extends Vector—legacy.

### 7. Why avoid \`Stack\` class?
**Answer:** Legacy synchronized vector-based—use \`Deque\`—better performance and clearer API.
Interview historical note.

### 8. What is \`ConcurrentLinkedQueue\`?
**Answer:** Lock-free non-blocking queue—high concurrency—weak consistency size—good for MPMC in some patterns.
Understand memory ordering costs.

### 9. Bounded vs unbounded queue risk?
**Answer:** Unbounded queues hide overload—OOM risk—bounded with rejection policies or backpressure in reactive systems.
Resilience engineering.

### 10. FIFO guarantee always?
**Answer:** \`PriorityQueue\` not FIFO by arrival—\`LinkedBlockingQueue\` FIFO—choose semantics carefully.
Fairness vs priority trade-off.
---

## Topic-Focused Practice for Queue Interface

### Real-World Scenarios

1. Build one mini exercise focused on **FIFO processing** and explain why your chosen approach is correct.
2. Add a second variation where **offer/poll semantics** changes the expected output or system behavior.
3. Document one production caution related to **priority queue variants** and how you would monitor it.

### Page-Specific Interview Questions

1. In Queue Interface, how do you decide between approaches related to **FIFO processing** when requirements conflict?
2. What debugging steps would you follow if **offer/poll semantics** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **priority queue variants**, and how would you reduce them?
4. What is one real incident where misunderstanding **FIFO processing** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **offer/poll semantics** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **FIFO processing** and one that highlights **offer/poll semantics**.
- Record typical errors around **priority queue variants** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

`,
  code: `// Queue Interface Demo

import java.util.*;

public class QueueDemo {
    public static void main(String[] args) {
        System.out.println("=== Queue Interface Demo ===\\n");
        
        // 1. BASIC QUEUE (LinkedList)
        System.out.println("1. BASIC QUEUE (LinkedList)");
        System.out.println("   -------------------------");
        
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");
        queue.offer("Third");
        
        System.out.println("   Queue: " + queue);
        System.out.println("   Peek (head): " + queue.peek());
        System.out.println("   Poll (remove head): " + queue.poll());
        System.out.println("   After poll: " + queue);
        System.out.println();
        
        // 2. PRIORITY QUEUE
        System.out.println("2. PRIORITY QUEUE");
        System.out.println("   ---------------");
        
        // Min heap (smallest first)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(30);
        minHeap.offer(10);
        minHeap.offer(20);
        minHeap.offer(5);
        
        System.out.println("   Added: 30, 10, 20, 5");
        System.out.print("   Poll order (min first): ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " ");
        }
        System.out.println();
        
        // Max heap (largest first)
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(30);
        maxHeap.offer(10);
        maxHeap.offer(20);
        maxHeap.offer(5);
        
        System.out.print("   Poll order (max first): ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");
        }
        System.out.println("\\n");
        
        // 3. DEQUE (Double-Ended Queue)
        System.out.println("3. DEQUE (Double-Ended Queue)");
        System.out.println("   ---------------------------");
        
        Deque<String> deque = new ArrayDeque<>();
        deque.offerFirst("B");
        deque.offerFirst("A");
        deque.offerLast("C");
        deque.offerLast("D");
        
        System.out.println("   Deque: " + deque);
        System.out.println("   First: " + deque.peekFirst());
        System.out.println("   Last: " + deque.peekLast());
        System.out.println("   Poll First: " + deque.pollFirst());
        System.out.println("   Poll Last: " + deque.pollLast());
        System.out.println("   After polls: " + deque);
        System.out.println();
        
        // 4. DEQUE AS STACK
        System.out.println("4. DEQUE AS STACK");
        System.out.println("   ---------------");
        
        Deque<String> stack = new ArrayDeque<>();
        stack.push("Bottom");
        stack.push("Middle");
        stack.push("Top");
        
        System.out.println("   Stack: " + stack);
        System.out.println("   Peek: " + stack.peek());
        System.out.println("   Pop: " + stack.pop());
        System.out.println("   After pop: " + stack);
        System.out.println();
        
        // 5. TASK SCHEDULER
        System.out.println("5. TASK SCHEDULER (PriorityQueue)");
        System.out.println("   -------------------------------");
        
        TaskScheduler scheduler = new TaskScheduler();
        scheduler.addTask("Low priority task", 3);
        scheduler.addTask("High priority task", 1);
        scheduler.addTask("Medium priority task", 2);
        scheduler.addTask("Critical task", 0);
        
        System.out.println("\\n   Processing tasks by priority:");
        scheduler.processAll();
        System.out.println();
        
        // 6. PRINT QUEUE
        System.out.println("6. PRINT QUEUE");
        System.out.println("   ------------");
        
        PrintQueue printQueue = new PrintQueue();
        printQueue.addJob("Report.pdf", 10);
        printQueue.addJob("Photo.jpg", 1);
        printQueue.addJob("Presentation.pptx", 25);
        
        System.out.println("\\n   Queue size: " + printQueue.getQueueSize());
        System.out.println("   Processing print jobs:");
        printQueue.printNext();
        printQueue.printNext();
        printQueue.printNext();
        printQueue.printNext();  // Empty queue
        System.out.println();
        
        // 7. BROWSER HISTORY
        System.out.println("7. BROWSER HISTORY (Deque)");
        System.out.println("   ------------------------");
        
        BrowserHistory browser = new BrowserHistory();
        browser.visit("google.com");
        browser.visit("github.com");
        browser.visit("stackoverflow.com");
        
        System.out.println("   Current: " + browser.getCurrentPage());
        
        browser.back();
        System.out.println("   After back: " + browser.getCurrentPage());
        
        browser.back();
        System.out.println("   After back: " + browser.getCurrentPage());
        
        browser.forward();
        System.out.println("   After forward: " + browser.getCurrentPage());
        
        browser.visit("youtube.com");
        System.out.println("   After new visit: " + browser.getCurrentPage());
        
        browser.forward();  // Nothing to forward to
        System.out.println("   After forward (nothing): " + browser.getCurrentPage());
    }
}

// Task for scheduler
class Task implements Comparable<Task> {
    private String name;
    private int priority;
    
    public Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
    
    public String getName() { return name; }
    public int getPriority() { return priority; }
    
    @Override
    public int compareTo(Task other) {
        return Integer.compare(this.priority, other.priority);
    }
}

// Task Scheduler
class TaskScheduler {
    private PriorityQueue<Task> taskQueue = new PriorityQueue<>();
    
    public void addTask(String name, int priority) {
        taskQueue.offer(new Task(name, priority));
        System.out.println("   Added: " + name + " (priority: " + priority + ")");
    }
    
    public void processNext() {
        Task task = taskQueue.poll();
        if (task != null) {
            System.out.println("   Processing: " + task.getName() + 
                             " (priority: " + task.getPriority() + ")");
        }
    }
    
    public void processAll() {
        while (!taskQueue.isEmpty()) {
            processNext();
        }
    }
}

// Print Queue
class PrintQueue {
    private Queue<PrintJob> queue = new LinkedList<>();
    
    public void addJob(String document, int pages) {
        queue.offer(new PrintJob(document, pages));
        System.out.println("   Added: " + document + " (" + pages + " pages)");
    }
    
    public void printNext() {
        PrintJob job = queue.poll();
        if (job != null) {
            System.out.println("   🖨️ Printing: " + job.document);
        } else {
            System.out.println("   Queue is empty");
        }
    }
    
    public int getQueueSize() {
        return queue.size();
    }
    
    private static class PrintJob {
        String document;
        int pages;
        
        PrintJob(String document, int pages) {
            this.document = document;
            this.pages = pages;
        }
    }
}

// Browser History
class BrowserHistory {
    private Deque<String> backStack = new ArrayDeque<>();
    private Deque<String> forwardStack = new ArrayDeque<>();
    private String currentPage = null;
    
    public void visit(String url) {
        if (currentPage != null) {
            backStack.push(currentPage);
        }
        currentPage = url;
        forwardStack.clear();
    }
    
    public void back() {
        if (!backStack.isEmpty()) {
            forwardStack.push(currentPage);
            currentPage = backStack.pop();
        }
    }
    
    public void forward() {
        if (!forwardStack.isEmpty()) {
            backStack.push(currentPage);
            currentPage = forwardStack.pop();
        }
    }
    
    public String getCurrentPage() {
        return currentPage;
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a customer service queue system',
      hint: 'Use PriorityQueue with VIP customers having higher priority',
      starterCode: `import java.util.*;

public class CustomerServiceDemo {
    public static void main(String[] args) {
        System.out.println("=== Customer Service Queue ===\\n");
        
        CustomerService service = new CustomerService();
        
        // Add customers
        service.addCustomer("Alice", false);  // Regular
        service.addCustomer("Bob", true);     // VIP
        service.addCustomer("Charlie", false);
        service.addCustomer("Diana", true);   // VIP
        service.addCustomer("Eve", false);
        
        System.out.println("\\nQueue status:");
        service.displayQueue();
        
        System.out.println("\\nServing customers:");
        service.serveNext();
        service.serveNext();
        service.serveNext();
        
        System.out.println("\\nRemaining in queue:");
        service.displayQueue();
    }
}

class Customer implements Comparable<Customer> {
    private String name;
    private boolean isVIP;
    private int ticketNumber;
    private static int nextTicket = 1;
    
    public Customer(String name, boolean isVIP) {
        this.name = name;
        this.isVIP = isVIP;
        this.ticketNumber = nextTicket++;
    }
    
    public String getName() { return name; }
    public boolean isVIP() { return isVIP; }
    public int getTicketNumber() { return ticketNumber; }
    
    @Override
    public int compareTo(Customer other) {
        // VIP customers first, then by ticket number
        if (this.isVIP != other.isVIP) {
            return this.isVIP ? -1 : 1;  // VIP comes first
        }
        return Integer.compare(this.ticketNumber, other.ticketNumber);
    }
    
    @Override
    public String toString() {
        return (isVIP ? "⭐ VIP " : "   ") + name + " (#" + ticketNumber + ")";
    }
}

class CustomerService {
    private PriorityQueue<Customer> queue = new PriorityQueue<>();
    
    public void addCustomer(String name, boolean isVIP) {
        Customer customer = new Customer(name, isVIP);
        queue.offer(customer);
        System.out.println("Added: " + customer);
    }
    
    public void serveNext() {
        Customer customer = queue.poll();
        if (customer != null) {
            System.out.println("Now serving: " + customer);
        } else {
            System.out.println("No customers in queue");
        }
    }
    
    public void displayQueue() {
        if (queue.isEmpty()) {
            System.out.println("Queue is empty");
            return;
        }
        
        // Create a copy to display without modifying original
        PriorityQueue<Customer> copy = new PriorityQueue<>(queue);
        int position = 1;
        while (!copy.isEmpty()) {
            System.out.println(position++ + ". " + copy.poll());
        }
    }
}`
    }
  ]
};

export default queueInterface;
