<template>
  <section>
    <!-- 工具条 -->
    <filterBar
        :dataConfig="dataConfig"
        :checked="checked"
        :add="true"
        :refresh="true"
        :model="filters"
        :config="filters1"
        :refreshLoading="refreshLoading"
        @handleAdd="handleAdd"
        @handleChecked="handleChecked"
        @handleRefresh="handleRefresh"
    ></filterBar>

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

    <!-- 新增 -->
    <dataForm
        title="新增"
        labelWidth="130px"
        :submitLoading="addLoading"
        :formVisible.sync="addFormVisible"
        :dataForm="addForm"
        :dataFormRules="addFormRules"
        :formConfig="addFields"
        @formSubmit="addSubmit"
        @formClose="formClose"
    ></dataForm>
  </section>
</template>

<script>
  import mixin from '../../utils/mixin';
  import {getUserList, deleteUser, batchDeleteUser, editUser, addUser} from '../../api/api';
  import dataConfig from './config';

  export default {
    name: "user",
    mixins: [mixin],
    data() {
      return {
        dataConfig: dataConfig.fields,
        checked: localStorage.getItem('showColumn') ? JSON.parse(localStorage.getItem('showColumn')) : dataConfig.showColumn,
        // 编辑
        editForm: dataConfig.editForm,
        editFormRules: dataConfig.editFormRules,
        editFields: dataConfig.editFields,
        // 新增
        addForm: dataConfig.addForm,
        addFormRules: dataConfig.addFormRules,
        addFields: dataConfig.addFields,
        // 筛选条件
        filters: {
          search: '',
          sex: '',
        },
        filters1: [
          {
            type: 'input',
            value: 'search',
            placeholder: '搜索条件',
          },
          {
            type: 'select',
            value: 'sex',
            placeholder: '性别',
            path: [
              {key: 1, label: '男'},
              {key: 2, label: '女'},
            ],
            width: '150px',
          },
        ],
      }
    },
    watch: {
      // 筛选
      filters: {
        handler: function() {
          this.getTableList(1);
        },
        deep: true
      },
    },
    methods: {
      getTableList(page) {
        let params = {
          page: page ? page : this.pagination.page,
          page_size: this.pagination.page_size,
          search: this.filters.search,
          sex: this.filters.sex,
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
      },
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      // 单个删除
      handleDel(index, row) {
        this.$confirm('确认删除 ' + row.name + ' 吗', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tableLoading');
          let params = {id: row.id};
          deleteUser(params).then(res => {
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
      // 新增
      addSubmit(params) {
        this.addLoading = true;
        addUser(params).then(res => {
          this.$message.success(res.msg);
          this.addFormVisible = false;
          this.addLoading = false;
          this.getTableList();
        }).catch(res => {
          let {message} = res.response.data;
          this.$message.error(message);
          this.addLoading = false;
        });
      },
      formClose() {
        this.editFormVisible = false;
        this.addFormVisible = false;
      },
      handleChecked(val) {
        this.checked = val;
        localStorage.setItem('showColumn', JSON.stringify(val));
      },
      handleRefresh() {
        this.refreshLoading = true;
        this.getTableList();
        this.refreshLoading = false;
      },
    },
    // 模版编译、挂载之后
    mounted() {
      this.getTableList();
    }
  }
</script>

<style scoped>

</style>