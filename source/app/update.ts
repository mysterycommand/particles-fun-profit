import { State } from './state';

export default function update(currentTime: number, deltaTime: number): State {
  return {
    currentTime,
    deltaTime,
  };
}
