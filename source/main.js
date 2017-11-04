const { requestAnimationFrame: rAF } = window;
function tick(time) {
  // rAF(tick);
  // eslint-disable-next-line no-console
  console.log(time);
}
rAF(tick);
