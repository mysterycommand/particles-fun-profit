import { resolve } from 'path';

export const source = resolve('source');
export const entry = resolve(source, 'index.ts');

export const htmlFilename = 'index.html';
export const htmlTemplate = resolve(source, htmlFilename);

export const outputFilename = 'main.js';
export const path = resolve('static');
export const publicPath = './';
