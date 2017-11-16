import { ππ, random } from '../../../../util/math';
import initialize from './initialize';

const w = 0;
const h = 0;
const hw = w / 2;
const hh = h / 2;

export default function activator(/* state */) {
  return (p, i, pool) => {
    if (p.active) return;

    if (i === 0) {
      p.px = 0;
      p.py = 0;
      p.vx = 0;
      p.vy = 0;
      p.r = 50;
    } else {
      const theta = ππ / (pool.length - 1) * i;
      initialize(p, theta, 20);
      p.r = 25;
    }

    p.grav = 0.0000125 + random() * 0.0000125;
    p.spin = 0.0000015 + random() * 0.0000015;
    p.px += hw;
    p.py += hh;

    p.isRoot = i === 0;
    p.active = true;
  };
}
