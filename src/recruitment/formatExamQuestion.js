const SECTION_MARKER =
  /(Theory:|Program(?: \([^)]+\))?:|Code:|Pseudocode:|Test code:|Commands:|HTML:|CSS:|Given:|Dataset:|Prompt:)/gi;

function splitCodeAndPrompt(content) {
  const trimmed = content.trim();
  if (!trimmed) return { code: '', prompt: '' };

  const lines = trimmed.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  if (lines.length >= 2 && lines[lines.length - 1].endsWith('?')) {
    const last = lines[lines.length - 1];
    const looksLikeCode = /[;{}=]|print\(|System\.|def |class |git |for \(|import /.test(last);
    if (!looksLikeCode || last.length < 64) {
      return {
        code: lines.slice(0, -1).join('\n'),
        prompt: last,
      };
    }
  }

  if (lines.length === 1) {
    const single = lines[0];
    const inlinePrompt = single.match(/^([\s\S]+?\s)(Output\?|What prints\?|Order printed\?)$/i);
    if (inlinePrompt) {
      return { code: inlinePrompt[1].trim(), prompt: inlinePrompt[2] };
    }
  }

  return { code: trimmed, prompt: '' };
}

function normalizeLabel(label) {
  return label.replace(/:$/, '').trim();
}

/** Structured parts for exam UI (theory → code → one question line). */
export function parseExamQuestion(raw) {
  const empty = { theory: '', code: '', prompt: '', plain: '' };
  if (!raw || typeof raw !== 'string') return empty;

  const markers = [];
  const re = new RegExp(SECTION_MARKER.source, 'gi');
  let match;
  while ((match = re.exec(raw)) !== null) {
    markers.push({ index: match.index, label: match[1] });
  }

  if (markers.length === 0) {
    return { ...empty, plain: raw.trim() };
  }

  const result = { ...empty };
  let pendingPrompt = '';

  if (markers[0].index > 0) {
    pendingPrompt = raw.slice(0, markers[0].index).trim();
  }

  for (let i = 0; i < markers.length; i += 1) {
    const { index, label } = markers[i];
    const contentStart = index + label.length;
    const contentEnd = i + 1 < markers.length ? markers[i + 1].index : raw.length;
    const content = raw.slice(contentStart, contentEnd).trim();
    const normalized = normalizeLabel(label);

    if (/^theory$/i.test(normalized)) {
      const inlineNext = content.match(
        /\s+(Program(?: \([^)]+\))?:|Code:|Pseudocode:|Test code:|Commands:|Given:|Dataset:|Prompt:)\s*([\s\S]*)$/i
      );
      if (inlineNext) {
        const theoryText = content.slice(0, inlineNext.index).trim();
        if (theoryText) result.theory = theoryText;
        const rest = inlineNext[2].trim();
        const { code, prompt } = splitCodeAndPrompt(rest);
        result.code = code;
        if (prompt) {
          pendingPrompt = pendingPrompt ? `${pendingPrompt}\n\n${prompt}` : prompt;
        }
      } else {
        result.theory = content;
      }
      continue;
    }

    const { code, prompt } = splitCodeAndPrompt(content);
    if (code) {
      result.code = result.code ? `${result.code}\n\n${code}` : code;
    }
    if (prompt) {
      pendingPrompt = pendingPrompt ? `${pendingPrompt}\n\n${prompt}` : prompt;
    }
  }

  if (pendingPrompt) {
    result.prompt = pendingPrompt;
  } else if (result.theory && !result.code && result.theory.includes('?')) {
    const parts = result.theory.split(/\n/);
    const last = parts[parts.length - 1].trim();
    if (last.endsWith('?')) {
      result.prompt = last;
      result.theory = parts.slice(0, -1).join('\n').trim();
    }
  }

  if (!result.prompt && !result.code && !result.theory) {
    result.plain = raw.trim();
  }

  return result;
}

const SHORT_OUTPUT_PROMPT = /^(output\?|what prints\?|order printed\?)$/i;

/** TCS / Infosys style: one stem, optional code block, no section headings. */
export function buildExamQuestionDisplay(parsed) {
  const { theory, code, prompt, plain } = parsed;
  const empty = { lead: '', code: '', follow: '' };

  if (plain) {
    return { ...empty, lead: plain };
  }

  if (!code) {
    const parts = [theory, prompt].filter(Boolean);
    return { ...empty, lead: parts.join('\n\n') || theory || prompt };
  }

  const shortPrompt = prompt && SHORT_OUTPUT_PROMPT.test(prompt.trim());
  const fullPrompt = prompt && !shortPrompt ? prompt : '';

  if (theory && fullPrompt) {
    return { lead: theory, code, follow: fullPrompt };
  }

  if (theory && shortPrompt) {
    const lead = theory.endsWith('?') ? theory : `${theory} What is the output?`;
    return { lead, code, follow: '' };
  }

  if (fullPrompt) {
    return { lead: fullPrompt, code, follow: '' };
  }

  if (theory) {
    const lead = theory.endsWith('?')
      ? theory
      : `${theory} What is the output of the following program?`;
    return { lead, code, follow: '' };
  }

  return {
    ...empty,
    lead: 'What is the output of the following program?',
    code,
  };
}
