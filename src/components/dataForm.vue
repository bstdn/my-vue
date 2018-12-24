<template>
  <el-dialog :title="title" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="formClose">
    <el-form :model="dataForm" :label-width="labelWidth" :rules="dataFormRules" ref="dataForm">
      <el-form-item
          v-for="(item, index) in formConfig"
          :label="item.label"
          :prop="item.prop"
          :key="index"
      >
        <el-radio-group
            v-if="item.type === 'radio'"
            v-model="dataForm[item.prop]"
        >
          <el-radio
              class="radio"
              v-for="(options, index) in item.path"
              :key="index"
              :label="options.code"
          >{{options.description}}
          </el-radio>
        </el-radio-group>
        <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="dataForm[item.prop]"
            type="date"
            placeholder="选择日期"
        ></el-date-picker>
        <el-input
            v-else
            :type="item.type"
            v-model="dataForm[item.prop]"
            clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="formClose">取消</el-button>
      <el-button type="primary" @click.native="formSubmit" :loading="submitLoading">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "dataForm",
    props: [
      'title',
      'labelWidth',
      'formVisible',
      'dataForm',
      'dataFormRules',
      'formConfig',
      'submitLoading',
    ],
    methods: {
      formClose() {
        this.$emit("formClose");
        this.$refs.dataForm.resetFields();
      },
      formSubmit() {
        this.$refs.dataForm.validate(valid => {
          if(valid) {
            let params = Object.assign({}, this.dataForm);
            this.$emit("formSubmit", params);
            setTimeout(() => {
              if(this.formVisible !== true) {
                this.$refs.dataForm.resetFields();
              }
            }, 300);
          }
        });
      },
    },
  }
</script>

<style scoped>

</style>