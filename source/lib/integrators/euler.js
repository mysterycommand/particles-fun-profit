export function initialize(withProps = {}) {
  const position = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };

  return {
    position,
    velocity,
    ...withProps,
  };
}

export function integrate(state, currentTime, deltaTime) {
  state.particles.forEach(function(particle) {
    const acceleration = 0; // accumulateForces();
    particle.velocity += acceleration * deltaTime;
    particle.position += particle.velocity * deltaTime;
  });
}
