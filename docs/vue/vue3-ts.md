## vue3.0 + typescript 

### 使用 mixins

1. mixins 正常用法

``` js
export default {
  data() {
    return {
      data: ''
    }
  }
  ...
}
```

2. ts 用法
``` ts
import { defineComponent } from 'vue'
const List =  defineComponent({
  data() {
    return {
      a: 'zzr',
    }
  },
  mounted() {
    console.log(this.a)
  }
})

export default List
```