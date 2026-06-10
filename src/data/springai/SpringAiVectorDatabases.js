import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-vector-databases',
  'Spring AI Vector Databases',
  'Store and search embeddings with VectorStore — ChromaDB, Pinecone, and when to use each.',
  'Vector DB = search engine built for meaning, not SQL rows',
  'You have thousands of embedding vectors. MySQL is not built to find "the 5 closest numbers" fast. Vector databases are. Spring AI wraps them behind VectorStore so your service code stays the same.',
  ['Explain what a vector database stores', 'Name ChromaDB, Pinecone, Weaviate, Milvus and when to pick each', 'Use Spring AI VectorStore abstraction', 'List metadata fields to store with each vector'],
  {
    title: 'Company wiki with 2,000 policy chunks',
    body: 'Each chunk has an embedding vector plus metadata: document id, title, page. User asks a question — you search top 5 similar chunks in milliseconds, not scan every row with SQL.',
    checks: ['Start with ChromaDB locally for learning', 'Always store documentId and title as metadata', 'Tune topK (how many chunks to retrieve)', 'Re-index when a policy document is updated']
  },
  [
    { title: 'Why not MySQL?', body: 'Similarity search on high-dimensional vectors needs specialized indexes.' },
    { title: 'VectorStore', body: 'Spring AI interface — swap Chroma for Pinecone without rewriting service logic.' },
    { title: 'Metadata', body: 'Vectors alone are useless — attach source, page, owner for citations and security.' },
    { title: 'Pick a DB', body: 'Local demo → Chroma. Production scale → Pinecone or Milvus.' }
  ],
  `
# Spring AI Vector Databases

Embeddings give you numbers. A **vector database** stores millions of those numbers and finds the closest ones to a query — fast.

Think of it as Google search, but for meaning instead of keywords.

## Traditional Database vs Vector Database

| Feature | Traditional DB | Vector DB |
|---------|----------------|-----------|
| Stores | Rows and columns | Vectors and metadata |
| Best for | Exact data | Similar meaning |
| Query | SQL conditions | Similarity search |
| Example | user_id = 10 | documents related to refund delay |

## Popular Choices

- ChromaDB for local learning
- Pinecone for managed cloud vector search
- Weaviate for semantic search platforms
- Milvus for large-scale vector workloads

## Real Advice

Start with a simple local store for learning. Move to a managed vector database when your documents, users, and search traffic grow.

---

## Deep Project: AI Knowledge Base Storage

Embeddings are numbers. A vector database stores those numbers and searches them fast.

## What Metadata Should You Store?

| Metadata | Why |
|----------|-----|
| documentId | Know which document chunk came from |
| title | Show source to user |
| pageNumber | Useful for PDF citations |
| createdAt | Re-index stale documents |
| ownerId | Enforce security |

## Pseudo Service Design

The service below is **complete and runnable** once you add the Chroma dependency, \`application.properties\`, and run Chroma locally (or use \`SimpleVectorStore\` from the Embeddings module for a laptop demo).

### Maven — OpenAI + Chroma

\`\`\`xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-vector-store-chroma</artifactId>
</dependency>
\`\`\`

### application.properties — vector store + embedding connection

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.embedding.options.model=text-embedding-3-small

spring.ai.vectorstore.chroma.client.host=http://localhost
spring.ai.vectorstore.chroma.client.port=8000
spring.ai.vectorstore.chroma.collection-name=company-knowledge-base
spring.ai.vectorstore.chroma.initialize-schema=true
\`\`\`

**Real-world setup:** Run Chroma with Docker before starting Spring Boot:

\`\`\`bash
docker run -p 8000:8000 chromadb/chroma
\`\`\`

If Chroma is not running, indexing fails immediately — that is better than silently storing nothing. On small teams, someone owns "start Chroma in docker-compose alongside MySQL."

### KnowledgeBaseService.java (complete)

\`\`\`java
package com.learnstackhub.springai.knowledge;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class KnowledgeBaseService {

    private final VectorStore vectorStore;

    public KnowledgeBaseService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void indexDocument(String documentId, String title, String ownerId, String content) {
        List<String> chunks = splitIntoChunks(content);
        for (int i = 0; i < chunks.size(); i++) {
            String chunk = chunks.get(i);
            vectorStore.add(List.of(new Document(chunk, Map.of(
                    "documentId", documentId,
                    "title", title,
                    "ownerId", ownerId,
                    "chunkIndex", String.valueOf(i),
                    "indexedAt", Instant.now().toString()
            ))));
        }
    }

    public List<Document> searchForUser(String ownerId, String question, int topK) {
        return vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(question)
                        .topK(topK)
                        .filterExpression("ownerId == '" + ownerId + "'")
                        .build()
        );
    }

    private List<String> splitIntoChunks(String content) {
        return Arrays.stream(content.split("\\n\\n"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();
    }
}
\`\`\`

### KnowledgeBaseController.java

\`\`\`java
@RestController
@RequestMapping("/api/knowledge")
public class KnowledgeBaseController {

    private final KnowledgeBaseService knowledgeBaseService;

    public KnowledgeBaseController(KnowledgeBaseService knowledgeBaseService) {
        this.knowledgeBaseService = knowledgeBaseService;
    }

    @PostMapping("/index")
    public ResponseEntity<Void> index(@RequestBody IndexDocumentRequest request) {
        knowledgeBaseService.indexDocument(
                request.documentId(), request.title(), request.ownerId(), request.content());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<KnowledgeHit> search(@RequestParam String ownerId, @RequestParam String question) {
        return knowledgeBaseService.searchForUser(ownerId, question, 5).stream()
                .map(doc -> new KnowledgeHit(
                        doc.getMetadata().get("title"),
                        doc.getText()))
                .toList();
    }
}

record IndexDocumentRequest(String documentId, String title, String ownerId, String content) {}
record KnowledgeHit(String title, String excerpt) {}
\`\`\`

**Security note:** \`ownerId\` filter prevents Company A from searching Company B vectors — enforced in Java, not by the model.

### Test with cURL

Index a document:

\`\`\`bash
curl -X POST http://localhost:8080/api/knowledge/index \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"documentId\\": \\"policy-001\\",
    \\"title\\": \\"Refund Policy\\",
    \\"ownerId\\": \\"company-a\\",
    \\"content\\": \\"Refunds are processed within 7 business days after approval.\\"
  }"
\`\`\`

Search (scoped to owner):

\`\`\`bash
curl "http://localhost:8080/api/knowledge/search?ownerId=company-a&question=how%20long%20for%20refund"
\`\`\`

### Test with Postman

**Index**

\`\`\`text
POST http://localhost:8080/api/knowledge/index
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "documentId": "policy-001",
  "title": "Refund Policy",
  "ownerId": "company-a",
  "content": "Refunds are processed within 7 business days after approval."
}
\`\`\`

**Search**

\`\`\`text
GET http://localhost:8080/api/knowledge/search?ownerId=company-a&question=refund timeline
\`\`\`

Expected: hits only from \`company-a\` documents. Searching with a different \`ownerId\` must not return Company A data.

## Choosing a Vector Database

- ChromaDB: good for local learning and simple demos
- Pinecone: managed service, useful when you do not want to manage infra
- Weaviate: strong semantic search features
- Milvus: large-scale vector search

## Common Mistakes

- No metadata means no citations
- No user permission check means data leakage
- Wrong chunk size gives poor answers
- Re-indexing everything on every startup wastes time
`
);

export default topic;

