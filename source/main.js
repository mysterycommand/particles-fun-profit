import objectPool from './lib/object-pool';
import gameLoop from './lib/game-loop';

const { log } = console;
const { atan2, cos, PI: π, round, sin } = Math;

const canvas = document.getElementById('canvas');
const { clientWidth: w, clientHeight: h } = canvas;
canvas.width = w;
canvas.height = h;

const context = canvas.getContext('2d');
const fontSize = 48;
context.font = `${fontSize}px monospace`;
context.textBaseline = 'bottom';

const pool = objectPool();

// initialize
pool.inactive.forEach(p => {
  p.x = w / 2;
  p.y = h / 2 - 175;
  p.r = atan2(p.y, p.x);
  p.t = -π / 2;
});

function game(currentTime, deltaTime) {
  log(currentTime, deltaTime);

  // activate
  pool.inactive.forEach(p => (p.active = true));

  // update
  pool.active.forEach(p => {
    p.x = w / 2 + cos(p.t) * 175;
    p.y = h / 2 + sin(p.t) * 175;
    p.t += π / 180;
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
  });
  context.fill();
}

const loop = gameLoop(game);
loop.goto(0);
// loop.start();
