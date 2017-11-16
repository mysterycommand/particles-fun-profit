import { floor, random, round } from '../../../../util/math';

export default function initialize(p, top = 0, height = round(40 + random() * 200)) {
  p.top = top;
  p.height = height;
  p.bottom = p.top + p.height;
  p.background = `hsl(${floor(random() * 360)},100%,50%)`;
}
