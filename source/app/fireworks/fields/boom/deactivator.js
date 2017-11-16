import { w, h } from '../../../canvas';

function isInBounds({ px, py }) {
  const leftRight = 0 < px && px < w;
  const bottom = py < h;

  return leftRight && bottom;
}

function isVisible({ alpha }) {
  return alpha > 0.01;
}

export default function deactivator(/* state */) {
  return p => {
    p.active = isInBounds(p) && isVisible(p);
  };
}
