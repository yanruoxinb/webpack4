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

#### Mode
1. `production` 默认值
- 设置 `process.env.NODE_ENV` 的值为 `production`，开启代码压缩
2. `development`
- 开启`NamedChunksPlugin` 和 `NamedModulesPlugin` 等插件
3. `none`
- 不开启任何优化选项

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


#### `loader`

#### `plugins`

#### 解析 `ES6` 和 `React JSX`


```bash
 npm i @babel/core @babel/preset-env babel-loader -D
 npm i react react-dom @preset-react -D  
```

#### 文件指纹

1. Hash
> 和整个项目的构建相关，只要项目文件有修改，整个项目的`hash`值就会更改
2. ChunkHash
> 和 `webpack` 打包的`chunk`相关，不同的`entry`会生成不同的`chunkhash`值
3. ContentHash
> 根据文件内容来定义hash，文件内容不变，则 `contenthash` 不变


