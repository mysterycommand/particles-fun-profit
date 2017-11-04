import { resolve } from 'path';

const dir = __dirname;

export const sourceDir = resolve(dir, '..', 'source');
export const mainJs = resolve(sourceDir, 'main.js');
