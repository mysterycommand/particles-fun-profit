import { activate, integrate, deactivate } from './demos/fireworks';

export { getState } from './demos/fireworks';

export function update(state, currentTime, deltaTime) {
  state.particles.forEach(particle => {
    activate(particle, currentTime, deltaTime);
    integrate(particle, currentTime, deltaTime);
    deactivate(particle, currentTime, deltaTime);
  });
}

export function getActive() {}

export function render() {}
