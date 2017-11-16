import objectPool from '../../../../lib/object-pool';
import particleField from '../../../../lib/particle-field';

import initialize from './initialize';

const size = 8;
const props = initialize({ active: false });
const scrollItemPool = objectPool(size, props);

const store = [];
let lastTop = 10;

function isInBounds(top, bottom, p) {
  return top < p.bottom && p.top < bottom;
}

const scrollItemField = particleField(scrollItemPool, {
  activator: ({ scrollTop, clientHeight }) => {
    const viewTop = scrollTop;
    const viewBottom = scrollTop + clientHeight;
    const storedInBounds = store.filter(s => isInBounds(viewTop, viewBottom, s));

    return p => {
      if (p.active) return;

      if (lastTop < viewBottom) {
        initialize(p, lastTop);
        lastTop += p.height + 10;
        store.push({ ...p, active: true });
      } else {
        const s = storedInBounds.find(({ active }) => !active);

        if (s) {
          p.top = s.top;
          p.height = s.height;
          p.bottom = s.bottom;
          p.background = s.background;

          s.active = true;
        }
      }

      p.active = true;
    };
  },

  integrator: () => {
    return () => {};
  },

  deactivator: ({ scrollTop, clientHeight }) => {
    const viewTop = scrollTop;
    const viewBottom = scrollTop + clientHeight;
    store.filter(s => !isInBounds(viewTop, viewBottom, s)).forEach(s => (s.active = false));

    return p => {
      p.active = isInBounds(scrollTop, scrollTop + clientHeight, p);
    };
  },
});

export default scrollItemField;
