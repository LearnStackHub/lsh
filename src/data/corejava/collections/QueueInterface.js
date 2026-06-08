const queueInterface = {
  id: 'queue-interface',
  title: 'Queue Interface',
  description: 'First-In-First-Out (FIFO) collections',
  content: `
# Queue Interface — First In, First Out

Imagine three everyday scenes:

- **Bus ticket counter** — The person who arrived first gets the ticket first. Nobody cuts in line (hopefully).
- **Office print queue** — The document you sent first prints first. Later jobs wait their turn.
- **Hospital token system** — Token #1 is called before token #2, no matter how urgent you feel.

That is a **Queue**: **First In, First Out (FIFO)**. The first item you add is the first one removed. Java's \`Queue\` interface models exactly this waiting-line behavior.

Queues show up everywhere in real software: background jobs, message processing, order fulfillment, and task scheduling.

---

## Understand Deeply — FIFO Step by Step

Picture three people in a line: **Anita**, **Bharat**, **Chitra**.

\`\`\`
offer("Anita")   →  front [Anita] back
offer("Bharat")  →  front [Anita, Bharat] back
offer("Chitra")  →  front [Anita, Bharat, Chitra] back

peek()           →  sees Anita (does not remove)
poll()           →  removes Anita  →  [Bharat, Chitra]
poll()           →  removes Bharat →  [Chitra]
\`\`\`

**Front** = head = first to leave. **Back** = tail = where new people join.

| Method | What it does | Empty queue behavior |
|--------|--------------|----------------------|
| \`offer(x)\` | Add at back | Returns false if full (bounded queue) |
| \`poll()\` | Remove from front | Returns \`null\` (safe) |
| \`peek()\` | Look at front only | Returns \`null\` (safe) |

**Queue vs List:** A List lets you \`get(5)\` — jump to any position. A Queue does not. You only touch the ends. That restriction is what makes queue logic correct for waiting lines.

**PriorityQueue is different:** It is **not** strict FIFO. Items leave by **priority** (or smallest number first by default). A critical bug report can be processed before an older low-priority task. Use normal Queue for "fair line" and PriorityQueue for "urgent first."

---

## What Makes a Queue Different?

- **FIFO ordering** — First in, first out. Like a real waiting line.
- **Two ends** — You join at the back (\`offer\`) and leave from the front (\`poll\`).
- **No random access** — You cannot ask for "the 5th person in line." You only see who is at the front (\`peek\`).
- **Null handling** — Most queue implementations do not allow \`null\` elements.

---

## Queue Operations — Two Flavors

Java gives you two ways to do the same thing. One throws an exception when something goes wrong; the other returns a safe value.

| What you want | Throws exception | Safe version (recommended) |
|---------------|------------------|----------------------------|
| Add to back | \`add(e)\` | \`offer(e)\` → returns true/false |
| Remove from front | \`remove()\` | \`poll()\` → returns element or null |
| Look at front (don't remove) | \`element()\` | \`peek()\` → returns element or null |

**Tip for beginners:** Stick with \`offer\`, \`poll\`, and \`peek\`. They won't crash your program if the queue is empty.

---

## Queue Implementations

### LinkedList — A General-Purpose Queue

\`LinkedList\` can act as a List, a Queue, and a Deque. For a simple FIFO queue, it works fine. New items go to the tail; the head is removed first.

Run this to see the basics — three tasks go in, the first one comes out:

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class LinkedListQueueDemo {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");

        String head = queue.poll();
        System.out.println("Removed head: " + head);
        System.out.println("Remaining: " + queue);
    }
}
\`\`\`

### PriorityQueue — Not FIFO, but by Priority

A regular queue serves everyone in arrival order. A **priority queue** is different — urgent tasks jump ahead. Think of a hospital emergency room: critical cases are seen before mild ones, even if they arrived later.

By default, \`PriorityQueue\` pulls the **smallest** number first (min-heap). Add 30, 10, 20 — they come out as 10, 20, 30:

\`\`\`java
import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueBasicsDemo {
    public static void main(String[] args) {
        Queue<Integer> pq = new PriorityQueue<>();
        pq.offer(30);
        pq.offer(10);
        pq.offer(20);

        System.out.println("Poll order (smallest first):");
        while (!pq.isEmpty()) {
            System.out.println(pq.poll());
        }
    }
}
\`\`\`

### ArrayDeque — Fast Queue and Deque

\`ArrayDeque\` uses a circular array internally. It is faster than \`LinkedList\` for most queue and stack operations. You can add or remove from **both** ends — that makes it a **Deque** (double-ended queue).

Here we add items at the front and back, then remove from both ends:

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDequeBasicsDemo {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();
        deque.offerFirst("First");
        deque.offerLast("Last");

        System.out.println("Deque: " + deque);
        System.out.println("Poll first: " + deque.pollFirst());
        System.out.println("Poll last: " + deque.pollLast());
    }
}
\`\`\`

---

## Basic Queue Operations

These four methods are what you will use every day: \`offer\` to add, \`peek\` to look at the front, \`poll\` to remove the front, and \`size\` / \`isEmpty\` to check status.

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class BasicQueueOperationsDemo {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        queue.offer("Task 1");
        queue.offer("Task 2");
        queue.offer("Task 3");

        String head = queue.peek();
        String removed = queue.poll();

        System.out.println("Peek head: " + head);
        System.out.println("Polled: " + removed);
        System.out.println("Remaining queue: " + queue);
        System.out.println("Size: " + queue.size());
        System.out.println("Is empty: " + queue.isEmpty());
    }
}
\`\`\`

---

## PriorityQueue — Min Heap, Max Heap, and Custom Priority

\`PriorityQueue\` does not follow arrival order. It uses a heap to always give you the "most important" element first.

- **Default** — smallest number first (min-heap)
- **\`Collections.reverseOrder()\`** — largest first (max-heap)
- **Custom \`Comparator\`** — your own rules, like task priority

This example shows all three approaches. Tasks with priority 1 (highest) are processed before priority 3:

\`\`\`java
import java.util.*;

public class PriorityQueueOrderingDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(5);
        minHeap.offer(1);
        minHeap.offer(3);
        System.out.println("Min heap poll order: " + pollAll(minHeap));

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(5);
        maxHeap.offer(1);
        maxHeap.offer(3);
        System.out.println("Max heap poll order: " + pollAll(maxHeap));

        PriorityQueue<Task> taskQueue = new PriorityQueue<>(Comparator.comparingInt(Task::getPriority));
        taskQueue.offer(new Task("Send email", 2));
        taskQueue.offer(new Task("Fix bug", 1));
        taskQueue.offer(new Task("Write docs", 3));

        System.out.println("Task processing order:");
        while (!taskQueue.isEmpty()) {
            System.out.println("  " + taskQueue.poll());
        }
    }

    private static List<Integer> pollAll(PriorityQueue<Integer> pq) {
        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) result.add(pq.poll());
        return result;
    }
}

class Task {
    private final String name;
    private final int priority;

    public Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    public int getPriority() { return priority; }

    @Override
    public String toString() { return name + " (p=" + priority + ")"; }
}
\`\`\`

---

## Deque — Double-Ended Queue

**Deque** (pronounced "deck") lets you add and remove from **both** ends — like a line where people can join or leave from the front or the back. \`ArrayDeque\` is the go-to implementation.

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeOperationsDemo {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();

        deque.offerFirst("A");
        deque.addFirst("B");
        deque.offerLast("C");
        deque.addLast("D");
        System.out.println("After adds: " + deque);

        System.out.println("Poll first: " + deque.pollFirst());
        System.out.println("Poll last: " + deque.pollLast());
        System.out.println("Peek first: " + deque.peekFirst());
        System.out.println("Peek last: " + deque.peekLast());
        System.out.println("Remaining: " + deque);
    }
}
\`\`\`

### Using Deque as a Stack

Java's old \`Stack\` class is outdated. The modern way to build a stack (Last In, First Out) is \`ArrayDeque\` with \`push\` and \`pop\` — like a stack of plates where you always take the top one:

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeAsStackDemo {
    public static void main(String[] args) {
        Deque<String> stack = new ArrayDeque<>();
        stack.push("First");
        stack.push("Second");

        System.out.println("Pop: " + stack.pop());
        System.out.println("Peek: " + stack.peek());
        System.out.println("Remaining stack: " + stack);
    }
}
\`\`\`

---

## Real-World Example: Task Scheduler

In a real app, not all tasks are equal. A production bug (priority 1) should run before writing docs (priority 3). This scheduler uses \`PriorityQueue\` with a custom comparator to process tasks in priority order:

\`\`\`java
import java.util.Comparator;
import java.util.PriorityQueue;

public class TaskSchedulerDemo {
    public static void main(String[] args) {
        TaskScheduler scheduler = new TaskScheduler();
        scheduler.addTask("Send report", 3);
        scheduler.addTask("Fix production bug", 1);
        scheduler.addTask("Team meeting", 2);
        scheduler.processAll();
    }
}

class TaskScheduler {
    private final PriorityQueue<ScheduledTask> taskQueue;

    public TaskScheduler() {
        taskQueue = new PriorityQueue<>(Comparator.comparingInt(ScheduledTask::getPriority));
    }

    public void addTask(String name, int priority) {
        taskQueue.offer(new ScheduledTask(name, priority));
    }

    public void processNext() {
        ScheduledTask task = taskQueue.poll();
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

class ScheduledTask {
    private final String name;
    private final int priority;

    public ScheduledTask(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    public String getName() { return name; }
    public int getPriority() { return priority; }
}
\`\`\`

---

## Real-World Example: Print Queue

This is the classic FIFO use case. Documents are added to the queue in the order they were submitted. The printer always takes the job at the front — just like a real office printer:

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class PrintQueueDemo {
    public static void main(String[] args) {
        PrintQueue printQueue = new PrintQueue();
        printQueue.addJob("Resume.pdf", 2);
        printQueue.addJob("Invoice.pdf", 1);
        printQueue.addJob("Report.pdf", 5);

        System.out.println("Queue size: " + printQueue.getQueueSize());
        printQueue.printNext();
        printQueue.printNext();
        printQueue.printNext();
        printQueue.printNext();
    }
}

class PrintQueue {
    private final Queue<PrintJob> queue = new LinkedList<>();

    public void addJob(String document, int pages) {
        queue.offer(new PrintJob(document, pages));
        System.out.println("Added to queue: " + document);
    }

    public void printNext() {
        PrintJob job = queue.poll();
        if (job != null) {
            System.out.println("Printing: " + job.document + " (" + job.pages + " pages)");
        } else {
            System.out.println("Queue is empty");
        }
    }

    public int getQueueSize() {
        return queue.size();
    }
}

class PrintJob {
    final String document;
    final int pages;

    PrintJob(String document, int pages) {
        this.document = document;
        this.pages = pages;
    }
}
\`\`\`

---

## Real-World Example: Browser History (Deque)

Your browser's Back and Forward buttons are a perfect Deque example. Visiting a new page pushes the old one onto a back stack. Pressing Back pops it off. \`ArrayDeque\` handles both stacks efficiently:

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class BrowserHistoryDemo {
    public static void main(String[] args) {
        BrowserHistory history = new BrowserHistory();
        history.visit("google.com");
        history.visit("learnstackhub.com");
        history.visit("java-collections");

        history.back();
        System.out.println("Current after back: " + history.getCurrentPage());

        history.forward();
        System.out.println("Current after forward: " + history.getCurrentPage());
    }
}

class BrowserHistory {
    private final Deque<String> backStack = new ArrayDeque<>();
    private final Deque<String> forwardStack = new ArrayDeque<>();
    private String currentPage;

    public void visit(String url) {
        if (currentPage != null) {
            backStack.push(currentPage);
        }
        currentPage = url;
        forwardStack.clear();
        System.out.println("Visited: " + url);
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

### 1. What extra methods does Queue add beyond Collection?
**Answer:** Queue adds \`offer\`, \`poll\`, and \`peek\` — the safe versions that return null or false instead of throwing exceptions. The throwing versions are \`add\`, \`remove\`, and \`element\`. In interviews, say you prefer \`offer/poll/peek\` because they handle empty queues gracefully.

### 2. Should I use LinkedList as a Queue?
**Answer:** It works, but \`ArrayDeque\` is usually faster and uses less memory. \`LinkedList\` is fine if you already need it as a List too, but for a plain queue, pick \`ArrayDeque\`.

### 3. What is PriorityQueue?
**Answer:** A queue where elements come out by priority, not arrival order. Internally it is a min-heap — the smallest element (or highest priority by your Comparator) is always at the front. Insert and remove take O(log n) time. It is not thread-safe.

### 4. You need to schedule tasks by deadline — which queue?
**Answer:** \`PriorityQueue\` with a Comparator that sorts by deadline. Tasks with the nearest deadline get processed first. For multi-threaded apps, look at \`PriorityBlockingQueue\`.

### 5. What is the difference between Queue and BlockingQueue?
**Answer:** A regular Queue returns immediately — \`poll()\` gives null if empty. A BlockingQueue waits: \`take()\` blocks until an item arrives, and \`put()\` blocks if the queue is full. Use BlockingQueue when producers and consumers run at different speeds.

### 6. What is a Deque?
**Answer:** A double-ended queue. You can add and remove from both the front and the back. It can act as a regular queue (FIFO) or a stack (LIFO). \`ArrayDeque\` is the recommended implementation.

### 7. Why should I avoid the Stack class?
**Answer:** \`java.util.Stack\` is a legacy class that extends \`Vector\` and is synchronized — slow and outdated. Use \`Deque\` with \`push()\` and \`pop()\` instead. Interviewers like hearing that you know the modern approach.

### 8. What is ConcurrentLinkedQueue?
**Answer:** A thread-safe, lock-free queue for high-concurrency apps. Multiple threads can add and remove at the same time without explicit locking. Good for producer-consumer patterns in multi-threaded systems.

### 9. What is the risk of an unbounded queue?
**Answer:** If producers add items faster than consumers remove them, an unbounded queue keeps growing until you run out of memory (OutOfMemoryError). In production, use bounded queues with a rejection policy or backpressure.

### 10. Does every Queue guarantee FIFO?
**Answer:** No. \`LinkedList\` and \`ArrayDeque\` used as queues are FIFO. But \`PriorityQueue\` is ordered by priority, not arrival time. Always match the queue type to what your business logic actually needs.

---

## Key Takeaways

- A **Queue** is a waiting line — first in, first out
- Use \`offer\`, \`poll\`, \`peek\` for safe day-to-day coding
- \`ArrayDeque\` is the best general-purpose choice for queues and stacks
- \`PriorityQueue\` is for urgency, not fairness
- \`Deque\` handles both queue and stack patterns

---

## Remember These 5 Things

1. **Queue = waiting line** — first in (\`offer\`), first out (\`poll\`).
2. **Use \`offer\`, \`poll\`, \`peek\`** — they do not crash on an empty queue.
3. **Default queue: \`ArrayDeque\`** — faster than \`LinkedList\` for most queue/stack work.
4. **PriorityQueue is not FIFO** — smallest or highest-priority item leaves first.
5. **Use \`ArrayDeque\` for stack** (\`push\`/\`pop\`) — avoid the old \`Stack\` class.

---

## What's Next?

Now that you understand queues, continue with the remaining collection types:

### Immediate Next Steps

1. **[Map Interface](/corejava/map-interface)**: Learn key-value pairs — like a phone book lookup
2. **[List Interface](/corejava/list-interface)**: Review ordered, indexed collections
3. **[Set Interface](/corejava/set-interface)**: Review unique-element collections
4. **[Collection Introduction](/corejava/collection-introduction)**: Revisit the big picture

### Related Practice

- Try the customer service queue exercise in the Practice tab on this page
- Test yourself with the [Core Java MCQ Exam](/tutorial/core-java-mcq)

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
