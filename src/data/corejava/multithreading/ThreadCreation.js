const threadCreation = {
  id: 'thread-creation',
  title: 'Creating Threads',
  description: 'Different ways to create and start threads in Java',
  content: `
# Creating Threads — Two Ways to Go Parallel

Java gives you two main ways to create threads. Each has its pros and cons, and understanding both helps you choose the right approach for your situation.

---

## Method 1: Extending Thread Class

The simplest way — create a class that extends \`Thread\`:

\`\`\`java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running!");
    }
}

// Usage
MyThread thread = new MyThread();
thread.start();  // NOT run()!
\`\`\`

**Important:** Call \`start()\`, not \`run()\`. \`start()\` creates a new thread; \`run()\` just calls the method in the current thread.

---

## Method 2: Implementing Runnable Interface

More flexible — implement the \`Runnable\` interface:

\`\`\`java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable is running!");
    }
}

// Usage
Thread thread = new Thread(new MyRunnable());
thread.start();
\`\`\`

---

## Method 3: Lambda Expression (Java 8+)

The cleanest way for simple tasks:

\`\`\`java
Thread thread = new Thread(() -> {
    System.out.println("Lambda thread running!");
});
thread.start();

// Even shorter for one-liners
new Thread(() -> System.out.println("Quick task!")).start();
\`\`\`

---

## Extending Thread vs Implementing Runnable

| Aspect | Extending Thread | Implementing Runnable |
|--------|------------------|----------------------|
| Inheritance | Can't extend other classes | Can extend other classes |
| Flexibility | Less flexible | More flexible |
| Resource sharing | Harder | Easier |
| Reusability | Lower | Higher |
| Best for | Simple, standalone threads | Most cases |

**Recommendation:** Use \`Runnable\` (or lambda) in most cases. It's more flexible and follows better OOP practices.

---

## Passing Data to Threads

### Via Constructor

\`\`\`java
class WorkerThread extends Thread {
    private String taskName;
    private int taskId;
    
    public WorkerThread(String taskName, int taskId) {
        this.taskName = taskName;
        this.taskId = taskId;
    }
    
    @Override
    public void run() {
        System.out.println("Task " + taskId + ": " + taskName);
    }
}

new WorkerThread("Process Data", 1).start();
\`\`\`

### Via Runnable with Closure

\`\`\`java
String data = "Important Data";
int count = 5;

Thread thread = new Thread(() -> {
    // Can access data and count
    System.out.println("Processing: " + data);
    for (int i = 0; i < count; i++) {
        System.out.println("Iteration " + i);
    }
});
thread.start();
\`\`\`

---

## Thread Naming

Give threads meaningful names for debugging:

\`\`\`java
// Method 1: In constructor
Thread thread = new Thread(runnable, "DataProcessor-1");

// Method 2: Using setName
thread.setName("DataProcessor-1");

// Get current thread name
String name = Thread.currentThread().getName();
\`\`\`

---

## Thread Priority

Threads have priorities from 1 (lowest) to 10 (highest):

\`\`\`java
thread.setPriority(Thread.MAX_PRIORITY);  // 10
thread.setPriority(Thread.MIN_PRIORITY);  // 1
thread.setPriority(Thread.NORM_PRIORITY); // 5 (default)
\`\`\`

**Note:** Priority is just a hint to the scheduler. It doesn't guarantee execution order.

---

## Daemon Threads

Daemon threads run in the background and don't prevent JVM from exiting:

\`\`\`java
Thread daemon = new Thread(() -> {
    while (true) {
        // Background task
    }
});
daemon.setDaemon(true);  // Must set before start()
daemon.start();
\`\`\`

**Use cases:** Garbage collection, background monitoring, auto-save.

---

## Real-World Example: Download Manager

\`\`\`java
class DownloadTask implements Runnable {
    private String url;
    private String filename;
    
    public DownloadTask(String url, String filename) {
        this.url = url;
        this.filename = filename;
    }
    
    @Override
    public void run() {
        System.out.println("Downloading: " + filename);
        // Simulate download
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Completed: " + filename);
    }
}

// Start multiple downloads
new Thread(new DownloadTask("http://...", "file1.zip"), "Download-1").start();
new Thread(new DownloadTask("http://...", "file2.zip"), "Download-2").start();
new Thread(new DownloadTask("http://...", "file3.zip"), "Download-3").start();
\`\`\`

---

## Common Mistakes

### 1. Calling run() Instead of start()

\`\`\`java
// WRONG - runs in current thread
thread.run();

// CORRECT - creates new thread
thread.start();
\`\`\`

### 2. Starting Thread Twice

\`\`\`java
thread.start();
thread.start();  // IllegalThreadStateException!
\`\`\`

### 3. Not Handling InterruptedException

\`\`\`java
// BAD
catch (InterruptedException e) { }

// GOOD
catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}
\`\`\`

---

## 10 Important Thread Creation Interview Questions

### 1. What are two ways to create a thread?
**Answer:** Extend \`Thread\` (less flexible) or implement \`Runnable\`/\`Callable\` and pass to \`new Thread(runnable)\`—prefer composition over extending Thread.
Callable returns value and throws checked exceptions via \`Future\`.

### 2. Why prefer \`Runnable\` over extending \`Thread\`?
**Answer:** Separation of task from scheduling—same runnable can run on executors—inheritance not wasted on Thread.
Better OOP.

### 3. What is \`ExecutorService\` vs raw \`Thread\`?
**Answer:** Pools reuse threads, queue tasks, handle lifecycle—raw threads are low-level—always use executors in apps.
\`Executors\` factory methods with caution—bounded queues preferred.

### 4. How do you stop a thread safely?
**Answer:** Cooperative cancellation via \`volatile\` flag or interrupt—\`stop()\` deprecated unsafe.
Interrupt blocking IO and waits to wake threads.

### 5. Scenario: fire-and-forget logging thread—what’s wrong with endless new Thread per log?
**Answer:** Resource exhaustion—use async appenders backed by bounded queues and thread pools.
Logging libraries handle this.

### 6. What is \`Callable\` and \`Future\`?
**Answer:** Callable returns result; Future.get blocks for completion—timeouts prevent hangs.
\`ExecutorService.submit\` returns Future.

### 7. Can you start a thread twice?
**Answer:** No—\`IllegalThreadStateException\`—create new Thread instance to rerun task.
Thread object state machine enforces this.

### 8. What is thread naming and why set it?
**Answer:** \`setName\` aids thread dumps and JFR—meaningful names for pool threads via factory.
Debugging production issues faster.

### 9. What is \`ThreadGroup\`—still relevant?
**Answer:** Mostly legacy—security manager removed—limited use in modern code.
Know for reading old systems.

### 10. How do virtual threads change creation advice?
**Answer:** Cheap enough per task for blocking IO—still use structured concurrency APIs when available—don’t block carrier threads with CPU work.
JDK 21+ ecosystem shift.

`,
  code: `// Thread Creation Demo

public class ThreadCreationDemo {
    public static void main(String[] args) {
        System.out.println("=== Thread Creation Demo ===\\n");
        System.out.println("Main thread: " + Thread.currentThread().getName());
        System.out.println();
        
        // 1. EXTENDING THREAD CLASS
        System.out.println("1. EXTENDING THREAD CLASS");
        System.out.println("   -----------------------");
        
        MyThread thread1 = new MyThread("Worker-1");
        thread1.start();
        
        MyThread thread2 = new MyThread("Worker-2");
        thread2.start();
        
        sleep(500);
        System.out.println();
        
        // 2. IMPLEMENTING RUNNABLE
        System.out.println("2. IMPLEMENTING RUNNABLE");
        System.out.println("   ----------------------");
        
        Thread thread3 = new Thread(new MyRunnable(), "Runnable-1");
        Thread thread4 = new Thread(new MyRunnable(), "Runnable-2");
        
        thread3.start();
        thread4.start();
        
        sleep(500);
        System.out.println();
        
        // 3. LAMBDA EXPRESSION
        System.out.println("3. LAMBDA EXPRESSION");
        System.out.println("   ------------------");
        
        Thread thread5 = new Thread(() -> {
            String name = Thread.currentThread().getName();
            System.out.println("   " + name + ": Lambda thread running!");
            sleep(100);
            System.out.println("   " + name + ": Lambda thread done!");
        }, "Lambda-1");
        
        thread5.start();
        
        // Inline lambda
        new Thread(() -> System.out.println("   Quick inline task!"), "Lambda-2").start();
        
        sleep(500);
        System.out.println();
        
        // 4. PASSING DATA TO THREADS
        System.out.println("4. PASSING DATA TO THREADS");
        System.out.println("   ------------------------");
        
        String[] tasks = {"Download", "Process", "Upload"};
        for (int i = 0; i < tasks.length; i++) {
            final int taskId = i + 1;
            final String taskName = tasks[i];
            
            new Thread(() -> {
                System.out.println("   Task " + taskId + ": " + taskName + " started");
                sleep(100);
                System.out.println("   Task " + taskId + ": " + taskName + " completed");
            }, "Task-" + taskId).start();
        }
        
        sleep(500);
        System.out.println();
        
        // 5. THREAD PRIORITY
        System.out.println("5. THREAD PRIORITY");
        System.out.println("   ----------------");
        
        Thread lowPriority = new Thread(() -> {
            System.out.println("   Low priority thread running");
        }, "LowPriority");
        lowPriority.setPriority(Thread.MIN_PRIORITY);
        
        Thread highPriority = new Thread(() -> {
            System.out.println("   High priority thread running");
        }, "HighPriority");
        highPriority.setPriority(Thread.MAX_PRIORITY);
        
        lowPriority.start();
        highPriority.start();
        
        sleep(200);
        System.out.println();
        
        // 6. DAEMON THREAD
        System.out.println("6. DAEMON THREAD");
        System.out.println("   --------------");
        
        Thread daemon = new Thread(() -> {
            System.out.println("   Daemon thread started");
            while (true) {
                sleep(100);
                System.out.println("   Daemon: Still running in background...");
            }
        }, "Daemon");
        daemon.setDaemon(true);
        daemon.start();
        
        sleep(350);  // Let daemon run a bit
        System.out.println("   (Daemon will stop when main thread ends)");
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Download Manager");
        System.out.println("   --------------------------------------");
        
        DownloadManager manager = new DownloadManager();
        manager.download("document.pdf");
        manager.download("image.png");
        manager.download("video.mp4");
        
        sleep(1500);
        System.out.println();
        
        System.out.println("Main thread ending...");
    }
    
    static void sleep(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// Method 1: Extending Thread
class MyThread extends Thread {
    public MyThread(String name) {
        super(name);
    }
    
    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        System.out.println("   " + name + ": Thread started");
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("   " + name + ": Thread finished");
    }
}

// Method 2: Implementing Runnable
class MyRunnable implements Runnable {
    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        System.out.println("   " + name + ": Runnable started");
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("   " + name + ": Runnable finished");
    }
}

// Real-world example
class DownloadManager {
    private int downloadCount = 0;
    
    public void download(String filename) {
        downloadCount++;
        Thread thread = new Thread(() -> {
            System.out.println("   Starting download: " + filename);
            try {
                // Simulate download time
                Thread.sleep(500 + (int)(Math.random() * 500));
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("   Completed: " + filename);
        }, "Download-" + downloadCount);
        
        thread.start();
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a multi-threaded file processor',
      hint: 'Create threads to process different files simultaneously',
      starterCode: `public class FileProcessorDemo {
    public static void main(String[] args) {
        System.out.println("=== Multi-threaded File Processor ===\\n");
        
        FileProcessor processor = new FileProcessor();
        
        // Process multiple files in parallel
        String[] files = {"data1.csv", "data2.csv", "data3.csv", "report.xlsx"};
        
        for (String file : files) {
            processor.processFile(file);
        }
        
        // Wait for all to complete
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("\\nAll files processed!");
    }
}

class FileProcessor {
    public void processFile(String filename) {
        Thread thread = new Thread(() -> {
            String threadName = Thread.currentThread().getName();
            System.out.println("[" + threadName + "] Starting: " + filename);
            
            // Simulate processing steps
            simulateStep("Reading", filename);
            simulateStep("Parsing", filename);
            simulateStep("Validating", filename);
            simulateStep("Saving", filename);
            
            System.out.println("[" + threadName + "] Completed: " + filename);
        }, "Processor-" + filename);
        
        thread.start();
    }
    
    private void simulateStep(String step, String filename) {
        System.out.println("  " + step + " " + filename + "...");
        try {
            Thread.sleep(200 + (int)(Math.random() * 300));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}`
    }
  ]
};

export default threadCreation;
