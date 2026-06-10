import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-mcp',
  'Spring AI MCP',
  'MCP — a standard plug between your AI app and external tools like databases, files, and APIs.',
  'MCP stops you from writing a custom integration for every tool',
  'Without MCP, your AI app might have one custom wrapper for the database, another for Slack, another for GitHub. MCP defines one protocol: server exposes tools, client discovers and calls them. Spring AI supports this so integrations are reusable.',
  ['Explain MCP client vs MCP server', 'Compare custom integrations vs MCP standard', 'Name transports: stdio, SSE, HTTP', 'List security concerns for MCP servers'],
  {
    title: 'LearnStackHub exposes course search and MCQ tools via MCP',
    body: 'Any Spring AI app can connect to the MCP server and use those tools without copy-pasting integration code. Update the server once — all clients benefit.',
    checks: ['Server exposes tools with clear names and descriptions', 'Client authenticates before connecting', 'Never expose unrestricted file system or raw SQL write', 'Log tool calls on both sides']
  },
  [
    { title: 'Problem', body: 'Too many one-off AI integrations in one company.' },
    { title: 'MCP server', body: 'Hosts tools, resources, prompts.' },
    { title: 'MCP client', body: 'Your Spring AI app that consumes them.' },
    { title: 'Spring AI', body: 'Boot starters and annotations for MCP wiring.' }
  ],
  `
# Spring AI MCP

**MCP = Model Context Protocol.** A shared standard so AI applications connect to tools the same way USB-C connects devices — one shape, many devices.

Spring AI provides MCP support through Boot starters and annotations. This matters because AI applications increasingly need to interact with databases, files, APIs, and internal systems.

## MCP Roles

| Role | Meaning |
|------|---------|
| MCP Client | AI application that connects to tools |
| MCP Server | Exposes tools, resources, or prompts |
| Transport | Communication style such as stdio, SSE, or streamable HTTP |

## Fresher Explanation

Think of MCP like a common plug type. Instead of every AI app inventing a different way to call tools, MCP gives a standard connection pattern.

---

## Deep Explanation: MCP with Spring AI

MCP helps AI apps connect to external tools in a standard way.

Without MCP, every integration becomes custom:

- one format for database tool
- one format for file tool
- one format for weather tool
- one format for internal API tool

MCP gives a common protocol so clients can discover tools and call them consistently.

## MCP Server Thinking

An MCP server exposes capabilities.

Examples:

- read files
- search database
- call CRM API
- list company documents

## MCP Client Thinking

An MCP client connects to one or more MCP servers and makes those tools available to the AI app.

## Spring Boot Use Case

Imagine LearnStackHub has internal tools:

- course search tool
- MCQ generator tool
- student progress tool
- content file reader tool

Instead of hardcoding each integration in every AI app, expose them through MCP and let Spring AI consume them.

## Security Warnings

- Do not expose unrestricted file system access
- Do not expose raw database write tools
- Require authentication for HTTP MCP servers
- Log tool calls
- Keep secrets out of tool descriptions

---

## Spring Boot MCP client configuration

### Dependency

\`\`\`xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>
\`\`\`

### application.properties

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini

spring.ai.mcp.client.enabled=true
spring.ai.mcp.client.name=corporate-learning-assistant
spring.ai.mcp.client.type=SYNC
spring.ai.mcp.client.sse.connections.learning-tools.url=http://localhost:8090
\`\`\`

**Real-world setup:** MCP is still new in enterprise. Most teams run a separate MCP server (course search, ticket tools) and point Spring AI at it via these properties. If the server on port 8090 is down, your assistant should return a clear error — the model cannot invent live course data.

### Assistant service consuming MCP tools

\`\`\`java
package com.learnstackhub.springai.mcp;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class McpLearningAssistantService {

    private final ChatClient chatClient;

    public McpLearningAssistantService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                        You help employees find corporate training content.
                        Use MCP tools to search modules and generate practice questions.
                        """)
                .build();
    }

    public String ask(String question) {
        return chatClient.prompt().user(question).call().content();
    }
}
\`\`\`

MCP tools registered on the server (course search, MCQ generator) become available to ChatClient without hardcoding each integration in every app.

### MCP vs @Tool — decision table

| Situation | Use |
|-----------|-----|
| Tool lives in same Spring Boot app | \`@Tool\` + \`defaultTools()\` |
| Tool shared by 5+ AI apps across teams | MCP server |
| Quick internal demo | \`@Tool\` |
| Enterprise platform with plugin ecosystem | MCP |

### McpLearningAssistantController.java

\`\`\`java
@RestController
@RequestMapping("/api/learning")
public class McpLearningAssistantController {

    private final McpLearningAssistantService assistantService;

    public McpLearningAssistantController(McpLearningAssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/ask")
    public AssistantResponse ask(@RequestBody AssistantRequest request) {
        return new AssistantResponse(assistantService.ask(request.question()));
    }
}

record AssistantRequest(String question) {}
record AssistantResponse(String answer) {}
\`\`\`

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/learning/ask \\
  -H "Content-Type: application/json" \\
  -d "{\\"question\\":\\"Find Spring Boot modules about REST API and create 3 practice questions\\"}"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/learning/ask
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "question": "Find Spring Boot modules about REST API and create 3 practice questions"
}
\`\`\`

Expected: answer uses MCP-connected tools (course search, MCQ generator) when the MCP server is running on port 8090. If the server is down, you should get a clean error — not a hallucinated module list.

`
);

export default topic;
