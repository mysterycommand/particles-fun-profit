import { mainJs, sourceDir } from '../paths';

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
