const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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

async function callGemini({ apiKey, instruction }) {
  const url = `${GEMINI_URL}?key=${encodeURIComponent(apiKey)}`;
  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
      contents: [{ role: 'user', parts: [{ text: instruction }] }],
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
    const code = upstream.status >= 500 ? 502 : 422;
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
    return { ok: false, code: 502, error: 'Invalid AI response format.' };
  }
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
    `Target questions count: ${Math.min(Math.max(Number(maxQuestions) || 5, 3), 8)}`,
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'Missing GEMINI_API_KEY in server environment.' });
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
  const maxQuestions = Math.min(Math.max(Number(body.maxQuestions) || 5, 3), 8);

  if (!resumeText || resumeText.length < 100) {
    res.status(400).json({ error: 'Resume text is too short. Please paste at least 100 characters.' });
    return;
  }

  let instruction = '';

  if (action === 'start') {
    instruction = [
      'You are an interview engine. Return strict JSON only.',
      interviewContext({ role, resumeText, history: [], maxQuestions }),
      'Task: generate the first interview question tailored to the resume and role.',
      'Return this JSON schema exactly:',
      '{"question":"string","focus":"string","difficulty":"easy|medium|hard"}',
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
      'Score the answer from 0 to 10, give concise feedback, then ask the next question.',
      'If interview should end now, set done=true and nextQuestion empty.',
      'Return this JSON schema exactly:',
      '{"score":0,"feedback":"string","nextQuestion":"string","done":false}',
    ].join('\n\n');
  } else if (action === 'finalize') {
    instruction = [
      'You are an interview final reviewer. Return strict JSON only.',
      interviewContext({ role, resumeText, history, maxQuestions }),
      'Create final decision and summary.',
      'Status rules: score >= 8 => "Strong Hire", score 6-7.9 => "Borderline", below 6 => "Needs Improvement".',
      'Return this JSON schema exactly:',
      '{"status":"Strong Hire|Borderline|Needs Improvement","overallScore":0,"strengths":[""],"improvements":[""],"summary":"string"}',
    ].join('\n\n');
  } else {
    res.status(400).json({ error: 'Unknown action. Use start, answer, or finalize.' });
    return;
  }

  try {
    const result = await callGemini({ apiKey, instruction });
    if (!result.ok) {
      res.status(result.code).json({ error: result.error });
      return;
    }
    res.status(200).json(result.data);
  } catch {
    res.status(502).json({ error: 'Unexpected interview service error.' });
  }
}
