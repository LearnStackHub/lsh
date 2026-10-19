export const config = {
  maxDuration: 30,
};

/** Cashfree PG webhook — extend when notify URL is enabled in dashboard. */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  console.info('cashfree-webhook received');
  res.status(200).json({ ok: true });
}
