import scrollItemField from './fields/scroll-item';

export function update(state) {
  scrollItemField.update(state);
}

export function getActive() {
  const set = new Set();
  scrollItemField.active.forEach(item => set.add(item));
  return [...set];
}
