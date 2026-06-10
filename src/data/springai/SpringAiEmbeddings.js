import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-embeddings',
  'Spring AI Embeddings',
  'Turn text into vectors so your app can search by meaning, not just exact keywords.',
  'Embeddings are how Java apps search "leave policy" when the doc says "time off"',
  'SQL LIKE \'%leave%\' fails when the document says "employee time off rules." Embeddings fix that by converting text to numbers that capture meaning. Similar meaning = similar numbers.',
  ['Define embedding and vector in simple terms', 'Compare keyword search vs semantic search', 'Describe the embed-once, search-many-times flow', 'Give one HR policy search example'],
  {
    title: 'HR portal: employee searches "maternity leave"',
    body: 'The policy PDF never uses that exact phrase — it says "parental benefit eligibility." Keyword search returns nothing. Embedding search finds the right paragraph because the meanings are close.',
    checks: ['Clean and chunk documents before embedding', 'Call embedding model once per chunk, not on every search', 'Store vectors with document id and page number', 'Compare results using similarity score']
  },
  [
    { title: 'The problem', body: 'Exact text search misses synonyms and paraphrases.' },
    { title: 'The idea', body: 'Embedding model outputs a float array for each text chunk.' },
    { title: 'The flow', body: 'Index documents once; at query time embed the question and find nearest vectors.' },
    { title: 'In Spring AI', body: 'EmbeddingModel bean + VectorStore (covered in upcoming modules).' }
  ],
  `
# Spring AI Embeddings

Here is the problem in one sentence: **your users do not use the same words as your documents.**

Embeddings solve that. An embedding model takes text and returns a **vector** — a list of numbers. Texts with similar meaning get similar numbers.

## Why Embeddings Matter

SQL is good for exact search. Embeddings are good for meaning search.

| User asks | Document says | Exact search | Vector search |
|----------|---------------|--------------|---------------|
| leave policy | employee time off rules | weak | strong |
| refund delay | payment reversal timeline | weak | strong |

## Spring Boot Use Case

In an HR portal, a fresher uploads company policy documents. The app converts each chunk into embeddings and later finds the most relevant chunks when an employee asks a question.

## Interview Answer

Embeddings are numerical vector representations of text. They allow applications to perform semantic search by comparing meaning, not only matching keywords.

---

## Real-world project: HR policy semantic search

**Problem:** Employee searches "work from home policy." Document says "remote work eligibility." SQL \`LIKE\` fails; embeddings match by meaning.

### PolicyEmbeddingService.java

\`\`\`java
package com.learnstackhub.springai.embedding;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PolicyEmbeddingService {

    private final VectorStore vectorStore;

    public PolicyEmbeddingService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    /** Run when HR uploads policy — not on every search */
    public void indexChunk(String documentId, String title, int page, String text) {
        vectorStore.add(List.of(new Document(text, Map.of(
                "documentId", documentId,
                "title", title,
                "page", String.valueOf(page)
        ))));
    }

    public List<Document> search(String question, int topK) {
        return vectorStore.similaritySearch(
                SearchRequest.builder().query(question).topK(topK).build()
        );
    }
}
\`\`\`

### PolicySearchController.java

\`\`\`java
@RestController
@RequestMapping("/api/hr/policies")
public class PolicySearchController {

    private final PolicyEmbeddingService policyEmbeddingService;

    public PolicySearchController(PolicyEmbeddingService policyEmbeddingService) {
        this.policyEmbeddingService = policyEmbeddingService;
    }

    @GetMapping("/search")
    public List<PolicyHit> search(@RequestParam String question) {
        return policyEmbeddingService.search(question, 5).stream()
                .map(doc -> new PolicyHit(
                        doc.getMetadata().get("title"),
                        doc.getMetadata().get("page"),
                        doc.getText()))
                .toList();
    }
}

record PolicyHit(String title, String page, String excerpt) {}
\`\`\`

**Theory check:** Embeddings find text — they do not answer questions alone. Pass retrieved chunks to ChatClient in the RAG module for a full answer grounded in company policy.

### application.properties (OpenAI embedding connection)

Same file as your chat config — Spring AI reads both from \`application.properties\`:

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.embedding.options.model=text-embedding-3-small
\`\`\`

The embedding model turns each policy chunk into a vector. The chat model (configured separately) turns retrieved chunks into a human answer.

### VectorStoreConfig.java — required for local development

**Real-world gap many tutorials skip:** \`PolicyEmbeddingService\` needs a \`VectorStore\` bean. Without this configuration class, the app fails at startup with "No qualifying bean of type VectorStore."

For learning and demos, use in-memory \`SimpleVectorStore\` (data resets when the app restarts — fine for labs, not for production):

\`\`\`java
package com.learnstackhub.springai.embedding;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VectorStoreConfig {

    @Bean
    public VectorStore vectorStore(EmbeddingModel embeddingModel) {
        return SimpleVectorStore.builder(embeddingModel).build();
    }
}
\`\`\`

**Production path:** swap to ChromaDB or Pinecone (Vector Databases module) — your \`PolicyEmbeddingService\` code stays the same because it only depends on the \`VectorStore\` interface.

**What teams do in week one:** get search working locally with \`SimpleVectorStore\`, prove HR can find policy paragraphs, then migrate to a real vector DB before go-live.

### Index endpoint (admin uploads policy chunk)

\`\`\`java
@PostMapping("/index")
public ResponseEntity<Void> index(@RequestBody PolicyChunkRequest request) {
    policyEmbeddingService.indexChunk(
            request.documentId(), request.title(), request.page(), request.text());
    return ResponseEntity.ok().build();
}

record PolicyChunkRequest(String documentId, String title, int page, String text) {}
\`\`\`

### Test with cURL

Index a policy chunk first:

\`\`\`bash
curl -X POST http://localhost:8080/api/hr/policies/index \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"documentId\\": \\"hr-remote-work\\",
    \\"title\\": \\"Remote Work Policy\\",
    \\"page\\": 2,
    \\"text\\": \\"Employees may work remotely up to two days per week with manager approval.\\"
  }"
\`\`\`

Search with different words:

\`\`\`bash
curl "http://localhost:8080/api/hr/policies/search?question=Can%20I%20work%20from%20home%20twice%20a%20week"
\`\`\`

### Test with Postman

**Step 1 — Index**

\`\`\`text
POST http://localhost:8080/api/hr/policies/index
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "documentId": "hr-remote-work",
  "title": "Remote Work Policy",
  "page": 2,
  "text": "Employees may work remotely up to two days per week with manager approval."
}
\`\`\`

**Step 2 — Search**

\`\`\`text
GET http://localhost:8080/api/hr/policies/search?question=work from home policy
\`\`\`

Expected: array of hits with \`title\`, \`page\`, and \`excerpt\` even though the indexed text never used the exact phrase "work from home."

---

## Deep Explanation: How Embeddings Work in an App

When a user searches "leave rules", your document may contain "employee time off policy". Keyword search may fail because the words are different. Embeddings solve this by comparing meaning.

## Complete Flow

1. Read document text
2. Split text into chunks
3. Convert each chunk into embedding vector
4. Store vector with metadata
5. Convert user question into vector
6. Compare question vector with stored vectors
7. Return closest chunks

## Simple Java Similarity Example

\`\`\`java
package com.learnstackhub.springai.embedding;

public class CosineSimilarityDemo {

    public static void main(String[] args) {
        double[] question = {0.2, 0.4, 0.1};
        double[] document = {0.3, 0.5, 0.2};

        double score = cosineSimilarity(question, document);
        System.out.println("Similarity score = " + score);
    }

    static double cosineSimilarity(double[] a, double[] b) {
        double dot = 0.0;
        double aMagnitude = 0.0;
        double bMagnitude = 0.0;

        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            aMagnitude += a[i] * a[i];
            bMagnitude += b[i] * b[i];
        }

        return dot / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
    }
}
\`\`\`

This is only to understand the idea. In real Spring AI projects, embedding models create vectors with hundreds or thousands of dimensions.

## Real-Time Use Cases

- Find similar resumes
- Search policy documents
- Recommend related tutorials
- Detect duplicate support tickets
- Match job descriptions with candidate profiles

## Common Mistakes

- Creating embeddings on every search instead of storing them
- Storing vectors without source metadata
- Using very large chunks
- Expecting embeddings to answer questions directly
`
);

export default topic;

