# server-X

[github](https://github.com/svrxjs/svrx)

## 安装 

::: tip
  npm install -g @svrx/cli
:::

## 常用命令

> svrx --version 查看版本

  svrx 启动 svrx

  svrx --weinre --vconsole 使用调试类插件


## 动态路由实现 接口 Mock


1. router.js

> get('/user').to.mock({ title: '@name' });;

2. 启动 svrx --route route.js

3. 访问 /blog

## 动态路由配合 json-server

1. 新建 db.json

``` json
 {
  "list": [
    {
      "name": "zzr",
      "age": "25",
      "birthday": "1995、08、02"
    }
  ]
}
```

2. 新增 router.js

``` js
route('/api/(.*)')
.rewrite('/{0}')
.to.jsonServer();

```

3. 启动

```
svrx --route router.js -p json-server
```

4. 访问

```
http://localhost:8000/api/list
```

## server-x 集成 vue-cli / creat-react-app

[资料](https://docs.svrx.io/zh/practice/integration.html)