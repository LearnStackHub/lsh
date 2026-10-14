import { forwardRef } from 'react';
import { ArrowRight, Clock, Shield, AlertTriangle } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { EXAM_TIME_LIMIT } from '../config';
import RecruitmentLogo from './RecruitmentLogo';
import ExamWebcamMonitor from './ExamWebcamMonitor';
import ExamQuestionBody from './ExamQuestionBody';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function timerClass(seconds) {
  if (seconds <= 60) return 'rex-timer--critical';
  if (seconds <= 300) return 'rex-timer--warning';
  return '';
}

function QuestionNavigator({ questions, currentIndex, selectedAnswers, onGoToQuestion, className = '' }) {
  return (
    <nav className={`rex-nav ${className}`.trim()} aria-label="Question navigator">
      {questions.map((_, index) => {
        const answered = selectedAnswers[index] !== undefined;
        const active = index === currentIndex;
        return (
          <button
            key={index}
            type="button"
            className={[
              'rex-nav-dot',
              active ? 'rex-nav-dot--active' : '',
              answered ? 'rex-nav-dot--done' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onGoToQuestion(index)}
            aria-label={`Question ${index + 1}${answered ? ', answered' : ''}`}
            aria-current={active ? 'step' : undefined}
          >
            {index + 1}
          </button>
        );
      })}
    </nav>
  );
}

const ExamRunner = forwardRef(function ExamRunner(
  {
    questions,
    currentIndex,
    selectedAnswers,
    timeRemaining,
    securityWarning,
    securityWarnings,
    candidateName,
    onSelectAnswer,
    onGoToQuestion,
    onNext,
    onSubmit,
    submitting,
    webcamVideoRef,
    webcamStatus,
    webcamStatusDetail,
  },
  ref
) {
  const question = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isLast = currentIndex === questions.length - 1;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const questionNumber = String(currentIndex + 1).padStart(2, '0');
  const currentAnswered = selectedAnswers[currentIndex] !== undefined;

  return (
    <div className="rex" ref={ref}>
      <header className="rex-topbar">
        <div className="rex-topbar-inner">
          <div className="rex-brand">
            <RecruitmentLogo className="rex-logo" size="sm" />
            <div className="rex-brand-copy">
              <span className="rex-brand-name">{BRAND.name}</span>
              <span className="rex-brand-sub">Assessment L1</span>
            </div>
          </div>

          <div className="rex-topbar-meta">
            {candidateName ? <span className="rex-candidate">{candidateName}</span> : null}
            <span className="rex-secure" title="Secure exam mode">
              <Shield size={15} aria-hidden />
              Proctored
            </span>
            <div className={`rex-timer ${timerClass(timeRemaining)}`}>
              <Clock size={17} aria-hidden />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="rex-progress">
          <div
            className="rex-progress-fill"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-label={`${answeredCount} of ${questions.length} questions answered`}
          />
        </div>
      </header>

      {securityWarning && (
        <div className="rex-alert-wrap">
          <div className="rex-alert" role="alert">
            <AlertTriangle size={18} aria-hidden />
            <span>{securityWarning}</span>
          </div>
        </div>
      )}

      <main className="rex-main">
        <div className="rex-workspace">
          <article className="rex-sheet">
            <div className="rex-sheet-head">
              <div className="rex-qnum" aria-hidden>
                {questionNumber}
              </div>
              <div className="rex-sheet-meta">
                <p className="rex-sheet-label">
                  {question.topic ? (
                    <>
                      Section: <span className="rex-sheet-topic">{question.topic}</span>
                    </>
                  ) : (
                    'Section'
                  )}
                </p>
                <p className="rex-sheet-sub">
                  Question {currentIndex + 1} of {questions.length} · {answeredCount} answered ·{' '}
                  {securityWarnings}/3 warnings
                </p>
              </div>
            </div>

            <ExamQuestionBody text={question.question} />

            <div className="rex-choices" role="radiogroup" aria-label={`Question ${currentIndex + 1}`}>
              {question.options.map((option, index) => {
                const selected = selectedAnswers[currentIndex] === index;
                const locked = currentAnswered;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={locked}
                    className={`rex-choice${selected ? ' rex-choice--on' : ''}${locked ? ' rex-choice--locked' : ''}`}
                    onClick={() => {
                      if (!locked) onSelectAnswer(currentIndex, index);
                    }}
                  >
                    <span className="rex-choice-radio" aria-hidden />
                    <span className="rex-choice-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="rex-choice-text">{option}</span>
                  </button>
                );
              })}
            </div>

            {currentAnswered && (
              <p className="rex-answer-locked-note">Answer saved — cannot be changed.</p>
            )}

            <QuestionNavigator
              className="rex-nav--mobile"
              questions={questions}
              currentIndex={currentIndex}
              selectedAnswers={selectedAnswers}
              onGoToQuestion={onGoToQuestion}
            />
          </article>

          <aside className="rex-sidebar">
            <p className="rex-sidebar-title">Question palette</p>
            <p className="rex-sidebar-sub">
              {answeredCount}/{questions.length} answered
            </p>
            <QuestionNavigator
              className="rex-nav--desktop"
              questions={questions}
              currentIndex={currentIndex}
              selectedAnswers={selectedAnswers}
              onGoToQuestion={onGoToQuestion}
            />
          </aside>
        </div>
      </main>

      <footer className="rex-footer">
        <div className="rex-footer-inner rex-footer-inner--actions">
          <p className="rex-footer-note">
            Esc exits fullscreen · auto-submit at {formatTime(EXAM_TIME_LIMIT)}
          </p>

          <div className="rex-footer-buttons">
            {!isLast && (
              <button
                type="button"
                className="rex-btn rex-btn--primary"
                onClick={onNext}
                disabled={submitting}
              >
                Next
                <ArrowRight size={18} aria-hidden />
              </button>
            )}
            <button
              type="button"
              className="rex-btn rex-btn--submit"
              onClick={onSubmit}
              disabled={submitting}
            >
              Submit assessment
            </button>
          </div>
        </div>
      </footer>

      <ExamWebcamMonitor
        videoRef={webcamVideoRef}
        status={webcamStatus}
        statusDetail={webcamStatusDetail}
      />
    </div>
  );
});

export default ExamRunner;
