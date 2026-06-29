import { useCallback, useEffect, useRef, useState } from 'react';
import { Briefcase, Shield } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { BRAND } from '../../config/brand';
import { EXAM_TIME_LIMIT } from '../../recruitment/config';
import { getRecruitmentExamQuestions } from '../../recruitment/questions';
import { useExamSecurity } from '../../recruitment/useExamSecurity';
import RegistrationForm from '../../recruitment/components/RegistrationForm';
import ExamRunner from '../../recruitment/components/ExamRunner';
import CompletionScreen from '../../recruitment/components/CompletionScreen';
import { submitRecruitmentExam } from '../../services/recruitmentExamService';
import './RecruitmentExam.css';

export default function RecruitmentExam() {
  const [stage, setStage] = useState('register');
  const [candidate, setCandidate] = useState(null);
  const [questions] = useState(() => getRecruitmentExamQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_TIME_LIMIT);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [warningText, setWarningText] = useState('');
  const containerRef = useRef(null);
  const examStartRef = useRef(null);
  const submittedRef = useRef(false);

  const finalizeExam = useCallback(
    async (reason = '') => {
      if (submittedRef.current || !candidate) return;
      submittedRef.current = true;
      setStage('complete');
      setSubmitting(true);
      setSubmitError('');

      const timeTakenSeconds = examStartRef.current
        ? Math.round((Date.now() - examStartRef.current) / 1000)
        : 0;

      try {
        await submitRecruitmentExam({
          ...candidate,
          answers: selectedAnswers,
          questions: questions.map((q) => ({ id: q.id, correctAnswer: q.correctAnswer })),
          security: {
            tabSwitchCount: securityRef.current.tabSwitchCount,
            securityWarnings: securityRef.current.securityWarnings,
            autoSubmitted: Boolean(reason),
            reason,
          },
          timeTakenSeconds,
        });
        setSubmitting(false);
      } catch (error) {
        submittedRef.current = false;
        setSubmitting(false);
        setSubmitError(error.message || 'Submission failed');
      }
    },
    [candidate, questions, selectedAnswers]
  );

  const securityRef = useRef({ tabSwitchCount: 0, securityWarnings: 0 });

  const handleAutoSubmit = useCallback(
    (reason) => {
      finalizeExam(reason);
    },
    [finalizeExam]
  );

  const security = useExamSecurity({
    active: stage === 'exam',
    onAutoSubmit: handleAutoSubmit,
    containerRef,
  });

  useEffect(() => {
    securityRef.current = {
      tabSwitchCount: security.tabSwitchCount,
      securityWarnings: security.securityWarnings,
    };
  }, [security.tabSwitchCount, security.securityWarnings]);

  useEffect(() => {
    if (security.warningMessage) {
      setWarningText(security.warningMessage);
    }
  }, [security.warningMessage, security.showSecurityWarning]);

  useEffect(() => {
    if (stage !== 'exam' || submitting) return undefined;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit('Time limit reached');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, submitting, handleAutoSubmit]);

  const handleRegistrationSubmit = async (data) => {
    setSubmitting(true);
    setCandidate(data);
    await security.requestFullscreen();
    examStartRef.current = Date.now();
    setTimeRemaining(EXAM_TIME_LIMIT);
    setStage('exam');
    setSubmitting(false);
  };

  const handleManualSubmit = () => {
    const unanswered = questions.some((_, index) => selectedAnswers[index] === undefined);
    if (unanswered) {
      setWarningText('Please answer all questions before submitting.');
      return;
    }
    security.exitFullscreen();
    finalizeExam('');
  };

  return (
    <div className="recruitment-page" ref={containerRef}>
      <SEOHead
        title="Recruitment Exam"
        description={`${BRAND.name} recruitment assessment for partner companies.`}
        noIndex
      />

      <header className="recruitment-hero">
        <div className="recruitment-hero-badge">
          <Briefcase size={16} aria-hidden />
          Recruitment assessment
        </div>
        <h1>{BRAND.name} Recruitment Exam</h1>
        <p>
          Complete your registration, verify your identity with PAN, and take the online MCQ assessment. This exam is
          separate from paid subscriptions and is used for company recruitment drives.
        </p>
        <ul className="recruitment-hero-rules">
          <li>
            <Shield size={15} aria-hidden />
            Secure browser mode — no tab switching or copy/paste
          </li>
          <li>20 minutes · 15 questions</li>
          <li>Results are reviewed by our team — we will contact you</li>
        </ul>
      </header>

      {stage === 'register' && (
        <RegistrationForm onSubmit={handleRegistrationSubmit} submitting={submitting} />
      )}

      {stage === 'exam' && (
        <ExamRunner
          questions={questions}
          currentIndex={currentIndex}
          selectedAnswers={selectedAnswers}
          timeRemaining={timeRemaining}
          securityWarning={warningText}
          securityWarnings={security.securityWarnings}
          onSelectAnswer={(index, value) =>
            setSelectedAnswers((prev) => ({ ...prev, [index]: value }))
          }
          onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          onSubmit={handleManualSubmit}
          submitting={submitting}
        />
      )}

      {stage === 'complete' && (
        <CompletionScreen submitting={submitting} error={submitError} />
      )}
    </div>
  );
}
