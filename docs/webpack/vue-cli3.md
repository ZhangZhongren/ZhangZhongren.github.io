## Project setup
```
yarn install
```

## Compiles and hot-reloads for development
```
yarn serve or yarn dev
```

## Compiles and minifies for production
```
yarn build
```

## Lints and fixes files
```
yarn lint
```

<hr>

## 配置vue.config.js

```
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './',
  outputDir: process.env.outputDir || 'dist', // 打包后文件的目录
  assetsDir: "", // 静态资源目录
  lintOnSave: false,
  runtimeCompiler: false, // 是否使用运行时的Vue版本
  productionSourceMap: !IS_PROD,
  pwa: {},
  css: {},
  configureWebpack: config => {
    if (IS_PROD) {
      // 生产环境配置
    } else {
      // 开发环境配置
    }
  },
  devServer: {}
}
```

<hr>

## 环境变量
>通过在 package.json 里的 scripts 配置项中添加--mode xxx 来选择不同环境

&emsp;以 VUE_APP 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过 process.env.VUE_APP_XXX 访问, NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用

#### 配置

&emsp;&emsp;在项目根目录中新建.env, .env.dev, .env.production 等文件

- .env

&emsp;&emsp;serve 默认的本地开发环境配置

```javascript
NODE_ENV = "development"
BASE_URL = "./"
VUE_APP_PUBLIC_PATH = "./"
VUE_APP_API = "https://test.com/api"
```

- .env.production

&emsp;&emsp;build 默认的环境配置

```javascript
NODE_ENV = "production"
BASE_URL = "https://prod.com"
VUE_APP_PUBLIC_PATH = "https://prod.com"
VUE_APP_API = "https://prod.com/api"
```

&emsp;&emsp;修改 package.json

```javascript
"scripts": {
  "pro": "vue-cli-service build --mode production"
}
```

#### 使用环境变量

```javascript
<template>
  <div id="app">
    {{ process.env.VUE_APP_API }}
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("VUE_APP_API: ", process.env.VUE_APP_API);
  }
};
</script>
```

<hr>

## 配置proxy代理

```
module.exports = {
  devServer: {
    port: 8888, // 代理端口
    open: true, // 打开浏览器
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://172.16.6.41:7000', // 代理目标接口
        changeOrigin: true,
        // ws: true, // 启动websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```

<hr>

## 修复 HMR(热更新)失效

```
module.exports = {
  chainWebpack: config => {
    // 修复HMR
    // config.resolve.symlinks(true),
  }
}
```

<hr>

## 添加alias(别名)

```
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
        .set('vue$', 'vue/dist/vue.esm.js')
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
  }
}
```

<hr>

## 配置 externals 引入 cdn

```
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    }
  },
  chainWebpack: config => {
    const cdn = {
      // css: ['https://cdn.bootcss.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
      js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
      ]
    }
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })
  }
}
```

&emsp;在 html 中添加

```
<!-- 使用CDN的CSS文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.css) { %>
<link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
<% } %>

<!-- 使用CDN的JS文件 -->
<% for (var j in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.js) { %>
<script
  type="text/javascript"
  src="<%= htmlWebpackPlugin.options.cdn.js[j] %>"
></script>
<% } %>
```

<hr>

## 添加打包分析

```
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  chainWebpack: config => {
    if (IS_PROD) {
      // 打包分析
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  }
}
```

<hr>

## 添加DLL打包

&emsp;安装 add-asset-html-webpack-plugin clean-webpack-plugin webpack-cli 插件

```
yarn add add-asset-html-webpack-plugin clean-webpack-plugin webpack-cli -D
```

新建webpack.dll.conf.js

```
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除之前的dll文件

const dllPath = 'dll' // dll打包后的目录

module.exports = {
  entry: {
    // 提取的文件
    libs: ['vue', 'vue-router', 'vuex', 'axios']
  },
  output: {
    path: path.join(__dirname, dllPath), // 输出路径
    filename: '[name]_[hash:8].dll.js', // 输出文件
    library: '[name]_library' // 暴露出的变量名
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_library', // 要与output.library一致
      context: __dirname
    })
  ]
}

```

