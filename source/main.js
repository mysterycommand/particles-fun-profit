import { cos, ππ, random, sin } from './util/math';

import gameLoop from './lib/game-loop';
import objectPool from './lib/object-pool';

import { w, h } from './app/canvas';
import render from './app/render';
import { setTimeout } from 'timers';

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

const pool = objectPool(5000);
pool.initialize(reset);

function game(currentTime, deltaTime) {
  let numActivated = 0;
  let numToActivate = shouldActivate ? 100 : 0;

  pool.update(p => {
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
    if (p.active) p.active = isInBounds(p) && p.alpha > 0.01;
  });

  render({
    particles: pool.active,
    deltaTime,
  });
}

function boom() {
  setTimeout(boom, 1000 + random() * 1000);
  shouldActivate = !shouldActivate;
  setTimeout(() => (shouldActivate = !shouldActivate), 50);
  activeX = w * 0.2 + random() * (w * 0.6);
  activeY = h * 0.2 + random() * (h * 0.6);
}

const loop = gameLoop(game);
loop.start();
boom();
