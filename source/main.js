import objectPool from './lib/object-pool';
import gameLoop from './lib/game-loop';

const pool = objectPool();
const w = 800;
const h = 450;

// initialize
pool.inactive.forEach(p => {
  p.x = 0;
  p.y = 0;
  p.r = 0;
});

function game(/* currentTime, deltaTime */) {
  // activate
  pool.inactive.forEach(p => (p.active = true));

  // update
  pool.active.forEach(p => {
    p.x += 200;
    p.y += 100;
  });

  // deactivate
  pool.active.filter(p => p.x > w || p.y > h).forEach(p => (p.active = false));

  // render
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(pool.active, null, 2));
}

const loop = gameLoop(game);
loop.start();
setTimeout(loop.stop, 100);
