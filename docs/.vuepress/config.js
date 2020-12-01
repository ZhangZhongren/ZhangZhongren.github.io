module.exports = {
  title: 'zzr',
  base: "/",
  description: '',
  themeConfig: {
    nav: [
      // {
      //   text: "home",
      //   link: "/"
      // },
      {
        text: "js",
        link: "/js/"
      },
      {
        text: "vue",
        link: "/vue/"
      },
      {
        text: 'webpack',
        link: '/webpack/'
      },
      {
        text: 'nuxt',
        link: '/nuxt/'
      },
      {
        text: 'node',
        link: '/node/'
      },
      {
        text: '编码规范',
        link: '/codereview/'
      },
      {
        text: '问题收录',
        link: '/question/'
      }
    ],
    sidebar: {
      '/js/': [
        ['', 'js'],
        ['array', '数组'],
        ['date', '日期'],
        ['function', '函数'],
        ['npmScript', 'npmScript'],
        ['regexp', 'regexp'],
        ['axios', 'axios'],
        ['fetch', 'fetch'],
        ['taro', 'taro'],
        ['jsFunc', 'jsFunc'],
        ['loadFile', '文件下载'],
        ['event', '事件'],
        // ['question', '面试题'],
        // ['string', '字符串常用操作']
      ],
      '/vue/': [
        ['', 'vue'],
        ['vue.config', 'vue.config'],
        ['directive', '指令'],
        ['table', '表格'],
        ['plugins', 'vue常用插件'],
        ['auto-blog', 'vuepress + github Actions']
      ],
      '/webpack/': [
        ['', 'webpack'],
        ['webpackdoc', 'webpack创建工程'],
        ['vue-cli3', 'vue-cli3 相关配置']
      ],
      '/nuxt/': [
        ['', 'nuxt']
      ],
      '/codereview/': [
        ['', '相关文档'],
        ['prettier', 'prettier'],
        ['eslint', 'eslint']
      ],
      '/question/': [
        ['', '问题收录'],
        ['css', 'css'],
        ['html', 'html'],
        ['js', 'js'],
        ['network', 'network']
      ],
      '/node/': [
        ['', 'node'],
        ['mongodb', 'mongodb'],
        ['mysql', 'mysql']
      ]
    }
  }
}