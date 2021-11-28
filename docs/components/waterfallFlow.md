### 瀑布流组件

支持自定义展示内容，通过命名插槽设置不同模版
支持设置列数

#### 基本用法

适用广泛的基础单选

::: demo
```html
<template>
  <waterfallFlow-index :list="list" :columns="3">
    <div
      slot-scope="{ data }"
      :style="`height: ${height()}px;background:rgba(${randomHexColor()}, ${randomHexColor()}, ${randomHexColor()}, 1); color: #fff`"
    >{{data}}</div>
    <div
      slot="slotname"
      slot-scope="{ data }"
      :style="`height: ${height()}px;background:rgba(${randomHexColor()}, ${randomHexColor()}, ${randomHexColor()}, 1); color: #fff`"
    >{{data.slotName}}</div>
  </waterfallFlow-index>
</template>

<script>
  export default {
    data() {
      return {
        list: [ {slotName: 'slotname', index: 1}, 2, 3, 4, 5, 6, 7, 8 ]
      }
    },
    methods: {
      height() {
        return parseInt(Math.random() * 50) + 50
      },
      randomHexColor() { //随机生成十六进制颜色
        return Math.floor(Math.random() * 55) + 200
      }
    }
  }
</script>
```
:::

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| list  |  列表数据源  | array | - | [] |
| columns  | 列数   | number | - | 3 |

### Slot

| Name | Description |
|------|--------|
| — | 默认展示 |
| listItem.slotName | 需要做不同渲染使用 |