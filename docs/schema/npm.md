# npm 常用命令

## 查看当前 registry

``` sh
npm config get registry 
```

## 设置 registry

``` sh
npm config set registry XXXX
```

## 统一项目中某个依赖的版本

例： lodash

1. 产看项目中某一个依赖被使用的情况

  通过 package-locck.json 文件
  npm ls lodash 命令

2. npm / yarn 实现 统一项目中的依赖版本

  npm 通过使用 [npm-force-resolutions](https://www.npmjs.com/package/npm-force-resolutions) 插件

  yarn 通过在 package.json文件汇总配置

    ```json

    {
      "resolutions": {
        "lodash": "^4.17.10"
      }
    }
    ```
  scripts 里面增加  "preinstall": "npx npm-force-resolutions"

3. 依赖重新安装


## 产看项目中依赖安装版本情况

项目根目录下执行

``` node
npm ls loddash
```

## Mac下Vim编辑快捷键小结(移动光标)

1、移动到行尾"$"，移动到行首"0"(数字)，移动到行首第一个字符处"^"
2、移动到段首"{"，移动到段尾"}"
3、移动到下一个词"w"，移动到上一个词"b"
4、移动到文档开始"gg"，移动到文档结束"G"
5、跳到第n行"ngg" 或 "nG" 或 ":n"
6、移动光标到屏幕顶端"H"，移动到屏幕中间"M"，移动到底部"L"
7、移动到上次编辑文件的位置 "`"

[菜鸟vim/vi](https://www.runoob.com/linux/linux-vim.html)