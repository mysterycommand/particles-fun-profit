import { random } from '../../util/math';
import { w, h } from '../canvas';

import boomField from './fields/boom';
export { default as render } from './render';

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

export function getState(/* currentTime, deltaTime */) {
  return {
    shouldBoom,
    boomX,
    boomY,
  };
}

export function update(state, currentTime, deltaTime) {
  boomField.update({
    ...state,
    deltaTime,
  });
}

export function getActive() {
  return boomField.active;
}

export function getSize() {
  return boomField.size;
}
