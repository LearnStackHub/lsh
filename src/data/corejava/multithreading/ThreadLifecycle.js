const threadLifecycle = {
  id: "thread-lifecycle",
  title: "Thread Lifecycle",
  description: "Learn about thread states and lifecycle",
  content: `# Thread Lifecycle in Java (Thread States Explained)

In Java, a **Thread** goes through a well-defined set of states from creation to completion. Understanding the **thread lifecycle** is critical for writing reliable concurrent code, debugging production issues (deadlocks, stalls), and improving application performance.

---

## Thread States (High-Level)

Java defines thread states in \`java.lang.Thread.State\`:

1. **NEW**: Thread object created but \`start()\` not called
2. **RUNNABLE**: Eligible to run (may be running or waiting for CPU time)
3. **BLOCKED**: Waiting to acquire a monitor lock (synchronized block/method)
4. **WAITING**: Waiting indefinitely for another thread to perform an action
5. **TIMED_WAITING**: Waiting for a specific time (sleep, timed join, timed wait)
6. **TERMINATED**: Execution completed

---

## Lifecycle Diagram (State Transition Map)

\`\`\`
             +-------------------+
             |       NEW         |
             | (Thread created)  |
             +---------+---------+
                       |
                       | start()
                       v
             +-------------------+
             |     RUNNABLE      | <-------------------------------+
             | (Running/Ready)   |                                 |
             +----+----+----+----+                                 |
                  |    |    |                                      |
      synchronized|    |sleep/join(wait timeout)                    |
      lock busy   |    |    |                                      |
                  v    v    v                                      |
            +----------+  +-------------------+                     |
            | BLOCKED  |  |  TIMED_WAITING    |                     |
            +----------+  +-------------------+                     |
                  |                |                                |
                  | lock acquired  | timeout / notify / interrupt   |
                  +----------------+--------------------------------+
                                   |
                                   | wait() / join() (no timeout)
                                   v
                             +-----------+
                             |  WAITING  |
                             +-----------+
                                   |
                                   | notify/notifyAll/interruption
                                   v
                             +-----------+
                             | RUNNABLE  |
                             +-----------+
                                   |
                                   | run() finishes
                                   v
                            +----------------+
                            |  TERMINATED    |
                            +----------------+
\`\`\`

---

## Real-World Use Cases (Where States Matter)

### Use Case 1: Web Server Handling Requests

A servlet container or Spring Boot app uses thread pools. Threads can become **BLOCKED** on locks, or **WAITING** on queues (e.g., task queue).

### Use Case 2: Database Connection Pool

If the pool is exhausted, threads can become **WAITING** until a connection is returned.

### Use Case 3: Background Jobs / Schedulers

Scheduled jobs often spend time in **TIMED_WAITING** between runs.

---

## Deep Explanation of Each State

### 1) NEW

\`\`\`java
Thread t = new Thread(() -> System.out.println("Hello"));
System.out.println(t.getState()); // NEW
\`\`\`

The thread exists as an object, but it is not scheduled yet.

### 2) RUNNABLE

After calling \`start()\`, the thread becomes RUNNABLE.

\`\`\`java
t.start();
System.out.println(t.getState()); // RUNNABLE (usually)
\`\`\`

Note: RUNNABLE includes “ready-to-run” and “running” at the OS level.

### 3) BLOCKED

BLOCKED happens when the thread tries to enter a synchronized block/method, but another thread already holds that lock.

\`\`\`java
final Object lock = new Object();

Thread t1 = new Thread(() -> {
  synchronized (lock) {
    try { Thread.sleep(2000); } catch (InterruptedException ignored) {}
  }
});

Thread t2 = new Thread(() -> {
  synchronized (lock) { /* t2 blocks until lock is free */ }
});
\`\`\`

### 4) WAITING

WAITING happens when a thread calls \`wait()\` without timeout, or \`join()\` without timeout.

\`\`\`java
lock.wait();   // WAITING until notify/notifyAll
t1.join();     // WAITING until t1 completes
\`\`\`

### 5) TIMED_WAITING

Common methods that cause TIMED_WAITING:
- \`Thread.sleep(ms)\`
- \`Object.wait(ms)\`
- \`Thread.join(ms)\`

### 6) TERMINATED

When the \`run()\` method completes, the thread becomes TERMINATED permanently.

---

## Comparison Table: WAITING vs TIMED_WAITING vs BLOCKED

| State | Why it happens | Example | Ends when |
|---|---|---|---|
| BLOCKED | waiting for monitor lock | \`synchronized(lock)\` | lock becomes available |
| WAITING | waiting indefinitely | \`wait()\`, \`join()\` | notify/interrupt/target thread finishes |
| TIMED_WAITING | waiting for time | \`sleep(1000)\` | timeout or interrupt |

---

## Debugging Tip: How to Identify Stuck Threads

In real production debugging, thread dumps show states:
- Many **BLOCKED** threads usually indicate lock contention
- Many **WAITING** threads often indicate threads waiting on queues or joins
- Many **TIMED_WAITING** threads are often sleeping (schedulers / backoff)

---

## FAQs (Thread Lifecycle)

### Q1: What is the difference between \`start()\` and \`run()\`?

**A:** \`start()\` creates a new thread and calls \`run()\` on that new thread. Calling \`run()\` directly does not create a new thread; it runs on the current thread.

### Q2: Why does RUNNABLE sometimes show even when the thread is “not running”?

**A:** RUNNABLE in Java includes threads ready to run and those currently running. The OS scheduler decides CPU time.

### Q3: When does a thread become BLOCKED?

**A:** When it tries to enter a synchronized block/method but cannot acquire the lock immediately.

### Q4: Can a TERMINATED thread restart?

**A:** No. Once terminated, a thread cannot be restarted. Create a new Thread object.

### Q5: What causes WAITING state commonly?

**A:** \`Object.wait()\`, \`Thread.join()\`, or parking mechanisms in concurrent libraries (executors/queues).

---

## Conclusion

The thread lifecycle is the foundation for understanding concurrency. If you can clearly identify why a thread is RUNNABLE, BLOCKED, WAITING, or TIMED_WAITING, you can debug most multithreading problems much faster.

### Next steps
- Learn [Thread Methods](/corejava/thread-methods) (\`sleep\`, \`join\`, \`interrupt\`)
- Continue with [Multithreading Introduction](/corejava/thread-introduction)
- Study [Synchronization](/corejava/synchronization) to understand locks and thread safety
  
---

## 10 Important Thread Lifecycle Interview Questions

### 1. What are thread states in \`Thread.State\`?
**Answer:** NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED—JVM maps OS states into these categories.
\`RUNNABLE\` includes ready and running.

### 2. When is a thread BLOCKED?
**Answer:** Waiting to enter synchronized block/method because monitor held by another thread—distinct from WAITING on \`wait\`.
Thread dumps show “waiting to lock monitor.”

### 3. What transitions to WAITING?
**Answer:** \`Object.wait\`, \`join\` without timeout, \`LockSupport.park\`, \`Condition.await\`—until another thread signals.
Must understand paired signal/notify.

### 4. What is TIMED_WAITING?
**Answer:** \`sleep\`, \`wait(timeout)\`, \`join(timeout)\`—wake after time or signal.
Used for timeouts and polling.

### 5. Scenario: thread stuck in BLOCKED—how diagnose?
**Answer:** Thread dump—find lock owner—often deadlock or hot lock—reduce critical sections or reorder lock acquisition.
Avoid lock ordering violations.

### 6. Can you restart TERMINATED thread?
**Answer:** No—create new Thread wrapping new or same Runnable.
Lifecycle is one-way.

### 7. What is spurious wakeup?
**Answer:** \`wait\` may wake without notify—always re-check condition in loop.
Official pattern in concurrency books.

### 8. How do thread pools mask lifecycle details?
**Answer:** Workers reuse threads across tasks—task failures shouldn’t kill worker thread—uncaught handlers log errors.
Understand pool’s afterExecute hooks.

### 9. What is \`j.u.c.\` \`Phaser\` / \`CyclicBarrier\` lifecycle?
**Answer:** Coordinate phases of parallel tasks—advanced beyond basic thread states but interview for senior concurrency roles.
Know they exist.

### 10. JVM shutdown and thread lifecycle?
**Answer:** Shutdown hooks run for orderly termination—daemon threads stop abruptly—ensure resources closed via try-with-resources and hooks.
Containers send SIGTERM—handle gracefully.

`,
  code: `public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Thread Lifecycle Demo ===\\n");
        
        Object lock = new Object();
        
        Thread thread = new Thread(() -> {
            System.out.println("Thread started");
            
            // TIMED_WAITING state
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {}
            
            // BLOCKED state (waiting for lock)
            synchronized(lock) {
                System.out.println("Thread acquired lock");
            }
            
            System.out.println("Thread ending");
        });
        
        // NEW state
        System.out.println("After creation: " + thread.getState());
        
        thread.start();
        
        // RUNNABLE state
        System.out.println("After start: " + thread.getState());
        
        Thread.sleep(100);
        // TIMED_WAITING state
        System.out.println("During sleep: " + thread.getState());
        
        // Acquire lock to make thread BLOCKED
        synchronized(lock) {
            Thread.sleep(600);
            System.out.println("While blocked: " + thread.getState());
        }
        
        thread.join();
        
        // TERMINATED state
        System.out.println("After completion: " + thread.getState());
        
        // Demonstrating WAITING state
        System.out.println("\\n--- WAITING State Demo ---");
        Thread waitingThread = new Thread(() -> {
            synchronized(lock) {
                try {
                    lock.wait();
                } catch (InterruptedException e) {}
            }
        });
        
        waitingThread.start();
        Thread.sleep(100);
        System.out.println("Waiting thread state: " + waitingThread.getState());
        
        // Notify to release
        synchronized(lock) {
            lock.notify();
        }
        waitingThread.join();
    }
}`,
  practiceQuestions: [
    {
      question: "Create a program that demonstrates all thread states",
      hint: "Use sleep for TIMED_WAITING, synchronized for BLOCKED, wait for WAITING",
      starterCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Demonstrate all thread states
        
    }
}`
    }
  ]
};

export default threadLifecycle;





