/** Shared camera access for recruitment flows. */

export async function requestCameraStream(videoConstraints = {}) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Camera is not supported in this browser.');
  }

  const attempts = [
    {
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 }, ...videoConstraints },
      audio: false,
    },
    { video: { facingMode: 'user' }, audio: false },
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

export function stopCameraStream(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}
