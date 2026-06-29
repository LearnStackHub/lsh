import { useCallback, useEffect, useRef, useState } from 'react';
import { SECURITY_WARNINGS_LIMIT } from './config';

export function useExamSecurity({ active, onAutoSubmit, containerRef }) {
  const [securityWarnings, setSecurityWarnings] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const [showSecurityWarning, setShowSecurityWarning] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const warningTimeoutRef = useRef(null);

  const showSecurityAlert = useCallback((message) => {
    setWarningMessage(message);
    setShowSecurityWarning((n) => n + 1);
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    warningTimeoutRef.current = setTimeout(() => {
      setWarningMessage('');
    }, 3000);
  }, []);

  const requestFullscreen = useCallback(async () => {
    const element = containerRef?.current || document.documentElement;
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked — exam can still proceed
    }
  }, [containerRef]);

  const exitFullscreen = useCallback(() => {
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } catch {
      // ignore
    }
  }, []);

  const registerViolation = useCallback(
    (message, reason) => {
      setTabSwitchCount((c) => c + 1);
      setSecurityWarnings((prev) => {
        const next = prev + 1;
        if (next >= SECURITY_WARNINGS_LIMIT) {
          onAutoSubmit?.(reason);
        } else {
          showSecurityAlert(message);
        }
        return next;
      });
    },
    [onAutoSubmit, showSecurityAlert]
  );

  useEffect(() => {
    if (!active) return undefined;

    const onVisibility = () => {
      if (document.hidden) {
        registerViolation('Tab switch detected. Stay on this page during the exam.', 'Tab switching limit reached.');
      }
    };

    const onBlur = () => {
      if (!document.hasFocus()) {
        registerViolation('Window focus lost. Return to the exam window.', 'Focus lost too many times.');
      }
    };

    const block = (e) => e.preventDefault();

    const onKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && ['u', 'U', 'c', 'C', 'v', 'V', 'p', 'P', 's', 'S'].includes(e.key))
      ) {
        e.preventDefault();
        showSecurityAlert('This action is disabled during the exam.');
      }
    };

    const onFullscreenChange = () => {
      const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isFs) {
        showSecurityAlert('Please stay in fullscreen mode during the exam.');
        setTimeout(() => requestFullscreen(), 800);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('paste', block);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('paste', block);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [active, registerViolation, requestFullscreen, showSecurityAlert]);

  return {
    securityWarnings,
    tabSwitchCount,
    warningMessage,
    showSecurityWarning,
    requestFullscreen,
    exitFullscreen,
    showSecurityAlert,
  };
}
