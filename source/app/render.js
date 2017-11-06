import { atan2, hypot, π, round, toDegrees } from '../util/math';
import { context, w, h } from './canvas';

const fontSize = 24;
context.font = `${fontSize}px monospace`;
context.textBaseline = 'bottom';

export default function render({ deltaTime, particles }) {
  context.clearRect(0, 0, w, h);

  const fps = round(1000 / deltaTime).toLocaleString('en');
  context.fillStyle = 'white';
  context.fillText(`${fps}fps`, 10, 10 + fontSize);

  particles.forEach(({ px, py, vx, vy }) => {
    context.save();

    context.beginPath();
    const angle = atan2(vy, vx);
    context.fillStyle = `hsl(${toDegrees(angle + π)},100%,50%)`;

    context.translate(px, py);
    context.rotate(angle);

    const l = hypot(vx, vy) * 5;
    context.rect(-l / 2 + 2, -2, l - 4, 4);
    context.fill();

    context.restore();
  });
}
