import { useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function SubmitConfirmModal({
  open,
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
  submitting,
}) {
  const confirmRef = useRef(null);
  const unansweredCount = totalQuestions - answeredCount;
  const allAnswered = unansweredCount === 0;

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !submitting) {
        onCancel();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => confirmRef.current?.focus(), 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      clearTimeout(timer);
    };
  }, [open, onCancel, submitting]);

  if (!open) return null;

  return (
    <div className="rex-modal-overlay" onClick={submitting ? undefined : onCancel}>
      <div
        className="rex-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rex-submit-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="rex-modal-close"
          onClick={onCancel}
          disabled={submitting}
          aria-label="Close"
        >
          <X size={18} aria-hidden />
        </button>

        <div className={`rex-modal-icon${allAnswered ? ' rex-modal-icon--ok' : ' rex-modal-icon--warn'}`}>
          {allAnswered ? <CheckCircle2 size={28} aria-hidden /> : <AlertCircle size={28} aria-hidden />}
        </div>

        <h2 id="rex-submit-modal-title" className="rex-modal-title">
          Submit Assessment L1?
        </h2>

        <p className="rex-modal-lead">
          {allAnswered
            ? 'You have answered every question. Once submitted, your responses are final.'
            : `You still have ${unansweredCount} unanswered question${unansweredCount === 1 ? '' : 's'}. Unanswered items will be marked incorrect.`}
        </p>

        <div className="rex-modal-stats">
          <div className="rex-modal-stat">
            <span className="rex-modal-stat-value">{answeredCount}</span>
            <span className="rex-modal-stat-label">Answered</span>
          </div>
          <div className="rex-modal-stat rex-modal-stat--muted">
            <span className="rex-modal-stat-value">{unansweredCount}</span>
            <span className="rex-modal-stat-label">Unanswered</span>
          </div>
          <div className="rex-modal-stat">
            <span className="rex-modal-stat-value">{totalQuestions}</span>
            <span className="rex-modal-stat-label">Total</span>
          </div>
        </div>

        <p className="rex-modal-note">This action cannot be undone. Please review before confirming.</p>

        <div className="rex-modal-actions">
          <button
            type="button"
            className="rex-btn rex-btn--ghost"
            onClick={onCancel}
            disabled={submitting}
          >
            Continue exam
          </button>
          <button
            ref={confirmRef}
            type="button"
            className="rex-btn rex-btn--submit"
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Yes, submit now'}
          </button>
        </div>
      </div>
    </div>
  );
}
