import { cos, ππ, random, sin } from './util/math';

import gameLoop from './lib/game-loop';
import objectPool from './lib/object-pool';

import { w, h } from './app/canvas';
import render from './app/render';

let shouldActivate = false;
let activeX = w / 2;
let activeY = h / 2;

const drag = 0.95;
const grav = 0.2;
const fade = 0.995;

function reset(p) {
  p.px = activeX;
  p.py = activeY;
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

function game(currentTime, deltaTime) {
  let numActivated = 0;
  let numToActivate = shouldActivate ? size * 0.2 : 0;

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

  render({
    deltaTime,
    particles: pool.filter(isActive),
    size,
  });
}

function boom() {
  setTimeout(boom, 1000 + random() * 1000);
  shouldActivate = true;
  setTimeout(() => (shouldActivate = false), 50);
  activeX = w * 0.2 + random() * (w * 0.6);
  activeY = h * 0.2 + random() * (h * 0.6);
}
boom();

const loop = gameLoop(game);
loop.start();
