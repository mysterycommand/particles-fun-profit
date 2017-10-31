import { Configuration } from 'webpack';

const config: Configuration = {
  entry: ['./source/index.ts'],
  output: {
    filename: './static/main.js',
    pathinfo: true,
    publicPath: '/',
  },
};

export default config;
