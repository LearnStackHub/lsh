import { useCallback, useEffect, useRef, useState } from 'react';
import {
  WEBCAM_CHECK_INTERVAL_MS,
  WEBCAM_MOBILE_STRIKES,
  WEBCAM_NO_FACE_STRIKES,
  MOBILE_DETECTION_MIN_SCORE,
  MAX_PROCTORING_ERROR_LOG,
} from './config';
import { requestCameraStream, stopCameraStream } from './camera';
import {
  detectMobilePhone,
  disposeExamObjectDetector,
  loadExamObjectDetector,
} from './examObjectDetector';

function createEmptyMetrics() {
  return {
    checks: 0,
    faceVisibleChecks: 0,
    noFaceStreak: 0,
    noFaceEvents: 0,
    multipleFaceEvents: 0,
    mobileDetectedEvents: 0,
    cameraOffEvents: 0,
    darkFrameEvents: 0,
    faceErrors: [],
    mobileErrors: [],
  };
}

function getAnalysisCanvas(ref) {
  if (!ref.current) {
    ref.current = document.createElement('canvas');
  }
  return ref.current;
}

function frameLuminance(canvas, video) {
  const width = 160;
  const height = 120;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx || !video.videoWidth) return 0;

  ctx.drawImage(video, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  }
  return total / (data.length / 4);
}

async function detectFaces(detector, canvas, video) {
  if (!detector || !video.videoWidth) return null;

  const width = Math.min(320, video.videoWidth);
  const height = Math.round((video.videoHeight / video.videoWidth) * width);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(video, 0, 0, width, height);
  try {
    return await detector.detect(canvas);
  } catch {
    return null;
  }
}

function attachStreamToVideo(video, stream) {
  if (!video || !stream) return;
  if (video.srcObject !== stream) {
    video.srcObject = stream;
  }
  if (video.paused) {
    video.play().catch(() => {});
  }
}

