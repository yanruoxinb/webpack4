# Webpack
## 一切皆模块
## 作用
- 转换 `ES6` 语法
- 转换 `JSX`
- `CSS` 前缀补全/预处理器
- 压缩混淆
- 图片压缩

## 安装
```bash
npm install webpack webpack-cli --save-dev
```
 > 查看是否安装成功
```bash
./node_modules/.bin/webpack -v
```
#### entry
- 打包文件的入口

1. 单入口：entry 是一个字符串

```javascript
entry:'./path/to/my/entry.js'
```
2. 多入口：entrry 是一个对象
```javascript
entry:{
    app:'./src/index.js',
    adminApp:'./src/adminApp.js'
}
```

#### output
- 如何将编译后的文件输出到磁盘
1. 单入口
```js
output:{
    path: path.join(__dirname, 'dist'), 
    filename:'boundle.js'
}
```
2. 多入口
```js　　　　　　　　　　　　　　　　　　　　　　　　　　
output:{
    path: path.join(__dirname, 'dist'), 
    filename:'[name].js' // 通过占位符来确保文件名称的唯一
}
```

#### `loaders`
- 本身是一个函数，接受源文件作为参数，返回转换的结果

###### 常见的 `loaders`
1. bable-loader: 转换 `ES6`,`ES7` 等js新特性语法
2. css-loader: 支持 `.css` 文件的加载和解析
3. less-loader: 将 `less` 转换成 `css`
4. ts-loader: 将 `ts` 转换成 `js`
5. file-loader: 进行图片，字体等的打包
6. raw-loader: 将文件以字符串的形式导入
7. thread-loader: 多进程打包 `JS` 和 `CSS`

#### `plugins`
- `bundle` 文件的优化，资源管理和环境变量的注入，作用于这个构建过程
###### 常见的 `plugins`
1. `CommonChunkPlugin`: 将 `chunks` 相同的模块代码提取成公共js 
2. `CleanWebpackPlugin`: 清理构建目录 
3. `ExtractTextWebpackPlugin`: 将 `CSS` 从 `bunlde` 文件里提取成一个独立的CSS 文件
4. `CopyWebpackPlugin`: 将文件或者文件夹拷贝到构建的输出目录 
5. `HtmlWebpackPlugin`: 创建 `html` 文件去承载输出的 `bundle `
6. `UglifyjsWebpackPlugin`: 压缩 `JS `
7. `ZipWebpackPlugin`: 将打包出的资源生成一个 `zip` 包
8. `OptimizeAssets`
9. `MiniCssExtractPlugin`:会将 `CSS` 提取到单独的文件中，为每个包含 `CSS` 的 `JS` 文件创建一个 `CSS` 文件，并且支持 `CSS` 和 `SourceMaps` 的按需加载。
10. `CleanWebpackPlugin` : 构建前删除原来的目录
#### Mode
1. `production` 默认值
- 设置 `process.env.NODE_ENV` 的值为 `production`，开启代码压缩
2. `development`
- 开启`NamedChunksPlugin` 和 `NamedModulesPlugin` 等插件
3. `none`
- 不开启任何优化选项

#### 解析 `ES6` 和 `React JSX`
- 使用 `babel-laoder`,配置文件 `.babelrc`文件

```bash
 npm i @babel/core @babel/preset-env babel-loader -D
 npm i react react-dom @babel/preset-react -D  
```

#### 热更新
1. watch:true
2. HotModuleReplacementPlugin 
> HMR 绝对不能被用在生产环境。

3. webpack-dev-middleware

#### 文件指纹

1. Hash
> 和整个项目的构建相关，只要项目文件有修改，整个项目的 `hash` 值就会更改
2. ChunkHash
> 和 `webpack` 打包的`chunk`相关，不同的`entry`会生成不同的 `chunkhash` 值
3. ContentHash
> 根据文件内容来定义hash，文件内容不变，则 `contenthash` 不变

###### 指纹设置的符号标识
1. [ext] : 资源后缀名
2. [name] : 文件名称
3. [path] : 文件的相对路径
4. [folder] : 文件所在的文件夹
5. [contenthash]: 文件的内容hash,默认是 `md5`生成
6. [hash]
7. [emoji] : 一个随机的指代文件内容的 `emoji`

#### 移动端 `px` 转换成 `rem`
```bash
 npm i px2rem-loader -D
 npm i lib-flexible -S    

```
添加 `loader` :

```js
    {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75,
            remPrecesion: 8 //小数点位数
        }
    }
```



