/** Client-side subscription plan catalog (amounts resolved live via /api/subscription-pricing). */

export const EARLY_BIRD_LIMIT = Number(import.meta.env.VITE_SUBSCRIBER_EARLY_BIRD_LIMIT || 100);
export const LIVE_TRAINING_DAYS = 90;

export const PLATFORM_FEATURES = [
  'Full tutorial library',
  'Topic-wise MCQs',
  'Practice Lab access',
  'Interview prep tracks',
  'Monthly certification exam',
  'Internship certificate on exam pass',
];

export const EXAM_CERTIFICATE_NOTE =
  'Every month we conduct an assessment exam. Pass the exam to receive your LearnStackHub internship certificate.';

/** Legacy plan IDs kept for existing invoices and webhooks. */
const LEGACY_PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Monthly Access',
    durationMonths: 1,
    durationDays: 30,
    amountInr: 499,
    description: 'Legacy monthly plan.',
    highlight: false,
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly Access',
    durationMonths: 12,
    durationDays: 365,
    amountInr: 3999,
    description: 'Legacy yearly plan.',
    highlight: false,
  },
};

export const SUBSCRIPTION_PLAN_CATALOG = [
  {
    id: 'six_months',
    name: '6 Months Access',
    durationMonths: 6,
    durationDays: 180,
    earlyAmountInr: Number(import.meta.env.VITE_RAZORPAY_PLAN_6MONTHS_EARLY_INR || 999),
    regularAmountInr: Number(import.meta.env.VITE_RAZORPAY_PLAN_6MONTHS_INR || 1499),
    earlyAmountUsd: Number(import.meta.env.VITE_RAZORPAY_PLAN_6MONTHS_EARLY_USD || 12),
    regularAmountUsd: Number(import.meta.env.VITE_RAZORPAY_PLAN_6MONTHS_USD || 18),
    description: 'Self-paced platform access for 6 months with monthly certification exams.',
    highlight: false,
    features: [...PLATFORM_FEATURES],
  },
  {
    id: 'twelve_months',
    name: '12 Months + Live Training',
    durationMonths: 12,
    durationDays: 365,
    earlyAmountInr: Number(import.meta.env.VITE_RAZORPAY_PLAN_12MONTHS_EARLY_INR || 34999),
    regularAmountInr: Number(import.meta.env.VITE_RAZORPAY_PLAN_12MONTHS_INR || 49999),
    earlyAmountUsd: Number(import.meta.env.VITE_RAZORPAY_PLAN_12MONTHS_EARLY_USD || 420),
    regularAmountUsd: Number(import.meta.env.VITE_RAZORPAY_PLAN_12MONTHS_USD || 600),
    description: `12 months platform access, ${LIVE_TRAINING_DAYS} days live training, and internship certificate path via monthly exams.`,
    highlight: true,
    ribbon: 'Live training + certificate',
    features: [
      ...PLATFORM_FEATURES,
      `${LIVE_TRAINING_DAYS} days online live training`,
      'Connect with mentors for guidance',
      'Doubt-clearing & Q&A sessions',
      'In-depth technology explanations',
    ],
  },
];

export const SUBSCRIPTION_PLANS = SUBSCRIPTION_PLAN_CATALOG.map((plan) => ({
  ...plan,
  amountInr: plan.earlyAmountInr,
}));

export const REQUIRE_SUBSCRIPTION =
  String(import.meta.env.VITE_REQUIRE_SUBSCRIPTION || '').toLowerCase() === 'true';

export function getPlanById(planId) {
  const catalogPlan = SUBSCRIPTION_PLAN_CATALOG.find((plan) => plan.id === planId);
  if (catalogPlan) {
    return { ...catalogPlan, amountInr: catalogPlan.earlyAmountInr };
  }
  return LEGACY_PLANS[planId] || null;
}

export const PAYMENT_CURRENCIES = [
  { code: 'INR', label: 'India (INR)', shortLabel: 'INR' },
  { code: 'USD', label: 'International (USD)', shortLabel: 'USD' },
];

export function mergeLivePricing(catalogPlan, livePlan) {
  if (!catalogPlan) return null;
  if (!livePlan) {
    return {
      ...catalogPlan,
      amountInr: catalogPlan.earlyAmountInr,
      amountUsd: catalogPlan.earlyAmountUsd,
      earlyBird: true,
    };
  }
  return {
    ...catalogPlan,
    amountInr: livePlan.amountInr,
    amountUsd: livePlan.amountUsd,
    earlyBird: livePlan.earlyBird,
    regularAmountInr: livePlan.regularAmountInr,
    earlyAmountInr: livePlan.earlyAmountInr,
    regularAmountUsd: livePlan.regularAmountUsd,
    earlyAmountUsd: livePlan.earlyAmountUsd,
  };
}

export function planChargeAmount(plan, currency = 'INR') {
  if (!plan) return 0;
  if (currency === 'USD') {
    return plan.amountUsd ?? plan.earlyAmountUsd ?? 0;
  }
  return plan.amountInr ?? plan.earlyAmountInr ?? 0;
}

export function planRegularChargeAmount(plan, currency = 'INR') {
  if (!plan) return 0;
  if (currency === 'USD') {
    return plan.regularAmountUsd ?? 0;
  }
  return plan.regularAmountInr ?? 0;
}

export function formatInr(amount) {
  return formatMoney(amount, 'INR');
}

export function formatUsd(amount) {
  return formatMoney(amount, 'USD');
}

export function formatMoney(amount, currency = 'INR') {
  const locale = currency === 'USD' ? 'en-US' : 'en-IN';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPlanDuration(plan) {
  if (!plan) return '—';
  if (plan.durationMonths === 1) return '1 month';
  if (plan.durationMonths) return `${plan.durationMonths} months`;
  if (plan.durationDays) return `${plan.durationDays} days`;
  return '—';
}

export function formatPlanAccessDescription(plan) {
  if (!plan) return 'Subscription access';
  return `${plan.name || plan.label} — ${formatPlanDuration(plan)} platform access`;
}

export function perMonthPrice(plan, currency = 'INR') {
  if (!plan?.durationMonths) return null;
  const amount = planChargeAmount(plan, currency);
  if (!amount) return null;
  return Math.round(amount / plan.durationMonths);
}

export function comparePlanSavings(shortPlan, longPlan) {
  if (!shortPlan || !longPlan || !shortPlan.durationMonths || !longPlan.durationMonths) {
    return null;
  }
  const ratio = longPlan.durationMonths / shortPlan.durationMonths;
  if (ratio <= 1) return null;
  const fullPeriodCost = shortPlan.amountInr * ratio;
  const saved = fullPeriodCost - longPlan.amountInr;
  if (saved <= 0) return null;
  return { saved, percent: Math.round((saved / fullPeriodCost) * 100) };
}
