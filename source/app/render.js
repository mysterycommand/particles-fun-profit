import * as m from '../util/math';
import { buffer, bufferContext, targetContext, w, h } from './canvas';

const fontSize = 24;
bufferContext.font = `${fontSize}px monospace`;
bufferContext.textBaseline = 'bottom';

export default function render({ deltaTime, particles }) {
  bufferContext.clearRect(0, 0, w, h);

  const fps = m.round(1000 / deltaTime).toLocaleString('en');
  const num = particles.length.toLocaleString('en');

  bufferContext.fillStyle = 'white';
  bufferContext.fillText(`particles: ${num}`, 10, 10 + fontSize);
  bufferContext.fillText(`fps: ${fps}`, 10, (10 + fontSize) * 2);

  // context.fillStyle = `hsl(${floor(random() * 360)},100%,50%)`;
  particles.forEach(({ px, py, vx, vy, alpha }) => {
    bufferContext.save();

    bufferContext.beginPath();
    const angle = m.atan2(vy, vx);
    bufferContext.fillStyle = `hsla(${m.toDegrees(angle + m.π)},100%,50%,${alpha})`;

    bufferContext.translate(px, py);
    bufferContext.rotate(angle);

    const l = m.hypot(vx, vy) * 2;
    bufferContext.rect(-l / 2 + 2, -2, l - 4, 4);
    bufferContext.fill();

    bufferContext.restore();
  });

  targetContext.clearRect(0, 0, w, h);
  targetContext.drawImage(buffer, 0, 0);
}
