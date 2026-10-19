import { FieldValue } from 'firebase-admin/firestore';
import { isCashfreeConfigured } from './cashfree.js';
import { isRazorpayConfigured } from './razorpay.js';

export const PAYMENT_GATEWAYS = ['razorpay', 'cashfree'];
const SETTINGS_DOC = ['siteSettings', 'payment'];

function normalizeGateway(value) {
  const gateway = String(value || '').trim().toLowerCase();
  return PAYMENT_GATEWAYS.includes(gateway) ? gateway : 'razorpay';
}

export async function getPaymentSettings(db) {
  if (!db) {
    return { activeGateway: normalizeGateway(process.env.DEFAULT_PAYMENT_GATEWAY), updatedAt: null, updatedBy: '' };
  }

  try {
    const snapshot = await db.doc(SETTINGS_DOC.join('/')).get();
    if (!snapshot.exists) {
      return { activeGateway: normalizeGateway(process.env.DEFAULT_PAYMENT_GATEWAY), updatedAt: null, updatedBy: '' };
    }
    const data = snapshot.data() || {};
    return {
      activeGateway: normalizeGateway(data.activeGateway),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || null,
      updatedBy: data.updatedBy || '',
    };
  } catch (error) {
    console.warn('getPaymentSettings failed:', error?.message || error);
    return { activeGateway: 'razorpay', updatedAt: null, updatedBy: '' };
  }
}

export async function setPaymentSettings(db, activeGateway, updatedByEmail) {
  const gateway = normalizeGateway(activeGateway);
  await db.doc(SETTINGS_DOC.join('/')).set(
    {
      activeGateway: gateway,
      updatedBy: String(updatedByEmail || '').slice(0, 120),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return getPaymentSettings(db);
}

export function getGatewayAvailability() {
  return {
    razorpayConfigured: isRazorpayConfigured(),
    cashfreeConfigured: isCashfreeConfigured(),
  };
}

export async function getPublicPaymentSettings(db) {
  const settings = await getPaymentSettings(db);
  const availability = getGatewayAvailability();
  let activeGateway = settings.activeGateway;

  if (activeGateway === 'cashfree' && !availability.cashfreeConfigured) {
    activeGateway = availability.razorpayConfigured ? 'razorpay' : activeGateway;
  }
  if (activeGateway === 'razorpay' && !availability.razorpayConfigured) {
    activeGateway = availability.cashfreeConfigured ? 'cashfree' : activeGateway;
  }

  return {
    activeGateway,
    ...availability,
    checkoutReady:
      (activeGateway === 'razorpay' && availability.razorpayConfigured) ||
      (activeGateway === 'cashfree' && availability.cashfreeConfigured),
    updatedAt: settings.updatedAt,
  };
}

export async function assertActiveGateway(db, expected) {
  const { activeGateway } = await getPublicPaymentSettings(db);
  if (activeGateway !== expected) {
    const err = new Error(`Checkout is configured for ${activeGateway}, not ${expected}.`);
    err.code = 'WRONG_PAYMENT_GATEWAY';
    throw err;
  }
}
