import { resolve } from 'path';

export const source = resolve('source');
export const entry = resolve(source, 'index.ts');

export const htmlFilename = 'index.html';
export const htmlTemplate = resolve(source, htmlFilename);

export const build = 'build';
export const outputFilename = 'main.js';
export const path = resolve(build);
export const publicPath = './';
