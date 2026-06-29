import { ArrowLeft, ArrowRight, Clock, Shield, AlertTriangle } from 'lucide-react';
import { EXAM_TIME_LIMIT } from '../config';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ExamRunner({
  questions,
  currentIndex,
  selectedAnswers,
  timeRemaining,
  securityWarning,
  securityWarnings,
  onSelectAnswer,
  onPrev,
  onNext,
  onSubmit,
  submitting,
}) {
  const question = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="recruitment-exam">
      <div className="recruitment-exam-top">
        <div className="recruitment-exam-meta">
          <span>
            <Clock size={16} aria-hidden />
            {formatTime(timeRemaining)} left
          </span>
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="recruitment-exam-security">
          <Shield size={16} aria-hidden />
          Secure mode · Warnings {securityWarnings}/3
        </div>
      </div>

      {securityWarning && (
        <div className="recruitment-security-banner" role="alert">
          <AlertTriangle size={18} aria-hidden />
          {securityWarning}
        </div>
      )}

      <article className="recruitment-question-card">
        <h2>{question.question}</h2>
        <div className="recruitment-options">
          {question.options.map((option, index) => {
            const selected = selectedAnswers[currentIndex] === index;
            return (
              <button
                key={option}
                type="button"
                className={`recruitment-option${selected ? ' recruitment-option--selected' : ''}`}
                onClick={() => onSelectAnswer(currentIndex, index)}
              >
                <span className="recruitment-option-label">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </article>

      <div className="recruitment-exam-nav">
        <button
          type="button"
          className="recruitment-btn recruitment-btn-ghost"
          onClick={onPrev}
          disabled={currentIndex === 0 || submitting}
        >
          <ArrowLeft size={18} aria-hidden />
          Previous
        </button>
        {!isLast ? (
          <button type="button" className="recruitment-btn recruitment-btn-primary" onClick={onNext}>
            Next
            <ArrowRight size={18} aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            className="recruitment-btn recruitment-btn-primary"
            onClick={onSubmit}
            disabled={submitting || answeredCount < questions.length}
          >
            Submit exam
          </button>
        )}
      </div>

      <p className="recruitment-exam-note">
        Do not switch tabs or leave fullscreen. After {formatTime(EXAM_TIME_LIMIT)}, the exam auto-submits.
      </p>
    </div>
  );
}
