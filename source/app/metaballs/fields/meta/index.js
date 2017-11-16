import objectPool from '../../../../lib/object-pool';
import particleField from '../../../../lib/particle-field';

import initialize from './initialize';
import activator from './activator';
import integrator from './integrator';
import deactivator from './deactivator';

const size = 8;
const props = initialize({ active: false });
const metaPool = objectPool(size, props);

const metaField = particleField(metaPool, { activator, integrator, deactivator });
export default metaField;
