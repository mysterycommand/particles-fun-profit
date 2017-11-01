import { Configuration } from 'webpack';

const config: Configuration = {
  entry: ['./source/index.ts'],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: [{ loader: 'tslint-loader' }],
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
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
