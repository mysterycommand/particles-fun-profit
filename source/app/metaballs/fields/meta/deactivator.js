// import { w, h } from '../../../canvas';
const w = 400;
const h = 225;

function isInBounds({ px, py }) {
  const leftRight = -w < px && px < w;
  const topBottom = -h < py && py < h;

  return leftRight && topBottom;
}

export default function deactivator(/* state */) {
  return p => {
    p.active = isInBounds(p);
  };
}
