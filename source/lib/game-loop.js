const { cancelAnimationFrame, requestAnimationFrame } = window;

/**
 * ## IDEAL_FRAME_TIME
 * the number of milliseconds per frame at an ideal frame rate of 60 frames per
 * second (fps)
 */
export const IDEAL_FRAME_TIME = 1000 / 60;

/**
 * ## gameLoop
 * a function that takes a callback to be called each iteration of the loop -
 * the callback will receive the current time of the loop (relative to the start
 * time), and the time since the previous iteration - and returns an interface
 * for starting, stopping, reseting, and stepping through the game loop
 *
 * @param {function} callback - the function on every iteration of the game loop
 *
 * @return {object} - the interface for controlling the game loop
 */
export default function gameLoop(callback = (/* currentTime, deltaTime */) => {}) {
  let requestId = -1;

  let firstTime = -1;
  let previousTime = -1;
  let deltaTime;

  /**
   * ## tick
   * a "private" function passed to `window.requestAnimationFrame` that does
   * some normalization on the (so that game loops start at 0), and calculates
   * the time since the it's last call, then passes all this to the callback
   * provided above
   *
   * @param {DOMHighResTimeStamp} currentTime - the current time
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
   * @see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
   */
  function tick(currentTime) {
    requestId = requestAnimationFrame(tick);

    // if we don't have a first time, this is the first time
    if (firstTime === -1) firstTime = currentTime;

    // normalize against the first time, game loops start at 0
    currentTime -= firstTime;

    // if we don't have a previous time, initialize it with the current time
    if (previousTime === -1) previousTime = currentTime;

    // the time since the previous time
    deltaTime = currentTime - previousTime;

    // call the callback
    callback(currentTime, deltaTime);

    // update the previous time
    previousTime = currentTime;
  }

  return {
    /**
     * ### reset
     * an interface function for returning the game loop to 0
     */
    reset() {
      firstTime = -1;
      previousTime = -1;
    },

    /**
     * ### start
     * starts the game loop, optionally resetting it first
     *
     * @param {boolean} reset - whether or not to reset the game loop (start it
     * over at 0)
     */
    start(reset = true) {
      if (reset) this.reset();
      requestId = requestAnimationFrame(tick);
    },

    /**
     * ### stop
     * stops the game loop
     */
    stop() {
      cancelAnimationFrame(requestId);
      requestId = -1;
    },

    /**
     * ### goto
     * advances the game loop to a simulated frame (via calculated/idealized
     * current and delta times), idk what calling this while the loop is running
     * might do, so I just warn if there's an active `requestId`
     *
     * @param {number} frame - a number indicating the frame to go to
     */
    goto(frame = 1) {
      if (requestId !== -1) {
        console.warn(`\`gameLoop.goto\` called with ${frame} while the game loop is running`);
      }

      const currentTime = IDEAL_FRAME_TIME * frame;
      const deltatTime = IDEAL_FRAME_TIME;
      callback(currentTime, deltatTime);
    },
  };
}
