# prettier 格式化项目代码

## 安装

> npm install --save-dev --save-exact prettier

## 添加配置文件

>.prettierrc.json

[配置项](https://prettier.io/docs/en/options.html)

例：

``` json
{
	"semi": true,
	"useTabs": true,
	"tabWidth": 2
}
```

## 设置忽略文件

> .prettierignore

例： 

```
/node_modules
/.history
/.dist
```

## package.json 添加 npmscript

> "lint:prettier": "prettier --write ."

## 格式话工程代码

> npm run link:prettier
