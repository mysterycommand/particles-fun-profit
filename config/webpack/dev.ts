import { CheckerPlugin } from 'awesome-typescript-loader';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

import base from './base';
const config: Configuration = {
  devtool: 'cheap-module-source-map',
  plugins: [new CheckerPlugin()],
};

export default smart(base, config);
