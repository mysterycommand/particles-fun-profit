const { freeze } = Object;

/**
 * ## objectPool
 * returns a frozen array of the specified size, filled with objects assigned
 * the specified properties - the freezing simply protects us from pop/push or
 * un/shifting elements into/off of the array, it is truly fixed
 *
 * @param {number} ofSize - the size to make the array
 * @param {object} withProps - a hash of properties to assign to each item
 *
 * @return {array} - the frozen array of initialized objects
 */
export default function objectPool(ofSize = 1, withProps = {}) {
  return freeze(
    Array(ofSize)
      .fill()
      .map(() => ({
        ...withProps,
      })),
  );
}
