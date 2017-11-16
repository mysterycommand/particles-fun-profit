import { NoEmitOnErrorsPlugin } from 'webpack';

import { description } from '../../package.json';
import { indexHtml, mainJsx, sourceDir } from '../paths';

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

export default {
  entry: ['babel-polyfill', mainJsx],

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
