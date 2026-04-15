const OLLAMA_URL = process.env.OLLAMA_API_URL || 'https://ollama.com/api/chat';

export const config = {
  maxDuration: 60,
};

function parseBody(req) {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') return raw;
  return {};
}

function cleanText(value, max = 12000) {
  return String(value ?? '')
    .replace(/\0/g, '')
    .trim()
    .slice(0, max);
}

function normalizeWhitespace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function extractJson(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function round1(num) {
  return Math.round(num * 10) / 10;
}

function toWords(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3);
}

function toKeywordSet(text) {
  const stop = new Set([
    'with', 'from', 'that', 'this', 'have', 'your', 'about', 'what', 'when', 'where', 'which', 'using', 'used',
    'into', 'over', 'under', 'than', 'they', 'them', 'were', 'been', 'being', 'there', 'their', 'will', 'would',
  ]);
  return new Set(toWords(text).filter((w) => !stop.has(w)));
}

function computeRubric(question, answer) {
  const qSet = toKeywordSet(question);
  const aSet = toKeywordSet(answer);

  let qHit = 0;
  for (const w of qSet) {
    if (aSet.has(w)) qHit += 1;
  }
  const relevance = qSet.size ? qHit / qSet.size : 0;

  const answerLen = cleanText(answer, 5000).length;
  const depth = clamp(answerLen / 550, 0, 1);
  const hasStructure = /\b(first|second|because|therefore|result|impact|trade[- ]off|for example)\b/i.test(answer);
  const clarity = hasStructure ? 0.9 : 0.6;

  const weighted = relevance * 0.6 + depth * 0.3 + clarity * 0.1;

  const score = round1(clamp(weighted * 10, 0, 10));
  return {
    score,
    rubric: {
      relevance: round1(relevance * 10),
      depth: round1(depth * 10),
      clarity: round1(clarity * 10),
    },
    evidence: {
      questionKeywordHits: qHit,
      questionKeywords: qSet.size,
      answerLength: answerLen,
    },
  };
}

function combineScores(aiScore, rubricScore) {
  if (!Number.isFinite(aiScore)) return rubricScore;
  return round1(clamp(aiScore * 0.35 + rubricScore * 0.65, 0, 10));
}

async function callOllama({ apiKey, model, instruction }) {
  const upstream = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        {
          role: 'system',
          content:
            'You are an interview engine API. Return only strict JSON with no markdown fences or extra prose.',
        },
        { role: 'user', content: instruction },
      ],
    }),
  });

  const rawText = await upstream.text();
  if (!upstream.ok) {
    let upstreamMessage = '';
    try {
      const parsedError = JSON.parse(rawText);
      upstreamMessage = normalizeWhitespace(parsedError?.error?.message || '');
    } catch {
      upstreamMessage = normalizeWhitespace(rawText);
    }

    const looksLikeSizeIssue =
      /token|too large|request size|payload|maximum context|invalid argument|too many/i.test(upstreamMessage);
    const code =
      upstream.status === 429
        ? 429
        : upstream.status >= 500
          ? 502
          : upstream.status >= 400
            ? upstream.status
            : 422;
    let message = 'Interview service failed. Please try again.';
    if (upstream.status === 429) {
      message = 'Rate limit reached. Please retry in a moment.';
    } else if (looksLikeSizeIssue) {
      message = 'Resume/interview context is too large. Try a shorter resume or restart interview.';
    } else if (upstreamMessage) {
      message = upstreamMessage.slice(0, 220);
    }
    return { ok: false, code, error: message };
  }

  let data = {};
  try {
    data = JSON.parse(rawText);
  } catch {
    return { ok: false, code: 502, error: 'Invalid Ollama response format.' };
  }
  const text = data?.message?.content || '';
  const parsed = extractJson(text);
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, code: 502, error: 'Could not parse interview response.' };
  }
  return { ok: true, data: parsed };
}

