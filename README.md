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

- - -

Okay, maybe it looks like this:
```js
/* main.js */
import gameLoop from 'game-loop';
import * as app from 'app';

function game(currentTime, deltaTime) {
  app.update(currentTime, deltaTime);
  const state = app.getState();
  app.render(state);
}

const loop = gameLoop(game);
loop.start();

/* app/fields/boom.js */
import objectPool from 'object-pool';
import particleField from 'particle-field';

const boomPool = objectPool(3000, { active: false });
const boomField = particleField(pool, {
  activator: state => {
    const { boomX, boomY, shouldBoom } = state;

    const numToActivate = shouldBoom ? pool.length * 0.2 : 0;
    let numActivated = 0;

    return p => {
      p.px = boomX;
      p.py = boomY;
      p.alpha = 1;

      const theta = random() * ππ;
      const radius = random() * 20 / IDEAL_FRAME_TIME;

      p.vx = radius * cos(theta);
      p.vy = radius * sin(theta);
      p.active = true;
      numActivate++;
    }
  },

  integrator: state => {
    const { deltaTime } = state;

    const fade = 0.975;
    const drag = 0.0015;
    const gravity = 0.0006;

    return p => {
      p.vx -= p.vx * drag * deltaTime;
      p.vy -= p.vy * drag * deltaTime;
      p.vy += gravity * deltaTime;

      p.px += p.vx * deltaTime;
      p.py += p.vy * deltaTime;

      p.alpha *= fade;
    }
  },

  deactivator: state => {
    return p => {
      p.active || (p.active = isInBounds(p) && isVisible(p))
    }
  }
});

/* particle-field.js */
export function particleField(pool, {
  activator,
  integrator,
  deactivator,
}) {
  return {
    update(state) {
      const activate = activator(state);
      const integrate = integrator(state);
      const deacitvate = deactivator(state);

      pool.forEach(p => {
        activate(p);
        integrate(p);
        deactivate(p);
      });
    },

    get active() {
      return pool.filter(isActive);
    }
  }
}

/* app/index.js */
import boomField from './fields/boom';
import { random } from '../../util/math';
import { w, h } from '../canvas';

let shouldBoom = false;
let boomX = w / 2;
let boomY = h / 2;

function boom() {
  setTimeout(boom, 1000 + random() * 1000);

  shouldBoom = true;
  setTimeout(() => (shouldBoom = false), 50);

  boomX = w * 0.2 + random() * (w * 0.6);
  boomY = h * 0.2 + random() * (h * 0.6);
}
boom();

export function update(currentTime, deltaTime) {
  boomField.update({
    currentTime,
    deltaTime,
    shouldBoom,
    boomX,
    boomY,
  });
}

export function getState() {
  const { active } = boomField;

  return {
    active,
  };
}
