const path = require('path');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    entry: {
        bundle: ["@babel/polyfill", "./src/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "#source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['url-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlagin({
            template: 'src/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new RemovePlugin({
            before: {
                // expects what your output folder is `dist`.
                test: [
                    {
                        folder: './dist',
                        method: () => true
                    }
                ],
                exclude: [
                    './dist/server'
                ]
            }
        })
    ]
};