&emsp;在 vue-config.js 中配置

```
const fs = require('fs')
var chalk = require('chalk')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var webpack = require('webpack')
const dllPath = 'dll' // 保存目录

try {
  fs.readdirSync(path.resolve(__dirname, './dll'))
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow('dll folder not found, you must run yarn dll'))
  process.exit(1)
}

module.exports = {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, dllPath, 'libs-manifest.json')
    }),
    new AddAssetHtmlPlugin([
      { filepath: path.resolve(__dirname, dllPath, '*.dll.js') }
    ])
  )
}
```

<hr>

## 添加打包压缩功能

&emsp;安装 filemanager-webpack-plugin 插件

```
yarn add filemanager-webpack-plugin -D
```

```
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const outputDir = 'dist'

module.exports = {
  if (argv.indexOf('--zip') !== -1) {
    config.plugins.push(
      new FileManagerPlugin({
        onEnd: [
          {
            delete: [`./${outputDir}.zip`]
          },
          {
            archive: [
              {
                source: `./${outputDir}`,
                destination: `./${outputDir}.zip`,
                format: 'zip'
              }
            ]
          }
        ]
      })
    )
  }
}
```

&emsp;打包压缩

```
yarn build --zip
```

<hr>

## 去掉 console.log

&emsp;安装 babel-plugin-transform-remove-console 插件

```
yarn add -D babel-plugin-transform-remove-console
```

&emsp;在 babel-config.js 中配置

```
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []

if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  plugins
}
```

<hr>

## 为 stylys 提供全局变量

&emsp;安装 style-resources-loader 插件

```
yarn add -D style-resources-loader
```

&emsp;创建 src/assets/stylus/mixin.styl 文件

&emsp;在 vue-config.js 中配置

```
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const addStylusResource = rule => {
  rule
    .use('style-resouce')
    .loader('style-resources-loader')
    .options({
      patterns: [resolve('src/assets/stylus/mixin.styl')]
    })
}

module.exports = {
  chainWebpack: config => {
    // 添加 stylus 全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStylusResource(config.module.rule('stylus').oneOf(type))
    )
  }
}
```

<hr>

## 引入 postcss

&emsp;安装 postcss-import postcss-px-to-viewport 插件

```
yarn add -D postcss-import postcss-px-to-viewport
```

&emsp;在 vue-config.js 中配置

```
module.exports = {
  css: {
    // 启用 CSS modules
    // modules: false,
    // css.modules 过时，推荐使用css.requireModuleExtension
    requireModuleExtension: true,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: !IS_PROD,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-import'),
          require('postcss-px-to-viewport')({
            viewportWidth: 375, // (Number) The width of the viewport.
            viewportHeight: 667, // (Number) The height of the viewport.
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw', // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines', /^.van-.*/], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
            mediaQuery: false // (Boolean) Allow px to be converted in media queries.
          })
        ]
      }
    }
  }
}
```

<hr>

## 添加vconsole调试工具

&emsp;安装 vconsole-webpack-plugin 插件

```
yarn add vconsole-webpack-plugin -D
```

配置vconsole插件

```
const vConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    config.plugins.push(
      // eslint-disable-next-line new-cap
      new vConsolePlugin({
        filter: [], //需要过滤的入口文件
        enable: !IS_PROD //!IS_PROD
      })
    )
  }
}
```

<hr>

## 开启gzip压缩

&emsp;安装 compression-webpack-plugin 插件

```
yarn add compression-webpack-plugin -D
```

配置

```
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      threshold: 10240, // 对超过10kb的数据进行压缩
      deleteOriginalAssets: false // 是否删除原文件
    })
  }
}
```

<hr>

