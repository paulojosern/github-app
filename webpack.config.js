'use strict'
const path = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = validate({
    devtool: 'source-map',

    entry:  [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:5000',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'src', 'index'),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: ''
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
        new ExtractTextPlugin('[name]-[hash].css'),
        new htmlPlugin({
            title: 'GitHub APP',
            template: path.join(__dirname, 'src', 'html', 'template-dev.html')
        })
    ],

    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     include: /src/,
        //     loader: 'standard'
        // }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: /src/,
            loader: 'babel'
        },{
            test:/\.css$/,
            exclude: /node_modules/,
            include: /src/,
            loaders: ['style', 'css?modules']
        }]
    },
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
            components: path.join(__dirname, 'src', 'components')
        }
    }
})