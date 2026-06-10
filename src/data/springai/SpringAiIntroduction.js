const topic = {
  id: 'spring-ai-introduction',
  title: 'Introduction to Spring AI',
  description: 'Understand AI, GenAI, LLMs, and where Spring AI fits in a normal Spring Boot backend — explained step by step for freshers.',
  springAiHeadline: 'Start here: what Spring AI actually does in a Spring Boot project',
  springAiOpener: 'When I first heard "Spring AI," I thought it meant putting ChatGPT inside Java. That is partly true — but in a real company, your job is not to open a chat window. Your job is to receive a user question, fetch the right data, call the model safely from the backend, and return a clean JSON response. That is what this learning path teaches.',
  springAiSummary: 'Spring AI is a Spring library that lets your existing Spring Boot app talk to AI models — the same way you already use JPA, JDBC, or RestTemplate.',
  springAiOutcomes: [
    'Explain the difference between AI, ML, and GenAI in plain words',
    'Describe what an LLM, token, prompt, and temperature mean',
    'Draw where Spring AI sits inside a normal controller → service → repository app',
    'Explain why the model does not know your database unless you give it data'
  ],
  springAiDesk: {
    title: 'Your team lead assigns you: add an AI help button to the support portal',
    body: 'The portal already has Spring Boot REST APIs, a MySQL database, and a React frontend. Users raise tickets. Now they also want a "Summarize my issue" button. You are not building a new app. You are adding one feature inside the service layer — same as adding email sending or PDF export.',
    checks: [
      'The OpenAI key stays in application.properties via ${OPENAI_API_KEY} — never hard-coded, never in React',
      'The controller stays thin; AI logic goes in a service class',
      'You fetch ticket data from the database first, then ask the model to summarize it',
      'If OpenAI is slow or down, return a proper error — not a stack trace'
    ]
  },
  springAiFlow: [
    { title: 'User hits your API', body: 'POST /api/support/summarize with a ticket id — same as any other REST call.' },
    { title: 'Your service prepares context', body: 'Load ticket from DB, build a prompt with that data, set temperature and model name.' },
    { title: 'Spring AI calls the model', body: 'ChatClient sends the prompt to OpenAI (or Ollama, Azure, etc.) and gets text back.' },
    { title: 'You return JSON', body: 'Wrap the answer in a DTO and send it to the frontend. Done.' }
  ],
  content: `
# Introduction to Spring AI

You already know Spring Boot: controller, service, repository, \`application.properties\`, Maven dependencies. Spring AI does not change that structure. It adds one more thing your service layer can do — call an AI model.

Think of it like adding email support. You do not rewrite the whole project. You add a dependency, write a service method, expose an endpoint. Spring AI works the same way.

---

## First, let us clear the jargon

People throw around AI, ML, GenAI, and LLM in the same sentence. Here is what they actually mean, with examples you will recognize.

### AI (Artificial Intelligence)

The broad idea: software that does something that feels "smart" — understanding language, making predictions, classifying images.

**Real example:** A support bot that reads "My payment failed" and routes the ticket to the billing team.

### ML (Machine Learning)

A specific approach: the program learns patterns from data instead of someone writing every rule by hand.

**Real example:** Your company has 50,000 old tickets labeled "urgent" or "normal." An ML model learns which words usually mean urgent. New tickets get auto-tagged.

### Deep Learning

ML using neural networks with many layers. Large Language Models (ChatGPT, Claude, etc.) are built with deep learning.

You do not need to build these models. As a Spring Boot developer, you **use** them through an API.

### GenAI (Generative AI)

AI that **creates** new content — text, code, images — from a prompt you send.

**Real example:** User pastes a resume. Your API sends it to the model with instructions: "List missing skills for a Java fresher role." The model writes a new response. That is generation.

| Term | One-line meaning | What you build in Spring Boot |
|------|------------------|-------------------------------|
| AI | Smart software in general | A support assistant endpoint |
| ML | Learns from historical data | Ticket urgency predictor |
| Deep Learning | Neural networks, many layers | You call LLMs; you do not train them |
| GenAI | Creates new text/code/images | Resume reviewer, FAQ bot, email drafter |

---

## What is an LLM?

**LLM = Large Language Model.** Models like GPT-4, Claude, or Llama that read text and write text.

They are trained on huge amounts of public text. That is why they can explain Spring Boot or write Java code. But they were **not** trained on your company's database, your HR policy PDF, or today's order table.

Remember this line — interviewers love it:

> The model is good at language. Your Spring Boot app is responsible for facts.

### Words you will see every day

**Prompt** — The instruction and context you send to the model. In code, this is often a String you build in your service class.

**Token** — A small chunk of text the model processes. Not always one word. "Spring" might be one token; "Boot" might be another. Providers charge per token (input + output).

**Context window** — How much text the model can read in one request. If you paste an entire 200-page PDF, it will not fit. You send only the relevant parts (we cover RAG in a later module).

**Temperature** — How random the answer is.

| Value | What you get | When to use |
|-------|--------------|-------------|
| 0.0 – 0.3 | Stable, factual | Tutoring, support, code help |
| 0.4 – 0.7 | Balanced | Email drafts, suggestions |
| 0.8+ | Creative, varied | Marketing copy, brainstorming |

For backend APIs that teach or support users, keep temperature **low** (0.2 or 0.3). You want the same question to get a similar correct answer, not a creative story.

### Why tokens matter for your wallet

Every API call costs money based on tokens. A careless service that sends a 10,000-word document on every request will burn budget fast.

**Bad:** Send full PDF text in every prompt.

**Good:** Split the PDF into chunks, store embeddings, retrieve only the 3–5 relevant paragraphs (RAG — covered later).

---

## What is Spring AI exactly?

Spring AI is an official Spring project. It gives you Java APIs that feel like the rest of Spring:

- Add a Maven dependency (\`spring-ai-starter-model-openai\` for OpenAI)
- Put your provider API key in an **environment variable** — reference it from \`application.properties\` as \`\${OPENAI_API_KEY}\`, never hard-code the secret
- Spring Boot **auto-configures** the connection; you inject \`ChatClient.Builder\` in your service and call \`.build()\`
- Call \`chatClient.prompt().user(...).call().content()\` — return the result to your controller

Without Spring AI, developers write raw HTTP calls to OpenAI with \`RestTemplate\` or \`WebClient\`. That works once. Then you need streaming, retries, switching from OpenAI to Ollama, vector search, tool calling — and the code becomes a mess. Spring AI gives you one consistent way to do all of that.

---

## How Spring Boot connects to an AI provider (preview)

You will build this step by step in the **OpenAI Integration** module. Here is the full chain so you know what "connection" means:

| Step | What you do | What Spring does |
|------|-------------|------------------|
| 1 | Create an API key at [platform.openai.com](https://platform.openai.com) | — |
| 2 | Store the key as \`OPENAI_API_KEY\` (env var or IDE run config) — **not in Git** | — |
| 3 | Add \`spring-ai-bom\` + \`spring-ai-starter-model-openai\` in \`pom.xml\` | Pulls in OpenAI client + auto-configuration |
| 4 | Add Spring AI settings to \`src/main/resources/application.properties\` | Reads the key at startup |
| 5 | Inject \`ChatClient.Builder\` in your \`@Service\` | Starter creates the builder bean wired to OpenAI |
| 6 | Expose a REST endpoint | Your app calls OpenAI over HTTPS; frontend only calls your API |

\`\`\`properties
# src/main/resources/application.properties
spring.application.name=learnstackhub-ai-demo

# Connection to OpenAI — secret comes from env var, not from Git
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.3
\`\`\`

\`\`\`text
Your React app  -->  POST /api/ai/chat  -->  AiChatService  -->  ChatClient  -->  OpenAI API
                                                      ^
                                           OPENAI_API_KEY from env / IDE run config
                                           spring.ai.openai.* from application.properties
\`\`\`

**Important:** Spring AI does not magically connect on its own. If the env var is missing, the app fails at startup with an API key error. That is expected — it protects you from deploying without credentials.

---

## What this looks like on a real project (first week)

This is how teams actually wire Spring AI — not theory from a slide deck.

**Day 1 — You get access, not a tutorial.** Your lead shares an OpenAI key through the company password vault (or Azure Key Vault / AWS Secrets Manager in production). They tell you: put it in your local environment, never in source control.

**Day 2 — You add the starter and properties.** Same pattern as JDBC: one dependency in \`pom.xml\`, connection details in \`application.properties\`. The properties file holds **placeholders** (\`\${OPENAI_API_KEY}\`); the actual secret lives in your shell or IDE run configuration.

**Day 3 — You prove it works.** Hit \`POST /api/ai/chat\` from Postman. If you get JSON back, the connection is live. If startup fails, 99% of the time someone forgot to export the env var in the terminal running Spring Boot.

**Day 4 — Code review feedback you should expect:**
- "Move AI logic out of the controller" — service layer only
- "Add validation before calling the model" — empty questions still cost money
- "Do not log the full prompt if it contains PII" — resumes, tickets, PAN numbers
- "Set max-tokens and temperature in properties" — so ops can tune without redeploying Java code

**Production difference:** Dev uses \`application.properties\` + local env var. Staging/prod uses \`application-prod.properties\` and the platform injects \`OPENAI_API_KEY\` from a secret store (Docker \`-e\`, Kubernetes Secret, etc.). The Java code stays identical.

---

## Where Spring AI sits in your project

Your project structure does not change. AI is one more responsibility in the **service layer**.

\`\`\`text
React / Postman / Mobile
        |
        v
   Controller          <-- receives HTTP, validates input
        |
        v
   Service             <-- builds prompt, calls ChatClient
        |
        +--> Repository --> Database (orders, tickets, users)
        |
        +--> ChatClient  --> OpenAI / Ollama / Azure
        |
        v
   Response DTO        <-- clean JSON back to client
\`\`\`

| Layer | Normal job | With Spring AI added |
|-------|------------|----------------------|
| Controller | Map HTTP to service | Same — no AI logic here |
| Service | Business rules | Also builds prompt and calls ChatClient |
| Repository | Database access | Same — often called **before** AI |
| Security | Login, roles | Protect AI endpoints — they cost money |
| Exception handler | Clean errors | Handle model timeout, bad API key, rate limits |

---

## A story that shows the right way

User opens your e-commerce app and asks: **"What is my order status?"**

**Wrong approach**

\`\`\`text
Frontend --> POST /api/chat --> Service sends only "What is my order status?" to OpenAI
\`\`\`

The model has no idea who this user is. It might invent an order number or say something generic. That is called **hallucination**.

**Right approach**

1. User is logged in (Spring Security gives you user id).
2. Service calls \`orderRepository.findByUserId(userId)\`.
3. Service builds a prompt: "User has one order: ORD-1024, status SHIPPED, expected delivery June 12. Explain this clearly to the customer."
4. ChatClient sends that prompt to the model.
5. Model writes a friendly sentence. You return it in JSON.

The model did the **writing**. Your Java code did the **facts**.

---

## Real-world mini project: ticket summarizer (concept walkthrough)

Your team lead wants a **Summarize ticket** button. Here is the shape of that feature — you will build the full OpenAI version in the next module.

### Ticket entity and repository

\`\`\`java
package com.learnstackhub.springai.support;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
}

@Entity
@Table(name = "support_ticket")
class SupportTicket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subject;
    @Column(length = 4000)
    private String description;
    private String status;
    // getters/setters
}
\`\`\`

### Service — fetch facts first, then ask model to summarize

\`\`\`java
package com.learnstackhub.springai.support;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class TicketSummaryService {

    private final SupportTicketRepository ticketRepository;
    private final ChatClient chatClient;

    public TicketSummaryService(SupportTicketRepository ticketRepository, ChatClient.Builder builder) {
        this.ticketRepository = ticketRepository;
        this.chatClient = builder
                .defaultSystem("Summarize support tickets in 2-3 sentences for agents. Be factual.")
                .build();
    }

    public String summarize(Long ticketId) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException(ticketId));

        String prompt = """
                Ticket subject: %s
                Ticket status: %s
                Customer description:
                %s

                Write a short summary an agent can read in 10 seconds.
                """.formatted(ticket.getSubject(), ticket.getStatus(), ticket.getDescription());

        return chatClient.prompt().user(prompt).call().content();
    }
}
\`\`\`

### Controller

\`\`\`java
@RestController
@RequestMapping("/api/support")
public class TicketSummaryController {

    private final TicketSummaryService ticketSummaryService;

    public TicketSummaryController(TicketSummaryService ticketSummaryService) {
        this.ticketSummaryService = ticketSummaryService;
    }

    @PostMapping("/tickets/{id}/summarize")
    public SummaryResponse summarize(@PathVariable Long id) {
        return new SummaryResponse(ticketSummaryService.summarize(id));
    }
}

record SummaryResponse(String summary) {}
\`\`\`

**Why this is correct:** Java loads ticket #4821 from MySQL. The model never guesses the subject line. If the ticket does not exist, you return 404 — not a fake AI summary.

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/support/tickets/4821/summarize
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/support/tickets/4821/summarize
\`\`\`

Expected response:

\`\`\`json
{
  "summary": "Customer reports payment failure on order ORD-8821. Ticket is open and assigned to billing."
}
\`\`\`

The summary must reflect **your ticket row in the database**, not generic AI text.

---

## What Spring AI gives you beyond basic chat

As you move through this learning path, you will use these pieces:

| Feature | Plain explanation |
|---------|-------------------|
| ChatClient | The main API for sending prompts and getting answers |
| Embeddings | Turn text into numbers so you can search by meaning |
| VectorStore | Database that stores those numbers for fast similarity search |
| RAG | Retrieve relevant document chunks, then ask the model to answer from them |
| Tools / Function calling | Let the model call your Java methods to get real data |
| Memory | Remember earlier messages in the same conversation |
| MCP | Standard way to connect AI to external tools and systems |

You do not need all of these on day one. Start with ChatClient and one REST endpoint. Add the rest when the requirement appears.

---

## Common fresher mistakes

**Mistake 1:** Putting the OpenAI API key in React or Android app.

Anyone can open browser dev tools and steal it. Key stays on the server.

**Mistake 2:** Trusting the model's answer without checking.

Treat AI output like user input — validate before saving to database or sending emails.

**Mistake 3:** Sending the whole company wiki in every prompt.

Use RAG or fetch only what you need. Control cost and latency.

**Mistake 4:** Putting all logic in the controller.

Same rule as always: controller handles HTTP, service handles business logic including AI.

---

## How to answer in an interview

**Q: What is Spring AI?**

Spring AI is a Spring project that helps Spring Boot applications integrate with AI models. It provides abstractions like ChatClient for chat, embedding models for semantic search, vector stores for RAG, and tool calling so the model can invoke Java methods — all configured through Spring Boot's usual dependency injection and \`application.properties\`.

**Q: Does the AI model know my database?**

No. The model only knows what you send in the prompt. Your application must fetch data from the database and include it in the prompt, or expose database access through tool methods the model can call.

**Q: Why not call OpenAI directly with RestTemplate?**

You can for a demo. Spring AI gives a maintained abstraction for multiple providers, streaming, advisors, RAG, and tools — so the codebase stays consistent as requirements grow.

---

## What comes next

In the next module we wire up a real Spring Boot project: Maven dependency, \`application.properties\`, API key via environment variable, a service with \`ChatClient.Builder\`, and a POST endpoint you can test with Postman or cURL.
`
};

export default topic;
