const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');

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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
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
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
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
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
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
                    },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true }
                    }
                ],
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: ['style-loader', 'css-loader', {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true }
                }],
            },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/', // 和output publicPath一致
        historyApiFallback: true,
        // noInfo: true
        before: function (app, server) {
            app.get('/mock/hello', function (req, resp) {
                resp.json({ 'msg': 'hello' });
            });
        }


    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
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