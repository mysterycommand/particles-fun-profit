import { /* cos, ππ,  */ random /* , saw, sin */ } from './util/math';
// import { getWaveFn } from './util/wave';

import gameLoop from './lib/game-loop';
import objectPool from './lib/object-pool';

import { canvas, w, h } from './app/canvas';
import render from './app/render';

let mouseDown = true;
let mouseX = w / 2;
let mouseY = h / 2;

function onMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();
  mouseDown = true;
}

function onMouseUp(event) {
  event.preventDefault();
  event.stopPropagation();
  mouseDown = false;
}

function onMouseMove(event) {
  event.preventDefault();
  event.stopPropagation();
  mouseX = event.offsetX;
  mouseY = event.offsetY;
}

function onMouseEnter(event) {
  event.preventDefault();
  event.stopPropagation();
  canvas.addEventListener('mousemove', onMouseMove);
}

function onMouseLeave(event) {
  event.preventDefault();
  event.stopPropagation();
  canvas.removeEventListener('mousemove', onMouseMove);
  mouseX = w / 2;
  mouseY = h / 2;
}

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

canvas.addEventListener('mouseenter', onMouseEnter);
canvas.addEventListener('mouseleave', onMouseLeave);

const pool = objectPool(500);

function reset(p) {
  p.px = mouseX;
  p.py = mouseY;
  p.vx = random() * 30 - 15;
  p.vy = random() * 30 - 15;
}

function isInBounds({ px, py }) {
  const vertical = py < h;
  const horizontal = 0 < px && px < w;
  return vertical && horizontal;
}

// const drag = 0.9;
// const grav = 0.4;

// initialize
pool.initialize(reset);

function game(currentTime, deltaTime) {
  let count = 0;
  let total = mouseDown ? 500 : 1;

  pool.update(p => {
    // activate
    if (count < total && !p.active) {
      reset(p);
      p.active = true;
      count++;
    }

    // update
    p.px += p.vx;
    p.py += p.vy;

    // p.vx *= drag;
    // p.vy *= drag;

    // p.vy += grav;

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
for (let i = 0; i < 10; ++i) {
  loop.goto(i);
}
