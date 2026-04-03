const threadMethods = {
  id: "thread-methods",
  title: "Thread Methods",
  description: "Learn important thread methods in Java",
  content: `# Thread Methods in Java (start, sleep, join, interrupt, and more)

Java provides several thread methods that control execution, coordination, and debugging. These methods are widely used in real projects (web servers, background workers, schedulers) and they also appear in interviews.

This guide explains the most important thread methods with examples, best practices, and common mistakes.

---

## Quick Table: Important Thread Methods

| Method | Purpose | Typical use |
|---|---|---|
| \`start()\` | starts a new thread | run task concurrently |
| \`run()\` | thread entry method | contains task logic |
| \`sleep(ms)\` | pause current thread | delays, retry backoff |
| \`join()\` | wait for thread completion | coordination, ordering |
| \`yield()\` | hint scheduler to switch | rarely used, demos |
| \`interrupt()\` | request thread stop/wakeup | cancellation |
| \`isAlive()\` | check if thread still running | monitoring |
| \`setName()\` | set thread name | debugging, logs |
| \`setPriority()\` | set priority (1–10) | rarely used in modern apps |
| \`currentThread()\` | get current thread | logging/debug |

---

## 1) start() vs run() (Most Important Concept)

\`\`\`java
Thread t = new Thread(() -> System.out.println(Thread.currentThread().getName()));

t.run();   // runs on current thread (NO new thread)
t.start(); // runs on a new thread
\`\`\`

**Rule:** Always use \`start()\` to execute work in a new thread.

---

## 2) sleep(ms)

\`Thread.sleep(ms)\` pauses the **current thread** for a given time.

### Real-world usage
- retry backoff (wait before retrying API call)\n
- scheduled polling\n
- animations/delays in simulations\n

\`\`\`java
try {
    Thread.sleep(500);
} catch (InterruptedException e) {
    // If interrupted, handle cancellation or cleanup
    Thread.currentThread().interrupt();
}
\`\`\`

**Best practice:** if you catch \`InterruptedException\`, usually restore interrupt flag using \`Thread.currentThread().interrupt()\`.

---

## 3) join()

\`join()\` makes the current thread wait until another thread finishes.

\`\`\`java
Thread worker = new Thread(() -> {
    // heavy task
});
worker.start();
worker.join(); // wait here
\`\`\`

### Real-world usage
- ensure multiple tasks complete before continuing\n
- ordering steps in startup/shutdown\n

---

## 4) interrupt()

\`interrupt()\` is a **cooperative cancellation signal**. It does not force-stop a thread. Instead, it sets an interrupt flag and wakes up blocking calls like sleep/wait/join.

\`\`\`java
Thread t = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        // do work
    }
});
t.start();
t.interrupt(); // request stop
\`\`\`

### Real-world usage
- cancel long-running background tasks\n
- stop worker threads during shutdown\n

---

## 5) isAlive()

\`isAlive()\` returns true if a thread has started and not yet finished.

\`\`\`java
System.out.println(t.isAlive());
\`\`\`

Use it for diagnostics, not for synchronization logic (use join, latches, futures).

---

## 6) setName() and getName()

Thread names make debugging easier.

\`\`\`java
Thread t = new Thread(task);
t.setName("payment-worker-1");
t.start();
\`\`\`

In production, thread dumps become readable when names are meaningful.

---

## 7) setPriority()

Java supports priorities (1 to 10), but OS schedulers may ignore them. Most modern applications do not rely on priorities.

---

## Diagram: How join() coordinates threads

\`\`\`
Main Thread:  start(worker) -------------- wait(join) -------------- continue
Worker:                         run task -------------------------- done
\`\`\`

---

## Comparison Table: sleep vs wait vs join

| Method | Who waits? | Needs lock? | Wakes by | Typical use |
|---|---|---:|---|---|
| sleep | current thread | No | timeout/interrupt | delay |
| wait | current thread | Yes (synchronized) | notify/timeout/interrupt | coordination |
| join | current thread | No | target thread end/interrupt | wait completion |

---

## Common Mistakes

### Mistake 1: Calling run() expecting new thread

**Fix:** use \`start()\`.

### Mistake 2: Swallowing InterruptedException

**Fix:** restore interrupt flag or exit gracefully.

---

## FAQs (Thread Methods)

### Q1: Can interrupt stop any thread immediately?

**A:** No. It signals cancellation. The thread must check interrupt status or be in an interruptible blocking call.

### Q2: Is yield() useful?

**A:** Rarely. It’s a hint and scheduler may ignore it. Prefer proper concurrency tools.

### Q3: IsAlive is safe to use for waiting?

**A:** Not for synchronization. Use join() or concurrency utilities (ExecutorService, CountDownLatch).

### Q4: What should I do when InterruptedException happens?

**A:** Typically restore the interrupt flag using \`Thread.currentThread().interrupt()\` and exit the loop.

### Q5: Should I create raw threads in Spring Boot applications?

**A:** Usually no. Prefer thread pools (ExecutorService) or Spring’s \`@Async\`.

---

## Conclusion

Thread methods like \`start\`, \`sleep\`, \`join\`, and \`interrupt\` are foundational for concurrency. Learn them well, and then move to higher-level concurrency utilities that are safer and easier to manage in production.

### Next steps
- Learn [Thread Lifecycle](/tutorial/thread-lifecycle)
- Continue with [Multithreading Introduction](/tutorial/thread-introduction)
- Learn [Synchronization](/tutorial/synchronization)
  
---

## 10 Important Thread Methods Interview Questions

### 1. What does \`sleep\` do?
**Answer:** Pauses current thread without releasing locks—subject to interrupt—use \`TimeUnit\` for clarity.
Not precise real-time guarantees.

### 2. Difference between \`wait\` and \`sleep\`?
**Answer:** \`wait\` releases monitor lock and must be called in synchronized block on same object; \`sleep\` holds locks.
\`wait\` is for coordination; \`sleep\` for timing.

### 3. What is \`join\`?
**Answer:** Current thread waits for another thread to finish—timeouts available—useful for fork-join style tasks.
Join ordering can deadlock if circular waits.

### 4. What does \`interrupt\` mean?
**Answer:** Sets interrupt flag—cooperative—blocking methods throw \`InterruptedException\` and clear flag—restore interrupt status if catching.
Don’t ignore interrupted exception silently.

### 5. Scenario: graceful shutdown—what sequence of methods?
**Answer:** Signal threads interrupt, await termination with \`ExecutorService.awaitTermination\`, then force shutdown if needed—drain queues carefully.
Spring Boot hooks use similar patterns.

### 6. What is \`yield\`?
**Answer:** Hint to scheduler—rarely needed—non-deterministic—testing concurrency with yield is flaky.
Avoid for correctness.

### 7. \`setDaemon\` purpose?
**Answer:** Daemon threads don’t prevent JVM exit—background tasks like heartbeats—must set before \`start\`.
User threads keep JVM alive.

### 8. What is \`Thread.currentThread()\`?
**Answer:** Returns reference to executing thread—useful for names, class loaders in frameworks.
Don’t abuse for implicit globals.

### 9. Priority \`setPriority\` reliable?
**Answer:** Platform-dependent—don’t rely on priorities for correctness—use proper scheduling abstractions.
Games/real-time systems tune carefully.

### 10. What is \`holdsLock\` debugging aid?
**Answer:** \`Thread.holdsLock\` asserts lock ownership in assertions—useful in custom locks debugging.
Not for production control flow.

`,
  code: `public class ThreadMethodsDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Thread Methods Demo ===\\n");
        
        // sleep() method
        System.out.println("--- sleep() ---");
        Thread sleepThread = new Thread(() -> {
            System.out.println("Sleeping for 500ms...");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println("Sleep interrupted!");
            }
            System.out.println("Woke up!");
        });
        sleepThread.start();
        sleepThread.join();
        
        // join() method
        System.out.println("\\n--- join() ---");
        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("T1: " + i);
                try { Thread.sleep(100); } catch (Exception e) {}
            }
        });
        
        Thread t2 = new Thread(() -> {
            try {
                t1.join(); // Wait for t1 to complete
            } catch (InterruptedException e) {}
            System.out.println("T2: Started after T1 completed");
        });
        
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        
        // Priority
        System.out.println("\\n--- Priority ---");
        Thread lowPriority = new Thread(() -> {
            System.out.println("Low priority thread running");
        });
        Thread highPriority = new Thread(() -> {
            System.out.println("High priority thread running");
        });
        
        lowPriority.setPriority(Thread.MIN_PRIORITY);
        highPriority.setPriority(Thread.MAX_PRIORITY);
        
        System.out.println("Low priority: " + lowPriority.getPriority());
        System.out.println("High priority: " + highPriority.getPriority());
        
        lowPriority.start();
        highPriority.start();
        lowPriority.join();
        highPriority.join();
        
        // interrupt() method
        System.out.println("\\n--- interrupt() ---");
        Thread interruptThread = new Thread(() -> {
            try {
                System.out.println("Thread sleeping...");
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("Thread was interrupted!");
            }
        });
        
        interruptThread.start();
        Thread.sleep(100);
        interruptThread.interrupt();
        interruptThread.join();
        
        // yield() method
        System.out.println("\\n--- yield() ---");
        Thread yieldThread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Yield thread: " + i);
                Thread.yield(); // Give chance to other threads
            }
        });
        yieldThread.start();
        yieldThread.join();
        
        // isAlive() method
        System.out.println("\\n--- isAlive() ---");
        Thread aliveThread = new Thread(() -> {
            try { Thread.sleep(200); } catch (Exception e) {}
        });
        System.out.println("Before start: " + aliveThread.isAlive());
        aliveThread.start();
        System.out.println("After start: " + aliveThread.isAlive());
        aliveThread.join();
        System.out.println("After join: " + aliveThread.isAlive());
    }
}`,
  practiceQuestions: [
    {
      question: "Create a countdown timer using thread sleep",
      hint: "Use Thread.sleep(1000) for 1 second delay",
      starterCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Create countdown from 10 to 0
        
    }
}`
    }
  ]
};

export default threadMethods;





