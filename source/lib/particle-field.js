function isActive({ active }) {
  return active;
}

export default function particleField(pool, { activator, integrator, deactivator }) {
  return {
    update(state) {
      const activate = activator(state);
      const integrate = integrator(state);
      const deactivate = deactivator(state);

      pool.forEach(p => {
        activate(p);
        integrate(p);
        deactivate(p);
      });
    },

    get active() {
      return pool.filter(isActive);
    },

    get size() {
      return pool.length;
    },
  };
}
