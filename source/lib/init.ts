const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;

interface LoopCallback {
  (currentTime: number, deltaTime: number): void;
}

interface LoopController {
  start(): void;
  stop(): void;
  goto(frame: number): void;
}

export default function init(loop: LoopCallback): LoopController {
  const idealDeltaTime = 1000 / 60;

  let requestId: number;

  let firstTime: number;
  let previousTime: number;
  let deltaTime: number;

  function tick(currentTime: number): void {
    requestId = rAF(tick);

    if (firstTime === -1) {
      firstTime = currentTime;
    }

    currentTime -= firstTime;

    if (previousTime === -1) {
      previousTime = currentTime;
    }

    deltaTime = currentTime - previousTime;
    loop(currentTime, deltaTime);
    previousTime = currentTime;
  }

  return {
    start(): void {
      firstTime = -1;
      previousTime = -1;
      deltaTime = 0;
      requestId = rAF(tick);
    },

    stop(): void {
      cAF(requestId);
      requestId = 0;
    },

    goto(frameNumber: number): void {
      stop();
      const currentTime = frameNumber * idealDeltaTime;
      loop(currentTime, idealDeltaTime);
    },
  };
}
