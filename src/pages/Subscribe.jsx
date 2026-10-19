import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  Check,
  ClipboardCheck,
  Code2,
  CreditCard,
  GraduationCap,
  Loader2,
  Lock,
  MessageSquare,
  Sparkles,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../config/brand';
import {
  SUBSCRIPTION_PLAN_CATALOG,
  PLATFORM_FEATURES,
  LIVE_TRAINING_DAYS,
  EXAM_CERTIFICATE_NOTE,
  PAYMENT_CURRENCIES,
  mergeLivePricing,
  formatMoney,
  formatPlanDuration,
  perMonthPrice,
  planChargeAmount,
  planRegularChargeAmount,
} from '../config/subscriptionPlans';
import {
  getCheckoutSettings,
  isCheckoutReady,
  openSubscriptionCheckout,
} from '../services/checkoutService';
import { sanitizeUserMessage } from '../utils/userFacingErrors';
import { fetchSubscriptionPricing, getLivePlanPricing } from '../services/subscriptionPricingService';
import logoImage from '../assets/LSH.png';
import { isValidIndianPhone, normalizeIndianPhone } from '../utils/phone';

const BILLING_PHONE_STORAGE_KEY = 'lsh_billing_phone';

const INCLUDED = [
  { icon: BookOpen, title: 'Full tutorial library', detail: 'Java, Spring, React & more' },
  { icon: BrainCircuit, title: 'Topic-wise MCQs', detail: 'Unlimited practice quizzes' },
  { icon: Code2, title: 'Practice Lab', detail: 'Hands-on coding exercises' },
  { icon: Sparkles, title: 'Interview prep', detail: 'Career-ready question banks' },
];

const TRAINING_HIGHLIGHTS = [
  {
    icon: Video,
    title: `${LIVE_TRAINING_DAYS} days live training`,
    detail: 'Structured online sessions with real-world Java full-stack topics',
  },
  { icon: Users, title: 'Mentor connect', detail: 'Stay connected for guidance throughout your learning journey' },
  { icon: MessageSquare, title: 'Doubt clearing', detail: 'Ask questions and get concepts explained clearly' },
  { icon: GraduationCap, title: 'Technology deep dives', detail: 'Step-by-step explanations of core tools and frameworks' },
];

