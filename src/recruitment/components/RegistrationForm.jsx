import { useEffect, useRef, useState } from 'react';
import { Camera, ClipboardList, Loader2, RotateCcw } from 'lucide-react';
import { EXAM_TIME_LIMIT, TOTAL_QUESTIONS } from '../config';
import { compressDataUrl } from '../compressImage';

const EMPTY_FORM = {
  name: '',
  email: '',
  mobile: '',
  experience: '',
  studiedInGovt: '',
  govtInstitutionName: '',
  hasLshCertificate: '',
  lshCertificateId: '',
};

const EXPERIENCE_OPTIONS = [
  { value: 'fresher', label: 'Fresher (0 years)' },
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1–2 years' },
  { value: '2-3', label: '2–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5+', label: '5+ years' },
];

async function requestCameraStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Camera is not supported in this browser.');
  }

  const attempts = [
    { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false },
    { video: { facingMode: 'environment' }, audio: false },
    { video: true, audio: false },
  ];

  let lastError = null;
  for (const constraints of attempts) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Could not access camera.');
}

function waitForVideoReady(video) {
  if (video.videoWidth > 0 && video.videoHeight > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      video.removeEventListener('loadeddata', onReady);
      reject(new Error('Camera preview is not ready yet. Wait a moment and try again.'));
    }, 8000);

    const onReady = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        window.clearTimeout(timeout);
        video.removeEventListener('loadeddata', onReady);
        resolve();
      }
    };

    video.addEventListener('loadeddata', onReady);
  });
}

