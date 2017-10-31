import { Configuration } from 'webpack';

const config: Configuration = {
  entry: ['./source/index.ts'],
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'tslint-loader',
        test: /\.ts$/,
      },
    ],
  },
  output: {
    filename: './static/main.js',
    pathinfo: true,
    publicPath: '/',
  },
};

export default config;
