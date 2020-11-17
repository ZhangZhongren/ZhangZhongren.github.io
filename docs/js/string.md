# 字符串常用操作

## 去掉所用空格

``` js
'aaa bbb ccc'.replace(/\s/g,"");

```

## 对于引号，尖括号，斜杠进行转义

``` js
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```