import { /* cos, ππ,  */ random /* , saw, sin */ } from './util/math';
// import { getWaveFn } from './util/wave';

import gameLoop, { IDEAL_FRAME_TIME as idf } from './lib/game-loop';
import objectPool from './lib/object-pool';

import { w, h } from './app/canvas';
import render from './app/render';

const pool = objectPool(50);

function initialize(p) {
  p.px = w / 2;
  p.py = h / 2;
  p.vx = random() * 30 - 15;
  p.vy = random() * 30 - 15;
}

function isInBounds({ px, py }) {
  const vertical = 0 < py && py < h;
  const horizontal = 0 < px && px < w;
  return vertical && horizontal;
}

// initialize
pool.initialize(initialize);

function game(currentTime, deltaTime) {
  pool.update(p => {
    // activate
    if (!p.active) {
      initialize(p);
      p.active = isInBounds(p);

      // // eslint-disable-next-line no-console
      // console.log(isInBounds(p), JSON.stringify(p, null, 2));
    }

    // update
    p.px += p.vx;
    p.py += p.vy;
    p.vx *= 0.99 * (deltaTime / idf);
    p.vy += 1 * (deltaTime / idf);
    p.vy *= 0.99 * (deltaTime / idf);

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
// loop.goto(0);
for (let i = 0; i < 8; ++i) {
  loop.goto(i);
}
