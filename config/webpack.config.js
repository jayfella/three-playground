const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: path.resolve(SRC_PATH, 'index.ts'),
    mode: 'development',
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test:  /\.(json|obj|png|svg|ico)$/,
                loader: 'url-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.obj', '.json', '.png'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_PATH, 'index.html'),
            filename: 'index.html',
            inject: 'body',

        }),

    ],

    output: {
        path: DIST_PATH,
        filename: '[name].js',
    },
};
