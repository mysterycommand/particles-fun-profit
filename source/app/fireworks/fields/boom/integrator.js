const fade = 0.975;
const drag = 0.0015;
const gravity = 0.0006;

export default function integrator(state) {
  const { deltaTime } = state;

  return p => {
    p.vx -= p.vx * drag * deltaTime;
    p.vy -= p.vy * drag * deltaTime;
    p.vy += gravity * deltaTime;

    p.px += p.vx * deltaTime;
    p.py += p.vy * deltaTime;

    p.alpha *= fade;
  };
}
