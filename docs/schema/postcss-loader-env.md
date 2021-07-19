## postcss-loader 配置项根据环境变量

业务场景：一个独立的项目要支持组件化集成

问题点：有一些全局样式冲突，需要增加css命名空间来解决

处理问题：

  1、开发一个postcss plugin 将css类名加上命名空间
  2、根据环境变量判断使用不使用这个插件

.postcssrc.js

``` js
// https://github.com/michael-ciniawsky/postcss-load-config

const config = () => {

  const plugins = { // default plugin
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }

  if (process.env.NODE_ENV === 'components') { // 组件化情况下使用
    plugins['postcss-global-namespace'] = { // 组件样式使用
      getNameSpace(inputFile) {
        return '.portal'
      }
    }
  }
  
  return {
    plugins
  }
}

module.exports = config()

···