function interviewContext({ role, resumeText, history, maxQuestions }) {
  const safeHistory = Array.isArray(history)
    ? history
        .slice(-8)
        .map((item) => ({
          question: cleanText(item?.question, 260),
          answer: cleanText(item?.answer, 600),
          score: Number.isFinite(item?.score) ? item.score : null,
          feedback: cleanText(item?.feedback, 280),
        }))
    : [];
  return [
    `Role track: ${cleanText(role, 80) || 'general software engineer'}`,
    `Target questions count: ${Math.min(Math.max(Number(maxQuestions) || 1, 1), 1)}`,
    `Resume text:\n${cleanText(resumeText, 9000)}`,
    `Interview history JSON:\n${JSON.stringify(safeHistory)}`,
  ].join('\n\n');
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OLLAMA_API_KEY;
  const model = process.env.OLLAMA_MODEL || 'llama3.2';
  if (!apiKey) {
    res.status(503).json({ error: 'Missing OLLAMA_API_KEY in server environment.' });
    return;
  }

  const body = parseBody(req);
  if (body === null) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const action = cleanText(body.action, 32).toLowerCase();
  const role = cleanText(body.role, 80);
  const resumeText = cleanText(body.resumeText, 9000);
  const history = Array.isArray(body.history) ? body.history : [];
  const maxQuestions = 1;

  if (!resumeText || resumeText.length < 100) {
    res.status(400).json({ error: 'Resume text is too short. Please paste at least 100 characters.' });
    return;
  }

  let instruction = '';

  if (action === 'start') {
    instruction = [
      'You are an interview engine. Return strict JSON only.',
      interviewContext({ role, resumeText, history: [], maxQuestions }),
      'Task: generate exactly ONE first interview question tailored to the resume and role.',
      'The question MUST explicitly anchor to a concrete item from the resume (technology, project, domain, or responsibility).',
      'Prefer deep follow-up style, not textbook generic questions.',
      'Do not generate multiple questions. Do not include extra text.',
      'Return this JSON schema exactly:',
      '{"question":"string","focus":"string","difficulty":"easy|medium|hard","resumeAnchor":"string"}',
    ].join('\n\n');
  } else if (action === 'answer') {
    const currentQuestion = cleanText(body.currentQuestion, 500);
    const answer = cleanText(body.answer, 3000);
    if (!currentQuestion || !answer) {
      res.status(400).json({ error: 'Missing currentQuestion or answer.' });
      return;
    }
    instruction = [
      'You are an interview evaluator. Return strict JSON only.',
      interviewContext({ role, resumeText, history, maxQuestions }),
      `Current question: ${currentQuestion}`,
      `Candidate answer: ${answer}`,
      'Use a grounded rubric: relevance to question, technical depth, and clarity/structure.',
      'Score the answer from 0 to 10 based on the rubric, give concise feedback with one reason for score.',
      'Avoid generic praise; mention one missing point if relevant.',
      'Then ask exactly ONE next question.',
      'The next question should continue from either: (a) the same resume anchor, or (b) a nearby resume item, or (c) a weakness seen in this answer.',
      'Avoid generic unrelated questions.',
      'Do not generate a list of questions. Keep nextQuestion to one interview question.',
      'If interview should end now, set done=true and nextQuestion empty.',
      'Return this JSON schema exactly:',
      '{"score":0,"feedback":"string","nextQuestion":"string","done":false,"resumeAnchor":"string"}',
    ].join('\n\n');
  } else if (action === 'finalize') {
    if (!Array.isArray(history) || history.length === 0) {
      res.status(400).json({ error: 'At least one answered question is required before finalizing.' });
      return;
    }
    instruction = [
      'You are an interview final reviewer. Return strict JSON only.',
      interviewContext({ role, resumeText, history, maxQuestions }),
      'Create final decision and summary based mainly on candidate answers and their quality across asked questions.',
      'Do not give high rating from resume alone. If answers are weak/vague, lower the decision accordingly.',
      'Status rules: score >= 8 => "Strong Hire", score 6-7.9 => "Borderline", below 6 => "Needs Improvement".',
      'Return this JSON schema exactly:',
      '{"status":"Strong Hire|Borderline|Needs Improvement","overallScore":0,"strengths":[""],"improvements":[""],"summary":"string"}',
    ].join('\n\n');
  } else {
    res.status(400).json({ error: 'Unknown action. Use start, answer, or finalize.' });
    return;
  }

  try {
    const result = await callOllama({ apiKey, model, instruction });
    if (!result.ok) {
      res.status(result.code).json({ error: result.error });
      return;
    }
    if (action === 'answer') {
      const currentQuestion = cleanText(body.currentQuestion, 500);
      const answer = cleanText(body.answer, 3000);
      const aiScore = Number(result.data?.score);
      const rubric = computeRubric(currentQuestion, answer);
      const finalScore = combineScores(aiScore, rubric.score);
      res.status(200).json({
        ...result.data,
        score: finalScore,
        rubric: rubric.rubric,
        evidence: rubric.evidence,
      });
      return;
    }

    if (action === 'finalize') {
      const scored = history
        .map((h) => Number(h?.score))
        .filter((n) => Number.isFinite(n));
      const avg = scored.length ? round1(scored.reduce((a, b) => a + b, 0) / scored.length) : null;
      const modelOverall = Number(result.data?.overallScore);
      const overallScore = Number.isFinite(modelOverall)
        ? (avg == null ? round1(clamp(modelOverall, 0, 10)) : round1(clamp(modelOverall * 0.15 + avg * 0.85, 0, 10)))
        : (avg ?? 0);
      const status =
        overallScore >= 8 ? 'Strong Hire' : overallScore >= 6 ? 'Borderline' : 'Needs Improvement';
      res.status(200).json({
        ...result.data,
        overallScore,
        status,
      });
      return;
    }

    res.status(200).json(result.data);
  } catch {
    res.status(502).json({ error: 'Unexpected interview service error.' });
  }
}
