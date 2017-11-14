import gameLoop from './lib/game-loop';
import { getState, update, getActive, render } from './app';

function game(currentTime, deltaTime) {
  const state = getState(currentTime, deltaTime);
  update(state, currentTime, deltaTime);
  render(getActive(), currentTime, deltaTime);
}

const loop = gameLoop(game);
loop.start();
