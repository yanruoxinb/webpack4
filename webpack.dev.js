
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/app/index.js',
        search: './src/search/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' // 通过占位符来确保文件名称的唯一
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /.css$/, use: ['style-loader', 'css-loader']
            }, {
                test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /.(png|jpg|gif|jpeg)$/, use:'file-loader'
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true
    }
}