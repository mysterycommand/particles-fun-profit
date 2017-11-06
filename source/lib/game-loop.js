const { cancelAnimationFrame, requestAnimationFrame } = window;

export const IDEAL_FRAME_TIME = 1000 / 60;

export default function gameLoop(callback = () => {}) {
  let requestId;

  let firstTime = -1;
  let previousTime = -1;
  let deltaTime;

  function tick(currentTime) {
    requestId = requestAnimationFrame(tick);

    if (firstTime === -1) firstTime = currentTime;
    currentTime -= firstTime;

    if (previousTime === -1) previousTime = currentTime;
    deltaTime = currentTime - previousTime;

    callback(currentTime, deltaTime);
    previousTime = currentTime;
  }

  return {
    reset() {
      firstTime = -1;
      previousTime = -1;
    },

    start(reset = true) {
      if (reset) this.reset();
      requestId = requestAnimationFrame(tick);
    },

    stop() {
      cancelAnimationFrame(requestId);
    },

    goto(frame) {
      const currentTime = IDEAL_FRAME_TIME * frame;
      const deltatTime = IDEAL_FRAME_TIME;
      callback(currentTime, deltatTime);
    },
  };
}
