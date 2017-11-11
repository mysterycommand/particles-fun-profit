# Particle Systems for Fun and Profit
> by [Matt Hayes](mailto:matt@mysterycommand.com)<br>
> [GitHub](https://github.com/mysterycommand), [Tumblr](https://mysterycommand.tumblr.com), [Twitter](https://twitter.com/mysterycommand)

## A Note About Scaffolding
I am literally always tinkering with this stuff.

## Game Loop
It processus user input, but doesn't wait for it.
```ts
while (true) {
  processInput();
  update();
  render();
}
```
> If this loop isn’t blocking on input, that leads to the obvious question: how fast does it spin?

### Variation 1: Sleepy
You want your game to run at 60 FPS; process the frame and then _wait_ until it’s time for the next one.
```ts
while (true)
{
  const start = Date.now();
  processInput();
  update();
  render();
  sleep(start + MS_PER_FRAME - Date.now());
}
```

### Variation 2: Fluid Time
Choose a time step to advance based on how much _real_ time passed since the last frame.
```ts
const lastTime = Date.now();
while (true)
{
  const current = Date.now();
  const elapsed = current - lastTime;
  processInput();
  update(elapsed);
  render();
  lastTime = current;
}
```
> The game plays at a consistent rate on different hardware.
> Players with faster machines are rewarded with smoother gameplay.

- - -

It should look like this:
```js
import objectPool from './lib/object-pool';
import gameLoop from './lib/game-loop';

import { init, update, render } from './app/whatever';

function game(t, dt) {
  pool.update(t, dt);
  const state = { t, dt, ui, particles: pool.active };
  render(state);
}

const pool = objectPool(size);
const loop = gameLoop(game);

pool.initialize(init);
loop.start();
```
