const { requestAnimationFrame: rAF } = window;

function tick(time) {
  rAF(tick);
  console.log(time);
}

rAF(tick);
