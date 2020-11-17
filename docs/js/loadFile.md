# 前端文件下载

## 1. 利用a标签 的download属性实现

``` html 
<a hrel="filePath" download='file.jpg'></a>

```

### 动态创建 a 标签 

``` js
  /*
  * fileName 文件名
  * content 下载的内容
  */
  function loadFile(fileName, content) {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 下载内容转变成blob地址
    eleLink.href = URL.createObjectURL(content);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }

```

### form 表单形式下载

``` js

const form = document.createElement('form')
form.action = '' // 请求地址
form.method = 'post'
const params = {
  fileName: this.filePath
}
Object.keys(params).forEach((item) => {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = item
  input.value = params[item]
  form.appendChild(input)
})
document.body.appendChild(form)
form.submit()
document.body.removeChild(form)
```