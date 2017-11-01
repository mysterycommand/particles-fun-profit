const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;
export default class Loop {
    constructor(callback) {
        this.callback = callback;
        this.start = () => {
            this.firstTime = -1;
            this.previousTime = -1;
            this.deltaTime = 0;
            this.requestId = rAF(this.tick);
        };
        this.stop = () => {
            cAF(this.requestId);
            this.requestId = 0;
        };
        this.goto = (frame) => {
            const { idealFrame } = Loop;
            this.stop();
            this.callback(frame * idealFrame, idealFrame);
        };
        this.tick = (time) => {
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
}
Loop.idealFrame = 1000 / 60;
//# sourceMappingURL=loop.js.map