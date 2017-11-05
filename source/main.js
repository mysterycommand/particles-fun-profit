import { atan2, cos, π, ππ, round, saw, sin } from './util/math';
import { getWaveFn } from './util/wave';

import objectPool from './lib/object-pool';
import gameLoop from './lib/game-loop';

import { context, w, h } from './app/canvas';

// const { log } = console;
// const { stringify } = JSON;

const fontSize = 48;
context.font = `${fontSize}px monospace`;
context.textBaseline = 'bottom';

const pool = objectPool(4);

// initialize
pool.inactive.forEach((p, i) => {
  p.x = w / 2;
  p.y = h / 2 - 175;
  p.r = atan2(p.y, p.x);

  p.thetaFn = getWaveFn(saw, 10000, 0, ππ, -2500 + i * 2500);
  p.theta = p.thetaFn(0);
});

function game(currentTime, deltaTime) {
  // activate
  pool.inactive.forEach(p => (p.active = true));
  // log(stringify(pool.active, null, 2));

  // update
  pool.active.forEach(p => {
    p.x = w / 2 + cos(p.theta) * 175;
    p.y = h / 2 + sin(p.theta) * 175;
    p.theta = p.thetaFn(currentTime);
  });

  // deactivate
  pool.active.filter(p => p.x > w || p.y > h).forEach(p => (p.active = false));

  // render
  context.clearRect(0, 0, w, h);

  const fps = round(1000 / deltaTime).toLocaleString('en');
  context.fillStyle = 'cyan';
  context.fillText(fps, 10, 10 + fontSize);

  context.fillStyle = 'magenta';
  pool.active.forEach(p => {
    context.beginPath();
    context.arc(p.x, p.y, 10, 0, π * 2);
    context.closePath();
    context.fill();
  });
}

const loop = gameLoop(game);
loop.goto(0);
// loop.start();
