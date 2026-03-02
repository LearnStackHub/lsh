/**
 * Thin page audit for LearnStackHub content.
 *
 * What it does:
 * - Scans all .js files recursively under src/data/
 * - Extracts the first `content: \`...\`` template literal (best-effort)
 * - Computes:
 *   - totalWords: words in entire content
 *   - nonCodeWords: words excluding fenced code blocks ```...```
 * - Outputs JSON + Markdown report under /reports
 *
 * Run:
 *   node scripts/audit-thin-pages.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const dataRoot = path.join(repoRoot, 'src', 'data');
const reportsDir = path.join(repoRoot, 'reports');

function listJsFilesRec(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listJsFilesRec(p));
    else if (e.isFile() && p.endsWith('.js')) out.push(p);
  }
  return out;
}

function extractId(fileContent) {
  const m = fileContent.match(/\bid:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function extractTitle(fileContent) {
  const m = fileContent.match(/\btitle:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function extractContentTemplate(fileContent) {
  // Robust extraction for JS template literal: content: ` ... `
  // Inline markdown uses escaped backticks (\`), so we must locate the closing delimiter:
  // the first backtick NOT preceded by a backslash after the opening delimiter.
  const contentKeyIdx = fileContent.search(/\bcontent\s*:\s*`/);
  if (contentKeyIdx === -1) return null;

  const openTickIdx = fileContent.indexOf('`', contentKeyIdx);
  if (openTickIdx === -1) return null;

  let i = openTickIdx + 1;
  for (; i < fileContent.length; i++) {
    const ch = fileContent[i];
    if (ch === '`' && fileContent[i - 1] !== '\\') {
      const closeTickIdx = i;
      return fileContent.slice(openTickIdx + 1, closeTickIdx);
    }
  }
  return null;
}

function stripFencedCodeBlocks(markdown) {
  // Remove ```lang ... ``` blocks (including contents)
  return markdown.replace(/```[\s\S]*?```/g, ' ');
}

function wordCount(text) {
  if (!text) return 0;
  // Normalize whitespace, remove most punctuation noise
  const cleaned = text
    .replace(/<\/?[^>]+>/g, ' ') // strip any HTML tags in markdown
    .replace(/[`*_>#=-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 0;
  return cleaned.split(' ').filter(Boolean).length;
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function toPosix(relPath) {
  return relPath.split(path.sep).join('/');
}

function main() {
  const files = listJsFilesRec(dataRoot);
  const results = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const content = extractContentTemplate(raw);
    if (!content) continue; // skip index.js and files without content

    const id = extractId(raw);
    const title = extractTitle(raw);
    const totalWords = wordCount(content);
    const nonCodeWords = wordCount(stripFencedCodeBlocks(content));

    results.push({
      id,
      title,
      file: toPosix(path.relative(repoRoot, file)),
      totalWords,
      nonCodeWords,
    });
  }

  results.sort((a, b) => a.nonCodeWords - b.nonCodeWords);

  ensureDir(reportsDir);
  const jsonPath = path.join(reportsDir, 'thin-pages.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));

  const thin1000 = results.filter(r => r.nonCodeWords > 0 && r.nonCodeWords < 1000);
  const thin500 = results.filter(r => r.nonCodeWords > 0 && r.nonCodeWords < 500);
  const thin300 = results.filter(r => r.nonCodeWords > 0 && r.nonCodeWords < 300);

  const mdLines = [];
  mdLines.push(`# Thin Pages Audit Report`);
  mdLines.push(``);
  mdLines.push(`Generated: ${new Date().toISOString()}`);
  mdLines.push(``);
  mdLines.push(`## Summary`);
  mdLines.push(`- Total topic files scanned: **${files.length}**`);
  mdLines.push(`- Topics with extracted content: **${results.length}**`);
  mdLines.push(`- Under 1000 non-code words: **${thin1000.length}**`);
  mdLines.push(`- Under 500 non-code words: **${thin500.length}**`);
  mdLines.push(`- Under 300 non-code words: **${thin300.length}**`);
  mdLines.push(``);
  mdLines.push(`> Note: **non-code words** excludes fenced code blocks (\`\`\`...\`\`\`). This better reflects “reading depth”.`);
  mdLines.push(``);

  function addTable(title, arr, limit = 50) {
    mdLines.push(`## ${title}`);
    mdLines.push(``);
    mdLines.push(`| nonCodeWords | totalWords | id | title | file |`);
    mdLines.push(`|---:|---:|---|---|---|`);
    for (const r of arr.slice(0, limit)) {
      mdLines.push(`| ${r.nonCodeWords} | ${r.totalWords} | ${r.id || ''} | ${String(r.title || '').replace(/\|/g, '\\|')} | \`${r.file}\` |`);
    }
    mdLines.push(``);
    if (arr.length > limit) mdLines.push(`Showing first ${limit} of ${arr.length}. See \`reports/thin-pages.json\` for full list.`);
    mdLines.push(``);
  }

  addTable('Under 300 non-code words (critical thin pages)', thin300, 100);
  addTable('Under 500 non-code words', thin500, 100);
  addTable('Under 1000 non-code words', thin1000, 100);

  const mdPath = path.join(reportsDir, 'thin-pages.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'));

  // Console summary
  console.log(`\nThin pages report written:`);
  console.log(`- ${path.relative(repoRoot, mdPath)}`);
  console.log(`- ${path.relative(repoRoot, jsonPath)}`);
  console.log(`\nCounts: <300=${thin300.length}, <500=${thin500.length}, <1000=${thin1000.length}\n`);
}

main();


