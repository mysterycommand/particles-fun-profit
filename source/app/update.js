import { cos, ππ, random, sin } from '../util/math';
import objectPool from '../lib/object-pool';

import { w, h } from './canvas';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

const drag = 0.95;
const grav = 0.2;
const fade = 0.995;

function reset(p) {
  p.px = boomX;
  p.py = boomY;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = 10 + random() * 20;

  p.vx = radius * cos(theta);
  p.vy = radius * sin(theta);
}

function isInBounds({ px, py }) {
  const vertical = py < h;
  const horizontal = 0 < px && px < w;
  return vertical && horizontal;
}

function isVisible({ alpha }) {
  return alpha > 0.01;
}

function isActive({ active }) {
  return active;
}

const size = 500;
const pool = objectPool(size);

// initialize
pool.forEach(reset);

function boom() {
  setTimeout(boom, 1000 + random() * 1000);
  shouldBoom = true;
  setTimeout(() => (shouldBoom = false), 50);
  boomX = w * 0.2 + random() * (w * 0.6);
  boomY = h * 0.2 + random() * (h * 0.6);
}
boom();

export default function update(currentTime, deltaTime) {
  let numActivated = 0;
  let numToActivate = shouldBoom ? size * 0.2 : 0;

  pool.forEach(p => {
    // activate
    if (numActivated < numToActivate && !p.active) {
      reset(p);
      p.active = true;
      numActivated++;
    }

    // update
    p.px += p.vx;
    p.py += p.vy;

    p.vx *= drag;
    p.vy *= drag;

    p.vy += grav;
    p.alpha *= fade;

    // deactivate
    if (p.active) p.active = isInBounds(p) && isVisible(p);
  });

  return {
    deltaTime,
    particles: pool.filter(isActive),
    size,
  };
}
