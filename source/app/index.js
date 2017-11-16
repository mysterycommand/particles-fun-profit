import fields from './demos/fireworks/fields';

export { getState } from './demos/fireworks';

export function update(state) {
  fields.forEach(field => {
    field.update(state);
  });
}

export function getActive() {}

export function render() {}
