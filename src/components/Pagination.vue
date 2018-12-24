<template>
  <el-col :span="24" class="toolbar">
    <el-button type="danger" size="mini" @click="handleBatchRemove" :disabled="selects.length === 0">批量删除</el-button>
    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        :total="total"
        :current-page="current"
        style="float: right;"
    ></el-pagination>
  </el-col>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['total', 'selects', 'current'],
    methods: {
      handleBatchRemove() {
        this.$emit("handleBatchRemove");
      },
      handleSizeChange(val) {
        this.$emit("handleSizeChange", val);
      },
      handleCurrentChange(val) {
        this.$emit("handleCurrentChange", val);
      },
    }
  }
</script>

<style scoped>

</style>