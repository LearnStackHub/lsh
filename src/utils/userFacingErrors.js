const IS_DEV = import.meta.env.DEV;

const TECHNICAL_PATTERN =
  /vercel|firebase|firestore|\.env|local-api|npm run|FIREBASE_|RAZORPAY_|\/api\/health|ERR_|environment variable|service account|credentials/i;

export const CHECKOUT_UNAVAILABLE =
  'Checkout is temporarily unavailable. Please try again in a few minutes or contact careers@learnstackhub.com.';

export const PAYMENT_VERIFY_FAILED =
  'We could not confirm your payment. If you were charged, email careers@learnstackhub.com with your transaction details.';

export const SIGN_IN_UNAVAILABLE =
  'Sign-in is temporarily unavailable. Please try again in a few minutes.';

export function devOnlyMessage(devMessage, prodMessage) {
  return IS_DEV ? devMessage : prodMessage;
}

export function sanitizeUserMessage(message, fallback = CHECKOUT_UNAVAILABLE) {
  if (IS_DEV) {
    return message || fallback;
  }
  if (!message || TECHNICAL_PATTERN.test(message)) {
    return fallback;
  }
  return message;
}
