import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: ['./source/index.ts'],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: [{ loader: 'tslint-loader' }],
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: resolve('static'),
    pathinfo: true,
    publicPath: './',
  },
  plugins: [],
};

export default config;
