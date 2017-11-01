import { CheckerPlugin } from 'awesome-typescript-loader';
import * as Html from 'html-webpack-plugin';
import { Configuration, NamedModulesPlugin } from 'webpack';
import { smart } from 'webpack-merge';

import { htmlFilename, htmlTemplate } from '../paths';
import base from './base';

const config: Configuration = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CheckerPlugin(),
    new Html({
      filename: htmlFilename,
      inject: false,
      template: htmlTemplate,
      title: 'Particle Systems for Fun and Profit',
    }),
    new NamedModulesPlugin(),
  ],
};

export default smart(base, config);
