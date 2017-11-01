const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;

export interface LoopCallback {
  (currentTime: number, deltaTime: number): void;
}

export default class Loop {
  private static idealFrame = 1000 / 60;

  private requestId: number;

  private firstTime: number;
  private previousTime: number;
  private deltaTime: number;

  public constructor(private callback: LoopCallback) {}

  public start = (): void => {
    this.firstTime = -1;
    this.previousTime = -1;
    this.deltaTime = 0;
    this.requestId = rAF(this.tick);
  };

  public stop = (): void => {
    cAF(this.requestId);
    this.requestId = 0;
  };

  public goto = (frame: number): void => {
    const { idealFrame } = Loop;
    this.stop();
    this.callback(frame * idealFrame, idealFrame);
  };

  private tick: FrameRequestCallback = (time: number): void => {
    this.requestId = rAF(this.tick);

    if (this.firstTime === -1) {
      this.firstTime = time;
    }

    time -= this.firstTime;

    if (this.previousTime === -1) {
      this.previousTime = time;
    }

    this.deltaTime = time - this.previousTime;

    this.callback(time, this.deltaTime);

    this.previousTime = time;
  };
}
