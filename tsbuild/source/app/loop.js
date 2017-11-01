import render from './render';
import update from './update';
export default function loop(currentTime, deltaTime) {
    // processInput
    const state = update(currentTime, deltaTime);
    render(state);
}
//# sourceMappingURL=loop.js.map