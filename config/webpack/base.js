import { NoEmitOnErrorsPlugin } from 'webpack';

import { description } from '../../package.json';
import {
  indexHtml,
  fireworksJs,
  metaballsJs,
  reactMetaballsJsx,
  infiniteScrollJsx,
  sourceDir,
} from '../paths';

export const htmlPluginOptions = {
  inject: false,
  template: indexHtml,
  title: description,
};

const jsxRule = {
  exclude: /node_modules/,
  include: sourceDir,
  test: /\.jsx?$/,
};

export const entries = {
  fireworks: ['babel-polyfill', fireworksJs],
  metaballs: ['babel-polyfill', metaballsJs],
  'react-metaballs': ['babel-polyfill', reactMetaballsJsx],
  'infinite-scroll': ['babel-polyfill', infiniteScrollJsx],
};

export default {
  entry: entries,

  module: {
    rules: [
      {
        ...jsxRule,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true,
            configFile: '.eslintrc.json',
          },
        },
      },
      {
        ...jsxRule,
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

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
