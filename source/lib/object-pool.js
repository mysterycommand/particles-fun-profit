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

    get inactive() {
      return pool.filter(({ active }) => !active);
    },

    initialize(fn) {
      pool.forEach(fn);
    },

    update(fn) {
      pool.forEach(fn);

      // // eslint-disable-next-line no-console
      // console.log(JSON.stringify(pool, null, 2));
    },
  };
}
