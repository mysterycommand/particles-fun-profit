import sr from 'seedrandom';
import { name, version } from '../../package.json';

export const random = sr(`${name}@${version}`);
export const { atan2, ceil, cos, floor, hypot, PI: π, round, sin } = Math;
export const ππ = 2 * π; // 360º
export const hπ = π / 2; // 90º

/**
 * ## saw
 * @param {Number} radians - a value in radians (clamped between 0 and ππ)
 * @return {Number} - a value between -1 and 1 for entry values between 0 and ππ
 */
export function saw(radians) {
  return (radians % ππ) / π - 1;
}

/**
 * ## tri
 * @param {Number} radians - a value in radians (clamped between 0 and ππ)
 * @return {Number} - a value between -1 and 1 for entry values between 0 and ππ
 */
export function tri(radians) {
  return 1 - 2 * Math.abs(saw(radians));
}

/**
 * ## toDegrees
 * takes an angle in radians and returns that angle in degrees
 *
 * @param {Number} radians - an angle, in radians
 * @return {Number} - that same angle, in degrees
 */
export function toDegrees(radians) {
  return radians * 180 / π;
}

/**
 * ## toRadians
 * takes an angle in degrees and returns that angle in radians
 *
 * @param {Number} degrees - an angle, in degrees
 * @return {Number} - that same angle, in radians
 */
export function toRadians(degrees) {
  return degrees * π / 180;
}
