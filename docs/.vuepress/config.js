module.exports = {
  title: 'zzr',
  base: '/',
  // head: [
  //   ['link', { rel: 'icon', href: '/zzr/logo.png' }]
  // ],
  description: '博客',
  serviceWorker: true,
  themeConfig: {
    nav: [
      {
        text: 'javascript',
        ariaLabel: 'javascript',
        items: [
          { text: 'js', link: '/js/' },
          { text: 'vue', link: '/vue/' },
          { text: 'webpack', link: '/webpack/' },
          { text: 'node', link: '/node/' },
          { text: '编码规范', link: '/codereview/' },
          { text: 'css', link: '/css/button' },
          { text: '工具', link: '/debugging/' },
          { text: '架构', link: '/schema/' }
        ]
      },
      {
        text: 'components',
        link: '/components/'
      }
    ],
    sidebar: {
      '/components/': [
        ['waterfallFlow', '瀑布流']
      ],
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
        ['手写代码', '手写代码'],
        ['监听ur变动', '监听ur变动']
        // ['question', '面试题'],
        // ['string', '字符串常用操作']
      ],
      '/vue/': [
        ['', 'vue'],
        ['vue.config', 'vue.config'],
        ['directive', '指令'],
        ['table', '表格'],
        ['plugins', 'vue常用插件'],
        ['auto-blog', 'vuepress + github Actions'],
        ['vueMobildUI', 'vueMobildUI'],
        ['vue3-ts', 'vue3-ts'],
        ['nuxt', 'nuxt']
      ],
      '/webpack/': [
        ['', 'webpack'],
        ['webpackdoc', 'webpack创建工程'],
        ['vue-cli3', 'vue-cli3 相关配置']
      ],
      '/codereview/': [
        ['', '相关文档'],
        ['prettier', 'prettier'],
        ['eslint', 'eslint']
      ],
      '/css/': [
        ['button', '按钮'],
        ['canvas', 'canvas']
      ],
      '/node/': [
        ['', 'node'],
        ['mongodb', 'mongodb'],
        ['mysql', 'mysql']
      ],
      '/debugging/': [
        ['', 'guide'],
        ['svrx', 'svrx'],
        ['treer', 'treer']
      ],
      '/schema/': [
        ['', '管理系统'],
        ['npm', 'npm常用命令'],
        ['webpack升级', 'webpack升级5.x'],
        ['postcss-loader-env', 'postcss-loader根据环境变量配置'],
        ['npm-package', 'npm 工具包收录'],
        ['npm-publish', 'npm 私服包管理'],
        ['资料', '资料']
      ]
    }
  },
  Markdown: {
    lineNumbers: true
  },
  plugins: [
    'demo-container'
  ],
  theme: 'antdocs'
}
