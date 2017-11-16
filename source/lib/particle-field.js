function isActive({ active }) {
  return active;
}

export default function particleField(pool, { activator, integrator, deactivator }) {
  return {
    update(state) {
      const activate = activator(state);
      const integrate = integrator(state);
      const deactivate = deactivator(state);
      const update = p => {
        activate(p);
        integrate(p);
        deactivate(p);
      };

      pool.forEach(update);
    },

    get active() {
      return pool.filter(isActive);
    },

    get size() {
      return pool.length;
    },
  };
}
