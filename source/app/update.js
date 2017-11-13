import { cos, ππ, random, sin } from '../util/math';
import objectPool from '../lib/object-pool';
import { IDEAL_FRAME_TIME } from '../lib/game-loop';

import { w, h } from './canvas';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

const friction = 0.975;
const gravity = 0.01 / IDEAL_FRAME_TIME;
const decay = 0.975;

const size = 1000;
const minToActivate = 0;
const maxToActivate = size * 0.2;
const pool = objectPool(size, { active: false });

function reset(p) {
  p.px = boomX;
  p.py = boomY;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = (10 + random() * 20) / IDEAL_FRAME_TIME;

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

  if (deltaTime > IDEAL_FRAME_TIME) deltaTime = IDEAL_FRAME_TIME;

  pool.forEach(p => {
    // activate
    if (numActivated < numToActivate && !p.active) {
      reset(p);
      p.active = true;
      numActivated++;
    }

    // update
    p.px += p.vx * deltaTime;
    p.py += p.vy * deltaTime;

    p.alpha *= decay;
    p.vx *= friction;
    p.vy *= friction;

    p.vy += gravity * deltaTime;

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
