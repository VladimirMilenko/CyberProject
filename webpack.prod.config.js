/**
 * Created by netre on 14.12.2016.
 */
var path = require('path');
var webpack = require('webpack');
const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: false,
    entry: {
        main: path.join(__dirname,'./src/index')
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyPlugin({
            sourceMap:false,
            beautify: false, //prod
            output: {
                comments: false
            }, //prod
            mangle: {
                screw_ie8: true
            }, //prod
            compress: {
                warnings: true,
        }})
    ],
    resolve: {
        extensions: ['.ts','.tsx', '.js', '.json'],
        modules: ["src","node_modules"],

    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: path.join(__dirname, 'src')
        }]
    }
};
