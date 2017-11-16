const hw = 400;
const hh = 225;

function isInBounds({ px, py }) {
  const leftRight = -hw < px && px < hw;
  const topBottom = -hh < py && py < hh;

  return leftRight && topBottom;
}

export default function deactivator({ w, h }) {
  return p => {
    p.active = isInBounds(p, w, h);
  };
}
