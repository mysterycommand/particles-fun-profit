import { CheckerPlugin } from 'awesome-typescript-loader';
import * as Html from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

import base from './base';
const config: Configuration = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CheckerPlugin(),
    new Html({
      filename: 'static/index.html',
      inject: false,
      template: './source/index.html',
      title: 'Particle Systems for Fun and Profit',
    }),
  ],
};

export default smart(base, config);
