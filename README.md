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

- - -

Maybe _this_ is how it should look:
```js
import gameLoop from './lib/game-loop';
import objectPool from './lib/object-pool';
import particleField from './lib/particle-field';

import app from './app';
import {
  initialize,
  activate,
  integrate,
  deactivate,
} from './app/particles/type';

const withProps = initialize({ active: false });
const pool = objectPool(ofSize, withProps);
const field = particleField(pool, {
  activate,
  integrate,
  deactivate,
});

function game(t, dt) {
  const state = app.state(t, dt);

  /* this might be wrapped in some fixed time step */
  field.update(state, t, dt);

  const p = field.active;
  render(p, t, dt);
}

const loop = gameLoop(game);
loop.start();
```

… or, maybe this?:
```js
import gameLoop from './lib/game-loop';
import {
  getState,
  update,
  getActive,
  render,
 } from './app';

function game(t, dt) {
  const applicationState = getState(t, dt);

  /* this might be wrapped in some fixed time step */
  update(applicationState, t, dt);

  const activeParticles = getActive();
  render(activeParticles, t, dt);
}

const loop = gameLoop(game);
loop.start();
```

… then `'./app'` would look like this(-ish):
```js
import objectPool from '../lib/object-pool';
import particleField from '../lib/particle-field';
import {
  initialize,
  activate,
  integrate,
  deactivate,
  render,
} from './particles/type';

const ofSize = 3000;
const withProps = initialize({ active: false });
const pool = objectPool(ofSize, withProps);
const field = particleField(pool, {
  activate,
  integrate,
  deactivate,
  render,
});

export function getState(t, dt) {
  return {
    shouldBoom,
    boomX,
    boomY,
  };
}

export function update(state, t, dt) {
  fields.forEach(field => {
    field.activate(state, t, dt);
    field.integrate(state, t, dt);
    field.deactivate(state, t, dt);
  });
}

export function getActive() {
  return field.active;
}

export function render(context) {
  fields.forEach(field => {
    field.render(context);
  });
}
```

#### Todo:
1. [ ] Do the refactor described above.
  - [ ] Fix the timestep!?
2. [ ] Find/create a `Vec2` implementation.
3. [ ] Setup Verlet integration scheme.
  - what about collisions?
  - what about constraints?
4. [ ] Finish out the demos:
  1. [ ] Fireworks (mostly done, just needs polish).
  2. [ ] Metaballs (also done, just in a different repo).
  3. [ ] Character physics/ragdoll.
  4. [ ] Infinite scroll.
5. [ ] Update slides.
  - what about the Tumblr slide?
  - evolution of game loop?
  - how is object pool not "just" an array
  - component/command pattern
    - monobehavior lifecycle? (http://whatiseeinit.blogspot.com/2012/10/unity3d-monobehaviour-lifecycle.html)
  - speaker notes ...
6. Time for design? Making GIFs?
