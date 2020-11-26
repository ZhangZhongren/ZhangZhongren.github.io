## 使用homebrow方式进行安装

1. 安装
  
  > brew tap mongodb/brew

  > rew install mongodb-community@4.4

2. 启动

  > brew services start mongodb-community@4.4

3. 停止

  > brew services stop mongodb-community@4.4

4. mongod 命令后台进程方式

  > mongod --config /usr/local/etc/mongod.conf --fork

## node 链接 mongodb

1. 安装 mongoose 

  > npm i mongoose

2. 链接

``` js
mongoose.connect('mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
```

具体写法 请根据最新的 npmjs 寻找相应的版本，这里使用的

> "mongoose": "^0.0.2-security",