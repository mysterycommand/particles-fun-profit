import objectPool from '../../../../lib/object-pool';
import particleField from '../../../../lib/particle-field';

import initialize from './initialize';

const size = 8;
const props = {};
const scrollItemPool = objectPool(size, props);

const store = [];

function isInBounds(top, bottom, p) {
  return top < p.bottom && p.top < bottom;
}

const scrollItemField = particleField(scrollItemPool, {
  activator: ({ scrollTop, clientHeight /* , scrollHeight, scrollBottom */ }) => {
    let lastTop = store.reduce((top, s) => (top + s ? s.top : 0), 0);
    while (lastTop < scrollTop + clientHeight) {
      store.push(initialize({ active: false }, lastTop));
      lastTop = store.reduce((top, s) => (top + s ? s.top : 0), 0);
    }
    console.log(store);

    return p => {
      if (p.active) return;
      const s = store
        .filter(s => isInBounds(scrollTop, scrollTop + clientHeight, s))
        .sort((a, b) => a.top - b.top)
        .find(({ active }) => !active);

      p = s;
      p.active = true;
    };
  },

  integrator: () => {
    return () => {};
  },

  deactivator: ({ scrollTop, clientHeight }) => {
    return p => {
      p.active = isInBounds(scrollTop, scrollTop + clientHeight, p);
    };
  },
});

export default scrollItemField;
