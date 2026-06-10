import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-chat-models',
  'Spring AI Chat Models',
  'ChatClient, message types, and how a real support chatbot should fetch data before answering.',
  'ChatClient is how your service talks to the model',
  'You already built one endpoint that sends a question and gets an answer. Now we go deeper: system messages vs user messages, multi-turn chat, and why a support bot must not guess order status.',
  ['Explain SystemMessage, UserMessage, and AssistantMessage', 'Use ChatClient.Builder with defaultSystem', 'Describe why multi-turn chat needs memory or history', 'Build a support service that never invents customer data'],
  {
    title: 'Customer messages your e-commerce support team',
    body: 'A buyer types "Where is my refund for order ORD-8821?" Your chat endpoint must look up that order in the database first. The model writes the polite reply — your Java code supplies the facts.',
    checks: ['System prompt sets tone: polite, short, honest', 'Never answer refund status without fetching order data', 'Store conversation id for follow-up messages', 'Return a fallback message when the model times out']
  },
  [
    { title: 'Message types', body: 'System = rules. User = customer text. Assistant = previous bot replies in history.' },
    { title: 'ChatClient setup', body: 'defaultSystem once in the builder; user message changes every request.' },
    { title: 'Support service', body: 'Fetch order, build prompt with real data, call ChatClient.' },
    { title: 'Multi-turn', body: 'Second message "What about delivery?" needs earlier context — add memory later.' }
  ],
  `
# Spring AI Chat Models

Every AI chat feature you build — tutor bot, support desk, FAQ — goes through a **chat model**. In Spring AI, you almost always use \`ChatClient\`. It is the friendly API on top of the lower-level \`ChatModel\`.

If the OpenAI integration module gave you a working endpoint, this module explains what is happening inside that call.

## Message Types

| Message | Purpose |
|---------|---------|
| SystemMessage | Defines behavior and rules |
| UserMessage | User question or task |
| AssistantMessage | Previous model answer in a conversation |

## Complete Customer Support Service (with real order data)

The service below **loads order facts from your database** before calling the model. This is how e-commerce support works in production.

\`\`\`java
package com.learnstackhub.springai.support;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class CustomerSupportAiService {

    private final ChatClient chatClient;
    private final OrderRepository orderRepository;

    public CustomerSupportAiService(ChatClient.Builder builder, OrderRepository orderRepository) {
        this.chatClient = builder
                .defaultSystem("""
                        You are a customer support assistant for an e-commerce company.
                        Be polite, short, and honest.
                        Explain order status using ONLY the order facts provided.
                        If order facts say NOT_FOUND, ask the customer for a valid order id.
                        Never invent tracking numbers or refund amounts.
                        """)
                .build();
        this.orderRepository = orderRepository;
    }

    public String reply(SupportChatRequest request) {
        OrderFacts facts = resolveOrderFacts(request.message(), request.orderId());

        String userPrompt = """
                Customer message: %s

                Order facts from our database:
                %s

                Write a helpful reply for the customer.
                """.formatted(request.message(), facts.toPromptText());

        return chatClient.prompt().user(userPrompt).call().content();
    }

    private OrderFacts resolveOrderFacts(String message, String orderId) {
        String id = orderId != null ? orderId : extractOrderId(message);
        if (id == null) {
            return OrderFacts.missing("No order id provided yet.");
        }
        return orderRepository.findByOrderNumber(id)
                .map(o -> new OrderFacts(o.orderNumber(), o.status(), o.refundStatus(), o.expectedDelivery()))
                .orElse(OrderFacts.notFound(id));
    }

    private String extractOrderId(String message) {
        // Simple example: extract ORD-1234 pattern
        if (message == null) return null;
        var matcher = java.util.regex.Pattern.compile("ORD-\\d+").matcher(message);
        return matcher.find() ? matcher.group() : null;
    }
}

record SupportChatRequest(String message, String orderId) {}

record OrderFacts(String orderNumber, String status, String refundStatus, String expectedDelivery) {
    static OrderFacts missing(String reason) { return new OrderFacts("N/A", "UNKNOWN", reason, "N/A"); }
    static OrderFacts notFound(String id) { return new OrderFacts(id, "NOT_FOUND", "N/A", "N/A"); }
    String toPromptText() {
        return "orderNumber=%s, status=%s, refundStatus=%s, expectedDelivery=%s"
                .formatted(orderNumber, status, refundStatus, expectedDelivery);
    }
}

interface OrderRepository {
    java.util.Optional<OrderEntity> findByOrderNumber(String orderNumber);
}

record OrderEntity(String orderNumber, String status, String refundStatus, String expectedDelivery) {}
\`\`\`

## Basic version (without order lookup — demo only)

\`\`\`java
@Service
public class CustomerSupportAiService {

    private final ChatClient chatClient;

    public CustomerSupportAiService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                        You are a customer support assistant for an e-commerce company.
                        Be polite, short, and honest.
                        If order data is missing, ask for the order id.
                        Do not invent refund status.
                        """)
                .build();
    }

    public String reply(String customerMessage) {
        return chatClient.prompt()
                .user(customerMessage)
                .call()
                .content();
    }
}
\`\`\`

Use the basic version only for learning ChatClient syntax. Ship the **order-aware version** in real projects.

## Real Project Warning

A model should not guess customer data. If the user asks "Where is my order?", your backend must fetch the order from database or call an order-service tool. The model can explain the result, but your code should provide the truth.

### application.properties — support chat connection

Same OpenAI connection as earlier modules. Support bots usually run **lower temperature** so refund and delivery wording stays consistent:

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.2
spring.ai.openai.chat.options.max-tokens=500
\`\`\`

**On-call reality:** When support chat "starts lying about orders," the bug is almost never the model — someone removed the \`orderRepository\` lookup or shipped the demo service without database wiring.

---

## Deep Explanation: ChatClient vs ChatModel

\`ChatModel\` is the lower-level model abstraction. \`ChatClient\` is the easier fluent API most Spring Boot developers start with.

Use \`ChatClient\` when:

- you are building REST APIs
- you need system/user prompts
- you want clean service-layer code
- you may later add tools, memory, or advisors

## Complete Controller for Customer Support Chat

\`\`\`java
package com.learnstackhub.springai.support;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support")
public class SupportChatController {

    private final CustomerSupportAiService customerSupportAiService;

    public SupportChatController(CustomerSupportAiService customerSupportAiService) {
        this.customerSupportAiService = customerSupportAiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<SupportChatResponse> chat(@Valid @RequestBody SupportChatRequest request) {
        String answer = customerSupportAiService.reply(request);
        return ResponseEntity.ok(new SupportChatResponse(answer));
    }
}

record SupportChatRequest(
        @NotBlank(message = "Message is required")
        @Size(min = 5, max = 1000) String message,
        String orderId
) {}

record SupportChatResponse(String answer) {}
\`\`\`

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/support/chat \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"message\\": \\"Where is my refund for order ORD-8821?\\",
    \\"orderId\\": \\"ORD-8821\\"
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/support/chat
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "message": "Where is my refund for order ORD-8821?",
  "orderId": "ORD-8821"
}
\`\`\`

Expected: answer mentions **your database status**, not an invented refund timeline.

## Multi-Turn Conversation Explanation

In a real chatbot, the second question depends on the first question.

Example:

1. User: "My order is delayed."
2. Bot: "Please share order id."
3. User: "ORD-1024."

Without memory, the app may not know that \`ORD-1024\` belongs to the previous delay question. That is why later we add memory. For the first version, send the last few messages from frontend or store them by conversation id.

## Production Rule

Do not allow the model to guess private data. For real order status, fetch the order from your database or order service and pass only the safe summary to the model.
`
);

export default topic;

