export default function objectPool(size = 1) {
  return Object.freeze(
    Array(size)
      .fill(true)
      .map(() => ({
        active: false,
      })),
  );
}
