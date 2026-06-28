/**
 * Local Razorpay connectivity check (uses .env — do not commit secrets).
 * Run: npm run test:razorpay
 */

import { createRazorpayOrder, getPlanConfig, isRazorpayConfigured } from '../api/_lib/razorpay.js';

async function main() {
  console.log('Razorpay configured:', isRazorpayConfigured());

  if (!isRazorpayConfigured()) {
    console.error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env');
    process.exit(1);
  }

  const plan = getPlanConfig('six_months');
  const order = await createRazorpayOrder({
    amountPaise: plan.amountPaise,
    receipt: `lsh_local_${Date.now()}`.slice(0, 40),
    notes: { uid: 'local-test', planId: 'six_months', email: 'test@learnstackhub.com' },
  });

  console.log('Test order created successfully');
  console.log('  order id:', order.id);
  console.log('  amount:  ', order.amount, order.currency);
  console.log('  status:  ', order.status);
  console.log('\nNext: run `npx vercel dev` (after vercel login) and open http://localhost:3000/subscribe');
}

main().catch((error) => {
  console.error('Razorpay test failed:', error.message || error);
  process.exit(1);
});
