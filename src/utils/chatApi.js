/** Shared client for Practice Lab chat and tutorial floating chat. */

export function toApiMessages(rows) {
  return rows
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.text }));
}

export async function fetchChatReply(messages) {
  const res = await fetch('/api/ollama-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: toApiMessages(messages) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        'Chat is not available here. Open this page from the main site, or try again later.',
      );
    }
    if (res.status === 503) {
      const err = typeof data.error === 'string' ? data.error : 'Service unavailable';
      throw new Error(err);
    }
    const err =
      typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.';
    throw new Error(err);
  }
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new Error('No answer came back. Please try again.');
  }
  return data.reply.trim();
}
