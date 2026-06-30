const JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const MAX_CODE_CHARS = 20000;
const MAX_STDIN_CHARS = 8000;

const LANGUAGE_IDS = {
  java: 62,
  javascript: 63,
  python: 71,
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

export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = parseBody(req);
  if (body === null) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const language = String(body.language || '').trim().toLowerCase();
  const code = String(body.code || '');
  const stdin = String(body.input || '');

  if (!language || !LANGUAGE_IDS[language]) {
    res.status(400).json({ error: 'Unsupported language' });
    return;
  }
  if (!code.trim()) {
    res.status(400).json({ error: 'Code is required' });
    return;
  }
  if (code.length > MAX_CODE_CHARS) {
    res.status(413).json({ error: 'Code is too large' });
    return;
  }
  if (stdin.length > MAX_STDIN_CHARS) {
    res.status(413).json({ error: 'Input is too large' });
    return;
  }

  try {
    const upstream = await fetch(JUDGE0_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: LANGUAGE_IDS[language],
        stdin,
      }),
    });

    const text = await upstream.text();
    const data = text ? JSON.parse(text) : {};

    if (!upstream.ok) {
      res.status(502).json({
        error: data?.error || data?.message || `Execution provider error (${upstream.status})`,
      });
      return;
    }

    const compileErr = (data?.compile_output || '').trim();
    const runtimeErr = (data?.stderr || '').trim();
    const messageErr = (data?.message || '').trim();
    const statusDesc = (data?.status?.description || '').trim();
    const stdout = data?.stdout || '';
    const errorText = [compileErr, runtimeErr, messageErr].filter(Boolean).join('\n');
    const success = data?.status?.id === 3;

    res.status(200).json({
      success,
      output: stdout,
      error: errorText || (!success && statusDesc ? statusDesc : ''),
      executionTime: Number(data?.time) || 0,
    });
  } catch {
    res.status(502).json({
      error: 'Execution service is temporarily unavailable. Please try again.',
    });
  }
}
