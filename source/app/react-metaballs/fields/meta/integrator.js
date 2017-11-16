import { atan2, cos, sin, π, hπ } from '../../../../util/math';

const w = 0;
const h = 0;
const hw = w / 2;
const hh = h / 2;

export default function integrator({ deltaTime }) {
  return p => {
    if (!p.isRoot) {
      const dx = p.px - hw;
      const dy = p.py - hh;
      const angle = atan2(dy, dx);

      const gravX = cos(angle + π) * p.grav;
      const gravY = sin(angle + π) * p.grav;

      const spinX = cos(angle + hπ) * p.spin;
      const spinY = sin(angle + hπ) * p.spin;

      p.vx += gravX * deltaTime;
      p.vy += gravY * deltaTime;

      p.vx += spinX * deltaTime;
      p.vy += spinY * deltaTime;
    }

    p.px += p.vx * deltaTime;
    p.py += p.vy * deltaTime;
  };
}
