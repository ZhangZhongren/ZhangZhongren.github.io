<template>
  <div class="">
    <table>
      <thead>
        <td>属性</td>
        <td>值</td>
        <!-- <td>描述</td> -->
      </thead>
      <tr v-for="(item, index) in navigator" :key="index">
        <td class="label">{{ index }}</td>
        <td class="value">{{ item }}</td>
        <!-- <td class="label">{{ KEY_MAP[index]}}</td> -->
      </tr>
      <tr>
        <td>languages</td>
        <td>{{ winNavigator.languages }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// const KEY_MAP = {
//   cookieEnabled: '启用cookie',
//   appName: '浏览器官方名称',
//   productSub: '浏览器版本号',
//   vendorSub: '供应商版本号码',
//   maxTouchPoints: '返回当前设备支持的最大同时触摸接触点数。'
// }
export default {
  name: 'navigator',
  components: {},
  props: {},
  data() {
    // this.KEY_MAP = KEY_MAP
    return {
      navigator: null,
      list: [
        1
      ]
    }
  },
  computed: {
    winNavigator() {
      return window.navigator
    }
  },
  created() {
    const obj = {}
    for (const i in window.navigator) {
      if (typeof window.navigator[i] !== 'function') {
        if (typeof window.navigator[i] !== 'object') {
          obj[i] = window.navigator[i]
        }
      }
    }
    this.navigator = obj
  }
}
</script>
<style scoped>
</style>
