import * as m from '../util/math';
import { IDEAL_FRAME_TIME } from '../lib/game-loop';
import { buffer, bufferContext, targetContext, w, h } from './canvas';

const fontSize = 24;
bufferContext.font = `${fontSize}px monospace`;
bufferContext.textBaseline = 'bottom';

const maxEllapsed = IDEAL_FRAME_TIME / 8;

export default function render({ deltaTime, particles, size }) {
  bufferContext.clearRect(0, 0, w, h);

  const fps = (1000 / deltaTime).toFixed(2);
  const { length: len } = particles;
  const num = len.toLocaleString('en');

  const particlePercent = len / size;
  bufferContext.fillStyle = `hsl(${m.floor((1 - particlePercent) * 120)},100%,50%)`;
  bufferContext.fillText(`particles: ${num}`, 10, 10 + fontSize);

  const fpsPercent = 1000 / deltaTime / 60;
  bufferContext.fillStyle = `hsl(${m.floor(fpsPercent * 120)},100%,50%)`;
  bufferContext.fillText(`fps: ${fps}`, 10, (10 + fontSize) * 2);

  // context.fillStyle = `hsl(${floor(random() * 360)},100%,50%)`;
  const startRender = performance.now();
  particles.some(({ px, py, vx, vy, alpha }) => {
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

    const ellapsed = performance.now() - startRender;
    return ellapsed > maxEllapsed;
  });

  targetContext.clearRect(0, 0, w, h);
  targetContext.drawImage(buffer, 0, 0);
}
