## vue cli 常见配置

项目根目录新建 vue.config.js

## 配置别名

``` js
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('com', resolve('./src/components'))
      .set('views', resolve('./src/views'))
  }
}
```

## 使用 scss

无需配置直接安装

::: tip 命令

npm install node-sass sass-loader --save-dev

:::