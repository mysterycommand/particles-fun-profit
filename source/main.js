import gameLoop from './lib/game-loop';
import render from './app/render';
import update from './app/update';

function game(currentTime, deltaTime) {
  const state = update(currentTime, deltaTime);
  render(state);
}

const loop = gameLoop(game);
loop.start();
