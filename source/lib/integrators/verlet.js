export function initialize(withProps = {}) {
  const previousPosition = { x: 0, y: 0 };
  const currentPosition = { x: 0, y: 0 };

  return {
    previousPosition,
    currentPosition,
    ...withProps,
  };
}

export function integrate(state, currentTime, deltaTime) {
  state.particles.forEach(function(particle) {
    const acceleration = 0; // accumulateForces();
    const position = particle.currentPosition;
    particle.currentPosition =
      2 * position - particle.previousPosition + deltaTime * deltaTime * acceleration;
    particle.previousPosition = position;
  });
}
