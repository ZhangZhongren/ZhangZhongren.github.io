# VUE

[vue官网](https://cn.vuejs.org/)

## props

vue可以使用props从父组件向子组件传递参数，官网已经说的很详细了[vur-prop](https://cn.vuejs.org/v2/guide/components-props.html#%E4%BC%A0%E9%80%92%E9%9D%99%E6%80%81%E6%88%96%E5%8A%A8%E6%80%81-Prop)

这里只说明一个坑

``` js
props: {
  type: Object,
  default: () => {} // 这样写会得到一个underfind
}
// 正确写法
props: {
  type: Object,
  default: () => { return {} } // 因为 {} 在箭头函数中代表的是代码段 使用 {} 必须配合 return 否则 就当做没有返回值处理的
}
```

## 计算属性 computed

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护

计算属性是基于它们的响应式依赖进行缓存的

``` js
data () {
  return {
    name: 'z'
  }
}
computed: {
  name () {
    return this.name + 'zr'
  }
}
```

## 侦听器 watch

大多数情况下我们需要使用的是 计算属性而不是 侦听器

侦听器的开销比较大

大多情况下结合表单的控件去做

1. 监听 data 里面的属性

``` js
watch: {
  value(){ // value 的值改变的时候触发 getList 方法
    this.getList()
  }
}
```

2. 监听 计算属性

``` js
computed: {
  name () {
    return this.a + this.b
  }
}
watch: {
  name(){ // name 的值改变的时候触发 getList 方法
    this.getList()
  }
}
```

3. 立即执行

``` js
watch: {
  value: {
    handler: 'getList',
    immediate: true
  }
}
```

4. 深度监听

``` js
watch:{
  value: {
    handler: 'getList',
    deep:true
  }
}
```

## v-pre 不需要编译的html 节约性能

``` html
<div v-pre>{{name}}</div>
<!-- {{name}} -->
```

## v-once 模板值编译一次

``` html
<div v-pre>{{name}}</div>
<!-- name会被编译但是当改变 name 是 页面不会发生变化 -->
```

## v-cloak 模板编译完成之前会一直存在于标签之中

使用场景：页面数据渲染 未得到数据时做样式处理避免闪屏,或者看到模板语言未编译 的  {{}}

``` html
<div v-cloak>
    <p>{{value.name}}</p>
</div>
```

``` css
[v-cloak] {
    display: none;
}
```

## vue-loader 篇

#### 去掉 多余空格

``` js
{
  vue: {
    preserveWhitespace: false
  }
}
```

## 配置模板 console.log

``` js
Vue.prototype.$print = console.log
```

``` html
<div>{{$print(name)}}</div>
```

## 为什么 vue 组件中的data 必须是函数的返回值

当一个组件被定义， data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新的对象。

## vue-loader

Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件：

#### webpack 配置

``` js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

::: tip 
这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
:::

#### 使用 Sass

安装

``` js
npm install -D sass-loader node-sass
```

webpack 配置

``` js
module.exports = {
  module: {
    rules: [
      // ... 忽略其它规则

      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // 插件忽略
}
```

::: tip
注意 sass-loader 会默认处理不基于缩进的 scss 语法。为了使用基于缩进的 sass 语法，你需要向这个 loader 传递选项：
:::

``` js
// webpack.config.js -> module.rules
{
  test: /\.sass$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
        // sass-loader version >= 8
        sassOptions: {
          indentedSyntax: true
        }
      }
    }
  ]
}
```

共享全局变量

sass-loader 也支持一个 prependData 选项，这个选项允许你在所有被处理的文件之间共享常见的变量

``` js
// webpack.config.js -> module.rules
{
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        // 你也可以从一个文件读取，例如 `variables.scss`
        // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
        prependData: `$color: red;`
      }
    }
  ]
}
```

## 使用可视化包分析工具

### vue cli 3x
1、 安装并依赖

安装

> npm i webpack-bundle-analyzer -s

在 vue.config.js 中引入

> const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

2、配置

在configureWebpack 中加入配置

``` js
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.1',
      analyzerPort: 8088
    })
  )
```
### vue cli 2x 

直接运行命令 

::: tip
npm run build --report
:::

## eslint

为了使项目的代码风格一致所以eslint 是很有必要的

### 配置

eslint 有几种配置方式，这里介绍官网推荐的一种方式

在项目的根目录添加 .eslintrc.js 文件

我的配置项
``` js
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-extend-native': ["error", { "exceptions": ["Object"] }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

### 项目根目录增加 .eslintignore 文件

我配置的内容

```
/node_modules/
/dist/
/tests/
/src/assets/
```

可能会用到的 依赖包

::: tip
eslint-plugin-import
eslint-plugin-node
eslint-plugin-promise
eslint-plugin-standard
eslint-plugin-vue
:::

### vscode 配置保存自动按照eslint配置 格式化代码

1. 安装插件 Eslint 、 Vetur

2. 在 setting.json 中进行配置

我的电脑使mac 所以这里只说了一下 mac的路径 windows的位置自行查找

vscode -> 首选项 -> 设置 输入 setting.js

增加如下代码即可

``` js
"eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```



## element-ui 开始时间不能大于结束时间的需求

``` html
<el-form>
  <el-form-item >
    <el-date-picker
      v-model="startTime"
      type="date"
      :picker-options="starttime"
      value-format="yyyy-MM-dd"
      placeholder="开始时间"
    />
  </el-form-item>
  <el-form-item>
    <el-date-picker
      v-model="endTime"
      type="date"
      :picker-options="endTime"
      value-format="yyyy-MM-dd"
      placeholder="结束时间"
    />
  </el-form-item>
</el-form>
```

``` js
data () {
  return {
    startTime: {
      disabledDate: time => {
        if (this.endTime) {
          return (
            time.getTime() > new Date(this.endTime).getTime()
          )
        } else {
          return time.getTime() > Date.now()
        }
      }
    },
    endTime: {
      disabledDate: time => {
        if (this.startTime) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date(this.startTime).getTime() - 8.64e7 // 包含当天
          )
        } else {
          return time.getTime() > Date.now()
        }
      }
    }
  }
}
```

## element-ui 下拉框默认展示 滚动条

``` css
.el-scrollbar{
  .el-scrollbar__bar .is-vertical {
    opacity: 1; //改为0不显示滚动条
    width:5;
  }
}
```




## vue cli3 配置 警告不显示在界面

位置 vue.config.js 下

```js
module.exports = {
  // ...
  devServer: {
    // ...
    overlay: {
      warnings: false,
      errors: false
    }
  }
}
```

## style 标签 使用 alias

1. style标签中需要使用别名需要在原有连接前加 ‘～’ 即可
2. 如果项目中使用了postcss 则需要注意 postcss-import 的相关配置，没有进行任何配置注释即可



## 区域禁用

::: tip
参数 布尔类型 true 遮罩 false 取消
:::

## v-model 实现 //TODO

## $emit $on $once $off

发布/订阅模式
  
  