export default function objectPool(size = 1) {
  const pool = Array(size)
    .fill(true)
    .map(() => ({
      active: false,
    }));

  return {
    get active() {
      return pool.filter(({ active }) => active);
    },

    initialize(fn) {
      pool.forEach(fn);
    },

    activate(fn) {
      pool.filter(({ active }) => !active).forEach(fn);
    },

    update(fn) {
      pool.forEach(fn);
    },

    deactivate(fn) {
      pool.filter(({ active }) => active).forEach(fn);
    },
  };
}
