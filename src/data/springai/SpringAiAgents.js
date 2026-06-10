import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-agents',
  'Spring AI Agents',
  'When one prompt is not enough — agents plan steps, use tools, and work toward a goal.',
  'An agent is a chatbot that can think in steps',
  'A simple chatbot answers one question. An agent handles "Plan my 3-day Hyderabad trip under 15k" — it breaks the goal into sub-tasks, may call tools for weather or distances, and assembles a final plan. Use agents only when the task truly needs multiple steps.',
  ['Define an AI agent vs a simple chat endpoint', 'Describe plan → tool → result → continue loop', 'Give a travel or HR hiring example', 'Explain why agents need stricter safety controls'],
  {
    title: 'HR wants help screening 50 resumes for one job post',
    body: 'One agent extracts skills from each resume. Another compares to the job description. A third drafts interview questions. A supervisor combines output. That is multi-step work — not a single prompt.',
    checks: ['Define clear stop condition — when is the task done?', 'Use tools for database and file access', 'Ask user before sending emails or updating records', 'Log each step for debugging and cost tracking']
  },
  [
    { title: 'When to use', body: 'Multi-step goals, not "what is Spring Boot?"' },
    { title: 'Loop', body: 'Understand goal → pick tool → execute → read result → repeat or finish.' },
    { title: 'Tools', body: 'Agents without tools still hallucinate — wire real data access.' },
    { title: 'Risk', body: 'More steps = more cost and more ways to go wrong.' }
  ],
  `
# Spring AI Agents

A **chat API** answers one message. An **agent** works on a **goal** that may take several steps.

Do not reach for agents on day one. Build a solid ChatClient endpoint first. Add agent patterns when users ask for things like "research this company and draft an outreach email."

## Agent Workflow

- Understand the goal
- Decide which information is missing
- Pick a tool
- Execute the tool
- Read the result
- Continue or finish

## Important Warning

Agents are powerful but risky. Start with read-only tools. Add write actions only with approval and validation.

---

## Deep Project: AI Travel Agent Workflow

An agent is useful when one user goal needs multiple steps.

User says:

\`\`\`text
Plan a 3-day Hyderabad trip under 15000 rupees.
\`\`\`

The agent may need to:

1. understand budget
2. choose places
3. group by day
4. estimate travel time
5. suggest hotel area
6. prepare final plan

## Agent Workflow Class Skeleton

\`\`\`java
package com.learnstackhub.springai.agent;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TravelAgentWorkflow {

    public TravelPlan plan(TravelRequest request) {
        List<String> places = selectPlaces(request.city(), request.days());
        String hotelArea = suggestHotelArea(request.city());
        List<String> dayPlan = buildDayPlan(places, request.days());

        return new TravelPlan(request.city(), hotelArea, dayPlan);
    }

    private List<String> selectPlaces(String city, int days) {
        return List.of("Charminar", "Golconda Fort", "Hussain Sagar", "Ramoji Film City");
    }

    private String suggestHotelArea(String city) {
        return "Stay near city center or metro-connected area";
    }

    private List<String> buildDayPlan(List<String> places, int days) {
        return places.stream()
                .limit(days * 2L)
                .toList();
    }
}

record TravelRequest(String city, int days, int budget) {
}

record TravelPlan(String city, String hotelArea, List<String> dayPlan) {
}
\`\`\`

## Important Teaching Point

Not every AI feature needs an agent. A simple chatbot is not an agent. An agent becomes useful when the app must plan and use tools across steps.

## Common Agent Problems

- too many steps
- tool calls without permission
- high cost
- no audit log
- final answer not checked

---

## AI-powered travel agent with ChatClient

Use an agent when **one prompt cannot cover all steps**. Below, Java orchestrates steps; ChatClient writes the final human-readable plan.

\`\`\`java
package com.learnstackhub.springai.agent;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelAgentService {

    private final ChatClient chatClient;
    private final TravelDataTools travelDataTools;

    public TravelAgentService(ChatClient.Builder builder, TravelDataTools travelDataTools) {
        this.chatClient = builder
                .defaultSystem("""
                        You are a travel planning assistant for India city trips.
                        Use tools for place lists and hotel areas. Stay within budget.
                        Return a day-by-day plan with estimated cost breakdown.
                        """)
                .defaultTools(travelDataTools)
                .build();
    }

    public String planTrip(TravelRequest request) {
        String prompt = """
                City: %s
                Days: %d
                Budget (INR): %d

                Create a practical itinerary. Mention travel tips and food budget.
                """.formatted(request.city(), request.days(), request.budget());

        return chatClient.prompt().user(prompt).call().content();
    }
}

@Component
class TravelDataTools {
    @org.springframework.ai.tool.annotation.Tool(description = "Popular tourist places for a city")
    public List<String> placesInCity(String city) {
        if ("Hyderabad".equalsIgnoreCase(city)) {
            return List.of("Charminar", "Golconda Fort", "Hussain Sagar", "Ramoji Film City");
        }
        return List.of("City center", "Local market", "Main temple or museum");
    }

    @org.springframework.ai.tool.annotation.Tool(description = "Suggested hotel area for budget travelers")
    public String hotelArea(String city) {
        return "Stay near metro or city center for " + city;
    }
}
\`\`\`

### TravelAgentController.java

\`\`\`java
@RestController
@RequestMapping("/api/travel")
public class TravelAgentController {

    private final TravelAgentService travelAgentService;

    public TravelAgentController(TravelAgentService travelAgentService) {
        this.travelAgentService = travelAgentService;
    }

    @PostMapping("/plan")
    public TravelPlanResponse plan(@RequestBody TravelRequest request) {
        return new TravelPlanResponse(travelAgentService.planTrip(request));
    }
}

record TravelPlanResponse(String plan) {}
\`\`\`

**When NOT to use an agent:** FAQ bot answering "What is Spring Boot?" — a single ChatClient call is enough.

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/travel/plan \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"city\\": \\"Hyderabad\\",
    \\"days\\": 3,
    \\"budget\\": 15000
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/travel/plan
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "city": "Hyderabad",
  "days": 3,
  "budget": 15000
}
\`\`\`

Expected: day-by-day plan with places, hotel area suggestion, and budget-aware tips. The model may call \`placesInCity\` and \`hotelArea\` tools during the response.
`
);

export default topic;
