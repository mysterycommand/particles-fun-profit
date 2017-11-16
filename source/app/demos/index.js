import { cos, ππ, random, sin } from '../../util/math';
import objectPool from '../../lib/object-pool';
import { IDEAL_FRAME_TIME } from '../../lib/game-loop';

import { w, h } from '../canvas';
import fireworks from './fireworks';

const fade = 0.975;
const drag = 0.0015;
const gravity = 0.0006;

const size = 1000;
const minToActivate = 0;
const maxToActivate = size * 0.2;
const pool = objectPool(size, { active: false });

function reset(p) {
  const { boomX, boomY } = fireworks();

  p.px = boomX;
  p.py = boomY;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = random() * 20 / IDEAL_FRAME_TIME;

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

export default function update(currentTime, deltaTime) {
  const { shouldBoom } = fireworks();

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
    p.vx -= p.vx * drag * deltaTime;
    p.vy -= p.vy * drag * deltaTime;
    p.vy += gravity * deltaTime;

    p.px += p.vx * deltaTime;
    p.py += p.vy * deltaTime;

    p.alpha *= fade;

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
