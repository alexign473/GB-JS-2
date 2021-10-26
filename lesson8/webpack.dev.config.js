const path = require('path');
const HtmlWebpackPlagin = require('html-webpack-plugin');
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
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlagin({
            template: 'src/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
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