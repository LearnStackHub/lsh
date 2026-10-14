/**
 * One-off: strip "Theory:" prefix; code items use Program: only (MNC-style bank).
 * Run: node scripts/normalize-recruitment-questions.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../src/recruitment/questions.js');
let src = fs.readFileSync(filePath, 'utf8');

const SECTION_MARKER =
  /(Theory:|Program(?: \([^)]+\))?:|Code:|Pseudocode:|Test code:|Commands:|HTML:|CSS:|Given:|Dataset:|Prompt:)/gi;

function splitCodeAndPrompt(content) {
  const trimmed = content.trim();
  if (!trimmed) return { code: '', prompt: '' };
  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2 && lines[lines.length - 1].endsWith('?')) {
    const last = lines[lines.length - 1];
    const looksLikeCode = /[;{}=]|print\(|System\.|def |class |git |for \(|import /.test(last);
    if (!looksLikeCode || last.length < 64) {
      return { code: lines.slice(0, -1).join('\n'), prompt: last };
    }
  }
  return { code: trimmed, prompt: '' };
}

function parse(raw) {
  const markers = [];
  const re = new RegExp(SECTION_MARKER.source, 'gi');
  let m;
  while ((m = re.exec(raw)) !== null) markers.push({ index: m.index, label: m[1] });
  if (!markers.length) return { plain: raw.trim() };

  let theory = '';
  let code = '';
  let prompt = '';

  for (let i = 0; i < markers.length; i += 1) {
    const { index, label } = markers[i];
    const start = index + label.length;
    const end = i + 1 < markers.length ? markers[i + 1].index : raw.length;
    const content = raw.slice(start, end).trim();
    if (/^Theory:/i.test(label)) {
      theory = content.replace(/\nProgram(?: \([^)]+\))?:[\s\S]*$/, '').trim();
      const inline = content.match(/\n(Program(?: \([^)]+\))?:|Pseudocode:|Test code:|Commands:|HTML:|CSS:|Given:|Dataset:)\n?([\s\S]*)$/i);
      if (inline) {
        const { code: c, prompt: p } = splitCodeAndPrompt(inline[2]);
        code = c;
        if (p) prompt = p;
      }
      continue;
    }
    const { code: c, prompt: p } = splitCodeAndPrompt(content);
    if (c) code = code ? `${code}\n\n${c}` : c;
    if (p) prompt = p;
  }

  return { theory, code, prompt };
}

/** IDs that stay as code/program questions (output / snippet). */
const CODE_QUESTION_IDS = new Set([
  1, 2, 4, 7, 11, 12, 13, 14, 15, 16, 18,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  51, 53,
]);

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function normalizeQuestion(id, raw) {
  const { theory, code, prompt, plain } = parse(raw);
  if (plain) return plain;

  const context = theory.replace(/\.$/, '').trim();
  const ask = prompt || (theory.includes('?') ? theory : '');

  if (CODE_QUESTION_IDS.has(id) && code) {
    let lead = ask;
    if (!lead || /^Output\?$/i.test(ask)) {
      lead = context
        ? `${context}. What is the output of the following program?`
        : 'What is the output of the following program?';
    } else if (context && !ask.toLowerCase().includes(context.slice(0, 12).toLowerCase())) {
      if (!ask.includes('?') && context) lead = `${context}. ${ask}`;
      else if (context && !ask.startsWith(context)) lead = ask;
    } else if (context && /^Order printed\?$/i.test(ask)) {
      lead = `${context}. What is the order of printed values?`;
    } else if (context && ask.length < 20) {
      lead = `${context}. ${ask}`;
    }
    return `${lead}\n\nProgram:\n${code}`;
  }

  const parts = [context, ask].filter(Boolean);
  if (parts.length === 2 && parts[0] === parts[1]) return parts[0];
  if (context && ask && ask !== context) {
    const merged = ask.startsWith(context.slice(0, 8)) ? ask : `${context}. ${ask}`;
    return merged;
  }
  return context || ask || raw.replace(/^Theory:\s*/i, '').replace(/\nProgram:[\s\S]*/, '').trim();
}

const idRegex = /id:\s*(\d+),[\s\S]*?question:\s*\n\s*'((?:\\'|[^'])*)'/g;
let count = 0;
src = src.replace(idRegex, (full, idStr, qEscaped) => {
  const id = Number(idStr);
  const raw = qEscaped.replace(/\\n/g, '\n').replace(/\\'/g, "'");
  const next = normalizeQuestion(id, raw);
  count += 1;
  return full.replace(qEscaped, esc(next));
});

src = src.replace(
  /\/\*\* 60 medium intern MCQs \(theory \+ code\); exam picks 45 at random; options shuffled per question\. \*\//,
  '/** 60 medium intern MCQs (plain + some program snippets); exam picks 45 at random; options shuffled per question. */'
);

fs.writeFileSync(filePath, src);
console.log(`Normalized ${count} questions.`);
