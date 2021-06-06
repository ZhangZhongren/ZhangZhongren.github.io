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
3. 依赖重新安装