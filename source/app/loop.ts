import render from './render';
import update from './update';

export default function loop(currentTime: number, deltaTime: number): void {
  // processInput
  const state = update(currentTime, deltaTime);
  render(state);
}
