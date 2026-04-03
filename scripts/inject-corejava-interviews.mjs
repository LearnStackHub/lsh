/**
 * Injects Core Java interview markdown into tutorial content template literals
 * (before the closing backtick that precedes `,` + `code:`).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SNIPPETS } from './corejava-interview-snippets.mjs';
import { SNIPPETS_REST } from './corejava-interview-snippets-rest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ALL = { ...SNIPPETS, ...SNIPPETS_REST };

/** Match `, then newline, then `code:` (Core Java tutorials use this before embedded Java sample). */
const CONTENT_END_RE = /`,\r?\n\s*code:\s*`/;

function injectFile(relPath, snippet) {
  const abs = path.join(root, relPath);
  let s = fs.readFileSync(abs, 'utf8');
  if (s.includes('## 10 Important') && s.includes('Interview Questions')) {
    console.warn('skip (already has interview section):', relPath);
    return;
  }
  const m = s.match(CONTENT_END_RE);
  if (!m || m.index === undefined) {
    throw new Error(`Marker not found: ${relPath}`);
  }
  const closeBt = m.index;
  const snippetTrim = snippet.replace(/^\s*\n/, '\n');
  const escaped = snippetTrim
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const inserted =
    s.slice(0, closeBt) + escaped + '`' + s.slice(closeBt + 1);
  fs.writeFileSync(abs, inserted, 'utf8');
  console.log('ok:', relPath);
}

for (const [rel, snippet] of Object.entries(ALL)) {
  injectFile(rel, snippet);
}

console.log('done; files:', Object.keys(ALL).length);