export function useExamWebcam({ active, onViolation }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const luminanceCanvasRef = useRef(null);
  const faceCanvasRef = useRef(null);
  const faceDetectorRef = useRef(null);
  const objectDetectorRef = useRef(null);
  const metricsRef = useRef(createEmptyMetrics());
  const noFaceStreakRef = useRef(0);
  const mobileStreakRef = useRef(0);
  const analyzingRef = useRef(false);
  const onViolationRef = useRef(onViolation);
  const statusRef = useRef('idle');

  const [status, setStatus] = useState('idle');
  const [statusDetail, setStatusDetail] = useState('');

  onViolationRef.current = onViolation;

  const updateStatus = (nextStatus, nextDetail) => {
    if (statusRef.current !== nextStatus) {
      statusRef.current = nextStatus;
      setStatus(nextStatus);
    }
    setStatusDetail((prev) => (prev === nextDetail ? prev : nextDetail));
  };

  const bindVideoRef = useCallback((node) => {
    videoRef.current = node;
    attachStreamToVideo(node, streamRef.current);
  }, []);

  const stopCamera = useCallback(() => {
    stopCameraStream(streamRef.current);
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    statusRef.current = 'idle';
    setStatus('idle');
    setStatusDetail('');
  }, []);

  const getMetrics = useCallback(() => {
    const metrics = metricsRef.current;
    return {
      checks: metrics.checks,
      faceVisibleChecks: metrics.faceVisibleChecks,
      noFaceStreak: metrics.noFaceStreak,
      noFaceEvents: metrics.noFaceEvents,
      multipleFaceEvents: metrics.multipleFaceEvents,
      mobileDetectedEvents: metrics.mobileDetectedEvents,
      cameraOffEvents: metrics.cameraOffEvents,
      darkFrameEvents: metrics.darkFrameEvents,
      faceErrors: [...metrics.faceErrors],
      mobileErrors: [...metrics.mobileErrors],
    };
  }, []);

  useEffect(() => {
    if (!active) {
      stopCamera();
      faceDetectorRef.current = null;
      objectDetectorRef.current = null;
      disposeExamObjectDetector();
      return undefined;
    }

    metricsRef.current = createEmptyMetrics();
    noFaceStreakRef.current = 0;
    mobileStreakRef.current = 0;

    let cancelled = false;
    let intervalId = null;
    let attachTimerId = null;

    const logFaceError = (type, message, meta = {}) => {
      const list = metricsRef.current.faceErrors;
      if (list.length >= MAX_PROCTORING_ERROR_LOG) return;
      list.push({
        type,
        message,
        at: new Date().toISOString(),
        ...meta,
      });
    };

    const logMobileError = (message, meta = {}) => {
      const list = metricsRef.current.mobileErrors;
      if (list.length >= MAX_PROCTORING_ERROR_LOG) return;
      list.push({
        type: 'mobile_detected',
        message,
        at: new Date().toISOString(),
        ...meta,
      });
    };

    const reportViolation = (message, reason, metricKey) => {
      if (metricKey && metricsRef.current[metricKey] !== undefined) {
        metricsRef.current[metricKey] += 1;
      }
      onViolationRef.current?.(message, reason);
    };

    const checkMobilePhone = async (video) => {
      const model = objectDetectorRef.current;
      if (!model) return false;

      const phone = await detectMobilePhone(model, video, MOBILE_DETECTION_MIN_SCORE);
      if (!phone) {
        mobileStreakRef.current = 0;
        return false;
      }

      mobileStreakRef.current += 1;
      updateStatus('mobile_detected', 'Mobile phone detected — remove it');

      logMobileError('Mobile phone detected in camera view.', {
        confidence: phone.score ? Math.round(phone.score * 100) / 100 : undefined,
        strike: mobileStreakRef.current,
      });

      if (mobileStreakRef.current >= WEBCAM_MOBILE_STRIKES) {
        mobileStreakRef.current = 0;
        metricsRef.current.mobileDetectedEvents += 1;
        logMobileError('Mobile phone detected. Keep phones away during the exam.', {
          confidence: phone.score ? Math.round(phone.score * 100) / 100 : undefined,
          warningIssued: true,
        });
        reportViolation(
          'Mobile phone detected. Keep phones away during the exam.',
          'Webcam monitoring violation.',
          null
        );
      }

      return true;
    };

    const analyzeFrame = async () => {
      if (analyzingRef.current || cancelled) return;

      const video = videoRef.current;
      const stream = streamRef.current;
      if (!video || !stream) return;

      attachStreamToVideo(video, stream);

      if (video.readyState < 2 || !video.videoWidth) return;

      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack || videoTrack.readyState === 'ended' || !videoTrack.enabled) {
        updateStatus('camera_off', 'Camera turned off');
        noFaceStreakRef.current = 0;
        mobileStreakRef.current = 0;
        metricsRef.current.checks += 1;
        logFaceError('camera_off', 'Camera was turned off during the exam. Keep your camera on.', {
          warningIssued: true,
        });
        reportViolation(
          'Camera was turned off during the exam. Keep your camera on.',
          'Camera monitoring violation.',
          'cameraOffEvents'
        );
        return;
      }

      analyzingRef.current = true;
      const luminanceCanvas = getAnalysisCanvas(luminanceCanvasRef);
      const faceCanvas = getAnalysisCanvas(faceCanvasRef);

      try {
        metricsRef.current.checks += 1;

        if (await checkMobilePhone(video)) {
          return;
        }

        let faceCount = null;
        const faces = await detectFaces(faceDetectorRef.current, faceCanvas, video);
        if (Array.isArray(faces)) {
          faceCount = faces.length;
        }

        if (faceCount === null) {
          const luminance = frameLuminance(luminanceCanvas, video);
          if (luminance < 18) {
            faceCount = 0;
            metricsRef.current.darkFrameEvents += 1;
          } else if (luminance > 35) {
            faceCount = 1;
          } else {
            faceCount = 0;
          }
        }

        if (faceCount >= 2) {
          noFaceStreakRef.current = 0;
          metricsRef.current.multipleFaceEvents += 1;
          updateStatus('multiple_faces', 'Multiple faces detected');
          logFaceError('multiple_faces', 'Multiple faces detected. Only the candidate should be visible.', {
            faceCount,
            warningIssued: true,
          });
          reportViolation(
            'Multiple faces detected. Only the candidate should be visible.',
            'Webcam monitoring violation.',
            null
          );
          return;
        }

        if (faceCount === 1) {
          noFaceStreakRef.current = 0;
          metricsRef.current.faceVisibleChecks += 1;
          updateStatus('ok', 'Face visible · phone check active');
          return;
        }

        noFaceStreakRef.current += 1;
        metricsRef.current.noFaceStreak = noFaceStreakRef.current;
        updateStatus('no_face', 'Face not visible — stay in frame');

        logFaceError('no_face_detected', 'Face not visible in camera frame.', {
          strike: noFaceStreakRef.current,
        });

        if (noFaceStreakRef.current >= WEBCAM_NO_FACE_STRIKES) {
          noFaceStreakRef.current = 0;
          metricsRef.current.noFaceEvents += 1;
          logFaceError('no_face', 'Your face is not visible. Look at the camera and stay in frame.', {
            warningIssued: true,
          });
          reportViolation(
            'Your face is not visible. Look at the camera and stay in frame.',
            'Webcam monitoring violation.',
            null
          );
        }
      } finally {
        analyzingRef.current = false;
      }
    };

    const start = async () => {
      updateStatus('starting', 'Starting camera & proctoring…');

      try {
        if (typeof globalThis.FaceDetector !== 'undefined') {
          try {
            faceDetectorRef.current = new globalThis.FaceDetector({
              fastMode: true,
              maxDetectedFaces: 3,
            });
          } catch {
            faceDetectorRef.current = null;
          }
        }

        loadExamObjectDetector()
          .then((model) => {
            if (!cancelled) {
              objectDetectorRef.current = model;
            }
          })
          .catch(() => {
            objectDetectorRef.current = null;
          });

        const stream = await requestCameraStream();
        if (cancelled) {
          stopCameraStream(stream);
          return;
        }

        streamRef.current = stream;
        attachStreamToVideo(videoRef.current, stream);

        attachTimerId = window.setInterval(() => {
          attachStreamToVideo(videoRef.current, streamRef.current);
        }, 400);

        stream.getVideoTracks()[0]?.addEventListener('ended', () => {
          updateStatus('camera_off', 'Camera disconnected');
          logFaceError('camera_off', 'Camera disconnected during the exam.', { warningIssued: true });
          reportViolation(
            'Camera disconnected during the exam.',
            'Camera monitoring violation.',
            'cameraOffEvents'
          );
        });

        updateStatus('ok', 'Live monitoring active');
        intervalId = window.setInterval(analyzeFrame, WEBCAM_CHECK_INTERVAL_MS);
        window.setTimeout(analyzeFrame, 3500);
      } catch {
        if (!cancelled) {
          updateStatus('error', 'Camera access required for exam');
          logFaceError('camera_error', 'Camera access is required during the exam. Allow camera permission.', {
            warningIssued: true,
          });
          reportViolation(
            'Camera access is required during the exam. Allow camera permission.',
            'Camera not available.',
            'cameraOffEvents'
          );
        }
      }
    };

    start();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (attachTimerId) clearInterval(attachTimerId);
      stopCamera();
      faceDetectorRef.current = null;
      objectDetectorRef.current = null;
      disposeExamObjectDetector();
    };
  }, [active, stopCamera]);

  return {
    videoRef: bindVideoRef,
    status,
    statusDetail,
    getMetrics,
    stopCamera,
  };
};
