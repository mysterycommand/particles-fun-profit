import * as Clean from 'clean-webpack-plugin';
import { Configuration } from 'webpack';

import { build, buildPath, entry, outputFilename, relativePath } from '../paths';

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
    path: buildPath,
    pathinfo: true,
    publicPath: relativePath,
  },
  plugins: [new Clean([build])],
};

export default config;
