/**
 * Created by netre on 15.12.2016.
 */
'use strict';
let BabiliPlugin = require("babili-webpack-plugin");
let path = require('path');

module.exports = {
    entry: {
        'car.es2015.prod': './app/car.ts'
    },

    output: {
        path: './dist',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'ts-loader?configFileName=tsconfig.es2015.json'
            }
        ]
    },

    plugins: [
        new BabiliPlugin()
    ],

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        extensions: ['.ts', '.js']
    },

    devtool: false
};