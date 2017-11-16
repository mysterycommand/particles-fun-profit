import { ππ } from '../../util/math';
import { buffer, bufferContext, targetContext, w, h } from '../canvas';

import { canMeta, getMeta } from './util';

const nodeCoverage = 0.5;
const handleLengthRatio = 1.7;
const maxEdgeLength = 200;

function dot(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, ππ);
  ctx.fill();
}

export default function render({ particles }) {
  bufferContext.clearRect(0, 0, w, h);

  bufferContext.fillStyle = 'white';
  particles.forEach(p => {
    dot(bufferContext, p.px, p.py, p.r);
  });

  const root = particles.find(({ isRoot }) => isRoot);
  particles.filter(({ isRoot }) => !isRoot).forEach(p => {
    if (!canMeta(root, p, nodeCoverage, handleLengthRatio, maxEdgeLength)) return;

    const {
      pax,
      pay,
      pbx,
      pby,
      pcx,
      pcy,
      pdx,
      pdy,
      habx,
      haby,
      hbax,
      hbay,
      hcdx,
      hcdy,
      hdcx,
      hdcy,
    } = getMeta(root, p, nodeCoverage, handleLengthRatio);

    bufferContext.fillStyle = 'white';
    bufferContext.beginPath();
    bufferContext.moveTo(pax, pay);
    bufferContext.bezierCurveTo(habx, haby, hbax, hbay, pbx, pby);
    bufferContext.lineTo(pcx, pcy);
    bufferContext.bezierCurveTo(hcdx, hcdy, hdcx, hdcy, pdx, pdy);
    bufferContext.fill();

    // bufferContext.fillStyle = 'rgba(255,0,0,0.5)';
    // dot(bufferContext, pax, pay, 5);
    // dot(bufferContext, pbx, pby, 5);
    // dot(bufferContext, pcx, pcy, 5);
    // dot(bufferContext, pdx, pdy, 5);

    // bufferContext.fillStyle = 'rgba(0,255,0,0.5)';
    // dot(bufferContext, habx, haby, 5);
    // dot(bufferContext, hbax, hbay, 5);
    // dot(bufferContext, hcdx, hcdy, 5);
    // dot(bufferContext, hdcx, hdcy, 5);
  });

  targetContext.clearRect(0, 0, w, h);
  targetContext.drawImage(buffer, 0, 0);
}
