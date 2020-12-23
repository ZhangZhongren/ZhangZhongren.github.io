# 函数式编程汇总

## 相关的概念

### 纯函数

· 1 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数；

· 2 该函数不会产生任何可观察的副作用。

满足以上两个条件的函数都是纯函数


## 时间戳获取 时 分 秒 传入时间戳

``` js
function getTime(time) {
  let obj = {}
  if (time > 0) {
    let date = new Date(time)
    obj.hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    obj.minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    obj.seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  } else {
    obj = {
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  return obj
}
```
入参： 毫秒数

出参：

| type | .hours | .minutes | .seconds |
|:-----|:-------|:---------|:---------|
|Object| 小时   | 分钟      | 秒       |

## 获取 n个月后今天的时间戳

``` js
/*
* n 月份数
*/
function _getNMounthLatterTimes(n) {
    let days = 0
    let date = new Date()
    let mounth = date.getMonth() + 1
    let year = date.getFullYear()
    let day = date.getDate()
    let lastDay = 0
    for(let i = mounth; i <= mounth + n; i++) {
      days += new Date(i > 12 ? year + ~~(i/12) : year,i > 12 ? i % 12 : i,0).getDate();
      i === mounth + 6 && (lastDay = new Date(year,i > 12 ? i % 12 : i,0).getDate())
    }
    if (day > lastDay) {
      days += day - lastDay
    }
    return new Date().getTime() + days * 86400000
  }

```