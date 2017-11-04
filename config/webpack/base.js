import { description } from '../../package.json';
import { indexHtml, mainJs, sourceDir } from '../paths';

export const htmlPluginOptions = {
  inject: false,
  template: indexHtml,
  title: description,
};

export default {
  entry: mainJs,

  module: {
    rules: [
      {
        include: sourceDir,
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },

  output: {
    filename: '[name].js',
    publicPath: '',
  },
};
