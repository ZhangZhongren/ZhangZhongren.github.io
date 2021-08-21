# js 工具函数

## 内存单位自动换算
``` js
formatFileSize(fileSize) {
  let stepLength = 1024
  if (fileSize < stepLength) {
      return fileSize + ' B';
  } else if (fileSize < Math.pow(stepLength, 2)) {
      var temp = fileSize / stepLength;
      temp = temp.toFixed(2);
      return temp + ' KB';
  } else if (fileSize < Math.pow(stepLength, 3)) {
      var temp = fileSize / Math.pow(stepLength, 2)
      temp = temp.toFixed(2);
      return temp + ' MB';
  } else {
      var temp = fileSize / Math.pow(stepLength, 3)
      temp = temp.toFixed(2);
      return temp + ' GB';
  }
}
```

## svg to canvas

``` js
// 用npm包有问题 直接引用官方 cdn
<script type="text/javascript" src="https://unpkg.com/canvg@3.0.4/lib/umd.js"></script>
function svgToCanvas() {
  let svgElem = document.querySelectorAll('svg')
  svgElem.forEach(item => {
    const canvas = document.createElement('canvas');
    const { width, height } = item.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    canvas.style.position = 'absolute'
    canvas.style.left = item.style.left
    canvas.style.top = item.style.top
    const ctx = canvas.getContext('2d')
    const v = canvg.Canvg.fromString(ctx, item.outerHTML);
    v.start();
    document.getElementById('diagramContainer').appendChild(canvas)
    item.remove()
  }
}
```

## 两个对象是否相等

1、 通过对比jspn字符串是否相等
::: tip
适用 json 形式的 对象
:::

``` js

function objectIs(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

```

2、 利用工具deep-equal

## 字符串按大写祖母分割成数组

``` js
'aaaBddddCddd'.split(/(?=[A-Z])/)
```

## compose 函数

``` js
const compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x)
```

## cloneDeep

### [Object.prototype.toString 的可能结果](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)

### 一个简单的深度优先的深拷贝

null boolen string array object undefined 的拷贝
``` js
function cloneDeep(params) {
  let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
  let needDeep = item => isObject(item) || Array.isArray(item)
  if (!needDeep) {
    console.log(params)
    return params
  } else {
    if (isObject(params)) { // 处理 object
      let obj = {}
      for(let i in params) {
        if (needDeep(params[i])) {
          obj[i] = cloneDeep(params[i])
        } else {
          obj[i] = params[i]
        }
      }
      return obj
    } else if (Array.isArray(params)) { // 处理 array
      let arr = []
      params.forEach(item => {
        if (needDeep(item)) {
          arr.push(cloneDeep(item))
        } else {
          arr.push(item)
        }
      })
      return arr
    }
  }
}
```

### 截取字符串 按照字节数计算

``` js
 cutString(str, len, suffix = ''){
      if (!str) return ""
      if(len<= 0) return ""
      var templen=0;
      for (let i=0; i<str.length; i++){
        if(str.charCodeAt(i)>255){
          templen+=2;
        } else {
          templen++
        }
        if (templen == len){
          return str.substring(0,i + 1) + suffix
        } else if (templen >len){
          return str.substring(0, i) + suffix
        }
      }
      return str;
    }
```


### 使用正则获取url中的参数

``` js
let url = 'http://www.zzr.com?a=1&b=2&c=3'

function parseUrlByRegExp (url) {
  let urlReg = new RegExp('(\\w+)=(\\w+)(?:&|$)', 'g')
  let keyReg = new RegExp('(\\w+)=')
  let valReg = new RegExp('=(\\w+)(?:&|$)')
  let resp = {}
  url.match(urlReg).forEach(item => {
    let key = item.match(keyReg)[1]
    let val = item.match(valReg)[1]
    console.log(key, val)
    resp[key] = val
  })
  return resp
}

console.log(parseUrl(url))
```