import * as Html from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

import base from './base';
const config: Configuration = {
  devtool: 'source-map',
  plugins: [
    new Html({
      filename: 'static/index.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './source/index.html',
      title: 'Particle Systems for Fun and Profit',
    }),
  ],
};

export default smart(base, config);
