function isActive({ active }) {
  return active;
}

export default function particleField(pool, { activate, integrate, deactivate }) {
  return {
    update(state) {
      pool.forEach(p => {
        activate(state, p);
        integrate(state, p);
        deactivate(state, p);
      });
    },

    get active() {
      return pool.filter(isActive);
    },
  };
}
