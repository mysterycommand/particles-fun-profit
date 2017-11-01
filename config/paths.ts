import { resolve } from 'path';

export const source = 'source';
export const build = 'build';

export const sourcePath = resolve(source);
export const buildPath = resolve(build);

export const htmlFilename = 'index.html';
export const outputFilename = 'main.js';

export const entry = resolve(source, 'index.ts');
export const htmlTemplate = resolve(source, htmlFilename);
