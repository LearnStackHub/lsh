let modelPromise = null;
let loadedModel = null;

export async function loadExamObjectDetector() {
  if (loadedModel) return loadedModel;
  if (!modelPromise) {
    modelPromise = (async () => {
      const [tf, cocoSsd] = await Promise.all([
        import('@tensorflow/tfjs'),
        import('@tensorflow-models/coco-ssd'),
      ]);
      await tf.ready();
      const model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
      loadedModel = model;
      return model;
    })();
  }
  return modelPromise;
}

export async function disposeExamObjectDetector() {
  if (loadedModel?.dispose) {
    try {
      loadedModel.dispose();
    } catch {
      // ignore
    }
  }
  loadedModel = null;
  modelPromise = null;
}

export async function detectMobilePhone(model, video, minScore) {
  if (!model || !video?.videoWidth) return null;

  const predictions = await model.detect(video);
  let best = null;

  for (const prediction of predictions) {
    if (prediction.class !== 'cell phone' || prediction.score < minScore) continue;
    if (!best || prediction.score > best.score) {
      best = prediction;
    }
  }

  return best;
}
