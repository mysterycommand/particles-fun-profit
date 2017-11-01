import Loop from './lib/loop';

const loop = new Loop(console.log);
loop.start();
setTimeout(loop.stop, 500);
setTimeout(() => {
  loop.goto(100);
}, 501);
