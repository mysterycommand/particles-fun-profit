import createLoop, { LoopCallback } from './lib/loop';

const { round } = Math;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const { clientWidth: w, clientHeight: h } = canvas;
canvas.width = w;
canvas.height = h;

const callback: LoopCallback = (currentTime: number, deltaTime: number): void => {
  // processInput
  // update
  const fps = round(1000 / deltaTime).toLocaleString('en');
  const fontSize = 48;

  context.clearRect(0, 0, w, h);
  context.fillStyle = 'cyan';
  context.font = `${fontSize}px monospace`;
  context.textBaseline = 'bottom';
  context.fillText(fps, 10, 10 + fontSize);
};

const loop = createLoop(callback);
loop.start();
setTimeout(loop.stop, 500);
