import objectPool from '../../../../lib/object-pool';
import particleField from '../../../../lib/particle-field';

import initialize from './initialize';
import activator from './activator';
import integrator from './integrator';
import deactivator from './deactivator';

const size = 10000;
const props = initialize({ active: false });
const boomPool = objectPool(size, props);

const boomField = particleField(boomPool, { activator, integrator, deactivator });
export default boomField;
