import { cos, ππ, saw, sin } from './util/math';
import { getWaveFn } from './util/wave';

import objectPool from './lib/object-pool';
import gameLoop from './lib/game-loop';

import { w, h } from './app/canvas';
import render from './app/render';

const pool = objectPool(180);

// initialize
const dist = 175;
const period = 50000;
pool.initialize((p, i, { length }) => {
  const offset = -(period / 4) + i * period / length;
  p.thetaFn = getWaveFn(saw, period, 0, ππ, offset);
  p.theta = p.thetaFn(0);

  p.x = w / 2 + cos(p.theta) * dist;
  p.y = h / 2 + sin(p.theta) * dist;
});

function isInBounds(p) {
  const vertical = 0 < p.y && p.y < h;
  const horizontal = 0 < p.x && p.x < w;
  return vertical && horizontal;
}

function game(currentTime, deltaTime) {
  pool.update(p => {
    // activate
    if (!p.active) p.active = isInBounds(p);

    // update
    p.theta = p.thetaFn(currentTime);
    p.x = w / 2 + cos(p.theta) * dist;
    p.y = h / 2 + sin(p.theta) * dist;

    // deactivate
    if (p.active) p.active = isInBounds(p);
  });

  // render
  render({
    particles: pool.active,
    deltaTime,
  });
}

const loop = gameLoop(game);
// loop.start();
loop.goto(0);
