<template>
  <el-table
      :data="dataSource"
      highlight-current-row
      v-loading="$store.state.listLoading"
      @selection-change="selectsChange"
      border
  >
    <el-table-column type="selection" width="40" align="center"></el-table-column>
    <el-table-column type="index" width="60" align="center"></el-table-column>
    <el-table-column
        v-for="(item,index) in dataConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        :sortable="item.sortable"
        :formatter="item.formatter"
        v-if="showColumn(item.label)"
    >
    </el-table-column>
    <el-table-column label="操作" :width="btnWidth" align="center" v-if="btnWidth">
      <template slot-scope="scope">
        <el-button v-if="edit" size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button v-if="del" size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "dataTable",
    props: [
      'dataSource',
      'dataConfig',
      'checked',
      'del',
      'edit',
      'btnWidth',
    ],
    methods: {
      showColumn(item) {
        if(this.checked.indexOf(item) !== -1) {
          return true;
        }
      },
      selectsChange(val) {
        this.$emit("selectsChange", val);
      },
      handleEdit(val1, val2) {
        this.$emit("handleEdit", val1, val2)
      },
      handleDel(val1, val2) {
        this.$emit("handleDel", val1, val2)
      },
    }
  }
</script>

<style scoped>

</style>