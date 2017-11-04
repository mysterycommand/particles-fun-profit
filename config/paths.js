import { resolve } from 'path';

const dir = __dirname;

export const source = resolve(dir, '..', 'source');
export const main = resolve(source, 'main.js');
