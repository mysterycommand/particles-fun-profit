import gameLoop from './lib/game-loop';
import { getState, update, getActive, render } from './app';

function game(currentTime, deltaTime) {
  const state = getState(currentTime, deltaTime);

  /* this might need to be 'fixed' (time that is) */
  update(state);
  /* lol */

  render(getActive());
}

const loop = gameLoop(game);
loop.start();
