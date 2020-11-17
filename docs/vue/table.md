## element-ui table 二次封装

``` html
<template>
  <div>
    <el-table
      ref="myTable"
      :data="tableData"
      v-bind="$attrs"
      v-on="$listeners"
      @selection-change="_handleSelectionChange"
      stripe>
      <el-table-column
        v-if="showIndex"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        type="selection"
        :selectable="_selectDisabled"
        width="80"
        v-if="checked && tableData.length"
        />
      <el-table-column
        v-for="(v, k) in columns" :key="k"
        :prop="v.prop"
        :label="v.label"
        v-bind="v"
        :width="v.width || 'auto'">
        <template slot-scope="scope">
          <slot :name="v.scope" :row="scope.row" :$index="scope.$index">
            {{_showColData(scope.row, scope.$index, v)}}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    tableData: {
      type: Array
    },
    columns: {
      type: Array
    },
    checked: {
      default: false,
      type: Boolean
    },
    showIndex: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      selectedRows: []
    }
  },
  watch: {
  },
  computed: {
    tablerRef() {
      return this.$refs.myTable
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 获取选中的行
    getSelectRows () {
      return this.selectedRows
    },
    // 选择的回调
    _handleSelectionChange (val) {
      this.selectedRows = val
      this.$emit('changrows', val)
    },
    _showColData(row, index, col) {
      if (col.prop) {
        let collValue = row[col.prop];
        let propArr = col.prop.split('.');
        // 链式处理
        if (propArr && propArr.length) {
          let eachRow = row;
          propArr.forEach(prop => {
            collValue = eachRow[prop];
            eachRow = collValue // 每次更新一下row的字段深度
          })
        }
        // formatter 处理
        if (col.formatter && typeof col.formatter === 'function') {
          return col.formatter(row, col, collValue, index)
        }
        return collValue
      }
      return ''
    },
    // 是否禁用
    _selectDisabled(row) {
      return row.disabled !== true
    },
    // 处理选中指定的 row
    toggleSelection(rows) {
      if (Array.isArray(rows)) {
        rows.forEach(row => {
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.myTable.clearSelection();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

```