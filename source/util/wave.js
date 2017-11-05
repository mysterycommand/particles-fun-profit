import { ππ, sin, cos } from './math';

/**
 * ## getWaveFn
 * this utility function returns a wave function that takes a timestamp
 * (optionally offset by `o`) and returns a value between `min` and `max` for
 * the period `p`
 *
 * @param {Function} fn - the function to generate the wave (takes a value in
 * radians and returns a value between -1 and 1 at some interval)
 * @param {Number} p - the period for this wave (in milliseconds)
 * @param {Number} min - the minimum value for the generated wave
 * @param {Number} max - the maximum value for the generated wave
 * @param {Number} o - an optional offset (in milliseconds) at which to start
 * the wave
 *
 * @return {Function} - a wave function that takes a timestamp (optionally
 * offset by `o`) and returns a value between `min` and `max` for the period `p`
 */
export function getWaveFn(fn, p = 1000, min = -1, max = 1, o = 0) {
  // peak amplitude (not peak-to-peak amplitude)
  // @see https://en.wikipedia.org/wiki/Amplitude
  const amp = (max - min) / 2;

  // radians per period (angular frequency)
  // @see https://en.wikipedia.org/wiki/Angular_frequency
  const rpp = ππ / p;

  return ts => {
    // offset timestamp
    const ots = o + ts;
    return amp * (1 + fn(ots * rpp)) + min;
  };
}

/**
 * ## getStepFn
 * this utility function returns a step function (like a integer-only wave
 * function) that takes a timestamp (optionally offset by `o`) and returns an
 * integer value between `min` and `max` for the period `p`
 *
 * @param {Function} fn - the function to generate the stepped wave (takes a
 * value in radians and returns a value between -1 and 1 at some interval)
 * @param {Number} p - the period for this wave (in milliseconds)
 * @param {Number} min - the minimum value for the generated wave
 * @param {Number} max - the maximum value for the generated wave
 * @param {Number} o - an optional offset (in milliseconds) at which to start
 * the wave
 *
 * @return {Function} - a wave function that takes a timestamp (optionally
 * offset by `o`) and returns an integer value between `min` and `max` for the
 * period `p`
 */
export function getStepFn(fn, p = 1000, min = -1, max = 1, o = 0) {
  // the root wave function that generates a value between min and max over
  // a period p and optionally offset by o
  const waveFn = getWaveFn(fn, p, min, max, o);

  // just floors the result of the above function
  return ts => Math.floor(waveFn(ts));
}

/**
 * ## getSinFn
 * returns a sine wave function that takes a timestamp (optionally offset by
 * `o`) and returns a value between `min` and `max` for the period `p`
 *
 * @param {Number} p - the period for this sine wave (in milliseconds)
 * @param {Number} min - the minimum value for the generated sine wave
 * @param {Number} max - the maximum value for the generated sine wave
 * @param {Number} o - an optional offset (in milliseconds) at which to start
 * the sine wave
 *
 * @return {Function} - a sine wave function that takes a timestamp (optionally
 * offset by `o`) and returns a value between `min` and `max` for the period `p`
 */
export function getSinFn(p = 1000, min = -1, max = 1, o = 0) {
  return getWaveFn(sin, p, min, max, o);
}

/**
 * ## getCosFn
 * returns a cosine wave function that takes a timestamp (optionally offset by
 * `o`) and returns a value between `min` and `max` for the period `p`
 *
 * @param {Number} p - the period for this cosine wave (in milliseconds)
 * @param {Number} min - the minimum value for the generated cosine wave
 * @param {Number} max - the maximum value for the generated cosine wave
 * @param {Number} o - an optional offset (in milliseconds) at which to start
 * the cosine wave
 *
 * @return {Function} - a cosine wave function that takes a timestamp
 * (optionally offset by `o`) and returns a value between `min` and `max` for
 * the period `p`
 */
export function getCosFn(p = 1000, min = -1, max = 1, o = 0) {
  return getWaveFn(cos, p, min, max, o);
}
