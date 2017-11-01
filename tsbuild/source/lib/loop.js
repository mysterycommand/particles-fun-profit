const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;
export default function createLoop(callback) {
    const idealFrame = 1000 / 60;
    let requestId;
    let firstTime;
    let previousTime;
    let deltaTime;
    function tick(time) {
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
        start() {
            firstTime = -1;
            previousTime = -1;
            deltaTime = 0;
            requestId = rAF(tick);
        },
        stop() {
            cAF(requestId);
            requestId = 0;
        },
        goto(frame) {
            stop();
            callback(frame * idealFrame, idealFrame);
        },
    };
}
//# sourceMappingURL=loop.js.map