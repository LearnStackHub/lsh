import { useCallback, useEffect, useRef, useState } from 'react';
import { Briefcase, Shield } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { BRAND } from '../../config/brand';
import { EXAM_TIME_LIMIT, TOTAL_QUESTIONS } from '../../recruitment/config';
import { getRecruitmentExamQuestions } from '../../recruitment/questions';
import { useExamSecurity } from '../../recruitment/useExamSecurity';
import { useExamWebcam } from '../../recruitment/useExamWebcam';
import RegistrationForm from '../../recruitment/components/RegistrationForm';
import ExamRunner from '../../recruitment/components/ExamRunner';
import CompletionScreen from '../../recruitment/components/CompletionScreen';
import SubmitConfirmModal from '../../recruitment/components/SubmitConfirmModal';
import RecruitmentLogo from '../../recruitment/components/RecruitmentLogo';
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
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const containerRef = useRef(null);
  const examStartRef = useRef(null);
  const submittedRef = useRef(false);
  const webcamRef = useRef({ stopCamera: () => {}, getMetrics: () => ({}) });

  const securityRef = useRef({ tabSwitchCount: 0, securityWarnings: 0 });
  const reportViolationRef = useRef(null);

  const finalizeExam = useCallback(
    async (reason = '') => {
      if (submittedRef.current || !candidate) return;

      const webcamMetrics = webcamRef.current.getMetrics();
      webcamRef.current.stopCamera();

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
            webcam: webcamMetrics,
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
    reportViolationRef.current = security.reportViolation;
  }, [security.reportViolation]);

  const webcam = useExamWebcam({
    active: stage === 'exam',
    onViolation: (message, reason) => reportViolationRef.current?.(message, reason),
  });

  useEffect(() => {
    webcamRef.current = webcam;
  }, [webcam]);

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
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    security.exitFullscreen();
    finalizeExam('');
  };

  useEffect(() => {
    if (stage === 'exam') {
      document.body.classList.add('rex-body-lock');
      return () => document.body.classList.remove('rex-body-lock');
    }
    return undefined;
  }, [stage]);

  return (
    <>
      <SEOHead
        title="Assessment L1"
        description={`${BRAND.name} Assessment L1 for partner companies.`}
        noIndex
      />

      {stage === 'exam' ? (
        <>
          <ExamRunner
            ref={containerRef}
            questions={questions}
            currentIndex={currentIndex}
            selectedAnswers={selectedAnswers}
            timeRemaining={timeRemaining}
            securityWarning={warningText}
            securityWarnings={security.securityWarnings}
            candidateName={candidate?.name}
            onSelectAnswer={(index, value) =>
              setSelectedAnswers((prev) => {
                if (prev[index] !== undefined) return prev;
                return { ...prev, [index]: value };
              })
            }
            onGoToQuestion={setCurrentIndex}
            onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            onSubmit={handleManualSubmit}
            submitting={submitting}
            webcamVideoRef={webcam.videoRef}
            webcamStatus={webcam.status}
            webcamStatusDetail={webcam.statusDetail}
          />
          <SubmitConfirmModal
            open={showSubmitConfirm}
            answeredCount={Object.keys(selectedAnswers).length}
            totalQuestions={questions.length}
            onConfirm={handleConfirmSubmit}
            onCancel={() => setShowSubmitConfirm(false)}
            submitting={submitting}
          />
        </>
      ) : (
        <div className="recruitment-shell" ref={containerRef}>
          <div className="recruitment-register">
            <header className="recruitment-hero">
              <div className="recruitment-hero-head">
                <RecruitmentLogo size="lg" />
                <div className="recruitment-hero-copy">
                  <div className="recruitment-hero-badge">
                    <Briefcase size={16} aria-hidden />
                    Assessment L1
                  </div>
                  <h1>Assessment L1</h1>
                </div>
              </div>
              <p>
                Register your details, verify identity with PAN, and complete the online MCQ assessment for company
                recruitment drives.
              </p>
              <ul className="recruitment-hero-rules">
                <li>
                  <Shield size={15} aria-hidden />
                  Secure mode — no tab switching
                </li>
                <li>{Math.round(EXAM_TIME_LIMIT / 60)} min · {TOTAL_QUESTIONS} questions</li>
                <li>Live webcam · face &amp; mobile monitoring</li>
              </ul>
            </header>

            <div className="recruitment-register-body">
              {stage === 'register' && (
                <RegistrationForm onSubmit={handleRegistrationSubmit} submitting={submitting} />
              )}

              {stage === 'complete' && (
                <CompletionScreen submitting={submitting} error={submitError} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
