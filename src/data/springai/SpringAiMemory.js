import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-memory',
  'Spring AI Memory',
  'Keep conversation context so "What about delivery?" still makes sense after the user mentioned an order.',
  'Without memory, every message is the first message',
  'User says "My order is delayed." Bot asks for order id. User replies "ORD-1024." If your API has no memory, the second message looks random. Memory stores the last few turns so follow-ups work.',
  ['Define short-term vs persistent conversation memory', 'Design a conversation_id flow', 'Store messages in database for production', 'List what you should never store in AI memory'],
  {
    title: 'Learning assistant that remembers your current topic',
    body: 'Student asks about Spring Boot on Monday, JDBC on Tuesday. Memory keeps "we were discussing Connection pooling" so "show me an example" returns JDBC code, not random Spring Security.',
    checks: ['Generate conversation_id per user session', 'Store last 6–10 messages, not entire history', 'Expire old conversations after 30 days', 'Never store passwords, API keys, or PAN numbers']
  },
  [
    { title: 'The problem', body: 'Stateless HTTP + stateless model = amnesia every request.' },
    { title: 'Short-term', body: 'Send recent messages with each prompt.' },
    { title: 'Persistent', body: 'Save to ai_conversation_message table.' },
    { title: 'Privacy', body: 'Store only what the user agreed to; add TTL.' }
  ],
  `
# Spring AI Memory

Your REST API is stateless. OpenAI does not remember the last request unless **you** send the history again. Memory is your job.

## Types of Memory

| Type | Meaning |
|------|---------|
| Short-term | Recent messages in current conversation |
| Long-term | Stored facts or preferences |
| Persistent | Saved in database |
| Summary memory | Old messages compressed into summary |

## Real Project Rule

Do not store everything forever. Store what helps the user and what your privacy policy allows.

---

## Deep Project: Personal AI Assistant Memory

Memory is not magic. It is stored context.

## Conversation Table Design

\`\`\`sql
CREATE TABLE ai_conversation_message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id VARCHAR(80) NOT NULL,
    role VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
\`\`\`

## Memory Service Skeleton

\`\`\`java
package com.learnstackhub.springai.memory;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationMemoryService {

    private final List<String> messages = new ArrayList<>();

    public void saveUserMessage(String conversationId, String message) {
        messages.add("USER: " + message);
    }

    public void saveAssistantMessage(String conversationId, String message) {
        messages.add("ASSISTANT: " + message);
    }

    public List<String> recentMessages(String conversationId) {
        int fromIndex = Math.max(messages.size() - 6, 0);
        return messages.subList(fromIndex, messages.size());
    }
}
\`\`\`

This is in-memory only for learning. In production, use a database table.

## Production memory with JPA + ChatClient

\`\`\`java
package com.learnstackhub.springai.memory;

import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "ai_conversation_message")
class ConversationMessageEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String conversationId;
    private String role;
    @Column(length = 4000)
    private String content;
    private Instant createdAt;
    // getters/setters
}

interface ConversationMessageRepository extends JpaRepository<ConversationMessageEntity, Long> {
    List<ConversationMessageEntity> findTop10ByConversationIdOrderByCreatedAtDesc(String conversationId);
}

@Service
public class JpaConversationMemoryService {

    private final ConversationMessageRepository repository;

    public JpaConversationMemoryService(ConversationMessageRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void saveUserMessage(String conversationId, String message) {
        repository.save(entity(conversationId, "USER", message));
    }

    @Transactional
    public void saveAssistantMessage(String conversationId, String message) {
        repository.save(entity(conversationId, "ASSISTANT", message));
    }

    public List<String> recentMessages(String conversationId) {
        return repository.findTop10ByConversationIdOrderByCreatedAtDesc(conversationId).stream()
                .map(m -> m.getRole() + ": " + m.getContent())
                .toList();
    }

    private ConversationMessageEntity entity(String conversationId, String role, String content) {
        ConversationMessageEntity e = new ConversationMessageEntity();
        e.setConversationId(conversationId);
        e.setRole(role);
        e.setContent(content);
        e.setCreatedAt(Instant.now());
        return e;
    }
}
\`\`\`

### application.properties

Memory is **your database + prompt assembly** — Spring AI chat connection stays the same:

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.3
\`\`\`

**Production lesson:** Store conversation history in **your** MySQL/PostgreSQL table (as below), not in the model. OpenAI does not remember yesterday's chat unless you send it again in the prompt.

### Tutor service using memory

\`\`\`java
@Service
public class TutorChatService {

    private final ChatClient chatClient;
    private final JpaConversationMemoryService memoryService;

    public TutorChatService(ChatClient.Builder builder, JpaConversationMemoryService memoryService) {
        this.chatClient = builder.defaultSystem("You are a Java tutor. Use prior messages for context.").build();
        this.memoryService = memoryService;
    }

    public String chat(String conversationId, String question) {
        List<String> history = memoryService.recentMessages(conversationId);
        String prompt = """
                Conversation so far:
                %s

                New student question:
                %s
                """.formatted(String.join("\\n", history), question);

        String answer = chatClient.prompt().user(prompt).call().content();
        memoryService.saveUserMessage(conversationId, question);
        memoryService.saveAssistantMessage(conversationId, answer);
        return answer;
    }
}
\`\`\`

### TutorChatController.java

\`\`\`java
@RestController
@RequestMapping("/api/tutor/chat")
public class TutorChatController {

    private final TutorChatService tutorChatService;

    public TutorChatController(TutorChatService tutorChatService) {
        this.tutorChatService = tutorChatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody TutorChatRequest request) {
        String answer = tutorChatService.chat(request.conversationId(), request.question());
        return new ChatResponse(request.conversationId(), answer);
    }
}

record TutorChatRequest(String conversationId, String question) {}
record ChatResponse(String conversationId, String answer) {}
\`\`\`

### Test with cURL

First message:

\`\`\`bash
curl -X POST http://localhost:8080/api/tutor/chat \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"conversationId\\": \\"conv-101\\",
    \\"question\\": \\"What is dependency injection?\\"
  }"
\`\`\`

Follow-up (same conversation id):

\`\`\`bash
curl -X POST http://localhost:8080/api/tutor/chat \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"conversationId\\": \\"conv-101\\",
    \\"question\\": \\"Show me a Spring Boot example for that\\"
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/tutor/chat
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "conversationId": "conv-101",
  "question": "Show me a Spring Boot example for that"
}
\`\`\`

Expected: second answer references the earlier DI explanation because \`conv-101\` history is loaded from memory.

## What to Remember

Remember:

- user learning goal
- current conversation summary
- selected course/topic
- last few messages

Do not remember:

- passwords
- API keys
- payment data
- private data without permission

## Common Mistakes

- Sending entire old conversation every time
- Storing sensitive data
- No conversation id
- No cleanup/expiry
`
);

export default topic;

