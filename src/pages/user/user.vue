<template>
  <section>
    <!-- 列表 -->
    <dataTable
        :dataSource="tableContent"
        @selectsChange="selectsChange"
        :dataConfig="dataConfig"
        :checked="checked"
        :edit="true"
        @handleEdit="handleEdit"
        :del="true"
        @handleDel="handleDel"
        btnWidth="150"
    ></dataTable>

    <!-- 分页 -->
    <pagination
        :total="total"
        :selects="selects"
        :current.sync="current"
        @handleBatchRemove="handleBatchRemove"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
    ></pagination>

    <!-- 编辑 -->
    <dataForm
        title="编辑"
        labelWidth="130px"
        :submitLoading="editLoading"
        :formVisible.sync="editFormVisible"
        :dataForm="editForm"
        :dataFormRules="editFormRules"
        :formConfig="editFields"
        @formSubmit="editSubmit"
        @formClose="formClose"
    ></dataForm>
  </section>
</template>

<script>
  import mixin from '../../utils/mixin';
  import {getUserList, deleteUser, batchDeleteUser, editUser} from '../../api/api';
  import dataConfig from './config';

  export default {
    name: "user",
    mixins: [mixin],
    data() {
      return {
        dataConfig: dataConfig.fields,
        checked: dataConfig.showColumn,
        // 编辑
        editForm: dataConfig.editForm,
        editFormRules: dataConfig.editFormRules,
        editFields: dataConfig.editFields,
      }
    },
    methods: {
      getTableList(page) {
        let params = {
          page: page ? page : this.pagination.page,
          page_size: this.pagination.page_size,
        };
        this.$store.dispatch('tableLoading');
        getUserList(params).then(res => {
          this.total = res.data.count;
          this.current = res.data.current;
          this.tableContent = res.data.users;
          this.$store.dispatch('tableLoading');
        }).catch(res => {
          this.$store.dispatch('tableLoading');
          this.$message({
            message: this.errorMessage + ': ' + res,
            type: 'error',
            duration: 5000,
            showClose: true
          });
        });
      },
      selectsChange(val) {
        this.selects = val;
        console.log(val);
      },
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      handleDel(index, row) {
        this.$confirm('确认删除 ' + row.name + ' 吗', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tableLoading');
          let params = { id: row.id };
          deleteUser(params).then(res => {
            this.$store.dispatch('tableLoading');
            this.$message.success(res.msg);
            this.getTableList();
          }).catch(res => {
            this.$store.dispatch('tableLoading');
            let { message } = res.response.data;
            this.$message.error(message);
          });
        }).catch(() => {});
      },
      // 批量删除
      handleBatchRemove() {
        let ids = this.selects.map(item => item.id).toString();
        this.$confirm('确认删除选中的记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tableLoading');
          let params = {ids: ids};
          batchDeleteUser(params).then(res => {
            this.$store.dispatch('tableLoading');
            this.$message.success(res.msg);
            this.getTableList();
          }).catch(res => {
            this.$store.dispatch('tableLoading');
            let {message} = res.response.data;
            this.$message.error(message);
          });
        }).catch(() => {
        });
      },
      handleSizeChange(val) {
        this.pagination.page = 1;
        this.pagination.page_size = val;
        this.getTableList(1);
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
        this.getTableList();
      },
      // 编辑
      editSubmit(params) {
        this.editLoading = true;
        editUser(params).then(res => {
          this.$message.success(res.msg);
          this.editFormVisible = false;
          this.editLoading = false;
          this.getTableList();
        }).catch(res => {
          let {message} = res.response.data;
          this.$message.error(message);
          this.editLoading = false;
        });
      },
      formClose() {
        this.editFormVisible = false;
      },
    },
    mounted() {
      this.getTableList();
    }
  }
</script>

<style scoped>

</style>