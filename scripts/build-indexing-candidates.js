import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const dataRoot = path.join(projectRoot, 'src', 'data');
const outputPath = path.join(projectRoot, 'src', 'config', 'indexingCandidates.json');
const MIN_WORDS = 1500;

function walkJsFiles(dir, result = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJsFiles(fullPath, result);
      return;
    }
    if (!entry.name.endsWith('.js') || entry.name === 'index.js') return;
    result.push(fullPath);
  });
  return result;
}


function extractPrimaryArticleText(fileContent) {
  const contentMatch = fileContent.match(/content:\s*`([\s\S]*?)`,\s*(?:code:|faqs:|lastUpdated:|contributedBy:|interviewQuestions:)/);
  if (contentMatch?.[1]) return contentMatch[1];

  const quotedContentMatch = fileContent.match(/content:\s*(['"])([\s\S]*?)\1,\s*(?:code:|faqs:|lastUpdated:|contributedBy:|interviewQuestions:)/);
  if (quotedContentMatch?.[2]) return quotedContentMatch[2];

  return fileContent;
}

function normalizeTextForWordCount(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getApproximateWordCount(fileContent) {
  const normalized = normalizeTextForWordCount(fileContent);
  if (!normalized) return 0;
  return normalized.split(' ').filter(Boolean).length;
}

function isExcludedByPattern(topicId) {
  return /(?:^|[-/])(mcq|exam)$/.test(topicId);
}

function buildIndexingCandidates() {
  const files = walkJsFiles(dataRoot);
  const details = [];

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
    if (!idMatch) return;

    const id = idMatch[1];
    const articleText = extractPrimaryArticleText(content);
    const approxWordCount = getApproximateWordCount(articleText);
    const excludedByPattern = isExcludedByPattern(id);
    const shouldIndex = !excludedByPattern && approxWordCount >= MIN_WORDS;

    details.push({
      id,
      file: path.relative(projectRoot, filePath).replace(/\\/g, '/'),
      approxWordCount,
      shouldIndex,
      excludedByPattern,
    });
  });

  details.sort((a, b) => a.id.localeCompare(b.id));

  const indexableTopicIds = details.filter((d) => d.shouldIndex).map((d) => d.id);
  const excludedTopicIds = details.filter((d) => !d.shouldIndex).map((d) => d.id);

  const payload = {
    generatedAt: new Date().toISOString(),
    minimumApproxWordCount: MIN_WORDS,
    totalTopicsScanned: details.length,
    indexableTopicsCount: indexableTopicIds.length,
    excludedTopicsCount: excludedTopicIds.length,
    indexableTopicIds,
    excludedTopicIds,
    details,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`✅ Indexing candidates written: ${path.relative(projectRoot, outputPath)}`);
  console.log(`📊 Topics scanned: ${details.length}`);
  console.log(`✅ Indexable topics: ${indexableTopicIds.length}`);
  console.log(`🚫 Excluded topics: ${excludedTopicIds.length}`);
}

buildIndexingCandidates();
