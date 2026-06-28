/**
 * Local dev server for Vercel-style /api routes (used with Vite proxy).
 * Run: node --env-file=.env scripts/local-api-server.js
 */

import http from 'node:http';
import { URL } from 'node:url';
import { getConfigStatus } from '../api/_lib/firebaseAdmin.js';
import { isRazorpayConfigured } from '../api/_lib/razorpay.js';

const PORT = Number(process.env.LOCAL_API_PORT || 8787);

const ROUTE_MAP = {
  'GET /api/health': async () => ({
    default: (_req, res) => {
      res.status(200).json({ ok: true });
    },
  }),
  'GET /api/subscription-pricing': () => import('../api/subscription-pricing.js'),
  'GET /api/invoices': () => import('../api/invoices.js'),
  'POST /api/razorpay-order': () => import('../api/razorpay-order.js'),
  'POST /api/razorpay-verify': () => import('../api/razorpay-verify.js'),
  'POST /api/sync-user': () => import('../api/sync-user.js'),
  'GET /api/admin-users': () => import('../api/admin-users.js'),
};

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function createResponse(res) {
  let statusCode = 200;
  const headers = {};
  let ended = false;

  const response = {
    isEnded() {
      return ended;
    },
    setHeader(key, value) {
      headers[key] = value;
    },
    status(code) {
      statusCode = code;
      return response;
    },
    json(data) {
      if (ended) {
        return;
      }
      ended = true;
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        ...headers,
      });
      res.end(JSON.stringify(data));
    },
    end(data) {
      if (ended) {
        return;
      }
      ended = true;
      res.writeHead(statusCode, headers);
      res.end(data);
    },
  };

  return response;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const routeKey = `${req.method} ${url.pathname}`;
  const loader = ROUTE_MAP[routeKey];

  if (!loader) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found', path: url.pathname }));
    return;
  }

  try {
    const body = await readBody(req);
    const mockReq = {
      method: req.method,
      headers: req.headers,
      body,
      url: url.pathname,
      query: Object.fromEntries(url.searchParams),
    };

    const { default: handler } = await loader();
    const mockRes = createResponse(res);
    await handler(mockReq, mockRes);

    if (!mockRes.isEnded() && !res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Handler did not send a response' }));
    }
  } catch (error) {
    console.error(`${routeKey} failed:`, error?.message || error);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  }
});

server.listen(PORT, () => {
  const firebase = getConfigStatus();

  console.log(`\n[local-api] listening on http://localhost:${PORT}`);
  console.log(`[local-api] razorpay: ${isRazorpayConfigured() ? 'ready' : 'missing RAZORPAY_KEY_* in .env'}`);
  console.log(
    `[local-api] firebase admin: ${firebase.credentialParses ? 'ready' : 'missing FIREBASE_SERVICE_ACCOUNT in .env'}`
  );
  console.log(`[local-api] routes: ${Object.keys(ROUTE_MAP).join(', ')}`);

  if (!firebase.credentialParses) {
    console.log('[local-api] Checkout needs Firebase Admin. Either:');
    console.log('[local-api]   1) Save your service account JSON as firebase-service-account.json');
    console.log('[local-api]      and set FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json in .env');
    console.log('[local-api]   2) Or paste one-line JSON as FIREBASE_SERVICE_ACCOUNT in .env (same as Vercel).');
    console.log('[local-api]   (Check the filename — no extra dots, e.g. not firebase-service-account..json)\n');
  } else {
    console.log('');
  }
});

server.on('error', (error) => {
  if (error?.code === 'EADDRINUSE') {
    console.error(`\n[local-api] Port ${PORT} is already in use.`);
    console.error('[local-api] Stop the other process or run: npx kill-port 8787');
    console.error('[local-api] Then restart: npm run dev\n');
    process.exit(1);
  }

  console.error('[local-api] Server error:', error?.message || error);
  process.exit(1);
});
