import { main, source } from '../paths';

export default {
  entry: main,

  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: source,
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
