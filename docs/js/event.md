# js 事件

## 区分单击双击事件

::: tip
 
 利用延时器 setTimeout 和清除定时器方法 clearTimeout

:::

> demo

``` js

let ODiv = document.getElementById('id')
let timer = 0
ODiv.onclick = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    // do somethind
  }, 200)
}

ODiv.ondblclick = () => {
  clearTimeout(timer)
  // do somethind
}

```