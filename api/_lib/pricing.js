/** Shared subscription pricing — early bird for first N paid subscribers. */

export const EARLY_BIRD_LIMIT = Number(process.env.SUBSCRIBER_EARLY_BIRD_LIMIT || 100);

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

const PLAN_AMOUNTS = {
  six_months: {
    earlyAmountPaise: Number(process.env.RAZORPAY_PLAN_6MONTHS_EARLY_PAISE || 99900),
    regularAmountPaise: Number(process.env.RAZORPAY_PLAN_6MONTHS_PAISE || 149900),
  },
  twelve_months: {
    earlyAmountPaise: Number(process.env.RAZORPAY_PLAN_12MONTHS_EARLY_PAISE || 3499900),
    regularAmountPaise: Number(process.env.RAZORPAY_PLAN_12MONTHS_PAISE || 4999900),
  },
};

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

export function resolvePlanPricing(planId, subscriberCount) {
  const meta = PLAN_META[planId];
  const amounts = PLAN_AMOUNTS[planId];
  if (!meta || !amounts) {
    return null;
  }

  const earlyBird = isEarlyBirdTier(subscriberCount);
  const amountPaise = earlyBird ? amounts.earlyAmountPaise : amounts.regularAmountPaise;
  const amountInr = Math.round(amountPaise / 100);
  const regularAmountInr = Math.round(amounts.regularAmountPaise / 100);
  const earlyAmountInr = Math.round(amounts.earlyAmountPaise / 100);

  return {
    ...meta,
    amountPaise,
    amountInr,
    earlyBird,
    tier: earlyBird ? 'early_bird' : 'regular',
    regularAmountInr,
    earlyAmountInr,
  };
}

export function buildPricingSnapshot(subscriberCount) {
  const earlyBird = isEarlyBirdTier(subscriberCount);
  const spotsRemaining = Math.max(0, EARLY_BIRD_LIMIT - subscriberCount);

  const plans = ['six_months', 'twelve_months'].map((planId) => {
    const resolved = resolvePlanPricing(planId, subscriberCount);
    return {
      id: planId,
      name: resolved.label,
      durationMonths: resolved.durationMonths,
      durationDays: resolved.durationDays,
      amountInr: resolved.amountInr,
      amountPaise: resolved.amountPaise,
      earlyBird: resolved.earlyBird,
      regularAmountInr: resolved.regularAmountInr,
      earlyAmountInr: resolved.earlyAmountInr,
    };
  });

  return {
    earlyBirdActive: earlyBird,
    earlyBirdLimit: EARLY_BIRD_LIMIT,
    paidSubscriberCount: subscriberCount,
    spotsRemaining,
    plans,
  };
}
