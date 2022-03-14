const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const { glob } = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))
    Object
        .keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/pages\/(.*)\/index.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inject: true,
                    template: path.join(__dirname, `./src/pages/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    }
                }))
        })

    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js', // 通过占位符来确保文件名称的唯一
        clean: true // v5
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    { loader: "./loaders/test-loader.js" }
                ]
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }, {
                test: /.less$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader', {
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
                                        browsers: ['last 2 version', '>1%', 'ios 7'],
                                        // autoprefixer: { grid: true }
                                    },
                                ],
                            ],
                        },
                    }
                }, {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecesion: 8 //小数点位数
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
            // attributes: {
            //     id: "target",
            //     "data-target": "example",
            // },
        }),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        //             global: 'ReactDOM',
        //         },
        //     ],
        // }),


        /**
         * webpack4是使用该插件来实现的，webpack5只需要在output的时候添加 clean:true
         */
        // new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 1000,
            minRemainingSize: 0,
            minChunks: 5,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                // defaultVendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     priority: -10,
                //     reuseExistingChunk: true,
                // },
                commons: {
                    // test: /(react|react-dom)/,
                    name: 'commons',
                    chunks: 'all',

                },
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true,
                // },
            },
        },
    },
    devtool: 'source-map'

}