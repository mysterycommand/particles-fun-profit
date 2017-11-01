const { cancelAnimationFrame: cAF, requestAnimationFrame: rAF } = window;
export default function createLoop(callback) {
    const idealDeltaTime = 1000 / 60;
    let requestId;
    let firstTime;
    let previousTime;
    let deltaTime;
    function tick(currentTime) {
        requestId = rAF(tick);
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
        goto(frameNumber) {
            stop();
            const currentTime = frameNumber * idealDeltaTime;
            callback(currentTime, idealDeltaTime);
        },
    };
}
//# sourceMappingURL=loop.js.map