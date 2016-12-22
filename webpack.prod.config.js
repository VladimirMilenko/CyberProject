/**
 * Created by netre on 14.12.2016.
 */
var path = require('path');
var webpack = require('webpack');
const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


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
        },
            {
                test: /\.scss?$/,
                loader: 'style-loader?insertAt=top!css-loader?&localIdentName=[local]!sass-loader',

                include:path.join(__dirname,'src')
            },
            {
                test: /\.less?$/,
                loader: 'style-loader?insertAt=top!css-loader?localIdentName=[local]!less-loader',
                include:__dirname
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'},
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'},
            {test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}]
    }
};
