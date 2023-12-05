const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        grid: './src/assets/custom-elements/custom-grid.js',
        cell: './src/assets/custom-elements/custom-cell.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Кастомный грид',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/resource',
            },
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader",
            // },
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ],
    },
};