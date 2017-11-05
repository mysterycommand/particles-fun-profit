import { π, round, toDegrees } from '../util/math';
import { context, w, h } from './canvas';

const fontSize = 48;
context.font = `${fontSize}px monospace`;
context.textBaseline = 'bottom';

export default function render({ deltaTime, particles }) {
  const fps = round(1000 / deltaTime).toLocaleString('en');

  context.clearRect(0, 0, w, h);
  context.fillStyle = 'cyan';
  context.fillText(fps, 10, 10 + fontSize);

  particles.forEach(p => {
    context.fillStyle = `hsl(${toDegrees(p.theta + π / 2)},100%,50%)`;
    context.beginPath();
    context.arc(p.x, p.y, 30, 0, π * 2);
    context.closePath();
    context.fill();
  });
}
