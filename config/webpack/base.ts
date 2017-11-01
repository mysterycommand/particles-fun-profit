import { Configuration } from 'webpack';

import { entry, outputFilename, path, publicPath } from '../paths';

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
};

export default config;
