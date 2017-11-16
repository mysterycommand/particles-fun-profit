import { resolve } from 'path';

const dir = __dirname;

export const sourceDir = resolve(dir, '..', 'source');
export const mainJs = resolve(sourceDir, 'main.js');
export const mainJsx = resolve(sourceDir, 'main.jsx');
export const indexHtml = resolve(sourceDir, 'index.html');
