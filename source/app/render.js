import * as m from '../util/math';
import { context, w, h } from './canvas';

const fontSize = 24;
context.font = `${fontSize}px monospace`;
context.textBaseline = 'bottom';

export default function render({ deltaTime, particles }) {
  context.clearRect(0, 0, w, h);

  const fps = m.round(1000 / deltaTime).toLocaleString('en');
  const num = particles.length.toLocaleString('en');
  context.fillStyle = 'white';
  context.fillText(`particles: ${num}`, 10, 10 + fontSize);
  context.fillText(`fps: ${fps}`, 10, (10 + fontSize) * 2);

  // context.fillStyle = `hsl(${floor(random() * 360)},100%,50%)`;
  particles.forEach(({ px, py, vx, vy, alpha }) => {
    context.save();

    context.beginPath();
    const angle = m.atan2(vy, vx);
    context.fillStyle = `hsla(${m.toDegrees(angle + m.π)},100%,50%,${alpha})`;

    context.translate(px, py);
    context.rotate(angle);

    const l = m.hypot(vx, vy) * 2;
    context.rect(-l / 2 + 2, -2, l - 4, 4);
    context.fill();

    context.restore();
  });
}
