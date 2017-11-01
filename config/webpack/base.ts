import * as Clean from 'clean-webpack-plugin';
import { Configuration } from 'webpack';

import { build, entry, outputFilename, path, publicPath } from '../paths';

const config: Configuration = {
  entry: [entry],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  output: {
    filename: outputFilename,
    path,
    pathinfo: true,
    publicPath,
  },
  plugins: [new Clean([build])],
};

export default config;
