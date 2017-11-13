import * as m from '../util/math';
import { IDEAL_FRAME_TIME } from '../lib/game-loop';
import { buffer, bufferContext, targetContext, w, h } from './canvas';

const fontSize = 24;
bufferContext.font = `${fontSize}px monospace`;
bufferContext.textBaseline = 'bottom';

const maxElapsed = IDEAL_FRAME_TIME;

let averageFps = 1000 / IDEAL_FRAME_TIME;
let displayFps = averageFps;

export default function render({ currentTime, deltaTime, particles, size }) {
  bufferContext.clearRect(0, 0, w, h);

  const fps = deltaTime === 0 ? IDEAL_FRAME_TIME : 1000 / deltaTime;
  averageFps = (averageFps + fps) / 2;

  const { length: len } = particles;
  const num = len.toLocaleString('en');

  const particlePercent = len / size;
  bufferContext.fillStyle = `hsl(${m.floor((1 - particlePercent) * 120)},100%,50%)`;
  bufferContext.fillText(`particles: ${num}`, 10, 10 + fontSize);

  if (currentTime % 1000 < IDEAL_FRAME_TIME) displayFps = averageFps;
  const fpsPercent = averageFps / 60;
  bufferContext.fillStyle = `hsl(${m.floor(fpsPercent * 120)},100%,50%)`;
  bufferContext.fillText(`fps: ${displayFps.toFixed(2)}`, 10, (10 + fontSize) * 2);

  const startRender = performance.now();
  let elapsed = performance.now() - startRender;

  particles.some(({ px, py, vx, vy, alpha }) => {
    bufferContext.save();

    bufferContext.beginPath();
    const angle = m.atan2(vy, vx);
    bufferContext.fillStyle = `hsla(${m.toDegrees(angle + m.π)},100%,50%,${alpha})`;

    bufferContext.translate(px, py);
    bufferContext.rotate(angle);

    const l = m.hypot(vx, vy) * 80;
    bufferContext.rect(-l / 2 + 2, -2, l - 4, 4);
    bufferContext.fill();

    bufferContext.restore();

    elapsed = performance.now() - startRender;
    return elapsed > maxElapsed;
  });

  targetContext.clearRect(0, 0, w, h);
  targetContext.drawImage(buffer, 0, 0);
}
