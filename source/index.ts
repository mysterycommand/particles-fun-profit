const { requestAnimationFrame: rAF } = window;

function tick(time: number) {
  rAF(tick);
  // tslint:disable-next-line no-console
  console.log('hi', time);
}

rAF(tick);
