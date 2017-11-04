import getGameLoop from './lib/get-game-loop';

// eslint-disable-next-line no-console
const loop = getGameLoop(console.log);
loop.start();
setTimeout(loop.stop, 100);
