import { smart } from 'webpack-merge';
import { NamedModulesPlugin } from 'webpack';

import { sourceDir } from '../paths';
import base from './base';

process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.BABEL_ENV || (process.env.BABEL_ENV = 'development');
export default smart(base, {
  devServer: {
    contentBase: sourceDir,
    port: 3000,
    stats: { colors: true },
  },

  devtool: 'cheap-eval-source-map',

  plugins: [new NamedModulesPlugin()],
});
