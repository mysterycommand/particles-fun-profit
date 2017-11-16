import { random } from '../../util/math';
import { w, h, target } from '../canvas';

import boomField from './fields/boom';
export { default as render } from './render';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

function onMouseEnter(/* event */) {
  target.addEventListener('mousemove', onMouseMove);
  target.addEventListener('mousedown', onMouseDown);
  target.addEventListener('mouseup', onMouseUp);
}

function onMouseLeave(/* event */) {
  target.removeEventListener('mousemove', onMouseMove);
  target.removeEventListener('mousedown', onMouseDown);
  target.removeEventListener('mouseup', onMouseUp);

  shouldBoom = false;
  boomX = w / 2;
  boomY = h / 2;
}

function onMouseMove({ offsetX, offsetY }) {
  boomX = offsetX;
  boomY = offsetY;
}

function onMouseDown() {
  shouldBoom = true;
}

function onMouseUp() {
  shouldBoom = false;
}

target.addEventListener('mouseenter', onMouseEnter);
target.addEventListener('mouseleave', onMouseLeave);

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
