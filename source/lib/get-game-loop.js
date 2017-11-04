const { cancelAnimationFrame, requestAnimationFrame } = window;

export default function getGameLoop(callback) {
  let requestId;

  let firstTime = -1;
  let previousTime = -1;
  let deltaTime;

  function tick(currentTime) {
    requestId = requestAnimationFrame(tick);

    // eslint-disable-next-line no-console
    console.log('current time:', currentTime);

    if (firstTime === -1) {
      firstTime = currentTime;
    }

    currentTime -= firstTime;

    if (previousTime === -1) {
      previousTime = currentTime;
    }

    deltaTime = currentTime - previousTime;
    callback(currentTime, deltaTime);
    previousTime = currentTime;
  }

  return {
    reset() {
      firstTime = -1;
      previousTime = -1;
    },

    start() {
      requestId = requestAnimationFrame(tick);
    },

    stop() {
      cancelAnimationFrame(requestId);
    },
  };
}
