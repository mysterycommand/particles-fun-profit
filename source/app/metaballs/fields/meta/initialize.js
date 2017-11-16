import { cos, sin } from '../../../../util/math';

export default function initialize(p, theta = 0, radius = 0) {
  p.px = cos(theta) * radius;
  p.py = sin(theta) * radius;
  p.vx = -p.px * 0.002;
  p.vy = -p.py * 0.002;
  p.r = 0;
}
