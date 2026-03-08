import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, 
  Clock, RotateCcw, Home, Award, TrendingUp,
  Sparkles, Star, Zap, Target, Rocket, AlertTriangle, Shield
} from 'lucide-react';
import { getRandomQuestions } from '../data/corejava/questions';
import SEOHead from '../components/SEOHead';
import { trackEvent } from '../config/analytics';
import './CoreJavaMCQ.css';

// Exam configuration
const EXAM_TIME_LIMIT = 10 * 60; // 10 minutes in seconds
const TOTAL_QUESTIONS = 20;
const SECURITY_WARNINGS_LIMIT = 3; // Auto-submit after 3 warnings

// Confetti component for celebrations
const Confetti = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
            backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444'][Math.floor(Math.random() * 6)],
          }}
        />
      ))}
    </div>
  );
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="floating-particles">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

function CoreJavaMCQ() {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_TIME_LIMIT);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [securityWarnings, setSecurityWarnings] = useState(0);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [windowBlurCount, setWindowBlurCount] = useState(0);
  const navigate = useNavigate();
  const startTimeRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Track exam page view
  useEffect(() => {
    trackEvent('exam_page_view', {
      exam_type: 'core_java_mcq',
      exam_name: 'Core Java MCQ Exam'
    });
  }, []);

  // Initialize exam with random questions
  useEffect(() => {
    if (!examStarted) {
      const randomQuestions = getRandomQuestions();
      setQuestions(randomQuestions);
    }
  }, [examStarted]);

  // Countdown timer (10 minutes)
  useEffect(() => {
    if (examStarted && !showResult && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, showResult, timeRemaining]);

  // Monitor fullscreen changes
  useEffect(() => {
    if (!examStarted || showResult) return;

    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      if (!isFullscreen && examStarted && !showResult) {
        // User exited fullscreen during exam - warn them
        showSecurityAlert('Warning: Fullscreen mode exited! Please return to fullscreen to continue the exam.');
        // Optionally, try to re-enter fullscreen
        setTimeout(() => {
          requestFullscreen();
        }, 1000);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [examStarted, showResult, requestFullscreen]);

  // Web Security: Detect tab switching and window blur
  useEffect(() => {
    if (!examStarted || showResult) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setWindowBlurCount(prev => prev + 1);
        setSecurityWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= SECURITY_WARNINGS_LIMIT) {
            handleAutoSubmit('Multiple tab switches detected. Exam auto-submitted.');
            return newWarnings;
          }
          showSecurityAlert('Warning: Tab switching detected!');
          return newWarnings;
        });
      }
    };

    const handleBlur = () => {
      if (document.hasFocus() === false) {
        setWindowBlurCount(prev => prev + 1);
        setSecurityWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= SECURITY_WARNINGS_LIMIT) {
            handleAutoSubmit('Window focus lost multiple times. Exam auto-submitted.');
            return newWarnings;
          }
          showSecurityAlert('Warning: Window focus lost!');
          return newWarnings;
        });
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      showSecurityAlert('Right-click disabled during exam.');
    };

    const handleCopy = (e) => {
      e.preventDefault();
      showSecurityAlert('Copying is disabled during exam.');
    };

    const handlePaste = (e) => {
      e.preventDefault();
      showSecurityAlert('Pasting is disabled during exam.');
    };

    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (common dev tools shortcuts)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'P')
      ) {
        e.preventDefault();
        showSecurityAlert('This action is disabled during exam.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examStarted, showResult, securityWarnings]);

  const showSecurityAlert = (message) => {
    setShowSecurityWarning(true);
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    warningTimeoutRef.current = setTimeout(() => {
      setShowSecurityWarning(false);
    }, 3000);
  };

  const handleAutoSubmit = (reason = 'Time limit reached') => {
    if (!showResult) {
      const timeTaken = EXAM_TIME_LIMIT - timeRemaining;
      const score = calculateScore();
      
      setShowResult(true);
      setExamStarted(false);
      
      // Exit fullscreen when exam ends
      exitFullscreen();
      
      // Track exam completion (auto-submit) in Google Analytics
      trackEvent('exam_completed', {
        exam_type: 'core_java_mcq',
        exam_name: 'Core Java MCQ Exam',
        completion_type: 'auto_submit',
        reason: reason,
        score: score.percentage,
        correct_answers: score.correct,
        total_questions: score.total,
        time_taken: timeTaken,
        security_warnings: securityWarnings,
        tab_switches: tabSwitchCount
      });
      
      if (reason) {
        alert(`Exam Auto-Submitted: ${reason}`);
      }
    }
  };

  // Request fullscreen
  const requestFullscreen = useCallback(async () => {
    const element = containerRef.current || document.documentElement;
    
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        // Safari
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        await element.msRequestFullscreen();
      } else {
        console.warn('Fullscreen API not supported');
      }
    } catch (error) {
      console.warn('Fullscreen request failed:', error);
      // Don't block exam start if fullscreen fails
    }
  }, []);

  // Exit fullscreen
  const exitFullscreen = useCallback(() => {
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } catch (error) {
      console.warn('Exit fullscreen failed:', error);
    }
  }, []);

  const handleStartExam = async () => {
    // Request fullscreen before starting exam
    await requestFullscreen();
    
    setExamStarted(true);
    setTimeRemaining(EXAM_TIME_LIMIT);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSecurityWarnings(0);
    setTabSwitchCount(0);
    setWindowBlurCount(0);
    startTimeRef.current = Date.now();
    
    // Track exam start in Google Analytics
    trackEvent('exam_start', {
      exam_type: 'core_java_mcq',
      exam_name: 'Core Java MCQ Exam',
      total_questions: TOTAL_QUESTIONS,
      time_limit: EXAM_TIME_LIMIT
    });
  };

  // Calculate score function
  const calculateScore = useCallback(() => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  }, [selectedAnswers]);

  // Celebration on good answers
  useEffect(() => {
    if (questions.length > 0 && selectedAnswers[currentQuestion] !== undefined) {
      const isCorrect = selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setShowCelebration(true);
        setCelebrationMessage(['Great! 🎉', 'Perfect! ⭐', 'Excellent! 🚀', 'Awesome! 💪', 'Brilliant! ✨'][Math.floor(Math.random() * 5)]);
        setTimeout(() => {
          setShowCelebration(false);
        }, 2000);
      }
    }
  }, [selectedAnswers, currentQuestion, questions]);

  // Confetti on result
  useEffect(() => {
    if (showResult) {
      const score = calculateScore();
      if (score.percentage >= 70) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  }, [showResult, calculateScore]);

  const handleAnswerSelect = useCallback((answerIndex) => {
    if (isAnimating || selectedAnswers[currentQuestion] !== undefined) return;
    
    setIsAnimating(true);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));

    // Animation delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  }, [currentQuestion, isAnimating, selectedAnswers]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      if (!window.confirm(`You have answered ${Object.keys(selectedAnswers).length} out of ${questions.length} questions. Are you sure you want to submit?`)) {
        return;
      }
    }
    
    const timeTaken = EXAM_TIME_LIMIT - timeRemaining;
    const score = calculateScore();
    
    setShowResult(true);
    setExamStarted(false);
    
    // Exit fullscreen when exam ends
    exitFullscreen();
    
    // Track exam completion (manual submit) in Google Analytics
    trackEvent('exam_completed', {
      exam_type: 'core_java_mcq',
      exam_name: 'Core Java MCQ Exam',
      completion_type: 'manual_submit',
      score: score.percentage,
      correct_answers: score.correct,
      total_questions: score.total,
      time_taken: timeTaken,
      security_warnings: securityWarnings,
      tab_switches: tabSwitchCount,
      questions_answered: Object.keys(selectedAnswers).length
    });
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResult(false);
    setTimeRemaining(EXAM_TIME_LIMIT);
    setExamStarted(false);
    setSecurityWarnings(0);
    setTabSwitchCount(0);
    setWindowBlurCount(0);
    const randomQuestions = getRandomQuestions();
    setQuestions(randomQuestions);
  };

  const score = useMemo(() => showResult ? calculateScore() : null, [showResult, calculateScore]);
  const answeredCount = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers]);
  const progress = useMemo(() => Math.round((answeredCount / questions.length) * 100), [answeredCount]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const currentQ = useMemo(() => questions[currentQuestion], [currentQuestion, questions]);
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isTimeUp = timeRemaining <= 0;
  const timeWarning = timeRemaining <= 60; // Warning when less than 1 minute

  // Start screen
  if (!examStarted && !showResult) {
    return (
      <div className="mcq-container" ref={containerRef}>
        <FloatingParticles />
        <div className="start-screen">
          <div className="start-card">
            <div className="start-icon">
              <img 
                src="/LSH.png" 
                alt="LearnStackHub Logo" 
                className="icon-large logo-icon"
              />
            </div>
            <h1>Core Java MCQ Exam</h1>
            <div className="exam-info">
              <div className="info-item">
                <Target className="info-icon" />
                <div>
                  <strong>20 Questions</strong>
                  <p>Randomly selected from 150+ questions</p>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <strong>10 Minutes</strong>
                  <p>Time limit for the exam</p>
                </div>
              </div>
              <div className="info-item">
                <Shield className="info-icon" />
                <div>
                  <strong>Secure Exam</strong>
                  <p>Tab switching and window focus monitored</p>
                </div>
              </div>
            </div>
            <div className="exam-rules">
              <h3>Exam Rules</h3>
              <ul>
                <li>You have exactly 10 minutes to complete the exam</li>
                <li>20 questions will be randomly selected from 150+ questions</li>
                <li>Results will be shown only after submission</li>
                <li>Tab switching and window blur will be monitored</li>
                <li>Exam will auto-submit after 3 security warnings</li>
                <li>Right-click, copy, and paste are disabled</li>
                <li>Time will auto-submit when it reaches 0</li>
              </ul>
            </div>
            <button onClick={handleStartExam} className="btn btn-primary btn-start">
              <Rocket className="btn-icon" />
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const timeTaken = EXAM_TIME_LIMIT - timeRemaining;
    return (
      <div className="mcq-container" ref={containerRef}>
        <SEOHead 
          title="Core Java MCQ Exam Results - LearnStackHub"
          description="View your Core Java MCQ exam results with detailed question review, explanations, and performance analysis."
          keywords="core java mcq results, java exam results, java quiz results, java test scores"
        />
        <Confetti show={showConfetti} />
        <FloatingParticles />
        <div className="result-container">
          <div className="result-card">
            <div className={`result-icon ${score.percentage >= 70 ? 'success' : score.percentage >= 50 ? 'warning' : 'error'}`}>
              {score.percentage >= 70 ? (
                <Trophy className="trophy-icon" />
              ) : score.percentage >= 50 ? (
                <Award className="award-icon" />
              ) : (
                <TrendingUp className="trending-icon" />
              )}
            </div>
            
            <h1 className="result-title">
              {score.percentage >= 70 
                ? "Excellent Work! 🎉" 
                : score.percentage >= 50 
                ? "Good Job! 👍" 
                : "Keep Practicing! 💪"}
            </h1>
            
            <div className="score-display">
              <div className="score-circle">
                <div className="score-value">{score.percentage}%</div>
                <div className="score-label">Score</div>
              </div>
              <div className="score-details">
                <div className="score-item correct">
                  <CheckCircle className="score-icon" />
                  <span>{score.correct} Correct</span>
                </div>
                <div className="score-item incorrect">
                  <XCircle className="score-icon" />
                  <span>{score.total - score.correct} Incorrect</span>
                </div>
                <div className="score-item time">
                  <Clock className="score-icon" />
                  <span>Time Taken: {formatTime(timeTaken)}</span>
                </div>
              </div>
            </div>

            <div className="questions-review">
              <h3>Question Review</h3>
              <div className="review-list">
                {questions.map((q, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div key={q.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <div className="review-question">
                        <span className="review-number">Q{index + 1}:</span>
                        {q.question}
                      </div>
                      <div className="review-answers">
                        <div className="review-answer">
                          <span className="review-label">Your Answer:</span>
                          <span className={isCorrect ? 'correct-text' : 'incorrect-text'}>
                            {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="review-answer">
                            <span className="review-label">Correct Answer:</span>
                            <span className="correct-text">{q.options[q.correctAnswer]}</span>
                          </div>
                        )}
                        <div className="review-explanation">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="result-actions">
              <button onClick={handleRestart} className="btn btn-primary">
                <RotateCcw className="btn-icon" />
                Retake Exam
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                <Home className="btn-icon" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!examStarted || questions.length === 0) {
    return null;
  }

  return (
    <div className="mcq-container" ref={containerRef}>
      <SEOHead 
        title="Core Java MCQ Exam - Test Your Java Knowledge | LearnStackHub"
        description="Take our comprehensive Core Java MCQ exam with 20 randomly selected questions from 150+ questions. 10-minute time limit. Test your Java programming knowledge with real-time feedback and detailed explanations."
        keywords="core java mcq, java exam, java quiz, java test, java multiple choice questions, java practice exam, java assessment, learn java, java programming test"
      />
      <FloatingParticles />
      {showSecurityWarning && (
        <div className="security-warning">
          <AlertTriangle className="warning-icon" />
          <div>
            <strong>Security Warning!</strong>
            <p>Tab switching or window blur detected. {SECURITY_WARNINGS_LIMIT - securityWarnings} warning(s) remaining before auto-submit.</p>
          </div>
        </div>
      )}
      {showCelebration && (
        <div className="celebration-toast">
          <Sparkles className="celebration-icon" />
          <span>{celebrationMessage}</span>
        </div>
      )}
      <div className="mcq-header">
        <div className="header-content">
          <div className="header-left">
            <img 
              src="/LSH.png" 
              alt="LearnStackHub Logo" 
              className="header-icon logo-icon"
            />
            <div>
              <h1>Core Java MCQ Exam</h1>
              <p>Test your Java knowledge</p>
            </div>
          </div>
          <div className="header-right">
            <div className={`timer ${timeWarning ? 'timer-warning' : ''} ${isTimeUp ? 'timer-danger' : ''}`}>
              <Clock className="timer-icon" />
              <span>{formatTime(timeRemaining)}</span>
              {timeWarning && !isTimeUp && (
                <span className="timer-alert">⚠️ Less than 1 minute!</span>
              )}
            </div>
            {securityWarnings > 0 && (
              <div className="security-badge">
                <Shield className="security-icon" />
                <span>Warnings: {securityWarnings}/{SECURITY_WARNINGS_LIMIT}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-stats">
          <div className="stat-item">
            <Target className="stat-icon" />
            <span>Progress: <strong>{progress}%</strong></span>
          </div>
          <div className="stat-item">
            <CheckCircle className="stat-icon" />
            <span>Answered: <strong>{answeredCount}/{questions.length}</strong></span>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          >
            <div className="progress-shine" />
          </div>
        </div>
      </div>

      <div className="question-container">
        <div className="question-card">
          <div className="question-header">
            <span className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="question-points">1 point</span>
          </div>

          <h2 className="question-text">{currentQ.question}</h2>

          <div className="options-container">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              let optionClass = 'option';
              
              if (isSelected) {
                optionClass += isCorrect ? ' selected correct-answer' : ' selected wrong-answer';
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => !isTimeUp && handleAnswerSelect(index)}
                  disabled={isAnimating || selectedAnswer !== undefined || isTimeUp}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                  {isSelected && (
                    <>
                      {isCorrect ? (
                        <CheckCircle className="option-check correct-icon" />
                      ) : (
                        <XCircle className="option-check wrong-icon" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
          

          <div className="question-navigation">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isTimeUp}
              className="btn btn-outline"
            >
              <ArrowLeft className="btn-icon" />
              Previous
            </button>

            <div className="question-indicators">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentQuestion ? 'active' : ''} ${
                    selectedAnswers[index] !== undefined ? 'answered' : ''
                  }`}
                  onClick={() => !isTimeUp && setCurrentQuestion(index)}
                  disabled={isTimeUp}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="btn btn-primary btn-submit"
                disabled={isTimeUp}
              >
                <Rocket className="btn-icon" />
                Submit Exam
                <Trophy className="btn-icon" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1 || isTimeUp}
                className="btn btn-primary"
              >
                Next
                <ArrowRight className="btn-icon" />
              </button>
            )}
          </div>
          
          {answeredCount > 0 && answeredCount < questions.length && (
            <div className="motivation-banner">
              <Zap className="motivation-icon" />
              <div>
                <strong>Great Progress! Keep Going! 🚀</strong>
                <p>You've answered {answeredCount} out of {questions.length} questions. You're doing amazing!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoreJavaMCQ;

