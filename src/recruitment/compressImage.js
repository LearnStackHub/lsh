export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read image file'));
    reader.readAsDataURL(file);
  });
}

export async function compressImageFile(file, { maxWidth = 1200, quality = 0.72, maxBytes = 900_000 } = {}) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);

  const scale = Math.min(1, maxWidth / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  let output = canvas.toDataURL('image/jpeg', quality);
  let q = quality;

  while (output.length > maxBytes && q > 0.35) {
    q -= 0.08;
    output = canvas.toDataURL('image/jpeg', q);
  }

  if (output.length > maxBytes) {
    throw new Error('Photo is too large. Use a smaller image or retake the photo.');
  }

  return output;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Invalid image file'));
    img.src = src;
  });
}
