import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-real-time-projects',
  'Spring AI Real-Time Projects',
  'A learning path of projects from first chatbot to enterprise LMS assistant.',
  'Build in order — chatbot before agents',
  'Reading every module alone is not enough. You need projects on your resume. Start with a chat API, add prompts, then RAG, then tools. Jumping straight to multi-agent recruitment AI will frustrate you. This page is the recommended build order.',
  ['Pick a beginner project and list its endpoints', 'Order projects: chat → prompts → embeddings → RAG → tools → memory', 'Describe the LearnStackHub capstone architecture', 'Explain what to demo in an interview'],
  {
    title: 'Capstone: AI tutor for this learning platform',
    body: 'Employee asks a Spring Boot question. App searches training content chunks (RAG), answers with citation links, suggests the next topic, optionally generates an MCQ. That one project covers half this learning path.',
    checks: ['Phase 1: POST /api/tutor/ask with ChatClient', 'Phase 2: index tutorial content into VectorStore', 'Phase 3: citations + recommended next topics', 'Phase 4: auth, rate limits, monitoring']
  },
  [
    { title: 'Beginner', body: 'Chatbot, content generator, FAQ bot.' },
    { title: 'Intermediate', body: 'Resume parser, email generator, interview assistant.' },
    { title: 'Advanced', body: 'HRMS assistant, document analyzer, support platform.' },
    { title: 'Capstone', body: 'LearnStackHub AI tutor with RAG + memory + tools.' }
  ],
  `
# Spring AI Real-Time Projects

Theory without projects fades in a week. Here is the build order I recommend — each step uses what you learned in the previous modules.

## Beginner Projects

- AI Chatbot
- AI Content Generator
- AI FAQ Bot

## Intermediate Projects

- AI Resume Parser
- AI Email Generator
- AI Interview Assistant

## Advanced Projects

- AI HRMS Assistant
- AI Exam Evaluator
- AI Customer Support Platform
- AI Document Analyzer

## Enterprise Projects

- AI-Powered LearnStackHub Assistant
- AI LMS Tutor
- AI Recruitment System
- AI Knowledge Management System

## Best Learning Order

Start with chatbot, then prompt templates, then embeddings, then RAG, then tools, then memory, then agents. This order keeps the learning natural.

---

## Deep Capstone: AI-Powered LearnStackHub Assistant

This is the best enterprise project for your platform.

## Features

- student asks a Java/Spring question
- app searches LearnStackHub training content
- app retrieves relevant content chunks
- model answers using those chunks
- app suggests the next topic
- app can generate MCQ practice

## Architecture

\`\`\`text
React UI
  |
Spring Boot API
  |
AI Assistant Service
  |
Content Search / VectorStore
  |
ChatClient
  |
OpenAI or another model provider
\`\`\`

## Backend Modules

| Module | Responsibility |
|--------|----------------|
| ContentIngestionService | reads tutorial content and chunks it |
| EmbeddingService | creates vectors |
| ContentSearchService | finds relevant chunks |
| TutorAnswerService | builds final prompt |
| QuizToolService | creates MCQs from selected topic |
| AuditLogService | logs usage and errors |

## Development Order

1. Build simple chat API
2. Add prompt rules
3. Add content search
4. Add RAG answer
5. Add citations
6. Add quiz generation
7. Add memory for learning path
8. Add monitoring and cost control

## What Interviewers Like

This project proves you understand Spring Boot, REST APIs, AI integration, embeddings, RAG, prompt design, and production thinking.

---

## Project catalog with endpoints

### Beginner — AI FAQ Bot

| Endpoint | Purpose |
|----------|---------|
| POST /api/faq/ask | Answer from predefined FAQ list + ChatClient |
| GET /api/faq/topics | List categories |

Tech: ChatClient, low temperature, static FAQ context in prompt.

### Intermediate — AI Resume Parser

| Endpoint | Purpose |
|----------|---------|
| POST /api/resume/parse | Extract skills, experience, education |
| POST /api/resume/improve | Suggest project description rewrites |

Tech: Prompt engineering, validation, PII-safe logging.

### Advanced — Customer Support Platform

| Endpoint | Purpose |
|----------|---------|
| POST /api/support/chat | Order-aware chat with DB lookup |
| POST /api/support/tickets/{id}/summarize | Ticket summary for agents |

Tech: ChatClient, JPA, memory module, tools for order lookup.

### Enterprise — LearnStackHub AI Tutor (capstone)

| Phase | Endpoints | Modules used |
|-------|-----------|--------------|
| 1 | POST /api/tutor/ask | OpenAI integration, prompts |
| 2 | POST /api/content/index | Embeddings, vector DB |
| 3 | POST /api/tutor/ask (RAG) | RAG with citations |
| 4 | POST /api/tutor/quiz | Function calling / tools |
| 5 | All + auth + rate limits | Security, deployment |

### Capstone TutorAnswerService (outline)

\`\`\`java
@Service
public class TutorAnswerService {

    private final ChatClient chatClient;
    private final ContentSearchService contentSearchService;

    public TutorAnswerService(ChatClient.Builder builder, ContentSearchService contentSearchService) {
        this.chatClient = builder.defaultSystem("""
                You are LearnStackHub corporate Java trainer.
                Answer only from provided module excerpts.
                Cite module title when possible.
                """).build();
        this.contentSearchService = contentSearchService;
    }

    public TutorAnswerResponse answer(String question) {
        List<Document> chunks = contentSearchService.search(question, 4);
        String context = chunks.stream().map(Document::getText).reduce("", (a, b) -> a + "\\n---\\n" + b);
        String answer = chatClient.prompt().user("""
                Context:
                %s

                Question:
                %s
                """.formatted(context, question)).call().content();
        return new TutorAnswerResponse(answer, chunks.stream().map(d -> d.getMetadata().get("title")).toList());
    }
}

record TutorAnswerResponse(String answer, List<String> sources) {}
\`\`\`

Build this phase by phase. Each phase is a deployable milestone for your portfolio.

### Test with cURL — capstone tutor (Phase 3 RAG)

\`\`\`bash
curl -X POST http://localhost:8080/api/tutor/ask \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"question\\": \\"Explain Spring AI ChatClient with a backend example\\",
    \\"topic\\": \\"Spring AI\\"
  }"
\`\`\`

### Test with Postman — capstone tutor

\`\`\`text
POST http://localhost:8080/api/tutor/ask
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "question": "Explain Spring AI ChatClient with a backend example",
  "topic": "Spring AI"
}
\`\`\`

Expected (after RAG indexing is complete):

\`\`\`json
{
  "answer": "...",
  "sources": ["Spring AI Chat Models", "OpenAI Integration"]
}
\`\`\`

### Quick reference — all project endpoints

| Project | cURL one-liner |
|---------|----------------|
| FAQ Bot | \`curl -X POST localhost:8080/api/faq/ask -H "Content-Type: application/json" -d '{"question":"..."}'\` |
| Resume Parser | \`curl -X POST localhost:8080/api/resume/parse -H "Content-Type: application/json" -d '{"text":"..."}'\` |
| Support Chat | \`curl -X POST localhost:8080/api/support/chat -H "Content-Type: application/json" -d '{"message":"...","orderId":"ORD-1"}'\` |
| Capstone Tutor | \`curl -X POST localhost:8080/api/tutor/ask -H "Content-Type: application/json" -d '{"question":"...","topic":"Spring Boot"}'\` |

`
);

export default topic;
