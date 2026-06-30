import { Video, VideoOff } from 'lucide-react';

export default function ProctorPreview({ videoRef, cameraLive, cameraError }) {
  return (
    <div className="rex-proctor" aria-label="Live proctor preview">
      <div className="rex-proctor-head">
        <span className={`rex-proctor-dot${cameraLive ? ' rex-proctor-dot--live' : ''}`} aria-hidden />
        <span className="rex-proctor-label">Live view</span>
      </div>

      <div className="rex-proctor-frame">
        {cameraError ? (
          <div className="rex-proctor-fallback">
            <VideoOff size={22} aria-hidden />
            <span>Camera unavailable</span>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="rex-proctor-video" autoPlay playsInline muted />
            {!cameraLive && (
              <div className="rex-proctor-fallback">
                <Video size={22} aria-hidden />
                <span>Starting camera…</span>
              </div>
            )}
          </>
        )}
      </div>

      <p className="rex-proctor-note">Preview only — not recorded or saved</p>
    </div>
  );
}
