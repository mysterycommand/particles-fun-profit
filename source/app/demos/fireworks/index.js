import { random } from '../../util/math';
import { w, h } from '../canvas';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

function boom() {
  setTimeout(boom, 1000 + random() * 1000);

  shouldBoom = true;
  setTimeout(() => (shouldBoom = false), 50);

  boomX = w * 0.2 + random() * (w * 0.6);
  boomY = h * 0.2 + random() * (h * 0.6);
}
boom();

export function getState(currentTime, deltaTime) {
  return {
    currentTime,
    deltaTime,
    shouldBoom,
    boomX,
    boomY,
  };
}

export function activate(/* particle, currentTime, deltaTime */) {}
export function integrate(/* particle, currentTime, deltaTime */) {}
export function deactivate(/* particle, currentTime, deltaTime */) {}