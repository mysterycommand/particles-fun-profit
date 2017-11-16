import { random, cos, sin, ππ } from '../../../../util/math';
import { IDEAL_FRAME_TIME } from '../../../../lib/game-loop';

export default function initialize(p, px = 0, py = 0) {
  p.px = px;
  p.py = py;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = random() * 20 / IDEAL_FRAME_TIME;

  p.vx = radius * cos(theta);
  p.vy = radius * sin(theta);
}
