const topic = {
  id: 'spring-ai-prompt-engineering',
  title: 'Prompt Engineering in Spring AI',
  description: 'Write prompts the way a team lead assigns work — role, context, rules, output format.',
  springAiHeadline: 'Prompts are instructions you give the model, not magic spells',
  springAiOpener: 'A bad prompt is like telling a new joiner "fix the bug" with no file name, no steps, no expected output. A good prompt says who you are, what data you have, what rules to follow, and exactly how to format the answer. That is prompt engineering — and in Spring Boot, you write these strings in your service class.',
  springAiSummary: 'System prompt sets permanent behavior. User prompt carries the actual task. Together they control what the API returns.',
  springAiOutcomes: [
    'Write a system prompt that sets role and tone once in ChatClient.Builder',
    'Build a dynamic user prompt with String.formatted or text blocks',
    'Compare a vague prompt vs a structured one and see the output difference',
    'List three prompt mistakes that cause bad API responses in production'
  ],
  springAiDesk: {
    title: 'HR asks you to build a resume review API for Java fresher candidates',
    body: 'Users paste resume text and pick a target role. Your service sends that to the model. If your prompt just says "review this resume," you get generic advice every time. If you specify role, scoring criteria, sections, and tone — you get something your frontend can actually display.',
    checks: [
      'System prompt: "You are a Java hiring mentor. Be honest, not harsh."',
      'User prompt: include target role, resume text, and numbered output sections',
      'Set max-tokens so one review does not return a 3-page essay',
      'Never log full resume text — it is personal data'
    ]
  },
  springAiFlow: [
    { title: 'Set the role (system prompt)', body: 'Defined once in defaultSystem — who the model is and how it should behave.' },
    { title: 'Pass the data (user prompt)', body: 'Resume text, job role, ticket details — whatever changes per request.' },
    { title: 'Add rules', body: 'Scoring scale, things to check, things to avoid, word limit.' },
    { title: 'Define output shape', body: 'Headings or sections your React page can parse and show separately.' }
  ],
  content: `
# Prompt Engineering in Spring AI

When a senior developer says "write the prompt properly," they mean: give the model the same clarity you would give a fresher on their first task assignment.

In Spring Boot, prompts live in your **service layer** — usually as Java text blocks (\`"""\`) built with \`String.formatted()\`. They are not configuration files. They are business logic. Change the prompt, change the product behavior.

## Bad Prompt

\`\`\`text
Review this resume.
\`\`\`

This is weak because the model does not know role, level, output format, scoring, or what kind of improvement matters.

## Better Prompt

\`\`\`text
You are reviewing a fresher Java backend resume.
Check Java, Spring Boot, SQL, project explanation, and interview readiness.
Return:
1. Overall score out of 10
2. Three strong points
3. Five improvements
4. One rewritten project description
\`\`\`

## Spring AI Prompt Template Example

\`\`\`java
package com.learnstackhub.springai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ResumeReviewService {

    private final ChatClient chatClient;

    public ResumeReviewService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String reviewResume(String resumeText, String targetRole) {
        String prompt = """
                You are a senior Java hiring mentor.
                Review this resume for the role: %s.

                Resume:
                %s

                Return the answer with these headings:
                Overall Score:
                Missing Skills:
                Project Improvements:
                Interview Preparation Plan:
                """.formatted(targetRole, resumeText);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}
\`\`\`

## Write prompts like you assign tasks at work

When your team lead gives you a task, they do not say "do something about the bug." They say: "In OrderService.java line 45, the null check is missing. Fix it and add a unit test." Do the same for the model — role, input, rules, expected output.

## Common Prompt Mistakes

| Mistake | What happens |
|--------|--------------|
| No system behavior | Model changes tone every time |
| Too much context | Cost increases and answer becomes noisy |
| No output format | Frontend cannot display cleanly |
| Asking many tasks together | Model skips some instructions |
| Logging prompts with private data | Security issue |

---

## Production project: AI Resume Reviewer API

**Requirement from HR:**

> Fresher uploads resume text and target role. Backend returns structured feedback as JSON for the corporate portal.

### ResumeReviewRequest.java

\`\`\`java
package com.learnstackhub.springai.resume;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResumeReviewRequest(
        @NotBlank @Size(min = 100, max = 6000) String resumeText,
        @NotBlank @Size(max = 80) String targetRole
) {}
\`\`\`

### ResumeReviewAiService.java

\`\`\`java
@Service
public class ResumeReviewAiService {

    private final ChatClient chatClient;

    public ResumeReviewAiService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                        You are a Java backend resume mentor for fresher roles.
                        Be honest and practical. Do not invent experience.
                        """)
                .build();
    }

    public String review(ResumeReviewRequest request) {
        String prompt = """
                Target role: %s
                Resume:
                %s

                Return sections:
                Overall Score (1-10):
                Strong Points:
                Missing Skills:
                Project Improvements:
                7-Day Interview Plan:
                """.formatted(request.targetRole(), request.resumeText());

        return chatClient.prompt().user(prompt).call().content();
    }
}
\`\`\`

### ResumeReviewController.java

\`\`\`java
@RestController
@RequestMapping("/api/hr/resume")
public class ResumeReviewController {

    private final ResumeReviewAiService service;

    public ResumeReviewController(ResumeReviewAiService service) {
        this.service = service;
    }

    @PostMapping("/review")
    public ResponseEntity<ResumeReviewResponse> review(@Valid @RequestBody ResumeReviewRequest request) {
        return ResponseEntity.ok(new ResumeReviewResponse(
                request.targetRole(),
                service.review(request)
        ));
    }
}

record ResumeReviewResponse(String targetRole, String review) {}
\`\`\`

Never log full resume text — it is personal data. Validate input length before calling OpenAI to control cost.

### application.properties for this module

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.2
spring.ai.openai.chat.options.max-tokens=800
\`\`\`

Lower temperature keeps resume feedback stable. \`max-tokens\` prevents a 6-page review for a one-page resume.

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/hr/resume/review \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"resumeText\\": \\"Java fresher with Spring Boot REST API project, JDBC, and Git experience. Built employee CRUD API.\\",
    \\"targetRole\\": \\"Java Backend Fresher\\"
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/hr/resume/review
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "resumeText": "Java fresher with Spring Boot REST API project, JDBC, and Git experience. Built employee CRUD API.",
  "targetRole": "Java Backend Fresher"
}
\`\`\`

Expected: response includes \`targetRole\` and a structured \`review\` with score, skills, and improvements — not a one-line generic answer.
`
};

export default topic;
