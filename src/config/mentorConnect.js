import { LEARNSTACKHUB } from './company';

/** Plan IDs that include 90-day live training + mentor connect. */
export const LIVE_TRAINING_PLAN_IDS = new Set(['twelve_months', 'yearly']);

export const MENTOR_CONNECT = {
  /** E.164 without + for wa.me links, e.g. 918466932302 */
  whatsappNumber: String(import.meta.env.VITE_MENTOR_WHATSAPP || '918466932302').replace(/\D/g, ''),
  email: import.meta.env.VITE_MENTOR_EMAIL || LEARNSTACKHUB.contactEmail,
  phoneDisplay: import.meta.env.VITE_MENTOR_PHONE_DISPLAY || '8466932302',
  phoneTel: import.meta.env.VITE_MENTOR_PHONE_TEL || '8466932302',
  /** Optional Google Meet / Zoom schedule URL */
  scheduleUrl: import.meta.env.VITE_MENTOR_SCHEDULE_URL || '',
  supportHours: 'Mon–Sat, 9 AM – 6 PM IST',
  trainingDays: 90,
  responseTime: 'within 24 hours on working days',
};

export function hasLiveTrainingAccess(user, isAdmin = false) {
  if (isAdmin) return true;
  if (!user?.isSubscribed) return false;
  const planId = user.subscription?.plan;
  return LIVE_TRAINING_PLAN_IDS.has(planId);
}

export function buildWhatsAppMentorUrl({ name, email }) {
  const text = [
    'Hi LearnStackHub,',
    'I purchased the 12-month plan with live training.',
    `Name: ${name || 'Student'}`,
    `Email: ${email || ''}`,
    'I would like to connect with a mentor for doubt clearing.',
  ].join('\n');

  return `https://wa.me/${MENTOR_CONNECT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildMentorEmailUrl({ name, email }) {
  const subject = encodeURIComponent('LearnStackHub — Mentor connect (12-month plan)');
  const body = encodeURIComponent(
    [
      'Hello LearnStackHub team,',
      '',
      'I have the 12-month plan with live training and would like mentor support.',
      '',
      `Name: ${name || ''}`,
      `Email: ${email || ''}`,
      '',
      'My question / topic:',
      '',
    ].join('\n')
  );

  return `mailto:${MENTOR_CONNECT.email}?subject=${subject}&body=${body}`;
}
