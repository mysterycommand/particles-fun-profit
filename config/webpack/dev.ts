import { CheckerPlugin } from 'awesome-typescript-loader';
import * as Html from 'html-webpack-plugin';
import { Configuration, NamedModulesPlugin } from 'webpack';
import { smart } from 'webpack-merge';

import base from './base';

const config: Configuration = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CheckerPlugin(),
    new Html({
      filename: 'index.html',
      inject: false,
      template: './source/index.html',
      title: 'Particle Systems for Fun and Profit',
    }),
    new NamedModulesPlugin(),
  ],
};

export default smart(base, config);
