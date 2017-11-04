import { smart } from 'webpack-merge';

import { source } from '../paths';
import base from './base';

process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.BABEL_ENV || (process.env.BABEL_ENV = 'development');
export default smart(base, {
  devServer: {
    contentBase: source,
    stats: { colors: true },
  },

  devtool: 'cheap-eval-source-map',
});
