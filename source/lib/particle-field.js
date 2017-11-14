export default function particleField(pool, { activate, integrate, deactivate, render }) {
  return {
    activate() {
      pool.forEach(activate);
    },

    integrate() {
      pool.forEach(integrate);
    },

    deactivate() {
      pool.forEach(deactivate);
    },

    render() {
      pool.forEach(render);
    },
  };
}
