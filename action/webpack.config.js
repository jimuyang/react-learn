const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
        // vendor: ['react', 'react-dom']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            import: true,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    }
                ],

            },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/', // 和output publicPath一致
        historyApiFallback: true,
        // noInfo: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
            // cacheGroups: {
            //     vendor: {
            //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            //         name: 'vendor',
            //         chunks: 'all',
            //     }
            // }
        }
    }
};