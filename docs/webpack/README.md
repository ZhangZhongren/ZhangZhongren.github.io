
### require.context 获取文件

1. 利用 require.context 获取文件名称

``` js
const modulesFiles = require.context('./modules', true, /\.js$/)
const importAll = r => r.keys().map(key => key)
console.log(importAll(modulesFiles))
```

2. 利用 require.context 获取 文件内容 key value 形式

``` js
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  console.log(modules, value.default)
  modules[moduleName] = value.default
  return modules
}, {})
```

3. 利用 require.context 获取 文件内容 数组 形式

``` js
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules.push(value.default)
  return modules
}, [])
```