export default function RegistrationForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [panPhotoDataUrl, setPanPhotoDataUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [error, setError] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    setCameraStarting(false);
  };

  useEffect(() => () => stopCamera(), []);

  useEffect(() => {
    if (!cameraOn) return undefined;

    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return undefined;

    video.srcObject = stream;
    video.play().catch(() => {
      setError('Could not start camera preview. Allow camera permission and try again.');
    });

    return () => {
      video.srcObject = null;
    };
  }, [cameraOn]);

  const startCamera = async () => {
    setError('');
    setCameraStarting(true);
    stopCamera();

    try {
      const stream = await requestCameraStream();
      streamRef.current = stream;
      setCameraOn(true);
    } catch {
      setError('Camera access denied or unavailable. Allow camera permission in your browser and try again.');
      setCameraOn(false);
    } finally {
      setCameraStarting(false);
    }
  };

  const retakePhoto = () => {
    setPanPhotoDataUrl('');
    setPhotoPreview('');
    startCamera();
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    if (!video || !streamRef.current) {
      setError('Turn on the camera first, then capture your photo.');
      return;
    }

    setCompressing(true);
    setError('');

    try {
      await waitForVideoReady(video);

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const rawDataUrl = canvas.toDataURL('image/jpeg', 0.82);
      const dataUrl = await compressDataUrl(rawDataUrl);

      setPanPhotoDataUrl(dataUrl);
      setPhotoPreview(dataUrl);
      stopCamera();
    } catch (err) {
      setError(err.message || 'Could not capture photo. Try again.');
    } finally {
      setCompressing(false);
    }
  };

  const validate = () => {
    if (!form.name.trim()) return 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) return 'Enter a valid 10-digit mobile number.';
    if (!form.experience) return 'Select your total work experience.';
    if (!form.studiedInGovt) return 'Select whether you studied in a government school or college.';
    if (form.studiedInGovt === 'yes' && !form.govtInstitutionName.trim()) {
      return 'Enter your government school or college name.';
    }
    if (!form.hasLshCertificate) return 'Select whether you have a LearnStackHub internship certificate.';
    if (form.hasLshCertificate === 'yes' && !form.lshCertificateId.trim()) {
      return 'Enter your LearnStackHub certificate ID.';
    }
    if (!panPhotoDataUrl) return 'Capture a photo of yourself holding your PAN card.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      mobile: form.mobile.trim(),
      govtInstitutionName: form.studiedInGovt === 'yes' ? form.govtInstitutionName.trim() : '',
      lshCertificateId: form.hasLshCertificate === 'yes' ? form.lshCertificateId.trim() : '',
      panPhotoDataUrl,
    });
  };

  const hasCapturedPhoto = Boolean(photoPreview);
  const examMinutes = Math.round(EXAM_TIME_LIMIT / 60);

  return (
    <form className="recruitment-form" onSubmit={handleSubmit} noValidate>
      <aside className="recruitment-instructions" aria-label="Registration instructions">
        <div className="recruitment-instructions-head">
          <ClipboardList size={20} aria-hidden />
          <h2 className="recruitment-instructions-title">Instructions</h2>
        </div>
        <ol className="recruitment-instructions-list">
          <li>
            Fill in your <strong>personal details</strong> exactly as on your PAN card. Use a valid email and
            10-digit mobile number.
          </li>
          <li>
            For <strong>PAN verification</strong>, keep your physical PAN card handy. You must capture a live photo
            showing your face and PAN card together — screenshots or uploaded files are not accepted.
          </li>
          <li>
            When you click <strong>Submit details &amp; start exam</strong>, the {examMinutes}-minute assessment (
            {TOTAL_QUESTIONS} MCQs) begins in fullscreen. Your webcam will be monitored for face visibility and
            mobile-phone use. Do not switch tabs or leave the exam window.
          </li>
        </ol>
      </aside>

      <section className="recruitment-section">
        <h2 className="recruitment-section-title">Personal details</h2>
        <div className="recruitment-form-grid">
        <label className="recruitment-field">
          <span>Full name *</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="As on PAN card"
            autoComplete="name"
          />
        </label>
        <label className="recruitment-field">
          <span>Email *</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>
        <label className="recruitment-field">
          <span>Mobile number *</span>
          <input
            type="tel"
            value={form.mobile}
            onChange={(e) => setField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10-digit number"
            autoComplete="tel"
          />
        </label>
        <label className="recruitment-field">
          <span>Experience *</span>
          <select
            value={form.experience}
            onChange={(e) => setField('experience', e.target.value)}
          >
            <option value="">Select experience</option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        </div>
      </section>

      <section className="recruitment-section">
        <h2 className="recruitment-section-title">Background</h2>
        <fieldset className="recruitment-field-group">
          <legend>Did you study in a government school or college?</legend>
          <div className="recruitment-yesno">
            <label className="recruitment-yesno-option">
              <input
                type="radio"
                name="studiedInGovt"
                value="yes"
                checked={form.studiedInGovt === 'yes'}
                onChange={() => setField('studiedInGovt', 'yes')}
              />
              Yes
            </label>
            <label className="recruitment-yesno-option">
              <input
                type="radio"
                name="studiedInGovt"
                value="no"
                checked={form.studiedInGovt === 'no'}
                onChange={() => setField('studiedInGovt', 'no')}
              />
              No
            </label>
          </div>
        </fieldset>

      {form.studiedInGovt === 'yes' && (
        <label className="recruitment-field recruitment-field--full">
          <span>Government school / college name *</span>
          <input
            type="text"
            value={form.govtInstitutionName}
            onChange={(e) => setField('govtInstitutionName', e.target.value)}
            placeholder="Institution name"
          />
        </label>
      )}

        <fieldset className="recruitment-field-group">
          <legend>Do you have a LearnStackHub internship certificate?</legend>
          <div className="recruitment-yesno">
            <label className="recruitment-yesno-option">
              <input
                type="radio"
                name="hasLshCertificate"
                value="yes"
                checked={form.hasLshCertificate === 'yes'}
                onChange={() => setField('hasLshCertificate', 'yes')}
              />
              Yes
            </label>
            <label className="recruitment-yesno-option">
              <input
                type="radio"
                name="hasLshCertificate"
                value="no"
                checked={form.hasLshCertificate === 'no'}
                onChange={() => setField('hasLshCertificate', 'no')}
              />
              No
            </label>
          </div>
        </fieldset>

      {form.hasLshCertificate === 'yes' && (
        <label className="recruitment-field recruitment-field--full">
          <span>Certificate ID number *</span>
          <input
            type="text"
            value={form.lshCertificateId}
            onChange={(e) => setField('lshCertificateId', e.target.value)}
            placeholder="LSH certificate ID"
          />
        </label>
      )}
      </section>

      <section className="recruitment-section">
        <h2 className="recruitment-section-title">PAN verification</h2>
        <div className="recruitment-photo-block">
        <p className="recruitment-photo-hint">
          Capture a clear live photo with your face and physical PAN card visible in the same frame.
        </p>
        <ol className="recruitment-photo-steps">
          <li>Click <strong>Open camera</strong> and allow camera permission when your browser asks.</li>
          <li>
            Sit in a well-lit area. Hold your <strong>physical PAN card</strong> beside your face — not a photo on
            another screen.
          </li>
          <li>
            Make sure your face, PAN photo, name, and PAN number are sharp and readable. Avoid glare or blur.
          </li>
          <li>
            Click <strong>Capture photo</strong>, review the preview, and use <strong>Retake photo</strong> if needed
            before submitting.
          </li>
          <li>
            The live camera preview is mirrored so you can position yourself easily. The saved photo uses the correct
            orientation for verification.
          </li>
        </ol>

        {!hasCapturedPhoto && (
          <>
            <div className="recruitment-photo-actions">
              {!cameraOn ? (
                <button
                  type="button"
                  className="recruitment-photo-btn"
                  onClick={startCamera}
                  disabled={cameraStarting || compressing}
                >
                  {cameraStarting ? (
                    <>
                      <Loader2 size={18} className="spin-icon" aria-hidden />
                      Starting camera…
                    </>
                  ) : (
                    <>
                      <Camera size={18} aria-hidden />
                      Open camera
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="recruitment-photo-btn recruitment-photo-btn-primary"
                  onClick={capturePhoto}
                  disabled={compressing}
                >
                  <Camera size={18} aria-hidden />
                  Capture photo
                </button>
              )}
            </div>

            {cameraOn && (
              <video ref={videoRef} className="recruitment-camera" autoPlay playsInline muted />
            )}
          </>
        )}

        {compressing && (
          <p className="recruitment-inline-status">
            <Loader2 size={16} className="spin-icon" aria-hidden />
            Processing photo…
          </p>
        )}

        {hasCapturedPhoto && (
          <>
            <img src={photoPreview} alt="PAN verification preview" className="recruitment-photo-preview" />
            <div className="recruitment-photo-actions">
              <button type="button" className="recruitment-photo-btn" onClick={retakePhoto}>
                <RotateCcw size={18} aria-hidden />
                Retake photo
              </button>
            </div>
          </>
        )}
      </div>
      </section>

      {error && (
        <p className="recruitment-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="recruitment-btn recruitment-btn-primary recruitment-btn-block"
        disabled={submitting || compressing}
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="spin-icon" aria-hidden />
            Starting exam…
          </>
        ) : (
          'Submit details & start exam'
        )}
      </button>
    </form>
  );
}
