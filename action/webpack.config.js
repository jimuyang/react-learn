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
                    }
                ],
            },
            // node_modules里的css不能设置modules:true
            // modules中的包自带基础样式，不需要样式模块化引入js文件，否则class名会被编译加上hash前缀，导致样式匹配无法匹配
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: ['style-loader', 'css-loader'],
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