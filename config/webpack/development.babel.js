import { smart } from 'webpack-merge';
import HtmlPlugin from 'html-webpack-plugin';

import { sourceDir } from '../paths';
import base, { entries, htmlPluginOptions } from './base';

process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
process.env.BABEL_ENV || (process.env.BABEL_ENV = 'development');
export default smart(base, {
  devServer: {
    contentBase: sourceDir,
    port: 3000,
    stats: { colors: true },
  },

  devtool: 'cheap-eval-source-map',

  plugins: Object.keys(entries).map(
    entry => new HtmlPlugin({ chunks: [entry], filename: `${entry}.html`, ...htmlPluginOptions }),
  ),
});
