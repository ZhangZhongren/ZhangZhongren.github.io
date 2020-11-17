## el-dialog 可以拖拖拽

``` js
export default {
  bind(el, binding) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomheight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
}
```
挂载

``` js
import drag from './drag'
import Vue from 'vue'
Vue.directive('el-drag', drag)
```

使用 

``` html
<el-dialog v-el-drag>
...
</el-dialog>
```

## 区域蒙版功能

``` js
export default {

  bind(el, binding) {
    el.style.position = 'relative'
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.type = 'vdisable'
    div.style.left = 0
    div.style.right = 0
    div.style.top = 0
    div.style.bottom = 0
    div.style.zIndex = 9999
    div.style.display = 'none'
    div.style.backgroundColor = 'rgba(255, 255, 255, .6)'
    el.appendChild(div)
    if (binding.value) {
      div.style.display = 'block'
    }
  },
  update(el, binding) {
    if (binding.value) {
      Array.from(el.children).forEach(item => {
        if (item.type === 'vdisable') {
          item.style.display = 'block'
        }
      })
    } else {
      Array.from(el.children).forEach(item => {
        if (item.type === 'vdisable') {
          item.style.display = 'none'
        }
      })
    }
  }
}
```
使用

``` html
<!-- disable tyoe Boolean -->
<div v-disable="disable"></div>
```