import { CheckerPlugin } from 'awesome-typescript-loader';
import * as Html from 'html-webpack-plugin';
import { HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';
import { smart } from 'webpack-merge';
import { buildPath, htmlFilename, htmlTemplate } from '../paths';
import base from './base';
const config = {
    devServer: {
        contentBase: buildPath,
        hot: true,
        port: 3000,
        publicPath: '/',
    },
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
        new HotModuleReplacementPlugin(),
    ],
};
export default smart(base, config);
//# sourceMappingURL=dev.js.map