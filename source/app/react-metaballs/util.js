import { abs, acos, atan2, cos, hypot, min, π, hπ, sin } from '../../util/math';

function getIntersect(ar, br, dab) {
  const arsq = ar * ar;
  const brsq = br * br;

  const dabsq = dab * dab;
  const dab2 = dab * 2;

  return (arsq + dabsq - brsq) / dab2;
}

function getOverlap(ra, rb, dab) {
  const ai = getIntersect(ra, rb, dab);
  const bi = getIntersect(rb, ra, dab);

  const ap = ai / ra;
  const bp = bi / rb;

  return [acos(ap), acos(bp)];
}

function getAngles(apx, apy, ar, bpx, bpy, br, dab, nodeCoverage) {
  const [au, bu] = ar + br > dab ? getOverlap(ar, br, dab) : [0, 0];

  const aab = atan2(bpy - apy, bpx - apx);
  const pab = acos((ar - br) / dab);

  return {
    aa: aab + au + (pab - au) * nodeCoverage,
    ab: aab - au - (pab - au) * nodeCoverage,
    ac: aab + π - bu - (π - bu - pab) * nodeCoverage,
    ad: aab - π + bu + (π - bu - pab) * nodeCoverage,
  };
}

function getPoints(angles, apx, apy, ar, bpx, bpy, br) {
  const { aa, ab, ac, ad } = angles;

  return {
    pax: apx + cos(ab) * ar,
    pay: apy + sin(ab) * ar,
    pbx: bpx + cos(ad) * br,
    pby: bpy + sin(ad) * br,
    pcx: bpx + cos(ac) * br,
    pcy: bpy + sin(ac) * br,
    pdx: apx + cos(aa) * ar,
    pdy: apy + sin(aa) * ar,
  };
}

function getHandles(angles, points, ar, br, dab, nodeCoverage, handleLengthRatio) {
  const { aa, ab, ac, ad } = angles;
  const { pax, pay, pbx, pby, pcx, pcy, pdx, pdy } = points;

  const rc = ar + br;
  const e = min(nodeCoverage * handleLengthRatio, hypot(pbx - pax, pby - pay) / rc);
  const f = e * min(1, dab * 2 / rc);

  const rd = ar * f;
  const re = br * f;

  return {
    habx: pax + cos(ab + hπ) * rd,
    haby: pay + sin(ab + hπ) * rd,
    hbax: pbx + cos(ad - hπ) * re,
    hbay: pby + sin(ad - hπ) * re,
    hcdx: pcx + cos(ac + hπ) * re,
    hcdy: pcy + sin(ac + hπ) * re,
    hdcx: pdx + cos(aa - hπ) * rd,
    hdcy: pdy + sin(aa - hπ) * rd,
  };
}

export function canMeta(source, target, nodeCoverage, handleLengthRatio, maxEdgeLength) {
  const { px: apx, py: apy, r: ar } = source;
  const { px: bpx, py: bpy, r: br } = target;
  const dab = hypot(bpx - apx, bpy - apy);

  const isRadiusZero = ar <= 0 || br <= 0;

  const isCompletelyInsideSource = abs(ar - br) >= dab;

  const isOutsideMaxEdgeLength = dab > maxEdgeLength;

  return !isRadiusZero && !isCompletelyInsideSource && !isOutsideMaxEdgeLength;
}

export function getMeta(source, target, nodeCoverage, handleLengthRatio) {
  const { px: apx, py: apy, r: ar } = source;
  const { px: bpx, py: bpy, r: br } = target;
  const dab = hypot(bpx - apx, bpy - apy);

  const angles = getAngles(apx, apy, ar, bpx, bpy, br, dab, nodeCoverage);
  const points = getPoints(angles, apx, apy, ar, bpx, bpy, br);
  const handles = getHandles(angles, points, ar, br, dab, nodeCoverage, handleLengthRatio);

  return {
    ...points,
    ...handles,
  };
}
