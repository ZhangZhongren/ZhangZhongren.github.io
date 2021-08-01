# 数组的一些操作方法

## 获取两个数组的交集 => 下标、 值的集合

``` js
const arr1 = [1, 3, 5, 7, 9]
const arr2 = [1, 3, 5, 5]
function getIntersection(first = [], second = []) {
  let intersection1 = []
  let intersection2 = []
  first.forEach((item, index) => {
    second.some(v => v === item) && intersection1.push({
        firstIndex: index,
        val: item
      })
  })
  second.forEach((item, index) => {
    first.some(v => v === item) && intersection2.push({
        firstIndex: index,
        val: item
      })
  })
  return {
    intersection1,
    intersection2
  }
}
let a = getIntersection(arr1, arr2)
console.log(a)
```