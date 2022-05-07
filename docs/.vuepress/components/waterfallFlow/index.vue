<template>
  <div class="layout">
    <div v-for="(v, k) in columns" :key="k" ref="items" class="items">
      <div v-for="(item, index) in renderList[k]" v-once :key="index">
        <slot v-if="getSlotName(item)" :name="getSlotName(item)" :data="item" />
        <slot v-else :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'waterflow',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      mylist: [],
      renderList: []
    }
  },
  mounted() {
    this.mylist = this.list.slice(0)
    for (let i = 0; i < this.columns; i++) {
      this.mylist[i] && this.renderList.push([this.mylist.shift()])
    }
    this.pushData()
  },
  methods: {
    getSlotName(item) {
      return Object.prototype.toString.call(item) === '[object Object]' && item.slotName ? item.slotName : ''
    },
    pushData() {
      this.mylist.length && this.$nextTick(() => {
        this.renderList[this.getMinHeightItemsIndex()].push(this.mylist.shift())
        this.pushData()
      })
    },
    getMinHeightItemsIndex() {
      const heightArr = this.$refs.items.map(item => item.getBoundingClientRect().height)
      return heightArr.indexOf(Math.min(...heightArr))
    }
  }
}
</script>
<style lang="scss" scoped>
  .layout {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    .items {
      flex: 1;
      height: max-co;
    }
  }
</style>
