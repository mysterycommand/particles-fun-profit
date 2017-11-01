import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

import base from './base';
const config: Configuration = {
  devtool: 'source-map',
};

export default smart(base, config);
