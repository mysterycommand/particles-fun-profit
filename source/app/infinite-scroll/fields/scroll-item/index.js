import objectPool from '../../../../lib/object-pool';
import particleField from '../../../../lib/particle-field';

import initialize from './initialize';

const size = 8;
const props = initialize({ active: false });
const scrollItemPool = objectPool(size, props);

const scrollItemField = particleField(scrollItemPool, {
  activator: (/* state */) => {
    // do something with state
    return (/* p */) => {};
  },

  integrator: (/* state */) => {
    // do something with state
    return (/* p */) => {};
  },

  deactivator: (/* state */) => {
    // do something with state
    return (/* p */) => {};
  },
});

export default scrollItemField;
