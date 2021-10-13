const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app/index.js',
        search: './src/search/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js', // 通过占位符来确保文件名称的唯一
        clean: true
    },
    mode: 'production',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            }, {
                test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader', {
                    loader: 'postcss-loader',
                    options: {
                        // plugins: () => [
                        //     require('autoprefixer')({
                        //         browsers:['last 2 version','>1%','ios 7']
                        //     })
                        // ]
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer",
                                    {
                                        //  browsers:['last 2 version','>1%','ios 7'],
                                        // autoprefixer: { grid: true }
                                    },
                                ],
                            ],
                        },
                    }
                }]
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
            // attributes: {
            //     id: "target",
            //     "data-target": "example",
            // },
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
        }),
        /**
         * webpack4是使用该插件来实现的，webpack5只需要在output的时候添加 clean:true
         */
        // new CleanWebpackPlugin()
    ]

}