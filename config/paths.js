import { resolve } from 'path';

const dir = __dirname;

export const sourceDir = resolve(dir, '..', 'source');
export const fireworksJs = resolve(sourceDir, 'fireworks.js');
export const metaballsJs = resolve(sourceDir, 'metaballs.js');
export const reactMetaballsJsx = resolve(sourceDir, 'react-metaballs.jsx');
export const infiniteScrollJsx = resolve(sourceDir, 'infinite-scroll.jsx');
export const indexHtml = resolve(sourceDir, 'index.html');
