const path = require('path');
const MiniCssExtractCss= require('mini-css-extract-plugin')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js' // 通过占位符来确保文件名称的唯一
    },
    mode: 'production',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]_[hash:8].[ext]',
                        limit: 10240
                    }
                }
            }]
    },
    plugins: [
        new MiniCssExtractCss({
            filename:'[name]_[contenthash:8].css'
        })
    ]
   
}