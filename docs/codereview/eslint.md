## 安装

> npm install eslint --save-dev

## 创建配置文件

> ./node_modules/.bin/eslint --init

## ..eslintrc.js 文件中新增配置项

``` js
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {},
};
```

## 增加 npm script

``` json
"scripts": {
		"lint": "eslint src/**.js"
	}
```

## 执行
 
> npm run lint
