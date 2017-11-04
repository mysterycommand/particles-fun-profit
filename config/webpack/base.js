import { NoEmitOnErrorsPlugin } from 'webpack';

import { description } from '../../package.json';
import { indexHtml, mainJs, sourceDir } from '../paths';

export const htmlPluginOptions = {
  inject: false,
  template: indexHtml,
  title: description,
};

const jsRule = {
  exclude: /node_modules/,
  include: sourceDir,
  test: /\.js$/,
};

export default {
  entry: ['babel-polyfill', mainJs],

  module: {
    rules: [
      {
        ...jsRule,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true,
          },
        },
      },
      {
        ...jsRule,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    filename: '[name].js',
    publicPath: '',
  },

  plugins: [new NoEmitOnErrorsPlugin()],
};
