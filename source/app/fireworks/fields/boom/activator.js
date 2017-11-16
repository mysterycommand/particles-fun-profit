import initialize from './initialize';

const maxToActivate = 500;
const minToActivate = 0;
let numActivated = 0;

export default function activator(state) {
  const { boomX, boomY, shouldBoom } = state;

  const numToActivate = shouldBoom ? maxToActivate : minToActivate;
  if (shouldBoom) numActivated = 0;

  return p => {
    if (p.active || numActivated > numToActivate) return;

    initialize(p, boomX, boomY);
    p.active = true;

    numActivated++;
  };
}
