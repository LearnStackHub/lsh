const DEFAULT_PRICING = {
  earlyBirdActive: true,
  earlyBirdLimit: 100,
  paidSubscriberCount: 0,
  spotsRemaining: 100,
  plans: [],
};

export async function fetchSubscriptionPricing() {
  try {
    const response = await fetch('/api/subscription-pricing');
    if (!response.ok) {
      return DEFAULT_PRICING;
    }
    return response.json();
  } catch {
    return DEFAULT_PRICING;
  }
}

export function getLivePlanPricing(pricingSnapshot, planId) {
  return pricingSnapshot?.plans?.find((plan) => plan.id === planId) || null;
}
