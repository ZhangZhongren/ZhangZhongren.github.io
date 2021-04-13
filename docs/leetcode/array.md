## 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

::: 示例：
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
::: 

answer: 
``` js
let nums = [2, 7, 11, 15, 8, 1, 2], target = 9
const getResp = (array, _target) => {
  let _array = array.slice(0) // 深拷贝
  let resp = [] // 返回值
  let _index = 0 // 还原 splice 后的index
  _array.forEach((item, index) => {
    const targetIndex = _array.findIndex(num => num === _target - item)
    if (targetIndex > -1) {
      resp.push(index + _index, targetIndex + _index)
      _array.splice(index, 1)
      _array.splice(targetIndex, 1)
      _index += 2
    }
  })
  return resp
}
console.log(getResp(nums, target))
```