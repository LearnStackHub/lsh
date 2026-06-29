import { useEffect, useRef, useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { compressImageFile } from '../compressImage';

const EMPTY_FORM = {
  name: '',
  email: '',
  mobile: '',
  studiedInGovt: '',
  govtInstitutionName: '',
  hasLshCertificate: '',
  lshCertificateId: '',
};

export default function RegistrationForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [panPhotoDataUrl, setPanPhotoDataUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [error, setError] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  useEffect(() => () => stopCamera(), []);

  const handleImageFile = async (file) => {
    if (!file) return;
    setCompressing(true);
    setError('');
    try {
      const dataUrl = await compressImageFile(file);
      setPanPhotoDataUrl(dataUrl);
      setPhotoPreview(dataUrl);
    } catch (err) {
      setError(err.message || 'Could not process photo');
    } finally {
      setCompressing(false);
    }
  };

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch {
      setError('Camera access denied. Upload a photo of yourself holding your PAN card instead.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
    setPanPhotoDataUrl(dataUrl);
    setPhotoPreview(dataUrl);
    stopCamera();
  };

  const validate = () => {
    if (!form.name.trim()) return 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) return 'Enter a valid 10-digit mobile number.';
    if (!form.studiedInGovt) return 'Select whether you studied in a government school or college.';
    if (form.studiedInGovt === 'yes' && !form.govtInstitutionName.trim()) {
      return 'Enter your government school or college name.';
    }
    if (!form.hasLshCertificate) return 'Select whether you have a LearnStackHub internship certificate.';
    if (form.hasLshCertificate === 'yes' && !form.lshCertificateId.trim()) {
      return 'Enter your LearnStackHub certificate ID.';
    }
    if (!panPhotoDataUrl) return 'Upload or capture a photo of yourself holding your PAN card.';
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

  return (
    <form className="recruitment-card recruitment-form" onSubmit={handleSubmit} noValidate>
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
      </div>

      <fieldset className="recruitment-fieldset">
        <legend>Did you study in a government school or college? *</legend>
        <label className="recruitment-radio">
          <input
            type="radio"
            name="studiedInGovt"
            value="yes"
            checked={form.studiedInGovt === 'yes'}
            onChange={() => setField('studiedInGovt', 'yes')}
          />
          Yes
        </label>
        <label className="recruitment-radio">
          <input
            type="radio"
            name="studiedInGovt"
            value="no"
            checked={form.studiedInGovt === 'no'}
            onChange={() => setField('studiedInGovt', 'no')}
          />
          No
        </label>
      </fieldset>

      {form.studiedInGovt === 'yes' && (
        <label className="recruitment-field">
          <span>Government school / college name *</span>
          <input
            type="text"
            value={form.govtInstitutionName}
            onChange={(e) => setField('govtInstitutionName', e.target.value)}
            placeholder="Institution name"
          />
        </label>
      )}

      <fieldset className="recruitment-fieldset">
        <legend>Do you have a LearnStackHub internship certificate? *</legend>
        <label className="recruitment-radio">
          <input
            type="radio"
            name="hasLshCertificate"
            value="yes"
            checked={form.hasLshCertificate === 'yes'}
            onChange={() => setField('hasLshCertificate', 'yes')}
          />
          Yes
        </label>
        <label className="recruitment-radio">
          <input
            type="radio"
            name="hasLshCertificate"
            value="no"
            checked={form.hasLshCertificate === 'no'}
            onChange={() => setField('hasLshCertificate', 'no')}
          />
          No
        </label>
      </fieldset>

      {form.hasLshCertificate === 'yes' && (
        <label className="recruitment-field">
          <span>Certificate ID number *</span>
          <input
            type="text"
            value={form.lshCertificateId}
            onChange={(e) => setField('lshCertificateId', e.target.value)}
            placeholder="LSH certificate ID"
          />
        </label>
      )}

      <div className="recruitment-photo-block">
        <p className="recruitment-photo-title">Photo with PAN card *</p>
        <p className="recruitment-photo-hint">
          Upload or capture a clear photo showing your face and PAN card together.
        </p>
        <div className="recruitment-photo-actions">
          <label className="recruitment-photo-btn">
            <Upload size={18} aria-hidden />
            Upload photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={(e) => handleImageFile(e.target.files?.[0])}
            />
          </label>
          {!cameraOn ? (
            <button type="button" className="recruitment-photo-btn" onClick={startCamera}>
              <Camera size={18} aria-hidden />
              Use camera
            </button>
          ) : (
            <button type="button" className="recruitment-photo-btn" onClick={capturePhoto}>
              <Camera size={18} aria-hidden />
              Capture
            </button>
          )}
        </div>
        {compressing && (
          <p className="recruitment-inline-status">
            <Loader2 size={16} className="spin-icon" aria-hidden />
            Processing photo…
          </p>
        )}
        {cameraOn && (
          <video ref={videoRef} className="recruitment-camera" autoPlay playsInline muted />
        )}
        {photoPreview && (
          <img src={photoPreview} alt="PAN verification preview" className="recruitment-photo-preview" />
        )}
      </div>

      {error && (
        <p className="recruitment-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="recruitment-btn recruitment-btn-primary" disabled={submitting || compressing}>
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
