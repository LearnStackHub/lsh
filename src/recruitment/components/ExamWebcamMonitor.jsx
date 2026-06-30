import { Video, VideoOff, Users, ScanFace, Loader2, Smartphone } from 'lucide-react';

function statusIcon(status) {
  if (status === 'starting') return Loader2;
  if (status === 'camera_off' || status === 'error') return VideoOff;
  if (status === 'mobile_detected') return Smartphone;
  if (status === 'multiple_faces') return Users;
  if (status === 'no_face') return ScanFace;
  return Video;
}

export default function ExamWebcamMonitor({ videoRef, status, statusDetail }) {
  const Icon = statusIcon(status);
  const spin = status === 'starting';

  return (
    <div
      className={`rex-webcam rex-webcam--${status}`}
      aria-label="Live exam webcam monitoring"
    >
      <div className="rex-webcam-preview-wrap">
        <video
          ref={videoRef}
          className="rex-webcam-video"
          autoPlay
          playsInline
          muted
        />
        {status === 'starting' && (
          <div className="rex-webcam-overlay">
            <Loader2 size={22} className="spin-icon" aria-hidden />
          </div>
        )}
      </div>
      <div className="rex-webcam-meta">
        <Icon size={14} className={spin ? 'spin-icon' : ''} aria-hidden />
        <div className="rex-webcam-copy">
          <strong>Live proctoring</strong>
          <span>{statusDetail || 'Monitoring…'}</span>
        </div>
      </div>
    </div>
  );
}
