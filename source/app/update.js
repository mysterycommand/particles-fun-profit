import { cos, ππ, random, sin } from '../util/math';
import objectPool from '../lib/object-pool';
// import { IDEAL_FRAME_TIME } from '../lib/game-loop';

import { w, h } from './canvas';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

const drag = 0.95; // 0.95 / IDEAL_FRAME_TIME;
const grav = 0.2; // 0.2 / IDEAL_FRAME_TIME;
const fade = 0.995; // 0.995 / IDEAL_FRAME_TIME;

const size = 50000;
const minToActivate = 0;
const maxToActivate = size * 0.2;
const pool = objectPool(size);

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
  let numToActivate = shouldBoom ? maxToActivate : minToActivate;
  // if (deltaTime > IDEAL_FRAME_TIME) console.log(deltaTime);

  pool.forEach(p => {
    // activate
    if (numActivated < numToActivate && !p.active) {
      reset(p);
      p.active = true;
      numActivated++;
    }

    // update forces
    // const t = IDEAL_FRAME_TIME / deltaTime;

    // apply forces
    p.vx *= drag;
    p.vy *= drag;

    p.vy += grav;
    p.alpha *= fade;

    // update
    p.px += p.vx;
    p.py += p.vy;

    // deactivate
    if (p.active) p.active = isInBounds(p) && isVisible(p);
  });

  return {
    currentTime,
    deltaTime,
    particles: pool.filter(isActive),
    size,
  };
}
