const { freeze } = Object;

export default function objectPool(ofSize = 1, withProps = {}) {
  return freeze(
    Array(ofSize)
      .fill()
      .map(() => ({
        ...withProps,
      })),
  );
}
