const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app/index.js',
        search: './src/search/index.js'
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
                test: /.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']
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
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
            attributes: {
                id: "target",
                "data-target": "example",
            },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/search/index.html'),
            filename: 'search.html',
            chunks: ['search'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/app/index.html'),
            filename: 'app.html',
            chunks: ['app'],
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            }
        })
    ]

}