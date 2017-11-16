import { random, cos, sin, ππ } from '../../util/math';
import { IDEAL_FRAME_TIME } from '../../lib/game-loop';

export function activate(state, p) {
  const { boomX, boomY } = state;

  p.px = boomX;
  p.py = boomY;
  p.alpha = 1;

  const theta = random() * ππ;
  const radius = random() * 20 / IDEAL_FRAME_TIME;

  p.vx = radius * cos(theta);
  p.vy = radius * sin(theta);
}
