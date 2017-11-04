import { smart } from 'webpack-merge';
import HtmlPlugin from 'html-webpack-plugin';

import { sourceDir } from '../paths';
import base, { htmlPluginOptions } from './base';

process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.BABEL_ENV || (process.env.BABEL_ENV = 'development');
export default smart(base, {
  devServer: {
    contentBase: sourceDir,
    port: 3000,
    stats: { colors: true },
  },

  devtool: 'cheap-eval-source-map',

  plugins: [new HtmlPlugin(htmlPluginOptions)],
});
