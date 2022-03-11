
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { glob } = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))
    Object.keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/pages\/(.*)\/index.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;

            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inject: true,
                    template: path.join(__dirname,`./src/pages/${pageName}/index.html` ),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
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
        filename: '[name].js' // 通过占位符来确保文件名称的唯一
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.(png|jpg|gif|jpeg)$/, use: 'file-loader'
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新
    ].concat(htmlWebpackPlugins),
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true
    },
    devtools:'cheap-source-map'
}