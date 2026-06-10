import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-multi-agent-systems',
  'Spring AI Multi-Agent Systems',
  'Several specialist agents + one supervisor — when one brain is doing too much.',
  'Split work like a team: resume agent, job agent, interview agent',
  'One giant prompt that says "read resume, match job, write questions, score candidate" confuses the model. Multi-agent means each agent has one job. A supervisor agent collects their outputs and produces the final report.',
  ['Define supervisor vs worker agents', 'Map agents to recruitment or support workflows', 'Explain orchestration in Java services', 'Warn when multi-agent is overkill'],
  {
    title: 'Recruitment platform analyzing one candidate against one role',
    body: 'Resume Reader extracts skills. Job Matcher scores fit. Interview Agent writes questions. Supervisor merges into one PDF-ready report. Each agent has a narrow system prompt — better quality than one mega-prompt.',
    checks: ['One responsibility per agent — no overlap', 'Supervisor validates before returning to user', 'Track token cost per agent', 'Do not build this until single-agent flow works']
  },
  [
    { title: 'Why split', body: 'Specialist prompts beat one overloaded prompt.' },
    { title: 'Workers', body: 'Each does one task with its own tools.' },
    { title: 'Supervisor', body: 'Orchestrates, merges, quality-checks.' },
    { title: 'When not to', body: 'Simple FAQ bot does not need five agents.' }
  ],
  `
# Spring AI Multi-Agent Systems

**Multi-agent** = more than one AI worker coordinated toward one outcome.

Use it when a single agent keeps missing parts of a complex workflow. Do not use it to sound impressive in a demo.

## Example

| Agent | Work |
|-------|------|
| Resume Agent | Extract skills and experience |
| Job Agent | Understand job requirements |
| Interview Agent | Prepare questions |
| Supervisor Agent | Combine and decide final response |

## Real Project Advice

Do not create multiple agents because it sounds advanced. Use them only when one agent becomes too broad or confused.

---

## Deep Project: AI Recruitment Platform

Multi-agent systems are useful when each part of the work needs a different specialist behavior.

## Agents

| Agent | Responsibility |
|-------|----------------|
| Resume Reader Agent | Extracts skills, education, projects |
| Job Matcher Agent | Compares candidate with job description |
| Interview Agent | Creates interview questions |
| Supervisor Agent | Produces final recommendation |

## Java Orchestration Skeleton

\`\`\`java
package com.learnstackhub.springai.recruitment;

import org.springframework.stereotype.Service;

@Service
public class RecruitmentSupervisorService {

    private final ResumeReaderAgent resumeReaderAgent;
    private final JobMatcherAgent jobMatcherAgent;
    private final InterviewQuestionAgent interviewQuestionAgent;

    public RecruitmentSupervisorService(
            ResumeReaderAgent resumeReaderAgent,
            JobMatcherAgent jobMatcherAgent,
            InterviewQuestionAgent interviewQuestionAgent) {
        this.resumeReaderAgent = resumeReaderAgent;
        this.jobMatcherAgent = jobMatcherAgent;
        this.interviewQuestionAgent = interviewQuestionAgent;
    }

    public RecruitmentReport analyze(String resumeText, String jobDescription) {
        String resumeSummary = resumeReaderAgent.extract(resumeText);
        String matchReport = jobMatcherAgent.compare(resumeSummary, jobDescription);
        String questions = interviewQuestionAgent.createQuestions(resumeSummary, jobDescription);

        return new RecruitmentReport(resumeSummary, matchReport, questions);
    }
}

record RecruitmentReport(String resumeSummary, String matchReport, String questions) {
}
\`\`\`

## Common Mistake

Do not build multi-agent systems too early. First make one reliable AI flow. Split into agents only when responsibilities are clearly different.

---

## Full worker agent implementations

\`\`\`java
package com.learnstackhub.springai.recruitment;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Component
class ResumeReaderAgent {

    private final ChatClient chatClient;

    ResumeReaderAgent(ChatClient.Builder builder) {
        this.chatClient = builder.defaultSystem("Extract skills, projects, and education from resumes. Be concise.").build();
    }

    String extract(String resumeText) {
        return chatClient.prompt().user("Resume:\\n" + resumeText).call().content();
    }
}

@Component
class JobMatcherAgent {

    private final ChatClient chatClient;

    JobMatcherAgent(ChatClient.Builder builder) {
        this.chatClient = builder.defaultSystem("Compare candidate summary with job description. Score fit 1-10.").build();
    }

    String compare(String resumeSummary, String jobDescription) {
        String prompt = """
                Candidate summary:
                %s

                Job description:
                %s

                Return: fit score, matching skills, gaps.
                """.formatted(resumeSummary, jobDescription);
        return chatClient.prompt().user(prompt).call().content();
    }
}

@Component
class InterviewQuestionAgent {

    private final ChatClient chatClient;

    InterviewQuestionAgent(ChatClient.Builder builder) {
        this.chatClient = builder.defaultSystem("Create 8 interview questions for Java backend roles.").build();
    }

    String createQuestions(String resumeSummary, String jobDescription) {
        return chatClient.prompt().user("""
                Based on this candidate and job, write interview questions:
                Candidate: %s
                Job: %s
                """.formatted(resumeSummary, jobDescription)).call().content();
    }
}
\`\`\`

### REST endpoint

\`\`\`java
@RestController
@RequestMapping("/api/recruitment")
public class RecruitmentController {

    private final RecruitmentSupervisorService supervisorService;

    public RecruitmentController(RecruitmentSupervisorService supervisorService) {
        this.supervisorService = supervisorService;
    }

    @PostMapping("/analyze")
    public RecruitmentReport analyze(@RequestBody RecruitmentRequest request) {
        return supervisorService.analyze(request.resumeText(), request.jobDescription());
    }
}

record RecruitmentRequest(String resumeText, String jobDescription) {}
\`\`\`

Each agent = one ChatClient with a **narrow system prompt**. Supervisor runs them in sequence and merges output.

### Test with cURL

\`\`\`bash
curl -X POST http://localhost:8080/api/recruitment/analyze \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"resumeText\\": \\"Java developer with Spring Boot, REST APIs, MySQL, and 2 years experience.\\",
    \\"jobDescription\\": \\"Hiring Java backend developer with Spring Boot and SQL skills.\\"
  }"
\`\`\`

### Test with Postman

\`\`\`text
POST http://localhost:8080/api/recruitment/analyze
Content-Type: application/json
\`\`\`

Body:

\`\`\`json
{
  "resumeText": "Java developer with Spring Boot, REST APIs, MySQL, and 2 years experience.",
  "jobDescription": "Hiring Java backend developer with Spring Boot and SQL skills."
}
\`\`\`

Expected response shape:

\`\`\`json
{
  "resumeSummary": "...",
  "matchReport": "...",
  "questions": "..."
}
\`\`\`

Each section comes from a different specialist agent before the supervisor merges them.

`
);

export default topic;
