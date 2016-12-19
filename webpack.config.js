var path = require('path');
var webpack = require('webpack');

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
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ["src", "node_modules"],

    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: path.join(__dirname, 'src')
        },
            {
                test: /\.scss?$/,
                loader: 'css-loader',

                include:path.join(__dirname,'src')
            },
            {
                test: /\.less?$/,
                loader: 'style-loader!css-loader!less-loader',
                include:__dirname
            }

        ]
    }
}
;
