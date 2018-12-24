<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
    <el-form :inline="true">
      <el-form-item>
        <el-dropdown :hide-on-click="false">
          <el-button class="el-dropdown-link">
            显示更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in dataConfig" :key="index">
              <el-checkbox-group
                  v-model="checked1"
                  @change="handleChecked"
              >
                <el-checkbox :label="item.label"></el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item v-if="add">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item v-if="refresh" style="float: right;">
        <el-button type="success" @click="handleRefresh" :loading="refreshLoading">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  export default {
    name: "filterBar",
    data() {
      return {
        checked1: this.checked,
      }
    },
    props: [
      'dataConfig',
      'checked',
      'add',
      'refresh',
      'refreshLoading',
    ],
    methods: {
      handleAdd() {
        this.$emit("handleAdd");
      },
      handleChecked(val) {
        this.$emit("handleChecked", val);
      },
      handleRefresh() {
        this.$emit("handleRefresh");
      },
    }
  }
</script>

<style scoped>

</style>