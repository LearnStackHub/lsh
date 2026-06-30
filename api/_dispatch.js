/** Shared /api route table — used by Vercel catch-all and local dev server. */

export const ROUTE_LOADERS = {
  'GET /health': () => import('./_handlers/health.js'),
  'GET /subscription-pricing': () => import('./_handlers/subscription-pricing.js'),
  'GET /invoices': () => import('./_handlers/invoices.js'),
  'POST /razorpay-order': () => import('./_handlers/razorpay-order.js'),
  'POST /razorpay-verify': () => import('./_handlers/razorpay-verify.js'),
  'POST /razorpay-webhook': () => import('./_handlers/razorpay-webhook.js'),
  'POST /sync-user': () => import('./_handlers/sync-user.js'),
  'POST /recruitment-exam': () => import('./_handlers/recruitment-exam.js'),
  'POST /recruitment-register-check': () => import('./_handlers/recruitment-register-check.js'),
  'GET /recruitment-exams': () => import('./_handlers/recruitment-exams.js'),
  'GET /admin-users': () => import('./_handlers/admin-users.js'),
  'POST /execute-code': () => import('./_handlers/execute-code.js'),
  'POST /ollama-chat': () => import('./_handlers/ollama-chat.js'),
  'POST /interview': () => import('./_handlers/interview.js'),
};

export function normalizeApiPath(slug) {
  if (!slug) return '';
  if (Array.isArray(slug)) return slug.join('/');
  return String(slug).replace(/^\/+/, '');
}

/** Resolve route segment from Vercel dynamic param or request URL. */
export function resolveApiPath(req) {
  const fromQuery = normalizeApiPath(req.query?.path ?? req.query?.slug);
  if (fromQuery) return fromQuery;

  const rawUrl = String(req.url || '');
  const pathname = rawUrl.startsWith('/')
    ? rawUrl.split('?')[0]
    : new URL(rawUrl, 'http://localhost').pathname;

  return pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
}

export function routeKey(method, apiPath) {
  const path = String(apiPath || '').replace(/^\/+/, '');
  return `${method} /${path}`;
}

export async function dispatchApi(req, res, apiPath) {
  const path = String(apiPath || '').replace(/^\/+/, '');
  const key = routeKey(req.method, path);
  const loader = ROUTE_LOADERS[key];

  if (!loader) {
    res.status(404).json({ error: 'Not found', path: `/api/${path}`, method: req.method });
    return;
  }

  const mod = await loader();
  await mod.default(req, res);
}
