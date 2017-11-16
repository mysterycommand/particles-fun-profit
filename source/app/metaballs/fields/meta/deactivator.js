import { w, h } from '../../../canvas';

function isInBounds({ px, py }) {
  const leftRight = 0 < px && px < w;
  const topBottom = 0 < py && py < h;

  return leftRight && topBottom;
}

export default function deactivator(/* state */) {
  return p => {
    p.active = isInBounds(p);
  };
}
