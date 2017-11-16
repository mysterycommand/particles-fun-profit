function isActive({ active }) {
  return active;
}

export default function particleField(pool, { activator, integrator, deactivator }) {
  return {
    update(state) {
      const activate = activator(state);
      const integrate = integrator(state);
      const deactivate = deactivator(state);

      const updateEach = (...args) => {
        activate(...args);
        integrate(...args);
        deactivate(...args);
      };

      pool.forEach(updateEach);
    },

    get active() {
      return pool.filter(isActive);
    },

    get size() {
      return pool.length;
    },
  };
}
