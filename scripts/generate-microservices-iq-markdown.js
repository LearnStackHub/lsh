import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, '../src/data/springcloud/microservicesInterviewQuestionsData.js');
const { MICROSERVICES_IQ_TABS, MICROSERVICES_IQ_QUESTIONS } = await import(`file:///${dataPath.replace(/\\/g, '/')}`);

function formatAnswer(a) {
  return a
    .split('\n\n')
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      const isBullet = (l) => /^[•\-]\s/.test(l) || /^\d+\.\s/.test(l);
      const bullets = lines.filter(isBullet);
      const nonBullets = lines.filter((l) => !isBullet(l));

      if (bullets.length && nonBullets.length) {
        const header = nonBullets.join(' ');
        const hm = header.match(/^([A-Za-z][^:]{0,48}):\s*(.*)$/);
        let out = hm
          ? `**${hm[1]}:**${hm[2] ? ` ${hm[2]}` : ''}\n\n`
          : `${header}\n\n`;
        out += bullets
          .map((l) => `- ${l.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '')}`)
          .join('\n');
        return out;
      }
      if (bullets.length && !nonBullets.length) {
        return bullets
          .map((l) => `- ${l.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '')}`)
          .join('\n');
      }
      const lm = block.match(/^([A-Za-z][^:\n]{0,48}):\s+([\s\S]+)$/);
      if (lm) return `**${lm[1]}:** ${lm[2]}`;
      if (block.startsWith('`') && block.endsWith('`')) {
        return '```java\n' + block.slice(1, -1) + '\n```';
      }
      return block;
    })
    .join('\n\n');
}

let md = `# Top 30 Microservices Interview Questions

Master the most commonly asked Microservices and Spring Cloud interview questions for Java developers. Each question includes a detailed explanation you can use in interviews.

`;

for (const [id, label] of MICROSERVICES_IQ_TABS) {
  const sectionTitle = label.replace(/\(\d+–\d+\)/, '').trim();
  md += `---\n\n## ${sectionTitle}\n\n`;
  for (const item of MICROSERVICES_IQ_QUESTIONS[id]) {
    md += `### Question ${item.num}: ${item.q}\n\n`;
    md += `*Level: ${item.level}*\n\n`;
    md += `**Answer:**\n\n${formatAnswer(item.a)}\n\n---\n\n`;
  }
}

md += `## Related tutorials

- [Microservices Architecture Fundamentals](/tutorial/microservices-architecture-fundamentals)
- [Spring Cloud Eureka](/tutorial/spring-cloud-eureka)
- [Spring Cloud API Gateway](/tutorial/spring-cloud-api-gateway)
- [Resilience4j Circuit Breaker](/tutorial/spring-cloud-resilience4j)
- [Distributed Tracing](/tutorial/spring-cloud-distributed-tracing)
`;

const fileContent = `const microservicesInterviewQuestions = {
  id: 'microservices-interview-questions',
  title: 'Top 30 Microservices Interview Questions',
  description:
    'Top 30 Microservices and Spring Cloud interview questions with detailed explanations — architecture, Eureka, API Gateway, Saga, circuit breakers, security, and production best practices for Java developers.',
  content: ${JSON.stringify(md)}
};

export default microservicesInterviewQuestions;
`;

const outPath = path.resolve(__dirname, '../src/data/springcloud/MicroservicesInterviewQuestions.js');
fs.writeFileSync(outPath, fileContent);
console.log('Generated', outPath, fileContent.length, 'chars');
