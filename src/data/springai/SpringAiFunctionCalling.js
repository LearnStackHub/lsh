import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-function-calling',
  'Spring AI Function Calling and Tools',
  'Let the model call your Java methods when it needs real database data.',
  'Tools connect AI language to your actual backend',
  'User asks "How many people are in the Java team?" The model cannot query your database. But it can call a @Tool method you wrote — findEmployeesByDepartment("Java") — and then explain the result in plain English.',
  ['Explain tool calling vs guessing', 'Write a @Tool method with a clear description', 'Wire tools into ChatClient', 'List security rules for exposed tools'],
  {
    title: 'Manager chats with an internal HR assistant',
    body: '"List employees in the Testing department." The model picks your tool, Java runs the query, returns names. The model formats the answer. No invented names.',
    checks: ['Start with read-only tools only', 'Write description so the model knows when to call it', 'Validate department name before query', 'Log every tool invocation for audit']
  },
  [
    { title: 'The gap', body: 'Model has language; your DB has facts.' },
    { title: '@Tool', body: 'Annotate Java methods the model can invoke.' },
    { title: 'Flow', body: 'User question → model chooses tool → your code runs → model summarizes.' },
    { title: 'Safety', body: 'No delete/update tools without human approval.' }
  ],
  `
# Spring AI Function Calling and Tools

**Tool calling** (also called function calling) is the bridge between "the model talks well" and "the model uses real data."

You write normal Java methods. Spring AI exposes them to the model. When the question needs facts, the model calls your method instead of making things up.

## Example Thinking

User: "Show employees in the Java department."

Wrong: model guesses employee names.

Right: model calls a Java method that queries the database, then explains the result.

## Tool Method Example

\`\`\`java
package com.learnstackhub.springai.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class EmployeeTools {

    @Tool(description = "Find employees by department name")
    public List<String> findEmployeesByDepartment(String department) {
        if ("Java".equalsIgnoreCase(department)) {
            return List.of("Ravi", "Amit", "Dattu");
        }
        return List.of();
    }
}
\`\`\`

## Security Rule

Never expose dangerous operations directly. A model should not be allowed to delete records, transfer money, or change passwords without strict validation and user confirmation.

---

## Deep Project: Employee Management AI Assistant

Requirement:

> "Manager asks: How many employees are in Java department? AI should call backend data and answer."

## Employee Service

\`\`\`java
package com.learnstackhub.springai.employee;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final List<Employee> employees = List.of(
            new Employee(1L, "Ravi", "Java", 45000),
            new Employee(2L, "Amit", "Testing", 38000),
            new Employee(3L, "Dattu", "Java", 55000)
    );

    public List<Employee> findByDepartment(String department) {
        return employees.stream()
                .filter(employee -> employee.department().equalsIgnoreCase(department))
                .toList();
    }
}

record Employee(Long id, String name, String department, int salary) {
}
\`\`\`

## Tool Class

\`\`\`java
package com.learnstackhub.springai.employee;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class EmployeeTools {

    private final EmployeeService employeeService;

    public EmployeeTools(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Tool(description = "Find employee names by department")
    public List<String> employeeNamesByDepartment(String department) {
        return employeeService.findByDepartment(department)
                .stream()
                .map(Employee::name)
                .toList();
    }
}
\`\`\`

## Why Tool Calling Matters

AI can explain data, but Java must fetch data. Tool calling connects the two.

## Tool Safety Rules

- Start with read-only tools
- Validate tool arguments
- Do not expose salary or personal data unless authorized
- Add audit logs for tool calls
- Do not allow delete/update tools without confirmation

### application.properties

Tool calling uses the same OpenAI chat connection — tools are Java methods your service registers; the model only decides **when** to call them:

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.1
\`\`\`

Keep temperature low for HR/internal tools so the model reliably chooses \`employeeNamesByDepartment\` instead of inventing names.

---

## Wire tools into ChatClient (complete assistant)

\`\`\`java
package com.learnstackhub.springai.employee;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.stereotype.Service;

@Service
public class EmployeeAssistantService {

    private final ChatClient chatClient;

    public EmployeeAssistantService(ChatClient.Builder builder, EmployeeTools employeeTools) {
        this.chatClient = builder
                .defaultSystem("""
                        You are an internal HR assistant.
                        When the user asks for employee lists or counts, call the available tools.
                        Do not invent employee names.
                        """)
                .defaultTools(employeeTools)
                .build();
    }

    public String ask(String question) {
        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}
\`\`\`

### EmployeeAssistantController.java

\`\`\`java
@RestController
@RequestMapping("/api/hr/assistant")
public class EmployeeAssistantController {

    private final EmployeeAssistantService employeeAssistantService;

    public EmployeeAssistantController(EmployeeAssistantService employeeAssistantService) {
        this.employeeAssistantService = employeeAssistantService;
    }

    @PostMapping("/ask")
    public AssistantResponse ask(@RequestBody AssistantRequest request) {
        return new AssistantResponse(employeeAssistantService.ask(request.question()));
    }
}

record AssistantRequest(String question) {}
record AssistantResponse(String answer) {}
\`\`\`

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/hr/assistant/ask \\
  -H "Content-Type: application/json" \\
  -d "{\\"question\\":\\"List employee names in Java department\\"}"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/hr/assistant/ask
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "question": "List employee names in Java department"
}
\`\`\`

Expected: answer lists real names from your \`EmployeeService\` tool call — not invented names.

Flow: model sees the question → chooses \`employeeNamesByDepartment\` tool → your Java method queries data → model formats the list in natural language.

`
);

export default topic;
