import * as Html from 'html-webpack-plugin';
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
    pathinfo: true,
    publicPath: './',
  },
  plugins: [
    new Html({
      filename: 'static/index.html',
      template: './source/index.html',
      title: 'Particle Systems for Fun and Profit',
    }),
  ],
};

export default config;
