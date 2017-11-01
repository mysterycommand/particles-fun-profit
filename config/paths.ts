import { resolve } from 'path';

export const source = 'source';
export const sourcePath = resolve(source);

export const entry = resolve(source, 'index.ts');
export const outputFilename = 'main.js';

export const htmlFilename = 'index.html';
export const htmlTemplate = resolve(source, htmlFilename);

export const build = 'build';
export const buildPath = resolve(build);

export const relativePath = './';
