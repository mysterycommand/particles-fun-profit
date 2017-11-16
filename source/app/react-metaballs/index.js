import metaField from './fields/meta';

export function getState() {
  return {};
}

export function update(state, currentTime, deltaTime) {
  metaField.update({
    ...state,
    deltaTime,
  });
}

export function getActive() {
  return metaField.active;
}

export function getSize() {
  return metaField.size;
}
