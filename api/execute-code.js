const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';
const MAX_CODE_CHARS = 20000;
const MAX_STDIN_CHARS = 8000;

const FILE_NAMES = {
  java: 'Main.java',
  javascript: 'main.js',
  python: 'main.py',
  cpp: 'main.cpp',
  c: 'main.c',
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

  if (!language || !FILE_NAMES[language]) {
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
    const upstream = await fetch(PISTON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        version: '*',
        stdin,
        files: [
          {
            name: FILE_NAMES[language],
            content: code,
          },
        ],
      }),
    });

    const text = await upstream.text();
    const data = text ? JSON.parse(text) : {};

    if (!upstream.ok) {
      res.status(502).json({
        error: data?.message || `Execution provider error (${upstream.status})`,
      });
      return;
    }

    const compileErr = (data?.compile?.stderr || '').trim();
    const runtimeErr = (data?.run?.stderr || '').trim();
    const stdout = data?.run?.stdout || data?.run?.output || '';

    res.status(200).json({
      success: data?.run?.code === 0,
      output: stdout,
      error: [compileErr, runtimeErr].filter(Boolean).join('\n'),
      executionTime: 0,
    });
  } catch {
    res.status(502).json({
      error: 'Execution service is temporarily unavailable. Please try again.',
    });
  }
}
