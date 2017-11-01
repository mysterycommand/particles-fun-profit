import * as Html from 'html-webpack-plugin';
import * as UglifyJs from 'uglifyjs-webpack-plugin';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';

import { htmlFilename, htmlTemplate } from '../paths';
import base from './base';

const config: Configuration = {
  devtool: 'source-map',

  plugins: [
    new Html({
      filename: htmlFilename,
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
      template: htmlTemplate,
      title: 'Particle Systems for Fun and Profit',
    }),

    new UglifyJs({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          comparisons: false,
          warnings: false,
        },
        ecma: 5,
        mangle: { safari10: true },
        output: {
          ascii_only: true,
          comments: false,
        },
      },
    }),
  ],
};

export default smart(base, config);
