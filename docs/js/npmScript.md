# npm scripts

参考自[阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

## npm run 

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的npm run命令。

## 使用 -- 向 npm 脚本中 传入参数

```js
npm run build --dev
```

## 规定 npm 的执行顺序

``` js
npm run a.js & npm run b.js
```

## 查看全局安装过的 npm 包

``` js
  npm list -g --depth 0
```

## npm 常用命令


| 命令           | 说明                                           |
| ------------- |:----------------------------------------------:|
| npm access            | 设置模块的访问级别                             |
| npm adduser            | 添加用户                          |
| npm cache( -c)            | 管理模块缓存 |
| npm config            | 管理npm配置文件  |
| npm help(-h)          | 查看npm 的帮助信息              |
| npm init          | 引导创建package.json 文件           |
| npm install (-i)          | 安装模块           |
| npm ls          | 查看已经安装的模块           |
| npm publish          | 安装模块           |
| npm root          | 显示 npm 根目录           |
| npm start          | 启动模块           |
| npm test          | 测试模块           |
| npm update( -up)          | 更新模块           |
| npm version(-v)          | 查看本本信息           |



