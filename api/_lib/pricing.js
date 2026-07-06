/** Shared subscription pricing — early bird for first N paid subscribers. */

export const EARLY_BIRD_LIMIT = Number(process.env.SUBSCRIBER_EARLY_BIRD_LIMIT || 100);

export const SUPPORTED_CURRENCIES = ['INR', 'USD'];

const PLAN_META = {
  six_months: {
    id: 'six_months',
    durationDays: 180,
    durationMonths: 6,
    label: '6 Months Access',
  },
  twelve_months: {
    id: 'twelve_months',
    durationDays: 365,
    durationMonths: 12,
    label: '12 Months + Live Training',
  },
};

const PLAN_AMOUNTS_INR = {
  six_months: {
    earlyAmountMinor: Number(process.env.RAZORPAY_PLAN_6MONTHS_EARLY_PAISE || 99900),
    regularAmountMinor: Number(process.env.RAZORPAY_PLAN_6MONTHS_PAISE || 149900),
  },
  twelve_months: {
    earlyAmountMinor: Number(process.env.RAZORPAY_PLAN_12MONTHS_EARLY_PAISE || 3499900),
    regularAmountMinor: Number(process.env.RAZORPAY_PLAN_12MONTHS_PAISE || 4999900),
  },
};

const PLAN_AMOUNTS_USD = {
  six_months: {
    earlyAmountMinor: Number(process.env.RAZORPAY_PLAN_6MONTHS_EARLY_USD_CENTS || 1200),
    regularAmountMinor: Number(process.env.RAZORPAY_PLAN_6MONTHS_USD_CENTS || 1800),
  },
  twelve_months: {
    earlyAmountMinor: Number(process.env.RAZORPAY_PLAN_12MONTHS_EARLY_USD_CENTS || 42000),
    regularAmountMinor: Number(process.env.RAZORPAY_PLAN_12MONTHS_USD_CENTS || 60000),
  },
};

export function normalizePaymentCurrency(value) {
  const currency = String(value || 'INR')
    .trim()
    .toUpperCase();
  return SUPPORTED_CURRENCIES.includes(currency) ? currency : 'INR';
}

export function isEarlyBirdTier(subscriberCount) {
  return subscriberCount < EARLY_BIRD_LIMIT;
}

export async function getPaidSubscriberCount(db) {
  if (!db) {
    return 0;
  }

  try {
    const snapshot = await db.collection('payments').where('status', '==', 'captured').count().get();
    return snapshot.data()?.count || 0;
  } catch {
    const snapshot = await db
      .collection('payments')
      .where('status', '==', 'captured')
      .limit(EARLY_BIRD_LIMIT + 1)
      .get();
    return snapshot.size;
  }
}

function getPlanAmounts(planId, currency) {
  if (currency === 'USD') {
    return PLAN_AMOUNTS_USD[planId];
  }
  return PLAN_AMOUNTS_INR[planId];
}

function minorToDisplay(amountMinor) {
  return Math.round(amountMinor / 100);
}

export function resolvePlanPricing(planId, subscriberCount, currencyInput = 'INR') {
  const currency = normalizePaymentCurrency(currencyInput);
  const meta = PLAN_META[planId];
  const amounts = getPlanAmounts(planId, currency);
  if (!meta || !amounts) {
    return null;
  }

  const earlyBird = isEarlyBirdTier(subscriberCount);
  const amountMinor = earlyBird ? amounts.earlyAmountMinor : amounts.regularAmountMinor;
  const amountDisplay = minorToDisplay(amountMinor);
  const regularAmountDisplay = minorToDisplay(amounts.regularAmountMinor);
  const earlyAmountDisplay = minorToDisplay(amounts.earlyAmountMinor);

  const resolved = {
    ...meta,
    currency,
    amountMinor,
    amountDisplay,
    earlyBird,
    tier: earlyBird ? 'early_bird' : 'regular',
    regularAmountDisplay,
    earlyAmountDisplay,
  };

  if (currency === 'USD') {
    return {
      ...resolved,
      amountUsd: amountDisplay,
      amountUsdCents: amountMinor,
      regularAmountUsd: regularAmountDisplay,
      earlyAmountUsd: earlyAmountDisplay,
    };
  }

  return {
    ...resolved,
    amountPaise: amountMinor,
    amountInr: amountDisplay,
    regularAmountInr: regularAmountDisplay,
    earlyAmountInr: earlyAmountDisplay,
  };
}

export function buildPricingSnapshot(subscriberCount) {
  const earlyBird = isEarlyBirdTier(subscriberCount);
  const spotsRemaining = Math.max(0, EARLY_BIRD_LIMIT - subscriberCount);

  const plans = ['six_months', 'twelve_months'].map((planId) => {
    const inr = resolvePlanPricing(planId, subscriberCount, 'INR');
    const usd = resolvePlanPricing(planId, subscriberCount, 'USD');

    return {
      id: planId,
      name: inr.label,
      durationMonths: inr.durationMonths,
      durationDays: inr.durationDays,
      earlyBird: inr.earlyBird,
      amountInr: inr.amountInr,
      amountPaise: inr.amountPaise,
      regularAmountInr: inr.regularAmountInr,
      earlyAmountInr: inr.earlyAmountInr,
      amountUsd: usd.amountUsd,
      amountUsdCents: usd.amountUsdCents,
      regularAmountUsd: usd.regularAmountUsd,
      earlyAmountUsd: usd.earlyAmountUsd,
    };
  });

  return {
    earlyBirdActive: earlyBird,
    earlyBirdLimit: EARLY_BIRD_LIMIT,
    paidSubscriberCount: subscriberCount,
    spotsRemaining,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    plans,
  };
}
