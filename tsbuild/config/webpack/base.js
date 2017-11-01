import * as Clean from 'clean-webpack-plugin';
import { build, buildPath, entry, outputFilename } from '../paths';
const config = {
    cache: true,
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
        publicPath: './',
    },
    plugins: [new Clean([build])],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
export default config;
//# sourceMappingURL=base.js.map