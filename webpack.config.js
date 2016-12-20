var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.scss','.ts', '.tsx', '.js', '.json'],
        modules: ["src", "node_modules"],

    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: path.join(__dirname, 'src')
        },
            {
                test: /\.scss?$/,
                loader: 'style-loader?insertAt=top!css-loader?sourceMap&&modules&importLoaders=1&insertAt=top&localIdentName=[local]!sass-loader',

                include:path.join(__dirname,'src')
            },
            {
                test: /\.less?$/,
                loader: 'style-loader?insertAt=top!css-loader?sourceMap&&modules&importLoaders=1&insertAt=top&localIdentName=[local]!less-loader',
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
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}

        ]
    }
}
;
