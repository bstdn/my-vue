<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
    <el-form :inline="true" :model="model">
      <el-form-item v-for="(item, index) in config" :style="{width: item.width}" :key="index">
        <el-input
            v-if="item.type === 'input'"
            v-model="model[item.value]"
            clearable
            :placeholder="item.placeholder"
        ></el-input>
        <el-date-picker
            v-else-if="item.type === 'datetime'"
            v-model="model[item.value]"
            type="daterange"
            align="right"
            unlink-panels
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
        ></el-date-picker>
        <el-select
            v-else-if="item.type === 'select'"
            v-model="model[item.value]"
            clearable
            filterable
            :placeholder="item.placeholder"
        >
          <el-option
              v-for="option in item.path"
              :key="option.key"
              :label="option.label"
              :value="option.key"
          ></el-option>
        </el-select>
      </el-form-item>
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
      'model',
      'config',
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