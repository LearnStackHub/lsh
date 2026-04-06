const OLLAMA_URL = process.env.OLLAMA_API_URL || 'https://ollama.com/api/chat';
const MAX_MESSAGES = 24;
const MAX_TOTAL_CHARS = 14000;

const DEFAULT_SYSTEM =
  'You are a concise interview-prep tutor for Java and backend (JVM, OOP, collections, concurrency, JDBC, Spring, SQL, HTTP). ' +
  'Prefer short paragraphs and bullet points. Give accurate, practical answers; if unsure, say so. ' +
  'Format every answer in Markdown: use ### headings, bullet lists, **bold** for important terms, horizontal rules --- between major sections, and fenced ``` code blocks for code or config snippets.';

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

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: 'Chat is temporarily unavailable. Please try again later.',
    });
    return;
  }

  const body = parseBody(req);
  if (body === null) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const incoming = body.messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    res.status(400).json({ error: 'Expected a non-empty messages array' });
    return;
  }

  const model = process.env.OLLAMA_MODEL || 'llama3.2';
  const systemContent = (process.env.OLLAMA_SYSTEM_PROMPT || DEFAULT_SYSTEM).slice(0, 6000);

  const trimmed = incoming.slice(-MAX_MESSAGES);
  const messages = [{ role: 'system', content: systemContent }];
  let total = systemContent.length;

  for (const m of trimmed) {
    const role = m.role;
    if (role !== 'user' && role !== 'assistant') continue;
    const content = String(m.content ?? '').slice(0, 12000);
    if (!content.trim()) continue;
    total += content.length;
    if (total > MAX_TOTAL_CHARS) break;
    messages.push({ role, content });
  }

  const hasUser = messages.some((m) => m.role === 'user');
  if (!hasUser) {
    res.status(400).json({ error: 'No user messages to answer' });
    return;
  }

  try {
    const upstream = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });

    const rawText = await upstream.text();
    if (!upstream.ok) {
      const code = upstream.status >= 500 ? 502 : 422;
      res.status(code).json({
        error: 'We could not complete that request. Please try again in a moment.',
      });
      return;
    }

    const data = JSON.parse(rawText);
    const reply = data.message?.content;
    if (!reply || typeof reply !== 'string') {
      res.status(502).json({
        error: 'We could not get an answer right now. Please try again.',
      });
      return;
    }

    res.status(200).json({ reply: reply.trim() });
  } catch {
    res.status(502).json({
      error: 'Something went wrong. Please try again in a moment.',
    });
  }
}
