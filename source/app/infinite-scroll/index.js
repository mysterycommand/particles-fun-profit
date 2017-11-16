import scrollItemField from './fields/scroll-item';

export function update(state) {
  scrollItemField.update(state);
}

export function getActive() {
  return scrollItemField.active;
}
