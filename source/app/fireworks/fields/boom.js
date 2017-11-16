import { random, cos, sin, ππ } from '../../../util/math';
import { IDEAL_FRAME_TIME } from '../../../lib/game-loop';
import { w, h } from '../../canvas';

import objectPool from '../../../lib/object-pool';
import particleField from '../../../lib/particle-field';

const size = 3000;
const maxToActivate = size * 0.2;
const minToActivate = 0;

const fade = 0.975;
const drag = 0.0015;
const gravity = 0.0006;

function initialize(p, px = 0, py = 0) {
  p.px = px;
  p.py = py;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = random() * 20 / IDEAL_FRAME_TIME;

  p.vx = radius * cos(theta);
  p.vy = radius * sin(theta);
}

const props = initialize({ active: false });
const boomPool = objectPool(size, props);

function activator(state) {
  const { boomX, boomY, shouldBoom } = state;

  const numToActivate = shouldBoom ? maxToActivate : minToActivate;
  let numActivated = 0;

  return p => {
    if (p.active || numActivated > numToActivate) return;

    initialize(p, boomX, boomY);
    p.active = true;

    numActivated++;
  };
}

function integrator(state) {
  const { deltaTime } = state;

  return p => {
    p.vx -= p.vx * drag * deltaTime;
    p.vy -= p.vy * drag * deltaTime;
    p.vy += gravity * deltaTime;

    p.px += p.vx * deltaTime;
    p.py += p.vy * deltaTime;

    p.alpha *= fade;
  };
}

function isInBounds({ px, py }) {
  const leftRight = 0 < px && px < w;
  const bottom = py < h;

  return leftRight && bottom;
}

function isVisible({ alpha }) {
  return alpha > 0.01;
}

function deactivator(/* state */) {
  return p => {
    p.active = isInBounds(p) && isVisible(p);
  };
}

const boomField = particleField(boomPool, { activator, integrator, deactivator });
export default boomField;
