import objectPool from '../../lib/object-pool';
import particleField from '../../lib/particle-field';
import { initialize, activate, integrate, deactivate, render } from './particles/boom';

const boomSize = 3000;
const boomProps = initialize({ active: false });
const boomPool = objectPool(boomSize, boomProps);
const boomField = particleField(boomPool, {
  activate,
  integrate,
  deactivate,
  render,
});

export default [boomField];
