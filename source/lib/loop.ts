const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;

export interface LoopCallback {
  (currentTime: number, deltaTime: number): void;
}

export interface Loop {
  start(): void;
  stop(): void;
  goto(frame: number): void;
}

export default function createLoop(callback: LoopCallback): Loop {
  const idealFrame = 1000 / 60;

  let requestId: number;

  let firstTime: number;
  let previousTime: number;
  let deltaTime: number;

  function tick(time: number): void {
    requestId = rAF(tick);

    if (firstTime === -1) {
      firstTime = time;
    }

    time -= firstTime;

    if (previousTime === -1) {
      previousTime = time;
    }

    deltaTime = time - previousTime;

    callback(time, deltaTime);

    previousTime = time;
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

    goto(frame: number): void {
      stop();
      callback(frame * idealFrame, idealFrame);
    },
  };
}