function Subscribe() {
  const { user, refreshUserProfile, openLoginModal } = useAuth();
  const navigate = useNavigate();
  const [loadingPlanId, setLoadingPlanId] = useState('');
  const [error, setError] = useState('');
  const [pricing, setPricing] = useState(null);
  const [paymentCurrency, setPaymentCurrency] = useState('INR');
  const [checkoutSettings, setCheckoutSettings] = useState(null);
  const [billingPhone, setBillingPhone] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(BILLING_PHONE_STORAGE_KEY) || '';
  });
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneModalDraft, setPhoneModalDraft] = useState('');
  const [pendingPlanId, setPendingPlanId] = useState('');

  useEffect(() => {
    fetchSubscriptionPricing().then(setPricing);
  }, []);

  useEffect(() => {
    getCheckoutSettings(true)
      .then(setCheckoutSettings)
      .catch(() => setCheckoutSettings(null));
  }, []);

  const checkoutReady = isCheckoutReady(checkoutSettings);
  const cashfreeCheckout = checkoutSettings?.activeGateway === 'cashfree';

  useEffect(() => {
    if (cashfreeCheckout && paymentCurrency !== 'INR') {
      setPaymentCurrency('INR');
    }
  }, [cashfreeCheckout, paymentCurrency]);

  const displayPlans = useMemo(
    () =>
      SUBSCRIPTION_PLAN_CATALOG.map((catalogPlan) =>
        mergeLivePricing(catalogPlan, getLivePlanPricing(pricing, catalogPlan.id))
      ),
    [pricing]
  );

  const persistBillingPhone = (phone) => {
    const normalized = normalizeIndianPhone(phone);
    if (!normalized) return '';
    setBillingPhone(normalized);
    try {
      window.localStorage.setItem(BILLING_PHONE_STORAGE_KEY, normalized);
    } catch {
      /* ignore */
    }
    return normalized;
  };

  const runCheckout = async (planId, settings, customerPhone) => {
    const isCashfree = settings?.activeGateway === 'cashfree';
    const currency = isCashfree ? 'INR' : paymentCurrency;

    await openSubscriptionCheckout({
      planId,
      currency,
      user,
      customerPhone: isCashfree ? customerPhone : undefined,
      onSuccess: async (verified) => {
        await refreshUserProfile();
        const orderId = verified?.orderId || '';
        const query = orderId ? `?order=${encodeURIComponent(orderId)}` : '';
        navigate(`/subscription-success${query}`, { replace: true });
      },
    });
  };

  const handleSubscribe = async (planId) => {
    if (!user) {
      openLoginModal();
      return;
    }

    setError('');
    let settings = checkoutSettings;
    try {
      settings = await getCheckoutSettings(true);
      setCheckoutSettings(settings);
    } catch {
      setError('Could not load payment settings. Please refresh and try again.');
      return;
    }

    const isCashfree = settings?.activeGateway === 'cashfree';
    const phone = normalizeIndianPhone(billingPhone);

    if (isCashfree && !phone) {
      setPendingPlanId(planId);
      setPhoneModalDraft(billingPhone);
      setPhoneModalOpen(true);
      return;
    }

    setLoadingPlanId(planId);
    if (isCashfree && phone) {
      persistBillingPhone(phone);
    }

    try {
      await runCheckout(planId, settings, phone);
    } catch (checkoutError) {
      const message = checkoutError?.message || 'Checkout failed';
      if (/mobile number|10-digit/i.test(message)) {
        setPendingPlanId(planId);
        setPhoneModalDraft(billingPhone);
        setPhoneModalOpen(true);
      } else if (message !== 'Payment cancelled') {
        setError(
          sanitizeUserMessage(message, 'Checkout failed. Please try again or contact careers@learnstackhub.com.')
        );
      }
    } finally {
      setLoadingPlanId('');
    }
  };

  const handlePhoneModalContinue = async () => {
    if (!isValidIndianPhone(phoneModalDraft)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    const phone = persistBillingPhone(phoneModalDraft);
    const planId = pendingPlanId;
    if (!planId || !user) {
      setPhoneModalOpen(false);
      return;
    }

    setError('');
    setPhoneModalOpen(false);
    setLoadingPlanId(planId);

    let settings = checkoutSettings;
    try {
      settings = await getCheckoutSettings(true);
      setCheckoutSettings(settings);
      await runCheckout(planId, settings, phone);
    } catch (checkoutError) {
      const message = checkoutError?.message || 'Checkout failed';
      if (message !== 'Payment cancelled') {
        setError(
          sanitizeUserMessage(message, 'Checkout failed. Please try again or contact careers@learnstackhub.com.')
        );
      }
    } finally {
      setLoadingPlanId('');
      setPendingPlanId('');
    }
  };

  return (
    <div className="subscribe-page subscribe-page--premium">
      <SEOHead
        title="Subscribe"
        description="Subscribe to LearnStackHub for full access to Java full-stack tutorials, MCQs, and Practice Lab."
      />

      <section className="subscribe-hero subscribe-hero--premium">
        <div className="subscribe-hero-glow subscribe-hero-glow--1" aria-hidden />
        <div className="subscribe-hero-glow subscribe-hero-glow--2" aria-hidden />
        <div className="subscribe-hero-grid" aria-hidden />

        <div className="subscribe-hero-inner">
          <div className="subscribe-hero-badge">
            <Zap size={14} aria-hidden />
            Premium access
          </div>
          <div className="subscribe-hero-brand">
            <img src={logoImage} alt="" className="subscribe-hero-logo" />
            <div>
              <p className="subscribe-hero-eyebrow">
                <GraduationCap size={15} aria-hidden />
                {BRAND.tagline}
              </p>
              <h1>
                One subscription.
                <span className="subscribe-hero-accent"> Everything unlocked.</span>
              </h1>
              <p className="subscribe-hero-lead">
                Structured Java full-stack courses, MCQs, and Practice Lab — built for students and working
                developers who want to learn faster.
              </p>
            </div>
          </div>

          <ul className="subscribe-hero-stats">
            {INCLUDED.map(({ icon: Icon, title }) => (
              <li key={title}>
                <Icon size={16} aria-hidden />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {!user && (
        <div className="subscribe-signin-banner" role="status">
          <Lock size={18} aria-hidden />
          <span>Sign in to subscribe — your plan is linked to your account.</span>
          <button type="button" className="subscribe-signin-btn" onClick={openLoginModal}>
            Sign in
          </button>
        </div>
      )}

      {import.meta.env.DEV && !checkoutReady && (
        <div className="subscribe-alert subscribe-alert--warn" role="status">
          Payments are not configured yet (dev only). Set Razorpay or Cashfree keys in .env and choose a gateway in
          Admin → Payment gateway.
        </div>
      )}

      {error && (
        <div className="subscribe-alert subscribe-alert--error" role="alert">
          {error}
        </div>
      )}

      <section className="subscribe-pricing">
        <div className="subscribe-pricing-head">
          <h2>Choose your plan</h2>
          <p>
            Access starts immediately after payment. Every plan includes monthly certification exams — pass to earn
            your LearnStackHub internship certificate.
          </p>
          {!cashfreeCheckout && (
            <div className="subscribe-currency-toggle" role="group" aria-label="Payment currency">
              {PAYMENT_CURRENCIES.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`subscribe-currency-btn${paymentCurrency === code ? ' subscribe-currency-btn--active' : ''}`}
                  aria-pressed={paymentCurrency === code}
                  onClick={() => setPaymentCurrency(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {cashfreeCheckout && (
            <p className="subscribe-currency-note" role="status">
              Payments via Cashfree are in <strong>INR (₹)</strong> only.
            </p>
          )}
          {cashfreeCheckout && (
            <div className="subscribe-billing-phone">
              <label htmlFor="subscribe-billing-phone">Mobile number for payment</label>
              <input
                id="subscribe-billing-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={billingPhone}
                maxLength={14}
                disabled={!user}
                onChange={(event) => setBillingPhone(event.target.value)}
              />
              <p className="subscribe-billing-phone-hint">
                {user
                  ? 'Required before Cashfree checkout (UPI, cards, and receipts). You can also enter it when you click Subscribe.'
                  : 'Sign in first — we will ask for your mobile number before opening secure checkout.'}
              </p>
            </div>
          )}
        </div>

        <div className="subscribe-pricing-grid">
          {displayPlans.map((plan) => {
            const isFeatured = Boolean(plan.highlight);
            const chargeAmount = planChargeAmount(plan, paymentCurrency);
            const regularAmount = planRegularChargeAmount(plan, paymentCurrency);
            const perMonth = perMonthPrice(plan, paymentCurrency);
            const isLoading = loadingPlanId === plan.id;
            const planFeatures = plan.features || PLATFORM_FEATURES;
            const showOffer = plan.earlyBird && regularAmount && regularAmount > chargeAmount;
            const discountPercent = showOffer
              ? Math.round((1 - chargeAmount / regularAmount) * 100)
              : null;

            return (
              <article
                key={plan.id}
                className={`subscribe-price-card${isFeatured ? ' subscribe-price-card--featured' : ''}${showOffer ? ' subscribe-price-card--offer' : ''}`}
              >
                {showOffer && (
                  <span className="subscribe-price-ribbon subscribe-price-ribbon--offer">
                    {discountPercent}% off
                  </span>
                )}
                {!showOffer && plan.ribbon && (
                  <span className="subscribe-price-ribbon subscribe-price-ribbon--training">{plan.ribbon}</span>
                )}
                {showOffer && plan.ribbon && isFeatured && (
                  <span className="subscribe-price-ribbon-sub">{plan.ribbon}</span>
                )}

                <div className="subscribe-price-card-top">
                  <h3>{plan.name}</h3>
                  <p className="subscribe-price-duration">{formatPlanDuration(plan)} full access</p>
                </div>

                <div className="subscribe-price-offer-box">
                  {showOffer ? (
                    <>
                      <span className="subscribe-price-mrp">{formatMoney(regularAmount, paymentCurrency)}</span>
                      <span className="subscribe-price-value">{formatMoney(chargeAmount, paymentCurrency)}</span>
                      <span className="subscribe-price-offer-label">Offer price</span>
                    </>
                  ) : (
                    <span className="subscribe-price-value">{formatMoney(chargeAmount, paymentCurrency)}</span>
                  )}
                  {perMonth && (
                    <span className="subscribe-price-equiv">
                      ≈ {formatMoney(perMonth, paymentCurrency)}/month
                    </span>
                  )}
                </div>

                <p className="subscribe-price-desc">{plan.description}</p>

                <ul className="subscribe-price-features">
                  {planFeatures.map((feature) => (
                    <li
                      key={feature}
                      className={
                        plan.id === 'twelve_months' && !PLATFORM_FEATURES.includes(feature)
                          ? 'subscribe-price-feature--premium'
                          : undefined
                      }
                    >
                      <Check size={16} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`subscribe-price-cta${isFeatured ? ' subscribe-price-cta--featured' : ''}`}
                  disabled={!checkoutReady || Boolean(loadingPlanId)}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="spin-icon" aria-hidden />
                      Opening secure checkout…
                    </>
                  ) : (
                    <>
                      Subscribe now
                      <ArrowRight size={18} aria-hidden />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="subscribe-includes">
        <h2>What&apos;s included in every plan</h2>
        <div className="subscribe-includes-grid">
          {INCLUDED.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="subscribe-include-card">
              <div className="subscribe-include-icon">
                <Icon size={20} aria-hidden />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="subscribe-training subscribe-training--premium">
        <div className="subscribe-training-head">
          <span className="subscribe-training-badge">All subscribers</span>
          <h2>Monthly exam &amp; internship certificate</h2>
          <p>{EXAM_CERTIFICATE_NOTE}</p>
        </div>
        <div className="subscribe-includes-grid subscribe-includes-grid--single">
          <div className="subscribe-include-card subscribe-include-card--training">
            <div className="subscribe-include-icon subscribe-include-icon--training">
              <ClipboardCheck size={20} aria-hidden />
            </div>
            <div>
              <strong>Monthly assessment exam</strong>
              <p>Test your Java full-stack knowledge every month while your subscription is active.</p>
            </div>
          </div>
          <div className="subscribe-include-card subscribe-include-card--training">
            <div className="subscribe-include-icon subscribe-include-icon--training">
              <Award size={20} aria-hidden />
            </div>
            <div>
              <strong>LearnStackHub internship certificate</strong>
              <p>Pass the monthly exam to receive your official internship certificate from {BRAND.name}.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="subscribe-training subscribe-training--premium">
        <div className="subscribe-training-head">
          <span className="subscribe-training-badge">12-month plan only</span>
          <h2>{LIVE_TRAINING_DAYS} days online live training</h2>
          <p>
            Upgrade to the 12-month plan for guided sessions, mentor connect, doubt clearing, and deep technology
            explanations. After payment, open <strong>My Account</strong> to reach mentors via WhatsApp, email, or
            phone.
          </p>
        </div>
        <div className="subscribe-includes-grid">
          {TRAINING_HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="subscribe-include-card subscribe-include-card--training">
              <div className="subscribe-include-icon subscribe-include-icon--training">
                <Icon size={20} aria-hidden />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="subscribe-trust subscribe-trust--premium">
        <div className="subscribe-trust-item">
          <CreditCard size={20} aria-hidden />
          <div>
            <strong>Secure checkout</strong>
            <p>
              {paymentCurrency === 'USD'
                ? `International cards (USD) — encrypted payment processing with ${BRAND.name} branding.`
                : `UPI, cards, and net banking (INR) — encrypted payment processing with ${BRAND.name} branding.`}
            </p>
          </div>
        </div>
        <div className="subscribe-trust-item">
          <Lock size={20} aria-hidden />
          <div>
            <strong>Linked to your account</strong>
            <p>Invoice and subscription status appear in My Account after payment.</p>
          </div>
        </div>
        <p className="subscribe-trust-legal">
          By subscribing you agree to our{' '}
          <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>. All sales are final — no
          refunds.
        </p>
      </footer>

      {phoneModalOpen && (
        <div
          className="modal-overlay subscribe-phone-modal-overlay"
          role="presentation"
          onClick={() => setPhoneModalOpen(false)}
        >
          <div
            className="modal-content subscribe-phone-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-phone-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="subscribe-phone-modal-title">Mobile number for payment</h2>
            <p>
              Cashfree needs your number before opening checkout (similar to contact details on other gateways). Enter
              a valid 10-digit Indian mobile number.
            </p>
            <label htmlFor="subscribe-phone-modal-input" className="sr-only">
              Mobile number
            </label>
            <input
              id="subscribe-phone-modal-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              className="subscribe-phone-modal-input"
              placeholder="e.g. 9876543210"
              value={phoneModalDraft}
              maxLength={14}
              autoFocus
              onChange={(event) => setPhoneModalDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handlePhoneModalContinue();
                }
              }}
            />
            <div className="subscribe-phone-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setPhoneModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isValidIndianPhone(phoneModalDraft) || Boolean(loadingPlanId)}
                onClick={handlePhoneModalContinue}
              >
                {loadingPlanId ? 'Opening checkout…' : 'Continue to payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscribe;
