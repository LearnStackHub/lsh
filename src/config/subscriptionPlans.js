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

export function mergeLivePricing(catalogPlan, livePlan) {
  if (!catalogPlan) return null;
  if (!livePlan) {
    return { ...catalogPlan, amountInr: catalogPlan.earlyAmountInr, earlyBird: true };
  }
  return {
    ...catalogPlan,
    amountInr: livePlan.amountInr,
    earlyBird: livePlan.earlyBird,
    regularAmountInr: livePlan.regularAmountInr,
    earlyAmountInr: livePlan.earlyAmountInr,
  };
}

export function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
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

export function perMonthPrice(plan) {
  if (!plan?.durationMonths) return null;
  return Math.round(plan.amountInr / plan.durationMonths);
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
