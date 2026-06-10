import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-rag',
  'Spring AI RAG',
  'RAG — retrieve relevant document chunks, then let the model answer from your data, not its memory.',
  'RAG = open-book exam for the model',
  'User uploads your company handbook and asks a question. The model was never trained on that PDF. RAG loads the file, splits it into chunks, finds the 3–5 paragraphs that match the question, and puts only those into the prompt. The model answers from your text.',
  ['Explain RAG as retrieve-then-generate', 'List load → chunk → embed → store → search → prompt steps', 'Build a PDF Q&A flow in words', 'Say when the model should answer "not found in document"'],
  {
    title: 'Employee asks questions about the 80-page HR handbook',
    body: 'You cannot paste 80 pages into every API call — too slow, too expensive, may not even fit. Index the PDF once. Each question retrieves only the relevant paragraphs and sends those as context.',
    checks: ['Chunk by paragraph or fixed size with overlap', 'Store page number for citations', 'System prompt: answer only from provided context', 'If no chunk matches, say "I could not find this in the document"']
  },
  [
    { title: 'Index time', body: 'Load PDF, split, embed, save to VectorStore — done once.' },
    { title: 'Query time', body: 'Embed question, search topK chunks, build prompt with context.' },
    { title: 'Generate', body: 'ChatClient answers using only the retrieved text.' },
    { title: 'Cite sources', body: 'Return page numbers so users trust the answer.' }
  ],
  `
# Spring AI RAG

**RAG = Retrieval Augmented Generation.** Break it down:

- **Retrieval** — find relevant text from your documents
- **Augmented** — add that text to the prompt
- **Generation** — model writes the answer

Without RAG, the model guesses from general training. With RAG, it answers from **your** PDF, wiki, or course notes.

## RAG Flow

| Step | What happens |
|------|--------------|
| Load | Read PDF, website, or company document |
| Chunk | Split large text into smaller meaningful parts |
| Embed | Convert chunks into vectors |
| Store | Save vectors in VectorStore |
| Retrieve | Find chunks similar to user question |
| Generate | Send question plus context to chat model |

## Why RAG is Important

Without RAG, the model may guess. With RAG, your app can answer from company policies, product manuals, course notes, or uploaded PDFs.

## Fresher Explanation

RAG is like an open-book exam. The model is the student. The retrieved chunks are the book pages. The final answer should come from those pages, not from imagination.

---

## Deep Project: Chat with PDF

Requirement:

> "Upload a PDF. Ask questions about it. The answer should come from the PDF, not from model guessing."

## RAG Service Design

\`\`\`java
package com.learnstackhub.springai.rag;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PdfRagAnswerService {

    private final ChatClient chatClient;
    private final PdfChunkSearchService pdfChunkSearchService;

    public PdfRagAnswerService(ChatClient.Builder builder, PdfChunkSearchService pdfChunkSearchService) {
        this.chatClient = builder
                .defaultSystem("""
                        You answer only from the provided document context.
                        If the context does not contain the answer, say:
                        "I could not find this in the uploaded document."
                        """)
                .build();
        this.pdfChunkSearchService = pdfChunkSearchService;
    }

    public String answer(String documentId, String question) {
        List<String> chunks = pdfChunkSearchService.findRelevantChunks(documentId, question);

        String context = String.join("\\n---\\n", chunks);

        String prompt = """
                Document context:
                %s

                User question:
                %s

                Give a clear answer using only the document context.
                """.formatted(context, question);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}
\`\`\`

## Supporting Search Service (VectorStore implementation)

\`\`\`java
package com.learnstackhub.springai.rag;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PdfChunkSearchService {

    private final VectorStore vectorStore;

    public PdfChunkSearchService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public List<String> findRelevantChunks(String documentId, String question) {
        List<Document> docs = vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(question)
                        .topK(4)
                        .filterExpression("documentId == '" + documentId + "'")
                        .build()
        );
        return docs.stream().map(Document::getText).toList();
    }
}
\`\`\`

## Document indexing service

\`\`\`java
package com.learnstackhub.springai.rag;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PdfIndexService {

    private final VectorStore vectorStore;

    public PdfIndexService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void indexPdfText(String documentId, String fileName, String fullText) {
        String[] paragraphs = fullText.split("\\n\\n");
        for (int i = 0; i < paragraphs.length; i++) {
            String text = paragraphs[i].trim();
            if (text.isBlank()) continue;
            vectorStore.add(List.of(new Document(text, Map.of(
                    "documentId", documentId,
                    "fileName", fileName,
                    "chunkIndex", String.valueOf(i)
            ))));
        }
    }
}
\`\`\`

## REST API

\`\`\`java
@RestController
@RequestMapping("/api/documents")
public class PdfRagController {

    private final PdfIndexService pdfIndexService;
    private final PdfRagAnswerService pdfRagAnswerService;

    public PdfRagController(PdfIndexService pdfIndexService, PdfRagAnswerService pdfRagAnswerService) {
        this.pdfIndexService = pdfIndexService;
        this.pdfRagAnswerService = pdfRagAnswerService;
    }

    @PostMapping("/{documentId}/index")
    public ResponseEntity<Void> index(@PathVariable String documentId, @RequestBody IndexPdfRequest body) {
        pdfIndexService.indexPdfText(documentId, body.fileName(), body.text());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{documentId}/ask")
    public RagAnswerResponse ask(@PathVariable String documentId, @RequestBody AskQuestionRequest body) {
        String answer = pdfRagAnswerService.answer(documentId, body.question());
        return new RagAnswerResponse(answer);
    }
}

record IndexPdfRequest(String fileName, String text) {}
record AskQuestionRequest(String question) {}
record RagAnswerResponse(String answer) {}
\`\`\`

### application.properties — full RAG stack connection

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.2
spring.ai.openai.embedding.options.model=text-embedding-3-small
\`\`\`

For local PDF Q&A demos, add the same \`VectorStoreConfig\` bean from the Embeddings module (\`SimpleVectorStore\`). For team wiki scale, switch to Chroma properties from the Vector Databases module.

**Real-world lesson:** RAG fails in production when indexing is skipped. Always test **index → ask** as two steps. If ask returns generic answers, your chunks were never stored — check VectorStore bean and OpenAI embedding key first.

## Why RAG Answers Are Better

Without RAG:

- model answers from general training
- may hallucinate
- cannot know your uploaded PDF

With RAG:

- app retrieves relevant chunks
- model answers from your data
- answer can include source

## Common RAG Errors

| Error | Reason | Fix |
|------|--------|-----|
| Wrong answer | Bad chunk retrieval | Improve chunking and topK |
| "I do not know" too often | Chunks too small or missing | Re-index document |
| High cost | Too many chunks in prompt | Reduce topK |
| Data leak | Search not filtered by user/document | Add metadata filters |

### Test with cURL

**Step 1 — Index PDF text**

\`\`\`bash
curl -X POST http://localhost:8080/api/documents/spring-boot-guide/index \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"fileName\\": \\"spring-boot-guide.pdf\\",
    \\"text\\": \\"Spring Boot auto-configuration creates beans based on classpath. Spring AI provides ChatClient for model calls.\\"
  }"
\`\`\`

**Step 2 — Ask a question**

\`\`\`bash
curl -X POST http://localhost:8080/api/documents/spring-boot-guide/ask \\
  -H "Content-Type: application/json" \\
  -d "{\\"question\\": \\"What is ChatClient used for?\\"}"
\`\`\`

### Test with Postman

**Index**

\`\`\`text
POST http://localhost:8080/api/documents/spring-boot-guide/index
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "fileName": "spring-boot-guide.pdf",
  "text": "Spring Boot auto-configuration creates beans based on classpath. Spring AI provides ChatClient for model calls."
}
\`\`\`

**Ask**

\`\`\`text
POST http://localhost:8080/api/documents/spring-boot-guide/ask
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "question": "What is ChatClient used for?"
}
\`\`\`

Expected: answer grounded in indexed text. If you ask about content not in the PDF, response should say it was not found in the document.
`
);

export default topic;

